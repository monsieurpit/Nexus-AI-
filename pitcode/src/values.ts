import type { FunctionDef } from "./ast";
import type { Environment } from "./environment";
import type { Token } from "./token";

/** A function written in PitCode. */
export class PitFunction {
  constructor(readonly def: FunctionDef, readonly closure: Environment) {}

  get name(): string {
    return this.def.name ?? "anonymous";
  }
}

/** A built-in function implemented in TypeScript. */
export class NativeFunction {
  constructor(
    readonly name: string,
    readonly minArgs: number,
    readonly maxArgs: number,
    readonly fn: (args: Value[], at: Token) => Value,
  ) {}
}

export type Value = number | string | boolean | null | PitFunction | NativeFunction;

export function typeName(value: Value): string {
  if (value === null) return "nil";
  if (value instanceof PitFunction || value instanceof NativeFunction) return "function";
  if (typeof value === "boolean") return "bool";
  return typeof value; // "number" | "string"
}

/** Only `false` and `nil` count as false. */
export function isTruthy(value: Value): boolean {
  return value !== null && value !== false;
}

export function isEqual(a: Value, b: Value): boolean {
  return a === b;
}

export function stringify(value: Value): string {
  if (value === null) return "nil";
  if (typeof value === "number") {
    if (Number.isInteger(value)) return String(value);
    // Hide floating point noise: 0.1 + 0.2 shows as 0.3.
    return String(Number.parseFloat(value.toPrecision(15)));
  }
  if (value instanceof PitFunction || value instanceof NativeFunction) return `<function ${value.name}>`;
  return String(value);
}
