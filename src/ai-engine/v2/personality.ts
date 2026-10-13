// Personality settings and per-person mood (2026-10-13, Patrick: "a personality engine independent of the model —
// configurable dimensions, his mood influences the response while his core personality stays recognizable; the mood
// system doesn't really affect his answers").
//
// Piece 1: the numbers only.
//   Base settings (0-10)  ~/.nexus-personality.json, changed without touching the model.
//   Per-person mood       how this person treated him in the last ~30 min (the global mood in rules/mood.ts is shared by
//                         everyone, so one person's insults used to change how he talks to the next person).
//   Effective settings    base + global mood + this person's mood, clamped.

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { getMoodVector, getMoodLabel } from '../rules/mood';

export const DIALS = ['energy', 'sarcasm', 'verbosity', 'formality', 'warmth', 'bite'] as const;
export type Dial = (typeof DIALS)[number];
export type Dials = Record<Dial, number>;

export const DEFAULT_DIALS: Dials = { energy: 8, sarcasm: 7, verbosity: 3, formality: 1, warmth: 5, bite: 6 };
const FILE = process.env.NEXUS_PERSONALITY_FILE || join(homedir(), '.nexus-personality.json');
const clamp = (n: number) => Math.max(0, Math.min(10, Math.round(n)));

let cache: { dials: Dials; at: number } | null = null;
export function baseDials(): Dials {
  if (cache && Date.now() - cache.at < 10_000) return cache.dials;
  let dials = { ...DEFAULT_DIALS };
  try {
    if (existsSync(FILE)) dials = { ...dials, ...JSON.parse(readFileSync(FILE, 'utf8')) };
  } catch {
    // unreadable file: defaults
  }
  for (const d of DIALS) dials[d] = clamp(Number(dials[d]));
  cache = { dials, at: Date.now() };
  return dials;
}

export function setDials(changes: Partial<Record<string, number>>): Dials {
  const next = { ...baseDials() };
  for (const [k, v] of Object.entries(changes)) if ((DIALS as readonly string[]).includes(k) && Number.isFinite(Number(v))) next[k as Dial] = clamp(Number(v));
  writeFileSync(FILE, `${JSON.stringify(next, null, 2)}\n`);
  cache = { dials: next, at: Date.now() };
  return next;
}

interface PersonMood { valence: number; arousal: number; at: number; reason: string }
const people = new Map<string, PersonMood>();
const HALF_LIFE_MS = 30 * 60_000;

function decayed(p: PersonMood): PersonMood {
  const f = Math.pow(0.5, (Date.now() - p.at) / HALF_LIFE_MS);
  return { ...p, valence: p.valence * f, arousal: p.arousal * f, at: Date.now() };
}

export function recordInteraction(person: string, signal: { negative?: boolean; positive?: boolean; lowEffort?: boolean }): void {
  if (!person) return;
  const p = decayed(people.get(person) || { valence: 0, arousal: 0, at: Date.now(), reason: '' });
  if (signal.negative) {
    p.valence = Math.max(-1, p.valence - 0.35);
    p.arousal = Math.min(1, p.arousal + 0.2);
    p.reason = 'they were rude to you';
  } else if (signal.positive) {
    p.valence = Math.min(1, p.valence + 0.3);
    p.reason = 'they were nice to you';
  } else if (signal.lowEffort) {
    p.arousal = Math.max(-1, p.arousal - 0.15);
    p.reason = 'they keep sending low-effort messages';
  }
  people.set(person, p);
  if (people.size > 5000) people.delete(people.keys().next().value!);
}

export function personMood(person: string): PersonMood | null {
  const p = people.get(person);
  return p ? decayed(p) : null;
}

export interface PersonalityState { dials: Dials; moodName: string; reasons: string[] }

export function effectiveDials(person?: string): PersonalityState {
  const d = { ...baseDials() };
  const g = getMoodVector();
  const label = getMoodLabel();
  const reasons: string[] = [];
  d.energy += g.arousal * 2;
  d.warmth += g.valence * 2;
  if (label !== 'neutral') reasons.push(`server mood: ${label.replace('_', ' ')}`);
  const p = person ? personMood(person) : null;
  if (p && (Math.abs(p.valence) > 0.15 || Math.abs(p.arousal) > 0.15)) {
    d.warmth += p.valence * 4;
    d.bite -= p.valence * 3;
    d.energy += p.arousal * 3;
    if (p.reason) reasons.push(p.reason);
  }
  for (const k of DIALS) d[k] = clamp(d[k]);
  const moodName = p && p.valence < -0.4 ? 'annoyed with this person' : p && p.valence > 0.4 ? 'fond of this person' : label.replace('_', ' ');
  return { dials: d, moodName, reasons };
}

// Piece 2: what a reply gets — one short line right before their message (where the model follows it), and a length cap.
export function toneLine(state: PersonalityState): string {
  const d = state.dials;
  const words = d.verbosity <= 2 ? '1-6 words' : d.verbosity <= 4 ? '3-12 words' : d.verbosity <= 7 ? 'one or two sentences' : 'a few sentences';
  const mood = state.reasons.length ? `${state.moodName} — ${state.reasons.join('; ')}` : state.moodName;
  const feel = d.warmth >= 7 ? ' Be warm and friendly with them (still your usual self).' : d.warmth <= 3 ? " You're short and cold with them right now." : '';
  return `YOUR TONE RIGHT NOW (mood: ${mood}; let it show from the first word):${feel} energy ${d.energy}/10, warmth ${d.warmth}/10, bite ${d.bite}/10, sarcasm ${d.sarcasm}/10, formality ${d.formality}/10. Length: about ${words}.`;
}

export function chatTokenCap(state: PersonalityState): number {
  const v = state.dials.verbosity;
  return v <= 2 ? 50 : v <= 4 ? 90 : v <= 7 ? 160 : 260;
}
