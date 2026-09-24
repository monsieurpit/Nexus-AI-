import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { loadModuleFromDisk, nodeFileSystem } from "../src/host/node";
import { Runtime } from "../src/index";
import { errorOf, output } from "./helpers";

test("generators with give", async () => {
  assert.equal(await output("count(n) => {\n  loop i in 0..n { give i * 10 }\n}\nsay list(count(3))"), "[0, 10, 20]\n");
  assert.equal(await output("nums() => {\n  give 1\n  give 2\n}\nloop n in nums() { say n }"), "1\n2\n");
  assert.equal(await output(`
    fib() => {
      pit [a, b] = [0, 1]
      loop {
        give a
        [a, b] = [b, a + b]
      }
    }
    loop n in fib() {
      when n > 20 { stop }
      say n
    }
  `), "0\n1\n1\n2\n3\n5\n8\n13\n");
});

test("async generators with loop wait", async () => {
  assert.equal(await output(`
    ticks(n) => {
      loop i in 0..n {
        wait sleep(1)
        give i
      }
    }
    loop wait t in ticks(3) { say "tick", t }
  `), "tick 0\ntick 1\ntick 2\n");
});

test("async with wait", async () => {
  assert.equal(await output("slow(x) => {\n  wait sleep(5)\n  back x * 2\n}\nsay wait slow(21)"), "42\n");
  assert.equal(await output("slow(x) => {\n  wait sleep(5)\n  back x\n}\nsay wait all([slow(1), slow(2)])"), "[1, 2]\n");
  assert.equal(await output("pit p = promise((done, fail) => later(5, () => done(7)))\nsay wait p"), "7\n");
  assert.equal(await output("f() => {\n  wait sleep(1)\n  raise \"late\"\n}\nattempt { wait f() } rescue e { say e.message }"), "late\n");
  assert.equal(await output("say type(sleep(1))"), "promise\n");
  assert.equal(await output('later(5, () => say "b")\nsay "a"\nwait sleep(20)'), "a\nb\n");
});

test("modules with use and share", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pit-"));
  writeFileSync(join(dir, "tools.pit"), 'share add(a, b) => a + b\nshare lock PI = 3.14\npit secret = 1\nshare kind Point {\n  init(x) => { me.x = x }\n}\n');
  const main = join(dir, "main.pit");
  const withFile = async (body: string) => {
    let out = "";
    await new Runtime({ write: (t) => (out += t), loadModule: loadModuleFromDisk }).run(body, main);
    return out;
  };
  assert.equal(await withFile('use { add, PI } from "./tools"\nsay add(1, 2), PI'), "3 3.14\n");
  assert.equal(await withFile('use tools from "./tools.pit"\nsay tools.add(2, 2), tools.Point(5).x, tools.secret'), "4 5 nil\n");
  assert.equal(await withFile('use { add as plus } from "./tools"\nsay plus(1, 1)'), "2\n");
  await assert.rejects(withFile('use { nope } from "./tools"'), /doesn't share 'nope'/);
  await assert.rejects(withFile('use x from "./missing"'), /Can't find the file/);
  await assert.rejects(withFile('pit a = 1\n{ use x from "./a" }'), /top of a file/);
});

test("files", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pit-"));
  const file = join(dir, "log.txt").replace(/\\/g, "/");
  const out = await output(`
    files.write("${file}", "one")
    files.append("${file}", "\\ntwo")
    say files.read("${file}").lines(), files.exists("${file}")
    files.remove("${file}")
    say files.exists("${file}")
  `, [], { fs: nodeFileSystem });
  assert.equal(out, '["one", "two"] true\nfalse\n');
  assert.match((await errorOf('files.read("x")')).message, /Files can't be used here/);
});

test("math, json, time", async () => {
  assert.equal(await output("say math.sqrt(16), math.round(3.14159, 2), math.max([1, 5, 2]), math.min(4, 2), math.PI.round(3)"), "4 3.14 5 2 3.142\n");
  assert.equal(await output("pit r = math.random(1, 6)\nsay r >= 1 and r <= 6 and r.isWhole"), "true\n");
  assert.equal(await output('say json.text({a: [1, nil, true], b: {c: "d"}}), json.parse(r"""{"x": [1, {"y": 2}]}""")'), '{"a":[1,null,true],"b":{"c":"d"}} {x: [1, {y: 2}]}\n');
  assert.equal(await output('say json.text({a: 1}, 2)'), '{\n  "a": 1\n}\n');
  assert.match((await errorOf('json.parse(r"{nope")')).message, /not valid JSON/);
  assert.equal(await output("pit t = time.make(2024, 7, 14, 9, 5)\nsay time.format(t, \"YYYY-MM-DD HH:mm DDDD\"), time.date(t).month"), "2024-07-14 09:05 Sunday 7\n");
  assert.equal(await output("say time.now() > 0, type(clock())"), "true number\n");
});

test("built-in conversions", async () => {
  assert.equal(await output('say str(1.5), num("2.5"), num("x"), int("7.9"), int(-2.5), type(str)'), "1.5 2.5 nil 7 -2 function\n");
  assert.equal(await output('say int("ff", 16), int("101", 2), int("zz", 10)'), "255 5 nil\n");
  assert.equal(await output("kind P { init() => { me.x = 1 } }\nsay fields(P()), fields({a: 1})"), "{x: 1} {a: 1}\n");
  assert.equal(await output('say len("abc"), len([1, 2]), len({a: 1}), len(set([1]))'), "3 2 1 1\n");
  assert.equal(await output('pit n = ask("name? ")\nsay "Hi {n}"', ["Pat"]), "Hi Pat\n");
  assert.equal(await output("say ask()"), "nil\n");
  assert.equal(await output("say args", [], { args: ["a", "b"] }), '["a", "b"]\n');
});
