import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('python', slug, title, keywords, content);

export const CODE_PYTHON = [
  c('basics', 'Python basics: variables, types, input/output, f-strings, operators', ['python basics', 'python variables', 'python types', 'f string', 'input print', 'python operators', 'integer division', 'python tutorial'],
    `Dynamic, strongly typed: x = 5 (int), y = 2.5 (float), name = "Ana" (str), ok = True (bool), nothing = None. type(x), isinstance(x, (int, float)). Ints are arbitrary precision (2 ** 1000 works). Floats are IEEE doubles (0.1 + 0.2 != 0.3 → use math.isclose or decimal.Decimal for money).
Naming: snake_case for variables/functions, PascalCase for classes, UPPER_CASE for constants (convention). Indentation (4 spaces) defines blocks — mixing tabs/spaces causes IndentationError.
Operators: / is true division (7 / 2 = 3.5), // floor division (7 // 2 = 3, -7 // 2 = -4), % modulo, ** power, == equality, is identity (only for None: if x is None), and/or/not (return operands: name = given or "Guest"), in / not in, chained comparisons 0 < x < 10, walrus := (if (n := len(items)) > 10:).
Conversion: int("42"), float("3.5"), str(42), bool(x), int("ff", 16), round(2.5) = 2 (banker's rounding), round(x, 2).
Output: print("a", "b", sep="-", end="\\n"); f-strings: f"{name} is {age} years old", f"{price:.2f}", f"{n:,}" (thousands), f"{pct:.1%}", f"{x:>10}" (align), f"{value=}" (debug: prints value=...). Input: name = input("Name: ") always returns str → int(input()).
Truthiness: falsy = False, None, 0, 0.0, "", [], {}, set(), range(0). Multiple assignment: a, b = b, a; a = b = 0; unpacking first, *rest = items.
Comments: # line; docstrings """...""" under def/class. pass placeholder; del name. Run: python3 file.py; REPL: python3; help(obj), dir(obj).`),

  c('strings', 'Python strings: methods, slicing, formatting, unicode', ['python string methods', 'python slicing', 'split join python', 'python replace', 'string formatting python', 'reverse string python', 'python strip', 'python unicode'],
    `Immutable sequences. Quotes ' " """multi-line"""; raw r"C:\\path\\n" (no escapes — good for regex); bytes b"abc".
Indexing/slicing: s[0], s[-1], s[1:4], s[:3], s[::2], s[::-1] (reverse). len(s).
Methods: upper, lower, title, capitalize, casefold (aggressive lower for comparisons), strip/lstrip/rstrip(chars), split(sep=None, maxsplit) (no arg = any whitespace), rsplit, splitlines, sep.join(iterable) (all items must be str: ", ".join(map(str, nums))), replace(old, new, count), find/rfind (-1 if missing), index (raises ValueError), count, startswith/endswith (accept tuples), isdigit/isalpha/isalnum/isspace/isupper, zfill(5), center/ljust/rjust(width, fill), partition(sep), removeprefix/removesuffix (3.9+), encode("utf-8"), format(), expandtabs.
Membership: "py" in s. Repeat: "-" * 20. Concatenate many: "".join(parts) (not += in a loop).
Formatting: f"{x:08.3f}", f"{n:b}" (binary), f"{n:x}" (hex), f"{dt:%Y-%m-%d}"; older "{} {}".format(a, b) and "%s %d" % (s, n).
Common recipes: words = s.split(); count words: collections.Counter(s.lower().split()); palindrome: t = "".join(ch for ch in s.lower() if ch.isalnum()); t == t[::-1]; remove punctuation: s.translate(str.maketrans("", "", string.punctuation)); capitalise each word: s.title() (careful with apostrophes) or string.capwords(s); vowels count: sum(ch in "aeiou" for ch in s.lower()).
Unicode: str is unicode; len counts code points; normalise with unicodedata.normalize("NFC", s); strip accents: "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn").
Text files: open(path, encoding="utf-8") — always pass encoding.`),

  c('lists-tuples', 'Python lists and tuples: methods, slicing, sorting, comprehensions', ['python list methods', 'list comprehension', 'sort list python', 'sorted key lambda', 'append extend', 'tuple', 'python slicing list', 'remove duplicates list python', 'enumerate zip'],
    `Lists are mutable ordered sequences: nums = [3, 1, 2]; methods: append(x), extend(iterable), insert(i, x), remove(x) (first match, ValueError if absent), pop() / pop(i), clear(), index(x), count(x), sort(key=None, reverse=False) (in place, returns None!), reverse(), copy().
sorted(iterable, key=..., reverse=...) returns a new list: sorted(users, key=lambda u: (u["age"], u["name"])); by attribute: key=operator.attrgetter("age"); descending numbers: sorted(nums, reverse=True). Sort is stable.
Slicing: a[1:3], a[::-1] (reversed copy), a[:] (shallow copy), slice assignment a[1:3] = [9, 9], del a[0].
Comprehensions: [x * 2 for x in nums if x > 0]; nested [cell for row in grid for cell in row]; conditional value [x if x > 0 else 0 for x in nums]. Generator expression (lazy): sum(x * x for x in range(10)).
Built-ins on iterables: len, sum, min, max (key=, default=), any, all, sorted, reversed, enumerate(seq, start=1), zip(a, b, strict=True), map, filter, list(range(5)).
Copying: b = a makes an alias; shallow copy a.copy() / list(a) / a[:]; deep copy copy.deepcopy(a) (nested lists). Pitfall: grid = [[0] * 3] * 3 shares the same inner list — use [[0] * 3 for _ in range(3)].
Recipes: unique keeping order list(dict.fromkeys(items)); flatten [x for sub in lists for x in sub] or itertools.chain.from_iterable; chunk [a[i:i + n] for i in range(0, len(a), n)]; max index nums.index(max(nums)); pairs zip(a, a[1:]); transpose list(zip(*matrix)).
Tuples: immutable (point = (3, 4); single = (5,)), hashable (usable as dict keys/set items), unpacking x, y = point. namedtuple / dataclass for readable records.
Performance: list append O(1), insert(0) / pop(0) O(n) → use collections.deque for queues; "x in list" is O(n) → use a set for membership.`),

  c('dicts-sets', 'Python dictionaries and sets: methods, comprehensions, Counter, defaultdict', ['python dictionary', 'dict methods', 'dict comprehension', 'get default', 'defaultdict', 'counter', 'python set operations', 'merge dicts', 'sort dict by value'],
    `Dicts: user = {"name": "Ana", "age": 20}; user["name"] (KeyError if missing), user.get("email", "n/a"), user["email"] = "a@b.c", "name" in user, del user["age"], user.pop("age", None), user.setdefault("tags", []).append("x"), user.update(other), keys(), values(), items(), clear(), copy(). Insertion order is preserved (3.7+). Keys must be hashable (str, int, tuple — not list).
Iterate: for key, value in user.items(). Comprehension: {k: v * 2 for k, v in prices.items() if v > 0}; invert {v: k for k, v in d.items()}.
Merge: merged = {**a, **b} or a | b (3.9+); a |= b updates in place. Sort by value: dict(sorted(d.items(), key=lambda kv: kv[1], reverse=True)). Max key by value: max(d, key=d.get).
collections: Counter(words) → counts, .most_common(3), Counter arithmetic; defaultdict(list) → groups[k].append(x) without checking; OrderedDict (move_to_end — LRU caches); ChainMap (layered config); deque(maxlen=100).
Group by: from collections import defaultdict; groups = defaultdict(list); for item in items: groups[item["type"]].append(item).
Nested access safely: data.get("user", {}).get("address", {}).get("city").
Sets: unique, unordered, O(1) membership: s = {1, 2, 3}; empty set is set() ({} is a dict); add, remove (KeyError) / discard (no error), pop, | union, & intersection, - difference, ^ symmetric difference, <= subset, frozenset (hashable). Dedupe: set(items) (loses order).
JSON ↔ dict: json.loads(text), json.dumps(obj, indent=2, ensure_ascii=False); json.load(f) / json.dump(obj, f). Tuples become lists, keys become strings.`),

  c('control-flow', 'Python control flow: if/elif, loops, match-case, comprehensions, exceptions flow', ['python if elif else', 'for loop python', 'while loop', 'break continue', 'match case python', 'range', 'for else', 'python ternary'],
    `if score >= 90: grade = "A"
elif score >= 80: grade = "B"
else: grade = "C"
Ternary: label = "even" if n % 2 == 0 else "odd".
for item in items: ...; for i in range(10) / range(start, stop, step) (stop excluded); for i, item in enumerate(items, start=1); for a, b in zip(xs, ys); for key, value in d.items(); for line in file.
while cond: ...; break (exit loop), continue (next iteration); loop else runs when the loop wasn't broken (search pattern: for x in xs: if match(x): break / else: print("not found")).
Iterating and modifying: don't remove from a list while iterating it — build a new list (items = [x for x in items if keep(x)]) or iterate over a copy (for x in items[:]).
match-case (3.10+), structural pattern matching:
match command.split():
    case ["go", direction]: move(direction)
    case ["take", *objects]: take(objects)
    case ["quit" | "exit"]: quit()
    case _: print("unknown")
Also matches dict shapes ({"type": "click", "x": x}), class patterns (Point(x=0)), guards (case [x, y] if x == y).
Infinite loop with exit: while True: line = input(); if line == "q": break.
Exceptions are normal control flow in Python (EAFP: "easier to ask forgiveness"): try: value = d[key] except KeyError: value = default.
No do-while, no switch (use match or dicts of functions: actions = {"add": add, "sub": sub}; actions[op](a, b)).`),

  c('functions', 'Python functions: args, kwargs, defaults, lambdas, closures, decorators', ['python functions', 'args kwargs', 'default arguments', 'lambda python', 'decorator python', 'closure python', 'keyword only arguments', 'mutable default argument', 'recursion python'],
    `def greet(name: str, greeting: str = "Hi") -> str:
    """Return a greeting."""
    return f"{greeting}, {name}!"
Arguments: positional, keyword (greet(greeting="Yo", name="Bo")), defaults, *args (tuple of extra positionals), **kwargs (dict of extra keywords), keyword-only after * (def f(a, *, verbose=False)), positional-only before / (def f(a, b, /)). Unpack when calling: f(*lst, **dct). Returning several values returns a tuple: return x, y → a, b = f().
Mutable default pitfall: def add(item, bucket=[]) shares ONE list across calls — use bucket=None and create it inside.
Scope: LEGB (local, enclosing, global, built-in); assign to a global with global x; to an enclosing variable with nonlocal x.
Lambdas: one expression: key=lambda u: u.age. Prefer def for anything non-trivial.
Closures: def make_counter(): count = 0; def inc(): nonlocal count; count += 1; return count; return inc.
Decorators wrap functions:
import functools, time
def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try: return fn(*args, **kwargs)
        finally: print(f"{fn.__name__} took {time.perf_counter() - start:.3f}s")
    return wrapper
@timed
def work(): ...
With arguments: def retry(times): def deco(fn): ... return deco. Built-ins: @functools.lru_cache(maxsize=None) / @functools.cache (memoize), @staticmethod, @classmethod, @property, @dataclass.
Recursion limit ~1000 (sys.setrecursionlimit) — prefer iteration for deep recursion. functools.partial(fn, x=1) pre-fills arguments.
Type hints are optional and not enforced at runtime (check with mypy/pyright).`),

  c('classes-oop', 'Python classes and OOP: __init__, methods, inheritance, dunder methods, dataclasses, properties', ['python class', 'python __init__', 'self', 'inheritance super', 'dataclass', 'property decorator', 'dunder methods', '__str__ __repr__', 'classmethod staticmethod', 'abstract class python'],
    `class Account:
    interest = 0.02                      # class attribute (shared)
    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner               # instance attributes
        self._balance = balance          # leading _ = "internal" by convention (__x triggers name mangling)
    def deposit(self, amount: float) -> None:
        if amount <= 0: raise ValueError("amount must be positive")
        self._balance += amount
    @property
    def balance(self) -> float: return self._balance
    @classmethod
    def from_dict(cls, d): return cls(d["owner"], d.get("balance", 0))
    @staticmethod
    def validate(owner): return bool(owner.strip())
    def __repr__(self): return f"Account({self.owner!r}, {self._balance})"   # for developers
    def __str__(self): return f"{self.owner}: {self._balance:.2f} $"        # for users
Inheritance: class Savings(Account): def __init__(self, owner, rate): super().__init__(owner); self.rate = rate — override methods, call super().method(). Multiple inheritance follows the MRO (Class.__mro__).
Dunder methods: __eq__, __lt__ (with functools.total_ordering), __hash__, __len__, __getitem__, __iter__, __contains__, __add__, __call__, __enter__/__exit__ (context managers), __bool__.
Dataclasses (less boilerplate):
from dataclasses import dataclass, field
@dataclass(frozen=False, order=True, slots=True)
class Item:
    name: str
    price: float
    tags: list[str] = field(default_factory=list)
Abstract base classes: from abc import ABC, abstractmethod; class Shape(ABC): @abstractmethod def area(self) -> float: ...
Protocols (structural typing): from typing import Protocol. Enums: from enum import Enum, auto; class Color(Enum): RED = auto().
Prefer composition and plain functions where a class only wraps data — dataclasses/NamedTuple/TypedDict for records.`),

  c('errors-exceptions', 'Python exceptions: try/except/else/finally, raising, custom exceptions, common errors', ['python try except', 'python exceptions', 'raise exception', 'custom exception python', 'traceback', 'keyerror', 'typeerror python', 'indentationerror', 'finally', 'with statement'],
    `try:
    value = int(text)
except ValueError as e:
    print(f"not a number: {e}")
except (KeyError, IndexError):
    ...
else:            # runs only if no exception
    save(value)
finally:         # always runs (cleanup)
    conn.close()
Raise: raise ValueError("age must be positive"); re-raise: raise; chain: raise ConfigError("bad config") from err. Catch Exception (not bare except:, which also catches KeyboardInterrupt/SystemExit). Don't silence errors with except: pass.
Custom: class AppError(Exception): pass; class NotFoundError(AppError): def __init__(self, item_id): super().__init__(f"{item_id} not found"); self.item_id = item_id.
Context managers guarantee cleanup: with open(path, encoding="utf-8") as f: data = f.read(); several: with open(a) as fa, open(b) as fb:; custom via contextlib.contextmanager or __enter__/__exit__; contextlib.suppress(FileNotFoundError).
Common errors and fixes:
- NameError: name 'x' is not defined → typo, not defined yet, wrong scope.
- TypeError: unsupported operand / can only concatenate str (not "int") to str → convert: str(n) or use f-strings; 'NoneType' object is not subscriptable → a function returned None (e.g. list.sort()).
- AttributeError: 'NoneType' object has no attribute 'x' → value is None; check the source.
- KeyError → use .get() or check "key in d"; IndexError → index out of range.
- IndentationError / TabError → consistent 4 spaces.
- ModuleNotFoundError → pip install it in the SAME interpreter/venv you run (python3 -m pip install x).
- ValueError: invalid literal for int() → validate input; ZeroDivisionError; RecursionError; UnicodeDecodeError → pass encoding="utf-8".
- IndentationError: expected an indented block → add pass or a body.
Logging instead of print: import logging; logging.basicConfig(level=logging.INFO); log = logging.getLogger(__name__); log.exception("failed") inside except (includes the traceback).
Assertions (assert x > 0, "msg") are for internal invariants, disabled with python -O — not for validating user input.`),

  c('files-paths', 'Python files and paths: open, read/write, pathlib, CSV, JSON, os', ['python read file', 'python write file', 'pathlib', 'csv python', 'json file python', 'os listdir', 'python file exists', 'rename files python', 'with open'],
    `Text files: with open("notes.txt", "r", encoding="utf-8") as f: text = f.read() / lines = f.readlines() / for line in f: (lazy). Write: open(p, "w", encoding="utf-8") (overwrites), "a" (append), "x" (fail if exists), "rb"/"wb" for binary. f.write(s), print(..., file=f).
pathlib (modern, cross-platform):
from pathlib import Path
p = Path("data") / "report.csv"; p.exists(); p.is_file(); p.suffix (".csv"); p.stem; p.name; p.parent; p.resolve(); p.read_text(encoding="utf-8"); p.write_text(text, encoding="utf-8"); p.read_bytes(); p.mkdir(parents=True, exist_ok=True); p.unlink(missing_ok=True); p.rename(new); list(Path(".").glob("*.py")); Path(".").rglob("*.jpg") (recursive); Path.home(); Path(__file__).parent (folder of this script).
Rename all .jpeg to .jpg: for f in Path("pics").glob("*.jpeg"): f.rename(f.with_suffix(".jpg")).
os / shutil: os.getcwd(), os.environ.get("KEY"), os.listdir, os.walk(top) → (dirpath, dirnames, filenames); shutil.copy2, shutil.move, shutil.rmtree (careful!), shutil.make_archive; tempfile.TemporaryDirectory().
CSV:
import csv
with open("people.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f): print(row["name"], int(row["age"]))
with open("out.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["name", "age"]); w.writeheader(); w.writerows(rows)
JSON: json.load(f) / json.dump(data, f, indent=2, ensure_ascii=False). Large data → pandas (pd.read_csv), YAML → PyYAML (yaml.safe_load), TOML → tomllib (3.11+, read-only), Excel → openpyxl/pandas.
Paths from users: never build shell commands with them; validate they stay inside an allowed folder (p.resolve().is_relative_to(base)).`),

  c('modules-packages-venv', 'Python modules, packages, pip, virtual environments and project setup', ['python import', 'python modules', 'pip install', 'virtual environment venv', 'requirements.txt', '__name__ == __main__', 'python package structure', 'pyproject.toml', 'module not found error'],
    `Import: import math; from math import sqrt, pi; import numpy as np; from .utils import helper (relative, inside a package). Avoid "from x import *". A module is any .py file; a package is a folder (with __init__.py for regular packages).
Script entry point: if __name__ == "__main__": main() — code under it runs only when the file is executed directly, not when imported.
Virtual environments (one per project, never pip install into the system Python):
python3 -m venv .venv
source .venv/bin/activate        (Windows: .venv\\Scripts\\activate)
python -m pip install requests
python -m pip freeze > requirements.txt;  python -m pip install -r requirements.txt
deactivate
Always use python -m pip (installs into the interpreter you're running). "ModuleNotFoundError" usually = installed into a different Python/venv (check: which python, python -m pip --version) or a missing __init__.py / wrong working directory for relative imports.
Modern tooling: uv (very fast: uv venv, uv pip install, uv add, uv run), poetry, pipx (install CLI tools globally isolated), pyproject.toml (project metadata, dependencies, tool config for ruff/black/pytest/mypy).
Project layout: myproject/ ├─ pyproject.toml ├─ src/mypkg/__init__.py ├─ src/mypkg/core.py └─ tests/test_core.py. Run as a module: python -m mypkg.
Standard library highlights: os, sys, pathlib, json, csv, re, datetime, time, math, random, statistics, collections, itertools, functools, typing, dataclasses, enum, logging, argparse, subprocess, threading, concurrent.futures, asyncio, sqlite3, urllib, http.server, unittest, shutil, tempfile, hashlib, secrets, uuid, zipfile, textwrap.
Python versions: use 3.11+ (faster, better errors); check with python3 --version; pyenv manages several.`),

  c('iterators-generators', 'Python iterators, generators, itertools and comprehensions', ['python generator', 'yield', 'iterator python', 'itertools', 'generator expression', 'lazy evaluation python', 'next iter', 'chain groupby'],
    `Iterable = can be looped (list, str, dict, file, range); iterator = has __next__ (iter(x) creates one, next(it, default) advances, StopIteration ends).
Generators produce values lazily:
def read_large(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            if line.strip(): yield line.rstrip("\\n")
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b
from itertools import islice; list(islice(fib(), 10)).
Generator expressions: (x * x for x in data) — use inside sum/any/max to avoid building lists. yield from sub_generator delegates. Generators can only be consumed once.
itertools: count(start), cycle, repeat, chain(a, b), chain.from_iterable, islice, takewhile/dropwhile, accumulate (running totals), groupby(sorted_data, key) (data must be sorted by the key!), product (nested loops / cartesian), permutations, combinations, combinations_with_replacement, zip_longest, pairwise (3.10+), batched (3.12+), starmap, compress, tee.
functools: reduce(fn, iterable, initial), partial, lru_cache, cmp_to_key.
Comprehensions for dicts {k: v ...} and sets {x ...} too. Nested comprehensions get unreadable fast — use loops when logic grows.
Custom iterator class: implement __iter__ (return self) and __next__ (raise StopIteration at the end).
enumerate/zip/reversed/sorted/map/filter all return iterators (map/filter/zip are lazy — wrap in list() to see them).`),

  c('typing', 'Python type hints: typing module, generics, TypedDict, Protocol, mypy', ['python type hints', 'typing module', 'optional type python', 'list[int]', 'typeddict', 'protocol python', 'mypy', 'type alias python', 'union type python'],
    `Hints document intent and let tools (mypy, pyright, IDEs) catch bugs; they are NOT enforced at runtime.
def total(prices: list[float], tax: float = 0.15) -> float: ...
Built-in generics (3.9+): list[int], dict[str, int], set[str], tuple[int, str], tuple[int, ...]. Unions (3.10+): int | None (= Optional[int]), str | bytes.
from typing import Any, Callable, Iterable, Iterator, Sequence, Mapping, Literal, Final, TypedDict, Protocol, TypeVar, Generic, Self, Never, cast, overload, TypeAlias
Callables: Callable[[int, str], bool]. Literals: mode: Literal["r", "w"]. Constants: MAX: Final = 10.
TypedDict for dict shapes (JSON): class Movie(TypedDict): title: str; year: int; NotRequired[...] for optional keys.
Protocol (structural typing, duck typing with checks): class SupportsClose(Protocol): def close(self) -> None: ...
Generics: def first[T](items: list[T]) -> T | None: ... (3.12 syntax) or T = TypeVar("T"). Type aliases: type UserId = int (3.12) / UserId: TypeAlias = int; NewType("UserId", int) for distinct IDs.
Accept broad, return specific: take Iterable[str]/Sequence/Mapping, return list/dict.
dataclasses and pydantic use hints for real behaviour: pydantic validates and converts at runtime (BaseModel, model_validate, Field) — FastAPI is built on it.
Run mypy: pip install mypy; mypy src/ (--strict for full checking). Ruff lints fast (ruff check, ruff format).`),

  c('async', 'Python asyncio: async/await, gather, tasks, aiohttp, when to use threads or processes', ['python asyncio', 'async await python', 'asyncio gather', 'aiohttp', 'event loop python', 'threading vs multiprocessing', 'concurrent futures', 'asyncio sleep', 'GIL'],
    `asyncio runs many I/O-bound tasks concurrently on one thread:
import asyncio, aiohttp
async def fetch(session, url):
    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as r:
        r.raise_for_status()
        return await r.json()
async def main():
    async with aiohttp.ClientSession() as session:
        results = await asyncio.gather(*(fetch(session, u) for u in urls), return_exceptions=True)
asyncio.run(main())
Rules: await only inside async def; calling an async function returns a coroutine (nothing happens until awaited/scheduled); never call blocking code (time.sleep, requests.get, heavy CPU) inside async code — use await asyncio.sleep, aiohttp/httpx.AsyncClient, or loop.run_in_executor / asyncio.to_thread(fn).
Tasks: task = asyncio.create_task(coro()) runs in the background (keep a reference); asyncio.TaskGroup (3.11+) for structured concurrency; asyncio.wait_for(coro, timeout=5); asyncio.Semaphore(10) to limit concurrency; asyncio.Queue for producer/consumer; async for / async with.
Concurrency choices: I/O-bound with async libraries → asyncio; I/O-bound with blocking libraries → threads (concurrent.futures.ThreadPoolExecutor, map); CPU-bound → processes (ProcessPoolExecutor / multiprocessing) because of the GIL (free-threaded builds exist from 3.13 but most installs still have it).
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=8) as ex: pages = list(ex.map(download, urls))
discord.py, FastAPI, aiohttp and many bots are asyncio-based — everything inside them must be non-blocking.`),

  c('http-apis', 'Python HTTP and APIs: requests, httpx, building APIs with FastAPI and Flask', ['python requests', 'api call python', 'post request python', 'fastapi', 'flask', 'httpx', 'rest api python', 'json api python', 'web scraping python beautifulsoup'],
    `Client with requests (sync):
import requests
r = requests.get("https://api.example.com/items", params={"page": 2}, headers={"Authorization": f"Bearer {token}"}, timeout=10)
r.raise_for_status(); data = r.json()
requests.post(url, json={"name": "x"}, timeout=10)  # json= sets Content-Type
Always set timeout (default is infinite). Session() reuses connections and headers. httpx has the same API plus async (httpx.AsyncClient) and HTTP/2.
Build an API with FastAPI (validation + docs at /docs automatically):
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
app = FastAPI()
class Item(BaseModel):
    name: str
    price: float
items: dict[int, Item] = {}
@app.get("/items/{item_id}")
def get_item(item_id: int) -> Item:
    if item_id not in items: raise HTTPException(status_code=404, detail="not found")
    return items[item_id]
@app.post("/items", status_code=201)
def create(item: Item) -> dict: items[len(items) + 1] = item; return {"id": len(items)}
Run: pip install "fastapi[standard]"; fastapi dev main.py (or uvicorn main:app --reload).
Flask (minimal): from flask import Flask, jsonify, request; app = Flask(__name__); @app.route("/hello", methods=["POST"]) def hello(): return jsonify(msg=request.json["name"]); flask --app app run --debug. Django for full-stack apps with ORM/admin/auth.
Scraping: requests + BeautifulSoup (bs4): soup = BeautifulSoup(html, "html.parser"); soup.select("a.title"); respect robots.txt/terms, add delays; JS-heavy sites need Playwright.
Secrets: read from environment (os.environ["API_KEY"], python-dotenv for .env) — never hard-code or commit them.`),

  c('data-science', 'Python for data: NumPy, pandas, matplotlib basics', ['pandas', 'numpy', 'matplotlib', 'dataframe', 'read csv pandas', 'groupby pandas', 'plot python', 'data analysis python', 'jupyter'],
    `NumPy (fast arrays): import numpy as np; a = np.array([1, 2, 3]); np.zeros((3, 4)); np.arange(0, 10, 2); np.linspace(0, 1, 5); a.shape, a.dtype, a.reshape(3, 1); vectorised maths a * 2, a ** 2, np.sqrt(a), a.mean(), a.std(), a.sum(axis=0); boolean masks a[a > 1]; broadcasting; np.random.default_rng(42).normal(size=100). Avoid Python loops over arrays.
pandas (tables):
import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
df.head(); df.info(); df.describe(); df.shape; df.columns
df["total"] = df["price"] * df["qty"]
df[df["country"] == "CA"]; df.loc[df["qty"] > 5, ["name", "qty"]]; df.iloc[0:10]
df.groupby("category")["total"].agg(["sum", "mean", "count"]).sort_values("sum", ascending=False)
df.dropna(subset=["price"]); df.fillna(0); df.drop_duplicates(); df.rename(columns={"qty": "quantity"}); df.astype({"qty": int})
pd.merge(orders, customers, on="customer_id", how="left"); pd.concat([df1, df2]); df.pivot_table(index="month", columns="region", values="total", aggfunc="sum")
df["date"].dt.month; df["name"].str.lower(); df.apply(fn, axis=1) (slow — prefer vectorised ops)
df.to_csv("out.csv", index=False); df.to_excel / to_json / to_parquet.
SettingWithCopyWarning → use .loc for assignment or .copy() the slice.
matplotlib: import matplotlib.pyplot as plt; plt.plot(x, y, label="sales"); plt.bar; plt.scatter; plt.hist; plt.xlabel/ylabel/title; plt.legend(); plt.tight_layout(); plt.savefig("chart.png", dpi=150); plt.show(). df.plot(kind="bar") directly from pandas; seaborn for statistical plots.
Notebooks: Jupyter / VS Code notebooks for exploration; scripts for production. Machine learning: scikit-learn (fit/predict, train_test_split), PyTorch/TensorFlow for deep learning.`),

  c('testing-tooling', 'Python testing and code quality: pytest, unittest, ruff, black, debugging', ['pytest', 'unit test python', 'unittest', 'ruff', 'black formatter', 'debug python', 'pdb', 'breakpoint', 'mock python', 'fixtures pytest'],
    `pytest (de facto standard): pip install pytest; tests in tests/test_*.py, functions named test_*; run pytest -q (-k name to filter, -x stop at first failure, -s show prints, --lf rerun last failures).
# tests/test_calc.py
import pytest
from calc import divide
def test_divide(): assert divide(6, 3) == 2
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError): divide(1, 0)
@pytest.mark.parametrize("a,b,expected", [(1, 1, 2), (2, 3, 5)])
def test_add(a, b, expected): assert add(a, b) == expected
@pytest.fixture
def client(): return make_test_client()   # used by naming it as a test parameter
Floats: assert x == pytest.approx(0.3). Temporary files: tmp_path fixture. Mocks: unittest.mock.patch("module.func", return_value=...), monkeypatch fixture (env vars, attributes). Coverage: pytest --cov=src (pytest-cov).
unittest (built in): class TestX(unittest.TestCase): def test_y(self): self.assertEqual(a, b); python -m unittest.
Quality: ruff (lint + format, very fast: ruff check --fix, ruff format), black (formatter), mypy/pyright (types), pre-commit hooks.
Debugging: print/f"{x=}" for quick checks; breakpoint() drops into pdb (n next, s step, c continue, p expr, l list, q quit); VS Code debugger; logging with levels; traceback.print_exc(); python -X dev for extra warnings.
Profiling: python -m cProfile -s cumtime script.py; timeit for micro-benchmarks (python -m timeit "sum(range(1000))").`),

  c('performance-idioms', 'Pythonic code and performance: idioms, common mistakes, speed tips', ['pythonic code', 'python best practices', 'python performance', 'python idioms', 'pep 8', 'python mistakes', 'speed up python', 'list vs set lookup'],
    `Idioms: for i, x in enumerate(xs) (not range(len(xs))); for a, b in zip(xs, ys); with open(...) for resources; f-strings; "".join(parts); dict.get(k, default); comprehensions over map/filter+lambda; unpacking (first, *rest = items); any()/all(); sorted(key=...); collections.Counter/defaultdict; pathlib over os.path; is None (not == None); if items: (not len(items) > 0); EAFP try/except for dict/file access; enumerate(start=1).
PEP 8: 4-space indents, snake_case, max ~88-100 chars (ruff/black), two blank lines between top-level defs, imports at the top grouped stdlib/third-party/local.
Common mistakes: mutable default args; modifying a list while iterating; list.sort() returns None; = vs == ; integer vs float division; shadowing built-ins (list = [...], str = ...); catching bare except; forgetting to call a function (if is_ready: instead of if is_ready():); late binding in lambdas in a loop (lambda i=i: i); comparing floats with ==; forgetting encoding="utf-8"; using is for numbers/strings.
Performance: pick the right structure (set/dict membership O(1), deque for queues, heapq for priority queues, bisect for sorted inserts); avoid repeated string concatenation; use built-ins (sum, min, max, sorted are C-fast); local variables are faster than globals in hot loops; generators for big data; lru_cache for repeated pure calls; NumPy/pandas vectorisation for numbers; multiprocessing for CPU-bound work; profile before optimising. PyPy can speed up pure-Python loops.
Readability counts (import this): explicit names, small functions, early returns, docstrings for public functions, type hints on interfaces.`),

  c('stdlib-handy', 'Handy Python standard library: datetime, random, re, subprocess, argparse, time, math, os.environ', ['python datetime', 'python random', 'python regex re', 'subprocess python', 'argparse', 'python time sleep', 'python math module', 'environment variables python', 'uuid secrets'],
    `datetime: from datetime import datetime, date, timedelta, timezone; now = datetime.now(timezone.utc); datetime.now(ZoneInfo("America/Toronto")) (from zoneinfo import ZoneInfo); now + timedelta(days=7); (d2 - d1).days; dt.strftime("%Y-%m-%d %H:%M"); datetime.strptime("2026-10-05", "%Y-%m-%d"); datetime.fromisoformat(s); dt.isoformat(); date.today(); timestamp ↔ datetime.fromtimestamp(ts, tz=timezone.utc). Prefer timezone-aware datetimes.
random: random.randint(1, 6) (inclusive), random.random(), random.choice(seq), random.choices(seq, weights, k), random.sample(seq, k) (no repeats), random.shuffle(lst) (in place), random.seed(42). For tokens/passwords use secrets: secrets.token_hex(16), secrets.token_urlsafe(), secrets.choice; uuid.uuid4().
re: re.search(pattern, s) (first match anywhere) / re.match (start only) / re.fullmatch / re.findall / re.finditer / re.sub(p, repl, s) / re.split; groups m.group(1), named (?P<name>...) → m["name"]; flags re.I, re.M, re.S; compile reusable patterns; raw strings r"\\d+".
subprocess: result = subprocess.run(["git", "status"], capture_output=True, text=True, check=True); result.stdout. Pass a LIST (no shell=True with user input — command injection).
argparse: p = argparse.ArgumentParser(description="..."); p.add_argument("path"); p.add_argument("-n", type=int, default=5); p.add_argument("--verbose", action="store_true"); args = p.parse_args(). (click/typer for nicer CLIs.)
time: time.sleep(1.5), time.time() (epoch seconds), time.perf_counter() (for measuring), time.monotonic().
math: sqrt, ceil, floor, gcd, lcm, factorial, comb, perm, isclose, pi, e, inf, log, sin/cos, hypot, prod; statistics: mean, median, mode, stdev.
os.environ.get("KEY", "default"); sys.argv; sys.exit(1); sys.path; platform.system(); shutil.which("git"); hashlib.sha256(data).hexdigest(); base64; zipfile; textwrap.dedent; pprint.pprint; copy.deepcopy; heapq.nlargest(3, data); bisect.insort.`),

  c('scripts-automation', 'Python automation scripts: examples (rename files, CSV report, web request, scheduler, CLI)', ['python script example', 'automate with python', 'python automation', 'rename files script', 'python cli tool', 'schedule python script', 'python bot script', 'beginner python project'],
    `Rename every file in a folder to lowercase with a date prefix:
from pathlib import Path
from datetime import date
folder = Path("photos")
for f in sorted(folder.iterdir()):
    if f.is_file():
        new = f.with_name(f"{date.today():%Y%m%d}_{f.name.lower()}")
        if not new.exists(): f.rename(new)
Count words in a text file and show the top 10:
import re, sys
from collections import Counter
text = open(sys.argv[1], encoding="utf-8").read().lower()
for word, n in Counter(re.findall(r"[a-zà-ÿ']+", text)).most_common(10): print(f"{word:15} {n}")
Simple CLI with argparse + main():
import argparse
def main() -> int:
    p = argparse.ArgumentParser(description="Convert °C to °F")
    p.add_argument("celsius", type=float)
    args = p.parse_args()
    print(f"{args.celsius}°C = {args.celsius * 9 / 5 + 32:.1f}°F")
    return 0
if __name__ == "__main__": raise SystemExit(main())
Run something every 10 minutes: a while True loop with time.sleep(600) (simple), the schedule library (schedule.every(10).minutes.do(job)), or the OS scheduler (cron / launchd / Task Scheduler) — better for long-running jobs. APScheduler inside apps.
Number guessing game:
import random
secret = random.randint(1, 100)
while (guess := int(input("Guess 1-100: "))) != secret:
    print("Too low!" if guess < secret else "Too high!")
print("You got it!")
Send notifications: smtplib/email for mail, a Discord webhook via requests.post(webhook_url, json={"content": "Done!"}).
Packaging a script as a command: [project.scripts] in pyproject.toml, or pipx install.`),
];
