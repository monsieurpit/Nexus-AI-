import { correctPromptTypos } from './src/ai-engine/promptCorrector';
import { getBM25Engine } from './src/ai-engine/semanticEngine';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';
import { readFileSync } from 'fs';

const vocab = getBM25Engine(BUILTIN_KNOWLEDGE).vocabulary;
const words = readFileSync('/usr/share/dict/words', 'utf8').split('\n').filter((w) => /^[a-z]{2,}$/.test(w));
const hits: string[] = [];
for (const w of words) {
  const { corrections } = correctPromptTypos(w, vocab);
  if (corrections.length) hits.push(`${w} -> ${corrections[0].to}`);
}
console.log('dict words rewritten:', hits.length, '/', words.length);
console.log(hits.join('\n'));
