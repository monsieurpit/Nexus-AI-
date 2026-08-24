import { correctPromptTypos } from './src/ai-engine/promptCorrector';
import { getBM25Engine } from './src/ai-engine/semanticEngine';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';
import { normalizeInternetSlang } from './src/ai-engine/slangAndBrainrotEngine';
import { stem } from './src/ai-engine/bm25Engine';
const v = getBM25Engine(BUILTIN_KNOWLEDGE).vocabulary;
for (const q of process.argv.slice(2)) {
  const n = normalizeInternetSlang(q).normalizedText;
  const c = correctPromptTypos(n, v);
  console.log(JSON.stringify(q), '-> slang:', JSON.stringify(n), '-> typo:', JSON.stringify(c.text), c.corrections);
}
for (const w of ['calculat','wat','si','lern','learn','werk','photosythesi','photosynthesi']) console.log(w, 'stem=', stem(w), 'inVocab=', v.has(w), 'stemInVocab=', v.has(stem(w)));
