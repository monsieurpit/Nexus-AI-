import {
  AISettings,
  ChatMessage,
  KnowledgeItem,
  MessageTelemetry,
  ModelPersona,
  UserMemory,
  WebSearchResult,
} from '../types';
import { generateReasoningPath, assessCorpusConfidence } from './reasoningEngine';
import { calculateAttentionMatrix } from './semanticEngine';
import { countTokens, tokenize } from './tokenizer';
import {
  executeUnifiedWebSearch,
  shouldTriggerLiveWebSearch,
  buildWebSearchQuery,
} from './webSearchEngine';

export interface GenerationCallbacks {
  onReasoningStart?: () => void;
  onReasoningComplete?: (steps: ReturnType<typeof generateReasoningPath>['thoughtSteps']) => void;
  onTokenChunk?: (partialContent: string) => void;
  onComplete?: (finalMessage: ChatMessage) => void;
  onError?: (error: Error) => void;
}

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
  // If image is present, attempt server-side multimodal vision call
  let serverVisionContent = '';
  const isRaidShieldPersona = persona.id === 'raidshield-ai';

  if (imageUrl) {
    try {
      if (isRaidShieldPersona) {
        const resp = await fetch('/api/v1/raidshield', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messageText: userPrompt || 'Scan attached image',
            imageUrl: imageUrl,
          }),
          signal: abortSignal,
        });
        if (resp.ok) {
          const scan = await resp.json();
          const badge = scan.classification === 'safe' ? '🟢 SAFE' : '🚨 ' + scan.classification.toUpperCase();
          serverVisionContent = `### 🛡️ RaidShield Visual Security Assessment\n\n- **Classification Status**: **${badge}**\n- **Confidence**: **${(scan.confidence * 100).toFixed(1)}%**\n- **Automod Action**: \`${scan.actionRecommended || 'ALLOW'}\`\n\n**Visual Findings & Explanation:**\n${scan.reason}\n\n> *RaidShield 21-Hard-Rules Engine scanned image bitmaps, text OCR, QR code targets, and Discord invite/token payload signatures.*`;
        }
      } else {
        const resp = await fetch('/api/v1/nexus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userPrompt || 'Inspect this image and tell me what is going on here',
            imageUrl: imageUrl,
            isSuperChillUser: settings.isSuperChillUser,
            username: settings.userName,
          }),
          signal: abortSignal,
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.response || data.text) {
            serverVisionContent = data.response || data.text;
          }
        }
      }
    } catch (e) {
      console.warn('Multimodal vision API call returned fallback:', e);
    }
  }

  // Check if Live Google / Web search is needed
  let webSearchResults: WebSearchResult[] = [];
  let webSearchExecuted = false;
  let webSearchQuery = '';

  const knowledgeConfidence = userPrompt ? assessCorpusConfidence(userPrompt, knowledgeBase) : undefined;
  const searchTriggerReason =
    !imageUrl && userPrompt ? shouldTriggerLiveWebSearch(userPrompt, settings, knowledgeConfidence) : false;

  if (searchTriggerReason) {
    const searchQuery = buildWebSearchQuery(userPrompt, searchTriggerReason);
    try {
      // First try server endpoint (which has direct unrestricted node fetch)
      const resp = await fetch('/api/v1/web/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          provider: settings.webSearchEngine || 'all',
          limit: 5,
        }),
        signal: abortSignal,
      });

      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data.results) && data.results.length > 0) {
          webSearchResults = data.results;
          webSearchExecuted = true;
          webSearchQuery = data.query || searchQuery;
        }
      }
    } catch {
      // Fallback: client-side unified web search
      try {
        const fallbackRes = await executeUnifiedWebSearch(searchQuery, {
          provider: settings.webSearchEngine || 'all',
          limit: 5,
        });
        if (fallbackRes.results.length > 0) {
          webSearchResults = fallbackRes.results;
          webSearchExecuted = true;
          webSearchQuery = fallbackRes.query;
        }
      } catch (err) {
        console.warn('Web search fallback error:', err);
      }
    }
  }

  // Run reasoning synthesis
  const reasoningResult = generateReasoningPath(
    userPrompt || (imageUrl ? 'Inspect uploaded image visual features' : ''),
    history,
    persona,
    settings,
    knowledgeBase,
    userMemories,
    webSearchResults
  );

  // If we have an image, inject visual thought steps
  if (imageUrl) {
    reasoningResult.thoughtSteps.unshift({
      id: 'step-vision-ocr',
      type: 'verification',
      title: 'Multimodal Vision & Bitmap OCR Processing',
      description: 'Extracted visual coordinates, image resolution, QR code matrices, embedded text, and suspicious token/crypto patterns.',
    });
  }

  // Use server vision content if received, else local reasoning content
  const finalTargetText = serverVisionContent || reasoningResult.content;

  callbacks.onReasoningComplete?.(reasoningResult.thoughtSteps);

  // Compute multi-head attention distribution — the "[KB: ...]" tokens are meant to show which
  // documents the response actually drew from, so they need to come from the real citations
  // (reasoningResult.knowledgeHits), not just the first 2 entries of the raw knowledge base array
  // in whatever order it happens to be stored — that showed the same arbitrary 2 documents in the
  // Attention Visualizer for every single query regardless of topic.
  const citedKnowledge =
    reasoningResult.knowledgeHits.length > 0
      ? knowledgeBase.filter((k) => reasoningResult.knowledgeHits.includes(k.title) || reasoningResult.knowledgeHits.includes(k.id))
      : [];
  const attentionMatrix = calculateAttentionMatrix(
    userPrompt || 'Visual Input Matrix',
    persona.systemPrompt,
    citedKnowledge,
    settings.attentionHeads
  );

  // Tokenize the generated target text
  const outputTokens = tokenize(finalTargetText);
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
    streamedText = finalTargetText;
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
    topKnowledgeHits: reasoningResult.knowledgeHits,
    reasoningStepsCount: reasoningResult.thoughtSteps.length,
    webSearched: webSearchExecuted,
    webSearchQuery: webSearchQuery,
    webSourcesCount: webSearchResults.length,
  };

  const finalMessage: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    role: 'assistant',
    content: streamedText,
    timestamp: Date.now(),
    thoughtProcess: reasoningResult.thoughtSteps,
    telemetry,
    attentionMatrix,
    webSources: webSearchResults.length > 0 ? webSearchResults : undefined,
    isStreaming: false,
  };

  callbacks.onComplete?.(finalMessage);
  return finalMessage;
  }
}
