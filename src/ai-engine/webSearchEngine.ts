import { AISettings, KnowledgeItem, WebSearchResult } from '../types';
import { processForSearch, BM25Engine } from './bm25Engine';
import { isCasseurtMention, detectUserInsult } from './swearEngine';
import { postToDiscordLog } from './discordLogWebhook';

/**
 * Autonomous Zero-API-Key Web Search Engine
 *
 * Implements real live web searching across Google Web, DuckDuckGo, and Wikipedia
 * without requiring any paid Google Custom Search SDKs, API keys, or external AI models.
 * Unlimited queries, infinite quota, 100% free and client/server executable.
 */

// Helper to sanitize HTML tags and decode entities
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cleans conversational noise from user prompts to generate crisp search keywords
 * e.g. "can you search on google who won the 2024 champions league?" -> "who won the 2024 champions league"
 */
export function extractSearchQuery(prompt: string): string {
  let cleaned = prompt.trim();

  // Remove common conversational query prefixes & fillers
  const prefixesToRemove = [
    /^(?:can you|can u|could you|could u|please|hey|yo|bro|nexus|dude)\s+/i,
    // "can u send me Donald Tusk?" left "send me Donald Tusk" — filler verbs like this dilute a
    // short entity-name query with noise words that outweigh the actual name in a keyword search,
    // which is exactly the kind of query that most needs its real subject isolated cleanly.
    /^(?:send me|give me|show me|pull up|find me)\s+/i,
    // "search on google for X" AND bare "search on google X" (no "for") both need their own
    // alternative — the module doc's own example, "can you search on google who won the 2024
    // champions league?", has no "for" in it and fell through every alternative unmatched,
    // leaving "search on google" stuck on the front of the query sent to the search engines.
    /^(?:search on google for|search on google|search google for|google search for|search google|search for|look up on google|look up|google)\s+/i,
    /^(?:tell me about|tell me who|tell me what|tell me when|tell me where|tell me how|tell me why)\s+/i,
    /^(?:what is the latest on|what's the latest on|what do you know about|what is|whats|what's)\s+/i,
    /^(?:who\s+is|who\s+was|whos|who's)\s+/i,
    /^(?:do you know|can you find|find out|give me info on|give me information about)\s+/i,
    /^(?:i told him|i asked|someone asked|tell me)\s+/i,
  ];

  for (const prefix of prefixesToRemove) {
    cleaned = cleaned.replace(prefix, '').trim();
  }

  // Clean conversational profanities/fillers embedded inside search questions
  // e.g., "what the hell happened" -> "what happened", "what the fuck is" -> "what is"
  cleaned = cleaned
    .replace(/\b(?:what|who|where|when|why|how)\s+the\s+(?:hell|fuck|shit|heck)\b/gi, (match) => {
      return match.split(/\s+/)[0];
    })
    .replace(/\b(?:the\s+fuck|the\s+hell|fucking|damn|ass|kurwa)\b/gi, '')
    .replace(/[?!.]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || prompt.trim();
}

/**
 * 1. Google Web Search (Direct HTML Scraping - 0 API Keys, 0 Paid SDKs, Infinite Quota)
 */
export async function searchGoogleDirect(query: string, maxResults: number = 5): Promise<WebSearchResult[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://www.google.com/search?q=${encodedQuery}&hl=en&gl=us&num=${Math.max(maxResults * 2, 8)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(searchUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const msg = `[Google Search] HTTP ${response.status} returned for query "${query}"`;
      console.warn(msg);
      postToDiscordLog(msg, 'warn');
      return [];
    }

    const html = await response.text();
    const results: WebSearchResult[] = [];

    // 0. Extract Google Featured Snippet / AI Overview / Direct Answer Box if present
    const featuredSnippetRegexes = [
      /<div[^>]*class="[^"]*(?:hgKElc|IZ6rdc|LGOjhe|kno-rdesc|Z0LcW|O5uR6d|yXK7lf)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<div[^>]*data-attrid="wa:\/description"[^>]*>([\s\S]*?)<\/div>/i,
      /<div[^>]*class="[^"]*(?:BNeawe iBp4fe AP7Wnd|BNeawe s3v9rd AP7Wnd)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<span[^>]*class="[^"]*(?:hgKElc|aCOpRe)[^"]*"[^>]*>([\s\S]*?)<\/span>/i,
    ];

    for (const fsRegex of featuredSnippetRegexes) {
      const fsMatch = html.match(fsRegex);
      if (fsMatch) {
        const directText = stripHtmlTags(fsMatch[1]);
        if (directText && directText.length > 25) {
          results.push({
            title: `Google Direct Answer / Overview: ${query}`,
            url: `https://www.google.com/search?q=${encodedQuery}`,
            snippet: directText,
            source: 'google',
            domain: 'google.com (Quick Answer / AI Overview)',
          });
          break;
        }
      }
    }

    // Parse Google Organic Result blocks
    // Google structures results inside <div class="g"> or <div> containing <h3> and <a>
    const blockRegex = /<div class="g"[^>]*>([\s\S]*?)<\/div>(?=(?:<div class="g"|<\/div>\s*<\/div>\s*<div id="foot))/gi;
    let blockMatch;

    while ((blockMatch = blockRegex.exec(html)) !== null && results.length < maxResults) {
      const blockHtml = blockMatch[1];

      // Extract Link & Title: <a href="https://..." ...><h3 ...>Title</h3></a>
      const linkMatch = blockHtml.match(/<a\s+(?:[^>]*?\s+)?href=["'](https?:\/\/[^"'>]+)["'][^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/i);
      if (linkMatch) {
        const rawUrl = linkMatch[1];
        const rawTitle = linkMatch[2];

        // Skip internal google links
        if (rawUrl.includes('google.com') || rawUrl.includes('webcache.googleusercontent.com')) {
          continue;
        }

        const title = stripHtmlTags(rawTitle);
        if (!title) continue;

        // Extract Snippet
        let snippet = '';
        const snippetMatch =
          blockHtml.match(/<div[^>]*class="[^"]*(?:VwiC3b|yXK7lf|MUxGbd|aCOpRe)[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
          blockHtml.match(/<span[^>]*class="[^"]*(?:aCOpRe|hgKElc)[^"]*"[^>]*>([\s\S]*?)<\/span>/i);

        if (snippetMatch) {
          snippet = stripHtmlTags(snippetMatch[1]);
        } else {
          // Fallback: extract text after h3
          const afterH3 = blockHtml.split(/<\/h3>/i)[1] || '';
          snippet = stripHtmlTags(afterH3).slice(0, 240);
        }

        let domain = '';
        try {
          domain = new URL(rawUrl).hostname.replace(/^www\./, '');
        } catch {
          domain = 'web';
        }

        if (snippet.length > 20) {
          results.push({
            title,
            url: rawUrl,
            snippet,
            source: 'google',
            domain,
          });
        }
      }
    }

    // Fallback: if block regex missed due to layout changes, extract via general <h3> and <a> patterns
    if (results.length === 0) {
      const genericH3Regex = /<a\s+href="\/url\?q=(https?:\/\/[^"&]+)&amp;[^"]*"[^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/gi;
      let gMatch;
      while ((gMatch = genericH3Regex.exec(html)) !== null && results.length < maxResults) {
        const rawUrl = decodeURIComponent(gMatch[1]);
        const title = stripHtmlTags(gMatch[2]);
        const snippet = stripHtmlTags(gMatch[3]);
        if (title && snippet && !rawUrl.includes('google.com')) {
          let domain = '';
          try {
            domain = new URL(rawUrl).hostname.replace(/^www\./, '');
          } catch {
            domain = 'web';
          }
          results.push({
            title,
            url: rawUrl,
            snippet: snippet.slice(0, 260),
            source: 'google',
            domain,
          });
        }
      }
    }

    return results;
  } catch (err: any) {
    console.warn('[Google Search] Failed:', err?.message || err);
    postToDiscordLog(`[Google Search] Failed: ${err?.message || err}`, 'warn');
    return [];
  }
}

/**
 * 2. DuckDuckGo HTML / Lite Search (Fast, direct, 0 API key fallback)
 */
export async function searchDuckDuckGoDirect(query: string, maxResults: number = 5): Promise<WebSearchResult[]> {
  try {
    const encoded = encodeURIComponent(query);
    const url = `https://html.duckduckgo.com/html/?q=${encoded}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    clearTimeout(timeoutId);

    if (!resp.ok) return [];

    const html = await resp.text();
    const results: WebSearchResult[] = [];

    // Parse DuckDuckGo result blocks
    const resultBlockRegex = /<div class="result\s+results_links[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
    let match;

    while ((match = resultBlockRegex.exec(html)) !== null && results.length < maxResults) {
      const block = match[1];

      // Extract title and URL
      // Attribute order on the DDG-served anchor is `<a rel="nofollow" class="result__a" href="...">`,
      // not class-then-href — a regex anchored on "<a class=..." right after "<a " never matched a
      // single real result, silently dropping every DuckDuckGo response.
      const titleMatch = block.match(/<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
      const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i);

      if (titleMatch) {
        let rawUrl = titleMatch[1];
        // Decode DuckDuckGo redirect URL
        if (rawUrl.includes('uddg=')) {
          const uMatch = rawUrl.match(/uddg=([^&]+)/);
          if (uMatch) {
            rawUrl = decodeURIComponent(uMatch[1]);
          }
        }

        const title = stripHtmlTags(titleMatch[2]);
        // Some DDG result types (list-page/disambiguation-style results in particular) simply
        // don't render a result__snippet element at all — requiring one to be non-empty silently
        // dropped an otherwise perfectly good title+URL match entirely, sometimes discarding the
        // single most relevant result on the page.
        const snippet = snippetMatch ? stripHtmlTags(snippetMatch[1]) : '';

        if (title && rawUrl.startsWith('http')) {
          let domain = '';
          try {
            domain = new URL(rawUrl).hostname.replace(/^www\./, '');
          } catch {
            domain = 'duckduckgo';
          }

          results.push({
            title,
            url: rawUrl,
            snippet,
            source: 'duckduckgo',
            domain,
          });
        }
      }
    }

    return results;
  } catch (err: any) {
    console.warn('[DuckDuckGo Search] Failed:', err?.message || err);
    postToDiscordLog(`[DuckDuckGo Search] Failed: ${err?.message || err}`, 'warn');
    return [];
  }
}

/**
 * 3. Wikipedia Knowledge Search (Direct open encyclopedia API - 0 keys, infinite quota)
 */
export async function searchWikipediaKnowledge(query: string, maxResults: number = 3): Promise<WebSearchResult[]> {
  try {
    const searchApiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      query
    )}&utf8=&format=json&origin=*&srlimit=${maxResults * 2}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const resp = await fetch(searchApiUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'CustomNexusAI/2.0 (Autonomous Cognitive Agent; zero-api-search)',
        Accept: 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!resp.ok) return [];

    const data = await resp.json();
    const searchItems = data?.query?.search || [];

    // Fetch each result's full summary in parallel instead of one-at-a-time — sequential
    // awaits here meant 3 results took 3x as long as necessary for zero benefit, since the
    // summary fetches are fully independent of each other.
    const results = await Promise.all(
      searchItems.slice(0, maxResults).map(async (item: any): Promise<WebSearchResult> => {
        const title = item.title;
        const snippet = stripHtmlTags(item.snippet || '');
        const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, '_'))}`;

        let summaryText = snippet;
        try {
          const sumResp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, {
            headers: { 'User-Agent': 'CustomNexusAI/2.0' },
          });
          if (sumResp.ok) {
            const sumData = await sumResp.json();
            if (sumData.extract) {
              summaryText = sumData.extract;
            }
          }
        } catch {
          // use basic snippet
        }

        return {
          title: `${title} (Wikipedia)`,
          url: pageUrl,
          snippet: summaryText,
          source: 'wikipedia',
          domain: 'wikipedia.org',
        };
      })
    );

    return results;
  } catch (err: any) {
    console.warn('[Wikipedia Search] Failed:', err?.message || err);
    postToDiscordLog(`[Wikipedia Search] Failed: ${err?.message || err}`, 'warn');
    return [];
  }
}

// Short-lived cache so a burst of near-identical questions (common in a busy Discord channel)
// doesn't re-scrape Google/DuckDuckGo/Wikipedia for the same query within a few minutes.
const SEARCH_CACHE_TTL_MS = 3 * 60 * 1000;
const searchResultCache = new Map<string, { expiresAt: number; value: UnifiedSearchResponse }>();

function normalizeTitleForDedup(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s*[-|–—]\s*(?:wikipedia|the free encyclopedia).*$/i, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

interface UnifiedSearchResponse {
  query: string;
  results: WebSearchResult[];
  totalSources: number;
  engineUsed: string;
}

/**
 * Unified Live Web Search Orchestrator
 * Queries Google, DuckDuckGo, and Wikipedia concurrently, merges & deduplicates,
 * and returns ranked results without touching external AI APIs or paid SDKs.
 */
export async function executeUnifiedWebSearch(
  rawPrompt: string,
  options: {
    limit?: number;
    provider?: 'all' | 'google' | 'duckduckgo' | 'wikipedia';
    includeWikipedia?: boolean;
  } = {}
): Promise<UnifiedSearchResponse> {
  const query = extractSearchQuery(rawPrompt);
  const limit = options.limit || 5;
  const provider = options.provider || 'all';

  const cacheKey = `${provider}::${limit}::${query.toLowerCase()}`;
  const cached = searchResultCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const promises: Promise<WebSearchResult[]>[] = [];

  if (provider === 'google' || provider === 'all') {
    promises.push(searchGoogleDirect(query, limit));
  }
  if (provider === 'duckduckgo' || provider === 'all') {
    promises.push(searchDuckDuckGoDirect(query, limit));
  }
  if (provider === 'wikipedia' || provider === 'all' || options.includeWikipedia) {
    promises.push(searchWikipediaKnowledge(query, 3));
  }

  const settled = await Promise.allSettled(promises);
  const allResults: WebSearchResult[] = [];
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();

  for (const s of settled) {
    if (s.status === 'fulfilled' && Array.isArray(s.value)) {
      for (const item of s.value) {
        const cleanUrl = item.url.replace(/[?#].*$/, '').toLowerCase();
        const normalizedTitle = normalizeTitleForDedup(item.title);
        // Skip exact URL repeats and near-duplicate titles (different engines frequently
        // surface the same page via different URLs — e.g. with/without a trailing slash,
        // a mobile subdomain, or a tracking-parameter variant that the URL-only check misses).
        if (
          !seenUrls.has(cleanUrl) &&
          !(normalizedTitle && seenTitles.has(normalizedTitle)) &&
          item.snippet &&
          item.title
        ) {
          seenUrls.add(cleanUrl);
          if (normalizedTitle) seenTitles.add(normalizedTitle);
          allResults.push(item);
        }
      }
    }
  }

  // Score relevance of search results against query terms
  const queryTerms = processForSearch(query);
  const scored = allResults.map((r) => {
    let score = 1.0;
    const lowerTitle = r.title.toLowerCase();
    const lowerSnippet = r.snippet.toLowerCase();

    for (const term of queryTerms) {
      if (lowerTitle.includes(term)) score += 2.5;
      if (lowerSnippet.includes(term)) score += 1.2;
    }

    // Boost Wikipedia and trusted sources for factual accuracy
    if (r.source === 'wikipedia') score += 1.5;
    if (r.domain?.includes('.gov') || r.domain?.includes('.edu') || r.domain?.includes('.org')) score += 0.8;

    return { ...r, score };
  });

  scored.sort((a, b) => (b.score || 0) - (a.score || 0));
  const finalResults = scored.slice(0, limit);

  const response: UnifiedSearchResponse = {
    query,
    results: finalResults,
    totalSources: finalResults.length,
    engineUsed: provider === 'all' ? 'Google Web + DuckDuckGo + Wikipedia (Free Infinite Engine)' : provider,
  };

  // Only cache genuine hits — an empty result (e.g. a transient scrape failure) shouldn't be
  // remembered for 3 minutes and starve a retry that might actually succeed.
  if (finalResults.length > 0) {
    if (searchResultCache.size > 200) {
      const oldestKey = searchResultCache.keys().next().value;
      if (oldestKey) searchResultCache.delete(oldestKey);
    }
    searchResultCache.set(cacheKey, { expiresAt: Date.now() + SEARCH_CACHE_TTL_MS, value: response });
  }

  return response;
}

/**
 * Converts Web Search results into KnowledgeItems for the reasoning engine
 */
export function convertSearchResultsToKnowledgeItems(
  results: WebSearchResult[],
  query: string
): KnowledgeItem[] {
  return results.map((res, index) => {
    return {
      id: `web-search-${Date.now()}-${index}`,
      title: res.title,
      category: 'web-search',
      keywords: processForSearch(res.title + ' ' + query),
      content: `${res.snippet} (Source: ${res.domain || res.source} - ${res.url})`,
      createdAt: Date.now(),
    };
  });
}

export type WebSearchTriggerReason =
  | 'always'
  | 'meaning'
  | 'explicit'
  | 'current-events'
  | 'low-confidence-fallback'
  | false;

/**
 * Determines whether the user query should automatically trigger a live Google web search,
 * and why. Strictly prevents searching for conversational chit-chat (e.g. "how are you doing",
 * "what's up"), greetings, insults (e.g. "fuck you"), feelings, roasts, or math.
 * Triggers primarily for finding the meaning of something, explicit search requests, current
 * event lookups, or as a last-resort fallback when the local corpus has no confident match.
 * The returned reason is falsy when no search should happen, and truthy (a non-empty string)
 * otherwise, so `if (shouldTriggerLiveWebSearch(...))` still works as a plain boolean check.
 *
 * `matchedConfidence` must be a 0-1 confidence score (see reasoningEngine.ts's
 * assessCorpusConfidence/computeConfidence), NOT a raw BM25 score. Raw scores don't work here:
 * on a corpus this size, even irrelevant queries ("what does yeet mean", random gibberish) land
 * a top BM25 score of 4-8 against some unrelated document — the number reflects generic word
 * overlap, not whether the match is actually relevant, so a raw-score threshold never fires.
 */
export function shouldTriggerLiveWebSearch(
  query: string,
  settings?: AISettings,
  matchedConfidence?: number
): WebSearchTriggerReason {
  if (settings?.webSearchMode === 'disabled') return false;
  if (settings?.webSearchMode === 'always') return 'always';

  const q = query.toLowerCase().trim();

  // 1. NEVER SEARCH: Insults, curses, and toxicity (handled directly by Discord crashout/roast engine)
  // Reuses swearEngine's detectUserInsult instead of maintaining a second, separately-drifting
  // insult list — this file used to have its own copy that (like swearEngine's) was missing bare
  // "fuck yourself" (only "go fuck yourself"), so telling the bot to fuck itself triggered a live
  // Google search for the word "fuck" instead of being recognized as hostility directed at it.
  // One list now, so a fix to either detection path can't silently miss the other.
  if (detectUserInsult(q)) return false;

  // 2. NEVER SEARCH: Conversational chit-chat, greetings, small-talk, and personal inquiries
  const isConversational =
    /^(?:yo|wassup|wazzup|what'?s\s*up|whats\s*up|what\s*up|sup|hey|hello|hi|howdy|good\s*(?:morning|afternoon|evening|night))\b/i.test(q) ||
    /(?:how\s+are\s+(?:you|u)|how\s+you\s+doing|how\s+u\s+doing|how'?s\s+it\s+going|hows\s+it\s+going|how\s+you\s+been|hru|wyd|what\s+are\s+you\s+doing|wym|wdym|what\s+do\s+you\s+mean)/i.test(q) ||
    /^(?:who\s+are\s+you|what\s+are\s+you|what\s+is\s+your\s+name|who\s+made\s+you|who\s+created\s+you|tell\s+me\s+about\s+yourself|are\s+you\s+real|are\s+you\s+an\s+ai|what\s+can\s+you\s+do|help\s+me)\b/i.test(q) ||
    /^(?:thanks|thank\s+you|thx|ty|appreciate\s+it|much\s+appreciated|bye|goodbye|cya|see\s+ya|see\s+you)\b/i.test(q) ||
    /^(?:lol|lmao|lmfao|haha|hahaha|xd|fr|fr\s+fr|no\s+cap|ong|facts|ok|okay|nice|cool)\b/i.test(q) ||
    /(?:tell\s+me\s+a\s+joke|make\s+me\s+laugh|roast\s+me|can\s+you\s+swear|say\s+fuck)\b/i.test(q) ||
    // Personal questions/banter directed AT the bot ("why are you here", "are you gay", "do you
    // like X", "you freak") aren't factual lookups — there's nothing on the web that answers them,
    // so a corpus miss here should fall through to a normal conversational reply, not a web search
    // for whatever topic word happens to be in the sentence (e.g. searching for the literal song
    // "Right Now" because someone asked "do you like the songs playing right now").
    /^(?:why\s+are\s+(?:you|u)|why\s+do\s+(?:you|u)|are\s+(?:you|u))\b/i.test(q) ||
    // "do u" (not just "do you") — observed live: "do u like me" and "what do u think about X"
    // both slipped past this as literal search queries, rephrased as "Meaning of do u like me"
    // and rate-limited by Google (429) since neither is a real, searchable lookup — they're
    // personal opinion questions directed at the bot, same category as the "do you" case already
    // handled below, just in text-speak spelling.
    /\bdo\s+(?:you|u)\s+(?:like|love|hate|think|believe|even)\b/i.test(q) ||
    /\b(?:you|u)\s+(?:freak|weirdo|creep|dork|nerd|loser|goober)\b/i.test(q) ||
    // Polish opinion questions directed at the bot ("jak myślisz kto wygra..." = "what do you
    // think who'll win...", "co myślisz o..." = "what do you think about...") — same category as
    // the English "do you think" case above, just never had a Polish equivalent. Observed live:
    // one of these got rephrased into a literal (and unanswerable, it's not a real lookup) Google
    // search for "Meaning of jak myślisz kto wygra ligę mistrzów" and rate-limited (429).
    /\b(?:jak|co)\s+myślisz\b/i.test(q) ||
    /\btwoim\s+zdaniem\b/i.test(q) ||
    // "czy lubisz X" (do you like X) is always a personal preference question directed at the
    // bot, for ANY X — there's never a real "meaning" lookup to do regardless of what X is. This
    // used to require \w+\s+ after the verb, which kept resurfacing new 429s one phrasing at a
    // time: any X starting with a Polish diacritic ("lubisz łowić ryby", "lubisz walić konia" —
    // \w doesn't match ł/ą/ć/ę/ł/ń/ó/ś/ź/ż) or a non-word leading character (a mention like "czy
    // lubisz @Filip_123") failed to match at all, since \w+ requires at least one plain ASCII
    // word character immediately after the verb. The object never actually needs to be matched —
    // matching the verb alone (optionally negated: "nie lubisz") covers every phrasing, present
    // or future, including the bare verb with nothing after it. Mirrors the English "do you
    // like/love/hate" carve-out above; "kochasz"/"nienawidzisz" added for the same love/hate
    // symmetry.
    /\b(?:czy\s+)?(?:nie\s+)?(?:lubisz|kochasz|nienawidzisz)\b/i.test(q) ||
    // Polish greetings/small-talk ("jak tam u ciebie" = "how's it going with you", "co tam" =
    // "what's up", "co nowego" = "what's new", "jak leci"/"jak się masz" = "how are you") — the
    // same "how are you"/"what's up" English carve-out above never had Polish coverage at all.
    // Observed live: "jak tam u ciebie" got searched verbatim as "Meaning of jak tam u ciebie" and
    // rate-limited (429) — this keeps surfacing one new Polish small-talk phrasing at a time, so
    // this covers the common variants together instead of patching them one report at a time.
    /^(?:cześć|czesc|siema|siemka|hej|elo|witam)\b/i.test(q) ||
    // "tam" isn't always present by the time this runs (something upstream strips it in some
    // paths) — observed live, "jak tam u ciebie?" reached this function as "jak u ciebie" and slid
    // past the "tam" requirement, triggering the exact same 429 this whole block exists to avoid.
    // "tam" is now optional everywhere it appears instead of assumed present.
    /\bjak\s+(?:tam\s+)?(?:u\s+ciebie|leci|się\s+masz|się\s+miewasz)\b/i.test(q) ||
    /\bco\s+(?:tam\s+)?(?:nowego|słychać|slychac|u\s+ciebie)\b/i.test(q) || /^co\s+tam\b/i.test(q) ||
    /^(?:dzięki|dzieki|dziękuję|dziekuje|pa|do\s+zobaczenia|na\s+razie)\b/i.test(q) ||
    // Meta-commentary/questions about the bot's own swearing, in Polish ("będzie pierdolił po
    // polsku czaisz" = "[it]'ll be swearing in Polish, you get it") — observed live, got searched
    // verbatim as "Meaning of będzie pierdolił po polsku czaisz" and rate-limited (429). There's
    // nothing to look up here, it's banter about the bot's own behavior, same category as the
    // English swearing-related chit-chat this file never had a Polish equivalent for. "pierdol"
    // covers every inflected form (pierdoli/pierdolił/pierdolisz/pierdolenie/...).
    /\bpierdol[a-ząćęłńóśźż]*\b.*\bpolsku\b|\bpolsku\b.*\bpierdol[a-ząćęłńóśźż]*\b/i.test(q);

  if (isConversational) return false;

  // 3. NEVER SEARCH: Math calculations, code requests, and Casseurt roasts
  if (/\d+\s*[+\-*/÷×^%]\s*\d+/.test(q) || q.startsWith('solve ') || q.startsWith('calculate ') || q.startsWith('compute ')) {
    return false;
  }
  if (isCasseurtMention(q)) {
    return false;
  }
  if (/^(?:write\s+(?:a\s+)?(?:python|javascript|typescript|rust|c\+\+|code|script|function)|implement\s+|code\s+a)\b/i.test(q)) {
    return false;
  }

  // 4. TRIGGER: Finding the MEANING or DEFINITION of something
  const isMeaningSearch =
    /(?:what\s+is\s+the\s+meaning\s+of|what\s+does\s+.+\s+mean|meaning\s+of|definition\s+of|define\s+|what\s+is\s+the\s+definition\s+of|what\s+does\s+.+\s+stand\s+for|what\s+means\s+|meaning\s+behind)/i.test(q);
  if (isMeaningSearch) return 'meaning';

  // 5. TRIGGER: Explicit user requests to search Google or the web
  const isExplicitSearch =
    /(?:search\s+google|search\s+on\s+google|google\s+search|search\s+the\s+web|look\s+up\s+on\s+google|look\s+up\s+|search\s+for\s+|find\s+info\s+on|google\s+)/i.test(q);
  if (isExplicitSearch) return 'explicit';

  // 6. TRIGGER: Specific real-time / current events, recent releases, sports finals, or live lookups
  const isCurrentEventOrLiveLookup =
    /(?:latest\s+news|breaking\s+news|what\s+happened\s+in|who\s+won\s+the\s+202|release\s+date\s+of|stock\s+price\s+of|price\s+of\s+bitcoin|weather\s+in|who\s+played\s+in|2024\s+ucl\s+final|2024\s+champions\s+league)/i.test(q);
  if (isCurrentEventOrLiveLookup) return 'current-events';

  // 7. FALLBACK: Local corpus has no confident match — reach for the web instead of giving up.
  // Threshold calibrated against real corpus data: genuinely relevant matches average ~0.6,
  // irrelevant ones ~0.3, with the boundary sitting around 0.4.
  //
  // Only for messages that actually look like a question/information request in the first place.
  // A declarative statement addressed at the bot ("don't worry, everyone loves you") isn't a
  // greeting, an insult, or any other pattern this function already excludes — it's just not a
  // question at all, so it was falling all the way through to here and getting scored on
  // whatever unrelated corpus document happened to share the most keywords, then searched for
  // verbatim (producing e.g. an actual Google search for "everyone loves u" that came back with
  // completely unrelated Japanese-grammar and diss-track results). Nothing on the web answers a
  // statement that isn't asking anything, so require question-shape before ever reaching here.
  const looksLikeQuestion =
    q.includes('?') ||
    /^(?:what|who|when|where|why|how|which|is|are|was|were|does|do|did|can|could|will|would|should)\b/i.test(q);
  // A bare leading question word with nothing real after it ("Is nexus" gets trigger-word-stripped
  // down to just "Is" before this ever runs) still satisfied looksLikeQuestion above, then got
  // searched verbatim as "Meaning of Is" — a lookup for a stopword, rate-limited by Google (429)
  // for a query that was never answerable in the first place. Require at least one real word of
  // substance (4+ letters, so short but meaningful words like "cat" still count while bare "is"/
  // "are"/"do" alone don't) beyond the leading question word.
  const hasSubstantiveContent = q.replace(/^[a-ząćęłńóśźż]+\b/i, '').match(/[a-ząćęłńóśźż]{4,}/i) !== null;
  if (typeof matchedConfidence === 'number' && matchedConfidence < 0.42 && looksLikeQuestion && hasSubstantiveContent) {
    return 'low-confidence-fallback';
  }

  // For all other standard knowledge queries, rely on internal knowledge base
  return false;
}

/**
 * Builds the actual text sent to the search engines for a query that has already
 * been approved by shouldTriggerLiveWebSearch(). The low-confidence fallback case
 * gets rephrased as "Meaning of X" so the search engine returns a definition/explainer
 * instead of unrelated results for the raw (often conversational) user prompt.
 */
export function buildWebSearchQuery(query: string, reason: WebSearchTriggerReason): string {
  if (reason === 'low-confidence-fallback') {
    return `Meaning of ${query}`;
  }
  return query;
}
