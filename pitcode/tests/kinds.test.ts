import assert from "node:assert/strict";
import { test } from "node:test";
import { errorOf, output } from "./helpers";

const ANIMALS = `
kind Animal {
  pit sound = "..."
  shared count = 0
  init(name) => {
    me.name = name
    Animal.count += 1
  }
  speak() => "{me.name} says {me.sound}"
  shared create(name) => Animal(name)
}

kind Dog from Animal {
  lock legs = 4
  init(name, breed = "mutt") => {
    up.init(name)
    me.breed = breed
    me.sound = "woof"
  }
  speak() => up.speak() + "!"
  get label() => "{me.name} the {me.breed}"
  set nickname(value) => { me.name = value.upper() }
}
`;

test("kinds, init, methods and fields", async () => {
  assert.equal(await output(`${ANIMALS}\npit a = Animal("Cat")\nsay a.speak(), a.name, a.sound, type(a), a is Animal, a is Dog`),
    "Cat says ... Cat ... Animal true false\n");
  assert.equal(await output(`${ANIMALS}\nsay Animal("Cat")`), 'Animal {sound: "...", name: "Cat"}\n');
});

test("inheritance with from and up", async () => {
  assert.equal(await output(`${ANIMALS}\npit d = Dog("Rex", "lab")\nsay d.speak(), d.legs, d is Animal, d.label`),
    "Rex says woof! 4 true Rex the lab\n");
  assert.equal(await output(`${ANIMALS}\npit d = Dog("Rex")\nd.nickname = "rexy"\nsay d.name, d.breed`), "REXY mutt\n");
});

test("shared members", async () => {
  assert.equal(await output(`${ANIMALS}\nAnimal("a")\nDog("b")\nsay Animal.count, Animal.create("c").name, Animal.count`), "2 c 3\n");
});

test("methods remember me", async () => {
  assert.equal(await output(`${ANIMALS}\npit speak = Dog("Rex").speak\nsay speak()\nsay ["Ann", "Bo"].map(Animal).map(a => a.name)`),
    "Rex says woof!\n[\"Ann\", \"Bo\"]\n");
  assert.equal(await output(`
    kind Counter {
      pit n = 0
      tick() => {
        [1, 2, 3].each(x => { me.n += x })
        back me
      }
    }
    say Counter().tick().tick().n
  `), "12\n");
});

test("show() customizes printing", async () => {
  assert.equal(await output('kind P {\n init(x) => { me.x = x }\n show() => "P({me.x})"\n}\nsay P(1), [P(2)], "is {P(3)}"'), "P(1) [P(2)] is P(3)\n");
});

test("fields can be set on the fly and read with []", async () => {
  assert.equal(await output('kind Box {}\npit b = Box()\nb.color = "red"\nsay b.color, b["color"], b.missing, "color" in b'), "red red nil true\n");
});

test("kind errors", async () => {
  assert.match((await errorOf(`${ANIMALS}\npit d = Dog("Rex")\nd.legs = 3`)).message, /Cannot change locked field 'legs'/);
  assert.match((await errorOf(`${ANIMALS}\nDog("Rex").label = "x"`)).message, /can only be read/);
  assert.match((await errorOf(`${ANIMALS}\nDog("Rex").bark()`)).message, /Dog has no method 'bark'/);
  assert.match((await errorOf(`${ANIMALS}\nDog()`)).message, /Dog\(\) expects 1 to 2 arguments but got 0/);
  assert.match((await errorOf("kind A {}\nA(1)")).message, /takes no values because it has no init/);
  assert.match((await errorOf("say me")).message, /only be used inside a kind/);
  assert.match((await errorOf("kind A { f() => up.f() }")).message, /'up' can only be used/);
  assert.match((await errorOf("pit x = 1\nkind A from x {}")).message, /only come 'from' another kind/);
  assert.match((await errorOf("say 1 is 2")).message, /'is' needs a kind/);
  assert.match((await errorOf("kind A {}\nA = 1")).message, /Cannot change kind 'A'/);
});

test("errors: attempt, rescue, always, raise", async () => {
  assert.equal(await output(`
    kind OutOfAir from Error {
      init(depth) => {
        up.init("Out of air at {depth} m")
        me.depth = depth
      }
    }
    attempt {
      raise OutOfAir(30)
    } rescue err {
      say err.name, err.message, err.depth, err is OutOfAir, err is Error
    } always {
      say "done"
    }
  `), "OutOfAir Out of air at 30 m 30 true true\ndone\n");
  assert.equal(await output('attempt { raise "bad" } rescue e { say e.name, e.message, e.line }'), "Error bad 1\n");
  assert.equal(await output("attempt { say 1 / 0 } rescue e { say e.name, e.message }"), "RuntimeError Division by zero\n");
  assert.equal(await output("attempt { say [].nope() } rescue { say \"oops\" }"), "oops\n");
  assert.equal(await output(`
    f() => {
      attempt { back 1 } always { say "cleanup" }
    }
    say f()
  `), "cleanup\n1\n");
  assert.equal(await output('attempt {\n  attempt { raise "inner" } rescue e { raise e }\n} rescue e { say e.message, e.line }'), "inner 2\n");
  const e = await errorOf('kind Oops from Error {}\nraise Oops("no")');
  assert.equal(e.kind, "Oops");
  assert.equal(e.message, "no");
  assert.equal(e.line, 2);
  assert.match((await errorOf('check(1 > 2, "math is broken")')).message, /math is broken/);
});
