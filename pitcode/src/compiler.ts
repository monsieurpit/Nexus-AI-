import type { Expr, FunctionDef, KindMember, MatchArm, Spread, Stmt, Target } from "./ast";
import { HABIT_HINTS, nameError } from "./errors";
import { closest } from "./runtime/core";
import { makeLoc } from "./runtime/values";
import type { Token } from "./token";

export type BindingKind = "var" | "lock" | "func" | "kind" | "param" | "import" | "builtin" | "loop" | "error";

export interface Binding {
  kind: BindingKind;
  /** The JavaScript expression that holds the value. */
  js: string;
  locked: boolean;
}

export interface CompileOptions {
  fileId: number;
  builtins: Iterable<string>;
  /**
   * REPL mode: top-level names live in the `$R` object and in this map,
   * so each new line can see what earlier lines created.
   */
  repl?: Map<string, Binding>;
  /** Adds a check in every loop so a program that never stops can be stopped (used in the browser). */
  guardLoops?: boolean;
}

class Scope {
  readonly names = new Map<string, Binding>();
  constructor(readonly parent: Scope | null, readonly isRepl = false) {}

  lookup(name: string): Binding | undefined {
    for (let s: Scope | null = this; s; s = s.parent) {
      const b = s.names.get(name);
      if (b) return b;
    }
    return undefined;
  }

  visibleNames(): string[] {
    const out: string[] = [];
    for (let s: Scope | null = this; s; s = s.parent) out.push(...s.names.keys());
    return out;
  }
}

interface FnState {
  temps: string[];
  /** JavaScript for `me`: "$me" in methods and the functions inside them, "this" in field values. */
  me: string | null;
  /** Directly inside a method, where `super` works. */
  inMethod: boolean;
}

const COMPOUND: Record<string, string> = {
  "+=": "+", "-=": "-", "*=": "*", "/=": "/", "%=": "%", "**=": "**", "++": "+", "--": "-",
};

const BINARY_HELPERS: Record<string, string> = {
  "+": "add", "-": "sub", "*": "mul", "/": "div", "%": "mod", "**": "pow",
  "<": "lt", "<=": "le", ">": "gt", ">=": "ge",
  "&": "band", "|": "bor", "^": "bxor", "<<": "shl", ">>": "shr",
};

const BOOL_OPS = new Set(["==", "!=", "<", "<=", ">", ">=", "is", "in"]);

const q = (s: string) => JSON.stringify(s);
const indent = (code: string) => code.split("\n").map((l) => (l ? "  " + l : l)).join("\n");

/** Turns a parsed PitCode program into the body of a JavaScript function `($, $B, $R) => Promise`. */
export function compile(program: Stmt[], options: CompileOptions): string {
  return new Compiler(options).program(program);
}

class Compiler {
  private uid = 0;
  private fn: FnState = { temps: [], me: null, inMethod: false };
  private scope: Scope;
  private readonly topScope: Scope;
  private readonly usedBuiltins = new Set<string>();
  private readonly exports: [string, string][] = [];

  constructor(private readonly options: CompileOptions) {
    const root = new Scope(null);
    for (const name of options.builtins) root.names.set(name, { kind: "builtin", js: `${name}$`, locked: true });
    if (options.repl) {
      this.topScope = new Scope(root, true);
      for (const [name, b] of options.repl) this.topScope.names.set(name, b);
    } else {
      this.topScope = new Scope(root);
    }
    this.scope = this.topScope;
  }

  program(program: Stmt[]): string {
    const repl = this.options.repl;
    // In the REPL, the value of a final expression is given back so it can be shown.
    const final = program[program.length - 1];
    const lastExpr = repl && final?.kind === "Expr" ? final.expr : null;
    const body = this.statements(lastExpr ? program.slice(0, -1) : program);
    let tail = "";
    if (lastExpr) {
      tail = `return ${this.expr(lastExpr)};`;
    } else if (!repl) {
      tail = `return $.ex([${this.exports.map(([name, js]) => `[${q(name)}, ${js}]`).join(", ")}]);`;
    }
    if (repl) {
      for (const [name, b] of this.topScope.names) repl.set(name, b);
    }
    const prelude = [...this.usedBuiltins].map((n) => `const ${n}$ = $B[${q(n)}];`).join("\n");
    const temps = this.fn.temps.length ? `let ${this.fn.temps.join(", ")};` : "";
    return [
      '"use strict";',
      "return (async () => {",
      indent(prelude),
      indent(temps),
      "  {",
      indent(indent(body)),
      indent(indent(tail)),
      "  }",
      "})();",
    ].filter((l) => l.trim() !== "").join("\n");
  }

  // ---------- helpers ----------

  private loc(t: { line: number; col: number }): string {
    return String(makeLoc(this.options.fileId, t.line, t.col));
  }

  private guard(): string {
    return this.options.guardLoops ? "$.tick();\n" : "";
  }

  private temp(): string {
    const name = `$t${++this.uid}`;
    this.fn.temps.push(name);
    return name;
  }

  private unique(prefix: string): string {
    return `$${prefix}${++this.uid}`;
  }

  private inScope<T>(scope: Scope, run: () => T): T {
    const saved = this.scope;
    this.scope = scope;
    try {
      return run();
    } finally {
      this.scope = saved;
    }
  }

  private isReplTop(): boolean {
    return this.scope === this.topScope && this.topScope.isRepl;
  }

  private declare(name: Token, kind: BindingKind, locked: boolean): Binding {
    const existing = this.scope.names.get(name.lexeme);
    if (existing && !this.scope.isRepl) {
      throw nameError(name, `'${name.lexeme}' already exists here. To change it, write: ${name.lexeme} = ...`);
    }
    const js = this.scope.isRepl ? `$R[${q(name.lexeme)}]` : `${name.lexeme}$`;
    const binding: Binding = { kind, js, locked };
    this.scope.names.set(name.lexeme, binding);
    return binding;
  }

  private resolve(name: Token): Binding {
    const b = this.scope.lookup(name.lexeme);
    if (b) {
      if (b.kind === "builtin") this.usedBuiltins.add(name.lexeme);
      return b;
    }
    const hint = HABIT_HINTS[name.lexeme];
    if (hint) throw nameError(name, `Undefined variable '${name.lexeme}'. ${hint}`);
    const similar = closest(name.lexeme, this.scope.visibleNames());
    if (similar) throw nameError(name, `Undefined variable '${name.lexeme}'. Did you mean '${similar}'?`);
    throw nameError(name, `Undefined variable '${name.lexeme}'. Create it first with: pit ${name.lexeme} = ...`);
  }

  // ---------- statements ----------

  /** Compiles a list of statements; functions are hoisted so they can be called before they appear. */
  private statements(stmts: Stmt[]): string {
    for (const s of stmts) this.declareStatement(s);
    const funcs = stmts.filter((s) => s.kind === "Func").map((s) => this.statement(s));
    const rest = stmts.filter((s) => s.kind !== "Func").map((s) => this.statement(s));
    return [...funcs, ...rest].join("\n");
  }

  private declareStatement(s: Stmt): void {
    switch (s.kind) {
      case "Pit":
        for (const name of targetNames(s.target)) this.declare(name, s.locked ? "lock" : "var", s.locked);
        return;
      case "Func":
        this.declare(s.name, "func", false);
        return;
      case "Kind":
        this.declare(s.name, "kind", true);
        return;
      case "Use":
        if (s.alias) this.declare(s.alias, "import", true);
        for (const n of s.names ?? []) this.declare(n.as, "import", true);
        return;
    }
  }

  private block(stmts: Stmt[], setup?: (scope: Scope) => void): string {
    const scope = new Scope(this.scope);
    setup?.(scope);
    return this.inScope(scope, () => this.statements(stmts));
  }

  private statement(s: Stmt): string {
    switch (s.kind) {
      case "Expr":
        return `$.p = ${this.exprLoc(s.expr)}; ${this.expr(s.expr)};`;
      case "Say":
        return `$.say([${s.values.map((v) => this.expr(v)).join(", ")}]);`;
      case "Pit":
        return this.pit(s);
      case "Assign":
        return this.assign(s);
      case "Block":
        return `{\n${indent(this.block(s.body))}\n}`;
      case "When": {
        let code = "";
        s.branches.forEach((b, i) => {
          code += `${i === 0 ? "if" : " else if"} (${this.bool(b.cond)}) {\n${indent(this.block(b.body))}\n}`;
        });
        if (s.otherwise) code += ` else {\n${indent(this.block(s.otherwise))}\n}`;
        return code;
      }
      case "LoopForever":
        return `for (;;) {\n${indent(this.guard() + this.block(s.body))}\n}`;
      case "LoopWhile":
        return `while (${this.bool(s.cond)}) {\n${indent(this.guard() + this.block(s.body))}\n}`;
      case "LoopEach":
        return this.loopEach(s);
      case "LoopTimes": {
        const n = this.unique("n");
        const i = this.unique("i");
        return `for (let ${i} = 0, ${n} = $.times(${this.loc(s.token)}, ${this.expr(s.count)}); ${i} < ${n}; ${i}++) {\n${indent(this.guard() + this.block(s.body))}\n}`;
      }
      case "Func":
        return this.funcDeclaration(s.name, s.fn, s.shared);
      case "Kind":
        return this.kindDeclaration(s);
      case "Back":
        return `$.p = ${this.loc(s.keyword)}; return ${s.value ? this.expr(s.value) : "null"};`;
      case "Give":
        return `yield ${s.value ? this.expr(s.value) : "null"};`;
      case "Stop":
        return "break;";
      case "Skip":
        return "continue;";
      case "Raise":
        return `throw $.raise(${this.loc(s.keyword)}, ${this.expr(s.value)});`;
      case "Attempt":
        return this.attempt(s);
      case "MatchStmt":
        return this.matchStatement(s.subject, s.arms);
      case "Use":
        return this.use(s);
    }
  }

  private exprLoc(e: Expr): string {
    const t = exprToken(e);
    return t ? this.loc(t) : "$.p";
  }

  /** `rawInit` is JavaScript for the value (used by pattern loops); the names are declared here. */
  private pit(s: Extract<Stmt, { kind: "Pit" }>, rawInit?: string): string {
    if (rawInit) for (const name of targetNames(s.target)) this.declare(name, "var", false);
    const init = rawInit ?? (s.init ? this.expr(s.init) : "null");
    const decl = this.isReplTop() ? "" : s.locked ? "const " : "let ";
    const names = targetNames(s.target);
    const bindings = names.map((n) => this.scope.lookup(n.lexeme)!);
    if (s.shared) names.forEach((n, i) => this.exports.push([n.lexeme, bindings[i].js]));
    const at = `$.p = ${this.loc(s.token)}; `;
    const t = s.target;
    if (t.kind === "Name") return `${at}${decl}${bindings[0].js} = ${init};`;
    const item = (i: { name: Token; default: Expr | null }) =>
      `${this.scope.lookup(i.name.lexeme)!.js} = ${i.default ? this.expr(i.default) : "null"}`;
    if (t.kind === "ListPattern") {
      const parts = t.items.map(item);
      if (t.rest) parts.push(`...${this.scope.lookup(t.rest.lexeme)!.js}`);
      return `${at}${decl}[${parts.join(", ")}] = $.ul(${this.loc(t.token)}, ${init});`;
    }
    const source = this.unique("d");
    const parts = t.entries.map((e) => `${q(e.key)}: ${item(e.item)}`);
    let code = `${at}const ${source} = $.um(${this.loc(t.token)}, ${init});\n`;
    code += decl ? `${decl}{${parts.join(", ")}} = ${source};` : `({${parts.join(", ")}} = ${source});`;
    if (t.rest) {
      code += `\n${decl}${this.scope.lookup(t.rest.lexeme)!.js} = $.without(${source}, [${t.entries.map((e) => q(e.key)).join(", ")}]);`;
    }
    return code;
  }

  private assign(s: Extract<Stmt, { kind: "Assign" }>): string {
    const loc = this.loc(s.op);
    const op = COMPOUND[s.op.type] ?? null;
    const value = this.expr(s.value);
    const t = s.target;
    const at = `$.p = ${loc}; `;
    if (s.op.type === "??=") return at + this.nilAssign(t, loc, value) + ";";
    if (t.kind === "Var") {
      const b = this.resolve(t.name);
      if (b.locked) {
        const why = b.kind === "builtin" ? `Cannot change built-in '${t.name.lexeme}'. Make your own with: pit ${t.name.lexeme} = ...`
          : b.kind === "kind" ? `Cannot change kind '${t.name.lexeme}'`
          : b.kind === "import" ? `Cannot change '${t.name.lexeme}' because it comes from 'use'`
          : `Cannot change locked '${t.name.lexeme}'`;
        throw nameError(t.name, why);
      }
      if (op) return `${at}${b.js} = $.${BINARY_HELPERS[op]}(${loc}, ${b.js}, ${value});`;
      return `${at}${b.js} = ${value};`;
    }
    if (t.kind === "List") {
      const names = t.items.map((item) => {
        const v = (item.kind === "Spread" ? item.expr : item) as Extract<Expr, { kind: "Var" }>;
        const b = this.resolve(v.name);
        if (b.locked) throw nameError(v.name, `Cannot change locked '${v.name.lexeme}'`);
        return item.kind === "Spread" ? `...${b.js}` : b.js;
      });
      return `${at}[${names.join(", ")}] = $.ul(${loc}, ${value});`;
    }
    if (t.kind === "Member") {
      const obj = this.expr(t.object);
      if (op) return `${at}$.u(${loc}, ${obj}, ${q(t.name)}, ${q(op)}, ${value});`;
      return `${at}$.s(${loc}, ${obj}, ${q(t.name)}, ${value});`;
    }
    if (t.kind === "Index") {
      const obj = this.expr(t.object);
      const index = this.expr(t.index);
      if (op) return `${at}$.ui(${loc}, ${obj}, ${index}, ${q(op)}, ${value});`;
      return `${at}$.si(${loc}, ${obj}, ${index}, ${value});`;
    }
    throw nameError(s.op, "You can only assign to a variable, a field or an item");
  }

  /** `target ??= value`: only sets it (and only works out `value`) when it is nil. */
  private nilAssign(t: Expr, loc: string, value: string): string {
    if (t.kind === "Var") {
      const b = this.resolve(t.name);
      if (b.locked) throw nameError(t.name, `Cannot change locked '${t.name.lexeme}'`);
      return `${b.js} ??= ${value}`;
    }
    const obj = this.temp();
    if (t.kind === "Member") {
      return `(${obj} = ${this.expr(t.object)}, $.g(${loc}, ${obj}, ${q(t.name)}) ?? $.s(${loc}, ${obj}, ${q(t.name)}, ${value}))`;
    }
    if (t.kind === "Index") {
      const key = this.temp();
      return `(${obj} = ${this.expr(t.object)}, ${key} = ${this.expr(t.index)}, $.i(${loc}, ${obj}, ${key}) ?? $.si(${loc}, ${obj}, ${key}, ${value}))`;
    }
    throw nameError({ line: 0, col: 0 }, "'??=' works on a variable, a field or an item");
  }

  private loopEach(s: Extract<Stmt, { kind: "LoopEach" }>): string {
    if (s.pattern) return this.loopPattern(s, s.pattern);
    const loc = this.loc(s.token);
    const setup = (scope: Scope) => {
      for (const n of s.names) {
        if (scope.names.has(n.lexeme)) throw nameError(n, `'${n.lexeme}' is used twice`);
        scope.names.set(n.lexeme, { kind: "loop", js: `${n.lexeme}$`, locked: false });
      }
    };
    const body = () => this.guard() + this.block(s.body, setup);
    const [first, second] = s.names.map((n) => `${n.lexeme}$`);
    const it = s.iterable;

    // Fast path: `loop i in a..b` becomes a plain counting loop.
    if (!s.isAwait && s.names.length === 1 && it.kind === "Range") {
      const a = this.unique("a");
      const b = this.unique("b");
      const step = this.unique("s");
      const from = this.expr(it.from);
      const to = this.expr(it.to);
      const stepCode = it.step ? `$.rangeStep(${this.loc(it.dots)}, ${this.expr(it.step)})` : `${a} <= ${b} ? 1 : -1`;
      const cmp = it.inclusive ? ["<=", ">="] : ["<", ">"];
      return [
        `{`,
        `  const ${a} = ${from}, ${b} = ${to};`,
        `  $.rangeEnds(${this.loc(it.dots)}, ${a}, ${b});`,
        `  const ${step} = ${stepCode};`,
        `  for (let ${first} = ${a}; ${step} > 0 ? ${first} ${cmp[0]} ${b} : ${first} ${cmp[1]} ${b}; ${first} += ${step}) {`,
        indent(indent(body())),
        `  }`,
        `}`,
      ].join("\n");
    }
    const iterable = this.expr(it);
    if (s.isAwait) {
      if (second) throw nameError(s.names[1], "'loop wait' takes one name");
      return `for await (let ${first} of $.aiter(${loc}, ${iterable})) {\n${indent(body())}\n}`;
    }
    if (second) return `for (let [${first}, ${second}] of $.pairs(${loc}, ${iterable})) {\n${indent(body())}\n}`;
    return `for (let ${first} of $.iter(${loc}, ${iterable})) {\n${indent(body())}\n}`;
  }

  /** `loop [a, b] in items`: each item is unpacked like `pit [a, b] = item`. */
  private loopPattern(s: Extract<Stmt, { kind: "LoopEach" }>, pattern: Target): string {
    const item = this.unique("v");
    const itemToken = s.token;
    const iterable = this.expr(s.iterable);
    const scope = new Scope(this.scope);
    const body = this.inScope(scope, () => {
      const unpack = this.pit({
        kind: "Pit", target: pattern, init: { kind: "Var", name: { ...itemToken, lexeme: item } }, locked: false, shared: false, token: itemToken,
      }, item);
      return this.guard() + unpack + "\n" + this.statements(s.body);
    });
    const head = s.isAwait ? `for await (const ${item} of $.aiter(${this.loc(s.token)}, ${iterable}))` : `for (const ${item} of $.iter(${this.loc(s.token)}, ${iterable}))`;
    return `${head} {\n${indent(body)}\n}`;
  }

  private attempt(s: Extract<Stmt, { kind: "Attempt" }>): string {
    let code = `try {\n${indent(this.block(s.body))}\n}`;
    if (s.rescue) {
      const e = this.unique("e");
      const name = s.errorName;
      const rescue = this.block(s.rescue, (scope) => {
        if (name) scope.names.set(name.lexeme, { kind: "error", js: `${name.lexeme}$`, locked: false });
      });
      const bind = name ? `let ${name.lexeme}$ = $.caught(${e});\n` : `$.caught(${e});\n`;
      code += ` catch (${e}) {\n${indent(bind + rescue)}\n}`;
    }
    if (s.always) code += ` finally {\n${indent(this.block(s.always))}\n}`;
    return code;
  }

  private matchTest(subject: string, pattern: Expr): string {
    if (pattern.kind === "Literal") {
      return pattern.value === null ? `${subject} == null` : `${subject} === ${literal(pattern.value)}`;
    }
    return `$.mt(${subject}, ${this.expr(pattern)})`;
  }

  private matchStatement(subjectExpr: Expr, arms: MatchArm<Stmt>[]): string {
    const subject = this.unique("m");
    let code = `{\n  const ${subject} = ${this.expr(subjectExpr)};\n`;
    let chain = "";
    arms.forEach((arm, i) => {
      const body = arm.body.kind === "Block" ? this.block(arm.body.body) : this.block([arm.body]);
      if (arm.patterns === null) {
        chain += i === 0 ? `{\n${indent(body)}\n}` : ` else {\n${indent(body)}\n}`;
      } else {
        const cond = arm.patterns.map((p) => this.matchTest(subject, p)).join(" || ");
        chain += `${i === 0 ? "if" : " else if"} (${cond}) {\n${indent(body)}\n}`;
      }
    });
    code += indent(chain) + "\n}";
    return code;
  }

  private use(s: Extract<Stmt, { kind: "Use" }>): string {
    const loc = this.loc(s.token);
    const load = `await $.use(${loc}, ${q(s.path)})`;
    const decl = this.isReplTop() ? "" : "const ";
    if (s.alias) return `${decl}${this.scope.lookup(s.alias.lexeme)!.js} = ${load};`;
    if (s.names) {
      const parts = s.names.map((n) => `${q(n.name)}: ${this.scope.lookup(n.as.lexeme)!.js}`);
      const pick = `$.pick(${loc}, ${load}, [${s.names.map((n) => q(n.name)).join(", ")}], ${q(s.path)})`;
      return decl ? `${decl}{${parts.join(", ")}} = ${pick};` : `({${parts.join(", ")}} = ${pick});`;
    }
    return `${load};`;
  }

  // ---------- functions and kinds ----------

  private arity(fn: FunctionDef): [number, string] {
    const min = fn.params.filter((p) => !p.default && !p.rest).length;
    const max = fn.params.some((p) => p.rest) ? "Infinity" : String(fn.params.length);
    return [min, max];
  }

  /** Parameters and body of a function, compiled in its own scope. */
  private functionParts(fn: FunctionDef, method: boolean): { params: string; body: string } {
    const savedFn = this.fn;
    const scope = new Scope(this.scope);
    this.fn = { temps: [], me: method ? "$me" : savedFn.me, inMethod: method };
    try {
      return this.inScope(scope, () => {
        const params: string[] = [];
        const unpack: string[] = [];
        for (const p of fn.params) {
          // Default values are worked out before `$me` exists, so they use `this`.
          const savedMe = this.fn.me;
          if (method) this.fn.me = "this";
          const def = p.default ? this.expr(p.default) : "null";
          this.fn.me = savedMe;
          if (p.pattern) {
            const js = this.unique("p");
            params.push(`${js} = ${def}`);
            unpack.push(this.pit({
              kind: "Pit", target: p.pattern, init: null, locked: false, shared: false, token: p.name,
            }, js));
            continue;
          }
          const b = this.declare(p.name, "param", false);
          params.push(p.rest ? `...${b.js}` : `${b.js} = ${def}`);
        }
        let body = [...unpack, this.statements(fn.body)].filter(Boolean).join("\n");
        const prologue: string[] = [];
        if (method) prologue.push("const $me = this;");
        if (this.fn.temps.length) prologue.push(`let ${this.fn.temps.join(", ")};`);
        if (prologue.length) body = prologue.join("\n") + (body ? "\n" + body : "");
        return { params: params.join(", "), body };
      });
    } finally {
      this.fn = savedFn;
    }
  }

  private functionExpression(fn: FunctionDef, name: string | null): string {
    const { params, body } = this.functionParts(fn, false);
    const [min, max] = this.arity(fn);
    const head = `${fn.isAsync ? "async " : ""}function${fn.isGenerator ? "*" : ""}`;
    return `$.fn(${head} (${params}) {\n${indent(body)}\n}, ${q(name ?? fn.name ?? "anonymous")}, ${min}, ${max})`;
  }

  private funcDeclaration(name: Token, fn: FunctionDef, shared: boolean): string {
    const b = this.scope.lookup(name.lexeme)!;
    if (shared) this.exports.push([name.lexeme, b.js]);
    if (this.isReplTop()) return `${b.js} = ${this.functionExpression(fn, name.lexeme)};`;
    const { params, body } = this.functionParts(fn, false);
    const [min, max] = this.arity(fn);
    const head = `${fn.isAsync ? "async " : ""}function${fn.isGenerator ? "*" : ""}`;
    return `${head} ${b.js}(${params}) {\n${indent(body)}\n}\n$.fn(${b.js}, ${q(name.lexeme)}, ${min}, ${max});`;
  }

  private kindDeclaration(s: Extract<Stmt, { kind: "Kind" }>): string {
    const b = this.scope.lookup(s.name.lexeme)!;
    if (s.shared) this.exports.push([s.name.lexeme, b.js]);
    const className = `${s.name.lexeme}$`;
    const parent = s.parent ? `$.base(${this.loc(s.name)}, ${this.expr(s.parent)})` : "$.Base";
    const members: string[] = [];
    const metas: string[] = [];
    const locked: string[] = [];
    for (const m of s.members) members.push(this.kindMember(m, metas, locked));
    const decl = this.isReplTop() ? `${b.js} = class ${className}` : `class ${className}`;
    const ref = this.isReplTop() ? b.js : className;
    return [
      `${decl} extends ${parent} {`,
      indent(members.join("\n")),
      `}${this.isReplTop() ? ";" : ""}`,
      `$.kind(${ref}, ${q(s.name.lexeme)}, [${metas.join(", ")}], [${locked.join(", ")}]);`,
    ].join("\n");
  }

  private kindMember(m: KindMember, metas: string[], locked: string[]): string {
    const key = `[${q(m.name.lexeme)}]`;
    const prefix = m.shared ? "static " : "";
    if (m.kind === "Field") {
      if (m.locked) locked.push(`[${q(m.name.lexeme)}, ${m.shared}]`);
      const savedFn = this.fn;
      this.fn = { temps: [], me: m.shared ? null : "$me", inMethod: false };
      try {
        let value = m.init ? this.expr(m.init) : "null";
        const setup: string[] = [];
        if (value.includes("$me")) setup.push("const $me = this;");
        if (this.fn.temps.length) setup.push(`let ${this.fn.temps.join(", ")};`);
        // The arrow function keeps `this` pointing at the new instance.
        if (setup.length) value = `(() => { ${setup.join(" ")} return ${value}; })()`;
        return `${prefix}${key} = ${value};`;
      } finally {
        this.fn = savedFn;
      }
    }
    const fn = m.fn;
    const { params, body } = this.functionParts(fn, !m.shared);
    const [min, max] = this.arity(fn);
    if (!m.accessor) metas.push(`[${q(m.name.lexeme)}, ${min}, ${max}, ${m.shared}]`);
    const head = m.accessor ? `${m.accessor} ` : `${fn.isAsync ? "async " : ""}${fn.isGenerator ? "*" : ""}`;
    return `${prefix}${head}${key}(${params}) {\n${indent(body)}\n}`;
  }

  // ---------- expressions ----------

  /** A condition: skips the truthiness check when the expression is already true/false. */
  private bool(e: Expr): string {
    return isBoolExpr(e) ? this.expr(e) : `$.t(${this.expr(e)})`;
  }

  private args(args: (Expr | Spread)[]): string {
    return `[${args.map((a) => (a.kind === "Spread" ? `...$.sl(${this.loc(a.token)}, ${this.expr(a.expr)})` : this.expr(a))).join(", ")}]`;
  }

  private expr(e: Expr): string {
    switch (e.kind) {
      case "Literal":
        return literal(e.value);
      case "Interp":
        return `(${e.parts.map((p) => (typeof p === "string" ? q(p) : `$.str(${this.expr(p)})`)).join(" + ")})`;
      case "Var":
        return this.resolve(e.name).js;
      case "Me":
        if (!this.fn.me) throw nameError(e.token, "'me' can only be used inside a kind's methods");
        return this.fn.me;
      case "List":
        return this.args(e.items);
      case "Map": {
        const entries = e.entries.map((en) => {
          if (en.kind === "Spread") return `...$.se(${this.loc(en.token)}, ${this.expr(en.expr)})`;
          if (en.kind === "Computed") return `[${this.expr(en.key)}, ${this.expr(en.value)}]`;
          const value = en.value.kind === "Lambda" ? this.functionExpression(en.value.fn, en.key) : this.expr(en.value);
          return `[${q(en.key)}, ${value}]`;
        });
        return `new Map([${entries.join(", ")}])`;
      }
      case "Unary": {
        if (e.op.type === "not") return `!${this.bool(e.right)}`;
        if (e.op.type === "-") {
          if (e.right.kind === "Literal" && typeof e.right.value === "number") return `(-${e.right.value})`;
          return `$.neg(${this.loc(e.op)}, ${this.expr(e.right)})`;
        }
        return `$.bnot(${this.loc(e.op)}, ${this.expr(e.right)})`;
      }
      case "Binary":
        return this.binary(e);
      case "Logical": {
        const left = this.expr(e.left);
        const right = this.expr(e.right);
        if (e.op.type === "??") return `(${left} ?? ${right})`;
        if (isBoolExpr(e.left)) return `(${left} ${e.op.type === "and" ? "&&" : "||"} ${right})`;
        const t = this.temp();
        return e.op.type === "and"
          ? `(${t} = ${left}, $.t(${t}) ? ${right} : ${t})`
          : `(${t} = ${left}, $.t(${t}) ? ${t} : ${right})`;
      }
      case "Ternary":
        return `(${this.bool(e.cond)} ? ${this.expr(e.then)} : ${this.expr(e.otherwise)})`;
      case "Range":
        return `$.range(${this.loc(e.dots)}, ${this.expr(e.from)}, ${this.expr(e.to)}, ${e.inclusive}, ${e.step ? this.expr(e.step) : "null"})`;
      case "Call":
        return this.call(e);
      case "Member":
        return `$.${e.optional ? "g0" : "g"}(${this.loc(e.token)}, ${this.expr(e.object)}, ${q(e.name)})`;
      case "Index":
        return `$.i(${this.loc(e.bracket)}, ${this.expr(e.object)}, ${this.expr(e.index)})`;
      case "Up":
        if (!this.fn.inMethod) throw nameError(e.token, "'up' can only be used directly inside a method");
        return `(super[${q(e.name)}] ?? null)`;
      case "Lambda":
        return this.functionExpression(e.fn, null);
      case "Match": {
        const t = this.temp();
        let code = "null";
        for (let i = e.arms.length - 1; i >= 0; i--) {
          const arm = e.arms[i];
          const value = this.expr(arm.body);
          code = arm.patterns === null ? value : `(${arm.patterns.map((p) => this.matchTest(t, p)).join(" || ")}) ? ${value} : ${code}`;
        }
        return `(${t} = ${this.expr(e.subject)}, ${code})`;
      }
      case "Wait":
        return `(await ${this.expr(e.expr)})`;
      case "SayExpr":
        return `$.say([${this.expr(e.value)}])`;
    }
  }

  private binary(e: Extract<Expr, { kind: "Binary" }>): string {
    const loc = this.loc(e.op);
    const a = this.expr(e.left);
    const b = this.expr(e.right);
    switch (e.op.type) {
      case "==": return `$.eq(${a}, ${b})`;
      case "!=": return `!$.eq(${a}, ${b})`;
      case "is": return `${e.negate ? "!" : ""}$.is(${loc}, ${a}, ${b})`;
      case "in": return `${e.negate ? "!" : ""}$.in(${loc}, ${a}, ${b})`;
    }
    return `$.${BINARY_HELPERS[e.op.type]}(${loc}, ${a}, ${b})`;
  }

  private call(e: Extract<Expr, { kind: "Call" }>): string {
    const loc = this.loc(e.paren);
    const args = this.args(e.args);
    const callee = e.callee;
    if (callee.kind === "Member") {
      return `$.${callee.optional ? "m0" : "m"}(${this.loc(callee.token)}, ${this.expr(callee.object)}, ${q(callee.name)}, ${args})`;
    }
    if (callee.kind === "Up") {
      if (!this.fn.inMethod) throw nameError(callee.token, "'up' can only be used directly inside a method");
      return `$.up(${loc}, super[${q(callee.name)}], $me, ${q(callee.name)}, ${args})`;
    }
    return `$.${e.optional ? "c0" : "c"}(${loc}, ${this.expr(callee)}, ${args})`;
  }
}

function literal(value: number | string | boolean | null): string {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "Infinity";
  return String(value);
}

function isBoolExpr(e: Expr): boolean {
  switch (e.kind) {
    case "Literal": return typeof e.value === "boolean";
    case "Unary": return e.op.type === "not";
    case "Binary": return BOOL_OPS.has(e.op.type);
    case "Logical": return e.op.type !== "??" && isBoolExpr(e.left) && isBoolExpr(e.right);
    default: return false;
  }
}

function targetNames(t: Target): Token[] {
  if (t.kind === "Name") return [t.name];
  if (t.kind === "ListPattern") return [...t.items.map((i) => i.name), ...(t.rest ? [t.rest] : [])];
  return [...t.entries.map((e) => e.item.name), ...(t.rest ? [t.rest] : [])];
}

/** A token inside an expression, used to point at the statement when something deep fails. */
function exprToken(e: Expr): Token | null {
  switch (e.kind) {
    case "Var": return e.name;
    case "Me": return e.token;
    case "Call": return exprToken(e.callee) ?? e.paren;
    case "Member": return exprToken(e.object) ?? e.token;
    case "Index": return exprToken(e.object) ?? e.bracket;
    case "Binary": return exprToken(e.left) ?? e.op;
    case "Logical": return exprToken(e.left) ?? e.op;
    case "Unary": return e.op;
    case "Up": return e.token;
    case "Wait": return e.token;
    case "Match": return e.token;
    case "Range": return exprToken(e.from) ?? e.dots;
    case "Map": return e.token;
    case "Lambda": return e.fn.token;
    case "Ternary": return exprToken(e.cond);
    case "SayExpr": return exprToken(e.value);
    default: return null;
  }
}
