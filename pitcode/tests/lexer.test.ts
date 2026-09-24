import assert from "node:assert/strict";
import { test } from "node:test";
import { Lexer } from "../src/lexer";
import { PitError } from "../src/errors";

const types = (src: string) => new Lexer(src).tokenize().map((t) => t.type);

test("keywords, identifiers and operators", () => {
  assert.deepEqual(types("pit x = 5 + 2"), ["pit", "IDENT", "=", "NUMBER", "+", "NUMBER", "EOF"]);
  assert.deepEqual(types("a == b != c <= d >= e"), ["IDENT", "==", "IDENT", "!=", "IDENT", "<=", "IDENT", ">=", "IDENT", "EOF"]);
  assert.deepEqual(types("x += 1; y -= 2"), ["IDENT", "+=", "NUMBER", ";", "IDENT", "-=", "NUMBER", "EOF"]);
  assert.deepEqual(types("f(n) => n"), ["IDENT", "(", "IDENT", ")", "=>", "IDENT", "EOF"]);
});

test("ranges are not decimals", () => {
  const tokens = new Lexer("0..10 3.5").tokenize();
  assert.deepEqual(tokens.map((t) => t.type), ["NUMBER", "..", "NUMBER", "NUMBER", "EOF"]);
  assert.equal(tokens[3].value, 3.5);
});

test("comments are skipped and newlines are tracked", () => {
  const tokens = new Lexer("say 1 // hi\nsay 2").tokenize();
  assert.deepEqual(tokens.map((t) => t.type), ["say", "NUMBER", "say", "NUMBER", "EOF"]);
  assert.equal(tokens[2].newlineBefore, true);
  assert.equal(tokens[1].newlineBefore, false);
  assert.equal(tokens[2].line, 2);
  assert.equal(tokens[2].col, 1);
});

test("strings with escapes and interpolation", () => {
  const [plain] = new Lexer('"a\\n\\"b\\{"').tokenize();
  assert.deepEqual(plain.value, ['a\n"b{']);
  const [interp] = new Lexer('"Hi {name}!"').tokenize();
  assert.deepEqual(interp.value, ["Hi ", { source: "name", line: 1, col: 6 }, "!"]);
});

test("helpful errors", () => {
  assert.throws(() => types('"open'), /Unterminated text/);
  assert.throws(() => types("a && b"), /uses 'and'/);
  assert.throws(() => types("!x"), /uses 'not'/);
  assert.throws(() => types("'x'"), /double quotes/);
  assert.throws(() => types('"{}"'), /Empty \{\}/);
  assert.throws(() => types("@"), (e) => e instanceof PitError && e.line === 1 && e.col === 1);
});
