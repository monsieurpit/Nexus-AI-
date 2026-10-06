import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('cpp', slug, title, keywords, content);

export const CODE_CPP = [
  c('basics', 'C++ basics: program structure, types, I/O, compiling, control flow', ['c++ basics', 'cpp hello world', 'cout cin', 'compile c++', 'g++ clang++', 'c++ types', 'c++ auto', 'c++ input', 'c++ loops'],
    `#include <iostream>
#include <string>
int main() {
    std::string name;
    std::cout << "Name? ";
    std::getline(std::cin, name);           // whole line; std::cin >> x reads one word/number
    std::cout << "Hi " << name << '\\n';     // '\\n' is cheaper than std::endl (which flushes)
    return 0;
}
Compile: g++ -std=c++20 -Wall -Wextra -O2 main.cpp -o app && ./app (clang++ same flags; MSVC: cl /std:c++20 /EHsc). Debug builds: -g -fsanitize=address,undefined. Projects: CMake (cmake -B build && cmake --build build).
Types: int, long long (64-bit), unsigned, std::size_t (sizes/indices), double, float, char, bool, fixed width int32_t/uint64_t (<cstdint>). auto deduces types (auto x = 5;). const (runtime constant), constexpr (compile-time), consteval.
Initialisation: prefer braces int x{5}; (no narrowing). Uninitialised local variables hold garbage — always initialise.
Control flow: if/else, if (auto it = m.find(k); it != m.end()) {...} (init-statement), switch (integers/enums; break!), for (int i = 0; i < n; ++i), range-for for (const auto& x : vec), while, do-while, break/continue.
Mixing cin >> and getline: call std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n') after >>. Check input: if (!(std::cin >> n)) { /* not a number */ }.
Fast I/O for competitive programming: std::ios::sync_with_stdio(false); std::cin.tie(nullptr);
Namespaces: avoid using namespace std; in headers (fine in small .cpp files); namespace app { ... }.
Headers: declarations in .hpp (with #pragma once), definitions in .cpp; templates usually live entirely in headers.`),

  c('stl-containers', 'C++ STL containers and algorithms: vector, string, map, unordered_map, set, algorithms, ranges', ['c++ vector', 'std map', 'unordered map', 'std set', 'c++ string', 'stl algorithms', 'std sort', 'c++ ranges', 'c++ array', 'priority queue c++', 'std optional'],
    `std::vector<int> v{3, 1, 2}; v.push_back(4); v.emplace_back(5); v.size(); v[i] (no bounds check) / v.at(i) (throws); v.back(); v.pop_back(); v.insert(v.begin() + 1, 9); v.erase(v.begin() + i); v.clear(); v.reserve(1000); 2D: std::vector<std::vector<int>> grid(rows, std::vector<int>(cols, 0)).
Erase-remove: std::erase_if(v, [](int x) { return x % 2 == 0; }); (C++20).
std::string s = "hello"; s.size(); s.substr(pos, len); s.find("ll") (std::string::npos if missing); s += "!"; s.starts_with("he") (C++20); std::to_string(42); std::stoi("42"); std::string_view for read-only parameters.
std::array<int, 3> a{}; (fixed size, stack). std::deque, std::list (rarely worth it).
std::map<std::string, int> m; (sorted, O(log n)); std::unordered_map (hash, O(1) avg); m["key"]++ (inserts default if missing); m.contains(k) (C++20) / m.find(k) != m.end(); m.at(k) (throws); for (const auto& [key, val] : m).
std::set / std::unordered_set (unique values): s.insert(x); s.count(x). multimap/multiset allow duplicates.
std::stack, std::queue, std::priority_queue<int> (max-heap; min-heap: std::priority_queue<int, std::vector<int>, std::greater<int>>).
std::pair, std::tuple + structured bindings auto [a, b] = p; std::optional<int> (maybe a value: if (opt) *opt / opt.value_or(0)); std::variant + std::visit; std::any; std::span (view over contiguous data).
<algorithm>/<numeric>: std::sort(v.begin(), v.end()) / std::ranges::sort(v); custom: std::ranges::sort(people, {}, &Person::age) or a lambda (a, b) { return a.age < b.age; }; std::find, std::count_if, std::accumulate(v.begin(), v.end(), 0LL), std::max_element, std::min/max/clamp, std::reverse, std::unique (after sort, + erase), std::binary_search/lower_bound (sorted), std::transform, std::any_of/all_of, std::iota, std::shuffle(v.begin(), v.end(), std::mt19937{std::random_device{}()}).
Ranges (C++20): for (int x : v | std::views::filter([](int x){ return x > 0; }) | std::views::transform([](int x){ return x * x; })). C++23: std::ranges::to<std::vector>(), std::print / std::println("{} {}", a, b), std::format (C++20).
Iterator invalidation: push_back may reallocate a vector (invalidates pointers/iterators/references); don't erase while range-for looping.`),

  c('memory-pointers', 'C++ memory: references, pointers, smart pointers, RAII, move semantics, ownership', ['c++ pointers', 'c++ references', 'smart pointers', 'unique ptr', 'shared ptr', 'raii', 'move semantics', 'new delete c++', 'memory leak c++', 'dangling pointer', 'rule of five'],
    `References: int& r = x; (an alias, can't be null or reseated). Pass large objects by const reference: void print(const std::string& s); modify through a non-const reference. Return by value (moves/copy elision make it cheap).
Pointers: int* p = &x; *p = 5; p == nullptr; pointer arithmetic on arrays. Raw pointers = non-owning observers in modern C++.
Ownership: never use bare new/delete in modern code. RAII: resources (memory, files, locks, sockets) are owned by objects whose destructors release them — automatically, even with exceptions.
std::unique_ptr<T> (sole owner, zero overhead): auto p = std::make_unique<Player>("Ana"); move to transfer: auto q = std::move(p); (p is now null).
std::shared_ptr<T> (shared ownership, ref-counted): auto s = std::make_shared<Texture>(); std::weak_ptr breaks cycles (parent ↔ child).
Containers own their elements; std::vector<std::unique_ptr<Base>> for polymorphic collections.
Stack vs heap: locals live on the stack (fast, freed at scope end); heap via make_unique/containers. Never return a pointer/reference to a local variable (dangling).
Move semantics: std::move casts to an rvalue so resources are transferred, not copied (std::vector<std::string> names = std::move(other);). Moved-from objects are valid but unspecified — don't use them except to assign/destroy.
Rule of zero: let members (string, vector, unique_ptr) manage resources so you write no destructor/copy/move. Rule of five: if you write one of destructor, copy ctor, copy assignment, move ctor, move assignment — consider all five.
Common bugs: use-after-free, double delete, leaks (new without delete), buffer overflows, uninitialised memory, iterator invalidation, dangling string_view/span, returning references to temporaries. Tools: -fsanitize=address,undefined, Valgrind, clang-tidy, -Wall -Wextra -Werror.`),

  c('oop-templates', 'C++ classes, OOP, inheritance, virtual functions, operator overloading, templates, concepts, lambdas', ['c++ class', 'c++ constructor', 'c++ inheritance', 'virtual function', 'c++ polymorphism', 'operator overloading', 'c++ templates', 'c++ concepts', 'c++ lambda', 'c++ struct vs class'],
    `class Account {
public:
    explicit Account(std::string owner, double balance = 0) : owner_{std::move(owner)}, balance_{balance} {}
    void deposit(double amount) { if (amount <= 0) throw std::invalid_argument("amount"); balance_ += amount; }
    [[nodiscard]] double balance() const { return balance_; }   // const = doesn't modify the object
private:
    std::string owner_;
    double balance_;
};
struct = class with public members by default (use for plain data: struct Point { int x{}; int y{}; };). Member initialiser lists initialise in declaration order. explicit stops accidental conversions. = default / = delete special members. static members are shared. friend grants access.
Inheritance & polymorphism:
struct Shape { virtual ~Shape() = default; virtual double area() const = 0; };   // abstract (pure virtual)
struct Circle : Shape { double r; explicit Circle(double r) : r{r} {} double area() const override { return 3.14159 * r * r; } };
std::vector<std::unique_ptr<Shape>> shapes; shapes.push_back(std::make_unique<Circle>(2)); for (const auto& s : shapes) s->area();
Base classes with virtual functions need a virtual destructor. override catches signature mistakes; final stops further overriding. Avoid object slicing (copying Derived into Base by value).
Operators: bool operator==(const Point&) const = default; auto operator<=>(const Point&) const = default; (C++20 generates all comparisons); Point operator+(Point a, const Point& b) { a.x += b.x; a.y += b.y; return a; } friend std::ostream& operator<<(std::ostream& os, const Point& p) { return os << p.x << ',' << p.y; }
Templates: template <typename T> T maxOf(T a, T b) { return a > b ? a : b; } template <typename T> class Stack { std::vector<T> items; public: void push(T x) { items.push_back(std::move(x)); } };
Concepts (C++20): template <std::integral T> T gcd(T a, T b); or auto add(std::floating_point auto a, std::floating_point auto b); custom: template <typename T> concept Printable = requires(T t) { std::cout << t; };
Lambdas: auto add = [](int a, int b) { return a + b; }; captures [x] (copy), [&x] (reference), [=], [&], [this], init capture [n = std::move(name)], mutable; generic [](auto x); std::function<int(int)> to store any callable.
enum class Color { Red, Green }; (scoped, no implicit int conversion).`),

  c('errors-concurrency-modern', 'C++ errors, exceptions, concurrency, files, random, chrono, common compiler errors', ['c++ exceptions', 'try catch c++', 'c++ threads', 'std thread mutex', 'c++ async', 'c++ file io', 'fstream', 'c++ random', 'chrono', 'segmentation fault', 'undefined reference', 'c++ error'],
    `Exceptions: try { ... } catch (const std::out_of_range& e) { std::cerr << e.what(); } catch (const std::exception& e) { } catch (...) { }; throw std::runtime_error("msg"); noexcept on functions that never throw (move constructors!). Alternatives: std::optional, std::expected<T, E> (C++23), error codes. RAII makes exceptions safe.
Files: #include <fstream> std::ifstream in("data.txt"); if (!in) { /* error */ } std::string line; while (std::getline(in, line)) {...} std::ofstream out("out.txt", std::ios::app); out << "text\\n"; std::filesystem::exists(p), create_directories, directory_iterator, path.
Threads: std::jthread t([] { work(); }); (auto-joins, C++20; std::thread must be join()ed or detach()ed). Shared data: std::mutex m; { std::lock_guard lock(m); counter++; } / std::scoped_lock for several mutexes; std::atomic<int> for simple counters; std::condition_variable for waiting; auto fut = std::async(std::launch::async, compute, 42); fut.get(); data races are undefined behaviour (-fsanitize=thread).
Random: std::mt19937 rng{std::random_device{}()}; std::uniform_int_distribution<int> dist(1, 6); dist(rng); (not rand()).
Time: auto start = std::chrono::steady_clock::now(); ... auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - start).count(); std::this_thread::sleep_for(std::chrono::milliseconds(100)); using namespace std::chrono_literals; 500ms.
Common errors:
- Segmentation fault → null/dangling pointer, out-of-bounds index, stack overflow from infinite recursion. Run with -g -fsanitize=address or a debugger (gdb/lldb: run, bt).
- "undefined reference to"/"unresolved external symbol" (linker) → function declared but not defined/compiled/linked (add the .cpp to the build, link the library, template defined in a .cpp).
- "was not declared in this scope" → missing #include, typo, missing std::.
- "no matching function for call" → wrong argument types/const-ness; read the "candidate" notes.
- "multiple definition" → definitions in a header without inline.
- Template error walls → read the first error; concepts give clearer messages.
- Integer overflow (int is 32-bit: use long long), signed/unsigned comparison warnings (v.size() is unsigned), integer division 5 / 2 == 2.
Game/graphics/libraries: SFML, SDL2/3, raylib, Dear ImGui, OpenGL/Vulkan, Unreal Engine (UCLASS, UPROPERTY, Blueprints), Qt (GUI), Boost, fmt, nlohmann/json, Catch2/GoogleTest. Package managers: vcpkg, Conan.`),
];
