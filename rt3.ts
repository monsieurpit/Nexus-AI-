import { generateReasoningPath, detectQueryIntent } from './src/ai-engine/reasoningEngine';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from './src/ai-engine/memoryStore';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';

const settings = { ...DEFAULT_SETTINGS, swearIntensity: 'unhinged' as const };
const persona = DEFAULT_PERSONAS['nexus-homie'];

// [rambling, crisp equivalent]
const pairs: [string, string][] = [
  [
    "so like yesterday my friend was telling me about this thing where computers can like learn stuff on their own and get better at it without someone telling them exactly what to do every time and I was wondering like what's that actually called and how does it even work",
    'what is machine learning and how does it work',
  ],
  [
    "ok so hear me out i was watching a documentary last night and they were talking about how the sky looks the way it does and honestly i kinda zoned out but basically why is the sky blue like what actually makes it that color",
    'why is the sky blue',
  ],
  [
    "bro i've been thinking about this for like an hour and i cant figure it out, when you type a website into your browser like google.com how does the computer actually know where to go find that website, like theres gotta be some system right",
    'how does dns work',
  ],
  [
    "hey so my little brother asked me this and i felt so dumb because i couldnt answer it, he wanted to know how plants make their own food from sunlight and stuff, can you explain photosynthesis to me",
    'explain photosynthesis',
  ],
  [
    "idk if this is a dumb question but like everyone keeps talking about black holes in movies and stuff and i just wanna know what actually happens if you fall into one",
    'what happens if you fall into a black hole',
  ],
  [
    "so basically i was arguing with my roommate for like 20 minutes about football and he said pele was better and i said maradona was better and we couldnt agree, who is actually considered the greatest footballer of all time",
    'who is the greatest footballer of all time',
  ],
  [
    "ngl i've been trying to understand this for ages and every explanation online is way too technical so please just explain it simply, what is the difference between tcp and udp",
    'what is the difference between tcp and udp',
  ],
  [
    "man i had the weirdest day today, anyway completely unrelated but i was reading about earthquakes earlier and it got me curious, what actually causes earthquakes to happen",
    'what causes earthquakes',
  ],
  [
    "okay so this is gonna sound random and i know its late but i genuinely cannot sleep because im thinking about it, how do vaccines actually work in your body",
    'how do vaccines work',
  ],
  [
    "yo so i saw this tiktok where a guy was explaining money stuff and he kept saying inflation this inflation that and i nodded like i knew what he meant but i had no clue, what does inflation actually mean",
    'what does inflation mean',
  ],
];

for (const [ramble, crisp] of pairs) {
  const r1 = generateReasoningPath(ramble, [], persona, settings, BUILTIN_KNOWLEDGE, [], []);
  const r2 = generateReasoningPath(crisp, [], persona, settings, BUILTIN_KNOWLEDGE, [], []);
  const t = (c: string) => (c.match(/\*\*([^*]{4,70})\*\*/g) || []).slice(0, 2).join(' / ');
  const h = (c: string) => /not fully confident|not 100% certain|weaker match|closest thing/i.test(c);
  const same = t(r1.content) === t(r2.content);
  console.log((same ? 'OK   ' : 'DIFF ') + JSON.stringify(ramble.slice(0, 60)));
  console.log('   ramble intent=' + detectQueryIntent(ramble) + ' hedge=' + h(r1.content) + ' -> ' + t(r1.content));
  console.log('   crisp  intent=' + detectQueryIntent(crisp) + ' hedge=' + h(r2.content) + ' -> ' + t(r2.content));
  if (!same) console.log('   RAMBLE OUT: ' + r1.content.replace(/\n/g, ' ').slice(0, 200));
}
