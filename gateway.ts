// ============================================================================
// GATEWAY — the ONLY thing this file may ever import from src/ai-engine/ is nothing at all.
// ============================================================================
// Deployed to Railway in place of server.ts (2026-09-20), per Patrick's explicit request: the full
// engine (server.ts, unchanged) now runs locally on his Mac — same "zero-quota, runs on hardware
// he already owns" pattern already established for Ollama and the TTS service, just extended to
// cover the whole API instead of only the LLM/vision/voice calls within it. This file's entire job
// is to (1) serve the built React frontend, (2) serve the handful of static legal pages, and
// (3) transparently reverse-proxy every /api/* request to the engine's own Cloudflare tunnel.
//
// The reason this needs to be a SEPARATE file, not a mode flag inside server.ts: ES module imports
// are eager — `import { generateReasoningPath } from './src/ai-engine/reasoningEngine'` at the top
// of a file loads (and keeps resident in memory) the entire corpus, all 5540 embeddings, the BM25
// index, etc. the moment that file is loaded, regardless of any runtime `if` around the code that
// actually USES them. A single file with a "gateway mode" flag would still pay the full ~580-700MB
// memory cost just from being imported — the only way to keep this process genuinely small is for
// it to never import any of that code in the first place. Verified live: this file's own footprint
// is a small fraction of server.ts's, comfortably under the 300MB Patrick asked for.
//
// Every actual business rule (auth, rate limits, RaidShield, corpus grounding, everything) still
// lives ONLY in server.ts and runs on the engine — this file makes no decisions of its own beyond
// "which requests are API calls vs static files". The Discord bot talks to the engine's tunnel
// DIRECTLY (see nexus-ai.js), bypassing this gateway entirely — it has no need for the website's
// static files, so routing its traffic through here would only add a hop with nothing to show for it.

import express from 'express';
import path from 'path';
import http from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { BANC_HTML } from './src/bancHtml';
import { PRIVACY_POLICY_HTML, DISCLAIMER_HTML, TERMS_OF_SERVICE_HTML } from './src/legalPagesHtml';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Same CORS convention as server.ts's own (that file's own comment explains why: no IP-based
// limiting anywhere in this whole system, by explicit operator decision) — kept here too so a
// browser preflight against the gateway's own static routes behaves identically to before this
// split, even though the actual API calls now terminate one hop further away.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use((req, res, next) => {
  const startedAt = Date.now();
  res.on('finish', () => {
    console.log(`[gateway] ${req.method} ${req.path} -> ${res.statusCode} (${Date.now() - startedAt}ms)`);
  });
  next();
});

// The engine's own Cloudflare tunnel URL — same auto-push-on-restart pattern already used for
// OLLAMA_BASE_URL and TTS_SERVICE_BASE_URL (see ~/.nexus-tunnel/ on Patrick's Mac). Set as a
// Railway environment variable; the engine's own tunnel script rewrites it on every restart so a
// new tunnel URL (Cloudflare Quick Tunnels are not stable across restarts) is always current
// without a manual redeploy.
const ENGINE_BASE_URL = (process.env.ENGINE_BASE_URL || '').replace(/\/+$/, '');

if (!ENGINE_BASE_URL) {
  console.error('[gateway] FATAL: ENGINE_BASE_URL is not set — every /api/* request will fail. Set it to the Mac engine\'s tunnel URL.');
}

// Legal pages — plain static HTML, same content as server.ts used to serve directly, kept here
// (not proxied) since they have zero dependency on the engine and serving them locally avoids an
// unnecessary round-trip to the Mac for a page that never changes per-request.
app.get('/banc', (_req, res) => {
  res.type('html').send(BANC_HTML);
});
app.get('/privacy', (_req, res) => {
  res.type('html').send(PRIVACY_POLICY_HTML);
});
app.get('/disclaimer', (_req, res) => {
  res.type('html').send(DISCLAIMER_HTML);
});
app.get('/terms', (_req, res) => {
  res.type('html').send(TERMS_OF_SERVICE_HTML);
});

// Transparent reverse proxy for every API call — no re-parsing of the request body (raw bytes
// stream straight through, which matters for the base64-image-in-JSON payloads /api/v1/nexus and
// /api/v1/raidshield accept) and no buffering of the response, so /api/v1/nexus's `stream: true`
// NDJSON responses keep working exactly as they did when server.ts served them directly.
// Mounted with NO path prefix (`app.use(proxy)`, not `app.use('/api', proxy)`) deliberately —
// found live while testing: Express strips a mount path from `req.url` before an app.use()
// middleware ever sees it, so mounting at '/api' silently forwarded "/api/health" to the engine
// as bare "/health" (a route that doesn't exist there), which fell through to the engine's own
// SPA catch-all and sent back index.html instead of the real JSON response. `pathFilter` here
// does the "only /api/* requests" selection instead, at a point where req.url is still the
// genuine full path, so the engine receives requests at the exact same paths it always has.
app.use(
  createProxyMiddleware({
    target: ENGINE_BASE_URL || 'http://127.0.0.1:1',
    changeOrigin: true,
    ws: false,
    pathFilter: '/api',
    proxyTimeout: 175_000,
    timeout: 175_000,
    on: {
      error: (err, req, res) => {
        console.error('[gateway] proxy error for', (req as any).originalUrl || req.url, '-', err.message);
        if (res instanceof http.ServerResponse && !res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Nexus engine unreachable right now — try again shortly.' }));
        }
      },
    },
  })
);

// ----------------------------------------------------
// FRONTEND STATIC — identical to server.ts's own production static block.
// ----------------------------------------------------
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[gateway] Nexus website + API gateway active on :${PORT}`);
  console.log(`[gateway] Proxying /api/* to ${ENGINE_BASE_URL || '(NOT CONFIGURED)'}`);
});
