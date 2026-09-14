import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — Python fundamentals. Plain neutral educational content
// (not crashout-voice) covering core language mechanics: variables/types, data structures,
// functions, OOP, comprehensions, decorators, generators, error handling, context managers,
// modules, and common pitfalls. Meant to genuinely teach the model correct Python behavior.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const PYTHON_FUNDAMENTALS_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-py-variables-types',
    'Python variables and dynamic typing',
    ['python variables', 'python dynamic typing', 'python data types'],
    "Python is dynamically typed, meaning a variable doesn't have a fixed type declared up front — you simply assign a value with `=` (e.g. `x = 5`) and the interpreter figures out the type at runtime, and the same variable name can later be reassigned to a completely different type (`x = \"hello\"` is legal even after `x = 5`). Python's built-in core types include `int` (arbitrary precision integers), `float` (double-precision floating point), `str` (immutable text), `bool` (True/False, actually a subclass of int), `NoneType` (the single value `None`, representing absence of a value), plus the container types `list`, `tuple`, `dict`, and `set`. Everything in Python is an object, including functions and classes themselves, and `type(x)` or `isinstance(x, SomeType)` can check a value's type at runtime. Variables are really just names bound to objects in memory (Python uses reference semantics), so `a = [1,2]; b = a` makes `b` point to the same list object as `a`, not a copy.",
  ),
  k(
    'kb-code-py-lists',
    'Python lists',
    ['python list', 'python lists', 'python array'],
    "A Python list is an ordered, mutable collection written with square brackets, e.g. `nums = [1, 2, 3]`. Lists can hold mixed types, grow or shrink after creation, and support indexing (`nums[0]`), negative indexing from the end (`nums[-1]`), and slicing (`nums[1:3]` returns a new list from index 1 up to but excluding index 3). Common methods: `.append(x)` adds one item to the end, `.extend(iterable)` adds multiple items, `.insert(i, x)` inserts at a position, `.pop(i)` removes and returns the item at index i (defaults to the last item), `.remove(x)` removes the first matching value, `.sort()` sorts in place, and `sorted(nums)` returns a new sorted list without modifying the original. Lists are implemented as dynamic arrays, so indexing by position is O(1) but inserting/removing from the front is O(n) because later elements must shift.",
  ),
  k(
    'kb-code-py-dicts',
    'Python dictionaries',
    ['python dict', 'python dictionary', 'python hashmap'],
    "A Python dictionary (`dict`) stores key-value pairs, written with curly braces: `person = {\"name\": \"Alex\", \"age\": 30}`. Keys must be hashable (strings, numbers, tuples of hashables — not lists or dicts themselves), and lookups by key are average O(1) because dicts are implemented internally as hash tables. Values are accessed with `person[\"name\"]`, which raises a `KeyError` if the key doesn't exist; `person.get(\"name\", default)` returns a fallback instead of raising. Since Python 3.7, regular dicts preserve insertion order. Common operations: `.keys()`, `.values()`, `.items()` return view objects for iterating over keys, values, or (key, value) pairs respectively; `del person[\"age\"]` removes a key; the `in` operator checks key membership (`\"name\" in person`). Dict comprehensions like `{k: v*2 for k, v in d.items()}` build new dicts concisely.",
  ),
  k(
    'kb-code-py-tuples-sets',
    'Python tuples and sets',
    ['python tuple', 'python set', 'python immutable'],
    "A tuple is an ordered, immutable collection written with parentheses, e.g. `point = (3, 4)` — once created, its elements can't be reassigned, which makes tuples usable as dictionary keys (unlike lists) and signals to readers that the data shouldn't change. Tuples support the same indexing/slicing as lists but lack methods like `.append()`. A single-element tuple needs a trailing comma: `(5,)` — without it, `(5)` is just the integer 5 in parentheses. A set is an unordered collection of unique, hashable elements written with curly braces or `set()`, e.g. `s = {1, 2, 3}`; duplicates are automatically discarded, and sets support fast O(1) average membership tests plus mathematical operations like union (`|`), intersection (`&`), and difference (`-`). Sets are commonly used to deduplicate a list: `list(set(my_list))`, though this loses ordering.",
  ),
  k(
    'kb-code-py-functions',
    'Python functions and default arguments',
    ['python function', 'python def', 'python default argument'],
    "Python functions are defined with `def name(parameters):` followed by an indented body, and `return value` sends a value back to the caller (a function with no explicit return returns `None`). Parameters can have default values (`def greet(name, greeting=\"Hello\"):`), letting callers omit them, and can be called positionally or by keyword (`greet(name=\"Sam\", greeting=\"Hi\")`). A well-known pitfall is using a mutable object (like a list or dict) as a default argument: `def add(x, items=[]):` — the default list is created ONCE when the function is defined, not on each call, so repeated calls without an explicit `items` argument all share and mutate the SAME list, causing values to accumulate unexpectedly across calls. The standard fix is `def add(x, items=None): items = items if items is not None else []`. Functions are first-class objects in Python — they can be assigned to variables, passed as arguments, and returned from other functions.",
  ),
  k(
    'kb-code-py-args-kwargs',
    'Python *args and **kwargs',
    ['python args kwargs', 'python variadic', 'python unpacking'],
    "`*args` and `**kwargs` let a Python function accept a variable number of arguments. `*args` collects any extra positional arguments into a tuple: `def f(*args): print(args)` — calling `f(1, 2, 3)` gives `args = (1, 2, 3)`. `**kwargs` collects extra keyword arguments into a dict: `def f(**kwargs): print(kwargs)` — calling `f(a=1, b=2)` gives `kwargs = {\"a\": 1, \"b\": 2}`. The names `args` and `kwargs` are just convention (the asterisks are what matter, not the names). The same `*` and `**` syntax also works in reverse at a call site to unpack a sequence/dict into separate arguments: given `nums = [1, 2, 3]`, calling `f(*nums)` passes them as three separate positional arguments, and `f(**{\"a\": 1})` passes `a=1` as a keyword argument. This pattern is common for wrapper functions that need to pass through arbitrary arguments to another function.",
  ),
  k(
    'kb-code-py-classes',
    'Python classes and objects',
    ['python class', 'python oop', 'python self'],
    "Python classes are defined with `class ClassName:` and typically include an `__init__` method, which acts as the constructor and runs automatically when a new instance is created: `class Dog:\\n    def __init__(self, name):\\n        self.name = name`. Every instance method's first parameter is conventionally named `self`, referring to the specific instance the method is called on — Python passes it automatically, so `my_dog.bark()` is really calling `Dog.bark(my_dog)` under the hood. Instance attributes (like `self.name`) belong to each individual object, while class attributes defined directly in the class body are shared across all instances unless overridden. Inheritance uses `class Puppy(Dog):`, and a subclass can call its parent's method with `super().__init__(...)`. Special \"dunder\" methods like `__str__` (controls `print(obj)` output), `__eq__` (controls `==`), and `__len__` (controls `len(obj)`) let custom classes integrate with Python's built-in syntax.",
  ),
  k(
    'kb-code-py-list-comprehensions',
    'Python list comprehensions',
    ['python list comprehension', 'python comprehension'],
    "A list comprehension is a concise way to build a new list from an iterable in a single expression: `squares = [x**2 for x in range(10)]` is equivalent to writing a for-loop that appends `x**2` for each `x` to an empty list, but is more compact and generally faster since the looping happens in optimized C code internally. Comprehensions can include a filtering condition: `evens = [x for x in range(20) if x % 2 == 0]` keeps only values where the condition is true. The same syntax pattern extends to dict comprehensions `{k: v for k, v in pairs}` and set comprehensions `{x for x in items}`. Comprehensions can be nested for multi-dimensional data, e.g. flattening a list of lists: `flat = [x for row in matrix for x in row]`. While powerful, deeply nested or overly complex comprehensions hurt readability, and a regular for-loop is often clearer once more than one condition or transformation is involved.",
  ),
  k(
    'kb-code-py-generators',
    'Python generators and yield',
    ['python generator', 'python yield', 'python lazy iteration'],
    "A generator is a special kind of function that produces a sequence of values lazily, one at a time, instead of computing and returning them all at once. Instead of `return`, a generator function uses `yield`: `def count_up(n):\\n    i = 0\\n    while i < n:\\n        yield i\\n        i += 1`. Calling `count_up(5)` doesn't run the function body immediately — it returns a generator object, and each call to `next()` on it (or each iteration of a `for` loop) resumes execution from where it last paused at `yield`, runs until the next `yield`, and returns that value, preserving all local state in between. This makes generators memory-efficient for large or infinite sequences, since values are produced on demand rather than all stored in memory at once — compare `range(10**9)` (a lazy range object) to building an actual list of a billion integers. Generator expressions use a syntax similar to list comprehensions but with parentheses: `(x**2 for x in range(10))`.",
  ),
  k(
    'kb-code-py-decorators',
    'Python decorators',
    ['python decorator', 'python @wraps', 'python function wrapping'],
    "A decorator is a function that takes another function as input and returns a modified version of it, typically used to add behavior (logging, timing, access control, caching) without changing the original function's code. Decorators use the `@` syntax as shorthand: writing `@my_decorator` above `def foo():` is equivalent to `foo = my_decorator(foo)`. A basic decorator pattern: `def my_decorator(func):\\n    def wrapper(*args, **kwargs):\\n        print(\"before\")\\n        result = func(*args, **kwargs)\\n        print(\"after\")\\n        return result\\n    return wrapper`. The `*args, **kwargs` in the wrapper let it work with any function signature. Common built-in decorators include `@staticmethod` (a method that doesn't receive `self`), `@classmethod` (receives the class itself as the first argument, conventionally named `cls`), and `@property` (lets a method be accessed like an attribute, without parentheses). Well-written custom decorators use `functools.wraps` to preserve the original function's name and docstring.",
  ),
  k(
    'kb-code-py-exceptions',
    'Python exception handling',
    ['python try except', 'python exception handling', 'python error handling'],
    "Python handles errors with `try`/`except` blocks: code that might fail goes in `try:`, and `except SomeError:` catches a specific exception type if it's raised, letting the program recover instead of crashing. Multiple `except` clauses can handle different exception types differently, and a bare `except:` (or `except Exception:`) catches broader classes of errors but is generally discouraged because it can silently swallow bugs unrelated to the expected failure. An optional `else:` block runs only if no exception occurred, and `finally:` runs regardless of whether an exception was raised — commonly used for cleanup like closing a file. Custom exceptions are created by subclassing `Exception`: `class MyError(Exception): pass`, then `raise MyError(\"message\")` triggers it. `raise` with no argument inside an `except` block re-raises the currently-handled exception, preserving its traceback, which is important when logging an error before letting it propagate further up.",
  ),
  k(
    'kb-code-py-context-managers',
    'Python context managers and the with statement',
    ['python with statement', 'python context manager', 'python file handling'],
    "The `with` statement in Python manages resources that need explicit setup and cleanup, most commonly file handling: `with open(\"file.txt\") as f:\\n    data = f.read()` automatically closes the file when the block exits, even if an exception occurs inside it — this is more reliable than manually calling `f.close()`, which could be skipped if an error happens first. Under the hood, `with` works with any object implementing the context manager protocol: `__enter__` (runs at the start of the block, its return value becomes the `as` variable) and `__exit__` (runs at the end, receives exception info if one occurred, and can suppress it by returning True). The `contextlib` module's `@contextmanager` decorator lets you write a context manager as a generator function instead of a full class, using `yield` to mark the boundary between setup and teardown code. Multiple context managers can be combined in one `with` statement separated by commas.",
  ),
  k(
    'kb-code-py-modules-imports',
    'Python modules and imports',
    ['python import', 'python module', 'python package'],
    "A Python module is simply a `.py` file, and its contents (functions, classes, variables) become accessible elsewhere via `import module_name`, after which you access things with `module_name.thing`. `from module_name import thing` imports a specific name directly into the current namespace, avoiding the prefix. `import module_name as alias` (e.g. `import numpy as np`) creates a shorter alias. A package is a directory containing multiple modules plus an `__init__.py` file (which can be empty) marking it as importable as a package, enabling structures like `import package.submodule`. The special variable `__name__` equals `\"__main__\"` only when a file is run directly (not when imported), which is why scripts often end with `if __name__ == \"__main__\": main()` — this lets a file be both an importable module and a runnable script without the script's top-level code executing on import.",
  ),
  k(
    'kb-code-py-virtualenv',
    'Python virtual environments',
    ['python virtualenv', 'python venv', 'python pip'],
    "A Python virtual environment is an isolated Python installation with its own set of installed packages, separate from the system-wide Python and separate from other projects' environments — this prevents version conflicts when different projects need different versions of the same library. The standard library module `venv` creates one: `python -m venv myenv` creates a folder containing a private copy of the interpreter and package directory; `source myenv/bin/activate` (macOS/Linux) or `myenv\\\\Scripts\\\\activate` (Windows) activates it for the current shell session, after which `pip install package_name` installs into that isolated environment rather than globally. `pip freeze > requirements.txt` records exact installed versions so another machine can recreate the same environment with `pip install -r requirements.txt`. Popular alternatives to plain venv include `virtualenv`, `conda`, and newer tools like `poetry` and `uv`, which also handle dependency resolution and packaging.",
  ),
  k(
    'kb-code-py-fstrings',
    'Python f-strings',
    ['python f-string', 'python string formatting', 'python format'],
    "An f-string (formatted string literal), introduced in Python 3.6, embeds expressions directly inside a string by prefixing it with `f` and wrapping expressions in curly braces: `name = \"Alex\"; print(f\"Hello, {name}!\")` prints `Hello, Alex!`. Any valid Python expression can go inside the braces, including function calls and arithmetic: `f\"Total: {price * quantity}\"`. F-strings support format specifiers after a colon for controlling number formatting, e.g. `f\"{value:.2f}\"` rounds a float to 2 decimal places, and `f\"{number:,}\"` adds thousands separators. F-strings largely replaced older approaches: the `%` operator style (`\"Hello, %s\" % name`) and the `.format()` method style (`\"Hello, {}\".format(name)`) still work but are more verbose and generally considered legacy in modern Python code.",
  ),
  k(
    'kb-code-py-stdlib-basics',
    'Common Python standard library modules',
    ['python os module', 'python json module', 'python re module', 'python sys module'],
    "Python's standard library ships with many useful built-in modules that require no separate installation. The `os` module handles operating-system interaction: `os.getcwd()` gets the current directory, `os.listdir(path)` lists files, `os.path.join(a, b)` builds file paths in an OS-independent way. `sys` provides interpreter-level access: `sys.argv` is the list of command-line arguments passed to a script, `sys.exit()` terminates the program. `json` handles JSON serialization: `json.dumps(obj)` converts a Python object to a JSON string, `json.loads(text)` parses a JSON string back into Python data (dicts, lists, etc). `re` provides regular expression support: `re.search(pattern, text)` finds the first match, `re.findall(pattern, text)` returns all matches, `re.sub(pattern, replacement, text)` replaces matches. Other commonly used modules include `datetime` (dates/times), `collections` (extra container types like `Counter` and `defaultdict`), and `math` (mathematical functions).",
  ),
  k(
    'kb-code-py-gil',
    "Python's Global Interpreter Lock (GIL)",
    ['python gil', 'python global interpreter lock', 'python threading limitation'],
    "The Global Interpreter Lock (GIL) is a mutex in CPython (the standard, most widely used Python implementation) that allows only one thread to execute Python bytecode at a time, even on a multi-core machine. This means that in standard CPython, using multiple threads does NOT let CPU-bound Python code run faster in parallel — the threads still take turns holding the GIL. The GIL exists largely because CPython's memory management (reference counting for garbage collection) isn't thread-safe without it, and removing it entirely would require deep changes and could slow down single-threaded code. In practice, threading in Python is still useful for I/O-bound tasks (network requests, file I/O, waiting on a database) because a thread releases the GIL while waiting on I/O, letting other threads run during that wait. For true CPU-bound parallelism, Python programs typically use the `multiprocessing` module instead, which runs separate processes each with their own interpreter and GIL, sidestepping the limitation at the cost of higher memory usage and inter-process communication overhead.",
  ),
  k(
    'kb-code-py-mutable-immutable',
    'Mutable vs immutable types in Python',
    ['python mutable', 'python immutable', 'python pass by reference'],
    "In Python, some types are mutable (their contents can be changed after creation) and others are immutable (they cannot). Mutable types include `list`, `dict`, and `set` — you can modify them in place with methods like `.append()` or `[key] = value`. Immutable types include `int`, `float`, `str`, `bool`, and `tuple` — operations that seem to \"change\" them actually create a new object; for example `s = \"hi\"; s += \" there\"` creates an entirely new string object and rebinds `s` to it, leaving the original `\"hi\"` object unchanged (and eligible for garbage collection if nothing else references it). This distinction matters for function arguments: Python passes references to objects, so a function that receives a mutable list and calls `.append()` on it will affect the caller's original list, but a function that receives an immutable value like an int and reassigns its local parameter has no effect on the caller's variable. It also explains why immutable types are safe to use as dictionary keys or set elements (their hash never changes) while mutable types generally are not.",
  ),
  k(
    'kb-code-py-string-methods',
    'Common Python string methods',
    ['python string methods', 'python str split', 'python strip'],
    "Python strings are immutable sequences of characters with many built-in methods. `.split(sep)` breaks a string into a list of substrings at each occurrence of `sep` (defaulting to whitespace if omitted); `.join(iterable)` does the reverse, combining a list of strings into one, called on the separator: `\", \".join([\"a\", \"b\", \"c\"])` gives `\"a, b, c\"`. `.strip()` removes leading/trailing whitespace (or specified characters); `.lstrip()`/`.rstrip()` do just one side. `.replace(old, new)` substitutes all occurrences. `.lower()`/`.upper()` change case. `.startswith(prefix)`/`.endswith(suffix)` check boundaries. Slicing works the same as with lists: `s[1:4]`, `s[::-1]` (a common idiom for reversing a string via a step of -1). Because strings are immutable, every one of these methods returns a NEW string rather than modifying the original in place.",
  ),
  k(
    'kb-code-py-truthiness',
    'Python truthiness and falsy values',
    ['python truthy', 'python falsy', 'python boolean evaluation'],
    "In a boolean context (like an `if` statement), Python treats certain values as \"falsy\" even though they aren't literally `False`: the number `0` (and `0.0`), an empty string `\"\"`, an empty list `[]`, an empty dict `{}`, an empty set `set()`, and `None` all evaluate as false. Every other value — including non-empty strings, non-zero numbers, and non-empty containers — evaluates as true. This lets you write `if my_list:` instead of the more verbose `if len(my_list) > 0:` to check whether a list has any items, and `if name:` to check whether a string is non-empty. It's worth distinguishing `is None` from `== None`: `is` checks object identity (whether two names point to the literal same object), which is the idiomatic and safest way to check for `None` specifically, since `==` could in theory be overridden by a custom `__eq__` method on some other object being compared.",
  ),
  k(
    'kb-code-py-comprehension-vs-loop',
    'When to use a list comprehension vs a for loop in Python',
    ['python comprehension vs for loop', 'python when to use comprehension'],
    "A list comprehension and an equivalent for-loop that builds a list will produce the same result, but they aren't always interchangeable in style or performance. Comprehensions are generally preferred for simple, single-expression transformations or filters — they're often slightly faster because the iteration is handled in optimized C internals rather than repeated Python-level `.append()` calls, and they read naturally left-to-right for one clear operation. A regular for-loop is usually clearer once the logic involves multiple steps per iteration, side effects (like printing or modifying an external variable), multiple independent conditions, or nested logic that would otherwise force a hard-to-read nested comprehension. As a rule of thumb, if writing the comprehension requires more than one line or more than one `if`/`for` clause to stay readable, a plain loop is usually the better choice for maintainability, even though comprehensions remain valid.",
  ),
  k(
    'kb-code-py-lambda',
    'Python lambda functions',
    ['python lambda', 'python anonymous function'],
    "A lambda in Python is a small, anonymous (unnamed) function defined in a single expression using the syntax `lambda arguments: expression`, e.g. `square = lambda x: x ** 2`. Unlike a regular `def` function, a lambda can only contain a single expression (no statements, no multiple lines) and implicitly returns that expression's value. Lambdas are most commonly used as short, throwaway functions passed as arguments to other functions, such as the `key` argument of `sorted()`: `sorted(people, key=lambda p: p.age)` sorts a list of objects by their `age` attribute without needing a separately defined named function. They're also common with `filter()` and `map()`, e.g. `list(filter(lambda x: x % 2 == 0, nums))`. For anything more complex than a one-line expression, a regular named `def` function is preferred for readability and because it can have a docstring and be more easily debugged via its name in a traceback.",
  ),
];
