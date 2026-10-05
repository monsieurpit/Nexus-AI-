# Nexus v2: specialist router (2026-10-05)

## Why
v1 sent every message the same ~10,700-character instruction block (every rule for every situation) to a 4B model,
then a mechanical step topped replies up to "at least 5 swears". The model couldn't juggle "one line max, roast them,
swear 5 times" while writing correct code or prices, and the top-up produced the "shit, ... damn, ... goddamn" filler.
v2 picks ONE specialist per message; the model only gets the identity block plus that specialist's own detailed
instructions, settings and cleanup.

## The pieces (src/ai-engine/v2/)
- `specialists.ts` — the instructions. `IDENTITY` (who Nexus is, how he talks — shared by all) plus one detailed block
  per specialist, and each one's settings (temperature, length budget, thinking on/off, cleanup kind):

  | Specialist | For | Length | Thinking |
  |---|---|---|---|
  | chat | banter, greetings, compliments, insults, flirting, commands, hot takes, questions about Nexus | one line | off |
  | question | facts, explanations, advice, procedures | 1-3 sentences (all steps for a procedure) | off |
  | search | prices, news, weather, scores, "is it true that" — from a live search, prices in USD + CAD | 2-4 lines | off |
  | code | write / fix code: complete, working, one code block, true comments | as needed | on |
  | writing | summaries, drafts (formal = no swearing), translations, poems/stories/roasts | as asked | off |
  | maths | calculations, word problems, puzzles: final answer first, checked | short | on |
  | pc | builds (one part per line, fits the budget), parts advice, prices | as needed | off |
  | support | someone sad/stressed/grieving: warm, no crude asides, no insults | 1-3 sentences | off |

- `router.ts` — picks the specialist: (1) rules for certain cases (price question, code request, arithmetic, PC
  build, someone sad, commands, questions about Nexus); (2) otherwise compares the message BY MEANING with ~280
  labelled example messages (bge-m3 embeddings, the same embedding the knowledge search already makes, so no extra
  cost; vectors cached in `~/.nexus-router/examples.json`); (3) the model only picks if embeddings are down.
- `pipeline.ts` — gathers what the chosen specialist needs (chat: thread, known facts, slang meanings, date, his
  recent lines and asides to avoid; question: knowledge-base facts + a web search when needed; search: live results +
  Canadian stores for prices; maths: the calculator's verified answer; PC: PC facts, budget plan, price snapshot),
  generates, cleans up (`finalizeSpecialistReply` in rules/postProcess.ts — no swear floor), and rewrites a repeat once.

Safety checks, teaching, hex colours, links, weather/time and the bot-meta answers still run before v2, as in v1.
Québécois French and images go through v2 too (a short language note in their language ends the message; the image
description is given as something Nexus saw). The handlers that run before the router (who made you / rules / model,
"compliment me", live weather/time/places) keep their true facts but are worded by v2. Polish is back on since
2026-10-05 (it was switched off 2026-09-07 for bleeding into French): `looksPolish` now also has to beat the French
signal, so French is never taken for Polish; the Polish dictionary/spell-check (~175 MB) loads on the Mac engine only
when someone writes in Polish — Railway (the bot) never loads it.
Every entry point follows NEXUS_ROUTER (the bot's /api/v1/nexus, the website, /generate, /chat/completions), and the
engine log shows `engine=v2:<specialist>`, `engine=v2:facts` or `engine=v1` on every message.

## Switching
- Everyone: `NEXUS_ROUTER=v2` in `~/Library/LaunchAgents/com.nexus.engine.plist`, then
  `launchctl kickstart -k gui/$UID/com.nexus.engine`. Rollback: remove it (or `v1`) and restart.
- One request: `"routerVersion": "v2"` (or `"v1"`) in the `/api/v1/nexus` body (the test bank uses this).
- The reasoning trace shows `🧭 Router → <specialist>` with why it was picked.

## Test bank (scripts/eval/)
- `cases.ts` — ~190 real Discord messages (learning DB + reports) labelled with the kind of answer they need and what
  a good reply must / must not do, plus 4 repeat-loop conversations.
- `run.ts --router v1|v2 [--skip search] [--mode chat]` — runs them against the live engine one at a time and grades:
  stock lines, swear-filler piles, caps meltdowns, hostility toward nice/sad messages, length per kind, code blocks,
  real searches, correct maths answers, routing. `--skip search` saves the daily search quota (keyless: 100/day).
- `routeCheck.ts` — router accuracy only (no replies generated).

Results on 2026-10-05 (same 183 messages, live engine):

| | pass | chat | question | search | code | writing | maths | pc | support | avg time |
|---|---|---|---|---|---|---|---|---|---|---|
| v1 (old) | 146 (80%) | 101/122 | 18/21 | 6/8 | 2/6 | 2/5 | 8/9 | 6/7 | 3/5 | 7.6 s |
| v2 round 3 | 173 (95%) | 116/122 | 20/20 | 4/8* | 6/6 | 5/5 | 9/9 | 8/8 | 5/5 | 4.7 s |

\* the four search misses were the keyless search tier throttling the test's back-to-back searches (HTTP 429);
a free Tavily key (docs/web-search.md) removes that. Chat replies take ~1-2 s instead of ~7 s (the short, stable
instructions stay in Ollama's prompt cache). v2 is ON for everyone since 2026-10-05 (`NEXUS_ROUTER=v2`).

Latest run (2026-10-05, 185 messages incl. French/images, search cases skipped): v2 182/185 (98%), avg 4.7 s.
