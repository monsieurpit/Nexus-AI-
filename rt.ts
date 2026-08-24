import { generateReasoningPath, detectQueryIntent } from './src/ai-engine/reasoningEngine';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from './src/ai-engine/memoryStore';
import { BUILTIN_KNOWLEDGE } from './src/ai-engine/knowledgeBase';

const settings = { ...DEFAULT_SETTINGS, swearIntensity: 'unhinged' as const };
const persona = DEFAULT_PERSONAS['nexus-homie'];

export function ask(prompt: string) {
  const r = generateReasoningPath(prompt, [], persona, settings, BUILTIN_KNOWLEDGE, [], []);
  return r;
}

const qs = process.argv.slice(2);
for (const q of qs) {
  const r = ask(q);
  console.log('='.repeat(90));
  console.log('Q: ' + q);
  console.log('INTENT: ' + detectQueryIntent(q));
  console.log('STEPS: ' + r.thoughtSteps.map((s) => s.title).join(' | '));
  console.log('---');
  console.log(r.content);
}
