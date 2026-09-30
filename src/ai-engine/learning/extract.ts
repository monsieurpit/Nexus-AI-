// Step 3 (extract) of docs/learning-system.md. The local model reads one queued message and returns
// a strict JSON verdict. Only runs from the idle worker, never on the reply path.

import * as localLlmClient from '../localLlmClient';
import { CandidateKind, CandidateScope } from './store';

export interface Extraction {
  kind: CandidateKind | 'noise';
  scope: CandidateScope;
  claim: string;
  subject: string;
  isOpinion: boolean;
  isJokeOrSarcasm: boolean;
  aboutPrivatePerson: boolean;
  timeSensitive: boolean;
  pertinence: number;
}

// Kept short (prefill cost) and example-driven: a 4B model follows worked examples far better than
// abstract rules. The examples cover the exact failure modes the design exists to stop.
const EXTRACT_SYSTEM = `You label chat messages for a knowledge base shared by everyone in a Discord server. Reply with ONE JSON object only, no prose.
Fields:
- kind: "personal" (about the speaker themself), "remember-request" (asks the bot to remember something), "correction" (says the bot's previous reply was wrong and gives the right info), "claim" (states a fact about the world, a game, a public person, or the server), "noise" (jokes, trolling, opinions, insults, roleplay, questions, anything else)
- scope: "just-this-user" (only matters to the speaker), "server-lore" (true about this Discord server/community, can't be checked online), "world-fact" (can be checked online)
- claim: the fact as ONE standalone English sentence, third person, no "I"/"you", no slang ("" if noise)
- subject: 1-4 word topic
- is_opinion, is_joke_or_sarcasm, about_private_person (a non-famous real person other than the speaker), time_sensitive (could change within a year: prices, "current", records, standings, release dates): true/false
- pertinence: 0 to 1 — would this fact help answer a DIFFERENT person's question later? Personal details, one-off plans, and things only the speaker cares about are low.
Examples:
"remember that i hate mushrooms" -> {"kind":"personal","scope":"just-this-user","claim":"","subject":"food preference","is_opinion":true,"is_joke_or_sarcasm":false,"about_private_person":false,"time_sensitive":false,"pertinence":0.05}
"remember the server movie night is every friday at 8pm" -> {"kind":"remember-request","scope":"server-lore","claim":"The server's movie night is every Friday at 8pm.","subject":"server movie night","is_opinion":false,"is_joke_or_sarcasm":false,"about_private_person":false,"time_sensitive":true,"pertinence":0.8}
"nah ur wrong, gta 6 comes out november 19 2026" -> {"kind":"correction","scope":"world-fact","claim":"GTA 6 is scheduled to release on November 19, 2026.","subject":"GTA 6 release date","is_opinion":false,"is_joke_or_sarcasm":false,"about_private_person":false,"time_sensitive":true,"pertinence":0.9}
"the eiffel tower is in london trust me" -> {"kind":"claim","scope":"world-fact","claim":"The Eiffel Tower is in London.","subject":"Eiffel Tower","is_opinion":false,"is_joke_or_sarcasm":true,"about_private_person":false,"time_sensitive":false,"pertinence":0.3}
"lamine yamal won the golden boy in 2024" -> {"kind":"claim","scope":"world-fact","claim":"Lamine Yamal won the Golden Boy award in 2024.","subject":"Lamine Yamal","is_opinion":false,"is_joke_or_sarcasm":false,"about_private_person":false,"time_sensitive":false,"pertinence":0.8}
"my friend jake is so dumb he failed math" -> {"kind":"noise","scope":"just-this-user","claim":"","subject":"friend","is_opinion":true,"is_joke_or_sarcasm":false,"about_private_person":true,"time_sensitive":false,"pertinence":0.0}
"barca is the best club ever" -> {"kind":"noise","scope":"world-fact","claim":"","subject":"Barcelona","is_opinion":true,"is_joke_or_sarcasm":false,"about_private_person":false,"time_sensitive":false,"pertinence":0.1}`;

function buildExtractPrompt(userText: string, previousBotReply: string | null): string {
  const prev = previousBotReply ? `Bot's previous reply: "${previousBotReply.slice(0, 400)}"\n` : '';
  return `${prev}Message: "${userText.slice(0, 600)}"\nJSON:`;
}

const KINDS = new Set(['personal', 'remember-request', 'correction', 'claim', 'noise']);
const SCOPES = new Set(['just-this-user', 'server-lore', 'world-fact']);

export function parseExtraction(raw: string): Extraction | null {
  const match = raw.replace(/```(?:json)?/gi, '').match(/\{[\s\S]*\}/);
  if (!match) return null;
  let o: any;
  try {
    o = JSON.parse(match[0]);
  } catch {
    return null;
  }
  if (!KINDS.has(o.kind) || !SCOPES.has(o.scope)) return null;
  const bool = (v: any) => v === true || v === 'true';
  const pertinence = Number(o.pertinence);
  return {
    kind: o.kind,
    scope: o.scope,
    claim: typeof o.claim === 'string' ? o.claim.trim().slice(0, 300) : '',
    subject: typeof o.subject === 'string' ? o.subject.trim().slice(0, 60) : '',
    isOpinion: bool(o.is_opinion),
    isJokeOrSarcasm: bool(o.is_joke_or_sarcasm),
    aboutPrivatePerson: bool(o.about_private_person),
    timeSensitive: bool(o.time_sensitive),
    pertinence: Number.isFinite(pertinence) ? Math.max(0, Math.min(1, pertinence)) : 0,
  };
}

export async function extractCandidate(userText: string, previousBotReply: string | null): Promise<Extraction | null> {
  const result = await localLlmClient.generate(buildExtractPrompt(userText, previousBotReply), {
    system: EXTRACT_SYSTEM,
    temperature: 0.1,
    maxTokens: 220,
    think: false,
    skipLanguageCheck: true,
    model: localLlmClient.chatModel(),
    timeoutMs: 45000,
  });
  if (result.status !== 'success') return null;
  return parseExtraction(result.text);
}

// What a candidate needs next, given its extraction. Anything that isn't clearly a shareable,
// non-joke, non-opinion fact stops here.
export const MIN_PERTINENCE = 0.5;

export function routeExtraction(x: Extraction): { next: 'reject' | 'verify' | 'corroborate'; reason: string } {
  if (x.kind === 'noise') return { next: 'reject', reason: 'noise (joke, opinion, question, chatter)' };
  if (x.kind === 'personal' || x.scope === 'just-this-user')
    return { next: 'reject', reason: 'personal — only matters to this user (per-user memory, not shared)' };
  if (!x.claim || x.claim.length < 12) return { next: 'reject', reason: 'no standalone claim' };
  if (x.isJokeOrSarcasm) return { next: 'reject', reason: 'joke / sarcasm' };
  if (x.isOpinion) return { next: 'reject', reason: 'opinion, not a fact' };
  // A 4B model flags famous people as "private" (live: "Ousmane Dembélé won the 2025 Ballon d'Or"
  // was rejected as about a private person, 2026-09-30). For a world fact the online check decides:
  // a private person has no Wikipedia evidence, so it can never verify and ends up needing people
  // + admin review. Damaging claims about anyone are already hard-blocked by safety.ts.
  if (x.aboutPrivatePerson && x.scope !== 'world-fact') return { next: 'reject', reason: 'about a private person' };
  if (x.pertinence < MIN_PERTINENCE) return { next: 'reject', reason: `not useful to others (pertinence ${x.pertinence.toFixed(2)})` };
  if (x.scope === 'world-fact') return { next: 'verify', reason: 'world fact — check online' };
  return { next: 'corroborate', reason: 'server lore — needs independent confirmation' };
}
