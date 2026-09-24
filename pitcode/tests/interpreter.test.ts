import assert from "node:assert/strict";
import { test } from "node:test";
import { errorOf, output } from "./helpers";

test("say, variables and arithmetic", () => {
  assert.equal(output("say 1 + 2 * 3"), "7\n");
  assert.equal(output("pit a = 10\na -= 4\na *= 2\nsay a, a % 5"), "12 2\n");
  assert.equal(output("say 7 / 2, -3, 0.1 + 0.2"), "3.5 -3 0.3\n");
  assert.equal(output("say"), "\n");
  assert.equal(output("pit x\nsay x"), "nil\n");
});

test("text and interpolation", () => {
  assert.equal(output('pit n = "Pat"\nsay "Hi {n}, {1 + 2}!"'), "Hi Pat, 3!\n");
  assert.equal(output('say "n=" + 5, "a" + true'), "n=5 atrue\n");
  assert.equal(output('say "{"nested"}"'), "nested\n");
  assert.equal(output('say "a" < "b"'), "true\n");
});

test("truthiness: only false and nil are false", () => {
  assert.equal(output('when 0 { say "yes" }'), "yes\n");
  assert.equal(output('when "" { say "yes" }'), "yes\n");
  assert.equal(output('when nil { say "yes" } other { say "no" }'), "no\n");
  assert.equal(output("say nil or 5, false and 1, not nil"), "5 false true\n");
});

test("strict equality", () => {
  assert.equal(output('say 1 == "1", nil == false, 2 == 2, "a" != "b"'), "false false true true\n");
});

test("when / orwhen / other", () => {
  const src = (n: number) => `pit n = ${n}\nwhen n > 10 { say "big" } orwhen n > 5 { say "medium" } other { say "small" }`;
  assert.equal(output(src(20)), "big\n");
  assert.equal(output(src(7)), "medium\n");
  assert.equal(output(src(1)), "small\n");
});

test("loops, stop and skip", () => {
  assert.equal(output("pit i = 0\nloop i < 3 { say i\ni += 1 }"), "0\n1\n2\n");
  assert.equal(output("loop i in 0..3 { say i }"), "0\n1\n2\n");
  assert.equal(output("loop i in 3..0 { say i }"), "3\n2\n1\n");
  assert.equal(output("loop i in 0..0 { say i }"), "");
  assert.equal(output("loop i in 0..10 { when i == 1 { skip }\nwhen i == 3 { stop }\nsay i }"), "0\n2\n");
  assert.equal(output("pit n = 0\nloop { n += 1\nwhen n == 4 { stop } }\nsay n"), "4\n");
});

test("functions, recursion and closures", () => {
  assert.equal(output("add(a, b) => a + b\nsay add(2, 3)"), "5\n");
  assert.equal(output("f() => { say 1 }\nsay f()"), "1\nnil\n");
  assert.equal(output("fact(n) => { when n <= 1 { back 1 }\nback n * fact(n - 1) }\nsay fact(10)"), "3628800\n");
  assert.equal(output(`
    counter() => {
      pit c = 0
      back () => { c += 1
        back c }
    }
    pit a = counter()
    pit b = counter()
    a()
    a()
    say a(), b()
  `), "3 1\n");
  assert.equal(output("twice(f, x) => f(f(x))\nsay twice((n) => n * 3, 2)"), "18\n");
  // Each loop pass gets its own variable, so closures capture different values.
  assert.equal(output(`
    pit fs = nil
    pit g = nil
    loop i in 0..2 { when i == 0 { fs = () => i } other { g = () => i } }
    say fs(), g()
  `), "0 1\n");
});

test("block scoping", () => {
  assert.equal(output("pit x = 1\n{ pit x = 2\nsay x }\nsay x"), "2\n1\n");
  assert.equal(output("pit len = 5\nsay len"), "5\n"); // built-ins can be shadowed
});

test("built-ins", () => {
  assert.equal(output('say len("héllo"), str(4) + "!", num(" 42 ") + 1, num("x")'), "5 4! 43 nil\n");
  assert.equal(output('say type(1), type("a"), type(true), type(nil), type(len)'), "number string bool nil function\n");
  assert.equal(output('pit n = ask("name? ")\nsay "Hi {n}"', ["Pat"]), "Hi Pat\n");
  assert.equal(output("say ask()"), "nil\n");
  assert.equal(output("say type(clock())"), "number\n");
  assert.equal(output("say len"), "<function len>\n");
});

test("runtime errors carry line and column", () => {
  const e = errorOf("pit a = 1\nsay a + missing");
  assert.equal(e.kind, "RuntimeError");
  assert.match(e.message, /Undefined variable 'missing'/);
  assert.equal(e.line, 2);
  assert.equal(e.col, 9);
  assert.match(e.format("pit a = 1\nsay a + missing", "t.pit"), /t\.pit:2:9[\s\S]*\n {3}\| {9}\^/);
});

test("runtime error messages", () => {
  assert.match(errorOf("lock PI = 3\nPI = 4").message, /Cannot change locked 'PI'/);
  assert.match(errorOf("pit a = 1\npit a = 2").message, /already exists/);
  assert.match(errorOf("nope = 1").message, /Undefined variable 'nope'/);
  assert.match(errorOf("say 1 / 0").message, /Division by zero/);
  assert.match(errorOf('say "a" - 1').message, /needs two numbers/);
  assert.match(errorOf("say nil + 1").message, /Can't add nil and number/);
  assert.match(errorOf('say 1 < "2"').message, /Can't compare/);
  assert.match(errorOf("pit x = 5\nx()").message, /not a function/);
  assert.match(errorOf("f(a) => a\nf()").message, /expects 1 argument but got 0/);
  assert.match(errorOf('len("a", "b")').message, /expects 1 argument but got 2/);
  assert.match(errorOf('loop i in "a"..3 { }').message, /range needs numbers/);
  assert.match(errorOf('print("hi")').message, /uses 'say'/);
  assert.match(errorOf("f(n) => f(n + 1)\nf(0)").message, /Too much recursion/);
});

test("a #! first line is ignored", () => {
  assert.equal(output("#!/usr/bin/env pitcode\nsay 1"), "1\n");
});
