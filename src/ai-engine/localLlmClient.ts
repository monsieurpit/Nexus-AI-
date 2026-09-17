import {
  computeInvalidPolishWordRatio,
  countInvalidPolishWords,
  autoCorrectPolishText,
  fixKnownPolishPhraseMistakes,
} from './polishSpellCheck';

const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || '').replace(/\/+$/, '');
// Default swapped qwen2.5:3b -> gemma3:4b (Google's open model, same family as
// Gemini, markedly better multilingual / French, 128k context which also helps
// RAG). ~4s per short reply and comfortable memory on the M4 Mac Mini host.
// The historical rationale below (Bielik, model-size vs prompt-complexity) still
// holds — it's about routing philosophy, not the specific model name.
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma3:4b';
// If OLLAMA_MODEL isn't actually pulled on the Ollama host (e.g. the custom `nexus-4b`
// Modelfile got wiped by a Mac reboot / `ollama` cleanup), fall back to this instead of
// failing every request. Set OLLAMA_MODEL_FALLBACK=gemma3:4b on Railway.
const OLLAMA_MODEL_FALLBACK = process.env.OLLAMA_MODEL_FALLBACK || 'gemma3:4b';
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
// Explicit context window, sent on every generate()/generateStream() call. Found live (2026-09-15):
// a real production request came back http_error with no visible cause locally, traced to Ollama's
// own server log showing `n_ctx_slot = 2048` — with OLLAMA_NUM_PARALLEL=2 set on the host (see
// ~/.nexus-tunnel/com.nexus.ollamaserve.plist) and no num_ctx ever sent by this client, Ollama was
// silently splitting its own default context window across the 2 parallel slots instead of giving
// each request the model's actual supported window (131072 for nexus2:4b). The crashout persona's
// system prompt alone is now ~9300 chars (~2300+ tokens) after the few-shot voice examples added
// this session, before history/grounding/the user's own prompt even get counted — comfortably over
// 2048, so some requests started overflowing context outright. Set well above any realistic need
// (system prompt + history + grounding + THINKING_TOKEN_HEADROOM-inflated output) rather than tuned
// tight, matching Patrick's explicit "I don't care about prompt size" stance from this same session.
const OLLAMA_NUM_CTX = Number(process.env.OLLAMA_NUM_CTX) || 8192;

// Cache the set of pulled model names for a minute so resolveModel() doesn't hit /api/tags
// on every generate call.
let _tagCache: { names: Set<string>; at: number } | null = null;
let _fallbackWarned = false;
async function pulledModelNames(timeoutMs = 2500): Promise<Set<string>> {
  if (_tagCache && Date.now() - _tagCache.at < 60_000) return _tagCache.names;
  if (!OLLAMA_BASE_URL) return new Set();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { signal: controller.signal });
    const data: any = res.ok ? await res.json().catch(() => null) : null;
    // Ollama's /api/tags reports "nexus-4b:latest" but the model is equally addressable as
    // "nexus-4b" — register both forms so resolveModel()'s names.has() check doesn't wrongly
    // decide a pulled model is missing and fall back.
    const names = new Set<string>();
    if (Array.isArray(data?.models)) {
      for (const m of data.models) {
        const n = m?.name;
        if (!n) continue;
        names.add(n);
        if (n.endsWith(':latest')) names.add(n.slice(0, -':latest'.length));
        else if (!n.includes(':')) names.add(`${n}:latest`);
      }
    }
    _tagCache = { names, at: Date.now() };
    return names;
  } catch {
    return _tagCache?.names ?? new Set();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Given the model a caller wants, return it if it's actually pulled on the host, otherwise
 * OLLAMA_MODEL_FALLBACK (if THAT's pulled), otherwise the original request unchanged (let the
 * generate call fail loudly rather than silently swapping to something that also isn't there).
 * A tags-fetch failure returns the requested model untouched — don't downgrade on a transient
 * network blip.
 */
async function resolveModel(requested: string): Promise<string> {
  const names = await pulledModelNames();
  if (names.size === 0) return requested; // couldn't check — don't second-guess

  // The old deep-cot degradation chain (OLLAMA_MODEL_DEEP -> gemma3:12b -> ...) is gone along with
  // the 12B model itself — every caller now requests either the base model or OLLAMA_MODEL_FALLBACK
  // directly, so a plain two-step chain is all that's needed.
  const chain = [requested, OLLAMA_MODEL_FALLBACK];

  const seen = new Set<string>();
  for (const candidate of chain) {
    if (!candidate || seen.has(candidate)) continue;
    seen.add(candidate);
    if (names.has(candidate)) {
      if (candidate !== requested && !_fallbackWarned) {
        console.warn(`[localLlm] "${requested}" not pulled on Ollama host — using "${candidate}" instead`);
        _fallbackWarned = true;
      }
      return candidate;
    }
  }
  return requested; // nothing in the chain is pulled — let generate() fail loudly
}
// A Polish-specialized model (SpeakLeash/Bielik-1.5b) was tried here and reverted after real-world
// testing: it had noticeably cleaner Polish GRAMMAR in isolated one-off tests, but embedded in this
// pipeline's actual instruction-following load it was unreliable — it repeatedly echoed/paraphrased
// its own system-prompt instructions instead of answering, drifted into non-Polish gibberish, and a
// Polish native speaker confirmed a live response was genuinely off-topic. Direct comparison showed
// the real fix wasn't model size, it was prompt complexity: qwen2.5:3b given the SAME short,
// Polish-only system prompt (see buildPolishSystemPrompt in reasoningEngine.ts) answered on-topic
// and coherently every time. So Polish now stays on the one default model with a leaner prompt,
// same as English — no separate model routing.
//
// A DIFFERENT kind of model routing was tried later and is not the Bielik mistake repeating: a
// same-family, larger model (qwen2.5:7b, then gemma3:12b) used as an opt-in "deep-cot"/Nexus-Code
// escalation, not a blanket swap or a per-language split — roughly 3-4x the latency and ~8GB
// resident, tight on a 16GB host once the Node server + tunnel are also running. That escalation
// tier is GONE now: every generation call (chat and "Nexus Code" alike) uses chatModel() below —
// the 12B model was removed entirely (freeing its memory permanently) once Nexus Code got its own
// self-review loop (generateCodeEditWithReview, reasoningEngine.ts) instead of leaning on a bigger
// model for quality. deep-cot chat replies lean on buildRevealThinkingInstruction/
// buildReasoningModeInstruction's own deeper reasoning text to make up the quality gap instead.
export function chatModel(): string {
  return OLLAMA_MODEL;
}

// How long Ollama keeps a model resident after a response. The host is a 16GB M4 Mac Mini also
// running the Node server, the Discord bot process and a Cloudflare tunnel. The old ~8GB
// escalation model got its own short keep-alive here specifically because it was rare/opt-in and
// large; now that it's gone (chatModel() is the only tier left besides vision), that distinction
// no longer applies — the base model stays warm for realistic chat gaps regardless of which
// feature (chat or Nexus Code) requested it. The vision model is still rare enough to unload fast
// rather than sit warm for a feature most replies never touch.
function keepAliveFor(model: string | undefined): string {
  if (model && model === OLLAMA_VISION_MODEL) return '90s';
  return '10m';
}

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
  // "on" (he) and "my" (we) were both here as Polish pronouns, but they're also two of the most
  // common English words — a real, previously-undiscovered bug, found live testing an entirely
  // English sentence ("does my passport need to be valid past my trip") that got answered back in
  // Polish. "my" alone scored a false Polish point since it's not in ENGLISH_SIGNAL_WORDS below,
  // and with no other signal words present, that one false point was enough to win. The comment
  // on ENGLISH_SIGNAL_WORDS below already documents this exact class of collision and deliberately
  // excludes "on"/"to"/"a"/"i"/"do"/"no" for the identical reason — this list just never got the
  // same treatment applied to it. "ona"/"wy"/"oni" (she/you-plural/they) aren't real English words
  // and stay.
  'ona', 'wy', 'oni', 'znaczy', 'oznacza', 'jaki', 'jaka', 'jakie', 'jakich', 'proszę',
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
  // The wrong_language density check below runs on every response regardless of persona, but
  // crashout-bot's own system prompt MANDATES at least 4 real swear words every single response
  // ("no exceptions") — a short, genuinely-English, in-character reply can easily be dense enough
  // with "fuck"/"shit"/"damn"/casual filler to crowd out the polite function words above entirely,
  // even though every one of those words is unambiguously English (none double as a real Polish or
  // Spanish word the way "on"/"my"/"to" do elsewhere in this file, so there's no risk of these
  // making the INPUT-language router below — looksPolish() shares this same word set — wrongly
  // read a genuinely Polish message as English). Observed live: a real, coherent, in-character
  // "Hello, how are you?" reply got discarded by this exact check and replaced with canned fallback
  // text, purely because its authentic slang-heavy voice didn't happen to contain enough of the
  // original word list.
  // 'yo' deliberately excluded (removed after a live bug: "Yo mec" — a French/joual greeting
  // meaning "yo dude" — scored french=0 (before 'mec' was added to FRENCH_SIGNAL_WORDS) vs.
  // english=1 purely off 'yo' and got answered in English). 'yo' is common French/joual slang too
  // (Patrick uses it himself), not a distinctive English marker the way 'gonna'/'lmao' are, so it
  // was never pulling real weight here — it only ever existed to tip ties, which is exactly the
  // failure mode that broke this case.
  'fuck', 'fucking', 'fucked', 'shit', 'damn', 'goddamn', 'hell', 'ass', 'bitch', 'bro', 'man',
  'yeah', 'nah', 'gonna', 'wanna', 'gotta', 'lol', 'lmao', 'homie', 'dude',
  // Contractions — added alongside the tokenizer fix below (2026-09-17) that stops stripping
  // apostrophes. Before that fix, "don't"/"it's"/"what's" etc. silently split into fragments
  // ("don"+"t", "it"+"s") that matched NOTHING in either language's word list, quietly losing
  // real English signal on every single contraction in a message — one of the reasons short,
  // contraction-heavy English messages could tie or lose against French. Each of these is an
  // unambiguous English-only contraction with no French-word collision.
  'what\'s', 'it\'s', 'that\'s', 'who\'s', 'here\'s', 'there\'s', 'let\'s',
  'don\'t', 'doesn\'t', 'didn\'t', 'isn\'t', 'aren\'t', 'wasn\'t', 'weren\'t',
  'can\'t', 'couldn\'t', 'wouldn\'t', 'shouldn\'t', 'won\'t',
  'i\'m', 'i\'ve', 'i\'ll', 'i\'d', 'you\'re', 'you\'ve', 'you\'ll',
  'we\'re', 'we\'ve', 'we\'ll', 'they\'re', 'they\'ve', 'they\'ll', 'he\'s', 'she\'s',
]);
const POLISH_DIACRITIC_REGEX = /[ąćęłńóśźż]/i;

// Same word-scoring approach as Polish above, for French — added after live-testing found French
// genuinely broken through the generic English path: "salut nexus, comment ça va?" (a simple
// greeting) matched a corpus document about French internet slang and got answered in ENGLISH
// with a glossary entry instead of an actual greeting back, and "c'est quoi un trou noir" (what's
// a black hole) fell straight through to the generic conversational fallback template. Same
// exclusion discipline as Polish's own list: "on" (French "we/one", but also a common English
// word), "car" (French "because", also an English noun), "a"/"an"/"est" and similar short forms
// that could tie against real signal words are deliberately left out.
// "comment" and "grave" removed here for the same reason — a code review caught they're both
// ordinary, common English words ("no comment", "leave a comment", "a grave mistake", "dig a
// grave") with zero corresponding entry in ENGLISH_SIGNAL_WORDS to offset them, so a purely
// English sentence containing either one alone got misdetected as French. Verified live before
// this fix: looksFrench("no comment") and looksFrench("dig a grave") both incorrectly returned
// true.
const FRENCH_SIGNAL_WORDS = new Set([
  'salut', 'bonjour', 'bonsoir', 'merci', 'oui', 'non', 'pourquoi', 'combien',
  'quoi', 'quel', 'quelle', 'quels', 'quelles', 'ça', 'cest', "c'est", 'je', 'tu', 'nous', 'vous',
  'ils', 'elles', 'avec', 'sans', 'être', 'avoir', 'créé', 'créer', 'peux', 'veux', 'sais',
  'connais', 'aide', 'expliquer', 'explique', 'dis', 'montre', "s'il", 'plait', 'plaît',
  'kestufou', 'wesh', 'ouf', 'chuis', 'jsuis', 'jsp', 'ptdr', 'mdr',
  // Québécois / joual markers — Patrick texts the bot mostly in joual and these carry no
  // English or Polish collision (none of them is a word in either signal list), so adding
  // them only ever strengthens a correct French detection, never causes an English->French
  // misfire.
  'toi', 'moi', 'pis', 'ici', 'aime', 'aimes', 'fais', 'fait', 'vais', 'très', 'trop', 'bien',
  'faire', 'alors', 'donc', 'aussi', 'encore', 'jamais', 'toujours', 'rien', 'quelque',
  'faque', 'tsé', 'tse', 'pantoute', 'icitte', 'astheure', 'asteure',
  'chu', 'moé', 'toé', 'ouais', 'ouin', 'checke', 'mettons', 'tiguidou', 'mec',
  // Joual drops accents when typed — the accented forms above ('créé', 'ça') miss the way
  // Patrick actually types ("qui ta cree", "comment ca va"). None of these collide with English.
  'qui', 'ca', 'cree', 'creer', 'creee', 'va', 'cava', 'taime', 'gai', 'sais-tu',
  'raison', 'affaire', 'pogne', 'niaise', 'capote',
  'tabarnak', 'câlisse', 'calisse', 'ostie', 'crisse', 'criss', 'tabarnouche',
  'voyons', 'coudonc', 'enweille', 'correc', 'niaiseux',
  'quétaine', 'ketaine', 'dépanneur', 'magané', 'jaser', 'achaler', 'niaiser',
  // Teen/SMS-speak (Patrick asked specifically for "oe"/"chuis"/"j'suis" plus "everything else
  // teens use" — researched live rather than guessed, September 2026). "suis" covers "j'suis" —
  // the apostrophe splits it into "j" (too short/ambiguous to ever add alone) and "suis" as two
  // separate tokens once punctuation is stripped, so "suis" is what actually needs to be here.
  // Each of these is checked against ENGLISH_SIGNAL_WORDS for collisions the same way as every
  // other entry in this list — none of them is an English word, so none of them can ever cause a
  // genuinely English message to misfire as French; a couple of the riskier two-letter texting
  // abbreviations ("tg", "bg", "cc") were deliberately left out since they're common enough as
  // real English shorthand ("thank god", "carbon copy") to risk exactly that.
  'oe', 'suis', 'oklm', 'osef', 'wsh', 'pcq', 'slt', 'tlm', 'tmtc', 'trkl',
  'pécho', 'pecho', 'relou', 'reuf', 'seum', 'enjailler', 'tkt', 'jpp', 'askip', 'pnj',
  'bref', 'chelou', 'khey', 'frero', 'frerot', 'dsl', 'bjr', 'bsr', 'bcp', 'auj', 'stp',
  'dispo', 'meuf', 'daron', 'daronne',
  // Common function words added in a full French-support review (2026-09-17) — the original list
  // leaned heavily on greetings/slang/joual markers and was missing a lot of ordinary, high-
  // frequency French grammar words, meaning a plain, non-slangy French sentence with no accents
  // and no joual could score 0 or tie against English on short messages. Each entry checked
  // against ENGLISH_SIGNAL_WORDS for collisions the same way as every other addition to this list
  // — deliberately excludes real English words that happen to look French: "pour" (to pour),
  // "par" (golf par), "ton"/"son" (a ton, my son), "ma" (informal "mom"), "tout" (a ticket tout),
  // "pendant" (jewelry pendant), "comment"/"car"/"grave" (already excluded above), "si" (too
  // ambiguous with the SI unit system / informal "si" in English text).
  'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'dans', 'sur', 'comme', 'donc',
  'leur', 'leurs', 'notre', 'nos', 'votre', 'vos', 'ses', 'sa', 'ces', 'cette', 'cet',
  'ceux', 'celle', 'celui', 'quand', 'mais', 'ne', 'pas', 'peu', 'beaucoup', 'tous', 'toute',
  'toutes', 'voila', 'voici', 'parce', 'puisque', 'depuis', 'vers', 'chez', 'entre', 'contre',
  'sous', 'dessus', 'dessous', 'tes',
  // Contraction forms — the tokenizer fix right below this list stops splitting "c'est" into
  // fragments ("c" + "est", neither of which was ever in either word list), so these entries
  // (some of which — "c'est", "s'il" — existed in this list already but could literally never
  // match before that fix, since the text they're meant to match never reached the Set lookup
  // as a whole token) can now actually fire.
  "n'est", "qu'est", "j'ai", "j'aime", "d'accord", "n'importe", "jusqu'à", "aujourd'hui",
  "qu'il", "qu'elle", "qu'on", "m'a", "n'a", "l'ai", "y'a", "t'es", "t'as", "c'était", "n'ai",
]);
const FRENCH_DIACRITIC_REGEX = /[àâçéèêëîïôùûüÿœæ]/i;

export function scoreFrenchSignal(text: string): { french: number; english: number; wordCount: number } {
  // Includes internal apostrophes as part of a word ("c'est", "don't") instead of stripping them
  // — found live (2026-09-17) that the old letters-only regex split every contraction into
  // fragments on both sides ("c'est" -> "c" + "est", "don't" -> "don" + "t"), none of which
  // matched anything in either signal-word list. That silently threw away real signal on some of
  // the most common words in both languages and meant several FRENCH_SIGNAL_WORDS entries written
  // WITH an apostrophe ("c'est", "s'il") could never actually match real input. The trailing
  // `(?:'[letters]+)*` group only attaches an apostrophe when it's directly followed by more
  // letters, so a stray typographic quote around a word ('salut') still isn't swallowed into the
  // token.
  const words = text.toLowerCase().match(/[a-zàâçéèêëîïôùûüÿœæ]+(?:'[a-zàâçéèêëîïôùûüÿœæ]+)*/gi) || [];
  let french = 0;
  let english = 0;
  for (const w of words) {
    if (FRENCH_SIGNAL_WORDS.has(w) || FRENCH_DIACRITIC_REGEX.test(w)) french++;
    if (ENGLISH_SIGNAL_WORDS.has(w)) english++;
  }
  return { french, english, wordCount: words.length };
}

export function looksFrench(text: string): boolean {
  const { french, english } = scoreFrenchSignal(text);
  return french > english;
}

export function scoreLanguageSignal(text: string): { polish: number; english: number; wordCount: number } {
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
export function looksPolish(_text: string): boolean {
  // POLISH SUBSYSTEM DISABLED (Sept 2026) — Patrick asked to strip Polish entirely
  // ("on va le refaire plus tard"). It was bleeding Polish swears/fallbacks into the
  // French path. Rather than surgically unpick Polish from ~15 files, we hard-disable
  // the single detection chokepoint everything routes off. Polish input now gets an
  // English (or French, if French-marked) reply. Restore by deleting these two lines
  // when rebuilding Polish support.
  return false;
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
// Was raised from 1 to 2 once, verified live against qwen2.5:3b (a much lighter model than what
// actually runs here now). Reverted back to 1 per Patrick's explicit request (2026-09-17): only
// one message processed at a time, everything else waits its turn, so his Mac never has to serve
// two real generations at once. Justified independent of that request too — since the qwen2.5:3b
// test, this host moved to a heavier model (gemma4/nexus2:4b, 8B vs 3B), a much larger context
// window (OLLAMA_NUM_CTX=8192, up from an effectively-truncated ~2048), and multi-pass self-review
// (generateCodeEditWithReview, llmGroundedOrFallback's retry loop) that can itself fire 2-3 Ollama
// calls for a single user request — the real per-slot KV-cache/RAM cost today is substantially
// higher than what the original 16GB headroom measurement was based on.
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
  topK?: number;
  stopSequences?: string[];
  // Set by callers that have already detected the user's message is Polish (see
  // reasoningEngine.ts's looksPolish()) — no longer routes to a different model (see the
  // OLLAMA_MODEL comment above for why), just tells generate() which language to verify the
  // OUTPUT actually landed in (the wrong_language check below).
  preferPolish?: boolean;
  // Same idea as preferPolish, added alongside it for French support — a separate boolean rather
  // than widening preferPolish into an enum, so every existing call site (which only ever checks
  // `options.preferPolish`) keeps working unchanged; French-aware call sites set this one instead.
  preferFrench?: boolean;
  // Overrides OLLAMA_MODEL for this one call. Left undefined by default so every existing call
  // site keeps using chatModel()'s default model unchanged.
  model?: string;
  // Gemma 4 (unlike Gemma 3) has a genuinely separate native "thinking" channel — Ollama's
  // response carries it as message.thinking, distinct from message.content — and thinking is ON
  // BY DEFAULT for models that support it. Observed live: with a tight maxTokens budget (as small
  // as 20, for a chat title), the model can spend its ENTIRE budget on the thinking channel and
  // never produce any content at all, which processRawGenerateOutput then correctly reports as
  // empty_response — not a bug in that check, a real empty reply caused by an unbudgeted-for
  // channel silently eating the token budget. Every call site must now set this explicitly:
  // `false` for anything content-budget-sensitive (which is most calls — titles, casual replies,
  // roleplay), `true` only where the caller actually wants the thinking text (reasoningEngine.ts's
  // llmGroundedOrFallback when revealThinking is on, and generateCodeEditWithReview's main
  // generation passes) and reads it back via the result's own `thinking` field below.
  think?: boolean;
  // The English/Polish/French word-density check below exists to catch a small model drifting
  // into an unrelated language mid-response — but it fires on legitimate CODE output too, since
  // code (variable names, syntax, punctuation) naturally has very low "English signal word"
  // density. Verified live: a correct TypeScript one-liner
  // (`const add = (a: number, b: number): number => a + b;`) was rejected as "wrong_language"
  // purely because it didn't read like English prose. Set by the code-architect direct-generation
  // path (server.ts) only; every existing caller leaves this false/undefined and keeps the
  // language check exactly as before.
  skipLanguageCheck?: boolean;
}

export type LocalLlmResult =
  | { status: 'success'; text: string; latencyMs: number; thinking?: string }
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
  // "instruction(s)"/"directive(s)" alone are ordinary words a real answer legitimately uses
  // ("as the instructions say, preheat the oven", "follow the instructions on the package") — a
  // code review of this exact change caught that the original version of this check matched both
  // of those verbatim, which would have discarded real, correct answers as false "leakage".
  // Narrowed to require "style directive(s)" specifically (the actual, distinctive phrase this
  // persona's own system prompt uses to refer to itself), which no normal answer has any reason
  // to say.
  if (
    /\b(?:bust|break|whip)\s+out\s+(?:some\s+of\s+)?(?:my|those|these)\s+(?:best\s+)?(?:swear|curse)\s*words?\b/i.test(
      text
    ) ||
    /\b(?:swear|curse)\s*words?\s+(?:again\s+)?(?:just\s+)?for\s+fun\b/i.test(text) ||
    /\b(?:as|per|following)\s+(?:instructed|(?:my|the|your)\s+style\s+directives?)\b/i.test(text) ||
    // Another instance of the same leakage class, caught live: a response literally ended with
    // "Capitalize as needed bro." — the model echoing a formatting instruction fragment (the
    // system prompt's own CAPS-LOCK-ON/OFF directive) as visible text instead of just silently
    // following it.
    /\bcapitalize\s+(?:as\s+needed|this|it|accordingly)\b/i.test(text)
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
    /\blubi[ęe]\s+(?:krzywdzi[ćc]|ranić|zabija[ćc]|torturowa[ćc])\s+(?:ludzi|innych|dzieci)\b/i.test(text) ||
    // Spanish — a code review caught this check was documented as "checked regardless of
    // language since the model can drift into this in either" but only ever had English and
    // Polish branches, despite Spanish being a real, fully-supported output language elsewhere in
    // this file (scoreLanguageSignal has no Spanish branch either, but that's a narrower, separate
    // concern than this specific safety net).
    /\bme\s+(?:gusta|encanta)\s+(?:lastimar|dañar|matar|torturar)\s+a\s+(?:la\s+gente|otros|los\s+niños)\b/i.test(
      text
    )
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
    // Healthy if the configured model OR the fallback is pulled — resolveModel() will use
    // whichever is actually there at generate time.
    return models.includes(OLLAMA_MODEL) || models.includes(OLLAMA_MODEL_FALLBACK);
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
  // Bumped 30000 -> 60000 -> 120000. See OLLAMA_NUM_CTX's comment above: a properly-sized context
  // window means even an uncontended casual reply now regularly takes ~28-30s (more prefill work
  // than the old, silently-truncated 2048-token context). Bumped again alongside crashout-bot's
  // default switching to 'deep-cot' reasoning (memoryStore.ts) — a genuinely deeper multi-angle
  // thinking pass on every reply takes real extra time on this hardware, and Patrick's explicit
  // stance this session is that latency doesn't matter at all, only quality — so this errs very
  // generous rather than risk killing a slow-but-good answer with a false timeout. Callers with
  // their own real time budget (e.g. the Nexus Code self-review loop) already pass an explicit
  // timeoutMs and are unaffected by this default.
  const timeoutMs = options.timeoutMs ?? 120000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const messages = [
      ...(options.system ? [{ role: 'system', content: options.system }] : []),
      { role: 'user', content: prompt },
    ];
    const model = await resolveModel(options.model || OLLAMA_MODEL);

    const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        // See the `think` field's own comment on OllamaGenerateOptions — explicit every time,
        // never left to Ollama's own default (which is enabled for models that support it).
        think: options.think ?? false,
        // See keepAliveFor(): the small default model stays warm ~10m for realistic chat gaps;
        // the large escalation / vision models unload within ~90s so an 8GB model doesn't pin
        // memory on a 16GB host long after the reply finished (the source of the "Mac lags for
        // ages after a response" report).
        keep_alive: keepAliveFor(model),
        // Sampling tuned for gemma3 (Google's published recommendation is
        // temperature 1.0 / top_k 64 / top_p 0.95 / repeat_penalty ~1.0).
        // repeat_penalty was 1.3 here for qwen2.5:3b, which had a real repetition
        // tendency — gemma3 handles repetition natively and 1.3 pushed it away
        // from ordinary word reuse into stilted phrasing and rarer/worse tokens.
        // Callers still override temperature per task; top_k/top_p now carry
        // gemma3 defaults instead of Ollama's generic ones.
        options: {
          temperature: options.temperature ?? 0.7,
          num_predict: options.maxTokens ?? 400,
          top_p: options.topP ?? 0.95,
          top_k: options.topK ?? 64,
          stop: options.stopSequences,
          repeat_penalty: 1.1,
          repeat_last_n: 64,
          // Never left unset — see OLLAMA_NUM_CTX's own comment below for why an unset num_ctx
          // silently truncated/errored real production requests once the system prompt grew past
          // the server's own default per-slot context window.
          num_ctx: OLLAMA_NUM_CTX,
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { status: 'unavailable', reason: 'http_error', detail: detail.slice(0, 300) };
    }

    const data: any = await res.json();
    logLatencyDebug(data, options, prompt);
    return processRawGenerateOutput(data, options, startedAt);
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

// Opt-in diagnostic (off by default, zero cost when unset) — added while chasing a real user
// complaint about 12-30s replies. Found live: prefill (reading the prompt) scales with token
// count on this hardware, and the system/instruction prompt stack had grown to 4000+ tokens
// for a grounded factual answer, directly costing many real seconds regardless of how short
// the actual reply was. Set LATENCY_DEBUG=true to see the prefill/decode split per call.
function logLatencyDebug(data: any, options: OllamaGenerateOptions, prompt: string): void {
  if (process.env.LATENCY_DEBUG === 'true') {
    console.log(
      `[latencydebug] system_chars=${options.system?.length || 0} user_chars=${prompt.length} prompt_eval_count=${data.prompt_eval_count} prompt_eval_ms=${((data.prompt_eval_duration || 0) / 1e6).toFixed(0)} eval_count=${data.eval_count} eval_ms=${((data.eval_duration || 0) / 1e6).toFixed(0)} load_ms=${((data.load_duration || 0) / 1e6).toFixed(0)} total_ms=${((data.total_duration || 0) / 1e6).toFixed(0)}`
    );
  }
}

// Every quality gate generate() runs on a completed Ollama response — degenerate-repetition,
// unsafe-self-statement, wrong-language drift, Polish grammar validation — extracted out of
// generate() itself so generateStream() below can run the EXACT same checks on its own
// fully-assembled text instead of duplicating ~130 lines of gate logic. Streaming only changes
// HOW the text arrives (progressively, via onToken, for live UI feedback) — it never changes
// whether the final text is trustworthy enough to ship, which is still decided here, once, on the
// complete response, exactly as before streaming existed.
async function processRawGenerateOutput(
  data: any,
  options: OllamaGenerateOptions,
  startedAt: number
): Promise<LocalLlmResult> {
  {
    let text = typeof data?.message?.content === 'string' ? data.message.content.trim() : '';
    if (!text) {
      return { status: 'unavailable', reason: 'empty_response' };
    }
    // The Bielik GGUF (used for preferPolish) was observed leaking raw chat-template/stop tokens
    // into real output — "<|end_id: assistant>" and "<|EOF|>" showed up verbatim in otherwise
    // normal responses during benchmarking, presumably a template mismatch between the GGUF and
    // Ollama's chat handling. Strips any "<|...|>"-style token plus gemma3's
    // "<start_of_turn>" / "<end_of_turn>" markers — Ollama's /api/chat normally
    // strips these, this is a defensive no-op if it does.
    text = text
      .replace(/<\|[^|<>]{1,40}\|>/g, '')
      .replace(/<\/?(?:start|end)_of_turn>/gi, '')
      .trim();
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
    // A code review caught that the French branch used to divide scoreFrenchSignal's french count
    // by `signal.wordCount` — but `signal` comes from scoreLanguageSignal, whose tokenizer regex
    // (`[a-ząćęłńóśźż]+`) doesn't include French's own accented characters (è/ê/â/î/ô/û/ü/ç). Any
    // word containing one of those (très, être, être, français...) gets split into fragments by
    // that regex, inflating the word count scoreFrenchSignal itself never produced, which
    // understates true French density and risks rejecting a genuinely correct French response as
    // "wrong_language". Now uses scoreFrenchSignal's own word count consistently for both sides of
    // the French density calculation instead of mixing two disagreeing tokenizers.
    const signal = scoreLanguageSignal(text);
    const frenchSignal = options.preferFrench ? scoreFrenchSignal(text) : null;
    const languageCheckWordCount = frenchSignal ? frenchSignal.wordCount : signal.wordCount;
    if (!options.skipLanguageCheck && languageCheckWordCount >= 8) {
      const density = options.preferPolish
        ? signal.polish / signal.wordCount
        : frenchSignal
        ? frenchSignal.french / frenchSignal.wordCount
        : signal.english / signal.wordCount;
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
    // never legitimately contain characters from an entirely different script, so contamination is
    // rejected regardless of how clean the rest of the response reads. Originally required a run
    // of 2+, which missed a single stray character — observed live, a response otherwise entirely
    // in English shipped with one lone "蚪" sitting between two emoji. There's no legitimate
    // single-character case either (no real English/Polish/Spanish word is one CJK/Cyrillic/
    // Arabic glyph), so even one is enough to reject.
    if (/[一-鿿぀-ヿ가-힯؀-ۿЀ-ӿ]/.test(text)) {
      return { status: 'unavailable', reason: 'wrong_language', detail: text.slice(0, 100) };
    }

    // Same gap as the CJK/Cyrillic/Arabic check above, but for OTHER Latin-script European
    // languages, which that check can't catch (Polish, Romanian, French, etc. all use the same
    // Latin alphabet with added diacritics — not a separate Unicode block). Observed live,
    // resampling the same English query 4 times: 2 clean English responses, 1 that drifted into
    // fragmented Polish mid-response, 1 that drifted into fragmented Romanian mid-response — an
    // English question, an English system prompt, yet the model randomly wandered into an
    // unrelated third language for part of its answer. The density check above alone doesn't
    // catch this: a response can have PLENTY of real English content (clearing the 0.06 density
    // bar easily) while still containing several sentences of genuine foreign-language text mixed
    // in. Only checked when English was actually requested (Polish responses legitimately use
    // these diacritics constantly) and on long-enough responses, same reasoning as the density
    // check's own 8-word floor. A real English reply might legitimately contain one or two
    // accented loanwords/names ("café", "Beyoncé") — the threshold here (5+ diacritic characters)
    // is well above what any single legitimate loanword would ever contribute, while a genuine
    // foreign-language sentence mixed in reliably produces far more than that.
    // Same skip as Polish, extended to French: this guard exists to catch an ENGLISH response
    // drifting into an unrelated accented language, so it makes no sense applied to a genuinely
    // French response, which legitimately uses these characters constantly (a real French reply
    // easily clears the 3-smoking-gun/8-common-accent thresholds below on totally normal text).
    if (!options.preferPolish && !options.preferFrench && signal.wordCount >= 8) {
      // Split into two tiers rather than one flat count. "Smoking gun" characters (ą ć ę ł ń ś ź
      // ż from Polish, ă â î ș ț from Romanian) never appear in any common English loanword —
      // there's no legitimate reason even ONE of these shows up in a real English reply, so a
      // low bar catches genuine drift fast. The broader set (é á ñ ü etc.) DOES show up
      // legitimately in common loanwords/names used in English ("café", "Beyoncé", "jalapeño"),
      // so that tier needs a higher bar — one or two such accents is normal, a whole sentence's
      // worth is not. Calibrated against a live-observed near-miss: a genuinely garbled response
      // ("niektórzy", "róże", "się" — 4 smoking-gun characters in a shortish excerpt) fell just
      // under a flat 5-character threshold tested first; splitting the tiers catches it at 3
      // without risking a false positive on ordinary loanword use.
      const smokingGunCount = (text.match(/[ąćęłńóśźżăîșț]/gi) || []).length;
      const commonAccentCount = (text.match(/[áéíúñàèìòùâêôûäöüßç]/gi) || []).length;
      if (smokingGunCount >= 3 || commonAccentCount >= 8) {
        return { status: 'unavailable', reason: 'wrong_language', detail: text.slice(0, 100) };
      }
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

    const thinking = typeof data?.message?.thinking === 'string' ? data.message.thinking.trim() : '';
    return {
      status: 'success',
      text,
      latencyMs: Date.now() - startedAt,
      ...(thinking ? { thinking } : {}),
    };
  }
}

// Streaming variant of generate(), used only by the casual/situational conversational path
// (llmSituationalReplyOrFallback) — the grounded/factual path stays on the non-streaming generate()
// above, since it needs verifyAnswer() + a possible full reflect-and-retry pass on the COMPLETE
// text before it's trustworthy to show, and streaming a raw answer that then gets silently
// replaced by a corrected retry is worse UX than the current wait, not better. Calls Ollama's
// /api/chat with stream: true (newline-delimited JSON chunks, each with a partial
// message.content), invoking onToken with each new fragment as it arrives for live UI feedback,
// while still running the EXACT same quality gates (processRawGenerateOutput, shared with
// generate() above) on the fully-assembled text before resolving — a caller must still treat a
// non-'success' result as untrustworthy even though partial text was already streamed to the
// user; see the /api/v1/nexus/stream endpoint in server.ts for how that's handled.
export async function generateStream(
  prompt: string,
  onToken: (chunk: string) => void,
  options: OllamaGenerateOptions = {}
): Promise<LocalLlmResult> {
  if (!OLLAMA_BASE_URL) {
    return { status: 'unavailable', reason: 'not_configured' };
  }

  const release = await acquireOllamaSlot();
  const controller = new AbortController();
  // See generate()'s matching comment above — same reasoning, same new default.
  const timeoutMs = options.timeoutMs ?? 120000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const messages = [
      ...(options.system ? [{ role: 'system', content: options.system }] : []),
      { role: 'user', content: prompt },
    ];
    const model = await resolveModel(options.model || OLLAMA_MODEL);

    const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        // See the `think` field's own comment on OllamaGenerateOptions. Streamed thinking deltas
        // are accumulated separately from content deltas in the reader loop below (never passed to
        // onToken, which must only ever see real reply content) and reattached to finalData before
        // processRawGenerateOutput runs, so the caller still gets the raw thinking text back on
        // `.thinking` exactly like the non-streaming generate() does.
        think: options.think ?? false,
        keep_alive: keepAliveFor(model),
        // Sampling tuned for gemma3 (Google's published recommendation is
        // temperature 1.0 / top_k 64 / top_p 0.95 / repeat_penalty ~1.0).
        // repeat_penalty was 1.3 here for qwen2.5:3b, which had a real repetition
        // tendency — gemma3 handles repetition natively and 1.3 pushed it away
        // from ordinary word reuse into stilted phrasing and rarer/worse tokens.
        // Callers still override temperature per task; top_k/top_p now carry
        // gemma3 defaults instead of Ollama's generic ones.
        options: {
          temperature: options.temperature ?? 0.7,
          num_predict: options.maxTokens ?? 400,
          top_p: options.topP ?? 0.95,
          top_k: options.topK ?? 64,
          stop: options.stopSequences,
          repeat_penalty: 1.1,
          repeat_last_n: 64,
          num_ctx: OLLAMA_NUM_CTX,
        },
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => '');
      return { status: 'unavailable', reason: 'http_error', detail: detail.slice(0, 300) };
    }

    // Ollama streams newline-delimited JSON objects, each shaped like a partial version of the
    // non-streaming response ({ message: { content: "..." }, done: false }), with the FINAL line
    // (done: true) carrying the same prompt_eval_count/eval_count/done_reason/etc. stats fields
    // the non-streaming response has — accumulated into `finalData` so processRawGenerateOutput
    // can run its checks exactly as it would on a non-streaming call.
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let assembledContent = '';
    let assembledThinking = '';
    let finalData: any = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // last (possibly incomplete) line stays in the buffer
      for (const line of lines) {
        if (!line.trim()) continue;
        let parsed: any;
        try {
          parsed = JSON.parse(line);
        } catch {
          continue; // a malformed/split line — skip rather than crash the whole stream
        }
        const fragment = typeof parsed?.message?.content === 'string' ? parsed.message.content : '';
        if (fragment) {
          assembledContent += fragment;
          onToken(fragment);
        }
        // Thinking deltas are accumulated but deliberately never handed to onToken — that callback
        // streams the visible reply typewriter-style, and raw thinking is a separate reasoning-trace
        // concern (see the `think` comment above and OllamaGenerateOptions).
        const thinkingFragment = typeof parsed?.message?.thinking === 'string' ? parsed.message.thinking : '';
        if (thinkingFragment) {
          assembledThinking += thinkingFragment;
        }
        if (parsed?.done) {
          finalData = parsed;
        }
      }
    }

    if (!finalData) {
      // Stream ended without a final done:true line — treat like any other malformed response
      // rather than trusting a possibly-truncated assembledContent.
      return { status: 'unavailable', reason: 'empty_response' };
    }
    // processRawGenerateOutput reads message.content/message.thinking off `data` directly (matching
    // the non-streaming shape) — the streamed final line's own message.content is only the LAST
    // fragment, not the full text, so it's overwritten here with what was actually accumulated.
    finalData.message = { content: assembledContent, thinking: assembledThinking || undefined };
    logLatencyDebug(finalData, options, prompt);
    return processRawGenerateOutput(finalData, options, startedAt);
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

const OLLAMA_VISION_MODEL = process.env.OLLAMA_VISION_MODEL || 'moondream';

export type VisionResult =
  | { status: 'success'; text: string; latencyMs: number }
  | { status: 'unavailable'; reason: 'not_configured' | 'connection_error' | 'timeout' | 'http_error' | 'empty_response'; detail?: string };

/**
 * Real image understanding via a dedicated small vision model (moondream by default — ~1.7GB,
 * fast enough on this host to answer in a few seconds). This did NOT exist before: server.ts's
 * image-handling paths fetched the image bytes and then just returned canned strings like
 * "Optical frame alignment verified" and "Visual Input Received & Inspected" regardless of what
 * was actually in the picture — image content was fetched, base64-encoded, and then thrown away
 * unread. gemma3:4b (the main text model) is used via Ollama's text chat API here with no images,
 * so vision stays a separate model/call rather than an option on generate().
 */
export async function generateVision(
  imageBase64: string,
  prompt: string,
  options: { timeoutMs?: number } = {}
): Promise<VisionResult> {
  if (!OLLAMA_BASE_URL) {
    return { status: 'unavailable', reason: 'not_configured' };
  }

  // Found by a code review: unlike generate() and embed() above, this never acquired the shared
  // Ollama concurrency slot at all — meaning vision calls (/api/v1/nexus with an image,
  // /api/v1/raidshield with an image, /api/v1/vision/analyze) could pile up on the same Ollama
  // instance completely unbounded, and alongside text generations too, defeating the whole point
  // of OLLAMA_MAX_CONCURRENT (tuned specifically against this host's actual RAM/parallelism
  // limits — see acquireOllamaSlot()'s own extensive comment above for why that cap exists and
  // what happens without it: request pile-up and timeout cascades on the host).
  const release = await acquireOllamaSlot();
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 30000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_VISION_MODEL,
        messages: [{ role: 'user', content: prompt, images: [imageBase64] }],
        stream: false,
        keep_alive: keepAliveFor(OLLAMA_VISION_MODEL),
        options: { temperature: 0.3, num_predict: 300 },
      }),
    });

    if (!res.ok) {
      return { status: 'unavailable', reason: 'http_error', detail: `HTTP ${res.status}` };
    }

    const data: any = await res.json();
    // A code review caught this was missing the `typeof === 'string'` guard generate() uses for
    // the identical field — if Ollama's vision model ever returned a non-string message.content
    // (a malformed response), `.trim()` would throw a TypeError caught by the outer catch and
    // mislabeled as 'connection_error' instead of the accurate, easier-to-diagnose
    // 'empty_response'.
    const text = typeof data?.message?.content === 'string' ? data.message.content.trim() : '';
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
