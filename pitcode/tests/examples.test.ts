import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";

const root = resolve(__dirname, "..", "..");
const cli = join(root, "dist", "src", "cli.js");
const examples = readdirSync(join(root, "examples")).filter((f) => f.endsWith(".pit"));

/** Every example must run without errors (in a scratch folder, so files they write don't pile up). */
for (const file of [...examples, "modules/main.pit"]) {
  test(`example ${file} runs`, () => {
    const cwd = mkdtempSync(join(tmpdir(), "pit-example-"));
    const out = execFileSync(process.execPath, [cli, join(root, "examples", file)], { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    assert.ok(out.length > 0);
  });
}
