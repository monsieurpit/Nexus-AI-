import assert from "node:assert/strict";
import { PitError, run } from "../src/index";

/** Runs PitCode and returns everything it printed. */
export function output(source: string, input: string[] = []): string {
  let out = "";
  run(source, { write: (text) => (out += text), readLine: () => input.shift() ?? null });
  return out;
}

/** Runs PitCode that must fail and returns the error. */
export function errorOf(source: string): PitError {
  try {
    output(source);
  } catch (e) {
    if (e instanceof PitError) return e;
    throw e;
  }
  assert.fail("expected a PitError");
}
