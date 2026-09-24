import { fail, invoke } from "./core";
import { needInt, needNumber, needString, toNumber } from "./methods";
import { iter, truthy } from "./ops";
import {
  Base, ErrorValue, PitRange, deepEqual, setFnMeta, str, typeName, type Loc,
} from "./values";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FileSystem {
  read(path: string): string;
  write(path: string, text: string): void;
  append(path: string, text: string): void;
  exists(path: string): boolean;
  list(path: string): string[];
  remove(path: string): void;
  makeDir(path: string): void;
}

/** What the built-ins need from the place PitCode runs in (a terminal, a browser, a test). */
export interface StdlibHost {
  readLine(prompt: string): string | null;
  fs?: FileSystem;
  args: string[];
  exit(code: number): void;
  /** Reports an error that happened in a timer callback, after the main program. */
  reportError(error: unknown): void;
}

export function native(name: string, min: number, max: number, fn: (loc: Loc, ...args: any[]) => unknown): Function {
  return setFnMeta(fn, { name, min, max, native: true });
}

/** A built-in module like `math`: a map of its functions and values. */
function module(members: Record<string, unknown>): Map<string, unknown> {
  return new Map(Object.entries(members));
}

// ---------- JSON ----------

/** JSON data → PitCode values (objects become maps). */
export function fromJson(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value.map(fromJson);
  if (typeof value === "object") return new Map(Object.entries(value).map(([k, v]) => [k, fromJson(v)]));
  return value;
}

/** PitCode values → plain data for JSON. */
export function toJson(loc: Loc, value: unknown, seen = new Set<unknown>()): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "function") return undefined;
  if (seen.has(value)) fail(loc, "Can't turn a value that contains itself into JSON");
  seen.add(value);
  try {
    if (Array.isArray(value)) return value.map((v) => toJson(loc, v, seen) ?? null);
    if (value instanceof Set || value instanceof PitRange) return [...value].map((v) => toJson(loc, v, seen) ?? null);
    const entries: [unknown, unknown][] = value instanceof Map ? [...value]
      : value instanceof ErrorValue ? [["name", value.name], ["message", value.message]]
      : value instanceof Base ? Object.entries(value) : [];
    const out: Record<string, unknown> = {};
    for (const [k, v] of entries) {
      const j = toJson(loc, v, seen);
      if (j !== undefined) out[str(k)] = j;
    }
    return out;
  } finally {
    seen.delete(value);
  }
}

// ---------- time ----------

function toDate(loc: Loc, ts: unknown): Date {
  const d = ts === undefined || ts === null ? new Date() : new Date(needNumber(loc, ts, "time"));
  if (Number.isNaN(d.getTime())) fail(loc, `${String(ts)} is not a valid time`);
  return d;
}

const pad = (n: number, width = 2) => String(n).padStart(width, "0");
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate(d: Date, pattern: string): string {
  const tokens: Record<string, () => string> = {
    YYYY: () => String(d.getFullYear()),
    MMMM: () => MONTH_NAMES[d.getMonth()],
    MMM: () => MONTH_NAMES[d.getMonth()].slice(0, 3),
    MM: () => pad(d.getMonth() + 1),
    M: () => String(d.getMonth() + 1),
    DDDD: () => DAY_NAMES[d.getDay()],
    DDD: () => DAY_NAMES[d.getDay()].slice(0, 3),
    DD: () => pad(d.getDate()),
    D: () => String(d.getDate()),
    HH: () => pad(d.getHours()),
    H: () => String(d.getHours()),
    hh: () => pad(d.getHours() % 12 || 12),
    h: () => String(d.getHours() % 12 || 12),
    mm: () => pad(d.getMinutes()),
    ss: () => pad(d.getSeconds()),
    SSS: () => pad(d.getMilliseconds(), 3),
    A: () => (d.getHours() < 12 ? "AM" : "PM"),
  };
  return pattern.replace(/YYYY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|HH|H|hh|h|mm|ss|SSS|A/g, (t) => tokens[t]());
}

// ---------- the built-ins ----------

export function createBuiltins(host: StdlibHost): Record<string, unknown> {
  let nextTimer = 1;
  const timers = new Map<number, { cancel: () => void }>();

  /** Runs a callback from a timer, reporting any error instead of crashing silently. */
  const guarded = (loc: Loc, fn: unknown) => () => {
    try {
      const result = invoke(loc, fn, []);
      if (result instanceof Promise) result.catch((e) => host.reportError(e));
    } catch (e) {
      host.reportError(e);
    }
  };

  const fsOrFail = (loc: Loc): FileSystem => {
    if (!host.fs) fail(loc, "Files can't be used here (for example in the browser)");
    return host.fs;
  };

  const files = module({
    read: native("files.read", 1, 1, (loc, path) => {
      const fs = fsOrFail(loc);
      const p = needString(loc, path, "files.read()");
      try {
        return fs.read(p);
      } catch {
        fail(loc, `Can't read the file "${p}"`);
      }
    }),
    write: native("files.write", 2, 2, (loc, path, text) => {
      fsOrFail(loc).write(needString(loc, path, "files.write()"), str(text));
      return null;
    }),
    append: native("files.append", 2, 2, (loc, path, text) => {
      fsOrFail(loc).append(needString(loc, path, "files.append()"), str(text));
      return null;
    }),
    exists: native("files.exists", 1, 1, (loc, path) => fsOrFail(loc).exists(needString(loc, path, "files.exists()"))),
    list: native("files.list", 0, 1, (loc, path = ".") => {
      const p = needString(loc, path, "files.list()");
      try {
        return fsOrFail(loc).list(p);
      } catch {
        fail(loc, `Can't list the folder "${p}"`);
      }
    }),
    remove: native("files.remove", 1, 1, (loc, path) => {
      fsOrFail(loc).remove(needString(loc, path, "files.remove()"));
      return null;
    }),
    makeDir: native("files.makeDir", 1, 1, (loc, path) => {
      fsOrFail(loc).makeDir(needString(loc, path, "files.makeDir()"));
      return null;
    }),
  });

  const numbersOf = (loc: Loc, args: unknown[], what: string): number[] => {
    const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
    return list.map((x) => needNumber(loc, x, what));
  };
  const unary = (name: string, f: (x: number) => number) =>
    native(`math.${name}`, 1, 1, (loc, x) => f(needNumber(loc, x, `math.${name}()`)));

  const math = module({
    PI: Math.PI,
    E: Math.E,
    TAU: Math.PI * 2,
    infinity: Infinity,
    abs: unary("abs", Math.abs),
    sqrt: unary("sqrt", Math.sqrt),
    cbrt: unary("cbrt", Math.cbrt),
    floor: unary("floor", Math.floor),
    ceil: unary("ceil", Math.ceil),
    trunc: unary("trunc", Math.trunc),
    sign: unary("sign", Math.sign),
    exp: unary("exp", Math.exp),
    log2: unary("log2", Math.log2),
    log10: unary("log10", Math.log10),
    sin: unary("sin", Math.sin),
    cos: unary("cos", Math.cos),
    tan: unary("tan", Math.tan),
    asin: unary("asin", Math.asin),
    acos: unary("acos", Math.acos),
    atan: unary("atan", Math.atan),
    radians: unary("radians", (d) => (d * Math.PI) / 180),
    degrees: unary("degrees", (r) => (r * 180) / Math.PI),
    log: native("math.log", 1, 2, (loc, x, base) => {
      const n = Math.log(needNumber(loc, x, "math.log()"));
      return base === undefined ? n : n / Math.log(needNumber(loc, base, "math.log()"));
    }),
    round: native("math.round", 1, 2, (loc, x, digits = 0) => {
      const f = 10 ** needInt(loc, digits, "math.round()");
      return Math.round(needNumber(loc, x, "math.round()") * f) / f;
    }),
    pow: native("math.pow", 2, 2, (loc, a, b) => needNumber(loc, a, "math.pow()") ** needNumber(loc, b, "math.pow()")),
    atan2: native("math.atan2", 2, 2, (loc, y, x) => Math.atan2(needNumber(loc, y, "math.atan2()"), needNumber(loc, x, "math.atan2()"))),
    hypot: native("math.hypot", 1, Infinity, (loc, ...xs) => Math.hypot(...numbersOf(loc, xs, "math.hypot()"))),
    min: native("math.min", 1, Infinity, (loc, ...xs) => {
      const nums = numbersOf(loc, xs, "math.min()");
      return nums.length ? Math.min(...nums) : null;
    }),
    max: native("math.max", 1, Infinity, (loc, ...xs) => {
      const nums = numbersOf(loc, xs, "math.max()");
      return nums.length ? Math.max(...nums) : null;
    }),
    clamp: native("math.clamp", 3, 3, (loc, x, lo, hi) =>
      Math.min(Math.max(needNumber(loc, x, "math.clamp()"), needNumber(loc, lo, "math.clamp()")), needNumber(loc, hi, "math.clamp()"))),
    random: native("math.random", 0, 2, (loc, a, b) => {
      if (a === undefined) return Math.random();
      const lo = b === undefined ? 0 : needInt(loc, a, "math.random()");
      const hi = needInt(loc, b === undefined ? a : b, "math.random()");
      if (hi < lo) fail(loc, "math.random(low, high) needs low <= high");
      return lo + Math.floor(Math.random() * (hi - lo + 1));
    }),
  });

  const json = module({
    parse: native("json.parse", 1, 1, (loc, text) => {
      try {
        return fromJson(JSON.parse(needString(loc, text, "json.parse()")));
      } catch (e) {
        if (e instanceof ErrorValue) throw e;
        fail(loc, `That text is not valid JSON (${(e as Error).message})`);
      }
    }),
    text: native("json.text", 1, 2, (loc, value, spaces = 0) =>
      JSON.stringify(toJson(loc, value) ?? null, null, needInt(loc, spaces, "json.text()")) ?? "null"),
  });

  const time = module({
    now: native("time.now", 0, 0, () => Date.now()),
    date: native("time.date", 0, 1, (loc, ts) => {
      const d = toDate(loc, ts);
      return new Map<string, unknown>([
        ["year", d.getFullYear()], ["month", d.getMonth() + 1], ["day", d.getDate()],
        ["hour", d.getHours()], ["minute", d.getMinutes()], ["second", d.getSeconds()],
        ["ms", d.getMilliseconds()], ["weekday", DAY_NAMES[d.getDay()]],
      ]);
    }),
    make: native("time.make", 3, 6, (loc, y, mo, d, h = 0, mi = 0, s = 0) =>
      new Date(needInt(loc, y, "time.make()"), needInt(loc, mo, "time.make()") - 1, needInt(loc, d, "time.make()"),
        needInt(loc, h, "time.make()"), needInt(loc, mi, "time.make()"), needNumber(loc, s, "time.make()")).getTime()),
    format: native("time.format", 1, 2, (loc, ts, pattern = "YYYY-MM-DD HH:mm") =>
      formatDate(toDate(loc, ts), needString(loc, pattern, "time.format()"))),
    iso: native("time.iso", 0, 1, (loc, ts) => toDate(loc, ts).toISOString()),
    parse: native("time.parse", 1, 1, (loc, text) => {
      const t = Date.parse(needString(loc, text, "time.parse()"));
      return Number.isNaN(t) ? null : t;
    }),
    SECOND: 1000,
    MINUTE: 60_000,
    HOUR: 3_600_000,
    DAY: 86_400_000,
  });

  const toHeaders = (loc: Loc, h: unknown): Record<string, string> => {
    if (h === null || h === undefined) return {};
    if (!(h instanceof Map)) fail(loc, `headers must be a map, but got ${typeName(h)}`);
    return Object.fromEntries([...h].map(([k, v]) => [str(k), str(v)]));
  };

  const fetchUrl = native("fetch", 1, 2, async (loc, url, options) => {
    const init: RequestInit = {};
    if (options !== undefined && options !== null) {
      if (!(options instanceof Map)) fail(loc, `fetch() options must be a map, like {method: "POST"}, but got ${typeName(options)}`);
      if (options.has("method")) init.method = str(options.get("method")).toUpperCase();
      const headers = toHeaders(loc, options.get("headers"));
      if (options.has("body")) {
        const body = options.get("body");
        if (typeof body === "string") {
          init.body = body;
        } else {
          init.body = JSON.stringify(toJson(loc, body));
          headers["content-type"] ??= "application/json";
        }
      }
      init.headers = headers;
    }
    let res: Response;
    try {
      res = await fetch(needString(loc, url, "fetch()"), init);
    } catch (e) {
      throw ErrorValue.create(`Couldn't fetch ${String(url)}: ${(e as Error).message}`, "NetworkError", loc);
    }
    return new Map<string, unknown>([
      ["status", res.status],
      ["ok", res.ok],
      ["statusText", res.statusText],
      ["url", res.url],
      ["headers", new Map(res.headers)],
      ["text", native("text", 0, 0, () => res.text())],
      ["json", native("json", 0, 0, async (l) => {
        const text = await res.text();
        try {
          return fromJson(JSON.parse(text));
        } catch {
          fail(l, `The answer from ${res.url} is not valid JSON`);
        }
      })],
    ]);
  });

  return {
    Error: ErrorValue,
    math,
    json,
    time,
    files,
    args: [...host.args],
    ask: native("ask", 0, 1, (_, prompt) => host.readLine(prompt === undefined ? "" : str(prompt))),
    len: native("len", 1, 1, (loc, x) => {
      if (typeof x === "string" || Array.isArray(x)) return x.length;
      if (x instanceof Map || x instanceof Set) return x.size;
      if (x instanceof PitRange) return x.size;
      fail(loc, `len() needs text, a list, a map or a set, but got ${typeName(x)}`);
    }),
    str: native("str", 1, 1, (_, x) => str(x)),
    num: native("num", 1, 1, (_, x) => toNumber(x)),
    int: native("int", 1, 1, (_, x) => {
      const n = toNumber(x);
      return n === null ? null : Math.trunc(n);
    }),
    type: native("type", 1, 1, (_, x) => typeName(x)),
    clock: native("clock", 0, 0, () => Date.now() / 1000),
    random: native("random", 0, 0, () => Math.random()),
    list: native("list", 0, 1, (loc, x) => (x === undefined || x === null ? [] : [...iter(loc, x)])),
    set: native("set", 0, 1, (loc, x) => new Set(x === undefined || x === null ? [] : iter(loc, x))),
    range: native("range", 1, 3, (loc, a, b, step) => {
      const [start, end] = b === undefined ? [0, a] : [a, b];
      const s = step === undefined ? null : needNumber(loc, step, "range()");
      if (s === 0) fail(loc, "range() can't step by 0");
      return new PitRange(needNumber(loc, start, "range()"), needNumber(loc, end, "range()"), false, s);
    }),
    pattern: native("pattern", 1, 2, (loc, source, flags = "") => {
      try {
        return new RegExp(needString(loc, source, "pattern()"), needString(loc, flags, "pattern()"));
      } catch (e) {
        fail(loc, `That pattern is not valid: ${(e as Error).message}`);
      }
    }),
    same: native("same", 2, 2, (_, a, b) => deepEqual(a, b)),
    check: native("check", 1, 2, (loc, condition, message) => {
      if (!truthy(condition)) throw ErrorValue.create(message === undefined ? "Check failed" : str(message), "CheckError", loc);
      return null;
    }),
    char: native("char", 1, 1, (loc, code) => {
      const n = needInt(loc, code, "char()");
      if (n < 0 || n > 0x10ffff) fail(loc, `${n} is not a character code`);
      return String.fromCodePoint(n);
    }),
    sleep: native("sleep", 1, 1, (loc, ms) => new Promise((resolve) => setTimeout(() => resolve(null), needNumber(loc, ms, "sleep()")))),
    later: native("later", 2, 2, (loc, ms, fn) => {
      const id = nextTimer++;
      const handle = setTimeout(() => {
        timers.delete(id);
        guarded(loc, fn)();
      }, needNumber(loc, ms, "later()"));
      timers.set(id, { cancel: () => clearTimeout(handle) });
      return id;
    }),
    every: native("every", 2, 2, (loc, ms, fn) => {
      const id = nextTimer++;
      const handle = setInterval(guarded(loc, fn), needNumber(loc, ms, "every()"));
      timers.set(id, { cancel: () => clearInterval(handle) });
      return id;
    }),
    cancel: native("cancel", 1, 1, (_, id) => {
      const timer = timers.get(id as number);
      timer?.cancel();
      timers.delete(id as number);
      return timer !== undefined;
    }),
    all: native("all", 1, 1, (loc, items) => {
      if (!Array.isArray(items)) fail(loc, `all() needs a list, but got ${typeName(items)}`);
      return Promise.all(items);
    }),
    race: native("race", 1, 1, (loc, items) => {
      if (!Array.isArray(items)) fail(loc, `race() needs a list, but got ${typeName(items)}`);
      return Promise.race(items);
    }),
    promise: native("promise", 1, 1, (loc, fn) =>
      new Promise((resolve, reject) => {
        invoke(loc, fn, [
          native("done", 0, 1, (_, v = null) => (resolve(v), null)),
          native("fail", 0, 1, (l, why = "Promise failed") => (reject(why instanceof ErrorValue ? why : ErrorValue.create(str(why), undefined, l)), null)),
        ]);
      })),
    fetch: fetchUrl,
    quit: native("quit", 0, 1, (loc, code = 0) => {
      host.exit(needInt(loc, code, "quit()"));
      return null;
    }),
  };
}

