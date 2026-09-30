// Everything Nexus learns is stored in English (Patrick, 2026-09-30: "everything that is learned
// translates to English so he understands better" — his reasoning, search index and most of the
// corpus are English). A French message/question is translated FIRST, and the whole pipeline
// (extraction, fidelity checks, search, verification) runs on the English version — so the checks
// compare English to English ("l'Espagne" vs "Spain" would otherwise fail the name check).

import { looksFrench } from '../localLlmClient';
import { learningGenerate } from './llm';
import { keyFacts } from './verify';

const FRENCH_MARKERS_RE =
  /[àâçéèêëîïôûùüÿœ]|\b(?:le|la|les|des|est|sont|une?|qui|que|quoi|avec|pour|dans|mais|pas|c'est|j'ai|t'as|chu|pis|faque|ostie|tabarnak|câlisse)\b/i;

export function needsTranslation(text: string): boolean {
  return looksFrench(text) || (FRENCH_MARKERS_RE.test(text) && !/\b(?:the|is|are|was|and|of|to|in)\b/i.test(text));
}

const TRANSLATE_SYSTEM = `Translate the user's text (French or Québécois French, may be slangy) to plain English. Keep every name, number and date exactly as written (translate country/competition names to their usual English names). Output only the translation, nothing else.`;

// null when it can't produce a faithful translation (numbers must survive exactly).
export async function toEnglish(text: string): Promise<string | null> {
  if (!needsTranslation(text)) return text;
  const out = await learningGenerate(text.slice(0, 600), { system: TRANSLATE_SYSTEM, temperature: 0, maxTokens: 200 });
  if (!out) return null;
  const translated = out.replace(/^["'\s]+|["'\s]+$/g, '').trim();
  if (!translated || needsTranslation(translated)) return null;
  const a = [...keyFacts(text).numbers].sort().join(',');
  const b = [...keyFacts(translated).numbers].sort().join(',');
  return a === b ? translated : null;
}
