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
    loop { stop }
    { say "block" }
    kind Dog { bark() => "woof" }
    match a { 1 => say "one" }
    attempt { raise "x" } rescue e { }
  `).map((s) => s.kind);
  assert.deepEqual(kinds, [
    "Pit", "Pit", "Func", "Assign", "Say", "When", "LoopWhile", "LoopEach", "LoopForever", "Block",
    "Kind", "MatchStmt", "Attempt",
  ]);
});

test("operator precedence", () => {
  const [stmt] = parse("say 1 + 2 * 3 == 7 and not false");
  assert.equal(stmt.kind, "Say");
  const expr = stmt.kind === "Say" ? stmt.values[0] : null;
  assert.equal(expr?.kind, "Logical");
  const [ternary] = parse("pit x = a ?? b ? 1 : 2");
  assert.equal(ternary.kind === "Pit" && ternary.init?.kind, "Ternary");
  const [range] = parse("pit r = 0..n + 1");
  assert.equal(range.kind === "Pit" && range.init?.kind, "Range");
});

test("a call is not a function declaration unless followed by =>", () => {
  assert.equal(parse("greet(name)")[0].kind, "Expr");
  assert.equal(parse("greet(name) => name")[0].kind, "Func");
  assert.equal(parse("pit f = (n) => { back n }")[0].kind, "Pit");
  assert.equal(parse("pit f = n => n * 2")[0].kind, "Pit");
});

test("generators and async functions are detected", () => {
  const [gen] = parse("f() => { give 1 }");
  assert.ok(gen.kind === "Func" && gen.fn.isGenerator && !gen.fn.isAsync);
  const [asy] = parse("f() => { wait g() }");
  assert.ok(asy.kind === "Func" && asy.fn.isAsync && !asy.fn.isGenerator);
  const [lambda] = parse("pit f = x => wait x");
  assert.ok(lambda.kind === "Pit" && lambda.init?.kind === "Lambda" && lambda.init.fn.isAsync);
});

test("semicolons are optional; statements split on newlines", () => {
  assert.equal(parse("say 1; say 2\nsay 3").length, 3);
  assert.equal(parse("pit x = 1\n-x").length, 2);
  assert.equal(parse("pit x = [1]\n[2]").length, 2);
  // A line starting with `.` continues the one before it.
  assert.equal(parse("pit x = [1, 2]\n  .map(n => n)\n  .size").length, 1);
});

test("syntax errors", () => {
  assert.throws(() => parse("say 1 say 2"), /own line/);
  assert.throws(() => parse("when x { say 1"), /never closed/);
  assert.throws(() => parse("when x = 1 { }"), /Use '=='/);
  assert.throws(() => parse("back 1"), /inside a function/);
  assert.throws(() => parse("give 1"), /inside a function/);
  assert.throws(() => parse("stop"), /inside a loop/);
  assert.throws(() => parse("f() => { loop { g() => { stop } } }"), /inside a loop/);
  assert.throws(() => parse("lock X"), /needs a value/);
  assert.throws(() => parse("pit say = 1"), /keyword/);
  assert.throws(() => parse("other { }"), /right after/);
  assert.throws(() => parse("rescue { }"), /right after/);
  assert.throws(() => parse("if x > 1 { }"), /uses 'when'/);
  assert.throws(() => parse("pit d = new Dog()"), /doesn't need 'new'/);
  assert.throws(() => parse("f(a, a) => a"), /listed twice/);
  assert.throws(() => parse("f(a = 1, b) => a"), /default values must come last/);
  assert.throws(() => parse("f(...a, b) => a"), /must be the last/);
  assert.throws(() => parse("1 = 2"), /assign to a variable/);
  assert.throws(() => parse("attempt { }"), /needs a 'rescue' or 'always'/);
  assert.throws(() => parse("match x { other => 1\n1 => 2 }"), /never match/);
  assert.throws(() => parse("kind A { 5 }"), /Inside a kind/);
  assert.throws(() => parse("kind A {\n get x(a) => 1\n}"), /can't take parameters/);
  assert.throws(() => parse("{ share pit x = 1 }"), /top of a file/);
  assert.throws(() => parse("kind A { pit x = wait y }"), /can't be used in a field/);
});
