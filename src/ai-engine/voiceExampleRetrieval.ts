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
import { splitSentencesSafe } from './sentences';
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

const LEARNED_MIN_RELEVANCE = 0.55;
const LEARNED_EXAMPLE_COOLDOWN_MS = 30 * 60 * 1000;
const lastUsedAt = new Map<string, number>();

// Voice examples learned from people's reactions (src/ai-engine/learning/feedback.ts) — replies the
// server actually loved. Registered at runtime with their own embedding; searched alongside the
// hand-written bank.
const runtimeExamples = new Map<string, { example: VoiceExample; vector: number[] | Float32Array }>();

export function registerRuntimeVoiceExample(example: VoiceExample, vector: number[] | Float32Array): void {
  runtimeExamples.set(example.id, { example, vector });
}

export function removeRuntimeVoiceExample(id: string): void {
  runtimeExamples.delete(id);
}

export function runtimeVoiceExampleVectors(): { id: string; vector: number[] | Float32Array }[] {
  return [...runtimeExamples.values()].map((r) => ({ id: r.example.id, vector: r.vector }));
}

export async function retrieveVoiceExamples(prompt: string, topK: number = 3): Promise<VoiceExample[]> {
  const embeddings = await loadVoiceExampleEmbeddings();
  if (Object.keys(embeddings).length === 0 && runtimeExamples.size === 0) return [];

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
  const picked = scored.slice(0, topK).map((s) => s.example);

  // Learned examples don't get to take over (Patrick, 2026-09-30: an earlier learning attempt made
  // the bot keep repeating what it had picked up). At most ONE per reply, only when it's a close
  // match, and never the same one twice within 30 minutes — so one loved reply can't become a
  // catchphrase the bot parrots across the channel.
  const now = Date.now();
  let bestLearned: { example: VoiceExample; score: number } | null = null;
  for (const { example, vector } of runtimeExamples.values()) {
    if (now - (lastUsedAt.get(example.id) ?? 0) < LEARNED_EXAMPLE_COOLDOWN_MS) continue;
    const score = cosineSimilarity(queryVec, vector);
    // An example for (almost) the SAME message gets copied word for word by the model — that's how Nexus kept
    // replaying an old reply to the same message (2026-10-04). Near-identical matches are skipped.
    if (score >= 0.9) continue;
    if (score >= LEARNED_MIN_RELEVANCE && (!bestLearned || score > bestLearned.score)) bestLearned = { example, score };
  }
  if (bestLearned) {
    lastUsedAt.set(bestLearned.example.id, now);
    if (picked.length >= topK) picked.pop();
    picked.push(bestLearned.example);
  }
  return picked;
}

// Formats retrieved examples into the exact prose block the persona's own systemPrompt used to
// hardcode statically (see memoryStore.ts's crashout-bot history) — same framing text, just with
// dynamically-selected examples instead of the same fixed 3 every time.
//
// Answers are trimmed to their first sentence or two (~200 chars) here. Found 2026-09-30: all 81
// hand-written answers are long (median 441 chars / 78 words, 79 of 81 over the reply length cap),
// and three of them in every prompt, framed as "match this", outweighed the one-line LENGTH rule —
// a small model copies its examples' length far more than it follows a length instruction. Each
// answer already opens with its actual take, so the first sentence keeps the voice. The full text
// stays in voiceExamples.ts (and its embeddings, which only use `query`) untouched.
const EXAMPLE_ANSWER_MAX_CHARS = 200;

export function shortenExampleAnswer(answer: string, max: number = EXAMPLE_ANSWER_MAX_CHARS): string {
  const sentences = splitSentencesSafe(answer);
  let out = sentences[0] || answer;
  for (const s of sentences.slice(1)) {
    if ((out + ' ' + s).length > max) break;
    out += ' ' + s;
  }
  if (out.length > max * 1.2) {
    const head = out.slice(0, max);
    const cut = Math.max(head.lastIndexOf(';'), head.lastIndexOf(' —'), head.lastIndexOf('—'), head.lastIndexOf(', '));
    if (cut > max * 0.4) out = head.slice(0, cut).replace(/[\s,;—–-]+$/, '') + '.';
  }
  // Last resort for one long unpunctuated sentence: cut at a word boundary, dropping a dangling
  // connector so it doesn't end on "and."/"but.".
  if (out.length > max * 1.3) {
    out = out.slice(0, out.lastIndexOf(' ', max)).replace(/\s+(?:and|but|or|so|because|like|the|a|an|to|of|with|that|which)$/i, '').replace(/[\s,;—–-]+$/, '') + '.';
  }
  return out;
}

export function formatVoiceExamplesBlock(examples: VoiceExample[]): string {
  if (examples.length === 0) return '';
  const pairs = examples.map((ex) => `Q: "${ex.query}"\nA: "${shortenExampleAnswer(ex.answer)}"`).join('\n');
  return (
    "\n\nHOW A REAL PERSON ANSWERS (match this LENGTH and energy — one short punchy line — never copy the actual words): no numbered steps, no bullet points, no \"firstly/secondly\", no restating their question back to them, no polite hedging (\"I think that\", \"it's worth noting\"), no ending every reply with the same generic \"let me know if you have questions!\" — a real person just answers, with their own opinion baked in, and only asks a follow-up when they'd genuinely want to know more.\n" +
    pairs +
    "\nThat's the bar: opinionated, specific, a little rough around the edges, zero corporate hedging, never a report."
  );
}
