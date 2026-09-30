// Sentence splitting that doesn't cut numbers in half. The old splitter (/[^.!?]+(?:[.!?]+|$)/g)
// broke at EVERY period, so "$1.41", "3.14" and "version 2.0" became "$1." + "41" — and the reply
// shortener, which re-joins sentences with a space, turned a live exchange rate into "$1. 41" (seen
// live 2026-09-30). A period only ends a sentence when whitespace or the end of the text follows it.
const SENTENCE_RE = /(?:[^.!?]|[.!?](?![\s"')\]]|$))+(?:[.!?]+["')\]]*|$)/g;

export function splitSentencesSafe(text: string, opts: { splitOnNewline?: boolean } = {}): string[] {
  const pieces = opts.splitOnNewline ? text.split(/\n+/) : [text];
  const out: string[] = [];
  for (const piece of pieces) {
    for (const m of piece.match(SENTENCE_RE) || [piece]) {
      const t = m.trim();
      if (t) out.push(t);
    }
  }
  return out;
}
