/**
 * Subword Tokenizer & Lexical Analyzer for Custom AI Engine
 */

export interface TokenItem {
  id: number;
  text: string;
  position: number;
  type: 'word' | 'punct' | 'whitespace' | 'subword' | 'special';
  weight: number;
}

// Deterministic hashing for token IDs
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % 32000;
}

export function tokenize(text: string): TokenItem[] {
  if (!text) return [];

  // Match words, numbers, underscores, punctuation, spaces. Underscore is a \w character, so
  // without its own alternative it matched neither the letters/digits branches nor the
  // "non-word" punctuation branch — match() just silently dropped it from the output entirely,
  // shrinking every downstream token's `position` by 1 for each underscore in identifiers like
  // "my_variable" (breaking anything that reconstructs offsets from `position`).
  const regex = /([A-Za-z]+|[0-9]+|_+|[^\s\w]+|\s+)/g;
  const matches = text.match(regex) || [];
  let currentPos = 0;

  const rawTokens: { text: string; position: number; type: TokenItem['type']; isWhitespace: boolean }[] = [];
  for (const chunk of matches) {
    const isWhitespace = /^\s+$/.test(chunk);
    let type: TokenItem['type'] = 'word';
    if (isWhitespace) {
      type = 'whitespace';
    } else if (/^[^\s\w]+$/.test(chunk)) {
      type = 'punct';
    } else if (chunk.length > 8) {
      type = 'subword';
    }
    rawTokens.push({ text: chunk, position: currentPos, type, isWhitespace });
    currentPos += chunk.length;
  }

  // Filter out whitespace for self-attention dot-product matrix calculation
  const contentTokens = rawTokens.filter((t) => !t.isWhitespace);
  const n = contentTokens.length;

  // WH-question words determine the *type* of question being asked, not just filler around
  // it — "how are you doing" is a greeting, "what are you doing" asks about a current activity,
  // and the only thing that distinguishes them is this one word. Lumping "how"/"what"/"why" in
  // with true low-information filler ("the", "a", "of") meant both questions produced nearly
  // identical heatmaps, with the actually-distinguishing word buried at the bottom of the scale
  // right alongside "are". They get their own mid-tier weight instead.
  const questionWords = new Set(['how', 'what', 'why', 'who', 'when', 'where', 'which']);

  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'about', 'and', 'or', 'but', 'so', 'it', 'this', 'that', 'does',
    'can', 'could', 'would', 'do', 'did'
  ]);

  // Scaled dot-product self-attention simulation across token embeddings
  const attentionWeights = new Array(n).fill(0);
  if (n > 0) {
    const d_k = 4;
    // Generate pseudo embedding vectors
    const embeddings = contentTokens.map((t) => {
      const lower = t.text.toLowerCase();
      const vec = [0, 0, 0, 0];
      for (let i = 0; i < lower.length; i++) {
        vec[i % 4] += lower.charCodeAt(i);
      }
      const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0)) || 1;
      return vec.map((v) => v / norm);
    });

    for (let i = 0; i < n; i++) {
      const rowScores: number[] = [];
      for (let j = 0; j < n; j++) {
        const dot = embeddings[i].reduce((sum, val, idx) => sum + val * embeddings[j][idx], 0);
        let score = dot / Math.sqrt(d_k);
        const lowerJ = contentTokens[j].text.toLowerCase();
        if (contentTokens[j].type === 'punct') {
          score *= 0.1;
        } else if (questionWords.has(lowerJ)) {
          score *= 1.1;
        } else if (stopWords.has(lowerJ)) {
          score *= 0.3;
        } else {
          score *= 1.4;
          if (lowerJ.length >= 6) score += 0.3;
        }
        rowScores.push(score);
      }
      // Softmax
      const maxScore = Math.max(...rowScores);
      const exps = rowScores.map((s) => Math.exp(s - maxScore));
      const sumExps = exps.reduce((a, b) => a + b, 0) || 1;
      for (let j = 0; j < n; j++) {
        attentionWeights[j] += exps[j] / sumExps;
      }
    }
  }

  const maxAttn = Math.max(...attentionWeights, 0.001);
  const minAttn = Math.min(...attentionWeights);
  const range = maxAttn - minAttn || 1;

  let contentIdx = 0;
  return rawTokens.map((t) => {
    let weight = 0.1;
    if (!t.isWhitespace && n > 0) {
      const raw = attentionWeights[contentIdx++];
      const norm = (raw - minAttn) / range;
      const lower = t.text.toLowerCase();
      if (t.type === 'punct') {
        weight = 0.08;
      } else if (questionWords.has(lower)) {
        // Distinct mid-tier: clearly above true filler stopwords, since this word alone can
        // change what's being asked, but generally below a full topic/content word.
        weight = Math.max(0.4, Math.min(0.85, 0.35 + norm * 0.5));
      } else if (stopWords.has(lower)) {
        weight = Math.min(0.25, 0.1 + norm * 0.2);
      } else {
        weight = Math.max(0.45, Math.min(1.0, 0.4 + norm * 0.6));
      }
    }

    return {
      id: simpleHash(t.text.trim() || 'ws') + 100,
      text: t.text,
      position: t.position,
      type: t.type,
      weight: parseFloat(weight.toFixed(3)),
    };
  });
}

export function countTokens(text: string): number {
  return tokenize(text).length;
}

export function estimateEntropy(tokens: TokenItem[]): number {
  if (tokens.length === 0) return 0;
  const freq: Record<string, number> = {};
  tokens.forEach((t) => {
    const key = t.text.toLowerCase().trim();
    if (key) freq[key] = (freq[key] || 0) + 1;
  });

  const total = Object.values(freq).reduce((a, b) => a + b, 0);
  let entropy = 0;
  Object.values(freq).forEach((count) => {
    const p = count / total;
    entropy -= p * Math.log2(p);
  });
  return parseFloat(entropy.toFixed(3));
}
