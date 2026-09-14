import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — JVM languages (Java, Kotlin) and C#/.NET fundamentals.
// Plain neutral educational content covering OOP mechanics, generics, collections, exceptions,
// static vs instance members, LINQ, async/await, and null-safety features.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const JVM_AND_CSHARP_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-java-classes-interfaces',
    'Classes and interfaces in Java',
    ['java classes interfaces', 'java oop basics'],
    "Every piece of executable Java code lives inside a class. A class is defined with `class ClassName { }` and can contain fields (data) and methods (behavior): `class Dog {\\n    String name;\\n    void bark() { System.out.println(name + \" barks\"); }\\n}`. An interface, defined with `interface`, declares a set of method signatures that implementing classes must provide, without (traditionally) providing implementation itself: `interface Speaker { String speak(); }`, and a class commits to fulfilling it with `class Dog implements Speaker { public String speak() { return \"Woof\"; } }`. Unlike single inheritance for classes (`extends`, allowing only one direct parent class), a Java class can implement MULTIPLE interfaces, which is how Java achieves a form of multiple inheritance for behavior contracts without the ambiguity problems of full multiple class inheritance. Since Java 8, interfaces can also include `default` methods with a concrete implementation that implementing classes inherit automatically unless they choose to override it.",
  ),
  k(
    'kb-code-java-generics',
    'Generics in Java',
    ['java generics', 'java type parameters'],
    "Java generics let classes and methods operate on a type specified by the caller, checked at compile time, while avoiding the need to write duplicate code per type or resort to unsafe casting. A generic class uses a type parameter in angle brackets: `class Box<T> {\\n    private T value;\\n    void set(T value) { this.value = value; }\\n    T get() { return value; }\\n}`, then `Box<String> box = new Box<>();` creates a Box specifically holding Strings, and the compiler prevents putting an Integer into it by mistake. Before generics (pre-Java 5), containers like `ArrayList` held plain `Object` references, requiring manual casting on retrieval and offering no compile-time type safety — a wrong-type object could be added and would only fail at runtime when cast. Bounded type parameters (`<T extends Number>`) restrict a generic to only types that are (or extend) a given type, letting the generic code call methods specific to that bound. Wildcards (`List<? extends Number>`) are used when a method needs to accept a generic type without caring about its exact specific type parameter.",
  ),
  k(
    'kb-code-java-collections',
    'The Java Collections Framework',
    ['java collections', 'java arraylist hashmap', 'java list set map'],
    "Java's Collections Framework provides standard interfaces and implementations for common data structures. `List<T>` (most commonly `ArrayList`, a dynamic array) maintains insertion order and allows duplicates, indexed with `.get(i)`. `Set<T>` (most commonly `HashSet`) stores unique elements with no guaranteed order (or `LinkedHashSet` for insertion order, `TreeSet` for sorted order); adding a duplicate has no effect. `Map<K, V>` (most commonly `HashMap`) stores key-value pairs, similar to a Python dict or JS object, with `.get(key)`, `.put(key, value)`, and `.containsKey(key)`; `HashMap` gives average O(1) operations via hashing but no ordering guarantee, while `TreeMap` keeps keys sorted at the cost of O(log n) operations. All of these are generic (`List<String>`, `Map<String, Integer>`), so their element types are checked at compile time. The `Collections` utility class provides static helper methods like `Collections.sort(list)` and `Collections.unmodifiableList(list)` for creating a read-only view of a list.",
  ),
  k(
    'kb-code-java-exceptions',
    'Exception handling in Java',
    ['java try catch', 'java checked unchecked exceptions'],
    "Java exception handling uses `try`/`catch`/`finally`, similar in structure to many other languages: code that might throw goes in `try`, `catch (ExceptionType e) { }` handles a specific exception type, and `finally { }` always runs regardless of whether an exception occurred, typically for cleanup. Java uniquely distinguishes checked from unchecked exceptions. Checked exceptions (subclasses of `Exception` but not `RuntimeException`, like `IOException`) MUST be either caught or explicitly declared in a method's signature with `throws` — the compiler enforces this, forcing callers to consciously acknowledge the possibility of failure. Unchecked exceptions (subclasses of `RuntimeException`, like `NullPointerException` or `ArrayIndexOutOfBoundsException`) require no such declaration and typically represent programming bugs rather than expected, recoverable failure conditions. The `try`-with-resources syntax (`try (FileReader fr = new FileReader(\"f\")) { }`) automatically closes any resource implementing `AutoCloseable` when the block exits, similar in purpose to Python's `with` statement.",
  ),
  k(
    'kb-code-java-static-vs-instance',
    'Static vs instance members in Java',
    ['java static vs instance', 'java static keyword'],
    "In Java, a class's members (fields and methods) are either instance members (belonging to each individual object created from the class) or static members (belonging to the class itself, shared across every instance). An instance field, like `String name;` inside a class, gets its own separate storage for each object created with `new`, and is accessed through a specific object: `myDog.name`. A static field, declared with the `static` keyword (`static int count;`), exists exactly once regardless of how many instances are created, and is conventionally accessed through the class name rather than an instance: `Dog.count`. Static methods (`static void main(String[] args)`, the required entry point of every Java program) can't access instance fields or call instance methods directly, since they aren't tied to any particular object — they only have access to other static members. Static members are commonly used for utility functions that don't need object state (like `Math.max(a, b)`) and for tracking class-wide data, such as counting how many instances have been created.",
  ),
  k(
    'kb-code-java-jvm-basics',
    'JVM basics: compiling and running Java',
    ['java jvm', 'java bytecode', 'what is the jvm'],
    "Java source code (`.java` files) is compiled by `javac` not directly into native machine code, but into an intermediate format called bytecode (`.class` files), which the Java Virtual Machine (JVM) then executes. This is the source of Java's \"write once, run anywhere\" portability: the same compiled `.class` bytecode can run on any platform (Windows, macOS, Linux) that has a JVM implementation for it, without recompiling the original source. The JVM includes a Just-In-Time (JIT) compiler that translates frequently-executed bytecode into native machine code at runtime for better performance, and automatic garbage collection that reclaims memory for objects no longer referenced, so Java developers don't manually free memory the way C or C++ developers do. Other languages, including Kotlin and Scala, also compile down to JVM bytecode and can interoperate directly with Java code and libraries, since they all ultimately target the same virtual machine and bytecode format.",
  ),
  k(
    'kb-code-kotlin-basics',
    'Kotlin basics',
    ['kotlin basics', 'kotlin vs java', 'kotlin null safety'],
    "Kotlin is a modern, statically-typed language that runs on the JVM and is fully interoperable with Java, designed to be more concise and safer than Java while still using the same underlying platform and libraries. Variable declaration uses `val` for a read-only (immutable) reference, similar to Java's `final`, or `var` for a mutable one: `val name = \"Alex\"` (type is inferred; explicit type is `val name: String = \"Alex\"`). Kotlin's most distinctive feature is built-in null safety in its type system: a regular type like `String` cannot hold `null` at all (enforced at compile time), while a nullable type is explicitly marked with a question mark, `String?` — accessing a member on a nullable type requires either a null check, the safe-call operator `?.` (returns null instead of crashing if the receiver is null), or the Elvis operator `?:` for a default (`name?.length ?: 0`). This largely eliminates Java's notorious `NullPointerException` for code written in idiomatic Kotlin. Functions are declared with `fun`: `fun add(a: Int, b: Int): Int = a + b`.",
  ),
  k(
    'kb-code-csharp-basics',
    'C# basics: properties and syntax',
    ['c# basics', 'c# properties', 'c# syntax'],
    "C# is a statically-typed, object-oriented language developed by Microsoft, running on the .NET platform, and shares many syntactic and conceptual similarities with Java (both are curly-brace, class-based OOP languages compiled to an intermediate bytecode — CIL for C#/.NET, similar in spirit to JVM bytecode for Java). A distinctive C# feature is properties, which look like fields from the outside but can run custom logic on get/set: `public string Name { get; set; }` is a shorthand \"auto-property\" behaving like a plain field, while `public string Name {\\n    get { return _name; }\\n    set { _name = value.Trim(); }\\n}` shows a full property with custom logic (here, trimming whitespace on assignment) — external code still just writes `obj.Name = \"x\";` either way, unaware of which form is used internally. C# also has built-in null safety features (nullable reference types, enabled per-project, mark a type nullable with `string?`) and the null-conditional operator `?.` and null-coalescing operator `??`, functioning much like their equivalents in Kotlin and modern JavaScript.",
  ),
  k(
    'kb-code-csharp-linq',
    'LINQ basics in C#',
    ['c# linq', 'language integrated query'],
    "LINQ (Language Integrated Query) is a set of C# language features and library methods for querying and transforming collections in a declarative, SQL-like way, built directly into the language rather than being a separate library bolted on. It's available in two equivalent styles: query syntax, resembling SQL (`var adults = from p in people where p.Age >= 18 select p.Name;`), and method syntax, using extension methods with lambda expressions (`var adults = people.Where(p => p.Age >= 18).Select(p => p.Name);`) — the two compile down to the same underlying calls, and method syntax is generally more common in practice since it composes more flexibly. Common LINQ methods include `.Where()` (filter, analogous to JavaScript's `.filter()`), `.Select()` (transform/project, analogous to `.map()`), `.OrderBy()` (sort), `.GroupBy()` (group elements by a key), and `.First()`/`.FirstOrDefault()` (get the first matching element, or a default value like null if none matches). LINQ works uniformly across in-memory collections, XML, and (via LINQ-to-SQL/Entity Framework) database queries, translating the same query syntax into the appropriate underlying operation.",
  ),
  k(
    'kb-code-csharp-async',
    'async/await in C#',
    ['c# async await', 'c# task'],
    "C# async/await, which strongly influenced JavaScript's later adoption of the same keywords, lets asynchronous code (I/O, network calls, timers) be written in a linear, synchronous-looking style instead of nested callbacks. A method marked `async` and returning `Task` (or `Task<T>` for a result-bearing async method) can use `await` inside it to pause execution until an asynchronous operation completes, without blocking the calling thread while it waits: `public async Task<string> FetchDataAsync() {\\n    var response = await httpClient.GetStringAsync(url);\\n    return response;\\n}`. Calling code similarly awaits the result: `var data = await FetchDataAsync();`. Under the hood, `Task` represents a future result similar to a JavaScript Promise, and the C# compiler transforms an `async` method into a state machine that can pause and resume at each `await` point. Exceptions thrown inside an async method are captured and re-thrown when the resulting `Task` is awaited, allowing normal `try`/`catch` blocks to work around `await` expressions just as they would with synchronous code.",
  ),
  k(
    'kb-code-csharp-dotnet',
    '.NET basics',
    ['c# .net', 'dotnet basics', 'what is .net'],
    ".NET is the runtime platform and set of libraries that C# (and other languages like F# and VB.NET) compile to and run on, roughly analogous to the JVM's role for Java, but historically Windows-centric before the modern, fully cross-platform, open-source .NET (formerly branded .NET Core, now simply \".NET\" from version 5 onward) unified support for Windows, macOS, and Linux. C# source compiles to an intermediate language called CIL (Common Intermediate Language), which the .NET runtime's Just-In-Time compiler translates to native machine code at execution time, and the runtime also provides automatic garbage collection, similar in role to the JVM. The .NET Base Class Library (BCL) provides a huge standard set of functionality — collections, file I/O, networking, LINQ — comparable in scope to Java's standard library. ASP.NET Core is .NET's framework for building web applications and APIs, and NuGet is .NET's package manager (analogous to npm for JavaScript or pip for Python) for pulling in third-party libraries.",
  ),
  k(
    'kb-code-java-abstract-classes',
    'Abstract classes vs interfaces in Java',
    ['java abstract class vs interface', 'java abstract class'],
    "An abstract class in Java, declared with the `abstract` keyword, can't be instantiated directly and typically contains a mix of fully implemented methods and abstract methods (declared but with no body, which subclasses MUST implement): `abstract class Shape {\\n    abstract double area();\\n    void printArea() { System.out.println(area()); }\\n}`. A class can extend only ONE abstract (or any) class, since Java doesn't support multiple class inheritance. Interfaces, by contrast, historically contained only abstract method signatures (though modern Java allows `default` methods with implementations too), and a class can implement any number of interfaces simultaneously. The general guidance: use an abstract class when subclasses share significant common implementation and clearly represent an \"is-a\" hierarchy with shared state (fields), and use an interface to describe a capability or contract (\"can-do\") that unrelated classes might all implement independently, especially when a class needs to satisfy multiple unrelated contracts at once.",
  ),
  k(
    'kb-code-java-overloading-overriding',
    'Method overloading vs overriding in Java',
    ['java overloading vs overriding', 'java method overload override'],
    "Method overloading means defining multiple methods with the SAME name but different parameter lists (different number or types of parameters) within the same class: `void print(int x) { }` and `void print(String x) { }` are both valid overloads of `print`, and the compiler decides at COMPILE time which one to call based on the argument types at the call site. Method overriding means a subclass provides its own implementation of a method already defined in its superclass, with the EXACT same method signature, marked with `@Override` (optional but recommended, since it lets the compiler catch a typo that would otherwise silently create an unrelated overload instead of actually overriding): `class Dog extends Animal { @Override void makeSound() { System.out.println(\"Woof\"); } }`. Overriding is resolved at RUNTIME based on the actual object's type, not the reference type it's stored in — this is what enables polymorphism, where calling a method on an `Animal`-typed reference that actually points to a `Dog` object runs `Dog`'s overridden version.",
  ),
  k(
    'kb-code-kotlin-data-classes',
    'Data classes in Kotlin',
    ['kotlin data class', 'kotlin data classes'],
    "A Kotlin data class is a class specifically intended to hold data, declared with the `data` modifier: `data class User(val name: String, val age: Int)`. The compiler automatically generates several useful methods that would otherwise need to be written by hand in a plain class: a meaningful `toString()` (printing all properties, e.g. `User(name=Alex, age=30)`), a structural `equals()` and matching `hashCode()` (comparing objects by their property VALUES rather than by reference identity, unlike Java's default `Object.equals`, which compares references unless explicitly overridden), a `copy()` function for creating a modified copy of an immutable instance (`user.copy(age = 31)` returns a new User with just the age changed, leaving the original untouched), and `componentN()` functions enabling destructuring (`val (name, age) = user`). Data classes are the idiomatic Kotlin way to represent simple value/DTO-style objects, cutting out significant boilerplate compared to writing the equivalent by hand in Java.",
  ),
  k(
    'kb-code-java-equals-hashcode',
    'equals() and hashCode() in Java',
    ['java equals hashcode', 'java object equality'],
    "In Java, the `==` operator on objects (not primitives) compares reference identity — whether two variables point to the exact same object in memory — not whether the objects represent the same logical value. To compare objects by their actual content, classes override `.equals()`, and `String` and other common classes already do this (`\"hi\".equals(\"hi\")` is true even for two separately-created String objects with the same content, while `new String(\"hi\") == new String(\"hi\")` is false). Java's contract requires that any class overriding `.equals()` must ALSO override `.hashCode()` consistently — two objects considered equal by `.equals()` MUST return the same `.hashCode()` value, because hash-based collections like `HashMap` and `HashSet` use the hash code to decide which internal bucket to search, and would fail to find an \"equal\" object stored under a different hash code, breaking lookups in subtle, hard-to-debug ways. Most IDEs and modern Java (via `record` types, or Kotlin's `data class`) can auto-generate a correct, consistent pair of these methods.",
  ),
];
