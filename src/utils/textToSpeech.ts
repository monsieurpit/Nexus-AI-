// Voice-over for assistant replies — reads a message aloud on demand via the browser's built-in
// Web Speech API (SpeechSynthesis), not a cloud TTS service. Deliberate choice matching this
// codebase's established "zero-quota" philosophy (see webSearchEngine.ts / weatherEngine.ts's own
// header comments): no API key to create and manage from a phone, no per-character cost, works
// fully offline once the page is loaded, and every real browser (Safari, Chrome, Edge, Firefox)
// ships it natively. Quality is lower than a cloud voice, but genuinely free and instant.

let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesLoadedPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function isSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Voice lists load asynchronously in most browsers (empty on the first call, populated once the
// 'voiceschanged' event fires) — Safari in particular reliably returns [] synchronously on first
// call. Race a short timeout against that event so a slow/absent event never hangs playback
// forever; whatever's loaded by then (often already everything) is used as-is.
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isSupported()) return Promise.resolve([]);
  if (cachedVoices.length > 0) return Promise.resolve(cachedVoices);
  if (voicesLoadedPromise) return voicesLoadedPromise;

  voicesLoadedPromise = new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      cachedVoices = existing;
      resolve(existing);
      return;
    }
    const onVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        cachedVoices = voices;
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        resolve(voices);
      }
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    // Fallback timeout — some browsers never fire voiceschanged reliably.
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      const voices = window.speechSynthesis.getVoices();
      cachedVoices = voices;
      resolve(voices);
    }, 1000);
  });
  return voicesLoadedPromise;
}

// The Web Speech API has no explicit gender field — every browser just exposes a flat list of
// named voices (e.g. "Samantha", "Google UK English Female", "Microsoft Zira Desktop - English
// (United States)", "Google français"). Matches on the common naming patterns real browsers
// actually use for their female-sounding voices, preferring an English one to match this
// persona's default voice; falls back to French-tagged names for French replies specifically.
const FEMALE_NAME_HINTS = [
  'female', 'samantha', 'zira', 'susan', 'karen', 'moira', 'tessa', 'veena', 'fiona',
  'victoria', 'allison', 'ava', 'samira', 'salli', 'joanna', 'kimberly', 'kendra', 'ivy',
  'amelie', 'amélie', 'audrey', 'celine', 'céline', 'marie', 'julie', 'chantal',
];

function pickFemaleVoice(voices: SpeechSynthesisVoice[], preferFrench: boolean): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;
  const langPrefix = preferFrench ? 'fr' : 'en';
  const inLang = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  const pool = inLang.length > 0 ? inLang : voices;

  const byNameHint = pool.find((v) => FEMALE_NAME_HINTS.some((hint) => v.name.toLowerCase().includes(hint)));
  if (byNameHint) return byNameHint;

  // No name matched a known female voice — fall back to the language pool's first voice rather
  // than searching further afield into a mismatched language just to maybe find a female name.
  return pool[0] ?? voices[0];
}

// Strips markdown syntax that would otherwise be read aloud literally ("asterisk asterisk bold
// asterisk asterisk") — a real person's speech doesn't include punctuation-as-formatting, and
// nothing here needs to be perfect, just not obviously broken to listen to.
function stripForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '') // fenced code blocks — unreadable aloud, just drop them
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // images -> alt text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links -> link text
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // bold/italic markers
    .replace(/^#{1,6}\s+/gm, '') // heading markers
    .replace(/^>\s?/gm, '') // blockquote markers
    .replace(/^[-*+]\s+/gm, '') // bullet markers
    .replace(/^\d+\.\s+/gm, '') // numbered list markers
    .replace(/\s+/g, ' ')
    .trim();
}

export interface SpeakOptions {
  preferFrench?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function isSpeechSupported(): boolean {
  return isSupported();
}

// Lightweight, client-side-only heuristic for picking a French vs English voice — deliberately
// simpler than reasoningEngine.ts's own looksFrench() (which drives actual generation-language
// routing and has to be precise); here a wrong guess just picks a slightly-off-accent voice for
// one message, not a wrong-language reply, so a cheap accented-character/sacre check is enough.
export function looksFrenchForSpeech(text: string): boolean {
  return /[àâçéèêëîïôùûüœ]|(?:\b(?:tabarnak|câlisse|calisse|criss|ostie|osti)\b)/i.test(text);
}

export async function speakText(text: string, opts: SpeakOptions = {}): Promise<void> {
  if (!isSupported()) {
    opts.onError?.();
    return;
  }
  // A new speak() call always replaces whatever's currently playing — cancel first so two
  // messages' audio never overlaps.
  window.speechSynthesis.cancel();

  const cleaned = stripForSpeech(text);
  if (!cleaned) {
    opts.onError?.();
    return;
  }

  const voices = await loadVoices();
  const voice = pickFemaleVoice(voices, !!opts.preferFrench);

  const utterance = new SpeechSynthesisUtterance(cleaned);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else if (opts.preferFrench) {
    utterance.lang = 'fr-CA';
  }
  // Slightly above default pace/pitch — reads closer to a real chatty voice than the flat default,
  // without tipping into the "obviously sped up" zone.
  utterance.rate = 1.05;
  utterance.pitch = 1.05;
  utterance.onstart = () => opts.onStart?.();
  utterance.onend = () => opts.onEnd?.();
  utterance.onerror = () => opts.onError?.();

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (isSupported()) window.speechSynthesis.cancel();
}
