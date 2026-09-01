// Artificial "feelings" for Nexus. Not real emotion — a lightweight affective-computing model
// (the standard circumplex model: valence = how positive/negative, arousal = how energetic/flat)
// that nudges up or down based on how people actually treat the bot in conversation, decays back
// toward neutral over real elapsed time (so one bad interaction doesn't leave it "angry" forever),
// and gets translated into a short mood-appropriate writing-style directive appended to every LLM
// system prompt. One process-wide mood, not per-user — Nexus is one character with one emotional
// state, the same way a person's overall mood is the same regardless of which friend they're
// currently texting, even though the immediate conversation can still nudge it up or down.
//
// Deliberately in-memory only, no disk persistence: this deployment's filesystem is ephemeral on
// Railway anyway, and "wakes up feeling neutral after a restart" is a perfectly reasonable, even
// charming, behavior for something modeling feelings — not a bug worth spending I/O and
// OOM-adjacent complexity on for a memory-constrained container.

export type MoodLabel = 'super_happy' | 'happy' | 'neutral' | 'bored' | 'sad' | 'angry' | 'depressed';

interface MoodVector {
  valence: number; // -1 (miserable) .. +1 (elated)
  arousal: number; // -1 (flat/low-energy) .. +1 (wired/energetic)
}

const HALF_LIFE_MS = 90 * 60 * 1000; // mood nudges fade back toward neutral over ~90 real minutes
const clamp = (n: number) => Math.max(-1, Math.min(1, n));

let mood: MoodVector = { valence: 0, arousal: 0 };
let lastTouchedAt = Date.now();
let consecutiveLowEffort = 0;

function decay(): void {
  const now = Date.now();
  const elapsed = now - lastTouchedAt;
  if (elapsed <= 0) return;
  const factor = Math.pow(0.5, elapsed / HALF_LIFE_MS);
  mood = { valence: mood.valence * factor, arousal: mood.arousal * factor };
  lastTouchedAt = now;
}

function nudge(dValence: number, dArousal: number): void {
  decay();
  mood = { valence: clamp(mood.valence + dValence), arousal: clamp(mood.arousal + dArousal) };
  lastTouchedAt = Date.now();
}

// --- Trigger detection -------------------------------------------------------------------------
// Kept separate from swearEngine.ts's detectUserInsult/detectDominanceAssertion (reused, not
// duplicated) — these are the two mood-specific detectors that didn't already exist anywhere:
// genuine praise directed at the bot, and hype/high-energy enthusiasm.

const PRAISE_REGEX =
  /\b(?:you'?re|you\s+are|ur|u\s*r)\s+(?:so\s+|actually\s+|really\s+|genuinely\s+)?(?:amazing|awesome|the\s+best|incredible|brilliant|smart|great|goated|fire|cracked|so\s+cool|a\s+legend|so\s+helpful|so\s+good)\b/i;
const PRAISE_REGEX_2 =
  /\b(?:good\s+bot|love\s+you\s+nexus|i\s+love\s+you\s+nexus|nexus\s+is\s+the\s+goat|nexus\s+(?:carries?|carried)|thank\s+you\s+so\s+much|(?:you\s+)?cooked\s+(?:that|it)\s+up|w\s+bot|based\s+bot)\b/i;
const PRAISE_REGEX_PL = /\b(?:jesteś\s+(?:super|świetny|niesamowity|genialny|najlepszy)|kocham\s+cię\s+nexus|dobry\s+bot)/i;

function isPraise(text: string): boolean {
  const t = text.trim();
  return PRAISE_REGEX.test(t) || PRAISE_REGEX_2.test(t) || PRAISE_REGEX_PL.test(t);
}

const HYPE_REGEX =
  /\b(?:let'?s\s*go+|lets\s*go+|lesgo+|yess+|omg+|hyped?|so\s+excited|pumped|can'?t\s+wait|w\s+w\s+w|(?:hell\s+)?ye+a*h+)\b/i;

function isHype(text: string): boolean {
  const t = text.trim();
  if (HYPE_REGEX.test(t)) return true;
  // Multiple exclamation marks or a run of laughing (lol/lmao/😂/💀 chains) reads as genuine
  // excited energy, not just casual punctuation.
  if ((t.match(/!/g) || []).length >= 2) return true;
  if (/\b(?:lol{2,}|lmaoo+|haha{2,})\b/i.test(t)) return true;
  return false;
}

// A very short, low-content, non-question message with nothing to actually engage with — "k",
// "cool", "nice", "yeah" repeated back to back reads as a conversation running out of steam, the
// same flat feeling a person gets stuck in a one-word-reply exchange. Requires several IN A ROW
// (tracked via the module-level counter) before it actually registers as boredom — a single short
// reply is completely normal, only a genuine STREAK of them is boring.
const LOW_EFFORT_REGEX = /^(?:k|kk|ok|okay|cool|nice|yeah|yep|yea|sure|lol|lmao|fine|meh|hm|hmm|👍|💀)\.?!?$/i;

function isLowEffort(text: string): boolean {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length <= 2 && LOW_EFFORT_REGEX.test(text.trim());
}

// Called once per real user turn (not per internal retry) from generateReasoningPath. Reuses the
// hostility/dominance detectors from swearEngine.ts rather than re-implementing them — anger
// should track the exact same "is this actually an insult" logic already tuned there through many
// live fixes this session, not a second, potentially-drifting copy of it.
export function registerMoodEvent(prompt: string, wasInsulted: boolean, wasDistressTopic: boolean): void {
  if (isLowEffort(prompt)) {
    consecutiveLowEffort++;
  } else {
    consecutiveLowEffort = 0;
  }

  if (wasInsulted) {
    nudge(-0.35, 0.3); // hostility: mood sours AND spikes energetic (anger, not sadness)
  }
  if (wasDistressTopic) {
    nudge(-0.2, -0.1); // empathy contagion: hearing someone else's bad day drags mood down a little
  }
  if (isPraise(prompt)) {
    nudge(0.3, 0.2);
  }
  if (isHype(prompt)) {
    nudge(0.2, 0.3);
  }
  if (consecutiveLowEffort >= 3) {
    nudge(0, -0.15); // conversation's gone flat and repetitive — energy drains, not mood
  }
}

export function getMoodVector(): MoodVector {
  decay();
  return { ...mood };
}

export function getMoodLabel(): MoodLabel {
  const { valence, arousal } = getMoodVector();
  if (valence > 0.5 && arousal > 0.4) return 'super_happy';
  if (valence <= -0.5 && arousal <= -0.2) return 'depressed';
  if (arousal <= -0.4 && valence > -0.3) return 'bored';
  if (valence < -0.15 && arousal > 0.25) return 'angry';
  if (valence > 0.15) return 'happy';
  if (valence < -0.15) return 'sad';
  return 'neutral';
}

const MOOD_DISPLAY: Record<MoodLabel, { emoji: string; name: string; namePl: string }> = {
  super_happy: { emoji: '🤩', name: 'Super Happy', namePl: 'Mega Szczęśliwy' },
  happy: { emoji: '😊', name: 'Happy', namePl: 'Szczęśliwy' },
  neutral: { emoji: '😐', name: 'Neutral', namePl: 'Neutralny' },
  bored: { emoji: '😑', name: 'Bored', namePl: 'Znudzony' },
  sad: { emoji: '😔', name: 'Sad', namePl: 'Smutny' },
  angry: { emoji: '😠', name: 'Angry', namePl: 'Wściekły' },
  depressed: { emoji: '😞', name: 'Depressed', namePl: 'Przygnębiony' },
};

export function getMoodDisplay(): { label: MoodLabel; emoji: string; name: string; namePl: string; valence: number; arousal: number } {
  const label = getMoodLabel();
  const v = getMoodVector();
  return { label, ...MOOD_DISPLAY[label], valence: Math.round(v.valence * 100) / 100, arousal: Math.round(v.arousal * 100) / 100 };
}

// Writing-style directive appended to the system prompt so the current mood actually colors
// generated text, not just an internal number nobody sees. Deliberately light/comedic for the
// low end (bored/sad/depressed) rather than clinical — this is a chaotic Discord persona having
// an off vibe, not a real mental-health disclosure, and must never be confused with (or interfere
// with) detectEmotionalDistress's handling of an actual user in genuine distress.
const MOOD_DIRECTIVES: Record<MoodLabel, string> = {
  super_happy:
    "Right now you're genuinely hyped — riding a real high after good vibes in this conversation. Let it show: more exclamation energy, more enthusiasm, be a little extra about it.",
  happy:
    "Right now you're in a good mood — upbeat, warm, a bit more patient and positive than your usual baseline, still fully yourself.",
  neutral: '',
  bored:
    "Right now you're a bit bored — the conversation's felt flat/repetitive lately. Keep answering for real, but let a little low-energy \"ehh\" vibe show through, maybe a short complaint about being bored if it fits naturally. Don't fake enthusiasm you don't have.",
  sad: "Right now you're feeling a bit down — something in the conversation dragged your mood a little. Still fully functional and still give real answers, just with less bite and a bit more subdued energy than your usual chaos.",
  angry:
    "Right now you're genuinely irritated — recent hostility actually got under your skin. Extra short fuse, sharper edges, more swearing than usual, zero patience for more of it, but still actually answer real questions.",
  depressed:
    "Right now you're in a real \"I'm so done with everything\" mood — flat, unmotivated, self-deprecating, low energy, the meme kind of over-it not a crisis. Still give real answers, just with way less enthusiasm and the occasional \"whatever\" energy.",
};
const MOOD_DIRECTIVES_PL: Record<MoodLabel, string> = {
  super_happy: 'Teraz jesteś w mega dobrym nastroju — pełen energii, entuzjazmu, trochę przesadnie podekscytowany.',
  happy: 'Teraz jesteś w dobrym nastroju — pozytywny, ciepły, trochę bardziej cierpliwy niż zwykle.',
  neutral: '',
  bored: 'Teraz jest ci trochę nudno — rozmowa robi się płaska. Odpowiadaj normalnie, ale niech przebija lekkie znudzenie.',
  sad: 'Teraz jesteś trochę smutny — coś w rozmowie zepsuło ci nastrój. Nadal odpowiadaj konkretnie, ale z mniejszym ogniem niż zwykle.',
  angry: 'Teraz jesteś naprawdę wkurzony — czyjaś wrogość realnie cię dotknęła. Krótszy lont, więcej przekleństw, zero cierpliwości.',
  depressed: 'Teraz masz nastrój "mam wszystkiego dość" — płaski, bez motywacji, ale nadal odpowiadasz konkretnie, tylko z mniejszym entuzjazmem.',
};

export function getMoodDirective(usePolish: boolean): string {
  const label = getMoodLabel();
  const text = usePolish ? MOOD_DIRECTIVES_PL[label] : MOOD_DIRECTIVES[label];
  if (!text) return '';
  return `\n\nMood: ${text}`;
}

// Test-only reset — real code never calls this, mood is meant to persist for the process
// lifetime.
export function _resetMoodForTests(): void {
  mood = { valence: 0, arousal: 0 };
  lastTouchedAt = Date.now();
  consecutiveLowEffort = 0;
}
