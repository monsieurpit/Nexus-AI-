// Continuity between messages (2026-10-13, Patrick + ChatGPT: "remember what he was talking about earlier and follow up
// naturally"). Two parts:
//
//   short-term   the last few exchanges with THIS person (30 minutes), in memory only — the Discord bot only sends the
//                conversation when someone hits "reply" on Nexus, so a plain "nexus …" started from zero every time
//                ("what did i just say" → no idea). Never saved to disk; nobody who opted out; no test runs.
//   follow-ups   when someone mentions something coming up ("exam tomorrow", "match tonight", "date on friday"), it's
//                kept with their personal memory (personalMemory.ts, so "stop saving my messages" removes it too), and
//                the first time they talk after it should have happened, he asks how it went — once.

export interface Exchange { t: number; them: string; you: string }
const SHORT_MS = 30 * 60_000;
const MAX_EXCHANGES = 8;
const buffers = new Map<string, Exchange[]>();

export function recordExchange(key: string, them: string, you: string, now = Date.now()): void {
  if (!key || !them.trim() || !you.trim()) return;
  const list = (buffers.get(key) || []).filter((e) => now - e.t < SHORT_MS);
  list.push({ t: now, them: them.slice(0, 500), you: you.slice(0, 500) });
  buffers.set(key, list.slice(-MAX_EXCHANGES));
  if (buffers.size > 5000) buffers.delete(buffers.keys().next().value!);
}

export function recentExchanges(key: string, now = Date.now()): Exchange[] {
  return (buffers.get(key) || []).filter((e) => now - e.t < SHORT_MS).slice(-6);
}

export function forgetExchanges(key: string): void {
  buffers.delete(key);
}

// As chat history entries the engine already understands (buildSpeakerAwareWindow: the user's own messages and the
// replies to them).
export function exchangesAsHistory(key: string, authorId: string, now = Date.now()) {
  return recentExchanges(key, now).flatMap((e) => [
    { id: `cont-u-${e.t}`, role: 'user', content: e.them, authorId, timestamp: new Date(e.t) },
    { id: `cont-a-${e.t}`, role: 'assistant', content: e.you, replyToAuthorId: authorId, timestamp: new Date(e.t + 1) },
  ]);
}

// ---- follow-ups ------------------------------------------------------------------------------------------
export interface FollowUp { id: string; what: string; said: string; at: number; due: number; asked: boolean }

const EVENT = String.raw`(?:exams?|tests?|quiz|finals?|match|game|tryouts?|trials?|date|interview|appointment|trip|flight|holiday|party|birthday|concert|gig|first\s+day|new\s+job|job|shift|presentation|driving\s+test|tournament|race|comp(?:etition)?|fight|meet(?:ing)?|audition|recital|graduation|prom|formal|camp|wedding)`;
const WHEN = String.raw`(?:tomorrow|tmr|tmrw|2moro|tonight|later(?:\s+today)?|this\s+(?:morning|arvo|afternoon|evening|weekend)|on\s+(?:mon|tues?|wed(?:nes)?|thur?s?|fri|sat(?:ur)?|sun)(?:day)?|(?:mon|tues?|wed(?:nes)?|thur?s?|fri|sat(?:ur)?|sun)day|next\s+week|in\s+(?:an?\s+hour|\d+\s+(?:hours?|hrs?|days?)))`;
// First person only ("i have / i've got / got a / my / i'm going to"), up to two words before the event ("maths exam",
// "driving test"); "ur mum has a date" isn't theirs.
const MOD = String.raw`(?:[a-z]+\s+){0,2}`;
const FOLLOW_RE = new RegExp(String.raw`(?:^|\b(?:and|but|so)\s+|[.!?]\s*)?\b(?:i(?:'ve|\s+have)?\s+(?:got|have|gotta)\s+(?:a|an|my|the|this)?\s*|^\s*got\s+(?:a|an|my)\s+|\bmy\s+|i'?m\s+(?:going\s+to|off\s+to|at)\s+(?:a|an|my|the)?\s*)(${MOD}${EVENT})\b(?:\s+(?:is|starts|on|at))?[^.!?\n]{0,40}?\b(${WHEN})\b|\b(${WHEN})\b[^.!?\n]{0,30}?\b(?:i(?:'ve|\s+have)?\s+(?:got|have)|my|i'?m\s+(?:going\s+to|at))\s+(?:a|an|the)?\s*(${MOD}${EVENT})\b`, 'i');
// Not things a mate asks about in a quick "how'd it go" (health, funerals, court): the moment's left alone.
const SENSITIVE_FOLLOW_RE = /\b(?:surgery|operation|hospital|doctor|chemo|funeral|court|therapy|therapist|scan|biopsy|psych)\b/i;

function dueFrom(when: string, now: number): number {
  const w = when.toLowerCase();
  const H = 3600_000;
  if (/tonight|later|in\s+an?\s+hour|hours?|hrs?|this\s+(?:morning|arvo|afternoon|evening)/.test(w)) return now + 5 * H;
  if (/tomorrow|tmr|tmrw|2moro/.test(w)) return now + 20 * H;
  if (/weekend/.test(w)) return now + 2 * 24 * H;
  if (/next\s+week/.test(w)) return now + 6 * 24 * H;
  const days = w.match(/in\s+(\d+)\s+days?/);
  if (days) return now + Number(days[1]) * 24 * H;
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const idx = dayNames.findIndex((d) => w.replace(/^on\s+/, '').startsWith(d));
  if (idx >= 0) {
    const today = new Date(now).getDay();
    const ahead = ((idx - today + 7) % 7) || 7;
    return now + (ahead * 24 - 4) * H;
  }
  return now + 24 * H;
}

export function detectFollowUp(message: string, now = Date.now()): Omit<FollowUp, 'id' | 'asked'> | null {
  const m = message.match(FOLLOW_RE);
  if (!m || SENSITIVE_FOLLOW_RE.test(message)) return null;
  const what = (m[1] || m[4] || '').toLowerCase().replace(/\s+/g, ' ').trim().replace(/^(?:(?:a|an|n|my|the|this|got|have)\s+)+/, '');
  const when = m[2] || m[3] || '';
  if (!what || !when) return null;
  return { what, said: message.replace(/\s+/g, ' ').trim().slice(0, 160), at: now, due: dueFrom(when, now) };
}

// The follow-up to ask now: due, not asked yet, and not older than 4 days past its time.
export function dueFollowUp(list: FollowUp[] | undefined, now = Date.now()): FollowUp | null {
  return (list || []).find((f) => !f.asked && now >= f.due && now - f.due < 4 * 24 * 3600_000) || null;
}

export function followUpNote(f: FollowUp, now = Date.now()): string {
  const ago = now - f.at;
  const when = ago < 20 * 3600_000 ? 'earlier today' : ago < 44 * 3600_000 ? 'yesterday' : `${Math.round(ago / (24 * 3600_000))} days ago`;
  return `FOLLOW UP: ${when} they told you "${f.said}". It should have happened by now — ask how their ${f.what} went, in a few natural words, as part of your reply (like a mate who remembered). Only once.\n`;
}
