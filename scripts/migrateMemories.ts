// One-time migration (2026-10-13, Patrick: "review every existing memory and update it to our changes so the AI isn't
// confused"): every saved profile gets structured memories (memory/memoryFacts.ts), built by replaying the person's whole
// message history IN ORDER, 60 messages at a time, each batch dated by when it was sent — so something mentioned on
// several different days ends up certain, and a one-off from weeks ago comes out already expired, exactly as the live
// system would have decided. Opted-out people are skipped. Waits whenever someone is chatting with Nexus.
//   bun run scripts/migrateMemories.ts [--dry]

import { readdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { loadPerson, type PersonRecord } from '../src/ai-engine/memory/personalMemory';
import { mergeFacts, pruneFacts, type MemoryFact } from '../src/ai-engine/memory/memoryFacts';
import { factsPrompt, parseFacts } from '../src/ai-engine/memory/memoryWorker';
import { writeFileSync } from 'fs';

const OLLAMA = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const MODEL = process.env.AUDIT_MODEL || 'nexus2:4b';
const DIR = join(homedir(), '.nexus-memory', 'users');
const dry = process.argv.includes('--dry');

async function idle() {
  for (;;) {
    const s: any = await fetch('http://localhost:3000/api/v1/queue/status').then((r) => r.json()).catch(() => ({ aheadOfNewRequest: 0 }));
    if (!s.aheadOfNewRequest) return;
    await new Promise((r) => setTimeout(r, 3000));
  }
}

async function extract(rec: PersonRecord, slice: PersonRecord['messages']) {
  await idle();
  const prompt = factsPrompt({ ...rec, messages: slice });
  const r: any = await fetch(`${OLLAMA}/api/generate`, { method: 'POST', body: JSON.stringify({ model: MODEL, prompt, stream: false, think: false, keep_alive: -1, options: { temperature: 0.2, num_predict: 260, num_ctx: 8192 } }) }).then((x) => x.json()).catch(() => null);
  return parseFacts(String(r?.response || ''));
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.json'));
for (const file of files) {
  const [platform, ...rest] = file.replace(/\.json$/, '').split('-');
  const id = rest.join('-');
  const rec = loadPerson(platform as any, id);
  if (!rec || rec.optedOut || rec.messages.length < 3) {
    console.log(`skip ${file} (${rec?.optedOut ? 'opted out' : `${rec?.messages.length ?? 0} messages`})`);
    continue;
  }
  let facts: MemoryFact[] = [];
  for (let i = 0; i < rec.messages.length; i += 60) {
    const slice = rec.messages.slice(i, i + 60);
    const observed = await extract(rec, slice);
    facts = mergeFacts(facts, observed, slice[slice.length - 1].t);
  }
  facts = pruneFacts(facts).map((f) => ({ ...f, origin: 'their-messages' as const }));
  const certain = facts.filter((f) => f.confidence === 'certain').length;
  console.log(`\n${rec.username} (${rec.messages.length} messages) → ${facts.length} memories, ${certain} certain`);
  for (const f of facts) console.log(`   ${f.kind.padEnd(13)} ${f.source.padEnd(9)} ${f.confidence.padEnd(10)} ${f.text}`);
  if (!dry) {
    const path = join(DIR, file);
    const raw = JSON.parse(require('fs').readFileSync(path, 'utf8'));
    raw.facts = facts;
    // The old free-text summary stays only as a fallback; with structured memories it is no longer shown to the model.
    if (raw.summary) raw.summary.legacy = true;
    writeFileSync(path, JSON.stringify(raw), { mode: 0o600 });
  }
}
