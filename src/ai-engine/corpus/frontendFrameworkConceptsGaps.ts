import { KnowledgeItem } from '../../types';

// Batch 306 corpus fixes — fifth coding-priority batch (2026-09-14), back to coding after
// batch 305 (martial arts, non-coding). Topic: frontend framework concepts (React-centric —
// virtual DOM, component lifecycle, state management, rendering strategies) chosen because grep
// confirmed "virtual dom", "component lifecycle", "props drilling", "controlled component" and
// "single page application" had zero hits anywhere in the corpus, and softwareEngineeringConceptsCorpus.ts /
// designPatternsGaps.ts only cover general OOP/architecture patterns, never frontend-specific ones.
// 16/25 misses. Several severe wrong-domain hallucinations: controlled vs uncontrolled component
// answered as controlled vs uncontrolled scientific STUDIES (lab experiment vs field study);
// hydration vs rendering answered as literal BODY hydration (drinking water) before a random
// tangent; single page application vs multi page application dumped unrelated trivia about
// Application Performance Management (APM) and microcontrollers (MCU), never touching SPA/MPA;
// props drilling vs context dumped a generic "modern React best practices" bullet list ending in
// a bizarre "Fact. No debate. No notes." artifact, never explaining either concept; fragment vs
// div wrapper confused a React Fragment with a URL fragment identifier ("#section3", jump-to
// anchor) and never got to the div wrapper; presentational vs container component dumped
// completely unrelated trivia about lithium-ion battery construction and Jakarta EJB; eager vs
// lazy loading a component answered as ORM/database eager vs lazy loading (N+1 query problem)
// instead of frontend code-splitting (React.lazy / dynamic import). Several one-sided
// cutoffs/incomplete answers: props vs state (explained props, never got to state), React hooks
// vs class lifecycle methods (only described class components as "an ancient crumbling empire",
// cut off before ever explaining hooks), key prop vs id attribute (explained key prop, cut off
// before contrasting with id), one-way vs two-way data binding (explained one-way/MVVM only),
// store vs reducer (explained store only), global vs local state (explained global only, cut off
// with a random aside before reaching local state), useMemo vs useCallback (correctly started
// "useMemo is for *values*" then cut off before ever stating useCallback is for functions),
// synthetic vs native DOM event (explained native event only), shallow vs full DOM rendering in
// testing (self-contradictorily claimed "shallow rendering isn't actually a thing" while
// describing it fairly accurately, then cut off before full DOM rendering).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const FRONTEND_FRAMEWORK_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-props-vs-state',
    'Props vs State in a Frontend Component',
    [
      'difference between props and state', 'props vs state react', 'what is state in a component',
      'props are read only passed in from a parent, state is data a component owns and manages internally',
    ],
    `In component-based frontend frameworks (React, Vue, etc.), props and state are the two sources of data a component can render from, and they work very differently. Props ("properties") are data passed INTO a component from its parent — they are read-only from the receiving component's point of view; the component cannot change its own props, it can only use the values it was given (similar to function arguments). State is data a component owns and manages internally, using something like useState (React) or data() (Vue) — it can change over time in response to user interaction, network responses, timers, etc., and when it changes, the component re-renders to reflect the new value. A common pattern: a parent component holds state and passes pieces of it down to children as props; a child that needs to change that data calls a callback function (also passed as a prop) rather than mutating the prop directly. The key difference: props are read-only data handed down from a parent to configure a component, while state is mutable data a component manages itself and that changing triggers a re-render.`,
  ),
  k(
    'kb-gap-controlled-vs-uncontrolled-component',
    'Controlled vs Uncontrolled Component (Forms)',
    [
      'controlled vs uncontrolled component', 'controlled component react', 'uncontrolled component react',
      'not about scientific studies or lab experiments — this is about form inputs in a UI framework',
    ],
    `In frontend frameworks, "controlled" and "uncontrolled" describe how a form input's value is managed — this has nothing to do with controlled vs uncontrolled scientific studies. A controlled component is a form element (input, textarea, select) whose value is driven entirely by component state: the input's "value" prop is set from state, and an onChange handler updates that state on every keystroke, so the framework is the single source of truth and the displayed value always matches the state variable. This makes it easy to validate, transform, or conditionally disable input as the user types, but it means a re-render happens on every keystroke. An uncontrolled component instead lets the DOM itself hold the current value, the way a plain HTML form does — the component doesn't track every keystroke in state, and you read the current value on demand (e.g. via a ref, in React) only when you need it, such as on form submit. Uncontrolled components are simpler and involve less re-rendering but give the framework less real-time visibility into what the user is typing. The key difference: a controlled component's value lives in framework state and is set/read through it on every change, while an uncontrolled component's value lives in the DOM itself and is only read when needed (e.g. via a ref).`,
  ),
  k(
    'kb-gap-hydration-vs-rendering',
    'Hydration vs Rendering (Frontend)',
    [
      'difference between hydration and rendering', 'what is hydration in frontend development', 'react hydration',
      'not about drinking water or body hydration — this is a server-rendered html + javascript concept',
    ],
    `In frontend development, "hydration" has nothing to do with drinking water — it's the process of attaching JavaScript event handlers and framework state/behavior to HTML that already exists in the page (usually because it was rendered on the server). Rendering, broadly, is the process of turning component code/data into the actual DOM elements the user sees — this can happen on the server (server-side rendering produces static HTML) or in the browser (client-side rendering builds the DOM from scratch using JavaScript). Hydration is the specific step that happens after server-side rendering: the browser receives fully-formed HTML (so the page is visible right away) but that HTML is initially "dead" — no click handlers, no interactivity — until the framework's JavaScript runs, walks the existing DOM, attaches event listeners, and reconciles it with the framework's virtual representation, making it interactive without re-building the DOM from scratch. The key difference: rendering is producing the DOM/HTML in the first place (on the server or in the browser), while hydration is the follow-up step of attaching interactivity/state to server-rendered HTML that already exists in the browser.`,
  ),
  k(
    'kb-gap-spa-vs-mpa',
    'Single Page Application vs Multi Page Application',
    [
      'single page application vs multi page application', 'spa vs mpa', 'what is a single page application',
      'not application performance management apm and not a microcontroller mcu',
    ],
    `A Single Page Application (SPA) and a Multi Page Application (MPA) are two different architectures for how a website's pages work — unrelated to Application Performance Management (APM, a devops monitoring practice) or microcontrollers (MCU, a hardware chip). In a Multi Page Application, every navigation (clicking a link, submitting a form) triggers a full round-trip to the server, which returns a brand-new complete HTML page that the browser reloads from scratch — the traditional model used by classic server-rendered sites. In a Single Page Application, the browser loads one HTML shell and one JavaScript bundle up front, and after that, "navigating" between views is handled entirely on the client: JavaScript swaps out sections of the DOM and updates the URL via the History API, without a full page reload, typically fetching only data (JSON via an API call) rather than whole new pages. SPAs feel faster and more app-like after the initial load since there's no full-page flash/reload, but the first load can be heavier (a big JS bundle to download and parse) and historically SPAs needed extra work (or SSR) for good SEO since content is built by JavaScript rather than present in the initial HTML. The key difference: an MPA reloads a full new HTML page from the server on every navigation, while an SPA loads once and then updates the DOM client-side via JavaScript without full page reloads.`,
  ),
  k(
    'kb-gap-hooks-vs-lifecycle-methods',
    'React Hooks vs Class Component Lifecycle Methods',
    [
      'react hooks vs class component lifecycle methods', 'useeffect vs componentdidmount', 'hooks vs lifecycle methods',
      'hooks let function components do what lifecycle methods did in class components',
    ],
    `Before React Hooks (introduced in React 16.8), only class components could hold state and run code at specific points in a component's life, using lifecycle methods: componentDidMount (runs once after the component first renders — good for data fetching, subscriptions), componentDidUpdate (runs after every re-render — good for reacting to prop/state changes), and componentWillUnmount (runs right before the component is removed — good for cleanup like clearing timers or unsubscribing). Hooks let function components achieve the same things without classes or "this" binding. The main one is useEffect(callback, dependencyArray): with an empty dependency array "[]" it behaves like componentDidMount (runs once on mount); with dependencies listed it re-runs whenever those values change, covering componentDidUpdate's job; and if the callback returns a cleanup function, that cleanup runs on unmount (and before each re-run), covering componentWillUnmount. So one hook (useEffect) can replace three separate lifecycle methods, and hooks compose more flexibly since you can use multiple useEffect calls for unrelated concerns instead of cramming everything into one componentDidMount. The key difference: lifecycle methods are named methods tied to a class component's life stages (mount/update/unmount), while hooks like useEffect let function components achieve the same timing behavior through dependency arrays and cleanup functions, without needing a class.`,
  ),
  k(
    'kb-gap-props-drilling-vs-context',
    'Props Drilling vs Context (React)',
    [
      'props drilling vs context', 'what is props drilling', 'react context api',
      'prop drilling is passing data through many layers of components that dont need it just to reach a deep child',
    ],
    `Props drilling is the problem of passing data down through many layers of components purely so it can reach a deeply nested child that actually needs it — every intermediate component has to accept and forward the prop even though it has no use for it itself, which makes the code verbose and fragile (renaming or restructuring becomes painful because the prop chain runs through unrelated components). Context (React's Context API, via createContext and useContext) is the fix: a Provider component higher up in the tree "publishes" a value, and any descendant component, no matter how deeply nested, can read that value directly with useContext without it being manually passed through every component in between. Context is typically used for data that many components across the tree need — theme, authenticated user, locale/language — rather than for passing data between two adjacent components, where a normal prop is simpler and clearer. Overusing Context for everything can also make data flow harder to trace, so it's usually reserved for genuinely "global-ish" values, with dedicated state management libraries (Redux, Zustand) sometimes preferred for larger apps. The key difference: props drilling passes data down explicitly through every intermediate component in the tree, while Context lets a deeply nested component read a value directly from a Provider higher up, skipping the intermediate layers.`,
  ),
  k(
    'kb-gap-key-prop-vs-id-attribute',
    'Key Prop vs HTML id Attribute (React Lists)',
    [
      'key prop vs id attribute', 'react key prop lists', 'what does the key prop do in react',
      'the key prop is internal to react for tracking list items, the id attribute is a real html attribute',
    ],
    `In React, when you render a list of elements (e.g. with .map()), each item needs a special "key" prop — a stable, unique string or number React uses internally to track which item is which across re-renders, so it can efficiently figure out which items were added, removed, or reordered instead of tearing down and rebuilding the whole list. The key prop is NOT rendered to the actual DOM and is not visible to CSS or JavaScript outside React — it's purely a hint for React's reconciliation algorithm, and it must be unique among siblings (commonly a database ID) but does not need to be globally unique across the whole page. The HTML "id" attribute, by contrast, is a real DOM attribute, visible in the rendered HTML, used for CSS selectors, JavaScript DOM queries (document.getElementById), anchor links (#section), and accessibility (linking a label to an input) — and per the HTML spec it must be unique across the entire document, not just among siblings. You can use the same value for both (e.g. the same database ID) but they serve completely different purposes and using array index as a key (instead of a stable ID) is a common anti-pattern that can cause bugs when list items are reordered or removed. The key difference: the key prop is a React-internal hint for tracking list items during reconciliation and never appears in the DOM, while the id attribute is a real, page-wide-unique HTML attribute used by CSS, JavaScript, and accessibility tooling.`,
  ),
  k(
    'kb-gap-one-way-vs-two-way-data-binding',
    'One-Way vs Two-Way Data Binding',
    [
      'one way vs two way data binding', 'what is two way data binding', 'data binding frontend frameworks',
      'one way binding data flows in a single direction, two way binding automatically syncs the ui and the data in both directions',
    ],
    `Data binding describes how a UI and its underlying data stay in sync. In one-way data binding, data flows in a single direction: the underlying data/state determines what's shown in the UI, but changes made in the UI (like typing into an input) don't automatically flow back into the data — the developer must explicitly wire that up (e.g. an onChange handler in React that calls setState with the new value). React and most of the MVVM pattern's "view" side use this model; the View displays what the ViewModel/state holds, but doesn't write back automatically — the flow one way is often summarized as "data down, events up." In two-way data binding, the framework automatically keeps the UI and the underlying data synced in both directions: if the data changes, the UI updates, AND if the user changes the UI (types in an input), the underlying data updates automatically without the developer writing an explicit handler for it — Angular's [(ngModel)] and Vue's v-model are classic examples, where binding an input to a variable means typing in the input instantly updates the variable and vice versa. Two-way binding can mean less boilerplate for simple forms, but is often considered harder to reason about at scale since it's less explicit about when and where data changes originate. The key difference: one-way binding only pushes data from the state/model to the UI (with any UI-to-data updates written explicitly), while two-way binding automatically synchronizes the UI and the underlying data in both directions.`,
  ),
  k(
    'kb-gap-store-vs-reducer',
    'Store vs Reducer (State Management)',
    [
      'store vs reducer redux', 'what is a reducer in state management', 'redux store vs reducer',
      'the store holds the state, the reducer is the function that decides how state changes in response to an action',
    ],
    `In state management libraries like Redux (and the useReducer hook in React), the store and the reducer are two distinct, complementary pieces. The store is the actual container that holds the current application state — a single object (in Redux's case, one global store for the whole app) that components can read from, and it also provides the dispatch function used to trigger state changes and a subscribe mechanism so components can be notified when the state updates. The reducer is a pure function — (state, action) => newState — that the store calls internally whenever an action is dispatched; it looks at the current state and the action's type/payload, and returns a brand-new state object reflecting the change, without ever mutating the old state directly. The store doesn't contain any logic for HOW state should change — that logic lives entirely in the reducer(s); the store's job is just to hold the current state, run the reducer when an action comes in, save the result, and notify subscribers. Large apps often split logic into multiple reducers (one per feature/slice) which Redux combines into one root reducer that a single store uses. The key difference: the store is the container that holds state and coordinates dispatch/updates, while the reducer is the pure function that actually computes what the new state should be in response to a given action.`,
  ),
  k(
    'kb-gap-global-vs-local-state',
    'Global State vs Local Component State',
    [
      'global state vs local state', 'when to use local state vs global state', 'component state vs app wide state',
      'local state lives inside one component, global state is shared across many unrelated components',
    ],
    `Local (component) state is data that only one component (and possibly its direct children, via props) needs — created with something like useState inside that component, it exists only for as long as that component is mounted, and no other unrelated part of the app can see or change it directly. Examples: whether a dropdown is currently open, the text currently typed into a single search box, a modal's visibility. Global state is data that many different, often unrelated, components across the app need to read or update — authenticated user info, theme (light/dark), shopping cart contents, feature flags. It's typically managed outside any single component, using something like React's Context API for simpler cases or a dedicated library (Redux, Zustand, MobX, Recoil) for larger apps, so any component in the tree can subscribe to it without props drilling. The rule of thumb most frameworks encourage is to keep state as local as possible by default and only "lift" it to global state (or a shared parent) once multiple, non-nested parts of the app genuinely need access to the same data — overusing global state for things that are really local makes an app harder to reason about and can cause unnecessary re-renders across unrelated components. The key difference: local state belongs to and is scoped inside a single component, while global state is shared application-wide and accessible from many components regardless of where they sit in the tree.`,
  ),
  k(
    'kb-gap-fragment-vs-div-wrapper',
    'React Fragment vs div Wrapper',
    [
      'fragment vs div wrapper react', 'what is a react fragment', 'react fragment shorthand',
      'not a url fragment identifier or anchor link — this is a jsx react.fragment element',
    ],
    `In React/JSX, every component's render must return a single root element, and a "Fragment" (React.Fragment, or the shorthand "<>...</>") and a plain "<div>" wrapper are the two common ways to satisfy that requirement when you have multiple sibling elements to return — but they behave differently in the actual DOM. This React Fragment has nothing to do with a URL fragment identifier (the "#section" part of a link that jumps to an anchor on a page) — different concept entirely, just a shared word. A div wrapper works by literally rendering an extra "<div>" element into the DOM around your content — it groups the children, but it adds a real, visible node to the page structure, which can break CSS (e.g. flex/grid layouts expecting specific direct children), add unwanted styling inheritance, or clutter the DOM tree/accessibility tree with meaningless wrapper elements. A Fragment lets you group multiple children and satisfy React's single-root requirement WITHOUT adding any extra node to the actual DOM at all — after rendering, the Fragment itself disappears entirely and only its children appear in the DOM, as if they were direct siblings. Fragments are commonly used when returning multiple "<td>" elements from a component used inside a "<table>", since an extra wrapping div there would produce invalid, broken HTML. The key difference: a div wrapper adds a real, visible extra node to the rendered DOM, while a Fragment groups children to satisfy JSX's single-root rule without adding any extra DOM node at all.`,
  ),
  k(
    'kb-gap-usememo-vs-usecallback',
    'useMemo vs useCallback (React)',
    [
      'usememo vs usecallback', 'difference between usememo and usecallback', 'react memoization hooks',
      'usememo memoizes a computed value, usecallback memoizes a function itself',
    ],
    `useMemo and useCallback are both React hooks that avoid unnecessary recomputation between re-renders by caching ("memoizing") something as long as its dependency array hasn't changed, but they memoize different kinds of things. useMemo(() => computeExpensiveValue(a, b), [a, b]) caches the RETURN VALUE of a computation — it runs the function during render, and on subsequent renders, if the dependencies haven't changed, it skips re-running the function and just reuses the previously computed value; it's for avoiding expensive calculations (filtering/sorting a big array, heavy math) from re-running every render. useCallback(() => doSomething(a, b), [a, b]) instead caches the FUNCTION ITSELF (its reference) rather than a computed value — it doesn't run the function, it just returns the same function reference across renders as long as dependencies haven't changed; this matters because in JavaScript a new function is created on every render by default, and passing a "new" function reference as a prop to a memoized child component (wrapped in React.memo) would defeat that memoization by making the prop look different every time even if its behavior is identical. In fact, useCallback(fn, deps) is essentially equivalent to useMemo(() => fn, deps) — useCallback is really just useMemo specialized for the case where the cached value happens to be a function. The key difference: useMemo memoizes and returns a computed VALUE (the result of calling a function), while useCallback memoizes and returns the FUNCTION reference itself, unchanged, without calling it.`,
  ),
  k(
    'kb-gap-synthetic-vs-native-dom-event',
    'Synthetic Event vs Native DOM Event (React)',
    [
      'synthetic event vs native dom event', 'what is a synthetic event in react', 'react syntheticevent',
      'react wraps native browser events in a cross browser synthetic event object',
    ],
    `A native DOM event is the browser's own built-in event object — created directly by the browser when something happens (a click, a keydown, a form submit) and delivered to any listener registered with addEventListener; its exact properties and quirks can differ slightly between browsers (historically a bigger problem, less so today). A synthetic event is React's own wrapper object around the underlying native event — when you write an onClick handler in JSX, the object React passes to your handler function is not the raw native event but a SyntheticEvent, a cross-browser wrapper that normalizes the event's properties and behavior so your code works identically regardless of which browser is running it. React does this by attaching a small number of listeners near the root of the DOM tree (rather than one listener per element) and using event delegation to figure out which component's handler should fire, wrapping the native event in a SyntheticEvent before calling your handler; if you ever need the actual native event, SyntheticEvent exposes it via event.nativeEvent. Historically synthetic events were pooled and reused for performance (meaning you couldn't access them asynchronously without calling event.persist()), though newer React versions removed pooling. The key difference: a native DOM event is the browser's own raw event object, while a synthetic event is React's cross-browser wrapper around that native event, normalizing behavior and handling delegation before your handler runs.`,
  ),
  k(
    'kb-gap-shallow-vs-full-dom-rendering-testing',
    'Shallow Rendering vs Full DOM Rendering (Frontend Testing)',
    [
      'shallow rendering vs full dom rendering', 'what is shallow rendering in testing', 'shallow render vs mount',
      'shallow rendering only renders one level deep and stubs out child components, full dom rendering renders the entire tree into a real or simulated dom',
    ],
    `Shallow rendering IS a real, commonly used technique in frontend component testing (contrary to any claim otherwise) — it renders a component exactly one level deep: the component itself is rendered normally, but any child components it renders are NOT actually rendered — they're replaced with placeholder stand-ins showing just their name/props, not their own internal output. This isolates the test to just the component under test, making it fast and preventing a bug in a deeply nested child from causing failures in unrelated parent tests; it's commonly done with tools like Enzyme's shallow() or React Testing Library's lighter-weight utilities. Full DOM rendering (sometimes called "mount" rendering, e.g. Enzyme's mount() or React Testing Library's default render()) instead renders the ENTIRE component tree, including every child, grandchild, and so on, into an actual (or simulated, e.g. jsdom) DOM — this lets tests interact with the fully rendered output (click real buttons, check that a child component's effect on the DOM actually happened, test lifecycle methods across the whole tree) but is slower and means a failure or change deep in a child component can affect tests of its ancestors too. Modern testing guidance (React Testing Library in particular) leans toward full DOM rendering by default, since it tests behavior closer to what a real user experiences, using shallow rendering more sparingly for narrow unit-style isolation. The key difference: shallow rendering renders only the target component one level deep and stubs out its children, while full DOM rendering renders the entire component tree (all descendants) into a real or simulated DOM.`,
  ),
  k(
    'kb-gap-presentational-vs-container-component',
    'Presentational Component vs Container Component',
    [
      'presentational vs container component', 'container component pattern react', 'dumb component vs smart component',
      'not lithium ion battery construction and not jakarta enterprise beans ejb',
    ],
    `Presentational (or "dumb") components and container ("smart") components are a React design pattern for separating concerns — unrelated to lithium-ion battery construction (anode/cathode/electrolyte) or Jakarta Enterprise Beans (a Java server-side API). A presentational component is concerned only with HOW things look: it receives data and callback functions purely through props, has little to no internal state of its own (aside from purely visual/UI state like "is this dropdown open"), doesn't know or care where its data comes from, and is usually written as a simple, reusable, easily-testable function of its props — think a Button, a Card, or a UserAvatar component. A container component is concerned with HOW things work: it handles data fetching, subscribes to state management (a global store, Context, an API call), holds business logic, and then passes the resulting data and handler functions down to presentational components as props to actually render — it typically renders little to no markup of its own, delegating that to the presentational components it wraps. This separation makes presentational components highly reusable (the same Button works regardless of what data source feeds it) and container components easy to reason about for data flow. Modern React (hooks, especially custom hooks) has made this exact split less rigid/enforced than it was in early React/Redux codebases, since hooks let you inject "container-like" logic into any component, but the underlying concept — separating display logic from data/business logic — remains a widely used way to think about component structure. The key difference: a presentational component only handles display/UI given props it receives, while a container component handles data fetching and business logic and passes the results down to presentational components.`,
  ),
  k(
    'kb-gap-eager-vs-lazy-loading-component',
    'Eager Loading vs Lazy Loading a Frontend Component',
    [
      'eager loading vs lazy loading component', 'react lazy code splitting', 'what is lazy loading in frontend',
      'not orm database eager vs lazy loading of related records — this is about loading javascript bundles for ui components',
    ],
    `In a frontend context, eager loading and lazy loading a component describe when the JavaScript code for that component gets downloaded and parsed by the browser — this is a different concept from ORM/database eager vs lazy loading of related records (which is about SQL queries, not JS bundles, though the naming is deliberately similar). Eager loading means a component's code is bundled into and downloaded as part of the app's main JavaScript bundle up front, before it's needed — simplest to set up (a normal static import) but it makes the initial bundle bigger, slowing down the very first page load, even for components the user might never actually visit (e.g. a settings page, an admin panel). Lazy loading (code splitting) means a component's code is NOT included in the initial bundle — instead it's split into its own separate chunk that only gets downloaded from the server the moment it's actually needed, typically using a dynamic import(), wrapped in React with React.lazy() and a "<Suspense>" boundary to show a fallback (like a spinner) while that chunk downloads. This shrinks the initial bundle and speeds up first load, at the cost of a small delay (and a loading state) the first time the user actually navigates to that lazily-loaded part of the app. Common candidates for lazy loading: routes/pages the user may never visit, heavy modals, rarely-used admin features. The key difference: eager loading bundles a component's code into the initial JavaScript download whether it's needed yet or not, while lazy loading splits that code into a separate chunk fetched on demand only when the component is actually about to be rendered.`,
  ),
];
