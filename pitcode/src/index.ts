import { Runtime, parse, type Host } from "./runtime/runtime";

export { PitError } from "./errors";
export { Lexer } from "./lexer";
export { Parser } from "./parser";
export { compile } from "./compiler";
export { format } from "./format";
export { Runtime, parse, type Host } from "./runtime/runtime";
export { str, repr, typeName } from "./runtime/values";

export interface RunOptions extends Partial<Host> {
  /** File name used in error messages. */
  file?: string;
}

/** Compiles and runs PitCode source. Rejects with a PitError on syntax or runtime errors. */
export async function run(source: string, options: RunOptions = {}): Promise<void> {
  const host: Host = { write: (text) => process.stdout.write(text), ...options };
  await new Runtime(host).run(source, options.file ?? "<input>");
}
