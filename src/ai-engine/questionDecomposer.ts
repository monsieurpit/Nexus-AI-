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

/* ------------------------------------------------------------------ *
 * Comparative compound synthesis
 *
 * "How does Docker compare to VMs and which one is better for CI/CD?" decomposes into two
 * parts that get solved independently — which is correct retrieval but wrong presentation:
 * the user asked one question with a compare-then-recommend shape and got two unrelated
 * snippets stapled together, the second of which searched "which one is better for CI/CD"
 * with no idea what "one" refers to.
 *
 * This detects that shape and lets the caller restructure the output. There is no generative
 * model here, so the "verdict" is never composed — it is *quoted*: sentences lifted verbatim
 * from the retrieved documents that both name a compared subject and carry actual preference
 * language. If the corpus never states a preference, the caller says so instead of inventing
 * a winner.
 * ------------------------------------------------------------------ */

const VERDICT_LEAD = /\b(?:which|what)\b|\bshould i\b/i;
const VERDICT_TOKEN =
  /\b(?:better|best|superior|preferable|prefer|recommend(?:s|ed)?|wins?|should i (?:use|pick|choose|go with|learn|get|run))\b/i;

const COMPARISON_CUE =
  /\bvs\.?\b|\bversus\b|\bcompares?\b|\bcompared\b|\bcomparison\b|\bdifferences?\s+between\b|\bdiffers?\s+from\b|\bstacks?\s+up\b|\bbetter\s+than\b/i;

// Ordered most-specific first: "how does X compare to Y" must win over the bare "X vs Y" rule,
// which would otherwise capture the whole leading clause as entity one.
const COMPARISON_PAIR_PATTERNS: RegExp[] = [
  /\bhow\s+(?:does|do|is|are)\s+(.+?)\s+(?:compare[sd]?\s+(?:to|with|against)|differ\s+from|stack\s+up\s+against)\s+(.+)$/i,
  /\bdifferences?\s+between\s+(.+?)\s+(?:and|or|vs\.?|versus)\s+(.+)$/i,
  /\bcompare\s+(.+?)\s+(?:to|with|and|vs\.?|versus)\s+(.+)$/i,
  /\bis\s+(.+?)\s+better\s+than\s+(.+)$/i,
  /^(.+?)\s+(?:vs\.?|versus)\s+(.+)$/i,
];

// Leading determiners/qualifiers carry no retrieval signal and wreck the literal substring
// match used to spot an entity inside a corpus sentence ("a full virtual machine" never
// contains "the virtual machines").
const ENTITY_TRIM = /^(?:a|an|the|using|use|running|plain|just|regular|normal)\s+/i;
const MAX_ENTITY_WORDS = 4;

function cleanEntity(raw: string): string {
  let e = raw.trim().replace(/[?!.,;:]+$/, '').trim();
  while (ENTITY_TRIM.test(e)) e = e.replace(ENTITY_TRIM, '');
  const words = e.split(/\s+/);
  if (words.length > MAX_ENTITY_WORDS) return '';
  return e;
}

export interface ComparativeCompound {
  isComparative: boolean;
  entities: string[];
  comparisonParts: number[];
  verdictParts: number[];
  /** What the recommendation is being asked *for* ("CI/CD"), empty when unqualified. */
  criterion: string;
}

const NOT_COMPARATIVE: ComparativeCompound = {
  isComparative: false,
  entities: [],
  comparisonParts: [],
  verdictParts: [],
  criterion: '',
};

function extractComparedEntities(text: string): string[] {
  for (const pattern of COMPARISON_PAIR_PATTERNS) {
    const m = text.match(pattern);
    if (!m) continue;
    const a = cleanEntity(m[1]);
    const b = cleanEntity(m[2]);
    if (a && b && a.toLowerCase() !== b.toLowerCase()) return [a, b];
  }
  return [];
}

// A criterion longer than this is a whole clause, not a use case, and matching against it
// degenerates into matching the question back at itself.
const MAX_CRITERION_WORDS = 5;

function extractCriterion(verdictPart: string, entities: string[]): string {
  const m = verdictPart.match(/\b(?:for|when it comes to|in terms of|at)\s+(.+?)\s*\??$/i);
  if (!m) return '';
  // The article stays in — "for a team" reads right in the rendered heading, and it's dropped
  // as a stopword at match time instead.
  const c = m[1].trim().replace(/[?!.,]+$/, '');
  if (!c || c.split(/\s+/).length > MAX_CRITERION_WORDS) return '';
  const lower = c.toLowerCase().replace(ENTITY_TRIM, '');
  // "which is better for Docker" isn't a criterion, it's one of the things being compared.
  if (entities.some((e) => e.toLowerCase() === lower)) return '';
  if (/^(?:me|us|you|this|that|it|them)$/i.test(c)) return '';
  return c;
}

/**
 * Detects the compare-then-recommend shape across an already-decomposed compound question.
 * Requires BOTH an explicit comparison cue naming two subjects AND a part asking which one
 * to pick — a plain two-part factual compound ("what is X and what is Y") stays untouched.
 */
export function detectComparativeCompound(parts: string[], fullQuery: string): ComparativeCompound {
  const verdictParts = parts
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => VERDICT_LEAD.test(p) && VERDICT_TOKEN.test(p))
    .map(({ i }) => i);
  if (verdictParts.length === 0) return NOT_COMPARATIVE;

  const comparisonParts = parts
    .map((p, i) => ({ p, i }))
    .filter(({ p, i }) => COMPARISON_CUE.test(p) && !verdictParts.includes(i))
    .map(({ i }) => i);
  if (comparisonParts.length === 0) return NOT_COMPARATIVE;

  // Entities are read off the comparison clause first; the full query is the fallback for
  // phrasings whose two subjects straddle the split point.
  let entities: string[] = [];
  for (const i of comparisonParts) {
    entities = extractComparedEntities(parts[i]);
    if (entities.length === 2) break;
  }
  if (entities.length < 2) entities = extractComparedEntities(fullQuery);
  if (entities.length < 2) return NOT_COMPARATIVE;

  return {
    isComparative: true,
    entities,
    comparisonParts,
    verdictParts,
    criterion: extractCriterion(parts[verdictParts[0]], entities),
  };
}

// Language that states an actual preference or fitness-for-purpose, as opposed to merely
// describing a property. A sentence needs one of these AND a compared subject before it is
// allowed to stand in as a verdict.
const PREFERENCE_MARKERS =
  /\b(?:better|best|preferred|prefer(?:s|red)?|ideal|well[- ]suited|suited\s+(?:for|to)|recommend(?:ed|s)?|advantages?|lighter|faster|cheaper|simpler|heavier|slower|the right (?:choice|tool|fit)|trade[- ]?offs?|instead of|rather than|unlike)\b/i;

const CRITERION_STOPWORDS = new Set(['a', 'an', 'the', 'my', 'our', 'your', 'of', 'in', 'on']);

export interface ComparativeEvidence {
  /** Verbatim sentences from the retrieved docs that state a preference between the subjects. */
  verdictSentences: string[];
  /** Whether any of that evidence actually speaks to the criterion the user asked about. */
  criterionCovered: boolean;
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Word-boundary matchers for one compared subject.
 *
 * Deliberately does NOT admit the head noun of a multi-word entity as an alias on its own:
 * "mediterranean diet" matching on the bare word "diet" pulled in an unrelated WHO sugar-intake
 * line as if it were a verdict about the Mediterranean diet. Boundaries matter for the same
 * reason — a substring match let "ketosis" and "ketone" stand in for "keto".
 */
function entityMatchers(entity: string): RegExp[] {
  const lower = entity.toLowerCase();
  const forms = new Set<string>([lower]);
  // "VMs" in the question vs "a VM" in the doc, "containers" vs "container".
  if (lower.endsWith('s') && lower.length > 2) forms.add(lower.slice(0, -1));
  else forms.add(lower + 's');

  const words = lower.split(/\s+/);
  if (words.length > 1) {
    forms.add(words.slice(0, -1).join(' '));
    for (const w of words.slice(0, -1)) {
      if (w.length >= 5) forms.add(w);
    }
  }
  // Trailing \b only when the form ends in a word character — "c++"/"ci/cd" would never match
  // otherwise, since there's no word boundary after a symbol.
  return Array.from(forms).map(
    (f) => new RegExp(`\\b${escapeRegex(f)}${/\w$/.test(f) ? '\\b' : ''}`, 'i')
  );
}

// Sentence-final periods only. Without this, "milliseconds vs. minutes for a VM" split in half
// and the surviving fragment lost the very entity mention that made it usable as evidence —
// the Docker/VM comparison silently produced no verdict at all because of it.
const ABBREVIATIONS = /\b(?:vs|e\.g|i\.e|etc|approx|est|fig|no|dr|mr|mrs|ms|st|inc|ltd)\.$/i;

// A markdown bold run ("**Docker**: ...") is not a bullet — stripping its first asterisk as a
// list marker leaves unbalanced `*Docker**` in the quoted output.
const LIST_MARKER = /^\s*(?:\d+[.)]|[-•]|\*(?!\*))\s+/;

// Below this a "sentence" is a section header or a stub, not a statement worth quoting.
const MIN_EVIDENCE_WORDS = 8;

function splitSentences(text: string): string[] {
  const raw = text.split(/(?<=[.!?])\s+|\n+/);
  const merged: string[] = [];
  for (const piece of raw) {
    const prev = merged[merged.length - 1];
    if (prev !== undefined && ABBREVIATIONS.test(prev)) merged[merged.length - 1] = `${prev} ${piece}`;
    else merged.push(piece);
  }
  return merged
    .map((s) => s.replace(LIST_MARKER, '').trim())
    .filter((s) => {
      if (s.endsWith(':')) return false;
      return s.replace(/[*`_]/g, '').split(/\s+/).filter(Boolean).length >= MIN_EVIDENCE_WORDS;
    });
}

/**
 * Pulls preference statements about the compared subjects straight out of the retrieved
 * document text. Nothing is paraphrased or generated — an empty result means the corpus does
 * not take a side, which the caller is expected to report honestly rather than paper over.
 */
export function extractComparativeEvidence(
  docTexts: string[],
  entities: string[],
  criterion: string,
  maxSentences = 3
): ComparativeEvidence {
  const matcherSets = entities.map(entityMatchers);
  const criterionTokens = criterion
    .toLowerCase()
    .split(/[\s/]+/)
    .filter((t) => t.length >= 2 && !CRITERION_STOPWORDS.has(t));

  const scored: { sentence: string; score: number; hitsCriterion: boolean }[] = [];
  const seen = new Set<string>();

  for (const text of docTexts) {
    for (const sentence of splitSentences(text)) {
      const lower = sentence.toLowerCase();
      if (!PREFERENCE_MARKERS.test(sentence)) continue;
      const sidesMentioned = matcherSets.filter((ms) => ms.some((m) => m.test(sentence))).length;
      if (sidesMentioned === 0) continue;

      const key = lower.slice(0, 60);
      if (seen.has(key)) continue;
      seen.add(key);

      const hitsCriterion = criterionTokens.length > 0 && criterionTokens.every((t) => lower.includes(t));
      scored.push({ sentence, score: sidesMentioned * 2 + (hitsCriterion ? 3 : 0), hitsCriterion });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const picked = scored.slice(0, maxSentences);
  return {
    verdictSentences: picked.map((p) => p.sentence),
    criterionCovered: picked.some((p) => p.hitsCriterion),
  };
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
