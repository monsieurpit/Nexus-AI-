# Personal memory

Nexus remembers what each person sends him so he can banter with them personally (roasts and normal chat) instead of
using generic jokes. Code answers never use it.

## What is stored

`~/.nexus-memory/users/<platform>-<id>.json` on the Mac that runs the engine (folder `700`, files `600`):

- the person's messages **to Nexus** (Discord: only messages addressed to him; website: keyed by a random browser id),
  their last 2,000 at most (~250 KB);
- a short profile summary (how they talk, interests, running jokes, safe roast material);
- whether they opted out, and when the one-time privacy notice was sent.

Never stored: messages routed to the support specialist, helper/moderation conversations, code requests, test runs
(`evalRun`), anyone who opted out. The summary prompt excludes sensitive topics and `cleanSummary()` drops lines about
them anyway.

## When things happen

| What | When |
|---|---|
| Message saved | after each reply (`server.ts`, `recordMessage`) |
| Profile summary | after 5 idle minutes with 10+ messages (first time) or 15+ new ones (`memory/memoryWorker.ts`), only while nobody is chatting; it evolves: previous summary + the newest messages that fit |
| Cleanup | hourly: a file untouched for 30 days is deleted; a 2 GB hard cap trims the biggest files |
| Privacy notice | the first time a Discord person talks to Nexus after the update, the engine attaches it and the bot DMs it (or adds a small line under the reply if DMs are closed) |

## How it's used

- Chat: the profile summary colours the reply (`pipeline.ts`, chat case).
- Roasts: the summary plus their last 20 saved messages as ammo (`roastEngine.ts` `planRoast`). A battle stays active for
  20 minutes after the last roast and ends after 4 messages that weren't part of it.

## Turning it off

- `nexus stop saving my messages` — everything stored is deleted, nothing more is saved (`nexus start saving my messages`
  turns it back on).
- `nexus forget me` — everything stored is deleted (the bot also clears its own small fact list).
- Website settings → **Save my messages** off — applies to that browser and to the Discord user id entered in settings.
- `NEXUS_PERSONAL_MEMORY=off` stops the summary worker.

No mass DMs: Discord's developer policy forbids unsolicited DMs to people who never interacted with the bot. Everyone
whose messages get stored talks to Nexus first, so the first-interaction DM reaches exactly them.

The Privacy Policy and Terms (`src/legalPagesHtml.ts`) describe all of this.
