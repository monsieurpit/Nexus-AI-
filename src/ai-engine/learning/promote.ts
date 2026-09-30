// Step 7 (promote) of docs/learning-system.md: a verified fact becomes a knowledge item that search
// finds like any corpus doc (category 'learned'). Removing it is one call and affects nothing else.

import * as localLlmClient from '../localLlmClient';
import { addRuntimeKnowledgeItem, removeRuntimeKnowledgeItem } from '../knowledgeBase';
import {
  activeLearned,
  audit,
  CandidateScope,
  countPromotionsSince,
  deactivateLearned,
  insertLearned,
  LearnedFact,
  learnedSince,
  setLearnedQuestions,
} from './store';

export const MAX_PROMOTIONS_PER_DAY = 25;
export const RECHECK_AFTER_MS = 30 * 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function toKnowledgeItem(f: Pick<LearnedFact, 'id' | 'claim' | 'subject' | 'questions'>) {
  return {
    id: f.id,
    title: f.subject ? `${f.subject} (learned)` : 'Learned fact',
    category: 'learned',
    // Plain phrases, not pre-stemmed tokens — the BM25 indexer stems keywords itself, and stemming
    // twice ("movies" -> "movi" -> "mov") made them stop matching queries.
    keywords: [f.subject, ...(f.questions || '').split('\n')].map((k) => k.trim()).filter((k) => k && k !== '-').slice(0, 8),
    content: f.claim,
  };
}

// Search matches on words, so "what day do we watch movies on the server" missed the learned
// "The server's movie night is every Friday at 8pm" (measured 2026-09-30). The model writes a few
// differently-worded questions the fact answers; their words become extra keywords.
export async function enrichLearned(f: LearnedFact): Promise<boolean> {
  const result = await localLlmClient.generate(
    `Fact: "${f.claim}"\nWrite 5 short, differently-worded questions people in a Discord chat might ask that this fact answers. Use casual wording and synonyms. One per line, no numbering.`,
    { temperature: 0.7, maxTokens: 160, think: false, skipLanguageCheck: true, model: localLlmClient.chatModel(), timeoutMs: 45000 }
  );
  if (result.status !== 'success') return false;
  const questions = result.text
    .split('\n')
    .map((l) => l.replace(/^[\s\d.)*-]+/, '').trim())
    .filter((l) => l.length > 5 && l.length < 140)
    .slice(0, 6);
  if (questions.length === 0) return false;
  setLearnedQuestions(f.id, questions);
  removeRuntimeKnowledgeItem(f.id);
  addRuntimeKnowledgeItem(toKnowledgeItem({ ...f, questions: questions.join('\n') }));
  return true;
}

// Called once at startup: every active learned fact goes back into the in-memory search index.
export function loadLearnedIntoKnowledge(): number {
  const facts = activeLearned();
  for (const f of facts) addRuntimeKnowledgeItem(toKnowledgeItem(f));
  return facts.length;
}

export function promotionBudgetLeft(): number {
  return Math.max(0, MAX_PROMOTIONS_PER_DAY - countPromotionsSince(Date.now() - DAY_MS));
}

export interface PromotionInput {
  claim: string;
  subject: string;
  scope: CandidateScope;
  verification: LearnedFact['verification'];
  evidence: string;
  supporterCount: number;
  timeSensitive: boolean;
  clusterId?: number | null;
}

export function promoteFact(p: PromotionInput): LearnedFact | null {
  if (promotionBudgetLeft() <= 0) {
    audit('learned:budget-exhausted', p.subject, p.claim);
    return null;
  }
  const id = `learned-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const confidence = p.verification === 'web' ? 0.9 : p.verification === 'admin' ? 0.95 : Math.min(0.85, 0.5 + 0.1 * p.supporterCount);
  const fact: LearnedFact = {
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    claim: p.claim,
    subject: p.subject,
    scope: p.scope,
    confidence,
    verification: p.verification,
    evidence: p.evidence,
    supporterCount: p.supporterCount,
    recheckAt: p.timeSensitive ? Date.now() + RECHECK_AFTER_MS : null,
    active: 1,
  };
  insertLearned({ ...fact, clusterId: p.clusterId ?? null });
  addRuntimeKnowledgeItem(toKnowledgeItem(fact));
  return fact;
}

export function unlearnFact(id: string, reason: string): boolean {
  const removed = deactivateLearned(id, reason);
  removeRuntimeKnowledgeItem(id);
  return removed;
}

// "Undo everything it learned since X" — the escape hatch the old fine-tune never had.
export function rollbackLearnedSince(since: number, reason: string): number {
  const facts = learnedSince(since);
  for (const f of facts) unlearnFact(f.id, `rollback: ${reason}`);
  audit('learned:rollback', new Date(since).toISOString(), `${facts.length} fact(s): ${reason}`);
  return facts.length;
}
