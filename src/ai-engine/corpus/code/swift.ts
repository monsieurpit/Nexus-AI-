import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('swift', slug, title, keywords, content);

export const CODE_SWIFT = [
  c('basics', 'Swift basics: optionals, collections, structs vs classes, protocols, closures, errors, async', ['swift basics', 'swift optionals', 'if let guard let', 'swift struct vs class', 'swift protocol', 'swift closures', 'swift async await', 'swift error handling', 'swift array dictionary', 'swift enum'],
    `let constant = 10; var count = 0; type inference, explicit: let price: Double = 9.99. Strings: "Hi \\(name)"; multi-line """ """; s.count; s.uppercased(); s.contains("x"); s.split(separator: ","); s.hasPrefix.
Optionals: var nick: String? = nil. Unwrap safely: if let nick { print(nick) } / guard let user else { return } / nick ?? "anon" / user?.address?.city (chaining). Force unwrap ! crashes on nil — avoid.
Collections: var nums = [1, 2, 3]; nums.append(4); nums.count; nums.first; nums.map { $0 * 2 }.filter { $0 > 2 }.reduce(0, +); sorted(by: >); contains; var ages: [String: Int] = ["Ana": 20]; ages["Ben"] = 30; ages["Zoe", default: 0] += 1; Set<String>.
Control: if/else, switch (exhaustive, no fallthrough, ranges and patterns: case 0..<10:, case let (x, y) where x == y:), for i in 0..<5, for (k, v) in dict, while, repeat-while.
Functions: func greet(_ name: String, times: Int = 1) -> String { } (argument labels), inout parameters, multiple returns via tuples. Closures: let sq = { (x: Int) -> Int in x * x }; trailing closures: nums.sorted { $0 > $1 }; @escaping; [weak self] in stored closures to avoid retain cycles.
Structs (value types, copied — prefer by default) vs classes (reference types, inheritance, deinit; ARC memory management). mutating funcs modify struct properties. Computed properties var area: Double { w * h }; property observers didSet; lazy var.
Enums with associated values: enum Result { case success(Data), failure(Error) }; raw values enum Planet: Int; CaseIterable.
Protocols: protocol Shape { var area: Double { get } } extensions add methods (extension Int { var squared: Int { self * self } }); generics func swap<T>(...) with constraints <T: Comparable>; some View / any Shape.
Errors: enum LoginError: Error { case wrongPassword } func login() throws { throw LoginError.wrongPassword } do { try login() } catch LoginError.wrongPassword { } catch { print(error) }; try? (nil on failure), try! (crash).
Concurrency: func load() async throws -> [Post] { let (data, _) = try await URLSession.shared.data(from: url); return try JSONDecoder().decode([Post].self, from: data) } Task { await ... }; async let for parallel work; actors protect mutable state; @MainActor for UI updates. Codable structs for JSON.
Common errors: "Unexpectedly found nil while unwrapping an Optional value" (a force unwrap or implicitly unwrapped IBOutlet), "Index out of range", "Cannot convert value of type", "Value of optional type must be unwrapped".`),

  c('swiftui', 'SwiftUI: views, state, bindings, lists, navigation, MVVM with @Observable', ['swiftui', 'swiftui state', 'swiftui binding', 'swiftui list', 'navigationstack', 'swiftui observable', 'ios app swiftui', 'swiftui button', 'swiftui vstack'],
    `import SwiftUI
struct ContentView: View {
    @State private var count = 0
    @State private var name = ""
    var body: some View {
        VStack(spacing: 16) {
            Text("Count: \\(count)").font(.largeTitle).bold()
            Button("Add") { count += 1 }.buttonStyle(.borderedProminent)
            TextField("Name", text: $name).textFieldStyle(.roundedBorder)
        }
        .padding()
    }
}
Layout: VStack/HStack/ZStack, Spacer(), LazyVGrid(columns:), ScrollView, frame(maxWidth: .infinity), padding, background, cornerRadius/clipShape(.rect(cornerRadius: 12)), foregroundStyle, Image(systemName: "star.fill") (SF Symbols), AsyncImage(url:).
State: @State (local value), @Binding (child edits parent's state: passes $value), @Observable class model (iOS 17+) with @State var model = Model() in the owner and plain properties/@Bindable in children; older: ObservableObject + @Published + @StateObject/@ObservedObject; @Environment(\\.dismiss); @AppStorage("key") (UserDefaults).
Lists: List(items) { item in Text(item.name) } (items Identifiable) / ForEach with .onDelete; .swipeActions; .searchable(text:).
Navigation: NavigationStack { List(items) { item in NavigationLink(item.name, value: item) }.navigationDestination(for: Item.self) { DetailView(item: $0) }.navigationTitle("Items") }; sheets .sheet(isPresented: $showing) { }; alerts .alert("Title", isPresented: $show) { Button("OK") {} }; TabView.
Async loading: .task { await model.load() } (cancelled when the view disappears); .refreshable.
Persistence: SwiftData (@Model class Item; @Query var items: [Item]; modelContext.insert), Core Data, UserDefaults, files. Previews: #Preview { ContentView() }.
Views are cheap value types recomputed when state changes — keep body free of side effects. Mac apps use the same SwiftUI (plus AppKit when needed).`),
];
