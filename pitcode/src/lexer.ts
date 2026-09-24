import { syntaxError } from "./errors";
import { isKeyword, type StringPart, type Token, type TokenType } from "./token";

const ESCAPES: Record<string, string> = {
  n: "\n", t: "\t", r: "\r", "0": "\0", '"': '"', "\\": "\\", "{": "{", "}": "}",
};

const isDigit = (c: string) => c >= "0" && c <= "9";
const isHexDigit = (c: string) => isDigit(c) || (c >= "a" && c <= "f") || (c >= "A" && c <= "F");
// Letters from any language are allowed in names (profondeur, plongée, 深さ...).
const isAlpha = (c: string) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_"
  || (c > "\x7f" && /\p{L}/u.test(c));
const isAlphaNumeric = (c: string) => isAlpha(c) || isDigit(c);

/** Operators, longest first so `**=` wins over `**` and `*`. */
const OPERATORS: TokenType[] = [
  "...", "..=", "**=", "??=",
  "..", "?.", "??", "**", "+=", "-=", "*=", "/=", "%=", "++", "--",
  "==", "!=", "<=", ">=", "<<", ">>", "=>",
  "(", ")", "{", "}", "[", "]", ",", ";", ":", ".", "?",
  "+", "-", "*", "/", "%", "=", "<", ">", "&", "|", "^", "~",
];

/** Things people type from other languages, with the PitCode way to write them. */
const OPERATOR_HINTS: [string, string][] = [
  ["===", "PitCode uses '==' (it is always strict)"],
  ["!==", "PitCode uses '!=' (it is always strict)"],
  ["&&", "PitCode uses 'and' instead of '&&'"],
  ["||", "PitCode uses 'or' instead of '||'"],
];

/** Turns PitCode source text into tokens. */
export class Lexer {
  private pos = 0;
  private start = 0;
  private line: number;
  private col: number;
  private startLine = 1;
  private startCol = 1;
  private newlineBefore = false;
  private readonly tokens: Token[] = [];

  /** `line`/`col` let string interpolations report positions inside the original file. */
  constructor(private readonly src: string, line = 1, col = 1) {
    this.line = line;
    this.col = col;
  }

  tokenize(): Token[] {
    for (;;) {
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

  private scanToken(): void {
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

  private number(): void {
    if (this.peek() === "0" && (this.peekNext() === "x" || this.peekNext() === "b")) {
      const base = this.peekNext() === "x" ? 16 : 2;
      this.advance();
      this.advance();
      const digits = this.digits((ch) => (base === 16 ? isHexDigit(ch) : ch === "0" || ch === "1"));
      if (!digits) throw this.error(`Expected ${base === 16 ? "hex" : "binary"} digits after '0${base === 16 ? "x" : "b"}'`);
      return this.add("NUMBER", Number.parseInt(digits, base));
    }
    let text = this.digits(isDigit);
    // Only a dot followed by a digit is a decimal point, so `0..10` stays a range.
    if (this.peek() === "." && isDigit(this.peekNext())) {
      this.advance();
      text += "." + this.digits(isDigit);
    }
    if ((this.peek() === "e" || this.peek() === "E")
        && (isDigit(this.peekNext()) || ((this.peekNext() === "-" || this.peekNext() === "+") && isDigit(this.src[this.pos + 2] ?? "")))) {
      text += this.advance();
      if (this.peek() === "-" || this.peek() === "+") text += this.advance();
      text += this.digits(isDigit);
    }
    if (isAlpha(this.peek())) throw this.error(`A name can't start with a digit: '${text}${this.peek()}...'`);
    this.add("NUMBER", Number(text));
  }

  /** Reads digits, allowing `_` between them as a separator (1_000_000). */
  private digits(accept: (c: string) => boolean): string {
    let out = "";
    while (accept(this.peek()) || (this.peek() === "_" && accept(this.peekNext()) && out !== "")) {
      const c = this.advance();
      if (c !== "_") out += c;
    }
    return out;
  }

  private identifier(): void {
    while (isAlphaNumeric(this.peek())) this.advance();
    const word = this.src.slice(this.start, this.pos);
    this.add(isKeyword(word) ? word : "IDENT");
  }

  /** `r"..."` or `r"""..."""`: no escapes and no `{...}`, handy for patterns and JSON. */
  private rawString(): void {
    if (this.src.startsWith('""', this.pos)) {
      this.advance();
      this.advance();
      const end = this.src.indexOf('"""', this.pos);
      if (end < 0) throw syntaxError({ line: this.startLine, col: this.startCol }, 'Unterminated text (missing closing """)');
      let text = "";
      while (this.pos < end) text += this.advance();
      this.advance();
      this.advance();
      this.advance();
      return this.add("STRING", [text]);
    }
    let text = "";
    for (;;) {
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
  private string(triple: boolean): void {
    const indent = triple ? this.tripleIndent() : 0;
    const parts: StringPart[] = [];
    let text = "";
    let atLineStart = false;
    if (triple && this.lineIsBlankFrom(this.pos)) {
      // Skip the rest of the opening line.
      while (this.peek() !== "\n") this.advance();
      this.advance();
      atLineStart = true;
    }
    for (;;) {
      if (atLineStart) {
        for (let i = 0; i < indent && (this.peek() === " " || this.peek() === "\t"); i++) this.advance();
        atLineStart = false;
      }
      if (this.atEnd() || (!triple && this.peek() === "\n")) {
        throw syntaxError({ line: this.startLine, col: this.startCol },
          triple ? 'Unterminated text (missing closing """)' : 'Unterminated text (missing closing ")');
      }
      if (triple && this.src.startsWith('"""', this.pos)) {
        this.advance();
        this.advance();
        this.advance();
        // Drop the final line break before a closing """ on its own line.
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
  private tripleIndent(): number {
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

  private lineIsBlankFrom(pos: number): boolean {
    for (let i = pos; i < this.src.length; i++) {
      const c = this.src[i];
      if (c === "\n") return true;
      if (c !== " " && c !== "\t" && c !== "\r") return false;
    }
    return false;
  }

  private escape(): string {
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
      if (code > 0x10ffff) throw syntaxError(at, `\\u{${hex}} is not a valid character`);
      return String.fromCodePoint(code);
    }
    if (!(e in ESCAPES)) throw syntaxError(at, `Unknown escape '\\${e}'`);
    return ESCAPES[e];
  }

  /** Reads the expression between `{` (already consumed) and its matching `}`. */
  private interpolation(): StringPart {
    const openLine = this.line;
    const openCol = this.col - 1;
    const begin = this.pos;
    const line = this.line;
    const col = this.col;
    let depth = 1;
    for (;;) {
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
    this.advance(); // closing }
    if (!source.trim()) {
      throw syntaxError({ line: openLine, col: openCol }, "Empty {} in text. Write \\{ for a literal brace");
    }
    return { source, line, col };
  }

  private skipNestedString(): void {
    this.advance(); // opening "
    while (!this.atEnd() && this.peek() !== '"' && this.peek() !== "\n") {
      if (this.peek() === "\\") this.advance();
      this.advance();
    }
    if (this.peek() === '"') this.advance();
  }

  private skipWhitespaceAndComments(): void {
    while (!this.atEnd()) {
      const c = this.peek();
      if (c === "\n") {
        this.newlineBefore = true;
        this.advance();
      } else if (c === " " || c === "\t" || c === "\r" || c === "﻿") {
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

  private add(type: TokenType, value?: Token["value"]): void {
    this.tokens.push({
      type,
      lexeme: this.src.slice(this.start, this.pos),
      value,
      line: this.startLine,
      col: this.startCol,
      newlineBefore: this.newlineBefore,
    });
    this.newlineBefore = false;
  }

  private advance(): string {
    const c = this.src[this.pos++];
    if (c === "\n") {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }
    return c;
  }

  private peek(): string {
    return this.src[this.pos] ?? "\0";
  }

  private peekNext(): string {
    return this.src[this.pos + 1] ?? "\0";
  }

  private atEnd(): boolean {
    return this.pos >= this.src.length;
  }

  private error(message: string) {
    return syntaxError({ line: this.startLine, col: this.startCol }, message);
  }
}
