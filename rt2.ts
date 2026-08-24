import { generateReasoningPath } from './src/ai-engine/reasoningEngine';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from './src/ai-engine/memoryStore';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';

const settings = { ...DEFAULT_SETTINGS, swearIntensity: 'unhinged' as const };
const persona = DEFAULT_PERSONAS['nexus-homie'];

function sig(q: string) {
  const r = generateReasoningPath(q, [], persona, settings, BUILTIN_KNOWLEDGE, [], []);
  const c = r.content;
  const hedged = /not fully confident|not 100% certain|weaker match|closest thing/i.test(c);
  const titles = (c.match(/\*\*([^*]{4,70})\*\*/g) || []).slice(0, 2).join(' / ');
  const steps = r.thoughtSteps.map((s) => s.title).filter((t) => !/spelling/i.test(t)).join('|');
  return { hedged, titles, steps, content: c };
}

const pairs: [string, string][] = [
  ['wut is the squar root of 81', 'what is the square root of 81'],
  ['whats the squre root of 144', "what's the square root of 144"],
  ['calculat 15 percent of 240', 'calculate 15 percent of 240'],
  ['who is the goat footballler', 'who is the goat footballer'],
  ['explane how recurtion werks', 'explain how recursion works'],
  ['whats the capitol of france', "what's the capital of france"],
  ['wat is photosythesis', 'what is photosynthesis'],
  ['how dose photosynthesis work', 'how does photosynthesis work'],
  ['why si the sky blue', 'why is the sky blue'],
  ['who invnted the telephone', 'who invented the telephone'],
  ['whats teh capital of japan', "what's the capital of japan"],
  ['explan quantum entanglment', 'explain quantum entanglement'],
  ['hwo does dns work', 'how does dns work'],
  ['wht is machine lerning', 'what is machine learning'],
  ['tell me abuot black holes', 'tell me about black holes'],
  ['whos the best soccer playr ever', "who's the best soccer player ever"],
  ['whats 128 divded by 8', "what's 128 divided by 8"],
  ['definiton of inflation', 'definition of inflation'],
  ['compair python and javascript', 'compare python and javascript'],
  ['wehre is mount everest', 'where is mount everest'],
  ['reallllly quick what is gravity', 'really quick what is gravity'],
  ['sooo whats the boiling point of water', "so what's the boiling point of water"],
  ['waht causes earthquakes', 'what causes earthquakes'],
  ['how do vaccinnes work', 'how do vaccines work'],
  ['whcih planet is the biggest', 'which planet is the biggest'],
  ['wher is the eiffel tower', 'where is the eiffel tower'],
  ['diference between tcp and udp', 'difference between tcp and udp'],
  ['whats 20 percentt of 350', "what's 20 percent of 350"],
];

let fails = 0;
for (const [bad, good] of pairs) {
  const b = sig(bad), g = sig(good);
  const ok = b.steps === g.steps && b.hedged === g.hedged && b.titles === g.titles;
  if (!ok) {
    fails++;
    console.log('--- MISMATCH: ' + bad);
    console.log('   bad  steps=' + b.steps + ' hedge=' + b.hedged + ' t=' + b.titles);
    console.log('   good steps=' + g.steps + ' hedge=' + g.hedged + ' t=' + g.titles);
    console.log('   BAD : ' + b.content.replace(/\n/g, ' ').slice(0, 150));
    console.log('   GOOD: ' + g.content.replace(/\n/g, ' ').slice(0, 150));
  }
}
console.log(`\n${fails}/${pairs.length} structurally mismatched`);
