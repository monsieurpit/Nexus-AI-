// Structured memories with source, confidence, last-confirmed and expiry (2026-10-13, Patrick: "this reduces the classic
// AI problem of turning one random joke into a permanent fact about someone"). Before, a person's memory was one free-text
// summary: a made-up test ("build me a PC with my $800k budget") became "What they brag about: $800k budget" and showed
// up in every roast, forever.
//
//   source       stated (they said it about themselves) | inferred (a guess from how they talk)
//   confidence   tentative until it's confirmed again ON ANOTHER DAY → certain
//   expiry       tentative: 14 days after it was last confirmed · running joke: 30 days · certain: kept with the profile
//   kind         interest | preference | fact | running_joke | style — a running joke is never stated as a fact
// Retrieval picks the few memories relevant to the current message (keyword overlap + recency) — no extra model call.

export type FactKind = 'interest' | 'preference' | 'fact' | 'running_joke' | 'style' | 'temporary' | 'current';
export interface MemoryFact {
  text: string;
  kind: FactKind;
  source: 'stated' | 'inferred';
  confidence: 'certain' | 'tentative';
  firstSeen: number;
  lastConfirmed: number;
  confirmedDays: string[]; // the distinct days it was seen (YYYY-MM-DD), last few
  expiresAt: number | null;
  origin?: 'their-messages' | 'unknown'; // provenance: extracted from what THEY wrote (never from Nexus's replies)
  replaced?: string; // the older memory this one replaced ("supports Barcelona" → "supports Arsenal now")
}

const DAY = 24 * 3600_000;
const TENTATIVE_TTL = 14 * DAY;
const JOKE_TTL = 30 * DAY;
const MAX_FACTS = 40;

const day = (t: number) => new Date(t).toISOString().slice(0, 10);
const STOP = new Set('the a an and or of to in on at is are was were be it its this that they them their he she his her i you your my me for with as from by about very really just like likes loves love hates hate always never often usually'.split(' '));
const words = (t: string) => new Set((t.toLowerCase().match(/[\p{L}\p{N}']{3,}/gu) || []).filter((w) => !STOP.has(w)));

function similar(a: string, b: string): boolean {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return false;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  return shared / Math.min(A.size, B.size) >= 0.6;
}

// Lifetimes by type: temporary (today's plans, current mood) 3 days · current (a rank, an ongoing project) 60 days ·
// running joke 30 days · anything still tentative 14 days · confirmed stable memories kept with the profile.
function expiryFor(f: Pick<MemoryFact, 'kind' | 'confidence' | 'lastConfirmed'>): number | null {
  if (f.kind === 'temporary') return f.lastConfirmed + 3 * DAY;
  if (f.kind === 'current') return f.lastConfirmed + 60 * DAY;
  if (f.kind === 'running_joke') return f.lastConfirmed + JOKE_TTL;
  if (f.confidence === 'tentative') return f.lastConfirmed + TENTATIVE_TTL;
  return null;
}

// New observations (from the memory worker) merged into what's known: the same memory seen again bumps it, and a second
// distinct day makes a stated memory certain. An inferred one never goes past tentative.
export function mergeFacts(existing: MemoryFact[], observed: Array<Pick<MemoryFact, 'text' | 'kind' | 'source'>>, now = Date.now()): MemoryFact[] {
  const facts = pruneFacts(existing, now).map((f) => ({ ...f, confirmedDays: [...f.confirmedDays] }));
  for (const o of observed) {
    const text = o.text.trim().replace(/\s+/g, ' ').slice(0, 160);
    if (text.length < 2) continue;
    // A correction ("no longer plays Valorant", "switched to Arsenal", "supports Arsenal now"): the old memory on that
    // topic goes (kept as .replaced on the new one), instead of two "current" facts that contradict each other. Only
    // when they STATED it — a guess never overwrites what they told you.
    const change = CHANGE_RE.test(text);
    if (change && o.source === 'stated') {
      const topic = text.replace(CHANGE_RE, ' ');
      const old = facts.filter((f) => f.kind !== 'running_joke' && sameTopic(f.text, topic));
      for (const f of old) facts.splice(facts.indexOf(f), 1);
      if (/\b(?:no\s+longer|not\s+anymore|anymore|stopped|quit|gave\s+up)\b/i.test(text) && !/\b(?:now|switched|started)\b/i.test(text)) continue; // just stopped: nothing new to keep
      const f: MemoryFact = { text: text.replace(/\b(?:actually|now)\b/gi, '').replace(/\s+/g, ' ').trim(), kind: o.kind, source: 'stated', confidence: 'tentative', firstSeen: now, lastConfirmed: now, confirmedDays: [day(now)], expiresAt: null, origin: 'their-messages', replaced: old[0]?.text };
      f.expiresAt = expiryFor(f);
      facts.push(f);
      continue;
    }
    const same = facts.find((f) => f.kind === o.kind && similar(f.text, text));
    if (same) {
      same.lastConfirmed = now;
      if (!same.confirmedDays.includes(day(now))) same.confirmedDays = [...same.confirmedDays, day(now)].slice(-5);
      if (o.source === 'stated') same.source = 'stated';
      if (same.source === 'stated' && same.kind !== 'running_joke' && same.confirmedDays.length >= 2) same.confidence = 'certain';
      same.expiresAt = expiryFor(same);
    } else {
      const f: MemoryFact = { text, kind: o.kind, source: o.source, confidence: 'tentative', firstSeen: now, lastConfirmed: now, confirmedDays: [day(now)], expiresAt: null, origin: 'their-messages' };
      f.expiresAt = expiryFor(f);
      facts.push(f);
    }
  }
  // Too many: the oldest tentative ones go first.
  return facts.sort((a, b) => (a.confidence === b.confidence ? b.lastConfirmed - a.lastConfirmed : a.confidence === 'certain' ? -1 : 1)).slice(0, MAX_FACTS);
}

const CHANGE_RE = /\b(?:no\s+longer|not\s+anymore|anymore|stopped|quit|gave\s+up|used\s+to|switched\s+to|started|now|actually)\b/gi;
// Same topic: share the main verb/noun ("supports Barcelona" ~ "supports Arsenal", "plays Valorant" ~ "doesn't play Valorant").
function sameTopic(a: string, b: string): boolean {
  const A = [...words(a)].map((w) => w.replace(/(?:ing|es|s|ed)$/, ''));
  const B = [...words(b)].map((w) => w.replace(/(?:ing|es|s|ed)$/, ''));
  return A.some((w) => w.length >= 4 && B.includes(w));
}

// "forget that I play valorant": the matching memories go (the person asked).
export function forgetMatching(facts: MemoryFact[], what: string): { kept: MemoryFact[]; removed: number } {
  const kept = facts.filter((f) => !similar(f.text, what) && !sameTopic(f.text, what));
  return { kept, removed: facts.length - kept.length };
}

export function pruneFacts(facts: MemoryFact[], now = Date.now()): MemoryFact[] {
  return facts.filter((f) => !f.expiresAt || f.expiresAt > now);
}

// The memories worth bringing up for THIS message: anything sharing words with it, plus how they talk; never expired ones.
// Stems, so "goals" finds "goalkeeper" and "playing" finds "plays" ("i let in 5 goals" missed the goalkeeper memory).
const stem = (w: string) => w.replace(/(?:ing|ers|er|es|s|ed)$/, '').slice(0, 5);
export function relevantFacts(facts: MemoryFact[], message: string, max = 5, now = Date.now(), forRoast = false): MemoryFact[] {
  const M = [...words(message)].map(stem);
  const near = (a: string, b: string) => a === b || (a.length >= 4 && b.length >= 4 && (a.startsWith(b) || b.startsWith(a)));
  const scored = pruneFacts(facts, now).map((f) => {
    let overlap = 0;
    for (const w of words(f.text)) if (M.some((m) => near(m, stem(w)))) overlap++;
    // A roast always gets their running jokes and interests: that's the material, whatever the message says.
    const roastBonus = forRoast && (f.kind === 'running_joke' || f.kind === 'interest') ? 2 : 0;
    const recency = Math.max(0, 1 - (now - f.lastConfirmed) / (30 * DAY));
    const base = f.kind === 'style' ? 1.5 : 0;
    return { f, s: overlap * 3 + base + roastBonus + recency + (f.confidence === 'certain' ? 0.5 : 0) };
  });
  return scored.filter((x) => x.s >= 1.5).sort((a, b) => b.s - a.s).slice(0, max).map((x) => x.f);
}

// How the reply sees them: facts, guesses and jokes kept apart.
export function factsBlock(facts: MemoryFact[]): string {
  if (!facts.length) return '';
  const told = facts.filter((f) => f.kind !== 'running_joke' && f.kind !== 'style' && f.source === 'stated' && f.confidence === 'certain');
  const guesses = facts.filter((f) => f.kind !== 'running_joke' && f.kind !== 'style' && !(f.source === 'stated' && f.confidence === 'certain'));
  const jokes = facts.filter((f) => f.kind === 'running_joke');
  const style = facts.filter((f) => f.kind === 'style');
  return [
    'WHAT YOU REMEMBER ABOUT THIS PERSON (only bring it up if it fits naturally):',
    told.length ? `- They told you (true): ${told.map((f) => f.text).join('; ')}` : '',
    guesses.length ? `- Not sure (said once or a guess — never state it as fact): ${guesses.map((f) => f.text).join('; ')}` : '',
    jokes.length ? `- Running jokes (banter only, NOT real facts): ${jokes.map((f) => f.text).join('; ')}` : '',
    style.length ? `- How they talk: ${style.map((f) => f.text).join('; ')}` : '',
  ].filter(Boolean).join('\n');
}
