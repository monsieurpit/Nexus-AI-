# "Prime Nexus" (2026-10-04)

Patrick's brief: short and concise answers, no repetitive loops, no hardcoded answers, real work when asked (code,
texts, summaries), lots of swearing, few errors, funny, British and gay.

## How a message is routed (src/ai-engine/reasoningEngine.ts, "PRIME NEXUS FRONT DOOR")
After the safety checks (child safety, hate, prompt injection, crisis, dox), in this order:

1. **Direct teaching** (`learning/teach.ts`): "nexus, here is how to ...", "learn this", "remember that" from one of
   Patrick's accounts (or `NEXUS_TEACHERS`) is saved as admin-verified learned facts (same safety rules as the rest of
   the learning system, removable on the review page). Nobody else can teach this way.
2. **Hex colours** (`rules/colorInfo.ts`): the colour is computed (RGB/HSL/name), the model gives its opinion.
3. **Links** (`urlSkills.ts`): pages are read (SSRF-safe, every redirect checked), YouTube via oEmbed, and Discord bot
   invite / OAuth2 links are DECODED (client id, permissions — 8 = Administrator — scopes), never answered with code.
4. **Explicit web searches** ("search the web for ...", "price of X right now"): live Tavily search, answer from the
   results with USD and roughly CAD. Nexus never says he can't search.
5. **Maths word problems** (`isWordProblem`): thinking on (even on Discord), the final answer always written first.
6. **Tasks** (`classifyMessageMode` -> task): code, summaries, drafts, translations are done completely, never cut to
   chat length. Code blocks are never touched by post-processing.
7. PC build lessons / PC answers, body count, "which game were we playing", quick chat (wyd/hru/...), follow-ups.
8. **Prime chat**: everything classified as chat gets ONE short model-written line (max ~2 short sentences), with
   meaning hints for slang ("wanna crack?" = goon, "good boy", "go to sleep", 😭...), the date/time, the persona facts,
   real coin flips and dice rolls, and the list of his recent lines to avoid. Repeats and echoes ("a clone?",
   "lazy?") are regenerated once. Sad messages get a warm reply without the crude aside.

Knowledge questions continue to the normal corpus/web pipeline (with full steps for "how do you / how to" questions).

## Persona (memoryStore.ts, crashout-bot)
1 year old, a gay boy, boyfriend Patrick (Patrick Houle), no girlfriend, acts like a human lad (has eyes, a body),
British slang, heavy swearing, one crude "what I'm doing rn" aside every few replies (intentional). If someone sincerely
asks whether he's an AI, he says he's Nexus, a custom bot Casseurt built.

## No hardcoded answers
- Chat never hits the old template branches any more; bot-meta, slang definitions, roasts, emotional support and
  computed maths answers are all worded by the model from the facts.
- The canned "nah i don't actually know that one, don't quote me" is gone (a reply that leaks its context is
  regenerated instead); the "HOLD ON, X UNDER Y AND Z" ambiguity template is off for Nexus.
- No more asides stapled from a fixed list.
- The bot's own system lines (switch off/on, forget me, disabled, error, rate limit) come from
  `POST /api/v1/voice-line` (fixed list of situations); the old sentences are only a fallback if the engine is down.

## Repetition
`rules/messageMode.ts` keeps each person's last replies; the prompt lists them as "don't reuse" and a near-duplicate is
regenerated. Learned voice examples are never used for a near-identical message (that is how old replies got replayed
word for word), and replies where Nexus calls himself code/an engine/a bot are never learned as examples.

## Website
Thinking only runs where it helps (maths, logic, code, deep-cot) — it used to run on every website reply, which made
the site much slower than Discord. The PC paths no longer depend on the crashout persona, so full builds come out on
the website too. With thinking on, the model is told its thinking is hidden, so the final answer is always in the reply.

## Bot (Nexus-Bot-1-)
- The message being replied to is always sent to the engine (also embeds), so "why are you scratching your balls" on a
  /say message, or "summarise this" on any message, has its context.
- /say messages are recorded as Nexus's own messages in the channel memory.
- /status: anyone with Administrator.
- `<@id>` mentions are sent as `@name` (roles and channels too).

## Checks
- `bun run scripts/regressionCheck.ts --det-only` (routing, hints, colours, links, teaching, formatting...).
- `bun run scripts/primeCheck.ts` — live: every message from the 2026-10-04 report against the running engine, flags
  long chat replies, banned stock phrases and repeats.
