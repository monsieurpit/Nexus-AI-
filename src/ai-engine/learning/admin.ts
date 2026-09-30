// Admin controls for the learning system (docs/learning-system.md, "Control"). Deliberately NOT
// behind server.ts's requireApiKey: /api/v1/nexus registers ANY key a caller sends as valid, so that
// check can't protect anything. These routes need their own secret, generated once into
// ~/.nexus-learning/admin-token (mode 600, never in the repo); `cat` it to use the API.

import { randomBytes, timingSafeEqual } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import type { Express, Request, Response } from 'express';
import { LEARNING_ADMIN_PAGE } from './adminPage';
import { promoteFact, rollbackLearnedSince, unlearnFact } from './promote';
import {
  audit,
  candidatesByStatus,
  getCandidate,
  isLearningEnabled,
  listCandidates,
  listLearned,
  recentAudit,
  setCandidateStatus,
} from './store';

let adminToken: string | null = null;

export function loadAdminToken(): string | null {
  if (adminToken) return adminToken;
  if (process.env.NEXUS_LEARNING_ADMIN_TOKEN) return (adminToken = process.env.NEXUS_LEARNING_ADMIN_TOKEN);
  const dir = process.env.NEXUS_LEARNING_DIR || join(homedir(), '.nexus-learning');
  const file = join(dir, 'admin-token');
  try {
    if (!existsSync(file)) writeFileSync(file, randomBytes(24).toString('hex'), { mode: 0o600 });
    adminToken = readFileSync(file, 'utf8').trim() || null;
  } catch {
    adminToken = null;
  }
  return adminToken;
}

function isAdminRequest(req: Request): boolean {
  const expected = loadAdminToken();
  const header = req.headers['authorization'];
  const given = (typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7) : (req.headers['x-learning-token'] as string)) || '';
  if (!expected || !given) return false;
  const a = Buffer.from(given.trim());
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function guard(handler: (req: Request, res: Response) => void) {
  return (req: Request, res: Response) => {
    if (!isAdminRequest(req)) {
      res.status(401).json({ error: 'learning admin token required (Authorization: Bearer <~/.nexus-learning/admin-token>)' });
      return;
    }
    try {
      handler(req, res);
    } catch (err: any) {
      res.status(500).json({ error: String(err?.message || err) });
    }
  };
}

export function registerLearningAdminRoutes(app: Express): void {
  // The review page itself is public (no data in it); everything it shows comes from the guarded API.
  app.get('/api/v1/learning/admin', (_req, res) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'");
    res.setHeader('X-Robots-Tag', 'noindex');
    res.type('html').send(LEARNING_ADMIN_PAGE);
  });

  // Overview: what's learned, what's waiting, and the recent decisions with their reasons.
  app.get(
    '/api/v1/learning',
    guard((_req, res) => {
      res.json({
        enabled: isLearningEnabled(),
        learned: listLearned(200),
        waitingForPeople: candidatesByStatus('needs-corroboration', 200),
        waitingForReview: candidatesByStatus('needs-review', 200),
        recentCandidates: listCandidates(100),
        audit: recentAudit(100),
      });
    })
  );

  // Approve a waiting candidate — Patrick vouches for it.
  app.post(
    '/api/v1/learning/approve',
    guard((req, res) => {
      const c = getCandidate(Number(req.body?.candidateId));
      if (!c || !c.claim) return void res.status(404).json({ error: 'no such candidate' });
      const fact = promoteFact({
        claim: typeof req.body?.claim === 'string' && req.body.claim.trim() ? req.body.claim.trim() : c.claim,
        subject: c.subject,
        scope: c.scope,
        verification: 'admin',
        evidence: 'approved by admin',
        supporterCount: 1,
        timeSensitive: !!c.timeSensitive,
        clusterId: c.clusterId,
      });
      if (!fact) return void res.status(429).json({ error: 'daily promotion budget used up' });
      setCandidateStatus(c.id, 'promoted', 'approved by admin');
      res.json({ ok: true, fact });
    })
  );

  app.post(
    '/api/v1/learning/reject',
    guard((req, res) => {
      const c = getCandidate(Number(req.body?.candidateId));
      if (!c) return void res.status(404).json({ error: 'no such candidate' });
      setCandidateStatus(c.id, 'rejected', `admin: ${req.body?.reason || 'rejected'}`);
      res.json({ ok: true });
    })
  );

  // Forget one learned fact.
  app.delete(
    '/api/v1/learning/learned/:id',
    guard((req, res) => {
      const ok = unlearnFact(String(req.params.id), `admin: ${req.body?.reason || 'removed'}`);
      res.status(ok ? 200 : 404).json({ ok });
    })
  );

  // Forget everything learned since a date (ISO string or ms).
  app.post(
    '/api/v1/learning/rollback',
    guard((req, res) => {
      const raw = req.body?.since;
      const since = typeof raw === 'number' ? raw : Date.parse(String(raw));
      if (!Number.isFinite(since)) return void res.status(400).json({ error: 'since must be a date' });
      const removed = rollbackLearnedSince(since, String(req.body?.reason || 'admin rollback'));
      audit('admin:rollback', String(since), `${removed} removed`);
      res.json({ ok: true, removed });
    })
  );
}
