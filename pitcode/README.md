# PitCode

A friendly programming language with its own style. It can do what JavaScript does (and a bit more), with clearer words and error messages that tell you how to fix things.

```pit
pit name = "Pat"

greet(who) => "Hello, {who}!"

say greet(name)

kind Diver {
  init(name) => { me.name = name }
  dive(depth) => say "{me.name} dives to {depth} m"
}

Diver("Pat").dive(30)
```

Files end in `.pit`. PitCode compiles to JavaScript as it runs, so programs are fast.

## Run it

Needs [Node.js](https://nodejs.org) 18 or newer.

```sh
npm install
npm run build
npm link                      # once: makes the `pitcode` command available

pitcode examples/hello.pit    # run a program
pitcode                       # interactive prompt: type code, see results
pitcode --js file.pit         # see the JavaScript your program becomes
```

Run the tests with `npm test`. The full list of built-in functions and methods is in [docs/reference.md](docs/reference.md).

---

## Language tour

### Output and comments

```pit
say "Hello"                 // prints a line
say "Total:", 3 + 4         // several values, separated by spaces
/* a comment
   on several lines */
warn("Careful!")            // prints to the error output
```

### Variables

```pit
pit speed = 10              // a variable you can change
speed = 12
speed += 3                  // also -= *= /= %= **=
speed++                     // and --
nickname ??= "Pat"          // only sets it when it is nil

lock MAX_DEPTH = 40         // a constant: changing it is an error
pit nothing                 // starts as nil
```

Names can use letters from any language: `pit profondeur = 18`, `pit plongée = 1`.

### Values

| Type     | Examples                                  |
|----------|-------------------------------------------|
| number   | `42`, `3.14`, `-7`, `1_000_000`, `0xFF`, `1e6` |
| string   | `"hi"`, `"Line\nbreak"`, `"Hi {name}"`    |
| bool     | `true`, `false`                           |
| nil      | `nil` (no value)                          |
| list     | `[1, 2, 3]`                               |
| map      | `{name: "Pat", age: 60}`                  |
| set      | `set([1, 2, 3])`                          |
| range    | `0..10`, `1..=5`, `0..100 by 10`          |
| function | `(n) => n * 2`                            |
| kind     | `kind Dog { ... }`                        |

`type(value)` tells you which one you have.

### Text

```pit
pit depth = 18
say "Depth: {depth} m, pressure: {1 + depth / 10} bar"   // {...} puts a value in text
say "A brace: \{ and \}"

say """
    Text on
    several lines
    """

say r"C:\folder\{not interpolated}"         // raw text: no escapes, no {...}
say r"""{"json": "is easy here"}"""

say "Dive" + " log", "-" * 20                // join and repeat
say "hello".upper(), "a,b".split(","), "  x ".trim()
```

### Operators

| Kind        | Operators                                   |
|-------------|---------------------------------------------|
| Math        | `+  -  *  /  %  **`                         |
| Compare     | `==  !=  <  <=  >  >=`                      |
| Logic       | `and  or  not`                              |
| Membership  | `x in list`, `x not in list`, `"a" in text` |
| Kinds       | `pet is Dog`, `pet is not Cat`              |
| Nil helpers | `value ?? "default"`, `maybe?.name`, `maybeFn?.()` |
| Choice      | `ok ? "yes" : "no"`                         |
| Bits        | `&  \|  ^  ~  <<  >>`                       |

PitCode is strict so mistakes don't hide:
- `==` never converts types: `1 == "1"` is `false`.
- Only `false` and `nil` count as false. `0`, `""` and `[]` count as true.
- `"a" - 1` or `nil + 1` is an error instead of a strange result.
- Dividing by zero is an error.

### Conditions

```pit
when depth > 30 {
  say "deep dive"
} orwhen depth > 10 {
  say "normal dive"
} other {
  say "shallow"
}
```

### Match

```pit
pit grade = match score {
  100 => "perfect"
  90..100 => "A"
  80..90, 70..80 => "B or C"
  other => "keep practicing"
}

match pet {
  Dog => say "woof"                  // a kind matches its instances
  Cat => say "meow"
  other => {
    say "some other animal"
  }
}
```

### Loops

```pit
loop i in 0..5 { say i }             // 0 1 2 3 4
loop i in 1..=5 { say i }            // 1 2 3 4 5
loop i in 10..0 by -2 { say i }      // 10 8 6 4 2

loop name in ["Ann", "Bo"] { say name }
loop name, i in ["Ann", "Bo"] { say i, name }        // with the position
loop key, value in {a: 1, b: 2} { say key, value }   // maps give keys and values
loop [x, y] in [[1, 2], [3, 4]] { say x + y }        // unpack each item
loop letter in "hey" { say letter }
loop 3 times { say "hip hip hooray" }              // repeat

loop count < 3 { count += 1 }        // while the condition is true
loop {                               // forever...
  when done() { stop }               // ...leave the loop
  when busy() { skip }               // ...jump to the next turn
}
```

### Functions

```pit
area(w, h) => w * h                  // one line: the value is given back

volume(w, h, d) => {                 // a block: use `back` to give a value back
  pit base = area(w, h)
  back base * d
}

greet(name, greeting = "Hi") => "{greeting} {name}"   // default values
total(...numbers) => numbers.sum()                      // any number of values
say total(1, 2, 3), total(...[4, 5])                    // spread a list into values

sumPair([a, b]) => a + b             // unpack a list or map given as a value
people.map(({name}) => name)

pit double = n => n * 2              // functions are values
pit add = (a, b) => a + b
say [1, 2, 3].map(double)

makeCounter() => {                   // functions remember what's around them
  pit count = 0
  back () => {
    count += 1
    back count
  }
}
```

Functions can be used before the line where they are written.

### Lists

```pit
pit dives = [18, 32, 12]
dives.add(40)
say dives[0], dives[-1], dives.size          // first, last, how many
dives[1] = 30

say dives.map(d => d * 3.28)                 // change each item
say dives.filter(d => d > 15)                // keep some items
say dives.sort(), dives.sum(), dives.max()
say [1, 2] + [3], [...dives, 50]
```

### Maps

```pit
pit diver = {name: "Pat", dives: 212}
diver.city = "Montreal"                       // add or change a key
diver["favorite site"] = "Cozumel"
say diver.name, diver.missing                  // missing keys are nil
say diver.keys(), diver.has("city")
pit copy = {...diver, dives: 213}              // copy with changes
```

### Unpacking

```pit
pit [first, second, ...rest] = [1, 2, 3, 4]
pit {name, dives: count, city = "?"} = diver
[a, b] = [b, a]                                 // swap
```

### Kinds (objects)

```pit
kind Tank {
  pit material = "aluminium"         // a field with a starting value
  lock valves = 1                    // a field that can't change
  shared made = 0                    // shared by the whole kind

  init(liters, pressure) => {        // runs when a Tank is created
    me.liters = liters               // `me` is the tank itself
    me.pressure = pressure
    Tank.made += 1
  }

  get air() => me.liters * me.pressure   // read like a field: tank.air
  set bar(value) => { me.pressure = value }

  breathe(liters) => {
    me.pressure -= liters / me.liters
  }

  show() => "Tank({me.liters} L)"   // how `say` prints it

  shared small() => Tank(7, 200)    // tied to the kind: Tank.small()
}

kind SteelTank from Tank {          // a kind of Tank
  init(liters, pressure) => {
    up.init(liters, pressure)       // `up` runs the parent kind's version
    me.material = "steel"
  }
}

pit t = SteelTank(12, 232)          // no `new`, just call the kind
t.breathe(100)
say t.air, t is Tank, type(t)
```

Give a kind an `items()` method (often with `give`) and you can `loop` over it.

### Errors

```pit
kind OutOfAir from Error {}          // your own kind of error

attempt {
  raise OutOfAir("No air left!")
} rescue problem {
  say problem.name, problem.message, problem.line
} always {
  say "this always runs"
}

check(depth < 40, "Too deep!")       // raises an error when the condition is false
```

Mistakes in the program (like dividing by zero) can be rescued too.

### Generators: `give`

A function that uses `give` hands out values one at a time:

```pit
countdown(n) => {
  loop i in n..0 { give i }
}
loop x in countdown(3) { say x }     // 3 2 1
say list(countdown(3))               // [3, 2, 1]
```

### Waiting: `wait`

A function that uses `wait` is async by itself (no extra keyword needed):

```pit
fetchWeather(city) => {
  pit answer = wait fetch("https://wttr.in/{city}?format=j1")
  back wait answer.json()
}

wait sleep(1000)                                  // pause one second
pit results = wait all([task1(), task2()])        // run together
later(500, () => say "half a second later")       // run later
pit id = every(1000, () => say "tick")            // repeat
cancel(id)
```

### Modules: `use` and `share`

```pit
// divetools.pit
share lock SURFACE = 1.013
share pressureAt(depth) => SURFACE + depth / 10

// main.pit
use { pressureAt } from "./divetools"
use tools from "./divetools.pit"
say pressureAt(30), tools.SURFACE
```

### Built-in modules

```pit
say math.sqrt(16), math.PI, math.random(1, 6), math.round(3.14159, 2)
say json.text({a: [1, 2]}), json.parse(r"""{"x": 1}""").x
say time.format(time.now(), "YYYY-MM-DD HH:mm"), time.date().weekday
files.write("notes.txt", "hello")
say files.read("notes.txt")
say args, env.get("HOME")
pit name = ask("What's your name? ")
```

See [docs/reference.md](docs/reference.md) for everything that's built in.

---

## Coming from JavaScript

| JavaScript                              | PitCode                                  |
|-----------------------------------------|------------------------------------------|
| `let x = 1` / `const X = 1`             | `pit x = 1` / `lock X = 1`               |
| `function f(a) { return a }`            | `f(a) => { back a }` or `f(a) => a`       |
| `console.log(x)`                        | `say x`                                  |
| `if` / `else if` / `else`               | `when` / `orwhen` / `other`              |
| `while (c) {}`                          | `loop c {}`                              |
| `for (const x of list) {}`              | `loop x in list {}`                      |
| `for (let i = 0; i < 10; i++) {}`       | `loop i in 0..10 {}`                     |
| `break` / `continue`                    | `stop` / `skip`                          |
| `switch`                                | `match`                                  |
| `&&` / `\|\|` / `!`                     | `and` / `or` / `not`                     |
| `===` / `!==`                           | `==` / `!=`                              |
| `null` / `undefined`                    | `nil`                                    |
| `` `Hi ${name}` ``                      | `"Hi {name}"`                            |
| `class Dog extends Animal`              | `kind Dog from Animal`                   |
| `new Dog()`                             | `Dog()`                                  |
| `this` / `super`                        | `me` / `up`                              |
| `constructor()`                         | `init()`                                 |
| `static`                                | `shared`                                 |
| `try` / `catch` / `finally` / `throw`   | `attempt` / `rescue` / `always` / `raise` |
| `async` / `await`                       | (automatic) / `wait`                     |
| `function*` / `yield`                   | (automatic) / `give`                     |
| `import` / `export`                     | `use` / `share`                          |
| `typeof x` / `x instanceof Dog`         | `type(x)` / `x is Dog`                   |
| `arr.push(x)` / `arr.length`            | `list.add(x)` / `list.size`              |
| `arr.includes(x)`                       | `list.has(x)` or `x in list`             |
| `setTimeout` / `setInterval`            | `later` / `every`                        |
| `JSON.stringify` / `JSON.parse`         | `json.text` / `json.parse`               |
| `Math.sqrt`                             | `math.sqrt`                              |

If you type the JavaScript word by habit, PitCode tells you its word for it:

```
NameError: Undefined variable 'console'. PitCode uses 'say' to print, like: say "hello"
```

## Error messages

Errors show what went wrong and where:

```
RuntimeError: Lists don't have 'push'. Did you mean 'add'?
  --> dive.pit:4:7
   |
 4 | dives.push(40)
   |       ^
```

Mistakes in names (typos, changing a `lock`, using something that doesn't exist) are found **before** the program starts, so a typo in rarely-used code can't surprise you later.

## How it works

1. `src/lexer.ts` turns text into tokens.
2. `src/parser.ts` turns tokens into a syntax tree (`src/ast.ts`).
3. `src/compiler.ts` checks names and turns the tree into JavaScript.
4. `src/runtime/` has everything the compiled code relies on: values, operators, methods, and the standard library.
5. `src/cli.ts` is the `pitcode` command, and `src/repl.ts` is the interactive prompt.
