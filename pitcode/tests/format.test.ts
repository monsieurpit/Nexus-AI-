import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/index";

test("format fixes indentation and blank lines", () => {
  const messy = "kind A {\ninit(x) => {\n        me.x = x   \n}\n    // note\n}\n\n\n\nsay [1, 2]\n.map(n => n)\n";
  assert.equal(format(messy), "kind A {\n  init(x) => {\n    me.x = x\n  }\n  // note\n}\n\nsay [1, 2]\n  .map(n => n)\n");
});

test("format leaves multi-line text and comments alone", () => {
  const src = 'say """\n   keep   \n  this\n  """\n/* block\n     keep me\n*/\n';
  assert.equal(format(src), src);
});

test("format is stable and keeps a #! line", () => {
  const src = "#!/usr/bin/env pitcode\nwhen true {\nsay 1\n}";
  const once = format(src);
  assert.equal(once, "#!/usr/bin/env pitcode\nwhen true {\n  say 1\n}\n");
  assert.equal(format(once), once);
});

test("format refuses code it can't read", () => {
  assert.throws(() => format('say "open'), /Unterminated text/);
});
