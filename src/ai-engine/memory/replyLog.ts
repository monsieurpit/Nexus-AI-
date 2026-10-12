// The reply log (2026-10-12, Patrick): every message to
// Nexus and his reply, so the nightly report (scripts/replyReport.ts) can find bugs in real conversations before
// people do. Before this, his replies weren't stored anywhere (only the last 40, and a learning sample).
//
//   ~/.nexus-replylog/replies.db (folder 700, file 600). Every exchange is deleted after 24 hours (Patrick: "every type
//   of conversation stays for 24 hours") — the 7:00 report covers exactly that window. `--reset --yes` empties it now.
//   People are a salted hash, never their Discord id. Not logged: test runs, anyone who turned message saving off.
//   "nexus forget me" deletes their rows too.

import { Database } from 'bun:sqlite';
import { chmodSync, existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { hashIdentity } from '../learning/store';
import { checkReply } from '../v2/replyChecks';

const DIR = process.env.NEXUS_REPLYLOG_DIR || join(homedir(), '.nexus-replylog');
const FILE = join(DIR, 'replies.db');
let db: Database | null = null;

function open(): Database {
  if (db) return db;
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true, mode: 0o700 });
  db = new Database(FILE);
  db.exec('PRAGMA journal_mode = WAL');
  db.exec(`CREATE TABLE IF NOT EXISTS replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    at INTEGER NOT NULL,
    platform TEXT NOT NULL,
    userHash TEXT NOT NULL,
    userText TEXT NOT NULL,
    reply TEXT NOT NULL,
    mode TEXT NOT NULL,
    lang TEXT NOT NULL,
    ms INTEGER NOT NULL,
    flags TEXT NOT NULL DEFAULT '[]'
  )`);
  db.exec('CREATE INDEX IF NOT EXISTS idx_replies_at ON replies(at)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_replies_user ON replies(userHash)');
  try {
    chmodSync(FILE, 0o600);
  } catch {
    // best effort
  }
  return db;
}

export const replyUserHash = (platform: string, id: string) => hashIdentity(`replylog:${platform}:${id}`);

const KEEP_MS = 24 * 3600_000;
let lastPurge = 0;
// Everything older than 24 h goes (checked at most every 10 minutes, on the next log, and on every report).
export function purgeOld(now = Date.now()): number {
  lastPurge = now;
  try {
    return Number(open().query('DELETE FROM replies WHERE at < ?').run(now - KEEP_MS).changes);
  } catch {
    return 0;
  }
}

export function logReply(e: { platform: string; userId: string; userText: string; reply: string; mode: string; lang: string; ms: number }): void {
  if (!e.userId || !e.userText || !e.reply) return;
  try {
    if (Date.now() - lastPurge > 10 * 60_000) purgeOld();
    const flags = checkReply(e.userText, e.reply, e.mode, e.ms);
    open()
      .query('INSERT INTO replies (at, platform, userHash, userText, reply, mode, lang, ms, flags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(Date.now(), e.platform, replyUserHash(e.platform, e.userId), e.userText.slice(0, 4000), e.reply.slice(0, 8000), e.mode, e.lang, Math.round(e.ms), JSON.stringify(flags));
  } catch (err) {
    console.warn('[replylog] could not log a reply:', (err as Error).message);
  }
}

// "forget me" / "stop saving my messages": their rows go.
export function forgetReplies(platform: string, userId: string): number {
  try {
    return Number(open().query('DELETE FROM replies WHERE userHash = ?').run(replyUserHash(platform, userId)).changes);
  } catch {
    return 0;
  }
}

export function replyLogPath(): string {
  return FILE;
}
