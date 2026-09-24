import assert from "node:assert/strict";
import { test } from "node:test";
import { errorOf, output } from "./helpers";

test("lists", async () => {
  assert.equal(await output("pit l = [3, 1, 2]\nl.add(5)\nsay l, l.size, l[0], l[-1], l[9]"), "[3, 1, 2, 5] 4 3 5 nil\n");
  assert.equal(await output("pit l = [1, 2]\nl[0] = 9\nl[2] = 3\nl[-1] += 1\nsay l"), "[9, 2, 4]\n");
  assert.equal(await output("say [1, 2, 3].map(n => n * 2), [1, 2, 3, 4].filter(n => n % 2 == 0)"), "[2, 4, 6] [2, 4]\n");
  assert.equal(await output("say [1, 2, 3].reduce((a, b) => a + b), [1, 2].reduce((a, b) => a + b, 10)"), "6 13\n");
  assert.equal(await output("say [3, 1, 2].sort(), [3, 1, 2].sort((a, b) => b - a), [\"b\", \"a\"].sort()"), "[1, 2, 3] [3, 2, 1] [\"a\", \"b\"]\n");
  assert.equal(await output("say [\"bb\", \"a\", \"ccc\"].sortBy(s => s.size)"), "[\"a\", \"bb\", \"ccc\"]\n");
  assert.equal(await output("say [1, 2, 3].has(2), [1, 2, 3].indexOf(3), [1].indexOf(7)"), "true 2 nil\n");
  assert.equal(await output("say [1, 2, 3].find(n => n > 1), [1, 2].any(n => n > 1), [1, 2].all(n => n > 1)"), "2 true false\n");
  assert.equal(await output("say [1, 2, 3].join(), [1, 2, 3].join(\"-\"), [1, [2, [3]]].flat()"), "1, 2, 3 1-2-3 [1, 2, [3]]\n");
  assert.equal(await output("say [1, 1, 2].unique(), [4, 2, 9].min(), [4, 2, 9].max(), [2, 4].average()"), "[1, 2] 2 9 3\n");
  assert.equal(await output("say [1, 2, 3, 4, 5].slice(1, 3), [1, 2, 3].take(2), [1, 2, 3].drop(2), [1, 2, 3].reverse()"), "[2, 3] [1, 2] [3] [3, 2, 1]\n");
  assert.equal(await output("say [1, 2, 3, 4, 5].chunk(2), [1, 2].zip([\"a\", \"b\"])"), "[[1, 2], [3, 4], [5]] [[1, \"a\"], [2, \"b\"]]\n");
  assert.equal(await output("say [1, 2, 3, 4].groupBy(n => n % 2 == 0 ? \"even\" : \"odd\")"), "{odd: [1, 3], even: [2, 4]}\n");
  assert.equal(await output("pit l = [1, 2, 3]\nsay l.pop(), l.popFirst(), l\nl.addFirst(0)\nl.insert(1, 5)\nsay l\nsay l.removeAt(0), l.remove(5), l.remove(7), l"), "3 1 [2]\n[0, 5, 2]\n0 true false [2]\n");
  assert.equal(await output("say [1, 2, 3].count(), [1, 2, 2].count(2), [1, 2, 3].count(n => n > 1)"), "3 2 2\n");
  assert.equal(await output("say [...[1, 2], 3, ...(4..=5)], [1] + [2], [].first, [7].last, [].isEmpty"), "[1, 2, 3, 4, 5] [1, 2] nil 7 true\n");
  assert.equal(await output("say [\n  1,\n  2\n  3\n]"), "[1, 2, 3]\n");
});

test("maps", async () => {
  assert.equal(await output('pit p = {name: "Pat", "fav color": "blue", 3: "three"}\nsay p, p.name, p["fav color"], p.nope'), '{name: "Pat", "fav color": "blue", "3": "three"} Pat blue nil\n');
  assert.equal(await output('pit p = {}\np.a = 1\np["b"] = 2\np.a += 10\nsay p, p.size, p.keys(), p.values()'), '{a: 11, b: 2} 2 ["a", "b"] [11, 2]\n');
  assert.equal(await output('pit m = {a: 1}\nsay m.has("a"), m.get("z", 0), m.remove("a"), m, m.isEmpty'), "true 0 true {} true\n");
  assert.equal(await output("pit x = 1\nsay {x, y: 2}, {[1 + 1]: \"two\"}"), '{x: 1, y: 2} {2: "two"}\n');
  assert.equal(await output('say {...{a: 1, b: 2}, b: 3}, {a: 1}.merge({b: 2}), {a: 1}.entries()'), '{a: 1, b: 3} {a: 1, b: 2} [["a", 1]]\n');
  assert.equal(await output("pit m = {double(n) => n * 2, half: n => n / 2}\nsay m.double(4), m.half(4)"), "8 2\n");
  assert.equal(await output("say {a: 1, b: 2}.filter((k, v) => v > 1), {a: 1}.mapValues(v => v + 1)"), "{b: 2} {a: 2}\n");
  assert.equal(await output("pit m = {\n  a: 1\n  b: 2\n}\nsay m"), "{a: 1, b: 2}\n");
  assert.equal(await output("pit m = {size: 99}\nsay m.size"), "99\n"); // your own keys come first
});

test("destructuring", async () => {
  assert.equal(await output("pit [a, b, ...rest] = [1, 2, 3, 4]\nsay a, b, rest"), "1 2 [3, 4]\n");
  assert.equal(await output("pit [a, b = 5] = [1]\nsay a, b"), "1 5\n");
  assert.equal(await output('pit {name, age: years, city = "?"} = {name: "Pat", age: 60}\nsay name, years, city'), "Pat 60 ?\n");
  assert.equal(await output("pit {a, ...others} = {a: 1, b: 2, c: 3}\nsay a, others"), "1 {b: 2, c: 3}\n");
  assert.equal(await output('lock [x, y] = "hi"\nsay x, y'), "h i\n");
  assert.match((await errorOf("pit [a] = nil")).message, /Can't unpack nil/);
});

test("sets and ranges", async () => {
  assert.equal(await output("pit s = set([1, 2, 2])\ns.add(3)\nsay s, s.size, s.has(2), 2 in s"), "set(1, 2, 3) 3 true true\n");
  assert.equal(await output("say set([1, 2]).union([2, 3]), set([1, 2]).intersect(set([2, 3])), set([1, 2]).difference([2])"), "set(1, 2, 3) set(2) set(1)\n");
  assert.equal(await output("pit r = 1..=10 by 3\nsay r, r.list(), r.size, 7 in r, 8 in r, r[1]"), "1..=10 by 3 [1, 4, 7, 10] 4 true false 4\n");
  assert.equal(await output("say (1..4).map(n => n * n), (0..5).sum(), range(3).list(), range(0, 10, 5).list()"), "[1, 4, 9] 10 [0, 1, 2] [0, 5]\n");
});

test("text methods", async () => {
  assert.equal(await output('say "Hello".upper(), "Hello".lower(), "hi".capitalize(), "  x ".trim(), "abc".size, "abc"[1], "abc"[-1]'), "HELLO hello Hi x 3 b c\n");
  assert.equal(await output('say "a,b,c".split(","), "one two  three".split(), "a\\nb".lines(), "abc".chars()'), '["a", "b", "c"] ["one", "two", "three"] ["a", "b"] ["a", "b", "c"]\n');
  assert.equal(await output('say "banana".replace("a", "o"), "banana".replaceFirst("a", "o"), "banana".count("an")'), "bonono bonana 2\n");
  assert.equal(await output('say "banana".has("nan"), "banana".startsWith("ba"), "banana".endsWith("na"), "banana".indexOf("n"), "banana".indexOf("z")'), "true true true 2 nil\n");
  assert.equal(await output('say "abc".reverse(), "ab".repeat(3), "7".padStart(3, "0"), "hello".slice(1, 3), "hello".slice(-3)'), "cba ababab 007 el llo\n");
  assert.equal(await output('pit p = pattern("[0-9]+")\nsay "a1b22".findAll(p), "a1b22".find(p), "x9".matches(p), "a1b2".replace(p, "#"), p.test("abc")'), '["1", "22"] 1 true a#b# false\n');
  assert.equal(await output('say "a1b22".replace(pattern("[0-9]+"), d => "<" + d + ">")'), "a<1>b<22>\n");
  assert.equal(await output('say "A".code(), char(66), "42".num() + 1'), "65 B 43\n");
});

test("number methods", async () => {
  assert.equal(await output("say 3.14159.round(2), (2.5).floor(), 2.1.ceil(), (-4).abs(), 3.fixed(2), 15.clamp(0, 10), 7.isWhole"), "3.14 2 3 4 3.00 10 true\n");
});

test("collection errors", async () => {
  assert.match((await errorOf("pit l = [1]\nl[5] = 2")).message, /outside the list/);
  assert.match((await errorOf("say [1][0.5]")).message, /whole numbers/);
  assert.match((await errorOf('pit s = "abc"\ns[0] = "x"')).message, /can't be changed/);
  assert.match((await errorOf("say [].reduce((a, b) => a + b)")).message, /starting value/);
  assert.match((await errorOf('say [1, "a"].sort()')).message, /Can't sort a mix/);
  assert.match((await errorOf("say [1].size()")).message, /not a method/);
  assert.match((await errorOf("pit l = [1]\nl.size = 3")).message, /Can't set 'size' on a list/);
});
