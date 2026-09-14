import { KnowledgeItem } from '../../types';

// Batch 302 corpus fixes — second coding-priority batch (2026-09-14). 8/25 misses.
// Two severe wrong-domain/glitch failures: (1) "optimistic vs pessimistic locking" got
// answered as if "locking" meant the LOCKING STREET DANCE STYLE (Don Campbell, freezes/poses)
// — ironic cross-contamination from the dance corpus added in batch 300 — instead of database
// locking. (2) "vertical vs horizontal partitioning" triggered a pure Wikipedia dump about
// RCFile (Hadoop storage format) and forest plots (medical statistics), never touching
// database partitioning at all. Also two responses (big-O/big-omega, DFS/BFS) were cut off
// mid-explanation with a garbled "Fact. No debate. No notes." artifact before ever describing
// the second term — noted as a possible output-formatting glitch, not purely a corpus gap, but
// addressed with a very direct/explicit corpus entry regardless. One fully empty response
// (constructor vs method).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const CODING_SYSTEMS_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-code-vertical-vs-horizontal-partitioning',
    'Vertical partitioning vs horizontal partitioning (databases)',
    ['vertical partitioning', 'horizontal partitioning', 'difference vertical horizontal partitioning database'],
    "Vertical partitioning splits a database table by COLUMNS — different columns of the same logical table are stored in separate physical tables or even separate databases (e.g. splitting a `users` table into one table with frequently-accessed columns like name/email and another with rarely-accessed columns like a big bio/profile blob), which is useful for performance (keeping 'hot' columns compact) or for splitting sensitive data off into a more restricted store. Horizontal partitioning (often called sharding when spread across multiple database servers) splits a table by ROWS instead — each partition holds the full set of columns but only a subset of the rows, typically divided by some key (e.g. users A-M in one partition, N-Z in another, or by region/date range), which is the standard way to scale a database beyond what one server can hold or handle. The key difference: vertical partitioning divides a table by columns into narrower tables, while horizontal partitioning divides a table by rows into subsets that each keep every column.",
  ),
  k(
    'kb-gap-code-optimistic-vs-pessimistic-locking',
    'Optimistic locking vs pessimistic locking (databases/concurrency)',
    ['optimistic locking', 'pessimistic locking', 'difference optimistic pessimistic locking', 'database locking'],
    "This is about controlling concurrent access to the same data in a database or shared system — NOT the dance move. Pessimistic locking assumes conflicts are likely, so it locks a row/record the moment a transaction starts reading it with intent to update, preventing any other transaction from touching that row until the first one finishes (commits or rolls back) — this guarantees no conflicts but can hurt performance by making other transactions wait, and can even cause deadlocks if locks are taken in different orders. Optimistic locking assumes conflicts are rare, so it does NOT lock anything upfront — instead it lets multiple transactions read and prepare updates freely, then at the moment of writing it checks whether the data changed since it was read (commonly using a version number or timestamp column); if the data changed, the update is rejected and the application must retry, but if no conflict occurred it commits normally, giving much better throughput for read-heavy or low-contention workloads. The key difference: pessimistic locking blocks other transactions upfront to prevent conflicts, while optimistic locking allows concurrent access and only checks for conflicts at commit time, rejecting and retrying if something changed.",
  ),
  k(
    'kb-gap-code-mutable-vs-immutable',
    'Mutable objects vs immutable objects',
    ['mutable object', 'immutable object', 'difference mutable immutable'],
    "A mutable object can be changed after it's created — its internal state/data can be modified in place without creating a new object, and other references to that same object will see the change (e.g. a Python list or JavaScript object/array: `list.append(x)` changes the original list itself). An immutable object CANNOT be changed after it's created — any operation that looks like it 'modifies' the object actually creates and returns a brand-new object instead, leaving the original completely untouched (e.g. Python strings and tuples, JavaScript strings and numbers, or Java's `String` class — `str.upper()` in Python returns a new string, it does not alter the original string in place). Immutability is valued because it makes code safer and easier to reason about: since the object can never change unexpectedly, it can be safely shared across multiple parts of a program or multiple threads without risk of one part's changes silently affecting another's copy. The key difference: a mutable object can be changed in place after creation, while an immutable object can never be changed — any 'modification' actually produces a new object.",
  ),
  k(
    'kb-gap-code-big-o-vs-big-omega',
    'Big-O vs Big-Omega notation',
    ['Big-O notation', 'Big-Omega notation', 'difference Big-O Big-Omega', 'asymptotic notation'],
    "Big-O notation, written O(g(n)), describes an UPPER BOUND on an algorithm's growth rate — it says the algorithm's running time grows AT MOST as fast as g(n) for large inputs, which is why Big-O is used for worst-case analysis ('this algorithm takes no more than roughly n² operations'). Big-Omega notation, written Ω(g(n)), describes a LOWER BOUND instead — it says the algorithm's running time grows AT LEAST as fast as g(n), used for best-case analysis ('this algorithm takes at least roughly n operations, no matter how lucky the input is'). A third related notation, Big-Theta (Θ), is used when the upper and lower bounds match — meaning the algorithm's growth rate is tightly bounded both above and below by the same function. The key difference: Big-O gives an upper bound (worst-case, 'at most this slow'), while Big-Omega gives a lower bound (best-case, 'at least this slow') on the same algorithm's growth rate.",
  ),
  k(
    'kb-gap-code-dfs-vs-bfs-explicit',
    'Depth-first search vs breadth-first search',
    ['depth-first search', 'breadth-first search', 'DFS', 'BFS', 'difference DFS BFS'],
    "Depth-first search (DFS) explores a graph or tree by going as DEEP as possible down one path before backtracking — from the starting node it picks a neighbor, then a neighbor of that neighbor, and so on, diving all the way down one branch until it hits a dead end, and only then backs up to try the next unexplored branch; it's typically implemented with a stack (or recursion, which uses the call stack implicitly). Breadth-first search (BFS) instead explores level by level — it visits ALL of the starting node's direct neighbors first, then all of THEIR unvisited neighbors, expanding outward in concentric 'rings' from the start; it's implemented with a queue (first-in-first-out), processing nodes in the order they were discovered. A key practical consequence: BFS is guaranteed to find the SHORTEST path (fewest edges) between two nodes in an unweighted graph, since it reaches closer nodes first, while DFS makes no such guarantee — it might find a long, winding path before a short one. The key difference: DFS dives deep down one path before backtracking (stack-based), while BFS expands outward level by level (queue-based), and BFS is the one that guarantees the shortest path in an unweighted graph.",
  ),
  k(
    'kb-gap-code-foreach-vs-for-loop',
    'Foreach loop vs regular for loop',
    ['foreach loop', 'for loop', 'difference foreach for loop'],
    "A regular (indexed) for loop gives you explicit, manual control over iteration — you declare a counter variable, a condition to keep looping, and an increment step yourself (e.g. `for (let i = 0; i < arr.length; i++)`), which means you always have direct access to the index and can skip elements, iterate backwards, change the step size, or modify the collection you're iterating over. A foreach loop (like JavaScript's `for...of`, Python's `for x in list`, or Java's enhanced for loop `for (Type x : collection)`) automates that away — it hands you each ELEMENT of a collection directly, one at a time, in order, without you managing an index at all, which is simpler and less error-prone for the common case of 'just do something with every item,' but gives up the fine-grained control (no easy access to the index, no easy skipping or reversing) that a regular for loop provides. The key difference: a regular for loop manually manages an index/counter for full control, while a foreach loop automatically iterates over each element directly with simpler syntax but less flexibility.",
  ),
  k(
    'kb-gap-code-constructor-vs-method',
    'Constructor vs method',
    ['constructor', 'method', 'difference constructor method'],
    "A constructor is a special block of code that runs automatically exactly once, at the moment a new object is created (instantiated) from a class — its job is to set up the object's initial state, like assigning starting values to its fields (e.g. Java/C#'s `public ClassName(...)`, Python's `__init__`, or a plain function named after the class in JavaScript classes' `constructor(...)`). A method is a regular function defined inside a class that represents some behavior or action the object can perform, and unlike a constructor it can be called any number of times, at any point after the object already exists, whenever that behavior is needed (e.g. `car.startEngine()`). Constructors typically have no explicit return type and share the class's name (in languages like Java/C#), while methods have their own distinct name and can return a value. The key difference: a constructor runs automatically once, at object creation, to initialize its state, while a method is a regular, separately-named function that can be called repeatedly at any time to perform an action.",
  ),
  k(
    'kb-gap-code-virtual-vs-regular-function',
    'Virtual function vs regular (non-virtual) function',
    ['virtual function', 'regular function', 'non-virtual function', 'difference virtual function'],
    "In object-oriented languages like C++, Java, or C#, a regular (non-virtual) function/method is resolved at COMPILE time based on the declared (static) type of the variable calling it — if a subclass overrides that method, calling it through a base-class-typed reference or pointer will still run the BASE class's version, not the subclass's. A virtual function is explicitly marked (with the `virtual` keyword in C++/C#, or by default in Java/Python) to be resolved at RUNTIME instead, based on the object's actual (dynamic) type — calling a virtual method through a base-class reference correctly runs whichever version the actual underlying object's class defines, even if that's a subclass override; this is what enables true runtime polymorphism (e.g. a `Shape* shape = new Circle(); shape->draw();` correctly calls `Circle`'s `draw()`, not `Shape`'s, only because `draw()` was declared virtual). The key difference: a regular function call is decided at compile time based on the reference's declared type, while a virtual function call is decided at runtime based on the object's actual type, enabling proper polymorphic override behavior.",
  ),
];
