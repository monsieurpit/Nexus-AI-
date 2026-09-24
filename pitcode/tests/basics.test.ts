import assert from "node:assert/strict";
import { test } from "node:test";
import { errorOf, output } from "./helpers";

test("say, variables and arithmetic", async () => {
  assert.equal(await output("say 1 + 2 * 3"), "7\n");
  assert.equal(await output("pit a = 10\na -= 4\na *= 2\nsay a, a % 5"), "12 2\n");
  assert.equal(await output("say 7 / 2, -3, 0.1 + 0.2, 2 ** 10, -2 ** 2"), "3.5 -3 0.3 1024 -4\n");
  assert.equal(await output("say"), "\n");
  assert.equal(await output("pit x\nsay x"), "nil\n");
  assert.equal(await output("pit i = 1\ni++\ni++\ni--\nsay i"), "2\n");
  assert.equal(await output("say 0xFF, 0b101, 1_000, 2.5e3, 1e-2"), "255 5 1000 2500 0.01\n");
  assert.equal(await output("say 6 & 3, 6 | 3, 6 ^ 3, ~0, 1 << 4, 256 >> 2"), "2 7 5 -1 16 64\n");
});

test("text and interpolation", async () => {
  assert.equal(await output('pit n = "Pat"\nsay "Hi {n}, {1 + 2}!"'), "Hi Pat, 3!\n");
  assert.equal(await output('say "n=" + 5, "a" + true, "-" * 3'), "n=5 atrue ---\n");
  assert.equal(await output('say "{"nested"}"'), "nested\n");
  assert.equal(await output('say "a" < "b", "tab\\there", "\\u{1F600}".size'), "true tab\there 2\n");
  assert.equal(await output('say r"\\d+{x}"'), "\\d+{x}\n");
  assert.equal(await output('say r"""{"a": "b"}"""'), '{"a": "b"}\n');
  assert.equal(await output('say """\n    one\n      two\n    """'), "one\n  two\n");
});

test("names can use letters from any language", async () => {
  assert.equal(await output('pit plongée = 18\npit profondeur_max = 40\nsay "{plongée}/{profondeur_max}"'), "18/40\n");
});

test("comments", async () => {
  assert.equal(await output("say 1 // one\n/* a\nblock */ say 2"), "1\n2\n");
});

test("truthiness: only false and nil are false", async () => {
  assert.equal(await output('when 0 { say "yes" }'), "yes\n");
  assert.equal(await output('when "" { say "yes" }'), "yes\n");
  assert.equal(await output('when [] { say "yes" }'), "yes\n");
  assert.equal(await output('when nil { say "yes" } other { say "no" }'), "no\n");
  assert.equal(await output("say nil or 5, false and 1, not nil, 0 or 1, nil ?? 3, false ?? 3"), "5 false true 0 3 false\n");
});

test("strict equality", async () => {
  assert.equal(await output('say 1 == "1", nil == false, 2 == 2, "a" != "b", [1] == [1]'), "false false true true false\n");
  assert.equal(await output("say same([1, {a: 2}], [1, {a: 2}])"), "true\n");
});

test("when / orwhen / other and ternary", async () => {
  const src = (n: number) => `pit n = ${n}\nwhen n > 10 { say "big" } orwhen n > 5 { say "medium" } other { say "small" }`;
  assert.equal(await output(src(20)), "big\n");
  assert.equal(await output(src(7)), "medium\n");
  assert.equal(await output(src(1)), "small\n");
  assert.equal(await output('say 3 > 2 ? "yes" : "no", nil ? 1 : 2'), "yes 2\n");
});

test("loops, stop and skip", async () => {
  assert.equal(await output("pit i = 0\nloop i < 3 { say i\ni += 1 }"), "0\n1\n2\n");
  assert.equal(await output("loop i in 0..3 { say i }"), "0\n1\n2\n");
  assert.equal(await output("loop i in 3..0 { say i }"), "3\n2\n1\n");
  assert.equal(await output("loop i in 1..=3 { say i }"), "1\n2\n3\n");
  assert.equal(await output("loop i in 0..10 by 4 { say i }"), "0\n4\n8\n");
  assert.equal(await output("loop i in 10..=0 by -5 { say i }"), "10\n5\n0\n");
  assert.equal(await output("loop i in 0..0 { say i }"), "");
  assert.equal(await output("loop i in 0..10 { when i == 1 { skip }\nwhen i == 3 { stop }\nsay i }"), "0\n2\n");
  assert.equal(await output("pit n = 0\nloop { n += 1\nwhen n == 4 { stop } }\nsay n"), "4\n");
  assert.equal(await output('loop c in "hey" { say c }'), "h\ne\ny\n");
  assert.equal(await output("loop x, i in [5, 6] { say i, x }"), "0 5\n1 6\n");
  assert.equal(await output("loop k, v in {a: 1, b: 2} { say k, v }"), "a 1\nb 2\n");
  assert.equal(await output("loop k in {a: 1, b: 2} { say k }"), "a\nb\n");
  assert.equal(await output("pit r = 0..3\nloop x in r { say x }"), "0\n1\n2\n");
});

test("functions, recursion and closures", async () => {
  assert.equal(await output("add(a, b) => a + b\nsay add(2, 3)"), "5\n");
  assert.equal(await output("say later2(1)\nlater2(x) => x + 1"), "2\n"); // functions are hoisted
  assert.equal(await output("f() => { say 1 }\nsay f()"), "1\nnil\n");
  assert.equal(await output("fact(n) => { when n <= 1 { back 1 }\nback n * fact(n - 1) }\nsay fact(10)"), "3628800\n");
  assert.equal(await output("greet(name, greeting = \"Hi\") => \"{greeting} {name}\"\nsay greet(\"Pat\"), greet(\"Pat\", \"Yo\")"), "Hi Pat Yo Pat\n");
  assert.equal(await output("total(...xs) => xs.sum()\nsay total(), total(1, 2, 3)"), "0 6\n");
  assert.equal(await output("f(a, b) => a + b\npit xs = [1, 2]\nsay f(...xs)"), "3\n");
  assert.equal(await output(`
    counter() => {
      pit c = 0
      back () => {
        c += 1
        back c
      }
    }
    pit a = counter()
    pit b = counter()
    a()
    a()
    say a(), b()
  `), "3 1\n");
  assert.equal(await output("twice(f, x) => f(f(x))\nsay twice(n => n * 3, 2)"), "18\n");
  // Each loop pass gets its own variable, so closures capture different values.
  assert.equal(await output("pit fs = []\nloop i in 0..3 { fs.add(() => i) }\nsay fs.map(f => f())"), "[0, 1, 2]\n");
  assert.equal(await output("say [1, 2, 3].map(n => say n)"), "1\n2\n3\n[nil, nil, nil]\n");
});

test("block scoping", async () => {
  assert.equal(await output("pit x = 1\n{ pit x = 2\nsay x }\nsay x"), "2\n1\n");
  assert.equal(await output("pit len = 5\nsay len"), "5\n"); // built-ins can be shadowed
});

test("match", async () => {
  const grade = `
    grade(n) => match n {
      100 => "perfect"
      90..100 => "A"
      80..90, 70..80 => "B or C"
      other => "keep diving"
    }
    say grade(100), grade(95), grade(75), grade(3)
  `;
  assert.equal(await output(grade), "perfect A B or C keep diving\n");
  assert.equal(await output(`
    pit x = "hi"
    match x {
      "hello", "hi" => say "greeting"
      nil => say "nothing"
      other => {
        say "something"
        say "else"
      }
    }
  `), "greeting\n");
  assert.equal(await output("say match 5 { 1 => \"one\" }"), "nil\n");
  assert.equal(await output("kind A {}\nkind B {}\nsay match B() { A => \"a\"\nB => \"b\" }"), "b\n");
  assert.equal(await output("loop i in 0..5 { match i { 2 => skip\n4 => stop\nother => say i } }"), "0\n1\n3\n");
});

test("a #! first line is ignored", async () => {
  assert.equal(await output("#!/usr/bin/env pitcode\nsay 1"), "1\n");
});

test("runtime errors carry line and column", async () => {
  const e = await errorOf("pit a = [1]\nsay a + 1");
  assert.equal(e.kind, "RuntimeError");
  assert.match(e.message, /Can't add list and number/);
  assert.equal(e.line, 2);
  assert.equal(e.col, 7);
  assert.match(e.format(), /test\.pit:2:7[\s\S]*\n {3}\| {7}\^/);
});

test("names are checked before the program runs", async () => {
  // The first line never prints: the whole program is checked first.
  const e = await errorOf("say 1\nsay missing");
  assert.equal(e.kind, "NameError");
  assert.match(e.message, /Undefined variable 'missing'/);
  assert.match((await errorOf("pit count = 1\nsay cuont")).message, /Did you mean 'count'\?/);
  assert.match((await errorOf('print("hi")')).message, /uses 'say'/);
  assert.match((await errorOf("lock PI = 3\nPI = 4")).message, /Cannot change locked 'PI'/);
  assert.match((await errorOf("pit a = 1\npit a = 2")).message, /already exists/);
  assert.match((await errorOf("len = 3")).message, /Cannot change built-in 'len'/);
  assert.match((await errorOf("nope = 1")).message, /Undefined variable 'nope'/);
});

test("runtime error messages", async () => {
  const msg = async (src: string) => (await errorOf(src)).message;
  assert.match(await msg("say 1 / 0"), /Division by zero/);
  assert.match(await msg('say "a" - 1'), /needs two numbers/);
  assert.match(await msg("say nil + 1"), /Can't add nil and number/);
  assert.match(await msg('say 1 < "2"'), /Can't compare/);
  assert.match(await msg("pit x = 5\nx()"), /not a function/);
  assert.match(await msg("f(a) => a\nf()"), /expects 1 argument but got 0/);
  assert.match(await msg('len("a", "b")'), /expects 1 argument but got 2/);
  assert.match(await msg('loop i in "a"..3 { }'), /range needs numbers/);
  assert.match(await msg("f(n) => f(n + 1)\nf(0)"), /Too much recursion/);
  assert.match(await msg("pit m = nil\nsay m.name"), /Can't read 'name' of nil/);
  assert.match(await msg("say [1].push(2)"), /Lists don't have 'push'. Did you mean 'add'\?/);
  assert.match(await msg('say "x".uper()'), /Did you mean 'upper'\?/);
  assert.match(await msg("loop x in 5 { }"), /use a range like: loop i in 0\.\.5/);
  assert.match(await msg("say x\npit x = 1"), /'x' is used before it is created/);
});
