import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('kotlin', slug, title, keywords, content);

export const CODE_KOTLIN = [
  c('basics', 'Kotlin basics: null safety, collections, classes, data classes, coroutines, Android Jetpack Compose', ['kotlin basics', 'kotlin null safety', 'kotlin data class', 'kotlin coroutines', 'jetpack compose', 'android kotlin', 'kotlin when', 'kotlin collections', 'kotlin extension functions'],
    `fun main() { val name = "Ana"; var count = 0; count++; println("Hi $name, \${name.length} letters") }
val = read-only, var = mutable; type inference; explicit val price: Double = 9.99. Strings: templates $x / \${expr}, triple-quoted raw strings, trimIndent().
Null safety: String can't be null, String? can. Safe call user?.name, Elvis user?.name ?: "anon", let blocks user?.let { greet(it) }, !! throws NPE (avoid), smart casts after null checks (if (s != null) s.length).
Control: if is an expression; when (x) { 1, 2 -> "small"; in 3..10 -> "medium"; is String -> ...; else -> "big" }; for (i in 0 until 10), for (i in 10 downTo 0 step 2), for ((k, v) in map), while; ranges 1..5.
Functions: fun add(a: Int, b: Int = 0): Int = a + b; named arguments; extension functions fun String.shout() = uppercase() + "!"; lambdas { x -> x * 2 } / it; higher-order functions.
Collections: listOf (read-only) vs mutableListOf; mapOf("a" to 1), mutableMapOf, setOf; filter, map, forEach, first/firstOrNull, sumOf, groupBy, associateBy, sortedBy, sortedByDescending, partition, chunked, zip, any/all/none, count, flatMap, distinct, take/drop; sequences for big lazy pipelines.
Classes: class User(val name: String, var age: Int = 0) { fun birthday() { age++ } } — primary constructor properties; init blocks; open classes/methods to allow inheritance (final by default); abstract; interfaces with default methods; data class Point(val x: Int, val y: Int) (equals/hashCode/toString/copy/destructuring); object (singleton); companion object (static-like); sealed classes/interfaces for closed hierarchies with exhaustive when; enum class.
Scope functions: let, run, with, apply (configure an object: Paint().apply { color = RED }), also.
Errors: try/catch is an expression; runCatching { }.getOrElse { }; require(x > 0) / check / error("msg").
Coroutines (kotlinx.coroutines): suspend fun load(): Data = withContext(Dispatchers.IO) { api.fetch() }; viewModelScope.launch { val d = load() }; async/await for parallel work; Flow for streams (flow.collect { }); structured concurrency cancels children.
Android with Jetpack Compose:
@Composable fun Counter() { var count by remember { mutableStateOf(0) }; Column(Modifier.padding(16.dp)) { Text("Count: $count", style = MaterialTheme.typography.headlineMedium); Button(onClick = { count++ }) { Text("Add") } } }
Row/Column/Box, LazyColumn { items(list) { ItemRow(it) } }, Modifier chains (fillMaxWidth, padding, clickable), state hoisting, ViewModel + StateFlow (collectAsStateWithLifecycle), Navigation Compose, Room (database), Retrofit/Ktor (HTTP), Hilt (DI). Build with Gradle (Kotlin DSL build.gradle.kts).
Also: Ktor/Spring Boot servers, Kotlin Multiplatform, Minecraft Fabric mods (Kotlin adapter), Paper plugins in Kotlin.`),
];
