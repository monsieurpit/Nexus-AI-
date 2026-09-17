// (Re-)generator for src/ai-engine/corpus/voiceExampleEmbeddings.generated.json — run via
// `bun run embed:voice` whenever src/ai-engine/corpus/voiceExamples.ts changes. Mirrors
// scripts/generateEmbeddings.ts's exact pattern (delta-aware via a content hash, static file
// committed to git, loaded with zero network dependency at server startup) but embeds each voice
// example's `query` field instead of a corpus document, for voiceExampleRetrieval.ts's
// retrieval-based few-shot selection — see voiceExamples.ts's own header comment for why this
// exists (a fixed 3-example block can't demonstrate every topic; retrieval picks whichever 2-3 of
// a much larger bank actually match what's being asked).
//
// Not part of the runtime server — this only ever runs by hand, on a machine that can reach
// Ollama, producing a static file loaded with zero network dependency at server startup.

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { VOICE_EXAMPLES } from '../src/ai-engine/corpus/voiceExamples';
import * as localLlmClient from '../src/ai-engine/localLlmClient';

const OUTPUT_PATH = resolve(__dirname, '../src/ai-engine/corpus/voiceExampleEmbeddings.generated.json');
// Same sync fix as scripts/generateEmbeddings.ts — see its comment.
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'bge-m3';
const FORCE_REEMBED = process.env.FORCE_REEMBED === 'true';

interface VectorEntry {
  vector: number[];
  textHash: string;
}
interface EmbeddingsFile {
  model: string | null;
  dim: number | null;
  generatedAt: string | null;
  vectors: Record<string, VectorEntry>;
}

function hashText(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

// Same rounding + compact-output treatment as scripts/generateEmbeddings.ts, for consistency —
// see that file's roundVector comment for why. This file is far smaller (81 items) so it was never
// close to GitHub's size limit, but keeping both generated files on the same convention avoids a
// silent format drift between them.
function roundVector(vec: number[]): number[] {
  return vec.map((x) => Math.round(x * 1e6) / 1e6);
}

// nomic-embed-text's recommended "search_document:" prefix for indexed text — the query-time
// counterpart "search_query:" is applied to the live user prompt in voiceExampleRetrieval.ts,
// same convention vectorSearch.ts already uses for the main knowledge corpus.
function embedInputFor(example: (typeof VOICE_EXAMPLES)[number]): string {
  return `search_document: ${example.query}`;
}

function loadExisting(): EmbeddingsFile {
  if (!existsSync(OUTPUT_PATH)) {
    return { model: null, dim: null, generatedAt: null, vectors: {} };
  }
  try {
    const parsed = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'));
    const vectors: Record<string, VectorEntry> = {};
    for (const [id, entry] of Object.entries<any>(parsed.vectors || {})) {
      if (entry && typeof entry === 'object' && Array.isArray(entry.vector) && typeof entry.textHash === 'string') {
        vectors[id] = entry;
      }
    }
    return { model: parsed.model ?? null, dim: parsed.dim ?? null, generatedAt: parsed.generatedAt ?? null, vectors };
  } catch {
    return { model: null, dim: null, generatedAt: null, vectors: {} };
  }
}

async function main() {
  const existing = loadExisting();
  const modelChanged = existing.model !== null && existing.model !== EMBED_MODEL;
  if (modelChanged) {
    console.log(`Embedding model changed (${existing.model} -> ${EMBED_MODEL}) — re-embedding everything.`);
  }
  if (FORCE_REEMBED) {
    console.log('FORCE_REEMBED=true — ignoring cache, re-embedding everything.');
  }

  const vectors: Record<string, VectorEntry> = {};
  let embedded = 0;
  let skipped = 0;
  let failures = 0;

  for (const example of VOICE_EXAMPLES) {
    const text = embedInputFor(example);
    const textHash = hashText(text);
    const cached = existing.vectors[example.id];

    if (!FORCE_REEMBED && !modelChanged && cached && cached.textHash === textHash) {
      vectors[example.id] = cached;
      skipped++;
      continue;
    }

    const result = await localLlmClient.embed(text, { timeoutMs: 30000 });
    if (result.status !== 'success') {
      failures++;
      console.warn(`  FAILED "${example.id}": ${result.reason}`);
      if (cached) vectors[example.id] = cached;
      continue;
    }

    vectors[example.id] = { vector: roundVector(result.vector), textHash };
    embedded++;
    if (embedded % 20 === 0) console.log(`  embedded ${embedded} so far...`);
  }

  const droppedIds = Object.keys(existing.vectors).filter((id) => !VOICE_EXAMPLES.some((e) => e.id === id));
  if (droppedIds.length > 0) {
    console.log(`Dropping ${droppedIds.length} vector(s) for example(s) that no longer exist: ${droppedIds.join(', ')}`);
  }

  console.log(`\n${embedded} embedded, ${skipped} unchanged (skipped), ${failures} failed, ${droppedIds.length} dropped.`);
  if (failures > 0) {
    console.warn(`${failures} example(s) failed to embed this run — re-run once Ollama is reachable to fill them in.`);
  }

  const dim = Object.values(vectors)[0]?.vector.length ?? null;
  const output: EmbeddingsFile & { generatedAt: string } = {
    model: EMBED_MODEL,
    dim,
    generatedAt: new Date().toISOString(),
    vectors,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output) + '\n');
  console.log(`Wrote ${Object.keys(vectors).length} vectors (dim=${dim}) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('generateVoiceExampleEmbeddings failed:', err);
  process.exit(1);
});
