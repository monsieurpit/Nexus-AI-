// The judge (2026-10-13, Patrick: #3 — "he writes several replies and a quick pass picks the best one").
// Chat writes 3 different replies in one call (they're short, so it costs ~1 s more); roasts already write 5 and the
// roast engine scores them. A second, tiny call — its own short instructions, one digit out (~0.5-1.5 s) — picks the one
// that actually reacts to what they said, sounds like a real person texting, and is the funniest. If it fails or
// answers nonsense, the old pick stands (chat: the first line, roasts: the best score).

import * as localLlmClient from '../localLlmClient';

const JUDGE_SYSTEM = `You pick the best reply for Nexus, a crude, funny Aussie lad on a Discord server. You read what someone said and a few possible replies from him, and you answer with the NUMBER of the best one — nothing else.
The best reply:
1. actually reacts to / answers what they said (a dodge or a random line loses),
2. sounds like a real person texting (short, natural, not a bot, not an essay),
3. is the funniest or most savage for the moment (a specific, vivid line beats a generic insult).
Never pick one that is off-topic, repeats their message back, or asks a pointless question instead of answering.`;

// A 4B judge leans on position (it picked "option 3" for most messages, 2026-10-13): it's asked twice, the second time
// with the options rotated, and only a pick both runs agree on counts — otherwise the old pick stands.
export async function judgeBest(candidates: string[], theySaid: string, context: string, kind: 'chat' | 'roast'): Promise<number | null> {
  if (candidates.length < 2) return null;
  const first = await judgeOnce(candidates, theySaid, context, kind);
  if (first === null) return null;
  const k = candidates.length;
  const rotated = candidates.map((_, i) => candidates[(i + 1) % k]); // rotated[i] = candidates[i+1]
  const second = await judgeOnce(rotated, theySaid, context, kind);
  if (second === null) return null;
  const secondOriginal = (second + 1) % k;
  return secondOriginal === first ? first : null;
}

async function judgeOnce(candidates: string[], theySaid: string, context: string, kind: 'chat' | 'roast'): Promise<number | null> {
  const list = candidates.map((c, i) => `${i + 1}) ${c.replace(/\s+/g, ' ').slice(0, 240)}`).join('\n');
  const prompt = `${context ? `Chat so far:\n${context.slice(-600)}\n\n` : ''}They said: "${theySaid.slice(0, 400)}"\n${kind === 'roast' ? 'This is a roast battle — savage and specific wins.\n' : ''}\nPossible replies:\n${list}\n\nThe best one (number only):`;
  const res: any = await localLlmClient
    .generate(prompt, { system: JUDGE_SYSTEM, temperature: 0, maxTokens: 4, think: false, skipLanguageCheck: true, model: localLlmClient.chatModel(), timeoutMs: 15000 } as any)
    .catch(() => null);
  const n = Number(String(res?.text || '').match(/\d/)?.[0]);
  return res?.status === 'success' && n >= 1 && n <= candidates.length ? n - 1 : null;
}

// Chat's three lines from one generation: one per line, labels and quotes stripped, no duplicates.
export function chatCandidates(raw: string): string[] {
  const seen = new Set<string>();
  return raw
    .split(/\n+/)
    .map((l) => l.replace(/^\s*(?:\d+[.)]|[-*•]|reply\s*\d*:?|option\s*\d*:?)\s*/i, '').replace(/^["“]|["”]$/g, '').trim())
    .filter((l) => l.length >= 1 && !/^(?:here|okay|sure|replies|options)\b.*:$/i.test(l))
    .filter((l) => (seen.has(l.toLowerCase()) ? false : (seen.add(l.toLowerCase()), true)))
    .slice(0, 4);
}
