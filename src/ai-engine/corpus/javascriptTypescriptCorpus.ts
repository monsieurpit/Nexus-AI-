import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — JavaScript & TypeScript fundamentals. Plain neutral
// educational content covering variable declarations, closures, this-binding, async patterns,
// the event loop, array/object methods, destructuring, and core TypeScript typing concepts.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const JAVASCRIPT_TYPESCRIPT_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-js-var-let-const',
    'var vs let vs const in JavaScript',
    ['javascript var let const', 'let vs const', 'var vs let'],
    "JavaScript has three ways to declare a variable, and they differ mainly in scope and mutability. `var` is function-scoped (or globally scoped if declared outside a function) and is \"hoisted\" — its declaration is moved to the top of its enclosing function during compilation, though its assignment is not, so it can be referenced before the line it's declared on (as `undefined`) without an error. `let` and `const`, introduced in ES6, are block-scoped instead — confined to the nearest `{}` block (like an `if` or `for` body), and they exist in a \"temporal dead zone\" before their declaration line, so accessing them earlier throws a ReferenceError rather than silently giving `undefined`. `const` additionally prevents reassigning the variable itself after initialization (though if it holds an object or array, the object's contents can still be mutated — only the binding is frozen, not the value). Modern JavaScript style strongly prefers `const` by default and `let` only when reassignment is needed, avoiding `var` almost entirely due to its confusing scoping rules.",
  ),
  k(
    'kb-code-js-closures',
    'Closures in JavaScript',
    ['javascript closure', 'what is a closure'],
    "A closure is a function that \"remembers\" the variables from the scope it was defined in, even after that outer scope has finished executing. For example: `function makeCounter() {\\n  let count = 0;\\n  return function() { count += 1; return count; };\\n}\\nconst counter = makeCounter();` — the inner function returned by `makeCounter` keeps access to `count` even though `makeCounter()` has already returned, because it \"closes over\" that variable. Each call to `makeCounter()` creates a fresh, independent `count` for that closure. Closures are the mechanism behind private state in JavaScript (before classes had true private fields), behind callback functions that need access to outer variables, and behind common patterns like debounce/throttle functions and module patterns. A classic pitfall involves closures inside loops with `var` (which is function-scoped, so all closures share the same variable and see its final value after the loop ends) — `let` fixes this because each loop iteration gets its own block-scoped binding.",
  ),
  k(
    'kb-code-js-this',
    "JavaScript's this keyword",
    ['javascript this', 'this binding javascript'],
    "In JavaScript, `this` refers to different things depending on HOW a function is called, not where it's defined (with one major exception: arrow functions). When called as a method (`obj.method()`), `this` refers to `obj`. When called as a plain function (`someFunction()`), `this` is `undefined` in strict mode (or the global object in non-strict mode). When called with `new` (`new Constructor()`), `this` refers to the newly created object. `.call()`, `.apply()`, and `.bind()` let you explicitly set what `this` should be for a given function call. Arrow functions (`() => {}`) are the exception: they don't have their own `this` at all — they inherit `this` from the enclosing (lexical) scope at the time they're defined, which is why arrow functions are commonly used for callbacks inside methods (like array `.map()` callbacks) to avoid `this` unexpectedly changing to something else, a very common source of bugs with regular `function` callbacks used the same way.",
  ),
  k(
    'kb-code-js-async-await',
    'async/await, promises, and callbacks in JavaScript',
    ['javascript async await', 'javascript promises', 'javascript callbacks'],
    "JavaScript handles asynchronous operations (network requests, timers, file reads) in three related styles, from oldest to newest. Callbacks are plain functions passed as arguments to be called later when an operation finishes, e.g. `setTimeout(() => console.log(\"done\"), 1000)` — nesting many callbacks leads to deeply indented \"callback hell.\" Promises (ES6) represent a future value with three states — pending, fulfilled, or rejected — and are chained with `.then()` for success and `.catch()` for errors, flattening nested callbacks into a more linear chain. `async`/`await` (ES2017) is syntactic sugar over promises: marking a function `async` lets you use `await` inside it to pause execution until a promise resolves, making asynchronous code read like ordinary synchronous code top-to-bottom, while errors are caught with a regular `try`/`catch` block instead of `.catch()`. Under the hood, `await somePromise` is equivalent to `somePromise.then(...)`, and an `async` function always itself returns a promise.",
  ),
  k(
    'kb-code-js-event-loop',
    "JavaScript's event loop",
    ['javascript event loop', 'javascript call stack', 'javascript single threaded'],
    "JavaScript runs on a single main thread, meaning only one piece of code executes at a time — yet it can still handle asynchronous operations without blocking, through the event loop. The call stack executes synchronous code; when an asynchronous operation (like a `fetch` request or `setTimeout`) is started, it's handed off to the browser or Node.js runtime, which runs it outside the main thread and, once finished, queues its callback rather than running it immediately. The event loop continuously checks: is the call stack empty? If so, it takes the next callback from the queue and pushes it onto the stack to run. There are actually two queues with different priority — the microtask queue (promise callbacks, `async`/`await` continuations) is always fully drained before the macrotask queue (`setTimeout`, `setInterval`, I/O callbacks) processes even one more task, which is why a `Promise.resolve().then(...)` scheduled after a `setTimeout(fn, 0)` still runs first.",
  ),
  k(
    'kb-code-js-arrow-functions',
    'Arrow functions in JavaScript',
    ['javascript arrow function', 'javascript fat arrow'],
    "Arrow functions, introduced in ES6, offer a shorter syntax than regular `function` expressions: `(a, b) => a + b` versus `function(a, b) { return a + b; }`. With a single expression body (no curly braces), the value is implicitly returned; with curly braces, an explicit `return` is needed just like a normal function. A single parameter can skip the parentheses (`x => x * 2`), though many style guides require them for consistency. Besides being shorter, arrow functions differ meaningfully from regular functions in behavior: they don't have their own `this`, `arguments` object, or `super`, all of which are inherited from the enclosing scope instead — this makes them unsuitable as object methods that need to reference the object via `this`, or as constructor functions (they can't be called with `new`). They're ideal for short callbacks and for preserving the outer `this` inside class methods or nested functions.",
  ),
  k(
    'kb-code-js-destructuring',
    'Destructuring and spread/rest in JavaScript',
    ['javascript destructuring', 'javascript spread operator', 'javascript rest parameter'],
    "Destructuring lets you unpack values from arrays or properties from objects into distinct variables in one statement. Array destructuring: `const [first, second] = [1, 2];` assigns by position. Object destructuring: `const { name, age } = person;` assigns by matching property names, and can rename (`const { name: n } = person;`) or provide defaults (`const { age = 0 } = person;`). The spread operator (`...`) expands an iterable into individual elements: `const combined = [...arr1, ...arr2];` merges arrays, and `{ ...obj1, ...obj2 }` merges objects (later keys override earlier ones), commonly used to copy or merge data immutably. The rest parameter uses the same `...` syntax but in the opposite direction, gathering multiple remaining items into one array or object: `function sum(...nums) { return nums.reduce((a,b) => a+b); }` collects all arguments into a `nums` array, and `const { first, ...rest } = obj;` puts everything except `first` into `rest`.",
  ),
  k(
    'kb-code-js-array-methods',
    'JavaScript array methods: map, filter, reduce',
    ['javascript map filter reduce', 'javascript array methods'],
    "`.map()`, `.filter()`, and `.reduce()` are core array methods for transforming data without manual loops, and none of them mutate the original array. `.map(callback)` returns a new array of the same length, with each element transformed by the callback: `[1,2,3].map(x => x * 2)` gives `[2,4,6]`. `.filter(callback)` returns a new array containing only elements for which the callback returns true: `[1,2,3,4].filter(x => x % 2 === 0)` gives `[2,4]`. `.reduce(callback, initialValue)` collapses an array into a single value by repeatedly applying the callback, which receives an accumulator and the current element: `[1,2,3].reduce((acc, x) => acc + x, 0)` gives `6`. These three are commonly chained together, e.g. filtering then mapping then summing, and are generally preferred in modern JavaScript over manual `for` loops for readability, though a plain loop can be faster for very large arrays or when early termination is needed (`.map`/`.filter` always process every element; a `for` loop with `break` doesn't have to).",
  ),
  k(
    'kb-code-ts-basics',
    'TypeScript basics: types and interfaces',
    ['typescript types', 'typescript interface', 'typescript basics'],
    "TypeScript is a superset of JavaScript that adds static typing, checked at compile time before the code even runs, catching many bugs (like passing a string where a number is expected) that JavaScript would only reveal at runtime or not at all. Basic type annotations use a colon: `let age: number = 30; let name: string = \"Alex\"; let active: boolean = true;`. An `interface` describes the shape of an object: `interface User {\\n  name: string;\\n  age: number;\\n  email?: string;\\n}` — the `?` marks `email` as optional. A `type` alias can do similar things and is often interchangeable with `interface` for object shapes, but `type` can also express things interfaces can't, like union types. Function parameter and return types can also be annotated: `function add(a: number, b: number): number { return a + b; }`. TypeScript is compiled (\"transpiled\") down to plain JavaScript before running, since browsers and Node.js don't execute TypeScript directly.",
  ),
  k(
    'kb-code-ts-generics',
    'TypeScript generics',
    ['typescript generics', 'typescript generic type'],
    "Generics let a function, interface, or class work with multiple types while still preserving type-safety, instead of either duplicating code per type or falling back to the unsafe `any` type. A generic function uses a type parameter, conventionally written `T`, in angle brackets: `function identity<T>(value: T): T { return value; }` — calling `identity<number>(5)` or just `identity(5)` (TypeScript can infer `T` from the argument) returns a number, while `identity(\"hi\")` returns a string, and the compiler tracks the specific type used at each call site. Generic interfaces work similarly: `interface Box<T> { value: T; }` can become `Box<string>` or `Box<number>` as needed. Generics are heavily used in built-in types like `Array<T>` (equivalent to `T[]`) and `Promise<T>` (a promise that resolves to a value of type T). Constraints can narrow what a generic accepts, e.g. `function getLength<T extends { length: number }>(item: T)` only accepts types that have a `.length` property.",
  ),
  k(
    'kb-code-ts-union-types',
    'TypeScript union types and type narrowing',
    ['typescript union type', 'typescript type narrowing'],
    "A union type in TypeScript allows a value to be one of several specified types, written with a pipe: `let id: string | number;` means `id` can hold either a string or a number, but nothing else. This is useful for values that legitimately vary, like an API response field that's sometimes a number and sometimes a formatted string. To safely use a union-typed value, TypeScript requires \"narrowing\" it down to one specific type first, typically with a runtime check: `if (typeof id === \"string\") { id.toUpperCase(); } else { id.toFixed(2); }` — inside each branch, TypeScript automatically knows which specific type `id` is and allows only that type's methods, catching an error at compile time if you try to call a string-only method inside the number branch. Other narrowing techniques include `instanceof` checks for class instances, and checking for a discriminating property shared across a union of object types (a common pattern called a \"discriminated union\").",
  ),
  k(
    'kb-code-js-equality',
    '== vs === in JavaScript',
    ['javascript double equals triple equals', 'javascript loose equality strict equality'],
    "JavaScript has two equality operators with different behavior. `===` (strict equality) compares both value AND type, returning false immediately if the types differ, with no conversion: `5 === \"5\"` is false because one is a number and the other a string. `==` (loose equality) performs type coercion before comparing, converting operands to a common type first: `5 == \"5\"` is true because the string `\"5\"` gets converted to the number 5 before comparing. This coercion can produce surprising and inconsistent results in edge cases (`0 == false` is true, `\"\" == 0` is true, but `null == undefined` is true while `null == 0` is false), which is why virtually all modern JavaScript style guides recommend using `===` (and `!==`) by default and avoiding `==` unless there's a specific, well-understood reason to want type coercion.",
  ),
  k(
    'kb-code-js-hoisting',
    'Hoisting in JavaScript',
    ['javascript hoisting', 'javascript function declaration order'],
    "Hoisting refers to JavaScript's behavior of processing variable and function declarations before executing code line by line. Function declarations (`function foo() {}`) are fully hoisted — both the name and the function body are available even before the line where they're written, so you can call `foo()` earlier in the file and it still works. `var` declarations are hoisted but only the declaration, not the assignment — the variable exists from the top of its scope but holds `undefined` until the actual assignment line runs. `let` and `const` are technically hoisted too, but they remain in an inaccessible \"temporal dead zone\" from the start of the block until their declaration line, so referencing them earlier throws a ReferenceError rather than returning `undefined`. Function EXPRESSIONS (`const foo = function() {}` or `const foo = () => {}`) are not hoisted the same way as declarations — only the `const foo` binding is hoisted (into the dead zone), not the function value, so calling `foo()` before that line fails.",
  ),
  k(
    'kb-code-js-modules',
    'JavaScript modules: import/export vs require',
    ['javascript import export', 'javascript require', 'commonjs vs es modules'],
    "JavaScript has two competing module systems. CommonJS, Node.js's original system, uses `require()` to import and `module.exports` to export: `const fs = require(\"fs\"); module.exports = myFunction;` — these calls are synchronous and can technically happen anywhere in the file, even conditionally inside an `if`. ES Modules (ESM), the standardized JavaScript module system now supported natively by browsers and modern Node.js, uses `import`/`export` keywords: `import fs from \"fs\"; export default myFunction;` or `export const myFunction = () => {};` for named exports (imported elsewhere with `import { myFunction } from \"./file.js\"`). ESM imports are statically analyzed and hoisted to the top of the file (they can't be conditional in the same way), which enables tooling benefits like tree-shaking (removing unused exports from a final bundle). Node.js determines which system a file uses based on the `\"type\"` field in package.json (`\"module\"` for ESM, or absent/`\"commonjs\"` for CommonJS) or the file extension (`.mjs` vs `.cjs`).",
  ),
  k(
    'kb-code-js-object-methods',
    'JavaScript object methods and Object utilities',
    ['javascript object keys values entries', 'javascript object methods'],
    "JavaScript provides several static `Object` methods for working with plain objects. `Object.keys(obj)` returns an array of an object's own enumerable property names (strings). `Object.values(obj)` returns an array of the corresponding values. `Object.entries(obj)` returns an array of `[key, value]` pairs, which is especially useful for iterating with a `for...of` loop or converting to a `Map`. `Object.assign(target, ...sources)` copies properties from source objects into a target object (mutating and returning the target), commonly used for shallow merging, though the spread operator (`{ ...obj1, ...obj2 }`) is now more idiomatic for creating a new merged object without mutation. `Object.freeze(obj)` prevents any further modification to an object's existing properties (though it's shallow — nested objects inside it remain mutable). These methods only operate on an object's OWN properties, not ones inherited through its prototype chain.",
  ),
  k(
    'kb-code-js-prototypes',
    'JavaScript prototypes and prototypal inheritance',
    ['javascript prototype', 'javascript prototypal inheritance'],
    "JavaScript's inheritance model is prototype-based rather than purely class-based (even though ES6 `class` syntax exists, it's largely syntactic sugar over prototypes underneath). Every object has an internal link to another object called its prototype, and when you access a property that doesn't exist directly on the object, JavaScript automatically looks it up on the prototype, then the prototype's prototype, and so on up what's called the \"prototype chain,\" until it finds the property or reaches `null`. `Object.create(proto)` creates a new object with a specific prototype directly. Functions have a `.prototype` property (distinct from their own internal prototype) that becomes the prototype of objects created with `new SomeFunction()` — this is how methods defined once on a constructor's prototype get shared across all instances without being duplicated in memory for each one. ES6 `class` syntax (`class Dog { bark() {} }`) compiles down to essentially the same prototype-based mechanism, just with cleaner, more familiar syntax borrowed from classical OOP languages.",
  ),
  k(
    'kb-code-ts-any-unknown',
    'TypeScript any vs unknown',
    ['typescript any vs unknown', 'typescript any type'],
    "`any` and `unknown` are both TypeScript types that can hold a value of any type, but they behave very differently regarding safety. A variable typed `any` completely opts out of type checking — you can call any method or access any property on it with no compile-time error, even ones that don't actually exist, which reintroduces the exact runtime errors TypeScript is meant to prevent; it's essentially an escape hatch. A variable typed `unknown` also can hold any value, but TypeScript refuses to let you DO anything with it (call methods, access properties, use in operations) until you first narrow it to a more specific type via a type check like `typeof`, `instanceof`, or a type assertion. This makes `unknown` the safer choice for genuinely unpredictable values (like data just parsed from JSON or an API response), because it forces you to verify the shape before using it, while `any` should generally be avoided except as a last resort or during incremental migration of JavaScript code to TypeScript.",
  ),
  k(
    'kb-code-js-nullish-coalescing',
    'Optional chaining and nullish coalescing in JavaScript',
    ['javascript optional chaining', 'javascript nullish coalescing'],
    "Optional chaining (`?.`), introduced in ES2020, safely accesses a nested property without throwing an error if an intermediate value is `null` or `undefined`: `user?.address?.city` evaluates to `undefined` instead of crashing if `user` or `user.address` doesn't exist, replacing the older verbose pattern of chained `&&` checks (`user && user.address && user.address.city`). It also works for optional method calls (`obj.method?.()`) and array access (`arr?.[0]`). The nullish coalescing operator (`??`), also ES2020, provides a default value specifically when the left side is `null` or `undefined` — importantly different from the logical OR operator `||`, which also falls back on ANY falsy value including `0`, `\"\"`, or `false`. So `count ?? 10` keeps `count` as `0` if it's legitimately zero, while `count || 10` would incorrectly replace a real `0` with `10`. These two operators are commonly combined: `user?.settings?.volume ?? defaultVolume`.",
  ),
  k(
    'kb-code-js-json',
    'JSON in JavaScript',
    ['javascript json parse stringify', 'json basics'],
    "JSON (JavaScript Object Notation) is a lightweight, text-based data format widely used for APIs and configuration, structurally similar to a JavaScript object literal but with stricter rules: keys must be double-quoted strings, trailing commas are not allowed, and values are limited to strings, numbers, booleans, `null`, arrays, and nested objects — functions, `undefined`, and `Date` objects (among others) are not valid JSON. `JSON.stringify(obj)` converts a JavaScript value into a JSON-formatted string, optionally with a third argument for pretty-printing indentation (`JSON.stringify(obj, null, 2)`). `JSON.parse(text)` converts a JSON string back into a JavaScript value. Because `JSON.stringify` silently drops keys with `undefined` values and function values, and converts `Date` objects to ISO string timestamps, round-tripping complex objects through JSON can lose information — this is a common source of subtle bugs when using JSON purely as an in-memory deep-clone technique (`JSON.parse(JSON.stringify(obj))`).",
  ),
];
