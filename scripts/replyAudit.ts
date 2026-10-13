// Hunts for unrelated / nonsense replies in the reply log (2026-10-12, Patrick: "hunt for unrelated or bad answers").
// Explicit checks can't see "this reply has nothing to do with the message", so the model judges each exchange at
// temperature 0: RELEVANT or OFF, with a few words why. It only reports — nothing is changed.
//   bun run scripts/replyAudit.ts [--hours 24] [--limit 400]
// Real people come first: it waits whenever the engine's queue is busy.

import { Database } from 'bun:sqlite';
import { homedir } from 'os';
import { join } from 'path';

const args = process.argv.slice(2);
const arg = (n: string) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const OLLAMA = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const ENGINE = process.env.NEXUS_ENGINE_URL || 'http://localhost:3000';
// Not OLLAMA_MODEL: Bun loads the repo's .env, which still names an old model (the engine's real one comes from launchd).
const MODEL = process.env.AUDIT_MODEL || 'nexus2:4b';
const db = new Database(join(process.env.NEXUS_REPLYLOG_DIR || join(homedir(), '.nexus-replylog'), 'replies.db'), { readonly: true });
const since = Date.now() - Number(arg('hours') || 24) * 3600_000;
const rows = db.query('SELECT at, mode, userText, reply FROM replies WHERE at >= ? ORDER BY at').all(since).slice(-Number(arg('limit') || 400)) as Array<{ at: number; mode: string; userText: string; reply: string }>;

const SYSTEM = `You check replies from Nexus, a crude, rude, funny Discord bot who swears and roasts people. Rudeness, insults and swearing are FINE and expected. Your only job: does the reply actually respond to the message?
RELEVANT = it answers the question, reacts to what they said, or roasts them back in a way connected to the message.
OFF = it ignores the question, answers something else, doesn't make sense as a reply, or contradicts itself.
Reply with exactly one line: "RELEVANT" or "OFF: <max 8 words why>".`;

async function idle(): Promise<void> {
  for (;;) {
    const s: any = await fetch(`${ENGINE}/api/v1/queue/status`).then((r) => r.json()).catch(() => ({ aheadOfNewRequest: 0 }));
    if (!s.aheadOfNewRequest) return;
    await new Promise((r) => setTimeout(r, 3000));
  }
}

const off: Array<{ at: number; mode: string; msg: string; reply: string; why: string }> = [];
let n = 0;
for (const r of rows) {
  if (/```/.test(r.reply) && r.mode !== 'chat') continue; // code / Morse blocks: not this check's job
  await idle();
  const res: any = await fetch(`${OLLAMA}/api/chat`, {
    method: 'POST',
    body: JSON.stringify({ model: MODEL, stream: false, think: false, keep_alive: -1, options: { temperature: 0, num_predict: 24, num_ctx: 8192 }, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: `Message: "${r.userText.slice(0, 400)}"\nNexus's reply: "${r.reply.slice(0, 500)}"` }] }),
  }).then((x) => x.json()).catch(() => null);
  const verdict = String(res?.message?.content || '').trim();
  if (!res?.message) {
    console.error(`judge call failed: ${JSON.stringify(res)?.slice(0, 200)}`);
    process.exit(1);
  }
  n++;
  if (/^OFF/i.test(verdict)) off.push({ at: r.at, mode: r.mode, msg: r.userText, reply: r.reply, why: verdict.replace(/^OFF:?\s*/i, '') });
}
const one = (t: string, k: number) => t.replace(/\s+/g, ' ').trim().slice(0, k).replace(/nig+e*r|niga+/gi, '[slur]');
console.log(`audited ${n} replies — ${off.length} flagged OFF (${n ? Math.round((100 * off.length) / n) : 0}%)\n`);
for (const o of off) console.log(`- ${new Date(o.at - 4 * 3600_000).toISOString().slice(11, 16)} [${o.mode}] ${one(o.why, 60)}\n    them:  ${one(o.msg, 130)}\n    nexus: ${one(o.reply, 170)}`);
