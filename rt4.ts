import { generateReasoningPath, detectQueryIntent } from './src/ai-engine/reasoningEngine';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from './src/ai-engine/memoryStore';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';

const settings = { ...DEFAULT_SETTINGS, swearIntensity: 'unhinged' as const };
const persona = DEFAULT_PERSONAS['nexus-homie'];

// question, expected-intent (or '' = any), expected substring in reply (or '' = any)
const cases: [string, string, string][] = [
  // --- conversational must still work ---
  ['hey', 'conversational', ''], ['yo', 'conversational', ''], ['hi', 'conversational', ''],
  ['ok', 'conversational', ''], ['okay cool', 'conversational', ''], ['lol', 'conversational', ''],
  ['thanks', 'conversational', ''], ['thanks bro', 'conversational', ''],
  ['how are you', 'conversational', ''], ['whats up', 'conversational', ''],
  ['who are you', 'conversational', ''], ['what can you do', 'conversational', ''],
  ['good morning', 'conversational', ''], ['gn', 'conversational', ''],
  ['idk', 'conversational', ''], ['idk man', 'conversational', ''],
  ['bet', 'conversational', ''], ['say less', 'conversational', ''],
  ['tell me a joke', 'conversational', ''], ['roast me', 'conversational', ''],
  ['hey whats up man', 'conversational', ''], ['yo wassup', 'conversational', ''],
  ['nvm', 'conversational', ''], ['never mind', 'conversational', ''],
  ['ok cool thanks', 'conversational', ''], ['lol that was funny', 'conversational', ''],
  ['fr fr', 'conversational', ''], ['no cap', 'conversational', ''],
  ['help me', 'conversational', ''], ['wyd', 'conversational', ''],
  // --- real questions that OPEN with a chat token must NOT be conversational ---
  ['yo what causes a supernova', 'general', ''],
  ['hey how does dns work', 'explanation', ''],
  ['ok so why is the sky blue', 'causal', ''],
  ['lol what is a black hole', 'definition', ''],
  ['idk what photosynthesis even is', 'general', ''],
  // --- math ---
  ['what is 2 + 2', 'mathematical', '4'],
  ["what's 128 divided by 8", 'mathematical', '16'],
  ['what is the square root of 81', 'mathematical', '9'],
  ['calculate 15 percent of 240', 'mathematical', '36'],
  ['what is 7 factorial', 'mathematical', '5040'],
  ['what is pi', 'mathematical', '3.14'],
  ['what is 12 squared', 'mathematical', '144'],
  // --- computer must NOT be math ---
  ['what is a computer', 'definition', ''],
  ['how do computers work', 'explanation', ''],
  ['explain computer architecture', 'explanation', ''],
  ['what is quantum computing', 'definition', ''],
  // --- standard knowledge ---
  ['what is the capital of france', 'location', 'Paris'],
  ['what is the capital of japan', 'location', 'Tokyo'],
  ['who invented the telephone', 'person', 'Bell'],
  ['why is the sky blue', 'causal', 'Rayleigh'],
  ['what is photosynthesis', 'definition', ''],
  ['how does dns work', 'explanation', ''],
  ['what causes earthquakes', 'general', ''],
  ['what is machine learning', 'definition', ''],
  ['difference between tcp and udp', 'comparative', ''],
  ['tell me about black holes', 'general', 'Black Hole'],
  ['what is inflation', 'definition', ''],
  ['how do vaccines work', 'explanation', ''],
  ["what is the boiling point of water", "definition", ""],
  ['who won the 2022 world cup', '', 'Argentina'],
  ['what is a black swan event', '', ''],
  ['how does a vpn work', 'explanation', ''],
  ['what is docker', 'definition', ''],
  ['explain recursion', 'explanation', ''],
  ['what is the largest planet', '', 'Jupiter'],
  ['where is mount everest', 'location', ''],
];

let fails = 0;
for (const [q, expIntent, expSub] of cases) {
  const intent = detectQueryIntent(q);
  const r = generateReasoningPath(q, [], persona, settings, BUILTIN_KNOWLEDGE, [], []);
  const badIntent = expIntent && intent !== expIntent;
  const badSub = expSub && !r.content.toLowerCase().includes(expSub.toLowerCase());
  if (badIntent || badSub) {
    fails++;
    console.log('FAIL ' + JSON.stringify(q));
    if (badIntent) console.log('   intent=' + intent + ' expected=' + expIntent);
    if (badSub) console.log('   missing ' + JSON.stringify(expSub) + ' in: ' + r.content.replace(/\n/g, ' ').slice(0, 180));
  }
}
console.log(`\n${fails}/${cases.length} failed`);
