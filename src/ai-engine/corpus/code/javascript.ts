import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('javascript', slug, title, keywords, content);

export const CODE_JAVASCRIPT = [
  c('variables-types', 'JavaScript variables, types and coercion', ['javascript variables', 'let const var', 'js types', 'typeof', 'type coercion', 'truthy falsy', 'hoisting', 'temporal dead zone'],
    `Declarations: const (block-scoped, can't be reassigned — but objects/arrays it points to CAN be mutated), let (block-scoped, reassignable), var (function-scoped, hoisted and initialised to undefined — avoid). let/const are hoisted too but sit in the "temporal dead zone" until their line: using them earlier throws ReferenceError. Default to const, use let only when you reassign.
Primitive types (immutable, compared by value): string, number (IEEE-754 double: 0.1+0.2 === 0.30000000000000004), bigint (123n), boolean, undefined, null, symbol. Everything else is an object (arrays, functions, Date, Map...), compared by reference: [] === [] is false.
typeof: "string" "number" "bigint" "boolean" "undefined" "symbol" "object" "function"; typeof null === "object" (historic bug) — check null with x === null. Arrays: Array.isArray(x). NaN: Number.isNaN(x) (NaN !== NaN).
Falsy values: false, 0, -0, 0n, "", null, undefined, NaN. Everything else is truthy, including "0", "false", [], {}.
Coercion: "5" + 1 = "51" (+ with a string concatenates), "5" - 1 = 4, +"42" = 42, Number("") = 0, Number("12px") = NaN, parseInt("12px", 10) = 12, String(x) / x.toString(), Boolean(x) / !!x. Always pass the radix to parseInt.
Scope: block { } for let/const, function scope for var, module scope in ES modules (top-level variables aren't global). Closures capture variables, not values (classic bug: var in a for loop with setTimeout — use let).
Example: const user = { name: 'Ana' }; user.name = 'Bo'; // ok  user = {} // TypeError: Assignment to constant variable.`),

  c('operators-equality', 'JavaScript operators: equality, nullish coalescing, optional chaining, logical assignment', ['javascript === vs ==', 'nullish coalescing ??', 'optional chaining ?.', 'logical assignment', 'spread operator', 'ternary', 'js operators'],
    `Equality: always use === / !== (no coercion). == coerces: 0 == "" is true, null == undefined is true (the only acceptable == use: x == null checks both). Object.is(a, b) is like === but Object.is(NaN, NaN) true and Object.is(0, -0) false.
Logical: a || b returns the first truthy operand (careful: 0 || 10 → 10); a && b returns the first falsy or the last; a ?? b returns b only if a is null/undefined (0 ?? 10 → 0) — use ?? for defaults. Can't mix ?? with || or && without parentheses.
Optional chaining: user?.address?.street (undefined instead of TypeError), obj.method?.(), arr?.[0]. Combine: user?.name ?? 'Anonymous'.
Logical assignment: a ||= b, a &&= b, a ??= b (counts.x ??= 0).
Arithmetic: ** (2 ** 10), % (remainder, sign of the dividend: -7 % 3 === -1), ++/--, compound += -= *= /=. Bitwise: & | ^ ~ << >> >>> (32-bit ints).
Spread/rest: [...arr], {...obj}, fn(...args); rest params function f(a, ...rest).
Ternary: cond ? a : b (don't nest more than once). Comma, void, delete obj.key, in ('key' in obj, also checks the prototype chain), instanceof (prototype check).
Exponent and unary: -x ** 2 is a SyntaxError — write (-x) ** 2.
Comparison of strings is by UTF-16 code unit: 'a' < 'b'; for human sorting use a.localeCompare(b) or Intl.Collator.
Short-circuit tricks: isReady && start(); const name = input?.trim() || 'Guest';`),

  c('strings', 'JavaScript strings: methods, template literals, unicode', ['javascript string methods', 'template literals', 'split join', 'replaceAll', 'padStart', 'string includes', 'substring slice', 'js unicode emoji'],
    `Strings are immutable; methods return new strings. Quotes: 'single', "double", \`template\` (multi-line + interpolation \${expr}). Tagged templates: tag\`a\${x}b\` calls tag(strings, ...values) (used by styled-components, sql libs). String.raw\`C:\\path\`.
Core methods: length, at(-1) (last char), charAt(i), [i], indexOf/lastIndexOf, includes, startsWith/endsWith, slice(start, end) (negative OK), substring(start, end), split(sep, limit), concat, repeat(n), trim/trimStart/trimEnd, padStart(len, '0')/padEnd, toUpperCase/toLowerCase, toLocaleUpperCase, replace(pattern, replacement) (first match only for strings; /g regex for all), replaceAll(str, rep), match(re), matchAll(re /g) → iterator of matches with groups, search(re), localeCompare, normalize('NFC'), codePointAt, String.fromCodePoint.
Replacement patterns: '$1', '$<name>', '$&'; or a function: s.replace(/\\d+/g, (m) => m * 2).
Unicode: .length counts UTF-16 units — '😀'.length === 2. Count characters with [...str].length or Array.from(str); grapheme clusters (family emoji, flags) need new Intl.Segmenter('en', { granularity: 'grapheme' }).
Reverse: [...s].reverse().join(''). Capitalise: s.charAt(0).toUpperCase() + s.slice(1). Count occurrences: s.split(sub).length - 1. Check palindrome: const t = s.toLowerCase().replace(/[^a-z0-9]/g, ''); t === [...t].reverse().join('').
Number formatting: (1234.5).toFixed(2) → "1234.50"; n.toLocaleString('en-US'); new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(9.5) → "9,50 $".
Escape HTML before inserting user text: replace & < > " ' with entities (or use textContent).`),

  c('numbers-math', 'JavaScript numbers, Math, BigInt and rounding', ['javascript numbers', 'math random', 'round to 2 decimals', 'floating point', 'bigint', 'number formatting', 'random integer js', 'math floor ceil'],
    `number is a 64-bit float: safe integers up to Number.MAX_SAFE_INTEGER (2^53 - 1); Number.isSafeInteger(x). Beyond that use BigInt: 9007199254740993n, BigInt("123"), operators work between bigints only (1n + 2 throws), no Math.* on bigint.
Special values: NaN, Infinity, -Infinity, -0. Checks: Number.isNaN, Number.isFinite, Number.isInteger.
Parsing: Number("3.5") (whole string), parseFloat("3.5kg") → 3.5, parseInt("ff", 16) → 255, (255).toString(16) → "ff", (5).toString(2) → "101".
Rounding: Math.round(2.5) = 3, Math.round(-2.5) = -2 (rounds toward +∞ at .5), Math.floor, Math.ceil, Math.trunc. Round to 2 decimals: Math.round(x * 100) / 100 or Number(x.toFixed(2)) (toFixed returns a string). Money: work in integer cents or use Intl for display.
Float comparison: Math.abs(a - b) < Number.EPSILON * 10.
Math: abs, sign, min/max (Math.max(...arr) — careful with huge arrays), pow, sqrt, cbrt, hypot, exp, log/log2/log10, sin/cos/tan/atan2, PI, E, random() (0 ≤ x < 1, not cryptographically secure).
Random integer in [min, max]: Math.floor(Math.random() * (max - min + 1)) + min. Secure: crypto.getRandomValues(new Uint32Array(1))[0], crypto.randomUUID().
Clamp: Math.min(Math.max(x, lo), hi). Sum: arr.reduce((a, b) => a + b, 0). Average: sum / arr.length.
Formatting: Intl.NumberFormat with { maximumFractionDigits: 2 }, { notation: 'compact' } (1.2K), { style: 'percent' }, { style: 'unit', unit: 'kilometer-per-hour' }.
Integer division: Math.trunc(a / b); modulo that's always positive: ((a % n) + n) % n.`),

  c('arrays', 'JavaScript arrays: every important method (map, filter, reduce, sort...)', ['javascript array methods', 'map filter reduce', 'array sort numbers', 'find findIndex', 'flat flatMap', 'remove duplicates array', 'array includes', 'splice slice', 'toSorted'],
    `Create: [], Array.of(1,2), Array.from({ length: 5 }, (_, i) => i) → [0..4], Array(3).fill(0), [...'abc'], Array.from(set).
Non-mutating: map(fn), filter(fn), reduce((acc, x) => ..., init), reduceRight, find/findLast, findIndex/findLastIndex, some/every, includes(x) (handles NaN), indexOf, slice(start, end), concat, join(sep), flat(depth), flatMap(fn), at(-1), entries/keys/values, and the ES2023 copies: toSorted, toReversed, toSpliced, with(i, v).
Mutating: push/pop (end), unshift/shift (start, O(n)), splice(start, deleteCount, ...items), sort(cmp), reverse, fill, copyWithin.
sort() is lexicographic by default: [10, 9, 1].sort() → [1, 10, 9]. Numbers: arr.sort((a, b) => a - b); descending b - a; strings: (a, b) => a.localeCompare(b); objects: users.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name)). sort is stable.
Common recipes: unique [...new Set(arr)]; unique by key: [...new Map(arr.map(o => [o.id, o])).values()]; group: Object.groupBy(arr, x => x.type) (ES2024) or reduce; chunk: Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n)); shuffle (Fisher-Yates): for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }; max: Math.max(...a); remove item: a.filter(x => x !== v) or a.splice(a.indexOf(v), 1) (check index !== -1); last: a.at(-1); range sum: a.reduce((s, x) => s + x, 0); intersection: a.filter(x => setB.has(x)); count: a.reduce((m, x) => (m[x] = (m[x] || 0) + 1, m), {}).
Loops: for (const x of arr), arr.forEach((x, i) => ...) (can't break — use for...of or some/every), for (let i = 0; i < arr.length; i++).
Destructuring: const [first, second, ...rest] = arr; swap [a, b] = [b, a]; default [x = 1] = [].
Pitfalls: map with async returns promises (await Promise.all(arr.map(async ...))); delete arr[i] leaves a hole; length is writable (arr.length = 0 empties it).`),

  c('objects', 'JavaScript objects: destructuring, spread, Object methods, copying', ['javascript objects', 'object destructuring', 'object spread', 'object keys values entries', 'deep copy js', 'structuredClone', 'getters setters', 'object freeze', 'json stringify'],
    `Literal shorthand: const o = { name, age, greet() { }, [dynamicKey]: 1, 'kebab-key': 2 }. Access: o.name, o['kebab-key'], o[key].
Destructuring: const { name, age = 18, address: { city } = {}, ...rest } = user; rename: const { name: userName } = user; in params: function f({ id, title = 'x' } = {}).
Spread/merge (shallow): const merged = { ...defaults, ...options }; Object.assign(target, src).
Iterate: Object.keys(o), Object.values(o), Object.entries(o) → [[k, v]...]; for (const [k, v] of Object.entries(o)); Object.fromEntries(entries) (map an object: Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v * 2]))). for...in also walks inherited enumerable keys — avoid or guard with Object.hasOwn(o, k).
Check keys: 'k' in o (incl. prototype), Object.hasOwn(o, 'k'), o.k !== undefined (fails if value is undefined).
Copy: shallow { ...o }; deep: structuredClone(o) (handles Date, Map, Set, cycles; not functions/DOM); JSON.parse(JSON.stringify(o)) loses Dates, undefined, functions, Infinity.
Protect: Object.freeze(o) (shallow, silently ignored outside strict mode), Object.seal, Object.preventExtensions. Property descriptors: Object.defineProperty(o, 'x', { value, writable: false, enumerable: false, configurable: false }).
Getters/setters: { get full() { return \`\${this.a} \${this.b}\`; }, set full(v) { [this.a, this.b] = v.split(' '); } }.
JSON: JSON.stringify(o, null, 2) (pretty), replacer array/function, toJSON(); JSON.parse(text, reviver). Map/Set don't stringify — convert with Object.fromEntries(map) / [...set].
Comparison: objects compare by reference; deep equality needs a helper (or util.isDeepStrictEqual in Node).
Optional properties: user?.profile?.avatar ?? defaultAvatar. Delete: delete o.key; omit: const { password, ...safe } = user.
Symbols as keys are hidden from keys/JSON (Object.getOwnPropertySymbols). Prototypes: Object.create(proto), Object.getPrototypeOf(o); Object.create(null) for a pure dictionary (or use Map).`),

  c('functions-this-closures', 'JavaScript functions: arrow functions, this, closures, call/apply/bind', ['javascript functions', 'arrow function vs function', 'this keyword', 'closure', 'call apply bind', 'default parameters', 'rest parameters', 'iife', 'callback', 'currying', 'debounce throttle'],
    `Forms: function declaration (hoisted: callable before its line), function expression (const f = function () {}), arrow (const f = (a, b) => a + b; one param: x => x * 2; returning an object: () => ({ ok: true })), method shorthand, async function, generator function*.
Parameters: defaults (function f(a, b = a * 2)), rest (...args — a real array; arguments is array-like and absent in arrows), destructured ({ id, ...rest }). Functions are values: pass them, return them, store them.
this: decided by HOW a function is called — obj.method() → obj; plain f() → undefined in strict mode/modules (globalThis in sloppy scripts); new F() → the new object; f.call(ctx, a, b) / f.apply(ctx, [a, b]) → ctx; f.bind(ctx) returns a bound copy. Arrow functions have NO own this — they use the surrounding this (great for callbacks inside methods, wrong for object methods and prototype methods). Losing this: const m = obj.method; m() → undefined (fix: obj.method.bind(obj) or an arrow wrapper). In DOM handlers (function form) this is the element; in class fields, arrow methods keep this: handleClick = () => { this... }.
Closures: an inner function keeps access to the variables of the scope it was created in, even after that scope returns — private state: function counter() { let n = 0; return { inc: () => ++n, get: () => n }; }.
Patterns: IIFE (() => { ... })(); currying const add = a => b => a + b; memoize with a Map cache; once: let done = false; return (...a) => done ? undefined : (done = true, fn(...a)).
Debounce: function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }  Throttle: function throttle(fn, ms) { let last = 0; return (...a) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...a); } }; }
Pure functions (no side effects, same input → same output) are easier to test. Recursion has no tail-call optimisation in practice — deep recursion overflows the stack (convert to a loop).`),

  c('classes-prototypes', 'JavaScript classes, inheritance, private fields and prototypes', ['javascript class', 'class inheritance extends', 'private fields #', 'static method', 'super', 'prototype chain', 'getter in class', 'instanceof', 'mixins'],
    `class Animal {
  static count = 0;              // static field
  #secret = 'hidden';            // private field (true privacy, # is part of the name)
  name;                          // public field
  constructor(name) { this.name = name; Animal.count++; }
  speak() { return \`\${this.name} makes a sound\`; }        // on the prototype
  get description() { return \`Animal: \${this.name}\`; }    // getter
  set nickname(v) { this.#secret = v; }
  #helper() { }                  // private method
  static create(name) { return new this(name); }
  static { /* static initialisation block */ }
}
class Dog extends Animal {
  constructor(name, breed) { super(name); this.breed = breed; }   // call super() before using this
  speak() { return \`\${super.speak()} — woof\`; }                  // override + call parent
}
const d = new Dog('Rex', 'lab'); d instanceof Animal // true
Notes: classes are syntax over prototypes (Dog.prototype.__proto__ === Animal.prototype); class bodies are always strict mode; class declarations are NOT hoisted like functions (TDZ). Methods aren't bound: pass this.handle.bind(this) or use an arrow class field (handle = () => {}). #field in obj checks brand. Can't access #private from outside or subclasses.
Composition over inheritance: prefer small objects/functions combined; mixins: const Serializable = (Base) => class extends Base { toJSON() { ... } }.
Built-in subclassing: class MyError extends Error { constructor(msg, code) { super(msg); this.name = 'MyError'; this.code = code; } }.
Old style (still seen): function Person(n) { this.n = n; } Person.prototype.hi = function () { }; Object.create(proto). Lookup goes up the prototype chain until null; own properties shadow inherited ones.
Singletons: export a single instance from a module. Abstract-ish: throw in the base method ('not implemented') or check new.target === Base in the constructor.`),

  c('control-flow-iteration', 'JavaScript control flow, loops, iterators and generators', ['javascript loops', 'for of vs for in', 'switch statement', 'break continue labels', 'generators yield', 'iterator protocol', 'while loop', 'async iterator'],
    `if / else if / else; switch (x) { case 1: ...; break; case 2: case 3: ...; break; default: ... } — uses ===, falls through without break; switch (true) { case age < 13: ... } for ranges.
Loops: for (let i = 0; i < n; i++); while (cond); do { } while (cond); for (const x of iterable) (arrays, strings, Maps, Sets, NodeLists, generators); for (const k in obj) (keys incl. inherited — not for arrays); break, continue, labels (outer: for (...) { for (...) { if (x) break outer; } }).
Iterating a Map: for (const [key, value] of map). Index with for...of: for (const [i, x] of arr.entries()).
Iterator protocol: an object with [Symbol.iterator]() returning { next() { return { value, done }; } } works with for...of and spread.
Generators: function* range(start, end, step = 1) { for (let i = start; i < end; i += step) yield i; }  [...range(0, 5)] → [0..4]; lazy/infinite sequences: function* ids() { let i = 0; while (true) yield i++; }; gen.next(value) sends a value in; yield* delegates; return() / throw().
Async iteration: for await (const chunk of stream) / async function* poll() { while (true) { yield await fetchData(); await sleep(1000); } }.
Exceptions as control flow: try { } catch (err) { } finally { } (catch param optional: catch { }). Guard clauses (return early) beat deep nesting.
Short loops: arr.forEach for side effects; some/every to stop early; find to get the first match.
Common bug: modifying an array while iterating forward — iterate backwards or filter into a new array.`),

  c('promises-async', 'JavaScript promises and async/await (with error handling)', ['javascript promises', 'async await', 'promise all', 'promise allSettled', 'promise race any', 'try catch async', 'sleep function js', 'callback hell', 'fetch await', 'parallel vs sequential'],
    `A Promise is a placeholder for a future value: pending → fulfilled/rejected. Create: new Promise((resolve, reject) => { ... }); Promise.resolve(v), Promise.reject(err). Consume: p.then(v => ...).catch(err => ...).finally(() => ...); then returns a new promise (chain, return values flow down, a thrown error jumps to the next catch).
async/await: an async function always returns a promise; await pauses it until the promise settles (throws on rejection):
async function getUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) { console.error('getUser failed:', err); throw err; }
}
Sleep: const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); await sleep(1000).
Parallel: const [a, b] = await Promise.all([getA(), getB()]) (rejects fast on the first error); Promise.allSettled([...]) → [{ status: 'fulfilled', value } | { status: 'rejected', reason }]; Promise.race (first to settle — timeouts: Promise.race([work(), sleep(5000).then(() => { throw new Error('timeout'); })])); Promise.any (first to fulfil, AggregateError if all fail). Sequential (when each depends on the previous or to limit load): for (const id of ids) { await process(id); }.
Don't: await inside forEach (doesn't wait) — use for...of or Promise.all(arr.map(async ...)); forget await (you get a Promise object, not the value); swallow errors (an unhandled rejection crashes Node).
Top-level await works in ES modules. Cancellation: AbortController — const ac = new AbortController(); fetch(url, { signal: ac.signal }); ac.abort(); AbortSignal.timeout(5000).
Limit concurrency: process in batches (for (let i = 0; i < items.length; i += 5) await Promise.all(items.slice(i, i + 5).map(work))).
Promisify callbacks: new Promise((res, rej) => fs.readFile(p, (e, d) => e ? rej(e) : res(d))) or util.promisify in Node.
Retry with backoff: for (let i = 0; i < 3; i++) { try { return await fn(); } catch (e) { if (i === 2) throw e; await sleep(2 ** i * 500); } }`),

  c('event-loop', 'The JavaScript event loop: call stack, microtasks, macrotasks, timers', ['javascript event loop', 'microtask macrotask', 'settimeout 0', 'why is js single threaded', 'blocking the main thread', 'queueMicrotask', 'requestAnimationFrame', 'web workers'],
    `JavaScript runs on ONE thread per realm: a call stack executes synchronous code to completion, then the event loop takes the next job. Queues: microtasks (promise callbacks, await continuations, queueMicrotask, MutationObserver) run right after the current task, ALL of them, before anything else; macrotasks/tasks (setTimeout, setInterval, I/O, UI events, MessageChannel) run one per loop turn; the browser renders between tasks (requestAnimationFrame callbacks run just before paint).
Order example: console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4); → 1, 4, 3, 2.
setTimeout(fn, 0) means "after the current task and all microtasks", minimum ~4 ms after nesting; timers are not precise. setInterval drifts — for accurate repeating use a self-scheduling setTimeout or compare Date.now().
Blocking: a long synchronous loop freezes the page (no clicks, no rendering) or blocks every request in Node. Fixes: split work into chunks with setTimeout/scheduler.postTask, use requestIdleCallback, or move CPU-heavy work to a Web Worker (browser) / worker_threads (Node).
Node specifics: phases (timers → pending callbacks → poll (I/O) → check (setImmediate) → close); process.nextTick runs before promise microtasks; setImmediate runs after I/O.
Async ≠ parallel: await just yields; true parallelism needs workers. Infinite microtask loops (a promise that keeps scheduling itself) starve rendering and timers.
Animation loop: function frame(t) { update(t); draw(); requestAnimationFrame(frame); } requestAnimationFrame(frame);`),

  c('modules', 'JavaScript modules: ES modules (import/export) vs CommonJS (require)', ['javascript import export', 'es modules', 'commonjs require', 'default export vs named export', 'dynamic import', 'module type in package.json', 'cannot use import statement outside a module', 'top level await'],
    `ES modules (the standard): export const PI = 3.14; export function area(r) { } export default class App { } — import App, { PI, area as circleArea } from './math.js'; import * as math from './math.js'; re-export: export { area } from './math.js'; export * from './utils.js'. Imports are hoisted, live bindings (read-only), strict mode by default, top-level await allowed, each module runs once (cached).
Dynamic import (code splitting, conditional): const { default: Chart } = await import('./chart.js').
In the browser: <script type="module" src="main.js"></script> (deferred automatically, CORS applies, file:// doesn't work — use a dev server). Import maps map bare names: <script type="importmap">{ "imports": { "lodash": "https://cdn..." } }</script>.
CommonJS (older Node): const fs = require('fs'); module.exports = { fn }; exports.fn = fn; require is synchronous and returns a copy of the exported value at that time; __dirname/__filename exist.
Node chooses by: "type": "module" in package.json (then .js = ESM, .cjs = CommonJS) or the .mjs/.cjs extension. Errors: "Cannot use import statement outside a module" → add "type": "module" or rename to .mjs; "require is not defined in ES module scope" → use import or createRequire(import.meta.url). ESM equivalents of __dirname: path.dirname(fileURLToPath(import.meta.url)) or import.meta.dirname (Node 20.11+). ESM imports need the file extension ('./util.js'). JSON: import data from './data.json' with { type: 'json' }.
Named vs default: prefer named exports (better refactoring/autocomplete, no import-name drift); one default per module max.
Circular imports work but can see undefined at evaluation time — avoid them or move shared code to a third module.
Bundlers (Vite, esbuild, webpack, Rollup) resolve imports, tree-shake unused named exports and output browser-ready files.`),

  c('dom-events', 'JavaScript DOM: selecting, creating, events and event delegation', ['javascript dom', 'queryselector', 'addEventListener', 'event delegation', 'create element', 'innerHTML vs textContent', 'classList', 'form submit preventDefault', 'dataset'],
    `Select: document.querySelector('.card') (first), document.querySelectorAll('li') (static NodeList — use forEach or [...list]), getElementById('id'), el.closest('.parent'), el.matches('.x'), el.children, el.parentElement, nextElementSibling.
Change: el.textContent = text (safe), el.innerHTML = html (XSS risk with user input), el.classList.add/remove/toggle/contains('active'), el.style.color = 'red' (prefer classes), el.setAttribute/getAttribute/removeAttribute, el.dataset.userId (data-user-id), input.value, checkbox.checked, el.hidden = true.
Create: const li = document.createElement('li'); li.textContent = name; list.append(li) (also prepend, before, after, replaceWith, remove()); many nodes: build a DocumentFragment, or list.replaceChildren(...items). Templates: <template id="row"> + template.content.cloneNode(true).
Events: btn.addEventListener('click', (e) => { ... }, { once: true, passive: true }); removeEventListener needs the same function reference; e.target (the element clicked), e.currentTarget (the element with the listener), e.preventDefault() (stop default: form submit, link navigation), e.stopPropagation(). Keyboard: 'keydown' with e.key === 'Enter'. Inputs: 'input' (every change), 'change' (commit). Page: 'DOMContentLoaded', 'load', 'beforeunload'. Custom: el.dispatchEvent(new CustomEvent('saved', { detail: data, bubbles: true })).
Delegation (one listener for many/dynamic children): list.addEventListener('click', (e) => { const item = e.target.closest('li'); if (!item || !list.contains(item)) return; select(item.dataset.id); });
Forms: form.addEventListener('submit', (e) => { e.preventDefault(); const data = Object.fromEntries(new FormData(form)); });
Layout reads (offsetHeight, getBoundingClientRect) after writes force reflow — batch reads then writes. Observers: IntersectionObserver (lazy load, infinite scroll), ResizeObserver, MutationObserver.
Scripts: put <script defer src="app.js"> in <head> (or type="module") so the DOM exists when it runs.`),

  c('fetch-storage-json', 'JavaScript fetch, HTTP requests, JSON, localStorage and cookies', ['javascript fetch', 'fetch post json', 'fetch error handling', 'localstorage', 'sessionstorage', 'cors error', 'api request javascript', 'json parse error', 'abortcontroller timeout'],
    `GET: const res = await fetch('https://api.example.com/items?page=2'); if (!res.ok) throw new Error(\`HTTP \${res.status}\`); const data = await res.json(); — fetch only rejects on NETWORK errors; a 404/500 still resolves, so check res.ok/res.status.
POST JSON: await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: \`Bearer \${token}\` }, body: JSON.stringify(payload) });
Form/file upload: const fd = new FormData(); fd.append('file', input.files[0]); fetch(url, { method: 'POST', body: fd }) (don't set Content-Type yourself). Query strings: new URLSearchParams({ q: 'cats', page: 2 }).toString(); new URL(path, base).
Response bodies: res.json(), res.text(), res.blob(), res.arrayBuffer(), res.body (stream); read once. Headers: res.headers.get('content-type').
Timeout/cancel: fetch(url, { signal: AbortSignal.timeout(8000) }). Credentials/cookies cross-origin: { credentials: 'include' }.
CORS: the browser blocks reading responses from another origin unless the SERVER sends Access-Control-Allow-Origin — fix on the server (or proxy through your own backend); never on the client.
Storage: localStorage.setItem('k', JSON.stringify(v)); JSON.parse(localStorage.getItem('k') ?? 'null'); removeItem, clear. Strings only, ~5 MB, synchronous, per-origin, survives restarts; sessionStorage = per tab. Wrap in try/catch (private mode, quota). Never store secrets/tokens there if XSS is possible (httpOnly cookies are safer). Bigger/structured data: IndexedDB (via idb-keyval or Dexie).
Cookies: document.cookie = 'theme=dark; max-age=31536000; path=/; SameSite=Lax' (reading gives one string to parse).
JSON pitfalls: JSON.parse on invalid text throws (try/catch); dates come back as strings; BigInt can't be stringified.
Real-time: WebSocket (new WebSocket('wss://...'), onmessage), Server-Sent Events (new EventSource(url)).`),

  c('collections-symbols', 'JavaScript Map, Set, WeakMap, WeakRef, Symbol and typed arrays', ['javascript map vs object', 'set unique values', 'weakmap', 'symbol', 'typed arrays', 'map has get set', 'set operations union intersection'],
    `Map: any key type (objects, functions), keeps insertion order, .size, set(k, v) (chainable), get, has, delete, clear, keys/values/entries, forEach, for (const [k, v] of map). new Map(Object.entries(obj)); Object.fromEntries(map). Prefer Map over objects for dynamic keys, frequent add/remove, or non-string keys. Map.groupBy(arr, fn) (ES2024).
Set: unique values (=== semantics, NaN equals NaN), add/has/delete/size, [...set]. Remove duplicates: [...new Set(arr)]. ES2025 set methods: a.union(b), a.intersection(b), a.difference(b), a.symmetricDifference(b), a.isSubsetOf(b) — fallback: new Set([...a].filter(x => b.has(x))).
WeakMap/WeakSet: keys must be objects, held weakly (garbage-collected when nothing else references them), not iterable — private data per object, caching per DOM node. WeakRef + FinalizationRegistry for advanced caches (rarely needed).
Symbol: unique identifiers — const id = Symbol('id'); obj[id] = 1 (hidden from keys/JSON). Global registry: Symbol.for('app.key'). Well-known symbols customise behaviour: Symbol.iterator, Symbol.asyncIterator, Symbol.toPrimitive, Symbol.hasInstance, Symbol.toStringTag.
Typed arrays (binary data): Uint8Array, Int16Array, Float32Array, Float64Array, BigInt64Array over an ArrayBuffer; DataView for mixed endianness; TextEncoder/TextDecoder convert strings ↔ Uint8Array. Used with WebGL, canvas pixels, files, WebSockets, crypto.
Other built-ins: structuredClone, Intl (DateTimeFormat, NumberFormat, RelativeTimeFormat, PluralRules, ListFormat, Collator, Segmenter), Proxy/Reflect (intercept get/set — reactive frameworks), globalThis.`),

  c('dates-time', 'JavaScript dates and times: Date, time zones, formatting, Intl', ['javascript date', 'format date js', 'time zone javascript', 'add days to date', 'difference between two dates', 'timestamp', 'toISOString', 'intl datetimeformat', 'relative time'],
    `Date stores milliseconds since 1970-01-01T00:00:00Z (UTC). Create: new Date() (now), Date.now() (number), new Date('2026-10-05T14:30:00Z') (ISO — the only reliable string format; 'YYYY-MM-DD' alone is parsed as UTC midnight, 'YYYY-MM-DDTHH:mm' as LOCAL), new Date(2026, 9, 5) — months are 0-based (9 = October)!
Getters: getFullYear, getMonth (0-11), getDate (1-31), getDay (0 = Sunday), getHours..., getTime(); UTC versions getUTCHours... Setters mutate: d.setDate(d.getDate() + 7) (rolls over months correctly).
Difference in days: Math.round((b - a) / 86_400_000) (DST can make a "day" 23/25 h — compare dates at noon or in UTC). Add 30 minutes: new Date(d.getTime() + 30 * 60_000).
Format: d.toISOString() (UTC, for APIs/storage); d.toLocaleDateString('fr-CA'); new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Toronto' }).format(d); parts: formatToParts. Relative: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-1, 'day') → "yesterday".
Time zones: Date has no zone of its own — it formats in the runtime's local zone unless you pass timeZone to Intl. Store/send UTC ISO strings; convert only for display. Current time in a zone: new Date().toLocaleString('en-CA', { timeZone: 'Asia/Tokyo' }).
Validate: isNaN(new Date(x).getTime()) → invalid.
Libraries: date-fns (functional, tree-shakable), Day.js (tiny, Moment-like), Luxon (zones). Moment.js is legacy. Temporal (Temporal.PlainDate, ZonedDateTime) is the modern built-in replacement, arriving in engines.
Countdown: const ms = target - Date.now(); const s = Math.max(0, Math.floor(ms / 1000)); const [d, h, m, sec] = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];`),

  c('regex', 'JavaScript regular expressions: syntax, flags, groups, matchAll', ['javascript regex', 'regexp test', 'regex groups', 'matchAll', 'regex flags g i m', 'email regex js', 'lookahead', 'replace with regex'],
    `Create: /pattern/flags or new RegExp(str, flags) (escape user input: str.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&')). Flags: g (all matches), i (case-insensitive), m (^ $ per line), s (. matches newlines), u (unicode — needed for \\p{L} and emoji), y (sticky), d (match indices), v (unicode sets).
Syntax: . any char; \\d \\w \\s and \\D \\W \\S; [abc] [^abc] [a-z]; ^ $ anchors; \\b word boundary (ASCII only — not before é); quantifiers * + ? {n} {n,} {n,m}, lazy versions *? +?; groups (x) capture, (?:x) non-capture, (?<name>x) named; alternation a|b; backreference \\1 / \\k<name>; lookahead (?=x) (?!x); lookbehind (?<=x) (?<!x); unicode classes \\p{L} \\p{Emoji} with u.
Methods: re.test(str) → boolean (with g/y, lastIndex moves between calls — a common bug); str.match(re) (without g: details + groups; with g: all match strings); [...str.matchAll(/(?<word>\\w+)/g)].map(m => m.groups.word); str.replace(re, '$<name>') or a callback; str.split(/\\s*,\\s*/); re.exec(str) in a loop for older code.
Useful patterns: trim spaces /^\\s+|\\s+$/g; collapse whitespace /\\s+/g → ' '; digits only /^\\d+$/; hex colour /^#(?:[0-9a-f]{3}){1,2}$/i; simple email /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ (real validation = send a confirmation email); URL → use new URL(); slug: s.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').
Performance: avoid nested quantifiers like (a+)+ on user input (catastrophic backtracking / ReDoS). Prefer string methods (includes, startsWith) when a regex isn't needed.`),

  c('errors-debugging', 'JavaScript errors and debugging: error types, try/catch, common mistakes', ['javascript errors', 'cannot read properties of undefined', 'is not a function', 'try catch finally', 'custom error class', 'debugging javascript', 'console methods', 'undefined is not an object', 'stack trace'],
    `Built-in errors: SyntaxError (bad code / bad JSON), ReferenceError (variable not declared / TDZ), TypeError (wrong type: calling a non-function, reading a property of undefined/null, assigning to const), RangeError (invalid length, too much recursion), URIError, AggregateError (Promise.any), DOMException in browsers.
Most common messages and fixes:
- "Cannot read properties of undefined (reading 'x')" → the thing before .x is undefined: data not loaded yet, wrong key, missing return, or an array index out of range. Use optional chaining, defaults, or check where the value comes from.
- "x is not a function" → misspelt method, wrong import (default vs named), calling a value, this lost, or an array method on a non-array (NodeList.map, object.forEach).
- "x is not defined" → typo, missing import, script order, using a variable outside its block.
- "Unexpected token '<' in JSON" → the server returned HTML (an error page or index.html) instead of JSON: check the URL and res.ok.
- "Assignment to constant variable" → use let.
- "Maximum call stack size exceeded" → infinite recursion (or a setter calling itself).
- Unhandled promise rejection → missing await/catch.
Throw Error objects (stack traces): throw new Error('Invalid id', { cause: err }). Custom: class ValidationError extends Error { constructor(msg, field) { super(msg); this.name = 'ValidationError'; this.field = field; } } — check with err instanceof ValidationError.
try { } catch (err) { } finally { } — finally always runs; catch only what you can handle, rethrow the rest. Global: window.addEventListener('error' / 'unhandledrejection'); process.on('unhandledRejection') in Node.
Console: log, info, warn, error, table(arrayOfObjects), dir(obj), group/groupEnd, time/timeEnd('label'), count, trace, assert(cond, msg). debugger; statement pauses in DevTools. DevTools: breakpoints (conditional, on DOM changes, on XHR), watch expressions, Network tab (status, payload, response), Performance tab, Lighthouse.
Linting (ESLint) and TypeScript catch most of these before running.`),

  c('performance-security', 'JavaScript performance and security: XSS, eval, memory leaks, fast code', ['javascript performance', 'xss prevention', 'eval is evil', 'memory leak javascript', 'optimize javascript', 'lazy loading', 'content security policy', 'sanitize html'],
    `Security:
- XSS: never put untrusted text in innerHTML/outerHTML/insertAdjacentHTML/document.write; use textContent or create elements; if you must render HTML, sanitise with DOMPurify. Frameworks escape by default (React's dangerouslySetInnerHTML opts out). Validate URLs before href/src (block javascript: URLs).
- Never eval(), new Function(str), setTimeout('string') with user data.
- Secrets in front-end code are public (API keys in bundles, .env variables exposed by the bundler) — keep them on the server.
- CSRF: SameSite cookies + CSRF tokens on state-changing requests. CSP header (Content-Security-Policy: default-src 'self') limits damage. Use HTTPS, Subresource Integrity for CDN scripts, keep dependencies updated (npm audit).
- Prototype pollution: don't deep-merge untrusted JSON into objects without blocking __proto__/constructor; use Object.create(null) or Map for dictionaries.
Performance:
- Measure first: DevTools Performance, Lighthouse, performance.now(), console.time.
- DOM is the slow part: batch updates, avoid layout thrashing (reads then writes), use classes instead of many inline styles, virtualise long lists, debounce scroll/resize/input handlers, use passive listeners.
- Algorithms: Set/Map lookups are O(1) vs array.includes O(n) in loops; avoid nested loops over big arrays; don't create functions/objects in hot loops unnecessarily.
- Loading: code-split with dynamic import(), defer/async scripts, lazy-load images (loading="lazy"), compress (gzip/brotli), cache headers, tree-shaking, smaller dependencies.
- Memory leaks: forgotten timers/intervals, event listeners on removed elements, growing global caches, closures holding big objects, detached DOM nodes — clean up (clearInterval, removeEventListener, AbortController signal for listeners, WeakMap caches). Check with the Memory tab heap snapshots.
- Heavy CPU work → Web Workers; animations → CSS transforms/opacity or requestAnimationFrame.`),

  c('tooling-testing', 'JavaScript tooling and testing: npm, package.json, Vite, ESLint, Prettier, Vitest/Jest', ['npm install', 'package.json scripts', 'vite', 'eslint prettier', 'jest vitest', 'unit test javascript', 'node modules', 'semver', 'npx'],
    `npm: npm init -y; npm install pkg (dependencies) / npm install -D pkg (devDependencies); npm uninstall; npm run <script>; npx <tool> (run without installing globally); npm ci (clean install from the lockfile — use in CI); npm outdated / npm update; npm audit. Commit package-lock.json, never node_modules (.gitignore). Alternatives: pnpm (fast, disk-efficient), yarn, bun (runtime + package manager + test runner).
package.json: "name", "version", "type": "module", "main"/"exports", "scripts": { "dev": "vite", "build": "vite build", "test": "vitest", "lint": "eslint ." }, "engines". SemVer: ^1.2.3 allows 1.x.x, ~1.2.3 allows 1.2.x, exact 1.2.3.
Projects: npm create vite@latest my-app (React/Vue/Svelte/vanilla templates, instant dev server with HMR, build to dist/). Environment variables in Vite: import.meta.env.VITE_API_URL (only VITE_-prefixed are exposed — and they ARE public).
Code quality: ESLint (npm init @eslint/config) finds bugs; Prettier formats (don't argue about style); EditorConfig; husky + lint-staged run them on commit. TypeScript adds types (can be added gradually with // @ts-check and JSDoc).
Testing with Vitest (Jest-compatible API):
// sum.test.js
import { describe, it, expect, vi } from 'vitest';
import { sum } from './sum.js';
describe('sum', () => {
  it('adds numbers', () => { expect(sum(2, 3)).toBe(5); });
  it('handles floats', () => { expect(sum(0.1, 0.2)).toBeCloseTo(0.3); });
});
Matchers: toBe (===), toEqual (deep), toStrictEqual, toContain, toMatch(/re/), toThrow, toHaveBeenCalledWith, resolves/rejects for promises. Mocks: vi.fn(), vi.spyOn(obj, 'm'), vi.mock('./api.js'), fake timers vi.useFakeTimers(). DOM testing: @testing-library/dom or @testing-library/react with jsdom. End-to-end: Playwright or Cypress.
Debugging Node: node --inspect, VS Code launch configs. Build tools: esbuild (fast bundling), Rollup (libraries), webpack (legacy/complex apps), tsc for type checks.`),
];
