import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('csharp', slug, title, keywords, content);

export const CODE_CSHARP = [
  c('basics', 'C# basics: .NET setup, types, strings, control flow, methods, nullable', ['c# basics', 'csharp hello world', 'dotnet new console', 'c# types', 'string interpolation c#', 'c# nullable', 'c# methods', 'c# switch expression', 'var c#'],
    `Setup: install the .NET SDK; dotnet new console -n App; cd App; dotnet run. Top-level statements (Program.cs): Console.WriteLine("Hi"); string? name = Console.ReadLine();
Types: int, long, double, decimal (money: 19.99m), float (2.5f), bool, char, string, object; var infers types; const / readonly. Value types (struct, int, enums) vs reference types (class, string, arrays).
Strings: $"Hi {name}, you are {age} years old, total {price:C2}"; verbatim @"C:\\path"; raw """...""" (C# 11); string.Join(", ", list); s.Split(','); s.Trim(); s.Contains("x"); s.Replace; s.ToUpper(); string.IsNullOrWhiteSpace(s); StringBuilder for loops.
Parse input: if (int.TryParse(Console.ReadLine(), out int n)) { ... } (int.Parse throws on bad input).
Control: if/else, switch statement, switch expressions: var label = score switch { >= 90 => "A", >= 80 => "B", _ => "F" }; pattern matching: if (obj is string s && s.Length > 0); for, foreach (var item in list), while, do-while.
Methods: static int Add(int a, int b) => a + b; optional/named parameters (int x = 0; Add(b: 2, a: 1)); ref / out / in parameters; params int[] values; tuples: (int min, int max) MinMax(...) => (1, 9); var (lo, hi) = MinMax();
Nullable reference types (enabled by default): string? may be null; null-conditional user?.Name, null-coalescing name ?? "anon", ??= ; ! suppresses warnings (use sparingly).
Collections: List<int> nums = [1, 2, 3]; (C# 12 collection expressions) nums.Add(4); Dictionary<string, int> d = new(); d["a"] = 1; d.TryGetValue(k, out var v); HashSet<T>, Queue<T>, Stack<T>, arrays int[] a = new int[5].
Naming: PascalCase for types/methods/properties, camelCase for locals/parameters, _camelCase for private fields, interfaces start with I.`),

  c('oop-linq', 'C# OOP and LINQ: classes, properties, records, interfaces, inheritance, generics, LINQ queries', ['c# class', 'c# properties', 'c# record', 'c# interface', 'c# inheritance', 'c# generics', 'linq', 'linq where select', 'c# lambda', 'c# events delegates'],
    `public class Player {
    public string Name { get; }                   // read-only property
    public int Health { get; private set; } = 100; // auto-property with private setter
    public Player(string name) => Name = name;
    public void TakeDamage(int amount) { Health = Math.Max(0, Health - amount); }
}
Primary constructors (C# 12): public class Service(ILogger logger) { ... }. Object initialisers: new Item { Name = "Sword", Price = 10 }; required / init-only properties.
Records (value equality, immutable data): public record Point(int X, int Y); var p2 = p1 with { X = 5 };
Interfaces: public interface IShape { double Area(); } class Circle(double r) : IShape { public double Area() => Math.PI * r * r; }. Abstract classes + abstract/virtual/override; sealed; base.Method(); static classes for helpers; extension methods: public static class StringExt { public static bool IsBlank(this string s) => string.IsNullOrWhiteSpace(s); }
Generics: class Box<T> { public T Value { get; set; } } T Max<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) > 0 ? a : b;
Delegates/lambdas/events: Func<int, int> sq = x => x * x; Action<string> log = Console.WriteLine; Predicate<T>; public event EventHandler<int>? Scored; Scored?.Invoke(this, 10);
LINQ (using System.Linq): var adults = people.Where(p => p.Age >= 18).OrderBy(p => p.Name).Select(p => p.Name).ToList(); First/FirstOrDefault, Single, Any, All, Count, Sum, Average, Max/MaxBy, GroupBy(p => p.City), ToDictionary, Distinct/DistinctBy, Skip/Take, Chunk, Zip, SelectMany (flatten), Aggregate. Deferred execution: queries run when enumerated — call ToList() to materialise once.
Enums: enum State { Idle, Running } ; [Flags] for bit flags. Structs for small value types. Pattern matching: switch on types (Circle c => ..., { Age: > 18 } => ...).`),

  c('async-errors-files', 'C# async/await, exceptions, files, JSON, HTTP, common errors', ['c# async await', 'task c#', 'c# exceptions', 'try catch c#', 'c# file read', 'system text json', 'httpclient', 'nullreferenceexception', 'c# using statement'],
    `Async: async Task<string> LoadAsync(string url) { using var http = new HttpClient(); return await http.GetStringAsync(url); } (in real apps reuse one HttpClient / IHttpClientFactory). Parallel: await Task.WhenAll(t1, t2); timeouts with CancellationToken; never .Result/.Wait() on UI threads (deadlocks); async void only for event handlers; await Task.Delay(1000).
Exceptions: try { ... } catch (FileNotFoundException ex) { ... } catch (Exception ex) when (ex.Message.Contains("x")) { } finally { }; throw new ArgumentException("msg", nameof(param)); rethrow with throw; (keeps the stack trace). ArgumentNullException.ThrowIfNull(x).
using disposes resources: using var stream = File.OpenRead(path); (IDisposable/IAsyncDisposable).
Files: File.ReadAllText/WriteAllText, File.ReadAllLinesAsync, File.AppendAllText, File.Exists, Directory.CreateDirectory, Directory.GetFiles(dir, "*.txt"), Path.Combine(a, b), StreamReader for big files.
JSON (System.Text.Json): var json = JsonSerializer.Serialize(obj, new JsonSerializerOptions { WriteIndented = true }); var obj = JsonSerializer.Deserialize<Player>(json); [JsonPropertyName("name")].
Common errors: NullReferenceException (something is null — check with ?. / ?? / debugger), IndexOutOfRangeException / ArgumentOutOfRangeException, InvalidCastException, FormatException (int.Parse on bad text → TryParse), InvalidOperationException "Collection was modified" (don't modify a list while foreach-ing — loop over a copy or use RemoveAll), CS0103 "name does not exist" (scope/typo/missing using), CS0029 cannot convert type, CS1061 no definition for member, CS0120 object reference required (calling instance members from static Main), CS8618 non-nullable property not initialised.
Ecosystem: ASP.NET Core (web APIs: var app = WebApplication.Create(); app.MapGet("/hello", () => "Hi"); app.Run();), Entity Framework Core (ORM), Blazor, MAUI (apps), WPF/WinForms, xUnit/NUnit tests, NuGet packages (dotnet add package X).`),

  c('unity', 'Unity C# scripting: MonoBehaviour lifecycle, movement, physics, input, prefabs, coroutines', ['unity c#', 'unity script', 'monobehaviour', 'unity movement script', 'unity rigidbody', 'unity collision', 'unity input system', 'unity coroutine', 'instantiate prefab', 'unity raycast', 'getcomponent'],
    `using UnityEngine;
public class PlayerController : MonoBehaviour {
    [SerializeField] private float speed = 5f;      // editable in the Inspector, stays private
    [SerializeField] private float jumpForce = 6f;
    private Rigidbody rb;
    private bool grounded;
    void Awake() { rb = GetComponent<Rigidbody>(); }   // cache components once
    void Update() {                                   // every frame: read input here
        if (Input.GetButtonDown("Jump") && grounded) rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
    }
    void FixedUpdate() {                              // physics step: move rigidbodies here
        var input = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
        rb.linearVelocity = new Vector3(input.x * speed, rb.linearVelocity.y, input.z * speed); // rb.velocity before Unity 6
    }
    void OnCollisionEnter(Collision c) { if (c.gameObject.CompareTag("Ground")) grounded = true; }
    void OnCollisionExit(Collision c) { if (c.gameObject.CompareTag("Ground")) grounded = false; }
}
Lifecycle: Awake → OnEnable → Start → (FixedUpdate / Update / LateUpdate per frame; camera follow in LateUpdate) → OnDisable → OnDestroy. The file name must match the class name.
Non-physics movement: transform.Translate(dir * speed * Time.deltaTime); always multiply by Time.deltaTime in Update. Rotation: transform.Rotate, Quaternion.LookRotation, Quaternion.Slerp. CharacterController.Move for FPS controllers.
Physics: Rigidbody (3D) / Rigidbody2D + colliders; triggers (Is Trigger) → OnTriggerEnter(Collider other); OnCollisionEnter2D/OnTriggerEnter2D in 2D. Raycast: if (Physics.Raycast(origin, dir, out RaycastHit hit, 100f, layerMask)) { hit.collider... }.
New Input System: PlayerInput component or InputAction: moveAction.ReadValue<Vector2>().
Prefabs: [SerializeField] GameObject bulletPrefab; Instantiate(bulletPrefab, firePoint.position, firePoint.rotation); Destroy(gameObject, 3f). Object pooling for many spawns.
Coroutines: StartCoroutine(Flash()); IEnumerator Flash() { sr.color = Color.red; yield return new WaitForSeconds(0.2f); sr.color = Color.white; }
Finding things: GetComponent<T>() (cache it), references through the Inspector (best), FindFirstObjectByType<T>() (slow; avoid in Update), tags/layers. Singletons for managers (GameManager.Instance). ScriptableObjects for shared data (items, stats). UI: TextMeshPro (using TMPro; scoreText.text = $"Score: {score}"), Button.onClick.AddListener. Scenes: SceneManager.LoadScene("Level2"). Save: PlayerPrefs (small values) or JSON files in Application.persistentDataPath.
Common errors: NullReferenceException (unassigned Inspector field or GetComponent returned null), "The referenced script on this Behaviour is missing" (class/file name mismatch or compile error), things not colliding (needs a Rigidbody on at least one object, matching 2D/3D, layer matrix).`),
];
