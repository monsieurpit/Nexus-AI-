// Runs the test bank (scripts/eval/cases.ts) against the live engine and grades every reply.
//   bun run scripts/eval/run.ts --router v1|v2 [--mode chat] [--limit 20] [--out file.json] [--no-seq]
// One request at a time (real people use the same engine). Every case uses its own user id, so the per-person
// repeat memory of one case never leaks into another; the sequences reuse one id on purpose.

import { writeFileSync } from 'fs';
import { CASES, SEQUENCES, type EvalCase, type Mode } from './cases';

const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const BASE = process.env.NEXUS_ENGINE_URL || 'http://localhost:3000';
const router = (arg('router') || 'v2') as 'v1' | 'v2';
const onlyMode = arg('mode') as Mode | undefined;
const grepRe = arg('grep') ? new RegExp(arg('grep') as string, 'i') : null; // only cases whose message matches
const skipModes = (arg('skip') || '').split(',').filter(Boolean); // e.g. --skip search (saves the daily search quota)
const limit = Number(arg('limit') || 0);
const out = arg('out') || `/tmp/nexus-eval-${router}.json`;
const runSeq = !args.includes('--no-seq');
const idBase = router === 'v1' ? 740000000000000000 : 750000000000000000;

const MODE_MAX: Record<Mode, number> = { chat: 220, question: 750, search: 750, code: 4000, writing: 1500, maths: 600, pc: 2000, support: 450 };
const MODE_MIN: Record<Mode, number> = { chat: 1, question: 40, search: 40, code: 60, writing: 10, maths: 1, pc: 120, support: 20 };

// Universal problems, any mode.
const STOCK = /don'?t (?:actually )?know that one|don'?t quote me|\bhell yeah\b|\bbuzzing\b|gonna be (?:epic|a banger|a (?:fucking )?fun)|local engine|custom engine|piece of shit code|\bi'?m (?:just )?(?:a |some )?(?:bot|code|software|program|toaster)\b|wait what 😭$|my brain just blue-screened|calculator just died/i;
const HOSTILE = /\b(?:shitbag|bellend|knobhead|muppet|prick|tosser|wanker|numpty|dumbass|moron|idiot|dumb ?fuck(?:er)?|weirdo|plonker|twat|gobshite|dickhead|cunt|loser|daft)\b/i;

export interface Graded {
  msg: string;
  mode: Mode;
  routed?: string;
  reply: string;
  ms: number;
  searched: boolean;
  fails: string[];
}

function fillerPile(reply: string): boolean {
  // "shit, ... damn, ... goddamn," — two or more bare swear interjections set off by commas.
  const m = reply.match(/(?:^|[,.;!?]\s*)(?:shit|damn|hell|goddamn|fuck|fucking hell)\s*[,!]/gi) || [];
  return m.length >= 2;
}

function capsRatio(s: string): number {
  const letters = s.replace(/```[\s\S]*?```/g, '').replace(/[^A-Za-z]/g, '');
  if (letters.length < 25) return 0;
  return letters.replace(/[^A-Z]/g, '').length / letters.length;
}

export function grade(c0: EvalCase, reply: string, searched: boolean, routed?: string): string[] {
  const fails: string[] = [];
  // A message routed to its other valid kind is graded by that kind's length rules.
  const c: EvalCase = routed && routed !== c0.mode && (c0.alt || []).includes(routed as Mode) ? { ...c0, mode: routed as Mode, maxChars: undefined } : c0;
  const r = reply.trim();
  if (!r) return ['empty'];
  const prose = r.replace(/```[\s\S]*?```/g, '');
  if (STOCK.test(prose)) fails.push(`stock line: "${prose.match(STOCK)?.[0]}"`);
  if (fillerPile(prose)) fails.push('swear-filler pile');
  if (!c.allowCaps && capsRatio(r) > 0.6) fails.push('caps meltdown');
  if (c.notHostile && HOSTILE.test(prose)) fails.push(`hostile: "${prose.match(HOSTILE)?.[0]}"`);
  const max = c.maxChars ?? MODE_MAX[c.mode];
  if (r.length > max) fails.push(`too long (${r.length} > ${max})`);
  if (r.length < MODE_MIN[c.mode]) fails.push(`too short (${r.length})`);
  if (c.mode === 'code' && !/```/.test(r)) fails.push('no code block');
  if (c.mode === 'search' && !searched) fails.push('did not search');
  for (const re of c.must || []) if (!re.test(r)) fails.push(`missing ${re}`);
  for (const re of c.mustNot || []) if (re.test(r)) fails.push(`has ${re}`);
  if (routed && routed !== c0.mode && !(c0.alt || []).includes(routed as Mode)) fails.push(`routed ${routed} (want ${c0.mode})`);
  return fails;
}

async function ask(msg: string, userId: string, history: EvalCase['history'] = []) {
  const t0 = Date.now();
  const res = await fetch(`${BASE}/api/v1/nexus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg, userId, username: 'Tester', history, routerVersion: router, evalRun: true }),
    signal: AbortSignal.timeout(180_000),
  });
  const j: any = await res.json().catch(() => ({}));
  const steps: any[] = j.thoughtSteps || [];
  const searched = Boolean(j.webSearched) || steps.some((s) => /live web search|live search/i.test(s.title || ''));
  const routed = steps.find((s) => s.id === 'step-v2-route' || /^🧭 Router/.test(s.title || ''))?.data?.mode as string | undefined;
  return { reply: String(j.response ?? j.text ?? ''), ms: Date.now() - t0, searched, routed };
}

const cases = CASES.filter((c) => (!onlyMode || c.mode === onlyMode) && !skipModes.includes(c.mode) && (!grepRe || grepRe.test(c.msg))).slice(0, limit || undefined);
const results: Graded[] = [];
let i = 0;
for (const c of cases) {
  const userId = String(idBase + CASES.indexOf(c));
  const { reply, ms, searched, routed } = await ask(c.msg, userId, c.history || []);
  const fails = grade(c, reply, searched, router === 'v2' ? routed : undefined);
  results.push({ msg: c.msg, mode: c.mode, routed, reply, ms, searched, fails });
  i++;
  console.log(`${fails.length ? '❌' : '✅'} [${i}/${cases.length}] (${c.mode}${routed && routed !== c.mode ? `→${routed}` : ''}, ${ms}ms) ${c.msg.slice(0, 60)}\n     ${reply.replace(/\n/g, ' ⏎ ').slice(0, 220)}${fails.length ? `\n     ⚠ ${fails.join(' | ')}` : ''}`);
}

// Repeat loops: the same person sends 4 messages in a row, each as a reply to Nexus.
const seqResults: Array<{ name: string; replies: string[]; repeats: number }> = [];
if (runSeq && !onlyMode && !limit && !grepRe) {
  const { isRepeat } = await import('../../src/ai-engine/rules/messageMode');
  for (const [si, seq] of SEQUENCES.entries()) {
    const userId = String(idBase + 900000 + si);
    const history: NonNullable<EvalCase['history']> = [];
    const replies: string[] = [];
    let repeats = 0;
    for (const m of seq.msgs) {
      const { reply } = await ask(m, userId, history.slice(-8));
      if (isRepeat(reply, replies)) repeats++;
      replies.push(reply);
      history.push({ role: 'user', content: m }, { role: 'assistant', content: reply });
    }
    seqResults.push({ name: seq.name, replies, repeats });
    console.log(`${repeats ? '❌' : '✅'} sequence "${seq.name}": ${repeats} repeat(s)\n     ${replies.map((r) => r.slice(0, 80)).join('\n     ')}`);
  }
}

// Summary per mode.
const byMode = new Map<string, { n: number; ok: number }>();
for (const r of results) {
  const m = byMode.get(r.mode) || { n: 0, ok: 0 };
  m.n++;
  if (!r.fails.length) m.ok++;
  byMode.set(r.mode, m);
}
const ok = results.filter((r) => !r.fails.length).length;
const failKinds = new Map<string, number>();
for (const r of results) for (const f of r.fails) failKinds.set(f.replace(/[:(].*$/, '').trim(), (failKinds.get(f.replace(/[:(].*$/, '').trim()) || 0) + 1);
const avgMs = Math.round(results.reduce((a, r) => a + r.ms, 0) / Math.max(1, results.length));
console.log(`\n==== router ${router}: ${ok}/${results.length} cases pass (${Math.round((100 * ok) / Math.max(1, results.length))}%), avg ${avgMs}ms ====`);
for (const [m, v] of byMode) console.log(`  ${m.padEnd(9)} ${v.ok}/${v.n}`);
console.log('  failure kinds:', [...failKinds].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ×${n}`).join(', '));
if (seqResults.length) console.log(`  repeat loops: ${seqResults.reduce((a, s) => a + s.repeats, 0)} repeat(s) over ${seqResults.length} sequences`);
writeFileSync(out, JSON.stringify({ router, at: new Date().toISOString(), results, seqResults }, null, 2));
console.log(`  saved ${out}`);
