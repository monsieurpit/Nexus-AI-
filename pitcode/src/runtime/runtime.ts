import { compile, type Binding } from "../compiler";
import { PitError } from "../errors";
import { Lexer } from "../lexer";
import { Parser } from "../parser";
import type { Stmt } from "../ast";
import { call, fail, findMember } from "./core";
import * as ops from "./ops";
import { createBuiltins, type FileSystem } from "./stdlib";
import {
  Base, ErrorValue, decodeLoc, hooks, makeLoc, str, type Loc,
} from "./values";

/** Everything PitCode needs from the outside world. Only `write` is required. */
export interface Host {
  write(text: string): void;
  /** Where `warn` writes. Defaults to `write`. */
  writeError?(text: string): void;
  /** Environment variables, readable as the `env` map. */
  env?: Record<string, string>;
  /** Reads a line the user types (for `ask`). */
  readLine?(prompt: string): string | null;
  /** Finds a file for `use`. `from` is the file that asks for it. */
  loadModule?(spec: string, from: string): { name: string; source: string };
  fs?: FileSystem;
  args?: string[];
  exit?(code: number): void;
  /** Called for errors that happen after the main program finished (in timers or unawaited tasks). */
  reportError?(error: PitError): void;
}

/** Parses PitCode source. A `#!` first line is ignored. */
export function parse(source: string): Stmt[] {
  const tokens = new Lexer(source.replace(/^#!.*/, "")).tokenize();
  return new Parser(tokens).parseProgram();
}

// A kind's own `show()` method decides how its instances are printed.
hooks.showInstance = (value: Base) => {
  const show = findMember(value, "show");
  if (!show || typeof show.value !== "function") return undefined;
  return str(show.value.call(value));
};

interface SourceFile {
  name: string;
  source: string;
}

/** One running PitCode program, with its files, modules and built-ins. */
export class Runtime {
  private readonly files: SourceFile[] = [{ name: "<unknown>", source: "" }];
  private readonly modules = new Map<string, Promise<Map<string, unknown>>>();
  readonly builtins: Record<string, unknown>;
  /** Helpers that compiled code calls as `$.name(...)`. `p` is the position of the running statement. */
  readonly helpers: Record<string, unknown> & { p: Loc };
  private readonly replGlobals = new Map<string, Binding>();
  private readonly replValues: Record<string, unknown> = Object.create(null);

  constructor(private readonly host: Host) {
    this.builtins = createBuiltins({
      readLine: (prompt) => host.readLine?.(prompt) ?? null,
      writeError: (text) => (host.writeError ?? host.write)(text),
      env: host.env ?? {},
      fs: host.fs,
      args: host.args ?? [],
      exit: (code) => {
        if (host.exit) host.exit(code);
        else fail(this.helpers.p, "quit() can't be used here");
      },
      reportError: (e) => this.report(e),
    });
    this.helpers = {
      p: 0,
      t: ops.truthy, eq: ops.eq,
      add: ops.add, sub: ops.sub, mul: ops.mul, div: ops.div, mod: ops.mod, pow: ops.pow, neg: ops.neg,
      band: ops.band, bor: ops.bor, bxor: ops.bxor, shl: ops.shl, shr: ops.shr, bnot: ops.bnot,
      lt: ops.lt, le: ops.le, gt: ops.gt, ge: ops.ge,
      is: ops.is, in: ops.isIn,
      range: ops.range, rangeEnds: ops.rangeEnds, rangeStep: ops.rangeStep,
      g: ops.get, g0: ops.getOpt, s: ops.set, i: ops.index, si: ops.setIndex, u: ops.update, ui: ops.updateIndex,
      c: call, m: ops.callMember, m0: ops.callMemberOpt, up: ops.callUp,
      base: ops.parentKind, kind: ops.defineKind, fn: ops.defineFn, Base,
      iter: ops.iter, pairs: ops.pairs, aiter: ops.asyncIter,
      sl: ops.spread, se: ops.spreadEntries, ul: ops.unpackList, um: ops.unpackMap, without: ops.without,
      mt: ops.matches, raise: ops.raise, ex: ops.exportsMap, str,
      say: (values: unknown[]) => {
        host.write(values.map(str).join(" ") + "\n");
        return null;
      },
      caught: (e: unknown) => this.toErrorValue(e),
      use: (loc: Loc, spec: string) => this.use(loc, spec),
      pick: (loc: Loc, mod: Map<string, unknown>, names: string[], path: string) => {
        const out: Record<string, unknown> = Object.create(null);
        for (const n of names) {
          if (!mod.has(n)) fail(loc, `"${path}" doesn't share '${n}'`);
          out[n] = mod.get(n);
        }
        return out;
      },
    };
  }

  /** Runs a program. Throws a PitError if it fails. */
  async run(source: string, name = "<input>"): Promise<void> {
    try {
      await this.execute(source, name);
    } catch (e) {
      throw this.toPitError(e);
    }
  }

  /** Runs one REPL entry; names it creates stay visible to later entries. Returns the last expression's value. */
  async runRepl(source: string, name = "<repl>"): Promise<unknown> {
    try {
      const fileId = this.register(name, source);
      const code = this.compileSource(source, name, fileId, this.replGlobals);
      return await this.load(code)(this.helpers, this.builtins, this.replValues);
    } catch (e) {
      throw this.toPitError(e);
    }
  }

  /** The JavaScript a program compiles to (for `pitcode --js`). */
  compileToJs(source: string, name = "<input>"): string {
    const fileId = this.register(name, source);
    return this.compileSource(source, name, fileId);
  }

  private register(name: string, source: string): number {
    this.files.push({ name, source });
    return this.files.length - 1;
  }

  private compileSource(source: string, name: string, fileId: number, repl?: Map<string, Binding>): string {
    try {
      return compile(parse(source), { fileId, builtins: Object.keys(this.builtins), repl });
    } catch (e) {
      if (e instanceof PitError) {
        e.file ??= name;
        e.source ??= source;
      }
      throw e;
    }
  }

  private load(code: string): (...args: unknown[]) => Promise<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return new Function("$", "$B", "$R", code) as (...args: unknown[]) => Promise<unknown>;
  }

  private async execute(source: string, name: string): Promise<Map<string, unknown>> {
    const fileId = this.register(name, source);
    const code = this.compileSource(source, name, fileId);
    return (await this.load(code)(this.helpers, this.builtins, null)) as Map<string, unknown>;
  }

  private use(loc: Loc, spec: string): Promise<Map<string, unknown>> {
    const from = this.files[decodeLoc(loc).fileId]?.name ?? "<input>";
    if (!this.host.loadModule) fail(loc, "'use' can't load files here");
    let found: { name: string; source: string };
    try {
      found = this.host.loadModule(spec, from);
    } catch {
      fail(loc, `Can't find the file "${spec}"`);
    }
    let module = this.modules.get(found.name);
    if (!module) {
      module = this.execute(found.source, found.name);
      this.modules.set(found.name, module);
    }
    return module;
  }

  /** Turns anything thrown into the Error value that `rescue` sees. */
  toErrorValue(e: unknown): ErrorValue {
    if (e instanceof ErrorValue) return e;
    if (e instanceof PitError) {
      const fileId = this.files.findIndex((f) => f.name === e.file);
      return ErrorValue.create(e.message, e.kind, fileId > 0 ? makeLoc(fileId, e.line, e.col) : undefined);
    }
    const at = this.helpers.p;
    if (e instanceof RangeError && /call stack/i.test(e.message)) {
      return ErrorValue.create("Too much recursion (the call stack overflowed)", "RuntimeError", at);
    }
    if (e instanceof ReferenceError) {
      const m = /^Cannot access '([A-Za-z_][A-Za-z0-9_]*)\$' before initialization/.exec(e.message);
      if (m) return ErrorValue.create(`'${m[1]}' is used before it is created`, "RuntimeError", at);
    }
    if (e instanceof Error) {
      const debug = typeof process !== "undefined" && process.env?.PITCODE_DEBUG;
      const detail = debug ? `\n${e.stack}` : "";
      return ErrorValue.create(`${e.message}${detail}`, "InternalError", at);
    }
    return ErrorValue.create(str(e), undefined, at);
  }

  /** Turns anything thrown into a PitError that points at the right file and line. */
  toPitError(e: unknown): PitError {
    if (e instanceof PitError) return e;
    const value = this.toErrorValue(e);
    const loc = ErrorValue.locOf(value) ?? this.helpers.p;
    const { fileId, line, col } = decodeLoc(loc);
    const file = this.files[fileId] ?? this.files[0];
    return new PitError(value.name, value.message, line, col, file.name, file.source);
  }

  private report(e: unknown): void {
    const error = this.toPitError(e);
    if (this.host.reportError) this.host.reportError(error);
    else this.host.write(error.format() + "\n");
  }
}

/** Calls a PitCode function value from JavaScript. */
export function callValue(f: unknown, args: unknown[]): unknown {
  return call(0, f, args);
}
