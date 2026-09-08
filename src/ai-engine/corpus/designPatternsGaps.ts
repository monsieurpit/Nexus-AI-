import { KnowledgeItem } from '../../types';

// Batch 121 (software design patterns). Base was OK (singleton, factory,
// observer, MVC, SOLID, adapter, strategy, encapsulation, framework vs
// library). Wrong-domain answers on nexus-4b: "repository pattern" -> the git
// project folder; "facade design pattern" -> architectural curtain walls and
// glass skyscrapers; "tight vs loose coupling" -> Docker/Kubernetes pods;
// "interface vs abstract class" -> the Classical music period 1750-1820.
// Web dumps: "dependency injection", "composition vs inheritance", "MVC MVP
// MVVM", "inversion of control". "DRY / WET" gave wrong definitions.
export const DESIGN_PATTERNS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-repository-pattern',
    title: 'The Repository Design Pattern',
    category: 'Software Design',
    keywords: [
      'what is the repository pattern', 'a layer between your business or domain logic and the data access code sql orm api calls your code asks the repository for domain objects as if it were an in memory collection',
      'the repository hides how objects are actually stored and fetched benefits domain logic does not depend on the database you can swap the storage or mock it in tests query logic is centralized',
      'getuserbyid findactiveorders add remove save not the git version control repository',
    ],
    content: `The Repository pattern is a design pattern that puts a mediating layer between the part of your program that holds business rules (the "domain") and the part that talks to storage (raw SQL, an ORM, a REST API, a file). Your domain code calls methods on a repository — getUserById(id), findActiveOrders(), add(order), remove(order), save() — and gets back or hands over domain objects as if the repository were just an in-memory list or set. The repository is the only place that knows the objects actually live in a Postgres table or behind an HTTP call. Benefits: the domain logic has no dependency on the database and can be unit-tested against a fake in-memory repository; all the query logic for a given entity lives in one class instead of being scattered through the codebase; and you can change the storage technology without touching business rules. It is commonly paired with the Unit of Work pattern (which tracks changes and commits them in one transaction). (This is unrelated to a "repository" in git, which just means the tracked project folder.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-facade-pattern',
    title: 'The Facade Design Pattern',
    category: 'Software Design',
    keywords: [
      'what is the facade design pattern', 'a facade provides a single simplified interface to a complex subsystem of many classes client code calls a few easy facade methods instead of coordinating a dozen internal objects in the right order',
      'it does not hide the subsystem you can still use it directly it just offers a convenient entry point for the common cases', 'example a compiler facade over the lexer parser optimizer and code generator a structural pattern reduces coupling to subsystem internals',
      'not an architectural curtain wall or a glass skyscraper facade',
    ],
    content: `The Facade pattern (a "structural" Gang of Four pattern) provides one simple, high-level interface in front of a complicated subsystem made of many interacting classes. Instead of client code having to know about a dozen internal objects and call them in exactly the right sequence, it calls a few clear methods on the facade, which does the orchestration behind the scenes. A classic example: a Compiler facade with one method, compile(sourceFile), sitting in front of a Scanner, Parser, semantic analyzer, optimizer, and code generator that must run in order and pass data between them. Another: a home-theater facade with a single watchMovie() method that turns on the projector, dims the lights, lowers the screen, powers the amplifier, and starts the player. The Facade does NOT seal off the subsystem — advanced code can still reach in and use the individual classes directly when it needs fine control; the facade just covers the common 90% of use cases and reduces how tightly the rest of the application is coupled to the subsystem's internals. (This is a coding pattern, not an architectural curtain wall.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-coupling-cohesion',
    title: 'Tight Coupling vs Loose Coupling (Software Design)',
    category: 'Software Design',
    keywords: [
      'what is tight coupling versus loose coupling', 'coupling is how much one module depends on the internal details of another tight coupling a change in one module forces changes in others modules know each others internals share data structures call concrete classes directly hard to test reuse or modify in isolation',
      'loose coupling modules interact through small stable interfaces or contracts and do not know each others implementation you can change or replace one without touching the others', 'achieved via interfaces dependency injection events messaging and the dependency inversion principle goes with high cohesion',
    ],
    content: `Coupling measures how strongly one part of a program depends on another. TIGHT coupling means modules are entangled with each other's internal details: they reference each other's concrete classes directly, reach into each other's data, assume each other's implementation, or must be changed together. Symptoms: a small change ripples into many files; you can't reuse one class without dragging half the system with it; you can't unit-test a class in isolation. LOOSE coupling means modules interact only through small, stable, well-defined interfaces (contracts), and neither knows or cares how the other is implemented — so you can rewrite, replace, or mock one without touching the others. It is achieved by programming to interfaces rather than concrete classes, dependency injection, event or message passing instead of direct calls, and applying the Dependency Inversion Principle (both sides depend on an abstraction). Loose coupling is a goal, but it must be balanced against "high cohesion" — keeping the things that genuinely belong together in one place rather than scattering a single responsibility across many loosely-coupled modules. (This is a general design idea, not specific to Docker or Kubernetes pods.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-interface-vs-abstract-class',
    title: 'Interface vs Abstract Class',
    category: 'Software Design',
    keywords: [
      'what is an interface versus an abstract class', 'both define a contract subclasses must fulfil and cannot be instantiated directly an interface declares method signatures with no implementation and traditionally no state a class can implement many interfaces it says this type can do x',
      'an abstract class can have both abstract methods no body must be overridden and concrete methods and fields with shared implementation a class can extend only one it says this type is a kind of x and shares this behaviour',
      'use an interface for a capability unrelated classes might have comparable serializable use an abstract class to share code among closely related classes java 8 default methods blur the line',
    ],
    content: `Both an interface and an abstract class define a contract that concrete classes must satisfy, and neither can be instantiated on its own. INTERFACE: traditionally just a list of method signatures with no bodies and no fields (state). A class can implement many interfaces at once, and the classes implementing a given interface need not be related to each other. An interface expresses a capability — "anything of this type can be compared / serialized / drawn / iterated." ABSTRACT CLASS: can mix abstract methods (declared, no body, must be overridden) with fully implemented concrete methods and with fields/state that subclasses inherit. In most languages a class can extend only ONE class, so an abstract class expresses "this is a kind of X and shares this common machinery with its siblings." Rule of thumb: reach for an interface when the behavior could belong to many otherwise-unrelated types, and for an abstract class when you have a family of closely related classes that should share real implementation code and a common base type. Modern languages have blurred the line — Java 8+ and C# 8+ interfaces can carry default method implementations. (This is a programming concept and has nothing to do with the Classical era of music.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dependency-injection',
    title: 'What Dependency Injection Is',
    category: 'Software Design',
    keywords: [
      'what is dependency injection', 'giving an object the things it depends on from outside passed into the constructor a setter or a method rather than the object creating them itself with new',
      'benefits the object does not need to know how to build its dependencies you can swap real implementations for mocks or stubs in tests configuration is centralized', 'constructor injection most common setter injection interface injection a di container ioc container automates wiring the graph',
      'di is one form of inversion of control related to but not the same as the dependency inversion principle',
    ],
    content: `Dependency injection (DI) is the practice of supplying an object with the other objects it needs ("its dependencies") from the outside, instead of having the object create them itself. Instead of a class writing "this.db = new PostgresConnection()" in its constructor, it declares a constructor that takes a Database parameter, and whoever creates the class passes in a database. Why it helps: the class is no longer responsible for knowing how to build (or configure, or find) its collaborators; you can pass a real database in production and a fake in-memory one in tests, so the class becomes easy to unit-test; and all the wiring decisions are gathered in one place near the program's entry point rather than hard-coded throughout. Forms: constructor injection (dependencies are passed to the constructor — the most common, because the object is always in a valid state and its needs are explicit), setter/property injection, and method injection. In large applications a "DI container" or "IoC container" (Spring, Guice, .NET's built-in one, NestJS) reads configuration and automatically constructs and wires the whole object graph. DI is a concrete technique that applies the broader principle of Inversion of Control; it is related to, but not the same as, the Dependency Inversion Principle (the "D" in SOLID), which is about depending on abstractions rather than concrete types.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inversion-of-control',
    title: 'What Inversion of Control Is',
    category: 'Software Design',
    keywords: [
      'what is inversion of control', 'normally your code is in charge and calls into libraries when it needs them with inversion of control the framework is in charge and calls your code at the right moments dont call us well call you the hollywood principle',
      'you write the pieces event handlers components plugins and register them the frameworks main loop drives everything', 'di is one specific form of ioc event driven programming callbacks template methods and web frameworks routing requests to your handlers are all ioc',
      'ioc is the main thing that distinguishes a framework from a library',
    ],
    content: `Inversion of Control (IoC) is a design principle about who is in charge of the program's overall flow. In traditional procedural code, your code is the boss: it runs top to bottom and calls into libraries whenever it needs something done. Under IoC, that relationship is flipped — a framework owns the main loop and the control flow, and IT calls YOUR code at the moments it decides are appropriate. You supply the pieces (event handlers, lifecycle callbacks, route handlers, plugin classes, template-method overrides) and register or configure them, and the framework decides when to invoke them. This is summed up as the Hollywood Principle: "Don't call us, we'll call you." Examples of IoC: GUI event handlers (the toolkit's event loop calls your onClick), a web framework routing an incoming request to your controller method, a testing framework discovering and running your test functions, and the template method pattern (the base class runs the algorithm and calls your overridden steps). Dependency injection is one specific kind of IoC — the control over creating and supplying dependencies is inverted to a container. IoC is essentially the defining difference between a framework (calls your code) and a library (your code calls it).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-composition-vs-inheritance',
    title: 'Composition vs Inheritance',
    category: 'Software Design',
    keywords: [
      'what is the difference between composition and inheritance', 'inheritance is a a subclass extends a parent class and gets its behaviour tight coupling to the parent changes to the parent ripple down deep hierarchies get brittle fragile base class',
      'composition has a a class holds instances of other classes and delegates to them more flexible you can swap the parts even at runtime and combine behaviours freely', 'favor composition over inheritance from the gang of four prefer composition unless there is a genuine is a relationship and you need polymorphism through the base type',
    ],
    content: `Both are ways to build complex types out of simpler ones, expressing different relationships. INHERITANCE models an "is-a" relationship: a Dog class extends an Animal class and automatically gets all of Animal's fields and methods, and a Dog can be used anywhere an Animal is expected. The downsides: the subclass is tightly bound to the parent's implementation, so a change to the parent can silently break every subclass (the "fragile base class" problem); behavior is fixed at compile time; deep inheritance trees become hard to reason about; and most languages only allow inheriting from one class. COMPOSITION models a "has-a" relationship: a Car class holds an Engine object, a Transmission object, and four Wheel objects, and delegates work to them. This is more flexible — you can swap the engine for an electric one, even at runtime; you can mix and match components freely; the parts can be tested in isolation; and you only expose what you choose to. The widely quoted guideline from the "Design Patterns" book is "favor composition over inheritance" — use inheritance only when there is a true is-a relationship AND you specifically need polymorphism through the base type, and reach for composition (often with interfaces) the rest of the time.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dry-wet-principle',
    title: 'The DRY Principle and the WET Anti-Pattern',
    category: 'Software Design',
    keywords: [
      'what is the dry principle and the wet anti-pattern', 'dry dont repeat yourself every piece of knowledge or logic should have a single authoritative representation in the codebase if you copy paste a calculation into five places a change or bug fix has to be made five times',
      'wet write everything twice or we enjoy typing the anti pattern of duplicated code', 'caveat dry is about not duplicating knowledge not code that merely looks similar over aggressive dry hasty abstraction couples things that should be independent a little copying is better than a little dependency rule of three',
    ],
    content: `DRY stands for "Don't Repeat Yourself," a principle from the book "The Pragmatic Programmer": every distinct piece of knowledge or logic in a system should have one single, authoritative place where it lives. If the rule for computing a discount, or the format of a date, or a validation check is copy-pasted into several files, then every future change or bug fix must be made in every copy — and sooner or later one gets missed, and the copies drift apart. The fix is to extract the shared logic into one function, class, constant, or configuration and have everyone call it. WET is the joking name for the opposite — "Write Everything Twice," or "We Enjoy Typing," or "Waste Everyone's Time" — code with rampant duplication. Two important caveats: DRY is about not duplicating KNOWLEDGE, not about eliminating every chunk of code that happens to look similar; two pieces of code that are identical today but represent genuinely separate concepts will need to change independently, and forcing them to share an abstraction couples them harmfully ("a little copying is better than a little dependency"). This is why many developers follow the "rule of three": tolerate the first duplication, notice the second, and only refactor to remove it on the third occurrence, when the real pattern is clear. (DRY is a distinct idea from the Single Responsibility Principle, which is about a class having one reason to change.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mvc-mvp-mvvm',
    title: 'MVC vs MVP vs MVVM',
    category: 'Software Design',
    keywords: [
      'what is the difference between mvc mvp and mvvm', 'all three separate the ui view from the data and logic model differing in the middle piece',
      'mvc the controller handles input and updates the model the view observes the model and redraws the view and model can talk', 'mvp model view presenter the view is passive and dumb forwards all events to the presenter which holds all presentation logic and updates the view through an interface easy to unit test',
      'mvvm model view viewmodel the view binds declaratively data binding to a viewmodel that exposes observable properties and commands the view updates automatically wpf android jetpack vue',
    ],
    content: `MVC, MVP, and MVVM are three UI architecture patterns that all separate the visual layer (View) from the data and business rules (Model). They differ in the piece in the middle. MVC (Model-View-Controller): the Controller receives user input, decides what to do, and updates the Model; the View reads from the Model (often observing it) and renders itself. The View and Model may know about each other. This is the classic web-framework arrangement (Rails, Django, ASP.NET MVC). MVP (Model-View-Presenter): the View is made "passive" and dumb — it just displays what it's told and forwards every button press or keystroke straight to the Presenter. The Presenter contains ALL the presentation logic and pushes updates back to the View through a narrow View interface. Because the View is trivial and behind an interface, the Presenter is very easy to unit-test with a mock View. Common in older Android and WinForms code. MVVM (Model-View-ViewModel): the View is connected to a ViewModel by declarative "data binding" — the ViewModel exposes observable properties and command objects, and the framework automatically keeps the View's controls in sync with them, so there is little or no manual "update the label" code. Dominant in WPF, Xamarin, modern Android (Jetpack + LiveData/StateFlow), Vue, Angular, and Knockout.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-design-pattern-origin',
    title: 'What a Design Pattern Is and Where the Concept Came From',
    category: 'Software Design',
    keywords: [
      'what is a design pattern and where did the concept come from', 'a named documented solution to a recurring design problem in a context not copy paste code',
      'the concept comes from architect christopher alexander 1977 book a pattern language about buildings and towns brought to software by the gang of four gamma helm johnson vlissides 1994 book design patterns elements of reusable object oriented software',
      'the book catalogued 23 patterns in three groups creational singleton factory builder structural adapter decorator facade behavioral observer strategy command',
    ],
    content: `A design pattern is a named, well-documented, reusable solution to a problem that keeps coming up when designing software — a template for how to structure classes and objects to solve that problem, not a snippet of code you paste in. Each pattern is usually described with a name, the problem/context it addresses, the general solution (participants and how they collaborate), and the consequences and trade-offs. The idea was borrowed from architecture: Christopher Alexander's 1977 book "A Pattern Language" described recurring good solutions in the design of buildings and towns as named patterns. It was brought into software in 1994 by the "Gang of Four" — Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides — in "Design Patterns: Elements of Reusable Object-Oriented Software," which catalogued 23 patterns for object-oriented systems in three categories: CREATIONAL (how objects get made — Singleton, Factory Method, Abstract Factory, Builder, Prototype), STRUCTURAL (how objects are composed — Adapter, Decorator, Facade, Composite, Proxy, Bridge, Flyweight), and BEHAVIORAL (how objects communicate and share responsibility — Observer, Strategy, Command, State, Template Method, Iterator, Chain of Responsibility, Visitor, Mediator, Memento). Patterns give developers a shared vocabulary ("let's put a Facade in front of that") and encode hard-won design experience, though overusing them adds needless complexity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-observer-vs-pubsub',
    title: 'Observer Pattern vs Publish-Subscribe',
    category: 'Software Design',
    keywords: [
      'what is the difference between the observer pattern and pub-sub', 'observer the subject holds a direct list of its observers and calls their update method directly they know each other same process synchronous',
      'pub sub publishers and subscribers do not know each other at all they only know a shared channel topic or message broker in the middle which routes messages often asynchronous and across processes or machines',
      'observer is a fine grained in memory pattern pub sub is a decoupled often distributed messaging architecture kafka rabbitmq redis pub sub browser event bus',
    ],
    content: `Both let something react to changes elsewhere without hard-wiring the caller to the callee, but they differ in how decoupled the two sides are. In the OBSERVER pattern, the "subject" keeps a direct list of its "observers"; when its state changes it loops over that list and calls each observer's update() method itself. The subject and observers hold references to each other, run in the same process, and the notification is usually synchronous (the subject blocks until all observers have handled it). It is a fine-grained, in-memory object relationship. In PUBLISH-SUBSCRIBE, publishers and subscribers do not know about each other at all — not even by interface. They both know only a third party in the middle: a channel, "topic," or message broker. A publisher sends a message to a topic and forgets about it; the broker delivers it to whoever has subscribed to that topic. This adds a layer of indirection that allows the two sides to be in different threads, processes, or machines, to be added and removed independently, and to communicate asynchronously and buffered. Observer is a Gang-of-Four pattern used inside one program; pub-sub is an architectural style implemented by things like Kafka, RabbitMQ, Redis pub/sub, cloud event buses, and browser event emitters. (People sometimes call pub-sub "observer with a broker," which captures the spirit but understates how much the extra decoupling changes the design.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-decorator-pattern',
    title: 'The Decorator Design Pattern',
    category: 'Software Design',
    keywords: [
      'what is the decorator design pattern', 'add responsibilities to an individual object dynamically at runtime by wrapping it in another object that implements the same interface and forwards calls while adding behaviour before or after',
      'an alternative to subclassing for extending behaviour you can stack multiple decorators in any combination', 'classic example java io streams new bufferedreader new inputstreamreader new fileinputstream a structural pattern not a factory',
    ],
    content: `The Decorator pattern (a "structural" Gang of Four pattern) attaches extra behavior to a single object at runtime, without changing its class and without affecting other objects of that class. It works by wrapping the original object inside a "decorator" object that implements the SAME interface, holds a reference to the wrapped object, and — for each method — adds its own behavior before and/or after delegating to the wrapped object. Because decorators share the interface, they can be stacked: you can wrap an object in a decorator, then wrap that in another decorator, in any order and combination, building up exactly the feature set you want. This is a flexible alternative to creating a subclass for every combination of options (which would explode combinatorially). The canonical example is Java's I/O library — wrapping a FileInputStream in an InputStreamReader in a BufferedReader layers buffering onto character decoding onto a raw byte stream — and the same idea appears in middleware pipelines, UI component wrappers (a scroll bar decorating a text view), and Python's "@" decorator syntax. (Decorator is not the Factory pattern; Factory is about creating objects, Decorator is about wrapping them.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-class-object-instance',
    title: 'Class vs Object vs Instance',
    category: 'Software Design',
    keywords: [
      'what is the difference between a class and an object and an instance', 'a class is the blueprint or template defining what data fields and behaviour methods a type has written once',
      'an object is a concrete thing built from that class living in memory with its own actual values for the fields', 'instance emphasises the relationship to the class an object is an instance of a class object and instance are essentially synonyms instantiation is the act of creating one',
      'class members static belong to the class itself instance members belong to each object',
    ],
    content: `A CLASS is a blueprint or template: it defines, once, what fields (data) a type will hold and what methods (behavior) it will have — for example a Car class with color and speed fields and an accelerate() method. It is a definition, not a thing you can drive. An OBJECT is a concrete realization of that class that exists in memory at runtime, with its own actual stored values — one object might be a red Car going 60, another a blue Car parked at 0. Creating an object from a class is called "instantiation" (usually via a "new" expression). "INSTANCE" is essentially a synonym for object; the word simply emphasizes the relationship — you say an object is "an instance of" a particular class ("that's an instance of Car"). So all three describe the same idea from different angles: the class is the plan, an object/instance is a built copy of it. A related distinction: "class members" or "static members" belong to the class itself and are shared by all instances (like a Car.totalManufactured counter), whereas ordinary "instance members" belong to each individual object and have a separate value per object.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-command-pattern',
    title: 'The Command Design Pattern',
    category: 'Software Design',
    keywords: [
      'what is the command design pattern', 'turns a request into a standalone object carrying all the info to perform it the receiver the method the arguments decouples the object that invokes the operation from the one that knows how to perform it',
      'enables queuing logging scheduling and undo redo each command knows how to reverse itself macro commands', 'example menu items and toolbar buttons both firing the same pastecommand a behavioral pattern',
    ],
    content: `The Command pattern (a "behavioral" Gang of Four pattern) turns a request or action into a first-class object. Instead of calling document.paste() directly from a button's click handler, you create a PasteCommand object that stores everything needed to carry out the action later — a reference to the receiver (the document), which method to call, and any arguments — and exposes a single execute() method (and often an undo()). This decouples the "invoker" (the menu item, button, keyboard shortcut, or macro runner that triggers the command) from the "receiver" (the object that actually knows how to do the work). Because actions are now objects, you can: keep a history list of executed commands to support unlimited undo/redo (each command knows how to reverse itself); queue commands and run them later or on another thread; log them for auditing or crash recovery/replay; schedule them; and bundle several into one "macro" command. A common use is having a toolbar button, a menu entry, and a hotkey all hold the SAME command object, so the behavior is defined once. Transaction systems, task queues, and the "actions" in redux-style state management are all applications of this idea.`,
    createdAt: Date.now(),
  },
];
