import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — general software engineering concepts: version control,
// OOP pillars, functional programming, testing, debugging, design patterns, REST/JSON, regex.
// Plain neutral educational content, language-agnostic where possible.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const SOFTWARE_ENGINEERING_CONCEPTS_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-git-basics',
    'Git basics: commits, branches, and the working directory',
    ['git commit basics', 'git branches', 'git working directory'],
    "Git is a distributed version control system that tracks changes to a project's files over time. The basic workflow: you edit files in your working directory, `git add <file>` stages specific changes you want to include in the next snapshot (moving them to the \"staging area\" or \"index\"), and `git commit -m \"message\"` permanently records those staged changes as a new commit — a snapshot of the project at that point, with a unique hash identifier, an author, a timestamp, and a link back to its parent commit(s). `git status` shows what's changed and staged; `git log` shows commit history; `git diff` shows exact line-by-line changes. A branch is simply a movable pointer to a specific commit, letting you develop features in isolation from the main line of work (`git checkout -b feature-x` creates and switches to a new branch); `git checkout main` (or `git switch main`) switches back. Because Git is distributed, every clone of a repository has the FULL history locally, not just a reference to a central server, which is what enables working fully offline and having reliable backups distributed across every contributor's machine.",
  ),
  k(
    'kb-code-git-merge-rebase',
    'Git merge, rebase, and pull requests',
    ['git merge vs rebase', 'git pull request', 'git branch merging'],
    "Merging and rebasing both bring changes from one branch into another, but they do it differently and produce different history shapes. `git merge feature-x` (run while on the target branch, e.g. main) creates a new \"merge commit\" that has two parents — the tip of main and the tip of feature-x — preserving the exact history of both branches as they actually happened, including all the individual commits from feature-x, but resulting in a more tangled-looking history graph with merge commits interspersed. `git rebase main` (run while on feature-x) instead REWRITES feature-x's commits one by one on top of the current tip of main, producing a clean, linear history with no merge commit, but literally creates new commits with new hashes to replace the old ones — which is why rebasing commits that have already been pushed and shared with others is risky, since it rewrites history others may have already built on top of. A pull request (or merge request) is a platform feature (GitHub, GitLab, etc, not Git itself) that proposes merging one branch into another, providing a space for code review and discussion before the merge actually happens.",
  ),
  k(
    'kb-code-git-common-commands',
    'Common everyday Git commands',
    ['git clone push pull', 'git common commands'],
    "Beyond commit/branch/merge, a handful of Git commands cover most daily workflow needs. `git clone <url>` downloads a full copy of a remote repository, including its entire history, to your local machine. `git pull` fetches new commits from the remote and merges (or rebases, depending on configuration) them into your current local branch — essentially `git fetch` (download new commits without integrating them) followed by `git merge`. `git push` uploads your local commits to the remote repository, updating the corresponding remote branch. `git stash` temporarily shelves uncommitted changes so you can switch to a different task with a clean working directory, and `git stash pop` brings them back later. `.gitignore` is a file listing patterns for files/directories Git should never track (build artifacts, dependency folders like `node_modules`, secrets like `.env` files) — this prevents accidentally committing generated or sensitive files. `git revert <commit>` creates a NEW commit that undoes a previous commit's changes (safe for shared history), while `git reset` moves the current branch pointer backward, potentially discarding commits entirely (much riskier once pushed and shared).",
  ),
  k(
    'kb-code-oop-encapsulation',
    'Encapsulation in OOP',
    ['oop encapsulation', 'what is encapsulation'],
    "Encapsulation is the object-oriented programming principle of bundling an object's data (fields) together with the methods that operate on that data, while restricting direct outside access to the internal state — typically by marking fields `private` and exposing controlled access through `public` methods (getters/setters) instead. The core benefit is protecting an object's internal consistency: if code anywhere could directly set a field to any value, invalid states become easy to accidentally create (like a `BankAccount` whose `balance` field gets set to a negative number by external code that forgot to check for sufficient funds), whereas a controlled `withdraw(amount)` method can enforce that rule itself, in exactly one place, every time. Encapsulation also lets the internal implementation change later without breaking code that depends on the object, as long as the public interface (the methods) stays the same — external code was never relying on the internal representation's exact shape to begin with, since it was never directly exposed. This idea of \"hiding implementation details behind a stable interface\" is a recurring theme across essentially all of software design, not just OOP specifically.",
  ),
  k(
    'kb-code-oop-inheritance',
    'Inheritance in OOP',
    ['oop inheritance', 'what is inheritance programming'],
    "Inheritance lets a new class (the subclass or derived class) reuse and extend the fields and methods of an existing class (the superclass or base class), modeling an \"is-a\" relationship — a `Dog` class inheriting from an `Animal` class means every Dog IS an Animal, automatically getting Animal's shared behavior (like `eat()` or `sleep()`) without redefining it, while adding or overriding behavior specific to dogs (like `bark()`). This avoids duplicating shared logic across many related classes. Most mainstream OOP languages (Java, C#, Python) support single inheritance for classes (one direct parent only) to avoid the ambiguity problems of multiple inheritance (like the \"diamond problem,\" where two parent classes both define a conflicting method and it's unclear which one a grandchild class should inherit), though most also let a class implement multiple interfaces to achieve a more limited, safer form of multiple behavioral inheritance. Overuse of deep inheritance hierarchies is a well-known design smell — many modern style guides favor \"composition over inheritance\" (building objects out of smaller, combined pieces rather than deep is-a chains) for more flexible, less tightly coupled designs.",
  ),
  k(
    'kb-code-oop-polymorphism',
    'Polymorphism in OOP',
    ['oop polymorphism', 'what is polymorphism'],
    "Polymorphism (\"many forms\") is the OOP principle that lets code work with objects of different actual types through a shared, common interface, without needing to know the object's exact concrete type ahead of time. The classic example: a list of `Animal` objects, actually containing a mix of `Dog`, `Cat`, and `Bird` instances, can all have `.makeSound()` called on them uniformly in a single loop — each object responds with ITS OWN overridden version of the method (a dog barks, a cat meows) even though the calling code just wrote `animal.makeSound()` generically, unaware of which specific subclass each instance actually is. This works because the specific method that actually runs is resolved at RUNTIME based on the object's real type (called \"dynamic dispatch\"), not at compile time based on the variable's declared type. Polymorphism is what makes code extensible — adding a new `Fish` subclass with its own `makeSound()` implementation requires no changes at all to the existing loop code that calls `.makeSound()` on a list of animals, since it was never written to know about specific animal types in the first place.",
  ),
  k(
    'kb-code-oop-abstraction',
    'Abstraction in OOP',
    ['oop abstraction', 'what is abstraction programming'],
    "Abstraction means exposing only the essential, relevant details of something while hiding the complex implementation underneath, letting code (and the humans reading it) reason about WHAT something does without needing to understand HOW it does it internally. A car's steering wheel, pedals, and gearshift are an abstraction over an enormously complex engine and drivetrain — a driver doesn't need to understand combustion chemistry to drive. In code, calling a sort function like `list.sort()` is an abstraction over whatever specific sorting algorithm is actually running underneath; the caller only needs to know it sorts the list, not the algorithmic details. Abstract classes and interfaces are OOP's formal tools for this — they define WHAT a type of object can do (a method signature) without specifying HOW, leaving the actual implementation to concrete subclasses. Abstraction and encapsulation are closely related and often confused: encapsulation is about restricting ACCESS to internal details (a mechanism, usually via access modifiers), while abstraction is about deciding what level of DETAIL to expose in the first place (a design choice about what the interface should even look like).",
  ),
  k(
    'kb-code-functional-programming',
    'Functional programming basics: pure functions and immutability',
    ['functional programming', 'pure functions', 'immutability programming'],
    "Functional programming is a style built around composing pure functions and avoiding mutable state and side effects, as an alternative (or complement) to the object-oriented style of mutable objects with internal state. A pure function's output depends ONLY on its input arguments, with no reliance on or modification of any external state, and calling it produces no observable side effects (no writing to a file, no modifying a global variable, no network call) — given the same inputs, a pure function always returns the same output, making it easy to test and reason about in isolation. Immutability means data, once created, is never changed in place — instead of modifying an object, an operation returns a brand NEW object with the desired change, leaving the original untouched; this eliminates an entire category of bugs where one piece of code unexpectedly changes data that another piece of code still holds a reference to and depends on staying the same. Functions as first-class values (able to be passed as arguments, returned from other functions, and stored in variables, as in JavaScript, Python, and many modern languages) are what enable functional patterns like `map`/`filter`/`reduce`, letting transformations be composed declaratively rather than written as explicit step-by-step mutable loops.",
  ),
  k(
    'kb-code-unit-testing',
    'Unit testing basics',
    ['unit testing', 'what is a unit test'],
    "A unit test verifies that a single, small piece of code (typically one function or method) behaves correctly in isolation, given specific inputs. A typical unit test follows an \"arrange, act, assert\" structure: set up any needed input data and state (arrange), call the function being tested (act), then check that the actual result matches the expected result (assert), usually using an assertion function like `assertEquals(expected, actual)` from a testing framework. Tests are usually organized so each test covers one specific behavior or edge case (a normal case, an empty-input case, a negative-number case, an error case), making it immediately clear WHICH specific behavior broke when a test fails, rather than one giant test covering everything at once. When a function being tested depends on something external and unpredictable (a database, a network call, the current time), tests commonly use a \"mock\" or \"stub\" — a fake, controllable stand-in for that dependency — so the test stays fast, reliable, and isolated from external systems. A good, well-maintained test suite catches regressions (a change accidentally breaking previously-working behavior) automatically, and gives developers confidence to refactor code without fear of silently breaking something.",
  ),
  k(
    'kb-code-debugging-strategies',
    'Debugging strategies',
    ['debugging strategies', 'how to debug code', 'finding bugs'],
    "Effective debugging follows a fairly systematic process rather than randomly guessing at fixes. First, REPRODUCE the bug reliably — a bug that can't be consistently triggered is extremely hard to confirm is actually fixed later. Second, narrow down WHERE the problem is, commonly using either print/log statements at key points to see what the program's actual state is at each step, or an interactive debugger that lets you pause execution at a specific line (a \"breakpoint\") and inspect variables directly rather than guessing what they might contain. Binary-search-style narrowing is a powerful general technique: if a bug happens somewhere in a long sequence of operations, checking the state at the midpoint tells you whether to keep narrowing in the first half or the second half, similar in spirit to binary search on an array. Third, once you've formed a hypothesis about the cause, test it specifically rather than making a broad speculative change and hoping it helps — an unconfirmed \"fix\" that happens to make a symptom go away without you understanding why can mask the real bug or introduce a new one. Reading the exact error message and stack trace carefully, rather than skimming past it, is consistently one of the most underused but highest-value debugging steps.",
  ),
  k(
    'kb-code-design-pattern-singleton',
    'The Singleton design pattern',
    ['singleton pattern', 'singleton design pattern'],
    "The Singleton pattern ensures a class has exactly ONE instance throughout the entire running program, and provides a single, well-known global access point to that instance rather than letting code create new instances freely. A typical implementation makes the constructor private (or otherwise inaccessible from outside the class) and provides a static method, conventionally named `getInstance()`, that creates the single instance the first time it's called and returns that same cached instance on every subsequent call. Common legitimate use cases include a single shared configuration object, a single connection pool manager, or a single logging service, where having multiple independent instances would be wasteful or could cause inconsistent state. Singletons are also a widely criticized pattern in modern software design, because they effectively introduce global mutable state into a program (making code that depends on a singleton harder to test in isolation, since the singleton's state can leak between tests) and create hidden dependencies that aren't visible in a function's own signature — many modern codebases prefer dependency injection instead, explicitly passing a single shared instance into whatever needs it, rather than having code reach out globally to grab it.",
  ),
  k(
    'kb-code-design-pattern-factory',
    'The Factory design pattern',
    ['factory pattern', 'factory design pattern'],
    "The Factory pattern moves the logic for CREATING an object into a separate function or method, rather than calling a class's constructor directly wherever an instance is needed. Instead of `new Dog()` or `new Cat()` scattered throughout code depending on which specific type is needed, a factory function `createAnimal(type)` centralizes the decision: `if (type === \"dog\") return new Dog(); if (type === \"cat\") return new Cat();`, and calling code just asks for an animal of a given type without needing to know the specific class names or constructor details involved. This is especially useful when object creation involves nontrivial setup logic, when the exact concrete type to create depends on runtime conditions (configuration, user input, environment), or when you want calling code to depend only on a common interface/base type rather than every specific concrete class directly. It also centralizes the \"what types exist and how are they created\" decision in one place, so adding a new type (like `Bird`) requires updating just the factory rather than every scattered `new SomeClass()` call throughout the codebase.",
  ),
  k(
    'kb-code-design-pattern-observer',
    'The Observer design pattern',
    ['observer pattern', 'observer design pattern', 'pub sub pattern'],
    "The Observer pattern lets one object (the \"subject\" or \"publisher\") notify a list of other objects (\"observers\" or \"subscribers\") automatically whenever something relevant changes, without the subject needing to know any specifics about what the observers actually do in response. The subject maintains a list of currently registered observers (added via something like `subscribe(observer)` and removable via `unsubscribe(observer)`), and whenever a relevant event happens, it loops through that list calling each observer's notification method (e.g. `observer.update(data)`). This is an extremely common pattern in practice: DOM event listeners in JavaScript (`element.addEventListener(\"click\", handler)`) are a direct application of it — the button is the subject, and each registered handler function is an observer notified when a click happens. It's also the foundation of the broader \"publish-subscribe\" (pub/sub) architectural style used in many messaging systems, and of reactive UI frameworks that automatically re-render a component when its underlying data changes. The key benefit is loose coupling: the subject doesn't need to know anything about its observers beyond that they have a notification method, so observers can be added or removed freely without modifying the subject's own code.",
  ),
  k(
    'kb-code-rest-api-basics',
    'REST API basics',
    ['rest api', 'restful api basics', 'http methods api'],
    "REST (Representational State Transfer) is an architectural style for designing web APIs around resources (nouns, like \"users\" or \"orders\"), identified by URLs, and manipulated using standard HTTP methods that describe the ACTION being taken. `GET /users/5` retrieves a resource (should never modify anything — a \"safe\" method). `POST /users` creates a new resource, typically with the new data sent in the request body. `PUT /users/5` replaces an existing resource entirely with the given data; `PATCH /users/5` partially updates just specific fields. `DELETE /users/5` removes a resource. HTTP status codes communicate the outcome: 200 (OK, success), 201 (Created, typically after a successful POST), 400 (Bad Request, the client sent invalid data), 401 (Unauthorized, missing/invalid authentication), 404 (Not Found), 500 (Internal Server Error, something broke on the server side). A well-designed REST API is \"stateless,\" meaning each request contains all the information the server needs to process it, with the server not relying on remembering anything about previous requests from that same client between calls — any needed session state is typically carried in a token sent with each request instead.",
  ),
  k(
    'kb-code-json-basics',
    'JSON basics',
    ['json format basics', 'what is json'],
    "JSON (JavaScript Object Notation) is a lightweight, human-readable, text-based data format for representing structured data, and despite its name, it's language-agnostic — virtually every modern programming language has a library for reading and writing it. A JSON object is a set of key-value pairs wrapped in curly braces, with keys always as double-quoted strings: `{\"name\": \"Alex\", \"age\": 30, \"active\": true}`. A JSON array is an ordered list of values in square brackets: `[1, 2, 3]` or `[{\"id\": 1}, {\"id\": 2}]`. Allowed value types are limited to: string (double-quoted), number, boolean (`true`/`false`), `null`, object, or array — notably, JSON has no native date type (dates are typically represented as ISO 8601 strings by convention) and no way to represent functions, unlike a JavaScript object literal which technically can hold either. JSON is the dominant data format for REST API request/response bodies and for many configuration files, largely because it's simple, human-readable, and maps cleanly onto the basic data structures (objects/dicts and arrays/lists) present in almost every programming language.",
  ),
  k(
    'kb-code-regex-basics',
    'Regular expressions (regex) basics',
    ['regex basics', 'regular expressions', 'regex syntax'],
    "A regular expression (regex) is a pattern used to match, search, or replace text according to specified rules, supported (with largely similar syntax) across most programming languages. Basic building blocks: `.` matches any single character; `*` means \"zero or more of the preceding element\"; `+` means \"one or more\"; `?` means \"zero or one\" (optional); `{n,m}` means \"between n and m repetitions.\" Character classes match one character from a set: `[abc]` matches 'a', 'b', or 'c'; `[a-z]` matches any lowercase letter via a range; `[^abc]` matches anything EXCEPT those characters (negation via `^` inside brackets). Common shorthand classes: `\\d` matches any digit, `\\w` matches any word character (letters, digits, underscore), `\\s` matches any whitespace. Anchors `^` and `$` match the start and end of a string (or line, depending on mode) respectively, rather than matching any character. Parentheses `()` create a \"capture group,\" both for grouping part of a pattern together (so a quantifier like `*` can apply to the whole group) and for extracting that specific matched portion separately afterward. Regex is powerful for validation (checking an email format) and extraction, but complex regex patterns can become hard to read — a common piece of advice is to keep them as simple as the task allows and add comments explaining nontrivial ones.",
  ),
];
