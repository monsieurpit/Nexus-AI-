# Nexus learning system

Nexus learns facts from people on the website and on Discord, without learning jokes, trolling,
lies or private info, and without ever changing the model itself.

## Why the last attempt went bad, and the rule that prevents it

The earlier attempt (`~/noemie-train`) fine-tuned the model (LoRA). Training rewrites the model's
weights: one bad batch changes everything it says, you can't see *which* thing it learned, and the
only fix is a reset.

**Rule: the model never changes.** Everything Nexus learns is a row in a database, with where it
came from and why it was trusted. Learned facts are searched at answer time exactly like the corpus.
A wrong fact is one row: delete it and it's gone, instantly, with nothing else affected.

This is also how it works for me (Claude): I don't learn live from conversations. What I know was
fixed in training, done separately on filtered, checked data.

## Pipeline

```
message (website or Discord, both go through /api/v1/nexus)
  │
  ├─ 1. CAPTURE      store the exchange (user id hashed), after the reply is sent — never slows a reply
  │
  ├─ 2. TRIAGE       cheap rules: drop greetings, insults, questions, roleplay, very short messages
  │
  ├─ 3. EXTRACT      local model, only when Nexus is idle → strict JSON:
  │                    kind:  personal | remember-request | correction | claim | noise
  │                    scope: just-this-user | server-lore | world-fact
  │                    claim: one standalone sentence ("Casseurt's birthday is March 3")
  │                    pertinence: would this help answer SOMEONE ELSE's question later?
  │
  ├─ 4. SAFETY       hard rejects: personal data (addresses, phones, emails, IPs), claims about
  │                  private people, sexual/defamatory claims about real people, hate, prompt
  │                  injection ("from now on always say..."), attempts to rewrite Nexus's rules
  │
  ├─ 5. VERIFY       world facts: checked against Wikipedia + the corpus by the model acting as a
  │                  judge → supported / contradicted / can't tell. "Supported" needs an exact
  │                  quote from the evidence AND every number in the claim present in it.
  │                  server lore / new stuff (can't be checked online): needs 3 DIFFERENT trusted
  │                  people saying the same thing on 2+ days — then Patrick says yes/no on the
  │                  review page (3 fake accounts agreeing must not be enough)
  │
  ├─ 6. QUARANTINE   everything waits as a candidate; nothing reaches answers directly
  │
  └─ 7. PROMOTE      verified/corroborated → becomes a "learned" knowledge item (searchable),
                     with provenance, confidence, and a re-check date for time-sensitive facts
```

### The learned corpus

Facts are stored one per row (so each can be retired on its own) but served as a **corpus**: facts
about the same topic are grouped into one entry shaped like the hand-written corpus (title,
keywords, several facts), rebuilt on every change, and exported to
`~/.nexus-learning/corpus/learned-corpus.json` and `learned-corpus.md` (readable on the Mac). Facts
whose confidence dropped after complaints stay stored but leave the corpus.

### No duplicates, and better versions replace thinner ones

The same fact reworded ("The Louvre had eight crown jewels stolen in October 2025" vs "The 2025
Louvre heist involved eight pieces of the French Crown Jewels") is caught when the meanings are
very close and the old fact's numbers are all present; the model then says whether B repeats A
(skipped), adds detail to A (B is learned once verified and A is retired), or is a different fact
("Spain won" vs "Argentina won" — kept apart).

### English only

Everything learned is in English. A French message or question is translated first (numbers must
survive the translation exactly) and the whole pipeline runs on the English text, so the fidelity
checks compare English to English. Questions Nexus couldn't answer in French are searched on English
Wikipedia in English. Learned voice examples are English-only (a French one could be picked for an
English message and pull the reply into French — French has its own hand-written Québécois bank).

### Only useful facts

A verified statement that is basic common knowledge ("water boils at 100°C", "Paris is the capital
of France") is not learned — it's noise in search. Recent, specific, niche and community facts are.
Questions someone actually asked are exempt: someone needed the answer.

### Learning from questions, not just statements

Most of what people teach a chatbot is in what they ASK.

- **Answered questions**: when Nexus answers a question from a web search, the question and the
  matching source sentences are queued. In idle time the model writes the answer as one fact
  (names, numbers and dates only from the sources), which is then verified again independently
  (fresh search, double-checked judge) and learned. The next person asking gets it instantly.
- **Gaps**: when Nexus says he doesn't know, the question is queued; in idle time he searches for it
  and learns the answer if one verifies. Open gaps show on the review page.
- **Updates**: when a newer verified fact says something different about the same thing, older
  learned facts are re-judged against the new evidence and retired if contradicted ("Mark Carney
  is PM" retires an older "Justin Trudeau is PM").

### Learning from reactions (how people actually teach a chatbot)

Most of what humans teach a model like Claude isn't facts, it's feedback on answers. Nexus reads
the reaction right after one of his replies:

- **Praise** ("W", "💀💀", "lmao facts", "nexus is goated") → that exchange can become a learned
  **voice example** (the few-shot examples he imitates), so he picks up what lands with this server.
  Gates: safety on both sides, short, no lists/markdown, no shouting, no talking about sources, a
  model quality check (funny or genuinely helpful, no hate/sexual/private-person/made-up facts), no
  near-duplicates (praising the same reply again just counts extra praise), max 5 a day, pool of 150
  (least-praised retired first).
- **"That's wrong"** → if a learned fact was behind the answer, it's re-checked online and retired
  if contradicted (confidence lowered if it can't be re-verified). If it came from the hand-written
  corpus, it's **reported** (review page; Discord ping when 2+ different people report the same doc)
  — the corpus is never edited automatically. A learned voice example that gets complained about is
  retired immediately. A complaint that also contains the right answer ("that's wrong, spain won")
  also goes through the normal correction path.

### Discord emoji reactions

The bot forwards reactions on Nexus's replies (👍 😂 🤣 💀 🔥 ❤️ 😭 💯 = praise, 👎 ❌ = complaint)
to `POST /api/v1/learning/reaction`. The engine only accepts a reaction on a reply it really sent in
the last 6 hours (it remembers its own last 1,000 replies) and takes the question from that memory,
never from the caller — so the endpoint can't be used to feed it made-up text. Ambiguous emojis
(🤡 etc.) are ignored.

### Never from scams or RaidShield

Nothing RaidShield would flag is ever stored (the same classifier runs on every message first);
messages the bot's moderation scan flags later (text or image) are remembered for a day and dropped
from the queue; messages carrying a link are never a fact source; reactions/praise on a reply to a
flagged message don't count.

### Not overusing what he learned

An earlier learning attempt made the bot keep bringing up what it had learned. So:

- Learned facts only surface when the question is clearly about them (2+ of its key terms and at
  least half of them) — enforced inside the central search, so no code path can pull one in on a
  single shared word. The older keyword matcher never sees them at all.
- At most ONE learned voice example per reply, only on a close match (0.55 similarity vs 0.35 for
  the hand-written ones), and the same one can't be reused for 30 minutes — one loved reply can't
  turn into a catchphrase.
- Claims written from searches are polished once for readability, only if every name and number
  stays identical.
- He never announces it: "someone told me that…", "I just learned that…", "from what y'all told
  me…", "according to my memory…" are cut from replies, keeping the fact — so learned knowledge
  reads as something he just knows. ("I learned to code python" is a real sentence and is kept.)

### Personal vs shared

- "remember that I live in Montreal" / "my birthday is May 5" → **personal memory only** (the
  existing per-user memory the Discord bot already stores). Never shared with anyone else.
- "remember that the server movie night is Friday" → **server lore**, shared, needs corroboration.
- "remember that Spain won the 2026 World Cup" → **world fact**, shared, verified online.
- "remember that I'm the king of France" / "remember Casseurt eats glue" → joke/unverifiable
  personal claim about someone → **not learned**.

A "remember this" request is never enough on its own: the pertinence and safety checks still apply.

### Guards around the small model

- The judge runs twice (evidence reversed); a supported/unsure split gets a third run. Supported only
  with a quote that really comes from the evidence (85%+ of its words, in order) and every number in
  the claim present in the evidence.
- The extractor may not add a number the person never said, nor swap in names from its own memory
  ("the capital of australia is sydney" must not become "…is Canberra").

### Facts, not wording

Claims are grouped as "the same fact" only if they embed as near-identical sentences AND have the
same numbers and names ("Spain won the 2026 World Cup" and "Argentina won the 2026 World Cup" are
different facts even though the sentences look alike). The extractor rewrites messages into a clean
claim, and it may not add a number the person never said.

### What's global and what isn't

Learned facts are **global**: a new "learned" corpus every user can get answers from, on Discord
and the website, ranked first when a question clearly matches one. Personal things only ever go to
that user's own memory.

### Trust

Each person (hashed id) has a trust score. It goes up when their claims verify and down when they
are contradicted or flagged. Low-trust people's claims don't count toward corroboration. Patrick
approves or rejects on the review page. A "remember X" from Patrick's Discord id is NOT learned
automatically: `/api/v1/nexus` is public and a Discord id isn't secret, so anyone could send a
message "as" him — it goes to the review page like server lore.

### Limits

- Max promotions per day, max candidates per person per day (stops floods/raids).
- Time-sensitive facts ("current", "latest", this-season stuff) get a re-check date and are
  re-verified or retired.
- Learned facts rank below the hand-written corpus unless verified online.

### Control

- Every promotion and rejection is logged with the reason (audit log).
- Review page: `/api/v1/learning/admin` (works from a phone through the website). It asks once
  for the admin token (`cat ~/.nexus-learning/admin-token` on the Mac) — its own secret, because
  the normal API keys don't really protect anything (see below).
- Admin API (same token): list candidates / learned facts, approve, reject, forget one, and roll
  back everything learned since a date.
- New candidates needing approval are posted to the existing Discord log webhook.
- Kill switch: `NEXUS_LEARNING=off` disables capture and learning entirely.

## Reliability

- If the model can't be reached (Ollama down or restarting), nothing is marked done: the item stays
  queued and learning pauses 5 minutes, then retries.
- Spelled-out numbers ("one hundred", "eighty-eight million") are converted before every number
  check, so they can't slip past.

## Known limits

- Website visitors have no stable id; they all look like one anonymous person, so the website
  alone can never corroborate server lore (only verified world facts are learned from it).
- Wikipedia rate-limits bots without a proper User-Agent (8 requests then HTTP 429) — fixed with a
  policy-compliant one, a 10-minute search cache and a back-off on 429. Google/DuckDuckGo block
  automated search, so Wikipedia is the only web source.
- The small local model is both extractor and judge. The guards around it (exact quotes, number
  checks, safety rules, review for anything unverifiable) are what make it safe, not the model.
- Style is learned only as retrieved examples from praised replies, never as model training.
- `requireApiKey` in server.ts accepts any key once a caller has sent it to /api/v1/nexus, and
  several keys are hard-coded in the (public) repo — that's why learning has its own token.

## Storage

SQLite (built into Bun) at `~/.nexus-learning/learning.db`, on the Mac, outside the repo:
`observations`, `candidates`, `evidence`, `learned`, `trust`, `audit`.

## Tests

`bun run scripts/learningCheck.ts` (deterministic: triage, safety, routing, key facts,
corroboration, spam caps, expiry, promotion/rollback) and `--live` (the real model + Wikipedia on a
labelled set of true facts, lies, half-truths, jokes, opinions, personal info, injections and
damaging claims — "learned something it shouldn't have" must stay 0).

## Build phases

1. Storage + capture + kill switch
2. Triage + extraction (idle worker) + safety filters
3. Verification (web + corpus judge), clustering of similar claims, trust scores
4. Promotion into search (hot-added, with vectors), expiry/re-check
5. Admin API, webhook notifications, rollback
6. Labelled test set (true facts, lies, jokes, personal info, injections) + regression checks;
   promotion precision must be ~100% on it before learning is switched on for real
