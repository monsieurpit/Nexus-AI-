import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";
import { Runtime } from "../src/index";
import { output } from "./helpers";

const cli = resolve(__dirname, "..", "src", "cli.js");
const pit = (args: string[], cwd?: string, input?: string) =>
  spawnSync(process.execPath, [cli, ...args], { cwd, input, encoding: "utf8" });

test("test() and expect()", async () => {
  const out = await output('test("good", () => expect(1 + 1, 2))\ntest("bad", () => expect([1], [2], "lists"))');
  assert.equal(out, "✓ good\n✗ bad\n    CheckError: lists: expected [2] but got [1] (test.pit:2)\n");
});

test("REPL entries remember earlier names", async () => {
  const runtime = new Runtime({ write: () => {} });
  assert.equal(await runtime.runRepl("pit x = 5"), undefined);
  assert.equal(await runtime.runRepl("double(n) => n * 2"), undefined);
  assert.equal(await runtime.runRepl("double(x)"), 10);
  assert.equal(await runtime.runRepl("pit x = 1\nx + 1"), 2); // names can be created again
  await assert.rejects(runtime.runRepl("nope"), /Undefined variable 'nope'/);
  assert.equal(await runtime.runRepl("x"), 1);
});

test("the pitcode command: exit codes, stdin, args, --js", () => {
  const dir = mkdtempSync(join(tmpdir(), "pit-cli-"));
  writeFileSync(join(dir, "ok.pit"), 'say "hi", args');
  writeFileSync(join(dir, "bad.pit"), "say 1 / 0");
  const ok = pit(["ok.pit", "a"], dir);
  assert.equal(ok.status, 0);
  assert.equal(ok.stdout, 'hi ["a"]\n');
  const bad = pit(["bad.pit"], dir);
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /RuntimeError: Division by zero\n {2}--> bad\.pit:1:7/);
  assert.equal(pit([], dir, "say 2 + 2").stdout, "4\n");
  assert.match(pit(["--js", "ok.pit"], dir).stdout, /\$\.say\(\["hi", args\$\]\)/);
  assert.equal(pit(["missing.pit"], dir).status, 1);
});

test("pitcode test runs *_test.pit files", () => {
  const dir = mkdtempSync(join(tmpdir(), "pit-tests-"));
  writeFileSync(join(dir, "a_test.pit"), 'test("one", () => check(true))');
  const good = pit(["test"], dir);
  assert.equal(good.status, 0);
  assert.match(good.stdout, /✓ one[\s\S]*1 passed, 0 failed/);
  writeFileSync(join(dir, "b_test.pit"), 'test("two", () => check(false, "nope"))');
  const bad = pit(["test"], dir);
  assert.equal(bad.status, 1);
  assert.match(bad.stdout, /✗ two[\s\S]*1 passed, 1 failed/);
});

test("pitcode fmt --check", () => {
  const dir = mkdtempSync(join(tmpdir(), "pit-fmt-"));
  writeFileSync(join(dir, "messy.pit"), "when true {\nsay 1\n}\n");
  assert.equal(pit(["fmt", "--check", "messy.pit"], dir).status, 1);
  assert.equal(pit(["fmt", "messy.pit"], dir).status, 0);
  assert.equal(pit(["fmt", "--check", "messy.pit"], dir).status, 0);
});
