/**
 * URL Fetcher — lets Nexus visit a specific link a user pastes and answer grounded in that page's
 * actual content, the same pattern liveSportsService.ts already uses for live data (fetch real
 * content, feed it into llmGroundedOrFallback as grounding, never let the model invent facts about
 * a page it never actually read).
 *
 * SSRF-safe by construction: this runs on Patrick's own Mac, on the same network as Ollama
 * (localhost:11434), the engine itself (localhost:3000), and anything else on his LAN. A URL is
 * user-controlled input reaching straight into this server's own fetch() — without a guard, someone
 * could paste "http://localhost:11434/api/tags" or "http://169.254.169.254/..." (the standard cloud
 * metadata endpoint address, harmless here since this isn't cloud-hosted, but blocked anyway on
 * principle) and have Nexus fetch and read back whatever's listening on an internal address.
 * resolveAndValidateHost() below resolves the hostname to its real IP (not just string-matching the
 * hostname text, which "localhost.attacker.com"-style tricks or a DNS record pointing a public-
 * looking name at 127.0.0.1 would defeat) and rejects loopback/private/link-local ranges before any
 * request is made.
 */

import { promises as dns } from 'dns';
import { stripHtmlTags } from './webSearchEngine';

export interface FetchedPage {
  status: 'success';
  url: string;
  title: string;
  content: string;
}

export interface FetchPageError {
  status: 'error';
  reason: 'invalid_url' | 'blocked_target' | 'unreachable' | 'not_html' | 'too_large' | 'timeout';
  detail?: string;
}

// Generous enough for a real article's worth of text (buildGroundingContext further caps whatever
// this returns to 650 chars/doc anyway — this is just the ceiling on what we bother extracting from
// the raw page at all, so a huge page doesn't get fully downloaded and parsed for nothing).
const MAX_CONTENT_CHARS = 6000;
const FETCH_TIMEOUT_MS = 10000;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB — real articles are a tiny fraction of this

function isPrivateOrReservedIp(ip: string): boolean {
  // IPv4
  const v4 = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])];
    if (a === 127) return true; // loopback
    if (a === 10) return true; // private
    if (a === 172 && b >= 16 && b <= 31) return true; // private
    if (a === 192 && b === 168) return true; // private
    if (a === 169 && b === 254) return true; // link-local (covers cloud metadata endpoint too)
    if (a === 0) return true; // "this network"
    return false;
  }
  // IPv6 — loopback, link-local, unique-local
  const lower = ip.toLowerCase();
  if (lower === '::1') return true;
  if (lower.startsWith('fe80:')) return true; // link-local
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // unique-local
  return false;
}

async function resolveAndValidateHost(hostname: string): Promise<{ ok: true } | { ok: false; detail: string }> {
  if (hostname === 'localhost') return { ok: false, detail: 'localhost is blocked' };
  let addresses: string[];
  try {
    const results = await dns.lookup(hostname, { all: true });
    addresses = results.map((r) => r.address);
  } catch (e: any) {
    return { ok: false, detail: `DNS lookup failed: ${e?.message || e}` };
  }
  if (addresses.length === 0) return { ok: false, detail: 'no DNS records' };
  for (const addr of addresses) {
    if (isPrivateOrReservedIp(addr)) {
      return { ok: false, detail: `resolves to a private/reserved address (${addr})` };
    }
  }
  return { ok: true };
}

// Matches the first http(s) URL in a message — deliberately simple (no query-string edge cases
// needed here, just "find a link the user pasted"), same style as the existing URL detection this
// codebase already has elsewhere for link-based checks.
const URL_REGEX = /https?:\/\/[^\s<>"')\]]+/i;

export function detectUrlInPrompt(prompt: string): string | null {
  const match = prompt.match(URL_REGEX);
  return match ? match[0].replace(/[.,;:!?]+$/, '') : null; // trim trailing sentence punctuation
}

/**
 * Fetches a user-supplied URL and extracts its readable text content, or a typed error explaining
 * why it couldn't. Never throws — every failure mode (bad URL, blocked target, timeout, non-HTML
 * response, oversized response) returns a normal FetchPageError instead, so callers can always fall
 * through to the ordinary reasoning pipeline rather than crash the request.
 */
export async function fetchUrlContent(rawUrl: string): Promise<FetchedPage | FetchPageError> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { status: 'error', reason: 'invalid_url' };
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { status: 'error', reason: 'invalid_url', detail: 'only http/https links are supported' };
  }

  const hostCheck = await resolveAndValidateHost(parsed.hostname);
  if (hostCheck.ok === false) {
    return { status: 'error', reason: 'blocked_target', detail: hostCheck.detail };
  }

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    // Redirects are followed by hand (max 4) so every hop is checked against private/loopback addresses too —
    // `redirect: 'follow'` would let a public page bounce the request to http://localhost:11434.
    let current = parsed;
    let res: Response | null = null;
    for (let hop = 0; hop < 5; hop++) {
      res = await fetch(current.toString(), {
        signal: controller.signal,
        redirect: 'manual',
        headers: {
          // A generic browser UA — some sites block requests with no/bot-looking UA outright.
          'User-Agent': 'Mozilla/5.0 (compatible; NexusAI/1.0; +https://github.com/monsieurpit/Nexus-AI-)',
          Accept: 'text/html,application/xhtml+xml',
        },
      });
      const location = res.status >= 300 && res.status < 400 ? res.headers.get('location') : null;
      if (!location) break;
      let next: URL;
      try {
        next = new URL(location, current);
      } catch {
        return { status: 'error', reason: 'unreachable', detail: 'bad redirect' };
      }
      if (next.protocol !== 'http:' && next.protocol !== 'https:') return { status: 'error', reason: 'blocked_target', detail: 'redirect to a non-http link' };
      const hopCheck = await resolveAndValidateHost(next.hostname);
      if (hopCheck.ok === false) return { status: 'error', reason: 'blocked_target', detail: `redirect: ${hopCheck.detail}` };
      current = next;
      if (hop === 4) return { status: 'error', reason: 'unreachable', detail: 'too many redirects' };
    }
    if (!res) return { status: 'error', reason: 'unreachable' };
    if (!res.ok) {
      return { status: 'error', reason: 'unreachable', detail: `HTTP ${res.status}` };
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      return { status: 'error', reason: 'not_html', detail: contentType || 'unknown content-type' };
    }
    const contentLength = Number(res.headers.get('content-length') || 0);
    if (contentLength > MAX_RESPONSE_BYTES) {
      return { status: 'error', reason: 'too_large' };
    }
    const html = await res.text();
    if (html.length > MAX_RESPONSE_BYTES) {
      return { status: 'error', reason: 'too_large' };
    }

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? stripHtmlTags(titleMatch[1]).slice(0, 200) : parsed.hostname;

    // Prefer <article>/<main> content when present — real articles/blog posts usually wrap their
    // actual body in one of these, and skipping straight to them avoids nav bars, cookie banners,
    // and footer links diluting the extracted text. Falls back to the whole <body> otherwise.
    const mainMatch = html.match(/<(?:article|main)[^>]*>([\s\S]*?)<\/(?:article|main)>/i);
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const rawSection = mainMatch?.[1] || bodyMatch?.[1] || html;
    const metaDesc = html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]*content=["']([^"']{10,400})["']/i)?.[1];
    const content = `${metaDesc ? `${stripHtmlTags(metaDesc)} — ` : ''}${stripHtmlTags(rawSection)}`.slice(0, MAX_CONTENT_CHARS);

    if (!content || content.length < 20) {
      return { status: 'error', reason: 'not_html', detail: 'no readable text content extracted' };
    }

    return { status: 'success', url: current.toString(), title, content };
  } catch (e: any) {
    if (e?.name === 'AbortError') return { status: 'error', reason: 'timeout' };
    return { status: 'error', reason: 'unreachable', detail: e?.message || String(e) };
  } finally {
    clearTimeout(timeoutHandle);
  }
}
