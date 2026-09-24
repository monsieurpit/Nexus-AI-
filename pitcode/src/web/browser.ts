/**
 * PitCode for the browser: `PitCode.run(source, options)`.
 * Bundled into a single file by `npm run build:web`.
 */
import { PitError } from "../errors";
import { Lexer } from "../lexer";
import { Runtime } from "../runtime/runtime";
import { KEYWORDS, type Token } from "../token";

export interface BrowserRunOptions {
  write(text: string): void;
  writeError?(text: string): void;
  /** Answers `ask()`; defaults to the browser's prompt box. */
  readLine?(prompt: string): string | null;
  /** Other files `use` can load, by name. */
  files?: Record<string, string>;
  loopTimeLimitMs?: number;
}

export const version = "1.0.0";

/** Errors from async code nobody waited for go to the most recent run's output. */
let reportLate: ((reason: unknown) => void) | null = null;
if (typeof addEventListener === "function") {
  addEventListener("unhandledrejection", (event) => {
    if (!reportLate) return;
    event.preventDefault();
    reportLate(event.reason);
  });
}

/** Runs a program. Errors are written to `writeError` (or `write`) and also returned. */
export async function run(source: string, options: BrowserRunOptions): Promise<PitError | null> {
  let failed: PitError | null = null;
  const report = (e: PitError) => {
    failed ??= e;
    (options.writeError ?? options.write)(e.format() + "\n");
  };
  const runtime = new Runtime({
    write: options.write,
    writeError: options.writeError,
    readLine: options.readLine ?? ((p) => (typeof prompt === "function" ? prompt(p) : null)),
    loadModule: (spec) => {
      const name = spec.replace(/^\.\//, "").replace(/\.pit$/, "") + ".pit";
      const source = options.files?.[name];
      if (source === undefined) throw new Error(`not found: ${spec}`);
      return { name, source };
    },
    loopTimeLimitMs: options.loopTimeLimitMs ?? 5000,
    reportError: report,
  });
  reportLate = (reason) => report(runtime.toPitError(reason));
  try {
    await runtime.run(source, "main.pit");
  } catch (e) {
    report(e instanceof PitError ? e : runtime.toPitError(e));
  }
  return failed;
}

/** The JavaScript a program turns into. */
export function toJs(source: string): string {
  return new Runtime({ write: () => {} }).compileToJs(source, "main.pit");
}

export type HighlightKind = "keyword" | "string" | "number" | "comment" | "constant" | "kind" | "function" | "operator" | "plain";

const CONSTANTS = new Set(["true", "false", "nil"]);

/**
 * Splits source into colored pieces for an editor, using the real PitCode lexer.
 * Falls back to plain text for code that can't be read yet (while typing).
 */
export function highlight(source: string): { text: string; kind: HighlightKind }[] {
  let tokens: Token[];
  try {
    tokens = new Lexer(source).tokenize();
  } catch {
    return [{ text: source, kind: "plain" }];
  }
  const lineStarts = [0];
  for (let i = 0; i < source.length; i++) if (source[i] === "\n") lineStarts.push(i + 1);
  const offset = (t: Token) => lineStarts[t.line - 1] + t.col - 1;
  const out: { text: string; kind: HighlightKind }[] = [];
  let pos = 0;
  const gap = (end: number) => {
    if (end <= pos) return;
    const text = source.slice(pos, end);
    // Whatever the lexer skipped is spaces or comments.
    const parts = text.split(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/);
    parts.forEach((p, i) => p && out.push({ text: p, kind: i % 2 === 1 ? "comment" : "plain" }));
    pos = end;
  };
  tokens.forEach((t, i) => {
    if (t.type === "EOF") return;
    const start = offset(t);
    gap(start);
    const text = source.slice(start, start + t.lexeme.length);
    let kind: HighlightKind = "plain";
    if (t.type === "STRING") kind = "string";
    else if (t.type === "NUMBER") kind = "number";
    else if (CONSTANTS.has(t.type)) kind = "constant";
    else if ((KEYWORDS as readonly string[]).includes(t.type)) kind = "keyword";
    else if (t.type === "IDENT") {
      const next = tokens[i + 1];
      if (/^[A-Z]/.test(t.lexeme)) kind = "kind";
      else if (next?.type === "(" || next?.type === "=>") kind = "function";
      else if (["by", "times", "from", "as", "shared", "get", "set"].includes(t.lexeme)) kind = "keyword";
    } else kind = "operator";
    out.push({ text, kind });
    pos = start + text.length;
  });
  gap(source.length);
  return out;
}
