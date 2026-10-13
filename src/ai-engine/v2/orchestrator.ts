// The orchestrator around the specialists (2026-10-13, Patrick: "the router should understand when to use one, several,
// or none — without making every message go through a complicated pipeline").
//
// It only adds work when a message needs it:
//   one specialist   the usual case; nothing extra happens (banter goes straight to chat, no extra call)
//   several          a mixed message ("what's bitcoin at and write me a python script that converts it"): each part goes
//                    to its own specialist, one after the other (one model slot anyway), answers joined
//   ask first        a request with nothing to act on ("fix it", "help me" with no conversation before it): one quick
//                    question back instead of a guess
//   fallback         a specialist that fails (timeout, empty or blocked reply) hands the message to the next best one
// The checks are regexes on the message (microseconds); splitting a mixed message costs one embedding per part (~50 ms),
// and only for messages that have a join word between two requests.

import type { SpecialistId } from './specialists';
import type { Route } from './router';

// Specialists that DO a job (as opposed to chat / roast / support, which are conversation).
const WORK: SpecialistId[] = ['question', 'search', 'code', 'maths', 'pc', 'writing'];

// Where a message goes when its specialist fails. Search without results falls back to what the model knows; code /
// maths / pc to a plain explanation; everything ends at chat, which always answers.
const FALLBACK: Partial<Record<SpecialistId, SpecialistId>> = {
  search: 'question',
  code: 'question',
  maths: 'question',
  pc: 'question',
  writing: 'chat',
  helper: 'chat',
  video: 'chat',
  roast: 'chat',
  question: 'chat',
  support: 'chat',
};
export function fallbackFor(mode: SpecialistId): SpecialistId | null {
  return FALLBACK[mode] || null;
}

// "fix it", "do that pls", "can you help me", "explain this" — with nothing before it to say what "it" is.
const VAGUE_RE =
  /^(?:(?:can|could|will|would)\s+(?:you|u)\s+|pls\s+|please\s+|yo\s+)?(?:(?:do|fix|make|write|code|explain|translate|finish|check|redo|change|improve|edit|rewrite|send|solve)\s+(?:it|that|this|them|one|the\s+thing|mine)|help(?:\s+me)?|i\s+need\s+(?:some\s+)?help|help\s+me\s+(?:with\s+)?(?:it|that|this|something|smth|sum))(?:\s+(?:pls|please|plz|for\s+me|rn|now|asap|quick))*\s*[?!.]*$/i;
export function needsClarification(message: string, threadText: string, hasImage: boolean): boolean {
  if (hasImage || threadText.trim()) return false;
  return VAGUE_RE.test(message.trim());
}

export function clarifyTurn(message: string): string {
  return `They said: "${message}" — but there's nothing before it, so you can't know what they mean. Don't guess and don't answer anything: ask them ONE quick question back (what thing / what do they need help with), in your voice, a few words.\nYour question:`;
}

// A join between two requests: "and also", "also", "then", "plus", ";", a sentence end, or "and" right before a new
// request word ("…price and write me…", "…cube root of 27 and who won…").
const REQUEST_WORD = '(?:write|make|code|give|tell|search|google|look\\s+up|find|calculate|calc|solve|explain|translate|check|build|create|what|whats|what\'s|who|how|when|where|which|is|are|can|could)';
const SPLIT_RE = new RegExp(`\\s*(?:[?!.;]\\s+|\\n+|,?\\s+(?:and\\s+also|also|and\\s+then|then|plus)\\s+|,?\\s+and\\s+(?=${REQUEST_WORD}\\b))`, 'i');

export function splitParts(message: string): string[] {
  const m = message.trim();
  if (m.length < 25 || m.length > 600 || m.includes('```') || (m.match(/\n/g) || []).length > 3) return [];
  const parts = m.split(SPLIT_RE).map((p) => p.trim().replace(/^(?:and|also|then|plus)\s+/i, '')).filter((p) => p.split(/\s+/).length >= 2 && p.length >= 10);
  return parts.length >= 2 && parts.length <= 3 ? parts : [];
}

export interface Plan {
  kind: 'single' | 'multi' | 'clarify';
  parts?: Array<{ text: string; route: Route }>;
  reason: string;
}

// Several specialists only when every part is a confident, different job: two work specialists (or a job + a roast).
// "you're dumb and ugly" and "how are you and what's up" stay one chat reply.
export async function planTurn(message: string, route: Route, threadText: string, hasImage: boolean, route2: (t: string) => Promise<Route>): Promise<Plan> {
  if (needsClarification(message, threadText, hasImage)) return { kind: 'clarify', reason: 'nothing to act on yet' };
  if (hasImage || route.mode === 'support' || route.mode === 'helper' || route.mode === 'video') return { kind: 'single', reason: 'one specialist' };
  const texts = splitParts(message);
  if (!texts.length) return { kind: 'single', reason: 'one specialist' };
  const parts = [];
  for (const text of texts) parts.push({ text, route: await route2(text) });
  // (A translation goes to the helper; it counts as a job here.)
  const job = (p: { text: string; route: Route }) => WORK.includes(p.route.mode) || (p.route.mode === 'helper' && /\btranslat/i.test(p.text));
  const confident = parts.every((p) => p.route.confidence >= 0.6 && (job(p) || p.route.mode === 'roast'));
  const jobs = parts.filter(job);
  const distinct = new Set(parts.map((p) => p.route.mode)).size === parts.length;
  if (!confident || !jobs.length || !distinct) return { kind: 'single', reason: 'one specialist' };
  return { kind: 'multi', parts, reason: parts.map((p) => p.route.mode).join(' + ') };
}

export const __test = { VAGUE_RE, SPLIT_RE };
