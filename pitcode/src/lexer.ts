import { syntaxError } from "./errors";
import { isKeyword, type StringPart, type Token, type TokenType } from "./token";

const ESCAPES: Record<string, string> = {
  n: "\n", t: "\t", r: "\r", '"': '"', "\\": "\\", "{": "{", "}": "}",
};

const isDigit = (c: string) => c >= "0" && c <= "9";
const isAlpha = (c: string) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
const isAlphaNumeric = (c: string) => isAlpha(c) || isDigit(c);

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
    const c = this.advance();
    switch (c) {
      case "(": case ")": case "{": case "}": case ",": case ";": case "%":
        return this.add(c);
      case "+": case "-": case "*": case "/":
        return this.add(this.match("=") ? (`${c}=` as TokenType) : c);
      case "=":
        if (this.match("=")) return this.add("==");
        if (this.match(">")) return this.add("=>");
        return this.add("=");
      case "!":
        if (this.match("=")) return this.add("!=");
        throw this.error("Unexpected '!'. PitCode uses 'not', like: when not done { ... }");
      case "<":
        return this.add(this.match("=") ? "<=" : "<");
      case ">":
        return this.add(this.match("=") ? ">=" : ">");
      case ".":
        if (this.match(".")) return this.add("..");
        break;
      case "&":
        if (this.peek() === "&") throw this.error("PitCode uses 'and' instead of '&&'");
        break;
      case "|":
        if (this.peek() === "|") throw this.error("PitCode uses 'or' instead of '||'");
        break;
      case '"':
        return this.string();
      case "'":
        throw this.error('Text uses double quotes in PitCode, like: "hello"');
    }
    if (isDigit(c)) return this.number();
    if (isAlpha(c)) return this.identifier();
    throw this.error(`Unexpected character '${c}'`);
  }

  private number(): void {
    while (isDigit(this.peek())) this.advance();
    // Only a dot followed by a digit is a decimal point, so `0..10` stays a range.
    if (this.peek() === "." && isDigit(this.peekNext())) {
      this.advance();
      while (isDigit(this.peek())) this.advance();
    }
    this.add("NUMBER", Number(this.src.slice(this.start, this.pos)));
  }

  private identifier(): void {
    while (isAlphaNumeric(this.peek())) this.advance();
    const word = this.src.slice(this.start, this.pos);
    this.add(isKeyword(word) ? word : "IDENT");
  }

  private string(): void {
    const parts: StringPart[] = [];
    let text = "";
    for (;;) {
      if (this.atEnd() || this.peek() === "\n") {
        throw syntaxError({ line: this.startLine, col: this.startCol }, 'Unterminated text (missing closing ")');
      }
      const c = this.advance();
      if (c === '"') break;
      if (c === "\\") {
        const escLine = this.line;
        const escCol = this.col - 1;
        if (this.atEnd() || this.peek() === "\n") continue; // reported as unterminated above
        const e = this.advance();
        if (!(e in ESCAPES)) throw syntaxError({ line: escLine, col: escCol }, `Unknown escape '\\${e}'`);
        text += ESCAPES[e];
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
      } else if (c === " " || c === "\t" || c === "\r") {
        this.advance();
      } else if (c === "/" && this.peekNext() === "/") {
        while (!this.atEnd() && this.peek() !== "\n") this.advance();
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

  private match(expected: string): boolean {
    if (this.peek() !== expected) return false;
    this.advance();
    return true;
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
