# Learn PitCode in 20 minutes

This tutorial starts from zero. Type each example into a file (like `lesson.pit`) and run it with `pitcode lesson.pit`, or paste it into the [playground](../README.md#playground).

## 1. Saying things

```pit
say "Hello!"
say "2 + 3 =", 2 + 3
```

`say` prints a line. Text goes between double quotes `"..."`. Anything after `//` is a note for humans and is ignored.

## 2. Remembering values

```pit
pit depth = 18          // a value that can change
lock MAX_DEPTH = 40     // a value that never changes

depth = depth + 5
say "Depth:", depth, "of", MAX_DEPTH
```

`pit` creates a variable. `lock` creates one that can't change: trying to change it stops the program with a clear message.

## 3. Putting values in text

```pit
pit name = "Pat"
pit dives = 212
say "{name} has done {dives} dives, {dives * 2} tanks of air!"
```

Anything inside `{ }` in text is worked out and put in its place.

## 4. Making choices

```pit
pit depth = 24

when depth > 30 {
  say "Deep dive: watch your air"
} orwhen depth > 18 {
  say "Advanced dive"
} other {
  say "Open water dive"
}
```

`when` is "if", `orwhen` is "else if", `other` is "else". Comparisons: `==` (equal), `!=` (not equal), `<`, `<=`, `>`, `>=`. Combine them with `and`, `or`, `not`.

## 5. Repeating

```pit
loop 3 times {
  say "Check your gear!"
}

loop meters in 0..=30 by 10 {
  say "At {meters} m the pressure is {1 + meters / 10} bar"
}
```

`0..=30 by 10` means 0, 10, 20, 30. Use `0..30` (two dots) to stop just before 30.

## 6. Lists

```pit
pit dives = [18, 32, 12]
dives.add(25)

say "Number of dives:", dives.size
say "First:", dives[0], "Last:", dives[-1]
say "Deepest:", dives.max(), "Average:", dives.average()

loop depth in dives {
  say "- {depth} m"
}
```

A list holds values in order. Positions start at 0. `list[-1]` is the last item.

## 7. Maps

```pit
pit dive = {site: "Cozumel", depth: 24, minutes: 52}
dive.buddy = "Sam"

say dive.site, "with", dive.buddy
loop key, value in dive {
  say "{key}: {value}"
}
```

A map holds values by name.

## 8. Functions

```pit
pressureAt(depth) => 1 + depth / 10

airTime(liters, bar, depth) => {
  pit air = liters * bar
  back air / (20 * pressureAt(depth))
}

say "Pressure at 30 m:", pressureAt(30), "bar"
say "Air time:", airTime(12, 200, 30).round(), "minutes"
```

A function is a named recipe. `back` gives the answer back. A one-line function gives back its value by itself.

## 9. Working with lists

```pit
pit dives = [18, 32, 12, 25]

say dives.filter(d => d > 20)        // keep some
say dives.map(d => d * 3.28)         // change each
say dives.sort()                     // sorted copy
say dives.sum()
```

`d => d > 20` is a tiny function written right where it's needed.

## 10. Kinds: making your own things

```pit
kind Diver {
  init(name) => {
    me.name = name
    me.dives = []
  }

  log(depth) => {
    me.dives.add(depth)
    back me
  }

  deepest() => me.dives.max()
}

pit pat = Diver("Pat")
pat.log(18).log(32).log(12)
say "{pat.name}'s deepest dive: {pat.deepest()} m"
```

A kind is a blueprint. `init` runs when one is made. `me` means "this one". Call the kind like a function to make one: `Diver("Pat")`.

## 11. When things go wrong

```pit
checkAir(bar) => {
  when bar < 50 {
    raise "Only {bar} bar left: go up!"
  }
  back "Air is fine"
}

attempt {
  say checkAir(180)
  say checkAir(40)
} rescue problem {
  say "Problem:", problem.message
}
```

`raise` signals a problem. `attempt` / `rescue` catches it so the program can keep going.

## 12. Asking questions

```pit
pit name = ask("What's your name? ")
say "Welcome aboard, {name}!"
```

`ask` waits for the person to type an answer.

## What's next?

- The [README](../README.md) shows everything the language can do.
- The [reference](reference.md) lists every built-in function and method.
- The `examples` folder has complete programs, like a dive log that saves to a file.

When something is wrong, read the error: it says what happened, points to the exact spot, and often suggests the fix.
