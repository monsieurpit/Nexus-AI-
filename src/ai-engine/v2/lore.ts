// Server lore — the inside jokes (2026-10-13, Patrick + ChatGPT: "remember shared experiences and bring them up naturally;
// callbacks make conversations feel continuous instead of every interaction starting from zero").
//
// Not facts (the learning system's "server-lore" facts — "movie night is on Friday" — are for answering questions):
// these are the server's running jokes and moments ("everyone spams owo kill at Nexus", "Casseurt's $800k PC budget").
//
//   store     ~/.nexus-learning/lore.json (mode 600), next to the learning data
//   review    NOTHING is used until Patrick approves it on the learning page (standing rule: server lore stays behind
//             manual review — Discord IDs can be spoofed, and a joke must never become a "fact")
//   sources   Patrick adds one himself; the idle proposer reads the last day of chat (reply log) and suggests up to 5
//             moments, which wait as "pending"
//   use       an approved joke goes into a chat / roast reply when the message touches it (same words or the same
//             person), plus now and then an unprompted callback when someone in the joke is talking — max 2, labelled
//             "inside joke, never a fact"

import { Database } from 'bun:sqlite';
import { chmodSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { randomBytes } from 'crypto';

export interface LoreEntry {
  id: string;
  text: string;
  people: string[]; // lowercase names it's about ("gabberuuhh", "casseurt")
  status: 'pending' | 'approved' | 'rejected';
  source: 'patrick' | 'seed' | 'auto';
  createdAt: number;
  uses: number;
  usedAt?: number;
}

const DIR = process.env.NEXUS_LEARNING_DIR || join(homedir(), '.nexus-learning');
let FILE = process.env.NEXUS_LORE_FILE || join(DIR, 'lore.json');
let cache: LoreEntry[] | null = null;

export function loadLore(): LoreEntry[] {
  if (cache) return cache;
  try {
    cache = existsSync(FILE) ? (JSON.parse(readFileSync(FILE, 'utf8')) as LoreEntry[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}
function saveLore(list: LoreEntry[]): void {
  if (!existsSync(join(FILE, '..'))) mkdirSync(join(FILE, '..'), { recursive: true, mode: 0o700 });
  writeFileSync(`${FILE}.tmp`, JSON.stringify(list, null, 1), { mode: 0o600 });
  renameSync(`${FILE}.tmp`, FILE);
  try {
    chmodSync(FILE, 0o600);
  } catch {
    // best effort
  }
  cache = list;
}

// The people the server knows, by every name they show up as (same list as the reply's "people you know").
const PEOPLE: Array<[string, RegExp]> = [
  ['casseurt', /\b(?:casseurt|patrick|pattrick)\b/i],
  ['xant', /\bxant(?:_?880|2)?\b/i],
  ['josh', /\b(?:josh|jjonesgbr)\b/i],
  ['gabberuuhh', /\b(?:gabberuuhh?|gabe?ru+h*|tj2v)\b/i],
  ['stxcked', /\bstxcked\b/i],
  ['rikkie', /\b(?:rikkie|rikkieboy14|richardboy16)\b/i],
  ['nexus', /\bnexus\b/i],
];
export const peopleIn = (text: string) => PEOPLE.filter(([, re]) => re.test(text)).map(([n]) => n);

// Same safety line as personal memory: nothing about health, sexuality of real people, ethnicity, addresses, ages, slurs.
const UNSAFE_RE = /\b(?:depress\w*|suicid\w*|self[\s-]?harm|address|lives\s+in|years?\s+old|\b1[0-7]\s*yo\b|school\s+name|nigg\w*|fag\w*|retard\w*|porn\w*|nude\w*|sex\w*|cancer|race|racial|ethnic\w*|religio\w*)\b/i;

export function addLore(text: string, source: LoreEntry['source'], status: LoreEntry['status'] = 'pending'): LoreEntry | null {
  const t = text.trim().replace(/\s+/g, ' ').slice(0, 220);
  if (t.length < 8 || UNSAFE_RE.test(t)) return null;
  const list = loadLore();
  const words = (s: string) => new Set(s.toLowerCase().match(/[\p{L}\p{N}$]{4,}/gu) || []);
  const w = words(t);
  // Already there (same joke, other words): skip.
  if (list.some((e) => e.status !== 'rejected' && [...words(e.text)].filter((x) => w.has(x)).length >= Math.max(3, Math.min(w.size, words(e.text).size) * 0.6))) return null;
  const e: LoreEntry = { id: randomBytes(4).toString('hex'), text: t, people: peopleIn(t), status, source, createdAt: Date.now(), uses: 0 };
  saveLore([...list, e]);
  return e;
}

export function setLoreStatus(id: string, status: LoreEntry['status'] | 'delete'): boolean {
  const list = loadLore();
  const e = list.find((x) => x.id === id);
  if (!e) return false;
  saveLore(status === 'delete' ? list.filter((x) => x.id !== id) : list.map((x) => (x.id === id ? { ...x, status } : x)));
  return true;
}

// The jokes that fit this message: shared words or the same person mentioned; sometimes (1 in 5) a callback about the
// person who's talking. Max 2, the least-used first so the same joke doesn't come back every message.
export function loreFor(message: string, authorName: string | null, random = Math.random(), count = true): LoreEntry[] {
  const approved = loadLore().filter((e) => e.status === 'approved');
  if (!approved.length) return [];
  const stop = new Set('that this with they them their what when your about have from just like dont cant into been were will would there'.split(' '));
  // ("hate" ~ "hates", "asking" ~ "asked": a stem, or "since when do you hate me" missed "why he hates him".)
  const stem = (w: string) => w.replace(/(?:ing|ed)$/, '').replace(/(?<!s)s$/, '').slice(0, 5);
  const msgWords = new Set((message.toLowerCase().match(/[\p{L}\p{N}$]{4,}/gu) || []).filter((w) => !stop.has(w)).map(stem));
  const mentioned = new Set(peopleIn(message).filter((p) => p !== 'nexus'));
  const scored = approved.map((e) => {
    const overlap = new Set((e.text.toLowerCase().match(/[\p{L}\p{N}$]{4,}/gu) || []).filter((w) => !stop.has(w)).map(stem).filter((w) => msgWords.has(w))).size;
    const person = e.people.some((p) => mentioned.has(p)) ? 2 : 0;
    const author = authorName && e.people.includes(authorName) && random < 0.2 ? 1.5 : 0;
    return { e, s: overlap * 1.5 + person + author - Math.min(1, e.uses * 0.1) };
  });
  const picked = scored.filter((x) => x.s >= 1.5).sort((a, b) => b.s - a.s).slice(0, 2).map((x) => x.e);
  if (picked.length && count) {
    const ids = new Set(picked.map((p) => p.id));
    saveLore(loadLore().map((x) => (ids.has(x.id) ? { ...x, uses: x.uses + 1, usedAt: Date.now() } : x)));
  }
  return picked;
}

export function loreNote(message: string, authorName: string | null, count = true): string {
  const hits = loreFor(message, authorName, Math.random(), count);
  return hits.length ? `SERVER LORE (inside jokes everyone here knows — a quick callback only if it fits naturally; they're jokes, never facts; never explain them): ${hits.map((h) => h.text).join(' | ')}\n` : '';
}

// ---- the idle proposer: the last day of chat → up to 5 suggested moments (pending, for Patrick) ------------------------
const PROPOSE_EVERY_MS = 6 * 3600_000;
let lastProposal = 0;
export async function proposeLore(generate: (prompt: string) => Promise<string | null>, nameOf: (userHash: string) => string | null): Promise<number> {
  if (Date.now() - lastProposal < PROPOSE_EVERY_MS) return 0;
  lastProposal = Date.now();
  const f = join(homedir(), '.nexus-replylog', 'replies.db');
  if (!existsSync(f)) return 0;
  let rows: Array<{ userHash: string; userText: string; reply: string }> = [];
  try {
    const db = new Database(f, { readonly: true });
    rows = db.query("SELECT userHash, userText, reply FROM replies WHERE at > ? AND mode NOT IN ('support','helper','code') ORDER BY at DESC LIMIT 150").all(Date.now() - 24 * 3600_000) as typeof rows;
    db.close();
  } catch {
    return 0;
  }
  if (rows.length < 20) return 0;
  const chat = rows.reverse().map((r) => `${nameOf(r.userHash) || 'someone'}: ${r.userText.replace(/\s+/g, ' ').slice(0, 140)}\nNexus: ${r.reply.replace(/\s+/g, ' ').slice(0, 100)}`).join('\n');
  const existing = loadLore().filter((e) => e.status !== 'rejected').map((e) => `- ${e.text}`).join('\n');
  const out = await generate(`This is the last day of a Discord server's chat with Nexus, their joking bot.\n\n${chat.slice(-9000)}\n\nList up to 5 FUNNY SHARED MOMENTS or RUNNING JOKES from it that the regulars would laugh about later (a bit someone keeps doing, a legendary fail, a ridiculous claim, a running beef) — one per line, short, past tense or "keeps…", naming the person when known. Not jokes already known:\n${existing || '(none yet)'}\nNever: anything private, sexual, about health, ethnicity, religion, age, addresses, or slurs. No intro, no numbering.`).catch(() => null);
  if (!out) return 0;
  let added = 0;
  for (const line of out.split('\n').map((l) => l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim()).filter((l) => l.length > 12).slice(0, 5)) {
    if (addLore(line, 'auto')) added++;
  }
  return added;
}

export const __loreFile = () => FILE;
// Tests only: a throwaway lore file (the real one must never see test data — a test once replaced it, 2026-10-13).
export function __useLoreFileForTest(path: string): void {
  FILE = path;
  cache = null;
}
