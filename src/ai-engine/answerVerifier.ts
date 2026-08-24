/**
 * Answer Self-Verification
 *
 * BM25 retrieval score measures how well a document matches the query's keywords —
 * it says nothing about whether the resulting synthesized answer actually has the shape
 * the question demanded (a comparison that only discusses one side, a "why" answer with
 * no causal language, a "list" that's just one sentence). This is a cheap post-synthesis
 * self-check: verify the answer's shape matches its intent before trusting it at face
 * value, instead of treating "the retrieval score was high" as proof the answer is good.
 */

import type { QueryIntent } from './reasoningEngine';
import { stem, tokenizeWords, expandQuerySynonyms } from './bm25Engine';

export interface VerificationResult {
  passed: boolean;
  issues: string[];
}

const CAUSAL_MARKERS = /\b(?:because|due to|since|as a result|caused by|leads? to|results? in|so that|therefore|reason)\b/i;

function countListMarkers(text: string): number {
  const numbered = (text.match(/(?:^|\n)\s*\d+[.)]\s+/g) || []).length;
  const bulleted = (text.match(/(?:^|\n)\s*[•\-*]\s+/g) || []).length;
  return numbered + bulleted;
}

/**
 * Checks a synthesized answer against what its detected intent demands. `entities` should
 * be the entities extracted from the *query* (not the answer) so comparative checks can
 * confirm both sides actually got addressed.
 */
export function verifyAnswer(
  answer: string,
  intent: QueryIntent,
  queryTerms: string[],
  entities: string[]
): VerificationResult {
  const issues: string[] = [];
  const lower = answer.toLowerCase();

  if (answer.trim().length < 20) {
    issues.push('Answer is suspiciously short for the question asked.');
  }

  switch (intent) {
    case 'causal':
      if (!CAUSAL_MARKERS.test(answer)) {
        issues.push('No causal language found — a "why" answer should explain a cause, not just describe.');
      }
      break;

    case 'comparative': {
      const mentionedEntities = entities.filter((e) => e.length > 2 && lower.includes(e.toLowerCase()));
      if (entities.length >= 2 && mentionedEntities.length < 2) {
        issues.push('Comparison only addresses one side — the other compared subject is missing from the answer.');
      }
      break;
    }

    case 'listing':
      if (countListMarkers(answer) < 2) {
        issues.push('Requested a list but the answer has fewer than 2 distinct items.');
      }
      break;

    case 'definition':
    case 'explanation':
    case 'temporal':
    case 'person':
    case 'location': {
      // queryTerms arrive already stemmed (from processForSearch upstream), but a raw substring
      // check against the answer's own unstemmed prose was comparing apples to oranges: stem()
      // strips "-tion" from "meditation" down to "medita", while "meditate" is left unstemmed —
      // neither is a substring of the other, even though they're clearly the same topic (this is
      // the same stemmer asymmetry SYNONYM_MAP exists to paper over for retrieval — reusing it
      // here via expandQuerySynonyms keeps this check in sync with whatever it's already teaching
      // the search side, instead of drifting into its own separate notion of "related terms"). A
      // correctly-on-topic answer about meditation was getting flagged "likely off-topic" and
      // demoted to a hedge purely because the answer said "meditation"/"meditating" and never the
      // literal word "meditate". Stem the answer's own words the same way and compare against both
      // the raw and synonym-expanded query terms, consistent with how the search already works.
      const coreTerms = expandQuerySynonyms(queryTerms.filter((t) => t.length > 3));
      const answerStems = new Set(tokenizeWords(answer).map((w) => stem(w)));
      const covered = coreTerms.filter((t) => answerStems.has(t) || lower.includes(t));
      if (coreTerms.length > 0 && covered.length === 0) {
        issues.push('Answer does not mention any of the query\'s key terms — likely off-topic.');
      }
      break;
    }

    default:
      break;
  }

  return { passed: issues.length === 0, issues };
}
