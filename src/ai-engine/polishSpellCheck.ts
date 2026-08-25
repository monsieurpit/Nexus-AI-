import nspell from 'nspell';
import dictionary from 'dictionary-pl';

// Real, free, offline Polish dictionary (MIT/GPL/LGPL/MPL — the same one Firefox/LibreOffice spell
// -check with) used as a quality gate on Polish LLM output, not just a language-identity check.
// Constructing the spell-checker parses the full affix/dictionary files (~2s) — done once here at
// module load, not per-request; every actual correct() call after that is sub-millisecond.
// dictionary-pl exports its affix/dic data as Uint8Array; @types/nspell's signature wants a
// Node Buffer specifically (Buffer is a Uint8Array subclass, not the reverse) — wrap explicitly.
const spell = nspell(Buffer.from(dictionary.aff), Buffer.from(dictionary.dic));

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
export function computeInvalidPolishWordRatio(text: string): number {
  const tokens = text.match(/[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]+/g) || [];
  const judgeable = tokens.filter((w) => w.length >= 3);
  if (judgeable.length < 3) return 0;
  const invalid = judgeable.filter((w) => !spell.correct(w) && !KNOWN_PROPER_NOUNS.has(w.toLowerCase()));
  return invalid.length / judgeable.length;
}
