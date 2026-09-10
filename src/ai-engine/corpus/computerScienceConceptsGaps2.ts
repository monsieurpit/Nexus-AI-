import { KnowledgeItem } from '../../types';

/**
 * COMPUTER_SCIENCE_CONCEPTS_GAPS_2 — batch 259 corrections. nexus-4b was good on
 * most (compiler/interpreter, array/linked list, stack/queue, hash map/set,
 * BFS/DFS, class/object, abstract class/interface, process/thread, TCP/UDP,
 * HTTP/WebSocket, GET/POST, authn/authz, hashing/encryption, sym/asym, library/
 * framework, SQL/NoSQL, primary/foreign key, merge/rebase, container/VM).
 * Misses:
 * - "function vs method" was a numerical-analysis web dump.
 * - "parameter vs argument" answered about STATISTICAL parameters.
 * - "statement vs expression" answered about logical/factual statements.
 * - "tree vs graph" answered about a literal tree with a trunk.
 * - "overloading vs overriding" was a Tetralogy of Fallot (heart defect) dump.
 * - "public vs private" answered about IP addresses.
 * - "recursion vs iteration" was barely answered.
 * - "concurrency vs parallelism", "blocking vs non-blocking" were cut.
 * - "pass by value vs reference", "stack vs heap", "inheritance vs composition"
 *   were choppy or thin.
 * - "API vs SDK" never defined SDK.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'technology', keywords, content, createdAt: now,
});

export const COMPUTER_SCIENCE_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-cs2-function-vs-method',
    'Function vs method (programming)',
    [
      'difference between a function and a method', 'both are named reusable blocks of code that take inputs and usually return a value', 'a function is a standalone routine not tied to any object len print Math.sqrt', 'a method is a function that belongs to a class or object called ON an instance with implicit access to that objects data via self or this list.append string.upper',
      'a method is a function that is a member of a class in purely OO languages everything is a method', 'not a numerical-analysis method',
    ],
    `Both are NAMED, reusable blocks of code that take inputs (parameters) and usually return a value. The difference is whether the routine is attached to an object. (This is not "finite-difference methods" from numerical analysis.)

A FUNCTION is a STANDALONE (free) routine — it exists on its own, is called by name, and is not bound to any object:
    len([1, 2, 3])
    Math.sqrt(16)
    print("hello")
    def add(a, b): return a + b

A METHOD is a function that BELONGS TO a class (or an object). It is called ON an instance (or on the class), using dot notation, and it has IMPLICIT ACCESS to that object's own data through a special first parameter — 'self' in Python, 'this' in Java/JavaScript/C++:
    "hello".upper()          # upper() is a method of str
    my_list.append(4)        # append() is a method of list
    myCar.startEngine()      # startEngine() is a method of Car
    class Dog:
        def bark(self): ...  # bark is a method

So a method is "a function that is a member of a class". In purely object-oriented languages like Java, ALL code lives in methods and there are no free functions; in multi-paradigm languages (Python, JavaScript, C++) you have both. "Static methods" are a middle case — attached to a class for namespacing but without access to instance data.`,
  ),
  k(
    'kb-gap-cs2-parameter-vs-argument',
    'Parameter vs argument (programming)',
    [
      'difference between a parameter and an argument', 'a parameter is the variable named in a functions definition a placeholder for the value the function will receive def greet name name is a parameter formal parameter', 'an argument is the actual value you pass in when you call the function greet Alice Alice is an argument actual parameter',
      'parameters in the definition arguments in the call positional keyword default variadic', 'not a statistical parameter',
    ],
    `They are two ends of the same thing — the value(s) a function works with — but at different points. (This is not the statistics sense of "parameter".)

A PARAMETER is the variable listed in the function's DEFINITION. It is a PLACEHOLDER — a local name that will hold whatever value gets passed in when the function is called. Also called a "formal parameter".
    def greet(name, greeting="Hi"):   # name and greeting are PARAMETERS
        print(greeting, name)

An ARGUMENT is the ACTUAL VALUE you supply when you CALL the function. It gets bound to the corresponding parameter. Also called an "actual parameter".
    greet("Alice", "Hello")   # "Alice" and "Hello" are ARGUMENTS

Memory aid: PARAMETERS are in the definition; ARGUMENTS are in the call ("a" for arguments, "a" for the actual call).

Related terms: POSITIONAL arguments are matched by order; KEYWORD arguments by name ('greet(name="Bob")'); a parameter can have a DEFAULT value used when no argument is given; and '*args' / '**kwargs' (variadic parameters) collect any number of extra arguments.`,
  ),
  k(
    'kb-gap-cs2-statement-vs-expression',
    'Statement vs expression (programming)',
    [
      'difference between a statement and an expression', 'an expression is a piece of code that evaluates to a value 2 + 3 x * y func a a > b string concatenation', 'a statement is a complete instruction that performs an action assignment if while for return print it does something rather than producing a value',
      'expressions can be part of statements x = 2 + 3 the 2+3 is an expression the whole line is a statement expression-oriented languages Rust Lisp Ruby make almost everything return a value', 'not a factual claim you believe to be true',
    ],
    `The distinction is about whether a piece of code PRODUCES A VALUE or PERFORMS AN ACTION. (This is not the logic sense of "statement" as a proposition.)

An EXPRESSION is code that EVALUATES TO A VALUE. You can put it wherever a value is expected — assign it, pass it as an argument, use it in a bigger expression:
    2 + 3
    x * y - 1
    len(items)
    a > b
    "hi " + name
    price if in_stock else 0     (a conditional expression)

A STATEMENT is a complete INSTRUCTION that DOES something — it has an effect but doesn't itself produce a usable value:
    x = 5                        (assignment statement)
    if cond: ...                 (if statement)
    while cond: ...              (loop statement)
    return result                (return statement)
    import os                    (import statement)

Expressions are usually PART of statements: in 'x = 2 + 3;', the '2 + 3' is an expression and the whole line is an assignment statement. Calling a function like 'print(x)' is an "expression statement" — an expression used on its own line for its side effect.

Languages differ: C, Java, and Python keep a firm statement/expression divide (you can't do 'y = (if c then a else b)' in Python's statement form). "EXPRESSION-ORIENTED" languages like Rust, Lisp, Ruby, and Kotlin make almost everything — including 'if', blocks, and loops — an expression that yields a value.`,
  ),
  k(
    'kb-gap-cs2-tree-vs-graph',
    'Tree vs graph (data structures)',
    [
      'difference between a tree and a graph data structure', 'a graph is a general structure of nodes vertices connected by edges edges can be directed or undirected weighted or not there can be cycles disconnected parts and multiple edges', 'a tree is a special restricted graph connected acyclic no cycles for a rooted tree exactly one root every other node has exactly one parent exactly one path between any two nodes N nodes always N minus 1 edges',
      'every tree is a graph a graph is a tree only if connected and acyclic trees model hierarchy graphs model networks', 'not a plant with a trunk',
    ],
    `A GRAPH (in computer science, not botany) is the GENERAL structure: a set of NODES (vertices) connected by EDGES (links). Graphs are very flexible:
- edges can be DIRECTED (one-way, like Twitter follows) or UNDIRECTED (mutual, like Facebook friends);
- edges can be WEIGHTED (a distance, a cost) or unweighted;
- there can be CYCLES (a path that loops back to where it started);
- the graph can be DISCONNECTED (islands of nodes with no path between them);
- there can be multiple edges between the same two nodes, and self-loops.
Graphs model NETWORKS: road maps, social networks, the web's link structure, dependency graphs, state machines.

A TREE is a SPECIAL, restricted kind of graph. It must be:
- CONNECTED (there is a path between every pair of nodes), and
- ACYCLIC (no cycles).
A ROOTED tree adds: exactly ONE root node, every other node has exactly ONE parent, and there is exactly ONE path between any two nodes. A tree with N nodes always has exactly N - 1 edges. Trees model HIERARCHY: file systems, organisation charts, the HTML DOM, family trees, parse/syntax trees, decision trees, and search structures (BSTs, heaps, tries).

So: every tree IS a graph, but a graph is a tree only if it is connected and has no cycles. Add one extra edge to a tree and you create a cycle — it's now just a graph.`,
  ),
  k(
    'kb-gap-cs2-overloading-vs-overriding',
    'Overloading vs overriding (OOP)',
    [
      'difference between overloading and overriding', 'overloading compile-time static polymorphism multiple methods with the same name but different parameter lists number or types in the same class the compiler picks based on the arguments print int versus print String', 'overriding runtime dynamic polymorphism a subclass provides its own implementation of an inherited method with the same signature replacing the parents version the method called is decided at runtime based on the objects real type',
      'not the overriding aorta of Tetralogy of Fallot',
    ],
    `Both involve methods sharing a name; the difference is WHERE the alternatives live and WHEN the choice is made. (Nothing to do with the "overriding aorta" heart defect.)

METHOD OVERLOADING: defining SEVERAL methods with the SAME NAME but DIFFERENT PARAMETER LISTS (different number of parameters, or different types) within the SAME class. The compiler decides which one to call at COMPILE TIME, based on the arguments you pass. This is "static" or "compile-time" polymorphism.
    void print(int x)            { ... }
    void print(String s)         { ... }
    void print(int x, int y)     { ... }
    print(5);        -> calls the first
    print("hi");     -> calls the second
(Java, C++, C# support it; Python does not have true overloading — a later 'def' with the same name just replaces the earlier one, and you use default args or '*args' instead.)

METHOD OVERRIDING: a SUBCLASS provides its OWN implementation of a method it INHERITED from a parent class, with the EXACT SAME SIGNATURE (name + parameters), REPLACING the parent's version for instances of the subclass. The method that actually runs is chosen at RUNTIME based on the object's real (dynamic) type. This is "dynamic" or "runtime" polymorphism, and it is the mechanism behind interfaces and abstract methods.
    class Animal { String sound() { return "..."; } }
    class Dog extends Animal { String sound() { return "Woof"; } }   // overrides
    Animal a = new Dog();
    a.sound();   // returns "Woof" — Dog's version, decided at runtime

Short version: overloading = same class, same name, different parameters, resolved by the compiler; overriding = subclass replaces an inherited method with the same signature, resolved at runtime.`,
  ),
  k(
    'kb-gap-cs2-public-vs-private',
    'Public vs private (access modifiers in OOP)',
    [
      'difference between public and private programming', 'these are access modifiers controlling the visibility and encapsulation of a class members fields and methods', 'public members can be accessed from anywhere any code with a reference to the object they form the classes external API', 'private members can only be accessed from within the same class hidden implementation details protecting internal state and letting you change internals without breaking users',
      'protected is in between accessible in the class and its subclasses encapsulation exposes a minimal public interface', 'not a public versus private IP address',
    ],
    `In object-oriented programming, PUBLIC and PRIVATE are ACCESS MODIFIERS (visibility keywords) that control who is allowed to use a class's members — its fields (data) and methods (behaviour). (This is not about public vs private IP addresses.)

PUBLIC members can be accessed from ANYWHERE — from inside the class, from subclasses, and from any outside code that holds a reference to the object. The public members are the class's INTERFACE or API: the deliberately exposed way that the rest of the program is meant to interact with it.

PRIVATE members can be accessed ONLY from within the SAME class (its own methods). They are HIDDEN implementation details. Making a field private:
- protects the object's internal STATE from being changed to an invalid value by outside code;
- lets you validate changes by forcing access through public "getter/setter" methods;
- lets you CHANGE the internals later (rename a field, change how something is computed) without breaking any code that uses the class, because outsiders were never allowed to depend on those details.

In between there is PROTECTED (accessible within the class AND its subclasses) and, in some languages, package-private / internal (accessible within the same module).

This is the principle of ENCAPSULATION: expose a small, stable PUBLIC interface, and keep everything else PRIVATE.`,
  ),
  k(
    'kb-gap-cs2-recursion-vs-iteration',
    'Recursion vs iteration',
    [
      'difference between recursion and iteration', 'iteration uses a loop for or while with a mutable loop variable and an explicit condition repeats a block until the condition fails constant stack space', 'recursion solves a problem by having a function call itself on a smaller subproblem with a base case that stops the recursion each call adds a stack frame deep recursion can overflow the stack often more natural for trees divide-and-conquer fractals',
      'any recursion can be rewritten as iteration sometimes with an explicit stack and vice versa tail-call optimisation makes tail recursion as cheap as a loop',
    ],
    `Both are ways to REPEAT a computation until a goal is reached.

ITERATION uses an explicit LOOP construct — 'for', 'while', 'do-while'. There is a loop variable (often a counter) that changes each pass, and a CONDITION that is checked before or after each pass; the loop body runs over and over until the condition becomes false.
    total = 0
    for i in range(1, n + 1):
        total += i          # sum 1..n by iteration
Iteration uses CONSTANT stack space (one frame), so it never overflows the stack no matter how many passes.

RECURSION solves a problem by defining it in terms of a SMALLER version of itself: a function CALLS ITSELF on a reduced input, and a BASE CASE (a trivially small input) stops the chain and returns a concrete answer, which the pending calls then combine.
    def sum_to(n):
        if n == 0: return 0          # base case
        return n + sum_to(n - 1)     # recursive case
Each call adds a STACK FRAME, so very deep recursion can cause a STACK OVERFLOW. But recursion is often far more natural and readable for problems that are themselves recursive: traversing TREES and graphs, DIVIDE-AND-CONQUER algorithms (merge sort, quicksort, binary search), parsing, fractals, and backtracking.

Equivalence: ANY recursive algorithm can be rewritten iteratively (sometimes you must manage an explicit stack yourself), and any loop can be written recursively. TAIL-CALL OPTIMISATION, in languages that do it (Scheme, some Scala/Kotlin), reuses the current stack frame for a tail-recursive call, making it as efficient as a loop.`,
  ),
  k(
    'kb-gap-cs2-concurrency-vs-parallelism',
    'Concurrency vs parallelism',
    [
      'difference between concurrency and parallelism', 'concurrency is dealing with multiple tasks at once structuring a program so multiple tasks are in progress during overlapping time periods making progress by interleaving a single core rapidly switching it is about composition and structure', 'parallelism is doing multiple things at the same instant literally executing multiple computations simultaneously on multiple cores or processors it is about execution',
      'concurrency is possible on one core parallelism needs multiple you can have concurrency without parallelism async IO on one thread or both', 'Rob Pike concurrency is not parallelism',
    ],
    `They sound the same but describe different things — as Rob Pike put it, "concurrency is not parallelism".

CONCURRENCY is about STRUCTURE — designing a program so that multiple tasks can be IN PROGRESS during OVERLAPPING time periods, dealing with many things at once. The tasks make progress by being INTERLEAVED: a single processor rapidly switches between them (a web server handling 1,000 connections by juggling them, an app doing a network request while keeping the UI responsive). Concurrency is about how you COMPOSE independently executing pieces (threads, coroutines, async tasks, actors) so they cooperate without stepping on each other. It is possible on a SINGLE core.

PARALLELISM is about EXECUTION — literally performing multiple computations AT THE SAME INSTANT, using MULTIPLE processing units (cores, CPUs, GPU lanes, machines). Splitting a big array sum across 8 cores, rendering different image tiles simultaneously, training a model across many GPUs. Parallelism REQUIRES hardware that can genuinely do more than one thing at the same time.

The relationship:
- Concurrency WITHOUT parallelism: async I/O on one thread — tasks overlap in time but only one runs at any instant.
- Parallelism WITHOUT much concurrency: a 'parallel_for' that just splits one loop across cores.
- BOTH: a concurrent program (well-structured into independent tasks) run on a multi-core machine so those tasks also execute in parallel.

Concurrency is a way of organising a solution; parallelism is a way of making it run faster on suitable hardware.`,
  ),
  k(
    'kb-gap-cs2-blocking-vs-nonblocking',
    'Blocking vs non-blocking',
    [
      'difference between blocking and non-blocking', 'a blocking call does not return until the operation completes the calling thread is stuck idle in the meantime a blocking read waits until data arrives', 'a non-blocking call returns immediately either with the result if ready or with a would-block try-again status so the thread can do other work or check other operations',
      'non-blocking IO plus an event loop select epoll lets one thread handle thousands of connections related to but distinct from synchronous versus asynchronous',
    ],
    `This is about whether a call HOLDS UP the thread that made it.

A BLOCKING call does NOT RETURN until the operation is finished. The calling thread just SITS THERE, idle, doing nothing, until the result is ready. A blocking 'socket.read()' waits until bytes actually arrive; a blocking 'lock.acquire()' waits until the lock is free; a blocking 'queue.get()' waits until an item is available. Simple to write and reason about, but a thread stuck in a blocking call cannot do anything else, so a server that gives each client a thread needs a thread per client.

A NON-BLOCKING call RETURNS IMMEDIATELY, whether or not the work is done:
- if the operation could complete right away, you get the result;
- if it could not (no data yet, lock held), you get a special status like 'EWOULDBLOCK' / "not ready" instead of waiting.
So the thread is free to go do other useful work, or to check on many other operations. Non-blocking I/O combined with an EVENT LOOP that watches many file descriptors at once ('select', 'poll', 'epoll', 'kqueue', IOCP) is how a single thread can efficiently handle tens of thousands of network connections (Node.js, nginx, Redis).

Relationship to SYNCHRONOUS/ASYNCHRONOUS: they are related axes but not identical. "Blocking/non-blocking" is about whether the CALL waits; "synchronous/asynchronous" is about whether you get the RESULT inline or via a later notification (callback, promise, completion event). In practice: blocking calls are synchronous; non-blocking calls are used to build asynchronous programs.`,
  ),
  k(
    'kb-gap-cs2-pass-by-value-vs-reference',
    'Pass by value vs pass by reference (vs call by sharing)',
    [
      'difference between pass by value and pass by reference', 'pass by value the function receives a copy of the arguments value so modifying the parameter inside the function does not affect the callers variable', 'pass by reference the function receives a reference alias to the callers actual variable so assignments inside the function change the original C++ with the ampersand',
      'many languages Java Python JavaScript are pass by value where the value passed is a reference pointer to an object so you can mutate the objects contents but cannot reassign the callers variable call by sharing',
    ],
    `This is about what a function receives when you pass it an argument.

PASS BY VALUE: the function gets a COPY of the argument. Whatever it does to its parameter — including reassigning it — affects only the local copy, NOT the caller's variable.
    void f(int x) { x = 99; }
    int a = 1; f(a);   // a is still 1

PASS BY REFERENCE: the function gets a REFERENCE (an alias) to the caller's ACTUAL variable. Assigning to the parameter changes the ORIGINAL.
    void f(int& x) { x = 99; }   // C++ reference parameter
    int a = 1; f(a);   // a is now 99

The confusing part — most modern languages:
- JAVA, PYTHON, JAVASCRIPT, C#, Ruby, Go are "PASS BY VALUE" — but for objects, the VALUE being copied is a REFERENCE (a pointer) to the object. So inside the function you can MUTATE the object's contents (add to a list, change a field) and the caller sees it — but if you REASSIGN the parameter to a whole new object, the caller's variable is unchanged. This is often called "call by sharing" or "call by object reference".
    def f(lst):
        lst.append(4)      # caller sees this  (mutation through the shared reference)
        lst = [9, 9, 9]    # caller does NOT see this  (local rebind)

- C passes everything by value; to let a function modify a caller's variable you pass a POINTER to it (and the pointer itself is passed by value).

Rule of thumb for Java/Python/JS: "you can change what the object contains, but you can't change which object the caller's variable points to."`,
  ),
  k(
    'kb-gap-cs2-stack-vs-heap-memory',
    'Stack vs heap (memory)',
    [
      'difference between the stack and the heap memory', 'the stack grows and shrinks automatically with function calls each call pushes a frame holding its locals and return address popped on return allocation is instant just move the pointer fixed size known at compile time LIFO limited in size stack overflow on deep recursion', 'the heap is a large pool for dynamic allocation malloc new you explicitly request memory that lives until you free it or the garbage collector reclaims it any size can outlive the function slower allocation risk of leaks and fragmentation',
    ],
    `These are two regions where a running program stores data.

The STACK is memory that is managed AUTOMATICALLY and follows the function call structure. Every time a function is CALLED, a "STACK FRAME" is pushed on: it holds that call's LOCAL variables, its parameters, and the RETURN ADDRESS. When the function RETURNS, its whole frame is popped off in one go. Properties:
- allocation and deallocation are essentially FREE (just move the stack pointer up or down);
- sizes must be KNOWN at compile time (a fixed-size local array, a struct);
- strictly LIFO — you can only free the most recent frame;
- it is SMALL (often 1-8 MB per thread) — recurse too deeply or declare a huge local array and you get a STACK OVERFLOW.

The HEAP is a large pool for DYNAMIC allocation — memory you request explicitly at RUNTIME, in amounts not known ahead of time:
- C/C++: 'malloc' / 'new', and you must 'free' / 'delete' it yourself;
- Java/Python/Go/JS: 'new' / object creation, and a GARBAGE COLLECTOR reclaims it once nothing references it.
Heap memory can be ANY size, and it LIVES until it is freed/collected — so it can OUTLIVE the function that created it, which is how you return data structures. Costs: allocation is SLOWER (the allocator must find a suitable free block), and you risk MEMORY LEAKS (forgetting to free), DANGLING POINTERS (using freed memory), and FRAGMENTATION.

Rough rule: small, short-lived, fixed-size data -> stack; large, variable-size, or long-lived data that must outlast the current function -> heap.`,
  ),
  k(
    'kb-gap-cs2-inheritance-vs-composition',
    'Inheritance vs composition (OOP design)',
    [
      'difference between inheritance and composition', 'inheritance a class derives from a parent class automatically getting its fields and methods an IS-A relationship a Dog is an Animal enables polymorphism and reuse but tight coupling fragile base class deep hierarchies get rigid', 'composition a class contains instances of other classes as members and delegates work to them a HAS-A relationship a Car has an Engine more flexible looser coupling behaviour can be swapped at runtime',
      'the guideline favour composition over inheritance use inheritance for a true is-a with shared behaviour',
    ],
    `Two ways to build a class out of other classes and reuse behaviour.

INHERITANCE: a class EXTENDS a parent (base) class and automatically GAINS its fields and methods, overriding or adding as needed. It expresses an "IS-A" relationship — a Dog IS-A Animal, a SavingsAccount IS-A Account.
    class Animal { void eat() {...} }
    class Dog extends Animal { void bark() {...} }   // Dog also has eat()
Strengths: concise reuse, and POLYMORPHISM (treat a Dog as an Animal). Weaknesses: TIGHT COUPLING — the subclass depends on the parent's internals, so changes to the base class can silently break subclasses (the "fragile base class" problem); you can usually inherit from only ONE class; and deep or wide hierarchies become RIGID and hard to change (the classic mess: is a 'Square' a subclass of 'Rectangle'?).

COMPOSITION: a class HOLDS instances of other classes as member fields and DELEGATES work to them. It expresses a "HAS-A" relationship — a Car HAS-A Engine, HAS wheels; a Logger HAS-A OutputStream.
    class Car {
        private Engine engine = new Engine();
        void start() { engine.ignite(); }   // delegate
    }
Strengths: LOOSER coupling (you depend only on the component's public interface), you can combine MANY components, and behaviour can be SWAPPED at runtime (inject a different Engine, a mock logger for tests). This is the basis of "strategy" and "dependency injection".

The well-known design guideline is "FAVOUR COMPOSITION OVER INHERITANCE": reach for composition by default, and use inheritance only when there is a genuine, stable "is-a" relationship and you truly want the subclass to be substitutable for the parent.`,
  ),
  k(
    'kb-gap-cs2-api-vs-sdk',
    'API vs SDK',
    [
      'difference between an API and an SDK', 'an API application programming interface is a defined set of rules and contract for how software components interact the functions endpoints request and response formats and data structures you use to talk to a service or library without knowing its internals', 'an SDK software development kit is a broader package of tools for building software for a specific platform or service it typically includes one or more APIs plus libraries sample code documentation debuggers compilers and other utilities',
      'an API is a way to interact an SDK is a toolbox that usually contains APIs plus everything else you need',
    ],
    `An API (Application Programming Interface) is a defined SET OF RULES / a CONTRACT for how one piece of software talks to another. It specifies:
- the FUNCTIONS or methods you can call (or, for a web API, the ENDPOINTS and HTTP methods);
- what INPUTS each expects (parameters, request body, headers);
- what OUTPUTS you get back (return type, response format, status codes, errors);
- the DATA STRUCTURES exchanged.
You use an API without knowing (or caring) how the thing behind it is implemented. Examples: the Java Collections API, the DOM API in browsers, the Stripe REST API, the Twitter API.

An SDK (Software Development Kit) is a BROADER PACKAGE of everything you need to BUILD software for a particular platform, service, or language. An SDK typically CONTAINS one or more APIs, PLUS:
- pre-built LIBRARIES / wrapper code that call those APIs for you in your language of choice;
- CODE SAMPLES and starter projects;
- DOCUMENTATION and guides;
- development TOOLS — compilers, debuggers, emulators/simulators, profilers, build scripts, command-line utilities.
Examples: the Android SDK, the iOS SDK, the AWS SDK for Python, the Stripe SDK for Node.

The relationship: an API is the INTERFACE (how you interact); an SDK is a TOOLBOX that usually bundles APIs together with libraries and tools so you can develop against a platform quickly. You can use a raw API by making HTTP calls yourself; an SDK does that plumbing for you and adds the rest of the kit.`,
  ),
];
