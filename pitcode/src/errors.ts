import type { Token } from "./token";

export type ErrorKind = "SyntaxError" | "RuntimeError";

export class PitError extends Error {
  constructor(
    readonly kind: ErrorKind,
    message: string,
    readonly line: number,
    readonly col: number,
  ) {
    super(message);
    this.name = kind;
  }

  /** Formats the error with the offending source line and a caret under the problem. */
  format(source?: string, file = "<input>"): string {
    let out = `${this.kind}: ${this.message}\n  --> ${file}:${this.line}:${this.col}`;
    const text = source?.split(/\r?\n/)[this.line - 1];
    if (text !== undefined) {
      const num = String(this.line);
      const gutter = " ".repeat(num.length);
      // Keep tabs so the caret lines up with the source line.
      const indent = text.slice(0, Math.max(0, this.col - 1)).replace(/[^\t]/g, " ");
      out += `\n ${gutter} |\n ${num} | ${text}\n ${gutter} | ${indent}^`;
    }
    return out;
  }
}

export function syntaxError(at: Token | { line: number; col: number }, message: string): PitError {
  return new PitError("SyntaxError", message, at.line, at.col);
}

export function runtimeError(at: Token, message: string): PitError {
  return new PitError("RuntimeError", message, at.line, at.col);
}

/** Words from other languages that people type out of habit, mapped to the PitCode way. */
export const HABIT_HINTS: Record<string, string> = {
  if: "PitCode uses 'when' instead of 'if'",
  else: "PitCode uses 'other' instead of 'else'",
  elif: "PitCode uses 'orwhen' instead of 'else if'",
  while: "PitCode uses 'loop' instead of 'while'",
  for: "PitCode uses 'loop i in 0..10' instead of 'for'",
  let: "PitCode uses 'pit' to create a variable",
  var: "PitCode uses 'pit' to create a variable",
  const: "PitCode uses 'lock' to create a constant",
  return: "PitCode uses 'back' instead of 'return'",
  print: "PitCode uses 'say' to print, like: say \"hello\"",
  break: "PitCode uses 'stop' instead of 'break'",
  continue: "PitCode uses 'skip' instead of 'continue'",
  function: "PitCode functions look like: name(params) => { ... }",
  fn: "PitCode functions look like: name(params) => { ... }",
  func: "PitCode functions look like: name(params) => { ... }",
  def: "PitCode functions look like: name(params) => { ... }",
  null: "PitCode uses 'nil' instead of 'null'",
  undefined: "PitCode uses 'nil' instead of 'undefined'",
};
