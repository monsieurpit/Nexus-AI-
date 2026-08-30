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

// Building the dictionary (nspell's constructor parses a ~4.7MB affix/word-list file — hundreds of
// thousands of entries — entirely synchronously) is genuinely expensive, and it's a one-time cost
// per process, not per-request. If it ever throws (a bad deploy, an OOM mid-parse, anything), the
// old code cached the REJECTED promise forever — `if (!spellPromise)` only checks for null, not
// for a promise that already failed — so one bad load permanently broke every future Polish
// message for the rest of that process's uptime with no way to recover short of a restart. Now
// clears spellPromise back to null on failure so the next call gets a fresh attempt.
function getSpell() {
  if (typeof window !== 'undefined') return Promise.resolve(null);
  if (!spellPromise) {
    spellPromise = (async () => {
      try {
        const [{ default: nspell }, { default: dictionary }] = await Promise.all([
          import('nspell'),
          import('dictionary-pl'),
        ]);
        // dictionary-pl exports its affix/dic data as Uint8Array; @types/nspell's signature wants a
        // Node Buffer specifically (Buffer is a Uint8Array subclass, not the reverse) — wrap explicitly.
        return nspell(Buffer.from(dictionary.aff), Buffer.from(dictionary.dic));
      } catch (err) {
        spellPromise = null;
        throw err;
      }
    })();
  }
  return spellPromise;
}

// Fired once, fire-and-forget, as early as possible in the process's life (see server.ts) so the
// expensive synchronous parse above happens during deploy warmup instead of blocking the first
// real Polish message a user sends. nspell's constructor blocks the entire single-threaded event
// loop for its whole duration — no `await`/timeout wrapper can interrupt synchronous work once it
// starts, so the only real fix is making sure that block happens when nobody's waiting on it,
// not mid-request. Observed live: a Polish message got Railway's own "Application failed to
// respond" (502) after ~17s with no application-level error at all, consistent with the event
// loop being fully blocked long enough for Railway's gateway to give up waiting — this warms the
// dictionary before any user ever triggers that cold-start cost.
export function warmPolishDictionary(): void {
  getSpell().catch(() => {
    // Swallowed deliberately: a failed warmup just means the next real Polish message pays the
    // cold-start cost itself (and can retry, thanks to the fix above) instead of crashing startup.
  });
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
  // "po polsko" (reported live: "mówienia po polsko") is never correct Polish in any context —
  // the adverbial "in Polish" is always "po polsku", unlike the two entries above this doesn't
  // need a governing-phrase match to stay safe, a bare word-boundary replace can't collide with a
  // legitimate alternate meaning.
  [/\bpo\s+polsko\b/gi, 'po polsku'],
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
// spell.suggest() is a genuinely expensive fuzzy search (nowhere near as cheap as the O(1)-ish
// spell.correct() lookup) — this model's well-documented Polish weaknesses mean a single garbled
// response can have a dozen+ invalid words, and this function used to call suggest() on every
// single one, unconditionally, before the quality gate even runs (a response bad enough to
// eventually get discarded and replaced by a template fallback still paid the full correction
// cost first). Observed live: Polish requests intermittently 502'd on Railway even after fixing
// the one-time dictionary-load cost — this per-response, per-word cost is the other half of it.
// Capped so a response already too garbled to realistically salvage doesn't keep paying for more
// suggest() calls that were never going to save it anyway.
const MAX_SUGGEST_CALLS_PER_RESPONSE = 6;

export async function autoCorrectPolishText(text: string): Promise<string> {
  const spell = await getSpell();
  if (!spell) return text;

  let suggestCallsUsed = 0;

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
    if (suggestCallsUsed >= MAX_SUGGEST_CALLS_PER_RESPONSE) return word;
    suggestCallsUsed++;

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
    // This function exists to fix wrong-case-ending typos (a suffix slip, per the doc comment
    // above) — a legitimate correction never needs to touch the word's FIRST letter, since Polish
    // case/conjugation endings are always suffixes. Reported live: a foreign loanword/slang term
    // ("Wallahi", not in the Polish dictionary at all) sitting in an otherwise-Polish response got
    // its neighboring English words silently mangled — "swear" -> "Wear", "crazy" -> "razy",
    // "that's" -> "hat's" — because Polish rarely starts words with those consonant clusters, so
    // nspell's closest real-Polish-word match is naturally a front-letter deletion. That's never
    // what this feature is for; it's always a sign the "invalid" word is foreign/loaned rather
    // than a genuine Polish typo, and should be left alone rather than "corrected" into a
    // same-length-minus-one unrelated word. Filtering to only first-letter-preserving candidates
    // rules this out while leaving every genuine trailing-suffix fix (Footballa -> Football,
    // jestes -> jesteś) completely untouched.
    const firstLetterMatches = tiedCandidates.filter((c) => c[0]?.toLowerCase() === word[0]?.toLowerCase());
    if (firstLetterMatches.length === 0) return word;
    tiedCandidates = firstLetterMatches;
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
