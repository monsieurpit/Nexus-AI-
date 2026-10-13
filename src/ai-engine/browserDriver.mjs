// The browser half of browserAgent.ts, run with Node (2026-10-12): Bun's WebSocket hangs on Playwright's cloud-browser
// connection (connectOverCDP), Node connects in ~2 s. The engine starts this per page visit and sends one JSON command
// per line on stdin; each answer is one JSON line on stdout. Commands:
//   {"cmd":"open","url":"..."}            → {ok,title,url}
//   {"cmd":"list"}                        → {ok,elements:[{i,label}]}
//   {"cmd":"click","i":3}                 → {ok}
//   {"cmd":"type","i":2,"text":"..."}       → {ok}   (search / text boxes only, then Enter)
//   {"cmd":"read"}                        → {ok,title,url,text,images:[...],video}
//   {"cmd":"close"}                       → exits
// The URL rules (no local network, no adult sites) are checked by the engine AND here on every request.

import { chromium } from 'playwright';
import { createInterface } from 'readline';

const TOKEN = process.env.BROWSERLESS_TOKEN || '';
const ENDPOINT = process.env.BROWSERLESS_URL || 'wss://production-sfo.browserless.io';
const ADULT_RE = /(?:porn|xvideos|xnxx|xhamster|onlyfans|redtube|youporn|chaturbate|stripchat|brazzers|spankbang|rule34|hentai|nsfw)/i;

function blocked(raw) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    return true;
  }
  if (!/^(?:https?|data|blob):$/.test(u.protocol)) return true;
  if (!/^https?:$/.test(u.protocol)) return false;
  const h = u.hostname.toLowerCase();
  return /^(?:localhost|0\.0\.0\.0|\[?::1\]?)$/.test(h) || /\.(?:local|internal|lan|home)$/.test(h) || /^(?:127\.|10\.|192\.168\.|169\.254\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(h) || ADULT_RE.test(h + u.pathname);
}

const send = (o) => process.stdout.write(`${JSON.stringify(o)}\n`);
let browser = null;
let page = null;

async function open(url) {
  browser = TOKEN
    ? await chromium.connectOverCDP(`${ENDPOINT}?token=${encodeURIComponent(TOKEN)}&timeout=60000&blockAds=true`, { timeout: 25000 })
    : await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, acceptDownloads: false, locale: 'en-AU' });
  await context.route('**/*', (route) => (blocked(route.request().url()) ? route.abort() : route.continue()));
  page = await context.newPage();
  await page.goto(url, { timeout: 25000, waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  // Cookie banners hide the page: accept once if there is one.
  await page.locator('button:has-text("Accept all"), button:has-text("Accept"), button:has-text("I agree"), button:has-text("Agree"), button:has-text("OK")').first().click({ timeout: 1500 }).catch(() => undefined);
  return { ok: true, title: await page.title(), url: page.url() };
}

async function list() {
  const elements = await page.evaluate(() => {
    const out = [];
    let n = 0;
    // Search / text boxes too (typing is allowed there only — never password, email, phone or card fields).
    const SENSITIVE = /pass|email|e-mail|phone|tel|card|cc-|cvc|cvv|iban|ssn|otp|code|pin|user(?:name)?|login/i;
    for (const el of document.querySelectorAll('input[type="search"], input[type="text"], input:not([type]), textarea, a[href], button, [role="button"], [role="searchbox"], input[type="submit"], input[type="button"], summary, [onclick]')) {
      const r = el.getBoundingClientRect();
      const st = getComputedStyle(el);
      if (r.width < 4 || r.height < 4 || st.visibility === 'hidden' || st.display === 'none') continue;
      const isBox = el.matches('input[type="search"], input[type="text"], input:not([type]), textarea, [role="searchbox"]');
      if (isBox && SENSITIVE.test([el.getAttribute('type'), el.getAttribute('name'), el.getAttribute('id'), el.getAttribute('autocomplete'), el.getAttribute('placeholder'), el.getAttribute('aria-label')].join(' '))) continue;
      const raw = (el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.innerText || (isBox ? '' : el.value) || el.getAttribute('title') || el.getAttribute('alt') || (isBox ? 'search box' : '')).replace(/\s+/g, ' ').trim().slice(0, 70);
      if (!raw) continue;
      const label = isBox ? `[text box] ${raw}` : raw;
      el.setAttribute('data-nexus-id', String(n));
      out.push({ i: n, label, box: isBox });
      if (++n >= 60) break;
    }
    return out;
  });
  return { ok: true, elements };
}

async function click(i) {
  await page.locator(`[data-nexus-id="${i}"]`).first().click({ timeout: 5000 });
  await page.waitForLoadState('domcontentloaded', { timeout: 8000 }).catch(() => undefined);
  await page.waitForTimeout(1200);
  return { ok: true, url: page.url() };
}

async function type(i, text) {
  let el = page.locator(`[data-nexus-id="${i}"]`).first();
  const isBox = await el.evaluate((e) => e.matches('input[type="search"], input[type="text"], input:not([type]), textarea, [role="searchbox"]')).catch(() => false);
  // The picked box can vanish (a search box that only opens after clicking the icon): any visible search box will do.
  if (!isBox || !(await el.isVisible().catch(() => false))) {
    el = page.locator('input[type="search"]:visible, [role="searchbox"]:visible, input[name*="search" i]:visible, input[name="q"]:visible, input[placeholder*="search" i]:visible').first();
    if (!(await el.count())) return { ok: false, error: 'no search box' };
  }
  await el.fill(String(text).slice(0, 120), { timeout: 5000 });
  await el.press('Enter');
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => undefined);
  await page.waitForTimeout(2000);
  return { ok: true, url: page.url() };
}

async function read() {
  const data = await page.evaluate(() => {
    const images = Array.from(document.images)
      .filter((im) => im.naturalWidth >= 200 && im.naturalHeight >= 150 && im.getBoundingClientRect().width > 100)
      .sort((a, b) => b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight)
      .slice(0, 2)
      .map((im) => im.currentSrc || im.src);
    const v = document.querySelector('video');
    let video = v?.currentSrc || v?.src || document.querySelector('video source')?.src || '';
    if (!/^https?:/.test(video)) video = Array.from(document.querySelectorAll('iframe')).map((x) => x.src).find((x) => /youtube\.com\/embed|youtu\.be|player\.vimeo\.com/.test(x)) || '';
    return { text: (document.body?.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 3500), images, video };
  });
  return { ok: true, title: await page.title(), url: page.url(), ...data };
}

const rl = createInterface({ input: process.stdin });
const killer = setTimeout(() => process.exit(2), 75000);
rl.on('line', async (line) => {
  let c;
  try {
    c = JSON.parse(line);
  } catch {
    return send({ ok: false, error: 'bad command' });
  }
  try {
    if (c.cmd === 'open') send(blocked(c.url) ? { ok: false, error: 'blocked url' } : await open(c.url));
    else if (c.cmd === 'list') send(await list());
    else if (c.cmd === 'click') send(await click(c.i));
    else if (c.cmd === 'type') send(await type(c.i, c.text));
    else if (c.cmd === 'read') send(await read());
    else if (c.cmd === 'close') {
      await browser?.close().catch(() => undefined);
      clearTimeout(killer);
      process.exit(0);
    }
  } catch (err) {
    send({ ok: false, error: String(err?.message || err).slice(0, 200) });
  }
});
