import {
  Base, ErrorValue, FN, isKind, kindName, typeName, type FnMeta, type Loc,
} from "./values";

/** Stops the program with a RuntimeError at `loc`. */
export function fail(loc: Loc, message: string): never {
  throw ErrorValue.create(message, "RuntimeError", loc);
}

export function article(word: string): string {
  return /^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`;
}

export function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** Finds a method, getter or setter on an instance's kinds (not its own fields). */
export function findMember(obj: object, name: string): PropertyDescriptor | undefined {
  if (name === "constructor") return undefined;
  for (let p = Object.getPrototypeOf(obj); p && p !== Base.prototype && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
    const d = Object.getOwnPropertyDescriptor(p, name);
    if (d) return d;
  }
  return undefined;
}

/** Finds a shared (static) member on a kind or the kinds it comes from. */
export function findStatic(kind: Function, name: string): PropertyDescriptor | undefined {
  if (name === "prototype" || name === "length" || name === "name") return undefined;
  for (let k: Function | null = kind; k && k !== Base && k !== Function.prototype; k = Object.getPrototypeOf(k)) {
    const d = Object.getOwnPropertyDescriptor(k, name);
    if (d) return d;
  }
  return undefined;
}

function expectation(meta: FnMeta): string {
  if (meta.min === meta.max) return plural(meta.min, "argument");
  if (meta.max === Infinity) return `at least ${plural(meta.min, "argument")}`;
  return `${meta.min} to ${meta.max} arguments`;
}

export function checkArity(loc: Loc, f: Function, count: number, label?: string): void {
  const meta = (f as unknown as Record<symbol, FnMeta>)[FN];
  if (meta && (count < meta.min || count > meta.max)) {
    fail(loc, `${label ?? meta.name}() expects ${expectation(meta)} but got ${count}`);
  }
}

/**
 * Creates an instance of a kind and runs its `init`. When a built-in calls a kind
 * (like `names.map(Person)`), extra values such as the index are dropped.
 */
export function construct(loc: Loc, kind: Function, args: unknown[], lenient = false): unknown {
  const obj = new (kind as new () => object)();
  const init = findMember(obj, "init");
  if (init && typeof init.value === "function") {
    const meta = (init.value as unknown as Record<symbol, FnMeta>)[FN];
    if (lenient && meta && args.length > meta.max) args = args.slice(0, meta.max);
    checkArity(loc, init.value, args.length, kindName(kind));
    init.value.apply(obj, args);
  } else if (args.length > 0 && !lenient) {
    fail(loc, `${kindName(kind)}() takes no values because it has no init`);
  }
  return obj;
}

/** A call written in PitCode: `f(a, b)`. Checks that `f` is callable and gets the right number of values. */
export function call(loc: Loc, f: unknown, args: unknown[]): unknown {
  if (typeof f !== "function") {
    fail(loc, `${article(typeName(f))} is not a function, so it can't be called`);
  }
  if (isKind(f)) return construct(loc, f, args);
  const meta = (f as unknown as Record<symbol, FnMeta>)[FN];
  if (meta) {
    if (args.length < meta.min || args.length > meta.max) {
      fail(loc, `${meta.name}() expects ${expectation(meta)} but got ${args.length}`);
    }
    if (meta.native) return f(loc, ...args) ?? null;
  }
  return f(...args) ?? null;
}

/** Calls a function given to a built-in (like `list.map(f)`), without counting arguments. */
export function invoke(loc: Loc, f: unknown, args: unknown[]): unknown {
  if (typeof f !== "function") fail(loc, `Expected a function but got ${typeName(f)}`);
  if (isKind(f)) return construct(loc, f as Function, args, true);
  const meta = (f as unknown as Record<symbol, FnMeta>)[FN];
  if (meta?.native) return f(loc, ...args) ?? null;
  return f(...args) ?? null;
}

/** Edit distance, used for "did you mean ...?" suggestions. */
export function closest(word: string, candidates: Iterable<string>): string | null {
  let best: string | null = null;
  let bestScore = Math.max(2, Math.floor(word.length / 3)) + 1;
  for (const c of candidates) {
    const d = distance(word.toLowerCase(), c.toLowerCase());
    if (d < bestScore) {
      best = c;
      bestScore = d;
    }
  }
  return best;
}

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}
