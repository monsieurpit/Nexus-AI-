import { Lexer } from "./lexer";
import type { Token } from "./token";

const OPENERS = new Set(["{", "[", "("]);
const CLOSERS = new Set(["}", "]", ")"]);

/**
 * Tidies PitCode source: indents by two spaces per open bracket, lines starting
 * with `.` get one extra level (method chains), trailing spaces go, runs of blank
 * lines shrink to one, and the file ends with a single line break.
 * Text inside multi-line strings and block comments is left exactly as written.
 * Throws a PitError if the code can't be read.
 */
export function format(source: string, indentUnit = "  "): string {
  const shebang = /^#!.*(\r?\n|$)/.exec(source)?.[0];
  const body = shebang ? source.slice(shebang.length) : source;
  const tokens = new Lexer(body).tokenize();
  const lines = body.split(/\r?\n/);

  // Lines that must be copied as they are (inside a multi-line string or block comment).
  const frozen = new Set<number>();
  for (const t of tokens) {
    const extra = t.lexeme.split("\n").length - 1;
    for (let i = 1; i <= extra; i++) frozen.add(t.line - 1 + i);
  }
  markBlockComments(body, frozen);

  // The first token on each line, and the bracket depth before it.
  const firstToken = new Map<number, Token>();
  const depthAt = new Map<number, number>();
  let depth = 0;
  for (const t of tokens) {
    if (t.type === "EOF") break;
    const line = t.line - 1;
    if (!firstToken.has(line)) {
      firstToken.set(line, t);
      depthAt.set(line, depth);
    }
    if (OPENERS.has(t.type)) depth++;
    else if (CLOSERS.has(t.type)) depth = Math.max(0, depth - 1);
  }

  const codeLines = [...firstToken.keys()].sort((a, b) => a - b);
  const out: string[] = [];
  lines.forEach((raw, i) => {
    if (frozen.has(i)) {
      out.push(raw);
      return;
    }
    const text = raw.trim();
    if (text === "") {
      if (out.length > 0 && out[out.length - 1] !== "") out.push("");
      return;
    }
    const t = firstToken.get(i);
    let level: number;
    if (t && t.col === raw.length - raw.trimStart().length + 1) {
      level = depthAt.get(i)!;
      if (CLOSERS.has(t.type)) level--;
      if (t.type === "." || t.type === "?.") level++;
    } else {
      // A line that starts with a comment is indented like the code that follows it.
      const next = codeLines.find((line) => line > i);
      level = next === undefined ? 0 : depthAt.get(next)!;
    }
    out.push(indentUnit.repeat(Math.max(0, level)) + text);
  });
  while (out.length && out[out.length - 1] === "") out.pop();
  return (shebang ? shebang.trimEnd() + "\n" : "") + out.join("\n") + "\n";
}

/** Marks the lines after the first one of each multi-line `/* ... *\/` comment. */
function markBlockComments(source: string, frozen: Set<number>): void {
  let line = 0;
  let inString: string | null = null;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (c === "\n") {
      line++;
      if (inString === '"') inString = null;
      continue;
    }
    if (inString) {
      if (c === "\\" && inString === '"') i++;
      else if (inString === '"""' && source.startsWith('"""', i)) {
        inString = null;
        i += 2;
      } else if (inString === '"' && c === '"') inString = null;
      continue;
    }
    if (source.startsWith('"""', i)) {
      inString = '"""';
      i += 2;
    } else if (c === '"') {
      inString = '"';
    } else if (source.startsWith("//", i)) {
      while (i + 1 < source.length && source[i + 1] !== "\n") i++;
    } else if (source.startsWith("/*", i)) {
      const end = source.indexOf("*/", i + 2);
      const stop = end < 0 ? source.length : end + 2;
      for (let j = i; j < stop; j++) {
        if (source[j] === "\n") frozen.add(++line);
      }
      i = stop - 1;
    }
  }
}
