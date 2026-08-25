// One-time (re-)generator for src/ai-engine/corpus/embeddings.generated.json — run manually
// whenever the corpus changes, via `npm run embed:corpus`. Requires OLLAMA_BASE_URL pointed at a
// reachable Ollama instance with the embedding model (default nomic-embed-text) already pulled.
//
// Not part of the runtime server — this only ever runs by hand, on a machine that can reach
// Ollama, producing a static file that gets committed to git and loaded with zero network
// dependency at server startup (see vectorSearch.ts).

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { BUILTIN_KNOWLEDGE } from '../src/ai-engine/knowledgeBase';
import * as localLlmClient from '../src/ai-engine/localLlmClient';

const OUTPUT_PATH = resolve(__dirname, '../src/ai-engine/corpus/embeddings.generated.json');
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';

async function main() {
  console.log(`Generating embeddings for ${BUILTIN_KNOWLEDGE.length} corpus documents using ${EMBED_MODEL}...`);

  const vectors: Record<string, number[]> = {};
  let failures = 0;

  for (let i = 0; i < BUILTIN_KNOWLEDGE.length; i++) {
    const item = BUILTIN_KNOWLEDGE[i];
    // Same input-text convention already used by the legacy fake-vector fallback in
    // semanticEngine.ts (title + keywords + content), plus nomic-embed-text's recommended
    // "search_document:" prefix for indexed documents — its query-time counterpart
    // "search_query:" is applied to the query text in vectorSearch.ts's embedQueryCached().
    const text = `search_document: ${item.title} ${item.keywords.join(' ')} ${item.content}`;
    const result = await localLlmClient.embed(text, { timeoutMs: 30000 });

    if (result.status !== 'success') {
      failures++;
      console.warn(`  [${i + 1}/${BUILTIN_KNOWLEDGE.length}] FAILED "${item.title}": ${result.reason}`);
      continue;
    }

    vectors[item.id] = result.vector;
    if ((i + 1) % 20 === 0 || i === BUILTIN_KNOWLEDGE.length - 1) {
      console.log(`  [${i + 1}/${BUILTIN_KNOWLEDGE.length}] embedded (dim=${result.vector.length})`);
    }
  }

  if (failures > 0) {
    console.warn(`\n${failures} document(s) failed to embed and will have no vector — re-run once Ollama is reachable to fill them in.`);
  }

  const dim = Object.values(vectors)[0]?.length ?? null;
  const output = {
    model: EMBED_MODEL,
    dim,
    generatedAt: new Date().toISOString(),
    vectors,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');
  console.log(`\nWrote ${Object.keys(vectors).length} vectors (dim=${dim}) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('generateEmbeddings failed:', err);
  process.exit(1);
});
