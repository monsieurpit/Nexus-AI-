import type { Token } from "./token";

export interface FunctionDef {
  /** null for anonymous functions like `(n) => n * n`. */
  name: string | null;
  params: Token[];
  body: Stmt[];
  /** Where the function was written, for error messages. */
  token: Token;
}

export type Expr =
  | { kind: "Literal"; value: number | string | boolean | null }
  | { kind: "Interp"; parts: (string | Expr)[] }
  | { kind: "Var"; name: Token }
  | { kind: "Unary"; op: Token; right: Expr }
  | { kind: "Binary"; left: Expr; op: Token; right: Expr }
  | { kind: "Logical"; left: Expr; op: Token; right: Expr }
  | { kind: "Call"; callee: Expr; paren: Token; args: Expr[] }
  | { kind: "Lambda"; fn: FunctionDef };

export interface WhenBranch {
  cond: Expr;
  body: Stmt[];
}

export type Stmt =
  | { kind: "Expr"; expr: Expr }
  | { kind: "Say"; values: Expr[] }
  | { kind: "Pit"; name: Token; init: Expr | null; locked: boolean }
  | { kind: "Assign"; name: Token; op: Token; value: Expr }
  | { kind: "Block"; body: Stmt[] }
  | { kind: "When"; branches: WhenBranch[]; otherwise: Stmt[] | null }
  | { kind: "LoopWhile"; cond: Expr; body: Stmt[] }
  | { kind: "LoopRange"; name: Token; from: Expr; to: Expr; dots: Token; body: Stmt[] }
  | { kind: "Func"; name: Token; fn: FunctionDef }
  | { kind: "Back"; keyword: Token; value: Expr | null }
  | { kind: "Stop"; keyword: Token }
  | { kind: "Skip"; keyword: Token };
