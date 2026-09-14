import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — additional programming languages for breadth: Ruby,
// PHP, Swift, Dart, and R. Plain neutral educational content covering each language's core
// syntax and defining characteristics.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const OTHER_LANGUAGES_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-ruby-basics',
    'Ruby basics',
    ['ruby programming basics', 'ruby syntax'],
    "Ruby is a dynamically-typed, object-oriented scripting language known for its emphasis on programmer happiness and readable, expressive syntax — in Ruby, LITERALLY everything is an object, even integers and `nil` (Ruby's equivalent of `null`/`None`) have methods callable on them, e.g. `5.times { puts \"hi\" }`. Variables need no type declaration: `name = \"Alex\"`. Methods are defined with `def`/`end` instead of curly braces: `def greet(name)\\n  \"Hello, #{name}!\"\\nend` — note the last evaluated expression in a method is implicitly returned without needing an explicit `return`. String interpolation uses `#{}` inside double-quoted strings. Blocks (chunks of code passed to a method, written with `{ }` or `do...end`) are a distinctive Ruby feature used pervasively for iteration and callbacks: `[1,2,3].each { |n| puts n }`. Ruby is the language behind Ruby on Rails, a highly influential web framework that popularized \"convention over configuration\" and helped make Ruby widely known for rapid web application development.",
  ),
  k(
    'kb-code-ruby-blocks',
    'Ruby blocks, procs, and symbols',
    ['ruby blocks', 'ruby symbols', 'ruby procs'],
    "A Ruby block is an anonymous chunk of code attached to a method call, written either with curly braces for a single line (`[1,2,3].map { |n| n * 2 }`) or `do...end` for multiple lines — the method receiving the block can invoke it via `yield`, effectively letting the caller inject custom behavior into the method's logic. A `Proc` is a block turned into a reusable, storable object: `double = Proc.new { |n| n * 2 }`, callable later with `double.call(5)`. A Ruby symbol, written with a leading colon (`:name`), is an immutable, lightweight identifier commonly used as a hash key or method parameter name instead of a string — symbols are more memory-efficient than strings for this purpose because Ruby stores each unique symbol only once in memory, unlike strings which can create many separate objects with the same content. Symbols are ubiquitous in idiomatic Ruby, e.g. `{ name: \"Alex\", age: 30 }` uses symbol keys (`:name`, `:age`) via Ruby's shorthand hash syntax.",
  ),
  k(
    'kb-code-php-basics',
    'PHP basics',
    ['php basics', 'php syntax', 'php variables'],
    "PHP is a widely used server-side scripting language designed specifically for web development, embedded directly inside HTML files using `<?php ... ?>` tags — a PHP file can freely mix static HTML with dynamic PHP logic that runs on the server before the page is sent to the browser. Variables always start with a dollar sign: `$name = \"Alex\";` (no separate declaration keyword needed). String interpolation works inside double-quoted strings: `\"Hello, $name!\"` (single-quoted strings don't interpolate). Arrays are flexible, supporting both indexed and associative (key-value) use in the same type: `$fruits = [\"apple\", \"banana\"];` for indexed, or `$person = [\"name\" => \"Alex\", \"age\" => 30];` for associative. PHP powers a large share of the web, including WordPress (which alone runs a substantial portion of all websites) and frameworks like Laravel and Symfony. Modern PHP (7+ and 8+) added significant performance improvements and stricter optional typing compared to PHP's older, more loosely-typed reputation from earlier versions.",
  ),
  k(
    'kb-code-php-superglobals',
    'PHP superglobals and web request handling',
    ['php superglobals', 'php $_GET $_POST', 'php request handling'],
    "PHP provides built-in \"superglobal\" arrays, automatically available in every scope without needing to be passed around, for accessing data related to the current web request. `$_GET` holds URL query string parameters (e.g. `?id=5` becomes `$_GET[\"id\"]`). `$_POST` holds data submitted via an HTML form using the POST method. `$_SESSION` (after calling `session_start()`) persists data across multiple requests from the same user, commonly used for login state. `$_SERVER` holds information about the server and current request, like `$_SERVER[\"REQUEST_METHOD\"]` or `$_SERVER[\"HTTP_USER_AGENT\"]`. `$_COOKIE` reads cookies sent by the browser. Because these arrays contain raw, untrusted user input, directly using values from `$_GET`/`$_POST` in a database query or output without sanitizing/escaping them is a classic source of security vulnerabilities like SQL injection and cross-site scripting (XSS) — modern PHP code uses prepared statements (via PDO or mysqli) for database queries and functions like `htmlspecialchars()` when echoing user input back into HTML.",
  ),
  k(
    'kb-code-swift-basics',
    'Swift basics',
    ['swift basics', 'swift programming language', 'swift syntax'],
    "Swift is Apple's modern, statically-typed language for iOS, macOS, and other Apple platform development, designed as a safer, more concise replacement for Objective-C. Variables use `var` (mutable) or `let` (immutable, preferred by default when a value won't change): `let name = \"Alex\"` (type inferred) or `var age: Int = 30` (explicit type). Swift has strong built-in null safety through Optionals: a regular type like `String` can never be nil, while an optional type, written with a trailing question mark (`String?`), explicitly represents a value that might be present or might be nil, and must be \"unwrapped\" before use — either safely with `if let name = optionalName { }` (only runs the block if a value is actually present) or forcibly with `!` (crashes immediately if nil, generally discouraged except when you're certain a value exists). Functions use `func`: `func add(a: Int, b: Int) -> Int { return a + b }`. Swift compiles to native machine code (not a bytecode VM), giving it performance comparable to C/C++ for typical app workloads.",
  ),
  k(
    'kb-code-swift-optionals',
    'Optionals in Swift',
    ['swift optionals', 'swift optional binding', 'swift nil'],
    "Swift's Optional type is the language's core mechanism for representing the possible absence of a value, replacing the free-floating null pointers common in languages like Objective-C or Java that can cause crashes when unexpectedly dereferenced. An optional is declared with a trailing `?`, e.g. `var age: Int?` can hold either an `Int` or `nil`, and the type system forces explicit handling before the value can be used as a plain `Int`. Optional binding safely extracts the value: `if let unwrappedAge = age {\\n    print(unwrappedAge)\\n}` only runs the block if `age` actually has a value, automatically creating a non-optional constant inside. `guard let unwrappedAge = age else { return }` does similar unwrapping but is used for early-exit patterns, keeping the \"happy path\" code unindented in the rest of the function. Optional chaining (`person?.address?.city`) safely accesses a chain of properties, evaluating to nil overall if any link in the chain is nil, rather than crashing. Force-unwrapping with `!` (`age!`) skips all safety checks and crashes at runtime if the value is actually nil, so it's used sparingly, typically only when nil is genuinely impossible at that point.",
  ),
  k(
    'kb-code-dart-basics',
    'Dart basics',
    ['dart basics', 'dart programming language', 'dart flutter'],
    "Dart is a statically-typed language developed by Google, most widely known as the language behind Flutter, a popular cross-platform framework for building mobile, web, and desktop apps from a single codebase. Dart's syntax resembles a blend of Java, JavaScript, and C#: `var name = \"Alex\";` infers the type, or it can be explicit: `String name = \"Alex\";`. Like Swift and Kotlin, Dart has built-in null safety (enforced by default since Dart 2.12) — a type like `String` can't be null, while `String?` explicitly allows it, and the compiler requires null checks or the `!` operator before using a nullable value where a non-null one is expected. Functions: `int add(int a, int b) { return a + b; }`, or with arrow syntax for single-expression bodies: `int add(int a, int b) => a + b;`. Dart supports both classes with traditional OOP features and asynchronous programming via `Future` (similar to a Promise) and `async`/`await`, syntactically very close to how these work in JavaScript and C#.",
  ),
  k(
    'kb-code-r-basics',
    'R basics for data analysis',
    ['r programming basics', 'r language statistics'],
    "R is a language purpose-built for statistical computing and data analysis, widely used in academic research, data science, and bioinformatics. The assignment operator is traditionally `<-` (though `=` also works in most contexts): `x <- 5`. R's fundamental data structure for tabular data is the data frame, conceptually similar to a spreadsheet or a SQL table — columns can hold different types, and rows represent observations: `df <- data.frame(name = c(\"A\", \"B\"), age = c(30, 25))`. Vectors are R's basic building block for a sequence of same-typed values, created with `c()` (combine): `nums <- c(1, 2, 3)` — critically, most R operations are \"vectorized,\" meaning an operation like `nums * 2` applies elementwise to the entire vector at once without an explicit loop, which is both more concise and typically much faster than iterating manually. R has an enormous ecosystem of statistical and visualization packages via CRAN (the Comprehensive R Archive Network), most notably the \"tidyverse\" collection (including `dplyr` for data manipulation and `ggplot2` for visualization), which has become close to a de facto standard style for modern R data analysis code.",
  ),
  k(
    'kb-code-ruby-vs-python',
    'Ruby vs Python: similarities and differences',
    ['ruby vs python', 'ruby python comparison'],
    "Ruby and Python are both dynamically-typed, high-level, object-oriented scripting languages that emerged around the same era and share a lot of philosophical DNA — both prioritize readability and developer productivity over raw performance, and both are commonly used for web backends, scripting, and automation. Their syntax differs in visible ways: Python uses significant indentation (whitespace itself defines code blocks, with no `end` keyword), while Ruby uses explicit `end` keywords to close blocks, methods, and classes, similar in spirit to `}` in C-family languages, just spelled out as a word. Python emphasizes \"there should be one obvious way to do it\" (from its guiding philosophy, the Zen of Python), generally favoring explicit code, while Ruby embraces more syntactic flexibility and multiple ways to express the same idea, prioritizing what reads naturally in context (\"principle of least surprise\"). Python's ecosystem is dominant in data science, machine learning, and scientific computing (NumPy, pandas, PyTorch), while Ruby's ecosystem is most associated with web development, largely due to the influence of the Ruby on Rails framework.",
  ),
  k(
    'kb-code-php-vs-nodejs',
    'PHP vs Node.js for web backends',
    ['php vs nodejs', 'php vs node backend comparison'],
    "PHP and Node.js (JavaScript running server-side) are both extremely common choices for web application backends but differ in execution model. Traditional PHP execution is request-based and largely synchronous — a web server (like Apache or Nginx with PHP-FPM) typically spins up or reuses a process per request, runs the PHP script from top to bottom, and discards its state once the response is sent, meaning each request generally starts with a clean slate and the developer rarely has to reason about long-lived shared in-memory state (frameworks and caching layers do this deliberately when needed instead). Node.js runs a single persistent, long-lived process using JavaScript's asynchronous, non-blocking, event-loop-driven model — a single Node process can efficiently juggle many concurrent connections without blocking on I/O like a database query, but a server-side bug involving shared state can affect all subsequent requests within that same running process, unlike PHP's typically request-isolated model. Modern PHP (with tools like Swoole or long-running frameworks) can also do persistent, async-style execution, and the historical distinction has blurred somewhat, but PHP's traditional per-request model and Node's persistent event-loop model remain the classic contrast between the two.",
  ),
];
