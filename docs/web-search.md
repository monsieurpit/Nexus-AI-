# Live web search (Tavily)

Nexus reads Wikipedia, but Google and DuckDuckGo block automated searches, so anything current
(prices, news, last night's score, "what's happening with X") used to get an invented number or "I
don't know". Live search uses [Tavily](https://tavily.com) — an API built for AI agents — and it has a
**keyless mode: no account, no API key, no card.** It's on by default; nothing to set up.

## What you need to do

Nothing. If the keyless rate limit ever gets hit (you'll see one warning in the engine log and
`/api/health` → `webSearch.pausedUntil`), sign up for a **free key** at https://app.tavily.com — 1,000
searches a month, **no credit card required** — and save it on the Mac that runs the engine:

```
mkdir -p ~/.nexus-search && chmod 700 ~/.nexus-search
read -s "K?Paste the Tavily key, then press Enter: " && printf '%s' "$K" > ~/.nexus-search/tavily-api-key; unset K; echo
chmod 600 ~/.nexus-search/tavily-api-key
```

The engine picks it up within a minute (no restart). The key lives only on the Mac — never in the repo
or on Railway. Check: `curl -s localhost:3000/api/health` → `"webSearch": {"mode": "key", ...}`.

## Limits and safety

- **900 searches a month, 100 a day** (`TAVILY_MONTHLY_LIMIT` / `TAVILY_DAILY_LIMIT`), 30 a minute —
  counted before each request, saved in `~/.nexus-search/search-usage.json`. A spam run can't use the
  month up in one day. The learning system may use at most 30% of the month.
- Results are cached 10 minutes, so repeated questions cost nothing.
- Rate limited / bad key / server error → live search pauses (5 min / 1 h / 1 min) and logs one
  warning; Nexus keeps answering from Wikipedia and the corpus exactly as before.
- `NEXUS_WEB_SEARCH=off` switches it off entirely.
- **Privacy:** the search *query* (derived from a Discord message) is sent to Tavily; nothing else is.

## How it's used

- Chat: questions about recent events, prices, scores, exchange rates, "latest", "what's happening
  with…", explicit "look it up", and questions the corpus is weak on. Trusted sources (Wikipedia, major
  news, .gov/.edu, sports bodies) rank first. Search-result text is untrusted: snippets that look like
  instructions to the model are dropped.
- Learning: verifies against Wikipedia first, and only falls back to live search for **trusted sources
  only** — a random website can never make Nexus learn something. Live data (prices, scores, weather,
  "today") is never learned, only looked up live each time.

## Automatic PC price snapshot (`src/ai-engine/priceTracker.ts`)

There is no free official price API for PC parts, so Nexus builds his own snapshot from this same live search: about once
a week (checked every 6 hours, first try 3 minutes after the engine starts) it searches ~28 key parts (GPUs, CPUs, RAM
kits, SSDs, PSUs) on retailer sites (Newegg, Best Buy, Micro Center, Amazon, B&H, Canada Computers, Memory Express...),
takes one price per listing, rejects implausible values, and keeps the **median** and the typical low-high range when 2+ listings agree.
Saved in `~/.nexus-prices/prices.json`. PC answers and build lessons then get "LIVE PRICE SNAPSHOT (updated YYYY-MM-DD)"
lines for the parts in the question; parts without enough listings fall back to the corpus ranges.

- Cost: ~30-60 searches a week (the cap is 900/month); it stops when the daily budget is mostly used, when the keyless
  rate limit pauses search, and retries 20 minutes later (up to 6 times).
- Local-admin endpoints (same guard as the model endpoints): `GET /api/v1/prices/snapshot`,
  `POST /api/v1/prices/refresh` (optional body `{"only":"rtx-5080,ddr5-32gb-6000"}`).
- `NEXUS_PRICE_TRACKER=off` disables it. Coverage is partial: search snippets of retail pages often have no price, so a
  free Best Buy Products API key (no card) would give far better data if you want it.
