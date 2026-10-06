import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('react', slug, title, keywords, content);

export const CODE_REACT = [
  c('jsx-basics', 'React JSX/TSX basics: components, props, rendering, lists, conditionals', ['react basics', 'jsx', 'tsx', 'react component', 'react props', 'map list react key', 'conditional rendering react', 'react fragment', 'className'],
    `A component is a function returning JSX (name starts with a capital letter). JSX compiles to function calls; it's JavaScript, not HTML:
- className (not class), htmlFor (not for), camelCase events/attributes (onClick, tabIndex), style={{ color: 'red', marginTop: 8 }} (object, numbers = px), self-close empty tags (<img />, <input />).
- One root element per return — wrap siblings in <>...</> (Fragment) or <Fragment key=...>.
- Embed JS expressions with {}: {user.name}, {count * 2}, {fn()}; comments {/* ... */}.
Props: function Greeting({ name, age = 18, children }) { return <h1>Hi {name}{children}</h1>; } → <Greeting name="Ana">!</Greeting>. Props are read-only.
TSX props: type ButtonProps = { label: string; onClick?: () => void; variant?: 'primary' | 'ghost'; children?: React.ReactNode }; function Button({ label, onClick, variant = 'primary' }: ButtonProps) { ... }. Extend native props: React.ComponentProps<'button'> / React.ButtonHTMLAttributes<HTMLButtonElement>.
Conditionals: {isLoggedIn ? <Dashboard /> : <Login />}; {error && <p>{error}</p>} (careful: {count && ...} renders 0 — use count > 0 &&); early return null to render nothing.
Lists: {items.map((item) => <li key={item.id}>{item.name}</li>)} — key must be stable and unique among siblings (ids, not array index when items reorder/insert/delete).
Rendering: import { createRoot } from 'react-dom/client'; createRoot(document.getElementById('root')!).render(<App />). Wrap in <StrictMode> in development (double-invokes effects to surface bugs).
Start a project: npm create vite@latest my-app -- --template react-ts, or Next.js (npx create-next-app@latest). Create React App is deprecated.
Components should be pure: same props/state → same JSX, no side effects during render (fetching, mutating outside variables) — those go in event handlers or effects.`),

  c('state-events', 'React state and events: useState, updating objects/arrays, forms, controlled inputs', ['usestate', 'react state', 'onclick react', 'react form', 'controlled input', 'update array state react', 'update object state', 'react event handler', 'state not updating react'],
    `const [count, setCount] = useState(0); — calling setCount schedules a re-render; the value only changes on the next render (console.log(count) right after still shows the old one).
Update from the previous value: setCount((c) => c + 1) (needed when updating several times or in async callbacks).
State is immutable — create new objects/arrays:
setUser({ ...user, name: 'Ana' }); setUser((u) => ({ ...u, address: { ...u.address, city: 'Montreal' } }));
add: setItems([...items, newItem]); remove: setItems(items.filter((i) => i.id !== id)); update: setItems(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i))); insert: [...items.slice(0, n), x, ...items.slice(n)]; sort: [...items].sort(...) (sort mutates). Immer/useImmer for deep updates.
Lazy init for expensive initial values: useState(() => JSON.parse(localStorage.getItem('todos') ?? '[]')).
Events: <button onClick={() => setCount(count + 1)}> — pass a function, not a call (onClick={handle} not onClick={handle()}). Event object: (e) => e.preventDefault(), e.stopPropagation(), e.target.value. TS types: React.ChangeEvent<HTMLInputElement>, React.FormEvent<HTMLFormElement>, React.MouseEvent<HTMLButtonElement>.
Controlled input: <input value={text} onChange={(e) => setText(e.target.value)} />; checkbox: checked={on} onChange={(e) => setOn(e.target.checked)}; select: value + onChange.
Form: <form onSubmit={(e) => { e.preventDefault(); save({ email, password }); }}>. Read fields without state: new FormData(e.currentTarget). Libraries: react-hook-form + zod for bigger forms. React 19: <form action={async (formData) => ...}>, useActionState, useFormStatus.
Where state lives: keep it as low as possible; lift it to the closest common parent when siblings share it; pass setters down as props. Don't store what you can compute (derive filteredItems from items + query during render).
State resets when a component's position/key changes: <Profile key={userId} /> to reset on user change.`),

  c('hooks-effects', 'React hooks: useEffect, useRef, useMemo, useCallback, useContext, useReducer, custom hooks, rules of hooks', ['useeffect', 'useref', 'usememo', 'usecallback', 'usecontext', 'usereducer', 'custom hook', 'rules of hooks', 'useeffect infinite loop', 'useeffect cleanup', 'dependency array'],
    `Rules of hooks: call them only at the top level of components/custom hooks (not in conditions, loops, nested functions or after an early return); names start with use.
useEffect(() => { ...; return () => cleanup(); }, [deps]) — synchronise with something outside React (subscriptions, timers, websockets, document.title, non-React widgets, fetching). [] = run after mount (+ cleanup on unmount); no array = after every render; [a, b] = when a or b change. List every reactive value used inside (eslint-plugin-react-hooks enforces it).
Infinite loop: setting state in an effect whose deps change because of that state, or objects/functions created during render in deps — move them inside the effect, memoise, or depend on primitives.
You probably don't need an effect for: deriving data (compute during render), reacting to an event (do it in the handler), resetting state on prop change (use key).
Timer: useEffect(() => { const id = setInterval(() => setT((t) => t + 1), 1000); return () => clearInterval(id); }, []);
Fetch with cleanup: useEffect(() => { const ctrl = new AbortController(); fetch(url, { signal: ctrl.signal }).then((r) => r.json()).then(setData).catch((e) => { if (e.name !== 'AbortError') setError(e); }); return () => ctrl.abort(); }, [url]); — in real apps prefer TanStack Query/SWR or the framework's data loading.
useRef: const inputRef = useRef<HTMLInputElement>(null); <input ref={inputRef} />; inputRef.current?.focus(). Also a mutable box that doesn't re-render (timer ids, previous values). Don't read/write refs during render.
useMemo(() => expensive(a, b), [a, b]) caches a value; useCallback(fn, deps) caches a function (useful with memo() children or effect deps). The React Compiler can do this automatically.
useContext: const ThemeContext = createContext<'light' | 'dark'>('light'); <ThemeContext.Provider value={theme}>; const theme = useContext(ThemeContext). Good for theme/auth/locale; for frequently changing global state consider Zustand/Redux Toolkit/Jotai.
useReducer(reducer, initial) for complex state transitions: function reducer(state, action) { switch (action.type) { case 'add': return [...state, action.item]; default: return state; } } dispatch({ type: 'add', item }).
Custom hook: function useLocalStorage<T>(key: string, initial: T) { const [v, setV] = useState<T>(() => { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }); useEffect(() => { localStorage.setItem(key, JSON.stringify(v)); }, [key, v]); return [v, setV] as const; }
Others: useId (accessible ids), useTransition/useDeferredValue (keep UI responsive), useLayoutEffect (measure DOM before paint), useSyncExternalStore, React 19: use(promise/context), useOptimistic.`),

  c('patterns-performance', 'React patterns and performance: composition, memo, lazy loading, lists, error boundaries', ['react performance', 'react memo', 'react lazy suspense', 'error boundary', 'react composition', 'prop drilling', 'react re-render', 'virtualized list', 'react folder structure'],
    `Composition over configuration: pass children/JSX as props (<Card header={<Title />}>body</Card>), compound components (<Tabs><Tabs.List/>...</Tabs>), render props, custom hooks for shared logic (replaces HOCs/mixins).
Prop drilling fixes: composition (pass the rendered component), context, a state library.
Re-renders: a component re-renders when its state changes, its parent re-renders, or a context it uses changes. Usually fine. Optimise only measured problems (React DevTools Profiler): memo(Component) skips re-rendering when props are shallow-equal (needs stable props: useMemo/useCallback), move state down, split contexts, keep keys stable.
Code splitting: const Settings = lazy(() => import('./Settings')); <Suspense fallback={<Spinner />}><Settings /></Suspense>.
Long lists: virtualise (TanStack Virtual, react-window) for thousands of rows.
Error boundaries catch render errors in children (class component with static getDerivedStateFromError + componentDidCatch, or the react-error-boundary package: <ErrorBoundary fallback={<p>Oops</p>}>). They don't catch event-handler/async errors.
Portals for modals/tooltips: createPortal(<Modal />, document.body).
forwardRef (pre-19) / ref as a normal prop (React 19) to expose a DOM node; useImperativeHandle for custom ref APIs.
Folder structure: by feature (features/cart/{CartPage.tsx, useCart.ts, api.ts}) beats by type for bigger apps; components/ui for shared primitives.
Styling options: CSS Modules (Button.module.css), Tailwind CSS (utility classes), styled-components/Emotion (CSS-in-JS), vanilla-extract; component libraries: shadcn/ui, Radix, MUI, Chakra, Mantine.
Accessibility: semantic elements (button not div onClick), labels for inputs, alt text, focus management in modals, keyboard support.
Testing: Vitest + React Testing Library (render, screen.getByRole, userEvent.click, expect(...).toBeInTheDocument()), Playwright for end-to-end.`),

  c('data-routing-frameworks', 'React data fetching, routing and frameworks: TanStack Query, React Router, Next.js App Router, server components', ['react router', 'nextjs', 'next js app router', 'server components', 'tanstack query', 'react query', 'fetch data react', 'use client', 'server actions', 'react native'],
    `TanStack Query (caching, retries, refetching, loading/error states):
const { data, isPending, error } = useQuery({ queryKey: ['todos', userId], queryFn: () => fetch(\`/api/todos?u=\${userId}\`).then((r) => r.json()) });
const m = useMutation({ mutationFn: addTodo, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }) });
Wrap the app in <QueryClientProvider client={queryClient}>. SWR is a lighter alternative.
React Router (v6/v7): <BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/users/:id" element={<User />} /><Route path="*" element={<NotFound />} /></Routes></BrowserRouter>; const { id } = useParams(); const navigate = useNavigate(); <Link to="/about">; nested routes with <Outlet />; loaders/actions in data/framework mode.
Next.js App Router: app/page.tsx (route /), app/blog/[slug]/page.tsx (dynamic), layout.tsx (shared UI), loading.tsx, error.tsx, not-found.tsx, route.ts (API endpoints: export async function GET(req) { return Response.json(data); }).
Server Components (default in app/): async components that fetch directly (const posts = await db.post.findMany()), never shipped to the browser, can't use state/effects/event handlers. Add 'use client' at the top of files that need interactivity (useState, onClick, browser APIs); keep client components small leaves.
Server Actions: 'use server' functions called from forms (<form action={createPost}>), then revalidatePath('/posts').
Next.js extras: next/image, next/link, metadata export for SEO, middleware.ts, generateStaticParams, env vars (NEXT_PUBLIC_ prefix to expose to the browser). Deploy on Vercel or any Node host.
Other frameworks: Remix/React Router framework mode, Astro (content sites with React islands), Expo/React Native (mobile: <View>, <Text>, StyleSheet.create, no DOM elements).
State libraries: Zustand (const useStore = create((set) => ({ count: 0, inc: () => set((s) => ({ count: s.count + 1 })) }))), Redux Toolkit (slices, RTK Query), Jotai (atoms).`),

  c('common-errors', 'Common React errors and fixes', ['react error', 'too many re-renders', 'each child in a list should have a unique key', 'cannot update a component while rendering', 'objects are not valid as a react child', 'hydration error', 'invalid hook call', 'react undefined map'],
    `"Too many re-renders" → calling a setter during render, e.g. onClick={setCount(1)} (should be onClick={() => setCount(1)}) or setState in the component body.
"Each child in a list should have a unique key prop" → add key={item.id} to the outermost element returned from map.
"Objects are not valid as a React child" → rendering an object/Date/promise; render a field ({user.name}), String(date) / date.toLocaleDateString(), or JSON.stringify for debugging.
"Cannot read properties of undefined (reading 'map')" → data not loaded yet; initialise with [] or guard: {items?.map(...)} / if (!data) return <Spinner />.
"Invalid hook call" → hook called conditionally/outside a component, or two copies of React (npm ls react).
"Rendered more/fewer hooks than during the previous render" → a hook after an early return or inside a condition.
"Cannot update a component while rendering a different component" → setting parent state during a child's render; move it into an effect or event handler.
"Hydration failed / text content does not match" (Next.js/SSR) → server and client render different output: Date.now()/Math.random()/localStorage/window used during render, invalid nesting (<div> inside <p>, <a> inside <a>), browser extensions. Use useEffect for client-only values or dynamic(() => import(...), { ssr: false }).
"A component is changing an uncontrolled input to be controlled" → value went from undefined to a string; initialise with '' (value={text ?? ''}).
"Can't perform a React state update on an unmounted component" (old warning) / stale responses → abort or ignore results in effect cleanup.
Stale state in setInterval/closures → use the updater form setX((x) => x + 1) or a ref.
"useEffect runs twice" in development → StrictMode on purpose; make effects idempotent with cleanup.
"Module not found: Can't resolve" → wrong path/case, missing install, or importing a server-only module in a client component.
"You're importing a component that needs useState... mark it with 'use client'" (Next.js) → add 'use client' to that file.`),
];
