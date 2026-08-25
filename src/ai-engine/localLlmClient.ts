const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || '').replace(/\/+$/, '');
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
// Benchmarked live against qwen2.5:3b on identical Polish prompts: qwen produced broken grammar,
// invented words, and stray non-Polish characters, while this Polish-specialized model (SpeakLeash/
// Bielik, trained specifically for Polish fluency) answered cleanly and correctly. NOT used as the
// default model — benchmarked on English too, and it leaked raw template/stop tokens into real
// output (e.g. "<|end_id: assistant>") and gave a completely unrelated answer to "whats up" — it's
// only reliable for Polish. Callers opt in per-call via generate()'s preferPolish option once they've
// detected the user's message is actually Polish; English stays on OLLAMA_MODEL as before.
const OLLAMA_MODEL_POLISH = process.env.OLLAMA_MODEL_POLISH || 'SpeakLeash/bielik-1.5b-v3.0-instruct:Q8_0';

// server.ts's request queue allows up to 5 requests to run truly concurrently, but a single Mac
// Mini running Ollama locally can only actually generate for one request at a time — it doesn't
// run 5 requests in parallel internally, it serializes them. Without this, 5 concurrent requests
// each started their own 30s client-side timeout clock immediately, but requests 2-5 sat waiting
// their turn inside Ollama and often didn't even start real generation until close to or past that
// 30s mark — observed live as a burst of "context canceled" cancellations on the tunnel, all
// clustered in the same second, whenever several requests landed close together. This semaphore
// caps how many requests are allowed to actually be inside an Ollama call at once; anything past
// that limit waits here first — the request's own timeout clock (below) only starts once it
// actually begins, so waiting for a turn no longer eats into that budget. The outer request queue
// in server.ts already bounds total worst-case wait via its own 45s per-task timeout, so no
// separate wait-timeout is needed here. Applies to both generate() and embed() since they compete
// for the same underlying model-serving capacity on the same machine.
const OLLAMA_MAX_CONCURRENT = Math.max(1, Number(process.env.OLLAMA_MAX_CONCURRENT) || 1);
let activeOllamaCalls = 0;
const ollamaWaitQueue: (() => void)[] = [];

function acquireOllamaSlot(): Promise<() => void> {
  return new Promise((resolve) => {
    const grant = () => {
      activeOllamaCalls++;
      resolve(() => {
        activeOllamaCalls--;
        const next = ollamaWaitQueue.shift();
        if (next) next();
      });
    };
    if (activeOllamaCalls < OLLAMA_MAX_CONCURRENT) {
      grant();
    } else {
      ollamaWaitQueue.push(grant);
    }
  });
}

export interface OllamaGenerateOptions {
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
  system?: string;
  topP?: number;
  stopSequences?: string[];
  // Set by callers that have already detected the user's message is Polish (see
  // reasoningEngine.ts's looksPolish()) — routes this one call to OLLAMA_MODEL_POLISH instead of
  // the default model. Never set automatically here since generate() only sees the fully-built
  // prompt/system text, not the original raw user message language.
  preferPolish?: boolean;
}

export type LocalLlmResult =
  | { status: 'success'; text: string; latencyMs: number }
  | {
      status: 'unavailable';
      reason:
        | 'not_configured'
        | 'connection_error'
        | 'timeout'
        | 'http_error'
        | 'empty_response'
        | 'degenerate_output';
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
  // unbroken alphabetic run. Unanchored (not ^...$) — observed live, this reached a user because
  // the gibberish run had trailing punctuation/emoji glued on with no space ("...WWWW!!!11️⃣"),
  // which an anchored "the whole token is letters" check doesn't match.
  if (/[a-zA-Z]{35,}/.test(text)) return true;
  // A third failure mode: the model echoes the style instruction as a literal fill-in-the-blank
  // placeholder instead of actually substituting real profanity — "<insert profanity>", "[insert
  // swear word here]", etc. — rather than following it. Observed live: "Shit <insert profanity>
  // 🤞 Hope your day's rollin' along smooth as silk".
  if (/[<\[{]\s*insert\s+(?:profanity|swear|curse)/i.test(text)) return true;
  // A fourth failure mode: a whole phrase/paragraph looping verbatim, not just a single word —
  // observed live, a ~250-character rant block repeated 5 times back to back at high temperature
  // on a long generation. Sample fixed-length windows across the text and check whether any of
  // them reappears verbatim later on; no legitimate long-form response repeats a 50+ character
  // chunk exactly, so this is safe from false positives.
  const WINDOW = 50;
  if (text.length >= WINDOW * 2) {
    const step = Math.max(20, Math.floor(text.length / 12));
    for (let i = 0; i + WINDOW <= text.length; i += step) {
      const chunk = text.slice(i, i + WINDOW);
      const firstIdx = text.indexOf(chunk);
      if (firstIdx !== -1 && text.indexOf(chunk, firstIdx + WINDOW) !== -1) return true;
    }
  }
  return false;
}

// Only used when Ollama itself reports the generation was cut off by the token cap
// (done_reason: "length"), not on a naturally-finished response — a complete response that
// happens not to end in ./!/? (e.g. it ends in a code block or list item) should never be trimmed.
function trimIncompleteTail(text: string): string {
  const lastSentenceEnd = Math.max(text.lastIndexOf('.'), text.lastIndexOf('!'), text.lastIndexOf('?'));
  // Keep at least half the response — never chop away most of an otherwise-complete-feeling reply
  // just because its last few words happen to trail off past the final punctuation mark.
  if (lastSentenceEnd === -1 || lastSentenceEnd < text.length * 0.4) return text;
  return text.slice(0, lastSentenceEnd + 1);
}

/**
 * Pings Ollama and confirms OLLAMA_MODEL is actually pulled — a server that's up but hasn't
 * pulled the configured model will otherwise pass a bare connectivity check and then fail every
 * real generate() call, which is a worse failure mode to discover mid-request than at startup.
 */
export async function checkAvailability(timeoutMs = 2000): Promise<boolean> {
  if (!OLLAMA_BASE_URL) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { signal: controller.signal });
    if (!res.ok) return false;
    const data: any = await res.json().catch(() => null);
    const models: string[] = Array.isArray(data?.models) ? data.models.map((m: any) => m?.name).filter(Boolean) : [];
    return models.includes(OLLAMA_MODEL);
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Uses /api/chat (system + user role messages) rather than /api/generate's flat prompt string —
 * Ollama applies the model's actual chat template this way, which follows system instructions
 * more reliably than /api/generate's looser prompt/system concatenation.
 */
export async function generate(prompt: string, options: OllamaGenerateOptions = {}): Promise<LocalLlmResult> {
  if (!OLLAMA_BASE_URL) {
    return { status: 'unavailable', reason: 'not_configured' };
  }

  const release = await acquireOllamaSlot();
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 30000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const messages = [
      ...(options.system ? [{ role: 'system', content: options.system }] : []),
      { role: 'user', content: prompt },
    ];

    const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: options.preferPolish ? OLLAMA_MODEL_POLISH : OLLAMA_MODEL,
        messages,
        stream: false,
        options: {
          temperature: options.temperature ?? 0.5,
          num_predict: options.maxTokens ?? 400,
          top_p: options.topP,
          stop: options.stopSequences,
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
    let text = typeof data?.message?.content === 'string' ? data.message.content.trim() : '';
    if (!text) {
      return { status: 'unavailable', reason: 'empty_response' };
    }
    // The Bielik GGUF (used for preferPolish) was observed leaking raw chat-template/stop tokens
    // into real output — "<|end_id: assistant>" and "<|EOF|>" showed up verbatim in otherwise
    // normal responses during benchmarking, presumably a template mismatch between the GGUF and
    // Ollama's chat handling. Strips any "<|...|>"-style token, which qwen's own output never
    // legitimately contains, so this is a no-op for the default model.
    text = text.replace(/<\|[^|<>]{1,40}\|>/g, '').trim();
    if (!text) {
      return { status: 'unavailable', reason: 'empty_response' };
    }
    // A response cut off mid-generation by num_predict (Ollama reports this as
    // done_reason: "length") often ends in a dangling half-sentence or the small model's last few
    // tokens degrading into incoherent token-soup right at the cutoff — observed live: a fully
    // normal response tailed off into "😅😩💪✨zerszynek dziśka ! !" once the length cap hit.
    // Trimming back to the last complete sentence drops that garbage tail instead of shipping it.
    if (data?.done_reason === 'length') {
      text = trimIncompleteTail(text);
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
    release();
  }
}

export type EmbedResult =
  | { status: 'success'; vector: number[]; latencyMs: number }
  | {
      status: 'unavailable';
      reason: 'not_configured' | 'connection_error' | 'timeout' | 'http_error' | 'empty_response';
      detail?: string;
    };

/**
 * Calls Ollama's /api/embed for real semantic embeddings (OLLAMA_EMBED_MODEL, default
 * nomic-embed-text) — same never-throws/typed-unavailable contract as generate(), but a much
 * shorter default timeout since this sits on the hot query path and must fail fast rather than
 * hold up a response for 30s when the embed model/tunnel isn't reachable.
 */
export async function embed(text: string, options: { timeoutMs?: number } = {}): Promise<EmbedResult> {
  if (!OLLAMA_BASE_URL) {
    return { status: 'unavailable', reason: 'not_configured' };
  }

  const release = await acquireOllamaSlot();
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 4000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ model: OLLAMA_EMBED_MODEL, input: text }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { status: 'unavailable', reason: 'http_error', detail: detail.slice(0, 300) };
    }

    const data: any = await res.json();
    // /api/embed is batch-capable (embeddings: number[][]) even for a single input string.
    const vector = Array.isArray(data?.embeddings) ? data.embeddings[0] : undefined;
    if (!Array.isArray(vector) || vector.length === 0) {
      return { status: 'unavailable', reason: 'empty_response' };
    }

    return { status: 'success', vector, latencyMs: Date.now() - startedAt };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { status: 'unavailable', reason: 'timeout' };
    }
    return { status: 'unavailable', reason: 'connection_error', detail: String(err?.message || err) };
  } finally {
    clearTimeout(timer);
    release();
  }
}
