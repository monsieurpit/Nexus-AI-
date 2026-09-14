import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — systems programming languages: C, C++, Rust, Go.
// Plain neutral educational content covering memory management, ownership, concurrency, and
// core idioms of each language.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const SYSTEMS_LANGUAGES_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-c-pointers',
    'Pointers in C',
    ['c pointers', 'c pointer basics', 'c memory address'],
    "A pointer in C is a variable that stores a memory address rather than a value directly. Declared with an asterisk, `int *p;` declares `p` as a pointer to an int. The `&` operator gets the address of a variable (`p = &x;` makes `p` point to `x`), and the `*` operator, when applied to a pointer, \"dereferences\" it — accessing the value stored at that address (`*p = 5;` sets `x` itself to 5 through the pointer). Pointers are central to C because the language doesn't pass arrays or structs by value into functions automatically the way some higher-level languages do; passing a pointer lets a function modify the caller's original data or work with large structures without copying them. A pointer that hasn't been assigned a valid address (or has been freed) is dangerous to dereference — this causes undefined behavior, commonly a crash (\"segmentation fault\"). `NULL` is the conventional value for a pointer that intentionally points to nothing, and should be checked before dereferencing.",
  ),
  k(
    'kb-code-c-memory-allocation',
    'Dynamic memory allocation in C',
    ['c malloc free', 'c dynamic memory', 'c memory leak'],
    "C requires manual memory management for data whose size isn't known at compile time or that needs to outlive the function that created it. `malloc(size)` allocates a block of `size` bytes on the heap and returns a pointer to it (or `NULL` if allocation fails), typically used as `int *arr = malloc(n * sizeof(int));` to allocate space for `n` integers. `calloc(count, size)` does similar allocation but also zero-initializes the memory. `realloc(ptr, newSize)` resizes a previously allocated block, possibly moving it. Critically, every successful `malloc`/`calloc` must eventually be paired with a call to `free(ptr)` once the memory is no longer needed — forgetting this causes a memory leak, where the program keeps consuming memory it never gives back to the OS. Using memory after calling `free` on it (a \"use-after-free\" bug) or calling `free` twice on the same pointer are both serious, common C bugs that cause undefined behavior, which is a major reason languages like Rust were designed to prevent these mistakes at compile time.",
  ),
  k(
    'kb-code-c-structs',
    'Structs in C',
    ['c struct', 'c structures'],
    "A struct in C groups multiple related variables (of possibly different types) together under one name, similar to a simple object without methods. Defined with `struct Point { int x; int y; };`, then used as `struct Point p; p.x = 3; p.y = 4;` — the dot operator accesses a member on a struct value directly. When working through a pointer to a struct, the arrow operator `->` is used instead: `struct Point *pp = &p; pp->x = 5;` is shorthand for `(*pp).x = 5`. Structs are commonly combined with `typedef` to avoid repeating the `struct` keyword: `typedef struct { int x; int y; } Point;` then lets you write just `Point p;`. Unlike classes in object-oriented languages, C structs hold only data by default — there's no built-in concept of methods attached to a struct, though function pointers stored as struct members can simulate that pattern. Structs are passed by value by default (a full copy), which is why large structs are often passed via pointer instead for efficiency.",
  ),
  k(
    'kb-code-c-headers',
    'Header files in C',
    ['c header files', 'c .h files', 'c include'],
    "C source is split into `.c` files (implementation) and `.h` header files (declarations) to let code in one file use functions/types defined in another without the compiler needing to see the full implementation at compile time. A header typically contains function prototypes (a function's signature without its body, like `int add(int a, int b);`), struct/type definitions, and constants, and is pulled into a `.c` file with `#include \"myheader.h\"` (quotes for local project headers) or `#include <stdio.h>` (angle brackets for system/standard library headers). Headers commonly use \"include guards\" (`#ifndef HEADER_H\\n#define HEADER_H\\n...\\n#endif`) to prevent the same header's contents from being processed twice if it's included (directly or indirectly) more than once in the same compilation, which would otherwise cause duplicate-definition errors. The actual compiled machine code for a function lives in its `.c` file; separate `.c` files are compiled independently into object files and then linked together into a final executable.",
  ),
  k(
    'kb-code-cpp-classes',
    'Classes in C++',
    ['c++ classes', 'c++ oop basics'],
    "C++ extends C with object-oriented features, most notably classes. A class bundles data members and member functions (methods) together: `class Dog {\\npublic:\\n    Dog(std::string n) : name(n) {}\\n    void bark() { std::cout << name << \" barks\\\\n\"; }\\nprivate:\\n    std::string name;\\n};`. Access specifiers `public`, `private`, and `protected` control which code can access a member — `public` members are usable from anywhere, `private` (the default for classes) only from within the class's own methods, and `protected` also from derived classes. The special member function with the same name as the class (`Dog(std::string n)`) is the constructor, run automatically when an object is created; a matching destructor (`~Dog()`) runs automatically when the object is destroyed, commonly used to release resources. C++ classes support inheritance (`class Puppy : public Dog {}`) and virtual functions (marked `virtual` in the base class) to enable polymorphism, where calling a method on a base-class pointer/reference actually invokes the derived class's overridden version at runtime.",
  ),
  k(
    'kb-code-cpp-references-pointers',
    'References vs pointers in C++',
    ['c++ references vs pointers', 'c++ reference'],
    "C++ adds references on top of C's pointers, and while related, they differ in important ways. A reference (`int &r = x;`) is an alias for an existing variable — once bound, it can never be reseated to refer to something else, and it can never be null, making it generally safer to use than a raw pointer for cases where you know a valid target always exists. A pointer (`int *p = &x;`) can be reassigned to point elsewhere, can be null, and requires explicit dereferencing with `*` to access the value, whereas a reference is used with the exact same syntax as the original variable (no `*` needed). References are commonly used for function parameters to avoid copying large objects while still allowing (or, with `const &`, preventing) modification of the caller's original: `void modify(int &x) { x += 1; }` changes the caller's variable directly. Pointers remain necessary for cases references can't handle: optional/nullable references, reassignable references, dynamic memory allocation, and arrays of variable size.",
  ),
  k(
    'kb-code-cpp-raii',
    'RAII in C++',
    ['c++ raii', 'resource acquisition is initialization'],
    "RAII (Resource Acquisition Is Initialization) is a core C++ idiom for managing resources — memory, file handles, network sockets, locks — by tying a resource's lifetime to an object's lifetime. A resource is acquired in a class's constructor and automatically released in its destructor, which C++ guarantees runs when the object goes out of scope, even if an exception is thrown partway through the enclosing function. This means code doesn't need explicit manual cleanup calls scattered everywhere (and can't forget one on an error path), unlike C's manual `malloc`/`free` pattern. `std::unique_ptr` and `std::shared_ptr` (from `<memory>`) are the standard library's RAII wrappers around raw pointers for heap-allocated objects — `unique_ptr` owns a resource exclusively and frees it automatically when it goes out of scope, while `shared_ptr` uses reference counting to free the resource only once the last owner is gone. `std::lock_guard` similarly wraps a mutex so it's automatically unlocked when the guard goes out of scope, preventing forgotten unlocks.",
  ),
  k(
    'kb-code-cpp-stl',
    "C++'s Standard Template Library (STL) basics",
    ['c++ stl', 'c++ vector', 'c++ standard library'],
    "The STL is C++'s standard library of generic containers, iterators, and algorithms. `std::vector<T>` is the most commonly used container — a dynamically resizable array, similar in role to a Python list or JavaScript array, supporting `.push_back(x)` to append, indexing with `[]`, and `.size()` for the current element count. `std::map<K, V>` is an ordered key-value container (typically implemented as a balanced binary tree, giving O(log n) operations), while `std::unordered_map<K, V>` is hash-table based, giving average O(1) lookups like a Python dict, at the cost of no guaranteed ordering. `std::string` provides a safer, dynamically-sized alternative to raw C-style character arrays. Algorithms in `<algorithm>` operate generically over containers via iterators — `std::sort(v.begin(), v.end())` sorts a vector, `std::find(v.begin(), v.end(), value)` searches it. Templates (C++'s generics mechanism) are what let these containers and algorithms work with any type without duplicating code per type.",
  ),
  k(
    'kb-code-cpp-templates',
    'Templates in C++',
    ['c++ templates', 'c++ generic programming'],
    "Templates let C++ functions and classes operate generically on any type, with the compiler generating a specific version for each type actually used, similar in purpose to generics in other languages. A function template: `template <typename T>\\nT maxOf(T a, T b) { return a > b ? a : b; }` can be called as `maxOf(3, 5)` (inferred as int) or `maxOf(3.5, 2.1)` (inferred as double) without writing a separate function for each type. A class template works the same way: `template <typename T>\\nclass Box { T value; };` becomes `Box<int>` or `Box<std::string>` as needed — this is exactly how STL containers like `std::vector<T>` are implemented. Because template code is essentially generated (\"instantiated\") separately for each type it's used with at compile time, template-heavy code can increase compile times and produce notoriously long, hard-to-read compiler error messages when something doesn't match, a well-known pain point that modern C++ features like \"concepts\" (C++20) aim to improve by giving templates clearer type constraints and better error messages.",
  ),
  k(
    'kb-code-rust-ownership',
    'Ownership in Rust',
    ['rust ownership', 'rust move semantics'],
    "Ownership is Rust's core mechanism for memory safety without a garbage collector, enforced entirely at compile time. Every value has exactly one \"owner\" variable at a time; when that owner goes out of scope, Rust automatically frees the value's memory — no manual `free()` and no garbage collector pauses. Assigning a heap-allocated value (like a `String`) to another variable MOVES ownership rather than copying by default: `let s1 = String::from(\"hi\"); let s2 = s1;` makes `s2` the new owner and invalidates `s1` — trying to use `s1` afterward is a compile-time error, preventing the classic bug of two variables both thinking they own (and potentially both freeing) the same memory. Simple stack-only types like integers implement the `Copy` trait instead, so assigning them does create an independent copy rather than moving. To use a value without taking ownership, Rust uses borrowing (references, `&value`), which the compiler checks to ensure you can never have a dangling reference to freed memory or simultaneously mutate a value while something else is reading it.",
  ),
  k(
    'kb-code-rust-borrowing',
    'Borrowing and lifetimes in Rust',
    ['rust borrowing', 'rust lifetimes', 'rust borrow checker'],
    "Borrowing in Rust lets code access a value without taking ownership of it, via references (`&T` for an immutable/shared reference, `&mut T` for a mutable/exclusive reference). The \"borrow checker,\" part of the Rust compiler, enforces a strict rule at compile time: for any given value, you can have EITHER any number of immutable references OR exactly one mutable reference at a time, never both simultaneously — this prevents data races and a whole class of bugs where code reads a value while something else is changing it underneath it. Lifetimes are Rust's way of tracking, at compile time, how long a reference remains valid, ensuring a reference can never outlive the data it points to (which would create a \"dangling reference\"). Most lifetimes are inferred automatically by the compiler; explicit lifetime annotations (written with an apostrophe, like `'a` in `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str`) are only needed when the compiler can't unambiguously figure out the relationship between multiple references' lifetimes on its own, most often in function signatures returning a reference.",
  ),
  k(
    'kb-code-rust-result-option',
    'Result and Option in Rust',
    ['rust result type', 'rust option type', 'rust error handling'],
    "Rust has no exceptions and no `null`; instead it uses two built-in enum types to represent absence and failure explicitly in the type system, forcing code to handle both cases rather than letting them slip through silently. `Option<T>` represents a value that might or might not be present: it's either `Some(value)` or `None`. Instead of a function possibly returning null unexpectedly, a Rust function that might not have a result returns `Option<T>`, and the caller must explicitly handle both the `Some` and `None` cases (commonly via a `match` expression, or `.unwrap()` to panic if it's `None`, generally discouraged outside quick prototypes). `Result<T, E>` represents an operation that might succeed or fail: it's either `Ok(value)` on success or `Err(error)` on failure — used pervasively in place of exceptions, e.g. file operations return `Result<File, io::Error>`. The `?` operator provides ergonomic error propagation: writing `let f = File::open(\"x\")?;` inside a function that itself returns a `Result` automatically returns the error early if `File::open` failed, otherwise unwraps the `Ok` value and continues.",
  ),
  k(
    'kb-code-rust-cargo',
    'Cargo, Rust\'s build tool and package manager',
    ['rust cargo', 'rust crates', 'rust package manager'],
    "Cargo is Rust's official build system and package manager, handling compiling code, running tests, managing dependencies, and publishing packages, roughly analogous to npm for JavaScript or pip for Python but more tightly integrated into the language's tooling. `cargo new my_project` scaffolds a new project with a standard directory layout and a `Cargo.toml` manifest file, where dependencies (called \"crates\") are declared under `[dependencies]` with a name and version, e.g. `serde = \"1.0\"`. `cargo build` compiles the project (producing a debug build by default; `cargo build --release` produces an optimized release build), `cargo run` compiles and immediately runs it, and `cargo test` runs any functions annotated `#[test]`. `Cargo.lock`, generated automatically, pins the exact resolved version of every dependency (including transitive ones) so builds are reproducible across machines. Crates.io is the central public registry where open-source Rust crates are published and from which Cargo downloads dependencies by default.",
  ),
  k(
    'kb-code-go-goroutines',
    'Goroutines in Go',
    ['go goroutines', 'golang concurrency'],
    "A goroutine is Go's lightweight unit of concurrent execution, started by simply prefixing a function call with the `go` keyword: `go doSomething()` runs `doSomething` concurrently with the rest of the program instead of blocking until it finishes. Goroutines are much cheaper than OS threads — a goroutine starts with only a few kilobytes of stack (which grows as needed) and the Go runtime multiplexes many goroutines onto a smaller number of actual OS threads, so a program can comfortably run tens of thousands of goroutines at once, whereas an equivalent number of OS threads would be far too resource-heavy. Because a goroutine's execution is independent, the `main` function returning ends the whole program immediately even if other goroutines are still running — a common beginner mistake is starting a goroutine and not waiting for it to finish before the program exits (typically fixed with a `sync.WaitGroup` or by receiving from a channel that signals completion).",
  ),
  k(
    'kb-code-go-channels',
    'Channels in Go',
    ['go channels', 'golang channels', 'go concurrency communication'],
    "A channel in Go is a typed conduit for goroutines to send and receive values safely, embodying Go's philosophy summarized as \"don't communicate by sharing memory; share memory by communicating.\" Created with `ch := make(chan int)`, values are sent with `ch <- 5` and received with `value := <-ch`. By default, channels are unbuffered, meaning a send blocks until another goroutine is ready to receive (and vice versa), which naturally synchronizes two goroutines at that point. A buffered channel (`make(chan int, 10)`) allows a limited number of sends to proceed without an immediate matching receive, up to its capacity. `close(ch)` signals that no more values will be sent, after which a `for value := range ch` loop over the channel automatically stops once all remaining buffered values are drained. The `select` statement lets a goroutine wait on multiple channel operations simultaneously, proceeding with whichever one becomes ready first, useful for timeouts and coordinating multiple concurrent operations.",
  ),
  k(
    'kb-code-go-interfaces',
    'Interfaces in Go',
    ['go interfaces', 'golang interfaces'],
    "A Go interface defines a set of method signatures without any implementation, and any type that implements all those methods automatically satisfies the interface — there's no explicit `implements` keyword like in Java; this is called structural (or \"duck\") typing. For example: `type Speaker interface { Speak() string }` — any type with a `Speak() string` method, defined anywhere, automatically counts as a `Speaker` and can be passed wherever a `Speaker` is expected. The empty interface `interface{}` (or its alias `any` in modern Go) is satisfied by every type, since it requires no methods at all, and was historically used for functions that needed to accept absolutely any value (largely superseded in typed contexts by generics, added in Go 1.18). Interfaces are central to Go's approach to polymorphism and testability — code that depends on a small interface rather than a concrete type can easily be tested with a fake/mock implementation, and packages can define interfaces describing only the methods they actually need from a dependency.",
  ),
  k(
    'kb-code-go-error-handling',
    "Go's error handling style",
    ['go error handling', 'golang errors', 'go multiple return values'],
    "Go deliberately has no exceptions for ordinary error handling (it does have `panic`/`recover`, reserved for truly exceptional, unrecoverable situations). Instead, functions that can fail simply return an additional `error` value alongside their normal result, by convention as the LAST return value: `func divide(a, b int) (int, error) { if b == 0 { return 0, errors.New(\"division by zero\") }; return a / b, nil }`. Callers are expected to check this explicitly right after the call: `result, err := divide(10, 0); if err != nil { // handle it }`. A `nil` error value means success. This makes error handling extremely visible and explicit in the code (critics call it verbose; proponents call it honest — every failure point is impossible to silently ignore), in contrast to exception-based languages where an error can propagate invisibly through many stack frames. The `fmt.Errorf` function with a `%w` verb, and the `errors.Is`/`errors.As` functions, support \"wrapping\" an underlying error with additional context while still letting calling code check what the original underlying error actually was.",
  ),
  k(
    'kb-code-go-defer',
    'The defer keyword in Go',
    ['go defer', 'golang defer keyword'],
    "The `defer` keyword in Go schedules a function call to run just before the surrounding function returns, regardless of how it returns (normally, or via a panic), making it Go's primary tool for guaranteed cleanup — closing a file, unlocking a mutex, closing a network connection. `func readFile() {\\n  f, _ := os.Open(\"data.txt\")\\n  defer f.Close()\\n  // ... use f ...\\n}` — `f.Close()` is guaranteed to run when `readFile` exits, no matter which return path is taken, without needing to remember to call it at every possible exit point. When multiple `defer` statements are used in the same function, they execute in last-in-first-out (LIFO) order — the most recently deferred call runs first. A subtlety: the deferred call's arguments are evaluated immediately when the `defer` statement runs, not when the deferred call actually executes later, though the function body itself (for deferred closures) can still reference and see later-updated variables via closure.",
  ),
  k(
    'kb-code-c-vs-cpp-vs-rust-memory',
    'Memory safety across C, C++, and Rust',
    ['c c++ rust memory safety comparison', 'manual memory management comparison'],
    "C, C++, and Rust represent three different points on the spectrum of manual vs automatic memory safety. C gives the programmer full manual control via `malloc`/`free`, with essentially zero built-in safety net — using freed memory, double-freeing, or forgetting to free at all are all possible and common bugs, entirely the programmer's responsibility to avoid. C++ adds RAII and smart pointers (`unique_ptr`, `shared_ptr`) on top of C's manual model, which, when used consistently, automate most cleanup and eliminate many leaks and use-after-free bugs, but the underlying manual model (including raw pointers) is still fully accessible, so safety depends heavily on following the language's safer idioms rather than being enforced by the compiler. Rust enforces memory safety at COMPILE time through its ownership and borrowing system — code that would leak, double-free, or use memory after it's freed generally fails to compile at all, without needing a garbage collector or runtime overhead, though this makes Rust's compiler notably stricter and its learning curve steeper than either C or C++.",
  ),
  k(
    'kb-code-c-vs-go-concurrency',
    'Threads vs goroutines',
    ['c threads vs go goroutines', 'os threads vs goroutines'],
    "Traditional OS-level threads (as used directly in C via pthreads, or in many other languages) are relatively heavyweight — each one typically reserves a fixed, comparatively large stack (often 1MB+ by default) and is scheduled by the operating system kernel, so creating thousands of them is impractical and slow due to memory use and context-switching overhead. Go's goroutines are a lighter-weight alternative managed by the Go runtime itself rather than the OS: each starts with only a few kilobytes of stack that grows dynamically as needed, and Go's runtime scheduler multiplexes many goroutines onto a much smaller pool of actual OS threads, switching between them cooperatively without kernel involvement for most operations. This lets Go programs comfortably run tens or hundreds of thousands of concurrent goroutines where an equivalent number of OS threads would exhaust system memory. The tradeoff is that goroutines are specific to the Go runtime and language, while raw OS threads are a lower-level, language-agnostic primitive available (with varying ergonomics) in essentially every systems language.",
  ),
];
