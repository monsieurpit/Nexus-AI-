import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — algorithms and data structures fundamentals. Plain
// neutral educational content covering core structures (arrays, linked lists, stacks, queues,
// hash maps, trees, graphs), sorting algorithms, Big-O notation, recursion, and search.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const ALGORITHMS_DATA_STRUCTURES_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-ds-arrays-vs-linked-lists',
    'Arrays vs linked lists',
    ['arrays vs linked lists', 'array vs linked list difference'],
    "An array stores its elements in one contiguous block of memory, which means accessing any element by its index is O(1) constant time — the exact memory location can be computed directly from the starting address and the index. However, inserting or removing an element anywhere except the very end typically requires shifting every subsequent element, making that O(n). A linked list stores elements as separate nodes scattered anywhere in memory, each node holding its value plus a pointer/reference to the next node (and, for a doubly-linked list, also the previous one). This makes insertion or removal at a known position O(1) once you're already there, since it just involves updating a couple of pointers rather than shifting anything — but it makes random access by index O(n), since you must walk the list node by node from the start (or end) to reach a given position, unlike an array's direct jump. The choice between them depends on the access pattern: frequent random access favors arrays, frequent insertion/removal (especially at the front or middle) favors linked lists.",
  ),
  k(
    'kb-code-ds-stacks-queues',
    'Stacks and queues',
    ['stack data structure', 'queue data structure', 'lifo fifo'],
    "A stack is a Last-In-First-Out (LIFO) data structure — the most recently added element is the first one removed, like a physical stack of plates where you can only add or remove from the top. Its two core operations are `push` (add to the top) and `pop` (remove and return the top element), both O(1). Stacks are used for undo functionality, tracking function call history (the \"call stack\" every program uses for function calls, including recursive ones), and parsing balanced expressions like matching parentheses. A queue is a First-In-First-Out (FIFO) structure — the first element added is the first one removed, like a line of people waiting. Its core operations are `enqueue` (add to the back) and `dequeue` (remove from the front), also both O(1) with a proper implementation. Queues are used for task scheduling, breadth-first search traversal, and any scenario processing items in the order they arrived. Both can be implemented using either an array (with some care for efficiency) or a linked list.",
  ),
  k(
    'kb-code-ds-hash-maps',
    'How hash maps work',
    ['how hash maps work', 'hash table internals', 'hash map collision'],
    "A hash map (also called a hash table, dictionary, or associative array depending on the language) stores key-value pairs and provides average O(1) lookup, insertion, and deletion — dramatically faster than searching through a list of pairs one by one. It works by passing each key through a hash function, which converts the key into a number (a \"hash code\"), then uses that number modulo the underlying array's size to decide which \"bucket\" (index in an internal array) to store the pair in. When looking up a key later, the same hash function recomputes the same bucket index, so the map can jump almost directly to the right location instead of scanning everything. Collisions happen when two different keys hash to the same bucket — handled either by \"chaining\" (each bucket holds a small list of all pairs that landed there, checked one by one when needed) or \"open addressing\" (probing for the next available slot instead). A good hash function distributes keys evenly across buckets to keep the average bucket small and lookups fast; a poor one causes many collisions and degrades performance toward O(n) in the worst case.",
  ),
  k(
    'kb-code-ds-binary-trees',
    'Binary trees and binary search trees',
    ['binary tree', 'binary search tree', 'bst'],
    "A binary tree is a hierarchical data structure where each node has at most two children, conventionally called left and right. A binary search tree (BST) adds an ordering rule: for every node, every value in its left subtree is smaller than the node's own value, and every value in its right subtree is larger. This ordering makes searching, inserting, and deleting all average O(log n), because at each step you can eliminate roughly half the remaining tree by comparing against the current node and moving left or right accordingly, similar in spirit to binary search on a sorted array. However, an unbalanced BST (e.g. built by inserting already-sorted data, which degenerates into essentially a linked list leaning entirely one direction) has worst-case O(n) operations, which is why self-balancing variants like AVL trees and red-black trees exist — they automatically restructure themselves during insertion/deletion to guarantee O(log n) even in adversarial insertion orders. Traversing a BST \"in-order\" (left subtree, then node, then right subtree) visits every value in sorted order.",
  ),
  k(
    'kb-code-ds-tries',
    'Tries (prefix trees)',
    ['trie data structure', 'prefix tree'],
    "A trie (pronounced \"try,\" from reTRIEval) is a tree-like data structure specialized for storing and searching strings, particularly efficient for prefix-based operations like autocomplete. Rather than storing an entire word in a single node, a trie represents each word as a path through the tree, where each edge corresponds to a single character — words sharing a common prefix share the same path through the tree up until they diverge, which is what makes prefix lookups fast (an autocomplete feature can find all words starting with \"pro\" by walking to the node representing \"pro\" and then exploring everything beneath it, without ever comparing full strings). Each node typically marks whether a complete word ends at that point (since \"car\" being a valid word doesn't prevent \"card\" and \"care\" from also being valid words continuing further down the same path). Looking up a word of length k takes O(k) time regardless of how many total words are stored in the trie, since it only depends on the word's own length, not the size of the whole dataset — a meaningful advantage over scanning a plain list of words.",
  ),
  k(
    'kb-code-ds-graphs-bfs-dfs',
    'Graphs and BFS/DFS traversal',
    ['graph traversal', 'breadth first search', 'depth first search', 'bfs dfs'],
    "A graph is a data structure made of nodes (vertices) connected by edges, which can be directed (one-way, like a Twitter follow) or undirected (two-way, like a Facebook friendship), and weighted (edges carry a cost/distance) or unweighted. Two fundamental traversal algorithms explore a graph starting from some node. Breadth-First Search (BFS) explores level by level — visiting all of a node's direct neighbors first, then all of THEIR unvisited neighbors, and so on — implemented using a queue, and it's the standard way to find the shortest path (fewest edges) between two nodes in an unweighted graph. Depth-First Search (DFS) instead follows one path as deep as possible before backtracking to explore alternatives — implemented using a stack, either explicitly or via recursion (recursion's own call stack IS the stack) — and it's commonly used for tasks like detecting cycles, topological sorting, or exhaustively exploring all possibilities (like solving a maze). Both algorithms need to track which nodes have already been visited to avoid infinite loops in a graph containing cycles.",
  ),
  k(
    'kb-code-sort-bubble-merge-quick',
    'Sorting algorithms: bubble, merge, and quick sort',
    ['bubble sort', 'merge sort', 'quick sort', 'sorting algorithms comparison'],
    "Bubble sort repeatedly steps through a list, comparing adjacent pairs and swapping them if they're in the wrong order, causing larger values to \"bubble\" toward the end with each full pass — simple to understand and implement, but inefficient at O(n²) time in the average and worst case, making it impractical for anything but small lists or teaching purposes. Merge sort uses a divide-and-conquer approach: it recursively splits the list in half until each piece has just one element (trivially sorted), then repeatedly merges pairs of sorted pieces back together in sorted order — this guarantees O(n log n) time in ALL cases (best, average, worst), at the cost of needing O(n) extra memory for the merging step. Quick sort also uses divide-and-conquer, but differently: it picks a \"pivot\" element, partitions the list so everything smaller than the pivot comes before it and everything larger comes after, then recursively sorts each partition — average case is O(n log n) and it's often faster in practice than merge sort due to better cache behavior and sorting in place (no extra array needed), but a poorly chosen pivot on already-sorted or adversarial data can degrade it to O(n²) worst case.",
  ),
  k(
    'kb-code-big-o-notation',
    'Big-O notation',
    ['big o notation', 'time complexity', 'algorithm complexity'],
    "Big-O notation describes how an algorithm's running time (or memory use) grows as the input size (conventionally called n) grows large, focusing on the dominant trend rather than exact operation counts, which vary by hardware and implementation details. O(1) — constant time — means the operation takes the same time regardless of input size, like accessing an array element by index. O(log n) — logarithmic — means the work needed grows very slowly as n grows, typically because the problem size is repeatedly halved, like binary search. O(n) — linear — means work grows directly proportional to input size, like scanning through a list once. O(n log n) is typical of efficient comparison-based sorting algorithms. O(n²) — quadratic — commonly arises from nested loops over the same data, like comparing every pair of elements, and becomes impractically slow for large n. O(2ⁿ) — exponential — grows explosively and is typically only feasible for very small inputs, often seen in naive recursive solutions to combinatorial problems. Big-O specifically describes worst-case growth by convention (unless stated otherwise as average-case), and ignores constant factors and lower-order terms, since those become negligible compared to the dominant term as n grows very large.",
  ),
  k(
    'kb-code-recursion',
    'Recursion',
    ['recursion programming', 'recursive function', 'base case'],
    "Recursion is when a function calls itself to solve a smaller instance of the same problem, continuing until it reaches a \"base case\" simple enough to answer directly without further recursion — without a correctly reachable base case, a recursive function calls itself forever (or until it exhausts the call stack, causing a \"stack overflow\" error). A classic example, factorial: `def factorial(n):\\n    if n <= 1:\\n        return 1  # base case\\n    return n * factorial(n - 1)  # recursive case`. Each recursive call adds a new frame to the call stack, holding that call's local variables and the point to return to, so deep recursion (thousands of levels) uses more memory than an equivalent loop and can hit a language's recursion depth limit. Recursion is a particularly natural fit for problems that are inherently self-similar or tree-shaped — traversing a file system's nested folders, walking a tree data structure, or algorithms like merge sort and many graph traversals — where the recursive structure closely mirrors the problem's own structure, often making the code shorter and clearer than an equivalent iterative version, though sometimes at a performance cost from the call-stack overhead.",
  ),
  k(
    'kb-code-binary-search',
    'Binary search',
    ['binary search algorithm', 'binary search complexity'],
    "Binary search efficiently finds a target value within a SORTED array in O(log n) time, dramatically faster than a linear scan's O(n) for large datasets. It works by repeatedly comparing the target to the middle element of the current search range: if they match, you're done; if the target is smaller, the search continues only in the left half (since everything in the right half must be even larger, given the array is sorted); if larger, it continues only in the right half — each comparison eliminates roughly half of the remaining candidates, which is exactly what produces the logarithmic time complexity. A basic implementation tracks `low` and `high` pointers bounding the current search range, computing `mid = (low + high) // 2` each iteration and narrowing the range based on the comparison, stopping either when the target is found or when `low` exceeds `high` (meaning the value isn't present). Binary search's O(log n) advantage comes with the strict requirement that the data be sorted first — if the data isn't already sorted, sorting it (typically O(n log n)) before a single binary search usually isn't worth it unless many searches will be performed on the same data afterward.",
  ),
  k(
    'kb-code-ds-sets-vs-lists',
    'When to use a set vs a list',
    ['set vs list data structure', 'when to use a set'],
    "Choosing between a set and a list (or array) as a data structure depends on what operations matter most for the task. A list preserves insertion order and allows duplicate values, with membership testing (\"is X in this collection?\") taking O(n) time since it may need to check every element in the worst case. A set enforces uniqueness (adding a duplicate has no effect) and typically doesn't preserve insertion order (though some languages offer ordered set variants), but membership testing is average O(1) since sets are usually implemented internally using a hash table, similar to a hash map but storing only keys with no associated values. This makes sets the right choice whenever the core need is fast \"have I seen this before?\" checks or removing duplicates from a collection, while lists remain the right choice when order matters, duplicates are meaningful, or you need to access elements by numeric position. A common pattern for deduplicating a list while working around a set's lack of ordering is converting to a set and back, though this loses the original order unless a language-specific ordered set structure is used instead.",
  ),
  k(
    'kb-code-ds-linked-list-types',
    'Singly vs doubly linked lists',
    ['singly linked list', 'doubly linked list', 'linked list types'],
    "A singly linked list's nodes each hold a value and a single pointer to the NEXT node only, meaning traversal is one-directional — moving backward from a given node requires restarting from the head and walking forward again, since there's no way to go directly to a \"previous\" node. A doubly linked list's nodes additionally hold a pointer to the PREVIOUS node, allowing traversal in both directions and O(1) removal of a node once you already have a reference to it (a singly linked list needs to first find the preceding node to update its `next` pointer, since deleting a node requires modifying whichever node points TO it). The tradeoff is that a doubly linked list uses more memory per node (an extra pointer) and requires slightly more bookkeeping to keep both directions' pointers consistent during insertion and deletion. Many real-world implementations, including Python's built-in `collections.deque` and Java's `LinkedList`, use a doubly linked list internally specifically to support efficient operations at both ends of the sequence.",
  ),
  k(
    'kb-code-ds-heaps',
    'Heaps and priority queues',
    ['heap data structure', 'priority queue', 'min heap max heap'],
    "A heap is a tree-based data structure satisfying the \"heap property\": in a min-heap, every parent node's value is less than or equal to both its children's values (so the smallest overall value is always at the root); a max-heap is the mirror image, with the largest value at the root. Heaps are most commonly used to implement a priority queue, a queue where elements are dequeued in order of priority (smallest-first for a min-heap) rather than strictly by arrival order like a regular FIFO queue. A heap is usually implemented internally as an array rather than an explicit tree of linked nodes, using simple index arithmetic to represent parent-child relationships (for a node at index i, its children are at indices 2i+1 and 2i+2), which is compact and cache-friendly. Both insertion and removal of the root (the min or max) run in O(log n) time, since after adding or removing an element the heap needs to \"bubble\" it up or down to restore the heap property, and the tree's height is O(log n). Heaps are the standard structure behind efficient implementations of algorithms like Dijkstra's shortest-path algorithm and heap sort.",
  ),
  k(
    'kb-code-ds-time-space-tradeoff',
    'Time-space tradeoffs in algorithm design',
    ['time space tradeoff', 'memory vs speed tradeoff algorithms'],
    "Many algorithmic optimizations trade increased memory usage for reduced running time, or vice versa, and recognizing this tradeoff is central to choosing the right approach for a given constraint. A classic example is caching/memoization: storing previously computed results (using extra memory) to avoid recomputing them, turning an exponential-time naive recursive Fibonacci implementation into a linear-time one by remembering each `fib(n)` result the first time it's computed. Another example: a hash set used purely to check \"have I seen this value before?\" while iterating through a list uses O(n) extra memory but turns an O(n²) nested-loop duplicate-check into an O(n) single pass. Conversely, some algorithms deliberately minimize memory at the cost of more computation — an \"in-place\" sorting algorithm like quicksort avoids allocating a second array (unlike merge sort) by rearranging elements within the original array, saving memory but at the cost of being less straightforward to reason about and, for quicksort specifically, not being a \"stable\" sort by default. Understanding this tradeoff is why the \"best\" algorithm often genuinely depends on whether the constraint in a given situation is more about speed or about available memory.",
  ),
];
