// Stable opinions (2026-10-13, Patrick + ChatGPT: "stable preferences, opinions and habits" — he could say yes to pineapple
// on pizza for one person and no for the next). The first time someone asks his take on something, the reply is kept;
// every later time (anyone, any channel) he's told what he said and keeps the SAME side, in fresh words.
//
//   store   ~/.nexus-memory/opinions.json — topic → his take (≤ 160 chars), when, how often it came up; max 2000
//   topics  from "do you like X", "what do you think of X", "thoughts on X", "is X good / mid / overrated", "X: W or L"
//   not     people he already knows (persona / server people), Barça / Madrid / Messi (persona), "me / my / this / that"

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

interface Take { take: string; at: number; times: number }
const FILE = process.env.NEXUS_OPINIONS_FILE || join(homedir(), '.nexus-memory', 'opinions.json');
let cache: Record<string, Take> | null = null;
let fileOverride: string | null = null;
const file = () => fileOverride || FILE;

function load(): Record<string, Take> {
  if (cache) return cache;
  try {
    cache = existsSync(file()) ? JSON.parse(readFileSync(file(), 'utf8')) : {};
  } catch {
    cache = {};
  }
  return cache!;
}
function save(all: Record<string, Take>): void {
  try {
    const dir = join(file(), '..');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true, mode: 0o700 });
    writeFileSync(`${file()}.tmp`, JSON.stringify(all), { mode: 0o600 });
    renameSync(`${file()}.tmp`, file());
  } catch {
    // an opinion that isn't saved just gets formed again next time
  }
  cache = all;
}

const QUESTIONS: RegExp[] = [
  /\b(?:do|d)\s*(?:you|u|ya)\s+(?:like|love|hate|rate|fw|fuck\s+with|rock\s+with|enjoy|prefer|rate)\s+(.{2,40}?)\s*(?:\?|$|\s+(?:or\s+not|tho|tbh|fr|rn|nexus|bro|mate))/i,
  /\bwhat\s+(?:do|d)\s*(?:you|u|ya)\s+think\s+(?:of|about)\s+(.{2,40}?)\s*(?:\?|$)/i,
  /\b(?:thoughts|opinion|ur\s+take|your\s+take|hot\s+take|ur\s+opinion|your\s+opinion)\s+(?:on|about)\s+(.{2,40}?)\s*(?:\?|$)/i,
  /\bhow\s+do\s+(?:you|u)\s+feel\s+about\s+(.{2,40}?)\s*(?:\?|$)/i,
  /^(?:is|are)\s+(.{2,30}?)\s+(?:good|bad|overrated|underrated|mid|trash|fire|goated|worth\s+it|cringe|cool|peak|washed|better|the\s+best|the\s+worst)\b/i,
  /^(.{2,30}?)[:,]?\s+(?:w\s+or\s+l|yay\s+or\s+nay|hot\s+or\s+not|good\s+or\s+bad)\s*\??$/i,
];
// Things whose take comes from his identity, or that aren't a topic.
const NOT_TOPIC_RE = /\b(?:me|my|myself|this|that|it|him|her|them|us|u|you|ur|your|yourself|nexus|xant|casseurt|patrick|josh|gabberuuhh?|stxcked|rikkie|richardboy16|jordan|julie|bar[cç]a|barcelona|real\s+madrid|real\s+vardrid|messi|ronaldo|olise|yamal|the\s+server|someone|anyone|people|everyone)\b|^\s*(?:a|an|the)?\s*$/i;

export function opinionTopic(message: string): string | null {
  const t = message.replace(/^\s*(?:(?:hey|yo|oi|ok)\s+)?nexus[\s,:]*/i, '').trim();
  for (const re of QUESTIONS) {
    const m = t.match(re);
    if (!m) continue;
    const topic = m[1].toLowerCase().replace(/[?!.,"'“”]+/g, ' ').replace(/^\s*(?:the|a|an|some)\s+/, '').replace(/^(?:playing|watching|eating|drinking|listening\s+to|going\s+to|doing)\s+/, '').replace(/^\s*(?:the|a|an)\s+/, '').replace(/\s+(?:at\s+all|much|a\s+lot|tho|tbh|fr|rn)\s*$/, '').replace(/\s+/g, ' ').trim();
    if (topic.length < 2 || topic.split(' ').length > 5 || NOT_TOPIC_RE.test(topic)) return null;
    return topic.replace(/s$/, '').replace(/(?<=\w)ies$/, 'y'); // "cats" ~ "cat"
  }
  return null;
}

export function opinionNote(message: string): string {
  const topic = opinionTopic(message);
  const prev = topic ? load()[topic] : undefined;
  return prev ? `YOUR TAKE ON THIS IS ALREADY KNOWN — you said about ${topic}: "${prev.take}". Keep the SAME opinion (same side, same verdict), in fresh words — never flip.\n` : '';
}

// After the reply: the first take on a topic is kept; a repeat just counts.
export function rememberOpinion(message: string, reply: string, now = Date.now()): boolean {
  const topic = opinionTopic(message);
  const take = reply.replace(/\s+/g, ' ').trim().slice(0, 160);
  if (!topic || take.length < 2 || /```/.test(reply)) return false;
  const all = load();
  if (all[topic]) {
    all[topic] = { ...all[topic], times: all[topic].times + 1 };
  } else {
    all[topic] = { take, at: now, times: 1 };
    const keys = Object.keys(all);
    if (keys.length > 2000) delete all[keys.sort((a, b) => all[a].at - all[b].at)[0]];
  }
  save(all);
  return true;
}

// Tests only: a throwaway file.
export function __useOpinionsFileForTest(path: string): void {
  fileOverride = path;
  cache = null;
}
