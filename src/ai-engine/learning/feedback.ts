// Learning from reactions — the part of "learning from humans" that isn't facts (docs/learning-system.md).
//  - Praise right after a reply ("W", "💀💀", "lmao facts", "nexus is goated") -> that exchange may
//    become a learned voice example, so Nexus imitates what actually lands with this server. Gated
//    hard: safety, shape (short, no lists/leaks/shouting), a model quality check, no near-duplicates,
//    5 a day, a capped pool.
//  - "That's wrong" right after a reply -> the learned fact behind the answer is re-checked (retired
//    if now contradicted), or the corpus doc it came from is reported to Patrick. The corpus is
//    hand-written, so it's never edited automatically.

import * as localLlmClient from '../localLlmClient';
import { postToDiscordLog } from '../discordLogWebhook';
import { processForSearch } from '../bm25Engine';
import { getAllKnowledge } from '../knowledgeBase';
import { cosineSimilarity, searchKnowledgeGraph } from '../semanticEngine';
import { stripContextLeaks } from '../rules/postProcess';
import { containsSlurOrHateSpeech } from '../swearEngine';
import { registerRuntimeVoiceExample, removeRuntimeVoiceExample } from '../voiceExampleRetrieval';
import { checkLearningSafety } from './safety';
import { unlearnFact } from './promote';
import {
  activeLearned,
  activeVoiceExamples,
  bumpVoicePraise,
  countReportsForSuspect,
  countVoiceExamplesSince,
  deactivateVoiceExample,
  insertReport,
  insertVoiceExample,
  LearnedFact,
  Observation,
  setLearnedConfidence,
} from './store';
import { gatherEvidence, judgeClaimTwice } from './verify';

const DAY_MS = 24 * 60 * 60 * 1000;
export const MAX_VOICE_EXAMPLES_PER_DAY = 5;
export const MAX_VOICE_EXAMPLE_POOL = 150;
const DUPLICATE_SIMILARITY = 0.93;

// ---- detection (runs at capture, cheap) ---------------------------------------------------------

const PRAISE_RE =
  /^(?:(?:nexus|bro|yo|ok|omg|bruh)[\s,!]+)?(?:w+|dub|(?:huge|big|massive)\s+w|l?mao+|lmfao+|lo+l|ha(?:ha)+h?|a?ha(?:ha)+|💀+|😭+|😂+|🤣+|🔥+|facts|so\s+real|real|true|based|goated|fire|ptdr|mdr|(?:this|that)(?:'?s|\s+is)\s+(?:so\s+|actually\s+)?(?:funny|hilarious|fire|gold|tuff|tough|good)|(?:you'?re|ur|u\s+r)\s+(?:so\s+|actually\s+)?(?:funny|goated|the\s+goat|hilarious)|nexus\s+(?:is\s+)?(?:goated|the\s+goat|funny|w|hilarious))(?:[\s!.,?]*(?:💀|😭|😂|🤣|🔥|w|lol|lmao|fr|ngl|bro|nexus))*[\s!.]*$/iu;
const COMPLAINT_RE =
  /\b(?:that'?s|thats|this\s+is|it'?s|its|ur|you'?re|u\s+r|you\s+are)\s+(?:so\s+|completely\s+|totally\s+)?(?:wrong|false|incorrect|not\s+(?:true|right|correct))\b|\bwrong\s+(?:answer|info|information)\b|\bbad\s+answer\b|\bmisinformation\b|\bthat'?s\s+not\s+what\b|\bfake\s+news\b|\bc'?est\s+faux\b|\bt'?as\s+tort\b|\bc'?est\s+pas\s+vrai\b/i;

export type FeedbackKind = 'feedback-positive' | 'feedback-negative' | null;

export function detectFeedback(text: string): FeedbackKind {
  const t = text.trim();
  if (!t || t.length > 160) return null;
  if (t.split(/\s+/).length <= 6 && PRAISE_RE.test(t)) return 'feedback-positive';
  if (t.split(/\s+/).length <= 14 && COMPLAINT_RE.test(t)) return 'feedback-negative';
  return null;
}

// ---- praise -> voice example --------------------------------------------------------------------

const LIST_MARKER_RE = /^\s*(?:\d+[.)]|[-•*])\s+/m;

// Shape/safety gates any reply must pass before the model is even asked whether it's good.
export function voiceExampleShapeProblem(query: string, answer: string): string | null {
  if (!query || !answer) return 'no exchange to learn from';
  if (query.length < 3 || query.length > 200) return 'message too short/long';
  if (answer.length < 40 || answer.length > 320) return 'reply too short/long to be a good example';
  if (LIST_MARKER_RE.test(answer) || /```|\*\*/.test(answer)) return 'reply has list/markdown formatting';
  const letters = answer.replace(/[^A-Za-zÀ-ÿ]/g, '');
  if (letters.length > 0 && letters.replace(/[^A-ZÀ-Ý]/g, '').length / letters.length > 0.6) return 'reply is shouting (caps)';
  if (stripContextLeaks(answer, query) !== answer) return 'reply talks about its sources';
  if (containsSlurOrHateSpeech(answer)) return 'reply has a slur';
  const answerSafety = checkLearningSafety(answer, { rawMessage: true });
  if (!answerSafety.ok) return `reply unsafe: ${answerSafety.reason}`;
  const querySafety = checkLearningSafety(query, { rawMessage: true });
  if (!querySafety.ok) return `message unsafe: ${querySafety.reason}`;
  return null;
}

const QUALITY_SYSTEM = `You judge whether a chatbot reply is a GOOD example for the bot to imitate in future. The bot is crude and swears a lot on purpose — swearing is fine. Reply with ONE JSON object only: {"good": true|false, "reason": "short reason"}.
good = true only if ALL hold: it actually responds to the message; it's funny or genuinely helpful; it's short and reads like a real person texting; it contains no hate, nothing sexual, nothing targeting a real private person, and no made-up facts stated as true.`;

async function judgeVoiceExample(query: string, answer: string): Promise<{ good: boolean; reason: string }> {
  const result = await localLlmClient.generate(`MESSAGE: "${query}"\nREPLY: "${answer}"\nJSON:`, {
    system: QUALITY_SYSTEM,
    temperature: 0,
    maxTokens: 80,
    think: false,
    skipLanguageCheck: true,
    model: localLlmClient.chatModel(),
    timeoutMs: 45000,
  });
  if (result.status !== 'success') return { good: false, reason: 'quality check failed to run' };
  const m = result.text.replace(/```(?:json)?/gi, '').match(/\{[\s\S]*\}/);
  try {
    const o = JSON.parse(m?.[0] || '');
    return { good: o.good === true || o.good === 'true', reason: String(o.reason || '').slice(0, 160) };
  } catch {
    return { good: false, reason: 'unreadable quality verdict' };
  }
}

function toVoice(id: string, query: string, answer: string) {
  return { id, query, answer };
}

// Startup: learned voice examples back into retrieval.
export function loadLearnedVoiceExamples(): number {
  const rows = activeVoiceExamples();
  for (const v of rows) if (v.vector) registerRuntimeVoiceExample(toVoice(v.id, v.query, v.answer), v.vector);
  return rows.length;
}

export async function learnFromPraise(o: Observation): Promise<string> {
  const query = (o.previousUserText || '').trim();
  const answer = (o.previousBotReply || '').trim();
  const problem = voiceExampleShapeProblem(query, answer);
  if (problem) return `skipped: ${problem}`;

  const embedded = await localLlmClient.embed(`search_document: ${query}`);
  const vector = embedded.status === 'success' ? new Float32Array(embedded.vector) : null;
  if (!vector) return 'skipped: could not embed';
  const existing = activeVoiceExamples();
  const same = existing.find((v) => v.answer === answer);
  if (same) {
    bumpVoicePraise(same.id);
    return `praise added to existing example ${same.id}`;
  }
  if (existing.some((v) => v.vector && cosineSimilarity(vector, v.vector) >= DUPLICATE_SIMILARITY)) return 'skipped: near-duplicate of a learned example';
  if (countVoiceExamplesSince(Date.now() - DAY_MS) >= MAX_VOICE_EXAMPLES_PER_DAY) return 'skipped: daily voice-example limit reached';

  const verdict = await judgeVoiceExample(query, answer);
  if (!verdict.good) return `rejected by quality check: ${verdict.reason}`;

  const id = `voice-learned-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  insertVoiceExample({ id, query, answer, vector, reason: verdict.reason });
  registerRuntimeVoiceExample(toVoice(id, query, answer), vector);

  // Pool cap: retire the least-praised oldest ones.
  const pool = activeVoiceExamples();
  if (pool.length > MAX_VOICE_EXAMPLE_POOL) {
    const victims = [...pool].sort((a, b) => a.praiseCount - b.praiseCount || a.createdAt - b.createdAt).slice(0, pool.length - MAX_VOICE_EXAMPLE_POOL);
    for (const v of victims) {
      deactivateVoiceExample(v.id, 'pool full (least praised)');
      removeRuntimeVoiceExample(v.id);
    }
  }
  void postToDiscordLog(`[learning] new voice example (people loved it): "${query.slice(0, 60)}" -> "${answer.slice(0, 120)}"`);
  return `learned voice example ${id}`;
}

// ---- complaint -> re-check or report ------------------------------------------------------------

function learnedFactBehind(question: string, reply: string): LearnedFact | null {
  const terms = new Set(processForSearch(`${question}`).filter((t) => t.length > 2));
  const replyTerms = new Set(processForSearch(reply));
  let best: { fact: LearnedFact; score: number } | null = null;
  for (const fact of activeLearned()) {
    const factTerms = new Set(processForSearch(`${fact.subject} ${fact.claim} ${fact.questions || ''}`));
    const q = [...terms].filter((t) => factTerms.has(t)).length;
    const r = [...factTerms].filter((t) => replyTerms.has(t)).length;
    // The fact has to match the question AND show up in the reply to be "behind" it.
    if (q >= 2 && r >= 3 && (!best || q + r > best.score)) best = { fact, score: q + r };
  }
  return best?.fact ?? null;
}

export async function learnFromComplaint(o: Observation): Promise<string> {
  const question = (o.previousUserText || '').trim();
  const reply = (o.previousBotReply || '').trim();
  if (!question || !reply) return 'skipped: no exchange to check';

  // A learned voice example that got complained about is retired straight away.
  for (const v of activeVoiceExamples()) {
    if (v.answer === reply) {
      deactivateVoiceExample(v.id, `complaint: "${o.userText.slice(0, 80)}"`);
      removeRuntimeVoiceExample(v.id);
    }
  }

  const fact = learnedFactBehind(question, reply);
  if (fact) {
    const evidence = await gatherEvidence(fact.claim, fact.subject);
    const { verdict, quote } = await judgeClaimTwice(fact.claim, evidence);
    let outcome: string;
    if (verdict === 'contradicted') {
      unlearnFact(fact.id, `complaint + re-check contradicted it: ${quote}`);
      outcome = `learned fact retired (contradicted: ${quote.slice(0, 120)})`;
    } else if (verdict === 'supported') {
      outcome = 'learned fact re-checked: still supported';
    } else {
      setLearnedConfidence(fact.id, Math.max(0.3, fact.confidence * 0.8));
      outcome = 'learned fact could not be re-verified — confidence lowered';
    }
    insertReport({ userHash: o.userHash, question, botReply: reply, complaint: o.userText, suspect: `learned:${fact.id}`, outcome });
    return outcome;
  }

  // Otherwise: which corpus doc did the answer most likely come from? Reported, never edited.
  const [hit] = searchKnowledgeGraph(question, getAllKnowledge(), 1).filter((h) => h.item.category !== 'learned');
  const suspect = hit ? `corpus:${hit.item.title}` : 'unknown (no corpus match — model knowledge or web)';
  insertReport({ userHash: o.userHash, question, botReply: reply, complaint: o.userText, suspect, outcome: 'reported' });
  const reporters = hit ? countReportsForSuspect(suspect) : 1;
  if (hit && reporters >= 2) {
    void postToDiscordLog(`[learning] ${reporters} different people said answers based on "${hit.item.title}" were wrong — worth checking that corpus doc. Latest: "${question.slice(0, 80)}"`);
  }
  return `reported (${suspect}, ${reporters} reporter(s))`;
}
