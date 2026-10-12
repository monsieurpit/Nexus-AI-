// The nightly quality report on real replies (reliability plan, step 2). Reads the reply log
// (src/ai-engine/memory/replyLog.ts): it only detects and shows evidence — it never changes prompts or code.
//   bun run scripts/replyReport.ts                 last 24 h → printed + saved to ~/.nexus-replylog/reports/<date>.md
//   bun run scripts/replyReport.ts --hours 12      a shorter window (nothing is older than 24 h)
//   bun run scripts/replyReport.ts --stats         how much is stored
//   bun run scripts/replyReport.ts --reset --yes   deletes every stored message and reply now (no undo)

import { Database } from 'bun:sqlite';
import { existsSync, mkdirSync, writeFileSync, statSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const DIR = process.env.NEXUS_REPLYLOG_DIR || join(homedir(), '.nexus-replylog');
const FILE = join(DIR, 'replies.db');
const args = process.argv.slice(2);
const has = (f: string) => args.includes(`--${f}`);
const arg = (n: string) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};

if (!existsSync(FILE)) {
  console.log(`no reply log yet (${FILE})`);
  process.exit(0);
}
const db = new Database(FILE);

if (has('reset')) {
  const n = (db.query('SELECT COUNT(*) AS n FROM replies').get() as any).n;
  if (!has('yes')) {
    console.log(`this deletes all ${n} stored messages and replies, with no undo. Run again with --reset --yes`);
    process.exit(1);
  }
  db.exec('DELETE FROM replies');
  db.exec('VACUUM');
  console.log(`reset: ${n} messages and replies deleted`);
  process.exit(0);
}

if (has('stats')) {
  const r: any = db.query('SELECT COUNT(*) AS n, COUNT(DISTINCT userHash) AS people, MIN(at) AS first, MAX(at) AS last FROM replies').get();
  console.log(`${r.n} exchanges from ${r.people} people, ${r.first ? new Date(r.first).toISOString().slice(0, 16) : '-'} → ${r.last ? new Date(r.last).toISOString().slice(0, 16) : '-'}, ${(statSync(FILE).size / 1024 / 1024).toFixed(1)} MB`);
  process.exit(0);
}

// Everything is kept only 24 hours (replyLog.ts); the report enforces it too, in case the engine was off.
db.query('DELETE FROM replies WHERE at < ?').run(Date.now() - 24 * 3600_000);
const since = has('all') ? 0 : Date.now() - Number(arg('hours') || 24) * 3600_000;
const rows = db.query('SELECT * FROM replies WHERE at >= ? ORDER BY at').all(since) as Array<{ at: number; userHash: string; userText: string; reply: string; mode: string; lang: string; ms: number; flags: string }>;
const flagged = rows.map((r) => ({ ...r, f: JSON.parse(r.flags) as string[] })).filter((r) => r.f.length);
const kinds = new Map<string, number>();
for (const r of flagged) for (const f of r.f) kinds.set(f.replace(/:.*$/, ''), (kinds.get(f.replace(/:.*$/, '')) || 0) + 1);
const byMode = new Map<string, number>();
for (const r of rows) byMode.set(r.mode, (byMode.get(r.mode) || 0) + 1);
const ms = rows.map((r) => r.ms).sort((a, b) => a - b);
const pct = (p: number) => (ms.length ? Math.round(ms[Math.min(ms.length - 1, Math.floor(ms.length * p))] / 100) / 10 : 0);
const one = (t: string, n: number) => t.replace(/\s+/g, ' ').trim().slice(0, n);

const lines: string[] = [];
const title = has('all') ? 'everything stored' : `last ${arg('hours') || 24} h`;
lines.push(`# Nexus reply report — ${title} (${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC)`, '');
lines.push(`${rows.length} replies to ${new Set(rows.map((r) => r.userHash)).size} people · ${flagged.length} flagged (${rows.length ? Math.round((100 * flagged.length) / rows.length) : 0}%) · speed: median ${pct(0.5)} s, 95% under ${pct(0.95)} s`);
lines.push(`by specialist: ${[...byMode].sort((a, b) => b[1] - a[1]).map(([m, n]) => `${m} ${n}`).join(', ') || '-'}`, '');
if (kinds.size) {
  lines.push('## What was flagged', '');
  for (const [k, n] of [...kinds].sort((a, b) => b[1] - a[1])) lines.push(`- ${k} ×${n}`);
  lines.push('');
  lines.push('## The replies (evidence)', '');
  for (const r of flagged.slice(-Number(arg('limit') || 40))) {
    lines.push(`- ${new Date(r.at).toISOString().slice(5, 16).replace('T', ' ')} · ${r.mode}/${r.lang} · ${Math.round(r.ms / 100) / 10} s · **${r.f.join('; ')}**`);
    lines.push(`  - them: ${one(r.userText, 160)}`);
    lines.push(`  - nexus: ${one(r.reply, 220)}`);
  }
} else lines.push('nothing flagged 🎉');
const text = lines.join('\n');
console.log(text);
if (!has('no-save')) {
  const out = join(DIR, 'reports');
  if (!existsSync(out)) mkdirSync(out, { recursive: true, mode: 0o700 });
  const f = join(out, `${new Date().toISOString().slice(0, 10)}.md`);
  writeFileSync(f, `${text}\n`, { mode: 0o600 });
  console.log(`\nsaved → ${f}`);
}
