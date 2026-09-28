"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/web/browser.ts
var browser_exports = {};
__export(browser_exports, {
  check: () => check,
  highlight: () => highlight,
  run: () => run,
  toJs: () => toJs,
  version: () => version
});
module.exports = __toCommonJS(browser_exports);

// src/errors.ts
var PitError = class extends Error {
  constructor(kind, message, line, col, file, source, trace = []) {
    super(message);
    this.kind = kind;
    this.line = line;
    this.col = col;
    this.file = file;
    this.source = source;
    this.trace = trace;
    this.name = kind;
  }
  /** Formats the error with the offending source line and a caret under the problem. */
  format(source = this.source, file = this.file ?? "<input>") {
    let out = `${this.kind}: ${this.message}`;
    if (this.line <= 0) return out;
    out += `
  --> ${file}:${this.line}:${this.col}`;
    const text = source?.split(/\r?\n/)[this.line - 1];
    if (text !== void 0) {
      const num = String(this.line);
      const gutter = " ".repeat(num.length);
      const indent2 = text.slice(0, Math.max(0, this.col - 1)).replace(/[^\t]/g, " ");
      out += `
 ${gutter} |
 ${num} | ${text}
 ${gutter} | ${indent2}^`;
    }
    const shown = this.trace.slice(0, 6);
    for (const t of shown) out += `
  called from ${t.file}:${t.line}:${t.col}`;
    if (this.trace.length > shown.length) out += `
  ... and ${this.trace.length - shown.length} more calls`;
    return out;
  }
};
function syntaxError(at, message) {
  return new PitError("SyntaxError", message, at.line, at.col);
}
function nameError(at, message) {
  return new PitError("NameError", message, at.line, at.col);
}
var HABIT_HINTS = {
  if: "PitCode uses 'when' instead of 'if'",
  else: "PitCode uses 'other' instead of 'else'",
  elif: "PitCode uses 'orwhen' instead of 'else if'",
  while: "PitCode uses 'loop' instead of 'while'",
  for: "PitCode uses 'loop item in list' instead of 'for'",
  let: "PitCode uses 'pit' to create a variable",
  var: "PitCode uses 'pit' to create a variable",
  const: "PitCode uses 'lock' to create a constant",
  return: "PitCode uses 'back' instead of 'return'",
  print: `PitCode uses 'say' to print, like: say "hello"`,
  console: `PitCode uses 'say' to print, like: say "hello"`,
  break: "PitCode uses 'stop' instead of 'break'",
  continue: "PitCode uses 'skip' instead of 'continue'",
  function: "PitCode functions look like: name(params) => { ... }",
  fn: "PitCode functions look like: name(params) => { ... }",
  func: "PitCode functions look like: name(params) => { ... }",
  def: "PitCode functions look like: name(params) => { ... }",
  null: "PitCode uses 'nil' instead of 'null'",
  undefined: "PitCode uses 'nil' instead of 'undefined'",
  class: "PitCode uses 'kind' instead of 'class', like: kind Dog { ... }",
  new: `PitCode doesn't need 'new'. Create things by calling the kind: Dog("Rex")`,
  this: "PitCode uses 'me' instead of 'this'",
  self: "PitCode uses 'me' instead of 'self'",
  super: "PitCode uses 'up' instead of 'super', like: up.init(name)",
  extends: "PitCode uses 'from', like: kind Dog from Animal { ... }",
  try: "PitCode uses 'attempt' instead of 'try'",
  catch: "PitCode uses 'rescue' instead of 'catch'",
  except: "PitCode uses 'rescue' instead of 'except'",
  finally: "PitCode uses 'always' instead of 'finally'",
  throw: "PitCode uses 'raise' instead of 'throw'",
  await: "PitCode uses 'wait' instead of 'await'",
  async: "PitCode doesn't need 'async': a function that uses 'wait' is async by itself",
  yield: "PitCode uses 'give' instead of 'yield'",
  import: `PitCode uses 'use', like: use { add } from "./tools.pit"`,
  require: `PitCode uses 'use', like: use tools from "./tools.pit"`,
  export: "PitCode uses 'share' instead of 'export'",
  switch: "PitCode uses 'match' instead of 'switch'",
  case: `Inside 'match', write each case like: 1 => say "one"`,
  typeof: "PitCode uses type(value) instead of 'typeof'",
  instanceof: "PitCode uses 'is', like: pet is Dog",
  elseif: "PitCode uses 'orwhen' instead of 'else if'",
  True: "PitCode uses 'true' (lowercase)",
  False: "PitCode uses 'false' (lowercase)",
  None: "PitCode uses 'nil' instead of 'None'"
};

// src/token.ts
var KEYWORDS = [
  "pit",
  "lock",
  "back",
  "say",
  "when",
  "orwhen",
  "loop",
  "in",
  "stop",
  "skip",
  "and",
  "or",
  "not",
  "is",
  "true",
  "false",
  "nil",
  "kind",
  "me",
  "up",
  "match",
  "attempt",
  "rescue",
  "always",
  "raise",
  "wait",
  "give",
  "use",
  "share"
];
function isKeyword(word) {
  return KEYWORDS.includes(word);
}
function describeToken(token) {
  switch (token.type) {
    case "EOF":
      return "end of file";
    case "STRING":
      return "text";
    case "NUMBER":
      return `number ${token.lexeme}`;
    default:
      return `'${token.lexeme}'`;
  }
}

// src/lexer.ts
var ESCAPES = {
  n: "\n",
  t: "	",
  r: "\r",
  "0": "\0",
  '"': '"',
  "\\": "\\",
  "{": "{",
  "}": "}"
};
var isDigit = (c) => c >= "0" && c <= "9";
var isHexDigit = (c) => isDigit(c) || c >= "a" && c <= "f" || c >= "A" && c <= "F";
var isAlpha = (c) => c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "_" || c > "\x7F" && new RegExp("\\p{L}", "u").test(c);
var isAlphaNumeric = (c) => isAlpha(c) || isDigit(c);
var OPERATORS = [
  "...",
  "..=",
  "**=",
  "??=",
  "..",
  "?.",
  "??",
  "**",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "++",
  "--",
  "==",
  "!=",
  "<=",
  ">=",
  "<<",
  ">>",
  "=>",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  ",",
  ";",
  ":",
  ".",
  "?",
  "+",
  "-",
  "*",
  "/",
  "%",
  "=",
  "<",
  ">",
  "&",
  "|",
  "^",
  "~"
];
var OPERATOR_HINTS = [
  ["===", "PitCode uses '==' (it is always strict)"],
  ["!==", "PitCode uses '!=' (it is always strict)"],
  ["&&", "PitCode uses 'and' instead of '&&'"],
  ["||", "PitCode uses 'or' instead of '||'"]
];
var Lexer = class {
  /** `line`/`col` let string interpolations report positions inside the original file. */
  constructor(src, line = 1, col = 1) {
    this.src = src;
    this.line = line;
    this.col = col;
  }
  pos = 0;
  start = 0;
  line;
  col;
  startLine = 1;
  startCol = 1;
  newlineBefore = false;
  tokens = [];
  tokenize() {
    for (; ; ) {
      this.skipWhitespaceAndComments();
      if (this.atEnd()) break;
      this.start = this.pos;
      this.startLine = this.line;
      this.startCol = this.col;
      this.scanToken();
    }
    this.tokens.push({ type: "EOF", lexeme: "", line: this.line, col: this.col, newlineBefore: true });
    return this.tokens;
  }
  scanToken() {
    const c = this.peek();
    if (c === '"') {
      this.advance();
      if (this.peek() === '"' && this.peekNext() === '"') {
        this.advance();
        this.advance();
        return this.string(true);
      }
      return this.string(false);
    }
    if (c === "r" && this.peekNext() === '"') {
      this.advance();
      this.advance();
      return this.rawString();
    }
    if (isDigit(c)) return this.number();
    if (isAlpha(c)) return this.identifier();
    if (c === "'") throw this.error('Text uses double quotes in PitCode, like: "hello"');
    if (c === "!" && this.src[this.pos + 1] !== "=") {
      throw this.error("Unexpected '!'. PitCode uses 'not', like: when not done { ... }");
    }
    for (const [text, hint] of OPERATOR_HINTS) {
      if (this.src.startsWith(text, this.pos)) throw this.error(hint);
    }
    for (const op of OPERATORS) {
      if (this.src.startsWith(op, this.pos)) {
        for (let i = 0; i < op.length; i++) this.advance();
        return this.add(op);
      }
    }
    this.advance();
    throw this.error(`Unexpected character '${c}'`);
  }
  number() {
    if (this.peek() === "0" && (this.peekNext() === "x" || this.peekNext() === "b")) {
      const base = this.peekNext() === "x" ? 16 : 2;
      this.advance();
      this.advance();
      const digits = this.digits((ch) => base === 16 ? isHexDigit(ch) : ch === "0" || ch === "1");
      if (!digits) throw this.error(`Expected ${base === 16 ? "hex" : "binary"} digits after '0${base === 16 ? "x" : "b"}'`);
      if (this.peek() === "n" && !isAlphaNumeric(this.peekNext())) {
        this.advance();
        return this.add("NUMBER", BigInt(`0${base === 16 ? "x" : "b"}${digits}`));
      }
      return this.add("NUMBER", Number.parseInt(digits, base));
    }
    let text = this.digits(isDigit);
    if (this.peek() === "n" && !isAlphaNumeric(this.peekNext())) {
      this.advance();
      return this.add("NUMBER", BigInt(text));
    }
    if (this.peek() === "." && isDigit(this.peekNext())) {
      this.advance();
      text += "." + this.digits(isDigit);
    }
    if ((this.peek() === "e" || this.peek() === "E") && (isDigit(this.peekNext()) || (this.peekNext() === "-" || this.peekNext() === "+") && isDigit(this.src[this.pos + 2] ?? ""))) {
      text += this.advance();
      if (this.peek() === "-" || this.peek() === "+") text += this.advance();
      text += this.digits(isDigit);
    }
    if (isAlpha(this.peek())) throw this.error(`A name can't start with a digit: '${text}${this.peek()}...'`);
    this.add("NUMBER", Number(text));
  }
  /** Reads digits, allowing `_` between them as a separator (1_000_000). */
  digits(accept) {
    let out = "";
    while (accept(this.peek()) || this.peek() === "_" && accept(this.peekNext()) && out !== "") {
      const c = this.advance();
      if (c !== "_") out += c;
    }
    return out;
  }
  identifier() {
    while (isAlphaNumeric(this.peek())) this.advance();
    const word = this.src.slice(this.start, this.pos);
    this.add(isKeyword(word) ? word : "IDENT");
  }
  /** `r"..."` or `r"""..."""`: no escapes and no `{...}`, handy for patterns and JSON. */
  rawString() {
    if (this.src.startsWith('""', this.pos)) {
      this.advance();
      this.advance();
      const end = this.src.indexOf('"""', this.pos);
      if (end < 0) throw syntaxError({ line: this.startLine, col: this.startCol }, 'Unterminated text (missing closing """)');
      let text2 = "";
      while (this.pos < end) text2 += this.advance();
      this.advance();
      this.advance();
      this.advance();
      return this.add("STRING", [text2]);
    }
    let text = "";
    for (; ; ) {
      if (this.atEnd() || this.peek() === "\n") {
        throw syntaxError({ line: this.startLine, col: this.startCol }, 'Unterminated text (missing closing ")');
      }
      const c = this.advance();
      if (c === '"') break;
      text += c;
    }
    this.add("STRING", [text]);
  }
  /**
   * Reads a string after its opening quote(s). Triple-quoted strings may span lines;
   * their common indentation and the first/last blank lines are removed.
   */
  string(triple) {
    const indent2 = triple ? this.tripleIndent() : 0;
    const parts = [];
    let text = "";
    let atLineStart = false;
    if (triple && this.lineIsBlankFrom(this.pos)) {
      while (this.peek() !== "\n") this.advance();
      this.advance();
      atLineStart = true;
    }
    for (; ; ) {
      if (atLineStart) {
        for (let i = 0; i < indent2 && (this.peek() === " " || this.peek() === "	"); i++) this.advance();
        atLineStart = false;
      }
      if (this.atEnd() || !triple && this.peek() === "\n") {
        throw syntaxError(
          { line: this.startLine, col: this.startCol },
          triple ? 'Unterminated text (missing closing """)' : 'Unterminated text (missing closing ")'
        );
      }
      if (triple && this.src.startsWith('"""', this.pos)) {
        this.advance();
        this.advance();
        this.advance();
        text = text.replace(/\n[ \t]*$/, "");
        break;
      }
      const c = this.advance();
      if (!triple && c === '"') break;
      if (c === "\n") {
        text += c;
        atLineStart = true;
        continue;
      }
      if (c === "\\") {
        text += this.escape();
        continue;
      }
      if (c === "{") {
        if (text) parts.push(text);
        text = "";
        parts.push(this.interpolation());
        continue;
      }
      text += c;
    }
    if (text || parts.length === 0) parts.push(text);
    this.add("STRING", parts);
  }
  /** The smallest indentation among the non-blank lines of a triple-quoted string. */
  tripleIndent() {
    const end = this.src.indexOf('"""', this.pos);
    if (end < 0) return 0;
    const lines = this.src.slice(this.pos, end).split("\n").slice(1);
    let min = Infinity;
    lines.forEach((line, i) => {
      const isClosingLine = i === lines.length - 1;
      if (line.trim() === "" && !isClosingLine) return;
      const n = line.length - line.trimStart().length;
      min = Math.min(min, n);
    });
    return Number.isFinite(min) ? min : 0;
  }
  lineIsBlankFrom(pos) {
    for (let i = pos; i < this.src.length; i++) {
      const c = this.src[i];
      if (c === "\n") return true;
      if (c !== " " && c !== "	" && c !== "\r") return false;
    }
    return false;
  }
  escape() {
    const at = { line: this.line, col: this.col - 1 };
    if (this.atEnd()) return "";
    const e = this.advance();
    if (e === "u") {
      if (this.peek() !== "{") throw syntaxError(at, "Write unicode escapes like \\u{1F600}");
      this.advance();
      const hex = this.digits(isHexDigit);
      if (this.peek() !== "}" || !hex) throw syntaxError(at, "Write unicode escapes like \\u{1F600}");
      this.advance();
      const code = Number.parseInt(hex, 16);
      if (code > 1114111) throw syntaxError(at, `\\u{${hex}} is not a valid character`);
      return String.fromCodePoint(code);
    }
    if (!(e in ESCAPES)) throw syntaxError(at, `Unknown escape '\\${e}'`);
    return ESCAPES[e];
  }
  /** Reads the expression between `{` (already consumed) and its matching `}`. */
  interpolation() {
    const openLine = this.line;
    const openCol = this.col - 1;
    const begin = this.pos;
    const line = this.line;
    const col = this.col;
    let depth = 1;
    for (; ; ) {
      if (this.atEnd() || this.peek() === "\n") {
        throw syntaxError({ line: openLine, col: openCol }, "Unclosed '{' in text. Write \\{ for a literal brace");
      }
      const c = this.peek();
      if (c === '"') {
        this.skipNestedString();
        continue;
      }
      if (c === "{") depth++;
      if (c === "}" && --depth === 0) break;
      this.advance();
    }
    const source = this.src.slice(begin, this.pos);
    this.advance();
    if (!source.trim()) {
      throw syntaxError({ line: openLine, col: openCol }, "Empty {} in text. Write \\{ for a literal brace");
    }
    return { source, line, col };
  }
  skipNestedString() {
    this.advance();
    while (!this.atEnd() && this.peek() !== '"' && this.peek() !== "\n") {
      if (this.peek() === "\\") this.advance();
      this.advance();
    }
    if (this.peek() === '"') this.advance();
  }
  skipWhitespaceAndComments() {
    while (!this.atEnd()) {
      const c = this.peek();
      if (c === "\n") {
        this.newlineBefore = true;
        this.advance();
      } else if (c === " " || c === "	" || c === "\r" || c === "\uFEFF") {
        this.advance();
      } else if (c === "/" && this.peekNext() === "/") {
        while (!this.atEnd() && this.peek() !== "\n") this.advance();
      } else if (c === "/" && this.peekNext() === "*") {
        const at = { line: this.line, col: this.col };
        this.advance();
        this.advance();
        while (!this.src.startsWith("*/", this.pos)) {
          if (this.atEnd()) throw syntaxError(at, "This comment is never closed. Add */");
          if (this.peek() === "\n") this.newlineBefore = true;
          this.advance();
        }
        this.advance();
        this.advance();
      } else {
        break;
      }
    }
  }
  add(type, value) {
    this.tokens.push({
      type,
      lexeme: this.src.slice(this.start, this.pos),
      value,
      line: this.startLine,
      col: this.startCol,
      newlineBefore: this.newlineBefore
    });
    this.newlineBefore = false;
  }
  advance() {
    const c = this.src[this.pos++];
    if (c === "\n") {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }
    return c;
  }
  peek() {
    return this.src[this.pos] ?? "\0";
  }
  peekNext() {
    return this.src[this.pos + 1] ?? "\0";
  }
  atEnd() {
    return this.pos >= this.src.length;
  }
  error(message) {
    return syntaxError({ line: this.startLine, col: this.startCol }, message);
  }
};

// src/runtime/values.ts
var FN = Symbol("pit.fn");
var KIND = Symbol("pit.kind");
var Base = class {
};
var FILE_UNIT = 2 ** 32;
function makeLoc(fileId, line, col) {
  return fileId * FILE_UNIT + line * 4096 + Math.min(col, 4095);
}
function decodeLoc(loc) {
  const fileId = Math.floor(loc / FILE_UNIT);
  const rest = loc - fileId * FILE_UNIT;
  return { fileId, line: Math.floor(rest / 4096), col: rest % 4096 };
}
var ERR_NAME = Symbol("pit.errorName");
var ERR_LOC = Symbol("pit.errorLoc");
var ERR_TRACE = Symbol("pit.errorTrace");
var ErrorValue = class _ErrorValue extends Base {
  message = "";
  [ERR_NAME];
  [ERR_LOC];
  init(message = "") {
    this.message = str(message);
  }
  /** The kind of error, like "RuntimeError", "Error" or a user kind such as "OutOfAir". */
  get name() {
    return this[ERR_NAME] ?? kindName(this.constructor);
  }
  get line() {
    return this[ERR_LOC] === void 0 ? null : decodeLoc(this[ERR_LOC]).line;
  }
  get column() {
    return this[ERR_LOC] === void 0 ? null : decodeLoc(this[ERR_LOC]).col;
  }
  static create(message, name, loc) {
    const e = new _ErrorValue();
    e.message = message;
    if (name) e[ERR_NAME] = name;
    if (loc !== void 0) e[ERR_LOC] = loc;
    return e;
  }
  static locOf(e) {
    return e[ERR_LOC];
  }
  /** Remembers the call sites that led here (only the first time). */
  static setTrace(e, stack) {
    const self = e;
    if (self[ERR_TRACE] === void 0) self[ERR_TRACE] = stack.slice(-50).reverse();
  }
  static traceOf(e) {
    return e[ERR_TRACE] ?? [];
  }
  static setLoc(e, loc) {
    if (e[ERR_LOC] === void 0) e[ERR_LOC] = loc;
  }
};
ErrorValue[KIND] = "Error";
var PitRange = class {
  constructor(start, end, inclusive, step) {
    this.start = start;
    this.end = end;
    this.inclusive = inclusive;
    this.step = step ?? (start <= end ? 1 : -1);
  }
  step;
  *[Symbol.iterator]() {
    const { start, end, step, inclusive } = this;
    if (step > 0) {
      for (let i = start; inclusive ? i <= end : i < end; i += step) yield i;
    } else {
      for (let i = start; inclusive ? i >= end : i > end; i += step) yield i;
    }
  }
  has(value) {
    if (typeof value !== "number") return false;
    const { start, end, step, inclusive } = this;
    const inside = step > 0 ? value >= start && (inclusive ? value <= end : value < end) : value <= start && (inclusive ? value >= end : value > end);
    return inside && Number.isInteger((value - start) / step);
  }
  get size() {
    const { start, end, step, inclusive } = this;
    const span = (end - start) / step;
    if (span < 0) return 0;
    const whole = Math.floor(span);
    return inclusive || whole !== span ? whole + 1 : whole;
  }
};
function isKind(value) {
  return typeof value === "function" && (value === ErrorValue || value.prototype instanceof Base);
}
function kindName(kind) {
  const k = kind;
  return (typeof kind === "function" && Object.hasOwn(k, KIND) ? k[KIND] : null) ?? "object";
}
function fnMeta(f) {
  return typeof f === "function" ? f[FN] : void 0;
}
function setFnMeta(f, meta) {
  Object.defineProperty(f, FN, { value: meta, configurable: true });
  return f;
}
function isTruthy(value) {
  return value !== null && value !== false && value !== void 0;
}
function isIterator(value) {
  return typeof value.next === "function" && (Symbol.iterator in value || Symbol.asyncIterator in value);
}
function typeName(value) {
  if (value === null || value === void 0) return "nil";
  switch (typeof value) {
    case "number":
      return "number";
    case "bigint":
      return "big";
    case "string":
      return "string";
    case "boolean":
      return "bool";
    case "function":
      return isKind(value) ? "kind" : "function";
  }
  if (Array.isArray(value)) return "list";
  if (value instanceof Map) return "map";
  if (value instanceof Set) return "set";
  if (value instanceof PitRange) return "range";
  if (value instanceof RegExp) return "pattern";
  if (value instanceof Promise) return "promise";
  if (value instanceof Base) return kindName(value.constructor);
  if (isIterator(value)) return "iterator";
  return "object";
}
function formatNumber(n) {
  if (Number.isInteger(n)) return Object.is(n, -0) ? "0" : String(n);
  if (!Number.isFinite(n)) return Number.isNaN(n) ? "NaN" : n > 0 ? "infinity" : "-infinity";
  return String(Number.parseFloat(n.toPrecision(15)));
}
var IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
function str(value) {
  return typeof value === "string" ? value : show(value, /* @__PURE__ */ new Set(), false);
}
function repr(value) {
  return show(value, /* @__PURE__ */ new Set(), true);
}
var hooks = {};
function show(value, seen, quoted) {
  if (value === null || value === void 0) return "nil";
  switch (typeof value) {
    case "string":
      return quoted ? JSON.stringify(value) : value;
    case "number":
      return formatNumber(value);
    case "boolean":
      return String(value);
    case "function":
      return isKind(value) ? `<kind ${kindName(value)}>` : `<function ${fnMeta(value)?.name ?? (value.name || "anonymous")}>`;
    case "bigint":
      return String(value);
    case "symbol":
      return String(value);
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
      const parts = [];
      for (const [k, v] of value) {
        const key = typeof k === "string" && IDENTIFIER.test(k) ? k : show(k, seen, true);
        parts.push(`${key}: ${show(v, seen, true)}`);
      }
      return `{${parts.join(", ")}}`;
    }
    if (value instanceof Set) return `set(${[...value].map((v) => show(v, seen, true)).join(", ")})`;
    if (value instanceof Base) {
      const custom = hooks.showInstance?.(value);
      if (custom !== void 0) return custom;
      const fields = Object.keys(value).map((k) => `${k}: ${show(value[k], seen, true)}`);
      return `${kindName(value.constructor)} {${fields.join(", ")}}`;
    }
    if (isIterator(value)) return "<iterator>";
    return "<object>";
  } finally {
    seen.delete(value);
  }
}
function deepEqual(a, b, seen = /* @__PURE__ */ new Map()) {
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
    return ka.length === kb.length && ka.every((k) => deepEqual(a[k], b[k], seen));
  }
  return false;
}

// src/runtime/core.ts
var callStack = [];
function fail(loc, message) {
  const e = ErrorValue.create(message, "RuntimeError", loc);
  ErrorValue.setTrace(e, callStack);
  throw e;
}
function article(word) {
  return /^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`;
}
function plural(n, word) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}
function findMember(obj, name) {
  if (name === "constructor") return void 0;
  for (let p = Object.getPrototypeOf(obj); p && p !== Base.prototype && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
    const d = Object.getOwnPropertyDescriptor(p, name);
    if (d) return d;
  }
  return void 0;
}
function findStatic(kind, name) {
  if (name === "prototype" || name === "length" || name === "name") return void 0;
  for (let k = kind; k && k !== Base && k !== Function.prototype; k = Object.getPrototypeOf(k)) {
    const d = Object.getOwnPropertyDescriptor(k, name);
    if (d) return d;
  }
  return void 0;
}
function expectation(meta) {
  if (meta.min === meta.max) return plural(meta.min, "argument");
  if (meta.max === Infinity) return `at least ${plural(meta.min, "argument")}`;
  return `${meta.min} to ${meta.max} arguments`;
}
function checkArity(loc, f, count, label) {
  const meta = f[FN];
  if (meta && (count < meta.min || count > meta.max)) {
    fail(loc, `${label ?? meta.name}() expects ${expectation(meta)} but got ${count}`);
  }
}
function construct(loc, kind, args, lenient = false) {
  const obj = new kind();
  const init = findMember(obj, "init");
  if (init && typeof init.value === "function") {
    const meta = init.value[FN];
    if (lenient && meta && args.length > meta.max) args = args.slice(0, meta.max);
    checkArity(loc, init.value, args.length, kindName(kind));
    callStack.push(loc);
    try {
      init.value.apply(obj, args);
    } finally {
      callStack.pop();
    }
  } else if (args.length > 0 && !lenient) {
    fail(loc, `${kindName(kind)}() takes no values because it has no init`);
  }
  return obj;
}
function call(loc, f, args) {
  if (typeof f !== "function") {
    fail(loc, `${article(typeName(f))} is not a function, so it can't be called`);
  }
  if (isKind(f)) return construct(loc, f, args);
  const meta = f[FN];
  if (meta) {
    if (args.length < meta.min || args.length > meta.max) {
      fail(loc, `${meta.name}() expects ${expectation(meta)} but got ${args.length}`);
    }
    if (meta.native) return f(loc, ...args) ?? null;
  }
  callStack.push(loc);
  try {
    return f(...args) ?? null;
  } finally {
    callStack.pop();
  }
}
function invoke(loc, f, args) {
  if (typeof f !== "function") fail(loc, `Expected a function but got ${typeName(f)}`);
  if (isKind(f)) return construct(loc, f, args, true);
  const meta = f[FN];
  if (meta?.native) return f(loc, ...args) ?? null;
  callStack.push(loc);
  try {
    return f(...args) ?? null;
  } finally {
    callStack.pop();
  }
}
function closest(word, candidates) {
  let best = null;
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
function distance(a, b) {
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

// src/compiler.ts
var Scope = class {
  constructor(parent, isRepl = false) {
    this.parent = parent;
    this.isRepl = isRepl;
  }
  names = /* @__PURE__ */ new Map();
  lookup(name) {
    for (let s = this; s; s = s.parent) {
      const b = s.names.get(name);
      if (b) return b;
    }
    return void 0;
  }
  visibleNames() {
    const out = [];
    for (let s = this; s; s = s.parent) out.push(...s.names.keys());
    return out;
  }
};
var COMPOUND = {
  "+=": "+",
  "-=": "-",
  "*=": "*",
  "/=": "/",
  "%=": "%",
  "**=": "**",
  "++": "+",
  "--": "-"
};
var BINARY_HELPERS = {
  "+": "add",
  "-": "sub",
  "*": "mul",
  "/": "div",
  "%": "mod",
  "**": "pow",
  "<": "lt",
  "<=": "le",
  ">": "gt",
  ">=": "ge",
  "&": "band",
  "|": "bor",
  "^": "bxor",
  "<<": "shl",
  ">>": "shr"
};
var BOOL_OPS = /* @__PURE__ */ new Set(["==", "!=", "<", "<=", ">", ">=", "is", "in"]);
var q = (s) => JSON.stringify(s);
var indent = (code) => code.split("\n").map((l) => l ? "  " + l : l).join("\n");
function compile(program, options) {
  return new Compiler(options).program(program);
}
var Compiler = class {
  constructor(options) {
    this.options = options;
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
  uid = 0;
  fn = { temps: [], me: null, inMethod: false };
  scope;
  topScope;
  usedBuiltins = /* @__PURE__ */ new Set();
  exports = [];
  program(program) {
    const repl = this.options.repl;
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
      "})();"
    ].filter((l) => l.trim() !== "").join("\n");
  }
  // ---------- helpers ----------
  loc(t) {
    return String(makeLoc(this.options.fileId, t.line, t.col));
  }
  /** Code inside a kind may use private `_names`; this passes that along to the runtime. */
  inside(name) {
    return name.startsWith("_") && this.fn.me !== null ? ", true" : "";
  }
  guard() {
    return this.options.guardLoops ? "$.tick();\n" : "";
  }
  temp() {
    const name = `$t${++this.uid}`;
    this.fn.temps.push(name);
    return name;
  }
  unique(prefix) {
    return `$${prefix}${++this.uid}`;
  }
  inScope(scope, run2) {
    const saved = this.scope;
    this.scope = scope;
    try {
      return run2();
    } finally {
      this.scope = saved;
    }
  }
  isReplTop() {
    return this.scope === this.topScope && this.topScope.isRepl;
  }
  declare(name, kind, locked) {
    const existing = this.scope.names.get(name.lexeme);
    if (existing && !this.scope.isRepl) {
      throw nameError(name, `'${name.lexeme}' already exists here. To change it, write: ${name.lexeme} = ...`);
    }
    const js = this.scope.isRepl ? `$R[${q(name.lexeme)}]` : `${name.lexeme}$`;
    const binding = { kind, js, locked };
    this.scope.names.set(name.lexeme, binding);
    return binding;
  }
  resolve(name) {
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
  statements(stmts) {
    for (const s of stmts) this.declareStatement(s);
    const funcs = stmts.filter((s) => s.kind === "Func").map((s) => this.statement(s));
    const rest = stmts.filter((s) => s.kind !== "Func").map((s) => this.statement(s));
    return [...funcs, ...rest].join("\n");
  }
  declareStatement(s) {
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
  block(stmts, setup) {
    const scope = new Scope(this.scope);
    setup?.(scope);
    return this.inScope(scope, () => this.statements(stmts));
  }
  statement(s) {
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
        return `{
${indent(this.block(s.body))}
}`;
      case "When": {
        let code = "";
        s.branches.forEach((b, i) => {
          code += `${i === 0 ? "if" : " else if"} (${this.bool(b.cond)}) {
${indent(this.block(b.body))}
}`;
        });
        if (s.otherwise) code += ` else {
${indent(this.block(s.otherwise))}
}`;
        return code;
      }
      case "LoopForever":
        return `${labelOf(s.label)}for (;;) {
${indent(this.guard() + this.block(s.body))}
}`;
      case "LoopUntil":
        return `${labelOf(s.label)}do {
${indent(this.guard() + this.block(s.body))}
} while (!${this.bool(s.cond)});`;
      case "LoopWhile":
        return `${labelOf(s.label)}while (${this.bool(s.cond)}) {
${indent(this.guard() + this.block(s.body))}
}`;
      case "LoopEach":
        return this.loopEach(s);
      case "LoopTimes": {
        const n = this.unique("n");
        const i = this.unique("i");
        return `${labelOf(s.label)}for (let ${i} = 0, ${n} = $.times(${this.loc(s.token)}, ${this.expr(s.count)}); ${i} < ${n}; ${i}++) {
${indent(this.guard() + this.block(s.body))}
}`;
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
        return s.label ? `break ${s.label.lexeme}$loop;` : "break;";
      case "Skip":
        return s.label ? `continue ${s.label.lexeme}$loop;` : "continue;";
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
  exprLoc(e) {
    const t = exprToken(e);
    return t ? this.loc(t) : "$.p";
  }
  /** `rawInit` is JavaScript for the value (used by pattern loops); the names are declared here. */
  pit(s, rawInit) {
    if (rawInit) for (const name of targetNames(s.target)) this.declare(name, "var", false);
    const init = rawInit ?? (s.init ? this.expr(s.init) : "null");
    const decl = this.isReplTop() ? "" : s.locked ? "const " : "let ";
    const names = targetNames(s.target);
    const bindings = names.map((n) => this.scope.lookup(n.lexeme));
    if (s.shared) names.forEach((n, i) => this.exports.push([n.lexeme, bindings[i].js]));
    const at = `$.p = ${this.loc(s.token)}; `;
    const t = s.target;
    if (t.kind === "Name") return `${at}${decl}${bindings[0].js} = ${init};`;
    const item = (i) => `${this.scope.lookup(i.name.lexeme).js} = ${i.default ? this.expr(i.default) : "null"}`;
    if (t.kind === "ListPattern") {
      const parts2 = t.items.map(item);
      if (t.rest) parts2.push(`...${this.scope.lookup(t.rest.lexeme).js}`);
      return `${at}${decl}[${parts2.join(", ")}] = $.ul(${this.loc(t.token)}, ${init});`;
    }
    const source = this.unique("d");
    const parts = t.entries.map((e) => `${q(e.key)}: ${item(e.item)}`);
    let code = `${at}const ${source} = $.um(${this.loc(t.token)}, ${init});
`;
    code += decl ? `${decl}{${parts.join(", ")}} = ${source};` : `({${parts.join(", ")}} = ${source});`;
    if (t.rest) {
      code += `
${decl}${this.scope.lookup(t.rest.lexeme).js} = $.without(${source}, [${t.entries.map((e) => q(e.key)).join(", ")}]);`;
    }
    return code;
  }
  assign(s) {
    const loc = this.loc(s.op);
    const op = COMPOUND[s.op.type] ?? null;
    const value = this.expr(s.value);
    const t = s.target;
    const at = `$.p = ${loc}; `;
    if (s.op.type === "??=") return at + this.nilAssign(t, loc, value) + ";";
    if (t.kind === "Var") {
      const b = this.resolve(t.name);
      this.checkChangeable(t.name, b);
      if (op) return `${at}${b.js} = $.${BINARY_HELPERS[op]}(${loc}, ${b.js}, ${value});`;
      return `${at}${b.js} = ${value};`;
    }
    if (t.kind === "List") {
      const names = t.items.map((item) => {
        const v = item.kind === "Spread" ? item.expr : item;
        const b = this.resolve(v.name);
        this.checkChangeable(v.name, b);
        return item.kind === "Spread" ? `...${b.js}` : b.js;
      });
      return `${at}[${names.join(", ")}] = $.ul(${loc}, ${value});`;
    }
    if (t.kind === "Member") {
      const obj = this.expr(t.object);
      if (op) return `${at}$.u(${loc}, ${obj}, ${q(t.name)}, ${q(op)}, ${value}${this.inside(t.name)});`;
      return `${at}$.s(${loc}, ${obj}, ${q(t.name)}, ${value}${this.inside(t.name)});`;
    }
    if (t.kind === "Index") {
      const obj = this.expr(t.object);
      const index2 = this.expr(t.index);
      if (op) return `${at}$.ui(${loc}, ${obj}, ${index2}, ${q(op)}, ${value});`;
      return `${at}$.si(${loc}, ${obj}, ${index2}, ${value});`;
    }
    throw nameError(s.op, "You can only assign to a variable, a field or an item");
  }
  checkChangeable(name, b) {
    if (!b.locked) return;
    const n = name.lexeme;
    const why = b.kind === "builtin" ? `Cannot change built-in '${n}'. Make your own with: pit ${n} = ...` : b.kind === "kind" ? `Cannot change kind '${n}'` : b.kind === "import" ? `Cannot change '${n}' because it comes from 'use'` : `Cannot change locked '${n}'`;
    throw nameError(name, why);
  }
  /** `target ??= value`: only sets it (and only works out `value`) when it is nil. */
  nilAssign(t, loc, value) {
    if (t.kind === "Var") {
      const b = this.resolve(t.name);
      this.checkChangeable(t.name, b);
      return `${b.js} ??= ${value}`;
    }
    const obj = this.temp();
    if (t.kind === "Member") {
      return `(${obj} = ${this.expr(t.object)}, $.g(${loc}, ${obj}, ${q(t.name)}${this.inside(t.name)}) ?? $.s(${loc}, ${obj}, ${q(t.name)}, ${value}${this.inside(t.name)}))`;
    }
    if (t.kind === "Index") {
      const key = this.temp();
      return `(${obj} = ${this.expr(t.object)}, ${key} = ${this.expr(t.index)}, $.i(${loc}, ${obj}, ${key}) ?? $.si(${loc}, ${obj}, ${key}, ${value}))`;
    }
    throw nameError({ line: 0, col: 0 }, "'??=' works on a variable, a field or an item");
  }
  loopEach(s) {
    if (s.pattern) return this.loopPattern(s, s.pattern);
    const loc = this.loc(s.token);
    const setup = (scope) => {
      for (const n of s.names) {
        if (scope.names.has(n.lexeme)) throw nameError(n, `'${n.lexeme}' is used twice`);
        scope.names.set(n.lexeme, { kind: "loop", js: `${n.lexeme}$`, locked: false });
      }
    };
    const body = () => this.guard() + this.block(s.body, setup);
    const [first, second] = s.names.map((n) => `${n.lexeme}$`);
    const it = s.iterable;
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
        `  ${labelOf(s.label)}for (let ${first} = ${a}; ${step} > 0 ? ${first} ${cmp[0]} ${b} : ${first} ${cmp[1]} ${b}; ${first} += ${step}) {`,
        indent(indent(body())),
        `  }`,
        `}`
      ].join("\n");
    }
    const iterable = this.expr(it);
    if (s.isAwait) {
      if (second) throw nameError(s.names[1], "'loop wait' takes one name");
      return `${labelOf(s.label)}for await (let ${first} of $.aiter(${loc}, ${iterable})) {
${indent(body())}
}`;
    }
    if (second) return `${labelOf(s.label)}for (let [${first}, ${second}] of $.pairs(${loc}, ${iterable})) {
${indent(body())}
}`;
    return `${labelOf(s.label)}for (let ${first} of $.iter(${loc}, ${iterable})) {
${indent(body())}
}`;
  }
  /** `loop [a, b] in items`: each item is unpacked like `pit [a, b] = item`. */
  loopPattern(s, pattern) {
    const item = this.unique("v");
    const itemToken = s.token;
    const iterable = this.expr(s.iterable);
    const scope = new Scope(this.scope);
    const body = this.inScope(scope, () => {
      const unpack = this.pit({
        kind: "Pit",
        target: pattern,
        init: { kind: "Var", name: { ...itemToken, lexeme: item } },
        locked: false,
        shared: false,
        token: itemToken
      }, item);
      return this.guard() + unpack + "\n" + this.statements(s.body);
    });
    const head = s.isAwait ? `for await (const ${item} of $.aiter(${this.loc(s.token)}, ${iterable}))` : `for (const ${item} of $.iter(${this.loc(s.token)}, ${iterable}))`;
    return `${labelOf(s.label)}${head} {
${indent(body)}
}`;
  }
  attempt(s) {
    let code = `try {
${indent(this.block(s.body))}
}`;
    if (s.rescue) {
      const e = this.unique("e");
      const name = s.errorName;
      const rescue = this.block(s.rescue, (scope) => {
        if (name) scope.names.set(name.lexeme, { kind: "error", js: `${name.lexeme}$`, locked: false });
      });
      const bind = name ? `let ${name.lexeme}$ = $.caught(${e});
` : `$.caught(${e});
`;
      code += ` catch (${e}) {
${indent(bind + rescue)}
}`;
    }
    if (s.always) code += ` finally {
${indent(this.block(s.always))}
}`;
    return code;
  }
  matchTest(subject, pattern) {
    if (pattern.kind === "Literal") {
      return pattern.value === null ? `${subject} == null` : `${subject} === ${literal(pattern.value)}`;
    }
    return `$.mt(${subject}, ${this.expr(pattern)})`;
  }
  matchStatement(subjectExpr, arms) {
    const subject = this.unique("m");
    let code = `{
  const ${subject} = ${this.expr(subjectExpr)};
`;
    let chain = "";
    arms.forEach((arm, i) => {
      const body = arm.body.kind === "Block" ? this.block(arm.body.body) : this.block([arm.body]);
      if (arm.patterns === null) {
        chain += i === 0 ? `{
${indent(body)}
}` : ` else {
${indent(body)}
}`;
      } else {
        const cond = arm.patterns.map((p) => this.matchTest(subject, p)).join(" || ");
        chain += `${i === 0 ? "if" : " else if"} (${cond}) {
${indent(body)}
}`;
      }
    });
    code += indent(chain) + "\n}";
    return code;
  }
  use(s) {
    const loc = this.loc(s.token);
    const load = `await $.use(${loc}, ${q(s.path)})`;
    const decl = this.isReplTop() ? "" : "const ";
    if (s.alias) return `${decl}${this.scope.lookup(s.alias.lexeme).js} = ${load};`;
    if (s.names) {
      const parts = s.names.map((n) => `${q(n.name)}: ${this.scope.lookup(n.as.lexeme).js}`);
      const pick = `$.pick(${loc}, ${load}, [${s.names.map((n) => q(n.name)).join(", ")}], ${q(s.path)})`;
      return decl ? `${decl}{${parts.join(", ")}} = ${pick};` : `({${parts.join(", ")}} = ${pick});`;
    }
    return `${load};`;
  }
  // ---------- functions and kinds ----------
  arity(fn) {
    const min = fn.params.filter((p) => !p.default && !p.rest).length;
    const max = fn.params.some((p) => p.rest) ? "Infinity" : String(fn.params.length);
    return [min, max];
  }
  /** Parameters and body of a function, compiled in its own scope. */
  functionParts(fn, method2) {
    const savedFn = this.fn;
    const scope = new Scope(this.scope);
    this.fn = { temps: [], me: method2 ? "$me" : savedFn.me, inMethod: method2 };
    try {
      return this.inScope(scope, () => {
        const params = [];
        const unpack = [];
        for (const p of fn.params) {
          const def = p.default ? this.defaultValue(p.default, method2) : "null";
          if (p.pattern) {
            const js = this.unique("p");
            params.push(`${js} = ${def}`);
            unpack.push(this.pit({
              kind: "Pit",
              target: p.pattern,
              init: null,
              locked: false,
              shared: false,
              token: p.name
            }, js));
            continue;
          }
          const b = this.declare(p.name, "param", false);
          params.push(p.rest ? `...${b.js}` : `${b.js} = ${def}`);
        }
        let body = [...unpack, this.statements(fn.body)].filter(Boolean).join("\n");
        const prologue = [];
        if (method2) prologue.push("const $me = this;");
        if (this.fn.temps.length) prologue.push(`let ${this.fn.temps.join(", ")};`);
        if (prologue.length) body = prologue.join("\n") + (body ? "\n" + body : "");
        return { params: params.join(", "), body };
      });
    } finally {
      this.fn = savedFn;
    }
  }
  /**
   * A parameter's default value. It runs before the function body exists, so it gets its own
   * temporaries, and uses `this` for `me` in methods.
   */
  defaultValue(e, method2) {
    const saved = this.fn;
    this.fn = { temps: [], me: method2 ? "this" : saved.me, inMethod: false };
    try {
      const value = this.expr(e);
      return this.fn.temps.length ? `(() => { let ${this.fn.temps.join(", ")}; return ${value}; })()` : value;
    } finally {
      this.fn = saved;
    }
  }
  functionExpression(fn, name) {
    const { params, body } = this.functionParts(fn, false);
    const [min, max] = this.arity(fn);
    const head = `${fn.isAsync ? "async " : ""}function${fn.isGenerator ? "*" : ""}`;
    return `$.fn(${head} (${params}) {
${indent(body)}
}, ${q(name ?? fn.name ?? "anonymous")}, ${min}, ${max})`;
  }
  funcDeclaration(name, fn, shared) {
    const b = this.scope.lookup(name.lexeme);
    if (shared) this.exports.push([name.lexeme, b.js]);
    if (this.isReplTop()) return `${b.js} = ${this.functionExpression(fn, name.lexeme)};`;
    const { params, body } = this.functionParts(fn, false);
    const [min, max] = this.arity(fn);
    const head = `${fn.isAsync ? "async " : ""}function${fn.isGenerator ? "*" : ""}`;
    return `${head} ${b.js}(${params}) {
${indent(body)}
}
$.fn(${b.js}, ${q(name.lexeme)}, ${min}, ${max});`;
  }
  kindDeclaration(s) {
    const b = this.scope.lookup(s.name.lexeme);
    if (s.shared) this.exports.push([s.name.lexeme, b.js]);
    const className = `${s.name.lexeme}$`;
    const parent = s.parent ? `$.base(${this.loc(s.name)}, ${this.expr(s.parent)})` : "$.Base";
    const members = [];
    const metas = [];
    const locked = [];
    for (const m of s.members) members.push(this.kindMember(m, metas, locked));
    const decl = this.isReplTop() ? `${b.js} = class ${className}` : `class ${className}`;
    const ref = this.isReplTop() ? b.js : className;
    return [
      `${decl} extends ${parent} {`,
      indent(members.join("\n")),
      `}${this.isReplTop() ? ";" : ""}`,
      `$.kind(${ref}, ${q(s.name.lexeme)}, [${metas.join(", ")}], [${locked.join(", ")}]);`
    ].join("\n");
  }
  kindMember(m, metas, locked) {
    const key = `[${q(m.name.lexeme)}]`;
    const prefix = m.shared ? "static " : "";
    if (m.kind === "Field") {
      if (m.locked) locked.push(`[${q(m.name.lexeme)}, ${m.shared}]`);
      const savedFn = this.fn;
      this.fn = { temps: [], me: m.shared ? null : "$me", inMethod: false };
      try {
        let value = m.init ? this.expr(m.init) : "null";
        const setup = [];
        if (value.includes("$me")) setup.push("const $me = this;");
        if (this.fn.temps.length) setup.push(`let ${this.fn.temps.join(", ")};`);
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
    return `${prefix}${head}${key}(${params}) {
${indent(body)}
}`;
  }
  // ---------- expressions ----------
  /** A condition: skips the truthiness check when the expression is already true/false. */
  bool(e) {
    return isBoolExpr(e) ? this.expr(e) : `$.t(${this.expr(e)})`;
  }
  args(args) {
    return `[${args.map((a) => a.kind === "Spread" ? `...$.sl(${this.loc(a.token)}, ${this.expr(a.expr)})` : this.expr(a)).join(", ")}]`;
  }
  expr(e) {
    switch (e.kind) {
      case "Literal":
        return literal(e.value);
      case "Interp":
        return `(${e.parts.map((p) => typeof p === "string" ? q(p) : `$.str(${this.expr(p)})`).join(" + ")})`;
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
          if (e.right.kind === "Literal" && typeof e.right.value === "bigint") return `(-${e.right.value}n)`;
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
        return e.op.type === "and" ? `(${t} = ${left}, $.t(${t}) ? ${right} : ${t})` : `(${t} = ${left}, $.t(${t}) ? ${t} : ${right})`;
      }
      case "Ternary":
        return `(${this.bool(e.cond)} ? ${this.expr(e.then)} : ${this.expr(e.otherwise)})`;
      case "Range":
        return `$.range(${this.loc(e.dots)}, ${this.expr(e.from)}, ${this.expr(e.to)}, ${e.inclusive}, ${e.step ? this.expr(e.step) : "null"})`;
      case "Call":
        return this.call(e);
      case "Member":
        return `$.${e.optional ? "g0" : "g"}(${this.loc(e.token)}, ${this.expr(e.object)}, ${q(e.name)}${this.inside(e.name)})`;
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
      case "GiveExpr":
        return `((yield ${e.value ? this.expr(e.value) : "null"}) ?? null)`;
    }
  }
  binary(e) {
    const loc = this.loc(e.op);
    const a = this.expr(e.left);
    const b = this.expr(e.right);
    switch (e.op.type) {
      case "==":
        return `$.eq(${a}, ${b})`;
      case "!=":
        return `!$.eq(${a}, ${b})`;
      case "is":
        return `${e.negate ? "!" : ""}$.is(${loc}, ${a}, ${b})`;
      case "in":
        return `${e.negate ? "!" : ""}$.in(${loc}, ${a}, ${b})`;
    }
    return `$.${BINARY_HELPERS[e.op.type]}(${loc}, ${a}, ${b})`;
  }
  call(e) {
    const loc = this.loc(e.paren);
    const args = this.args(e.args);
    const callee = e.callee;
    if (callee.kind === "Member") {
      return `$.${callee.optional ? "m0" : "m"}(${this.loc(callee.token)}, ${this.expr(callee.object)}, ${q(callee.name)}, ${args}${this.inside(callee.name)})`;
    }
    if (callee.kind === "Up") {
      if (!this.fn.inMethod) throw nameError(callee.token, "'up' can only be used directly inside a method");
      return `$.up(${loc}, super[${q(callee.name)}], $me, ${q(callee.name)}, ${args})`;
    }
    return `$.${e.optional ? "c0" : "c"}(${loc}, ${this.expr(callee)}, ${args})`;
  }
};
function labelOf(label) {
  return label ? `${label.lexeme}$loop: ` : "";
}
function literal(value) {
  if (value === null) return "null";
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "Infinity";
  return String(value);
}
function isBoolExpr(e) {
  switch (e.kind) {
    case "Literal":
      return typeof e.value === "boolean";
    case "Unary":
      return e.op.type === "not";
    case "Binary":
      return BOOL_OPS.has(e.op.type);
    case "Logical":
      return e.op.type !== "??" && isBoolExpr(e.left) && isBoolExpr(e.right);
    default:
      return false;
  }
}
function targetNames(t) {
  if (t.kind === "Name") return [t.name];
  if (t.kind === "ListPattern") return [...t.items.map((i) => i.name), ...t.rest ? [t.rest] : []];
  return [...t.entries.map((e) => e.item.name), ...t.rest ? [t.rest] : []];
}
function exprToken(e) {
  switch (e.kind) {
    case "Var":
      return e.name;
    case "Me":
      return e.token;
    case "Call":
      return exprToken(e.callee) ?? e.paren;
    case "Member":
      return exprToken(e.object) ?? e.token;
    case "Index":
      return exprToken(e.object) ?? e.bracket;
    case "Binary":
      return exprToken(e.left) ?? e.op;
    case "Logical":
      return exprToken(e.left) ?? e.op;
    case "Unary":
      return e.op;
    case "Up":
      return e.token;
    case "Wait":
      return e.token;
    case "Match":
      return e.token;
    case "Range":
      return exprToken(e.from) ?? e.dots;
    case "Map":
      return e.token;
    case "Lambda":
      return e.fn.token;
    case "Ternary":
      return exprToken(e.cond);
    case "SayExpr":
      return exprToken(e.value);
    case "GiveExpr":
      return e.token;
    default:
      return null;
  }
}

// src/parser.ts
var ASSIGN_OPS = ["=", "+=", "-=", "*=", "/=", "%=", "**=", "??="];
var Parser = class _Parser {
  constructor(tokens) {
    this.tokens = tokens;
  }
  current = 0;
  blockDepth = 0;
  /** While parsing `match` patterns, `x => ...` must not be read as a function. */
  noLambda = false;
  ctx = { type: "top", fn: null, inKind: false, upAllowed: false, loopDepth: 0, labels: [] };
  parseProgram() {
    const program = [];
    while (!this.check("EOF")) {
      if (this.match(";")) continue;
      const t = this.peek();
      if (t.type === "}" || t.type === ")" || t.type === "]") {
        throw this.error(t, `This '${t.type}' doesn't close anything. Remove it or add the matching opening one`);
      }
      program.push(this.statement());
    }
    return program;
  }
  /** Parses a single expression that must use every token (used for `{...}` in text). */
  parseStandaloneExpression(ctx) {
    if (ctx) this.ctx = ctx;
    const expr = this.expression();
    if (!this.check("EOF")) {
      throw this.error(this.peek(), `Unexpected ${describeToken(this.peek())} inside {}`);
    }
    return expr;
  }
  // ---------- statements ----------
  statement() {
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
        throw this.error(t, "'orwhen' must come right after the '}' of a 'when' block");
      case "rescue":
      case "always":
        throw this.error(t, `'${t.type}' must come right after the '}' of an 'attempt' block`);
    }
    if (this.isFunctionDeclarationStart()) return this.functionDeclaration(false);
    if (this.checkWord("other") && this.peekAt(1).type === "{") {
      throw this.error(t, "'other' must come right after the '}' of a 'when' block");
    }
    return this.expressionStatement();
  }
  isFunctionDeclarationStart() {
    return this.check("IDENT") && this.peekAt(1).type === "(" && !this.peekAt(1).newlineBefore && this.arrowAfterParens(this.current + 1);
  }
  pitDeclaration(shared) {
    const keyword = this.advance();
    const locked = keyword.type === "lock";
    const target = this.target(keyword);
    let init = null;
    if (this.match("=")) {
      init = this.expression();
    } else if (target.kind !== "Name") {
      throw this.error(this.peek(), "Unpacking needs a value, like: pit [a, b] = list");
    } else if (locked) {
      throw this.error(this.peek(), `'lock ${target.name.lexeme}' needs a value, like: lock ${target.name.lexeme} = 10`);
    }
    this.endStatement(init ?? void 0);
    return { kind: "Pit", target, init, locked, shared, token: keyword };
  }
  /** A name, `[a, b, ...rest]` or `{name, age: years}` after `pit`/`lock`. */
  target(keyword) {
    if (this.check("[")) {
      const token = this.advance();
      const items = [];
      let rest = null;
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
      const entries = [];
      let rest = null;
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
          const name2 = this.identifier("Expected a key name to unpack");
          if (this.match(":")) {
            entries.push({ key: name2.lexeme, item: this.patternItem(this.identifier("Expected a name after ':'")) });
          } else {
            entries.push({ key: name2.lexeme, item: this.patternItem(name2) });
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
  patternItem(name) {
    return { name, default: this.match("=") ? this.expression() : null };
  }
  sayStatement() {
    this.advance();
    const values = [];
    if (!this.atStatementEnd()) {
      do
        values.push(this.expression());
      while (this.match(","));
    }
    this.endStatement();
    return { kind: "Say", values };
  }
  whenStatement() {
    this.advance();
    const branches = [
      { cond: this.expression(), body: this.block("the 'when' condition") }
    ];
    let otherwise = null;
    for (; ; ) {
      if (this.match("orwhen")) {
        branches.push({ cond: this.expression(), body: this.block("the 'orwhen' condition") });
        continue;
      }
      if (this.checkWord("other") && this.peekAt(1).type === "{") {
        this.advance();
        otherwise = this.block("'other'");
      }
      break;
    }
    return { kind: "When", branches, otherwise };
  }
  loopStatement() {
    const keyword = this.advance();
    const namedForever = this.checkWord("as") && this.peekAt(1).type === "IDENT" && this.peekAt(2).type === "{";
    if (this.check("{") && !this.patternAhead(this.current) || namedForever) {
      const loop = this.loopBody("'loop'");
      if (this.checkWord("until") && !this.peek().newlineBefore) {
        this.advance();
        const cond2 = this.expression();
        this.endStatement();
        return { kind: "LoopUntil", cond: cond2, ...loop };
      }
      return { kind: "LoopForever", ...loop };
    }
    const isAwait = this.check("wait") && (this.peekAt(1).type === "IDENT" && (this.peekAt(2).type === "in" || this.peekAt(2).type === ",") || this.peekAt(1).type === "[" || this.peekAt(1).type === "{" && this.patternAhead(this.current + 1));
    if (isAwait) {
      this.advance();
      this.markAsync(keyword);
    }
    if (this.check("[") || this.check("{") && this.patternAhead(this.current)) {
      const pattern = this.target(keyword);
      this.consume("in", "Expected 'in' after the pattern, like: loop [a, b] in pairs");
      const iterable = this.expression();
      return { kind: "LoopEach", names: [], pattern, iterable, ...this.loopBody("the list to loop over"), isAwait, token: keyword };
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
      return { kind: "LoopEach", names, pattern: null, iterable, ...this.loopBody("the list to loop over"), isAwait, token: keyword };
    }
    const cond = this.expression();
    if (this.matchWord("times")) return { kind: "LoopTimes", count: cond, ...this.loopBody("'times'"), token: keyword };
    return { kind: "LoopWhile", cond, ...this.loopBody("the loop condition") };
  }
  /** The body of a loop, after an optional name: `loop i in 0..3 as outer { ... }`. */
  loopBody(after) {
    const label = this.matchWord("as") ? this.identifier("Expected a name for the loop after 'as'") : null;
    if (label && this.ctx.labels.includes(label.lexeme)) {
      throw this.error(label, `A loop around this one is already called '${label.lexeme}'`);
    }
    this.ctx.loopDepth++;
    if (label) this.ctx.labels.push(label.lexeme);
    try {
      return { body: this.block(label ? `'as ${label.lexeme}'` : after), label };
    } finally {
      this.ctx.loopDepth--;
      if (label) this.ctx.labels.pop();
    }
  }
  backStatement() {
    const keyword = this.advance();
    if (this.ctx.type !== "function") throw this.error(keyword, "'back' can only be used inside a function");
    const value = this.atStatementEnd() ? null : this.expression();
    this.endStatement();
    return { kind: "Back", keyword, value };
  }
  giveStatement() {
    const keyword = this.advance();
    if (this.ctx.type !== "function" || !this.ctx.fn) {
      throw this.error(keyword, "'give' can only be used inside a function");
    }
    this.ctx.fn.isGenerator = true;
    const value = this.atStatementEnd() ? null : this.expression();
    this.endStatement();
    return { kind: "Give", keyword, value };
  }
  jumpStatement() {
    const keyword = this.advance();
    if (this.ctx.loopDepth === 0) throw this.error(keyword, `'${keyword.type}' can only be used inside a loop`);
    const label = this.check("IDENT") && !this.peek().newlineBefore ? this.advance() : null;
    if (label && !this.ctx.labels.includes(label.lexeme)) {
      throw this.error(label, `There is no loop called '${label.lexeme}' around this ${keyword.type}. Name one like: loop ... as ${label.lexeme} { }`);
    }
    this.endStatement();
    return keyword.type === "stop" ? { kind: "Stop", keyword, label } : { kind: "Skip", keyword, label };
  }
  attemptStatement() {
    this.advance();
    const body = this.block("'attempt'");
    let errorName = null;
    let rescue = null;
    let always = null;
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
  matchStatement() {
    const token = this.advance();
    const subject = this.expression();
    const arms = this.matchArms(() => this.check("{") ? { kind: "Block", body: this.block("'=>'") } : this.statement());
    return { kind: "MatchStmt", subject, arms, token };
  }
  matchArms(body) {
    const open = this.consume("{", "Expected '{' after the value to match");
    const arms = [];
    while (!this.check("}")) {
      if (this.check("EOF")) throw this.error(open, "This '{' is never closed. Add a matching '}'");
      if (this.match(";")) continue;
      const token = this.peek();
      let patterns = null;
      if (this.checkWord("other") && this.peekAt(1).type === "=>") {
        this.advance();
        if (arms.some((a) => a.patterns === null)) throw this.error(token, "This match already has an 'other' arm");
      } else {
        patterns = [];
        const saved = this.noLambda;
        this.noLambda = true;
        try {
          do
            patterns.push(this.expression());
          while (this.match(","));
        } finally {
          this.noLambda = saved;
        }
      }
      this.consume("=>", `Expected '=>' after the pattern, like: 1 => say "one"`);
      arms.push({ patterns, body: body(), token });
    }
    this.advance();
    const otherIndex = arms.findIndex((a) => a.patterns === null);
    if (otherIndex >= 0 && otherIndex !== arms.length - 1) {
      throw this.error(arms[otherIndex + 1].token, "This arm comes after 'other', so it can never match");
    }
    return arms;
  }
  kindDeclaration(shared) {
    this.advance();
    const name = this.identifier("Expected a name after 'kind', like: kind Dog { ... }");
    const parent = this.matchWord("from") ? this.postfix() : null;
    const open = this.consume("{", `Expected '{' to start the body of kind ${name.lexeme}`);
    const members = [];
    const seen = /* @__PURE__ */ new Set();
    while (!this.check("}")) {
      if (this.check("EOF")) throw this.error(open, "This '{' is never closed. Add a matching '}'");
      if (this.match(";")) continue;
      const member = this.kindMember(parent !== null);
      const key = `${member.shared ? "shared " : ""}${member.kind === "Method" && member.accessor ? member.accessor + " " : ""}${member.name.lexeme}`;
      if (seen.has(key)) throw this.error(member.name, `'${member.name.lexeme}' is defined twice in kind ${name.lexeme}`);
      seen.add(key);
      members.push(member);
    }
    this.advance();
    return { kind: "Kind", name, parent, members, shared };
  }
  kindMember(hasParent) {
    let shared = false;
    const afterShared = this.peekAt(1).type;
    if (this.checkWord("shared") && (afterShared === "IDENT" || afterShared === "pit" || afterShared === "lock")) {
      this.advance();
      shared = true;
    }
    const bareSharedField = shared && this.check("IDENT") && this.peekAt(1).type === "=";
    if (this.check("pit") || this.check("lock") || bareSharedField) {
      const keyword = bareSharedField ? this.peek() : this.advance();
      const name2 = this.identifier("Expected a field name");
      if (name2.lexeme === "constructor") throw this.error(name2, "'constructor' can't be used as a field name");
      let init = null;
      if (this.match("=")) init = this.withContext({ type: "field", fn: null, inKind: !shared, upAllowed: false, loopDepth: 0, labels: [] }, () => this.expression());
      else if (keyword.type === "lock") throw this.error(this.peek(), `'lock ${name2.lexeme}' needs a value`);
      this.endStatement();
      return { kind: "Field", name: name2, init, shared, locked: keyword.type === "lock" };
    }
    let accessor = null;
    if ((this.checkWord("get") || this.checkWord("set")) && this.peekAt(1).type === "IDENT") {
      accessor = this.advance().lexeme;
    }
    if (!(this.check("IDENT") && this.peekAt(1).type === "(")) {
      throw this.error(this.peek(), "Inside a kind, write methods like: name() => ... or fields like: pit count = 0");
    }
    const name = this.advance();
    if (name.lexeme === "init" && (shared || accessor)) throw this.error(name, "'init' can't be shared or a get/set");
    if (name.lexeme === "constructor") throw this.error(name, "Use 'init' to set up a new instance");
    const { fn, expressionBody } = this.functionRest(name.lexeme, name, {
      inKind: !shared,
      upAllowed: !shared && hasParent
    });
    if (accessor === "get" && fn.params.length > 0) throw this.error(name, `'get ${name.lexeme}' can't take parameters`);
    if (accessor === "set" && fn.params.length !== 1) throw this.error(name, `'set ${name.lexeme}' needs exactly one parameter`);
    if (expressionBody) this.endStatement();
    return { kind: "Method", name, fn, shared, accessor };
  }
  useStatement() {
    const token = this.advance();
    this.requireTopLevel(token, "'use'");
    let alias = null;
    let names = null;
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
      this.consumeWord("from", `Expected 'from', like: use { add } from "./tools.pit"`);
    } else if (this.check("IDENT")) {
      alias = this.advance();
      this.consumeWord("from", `Expected 'from', like: use ${alias.lexeme} from "./${alias.lexeme}.pit"`);
    }
    const pathToken = this.consume("STRING", 'Expected the file to use, like: "./tools.pit"');
    const path = this.plainString(pathToken);
    this.endStatement();
    return { kind: "Use", path, alias, names, token };
  }
  shareStatement() {
    const token = this.advance();
    this.requireTopLevel(token, "'share'");
    if (this.check("pit") || this.check("lock")) return this.pitDeclaration(true);
    if (this.check("kind")) return this.kindDeclaration(true);
    if (this.isFunctionDeclarationStart()) return this.functionDeclaration(true);
    throw this.error(this.peek(), "Expected pit, lock, kind or a function after 'share'");
  }
  requireTopLevel(token, what) {
    if (this.ctx.type !== "top" || this.blockDepth > 0) {
      throw this.error(token, `${what} can only be used at the top of a file, not inside a block or function`);
    }
  }
  functionDeclaration(shared) {
    const name = this.advance();
    const { fn, expressionBody } = this.functionRest(name.lexeme, name, {
      inKind: this.ctx.inKind,
      upAllowed: false
    });
    if (expressionBody) this.endStatement();
    return { kind: "Func", name, fn, shared };
  }
  /** Parses `(params) => body` (or `name => body` when `single` is given). */
  functionRest(name, token, options, single) {
    const params = [];
    if (single) {
      params.push({ name: single, pattern: null, default: null, rest: false });
    } else {
      this.consume("(", "Expected '(' to start the parameter list");
      const savedInKind = this.ctx.inKind;
      this.ctx.inKind ||= options.inKind;
      try {
        this.parameters(params);
      } finally {
        this.ctx.inKind = savedInKind;
      }
      this.consume(")", "Expected ')' after the parameters");
    }
    this.consume("=>", "Expected '=>' after the parameters");
    return this.functionBody(name, token, params, options);
  }
  parameters(params) {
    let sawDefault = false;
    while (!this.check(")")) {
      const rest = this.match("...");
      let pattern = null;
      let param;
      if (!rest && (this.check("[") || this.check("{"))) {
        param = this.peek();
        pattern = this.target(param);
      } else {
        param = this.identifier("Expected a parameter name");
        if (params.some((p) => p.name.lexeme === param.lexeme)) {
          throw this.error(param, `Parameter '${param.lexeme}' is listed twice`);
        }
      }
      const def = !rest && this.match("=") ? this.expression() : null;
      if (def) sawDefault = true;
      else if (sawDefault && !rest) throw this.error(param, "Parameters with default values must come last");
      params.push({ name: param, pattern, default: def, rest });
      if (rest) {
        if (!this.check(")")) throw this.error(this.peek(), "'...rest' must be the last parameter");
        break;
      }
      if (!this.match(",")) break;
    }
  }
  functionBody(name, token, params, options) {
    const fn = { name, params, body: [], token, isGenerator: false, isAsync: false };
    const expressionBody = !this.check("{");
    this.withContext({ type: "function", fn, inKind: options.inKind, upAllowed: options.upAllowed, loopDepth: 0, labels: [] }, () => {
      if (expressionBody) {
        const value = this.expression();
        fn.body = [{ kind: "Back", keyword: token, value }];
      } else {
        fn.body = this.block("'=>'");
      }
    });
    return { fn, expressionBody };
  }
  withContext(ctx, run2) {
    const saved = this.ctx;
    const savedDepth = this.blockDepth;
    this.ctx = ctx;
    this.blockDepth = 0;
    try {
      return run2();
    } finally {
      this.ctx = saved;
      this.blockDepth = savedDepth;
    }
  }
  expressionStatement() {
    const expr = this.expression();
    const next = this.peek();
    if (ASSIGN_OPS.includes(next.type) || (next.type === "++" || next.type === "--") && !next.newlineBefore) {
      const op = this.advance();
      this.checkAssignable(expr, op);
      const value = op.type === "++" || op.type === "--" ? { kind: "Literal", value: 1 } : this.expression();
      this.endStatement();
      return { kind: "Assign", target: expr, op, value };
    }
    this.endStatement(expr);
    return { kind: "Expr", expr };
  }
  checkAssignable(target, op) {
    if (target.kind === "Var" || target.kind === "Index") return;
    if (target.kind === "List" && op.type === "=" && target.items.length > 0 && target.items.every((i) => i.kind === "Var" || i.kind === "Spread" && i.expr.kind === "Var")) {
      return;
    }
    if (target.kind === "Member" && !target.optional) return;
    if (op.type === "??=") throw this.error(op, "'??=' works on a variable, a field or an item");
    if (target.kind === "Me") throw this.error(op, "You can't replace 'me'. Change its fields instead, like: me.name = ...");
    throw this.error(op, "You can only assign to a variable, a field (a.b), an item (a[i]) or a list of names ([a, b])");
  }
  /** Parses `{ statements }` and returns the statements. */
  block(after) {
    if (!this.check("{")) {
      const next = this.peek();
      if (next.type === "=") throw this.error(next, "Use '==' to compare two values");
      const where = after ? ` after ${after}` : "";
      throw this.error(next, `Expected '{'${where} but found ${describeToken(next)}`);
    }
    const open = this.advance();
    const body = [];
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
    this.advance();
    return body;
  }
  atStatementEnd() {
    const t = this.peek();
    return t.type === ";" || t.type === "}" || t.type === "EOF" || t.newlineBefore;
  }
  endStatement(expr) {
    if (this.match(";") || this.atStatementEnd()) return;
    if (expr?.kind === "Var" && HABIT_HINTS[expr.name.lexeme]) {
      throw this.error(expr.name, HABIT_HINTS[expr.name.lexeme]);
    }
    const next = this.peek();
    throw this.error(next, `Unexpected ${describeToken(next)}. Put each statement on its own line or separate them with ';'`);
  }
  // ---------- expressions (lowest to highest precedence) ----------
  expression() {
    return this.ternary();
  }
  ternary() {
    const cond = this.nullish();
    if (!this.check("?")) return cond;
    this.advance();
    const then = this.ternary();
    this.consume(":", "Expected ':' in 'condition ? yes : no'");
    const otherwise = this.ternary();
    return { kind: "Ternary", cond, then, otherwise };
  }
  nullish() {
    let expr = this.or();
    while (this.check("??")) {
      const op = this.advance();
      expr = { kind: "Logical", left: expr, op, right: this.or() };
    }
    return expr;
  }
  or() {
    let expr = this.and();
    while (this.check("or")) {
      const op = this.advance();
      expr = { kind: "Logical", left: expr, op, right: this.and() };
    }
    return expr;
  }
  and() {
    let expr = this.equality();
    while (this.check("and")) {
      const op = this.advance();
      expr = { kind: "Logical", left: expr, op, right: this.equality() };
    }
    return expr;
  }
  equality() {
    let expr = this.comparison();
    for (; ; ) {
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
  comparison() {
    let expr = this.range();
    for (; ; ) {
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
  range() {
    const from = this.bitOr();
    if (!this.check("..") && !this.check("..=")) return from;
    const dots = this.advance();
    const to = this.bitOr();
    const step = this.matchWord("by") ? this.bitOr() : null;
    return { kind: "Range", from, to, inclusive: dots.type === "..=", step, dots };
  }
  bitOr() {
    return this.binaryLevel(["|"], () => this.bitXor());
  }
  bitXor() {
    return this.binaryLevel(["^"], () => this.bitAnd());
  }
  bitAnd() {
    return this.binaryLevel(["&"], () => this.shift());
  }
  shift() {
    return this.binaryLevel(["<<", ">>"], () => this.term());
  }
  term() {
    return this.binaryLevel(["+", "-"], () => this.factor());
  }
  factor() {
    return this.binaryLevel(["*", "/", "%"], () => this.unary());
  }
  binaryLevel(ops, next) {
    let expr = next();
    while (ops.includes(this.peek().type) && !(this.peek().newlineBefore && (this.check("+") || this.check("-")))) {
      const op = this.advance();
      expr = { kind: "Binary", left: expr, op, right: next() };
    }
    return expr;
  }
  unary() {
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
  power() {
    const base = this.postfix();
    if (!this.check("**")) return base;
    const op = this.advance();
    return { kind: "Binary", left: base, op, right: this.unary() };
  }
  markAsync(token) {
    if (this.ctx.type === "field") throw this.error(token, "'wait' can't be used in a field's starting value");
    if (this.ctx.fn) this.ctx.fn.isAsync = true;
  }
  postfix() {
    let expr = this.primary();
    for (; ; ) {
      const t = this.peek();
      if (t.type === "(" && !t.newlineBefore) {
        this.advance();
        expr = { kind: "Call", callee: expr, paren: t, args: this.arguments() };
      } else if (t.type === "[" && !t.newlineBefore) {
        this.advance();
        const index2 = this.expression();
        this.consume("]", "Expected ']' after the index");
        expr = { kind: "Index", object: expr, index: index2, bracket: t };
      } else if (t.type === "?." && this.peekAt(1).type === "(") {
        this.advance();
        const paren = this.advance();
        expr = { kind: "Call", callee: expr, paren, args: this.arguments(), optional: true };
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
  memberName() {
    const t = this.peek();
    if (t.type === "IDENT" || isKeyword(t.type)) return this.advance();
    throw this.error(t, `Expected a name after '.', but found ${describeToken(t)}`);
  }
  arguments() {
    const args = [];
    while (!this.check(")")) {
      args.push(this.spreadOr());
      if (!this.match(",")) break;
    }
    this.consume(")", "Expected ')' after the arguments");
    return args;
  }
  spreadOr() {
    if (this.check("...")) {
      const token = this.advance();
      return { kind: "Spread", expr: this.expression(), token };
    }
    return this.expression();
  }
  primary() {
    const t = this.peek();
    switch (t.type) {
      case "NUMBER":
        this.advance();
        return { kind: "Literal", value: t.value };
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
        const arms = this.matchArms(() => {
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
      case "give": {
        this.advance();
        if (this.ctx.type !== "function" || !this.ctx.fn) throw this.error(t, "'give' can only be used inside a function");
        this.ctx.fn.isGenerator = true;
        const value = this.atStatementEnd() || this.check(")") ? null : this.expression();
        return { kind: "GiveExpr", value, token: t };
      }
    }
    if (t.type !== "EOF" && isKeyword(t.type)) {
      throw this.error(t, `'${t.lexeme}' is a PitCode keyword and can't be used as a value here`);
    }
    throw this.error(t, `Expected a value but found ${describeToken(t)}`);
  }
  lambdaOptions() {
    return { inKind: this.ctx.inKind, upAllowed: false };
  }
  listLiteral() {
    const open = this.advance();
    const items = [];
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
    this.advance();
    return { kind: "List", items };
  }
  mapLiteral() {
    const open = this.advance();
    const entries = [];
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
    this.advance();
    return { kind: "Map", entries, token: open };
  }
  mapEntry() {
    const t = this.peek();
    if (t.type === "...") {
      this.advance();
      return { kind: "Spread", expr: this.expression(), token: t };
    }
    if (t.type === "[") {
      this.advance();
      const key2 = this.expression();
      this.consume("]", "Expected ']' after the key");
      this.consume(":", "Expected ':' after the key");
      return { kind: "Computed", key: key2, value: this.expression() };
    }
    if (t.type === "IDENT" && this.peekAt(1).type === "(" && this.arrowAfterParens(this.current + 1)) {
      this.advance();
      return { kind: "Entry", key: t.lexeme, value: { kind: "Lambda", fn: this.functionRest(t.lexeme, t, this.lambdaOptions()).fn } };
    }
    let key;
    if (t.type === "NUMBER") {
      this.advance();
      this.consume(":", "Expected ':' after the key");
      return { kind: "Computed", key: { kind: "Literal", value: t.value }, value: this.expression() };
    }
    if (t.type === "STRING") key = this.plainString(t);
    else if (t.type === "IDENT" || isKeyword(t.type)) key = t.lexeme;
    else throw this.error(t, `Expected a key but found ${describeToken(t)}`);
    this.advance();
    if (!this.match(":")) {
      if (t.type !== "IDENT") throw this.error(this.peek(), `Expected ':' after the key ${key}`);
      return { kind: "Entry", key, value: { kind: "Var", name: t } };
    }
    return { kind: "Entry", key, value: this.expression() };
  }
  stringLiteral(t) {
    const parts = t.value;
    if (parts.every((p) => typeof p === "string")) {
      return { kind: "Literal", value: parts.join("") };
    }
    return {
      kind: "Interp",
      parts: parts.map((p) => {
        if (typeof p === "string") return p;
        const tokens = new Lexer(p.source, p.line, p.col).tokenize();
        return new _Parser(tokens).parseStandaloneExpression(this.ctx);
      })
    };
  }
  /** The text of a string token that must not contain `{...}`. */
  plainString(t) {
    const parts = t.value;
    if (!parts.every((p) => typeof p === "string")) throw this.error(t, "This text can't contain {...}");
    return parts.join("");
  }
  // ---------- helpers ----------
  /** True when the bracket at index `i` is closed and then followed by `in` (a loop pattern). */
  patternAhead(i) {
    let depth = 0;
    for (let j = i; j < this.tokens.length; j++) {
      const type = this.tokens[j].type;
      if (type === "(" || type === "[" || type === "{") depth++;
      else if (type === ")" || type === "]" || type === "}") {
        if (--depth === 0) return this.tokens[j + 1]?.type === "in";
      } else if (type === "EOF") return false;
    }
    return false;
  }
  /** True when the `(` at index `i` has a matching `)` followed by `=>`. */
  arrowAfterParens(i) {
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
  identifier(message) {
    const t = this.peek();
    if (t.type === "IDENT") return this.advance();
    if (t.type !== "EOF" && isKeyword(t.type)) {
      throw this.error(t, `'${t.lexeme}' is a PitCode keyword and can't be used as a name`);
    }
    throw this.error(t, message);
  }
  consume(type, message) {
    if (this.check(type)) return this.advance();
    throw this.error(this.peek(), `${message}, but found ${describeToken(this.peek())}`);
  }
  match(type) {
    if (!this.check(type)) return false;
    this.advance();
    return true;
  }
  /** Contextual words like `by`, `as`, `get`, `set`, `shared` are plain names elsewhere. */
  checkWord(word) {
    return this.check("IDENT") && this.peek().lexeme === word;
  }
  consumeWord(word, message) {
    if (this.checkWord(word)) return this.advance();
    throw this.error(this.peek(), `${message}, but found ${describeToken(this.peek())}`);
  }
  matchWord(word) {
    if (!this.checkWord(word)) return false;
    this.advance();
    return true;
  }
  check(type) {
    return this.peek().type === type;
  }
  advance() {
    const t = this.tokens[this.current];
    if (t.type !== "EOF") this.current++;
    return t;
  }
  peek() {
    return this.tokens[this.current];
  }
  peekAt(offset) {
    return this.tokens[Math.min(this.current + offset, this.tokens.length - 1)];
  }
  error(at, message) {
    return syntaxError(at, message);
  }
};

// src/runtime/methods.ts
var method = (min, max, fn) => ({ min, max, fn });
function needNumber(loc, value, what) {
  if (typeof value !== "number") fail(loc, `${what} needs a number, but got ${typeName(value)}`);
  return value;
}
function needInt(loc, value, what) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    fail(loc, `${what} needs a whole number, but got ${typeof value === "number" ? value : typeName(value)}`);
  }
  return value;
}
function needString(loc, value, what) {
  if (typeof value !== "string") fail(loc, `${what} needs text, but got ${typeName(value)}`);
  return value;
}
function needList(loc, value, what) {
  if (!Array.isArray(value)) fail(loc, `${what} needs a list, but got ${typeName(value)}`);
  return value;
}
function toRegExp(loc, p, what, global) {
  if (p instanceof RegExp) {
    const flags = global ? p.flags.includes("g") ? p.flags : p.flags + "g" : p.flags.replace("g", "");
    return new RegExp(p.source, flags);
  }
  if (typeof p === "string") return new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), global ? "g" : "");
  fail(loc, `${what} needs text or a pattern, but got ${typeName(p)}`);
}
function position(index2, size) {
  return index2 < 0 ? Math.max(0, size + index2) : Math.min(index2, size);
}
function compareValues(loc, a, b) {
  if (a instanceof Base) {
    const m = findMember(a, "compare");
    if (m && typeof m.value === "function") {
      const r = m.value.call(a, b);
      if (typeof r === "number") return r;
    }
  }
  if (typeof a === "number" && typeof b === "number") return a - b;
  if ((typeof a === "bigint" || typeof a === "number") && (typeof b === "bigint" || typeof b === "number")) return a < b ? -1 : a > b ? 1 : 0;
  if (typeof a === "string" && typeof b === "string") return a < b ? -1 : a > b ? 1 : 0;
  fail(loc, `Can't sort a mix of ${typeName(a)} and ${typeName(b)}. Give sort() a function to compare them`);
}
function comparator(loc, fn) {
  return (a, b) => {
    const r = invoke(loc, fn, [a, b]);
    if (typeof r === "number") return r;
    if (typeof r === "boolean") return r ? -1 : 1;
    fail(loc, `The sort function must give back a number, but gave ${typeName(r)}`);
  };
}
function sum(loc, list) {
  let total = 0;
  for (const x of list) total += needNumber(loc, x, "sum()");
  return total;
}
function extreme(loc, list, sign) {
  if (list.length === 0) return null;
  let best = list[0];
  for (const x of list) if (compareValues(loc, x, best) * sign > 0) best = x;
  return best;
}
function byKey(loc, list, fn, sign) {
  let best = null;
  let bestKey;
  list.forEach((x, i) => {
    const key = invoke(loc, fn, [x]);
    if (i === 0 || compareValues(loc, key, bestKey) * sign > 0) {
      best = x;
      bestKey = key;
    }
  });
  return best;
}
function flat(list, depth) {
  return depth <= 0 ? [...list] : list.flatMap((x) => Array.isArray(x) ? flat(x, depth - 1) : [x]);
}
function uniqueValues(list) {
  return [...new Set(list)];
}
function shuffled(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function entriesOf(loc, value, what) {
  if (value instanceof Map) return [...value];
  if (value instanceof Base) return Object.entries(value);
  fail(loc, `${what} needs a map, but got ${typeName(value)}`);
}
var LIST_PROPS = {
  size: (l) => l.length,
  isEmpty: (l) => l.length === 0,
  first: (l) => l[0] ?? null,
  last: (l) => l[l.length - 1] ?? null
};
var LIST_METHODS = {
  add: method(1, Infinity, (_, l, items) => (l.push(...items), l)),
  addFirst: method(1, Infinity, (_, l, items) => (l.unshift(...items), l)),
  addAll: method(1, 1, (loc, l, [other]) => (l.push(...needList(loc, other, "addAll()")), l)),
  pop: method(0, 0, (_, l) => l.pop() ?? null),
  popFirst: method(0, 0, (_, l) => l.shift() ?? null),
  insert: method(2, 2, (loc, l, [index2, item]) => {
    l.splice(position(needInt(loc, index2, "insert()"), l.length), 0, item);
    return l;
  }),
  removeAt: method(1, 1, (loc, l, [index2]) => {
    let i = needInt(loc, index2, "removeAt()");
    if (i < 0) i += l.length;
    if (i < 0 || i >= l.length) fail(loc, `Index ${index2} is outside the list (size ${l.length})`);
    return l.splice(i, 1)[0] ?? null;
  }),
  remove: method(1, 1, (_, l, [item]) => {
    const i = l.indexOf(item);
    if (i < 0) return false;
    l.splice(i, 1);
    return true;
  }),
  clear: method(0, 0, (_, l) => (l.length = 0, l)),
  has: method(1, 1, (_, l, [item]) => l.includes(item)),
  indexOf: method(1, 1, (_, l, [item]) => {
    const i = l.indexOf(item);
    return i < 0 ? null : i;
  }),
  find: method(1, 1, (loc, l, [fn]) => l.find((x, i) => isTruthy(invoke(loc, fn, [x, i]))) ?? null),
  findIndex: method(1, 1, (loc, l, [fn]) => {
    const i = l.findIndex((x, j) => isTruthy(invoke(loc, fn, [x, j])));
    return i < 0 ? null : i;
  }),
  map: method(1, 1, (loc, l, [fn]) => l.map((x, i) => invoke(loc, fn, [x, i]))),
  filter: method(1, 1, (loc, l, [fn]) => l.filter((x, i) => isTruthy(invoke(loc, fn, [x, i])))),
  reject: method(1, 1, (loc, l, [fn]) => l.filter((x, i) => !isTruthy(invoke(loc, fn, [x, i])))),
  reduce: method(1, 2, (loc, l, args) => {
    const [fn] = args;
    if (args.length === 1) {
      if (l.length === 0) fail(loc, "reduce() on an empty list needs a starting value, like: list.reduce(f, 0)");
      return l.reduce((acc, x, i) => invoke(loc, fn, [acc, x, i]));
    }
    return l.reduce((acc, x, i) => invoke(loc, fn, [acc, x, i]), args[1]);
  }),
  each: method(1, 1, (loc, l, [fn]) => {
    l.forEach((x, i) => invoke(loc, fn, [x, i]));
    return null;
  }),
  any: method(1, 1, (loc, l, [fn]) => l.some((x, i) => isTruthy(invoke(loc, fn, [x, i])))),
  all: method(1, 1, (loc, l, [fn]) => l.every((x, i) => isTruthy(invoke(loc, fn, [x, i])))),
  count: method(0, 1, (loc, l, args) => {
    if (args.length === 0) return l.length;
    const [what] = args;
    return typeof what === "function" ? l.filter((x, i) => isTruthy(invoke(loc, what, [x, i]))).length : l.filter((x) => x === what).length;
  }),
  sort: method(0, 1, (loc, l, [fn]) => [...l].sort(fn === void 0 ? (a, b) => compareValues(loc, a, b) : comparator(loc, fn))),
  sortBy: method(1, 1, (loc, l, [fn]) => {
    const keyed = l.map((x) => [invoke(loc, fn, [x]), x]);
    keyed.sort((a, b) => compareValues(loc, a[0], b[0]));
    return keyed.map(([, x]) => x);
  }),
  reverse: method(0, 0, (_, l) => [...l].reverse()),
  join: method(0, 1, (loc, l, [sep = ", "]) => l.map(str).join(needString(loc, sep, "join()"))),
  slice: method(1, 2, (loc, l, [start, end]) => l.slice(needInt(loc, start, "slice()"), end === void 0 || end === null ? void 0 : needInt(loc, end, "slice()"))),
  take: method(1, 1, (loc, l, [n]) => l.slice(0, Math.max(0, needInt(loc, n, "take()")))),
  drop: method(1, 1, (loc, l, [n]) => l.slice(Math.max(0, needInt(loc, n, "drop()")))),
  flat: method(0, 1, (loc, l, [depth = 1]) => flat(l, needInt(loc, depth, "flat()"))),
  unique: method(0, 0, (_, l) => uniqueValues(l)),
  sum: method(0, 0, (loc, l) => sum(loc, l)),
  average: method(0, 0, (loc, l) => l.length === 0 ? null : sum(loc, l) / l.length),
  min: method(0, 0, (loc, l) => extreme(loc, l, -1)),
  max: method(0, 0, (loc, l) => extreme(loc, l, 1)),
  copy: method(0, 0, (_, l) => [...l]),
  chunk: method(1, 1, (loc, l, [n]) => {
    const size = needInt(loc, n, "chunk()");
    if (size <= 0) fail(loc, "chunk() needs a size of at least 1");
    const out = [];
    for (let i = 0; i < l.length; i += size) out.push(l.slice(i, i + size));
    return out;
  }),
  zip: method(1, 1, (loc, l, [other]) => {
    const o = needList(loc, other, "zip()");
    return l.slice(0, Math.min(l.length, o.length)).map((x, i) => [x, o[i]]);
  }),
  groupBy: method(1, 1, (loc, l, [fn]) => {
    const groups = /* @__PURE__ */ new Map();
    for (const x of l) {
      const key = invoke(loc, fn, [x]);
      const group = groups.get(key);
      if (group) group.push(x);
      else groups.set(key, [x]);
    }
    return groups;
  }),
  random: method(0, 0, (_, l) => l.length ? l[Math.floor(Math.random() * l.length)] : null),
  flatMap: method(1, 1, (loc, l, [fn]) => l.flatMap((x, i) => invoke(loc, fn, [x, i]))),
  findLast: method(1, 1, (loc, l, [fn]) => l.findLast((x, i) => isTruthy(invoke(loc, fn, [x, i]))) ?? null),
  lastIndexOf: method(1, 1, (_, l, [item]) => {
    const i = l.lastIndexOf(item);
    return i < 0 ? null : i;
  }),
  minBy: method(1, 1, (loc, l, [fn]) => byKey(loc, l, fn, -1)),
  maxBy: method(1, 1, (loc, l, [fn]) => byKey(loc, l, fn, 1)),
  sumBy: method(1, 1, (loc, l, [fn]) => sum(loc, l.map((x) => invoke(loc, fn, [x])))),
  partition: method(1, 1, (loc, l, [fn]) => {
    const yes = [];
    const no = [];
    l.forEach((x, i) => (isTruthy(invoke(loc, fn, [x, i])) ? yes : no).push(x));
    return [yes, no];
  }),
  countBy: method(1, 1, (loc, l, [fn]) => {
    const counts = /* @__PURE__ */ new Map();
    for (const x of l) {
      const key = invoke(loc, fn, [x]);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  }),
  window: method(1, 1, (loc, l, [n]) => {
    const size = needInt(loc, n, "window()");
    if (size <= 0) fail(loc, "window() needs a size of at least 1");
    const out = [];
    for (let i = 0; i + size <= l.length; i++) out.push(l.slice(i, i + size));
    return out;
  }),
  fill: method(1, 1, (_, l, [value]) => l.fill(value)),
  shuffle: method(0, 0, (_, l) => shuffled(l)),
  same: method(1, 1, (_, l, [other]) => deepEqual(l, other))
};
var STRING_PROPS = {
  size: (s) => s.length,
  isEmpty: (s) => s.length === 0
};
var STRING_METHODS = {
  upper: method(0, 0, (_, s) => s.toUpperCase()),
  lower: method(0, 0, (_, s) => s.toLowerCase()),
  capitalize: method(0, 0, (_, s) => s.charAt(0).toUpperCase() + s.slice(1)),
  trim: method(0, 0, (_, s) => s.trim()),
  trimStart: method(0, 0, (_, s) => s.trimStart()),
  trimEnd: method(0, 0, (_, s) => s.trimEnd()),
  split: method(0, 1, (loc, s, args) => {
    if (args.length === 0 || args[0] === null) return s.trim() === "" ? [] : s.trim().split(/\s+/);
    const [sep] = args;
    if (sep instanceof RegExp) return s.split(sep);
    return s.split(needString(loc, sep, "split()"));
  }),
  words: method(0, 0, (_, s) => s.trim() === "" ? [] : s.trim().split(/\s+/)),
  lines: method(0, 0, (_, s) => s === "" ? [] : s.split(/\r?\n/)),
  chars: method(0, 0, (_, s) => [...s]),
  has: method(1, 1, (loc, s, [part]) => part instanceof RegExp ? toRegExp(loc, part, "has()", false).test(s) : s.includes(needString(loc, part, "has()"))),
  startsWith: method(1, 1, (loc, s, [p]) => s.startsWith(needString(loc, p, "startsWith()"))),
  endsWith: method(1, 1, (loc, s, [p]) => s.endsWith(needString(loc, p, "endsWith()"))),
  indexOf: method(1, 2, (loc, s, [part, from = 0]) => {
    const i = s.indexOf(needString(loc, part, "indexOf()"), needInt(loc, from, "indexOf()"));
    return i < 0 ? null : i;
  }),
  lastIndexOf: method(1, 1, (loc, s, [part]) => {
    const i = s.lastIndexOf(needString(loc, part, "lastIndexOf()"));
    return i < 0 ? null : i;
  }),
  replace: method(2, 2, (loc, s, [from, to]) => replaceText(loc, s, from, to, true)),
  replaceFirst: method(2, 2, (loc, s, [from, to]) => replaceText(loc, s, from, to, false)),
  slice: method(1, 2, (loc, s, [start, end]) => s.slice(needInt(loc, start, "slice()"), end === void 0 || end === null ? void 0 : needInt(loc, end, "slice()"))),
  repeat: method(1, 1, (loc, s, [n]) => {
    const times2 = needInt(loc, n, "repeat()");
    if (times2 < 0) fail(loc, "repeat() needs 0 or more");
    return s.repeat(times2);
  }),
  padStart: method(1, 2, (loc, s, [n, fill = " "]) => s.padStart(needInt(loc, n, "padStart()"), needString(loc, fill, "padStart()"))),
  padEnd: method(1, 2, (loc, s, [n, fill = " "]) => s.padEnd(needInt(loc, n, "padEnd()"), needString(loc, fill, "padEnd()"))),
  reverse: method(0, 0, (_, s) => [...s].reverse().join("")),
  matches: method(1, 1, (loc, s, [p]) => toRegExp(loc, p, "matches()", false).test(s)),
  find: method(1, 1, (loc, s, [p]) => toRegExp(loc, p, "find()", false).exec(s)?.[0] ?? null),
  findAll: method(1, 1, (loc, s, [p]) => [...s.matchAll(toRegExp(loc, p, "findAll()", true))].map((m) => m[0])),
  count: method(1, 1, (loc, s, [p]) => [...s.matchAll(toRegExp(loc, p, "count()", true))].length),
  code: method(0, 1, (loc, s, [i = 0]) => s.codePointAt(needInt(loc, i, "code()")) ?? null),
  num: method(0, 0, (_, s) => toNumber(s)),
  same: method(1, 1, (_, s, [other]) => s === other),
  compare: method(1, 2, (loc, s, [other, language = "en"]) => Math.sign(s.localeCompare(needString(loc, other, "compare()"), needString(loc, language, "compare()"), { sensitivity: "base" }))),
  normalize: method(0, 0, (_, s) => s.normalize("NFC")),
  plain: method(0, 0, (_, s) => s.normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "")),
  isBlank: method(0, 0, (_, s) => s.trim() === ""),
  center: method(1, 2, (loc, s, [n, fill = " "]) => {
    const width = needInt(loc, n, "center()");
    const f = needString(loc, fill, "center()");
    const left = Math.floor(Math.max(0, width - s.length) / 2);
    return s.padStart(s.length + left, f).padEnd(width, f);
  })
};
function replaceText(loc, s, from, to, all) {
  const re = toRegExp(loc, from, all ? "replace()" : "replaceFirst()", all);
  if (typeof to === "function") return s.replace(re, (match) => str(invoke(loc, to, [match])));
  const replacement = needString(loc, to, "replace()");
  return s.replace(re, () => replacement);
}
function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value.trim().replace(/_/g, ""));
    return Number.isNaN(n) ? null : n;
  }
  if (typeof value === "boolean") return value ? 1 : 0;
  return null;
}
var NUMBER_PROPS = {
  isWhole: (n) => Number.isInteger(n)
};
var NUMBER_METHODS = {
  round: method(0, 1, (loc, n, [digits = 0]) => {
    const f = 10 ** needInt(loc, digits, "round()");
    return Math.round(n * f) / f;
  }),
  floor: method(0, 0, (_, n) => Math.floor(n)),
  ceil: method(0, 0, (_, n) => Math.ceil(n)),
  abs: method(0, 0, (_, n) => Math.abs(n)),
  fixed: method(0, 1, (loc, n, [digits = 0]) => n.toFixed(needInt(loc, digits, "fixed()"))),
  clamp: method(2, 2, (loc, n, [lo, hi]) => Math.min(Math.max(n, needNumber(loc, lo, "clamp()")), needNumber(loc, hi, "clamp()"))),
  sqrt: method(0, 0, (_, n) => Math.sqrt(n)),
  format: method(0, 2, (loc, n, [digits, locale = "en"]) => {
    const d = digits === void 0 || digits === null ? void 0 : needInt(loc, digits, "format()");
    try {
      return n.toLocaleString(needString(loc, locale, "format()"), { minimumFractionDigits: d, maximumFractionDigits: d ?? 20 });
    } catch {
      fail(loc, `format() doesn't know the language "${String(locale)}". Try "en" or "fr"`);
    }
  })
};
var MAP_PROPS = {
  size: (m) => m.size,
  isEmpty: (m) => m.size === 0
};
var MAP_METHODS = {
  keys: method(0, 0, (_, m) => [...m.keys()]),
  values: method(0, 0, (_, m) => [...m.values()]),
  entries: method(0, 0, (_, m) => [...m].map(([k, v]) => [k, v])),
  has: method(1, 1, (_, m, [k]) => m.has(k)),
  get: method(1, 2, (_, m, [k, fallback = null]) => m.has(k) ? m.get(k) : fallback),
  set: method(2, 2, (_, m, [k, v]) => (m.set(k, v), m)),
  remove: method(1, 1, (_, m, [k]) => m.delete(k)),
  clear: method(0, 0, (_, m) => (m.clear(), m)),
  copy: method(0, 0, (_, m) => new Map(m)),
  merge: method(1, Infinity, (loc, m, others) => new Map([...m, ...others.flatMap((o) => entriesOf(loc, o, "merge()"))])),
  each: method(1, 1, (loc, m, [fn]) => {
    for (const [k, v] of m) invoke(loc, fn, [k, v]);
    return null;
  }),
  filter: method(1, 1, (loc, m, [fn]) => new Map([...m].filter(([k, v]) => isTruthy(invoke(loc, fn, [k, v]))))),
  mapValues: method(1, 1, (loc, m, [fn]) => new Map([...m].map(([k, v]) => [k, invoke(loc, fn, [v, k])]))),
  same: method(1, 1, (_, m, [other]) => deepEqual(m, other))
};
var SET_PROPS = {
  size: (s) => s.size,
  isEmpty: (s) => s.size === 0
};
function needSet(loc, v, what) {
  if (v instanceof Set) return v;
  if (Array.isArray(v)) return new Set(v);
  fail(loc, `${what} needs a set or list, but got ${typeName(v)}`);
}
var SET_METHODS = {
  add: method(1, Infinity, (_, s, items) => (items.forEach((x) => s.add(x)), s)),
  has: method(1, 1, (_, s, [x]) => s.has(x)),
  remove: method(1, 1, (_, s, [x]) => s.delete(x)),
  clear: method(0, 0, (_, s) => (s.clear(), s)),
  list: method(0, 0, (_, s) => [...s]),
  copy: method(0, 0, (_, s) => new Set(s)),
  each: method(1, 1, (loc, s, [fn]) => {
    for (const x of s) invoke(loc, fn, [x]);
    return null;
  }),
  union: method(1, 1, (loc, s, [o]) => /* @__PURE__ */ new Set([...s, ...needSet(loc, o, "union()")])),
  intersect: method(1, 1, (loc, s, [o]) => {
    const other = needSet(loc, o, "intersect()");
    return new Set([...s].filter((x) => other.has(x)));
  }),
  difference: method(1, 1, (loc, s, [o]) => {
    const other = needSet(loc, o, "difference()");
    return new Set([...s].filter((x) => !other.has(x)));
  }),
  same: method(1, 1, (_, s, [other]) => deepEqual(s, other))
};
var RANGE_PROPS = {
  size: (r) => r.size,
  isEmpty: (r) => r.size === 0,
  start: (r) => r.start,
  end: (r) => r.end,
  step: (r) => r.step
};
var RANGE_METHODS = {
  has: method(1, 1, (_, r, [x]) => r.has(x)),
  list: method(0, 0, (_, r) => [...r])
};
var PATTERN_PROPS = {
  source: (p) => p.source,
  flags: (p) => p.flags
};
var PATTERN_METHODS = {
  test: method(1, 1, (loc, p, [s]) => new RegExp(p.source, p.flags.replace("g", "")).test(needString(loc, s, "test()")))
};
var LIST_TYPE = { label: "Lists", props: LIST_PROPS, methods: LIST_METHODS };
var STRING_TYPE = { label: "Text", props: STRING_PROPS, methods: STRING_METHODS };
var NUMBER_TYPE = { label: "Numbers", props: NUMBER_PROPS, methods: NUMBER_METHODS };
var MAP_TYPE = { label: "Maps", props: MAP_PROPS, methods: MAP_METHODS };
var SET_TYPE = { label: "Sets", props: SET_PROPS, methods: SET_METHODS };
var RANGE_TYPE = {
  label: "Ranges",
  props: RANGE_PROPS,
  methods: RANGE_METHODS,
  fallback: { convert: (r) => [...r], methods: LIST_METHODS }
};
var PATTERN_TYPE = { label: "Patterns", props: PATTERN_PROPS, methods: PATTERN_METHODS };
var JS_NAMES = {
  length: "size",
  includes: "has",
  contains: "has",
  push: "add",
  append: "add",
  unshift: "addFirst",
  shift: "popFirst",
  forEach: "each",
  some: "any",
  every: "all",
  toUpperCase: "upper",
  toLowerCase: "lower",
  substring: "slice",
  substr: "slice",
  charAt: "text[i]",
  charCodeAt: "code",
  codePointAt: "code",
  toString: "str(value)",
  toFixed: "fixed",
  concat: "+",
  trimLeft: "trimStart",
  trimRight: "trimEnd",
  delete: "remove",
  strip: "trim",
  extend: "addAll",
  len: "size",
  flatMap: "map() then flat()",
  splice: "insert() or removeAt()"
};
function unknownMember(loc, type, name) {
  const known = [...Object.keys(type.props), ...Object.keys(type.methods)];
  const exists = (n) => known.includes(n) || !/^[A-Za-z]+$/.test(n);
  const jsName = Object.hasOwn(JS_NAMES, name) ? name : closest(name, Object.keys(JS_NAMES));
  const fromJs = jsName && exists(JS_NAMES[jsName]) ? JS_NAMES[jsName] : null;
  const hint = fromJs ?? closest(name, known);
  const verb = type.label === "Text" ? "doesn't" : "don't";
  fail(loc, `${type.label} ${verb} have '${name}'${hint ? `. Did you mean '${hint}'?` : ""}`);
}
function callMethod(loc, type, self, name, args) {
  let impl = Object.hasOwn(type.methods, name) ? type.methods[name] : void 0;
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
    const expected = impl.min === impl.max ? plural(impl.min, "argument") : impl.max === Infinity ? `at least ${plural(impl.min, "argument")}` : `${impl.min} to ${impl.max} arguments`;
    fail(loc, `${name}() expects ${expected} but got ${args.length}`);
  }
  return impl.fn(loc, target, args);
}

// src/runtime/ops.ts
var truthy = (v) => v !== null && v !== false && v !== void 0;
var eq = (a, b) => {
  if (a === b || a == null && b == null) return true;
  if (a instanceof Base) {
    const equals = findMember(a, "equals");
    if (equals && typeof equals.value === "function") return truthy(equals.value.call(a, b));
  }
  return false;
};
var OPERATOR_METHODS = { "+": "plus", "-": "minus", "*": "times", "/": "divide", "%": "mod" };
function kindOperator(loc, op, a, b) {
  if (!(a instanceof Base)) return void 0;
  const name = OPERATOR_METHODS[op];
  const m = name ? findMember(a, name) : void 0;
  if (!m || typeof m.value !== "function") return void 0;
  return { value: m.value.call(a, b) ?? null };
}
function noKindOperator(loc, op, a) {
  if (a instanceof Base && OPERATOR_METHODS[op]) {
    fail(loc, `${kindName(a.constructor)} can't use '${op}'. Give it a ${OPERATOR_METHODS[op]}(other) method`);
  }
}
function bothNumbers(loc, op, a, b) {
  noKindOperator(loc, op, a);
  if (typeof a !== "number" || typeof b !== "number") {
    fail(loc, `'${op}' needs two numbers, but got ${typeName(a)} and ${typeName(b)}`);
  }
}
function bigMath(loc, op, a, b) {
  const aBig = typeof a === "bigint";
  const bBig = typeof b === "bigint";
  if (!aBig && !bBig) return void 0;
  if (aBig !== bBig) {
    if (typeof a === "number" || typeof b === "number") {
      fail(loc, `Can't mix big and normal numbers with '${op}'. Convert one with big(x) or num(x)`);
    }
    return void 0;
  }
  const x = a;
  const y = b;
  switch (op) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
    case "%":
      if (y === 0n) fail(loc, "Division by zero");
      return op === "/" ? x / y : x % y;
    case "**":
      if (y < 0n) fail(loc, "A big number can't be raised to a negative power");
      return x ** y;
  }
  return void 0;
}
function add(loc, a, b) {
  if (a instanceof Base) {
    const r = kindOperator(loc, "+", a, b);
    if (r) return r.value;
  }
  if (typeof a === "number" && typeof b === "number") return a + b;
  if (typeof a === "string" || typeof b === "string") return str(a) + str(b);
  if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b];
  const big = bigMath(loc, "+", a, b);
  if (big !== void 0) return big;
  noKindOperator(loc, "+", a);
  fail(loc, `Can't add ${typeName(a)} and ${typeName(b)}`);
}
function sub(loc, a, b) {
  if (a instanceof Base) {
    const r = kindOperator(loc, "-", a, b);
    if (r) return r.value;
  }
  if (typeof a === "number" && typeof b === "number") return a - b;
  const big = bigMath(loc, "-", a, b);
  if (big !== void 0) return big;
  bothNumbers(loc, "-", a, b);
}
function mul(loc, a, b) {
  if (a instanceof Base) {
    const r = kindOperator(loc, "*", a, b);
    if (r) return r.value;
  }
  if (typeof a === "number" && typeof b === "number") return a * b;
  if (typeof a === "string" && typeof b === "number" && Number.isInteger(b) && b >= 0) return a.repeat(b);
  if (typeof b === "string" && typeof a === "number" && Number.isInteger(a) && a >= 0) return b.repeat(a);
  if (Array.isArray(a) && typeof b === "number" && Number.isInteger(b) && b >= 0) return Array.from({ length: b }, () => a).flat();
  const big = bigMath(loc, "*", a, b);
  if (big !== void 0) return big;
  noKindOperator(loc, "*", a);
  fail(loc, `'*' needs two numbers, but got ${typeName(a)} and ${typeName(b)}`);
}
function div(loc, a, b) {
  if (a instanceof Base) {
    const r = kindOperator(loc, "/", a, b);
    if (r) return r.value;
  }
  const big = bigMath(loc, "/", a, b);
  if (big !== void 0) return big;
  bothNumbers(loc, "/", a, b);
  if (b === 0) fail(loc, "Division by zero");
  return a / b;
}
function mod(loc, a, b) {
  if (a instanceof Base) {
    const r = kindOperator(loc, "%", a, b);
    if (r) return r.value;
  }
  const big = bigMath(loc, "%", a, b);
  if (big !== void 0) return big;
  bothNumbers(loc, "%", a, b);
  if (b === 0) fail(loc, "Division by zero");
  return a % b;
}
function pow(loc, a, b) {
  const big = bigMath(loc, "**", a, b);
  if (big !== void 0) return big;
  bothNumbers(loc, "**", a, b);
  return a ** b;
}
function neg(loc, a) {
  if (typeof a === "bigint") return -a;
  if (typeof a !== "number") fail(loc, `Can't make ${typeName(a)} negative`);
  return -a;
}
function bitwise(op, f) {
  return (loc, a, b) => {
    bothNumbers(loc, op, a, b);
    return f(a, b);
  };
}
var band = bitwise("&", (a, b) => a & b);
var bor = bitwise("|", (a, b) => a | b);
var bxor = bitwise("^", (a, b) => a ^ b);
var shl = bitwise("<<", (a, b) => a << b);
var shr = bitwise(">>", (a, b) => a >> b);
function bnot(loc, a) {
  if (typeof a !== "number") fail(loc, `'~' needs a number, but got ${typeName(a)}`);
  return ~a;
}
function kindCompare(loc, a, b) {
  if (!(a instanceof Base)) return void 0;
  const m = findMember(a, "compare");
  if (!m || typeof m.value !== "function") return void 0;
  const r = m.value.call(a, b);
  if (typeof r !== "number") fail(loc, `${kindName(a.constructor)}.compare() must give back a number, but gave ${typeName(r)}`);
  return r;
}
function comparable(loc, a, b) {
  const numeric = (v) => typeof v === "number" || typeof v === "bigint";
  const ok = numeric(a) && numeric(b) || typeof a === "string" && typeof b === "string";
  if (!ok && a instanceof Base) fail(loc, `${kindName(a.constructor)} can't be compared. Give it a compare(other) method`);
  if (!ok) fail(loc, `Can't compare ${typeName(a)} with ${typeName(b)}`);
}
function lt(loc, a, b) {
  const byKind = kindCompare(loc, a, b);
  if (byKind !== void 0) return byKind < 0;
  comparable(loc, a, b);
  return a < b;
}
function le(loc, a, b) {
  const byKind = kindCompare(loc, a, b);
  if (byKind !== void 0) return byKind <= 0;
  comparable(loc, a, b);
  return a <= b;
}
function gt(loc, a, b) {
  const byKind = kindCompare(loc, a, b);
  if (byKind !== void 0) return byKind > 0;
  comparable(loc, a, b);
  return a > b;
}
function ge(loc, a, b) {
  const byKind = kindCompare(loc, a, b);
  if (byKind !== void 0) return byKind >= 0;
  comparable(loc, a, b);
  return a >= b;
}
var BINARY = {
  "+": add,
  "-": sub,
  "*": mul,
  "/": div,
  "%": mod,
  "**": pow
};
function is(loc, value, kind) {
  if (!isKind(kind)) fail(loc, `'is' needs a kind on the right, like: pet is Dog. Got ${typeName(kind)}`);
  return value instanceof kind;
}
function isIn(loc, item, collection) {
  if (Array.isArray(collection)) return collection.includes(item);
  if (typeof collection === "string") {
    if (typeof item !== "string") fail(loc, `Can only look for text in text, but got ${typeName(item)}`);
    return collection.includes(item);
  }
  if (collection instanceof Map || collection instanceof Set) return collection.has(item);
  if (collection instanceof PitRange) return collection.has(item);
  if (collection instanceof Base) return typeof item === "string" && (Object.hasOwn(collection, item) || findMember(collection, item) !== void 0);
  fail(loc, `Can't look inside ${typeName(collection)} with 'in'`);
}
function range(loc, from, to, inclusive, step) {
  if (typeof from !== "number" || typeof to !== "number") {
    fail(loc, `A range needs numbers, but got ${typeName(from)}..${typeName(to)}`);
  }
  if (step !== null) {
    if (typeof step !== "number") fail(loc, `'by' needs a number, but got ${typeName(step)}`);
    if (step === 0) fail(loc, "A range can't go 'by 0'");
  }
  return new PitRange(from, to, inclusive, step);
}
function rangeEnds(loc, from, to) {
  if (typeof from !== "number" || typeof to !== "number") {
    fail(loc, `A range needs numbers, but got ${typeName(from)}..${typeName(to)}`);
  }
}
function rangeStep(loc, step) {
  if (typeof step !== "number") fail(loc, `'by' needs a number, but got ${typeName(step)}`);
  if (step === 0) fail(loc, "A range can't go 'by 0'");
  return step;
}
function builtinType(value) {
  if (Array.isArray(value)) return LIST_TYPE;
  switch (typeof value) {
    case "string":
      return STRING_TYPE;
    case "number":
      return NUMBER_TYPE;
  }
  if (value instanceof Map) return MAP_TYPE;
  if (value instanceof Set) return SET_TYPE;
  if (value instanceof PitRange) return RANGE_TYPE;
  if (value instanceof RegExp) return PATTERN_TYPE;
  return null;
}
function boundBuiltin(type, self, name) {
  const impl = Object.hasOwn(type.methods, name) ? type.methods[name] : type.fallback && Object.hasOwn(type.fallback.methods, name) ? type.fallback.methods[name] : null;
  if (!impl) return null;
  const target = Object.hasOwn(type.methods, name) ? self : type.fallback.convert(self);
  return setFnMeta((loc, ...args) => impl.fn(loc, target, args), {
    name,
    min: impl.min,
    max: impl.max,
    native: true
  });
}
function bindMethod(fn, self) {
  const bound = fn.bind(self);
  for (const s of Object.getOwnPropertySymbols(fn)) {
    Object.defineProperty(bound, s, { value: fn[s], configurable: true });
  }
  return bound;
}
function checkPrivate(loc, obj, name, inside) {
  if (!inside && name.length > 1 && name[0] === "_") {
    fail(loc, `'${name}' is private to ${kindName(obj.constructor)}. Only its own methods can use it`);
  }
}
function get(loc, obj, name, inside) {
  if (obj === null || obj === void 0) fail(loc, `Can't read '${name}' of nil`);
  const type = builtinType(obj);
  if (type) {
    if (obj instanceof Map && obj.has(name)) return obj.get(name);
    if (Object.hasOwn(type.props, name)) return type.props[name](obj);
    const bound = boundBuiltin(type, obj, name);
    if (bound) return bound;
    if (obj instanceof Map) return null;
    unknownMember(loc, type, name);
  }
  if (obj instanceof Base) {
    checkPrivate(loc, obj, name, inside);
    return getField(loc, obj, name);
  }
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
  const value = obj[name];
  return typeof value === "function" ? value.bind(obj) : value ?? null;
}
function getField(loc, obj, name) {
  if (Object.hasOwn(obj, name)) return obj[name] ?? null;
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
function getOpt(loc, obj, name, inside) {
  return obj === null || obj === void 0 ? null : get(loc, obj, name, inside);
}
function set(loc, obj, name, value, inside) {
  if (obj === null || obj === void 0) fail(loc, `Can't set '${name}' on nil`);
  if (obj instanceof Map) {
    obj.set(name, value);
    return value;
  }
  if (obj instanceof Base) {
    checkPrivate(loc, obj, name, inside);
    if (name === "__proto__" || name === "constructor") fail(loc, `'${name}' can't be used as a field name`);
    if (isLockedField(obj, name, false)) fail(loc, `Cannot change locked field '${name}'`);
    const d = findMember(obj, name);
    if (d && (d.get || d.set)) {
      if (!d.set) fail(loc, `'${name}' can only be read`);
      d.set.call(obj, value);
      return value;
    }
    obj[name] = value;
    return value;
  }
  if (isKind(obj)) {
    if (isLockedField(obj, name, true)) fail(loc, `Cannot change locked '${kindName(obj)}.${name}'`);
    obj[name] = value;
    return value;
  }
  const type = builtinType(obj);
  if (type || typeof obj !== "object") {
    const hint = Array.isArray(obj) ? ". Lists hold items, like: list[0] = x" : "";
    fail(loc, `Can't set '${name}' on ${article(typeName(obj))}${hint}`);
  }
  obj[name] = value;
  return value;
}
function listIndex(loc, index2, what) {
  if (typeof index2 !== "number" || !Number.isInteger(index2)) {
    fail(loc, `${what} positions must be whole numbers, but got ${typeof index2 === "number" ? index2 : typeName(index2)}`);
  }
  return index2;
}
function index(loc, obj, i) {
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
  if (obj === null || obj === void 0) fail(loc, "Can't take an item from nil");
  fail(loc, `Can't take an item from ${article(typeName(obj))}`);
}
function setIndex(loc, obj, i, value) {
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
  if (obj === null || obj === void 0) fail(loc, "Can't set an item on nil");
  fail(loc, `Can't set an item on ${article(typeName(obj))}`);
}
function update(loc, obj, name, op, value, inside) {
  return set(loc, obj, name, BINARY[op](loc, get(loc, obj, name, inside), value), inside);
}
function updateIndex(loc, obj, i, op, value) {
  return setIndex(loc, obj, i, BINARY[op](loc, index(loc, obj, i), value));
}
function callMember(loc, obj, name, args, inside) {
  if (obj === null || obj === void 0) fail(loc, `Can't call '${name}' on nil`);
  const type = builtinType(obj);
  if (type) {
    if (obj instanceof Map && obj.has(name)) return call(loc, obj.get(name), args);
    return callMethod(loc, type, obj, name, args);
  }
  if (obj instanceof Base) {
    checkPrivate(loc, obj, name, inside);
    if (Object.hasOwn(obj, name)) return call(loc, obj[name], args);
    const d = findMember(obj, name);
    if (!d) {
      const names = memberNames(obj);
      const hint = closest(name, names);
      fail(loc, `${kindName(obj.constructor)} has no method '${name}'${hint ? `. Did you mean '${hint}'?` : ""}`);
    }
    const fn2 = d.get ? d.get.call(obj) : d.value;
    if (typeof fn2 !== "function") fail(loc, `'${name}' is ${article(typeName(fn2))}, not a method`);
    if (d.get) return call(loc, fn2, args);
    checkArity(loc, fn2, args.length);
    callStack.push(loc);
    try {
      return fn2.apply(obj, args) ?? null;
    } finally {
      callStack.pop();
    }
  }
  if (typeof obj === "function") {
    if (isKind(obj)) {
      const d = findStatic(obj, name);
      if (!d) fail(loc, `Kind ${kindName(obj)} has no shared '${name}'`);
      const fn2 = d.get ? d.get.call(obj) : d.value;
      if (typeof fn2 !== "function") fail(loc, `'${name}' is ${article(typeName(fn2))}, not a function`);
      checkArity(loc, fn2, args.length);
      return fn2.apply(obj, args) ?? null;
    }
    fail(loc, `A function has no method '${name}'`);
  }
  if (typeof obj === "boolean") fail(loc, `A bool has no method '${name}'`);
  const fn = obj[name];
  if (typeof fn !== "function") fail(loc, `This ${typeName(obj)} has no method '${name}'`);
  return fn.apply(obj, args) ?? null;
}
function memberNames(obj) {
  const names = new Set(Object.keys(obj));
  for (let p = Object.getPrototypeOf(obj); p && p !== Base.prototype; p = Object.getPrototypeOf(p)) {
    for (const n of Object.getOwnPropertyNames(p)) if (n !== "constructor") names.add(n);
  }
  return [...names];
}
function callOpt(loc, f, args) {
  return f === null || f === void 0 ? null : call(loc, f, args);
}
function times(loc, n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
    fail(loc, `'times' needs a whole number of 0 or more, but got ${typeof n === "number" ? n : typeName(n)}`);
  }
  return n;
}
function callMemberOpt(loc, obj, name, args, inside) {
  return obj === null || obj === void 0 ? null : callMember(loc, obj, name, args, inside);
}
function callUp(loc, fn, me, name, args) {
  if (typeof fn !== "function") fail(loc, `The parent kind has no method '${name}'`);
  checkArity(loc, fn, args.length);
  return fn.apply(me, args) ?? null;
}
function parentKind(loc, kind) {
  if (!isKind(kind)) fail(loc, `A kind can only come 'from' another kind, but got ${typeName(kind)}`);
  return kind;
}
var LOCKED = Symbol("pit.lockedFields");
function isLockedField(obj, name, shared) {
  const kind = shared ? obj : obj.constructor;
  for (let k = kind; k && k !== Base; k = Object.getPrototypeOf(k)) {
    const locked = Object.hasOwn(k, LOCKED) ? k[LOCKED] : void 0;
    if (locked?.some(([n, s]) => n === name && s === shared)) return true;
  }
  return false;
}
function defineKind(kind, name, methods, locked = []) {
  Object.defineProperty(kind, KIND, { value: name, configurable: true });
  Object.defineProperty(kind, LOCKED, { value: locked, configurable: true });
  for (const [method2, min, max, isShared] of methods) {
    const host = isShared ? kind : kind.prototype;
    const d = Object.getOwnPropertyDescriptor(host, method2);
    if (d && typeof d.value === "function") {
      setFnMeta(d.value, { name: `${name}.${method2}`, min, max });
    }
  }
}
function defineFn(f, name, min, max) {
  return setFnMeta(f, { name, min, max });
}
function* withIndex(items) {
  let i = 0;
  for (const x of items) yield [x, i++];
}
function iter(loc, value) {
  if (value === null || value === void 0) fail(loc, "Can't loop over nil");
  if (typeof value === "number") fail(loc, `Can't loop over a number. To count, use a range like: loop i in 0..${value}`);
  if (value instanceof Map) return value.keys();
  if (typeof value === "string" || typeof value === "object" && Symbol.iterator in value) return value;
  if (value instanceof Base) {
    const items = findMember(value, "items");
    if (items && typeof items.value === "function") return iter(loc, items.value.call(value));
    fail(loc, `Can't loop over ${kindName(value.constructor)}. Give it an items() method to make it loopable`);
  }
  fail(loc, `Can't loop over ${article(typeName(value))}`);
}
function pairs(loc, value) {
  if (value instanceof Map) return value.entries();
  return withIndex(iter(loc, value));
}
function asyncIter(loc, value) {
  if (value !== null && typeof value === "object" && Symbol.asyncIterator in value) return value;
  return iter(loc, value);
}
function spread(loc, value) {
  if (Array.isArray(value)) return value;
  if (value instanceof Map) fail(loc, "Can't spread a map into a list. Use map.keys(), map.values() or map.entries()");
  return [...iter(loc, value)];
}
function spreadEntries(loc, value) {
  if (value instanceof Map) return [...value];
  if (value instanceof Base) return Object.entries(value);
  if (value === null || value === void 0) return [];
  fail(loc, `Can only spread a map into a map, but got ${typeName(value)}`);
}
function unpackList(loc, value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === void 0) fail(loc, "Can't unpack nil into a list pattern");
  return spread(loc, value);
}
function unpackMap(loc, value) {
  if (value instanceof Map) {
    const out = /* @__PURE__ */ Object.create(null);
    for (const [k, v] of value) if (typeof k === "string") out[k] = v;
    return out;
  }
  if (value instanceof Base) return value;
  fail(loc, `Can't unpack ${typeName(value)} into a map pattern`);
}
function without(source, keys) {
  const out = /* @__PURE__ */ new Map();
  for (const [k, v] of Object.entries(source)) if (!keys.includes(k)) out.set(k, v);
  return out;
}
function matches(value, pattern) {
  if (pattern instanceof PitRange) return pattern.has(value);
  if (isKind(pattern)) return value instanceof pattern;
  return eq(value, pattern);
}
function raise(loc, value) {
  if (value instanceof ErrorValue) {
    ErrorValue.setLoc(value, loc);
    ErrorValue.setTrace(value, callStack);
    return value;
  }
  if (value instanceof Base) fail(loc, `Only errors can be raised. Make ${kindName(value.constructor)} come 'from Error'`);
  const e = ErrorValue.create(str(value), void 0, loc);
  ErrorValue.setTrace(e, callStack);
  return e;
}
function exportsMap(entries) {
  return new Map(entries);
}

// src/runtime/stdlib.ts
function native(name, min, max, fn) {
  return setFnMeta(fn, { name, min, max, native: true });
}
function module2(members) {
  return new Map(Object.entries(members));
}
function fromJson(value) {
  if (value === null || value === void 0) return null;
  if (Array.isArray(value)) return value.map(fromJson);
  if (typeof value === "object") return new Map(Object.entries(value).map(([k, v]) => [k, fromJson(v)]));
  return value;
}
function toJson(loc, value, seen = /* @__PURE__ */ new Set()) {
  if (value === null || value === void 0) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "bigint") return Number.isSafeInteger(Number(value)) ? Number(value) : String(value);
  if (typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "function") return void 0;
  if (seen.has(value)) fail(loc, "Can't turn a value that contains itself into JSON");
  seen.add(value);
  try {
    if (Array.isArray(value)) return value.map((v) => toJson(loc, v, seen) ?? null);
    if (value instanceof Set || value instanceof PitRange) return [...value].map((v) => toJson(loc, v, seen) ?? null);
    const entries = value instanceof Map ? [...value] : value instanceof ErrorValue ? [["name", value.name], ["message", value.message]] : value instanceof Base ? Object.entries(value) : [];
    const out = {};
    for (const [k, v] of entries) {
      const j = toJson(loc, v, seen);
      if (j !== void 0) out[str(k)] = j;
    }
    return out;
  } finally {
    seen.delete(value);
  }
}
var REPLY = "__pitcode_reply__";
function toResponse(loc, result) {
  let status = 200;
  let headers = {};
  let body = result;
  if (result instanceof Map && result.get(REPLY) === true) {
    status = result.get("status");
    body = result.get("body");
    const h = result.get("headers");
    if (h instanceof Map) headers = Object.fromEntries([...h].map(([k, v]) => [str(k).toLowerCase(), str(v)]));
  }
  if (typeof body === "string") {
    headers["content-type"] ??= /^\s*</.test(body) ? "text/html; charset=utf-8" : "text/plain; charset=utf-8";
    return { status, headers, body };
  }
  if (body === null || body === void 0) return { status: status === 200 ? 204 : status, headers, body: "" };
  headers["content-type"] ??= "application/json";
  return { status, headers, body: JSON.stringify(toJson(loc, body)) };
}
function makeEvents() {
  const listeners = /* @__PURE__ */ new Map();
  const add2 = (loc, name, fn, once) => {
    if (typeof fn !== "function") fail(loc, 'Give a function to call, like: bus.on("ready", data => say data)');
    const key = str(name);
    listeners.set(key, [...listeners.get(key) ?? [], { fn, once }]);
    return null;
  };
  return /* @__PURE__ */ new Map([
    ["on", native("on", 2, 2, (loc, name, fn) => add2(loc, name, fn, false))],
    ["once", native("once", 2, 2, (loc, name, fn) => add2(loc, name, fn, true))],
    ["off", native("off", 1, 2, (_, name, fn) => {
      const key = str(name);
      listeners.set(key, fn === void 0 ? [] : (listeners.get(key) ?? []).filter((l) => l.fn !== fn));
      return null;
    })],
    ["emit", native("emit", 1, Infinity, (loc, name, ...args) => {
      const key = str(name);
      const current = listeners.get(key) ?? [];
      listeners.set(key, current.filter((l) => !l.once));
      for (const l of current) invoke(loc, l.fn, args);
      return current.length;
    })],
    ["count", native("count", 1, 1, (_, name) => (listeners.get(str(name)) ?? []).length)]
  ]);
}
function deepCopy(value, seen) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);
  if (Array.isArray(value)) {
    const out = [];
    seen.set(value, out);
    for (const x of value) out.push(deepCopy(x, seen));
    return out;
  }
  if (value instanceof Map) {
    const out = /* @__PURE__ */ new Map();
    seen.set(value, out);
    for (const [k, v] of value) out.set(k, deepCopy(v, seen));
    return out;
  }
  if (value instanceof Set) {
    const out = /* @__PURE__ */ new Set();
    seen.set(value, out);
    for (const x of value) out.add(deepCopy(x, seen));
    return out;
  }
  if (value instanceof Base) {
    const out = Object.create(Object.getPrototypeOf(value));
    seen.set(value, out);
    for (const [k, v] of Object.entries(value)) out[k] = deepCopy(v, seen);
    return out;
  }
  return value;
}
function toDate(loc, ts) {
  const d = ts === void 0 || ts === null ? /* @__PURE__ */ new Date() : new Date(needNumber(loc, ts, "time"));
  if (Number.isNaN(d.getTime())) fail(loc, `${String(ts)} is not a valid time`);
  return d;
}
var pad = (n, width = 2) => String(n).padStart(width, "0");
var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatDate(d, pattern) {
  const tokens = {
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
    A: () => d.getHours() < 12 ? "AM" : "PM"
  };
  return pattern.replace(/YYYY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|HH|H|hh|h|mm|ss|SSS|A/g, (t) => tokens[t]());
}
function createBuiltins(host) {
  let nextTimer = 1;
  const timers = /* @__PURE__ */ new Map();
  const guarded = (loc, fn) => () => {
    try {
      const result = invoke(loc, fn, []);
      if (result instanceof Promise) result.catch((e) => host.reportError(e));
    } catch (e) {
      host.reportError(e);
    }
  };
  const systemOrFail = (loc) => {
    if (!host.system) fail(loc, "This can only run on a computer, not here (for example in the browser)");
    return host.system;
  };
  const fsOrFail = (loc) => {
    if (!host.fs) fail(loc, "Files can't be used here (for example in the browser)");
    return host.fs;
  };
  const files = module2({
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
    })
  });
  const numbersOf = (loc, args, what) => {
    const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
    return list.map((x) => needNumber(loc, x, what));
  };
  const unary = (name, f) => native(`math.${name}`, 1, 1, (loc, x) => f(needNumber(loc, x, `math.${name}()`)));
  const math = module2({
    PI: Math.PI,
    E: Math.E,
    TAU: Math.PI * 2,
    infinity: Infinity,
    maxInt: Number.MAX_SAFE_INTEGER,
    minInt: Number.MIN_SAFE_INTEGER,
    epsilon: Number.EPSILON,
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
    radians: unary("radians", (d) => d * Math.PI / 180),
    degrees: unary("degrees", (r) => r * 180 / Math.PI),
    log: native("math.log", 1, 2, (loc, x, base) => {
      const n = Math.log(needNumber(loc, x, "math.log()"));
      return base === void 0 ? n : n / Math.log(needNumber(loc, base, "math.log()"));
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
    clamp: native("math.clamp", 3, 3, (loc, x, lo, hi) => Math.min(Math.max(needNumber(loc, x, "math.clamp()"), needNumber(loc, lo, "math.clamp()")), needNumber(loc, hi, "math.clamp()"))),
    random: native("math.random", 0, 2, (loc, a, b) => {
      if (a === void 0) return Math.random();
      const lo = b === void 0 ? 0 : needInt(loc, a, "math.random()");
      const hi = needInt(loc, b === void 0 ? a : b, "math.random()");
      if (hi < lo) fail(loc, "math.random(low, high) needs low <= high");
      return lo + Math.floor(Math.random() * (hi - lo + 1));
    })
  });
  const json = module2({
    parse: native("json.parse", 1, 1, (loc, text) => {
      try {
        return fromJson(JSON.parse(needString(loc, text, "json.parse()")));
      } catch (e) {
        if (e instanceof ErrorValue) throw e;
        fail(loc, `That text is not valid JSON (${e.message})`);
      }
    }),
    text: native("json.text", 1, 2, (loc, value, spaces = 0) => JSON.stringify(toJson(loc, value) ?? null, null, needInt(loc, spaces, "json.text()")) ?? "null")
  });
  const time = module2({
    now: native("time.now", 0, 0, () => Date.now()),
    date: native("time.date", 0, 1, (loc, ts) => {
      const d = toDate(loc, ts);
      return /* @__PURE__ */ new Map([
        ["year", d.getFullYear()],
        ["month", d.getMonth() + 1],
        ["day", d.getDate()],
        ["hour", d.getHours()],
        ["minute", d.getMinutes()],
        ["second", d.getSeconds()],
        ["ms", d.getMilliseconds()],
        ["weekday", DAY_NAMES[d.getDay()]]
      ]);
    }),
    make: native("time.make", 3, 6, (loc, y, mo, d, h = 0, mi = 0, s = 0) => new Date(
      needInt(loc, y, "time.make()"),
      needInt(loc, mo, "time.make()") - 1,
      needInt(loc, d, "time.make()"),
      needInt(loc, h, "time.make()"),
      needInt(loc, mi, "time.make()"),
      needNumber(loc, s, "time.make()")
    ).getTime()),
    format: native("time.format", 1, 2, (loc, ts, pattern = "YYYY-MM-DD HH:mm") => formatDate(toDate(loc, ts), needString(loc, pattern, "time.format()"))),
    iso: native("time.iso", 0, 1, (loc, ts) => toDate(loc, ts).toISOString()),
    parse: native("time.parse", 1, 1, (loc, text) => {
      const t = Date.parse(needString(loc, text, "time.parse()"));
      return Number.isNaN(t) ? null : t;
    }),
    SECOND: 1e3,
    MINUTE: 6e4,
    HOUR: 36e5,
    DAY: 864e5
  });
  const toHeaders = (loc, h) => {
    if (h === null || h === void 0) return {};
    if (!(h instanceof Map)) fail(loc, `headers must be a map, but got ${typeName(h)}`);
    return Object.fromEntries([...h].map(([k, v]) => [str(k), str(v)]));
  };
  const fetchUrl = native("fetch", 1, 2, async (loc, url, options) => {
    const init = {};
    if (options !== void 0 && options !== null) {
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
    let res;
    try {
      res = await fetch(needString(loc, url, "fetch()"), init);
    } catch (e) {
      throw ErrorValue.create(`Couldn't fetch ${String(url)}: ${e.message}`, "NetworkError", loc);
    }
    return /* @__PURE__ */ new Map([
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
      })]
    ]);
  });
  return {
    Error: ErrorValue,
    math,
    json,
    time,
    files,
    args: [...host.args],
    env: new Map(Object.entries(host.env)),
    ask: native("ask", 0, 1, (_, prompt2) => host.readLine(prompt2 === void 0 ? "" : str(prompt2))),
    warn: native("warn", 0, Infinity, (_, ...values) => {
      host.writeError(values.map(str).join(" ") + "\n");
      return null;
    }),
    len: native("len", 1, 1, (loc, x) => {
      if (typeof x === "string" || Array.isArray(x)) return x.length;
      if (x instanceof Map || x instanceof Set) return x.size;
      if (x instanceof PitRange) return x.size;
      fail(loc, `len() needs text, a list, a map or a set, but got ${typeName(x)}`);
    }),
    str: native("str", 1, 1, (_, x) => str(x)),
    num: native("num", 1, 1, (_, x) => toNumber(x)),
    int: native("int", 1, 2, (loc, x, base) => {
      if (typeof x === "bigint") return Number(x);
      if (base !== void 0) {
        const b = needInt(loc, base, "int()");
        if (b < 2 || b > 36) fail(loc, "int() can read bases from 2 to 36");
        const n2 = Number.parseInt(needString(loc, x, "int()").trim().replace(/_/g, ""), b);
        return Number.isNaN(n2) ? null : n2;
      }
      const n = toNumber(x);
      return n === null ? null : Math.trunc(n);
    }),
    fields: native("fields", 1, 1, (loc, x) => {
      if (x instanceof Map) return new Map(x);
      if (x instanceof Base) return new Map(Object.entries(x));
      fail(loc, `fields() needs a kind's instance or a map, but got ${typeName(x)}`);
    }),
    type: native("type", 1, 1, (_, x) => typeName(x)),
    clock: native("clock", 0, 0, () => Date.now() / 1e3),
    random: native("random", 0, 0, () => Math.random()),
    list: native("list", 0, 1, (loc, x) => x === void 0 || x === null ? [] : [...iter(loc, x)]),
    set: native("set", 0, 1, (loc, x) => new Set(x === void 0 || x === null ? [] : iter(loc, x))),
    range: native("range", 1, 3, (loc, a, b, step) => {
      const [start, end] = b === void 0 ? [0, a] : [a, b];
      const s = step === void 0 ? null : needNumber(loc, step, "range()");
      if (s === 0) fail(loc, "range() can't step by 0");
      return new PitRange(needNumber(loc, start, "range()"), needNumber(loc, end, "range()"), false, s);
    }),
    pattern: native("pattern", 1, 2, (loc, source, flags = "") => {
      try {
        return new RegExp(needString(loc, source, "pattern()"), needString(loc, flags, "pattern()"));
      } catch (e) {
        fail(loc, `That pattern is not valid: ${e.message}`);
      }
    }),
    same: native("same", 2, 2, (_, a, b) => deepEqual(a, b)),
    big: native("big", 1, 1, (loc, x) => {
      if (typeof x === "bigint") return x;
      if (typeof x === "number") {
        if (!Number.isInteger(x)) fail(loc, `big() needs a whole number, but got ${x}`);
        return BigInt(x);
      }
      if (typeof x === "string" && /^\s*-?\d[\d_]*\s*$/.test(x)) return BigInt(x.trim().replace(/_/g, ""));
      fail(loc, `big() needs a whole number or text of digits, but got ${typeName(x)}`);
    }),
    test: native("test", 2, 2, (loc, name, fn) => {
      const label = str(name);
      const passed = () => {
        host.tests.passed++;
        host.write(`\u2713 ${label}
`);
      };
      const failed = (e) => {
        host.tests.failed++;
        host.write(`\u2717 ${label}
    ${host.describeError(e)}
`);
      };
      try {
        const result = invoke(loc, fn, []);
        if (result instanceof Promise) {
          const done = result.then(passed, failed);
          host.tests.pending.push(done);
          return done.then(() => null);
        }
        passed();
      } catch (e) {
        failed(e);
      }
      return null;
    }),
    expect: native("expect", 2, 3, (loc, actual, wanted, message) => {
      if (!deepEqual(actual, wanted)) {
        const why = `expected ${repr(wanted)} but got ${repr(actual)}`;
        throw ErrorValue.create(message === void 0 ? why : `${str(message)}: ${why}`, "CheckError", loc);
      }
      return null;
    }),
    copy: native("copy", 1, 1, (_, x) => deepCopy(x, /* @__PURE__ */ new Map())),
    url: module2({
      encode: native("url.encode", 1, 1, (loc, text) => encodeURIComponent(needString(loc, text, "url.encode()"))),
      decode: native("url.decode", 1, 1, (loc, text) => {
        try {
          return decodeURIComponent(needString(loc, text, "url.decode()"));
        } catch {
          fail(loc, "That text is not a valid encoded web address");
        }
      }),
      query: native("url.query", 1, 1, (loc, params) => {
        if (!(params instanceof Map)) fail(loc, `url.query() needs a map, like {q: "coral"}, but got ${typeName(params)}`);
        return [...params].map(([k, v]) => `${encodeURIComponent(str(k))}=${encodeURIComponent(str(v))}`).join("&");
      })
    }),
    check: native("check", 1, 2, (loc, condition, message) => {
      if (!truthy(condition)) throw ErrorValue.create(message === void 0 ? "Check failed" : str(message), "CheckError", loc);
      return null;
    }),
    char: native("char", 1, 1, (loc, code) => {
      const n = needInt(loc, code, "char()");
      if (n < 0 || n > 1114111) fail(loc, `${n} is not a character code`);
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
      const timer = timers.get(id);
      timer?.cancel();
      timers.delete(id);
      return timer !== void 0;
    }),
    all: native("all", 1, 1, (loc, items) => {
      if (!Array.isArray(items)) fail(loc, `all() needs a list, but got ${typeName(items)}`);
      return Promise.all(items);
    }),
    settled: native("settled", 1, 1, async (loc, items) => {
      if (!Array.isArray(items)) fail(loc, `settled() needs a list, but got ${typeName(items)}`);
      const results = await Promise.allSettled(items);
      return results.map((r) => r.status === "fulfilled" ? /* @__PURE__ */ new Map([["ok", true], ["value", r.value ?? null]]) : /* @__PURE__ */ new Map([["ok", false], ["error", host.toError(r.reason)]]));
    }),
    first: native("first", 1, 1, (loc, items) => {
      if (!Array.isArray(items)) fail(loc, `first() needs a list, but got ${typeName(items)}`);
      return Promise.any(items).catch(() => {
        throw ErrorValue.create("Every one of them failed", "RuntimeError", loc);
      });
    }),
    events: native("events", 0, 0, () => makeEvents()),
    shell: native("shell", 1, 1, (loc, command) => {
      const system = systemOrFail(loc);
      const r = system.run(needString(loc, command, "shell()"));
      return /* @__PURE__ */ new Map([["out", r.out], ["err", r.err], ["code", r.code], ["ok", r.code === 0]]);
    }),
    web: module2({
      reply: native("web.reply", 1, 3, (loc, body, status = 200, headers = null) => /* @__PURE__ */ new Map([[REPLY, true], ["body", body], ["status", needInt(loc, status, "web.reply()")], ["headers", headers]])),
      serve: native("web.serve", 2, 2, async (loc, port, handler) => {
        const system = systemOrFail(loc);
        const server = await system.serve(needInt(loc, port, "web.serve()"), async (req) => {
          const request = /* @__PURE__ */ new Map([
            ["method", req.method],
            ["path", req.path],
            ["query", new Map(Object.entries(req.query))],
            ["headers", new Map(Object.entries(req.headers))],
            ["body", req.body],
            ["json", native("json", 0, 0, (l) => {
              try {
                return fromJson(JSON.parse(req.body));
              } catch {
                fail(l, "The request body is not valid JSON");
              }
            })]
          ]);
          try {
            return toResponse(loc, await invoke(loc, handler, [request]));
          } catch (e) {
            host.reportError(e);
            return { status: 500, headers: { "content-type": "text/plain; charset=utf-8" }, body: "Something went wrong" };
          }
        });
        return /* @__PURE__ */ new Map([
          ["port", server.port],
          ["stop", native("stop", 0, 0, () => (server.stop(), null))]
        ]);
      })
    }),
    race: native("race", 1, 1, (loc, items) => {
      if (!Array.isArray(items)) fail(loc, `race() needs a list, but got ${typeName(items)}`);
      return Promise.race(items);
    }),
    promise: native("promise", 1, 1, (loc, fn) => new Promise((resolve, reject) => {
      invoke(loc, fn, [
        native("done", 0, 1, (_, v = null) => (resolve(v), null)),
        native("fail", 0, 1, (l, why = "Promise failed") => (reject(why instanceof ErrorValue ? why : ErrorValue.create(str(why), void 0, l)), null))
      ]);
    })),
    fetch: fetchUrl,
    quit: native("quit", 0, 1, (loc, code = 0) => {
      host.exit(needInt(loc, code, "quit()"));
      return null;
    })
  };
}

// src/runtime/runtime.ts
function parse(source) {
  const tokens = new Lexer(source.replace(/^#!.*/, "")).tokenize();
  return new Parser(tokens).parseProgram();
}
hooks.showInstance = (value) => {
  const show2 = findMember(value, "show");
  if (!show2 || typeof show2.value !== "function") return void 0;
  return str(show2.value.call(value));
};
var Runtime = class {
  constructor(host) {
    this.host = host;
    this.builtins = createBuiltins({
      readLine: (prompt2) => host.readLine?.(prompt2) ?? null,
      writeError: (text) => (host.writeError ?? host.write)(text),
      env: host.env ?? {},
      fs: host.fs,
      args: host.args ?? [],
      exit: (code) => {
        if (host.exit) host.exit(code);
        else fail(this.helpers.p, "quit() can't be used here");
      },
      reportError: (e) => this.report(e),
      write: (text) => host.write(text),
      describeError: (e) => {
        const err = this.toPitError(e);
        return `${err.kind}: ${err.message}${err.line > 0 ? ` (${err.file ?? "line"}:${err.line})` : ""}`;
      },
      tests: this.tests,
      toError: (e) => this.toErrorValue(e),
      system: host.system
    });
    this.helpers = {
      p: 0,
      t: truthy,
      eq,
      add,
      sub,
      mul,
      div,
      mod,
      pow,
      neg,
      band,
      bor,
      bxor,
      shl,
      shr,
      bnot,
      lt,
      le,
      gt,
      ge,
      is,
      in: isIn,
      range,
      rangeEnds,
      rangeStep,
      g: get,
      g0: getOpt,
      s: set,
      i: index,
      si: setIndex,
      u: update,
      ui: updateIndex,
      c: call,
      c0: callOpt,
      m: callMember,
      m0: callMemberOpt,
      up: callUp,
      times,
      base: parentKind,
      kind: defineKind,
      fn: defineFn,
      Base,
      iter,
      pairs,
      aiter: asyncIter,
      sl: spread,
      se: spreadEntries,
      ul: unpackList,
      um: unpackMap,
      without,
      mt: matches,
      raise,
      ex: exportsMap,
      str,
      tick: this.makeTick(host.loopTimeLimitMs),
      say: (values) => {
        host.write(values.map(str).join(" ") + "\n");
        return null;
      },
      caught: (e) => this.toErrorValue(e),
      use: (loc, spec) => this.use(loc, spec),
      pick: (loc, mod2, names, path) => {
        const out = /* @__PURE__ */ Object.create(null);
        for (const n of names) {
          if (!mod2.has(n)) fail(loc, `"${path}" doesn't share '${n}'`);
          out[n] = mod2.get(n);
        }
        return out;
      }
    };
  }
  files = [{ name: "<unknown>", source: "" }];
  modules = /* @__PURE__ */ new Map();
  builtins;
  /** Helpers that compiled code calls as `$.name(...)`. `p` is the position of the running statement. */
  helpers;
  replGlobals = /* @__PURE__ */ new Map();
  replValues = /* @__PURE__ */ Object.create(null);
  /** Counts from `test(...)` calls. */
  tests = { passed: 0, failed: 0, pending: [] };
  /** Runs a program. Throws a PitError if it fails. */
  async run(source, name = "<input>") {
    try {
      await this.execute(source, name);
    } catch (e) {
      throw this.toPitError(e);
    }
  }
  /** Runs one REPL entry; names it creates stay visible to later entries. Returns the last expression's value. */
  async runRepl(source, name = "<repl>") {
    try {
      const fileId = this.register(name, source);
      const code = this.compileSource(source, name, fileId, this.replGlobals);
      return await this.load(code)(this.helpers, this.builtins, this.replValues);
    } catch (e) {
      throw this.toPitError(e);
    }
  }
  /** Waits for async tests to finish and gives the totals. */
  async testResults() {
    while (this.tests.pending.length) await this.tests.pending.shift();
    return { passed: this.tests.passed, failed: this.tests.failed };
  }
  /** The JavaScript a program compiles to (for `pitcode --js`). */
  compileToJs(source, name = "<input>") {
    const fileId = this.register(name, source);
    return this.compileSource(source, name, fileId);
  }
  register(name, source) {
    this.files.push({ name, source });
    return this.files.length - 1;
  }
  compileSource(source, name, fileId, repl) {
    try {
      return compile(parse(source), {
        fileId,
        builtins: Object.keys(this.builtins),
        repl,
        guardLoops: this.host.loopTimeLimitMs !== void 0
      });
    } catch (e) {
      if (e instanceof PitError) {
        e.file ??= name;
        e.source ??= source;
      }
      throw e;
    }
  }
  load(code) {
    return new Function("$", "$B", "$R", code);
  }
  async execute(source, name) {
    const fileId = this.register(name, source);
    const code = this.compileSource(source, name, fileId);
    return await this.load(code)(this.helpers, this.builtins, null);
  }
  use(loc, spec) {
    const from = this.files[decodeLoc(loc).fileId]?.name ?? "<input>";
    if (!this.host.loadModule) fail(loc, "'use' can't load files here");
    let found;
    try {
      found = this.host.loadModule(spec, from);
    } catch {
      fail(loc, `Can't find the file "${spec}"`);
    }
    let module3 = this.modules.get(found.name);
    if (!module3) {
      module3 = this.execute(found.source, found.name);
      this.modules.set(found.name, module3);
    }
    return module3;
  }
  /**
   * Measures how long loops run without giving the page a chance to breathe.
   * A timer resets the clock as soon as the program pauses (ends, or waits for something).
   */
  makeTick(limit) {
    let count = 0;
    let sliceStart = 0;
    return () => {
      if (limit === void 0 || ++count % 1e3 !== 0) return;
      const now = Date.now();
      if (sliceStart === 0) {
        sliceStart = now;
        setTimeout(() => sliceStart = 0, 0);
      } else if (now - sliceStart > limit) {
        sliceStart = 0;
        fail(this.helpers.p, `Stopped: a loop ran for more than ${limit / 1e3} seconds without stopping`);
      }
    };
  }
  /** Turns anything thrown into the Error value that `rescue` sees. */
  toErrorValue(e) {
    if (e instanceof ErrorValue) return e;
    if (e instanceof PitError) {
      const fileId = this.files.findIndex((f) => f.name === e.file);
      return ErrorValue.create(e.message, e.kind, fileId > 0 ? makeLoc(fileId, e.line, e.col) : void 0);
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
      const detail = debug ? `
${e.stack}` : "";
      return ErrorValue.create(`${e.message}${detail}`, "InternalError", at);
    }
    return ErrorValue.create(str(e), void 0, at);
  }
  /** Turns anything thrown into a PitError that points at the right file and line. */
  toPitError(e) {
    if (e instanceof PitError) return e;
    const value = this.toErrorValue(e);
    const loc = ErrorValue.locOf(value) ?? this.helpers.p;
    const { fileId, line, col } = decodeLoc(loc);
    const file = this.files[fileId] ?? this.files[0];
    const trace = ErrorValue.traceOf(value).map((l) => {
      const at = decodeLoc(l);
      return { file: (this.files[at.fileId] ?? this.files[0]).name, line: at.line, col: at.col };
    });
    return new PitError(value.name, value.message, line, col, file.name, file.source, trace);
  }
  report(e) {
    const error = this.toPitError(e);
    if (this.host.reportError) this.host.reportError(error);
    else this.host.write(error.format() + "\n");
  }
};

// src/web/browser.ts
var version = "1.0.0";
var reportLate = null;
if (typeof addEventListener === "function") {
  addEventListener("unhandledrejection", (event) => {
    if (!reportLate) return;
    event.preventDefault();
    reportLate(event.reason);
  });
}
async function run(source, options) {
  let failed = null;
  const report = (e) => {
    failed ??= e;
    (options.writeError ?? options.write)(e.format() + "\n");
  };
  const runtime = new Runtime({
    write: options.write,
    writeError: options.writeError,
    readLine: options.readLine ?? ((p) => typeof prompt === "function" ? prompt(p) : null),
    loadModule: (spec) => {
      const name = spec.replace(/^\.\//, "").replace(/\.pit$/, "") + ".pit";
      const source2 = options.files?.[name];
      if (source2 === void 0) throw new Error(`not found: ${spec}`);
      return { name, source: source2 };
    },
    loopTimeLimitMs: options.loopTimeLimitMs ?? 5e3,
    reportError: report
  });
  reportLate = (reason) => report(runtime.toPitError(reason));
  try {
    await runtime.run(source, "main.pit");
  } catch (e) {
    report(e instanceof PitError ? e : runtime.toPitError(e));
  }
  return failed;
}
function check(source) {
  try {
    new Runtime({ write: () => {
    } }).compileToJs(source, "main.pit");
    return null;
  } catch (e) {
    if (e instanceof PitError) return { kind: e.kind, message: e.message, line: e.line, col: e.col };
    throw e;
  }
}
function toJs(source) {
  return new Runtime({ write: () => {
  } }).compileToJs(source, "main.pit");
}
var CONSTANTS = /* @__PURE__ */ new Set(["true", "false", "nil"]);
function highlight(source) {
  let tokens;
  try {
    tokens = new Lexer(source).tokenize();
  } catch {
    return [{ text: source, kind: "plain" }];
  }
  const lineStarts = [0];
  for (let i = 0; i < source.length; i++) if (source[i] === "\n") lineStarts.push(i + 1);
  const offset = (t) => lineStarts[t.line - 1] + t.col - 1;
  const out = [];
  let pos = 0;
  const gap = (end) => {
    if (end <= pos) return;
    const text = source.slice(pos, end);
    const parts = text.split(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/);
    parts.forEach((p, i) => p && out.push({ text: p, kind: i % 2 === 1 ? "comment" : "plain" }));
    pos = end;
  };
  tokens.forEach((t, i) => {
    if (t.type === "EOF") return;
    const start = offset(t);
    gap(start);
    const text = source.slice(start, start + t.lexeme.length);
    let kind = "plain";
    if (t.type === "STRING") kind = "string";
    else if (t.type === "NUMBER") kind = "number";
    else if (CONSTANTS.has(t.type)) kind = "constant";
    else if (KEYWORDS.includes(t.type)) kind = "keyword";
    else if (t.type === "IDENT") {
      const next = tokens[i + 1];
      if (/^[A-Z]/.test(t.lexeme)) kind = "kind";
      else if (next?.type === "(" || next?.type === "=>") kind = "function";
      else if (["by", "times", "from", "as", "shared", "get", "set", "other", "until"].includes(t.lexeme)) kind = "keyword";
    } else kind = "operator";
    out.push({ text, kind });
    pos = start + text.length;
  });
  gap(source.length);
  return out;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  check,
  highlight,
  run,
  toJs,
  version
});
