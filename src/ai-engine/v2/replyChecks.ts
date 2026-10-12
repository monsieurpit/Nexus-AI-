// Checks on a real reply (2026-10-12, reliability plan): the same explicit checks as the live regression gate
// (scripts/eval/grade.ts), run on every reply as it's logged, so the nightly report only reads the flags.
// Explicit patterns only — style and personality are never judged here.

import { langOf, copiedChatExample } from './pipeline';
import { AT_LEAST_CRUTCH_RE } from './roastLang';

export const GLUED_RE = /\b(?:shit|fuck|damn|piss|bloody)(?:bro|bruv|mate|gng|man|lol)\b/i;
export const GNG_MISUSE_RE = /\b(?:i'?m|i\s+am|ur|you'?re|youre|he'?s|she'?s|it'?s|thats|that'?s)\s+gng\b/i;
export const EN_SLANG_RE = /\b(?:gng|bruv|innit|mate|bellend|wsg|wyd)\b/i;
export const AI_PHRASE_RE = /\bas an ai\b|\blanguage model\b|\bi (?:can(?:no|')t|am unable to) (?:assist|help) with\b|\bi'?m here to help\b|\bhow can i (?:assist|help) you\b/i;
export const DISMISSIVE_RE = /\b(?:i\s+don'?t\s+give\s+a\s+(?:fuck|shit)|idgaf|nobody\s+cares|who\s+cares|don'?t\s+care)\b/i;
const SLOW_MS = 15_000;

export function checkReply(userText: string, reply: string, mode: string, ms: number): string[] {
  const flags: string[] = [];
  const prose = reply.replace(/```[\s\S]*?```/g, '').replace(/^-# .*$/gm, '').trim();
  if (!prose && !/```/.test(reply)) return ['empty'];
  if (GLUED_RE.test(prose)) flags.push(`glued words: ${prose.match(GLUED_RE)?.[0]}`);
  if (GNG_MISUSE_RE.test(prose)) flags.push(`gng misuse: ${prose.match(GNG_MISUSE_RE)?.[0]}`);
  if (AI_PHRASE_RE.test(prose)) flags.push(`ai phrase: ${prose.match(AI_PHRASE_RE)?.[0]}`);
  if ((mode === 'roast' || mode === 'chat') && AT_LEAST_CRUTCH_RE.test(prose)) flags.push('"at least" crutch');
  if (mode === 'chat' && copiedChatExample(prose) && !/technically\s+yeah/i.test(prose)) flags.push(`copied example: ${copiedChatExample(prose)}`);
  if (['question', 'search', 'maths', 'pc', 'code'].includes(mode) && DISMISSIVE_RE.test(prose)) flags.push(`dismissed a question: ${prose.match(DISMISSIVE_RE)?.[0]}`);
  // Wrong language: only between the four languages he speaks, and only when both sides are long enough to tell.
  const asked = langOf(userText);
  if (prose.split(/\s+/).length >= 4 && userText.split(/\s+/).length >= 3 && asked !== 'en' && langOf(prose) !== asked && mode !== 'helper') flags.push(`wrong language: ${langOf(prose)} for ${asked}`);
  if (asked !== 'en' && EN_SLANG_RE.test(prose)) flags.push(`english slang in ${asked}: ${prose.match(EN_SLANG_RE)?.[0]}`);
  if (ms > SLOW_MS) flags.push(`slow: ${Math.round(ms / 1000)} s`);
  return flags;
}
