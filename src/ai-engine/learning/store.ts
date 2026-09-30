// Learning system storage — see docs/learning-system.md. Server-only (bun:sqlite): never import this
// from anything the website bundle pulls in (App.tsx -> generator.ts -> reasoningEngine.ts).
//
// Everything Nexus learns lives here as rows with provenance, never in the model's weights, so any
// wrong fact is removable on its own. The DB sits outside the repo (~/.nexus-learning) because it
// contains hashed user ids and raw Discord messages.

import { Database } from 'bun:sqlite';
import { createHash, randomBytes } from 'crypto';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export type ObservationSource = 'discord' | 'website' | 'api';
export type CandidateKind = 'personal' | 'remember-request' | 'correction' | 'claim' | 'search-answer';
// 'message': something a person said (may state a fact). 'search-answer': a question Nexus answered
// from a web search — the answer is learnable. 'gap': a question Nexus couldn't answer — researched
// later in idle time.
// 'feedback-positive' / 'feedback-negative': a reaction to Nexus's previous reply ("W", "💀",
// "that's wrong") — how people teach style and flag mistakes, see learning/feedback.ts.
export type ObservationKind = 'message' | 'search-answer' | 'gap' | 'feedback-positive' | 'feedback-negative';
export type CandidateScope = 'just-this-user' | 'server-lore' | 'world-fact';
export type CandidateStatus =
  | 'pending-extract' // observation queued, not looked at yet
  | 'pending-verify' // extracted, passed safety, waiting for verification
  | 'needs-corroboration' // can't be checked online: waiting for more independent people
  | 'needs-review' // waiting for Patrick
  | 'verified' // ready to promote
  | 'promoted'
  | 'rejected';

export interface Observation {
  id: number;
  createdAt: number;
  source: ObservationSource;
  userHash: string;
  channelHash: string | null;
  userText: string;
  botReply: string;
  previousBotReply: string | null;
  processed: number;
  kind: ObservationKind;
  // JSON EvidenceItem[] for 'search-answer'.
  evidence: string;
  // The message Nexus was answering when he wrote previousBotReply (for feedback).
  previousUserText: string | null;
}

export interface Candidate {
  id: number;
  createdAt: number;
  updatedAt: number;
  observationId: number;
  userHash: string;
  source: ObservationSource;
  kind: CandidateKind;
  scope: CandidateScope;
  claim: string;
  subject: string;
  pertinence: number;
  timeSensitive: number;
  status: CandidateStatus;
  statusReason: string;
  clusterId: number | null;
}

export interface LearnedFact {
  id: string;
  createdAt: number;
  updatedAt: number;
  claim: string;
  subject: string;
  scope: CandidateScope;
  confidence: number;
  verification: 'web' | 'corroborated' | 'admin';
  evidence: string;
  supporterCount: number;
  recheckAt: number | null;
  active: number;
  // Newline-separated ways people might ask about it — extra search keywords (see enrichLearned).
  questions?: string;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS observations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt INTEGER NOT NULL,
  source TEXT NOT NULL,
  userHash TEXT NOT NULL,
  channelHash TEXT,
  userText TEXT NOT NULL,
  botReply TEXT NOT NULL,
  previousBotReply TEXT,
  processed INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_obs_processed ON observations(processed, id);

CREATE TABLE IF NOT EXISTS candidates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  observationId INTEGER NOT NULL,
  userHash TEXT NOT NULL,
  source TEXT NOT NULL,
  kind TEXT NOT NULL,
  scope TEXT NOT NULL,
  claim TEXT NOT NULL,
  subject TEXT NOT NULL,
  pertinence REAL NOT NULL,
  timeSensitive INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  statusReason TEXT NOT NULL DEFAULT '',
  clusterId INTEGER
);
CREATE INDEX IF NOT EXISTS idx_cand_status ON candidates(status);
CREATE INDEX IF NOT EXISTS idx_cand_cluster ON candidates(clusterId);
CREATE INDEX IF NOT EXISTS idx_cand_user_day ON candidates(userHash, createdAt);

CREATE TABLE IF NOT EXISTS clusters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt INTEGER NOT NULL,
  claim TEXT NOT NULL,
  embedding BLOB
);

CREATE TABLE IF NOT EXISTS learned (
  id TEXT PRIMARY KEY,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  claim TEXT NOT NULL,
  subject TEXT NOT NULL,
  scope TEXT NOT NULL,
  confidence REAL NOT NULL,
  verification TEXT NOT NULL,
  evidence TEXT NOT NULL,
  supporterCount INTEGER NOT NULL,
  recheckAt INTEGER,
  active INTEGER NOT NULL DEFAULT 1,
  clusterId INTEGER,
  questions TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS trust (
  userHash TEXT PRIMARY KEY,
  score REAL NOT NULL,
  verifiedCount INTEGER NOT NULL DEFAULT 0,
  contradictedCount INTEGER NOT NULL DEFAULT 0,
  flaggedCount INTEGER NOT NULL DEFAULT 0,
  updatedAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS voice_examples (
  id TEXT PRIMARY KEY,
  createdAt INTEGER NOT NULL,
  query TEXT NOT NULL,
  answer TEXT NOT NULL,
  vector BLOB,
  praiseCount INTEGER NOT NULL DEFAULT 1,
  reason TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt INTEGER NOT NULL,
  userHash TEXT NOT NULL,
  question TEXT NOT NULL,
  botReply TEXT NOT NULL,
  complaint TEXT NOT NULL,
  suspect TEXT NOT NULL,
  outcome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  at INTEGER NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  detail TEXT NOT NULL
);
`;

const DEFAULT_DIR = join(homedir(), '.nexus-learning');

let db: Database | null = null;
let hashSalt = '';

export function isLearningEnabled(): boolean {
  return (process.env.NEXUS_LEARNING || 'on').toLowerCase() !== 'off';
}

// Tests pass ':memory:' so nothing touches the real DB.
export function openLearningStore(path?: string): Database {
  if (db) return db;
  const dir = process.env.NEXUS_LEARNING_DIR || DEFAULT_DIR;
  const file = path ?? join(dir, 'learning.db');
  if (file !== ':memory:') {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true, mode: 0o700 });
    const saltFile = join(dir, 'salt');
    if (!existsSync(saltFile)) writeFileSync(saltFile, randomBytes(32).toString('hex'), { mode: 0o600 });
    hashSalt = readFileSync(saltFile, 'utf8').trim();
  } else {
    hashSalt = 'test-salt';
  }
  db = new Database(file, { create: true });
  if (file !== ':memory:') {
    try {
      chmodSync(file, 0o600);
    } catch {
      // best effort — the directory itself is already 700
    }
  }
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec(SCHEMA);
  migrate(db);
  return db;
}

// Columns added after the first release — existing databases get them on open.
function migrate(d: Database): void {
  const has = (table: string, col: string) => (d.query(`PRAGMA table_info(${table})`).all() as { name: string }[]).some((c) => c.name === col);
  if (!has('observations', 'kind')) d.exec("ALTER TABLE observations ADD COLUMN kind TEXT NOT NULL DEFAULT 'message'");
  if (!has('observations', 'evidence')) d.exec("ALTER TABLE observations ADD COLUMN evidence TEXT NOT NULL DEFAULT ''");
  if (!has('learned', 'questions')) d.exec("ALTER TABLE learned ADD COLUMN questions TEXT NOT NULL DEFAULT ''");
  if (!has('observations', 'previousUserText')) d.exec('ALTER TABLE observations ADD COLUMN previousUserText TEXT');
  if (!has('learned', 'polished')) d.exec('ALTER TABLE learned ADD COLUMN polished INTEGER NOT NULL DEFAULT 0');
}

export function closeLearningStoreForTests(): void {
  db?.close();
  db = null;
}

function store(): Database {
  return db ?? openLearningStore();
}

// Salted so the DB alone can't be matched against Discord ids. The admin id is compared by hash too.
export function hashIdentity(raw: string): string {
  if (!hashSalt) openLearningStore();
  return createHash('sha256').update(`${hashSalt}:${raw}`).digest('hex').slice(0, 24);
}

export function audit(action: string, target: string, detail: string): void {
  store().query('INSERT INTO audit (at, action, target, detail) VALUES (?, ?, ?, ?)').run(Date.now(), action, target, detail.slice(0, 2000));
}

// ---- observations -------------------------------------------------------------------------------

export function insertObservation(
  o: Omit<Observation, 'id' | 'processed' | 'kind' | 'evidence' | 'previousUserText'> & { kind?: ObservationKind; evidence?: string; previousUserText?: string | null }
): number {
  const r = store()
    .query(
      'INSERT INTO observations (createdAt, source, userHash, channelHash, userText, botReply, previousBotReply, kind, evidence, previousUserText) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run(o.createdAt, o.source, o.userHash, o.channelHash, o.userText, o.botReply, o.previousBotReply, o.kind ?? 'message', o.evidence ?? '', o.previousUserText ?? null);
  return Number(r.lastInsertRowid);
}

export function nextUnprocessedObservations(limit: number): Observation[] {
  return store().query('SELECT * FROM observations WHERE processed = 0 ORDER BY id LIMIT ?').all(limit) as Observation[];
}

export function countObservationsByUserSince(userHash: string, since: number): number {
  const row = store().query('SELECT COUNT(*) AS n FROM observations WHERE userHash = ? AND createdAt >= ?').get(userHash, since) as { n: number };
  return row.n;
}

export function markObservationProcessed(id: number, outcome: number): void {
  store().query('UPDATE observations SET processed = ? WHERE id = ?').run(outcome, id);
}

// Raw messages aren't kept forever — only what the pipeline needs to work through its backlog.
export function pruneObservations(olderThanMs: number): number {
  const r = store().query('DELETE FROM observations WHERE processed != 0 AND createdAt < ?').run(Date.now() - olderThanMs);
  return Number(r.changes);
}

// ---- candidates ---------------------------------------------------------------------------------

export function insertCandidate(c: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt' | 'clusterId'>): number {
  const now = Date.now();
  const r = store()
    .query(
      `INSERT INTO candidates (createdAt, updatedAt, observationId, userHash, source, kind, scope, claim, subject, pertinence, timeSensitive, status, statusReason)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(now, now, c.observationId, c.userHash, c.source, c.kind, c.scope, c.claim, c.subject, c.pertinence, c.timeSensitive, c.status, c.statusReason);
  return Number(r.lastInsertRowid);
}

export function setCandidateStatus(id: number, status: CandidateStatus, reason: string): void {
  store().query('UPDATE candidates SET status = ?, statusReason = ?, updatedAt = ? WHERE id = ?').run(status, reason.slice(0, 500), Date.now(), id);
  audit(`candidate:${status}`, String(id), reason);
}

export function setCandidateCluster(id: number, clusterId: number): void {
  store().query('UPDATE candidates SET clusterId = ?, updatedAt = ? WHERE id = ?').run(clusterId, Date.now(), id);
}

export function getCandidate(id: number): Candidate | null {
  return (store().query('SELECT * FROM candidates WHERE id = ?').get(id) as Candidate) ?? null;
}

export function candidatesByStatus(status: CandidateStatus, limit = 100): Candidate[] {
  return store().query('SELECT * FROM candidates WHERE status = ? ORDER BY id LIMIT ?').all(status, limit) as Candidate[];
}

export function candidatesInCluster(clusterId: number): Candidate[] {
  return store().query('SELECT * FROM candidates WHERE clusterId = ? ORDER BY id').all(clusterId) as Candidate[];
}

export function countCandidatesByUserSince(userHash: string, since: number): number {
  const row = store().query('SELECT COUNT(*) AS n FROM candidates WHERE userHash = ? AND createdAt >= ?').get(userHash, since) as { n: number };
  return row.n;
}

// Waiting for more people for too long = nobody else believes it.
export function expireStaleCandidates(olderThanMs: number): number {
  const cutoff = Date.now() - olderThanMs;
  const stale = store().query("SELECT id FROM candidates WHERE status = 'needs-corroboration' AND createdAt < ?").all(cutoff) as { id: number }[];
  for (const { id } of stale) setCandidateStatus(id, 'rejected', 'nobody else confirmed it within 30 days');
  return stale.length;
}

export function listCandidates(limit = 200): Candidate[] {
  return store().query('SELECT * FROM candidates ORDER BY id DESC LIMIT ?').all(limit) as Candidate[];
}

// ---- clusters (similar claims from different people) --------------------------------------------

export function insertCluster(claim: string, embedding: Float32Array | null): number {
  const r = store()
    .query('INSERT INTO clusters (createdAt, claim, embedding) VALUES (?, ?, ?)')
    .run(Date.now(), claim, embedding ? Buffer.from(embedding.buffer) : null);
  return Number(r.lastInsertRowid);
}

export function allClusters(): { id: number; claim: string; embedding: Float32Array | null }[] {
  const rows = store().query('SELECT id, claim, embedding FROM clusters').all() as { id: number; claim: string; embedding: Uint8Array | null }[];
  return rows.map((r) => ({
    id: r.id,
    claim: r.claim,
    embedding: r.embedding ? new Float32Array(r.embedding.buffer.slice(r.embedding.byteOffset, r.embedding.byteOffset + r.embedding.byteLength)) : null,
  }));
}

// ---- learned facts ------------------------------------------------------------------------------

export function insertLearned(f: Omit<LearnedFact, 'createdAt' | 'updatedAt' | 'active'> & { clusterId?: number | null }): void {
  const now = Date.now();
  store()
    .query(
      `INSERT OR REPLACE INTO learned (id, createdAt, updatedAt, claim, subject, scope, confidence, verification, evidence, supporterCount, recheckAt, active, clusterId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`
    )
    .run(f.id, now, now, f.claim, f.subject, f.scope, f.confidence, f.verification, f.evidence.slice(0, 3000), f.supporterCount, f.recheckAt, f.clusterId ?? null);
  audit('learned:add', f.id, `${f.verification} (${f.supporterCount} supporter(s)): ${f.claim}`);
}

export function learnedForCluster(clusterId: number): LearnedFact | null {
  return (store().query('SELECT * FROM learned WHERE clusterId = ? AND active = 1 LIMIT 1').get(clusterId) as LearnedFact) ?? null;
}

export function setLearnedQuestions(id: string, questions: string[]): void {
  store().query('UPDATE learned SET questions = ?, updatedAt = ? WHERE id = ?').run(questions.join('\n').slice(0, 1500), Date.now(), id);
}

export function learnedMissingQuestions(limit = 1): LearnedFact[] {
  return store().query("SELECT * FROM learned WHERE active = 1 AND questions = '' ORDER BY createdAt LIMIT ?").all(limit) as LearnedFact[];
}

export function getLearned(id: string): LearnedFact | null {
  return (store().query('SELECT * FROM learned WHERE id = ?').get(id) as LearnedFact) ?? null;
}

export function learnedNeedingPolish(limit = 1): LearnedFact[] {
  return store().query("SELECT * FROM learned WHERE active = 1 AND polished = 0 AND questions != '' ORDER BY createdAt LIMIT ?").all(limit) as LearnedFact[];
}

export function setLearnedClaim(id: string, claim: string | null): void {
  if (claim) store().query('UPDATE learned SET claim = ?, polished = 1, updatedAt = ? WHERE id = ?').run(claim, Date.now(), id);
  else store().query('UPDATE learned SET polished = 1, updatedAt = ? WHERE id = ?').run(Date.now(), id);
}

export function setLearnedConfidence(id: string, confidence: number): void {
  store().query('UPDATE learned SET confidence = ?, updatedAt = ? WHERE id = ?').run(confidence, Date.now(), id);
}

// ---- learned voice examples (style from reactions) ----------------------------------------------

export interface LearnedVoiceExample {
  id: string;
  createdAt: number;
  query: string;
  answer: string;
  vector: Float32Array | null;
  praiseCount: number;
  reason: string;
  active: number;
}

function toVoiceRow(r: any): LearnedVoiceExample {
  const b: Uint8Array | null = r.vector;
  return { ...r, vector: b ? new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)) : null };
}

export function insertVoiceExample(v: Omit<LearnedVoiceExample, 'createdAt' | 'active' | 'praiseCount'>): void {
  store()
    .query('INSERT OR REPLACE INTO voice_examples (id, createdAt, query, answer, vector, praiseCount, reason, active) VALUES (?, ?, ?, ?, ?, 1, ?, 1)')
    .run(v.id, Date.now(), v.query, v.answer, v.vector ? Buffer.from(v.vector.buffer) : null, v.reason.slice(0, 300));
  audit('voice:add', v.id, `${v.query} -> ${v.answer}`);
}

export function activeVoiceExamples(): LearnedVoiceExample[] {
  return (store().query('SELECT * FROM voice_examples WHERE active = 1 ORDER BY createdAt').all() as any[]).map(toVoiceRow);
}

export function listVoiceExamples(limit = 200): LearnedVoiceExample[] {
  return (store().query('SELECT id, createdAt, query, answer, praiseCount, reason, active FROM voice_examples ORDER BY createdAt DESC LIMIT ?').all(limit) as any[]).map((r) => ({ ...r, vector: null }));
}

export function bumpVoicePraise(id: string): void {
  store().query('UPDATE voice_examples SET praiseCount = praiseCount + 1 WHERE id = ?').run(id);
}

export function deactivateVoiceExample(id: string, reason: string): boolean {
  const r = store().query('UPDATE voice_examples SET active = 0 WHERE id = ? AND active = 1').run(id);
  if (Number(r.changes) > 0) audit('voice:remove', id, reason);
  return Number(r.changes) > 0;
}

export function countVoiceExamplesSince(since: number): number {
  return (store().query('SELECT COUNT(*) AS n FROM voice_examples WHERE createdAt >= ?').get(since) as { n: number }).n;
}

// ---- reports ("that's wrong") -------------------------------------------------------------------

export function insertReport(r: { userHash: string; question: string; botReply: string; complaint: string; suspect: string; outcome: string }): void {
  store()
    .query('INSERT INTO reports (createdAt, userHash, question, botReply, complaint, suspect, outcome) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(Date.now(), r.userHash, r.question.slice(0, 300), r.botReply.slice(0, 800), r.complaint.slice(0, 300), r.suspect.slice(0, 200), r.outcome.slice(0, 300));
}

export function listReports(limit = 50): any[] {
  return store().query('SELECT * FROM reports ORDER BY id DESC LIMIT ?').all(limit) as any[];
}

export function countReportsForSuspect(suspect: string): number {
  return (store().query('SELECT COUNT(DISTINCT userHash) AS n FROM reports WHERE suspect = ?').get(suspect) as { n: number }).n;
}

export function activeLearned(): LearnedFact[] {
  return store().query('SELECT * FROM learned WHERE active = 1 ORDER BY createdAt').all() as LearnedFact[];
}

export function activeLearnedWithClusters(): (LearnedFact & { clusterId: number | null })[] {
  return store().query('SELECT * FROM learned WHERE active = 1 AND clusterId IS NOT NULL').all() as any[];
}

export function clusterEmbedding(clusterId: number): Float32Array | null {
  const row = store().query('SELECT embedding FROM clusters WHERE id = ?').get(clusterId) as { embedding: Uint8Array | null } | null;
  if (!row?.embedding) return null;
  const b = row.embedding;
  return new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}

// Questions Nexus couldn't answer and nobody has found an answer for yet (review page "gaps").
export function openGaps(limit = 50): { id: number; createdAt: number; userText: string; processed: number }[] {
  return store().query("SELECT id, createdAt, userText, processed FROM observations WHERE kind = 'gap' ORDER BY id DESC LIMIT ?").all(limit) as any[];
}

export function listLearned(limit = 500): LearnedFact[] {
  return store().query('SELECT * FROM learned ORDER BY createdAt DESC LIMIT ?').all(limit) as LearnedFact[];
}

export function deactivateLearned(id: string, reason: string): boolean {
  const r = store().query('UPDATE learned SET active = 0, updatedAt = ? WHERE id = ? AND active = 1').run(Date.now(), id);
  if (Number(r.changes) > 0) audit('learned:remove', id, reason);
  return Number(r.changes) > 0;
}

export function learnedDueForRecheck(now = Date.now()): LearnedFact[] {
  return store().query('SELECT * FROM learned WHERE active = 1 AND recheckAt IS NOT NULL AND recheckAt <= ?').all(now) as LearnedFact[];
}

export function setLearnedRecheck(id: string, recheckAt: number | null): void {
  store().query('UPDATE learned SET recheckAt = ?, updatedAt = ? WHERE id = ?').run(recheckAt, Date.now(), id);
}

export function learnedSince(since: number): LearnedFact[] {
  return store().query('SELECT * FROM learned WHERE active = 1 AND createdAt >= ?').all(since) as LearnedFact[];
}

export function countPromotionsSince(since: number): number {
  const row = store().query('SELECT COUNT(*) AS n FROM learned WHERE createdAt >= ?').get(since) as { n: number };
  return row.n;
}

// ---- trust --------------------------------------------------------------------------------------

export const TRUST_DEFAULT = 0.5;

export function getTrust(userHash: string): number {
  const row = store().query('SELECT score FROM trust WHERE userHash = ?').get(userHash) as { score: number } | null;
  return row?.score ?? TRUST_DEFAULT;
}

export function adjustTrust(userHash: string, event: 'verified' | 'contradicted' | 'flagged', delta: number): number {
  const current = getTrust(userHash);
  const next = Math.max(0, Math.min(1, current + delta));
  const col = event === 'verified' ? 'verifiedCount' : event === 'contradicted' ? 'contradictedCount' : 'flaggedCount';
  store()
    .query(
      `INSERT INTO trust (userHash, score, ${col}, updatedAt) VALUES (?, ?, 1, ?)
       ON CONFLICT(userHash) DO UPDATE SET score = excluded.score, ${col} = ${col} + 1, updatedAt = excluded.updatedAt`
    )
    .run(userHash, next, Date.now());
  return next;
}

export function recentAudit(limit = 100): { id: number; at: number; action: string; target: string; detail: string }[] {
  return store().query('SELECT * FROM audit ORDER BY id DESC LIMIT ?').all(limit) as any[];
}
