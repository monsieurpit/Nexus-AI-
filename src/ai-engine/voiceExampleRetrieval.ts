// Retrieval over the voice example bank (voiceExamples.ts) — picks the 2-3 examples most
// relevant to the CURRENT user message, instead of always including the same fixed few-shot
// block regardless of topic. See voiceExamples.ts's own header comment for the full rationale.
//
// Deliberately a separate module from vectorSearch.ts rather than reusing its KnowledgeItem-
// shaped pipeline: this embeds a different field (`query`, a short example prompt) against a
// different, much smaller, always-fully-loaded bank (no BM25/hybrid-search flag gating — this
// always runs when embeddings are available, since a mismatched or missing example is a much
// smaller downside than a mismatched knowledge citation).
//
// Loaded lazily via dynamic import, NOT a static top-level import, mirroring vectorSearch.ts's own
// loadRealEmbeddings() exactly — this file is reachable from the browser bundle too (App.tsx ->
// generator.ts -> reasoningEngine.ts -> here for the client-side path), and a static import of
// `fs`/`path` would break that bundle target entirely.

import { VOICE_EXAMPLES, type VoiceExample } from './corpus/voiceExamples';
import { cosineSimilarity } from './semanticEngine';
import * as localLlmClient from './localLlmClient';

let embeddingsPromise: Promise<Record<string, number[]>> | null = null;

async function loadVoiceExampleEmbeddings(): Promise<Record<string, number[]>> {
  if (typeof window !== 'undefined') return {};
  if (!embeddingsPromise) {
    embeddingsPromise = (async () => {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const possiblePaths = [
          path.resolve(process.cwd(), 'src/ai-engine/corpus/voiceExampleEmbeddings.generated.json'),
          path.resolve(__dirname, './corpus/voiceExampleEmbeddings.generated.json'),
          path.resolve(__dirname, '../src/ai-engine/corpus/voiceExampleEmbeddings.generated.json'),
        ];
        for (const p of possiblePaths) {
          if (fs.existsSync(p)) {
            const content = fs.readFileSync(p, 'utf-8');
            const parsed = JSON.parse(content);
            const vectors = (parsed as { vectors: Record<string, { vector: number[] }> }).vectors || {};
            return Object.fromEntries(Object.entries(vectors).map(([id, entry]) => [id, entry.vector]));
          }
        }
        return {};
      } catch {
        return {};
      }
    })();
  }
  return embeddingsPromise;
}

// Same per-process cache pattern as vectorSearch.ts's embedQueryCached — a burst of retrieval
// calls for near-identical prompts (retry, streaming re-evaluation) shouldn't each pay a fresh
// ~660ms Ollama embed round-trip.
const QUERY_EMBED_CACHE = new Map<string, number[]>();
const QUERY_EMBED_CACHE_MAX = 200;

async function embedQueryCached(text: string): Promise<number[] | null> {
  const cached = QUERY_EMBED_CACHE.get(text);
  if (cached) return cached;
  const result = await localLlmClient.embed(`search_query: ${text}`);
  if (result.status !== 'success') return null;
  if (QUERY_EMBED_CACHE.size >= QUERY_EMBED_CACHE_MAX) {
    const oldestKey = QUERY_EMBED_CACHE.keys().next().value;
    if (oldestKey !== undefined) QUERY_EMBED_CACHE.delete(oldestKey);
  }
  QUERY_EMBED_CACHE.set(text, result.vector);
  return result.vector;
}

// A cosine similarity below this is treated as "no real match" — better to fall back to the
// static default examples (see reasoningEngine.ts's caller) than force in genuinely unrelated
// examples just because they happened to rank highest of a bad field. Tuned against this
// embedding model's typical same-domain baseline (see vectorSearch.ts's own comment on
// nomic-embed-text's baseline similarity running high for related short text) — kept
// conservative since a weak-but-included example is worse than one fewer example.
const MIN_RELEVANCE_SCORE = 0.35;

export async function retrieveVoiceExamples(prompt: string, topK: number = 3): Promise<VoiceExample[]> {
  const embeddings = await loadVoiceExampleEmbeddings();
  if (Object.keys(embeddings).length === 0) return [];

  const queryVec = await embedQueryCached(prompt);
  if (!queryVec) return [];

  const scored: { example: VoiceExample; score: number }[] = [];
  for (const example of VOICE_EXAMPLES) {
    const vec = embeddings[example.id];
    if (!vec) continue;
    const score = cosineSimilarity(queryVec, vec);
    if (score >= MIN_RELEVANCE_SCORE) scored.push({ example, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.example);
}

// Formats retrieved examples into the exact prose block the persona's own systemPrompt used to
// hardcode statically (see memoryStore.ts's crashout-bot history) — same framing text, just with
// dynamically-selected examples instead of the same fixed 3 every time.
export function formatVoiceExamplesBlock(examples: VoiceExample[]): string {
  if (examples.length === 0) return '';
  const pairs = examples.map((ex) => `Q: "${ex.query}"\nA: "${ex.answer}"`).join('\n');
  return (
    "\n\nHOW A REAL PERSON ANSWERS (match this energy and structure, never copy the actual words): no numbered steps, no bullet points, no \"firstly/secondly\", no restating their question back to them, no polite hedging (\"I think that\", \"it's worth noting\"), no ending every reply with the same generic \"let me know if you have questions!\" — a real person just answers, with their own opinion baked in, and only asks a follow-up when they'd genuinely want to know more.\n" +
    pairs +
    "\nThat's the bar: opinionated, specific, a little rough around the edges, zero corporate hedging, never a report."
  );
}
