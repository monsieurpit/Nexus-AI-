import { article, call, checkArity, closest, fail, findMember, findStatic } from "./core";
import {
  LIST_TYPE, MAP_TYPE, NUMBER_TYPE, PATTERN_TYPE, RANGE_TYPE, SET_TYPE, STRING_TYPE,
  callMethod, unknownMember, type TypeMethods,
} from "./methods";
import {
  Base, ErrorValue, KIND, PitRange, isKind, kindName, setFnMeta, str, typeName, type Loc,
} from "./values";

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------- truthiness and equality ----------

export const truthy = (v: unknown): boolean => v !== null && v !== false && v !== undefined;

export const eq = (a: unknown, b: unknown): boolean => a === b || (a == null && b == null);

// ---------- arithmetic ----------

function bothNumbers(loc: Loc, op: string, a: unknown, b: unknown): asserts a is number {
  if (typeof a !== "number" || typeof b !== "number") {
    fail(loc, `'${op}' needs two numbers, but got ${typeName(a)} and ${typeName(b)}`);
  }
}

export function add(loc: Loc, a: unknown, b: unknown): unknown {
  if (typeof a === "number" && typeof b === "number") return a + b;
  if (typeof a === "string" || typeof b === "string") return str(a) + str(b);
  if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b];
  fail(loc, `Can't add ${typeName(a)} and ${typeName(b)}`);
}

export function sub(loc: Loc, a: unknown, b: unknown): number {
  bothNumbers(loc, "-", a, b);
  return a - (b as number);
}

export function mul(loc: Loc, a: unknown, b: unknown): unknown {
  if (typeof a === "number" && typeof b === "number") return a * b;
  // "-" * 10 repeats text.
  if (typeof a === "string" && typeof b === "number" && Number.isInteger(b) && b >= 0) return a.repeat(b);
  if (typeof b === "string" && typeof a === "number" && Number.isInteger(a) && a >= 0) return b.repeat(a);
  // [0] * 3 is [0, 0, 0].
  if (Array.isArray(a) && typeof b === "number" && Number.isInteger(b) && b >= 0) return Array.from({ length: b }, () => a).flat();
  fail(loc, `'*' needs two numbers, but got ${typeName(a)} and ${typeName(b)}`);
}

export function div(loc: Loc, a: unknown, b: unknown): number {
  bothNumbers(loc, "/", a, b);
  if (b === 0) fail(loc, "Division by zero");
  return a / (b as number);
}

export function mod(loc: Loc, a: unknown, b: unknown): number {
  bothNumbers(loc, "%", a, b);
  if (b === 0) fail(loc, "Division by zero");
  return a % (b as number);
}

export function pow(loc: Loc, a: unknown, b: unknown): number {
  bothNumbers(loc, "**", a, b);
  return a ** (b as number);
}

export function neg(loc: Loc, a: unknown): number {
  if (typeof a !== "number") fail(loc, `Can't make ${typeName(a)} negative`);
  return -a;
}

function bitwise(op: string, f: (a: number, b: number) => number) {
  return (loc: Loc, a: unknown, b: unknown): number => {
    bothNumbers(loc, op, a, b);
    return f(a, b as number);
  };
}

export const band = bitwise("&", (a, b) => a & b);
export const bor = bitwise("|", (a, b) => a | b);
export const bxor = bitwise("^", (a, b) => a ^ b);
export const shl = bitwise("<<", (a, b) => a << b);
export const shr = bitwise(">>", (a, b) => a >> b);

export function bnot(loc: Loc, a: unknown): number {
  if (typeof a !== "number") fail(loc, `'~' needs a number, but got ${typeName(a)}`);
  return ~a;
}

function comparable(loc: Loc, a: unknown, b: unknown): void {
  const ok = (typeof a === "number" && typeof b === "number") || (typeof a === "string" && typeof b === "string");
  if (!ok) fail(loc, `Can't compare ${typeName(a)} with ${typeName(b)}`);
}

export function lt(loc: Loc, a: any, b: any): boolean {
  comparable(loc, a, b);
  return a < b;
}
export function le(loc: Loc, a: any, b: any): boolean {
  comparable(loc, a, b);
  return a <= b;
}
export function gt(loc: Loc, a: any, b: any): boolean {
  comparable(loc, a, b);
  return a > b;
}
export function ge(loc: Loc, a: any, b: any): boolean {
  comparable(loc, a, b);
  return a >= b;
}

/** Operators by symbol, for compound assignment (`a.b += 1`). */
export const BINARY: Record<string, (loc: Loc, a: any, b: any) => unknown> = {
  "+": add, "-": sub, "*": mul, "/": div, "%": mod, "**": pow,
};

export function is(loc: Loc, value: unknown, kind: unknown): boolean {
  if (!isKind(kind)) fail(loc, `'is' needs a kind on the right, like: pet is Dog. Got ${typeName(kind)}`);
  return value instanceof (kind as Function);
}

export function isIn(loc: Loc, item: unknown, collection: unknown): boolean {
  if (Array.isArray(collection)) return collection.includes(item);
  if (typeof collection === "string") {
    if (typeof item !== "string") fail(loc, `Can only look for text in text, but got ${typeName(item)}`);
    return collection.includes(item);
  }
  if (collection instanceof Map || collection instanceof Set) return collection.has(item);
  if (collection instanceof PitRange) return collection.has(item);
  if (collection instanceof Base) return typeof item === "string" && (Object.hasOwn(collection, item) || findMember(collection, item) !== undefined);
  fail(loc, `Can't look inside ${typeName(collection)} with 'in'`);
}

// ---------- ranges ----------

export function range(loc: Loc, from: unknown, to: unknown, inclusive: boolean, step: unknown): PitRange {
  if (typeof from !== "number" || typeof to !== "number") {
    fail(loc, `A range needs numbers, but got ${typeName(from)}..${typeName(to)}`);
  }
  if (step !== null) {
    if (typeof step !== "number") fail(loc, `'by' needs a number, but got ${typeName(step)}`);
    if (step === 0) fail(loc, "A range can't go 'by 0'");
  }
  return new PitRange(from, to, inclusive, step as number | null);
}

/** Checks the two ends of a `loop i in a..b` range. */
export function rangeEnds(loc: Loc, from: unknown, to: unknown): void {
  if (typeof from !== "number" || typeof to !== "number") {
    fail(loc, `A range needs numbers, but got ${typeName(from)}..${typeName(to)}`);
  }
}

export function rangeStep(loc: Loc, step: unknown): number {
  if (typeof step !== "number") fail(loc, `'by' needs a number, but got ${typeName(step)}`);
  if (step === 0) fail(loc, "A range can't go 'by 0'");
  return step;
}

// ---------- members ----------

function builtinType(value: unknown): TypeMethods | null {
  if (Array.isArray(value)) return LIST_TYPE;
  switch (typeof value) {
    case "string": return STRING_TYPE;
    case "number": return NUMBER_TYPE;
  }
  if (value instanceof Map) return MAP_TYPE;
  if (value instanceof Set) return SET_TYPE;
  if (value instanceof PitRange) return RANGE_TYPE;
  if (value instanceof RegExp) return PATTERN_TYPE;
  return null;
}

function boundBuiltin(type: TypeMethods, self: unknown, name: string): Function | null {
  const impl = Object.hasOwn(type.methods, name) ? type.methods[name]
    : type.fallback && Object.hasOwn(type.fallback.methods, name) ? type.fallback.methods[name] : null;
  if (!impl) return null;
  const target = Object.hasOwn(type.methods, name) ? self : type.fallback!.convert(self);
  return setFnMeta((loc: Loc, ...args: unknown[]) => impl.fn(loc, target, args), {
    name, min: impl.min, max: impl.max, native: true,
  });
}

/** `pit speak = dog.speak` keeps `me` pointing at the dog. */
function bindMethod(fn: Function, self: object): Function {
  const bound = fn.bind(self);
  for (const s of Object.getOwnPropertySymbols(fn)) {
    Object.defineProperty(bound, s, { value: (fn as any)[s], configurable: true });
  }
  return bound;
}

/** Reads `obj.name`. */
export function get(loc: Loc, obj: unknown, name: string): unknown {
  if (obj === null || obj === undefined) fail(loc, `Can't read '${name}' of nil`);
  const type = builtinType(obj);
  if (type) {
    if (obj instanceof Map && obj.has(name)) return obj.get(name);
    if (Object.hasOwn(type.props, name)) return type.props[name](obj);
    const bound = boundBuiltin(type, obj, name);
    if (bound) return bound;
    if (obj instanceof Map) return null;
    unknownMember(loc, type, name);
  }
  if (obj instanceof Base) return getField(loc, obj, name);
  if (typeof obj === "function") {
    if (isKind(obj)) {
      const d = findStatic(obj, name);
      if (!d) fail(loc, `Kind ${kindName(obj)} has no shared '${name}'`);
      if (d.get) return d.get.call(obj) ?? null;
      return d.value ?? null;
    }
    fail(loc, `A function has no '${name}'`);
  }
  if (typeof obj === "boolean") fail(loc, `A bool has no '${name}'`);
  // Objects from JavaScript (like a fetch response).
  const value = (obj as any)[name];
  return typeof value === "function" ? value.bind(obj) : value ?? null;
}

/** Reads a field or method of an instance. A name it doesn't have is an error, to catch typos. */
function getField(loc: Loc, obj: Base, name: string): unknown {
  if (Object.hasOwn(obj, name)) return (obj as any)[name] ?? null;
  const d = findMember(obj, name);
  if (!d) {
    const hint = closest(name, memberNames(obj));
    const kind = kindName(obj.constructor);
    fail(loc, `${kind} has no field '${name}'${hint ? `. Did you mean '${hint}'?` : `. Give it one in the kind, like: pit ${name} = nil`}`);
  }
  if (d.get) return d.get.call(obj) ?? null;
  if (typeof d.value === "function") return bindMethod(d.value, obj);
  return d.value ?? null;
}

/** Reads `obj?.name`. */
export function getOpt(loc: Loc, obj: unknown, name: string): unknown {
  return obj === null || obj === undefined ? null : get(loc, obj, name);
}

/** `obj.name = value`. */
export function set(loc: Loc, obj: unknown, name: string, value: unknown): unknown {
  if (obj === null || obj === undefined) fail(loc, `Can't set '${name}' on nil`);
  if (obj instanceof Map) {
    obj.set(name, value);
    return value;
  }
  if (obj instanceof Base) {
    if (name === "__proto__" || name === "constructor") fail(loc, `'${name}' can't be used as a field name`);
    if (isLockedField(obj, name, false)) fail(loc, `Cannot change locked field '${name}'`);
    const d = findMember(obj, name);
    if (d && (d.get || d.set)) {
      if (!d.set) fail(loc, `'${name}' can only be read`);
      d.set.call(obj, value);
      return value;
    }
    (obj as any)[name] = value;
    return value;
  }
  if (isKind(obj)) {
    if (isLockedField(obj, name, true)) fail(loc, `Cannot change locked '${kindName(obj)}.${name}'`);
    (obj as any)[name] = value;
    return value;
  }
  const type = builtinType(obj);
  if (type || typeof obj !== "object") {
    const hint = Array.isArray(obj) ? ". Lists hold items, like: list[0] = x" : "";
    fail(loc, `Can't set '${name}' on ${article(typeName(obj))}${hint}`);
  }
  (obj as any)[name] = value;
  return value;
}

function listIndex(loc: Loc, index: unknown, what: string): number {
  if (typeof index !== "number" || !Number.isInteger(index)) {
    fail(loc, `${what} positions must be whole numbers, but got ${typeof index === "number" ? index : typeName(index)}`);
  }
  return index;
}

/** Reads `obj[index]`. Negative positions count from the end. */
export function index(loc: Loc, obj: unknown, i: unknown): unknown {
  if (Array.isArray(obj)) {
    const n = listIndex(loc, i, "List");
    return obj[n < 0 ? obj.length + n : n] ?? null;
  }
  if (typeof obj === "string") {
    const n = listIndex(loc, i, "Text");
    return obj[n < 0 ? obj.length + n : n] ?? null;
  }
  if (obj instanceof Map) return obj.has(i) ? obj.get(i) : null;
  if (obj instanceof PitRange) {
    const n = listIndex(loc, i, "Range");
    const size = obj.size;
    const k = n < 0 ? size + n : n;
    return k >= 0 && k < size ? obj.start + k * obj.step : null;
  }
  if (obj instanceof Base) {
    if (typeof i !== "string") fail(loc, `Fields are named with text, but got ${typeName(i)}`);
    return getField(loc, obj, i);
  }
  if (obj === null || obj === undefined) fail(loc, "Can't take an item from nil");
  fail(loc, `Can't take an item from ${article(typeName(obj))}`);
}

/** `obj[index] = value`. */
export function setIndex(loc: Loc, obj: unknown, i: unknown, value: unknown): unknown {
  if (Array.isArray(obj)) {
    let n = listIndex(loc, i, "List");
    if (n < 0) n += obj.length;
    if (n < 0 || n > obj.length) fail(loc, `Index ${i} is outside the list (size ${obj.length})`);
    obj[n] = value;
    return value;
  }
  if (obj instanceof Map) {
    obj.set(i, value);
    return value;
  }
  if (obj instanceof Base) {
    if (typeof i !== "string") fail(loc, `Fields are named with text, but got ${typeName(i)}`);
    return set(loc, obj, i, value);
  }
  if (typeof obj === "string") fail(loc, "Text can't be changed in place. Build new text instead");
  if (obj === null || obj === undefined) fail(loc, "Can't set an item on nil");
  fail(loc, `Can't set an item on ${article(typeName(obj))}`);
}

/** `obj.name op= value`. */
export function update(loc: Loc, obj: unknown, name: string, op: string, value: unknown): unknown {
  return set(loc, obj, name, BINARY[op](loc, get(loc, obj, name), value));
}

/** `obj[index] op= value`. */
export function updateIndex(loc: Loc, obj: unknown, i: unknown, op: string, value: unknown): unknown {
  return setIndex(loc, obj, i, BINARY[op](loc, index(loc, obj, i), value));
}

// ---------- calls ----------

/** `obj.name(args)`. */
export function callMember(loc: Loc, obj: unknown, name: string, args: unknown[]): unknown {
  if (obj === null || obj === undefined) fail(loc, `Can't call '${name}' on nil`);
  const type = builtinType(obj);
  if (type) {
    if (obj instanceof Map && obj.has(name)) return call(loc, obj.get(name), args);
    return callMethod(loc, type, obj, name, args);
  }
  if (obj instanceof Base) {
    if (Object.hasOwn(obj, name)) return call(loc, (obj as any)[name], args);
    const d = findMember(obj, name);
    if (!d) {
      const names = memberNames(obj);
      const hint = closest(name, names);
      fail(loc, `${kindName(obj.constructor)} has no method '${name}'${hint ? `. Did you mean '${hint}'?` : ""}`);
    }
    const fn = d.get ? d.get.call(obj) : d.value;
    if (typeof fn !== "function") fail(loc, `'${name}' is ${article(typeName(fn))}, not a method`);
    if (d.get) return call(loc, fn, args);
    checkArity(loc, fn, args.length);
    return fn.apply(obj, args) ?? null;
  }
  if (typeof obj === "function") {
    if (isKind(obj)) {
      const d = findStatic(obj, name);
      if (!d) fail(loc, `Kind ${kindName(obj)} has no shared '${name}'`);
      const fn = d.get ? d.get.call(obj) : d.value;
      if (typeof fn !== "function") fail(loc, `'${name}' is ${article(typeName(fn))}, not a function`);
      checkArity(loc, fn, args.length);
      return fn.apply(obj, args) ?? null;
    }
    fail(loc, `A function has no method '${name}'`);
  }
  if (typeof obj === "boolean") fail(loc, `A bool has no method '${name}'`);
  const fn = (obj as any)[name];
  if (typeof fn !== "function") fail(loc, `This ${typeName(obj)} has no method '${name}'`);
  return fn.apply(obj, args) ?? null;
}

function memberNames(obj: object): string[] {
  const names = new Set(Object.keys(obj));
  for (let p = Object.getPrototypeOf(obj); p && p !== Base.prototype; p = Object.getPrototypeOf(p)) {
    for (const n of Object.getOwnPropertyNames(p)) if (n !== "constructor") names.add(n);
  }
  return [...names];
}

/** `f?.(args)`. */
export function callOpt(loc: Loc, f: unknown, args: unknown[]): unknown {
  return f === null || f === undefined ? null : call(loc, f, args);
}

/** Checks the count in `loop n times`. */
export function times(loc: Loc, n: unknown): number {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
    fail(loc, `'times' needs a whole number of 0 or more, but got ${typeof n === "number" ? n : typeName(n)}`);
  }
  return n;
}

/** `obj?.name(args)`. */
export function callMemberOpt(loc: Loc, obj: unknown, name: string, args: unknown[]): unknown {
  return obj === null || obj === undefined ? null : callMember(loc, obj, name, args);
}

/** `up.name(args)` inside a method. */
export function callUp(loc: Loc, fn: unknown, me: object, name: string, args: unknown[]): unknown {
  if (typeof fn !== "function") fail(loc, `The parent kind has no method '${name}'`);
  checkArity(loc, fn, args.length);
  return fn.apply(me, args) ?? null;
}

// ---------- kinds and functions ----------

/** Checks the kind after `from`. */
export function parentKind(loc: Loc, kind: unknown): Function {
  if (!isKind(kind)) fail(loc, `A kind can only come 'from' another kind, but got ${typeName(kind)}`);
  return kind as Function;
}

const LOCKED = Symbol("pit.lockedFields");

function isLockedField(obj: object, name: string, shared: boolean): boolean {
  const kind = shared ? obj : obj.constructor;
  for (let k = kind as any; k && k !== Base; k = Object.getPrototypeOf(k)) {
    const locked: [string, boolean][] | undefined = Object.hasOwn(k, LOCKED) ? k[LOCKED] : undefined;
    if (locked?.some(([n, s]) => n === name && s === shared)) return true;
  }
  return false;
}

/** Records a kind's name, its methods' argument counts and its locked fields. */
export function defineKind(
  kind: Function, name: string, methods: [string, number, number, boolean][], locked: [string, boolean][] = [],
): void {
  Object.defineProperty(kind, KIND, { value: name, configurable: true });
  Object.defineProperty(kind, LOCKED, { value: locked, configurable: true });
  for (const [method, min, max, isShared] of methods) {
    const host = isShared ? kind : kind.prototype;
    const d = Object.getOwnPropertyDescriptor(host, method);
    if (d && typeof d.value === "function") {
      setFnMeta(d.value, { name: `${name}.${method}`, min, max });
    }
  }
}

export function defineFn<F extends Function>(f: F, name: string, min: number, max: number): F {
  return setFnMeta(f, { name, min, max });
}

// ---------- iteration, spreading and unpacking ----------

function* withIndex(items: Iterable<unknown>): Generator<[unknown, number]> {
  let i = 0;
  for (const x of items) yield [x, i++];
}

export function iter(loc: Loc, value: unknown): Iterable<unknown> {
  if (value === null || value === undefined) fail(loc, "Can't loop over nil");
  if (typeof value === "number") fail(loc, `Can't loop over a number. To count, use a range like: loop i in 0..${value}`);
  if (value instanceof Map) return value.keys();
  if (typeof value === "string" || (typeof value === "object" && Symbol.iterator in value)) return value as Iterable<unknown>;
  // A kind can be looped over by giving it an `items()` method (often one that uses `give`).
  if (value instanceof Base) {
    const items = findMember(value, "items");
    if (items && typeof items.value === "function") return iter(loc, items.value.call(value));
    fail(loc, `Can't loop over ${kindName(value.constructor)}. Give it an items() method to make it loopable`);
  }
  fail(loc, `Can't loop over ${article(typeName(value))}`);
}

/** Two loop names: `item, index` for lists, `key, value` for maps. */
export function pairs(loc: Loc, value: unknown): Iterable<[unknown, unknown]> {
  if (value instanceof Map) return value.entries();
  return withIndex(iter(loc, value));
}

export function asyncIter(loc: Loc, value: unknown): AsyncIterable<unknown> | Iterable<unknown> {
  if (value !== null && typeof value === "object" && Symbol.asyncIterator in value) return value as AsyncIterable<unknown>;
  return iter(loc, value);
}

/** `...value` in a list or call. */
export function spread(loc: Loc, value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value instanceof Map) fail(loc, "Can't spread a map into a list. Use map.keys(), map.values() or map.entries()");
  return [...iter(loc, value)];
}

/** `...value` in a map. */
export function spreadEntries(loc: Loc, value: unknown): [unknown, unknown][] {
  if (value instanceof Map) return [...value];
  if (value instanceof Base) return Object.entries(value);
  if (value === null || value === undefined) return [];
  fail(loc, `Can only spread a map into a map, but got ${typeName(value)}`);
}

/** Value for `pit [a, b] = value`. */
export function unpackList(loc: Loc, value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) fail(loc, "Can't unpack nil into a list pattern");
  return spread(loc, value);
}

/** Value for `pit {a, b} = value`. */
export function unpackMap(loc: Loc, value: unknown): object {
  if (value instanceof Map) {
    const out = Object.create(null);
    for (const [k, v] of value) if (typeof k === "string") out[k] = v;
    return out;
  }
  if (value instanceof Base) return value;
  fail(loc, `Can't unpack ${typeName(value)} into a map pattern`);
}

/** The rest of a map after `pit {a, ...rest} = value` took some keys. */
export function without(source: object, keys: string[]): Map<string, unknown> {
  const out = new Map<string, unknown>();
  for (const [k, v] of Object.entries(source)) if (!keys.includes(k)) out.set(k, v);
  return out;
}

// ---------- match, raise, output ----------

export function matches(value: unknown, pattern: unknown): boolean {
  if (pattern instanceof PitRange) return pattern.has(value);
  if (isKind(pattern)) return value instanceof (pattern as Function);
  return eq(value, pattern);
}

export function raise(loc: Loc, value: unknown): ErrorValue {
  if (value instanceof ErrorValue) {
    ErrorValue.setLoc(value, loc);
    return value;
  }
  if (value instanceof Base) fail(loc, `Only errors can be raised. Make ${kindName(value.constructor)} come 'from Error'`);
  return ErrorValue.create(str(value), undefined, loc);
}

export function exportsMap(entries: [string, unknown][]): Map<string, unknown> {
  return new Map(entries);
}

export { call, str };
