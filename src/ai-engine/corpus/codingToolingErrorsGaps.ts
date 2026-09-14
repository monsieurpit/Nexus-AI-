import { KnowledgeItem } from '../../types';

// Batch 303 corpus fixes — third coding-priority batch (2026-09-14). 9/25 misses.
// Two straight-up factual errors: (1) soft delete vs hard delete got INVERTED — the model
// described a soft delete as literally removing rows from the table, which is actually what a
// hard delete does; a soft delete never removes the row at all, it just flags it. (2) value type
// vs reference type claimed Python ints/strings are "value types" (Python has no true value
// types — everything is an object/reference) and then tacked on a nonsensical "like in Java with
// overriding" non-sequitur unrelated to reference semantics. Two severe cutoffs: semantic
// versioning (explained MAJOR, never touched MINOR at all) and 401 vs 403 (dumped a wall of
// unrelated HTTP status code trivia and REST architecture trivia, never explained 403 at all).
// Three one-sided dodges: npm vs npx (only explained npm), vertical-align vs flexbox alignment
// in CSS (only explained flexbox, cut off before finishing that), throwing vs returning an error
// (explained Go's return-error pattern fine, but for "throwing" pivoted to an unrelated tangent
// about JS optional chaining instead of explaining exceptions/try-catch/stack unwinding). One
// dump-and-dodge: mock vs stub (defined mock reasonably, then hallucinated an irrelevant "Bogus"
// Ruby library trivia fact, never explained a stub at all). One confused/conflated answer:
// environment variables vs config files (described .env files and shell-exported vars but never
// actually explained config files — JSON/YAML/TOML/INI settings files — as a distinct concept).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const CODING_TOOLING_ERRORS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-code-npm-vs-npx',
    'npm vs npx',
    ['npm vs npx', 'difference npm npx', 'npx'],
    "npm (Node Package Manager) is the tool you use to INSTALL and manage JavaScript packages — `npm install express` downloads the express package into your project's node_modules folder (or globally with -g), and npm also manages your package.json, runs your defined scripts (`npm run build`), and handles publishing packages. npx (Node Package eXecute, bundled with npm since npm 5.2+) is for RUNNING a package's executable, typically without permanently installing it — `npx create-react-app my-app` downloads create-react-app just long enough to run it once and then doesn't leave it cluttering your global installs; it also conveniently runs binaries from packages already installed locally in node_modules/.bin without needing to add them to your PATH manually. The key difference: npm installs and manages packages as a persistent part of your project, while npx executes a package's command-line tool (installing it temporarily if needed) without permanently adding it to your dependencies.",
  ),
  k(
    'kb-gap-code-vertical-align-vs-flexbox-alignment',
    'CSS vertical-align vs flexbox alignment',
    ['vertical alignment css', 'flexbox alignment', 'difference vertical-align flexbox', 'vertical-align property'],
    "The CSS `vertical-align` property is an OLD, narrow tool that only works on inline, inline-block, and table-cell elements — it controls how an element lines up vertically relative to the other content on the same line (e.g. `vertical-align: middle` to center an icon next to text, or `top`/`bottom` to align cell content in a table), and it does absolutely nothing on a normal block-level element like a `<div>` with `display: block`. Flexbox alignment is a much more powerful, modern system that works by putting `display: flex` on a container, which turns its direct children into flex items you can align along two axes — `justify-content` aligns items along the main axis, and `align-items`/`align-self` align them along the cross axis (e.g. `align-items: center` vertically centers items in a row-direction flex container) — and it works reliably for centering and distributing space across entire layouts, not just inline text runs. The key difference: `vertical-align` is a legacy property limited to aligning inline/table-cell content relative to a line of text, while flexbox alignment (`align-items`/`justify-content`) is a full layout system for aligning and distributing whole blocks of content within a container.",
  ),
  k(
    'kb-gap-code-mock-vs-stub',
    'Mock vs stub (testing)',
    ['mock vs stub', 'difference mock stub', 'test double mock stub'],
    "A stub is a test double that just returns canned, pre-programmed answers to calls made during a test — it exists to let the test run without depending on a real component (like a database or API), but a stub doesn't care HOW it was called or how many times; it just hands back whatever fake data you told it to return so the code under test can keep running. A mock is a test double that goes further — it also records and verifies HOW it was interacted with, so after the test runs you can assert things like 'this method was called exactly once, with these specific arguments' — a mock is used to test BEHAVIOR and interactions, not just to supply fake data. The key difference: a stub only supplies fake return values to keep a test running, while a mock additionally tracks and verifies the calls made to it, letting you assert on interactions rather than just outputs.",
  ),
  k(
    'kb-gap-code-throwing-vs-returning-error',
    'Throwing an error vs returning an error',
    ['throwing error vs returning error', 'difference throw return error', 'exceptions vs error return values'],
    "Returning an error (used in languages like Go, or as a convention in C) means a function that can fail returns the error as an ordinary value alongside (or instead of) its normal result — e.g. Go's `result, err := doThing()` — the caller MUST explicitly check `if err != nil` to handle it, which makes every failure point visible in the code but adds boilerplate everywhere. Throwing an error (used in languages like Java, Python, JavaScript, C#) means a function that fails raises an exception object with `throw`, which immediately stops normal execution and unwinds the call stack, jumping up to the nearest enclosing `try/catch` (or `try/except`) block that handles that exception type — if nothing catches it, the program crashes with an unhandled exception/stack trace. The key difference: returning an error makes failure an explicit value the caller must check at every call site, while throwing an error interrupts normal control flow entirely and relies on a catch block somewhere up the call stack to handle it — errors can silently propagate past code that doesn't have a matching catch.",
  ),
  k(
    'kb-gap-code-value-type-vs-reference-type',
    'Value type vs reference type',
    ['value type vs reference type', 'difference value reference type', 'pass by value pass by reference'],
    "A value type holds its actual data directly, and when you assign it to a new variable or pass it to a function, the data gets COPIED — changes to the copy don't affect the original (e.g. primitives like `int`, `float`, `bool`, and `struct` in C#/Swift/Go are value types). A reference type stores a reference (a pointer/address) to where the data actually lives in memory, so when you assign it to a new variable or pass it around, you're copying the REFERENCE, not the underlying data — both variables point at the same object, so changing it through one variable is visible through the other (e.g. `class` instances, arrays, and most objects in Java/C#/JavaScript are reference types). Note: Python does NOT have true value types the way C#/Java/Swift do — everything in Python (including ints and strings) is an object accessed by reference; ints and strings just happen to be immutable, so they behave in a value-type-like way even though under the hood they're references. The key difference: a value type's data is copied on assignment/pass, so each variable is independent, while a reference type's assignment copies only a pointer to shared underlying data, so multiple variables can affect the same object.",
  ),
  k(
    'kb-gap-code-env-vars-vs-config-files',
    'Environment variables vs config files',
    ['environment variables vs config files', 'difference env vars config files', 'env variables config'],
    "Environment variables are key-value pairs set at the OS/process level (via the shell with `export MY_VAR=value`, or injected by a deployment platform like Railway/Heroku/Docker) and read into a running program from its environment — they're the standard way to pass in secrets (API keys, database URLs) and settings that change between environments (dev/staging/prod) WITHOUT hardcoding them into the codebase, and files like `.env` (loaded locally by a library like `dotenv`) are just a convenient way to define env vars for local development — a `.env` file is normally git-ignored since it holds secrets. Config files are a broader, separate concept — structured files (JSON, YAML, TOML, INI, or a `config.js`/`config.py` file) that hold an application's settings in an organized, often nested, human-readable format; unlike env vars, config files CAN be committed to the repo (when they don't contain secrets) since they define default/shared behavior like feature flags, logging levels, or API endpoint URLs, and they're better suited to complex, structured, or hierarchical settings than flat key-value env vars are. The key difference: environment variables are simple flat key-value pairs injected by the OS/platform, ideal for secrets and per-environment values, while config files are structured, often-committed files better suited for complex or shared application settings — a `.env` file is really just a local shortcut for setting environment variables, not the same thing as a general config file.",
  ),
  k(
    'kb-gap-code-soft-delete-vs-hard-delete',
    'Soft delete vs hard delete',
    ['soft delete vs hard delete', 'difference soft hard delete', 'soft delete database'],
    "A soft delete does NOT actually remove the row from the database at all — instead it flags the row as deleted, typically by setting a column like `deleted_at` to a timestamp or `is_deleted` to true, and the row physically stays in the table with all its data intact; the application then filters out flagged rows from normal queries (`WHERE deleted_at IS NULL`), which means the data can be recovered/undeleted later and audit history is preserved, at the cost of extra query complexity and the table never actually shrinking. A hard delete is the real, permanent removal — a `DELETE FROM table WHERE id = X` (or `DROP TABLE` for an entire table) physically removes the row(s) from storage; it's fast and frees up space, but once committed the data is genuinely gone (short of restoring from a backup). The key difference: a soft delete just marks a row as deleted while leaving the actual data in place and recoverable, while a hard delete physically and permanently removes the data — this is the opposite of describing a soft delete as 'removing rows normally' and a hard delete as the only permanent option; soft delete is the NON-removing, reversible option.",
  ),
  k(
    'kb-gap-code-semver-major-vs-minor',
    'Semantic versioning: major vs minor bumps',
    ['semver major minor', 'semantic versioning major bump minor bump', 'difference semver major minor'],
    "In semantic versioning (MAJOR.MINOR.PATCH, e.g. 2.4.1), bumping the MAJOR number (2.4.1 → 3.0.0) signals a BREAKING change — the public API changed in a way that could break existing code depending on it (removed a function, changed a function's signature, changed behavior incompatibly), so consumers should expect they may need to update their own code before upgrading, and the MINOR and PATCH numbers both reset to 0. Bumping the MINOR number (2.4.1 → 2.5.0) signals new functionality was added in a BACKWARDS-COMPATIBLE way — new features, new optional parameters, new exported functions — nothing existing was removed or changed incompatibly, so consumers can safely upgrade without changing their own code, and only the PATCH number resets to 0 (MAJOR stays the same). The key difference: a MAJOR bump means breaking changes that may require consumers to update their code, while a MINOR bump means new backwards-compatible features were added that are always safe to upgrade into.",
  ),
  k(
    'kb-gap-code-401-vs-403',
    '401 Unauthorized vs 403 Forbidden',
    ['401 vs 403', 'difference 401 403', 'http status 401 403', 'unauthorized vs forbidden'],
    "A 401 Unauthorized response means the server doesn't know who you are (or doesn't believe you) — you either didn't provide authentication credentials at all, or the ones you provided (a token, a password, a session cookie) are missing, invalid, or expired; the fix is to (re-)authenticate, e.g. log in again or refresh your token. A 403 Forbidden response means the server DOES know who you are — your authentication is valid and accepted — but you're not allowed to access this specific resource or perform this action anyway, because your account lacks the necessary permissions/role (e.g. a logged-in regular user trying to hit an admin-only endpoint); no amount of re-authenticating as the same user will fix a 403, since the problem is permissions, not identity. The key difference: 401 means 'I don't know who you are (or your credentials are invalid) — please authenticate,' while 403 means 'I know exactly who you are, and you're authenticated fine, but you're still not allowed to do this.'",
  ),
];
