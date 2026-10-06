import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('typescript', slug, title, keywords, content);

export const CODE_TYPESCRIPT = [
  c('basics', 'TypeScript basics: type annotations, inference, primitive types, any vs unknown', ['typescript basics', 'type annotation', 'type inference', 'any vs unknown', 'never type', 'void', 'typescript tutorial', 'strict mode tsconfig'],
    `TypeScript = JavaScript + static types, erased at compile time (no runtime checks — validate external data yourself). Annotate: let count: number = 0; const name: string = 'Ana'; let ok: boolean; let ids: number[] or Array<number>; let pair: [string, number] (tuple); function add(a: number, b: number): number { return a + b; }.
Inference: let x = 5 is number already — annotate function parameters, exported APIs and empty values ([] needs a type: const items: Item[] = []). const literals narrow: const dir = 'up' has type 'up'.
Special types: any (turns checking off — avoid), unknown (anything, but you must narrow before use — use for external input/catch errors), never (impossible: exhaustive checks, functions that always throw), void (no useful return), null/undefined (separate with strictNullChecks), object, symbol, bigint.
Literal types and unions: type Status = 'idle' | 'loading' | 'error'; let s: Status = 'idle'; function f(id: string | number).
Optional and defaults: function greet(name?: string, greeting = 'Hi') — name is string | undefined.
Type assertions: value as HTMLInputElement (you promise it's true — no check), non-null assertion el! (avoid; check instead), satisfies (checks a value against a type without widening: const config = { port: 3000 } satisfies Config).
Enable "strict": true in tsconfig (strictNullChecks, noImplicitAny...). Run: npx tsc --init; npx tsc (compile) / npx tsc --noEmit (type-check only); tsx/ts-node/bun run TS directly; Vite handles TS in the browser build (type-check separately with tsc).
Errors you'll see: TS2322 "Type X is not assignable to type Y", TS2339 "Property does not exist on type", TS2345 argument type mismatch, TS18048 "possibly undefined", TS7006 "implicitly has an any type".`),

  c('interfaces-types', 'TypeScript interfaces vs type aliases, optional/readonly properties, index signatures', ['typescript interface', 'type alias vs interface', 'optional property', 'readonly', 'index signature', 'extends interface', 'record type', 'declaration merging'],
    `interface User { id: number; name: string; email?: string; readonly createdAt: Date; tags: string[]; }
type Point = { x: number; y: number };
Extend: interface Admin extends User { permissions: string[] } / type Admin = User & { permissions: string[] } (intersection).
interface vs type: both describe object shapes; interfaces can be re-opened (declaration merging — used to augment library types like Window or Express.Request) and give clearer error messages; types can do unions, tuples, mapped/conditional types, primitives. Common rule: interface for object shapes/public APIs, type for unions and computed types — consistency matters more.
Optional (?), readonly (compile-time only), index signatures: interface Dict { [key: string]: number } — or Record<string, number>; with noUncheckedIndexedAccess, dict[key] becomes number | undefined (safer).
Functions in types: type Handler = (event: MouseEvent) => void; interface Api { get(id: string): Promise<User>; }  Call/construct signatures for advanced cases.
Excess property check: object literals with unknown keys error when assigned directly to a typed variable (catches typos).
Structural typing: compatibility is by shape, not by name — any object with { x: number; y: number } is a Point. Brand types for nominal-ish IDs: type UserId = string & { __brand: 'UserId' }.
Nested/optional chains type correctly: user.address?.city is string | undefined.
Describe JSON safely: interface ApiResponse<T> { data: T; error?: string; meta: { page: number; total: number } }.`),

  c('unions-narrowing', 'TypeScript unions, narrowing, type guards and discriminated unions', ['typescript narrowing', 'type guard', 'discriminated union', 'typeof instanceof in', 'exhaustive check never', 'user defined type guard', 'is keyword', 'assertion function'],
    `A union value must be narrowed before using members specific to one member type. Narrowing tools: typeof x === 'string'; x instanceof Date; 'swim' in animal; Array.isArray(x); equality (x === null); truthiness (if (user)); control-flow analysis follows returns and throws.
Discriminated union (the best pattern for states/results):
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; side: number };
function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2;
    case 'square': return s.side ** 2;
    default: { const _exhaustive: never = s; return _exhaustive; } // compile error if a new kind isn't handled
  }
}
User-defined type guards: function isUser(x: unknown): x is User { return typeof x === 'object' && x !== null && 'id' in x && typeof (x as any).id === 'number'; }
Assertion functions: function assert(cond: unknown, msg: string): asserts cond { if (!cond) throw new Error(msg); } and asserts x is User.
Catch errors: catch (e) { if (e instanceof Error) console.error(e.message); } (e is unknown with useUnknownInCatchVariables).
Narrowing doesn't survive callbacks for mutable variables (let) — copy into a const first.
Model loading states: type State = { status: 'idle' } | { status: 'loading' } | { status: 'success'; data: Item[] } | { status: 'error'; error: string }; — no impossible combinations like loading + error.`),

  c('generics', 'TypeScript generics: functions, constraints, defaults, keyof', ['typescript generics', 'generic function', 'generic constraint extends', 'keyof', 'generic interface', 'generic class', 'typeof keyof', 'T extends'],
    `Generics keep the relationship between input and output types:
function first<T>(arr: T[]): T | undefined { return arr[0]; }  first([1, 2]) → number | undefined (T inferred).
Constraints: function longest<T extends { length: number }>(a: T, b: T): T { return a.length >= b.length ? a : b; }
keyof + indexed access: function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }  getProp(user, 'name') → string; 'nope' is a compile error.
Generic types/interfaces: interface ApiResponse<T> { data: T; status: number } ; type Pair<A, B = A> = [A, B] (default type parameter).
Generic classes: class Box<T> { constructor(public value: T) {} map<U>(fn: (v: T) => U): Box<U> { return new Box(fn(this.value)); } }
Typed fetch helper: async function getJson<T>(url: string): Promise<T> { const r = await fetch(url); if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<T>; }  (still unvalidated at runtime — use zod for real safety).
typeof on values: const config = { port: 3000, host: 'x' }; type Config = typeof config; keyof typeof config → 'port' | 'host'. Arrays to unions: const ROLES = ['admin', 'user'] as const; type Role = typeof ROLES[number];
Don't over-generify: if T is used only once, you probably don't need a generic. Name parameters meaningfully when there are several (TKey, TValue).
React with generics: function List<T>({ items, render }: { items: T[]; render: (item: T) => React.ReactNode }) { ... } (in .tsx files write <T,> for arrow generics).`),

  c('utility-types', 'TypeScript utility types: Partial, Pick, Omit, Record, ReturnType and more', ['typescript utility types', 'partial', 'pick omit', 'record', 'returntype', 'awaited', 'required readonly', 'nonnullable', 'parameters type'],
    `Built-ins (use them instead of re-declaring shapes):
Partial<T> (all optional — update payloads), Required<T>, Readonly<T>, Pick<T, 'id' | 'name'>, Omit<T, 'password'>, Record<K, V> (Record<Role, Permission[]>), Exclude<U, X> (remove members from a union), Extract<U, X>, NonNullable<T>, ReturnType<typeof fn>, Parameters<typeof fn>, ConstructorParameters, InstanceType<typeof Class>, Awaited<Promise<T>> → T, NoInfer<T>, Uppercase/Lowercase/Capitalize/Uncapitalize on string literal types.
Examples:
type UserUpdate = Partial<Omit<User, 'id' | 'createdAt'>>;
type PublicUser = Pick<User, 'id' | 'name'>;
type Handlers = Record<'click' | 'hover', () => void>;
type Data = Awaited<ReturnType<typeof loadData>>;
Deep partial (custom): type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
Make specific keys optional: type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
Readonly arrays: readonly string[] / ReadonlyArray<string>; as const makes literals deeply readonly.
Prettify intersections in hovers: type Prettify<T> = { [K in keyof T]: T[K] } & {};`),

  c('advanced-types', 'TypeScript advanced types: mapped, conditional, template literal types, infer', ['typescript mapped types', 'conditional types', 'infer keyword', 'template literal types', 'key remapping as', 'distributive conditional', 'recursive types'],
    `Mapped types: type Flags<T> = { [K in keyof T]: boolean }; modifiers +readonly/-readonly, +?/-? (type Mutable<T> = { -readonly [K in keyof T]: T[K] }). Key remapping: type Getters<T> = { [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K] }; filter keys: as T[K] extends Function ? never : K.
Conditional types: type IsString<T> = T extends string ? true : false; distributive over unions (wrap in [T] to stop: [T] extends [string]). infer extracts: type ElementOf<T> = T extends (infer U)[] ? U : never; type Unpromise<T> = T extends Promise<infer U> ? U : T; type FirstArg<F> = F extends (a: infer A, ...r: any[]) => any ? A : never.
Template literal types: type Event = \`on\${Capitalize<'click' | 'focus'>}\` → 'onClick' | 'onFocus'; type Route = \`/users/\${number}\`; parse strings: type Param<S> = S extends \`\${string}:\${infer P}/\${infer Rest}\` ? P | Param<Rest> : S extends \`\${string}:\${infer P}\` ? P : never.
Recursive types: type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
Variance annotations (in/out) and overloads: function parse(x: string): number; function parse(x: number): string; function parse(x: any) { ... } — order from specific to general.
Function type compatibility: parameters are checked bivariantly for methods, contravariantly for function properties (strictFunctionTypes).
Don't build type-level puzzles in app code; reach for these in libraries/helpers and keep app types simple and readable.`),

  c('classes-ts', 'TypeScript classes: access modifiers, abstract classes, implements, parameter properties', ['typescript class', 'private public protected', 'abstract class', 'implements interface', 'parameter properties', 'readonly class property', 'static typescript', 'override keyword'],
    `class Account {
  private balance = 0;                 // TS-only privacy (still visible at runtime); use #balance for real privacy
  protected readonly owner: string;    // subclasses can read
  static count = 0;
  constructor(owner: string, public currency: 'CAD' | 'USD' = 'CAD') { this.owner = owner; Account.count++; } // parameter property
  deposit(amount: number): void { if (amount <= 0) throw new RangeError('amount must be positive'); this.balance += amount; }
  get total(): number { return this.balance; }
}
Abstract: abstract class Shape { abstract area(): number; describe() { return \`Area: \${this.area().toFixed(2)}\`; } } class Circle extends Shape { constructor(private r: number) { super(); } override area() { return Math.PI * this.r ** 2; } } — enable noImplicitOverride to require override.
implements checks a class against an interface (doesn't add anything): class FileLogger implements Logger { log(msg: string) { } }.
Definite assignment: name!: string when set outside the constructor (e.g. by a framework). useDefineForClassFields affects field initialisation order.
Generic classes and static factories: static from(json: unknown): Account { ... }.
Decorators (TS 5 standard decorators, or experimentalDecorators for Angular/NestJS/TypeORM): @Component, @Injectable, @Column.
Prefer plain objects + functions for data; classes for things with behaviour and state, framework requirements, or custom errors (class NotFoundError extends Error { readonly status = 404 }).`),

  c('functions-ts', 'TypeScript functions: typing parameters, overloads, callbacks, this, async', ['typescript function types', 'function overloads', 'callback type', 'optional parameter', 'rest parameters typescript', 'async function return type', 'this parameter'],
    `Annotate parameters; the return type is inferred but annotate exported/public functions: function toSlug(input: string): string { ... }.
Optional/default/rest: function log(msg: string, level: 'info' | 'warn' = 'info', ...tags: string[]): void.
Function types: type Comparator<T> = (a: T, b: T) => number; const byAge: Comparator<User> = (a, b) => a.age - b.age; callbacks: function onDone(cb: (err: Error | null, data?: string) => void).
Async: async function load(): Promise<User[]> { ... } — the return type must be Promise<...>.
Overloads for different input → output types:
function format(v: number): string;
function format(v: Date): string;
function format(v: number | Date): string { return typeof v === 'number' ? v.toFixed(2) : v.toISOString(); }
this typing: function handler(this: HTMLButtonElement, e: MouseEvent) { this.disabled = true; }
Object parameter with defaults: function connect({ host = 'localhost', port = 5432 }: { host?: string; port?: number } = {}) {}
Generic constraints on callbacks: function mapValues<T, U>(obj: Record<string, T>, fn: (v: T) => U): Record<string, U>.
Never-returning: function fail(msg: string): never { throw new Error(msg); }
Type predicates in filters: const nums = values.filter((v): v is number => typeof v === 'number'); (TS 5.5 infers simple ones automatically).`),

  c('tsconfig-modules', 'tsconfig.json and TypeScript modules: options, paths, declaration files, @types', ['tsconfig', 'tsconfig options', 'module resolution', 'paths alias', 'declaration file d.ts', '@types packages', 'esModuleInterop', 'cannot find module typescript', 'moduleResolution bundler'],
    `Typical modern tsconfig (app built by Vite/bundler):
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "Bundler", "lib": ["ES2022", "DOM", "DOM.Iterable"], "jsx": "react-jsx", "strict": true, "noUncheckedIndexedAccess": true, "noImplicitOverride": true, "isolatedModules": true, "skipLibCheck": true, "esModuleInterop": true, "resolveJsonModule": true, "noEmit": true, "baseUrl": ".", "paths": { "@/*": ["src/*"] } }, "include": ["src"] }
Node library/app compiled by tsc: "module": "NodeNext", "moduleResolution": "NodeNext", "outDir": "dist", "rootDir": "src", "declaration": true, "sourceMap": true — and write imports with .js extensions (import { x } from './util.js') even in .ts files.
paths aliases must ALSO be configured in the bundler/runtime (Vite resolve.alias, tsconfig-paths) — tsc doesn't rewrite them.
Types for JS libraries: many ship their own; otherwise npm i -D @types/node @types/express. "Could not find a declaration file for module 'x'" → install @types/x or add declare module 'x'; in a .d.ts file.
Declaration files: global.d.ts for globals (declare global { interface Window { myApp: App } } export {}), env vars (interface ImportMetaEnv { readonly VITE_API_URL: string }), assets (declare module '*.svg' { const src: string; export default src; }).
Type-only imports: import type { User } from './types'; (removed at compile time; required with verbatimModuleSyntax).
Project references (composite) for monorepos; incremental builds with "incremental": true. Check speed: tsc --extendedDiagnostics.`),

  c('runtime-validation', 'TypeScript runtime validation with zod: typing API data and env variables safely', ['zod', 'runtime validation typescript', 'validate api response', 'parse json typescript safely', 'environment variables typescript', 'zod schema infer', 'valibot'],
    `Types disappear at runtime, so data from APIs, forms, JSON files, localStorage and process.env is really unknown. Validate it at the boundary, then trust the type inside.
import { z } from 'zod';
const User = z.object({ id: z.number().int().positive(), name: z.string().min(1).max(50), email: z.string().email(), role: z.enum(['admin', 'user']).default('user'), tags: z.array(z.string()).optional() });
type User = z.infer<typeof User>;                 // the TS type comes from the schema — one source of truth
const user = User.parse(await res.json());        // throws ZodError with readable issues
const r = User.safeParse(input); if (!r.success) return r.error.flatten(); else use(r.data);
Env vars: const Env = z.object({ DATABASE_URL: z.string().url(), PORT: z.coerce.number().default(3000), NODE_ENV: z.enum(['development', 'production', 'test']) }); export const env = Env.parse(process.env); — the app crashes at startup with a clear message instead of failing later.
Refinements: z.string().refine((s) => s.startsWith('sk_'), 'must start with sk_'); transforms: z.string().transform((s) => s.trim()); unions/discriminated unions: z.discriminatedUnion('kind', [...]).
Form libraries integrate it (react-hook-form + @hookform/resolvers/zod). Alternatives: valibot (smaller), ArkType, TypeBox, io-ts.
Without a library: write a type guard (function isUser(x: unknown): x is User) — more code, same idea.`),

  c('dom-react-ts', 'TypeScript with the DOM and React: event types, refs, props, hooks typing', ['typescript react props', 'react event type typescript', 'useState typescript', 'useRef typescript', 'typescript dom element', 'React.FC', 'children type', 'htmlinputelement'],
    `DOM: const input = document.querySelector<HTMLInputElement>('#email'); if (!input) throw new Error('missing #email'); input.value; getElementById returns HTMLElement | null — narrow or cast: as HTMLCanvasElement. Events: el.addEventListener('click', (e: MouseEvent) => {}); keyboard KeyboardEvent; inputs: (e.target as HTMLInputElement).value or e.currentTarget.
React props: type ButtonProps = { label: string; variant?: 'primary' | 'ghost'; onClick?: () => void; children?: React.ReactNode }; function Button({ label, variant = 'primary', onClick }: ButtonProps) { ... }. Extend native props: type Props = React.ComponentProps<'button'> & { loading?: boolean } (or React.ButtonHTMLAttributes<HTMLButtonElement>). React.FC is optional (no longer adds children).
Hooks: const [items, setItems] = useState<Item[]>([]); const [user, setUser] = useState<User | null>(null); const ref = useRef<HTMLDivElement>(null) (DOM ref, ref.current may be null); const timer = useRef<number | undefined>(undefined) (mutable value); useReducer with a discriminated union Action type; createContext<Ctx | null>(null) + a custom hook that throws if null.
Events: onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}; onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); }}; onClick: React.MouseEvent<HTMLButtonElement>; keyboard: React.KeyboardEvent.
Generic components: function Select<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }).
Children: React.ReactNode (anything renderable); React.ReactElement (one element); render props: (item: T) => React.ReactNode.`),

  c('node-ts', 'TypeScript in Node.js: setup, running TS, Express typing, ESM', ['typescript node setup', 'tsx run typescript', 'ts-node', 'express typescript', 'node types', 'typescript esm node', 'run typescript file'],
    `Setup: npm i -D typescript @types/node tsx; npx tsc --init; package.json: "type": "module", scripts { "dev": "tsx watch src/index.ts", "build": "tsc", "start": "node dist/index.js", "typecheck": "tsc --noEmit" }. Node 22.6+ can also run .ts directly with --experimental-strip-types (type-only syntax), Bun and Deno run TS natively.
tsconfig for Node: "module": "NodeNext", "moduleResolution": "NodeNext", "target": "ES2022", "outDir": "dist", "rootDir": "src", "strict": true, "esModuleInterop": true, "skipLibCheck": true. Relative imports need ".js": import { db } from './db.js'.
Express typing: npm i express && npm i -D @types/express.
import express, { type Request, type Response, type NextFunction } from 'express';
const app = express(); app.use(express.json());
app.get('/users/:id', (req: Request<{ id: string }>, res: Response) => { res.json({ id: Number(req.params.id) }); });
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => { res.status(500).json({ error: err.message }); });
Augment Request: declare global { namespace Express { interface Request { user?: { id: string } } } }
fs/promises with types: import { readFile } from 'node:fs/promises'; const text = await readFile(path, 'utf8');
Environment: process.env.X is string | undefined — validate with zod at startup.`),

  c('patterns-ts', 'TypeScript patterns and best practices: strictness, enums vs unions, readonly, avoiding any', ['typescript best practices', 'enum vs union type', 'const enum', 'avoid any', 'typescript tips', 'strict typescript', 'branded types', 'as const'],
    `- Turn on strict (and noUncheckedIndexedAccess) from day one; fix errors instead of silencing them.
- Prefer union literal types over enums: type Direction = 'up' | 'down' (no runtime code, works with plain strings). If you need a runtime list: const DIRECTIONS = ['up', 'down'] as const; type Direction = typeof DIRECTIONS[number]. Enums: numeric enums allow any number (unsafe) and generate code; const enum breaks with isolatedModules.
- Avoid any: use unknown + narrowing, generics, or a proper type. If a library forces any, wrap it once and expose a typed function. Lint with @typescript-eslint (no-explicit-any, no-floating-promises — catches forgotten awaits).
- Model states with discriminated unions; make illegal states unrepresentable.
- readonly for data that shouldn't change (readonly arrays in props/config).
- Validate external data at runtime (zod) — types are only promises.
- Let inference work inside functions; annotate boundaries (exports, params, public returns).
- Use satisfies to check config objects while keeping literal types: const routes = { home: '/', user: '/u/:id' } satisfies Record<string, string>;
- Branded IDs prevent mixing: type UserId = string & { readonly brand: unique symbol }.
- Exhaustive switch with never.
- Keep types near their usage; share via a types.ts only for truly shared models; generate types from schemas/OpenAPI/DB (prisma, drizzle, openapi-typescript) instead of hand-writing them.
- @ts-expect-error (with a comment) beats @ts-ignore: it errors when no longer needed.`),
];
