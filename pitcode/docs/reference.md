# PitCode reference

Everything built into PitCode. For a tour of the language itself, see the [README](../README.md).

## Keywords

| Keyword | Meaning |
|---|---|
| `pit` / `lock` | create a variable / a constant |
| `say` | print values |
| `when` / `orwhen` / `other` | if / else if / else |
| `match` | choose by value, range or kind |
| `loop` / `in` / `stop` / `skip` | loops, leave a loop, next turn |
| `back` | give a value back from a function |
| `give` | hand out one value from a generator |
| `wait` | wait for a promise |
| `and` / `or` / `not` / `is` / `in` | logic, kind check, membership |
| `true` / `false` / `nil` | constant values |
| `kind` / `me` / `up` | define a kind, the current instance, the parent kind |
| `attempt` / `rescue` / `always` / `raise` | error handling |
| `use` / `share` | modules |

Words with special meaning only in one place: `from` (`kind A from B`, `use x from "..."`), `by` (`0..10 by 2`), `times` (`loop 3 times`), `as` (`use { a as b }`), `get` / `set` / `shared` (inside a kind).

## Functions

| Function | What it does |
|---|---|
| `ask(prompt?)` | Reads a line typed by the user (`nil` at the end of input) |
| `len(x)` | Size of text, a list, a map, a set or a range |
| `str(x)` | Turns any value into text |
| `num(x)` | Turns text into a number (`nil` if it isn't one) |
| `int(x)` / `int(text, base)` | Like `num`, then drops the decimals / reads another base: `int("ff", 16)` is `255` |
| `fields(x)` | A map of an instance's fields |
| `type(x)` | `"number"`, `"string"`, `"bool"`, `"nil"`, `"list"`, `"map"`, `"set"`, `"range"`, `"function"`, `"kind"`, `"pattern"`, `"promise"`, `"iterator"`, or a kind's name |
| `list(x?)` | Makes a list from anything you can loop over |
| `set(x?)` | Makes a set (each value once) |
| `range(end)` / `range(start, end, step?)` | Same as `start..end by step` |
| `pattern(text, flags?)` | A regular expression, like `pattern("[0-9]+", "i")` |
| `same(a, b)` | Deep comparison: `same([1, [2]], [1, [2]])` is `true` |
| `copy(x)` | A full copy: lists, maps and instances inside are copied too |
| `check(ok, message?)` | Raises an error when `ok` is false |
| `char(code)` | The character for a code: `char(65)` is `"A"` |
| `random()` | A number from 0 up to (not including) 1 |
| `clock()` | The time in seconds, handy for measuring |
| `warn(...values)` | Prints to the error output |
| `sleep(ms)` | A promise that finishes after `ms` milliseconds (`wait sleep(500)`) |
| `later(ms, f)` | Runs `f` once after `ms` milliseconds; gives back an id |
| `every(ms, f)` | Runs `f` every `ms` milliseconds; gives back an id |
| `cancel(id)` | Stops a `later` or `every` |
| `all(promises)` / `race(promises)` | Waits for all / for the first |
| `promise((done, fail) => ...)` | Makes your own promise |
| `fetch(url, options?)` | Downloads from the web (see below) |
| `quit(code?)` | Ends the program |
| `Error` | The kind all errors come from |

Values: `args` (the list of words after the file name on the command line), `env` (a map of environment variables).

## Lists

Properties: `size`, `isEmpty`, `first`, `last`.

| Method | What it does |
|---|---|
| `add(...items)` | Adds to the end (gives back the list) |
| `addFirst(...items)` | Adds to the start |
| `addAll(list)` | Adds every item of another list |
| `insert(i, item)` | Puts an item at a position |
| `pop()` / `popFirst()` | Removes and gives back the last / first item |
| `removeAt(i)` | Removes the item at a position |
| `remove(item)` | Removes the first matching item (true if found) |
| `clear()` | Removes everything |
| `has(item)` / `indexOf(item)` | Is it there? / where (`nil` if not) |
| `find(f)` / `findIndex(f)` | First item (or position) where `f(item)` is true |
| `map(f)` / `filter(f)` / `reject(f)` | New list: changed / kept / dropped items |
| `reduce(f, start?)` | Combines items: `nums.reduce((a, b) => a + b, 0)` |
| `each(f)` | Runs `f(item, index)` for each item |
| `any(f)` / `all(f)` | Is `f` true for some / every item? |
| `count(x?)` | How many items (equal to `x`, or where `x(item)` is true) |
| `sort(compare?)` / `sortBy(key)` | New sorted list |
| `reverse()` / `shuffle()` / `unique()` / `copy()` | New list |
| `slice(start, end?)` / `take(n)` / `drop(n)` | Part of the list |
| `join(between = ", ")` | Text made of the items |
| `flat(depth = 1)` | Flattens lists inside the list |
| `chunk(n)` | Groups of `n` items |
| `zip(other)` | Pairs items: `[[a1, b1], [a2, b2]]` |
| `groupBy(f)` | Map from `f(item)` to the list of items |
| `sum()` / `average()` / `min()` / `max()` | Totals |
| `random()` | One random item |
| `same(other)` | Deep comparison |

`list[i]` reads an item (`list[-1]` is the last one). `list + other` joins lists. `[0] * 3` is `[0, 0, 0]`.

## Text

Properties: `size`, `isEmpty`.

| Method | What it does |
|---|---|
| `upper()` / `lower()` / `capitalize()` | Change letter case |
| `trim()` / `trimStart()` / `trimEnd()` | Remove spaces around |
| `split(separator?)` | List of parts (no separator: split on spaces) |
| `words()` / `lines()` / `chars()` | List of words / lines / characters |
| `has(part)` | Contains `part` (text or pattern) |
| `startsWith(t)` / `endsWith(t)` | Starts / ends with `t` |
| `indexOf(t, from?)` / `lastIndexOf(t)` | Position (`nil` if not found) |
| `replace(a, b)` | Replaces **every** `a` with `b` (`b` can be a function) |
| `replaceFirst(a, b)` | Replaces only the first |
| `slice(start, end?)` | Part of the text (negative counts from the end) |
| `repeat(n)` / `reverse()` | Repeated / reversed text |
| `padStart(n, fill?)` / `padEnd(n, fill?)` | Makes it at least `n` long |
| `matches(p)` | Does the pattern match? |
| `find(p)` / `findAll(p)` | First match / list of all matches |
| `count(p)` | How many times it appears |
| `code(i = 0)` | Character code |
| `num()` | Same as `num(text)` |

`text[i]` reads one character. `text * 3` repeats it.

## Numbers

Property: `isWhole`. Methods: `round(digits = 0)`, `floor()`, `ceil()`, `abs()`, `sqrt()`, `fixed(digits)` (text with exactly that many decimals), `clamp(low, high)`, `format(digits?, language = "en")` (easy-to-read text: `1234.5.format(1)` is `"1,234.5"`, and `1234.5.format(1, "fr")` is `"1 234,5"`).

## Maps

Properties: `size`, `isEmpty`. Your own keys come first: `{size: 3}.size` is `3`.

| Method | What it does |
|---|---|
| `keys()` / `values()` / `entries()` | Lists of keys / values / `[key, value]` pairs |
| `has(key)` | Is the key there? |
| `get(key, fallback?)` | The value, or `fallback` (default `nil`) |
| `set(key, value)` | Sets a value (same as `map[key] = value`) |
| `remove(key)` | Removes a key (true if it was there) |
| `clear()` / `copy()` | Empty it / make a copy |
| `merge(...others)` | New map with the others' keys added |
| `each(f)` | Runs `f(key, value)` for each pair |
| `filter(f)` | New map with pairs where `f(key, value)` is true |
| `mapValues(f)` | New map with each value changed to `f(value, key)` |

## Sets

Properties: `size`, `isEmpty`. Methods: `add(...items)`, `has(x)`, `remove(x)`, `clear()`, `list()`, `copy()`, `each(f)`, `union(other)`, `intersect(other)`, `difference(other)`.

## Ranges

`a..b` counts from `a` up to (not including) `b`; `a..=b` includes `b`; `by` sets the step. When `a` is bigger than `b`, it counts down.

Properties: `size`, `isEmpty`, `start`, `end`, `step`. Methods: `has(x)`, `list()`, plus every list method (`map`, `filter`, `sum`...).

## Patterns

Made with `pattern("...", flags)`. Properties: `source`, `flags`. Method: `test(text)`. Use them with the text methods `matches`, `find`, `findAll`, `replace`, `split`, `has` and `count`. Tip: raw text `r"\d+"` avoids doubling backslashes.

## math

`PI`, `E`, `TAU`, `infinity`, `abs`, `sqrt`, `cbrt`, `floor`, `ceil`, `trunc`, `round(x, digits?)`, `sign`, `pow`, `exp`, `log(x, base?)`, `log2`, `log10`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`, `hypot`, `radians(degrees)`, `degrees(radians)`, `min(...)`, `max(...)` (numbers or one list), `clamp(x, low, high)`, `random()` (0 to 1), `random(high)` / `random(low, high)` (whole numbers, both ends included).

## json

`json.parse(text)` turns JSON into PitCode values (objects become maps). `json.text(value, spaces?)` turns a value into JSON text; kinds become their fields.

## time

Times are numbers of milliseconds.

| | |
|---|---|
| `time.now()` | The current time |
| `time.make(year, month, day, hour?, minute?, second?)` | A time from its parts |
| `time.date(t?)` | Map with `year`, `month`, `day`, `hour`, `minute`, `second`, `ms`, `weekday` |
| `time.format(t, pattern?)` | Text like `"2024-07-14 09:05"`. Pattern pieces: `YYYY MMMM MMM MM M DDDD DDD DD D HH H hh h mm ss SSS A` |
| `time.iso(t?)` | Standard ISO text |
| `time.parse(text)` | Time from text (`nil` if it can't be read) |
| `time.SECOND`, `MINUTE`, `HOUR`, `DAY` | Milliseconds in each |

## files

(Not available in the browser.) `files.read(path)`, `files.write(path, text)`, `files.append(path, text)`, `files.exists(path)`, `files.list(folder?)`, `files.remove(path)`, `files.makeDir(path)`.

## url

`url.encode(text)` and `url.decode(text)` make text safe for a web address and back. `url.query({q: "coral reef", page: 2})` gives `"q=coral%20reef&page=2"`.

## fetch

```pit
pit answer = wait fetch("https://example.com/api", {
  method: "POST"
  headers: {Authorization: "Bearer ..."}
  body: {name: "Pat"}          // maps and lists are sent as JSON
})
say answer.status, answer.ok
pit data = wait answer.json()  // or: wait answer.text()
```

## Errors

Every error has `name`, `message`, `line` and `column`. The names you'll see:

| Name | When |
|---|---|
| `SyntaxError` | The code can't be read (found before running) |
| `NameError` | A name doesn't exist, already exists, or is locked (found before running) |
| `RuntimeError` | Something went wrong while running |
| `CheckError` | A `check(...)` failed |
| `NetworkError` | `fetch` couldn't reach the server |
| `Error` or your kind's name | Raised with `raise` |
