// The idle worker that runs steps 3-7 of docs/learning-system.md on the captured backlog. It only
// touches the model when no real request has come in recently and nothing is using or waiting for
// the model — learning must never make a Discord reply slower.

import * as localLlmClient from '../localLlmClient';
import { postToDiscordLog } from '../discordLogWebhook';
import { cosineSimilarity } from '../semanticEngine';
import { buildWebSearchQuery, buildWikipediaQuery, executeUnifiedWebSearch } from '../webSearchEngine';
import { isAdminHash } from './capture';
import { extractCandidate, routeExtraction } from './extract';
import { checkLearningSafety } from './safety';
import { enrichLearned, polishLearned, promoteFact, unlearnFact } from './promote';
import { learnFromComplaint, learnFromPraise } from './feedback';
import {
  activeLearnedWithClusters,
  adjustTrust,
  Candidate,
  clusterEmbedding,
  candidatesByStatus,
  countCandidatesByUserSince,
  expireStaleCandidates,
  getCandidate,
  insertCandidate,
  isLearningEnabled,
  learnedDueForRecheck,
  learnedForCluster,
  learnedMissingQuestions,
  learnedNeedingPolish,
  audit,
  markObservationProcessed,
  nextUnprocessedObservations,
  Observation,
  pruneObservations,
  setCandidateStatus,
  setLearnedRecheck,
  setLearnedQuestions,
} from './store';

import {
  assignCluster,
  corroborationFor,
  EvidenceItem,
  gatherEvidence,
  isAlreadyInCorpus,
  judgeClaimTwice,
  keyFacts,
  normalizeNumberWords,
  quoteComesFrom,
  relevantSentences,
  sameKeyFacts,
  writeAnswerClaim,
} from './verify';

const setLearnedQuestionsAttempted = (id: string) => setLearnedQuestions(id, ['-']);

const DAY_MS = 24 * 60 * 60 * 1000;
export const IDLE_AFTER_MS = 45_000;
export const MAX_CANDIDATES_PER_USER_PER_DAY = 15;
const OBSERVATION_RETENTION_MS = 14 * DAY_MS;

// Observation.processed codes, so the backlog shows why each message was dropped.
export const PROCESSED = { candidate: 1, skipped: 2, unsafe: 3, extractFailed: 4, rateLimited: 5, noAnswerFound: 6 } as const;

// Facts that can change (who holds a title now, this season, recent years) get re-checked monthly.
const TIME_SENSITIVE_RE = /\b(?:current(?:ly)?|latest|now|today|recent(?:ly)?|this\s+(?:year|season|week|month)|still|20(?:2[4-9]|3\d))\b/i;

let lastForegroundAt = 0;
export function markForegroundActivity(): void {
  lastForegroundAt = Date.now();
}

function isIdle(): boolean {
  return Date.now() - lastForegroundAt >= IDLE_AFTER_MS && !localLlmClient.isModelBusy();
}

// ---- claim fidelity -----------------------------------------------------------------------------

// The extractor rewrites the message into a clean sentence, and a 4B model can slip in a number the
// person never said (a year, a score). Every number in the claim must come from the message itself
// (or, for a correction, the bot reply it corrects).
export function claimNumbersFromSource(claim: string, sourceText: string): boolean {
  const source = normalizeNumberWords(sourceText.toLowerCase()).replace(/,(\d{3})/g, '$1');
  const sourceNumbers = new Set(source.match(/\d+(?:\.\d+)?/g) || []);
  return [...keyFacts(claim).numbers].every((n) => sourceNumbers.has(n));
}

// Same idea for names: the extractor "corrects" people from its own memory — live, "remember the
// capital of australia is sydney" came out as the claim "The capital of Australia is Canberra."
// True, but not what the person said, and the same move would let the model's own mistakes in. Most
// of the claim's names must come from the message (one extra, e.g. "FIFA" added to "world cup", is
// tolerated only when it's a small part of the claim).
export function claimNamesFromSource(claim: string, sourceText: string): boolean {
  const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const source = norm(sourceText);
  const names = [...keyFacts(claim).names];
  if (names.length === 0) return true;
  const found = names.filter((n) => source.includes(n)).length;
  return found / names.length >= 0.7;
}

// ---- one observation through extraction + safety + routing --------------------------------------

export async function processObservation(o: Observation): Promise<number | null> {
  if (o.kind === 'search-answer') {
    let evidence: EvidenceItem[] = [];
    try {
      evidence = JSON.parse(o.evidence || '[]');
    } catch {
      evidence = [];
    }
    return processQuestionWithEvidence(o, evidence);
  }
  if (o.kind === 'gap') return processGap(o);
  if (o.kind === 'feedback-positive' || o.kind === 'feedback-negative') {
    const outcome = o.kind === 'feedback-positive' ? await learnFromPraise(o) : await learnFromComplaint(o);
    audit(o.kind, String(o.id), outcome);
    markObservationProcessed(o.id, PROCESSED.skipped);
    return null;
  }
  const rawSafety = checkLearningSafety(o.userText, { rawMessage: true });
  if (!rawSafety.ok) {
    markObservationProcessed(o.id, PROCESSED.unsafe);
    if (!isAdminHash(o.userHash) && /prompt injection|damaging claim|hate|child/.test(rawSafety.reason)) adjustTrust(o.userHash, 'flagged', -0.05);
    return null;
  }
  if (!isAdminHash(o.userHash) && countCandidatesByUserSince(o.userHash, Date.now() - DAY_MS) >= MAX_CANDIDATES_PER_USER_PER_DAY) {
    markObservationProcessed(o.id, PROCESSED.rateLimited);
    return null;
  }
  const x = await extractCandidate(o.userText, o.previousBotReply);
  if (!x) {
    markObservationProcessed(o.id, PROCESSED.extractFailed);
    return null;
  }
  if (x.kind === 'noise' && !x.claim) {
    markObservationProcessed(o.id, PROCESSED.skipped);
    return null;
  }
  const route = routeExtraction(x);
  const claimSafety = x.claim ? checkLearningSafety(x.claim) : { ok: true, reason: '' };
  const claimSource = `${o.userText} ${o.previousBotReply ?? ''}`;
  const numbersFaithful = !x.claim || claimNumbersFromSource(x.claim, claimSource);
  const namesFaithful = !x.claim || claimNamesFromSource(x.claim, o.userText);
  const faithful = numbersFaithful && namesFaithful;
  const status = !claimSafety.ok || !faithful ? 'rejected' : route.next === 'reject' ? 'rejected' : route.next === 'verify' ? 'pending-verify' : 'needs-corroboration';
  const reason = !claimSafety.ok ? `unsafe: ${claimSafety.reason}` : !numbersFaithful ? 'the rewritten claim has a number the person never said' : !namesFaithful ? "the rewritten claim isn't what the person said (names changed)" : route.reason;
  const id = insertCandidate({
    observationId: o.id,
    userHash: o.userHash,
    source: o.source,
    kind: x.kind === 'noise' ? 'claim' : x.kind,
    scope: x.scope,
    claim: x.claim,
    subject: x.subject,
    pertinence: x.pertinence,
    timeSensitive: x.timeSensitive ? 1 : 0,
    status,
    statusReason: reason,
  });
  markObservationProcessed(o.id, PROCESSED.candidate);
  return status === 'rejected' ? null : id;
}

// ---- questions: learn the answer someone needed ------------------------------------------------

async function processQuestionWithEvidence(o: Observation, evidence: EvidenceItem[]): Promise<number | null> {
  const claim = await writeAnswerClaim(o.userText, evidence);
  if (!claim) {
    markObservationProcessed(o.id, o.kind === 'gap' ? PROCESSED.noAnswerFound : PROCESSED.skipped);
    return null;
  }
  const safety = checkLearningSafety(claim);
  const id = insertCandidate({
    observationId: o.id,
    userHash: o.userHash,
    source: o.source,
    kind: 'search-answer',
    scope: 'world-fact',
    claim,
    subject: buildWikipediaQuery(o.userText).slice(0, 60),
    pertinence: 0.7,
    timeSensitive: TIME_SENSITIVE_RE.test(`${o.userText} ${claim}`) ? 1 : 0,
    status: safety.ok ? 'pending-verify' : 'rejected',
    statusReason: safety.ok ? `answer to "${o.userText.slice(0, 80)}" — verifying independently` : `unsafe: ${safety.reason}`,
  });
  markObservationProcessed(o.id, PROCESSED.candidate);
  return safety.ok ? id : null;
}

// A question Nexus said he didn't know: search for it now that he's idle.
async function processGap(o: Observation): Promise<number | null> {
  let evidence: EvidenceItem[] = [];
  try {
    const found = await executeUnifiedWebSearch(buildWebSearchQuery(o.userText, 'explicit'), { provider: 'all', limit: 3 });
    evidence = found.results
      .slice(0, 3)
      .map((r) => ({ source: r.title, text: relevantSentences(r.snippet || '', o.userText, 5).join(' ') }))
      .filter((e) => e.text);
  } catch {
    evidence = [];
  }
  if (evidence.length === 0) {
    markObservationProcessed(o.id, PROCESSED.noAnswerFound);
    return null;
  }
  return processQuestionWithEvidence(o, evidence);
}

// When a newer verified fact says something different about the same thing ("Mark Carney is the
// prime minister" vs an older learned "Justin Trudeau is the prime minister"), the older one is
// checked against the new evidence and retired if it's now contradicted.
async function retireContradictedFacts(newClaim: string, clusterId: number, evidence: EvidenceItem[]): Promise<number> {
  const vec = clusterEmbedding(clusterId);
  if (!vec || evidence.length === 0) return 0;
  let retired = 0;
  for (const old of activeLearnedWithClusters()) {
    if (old.clusterId === clusterId || old.clusterId === null) continue;
    const oldVec = clusterEmbedding(old.clusterId);
    if (!oldVec || cosineSimilarity(vec, oldVec) < 0.75 || sameKeyFacts(newClaim, old.claim)) continue;
    const { verdict, quote } = await judgeClaimTwice(old.claim, evidence);
    if (verdict === 'contradicted') {
      unlearnFact(old.id, `replaced by a newer verified fact: "${newClaim}" (${quote})`);
      retired++;
    }
  }
  return retired;
}

// ---- verification / corroboration / promotion ---------------------------------------------------

// Server lore (and world facts too new/niche to check online) can only be vouched for by people —
// and three troll accounts agreeing on a lie over two days would pass a pure head count. So a
// corroborated claim goes to Patrick for a yes/no instead of straight into answers; the webhook
// ping carries the candidate id for POST /api/v1/learning/approve.
async function tryCorroborate(c: Candidate, clusterId: number, why: string): Promise<void> {
  const status = corroborationFor(clusterId, isAdminHash);
  if (status.passes) {
    setCandidateStatus(c.id, 'needs-review', `${why} — confirmed by ${status.people} people over ${status.days} days, waiting for admin OK`);
    void postToDiscordLog(
      `[learning] ${status.people} different people said this (${why}). Learn it? #${c.id}: "${c.claim}" — approve with POST /api/v1/learning/approve {"candidateId": ${c.id}}`
    );
    return;
  }
  setCandidateStatus(c.id, 'needs-corroboration', `${why} — ${status.people}/3 people, ${status.days}/2 days so far`);
}

export async function verifyCandidate(c: Candidate): Promise<void> {
  // Same fact already learned (someone else said it first) — count as support, don't learn twice.
  const clusterId = await assignCluster(c);
  if (learnedForCluster(clusterId)) {
    setCandidateStatus(c.id, 'promoted', 'already learned (same fact)');
    return;
  }
  // "Remember X" from Patrick's Discord id goes to the review page rather than straight into answers:
  // /api/v1/nexus is public and a Discord id isn't a secret, so anyone can send a message "as" him.
  if (isAdminHash(c.userHash) && c.kind === 'remember-request' && c.scope !== 'world-fact') {
    setCandidateStatus(c.id, 'needs-review', 'said by the admin id — confirm on the review page (ids can be faked through the public API)');
    return;
  }
  if (c.scope !== 'world-fact') return tryCorroborate(c, clusterId, 'server lore');

  const evidence = await gatherEvidence(c.claim, c.subject);
  const { verdict, quote } = await judgeClaimTwice(c.claim, evidence);
  // Trust is about what people STATE; an answer written from a search isn't the asker's claim.
  const affectsTrust = c.kind !== 'search-answer' && !isAdminHash(c.userHash);
  if (verdict === 'contradicted') {
    setCandidateStatus(c.id, 'rejected', `contradicted by evidence: ${quote}`);
    if (affectsTrust) adjustTrust(c.userHash, 'contradicted', -0.15);
    return;
  }
  if (verdict === 'supported') {
    const source = evidence.find((e) => quoteComesFrom(quote, e.text))?.source || evidence[0]?.source || '';
    if (affectsTrust) adjustTrust(c.userHash, 'verified', 0.05);
    if (isAlreadyInCorpus(source)) {
      setCandidateStatus(c.id, 'rejected', 'true, but the corpus already knows it');
      return;
    }
    const fact = promoteFact({
      claim: c.claim,
      subject: c.subject,
      scope: c.scope,
      verification: 'web',
      evidence: `${source}: ${quote}`,
      supporterCount: 1,
      timeSensitive: !!c.timeSensitive,
      clusterId,
    });
    if (fact) {
      setCandidateStatus(c.id, 'promoted', `verified: ${source}`);
      const retired = await retireContradictedFacts(c.claim, clusterId, evidence);
      void postToDiscordLog(`[learning] learned (verified online): ${c.claim}${retired ? ` — replaced ${retired} outdated fact(s)` : ''}`);
    } else {
      setCandidateStatus(c.id, 'needs-review', `verified (${source}) but the daily learning limit was reached`);
    }
    return;
  }
  // An answer written from a search that doesn't verify independently is just dropped — nobody
  // claimed it, so there's nothing for people to corroborate.
  if (c.kind === 'search-answer') {
    setCandidateStatus(c.id, 'rejected', 'answer did not verify independently');
    return;
  }
  // Can't be checked online (too new, too niche) — fall back to needing several people.
  return tryCorroborate(c, clusterId, 'not verifiable online');
}

// Time-sensitive facts ("current X", release dates) get re-checked; contradicted ones are retired.
async function recheckOne(): Promise<boolean> {
  const [due] = learnedDueForRecheck();
  if (!due) return false;
  if (due.verification !== 'web') {
    setLearnedRecheck(due.id, Date.now() + 30 * DAY_MS);
    return true;
  }
  const evidence = await gatherEvidence(due.claim, due.subject);
  const { verdict, quote } = await judgeClaimTwice(due.claim, evidence);
  if (verdict === 'contradicted') unlearnFact(due.id, `re-check contradicted: ${quote}`);
  else setLearnedRecheck(due.id, Date.now() + 30 * DAY_MS);
  return true;
}

// ---- loop ---------------------------------------------------------------------------------------

let running = false;
let timer: ReturnType<typeof setInterval> | null = null;

export async function runLearningTick(): Promise<'disabled' | 'busy' | 'idle' | 'worked'> {
  if (!isLearningEnabled()) return 'disabled';
  if (running) return 'busy';
  if (!isIdle()) return 'busy';
  running = true;
  try {
    // A candidate whose verification got interrupted (a real message arrived in between) resumes here.
    // If verifying it throws (DB/model error), it's rejected rather than retried forever — a stuck
    // candidate at the head of the queue would otherwise block all learning.
    const [unverified] = candidatesByStatus('pending-verify', 1);
    if (unverified) {
      try {
        await verifyCandidate(unverified);
      } catch (err) {
        setCandidateStatus(unverified.id, 'rejected', `verification error: ${String((err as any)?.message || err).slice(0, 120)}`);
      }
      return 'worked';
    }
    const [o] = nextUnprocessedObservations(1);
    if (o) {
      const candidateId = await processObservation(o);
      if (candidateId !== null && isIdle()) {
        const c = getCandidate(candidateId);
        if (c) await verifyCandidate(c);
      }
      return 'worked';
    }
    const [needsQuestions] = learnedMissingQuestions(1);
    if (needsQuestions) {
      // Mark as attempted even if the model fails, so one bad fact can't stall the loop.
      if (!(await enrichLearned(needsQuestions))) setLearnedQuestionsAttempted(needsQuestions.id);
      return 'worked';
    }
    const [needsPolish] = learnedNeedingPolish(1);
    if (needsPolish) {
      await polishLearned(needsPolish);
      return 'worked';
    }
    if (await recheckOne()) return 'worked';
    pruneObservations(OBSERVATION_RETENTION_MS);
    expireStaleCandidates(30 * DAY_MS);
    return 'idle';
  } catch (err) {
    console.warn('[learning] tick failed:', err);
    return 'idle';
  } finally {
    running = false;
  }
}

export function startLearningWorker(intervalMs = 15_000): void {
  if (timer || !isLearningEnabled()) return;
  timer = setInterval(() => void runLearningTick(), intervalMs);
}

export function stopLearningWorker(): void {
  if (timer) clearInterval(timer);
  timer = null;
}
