import { closest, fail, invoke, plural } from "./core";
import {
  Base, PitRange, deepEqual, isTruthy, str, typeName, type Loc,
} from "./values";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Method {
  min: number;
  max: number;
  fn: (loc: Loc, self: any, args: any[]) => unknown;
}

export type MethodTable = Record<string, Method>;
export type PropTable = Record<string, (self: any) => unknown>;

const method = (min: number, max: number, fn: Method["fn"]): Method => ({ min, max, fn });

// ---------- argument checks ----------

export function needNumber(loc: Loc, value: unknown, what: string): number {
  if (typeof value !== "number") fail(loc, `${what} needs a number, but got ${typeName(value)}`);
  return value;
}

export function needInt(loc: Loc, value: unknown, what: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    fail(loc, `${what} needs a whole number, but got ${typeof value === "number" ? value : typeName(value)}`);
  }
  return value;
}

export function needString(loc: Loc, value: unknown, what: string): string {
  if (typeof value !== "string") fail(loc, `${what} needs text, but got ${typeName(value)}`);
  return value;
}

function needList(loc: Loc, value: unknown, what: string): unknown[] {
  if (!Array.isArray(value)) fail(loc, `${what} needs a list, but got ${typeName(value)}`);
  return value;
}

/** Turns a string or pattern into a RegExp; `global` makes it find every match. */
function toRegExp(loc: Loc, p: unknown, what: string, global: boolean): RegExp {
  if (p instanceof RegExp) {
    const flags = global ? (p.flags.includes("g") ? p.flags : p.flags + "g") : p.flags.replace("g", "");
    return new RegExp(p.source, flags);
  }
  if (typeof p === "string") return new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), global ? "g" : "");
  fail(loc, `${what} needs text or a pattern, but got ${typeName(p)}`);
}

/** Position in a list or text, where negative numbers count from the end. */
function position(index: number, size: number): number {
  return index < 0 ? Math.max(0, size + index) : Math.min(index, size);
}

/** Default order for sort(): numbers by value, text alphabetically. */
export function compareValues(loc: Loc, a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (typeof a === "string" && typeof b === "string") return a < b ? -1 : a > b ? 1 : 0;
  fail(loc, `Can't sort a mix of ${typeName(a)} and ${typeName(b)}. Give sort() a function to compare them`);
}

function comparator(loc: Loc, fn: unknown): (a: unknown, b: unknown) => number {
  return (a, b) => {
    const r = invoke(loc, fn, [a, b]);
    if (typeof r === "number") return r;
    if (typeof r === "boolean") return r ? -1 : 1;
    fail(loc, `The sort function must give back a number, but gave ${typeName(r)}`);
  };
}

function sum(loc: Loc, list: unknown[]): number {
  let total = 0;
  for (const x of list) total += needNumber(loc, x, "sum()");
  return total;
}

function extreme(loc: Loc, list: unknown[], sign: 1 | -1): unknown {
  if (list.length === 0) return null;
  let best = list[0];
  for (const x of list) if (compareValues(loc, x, best) * sign > 0) best = x;
  return best;
}

function flat(list: unknown[], depth: number): unknown[] {
  return depth <= 0 ? [...list] : list.flatMap((x) => (Array.isArray(x) ? flat(x, depth - 1) : [x]));
}

function uniqueValues(list: Iterable<unknown>): unknown[] {
  return [...new Set(list)];
}

function shuffled<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function entriesOf(loc: Loc, value: unknown, what: string): [unknown, unknown][] {
  if (value instanceof Map) return [...value];
  if (value instanceof Base) return Object.entries(value);
  fail(loc, `${what} needs a map, but got ${typeName(value)}`);
}

// ---------- lists ----------

export const LIST_PROPS: PropTable = {
  size: (l: unknown[]) => l.length,
  isEmpty: (l: unknown[]) => l.length === 0,
  first: (l: unknown[]) => l[0] ?? null,
  last: (l: unknown[]) => l[l.length - 1] ?? null,
};

export const LIST_METHODS: MethodTable = {
  add: method(1, Infinity, (_, l: unknown[], items) => (l.push(...items), l)),
  addFirst: method(1, Infinity, (_, l: unknown[], items) => (l.unshift(...items), l)),
  addAll: method(1, 1, (loc, l: unknown[], [other]) => (l.push(...needList(loc, other, "addAll()")), l)),
  pop: method(0, 0, (_, l: unknown[]) => l.pop() ?? null),
  popFirst: method(0, 0, (_, l: unknown[]) => l.shift() ?? null),
  insert: method(2, 2, (loc, l: unknown[], [index, item]) => {
    l.splice(position(needInt(loc, index, "insert()"), l.length), 0, item);
    return l;
  }),
  removeAt: method(1, 1, (loc, l: unknown[], [index]) => {
    let i = needInt(loc, index, "removeAt()");
    if (i < 0) i += l.length;
    if (i < 0 || i >= l.length) fail(loc, `Index ${index} is outside the list (size ${l.length})`);
    return l.splice(i, 1)[0] ?? null;
  }),
  remove: method(1, 1, (_, l: unknown[], [item]) => {
    const i = l.indexOf(item);
    if (i < 0) return false;
    l.splice(i, 1);
    return true;
  }),
  clear: method(0, 0, (_, l: unknown[]) => ((l.length = 0), l)),
  has: method(1, 1, (_, l: unknown[], [item]) => l.includes(item)),
  indexOf: method(1, 1, (_, l: unknown[], [item]) => {
    const i = l.indexOf(item);
    return i < 0 ? null : i;
  }),
  find: method(1, 1, (loc, l: unknown[], [fn]) => l.find((x, i) => isTruthy(invoke(loc, fn, [x, i]))) ?? null),
  findIndex: method(1, 1, (loc, l: unknown[], [fn]) => {
    const i = l.findIndex((x, j) => isTruthy(invoke(loc, fn, [x, j])));
    return i < 0 ? null : i;
  }),
  map: method(1, 1, (loc, l: unknown[], [fn]) => l.map((x, i) => invoke(loc, fn, [x, i]))),
  filter: method(1, 1, (loc, l: unknown[], [fn]) => l.filter((x, i) => isTruthy(invoke(loc, fn, [x, i])))),
  reject: method(1, 1, (loc, l: unknown[], [fn]) => l.filter((x, i) => !isTruthy(invoke(loc, fn, [x, i])))),
  reduce: method(1, 2, (loc, l: unknown[], args) => {
    const [fn] = args;
    if (args.length === 1) {
      if (l.length === 0) fail(loc, "reduce() on an empty list needs a starting value, like: list.reduce(f, 0)");
      return l.reduce((acc, x, i) => invoke(loc, fn, [acc, x, i]));
    }
    return l.reduce((acc, x, i) => invoke(loc, fn, [acc, x, i]), args[1]);
  }),
  each: method(1, 1, (loc, l: unknown[], [fn]) => {
    l.forEach((x, i) => invoke(loc, fn, [x, i]));
    return null;
  }),
  any: method(1, 1, (loc, l: unknown[], [fn]) => l.some((x, i) => isTruthy(invoke(loc, fn, [x, i])))),
  all: method(1, 1, (loc, l: unknown[], [fn]) => l.every((x, i) => isTruthy(invoke(loc, fn, [x, i])))),
  count: method(0, 1, (loc, l: unknown[], args) => {
    if (args.length === 0) return l.length;
    const [what] = args;
    return typeof what === "function"
      ? l.filter((x, i) => isTruthy(invoke(loc, what, [x, i]))).length
      : l.filter((x) => x === what).length;
  }),
  sort: method(0, 1, (loc, l: unknown[], [fn]) => [...l].sort(fn === undefined ? (a, b) => compareValues(loc, a, b) : comparator(loc, fn))),
  sortBy: method(1, 1, (loc, l: unknown[], [fn]) => {
    const keyed = l.map((x) => [invoke(loc, fn, [x]), x] as const);
    keyed.sort((a, b) => compareValues(loc, a[0], b[0]));
    return keyed.map(([, x]) => x);
  }),
  reverse: method(0, 0, (_, l: unknown[]) => [...l].reverse()),
  join: method(0, 1, (loc, l: unknown[], [sep = ", "]) => l.map(str).join(needString(loc, sep, "join()"))),
  slice: method(1, 2, (loc, l: unknown[], [start, end]) =>
    l.slice(needInt(loc, start, "slice()"), end === undefined || end === null ? undefined : needInt(loc, end, "slice()"))),
  take: method(1, 1, (loc, l: unknown[], [n]) => l.slice(0, Math.max(0, needInt(loc, n, "take()")))),
  drop: method(1, 1, (loc, l: unknown[], [n]) => l.slice(Math.max(0, needInt(loc, n, "drop()")))),
  flat: method(0, 1, (loc, l: unknown[], [depth = 1]) => flat(l, needInt(loc, depth, "flat()"))),
  unique: method(0, 0, (_, l: unknown[]) => uniqueValues(l)),
  sum: method(0, 0, (loc, l: unknown[]) => sum(loc, l)),
  average: method(0, 0, (loc, l: unknown[]) => (l.length === 0 ? null : sum(loc, l) / l.length)),
  min: method(0, 0, (loc, l: unknown[]) => extreme(loc, l, -1)),
  max: method(0, 0, (loc, l: unknown[]) => extreme(loc, l, 1)),
  copy: method(0, 0, (_, l: unknown[]) => [...l]),
  chunk: method(1, 1, (loc, l: unknown[], [n]) => {
    const size = needInt(loc, n, "chunk()");
    if (size <= 0) fail(loc, "chunk() needs a size of at least 1");
    const out: unknown[][] = [];
    for (let i = 0; i < l.length; i += size) out.push(l.slice(i, i + size));
    return out;
  }),
  zip: method(1, 1, (loc, l: unknown[], [other]) => {
    const o = needList(loc, other, "zip()");
    return l.slice(0, Math.min(l.length, o.length)).map((x, i) => [x, o[i]]);
  }),
  groupBy: method(1, 1, (loc, l: unknown[], [fn]) => {
    const groups = new Map<unknown, unknown[]>();
    for (const x of l) {
      const key = invoke(loc, fn, [x]);
      const group = groups.get(key);
      if (group) group.push(x);
      else groups.set(key, [x]);
    }
    return groups;
  }),
  random: method(0, 0, (_, l: unknown[]) => (l.length ? l[Math.floor(Math.random() * l.length)] : null)),
  shuffle: method(0, 0, (_, l: unknown[]) => shuffled(l)),
  same: method(1, 1, (_, l: unknown[], [other]) => deepEqual(l, other)),
};

// ---------- text ----------

export const STRING_PROPS: PropTable = {
  size: (s: string) => s.length,
  isEmpty: (s: string) => s.length === 0,
};

export const STRING_METHODS: MethodTable = {
  upper: method(0, 0, (_, s: string) => s.toUpperCase()),
  lower: method(0, 0, (_, s: string) => s.toLowerCase()),
  capitalize: method(0, 0, (_, s: string) => s.charAt(0).toUpperCase() + s.slice(1)),
  trim: method(0, 0, (_, s: string) => s.trim()),
  trimStart: method(0, 0, (_, s: string) => s.trimStart()),
  trimEnd: method(0, 0, (_, s: string) => s.trimEnd()),
  split: method(0, 1, (loc, s: string, args) => {
    if (args.length === 0 || args[0] === null) return s.trim() === "" ? [] : s.trim().split(/\s+/);
    const [sep] = args;
    if (sep instanceof RegExp) return s.split(sep);
    return s.split(needString(loc, sep, "split()"));
  }),
  words: method(0, 0, (_, s: string) => (s.trim() === "" ? [] : s.trim().split(/\s+/))),
  lines: method(0, 0, (_, s: string) => (s === "" ? [] : s.split(/\r?\n/))),
  chars: method(0, 0, (_, s: string) => [...s]),
  has: method(1, 1, (loc, s: string, [part]) => (part instanceof RegExp ? toRegExp(loc, part, "has()", false).test(s) : s.includes(needString(loc, part, "has()")))),
  startsWith: method(1, 1, (loc, s: string, [p]) => s.startsWith(needString(loc, p, "startsWith()"))),
  endsWith: method(1, 1, (loc, s: string, [p]) => s.endsWith(needString(loc, p, "endsWith()"))),
  indexOf: method(1, 2, (loc, s: string, [part, from = 0]) => {
    const i = s.indexOf(needString(loc, part, "indexOf()"), needInt(loc, from, "indexOf()"));
    return i < 0 ? null : i;
  }),
  lastIndexOf: method(1, 1, (loc, s: string, [part]) => {
    const i = s.lastIndexOf(needString(loc, part, "lastIndexOf()"));
    return i < 0 ? null : i;
  }),
  replace: method(2, 2, (loc, s: string, [from, to]) => replaceText(loc, s, from, to, true)),
  replaceFirst: method(2, 2, (loc, s: string, [from, to]) => replaceText(loc, s, from, to, false)),
  slice: method(1, 2, (loc, s: string, [start, end]) =>
    s.slice(needInt(loc, start, "slice()"), end === undefined || end === null ? undefined : needInt(loc, end, "slice()"))),
  repeat: method(1, 1, (loc, s: string, [n]) => {
    const times = needInt(loc, n, "repeat()");
    if (times < 0) fail(loc, "repeat() needs 0 or more");
    return s.repeat(times);
  }),
  padStart: method(1, 2, (loc, s: string, [n, fill = " "]) => s.padStart(needInt(loc, n, "padStart()"), needString(loc, fill, "padStart()"))),
  padEnd: method(1, 2, (loc, s: string, [n, fill = " "]) => s.padEnd(needInt(loc, n, "padEnd()"), needString(loc, fill, "padEnd()"))),
  reverse: method(0, 0, (_, s: string) => [...s].reverse().join("")),
  matches: method(1, 1, (loc, s: string, [p]) => toRegExp(loc, p, "matches()", false).test(s)),
  find: method(1, 1, (loc, s: string, [p]) => toRegExp(loc, p, "find()", false).exec(s)?.[0] ?? null),
  findAll: method(1, 1, (loc, s: string, [p]) => [...s.matchAll(toRegExp(loc, p, "findAll()", true))].map((m) => m[0])),
  count: method(1, 1, (loc, s: string, [p]) => [...s.matchAll(toRegExp(loc, p, "count()", true))].length),
  code: method(0, 1, (loc, s: string, [i = 0]) => s.codePointAt(needInt(loc, i, "code()")) ?? null),
  num: method(0, 0, (_, s: string) => toNumber(s)),
  same: method(1, 1, (_, s: string, [other]) => s === other),
};

function replaceText(loc: Loc, s: string, from: unknown, to: unknown, all: boolean): string {
  const re = toRegExp(loc, from, all ? "replace()" : "replaceFirst()", all);
  if (typeof to === "function") return s.replace(re, (match) => str(invoke(loc, to, [match])));
  const replacement = needString(loc, to, "replace()");
  return s.replace(re, () => replacement);
}

export function toNumber(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value.trim().replace(/_/g, ""));
    return Number.isNaN(n) ? null : n;
  }
  if (typeof value === "boolean") return value ? 1 : 0;
  return null;
}

// ---------- numbers ----------

export const NUMBER_PROPS: PropTable = {
  isWhole: (n: number) => Number.isInteger(n),
};

export const NUMBER_METHODS: MethodTable = {
  round: method(0, 1, (loc, n: number, [digits = 0]) => {
    const f = 10 ** needInt(loc, digits, "round()");
    return Math.round(n * f) / f;
  }),
  floor: method(0, 0, (_, n: number) => Math.floor(n)),
  ceil: method(0, 0, (_, n: number) => Math.ceil(n)),
  abs: method(0, 0, (_, n: number) => Math.abs(n)),
  fixed: method(0, 1, (loc, n: number, [digits = 0]) => n.toFixed(needInt(loc, digits, "fixed()"))),
  clamp: method(2, 2, (loc, n: number, [lo, hi]) => Math.min(Math.max(n, needNumber(loc, lo, "clamp()")), needNumber(loc, hi, "clamp()"))),
  sqrt: method(0, 0, (_, n: number) => Math.sqrt(n)),
  format: method(0, 2, (loc, n: number, [digits, locale = "en"]) => {
    const d = digits === undefined || digits === null ? undefined : needInt(loc, digits, "format()");
    try {
      return n.toLocaleString(needString(loc, locale, "format()"), { minimumFractionDigits: d, maximumFractionDigits: d ?? 20 });
    } catch {
      fail(loc, `format() doesn't know the language "${String(locale)}". Try "en" or "fr"`);
    }
  }),
};

// ---------- maps ----------

export const MAP_PROPS: PropTable = {
  size: (m: Map<unknown, unknown>) => m.size,
  isEmpty: (m: Map<unknown, unknown>) => m.size === 0,
};

export const MAP_METHODS: MethodTable = {
  keys: method(0, 0, (_, m: Map<unknown, unknown>) => [...m.keys()]),
  values: method(0, 0, (_, m: Map<unknown, unknown>) => [...m.values()]),
  entries: method(0, 0, (_, m: Map<unknown, unknown>) => [...m].map(([k, v]) => [k, v])),
  has: method(1, 1, (_, m: Map<unknown, unknown>, [k]) => m.has(k)),
  get: method(1, 2, (_, m: Map<unknown, unknown>, [k, fallback = null]) => (m.has(k) ? m.get(k) : fallback)),
  set: method(2, 2, (_, m: Map<unknown, unknown>, [k, v]) => (m.set(k, v), m)),
  remove: method(1, 1, (_, m: Map<unknown, unknown>, [k]) => m.delete(k)),
  clear: method(0, 0, (_, m: Map<unknown, unknown>) => (m.clear(), m)),
  copy: method(0, 0, (_, m: Map<unknown, unknown>) => new Map(m)),
  merge: method(1, Infinity, (loc, m: Map<unknown, unknown>, others) =>
    new Map([...m, ...others.flatMap((o) => entriesOf(loc, o, "merge()"))])),
  each: method(1, 1, (loc, m: Map<unknown, unknown>, [fn]) => {
    for (const [k, v] of m) invoke(loc, fn, [k, v]);
    return null;
  }),
  filter: method(1, 1, (loc, m: Map<unknown, unknown>, [fn]) =>
    new Map([...m].filter(([k, v]) => isTruthy(invoke(loc, fn, [k, v]))))),
  mapValues: method(1, 1, (loc, m: Map<unknown, unknown>, [fn]) =>
    new Map([...m].map(([k, v]) => [k, invoke(loc, fn, [v, k])]))),
  same: method(1, 1, (_, m: Map<unknown, unknown>, [other]) => deepEqual(m, other)),
};

// ---------- sets ----------

export const SET_PROPS: PropTable = {
  size: (s: Set<unknown>) => s.size,
  isEmpty: (s: Set<unknown>) => s.size === 0,
};

function needSet(loc: Loc, v: unknown, what: string): Set<unknown> {
  if (v instanceof Set) return v;
  if (Array.isArray(v)) return new Set(v);
  fail(loc, `${what} needs a set or list, but got ${typeName(v)}`);
}

export const SET_METHODS: MethodTable = {
  add: method(1, Infinity, (_, s: Set<unknown>, items) => (items.forEach((x) => s.add(x)), s)),
  has: method(1, 1, (_, s: Set<unknown>, [x]) => s.has(x)),
  remove: method(1, 1, (_, s: Set<unknown>, [x]) => s.delete(x)),
  clear: method(0, 0, (_, s: Set<unknown>) => (s.clear(), s)),
  list: method(0, 0, (_, s: Set<unknown>) => [...s]),
  copy: method(0, 0, (_, s: Set<unknown>) => new Set(s)),
  each: method(1, 1, (loc, s: Set<unknown>, [fn]) => {
    for (const x of s) invoke(loc, fn, [x]);
    return null;
  }),
  union: method(1, 1, (loc, s: Set<unknown>, [o]) => new Set([...s, ...needSet(loc, o, "union()")])),
  intersect: method(1, 1, (loc, s: Set<unknown>, [o]) => {
    const other = needSet(loc, o, "intersect()");
    return new Set([...s].filter((x) => other.has(x)));
  }),
  difference: method(1, 1, (loc, s: Set<unknown>, [o]) => {
    const other = needSet(loc, o, "difference()");
    return new Set([...s].filter((x) => !other.has(x)));
  }),
  same: method(1, 1, (_, s: Set<unknown>, [other]) => deepEqual(s, other)),
};

// ---------- ranges ----------

export const RANGE_PROPS: PropTable = {
  size: (r: PitRange) => r.size,
  isEmpty: (r: PitRange) => r.size === 0,
  start: (r: PitRange) => r.start,
  end: (r: PitRange) => r.end,
  step: (r: PitRange) => r.step,
};

export const RANGE_METHODS: MethodTable = {
  has: method(1, 1, (_, r: PitRange, [x]) => r.has(x)),
  list: method(0, 0, (_, r: PitRange) => [...r]),
};

// ---------- patterns ----------

export const PATTERN_PROPS: PropTable = {
  source: (p: RegExp) => p.source,
  flags: (p: RegExp) => p.flags,
};

export const PATTERN_METHODS: MethodTable = {
  test: method(1, 1, (loc, p: RegExp, [s]) => new RegExp(p.source, p.flags.replace("g", "")).test(needString(loc, s, "test()"))),
};

// ---------- lookup ----------

export interface TypeMethods {
  label: string;
  props: PropTable;
  methods: MethodTable;
  /** Methods found here when the type itself doesn't have one (ranges borrow list methods). */
  fallback?: { convert: (self: any) => unknown; methods: MethodTable };
}

export const LIST_TYPE: TypeMethods = { label: "Lists", props: LIST_PROPS, methods: LIST_METHODS };
export const STRING_TYPE: TypeMethods = { label: "Text", props: STRING_PROPS, methods: STRING_METHODS };
export const NUMBER_TYPE: TypeMethods = { label: "Numbers", props: NUMBER_PROPS, methods: NUMBER_METHODS };
export const MAP_TYPE: TypeMethods = { label: "Maps", props: MAP_PROPS, methods: MAP_METHODS };
export const SET_TYPE: TypeMethods = { label: "Sets", props: SET_PROPS, methods: SET_METHODS };
export const RANGE_TYPE: TypeMethods = {
  label: "Ranges", props: RANGE_PROPS, methods: RANGE_METHODS,
  fallback: { convert: (r: PitRange) => [...r], methods: LIST_METHODS },
};
export const PATTERN_TYPE: TypeMethods = { label: "Patterns", props: PATTERN_PROPS, methods: PATTERN_METHODS };

/** JavaScript names people reach for, mapped to the PitCode name. */
const JS_NAMES: Record<string, string> = {
  length: "size", includes: "has", contains: "has", push: "add", append: "add", unshift: "addFirst",
  shift: "popFirst", forEach: "each", some: "any", every: "all", toUpperCase: "upper",
  toLowerCase: "lower", substring: "slice", substr: "slice", charAt: "text[i]", charCodeAt: "code",
  codePointAt: "code", toString: "str(value)", toFixed: "fixed", concat: "+", trimLeft: "trimStart",
  trimRight: "trimEnd", delete: "remove", strip: "trim", extend: "addAll", len: "size",
  flatMap: "map() then flat()", splice: "insert() or removeAt()",
};

export function unknownMember(loc: Loc, type: TypeMethods, name: string): never {
  const known = [...Object.keys(type.props), ...Object.keys(type.methods)];
  const exists = (n: string) => known.includes(n) || !/^[A-Za-z]+$/.test(n);
  // A JavaScript name (even misspelled, like "lenght") points to the PitCode one.
  const jsName = Object.hasOwn(JS_NAMES, name) ? name : closest(name, Object.keys(JS_NAMES));
  const fromJs = jsName && exists(JS_NAMES[jsName]) ? JS_NAMES[jsName] : null;
  const hint = fromJs ?? closest(name, known);
  const verb = type.label === "Text" ? "doesn't" : "don't";
  fail(loc, `${type.label} ${verb} have '${name}'${hint ? `. Did you mean '${hint}'?` : ""}`);
}

export function callMethod(loc: Loc, type: TypeMethods, self: unknown, name: string, args: unknown[]): unknown {
  let impl = Object.hasOwn(type.methods, name) ? type.methods[name] : undefined;
  let target = self;
  if (!impl && type.fallback && Object.hasOwn(type.fallback.methods, name)) {
    impl = type.fallback.methods[name];
    target = type.fallback.convert(self);
  }
  if (!impl) {
    if (Object.hasOwn(type.props, name)) fail(loc, `'${name}' is not a method. Use it without (): value.${name}`);
    unknownMember(loc, type, name);
  }
  if (args.length < impl.min || args.length > impl.max) {
    const expected = impl.min === impl.max ? plural(impl.min, "argument")
      : impl.max === Infinity ? `at least ${plural(impl.min, "argument")}` : `${impl.min} to ${impl.max} arguments`;
    fail(loc, `${name}() expects ${expected} but got ${args.length}`);
  }
  return impl.fn(loc, target, args);
}
