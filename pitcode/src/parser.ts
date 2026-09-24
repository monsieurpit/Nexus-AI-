import type { Expr, FunctionDef, Stmt, WhenBranch } from "./ast";
import { HABIT_HINTS, PitError, syntaxError } from "./errors";
import { Lexer } from "./lexer";
import { describeToken, isKeyword, type Interpolation, type Token, type TokenType } from "./token";

const ASSIGN_OPS: TokenType[] = ["=", "+=", "-=", "*=", "/="];

/** Recursive-descent parser: tokens → list of statements. */
export class Parser {
  private current = 0;
  private loopDepth = 0;
  private funcDepth = 0;

  constructor(private readonly tokens: Token[]) {}

  parseProgram(): Stmt[] {
    const program: Stmt[] = [];
    while (!this.check("EOF")) {
      if (this.match(";")) continue;
      program.push(this.statement());
    }
    return program;
  }

  /** Parses a single expression that must use every token (used for `{...}` in text). */
  parseStandaloneExpression(): Expr {
    const expr = this.expression();
    if (!this.check("EOF")) {
      throw this.error(this.peek(), `Unexpected ${describeToken(this.peek())} inside {}`);
    }
    return expr;
  }

  // ---------- statements ----------

  private statement(): Stmt {
    const t = this.peek();
    switch (t.type) {
      case "pit":
      case "lock":
        return this.pitDeclaration();
      case "say":
        return this.sayStatement();
      case "when":
        return this.whenStatement();
      case "loop":
        return this.loopStatement();
      case "back":
        return this.backStatement();
      case "stop":
      case "skip":
        return this.jumpStatement();
      case "{":
        return { kind: "Block", body: this.block("") };
      case "orwhen":
      case "other":
        throw this.error(t, `'${t.type}' must come right after the '}' of a 'when' block`);
    }
    if (t.type === "IDENT" && this.peekAt(1).type === "(" && !this.peekAt(1).newlineBefore
        && this.arrowAfterParens(this.current + 1)) {
      return this.functionDeclaration();
    }
    return this.expressionStatement();
  }

  private pitDeclaration(): Stmt {
    const keyword = this.advance();
    const locked = keyword.type === "lock";
    const name = this.identifier(`Expected a name after '${keyword.type}', like: ${keyword.type} speed = 10`);
    let init: Expr | null = null;
    if (this.match("=")) {
      init = this.expression();
    } else if (locked) {
      throw this.error(this.peek(), `'lock ${name.lexeme}' needs a value, like: lock ${name.lexeme} = 10`);
    }
    this.endStatement();
    return { kind: "Pit", name, init, locked };
  }

  private sayStatement(): Stmt {
    this.advance();
    const values: Expr[] = [];
    if (!this.atStatementEnd()) {
      do values.push(this.expression());
      while (this.match(","));
    }
    this.endStatement();
    return { kind: "Say", values };
  }

  private whenStatement(): Stmt {
    this.advance();
    const branches: WhenBranch[] = [
      { cond: this.expression(), body: this.block("the 'when' condition") },
    ];
    let otherwise: Stmt[] | null = null;
    for (;;) {
      if (this.match("orwhen")) {
        branches.push({ cond: this.expression(), body: this.block("the 'orwhen' condition") });
        continue;
      }
      if (this.match("other")) otherwise = this.block("'other'");
      break;
    }
    return { kind: "When", branches, otherwise };
  }

  private loopStatement(): Stmt {
    this.advance();
    if (this.check("IDENT") && this.peekAt(1).type === "in") {
      const name = this.advance();
      this.advance(); // in
      const from = this.expression();
      const dots = this.consume("..", "Expected '..' in the range, like: loop i in 0..10");
      const to = this.expression();
      return { kind: "LoopRange", name, from, to, dots, body: this.loopBody("the range") };
    }
    // `loop { ... }` repeats forever (until `stop`).
    const cond: Expr = this.check("{")
      ? { kind: "Literal", value: true }
      : this.expression();
    return { kind: "LoopWhile", cond, body: this.loopBody("the loop condition") };
  }

  private loopBody(after: string): Stmt[] {
    this.loopDepth++;
    try {
      return this.block(after);
    } finally {
      this.loopDepth--;
    }
  }

  private backStatement(): Stmt {
    const keyword = this.advance();
    if (this.funcDepth === 0) throw this.error(keyword, "'back' can only be used inside a function");
    const value = this.atStatementEnd() ? null : this.expression();
    this.endStatement();
    return { kind: "Back", keyword, value };
  }

  private jumpStatement(): Stmt {
    const keyword = this.advance();
    if (this.loopDepth === 0) throw this.error(keyword, `'${keyword.type}' can only be used inside a loop`);
    this.endStatement();
    return keyword.type === "stop" ? { kind: "Stop", keyword } : { kind: "Skip", keyword };
  }

  private functionDeclaration(): Stmt {
    const name = this.advance();
    const { fn, expressionBody } = this.functionRest(name.lexeme, name);
    if (expressionBody) this.endStatement();
    return { kind: "Func", name, fn };
  }

  /** Parses `(params) => body`, starting at the `(`. */
  private functionRest(name: string | null, token: Token): { fn: FunctionDef; expressionBody: boolean } {
    this.consume("(", "Expected '(' to start the parameter list");
    const params: Token[] = [];
    if (!this.check(")")) {
      do {
        const param = this.identifier("Expected a parameter name");
        if (params.some((p) => p.lexeme === param.lexeme)) {
          throw this.error(param, `Parameter '${param.lexeme}' is listed twice`);
        }
        params.push(param);
      } while (this.match(","));
    }
    this.consume(")", "Expected ')' after the parameters");
    const arrow = this.consume("=>", "Expected '=>' after the parameters");

    const savedLoopDepth = this.loopDepth;
    this.loopDepth = 0;
    this.funcDepth++;
    try {
      if (this.check("{")) {
        return { fn: { name, params, body: this.block("'=>'"), token }, expressionBody: false };
      }
      const value = this.expression();
      return {
        fn: { name, params, body: [{ kind: "Back", keyword: arrow, value }], token },
        expressionBody: true,
      };
    } finally {
      this.funcDepth--;
      this.loopDepth = savedLoopDepth;
    }
  }

  private expressionStatement(): Stmt {
    const expr = this.expression();
    if (ASSIGN_OPS.includes(this.peek().type)) {
      const op = this.advance();
      if (expr.kind !== "Var") throw this.error(op, "You can only assign to a variable name");
      const value = this.expression();
      this.endStatement();
      return { kind: "Assign", name: expr.name, op, value };
    }
    this.endStatement(expr);
    return { kind: "Expr", expr };
  }

  /** Parses `{ statements }` and returns the statements. */
  private block(after: string): Stmt[] {
    if (!this.check("{")) {
      const next = this.peek();
      if (next.type === "=") throw this.error(next, "Use '==' to compare two values");
      const where = after ? ` after ${after}` : "";
      throw this.error(next, `Expected '{'${where} but found ${describeToken(next)}`);
    }
    const open = this.advance();
    const body: Stmt[] = [];
    while (!this.check("}")) {
      if (this.check("EOF")) {
        throw this.error(open, "This '{' is never closed. Add a matching '}'");
      }
      if (this.match(";")) continue;
      body.push(this.statement());
    }
    this.advance(); // }
    return body;
  }

  private atStatementEnd(): boolean {
    const t = this.peek();
    return t.type === ";" || t.type === "}" || t.type === "EOF" || t.newlineBefore;
  }

  private endStatement(expr?: Expr): void {
    if (this.match(";") || this.atStatementEnd()) return;
    if (expr?.kind === "Var" && HABIT_HINTS[expr.name.lexeme]) {
      throw this.error(expr.name, HABIT_HINTS[expr.name.lexeme]);
    }
    const next = this.peek();
    throw this.error(next, `Unexpected ${describeToken(next)}. Put each statement on its own line or separate them with ';'`);
  }

  // ---------- expressions (lowest to highest precedence) ----------

  private expression(): Expr {
    return this.or();
  }

  private or(): Expr {
    let expr = this.and();
    while (this.check("or")) {
      const op = this.advance();
      expr = { kind: "Logical", left: expr, op, right: this.and() };
    }
    return expr;
  }

  private and(): Expr {
    let expr = this.equality();
    while (this.check("and")) {
      const op = this.advance();
      expr = { kind: "Logical", left: expr, op, right: this.equality() };
    }
    return expr;
  }

  private equality(): Expr {
    return this.binaryLevel(["==", "!="], () => this.comparison());
  }

  private comparison(): Expr {
    return this.binaryLevel(["<", "<=", ">", ">="], () => this.term());
  }

  private term(): Expr {
    return this.binaryLevel(["+", "-"], () => this.factor());
  }

  private factor(): Expr {
    return this.binaryLevel(["*", "/", "%"], () => this.unary());
  }

  private binaryLevel(ops: TokenType[], next: () => Expr): Expr {
    let expr = next();
    // A `+` or `-` at the start of a new line begins a new statement, not a continuation.
    while (ops.includes(this.peek().type) && !this.peek().newlineBefore) {
      const op = this.advance();
      expr = { kind: "Binary", left: expr, op, right: next() };
    }
    return expr;
  }

  private unary(): Expr {
    if (this.check("not") || this.check("-")) {
      const op = this.advance();
      return { kind: "Unary", op, right: this.unary() };
    }
    return this.call();
  }

  private call(): Expr {
    let expr = this.primary();
    while (this.check("(") && !this.peek().newlineBefore) {
      const paren = this.advance();
      const args: Expr[] = [];
      if (!this.check(")")) {
        do args.push(this.expression());
        while (this.match(","));
      }
      this.consume(")", "Expected ')' after the arguments");
      expr = { kind: "Call", callee: expr, paren, args };
    }
    return expr;
  }

  private primary(): Expr {
    const t = this.peek();
    switch (t.type) {
      case "NUMBER":
        this.advance();
        return { kind: "Literal", value: t.value as number };
      case "STRING":
        this.advance();
        return this.stringLiteral(t);
      case "true":
        this.advance();
        return { kind: "Literal", value: true };
      case "false":
        this.advance();
        return { kind: "Literal", value: false };
      case "nil":
        this.advance();
        return { kind: "Literal", value: null };
      case "IDENT":
        this.advance();
        return { kind: "Var", name: t };
      case "(":
        if (this.arrowAfterParens(this.current)) {
          return { kind: "Lambda", fn: this.functionRest(null, t).fn };
        }
        this.advance();
        {
          const expr = this.expression();
          this.consume(")", "Expected ')' to close the '('");
          return expr;
        }
    }
    if (t.type !== "EOF" && isKeyword(t.type)) {
      throw this.error(t, `'${t.lexeme}' is a PitCode keyword and can't be used as a value here`);
    }
    throw this.error(t, `Expected a value but found ${describeToken(t)}`);
  }

  private stringLiteral(t: Token): Expr {
    const parts = t.value as (string | Interpolation)[];
    if (parts.every((p) => typeof p === "string")) {
      return { kind: "Literal", value: parts.join("") };
    }
    return {
      kind: "Interp",
      parts: parts.map((p) => {
        if (typeof p === "string") return p;
        const tokens = new Lexer(p.source, p.line, p.col).tokenize();
        return new Parser(tokens).parseStandaloneExpression();
      }),
    };
  }

  // ---------- helpers ----------

  /** True when the `(` at index `i` has a matching `)` followed by `=>`. */
  private arrowAfterParens(i: number): boolean {
    let depth = 0;
    for (let j = i; j < this.tokens.length; j++) {
      const type = this.tokens[j].type;
      if (type === "(") depth++;
      else if (type === ")" && --depth === 0) return this.tokens[j + 1]?.type === "=>";
      else if (type === "EOF") return false;
    }
    return false;
  }

  private identifier(message: string): Token {
    const t = this.peek();
    if (t.type === "IDENT") return this.advance();
    if (t.type !== "EOF" && isKeyword(t.type)) {
      throw this.error(t, `'${t.lexeme}' is a PitCode keyword and can't be used as a name`);
    }
    throw this.error(t, message);
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw this.error(this.peek(), `${message}, but found ${describeToken(this.peek())}`);
  }

  private match(type: TokenType): boolean {
    if (!this.check(type)) return false;
    this.advance();
    return true;
  }

  private check(type: TokenType): boolean {
    return this.peek().type === type;
  }

  private advance(): Token {
    const t = this.tokens[this.current];
    if (t.type !== "EOF") this.current++;
    return t;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private peekAt(offset: number): Token {
    return this.tokens[Math.min(this.current + offset, this.tokens.length - 1)];
  }

  private error(at: Token, message: string): PitError {
    return syntaxError(at, message);
  }
}
