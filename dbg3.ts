import { searchKnowledgeGraph } from './src/ai-engine/semanticEngine';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';
import { processForSearch } from './src/ai-engine/bm25Engine';
const qs = [
 "idk if this is a dumb question but like everyone keeps talking about black holes in movies and stuff and i just wanna know what actually happens if you fall into one",
 "what actually happens if you fall into one",
 "black holes what actually happens if you fall into one",
 "ngl i've been trying to understand this for ages and every explanation online is way too technical so please just explain it simply, what is the difference between tcp and udp",
 "what is the difference between tcp and udp",
 "bro i've been thinking about this for like an hour and i cant figure it out, when you type a website into your browser like google.com how does the computer actually know where to go find that website, like theres gotta be some system right",
 "how does the computer actually know where to go find that website",
];
for (const q of qs) {
  const r = searchKnowledgeGraph(q, BUILTIN_KNOWLEDGE, 3);
  console.log('Q:', q.slice(0,80));
  console.log('   terms:', processForSearch(q).length);
  for (const x of r) console.log('   ', x.score.toFixed(2), x.item.title.slice(0,60));
}
