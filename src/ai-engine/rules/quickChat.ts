// Preset one-line answers for the most common tiny chat messages aimed at Nexus ("nexus", "wyd",
// "hru", "thanks", "i'm good, thanks for asking"). A 4B model asked "wyd" at temperature 1 sometimes
// writes nonsense ("this is gonna be fucking epic!" — what is?) or repeats the same line; these sound
// like a real friend, make sense every time, and never repeat one of the last few answers.

import { isStatusReply } from './postProcess';

type Kind = 'wyd' | 'hru' | 'greeting' | 'thanks' | 'status' | 'areyou';

const POOLS: Record<Kind, string[]> = {
  wyd: [
    'nm, u?', 'just chilling rn, wyd?', 'nothing much bro, u?', 'bored as fuck ngl, u?', 'laying in bed lol, wbu?',
    'scrolling like an idiot, u?', 'eating rn, u?', 'literally nothing, wyd?', 'chilling, u?', 'just vibing rn, u?',
    'idk bro, nothing, u?', 'on my phone as usual lol, u?', 'gaming rn ngl, u?', 'doing nothing fr, wyd?',
    'waiting for something to happen lol, u?', 'nothing rn, u good?',
  ],
  hru: [
    "i'm good bro, u?", 'pretty good ngl, u?', 'chillin, hbu?', "all good fr, u?", 'not bad, wbu?',
    'good good, u?', 'tired as fuck lol, u?', "can't complain, u?", 'doing alright rn, u?', 'solid, wyd?',
    'good bro, u?', 'lowkey tired but good, u?', 'bored but good lol, u?', 'a little tired ngl, u?',
  ],
  greeting: [
    'yo', 'sup bro', 'wsg', 'yo wsg', 'ayy sup', 'yo wyd?', 'sup', 'wassup bro', 'yo bro', 'ayy',
    'yooo', 'what up', 'sup, wyd?', 'ay wsg bro',
  ],
  thanks: [
    'np', 'anytime bro', 'ayy no worries', 'bet', 'np bro', 'no problem fr', 'anytime', 'all good bro',
    'ofc bro', 'yep np', 'ayy anytime', 'got u',
  ],
  // "are you gaming / sleeping / home / awake...?" — generic yes/no lines that fit any of them.
  areyou: [
    'nah, u?', 'yeah lol, u?', 'yep, wyd?', 'nope, u?', 'lowkey yeah ngl', 'nah bro, wyd?', 'yeah why, wyd?',
    'kinda lol', 'not rn, u?', 'yeah fr, u?', 'nah just chilling', 'maybe lol, why?', 'yeah bro, u?', 'nah not really, u?',
    'ngl yeah', 'nope, wbu?',
  ],
  status: [
    'yeah bet, wyd?', 'ayy nice, wyd rn?', 'glad ur good bro, wyd?', 'nice, wyd?', 'ayy good, u doing anything?',
    'bet, wyd bro?', 'fr nice, what u up to?', 'good shit, wyd rn?', 'aight bet, wyd?', 'nice nice, wyd?',
  ],
};

const recent: Record<Kind, string[]> = { wyd: [], hru: [], greeting: [], thanks: [], status: [], areyou: [] };
const MEMORY = 6;

export function classifyQuickChat(text: string): Kind | null {
  const t = (text || '').trim().toLowerCase().replace(/[!?.,]+$/g, '');
  if (!t || t.split(/\s+/).length > 8) return null;
  // Strip the name / greetings so "nexus wyd", "yo nexus hru" and "wyd nexus" reduce to the question.
  const core = t
    .replace(/\b(?:nexus|bro|bruh|dude|man|fam)\b/g, ' ')
    .replace(/^(?:\s*(?:hey+|yo+|hi+|hello|ay+|ok(?:ay)?|lol)\b[\s,]*)+/g, ' ')
    .replace(/[,!?.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (core === '' || /^(?:sup|wsg|wassup|wazzup|what'?s up|whats up|hey+|yo+|hi+|hello|ay+)$/.test(core)) return 'greeting';
  if (/^(?:wyd|what (?:are )?(?:you|u) (?:doing|up to)|what u doing|what you doing|wyd rn|wyd now|what are you up to rn)$/.test(core)) return 'wyd';
  if (/^(?:hru|how are (?:you|u)|how r u|how (?:you|u) doing|how'?s it going|hows it going|how have you been|(?:you|u) good|(?:you|u) ok|(?:you|u) alright)$/.test(core)) return 'hru';
  if (/^(?:thanks|thank you|thx|ty|thanks a lot|thank you so much|thanks so much|appreciate it|ty bro|tysm)$/.test(core)) return 'thanks';
  if (/^(?:are|r) (?:you|u) (?:gaming|playing|sleeping|sleepy|eating|home|awake|busy|bored|there|here|online|alive|tired|working|watching|hungry|mad|sad|ok|okay|up|live|streaming|coding|studying|chilling|ready|at home|in bed|on discord|on your phone)$/.test(core)) return 'areyou';
  if (isStatusReply(text)) return 'status';
  return null;
}

export function quickChatReply(text: string): string | null {
  const kind = classifyQuickChat(text);
  if (!kind) return null;
  const pool = POOLS[kind];
  const fresh = pool.filter((p) => !recent[kind].includes(p));
  const pick = (fresh.length ? fresh : pool)[Math.floor(Math.random() * (fresh.length ? fresh.length : pool.length))];
  recent[kind] = [...recent[kind], pick].slice(-MEMORY);
  return pick;
}

export function __resetQuickChatForTests(): void {
  for (const k of Object.keys(recent) as Kind[]) recent[k] = [];
}
