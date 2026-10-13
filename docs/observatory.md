# Nexus Observatory

A private developer dashboard showing what Nexus is actually doing, plus automatic regression detection.

## Open it

- **Website:** `/observatory` (redirects to `/api/v1/observatory`), or `/api/v1/observatory` directly.
- **On the Mac:** `pat obs open`.
- **Token:** the same admin token as the learning page (`cat ~/.nexus-learning/admin-token`). It is entered once and kept in that browser only.
- **Without the token:** the page loads, but it holds no data. Every number comes from token-protected JSON.

## Terminal

```
pat obs                    summary of the last 24 h (alerts, latency, routing, tools, memory, RAM, quality)
pat obs --window 1h        1h | 6h | 24h | 7d   (add --eval to include test runs)
pat obs traces             the last requests with their trace IDs
pat obs trace <id>         one request, from the router to the final answer
pat obs check              look for regressions now
pat obs --json             raw JSON
```

`pat obs` runs `bun run scripts/observatory.ts` with the same arguments.

## Trace IDs

- Every `/api/v1/nexus` request gets a trace ID like `nx-mv69lgqb-168b97`.
- The ID is returned as `traceId` in the JSON and in the `X-Nexus-Trace` header.
- A trace contains:
  - the specialist, how it was routed (rule / meaning / model / orchestrator / fallback) and the router's confidence
  - the stage timings (queue, before router, router, context, reply, checks) and the outcome
  - any fallback and the retry count
  - the redacted step titles

## What's measured

| Area | Source |
|---|---|
| Latency by specialist and stage | each request's thought steps |
| Routing mix, low confidence, first guess overruled, clarifications, mixed messages | router step |
| Specialist failures and fallbacks (`code→question`…) | orchestrator steps |
| Memory accepted / rejected (by reason) / corrected / deleted (by reason) / expired | memory worker and personal memory |
| Tokens read and written, call time, model loads (load > 1.5 s), model errors | every Ollama call |
| RAM free, swap, engine memory, loaded models (RAM and VRAM), load and unload events | sampled every minute |
| Tool calls: web search, Python sandbox, browser, video, vision, compilers | each call: ok / empty / fail |
| Verification checks (code compiles, …) | ✅ / ❌ check steps |
| Live reply quality flags | the reply log (24 h) |
| Eval gate pass rate and regressed cases | `~/.nexus-eval/history.jsonl` |

## Privacy

- **Storage:** `~/.nexus-observatory/obs.db`, mode 600.
- **Kept:** numbers and labels only.
- **Never kept:** messages, replies, user IDs or search queries.
- **Redaction:** in step titles, quoted text, links, emails and long numbers are blanked.
- **Retention:** traces and RAM samples are kept 7 days; everything else 30 days.
- **Off switch:** `NEXUS_OBSERVATORY=off`.
- **Scripts and tests:** they never write to it. Recording starts only when the engine calls `startObservatory()`.

## Automatic regressions

Every 10 minutes, the last 2 hours of **real** traffic are compared with the 7 days before. Test runs never count. The detector raises an alert for:

- a slower median reply
- a slower p95 for any specialist
- more failed replies
- more fallbacks
- the router's first guess being overruled more often
- a failing tool
- a failing verification check
- model errors or reload churn
- RAM under 10 % free for 5 minutes
- the memory worker suddenly rejecting most of what it extracts
- more reply quality flags
- an eval gate run with regressed cases

An alert needs enough samples on both sides, and a jump that is big both relatively and absolutely. It closes by itself once the numbers are back to normal.

Where alerts appear:

- the engine log (`[observatory] REGRESSION: …`)
- the dashboard
- the engine's Discord log channel, when `DISCORD_LOG_WEBHOOK_URL` is set
