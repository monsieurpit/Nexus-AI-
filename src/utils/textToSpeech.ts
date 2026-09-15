// Voice-over for assistant replies — reads a message aloud, in Patrick's own cloned voice, via
// the local tts-service (Coqui XTTS-v2, server.ts's /api/v1/speak proxy). Replaced the earlier
// browser-native Web Speech API version once Patrick asked specifically for his own voice instead
// of a generic browser voice — see tts-service/server.py for the actual cloning.
//
// Only ever triggered by an explicit click on the speak button (never automatically), and
// ChatView.tsx gates that click itself so playback never STARTS while any reply is still
// generating anywhere — this module only handles the actual fetch + playback once it's told to go.

let currentAudio: HTMLAudioElement | null = null;

// Strips markdown syntax that would otherwise be read aloud literally ("asterisk asterisk bold
// asterisk asterisk") — a real person's speech doesn't include punctuation-as-formatting.
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
  onError?: (reason?: string) => void;
}

export function isSpeechSupported(): boolean {
  // Always true — this no longer depends on the browser's own speechSynthesis support, only on
  // fetch/Audio (universal). The tts-service being unreachable is a runtime error (onError), not a
  // feature-support question, so the button always shows; a missing service surfaces as a real
  // error message instead of silently hiding the button.
  return typeof window !== 'undefined' && typeof Audio !== 'undefined';
}

export async function speakText(text: string, opts: SpeakOptions = {}): Promise<void> {
  stopSpeaking();

  const cleaned = stripForSpeech(text);
  if (!cleaned) {
    opts.onError?.('empty_text');
    return;
  }

  try {
    const res = await fetch('/api/v1/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleaned, language: opts.preferFrench ? 'fr' : 'en' }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      opts.onError?.(body?.error || `http_${res.status}`);
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onplay = () => opts.onStart?.();
    audio.onended = () => {
      URL.revokeObjectURL(url);
      if (currentAudio === audio) currentAudio = null;
      opts.onEnd?.();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      if (currentAudio === audio) currentAudio = null;
      opts.onError?.('playback_error');
    };
    await audio.play();
  } catch (err) {
    opts.onError?.(err instanceof Error ? err.message : 'connection_error');
  }
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// Lightweight, client-side-only heuristic for picking French vs English — same reasoning as
// before: a wrong guess here just picks a slightly-off language pass on the TTS side for one
// message, not a wrong-language reply, so a cheap accented-character/sacre check is enough
// (mirrors reasoningEngine.ts's own looksFrench(), simplified for this lower-stakes use).
export function looksFrenchForSpeech(text: string): boolean {
  return /[àâçéèêëîïôùûüœ]|(?:\b(?:tabarnak|câlisse|calisse|criss|ostie|osti)\b)/i.test(text);
}
