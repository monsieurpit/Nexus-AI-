// Nexus Observatory (2026-10-13, Patrick: "a private developer dashboard showing what the system is actually doing —
// and identify regressions automatically instead of waiting for someone to complain in Discord").
//
// What's kept (SQLite, ~/.nexus-observatory/obs.db, mode 600) — numbers and redacted labels only:
//   traces    one row per request: trace ID, specialist, how it was routed + confidence, stage timings, outcome
//             (ok / fallback / clarify / multi / failed / error), retries, and the step TITLES with anything quoted,
//             any link, number or email blanked. Never the message, the reply, a user ID or a search query. 7 days.
//   tools     each tool call (web search, Python sandbox, browser, video, vision, compile checks): ok / empty / fail,
//             time, a redacted error. 30 days.
//   llm       each model call: model, prompt + output tokens, time, load time (a model load), ok or why not. 30 days.
//   memory    memory events: accepted / rejected (by reason) / corrected / deleted (by reason) / expired. 30 days.
//   samples   every minute: free RAM %, swap, engine RSS, what Ollama has loaded (RAM and VRAM). 7 days.
//   events    model reloads and unloads. 30 days.
//   alerts    regressions found automatically (the last 2 hours compared with the 7 days before).
// Nothing is recorded until the engine calls startObservatory(): scripts and tests importing these modules write nothing.

import { Database } from 'bun:sqlite';
import { execFile } from 'child_process';
import { chmodSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { randomBytes } from 'crypto';

const DIR = process.env.NEXUS_OBSERVATORY_DIR || join(homedir(), '.nexus-observatory');
const FILE = join(DIR, 'obs.db');
const HOUR = 3600_000;
const DAY = 24 * HOUR;
let db: Database | null = null;
let enabled = false;

let FILE_OVERRIDE: string | null = null;
function open(): Database {
  if (db) return db;
  if (!FILE_OVERRIDE && !existsSync(DIR)) mkdirSync(DIR, { recursive: true, mode: 0o700 });
  db = new Database(FILE_OVERRIDE || FILE);
  db.exec('PRAGMA journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS traces (id TEXT PRIMARY KEY, ts INTEGER, mode TEXT, by TEXT, conf REAL, guarded INTEGER, route_ms INTEGER, build_ms INTEGER, gen_ms INTEGER, after_ms INTEGER, pre_ms INTEGER, wait_ms INTEGER, total_ms INTEGER, outcome TEXT, fallback TEXT, retries INTEGER, eval INTEGER, platform TEXT, steps TEXT);
    CREATE INDEX IF NOT EXISTS idx_traces_ts ON traces(ts);
    CREATE TABLE IF NOT EXISTS tools (ts INTEGER, tool TEXT, outcome TEXT, ms INTEGER, err TEXT);
    CREATE INDEX IF NOT EXISTS idx_tools_ts ON tools(ts);
    CREATE TABLE IF NOT EXISTS verify (ts INTEGER, trace TEXT, name TEXT, ok INTEGER);
    CREATE INDEX IF NOT EXISTS idx_verify_ts ON verify(ts);
    CREATE TABLE IF NOT EXISTS llm (ts INTEGER, model TEXT, prompt_tok INTEGER, eval_tok INTEGER, ms INTEGER, load_ms INTEGER, ok INTEGER, reason TEXT);
    CREATE INDEX IF NOT EXISTS idx_llm_ts ON llm(ts);
    CREATE TABLE IF NOT EXISTS memory (ts INTEGER, kind TEXT, reason TEXT, n INTEGER);
    CREATE INDEX IF NOT EXISTS idx_memory_ts ON memory(ts);
    CREATE TABLE IF NOT EXISTS samples (ts INTEGER, free_pct REAL, swap_mb REAL, rss_mb REAL, models TEXT);
    CREATE INDEX IF NOT EXISTS idx_samples_ts ON samples(ts);
    CREATE TABLE IF NOT EXISTS events (ts INTEGER, kind TEXT, detail TEXT);
    CREATE TABLE IF NOT EXISTS alerts (key TEXT PRIMARY KEY, severity TEXT, message TEXT, first_seen INTEGER, last_seen INTEGER, resolved_at INTEGER);
  `);
  try {
    chmodSync(FILE_OVERRIDE || FILE, 0o600);
  } catch {
    // best effort
  }
  return db;
}

// Observability never breaks a reply: every write is fire-and-forget.
function write(sql: string, ...args: any[]): void {
  if (!enabled) return;
  try {
    open().query(sql).run(...args);
  } catch (e) {
    console.warn('[observatory] write failed:', (e as Error).message);
  }
}

// ---- redaction ------------------------------------------------------------------------------------
// Step titles can hold what someone typed ("🌐 Live web search: "bitcoin price""): quoted text, links, emails and
// long numbers (IDs) are blanked, so a trace shows WHAT happened, never what was said.
export function redact(s: string, max = 100): string {
  return String(s || '')
    .replace(/https?:\/\/\S+/gi, '‹link›')
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '‹email›')
    .replace(/(["“”«])(?:(?!\1)[^"“”«»\n]){1,300}(["“”»])/g, '“…”')
    .replace(/<@!?\d+>/g, '‹user›')
    .replace(/\b\d{5,}\b/g, '#')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

// ---- trace IDs and requests -----------------------------------------------------------------------------
export function newTraceId(): string {
  return `nx-${Date.now().toString(36)}-${randomBytes(3).toString('hex')}`;
}

const FAILED_REPLY_RE = /brain glitched|mon cerveau a planté|mózg mi się zawiesił/i;

interface Step { id?: string; type?: string; title?: string; description?: string; data?: any; durationMs?: number }

// One finished request, read from its own thought steps (they already say which specialist answered, how it was
// routed, every retry, fallback and check).
export function recordTrace(t: { traceId: string; steps: Step[]; totalMs: number; waitMs?: number; response?: unknown; eval?: boolean; platform?: string; error?: string }): void {
  if (!enabled) return;
  try {
    const steps = t.steps || [];
    const route = steps.find((s) => s.id === 'step-v2-route' || /^🧭 Router/.test(s.title || ''));
    const timings = steps.filter((s) => s.id === 'step-v2-timing' || s.title === '⏱️ v2 timings').map((s) => s.data || {});
    const sum = (k: string) => (timings.length ? timings.reduce((a, d) => a + (Number(d[k]) || 0), 0) : null);
    const pre = steps.find((s) => s.title === '⏱️ Before the router')?.durationMs ?? null;
    const reason = String(route?.description || '');
    const guarded = /;\s*(?:no\s+\w+(?:\s+\w+)?(?:\s+word)?|tech help|close vote|nothing current)[^;]*$/i.test(reason) ? 1 : 0;
    const retryStep = steps.find((s) => s.id === 'step-v2-retry');
    const fallback = retryStep ? (String(retryStep.title || '').match(/(\w+) failed → (\w+)/)?.slice(1).join('→') || 'retry') : null;
    const has = (id: string) => steps.some((s) => s.id === id);
    const outcome = t.error || has('step-v2-error') && !route
      ? 'error'
      : typeof t.response === 'string' && FAILED_REPLY_RE.test(t.response)
        ? 'failed'
        : has('step-v2-clarify')
          ? 'clarify'
          : has('step-v2-multi')
            ? 'multi'
            : fallback
              ? 'fallback'
              : 'ok';
    const retries = steps.filter((s) => /🔁|\bretr(?:y|ied)\b|\bredone\b|\bone more try\b/i.test(`${s.title || ''}`)).length;
    const mode = route?.data?.mode || (has('step-v2-clarify') ? 'chat' : 'direct');
    const redSteps = steps.slice(0, 60).map((s) => ({ t: s.type || '', title: redact(s.title || ''), ms: typeof s.durationMs === 'number' ? s.durationMs : undefined }));
    const now = Date.now();
    write(
      'INSERT OR REPLACE INTO traces (id, ts, mode, by, conf, guarded, route_ms, build_ms, gen_ms, after_ms, pre_ms, wait_ms, total_ms, outcome, fallback, retries, eval, platform, steps) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      t.traceId, now, mode, route?.data?.by || (has('step-v2-clarify') ? 'orchestrator' : null), typeof route?.data?.confidence === 'number' ? route.data.confidence : null, guarded,
      sum('route'), sum('build'), sum('generate'), sum('after'), pre, t.waitMs ?? null, Math.round(t.totalMs || 0), outcome, fallback, retries, t.eval ? 1 : 0, t.platform || null, JSON.stringify(redSteps)
    );
    // Factual / code verification: every check step, passed (✅) or failed (❌ ⚠️ 🛑).
    for (const s of steps) {
      if (s.type !== 'verification') continue;
      const title = String(s.title || '');
      const ok = /^✅/.test(title) ? 1 : /^(?:❌|⚠️|🛑)/.test(title) ? 0 : null;
      if (ok === null) continue;
      const name = redact(title.replace(/^\S+\s*/, '').replace(/\s+\d+(?:\s*\/\s*\d+)?\b/g, ' ').replace(/:.*$/, ''), 60).toLowerCase();
      write('INSERT INTO verify (ts, trace, name, ok) VALUES (?, ?, ?, ?)', now, t.traceId, name, ok);
    }
  } catch (e) {
    console.warn('[observatory] trace failed:', (e as Error).message);
  }
}

// ---- tools, model calls, memory, events --------------------------------------------------------------------
export type ToolOutcome = 'ok' | 'empty' | 'fail';
export async function observeTool<T>(tool: string, fn: () => Promise<T>, judge?: (r: T) => ToolOutcome | { outcome: ToolOutcome; err?: string }): Promise<T> {
  if (!enabled) return fn();
  const t0 = Date.now();
  try {
    const r = await fn();
    const j = judge ? judge(r) : 'ok';
    const { outcome, err } = typeof j === 'string' ? { outcome: j, err: undefined } : j;
    write('INSERT INTO tools (ts, tool, outcome, ms, err) VALUES (?, ?, ?, ?, ?)', Date.now(), tool, outcome, Date.now() - t0, err ? redact(err, 160) : null);
    return r;
  } catch (e) {
    write('INSERT INTO tools (ts, tool, outcome, ms, err) VALUES (?, ?, ?, ?, ?)', Date.now(), tool, 'fail', Date.now() - t0, redact((e as Error)?.message || String(e), 160));
    throw e;
  }
}

export function recordLlm(r: { model: string; promptTokens?: number; evalTokens?: number; ms?: number; loadMs?: number; ok: boolean; reason?: string }): void {
  write('INSERT INTO llm (ts, model, prompt_tok, eval_tok, ms, load_ms, ok, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', Date.now(), r.model || '?', r.promptTokens ?? null, r.evalTokens ?? null, r.ms ?? null, r.loadMs ?? null, r.ok ? 1 : 0, r.reason ? redact(r.reason, 80) : null);
}

export type MemoryKind = 'accepted' | 'rejected' | 'corrected' | 'deleted' | 'expired';
export function recordMemory(kind: MemoryKind, reason = '', n = 1): void {
  if (n > 0) write('INSERT INTO memory (ts, kind, reason, n) VALUES (?, ?, ?, ?)', Date.now(), kind, reason, n);
}

export function recordEvent(kind: string, detail = ''): void {
  write('INSERT INTO events (ts, kind, detail) VALUES (?, ?, ?)', Date.now(), kind, redact(detail, 160));
}

// ---- system sampler -------------------------------------------------------------------------------------
const sh = (cmd: string, args: string[]) => new Promise<string>((res) => execFile(cmd, args, { timeout: 4000 }, (_e, out) => res(String(out || ''))));
async function sample(): Promise<void> {
  try {
    const level = Number((await sh('/usr/sbin/sysctl', ['-n', 'kern.memorystatus_level'])).trim());
    const swap = (await sh('/usr/sbin/sysctl', ['-n', 'vm.swapusage'])).match(/used\s*=\s*([\d.]+)M/)?.[1];
    const base = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const ps: any = await fetch(`${base}/api/ps`, { signal: AbortSignal.timeout(3000) }).then((r) => r.json()).catch(() => null);
    const models: Array<{ name: string; gb: number; vramGb: number }> = (ps?.models || []).map((m: any) => ({ name: String(m.name || m.model), gb: +(Number(m.size || 0) / 1024 ** 3).toFixed(2), vramGb: +(Number(m.size_vram || 0) / 1024 ** 3).toFixed(2) }));
    write('INSERT INTO samples (ts, free_pct, swap_mb, rss_mb, models) VALUES (?, ?, ?, ?, ?)', Date.now(), Number.isFinite(level) ? level : null, swap ? Number(swap) : null, +(process.memoryUsage().rss / 1024 ** 2).toFixed(0), JSON.stringify(models));
    // A model appearing / disappearing between two samples = a load / an unload.
    const names: string = models.map((m) => m.name).sort().join(',');
    if (lastModels !== null && names !== lastModels) {
      const before = new Set(lastModels.split(',').filter(Boolean));
      const after = new Set(names.split(',').filter(Boolean));
      for (const n of after) if (!before.has(n)) recordEvent('model_loaded', n);
      for (const n of before) if (!after.has(n)) recordEvent('model_unloaded', n);
    }
    lastModels = names;
  } catch {
    // next minute
  }
}
let lastModels: string | null = null;

function cleanup(): void {
  const now = Date.now();
  for (const [table, keep] of [['traces', 7 * DAY], ['samples', 7 * DAY], ['tools', 30 * DAY], ['verify', 30 * DAY], ['llm', 30 * DAY], ['memory', 30 * DAY], ['events', 30 * DAY]] as const) write(`DELETE FROM ${table} WHERE ts < ?`, now - keep);
  write('DELETE FROM alerts WHERE resolved_at IS NOT NULL AND resolved_at < ?', now - 30 * DAY);
}

// ---- reading ---------------------------------------------------------------------------------------------
const q = <T = any>(sql: string, ...args: any[]): T[] => open().query(sql).all(...args) as T[];
const pct = (xs: number[], p: number) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
};
const avg = (xs: Array<number | null>) => {
  const v = xs.filter((x): x is number => typeof x === 'number');
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null;
};

function latencyStats(rows: Array<{ total_ms: number }>) {
  const xs = rows.map((r) => r.total_ms);
  return { n: xs.length, p50: pct(xs, 50), p95: pct(xs, 95) };
}

// Reply quality flags from the reply log (memory/replyLog.ts, 24 h): counts only, never the text.
function replyFlags(since: number): { logged: number; flagged: number; flags: Array<{ flag: string; n: number }> } {
  try {
    const f = join(homedir(), '.nexus-replylog', 'replies.db');
    if (!existsSync(f)) return { logged: 0, flagged: 0, flags: [] };
    const rdb = new Database(f, { readonly: true });
    const rows = rdb.query('SELECT flags FROM replies WHERE at >= ?').all(since) as Array<{ flags: string }>;
    rdb.close();
    const counts = new Map<string, number>();
    let flagged = 0;
    for (const r of rows) {
      const list: any[] = JSON.parse(r.flags || '[]');
      if (list.length) flagged++;
      for (const x of list) {
        const k = String(typeof x === 'string' ? x : x?.id || x?.flag || x?.kind || 'flag').split(':')[0].trim().slice(0, 40);
        counts.set(k, (counts.get(k) || 0) + 1);
      }
    }
    return { logged: rows.length, flagged, flags: [...counts].map(([flag, n]) => ({ flag, n })).sort((a, b) => b.n - a.n) };
  } catch {
    return { logged: 0, flagged: 0, flags: [] };
  }
}

// The live regression gate's last runs (scripts/eval/gate.ts → ~/.nexus-eval/history.jsonl: one line per run with the
// pass rate of every case). "Regressed" = a case at 0 % that passed at least half the time in the run before.
function gateRuns(): Array<{ at: number; sha: string; scope: string; passPct: number | null; cases: number; regressed: number }> {
  try {
    const f = join(homedir(), '.nexus-eval', 'history.jsonl');
    if (!existsSync(f)) return [];
    const runs: any[] = readFileSync(f, 'utf8').trim().split('\n').slice(-13).map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    }).filter(Boolean);
    return runs.slice(1).map((r, i) => {
      const prev = runs[i]?.cases || {};
      const cases = r.cases || {};
      const regressed = Object.entries(cases).filter(([k, v]: [string, any]) => v?.rate === 0 && prev[k] && prev[k].rate >= 0.5).length;
      return { at: Number(new Date(r.at)) || 0, sha: String(r.commit || '').slice(0, 14), scope: String(r.scope || ''), passPct: typeof r.passRate === 'number' ? Math.round(r.passRate * 1000) / 10 : null, cases: Object.keys(cases).length, regressed };
    });
  } catch {
    return [];
  }
}

export function observatoryData(windowMs = DAY, includeEval = false) {
  const now = Date.now();
  const since = now - windowMs;
  const evalSql = includeEval ? '' : ' AND eval = 0';
  const traces = q<any>(`SELECT id, ts, mode, by, conf, guarded, route_ms, build_ms, gen_ms, after_ms, pre_ms, wait_ms, total_ms, outcome, fallback, retries, eval FROM traces WHERE ts >= ?${evalSql} ORDER BY ts DESC`, since);
  const modes = [...new Set(traces.map((t) => t.mode))];
  const byMode = modes.map((mode) => {
    const rows = traces.filter((t) => t.mode === mode);
    return { mode, ...latencyStats(rows), route: avg(rows.map((r) => r.route_ms)), context: avg(rows.map((r) => r.build_ms)), generate: avg(rows.map((r) => r.gen_ms)), checks: avg(rows.map((r) => r.after_ms)), pre: avg(rows.map((r) => r.pre_ms)), wait: avg(rows.map((r) => r.wait_ms)), failures: rows.filter((r) => r.outcome === 'failed' || r.outcome === 'error').length, fallbacks: rows.filter((r) => r.fallback).length };
  }).sort((a, b) => b.n - a.n);
  const bucket = windowMs <= 6 * HOUR ? 15 * 60_000 : windowMs <= 2 * DAY ? HOUR : 6 * HOUR;
  const series = (rows: any[], f: (rs: any[]) => any) => {
    const m = new Map<number, any[]>();
    for (const r of rows) {
      const b = Math.floor(r.ts / bucket) * bucket;
      m.set(b, [...(m.get(b) || []), r]);
    }
    return [...m].sort((a, b) => a[0] - b[0]).map(([t, rs]) => ({ t, ...f(rs) }));
  };
  const count = <K extends string>(rows: any[], key: K) => {
    const m = new Map<string, number>();
    for (const r of rows) m.set(String(r[key] ?? '—'), (m.get(String(r[key] ?? '—')) || 0) + 1);
    return [...m].map(([k, n]) => ({ [key]: k, n })).sort((a: any, b: any) => b.n - a.n);
  };

  const tools = q<any>('SELECT tool, outcome, ms, err, ts FROM tools WHERE ts >= ? ORDER BY ts DESC', since);
  const toolStats = [...new Set(tools.map((t) => t.tool))].map((tool) => {
    const rs = tools.filter((t) => t.tool === tool);
    return { tool, calls: rs.length, ok: rs.filter((r) => r.outcome === 'ok').length, empty: rs.filter((r) => r.outcome === 'empty').length, fail: rs.filter((r) => r.outcome === 'fail').length, p50: pct(rs.map((r) => r.ms), 50), lastError: rs.find((r) => r.err)?.err || null };
  }).sort((a, b) => b.calls - a.calls);

  const verify = q<any>('SELECT name, SUM(ok) AS pass, SUM(1 - ok) AS fail FROM verify WHERE ts >= ? GROUP BY name ORDER BY (SUM(1 - ok) * 1.0 / COUNT(*)) DESC, COUNT(*) DESC LIMIT 25', since);

  const llm = q<any>('SELECT model, COUNT(*) AS calls, SUM(prompt_tok) AS prompt, SUM(eval_tok) AS output, AVG(ms) AS ms, SUM(CASE WHEN load_ms > 1500 THEN 1 ELSE 0 END) AS loads, SUM(1 - ok) AS errors FROM llm WHERE ts >= ? GROUP BY model ORDER BY calls DESC', since);
  const llmErrors = q<any>('SELECT reason, COUNT(*) AS n FROM llm WHERE ts >= ? AND ok = 0 GROUP BY reason ORDER BY n DESC LIMIT 8', since);
  const tokenSeries = series(q<any>('SELECT ts, prompt_tok, eval_tok FROM llm WHERE ts >= ?', since), (rs) => ({ prompt: rs.reduce((a, r) => a + (r.prompt_tok || 0), 0), output: rs.reduce((a, r) => a + (r.eval_tok || 0), 0) }));

  const mem = q<any>('SELECT kind, reason, SUM(n) AS n FROM memory WHERE ts >= ? GROUP BY kind, reason ORDER BY n DESC', since);
  const memSum = (k: string) => mem.filter((m) => m.kind === k).reduce((a, m) => a + m.n, 0);
  const accepted = memSum('accepted');
  const rejected = memSum('rejected');

  const samples = q<any>('SELECT ts, free_pct, swap_mb, rss_mb, models FROM samples WHERE ts >= ? ORDER BY ts', since);
  const latest = samples[samples.length - 1];
  const step = Math.max(1, Math.ceil(samples.length / 240));
  const events = q<any>('SELECT ts, kind, detail FROM events WHERE ts >= ? ORDER BY ts DESC LIMIT 40', since);

  return {
    generatedAt: now,
    windowMs,
    includeEval,
    traffic: { requests: traces.length, evalRequests: includeEval ? traces.filter((t) => t.eval).length : Number(q<any>('SELECT COUNT(*) AS n FROM traces WHERE ts >= ? AND eval = 1', since)[0]?.n || 0) },
    latency: {
      overall: latencyStats(traces),
      byMode,
      series: series(traces, (rs) => ({ ...latencyStats(rs) })),
    },
    routing: {
      mix: count(traces, 'mode'),
      by: count(traces, 'by'),
      outcomes: count(traces, 'outcome'),
      lowConfidence: traces.filter((t) => typeof t.conf === 'number' && t.conf < 0.3 && t.by !== 'rule').length,
      guarded: traces.filter((t) => t.guarded).length,
      fallbacks: count(traces.filter((t) => t.fallback), 'fallback'),
      retries: traces.reduce((a, t) => a + (t.retries || 0), 0),
    },
    failures: traces.filter((t) => t.outcome === 'failed' || t.outcome === 'error' || t.outcome === 'fallback').slice(0, 25).map((t) => ({ id: t.id, ts: t.ts, mode: t.mode, outcome: t.outcome, fallback: t.fallback, totalMs: t.total_ms })),
    memory: { accepted, rejected, corrected: memSum('corrected'), deleted: memSum('deleted'), expired: memSum('expired'), acceptanceRate: accepted + rejected ? +(accepted / (accepted + rejected)).toFixed(3) : null, byReason: mem },
    llm: { byModel: llm.map((m) => ({ ...m, ms: m.ms ? Math.round(m.ms) : null })), errors: llmErrors, tokenSeries },
    system: {
      latest: latest ? { ts: latest.ts, freePct: latest.free_pct, swapMb: latest.swap_mb, rssMb: latest.rss_mb, models: JSON.parse(latest.models || '[]') } : null,
      series: samples.filter((_, i) => i % step === 0).map((s) => ({ t: s.ts, freePct: s.free_pct, swapMb: s.swap_mb, modelsGb: +JSON.parse(s.models || '[]').reduce((a: number, m: any) => a + m.gb, 0).toFixed(2) })),
      events,
    },
    tools: toolStats,
    verification: verify,
    quality: replyFlags(Math.max(since, now - DAY)),
    gate: gateRuns(),
    alerts: {
      open: q<any>('SELECT key, severity, message, first_seen, last_seen FROM alerts WHERE resolved_at IS NULL ORDER BY severity = \'high\' DESC, last_seen DESC'),
      resolved: q<any>('SELECT key, severity, message, first_seen, resolved_at FROM alerts WHERE resolved_at IS NOT NULL ORDER BY resolved_at DESC LIMIT 15'),
    },
    traces: traces.slice(0, 60).map((t) => ({ id: t.id, ts: t.ts, mode: t.mode, by: t.by, conf: t.conf, totalMs: t.total_ms, outcome: t.outcome, eval: t.eval })),
  };
}

export function traceDetail(id: string) {
  const row = q<any>('SELECT * FROM traces WHERE id = ?', id)[0];
  if (!row) return null;
  return { ...row, steps: JSON.parse(row.steps || '[]'), checks: q<any>('SELECT name, ok FROM verify WHERE trace = ?', id) };
}

// ---- automatic regression detection ---------------------------------------------------------------------
// Every 10 minutes: the last 2 hours of REAL traffic (test runs excluded) against the 7 days before. An alert needs
// enough samples on both sides and a jump that is big both relatively and absolutely, so a single slow reply or one
// failed search doesn't page anyone. An alert closes by itself once the numbers are back to normal.
const RECENT = 2 * HOUR;
const BASELINE = 7 * DAY;

export interface Finding { key: string; severity: 'high' | 'medium'; message: string }

export function detectRegressions(now = Date.now()): Finding[] {
  const out: Finding[] = [];
  const cur = q<any>('SELECT mode, total_ms, outcome, fallback, guarded FROM traces WHERE ts >= ? AND eval = 0', now - RECENT);
  const base = q<any>('SELECT mode, total_ms, outcome, fallback, guarded FROM traces WHERE ts >= ? AND ts < ? AND eval = 0', now - RECENT - BASELINE, now - RECENT);
  const rate = (rows: any[], f: (r: any) => boolean) => (rows.length ? rows.filter(f).length / rows.length : 0);
  const s = (ms: number | null) => `${((ms || 0) / 1000).toFixed(1)}s`;

  // Latency, overall and per specialist.
  const curAll = latencyStats(cur);
  const baseAll = latencyStats(base);
  if (curAll.n >= 15 && baseAll.n >= 50 && curAll.p50! > baseAll.p50! * 1.4 && curAll.p50! - baseAll.p50! > 1500) out.push({ key: 'latency:p50', severity: 'high', message: `Replies got slower: median ${s(curAll.p50)} in the last 2 h vs ${s(baseAll.p50)} normally (${curAll.n} replies).` });
  for (const mode of new Set(cur.map((r) => r.mode))) {
    const c = latencyStats(cur.filter((r) => r.mode === mode));
    const b = latencyStats(base.filter((r) => r.mode === mode));
    if (c.n >= 8 && b.n >= 30 && c.p95! > b.p95! * 1.5 && c.p95! - b.p95! > 2000) out.push({ key: `latency:p95:${mode}`, severity: 'medium', message: `${mode}: slowest replies got slower — p95 ${s(c.p95)} vs ${s(b.p95)} normally (${c.n} replies).` });
  }
  // Failures, fallbacks, guard overrides (routing mistakes caught after the fact).
  const failed = (r: any) => r.outcome === 'failed' || r.outcome === 'error';
  const curFail = rate(cur, failed);
  const baseFail = rate(base, failed);
  if (cur.filter(failed).length >= 3 && curFail > baseFail + 0.05 && curFail > baseFail * 2) out.push({ key: 'failures', severity: 'high', message: `${cur.filter(failed).length} replies failed in the last 2 h (${(curFail * 100).toFixed(0)}% vs ${(baseFail * 100).toFixed(0)}% normally).` });
  const fb = (r: any) => Boolean(r.fallback);
  if (cur.filter(fb).length >= 3 && rate(cur, fb) > rate(base, fb) + 0.1 && rate(cur, fb) > rate(base, fb) * 2) out.push({ key: 'fallbacks', severity: 'medium', message: `Specialists keep failing over: ${cur.filter(fb).length} fallbacks in 2 h (${(rate(cur, fb) * 100).toFixed(0)}% vs ${(rate(base, fb) * 100).toFixed(0)}%).` });
  const gd = (r: any) => Boolean(r.guarded);
  if (cur.length >= 15 && base.length >= 50 && rate(cur, gd) > rate(base, gd) + 0.15) out.push({ key: 'routing:guarded', severity: 'medium', message: `The router's first guess is being overruled much more often (${(rate(cur, gd) * 100).toFixed(0)}% vs ${(rate(base, gd) * 100).toFixed(0)}%) — the meaning vote may be off.` });

  // Tools.
  const tCur = q<any>('SELECT tool, outcome FROM tools WHERE ts >= ?', now - RECENT);
  const tBase = q<any>('SELECT tool, outcome FROM tools WHERE ts >= ? AND ts < ?', now - RECENT - BASELINE, now - RECENT);
  for (const tool of new Set(tCur.map((t) => t.tool))) {
    const c = tCur.filter((t) => t.tool === tool);
    const b = tBase.filter((t) => t.tool === tool);
    const cf = c.filter((t) => t.outcome === 'fail').length;
    const cr = cf / c.length;
    const br = b.length ? b.filter((t) => t.outcome === 'fail').length / b.length : 0;
    if (c.length >= 5 && cf >= 3 && cr > br + 0.2 && cr > br * 2) out.push({ key: `tool:${tool}`, severity: cr >= 0.8 ? 'high' : 'medium', message: `${tool} is failing: ${cf}/${c.length} calls in 2 h (${(br * 100).toFixed(0)}% normally).` });
  }
  // Verification checks.
  const vCur = q<any>('SELECT name, ok FROM verify WHERE ts >= ?', now - RECENT);
  const vBase = q<any>('SELECT name, ok FROM verify WHERE ts >= ? AND ts < ?', now - RECENT - BASELINE, now - RECENT);
  for (const name of new Set(vCur.map((v) => v.name))) {
    const c = vCur.filter((v) => v.name === name);
    const b = vBase.filter((v) => v.name === name);
    const cr = c.filter((v) => !v.ok).length / c.length;
    const br = b.length ? b.filter((v) => !v.ok).length / b.length : 0;
    if (c.length >= 5 && cr > br + 0.25) out.push({ key: `verify:${name}`, severity: 'medium', message: `Check "${name}" fails more: ${(cr * 100).toFixed(0)}% of ${c.length} in 2 h vs ${(br * 100).toFixed(0)}% normally.` });
  }
  // Model calls: errors and reload churn.
  const lCur = q<any>('SELECT ok, load_ms FROM llm WHERE ts >= ?', now - RECENT);
  const lBase = q<any>('SELECT ok, load_ms FROM llm WHERE ts >= ? AND ts < ?', now - RECENT - BASELINE, now - RECENT);
  const le = (rows: any[]) => (rows.length ? rows.filter((r) => !r.ok).length / rows.length : 0);
  if (lCur.filter((r) => !r.ok).length >= 4 && le(lCur) > le(lBase) + 0.1) out.push({ key: 'llm:errors', severity: 'high', message: `Model calls are failing: ${lCur.filter((r) => !r.ok).length}/${lCur.length} in 2 h (${(le(lBase) * 100).toFixed(0)}% normally).` });
  const loads = (rows: any[]) => rows.filter((r) => (r.load_ms || 0) > 1500).length;
  const baseLoadsPer2h = (loads(lBase) / BASELINE) * RECENT;
  if (loads(lCur) >= 4 && loads(lCur) > baseLoadsPer2h * 3) out.push({ key: 'llm:loads', severity: 'medium', message: `The model keeps reloading: ${loads(lCur)} loads in 2 h (about ${baseLoadsPer2h.toFixed(1)} normally) — replies pay seconds each time.` });
  // RAM: the last 5 minutes all under 10 % free.
  const ram = q<any>('SELECT free_pct, swap_mb FROM samples WHERE ts >= ?', now - 5 * 60_000);
  if (ram.length >= 3 && ram.every((r) => typeof r.free_pct === 'number' && r.free_pct < 10)) out.push({ key: 'ram', severity: 'high', message: `RAM is nearly full: ${ram[ram.length - 1].free_pct}% free, swap ${Math.round(ram[ram.length - 1].swap_mb || 0)} MB.` });
  // Memory extraction: suddenly rejecting most of what it finds (a prompt or model change gone wrong).
  const mCur = q<any>('SELECT kind, SUM(n) AS n FROM memory WHERE ts >= ? GROUP BY kind', now - 6 * HOUR);
  const mBase = q<any>('SELECT kind, SUM(n) AS n FROM memory WHERE ts >= ? AND ts < ? GROUP BY kind', now - 6 * HOUR - BASELINE, now - 6 * HOUR);
  const mr = (rows: any[]) => {
    const a = rows.find((r) => r.kind === 'accepted')?.n || 0;
    const r = rows.find((x) => x.kind === 'rejected')?.n || 0;
    return { total: a + r, rej: a + r ? r / (a + r) : 0 };
  };
  const mc = mr(mCur);
  const mb = mr(mBase);
  if (mc.total >= 12 && mb.total >= 30 && mc.rej > mb.rej + 0.3) out.push({ key: 'memory:rejections', severity: 'medium', message: `Memory extraction is rejecting ${(mc.rej * 100).toFixed(0)}% of what it finds (normally ${(mb.rej * 100).toFixed(0)}%) — check the memory worker's prompt/model.` });
  // Reply quality flags (live checks on every reply, memory/replyChecks.ts).
  const fNow = replyFlags(now - RECENT);
  const fDay = replyFlags(now - DAY);
  const restN = fDay.logged - fNow.logged;
  const restRate = restN > 0 ? (fDay.flagged - fNow.flagged) / restN : 0;
  if (fNow.logged >= 15 && restN >= 30 && fNow.flagged / fNow.logged > restRate + 0.15) out.push({ key: 'quality:flags', severity: 'medium', message: `More replies are getting quality flags: ${fNow.flagged}/${fNow.logged} in 2 h vs ${(restRate * 100).toFixed(0)}% earlier today${fNow.flags[0] ? ` (mostly "${fNow.flags[0].flag}")` : ''}.` });
  // The live eval gate: the last run regressed.
  const g = gateRuns().slice(-1)[0];
  if (g && g.regressed > 0 && now - g.at < 3 * DAY) out.push({ key: 'gate', severity: 'medium', message: `The last eval gate run (${g.sha || 'unknown commit'}) had ${g.regressed} regressed case(s).` });
  return out;
}

let onAlert: ((f: Finding) => void) | null = null;
export function runRegressionCheck(now = Date.now()): Finding[] {
  if (!enabled) return [];
  try {
    const found = detectRegressions(now);
    const open = new Set(q<any>('SELECT key FROM alerts WHERE resolved_at IS NULL').map((a) => a.key));
    for (const f of found) {
      if (!open.has(f.key)) {
        write('INSERT OR REPLACE INTO alerts (key, severity, message, first_seen, last_seen, resolved_at) VALUES (?, ?, ?, ?, ?, NULL)', f.key, f.severity, f.message, now, now);
        console.warn(`[observatory] REGRESSION: ${f.message}`);
        onAlert?.(f);
      } else write('UPDATE alerts SET message = ?, severity = ?, last_seen = ? WHERE key = ?', f.message, f.severity, now, f.key);
    }
    for (const key of open) if (!found.some((f) => f.key === key)) write('UPDATE alerts SET resolved_at = ? WHERE key = ?', now, key);
    return found;
  } catch (e) {
    console.warn('[observatory] regression check failed:', (e as Error).message);
    return [];
  }
}

export function startObservatory(opts: { onAlert?: (f: Finding) => void } = {}): void {
  if (enabled || process.env.NEXUS_OBSERVATORY === 'off') return;
  enabled = true;
  onAlert = opts.onAlert || null;
  open();
  void sample();
  setInterval(() => void sample(), 60_000).unref?.();
  setInterval(() => runRegressionCheck(), 10 * 60_000).unref?.();
  setInterval(cleanup, HOUR).unref?.();
  setTimeout(() => runRegressionCheck(), 60_000).unref?.();
}

export const observatoryPath = () => FILE;

// Tests only: point the store at a throwaway database (the regression detector is tested on made-up traffic).
export function __useDbForTest(path: string): Database {
  db = null;
  const keep = FILE_OVERRIDE;
  FILE_OVERRIDE = path;
  const d = open();
  FILE_OVERRIDE = keep;
  return d;
}
