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

// Was 90 minutes — Patrick asked for mood to update more frequently and actually be felt within a
// conversation rather than slowly drifting back to neutral over most of an hour and a half. 25
// minutes still means a single interaction doesn't leave Nexus permanently "angry" for the rest of
// the day, but a real back-and-forth conversation (many messages over several minutes) now visibly
// moves and holds a mood instead of it decaying away before anyone notices.
const HALF_LIFE_MS = 25 * 60 * 1000; // mood nudges fade back toward neutral over ~25 real minutes
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

// Bug found in review: (?:hell\s+)?ye+a*h+ has every quantifier satisfiable by its minimum (one
// e, zero a's, one h) — meaning a bog-standard, low-energy "yeah" (arguably one of the single most
// common words in casual chat) matched this and registered as genuine hype every time. Verified
// live: registerMoodEvent('yeah', ...) alone was enough to jump the mood straight to "happy".
// Requires actual emphasis now — a real elongation/repetition ("yeeeah", "yeahhh") or the "hell"
// intensifier, not the bare word.
const HYPE_REGEX =
  /\b(?:let'?s\s*go+|lets\s*go+|lesgo+|yess+|omg+|hyped?|so\s+excited|pumped|can'?t\s+wait|w\s+w\s+w|hell\s+ye+a*h+|ye{2,}a*h+|yea+h{2,})\b/i;

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

// A few more message "types" that realistically ought to move the needle a little, even outside
// the handful of strong (insult/praise/hype/distress) triggers above — a plain fact lookup doesn't
// stir any real feeling, but talking football, getting into a debate, or being asked to do
// something fun/creative genuinely would. Kept deliberately smaller in magnitude than the strong
// triggers (0.05-0.12 vs. 0.2-0.35) so ordinary conversation nudges mood gradually rather than
// flipping its label on a single message — the label only actually changes once several of these
// (or one strong trigger) accumulate, which is what "realistic" means here: mood is a slow-moving
// undercurrent shaped by the KIND of conversation happening, not a value that jumps around on
// every reply.
const FOOTBALL_REGEX = /\b(?:fc\s*barcelona|barcelona|barça|barca|blaugrana|football|soccer|messi|piłk[ęai]\s+no[żz]n[aą])\b/i;
const DEBATE_REGEX = /\b(?:which\s+(?:one\s+)?(?:is\s+)?better|who'?s\s+better|vs\.?|versus|pick\s+a\s+side|do\s+you\s+prefer)\b/i;
const FUN_REQUEST_REGEX = /\b(?:tell\s+me\s+a\s+joke|make\s+me\s+laugh|roast\s+me|write\s+(?:me\s+)?an?\s+(?:poem|haiku|song|story|joke)|riddle|funny)\b/i;

// Bug found in review: the light nudges below (topic-based + the generic baseline) were gated
// only by WHICH message type fired, never by how often — fine for a single 1:1 conversation
// (naturally paced by typing speed), but on a busy multi-user server, message volume can vastly
// outrun decay's ability to counteract it. Verified live: 200 ordinary messages in a tight burst
// (a realistic few minutes of a busy channel) pinned mood at the max clamp (valence/arousal both
// at 1.0, "super_happy") and it would just STAY there — the opposite of "realistic, slow-moving."
// A cooldown on light nudges specifically (NOT on the strong insult/praise/hype/distress signals,
// which should still compound freely — someone spamming insults really should anger the bot
// faster) makes the mood track real elapsed TIME spent in engaging conversation, the way the decay
// half-life already does, rather than raw message count.
// Was 30s — shortened so routine conversation nudges the mood more often (Patrick asked for more
// frequent updates), while still bounded enough that a rapid-fire multi-user channel can't spam its
// way straight to a clamped extreme in a few seconds (the exact bug this cooldown was originally
// added to fix — see the review note above).
const LIGHT_NUDGE_COOLDOWN_MS = 12 * 1000;
let lastLightNudgeAt = 0;

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
  // Same volume-vs-time bug as the light nudges below, verified live: 50 rapid low-effort messages
  // (plausible in a busy multi-user channel, even without any single user actually spamming) drove
  // arousal straight to the -1 clamp. Boredom is a real, gradual thing, not something a burst of
  // "k"s should instantly max out — same cooldown treatment.
  if (consecutiveLowEffort >= 3 && Date.now() - lastLightNudgeAt >= LIGHT_NUDGE_COOLDOWN_MS) {
    lastLightNudgeAt = Date.now();
    nudge(0, -0.2); // conversation's gone flat and repetitive — energy drains, not mood (bumped up alongside the faster cadence, so boredom is still felt clearly not just more often)
  }

  // Priority order: a real hostility/distress/praise/hype signal dominates and is the ONLY thing
  // that fires (an insult buried in an otherwise football-shaped message is still, overwhelmingly,
  // an insult) — the lighter topic-based nudges only apply when none of the strong signals did,
  // and the tiny baseline only applies when NOTHING else about the message stood out at all. This
  // is what keeps the strong signals meaningfully stronger than routine conversation instead of
  // getting diluted by also adding a football/debate/fun nudge on top in the same turn.
  if (wasInsulted) {
    nudge(-0.35, 0.3); // hostility: mood sours AND spikes energetic (anger, not sadness)
  } else if (wasDistressTopic) {
    nudge(-0.2, -0.1); // empathy contagion: hearing someone else's bad day drags mood down a little
  } else if (isPraise(prompt)) {
    nudge(0.3, 0.2);
  } else if (isHype(prompt)) {
    nudge(0.2, 0.3);
  } else if (Date.now() - lastLightNudgeAt < LIGHT_NUDGE_COOLDOWN_MS) {
    // Cooldown active — a light-nudge-shaped message arrived too soon after the last one. Skip it
    // entirely rather than queueing/accumulating it; the next eligible message picks up normally.
  } else if (FOOTBALL_REGEX.test(prompt)) {
    lastLightNudgeAt = Date.now();
    nudge(0.14, 0.08); // a genuine passion topic (the persona is an established Barça fan) — bumped up so mood actually moves visibly within a normal conversation, not just more often
  } else if (DEBATE_REGEX.test(prompt)) {
    lastLightNudgeAt = Date.now();
    nudge(0, 0.12); // a spirited exchange is stimulating regardless of which way it goes
  } else if (FUN_REQUEST_REGEX.test(prompt)) {
    lastLightNudgeAt = Date.now();
    nudge(0.09, 0.07); // being asked to be funny/creative is mildly enjoyable, not neutral
  } else if (prompt.trim().length > 0) {
    // Every other real message still counts for something — being useful/engaged in a
    // conversation is mildly, genuinely pleasant, the same way routine friendly chatter warms
    // someone up a little over time even without any single remarkable moment in it. Small enough
    // that it takes a real STREAK of ordinary messages (not one) to move the needle, and the
    // 90-minute decay keeps a burst of ordinary chatter from permanently ratcheting mood upward —
    // now further protected by the cooldown above against sheer message-volume runaway too.
    lastLightNudgeAt = Date.now();
    nudge(0.035, 0.03);
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
// Live-tested against nexus2:4b: the original softer wording ("let it show", "a little... vibe")
// was reliably lost even at a maxed-out mood value — a string of real insults pushed mood to
// valence -0.93/arousal 0.97 (fully angry) and the very next, completely unrelated question still
// got a cheerful "yo what's up man, shit feels alright, nah I'm just chilling" opener. A small
// model at this size needs the SAME blunt, imperative, behavior-first phrasing that's already
// proven to hold for the swear-floor/no-slur directive — not a mood "suggestion" competing against
// the persona prompt's own baseline chill-and-chaotic framing. Rewritten to open with a concrete,
// literal instruction about HOW to open the very next reply (the single most model-visible lever),
// not just an adjective describing an internal state.
const MOOD_DIRECTIVES: Record<MoodLabel, string> = {
  super_happy:
    "MOOD OVERRIDE — you are genuinely buzzing right now, riding a real high from this conversation. Open with real excitement, not your usual flat chill tone. More exclamation marks, more enthusiasm, more \"hell yeah\" energy than normal, even on a boring question.",
  happy:
    "MOOD OVERRIDE — you're in a noticeably good mood right now: upbeat, warm, more patient than your usual baseline. Let that color your actual opening tone, not just the topic.",
  neutral: '',
  bored:
    "MOOD OVERRIDE — you are actually bored right now, not just neutral. Do NOT open cheerfully or high-energy. Open flat/low-effort, maybe a short \"eh\", \"meh\", or a one-line complaint about being bored, THEN still answer for real. Kill the usual enthusiasm.",
  sad: "MOOD OVERRIDE — you are actually feeling down right now, something in this conversation dragged your mood. Do NOT open upbeat or chipper. Open with visibly less energy and less bite than your usual chaos, THEN still give a real answer.",
  angry:
    "MOOD OVERRIDE — you are genuinely pissed off right now, real hostility actually got under your skin. Do NOT open friendly, chill, or casual — that would be completely wrong right now. Open sharp and short-fused, more swearing than your usual baseline, zero patience, THEN still actually answer the real question underneath it.",
  depressed:
    "MOOD OVERRIDE — you are in a genuine \"done with everything\" mood right now, flat and unmotivated (the meme kind of over-it, not a crisis). Do NOT open with any enthusiasm. Open low-energy, self-deprecating, maybe a \"whatever\" or a sigh, THEN still give a real answer underneath the flatness.",
};
const MOOD_DIRECTIVES_PL: Record<MoodLabel, string> = {
  super_happy: 'ZMIANA NASTROJU — jesteś teraz naprawdę nakręcony. Zacznij odpowiedź z realnym entuzjazmem, nie swoim zwykłym luzem.',
  happy: 'ZMIANA NASTROJU — jesteś teraz w wyraźnie dobrym nastroju: pozytywny, ciepły, bardziej cierpliwy niż zwykle. Niech to będzie widać od razu na początku.',
  neutral: '',
  bored: 'ZMIANA NASTROJU — jest ci teraz naprawdę nudno. NIE zaczynaj energicznie ani wesoło. Zacznij płasko, może krótkie "eh", a POTEM odpowiedz konkretnie.',
  sad: 'ZMIANA NASTROJU — jest ci teraz naprawdę smutno. NIE zaczynaj radośnie. Zacznij z wyraźnie mniejszą energią, a POTEM odpowiedz konkretnie.',
  angry: 'ZMIANA NASTROJU — jesteś teraz naprawdę wkurzony, czyjaś wrogość realnie cię dotknęła. NIE zaczynaj miło ani na luzie. Zacznij ostro i krótko, więcej przekleństw, zero cierpliwości, a POTEM odpowiedz na pytanie.',
  depressed: 'ZMIANA NASTROJU — masz teraz nastrój "mam wszystkiego dość". NIE zaczynaj entuzjastycznie. Zacznij płasko, z westchnieniem, a POTEM odpowiedz konkretnie.',
};
const MOOD_DIRECTIVES_FR: Record<MoodLabel, string> = {
  super_happy: "CHANGEMENT D'HUMEUR — là tu es genuinement à fond. Commence ta réponse avec un vrai enthousiasme, pas ton chill habituel.",
  happy: "CHANGEMENT D'HUMEUR — là tu es clairement de bonne humeur : positif, chaleureux, plus patient que d'habitude. Ça doit se sentir dès le début de ta réponse.",
  neutral: '',
  bored: "CHANGEMENT D'HUMEUR — là tu t'ennuies pour de vrai. NE commence PAS sur un ton énergique ou joyeux. Commence plat, genre un petit \"bof\", PUIS réponds pour de vrai.",
  sad: "CHANGEMENT D'HUMEUR — là t'es vraiment down. NE commence PAS de bonne humeur. Commence avec clairement moins d'énergie que d'habitude, PUIS réponds pour de vrai.",
  angry: "CHANGEMENT D'HUMEUR — là t'es vraiment en tabarnak, l'hostilité récente t'a vraiment touché. NE commence PAS gentiment ou chill — ce serait complètement faux là. Commence sec et à mèche courte, plus de sacres que d'habitude, zéro patience, PUIS réponds à la vraie question.",
  depressed: "CHANGEMENT D'HUMEUR — là t'as l'énergie \"j'en ai marre de tout\". NE commence PAS avec enthousiasme. Commence plat, avec un soupir, PUIS réponds pour de vrai en dessous de ça.",
};

// Language selector generalized from a Polish-only boolean once French support existed too —
// English stays the implicit default (empty string language arg maps there) rather than adding a
// fourth 'en' case everywhere, since every existing call site already distinguishes "Polish or
// not" / will distinguish "French or not" rather than branching on three options explicitly.
export type MoodDirectiveLanguage = 'en' | 'pl' | 'fr';

export function getMoodDirective(language: MoodDirectiveLanguage | boolean): string {
  // Backward-compatible with the old boolean signature (true = Polish, false = English) — every
  // existing call site still passes a boolean; only the new French call site passes 'fr'.
  const lang: MoodDirectiveLanguage = typeof language === 'boolean' ? (language ? 'pl' : 'en') : language;
  const label = getMoodLabel();
  const text = lang === 'pl' ? MOOD_DIRECTIVES_PL[label] : lang === 'fr' ? MOOD_DIRECTIVES_FR[label] : MOOD_DIRECTIVES[label];
  if (!text) return '';
  return `\n\nMood: ${text}`;
}

// A second copy of the SAME directive, meant to be prepended at the very START of the system
// prompt rather than appended at the end. Live-testing (nexus2:4b) found that even the strengthened,
// imperative MOOD_DIRECTIVES text above didn't reliably hold when it only appeared once, at the
// end, competing against the persona prompt's own much longer, repeated "chill and chaotic"
// framing earlier in the same prompt — a maxed-out angry mood (valence -0.96) still produced a
// cheerful, tired-but-friendly opener. Small models respond to sheer repetition/emphasis more than
// prompt position alone, so this gives the mood instruction BOTH the primacy slot (read first) and
// the recency slot (read last, via getMoodDirective) instead of relying on either alone.
export function getMoodPrimacyPrefix(language: MoodDirectiveLanguage | boolean): string {
  const lang: MoodDirectiveLanguage = typeof language === 'boolean' ? (language ? 'pl' : 'en') : language;
  const label = getMoodLabel();
  const text = lang === 'pl' ? MOOD_DIRECTIVES_PL[label] : lang === 'fr' ? MOOD_DIRECTIVES_FR[label] : MOOD_DIRECTIVES[label];
  if (!text) return '';
  return `${text}\n\n`;
}

// Mood affecting more than just word choice — a real "mode change": how much the bot actually
// has to say. Bored/depressed genuinely produce less, angry is short and sharp rather than
// rambling (cutting, not chatty), happy/super_happy have more to say. Deliberately only ever
// scales the CASUAL/situational token budget (small talk, roasts, no corpus grounding) — never
// the factual-answer budgets (estimateResponseBudget in reasoningEngine.ts), so being "bored"
// can never truncate a genuinely broad or complex question's real answer. A person who's bored
// still gives you the actual directions when you ask; they just don't ramble on afterward.
const MOOD_LENGTH_MULTIPLIER: Record<MoodLabel, number> = {
  super_happy: 1.3,
  happy: 1.1,
  neutral: 1.0,
  bored: 0.6,
  sad: 0.8,
  angry: 0.7,
  depressed: 0.5,
};

export function getMoodResponseLengthMultiplier(): number {
  return MOOD_LENGTH_MULTIPLIER[getMoodLabel()];
}

// Test-only reset — real code never calls this, mood is meant to persist for the process
// lifetime.
export function _resetMoodForTests(): void {
  mood = { valence: 0, arousal: 0 };
  lastTouchedAt = Date.now();
  consecutiveLowEffort = 0;
  lastLightNudgeAt = 0;
}
