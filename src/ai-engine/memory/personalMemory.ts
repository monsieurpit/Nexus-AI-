// Personal memory (2026-10-11, Patrick's plan): what each person says to Nexus is kept on the Mac, an evolving
// personality summary is built from it when they go quiet, and both shape roasts and normal chat (never code).
//
//   ~/.nexus-memory/users/<platform>-<id>.json   (folder 700, files 600 — only this Mac account can read them)
//   {
//     id, platform: 'discord' | 'web', username,
//     optedOut,                    // "nexus stop saving my messages" / the website toggle: nothing is stored
//     messages: [{ t, text }],     // their own messages TO Nexus, newest last, capped at MAX_MESSAGES
//     summary: { text, basedOn, updatedAt, runs } | null,
//     lastActive, noticeSentAt     // noticeSentAt: the one-time privacy notice (the bot DMs it once)
//   }
//
// What is NOT stored: messages routed to the support specialist (someone who was down never becomes roast material),
// moderation/helper conversations, evaluation runs, and anything from someone who opted out.
// A file untouched for 30 days is deleted. "nexus forget me" deletes it at once.
// Size: ~120 bytes a message → 2,000 messages ≈ 250 KB a person; a hard total cap protects the disk anyway.

import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export const MAX_MESSAGES = 2000;
const MAX_TEXT = 500; // one message stored at most this long
const INACTIVE_DELETE_MS = 30 * 24 * 60 * 60 * 1000;
const TOTAL_CAP_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB hard ceiling for the whole folder (Patrick asked for < 5 GB)

export type Platform = 'discord' | 'web';
export interface StoredMessage { t: number; text: string }
export interface PersonalSummary { text: string; basedOn: number; updatedAt: number; runs: number }
export interface PersonRecord {
  id: string;
  platform: Platform;
  username: string;
  optedOut: boolean;
  messages: StoredMessage[];
  summary: PersonalSummary | null;
  lastActive: number;
  noticeSentAt: number | null;
  sinceSummary: number; // messages added since the last summary
}

const ROOT = process.env.NEXUS_MEMORY_DIR || join(homedir(), '.nexus-memory');
const USERS = join(ROOT, 'users');

function ensureDirs(): void {
  for (const d of [ROOT, USERS]) {
    if (!existsSync(d)) mkdirSync(d, { recursive: true, mode: 0o700 });
    try {
      chmodSync(d, 0o700);
    } catch {
      /* best effort */
    }
  }
}

const safeId = (s: string) => s.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
function fileFor(platform: Platform, id: string): string {
  return join(USERS, `${platform}-${safeId(id)}.json`);
}

// Small in-memory cache so a busy chat doesn't re-read the file on every message.
const cache = new Map<string, PersonRecord>();
const key = (platform: Platform, id: string) => `${platform}-${safeId(id)}`;

export function loadPerson(platform: Platform, id: string): PersonRecord | null {
  if (!id || !safeId(id)) return null;
  const k = key(platform, id);
  const hit = cache.get(k);
  if (hit) return hit;
  const f = fileFor(platform, id);
  if (!existsSync(f)) return null;
  try {
    const rec = JSON.parse(readFileSync(f, 'utf8')) as PersonRecord;
    rec.sinceSummary ??= 0;
    cache.set(k, rec);
    if (cache.size > 2000) cache.delete(cache.keys().next().value!);
    return rec;
  } catch {
    return null;
  }
}

function save(rec: PersonRecord): void {
  ensureDirs();
  const f = fileFor(rec.platform, rec.id);
  const tmp = `${f}.tmp`;
  writeFileSync(tmp, JSON.stringify(rec), { mode: 0o600 });
  renameSync(tmp, f); // atomic: a crash mid-write never leaves a half file
  cache.set(key(rec.platform, rec.id), rec);
}

function blank(platform: Platform, id: string, username: string): PersonRecord {
  return { id: safeId(id), platform, username, optedOut: false, messages: [], summary: null, lastActive: Date.now(), noticeSentAt: null, sinceSummary: 0 };
}

// One message they sent to Nexus. Never throws (a storage problem must never break a reply).
export function recordMessage(platform: Platform, id: string, username: string, text: string): void {
  try {
    if (!id || !text?.trim()) return;
    const rec = loadPerson(platform, id) || blank(platform, id, username);
    if (rec.optedOut) return;
    rec.username = username || rec.username;
    rec.messages.push({ t: Date.now(), text: text.trim().slice(0, MAX_TEXT) });
    if (rec.messages.length > MAX_MESSAGES) rec.messages.splice(0, rec.messages.length - MAX_MESSAGES);
    rec.lastActive = Date.now();
    rec.sinceSummary = (rec.sinceSummary || 0) + 1;
    save(rec);
  } catch (e) {
    console.warn('[memory] could not record a message:', (e as Error).message);
  }
}

// Opt out: everything stored is deleted, and nothing is stored from now on (a tiny record remembers the choice).
export function setOptedOut(platform: Platform, id: string, username: string, optedOut: boolean): void {
  const rec = loadPerson(platform, id) || blank(platform, id, username);
  if (optedOut) {
    rec.messages = [];
    rec.summary = null;
    rec.sinceSummary = 0;
  }
  rec.optedOut = optedOut;
  rec.lastActive = Date.now();
  save(rec);
}

// "nexus forget me": the whole file goes.
export function forgetPerson(platform: Platform, id: string): boolean {
  cache.delete(key(platform, id));
  const f = fileFor(platform, id);
  if (!existsSync(f)) return false;
  unlinkSync(f);
  return true;
}

export function isOptedOut(platform: Platform, id: string): boolean {
  return Boolean(loadPerson(platform, id)?.optedOut);
}

export function saveSummary(platform: Platform, id: string, text: string, basedOn: number): void {
  const rec = loadPerson(platform, id);
  if (!rec || rec.optedOut) return;
  rec.summary = { text: text.trim().slice(0, 1500), basedOn, updatedAt: Date.now(), runs: (rec.summary?.runs || 0) + 1 };
  rec.sinceSummary = 0;
  save(rec);
}

// The one-time privacy notice: true the first time it's asked for a person (the bot then DMs it), false after.
export function claimPrivacyNotice(platform: Platform, id: string, username: string): boolean {
  try {
    const rec = loadPerson(platform, id) || blank(platform, id, username);
    if (rec.noticeSentAt) return false;
    rec.noticeSentAt = Date.now();
    save(rec);
    return true;
  } catch {
    return false;
  }
}

// What the specialists get: the personality summary and their last few messages (roast ammo / context).
export function personalContext(platform: Platform, id: string, lastN = 20): { summary: string | null; recent: string[] } {
  const rec = loadPerson(platform, id);
  if (!rec || rec.optedOut) return { summary: null, recent: [] };
  return { summary: rec.summary?.text || null, recent: rec.messages.slice(-lastN).map((m) => m.text) };
}

// People who went quiet for 5+ minutes with enough new messages since their last summary.
export function peopleNeedingSummary(idleMs = 5 * 60 * 1000, minNew = 15): PersonRecord[] {
  ensureDirs();
  const out: PersonRecord[] = [];
  for (const f of readdirSync(USERS)) {
    if (!f.endsWith('.json')) continue;
    const [platform, ...rest] = f.replace(/\.json$/, '').split('-');
    const rec = loadPerson(platform as Platform, rest.join('-'));
    if (!rec || rec.optedOut) continue;
    const firstTime = !rec.summary && rec.messages.length >= 10;
    if (Date.now() - rec.lastActive >= idleMs && (firstTime || rec.sinceSummary >= minNew)) out.push(rec);
  }
  return out.sort((a, b) => b.sinceSummary - a.sinceSummary);
}

// Housekeeping (hourly): files untouched for 30 days are deleted; if the folder ever passes the hard cap, the oldest
// messages of the biggest files are trimmed until it fits.
export function cleanupMemory(now = Date.now()): { deleted: number; bytes: number } {
  ensureDirs();
  let deleted = 0;
  const files: Array<{ f: string; size: number }> = [];
  for (const name of readdirSync(USERS)) {
    if (!name.endsWith('.json')) continue;
    const f = join(USERS, name);
    try {
      const st = statSync(f);
      if (now - st.mtimeMs > INACTIVE_DELETE_MS) {
        unlinkSync(f);
        cache.delete(name.replace(/\.json$/, ''));
        deleted++;
      } else files.push({ f, size: st.size });
    } catch {
      /* ignore */
    }
  }
  let bytes = files.reduce((a, b) => a + b.size, 0);
  if (bytes > TOTAL_CAP_BYTES) {
    for (const { f } of files.sort((a, b) => b.size - a.size)) {
      if (bytes <= TOTAL_CAP_BYTES * 0.9) break;
      try {
        const rec = JSON.parse(readFileSync(f, 'utf8')) as PersonRecord;
        const before = statSync(f).size;
        rec.messages = rec.messages.slice(-Math.floor(rec.messages.length / 2));
        save(rec);
        bytes -= before - statSync(f).size;
      } catch {
        /* ignore */
      }
    }
  }
  return { deleted, bytes };
}

export function memoryStats(): { people: number; bytes: number } {
  ensureDirs();
  let people = 0;
  let bytes = 0;
  for (const name of readdirSync(USERS)) {
    if (!name.endsWith('.json')) continue;
    people++;
    try {
      bytes += statSync(join(USERS, name)).size;
    } catch {
      /* ignore */
    }
  }
  return { people, bytes };
}
