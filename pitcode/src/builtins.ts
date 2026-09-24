import { readSync } from "node:fs";
import type { Environment } from "./environment";
import { runtimeError } from "./errors";
import { NativeFunction, stringify, typeName, type Value } from "./values";

export interface BuiltinIO {
  /** Returns the next line of input, or null at end of input. */
  readLine(prompt: string): string | null;
}

export function installBuiltins(env: Environment, io: BuiltinIO): void {
  const def = (name: string, min: number, max: number, fn: NativeFunction["fn"]) =>
    env.set(name, new NativeFunction(name, min, max, fn));

  def("ask", 0, 1, (args) => io.readLine(args.length ? stringify(args[0]) : ""));

  def("len", 1, 1, ([value], at) => {
    if (typeof value !== "string") throw runtimeError(at, `len() needs text, but got ${typeName(value)}`);
    return [...value].length;
  });

  def("str", 1, 1, ([value]) => stringify(value));

  def("num", 1, 1, ([value]): Value => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "") {
      const n = Number(value.trim());
      return Number.isFinite(n) ? n : null;
    }
    return null;
  });

  def("type", 1, 1, ([value]) => typeName(value));

  def("clock", 0, 0, () => Date.now() / 1000);
}

/** Reads one line from standard input, waiting until it arrives. */
export function readLineFromStdin(prompt: string): string | null {
  if (prompt) process.stdout.write(prompt);
  const byte = Buffer.alloc(1);
  const bytes: number[] = [];
  for (;;) {
    let read: number;
    try {
      read = readSync(0, byte, 0, 1, null);
    } catch (e) {
      const code = (e as NodeJS.ErrnoException).code;
      if (code === "EAGAIN") continue;
      if (code === "EOF") read = 0;
      else throw e;
    }
    if (read === 0) {
      if (bytes.length === 0) return null;
      break;
    }
    if (byte[0] === 10) break; // \n
    bytes.push(byte[0]);
  }
  return Buffer.from(bytes).toString("utf8").replace(/\r$/, "");
}
