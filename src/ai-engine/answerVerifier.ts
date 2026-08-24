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

export type VerificationIssueKind =
  | 'too-short'
  | 'missing-entity'
  | 'no-causal'
  | 'too-few-items'
  | 'off-topic';

/**
 * A failure carries what is missing, not just that something is. A boolean plus a sentence was
 * enough to trigger a hedge but left the caller nothing to say beyond "not fully confident" —
 * these fields exist so it can name the actual gap ("nothing specifically on CI/CD").
 */
export interface VerificationIssue {
  kind: VerificationIssueKind;
  detail: string;
  /** Compared subjects the answer never addresses, as the user typed them. */
  missingEntities?: string[];
  /** Compared subjects it does address. */
  coveredEntities?: string[];
  /** Key query terms nothing in the answer touches, as the user typed them. */
  missingTerms?: string[];
  /** Distinct list items actually found, when the intent demanded a list. */
  itemsFound?: number;
}

export interface VerificationResult {
  passed: boolean;
  issues: VerificationIssue[];
}

/**
 * Recovers how the user actually typed a term. `entities`/`queryTerms` arrive stemmed and
 * lowercased from the search pipeline, so quoting them straight back reads as "nothing on
 * photosynthesi" / "nothing on ci/cd". Terms with no recoverable surface form are dropped
 * rather than displayed raw.
 */
function surfaceForm(term: string, rawQuery: string): string | null {
  const t = term.toLowerCase();
  if (t.includes(' ')) {
    const at = rawQuery.toLowerCase().indexOf(t);
    return at === -1 ? (/[A-Z]/.test(term) ? term : null) : rawQuery.slice(at, at + term.length);
  }
  for (const word of rawQuery.split(/\s+/)) {
    const bare = word.replace(/^[^\w]+|[^\w/+#.-]+$/g, '');
    if (!bare) continue;
    const lower = bare.toLowerCase();
    if (lower === t || lower.startsWith(t) || t.startsWith(lower)) return bare;
  }
  return /[A-Z]/.test(term) ? term : null;
}

// extractQueryEntities treats any capitalized run as an entity, so "Compare Rust to Zig" yields
// "Compare Rust" — naming that back at the user as a missing subject ("nothing on Compare or
// Zig") is worse than saying nothing. These are the verbs and interrogatives that show up in
// that position; they're stripped from the edges of a phrase, never from its middle.
const NOT_A_SUBJECT = new Set(
  `compare compared compares comparison contrast difference differences differ versus vs explain
   describe define tell list give show what which who whom whose why how when where better best
   between about does do is are the a an`
    .split(/\s+/)
    .filter(Boolean)
);

// Half these entities arrive stemmed ("compar", "describ"), so exact-set membership alone
// misses them.
const NOT_A_SUBJECT_STEMS = ['compar', 'contrast', 'differ', 'explain', 'describ', 'defin', 'versus'];

const isNotASubject = (w: string) => {
  const lower = w.toLowerCase();
  return NOT_A_SUBJECT.has(lower) || NOT_A_SUBJECT_STEMS.some((s) => lower.startsWith(s));
};

function trimToSubject(term: string): string {
  let words = term.split(/\s+/).filter(Boolean);
  while (words.length > 0 && isNotASubject(words[0])) words = words.slice(1);
  while (words.length > 0 && isNotASubject(words[words.length - 1])) words = words.slice(0, -1);
  return words.join(' ');
}

/**
 * extractQueryEntities returns each subject twice — once as the capitalized phrase the user
 * typed, once as its lowercase stem. Counting those as two separate sides made the "comparison
 * only addresses one side" check unfireable for any query whose covered entity was capitalized:
 * "Docker" and "docker" both matched, mentioned.length hit 2, and a Docker-only answer to
 * "Docker vs Terraform" passed verification clean.
 */
function dedupeSubjects(list: string[]): string[] {
  const kept: string[] = [];
  for (const raw of list) {
    const s = raw.trim();
    if (!s) continue;
    const l = s.toLowerCase();
    if (kept.some((k) => k.toLowerCase().includes(l) || l.includes(k.toLowerCase()))) continue;
    kept.push(s);
  }
  return kept;
}

function surfaceList(terms: string[], rawQuery: string, max: number): string[] {
  const out: string[] = [];
  for (const t of terms) {
    const subject = trimToSubject(t);
    if (!subject) continue;
    const s = surfaceForm(subject, rawQuery);
    if (s && !out.some((o) => o.toLowerCase() === s.toLowerCase())) out.push(s);
    if (out.length >= max) break;
  }
  return out;
}

// Includes the "Why it happens / How it works / The result" headers reasoningEngine's own
// causal synthesis branch emits ~50% of the time — those ARE causal language, just structural
// labels instead of prose connectives, and were getting flagged as "no causal language found"
// then randomly hedged purely because of which synthesis variant got picked.
const CAUSAL_MARKERS =
  /\b(?:because|due to|since|as a result|caused by|leads? to|results? in|so that|therefore|reason)\b|why it happens|how it works|the result:/i;

/**
 * A lowercase multi-word subject ("cold brew") reaches here as two separate stems, because
 * extractQueryEntities only groups capitalized runs. Left split, the coverage check reported
 * "I've got the cold half of this" — it had matched an unrelated common-cold document. Any two
 * candidates the user typed side by side are one subject, so they're rejoined first.
 */
function mergeAdjacentSubjects(candidates: string[], query: string): string[] {
  const queryWords = query.toLowerCase().split(/\s+/).map((w) => w.replace(/[^\w/+#.-]/g, ''));
  const areAdjacent = (a: string, b: string) =>
    queryWords.some((w, i) => w.startsWith(a) && (queryWords[i + 1] || '').startsWith(b));

  const out: string[] = [];
  for (let i = 0; i < candidates.length; i++) {
    const next = candidates[i + 1];
    const a = candidates[i].toLowerCase();
    if (next && areAdjacent(a, next.toLowerCase())) {
      out.push(`${candidates[i]} ${next}`);
      i++;
    } else {
      out.push(candidates[i]);
    }
  }
  return out;
}

const COMPARISON_CUE =
  /\bvs\.?\b|\bversus\b|\bcompares?\b|\bcompared\b|\bcomparison\b|\bdifferences?\s+between\b|\bdiffers?\s+from\b|\bbetter\s+than\b/i;

/**
 * Did the answer actually address both compared subjects? Subjects are trimmed of the user's
 * own verb ("Compare Kubernetes" → "Kubernetes") and deduped across their capitalized and
 * stemmed forms before counting, since both of those made this check misreport.
 */
function checkComparativeCoverage(
  answer: string,
  lower: string,
  entities: string[],
  query: string
): VerificationIssue | null {
  const candidates = dedupeSubjects(
    mergeAdjacentSubjects(entities.map(trimToSubject).filter((e) => e.length > 2), query)
  );
  const mentioned = candidates.filter((e) => lower.includes(e.toLowerCase()));
  if (candidates.length < 2 || mentioned.length >= 2) return null;

  const missing = surfaceList(
    candidates.filter((e) => !mentioned.includes(e)),
    query,
    2
  );
  if (missing.length === 0) return null;

  return {
    kind: 'missing-entity',
    detail: 'Comparison only addresses one side — the other compared subject is missing from the answer.',
    coveredEntities: surfaceList(mentioned, query, 2),
    missingEntities: missing,
  };
}

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
  entities: string[],
  rawQuery = ''
): VerificationResult {
  const issues: VerificationIssue[] = [];
  const lower = answer.toLowerCase();
  const query = rawQuery || queryTerms.join(' ');

  if (answer.trim().length < 20) {
    issues.push({ kind: 'too-short', detail: 'Answer is suspiciously short for the question asked.' });
  }

  // detectQueryIntent resolves "how does X compare to Y" to 'explanation', because its
  // `startsWith('how ')` rule is tested before its comparison-cue rule — so the most natural
  // phrasing of a comparison never reached the case below and a one-sided answer to it passed
  // verification clean. Reordering intent detection would change which synthesis branch runs;
  // keying the coverage check off the query's own cue instead fixes the gap without touching
  // anything outside this file.
  const hasComparisonCue = COMPARISON_CUE.test(query);
  if (hasComparisonCue || intent === 'comparative') {
    const issue = checkComparativeCoverage(answer, lower, entities, query);
    if (issue) issues.push(issue);
  }

  switch (intent) {
    case 'causal':
      if (!CAUSAL_MARKERS.test(answer)) {
        issues.push({
          kind: 'no-causal',
          detail: 'No causal language found — a "why" answer should explain a cause, not just describe.',
        });
      }
      break;

    case 'comparative':
      break;

    case 'listing': {
      const found = countListMarkers(answer);
      if (found < 2) {
        issues.push({
          kind: 'too-few-items',
          detail: 'Requested a list but the answer has fewer than 2 distinct items.',
          itemsFound: found,
        });
      }
      break;
    }

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
        issues.push({
          kind: 'off-topic',
          detail: "Answer does not mention any of the query's key terms — likely off-topic.",
          missingTerms: surfaceList(coreTerms, query, 2),
        });
      }
      break;
    }

    default:
      break;
  }

  return { passed: issues.length === 0, issues };
}
