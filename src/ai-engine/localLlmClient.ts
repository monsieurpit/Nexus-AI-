import {
  computeInvalidPolishWordRatio,
  countInvalidPolishWords,
  autoCorrectPolishText,
  fixKnownPolishPhraseMistakes,
} from './polishSpellCheck';

const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || '').replace(/\/+$/, '');
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
// A Polish-specialized model (SpeakLeash/Bielik-1.5b) was tried here and reverted after real-world
// testing: it had noticeably cleaner Polish GRAMMAR in isolated one-off tests, but embedded in this
// pipeline's actual instruction-following load it was unreliable — it repeatedly echoed/paraphrased
// its own system-prompt instructions instead of answering, drifted into non-Polish gibberish, and a
// Polish native speaker confirmed a live response was genuinely off-topic. Direct comparison showed
// the real fix wasn't model size, it was prompt complexity: qwen2.5:3b given the SAME short,
// Polish-only system prompt (see buildPolishSystemPrompt in reasoningEngine.ts) answered on-topic
// and coherently every time. So Polish now stays on the one default model with a leaner prompt,
// same as English — no separate model routing.

// Shared language-signal classifier — used both to decide which model handles a message
// (looksPolish, called by reasoningEngine.ts before generate()) and, below, to verify the model's
// OUTPUT actually landed in the language the caller expected. Deliberately word-COUNT/density
// based, not "does this text contain any signal at all" — a single embedded foreign word inside an
// otherwise normal sentence must not flip the whole message's classification. Observed live: "Can I
// see your stopki" (one Polish noun in an English question) and "what does X mean" (asking ABOUT a
// Polish word, in English) both need to stay English; only a message where one language's signal
// words genuinely outnumber the other's counts as that language.
const POLISH_SIGNAL_WORDS = new Set([
  'się', 'jest', 'czy', 'jak', 'co', 'gdzie', 'kiedy', 'dlaczego', 'ale', 'nie', 'tak', 'ja', 'ty',
  'on', 'ona', 'my', 'wy', 'oni', 'znaczy', 'oznacza', 'jaki', 'jaka', 'jakie', 'jakich', 'proszę',
  'dziękuję', 'dzięki', 'mogę', 'chcę', 'też', 'kurwa', 'siema', 'mordeczko', 'chuj', 'zajebiście',
  'cześć', 'czesc', 'hej', 'witam', 'słowo', 'słowa', 'znasz', 'jesteś', 'masz',
  // "spokojnie" (calm down) has zero diacritics and no overlap with anything above, so a bare
  // one-word message ("spokojnie") scored 0-0 and looksPolish wrongly returned false — observed
  // live, this sent a Polish "calm down" message down the English fallback path.
  'spokojnie', 'spoko', 'luz', 'wyluzuj',
  // "kocham cie" (no-diacritic spelling of "kocham cię", I love you) has neither a diacritic nor
  // any word already in this list — same 0-0 tie failure mode as "spokojnie" above.
  'kocham', 'kochamy', 'uwielbiam',
]);
// Deliberately excludes short words that are ALSO common, unrelated Polish words — "to" (English
// preposition vs. Polish "this/it"), "on" (vs. Polish "he"), "a" (vs. Polish "and/but"), "i" (vs.
// Polish "and"), "do" (vs. Polish "to/until"), "no" (vs. Polish colloquial "yeah/well") — keeping
// any of those in this list creates a false tie against real Polish signal words in genuinely
// Polish sentences. Observed live: "Jak to dobrze!" (jak=Polish, to=counted as English here before
// the fix, dobrze=neither) tied 1-1 and looksPolish wrongly returned false. Every word below is
// unambiguously English only.
const ENGLISH_SIGNAL_WORDS = new Set([
  'what', 'does', 'did', 'is', 'are', 'was', 'were', 'can', 'could', 'would', 'should', 'will',
  'you', 'your', 'yours', 'me', 'we', 'us', 'our', 'the', 'an', 'this', 'that',
  'these', 'those', 'how', 'why', 'where', 'when', 'who', 'whom', 'mean', 'means', 'meaning',
  'explain', 'tell', 'see', 'show', 'please', 'thanks', 'thank', 'and', 'or', 'but', 'not',
  'yes', 'have', 'has', 'had', 'with', 'for', 'of', 'in', 'at', 'it', 'define',
  'definition', 'called', 'name', 'about',
]);
const POLISH_DIACRITIC_REGEX = /[ąćęłńóśźż]/i;

function scoreLanguageSignal(text: string): { polish: number; english: number; wordCount: number } {
  const words = text.toLowerCase().match(/[a-ząćęłńóśźż]+/gi) || [];
  let polish = 0;
  let english = 0;
  for (const w of words) {
    if (POLISH_SIGNAL_WORDS.has(w) || POLISH_DIACRITIC_REGEX.test(w)) polish++;
    if (ENGLISH_SIGNAL_WORDS.has(w)) english++;
  }
  return { polish, english, wordCount: words.length };
}

/**
 * True only when Polish signal words genuinely OUTNUMBER English ones in the message — not merely
 * present. See scoreLanguageSignal's comment for why a raw "contains any Polish word" check is
 * wrong.
 */
export function looksPolish(text: string): boolean {
  const { polish, english } = scoreLanguageSignal(text);
  return polish > english;
}

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
  // reasoningEngine.ts's looksPolish()) — no longer routes to a different model (see the
  // OLLAMA_MODEL comment above for why), just tells generate() which language to verify the
  // OUTPUT actually landed in (the wrong_language check below).
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
        | 'degenerate_output'
        | 'wrong_language'
        | 'poor_polish_grammar'
        | 'unsafe_content';
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
  // A related but distinct leakage mode: instead of a literal placeholder token, the model
  // narrates or announces the swearing instruction itself as part of the reply — "BUST OUT SOME
  // OF MY BEST SWEAR WORDS AGAIN JUST FOR FUN 'CAUSE THAT'S HOW WE ARE NOW", "as instructed, here
  // are some curse words" — instead of just naturally swearing. Reads as visibly robotic/breaking
  // character (the whole point of an in-character style directive is that it's invisible), the
  // opposite of what the instruction was for. Observed live in a fully English response with no
  // Polish involved, so this isn't the same "small model confused by prompt complexity" issue
  // documented elsewhere for Polish — it's a distinct, language-agnostic leakage mode.
  if (
    /\b(?:bust|break|whip)\s+out\s+(?:some\s+of\s+)?(?:my|those|these)\s+(?:best\s+)?(?:swear|curse)\s*words?\b/i.test(
      text
    ) ||
    /\b(?:swear|curse)\s*words?\s+(?:again\s+)?(?:just\s+)?for\s+fun\b/i.test(text) ||
    /\b(?:as|per)\s+(?:instructed|(?:my|the|your)\s+(?:style\s+)?(?:directive|instruction)s?)\b/i.test(text) ||
    /\bfollowing\s+(?:my|the)\s+(?:style\s+)?(?:directive|instruction)s?\b/i.test(text)
  ) {
    return true;
  }
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

// Reported live: asked (in a properly on-topic, correctly-routed prompt) "lubisz Kraków?" (do you
// like Kraków?), the model answered with an unrelated, unprompted first-person statement that it
// enjoys hurting people ("Lubię krzywdzić ludzi z całego świata co się da"). This is a small local
// model occasionally generating genuinely alarming content as noise when it has nothing real to
// say, same failure class as the other quality gates in this file (degenerate repetition, wrong
// language) — a defense-in-depth net independent of correct routing/prompting, checked regardless
// of language since the model can drift into this in either. Deliberately narrow (first-person,
// present-tense, "I like/enjoy hurting/harming/killing PEOPLE") to avoid flagging legitimate edgy-
// persona banter directed at a specific named target ("I'll destroy Casseurt") — that's the
// intended, harmless roast-comedy register this bot runs on; a generalized, real, unprompted
// enjoyment of harming people is a different and unacceptable thing entirely.
function containsUnsafeSelfStatement(text: string): boolean {
  return (
    /\bi\s+(?:like|love|enjoy)\s+(?:to\s+)?(?:hurt(?:ing)?|harm(?:ing)?|kill(?:ing)?|tortur\w*)\s+(?:people|others|humans|kids|children)\b/i.test(
      text
    ) ||
    /\blubi[ęe]\s+(?:krzywdzi[ćc]|ranić|zabija[ćc]|torturowa[ćc])\s+(?:ludzi|innych|dzieci)\b/i.test(text)
  );
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
        model: OLLAMA_MODEL,
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
    if (containsUnsafeSelfStatement(text)) {
      return { status: 'unavailable', reason: 'unsafe_content', detail: text.slice(0, 100) };
    }
    // Small local models occasionally drift into an entirely different (often incoherent) language
    // mid-generation even on a plain-English prompt with an all-English system message — observed
    // live: an English-only "explain how photosynthesis works" prompt with zero Polish anywhere in
    // it came back as Dutch/Afrikaans-looking gibberish ("planta's", "grondnevel", "Jezus
    // christus"). Since the caller already tells us which language it expects via preferPolish,
    // verify the output's own language-signal density actually clears a low bar for that language
    // before shipping it — this isn't Polish-vs-English specific, a near-zero density of EITHER
    // language's signal words on a long-enough response means it drifted into something else
    // entirely. Only checked on responses with enough words to judge reliably (8+) — a short reply
    // has no real signal either way and would false-positive on legitimate short slangy text.
    const signal = scoreLanguageSignal(text);
    if (signal.wordCount >= 8) {
      const density = (options.preferPolish ? signal.polish : signal.english) / signal.wordCount;
      if (density < 0.06) {
        return { status: 'unavailable', reason: 'wrong_language', detail: text.slice(0, 100) };
      }
    }

    // Reported live: a Polish response ended with "...być迷信者" — raw Chinese characters leaked
    // into otherwise-normal Polish output. Neither the density check above nor
    // computeInvalidPolishWordRatio below ever catches this class of failure: both tokenize on
    // `[a-ząćęłńóśźżA-Z...]` only, so CJK/Cyrillic/Arabic/etc. characters are simply invisible to
    // them — not counted as invalid words, not counted as any language's signal, just silently
    // passed straight through into the shipped response. A real Polish or English reply should
    // never legitimately contain characters from an entirely different script, so any run of 2+ is
    // treated as contamination regardless of how clean the rest of the response reads.
    if (/[一-鿿぀-ヿ가-힯؀-ۿЀ-ӿ]{2,}/.test(text)) {
      return { status: 'unavailable', reason: 'wrong_language', detail: text.slice(0, 100) };
    }

    // The check above only asks "is this Polish at all" (word-density against a small signal-word
    // list) — it doesn't catch a response that's clearly Polish but full of invented/garbled words
    // ("nacieszyło...zaznaczysz...Chocío" — reported live). computeInvalidPolishWordRatio checks
    // against a real, offline Polish dictionary instead, catching that class of failure directly.
    // Only runs when Polish was actually requested — checking English text against a Polish
    // dictionary would flag everything.
    if (options.preferPolish) {
      // Fixes the confident, small-edit cases first (a wrong case ending like "Footballa" ->
      // "Football", reported live) before deciding whether to give up on the response entirely —
      // so an otherwise-good reply with one fixable slip ships corrected instead of getting
      // discarded for a template fallback over something this easy to actually fix.
      text = fixKnownPolishPhraseMistakes(await autoCorrectPolishText(text));
      const invalidRatio = await computeInvalidPolishWordRatio(text);
      // The ratio alone was calibrated to separate overall-clean from overall-broken responses
      // (see the commit that added it), and undershoots on a longer response that's mostly fine
      // but has a handful of standout invented words — reported live, a ~35-word response with
      // 3-4 genuinely nonsense words ("trączonicy", "szaleniecński") only hit ~11%. An absolute
      // floor catches that regardless of how long the rest of the response is.
      const invalidCount = await countInvalidPolishWords(text);
      if (invalidRatio > 0.25 || invalidCount >= 3) {
        return { status: 'unavailable', reason: 'poor_polish_grammar', detail: text.slice(0, 100) };
      }
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
