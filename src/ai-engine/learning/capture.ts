// Step 1 (capture) + step 2 (triage) of docs/learning-system.md. Runs after the reply has been sent,
// synchronously and cheaply (one SQLite insert); everything expensive happens later in the idle
// worker. Both the website and the Discord bot call /api/v1/nexus, so this one hook covers both.

import { detectUserInsult } from '../swearEngine';
import { checkLearningSafety } from './safety';
import { relevantSentences } from './verify';
import { detectFeedback } from './feedback';
import { evaluateRaidShieldRules } from '../rules/raidshield';
import { createHash } from 'crypto';

// ---- never learn from scams / anything RaidShield flags ------------------------------------------
// Patrick (2026-09-30): "make sure he doesn't learn from scams and raidshields". Three layers:
//  1. every message is run through the same RaidShield classifier before it's even stored;
//  2. messages the bot's moderation scan (POST /api/v1/raidshield) flags — text or image — are
//     remembered for a day, and anything already queued with the same text is dropped by the worker;
//  3. a message carrying a link is never a source of learned facts (facts don't come from links).
const flaggedTexts = new Map<string, number>();
const FLAG_TTL_MS = 24 * 60 * 60 * 1000;
const URL_RE = /\bhttps?:\/\/\S+|\b(?:www\.)\S+|\b[a-z0-9-]+\.(?:com|net|org|gg|io|xyz|ru|tk|ly|co|me|app|link|gift|site|online|store|shop)\b(?:\/\S*)?/i;

function textKey(text: string): string {
  return createHash('sha1').update(text.trim().toLowerCase().replace(/\s+/g, ' ')).digest('hex');
}

export function markFlaggedByRaidShield(text: string): void {
  if (!text?.trim()) return;
  flaggedTexts.set(textKey(text), Date.now());
  if (flaggedTexts.size > 5000) flaggedTexts.delete(flaggedTexts.keys().next().value!);
}

export function isFlaggedOrUnsafeForLearning(text: string): boolean {
  if (!text?.trim()) return false;
  const at = flaggedTexts.get(textKey(text));
  if (at && Date.now() - at < FLAG_TTL_MS) return true;
  if (URL_RE.test(text)) return true;
  return evaluateRaidShieldRules(text).classification !== 'safe';
}
import { countObservationsByUserSince, hashIdentity, insertObservation, isLearningEnabled, ObservationSource } from './store';

// One person spamming "facts" can't fill the idle worker's queue.
export const MAX_OBSERVATIONS_PER_USER_PER_DAY = 40;

export const ADMIN_DISCORD_ID = '1394001641899954368';

export interface ExchangeToCapture {
  userText: string;
  botReply: string;
  authorId?: string | null;
  // Website callers usually have no stable user id — the connection address stands in (hashed).
  fallbackIdentity?: string | null;
  channelId?: string | null;
  // The bot's previous turn, so "no that's wrong, it's X" can be read as a correction of it.
  previousBotReply?: string | null;
  // The message the bot was answering in previousBotReply — for reactions ("W", "that's wrong").
  previousUserText?: string | null;
  hasImage?: boolean;
}

const DISCORD_ID_RE = /^\d{17,20}$/;

export function sourceFor(authorId?: string | null): ObservationSource {
  if (authorId && DISCORD_ID_RE.test(authorId)) return 'discord';
  return 'website';
}

export function isAdminHash(userHash: string): boolean {
  return userHash === hashIdentity(`discord:${ADMIN_DISCORD_ID}`);
}

export function identityHash(authorId?: string | null, fallbackIdentity?: string | null): string {
  if (authorId) return hashIdentity(`${sourceFor(authorId)}:${authorId}`);
  return hashIdentity(`anon:${fallbackIdentity || 'unknown'}`);
}

// ---- triage: cheap rules that throw away what can never be a learnable fact ----------------------

const GREETING_OR_FILLER_RE =
  /^(?:yo+|hey+|hi+|hello|sup|wassup|wsg|gm|gn|lol|lmao|lmfao|xd|ok(?:ay)?|k+|bet|fr|ong|facts|true|same|nah|yeah|yes|no|ty|thx|thanks|bruh|bro|damn|w|l|💀|😭)[\s!?.]*$/i;
const INSULT_OR_COMMAND_TO_BOT_RE =
  /^(?:(?:go\s+)?(?:fuck|screw)\s+(?:yourself|urself|you|off|u)|shut\s+(?:up|the\s+fuck\s+up)|stfu|kys|suck\s+my|say\s+|repeat\s+|roast\s+|tell\s+me\s+a\s+joke|write\s+(?:me\s+)?a)\b/i;
// Questions ask for facts; they don't state them. "remember ..." and corrections are handled before
// this check. Tag questions ("..., right?") can still state something, so only a leading question
// word counts.
const QUESTION_RE =
  /^(?:what|whats|what's|who|whos|who's|when|where|why|how|hows|which|is|are|was|were|do|does|did|can|could|will|would|should|have|has|c'?est\s+quoi|qu'?est[- ]ce|qui|quand|o[uù]|pourquoi|comment|combien|quel(?:le)?s?|est[- ]ce\s+que|tu\s+(?:sais|connais))(?:\b|\s)/i;
const REMEMBER_RE = /\b(?:remember|don'?t\s+forget|keep\s+in\s+mind|note\s+that|souviens[- ]toi|rappelle[- ]toi|oublie\s+pas)\b/i;
const CORRECTION_RE =
  /^(?:no+|nah|nope|wrong|that'?s\s+(?:wrong|not\s+(?:true|right))|you'?re\s+wrong|actually|incorrect|false|non|faux|t'as\s+tort|c'est\s+faux)\b/i;
const ROLEPLAY_OR_HYPOTHETICAL_RE = /\b(?:pretend|imagine|what\s+if|hypothetically|roleplay|rp\b|let'?s\s+say|in\s+a\s+world\s+where)\b|^\*.*\*$/i;

export type TriageResult = 'skip' | 'remember-request' | 'possible-correction' | 'possible-fact';

export function triageMessage(text: string, previousBotReply?: string | null): TriageResult {
  const t = text.trim();
  if (t.length < 12 || t.length > 600) return 'skip';
  if (/```/.test(t)) return 'skip';
  if (GREETING_OR_FILLER_RE.test(t)) return 'skip';
  if (REMEMBER_RE.test(t)) return 'remember-request';
  if (previousBotReply && CORRECTION_RE.test(t) && t.split(/\s+/).length >= 4) return 'possible-correction';
  if (INSULT_OR_COMMAND_TO_BOT_RE.test(t) || detectUserInsult(t)) return 'skip';
  if (ROLEPLAY_OR_HYPOTHETICAL_RE.test(t)) return 'skip';
  if (QUESTION_RE.test(t) && !/\b(?:right|isn'?t\s+it|n'est-ce\s+pas)\s*\?\s*$/i.test(t)) return 'skip';
  if (t.split(/\s+/).length < 4) return 'skip';
  return 'possible-fact';
}

export function captureExchange(e: ExchangeToCapture): number | null {
  if (!isLearningEnabled()) return null;
  if (e.hasImage) return null;
  const userText = (e.userText || '').trim();
  if (!userText || !e.botReply) return null;
  if (isFlaggedOrUnsafeForLearning(userText)) return null;
  // Reactions to the previous reply are their own kind of teaching (learning/feedback.ts).
  // Praise/complaints about a reply to a flagged message don't count either.
  const feedback = e.previousBotReply && e.previousUserText && !isFlaggedOrUnsafeForLearning(e.previousUserText) ? detectFeedback(userText) : null;
  let feedbackId: number | null = null;
  if (feedback) {
    try {
      const userHash = identityHash(e.authorId, e.fallbackIdentity);
      if (countObservationsByUserSince(userHash, Date.now() - 24 * 60 * 60 * 1000) >= MAX_OBSERVATIONS_PER_USER_PER_DAY) return null;
      feedbackId = insertObservation({
        createdAt: Date.now(),
        source: sourceFor(e.authorId),
        userHash,
        channelHash: e.channelId ? hashIdentity(`channel:${e.channelId}`) : null,
        userText: userText.slice(0, 200),
        botReply: e.botReply.slice(0, 1500),
        previousBotReply: e.previousBotReply!.slice(0, 1500),
        previousUserText: e.previousUserText!.slice(0, 300),
        kind: feedback,
      });
    } catch (err) {
      console.warn('[learning] feedback capture failed:', err);
      return null;
    }
    // Praise is only praise. A complaint can ALSO carry the right answer ("that's wrong, spain won
    // it") — that part still goes through the normal correction path below.
    if (feedback === 'feedback-positive') return feedbackId;
  }
  if (triageMessage(userText, e.previousBotReply) === 'skip') return feedbackId;
  try {
    const userHash = identityHash(e.authorId, e.fallbackIdentity);
    if (countObservationsByUserSince(userHash, Date.now() - 24 * 60 * 60 * 1000) >= MAX_OBSERVATIONS_PER_USER_PER_DAY) return null;
    return insertObservation({
      createdAt: Date.now(),
      source: sourceFor(e.authorId),
      userHash,
      channelHash: e.channelId ? hashIdentity(`channel:${e.channelId}`) : null,
      userText: userText.slice(0, 600),
      botReply: e.botReply.slice(0, 1500),
      previousBotReply: e.previousBotReply ? e.previousBotReply.slice(0, 1500) : null,
    });
  } catch (err) {
    // Learning must never break a reply.
    console.warn('[learning] capture failed:', err);
    return null;
  }
}

// ---- learning from questions ---------------------------------------------------------------------
// Most of what people teach a chatbot is in what they ASK. A question Nexus answered from a web
// search is a fact someone cared about — verified again later and learned, so the next person gets
// it without a search. A question Nexus couldn't answer is a gap, researched later in idle time.


const DONT_KNOW_RE =
  /\b(?:(?:i\s+)?don'?t\s+(?:actually\s+)?(?:fucking\s+)?know|no\s+(?:fucking\s+)?idea|not\s+sure|can'?t\s+(?:find|tell\s+you)|jsais\s+pas|je\s+sais\s+pas|chu\s+pas\s+sûr|aucune\s+idée)\b/i;
const ASKS_A_FACT_RE =
  /\?\s*$|^(?:who|whos|who's|what|whats|what's|when|where|which|how\s+(?:many|much|old|long|tall|big)|is|are|was|were|did|does|tell\s+me\s+about|qui|quand|où|quel(?:le)?s?|combien|c'?est\s+quoi)\b/i;

export interface QuestionToCapture {
  question: string;
  botReply: string;
  authorId?: string | null;
  fallbackIdentity?: string | null;
  webResults: { title: string; snippet?: string }[];
}

function questionIsLearnable(question: string): boolean {
  const q = question.trim();
  if (q.length < 8 || q.length > 300) return false;
  if (!ASKS_A_FACT_RE.test(q)) return false;
  // Questions about Nexus, Casseurt, or a specific person/member stay out, same as statements.
  return checkLearningSafety(q, { rawMessage: true }).ok && !/\b(?:you|your|u|ur|nexus|casseurt|patrick)\b/i.test(q);
}

// Answers that change by the hour are looked up live each time and never stored as "knowledge".
const VOLATILE_RE =
  /\b(?:price|prices|stock|stocks|weather|temperature|forecast|live\s+score|score\s+of|odds|exchange\s+rate|trending|breaking\s+news|right\s+now|today|tonight|this\s+(?:morning|afternoon|evening)|how\s+much\s+is\b.{0,30}\b(?:now|worth)|prix|météo|meteo|cours\s+du|aujourd'?hui|ce\s+soir)\b/i;
export function isVolatileQuestion(text: string): boolean {
  return VOLATILE_RE.test(text);
}

export function captureQuestion(e: QuestionToCapture): number | null {
  if (!isLearningEnabled()) return null;
  if (!questionIsLearnable(e.question)) return null;
  if (isVolatileQuestion(e.question)) return null;
  if (isFlaggedOrUnsafeForLearning(e.question)) return null;
  const userHash = identityHash(e.authorId, e.fallbackIdentity);
  try {
    if (countObservationsByUserSince(userHash, Date.now() - 24 * 60 * 60 * 1000) >= MAX_OBSERVATIONS_PER_USER_PER_DAY) return null;
    if (e.webResults.length > 0) {
      const evidence = e.webResults
        .slice(0, 3)
        .map((r) => ({ source: r.title, text: relevantSentences(r.snippet || '', e.question, 5).join(' ') }))
        .filter((x) => x.text);
      if (evidence.length === 0) return null;
      return insertObservation({
        createdAt: Date.now(),
        source: sourceFor(e.authorId),
        userHash,
        channelHash: null,
        userText: e.question.trim().slice(0, 300),
        botReply: e.botReply.slice(0, 1500),
        previousBotReply: null,
        kind: 'search-answer',
        evidence: JSON.stringify(evidence).slice(0, 6000),
      });
    }
    if (DONT_KNOW_RE.test(e.botReply)) {
      return insertObservation({
        createdAt: Date.now(),
        source: sourceFor(e.authorId),
        userHash,
        channelHash: null,
        userText: e.question.trim().slice(0, 300),
        botReply: e.botReply.slice(0, 1500),
        previousBotReply: null,
        kind: 'gap',
      });
    }
  } catch (err) {
    console.warn('[learning] question capture failed:', err);
  }
  return null;
}

// ---- emoji reactions on Discord (forwarded by the bot) ---------------------------------------------
// Reactions are the clearest feedback Discord users give, and the engine never saw them. The bot
// forwards a reaction on one of Nexus's replies; it's only accepted for a reply Nexus REALLY sent
// recently (the engine remembers its own last replies), and the question is taken from that memory,
// never from the caller — so nobody can make it learn from made-up text through this endpoint.
const recentReplies = new Map<string, { question: string; at: number }>();
const RECENT_REPLY_TTL_MS = 6 * 60 * 60 * 1000;

export function registerNexusReply(question: string, answer: string): void {
  if (!question?.trim() || !answer?.trim()) return;
  recentReplies.set(textKey(answer), { question: question.trim().slice(0, 300), at: Date.now() });
  while (recentReplies.size > 1000) recentReplies.delete(recentReplies.keys().next().value!);
}

const POSITIVE_REACTIONS = new Set(['👍', '😂', '🤣', '💀', '🔥', '❤️', '😭', '💯']);
const NEGATIVE_REACTIONS = new Set(['👎', '❌']);

export function reactionKind(emoji: string): 'feedback-positive' | 'feedback-negative' | null {
  if (POSITIVE_REACTIONS.has(emoji)) return 'feedback-positive';
  if (NEGATIVE_REACTIONS.has(emoji)) return 'feedback-negative';
  return null;
}

export function captureReaction(e: { answer: string; emoji: string; authorId?: string | null }): { accepted: boolean; reason: string } {
  if (!isLearningEnabled()) return { accepted: false, reason: 'learning off' };
  const kind = reactionKind(e.emoji);
  if (!kind) return { accepted: false, reason: 'reaction not used for learning' };
  const known = recentReplies.get(textKey(e.answer || ''));
  if (!known || Date.now() - known.at > RECENT_REPLY_TTL_MS) return { accepted: false, reason: 'not a recent Nexus reply' };
  if (isFlaggedOrUnsafeForLearning(known.question)) return { accepted: false, reason: 'reply to a flagged message' };
  const userHash = identityHash(e.authorId, null);
  if (countObservationsByUserSince(userHash, Date.now() - 24 * 60 * 60 * 1000) >= MAX_OBSERVATIONS_PER_USER_PER_DAY) {
    return { accepted: false, reason: 'rate limited' };
  }
  insertObservation({
    createdAt: Date.now(),
    source: sourceFor(e.authorId),
    userHash,
    channelHash: null,
    userText: e.emoji,
    botReply: e.answer.slice(0, 1500),
    previousBotReply: e.answer.slice(0, 1500),
    previousUserText: known.question,
    kind,
  });
  return { accepted: true, reason: kind };
}

