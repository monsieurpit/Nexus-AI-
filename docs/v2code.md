# v2code — how Nexus codes

Two parts, used by both the v2 **Code** specialist (Discord / website) and **Nexus Code** (repo edits, `codeEditRequest`).

## 1. The coding reference (`src/ai-engine/corpus/code/`)

One category per language (`code-<lang>`), each file a set of dense docs: syntax, the standard library,
idioms, frameworks, common errors with their fixes.

| Category | Files |
|---|---|
| JavaScript, TypeScript, Node.js, React (JSX/TSX), HTML, CSS | `javascript.ts`, `typescript.ts`, `node.ts`, `react.ts`, `html.ts`, `css.ts` |
| Python, C, C++, C#, Unity, Java, Go, Rust, Lua / Roblox Luau | `python.ts`, `c.ts`, `cpp.ts`, `csharp.ts`, `java.ts`, `go.ts`, `rust.ts`, `lua.ts` |
| SQL, Bash, PHP, Swift, Kotlin, Ruby | `sql.ts`, `bash.ts`, `php.ts`, `swift.ts`, `kotlin.ts`, `ruby.ts` |
| discord.js, discord.py, Git, Regex, JSON/YAML | `discordjs.ts`, `discordpy.ts`, `git.ts`, `regex.ts`, `json.ts` |
| Dart/Flutter, Vue, Svelte, R, PowerShell | `more.ts` |
| Scala, Haskell, Elixir, Assembly, Perl, Julia, MATLAB, Objective-C, Clojure, DevOps | `extra.ts` |
| Algorithms, data structures, clean code / design (any language) | `algorithms.ts` |

Add a doc: `code('<lang>', '<slug>', title, keywords, content)` in that language's file, then
`npm run embed:corpus` (only new/changed docs are embedded). Escape `${` as `\${` inside the template strings.

## 2. The pipeline (`src/ai-engine/v2/codeTools.ts`)

- `detectCodeLang(text)`: the language from a ``` fence tag, its name, a file extension or how the code looks.
- `codeReference(lang, question)`: the 3 best docs **inside that language's categories** (+ related ones:
  node → javascript, discord.py → python…), each cut to the lines that match the question (`refExcerpt`).
  An algorithms/design question adds the algorithms doc. A language with few docs is topped up with the
  older general "Programming" docs that name it.
- `checkCode(lang, tag, code)`: a real **syntax check** with the language's own tool — never runs the code:
  Bun's parser (JS/TS/JSX/TSX), `python3 -m py_compile`, `clang`/`clang++ -fsyntax-only`, `swiftc -parse`,
  `ruby -c`, `bash -n`, `JSON.parse`. Missing third-party headers/modules aren't counted as errors.
  No checker here: Go, Rust, Lua, PHP, Java, Kotlin… (reviewed by the model only).

**Code specialist** (`pipeline.ts`): LANGUAGE line + REFERENCE in the prompt → answer → check every block →
on errors, the exact compiler output goes back for a fix (up to 2). The website's thinking panel shows
📘 reference, ✅ / ❌ / ➖ checks.

**Nexus Code** (`generateCodeEditWithReview`, reasoningEngine.ts): same reference in front of the instruction;
each pass's tagged blocks are checked; compiler errors trigger a corrected pass (the model may ignore errors
caused only by an intentional excerpt), otherwise the usual self-review runs.

**Router** (`router.ts`): any detected language + a coding intent goes to Code ("svelte counter component",
"hello world in x86 assembly"); loose cues (Roblox, "website", git, JSON, "in c", "in r") need a clearly
technical word, so "i love roblox" stays chat. Algorithm work with no language ("implement dijkstra") → Code.

Tests: `bun run scripts/regressionCheck.ts --det-only` (v2code checks), `bun run scripts/eval/routeCheck.ts`.
