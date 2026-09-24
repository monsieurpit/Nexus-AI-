import type { Stmt } from "./ast";
import { Interpreter, type InterpreterOptions } from "./interpreter";
import { Lexer } from "./lexer";
import { Parser } from "./parser";

export { PitError } from "./errors";
export { Interpreter, type InterpreterOptions } from "./interpreter";
export { Lexer } from "./lexer";
export { Parser } from "./parser";

/** Lexes and parses PitCode source. A `#!` first line is ignored. */
export function parse(source: string): Stmt[] {
  const tokens = new Lexer(source.replace(/^#!.*/, "")).tokenize();
  return new Parser(tokens).parseProgram();
}

/** Parses and runs PitCode source. Throws PitError on syntax or runtime errors. */
export function run(source: string, options?: InterpreterOptions): void {
  new Interpreter(options).run(parse(source));
}
