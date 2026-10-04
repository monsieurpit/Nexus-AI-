// Direct teaching (Patrick, 2026-10-04): "I told him how to start the engines on an A320 and the learning system
// didn't learn it." The normal learning pipeline only keeps short facts it can verify on the web or that several
// people agree on, so a procedure pasted by the owner was dropped. Trusted teachers (the owner, plus NEXUS_TEACHERS)
// can now teach directly: "nexus, here is how to <thing>: ...", "nexus learn this: ...", "nexus remember that ...".
// The text still goes through the same hard safety rules as everything else the learning system stores, is saved
// as admin-verified learned facts (so it shows up and can be removed on the review page) and is grouped under one
// topic. Nobody else can teach this way.

import { checkLearningSafety } from './safety';
import { audit, isLearningEnabled } from './store';
import { promoteFact, promotionBudgetLeft } from './promote';

const OWNER_ID = '1394001641899954368';

export function isTeacher(authorId?: string | null): boolean {
  if (!authorId) return false;
  const extra = (process.env.NEXUS_TEACHERS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return authorId === OWNER_ID || extra.includes(authorId);
}

const TEACH_START_RE =
  /^\s*(?:(?:hey|yo|ok)\s+)?(?:nexus[\s,:-]+)?(?:here(?:'s|\s+is)\s+how\s+(?:to|you)\b|this\s+is\s+how\s+(?:to|you)\b|learn\s+(?:this|that|how)\b|remember\s+(?:this|that|how)\b|memorize\s+(?:this|that)\b|note\s+(?:this|that)\b|fyi\b|teach(?:ing)?\s+you\b|i'?m\s+teaching\s+you\b)/i;

export function looksLikeTeaching(text: string): boolean {
  return TEACH_START_RE.test(text || '') && (text || '').trim().length >= 40;
}

// "here is how to start engines on Airbus A320: ..." -> "How to start engines on Airbus A320".
export function teachingSubject(text: string): string {
  const first = (text || '').trim().split(/\n|:\s/)[0] || '';
  const cleaned = first
    .replace(/^\s*(?:(?:hey|yo|ok)\s+)?(?:nexus[\s,:-]+)?/i, '')
    .replace(/^(?:here(?:'s|\s+is)|this\s+is)\s+/i, '')
    .replace(/^(?:learn|remember|memorize|note)\s+(?:this|that)\s*/i, '')
    .replace(/[.:,;!-]+$/, '')
    .trim();
  const s = cleaned || 'Something Patrick taught me';
  return (s.charAt(0).toUpperCase() + s.slice(1)).slice(0, 120);
}

function chunkText(body: string, max = 900): string[] {
  const lines = body.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const chunks: string[] = [];
  let cur = '';
  for (const line of lines) {
    if ((cur + ' ' + line).length > max && cur) {
      chunks.push(cur.trim());
      cur = '';
    }
    cur += (cur ? ' ' : '') + line;
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks.slice(0, 6);
}

export interface TeachResult {
  ok: boolean;
  subject: string;
  saved: number;
  reason?: string;
}

export function teachFromMessage(text: string, authorId?: string | null): TeachResult {
  const subject = teachingSubject(text);
  if (!isTeacher(authorId)) return { ok: false, subject, saved: 0, reason: 'not a teacher' };
  if (!isLearningEnabled()) return { ok: false, subject, saved: 0, reason: 'learning is off' };
  const body = text
    .replace(/^\s*(?:(?:hey|yo|ok)\s+)?(?:nexus[\s,:-]+)?/i, '')
    // the intro line ("here is how to start engines on Airbus A320:") is the subject, not part of the facts
    .replace(/^(?:here(?:'s|\s+is)|this\s+is|learn\s+(?:this|that)|remember\s+(?:this|that))[^\n:]*[:\n]\s*/i, '')
    .trim()
    .slice(0, 5000);
  const safety = checkLearningSafety(body, { rawMessage: true });
  if (!safety.ok) return { ok: false, subject, saved: 0, reason: safety.reason };
  const parts = chunkText(body);
  if (promotionBudgetLeft() < parts.length) return { ok: false, subject, saved: 0, reason: 'daily learning budget used up' };
  let saved = 0;
  parts.forEach((part, i) => {
    const fact = promoteFact({
      claim: parts.length > 1 ? `${subject} (part ${i + 1}/${parts.length}): ${part}` : `${subject}: ${part}`,
      subject,
      scope: 'world-fact',
      verification: 'admin',
      evidence: `Taught directly by a trusted teacher on ${new Date().toISOString().slice(0, 10)}.`,
      supporterCount: 1,
      timeSensitive: false,
    });
    if (fact) saved++;
  });
  audit('learned:taught', subject, `${saved} part(s) from a trusted teacher`);
  return { ok: saved > 0, subject, saved, reason: saved > 0 ? undefined : 'could not save' };
}
