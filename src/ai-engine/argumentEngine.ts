// "In an argument he chooses a side" — part of giving Nexus artificial feelings. An LLM's default
// instinct on a subjective debate ("pizza or tacos", "cats or dogs", "which team is better") is to
// hedge — "both are great in their own way!" — which is exactly the wishy-washy non-answer a real
// opinionated friend would never give. This module detects that shape of question, DECIDES the
// side in code (biased toward FC Barcelona/football rivalries when one is actually in play,
// genuinely random otherwise — the same distinction the user asked for), and hands the LLM a
// firm, already-made decision to defend instead of leaving the choice, and the hedging, to the
// model itself.

export interface DebateSides {
  optionA: string;
  optionB: string;
}

// Deliberately narrow and opinion-signaling ("better", "prefer", "pick a side", "who wins") rather
// than a bare "X or Y" — a bare "or" shape is too easy to false-positive on genuine factual
// questions ("is the answer 5 or 6", "was it Napoleon or Wellington who won at Waterloo") that
// have one objectively correct answer and should NOT get a random/biased coin-flip opinion.
const DEBATE_PATTERNS: RegExp[] = [
  /\bwhich\s+(?:one\s+)?(?:is\s+|do\s+you\s+think\s+is\s+)?better[,:]?\s+(.+?)\s+or\s+(.+?)[?!.]*$/i,
  /\b(.+?)\s+or\s+(.+?)[,]?\s+which\s+(?:one\s+)?(?:is\s+)?better\??$/i,
  /\bwho'?s\s+(?:better|the\s+goat|the\s+best|gonna\s+win|going\s+to\s+win)[,:]?\s+(.+?)\s+or\s+(.+?)[?!.]*$/i,
  /\b(.+?)\s+vs\.?\s+(.+?)[,]?\s+who'?s\s+(?:better|gonna\s+win|going\s+to\s+win)\??$/i,
  /\bpick\s+a\s+side[,:]?\s+(.+?)\s+or\s+(.+?)[?!.]*$/i,
  /\bdo\s+you\s+prefer\s+(.+?)\s+or\s+(.+?)[?!.]*$/i,
  /\bwhat'?s\s+better[,:]?\s+(.+?)\s+or\s+(.+?)[?!.]*$/i,
];

export function detectSubjectiveDebate(prompt: string): DebateSides | null {
  const t = prompt.trim();
  for (const pattern of DEBATE_PATTERNS) {
    const match = pattern.exec(t);
    if (!match) continue;
    const optionA = match[1]?.trim().replace(/^(?:is\s+|the\s+)/i, '');
    const optionB = match[2]?.trim().replace(/^(?:is\s+|the\s+)/i, '');
    if (!optionA || !optionB) continue;
    // Reject anything that's actually a factual either/or question in disguise — a bare number
    // ("5 or 6") or a single short proper-noun-shaped guess pair about a factual event has no
    // subjective "better" to have an opinion about, even if it happened to match one of the
    // looser patterns above.
    if (/^\d+$/.test(optionA) || /^\d+$/.test(optionB)) continue;
    if (optionA.length > 60 || optionB.length > 60) continue; // not this shape — probably a run-on sentence, not two short options
    return { optionA, optionB };
  }
  return null;
}

const BARCELONA_REGEX = /\b(?:fc\s*barcelona|barcelona|barça|barca|blaugrana)\b/i;
// Common rivals/comparison targets — Barcelona bias only actually matters when the OTHER side is
// also football-shaped (another club, or a rival player); "Barcelona or a rainy Tuesday" isn't a
// real football debate, so the bias check requires BOTH sides to look like the same kind of thing
// isn't necessary — Barcelona should win against literally anything it's pitted against, same as
// a real fan would insist "Barça" any time the option is on the table at all.

export interface DebateVerdict {
  winner: string;
  loser: string;
  reason: 'barca_bias' | 'random';
}

export function pickDebateSide(sides: DebateSides): DebateVerdict {
  const aIsBarca = BARCELONA_REGEX.test(sides.optionA);
  const bIsBarca = BARCELONA_REGEX.test(sides.optionB);
  if (aIsBarca && !bIsBarca) return { winner: sides.optionA, loser: sides.optionB, reason: 'barca_bias' };
  if (bIsBarca && !aIsBarca) return { winner: sides.optionB, loser: sides.optionA, reason: 'barca_bias' };
  // Both or neither mention Barcelona — genuinely random, per the user's own spec ("random or with
  // his favorite team"). A real coin flip each time, not seeded/cached per topic — asking the same
  // debate again later getting a different answer is realistic (people are inconsistent/moody
  // about opinions too), not a bug.
  return Math.random() < 0.5
    ? { winner: sides.optionA, loser: sides.optionB, reason: 'random' }
    : { winner: sides.optionB, loser: sides.optionA, reason: 'random' };
}

export function buildDebateInstruction(verdict: DebateVerdict, prompt: string): string {
  const barcaNote =
    verdict.reason === 'barca_bias'
      ? ` FC Barcelona is literally your favorite team — that's exactly why, no other reason needed, and you should say so.`
      : '';
  return `The user asked you to pick a side in a subjective debate with no objectively correct answer: "${prompt}". You've already made up your mind — you're firmly on the side of "${verdict.winner}", not "${verdict.loser}".${barcaNote} Defend your pick with real conviction and personality — genuine (even if silly/exaggerated) reasons are great, but the key thing is you commit FULLY. Do NOT hedge, do NOT say "both are good in their own way", do NOT sit on the fence — pick "${verdict.winner}" and mean it, the way a real person with an actual opinion would.`;
}
