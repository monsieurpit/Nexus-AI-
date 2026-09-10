import { KnowledgeItem } from '../../types';

/**
 * PROGRAMMING_CONCEPTS_GAPS_2 — batch 232 corrections.
 * Misses: "exception vs error" answered about DNA-polymerase proofreading and
 * leap-year rules, "horizontal vs vertical scaling" answered about melody and
 * harmony, "bug vs defect" conflated Edison's 1870s usage with Grace Hopper's
 * moth, plus dismissive compiler/linker and a strong/weak-typing answer that
 * miscategorised Python.
 */
export const PROGRAMMING_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-prog2-exception-vs-error',
    title: 'Exception vs error (programming)',
    category: 'technology',
    keywords: [
      'difference between an exception and an error programming', 'recoverable exceptional condition', 'unrecoverable error',
      'try catch handling', 'Java Error versus Exception', 'runtime exception', 'panic', 'not DNA proofreading or leap years',
    ],
    content: `In programming (not biology or statistics):

An EXCEPTION is an event that disrupts the normal flow of a program but is generally EXPECTED to be possible and can be HANDLED. Examples: a file not found, a network timeout, invalid user input, dividing by zero, a null reference. Code "throws" (raises) an exception and other code "catches" it in a try/catch (try/except) block to recover, retry, log, or fail gracefully. Exceptions are a normal control-flow tool.

An ERROR, in the stricter sense, is a serious problem that a program usually should NOT try to catch or recover from — the system is in a bad state. Examples: out of memory, stack overflow, a corrupted virtual machine, an assertion failure. In Java this is explicit: Throwable splits into Exception (catch these) and Error (do not catch these); other languages use "panic"/"fatal" for the same idea.

Note the terms are used loosely: people say "runtime error" for what is technically an unhandled exception, and "error" casually for any bug. But the design intent is: exception = an anticipated abnormal situation you handle; error = a failure severe enough that continuing is pointless. Separately, a "compile error" / "syntax error" is caught by the compiler before the program ever runs, and a "logic error" is code that runs fine but produces the wrong result (a bug).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-prog2-horizontal-vs-vertical-scaling',
    title: 'Horizontal vs vertical scaling',
    category: 'technology',
    keywords: [
      'difference between horizontal and vertical scaling', 'scale out add more machines', 'scale up bigger machine',
      'distributed system load balancer', 'CPU RAM upgrade limit', 'stateless services', 'not melody and harmony',
      'sharding replicas',
    ],
    content: `Two ways to give a system more capacity to handle load (nothing to do with music or design grids).

VERTICAL scaling ("scaling UP") means making a single machine more powerful — adding CPU cores, RAM, faster disks, or moving to a bigger server / instance type. Pros: simple (no code changes, one machine to manage), and it keeps everything in one place so there is no network coordination. Cons: there is a hard ceiling (the biggest machine you can buy or rent), cost rises steeply at the top end, and it is a single point of failure — if that machine dies, everything is down, and upgrading usually means downtime.

HORIZONTAL scaling ("scaling OUT") means adding MORE machines and spreading the work across them, usually behind a load balancer. Pros: near-unlimited headroom (just add nodes), better fault tolerance (lose one node, the rest carry on), and you can scale up and down elastically with demand. Cons: the application has to be designed for it — services should be stateless (or state moved to a shared store), the database has to be replicated or sharded, and you now have distributed-systems problems (consistency, coordination, network latency).

Rule of thumb: vertical scaling is the quick fix and is fine until you hit its limits; horizontal scaling is how large, resilient systems are built, but it requires architecting for it. Cloud auto-scaling groups are horizontal scaling automated.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-prog2-bug-vs-defect',
    title: 'Bug vs defect vs fault vs failure',
    category: 'technology',
    keywords: [
      'difference between a bug and a defect', 'informal versus formal QA term', 'defect a deviation from requirements',
      'fault the code flaw', 'error the human mistake', 'failure the observed wrong behaviour', 'Edison 1870s Grace Hopper moth 1947',
    ],
    content: `In everyday use "bug" and "defect" mean the same thing: something wrong with software that makes it behave incorrectly. "Bug" is the informal, universal word; "defect" is the more formal term used in quality-assurance and standards documents, where it specifically means a deviation of the software from its requirements or specification.

Software-testing standards (ISTQB) split the idea further:
- ERROR (or "mistake"): the human action that produced the problem — a developer's wrong assumption or typo.
- DEFECT / FAULT / BUG: the resulting flaw actually sitting in the code or design.
- FAILURE: the observable event when that defect causes the running system to do the wrong thing (a crash, a wrong number, a hang). A defect that is never executed never causes a failure.

Origin of "bug": engineers, including Thomas Edison, were using "bug" for a fault in a device in the 1870s. Grace Hopper's team is famous for taping an actual MOTH found in a Harvard relay into a 1947 logbook labelled "first actual case of bug being found" — a joke that references the term already existing, not the coining of it. So the moth story popularised the word in computing but did not invent it.

Short version: bug = casual, defect = formal QA word for the same flaw, and standards distinguish the human error, the code fault, and the observed failure.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-prog2-compiler-vs-linker',
    title: 'Compiler vs linker',
    category: 'technology',
    keywords: [
      'difference between a compiler and a linker', 'compiler source to object code', 'linker combines object files and libraries',
      'resolve symbols and addresses', 'static versus dynamic linking', 'the executable', 'undefined reference linker error',
    ],
    content: `They are two consecutive stages of turning source code into a runnable program (in C/C++ and similar compiled languages).

The COMPILER takes each source file (.c, .cpp) and translates it independently into an OBJECT FILE (.o / .obj) of machine code. It checks syntax and types, applies optimisations, and produces code for the functions and variables defined in that file. Crucially, the compiler works ONE file at a time and does NOT know the final memory addresses of anything, or where functions from other files or from libraries actually live — it leaves "placeholders" (unresolved symbols).

The LINKER takes all the object files plus any libraries and combines them into a single EXECUTABLE (or a shared library). Its jobs: resolve every symbol (match each call to "printf" or "myHelper" to the actual code, whether in another object file or a library), lay out all the code and data in the final memory map and fix up the addresses, and add the startup code. If a function is called but never defined anywhere, it is the LINKER that reports it ("undefined reference to ...").

"Static linking" copies the needed library code into the executable; "dynamic linking" leaves a reference so the shared library (.dll / .so) is loaded at run time. Interpreted and JIT languages (Python, JavaScript, Java to a degree) blur or skip this separation. Short version: the compiler turns each source file into object code; the linker stitches all the object code and libraries into one runnable file and resolves the connections between them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-prog2-strong-vs-weak-typing',
    title: 'Strong vs weak typing (independent of static vs dynamic)',
    category: 'technology',
    keywords: [
      'difference between strong and weak typing', 'strong typing forbids implicit type coercion', 'weak typing allows silent conversions',
      'Python is strongly and dynamically typed', 'JavaScript is weakly typed', 'C has weak spots', 'type safety',
      'not the same as static versus dynamic',
    ],
    content: `"Strong vs weak" typing is about how much a language lets you MIX types without an explicit conversion. It is a SEPARATE axis from "static vs dynamic" (which is about WHEN types are checked — at compile time vs at run time).

STRONGLY typed: the language refuses to silently reinterpret one type as another; you must convert explicitly, or you get an error. Trying to add a number and a string, or use an object where a number is expected, fails loudly. Examples: Python, Java, C#, Rust, Haskell.

WEAKLY typed: the language performs implicit COERCIONS to make an operation work, sometimes with surprising results. Example: JavaScript, where an empty array plus an empty object gives the string "[object Object]", the string "5" minus 1 is the number 4 but the string "5" plus 1 is the string "51", and true plus 1 is 2. C is also weak in places (pointers can be cast around freely, arrays decay to pointers).

The common mistake is to lump Python in with JavaScript as "weakly typed" because both are dynamic. In fact Python is STRONGLY AND DYNAMICALLY typed: the expression "5" + 1 raises a TypeError at run time — it will not guess. JavaScript is weakly AND dynamically typed. Java is strongly and statically typed. So the four combinations all exist, and "dynamic" does not imply "weak".`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-prog2-inner-vs-outer-join',
    title: 'Inner join vs outer join (LEFT, RIGHT, FULL)',
    category: 'technology',
    keywords: [
      'difference between an inner join and an outer join', 'inner join only matching rows from both tables',
      'left outer join all rows from the left plus matches', 'right outer join', 'full outer join all rows both sides',
      'NULLs for missing matches', 'SQL joins',
    ],
    content: `A JOIN combines rows from two tables based on a matching condition (usually a key). The types differ in what they do with rows that have NO match.

INNER JOIN: returns ONLY the rows where the join condition is satisfied in BOTH tables. Rows with no match on either side are dropped. This is the most common join and the default when you just write "JOIN".

OUTER JOINs keep unmatched rows and fill the missing columns with NULL:
- LEFT (OUTER) JOIN: every row from the LEFT table, plus matching data from the right; where there is no right-side match, the right columns are NULL. Used for "give me all customers and their orders, including customers with zero orders".
- RIGHT (OUTER) JOIN: the mirror image — every row from the RIGHT table, NULLs on the left where there is no match. (Rarely used; you can swap table order and use LEFT.)
- FULL (OUTER) JOIN: every row from BOTH tables, matched up where possible, NULLs filling the gaps on either side.

Two other joins: a CROSS JOIN produces every combination of rows (Cartesian product); a SELF JOIN joins a table to itself.

Short version: inner join = intersection (matches only); outer join = keep the unmatched rows too, from the left, the right, or both.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-prog2-docker-vs-kubernetes',
    title: 'Docker vs Kubernetes',
    category: 'technology',
    keywords: [
      'difference between Docker and Kubernetes', 'Docker builds and runs containers', 'Kubernetes orchestrates containers across a cluster',
      'container runtime versus orchestrator', 'not competitors', 'pods deployments services', 'self-healing autoscaling',
    ],
    content: `They are not competitors — they solve different problems and are usually used together.

DOCKER is a platform for BUILDING and RUNNING containers. It gives you: a way to package an app and its dependencies into an image (a Dockerfile), a registry to store images (Docker Hub), and a runtime to run those images as containers on a single machine. "Docker Compose" can run a handful of related containers together on one host. Docker's scope is essentially one machine.

KUBERNETES ("k8s") is a container ORCHESTRATOR — it manages many containers across a CLUSTER of many machines. You describe the desired state (run 5 copies of this service, expose it on this port, keep it at 70% CPU), and Kubernetes continuously makes reality match: scheduling containers onto nodes, restarting crashed ones ("self-healing"), scaling up and down with load ("autoscaling"), rolling out new versions without downtime, load-balancing traffic, managing config and secrets, and handling networking and storage across the cluster. Its building blocks are Pods, Deployments, Services, etc.

The relationship: you build container images (often with Docker), and Kubernetes runs and manages them at scale on a cluster (using a container runtime — historically Docker's, now usually containerd). Docker for local dev and building; Kubernetes for running fleets of containers in production.`,
    createdAt: Date.now(),
  },
];
