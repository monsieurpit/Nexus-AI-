// The idle worker that runs steps 3-7 of docs/learning-system.md on the captured backlog. It only
// touches the model when no real request has come in recently and nothing is using or waiting for
// the model — learning must never make a Discord reply slower.

import * as localLlmClient from '../localLlmClient';
import { postToDiscordLog } from '../discordLogWebhook';
import { isAdminHash } from './capture';
import { extractCandidate, routeExtraction } from './extract';
import { checkLearningSafety } from './safety';
import { enrichLearned, promoteFact, unlearnFact } from './promote';
import {
  adjustTrust,
  Candidate,
  candidatesByStatus,
  countCandidatesByUserSince,
  expireStaleCandidates,
  getCandidate,
  insertCandidate,
  isLearningEnabled,
  learnedDueForRecheck,
  learnedForCluster,
  learnedMissingQuestions,
  markObservationProcessed,
  nextUnprocessedObservations,
  Observation,
  pruneObservations,
  setCandidateStatus,
  setLearnedRecheck,
  setLearnedQuestions,
} from './store';

const setLearnedQuestionsAttempted = (id: string) => setLearnedQuestions(id, ['-']);
import { assignCluster, corroborationFor, gatherEvidence, isAlreadyInCorpus, judgeClaim, keyFacts } from './verify';

const DAY_MS = 24 * 60 * 60 * 1000;
export const IDLE_AFTER_MS = 45_000;
export const MAX_CANDIDATES_PER_USER_PER_DAY = 15;
const OBSERVATION_RETENTION_MS = 14 * DAY_MS;

// Observation.processed codes, so the backlog shows why each message was dropped.
export const PROCESSED = { candidate: 1, skipped: 2, unsafe: 3, extractFailed: 4, rateLimited: 5 } as const;

let lastForegroundAt = 0;
export function markForegroundActivity(): void {
  lastForegroundAt = Date.now();
}

function isIdle(): boolean {
  return Date.now() - lastForegroundAt >= IDLE_AFTER_MS && !localLlmClient.isModelBusy();
}

// ---- claim fidelity -----------------------------------------------------------------------------

const NUMBER_WORDS: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', thirteen: '13', fourteen: '14', fifteen: '15', sixteen: '16', seventeen: '17', eighteen: '18',
  nineteen: '19', twenty: '20', thirty: '30', forty: '40', fifty: '50', hundred: '100',
};

// The extractor rewrites the message into a clean sentence, and a 4B model can slip in a number the
// person never said (a year, a score). Every number in the claim must come from the message itself
// (or, for a correction, the bot reply it corrects).
export function claimNumbersFromSource(claim: string, sourceText: string): boolean {
  const source = sourceText.toLowerCase().replace(/\b[a-z]+\b/g, (w) => NUMBER_WORDS[w] ?? w).replace(/,(\d{3})/g, '$1');
  const sourceNumbers = new Set(source.match(/\d+(?:\.\d+)?/g) || []);
  return [...keyFacts(claim).numbers].every((n) => sourceNumbers.has(n));
}

// ---- one observation through extraction + safety + routing --------------------------------------

export async function processObservation(o: Observation): Promise<number | null> {
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
  const faithful = !x.claim || claimNumbersFromSource(x.claim, `${o.userText} ${o.previousBotReply ?? ''}`);
  const status = !claimSafety.ok || !faithful ? 'rejected' : route.next === 'reject' ? 'rejected' : route.next === 'verify' ? 'pending-verify' : 'needs-corroboration';
  const reason = !claimSafety.ok ? `unsafe: ${claimSafety.reason}` : !faithful ? 'the rewritten claim has a number the person never said' : route.reason;
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
  const { verdict, quote } = await judgeClaim(c.claim, evidence);
  if (verdict === 'contradicted') {
    setCandidateStatus(c.id, 'rejected', `contradicted by evidence: ${quote}`);
    if (!isAdminHash(c.userHash)) adjustTrust(c.userHash, 'contradicted', -0.15);
    return;
  }
  if (verdict === 'supported') {
    const source = evidence.find((e) => e.text.toLowerCase().includes(quote.toLowerCase().slice(0, 40)))?.source || '';
    adjustTrust(c.userHash, 'verified', 0.05);
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
      void postToDiscordLog(`[learning] learned (verified online): ${c.claim}`);
    } else {
      setCandidateStatus(c.id, 'needs-review', `verified (${source}) but the daily learning limit was reached`);
    }
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
  const { verdict, quote } = await judgeClaim(due.claim, evidence);
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
    const [unverified] = candidatesByStatus('pending-verify', 1);
    if (unverified) {
      await verifyCandidate(unverified);
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
