// Step 1 (capture) + step 2 (triage) of docs/learning-system.md. Runs after the reply has been sent,
// synchronously and cheaply (one SQLite insert); everything expensive happens later in the idle
// worker. Both the website and the Discord bot call /api/v1/nexus, so this one hook covers both.

import { detectUserInsult } from '../swearEngine';
import { checkLearningSafety } from './safety';
import { relevantSentences } from './verify';
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
  if (triageMessage(userText, e.previousBotReply) === 'skip') return null;
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

export function captureQuestion(e: QuestionToCapture): number | null {
  if (!isLearningEnabled()) return null;
  if (!questionIsLearnable(e.question)) return null;
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

