import assert from "node:assert/strict";
import { PitError, Runtime, type Host } from "../src/index";

/** Runs PitCode and returns everything it printed. */
export async function output(source: string, input: string[] = [], host: Partial<Host> = {}): Promise<string> {
  let out = "";
  const runtime = new Runtime({
    write: (text) => (out += text),
    readLine: () => input.shift() ?? null,
    ...host,
  });
  await runtime.run(source, "test.pit");
  return out;
}

/** Runs PitCode that must fail and returns the error. */
export async function errorOf(source: string): Promise<PitError> {
  try {
    await output(source);
  } catch (e) {
    if (e instanceof PitError) return e;
    throw e;
  }
  assert.fail("expected a PitError");
}
