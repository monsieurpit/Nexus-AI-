export const KEYWORDS = [
  "pit", "lock", "back", "say",
  "when", "orwhen",
  "loop", "in", "stop", "skip",
  "and", "or", "not", "is",
  "true", "false", "nil",
  "kind", "me", "up",
  "match",
  "attempt", "rescue", "always", "raise",
  "wait", "give",
  "use", "share",
] as const;

export type Keyword = (typeof KEYWORDS)[number];

export type TokenType =
  | "(" | ")" | "{" | "}" | "[" | "]" | "," | ";" | ":"
  | "." | "?." | "?" | "??" | "??=" | ".." | "..=" | "..."
  | "+" | "-" | "*" | "/" | "%" | "**"
  | "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "**=" | "++" | "--"
  | "==" | "!=" | "<" | "<=" | ">" | ">="
  | "&" | "|" | "^" | "~" | "<<" | ">>"
  | "=>"
  | "IDENT" | "NUMBER" | "STRING"
  | Keyword
  | "EOF";

/** An expression written inside `{...}` in a string, kept as source until the parser handles it. */
export interface Interpolation {
  source: string;
  line: number;
  col: number;
}

export type StringPart = string | Interpolation;

export interface Token {
  type: TokenType;
  lexeme: string;
  /** Number value for NUMBER tokens, string parts for STRING tokens. */
  value?: number | StringPart[];
  line: number;
  col: number;
  /** True when a line break separates this token from the previous one. */
  newlineBefore: boolean;
}

export function isKeyword(word: string): word is Keyword {
  return (KEYWORDS as readonly string[]).includes(word);
}

export function describeToken(token: Token): string {
  switch (token.type) {
    case "EOF": return "end of file";
    case "STRING": return "text";
    case "NUMBER": return `number ${token.lexeme}`;
    default: return `'${token.lexeme}'`;
  }
}
