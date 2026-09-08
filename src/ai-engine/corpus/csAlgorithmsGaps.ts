import { KnowledgeItem } from '../../types';

// Batch 91 (CS algorithms & data structures — batch 36 covered CS concepts).
// nexus-4b misses: "what is a pointer" answered about the smoke point of
// cooking oil; "what is amortized analysis" answered about paying off a
// mortgage; "what is a binary tree" answered about a heap; "what is O(n) vs
// O(n squared)" opened about statistical variance; "time complexity versus
// space complexity" and "array versus a linked list" and "dynamic programming"
// were web-dump / cut-off fragments; "what is quicksort" dumped a full
// TypeScript implementation; "what is a linked list cycle" just re-explained a
// plain linked list.
export const CS_ALGORITHMS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-is-a-pointer',
    title: 'What a Pointer Is (Programming)',
    category: 'Computer Science',
    keywords: [
      'what is a pointer', 'what is a pointer in programming', 'pointer stores memory address', 'dereference a pointer',
      'pointers in c and c++', 'null pointer dangling pointer', 'pointer vs reference vs value',
    ],
    content: `In programming, a pointer is a variable that holds the memory address of another value rather than the value itself — it "points to" where the data lives in memory. It has nothing to do with the smoke point of cooking oil. You "dereference" a pointer to read or change the data it points at, and you can hand a pointer to a function so the function edits the original instead of a copy. Pointers are central to low-level languages such as C and C++, where they enable: dynamic memory allocation on the heap; passing large objects efficiently (send the address, not a full copy); linked data structures like linked lists, trees and graphs, whose nodes are connected by pointers; and array access (an array name behaves as a pointer to its first element). Their hazards — dangling pointers (pointing to freed memory), null-pointer dereferences, buffer overflows and memory leaks — are why higher-level languages (Java, Python, JavaScript, C#) hide pointers behind managed "references" plus garbage collection, and why Rust uses strict compile-time ownership and borrowing rules.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-amortized-analysis',
    title: 'What Amortized Analysis Is (Algorithms)',
    category: 'Computer Science',
    keywords: [
      'what is amortized analysis', 'amortized cost per operation over a sequence', 'dynamic array append amortized o(1)',
      'aggregate accounting potential method amortized', 'why is a resize considered cheap on average', 'amortized vs average case',
    ],
    content: `In algorithm analysis, amortized analysis measures the average cost per operation across a whole sequence of operations, in cases where a few operations are expensive but the vast majority are cheap. It is a more honest measure than looking only at the single worst-case operation, and it has nothing to do with paying off a mortgage. The classic example is appending to a dynamic array (Python's list, Java's ArrayList, C++'s vector). Most appends just write into a free slot: O(1). But when the underlying array is full, it must be replaced with a larger block and every element copied over — an O(n) operation. Because the capacity is doubled on each resize, those costly copies happen rarely enough that their total cost, spread ("amortized") over all the appends, works out to O(1) per append. Three techniques prove such bounds: the aggregate method (total cost divided by number of operations), the accounting/banker's method (cheap operations bank credit that expensive ones spend), and the potential method. It is why we can say a hash table insert is "O(1) amortized" despite occasional O(n) rehashes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-binary-tree',
    title: 'What a Binary Tree Is',
    category: 'Computer Science',
    keywords: [
      'what is a binary tree', 'binary tree node left child right child', 'root leaf subtree binary tree', 'full complete balanced binary tree',
      'tree traversal in-order pre-order post-order level-order', 'binary tree vs binary search tree vs heap',
    ],
    content: `A binary tree is a hierarchical data structure in which each node has at most two children, called the left child and the right child. The single node at the top is the "root"; nodes with no children are "leaves"; the number of edges from the root to a node is its "depth," and the longest such path in the tree is its "height." Common special forms: a FULL binary tree (every node has either 0 or 2 children), a COMPLETE binary tree (every level is filled except possibly the last, which fills from the left — the shape used to store a heap in an array), and a BALANCED tree (the left and right subtrees of every node differ in height by at most a small constant, keeping operations fast). The four standard ways to visit every node: in-order (left subtree, node, right subtree — yields sorted order for a binary search tree), pre-order (node first), post-order (node last), and level-order / breadth-first (row by row). Binary trees are the basis of binary search trees, heaps, expression trees, tries and Huffman coding. (A "heap" is a specific kind of complete binary tree, not the same as a binary tree in general.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dynamic-programming',
    title: 'What Dynamic Programming Is',
    category: 'Computer Science',
    keywords: [
      'what is dynamic programming', 'overlapping subproblems optimal substructure', 'memoization top-down vs tabulation bottom-up',
      'dynamic programming fibonacci knapsack edit distance', 'why does dp turn exponential into polynomial', 'when can you use dynamic programming',
    ],
    content: `Dynamic programming (DP) is a technique for solving a problem by breaking it into smaller subproblems, solving each subproblem only once, and storing its answer so it never has to be recomputed. It applies when the problem has two properties: OVERLAPPING SUBPROBLEMS (the same smaller problems recur many times) and OPTIMAL SUBSTRUCTURE (the best answer to the whole is assembled from best answers to the parts). There are two styles. TOP-DOWN (memoization): write the natural recursion, but cache each result in a table or hash map and return the cached value on repeat calls. BOTTOM-UP (tabulation): fill a table starting from the smallest base cases and building up to the final answer, with no recursion. Classic DP problems: Fibonacci numbers, the knapsack problem, longest common subsequence, edit distance, matrix-chain multiplication, coin change, and shortest-path algorithms like Bellman-Ford and Floyd-Warshall. DP typically converts an exponential brute-force solution into a polynomial-time one by eliminating the redundant recomputation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-time-vs-space-complexity',
    title: 'Time Complexity versus Space Complexity',
    category: 'Computer Science',
    keywords: [
      'what is time complexity versus space complexity', 'big o time and memory', 'time-space tradeoff algorithm',
      'merge sort o(n) extra space heapsort o(1)', 'space complexity extra memory as function of n', 'worst case time complexity',
    ],
    content: `Time complexity describes how an algorithm's running time grows as the input size n grows, measured by counting basic operations and expressed in Big O notation — from best to worst: O(1) constant, O(log n), O(n) linear, O(n log n), O(n²) quadratic, O(2ⁿ) exponential. Space complexity describes how much EXTRA memory the algorithm needs beyond the input itself, as a function of n, in the same notation. The two often trade off against each other: you can usually make an algorithm faster by spending more memory (a precomputed lookup table, memoization, a hash set for O(1) membership checks), or use less memory at the cost of doing more work (recomputing values instead of storing them, sorting in place). For example, merge sort runs in O(n log n) time but needs O(n) extra space for merging; heapsort runs in the same O(n log n) time using only O(1) extra space. Both figures usually mean the worst case unless "average case" or "amortized" is specified.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-array-vs-linked-list',
    title: 'Array versus Linked List',
    category: 'Computer Science',
    keywords: [
      'what is an array versus a linked list', 'array contiguous memory o(1) random access', 'linked list nodes pointers o(1) insertion',
      'why is inserting in an array o(n)', 'cache performance array vs linked list', 'when to use a linked list',
    ],
    content: `An ARRAY stores its elements in one contiguous block of memory. That makes any element reachable instantly by its index (O(1) random access) and makes scanning through it fast and cache-friendly. The downsides: inserting or deleting anywhere but the end requires shifting all the later elements over (O(n)), and a fixed array can't grow without allocating a bigger block and copying everything into it. A LINKED LIST stores each element in its own "node" that also holds a pointer to the next node (and, in a doubly linked list, the previous one), so the nodes can sit anywhere in memory. Inserting or removing a node when you already hold a reference to the position is O(1) with no shifting, and the list grows one node at a time. The downsides: there is no index access — reaching the k-th element means walking k pointers (O(n)) — every node wastes memory on its pointer(s), and jumping around scattered nodes is bad for the CPU cache. Rule of thumb: arrays (or dynamic arrays like Python lists / C++ vectors) for lots of random access and iteration; linked lists for lots of insertion and deletion at positions you already have a handle on.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-quicksort',
    title: 'What Quicksort Is',
    category: 'Computer Science',
    keywords: [
      'what is quicksort', 'quicksort divide and conquer pivot partition', 'quicksort average o(n log n) worst o(n squared)',
      'quicksort in-place not stable', 'median of three pivot quicksort', 'quicksort vs merge sort',
    ],
    content: `Quicksort is a fast, in-place, comparison-based sorting algorithm that uses divide and conquer. It picks one element as the "pivot," then "partitions" the array so that every element smaller than the pivot ends up before it and every larger element after it — which places the pivot in its final sorted position — and then recursively applies the same process to the two partitions. Its average time is O(n log n), and in practice it is usually the fastest general-purpose sort because it has low constant overhead and works well with the CPU cache. Its worst case is O(n²), which happens when the pivot repeatedly turns out to be the smallest or largest element (for instance an already-sorted array with a naive "first element" pivot); this is avoided by choosing the pivot as a random element or the median of three. Quicksort uses O(log n) stack space for the recursion and is NOT "stable" (equal elements can change relative order). Merge sort guarantees O(n log n) and is stable, but needs O(n) extra memory.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-linked-list-cycle',
    title: 'What a Linked List Cycle Is',
    category: 'Computer Science',
    keywords: [
      'what is a linked list cycle', 'linked list loop next pointer points backward', 'floyds cycle detection tortoise and hare',
      'how to detect a cycle in a linked list', 'why is a linked list cycle a bug', 'circular linked list vs cycle',
    ],
    content: `A linked list cycle (or loop) occurs when some node's "next" pointer points back to a node that appeared earlier in the list, instead of moving forward or ending at null — so following the pointers goes around forever and never terminates. It is normally a bug, caused by a pointer being set incorrectly during an insertion or deletion, and it breaks any code that walks the list expecting to reach an end. The standard detection method is Floyd's cycle-detection algorithm, nicknamed "tortoise and hare": advance one pointer one node at a time and a second pointer two nodes at a time; if the fast pointer ever catches up to the slow one, there is a cycle; if the fast pointer reaches null, there is not. It runs in O(n) time and O(1) extra space, and a short extension can also find the exact node where the loop begins. (A "circular linked list" is a deliberate design where the last node points to the first — useful for round-robin scheduling — which is different from an accidental cycle.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-o-n-vs-o-n-squared',
    title: 'The Difference Between O(n) and O(n²)',
    category: 'Computer Science',
    keywords: [
      'what is the difference between o(n) and o(n squared)', 'linear vs quadratic time complexity', 'nested loop o(n squared)',
      'why does o(n squared) become unusable on large data', 'o(n) doubling input doubles time o(n squared) quadruples', 'big o comparison',
    ],
    content: `O(n) ("linear time") means the amount of work grows in direct proportion to the input size: double the input and the running time roughly doubles. Typical O(n) operations: scanning a list once, finding the maximum, a single loop over the data. O(n²) ("quadratic time") means the work grows with the square of the input size: double the input and the running time roughly quadruples. Typical O(n²) operations: comparing every element with every other element, a loop nested inside another loop, and the simple sorts (bubble, insertion, selection). The practical difference is enormous. For n = 1,000, an O(n) algorithm does about 1,000 steps while an O(n²) one does about 1,000,000. For n = 1,000,000, it is about a million steps versus about a trillion — seconds versus days. This is exactly why O(n²) sorting algorithms are avoided for large datasets and replaced by O(n log n) sorts like merge sort, quicksort or heapsort. (This is about algorithm scaling and has nothing to do with squaring numbers to compute statistical variance.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-memoization-clean',
    title: 'What Memoization Is',
    category: 'Computer Science',
    keywords: [
      'what is memoization', 'cache expensive function call results by arguments', 'memoization top-down dynamic programming',
      'memoized fibonacci o(n) instead of exponential', 'memoization vs tabulation', 'when to use memoization',
    ],
    content: `Memoization is an optimisation in which the result of an expensive function call is cached — stored the first time it is computed, keyed by the function's arguments — so that any later call with the same arguments returns the stored answer instantly instead of recomputing it. It is the "top-down" way of doing dynamic programming: you keep the natural recursive solution and add a lookup at the start of the function (check the cache; if the answer is there, return it; otherwise compute it, store it, and return it). The textbook illustration is Fibonacci: the naive recursion (fib of n equals fib of n-1 plus fib of n-2) is O(2ⁿ) because it recomputes the same values an exponential number of times, but adding a cache makes it O(n). Memoization differs from "tabulation," the bottom-up style, which iteratively fills a table from the base cases upward with no recursion. Memoization is easy to add to existing recursive code and only ever computes the subproblems actually needed, but it consumes call-stack space and the cache's memory.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-greedy-algorithm-clean',
    title: 'What a Greedy Algorithm Is',
    category: 'Computer Science',
    keywords: [
      'what is a greedy algorithm', 'greedy makes locally optimal choice at each step', 'greedy choice property optimal substructure',
      'when do greedy algorithms work', 'huffman coding kruskal prim greedy', 'greedy fails 0/1 knapsack coin change',
    ],
    content: `A greedy algorithm builds a solution one step at a time, always taking the choice that looks best right now, without reconsidering earlier choices or looking ahead. It is simple and fast, but it only produces the optimal overall answer for problems that have the "greedy choice property" (a locally optimal choice is part of some globally optimal solution) plus optimal substructure. Cases where greedy IS provably correct: Huffman coding (data compression), Kruskal's and Prim's algorithms for a minimum spanning tree, Dijkstra's shortest-path algorithm (with non-negative weights), the activity-selection / interval-scheduling problem, and making change with "canonical" coin systems like standard coins. Cases where greedy FAILS to find the optimum: the 0/1 knapsack problem (needs dynamic programming), making change with arbitrary coin denominations (e.g. coins {1, 3, 4} making 6), and the travelling salesman problem. (Euclid's GCD algorithm is often listed as an example but is really just an iterative reduction rather than a greedy optimisation.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dijkstra-algorithm',
    title: "What Dijkstra's Algorithm Is",
    category: 'Computer Science',
    keywords: [
      'what is dijkstras algorithm', 'shortest path non-negative weights graph', 'dijkstra greedy priority queue relaxation',
      'dijkstra vs bellman-ford negative weights', 'dijkstra time complexity with heap', 'gps routing dijkstra',
    ],
    content: `Dijkstra's algorithm finds the shortest path from one starting node to every other node in a weighted graph, as long as all the edge weights are non-negative (distances, times, costs). It is a greedy algorithm: it keeps a tentative shortest distance to each node (starting at 0 for the source and infinity for the rest), repeatedly picks the unvisited node with the smallest tentative distance, marks it "settled" (its shortest distance is now final), and "relaxes" its neighbours — if going through this node gives a shorter route to a neighbour, update that neighbour's tentative distance. Using a binary heap or priority queue for "pick the smallest," it runs in about O((V + E) log V) time. It is the basis of route planning in maps and navigation and a component of network routing protocols. If a graph can have negative edge weights, Dijkstra can give wrong answers and the Bellman-Ford algorithm (slower, O(V·E)) is used instead; the A* algorithm adds a heuristic to Dijkstra to reach a single target faster.`,
    createdAt: Date.now(),
  },
];
