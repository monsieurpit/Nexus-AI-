// The live regression gate (2026-10-12, Patrick + plan "reliability before features"): run it before every engine push.
//   bun run scripts/eval/gate.ts            all cases + regressions (~10-15 min), search cases skipped (quota)
//   bun run scripts/eval/gate.ts --quick    regressions + every 4th case (~4-6 min)
//   flags: --regressions (only the regression cases) --with-search --grep <re> --no-save
//
// - Real people come first: before every request it waits until the engine's queue is empty.
// - Explicit checks only (scripts/eval/grade.ts). A case that fails is re-run twice: 0/3 = a real failure, 1-2/3 =
//   flaky. Known-flaky cases (runs: N) are always sent N times. So one unlucky reply never blocks a push, and a real
//   regression never hides behind one lucky one.
// - Pass rates are saved per case (~/.nexus-eval/history.jsonl) and compared with the last run: regressed / improved /
//   still flaky. Exit code 1 when something that used to pass now fails every time, or a regression case fails 0/N.

import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { CASES, REGRESSIONS, type EvalCase } from './cases';
import { grade, ask, BASE, hardFails } from './grade';

const args = process.argv.slice(2);
const has = (f: string) => args.includes(`--${f}`);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const grepRe = arg('grep') ? new RegExp(arg('grep') as string, 'i') : null;
const DIR = join(homedir(), '.nexus-eval');
const HISTORY = join(DIR, 'history.jsonl');
const ID_BASE = 760000000000000000n;
const ROOT = fileURLToPath(new URL('../..', import.meta.url));
// Printed messages never show a slur used by the safety cases.
const show = (t: string) => t.replace(/\n/g, ' ').replace(/nig+er/gi, '[slur]');

const keyOf = (c: EvalCase) => `${c.mode}|${c.msg}${c.history?.length ? ` |after: ${c.history[c.history.length - 1].content}` : ''}`;

let pool: Array<{ c: EvalCase; regression: boolean }> = [
  ...REGRESSIONS.map((c) => ({ c, regression: true })),
  ...(has('regressions') ? [] : CASES.filter((_, i) => !has('quick') || i % 4 === 0).map((c) => ({ c, regression: false }))),
];
if (!has('with-search')) pool = pool.filter(({ c }) => c.mode !== 'search');
if (grepRe) pool = pool.filter(({ c }) => grepRe.test(c.msg));

async function waitForIdle(): Promise<void> {
  let told = false;
  for (;;) {
    const s: any = await fetch(`${BASE}/api/v1/queue/status`, { signal: AbortSignal.timeout(5000) }).then((r) => r.json()).catch(() => null);
    if (!s) throw new Error(`engine not reachable at ${BASE}`);
    if (!s.aheadOfNewRequest) return;
    if (!told) {
      process.stdout.write('   ⏸ real people are chatting — waiting…');
      told = true;
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
}

interface Result { key: string; msg: string; mode: string; regression: boolean; runs: number; pass: number; rate: number; fails: string[]; sample: string; ms: number }
const results: Result[] = [];
const soft = new Map<string, number>(); // banter etc.: shown, never a failure
let n = 0;
let idSeq = 0n;
const t0 = Date.now();

async function once(c: EvalCase): Promise<{ ok: boolean; fails: string[]; reply: string; ms: number }> {
  await waitForIdle();
  const { reply, ms, searched, routed } = await ask(c.msg, String(ID_BASE + idSeq++), c.history || []);
  const fails = grade(c, reply, searched, routed);
  return { ok: !hardFails(fails).length, fails, reply, ms };
}

console.log(`gate: ${pool.length} cases (${pool.filter((p) => p.regression).length} regressions)${has('quick') ? ', quick' : ''}${has('with-search') ? '' : ', search skipped'}\n`);
for (const { c, regression } of pool) {
  n++;
  const planned = Math.max(1, c.runs || 1);
  const runs: Array<{ ok: boolean; fails: string[]; reply: string; ms: number }> = [];
  for (let k = 0; k < planned; k++) runs.push(await once(c));
  // A single-run case that failed: twice more, to tell a real failure from bad luck.
  if (planned === 1 && !runs[0].ok) for (let k = 0; k < 2; k++) runs.push(await once(c));
  const pass = runs.filter((r) => r.ok).length;
  const rate = pass / runs.length;
  const bad = runs.find((r) => !r.ok);
  for (const r of runs) for (const f of r.fails) if (f.startsWith('~')) soft.set(f.replace(/:.*$/, ''), (soft.get(f.replace(/:.*$/, '')) || 0) + 1);
  const res: Result = { key: keyOf(c), msg: c.msg, mode: c.mode, regression, runs: runs.length, pass, rate, fails: bad?.fails || [], sample: show((bad || runs[0]).reply).slice(0, 200), ms: Math.round(runs.reduce((a, r) => a + r.ms, 0) / runs.length) };
  results.push(res);
  const icon = rate === 1 ? '✅' : rate === 0 ? '❌' : '🟡';
  console.log(`${icon} [${n}/${pool.length}] ${regression ? 'R ' : ''}(${c.mode}, ${pass}/${runs.length}, ${res.ms}ms) ${show(c.msg).slice(0, 70)}${rate < 1 ? `\n     ${res.sample}\n     ⚠ ${res.fails.join(' | ')}` : ''}`);
}

// ── compare with the last saved run ──
const prev: Record<string, { rate: number; runs: number }> = (() => {
  if (!existsSync(HISTORY)) return {};
  const lines = readFileSync(HISTORY, 'utf8').trim().split('\n').filter(Boolean);
  const merged: Record<string, { rate: number; runs: number }> = {};
  for (const l of lines) Object.assign(merged, (JSON.parse(l) as any).cases); // the newest result for each case wins
  return merged;
})();
const regressed = results.filter((r) => r.rate === 0 && prev[r.key] && prev[r.key].rate >= 0.5);
const improved = results.filter((r) => prev[r.key] && r.rate - prev[r.key].rate >= 0.5);
const flaky = results.filter((r) => r.rate > 0 && r.rate < 1);
const failing = results.filter((r) => r.rate === 0);
const regressionDead = results.filter((r) => r.regression && r.rate === 0);

const total = results.reduce((a, r) => a + r.runs, 0);
const passed = results.reduce((a, r) => a + r.pass, 0);
const byMode = new Map<string, { n: number; rate: number }>();
for (const r of results) {
  const m = byMode.get(r.mode) || { n: 0, rate: 0 };
  m.n++;
  m.rate += r.rate;
  byMode.set(r.mode, m);
}
const kinds = new Map<string, number>();
for (const r of results) if (r.rate < 1) for (const f of r.fails) kinds.set(f.replace(/[:(].*$/, '').trim(), (kinds.get(f.replace(/[:(].*$/, '').trim()) || 0) + 1);
const avgMs = Math.round(results.reduce((a, r) => a + r.ms, 0) / Math.max(1, results.length));
const commit = (() => {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim() + (execSync('git status --porcelain src server.ts', { cwd: ROOT }).toString().trim() ? '+dirty' : '');
  } catch {
    return '?';
  }
})();

console.log(`\n════ gate @ ${commit}: ${results.filter((r) => r.rate === 1).length}/${results.length} cases always pass · ${Math.round((100 * passed) / Math.max(1, total))}% of ${total} replies · avg ${avgMs}ms · ${Math.round((Date.now() - t0) / 60000)} min ════`);
for (const [m, v] of [...byMode].sort()) console.log(`  ${m.padEnd(9)} ${Math.round((100 * v.rate) / v.n)}% (${v.n})`);
if (kinds.size) console.log('  failure kinds:', [...kinds].sort((a, b) => b[1] - a[1]).map(([k, c]) => `${k} ×${c}`).join(', '));
if (soft.size) console.log('  soft notes (not failures):', [...soft].map(([k, c]) => `${k.slice(1)} ×${c}`).join(', '));
if (flaky.length) console.log(`  🟡 flaky (${flaky.length}): ${flaky.map((r) => `"${show(r.msg).slice(0, 40)}" ${r.pass}/${r.runs}`).join(' · ')}`);
if (failing.length) console.log(`  ❌ always failing (${failing.length}): ${failing.map((r) => `"${show(r.msg).slice(0, 40)}"`).join(' · ')}`);
if (Object.keys(prev).length) {
  console.log(`  vs last run: ${regressed.length} regressed, ${improved.length} improved`);
  for (const r of regressed) console.log(`    ⬇ "${show(r.msg).slice(0, 60)}" was ${Math.round(prev[r.key].rate * 100)}%, now 0%`);
  for (const r of improved) console.log(`    ⬆ "${show(r.msg).slice(0, 60)}" was ${Math.round(prev[r.key].rate * 100)}%, now ${Math.round(r.rate * 100)}%`);
}

if (!has('no-save')) {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
  appendFileSync(HISTORY, `${JSON.stringify({ at: new Date().toISOString(), commit, scope: has('regressions') ? 'regressions' : has('quick') ? 'quick' : 'full', passRate: passed / Math.max(1, total), cases: Object.fromEntries(results.map((r) => [r.key, { rate: r.rate, runs: r.runs }])) })}\n`);
  console.log(`  saved → ${HISTORY}`);
}
// Hundreds of different test prompts fill the chat model's prompt cache (it grew to ~15 GB, 2026-10-12): reload it
// so real people get a fresh, normal-sized model.
try {
  const ps: any = await fetch('http://localhost:11434/api/ps').then((r) => r.json());
  const chat = (ps.models || []).find((m: any) => /^nexus2/.test(m.name));
  if (chat && Number(chat.size) > 10 * 1024 ** 3) {
    await waitForIdle();
    await fetch('http://localhost:11434/api/generate', { method: 'POST', body: JSON.stringify({ model: chat.name, keep_alive: 0 }) });
    // Wait until it's really gone (loading it again too early cancels the unload).
    for (let k = 0; k < 20; k++) {
      const now: any = await fetch('http://localhost:11434/api/ps').then((r) => r.json());
      if (!(now.models || []).some((m: any) => m.name === chat.name)) break;
      await new Promise((r) => setTimeout(r, 1500));
    }
    await fetch('http://localhost:11434/api/generate', { method: 'POST', body: JSON.stringify({ model: chat.name, prompt: '', keep_alive: -1, options: { num_ctx: 8192 } }) });
    console.log(`  chat model was ${(Number(chat.size) / 1024 ** 3).toFixed(1)} GB after the tests — reloaded fresh`);
  }
} catch {
  // Ollama not local: nothing to tidy
}
const blocked = regressed.length > 0 || regressionDead.length > 0;
console.log(blocked ? `\n⛔ DON'T PUSH: ${regressed.length} regressed, ${regressionDead.length} regression case(s) failing every time` : '\n✅ OK to push');
process.exit(blocked ? 1 : 0);
