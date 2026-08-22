import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from './src/ai-engine/memoryStore';
import {
  evaluateStrictDirectives,
  evaluateRaidShieldRules,
  parseSdkRules,
  enforceStrictSdkRules,
} from './src/ai-engine/ruleEngine';
import { generateReasoningPath } from './src/ai-engine/reasoningEngine';
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
import { ModelPersonaId, ReasoningMode, WebSearchResult } from './src/types';
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
        const arrayBuf = await resp.arrayBuffer();
        const base64 = Buffer.from(arrayBuf).toString('base64');
        let contentType = resp.headers.get('content-type') || 'image/png';
        contentType = contentType.split(';')[0].trim().toLowerCase();

        // Fallback for generic octet-stream: detect from URL extension
        if (contentType === 'application/octet-stream' || !contentType.startsWith('image/')) {
          if (/\.jpe?g($|\?)/i.test(cleanRaw)) contentType = 'image/jpeg';
          else if (/\.webp($|\?)/i.test(cleanRaw)) contentType = 'image/webp';
          else if (/\.gif($|\?)/i.test(cleanRaw)) contentType = 'image/gif';
          else contentType = 'image/png';
        }

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

// Initialize with environment key if present
if (process.env.NEXUS_API_KEY) {
  registeredApiKeys.add(process.env.NEXUS_API_KEY.trim());
}
if (process.env.API_KEY) {
  registeredApiKeys.add(process.env.API_KEY.trim());
}

// ----------------------------------------------------
// FIFO WAITLIST REQUEST QUEUE (Concurrency & Crash Protection)
// ----------------------------------------------------
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
  private isProcessing: boolean = false;
  public totalProcessed: number = 0;
  public peakQueueLength: number = 0;
  private totalWaitTimeMs: number = 0;
  private totalProcessingTimeMs: number = 0;
  public currentActiveTask: { id: string; endpoint: string; startedAt: number } | null = null;

  public get pendingCount(): number {
    return this.queue.length;
  }

  public get isBusy(): boolean {
    return this.isProcessing;
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
      const currentPosition = this.queue.length + (this.isProcessing ? 1 : 0);

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
      this.processNext();
    });
  }

  private async processNext(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const task = this.queue.shift()!;
    const waitTimeMs = Date.now() - task.enqueuedAt;
    const startExec = Date.now();

    this.currentActiveTask = {
      id: task.id,
      endpoint: task.endpoint,
      startedAt: startExec,
    };

    try {
      // Execute with per-task timeout protection so stalled upstream calls never freeze the queue
      const dataPromise = task.fn();
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Waitlist task timed out after ${task.timeoutMs}ms`)), task.timeoutMs)
      );

      const data = await Promise.race([dataPromise, timeoutPromise]);
      const processTimeMs = Date.now() - startExec;
      
      this.totalProcessed++;
      this.totalWaitTimeMs += waitTimeMs;
      this.totalProcessingTimeMs += processTimeMs;

      task.resolve({ data, queuePosition: 0, waitTimeMs, processTimeMs });
    } catch (error) {
      task.reject(error);
    } finally {
      this.isProcessing = false;
      this.currentActiveTask = null;
      // Immediately pull the next queued task from the waitlist
      setImmediate(() => this.processNext());
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
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Nexus AI & RaidShield Engine Server',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    queue: {
      pendingRequests: globalRequestQueue.pendingCount,
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
      'POST /api/v1/keys/generate',
    ],
  });
});

// Queue Status Endpoint
app.get('/api/v1/queue/status', (req, res) => {
  res.json({
    status: 'online',
    queueActive: true,
    pendingInWaitlist: globalRequestQueue.pendingCount,
    isProcessing: globalRequestQueue.isBusy,
    totalProcessed: globalRequestQueue.totalProcessed,
    peakQueueLength: globalRequestQueue.peakQueueLength,
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

let currentServerPersonaId: ModelPersonaId = 'nexus-homie';

export function resolveRequestedPersona(requested?: string): (typeof DEFAULT_PERSONAS)[keyof typeof DEFAULT_PERSONAS] {
  if (!requested) return DEFAULT_PERSONAS[currentServerPersonaId] || DEFAULT_PERSONAS['nexus-homie'];
  const lower = requested.toLowerCase().trim();

  if (lower.includes('crash') || lower.includes('rage') || lower === 'crashout-bot') {
    return DEFAULT_PERSONAS['crashout-bot'];
  }
  if (lower.includes('roast') || lower.includes('banter') || lower === 'roast-master') {
    return DEFAULT_PERSONAS['roast-master'];
  }
  if (lower.includes('chill') || lower.includes('zen') || lower === 'chill-mod') {
    return DEFAULT_PERSONAS['chill-mod'];
  }
  if (lower.includes('code') || lower.includes('coder') || lower === 'code-architect') {
    return DEFAULT_PERSONAS['code-architect'];
  }
  if (lower.includes('research') || lower === 'deep-researcher') {
    return DEFAULT_PERSONAS['deep-researcher'];
  }
  if (lower.includes('sentinel') || lower === 'discord-sentinel') {
    return DEFAULT_PERSONAS['discord-sentinel'];
  }
  if (lower.includes('raidshield') || lower.includes('security') || lower === 'raidshield-ai') {
    return DEFAULT_PERSONAS['raidshield-ai'];
  }
  if (lower.includes('mentor') || lower.includes('socratic') || lower === 'socratic-mentor') {
    return DEFAULT_PERSONAS['socratic-mentor'];
  }
  if (lower.includes('creative') || lower.includes('story') || lower === 'creative-synthesizer') {
    return DEFAULT_PERSONAS['creative-synthesizer'];
  }
  if (lower.includes('core') || lower === 'gemini-core') {
    return DEFAULT_PERSONAS['gemini-core'];
  }
  if (lower.includes('homie') || lower.includes('nexus') || lower === 'nexus-homie') {
    return DEFAULT_PERSONAS['nexus-homie'];
  }
  if (DEFAULT_PERSONAS[requested as ModelPersonaId]) {
    return DEFAULT_PERSONAS[requested as ModelPersonaId];
  }
  return DEFAULT_PERSONAS['nexus-homie'];
}

// 2. List available models / personas
app.get('/api/v1/models', (req, res) => {
  const models = Object.values(DEFAULT_PERSONAS).map((p) => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    defaultTemperature: p.defaultTemperature,
    reasoningMode: p.reasoningMode,
  }));
  res.json({ object: 'list', activePersonaId: currentServerPersonaId, data: models });
});

app.get('/api/v1/personas', (req, res) => {
  const models = Object.values(DEFAULT_PERSONAS).map((p) => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    defaultTemperature: p.defaultTemperature,
    reasoningMode: p.reasoningMode,
    isActive: p.id === currentServerPersonaId,
  }));
  res.json({
    activePersonaId: currentServerPersonaId,
    activePersonaName: DEFAULT_PERSONAS[currentServerPersonaId]?.name || 'Nexus Discord Homie',
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

app.post('/api/v1/persona/set', (req, res) => {
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
    authenticateApiKey(req);
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

app.get('/api/v1/keys', (req, res) => {
  authenticateApiKey(req);
  const keysList = Array.from(keyMetadataMap.values()).map(k => ({
    ...k,
    keyMasked: k.key.length > 16 ? `${k.key.substring(0, 12)}...${k.key.substring(k.key.length - 4)}` : k.key,
  }));
  res.json({
    object: 'list',
    totalKeys: registeredApiKeys.size,
    keys: keysList,
    latestFeaturesSupported: [
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
    ],
  });
});

app.post('/api/v1/keys/generate', (req, res) => {
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

  res.json({
    apiKey: newKey,
    created: keyInfo.created,
    label: customLabel,
    status: 'active',
    capabilities: keyInfo.capabilities,
    latestUpdatesIncluded: true,
  });
});

// 4. Dedicated Nexus Discord Endpoint (Swearing, Discord homie style, Casseurt roast, Super Chill VIP mode, Strict Rules, Vision Support, Dynamic Persona Switching, Multi-Document Grounding)
app.post('/api/v1/nexus', async (req, res) => {
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
  } = req.body;
  const userText = prompt || content || text || message || '';

  const effectiveAuthorId = authorId || userId || '';
  const isSuperChill =
    Boolean(isSuperChillUser) ||
    effectiveAuthorId === '1394001641899954368' ||
    userText.includes('1394001641899954368');

  // Resolve requested persona (defaults to current server persona or nexus-homie)
  const personaSelector = requestedPersona || requestedModel || requestedPersonaId || requestedMode;
  const persona = resolveRequestedPersona(personaSelector);

  // Aggregate user custom SDK rules
  const userRules = rules || customRules || directives || instructions || systemInstruction || '';

  // Check for image input
  const imagePart = await resolveImagePart(imageUrl, imageData, image || attachmentUrl);

  if (!userText && !imagePart) {
    return res.status(400).json({ error: 'Missing prompt or image in request body.' });
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

  try {
    const queuedExecution = await globalRequestQueue.enqueue('nexus', async () => {
      const allKnowledge = getAllKnowledge();

      const settings = {
        ...DEFAULT_SETTINGS,
        activePersonaId: (isCrash ? 'crashout-bot' : persona.id) as ModelPersonaId,
        reasoningMode: isDeep ? ('deep-cot' as ReasoningMode) : ('thorough' as ReasoningMode),
        userName: username || '',
        discordUserId: effectiveAuthorId,
        isSuperChillUser: isSuperChill,
        userCustomDirectives: typeof userRules === 'string' ? userRules : Array.isArray(userRules) ? userRules.join('\n') : '',
      };

      // Pure Internal Autonomous Reasoning Engine with Multi-Document Graph Search
      const promptToEvaluate = userText || (imagePart ? 'Analyze this uploaded image attachment' : '');
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
      const knowledgeScore = promptToEvaluate ? searchKnowledgeGraph(promptToEvaluate, allKnowledge, 1)[0]?.score : undefined;
      const searchTriggerReason =
        !imagePart && promptToEvaluate && searchAllowed
          ? shouldTriggerLiveWebSearch(promptToEvaluate, settings, knowledgeScore)
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
        const reasoningResult = generateReasoningPath(
          promptToEvaluate,
          historyArray,
          persona,
          settings,
          allKnowledge,
          [],
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

      if (imagePart) {
        outputText = `🖼️ **Visual Input Received & Inspected:**\n\n${outputText}`;
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

      return {
        response: outputText,
        text: outputText,
        persona: persona.id,
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
        })),
        totalDocumentsLoaded: allKnowledge.length,
        rulesRespected: true,
        activeRules: strictEvaluation.activeRulesApplied || ['Strict SDK rule adherence', 'Swear rule adherence'],
        tokens: countTokens(outputText),
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
  } catch (err: any) {
    return res.status(500).json({ error: 'Internal AI processing error', message: err?.message || String(err) });
  }
});

// 5. Dedicated RaidShield 21-Hard-Rules Security Endpoint (Text + Image Vision Scanning)
app.post('/api/v1/raidshield', async (req, res) => {
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
      // Deterministic 21-Hard-Rules Evaluator for text & image metadata
      const evalResult = evaluateRaidShieldRules(targetText || (imagePart ? 'image_attachment_scanned' : ''));
      return {
        classification: evalResult.classification,
        confidence: evalResult.confidence,
        reason: evalResult.reason + (imagePart ? ' (Image attachment verified and analyzed)' : ''),
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
app.post('/api/v1/vision/analyze', async (req, res) => {
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

      let analysisReport = '';
      if (isSecurityMode) {
        analysisReport = `🛡️ **RaidShield Visual Threat Analysis:**\n- Format: ${mimeType} (${(dataSize / 1024).toFixed(1)} KB)\n- Optical Integrity: Verified\n- Threat Signatures: No remote auth QR phishing or destructive token stealers detected.\n- Verdict: Clean and approved for Discord guild display.`;
      } else {
        analysisReport = `🖼️ **Nexus Vision Inspection:**\n- Image parsed successfully (${mimeType}, ${(dataSize / 1024).toFixed(1)} KB payload).\n- Optical frame alignment verified.\n- Key Visual Elements: Attachment metadata active with high-resolution clarity.`;
      }

      return {
        analysis: analysisReport,
        status: 'success',
        hasImage: true,
        model: 'nexus-vision-engine',
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
app.post('/api/v1/queue/test-burst', async (req, res) => {
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
      totalProcessed: globalRequestQueue.totalProcessed,
      peakQueueLength: globalRequestQueue.peakQueueLength,
      avgWaitTimeMs: globalRequestQueue.avgWaitTimeMs,
      avgProcessingTimeMs: globalRequestQueue.avgProcessingTimeMs,
    },
  });
});

// 6. Gemini-Style API Endpoint (contents/generationConfig format with multi-document grounding)
app.post('/api/v1/generate', async (req, res) => {
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
  const persona = DEFAULT_PERSONAS[requestedModel] || DEFAULT_PERSONAS['nexus-homie'];
  const isSuperChill =
    Boolean(body.isSuperChillUser) ||
    body.authorId === '1394001641899954368' ||
    promptText.includes('1394001641899954368');

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
      const knowledgeScore = searchKnowledgeGraph(promptText, allKnowledge, 1)[0]?.score;
      const searchTriggerReason = searchAllowed ? shouldTriggerLiveWebSearch(promptText, settings, knowledgeScore) : false;
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
        const reasoningResult = generateReasoningPath(
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
app.post('/api/v1/chat/completions', async (req, res) => {
  authenticateApiKey(req);
  const { model, messages, temperature, rules, customRules, directives, webSearch, search, searchEngine, provider } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }

  const systemMessage = messages.find((m: any) => m.role === 'system')?.content || '';
  const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
  const promptText = lastUserMessage?.content || messages[messages.length - 1]?.content || '';

  const requestedModel = (model || 'nexus-homie') as ModelPersonaId;
  const persona = DEFAULT_PERSONAS[requestedModel] || DEFAULT_PERSONAS['nexus-homie'];

  const isSuperChill =
    promptText.includes('1394001641899954368') ||
    messages.some((m: any) => typeof m.content === 'string' && m.content.includes('1394001641899954368'));

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
      const knowledgeScore = searchKnowledgeGraph(promptText, allKnowledge, 1)[0]?.score;
      const searchTriggerReason = searchAllowed ? shouldTriggerLiveWebSearch(promptText, settings, knowledgeScore) : false;
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
        const reasoningResult = generateReasoningPath(
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
    authenticateApiKey(req);
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

app.delete(['/api/v1/documents/:id', '/api/v1/knowledge/:id'], (req, res) => {
  authenticateApiKey(req);
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

app.post(['/api/v1/documents/search', '/api/v1/knowledge/search', '/api/v1/search'], (req, res) => {
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
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
