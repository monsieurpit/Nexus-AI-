// Nexus Observatory in the terminal (same data as the dashboard at /observatory on the website).
//   bun run scripts/observatory.ts                 summary of the last 24 h (alerts, latency, routing, tools, memory, RAM)
//   bun run scripts/observatory.ts --window 1h     1h | 6h | 24h | 7d
//   bun run scripts/observatory.ts --eval          include the test runs (eval scripts)
//   bun run scripts/observatory.ts trace <id>      one request, from the router to the final answer
//   bun run scripts/observatory.ts traces          the last requests with their trace IDs
//   bun run scripts/observatory.ts check           look for regressions now
//   bun run scripts/observatory.ts open            open the dashboard in the browser
//   bun run scripts/observatory.ts --json          raw JSON (pipe into jq)
// Also: `pat obs …` (same arguments). Uses the admin token in ~/.nexus-learning/admin-token.

import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const BASE = process.env.NEXUS_ENGINE_URL || 'http://127.0.0.1:3000';
const args = process.argv.slice(2);
const flag = (f: string) => args.includes(`--${f}`);
const opt = (f: string) => (args.includes(`--${f}`) ? args[args.indexOf(`--${f}`) + 1] : undefined);
const positional = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1] === '--window'));
const [cmd = 'summary', arg] = positional;

let token = '';
try {
  token = readFileSync(join(homedir(), '.nexus-learning', 'admin-token'), 'utf8').trim();
} catch {
  console.error('No admin token at ~/.nexus-learning/admin-token (the engine creates it on start).');
  process.exit(1);
}

const tty = process.stdout.isTTY;
const c = (code: number) => (s: unknown) => (tty ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const dim = c(2), bold = c(1), red = c(31), green = c(32), yellow = c(33), cyan = c(36);
const sec = (ms: number | null | undefined) => (ms == null ? '—' : ms >= 10000 ? `${(ms / 1000).toFixed(0)}s` : `${(ms / 1000).toFixed(1)}s`);
const ago = (t: number) => {
  const s = (Date.now() - t) / 1000;
  return s < 60 ? `${Math.round(s)}s ago` : s < 3600 ? `${Math.round(s / 60)}m ago` : s < 86400 ? `${Math.round(s / 3600)}h ago` : `${Math.round(s / 86400)}d ago`;
};
const pad = (s: unknown, n: number) => String(s ?? '').slice(0, n).padEnd(n);
const lpad = (s: unknown, n: number) => String(s ?? '').padStart(n);
const outcomeColor = (o: string) => (o === 'ok' ? green(o) : o === 'failed' || o === 'error' ? red(o) : o === 'fallback' ? yellow(o) : o);

async function api(path: string, method = 'GET') {
  const r = await fetch(`${BASE}${path}`, { method, headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(15000) }).catch(() => null);
  if (!r) {
    console.error(`Engine not reachable at ${BASE}.`);
    process.exit(1);
  }
  const j: any = await r.json().catch(() => ({}));
  if (!r.ok) {
    console.error(j.error || r.statusText);
    process.exit(1);
  }
  return j;
}

if (cmd === 'open') {
  const url = `${BASE}/api/v1/observatory`;
  spawn('open', [url], { stdio: 'ignore', detached: true }).unref();
  console.log(`Opening ${url} (token: cat ~/.nexus-learning/admin-token). On the website: /observatory`);
} else if (cmd === 'trace') {
  if (!arg) {
    console.error('usage: trace <trace ID>');
    process.exit(1);
  }
  const t = await api(`/api/v1/observatory/trace/${encodeURIComponent(arg)}`);
  if (flag('json')) {
    console.log(JSON.stringify(t, null, 2));
    process.exit(0);
  }
  console.log(`${bold(t.id)}  ${dim(new Date(t.ts).toLocaleString())}  ${t.platform || ''}${t.eval ? dim(' (test run)') : ''}`);
  console.log(`specialist ${bold(t.mode)} · routed by ${t.by || '—'}${t.conf != null ? ` (${Math.round(t.conf * 100)}%)` : ''}${t.guarded ? yellow(' · first guess overruled') : ''} · ${outcomeColor(t.outcome)}${t.fallback ? ` (${t.fallback})` : ''} · ${t.retries} retr${t.retries === 1 ? 'y' : 'ies'}`);
  console.log(`queue ${sec(t.wait_ms)} → before router ${sec(t.pre_ms)} → router ${sec(t.route_ms)} → context ${sec(t.build_ms)} → reply ${sec(t.gen_ms)} → checks ${sec(t.after_ms)} = ${bold(sec(t.total_ms))}`);
  console.log(dim('\nsteps (redacted):'));
  for (const s of t.steps) console.log(`  ${dim(pad(s.t, 12))} ${s.title}${s.ms != null ? dim(`  ${sec(s.ms)}`) : ''}`);
} else if (cmd === 'check') {
  const r = await api('/api/v1/observatory/check', 'POST');
  if (!r.findings.length) console.log(green('No regressions: the last 2 h of real traffic look like the 7 days before.'));
  for (const f of r.findings) console.log(`${f.severity === 'high' ? red('HIGH') : yellow('MED ')} ${f.message}`);
} else {
  const d = await api(`/api/v1/observatory/data?window=${opt('window') || '24h'}${flag('eval') ? '&eval=1' : ''}`);
  if (flag('json')) {
    console.log(JSON.stringify(d, null, 2));
    process.exit(0);
  }
  if (cmd === 'traces') {
    for (const t of d.traces) console.log(`${cyan(pad(t.id, 22))} ${pad(ago(t.ts), 8)} ${pad(t.mode, 9)} ${pad(outcomeColor(t.outcome), tty ? 18 : 9)} ${lpad(sec(t.totalMs), 6)}${t.eval ? dim(' test') : ''}`);
    process.exit(0);
  }
  const h = (s: string) => console.log(`\n${bold(s)}`);
  console.log(`${bold('Nexus Observatory')} ${dim(`· last ${opt('window') || '24h'} · ${d.traffic.requests} requests${d.traffic.evalRequests && !d.includeEval ? ` (+${d.traffic.evalRequests} test runs hidden, --eval)` : ''}`)}`);
  if (d.alerts.open.length) for (const a of d.alerts.open) console.log(`${a.severity === 'high' ? red('▲ REGRESSION') : yellow('▲ regression')} ${a.message} ${dim(`(since ${ago(a.first_seen)})`)}`);
  else console.log(green('✓ no regressions detected'));

  const o = d.latency.overall;
  h(`Latency  median ${sec(o.p50)} · p95 ${sec(o.p95)}`);
  console.log(dim(`  ${pad('specialist', 10)} ${lpad('n', 5)} ${lpad('p50', 6)} ${lpad('p95', 6)}  ${lpad('pre', 5)} ${lpad('route', 6)} ${lpad('ctx', 5)} ${lpad('reply', 6)} ${lpad('checks', 6)}  fails fb`));
  for (const m of d.latency.byMode) console.log(`  ${pad(m.mode, 10)} ${lpad(m.n, 5)} ${lpad(sec(m.p50), 6)} ${lpad(sec(m.p95), 6)}  ${lpad(sec(m.pre), 5)} ${lpad(sec(m.route), 6)} ${lpad(sec(m.context), 5)} ${lpad(sec(m.generate), 6)} ${lpad(sec(m.checks), 6)}  ${m.failures ? red(lpad(m.failures, 5)) : lpad(0, 5)} ${m.fallbacks ? yellow(m.fallbacks) : 0}`);

  const r = d.routing;
  h('Routing');
  console.log(`  ${r.mix.map((x: any) => `${x.mode} ${x.n}`).join(' · ')}`);
  console.log(`  by ${r.by.map((x: any) => `${x.by} ${x.n}`).join(' · ')} · low confidence ${r.lowConfidence} · first guess overruled ${r.guarded} · retries ${r.retries}`);
  console.log(`  outcomes ${r.outcomes.map((x: any) => `${outcomeColor(x.outcome)} ${x.n}`).join(' · ')}${r.fallbacks.length ? ` · fallbacks ${r.fallbacks.map((f: any) => `${f.fallback} ×${f.n}`).join(', ')}` : ''}`);

  h('Tools');
  if (!d.tools.length) console.log(dim('  no tool calls'));
  for (const t of d.tools) console.log(`  ${pad(t.tool, 20)} ${lpad(t.calls, 4)} calls  ${green(lpad(t.ok, 4))} ok  ${lpad(t.empty, 3)} empty  ${t.fail ? red(lpad(t.fail, 3)) : lpad(0, 3)} fail  p50 ${sec(t.p50)}${t.lastError ? dim(`  last error: ${t.lastError}`) : ''}`);

  h('Verification');
  if (!d.verification.length) console.log(dim('  no checks ran'));
  for (const v of d.verification.slice(0, 8)) console.log(`  ${pad(v.name, 40)} ${green(lpad(v.pass, 4))} passed ${v.fail ? red(lpad(v.fail, 4)) : lpad(0, 4)} failed`);

  const m = d.memory;
  h('Memory');
  console.log(`  accepted ${m.accepted} · rejected ${m.rejected}${m.acceptanceRate != null ? ` (${Math.round(m.acceptanceRate * 100)}% accepted)` : ''} · corrected ${m.corrected} · deleted ${m.deleted} · expired ${m.expired}`);
  const reasons = m.byReason.filter((x: any) => x.kind !== 'accepted').slice(0, 5);
  if (reasons.length) console.log(dim(`  ${reasons.map((x: any) => `${x.kind}: ${x.reason} ×${x.n}`).join(' · ')}`));

  h('Models & memory pressure');
  for (const x of d.llm.byModel) console.log(`  ${pad(x.model, 22)} ${lpad(x.calls, 5)} calls  ${lpad(x.prompt || 0, 8)} in  ${lpad(x.output || 0, 7)} out  avg ${sec(x.ms)}  loads ${x.loads > 3 ? yellow(x.loads) : x.loads}  errors ${x.errors ? red(x.errors) : 0}`);
  const s = d.system.latest;
  if (s) {
    console.log(`  RAM free ${s.freePct < 15 ? red(`${s.freePct}%`) : `${s.freePct}%`} · swap ${Math.round(s.swapMb || 0)} MB · engine ${Math.round(s.rssMb || 0)} MB`);
    for (const x of s.models) console.log(dim(`  loaded: ${x.name} ${x.gb} GB (VRAM ${x.vramGb} GB)`));
  }
  for (const e of d.system.events.slice(0, 4)) console.log(dim(`  ${ago(e.ts)} · ${e.kind.replace('_', ' ')} ${e.detail}`));

  h('Quality');
  console.log(`  live reply checks: ${d.quality.flagged}/${d.quality.logged} flagged${d.quality.flags.length ? ` (${d.quality.flags.slice(0, 4).map((f: any) => `${f.flag} ×${f.n}`).join(', ')})` : ''}`);
  const g = d.gate[d.gate.length - 1];
  if (g) console.log(`  last eval gate: ${g.passPct}% on ${g.cases} cases, ${g.regressed ? red(`${g.regressed} regressed`) : green('0 regressed')} ${dim(`(${g.sha}, ${ago(g.at)})`)}`);

  if (d.failures.length) {
    h('Recent failures');
    for (const t of d.failures.slice(0, 8)) console.log(`  ${cyan(pad(t.id, 22))} ${pad(ago(t.ts), 8)} ${pad(t.mode, 9)} ${outcomeColor(t.outcome)}${t.fallback ? ` ${t.fallback}` : ''}`);
    console.log(dim('  → bun run scripts/observatory.ts trace <id>'));
  }
  console.log(dim(`\nDashboard: ${BASE}/api/v1/observatory  ·  website: /observatory`));
}
