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
