import { getBM25Engine } from './src/ai-engine/semanticEngine';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';
import { readFileSync } from 'fs';

const e = getBM25Engine(BUILTIN_KNOWLEDGE);
const words = readFileSync('/usr/share/dict/words', 'utf8').split('\n').filter((w) => /^[a-z]{5,}$/.test(w));
const hits: string[] = [];
for (const w of words) {
  const c = e.correctRawWords(w).text;
  if (c.toLowerCase() !== w) hits.push(`${w} -> ${c}`);
}
console.log('dict words rewritten by correctRawWords:', hits.length, '/', words.length);
console.log(hits.slice(0, 400).join('\n'));
