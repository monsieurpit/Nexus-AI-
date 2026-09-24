# PitCode

A small, friendly programming language with its own syntax. Files end in `.pit`.

```pit
pit name = "Pat"

greet(who) => {
  back "Hello, {who}!"
}

say greet(name)
```

## Run it

Needs Node.js 18 or newer.

```sh
cd pitcode
npm install
npm run build
node dist/src/cli.js examples/hello.pit
```

To get a real `pitcode` command, run `npm link` once. After that:

```sh
pitcode examples/fizzbuzz.pit
echo 'say "hi"' | pitcode        # programs can also come from standard input
```

Run the tests with `npm test`.

## Language tour

### Output and comments

```pit
// This is a comment
say "Hello"                // prints a line
say "Total:", 3 + 4        // several values are printed separated by spaces
say                        // empty line
```

### Variables

```pit
pit speed = 10             // a variable you can change
speed = 12
speed += 3                 // also -=, *=, /=

lock MAX_DEPTH = 40        // a constant: changing it is an error
pit nothing                // starts as nil
```

### Values

| Type     | Examples                    |
|----------|-----------------------------|
| number   | `42`, `3.14`, `-7`          |
| string   | `"hi"`, `"Line\nbreak"`     |
| bool     | `true`, `false`             |
| nil      | `nil` (no value)            |
| function | `(n) => n * 2`              |

Text can include any expression inside `{ }`:

```pit
pit depth = 18
say "Depth: {depth} m, pressure: {1 + depth / 10} bar"
say "Braces need a backslash: \{like this\}"
```

`+` joins text: `"Dive #" + 12` gives `"Dive #12"`.

### Operators

- Math: `+  -  *  /  %`
- Comparison: `==  !=  <  <=  >  >=`
- Logic: `and  or  not`

Equality is strict: `1 == "1"` is `false`.
Only `false` and `nil` count as false. `0` and `""` count as true.

### Conditions: `when` / `orwhen` / `other`

```pit
when depth > 30 {
  say "deep dive"
} orwhen depth > 10 {
  say "normal dive"
} other {
  say "shallow"
}
```

No parentheses are needed around the condition.

### Loops

```pit
loop i in 0..5 { say i }        // 0 1 2 3 4   (the end is not included)
loop i in 5..0 { say i }        // 5 4 3 2 1   (counts down)

pit n = 0
loop n < 3 {                    // repeat while the condition is true
  n += 1
}

loop {                          // repeat forever...
  n += 1
  when n == 5 { skip }          // ...jump to the next pass
  when n > 10 { stop }          // ...or leave the loop
}
```

### Functions

```pit
// A named function with a block body
area(w, h) => {
  back w * h                    // `back` returns a value
}

// A one-line function: the expression is the result
double(n) => n * 2

// Functions are values
pit triple = (n) => n * 3
apply(f, x) => f(x)
say apply(triple, 5)            // 15

// Functions remember the variables around them (closures)
makeCounter() => {
  pit count = 0
  back () => {
    count += 1
    back count
  }
}
```

A function with no `back` returns `nil`.

### Built-in functions

| Function       | What it does                                        |
|----------------|-----------------------------------------------------|
| `ask(prompt)`  | Reads a line typed by the user (`nil` at end of input) |
| `len(text)`    | Length of a string                                  |
| `str(value)`   | Converts any value to text                          |
| `num(text)`    | Converts text to a number (`nil` if it isn't one)   |
| `type(value)`  | `"number"`, `"string"`, `"bool"`, `"nil"` or `"function"` |
| `clock()`      | Current time in seconds                             |

### Errors

Errors show where the problem is:

```
RuntimeError: Cannot change locked 'PI'
  --> circle.pit:2:1
   |
 2 | PI = 3
   | ^
```

If you type a keyword from another language by habit, PitCode tells you its word for it:
for example, `if` gives "PitCode uses 'when' instead of 'if'".

### Keyword cheat sheet

| PitCode              | JavaScript             |
|----------------------|------------------------|
| `pit x = 1`          | `let x = 1`            |
| `lock X = 1`         | `const X = 1`          |
| `f(a) => { back a }` | `function f(a) { return a }` |
| `say x`              | `console.log(x)`       |
| `when` / `orwhen` / `other` | `if` / `else if` / `else` |
| `loop cond { }`      | `while (cond) { }`     |
| `loop i in 0..10 { }`| `for (let i = 0; i < 10; i++) { }` |
| `stop` / `skip`      | `break` / `continue`   |
| `and` / `or` / `not` | `&&` / `\|\|` / `!`    |
| `nil`                | `null`                 |

## How it works

PitCode is a tree-walking interpreter written in TypeScript:

1. `src/lexer.ts` turns source text into tokens.
2. `src/parser.ts` turns tokens into a syntax tree (`src/ast.ts`).
3. `src/interpreter.ts` walks the tree and runs it, using `src/environment.ts` for variable scopes.

`src/builtins.ts` holds the built-in functions. `src/cli.ts` is the `pitcode` command.
