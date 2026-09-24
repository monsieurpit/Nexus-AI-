import type {
  Expr, FunctionDef, KindMember, MapEntry, MatchArm, Param, PatternItem, Spread, Stmt, Target, WhenBranch,
} from "./ast";
import { HABIT_HINTS, PitError, syntaxError } from "./errors";
import { Lexer } from "./lexer";
import { describeToken, isKeyword, type Interpolation, type Token, type TokenType } from "./token";

const ASSIGN_OPS: TokenType[] = ["=", "+=", "-=", "*=", "/=", "%=", "**="];

/** What kind of code the parser is inside, to check where `back`, `give`, `me`... are allowed. */
interface Context {
  type: "top" | "function" | "field";
  fn: FunctionDef | null;
  /** `me` is allowed (inside a kind's methods, fields and the functions nested in them). */
  inKind: boolean;
  /** `up` is allowed (directly inside a method of a kind that has a parent). */
  upAllowed: boolean;
  loopDepth: number;
}

/** Recursive-descent parser: tokens → list of statements. */
export class Parser {
  private current = 0;
  private blockDepth = 0;
  /** While parsing `match` patterns, `x => ...` must not be read as a function. */
  private noLambda = false;
  private ctx: Context = { type: "top", fn: null, inKind: false, upAllowed: false, loopDepth: 0 };

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
  parseStandaloneExpression(ctx?: Context): Expr {
    if (ctx) this.ctx = ctx;
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
        return this.pitDeclaration(false);
      case "say":
        return this.sayStatement();
      case "when":
        return this.whenStatement();
      case "loop":
        return this.loopStatement();
      case "back":
        return this.backStatement();
      case "give":
        return this.giveStatement();
      case "stop":
      case "skip":
        return this.jumpStatement();
      case "raise": {
        const keyword = this.advance();
        const value = this.expression();
        this.endStatement();
        return { kind: "Raise", keyword, value };
      }
      case "attempt":
        return this.attemptStatement();
      case "match":
        return this.matchStatement();
      case "kind":
        return this.kindDeclaration(false);
      case "use":
        return this.useStatement();
      case "share":
        return this.shareStatement();
      case "{":
        return { kind: "Block", body: this.block("") };
      case "orwhen":
      case "other":
        throw this.error(t, `'${t.type}' must come right after the '}' of a 'when' block`);
      case "rescue":
      case "always":
        throw this.error(t, `'${t.type}' must come right after the '}' of an 'attempt' block`);
    }
    if (this.isFunctionDeclarationStart()) return this.functionDeclaration(false);
    return this.expressionStatement();
  }

  private isFunctionDeclarationStart(): boolean {
    return this.check("IDENT") && this.peekAt(1).type === "(" && !this.peekAt(1).newlineBefore
      && this.arrowAfterParens(this.current + 1);
  }

  private pitDeclaration(shared: boolean): Stmt {
    const keyword = this.advance();
    const locked = keyword.type === "lock";
    const target = this.target(keyword);
    let init: Expr | null = null;
    if (this.match("=")) {
      init = this.expression();
    } else if (target.kind !== "Name") {
      throw this.error(this.peek(), "Unpacking needs a value, like: pit [a, b] = list");
    } else if (locked) {
      throw this.error(this.peek(), `'lock ${target.name.lexeme}' needs a value, like: lock ${target.name.lexeme} = 10`);
    }
    this.endStatement(init ?? undefined);
    return { kind: "Pit", target, init, locked, shared, token: keyword };
  }

  /** A name, `[a, b, ...rest]` or `{name, age: years}` after `pit`/`lock`. */
  private target(keyword: Token): Target {
    if (this.check("[")) {
      const token = this.advance();
      const items: PatternItem[] = [];
      let rest: Token | null = null;
      while (!this.check("]")) {
        if (this.match("...")) {
          rest = this.identifier("Expected a name after '...'");
          break;
        }
        items.push(this.patternItem(this.identifier("Expected a name to unpack into")));
        if (!this.match(",")) break;
      }
      this.consume("]", "Expected ']' to close the list pattern");
      return { kind: "ListPattern", items, rest, token };
    }
    if (this.check("{")) {
      const token = this.advance();
      const entries: { key: string; item: PatternItem }[] = [];
      let rest: Token | null = null;
      while (!this.check("}")) {
        if (this.match("...")) {
          rest = this.identifier("Expected a name after '...'");
          break;
        }
        const keyToken = this.peek();
        if (keyToken.type === "STRING") {
          this.advance();
          const key = this.plainString(keyToken);
          this.consume(":", `Expected ':' after "${key}", like: {"${key}": name}`);
          entries.push({ key, item: this.patternItem(this.identifier("Expected a name to unpack into")) });
        } else {
          const name = this.identifier("Expected a key name to unpack");
          if (this.match(":")) {
            entries.push({ key: name.lexeme, item: this.patternItem(this.identifier("Expected a name after ':'")) });
          } else {
            entries.push({ key: name.lexeme, item: this.patternItem(name) });
          }
        }
        if (!this.match(",")) break;
      }
      this.consume("}", "Expected '}' to close the map pattern");
      return { kind: "MapPattern", entries, rest, token };
    }
    const name = this.identifier(`Expected a name after '${keyword.type}', like: ${keyword.type} speed = 10`);
    return { kind: "Name", name };
  }

  private patternItem(name: Token): PatternItem {
    return { name, default: this.match("=") ? this.expression() : null };
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
    const keyword = this.advance();
    if (this.check("{")) return { kind: "LoopForever", body: this.loopBody("'loop'") };

    const isAwait = this.check("wait") && this.peekAt(1).type === "IDENT"
      && (this.peekAt(2).type === "in" || this.peekAt(2).type === ",");
    if (isAwait) {
      this.advance();
      this.markAsync(keyword);
    }
    // `loop [a, b] in pairs` and `loop {name, age} in people` unpack each item.
    if (this.check("[") || this.check("{")) {
      const pattern = this.target(keyword);
      this.consume("in", "Expected 'in' after the pattern, like: loop [a, b] in pairs");
      const iterable = this.expression();
      return { kind: "LoopEach", names: [], pattern, iterable, body: this.loopBody("the list to loop over"), isAwait, token: keyword };
    }
    const isEach = this.check("IDENT") && (this.peekAt(1).type === "in" || this.peekAt(1).type === ",");
    if (isEach || isAwait) {
      const names = [this.identifier("Expected a name for each item")];
      if (this.match(",")) names.push(this.identifier("Expected a second name, like: loop item, index in list"));
      if (names.length === 2 && names[0].lexeme === names[1].lexeme) {
        throw this.error(names[1], `'${names[1].lexeme}' is used twice`);
      }
      this.consume("in", "Expected 'in', like: loop item in list");
      const iterable = this.expression();
      return { kind: "LoopEach", names, pattern: null, iterable, body: this.loopBody("the list to loop over"), isAwait, token: keyword };
    }
    const cond = this.expression();
    return { kind: "LoopWhile", cond, body: this.loopBody("the loop condition") };
  }

  private loopBody(after: string): Stmt[] {
    this.ctx.loopDepth++;
    try {
      return this.block(after);
    } finally {
      this.ctx.loopDepth--;
    }
  }

  private backStatement(): Stmt {
    const keyword = this.advance();
    if (this.ctx.type !== "function") throw this.error(keyword, "'back' can only be used inside a function");
    const value = this.atStatementEnd() ? null : this.expression();
    this.endStatement();
    return { kind: "Back", keyword, value };
  }

  private giveStatement(): Stmt {
    const keyword = this.advance();
    if (this.ctx.type !== "function" || !this.ctx.fn) {
      throw this.error(keyword, "'give' can only be used inside a function");
    }
    this.ctx.fn.isGenerator = true;
    const value = this.atStatementEnd() ? null : this.expression();
    this.endStatement();
    return { kind: "Give", keyword, value };
  }

  private jumpStatement(): Stmt {
    const keyword = this.advance();
    if (this.ctx.loopDepth === 0) throw this.error(keyword, `'${keyword.type}' can only be used inside a loop`);
    this.endStatement();
    return keyword.type === "stop" ? { kind: "Stop", keyword } : { kind: "Skip", keyword };
  }

  private attemptStatement(): Stmt {
    this.advance();
    const body = this.block("'attempt'");
    let errorName: Token | null = null;
    let rescue: Stmt[] | null = null;
    let always: Stmt[] | null = null;
    if (this.match("rescue")) {
      if (this.check("IDENT")) errorName = this.advance();
      rescue = this.block(errorName ? `'rescue ${errorName.lexeme}'` : "'rescue'");
    }
    if (this.match("always")) always = this.block("'always'");
    if (!rescue && !always) {
      throw this.error(this.peek(), "An 'attempt' block needs a 'rescue' or 'always' block after it");
    }
    return { kind: "Attempt", body, errorName, rescue, always };
  }

  private matchStatement(): Stmt {
    const token = this.advance();
    const subject = this.expression();
    const arms = this.matchArms<Stmt>(() => (this.check("{") ? { kind: "Block", body: this.block("'=>'") } : this.statement()));
    return { kind: "MatchStmt", subject, arms, token };
  }

  private matchArms<Body>(body: () => Body): MatchArm<Body>[] {
    const open = this.consume("{", "Expected '{' after the value to match");
    const arms: MatchArm<Body>[] = [];
    while (!this.check("}")) {
      if (this.check("EOF")) throw this.error(open, "This '{' is never closed. Add a matching '}'");
      if (this.match(";")) continue;
      const token = this.peek();
      let patterns: Expr[] | null = null;
      if (this.match("other")) {
        if (arms.some((a) => a.patterns === null)) throw this.error(token, "This match already has an 'other' arm");
      } else {
        patterns = [];
        const saved = this.noLambda;
        this.noLambda = true;
        try {
          do patterns.push(this.expression());
          while (this.match(","));
        } finally {
          this.noLambda = saved;
        }
      }
      this.consume("=>", "Expected '=>' after the pattern, like: 1 => say \"one\"");
      arms.push({ patterns, body: body(), token });
    }
    this.advance(); // }
    const otherIndex = arms.findIndex((a) => a.patterns === null);
    if (otherIndex >= 0 && otherIndex !== arms.length - 1) {
      throw this.error(arms[otherIndex + 1].token, "This arm comes after 'other', so it can never match");
    }
    return arms;
  }

  private kindDeclaration(shared: boolean): Stmt {
    this.advance();
    const name = this.identifier("Expected a name after 'kind', like: kind Dog { ... }");
    const parent = this.matchWord("from") ? this.postfix() : null;
    const open = this.consume("{", `Expected '{' to start the body of kind ${name.lexeme}`);
    const members: KindMember[] = [];
    const seen = new Set<string>();
    while (!this.check("}")) {
      if (this.check("EOF")) throw this.error(open, "This '{' is never closed. Add a matching '}'");
      if (this.match(";")) continue;
      const member = this.kindMember(parent !== null);
      const key = `${member.shared ? "shared " : ""}${member.kind === "Method" && member.accessor ? member.accessor + " " : ""}${member.name.lexeme}`;
      if (seen.has(key)) throw this.error(member.name, `'${member.name.lexeme}' is defined twice in kind ${name.lexeme}`);
      seen.add(key);
      members.push(member);
    }
    this.advance(); // }
    return { kind: "Kind", name, parent, members, shared };
  }

  private kindMember(hasParent: boolean): KindMember {
    let shared = false;
    const afterShared = this.peekAt(1).type;
    if (this.checkWord("shared") && (afterShared === "IDENT" || afterShared === "pit" || afterShared === "lock")) {
      this.advance();
      shared = true;
    }
    // `shared count = 0` is a shared field without needing `pit`.
    const bareSharedField = shared && this.check("IDENT") && this.peekAt(1).type === "=";
    if (this.check("pit") || this.check("lock") || bareSharedField) {
      const keyword = bareSharedField ? this.peek() : this.advance();
      const name = this.identifier("Expected a field name");
      if (name.lexeme === "constructor") throw this.error(name, "'constructor' can't be used as a field name");
      let init: Expr | null = null;
      if (this.match("=")) init = this.withContext({ type: "field", fn: null, inKind: !shared, upAllowed: false, loopDepth: 0 }, () => this.expression());
      else if (keyword.type === "lock") throw this.error(this.peek(), `'lock ${name.lexeme}' needs a value`);
      this.endStatement();
      return { kind: "Field", name, init, shared, locked: keyword.type === "lock" };
    }
    let accessor: "get" | "set" | null = null;
    if ((this.checkWord("get") || this.checkWord("set")) && this.peekAt(1).type === "IDENT") {
      accessor = this.advance().lexeme as "get" | "set";
    }
    if (!(this.check("IDENT") && this.peekAt(1).type === "(")) {
      throw this.error(this.peek(), "Inside a kind, write methods like: name() => ... or fields like: pit count = 0");
    }
    const name = this.advance();
    if (name.lexeme === "init" && (shared || accessor)) throw this.error(name, "'init' can't be shared or a get/set");
    if (name.lexeme === "constructor") throw this.error(name, "Use 'init' to set up a new instance");
    const { fn, expressionBody } = this.functionRest(name.lexeme, name, {
      inKind: !shared, upAllowed: !shared && hasParent,
    });
    if (accessor === "get" && fn.params.length > 0) throw this.error(name, `'get ${name.lexeme}' can't take parameters`);
    if (accessor === "set" && fn.params.length !== 1) throw this.error(name, `'set ${name.lexeme}' needs exactly one parameter`);
    if (expressionBody) this.endStatement();
    return { kind: "Method", name, fn, shared, accessor };
  }

  private useStatement(): Stmt {
    const token = this.advance();
    this.requireTopLevel(token, "'use'");
    let alias: Token | null = null;
    let names: { name: string; as: Token }[] | null = null;
    if (this.check("{")) {
      this.advance();
      names = [];
      while (!this.check("}")) {
        const name = this.identifier("Expected a name to use");
        const as = this.matchWord("as") ? this.identifier("Expected a new name after 'as'") : name;
        names.push({ name: name.lexeme, as });
        if (!this.match(",")) break;
      }
      this.consume("}", "Expected '}' after the names");
      this.consumeWord("from", "Expected 'from', like: use { add } from \"./tools.pit\"");
    } else if (this.check("IDENT")) {
      alias = this.advance();
      this.consumeWord("from", `Expected 'from', like: use ${alias.lexeme} from "./${alias.lexeme}.pit"`);
    }
    const pathToken = this.consume("STRING", "Expected the file to use, like: \"./tools.pit\"");
    const path = this.plainString(pathToken);
    this.endStatement();
    return { kind: "Use", path, alias, names, token };
  }

  private shareStatement(): Stmt {
    const token = this.advance();
    this.requireTopLevel(token, "'share'");
    if (this.check("pit") || this.check("lock")) return this.pitDeclaration(true);
    if (this.check("kind")) return this.kindDeclaration(true);
    if (this.isFunctionDeclarationStart()) return this.functionDeclaration(true);
    throw this.error(this.peek(), "Expected pit, lock, kind or a function after 'share'");
  }

  private requireTopLevel(token: Token, what: string): void {
    if (this.ctx.type !== "top" || this.blockDepth > 0) {
      throw this.error(token, `${what} can only be used at the top of a file, not inside a block or function`);
    }
  }

  private functionDeclaration(shared: boolean): Stmt {
    const name = this.advance();
    const { fn, expressionBody } = this.functionRest(name.lexeme, name, {
      inKind: this.ctx.inKind, upAllowed: false,
    });
    if (expressionBody) this.endStatement();
    return { kind: "Func", name, fn, shared };
  }

  /** Parses `(params) => body` (or `name => body` when `single` is given). */
  private functionRest(
    name: string | null,
    token: Token,
    options: { inKind: boolean; upAllowed: boolean },
    single?: Token,
  ): { fn: FunctionDef; expressionBody: boolean } {
    const params: Param[] = [];
    if (single) {
      params.push({ name: single, default: null, rest: false });
    } else {
      this.consume("(", "Expected '(' to start the parameter list");
      let sawDefault = false;
      while (!this.check(")")) {
        const rest = this.match("...");
        const param = this.identifier("Expected a parameter name");
        if (params.some((p) => p.name.lexeme === param.lexeme)) {
          throw this.error(param, `Parameter '${param.lexeme}' is listed twice`);
        }
        const def = !rest && this.match("=") ? this.expression() : null;
        if (def) sawDefault = true;
        else if (sawDefault && !rest) throw this.error(param, "Parameters with default values must come last");
        params.push({ name: param, default: def, rest });
        if (rest) {
          if (!this.check(")")) throw this.error(this.peek(), "'...rest' must be the last parameter");
          break;
        }
        if (!this.match(",")) break;
      }
      this.consume(")", "Expected ')' after the parameters");
    }
    this.consume("=>", "Expected '=>' after the parameters");

    const fn: FunctionDef = { name, params, body: [], token, isGenerator: false, isAsync: false };
    const expressionBody = !this.check("{");
    this.withContext({ type: "function", fn, inKind: options.inKind, upAllowed: options.upAllowed, loopDepth: 0 }, () => {
      if (expressionBody) {
        const value = this.expression();
        fn.body = [{ kind: "Back", keyword: token, value }];
      } else {
        fn.body = this.block("'=>'");
      }
    });
    return { fn, expressionBody };
  }

  private withContext<T>(ctx: Context, run: () => T): T {
    const saved = this.ctx;
    const savedDepth = this.blockDepth;
    this.ctx = ctx;
    this.blockDepth = 0;
    try {
      return run();
    } finally {
      this.ctx = saved;
      this.blockDepth = savedDepth;
    }
  }

  private expressionStatement(): Stmt {
    const expr = this.expression();
    const next = this.peek();
    if (ASSIGN_OPS.includes(next.type) || ((next.type === "++" || next.type === "--") && !next.newlineBefore)) {
      const op = this.advance();
      this.checkAssignable(expr, op);
      const value: Expr = op.type === "++" || op.type === "--" ? { kind: "Literal", value: 1 } : this.expression();
      this.endStatement();
      return { kind: "Assign", target: expr, op, value };
    }
    this.endStatement(expr);
    return { kind: "Expr", expr };
  }

  private checkAssignable(target: Expr, op: Token): void {
    if (target.kind === "Var" || target.kind === "Index") return;
    if (target.kind === "List" && op.type === "=" && target.items.length > 0
        && target.items.every((i) => i.kind === "Var" || (i.kind === "Spread" && i.expr.kind === "Var"))) {
      return;
    }
    if (target.kind === "Member" && !target.optional) return;
    if (target.kind === "Me") throw this.error(op, "You can't replace 'me'. Change its fields instead, like: me.name = ...");
    throw this.error(op, "You can only assign to a variable, a field (a.b), an item (a[i]) or a list of names ([a, b])");
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
    this.blockDepth++;
    try {
      while (!this.check("}")) {
        if (this.check("EOF")) throw this.error(open, "This '{' is never closed. Add a matching '}'");
        if (this.match(";")) continue;
        body.push(this.statement());
      }
    } finally {
      this.blockDepth--;
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
    return this.ternary();
  }

  private ternary(): Expr {
    const cond = this.nullish();
    if (!this.check("?")) return cond;
    this.advance();
    const then = this.ternary();
    this.consume(":", "Expected ':' in 'condition ? yes : no'");
    const otherwise = this.ternary();
    return { kind: "Ternary", cond, then, otherwise };
  }

  private nullish(): Expr {
    let expr = this.or();
    while (this.check("??")) {
      const op = this.advance();
      expr = { kind: "Logical", left: expr, op, right: this.or() };
    }
    return expr;
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
    let expr = this.comparison();
    for (;;) {
      if (this.check("==") || this.check("!=")) {
        const op = this.advance();
        expr = { kind: "Binary", left: expr, op, right: this.comparison() };
      } else if (this.check("is")) {
        const op = this.advance();
        const negate = this.match("not");
        expr = { kind: "Binary", left: expr, op, right: this.comparison(), negate };
      } else {
        return expr;
      }
    }
  }

  private comparison(): Expr {
    let expr = this.range();
    for (;;) {
      const t = this.peek();
      if (t.type === "<" || t.type === "<=" || t.type === ">" || t.type === ">=") {
        this.advance();
        expr = { kind: "Binary", left: expr, op: t, right: this.range() };
      } else if (t.type === "in") {
        this.advance();
        expr = { kind: "Binary", left: expr, op: t, right: this.range() };
      } else if (t.type === "not" && this.peekAt(1).type === "in" && !t.newlineBefore) {
        this.advance();
        const op = this.advance();
        expr = { kind: "Binary", left: expr, op, right: this.range(), negate: true };
      } else {
        return expr;
      }
    }
  }

  private range(): Expr {
    const from = this.bitOr();
    if (!this.check("..") && !this.check("..=")) return from;
    const dots = this.advance();
    const to = this.bitOr();
    const step = this.matchWord("by") ? this.bitOr() : null;
    return { kind: "Range", from, to, inclusive: dots.type === "..=", step, dots };
  }

  private bitOr(): Expr {
    return this.binaryLevel(["|"], () => this.bitXor());
  }

  private bitXor(): Expr {
    return this.binaryLevel(["^"], () => this.bitAnd());
  }

  private bitAnd(): Expr {
    return this.binaryLevel(["&"], () => this.shift());
  }

  private shift(): Expr {
    return this.binaryLevel(["<<", ">>"], () => this.term());
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
    while (ops.includes(this.peek().type) && !(this.peek().newlineBefore && (this.check("+") || this.check("-")))) {
      const op = this.advance();
      expr = { kind: "Binary", left: expr, op, right: next() };
    }
    return expr;
  }

  private unary(): Expr {
    if (this.check("not") || this.check("-") || this.check("~")) {
      const op = this.advance();
      return { kind: "Unary", op, right: this.unary() };
    }
    if (this.check("wait")) {
      const token = this.advance();
      this.markAsync(token);
      return { kind: "Wait", expr: this.unary(), token };
    }
    return this.power();
  }

  private power(): Expr {
    const base = this.postfix();
    if (!this.check("**")) return base;
    const op = this.advance();
    return { kind: "Binary", left: base, op, right: this.unary() };
  }

  private markAsync(token: Token): void {
    if (this.ctx.type === "field") throw this.error(token, "'wait' can't be used in a field's starting value");
    if (this.ctx.fn) this.ctx.fn.isAsync = true;
  }

  private postfix(): Expr {
    let expr = this.primary();
    for (;;) {
      const t = this.peek();
      if (t.type === "(" && !t.newlineBefore) {
        this.advance();
        expr = { kind: "Call", callee: expr, paren: t, args: this.arguments() };
      } else if (t.type === "[" && !t.newlineBefore) {
        this.advance();
        const index = this.expression();
        this.consume("]", "Expected ']' after the index");
        expr = { kind: "Index", object: expr, index, bracket: t };
      } else if (t.type === "." || t.type === "?.") {
        this.advance();
        const name = this.memberName();
        expr = { kind: "Member", object: expr, name: name.lexeme, token: name, optional: t.type === "?." };
      } else {
        return expr;
      }
    }
  }

  /** A name after `.`; keywords are allowed here (`map.kind`, `list.in`...). */
  private memberName(): Token {
    const t = this.peek();
    if (t.type === "IDENT" || isKeyword(t.type)) return this.advance();
    throw this.error(t, `Expected a name after '.', but found ${describeToken(t)}`);
  }

  private arguments(): (Expr | Spread)[] {
    const args: (Expr | Spread)[] = [];
    while (!this.check(")")) {
      args.push(this.spreadOr());
      if (!this.match(",")) break;
    }
    this.consume(")", "Expected ')' after the arguments");
    return args;
  }

  private spreadOr(): Expr | Spread {
    if (this.check("...")) {
      const token = this.advance();
      return { kind: "Spread", expr: this.expression(), token };
    }
    return this.expression();
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
        if (this.check("=>") && !this.noLambda) {
          return { kind: "Lambda", fn: this.functionRest(null, t, this.lambdaOptions(), t).fn };
        }
        return { kind: "Var", name: t };
      case "me":
        this.advance();
        if (!this.ctx.inKind) throw this.error(t, "'me' can only be used inside a kind's methods");
        return { kind: "Me", token: t };
      case "up": {
        this.advance();
        if (!this.ctx.upAllowed) {
          throw this.error(t, "'up' can only be used directly inside a method of a kind that comes 'from' another kind");
        }
        this.consume(".", "Expected '.' after 'up', like: up.init(name)");
        const name = this.memberName();
        return { kind: "Up", name: name.lexeme, token: name };
      }
      case "(":
        if (!this.noLambda && this.arrowAfterParens(this.current)) {
          return { kind: "Lambda", fn: this.functionRest(null, t, this.lambdaOptions()).fn };
        }
        this.advance();
        {
          const saved = this.noLambda;
          this.noLambda = false;
          const expr = this.expression();
          this.noLambda = saved;
          this.consume(")", "Expected ')' to close the '('");
          return expr;
        }
      case "[":
        return this.listLiteral();
      case "{":
        return this.mapLiteral();
      case "match": {
        this.advance();
        const subject = this.expression();
        const saved = this.noLambda;
        this.noLambda = false;
        const arms = this.matchArms<Expr>(() => {
          if (this.check("{")) throw this.error(this.peek(), "When match gives a value, each arm needs a value, not a block");
          const value = this.expression();
          if (!this.atStatementEnd() && !this.check(",")) {
            throw this.error(this.peek(), "Put each match arm on its own line");
          }
          this.match(",");
          return value;
        });
        this.noLambda = saved;
        return { kind: "Match", subject, arms, token: t };
      }
      case "say":
        this.advance();
        return { kind: "SayExpr", value: this.expression() };
    }
    if (t.type !== "EOF" && isKeyword(t.type)) {
      throw this.error(t, `'${t.lexeme}' is a PitCode keyword and can't be used as a value here`);
    }
    throw this.error(t, `Expected a value but found ${describeToken(t)}`);
  }

  private lambdaOptions() {
    return { inKind: this.ctx.inKind, upAllowed: false };
  }

  private listLiteral(): Expr {
    const open = this.advance();
    const items: (Expr | Spread)[] = [];
    const saved = this.noLambda;
    this.noLambda = false;
    while (!this.check("]")) {
      if (this.check("EOF")) throw this.error(open, "This '[' is never closed. Add a matching ']'");
      items.push(this.spreadOr());
      if (this.match(",")) continue;
      if (!this.check("]") && !this.peek().newlineBefore) {
        throw this.error(this.peek(), "Expected ',' or ']' in the list");
      }
    }
    this.noLambda = saved;
    this.advance(); // ]
    return { kind: "List", items };
  }

  private mapLiteral(): Expr {
    const open = this.advance();
    const entries: MapEntry[] = [];
    const saved = this.noLambda;
    this.noLambda = false;
    while (!this.check("}")) {
      if (this.check("EOF")) throw this.error(open, "This '{' is never closed. Add a matching '}'");
      entries.push(this.mapEntry());
      if (this.match(",")) continue;
      if (!this.check("}") && !this.peek().newlineBefore) {
        throw this.error(this.peek(), "Expected ',' or '}' in the map");
      }
    }
    this.noLambda = saved;
    this.advance(); // }
    return { kind: "Map", entries, token: open };
  }

  private mapEntry(): MapEntry {
    const t = this.peek();
    if (t.type === "...") {
      this.advance();
      return { kind: "Spread", expr: this.expression(), token: t };
    }
    if (t.type === "[") {
      this.advance();
      const key = this.expression();
      this.consume("]", "Expected ']' after the key");
      this.consume(":", "Expected ':' after the key");
      return { kind: "Computed", key, value: this.expression() };
    }
    if (t.type === "IDENT" && this.peekAt(1).type === "(" && this.arrowAfterParens(this.current + 1)) {
      this.advance();
      return { kind: "Entry", key: t.lexeme, value: { kind: "Lambda", fn: this.functionRest(t.lexeme, t, this.lambdaOptions()).fn } };
    }
    let key: string;
    if (t.type === "STRING") key = this.plainString(t);
    else if (t.type === "NUMBER") key = String(t.value);
    else if (t.type === "IDENT" || isKeyword(t.type)) key = t.lexeme;
    else throw this.error(t, `Expected a key but found ${describeToken(t)}`);
    this.advance();
    if (!this.match(":")) {
      if (t.type !== "IDENT") throw this.error(this.peek(), `Expected ':' after the key ${key}`);
      return { kind: "Entry", key, value: { kind: "Var", name: t } };
    }
    return { kind: "Entry", key, value: this.expression() };
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
        return new Parser(tokens).parseStandaloneExpression(this.ctx);
      }),
    };
  }

  /** The text of a string token that must not contain `{...}`. */
  private plainString(t: Token): string {
    const parts = t.value as (string | Interpolation)[];
    if (!parts.every((p) => typeof p === "string")) throw this.error(t, "This text can't contain {...}");
    return parts.join("");
  }

  // ---------- helpers ----------

  /** True when the `(` at index `i` has a matching `)` followed by `=>`. */
  private arrowAfterParens(i: number): boolean {
    let depth = 0;
    for (let j = i; j < this.tokens.length; j++) {
      const type = this.tokens[j].type;
      if (type === "(" || type === "[" || type === "{") depth++;
      else if (type === ")" || type === "]" || type === "}") {
        if (--depth === 0) return type === ")" && this.tokens[j + 1]?.type === "=>";
      } else if (type === "EOF") return false;
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

  /** Contextual words like `by`, `as`, `get`, `set`, `shared` are plain names elsewhere. */
  private checkWord(word: string): boolean {
    return this.check("IDENT") && this.peek().lexeme === word;
  }

  private consumeWord(word: string, message: string): Token {
    if (this.checkWord(word)) return this.advance();
    throw this.error(this.peek(), `${message}, but found ${describeToken(this.peek())}`);
  }

  private matchWord(word: string): boolean {
    if (!this.checkWord(word)) return false;
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
