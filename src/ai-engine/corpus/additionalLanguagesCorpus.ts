import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — more programming languages for breadth: Scala, Perl,
// Lua, Haskell, Objective-C, Assembly, MATLAB, Julia, Elixir, Clojure. Plain neutral educational
// content covering each language's defining characteristics and typical use cases.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const ADDITIONAL_LANGUAGES_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-scala-basics',
    'Scala basics',
    ['scala basics', 'scala programming language'],
    "Scala is a statically-typed language that runs on the JVM (fully interoperable with Java and its libraries) and deliberately blends object-oriented and functional programming styles in one language, rather than treating them as separate paradigms. Variable declaration mirrors Kotlin/Swift's immutable-by-default philosophy: `val name = \"Alex\"` for an immutable binding, `var age = 30` for a mutable one, with types usually inferred. Functions are first-class and Scala encourages a functional style, with immutable data structures preferred by default (`List`, `Map`, etc are immutable unless you specifically reach for the mutable collections package). Pattern matching is a particularly powerful Scala feature, extending simple switch-like matching to deconstruct complex data structures: `x match {\\n  case 0 => \"zero\"\\n  case n if n > 0 => \"positive\"\\n  case _ => \"negative\"\\n}`. Scala is the language Apache Spark, the widely used big-data processing framework, is written in, which is a major reason Scala remains common in large-scale data engineering contexts even outside typical application backend work.",
  ),
  k(
    'kb-code-perl-basics',
    'Perl basics',
    ['perl basics', 'perl programming language'],
    "Perl is a dynamically-typed scripting language, historically extremely popular for text processing, system administration scripting, and early web CGI scripts, known for terse syntax and extremely powerful, deeply integrated built-in regular expression support. Scalar variables (holding a single value — string, number, or reference) are prefixed with `$`: `my $name = \"Alex\";`. Arrays are prefixed with `@`: `my @fruits = (\"apple\", \"banana\");`, and hashes (key-value maps) with `%`: `my %ages = (\"Alex\" => 30);`. Perl's regex integration is unusually deep — matching and substitution are built directly into the language's syntax rather than requiring a separate function call: `$text =~ s/foo/bar/;` substitutes \"foo\" with \"bar\" directly in `$text`. Perl's influence is visible in how many other languages (including PHP and to some extent Ruby) borrowed or were inspired by its regex conventions. While less commonly chosen for new large-scale applications today compared to Python, Perl remains widely used in legacy systems, bioinformatics pipelines, and quick one-off text-processing scripts.",
  ),
  k(
    'kb-code-lua-basics',
    'Lua basics',
    ['lua basics', 'lua programming language', 'lua scripting'],
    "Lua is a lightweight, fast, dynamically-typed scripting language designed to be easily embedded inside larger applications written in C or C++, most famously as the scripting language behind many video games (World of Warcraft's addon system, Roblox's game logic) and configuration systems (Neovim's config, Redis scripts). Variables need no type declaration: `local name = \"Alex\"` (the `local` keyword scopes the variable to the current block; without it, a variable is global by default, a notable Lua quirk that differs from most languages where the safer/more restrictive scope is the default). Lua's single core data structure is the table, which flexibly serves as both an array (`local fruits = {\"apple\", \"banana\"}`, 1-indexed rather than 0-indexed, another notable Lua quirk) and an associative map (`local person = {name = \"Alex\", age = 30}`) simultaneously. Functions are first-class values: `local function add(a, b) return a + b end`. Lua's small footprint, fast interpreter, and simple, small C API for embedding are the main reasons it's favored for scripting inside performance-sensitive host applications rather than as a general standalone application language.",
  ),
  k(
    'kb-code-haskell-basics',
    'Haskell basics',
    ['haskell basics', 'haskell programming language', 'pure functional programming'],
    "Haskell is a purely functional, statically-typed language where functions have no side effects at all by default — a function that needs to do I/O (like printing to the screen) has that fact reflected explicitly in its type signature (wrapped in an `IO` type), keeping \"pure\" and \"impure\" code clearly and enforceably separated by the type system itself, unlike most languages where any function can silently perform I/O anywhere. Haskell is also lazily evaluated by default — expressions aren't computed until their value is actually needed, which allows working naturally with conceptually infinite data structures, like an infinite list of natural numbers, since only the portion actually consumed is ever computed. Its type system is notably strong and expressive, supporting powerful type inference (often no explicit type annotations are needed even though the language is fully statically typed) and features like type classes (similar in spirit to interfaces, but more flexible). While Haskell is used in real production systems, it's especially influential as a research and teaching language — many functional programming concepts that have since been adopted into mainstream languages (pattern matching, immutability by default, algebraic data types) were popularized or refined through Haskell.",
  ),
  k(
    'kb-code-objectivec-basics',
    'Objective-C basics',
    ['objective-c basics', 'objective c programming'],
    "Objective-C is an object-oriented language that extends C with Smalltalk-style messaging syntax, historically the primary language for Apple's iOS and macOS development before Swift was introduced in 2014 as its modern replacement (Objective-C remains present in many older or legacy Apple codebases, and Swift code can still interoperate with it). Its distinctive syntax uses square brackets for method calls (\"sending messages\" in Smalltalk terminology) rather than dot notation: `[myArray addObject:newItem];` instead of the more familiar `myArray.addObject(newItem)` seen in most other OOP languages. Method declarations use a similarly distinctive keyword-argument style: `- (void)setName:(NSString *)name age:(NSInteger)age;` embeds parameter labels directly into the method name itself. Objective-C uses manual or (since later versions) automatic reference counting (ARC) for memory management rather than a full tracing garbage collector, conceptually similar to how Swift and C++'s smart pointers manage memory, but implemented differently under the hood. Its C heritage means it also directly supports plain C code and pointers alongside its object-oriented features.",
  ),
  k(
    'kb-code-assembly-basics',
    'Assembly language basics',
    ['assembly language basics', 'what is assembly language', 'low level programming'],
    "Assembly language is the lowest-level human-readable programming language, sitting just one step above raw machine code (the binary instructions a CPU actually executes) — each assembly instruction typically corresponds to exactly one CPU instruction, unlike a high-level language line which might compile down to many machine instructions. Assembly is specific to a particular CPU architecture (x86, ARM, RISC-V each have their own distinct assembly language and instruction set), unlike most high-level languages which are portable across architectures via a compiler that handles the translation. Basic assembly operations directly manipulate CPU registers (small, extremely fast storage locations built into the processor itself) and memory: `MOV` copies a value, `ADD`/`SUB` perform arithmetic, `JMP` jumps execution to a different instruction (the low-level building block underlying loops and conditionals in higher-level languages), and `CALL`/`RET` handle function calls and returns. Very few programmers write assembly directly for everyday application work today — it's mainly reserved for operating system kernels, device drivers, embedded systems with severe resource constraints, and highly performance-critical inner loops — but understanding it helps explain what's actually happening underneath every higher-level language's abstractions.",
  ),
  k(
    'kb-code-matlab-basics',
    'MATLAB basics',
    ['matlab basics', 'matlab programming language'],
    "MATLAB (Matrix Laboratory) is a proprietary numerical computing language and environment, widely used in engineering, scientific research, and academic coursework, built fundamentally around matrix and vector operations rather than treating them as an add-on library the way most general-purpose languages do. Every MATLAB variable is, at its core, treated as a matrix — even a single number is technically a 1x1 matrix. Matrix literals use square brackets, with semicolons separating rows: `A = [1 2; 3 4];` creates a 2x2 matrix. Like R, most MATLAB operations are vectorized by default — `A * 2` multiplies every element by 2 without an explicit loop, and specific element-wise operators (`.*`, `./`) distinguish element-by-element operations from true matrix multiplication/division. MATLAB includes built-in, deeply integrated plotting and visualization functions (`plot(x, y)`), and its Simulink companion tool is widely used for simulating and modeling dynamic systems, particularly in control systems and signal processing engineering work. Its main open-source-adjacent alternative, GNU Octave, aims for close syntax compatibility for users who need similar functionality without MATLAB's commercial license cost.",
  ),
  k(
    'kb-code-julia-basics',
    'Julia basics',
    ['julia basics', 'julia programming language'],
    "Julia is a relatively modern, dynamically-typed language designed specifically to combine the ease of use and interactive feel of languages like Python with performance approaching that of compiled languages like C, aimed particularly at scientific computing, numerical analysis, and data science workloads. It achieves this largely through Just-In-Time (JIT) compilation via LLVM — Julia code is compiled to efficient native machine code right before it's first run, rather than being interpreted line by line the way CPython typically executes Python. Julia's \"multiple dispatch\" system is a defining feature: rather than a method belonging to a single class (as in traditional OOP), a function's specific behavior is chosen based on the runtime types of ALL of its arguments together, letting the same function name behave differently and efficiently depending on the full combination of argument types passed to it. Syntax is broadly similar in feel to Python and MATLAB: `function add(a, b)\\n    return a + b\\nend`. Julia has built-in, first-class support for arbitrary-precision numbers and rich native array/matrix operations, and has gained particular traction in machine learning research, climate modeling, and other performance-sensitive scientific computing domains where Python's raw execution speed can become a bottleneck.",
  ),
  k(
    'kb-code-elixir-basics',
    'Elixir basics',
    ['elixir basics', 'elixir programming language'],
    "Elixir is a dynamically-typed functional language that runs on the BEAM, the same battle-tested virtual machine originally built for Erlang, giving it Erlang's renowned strengths in building highly concurrent, fault-tolerant, distributed systems (originally developed for telecom switching systems that needed extremely high uptime). Elixir's syntax is notably more approachable and modern-feeling than Erlang's, closer in spirit to Ruby. Pattern matching, rather than simple variable assignment, is central to idiomatic Elixir: `{status, result} = some_function()` both calls the function and destructures its returned tuple in one step, and will raise an error if the actual returned shape doesn't match the expected pattern, which is often used deliberately as a lightweight form of validation. Elixir's concurrency model is built on lightweight, isolated \"processes\" (unrelated to OS processes — extremely cheap, similar in spirit to Go's goroutines) that communicate only via message-passing and share no memory directly, which is what enables the BEAM's famous fault isolation: one process crashing doesn't bring down the whole system, and supervisor processes can automatically restart failed ones. Elixir is commonly used for real-time systems, chat applications, and high-concurrency web backends via its popular Phoenix framework.",
  ),
  k(
    'kb-code-clojure-basics',
    'Clojure basics',
    ['clojure basics', 'clojure programming language', 'lisp dialect'],
    "Clojure is a modern dialect of Lisp that runs on the JVM (with variants also targeting JavaScript and .NET), emphasizing functional programming and, distinctively, immutability by default for ALL of its core data structures — lists, vectors, maps, and sets are all immutable out of the box, and \"modifying\" one always produces a new structure rather than changing the original in place, similar in philosophy to functional programming's general immutability principle but enforced much more pervasively as the language's core default. Like all Lisp dialects, Clojure code is written using deeply nested parentheses in prefix notation, where the operator comes first: `(+ 1 2 3)` evaluates to 6, and `(defn add [a b] (+ a b))` defines a function. This syntax means Clojure code is itself represented using the language's own core data structures (lists), a property called \"homoiconicity,\" which is what enables Lisp-family languages' powerful macro systems — code that generates or transforms other code at compile time using the same tools used to manipulate regular data. Clojure runs on the JVM and can call Java libraries directly, giving it access to the mature Java ecosystem while offering a radically different, functional-first programming style on top of it.",
  ),
  k(
    'kb-code-language-choice-considerations',
    'How to choose a programming language for a project',
    ['choosing a programming language', 'which language to use for a project'],
    "Choosing a programming language for a new project typically weighs several practical factors rather than one language simply being \"best\" in the abstract. Ecosystem and library support matters enormously — Python's dominance in data science and machine learning largely comes down to mature libraries (NumPy, pandas, PyTorch) rather than the language itself being uniquely suited to the task; a language with weak library support for a domain often means reinventing far more from scratch. Performance requirements matter for CPU-intensive or latency-sensitive work — a systems language like C++, Rust, or Go typically outperforms a purely interpreted language like plain Python for raw computational throughput, though Python code that leans on compiled libraries (like NumPy, which does its heavy lifting in C) can still be fast for the specific class of numeric operations those libraries support. Team familiarity and hiring pool size are practical, non-technical factors that often outweigh a language's theoretical merits — a technically 'better' but obscure language choice can slow a team down if nobody knows it well and few candidates are available who do. Finally, the existing surrounding ecosystem matters: a web frontend is realistically JavaScript/TypeScript by default (since browsers only natively execute JavaScript), and an iOS app is realistically Swift, regardless of a team's other general language preferences, simply because that's what the target platform actually runs.",
  ),
];
