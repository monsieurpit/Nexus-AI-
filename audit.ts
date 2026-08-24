import { correctPromptTypos } from './src/ai-engine/promptCorrector';
import { getBM25Engine } from './src/ai-engine/semanticEngine';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';

const vocab = getBM25Engine(BUILTIN_KNOWLEDGE).vocabulary;
const counts = new Map<string, number>();
for (const doc of BUILTIN_KNOWLEDGE) {
  const text = doc.title + '\n' + doc.content + '\n' + doc.keywords.join(' ');
  const { corrections } = correctPromptTypos(text, vocab);
  for (const c of corrections) {
    const k = c.from.toLowerCase() + ' -> ' + c.to;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
}
const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
console.log('distinct corrections fired over corpus:', rows.length);
for (const [k, n] of rows) console.log(String(n).padStart(5), k);
