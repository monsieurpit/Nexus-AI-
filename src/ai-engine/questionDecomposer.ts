/**
 * Compound Question Decomposer
 *
 * A single user message often bundles multiple independent questions
 * ("What is photosynthesis and why does it matter for climate change?").
 * Treating that as one bag-of-words search only ever surfaces whichever
 * half scores higher in BM25 — the other half silently goes unanswered.
 * This module splits a compound prompt into independent sub-questions so
 * each can be searched and answered on its own, then recombined.
 */

// "'s" is optional after what/who/where/how/whats — \b alone doesn't bridge it, since "whats"
// (no apostrophe, extremely common in Discord chat) has no word boundary between "what" and the
// trailing "s". Without this, "whats the square root of 81 and who is messi" never even
// qualified as two question fragments and silently fell back to un-split single-query search.
const QUESTION_LEAD_WORDS =
  /^(?:what|who|when|where|why|how|which)('s|s)?\b|^(?:is|are|does|do|did|can|could|will|would|should|explain|describe|tell me|list)\b/i;

export interface DecomposedQuestion {
  isCompound: boolean;
  parts: string[];
}

function looksLikeQuestionFragment(fragment: string): boolean {
  const trimmed = fragment.trim();
  const wordCount = trimmed.split(/\s+/).length;
  // Short math expressions ("what's 2+2") are legitimately only 2 tokens — the digit is doing
  // the work a third word normally would, so the usual 3-word floor (which exists to keep noun
  // phrases like "salt and pepper" from being mistaken for question fragments) is relaxed to 2
  // whenever there's a digit in it.
  const minWords = /\d/.test(trimmed) ? 2 : 3;
  if (wordCount < minWords) return false;
  return QUESTION_LEAD_WORDS.test(trimmed);
}

/**
 * Splits a compound prompt into independent sub-questions.
 * Conservative by design: only splits when both resulting halves independently
 * look like real question fragments, so it won't shred ordinary noun-phrase
 * conjunctions like "bread and butter" or "salt and pepper".
 */
// Beyond this many parts a message reads as rambling rather than genuinely distinct
// questions, and searching/answering that many sub-questions per turn gets slow and noisy.
const MAX_DECOMPOSED_PARTS = 4;

export function decomposeCompoundQuestion(query: string): DecomposedQuestion {
  const trimmed = query.trim();

  // 1. Explicit multiple question marks: "What is X? How does Y work?"
  const questionMarkParts = trimmed
    .split(/(?<=\?)\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (
    questionMarkParts.length >= 2 &&
    questionMarkParts.length <= MAX_DECOMPOSED_PARTS &&
    questionMarkParts.every(looksLikeQuestionFragment)
  ) {
    return { isCompound: true, parts: questionMarkParts };
  }

  // 2. "X and Y[, and Z...]" where every part independently reads as its own question.
  // Not capped at 2 — "what is X and how does Y work and why does Z matter" is a real
  // 3-part compound question, and a strict "must be exactly 2 parts" check used to silently
  // fall through to no decomposition at all for anything with a third "and" clause.
  const conjunctionSplit = trimmed
    .split(/\s*,?\s+(?:and also|and|but also)\s+/i)
    .map((p) => p.trim())
    .filter(Boolean);

  if (
    conjunctionSplit.length >= 2 &&
    conjunctionSplit.length <= MAX_DECOMPOSED_PARTS &&
    conjunctionSplit.every(looksLikeQuestionFragment)
  ) {
    return { isCompound: true, parts: conjunctionSplit };
  }

  return { isCompound: false, parts: [trimmed] };
}

/**
 * Strips narrative filler out of a long, rambling Discord message so BM25 scores the actual
 * question instead of the story wrapped around it.
 *
 * A message like "idk if this is a dumb question but everyone keeps talking about black holes in
 * movies and stuff and i just wanna know what actually happens if you fall into one" is 30 words
 * of which four are the topic. BM25 sums over every query term, so the eight narrative words
 * ("dumb", "question", "everyone", "talking", "movies", "stuff", "wanna", "know") outvoted them
 * and returned the film-industry document ahead of the black-hole one.
 *
 * The filler list is only ever applied to the *preamble* — everything before the last
 * interrogative — never to the question clause itself. That distinction is what makes it safe to
 * list ordinary nouns like "movies" or "documentary": in "how do movies actually get made" the
 * question clause starts at "how", the preamble is empty, and nothing is touched at all.
 */
const NARRATIVE_FILLER = new Set(
  `yesterday today tonight tomorrow friend friends roommate brother sister mom dad guy dude bro
   man buddy homie people everyone somebody someone anybody nobody
   thing things stuff wondering wonder wondered thinking thought asked asking ask telling told
   tell said saying say talking talked talk watching watched saw seen reading
   honestly genuinely basically actually literally seriously legit random dumb stupid weird crazy
   insane please sorry anyway anyways unrelated curious figure understand simply
   ages hour hours minute minutes question questions answer answers
   tiktok youtube instagram twitter documentary movie movies
   wanna gonna gotta kinda sorta lemme dunno
   zoned nodded clue argue arguing argued
   explanation explaining explained technical confused confusing
   keeps keep kept wanted tried trying tries couldnt didnt`
    .split(/\s+/)
    .filter(Boolean)
);

// Where the real question starts. "explain"/"describe" are included so a message whose actual
// ask is phrased without a wh-word ("...can you explain photosynthesis to me") still has a
// question clause to protect.
const CLAUSE_MARKER =
  /^(?:what|whats|how|hows|why|who|whos|where|wheres|when|whens|which|explain|describe|define)$/i;

// Below this a message is a normal question, not a story with a question buried in it.
const MIN_RAMBLE_WORDS = 12;
// Fewer removals than this and the preamble was carrying real content, not filler.
const MIN_FILLER_REMOVED = 3;

export function denoiseRamblingQuery(query: string): string {
  const words = query.trim().split(/\s+/);
  if (words.length < MIN_RAMBLE_WORDS) return query;

  const bare = (w: string) => w.toLowerCase().replace(/[^a-z']/g, '');
  let clauseStart = -1;
  for (let i = words.length - 1; i >= 0; i--) {
    if (CLAUSE_MARKER.test(bare(words[i]))) {
      clauseStart = i;
      break;
    }
  }
  // No marker at all, or the message already opens with the question — nothing is preamble.
  if (clauseStart <= 0) return query;

  const preamble = words.slice(0, clauseStart).filter((w) => !NARRATIVE_FILLER.has(bare(w)));
  if (clauseStart - preamble.length < MIN_FILLER_REMOVED) return query;
  return [...preamble, ...words.slice(clauseStart)].join(' ');
}
