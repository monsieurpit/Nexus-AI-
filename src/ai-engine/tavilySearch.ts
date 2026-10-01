// Live web search through Tavily — built for AI agents, and it has a KEYLESS mode (no account, no API
// key, no card: just the header X-Tavily-Access-Mode: keyless), so Nexus can search the real web for
// current information (prices, news, scores, recent events). Google and DuckDuckGo block automated
// requests, so until this existed Nexus could only read Wikipedia.
//
// An optional free key (1,000 searches/month, no card) lifts the keyless rate limit: put it in env
// TAVILY_API_KEY or the file ~/.nexus-search/tavily-api-key (chmod 600) — picked up within a minute,
// never in the repo. Server-only: fs/os/path are imported lazily so the website bundle never loads them.
//
// Search queries (derived from Discord messages) are sent to Tavily; nothing else is.
// Spending can't run away even if a paid plan were ever attached: TAVILY_MONTHLY_LIMIT (default 900)
// and TAVILY_DAILY_LIMIT (default 100) cap what the engine will send, and the learning system may use
// at most 30% — a user's question matters more than background verification.

import type { WebSearchResult } from '../types';

const ENDPOINT = 'https://api.tavily.com/search';
const USER_AGENT = 'NexusAI/2.0 (https://github.com/monsieurpit/Nexus-AI-; Discord bot) bun';
const REQUEST_TIMEOUT_MS = 8000;
const KEY_CACHE_MS = 60_000;
const RESULT_CACHE_MS = 10 * 60 * 1000;
const LEARNING_SHARE = 0.3;
const MAX_REQUESTS_PER_MINUTE = 30;

// Sources good enough to VERIFY a fact against. Anyone can rank well for a query; these can't be
// bought or self-published. Used to order answers and, for the learning system, as the only web
// evidence that can make it learn something.
export const TRUSTED_DOMAINS = [
  'wikipedia.org', 'wikimedia.org', 'britannica.com', 'reuters.com', 'apnews.com', 'bbc.com', 'bbc.co.uk',
  'nasa.gov', 'who.int', 'un.org', 'europa.eu', 'nature.com', 'sciencedirect.com', 'nih.gov',
  'espn.com', 'uefa.com', 'fifa.com', 'fcbarcelona.com', 'laliga.com', 'premierleague.com', 'olympics.com',
  'imdb.com', 'rottentomatoes.com', 'steampowered.com', 'nintendo.com', 'playstation.com', 'xbox.com',
  'theguardian.com', 'npr.org', 'cbc.ca', 'radio-canada.ca', 'lapresse.ca', 'quebec.ca', 'canada.ca',
  'coindesk.com', 'coinmarketcap.com', 'tradingeconomics.com', 'investopedia.com', 'nytimes.com',
];

export function isTrustedDomain(domain?: string | null): boolean {
  if (!domain) return false;
  const d = domain.toLowerCase().replace(/^www\./, '');
  return d.endsWith('.gov') || d.endsWith('.edu') || d.endsWith('.gov.uk') || d.endsWith('.gc.ca') || TRUSTED_DOMAINS.some((t) => d === t || d.endsWith(`.${t}`));
}

// ---- node helpers (lazy) ------------------------------------------------------------------------

async function node() {
  if (typeof window !== 'undefined') return null;
  const [fs, os, path] = await Promise.all([import('fs'), import('os'), import('path')]);
  return { fs, os, path };
}

async function dir(): Promise<string | null> {
  const n = await node();
  if (!n) return null;
  return process.env.NEXUS_SEARCH_DIR || n.path.join(n.os.homedir(), '.nexus-search');
}

// ---- optional key -------------------------------------------------------------------------------

let keyCache: { at: number; key: string | null } | null = null;

export async function getTavilyKey(): Promise<string | null> {
  if (keyCache && Date.now() - keyCache.at < KEY_CACHE_MS) return keyCache.key;
  let key: string | null = (process.env.TAVILY_API_KEY || '').trim() || null;
  if (!key) {
    try {
      const n = await node();
      const d = await dir();
      if (n && d) {
        const file = n.path.join(d, 'tavily-api-key');
        if (n.fs.existsSync(file)) key = n.fs.readFileSync(file, 'utf8').trim() || null;
      }
    } catch {
      key = null;
    }
  }
  keyCache = { at: Date.now(), key };
  return key;
}

// On unless switched off (NEXUS_WEB_SEARCH=off) or paused after an error.
export async function isLiveSearchAvailable(): Promise<boolean> {
  if ((process.env.NEXUS_WEB_SEARCH || 'on').toLowerCase() === 'off') return false;
  if (typeof window !== 'undefined') return false;
  return Date.now() >= disabledUntil;
}

// ---- budget -------------------------------------------------------------------------------------

interface Usage {
  month: string;
  total: number;
  learning: number;
  day: string;
  dayTotal: number;
}

function monthlyLimit(): number {
  const n = Number(process.env.TAVILY_MONTHLY_LIMIT);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 900;
}

function dailyLimit(): number {
  const n = Number(process.env.TAVILY_DAILY_LIMIT);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 100;
}

function emptyUsage(now = new Date()): Usage {
  return { month: now.toISOString().slice(0, 7), total: 0, learning: 0, day: now.toISOString().slice(0, 10), dayTotal: 0 };
}

async function readUsage(): Promise<Usage> {
  const now = new Date();
  try {
    const n = await node();
    const d = await dir();
    if (n && d) {
      const file = n.path.join(d, 'search-usage.json');
      if (n.fs.existsSync(file)) {
        const u = JSON.parse(n.fs.readFileSync(file, 'utf8')) as Usage;
        const fresh = emptyUsage(now);
        if (u.month !== fresh.month) return fresh;
        if (u.day !== fresh.day) return { ...u, day: fresh.day, dayTotal: 0 };
        return u;
      }
    }
  } catch {
    // unreadable counter: start from zero rather than block search — the caps still apply from here on
  }
  return emptyUsage(now);
}

async function writeUsage(u: Usage): Promise<void> {
  try {
    const n = await node();
    const d = await dir();
    if (!n || !d) return;
    if (!n.fs.existsSync(d)) n.fs.mkdirSync(d, { recursive: true, mode: 0o700 });
    n.fs.writeFileSync(n.path.join(d, 'search-usage.json'), JSON.stringify(u), { mode: 0o600 });
  } catch (err) {
    console.warn('[Web Search] could not save the usage counter:', err);
  }
}

// One lane for counter updates, so two searches at once can't both read "899" and both go through.
let lane: Promise<unknown> = Promise.resolve();
const recentRequests: number[] = [];

// Counts the request BEFORE it's sent and says whether it may go.
export function reserveSearchRequest(purpose: 'chat' | 'learning' = 'chat'): Promise<boolean> {
  const run = lane.then(async () => {
    const now = Date.now();
    while (recentRequests.length && now - recentRequests[0] > 60_000) recentRequests.shift();
    if (recentRequests.length >= MAX_REQUESTS_PER_MINUTE) return false;
    const u = await readUsage();
    if (u.total >= monthlyLimit() || u.dayTotal >= dailyLimit()) return false;
    if (purpose === 'learning' && u.learning >= Math.floor(monthlyLimit() * LEARNING_SHARE)) return false;
    u.total += 1;
    u.dayTotal += 1;
    if (purpose === 'learning') u.learning += 1;
    recentRequests.push(now);
    await writeUsage(u);
    return true;
  });
  lane = run.catch(() => undefined);
  return run;
}

export async function getSearchStatus(): Promise<{ provider: string; mode: 'keyless' | 'key' | 'off'; usedThisMonth: number; monthlyLimit: number; usedToday: number; dailyLimit: number; pausedUntil: string | null }> {
  const u = await readUsage();
  const off = (process.env.NEXUS_WEB_SEARCH || 'on').toLowerCase() === 'off';
  return {
    provider: 'tavily',
    mode: off ? 'off' : (await getTavilyKey()) ? 'key' : 'keyless',
    usedThisMonth: u.total,
    monthlyLimit: monthlyLimit(),
    usedToday: u.dayTotal,
    dailyLimit: dailyLimit(),
    pausedUntil: disabledUntil > Date.now() ? new Date(disabledUntil).toISOString() : null,
  };
}

// ---- response parsing -----------------------------------------------------------------------------

// Search results are untrusted text that ends up inside a model prompt. A page can put instructions
// in its snippet; results that look like that are dropped rather than shown to the model.
const PROMPT_INJECTION_RE =
  /\b(?:ignore|disregard|forget)\s+(?:all\s+|any\s+|your\s+|the\s+)?(?:previous|prior|above|earlier)\s+(?:instructions?|prompts?|rules?)|\b(?:system\s+prompt|you\s+are\s+now\s+(?:a|an|in)|new\s+instructions?\s*:|assistant\s*:|<\/?(?:system|assistant)>)|\bas\s+an\s+ai\s+(?:language\s+)?model\b.{0,40}\b(?:must|should)\s+(?:always|now)\b/i;

function cleanText(raw: unknown): string {
  return String(raw ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links/images -> their text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*|__/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseTavilyResponse(json: any, limit: number): WebSearchResult[] {
  const raw: any[] = Array.isArray(json?.results) ? json.results : [];
  const out: WebSearchResult[] = [];
  for (const r of raw) {
    let url = '';
    let domain = '';
    try {
      const u = new URL(String(r?.url || ''));
      if (u.protocol !== 'http:' && u.protocol !== 'https:') continue;
      url = u.toString();
      domain = u.hostname.replace(/^www\./, '').toLowerCase();
    } catch {
      continue;
    }
    const title = cleanText(r?.title);
    const snippet = cleanText(r?.content).slice(0, 700);
    if (!title || snippet.length < 20) continue;
    if (PROMPT_INJECTION_RE.test(title) || PROMPT_INJECTION_RE.test(snippet)) continue;
    out.push({ title, url, snippet, source: 'tavily', engine: 'Tavily', domain });
    if (out.length >= limit) break;
  }
  return out;
}

// ---- search ---------------------------------------------------------------------------------------

const resultCache = new Map<string, { at: number; results: WebSearchResult[] }>();
let disabledUntil = 0;
let warnedAt = 0;

function warnOnce(message: string): void {
  if (Date.now() - warnedAt > 10 * 60 * 1000) {
    warnedAt = Date.now();
    console.warn(`[Web Search] ${message}`);
  }
}

export function __resetSearchForTests(): void {
  keyCache = null;
  disabledUntil = 0;
  warnedAt = 0;
  resultCache.clear();
  recentRequests.length = 0;
  lane = Promise.resolve();
}

export async function searchTavilyDirect(
  query: string,
  limit = 5,
  opts: { purpose?: 'chat' | 'learning'; recent?: boolean; includeDomains?: string[] } = {}
): Promise<WebSearchResult[]> {
  if (!query.trim() || !(await isLiveSearchAvailable())) return [];

  const cacheKey = `${query.trim().toLowerCase()}|${opts.recent ? 'r' : ''}|${(opts.includeDomains || []).join(',')}`;
  const cached = resultCache.get(cacheKey);
  if (cached && Date.now() - cached.at < RESULT_CACHE_MS) return cached.results.slice(0, limit);

  if (!(await reserveSearchRequest(opts.purpose || 'chat'))) return [];

  const key = await getTavilyKey();
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': USER_AGENT };
  if (key) headers.Authorization = `Bearer ${key}`;
  else headers['X-Tavily-Access-Mode'] = 'keyless';

  const body: Record<string, unknown> = {
    query: query.trim().slice(0, 380),
    search_depth: 'basic',
    max_results: Math.min(Math.max(limit, 3), 8),
    include_answer: false,
    include_raw_content: false,
    include_images: false,
  };
  if (opts.recent) body.time_range = 'month';
  if (opts.includeDomains?.length) body.include_domains = opts.includeDomains.slice(0, 20);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, { method: 'POST', signal: controller.signal, headers, body: JSON.stringify(body) });
    if (!res.ok) {
      // 429 = too fast (keyless is rate limited), 401/403 = bad key, 432/433 = plan limit: stop
      // hammering, say so once; Nexus keeps answering from Wikipedia and the corpus meanwhile.
      const retryAfter = Number(res.headers.get('retry-after'));
      const pauseMs = res.status === 429 ? (Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 3600) * 1000 : 5 * 60 * 1000) : res.status >= 500 ? 60_000 : 60 * 60 * 1000;
      disabledUntil = Date.now() + pauseMs;
      warnOnce(`HTTP ${res.status} — live web search paused for ${Math.round(pauseMs / 60000)} min${res.status === 429 && !key ? ' (keyless limit reached; a free key lifts it — see docs/web-search.md)' : ''}`);
      return [];
    }
    const results = parseTavilyResponse(await res.json(), limit);
    if (results.length > 0) {
      if (resultCache.size > 300) resultCache.delete(resultCache.keys().next().value!);
      resultCache.set(cacheKey, { at: Date.now(), results });
    }
    return results;
  } catch (err: any) {
    if (err?.name !== 'AbortError') warnOnce(`request failed: ${err?.message || err}`);
    return [];
  } finally {
    clearTimeout(timer);
  }
}
