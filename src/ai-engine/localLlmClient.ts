const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || '').replace(/\/+$/, '');
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';

export interface OllamaGenerateOptions {
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
  system?: string;
}

export type LocalLlmResult =
  | { status: 'success'; text: string; latencyMs: number }
  | {
      status: 'unavailable';
      reason: 'not_configured' | 'connection_error' | 'timeout' | 'http_error' | 'empty_response';
      detail?: string;
    };

export async function checkAvailability(timeoutMs = 2000): Promise<boolean> {
  if (!OLLAMA_BASE_URL) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { signal: controller.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function generate(prompt: string, options: OllamaGenerateOptions = {}): Promise<LocalLlmResult> {
  if (!OLLAMA_BASE_URL) {
    return { status: 'unavailable', reason: 'not_configured' };
  }

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 12000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        system: options.system,
        stream: false,
        options: {
          temperature: options.temperature ?? 0.5,
          num_predict: options.maxTokens ?? 400,
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { status: 'unavailable', reason: 'http_error', detail: detail.slice(0, 300) };
    }

    const data: any = await res.json();
    const text = typeof data?.response === 'string' ? data.response.trim() : '';
    if (!text) {
      return { status: 'unavailable', reason: 'empty_response' };
    }

    return { status: 'success', text, latencyMs: Date.now() - startedAt };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { status: 'unavailable', reason: 'timeout' };
    }
    return { status: 'unavailable', reason: 'connection_error', detail: String(err?.message || err) };
  } finally {
    clearTimeout(timer);
  }
}
