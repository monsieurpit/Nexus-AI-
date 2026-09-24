/**
 * PitCode values are plain JavaScript values:
 *   number, string, boolean, nil (null), list (Array), map (Map), set (Set),
 *   function (JS function with FN metadata), kind (JS class extending Base),
 *   range (PitRange), pattern (RegExp), promise, iterator.
 */

/** Metadata stored on every function PitCode can call with arity checks. */
export interface FnMeta {
  name: string;
  min: number;
  max: number;
  /** Built-in functions receive the call location as their first argument. */
  native?: boolean;
}

export const FN = Symbol("pit.fn");
export const KIND = Symbol("pit.kind");

/** Root of every kind (class) written in PitCode. */
export class Base {}

/** Encodes where something happened: file, line and column packed in one number. */
export type Loc = number;

const FILE_UNIT = 2 ** 32;
export function makeLoc(fileId: number, line: number, col: number): Loc {
  return fileId * FILE_UNIT + line * 4096 + Math.min(col, 4095);
}
export function decodeLoc(loc: Loc): { fileId: number; line: number; col: number } {
  const fileId = Math.floor(loc / FILE_UNIT);
  const rest = loc - fileId * FILE_UNIT;
  return { fileId, line: Math.floor(rest / 4096), col: rest % 4096 };
}

const ERR_NAME = Symbol("pit.errorName");
const ERR_LOC = Symbol("pit.errorLoc");

/** The built-in `Error` kind. Everything PitCode raises is one of these (or a kind from it). */
export class ErrorValue extends Base {
  message = "";
  [ERR_NAME]?: string;
  [ERR_LOC]?: Loc;

  init(message: unknown = ""): void {
    this.message = str(message);
  }

  /** The kind of error, like "RuntimeError", "Error" or a user kind such as "OutOfAir". */
  get name(): string {
    return this[ERR_NAME] ?? kindName(this.constructor);
  }

  get line(): number | null {
    return this[ERR_LOC] === undefined ? null : decodeLoc(this[ERR_LOC]).line;
  }

  get column(): number | null {
    return this[ERR_LOC] === undefined ? null : decodeLoc(this[ERR_LOC]).col;
  }

  static create(message: string, name?: string, loc?: Loc): ErrorValue {
    const e = new ErrorValue();
    e.message = message;
    if (name) e[ERR_NAME] = name;
    if (loc !== undefined) e[ERR_LOC] = loc;
    return e;
  }

  static locOf(e: ErrorValue): Loc | undefined {
    return e[ERR_LOC];
  }

  static setLoc(e: ErrorValue, loc: Loc): void {
    if (e[ERR_LOC] === undefined) e[ERR_LOC] = loc;
  }
}
(ErrorValue as unknown as Record<symbol, unknown>)[KIND] = "Error";

/** `a..b`, `a..=b` and `a..b by step`. */
export class PitRange {
  readonly step: number;

  constructor(readonly start: number, readonly end: number, readonly inclusive: boolean, step: number | null) {
    this.step = step ?? (start <= end ? 1 : -1);
  }

  *[Symbol.iterator](): Iterator<number> {
    const { start, end, step, inclusive } = this;
    if (step > 0) {
      for (let i = start; inclusive ? i <= end : i < end; i += step) yield i;
    } else {
      for (let i = start; inclusive ? i >= end : i > end; i += step) yield i;
    }
  }

  has(value: unknown): boolean {
    if (typeof value !== "number") return false;
    const { start, end, step, inclusive } = this;
    const inside = step > 0
      ? value >= start && (inclusive ? value <= end : value < end)
      : value <= start && (inclusive ? value >= end : value > end);
    return inside && Number.isInteger((value - start) / step);
  }

  get size(): number {
    const { start, end, step, inclusive } = this;
    const span = (end - start) / step;
    if (span < 0) return 0;
    const whole = Math.floor(span);
    return inclusive || whole !== span ? whole + 1 : whole;
  }
}

export function isKind(value: unknown): boolean {
  return typeof value === "function" && (value === ErrorValue || value.prototype instanceof Base);
}

export function kindName(kind: unknown): string {
  const k = kind as Record<symbol, string>;
  return (typeof kind === "function" && Object.hasOwn(k, KIND) ? k[KIND] : null) ?? "object";
}

export function fnMeta(f: unknown): FnMeta | undefined {
  return typeof f === "function" ? (f as unknown as Record<symbol, FnMeta>)[FN] : undefined;
}

export function setFnMeta<F extends Function>(f: F, meta: FnMeta): F {
  Object.defineProperty(f, FN, { value: meta, configurable: true });
  return f;
}

export function isTruthy(value: unknown): boolean {
  return value !== null && value !== false && value !== undefined;
}

function isIterator(value: object): boolean {
  return typeof (value as { next?: unknown }).next === "function"
    && (Symbol.iterator in value || Symbol.asyncIterator in value);
}

export function typeName(value: unknown): string {
  if (value === null || value === undefined) return "nil";
  switch (typeof value) {
    case "number": return "number";
    case "string": return "string";
    case "boolean": return "bool";
    case "function": return isKind(value) ? "kind" : "function";
  }
  if (Array.isArray(value)) return "list";
  if (value instanceof Map) return "map";
  if (value instanceof Set) return "set";
  if (value instanceof PitRange) return "range";
  if (value instanceof RegExp) return "pattern";
  if (value instanceof Promise) return "promise";
  if (value instanceof Base) return kindName(value.constructor);
  if (isIterator(value as object)) return "iterator";
  return "object";
}

export function formatNumber(n: number): string {
  if (Number.isInteger(n)) return Object.is(n, -0) ? "0" : String(n);
  if (!Number.isFinite(n)) return Number.isNaN(n) ? "NaN" : n > 0 ? "infinity" : "-infinity";
  // Hide floating point noise: 0.1 + 0.2 shows as 0.3.
  return String(Number.parseFloat(n.toPrecision(15)));
}

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** How a value looks when printed with `say` or turned into text. */
export function str(value: unknown): string {
  return typeof value === "string" ? value : show(value, new Set(), false);
}

/** How a value looks inside a list or map (text gets quotes). */
export function repr(value: unknown): string {
  return show(value, new Set(), true);
}

/** Set by the runtime so `str` can call a kind's own `show()` method. */
export const hooks: { showInstance?: (value: Base) => string | undefined } = {};

function show(value: unknown, seen: Set<unknown>, quoted: boolean): string {
  if (value === null || value === undefined) return "nil";
  switch (typeof value) {
    case "string": return quoted ? JSON.stringify(value) : value;
    case "number": return formatNumber(value);
    case "boolean": return String(value);
    case "function":
      return isKind(value) ? `<kind ${kindName(value)}>` : `<function ${fnMeta(value)?.name ?? ((value as Function).name || "anonymous")}>`;
    case "bigint": return String(value);
    case "symbol": return String(value);
  }
  if (seen.has(value)) return "[...]";
  if (value instanceof PitRange) {
    const dots = value.inclusive ? "..=" : "..";
    const defaultStep = value.start <= value.end ? 1 : -1;
    return `${formatNumber(value.start)}${dots}${formatNumber(value.end)}${value.step !== defaultStep ? ` by ${formatNumber(value.step)}` : ""}`;
  }
  if (value instanceof RegExp) return `pattern(${JSON.stringify(value.source)}${value.flags ? `, ${JSON.stringify(value.flags)}` : ""})`;
  if (value instanceof Promise) return "<promise>";
  if (value instanceof ErrorValue) return `${value.name}: ${value.message}`;
  seen.add(value);
  try {
    if (Array.isArray(value)) return `[${value.map((v) => show(v, seen, true)).join(", ")}]`;
    if (value instanceof Map) {
      const parts: string[] = [];
      for (const [k, v] of value) {
        const key = typeof k === "string" && IDENTIFIER.test(k) ? k : show(k, seen, true);
        parts.push(`${key}: ${show(v, seen, true)}`);
      }
      return `{${parts.join(", ")}}`;
    }
    if (value instanceof Set) return `set(${[...value].map((v) => show(v, seen, true)).join(", ")})`;
    if (value instanceof Base) {
      const custom = hooks.showInstance?.(value);
      if (custom !== undefined) return custom;
      const fields = Object.keys(value).map((k) => `${k}: ${show((value as Record<string, unknown>)[k], seen, true)}`);
      return `${kindName(value.constructor)} {${fields.join(", ")}}`;
    }
    if (isIterator(value as object)) return "<iterator>";
    return "<object>";
  } finally {
    seen.delete(value);
  }
}

/** Deep equality for `same(a, b)`: lists, maps and sets are compared by their contents. */
export function deepEqual(a: unknown, b: unknown, seen = new Map<unknown, unknown>()): boolean {
  if (a === b) return true;
  if (typeof a === "number" && typeof b === "number") return Number.isNaN(a) && Number.isNaN(b);
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i], seen));
  }
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    return true;
  }
  if (a instanceof Set && b instanceof Set) {
    return a.size === b.size && [...a].every((v) => b.has(v));
  }
  if (a instanceof PitRange && b instanceof PitRange) {
    return a.start === b.start && a.end === b.end && a.step === b.step && a.inclusive === b.inclusive;
  }
  if (a instanceof Base && b instanceof Base && a.constructor === b.constructor) {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    return ka.length === kb.length
      && ka.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], seen));
  }
  return false;
}
