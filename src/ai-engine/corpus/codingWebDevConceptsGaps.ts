import { KnowledgeItem } from '../../types';

// Batch 301 corpus fixes — first coding/programming-focused batch after Patrick's standing
// instruction (2026-09-14) to prioritize coding topics going forward. 11/25 misses across
// HTTP methods, testing concepts, memory model, and web dev basics — despite the large
// pre-existing 219-item programming corpus (pythonFundamentalsCorpus, javascriptTypescript,
// algorithmsDataStructures, softwareEngineeringConcepts, networkingAndArchitecture, etc.),
// these specific comparison angles (PUT/PATCH, shallow/deep copy, frontend/backend, cookie/
// session, localStorage/sessionStorage, XML/JSON, white/black-box testing, TDD/BDD, pass by
// value/reference, REST/SOAP, web app/native app) weren't covered yet. Two severe wrong-domain
// hallucinations: REST/SOAP answered with a MUSICAL rest and literal soap/hygiene chemistry,
// and localStorage described as browser cache while sessionStorage was never mentioned at all
// (confused with cookies instead). One factual inversion: pass-by-value described backwards
// (said assigning to the parameter changes the original — that's pass-by-reference behavior).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const CODING_WEB_DEV_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-code-put-vs-patch',
    'PUT vs PATCH (HTTP methods)',
    ['PUT', 'PATCH', 'difference PUT PATCH', 'HTTP methods PUT PATCH'],
    "Both PUT and PATCH are HTTP methods used to update an existing resource on a server, but they differ in scope. PUT replaces the ENTIRE resource — the client sends the complete, full representation of the resource, and the server overwrites whatever was there before with exactly that; any fields left out of the PUT request are typically wiped/reset, since PUT means 'put this whole thing here.' PATCH applies a PARTIAL update — the client sends only the fields that need to change (e.g. just `{\"email\": \"new@example.com\"}`), and the server merges those changes into the existing resource, leaving everything else untouched. PUT is also defined as idempotent in the exact same way every time (sending the same PUT twice produces the same final state), while PATCH can be less predictable if it describes a delta/operation rather than a final value. The key difference: PUT replaces a resource in full, requiring the complete representation, while PATCH updates only the specific fields provided, leaving the rest of the resource unchanged.",
  ),
  k(
    'kb-gap-code-shallow-vs-deep-copy',
    'Shallow copy vs deep copy',
    ['shallow copy', 'deep copy', 'difference shallow deep copy'],
    "A shallow copy creates a new top-level object or array, but any nested objects/arrays inside it are NOT duplicated — the new copy's nested fields still point to the exact same underlying objects in memory as the original, so mutating a nested object through the copy also changes it in the original (e.g. in JavaScript, `{...obj}` or `Object.assign({}, obj)` only copies one level deep). A deep copy recursively duplicates EVERY level — the new object and all of its nested objects/arrays are entirely separate in memory from the original, so mutating anything in the copy, no matter how deeply nested, never affects the original at all (common ways to deep copy include `structuredClone()` in JS, `copy.deepcopy()` in Python, or serializing to JSON and back for simple data). The key difference: a shallow copy only duplicates the outermost layer and still shares nested objects with the original, while a deep copy duplicates every nested level so the copy is fully independent.",
  ),
  k(
    'kb-gap-code-frontend-vs-backend',
    'Frontend vs backend development',
    ['frontend development', 'backend development', 'difference frontend backend'],
    "Frontend development is everything that runs in the user's browser and that they directly see and interact with — built with HTML (structure), CSS (styling), and JavaScript/TypeScript (interactivity), often using frameworks like React, Vue, or Angular, and covering things like layout, buttons, forms, and animations. Backend development is the server-side logic that the user never directly sees — it handles business logic, talks to databases, processes authentication, runs API endpoints, and returns data to the frontend on request, commonly built with languages/frameworks like Node.js/Express, Python/Django or Flask, Ruby on Rails, Java/Spring, or Go, and typically involves a database (SQL or NoSQL) to persist data. A 'full-stack' developer works on both sides. The key difference: frontend is the client-facing UI code that runs in the browser, while backend is the server-side code that handles data, logic, and infrastructure the user never sees directly.",
  ),
  k(
    'kb-gap-code-cookie-vs-session',
    'Cookie vs session',
    ['cookie', 'session', 'difference cookie session', 'web session'],
    "A cookie is a small piece of data (a key-value string, usually just a few KB) that a server tells the browser to store, and which the browser then automatically sends back to that same server with every subsequent request — cookies can hold arbitrary small data directly (like a theme preference) or, more commonly for logins, just a random session ID token. A session is server-side state — a record the server keeps (in memory, a database, or a cache like Redis) that stores actual user data (like 'this user is logged in as user #42') tied to that random ID; the cookie itself typically doesn't contain the sensitive data, it just carries the ID that lets the server look up the corresponding session record. The key difference: a cookie is the small piece of data stored in the browser and sent with each request (often just an ID), while a session is the actual state kept on the SERVER that the cookie's ID points to.",
  ),
  k(
    'kb-gap-code-localstorage-vs-sessionstorage',
    'localStorage vs sessionStorage',
    ['localStorage', 'sessionStorage', 'difference localStorage sessionStorage', 'web storage API'],
    "Both localStorage and sessionStorage are browser JavaScript APIs (part of the Web Storage API) that let a website store key-value string data directly in the browser, and neither is automatically sent to the server with every request the way cookies are — they're accessed only via JavaScript (`localStorage.setItem()`, etc.). The difference is persistence and scope: localStorage data has NO expiration — it stays in the browser indefinitely (until explicitly cleared by code, the user, or clearing browser data) and is shared across every tab/window for that site. sessionStorage data is cleared automatically as soon as the browser TAB is closed, and each tab gets its own separate sessionStorage even for the same site (opening the same site in two tabs gives two independent sessionStorage areas). Neither of these is the same thing as browser cache (which stores downloaded files like images/scripts for faster reloading) or cookies (which ARE sent to the server automatically). The key difference: localStorage persists indefinitely and is shared across tabs, while sessionStorage is cleared when the tab closes and is isolated per tab.",
  ),
  k(
    'kb-gap-code-xml-vs-json',
    'XML vs JSON',
    ['XML', 'JSON', 'difference XML JSON'],
    "XML (eXtensible Markup Language) represents data using nested tags, similar to HTML — e.g. `<user><name>Alex</name><age>30</age></user>` — and supports attributes, namespaces, comments, and a formal schema system (XSD) for strictly validating document structure, which made it popular for enterprise systems, config files, and older web services (SOAP). JSON (JavaScript Object Notation) represents the same data using key-value pairs, arrays, and nested objects — e.g. `{\"name\": \"Alex\", \"age\": 30}` — with a much simpler, more compact syntax that maps directly onto native data structures in most programming languages (objects/dictionaries, arrays/lists), making it faster to parse and easier to read. JSON has largely replaced XML as the default format for web APIs (REST APIs return JSON almost universally today) because it's lighter-weight and simpler, though XML is still common in older enterprise systems, RSS/Atom feeds, and Microsoft Office file formats (.docx/.xlsx are secretly zipped XML). The key difference: XML uses verbose nested tags with a formal schema/validation system, while JSON uses lightweight key-value syntax that maps directly to native data structures, making it the modern default for web APIs.",
  ),
  k(
    'kb-gap-code-whitebox-vs-blackbox-testing',
    'White-box testing vs black-box testing',
    ['white-box testing', 'black-box testing', 'difference white-box black-box testing'],
    "Black-box testing evaluates software purely from the OUTSIDE, based only on inputs and expected outputs, with no knowledge of or access to the internal code/implementation — the tester just checks 'if I give this input, do I get the right output?' without caring how it works internally; this is how QA testers or end-user acceptance testing usually works. White-box testing (also called clear-box or glass-box testing) is done WITH full knowledge of the internal code structure — the tester (usually the developer) looks at the actual source code, logic branches, and paths to write tests that specifically exercise particular code paths, edge cases, and internal logic, aiming for things like full code-branch coverage. The key difference: black-box testing checks behavior from the outside without seeing the code, while white-box testing is designed with full visibility into the internal code structure and logic.",
  ),
  k(
    'kb-gap-code-tdd-vs-bdd',
    'TDD vs BDD',
    ['TDD', 'BDD', 'test-driven development', 'behavior-driven development', 'difference TDD BDD'],
    "TDD (Test-Driven Development) is a workflow where a developer writes a failing automated test FIRST, then writes just enough code to make it pass, then refactors — the classic 'red, green, refactor' cycle — and the tests are typically written in code, focused on verifying specific functions/units behave correctly at a technical level. BDD (Behavior-Driven Development) extends that idea but shifts the focus to describing the software's BEHAVIOR in plain, human-readable language that non-developers (like product managers or QA) can understand and even help write, typically using a Given/When/Then format (e.g. 'Given a logged-in user, When they click logout, Then they should be redirected to the login page'), often implemented with tools like Cucumber or Gherkin syntax that then map those plain-English scenarios to actual test code. The key difference: TDD is about writing technical, code-level tests before the implementation, while BDD is about describing expected behavior in plain, shared language (Given/When/Then) so both technical and non-technical people can understand what's being tested.",
  ),
  k(
    'kb-gap-code-pass-by-value-vs-reference',
    'Pass by value vs pass by reference',
    ['pass by value', 'pass by reference', 'difference pass by value reference'],
    "Pass by value means a COPY of the variable's value is given to the function — changes made to the parameter INSIDE the function do NOT affect the original variable outside it, because the function is working on its own independent copy. Pass by reference means the function receives a reference to (essentially, direct access to) the original variable itself — changes made to the parameter inside the function DO affect the original variable outside it, because there's no copy; they're both pointing at the same underlying data. In practice this gets confusing across languages: many languages that claim to 'pass by value' (like Java, Python, and JavaScript) actually pass object/array references BY VALUE — meaning the reference itself is copied, so mutating the object's contents (e.g. `arr.push(x)`) affects the original, but reassigning the parameter to a whole new object (`arr = []`) does not affect the caller's variable, since that just points the local copy of the reference elsewhere. True pass-by-reference (like C++'s `&` reference parameters) lets a function reassign the caller's variable directly. The key difference: pass by value gives the function an independent copy (mutations inside don't leak out), while pass by reference gives direct access to the original (mutations, and in true pass-by-reference even reassignment, do leak out).",
  ),
  k(
    'kb-gap-code-rest-vs-soap',
    'REST vs SOAP (web APIs)',
    ['REST', 'SOAP', 'difference REST SOAP', 'REST API', 'SOAP API'],
    "REST (Representational State Transfer) is an architectural STYLE for web APIs, not a strict protocol — it typically uses standard HTTP methods (GET, POST, PUT, DELETE) against resource URLs, is stateless, and almost always exchanges data as lightweight JSON, making it simple, flexible, and the dominant choice for modern web/mobile APIs. SOAP (Simple Object Access Protocol) is a much stricter, more formal PROTOCOL — every request and response is wrapped in a rigid XML 'envelope' with a defined structure (header, body, fault), it has a formal contract language (WSDL) that precisely defines every available operation and data type, and it includes built-in standards for things like security (WS-Security) and transactions, which made it popular in enterprise and banking systems where strict formal contracts matter more than simplicity. The key difference: REST is a lightweight, flexible architectural style using standard HTTP and typically JSON, while SOAP is a strict, formally-specified XML-based protocol with a rigid contract (WSDL), commonly used in older enterprise systems that need stronger built-in formality.",
  ),
  k(
    'kb-gap-code-webapp-vs-native-app',
    'Web application vs native application',
    ['web application', 'native application', 'difference web app native app'],
    "A web application runs inside a browser and is built with web technologies (HTML, CSS, JavaScript) — the user accesses it through a URL, nothing needs to be downloaded/installed from an app store, it works across virtually any device with a browser, and updates happen instantly server-side with no user action needed, but it generally has more limited access to device hardware (camera, GPS, notifications) and needs an internet connection for most functionality. A native application is built specifically for one platform (iOS, Android, Windows, macOS) using that platform's own languages/frameworks (Swift/Objective-C for iOS, Kotlin/Java for Android, etc.), must be downloaded and installed from an app store, and in exchange gets full, direct access to device hardware and OS features, generally better performance, and the ability to work offline — but it has to be built and maintained separately for each platform, and updates require the user to download a new version. The key difference: a web app runs in a browser, works everywhere instantly with no install, but has limited device access, while a native app is installed per-platform and gets full device/hardware access and offline capability at the cost of needing separate builds for each OS.",
  ),
];
