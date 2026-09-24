import type { Token } from "./token";

export interface Param {
  name: Token;
  /** Value used when the caller leaves this argument out. */
  default: Expr | null;
  /** `...rest` collects the remaining arguments into a list. */
  rest: boolean;
}

export interface FunctionDef {
  /** null for anonymous functions like `(n) => n * n`. */
  name: string | null;
  params: Param[];
  body: Stmt[];
  /** Where the function was written, for error messages. */
  token: Token;
  /** Contains `give`: calling it returns an iterator. */
  isGenerator: boolean;
  /** Contains `wait`: calling it returns a promise. */
  isAsync: boolean;
}

export interface Spread {
  kind: "Spread";
  expr: Expr;
  token: Token;
}

export type MapEntry =
  | { kind: "Entry"; key: string; value: Expr }
  | { kind: "Computed"; key: Expr; value: Expr }
  | Spread;

export interface MatchArm<Body> {
  /** null for the `other` arm. */
  patterns: Expr[] | null;
  body: Body;
  token: Token;
}

export type Expr =
  | { kind: "Literal"; value: number | string | boolean | null }
  | { kind: "Interp"; parts: (string | Expr)[] }
  | { kind: "Var"; name: Token }
  | { kind: "Me"; token: Token }
  | { kind: "List"; items: (Expr | Spread)[] }
  | { kind: "Map"; entries: MapEntry[]; token: Token }
  | { kind: "Unary"; op: Token; right: Expr }
  | { kind: "Binary"; left: Expr; op: Token; right: Expr; negate?: boolean }
  | { kind: "Logical"; left: Expr; op: Token; right: Expr }
  | { kind: "Ternary"; cond: Expr; then: Expr; otherwise: Expr }
  | { kind: "Range"; from: Expr; to: Expr; inclusive: boolean; step: Expr | null; dots: Token }
  | { kind: "Call"; callee: Expr; paren: Token; args: (Expr | Spread)[] }
  | { kind: "Member"; object: Expr; name: string; token: Token; optional: boolean }
  | { kind: "Index"; object: Expr; index: Expr; bracket: Token }
  | { kind: "Up"; name: string; token: Token }
  | { kind: "Lambda"; fn: FunctionDef }
  | { kind: "Match"; subject: Expr; arms: MatchArm<Expr>[]; token: Token }
  | { kind: "Wait"; expr: Expr; token: Token }
  | { kind: "SayExpr"; value: Expr };

/** Left-hand side of `pit`: a name, or a list/map pattern that unpacks a value. */
export type Target =
  | { kind: "Name"; name: Token }
  | { kind: "ListPattern"; items: PatternItem[]; rest: Token | null; token: Token }
  | { kind: "MapPattern"; entries: { key: string; item: PatternItem }[]; rest: Token | null; token: Token };

export interface PatternItem {
  name: Token;
  default: Expr | null;
}

export interface WhenBranch {
  cond: Expr;
  body: Stmt[];
}

export type KindMember =
  | { kind: "Method"; name: Token; fn: FunctionDef; shared: boolean; accessor: "get" | "set" | null }
  | { kind: "Field"; name: Token; init: Expr | null; shared: boolean; locked: boolean };

export type Stmt =
  | { kind: "Expr"; expr: Expr }
  | { kind: "Say"; values: Expr[] }
  | { kind: "Pit"; target: Target; init: Expr | null; locked: boolean; shared: boolean; token: Token }
  | { kind: "Assign"; target: Expr; op: Token; value: Expr }
  | { kind: "Block"; body: Stmt[] }
  | { kind: "When"; branches: WhenBranch[]; otherwise: Stmt[] | null }
  | { kind: "LoopForever"; body: Stmt[] }
  | { kind: "LoopWhile"; cond: Expr; body: Stmt[] }
  | { kind: "LoopEach"; names: Token[]; pattern: Target | null; iterable: Expr; body: Stmt[]; isAwait: boolean; token: Token }
  | { kind: "Func"; name: Token; fn: FunctionDef; shared: boolean }
  | { kind: "Kind"; name: Token; parent: Expr | null; members: KindMember[]; shared: boolean }
  | { kind: "Back"; keyword: Token; value: Expr | null }
  | { kind: "Give"; keyword: Token; value: Expr | null }
  | { kind: "Stop"; keyword: Token }
  | { kind: "Skip"; keyword: Token }
  | { kind: "Raise"; keyword: Token; value: Expr }
  | { kind: "Attempt"; body: Stmt[]; errorName: Token | null; rescue: Stmt[] | null; always: Stmt[] | null }
  | { kind: "MatchStmt"; subject: Expr; arms: MatchArm<Stmt>[]; token: Token }
  | { kind: "Use"; path: string; alias: Token | null; names: { name: string; as: Token }[] | null; token: Token };
