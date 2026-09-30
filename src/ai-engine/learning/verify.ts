// Step 5 (verify) of docs/learning-system.md.
//  - World facts: evidence from Wikipedia + the corpus, judged by the local model. Contradicted
//    claims are rejected and cost the teller trust; supported ones are promoted.
//  - Server lore (can't be checked online): similar claims are clustered by embedding, and a cluster
//    only passes once enough DIFFERENT, trusted people said it on different days.

import { learningEmbed, learningGenerate } from './llm';
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

// Sentences that state an outcome/holder — for a QUESTION, the answer sentence often shares fewer
// words with it than the article's generic opening does ("who won the 2026 world cup" matched "The
// 2026 FIFA World Cup was the 23rd FIFA World Cup..." over "...concluded on July 19 with Spain
// winning the championship"). Answer cues and names the question doesn't already contain count too.
const ANSWER_CUE_RE =
  /\b(?:won|wins|winning|winner|defeat(?:ed|ing)?|beat|champion(?:s|ship)?|current(?:ly)?|is the|was the|became|elected|appointed|succeeded|holds?|released|founded|created|invented|died|born|stolen|arrested|located|capital)\b/i;

export function relevantSentences(text: string, claim: string, max = 3): string[] {
  const terms = new Set(processForSearch(claim).filter((t) => t.length > 2));
  const claimNames = keyFacts(claim).names;
  const isQuestion = /\?\s*$|^(?:who|what|when|where|which|how|is|are|was|were|did|does)\b/i.test(claim.trim());
  const sentences = (text.match(/[^.!?]+(?:[.!?]+|$)/g) || []).map((s) => s.trim()).filter((s) => s.length > 20);
  const scoreOf = (s: string) => {
    // Distinct terms — an opening sentence repeating "World Cup" twice isn't twice as relevant.
    const overlap = new Set(processForSearch(s).filter((t) => terms.has(t))).size;
    if (!isQuestion || overlap === 0) return overlap;
    // For a question the article is already on-topic; what matters is whether the sentence looks
    // like an ANSWER: an outcome/holder verb and names the question didn't already contain.
    const newNames = [...keyFacts(s).names].filter((n) => !claimNames.has(n)).length;
    return 1 + (ANSWER_CUE_RE.test(s) ? 2 : 0) + Math.min(newNames, 3);
  };
  return sentences
    .map((s, i) => ({ s, i, score: scoreOf(s) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, max)
    .sort((a, b) => a.i - b.i)
    .map((x) => x.s);
}

// Subject first ("2026 World Cup" finds the right article), then the claim itself as a fallback —
// gluing the two into one long query was a weak Wikipedia search.
export async function gatherEvidence(claim: string, subject: string): Promise<EvidenceItem[]> {
  const evidence: EvidenceItem[] = [];
  const queries = [...new Set([subject && subject.length > 2 ? subject : '', claim].filter(Boolean))];
  for (const query of queries) {
    try {
      const web = await executeUnifiedWebSearch(query, { provider: 'all', limit: 3 });
      for (const r of web.results.slice(0, 3)) {
        if (evidence.some((e) => e.source === r.title)) continue;
        const picked = relevantSentences(r.snippet || '', claim);
        if (picked.length) evidence.push({ source: r.title, text: picked.join(' ') });
      }
    } catch {
      // no web evidence from this query
    }
    if (evidence.length >= 2) break;
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
// Spelled-out numbers become digits before any number check — live, "water boils at 50 degrees" was
// rewritten as "Water boils at one hundred degrees Celsius", which slipped past digit-only checks.
const SMALL_NUMBERS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
  // French, so a translation's numbers can be compared with the original ("huit" = "eight" = 8).
  // "un/une" are left out on purpose — they're mostly articles.
  deux: 2, trois: 3, quatre: 4, cinq: 5, sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12,
  treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60,
};
const MULTIPLIERS: Record<string, number> = {
  hundred: 100, thousand: 1000, million: 1_000_000, billion: 1_000_000_000,
  cent: 100, cents: 100, mille: 1000, millions: 1_000_000, milliard: 1_000_000_000, milliards: 1_000_000_000,
};

export function normalizeNumberWords(text: string): string {
  const word = `(?:${[...Object.keys(SMALL_NUMBERS), ...Object.keys(MULTIPLIERS)].join('|')})`;
  const run = new RegExp(`\\b${word}(?:(?:[\\s-]+|\\s+and\\s+)${word})*\\b`, 'gi');
  const spelled = text.replace(run, (m) => {
    // A lone "million"/"hundred" (after digits, or as a noun) isn't a spelled number by itself.
    if (!m.toLowerCase().split(/[\s-]+/).some((w) => w in SMALL_NUMBERS)) return m;
    let total = 0;
    let current = 0;
    for (const w of m.toLowerCase().split(/[\s-]+/).filter((x) => x && x !== 'and')) {
      if (w in SMALL_NUMBERS) current += SMALL_NUMBERS[w];
      else if (w === 'hundred' || w === 'cent' || w === 'cents') current = (current || 1) * 100;
      else {
        total += (current || 1) * MULTIPLIERS[w];
        current = 0;
      }
    }
    return String(total + current);
  });
  // "88 million" and "eighty-eight million" must end up identical: expand digit + multiplier too.
  return spelled.replace(/(\d+(?:[.,]\d+)?)\s*(thousand|million|billion|mille|millions|milliards?)\b/gi, (_m, n: string, mult: string) =>
    String(Math.round(parseFloat(n.replace(',', '.')) * MULTIPLIERS[mult.toLowerCase()]))
  );
}

export function keyFacts(claim: string): { numbers: Set<string>; names: Set<string> } {
  const numbers = new Set((normalizeNumberWords(claim).match(/\d+(?:[.,]\d+)?/g) || []).map((n) => n.replace(',', '.')));
  const STARTERS = new Set(['the', 'a', 'an', 'it', 'this', 'that', 'there', 'in', 'on', 'at', 'his', 'her', 'their', 'its']);
  const words = (claim.match(/\b[A-ZÀ-Ý][\p{L}'’-]+/gu) || []).filter((w, i) => !(i === 0 && claim.startsWith(w) && STARTERS.has(w.toLowerCase())));
  const names = new Set(words.map((w) => w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
  return { numbers, names };
}

export function sameKeyFacts(a: string, b: string): boolean {
  const ka = keyFacts(a);
  const kb = keyFacts(b);
  const eq = (x: Set<string>, y: Set<string>) => x.size === y.size && [...x].every((v) => y.has(v));
  return eq(ka.numbers, kb.numbers) && eq(ka.names, kb.names);
}

// Every number in the claim must appear in the evidence — the small judge model says "supported"
// for a claim that matches the evidence except for the number ("Messi has won 12 Ballon d'Ors").
export function numbersBackedBy(claim: string, text: string): boolean {
  const normalized = normalizeNumberWords(text).replace(/,(\d{3})/g, '$1');
  return [...keyFacts(claim).numbers].every((n) => new RegExp(`(?<![\\d.])${n.replace('.', '\\.')}(?![\\d])`).test(normalized));
}

// The judge re-types its quote and small models drift at the edges ("M. Mark Carney is the current
// prime minister..." for evidence reading "Mark Carney is the current prime minister..."), so an
// exact-prefix match threw away correct verdicts. Instead: 85%+ of the quote's words must appear, in
// order, inside one stretch of the evidence — still impossible for a quote the judge made up.
export function quoteComesFrom(quote: string, evidenceText: string): boolean {
  const words = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z0-9]+/g) || [];
  const q = words(quote);
  const e = words(evidenceText);
  if (q.length < 4) return false;
  let best = 0;
  for (let start = 0; start < e.length; start++) {
    if (e[start] !== q[0] && e[start] !== q[1]) continue;
    let qi = 0;
    let matched = 0;
    for (let ei = start; ei < Math.min(e.length, start + q.length * 2) && qi < q.length; ei++) {
      if (e[ei] === q[qi]) {
        matched++;
        qi++;
      } else if (qi + 1 < q.length && e[ei] === q[qi + 1]) {
        matched++;
        qi += 2;
      }
    }
    best = Math.max(best, matched / q.length);
  }
  return best >= 0.85;
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
  const text = await learningGenerate(`CLAIM: ${claim}\n\nEVIDENCE:\n${evidenceText}\n\nJSON:`, { system: JUDGE_SYSTEM, temperature: 0, maxTokens: 160 });
  if (text === null) return { verdict: 'not-enough-info', quote: '' };
  const m = text.replace(/```(?:json)?/gi, '').match(/\{[\s\S]*\}/);
  if (!m) return { verdict: 'not-enough-info', quote: '' };
  try {
    const o = JSON.parse(m[0]);
    const verdict: Verdict = o.verdict === 'supported' || o.verdict === 'contradicted' ? o.verdict : 'not-enough-info';
    const quote = typeof o.quote === 'string' ? o.quote.slice(0, 400) : '';
    // A "supported" with no quote that actually appears in the evidence is the judge guessing.
    if (verdict !== 'not-enough-info' && quote && !quoteComesFrom(quote, evidenceText)) {
      return { verdict: 'not-enough-info', quote: '' };
    }
    if (verdict === 'supported' && !quote) return { verdict: 'not-enough-info', quote: '' };
    if (verdict === 'supported' && !numbersBackedBy(claim, evidenceText)) return { verdict: 'not-enough-info', quote: '' };
    return { verdict, quote };
  } catch {
    return { verdict: 'not-enough-info', quote: '' };
  }
}

// The judge is a small model; one answer can be a fluke of how the evidence was ordered. Ask twice,
// the second time with the evidence reversed: "supported" only if BOTH say so (same quote rules),
// "contradicted" only if one says so and the other doesn't support it.
// A plain supported/unsure split gets a third run (evidence rotated) as tie-breaker — the small judge
// sometimes misses a clearly-stated fact on one ordering (live: "Mark Carney is the current prime
// minister of Canada" came back supported, then not-enough-info). Any "contradicted" in the mix
// without a clear supported majority still means no.
export async function judgeClaimTwice(claim: string, evidence: EvidenceItem[]): Promise<{ verdict: Verdict; quote: string }> {
  const first = await judgeClaim(claim, evidence);
  if (first.verdict === 'not-enough-info' || evidence.length === 0) return first;
  const second = await judgeClaim(claim, [...evidence].reverse());
  if (first.verdict === second.verdict) return first;
  if (first.verdict === 'contradicted' && second.verdict !== 'supported') return first;
  if (second.verdict === 'contradicted' && first.verdict !== 'supported') return second;
  if (first.verdict === 'supported' && second.verdict === 'not-enough-info' && evidence.length > 1) {
    const rotated = [...evidence.slice(1), evidence[0]];
    const third = await judgeClaim(claim, rotated);
    if (third.verdict === 'supported') return first;
  }
  return { verdict: 'not-enough-info', quote: '' };
}

// ---- answer a question from evidence -------------------------------------------------------------

const ANSWER_SYSTEM = `You turn a question plus evidence into ONE standalone fact sentence, written in English. Use ONLY the evidence: names, numbers and dates exactly as written there, nothing from memory. The sentence must make sense on its own (no "it"/"they" without saying who). If the evidence does not clearly answer the question, reply exactly: NONE`;

export async function writeAnswerClaim(question: string, evidence: EvidenceItem[]): Promise<string | null> {
  if (evidence.length === 0) return null;
  const evidenceText = evidence.map((e, i) => `[${i + 1}] (${e.source}) ${e.text}`).join('\n');
  const text = await learningGenerate(`QUESTION: ${question}\n\nEVIDENCE:\n${evidenceText}\n\nFACT:`, { system: ANSWER_SYSTEM, temperature: 0, maxTokens: 90 });
  if (text === null) return null;
  const claim = text.replace(/^["'\s]+|["'\s]+$/g, '').split('\n')[0].trim();
  if (!claim || /^none\b/i.test(claim) || claim.length < 15 || claim.length > 300) return null;
  // Numbers must come from the evidence, not the model's memory.
  if (!numbersBackedBy(claim, evidenceText)) return null;
  return claim;
}

// ---- usefulness ---------------------------------------------------------------------------------

// A true fact everyone already knows ("water boils at 100°C", "Paris is in France") is noise in the
// learned corpus: it competes in search with nothing to add. Worth learning = recent, specific,
// niche, or about this community.
const BASIC_SYSTEM = `Decide if a fact is basic common knowledge that almost any adult or a general encyclopedia intro would state (e.g. "Paris is the capital of France", "water boils at 100°C at sea level", "the Earth orbits the Sun"). Recent events, specific numbers/dates, niche topics, games, sports results, internet culture and community facts are NOT basic. Reply with ONE JSON object only: {"basic": true|false}`;

export async function isTooBasicToLearn(claim: string): Promise<boolean> {
  const text = await learningGenerate(`FACT: ${claim}\nJSON:`, { system: BASIC_SYSTEM, temperature: 0, maxTokens: 30 });
  if (!text) return false;
  const m = text.replace(/```(?:json)?/gi, '').match(/\{[\s\S]*\}/);
  try {
    return JSON.parse(m?.[0] || '{}').basic === true;
  } catch {
    return false;
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

export async function embedClaim(claim: string): Promise<Float32Array> {
  return learningEmbed(claim);
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
