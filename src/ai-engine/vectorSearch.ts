import { KnowledgeItem } from '../types';
import { searchKnowledgeGraph, cosineSimilarity } from './semanticEngine';
import * as localLlmClient from './localLlmClient';

// Real per-document embedding vectors, keyed by KnowledgeItem.id, loaded from a file precomputed
// offline (scripts/generateEmbeddings.ts) and committed to git. Deliberately NOT stored on
// KnowledgeItem.embeddingVector itself — semanticEngine.ts's existing zero-BM25-hits fallback
// reads that field if present but compares it against a 24-dimension FAKE query vector from its
// own computeEmbedding(); populating it with real 768-dim vectors would silently break that
// fallback (cosineSimilarity returns 0 on any dimension mismatch, so every comparison there would
// fail). Keeping real vectors in this separate map means the legacy fallback is untouched.
//
// Loaded lazily via dynamic import, NOT a static top-level import, and only when actually running
// in Node — mirrors polishSpellCheck.ts's getSpell() pattern exactly, for the same reason. This
// file is reachable from the browser bundle too (App.tsx -> generator.ts -> reasoningEngine.ts ->
// here, for the client-side generation path), and the embeddings file is a multi-MB JSON blob
// (290 documents x 768 floats each) — a static import would ship all of it to every browser
// visitor's initial page load even though hybrid search can never actually function client-side
// in the first place (ENABLE_HYBRID_SEARCH reads process.env, which Vite's browser build replaces
// with `{}`, so the flag is always false in a browser context regardless of any .env setting).
// Confirmed live: this file's static import alone accounted for ~600KB of the production JS
// bundle before this fix, entirely dead weight for every non-Node execution context. Combined
// with marking the JSON path `external` in vite.config.ts (so Vite never attempts to bundle/
// transform it for the client target at all — the same treatment nspell/dictionary-pl already
// get there), this keeps real embeddings working server-side while being truly inert in the
// browser bundle instead of just "unlikely to run".
let embeddingsPromise: Promise<Record<string, number[]>> | null = null;

function loadRealEmbeddings(): Promise<Record<string, number[]>> {
  if (typeof window !== 'undefined') return Promise.resolve({});
  if (!embeddingsPromise) {
    embeddingsPromise = import('./corpus/embeddings.generated.json').then((mod) => {
      const corpusEmbeddings = (mod as any).default ?? mod;
      const vectors = (corpusEmbeddings as { vectors: Record<string, { vector: number[]; textHash: string }> })
        .vectors || {};
      return Object.fromEntries(Object.entries(vectors).map(([id, entry]) => [id, entry.vector]));
    });
  }
  return embeddingsPromise;
}

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

// Result shape shared by searchKnowledgeGraph/hybridSearchKnowledgeGraph and consumed by
// reasoningEngine.ts's computeConfidence(). semanticScore/semanticDoubt are optional — every
// existing caller that doesn't read them (or that runs with the flag off / embed unavailable)
// sees byte-identical behavior to before these fields existed. semanticDoubt is only ever set
// when vector search's own best match disagrees with this (BM25) top pick — see
// annotateSemanticDoubt's comment for why it's a relative, penalty-only signal rather than an
// absolute-cosine score.
export interface RankedResult {
  item: KnowledgeItem;
  score: number;
  snippet?: string;
  relevantSentences?: string[];
  semanticScore?: number;
  semanticDoubt?: number;
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

  const realEmbeddings = await loadRealEmbeddings();
  const scored: VectorScoredItem[] = [];
  for (const item of knowledgeList) {
    const itemVec = realEmbeddings[item.id];
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
  listA: RankedResult[],
  listB: { item: KnowledgeItem; score: number }[]
): RankedResult[] {
  const merged = new Map<string, RankedResult>();

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

// A/B-tested live against real corpus queries: reciprocalRankFusion's union-merge (BM25 keeps its
// own score; a vector-only discovery is capped in [0.5, 0.8]) means a genuinely correct
// vector-only match can NEVER outrank a wrong-but-nonzero BM25 top pick, since raw BM25 scores on
// this corpus commonly land at 4-9 even for irrelevant matches — confirmed live, "my partner
// lives in a different city, is that doomed" scored kb-relationships-long-distance (the right
// answer) as vector's #1 pick at cosine 0.60, while BM25's wrong top pick
// (kb-relationships-healthy-communication, pure keyword coincidence) scored 5.61 and swallowed
// the fusion slot before the vector discovery ever got a chance. So merging alone doesn't change
// which document gets used — it only ever fills gaps when BM25 returns fewer than topK results.
//
// The fix that actually matters is a DOUBT signal, not a re-rank and not an absolute-cosine
// score: an early version of this tried scoring the top pick's raw cosine similarity against a
// fixed threshold and feeding that into confidence directly — verified live, it backfired. On
// this corpus/embedding model, cosine similarity between a query and ANY topically-adjacent
// document commonly lands in 0.5-0.7 whether the document is actually the right answer or not
// (nomic-embed-text's baseline similarity for same-domain short text runs high), so an absolute
// threshold pushed confidence UP uniformly, including on the wrong-match cases it was meant to
// catch.
//
// What actually discriminates: whether vector search's OWN best match (vecList[0], the single
// highest-cosine document in the whole corpus for this query) is a genuinely DIFFERENT document
// than BM25's top pick, and scores meaningfully higher than BM25's pick does on the same
// embedding. That's a same-query, same-embedding-space, relative comparison — immune to whatever
// the model's absolute baseline happens to be. Confirmed live: "my partner lives in a different
// city, is that doomed" — BM25's wrong pick (healthy-communication) cosine 0.548 vs. vector's own
// top choice (long-distance, the right answer) cosine 0.603 — a real, if modest, disagreement.
// Only ever produces a PENALTY (never a boost) for exactly that reason: an absolute cosine value
// isn't trustworthy enough on this corpus to reward agreement, only a large relative gap is
// trustworthy enough to penalize likely disagreement.
async function annotateSemanticDoubt(
  prompt: string,
  results: RankedResult[],
  vecList: VectorScoredItem[] | null
): Promise<RankedResult[]> {
  if (results.length === 0 || !vecList || vecList.length === 0) return results;
  const top = results[0];
  const bestAlt = vecList[0];
  if (bestAlt.item.id === top.item.id) return results;

  const queryVec = await embedQueryCached(prompt);
  const realEmbeddings = await loadRealEmbeddings();
  const topVec = realEmbeddings[top.item.id];
  if (!queryVec || !topVec) return results;
  const topCosine = cosineSimilarity(queryVec, topVec);

  if (bestAlt.score <= topCosine) return results;
  // Normalized so a ~0.15 cosine gap (a large, clear disagreement on this embedding model's
  // typical range) reaches full-strength doubt; smaller gaps stay a mild, mostly-inert nudge.
  const semanticDoubt = Math.min(1, (bestAlt.score - topCosine) / 0.15);
  return [{ ...top, semanticScore: topCosine, semanticDoubt }, ...results.slice(1)];
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
): Promise<RankedResult[]> {
  const bm25List = searchKnowledgeGraph(prompt, knowledgeList, topK, recentlyCitedDocIds);

  if (process.env.ENABLE_HYBRID_SEARCH !== 'true') {
    return bm25List;
  }

  const vecList = await vectorSearch(prompt, knowledgeList, topK);
  if (vecList === null) {
    return bm25List;
  }

  const fused = reciprocalRankFusion(bm25List, vecList).slice(0, topK);
  return annotateSemanticDoubt(prompt, fused, vecList);
}
