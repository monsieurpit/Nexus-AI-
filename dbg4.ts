import { searchKnowledgeGraph } from './src/ai-engine/semanticEngine';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';

const FILLER = new Set(`yesterday today tonight tomorrow friend friends roommate brother sister mom dad guy dude bro man buddy homie people everyone somebody someone anybody nobody
thing things stuff wondering wonder wondered thinking thought asked asking ask telling told tell said saying say talking talked talk watching watched saw seen reading
honestly genuinely basically actually literally seriously legit random dumb stupid weird crazy insane please sorry anyway anyways unrelated curious figure understand
simply simple quick quickly ages hour hours minute minutes day days night nights week weeks year years time times question questions answer answers
online internet google tiktok youtube instagram twitter documentary video videos movie movies show shows post posts
wanna gonna gotta kinda sorta lemme dunno idk imo tbh ngl fr lowkey highkey
dm chat server discord vc call
zoned nodded clue idea sound sounds late early sleep asleep argue arguing argued agree agreed disagree
explanation explaining explained technical confused confusing help helped helping mind brain head
keeps keep kept wanted want wants tried trying tries cannot cant couldnt didnt`.split(/\s+/).filter(Boolean));

function strip(q: string) {
  return q.split(/\s+/).filter((w) => !FILLER.has(w.toLowerCase().replace(/[^a-z']/g, ''))).join(' ');
}

const qs = [
 "idk if this is a dumb question but like everyone keeps talking about black holes in movies and stuff and i just wanna know what actually happens if you fall into one",
 "ngl i've been trying to understand this for ages and every explanation online is way too technical so please just explain it simply, what is the difference between tcp and udp",
 "bro i've been thinking about this for like an hour and i cant figure it out, when you type a website into your browser like google.com how does the computer actually know where to go find that website, like theres gotta be some system right",
 "so like yesterday my friend was telling me about this thing where computers can like learn stuff on their own and get better at it without someone telling them exactly what to do every time and I was wondering like what's that actually called and how does it even work",
 "hey so my little brother asked me this and i felt so dumb because i couldnt answer it, he wanted to know how plants make their own food from sunlight and stuff, can you explain photosynthesis to me",
 "okay so this is gonna sound random and i know its late but i genuinely cannot sleep because im thinking about it, how do vaccines actually work in your body",
 "yo so i saw this tiktok where a guy was explaining money stuff and he kept saying inflation this inflation that and i nodded like i knew what he meant but i had no clue, what does inflation actually mean",
];
for (const q of qs) {
  const s = strip(q);
  console.log('FULL:', q.slice(0,60));
  for (const x of searchKnowledgeGraph(q, BUILTIN_KNOWLEDGE, 2)) console.log('    ', x.score.toFixed(2), x.item.title.slice(0,55));
  console.log('STRIPPED:', s.slice(0,90));
  for (const x of searchKnowledgeGraph(s, BUILTIN_KNOWLEDGE, 2)) console.log('    ', x.score.toFixed(2), x.item.title.slice(0,55));
  console.log();
}
