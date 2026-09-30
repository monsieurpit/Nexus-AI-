// Every model call the learning system makes goes through here. The difference that matters: a
// model that said something useless (parse failure, "NONE") is a real answer — the item is done.
// A model that couldn't be reached (Ollama down/restarting, timeout) is NOT an answer — the item must
// stay queued and be retried later, not be marked failed and lost (found 2026-09-30: every queued
// message processed during an Ollama restart was dropped as "extraction failed").

import * as localLlmClient from '../localLlmClient';
import type { OllamaGenerateOptions } from '../localLlmClient';

export class ModelUnavailableError extends Error {
  constructor(reason: string) {
    super(`model unavailable: ${reason}`);
    this.name = 'ModelUnavailableError';
  }
}

const UNREACHABLE = new Set(['connection_error', 'timeout', 'not_configured', 'http_error']);

// null = the model answered but produced nothing usable. Throws when the model couldn't be reached.
export async function learningGenerate(prompt: string, options: Omit<OllamaGenerateOptions, 'model' | 'think' | 'skipLanguageCheck'>): Promise<string | null> {
  const result = await localLlmClient.generate(prompt, {
    ...options,
    think: false,
    skipLanguageCheck: true,
    model: localLlmClient.chatModel(),
    timeoutMs: options.timeoutMs ?? 45000,
  });
  if (result.status === 'success') return result.text;
  if (UNREACHABLE.has(result.reason)) throw new ModelUnavailableError(result.reason);
  return null;
}

export async function learningEmbed(text: string): Promise<Float32Array> {
  const r = await localLlmClient.embed(text);
  if (r.status !== 'success') throw new ModelUnavailableError(`embed ${r.reason}`);
  return new Float32Array(r.vector);
}
