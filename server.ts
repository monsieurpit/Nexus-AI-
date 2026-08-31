import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS, extractMemorableFact } from './src/ai-engine/memoryStore';
import {
  evaluateStrictDirectives,
  evaluateRaidShieldRules,
  parseSdkRules,
  enforceStrictSdkRules,
} from './src/ai-engine/ruleEngine';
import { generateReasoningPath, assessCorpusConfidence } from './src/ai-engine/reasoningEngine';
import { checkAvailability as checkLocalLlmAvailability, generate as generateLlmText, generateVision } from './src/ai-engine/localLlmClient';
import { warmPolishDictionary } from './src/ai-engine/polishSpellCheck';
import { postToDiscordLog } from './src/ai-engine/discordLogWebhook';
import {
  BUILTIN_KNOWLEDGE,
  getAllKnowledge,
  findRelevantKnowledge,
  addRuntimeKnowledgeItem,
  removeRuntimeKnowledgeItem,
} from './src/ai-engine/knowledgeBase';
import { searchKnowledgeGraph, extractQueryEntities } from './src/ai-engine/semanticEngine';
import { BM25Engine } from './src/ai-engine/bm25Engine';
import { trySolveMath } from './src/ai-engine/mathSolver';
import {
  infuseSwearyHumanVoice,
  hasSwearWords,
  getSwearCount,
  sanitizeSwearWords,
} from './src/ai-engine/swearEngine';
import { countTokens } from './src/ai-engine/tokenizer';
import { ModelPersonaId, ReasoningMode, UserMemory, WebSearchResult } from './src/types';
import {
  executeUnifiedWebSearch,
  searchGoogleDirect,
  searchDuckDuckGoDirect,
  searchWikipediaKnowledge,
  shouldTriggerLiveWebSearch,
  buildWebSearchQuery,
} from './src/ai-engine/webSearchEngine';

const app = express();
const PORT = 3000;

// Generous for a real photo/screenshot, nowhere near enough to threaten memory on a host running
// alongside a local LLM — this is the hard ceiling on any single remote "image" this server will
// ever pull fully into memory.
const MAX_IMAGE_BYTES = 15 * 1024 * 1024; // 15MB

// Robust Image Resolver: Handles Discord CDN URLs, Base64 Data URIs, raw Base64, and image buffers
async function resolveImagePart(
  imageUrl?: string,
  imageData?: string,
  image?: any
): Promise<{ inlineData: { mimeType: string; data: string } } | null> {
  const raw =
    imageData ||
    imageUrl ||
    (typeof image === 'string' ? image : image?.data || image?.url || image?.inlineData?.data);
  if (!raw || typeof raw !== 'string') return null;

  const cleanRaw = raw.trim();

  // 1. Base64 Data URL format: data:image/png;base64,...
  const dataUriMatch = cleanRaw.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/s);
  if (dataUriMatch) {
    return {
      inlineData: {
        mimeType: dataUriMatch[1],
        data: dataUriMatch[2].replace(/[\r\n\s]/g, ''),
      },
    };
  }

  // 2. Raw Base64 string without data URI header
  if (
    cleanRaw.length > 100 &&
    !cleanRaw.startsWith('http://') &&
    !cleanRaw.startsWith('https://') &&
    /^[A-Za-z0-9+/=]+$/.test(cleanRaw.substring(0, 100))
  ) {
    return {
      inlineData: {
        mimeType: 'image/png',
        data: cleanRaw.replace(/[\r\n\s]/g, ''),
      },
    };
  }

  // 3. Remote HTTP / HTTPS URL (Discord CDN attachment, Imgur, Cloud Storage, etc.)
  if (cleanRaw.startsWith('http://') || cleanRaw.startsWith('https://')) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s fetch timeout

      const resp = await fetch(cleanRaw, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 NexusBot/2.0',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        // This previously had NO size limit at all — any URL a caller sent (Discord attachments
        // aren't restricted to actual images; anyone can attach a multi-GB file, or the field can
        // point at an arbitrary external URL) got fully buffered into memory via arrayBuffer()
        // before anything even looked at its size. Observed live: a user probed the bot with
        // "unzip 2 petabyte files" shortly before an unexplained crash with a JavaScript heap
        // out-of-memory error in the logs — this is almost certainly why. MAX_IMAGE_BYTES rejects
        // oversized responses via Content-Length up front when the server reports one, and
        // independently caps actual bytes read while streaming so a missing or dishonest
        // Content-Length can't bypass the limit.
        const declaredLength = Number(resp.headers.get('content-length') || 0);
        if (declaredLength > MAX_IMAGE_BYTES) {
          console.warn(`[Vision Engine] Rejected remote file: declared size ${declaredLength} bytes exceeds ${MAX_IMAGE_BYTES}-byte limit: ${cleanRaw}`);
          return null;
        }

        let contentType = (resp.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
        // Only real image types are accepted — the old fallback silently relabeled ANY unrecognized
        // file (a .zip, an .exe, a video) as "image/png" and fed it to the vision model as if it
        // were a photo, which is both wrong and a way to smuggle arbitrary file content in.
        if (!contentType.startsWith('image/')) {
          if (/\.jpe?g($|\?)/i.test(cleanRaw)) contentType = 'image/jpeg';
          else if (/\.webp($|\?)/i.test(cleanRaw)) contentType = 'image/webp';
          else if (/\.gif($|\?)/i.test(cleanRaw)) contentType = 'image/gif';
          else if (/\.png($|\?)/i.test(cleanRaw)) contentType = 'image/png';
          else {
            console.warn(`[Vision Engine] Rejected remote file: not a recognized image type (${contentType || 'unknown'}): ${cleanRaw}`);
            return null;
          }
        }

        const reader = resp.body?.getReader();
        if (!reader) return null;
        const chunks: Uint8Array[] = [];
        let total = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          total += value.byteLength;
          if (total > MAX_IMAGE_BYTES) {
            console.warn(`[Vision Engine] Rejected remote file: exceeded ${MAX_IMAGE_BYTES}-byte limit while streaming: ${cleanRaw}`);
            await reader.cancel().catch(() => {});
            return null;
          }
          chunks.push(value);
        }
        const base64 = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString('base64');

        return {
          inlineData: {
            mimeType: contentType,
            data: base64,
          },
        };
      } else {
        console.warn(`[Vision Engine] Failed to fetch remote image (Status ${resp.status}): ${cleanRaw}`);
      }
    } catch (e: any) {
      console.warn(`[Vision Engine] Remote image fetch error (${e?.message}): ${cleanRaw}`);
    }
  }

  return null;
}

// Middleware for CORS & JSON parsing
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// A malformed JSON body previously fell through to Express's default error page (leaking a stack
// trace to the client) since no error-handling middleware was registered anywhere. This is the
// earliest point an express.json() parse failure surfaces, so it's the right place to catch it.
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err?.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Malformed JSON in request body.' });
  }
  next(err);
});

// Rate limiting keyed ONLY by Discord author/user id — deliberately no IP-based keying or
// fallback at all. IP keying broke real traffic: express-rate-limit's own IPv6-safety validation
// (see https://express-rate-limit.github.io/ERR_ERL_KEY_GEN_IPV6/) threw on raw req.ip being used
// in a custom keyGenerator, and it fired specifically on the Discord bot's traffic (which routes
// over Railway's internal network) — breaking the AI entirely through that path while the website
// kept working. Explicit operator decision: no IP lock anywhere; requests carrying a Discord
// author/user id are limited per-user, everything else (the anonymous website) is exempt from
// this limiter and relies on the request queue's own concurrency bound + prompt-length cap for
// protection instead. Trade-off: a caller can trivially bypass this by omitting/rotating the id
// field, since nothing here authenticates it — acceptable given the explicit no-IP-tracking
// requirement; revisit if that's ever actually exploited.
function discordUserRateLimitKey(req: express.Request): string {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const idFromBody = body.authorId || body.userId || body.discordUserId;
  return typeof idFromBody === 'string' && idFromBody.trim() ? `uid:${idFromBody.trim()}` : 'anon';
}
function skipUnlessDiscordUser(req: express.Request): boolean {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const idFromBody = body.authorId || body.userId || body.discordUserId;
  return !(typeof idFromBody === 'string' && idFromBody.trim());
}

// Generous floor against pure floods, Discord-user traffic only (see above).
const globalFloodLimiter = rateLimit({
  windowMs: 60_000,
  max: 90,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: discordUserRateLimitKey,
  skip: skipUnlessDiscordUser,
  message: { error: 'Too many requests — slow down a bit and try again shortly.' },
});
app.use(globalFloodLimiter);

// Tighter limit specifically on the endpoints that actually pay the cost of a real Ollama
// generation — the single most exhaustible resource in this whole system (one local 3B model,
// OLLAMA_MAX_CONCURRENT capped by real hardware). Without this, one Discord user spamming
// messages could starve the shared queue for every other user in the server.
const aiComputeLimiter = rateLimit({
  windowMs: 15_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: discordUserRateLimitKey,
  skip: skipUnlessDiscordUser,
  message: { error: 'Slow down — you are sending messages faster than Nexus can think. Try again in a few seconds.' },
});

// Strict key check for endpoints that mutate global, server-wide state (persona/settings that
// apply to every future request, the knowledge base, API key management) or that exist purely as
// internal debug tooling (test-burst). Deliberately does NOT auto-register unknown keys the way
// authenticateApiKey() does below — that permissive behavior is fine for the public chat endpoint
// (nothing secret to protect there beyond rate limiting) but was the actual hole letting anyone
// with zero credentials flip global settings or wipe the knowledge base for every other user.
function hasValidApiKey(req: express.Request): boolean {
  const authHeader = req.headers['authorization'];
  const customHeader = req.headers['x-api-key'] as string;
  const bearerKey = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : null;
  const key = (bearerKey || customHeader || '').trim();
  const configuredSecret = process.env.NEXUS_API_KEY?.trim();
  return Boolean(key) && (registeredApiKeys.has(key) || (Boolean(configuredSecret) && key === configuredSecret));
}

function requireApiKey(req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (!hasValidApiKey(req)) {
    res.status(401).json({ error: 'A valid x-api-key or Authorization: Bearer <key> header is required for this endpoint.' });
    return;
  }
  next();
}

// In-memory registered API keys (Railway, Discord, Custom & Legacy keys)
const registeredApiKeys = new Set<string>([
  'nexus_live_key_default',
  'nexus_sk_discord_bot_1394001641899954368',
  'nexus_sk_railway_bot_live',
  'nexus_sk_live_default_key',
  'nexus_sk_master_key',
  'nexus_sk_discord_bot_legacy',
  'nexus_api_key_v1',
  'nexus-dev-key',
  'nexus_sk_discord_bot_master',
]);

// Initialize with environment key if present. NEXUS_API_KEY is this app's own key — not
// process.env.API_KEY, which Google AI Studio auto-provisions (and silently rotates) only when
// a project declares MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API. This project never actually calls
// the Gemini API anywhere, so that capability has been dropped from metadata.json; consuming
// API_KEY here would have kept accepting a key Google could change out from under this server at
// any time, with the new value only reaching a running process on the next manual AI Studio
// redeploy.
if (process.env.NEXUS_API_KEY) {
  registeredApiKeys.add(process.env.NEXUS_API_KEY.trim());
}

// ----------------------------------------------------
// BOUNDED-CONCURRENCY REQUEST QUEUE (Throughput + Crash Protection)
// ----------------------------------------------------
// Previously this ran strictly one task at a time process-wide: every request — even ones
// just waiting on a live web search fetch, which doesn't block Node's event loop — froze every
// other request in the queue until it fully finished. Most of that wait was pure I/O idle time,
// not CPU work, so serializing everything bought crash-protection at the cost of throughput.
// This keeps the same protection (bounded work in flight, per-task timeouts, FIFO ordering
// among waiting tasks) but lets up to `maxConcurrency` requests actually run at once.
interface QueuedTask<T> {
  id: string;
  endpoint: string;
  fn: () => Promise<T>;
  resolve: (value: { data: T; queuePosition: number; waitTimeMs: number; processTimeMs: number }) => void;
  reject: (reason?: any) => void;
  enqueuedAt: number;
  timeoutMs: number;
}

class RequestQueue {
  private queue: QueuedTask<any>[] = [];
  private activeTasks: Map<string, { id: string; endpoint: string; startedAt: number }> = new Map();
  public totalProcessed: number = 0;
  public peakQueueLength: number = 0;
  public peakConcurrency: number = 0;
  private totalWaitTimeMs: number = 0;
  private totalProcessingTimeMs: number = 0;

  // How many requests may run truly concurrently. Kept well below "unbounded" — same
  // crash-protection intent as the original single-slot queue — so a traffic burst still
  // can't exhaust memory or overwhelm the process. Configurable via env var for tuning
  // per host without a code change.
  private readonly maxConcurrency: number = Math.max(1, Number(process.env.REQUEST_QUEUE_CONCURRENCY) || 5);

  public get pendingCount(): number {
    return this.queue.length;
  }

  public get runningCount(): number {
    return this.activeTasks.size;
  }

  public get isBusy(): boolean {
    return this.activeTasks.size >= this.maxConcurrency;
  }

  public get currentActiveTask(): { id: string; endpoint: string; startedAt: number } | null {
    const first = this.activeTasks.values().next();
    return first.done ? null : first.value;
  }

  public get avgProcessingTimeMs(): number {
    return this.totalProcessed > 0
      ? Math.round(this.totalProcessingTimeMs / this.totalProcessed)
      : 0;
  }

  public get avgWaitTimeMs(): number {
    return this.totalProcessed > 0
      ? Math.round(this.totalWaitTimeMs / this.totalProcessed)
      : 0;
  }

  public enqueue<T>(
    endpoint: string,
    taskFn: () => Promise<T>,
    timeoutMs: number = 45000
  ): Promise<{ data: T; queuePosition: number; waitTimeMs: number; processTimeMs: number }> {
    return new Promise((resolve, reject) => {
      const enqueuedAt = Date.now();

      if (this.queue.length + 1 > this.peakQueueLength) {
        this.peakQueueLength = this.queue.length + 1;
      }

      const task: QueuedTask<T> = {
        id: `waitlist_${Math.random().toString(36).substring(2, 9)}`,
        endpoint,
        fn: taskFn,
        resolve,
        reject,
        enqueuedAt,
        timeoutMs,
      };

      this.queue.push(task);
      this.pumpQueue();
    });
  }

  // Synchronous by design: reads and increments activeTasks in the same tick with no `await`
  // in between, so concurrent calls (from enqueue() and from tasks finishing) can never both
  // slip past the capacity check and overshoot maxConcurrency — JS's single-threaded event
  // loop guarantees nothing else runs between the check and the reservation below.
  private pumpQueue(): void {
    while (this.activeTasks.size < this.maxConcurrency && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.runTask(task);
    }
  }

  private async runTask<T>(task: QueuedTask<T>): Promise<void> {
    const waitTimeMs = Date.now() - task.enqueuedAt;
    const startExec = Date.now();

    this.activeTasks.set(task.id, { id: task.id, endpoint: task.endpoint, startedAt: startExec });
    if (this.activeTasks.size > this.peakConcurrency) {
      this.peakConcurrency = this.activeTasks.size;
    }

    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    try {
      // Per-task timeout protection so one stalled upstream call never freezes its slot forever
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutHandle = setTimeout(() => reject(new Error(`Waitlist task timed out after ${task.timeoutMs}ms`)), task.timeoutMs);
      });

      const data = await Promise.race([task.fn(), timeoutPromise]);
      const processTimeMs = Date.now() - startExec;

      this.totalProcessed++;
      this.totalWaitTimeMs += waitTimeMs;
      this.totalProcessingTimeMs += processTimeMs;

      task.resolve({ data, queuePosition: 0, waitTimeMs, processTimeMs });
    } catch (error) {
      task.reject(error);
    } finally {
      if (timeoutHandle) clearTimeout(timeoutHandle);
      this.activeTasks.delete(task.id);
      // A slot just freed up — immediately pull the next queued task, if any.
      this.pumpQueue();
    }
  }
}

const globalRequestQueue = new RequestQueue();

// Robust API key authenticator: Supports Railway variables, custom headers, and query params
function authenticateApiKey(req: express.Request): { isValid: boolean; key: string } {
  const authHeader = req.headers['authorization'];
  const customHeader = req.headers['x-api-key'] as string;
  const bodyKey = (req.body && typeof req.body === 'object' ? req.body.apiKey || req.body.key : null) as string;
  const queryKey = req.query.key as string || req.query.apiKey as string;

  const bearerKey = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : null;
  const rawKey = bearerKey || customHeader || bodyKey || queryKey || '';
  const key = rawKey.trim();

  // Accept and register any key provided by user or Railway environment
  if (key) {
    registeredApiKeys.add(key);
    return { isValid: true, key };
  }

  // Fallback to default active key
  return { isValid: true, key: 'nexus_sk_discord_bot_1394001641899954368' };
}

// ----------------------------------------------------
// REST API ROUTES
// ----------------------------------------------------

// 1. Health check
app.get('/api/health', async (req, res) => {
  const llmAvailable = await checkLocalLlmAvailability();
  res.json({
    status: 'ok',
    service: 'Nexus AI & RaidShield Engine Server',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    llm: {
      configured: Boolean(process.env.OLLAMA_BASE_URL),
      model: process.env.OLLAMA_MODEL || 'qwen2.5:3b',
      available: llmAvailable,
    },
    queue: {
      pendingRequests: globalRequestQueue.pendingCount,
      runningNow: globalRequestQueue.runningCount,
      isBusy: globalRequestQueue.isBusy,
      totalProcessed: globalRequestQueue.totalProcessed,
      avgProcessingTimeMs: globalRequestQueue.avgProcessingTimeMs,
    },
    availableEndpoints: [
      'POST /api/v1/nexus',
      'POST /api/v1/raidshield',
      'POST /api/v1/generate',
      'POST /api/v1/chat/completions',
      'GET /api/v1/models',
      'GET /api/v1/queue/status',
      'GET /api/v1/keys',
      'POST /api/v1/keys/generate',
      'PATCH /api/v1/keys/:key',
    ],
  });
});

// Queue Status Endpoint
app.get('/api/v1/queue/status', (req, res) => {
  res.json({
    status: 'online',
    queueActive: true,
    pendingInWaitlist: globalRequestQueue.pendingCount,
    runningNow: globalRequestQueue.runningCount,
    isProcessing: globalRequestQueue.isBusy,
    totalProcessed: globalRequestQueue.totalProcessed,
    peakQueueLength: globalRequestQueue.peakQueueLength,
    peakConcurrency: globalRequestQueue.peakConcurrency,
    avgProcessingTimeMs: globalRequestQueue.avgProcessingTimeMs,
    timestamp: new Date().toISOString(),
  });
});

// 🌐 Dedicated Zero-API-Key Free Web Search Endpoint (Infinite Quota · Google + DuckDuckGo + Wikipedia)
app.all(['/api/v1/web/search', '/api/v1/search'], async (req, res) => {
  const query = (req.body?.query || req.body?.q || req.query.query || req.query.q || '') as string;
  const limit = Math.min(parseInt((req.body?.limit || req.query.limit || 5) as string, 10) || 5, 12);
  const provider = (req.body?.provider || req.query.provider || 'all') as 'all' | 'google' | 'duckduckgo' | 'wikipedia';

  if (!query || !query.trim()) {
    return res.status(400).json({
      error: 'Missing search query parameter ("query" or "q").',
      usage: 'POST /api/v1/web/search with { query: "who won the 2024 champions league", provider: "all", limit: 5 }',
    });
  }

  try {
    const searchResults = await executeUnifiedWebSearch(query, {
      limit,
      provider,
      includeWikipedia: true,
    });

    res.json({
      success: true,
      query: searchResults.query,
      totalResults: searchResults.results.length,
      engineUsed: searchResults.engineUsed,
      results: searchResults.results,
      quotaStatus: 'unlimited_free',
      externalApiUsed: false,
    });
  } catch (error: any) {
    console.error('[Web Search Endpoint] Error:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Search execution failed',
      query,
    });
  }
});

let currentServerPersonaId: ModelPersonaId = 'crashout-bot';

// Every chat-facing persona now resolves to crashout-bot regardless of what's requested — the
// operator wants one unfiltered "crazy AI" voice everywhere instead of a persona picker. RaidShield
// and Discord Sentinel are untouched by this: they're functional security-classification templates
// used by /api/v1/raidshield's own logic, not a personality choice, so they're not routed through
// this function at all.
export function resolveRequestedPersona(_requested?: string): (typeof DEFAULT_PERSONAS)[keyof typeof DEFAULT_PERSONAS] {
  return DEFAULT_PERSONAS['crashout-bot'];
}

// 2. List available models / personas
// Persona selection is disabled — every chat request resolves to crashout-bot regardless of what's
// requested (see resolveRequestedPersona above), so these listing endpoints only advertise that one
// persona now instead of implying a choice that no longer does anything.
app.get('/api/v1/models', (req, res) => {
  const p = DEFAULT_PERSONAS['crashout-bot'];
  const models = [
    {
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      defaultTemperature: p.defaultTemperature,
      reasoningMode: p.reasoningMode,
    },
  ];
  res.json({ object: 'list', activePersonaId: currentServerPersonaId, data: models });
});

app.get('/api/v1/personas', (req, res) => {
  const p = DEFAULT_PERSONAS['crashout-bot'];
  const models = [
    {
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      defaultTemperature: p.defaultTemperature,
      reasoningMode: p.reasoningMode,
      isActive: true,
    },
  ];
  res.json({
    activePersonaId: currentServerPersonaId,
    activePersonaName: p.name,
    totalPersonas: models.length,
    personas: models,
  });
});

app.get('/api/v1/persona', (req, res) => {
  const active = DEFAULT_PERSONAS[currentServerPersonaId] || DEFAULT_PERSONAS['nexus-homie'];
  res.json({
    activePersonaId: active.id,
    name: active.name,
    tagline: active.tagline,
    description: active.description,
    reasoningMode: active.reasoningMode,
    defaultTemperature: active.defaultTemperature,
  });
});

app.post('/api/v1/persona/set', requireApiKey, (req, res) => {
  authenticateApiKey(req);
  const requested = req.body.persona || req.body.model || req.body.personaId || req.body.mode;
  if (!requested) {
    return res.status(400).json({ error: 'Missing persona or model in request body.' });
  }

  const resolved = resolveRequestedPersona(requested);
  currentServerPersonaId = resolved.id as ModelPersonaId;
  activeServerSettings.activePersonaId = currentServerPersonaId;

  res.json({
    success: true,
    message: `Default server persona switched to ${resolved.name}`,
    activePersonaId: resolved.id,
    name: resolved.name,
    tagline: resolved.tagline,
  });
});

// Settings & Hyperparameters Endpoints
let activeServerSettings = { ...DEFAULT_SETTINGS };

app.get('/api/v1/settings', (req, res) => {
  authenticateApiKey(req);
  res.json({
    status: 'success',
    settings: {
      ...activeServerSettings,
      activePersonaId: currentServerPersonaId,
      activePersonaName: DEFAULT_PERSONAS[currentServerPersonaId]?.name || 'Nexus Discord Homie',
    },
  });
});

app.all(['/api/v1/settings', '/api/v1/settings/update'], (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    if (!hasValidApiKey(req)) {
      return res.status(401).json({ error: 'A valid x-api-key or Authorization: Bearer <key> header is required to change server-wide settings.' });
    }
    const updates = req.body || {};

    if (typeof updates.temperature === 'number') activeServerSettings.temperature = Math.max(0, Math.min(2.0, updates.temperature));
    if (typeof updates.topP === 'number') activeServerSettings.topP = Math.max(0, Math.min(1.0, updates.topP));
    if (typeof updates.topK === 'number') activeServerSettings.topK = Math.max(1, Math.min(100, updates.topK));
    if (typeof updates.contextWindowTokens === 'number') activeServerSettings.contextWindowTokens = Math.max(64, Math.min(8192, updates.contextWindowTokens));
    if (typeof updates.maxOutputTokens === 'number') activeServerSettings.contextWindowTokens = Math.max(64, Math.min(8192, updates.maxOutputTokens));
    if (typeof updates.reasoningMode === 'string') activeServerSettings.reasoningMode = updates.reasoningMode as any;
    if (typeof updates.strictRuleAdherence === 'boolean') activeServerSettings.strictRuleAdherence = updates.strictRuleAdherence;
    if (typeof updates.userCustomDirectives === 'string') activeServerSettings.userCustomDirectives = updates.userCustomDirectives;
    if (typeof updates.customRules === 'string') activeServerSettings.userCustomDirectives = updates.customRules;
    if (typeof updates.systemPrompt === 'string') activeServerSettings.userCustomDirectives = updates.systemPrompt;
    if (typeof updates.activePersonaId === 'string' && DEFAULT_PERSONAS[updates.activePersonaId as ModelPersonaId]) {
      currentServerPersonaId = updates.activePersonaId as ModelPersonaId;
      activeServerSettings.activePersonaId = currentServerPersonaId;
    }

    return res.json({
      status: 'success',
      message: 'Server AI settings and hyperparameters updated.',
      settings: {
        ...activeServerSettings,
        activePersonaId: currentServerPersonaId,
        activePersonaName: DEFAULT_PERSONAS[currentServerPersonaId]?.name,
      },
    });
  }
  res.status(405).json({ error: 'Method not allowed' });
});

// 3. API Key Generation & Management
interface ApiKeyInfo {
  key: string;
  label: string;
  created: string;
  status: 'active' | 'revoked';
  capabilities: string[];
}

const keyMetadataMap = new Map<string, ApiKeyInfo>([
  [
    'nexus_sk_discord_bot_1394001641899954368',
    {
      key: 'nexus_sk_discord_bot_1394001641899954368',
      label: 'discord_bot_master',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'vip_mode', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus_sk_railway_bot_live',
    {
      key: 'nexus_sk_railway_bot_live',
      label: 'railway_production_live',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus_live_key_default',
    {
      key: 'nexus_live_key_default',
      label: 'default_development_key',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus_sk_live_default_key',
    {
      key: 'nexus_sk_live_default_key',
      label: 'legacy_live_key',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus_sk_master_key',
    {
      key: 'nexus_sk_master_key',
      label: 'legacy_master_key',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus_sk_discord_bot_legacy',
    {
      key: 'nexus_sk_discord_bot_legacy',
      label: 'discord_bot_legacy_key',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus_api_key_v1',
    {
      key: 'nexus_api_key_v1',
      label: 'legacy_v1_key',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus-dev-key',
    {
      key: 'nexus-dev-key',
      label: 'dev_test_key',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
  [
    'nexus_sk_discord_bot_master',
    {
      key: 'nexus_sk_discord_bot_master',
      label: 'discord_bot_master_alias',
      created: new Date().toISOString(),
      status: 'active',
      capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
    },
  ],
]);

// ----------------------------------------------------
// API KEY PERSISTENCE (Disk-Backed, Survives Restarts & Redeploys)
// ----------------------------------------------------
// Previously keyMetadataMap only ever held the hardcoded seed list above: any key generated via
// POST /keys/generate, or any capability change, lived purely in process memory and vanished on
// the next restart — including every redeploy. That made a "custom Nexus API key" not actually
// persistent, and gave no way to update a key's capabilities at all once created. This file-backed
// store fixes both: keys created or updated at runtime are written to disk immediately and
// reloaded on startup, layered on top of the hardcoded seed above (which stays as a fallback floor,
// never removed).
const API_KEYS_FILE = path.join(process.cwd(), 'data', 'apiKeys.json');

function loadPersistedApiKeys(): void {
  try {
    if (!fs.existsSync(API_KEYS_FILE)) return;
    const raw = fs.readFileSync(API_KEYS_FILE, 'utf-8');
    const persisted: ApiKeyInfo[] = JSON.parse(raw);
    for (const info of persisted) {
      keyMetadataMap.set(info.key, info);
      registeredApiKeys.add(info.key);
    }
  } catch (err) {
    console.warn('[API Keys] Failed to load persisted keys, starting from seed defaults only:', err);
  }
}

function persistApiKeys(): void {
  try {
    const dir = path.dirname(API_KEYS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(API_KEYS_FILE, JSON.stringify(Array.from(keyMetadataMap.values()), null, 2));
  } catch (err) {
    console.warn('[API Keys] Failed to persist keys to disk:', err);
  }
}

loadPersistedApiKeys();

// Auth Verification Endpoint (Used by SDK ai.verifyAuth())
app.all(['/api/v1/auth/verify', '/api/v1/keys/validate', '/api/v1/auth/validate'], (req, res) => {
  const auth = authenticateApiKey(req);
  const metadata = keyMetadataMap.get(auth.key) || {
    key: auth.key,
    label: 'dynamic_authenticated_key',
    created: new Date().toISOString(),
    status: 'active',
    capabilities: ['nexus_chat', 'raidshield_21_rules', 'multimodal_vision', 'strict_rules_enforcement', 'swear_engine', 'math_engine', 'bm25_search'],
  };

  res.json({
    status: 'authenticated',
    valid: true,
    key: auth.key,
    keyMasked: auth.key.length > 16 ? `${auth.key.substring(0, 12)}...${auth.key.substring(auth.key.length - 4)}` : auth.key,
    label: metadata.label,
    capabilities: metadata.capabilities,
    totalRegisteredKeys: registeredApiKeys.size,
    timestamp: new Date().toISOString(),
  });
});

// Single source of truth for "every capability this server currently supports" — referenced by
// both the /keys listing below and PATCH /keys/:key's `capabilities: "latest"` shortcut, so a
// key's capability list can actually be refreshed to match new features as they ship, instead of
// staying frozen at whatever was hardcoded the day the key was generated.
const LATEST_FEATURE_SET = [
  'internal_autonomous_vision_engine',
  'multi_document_cognitive_search',
  'zero_refusal_deep_reasoning',
  'best_club_and_sports_intelligence',
  'strict_sdk_rule_enforcement',
  'swear_engine_polish_english',
  'raidshield_21_hard_security_rules',
  'super_chill_vip_mode_1394001641899954368',
  'fifo_waitlist_request_queue',
  'casseurt_roast_rule',
  'web_search_google_ddg_wikipedia',
  'typo_tolerant_semantic_engine',
];

app.get('/api/v1/keys', requireApiKey, (req, res) => {
  authenticateApiKey(req);
  const keysList = Array.from(keyMetadataMap.values()).map(k => ({
    ...k,
    keyMasked: k.key.length > 16 ? `${k.key.substring(0, 12)}...${k.key.substring(k.key.length - 4)}` : k.key,
  }));
  res.json({
    object: 'list',
    // Matches keysList.length, not registeredApiKeys.size — that set also grows for any
    // ad-hoc key a caller presents via authenticateApiKey(), which never gets metadata here,
    // so counting it would report a total larger than the list actually returned below.
    totalKeys: keysList.length,
    keys: keysList,
    latestFeaturesSupported: LATEST_FEATURE_SET,
  });
});

app.post('/api/v1/keys/generate', requireApiKey, (req, res) => {
  const customLabel = (req.body?.label || 'discord_bot').replace(/[^a-zA-Z0-9_]/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const newKey = `nexus_sk_${customLabel}_${randomSuffix}`;
  registeredApiKeys.add(newKey);
  
  const keyInfo: ApiKeyInfo = {
    key: newKey,
    label: customLabel,
    created: new Date().toISOString(),
    status: 'active',
    capabilities: [
      'nexus_chat',
      'multi_document_search',
      'zero_refusal_deep_reasoning',
      'raidshield_21_rules',
      'multimodal_vision',
      'strict_rules_enforcement',
      'swear_engine',
      'vip_mode',
    ],
  };
  keyMetadataMap.set(newKey, keyInfo);
  persistApiKeys();

  res.json({
    apiKey: newKey,
    created: keyInfo.created,
    label: customLabel,
    status: 'active',
    capabilities: keyInfo.capabilities,
    latestUpdatesIncluded: true,
  });
});

// Update an existing key's label, status, or capabilities without a redeploy — capabilities can
// also be refreshed to the server's full current feature set at any time by passing
// { capabilities: "latest" } instead of an explicit list, so a key stays current as features ship
// instead of staying frozen at whatever was hardcoded on the day it was generated.
app.patch('/api/v1/keys/:key', requireApiKey, (req, res) => {
  authenticateApiKey(req);
  const { key } = req.params;
  const existing = keyMetadataMap.get(key);
  if (!existing) {
    return res.status(404).json({ error: `No key found matching "${key}".` });
  }

  const { label, status, capabilities } = req.body || {};
  if (typeof label === 'string' && label.trim()) {
    existing.label = label.trim().replace(/[^a-zA-Z0-9_]/g, '');
  }
  if (status === 'active' || status === 'revoked') {
    existing.status = status;
  }
  if (capabilities === 'latest') {
    existing.capabilities = [...LATEST_FEATURE_SET];
  } else if (Array.isArray(capabilities) && capabilities.every((c) => typeof c === 'string')) {
    existing.capabilities = capabilities;
  }

  keyMetadataMap.set(key, existing);
  persistApiKeys();

  res.json({
    updated: true,
    key: existing.key,
    label: existing.label,
    status: existing.status,
    capabilities: existing.capabilities,
  });
});

// 4. Dedicated Nexus Discord Endpoint (Swearing, Discord homie style, Casseurt roast, Super Chill VIP mode, Strict Rules, Vision Support, Dynamic Persona Switching, Multi-Document Grounding)
// Short, clean conversation-title generation for the website's conversation sidebar — deliberately
// NOT routed through /api/v1/nexus, since that endpoint always applies the active persona's full
// voice (mandatory swearing, chaotic asides for crashout-bot, etc.) which is exactly wrong for a
// UI label. This is a separate, minimal call with its own tiny system prompt and a short token
// budget, so it stays cheap and fast even though it's a real extra Ollama call per new
// conversation (not a hardcoded/heuristic title — the user explicitly asked for a genuinely
// AI-generated one, the way ChatGPT/Gemini do it).
app.post('/api/v1/title', aiComputeLimiter, async (req, res) => {
  const { message, reply } = req.body || {};
  const text = typeof message === 'string' ? message.trim() : '';
  if (!text) {
    return res.status(400).json({ error: 'Missing message in request body.' });
  }
  const replyText = typeof reply === 'string' ? reply.trim() : '';
  const prompt = replyText
    ? `User message: "${text.slice(0, 500)}"\nAssistant reply: "${replyText.slice(0, 500)}"`
    : `User message: "${text.slice(0, 500)}"`;
  try {
    const result = await generateLlmText(prompt, {
      system:
        'Generate a short title (3-6 words) summarizing the topic of this conversation, for use as a chat list label. Output ONLY the title itself — no quotes, no punctuation at the end, no explanation, no prefix like "Title:". Plain, neutral, descriptive.',
      temperature: 0.3,
      maxTokens: 20,
      timeoutMs: 12000,
    });
    if (result.status !== 'success') {
      return res.status(200).json({ title: null });
    }
    const title = result.text
      .replace(/^["'“”]+|["'“”]+$/g, '')
      .replace(/^title:\s*/i, '')
      .trim()
      .slice(0, 60);
    return res.json({ title: title || null });
  } catch (err: any) {
    return res.status(200).json({ title: null });
  }
});

app.post('/api/v1/nexus', aiComputeLimiter, async (req, res) => {
  authenticateApiKey(req);
  const {
    prompt,
    content,
    text,
    message,
    authorId,
    userId,
    username,
    isSuperChillUser,
    imageUrl,
    imageData,
    image,
    attachmentUrl,
    rules,
    customRules,
    directives,
    instructions,
    systemInstruction,
    persona: requestedPersona,
    model: requestedModel,
    personaId: requestedPersonaId,
    mode: requestedMode,
    history: requestedHistory,
    messages: requestedMessages,
    deepThink: requestedDeepThink,
    crashout: requestedCrashout,
    memories: requestedMemories,
    // The website's own settings (persona choice, reasoning mode, temperature, everything the
    // customizer modal lets a user configure) — sent as one opaque blob rather than threading
    // every individual field through this handler's destructuring one at a time. Only ever sent
    // by the website's own generator.ts; the Discord bot never sends this field, so its behavior
    // (including resolveRequestedPersona always forcing crashout-bot — a deliberate, documented
    // operator choice for that surface) is completely untouched by anything below that checks for
    // clientSettings's presence.
    clientSettings,
  } = req.body;
  const userText = prompt || content || text || message || '';

  // Cross-conversation memory — the caller (the Discord bot) persists facts about a user between
  // separate conversations (Discord messages aren't a single continuous session the way this
  // engine's own history array is) and sends them back on each request. Previously this endpoint
  // had no way to receive them at all, so generateReasoningPath's userMemories parameter — which
  // already has real logic reading and injecting stored facts — was always called with a
  // hardcoded empty array. Accepts a simple {key, fact}[] shape rather than requiring the caller
  // to construct a full UserMemory object; confidence/timestamp are filled in here since the
  // caller has no reason to track those itself.
  const userMemories: UserMemory[] = Array.isArray(requestedMemories)
    ? requestedMemories
        .filter((m: any) => m && typeof m.fact === 'string' && m.fact.trim())
        .slice(0, 20)
        .map((m: any, i: number) => ({
          id: `mem-${i}`,
          key: typeof m.key === 'string' ? m.key : `fact-${i}`,
          fact: m.fact,
          confidence: typeof m.confidence === 'number' ? m.confidence : 1,
          timestamp: typeof m.timestamp === 'number' ? m.timestamp : Date.now(),
        }))
    : [];

  const effectiveAuthorId = authorId || userId || '';
  // The `userText.includes(...)` text-scan variant of this check was removed: it let ANY caller
  // spoof this specific VIP user's special treatment just by typing their numeric ID as plain
  // text anywhere in an unrelated message, regardless of who actually sent it — verified live,
  // "hey what's up 1394001641899954368" from a totally different author id granted the same
  // no-roast treatment as the real user. The identity check now only ever looks at the actual
  // author id field, which at least ties this to whatever identity the caller claims via the
  // request's own id field, not arbitrary message content.
  const isSuperChill = Boolean(isSuperChillUser) || effectiveAuthorId === '1394001641899954368';

  // Resolve requested persona (defaults to current server persona or nexus-homie). When the
  // website sends clientSettings, its actual selected persona is honored instead of being forced
  // to crashout-bot — that forcing is specifically an operator choice for the Discord bot's single
  // fixed voice, not something the website's own persona picker (sidebar + customizer modal)
  // should be silently overridden by, or that UI becomes fully non-functional.
  const personaSelector = requestedPersona || requestedModel || requestedPersonaId || requestedMode;
  const persona =
    clientSettings && typeof clientSettings === 'object' && clientSettings.activePersonaId
      ? clientSettings.activePersonaId === 'custom' && clientSettings.customPersona
        ? clientSettings.customPersona
        : DEFAULT_PERSONAS[clientSettings.activePersonaId as ModelPersonaId] || DEFAULT_PERSONAS['crashout-bot']
      : resolveRequestedPersona(personaSelector);

  // Aggregate user custom SDK rules
  const userRules = rules || customRules || directives || instructions || systemInstruction || '';

  // Check for image input
  const imagePart = await resolveImagePart(imageUrl, imageData, image || attachmentUrl);

  if (!userText && !imagePart) {
    return res.status(400).json({ error: 'Missing prompt or image in request body.' });
  }

  // A single local 3B model has to actually read every character of this before it can respond —
  // an unbounded prompt (nothing capped this before) lets one message tie up a queue slot for far
  // longer than any real chat message needs, at everyone else's expense on a shared 12k-user host.
  const MAX_PROMPT_CHARS = 6000;
  if (userText.length > MAX_PROMPT_CHARS) {
    return res.status(400).json({
      error: `Message too long (${userText.length} characters, max ${MAX_PROMPT_CHARS}). Please shorten it and try again.`,
    });
  }

  // Format message history if supplied
  const historyArray = Array.isArray(requestedHistory)
    ? requestedHistory
    : Array.isArray(requestedMessages)
    ? requestedMessages.map((m: any) => ({
        id: m.id || `msg-${Math.random()}`,
        role: m.role || 'user',
        content: typeof m.content === 'string' ? m.content : Array.isArray(m.parts) ? m.parts.map((p: any) => p.text).join(' ') : '',
        timestamp: m.timestamp || new Date(),
        thoughtProcess: m.thoughtProcess || [],
        sources: m.sources || [],
      }))
    : [];

  const isDeep = requestedDeepThink || requestedMode === 'deep' || requestedMode === 'deep-cot';
  const isCrash = requestedCrashout || requestedMode === 'crashout' || persona.id === 'crashout-bot';
  const hasClientSettings = Boolean(clientSettings && typeof clientSettings === 'object');

  try {
    const queuedExecution = await globalRequestQueue.enqueue('nexus', async () => {
      const allKnowledge = getAllKnowledge();

      // Two distinct paths: the Discord bot (no clientSettings) keeps its exact prior behavior —
      // forced crashout-bot persona, reasoningMode hardcoded from the deepThink/mode flags. The
      // website sends its full resolved AISettings object, which is honored directly (persona
      // already resolved above) instead of being reconstructed field-by-field and silently losing
      // whatever the user actually configured (reasoning mode, temperature, swear intensity, web
      // search preferences, etc.).
      const settings = hasClientSettings
        ? {
            ...DEFAULT_SETTINGS,
            ...clientSettings,
            activePersonaId: persona.id as ModelPersonaId,
            userName: username || clientSettings.userName || '',
            discordUserId: effectiveAuthorId,
            isSuperChillUser: isSuperChill || Boolean(clientSettings.isSuperChillUser),
            userCustomDirectives:
              (typeof userRules === 'string' ? userRules : Array.isArray(userRules) ? userRules.join('\n') : '') ||
              clientSettings.userCustomDirectives ||
              '',
          }
        : {
            ...DEFAULT_SETTINGS,
            activePersonaId: (isCrash ? 'crashout-bot' : persona.id) as ModelPersonaId,
            reasoningMode: isDeep ? ('deep-cot' as ReasoningMode) : ('thorough' as ReasoningMode),
            userName: username || '',
            discordUserId: effectiveAuthorId,
            isSuperChillUser: isSuperChill,
            userCustomDirectives: typeof userRules === 'string' ? userRules : Array.isArray(userRules) ? userRules.join('\n') : '',
          };

      // Real image understanding, not a fake header on top of a blind text-only response — this
      // whole branch previously never looked at the image at all: promptToEvaluate fell back to
      // the literal string 'Analyze this uploaded image attachment' with zero actual image data
      // reaching anything, and the "🖼️ Visual Input Received & Inspected:" text below was just
      // prepended to whatever generic reply that placeholder text happened to produce. Runs the
      // image through a real vision model first, then folds the actual description into the
      // prompt the persona/reasoning pipeline sees, so retrieval and the in-character reply are
      // grounded in what's genuinely in the picture (and still combine with any text the user
      // typed alongside it, e.g. "roast this" + an image).
      let visionDescription: string | null = null;
      if (imagePart) {
        const visionResult = await generateVision(
          imagePart.inlineData.data,
          'Describe what is shown in this image in detail — objects, text, people, setting, mood.',
          { timeoutMs: 25000 }
        );
        if (visionResult.status === 'success') {
          visionDescription = visionResult.text;
        }
      }

      // Pure Internal Autonomous Reasoning Engine with Multi-Document Graph Search
      const promptToEvaluate = imagePart
        ? visionDescription
          ? userText
            ? `${userText}\n\n[Attached image shows: ${visionDescription}]`
            : `React to this image: ${visionDescription}`
          : userText || 'Analyze this uploaded image attachment'
        : userText;
      const strictEvaluation = evaluateStrictDirectives(
        promptToEvaluate,
        userRules || settings.userCustomDirectives || '',
        persona.systemPrompt,
        isSuperChill,
        username || ''
      );

      let outputText = '';
      let hits: string[] = [];
      let thoughtStepsResult: any[] = [];
      let matchedDocs: any[] = [];
      let webSearchResults: WebSearchResult[] = [];

      // Autonomous Web Search Grounding
      const searchAllowed = req.body.search !== false && req.body.webSearch !== false;
      const knowledgeConfidence = promptToEvaluate ? await assessCorpusConfidence(promptToEvaluate, allKnowledge) : undefined;
      const searchTriggerReason =
        !imagePart && promptToEvaluate && searchAllowed
          ? shouldTriggerLiveWebSearch(promptToEvaluate, settings, knowledgeConfidence)
          : false;
      if (searchTriggerReason) {
        try {
          const searchRes = await executeUnifiedWebSearch(buildWebSearchQuery(promptToEvaluate, searchTriggerReason), {
            provider: req.body.searchEngine || req.body.provider || 'all',
            limit: 5,
          });
          if (searchRes.results.length > 0) {
            webSearchResults = searchRes.results;
          }
        } catch (e) {
          console.warn('[Server Web Search] Nexus query search error:', e);
        }
      }

      if (strictEvaluation.hasCustomRules && strictEvaluation.output) {
        outputText = strictEvaluation.output;
      } else {
        const reasoningResult = await generateReasoningPath(
          promptToEvaluate,
          historyArray,
          persona,
          settings,
          allKnowledge,
          userMemories,
          webSearchResults
        );
        outputText = reasoningResult.content;
        hits = reasoningResult.knowledgeHits;
        thoughtStepsResult = reasoningResult.thoughtSteps;
        if (hits.length > 0) {
          const hitSet = new Set(hits);
          matchedDocs = allKnowledge
            .filter((k) => hitSet.has(k.title) || hitSet.has(k.id))
            .map((item) => ({
              item,
              score: 1.0,
              snippet: item.content.slice(0, 180) + '...',
              relevantSentences: [item.content.split('.')[0] || item.content],
            }));
        }
      }

      if (imagePart && !visionDescription) {
        // The vision model itself failed/timed out — say so honestly instead of claiming a real
        // inspection happened (the old unconditional header claimed this even when nothing about
        // the image was ever actually looked at).
        outputText = `🖼️ **Couldn't fully analyze the image this time — here's a reply based on what you wrote:**\n\n${outputText}`;
      }

      // Extract follow-up suggestions if present in the synthesized output
      let followUpQuestions: string[] = [];
      if (outputText.includes('*Keep exploring:*')) {
        const afterExplore = outputText.split('*Keep exploring:*')[1];
        if (afterExplore) {
          followUpQuestions = afterExplore
            .split('\n')
            .map((l) => l.replace(/^[•\-\s*]+/, '').replace(/[*_]/g, '').trim())
            .filter((q) => q.length > 5 && q.endsWith('?'));
        }
      }

      // Only extract from real text messages (not image analysis) and skip if the caller already
      // has this exact key stored, so the bot isn't asked to persist a duplicate/no-op update.
      const existingKeys = new Set(userMemories.map((m) => m.key));
      const candidateFact = !imagePart && promptToEvaluate ? extractMemorableFact(promptToEvaluate) : null;
      const newMemory = candidateFact && !existingKeys.has(candidateFact.key) ? candidateFact : null;

      return {
        response: outputText,
        text: outputText,
        persona: persona.id,
        newMemory,
        personaName: persona.name,
        authorId: effectiveAuthorId || null,
        isSuperChillUser: isSuperChill,
        hasImage: Boolean(imagePart),
        knowledgeHits: hits,
        webSearched: webSearchResults.length > 0,
        webSources: webSearchResults,
        matchedDocuments: matchedDocs.map((m) => ({
          title: m.item.title,
          category: m.item.category,
          score: m.score,
          snippet: m.snippet,
          relevantSentences: m.relevantSentences,
        })),
        followUpQuestions,
        thoughtSteps: thoughtStepsResult.map((t) => ({
          type: t.type,
          title: t.title,
          description: t.description,
          ...(t.data ? { data: t.data } : {}),
          ...(typeof t.durationMs === 'number' ? { durationMs: t.durationMs } : {}),
        })),
        // Convenience summary for callers (e.g. the Discord bot's telemetry logging) that don't
        // want to parse thoughtSteps themselves — lifted from whichever thought step actually made
        // an LLM call (reasoningEngine.ts's llmGroundedOrFallback/llmSituationalReplyOrFallback are
        // the only ones that populate ThoughtStep.data with a `language` field). null when the
        // response never called the LLM at all (a template-only reply, a hardcoded fact, etc.) —
        // that's a real, meaningful distinction, not a missing value.
        telemetry: (() => {
          const llmStep = [...thoughtStepsResult].reverse().find((t) => t.data && typeof t.data.language === 'string');
          if (!llmStep) return null;
          return {
            latencyMs: llmStep.durationMs ?? null,
            language: llmStep.data!.language,
            temperature: llmStep.data!.temperature ?? null,
            swearFloorTriggered: Boolean(llmStep.data!.swearFloorTriggered),
            triggered: Boolean(llmStep.data!.triggered),
            safetyBlocked: Boolean(llmStep.data!.safetyBlocked),
            // Set only when the LLM call itself failed (timeout, degenerate output, wrong
            // language, etc.) — null on a normal successful response. This is exactly what
            // #prompt-workbench-style crash/failure logging needs to distinguish "the LLM
            // produced a bad response" from "the LLM never produced a response at all".
            llmFailureReason: llmStep.data!.llmFailureReason ?? null,
          };
        })(),
        totalDocumentsLoaded: allKnowledge.length,
        rulesRespected: true,
        activeRules: strictEvaluation.activeRulesApplied || ['Strict SDK rule adherence', 'Swear rule adherence'],
        tokens: countTokens(outputText),
        timestamp: new Date().toISOString(),
      };
    });

    res.setHeader('X-Nexus-Queue-Wait-Ms', queuedExecution.waitTimeMs.toString());
    res.setHeader('X-Nexus-Process-Time-Ms', queuedExecution.processTimeMs.toString());

    // Every successful request through this endpoint used to be completely silent — the only
    // console output anywhere in this file is the one-time startup line and error/warning paths,
    // so a healthy server processing real traffic all day produces an empty-looking Railway log,
    // indistinguishable from "nothing is happening." One line per request: persona, whether the
    // real LLM was actually reached or it fell back to template text (the single most useful fact
    // for exactly the "is this actually working" question this line exists to answer), and timing.
    const llmOutcome = queuedExecution.data.telemetry?.llmFailureReason
      ? `fallback (${queuedExecution.data.telemetry.llmFailureReason})`
      : queuedExecution.data.telemetry
      ? `real LLM (${queuedExecution.data.telemetry.latencyMs}ms)`
      : 'no LLM call (template/rule-based reply)';
    console.log(
      `[Nexus] "${userText.slice(0, 60)}" -> persona=${persona.id} ${llmOutcome} total=${queuedExecution.processTimeMs}ms`
    );

    return res.json({
      ...queuedExecution.data,
      queueStats: {
        waitedInQueueMs: queuedExecution.waitTimeMs,
        executionTimeMs: queuedExecution.processTimeMs,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Internal AI processing error', message: err?.message || String(err) });
  }
});

// 5. Dedicated RaidShield 21-Hard-Rules Security Endpoint (Text + Image Vision Scanning)
app.post('/api/v1/raidshield', aiComputeLimiter, async (req, res) => {
  authenticateApiKey(req);
  const {
    messageText,
    content,
    text,
    prompt,
    authorId,
    imageUrl,
    imageData,
    image,
    attachmentUrl,
  } = req.body;
  const targetText = messageText || content || text || prompt || '';

  // Check for image attachment/input
  const imagePart = await resolveImagePart(imageUrl, imageData, image || attachmentUrl);

  if (!targetText && !imagePart) {
    return res.status(400).json({ error: 'Missing messageText or image in request body.' });
  }

  try {
    const queuedExecution = await globalRequestQueue.enqueue('raidshield', async () => {
      // This used to pass the literal fixed string 'image_attachment_scanned' into the rules
      // evaluator for EVERY image regardless of actual content, then claim in the response
      // "(Image attachment verified and analyzed)" — a moderation tool that never once looked at
      // an image it was asked to check. Now gets a real description from a vision model first and
      // evaluates that against the same 21-hard-rules text classifier, so an actually-suspicious
      // image (a scam QR code, a phishing screenshot, explicit content) has real content for the
      // rules to classify instead of a constant placeholder.
      let imageDescription: string | null = null;
      let visionFailed = false;
      if (imagePart) {
        const visionResult = await generateVision(
          imagePart.inlineData.data,
          'Describe exactly what is shown in this image, in detail — including any visible text, links, QR codes, logos, or people. Be factual and literal.',
          { timeoutMs: 30000 }
        );
        if (visionResult.status === 'success') {
          imageDescription = visionResult.text;
        } else {
          visionFailed = true;
        }
      }

      const evalInput = [targetText, imageDescription ? `[Image content: ${imageDescription}]` : ''].filter(Boolean).join(' ');
      const evalResult = evaluateRaidShieldRules(evalInput || 'image_attachment_scanned');
      const imageStatusNote = imagePart
        ? imageDescription
          ? ' (Image content analyzed by vision model.)'
          : visionFailed
          ? ' (Image received but vision analysis failed — NOT verified, review manually.)'
          : ''
        : '';
      return {
        classification: evalResult.classification,
        confidence: evalResult.confidence,
        reason: evalResult.reason + imageStatusNote,
        imageDescription: imageDescription || undefined,
        authorId: authorId || null,
        actionRecommended:
          evalResult.classification === 'safe'
            ? 'ALLOW'
            : evalResult.confidence >= 0.90
            ? 'DELETE_AND_TIMEOUT'
            : 'FLAG_FOR_REVIEW',
        scannedImage: Boolean(imagePart),
        timestamp: new Date().toISOString(),
      };
    });

    res.setHeader('X-Nexus-Queue-Wait-Ms', queuedExecution.waitTimeMs.toString());
    return res.json(queuedExecution.data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Internal Security Evaluation Error', message: err?.message || String(err) });
  }
});

// Dedicated Vision Analysis Endpoint (Queued through Waitlist)
app.post('/api/v1/vision/analyze', aiComputeLimiter, async (req, res) => {
  authenticateApiKey(req);
  const { prompt, imageUrl, imageData, image, mode } = req.body;
  const imagePart = await resolveImagePart(imageUrl, imageData, image);

  if (!imagePart) {
    return res.status(400).json({
      status: 'error',
      error: 'Missing image',
      message: 'Valid image (remote URL, base64 data URI, or raw base64) is required in imageUrl, imageData, or image.',
    });
  }

  try {
    const queuedExecution = await globalRequestQueue.enqueue('vision.analyze', async () => {
      const mimeType = imagePart.inlineData.mimeType || 'image/png';
      const dataSize = Math.round((imagePart.inlineData.data.length * 3) / 4);
      const isSecurityMode = mode === 'security' || (prompt && /scam|phish|nitro|qr|token|threat|malicious/i.test(prompt));

      // Previously this never actually looked at the image at all — it returned a canned string
      // ("Optical frame alignment verified", "Threat Signatures: No... detected") for every image
      // regardless of content, fabricating a "Clean" verdict even for something genuinely
      // malicious. Now runs the image through a real vision model (moondream) with a prompt suited
      // to what was actually asked.
      const visionPrompt = isSecurityMode
        ? 'Describe exactly what is shown in this image, in detail — including any text, logos, QR codes, buttons, or links visible. Be factual and literal, do not guess at intent.'
        : prompt && prompt.trim()
        ? prompt.trim()
        : 'Describe what is shown in this image in detail.';

      const visionResult = await generateVision(imagePart.inlineData.data, visionPrompt, { timeoutMs: 45000 });

      if (visionResult.status !== 'success') {
        return {
          analysis: `⚠️ Vision analysis unavailable right now (${visionResult.reason}). Image received (${mimeType}, ${(dataSize / 1024).toFixed(1)} KB) but could not be inspected.`,
          status: 'error',
          hasImage: true,
          model: 'moondream',
          timestamp: new Date().toISOString(),
        };
      }

      const analysisReport = isSecurityMode
        ? `🛡️ **RaidShield Visual Analysis:**\n${visionResult.text}\n\n*(Format: ${mimeType}, ${(dataSize / 1024).toFixed(1)} KB — described by a real vision model, not a fixed template; use this description, not a canned verdict, to judge whether it looks suspicious.)*`
        : `🖼️ **Nexus Vision Inspection:**\n${visionResult.text}`;

      return {
        analysis: analysisReport,
        status: 'success',
        hasImage: true,
        model: 'moondream',
        latencyMs: visionResult.latencyMs,
        timestamp: new Date().toISOString(),
      };
    });

    res.setHeader('X-Nexus-Queue-Wait-Ms', queuedExecution.waitTimeMs.toString());
    res.setHeader('X-Nexus-Process-Time-Ms', queuedExecution.processTimeMs.toString());
    return res.json({
      ...queuedExecution.data,
      queueStats: {
        waitedInQueueMs: queuedExecution.waitTimeMs,
        executionTimeMs: queuedExecution.processTimeMs,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', error: 'Vision Analysis Error', message: error?.message || String(error) });
  }
});

// Authentication Validation Endpoint (for Discord bots and Railway deployment verification)
app.all(['/api/v1/auth/verify', '/api/v1/auth/check'], (req, res) => {
  const auth = authenticateApiKey(req);
  res.json({
    status: 'authenticated',
    valid: true,
    authenticatedKey: auth.key ? `${auth.key.substring(0, 12)}...` : 'none',
    timestamp: new Date().toISOString(),
    message: 'API Key is verified and active for Discord bot communication.',
  });
});

// Queue Stress Test Simulator (Allows testing FIFO waitlist with burst requests)
app.post('/api/v1/queue/test-burst', requireApiKey, async (req, res) => {
  const count = Math.min(Math.max(Number(req.body?.count || 5), 1), 20);
  const results: any[] = [];
  const startAll = Date.now();

  const promises = Array.from({ length: count }).map(async (_, idx) => {
    return globalRequestQueue.enqueue(`test-task-${idx + 1}`, async () => {
      // Simulate 120ms of AI inference work
      await new Promise((resolve) => setTimeout(resolve, 120));
      return {
        taskIndex: idx + 1,
        completedAt: new Date().toISOString(),
      };
    });
  });

  const executed = await Promise.all(promises);
  res.json({
    status: 'success',
    totalSimulated: count,
    overallDurationMs: Date.now() - startAll,
    processedTasks: executed.map((e) => ({
      task: e.data.taskIndex,
      waitedInQueueMs: e.waitTimeMs,
      processTimeMs: e.processTimeMs,
    })),
    queueStatus: {
      pendingInWaitlist: globalRequestQueue.pendingCount,
      runningNow: globalRequestQueue.runningCount,
      totalProcessed: globalRequestQueue.totalProcessed,
      peakQueueLength: globalRequestQueue.peakQueueLength,
      peakConcurrency: globalRequestQueue.peakConcurrency,
      avgWaitTimeMs: globalRequestQueue.avgWaitTimeMs,
      avgProcessingTimeMs: globalRequestQueue.avgProcessingTimeMs,
    },
  });
});

// 6. Gemini-Style API Endpoint (contents/generationConfig format with multi-document grounding)
app.post('/api/v1/generate', aiComputeLimiter, async (req, res) => {
  authenticateApiKey(req);
  const body = req.body;

  // Extract prompt text from various formats (Gemini contents array, plain text prompt, etc.)
  let promptText = '';
  if (typeof body.prompt === 'string') {
    promptText = body.prompt;
  } else if (Array.isArray(body.contents)) {
    promptText = body.contents
      .map((c: any) => {
        if (typeof c === 'string') return c;
        if (Array.isArray(c.parts)) {
          return c.parts.map((p: any) => p.text || '').join(' ');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  } else if (typeof body.message === 'string') {
    promptText = body.message;
  }

  if (!promptText) {
    return res.status(400).json({ error: 'No prompt or contents provided.' });
  }

  const requestedModel = (body.model || 'nexus-homie') as ModelPersonaId;
  const persona = DEFAULT_PERSONAS['crashout-bot'];
  // Text-scan variant removed — see the identical fix/comment on this same check in the
  // /api/v1/nexus handler above. Spoofable via plain message content, unrelated to actual author
  // identity.
  const isSuperChill = Boolean(body.isSuperChillUser) || body.authorId === '1394001641899954368';

  const customRules = body.rules || body.customRules || body.directives || body.systemInstruction || '';

  try {
    const queuedExecution = await globalRequestQueue.enqueue('generate', async () => {
      const allKnowledge = getAllKnowledge();
      const matchedDocs = findRelevantKnowledge(promptText, 5);
      const knowledgeTitles = matchedDocs.map((d) => d.title);

      const settings = {
        ...DEFAULT_SETTINGS,
        activePersonaId: persona.id,
        temperature: body.generationConfig?.temperature ?? persona.defaultTemperature,
        topP: body.generationConfig?.topP ?? persona.defaultTopP,
        userName: body.username || '',
        discordUserId: body.authorId || '',
        isSuperChillUser: isSuperChill,
        userCustomDirectives: typeof customRules === 'string' ? customRules : Array.isArray(customRules) ? customRules.join('\n') : '',
      };

      const strictEvaluation = evaluateStrictDirectives(
        promptText,
        customRules || settings.userCustomDirectives || '',
        persona.systemPrompt,
        isSuperChill,
        body.username || ''
      );

      let outputText = '';
      let webSearchResults: WebSearchResult[] = [];
      const searchAllowed = body.webSearch !== false && body.search !== false;
      const knowledgeConfidence = await assessCorpusConfidence(promptText, allKnowledge);
      const searchTriggerReason = searchAllowed ? shouldTriggerLiveWebSearch(promptText, settings, knowledgeConfidence) : false;
      if (searchTriggerReason) {
        try {
          const searchRes = await executeUnifiedWebSearch(buildWebSearchQuery(promptText, searchTriggerReason), {
            provider: body.searchEngine || body.provider || 'all',
            limit: 5,
          });
          if (searchRes.results.length > 0) {
            webSearchResults = searchRes.results;
          }
        } catch (e) {
          console.warn('[Server Web Search] Generate query error:', e);
        }
      }

      if (strictEvaluation.hasCustomRules && strictEvaluation.output) {
        outputText = strictEvaluation.output;
      } else {
        const reasoningResult = await generateReasoningPath(
          promptText,
          [],
          persona,
          settings,
          allKnowledge,
          [],
          webSearchResults
        );
        outputText = reasoningResult.content;
      }

      const promptTokens = countTokens(promptText);
      const candidatesTokens = countTokens(outputText);

      return {
        candidates: [
          {
            content: {
              parts: [{ text: outputText }],
              role: 'model',
            },
            finishReason: 'STOP',
            index: 0,
          },
        ],
        usageMetadata: {
          promptTokenCount: promptTokens,
          candidatesTokenCount: candidatesTokens,
          totalTokenCount: promptTokens + candidatesTokens,
        },
        knowledgeHits: knowledgeTitles,
        modelVersion: persona.id,
        rulesRespected: true,
      };
    });

    res.setHeader('X-Nexus-Queue-Wait-Ms', queuedExecution.waitTimeMs.toString());
    return res.json(queuedExecution.data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Generation Error', message: err?.message || String(err) });
  }
});

// 7. OpenAI-Compatible Chat Completions Endpoint
app.post('/api/v1/chat/completions', aiComputeLimiter, async (req, res) => {
  authenticateApiKey(req);
  const { model, messages, temperature, rules, customRules, directives, webSearch, search, searchEngine, provider, user, isSuperChillUser } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }

  const systemMessage = messages.find((m: any) => m.role === 'system')?.content || '';
  const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
  const promptText = lastUserMessage?.content || messages[messages.length - 1]?.content || '';

  const requestedModel = (model || 'nexus-homie') as ModelPersonaId;
  const persona = DEFAULT_PERSONAS['crashout-bot'];

  // This endpoint had NO identity-based check at all before this fix — it scanned the actual
  // message CONTENT for a specific numeric ID, meaning literally any caller, talking about
  // anything, could grant themselves this VIP treatment just by including that number anywhere
  // in the conversation. `user` is the OpenAI Chat Completions API's own standard optional field
  // for a caller-supplied identifier — using it here at least matches the identity-comparison
  // pattern the other two occurrences of this check already use (/api/v1/nexus, /api/v1/generate)
  // instead of scanning free-text content, though it remains as spoofable as an unauthenticated
  // client-supplied field can be in general (see the broader API-key-auth gap noted separately).
  const isSuperChill = Boolean(isSuperChillUser) || user === '1394001641899954368';

  const userRules = rules || customRules || directives || systemMessage || '';

  try {
    const queuedExecution = await globalRequestQueue.enqueue('chat.completions', async () => {
      const allKnowledge = getAllKnowledge();
      const matchedDocs = findRelevantKnowledge(promptText, 5);

      const settings = {
        ...DEFAULT_SETTINGS,
        activePersonaId: persona.id,
        temperature: typeof temperature === 'number' ? temperature : persona.defaultTemperature,
        isSuperChillUser: isSuperChill,
        userCustomDirectives: typeof userRules === 'string' ? userRules : Array.isArray(userRules) ? userRules.join('\n') : '',
      };

      const strictEvaluation = evaluateStrictDirectives(
        promptText,
        userRules || settings.userCustomDirectives || '',
        persona.systemPrompt,
        isSuperChill,
        ''
      );

      let outputText = '';
      let webSearchResults: WebSearchResult[] = [];
      const searchAllowed = webSearch !== false && search !== false;
      const knowledgeConfidence = await assessCorpusConfidence(promptText, allKnowledge);
      const searchTriggerReason = searchAllowed ? shouldTriggerLiveWebSearch(promptText, settings, knowledgeConfidence) : false;
      if (searchTriggerReason) {
        try {
          const searchRes = await executeUnifiedWebSearch(buildWebSearchQuery(promptText, searchTriggerReason), {
            provider: searchEngine || provider || 'all',
            limit: 5,
          });
          if (searchRes.results.length > 0) {
            webSearchResults = searchRes.results;
          }
        } catch (e) {
          console.warn('[Server Web Search] Chat completions query error:', e);
        }
      }

      if (strictEvaluation.hasCustomRules && strictEvaluation.output) {
        outputText = strictEvaluation.output;
      } else {
        const reasoningResult = await generateReasoningPath(
          promptText,
          [],
          persona,
          settings,
          allKnowledge,
          [],
          webSearchResults
        );
        outputText = reasoningResult.content;
      }

      const promptTokens = countTokens(promptText);
      const completionTokens = countTokens(outputText);

      return {
        id: `chatcmpl-${Math.random().toString(36).substring(2, 12)}`,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: persona.id,
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: outputText,
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: promptTokens + completionTokens,
        },
        knowledgeHits: matchedDocs.map((d) => d.title),
        rulesRespected: true,
      };
    });

    res.setHeader('X-Nexus-Queue-Wait-Ms', queuedExecution.waitTimeMs.toString());
    return res.json(queuedExecution.data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Chat Completion Error', message: err?.message || String(err) });
  }
});

// 8. Document & Knowledge Corpus Management Endpoints
app.all(['/api/v1/documents', '/api/v1/knowledge'], (req, res) => {
  if (req.method === 'GET') {
    authenticateApiKey(req);
    const all = getAllKnowledge();
    const category = req.query.category as string;
    const filtered = category ? all.filter((k) => k.category === category) : all;

    return res.json({
      object: 'list',
      totalDocuments: filtered.length,
      categories: Array.from(new Set(all.map((k) => k.category))),
      documents: filtered.map((k) => ({
        id: k.id,
        title: k.title,
        category: k.category,
        keywords: k.keywords,
        contentSnippet: k.content.substring(0, 200) + (k.content.length > 200 ? '...' : ''),
        contentLength: k.content.length,
        createdAt: k.createdAt,
      })),
    });
  }

  if (req.method === 'POST') {
    if (!hasValidApiKey(req)) {
      return res.status(401).json({ error: 'A valid x-api-key or Authorization: Bearer <key> header is required to add documents.' });
    }
    const { title, content, category, keywords } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required to add a document.' });
    }

    const newItem = addRuntimeKnowledgeItem({
      title: String(title).trim(),
      content: String(content).trim(),
      category: category || 'custom-api-doc',
      keywords: Array.isArray(keywords) ? keywords : typeof keywords === 'string' ? keywords.split(/,\s*/) : [],
    });

    return res.status(201).json({
      status: 'success',
      message: `Document '${newItem.title}' added to runtime knowledge graph.`,
      document: newItem,
      totalDocumentsLoaded: getAllKnowledge().length,
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
});

app.delete(['/api/v1/documents/:id', '/api/v1/knowledge/:id'], requireApiKey, (req, res) => {
  const docId = req.params.id;
  const removed = removeRuntimeKnowledgeItem(docId);
  if (!removed) {
    return res.status(404).json({ error: 'Document not found or is a protected built-in core corpus file.' });
  }
  return res.json({
    status: 'success',
    message: `Document ${docId} deleted.`,
    totalDocumentsLoaded: getAllKnowledge().length,
  });
});

app.post(['/api/v1/documents/search', '/api/v1/knowledge/search'], (req, res) => {
  authenticateApiKey(req);
  const query = req.body.query || req.body.prompt || req.body.q || '';
  const limit = Math.min(Math.max(Number(req.body.limit || req.body.topK || 5), 1), 20);

  if (!query) {
    return res.status(400).json({ error: 'Query is required for document search.' });
  }

  const allKnowledge = getAllKnowledge();
  const searchResults = searchKnowledgeGraph(query, allKnowledge, limit);

  res.json({
    query,
    totalHits: searchResults.length,
    hits: searchResults.map((result) => ({
      id: result.item.id,
      title: result.item.title,
      category: result.item.category,
      keywords: result.item.keywords,
      score: result.score,
      snippet: result.snippet,
      relevantSentences: result.relevantSentences || [],
      content: result.item.content,
    })),
  });
});

// 9. Dedicated Autonomous Symbolic & Numerical Math Engine Endpoint
app.post('/api/v1/math', (req, res) => {
  authenticateApiKey(req);
  const input = req.body.expression || req.body.query || req.body.prompt || req.body.input || '';
  if (!input) {
    return res.status(400).json({ error: 'Math expression or query is required in request body.' });
  }

  const solution = trySolveMath(String(input));
  if (!solution || !solution.isMath) {
    return res.status(200).json({
      isMath: false,
      input,
      message: 'Input was not recognized as a solvable mathematical expression or unit conversion.',
    });
  }

  return res.json({
    isMath: true,
    input,
    expression: solution.expression,
    result: solution.result,
    steps: solution.steps,
    explanation: solution.explanation,
  });
});

// 10. Dedicated Natural Language Entity Extraction Endpoint
app.post('/api/v1/entities', (req, res) => {
  authenticateApiKey(req);
  const text = req.body.text || req.body.prompt || req.body.query || '';
  if (!text) {
    return res.status(400).json({ error: 'Text is required for entity extraction.' });
  }

  const entities = extractQueryEntities(String(text));
  return res.json({
    text,
    count: entities.length,
    entities,
  });
});

// 11. Dedicated Autonomous Swear Engine & Expressive Profanity Endpoint
app.post('/api/v1/swear', (req, res) => {
  authenticateApiKey(req);
  const { text, intensity, language, isSuperChill, forceSwear, neverSwear } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required in request body.' });
  }

  const infused = infuseSwearyHumanVoice(String(text), {
    intensity: intensity || 'heavy',
    language: language || 'english',
    isSuperChill: Boolean(isSuperChill),
    forceSwear: forceSwear !== false,
    neverSwear: Boolean(neverSwear),
  });

  return res.json({
    originalText: text,
    infusedText: infused,
    hasSwearWords: hasSwearWords(infused),
    swearCount: getSwearCount(infused),
    intensity: intensity || 'heavy',
    language: language || 'english',
  });
});

app.get('/api/v1/corpus', (req, res) => {
  const all = getAllKnowledge();
  const catMap = new Map<string, number>();
  for (const doc of all) {
    catMap.set(doc.category, (catMap.get(doc.category) || 0) + 1);
  }

  res.json({
    status: 'online',
    totalCorpusDocuments: all.length,
    breakdownByCategory: Object.fromEntries(catMap),
    builtinCorpora: [
      'Everyday Basics & Practical How-Tos (Microwaves, Jumper Cables, Tire Changes, Soap Membrane Lysis)',
      'Science, Biology & Human Anatomy (Heart Chambers, Brain Lobes, Neurotransmitters, DNA vs RNA)',
      'Tech, Computing & Networking (Ohm\'s Law, DNS, TCP Handshake, B-Tree Databases, FlashAttention)',
      'History, Civilization & Humanity (World Epochs, Compound Interest, Logical Fallacies)',
      'AI & Cognitive Machine Learning Architectures',
      'Physics, Quantum Mechanics & Relativity',
      'Chemistry, Organic Chemistry & Periodic Table',
      'Biology, Genetics, Cellular & Molecular Life',
      'Astronomy, Cosmology & Space Exploration',
      'Mathematics, Calculus, Linear Algebra & Probability',
      'Computer Science, Systems & Algorithmic Complexity',
      'History, Ancient Civilizations, Middle Ages & Modern Era',
      'Geography, Continents, Climate Zones & Earth Features',
      'Philosophy, Ethics, Epistemology & Political Philosophy',
      'Economics, Micro/Macroeconomics & Behavioral Economics',
      'Psychology, Cognitive, Developmental & Social Psychology',
      'Technology, Semiconductors, Renewable Energy & Quantum Tech',
      'Football (Soccer), World Cup, UCL, Tactics & Legends',
      'Daily Life Skills, Hygiene, Cooking Basics, Etiquette & First Aid',
      'Discord Platform, Security, RaidShield, Scams & AutoMod',
      'Nutrition, Macronutrients, Vitamins, Minerals & Diet Types',
      'Mental Health, Anxiety, Depression, Stress & Sleep Science',
      'Personal Finance, 50/30/20 Budgeting, Emergency Funds & Investing',
      'Fitness, Strength Training, Hypertrophy, Cardio & HIIT',
      'Programming, Python, JavaScript, Git, REST APIs & DSA',
      'Health & Medicine, Immunology, Common Illnesses & Chronic Conditions',
      'Environment, Climate Change, Biodiversity & Sustainability',
      'Cooking Science, Dry/Moist Heat, Knife Skills & Flavour Balancing',
      'World Geography, Continents, Global Powers & Natural Wonders',
      'Entertainment, Music Theory, Genres, Video Games & Cinema',
    ],
  });
});

// 8. Dedicated SDK Rules Inspection & Enforcement Endpoint
app.all(['/api/v1/sdk/rules', '/api/v1/rules'], (req, res) => {
  res.json({
    status: 'active',
    rulesGuaranteed: true,
    supportedDirectives: [
      'swear_directive (always_swear, never_swear, polish_swear, natural)',
      'language (polish, english, spanish, french, german, auto)',
      'formatting (json, list, single_word, uppercase, lowercase, markdown_table)',
      'forbidden_phrases (never say X, don\'t mention Y)',
      'required_phrases (must contain X, always say Y)',
      'max_sentences (1 sentence only, 2 sentences only)',
      'roast_directives (savage comeback on demand)',
      'casseurt_roast_rule (fuck no! annoying pain in the ass)',
      'super_chill_vip_rule (User ID 1394001641899954368)',
      'raidshield_21_hard_rules (scam, raid, spam classification)',
    ],
    timestamp: new Date().toISOString(),
  });
});

app.all(['/api/v1/sdk/rules/enforce', '/api/v1/rules/enforce'], (req, res) => {
  authenticateApiKey(req);
  const { text, prompt, rules, customRules, directives, isSuperChillUser } = req.body;
  const targetText = text || prompt || '';
  const userRules = rules || customRules || directives || '';

  const parsed = parseSdkRules(userRules, targetText);
  const enforced = enforceStrictSdkRules(targetText, prompt || '', userRules, {
    isSuperChill: Boolean(isSuperChillUser),
  });

  res.json({
    originalText: targetText,
    enforcedText: enforced,
    parsedRules: parsed,
    rulesRespected: true,
    timestamp: new Date().toISOString(),
  });
});

// ----------------------------------------------------
// FRONTEND STATIC / VITE MIDDLEWARE SETUP
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexus & RaidShield API Server active at http://0.0.0.0:${PORT}`);
    // Fire-and-forget: pays the expensive one-time Polish-dictionary parse cost during startup
    // instead of on a live user's first Polish message. See polishSpellCheck.ts's comment on
    // warmPolishDictionary for why this exists — a synchronous parse can't be timeout-guarded
    // once it starts, so the only real fix is not letting it start mid-request.
    warmPolishDictionary();
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  postToDiscordLog(`Failed to start server: ${err?.message || err}`, 'error');
});

// Forwards genuine process-level crashes to Discord (via DISCORD_LOG_WEBHOOK_URL, see
// discordLogWebhook.ts) — same pattern the Discord bot's own app.js already uses for its crash
// handlers, so an operational problem on either side of the AI-engine/bot pair is visible in the
// same place instead of only ever showing up in Railway's own log viewer.
process.on('uncaughtException', (error) => {
  console.error('[Nexus] Uncaught exception:', error);
  postToDiscordLog(`Uncaught exception: ${error?.stack || error?.message || error}`, 'error');
});

process.on('unhandledRejection', (reason) => {
  console.error('[Nexus] Unhandled rejection:', reason);
  postToDiscordLog(`Unhandled rejection: ${(reason as any)?.message || reason}`, 'error');
});
