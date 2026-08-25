import { KnowledgeItem } from '../types';
import { searchKnowledgeGraph, cosineSimilarity } from './semanticEngine';
import * as localLlmClient from './localLlmClient';
import corpusEmbeddings from './corpus/embeddings.generated.json';

// Real per-document embedding vectors, keyed by KnowledgeItem.id, loaded from a file precomputed
// offline (scripts/generateEmbeddings.ts) and committed to git. Deliberately NOT stored on
// KnowledgeItem.embeddingVector itself — semanticEngine.ts's existing zero-BM25-hits fallback
// reads that field if present but compares it against a 24-dimension FAKE query vector from its
// own computeEmbedding(); populating it with real 768-dim vectors would silently break that
// fallback (cosineSimilarity returns 0 on any dimension mismatch, so every comparison there would
// fail). Keeping real vectors in this separate map means the legacy fallback is untouched.
const REAL_EMBEDDINGS: Record<string, number[]> = Object.fromEntries(
  Object.entries(
    (corpusEmbeddings as { vectors: Record<string, { vector: number[]; textHash: string }> }).vectors || {}
  ).map(([id, entry]) => [id, entry.vector])
);

// A single user message can trigger several search calls with different-but-overlapping query
// strings (initial query, reformulated keyword query, sub-questions) — this avoids redundant
// Ollama round-trips for the same text within a short window. Simple insertion-order cap, not a
// real LRU — good enough for a short-lived per-process cache.
const QUERY_EMBED_CACHE = new Map<string, number[]>();
const QUERY_EMBED_CACHE_MAX = 200;

async function embedQueryCached(text: string): Promise<number[] | null> {
  const cached = QUERY_EMBED_CACHE.get(text);
  if (cached) return cached;
  // "search_query:" prefix matches nomic-embed-text's recommended usage — corpus documents were
  // embedded with the paired "search_document:" prefix in scripts/generateEmbeddings.ts. Mixing
  // an unprefixed query against prefixed documents (or vice versa) measurably hurts retrieval
  // quality for this model family.
  const result = await localLlmClient.embed(`search_query: ${text}`);
  if (result.status !== 'success') return null;
  if (QUERY_EMBED_CACHE.size >= QUERY_EMBED_CACHE_MAX) {
    const oldestKey = QUERY_EMBED_CACHE.keys().next().value;
    if (oldestKey !== undefined) QUERY_EMBED_CACHE.delete(oldestKey);
  }
  QUERY_EMBED_CACHE.set(text, result.vector);
  return result.vector;
}

export interface VectorScoredItem {
  item: KnowledgeItem;
  score: number;
}

/**
 * Real semantic search over precomputed corpus embeddings. Returns null (not an empty array)
 * specifically when Ollama's embed endpoint is unavailable, so callers can distinguish "ran and
 * found nothing above threshold" from "couldn't run at all" — that distinction is what drives
 * graceful fallback to BM25-only in hybridSearchKnowledgeGraph below.
 */
export async function vectorSearch(
  prompt: string,
  knowledgeList: KnowledgeItem[],
  topK: number
): Promise<VectorScoredItem[] | null> {
  const queryVec = await embedQueryCached(prompt);
  if (!queryVec) return null;

  const scored: VectorScoredItem[] = [];
  for (const item of knowledgeList) {
    const itemVec = REAL_EMBEDDINGS[item.id];
    if (!itemVec) continue;
    const score = cosineSimilarity(queryVec, itemVec);
    if (score > 0) scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

/**
 * Merges two independently-ranked lists (BM25 and vector-cosine) into one, keyed by item id.
 *
 * NOT a textbook Reciprocal Rank Fusion despite the name/history — an earlier version sorted by
 * the raw RRF formula (1/(k+rank)) while reporting a differently-scaled score, which broke a real
 * invariant: results[0].score >= CONFIDENT_MATCH_SCORE and computeConfidence() downstream assume
 * the returned list is sorted by the SAME score it reports, with results[0] genuinely the
 * highest-scored item — observed live, "Budgeting" (score 5.8) was returned before "What is
 * Discord" (score 8.9) because Budgeting's RRF rank was better, silently corrupting confidence
 * gating and grounding-context selection for every hybrid-search response.
 *
 * Items BM25 already found keep their real BM25 score untouched (so confidence gating behaves
 * exactly as before for anything BM25 already covers). A vector-only discovery (BM25 found
 * nothing for it at all — the actual paraphrase case this whole feature exists for) gets a
 * conservative synthetic score anchored in [0.5, 0.8] from its cosine similarity — high enough to
 * be treated as a real, hedge-worthy match, but never able to cross CONFIDENT_MATCH_SCORE (1.0)
 * on its own. The merged union is then sorted by that single reported score, so it naturally
 * favors real BM25 hits when BM25 found several strong ones, and only lets a vector-only
 * discovery rise to the top when BM25's own list is thin — which is exactly when it should.
 */
export function reciprocalRankFusion(
  listA: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  listB: { item: KnowledgeItem; score: number }[]
): { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[] {
  const merged = new Map<string, { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }>();

  listA.forEach((entry) => {
    merged.set(entry.item.id, entry);
  });

  listB.forEach((entry) => {
    if (!merged.has(entry.item.id)) {
      merged.set(entry.item.id, { item: entry.item, score: 0.5 + entry.score * 0.3 });
    }
  });

  return Array.from(merged.values()).sort((a, b) => b.score - a.score);
}

/**
 * Drop-in async replacement for semanticEngine.ts's searchKnowledgeGraph(), adding a real-vector
 * signal on top when ENABLE_HYBRID_SEARCH=true. With the flag off (default) or when Ollama's
 * embed endpoint is unreachable, this is a pure pass-through of the existing BM25(+fake-vector-
 * fallback) result — byte-identical to today's behavior, so it's safe to deploy before the flag
 * is ever turned on.
 */
export async function hybridSearchKnowledgeGraph(
  prompt: string,
  knowledgeList: KnowledgeItem[],
  topK: number = 3,
  recentlyCitedDocIds?: Set<string>
): Promise<{ item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]> {
  const bm25List = searchKnowledgeGraph(prompt, knowledgeList, topK, recentlyCitedDocIds);

  if (process.env.ENABLE_HYBRID_SEARCH !== 'true') {
    return bm25List;
  }

  const vecList = await vectorSearch(prompt, knowledgeList, topK);
  if (vecList === null) {
    return bm25List;
  }

  return reciprocalRankFusion(bm25List, vecList).slice(0, topK);
}
