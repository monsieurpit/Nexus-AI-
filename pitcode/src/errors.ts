import type { Token } from "./token";

/**
 * SyntaxError and NameError are found before the program runs; everything else
 * (RuntimeError, Error, or a user's own error kind) happens while it runs.
 */
export type ErrorKind = string;

export class PitError extends Error {
  constructor(
    readonly kind: ErrorKind,
    message: string,
    readonly line: number,
    readonly col: number,
    public file?: string,
    public source?: string,
  ) {
    super(message);
    this.name = kind;
  }

  /** Formats the error with the offending source line and a caret under the problem. */
  format(source = this.source, file = this.file ?? "<input>"): string {
    let out = `${this.kind}: ${this.message}`;
    if (this.line <= 0) return out;
    out += `\n  --> ${file}:${this.line}:${this.col}`;
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

type Position = Token | { line: number; col: number };

export function syntaxError(at: Position, message: string): PitError {
  return new PitError("SyntaxError", message, at.line, at.col);
}

export function nameError(at: Position, message: string): PitError {
  return new PitError("NameError", message, at.line, at.col);
}

/** Words from other languages that people type out of habit, mapped to the PitCode way. */
export const HABIT_HINTS: Record<string, string> = {
  if: "PitCode uses 'when' instead of 'if'",
  else: "PitCode uses 'other' instead of 'else'",
  elif: "PitCode uses 'orwhen' instead of 'else if'",
  while: "PitCode uses 'loop' instead of 'while'",
  for: "PitCode uses 'loop item in list' instead of 'for'",
  let: "PitCode uses 'pit' to create a variable",
  var: "PitCode uses 'pit' to create a variable",
  const: "PitCode uses 'lock' to create a constant",
  return: "PitCode uses 'back' instead of 'return'",
  print: "PitCode uses 'say' to print, like: say \"hello\"",
  console: "PitCode uses 'say' to print, like: say \"hello\"",
  break: "PitCode uses 'stop' instead of 'break'",
  continue: "PitCode uses 'skip' instead of 'continue'",
  function: "PitCode functions look like: name(params) => { ... }",
  fn: "PitCode functions look like: name(params) => { ... }",
  func: "PitCode functions look like: name(params) => { ... }",
  def: "PitCode functions look like: name(params) => { ... }",
  null: "PitCode uses 'nil' instead of 'null'",
  undefined: "PitCode uses 'nil' instead of 'undefined'",
  class: "PitCode uses 'kind' instead of 'class', like: kind Dog { ... }",
  new: "PitCode doesn't need 'new'. Create things by calling the kind: Dog(\"Rex\")",
  this: "PitCode uses 'me' instead of 'this'",
  self: "PitCode uses 'me' instead of 'self'",
  super: "PitCode uses 'up' instead of 'super', like: up.init(name)",
  extends: "PitCode uses 'from', like: kind Dog from Animal { ... }",
  try: "PitCode uses 'attempt' instead of 'try'",
  catch: "PitCode uses 'rescue' instead of 'catch'",
  except: "PitCode uses 'rescue' instead of 'except'",
  finally: "PitCode uses 'always' instead of 'finally'",
  throw: "PitCode uses 'raise' instead of 'throw'",
  await: "PitCode uses 'wait' instead of 'await'",
  async: "PitCode doesn't need 'async': a function that uses 'wait' is async by itself",
  yield: "PitCode uses 'give' instead of 'yield'",
  import: "PitCode uses 'use', like: use { add } from \"./tools.pit\"",
  require: "PitCode uses 'use', like: use tools from \"./tools.pit\"",
  export: "PitCode uses 'share' instead of 'export'",
  switch: "PitCode uses 'match' instead of 'switch'",
  case: "Inside 'match', write each case like: 1 => say \"one\"",
  typeof: "PitCode uses type(value) instead of 'typeof'",
  instanceof: "PitCode uses 'is', like: pet is Dog",
  elseif: "PitCode uses 'orwhen' instead of 'else if'",
  True: "PitCode uses 'true' (lowercase)",
  False: "PitCode uses 'false' (lowercase)",
  None: "PitCode uses 'nil' instead of 'None'",
};
