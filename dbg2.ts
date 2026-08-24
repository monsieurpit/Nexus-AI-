import { normalizeInternetSlang } from './src/ai-engine/slangAndBrainrotEngine';
const qs = [
 "so like yesterday my friend was telling me about this thing where computers can like learn stuff on their own and get better at it without someone telling them exactly what to do every time and I was wondering like what's that actually called and how does it even work",
 "bro i've been thinking about this for like an hour and i cant figure it out, when you type a website into your browser like google.com how does the computer actually know where to go find that website, like theres gotta be some system right",
];
for (const raw of qs) {
  const q = normalizeInternetSlang(raw).normalizedText.toLowerCase();
  console.log(JSON.stringify(q.slice(0,300)));
  const tests: [string, RegExp|boolean][] = [
    ['symbolic', /\d+\s*[+\-*/÷×^%]\s*\d+/],
    ['wordop', /\d+\s*(?:plus|minus|times|divided\s+by|multiplied\s+by|over|to\s+the\s+power(?:\s+of)?)\s*\d+/i],
    ['mph', /\d\s*(?:mph|km\/h|kmh|miles per hour)/],
    ['calculate', q.includes('calculate')],
    ['compute', q.includes('compute')],
    ['solve ', q.includes('solve ')],
    ['convert ', q.includes('convert ')],
    ['namedop', /\b(?:square|cube)\s*root\s+of\b|\babsolute\s+value\s+of\b|\bfactorial\b|\b(?:average|mean)\s+of\b|\d+\s*(?:factorial|squared|cubed)\b|\d+\s*mod\s*\d+/i],
    ['whatsdigit', (/\bwhat'?s\b|\bwhat\s+is\b/.test(q) && /\d/.test(q) && !/\bwhat'?s\s+a\b|\bwhat\s+is\s+a\b|\bwhat'?s\s+the\b|\bwhat\s+is\s+the\b|\bwhat'?s\s+an\b|\bwhat\s+is\s+an\b/.test(q))],
    ['pi', /\b(?:what\s+is|value\s+of)\s+(?:pi|euler'?s?\s+number)\b|^(?:pi|euler'?s?\s+number)\??$/i],
  ];
  for (const [n, t] of tests) {
    const r = typeof t === 'boolean' ? t : t.test(q);
    if (r) console.log('   HIT', n);
  }
  console.log();
}
