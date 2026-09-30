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

### Personal vs shared

- "remember that I live in Montreal" / "my birthday is May 5" → **personal memory only** (the
  existing per-user memory the Discord bot already stores). Never shared with anyone else.
- "remember that the server movie night is Friday" → **server lore**, shared, needs corroboration.
- "remember that Spain won the 2026 World Cup" → **world fact**, shared, verified online.
- "remember that I'm the king of France" / "remember Casseurt eats glue" → joke/unverifiable
  personal claim about someone → **not learned**.

A "remember this" request is never enough on its own: the pertinence and safety checks still apply.

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

## Known limits

- Website visitors have no stable id; they all look like one anonymous person, so the website
  alone can never corroborate server lore (only verified world facts are learned from it).
- The small local model is both extractor and judge. The guards around it (exact quotes, number
  checks, safety rules, review for anything unverifiable) are what make it safe, not the model.
- It learns facts, not style. Learning Nexus's voice from reactions would be a separate feature.
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
