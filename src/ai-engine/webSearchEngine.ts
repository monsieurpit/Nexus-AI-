import { AISettings, KnowledgeItem, WebSearchResult } from '../types';
import { processForSearch, BM25Engine } from './bm25Engine';
import { isCasseurtMention } from './swearEngine';

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
    /^(?:can you|could you|please|hey|yo|bro|nexus|dude)\s+/i,
    /^(?:search on google for|search google for|google search for|search google|search for|look up on google|look up|google)\s+/i,
    /^(?:tell me about|tell me who|tell me what|tell me when|tell me where|tell me how|tell me why)\s+/i,
    /^(?:what is the latest on|what's the latest on|what do you know about|what is|whats|what's)\s+/i,
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
      console.warn(`[Google Search] HTTP ${response.status} returned for query "${query}"`);
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
      const titleMatch = block.match(/<a class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
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
        const snippet = snippetMatch ? stripHtmlTags(snippetMatch[1]) : '';

        if (title && snippet && rawUrl.startsWith('http')) {
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
    const results: WebSearchResult[] = [];

    for (const item of searchItems.slice(0, maxResults)) {
      const title = item.title;
      const snippet = stripHtmlTags(item.snippet || '');
      const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, '_'))}`;

      // Try to fetch full summary for rich context
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

      results.push({
        title: `${title} (Wikipedia)`,
        url: pageUrl,
        snippet: summaryText,
        source: 'wikipedia',
        domain: 'wikipedia.org',
      });
    }

    return results;
  } catch (err: any) {
    console.warn('[Wikipedia Search] Failed:', err?.message || err);
    return [];
  }
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
): Promise<{
  query: string;
  results: WebSearchResult[];
  totalSources: number;
  engineUsed: string;
}> {
  const query = extractSearchQuery(rawPrompt);
  const limit = options.limit || 5;
  const provider = options.provider || 'all';

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

  for (const s of settled) {
    if (s.status === 'fulfilled' && Array.isArray(s.value)) {
      for (const item of s.value) {
        const cleanUrl = item.url.replace(/[?#].*$/, '').toLowerCase();
        if (!seenUrls.has(cleanUrl) && item.snippet && item.title) {
          seenUrls.add(cleanUrl);
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

  return {
    query,
    results: finalResults,
    totalSources: finalResults.length,
    engineUsed: provider === 'all' ? 'Google Web + DuckDuckGo + Wikipedia (Free Infinite Engine)' : provider,
  };
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

/**
 * Determines whether the user query should automatically trigger a live Google web search.
 * Strictly prevents searching for conversational chit-chat (e.g. "how are you doing", "what's up"),
 * greetings, insults (e.g. "fuck you"), feelings, roasts, or math.
 * Triggers primarily for finding the meaning of something, explicit search requests, or current event lookups.
 */
export function shouldTriggerLiveWebSearch(
  query: string,
  settings?: AISettings,
  matchedKnowledgeScore?: number
): boolean {
  if (settings?.webSearchMode === 'disabled') return false;
  if (settings?.webSearchMode === 'always') return true;

  const q = query.toLowerCase().trim();

  // 1. NEVER SEARCH: Insults, curses, and toxicity (handled directly by Discord crashout/roast engine)
  const isInsult =
    /\b(?:fuck\s+(?:you|u|off)|go\s+fuck\s+yourself|screw\s+(?:you|u)|shut\s+(?:the\s+fuck\s+)?up|stfu|kys|kill\s+yourself|eat\s+shit|suck\s+my\s+dick|you\s+suck|you'?re\s+(?:trash|dumb|stupid|bad|ass|clown)|dumb\s+bot|bitch|idiot|clown|moron|spierdalaj|wypierdalaj|zamknij\s+mord[eę]|chuj)\b/i.test(
      q
    );
  if (isInsult) return false;

  // 2. NEVER SEARCH: Conversational chit-chat, greetings, small-talk, and personal inquiries
  const isConversational =
    /^(?:yo|wassup|wazzup|what'?s\s*up|whats\s*up|what\s*up|sup|hey|hello|hi|howdy|good\s*(?:morning|afternoon|evening|night))\b/i.test(q) ||
    /(?:how\s+are\s+(?:you|u)|how\s+you\s+doing|how\s+u\s+doing|how'?s\s+it\s+going|hows\s+it\s+going|how\s+you\s+been|hru|wyd|what\s+are\s+you\s+doing|wym|wdym|what\s+do\s+you\s+mean)/i.test(q) ||
    /^(?:who\s+are\s+you|what\s+are\s+you|what\s+is\s+your\s+name|who\s+made\s+you|who\s+created\s+you|tell\s+me\s+about\s+yourself|are\s+you\s+real|are\s+you\s+an\s+ai|what\s+can\s+you\s+do|help\s+me)\b/i.test(q) ||
    /^(?:thanks|thank\s+you|thx|ty|appreciate\s+it|much\s+appreciated|bye|goodbye|cya|see\s+ya|see\s+you)\b/i.test(q) ||
    /^(?:lol|lmao|lmfao|haha|hahaha|xd|fr|fr\s+fr|no\s+cap|ong|facts|ok|okay|nice|cool)\b/i.test(q) ||
    /(?:tell\s+me\s+a\s+joke|make\s+me\s+laugh|roast\s+me|can\s+you\s+swear|say\s+fuck)\b/i.test(q);

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
  if (isMeaningSearch) return true;

  // 5. TRIGGER: Explicit user requests to search Google or the web
  const isExplicitSearch =
    /(?:search\s+google|search\s+on\s+google|google\s+search|search\s+the\s+web|look\s+up\s+on\s+google|look\s+up\s+|search\s+for\s+|find\s+info\s+on|google\s+)/i.test(q);
  if (isExplicitSearch) return true;

  // 6. TRIGGER: Specific real-time / current events, recent releases, sports finals, or live lookups
  const isCurrentEventOrLiveLookup =
    /(?:latest\s+news|breaking\s+news|what\s+happened\s+in|who\s+won\s+the\s+202|release\s+date\s+of|stock\s+price\s+of|price\s+of\s+bitcoin|weather\s+in|who\s+played\s+in|2024\s+ucl\s+final|2024\s+champions\s+league)/i.test(q);
  if (isCurrentEventOrLiveLookup) return true;

  // For all other standard knowledge queries, rely on internal knowledge base
  return false;
}
