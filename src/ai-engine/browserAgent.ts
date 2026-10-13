// Nexus uses a web page (2026-10-12, Patrick: "make Nexus interact on website pages — click buttons precisely, and if
// there's a video on the page, watch it, same with photos"). The BROWSER runs in the cloud (Browserless, Patrick's pick:
// "can it not run on my Mac?"); the decisions (which button), the video and the photos are handled on the Mac.
//   BROWSERLESS_TOKEN   the cloud browser (wss://production-sfo.browserless.io). Without it the feature is off.
//   NEXUS_BROWSER_LOCAL=on   testing only: a local headless Chromium (~/.nexus-browser) instead.
//
// What it does: open the page, list its buttons/links as numbered items, the model picks the one that fits the goal,
// the exact element is clicked (up to 4 clicks), then the final page is read: its text, the 2 biggest photos (image
// model), the first video (video analyzer).
// The browser itself is driven by browserDriver.mjs under Node (Bun's WebSocket hangs on the cloud connection).
// Never: buy / pay / checkout / sign up / log in / delete / send / submit / subscribe clicks, typing into password or
// card fields, local-network addresses, adult sites. Fresh browser every time (no cookies), 60 s max.

import { spawn } from 'child_process';
import * as localLlmClient from './localLlmClient';

const TOKEN = process.env.BROWSERLESS_TOKEN || '';
const ENDPOINT = process.env.BROWSERLESS_URL || 'wss://production-sfo.browserless.io';
const LOCAL = process.env.NEXUS_BROWSER_LOCAL === 'on';
const MAX_CLICKS = 4;
const TOTAL_MS = 60_000;

export const browserAvailable = () => Boolean(TOKEN || LOCAL);

// "go to X and click Y", "press the play button on X", "watch the video on X", "look at the pics on X".
export const BROWSE_INTENT_RE = /\b(?:click|press|tap|hit|open\s+the|go\s+to|navigate|interact|scroll|play\s+the\s+video|watch\s+(?:the|this|that)\s+(?:video|vid|clip)|look\s+at\s+(?:the\s+)?(?:pics?|pictures?|photos?|images?)|check\s+(?:the\s+)?(?:pics?|pictures?|photos?|images?|video))\b/i;

const FORBIDDEN_CLICK_RE = /\b(?:buy|pay|payment|checkout|check\s*out|order|purchase|add\s+to\s+(?:cart|bag|basket)|subscribe|sign\s*up|register|log\s*in|login|sign\s*in|delete|remove\s+account|send|submit|donate|confirm\s+(?:order|payment)|place\s+order|bid|transfer|withdraw)\b/i;
const ADULT_RE = /(?:porn|xvideos|xnxx|xhamster|onlyfans|redtube|youporn|chaturbate|stripchat|brazzers|spankbang|rule34|hentai|nsfw)/i;

function urlAllowed(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return 'not a valid link';
  }
  if (!/^https?:$/.test(u.protocol)) return 'only web links (http/https)';
  const h = u.hostname.toLowerCase();
  if (/^(?:localhost|0\.0\.0\.0|\[?::1\]?)$/.test(h) || /\.(?:local|internal|lan|home)$/.test(h) || /^(?:127\.|10\.|192\.168\.|169\.254\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(h)) return 'local network addresses are off limits';
  if (ADULT_RE.test(h + u.pathname)) return 'adult sites are off limits';
  return null;
}

export interface BrowseResult {
  ok: boolean;
  error?: string;
  steps: string[]; // what was clicked, for the thinking panel
  title?: string;
  finalUrl?: string;
  text?: string; // the final page's visible text (trimmed)
  photos: string[]; // what the image model saw
  video?: string; // what the video analyzer saw
}

let busy = false;

// The Node driver (browserDriver.mjs) — one per visit, a JSON line per command.
const NODE = process.env.NEXUS_NODE || `${process.env.HOME}/.local/node/bin/node`;
const DRIVER = new URL('./browserDriver.mjs', import.meta.url).pathname;
function startDriver() {
  const proc = spawn(NODE, [DRIVER], { stdio: ['pipe', 'pipe', 'ignore'], env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: process.env.PLAYWRIGHT_BROWSERS_PATH || `${process.env.HOME}/.nexus-browser`, BROWSERLESS_TOKEN: TOKEN } });
  const lines: string[] = [];
  const waiters: Array<(l: string) => void> = [];
  let buf = '';
  proc.stdout!.on('data', (d: Buffer) => {
    buf += d.toString();
    let nl: number;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      const w = waiters.shift();
      if (w) w(line);
      else lines.push(line);
    }
  });
  const nextLine = (timeoutMs: number) =>
    new Promise<any>((resolve, reject) => {
      const queued = lines.shift();
      if (queued !== undefined) return resolve(JSON.parse(queued));
      const timer = setTimeout(() => reject(new Error('the browser took too long')), timeoutMs);
      waiters.push((l) => {
        clearTimeout(timer);
        try {
          resolve(JSON.parse(l));
        } catch {
          reject(new Error('the browser answered nonsense'));
        }
      });
    });
  return {
    ask(cmd: Record<string, unknown>, timeoutMs = 30_000): Promise<any> {
      proc.stdin!.write(`${JSON.stringify(cmd)}\n`);
      return nextLine(timeoutMs);
    },
    close() {
      try {
        proc.stdin!.write('{"cmd":"close"}\n');
      } catch {
        // already gone
      }
      setTimeout(() => proc.kill(), 3000).unref?.();
    },
  };
}

// The model picks the next click for the goal: "CLICK <n>" or "DONE".
async function pickClick(goal: string, url: string, elements: Array<{ i: number; label: string }>, done: string[]): Promise<number | null> {
  const list = elements.map((e) => `[${e.i}] ${e.label}`).join('\n');
  const res: any = await localLlmClient.generate(
    `Goal from the user: "${goal}"\nYou are on: ${url}\nAlready clicked: ${done.length ? done.join(' → ') : 'nothing yet'}\nClickable things on the page:\n${list}\n\nReply with exactly "CLICK <number>" for the ONE thing to click next to reach the goal, or "DONE" if the goal is reached or nothing fits.`,
    { system: 'You operate a web browser for someone. Pick precisely. Reply only "CLICK <number>" or "DONE".', temperature: 0, maxTokens: 12, think: false } as any
  );
  const m = String(res?.text || '').match(/CLICK\s*\[?(\d{1,3})\]?/i);
  return m ? Number(m[1]) : null;
}

async function describePhotos(srcs: string[]): Promise<string[]> {
  const seen: string[] = [];
  for (const src of srcs) {
    if (!/^https?:/.test(src) || urlAllowed(src)) continue;
    const buf = await fetch(src, { signal: AbortSignal.timeout(10_000) }).then((r) => (r.ok ? r.arrayBuffer() : null)).catch(() => null);
    if (!buf || buf.byteLength > 8_000_000) continue;
    const v: any = await localLlmClient.generateVision(Buffer.from(buf).toString('base64'), 'Describe this photo from a web page in 1-2 sentences: what is in it.', { timeoutMs: 45_000 });
    if (v?.status === 'success' && v.text) seen.push(String(v.text).trim().slice(0, 300));
  }
  return seen;
}

async function watchVideo(src: string, goal: string): Promise<string | undefined> {
  if (!src || urlAllowed(src)) return undefined;
  const { analyzeVideo } = await import('./videoAnalyzer');
  const a = await analyzeVideo(src.replace(/youtube\.com\/embed\/([\w-]+).*/, 'youtube.com/watch?v=$1'), goal).catch(() => null);
  return a?.ok ? a.description.slice(0, 1500) : undefined;
}

export async function browseAndAct(rawUrl: string, goal: string): Promise<BrowseResult> {
  const blocked = urlAllowed(rawUrl);
  if (blocked) return { ok: false, error: blocked, steps: [], photos: [] };
  if (!browserAvailable()) return { ok: false, error: 'the cloud browser is not set up yet (BROWSERLESS_TOKEN)', steps: [], photos: [] };
  if (busy) return { ok: false, error: 'already using the browser for someone else, try again in a minute', steps: [], photos: [] };
  busy = true;
  const started = Date.now();
  const steps: string[] = [];
  const driver = startDriver();
  try {
    const opened = await driver.ask({ cmd: 'open', url: rawUrl }, 40_000);
    if (!opened.ok) return { ok: false, error: `the page didn't load (${opened.error})`, steps, photos: [] };
    const wantsClicks = /\b(?:click|press|tap|hit|open\s+the|navigate|go\s+to\s+the)\b/i.test(goal);
    let url = opened.url;
    // As many clicks as they asked for ("click new, what's the first post" = 1), never more than 4 — it used to keep going
    // into the first post and a link inside it.
    const asked = Math.max(1, (goal.match(/\b(?:click|press|tap|hit|open\s+the|then)\b/gi) || []).length);
    const maxClicks = Math.min(MAX_CLICKS, asked);
    for (let k = 0; wantsClicks && k < maxClicks && Date.now() - started < TOTAL_MS - 20_000; k++) {
      const listed = await driver.ask({ cmd: 'list' });
      const elements: Array<{ i: number; label: string }> = listed.ok ? listed.elements : [];
      if (!elements.length) break;
      const pick = await pickClick(goal, url, elements, steps);
      const el = pick === null ? null : elements.find((e) => e.i === pick);
      if (!el) break;
      if (FORBIDDEN_CLICK_RE.test(el.label)) {
        steps.push(`refused to click "${el.label}" (buying / signing up / sending is off limits)`);
        break;
      }
      const clicked = await driver.ask({ cmd: 'click', i: el.i });
      steps.push(clicked.ok ? `clicked "${el.label}"` : `couldn't click "${el.label}"`);
      if (clicked.url) url = clicked.url;
    }
    const page = await driver.ask({ cmd: 'read' });
    if (!page.ok) return { ok: false, error: page.error, steps, photos: [] };
    const wantsPhotos = /\b(?:pics?|pictures?|photos?|images?|look\s+at|see|show)\b/i.test(goal);
    const wantsVideo = /\b(?:video|vid|clip|watch|play)\b/i.test(goal);
    driver.close();
    const photos = wantsPhotos ? await describePhotos(page.images || []) : [];
    const video = wantsVideo ? await watchVideo(page.video || '', goal) : undefined;
    return { ok: true, steps, title: page.title, finalUrl: page.url, text: page.text, photos, video };
  } catch (err) {
    return { ok: false, error: `the page didn't load (${(err as Error).message.slice(0, 120)})`, steps, photos: [] };
  } finally {
    driver.close();
    busy = false;
  }
}

// What the specialist gets.
export function browseFacts(r: BrowseResult, goal: string): string {
  if (!r.ok) return `You tried to open the page for them but couldn't: ${r.error}. Say so plainly, in your voice.`;
  return [
    `You opened the page yourself in a browser for their request ("${goal}").`,
    r.steps.length ? `What you did: ${r.steps.join(' → ')}.` : '',
    `Page now: "${r.title}" (${r.finalUrl}).`,
    r.photos.length ? `Photos on the page (you looked at them): ${r.photos.map((p, i) => `${i + 1}) ${p}`).join(' ')}` : '',
    r.video ? `The video on the page (you watched it): ${r.video}` : '',
    `Text on the page:\n${r.text}`,
    '\nTell them what you did and what you found, answering what they asked — short, in your voice. Never claim a click or something you saw that is not listed above.',
  ].filter(Boolean).join('\n');
}
