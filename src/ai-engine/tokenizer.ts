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

  // Match words, numbers, punctuation, spaces
  const regex = /([A-Za-z]+|[0-9]+|[^\s\w]+|\s+)/g;
  const matches = text.match(regex) || [];
  let currentPos = 0;

  return matches.map((chunk, index) => {
    let type: TokenItem['type'] = 'word';
    if (/^\s+$/.test(chunk)) {
      type = 'whitespace';
    } else if (/^[^\s\w]+$/.test(chunk)) {
      type = 'punct';
    } else if (chunk.length > 8) {
      type = 'subword';
    }

    const token: TokenItem = {
      id: simpleHash(chunk.trim() || 'ws') + 100,
      text: chunk,
      position: currentPos,
      type,
      weight: 0.5 + (Math.sin(index * 1.3) * 0.4 + 0.1),
    };
    currentPos += chunk.length;
    return token;
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
