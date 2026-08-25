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
const REAL_EMBEDDINGS: Record<string, number[]> = (corpusEmbeddings as { vectors: Record<string, number[]> }).vectors || {};

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
 * Reciprocal Rank Fusion — uses the standard RRF formula (1/(k+rank)) ONLY to decide the merged
 * ORDER of two independently-ranked lists, keyed by item id. Deliberately does NOT expose the
 * raw RRF fraction (~0.01-0.03) as the returned score — that's a completely different scale from
 * BM25's real scores (0-10+), which CONFIDENT_MATCH_SCORE/computeConfidence downstream assume.
 * Items BM25 already found keep their real BM25 score untouched, so confidence gating behaves
 * exactly as before for anything BM25 already covers. A vector-only discovery (BM25 found
 * nothing for it at all — the actual paraphrase case this exists for) gets a conservative
 * synthetic score anchored in [0.5, 0.8] using its cosine similarity: high enough to be treated
 * as a real, hedge-worthy match, but never able to cross CONFIDENT_MATCH_SCORE (1.0) on its own,
 * which is the correct caution level for a match with no literal keyword overlap.
 */
export function reciprocalRankFusion(
  listA: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  listB: { item: KnowledgeItem; score: number }[],
  k: number = 60
): { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[] {
  const rrfRank = new Map<string, number>();
  const merged = new Map<string, { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }>();

  listA.forEach((entry, rank) => {
    rrfRank.set(entry.item.id, (rrfRank.get(entry.item.id) || 0) + 1 / (k + rank + 1));
    merged.set(entry.item.id, entry);
  });

  listB.forEach((entry, rank) => {
    rrfRank.set(entry.item.id, (rrfRank.get(entry.item.id) || 0) + 1 / (k + rank + 1));
    if (!merged.has(entry.item.id)) {
      merged.set(entry.item.id, { item: entry.item, score: 0.5 + entry.score * 0.3 });
    }
  });

  return Array.from(merged.keys())
    .sort((a, b) => (rrfRank.get(b) || 0) - (rrfRank.get(a) || 0))
    .map((id) => merged.get(id)!);
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
