import { KnowledgeItem } from '../types';

/**
 * 80+ Bidirectional Domain Synonyms mapped across Physics, Chemistry, Biology,
 * Astronomy, Computer Science, History, Economics, Mathematics, Football, Discord, Daily Life, etc.
 */
export const SYNONYM_MAP: Record<string, string[]> = {
  // Physics
  veloc: ['speed', 'motion', 'rate', 'movement'],
  speed: ['veloc', 'rate', 'pace', 'rapidity'],
  forc: ['push', 'pull', 'strength', 'power', 'thrust'],
  energi: ['power', 'work', 'kinet', 'potenti'],
  atom: ['particl', 'molecul', 'element', 'nucleu'],
  quantum: ['quanta', 'wave', 'particl', 'uncertainti'],
  gravit: ['gravitation', 'weight', 'mass', 'newton'],
  light: ['photon', 'electromagnet', 'radiat', 'optic'],
  heat: ['temperatur', 'thermal', 'warm', 'thermodynam'],
  wave: ['frequenc', 'wavelength', 'oscil', 'vibrat'],
  magnet: ['electromagnet', 'field', 'pole', 'ferromagnet'],
  nuclear: ['atom', 'fission', 'fusion', 'radioact'],
  electron: ['particl', 'orbit', 'charg', 'atom'],
  pressur: ['forc', 'compres', 'atmospher', 'pascal'],
  friction: ['resist', 'drag', 'forc', 'surface'],

  // Chemistry
  element: ['atom', 'period', 'chemic', 'compound'],
  bond: ['chemic', 'coval', 'ion', 'molecul'],
  reaction: ['chemic', 'catalyt', 'acid', 'base'],
  acid: ['ph', 'hydrogen', 'proton', 'base'],
  gas: ['vapor', 'pressur', 'temperatur', 'volum'],
  compound: ['molecul', 'chemic', 'substanc', 'element'],
  metal: ['conduct', 'alloy', 'iron', 'steel'],
  organ: ['carbon', 'biolog', 'molecul', 'chemic'],

  // Biology
  cell: ['organism', 'biolog', 'membran', 'nucleu'],
  gene: ['dna', 'rna', 'chromosom', 'heredit', 'genet'],
  evolut: ['darwin', 'natur', 'selec', 'speci', 'adapt'],
  protein: ['enzym', 'amino', 'molecul', 'biolog'],
  brain: ['mind', 'neural', 'cognit', 'neuron', 'cortex'],
  heart: ['cardiac', 'blood', 'puls', 'cardiovascular'],
  dna: ['gene', 'rna', 'chromosom', 'heredit', 'nucleotid'],
  speci: ['organism', 'evolut', 'adapt', 'biolog'],
  virus: ['bacter', 'infect', 'pathogen', 'immun'],
  immun: ['antibodi', 'virus', 'defens', 'bodi'],

  // Astronomy
  planet: ['world', 'celesti', 'orbit', 'solar'],
  star: ['sun', 'stellar', 'solar', 'galaxi'],
  galaxi: ['univers', 'cosmos', 'milki', 'star'],
  space: ['univers', 'cosmos', 'vacuum', 'astronomi'],
  orbit: ['revolv', 'planet', 'gravit', 'path'],
  comet: ['asteroid', 'meteor', 'solar', 'orbit'],

  // Computer Science
  comput: ['machin', 'processor', 'cpu', 'hardwar'],
  algorithm: ['procedur', 'method', 'process', 'code'],
  code: ['program', 'softwar', 'algorithm', 'develop'],
  data: ['inform', 'knowledg', 'databas', 'storag'],
  internet: ['web', 'network', 'onlin', 'protocol'],
  encrypt: ['secur', 'cryptographi', 'hash', 'cipher'],
  network: ['internet', 'protocol', 'tcp', 'connect'],
  server: ['host', 'databas', 'cloud', 'comput'],
  softwar: ['program', 'applic', 'code', 'develop'],
  hardwar: ['cpu', 'gpu', 'chip', 'circuit'],

  // History & Politics
  war: ['conflict', 'battl', 'fight', 'militari'],
  democraci: ['govern', 'republic', 'polit', 'vote'],
  revolut: ['rebellion', 'upris', 'chang', 'reform'],
  empir: ['kingdom', 'coloni', 'conquest', 'rule'],
  histori: ['past', 'ancient', 'timelin', 'event'],
  coloni: ['empir', 'settl', 'conquest', 'teritori'],

  // Economics
  economi: ['market', 'financ', 'trade', 'gdp', 'wealth'],
  money: ['currenc', 'cash', 'financ', 'capit', 'bank'],
  tax: ['revenu', 'fiscal', 'govern', 'incom'],
  inflat: ['price', 'deflat', 'monetari', 'economi'],
  market: ['economi', 'trade', 'stock', 'financ'],
  invest: ['capit', 'profit', 'return', 'stock'],

  // Mathematics
  calcul: ['deriv', 'integr', 'limit', 'differenti'],
  statist: ['probabilit', 'distribut', 'mean', 'varianc'],
  equat: ['formula', 'solv', 'algebra', 'express'],
  prime: ['number', 'factor', 'divis', 'integer'],
  geometri: ['shape', 'area', 'volum', 'angle'],
  probabil: ['chanc', 'odds', 'random', 'statist'],

  // Football / Soccer
  goal: ['score', 'net', 'keeper', 'shot', 'finish'],
  footbal: ['soccer', 'ball', 'match', 'pitch', 'club'],
  player: ['footbal', 'striker', 'defend', 'midfild'],
  match: ['game', 'fixtur', 'play', 'competit'],
  penalti: ['foul', 'kick', 'referr', 'card'],
  tactic: ['format', 'strategi', 'press', 'posit'],
  champion: ['leagu', 'trophy', 'title', 'win'],
  offside: ['rule', 'linesman', 'referr', 'attack'],

  // Discord
  discord: ['server', 'channel', 'commun', 'guild'],
  bot: ['automat', 'command', 'prefix', 'mee6'],
  ban: ['kick', 'mute', 'timeout', 'moder'],
  nitro: ['premium', 'subscript', 'boost', 'perk'],
  raid: ['attack', 'spam', 'protect', 'raidshield'],
  moder: ['admin', 'ban', 'kick', 'rule'],
  channel: ['server', 'discord', 'text', 'voic'],
  scam: ['phish', 'fraud', 'fake', 'theft'],

  // Daily Life & Health
  shower: ['wash', 'bath', 'clean', 'hygien'],
  food: ['eat', 'meal', 'cook', 'nutrit'],
  sleep: ['rest', 'bed', 'insomnia', 'health'],
  cook: ['food', 'recip', 'meal', 'kitchen'],
  exercis: ['fit', 'workout', 'health', 'activ'],
  clean: ['wash', 'hygien', 'tidi', 'sanit'],
};

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'it', 'its',
  'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
  'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either', 'neither', 'not', 'only', 'than',
  'too', 'very', 'just', 'also', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'into',
  'through', 'during', 'before', 'after', 'to', 'from', 'up', 'down', 'as', 'if', 'then',
  'because', 'while', 'although', 'though', 'more', 'most', 'other', 'some', 'such', 'no',
  'any', 'each', 'every', 'all', 'few', 'many', 'much', 'same', 'own', 'out', 'off', 'over',
  'under', 'again', 'further', 'once', 'here', 'there', 'now', 'where', 'when', 'how',
  'beside', 'between', 'beyond', 'despite', 'except', 'inside', 'near', 'next',
  'since', 'toward', 'unless', 'until', 'upon', 'within', 'without', 'like', 'get', 'got',
  'make', 'take', 'go', 'come', 'see', 'know', 'think', 'say', 'tell', 'give', 'use', 'find',
]);

export function stem(word: string): string {
  let w = word.toLowerCase();
  const rules: [string, string, number][] = [
    ['ational', 'ate', 5], ['tional', 'tion', 5], ['ization', 'ize', 5],
    ['isation', 'ise', 5], ['ousness', 'ous', 5], ['iveness', 'ive', 5],
    ['fulness', 'ful', 5], ['nesses', '', 5], ['ments', '', 5],
    ['tions', 'tion', 5], ['ness', '', 4], ['ment', '', 4],
    ['tion', '', 4], ['sion', '', 4], ['ous', '', 4], ['ive', '', 4],
    ['ful', '', 4], ['ize', '', 4], ['ise', '', 4], ['ary', '', 4],
    ['ery', '', 4], ['ory', '', 4], ['ism', '', 4], ['ist', '', 4],
    ['ing', '', 4], ['ial', '', 4], ['ical', '', 4],
    ['al', '', 5], ['ly', '', 5], ['er', '', 5], ['ed', '', 4],
    ['es', '', 4], ['s', '', 5],
  ];

  for (const [suffix, replacement, minLen] of rules) {
    if (w.endsWith(suffix) && w.length - suffix.length >= minLen) {
      w = w.slice(0, -suffix.length) + replacement;
      break;
    }
  }
  return w;
}

export function tokenizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+(?=[A-Z0-9"'])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function processForSearch(text: string): string[] {
  const words = tokenizeWords(text);
  return words
    .filter((w) => !STOP_WORDS.has(w) && w.length > 1 && !/^\d+$/.test(w))
    .map((w) => stem(w));
}

export function expandQuerySynonyms(terms: string[]): string[] {
  const result = new Set<string>(terms);
  for (const t of terms) {
    if (SYNONYM_MAP[t]) {
      for (const syn of SYNONYM_MAP[t]) {
        result.add(syn);
      }
    }
  }
  return Array.from(result);
}

export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function correctTypos(terms: string[], vocabulary: Set<string>): string[] {
  return terms.map((term) => {
    if (vocabulary.has(term) || term.length <= 3 || /^\d+$/.test(term)) {
      return term;
    }

    const candidates = Array.from(vocabulary).filter((v) => Math.abs(v.length - term.length) <= 2);
    let bestTerm = term;
    let bestDist = 3;

    for (const cand of candidates) {
      const d = levenshteinDistance(term, cand);
      if (d < bestDist) {
        bestDist = d;
        bestTerm = cand;
      }
    }
    return bestTerm;
  });
}

export interface BM25ScoredItem {
  item: KnowledgeItem;
  score: number;
  snippet: string;
  relevantSentences: string[];
}

export class BM25Engine {
  private documents: KnowledgeItem[] = [];
  private termFrequencies: Map<string, number>[] = [];
  private documentFrequencies: Map<string, number> = new Map();
  private avgDocLength: number = 0;
  private totalDocLength: number = 0;
  private entityIndex: Map<string, number[]> = new Map();

  private readonly k1: number = 1.5;
  private readonly b: number = 0.75;
  private readonly titleBoost: number = 3;
  private readonly tagBoost: number = 2;
  private readonly categoryBoost: number = 1;
  private readonly bigramWeight: number = 1.5;

  constructor(initialDocs?: KnowledgeItem[]) {
    if (initialDocs && initialDocs.length > 0) {
      this.rebuild(initialDocs);
    }
  }

  public get count(): number {
    return this.documents.length;
  }

  public get allDocs(): KnowledgeItem[] {
    return this.documents;
  }

  public get vocabulary(): Set<string> {
    const vocab = new Set<string>();
    for (const key of this.documentFrequencies.keys()) {
      if (!key.includes('~')) {
        vocab.add(key);
      }
    }
    return vocab;
  }

  public addDocument(doc: KnowledgeItem): void {
    const docIdx = this.documents.length;
    this.indexEntityTitle(doc.title, docIdx);
    for (const kw of doc.keywords) {
      this.indexEntityPhrase(kw, docIdx);
    }

    const baseTitle = processForSearch(doc.title);
    const baseTags = doc.keywords.flatMap((k) => processForSearch(k));
    const baseContent = processForSearch(doc.content);
    const baseCategory = processForSearch(doc.category);

    const titleTerms = Array(this.titleBoost).fill(baseTitle).flat();
    const tagTerms = Array(this.tagBoost).fill(baseTags).flat();
    const allTerms = [...titleTerms, ...tagTerms, ...baseContent, ...baseCategory];

    const titleBigrams = this.makeBigrams(baseTitle);
    const tagBigrams = this.makeBigrams(baseTags);
    const contentBigrams = this.makeBigrams(baseContent);
    const allBigrams = [...titleBigrams, ...tagBigrams, ...contentBigrams];

    const tf = new Map<string, number>();
    for (const t of allTerms) {
      tf.set(t, (tf.get(t) || 0) + 1);
    }
    for (const bg of titleBigrams) {
      tf.set(bg, (tf.get(bg) || 0) + this.bigramWeight * this.titleBoost);
    }
    for (const bg of tagBigrams) {
      tf.set(bg, (tf.get(bg) || 0) + this.bigramWeight * this.tagBoost);
    }
    for (const bg of contentBigrams) {
      tf.set(bg, (tf.get(bg) || 0) + this.bigramWeight);
    }

    for (const t of new Set(allTerms)) {
      this.documentFrequencies.set(t, (this.documentFrequencies.get(t) || 0) + 1);
    }
    for (const bg of new Set(allBigrams)) {
      this.documentFrequencies.set(bg, (this.documentFrequencies.get(bg) || 0) + 1);
    }

    this.documents.push(doc);
    this.termFrequencies.push(tf);
    let docTermCount = 0;
    for (const v of tf.values()) docTermCount += v;
    this.totalDocLength += docTermCount;
    this.avgDocLength = this.totalDocLength / this.documents.length;
  }

  public rebuild(docs: KnowledgeItem[]): void {
    this.documents = [];
    this.termFrequencies = [];
    this.documentFrequencies = new Map();
    this.entityIndex = new Map();
    this.avgDocLength = 0;
    this.totalDocLength = 0;

    for (const doc of docs) {
      this.addDocument(doc);
    }
  }

  public search(
    query: string,
    topK: number = 8,
    expandSynonyms: boolean = true,
    recentlyCitedDocIds?: Set<string>
  ): BM25ScoredItem[] {
    if (this.documents.length === 0) return [];

    let queryTerms = processForSearch(query);
    if (expandSynonyms) {
      queryTerms = expandQuerySynonyms(queryTerms);
    }
    queryTerms = correctTypos(queryTerms, this.vocabulary);

    if (queryTerms.length === 0) return [];

    const queryBigrams = this.makeBigrams(queryTerms);
    const allQueryTerms = [...queryTerms, ...queryBigrams];

    const scored: { idx: number; score: number }[] = [];
    for (let i = 0; i < this.termFrequencies.length; i++) {
      const s = this.bm25(this.termFrequencies[i], allQueryTerms);
      if (s > 0) {
        scored.push({ idx: i, score: s });
      }
    }

    // Direct Entity Index phrase boosting
    const entityBoosts = this.entityBoostMap(query);
    const scoreMap = new Map<number, number>();
    for (const item of scored) {
      scoreMap.set(item.idx, item.score);
    }
    for (const [idx, bonus] of entityBoosts.entries()) {
      scoreMap.set(idx, (scoreMap.get(idx) || 0) + bonus);
    }

    // Context boost for recently cited documents (+15%)
    if (recentlyCitedDocIds && recentlyCitedDocIds.size > 0) {
      for (let i = 0; i < this.documents.length; i++) {
        if (recentlyCitedDocIds.has(this.documents[i].id)) {
          const current = scoreMap.get(i) || 0;
          if (current > 0) {
            scoreMap.set(i, current * 1.15);
          }
        }
      }
    }

    const mergedScored: { idx: number; score: number }[] = [];
    for (const [idx, score] of scoreMap.entries()) {
      mergedScored.push({ idx, score });
    }
    mergedScored.sort((a, b) => b.score - a.score);

    // TF-IDF Cosine Reranking on candidate pool (2x topK)
    const candidates = mergedScored.slice(0, topK * 2);
    const reranked = this.rerankWithTFIDF(candidates, queryTerms);

    return reranked.slice(0, topK).map((entry) => {
      const doc = this.documents[entry.idx];
      const snippet = this.bestSnippet(doc.content, queryTerms);
      const sentences = this.bm25Sentences(doc, queryTerms, 4);
      return {
        item: doc,
        score: parseFloat(entry.score.toFixed(3)),
        snippet,
        relevantSentences: sentences,
      };
    });
  }

  public bm25Sentences(document: KnowledgeItem, queryTerms: string[], count: number = 4): string[] {
    const sents = splitSentences(document.content);
    if (sents.length === 0 || queryTerms.length === 0) return [];

    const sentK1 = 1.2;
    const sentB = 0.4;
    const avgSentLen = 20.0;

    const scored: { text: string; score: number }[] = sents.map((sentence) => {
      const terms = processForSearch(sentence);
      const dl = Math.max(terms.length, 1);
      const tf = new Map<string, number>();
      for (const t of terms) {
        tf.set(t, (tf.get(t) || 0) + 1);
      }

      let score = 0;
      const uniqueQuery = Array.from(new Set(queryTerms));
      for (const term of uniqueQuery) {
        const freq = tf.get(term) || 0;
        if (freq > 0) {
          const idfVal = this.idf(term);
          const norm = sentK1 * (1 - sentB + (sentB * dl) / avgSentLen);
          score += (idfVal * freq * (sentK1 + 1)) / (freq + norm);
        }
      }
      return { text: sentence, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((s) => s.text);
  }

  private makeBigrams(terms: string[]): string[] {
    if (terms.length <= 1) return [];
    const bigrams: string[] = [];
    for (let i = 0; i < terms.length - 1; i++) {
      bigrams.push(`${terms[i]}~${terms[i + 1]}`);
    }
    return bigrams;
  }

  private normaliseEntityKey(s: string): string {
    return s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .join(' ');
  }

  private indexEntityTitle(title: string, docIdx: number): void {
    const words = this.normaliseEntityKey(title).split(' ').filter((w) => w.length > 0);
    const full = words.join(' ');
    if (full.length >= 2) {
      if (!this.entityIndex.has(full)) this.entityIndex.set(full, []);
      this.entityIndex.get(full)!.push(docIdx);
    }
    for (const size of [2, 3]) {
      if (words.length > size) {
        for (let start = 0; start <= words.length - size; start++) {
          const phrase = words.slice(start, start + size).join(' ');
          if (!this.entityIndex.has(phrase)) this.entityIndex.set(phrase, []);
          this.entityIndex.get(phrase)!.push(docIdx);
        }
      }
    }
  }

  private indexEntityPhrase(phrase: string, docIdx: number): void {
    const key = this.normaliseEntityKey(phrase);
    if (key.length >= 2) {
      if (!this.entityIndex.has(key)) this.entityIndex.set(key, []);
      this.entityIndex.get(key)!.push(docIdx);
    }
  }

  private entityBoostMap(rawQuery: string): Map<number, number> {
    const words = rawQuery
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 0);

    const boosts = new Map<number, number>();
    if (words.length === 0) return boosts;

    for (let windowSize = Math.min(3, words.length); windowSize >= 1; windowSize--) {
      for (let start = 0; start <= words.length - windowSize; start++) {
        const phrase = words.slice(start, start + windowSize).join(' ');
        const indices = this.entityIndex.get(phrase);
        if (indices) {
          const bonus = windowSize * 2.0; // 2pt for 1 word, 4pt for 2 words, 6pt for 3 words
          for (const idx of indices) {
            boosts.set(idx, Math.max(boosts.get(idx) || 0, bonus));
          }
        }
      }
    }
    return boosts;
  }

  private rerankWithTFIDF(
    candidates: { idx: number; score: number }[],
    queryTerms: string[]
  ): { idx: number; score: number }[] {
    if (candidates.length <= 1) return candidates;
    const maxBM25 = candidates[0].score || 1.0;

    const queryTF = new Map<string, number>();
    for (const t of queryTerms) {
      queryTF.set(t, (queryTF.get(t) || 0) + 1);
    }
    const queryVec = this.tfidfVector(queryTF, queryTerms.length);
    const queryNorm = this.l2Norm(queryVec);

    const reranked = candidates.map(({ idx, score: bm25Score }) => {
      const docCounts = this.termFrequencies[idx];
      let docTotal = 0;
      for (const val of docCounts.values()) docTotal += val;

      const docVec = this.tfidfVector(docCounts, docTotal);
      const docNorm = this.l2Norm(docVec);

      let cosine = 0;
      if (queryNorm > 0 && docNorm > 0) {
        let dot = 0;
        for (const [key, qVal] of queryVec.entries()) {
          const dVal = docVec.get(key) || 0;
          dot += qVal * dVal;
        }
        cosine = dot / (queryNorm * docNorm);
      }

      const normBM25 = bm25Score / Math.max(maxBM25, 1e-9);
      const blended = 0.65 * normBM25 + 0.35 * cosine;
      return {
        idx,
        score: blended * maxBM25,
      };
    });

    return reranked.sort((a, b) => b.score - a.score);
  }

  private tfidfVector(counts: Map<string, number>, totalTerms: number): Map<string, number> {
    const vec = new Map<string, number>();
    for (const [term, count] of counts.entries()) {
      const tf = count / Math.max(totalTerms, 1);
      const idfVal = this.idf(term);
      if (idfVal > 0) {
        vec.set(term, tf * idfVal);
      }
    }
    return vec;
  }

  private l2Norm(vec: Map<string, number>): number {
    let sumSq = 0;
    for (const val of vec.values()) {
      sumSq += val * val;
    }
    return Math.sqrt(sumSq);
  }

  private bm25(tf: Map<string, number>, queryTerms: string[]): number {
    let dl = 0;
    for (const v of tf.values()) dl += v;

    let score = 0;
    const uniqueTerms = Array.from(new Set(queryTerms));
    for (const term of uniqueTerms) {
      const freq = tf.get(term) || 0;
      if (freq > 0) {
        const idfVal = this.idf(term);
        const norm = this.k1 * (1 - this.b + (this.b * dl) / Math.max(this.avgDocLength, 1));
        score += (idfVal * freq * (this.k1 + 1)) / (freq + norm);
      }
    }
    return score;
  }

  private idf(term: string): number {
    const df = this.documentFrequencies.get(term) || 0;
    const n = this.documents.length;
    return Math.log((n - df + 0.5) / (df + 0.5) + 1.0);
  }

  private bestSnippet(content: string, queryTerms: string[], maxChars: number = 280): string {
    const words = content.split(/\s+/);
    const win = Math.min(40, words.length);
    let bestStart = 0;
    let maxHits = 0;

    for (let i = 0; i <= Math.max(0, words.length - win); i++) {
      const chunk = words.slice(i, i + win).join(' ').toLowerCase();
      let hits = 0;
      for (const t of queryTerms) {
        if (chunk.includes(t)) hits++;
      }
      if (hits > maxHits) {
        maxHits = hits;
        bestStart = i;
      }
    }

    let snippet = words.slice(bestStart, Math.min(bestStart + win, words.length)).join(' ');
    if (snippet.length > maxChars) {
      snippet = snippet.slice(0, maxChars) + '…';
    }
    return snippet;
  }

}
