import { KnowledgeItem } from '../../types';

// Batch 36 (computer science, deeper) gap-fills. Strong category (~17/25). Live
// misses on nexus-4b: "what is an algorithm" -> refused ("I'VE GOT 'algorithm'
// UNDER Graph Theory AND Social Media Platforms... WHICH ONE"); "compiler vs
// interpreter" -> web dump; "bit vs byte" -> "with an 8-byte chunk you can
// represent 256 things" (should be 8-bit); "what is a server" -> conflated with
// the cloud; "what is a variable" -> "in Python... in algebra".
export const COMPUTER_SCIENCE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-is-an-algorithm',
    title: 'What an Algorithm Is',
    category: 'Computer Science',
    keywords: [
      'what is an algorithm', 'what does algorithm mean', 'algorithm definition', 'what is a sorting algorithm',
      'what makes something an algorithm', 'algorithm vs program', 'is a recipe an algorithm',
    ],
    content: `An algorithm is a finite, precise, step-by-step procedure for solving a problem or carrying out a task — given some input, it produces the correct output in a limited number of well-defined steps. A recipe or a set of assembly instructions is a good everyday analogy. A good algorithm has clear unambiguous steps, always terminates (doesn't run forever), and works for every valid input, not just one example. Classic examples: sorting a list (bubble sort, quicksort, merge sort), searching (linear search, binary search), finding the shortest route on a map (Dijkstra's algorithm), or computing a greatest common divisor (Euclid's algorithm, ~300 BC). An algorithm is the abstract idea of HOW to solve something; a program is that idea written in a specific programming language so a computer can run it. The same algorithm can be coded in any language. ("The algorithm" people talk about on social media is a recommendation algorithm — a specific one that ranks what content to show you.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compiler-vs-interpreter',
    title: 'Compiler vs Interpreter',
    category: 'Computer Science',
    keywords: [
      'what is a compiler versus an interpreter', 'compiler vs interpreter', 'what does a compiler do', 'what does an interpreter do',
      'is python compiled or interpreted', 'what is machine code', 'what is JIT compilation',
    ],
    content: `Both turn source code (the text a programmer writes) into something the machine can execute, but at different times and in different ways. A COMPILER translates the ENTIRE program ahead of time into low-level machine code (or an intermediate form), producing a standalone executable file. You run that file directly, so it starts fast and runs fast, but you have to recompile after every change, and the result is tied to a particular type of machine. Examples: C, C++, Rust, Go. An INTERPRETER reads the program and executes it a piece at a time, right now, with no separate build step — more flexible and portable, easier to debug and try things interactively, but generally slower and it needs the interpreter present to run. Examples: Python, Ruby, classic JavaScript. Many modern systems are hybrids: they compile to bytecode and then use a "just-in-time" (JIT) compiler to turn the hot parts into machine code while the program runs (Java's JVM, modern JavaScript engines, PyPy).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bit-vs-byte',
    title: 'Bit vs Byte',
    category: 'Computer Science',
    keywords: [
      'what is the difference between a bit and a byte', 'bit vs byte', 'what is a bit', 'what is a byte', 'how many bits in a byte',
      'why is a byte 8 bits', 'kilobyte vs kibibyte', 'why is my hard drive smaller than advertised',
    ],
    content: `A BIT (binary digit) is the smallest unit of digital information: a single 0 or 1, like a switch that's off or on. A BYTE is a group of 8 bits. With 1 bit you can represent 2 values; with 8 bits (1 byte) you can represent 2^8 = 256 different values — historically enough for one text character (a letter, digit or symbol), which is why the byte became the basic unit of storage. Bigger units: kilobyte, megabyte, gigabyte, terabyte. There's a long-standing ambiguity: storage manufacturers use decimal (1 kB = 1,000 bytes, 1 GB = 1,000,000,000), while operating systems have often used binary (1,024 bytes, now properly called a kibibyte, KiB). That's why a "1 TB" drive shows up as about 931 GB in your OS. Also note: network and drive speeds are usually quoted in bits per second (Mbps), files in bytes (MB), so a "100 Mbps" connection downloads at roughly 12.5 MB/s.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-variable',
    title: 'What a Variable Is (Programming)',
    category: 'Computer Science',
    keywords: [
      'what is a variable in programming', 'what is a variable', 'what does a variable do', 'variable name value type',
      'what is a constant vs a variable', 'what is variable assignment', 'what is a data type',
    ],
    content: `In programming, a variable is a named place to store a value that the program can read and change while it runs — think of it as a labelled box. It has a name (like score, userName, total), a value currently held in it, and a type (whole number, decimal, text/string, true-false boolean, list, etc.). You "assign" a value with something like score = 0, then update it later (score = score + 10). Some languages need you to declare the type up front ("statically typed": C, Java, Rust); others figure it out from the value ("dynamically typed": Python, JavaScript). A value that never changes is a constant. Variables are how programs remember and manipulate information — inputs, running totals, flags, intermediate results. The word comes from algebra, where a variable stands for an unknown or changing quantity, but a programming variable is more like a storage location than an unknown to solve for.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-server',
    title: 'What a Server Is',
    category: 'Computer Science',
    keywords: [
      'what is a server', 'what does a server do', 'client server model', 'what is a web server', 'what is a database server',
      'is a server just a computer', 'server vs client',
    ],
    content: `A server is a computer program (or the machine running it) that provides a service or resource to other programs, called clients, usually over a network. The client asks ("request"), the server answers ("response") — this is the client–server model. Types by what they serve: a web server sends web pages and files to browsers; a database server answers queries about stored data; a file server shares files; a mail server handles email; a game server runs the shared world for multiplayer games; an API server returns data to apps. A server isn't a special kind of hardware — any computer can run server software, including a laptop or a Raspberry Pi — but machines built to be servers are optimised for reliability, running 24/7, and handling many simultaneous connections, and they usually live in data centres. "The cloud" is essentially renting time on someone else's servers instead of owning your own.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-cpu',
    title: 'What a CPU Is',
    category: 'Computer Science',
    keywords: [
      'what is a cpu', 'what does the cpu do', 'central processing unit', 'what is a processor', 'what is a core',
      'what is clock speed', 'fetch decode execute cycle', 'cpu vs gpu',
    ],
    content: `The CPU (central processing unit), or "processor," is the main chip that carries out the instructions of a computer program — often called the brain of the computer. It works in a repeating "fetch–decode–execute" cycle: fetch the next instruction from memory, work out what it means, then do it (an arithmetic or logic operation, move data, or jump to another instruction), billions of times a second. Key specs: clock speed (cycles per second, in GHz) and the number of cores (independent processing units — 4 to 16 in typical consumer chips — letting it do several things truly at once). It has a small amount of ultra-fast on-chip memory (registers and L1/L2/L3 cache) to avoid waiting on the slower main RAM. A GPU, by contrast, has thousands of simpler cores for doing the same operation on lots of data at once (graphics, and now AI). The CPU plus memory plus storage plus input/output make up a computer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-database',
    title: 'What a Database Is',
    category: 'Computer Science',
    keywords: [
      'what is a database', 'what does a database do', 'what is SQL', 'relational database', 'what is a table in a database',
      'sql vs nosql', 'what is a query', 'what is a DBMS',
    ],
    content: `A database is an organised collection of data stored so it can be searched, added to, updated and retrieved efficiently and reliably by many users and programs at once. The software that manages it is a database management system (DBMS). The dominant model is RELATIONAL: data is kept in tables (like spreadsheets) with rows (records) and columns (fields), and tables link to each other by shared keys; you interact with it using SQL (Structured Query Language) — e.g. "SELECT name FROM users WHERE age > 18". Popular relational databases: PostgreSQL, MySQL, SQLite, Oracle, SQL Server. NoSQL databases (MongoDB, Redis, Cassandra) drop the strict table structure for flexibility, scale or speed — storing documents, key-value pairs, or graphs instead. Databases provide things a plain file can't: fast indexed lookups, transactions (all-or-nothing changes), concurrent access, and rules that keep the data consistent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-open-source',
    title: 'What Open Source Software Is',
    category: 'Computer Science',
    keywords: [
      'what is open source software', 'what does open source mean', 'open source vs proprietary', 'what is a software license',
      'is open source free', 'examples of open source software', 'what is FOSS',
    ],
    content: `Open source software is software whose source code — the human-readable instructions it's built from — is made publicly available under a licence that lets anyone use, read, modify and redistribute it. This contrasts with proprietary (closed source) software like Windows or Photoshop, where the code is secret and use is restricted. "Open source" is about the licence, not necessarily the price: most is free of charge, but "free" in this world means freedom (to study and change it), not just cost. Benefits: anyone can inspect it for bugs or backdoors, fix it, or fork it into a new project; it can't be discontinued by a single company. Widely used examples: the Linux kernel, Firefox, Chromium, Android's core, VLC, LibreOffice, Python, the Apache and Nginx web servers, WordPress, Blender, and Git itself. Licences range from permissive (MIT, Apache — do almost anything) to "copyleft" (GPL — derivative works must also be open source).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-oop',
    title: 'What Object-Oriented Programming Is',
    category: 'Computer Science',
    keywords: [
      'what is object oriented programming', 'what is oop', 'what is a class vs an object', 'four pillars of oop',
      'what is encapsulation inheritance polymorphism', 'oop vs functional programming', 'what is a method',
    ],
    content: `Object-oriented programming (OOP) is a way of structuring code around "objects" — bundles that keep related data (attributes) and the actions that work on that data (methods) together in one unit, modelling real-world things. A CLASS is the blueprint (e.g. "Car"), and an OBJECT is a specific instance made from it (e.g. "my red 2019 Civic"). Its four core ideas: ENCAPSULATION — hide an object's internal data and expose only a controlled interface; INHERITANCE — a new class can reuse and extend an existing one (an "ElectricCar" is a "Car" with extra bits); POLYMORPHISM — different classes can respond to the same call in their own way (calling draw() on a Circle vs a Square); ABSTRACTION — expose the essential behaviour and hide the messy detail. OOP is dominant in languages like Java, C#, C++, Python and Ruby. It's not the only style — functional programming (avoiding shared mutable state, using pure functions) and procedural programming are alternatives, and many modern codebases mix them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-data-structure',
    title: 'What a Data Structure Is',
    category: 'Computer Science',
    keywords: [
      'what is a data structure', 'what are common data structures', 'array vs linked list', 'what is a stack and a queue',
      'what is a hash table', 'what is a tree data structure', 'what is a graph data structure', 'why do data structures matter',
    ],
    content: `A data structure is a specific way of organising data in memory so that particular operations on it are fast and space-efficient. Choosing the right one for the job is a core part of good programming. Common ones: ARRAY — items in a numbered row, instant access by index, but resizing/inserting is costly. LINKED LIST — items each pointing to the next, cheap to insert/remove, but no instant indexing. STACK — last-in-first-out (undo, function call history). QUEUE — first-in-first-out (task lists, print jobs). HASH TABLE (dictionary/map) — near-instant lookup of a value by a key, the workhorse of most programs. TREE — hierarchical (file systems, a binary search tree keeps items sorted for fast search). GRAPH — nodes connected by edges (social networks, maps, dependencies). Big O notation is used to compare how each operation on a structure scales as the data grows.`,
    createdAt: Date.now(),
  },
];
