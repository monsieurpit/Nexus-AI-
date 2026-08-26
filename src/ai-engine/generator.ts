import {
  AISettings,
  ChatMessage,
  KnowledgeItem,
  MessageTelemetry,
  ModelPersona,
  ThoughtStep,
  UserMemory,
  WebSearchResult,
} from '../types';
import { generateReasoningPath } from './reasoningEngine';
import { calculateAttentionMatrix } from './semanticEngine';
import { countTokens, tokenize } from './tokenizer';

export interface GenerationCallbacks {
  onReasoningStart?: () => void;
  onReasoningComplete?: (steps: Awaited<ReturnType<typeof generateReasoningPath>>['thoughtSteps']) => void;
  onTokenChunk?: (partialContent: string) => void;
  onComplete?: (finalMessage: ChatMessage) => void;
  onError?: (error: Error) => void;
  // Fired at real, externally-observable stage transitions during the wait between
  // onReasoningStart and the first onTokenChunk — that whole window used to be dead silence from
  // the UI's perspective, since onTokenChunk only ever fires AFTER the real response is fully in
  // hand (the "streaming" below is a client-side typewriter replay of the already-finished,
  // already-safety-checked text, not real token-by-token generation). Coarse-grained (1-2 stages)
  // since generation now happens in a single server round-trip (see the module comment below) —
  // there's no longer a sequence of separately-observable client-side stages to report between.
  onProgress?: (stage: string) => void;
}

// Generation ALWAYS goes through server.ts's /api/v1/nexus, never localLlmClient.generate()
// directly in the browser. This used to be split — text generation ran client-side, image
// generation proxied through the server — which looked reasonable but was silently broken for
// the common case: localLlmClient.ts's OLLAMA_BASE_URL reads process.env, which Vite's browser
// build always replaces with `{}`, so it's permanently empty in a real browser regardless of
// .env.local. generate() checks for that and returns `{status: 'unavailable', reason:
// 'not_configured'}` immediately, with ZERO network I/O, before ever touching Ollama — meaning
// every website text reply was template/fallback text dressed up as a response, not a real
// generation. That's also why the website "felt faster" than the Discord bot: it wasn't doing the
// same work, it was skipping the LLM call entirely. Routing through the same endpoint the Discord
// bot already uses (server.ts runs the real generateReasoningPath pipeline, real Ollama access)
// fixes this and, as a side effect, removes an entire class of "client and server behave
// differently" bugs — retrieval, persona resolution, and reasoning-mode handling now only exist
// in one place. server.ts's resolveRequestedPersona forces every Discord-bot request to
// crashout-bot (a deliberate operator choice for that surface) — the `clientSettings` field below
// tells the endpoint to honor the website's own persona/settings selection instead, so the
// sidebar/customizer picker keeps working.
export async function generateAIResponse(
  userPrompt: string,
  history: ChatMessage[],
  persona: ModelPersona,
  settings: AISettings,
  knowledgeBase: KnowledgeItem[],
  userMemories: UserMemory[],
  callbacks: GenerationCallbacks,
  abortSignal?: AbortSignal,
  imageUrl?: string
): Promise<ChatMessage> {
  const startTime = performance.now();
  callbacks.onReasoningStart?.();

  try {
    return await runGeneration();
  } catch (error) {
    callbacks.onError?.(error instanceof Error ? error : new Error(String(error)));
    throw error;
  }

  async function runGeneration(): Promise<ChatMessage> {
    const isRaidShieldPersona = persona.id === 'raidshield-ai';
    const promptToSend = userPrompt || (imageUrl ? 'Inspect this image and tell me what is going on here' : '');

    callbacks.onProgress?.(imageUrl ? 'Scanning image...' : 'Thinking...');

    let responseText = '';
    let knowledgeHits: string[] = [];
    let webSearchResults: WebSearchResult[] = [];
    let webSearchExecuted = false;
    let serverThoughtSteps: ThoughtStep[] = [];

    if (imageUrl && isRaidShieldPersona) {
      // RaidShield's image scan is a distinct security-classification flow with its own response
      // shape (classification/confidence/reason), not a conversational persona reply — kept on
      // its own endpoint exactly as before, unaffected by the clientSettings/persona-respecting
      // change above (RaidShield only ever runs as itself, there's no "which persona" question).
      const resp = await fetch('/api/v1/raidshield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageText: promptToSend,
          imageUrl,
        }),
        signal: abortSignal,
      });
      if (!resp.ok) {
        throw new Error(`RaidShield API returned ${resp.status}`);
      }
      const scan = await resp.json();
      const badge = scan.classification === 'safe' ? '🟢 SAFE' : '🚨 ' + scan.classification.toUpperCase();
      responseText = `### 🛡️ RaidShield Visual Security Assessment\n\n- **Classification Status**: **${badge}**\n- **Confidence**: **${(scan.confidence * 100).toFixed(1)}%**\n- **Automod Action**: \`${scan.actionRecommended || 'ALLOW'}\`\n\n**Visual Findings & Explanation:**\n${scan.reason}\n\n> *RaidShield 21-Hard-Rules Engine scanned image bitmaps, text OCR, QR code targets, and Discord invite/token payload signatures.*`;
    } else {
      const resp = await fetch('/api/v1/nexus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          imageUrl: imageUrl || undefined,
          username: settings.userName,
          authorId: settings.discordUserId,
          isSuperChillUser: settings.isSuperChillUser,
          history,
          memories: userMemories.map((m) => ({
            key: m.key,
            fact: m.fact,
            confidence: m.confidence,
            timestamp: m.timestamp,
          })),
          // See the module comment above — tells the endpoint to honor this exact persona/settings
          // selection instead of resolveRequestedPersona's Discord-bot-only crashout-bot forcing.
          clientSettings: settings,
        }),
        signal: abortSignal,
      });
      if (!resp.ok) {
        throw new Error(`Nexus API returned ${resp.status}`);
      }
      const data = await resp.json();
      responseText = data.response || data.text || '';
      knowledgeHits = Array.isArray(data.knowledgeHits) ? data.knowledgeHits : [];
      webSearchResults = Array.isArray(data.webSources) ? data.webSources : [];
      webSearchExecuted = Boolean(data.webSearched);
      serverThoughtSteps = Array.isArray(data.thoughtSteps)
        ? data.thoughtSteps.map((t: any, i: number) => ({
            id: `step-${i}`,
            type: t.type,
            title: t.title,
            description: t.description,
            data: t.data,
            durationMs: t.durationMs,
          }))
        : [];
    }

    if (imageUrl) {
      serverThoughtSteps.unshift({
        id: 'step-vision-ocr',
        type: 'verification',
        title: 'Multimodal Vision & Bitmap OCR Processing',
        description: 'Extracted visual coordinates, image resolution, QR code matrices, embedded text, and suspicious token/crypto patterns.',
      });
    }

    callbacks.onReasoningComplete?.(serverThoughtSteps);

    // Compute multi-head attention distribution client-side — this is a local visualization aid
    // (see AttentionVisualizerModal.tsx), not part of the real generation, so it stays here rather
    // than adding another field to the API response. The "[KB: ...]" tokens need to come from the
    // real citations (knowledgeHits) so the visualizer shows what the response actually drew from,
    // not just the first 2 entries of the raw knowledge base array.
    const citedKnowledge =
      knowledgeHits.length > 0
        ? knowledgeBase.filter((k) => knowledgeHits.includes(k.title) || knowledgeHits.includes(k.id))
        : [];
    const attentionMatrix = calculateAttentionMatrix(
      userPrompt || 'Visual Input Matrix',
      persona.systemPrompt,
      citedKnowledge,
      settings.attentionHeads
    );

    // Tokenize the generated target text
    const outputTokens = tokenize(responseText);
    const promptTokensCount = countTokens(userPrompt || 'image_attachment');

    let streamedText = '';
    const streamDelayMap = {
      instant: 0,
      fast: 6,
      natural: 14,
      reflective: 26,
    };

    const delayMs = streamDelayMap[settings.streamingSpeed] ?? 14;

    if (delayMs === 0) {
      // Instant mode
      streamedText = responseText;
      callbacks.onTokenChunk?.(streamedText);
    } else {
      // Stream token by token
      for (let i = 0; i < outputTokens.length; i++) {
        if (abortSignal?.aborted) {
          break;
        }
        streamedText += outputTokens[i].text;
        callbacks.onTokenChunk?.(streamedText);

        // Add dynamic micro-pause on punctuation
        const isPunct = /^[.,!?:;]$/.test(outputTokens[i].text.trim());
        const currentDelay = isPunct ? delayMs * 2.2 : delayMs;

        if (currentDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, currentDelay));
        }
      }
    }

    const endTime = performance.now();
    const durationMs = Math.max(50, Math.round(endTime - startTime));
    const generatedTokensCount = countTokens(streamedText);
    const tokensPerSec = parseFloat(((generatedTokensCount / (durationMs / 1000)) || 0).toFixed(1));

    const telemetry: MessageTelemetry = {
      tokensPrompt: promptTokensCount,
      tokensGenerated: generatedTokensCount,
      generationTimeMs: durationMs,
      tokensPerSec,
      avgAttentionScore: parseFloat(
        (
          attentionMatrix.reduce((acc, a) => acc + a.score, 0) / Math.max(1, attentionMatrix.length)
        ).toFixed(2)
      ),
      topKnowledgeHits: knowledgeHits,
      reasoningStepsCount: serverThoughtSteps.length,
      webSearched: webSearchExecuted,
      webSourcesCount: webSearchResults.length,
    };

    const finalMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      role: 'assistant',
      content: streamedText,
      timestamp: Date.now(),
      thoughtProcess: serverThoughtSteps,
      telemetry,
      attentionMatrix,
      webSources: webSearchResults.length > 0 ? webSearchResults : undefined,
      isStreaming: false,
    };

    callbacks.onComplete?.(finalMessage);
    return finalMessage;
  }
}

// Real, AI-generated conversation titles (not a local heuristic) — a separate lightweight
// server-side endpoint, not /api/v1/nexus, since that always applies the active persona's full
// voice (mandatory swearing, chaotic asides) which is wrong for a UI label. Best-effort: returns
// null on any failure so the caller can fall back to its own heuristic title instead of leaving
// the conversation untitled.
export async function generateConversationTitle(userMessage: string, assistantReply: string): Promise<string | null> {
  try {
    const resp = await fetch('/api/v1/title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, reply: assistantReply }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return typeof data?.title === 'string' && data.title.trim() ? data.title.trim() : null;
  } catch {
    return null;
  }
}
