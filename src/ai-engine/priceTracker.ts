// Automatic PC price snapshot (Patrick, 2026-10-01: "for the AI to know the prices approximately of each thing, is
// there something so it updates auto?"). There is no free official price API for PC parts (PCPartPicker has none, Newegg
// and Amazon need affiliate keys), so this reuses the keyless live web search the engine already has: about once a
// week it searches a short list of key parts on retailer sites (Newegg, Best Buy, Micro Center, Amazon, B&H, Canada
// Computers, Memory Express), pulls the $ prices out of the listings, keeps the MEDIAN and a low-high range per part
// (a part needs 3+ plausible listings, otherwise the previous value is kept), and saves them to
// ~/.nexus-prices/prices.json. When someone asks about a part, the PC answer gets "LIVE PRICE SNAPSHOT" lines for the
// parts in the question, with the date. The corpus keeps launch MSRPs and dated ranges as the fallback.
// Cost: ~30 searches a week, well under the 900/month cap (docs/web-search.md); it skips when today's search budget
// is mostly used and when the model is busy.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { getSearchStatus, searchTavilyDirect } from './tavilySearch';

export interface TrackedPart {
  id: string;
  label: string;
  query: string;
  alias: RegExp;
  min: number;
  max: number;
  core?: boolean; // shown in every build lesson
}

export interface PriceEntry {
  label: string;
  median: number;
  low: number;
  high: number;
  samples: number;
  domains: string[];
  updatedAt: number;
}

export interface PriceFile {
  updatedAt: number;
  items: Record<string, PriceEntry>;
}

export const RETAIL_DOMAINS = ['newegg.com', 'bestbuy.com', 'microcenter.com', 'amazon.com', 'bhphotovideo.com', 'canadacomputers.com', 'memoryexpress.com', 'newegg.ca', 'amazon.ca', 'walmart.com', 'pcpartpicker.com', 'tomshardware.com', 'pcgamer.com', 'videocardz.com'];

// min/max reject listings of other products (accessories, bundles) mentioned on the same page.
export const TRACKED_PARTS: TrackedPart[] = [
  { id: 'rtx-5090', label: 'RTX 5090 32GB', query: 'GeForce RTX 5090 32GB graphics card', alias: /\b(?:rtx\s?5090)\b/i, min: 1500, max: 7000, core: true },
  { id: 'rtx-5080', label: 'RTX 5080 16GB', query: 'GeForce RTX 5080 16GB graphics card', alias: /\b(?:rtx\s?5080)\b/i, min: 900, max: 2500, core: true },
  { id: 'rtx-5070-ti', label: 'RTX 5070 Ti 16GB', query: 'GeForce RTX 5070 Ti 16GB graphics card', alias: /\b(?:rtx\s?5070\s?ti)\b/i, min: 650, max: 1800 },
  { id: 'rtx-5070', label: 'RTX 5070 12GB', query: 'GeForce RTX 5070 12GB graphics card', alias: /\b(?:rtx\s?5070)(?!\s?ti)\b/i, min: 450, max: 1100, core: true },
  { id: 'rtx-5060-ti-16', label: 'RTX 5060 Ti 16GB', query: 'GeForce RTX 5060 Ti 16GB graphics card', alias: /\b(?:rtx\s?5060\s?ti)\b/i, min: 350, max: 900 },
  { id: 'rtx-5060', label: 'RTX 5060 8GB', query: 'GeForce RTX 5060 8GB graphics card', alias: /\b(?:rtx\s?5060)(?!\s?ti)\b/i, min: 250, max: 650 },
  { id: 'rx-9070-xt', label: 'Radeon RX 9070 XT 16GB', query: 'Radeon RX 9070 XT 16GB graphics card', alias: /\b(?:rx\s?9070\s?xt)\b/i, min: 500, max: 1400, core: true },
  { id: 'rx-9070', label: 'Radeon RX 9070 16GB', query: 'Radeon RX 9070 16GB graphics card', alias: /\b(?:rx\s?9070)(?!\s?xt)\b/i, min: 450, max: 1200 },
  { id: 'rx-9060-xt-16', label: 'Radeon RX 9060 XT 16GB', query: 'Radeon RX 9060 XT 16GB graphics card', alias: /\b(?:rx\s?9060\s?xt)\b/i, min: 280, max: 800 },
  { id: 'arc-b580', label: 'Intel Arc B580 12GB', query: 'Intel Arc B580 12GB graphics card', alias: /\b(?:arc\s?b580|b580)\b/i, min: 220, max: 600 },
  { id: 'ryzen-9800x3d', label: 'Ryzen 7 9800X3D', query: 'AMD Ryzen 7 9800X3D processor', alias: /\b(?:9800x3d)\b/i, min: 350, max: 900, core: true },
  { id: 'ryzen-9950x3d', label: 'Ryzen 9 9950X3D', query: 'AMD Ryzen 9 9950X3D processor', alias: /\b(?:9950x3d)\b/i, min: 500, max: 1200 },
  { id: 'ryzen-7800x3d', label: 'Ryzen 7 7800X3D', query: 'AMD Ryzen 7 7800X3D processor', alias: /\b(?:7800x3d)\b/i, min: 300, max: 800 },
  { id: 'ryzen-9700x', label: 'Ryzen 7 9700X', query: 'AMD Ryzen 7 9700X processor', alias: /\b(?:9700x)\b/i, min: 250, max: 600 },
  { id: 'ryzen-9600x', label: 'Ryzen 5 9600X', query: 'AMD Ryzen 5 9600X processor', alias: /\b(?:9600x)\b/i, min: 180, max: 450 },
  { id: 'ryzen-7600', label: 'Ryzen 5 7600', query: 'AMD Ryzen 5 7600 processor', alias: /\bryzen\s?5\s?7600(?!x)\b/i, min: 150, max: 400 },
  { id: 'ryzen-5600', label: 'Ryzen 5 5600', query: 'AMD Ryzen 5 5600 processor AM4', alias: /\b(?:ryzen\s?5\s?5600)(?!x|g)\b/i, min: 80, max: 250 },
  { id: 'core-ultra-265k', label: 'Core Ultra 7 265K', query: 'Intel Core Ultra 7 265K processor', alias: /\b(?:ultra\s?7\s?265k|265kf?)\b/i, min: 250, max: 700 },
  { id: 'core-ultra-285k', label: 'Core Ultra 9 285K', query: 'Intel Core Ultra 9 285K processor', alias: /\b(?:ultra\s?9\s?285k|285k)\b/i, min: 400, max: 1000 },
  { id: 'ddr5-32gb-6000', label: '32GB (2x16GB) DDR5-6000 kit', query: '32GB 2x16GB DDR5-6000 CL30 desktop memory kit', alias: /\b(?:32\s?gb|2\s?x\s?16\s?gb)\b[^.]{0,60}\bddr5\b|\bddr5\b[^.]{0,60}\b(?:32\s?gb|2\s?x\s?16\s?gb)\b/i, min: 120, max: 1200, core: true },
  { id: 'ddr5-16gb-6000', label: '16GB (2x8GB) DDR5-6000 kit', query: '16GB 2x8GB DDR5-6000 desktop memory kit', alias: /\b(?:16\s?gb|2\s?x\s?8\s?gb)\b[^.]{0,60}\bddr5\b|\bddr5\b[^.]{0,60}\b(?:16\s?gb|2\s?x\s?8\s?gb)\b/i, min: 70, max: 700 },
  { id: 'ddr5-64gb-6000', label: '64GB (2x32GB) DDR5-6000 kit', query: '64GB 2x32GB DDR5-6000 desktop memory kit', alias: /\b(?:64\s?gb|2\s?x\s?32\s?gb)\b[^.]{0,60}\bddr5\b|\bddr5\b[^.]{0,60}\b(?:64\s?gb|2\s?x\s?32\s?gb)\b/i, min: 250, max: 2500 },
  { id: 'ddr4-32gb-3600', label: '32GB (2x16GB) DDR4-3600 kit', query: '32GB 2x16GB DDR4-3600 CL16 desktop memory kit', alias: /\b(?:32\s?gb|2\s?x\s?16\s?gb)\b[^.]{0,60}\bddr4\b|\bddr4\b[^.]{0,60}\b(?:32\s?gb|2\s?x\s?16\s?gb)\b/i, min: 60, max: 600 },
  { id: 'nvme-2tb-gen4', label: '2TB PCIe 4.0 NVMe SSD', query: '2TB PCIe 4.0 NVMe SSD Samsung 990 Pro WD Black SN850X', alias: /\b2\s?tb\b[^.]{0,80}\b(?:nvme|ssd|m\.?2)\b|\b(?:nvme|ssd|m\.?2)\b[^.]{0,80}\b2\s?tb\b/i, min: 100, max: 800, core: true },
  { id: 'nvme-1tb-gen4', label: '1TB PCIe 4.0 NVMe SSD', query: '1TB PCIe 4.0 NVMe SSD Samsung 990 Evo WD Black SN850X', alias: /\b1\s?tb\b[^.]{0,80}\b(?:nvme|ssd|m\.?2)\b|\b(?:nvme|ssd|m\.?2)\b[^.]{0,80}\b1\s?tb\b/i, min: 55, max: 450 },
  { id: 'psu-850w-gold', label: '850W 80+ Gold ATX 3.1 PSU', query: '850W 80+ Gold ATX 3.1 modular power supply Corsair RM850e', alias: /\b850\s?w\b/i, min: 80, max: 400 },
  { id: 'psu-1000w-gold', label: '1000W 80+ Gold ATX 3.1 PSU', query: '1000W 80+ Gold ATX 3.1 modular power supply', alias: /\b1000\s?w\b/i, min: 120, max: 500 },
];

// ---- parsing ------------------------------------------------------------------------------------

export function extractPrices(text: string, min: number, max: number): number[] {
  const out: number[] = [];
  const re = /\$\s?(\d{1,3}(?:,\d{3})+|\d{2,5})(?:\.\d{1,2})?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const n = Number(m[1].replace(/,/g, ''));
    if (n >= min && n <= max) out.push(n);
  }
  return out;
}

export function summarizePrices(prices: number[], minSamples = 3): { median: number; low: number; high: number; samples: number } | null {
  if (prices.length < minSamples) return null;
  const sorted = [...prices].sort((a, b) => a - b);
  const q = (p: number) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * p)))];
  const mid = sorted.length / 2;
  const median = sorted.length % 2 ? sorted[Math.floor(mid)] : (sorted[mid - 1] + sorted[mid]) / 2;
  return { median: Math.round(median), low: Math.round(q(0.25)), high: Math.round(q(0.75)), samples: sorted.length };
}

// ---- storage ------------------------------------------------------------------------------------

function storeDir(): string {
  return process.env.NEXUS_PRICES_DIR || join(homedir(), '.nexus-prices');
}
function storePath(): string {
  return join(storeDir(), 'prices.json');
}

let cache: PriceFile | null = null;

export function loadPrices(): PriceFile {
  if (cache) return cache;
  try {
    if (existsSync(storePath())) cache = JSON.parse(readFileSync(storePath(), 'utf8')) as PriceFile;
  } catch {
    cache = null;
  }
  return (cache ||= { updatedAt: 0, items: {} });
}

function savePrices(file: PriceFile): void {
  try {
    if (!existsSync(storeDir())) mkdirSync(storeDir(), { recursive: true, mode: 0o700 });
    writeFileSync(storePath(), JSON.stringify(file, null, 2), { mode: 0o600 });
    cache = file;
  } catch (err) {
    console.warn('[prices] could not save the snapshot:', err);
  }
}

export function __setPricesForTests(file: PriceFile | null): void {
  cache = file;
}

// ---- refresh ------------------------------------------------------------------------------------

let refreshing = false;
export const REFRESH_EVERY_MS = 7 * 24 * 60 * 60 * 1000;

export interface RefreshResult {
  ran: boolean;
  updated: number;
  kept: number;
  skipped?: string;
}

export async function refreshPrices(opts: { force?: boolean; isBusy?: () => boolean; onlyIds?: string[] } = {}): Promise<RefreshResult> {
  if (refreshing) return { ran: false, updated: 0, kept: 0, skipped: 'already refreshing' };
  const file = loadPrices();
  if (!opts.force && Date.now() - file.updatedAt < REFRESH_EVERY_MS) return { ran: false, updated: 0, kept: 0, skipped: 'fresh enough' };
  try {
    const status = await getSearchStatus();
    if (status.mode === 'off') return { ran: false, updated: 0, kept: 0, skipped: 'live search is off' };
    if (status.pausedUntil && new Date(status.pausedUntil).getTime() > Date.now()) return { ran: false, updated: 0, kept: 0, skipped: 'live search is paused (rate limit)' };
    // Keep most of today's search budget for people asking questions.
    if (status.usedToday > status.dailyLimit * (opts.force ? 0.9 : 0.6)) return { ran: false, updated: 0, kept: 0, skipped: 'daily search budget mostly used' };
  } catch {
    /* status unavailable: go on */
  }
  refreshing = true;
  let updated = 0;
  let kept = 0;
  let stoppedByLimit = false;
  const next: PriceFile = { updatedAt: file.updatedAt, items: { ...file.items } };
  try {
    for (const part of TRACKED_PARTS) {
      if (opts.onlyIds && !opts.onlyIds.includes(part.id)) continue;
      // A retry after a rate-limit stop continues where the last run ended: parts refreshed in the last 6 days are skipped.
      const prev = next.items[part.id];
      if (!opts.force && prev && Date.now() - prev.updatedAt < REFRESH_EVERY_MS - 24 * 60 * 60 * 1000) continue;
      if (opts.isBusy?.()) {
        await new Promise((r) => setTimeout(r, 20_000));
      }
      // One price per listing (the first plausible one in its text): a page that repeats the same price 5 times
      // must not look like 5 stores. A second, differently worded search runs only if the first found < 2 listings.
      const listings = new Map<string, number>();
      const domains = new Set<string>();
      for (const q of [`${part.query} price`, `buy ${part.query} in stock`]) {
        if (listings.size >= 2) break;
        const st = await getSearchStatus().catch(() => null);
        if (st?.pausedUntil && new Date(st.pausedUntil).getTime() > Date.now()) {
          stoppedByLimit = true;
          break;
        }
        const results = await searchTavilyDirect(q, 8, { purpose: 'chat', includeDomains: RETAIL_DOMAINS });
        for (const r of results) {
          const text = `${r.title}. ${r.snippet}`;
          if (!part.alias.test(text) || listings.has(r.url)) continue; // the listing must be about this part
          const found = extractPrices(text, part.min, part.max);
          if (found.length) {
            listings.set(r.url, found[0]);
            if (r.domain) domains.add(r.domain);
          }
        }
        await new Promise((r) => setTimeout(r, 4000));
      }
      if (stoppedByLimit) break;
      const summary = summarizePrices([...listings.values()], 2);
      if (summary) {
        next.items[part.id] = { label: part.label, ...summary, domains: [...domains].slice(0, 5), updatedAt: Date.now() };
        updated++;
      } else if (next.items[part.id]) kept++;
    }
    // A run cut short by the rate limit keeps what it found but does not reset the weekly clock, so it retries.
    if (updated > 0 && !stoppedByLimit) next.updatedAt = Date.now();
    else if (updated > 0 && !next.updatedAt) next.updatedAt = Date.now() - REFRESH_EVERY_MS + 60 * 60 * 1000;
    savePrices(next);
    console.log(`[prices] snapshot refreshed: ${updated} part(s) updated, ${kept} kept from before`);
    return { ran: true, updated, kept, skipped: stoppedByLimit ? 'stopped early by the search rate limit; will retry' : undefined };
  } finally {
    refreshing = false;
  }
}

let timer: ReturnType<typeof setInterval> | null = null;

// Called once at engine start: checks every 6 hours, refreshes when the snapshot is older than a week.
export function startPriceTracker(isBusy?: () => boolean): void {
  if (timer || (process.env.NEXUS_PRICE_TRACKER || 'on').toLowerCase() === 'off') return;
  let retries = 0;
  const tick = () =>
    void refreshPrices({ isBusy })
      .then((r) => {
        // Rate-limited / budget-limited: try again in 20 minutes (up to 6 times) instead of waiting 6 hours.
        if ((r.skipped?.includes('paused') || r.skipped?.includes('budget') || r.skipped?.includes('early')) && retries++ < 6) setTimeout(tick, 20 * 60_000).unref?.();
      })
      .catch((err) => console.warn('[prices] refresh failed:', err?.message || err));
  setTimeout(tick, 3 * 60_000).unref?.();
  timer = setInterval(tick, 6 * 60 * 60_000);
  timer.unref?.();
}

// ---- use in answers -----------------------------------------------------------------------------

// "2 sticks of DDR5 16GB" / "two 16gb ddr5 sticks" means a 2x16GB (32GB) kit, not a 16GB kit (2026-10-04: Nexus priced
// a 2x8GB kit for that question).
export function expandStickCounts(text: string): string {
  const n = (w: string) => ({ two: '2', four: '4' } as Record<string, string>)[w.toLowerCase()] || w;
  return text
    .replace(/\b(2|two|4|four)\s+(?:sticks?|dimms?|modules?)\s+(?:of\s+)?(?:(ddr\d)\s+)?(\d{1,3})\s?gb\b(?:\s+(ddr\d))?/gi, (_m, c, d1, s, d2) => `${n(c)}x${s}GB (${Number(n(c)) * Number(s)}GB kit) ${d1 || d2 || ''}`.trim())
    .replace(/\b(2|two|4|four)\s+(\d{1,3})\s?gb\s+(?:(ddr\d)\s+)?(?:ram\s+)?(?:sticks?|dimms?|modules?)\b/gi, (_m, c, s, d) => `${n(c)}x${s}GB (${Number(n(c)) * Number(s)}GB kit) ${d || ''}`.trim());
}

// A question about what something costs ("what's the cost of 2 sticks of DDR5 16GB?", "how much is a 5090").
// These always get a live search: prices move weekly. Build requests with a budget go to the PC path instead.
export function isPriceQuestion(text: string): boolean {
  const t = text.toLowerCase();
  if (/\b(?:build|budget|cost of living|at all costs?|price is right)\b/.test(t)) return false;
  if (/\bhow\s+much\s+is\s+[\d\s+\-*/x×÷.^()]+\??\s*$/.test(t)) return false; // "how much is 2+2" is maths
  if (/\b(?:price|prices|pricing|msrp|cost|costs|costing)\b/.test(t) && /\?|\b(?:what|how|whats|what's|tell|check|find)\b/.test(t)) return true;
  return /\bhow\s+much\s+(?:is|are|does|do|would|will|for|'?s)\b[^?]{0,60}\b(?:\d|rtx|gtx|rx|ryzen|intel|ddr\d|ssd|nvme|gpu|cpu|ram|ps5|xbox|switch|iphone|macbook|monitor|keyboard|mouse|headset)/.test(t);
}

export const CANADIAN_RETAIL_DOMAINS = ['canadacomputers.com', 'memoryexpress.com', 'newegg.ca', 'amazon.ca', 'bestbuy.ca'];

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

// Lines for the parts the question mentions (plus the main parts when `core` is set, for build lessons).
// Empty string when nothing is known or the snapshot is older than 60 days.
export function getPriceNote(text: string, opts: { core?: boolean; maxLines?: number } = {}): string {
  const file = loadPrices();
  if (!file.updatedAt || Date.now() - file.updatedAt > 60 * 24 * 60 * 60 * 1000) return '';
  text = expandStickCounts(text);
  const lines: string[] = [];
  const seen = new Set<string>();
  const add = (part: TrackedPart) => {
    const e = file.items[part.id];
    if (!e || seen.has(part.id)) return;
    seen.add(part.id);
    lines.push(`${e.label}: about ${money(e.median)} (typical listings ${money(e.low)}-${money(e.high)})`);
  };
  for (const part of TRACKED_PARTS) if (part.alias.test(text)) add(part);
  if (opts.core) for (const part of TRACKED_PARTS) if (part.core) add(part);
  if (!lines.length) return '';
  const date = new Date(file.updatedAt).toISOString().slice(0, 10);
  return `LIVE PRICE SNAPSHOT (USD, retailer listings found by web search, updated ${date}; approximate, prices move weekly): ${lines.slice(0, opts.maxLines ?? 10).join('; ')}.`;
}
