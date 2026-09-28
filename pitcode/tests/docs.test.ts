import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";
import { output } from "./helpers";

const root = resolve(__dirname, "..", "..");

/** Every ```pit block in the tutorials must run without errors. */
for (const doc of ["docs/tutorial.md", "docs/tutoriel-fr.md"]) {
  const text = readFileSync(resolve(root, doc), "utf8");
  const blocks = [...text.matchAll(/```pit\n([\s\S]*?)```/g)].map((m) => m[1]);
  blocks.forEach((code, i) => {
    test(`${doc} example ${i + 1} runs`, async () => {
      const out = await output(code, ["Pat"]);
      assert.ok(out.length > 0);
    });
  });
}
