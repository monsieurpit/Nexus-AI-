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
      reason: 'not_configured' | 'connection_error' | 'timeout' | 'http_error' | 'empty_response' | 'degenerate_output';
      detail?: string;
    };

// Small local models occasionally spiral into runaway repetition loops at higher temperatures
// ("ASSHOLE! ASSHOLE! ASSHOLE! ..." repeated for the entire output) — this catches that failure
// mode so callers fall back to their template text instead of showing broken output to a user.
function isDegenerateRepetition(text: string): boolean {
  const words = text.trim().split(/\s+/);
  let runLength = 1;
  for (let i = 1; i < words.length; i++) {
    if (words[i].toLowerCase() === words[i - 1].toLowerCase()) {
      runLength++;
      if (runLength >= 6) return true;
    } else {
      runLength = 1;
    }
  }
  // Catches the other common small-model failure mode: the output devolves into one long
  // run-on token with no spaces/punctuation ("BYEBYEEEHHAAALLDDSS...ONEGOGOYOHOH...") instead of
  // word-level repetition. No legitimate English/French sentence produces a 35+ character
  // unbroken alphabetic token.
  if (words.some((w) => /^[a-zA-Z]{35,}$/.test(w))) return true;
  return false;
}

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
  const timeoutMs = options.timeoutMs ?? 30000;
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
          repeat_penalty: 1.3,
          repeat_last_n: 128,
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
    if (isDegenerateRepetition(text)) {
      return { status: 'unavailable', reason: 'degenerate_output', detail: text.slice(0, 100) };
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
