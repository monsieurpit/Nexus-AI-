// Live USD -> CAD exchange rate (Patrick, 2026-10-05: "when the price is in CAD he always gives me USD... tell him the
// exact math"). Nexus used to be told "roughly USD x 1.38"; the real rate that day was 1.4253, so every CAD price was ~3%
// low. Two free, keyless sources (Frankfurter = European Central Bank rates, then open.er-api.com), refreshed every
// 6 hours, last good value kept on disk for when both are down.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export interface FxRate {
  usdToCad: number;
  usdToEur?: number; // for German members (prices in euros)
  date: string; // the rate's own date (YYYY-MM-DD)
  source: string;
  fetchedAt: number;
}

const FILE = join(process.env.NEXUS_PRICES_DIR || join(homedir(), '.nexus-prices'), 'fx.json');
const REFRESH_MS = 6 * 60 * 60 * 1000;
const FALLBACK: FxRate = { usdToCad: 1.42, usdToEur: 0.86, date: '2026-10-05', source: 'built-in fallback', fetchedAt: 0 };
let cached: FxRate | null = null;
let inFlight: Promise<FxRate> | null = null;

function readDisk(): FxRate | null {
  try {
    return existsSync(FILE) ? (JSON.parse(readFileSync(FILE, 'utf8')) as FxRate) : null;
  } catch {
    return null;
  }
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchRate(): Promise<FxRate | null> {
  try {
    const j = await fetchJson('https://api.frankfurter.dev/v1/latest?base=USD&symbols=CAD,EUR');
    if (typeof j?.rates?.CAD === 'number') return { usdToCad: j.rates.CAD, usdToEur: j.rates.EUR, date: j.date, source: 'Frankfurter (European Central Bank)', fetchedAt: Date.now() };
  } catch {
    /* try the next source */
  }
  try {
    const j = await fetchJson('https://open.er-api.com/v6/latest/USD');
    if (typeof j?.rates?.CAD === 'number') return { usdToCad: j.rates.CAD, usdToEur: j.rates.EUR, date: new Date(j.time_last_update_utc || Date.now()).toISOString().slice(0, 10), source: 'open.er-api.com', fetchedAt: Date.now() };
  } catch {
    /* both down */
  }
  return null;
}

// The current rate (never throws, never waits more than ~12 s; usually instant from the cache).
export async function getUsdToCad(): Promise<FxRate> {
  cached ||= readDisk();
  if (cached && Date.now() - cached.fetchedAt < REFRESH_MS && cached.usdToEur) return cached;
  inFlight ||= (async () => {
    const fresh = await fetchRate();
    if (fresh) {
      cached = fresh;
      try {
        mkdirSync(join(FILE, '..'), { recursive: true });
        writeFileSync(FILE, JSON.stringify(fresh));
      } catch {
        /* the in-memory value still works */
      }
    }
    return cached || FALLBACK;
  })().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

// Last known rate without waiting (for synchronous code paths); refreshes in the background.
export function usdToCadSync(): FxRate {
  void getUsdToCad();
  return cached || readDisk() || FALLBACK;
}

export const toCad = (usd: number, rate = usdToCadSync().usdToCad) => Math.round(usd * rate);
export const toUsd = (cad: number, rate = usdToCadSync().usdToCad) => Math.round(cad / rate);

// The line every price-related specialist gets: the exact rate and the exact maths.
export function fxNote(rate = usdToCadSync()): string {
  const r = rate.usdToCad;
  return `EXCHANGE RATE (live, ${rate.date}, ${rate.source}): 1 USD = ${r.toFixed(4)} CAD and 1 CAD = ${(1 / r).toFixed(4)} USD. To convert: CAD = USD × ${r.toFixed(4)} (e.g. $100 USD = $${Math.round(100 * r)} CAD); USD = CAD ÷ ${r.toFixed(4)}. Round to whole dollars.`;
}

// German members think in euros: their price answers lead with EUR (Germany), with CAD/USD only if they ask.
export function fxNoteEur(rate = usdToCadSync()): string {
  const e = rate.usdToEur ?? 0.86;
  return `EXCHANGE RATE (live, ${rate.date}, ${rate.source}): 1 USD = ${e.toFixed(4)} EUR, 1 EUR = ${(1 / e).toFixed(4)} USD. EUR = USD × ${e.toFixed(4)} (e.g. $100 USD = ${Math.round(100 * e)} €). This person is in GERMANY: give prices in EURO first (German shops like Mindfactory, Alternate, Caseking, Amazon.de often differ a bit from the converted price), USD in brackets.`;
}
