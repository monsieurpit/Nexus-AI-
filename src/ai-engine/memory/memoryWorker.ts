// Builds each person's personality summary when they go quiet (5 idle minutes, Patrick's plan) and runs the hourly
// cleanup. Only while nobody is chatting with Nexus (the same idle check the learning worker uses), one person per
// tick, so a summary never slows a real reply down.
//
// The summary EVOLVES: each run reads the previous summary plus the newest messages that fit the model's context
// (first run ≈ the last 100 messages, later runs cover more history through the previous summary — a 4B model can't
// read 2,000 messages at once, but it can fold 100 new ones into what it already knew).

import * as localLlmClient from '../localLlmClient';
import { engineIsIdle } from '../learning/worker';
import { cleanupMemory, peopleNeedingSummary, saveSummary, type PersonRecord } from './personalMemory';

const TICK_MS = 60_000;
const CHAR_BUDGET = 9000; // ~2.5k tokens of their messages, leaves room for the instructions and the old summary
let timer: ReturnType<typeof setInterval> | null = null;
let running = false;
let lastCleanup = 0;

export function summaryPrompt(rec: PersonRecord): { prompt: string; basedOn: number } {
  const picked: string[] = [];
  let used = 0;
  for (let i = rec.messages.length - 1; i >= 0 && picked.length < 300; i--) {
    const line = rec.messages[i].text.replace(/\s+/g, ' ').slice(0, 160);
    if (used + line.length > CHAR_BUDGET) break;
    picked.unshift(line);
    used += line.length + 1;
  }
  const prompt = `You are building a short private profile of a Discord member called "${rec.username}", from the messages they sent to Nexus (a funny, crude chat bot that roasts people). Nexus will use it to banter with them in a personal way instead of generic jokes.
${rec.summary ? `\nWHAT YOU ALREADY KNEW ABOUT THEM (update it, keep what's still true, drop what's contradicted):\n${rec.summary.text}\n` : ''}
THEIR MESSAGES (oldest first, ${picked.length} of them):
${picked.map((m) => `- ${m}`).join('\n')}

Write the updated profile in at most 8 short lines, each starting with a label:
How they talk: (tone, slang, emojis, language, caps, typos)
Interests: (games and their rank, teams, music, hobbies they actually mentioned)
Running jokes / things they say a lot:
How they roast / their usual comebacks:
What they brag about:
Safe roast material: (light, banter-level things they've mentioned about themselves)
Likely to: (how they usually react to Nexus)
NEVER include: health, mental health, sexuality, religion, ethnicity, family problems, school name, address or location, age, or anything they said while upset — leave those out completely even if they appear above. Only facts the messages actually show; no guessing. Plain lines, no intro.`;
  return { prompt, basedOn: picked.length };
}

// Lines about sensitive topics are dropped even if the model wrote them anyway.
const SENSITIVE_LINE_RE = /\b(?:depress\w*|anxiety|anxious|suicid\w*|self[\s-]?harm|therap\w*|diagnos\w*|adhd|autis\w*|disab\w*|religio\w*|church|mosque|muslim|christian|jewish|ethnic\w*|race|racial|lives\s+in|address|school\s+name|attends|grade\s+\d|years?\s+old|\b1[0-7]\s*yo\b|divorce|abuse\w*|parents?\s+(?:fight|split))\b/i;
export function cleanSummary(text: string): string {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !SENSITIVE_LINE_RE.test(l) && !/^never\b/i.test(l) && !/:\s*(?:n\/a|none\b|nothing\b|unknown|no\s+info|not\s+(?:stated|mentioned|clear)|doesn['’]?t\s+(?:explicitly\s+)?(?:state|say|mention))/i.test(l))
    .slice(0, 10)
    .join('\n');
}

export async function runMemoryTick(): Promise<'busy' | 'idle' | 'worked'> {
  if (running) return 'busy';
  if (Date.now() - lastCleanup > 60 * 60 * 1000) {
    lastCleanup = Date.now();
    try {
      const r = cleanupMemory();
      if (r.deleted) console.log(`[memory] cleanup: ${r.deleted} inactive profile(s) deleted (30 days), ${(r.bytes / 1024 / 1024).toFixed(1)} MB kept`);
    } catch (e) {
      console.warn('[memory] cleanup failed:', (e as Error).message);
    }
  }
  if (!engineIsIdle()) return 'busy';
  const [rec] = peopleNeedingSummary();
  if (!rec) return 'idle';
  running = true;
  try {
    const { prompt, basedOn } = summaryPrompt(rec);
    const r = await localLlmClient.generate(prompt, { model: localLlmClient.chatModel(), temperature: 0.3, maxTokens: 320, think: false, skipLanguageCheck: true, timeoutMs: 60000 });
    if (r.status === 'success' && r.text.trim()) {
      const text = cleanSummary(r.text);
      if (text) {
        saveSummary(rec.platform, rec.id, text, basedOn);
        console.log(`[memory] profile updated for ${rec.platform}:${rec.username} (${basedOn} messages read)`);
      }
    }
    return 'worked';
  } catch (e) {
    console.warn('[memory] summary failed:', (e as Error).message);
    return 'idle';
  } finally {
    running = false;
  }
}

export function startMemoryWorker(): void {
  if (timer || process.env.NEXUS_PERSONAL_MEMORY === 'off') return;
  timer = setInterval(() => void runMemoryTick(), TICK_MS);
}
