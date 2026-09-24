import assert from "node:assert/strict";
import { test } from "node:test";
import { parse } from "../src/index";

test("statement kinds", () => {
  const kinds = parse(`
    pit a = 1
    lock B = 2
    add(x, y) => x + y
    a += 1
    say a, B
    when a > 1 { say 1 } orwhen a > 0 { say 2 } other { say 3 }
    loop a < 5 { a = a + 1 }
    loop i in 0..3 { say i }
    { say "block" }
  `).map((s) => s.kind);
  assert.deepEqual(kinds, ["Pit", "Pit", "Func", "Assign", "Say", "When", "LoopWhile", "LoopRange", "Block"]);
});

test("operator precedence", () => {
  const [stmt] = parse("say 1 + 2 * 3 == 7 and not false");
  assert.equal(stmt.kind, "Say");
  const expr = stmt.kind === "Say" ? stmt.values[0] : null;
  assert.equal(expr?.kind, "Logical");
});

test("a call is not a function declaration unless followed by =>", () => {
  assert.equal(parse("greet(name)")[0].kind, "Expr");
  assert.equal(parse("greet(name) => name")[0].kind, "Func");
  assert.equal(parse("pit f = (n) => { back n }")[0].kind, "Pit");
});

test("semicolons are optional; statements split on newlines", () => {
  assert.equal(parse("say 1; say 2\nsay 3").length, 3);
  assert.equal(parse("pit x = 1\n-x").length, 2);
});

test("syntax errors", () => {
  assert.throws(() => parse("say 1 say 2"), /own line/);
  assert.throws(() => parse("when x { say 1"), /never closed/);
  assert.throws(() => parse("when x = 1 { }"), /Use '=='/);
  assert.throws(() => parse("back 1"), /inside a function/);
  assert.throws(() => parse("stop"), /inside a loop/);
  assert.throws(() => parse("f() => { loop { g() => { stop } } }"), /inside a loop/);
  assert.throws(() => parse("lock X"), /needs a value/);
  assert.throws(() => parse("pit say = 1"), /keyword/);
  assert.throws(() => parse("other { }"), /right after/);
  assert.throws(() => parse("if x > 1 { }"), /uses 'when'/);
  assert.throws(() => parse("f(a, a) => a"), /listed twice/);
  assert.throws(() => parse("1 = 2"), /assign to a variable/);
});
