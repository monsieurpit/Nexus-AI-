import type { Expr, Stmt } from "./ast";
import { installBuiltins, readLineFromStdin } from "./builtins";
import { Environment } from "./environment";
import { runtimeError } from "./errors";
import type { Token, TokenType } from "./token";
import {
  NativeFunction, PitFunction, isEqual, isTruthy, stringify, typeName, type Value,
} from "./values";

/** Thrown by `back` and caught by the function call that is returning. */
class BackSignal {
  constructor(readonly value: Value) {}
}
const STOP = Symbol("stop");
const SKIP = Symbol("skip");

export interface InterpreterOptions {
  write?: (text: string) => void;
  readLine?: (prompt: string) => string | null;
  /** How deep function calls may nest. Node's default stack fits about 1000. */
  maxCallDepth?: number;
}

/** Runs a parsed PitCode program by walking its syntax tree. */
export class Interpreter {
  readonly globals: Environment;
  private readonly write: (text: string) => void;
  private readonly maxCallDepth: number;
  private callDepth = 0;

  constructor(options: InterpreterOptions = {}) {
    this.write = options.write ?? ((text) => process.stdout.write(text));
    this.maxCallDepth = options.maxCallDepth ?? 1000;
    // Built-ins live one scope above the program, so programs may reuse their names.
    const builtins = new Environment(null);
    installBuiltins(builtins, { readLine: options.readLine ?? readLineFromStdin });
    this.globals = new Environment(builtins);
  }

  run(program: Stmt[]): void {
    this.executeBlock(program, this.globals);
  }

  private executeBlock(statements: Stmt[], env: Environment): void {
    for (const stmt of statements) this.execute(stmt, env);
  }

  private execute(stmt: Stmt, env: Environment): void {
    switch (stmt.kind) {
      case "Expr":
        this.evaluate(stmt.expr, env);
        return;
      case "Say":
        this.write(stmt.values.map((v) => stringify(this.evaluate(v, env))).join(" ") + "\n");
        return;
      case "Pit":
        env.define(stmt.name, stmt.init ? this.evaluate(stmt.init, env) : null, stmt.locked);
        return;
      case "Assign": {
        let value = this.evaluate(stmt.value, env);
        if (stmt.op.type !== "=") {
          const op = stmt.op.type.slice(0, 1) as TokenType;
          value = this.binary(op, env.get(stmt.name), value, stmt.op);
        }
        env.assign(stmt.name, value);
        return;
      }
      case "Block":
        this.executeBlock(stmt.body, new Environment(env));
        return;
      case "When":
        for (const branch of stmt.branches) {
          if (isTruthy(this.evaluate(branch.cond, env))) {
            this.executeBlock(branch.body, new Environment(env));
            return;
          }
        }
        if (stmt.otherwise) this.executeBlock(stmt.otherwise, new Environment(env));
        return;
      case "LoopWhile":
        while (isTruthy(this.evaluate(stmt.cond, env))) {
          if (this.loopIteration(stmt.body, new Environment(env)) === STOP) break;
        }
        return;
      case "LoopRange": {
        const from = this.evaluate(stmt.from, env);
        const to = this.evaluate(stmt.to, env);
        if (typeof from !== "number" || typeof to !== "number") {
          throw runtimeError(stmt.dots, `A range needs numbers, but got ${typeName(from)}..${typeName(to)}`);
        }
        // 0..3 counts 0, 1, 2. 3..0 counts down 3, 2, 1.
        const step = from <= to ? 1 : -1;
        for (let i = from; step > 0 ? i < to : i > to; i += step) {
          const scope = new Environment(env);
          scope.set(stmt.name.lexeme, i);
          if (this.loopIteration(stmt.body, scope) === STOP) break;
        }
        return;
      }
      case "Func":
        env.define(stmt.name, new PitFunction(stmt.fn, env), false);
        return;
      case "Back":
        throw new BackSignal(stmt.value ? this.evaluate(stmt.value, env) : null);
      case "Stop":
        throw STOP;
      case "Skip":
        throw SKIP;
    }
  }

  /** Runs one pass of a loop body; returns STOP when the loop should end. */
  private loopIteration(body: Stmt[], scope: Environment): typeof STOP | undefined {
    try {
      this.executeBlock(body, scope);
    } catch (signal) {
      if (signal === STOP) return STOP;
      if (signal !== SKIP) throw signal;
    }
    return undefined;
  }

  private evaluate(expr: Expr, env: Environment): Value {
    switch (expr.kind) {
      case "Literal":
        return expr.value;
      case "Interp":
        return expr.parts
          .map((part) => (typeof part === "string" ? part : stringify(this.evaluate(part, env))))
          .join("");
      case "Var":
        return env.get(expr.name);
      case "Unary": {
        const right = this.evaluate(expr.right, env);
        if (expr.op.type === "not") return !isTruthy(right);
        if (typeof right !== "number") throw runtimeError(expr.op, `Can't make ${typeName(right)} negative`);
        return -right;
      }
      case "Logical": {
        const left = this.evaluate(expr.left, env);
        if (expr.op.type === "or") return isTruthy(left) ? left : this.evaluate(expr.right, env);
        return isTruthy(left) ? this.evaluate(expr.right, env) : left;
      }
      case "Binary":
        return this.binary(expr.op.type, this.evaluate(expr.left, env), this.evaluate(expr.right, env), expr.op);
      case "Call": {
        const callee = this.evaluate(expr.callee, env);
        const args = expr.args.map((arg) => this.evaluate(arg, env));
        return this.call(callee, args, expr.paren);
      }
      case "Lambda":
        return new PitFunction(expr.fn, env);
    }
  }

  private binary(op: TokenType, a: Value, b: Value, at: Token): Value {
    switch (op) {
      case "+":
        if (typeof a === "number" && typeof b === "number") return a + b;
        if (typeof a === "string" || typeof b === "string") return stringify(a) + stringify(b);
        throw runtimeError(at, `Can't add ${typeName(a)} and ${typeName(b)}`);
      case "-":
      case "*":
      case "/":
      case "%": {
        if (typeof a !== "number" || typeof b !== "number") {
          throw runtimeError(at, `'${op}' needs two numbers, but got ${typeName(a)} and ${typeName(b)}`);
        }
        if (op === "-") return a - b;
        if (op === "*") return a * b;
        if (b === 0) throw runtimeError(at, "Division by zero");
        return op === "/" ? a / b : a % b;
      }
      case "<":
      case "<=":
      case ">":
      case ">=": {
        const comparable = (typeof a === "number" && typeof b === "number")
          || (typeof a === "string" && typeof b === "string");
        if (!comparable) throw runtimeError(at, `Can't compare ${typeName(a)} with ${typeName(b)}`);
        const [x, y] = [a as number | string, b as number | string];
        if (op === "<") return x < y;
        if (op === "<=") return x <= y;
        if (op === ">") return x > y;
        return x >= y;
      }
      case "==":
        return isEqual(a, b);
      case "!=":
        return !isEqual(a, b);
    }
    throw runtimeError(at, `Unknown operator '${op}'`);
  }

  private call(callee: Value, args: Value[], at: Token): Value {
    if (callee instanceof NativeFunction) {
      if (args.length < callee.minArgs || args.length > callee.maxArgs) {
        const expected = callee.minArgs === callee.maxArgs
          ? plural(callee.minArgs, "argument")
          : `${callee.minArgs} to ${callee.maxArgs} arguments`;
        throw runtimeError(at, `${callee.name}() expects ${expected} but got ${args.length}`);
      }
      return callee.fn(args, at);
    }
    if (!(callee instanceof PitFunction)) {
      throw runtimeError(at, `A ${typeName(callee)} is not a function, so it can't be called`);
    }
    const { params, body } = callee.def;
    if (args.length !== params.length) {
      throw runtimeError(at, `${callee.name}() expects ${plural(params.length, "argument")} but got ${args.length}`);
    }
    if (this.callDepth >= this.maxCallDepth) {
      throw runtimeError(at, `Too much recursion: more than ${this.maxCallDepth} calls deep`);
    }
    const scope = new Environment(callee.closure);
    params.forEach((param, i) => scope.define(param, args[i], false));
    this.callDepth++;
    try {
      this.executeBlock(body, scope);
      return null;
    } catch (signal) {
      if (signal instanceof BackSignal) return signal.value;
      throw signal;
    } finally {
      this.callDepth--;
    }
  }
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}
