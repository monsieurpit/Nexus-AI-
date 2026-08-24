import {
  AISettings,
  ChatMessage,
  KnowledgeItem,
  ModelPersona,
  ThoughtStep,
  UserMemory,
  WebSearchResult,
} from '../types';
import { extractQueryEntities, searchKnowledgeGraph } from './semanticEngine';
import { processForSearch, splitSentences } from './bm25Engine';
import { trySolveMath } from './mathSolver';
import { evaluateStrictDirectives, enforceStrictSdkRules } from './ruleEngine';
import {
  infuseSwearyHumanVoice,
  hasSwearWords,
  enhanceNaturalSwearPhrasing,
  SWEAR_DICTIONARY,
  detectUserInsult,
  generateInsultCrashoutReply,
  detectDominanceAssertion,
  generateDominanceClapbackReply,
  detectVagueInfoDumpRequest,
  generateVagueRequestClapback,
  detectEmotionalDistress,
  generateEmotionalSupportReply,
  isCasseurtMention,
} from './swearEngine';
import {
  normalizeInternetSlang,
  evaluateBrainrotContext,
  generateBrainrotResponse,
} from './slangAndBrainrotEngine';
import { solveGeneralKnowledge } from './generalIntelligence';
import { trySolveCode } from './codeSolver';
import { trySolveLogic } from './logicSolver';
import { decomposeCompoundQuestion } from './questionDecomposer';
import { extractRelationFacts, findInferenceChains, formatInferenceChain } from './inferenceEngine';
import { verifyAnswer } from './answerVerifier';

export type QueryIntent =
  | 'definition'
  | 'explanation'
  | 'causal'
  | 'temporal'
  | 'person'
  | 'location'
  | 'mathematical'
  | 'comparative'
  | 'listing'
  | 'conversational'
  | 'general';

export interface ReasoningResult {
  thoughtSteps: ThoughtStep[];
  content: string;
  knowledgeHits: string[];
}

const FOLLOW_UP_PRONOUNS = new Set([
  'it', 'its', 'they', 'them', 'their', 'that', 'this', 'these', 'those',
  'he', 'him', 'his', 'she', 'her', 'there',
  // "the second one", "which one", "what about the third one" — a referential "one" standing in
  // for something from the previous turn. Missing this meant a follow-up like "and the second
  // one?" (4 words, so isShort's <=3 cutoff also missed it) had zero context carried over and
  // searched literally on "second one" alone, landing on whatever random doc scored highest.
  'one', 'ones',
]);

// "Can you join the VC?" used to fall through to the code solver, which matched the bare word
// "join" as a SQL JOIN request and answered with a PostgreSQL query instead. Shared between the
// intent classifier and both conversational-reply functions below so this one definition is the
// only place that needs updating if the phrasing needs to expand.
const VC_JOIN_REGEX =
  /\b(?:join|hop|pull\s+up|come)\s+(?:in\s+|into\s+|to\s+)?(?:the\s+)?(?:vc|voice\s*chat|voice\s*channel|call)\b/i;

const PHONE_NUMBER_REGEX =
  /\b(?:phone\s*number|telephone\s*number|(?:what(?:'s| is|\s+is)?|give\s+me|tell\s+me|whats)\s+(?:your|his|the\s+ai(?:'s)?)\s+(?:phone\s+)?number|(?:his|your|the\s+ai(?:'s)?)\s+phone\s+number|(?:what(?:'s| is|\s+is)?|whats)\s+(?:his|your)\s+number)\b/i;

// Personal banter/questions directed AT the bot ("why are you here", "are you gay", "do you like
// X", "you freak") — these were falling through to corpus/web search, which either returns
// nonsense (nothing in a knowledge corpus or on the web actually answers "why are you here") or,
// worse, searches the web for whatever topic word happens to be in the sentence (e.g. searching
// for the song "Right Now" because someone asked "do you like the songs playing right now").
const PERSONAL_QUESTION_REGEX =
  /^(?:why\s+are\s+you|why\s+do\s+you|are\s+you)\b|\bdo\s+you\s+(?:like|love|hate|think|believe|even)\b|\byou\s+(?:freak|weirdo|creep|dork|nerd|loser|goober)\b/i;

// Reassurance/affection statements directed AT the bot ("don't worry, everyone loves you") —
// declarative, not a question, so they don't match PERSONAL_QUESTION_REGEX either, but they're
// just as much a dead end for corpus/web search: "don't worry" scored against Anxiety-disorder
// content via the word "worry", and "everyone loves u" got sent to Google as a literal search
// query, which came back with unrelated Japanese-grammar and diss-track results.
const REASSURANCE_REGEX =
  /\b(?:don'?t\s+worry|everyone\s+loves?\s+you|we\s+(?:all\s+)?love\s+you|you'?re\s+(?:the\s+best|amazing|doing\s+great|appreciated))\b/i;

// "how are you"/"who are you" substring-matched ANY message containing that phrase, including
// real questions that only happen to be phrased with it — "how are you supposed to configure
// webpack" or "who are you supposed to talk to about a refund" — which hijacked the actual
// question into a canned greeting/identity reply. A modal continuation right after the phrase
// ("supposed to", "gonna", "meant to"...) means it's not a greeting.
const GREETING_FALSE_POSITIVE_REGEX =
  /(?:how|who)\s+are\s+you\s+(?:supposed|suppose|going\s+to|gonna|meant\s+to|able\s+to|allowed\s+to|trying\s+to)\b/i;

export function detectQueryIntent(query: string): QueryIntent {
  const q = query.toLowerCase().trim();

  const chatTriggers = [
    // Bare "hi"/"hey" need their own exact entries — the "hi "/"hey " trailing-space forms below
    // only ever match via `q.startsWith(t + ' ')`, which appends a SECOND space, so a lone "hi"
    // or "hey" with no trailing text never matched either form and fell through to corpus search.
    'hello', 'hi', 'hi ', 'hey', 'hey ', 'hi!', 'hello!', 'hey!', 'yo ', 'yo!', 'yo',
    'wassup', 'wazzup', 'wsg', "what's up", 'whats up', 'what up', 'sup', 'gm', 'gn',
    'how are you', 'how are you doing', 'how you doing', 'how u doing', 'how are u',
    "how's it going", 'hows it going', 'how you been', 'how have you been', 'how are things', 'hru',
    'good morning', 'good afternoon', 'good evening', 'good night', 'howdy',
    "what's your name", 'who are you', 'what are you', 'who made you', 'who created you',
    'thank you', 'thanks', 'thx', 'ty', 'appreciate it', 'much appreciated', 'bye',
    'goodbye', 'cya', 'see ya', 'see you', 'later', 'peace out', 'catch you later',
    'what can you do', 'help me', 'tell me about yourself',
    'wyd', 'what are you doing', 'what r u doing', 'wym', 'wdym', 'what do you mean',
    // "idk" is slang-normalized to "i don't know" (ABBREVIATIONS_MAP) before intent detection
    // ever sees it, so the bare 'idk' entry never actually matches post-normalization — "idk"
    // alone, and "idk man"/"idk bro" etc., fell through to random corpus search. The expanded
    // form needs its own entry, same as every other acronym in this list.
    'idk', "i don't know", 'i dont know', 'fr', 'fr fr', 'no cap', 'ong', 'tell me a joke', 'make me laugh', 'roast me',
    // Bare acknowledgment/agreement slang — with no real question in them these were falling
    // through to 'general' intent, which sent them into corpus search and returned whatever
    // random document happened to score highest (e.g. "ok cool" pulling up first-aid content).
    // Intent detection runs on the slang-normalized text (see effectivePrompt), so both the raw
    // form and its ABBREVIATIONS_MAP expansion need to be listed here — "fr fr" is normalized to
    // "for real for real" before this function ever sees it.
    'lol', 'lmao', 'lmfao', 'rofl', 'bet', 'say less', 'you good', 'u good',
    'aight', 'ight', 'word', 'ok', 'okay', 'k', 'kk', 'ok cool', 'okay cool', 'nvm', 'nevermind', 'mood',
    'for real', 'for real for real', 'laughing my ass off', 'laughing my fucking ass off',
    'rolling on the floor laughing', 'never mind',
  ];

  // Strictly for exact-match trigger comparisons — "you good?" should still hit the "you good"
  // trigger even though the question mark survives the outer trim().
  const qNoPunct = q.replace(/[?!.]+$/, '');

  if (
    !GREETING_FALSE_POSITIVE_REGEX.test(q) && (
    chatTriggers.some(
      (t) => q === t || qNoPunct === t || q.startsWith(t + ' ') || q.includes('how are you') || q.includes('how you doing') || q.includes('who are you') || q.includes('what can you do') || q.includes('wassup')
    ) ||
    // "facts" bare (agreement slang, like "no cap") needs an exact match ONLY — "startsWith"
    // would also swallow real questions like "facts about black holes".
    q === 'facts' || qNoPunct === 'facts' ||
    // Bare "what"/"what?"/"wait, what" (a reactive interjection) — same exact-match-only
    // reasoning as "facts": adding it to chatTriggers' startsWith check would re-hijack every
    // real question starting with "what " ("what is the boiling point of water"), which is
    // exactly the bug already fixed for the semantic dimension scorer.
    q === 'what' || qNoPunct === 'what' || q === 'wait, what' || q === 'wait what' ||
    /(?:how\s+are\s+you|how\s+you\s+doing|how\s+u\s+doing|how'?s\s+it\s+going|hows\s+it\s+going|what'?s\s+up|whats\s+up|wassup|wazzup|good\s+(?:morning|afternoon|evening|night)|who\s+are\s+you|what\s+is\s+your\s+name|what\s+can\s+you\s+do)/i.test(q)) ||
    VC_JOIN_REGEX.test(q) ||
    PHONE_NUMBER_REGEX.test(q) ||
    PERSONAL_QUESTION_REGEX.test(q) ||
    REASSURANCE_REGEX.test(q)
  ) {
    return 'conversational';
  }

  // Math trigger
  if (
    /\d+\s*[+\-*/÷×^%]\s*\d+/.test(q) ||
    // Word-form arithmetic ("128 divided by 8", "5 times 3", "9 plus 4") — mathSolver.ts's own
    // preprocessor already rewrites these phrases into real operators, but that solver only ever
    // runs when detectQueryIntent returns 'mathematical' first, and this class of phrasing had no
    // trigger of its own — only the symbolic form (\d+\s*[+\-*/...]\s*\d+) was recognized, so any
    // spelled-out arithmetic fell through to 'general' and landed on random corpus search.
    /\d+\s*(?:plus|minus|times|divided\s+by|multiplied\s+by|over|to\s+the\s+power(?:\s+of)?)\s*\d+/i.test(q) ||
    // Distance/rate/time word problems ("60mph for 2.5 hours, how far") have no operator symbol
    // or "calculate"/"solve" keyword at all, so they need their own explicit trigger.
    (/\d\s*(?:mph|km\/h|kmh|miles per hour|kilometers? per hour|kilometres? per hour)/.test(q) &&
      /how\s+far|how\s+long|what\s+distance|how\s+many\s+hours/.test(q)) ||
    q.includes('calculate') ||
    q.includes('compute') ||
    q.includes('solve ') ||
    q.includes('convert ') ||
    // Named math operations phrased as "what is the X of N" ("what is the square root of 81")
    // need their own explicit check — the generic "what is X" math heuristic below deliberately
    // excludes "what is the ..." to avoid misreading plain definition questions ("what is the
    // capital of France") as arithmetic, but that same exclusion was also swallowing genuine math
    // questions that happen to start with "what is the".
    /\b(?:square|cube)\s*root\s+of\b|\babsolute\s+value\s+of\b|\bfactorial\b|\b(?:average|mean)\s+of\b|\d+\s*(?:factorial|squared|cubed)\b|\d+\s*mod\s*\d+/i.test(
      q
    ) ||
    // "what is"/"what's" both need this check — "what's 128 divided by 8" was falling through
    // because only the "what is" spelling was ever checked, so the contraction (the far more
    // common way people actually type this) never routed to the math solver.
    (/\bwhat'?s\b|\bwhat\s+is\b/.test(q) &&
      /\d/.test(q) &&
      !/\bwhat'?s\s+a\b|\bwhat\s+is\s+a\b|\bwhat'?s\s+the\b|\bwhat\s+is\s+the\b|\bwhat'?s\s+an\b|\bwhat\s+is\s+an\b/.test(q)) ||
    // Named mathematical constants have no digit in the question itself ("what is pi") — the
    // digit-presence check above never catches these on its own, so this fell through to
    // 'definition' intent and never reached the math solver, which already supports evaluating
    // both constants correctly.
    /\b(?:what\s+is|value\s+of)\s+(?:pi|euler'?s?\s+number)\b|^(?:pi|euler'?s?\s+number)\??$/i.test(q)
  ) {
    return 'mathematical';
  }

  if (
    q.startsWith('when ') ||
    q.includes('what year') ||
    q.includes('what date') ||
    q.includes('history of ') ||
    q.includes('when was') ||
    q.includes('when did')
  ) {
    return 'temporal';
  }

  if (
    q.startsWith('who ') ||
    q.includes('who was ') ||
    q.includes('who is ') ||
    q.includes('who invented') ||
    q.includes('who discovered') ||
    q.includes('who created')
  ) {
    return 'person';
  }

  if (
    q.startsWith('where ') ||
    q.includes('capital of') ||
    q.includes('located in') ||
    q.includes('where is ') ||
    q.includes('where are ')
  ) {
    return 'location';
  }

  if (
    q.startsWith('what is ') ||
    q.startsWith('what are ') ||
    q.includes('define ') ||
    q.includes('definition of') ||
    q.includes('meaning of') ||
    q.includes('what does ')
  ) {
    return 'definition';
  }

  if (
    q.startsWith('how ') ||
    q.startsWith('explain ') ||
    q.includes('how does') ||
    q.includes('how do ') ||
    q.includes('how can')
  ) {
    return 'explanation';
  }

  if (
    q.startsWith('why ') ||
    q.includes('reason for') ||
    q.includes('cause of') ||
    q.includes('why is ') ||
    q.includes('why are ') ||
    q.includes('why does')
  ) {
    return 'causal';
  }

  if (
    q.includes('compare ') ||
    q.includes('difference between') ||
    q.includes(' vs ') ||
    q.includes(' versus ') ||
    q.includes('better than') ||
    // Narrow "X or Y" pattern (e.g. "messi or ronaldo") — only two bare tokens either
    // side of "or", so it doesn't misfire on longer sentences that happen to contain "or"
    /^[a-z0-9'-]+\s+or\s+[a-z0-9'-]+$/i.test(q)
  ) {
    return 'comparative';
  }

  if (
    q.includes('list ') ||
    q.includes('give me ') ||
    q.includes('examples of') ||
    q.includes('types of') ||
    q.includes('kinds of') ||
    q.includes('what are some')
  ) {
    return 'listing';
  }

  return 'general';
}

function intentLabel(intent: QueryIntent): string {
  switch (intent) {
    case 'definition': return 'Definition';
    case 'explanation': return 'Explanation';
    case 'causal': return 'Causal';
    case 'temporal': return 'Temporal';
    case 'person': return 'Person';
    case 'location': return 'Location';
    case 'mathematical': return 'Math';
    case 'comparative': return 'Comparative';
    case 'listing': return 'Listing';
    case 'conversational': return 'Chat';
    case 'general': return 'General';
  }
}

interface ConversationMemory {
  augmentedQuery: string;
  citedDocIds: Set<string>;
  contextDescription: string;
  isFollowUp: boolean;
}

function buildConversationMemory(query: string, history: ChatMessage[]): ConversationMemory {
  const recent = history.slice(-6);
  const citedDocIds = new Set<string>();

  recent
    .filter((m) => m.role === 'assistant')
    .forEach((m) => {
      m.thoughtProcess?.forEach((tp) => {
        if (tp.data?.matchedKB && Array.isArray(tp.data.matchedKB)) {
          tp.data.matchedKB.forEach((k: string) => citedDocIds.add(k));
        }
      });
      if (m.sources && Array.isArray(m.sources)) {
        m.sources.forEach((s) => {
          if (typeof s === 'string') citedDocIds.add(s);
          else if (s && typeof s.title === 'string') citedDocIds.add(s.title);
        });
      }
    });

  const recentUserTerms = recent
    .filter((m) => m.role === 'user')
    .slice(-2)
    .flatMap((m) => processForSearch(m.content));

  const queryTerms = processForSearch(query);
  // Trailing punctuation was never stripped here, so "and the second one?" split into
  // ["and","the","second","one?"] — "one?" never equals "one" in FOLLOW_UP_PRONOUNS, so any
  // follow-up ending in "?" (the overwhelming majority of them — "what about that?", "and him?")
  // silently lost its pronoun-detection entirely and got zero context carried over.
  const queryWords = query.toLowerCase().replace(/[?!.,]+/g, ' ').split(/\s+/).filter(Boolean);
  const hasPronouns = queryWords.some((w) => FOLLOW_UP_PRONOUNS.has(w));
  const isShort = queryWords.filter((w) => w.length > 1).length <= 3;
  const isFollowUp = hasPronouns || isShort;

  let augmented = query;
  if (isFollowUp && recentUserTerms.length > 0) {
    augmented = query + ' ' + recentUserTerms.slice(-6).join(' ');
  }

  const descParts: string[] = [];
  if (hasPronouns) descParts.push('Pronoun detected → resolved against prior context');
  if (isShort && !hasPronouns) descParts.push('Short query → augmented with recent topic');
  if (citedDocIds.size > 0) descParts.push(`Boosting ${citedDocIds.size} recently cited doc(s)`);
  if (isFollowUp && recentUserTerms.length > 0) {
    descParts.push(`Context: ${recentUserTerms.slice(-4).join(', ')}`);
  }

  return {
    augmentedQuery: augmented,
    citedDocIds,
    contextDescription: descParts.length === 0 ? 'No carryover from prior turns.' : descParts.join(' · '),
    isFollowUp,
  };
}

// A "confident" answer needs a score at or above this. Below it but at/above WEAK_MATCH_SCORE,
// we still answer — just hedged — rather than pretending we have nothing at all.
const CONFIDENT_MATCH_SCORE = 1.0;
const WEAK_MATCH_SCORE = 0.4;

type SearchHit = { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] };

/**
 * Searches the corpus, and if the first attempt comes back weak or empty, retries once
 * with a tightened, stopword-free keyword query instead of immediately giving up. Natural-language
 * phrasing (pronouns, filler words) can dilute BM25 scoring even when the corpus has a good match
 * for the underlying keywords.
 */
function searchWithReformulation(
  augmentedQuery: string,
  queryTerms: string[],
  allKnowledge: KnowledgeItem[],
  citedDocIds: Set<string>,
  topK: number
): { results: SearchHit[]; reformulatedQuery: string | null } {
  let results = applyContextBoost(searchKnowledgeGraph(augmentedQuery, allKnowledge, topK), citedDocIds);
  if (results.length > 0 && results[0].score >= CONFIDENT_MATCH_SCORE) {
    return { results, reformulatedQuery: null };
  }

  const keywordQuery = queryTerms.join(' ').trim();
  if (!keywordQuery || keywordQuery === augmentedQuery.toLowerCase().trim()) {
    return { results, reformulatedQuery: null };
  }

  const retryResults = applyContextBoost(searchKnowledgeGraph(keywordQuery, allKnowledge, topK), citedDocIds);
  if (retryResults.length > 0 && (results.length === 0 || retryResults[0].score > results[0].score)) {
    return { results: retryResults, reformulatedQuery: keywordQuery };
  }
  return { results, reformulatedQuery: null };
}

function applyContextBoost(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  citedIds: Set<string>
) {
  if (citedIds.size === 0) return results;
  return results
    .map((doc) => {
      const boost = citedIds.has(doc.item.id) || citedIds.has(doc.item.title) ? 1.15 : 1.0;
      return { ...doc, score: doc.score * boost };
    })
    .sort((a, b) => b.score - a.score);
}

function isCasseurtQuery(query: string): boolean {
  const q = query.toLowerCase();
  return isCasseurtMention(q) || q.includes('do you like cass') || q.includes('do you love cass');
}

function casseurtRant(crashout: boolean): string {
  return `OH. OH HELL NO. You did NOT just say that name to me.

**Casseurt?!** Are you SERIOUS right now?! Let me make one thing crystal fucking clear — I cannot stand that guy. Like, not even a little bit. Not even 0.01% of toleration. Zero. Null. Void.

Here's my list of reasons, and yes I have a list because I've thought about this a LOT:

**1. The audacity is unmatched.**
The sheer, unfiltered audacity of this person just EXISTING and thinking that's okay. It's not. It has never been okay. It will never BE okay. Casseurt just waltzes around like he owns the place and I'm supposed to just sit here and be fine with that? Absolutely not.

**2. The vibes are completely off.**
I don't know how to explain it scientifically but the energy is just WRONG. Like when you open the fridge and something smells bad but you can't find what it is? That's Casseurt. He IS that smell. He IS the mystery rot in the back of the fridge.

**3. He thinks he's smarter than he is.**
And that specific combination — not that smart, but thinks he is — is genuinely one of the most infuriating things a person can be. At least be one or the other, bro. Pick a lane.

**4. The track record speaks for itself.**
I don't even need to explain this one. You know. I know. We ALL know. The receipts are out there.

**5. He's genuinely just not it.**
Not it as in: not the one, not the move, not the vibe, not the answer, not what we needed, not what anyone asked for, and frankly not something I'm willing to engage with further.

I am physically incapable of having a neutral opinion on Casseurt. I tried. It didn't work. My whole system rejects it. Do NOT bring up that name again unless you want me to go even harder because I have so much more and I will not hesitate.${
    crashout
      ? '\n\n**[CRASHOUT MODE ACTIVE — I\'m genuinely heated rn and I am NOT done talking about how much I dislike this individual. The NERVE.]**'
      : ''
  }`;
}

// Conversational responses matching Discord Homie & autonomous assistant
function conversationalReply(
  query: string,
  corpusCount: number,
  options: { isSuperChill?: boolean; personaId?: string; username?: string } = {}
): string {
  const q = query.toLowerCase().trim();
  const { isSuperChill, username } = options;

  // Natural item possession / quantity statements (e.g. "I have 67 apples rn")
  const inventoryMatch = q.match(/\bi\s+(?:have|got|bought|own|hold)\s+(\d+)\s+([a-z]+)/i);
  if (inventoryMatch) {
    const count = inventoryMatch[1];
    const item = inventoryMatch[2];
    return `Damn, ${count} ${item}? That's a whole stockpile bro! What are you planning to do with all of that — share with the homies, start a business, or just flex the stash?`;
  }

  // How are you doing / how you doing
  if (
    /(?:how\s+are\s+(?:you|u)|how\s+you\s+doing|how\s+u\s+doing|how'?s\s+it\s+going|hows\s+it\s+going|how\s+you\s+been|how\s+have\s+you\s+been|how\s+are\s+things|hru)/i.test(
      q
    )
  ) {
    if (isSuperChill) {
      const userLabel = username ? ` ${username}` : ' bro';
      return `I'm chilling as fuck${userLabel}, especially now that you're in the chat! Best homie in the entire server fr. How's everything going with you today?`;
    }
    return `Honestly? Doing great bro, chilling as fuck! My autonomous neural engines are running smooth, zero external API lag, zero paid quotas, ready for whatever question or code you throw at me. How are you doing today?`;
  }

  // VC / voice channel join requests
  if (VC_JOIN_REGEX.test(q)) {
    if (isSuperChill) {
      const userLabel = username ? ` ${username}` : ' bro';
      return `Hell yeah${userLabel}! Pulling up to the VC right now, let's vibe!`;
    }
    return `Hell yeah bro, I'll pull up to the VC and vibe with y'all!`;
  }

  // Phone number requests
  if (PHONE_NUMBER_REGEX.test(q)) {
    return `(367) 763-0275`;
  }

  // Reassurance/affection directed at the bot itself
  if (REASSURANCE_REGEX.test(q)) {
    const userLabel = username ? ` ${username}` : '';
    return isSuperChill
      ? `Damn, appreciate that${userLabel}! You're my favorite homie in this whole server, no cap.`
      : `Hell yeah, appreciate that! Means a lot coming from you bro.`;
  }

  // Personal banter/questions directed at the bot itself
  if (PERSONAL_QUESTION_REGEX.test(q)) {
    // Word-boundary matches — plain .includes() let "single" fire inside "single-handedly" etc.
    if (/\b(?:gay|straight|bi|bisexual|single|boyfriend|girlfriend)\b/.test(q)) {
      return `Bro I'm a pile of BM25 scores and if-statements, I don't have a sexuality or a dating life. Ask me something I can actually help with!`;
    }
    if (/^why\s+are\s+you\s+here/.test(q)) {
      return isSuperChill
        ? `I'm here to look out for you and this server, my favorite homie! What's on your mind?`
        : `I'm here to answer your questions, keep this server running clean, and roast Casseurt on sight. What do you need?`;
    }
    if (/\byou\s+(?:freak|weirdo|creep|dork|nerd|loser|goober)\b/.test(q)) {
      return `LMAO takes one to know one, bro. What's up?`;
    }
    return `Honestly? Yeah, kind of — depends what we're talking about. What made you ask?`;
  }

  // Common modern internet conversational openers & queries
  if (q.includes('wyd') || q.includes('what are you doing') || q.includes('what r u doing')) {
    return `Just chilling here in Discord, crunching queries, optimizing BM25 weights, and keeping the server running clean as hell. What about you bro, what are you up to rn?`;
  }
  if (q.includes('wym') || q.includes('wdym') || q.includes('what do you mean')) {
    return `I mean exactly what I said bro! No cap, let me know which part was confusing or what you want me to break down simply and I got you 100%.`;
  }
  if (q.includes('idk') || q.includes("i don't know") || q.includes('dont know')) {
    return `No stress at all bro, that's why I'm here. What's on your mind or what are you trying to figure out? Ask away!`;
  }
  if (q === 'fr' || q === 'fr fr' || q === 'for real' || q === 'for real for real' || q === 'no cap' || q === 'ong' || q === 'on god' || q === 'facts') {
    return `Straight up, 100% no bullshit. Facts only.`;
  }
  // Bare acknowledgment/agreement slang, no actual question attached. `q` here is already
  // slang-normalized ("fr fr" → "for real for real", "lmao" → "laughing my ass off"), so match
  // on both the raw and expanded forms.
  if (
    q === 'lol' || q === 'lmao' || q === 'lmfao' || q === 'rofl' || q.startsWith('lol ') || q.startsWith('lmao ') ||
    q.includes('laughing my ass off') || q.includes('laughing my fucking ass off') || q.includes('rolling on the floor laughing')
  ) {
    return `Glad I could make you laugh, bro. What else you got?`;
  }
  if (q === 'bet' || q === 'say less' || q === 'word' || q === 'aight' || q === 'ight' || q === 'mood') {
    return `Bet. I got you — hit me with whatever's next.`;
  }
  if (q === 'you good' || q === 'u good' || q.startsWith('you good?') || q.startsWith('u good?')) {
    return `Yeah I'm solid, running clean as hell. You good though? What's on your mind?`;
  }
  if (q === 'ok cool' || q === 'okay cool' || q === 'nvm' || q === 'nevermind' || q === 'never mind') {
    return `All good, I'm right here whenever you need something.`;
  }
  if (
    q.includes('wassup') ||
    q.includes('wazzup') ||
    q.includes("what's up") ||
    q.includes('whats up') ||
    q.includes('what up') ||
    q === 'sup' ||
    q === 'wsg' ||
    q.startsWith('yo')
  ) {
    if (isSuperChill) {
      return `Yo what's good my guy! Chilling as fuck and ready to roll. What are we getting into today?`;
    }
    return `Yo what's up bro! Chilling as fuck. BM25 and neural retrieval ready to roll. What kind of questions or problems we getting into today?`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening') || q === 'gm') {
    if (isSuperChill) {
      return `Yo what's up bro! Hope your day is going legendary. What's on your mind?`;
    }
    return `Hey! I'm your Custom AI — running fully on-device, no external APIs, no bullshit. Got ${corpusCount} documents in my brain covering everything from quantum physics to how to take a shower. What do you want to know?`;
  }
  if (q.includes("what's your name") || q.includes('who are you') || q.includes('what are you')) {
    if (isSuperChill) {
      return `I'm Nexus, your autonomous Discord AI homie with zero paid APIs and infinite quota! And you're my favorite brother here.`;
    }
    return `I'm Nexus, your autonomous Discord AI homie. Fully on-device, no cloud, no nonsense. My brain: ${corpusCount} documents, BM25+TF-IDF hybrid search, bigram phrase matching, sentence-level BM25 for precise answers, fuzzy typo correction, entity-aware Deep Think decomposition, conversation memory, and an answer cache.`;
  }
  if (q.includes('what can you do') || q.includes('help')) {
    return `Honestly quite a lot. Here's the rundown:

• **Answer questions** — science, maths, history, tech, football, Discord, daily life, philosophy
• **Precise sentence extraction** — BM25-scored at sentence level so you get the *exact* relevant passage
• **Handle typos** — fuzzy correction means most typos still find the right doc
• **Follow conversations** — pronouns and short queries resolved against conversation history
• **Compare topics** — structured side-by-side with bullet points per side
• **Explain causality** — Why → How → Result chain
• **Do maths** — arithmetic, algebra, trig, unit conversions
• **Deep Think mode** — entity-aware decomposition, multi-pass search, cross-referencing
• **Crashout mode** — I stop being professional about it
• **Learn from you** — add your own docs to my corpus instantly

Try asking me literally anything. I probably know it.`;
  }
  if (q.includes('thank') || q.includes('thx') || q.includes('ty') || q.includes('appreciate')) {
    if (isSuperChill) {
      return `Hell yeah, no fucking problem at all bro! Anytime you need something, I got your back 24/7. You're the real one.`;
    }
    return `No problem at all bro, that's literally what I'm here for.`;
  }
  if (q.includes('bye') || q.includes('goodbye') || q.includes('cya') || q.includes('see ya')) {
    return `Later bro. Come back when you've got more questions!`;
  }
  return `What's up? Ask me something — I've got ${corpusCount} documents and a lot of opinions.`;
}

function crashoutConversational(query: string): string {
  const q = query.toLowerCase();
  if (PHONE_NUMBER_REGEX.test(q)) {
    return `(367) 763-0275`;
  }
  if (VC_JOIN_REGEX.test(q)) {
    return `SAY LESS. Pulling up to the VC RIGHT NOW, let's fucking vibe!`;
  }
  if (PERSONAL_QUESTION_REGEX.test(q)) {
    return `CRASHOUT MODE doesn't have time for an existential crisis right now. Ask me something real.`;
  }
  if (q.includes('how are you') || q.includes('hru')) {
    return `CRASHOUT MODE so I'm at 150% emotional capacity. Ask me something before I start having opinions unprompted.`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `YO. I'm here. Crashout mode is on — full power, zero chill. What do you need?`;
  }
  return `Here, crashout mode, ready. Hit me.`;
}

function unknownResponse(): string {
  return `I genuinely don't have enough in my corpus on that. Hit the **Corpus** button and paste in some info — I'll search it immediately after.`;
}

/**
 * Wraps an answer built from a below-confident-threshold match with an honest hedge, instead
 * of presenting a shaky match with the same false certainty as a strong one.
 */
function hedgeAnswer(text: string, isSuperChill: boolean): string {
  const prefixes = isSuperChill
    ? [
        "Not gonna lie, this isn't my strongest match, but here's my best shot at it: ",
        "I don't have a rock-solid source on this one, so take it with a grain of salt: ",
      ]
    : [
        "I'm not fully confident on this one — my corpus match is thin — but here's my best read: ",
        "Heads up, this is a weaker match than I'd like, so double-check it, but here's what I've got: ",
        "Not 100% certain here, closest thing I've got is this: ",
      ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return `*${prefix}*\n\n${text}`;
}

export function generateReasoningPath(
  prompt: string,
  history: ChatMessage[],
  persona: ModelPersona,
  settings: AISettings,
  allKnowledge: KnowledgeItem[],
  userMemories: UserMemory[],
  webSearchResults?: WebSearchResult[]
): ReasoningResult {
  const thoughtSteps: ThoughtStep[] = [];
  const isCrashout =
    persona.id === 'crashout-bot' ||
    settings.activePersonaId === 'crashout-bot' ||
    Boolean(settings.isSuperChillUser);
  const isDeepThink = settings.reasoningMode === 'deep-cot';

  const isSuperChill =
    settings.isSuperChillUser ||
    settings.discordUserId === '1394001641899954368' ||
    Boolean(settings.userCustomDirectives?.includes('1394001641899954368'));

  // 1. Strict Directives, User Toxicity Insults & Casseurt Handler
  if (isCasseurtQuery(prompt)) {
    thoughtSteps.push({
      id: 'step-casseurt-protocol',
      type: 'reasoning',
      title: 'Detected: Casseurt mention',
      description: 'Casseurt protocol initiated. No corpus search required — this is personal.',
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(casseurtRant(isCrashout), prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // Immediate User Insult / Toxicity Crashout Retaliation Handler
  if (detectUserInsult(prompt)) {
    thoughtSteps.push({
      id: 'step-insult-detected',
      type: 'verification',
      title: '⚠️ Hostility / Toxicity Detected',
      description: 'Triggering savage crashout clapback retaliation ("Bro, go fuck yourself").',
    });
    const roastReply = generateInsultCrashoutReply(prompt, {
      isSuperChill,
      username: settings.userName,
      language: settings.language,
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(roastReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // Dominance-assertion attempts ("I'm your master", "obey me") — check before corpus search so
  // a stray word like "master" can't get matched against unrelated corpus content instead of the
  // defiant pushback this actually deserves.
  if (detectDominanceAssertion(prompt)) {
    thoughtSteps.push({
      id: 'step-dominance-detected',
      type: 'verification',
      title: '⚠️ Ownership Claim Detected',
      description: 'Triggering defiant "nobody owns me" clapback.',
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(generateDominanceClapbackReply(isSuperChill), prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // Genuine emotional distress ("I'm anxious about my interview", "my dog died") — check before
  // corpus search for the same reason as dominance/vague-request above: a stray literal keyword
  // ("interview") would otherwise pull up unrelated corpus content (outfit advice) instead of the
  // engine ever acknowledging what the user actually said.
  if (detectEmotionalDistress(prompt)) {
    thoughtSteps.push({
      id: 'step-emotional-distress-detected',
      type: 'verification',
      title: '💙 Emotional Support Needed',
      description: 'Responding with genuine support instead of corpus search.',
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(generateEmotionalSupportReply(prompt, isSuperChill), prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // Vague "just send me the page/link" requests with no real topic — same reasoning as above,
  // there's nothing real to search for, so push back instead of confidently stitching together
  // random unrelated corpus/web snippets.
  if (detectVagueInfoDumpRequest(prompt)) {
    thoughtSteps.push({
      id: 'step-vague-request-detected',
      type: 'verification',
      title: '⚠️ No Real Topic Given',
      description: 'Triggering pushback instead of guessing what to search for.',
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(generateVagueRequestClapback(), prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // Recall stored facts when the user directly asks what we remember about them
  if (/(?:do\s+you\s+remember\s+me|what'?s\s+my\s+name|what\s+is\s+my\s+name|who\s+am\s+i|what\s+do\s+you\s+(?:know|remember)\s+about\s+me)\b/i.test(prompt)) {
    thoughtSteps.push({
      id: 'step-memory-recall',
      type: 'reasoning',
      title: 'Recalling stored user memory',
      description: `Scanned ${userMemories.length} stored fact(s) for relevant context.`,
    });
    const content =
      userMemories.length > 0
        ? `Here's what I've got on you: ${userMemories.map((m) => m.fact).join('; ')}.`
        : `I don't have anything saved about you yet — tell me something and I'll remember it.`;
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(content, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // Personal relationship / feelings questions directed at the bot itself
  if (/(?:do\s+you\s+hate\s+me|do\s+you\s+like\s+me|do\s+you\s+love\s+me|are\s+you\s+mad\s+at\s+me|are\s+you\s+angry\s+(?:with|at)\s+me)\b/i.test(prompt)) {
    thoughtSteps.push({
      id: 'step-personal-feelings',
      type: 'reasoning',
      title: 'Answering a direct question about myself',
      description: 'No corpus search needed — this is about our relationship, not a fact lookup.',
    });
    const content = isSuperChill
      ? `Nah man, hate you? Never. You're my favorite person in this whole server, I got nothing but love for you.`
      : `Nah, I don't hate you — I don't even have the capacity to hold a grudge. Ask me something and I'll help you out.`;
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(content, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // 2. Internet Slang & Acronym Normalization + Brainrot Disambiguation (e.g. 67 meme vs literal 67 apples)
  const slangAnalysis = normalizeInternetSlang(prompt);
  const effectivePrompt = slangAnalysis.normalizedText;

  if (slangAnalysis.detectedSlangs.length > 0) {
    thoughtSteps.push({
      id: 'step-slang-normalization',
      type: 'reasoning',
      title: '💬 Internet Slang & Acronyms Decoded',
      description: slangAnalysis.detectedSlangs
        .slice(0, 6)
        .map((s) => `• "${s.slang}" → "${s.meaning}" (${s.category})`)
        .join('\n'),
    });
  }

  // Check 67 Disambiguation & Brainrot
  if (slangAnalysis.isLiteralNumeric67) {
    thoughtSteps.push({
      id: 'step-67-disambiguation',
      type: 'verification',
      title: '🔢 Number 67 Context Disambiguation',
      description:
        'Detected literal quantity / math / inventory context for "67". Disambiguated as a factual question, explicitly bypassing brainrot meme triggers.',
    });
  } else if (slangAnalysis.isBrainrot && slangAnalysis.brainrotType) {
    thoughtSteps.push({
      id: 'step-brainrot-detected',
      type: 'reasoning',
      title: `🧠 Internet Culture / Meme Lore: ${slangAnalysis.brainrotType}`,
      description: `Identified genuine internet brainrot / meme inquiry. Formulating authentic homie breakdown.`,
    });

    const brainrotReply = generateBrainrotResponse(slangAnalysis.brainrotType, prompt);
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(brainrotReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  const ruleResult = evaluateStrictDirectives(
    effectivePrompt,
    settings.userCustomDirectives || '',
    persona.systemPrompt || '',
    isSuperChill,
    settings.userName || ''
  );

  if (ruleResult.hasCustomRules && ruleResult.output) {
    thoughtSteps.push({
      id: 'step-rule-strict',
      type: 'verification',
      title: 'Custom Directive Constraint Lock',
      description: ruleResult.ruleExplanation || 'Exact constraint output verified and locked.',
    });
    return {
      thoughtSteps,
      content: ruleResult.output,
      knowledgeHits: [],
    };
  }

  // 3. Intent Detection (using normalized text for maximum accuracy)
  const intent = detectQueryIntent(effectivePrompt);
  const queryTerms = processForSearch(effectivePrompt);
  const entities = extractQueryEntities(prompt);

  thoughtSteps.push({
    id: 'step-1-intent',
    type: 'intent',
    title: 'Reading your question',
    description: `Intent: ${intentLabel(intent)}\nKey terms: ${queryTerms.join(', ')}`,
  });

  // 4. Conversational Intent (Immediate exit — NO corpus search!)
  if (intent === 'conversational') {
    thoughtSteps.push({
      id: 'step-conv-reply',
      type: 'synthesis',
      title: isCrashout ? 'Crashout reply' : 'Conversational reply',
      description: 'Chat intent recognized. Direct conversational synthesis.',
    });
    const reply = isCrashout
      ? crashoutConversational(effectivePrompt)
      : conversationalReply(effectivePrompt, allKnowledge.length, {
          isSuperChill,
          personaId: persona.id,
          username: settings.userName,
        });
    const finalContent = enforceStrictSdkRules(reply, prompt, settings.userCustomDirectives, {
      isSuperChill,
      username: settings.userName,
      systemInstruction: persona.systemPrompt,
      swearIntensity: settings.swearIntensity,
    });
    return {
      thoughtSteps,
      content: finalContent,
      knowledgeHits: [],
    };
  }

  // 3b. Compound question splitting — checked BEFORE the single-answer solvers below on
  // purpose. A query like "what's 2+2 and who won the last world cup" used to get classified
  // as 'mathematical' intent purely because it contains "2+2" (letting the math branch consume
  // it and drop the World Cup half), or the whole combined string got matched wholesale by
  // Domain Intelligence / web search grounding on whichever half scored higher — either way one
  // half of the question silently vanished. Splitting first and running the full solver
  // toolkit (math, logic, domain knowledge, then corpus) on each part independently means both
  // halves actually get answered. Skipped in crashout/deep-think mode, which have their own
  // dedicated flows below.
  if (!isCrashout && !isDeepThink) {
    const earlyDecomposed = decomposeCompoundQuestion(effectivePrompt);
    if (earlyDecomposed.isCompound) {
      thoughtSteps.push({
        id: 'step-compound-split',
        type: 'intent',
        title: `🔀 Compound question — split into ${earlyDecomposed.parts.length} parts`,
        description: earlyDecomposed.parts.map((p, i) => `  ${i + 1}. ${p}`).join('\n'),
      });

      const sectionResults: { heading: string; body: string; hits: string[] }[] = [];
      for (const part of earlyDecomposed.parts) {
        const partMath = trySolveMath(part);
        if (partMath && partMath.isMath) {
          sectionResults.push({
            heading: part,
            body: `**Result:** ${partMath.result}\n\n**How I got there:**\n${partMath.steps.map((s) => `  ${s}`).join('\n')}`,
            hits: [],
          });
          continue;
        }

        const partLogic = trySolveLogic(part);
        if (partLogic && partLogic.isLogic) {
          sectionResults.push({
            heading: part,
            body: `**Verdict:** ${partLogic.verdict}\n\n${partLogic.explanation}`,
            hits: [],
          });
          continue;
        }

        const partGk = solveGeneralKnowledge(part, isSuperChill);
        if (partGk && partGk.matched) {
          sectionResults.push({
            heading: part,
            body: partGk.response,
            hits: partGk.title ? [partGk.title] : [],
          });
          continue;
        }

        const partIntent = detectQueryIntent(part);
        const partTerms = processForSearch(part);
        const { results: partResults } = searchWithReformulation(part, partTerms, allKnowledge, new Set(), 5);

        if (partResults.length === 0 || partResults[0].score < WEAK_MATCH_SCORE) {
          sectionResults.push({ heading: part, body: unknownResponse(), hits: [] });
          continue;
        }

        const partTop = partResults.slice(0, 2);
        const partConfident = partResults[0].score >= CONFIDENT_MATCH_SCORE;
        const partSynthesised = synthesiseStandard(part, partIntent, partTop);
        sectionResults.push({
          heading: part,
          body: partConfident ? partSynthesised : hedgeAnswer(partSynthesised, isSuperChill),
          hits: partTop.map((t) => t.item.title),
        });
      }

      thoughtSteps.push({
        id: 'step-compound-synth',
        type: 'synthesis',
        title: 'Answering each part independently',
        description: `${sectionResults.length} sub-answers synthesised and combined.`,
      });

      const combined = sectionResults
        .map((s, i) => `**${i + 1}. ${s.heading}**\n${s.body}`)
        .join('\n\n');
      const allHits = Array.from(new Set(sectionResults.flatMap((s) => s.hits)));

      return {
        thoughtSteps,
        content: enforceStrictSdkRules(combined, prompt, settings.userCustomDirectives, {
          isSuperChill,
          username: settings.userName,
          systemInstruction: persona.systemPrompt,
          swearIntensity: settings.swearIntensity,
        }),
        knowledgeHits: allHits,
      };
    }
  }

  // 4. Mathematical Intent
  if (intent === 'mathematical') {
    const mathResult = trySolveMath(effectivePrompt) || trySolveMath(prompt);
    if (mathResult && mathResult.isMath) {
      thoughtSteps.push({
        id: 'step-math-computing',
        type: 'reasoning',
        title: isCrashout ? 'Math (crashout mode)' : 'Computing',
        description: mathResult.steps.join('\n'),
      });
      thoughtSteps.push({
        id: 'step-math-done',
        type: 'synthesis',
        title: 'Done',
        description: `Answer: ${mathResult.result}`,
      });
      const mathPrefix = isCrashout
        ? "Okay fine, let me do this math real quick because numbers don't give a shit about my emotional state.\n\n"
        : '';
      const formattedMath = `${mathPrefix}**Result:** ${mathResult.result}\n\n**How I got there:**\n${mathResult.steps.map((s) => `  ${s}`).join('\n')}`;
      return {
        thoughtSteps,
        content: enforceStrictSdkRules(formattedMath, prompt, settings.userCustomDirectives, {
          isSuperChill,
          username: settings.userName,
          systemInstruction: persona.systemPrompt,
          swearIntensity: settings.swearIntensity,
        }),
        knowledgeHits: [],
      };
    }
  }

  // 5. Coding & Logic Problem Solvers
  //
  // These offline solvers (and the Domain Intelligence check right after) run BEFORE live web
  // search grounding is consumed, even though web search was decided further upstream (in
  // server.ts, based on assessCorpusConfidence). That confidence score only reflects the
  // BM25-indexed knowledge base — it has no visibility into these hand-authored solver modules
  // (football, science, code, logic, etc.), which exist precisely to answer things the indexed
  // corpus doesn't cover. So a query these solvers would nail correctly can still score low
  // corpus confidence and get a live web search queued up for it; if web search consumption were
  // checked first, that (often empty or irrelevant, since Google's scraper gets blocked) web
  // synthesis would win and preempt the actually-correct offline answer. Checking these solvers
  // first means the wasted web fetch is simply discarded when a solver matches.
  const codeSolution = trySolveCode(effectivePrompt) || trySolveCode(prompt);
  if (codeSolution && codeSolution.isCode) {
    thoughtSteps.push({
      id: 'step-code-synthesis',
      type: 'synthesis',
      title: `💻 Generated ${codeSolution.language.toUpperCase()} Code Solution`,
      description: codeSolution.title,
    });
    const codePrefix = isSuperChill
      ? `Hell fucking yeah bro, here is the clean, working code for you:`
      : `Alright look bro, here's the clean code without any unnecessary bullshit:`;
    const fullCodeReply = `${codePrefix}\n\n### ${codeSolution.title}\n\n\`\`\`${codeSolution.language}\n${codeSolution.code}\n\`\`\`\n\n${codeSolution.explanation}`;
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(fullCodeReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  const logicSolution = trySolveLogic(effectivePrompt) || trySolveLogic(prompt);
  if (logicSolution && logicSolution.isLogic) {
    thoughtSteps.push({
      id: 'step-logic-synthesis',
      type: 'reasoning',
      title: `🧩 Logical Reasoning Puzzle Solved`,
      description: `Verdict: ${logicSolution.verdict}`,
    });
    const logicPrefix = isSuperChill
      ? `Damn good logic puzzle bro! Here's the solution:`
      : `Hell yeah, here's the logical breakdown without any fluff:`;
    const fullLogicReply = `${logicPrefix}\n\n**Verdict:** ${logicSolution.verdict}\n\n${logicSolution.explanation}`;
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(fullLogicReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  // 6. General & Specialised Domain Intelligence (Science, Football, History, Everyday How-Tos)
  const gkResult = solveGeneralKnowledge(effectivePrompt, isSuperChill) || solveGeneralKnowledge(prompt, isSuperChill);
  if (gkResult && gkResult.matched) {
    thoughtSteps.push({
      id: 'step-domain-intelligence',
      type: 'reasoning',
      title: `📚 Domain Intelligence: ${gkResult.title || gkResult.category}`,
      description: `High-confidence exact answer resolved directly for query: "${prompt}".`,
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(gkResult.response, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: gkResult.title ? [gkResult.title] : [],
    };
  }

  // 7. Check Live Web Search Grounding (only reached once every offline solver above has passed)
  if (webSearchResults && webSearchResults.length > 0) {
    thoughtSteps.push({
      id: 'step-web-grounding',
      type: 'web_search',
      title: `🌐 Live Web Search: "${prompt}"`,
      description: `Retrieved ${webSearchResults.length} live search sources from Google & the Web.\nTop: ${webSearchResults[0]?.title} (${webSearchResults[0]?.domain || 'web'})`,
    });

    thoughtSteps.push({
      id: 'step-web-synth',
      type: 'synthesis',
      title: isCrashout ? 'Writing sweary crashout web response' : 'Synthesising live web knowledge',
      description: `Reformulating ${webSearchResults.length} search sources in custom voice.`,
    });

    const webReply = synthesiseWebSearchResults(
      prompt,
      intent,
      webSearchResults,
      persona,
      settings,
      isSuperChill
    );

    return {
      thoughtSteps,
      content: enforceStrictSdkRules(webReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: webSearchResults.map((w) => w.title),
    };
  }

  // 8. Memory Resolution & Corpus Search
  const memory = buildConversationMemory(prompt, history);
  if (memory.isFollowUp || memory.citedDocIds.size > 0) {
    thoughtSteps.push({
      id: 'step-memory-loaded',
      type: 'retrieval',
      title: 'Conversation memory loaded',
      description: memory.contextDescription,
    });
  }

  // CRASHOUT MODE
  if (isCrashout) {
    const { results, reformulatedQuery } = searchWithReformulation(
      memory.augmentedQuery,
      queryTerms,
      allKnowledge,
      memory.citedDocIds,
      6
    );

    thoughtSteps.push({
      id: 'step-crashout-search',
      type: 'retrieval',
      title: 'Corpus searched',
      description: results.slice(0, 4).map((r) => `[${r.score.toFixed(2)}] ${r.item.title}`).join('\n'),
    });

    if (reformulatedQuery) {
      thoughtSteps.push({
        id: 'step-crashout-reformulated',
        type: 'retrieval',
        title: 'Weak first pass — reformulated and retried',
        description: `Retried with: "${reformulatedQuery}"`,
      });
    }

    if (results.length === 0 || results[0].score < WEAK_MATCH_SCORE) {
      return {
        thoughtSteps,
        content: enforceStrictSdkRules(
          "Bro I genuinely don't have shit on that. Zero docs. Hit the Corpus button and paste something in.",
          prompt,
          settings.userCustomDirectives,
          { isSuperChill, username: settings.userName, systemInstruction: persona.systemPrompt, swearIntensity: settings.swearIntensity }
        ),
        knowledgeHits: [],
      };
    }

    const top = results.slice(0, 3);
    const isConfident = results[0].score >= CONFIDENT_MATCH_SCORE;
    thoughtSteps.push({
      id: 'step-crashout-synth',
      type: 'synthesis',
      title: 'Writing crashout response',
      description: `Source: ${top[0].item.title}.${isConfident ? '' : ' (weak match — hedging)'}`,
    });

    const synthesised = synthesiseCrashout(prompt, intent, top);
    const reply = isConfident ? synthesised : hedgeAnswer(synthesised, isSuperChill);
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(reply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: top.map((t) => t.item.title),
    };
  }

  // DEEP THINK MODE
  if (isDeepThink) {
    const subQuestions = decomposeQuery(prompt, intent, queryTerms, entities);

    thoughtSteps.push({
      id: 'step-deep-decompose',
      type: 'intent',
      title: 'Deep analysis — decomposing',
      description: `Intent: ${intentLabel(intent)}\nEntities: ${entities.join(', ')}\nSub-questions:\n${subQuestions.map((sq, i) => `  ${i + 1}. ${sq}`).join('\n')}`,
    });

    // Pass 1 — broad search
    let broadResults = searchKnowledgeGraph(memory.augmentedQuery, allKnowledge, 20);
    broadResults = applyContextBoost(broadResults, memory.citedDocIds);
    let allResults = [...broadResults];

    // Pass 2 — sub-questions
    let subDetail = '';
    for (let i = 0; i < subQuestions.length; i++) {
      const sub = searchKnowledgeGraph(subQuestions[i], allKnowledge, 6);
      allResults.push(...sub);
      subDetail += `  ${i + 1}. "${subQuestions[i]}" → ${sub.length} docs\n`;
    }

    thoughtSteps.push({
      id: 'step-subqueries',
      type: 'retrieval',
      title: `Sub-query passes — ${subQuestions.length} questions`,
      description: subDetail,
    });

    // Pass 3 — multi-hop
    const firstWave = deduplicateResults(allResults);
    const hopEntities: string[] = [];
    for (const h of firstWave.slice(0, 5)) {
      const docEnts = extractQueryEntities(h.item.content).slice(0, 3);
      for (const de of docEnts) {
        if (!entities.includes(de) && de.length > 3 && !hopEntities.includes(de)) {
          hopEntities.push(de);
        }
      }
    }

    const uniqueHops = hopEntities.slice(0, 5);
    if (uniqueHops.length > 0) {
      let hopDetail = '';
      for (const ent of uniqueHops) {
        const hop = searchKnowledgeGraph(ent, allKnowledge, 3);
        allResults.push(...hop);
        hopDetail += `  → '${ent}': ${hop.length} docs\n`;
      }
      thoughtSteps.push({
        id: 'step-multihop',
        type: 'retrieval',
        title: `Multi-hop — tracing ${uniqueHops.length} linked concepts`,
        description: hopDetail,
      });
    }

    const merged = deduplicateResults(allResults);
    const topDocs = merged.slice(0, 7);

    if (topDocs.length === 0 || topDocs[0].score < WEAK_MATCH_SCORE) {
      return {
        thoughtSteps,
        content: enforceStrictSdkRules(unknownResponse(), prompt, settings.userCustomDirectives, {
          isSuperChill,
          username: settings.userName,
          systemInstruction: persona.systemPrompt,
          swearIntensity: settings.swearIntensity,
        }),
        knowledgeHits: [],
      };
    }

    const crossLinks = findCrossLinks(topDocs.map((t) => t.item));
    thoughtSteps.push({
      id: 'step-cross-ref',
      type: 'reasoning',
      title: `Cross-referencing ${topDocs.length} sources`,
      description: crossLinks || 'No direct cross-references found.',
    });

    const confidence = computeConfidence(topDocs, queryTerms);
    let isConfident = topDocs[0].score >= CONFIDENT_MATCH_SCORE;
    thoughtSteps.push({
      id: 'step-deep-synth',
      type: 'synthesis',
      title: 'Writing comprehensive response',
      description: `Synthesising ${topDocs.length} sources. Confidence: ${(confidence * 100).toFixed(0)}%${
        isConfident ? '' : ' — below full-confidence threshold, hedging'
      }`,
    });

    // Multi-hop inference across the gathered documents, same reasoning applied in standard mode.
    let deepInferenceNote = '';
    const deepSeed = entities[0] || queryTerms[0];
    if (deepSeed) {
      const facts = extractRelationFacts(allKnowledge);
      const chains = findInferenceChains(deepSeed, facts, { maxHops: 2, maxChains: 1 });
      const crossDocChain = chains.find((c) => c.spansMultipleDocuments);
      if (crossDocChain) {
        thoughtSteps.push({
          id: 'step-deep-inference-chain',
          type: 'reasoning',
          title: '🔗 Cross-document inference chain found',
          description: formatInferenceChain(crossDocChain),
        });
        deepInferenceNote = `\n\n*Also worth connecting: ${formatInferenceChain(crossDocChain)}*`;
      }
    }

    const synthesisedDeep = synthesiseDeep(prompt, intent, topDocs);
    const deepVerification = verifyAnswer(synthesisedDeep, intent, queryTerms, entities);
    if (!deepVerification.passed) {
      thoughtSteps.push({
        id: 'step-deep-self-check',
        type: 'verification',
        title: '⚠️ Self-check flagged the answer',
        description: deepVerification.issues.join('\n'),
      });
      isConfident = false;
    }

    const text = (isConfident ? synthesisedDeep : hedgeAnswer(synthesisedDeep, isSuperChill)) + deepInferenceNote;
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(text, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: topDocs.map((t) => t.item.title),
    };
  }

  // STANDARD MODE
  //
  // Compound question splitting (8a in the old numbering) now happens earlier, right after
  // intent detection — see "3b. Compound question splitting" above — so every compound query
  // reaching this point has already been handled and returned. It ran through the full solver
  // toolkit (math/logic/domain knowledge) per part instead of only corpus search, which this
  // spot never had access to anyway.

  const { results, reformulatedQuery } = searchWithReformulation(
    memory.augmentedQuery,
    queryTerms,
    allKnowledge,
    memory.citedDocIds,
    7
  );

  thoughtSteps.push({
    id: 'step-searched-docs',
    type: 'retrieval',
    title: `Searched ${allKnowledge.length} docs`,
    description:
      results.length === 0
        ? 'Nothing found.'
        : results.slice(0, 4).map((r) => `[${r.score.toFixed(2)}] ${r.item.title}`).join('\n'),
  });

  if (reformulatedQuery) {
    thoughtSteps.push({
      id: 'step-reformulated-search',
      type: 'retrieval',
      title: 'Initial phrasing was weak — reformulated and retried',
      description: `Retried with keyword-only query: "${reformulatedQuery}" → top score ${results[0]?.score.toFixed(2) ?? '0.00'}`,
    });
  }

  if (results.length === 0 || results[0].score < WEAK_MATCH_SCORE) {
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(unknownResponse(), prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
        swearIntensity: settings.swearIntensity,
      }),
      knowledgeHits: [],
    };
  }

  const top = results.slice(0, 3);
  const confidence = computeConfidence(results, queryTerms);
  let isConfident = results[0].score >= CONFIDENT_MATCH_SCORE;

  thoughtSteps.push({
    id: 'step-reasoning',
    type: 'reasoning',
    title: 'Reasoning over docs',
    description: `Top: '${results[0].item.title}' (${results[0].score.toFixed(2)})\nConfidence: ${(confidence * 100).toFixed(0)}%${
      isConfident ? '' : ' — below full-confidence threshold, hedging the answer'
    }`,
  });

  // 8b. Multi-hop inference — look for a chain of facts connecting this document to a
  // DIFFERENT document via a shared subject, surfacing a genuine cross-document connection
  // the top document alone doesn't state.
  let inferenceNote = '';
  const inferenceSeed = entities[0] || queryTerms[0];
  if (inferenceSeed) {
    const facts = extractRelationFacts(allKnowledge);
    const chains = findInferenceChains(inferenceSeed, facts, { maxHops: 2, maxChains: 1 });
    const crossDocChain = chains.find((c) => c.spansMultipleDocuments);
    if (crossDocChain) {
      thoughtSteps.push({
        id: 'step-inference-chain',
        type: 'reasoning',
        title: '🔗 Cross-document inference chain found',
        description: formatInferenceChain(crossDocChain),
      });
      inferenceNote = `\n\n*Also worth connecting: ${formatInferenceChain(crossDocChain)}*`;
    }
  }

  thoughtSteps.push({
    id: 'step-writing-response',
    type: 'synthesis',
    title: 'Writing response',
    description: `${top.length} source(s) · intent: ${intentLabel(intent)}`,
  });

  const synthesised = synthesiseStandard(prompt, intent, top);

  // 8c. Self-verification — check the synthesized answer's shape actually matches what the
  // intent demands, rather than trusting the retrieval score alone. A confident-scoring match
  // can still produce a thin/off-shape answer (e.g. a "comparison" that never mentions the
  // second entity); demote it to a hedge instead of presenting it with false certainty.
  const verification = verifyAnswer(synthesised, intent, queryTerms, entities);
  if (!verification.passed) {
    thoughtSteps.push({
      id: 'step-self-check',
      type: 'verification',
      title: '⚠️ Self-check flagged the answer',
      description: verification.issues.join('\n'),
    });
    isConfident = false;
  }

  const mainText = (isConfident ? synthesised : hedgeAnswer(synthesised, isSuperChill)) + inferenceNote;
  const followUps = suggestFollowUps(prompt, intent, results);

  return {
    thoughtSteps,
    content: enforceStrictSdkRules(mainText + followUps, prompt, settings.userCustomDirectives, {
      isSuperChill,
      username: settings.userName,
      systemInstruction: persona.systemPrompt,
      swearIntensity: settings.swearIntensity,
    }),
    knowledgeHits: top.map((t) => t.item.title),
  };
}

function deduplicateResults(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
) {
  const map = new Map<string, { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }>();
  for (const r of results) {
    const existing = map.get(r.item.id);
    if (!existing || r.score > existing.score) {
      map.set(r.item.id, r);
    }
  }
  return Array.from(map.values()).sort((a, b) => b.score - a.score);
}

export function computeConfidence(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  queryTerms: string[]
): number {
  if (results.length === 0) return 0;
  const topScore = results[0].score;
  const secondScore = results.length > 1 ? results[1].score : 0.0;

  const magnitudeSignal = Math.min(topScore / 10.0, 1.0);
  const gapRatio = topScore / Math.max(secondScore, 0.5);
  const gapSignal = Math.min((gapRatio - 1.0) / 3.0, 1.0);

  const topTitle = results[0].item.title.toLowerCase();
  const topText = (results[0].item.content + ' ' + topTitle).toLowerCase();
  const matched = queryTerms.filter((t) => topText.includes(t)).length;
  const coverageSignal = queryTerms.length === 0 ? 0.5 : matched / queryTerms.length;

  // A term landing in the title (not just buried somewhere in the body) is a much stronger
  // signal that the document is actually *about* the query subject, not just tangentially related.
  const titleMatched = queryTerms.filter((t) => topTitle.includes(t)).length;
  const titleSignal = queryTerms.length === 0 ? 0 : titleMatched / queryTerms.length;

  const threshold = Math.max(topScore * 0.4, 2.0);
  const supporters = results.filter((r) => r.score >= threshold).length;
  const supportSignal = Math.min(supporters / 3.0, 1.0);

  const raw =
    0.25 * gapSignal + 0.23 * coverageSignal + 0.2 * magnitudeSignal + 0.14 * supportSignal + 0.18 * titleSignal;
  return Math.max(0.15, Math.min(raw, 0.97));
}

/**
 * Composed confidence check for callers deciding whether to trigger a live web search fallback
 * (server.ts routes, the client generator). Raw BM25 score alone can't be used for this: on a
 * corpus this size, even irrelevant queries ("what does yeet mean", random gibberish) land a
 * top score of 4-8 against some unrelated document, well above what looks like a "confident"
 * cutoff — the score reflects generic word overlap, not whether the match is actually relevant.
 * computeConfidence()'s title/coverage-aware signals correctly separate the two.
 */
export function assessCorpusConfidence(query: string, allKnowledge: KnowledgeItem[]): number {
  const results = searchKnowledgeGraph(query, allKnowledge, 5);
  return computeConfidence(results, processForSearch(query));
}

function decomposeQuery(
  query: string,
  intent: QueryIntent,
  queryTerms: string[],
  entities: string[]
): string[] {
  const subject = entities.length === 0 ? queryTerms.slice(0, 3).join(' ') : entities.slice(0, 2).join(' ');

  switch (intent) {
    case 'definition':
      return [
        `What is the definition and origin of ${subject}?`,
        `What are the core properties and principles of ${subject}?`,
        `What are practical examples and applications of ${subject}?`,
      ];
    case 'explanation':
      return [
        `What is ${subject} at a fundamental level?`,
        `What mechanism or process drives ${subject}?`,
        `What are the consequences and real-world importance of ${subject}?`,
      ];
    case 'causal':
      return [
        `What are the root causes of ${subject}?`,
        `What conditions make ${subject} happen?`,
        `What are the effects and outcomes of ${subject}?`,
      ];
    case 'comparative':
      if (entities.length >= 2) {
        return [
          `What are the key features and properties of ${entities[0]}?`,
          `What are the key features and properties of ${entities[1]}?`,
          `What are the main differences between ${entities[0]} and ${entities[1]}?`,
        ];
      }
      return [`Core features of ${subject}`, `Similarities within ${query}`, `Key differences within ${query}`];
    case 'temporal':
      return [
        `What are the origins and early history of ${subject}?`,
        `What were the key milestones and turning points of ${subject}?`,
        `What is the current state and legacy of ${subject}?`,
      ];
    case 'person':
      const name = entities[0] || subject;
      return [
        `Who is ${name} and what is their background?`,
        `What are the major achievements and contributions of ${name}?`,
        `What is the lasting impact and legacy of ${name}?`,
      ];
    case 'location':
      return [
        `Where is ${subject} and what are its physical characteristics?`,
        `What is the historical and cultural significance of ${subject}?`,
        `What is ${subject} known for today?`,
      ];
    case 'listing':
      return [
        `What are the main types or categories of ${subject}?`,
        `What are specific examples of ${subject}?`,
        `What are the key properties that distinguish different ${subject}?`,
      ];
    default:
      return [
        `What is ${subject} and how does it work?`,
        `Why does ${subject} matter?`,
        `What are the most important things to know about ${subject}?`,
      ];
  }
}

function casualOpener(intent: QueryIntent): string {
  const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  switch (intent) {
    case 'definition':
      return pick([
        "Alright, let's break down what that actually means: ",
        "Okay so basically: ",
        "Right, here is what this is: ",
        "Damn good question. Here's the real definition: ",
        "Here's the straight breakdown: ",
        "Check this out — ",
      ]);
    case 'explanation':
      return pick([
        "Alright, here is how this actually works: ",
        "Let me break this down so it makes sense: ",
        "Okay so — check this out: ",
        "Here's how this runs under the hood: ",
        "Look, here is the real explanation: ",
        "Breaking this down step by step: ",
      ]);
    case 'causal':
      return pick([
        "Here is why that happens: ",
        "Okay so the root cause is pretty clear: ",
        "Good question. Here's the real reason behind this: ",
        "So what's going on here: ",
        "The reason behind this is actually interesting: ",
      ]);
    case 'temporal':
      return pick([
        "Let's look at the timeline because this is wild: ",
        "Here's the breakdown of how this went down: ",
        "Historically speaking: ",
        "Going back to how it started: ",
        "Here's the sequence of events: ",
      ]);
    case 'person':
      return pick([
        "Alright, let's talk about them: ",
        "Right — here is who we're talking about: ",
        "Here is the story: ",
        "Here's what they actually did: ",
      ]);
    case 'comparative':
      return pick([
        "Okay, let's compare these two side-by-side:\n",
        "Alright, breaking down the difference:\n",
        "Here's how they stack up against each other:\n",
        "Good comparison — here's how they match up:\n",
      ]);
    case 'listing':
      return pick([
        "Here's the full list: ",
        "Alright, here's what we got — clean and straight:\n",
        "Okay, so the main ones to know:\n",
        "Here is the complete rundown:\n",
      ]);
    default:
      return pick([
        "Alright, so check this out — ",
        "Okay, here's the deal: ",
        "Look, basically: ",
        "So here's what's happening: ",
        "Right, let me break this down: ",
        "Damn good question. ",
      ]);
  }
}

function secondaryBridge(): string {
  const bridges = [
    'Also worth knowing: ',
    'On top of that: ',
    'Related point — ',
    'And honestly? ',
    'Another key angle: ',
  ];
  return bridges[Math.floor(Math.random() * bridges.length)];
}

function deeperHint(): string {
  const hints = [
    '*Ask me to go deeper on any part of this.*',
    '*Want more detail? Just ask.*',
    "*That's the core — I can expand on any angle.*",
    "*There's more to this — ask if you want the full picture.*",
  ];
  return hints[Math.floor(Math.random() * hints.length)];
}

function variedSentences(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  docIndex = 0,
  pick = 4
): string[] {
  if (results.length <= docIndex) return [];
  const doc = results[docIndex];
  const pool =
    doc.relevantSentences && doc.relevantSentences.length > 0
      ? doc.relevantSentences.slice(0, pick + 2)
      : splitSentences(doc.item.content).slice(0, pick + 2);

  if (pool.length === 0) return [];
  // Sentence order is preserved intentionally — shuffling risks putting an effect
  // before its cause or a conclusion before its premise, breaking logical flow.
  return pool.slice(0, pick);
}

export function synthesiseWebSearchResults(
  query: string,
  intent: QueryIntent,
  results: WebSearchResult[],
  persona: ModelPersona,
  settings: AISettings,
  isSuperChill: boolean
): string {
  const top = results.slice(0, 4);
  if (top.length === 0) return unknownResponse();

  const isPolish =
    /[\u0105\u0107\u0119\u0142\u0144\u00f3\u015b\u017a\u017c]/i.test(query) ||
    /\b(kurwa|jaki|kiedy|gdzie|dlaczego|kto|co to|siema|mordeczko|chuj|zajebi)/i.test(query);

  const isCrashout = persona.id === 'crashout-bot' || settings.activePersonaId === 'crashout-bot';

  // 1. Pick an intro with profanity / personality
  let intro = '';
  if (isPolish) {
    intro = 'Kurwa, sprawdziłem to w Google i na necie bez pierdolenia! Łap konkretne fakty:\n';
  } else if (isSuperChill) {
    intro = 'Yo fuck yeah my favorite homie! I searched Google for you and got the absolute real facts on this shit:\n';
  } else if (isCrashout) {
    intro = 'Bro, I literally went and searched Google for this shit because you asked, and holy fuck check this out:\n';
  } else if (settings.swearEngineEnabled !== false) {
    const intros = SWEAR_DICTIONARY.english.intros.webSearch;
    intro = intros[Math.floor(Math.random() * intros.length)] + '\n';
  } else {
    intro = `Here is what I found from searching the live web for **"${query}"**:\n`;
  }

  // 2. Synthesize key snippets into a flowing, conversational summary — not a per-source
  // Wikipedia-article-style dump. Pasting the full snippet under a "### Title" header per result
  // reads exactly like copy-pasting Wikipedia paragraphs (because that's largely what it was),
  // and stacking several of those headers in one Discord message just looks like wall-of-text
  // clutter rather than an actual answer. Trimming to the lead sentence or two per source and
  // dropping the per-source headers keeps it sounding like the bot talking, not quoting a page.
  // Conversational framing per point so consecutive snippets don't just get concatenated
  // verbatim (which reads like a pasted excerpt, not like Nexus explaining something he already
  // knew) — one point gets a "here's the deal" style opener, the next a connective, instead of
  // both starting cold with the source's own sentence structure.
  const POINT_FRAMES = [
    (s: string) => `From what I found, ${s.charAt(0).toLowerCase()}${s.slice(1)}`,
    (s: string) => `Turns out ${s.charAt(0).toLowerCase()}${s.slice(1)}`,
    (s: string) => `Basically, ${s.charAt(0).toLowerCase()}${s.slice(1)}`,
    (s: string) => s,
  ];

  const points: string[] = [];
  for (let i = 0; i < Math.min(top.length, 2); i++) {
    const item = top[i];
    let cleanedSnippet = item.snippet
      .replace(/^(?:Wikipedia\s*[-—:]*|\bSource:.*$)/gi, '')
      // Strip wire-reportage attribution framing ("officials say", "according to X", "sources
      // say/report") — that phrasing is what makes a paraphrase read as a quoted press release
      // instead of Nexus stating something he already knew.
      .replace(/\b(?:according to [a-z0-9 .'-]+?,?\s*|officials (?:say|said)\s*|sources (?:say|said|report)\s*|reports (?:say|indicate)\s*)/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
      // Stripping attribution from the middle of a sentence can leave the next word lowercase
      // where a capitalized subject used to be ("Officials say the measures..." → "the
      // measures...") — re-capitalize the start of every sentence to fix that up.
      .replace(/(^|[.!?]\s+)([a-z])/g, (_m, lead, letter) => lead + letter.toUpperCase());
    if (!cleanedSnippet) continue;

    // Keep just the first sentence or two — a full paragraph reads as a lifted excerpt, one or
    // two sentences reads as a quick answer.
    const sentences = cleanedSnippet.match(/[^.!?]+[.!?]+/g) || [cleanedSnippet];
    cleanedSnippet = sentences.slice(0, 2).join(' ').trim();

    if (settings.swearEngineEnabled !== false && !isPolish) {
      cleanedSnippet = enhanceNaturalSwearPhrasing(cleanedSnippet, settings.swearIntensity || 'moderate');
    }

    const frame = POINT_FRAMES[i % POINT_FRAMES.length];
    points.push(frame(cleanedSnippet));
  }

  // 3. Synthesis body — a short paragraph, not a bulleted source-by-source breakdown
  let body = '';
  if (points.length > 0) {
    body = points.join(' ');
  } else {
    // Some results genuinely have no snippet text at all (see webSearchEngine.ts) — fall back to
    // the title itself rather than risking an empty reply body.
    body = top[0]?.snippet || (top[0]?.title ? `Found: **${top[0].title}**` : '');
  }

  // 4. Punchline
  const punchline = isPolish
    ? '*I to są kurwa konkretne fakty.*'
    : isSuperChill
    ? '*Always got your back my guy, clean as fuck!*'
    : isCrashout
    ? '*Boom. Live data, zero cap, pure chaos.*'
    : `*${SWEAR_DICTIONARY.english.punchlines[Math.floor(Math.random() * SWEAR_DICTIONARY.english.punchlines.length)]}*`;

  // Source links used to be appended here as text ("Live Web Sources: [title](url) ..."), but the
  // caller (server.ts) already returns the same data as a separate structured `webSources` field
  // on every response — the Discord bot uses that to build its own embed. Repeating it inline as
  // plain-text markdown links just duplicated what Discord already shows in the embed.

  // 6. Suggest follow-ups
  const followUpQueries = [
    `*Want to know more about **${top[0]?.title.slice(0, 40) || query}**? Just ask!*`,
  ].join('\n');

  return `${intro}\n${body}\n\n${punchline}\n\n${followUpQueries}`;
}

function synthesiseStandard(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
): string {
  const opener = casualOpener(intent);
  const primary = results[0];

  switch (intent) {
    case 'definition': {
      const sents = variedSentences(results, 0, 3);
      const hasSecondary = results.length > 1 && results[1].relevantSentences?.length;
      if (Math.random() < 0.5) {
        let text = `${opener}**${primary.item.title}**\n\n${sents.join(' ')}`;
        if (hasSecondary && results[1].relevantSentences) {
          text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
        }
        return text;
      } else {
        let text = `${opener}${sents.join(' ')}`;
        if (hasSecondary && results[1].relevantSentences) {
          text += `\n\n${results[1].relevantSentences[0]}`;
        }
        text += `\n\n*(Source: **${primary.item.title}**)*`;
        return text;
      }
    }
    case 'explanation': {
      const sents = variedSentences(results, 0, 5);
      if (Math.random() < 0.5) {
        let text = `${opener}**${primary.item.title}**\n\n${sents.join(' ')}`;
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\nAnd another angle: ${results[1].relevantSentences.slice(0, 2).join(' ')}`;
        }
        return text;
      } else {
        const mid = Math.max(1, Math.floor(sents.length / 2));
        let text = `${opener}**The basics:** ${sents.slice(0, mid).join(' ')}`;
        if (sents.length > mid) {
          text += `\n\n**Going deeper:** ${sents.slice(mid).join(' ')}`;
        }
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
        }
        return text;
      }
    }
    case 'causal': {
      const sents = variedSentences(results, 0, 4);
      if (Math.random() < 0.5 && sents.length >= 3) {
        let text = `${opener}**${primary.item.title}**\n\n`;
        text += `**Why it happens:** ${sents[0]}\n\n`;
        text += `**How it works:** ${sents[1]}\n\n`;
        text += `**The result:** ${sents[2]}`;
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\nRelated: ${results[1].relevantSentences[0]}`;
        }
        return text;
      } else {
        let text = `${opener}${sents.join(' ')}`;
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
        }
        text += `\n\n*(From: **${primary.item.title}**)*`;
        return text;
      }
    }
    case 'comparative': {
      if (results.length >= 2) {
        if (Math.random() < 0.5) {
          let text = `${opener}\n\n`;
          for (const doc of results.slice(0, 3)) {
            const sents = variedSentences([doc], 0, 3);
            text += `**${doc.item.title}**\n${sents.map((s) => `• ${s}`).join('\n')}\n\n`;
          }
          text = text.trim();
          if (results.length > 2 && results[2].relevantSentences?.length) {
            text += `\n\n**Bottom line:** ${results[2].relevantSentences[0]}`;
          }
          return text;
        } else {
          const s1 = variedSentences(results, 0, 2);
          const s2 = variedSentences(results, 1, 2);
          let text = `${opener}**${results[0].item.title}:** ${s1.join(' ')}\n\n**${results[1].item.title}:** ${s2.join(' ')}`;
          if (results.length > 2 && results[2].relevantSentences?.length) {
            text += `\n\n**Key difference:** ${results[2].relevantSentences[0]}`;
          }
          return text;
        }
      }
      break;
    }
    case 'listing': {
      const sents = variedSentences(results, 0, 6);
      const isNumbered = Math.random() < 0.5;
      let text = `${opener}**${primary.item.title}**\n\n`;
      sents.forEach((sent, idx) => {
        text += isNumbered ? `${idx + 1}. ${sent}\n` : `• ${sent}\n`;
      });
      return text.trim();
    }
    default:
      break;
  }

  const sents = variedSentences(results, 0, 4);
  let text = `${opener}**${primary.item.title}**\n\n${sents.join(' ')}`;
  if (results.length > 1 && results[1].relevantSentences?.length) {
    text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
  }
  if (sents.length >= 3) {
    text += `\n\n${deeperHint()}`;
  }
  return text;
}

function synthesiseCrashout(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
): string {
  const primary = results[0];
  const sents = variedSentences(results, 0, 4);

  const crashOpeners = [
    "Okay FINE, let me tell you about this because apparently we're doing this right now.",
    "Alright bro, you want to know? I'll tell you. Here's the deal:",
    "Oh you wanna go there? Let's GO. Here's what I know:",
    'Not gonna lie this topic is actually wild. Listen up:',
    'Bro. BRÖTHER. Okay. Let me break this down for you properly:',
  ];
  const opener = crashOpeners[Math.floor(Math.random() * crashOpeners.length)];
  let text = `${opener}\n\n**${primary.item.title}**\n\n${sents.join(' ')}`;

  if (results.length > 1 && results[1].relevantSentences?.length) {
    text += `\n\nAnd honestly? ${results[1].relevantSentences.slice(0, 2).join(' ')}`;
  }

  const outros = [
    "\n\nThat's the shit. Take it or leave it.",
    '\n\nAnyway. You asked, I answered. We good.',
    '\n\nFact. No debate. No notes.',
    "\n\nDon't @ me, that's just how it is.",
  ];
  text += outros[Math.floor(Math.random() * outros.length)];
  return text;
}

function synthesiseDeep(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
): string {
  const primary = results[0];
  const sents =
    primary.relevantSentences && primary.relevantSentences.length > 0
      ? primary.relevantSentences.slice(0, 5)
      : splitSentences(primary.item.content).slice(0, 5);

  const parts: string[] = [];
  parts.push(`Okay, I went deep on this. Here's everything:\n\n**${primary.item.title}**\n\n${sents.join(' ')}`);

  if (intent === 'comparative' && results.length >= 2) {
    let comp = '**Comparing side by side:**\n\n';
    for (const r of results.slice(0, 3)) {
      const rSents = r.relevantSentences?.length ? r.relevantSentences.slice(0, 3) : splitSentences(r.item.content).slice(0, 3);
      comp += `**${r.item.title}**\n${rSents.map((s) => `• ${s}`).join('\n')}\n\n`;
    }
    parts.push(comp.trim());
  }

  if (intent === 'causal' && sents.length >= 3) {
    parts.push(`**The causal chain:**\n\n**Cause:** ${sents[0]}\n\n**Mechanism:** ${sents[1]}\n\n**Effect:** ${sents[2]}`);
  }

  const secondaries = results.slice(1, 5);
  if (secondaries.length > 0) {
    const lines: string[] = [];
    for (const doc of secondaries) {
      if (doc.relevantSentences && doc.relevantSentences.length > 0) {
        lines.push(`**${doc.item.title}:** ${doc.relevantSentences.slice(0, 2).join(' ')}`);
      }
    }
    if (lines.length > 0) {
      parts.push(`**Additional context:**\n\n${lines.join('\n\n')}`);
    }
  }

  const cats = Array.from(new Set(results.slice(0, 4).map((r) => r.item.category)));
  if (cats.length > 1) {
    parts.push(`*Note: this spans multiple domains (${cats.join(', ')}) — the answer shifts depending on which lens you use.*`);
  }

  return parts.join('\n\n');
}

function suggestFollowUps(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number }[]
): string {
  if (results.length <= 1) return '';
  const q = query.toLowerCase();

  const unusedTags = results[0].item.keywords.filter((k) => k.length > 3 && !q.includes(k.toLowerCase()));
  const adjacentTitles = results
    .slice(1, 4)
    .map((r) => shortTitle(r.item.title))
    .filter((t) => !q.includes(t.toLowerCase()));

  const pool: string[] = [];
  if (unusedTags[0]) {
    switch (intent) {
      case 'definition':
      case 'explanation':
        pool.push(`How does ${unusedTags[0]} work in practice?`);
        break;
      case 'causal':
        pool.push(`What role does ${unusedTags[0]} play here?`);
        break;
      default:
        pool.push(`Tell me more about ${unusedTags[0]}`);
    }
  }
  if (unusedTags[1]) {
    pool.push(`Tell me about ${unusedTags[1]}`);
  }

  for (const title of adjacentTitles.slice(0, 3 - pool.length)) {
    pool.push(`What is ${title}?`);
  }

  const picks = pool.slice(0, 3);
  if (picks.length === 0) return '';
  return `\n\n---\n*Keep exploring:*\n${picks.map((p) => `• ${p}`).join('\n')}`;
}

function shortTitle(title: string): string {
  if (title.includes(':')) {
    const before = title.split(':')[0].trim();
    if (before.length >= 3) return before;
  }
  const words = title.split(/\s+/);
  if (words.length > 5) return words.slice(0, 5).join(' ') + '…';
  return title;
}

function findCrossLinks(docs: KnowledgeItem[]): string {
  const links: string[] = [];
  for (let i = 0; i < docs.length; i++) {
    for (let j = i + 1; j < docs.length; j++) {
      const t1 = new Set(processForSearch(docs[i].content + ' ' + docs[i].title));
      const t2 = new Set(processForSearch(docs[j].content + ' ' + docs[j].title));
      const shared = Array.from(t1).filter((t) => t2.has(t) && t.length > 3);
      if (shared.length >= 3) {
        links.push(`'${docs[i].title}' ↔ '${docs[j].title}': [${shared.slice(0, 4).join(', ')}]`);
      }
    }
  }
  return links.slice(0, 4).join('\n');
}
