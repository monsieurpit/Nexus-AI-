// Nexus Observatory routes. The page is a shell with no data (like the learning review page); every number comes from
// the JSON API, which needs the admin token (~/.nexus-learning/admin-token). Through the website: /observatory (the
// gateway forwards /api/* to the engine). In the terminal: `pat obs` / `bun run scripts/observatory.ts`.

import type { Express, Request, Response } from 'express';
import { observatoryData, traceDetail, runRegressionCheck } from './observatory';
import { OBSERVATORY_PAGE } from './observatoryPage';

const WINDOWS: Record<string, number> = { '1h': 3600_000, '6h': 6 * 3600_000, '24h': 24 * 3600_000, '7d': 7 * 24 * 3600_000 };

export function registerObservatoryRoutes(app: Express, isAdmin: (req: Request) => boolean): void {
  const guard = (handler: (req: Request, res: Response) => void) => (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store');
    if (!isAdmin(req)) {
      res.status(401).json({ error: 'admin token required (Authorization: Bearer <~/.nexus-learning/admin-token>)' });
      return;
    }
    try {
      handler(req, res);
    } catch (err: any) {
      res.status(500).json({ error: String(err?.message || err) });
    }
  };

  app.get('/api/v1/observatory', (_req, res) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:");
    res.setHeader('X-Robots-Tag', 'noindex');
    res.type('html').send(OBSERVATORY_PAGE);
  });

  app.get(
    '/api/v1/observatory/data',
    guard((req, res) => {
      const w = WINDOWS[String(req.query.window || '24h')] || WINDOWS['24h'];
      res.json(observatoryData(w, req.query.eval === '1'));
    })
  );

  app.get(
    '/api/v1/observatory/trace/:id',
    guard((req, res) => {
      const t = traceDetail(String(req.params.id || '').slice(0, 40));
      if (!t) return void res.status(404).json({ error: 'no such trace (traces are kept 7 days)' });
      res.json(t);
    })
  );

  // Run the regression check now instead of waiting for the next 10-minute round.
  app.post(
    '/api/v1/observatory/check',
    guard((_req, res) => {
      res.json({ findings: runRegressionCheck() });
    })
  );
}
