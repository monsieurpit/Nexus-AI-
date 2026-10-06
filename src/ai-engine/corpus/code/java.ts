import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('java', slug, title, keywords, content);

export const CODE_JAVA = [
  c('basics', 'Java basics: program structure, types, strings, Scanner input, control flow, methods', ['java basics', 'java hello world', 'public static void main', 'java scanner input', 'java string methods', 'java types', 'javac compile', 'java switch'],
    `public class Main {                          // file must be named Main.java
    public static void main(String[] args) {
        var sc = new java.util.Scanner(System.in);
        System.out.print("Name? ");
        String name = sc.nextLine();
        System.out.printf("Hi %s, %d chars%n", name, name.length());
    }
}
Run: java Main.java (single file, Java 11+) or javac Main.java && java Main. Install a JDK (Temurin 21 LTS). Build tools: Maven (pom.xml) or Gradle.
Types: primitives int, long (10L), double, float (1.5f), boolean, char, byte, short; wrappers Integer, Double... (needed in collections; autoboxing; compare wrappers with .equals, not ==). var for local inference. final = constant.
Strings are immutable: s.length(), charAt(i), substring(a, b), indexOf, contains, startsWith, toUpperCase, trim/strip, split(","), replace, isBlank, repeat(3), String.join(", ", list), String.format / "%s".formatted(x), text blocks """ ... """. Compare with s.equals(t) / equalsIgnoreCase — never == . StringBuilder for building in loops.
Scanner gotcha: nextInt() leaves the newline — call nextLine() after it, or read lines and Integer.parseInt(line) (throws NumberFormatException).
Control: if/else, switch expressions: String day = switch (n) { case 1, 7 -> "weekend"; default -> "weekday"; }; pattern matching: if (obj instanceof String s); for, enhanced for (for (String s : list)), while, do-while, labelled break.
Methods: static int add(int a, int b) { return a + b; } — Java is pass-by-value (object references are copied, so you can mutate the object but not reassign the caller's variable). Overloading by parameter types; varargs int... nums.
Arrays: int[] a = new int[5]; int[] b = {1, 2, 3}; a.length; Arrays.sort(a); Arrays.toString(a); Arrays.fill; 2D int[][] grid = new int[3][4].
Math: Math.max/min/abs/pow/sqrt/round/floor, Math.random(), integer division 5 / 2 == 2; use (double) casts.`),

  c('oop-collections', 'Java OOP and collections: classes, inheritance, interfaces, records, enums, generics, ArrayList, HashMap, streams', ['java class', 'java inheritance', 'java interface', 'java record', 'java enum', 'arraylist', 'hashmap java', 'java streams', 'java generics', 'java lambda', 'java optional'],
    `public class Account {
    private final String owner; private double balance;
    public Account(String owner) { this.owner = owner; }
    public void deposit(double amount) { if (amount <= 0) throw new IllegalArgumentException("amount"); balance += amount; }
    public double getBalance() { return balance; }
    @Override public String toString() { return owner + ": " + balance; }
}
Encapsulation: private fields + getters/setters; static members belong to the class. Override equals AND hashCode together (or use records).
Records (Java 16+): public record Point(int x, int y) {} — immutable, auto constructor/getters (p.x())/equals/hashCode/toString.
Inheritance: class Dog extends Animal { @Override void speak() { System.out.println("Woof"); } } super(...) / super.method(); abstract classes; final classes/methods; sealed interfaces (sealed interface Shape permits Circle, Square).
Interfaces: interface Shape { double area(); default String describe() { return "Area " + area(); } } class Circle implements Shape.
Enums: enum Status { ACTIVE, BANNED; } with fields/constructors/methods; switch over them.
Generics: class Box<T> { T value; } static <T extends Comparable<T>> T max(T a, T b); wildcards List<? extends Number>.
Collections: List<String> list = new ArrayList<>(); list.add("a"); list.get(0); list.remove(0); list.size(); List.of(1, 2) (immutable); Map<String, Integer> map = new HashMap<>(); map.put(k, v); map.get(k) (null if missing); map.getOrDefault(k, 0); map.merge(word, 1, Integer::sum) (counting); map.containsKey; for (var e : map.entrySet()) e.getKey(); Set<T> set = new HashSet<>(); TreeMap/TreeSet (sorted), LinkedHashMap (insertion order), ArrayDeque (stack/queue), PriorityQueue. Collections.sort(list) / list.sort(Comparator.comparing(Person::age).reversed()).
Don't remove from a list inside a for-each (ConcurrentModificationException) — use list.removeIf(x -> ...) or an Iterator.
Lambdas & streams: list.stream().filter(p -> p.age() >= 18).map(Person::name).sorted().toList(); collect(Collectors.groupingBy(Person::city, Collectors.counting())); mapToInt(...).sum(); anyMatch; reduce; IntStream.range(0, 10). Optional<T>: opt.orElse(def), opt.ifPresent(...), map — don't call get() blindly.`),

  c('errors-io-ecosystem', 'Java exceptions, files, threads, Spring Boot, Minecraft modding, common errors', ['java exceptions', 'try catch java', 'java file read', 'java threads', 'spring boot', 'nullpointerexception', 'java common errors', 'minecraft plugin java', 'spigot paper', 'android java'],
    `Exceptions: try { ... } catch (IOException | NumberFormatException e) { e.printStackTrace(); } finally { }. Checked exceptions (IOException) must be caught or declared (throws IOException); unchecked (RuntimeException subclasses) don't. try-with-resources closes automatically: try (var reader = Files.newBufferedReader(path)) { ... }. Custom: class InsufficientFundsException extends RuntimeException.
Files (java.nio.file): Path p = Path.of("data.txt"); String text = Files.readString(p); List<String> lines = Files.readAllLines(p); Files.writeString(p, "hi"); Files.exists(p); Files.createDirectories(dir); Files.walk(dir).
Concurrency: virtual threads (Java 21): try (var ex = Executors.newVirtualThreadPerTaskExecutor()) { ex.submit(() -> work()); }; ExecutorService, CompletableFuture.supplyAsync(...).thenApply(...); synchronized blocks, AtomicInteger, ConcurrentHashMap.
HTTP: HttpClient.newHttpClient().send(HttpRequest.newBuilder(URI.create(url)).build(), HttpResponse.BodyHandlers.ofString()).body(); JSON with Jackson/Gson.
Common errors: NullPointerException (calling a method on null — helpful messages say which variable), ArrayIndexOutOfBoundsException, ClassCastException, NumberFormatException, ConcurrentModificationException, StackOverflowError (infinite recursion), OutOfMemoryError; compile errors: "cannot find symbol" (typo/missing import/scope), "incompatible types", "missing return statement", "class X is public, should be declared in a file named X.java", "non-static method cannot be referenced from a static context" (create an object or make it static), "unreported exception must be caught or declared".
Spring Boot (web/APIs): @RestController class Hello { @GetMapping("/hello/{name}") String hi(@PathVariable String name) { return "Hi " + name; } } with Spring Data JPA (@Entity, JpaRepository), start at start.spring.io.
Minecraft: Paper/Spigot plugins (class MyPlugin extends JavaPlugin { onEnable() { getServer().getPluginManager().registerEvents(this, this); } @EventHandler void onJoin(PlayerJoinEvent e) { e.getPlayer().sendMessage("Welcome!"); } } + plugin.yml with name/version/main/api-version), Fabric/Forge/NeoForge for mods. Android: Kotlin is preferred today.
Tests: JUnit 5 (@Test void adds() { assertEquals(3, add(1, 2)); }), Mockito.`),
];
