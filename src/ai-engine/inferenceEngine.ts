/**
 * Lightweight Relational Inference Engine
 *
 * The core reasoning engine answers questions by retrieving the single best-matching
 * document and paraphrasing it — that's retrieval, not reasoning. This module extracts
 * simple (subject, relation, object) facts out of corpus prose using pattern matching,
 * then chains them transitively across DIFFERENT documents to answer questions that no
 * single document fully covers on its own (e.g. connecting "A causes B" in one document
 * with "B causes C" in another to infer a link between A and C).
 *
 * This is intentionally simple pattern-based extraction, not a real NLP parser — it
 * catches the common explanatory sentence shapes ("X causes Y", "X is a type of Y",
 * "X requires Y"...) that make up most factual/explanatory prose, which is enough to
 * surface genuine cross-document connections without needing an external model.
 */

import { KnowledgeItem } from '../types';
import { splitSentences } from './bm25Engine';

export interface RelationFact {
  subject: string;
  relation: string;
  object: string;
  sourceId: string;
  sourceTitle: string;
  sentence: string;
}

interface RelationPattern {
  regex: RegExp;
  relation: string;
}

// Ordered by specificity — more specific relations are checked first so "is a type of"
// doesn't get swallowed by a looser "is" pattern.
const RELATION_PATTERNS: RelationPattern[] = [
  { regex: /^(.+?)\s+is a type of\s+(.+)$/i, relation: 'is a type of' },
  { regex: /^(.+?)\s+is part of\s+(.+)$/i, relation: 'is part of' },
  { regex: /^(.+?)\s+consists of\s+(.+)$/i, relation: 'consists of' },
  { regex: /^(.+?)\s+is made (?:of|from)\s+(.+)$/i, relation: 'is made from' },
  { regex: /^(.+?)\s+(?:causes|cause)\s+(.+)$/i, relation: 'causes' },
  { regex: /^(.+?)\s+leads? to\s+(.+)$/i, relation: 'leads to' },
  { regex: /^(.+?)\s+results? in\s+(.+)$/i, relation: 'results in' },
  { regex: /^(.+?)\s+triggers?\s+(.+)$/i, relation: 'triggers' },
  { regex: /^(.+?)\s+requires?\s+(.+)$/i, relation: 'requires' },
  { regex: /^(.+?)\s+needs?\s+(.+)$/i, relation: 'requires' },
  { regex: /^(.+?)\s+depends? on\s+(.+)$/i, relation: 'depends on' },
  { regex: /^(.+?)\s+produces?\s+(.+)$/i, relation: 'produces' },
  { regex: /^(.+?)\s+generates?\s+(.+)$/i, relation: 'generates' },
  { regex: /^(.+?)\s+(?:is|are)\s+(?:used|useful) for\s+(.+)$/i, relation: 'is used for' },
  { regex: /^(.+?)\s+enables?\s+(.+)$/i, relation: 'enables' },
  { regex: /^(.+?)\s+prevents?\s+(.+)$/i, relation: 'prevents' },
  { regex: /^(.+?)\s+occurs? when\s+(.+)$/i, relation: 'occurs when' },
  { regex: /^(.+?)\s+happens? when\s+(.+)$/i, relation: 'occurs when' },
  { regex: /^(.+?)\s+is caused by\s+(.+)$/i, relation: 'is caused by' },
  { regex: /^(.+?)\s+is triggered by\s+(.+)$/i, relation: 'is caused by' },
  { regex: /^(.+?)\s+converts?\s+.+?\s+into\s+(.+)$/i, relation: 'converts into' },
  { regex: /^(.+?)\s+turns?\s+.+?\s+into\s+(.+)$/i, relation: 'converts into' },
  { regex: /^(.+?)\s+releases?\s+(.+)$/i, relation: 'releases' },
  { regex: /^(.+?)\s+absorbs?\s+(.+)$/i, relation: 'absorbs' },
  { regex: /^(.+?)\s+increases?\s+(.+)$/i, relation: 'increases' },
  { regex: /^(.+?)\s+decreases?\s+(.+)$/i, relation: 'decreases' },
  { regex: /^(.+?)\s+reduces?\s+(.+)$/i, relation: 'reduces' },
  { regex: /^(.+?)\s+affects?\s+(.+)$/i, relation: 'affects' },
  { regex: /^(.+?)\s+influences?\s+(.+)$/i, relation: 'influences' },
  { regex: /^(.+?)\s+regulates?\s+(.+)$/i, relation: 'regulates' },
  { regex: /^(.+?)\s+contains?\s+(.+)$/i, relation: 'contains' },
  { regex: /^(.+?)\s+supports?\s+(.+)$/i, relation: 'supports' },
  { regex: /^(.+?)\s+allows?\s+(.+)$/i, relation: 'allows' },
  { regex: /^(.+?)\s+helps?\s+(.+)$/i, relation: 'helps' },
  // Generic copula fact — lowest priority since almost every definitional opening sentence
  // ("Photosynthesis is the process by which...") matches this, so it's tried last.
  { regex: /^(.+?)\s+is\s+(?:the|a|an)\s+(.+)$/i, relation: 'is' },
];

const MIN_TERM_LEN = 3;
const MAX_TERM_LEN = 60;

// Bare pronouns/anaphora are extraction noise, not real subjects/objects — a sentence like
// "It leads to X" tells us nothing about what "it" refers to without full coreference
// resolution, and letting them stand as terms causes chains to jump between totally
// unrelated documents that just happen to share a pronoun.
const PRONOUN_TERMS = new Set([
  'it', 'its', 'this', 'that', 'these', 'those', 'they', 'them', 'their',
  'he', 'him', 'his', 'she', 'her', 'we', 'us', 'our', 'you', 'your', 'i', 'me', 'my',
  'there', 'here', 'which', 'who', 'what', 'one', 'ones', 'so', 'such',
]);

// Generic single-word nouns that show up as the object of a definitional sentence in nearly
// every subject domain ("Photosynthesis is the **process**...", "A mutex is a **mechanism**...")
// — they're fine as the tail end of a fact, but letting a chain continue FROM one of these as
// the next hop's subject means any two completely unrelated documents that both happen to
// contain a generic word like "process" get treated as a genuine connection, producing
// nonsensical cross-domain leaps (biology "process" chaining into an unrelated CS "process").
const GENERIC_BRIDGE_TERMS = new Set([
  'process', 'system', 'method', 'way', 'result', 'part', 'type', 'form', 'thing',
  'state', 'value', 'level', 'stage', 'step', 'factor', 'element', 'component',
  'condition', 'situation', 'case', 'example', 'kind', 'sort', 'group', 'set',
]);

function cleanTerm(raw: string): string {
  return raw
    .replace(/^\d+[.)]\s*/, '') // strip leading list numbering ("4. large intestine" -> "large intestine")
    .replace(/\*\*|\*|__|_/g, '') // strip markdown bold/italic markers
    .replace(/^(?:the|a|an|this|that|these|those)\s+/i, '')
    .replace(/[.,;:!?]+$/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Same as cleanTerm, but truncates an overlong result instead of leaving it to be rejected by
 * isUsableTerm — for the OBJECT half of a fact only. The single most common corpus sentence
 * shape is a definitional opener ("Photosynthesis is the process by which plants, algae, and
 * cyanobacteria convert light energy into chemical energy...") — the generic "is a/the X"
 * pattern's object is whatever comes after, which for real prose almost always runs well past a
 * short phrase. Rejecting anything over the length cap outright meant these extremely common
 * definitional sentences were silently dropped wholesale instead of yielding a usable (if
 * truncated) fact. This is deliberately NOT applied to subjects: a subject captured by a lazy
 * `(.+?)` before a mid-sentence verb (e.g. "...converts X into Y") can be an entire preceding
 * clause rather than a clean noun phrase, and truncating that just produces a differently-shaped
 * garbled subject rather than a genuinely short one — better to reject those than fake them.
 */
function cleanObjectTerm(raw: string): string {
  const term = cleanTerm(raw);
  if (term.length <= MAX_TERM_LEN) return term;

  const clauseBreak = term.slice(0, MAX_TERM_LEN).search(/[,:;](?!.*[,:;])/);
  if (clauseBreak > MIN_TERM_LEN) {
    return term.slice(0, clauseBreak);
  }
  const lastSpace = term.slice(0, MAX_TERM_LEN).lastIndexOf(' ');
  return term.slice(0, lastSpace > MIN_TERM_LEN ? lastSpace : MAX_TERM_LEN);
}

function isUsableTerm(term: string): boolean {
  if (term.length < MIN_TERM_LEN || term.length > MAX_TERM_LEN || !/[a-z]/i.test(term)) return false;
  if (PRONOUN_TERMS.has(term)) return false;
  return true;
}

/**
 * Whole-word match, not raw substring — plain `.includes()` would let a short term like
 * "it" match inside completely unrelated words (e.g. "it" inside "amplitude"), producing
 * chains that jump between unrelated topics for no real reason.
 */
function termMatches(a: string, b: string): boolean {
  if (a === b) return true;
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wordBoundaryContains = (needle: string, haystack: string) =>
    new RegExp(`\\b${escape(needle)}\\b`, 'i').test(haystack);
  return wordBoundaryContains(a, b) || wordBoundaryContains(b, a);
}

let cachedFacts: RelationFact[] | null = null;
let cachedDocCount = -1;

/**
 * Extracts relation facts from every document's sentences. Cached by document count,
 * same pattern as the BM25 index cache, since the corpus rarely changes mid-session.
 */
export function extractRelationFacts(knowledge: KnowledgeItem[]): RelationFact[] {
  if (cachedFacts && cachedDocCount === knowledge.length) {
    return cachedFacts;
  }

  const facts: RelationFact[] = [];
  for (const doc of knowledge) {
    const sentences = splitSentences(doc.content);
    for (const sentence of sentences) {
      // Skip overly long sentences — they tend to produce garbage, run-on subject/object spans.
      if (sentence.length > 220) continue;

      for (const pattern of RELATION_PATTERNS) {
        const match = sentence.match(pattern.regex);
        if (!match) continue;

        const subject = cleanTerm(match[1]);
        const object = cleanObjectTerm(match[2]);
        if (!isUsableTerm(subject) || !isUsableTerm(object) || subject === object) continue;

        facts.push({
          subject,
          relation: pattern.relation,
          object,
          sourceId: doc.id,
          sourceTitle: doc.title,
          sentence: sentence.trim(),
        });
        break; // one relation per sentence is enough — avoids noisy double-matches
      }
    }
  }

  cachedFacts = facts;
  cachedDocCount = knowledge.length;
  return facts;
}

export interface InferenceChain {
  facts: RelationFact[];
  spansMultipleDocuments: boolean;
}

/**
 * Finds short (up to maxHops) chains of facts starting from a term that mention the
 * seed term as the subject, optionally constrained to reach a target term. Prioritizes
 * chains that cross document boundaries, since those represent genuine connections the
 * corpus doesn't state explicitly in any single passage.
 */
export function findInferenceChains(
  seedTerm: string,
  facts: RelationFact[],
  options: { targetTerm?: string; maxHops?: number; maxChains?: number } = {}
): InferenceChain[] {
  const { targetTerm, maxHops = 2, maxChains = 3 } = options;
  const seed = cleanTerm(seedTerm);
  if (!isUsableTerm(seed)) return [];

  const target = targetTerm ? cleanTerm(targetTerm) : undefined;
  const chains: InferenceChain[] = [];

  const startFacts = facts.filter((f) => termMatches(f.subject, seed));

  const visited = new Set<string>();
  const stack: { path: RelationFact[] }[] = startFacts.map((f) => ({ path: [f] }));

  while (stack.length > 0 && chains.length < maxChains * 4) {
    const { path } = stack.pop()!;
    const last = path[path.length - 1];
    const key = path.map((f) => `${f.subject}|${f.relation}|${f.object}`).join('>');
    if (visited.has(key)) continue;
    visited.add(key);

    const reachedTarget = target ? termMatches(last.object, target) : path.length >= 2;
    const docIds = new Set(path.map((f) => f.sourceId));

    if (reachedTarget && (!target || path.length <= maxHops)) {
      chains.push({ facts: path, spansMultipleDocuments: docIds.size > 1 });
    }

    // Don't chain onward from a bare generic word ("process", "system") — it's a legitimate
    // final fact, but continuing from it treats "shares a common English noun" as if it were a
    // real conceptual link between whatever two documents happen to use that word.
    const objectIsGenericBridge = GENERIC_BRIDGE_TERMS.has(last.object.trim());

    if (path.length < maxHops && !objectIsGenericBridge) {
      // Also exclude candidates whose OWN subject is a bare generic word — that's the direction
      // the false bridge actually forms in: some unrelated document's "Process is a running
      // program..." fact substring-matches into our longer "...the process by which..." object
      // via termMatches' word-boundary-contains check, even though our own object passed the
      // exact-match generic check above (it's a real phrase, not the bare word "process").
      const next = facts.filter(
        (f) =>
          termMatches(f.subject, last.object) &&
          !GENERIC_BRIDGE_TERMS.has(f.subject.trim()) &&
          !path.some((p) => p.sourceId === f.sourceId && p.object === f.object)
      );
      for (const nf of next.slice(0, 5)) {
        stack.push({ path: [...path, nf] });
      }
    }
  }

  // Prefer chains that cross documents (genuine new connections), then shorter chains.
  chains.sort((a, b) => {
    if (a.spansMultipleDocuments !== b.spansMultipleDocuments) {
      return a.spansMultipleDocuments ? -1 : 1;
    }
    return a.facts.length - b.facts.length;
  });

  return chains.slice(0, maxChains);
}

export function formatInferenceChain(chain: InferenceChain): string {
  const parts = chain.facts.map((f) => `**${f.subject}** —(${f.relation})→ **${f.object}**`);
  return parts.join('  ');
}
