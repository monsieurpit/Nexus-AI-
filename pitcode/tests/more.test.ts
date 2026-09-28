import assert from "node:assert/strict";
import { test } from "node:test";
import { errorOf, output } from "./helpers";

test("named loops: stop and skip an outer loop", async () => {
  assert.equal(await output(`
    loop i in 0..3 as outer {
      loop j in 0..3 {
        when j == 2 { skip outer }
        when i == 2 { stop outer }
        say i, j
      }
    }
  `), "0 0\n0 1\n1 0\n1 1\n");
  assert.equal(await output("loop as forever {\n  loop x in [1] { stop forever }\n}\nsay \"out\""), "out\n");
  assert.match((await errorOf("loop { stop nope }")).message, /no loop called 'nope'/);
  assert.match((await errorOf("loop as a { loop as a { } }")).message, /already called 'a'/);
});

test("loop until checks after each turn", async () => {
  assert.equal(await output("pit n = 0\nloop {\n  n += 1\n} until n >= 3\nsay n"), "3\n");
  assert.equal(await output("pit n = 10\nloop { n += 1 } until true\nsay n"), "11\n");
});

test("private _names", async () => {
  const account = `
    kind Account {
      init(owner) => {
        me.owner = owner
        me._balance = 0
      }
      deposit(n) => {
        me._check(n)
        me._balance += n
        back me
      }
      _check(n) => { check(n > 0, "Deposits must be positive") }
      get balance() => me._balance
      same(other) => me._balance == other._balance
    }
  `;
  assert.equal(await output(`${account}\npit a = Account("Pat").deposit(50)\nsay a.balance, a.same(Account("B"))`), "50 false\n");
  assert.match((await errorOf(`${account}\nsay Account("P")._balance`)).message, /'_balance' is private to Account/);
  assert.match((await errorOf(`${account}\nAccount("P")._balance = 5`)).message, /private/);
  assert.match((await errorOf(`${account}\nAccount("P")._check(1)`)).message, /private/);
  assert.equal(await output("pit doc = {_id: 5}\nsay doc._id"), "5\n"); // maps have no private keys
});

test("other is a normal name outside when and match", async () => {
  assert.equal(await output("pit other = 1\nwhen other > 5 { say \"big\" } other { say other }"), "1\n");
  assert.equal(await output("say match 3 { 1 => \"one\"\nother => \"many\" }"), "many\n");
});

test("big whole numbers", async () => {
  assert.equal(await output("say 2n ** 100n, type(5n), -5n, 7n / 2n, 7n % 2n, 0xFFn"), "1267650600228229401496703205376 big -5 3 1 255\n");
  assert.equal(await output('say big(12) * 3n, big("123456789012345678901234567890") + 1n, num(9n) + 1, int(4n)'), "36 123456789012345678901234567891 10 4\n");
  assert.equal(await output("say [3n, 1n, 2n].sort(), 5n == 5n, 1n < 2, json.text({a: 10n})"), '[1, 2, 3] true true {"a":10}\n');
  assert.match((await errorOf("say 1n + 1")).message, /Can't mix big and normal numbers/);
  assert.match((await errorOf("say 1n / 0n")).message, /Division by zero/);
  assert.match((await errorOf("say big(1.5)")).message, /whole number/);
});

test("more list and text methods", async () => {
  assert.equal(await output("say [[1], [2, 3]].flatMap(x => x), [1, 2, 3, 4].findLast(n => n % 2 == 1), [1, 2, 1].lastIndexOf(1)"), "[1, 2, 3] 3 2\n");
  assert.equal(await output('pit ps = [{n: "A", age: 30}, {n: "B", age: 20}]\nsay ps.minBy(p => p.age).n, ps.maxBy(p => p.age).n, ps.sumBy(p => p.age)'), "B A 50\n");
  assert.equal(await output('say [1, 2, 3, 4].partition(n => n > 2), ["a", "bb", "cc"].countBy(s => s.size), [1, 2, 3].window(2), [0, 0].fill(7)'), "[[3, 4], [1, 2]] {1: 1, 2: 2} [[1, 2], [2, 3]] [7, 7]\n");
  assert.equal(await output('say "é".compare("e"), "b".compare("a"), "Plongée".plain(), "  ".isBlank(), "hi".center(6, "*")'), "0 1 Plongee true **hi**\n");
});

test("settled, first and events", async () => {
  const src = `
    bad() => {
      wait sleep(1)
      raise "no"
    }
    good() => {
      wait sleep(1)
      back 1
    }
    say wait settled([good(), bad()])
    say wait first([bad(), good()])
    pit bus = events()
    bus.on("dive", d => say "diving to {d}")
    bus.once("dive", d => say "first dive!")
    say bus.emit("dive", 18), bus.emit("dive", 30), bus.count("dive")
  `;
  assert.equal(await output(src), "[{ok: true, value: 1}, {ok: false, error: Error: no}]\n1\ndiving to 18\nfirst dive!\ndiving to 30\n2 1 1\n");
});

test("shell and web.serve on a computer", async () => {
  const { nodeSystem } = await import("../src/host/node");
  const src = `
    say shell("echo hello").out.trim()
    pit server = wait web.serve(0, req => match req.path {
      "/" => "<h1>Hi</h1>"
      "/api" => {depth: 18, q: req.query.get("x")}
      other => web.reply("Not here", 404)
    })
    pit base = "http://localhost:{server.port}"
    say wait (wait fetch(base)).text()
    say wait (wait fetch(base + "/api?x=1")).json()
    say (wait fetch(base + "/nope")).status
    server.stop()
  `;
  assert.equal(await output(src, [], { system: nodeSystem }), 'hello\n<h1>Hi</h1>\n{depth: 18, q: "1"}\n404\n');
  assert.match((await errorOf('shell("ls")')).message, /only run on a computer/);
});

test("kinds can define operators", async () => {
  const vec = `
    kind Vec {
      init(x, y) => {
        me.x = x
        me.y = y
      }
      plus(o) => Vec(me.x + o.x, me.y + o.y)
      times(k) => Vec(me.x * k, me.y * k)
      equals(o) => o is Vec and me.x == o.x and me.y == o.y
      compare(o) => me.x - o.x
      show() => "Vec({me.x}, {me.y})"
    }
  `;
  assert.equal(await output(`${vec}\npit a = Vec(1, 2)\npit b = Vec(3, 4)\nsay a + b, a * 3, a == Vec(1, 2), a != b, a < b, [b, a].sort()`),
    "Vec(4, 6) Vec(3, 6) true true true [Vec(1, 2), Vec(3, 4)]\n");
  assert.match((await errorOf(`${vec}\nsay Vec(1, 1) - Vec(1, 1)`)).message, /Vec can't use '-'. Give it a minus\(other\) method/);
  assert.match((await errorOf("kind A {}\nsay A() < A()")).message, /Give it a compare\(other\) method/);
});

test("give can receive a value sent with next()", async () => {
  assert.equal(await output(`
    talker() => {
      pit name = give "What's your name?"
      give "Hi {name}!"
    }
    pit t = talker()
    say t.next().value
    say t.next("Pat").value
    say t.next().done
  `), "What's your name?\nHi Pat!\ntrue\n");
});

test("errors show where functions were called from", async () => {
  const e = await errorOf("average(list) => list.sum() / list.size\nreport(d) => {\n  say average(d)\n}\nreport([])");
  assert.equal(e.line, 1);
  assert.deepEqual(e.trace.map((t) => t.line), [3, 5]);
  assert.match(e.format(), /called from test\.pit:3:14\n {2}called from test\.pit:5:7$/);
  const raised = await errorOf('check2(x) => { raise "bad {x}" }\nloop i in 0..1 { check2(i) }');
  assert.deepEqual(raised.trace.map((t) => t.line), [2]);
});
