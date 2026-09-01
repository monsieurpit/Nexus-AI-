/**
 * Prompt-level typo correction.
 *
 * semanticEngine's correctSemanticTypos and bm25Engine's correctTypos both fix typos only
 * *inside scoring* — the embedding vector and the retrieval term list. Neither one changes the
 * text that detectQueryIntent, decomposeCompoundQuestion, or the math/logic/code solvers read,
 * so a misspelled question word ("wut is the squar root of 81") took a completely wrong path
 * through the pipeline before retrieval scoring ever got a chance to compensate: wrong intent,
 * no solver, random corpus match.
 *
 * This runs on the prompt itself, before intent detection, and is deliberately far narrower
 * than either scoring-layer corrector, because a wrong correction here changes routing rather
 * than just nudging a score. An earlier, more generous version of this file was checked against
 * /usr/share/dict/words and rewrote ~875 real English words ("flower" -> "power", "decided" ->
 * "divided", "yeah" -> "year", "robot" -> "root") — the exact failure mode this session already
 * fixed twice in the scoring correctors. What survived that audit is three narrow tiers:
 *
 *   1. A reviewed literal map of chat misspellings, every entry a non-word.
 *   2. Edit-distance-1 correction toward question words, in sentence-lead position ONLY —
 *      the position where a misspelling actually costs an intent classification, and the one
 *      position where ordinary content words essentially never appear.
 *   3. Edit-distance-1 correction toward a handful of long routing keywords anywhere in the
 *      sentence, gated on a 5-letter floor.
 *
 * All three skip any token that is already a real word (stopword, corpus vocabulary word, or a
 * listed near-miss), the guard that stopped "that" -> "what" and "dogs" -> "logs" earlier.
 */

import { STOP_WORDS, levenshteinDistance, stem, isAdjacentTransposition } from './bm25Engine';

// Tier 2: question/lead words, corrected only when they open the message. detectQueryIntent
// branches almost entirely on `q.startsWith(...)` of exactly these, so a typo here is what
// actually costs an intent classification.
const LEAD_TARGETS = [
  'what', 'whats', 'how', 'hows', 'why', 'who', 'whos', 'where', 'wheres', 'when', 'whens',
  'which', 'whose', 'explain', 'define', 'describe', 'compare', 'calculate',
];

// Tier 3: long routing keywords detectQueryIntent / the math trigger test for mid-sentence.
// Everything here is >=6 letters on purpose — at 4-5 letters a single edit reaches far too many
// ordinary words to correct toward safely without a real dictionary to check against.
const KEYWORD_TARGETS = [
  'explain', 'definition', 'describe', 'compare', 'difference', 'between', 'versus',
  'calculate', 'compute', 'convert', 'square', 'divided', 'multiplied', 'factorial',
  'average', 'percent', 'capital', 'because', 'examples', 'invented', 'discovered',
];
const ALL_TARGETS = new Set([...LEAD_TARGETS, ...KEYWORD_TARGETS]);

// Real English words one edit from a target that no other guard covers (they are neither
// stopwords nor reliably present in a 200-doc corpus vocabulary). Each was found by running
// this corrector over /usr/share/dict/words.
const PROTECTED_WORDS = new Set([
  'wheat', 'chat', 'whit', 'wham', 'watt', 'watts', 'shat', 'ghat', 'khat',
  'hose', 'nose', 'bows', 'cows', 'rows', 'vows', 'howl', 'howls', 'holy', 'shows', 'knows',
  'wren', 'whim', 'whip', 'whir', 'whom', 'whose', 'whore', 'chose', 'close', 'those',
  'well', 'wells', 'weds', 'were', 'here', 'hers', 'herds', 'whorl',
  'defile', 'defiled', 'defies', 'refine', 'divine', 'divide', 'divides', 'define',
  'compere', 'compare', 'compact', 'compile', 'compose', 'compete',
  'squire', 'squares', 'scare', 'spare', 'stare', 'share', 'snare', 'squared',
  'capitol', 'capitals', 'capitate', 'because', 'beacon',
  'percents', 'present', 'averages', 'coverage',
  'inverted', 'invited', 'invents', 'invented',
  'convert', 'covert', 'concert', 'consort',
  'betwixt', 'beteem', 'between',
  'dividend', 'dividends', 'multiplier', 'multipliers', 'indented', 'commute', 'commuter',
  'convent', 'percept', 'overage', 'whereas', 'whew', 'chow', 'whits', 'coverage', 'leverage',
]);

// Chat spellings too far from their target for the distance tiers to reach safely (2 edits at
// 3-5 letters is far too loose to enable generically), but unambiguous enough to be worth a
// reviewed literal entry. Every key here is a non-word.
// A Map, not an object literal — plain-object lookup inherits Object.prototype, so a user typing
// "constructor", "toString" or "hasOwnProperty" got a truthy hit and had their word replaced with
// the stringified builtin ("constructor" -> "function Object() { [native code] }").
const CHAT_TYPO_MAP = new Map<string, string>(Object.entries({
  wut: 'what', wat: 'what', whut: 'what', wot: 'what', wht: 'what', whta: 'what', waht: 'what',
  wats: 'whats', wuts: 'whats', whts: 'whats', whatis: 'what is',
  teh: 'the', hte: 'the', taht: 'that', tht: 'that',
  hwy: 'why', wyh: 'why',
  wehn: 'when', whn: 'when',
  wher: 'where', whre: 'where', wehre: 'where',
  wich: 'which', whcih: 'which',
  becuase: 'because', becasue: 'because',
  adn: 'and', nad: 'and',
  explian: 'explain', expalin: 'explain', explane: 'explain', explan: 'explain',
  definiton: 'definition', defintion: 'definition', defenition: 'definition',
  differnce: 'difference', diference: 'difference', differance: 'difference',
  compair: 'compare', comapre: 'compare',
  squar: 'square', sqaure: 'square', squre: 'square',
  divded: 'divided', divied: 'divided', divideded: 'divided',
  calculat: 'calculate', caculate: 'calculate', calclate: 'calculate',
  multiplyed: 'multiplied', mutliplied: 'multiplied',
  percentt: 'percent', precent: 'percent',
}));

// Polish counterpart of LEAD_TARGETS/KEYWORD_TARGETS above — added alongside this session's
// detectQueryIntent() fix, which added Polish question-word classification to reasoningEngine.ts
// for the first time. Without this, a typo'd Polish lead word ("jka jest stolica polski" instead
// of "jaka") would still misclassify intent even after that fix — the exact same problem this
// whole file exists to solve for English, just never extended to Polish. Kept to the same 4+
// letter floor as English's own short-word caution (jak/kto/co/czy/ile are all 2-3 letters, too
// short for edit-distance-1 to reach safely without a real dictionary — "kot"/cat and "kto"/who
// are themselves a transposition pair, exactly the "hwo" ambiguity English already has to special-
// case, so those stay uncorrected by design rather than guessed at).
const LEAD_TARGETS_PL = [
  'gdzie', 'kiedy', 'dlaczego', 'czemu', 'jaki', 'jaka', 'jakie', 'jaką', 'wyjaśnij', 'wytłumacz',
];
const KEYWORD_TARGETS_PL = [
  'wyjaśnij', 'wytłumacz', 'porównaj', 'różnica', 'oblicz', 'policz', 'dlaczego', 'stolica',
  'procent', 'podziel', 'pomnóż', 'wynalazł', 'odkrył', 'wyjaśnia',
];
const ALL_TARGETS_PL = new Set([...LEAD_TARGETS_PL, ...KEYWORD_TARGETS_PL]);

// Reviewed literal map of common Polish chat typos, same reasoning as CHAT_TYPO_MAP above —
// outranks the generic edit-distance mechanism for shapes worth a specific, checked entry rather
// than trusting a distance-1 guess.
const CHAT_TYPO_MAP_PL = new Map<string, string>(Object.entries({
  gdize: 'gdzie', gdzje: 'gdzie', gdzoe: 'gdzie',
  kiedu: 'kiedy', kiwdy: 'kiedy',
  dlczego: 'dlaczego', dlaczeg: 'dlaczego',
  // Bare, no-diacritic spellings of a diacritic-bearing target — the most common real-world
  // "typo" for Polish text typed without easy access to accented characters, distinct from the
  // genuine chat-typo shapes above.
  wyjasnij: 'wyjaśnij', wyjaśnji: 'wyjaśnij',
  wytlumacz: 'wytłumacz',
  roznica: 'różnica', rożnica: 'różnica',
  porownaj: 'porównaj',
  wynalazl: 'wynalazł',
  odkryl: 'odkrył',
}));

// "hwo" is an adjacent transposition of BOTH "how" and "who", so it can only be resolved from
// what follows it. "dose"/"si" are real words (a dose of medicine, Spanish "sí") and so are only
// rewritten in the one position where they are unambiguously a typo: right after a question word.
const HOW_FOLLOWERS = /^(?:does|do|did|can|could|to|much|many|long|far|come|old|often|about)\b/i;
const QUESTION_WORD = /^(?:what|whats|how|hows|why|who|whos|where|wheres|when|whens|which)$/i;

export interface PromptCorrection {
  from: string;
  to: string;
}

export interface CorrectedPrompt {
  text: string;
  corrections: PromptCorrection[];
}

// "sooo" -> "so", "reallllly" -> "really". Runs of 3+ are emphasis, never spelling; a run of
// exactly 2 is left alone because doubled letters are ordinary English ("really", "boot").
function collapseElongation(word: string, isKnownWord: (w: string) => boolean): string {
  // Under 4 letters a tripled letter is an acronym or Roman numeral, not elongation — "III"
  // was being collapsed to "ii" and "PPP" to "pp".
  if (word.length < 4 || !/(.)\1\1/.test(word)) return word;
  const doubled = word.replace(/(.)\1{2,}/g, '$1$1');
  if (isKnownWord(doubled.toLowerCase())) return doubled;
  const single = word.replace(/(.)\1{2,}/g, '$1');
  if (isKnownWord(single.toLowerCase())) return single;
  return doubled;
}

function closestTarget(token: string, targets: string[], minLen: number): string | null {
  if (token.length < minLen) return null;
  let best: string | null = null;
  let tied = false;
  for (const target of targets) {
    if (Math.abs(target.length - token.length) > 1) continue;
    if (levenshteinDistance(token, target) > 1 && !isAdjacentTransposition(token, target)) continue;
    if (!best) best = target;
    else if (target !== best) tied = true;
  }
  // An ambiguous shape is left as typed rather than coin-flipped into one routing path.
  return tied ? null : best;
}

/**
 * Corrects routing-critical misspellings in a raw user prompt. `vocabulary` is the corpus
 * vocabulary (stemmed) — any word the corpus itself uses is treated as correctly spelled.
 */
export function correctPromptTypos(text: string, vocabulary: Set<string>): CorrectedPrompt {
  const corrections: PromptCorrection[] = [];
  const isKnownWord = (w: string) =>
    STOP_WORDS.has(w) ||
    PROTECTED_WORDS.has(w) ||
    ALL_TARGETS.has(w) ||
    ALL_TARGETS_PL.has(w) ||
    vocabulary.has(w) ||
    vocabulary.has(stem(w));

  // Polish letters added to every word-boundary regex in this function — previously ASCII-only
  // (`[A-Za-z]`), which meant any token containing a Polish diacritic (ą ć ę ł ń ó ś ź ż) failed
  // the "is this actually a word" check below and was silently skipped from correction entirely,
  // regardless of whether a Polish target list existed. Verified live: "jaką jest stolica" wasn't
  // even considered for correction before this fix, target list or not.
  const PL_LETTERS = 'a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ';
  const parts = text.split(/(\s+)/);
  let seenWord = false;
  const out = parts.map((tok, idx) => {
    if (!tok || /^\s+$/.test(tok)) return tok;
    const leading = tok.match(new RegExp(`^[^${PL_LETTERS}]*`))?.[0] ?? '';
    const trailing = tok.match(new RegExp(`[^${PL_LETTERS}]*$`))?.[0] ?? '';
    const core = tok.slice(leading.length, tok.length - trailing.length);
    if (core.length < 2 || !new RegExp(`^[${PL_LETTERS}]+$`).test(core)) {
      seenWord = true;
      return tok;
    }
    const isLead = !seenWord;
    seenWord = true;

    const lower = core.toLowerCase();
    const rewrite = (replacement: string) => {
      if (replacement === lower) return tok;
      corrections.push({ from: core, to: replacement });
      return leading + replacement + trailing;
    };
    const nextWord = () => (parts[idx + 2] ?? '').replace(/[^A-Za-z]/g, '').toLowerCase();

    const collapsed = collapseElongation(lower, isKnownWord);
    if (collapsed !== lower) return rewrite(collapsed);

    // Context-only rewrites: real words that are unambiguous typos in exactly one position.
    // These run ahead of the isKnownWord gate because the whole point is that the token IS a
    // real word elsewhere.
    const prevWord = (parts[idx - 2] ?? '').replace(/[^A-Za-z]/g, '').toLowerCase();
    if ((lower === 'dose' || lower === 'si') && QUESTION_WORD.test(prevWord)) {
      return rewrite(lower === 'dose' ? 'does' : 'is');
    }
    // "capitol of X" is never the building; anywhere else "capitol" is left alone.
    if (lower === 'capitol' && nextWord() === 'of') return rewrite('capital');
    if (lower === 'hwo') return rewrite(HOW_FOLLOWERS.test(nextWord()) ? 'how' : 'who');

    // The reviewed literal map outranks the isKnownWord gate on purpose: `vocabulary` holds
    // *stems*, not words, so it is a poor "is this a real word" oracle in both directions. It
    // contains truncated non-words ("calculat" from "calculated", "definit", "recur") that
    // wrongly protected genuine misspellings from ever being fixed.
    const literal = CHAT_TYPO_MAP.get(lower) ?? CHAT_TYPO_MAP_PL.get(lower);
    if (literal) return rewrite(literal);

    if (isKnownWord(lower)) return tok;

    const lead = isLead ? closestTarget(lower, LEAD_TARGETS, 4) : null;
    if (lead) return rewrite(lead);
    const keyword = closestTarget(lower, KEYWORD_TARGETS, 6);
    if (keyword) return rewrite(keyword);

    // Polish counterparts of the two generic tiers above — see LEAD_TARGETS_PL's comment for why
    // this exists.
    const leadPl = isLead ? closestTarget(lower, LEAD_TARGETS_PL, 4) : null;
    if (leadPl) return rewrite(leadPl);
    const keywordPl = closestTarget(lower, KEYWORD_TARGETS_PL, 5);
    if (keywordPl) return rewrite(keywordPl);
    return tok;
  });

  return { text: out.join(''), corrections };
}
