import { getBM25Engine } from './src/ai-engine/semanticEngine';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';
import { processForSearch, expandQuerySynonyms, splitSentences } from './src/ai-engine/bm25Engine';
const e: any = getBM25Engine(BUILTIN_KNOWLEDGE);
const lit = new Set(processForSearch('what is the largest planet'));
const exp = expandQuerySynonyms([...lit]);
const doc = BUILTIN_KNOWLEDGE.find(d => d.title === 'The Solar System')!;
console.log('literal', [...lit]);
for (const s of splitSentences(doc.content)) {
  const terms = processForSearch(s);
  const hit = [...new Set(exp)].filter(t => terms.includes(t));
  console.log(hit.length ? '  HIT ' + JSON.stringify(hit) : '  ---', s.slice(0,80));
}
console.log(e.bm25Sentences(doc, exp, 4, lit));
