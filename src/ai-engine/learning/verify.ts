// Step 5 (verify) of docs/learning-system.md.
//  - World facts: evidence from Wikipedia + the corpus, judged by the local model. Contradicted
//    claims are rejected and cost the teller trust; supported ones are promoted.
//  - Server lore (can't be checked online): similar claims are clustered by embedding, and a cluster
//    only passes once enough DIFFERENT, trusted people said it on different days.

import * as localLlmClient from '../localLlmClient';
import { processForSearch } from '../bm25Engine';
import { cosineSimilarity, searchKnowledgeGraph } from '../semanticEngine';
import { getAllKnowledge } from '../knowledgeBase';
import { executeUnifiedWebSearch } from '../webSearchEngine';
import {
  allClusters,
  Candidate,
  candidatesInCluster,
  getTrust,
  insertCluster,
  setCandidateCluster,
} from './store';

// ---- evidence -----------------------------------------------------------------------------------

export interface EvidenceItem {
  source: string;
  text: string;
}

function relevantSentences(text: string, claim: string, max = 3): string[] {
  const terms = new Set(processForSearch(claim).filter((t) => t.length > 2));
  const sentences = (text.match(/[^.!?]+(?:[.!?]+|$)/g) || []).map((s) => s.trim()).filter((s) => s.length > 20);
  return sentences
    .map((s, i) => ({ s, i, score: processForSearch(s).filter((t) => terms.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, max)
    .sort((a, b) => a.i - b.i)
    .map((x) => x.s);
}

export async function gatherEvidence(claim: string, subject: string): Promise<EvidenceItem[]> {
  const evidence: EvidenceItem[] = [];
  try {
    const web = await executeUnifiedWebSearch(subject && subject.length > 2 ? `${subject} ${claim}` : claim, { provider: 'all', limit: 3 });
    for (const r of web.results.slice(0, 3)) {
      const picked = relevantSentences(r.snippet || '', claim);
      if (picked.length) evidence.push({ source: r.title, text: picked.join(' ') });
    }
  } catch {
    // no web evidence
  }
  for (const hit of searchKnowledgeGraph(claim, getAllKnowledge(), 2)) {
    if (hit.item.category === 'learned') continue;
    const picked = relevantSentences(hit.item.content, claim);
    if (picked.length) evidence.push({ source: `corpus: ${hit.item.title}`, text: picked.join(' ') });
  }
  return evidence.slice(0, 5);
}

// ---- key facts: the parts of a claim that make it true or false --------------------------------

// Numbers (years, scores, counts) and names. "Spain won the 2026 World Cup" and "Argentina won the
// 2026 World Cup" embed as near-identical sentences, but their key facts differ.
export function keyFacts(claim: string): { numbers: Set<string>; names: Set<string> } {
  const numbers = new Set((claim.match(/\d+(?:[.,]\d+)?/g) || []).map((n) => n.replace(',', '.')));
  const STARTERS = new Set(['the', 'a', 'an', 'it', 'this', 'that', 'there', 'in', 'on', 'at', 'his', 'her', 'their', 'its']);
  const words = (claim.match(/\b[A-ZÀ-Ý][\p{L}'’-]+/gu) || []).filter((w, i) => !(i === 0 && claim.startsWith(w) && STARTERS.has(w.toLowerCase())));
  const names = new Set(words.map((w) => w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
  return { numbers, names };
}

function sameKeyFacts(a: string, b: string): boolean {
  const ka = keyFacts(a);
  const kb = keyFacts(b);
  const eq = (x: Set<string>, y: Set<string>) => x.size === y.size && [...x].every((v) => y.has(v));
  return eq(ka.numbers, kb.numbers) && eq(ka.names, kb.names);
}

// Every number in the claim must appear in the evidence — the small judge model says "supported"
// for a claim that matches the evidence except for the number ("Messi has won 12 Ballon d'Ors").
export function numbersBackedBy(claim: string, text: string): boolean {
  const normalized = text.replace(/,(\d{3})/g, '$1');
  return [...keyFacts(claim).numbers].every((n) => new RegExp(`(?<![\\d.])${n.replace('.', '\\.')}(?![\\d])`).test(normalized));
}

// ---- judge --------------------------------------------------------------------------------------

export type Verdict = 'supported' | 'contradicted' | 'not-enough-info';

const JUDGE_SYSTEM = `You are a strict fact-checker. Given a CLAIM and EVIDENCE excerpts, answer with ONE JSON object only:
{"verdict": "supported" | "contradicted" | "not-enough-info", "quote": "the exact evidence sentence that decides it, or empty"}
- "supported" only if the evidence clearly states the same fact (same thing, same numbers, same dates).
- "contradicted" if the evidence clearly states something incompatible.
- "not-enough-info" if the evidence is about something else, is vague, or only partly matches. When unsure, say "not-enough-info".`;

export async function judgeClaim(claim: string, evidence: EvidenceItem[]): Promise<{ verdict: Verdict; quote: string }> {
  if (evidence.length === 0) return { verdict: 'not-enough-info', quote: '' };
  const evidenceText = evidence.map((e, i) => `[${i + 1}] (${e.source}) ${e.text}`).join('\n');
  const result = await localLlmClient.generate(`CLAIM: ${claim}\n\nEVIDENCE:\n${evidenceText}\n\nJSON:`, {
    system: JUDGE_SYSTEM,
    temperature: 0,
    maxTokens: 160,
    think: false,
    skipLanguageCheck: true,
    model: localLlmClient.chatModel(),
    timeoutMs: 45000,
  });
  if (result.status !== 'success') return { verdict: 'not-enough-info', quote: '' };
  const m = result.text.replace(/```(?:json)?/gi, '').match(/\{[\s\S]*\}/);
  if (!m) return { verdict: 'not-enough-info', quote: '' };
  try {
    const o = JSON.parse(m[0]);
    const verdict: Verdict = o.verdict === 'supported' || o.verdict === 'contradicted' ? o.verdict : 'not-enough-info';
    const quote = typeof o.quote === 'string' ? o.quote.slice(0, 400) : '';
    // A "supported" with no quote that actually appears in the evidence is the judge guessing.
    if (verdict !== 'not-enough-info' && quote && !evidenceText.toLowerCase().includes(quote.toLowerCase().slice(0, 40))) {
      return { verdict: 'not-enough-info', quote: '' };
    }
    if (verdict === 'supported' && !quote) return { verdict: 'not-enough-info', quote: '' };
    if (verdict === 'supported' && !numbersBackedBy(claim, evidenceText)) return { verdict: 'not-enough-info', quote: '' };
    return { verdict, quote };
  } catch {
    return { verdict: 'not-enough-info', quote: '' };
  }
}

// A supported claim the hand-written corpus ALREADY states isn't worth learning — it'd just be a
// duplicate item competing in search.
export function isAlreadyInCorpus(quoteSource: string): boolean {
  return quoteSource.startsWith('corpus:');
}

// ---- clustering + corroboration ------------------------------------------------------------------

export const CLUSTER_SIMILARITY = 0.9;
export const CORROBORATION_MIN_PEOPLE = 3;
export const CORROBORATION_MIN_DAYS = 2;
export const CORROBORATION_MIN_TRUST = 0.35;

export async function embedClaim(claim: string): Promise<Float32Array | null> {
  const r = await localLlmClient.embed(claim);
  return r.status === 'success' ? new Float32Array(r.vector) : null;
}

// Puts the candidate in the cluster of the most similar existing claim, or starts a new one.
export async function assignCluster(candidate: Candidate): Promise<number> {
  const vec = await embedClaim(candidate.claim);
  let best: { id: number; score: number } | null = null;
  if (vec) {
    for (const c of allClusters()) {
      if (!c.embedding) continue;
      const score = cosineSimilarity(vec, c.embedding);
      if (score >= CLUSTER_SIMILARITY && sameKeyFacts(candidate.claim, c.claim) && (!best || score > best.score)) best = { id: c.id, score };
    }
  }
  const clusterId = best ? best.id : insertCluster(candidate.claim, vec);
  setCandidateCluster(candidate.id, clusterId);
  return clusterId;
}

export interface CorroborationStatus {
  people: number;
  days: number;
  passes: boolean;
}

export function corroborationFor(clusterId: number, isAdmin: (userHash: string) => boolean): CorroborationStatus {
  const members = candidatesInCluster(clusterId).filter((c) => c.status !== 'rejected');
  const trusted = members.filter((c) => isAdmin(c.userHash) || getTrust(c.userHash) >= CORROBORATION_MIN_TRUST);
  const people = new Set(trusted.map((c) => c.userHash)).size;
  const days = new Set(trusted.map((c) => new Date(c.createdAt).toISOString().slice(0, 10))).size;
  return { people, days, passes: people >= CORROBORATION_MIN_PEOPLE && days >= CORROBORATION_MIN_DAYS };
}
