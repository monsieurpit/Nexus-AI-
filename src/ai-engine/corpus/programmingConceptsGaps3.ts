import { KnowledgeItem } from '../../types';

/**
 * PROGRAMMING_CONCEPTS_GAPS_3 — batch 271 corrections. Solid domain overall
 * (9 misses out of 25). nexus-4b handled well: let/const, null/undefined,
 * synchronous/asynchronous, REST/GraphQL, SQL/NoSQL, compiler/interpreter,
 * class/object, stack/queue, array index/length, == vs ===, function/method,
 * git vs GitHub, commit vs push, branch vs merge, bug vs feature. Misses:
 * - "promise vs callback" explained callbacks (and "callback hell") well but
 *   never actually introduced/explained what a Promise is.
 * - "array vs object" completely dodged the real question, answering about
 *   reference-type assignment semantics instead of the actual structural
 *   difference (ordered indexed list vs named key-value properties).
 * - "GET vs POST" and "library vs framework" and "frontend rendering vs
 *   server-side rendering" and "API key vs OAuth" all explained only the
 *   FIRST half and got cut off before the second.
 * - "debugging vs testing" conflated "testing" in general with test-driven
 *   development specifically (claiming tests are always written before the
 *   code), and never clearly explained what debugging itself is.
 * - "IDE vs text editor" was a pure web dump of generic definitions, never
 *   explaining what actually makes an IDE different (integrated
 *   compiler/debugger/build tools vs a lighter plain editor).
 * - "token vs session for authentication" narrowed a general software
 *   engineering question into a Discord-bot-token-specific answer ("your
 *   token is the master key to your Discord account"), never explaining the
 *   general stateless-token vs server-side-session distinction that was
 *   actually being asked about.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'programming', keywords, content, createdAt: now,
});

export const PROGRAMMING_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-prog3-promise-vs-callback',
    'Promise vs callback (JavaScript)',
    [
      'difference between a promise and a callback in javascript', 'a callback is a function passed into another function to be called once that other function finishes its work can lead to deeply nested callback hell when chaining many async steps',
      'a promise is an OBJECT that represents a value that will exist in the future either resolved success or rejected failure and lets you chain steps with then and catch instead of nesting functions inside functions',
      'promises were created specifically to solve callback hell by flattening deeply nested callbacks into a readable chain and async await is modern syntax built on top of promises to make async code look synchronous',
    ],
    `A CALLBACK is a function you pass into another function, to be called once that other function finishes its work. Stacking many callbacks for a sequence of async steps creates deeply NESTED code (nicknamed "callback hell"), which gets hard to read and debug.

A PROMISE is an OBJECT that represents a value that will exist in the future — it can be "pending," then eventually either "resolved" (success, with a result value) or "rejected" (failure, with an error). Instead of nesting callbacks inside callbacks, you chain steps using .then() and .catch(), which reads top-to-bottom instead of burrowing deeper and deeper to the right.

Promises were created specifically to SOLVE the callback-hell problem by flattening a sequence of async steps into a flat, readable chain. Modern "async/await" syntax is built directly on top of Promises, letting asynchronous code be written to look almost like ordinary synchronous code — but under the hood it's still Promises doing the work.`,
  ),
  k(
    'kb-gap-prog3-array-vs-object',
    'Array vs object (the actual structural difference)',
    [
      'difference between an array and an object in javascript structural difference not reference semantics', 'an array is an ORDERED list of values accessed by numeric INDEX starting at zero like a numbered list',
      'an object is an UNORDERED collection of KEY VALUE pairs accessed by named property keys like a labeled dictionary or a filing cabinet with named folders instead of numbered slots',
      'use an array when order and position matter use an object when you need to look things up by a meaningful name instead of a position number',
    ],
    `An ARRAY is an ORDERED list of values, each accessed by a numeric INDEX starting at 0 — like a numbered list, where you get an item by its position ("give me item #2").

An OBJECT is an UNORDERED collection of KEY-VALUE pairs, each accessed by a named PROPERTY key — like a labeled filing cabinet, where you get an item by its name ("give me the item labeled 'age'") rather than its position.

The practical rule: use an ARRAY when the ORDER/POSITION of items matters (a list of scores, a queue of tasks), and use an OBJECT when you need to look things up by a MEANINGFUL NAME instead of a position number (a person's { name, age, email }). (Note: both arrays and objects are also "reference types" in JavaScript — meaning a variable holding one actually holds a pointer to it, so copying the variable doesn't copy the data — but that's a separate concept about how assignment/copying works, not what makes an array structurally different from an object.)`,
  ),
  k(
    'kb-gap-prog3-get-vs-post',
    'GET vs POST HTTP requests',
    [
      'difference between get and post http requests', 'a GET request asks for existing data and puts any parameters directly in the visible URL itself GET requests should not change anything on the server and can be bookmarked cached or resent safely',
      'a POST request sends new data to the server to create or change something and that data is placed in the request BODY not the visible url making it better for sensitive data and large payloads',
      'GET is for retrieving/reading data POST is for submitting/creating or changing data on the server',
    ],
    `A GET request is for RETRIEVING existing data — any parameters go directly in the visible URL itself (like "?search=cats"). GET requests are supposed to be "safe" (shouldn't change anything on the server), which is why they can be bookmarked, cached, and resent without side effects.

A POST request is for SUBMITTING data to CREATE or CHANGE something on the server — like submitting a login form or posting a new comment. That data goes in the request BODY, not the visible URL, which makes it better suited for sensitive data (passwords) and larger payloads that wouldn't fit cleanly in a URL.

The simple rule: GET = reading/retrieving data (safe, visible in the URL), POST = submitting/creating or changing data (has side effects, hidden in the request body).`,
  ),
  k(
    'kb-gap-prog3-debugging-vs-testing',
    'Debugging vs testing (testing is not always "written before the code")',
    [
      'difference between debugging and testing code', 'testing is the general practice of verifying code behaves correctly through structured checks it can happen before during or after the code is written not only before',
      'writing tests BEFORE the code specifically is a particular methodology called test driven development TDD not the definition of testing in general most testing in the real world happens after code is written',
      'debugging is the process of investigating and FIXING a specific known problem in code that is already producing wrong or unexpected behavior using tools like breakpoints logging and step through execution',
      'testing tries to find whether problems exist debugging is what you do once a problem has already been found to figure out why and fix it',
    ],
    `TESTING is the general practice of verifying code behaves correctly through structured checks (unit tests, integration tests, end-to-end tests). Correction: tests are not always written before the code — writing tests BEFORE the code specifically is a particular methodology called Test-Driven Development (TDD), which is one approach among several, not the definition of testing itself. Most testing in the real world happens alongside or after the code is written.

DEBUGGING is a different activity: it's the process of investigating and FIXING a specific, already-known problem in code that's producing wrong or unexpected behavior — using tools like breakpoints, logging, and step-through execution to trace exactly where and why something is going wrong.

The simplest way to separate them: testing tries to find OUT WHETHER problems exist in the first place (proactively checking), while debugging is what you do once a problem has ALREADY been found, to figure out exactly why it's happening and fix it (reactive investigation).`,
  ),
  k(
    'kb-gap-prog3-ide-vs-text-editor',
    'IDE vs text editor',
    [
      'difference between an ide and a text editor', 'a text editor is lightweight software for editing plain text or code with basic features like syntax highlighting it does one job well and stays fast and simple',
      'an ide integrated development environment bundles a text editor together WITH a built in compiler or interpreter a debugger with breakpoints build and project management tools and often autocomplete and refactoring all in one single application',
      'the key word is INTEGRATED an ide integrates many separate development tools into one program a text editor is often extended with plugins to add some of those features individually but starts much simpler and lighter',
    ],
    `A TEXT EDITOR is lightweight software for editing plain text or code, usually with basic features like syntax highlighting — it does one job (editing text) well, and stays fast and simple. Examples: Notepad++, Sublime Text, a bare VS Code install.

An IDE (Integrated Development Environment) bundles a text editor together WITH a built-in compiler or interpreter, a debugger with breakpoints, build/project management tools, and often autocomplete and refactoring tools — all in one single application. Examples: Visual Studio, IntelliJ IDEA, PyCharm.

The key word is INTEGRATED: an IDE combines many separate development tools (editing, compiling, debugging, project management) into one unified program, while a text editor is a simpler, lighter tool that CAN be extended with plugins to add some of those same features individually, but starts out much simpler and faster than a full IDE.`,
  ),
  k(
    'kb-gap-prog3-library-vs-framework',
    'Library vs framework',
    [
      'difference between a library and a framework in programming', 'a library is a toolbox of functions YOU call when you need them your own code stays in control and decides when and how to use the library',
      'a framework is a bigger structure that calls YOUR code instead you write your logic inside the rules and lifecycle the framework provides and the framework is in control of the overall flow this is called inversion of control',
      'you call a library the framework calls you thats the simplest way to remember the direction of control flips between the two',
    ],
    `A LIBRARY is like a toolbox: you grab specific functions or tools from it whenever YOU need them, and call them from your own code. YOUR code stays in control of the overall program flow — you decide when and how to use the library.

A FRAMEWORK flips that relationship: instead of you calling it, the FRAMEWORK calls YOUR code, at times and in places IT decides. You write your logic inside the structure, rules, and lifecycle the framework provides (like a specific function it calls at a specific moment), and the framework itself controls the overall flow of the application. This flipped relationship has a name: "inversion of control."

The simplest way to remember it: with a library, YOU call it. With a framework, IT calls YOU. That's the core difference in who's actually driving the program's control flow.`,
  ),
  k(
    'kb-gap-prog3-csr-vs-ssr',
    'Client-side (frontend) rendering vs server-side rendering',
    [
      'difference between frontend rendering client side rendering and server side rendering ssr', 'client side rendering means the browser downloads a mostly empty html page plus javascript and then the browser itself builds the actual visible content by running that javascript',
      'server side rendering means the SERVER builds the full html page with all its content already filled in BEFORE sending it to the browser so the user sees a complete page immediately without waiting for javascript to run first',
      'server side rendering usually loads faster for the first view and is better for search engine indexing while client side rendering can feel snappier for later interactions once the app is fully loaded in the browser',
    ],
    `CLIENT-SIDE RENDERING (frontend rendering) means the browser downloads a mostly EMPTY HTML page plus a bunch of JavaScript, and then the BROWSER itself builds all the actual visible content by running that JavaScript after the page loads. The user has to wait for the JavaScript to download and run before they see the real content.

SERVER-SIDE RENDERING (SSR) means the SERVER builds the full HTML page — with all its content already filled in — BEFORE sending it to the browser, so the user sees a complete, readable page immediately, without waiting for JavaScript to run first.

The practical trade-off: server-side rendering usually loads faster for that crucial FIRST view and is much better for search engines trying to index the page's content, while client-side rendering can feel snappier for later interactions once the whole app is already loaded and running in the browser.`,
  ),
  k(
    'kb-gap-prog3-token-vs-session',
    'Token vs session for authentication (general concept, not a Discord bot token)',
    [
      'difference between a token and a session for authentication general web development concept', 'this is about general web authentication like JWT tokens not a discord bot token specifically',
      'a session based approach stores the users login state on the SERVER usually in a database or memory and gives the browser a small session ID in a cookie that just points to that stored server side state',
      'a token based approach like a JWT json web token is SELF CONTAINED it holds the users identity and permissions directly inside the token itself so the server does not need to store anything and can just verify the tokens signature on each request',
      'sessions require server side storage and lookup on every request tokens are stateless and scale more easily across multiple servers since no shared session storage is needed',
    ],
    `A SESSION-based approach stores the user's login state on the SERVER — usually in a database or in-memory store — and gives the browser just a small session ID inside a cookie, which points back to that stored server-side state. Every request, the server looks up that ID to check who's logged in.

A TOKEN-based approach (like a JWT — JSON Web Token) is SELF-CONTAINED: the token itself holds the user's identity and permissions directly inside it, so the server doesn't need to store anything at all — it just verifies the token's cryptographic signature on each request to confirm it's valid and unmodified.

The practical trade-off: sessions require server-side storage and a lookup on every request, while tokens are "stateless" and scale more easily across multiple servers, since there's no shared session storage that every server needs access to. (This is a general web-authentication concept — not specific to a Discord bot's own token, which is a different, narrower thing: a secret credential that authenticates the BOT ITSELF to Discord's API, not a mechanism for authenticating a website's end users.)`,
  ),
  k(
    'kb-gap-prog3-api-key-vs-oauth',
    'API key vs OAuth',
    [
      'difference between an api key and oauth', 'an api key is a single simple secret string issued once that identifies who is making a request usually with the same broad level of access every time',
      'oauth is a much more complex authorization FRAMEWORK that lets a user grant a third party app LIMITED specific permission to their account on another service without ever sharing their actual password with that third party app',
      'oauth involves the user actively logging in and clicking approve on a permissions screen and produces a token that can be scoped to specific permissions and can be revoked later unlike a static api key',
    ],
    `An API KEY is a single, simple secret string issued once, used to identify WHO is making a request to an API — it typically grants the same broad level of access every time it's used, with no per-user permission granularity involved.

OAuth is a much more complex AUTHORIZATION framework: it lets a user actively grant a third-party app LIMITED, SPECIFIC permission to their account on another service (like "let this app read my Google Calendar but not my Gmail") — critically, without ever sharing their actual password with that third-party app at all.

The key differences: OAuth involves the user actively logging in and clicking "approve" on a permissions screen, produces a token that can be SCOPED to specific permissions (not all-or-nothing access), and that token can be revoked later without changing any password — none of which a simple static API key can do. API keys are simpler and fine for basic service-to-service access; OAuth exists specifically for "let this app act on my behalf, with limited permission, on some other service."`,
  ),
];
