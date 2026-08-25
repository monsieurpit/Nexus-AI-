import { levenshteinDistance } from './bm25Engine';

// Real, free, offline Polish dictionary (MIT/GPL/LGPL/MPL — the same one Firefox/LibreOffice spell
// -check with) used as a quality gate on Polish LLM output, not just a language-identity check.
//
// 'nspell'/'dictionary-pl' are loaded lazily via dynamic import, NOT as static top-level imports,
// and only when actually running in Node. This file is reachable from the browser bundle too (App
// .tsx -> generator.ts -> reasoningEngine.ts -> localLlmClient.ts -> here, for the client-side
// generation path), and dictionary-pl's own module uses top-level await internally — Vite's
// production build tries to transform every statically-reachable module for its configured browser
// targets (chrome87 etc.), which don't support top-level await, and fails the whole build over a
// dependency that never actually runs in the browser in the first place (this quality gate only
// matters for real Ollama-backed Polish generation, which requires OLLAMA_BASE_URL — never set in
// a browser context). A dynamic import deferred until first real use, combined with these packages
// marked `external` in vite.config.ts (so Vite never attempts to bundle/transform them for the
// client target at all), keeps this working server-side while making it truly inert in the browser
// bundle instead of just "unlikely to run".
let spellPromise: Promise<{ correct: (w: string) => boolean; suggest: (w: string) => string[] } | null> | null =
  null;

function getSpell() {
  if (typeof window !== 'undefined') return Promise.resolve(null);
  if (!spellPromise) {
    spellPromise = (async () => {
      const [{ default: nspell }, { default: dictionary }] = await Promise.all([
        import('nspell'),
        import('dictionary-pl'),
      ]);
      // dictionary-pl exports its affix/dic data as Uint8Array; @types/nspell's signature wants a
      // Node Buffer specifically (Buffer is a Uint8Array subclass, not the reverse) — wrap explicitly.
      return nspell(Buffer.from(dictionary.aff), Buffer.from(dictionary.dic));
    })();
  }
  return spellPromise;
}

// Words the bot's persona/topics legitimately use that a general-purpose dictionary won't know
// (platform/brand names) — checked against these before being counted as "invalid" so a perfectly
// normal mention of Discord doesn't count against a response's Polish quality.
const KNOWN_PROPER_NOUNS = new Set(['discord', 'nexus', 'spotify', 'youtube', 'tiktok', 'instagram', 'twitter']);

/**
 * Returns what fraction of a Polish response's real words (3+ letters) aren't recognized by the
 * dictionary — a direct, measurable signal for "how much of this is actually Polish vs. invented/
 * garbled text", complementing localLlmClient.ts's language-identity check (which only asks "is
 * this Polish at all", not "is this GOOD Polish"). Only meaningful on text already confirmed to be
 * Polish — running this on English text scores meaninglessly high, since no English word is a
 * valid Polish word either. Returns 0 (not flagged) when there isn't enough content to judge
 * reliably, so a short reply never gets wrongly penalized for having too little signal.
 */
export async function computeInvalidPolishWordRatio(text: string): Promise<number> {
  const tokens = text.match(/[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]+/g) || [];
  const judgeable = tokens.filter((w) => w.length >= 3);
  if (judgeable.length < 3) return 0;
  const spell = await getSpell();
  if (!spell) return 0;
  const invalid = judgeable.filter((w) => !spell.correct(w) && !KNOWN_PROPER_NOUNS.has(w.toLowerCase()));
  return invalid.length / judgeable.length;
}

/**
 * Absolute count of invalid words, complementing the ratio above. Reported live: a ~35-word
 * response with 3-4 outright invented words ("trączonicy", "szaleniecński") scored only ~11%
 * invalid — comfortably under the 25% ratio threshold calibrated for separating overall-clean vs.
 * overall-broken responses — while still reading as obviously bad because a handful of glaring
 * nonsense words stand out regardless of how long the surrounding correct text is. The ratio alone
 * doesn't catch that on a longer response; a small absolute count does, without having to lower the
 * ratio threshold (and risk over-rejecting genuinely fine longer responses that just have more
 * total words).
 */
export async function countInvalidPolishWords(text: string): Promise<number> {
  const tokens = text.match(/[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]+/g) || [];
  const judgeable = tokens.filter((w) => w.length >= 3);
  if (judgeable.length < 3) return 0;
  const spell = await getSpell();
  if (!spell) return 0;
  return judgeable.filter((w) => !spell.correct(w) && !KNOWN_PROPER_NOUNS.has(w.toLowerCase())).length;
}

// Specific, observed-live wrong-word-choice phrases that the dictionary gate above can never
// catch: both "danin" (genitive plural of "danina", tribute/levy) and "sezony" (nominative/
// accusative plural of "sezon", seasons) are real, correctly-spelled Polish words — spell.correct()
// accepts them — just the wrong word/case for these specific governing phrases ("do dań" = "of
// dishes" was clearly meant, not "do danin"; "koniec sezonu" = "the end of the season" always takes
// genitive singular after "koniec", never "koniec sezony"). This is a lexical/grammar mistake, not
// a spelling one, so no dictionary-based check catches it — matched on the exact reported governing
// phrase (not the bare word) to avoid rewriting a genuinely correct, unrelated use of either word
// elsewhere in a response.
const KNOWN_PHRASE_FIXES: Array<[RegExp, string]> = [
  [/\bdo\s+danin\b/gi, 'do dań'],
  [/\bkoniec\s+sezony\b/gi, 'koniec sezonu'],
];

export function fixKnownPolishPhraseMistakes(text: string): string {
  let fixed = text;
  for (const [pattern, replacement] of KNOWN_PHRASE_FIXES) {
    fixed = fixed.replace(pattern, replacement);
  }
  return fixed;
}

/**
 * Auto-fixes invalid Polish words in-place, but only the confident cases — small, single-suffix
 * slips (a wrong case ending, a dropped/extra letter) where the dictionary's own top suggestion is
 * a close edit away, e.g. "Footballa" (genitive) -> "Football" (nominative), reported live as
 * exactly this kind of error. Tested directly against several other real invented words from live
 * reports ("kurapią", "myszę") and confirmed this does NOT try to fix those — either there's no
 * close-enough suggestion, or the real intended word isn't reliably identifiable from spelling
 * distance alone. That's intentional: a wrong word swapped for a DIFFERENT wrong word reads worse
 * than an honest fallback, so this only acts when it's actually confident, and leaves everything
 * else for computeInvalidPolishWordRatio's gate (localLlmClient.ts) to catch and fall back on.
 */
export async function autoCorrectPolishText(text: string): Promise<string> {
  const spell = await getSpell();
  if (!spell) return text;

  // Async replacement isn't supported by String.replace's callback, so matches are collected
  // first (with their positions) and the string is reassembled afterward instead.
  const matches = Array.from(text.matchAll(/[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]+/g));
  let result = '';
  let lastIndex = 0;
  for (const match of matches) {
    const word = match[0];
    const index = match.index ?? 0;
    result += text.slice(lastIndex, index) + correctWord(word);
    lastIndex = index + word.length;
  }
  result += text.slice(lastIndex);
  return result;

  function correctWord(word: string): string {
    if (word.length < 3) return word;
    if (spell!.correct(word) || KNOWN_PROPER_NOUNS.has(word.toLowerCase())) return word;

    const suggestions = spell!.suggest(word);
    if (suggestions.length === 0) return word;

    // nspell's own suggestion ORDER isn't purely edit-distance — it's frequency-weighted too, so
    // its first suggestion isn't always the closest one. Re-rank by actual edit distance instead
    // of trusting nspell's frequency bias, and — critically — track whether more than one
    // candidate ties for closest. Observed live: "jestes" sits exactly one edit from BOTH "jesteś"
    // ("you are", the almost-certainly-intended word, just missing its accent) AND "jestem" ("I
    // am", a different grammatical person entirely) — genuinely ambiguous from spelling alone, no
    // way to know which without understanding the sentence's grammar. Auto-correcting only when
    // there's a single unambiguous closest match avoids confidently picking the wrong one of two
    // equally-plausible real words — a coin-flip like that is worse than leaving the word alone.
    let bestDistance = levenshteinDistance(word.toLowerCase(), suggestions[0].toLowerCase());
    let tiedCandidates = [suggestions[0]];
    for (const candidate of suggestions.slice(1, 8)) {
      const d = levenshteinDistance(word.toLowerCase(), candidate.toLowerCase());
      if (d < bestDistance) {
        bestDistance = d;
        tiedCandidates = [candidate];
      } else if (d === bestDistance) {
        tiedCandidates.push(candidate);
      }
    }
    if (bestDistance > 1) return word;
    if (tiedCandidates.length === 1) return tiedCandidates[0];

    // Multiple candidates tie for closest — reported live as "footballa" (genitive of the
    // loanword "football") matching FOUR different case forms (football/footballe/footballi/
    // footballu) equally by edit distance, all really the same word just declined differently.
    // That's a different situation from a genuine ambiguity like "jestes" -> "jestem"/"jesteś"
    // (two entirely different words, same length, same distance — no safe way to pick). The
    // distinguishing signal: when exactly one tied candidate is uniquely shortest, it's very
    // likely the base/nominative form a declined loanword's other case-suffixed forms were all
    // built from — safe to prefer. When the shortest is ALSO tied (as with jestem/jesteś, both 6
    // letters), there's no such signal, and this correctly declines to guess between two
    // genuinely different, equally-valid words.
    const shortestLength = Math.min(...tiedCandidates.map((c) => c.length));
    const shortestCandidates = tiedCandidates.filter((c) => c.length === shortestLength);
    return shortestCandidates.length === 1 ? shortestCandidates[0] : word;
  }
}
