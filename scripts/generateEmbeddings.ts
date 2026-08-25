// (Re-)generator for src/ai-engine/corpus/embeddings.generated.json — run via `npm run
// embed:corpus` whenever the corpus changes. Requires OLLAMA_BASE_URL pointed at a reachable
// Ollama instance with the embedding model (default nomic-embed-text) already pulled.
//
// Delta-aware: only calls Ollama for items that are new, whose content actually changed (tracked
// via a hash of the embedded text, not just id presence), or whose embedding model changed.
// Existing items with no changes are carried over from the current file untouched — at 221 items
// this barely matters, but it means adding one new corpus doc later costs one embed call, not
// 221, and re-running after no changes at all costs zero Ollama calls. Pass FORCE_REEMBED=true to
// ignore the cache and re-embed everything (e.g. after intentionally tweaking the input-text
// convention below).
//
// Not part of the runtime server — this only ever runs by hand, on a machine that can reach
// Ollama, producing a static file that gets committed to git and loaded with zero network
// dependency at server startup (see vectorSearch.ts).

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { BUILTIN_KNOWLEDGE } from '../src/ai-engine/knowledgeBase';
import * as localLlmClient from '../src/ai-engine/localLlmClient';

const OUTPUT_PATH = resolve(__dirname, '../src/ai-engine/corpus/embeddings.generated.json');
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
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

function embedInputFor(item: (typeof BUILTIN_KNOWLEDGE)[number]): string {
  // Same input-text convention already used by the legacy fake-vector fallback in
  // semanticEngine.ts (title + keywords + content), plus nomic-embed-text's recommended
  // "search_document:" prefix for indexed documents — its query-time counterpart
  // "search_query:" is applied to the query text in vectorSearch.ts's embedQueryCached().
  return `search_document: ${item.title} ${item.keywords.join(' ')} ${item.content}`;
}

function loadExisting(): EmbeddingsFile {
  if (!existsSync(OUTPUT_PATH)) {
    return { model: null, dim: null, generatedAt: null, vectors: {} };
  }
  try {
    const parsed = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'));
    // Back-compat: the very first version of this file stored bare number[] per id (no hash) —
    // treat those as stale so they get re-embedded once under the new hash-tracked format,
    // rather than crashing on the shape mismatch.
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

  for (let i = 0; i < BUILTIN_KNOWLEDGE.length; i++) {
    const item = BUILTIN_KNOWLEDGE[i];
    const text = embedInputFor(item);
    const textHash = hashText(text);
    const cached = existing.vectors[item.id];

    if (!FORCE_REEMBED && !modelChanged && cached && cached.textHash === textHash) {
      vectors[item.id] = cached;
      skipped++;
      continue;
    }

    const result = await localLlmClient.embed(text, { timeoutMs: 30000 });
    if (result.status !== 'success') {
      failures++;
      console.warn(`  FAILED "${item.title}": ${result.reason}`);
      // Keep the stale cached vector rather than dropping it entirely, if one exists — a failed
      // re-embed of an unchanged/lightly-changed doc is better served by slightly-stale data than
      // by silently losing vector coverage for it.
      if (cached) vectors[item.id] = cached;
      continue;
    }

    vectors[item.id] = { vector: result.vector, textHash };
    embedded++;
    if (embedded % 20 === 0) console.log(`  embedded ${embedded} so far...`);
  }

  const droppedIds = Object.keys(existing.vectors).filter((id) => !BUILTIN_KNOWLEDGE.some((k) => k.id === id));
  if (droppedIds.length > 0) {
    console.log(`Dropping ${droppedIds.length} vector(s) for corpus item(s) that no longer exist: ${droppedIds.join(', ')}`);
  }

  console.log(`\n${embedded} embedded, ${skipped} unchanged (skipped), ${failures} failed, ${droppedIds.length} dropped.`);
  if (failures > 0) {
    console.warn(`${failures} document(s) failed to embed this run — re-run once Ollama is reachable to fill them in.`);
  }

  const dim = Object.values(vectors)[0]?.vector.length ?? null;
  const output: EmbeddingsFile & { generatedAt: string } = {
    model: EMBED_MODEL,
    dim,
    generatedAt: new Date().toISOString(),
    vectors,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${Object.keys(vectors).length} vectors (dim=${dim}) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('generateEmbeddings failed:', err);
  process.exit(1);
});
