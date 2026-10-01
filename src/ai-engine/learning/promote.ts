// Step 7 (promote) of docs/learning-system.md, plus the learned corpus.
//
// Verified facts are stored one per row (so each can be retired on its own), but they're served as
// a CORPUS: facts about the same topic are grouped into one entry shaped like the hand-written corpus
// (title, keywords, several facts in its content), rebuilt on every change and exported to
// ~/.nexus-learning/corpus/learned-corpus.{json,md} so it can be read like any corpus file.

import { createHash } from 'crypto';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { learningGenerate } from './llm';
import { addRuntimeKnowledgeItem, removeRuntimeKnowledgeItem } from '../knowledgeBase';
import { processForSearch } from '../bm25Engine';
import {
  activeLearned,
  audit,
  CandidateScope,
  countPromotionsSince,
  deactivateLearned,
  insertLearned,
  LearnedFact,
  learnedSince,
  setLearnedClaim,
  setLearnedQuestions,
} from './store';
import { keyFacts, sameKeyFacts } from './verify';

export const MAX_PROMOTIONS_PER_DAY = 50;
export const RECHECK_AFTER_MS = 30 * 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
// A fact whose confidence dropped (complaints it couldn't re-verify) stays stored but out of answers.
export const MIN_CONFIDENCE_IN_CORPUS = 0.5;
const MAX_FACTS_PER_TOPIC = 12;

// ---- the learned corpus -------------------------------------------------------------------------

export interface LearnedTopic {
  id: string;
  title: string;
  keywords: string[];
  facts: LearnedFact[];
}

// Same topic = same subject once wording noise is removed ("the 2026 FIFA World Cup" and
// "2026 fifa world cup" group together; different subjects stay apart — no fuzzy merging that could
// glue unrelated facts into one entry).
export function topicKey(subject: string): string {
  const terms = processForSearch(subject.replace(/\(learned\)/i, '')).filter((t) => t.length > 1);
  return [...new Set(terms)].sort().join(' ') || subject.toLowerCase().trim();
}

export function buildLearnedTopics(facts: LearnedFact[] = activeLearned()): LearnedTopic[] {
  const groups = new Map<string, LearnedFact[]>();
  for (const f of facts) {
    if (f.confidence < MIN_CONFIDENCE_IN_CORPUS) continue;
    const key = topicKey(f.subject || f.claim);
    groups.set(key, [...(groups.get(key) ?? []), f]);
  }
  return [...groups.entries()].map(([key, group]) => {
    const sorted = [...group].sort((a, b) => b.confidence - a.confidence || b.createdAt - a.createdAt).slice(0, MAX_FACTS_PER_TOPIC);
    // Most common subject wording becomes the title.
    const counts = new Map<string, number>();
    for (const f of sorted) counts.set(f.subject, (counts.get(f.subject) ?? 0) + 1);
    const rawTitle = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || sorted[0].claim.slice(0, 50);
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
    const questions = sorted.flatMap((f) => (f.questions || '').split('\n')).map((q) => q.trim()).filter((q) => q && q !== '-');
    return {
      id: `learned-topic-${createHash('sha1').update(key).digest('hex').slice(0, 12)}`,
      title,
      // Plain phrases, not pre-stemmed tokens — the BM25 indexer stems keywords itself.
      keywords: [...new Set([...sorted.map((f) => f.subject), ...questions])].filter(Boolean).slice(0, 12),
      facts: sorted,
    };
  });
}

let servedTopicIds: string[] = [];

function corpusDir(): string {
  return join(process.env.NEXUS_LEARNING_DIR || join(homedir(), '.nexus-learning'), 'corpus');
}

function exportCorpus(topics: LearnedTopic[]): void {
  try {
    const dir = corpusDir();
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true, mode: 0o700 });
    const json = {
      generatedAt: new Date().toISOString(),
      note: 'Knowledge Nexus learned from people (Discord + website), verified before being added. Rebuilt automatically; edit through the review page, not this file.',
      topics: topics.map((t) => ({
        title: t.title,
        keywords: t.keywords,
        facts: t.facts.map((f) => ({ fact: f.claim, verifiedBy: f.verification, evidence: f.evidence, confidence: f.confidence, learnedAt: new Date(f.createdAt).toISOString() })),
      })),
    };
    writeFileSync(join(dir, 'learned-corpus.json'), JSON.stringify(json, null, 2), { mode: 0o600 });
    const md = [
      `# Nexus learned corpus`,
      ``,
      `${topics.reduce((n, t) => n + t.facts.length, 0)} facts in ${topics.length} topics — rebuilt ${json.generatedAt}.`,
      ``,
      ...topics.flatMap((t) => [`## ${t.title}`, ``, ...t.facts.map((f) => `- ${f.claim} _(${f.verification}; ${f.evidence.slice(0, 80)})_`), ``]),
    ].join('\n');
    writeFileSync(join(dir, 'learned-corpus.md'), md, { mode: 0o600 });
  } catch (err) {
    console.warn('[learning] corpus export failed:', err);
  }
}

// Replaces what search serves with the current topics and re-exports the files. Called after every
// change (and at startup); cheap — a few dozen items at most.
export function rebuildLearnedCorpus(): LearnedTopic[] {
  const topics = buildLearnedTopics();
  for (const id of servedTopicIds) removeRuntimeKnowledgeItem(id);
  for (const t of topics) {
    addRuntimeKnowledgeItem({
      id: t.id,
      title: `${t.title} (learned)`,
      category: 'learned',
      keywords: t.keywords,
      content: t.facts.map((f) => f.claim).join(' '),
    });
  }
  servedTopicIds = topics.map((t) => t.id);
  exportCorpus(topics);
  return topics;
}

// Startup.
export function loadLearnedIntoKnowledge(): number {
  rebuildLearnedCorpus();
  return activeLearned().length;
}

// ---- enrichment / polishing ---------------------------------------------------------------------

// Search matches on words, so "what day do we watch movies on the server" missed the learned
// "The server's movie night is every Friday at 8pm" (measured 2026-09-30). The model writes a few
// differently-worded questions the fact answers; their words become extra keywords.
export async function enrichLearned(f: LearnedFact): Promise<boolean> {
  const text = await learningGenerate(
    `Fact: "${f.claim}"\nWrite 5 short, differently-worded questions people in a Discord chat might ask that this fact answers, in English. Use casual wording and synonyms. One per line, no numbering.`,
    { temperature: 0.7, maxTokens: 160 }
  );
  if (text === null) return false;
  const questions = text
    .split('\n')
    .map((l) => l.replace(/^[\s\d.)*-]+/, '').trim())
    .filter((l) => l.length > 5 && l.length < 140)
    .slice(0, 6);
  if (questions.length === 0) return false;
  setLearnedQuestions(f.id, questions);
  rebuildLearnedCorpus();
  return true;
}

// Claims written from search results come out clunky ("Spain won the 2026 FIFA World Cup on July 19
// with Spain winning the championship for the second time."). One rewrite pass for readability —
// kept only if every name and number is exactly the same and it didn't grow, so polishing can
// never change what the fact says.
export async function polishLearned(f: LearnedFact): Promise<boolean> {
  const text = await learningGenerate(
    `Rewrite this sentence in English so it reads naturally and says it once, without repeating itself. Keep every name, number and date exactly as written. Do not add anything.\nSentence: "${f.claim}"\nRewritten:`,
    { temperature: 0, maxTokens: 90 }
  );
  const rewritten = text ? text.replace(/^["'\s]+|["'\s]+$/g, '').split('\n')[0].trim() : '';
  const ok =
    rewritten.length >= 15 &&
    rewritten.length <= f.claim.length + 10 &&
    sameKeyFacts(rewritten, f.claim) &&
    keyFacts(rewritten).numbers.size === keyFacts(f.claim).numbers.size;
  setLearnedClaim(f.id, ok && rewritten !== f.claim ? rewritten : null);
  if (ok && rewritten !== f.claim) {
    audit('learned:polish', f.id, `${f.claim} -> ${rewritten}`);
    rebuildLearnedCorpus();
  }
  return ok;
}

// ---- promotion / removal ------------------------------------------------------------------------

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
  rebuildLearnedCorpus();
  return fact;
}

export function unlearnFact(id: string, reason: string): boolean {
  const removed = deactivateLearned(id, reason);
  if (removed) rebuildLearnedCorpus();
  return removed;
}

// "Undo everything it learned since X" — the escape hatch the old fine-tune never had.
export function rollbackLearnedSince(since: number, reason: string): number {
  const facts = learnedSince(since);
  for (const f of facts) deactivateLearned(f.id, `rollback: ${reason}`);
  rebuildLearnedCorpus();
  audit('learned:rollback', new Date(since).toISOString(), `${facts.length} fact(s): ${reason}`);
  return facts.length;
}
