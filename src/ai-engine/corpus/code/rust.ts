import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('rust', slug, title, keywords, content);

export const CODE_RUST = [
  c('basics', 'Rust basics: cargo, variables, types, control flow, structs, enums, match, collections', ['rust basics', 'rust hello world', 'cargo new', 'rust variables mut', 'rust struct', 'rust enum', 'rust match', 'rust vec', 'rust hashmap', 'rust string vs str'],
    `cargo new app; cd app; cargo run; cargo build --release; cargo add serde; cargo test; cargo clippy (lints); cargo fmt.
fn main() { let name = "Ana"; let mut count = 0; count += 1; println!("{name} has {count} {}", "items"); }
Variables are immutable unless mut; shadowing (let x = x * 2;) is allowed; const MAX: u32 = 100;
Types: i32 (default int), i64, u8, u32, u64, usize (indices/lengths), f64, bool, char (Unicode), tuples (i32, f64), arrays [i32; 3]; explicit conversions with as or From/TryFrom (u8::try_from(x)).
Strings: String (owned, growable) vs &str (borrowed slice). let s = String::from("hi"); s.push_str("!"); format!("{a}-{b}"); s.len() (bytes); s.chars(); s.split(','); s.trim(); s.to_uppercase(); &s[..] / s.as_str(). Index by chars, not s[0].
Control: if is an expression (let v = if ok { 1 } else { 0 };); loop (with break value), while, for x in 0..10 / for x in v.iter() / for (i, x) in v.iter().enumerate().
Structs: struct User { name: String, age: u32 } impl User { fn new(name: &str) -> Self { Self { name: name.to_string(), age: 0 } } fn birthday(&mut self) { self.age += 1; } } #[derive(Debug, Clone, PartialEq)] → println!("{:?}", u) / {:#?}.
Enums + match (must be exhaustive): enum Shape { Circle(f64), Rect { w: f64, h: f64 } } fn area(s: &Shape) -> f64 { match s { Shape::Circle(r) => 3.14 * r * r, Shape::Rect { w, h } => w * h } } if let Some(x) = opt { } ; let Some(x) = opt else { return; };
Option<T> (Some/None) replaces null; Result<T, E> (Ok/Err) replaces exceptions.
Collections: let mut v = vec![1, 2, 3]; v.push(4); v.get(10) (Option) vs v[10] (panics); v.sort(); v.iter().map(|x| x * 2).filter(|x| *x > 2).collect::<Vec<_>>(); sum(), any(), position(); HashMap: use std::collections::HashMap; let mut m = HashMap::new(); m.insert("a", 1); *m.entry(word).or_insert(0) += 1; m.get("a"); HashSet, VecDeque, BTreeMap (sorted).`),

  c('ownership-errors', 'Rust ownership, borrowing, lifetimes, traits, generics, error handling, common compiler errors', ['rust ownership', 'rust borrowing', 'borrow checker', 'rust lifetimes', 'rust traits', 'rust generics', 'rust error handling', 'question mark operator', 'rust unwrap', 'rust clone', 'borrow of moved value'],
    `Ownership: each value has one owner; assigning/passing a String/Vec moves it (the old variable can't be used); Copy types (integers, bool, char, &T) are copied. Clone explicitly with .clone() when you need two owners of data (fine when not hot).
Borrowing: &T (shared, many at once) or &mut T (exclusive, only one, no shared borrows at the same time). Prefer parameters &str over &String, &[T] over &Vec<T>. References can't outlive the data (no dangling pointers).
Lifetimes: fn longest<'a>(a: &'a str, b: &'a str) -> &'a str — tells the compiler the result lives as long as both inputs; mostly inferred (elision). Structs holding references need lifetime parameters — often easier to own the data (String).
Shared ownership: Rc<T> (single thread) / Arc<T> (threads); interior mutability RefCell<T> / Mutex<T> / RwLock<T>; Box<T> for heap allocation/recursive types/trait objects (Box<dyn Trait>).
Traits: trait Speak { fn speak(&self) -> String; fn hello(&self) -> String { format!("Hi, {}", self.speak()) } } impl Speak for Dog { ... }; generics with bounds fn show<T: std::fmt::Display>(x: T) / impl Display / where clauses; derive common traits; implement Display for user-facing printing; From for conversions; Iterator (fn next(&mut self) -> Option<Self::Item>).
Error handling: fn read_config(p: &str) -> Result<Config, Box<dyn std::error::Error>> { let text = std::fs::read_to_string(p)?; let cfg = serde_json::from_str(&text)?; Ok(cfg) } — ? returns the error early. Libraries: thiserror (define error enums), anyhow (apps: anyhow::Result, .context("reading config")). unwrap()/expect("msg") panic — OK in prototypes/tests, avoid in production paths. unwrap_or, unwrap_or_default, ok_or, map_err, and_then.
Common compiler errors: E0382 borrow of moved value (clone, borrow with &, or restructure); E0502/E0499 cannot borrow as mutable because it is also borrowed (shorten borrows, collect indices first, split scopes); E0106 missing lifetime specifier (return owned data); E0308 mismatched types (String vs &str: .to_string() / &s); E0425 cannot find value; "the trait bound X: Y is not satisfied" (derive/implement the trait); "temporary value dropped while borrowed" (bind it to a let first). Read the full compiler message — it usually suggests the fix.`),

  c('async-ecosystem', 'Rust async, concurrency, crates and ecosystem: tokio, serde, reqwest, axum, threads', ['rust async', 'tokio', 'rust threads', 'serde json rust', 'reqwest', 'axum', 'rust web server', 'rust cli clap', 'rust crates', 'serenity discord rust'],
    `Threads: let handle = std::thread::spawn(move || compute()); handle.join().unwrap(); share with Arc<Mutex<T>>: let counter = Arc::new(Mutex::new(0)); { *counter.lock().unwrap() += 1; } channels: let (tx, rx) = std::sync::mpsc::channel(); scoped threads std::thread::scope. Rayon for data parallelism (v.par_iter()). Send/Sync traits make data races compile errors.
Async: futures do nothing until awaited; you need a runtime: #[tokio::main] async fn main() { let body = reqwest::get(url).await?.text().await?; } tokio::spawn, tokio::join!, tokio::select!, tokio::time::sleep(Duration::from_secs(1)).await; don't block inside async code (use spawn_blocking).
serde: #[derive(Serialize, Deserialize)] struct User { name: String, #[serde(default)] age: u32 } let u: User = serde_json::from_str(&json)?; serde_json::to_string_pretty(&u)?.
Web (axum): let app = Router::new().route("/users/{id}", get(get_user)); async fn get_user(Path(id): Path<u32>) -> Json<User> {...} tokio::net::TcpListener::bind("0.0.0.0:3000") + axum::serve. Also actix-web, rocket.
Popular crates: clap (CLI args: #[derive(Parser)]), anyhow/thiserror, tracing (logging), sqlx/diesel/sea-orm (databases), rand, chrono/time, regex, itertools, once_cell/LazyLock, bevy (games), tauri (desktop apps), serenity/poise (Discord bots), wasm-bindgen (WebAssembly).
Tests: #[cfg(test)] mod tests { use super::*; #[test] fn adds() { assert_eq!(add(1, 2), 3); } } cargo test. Docs: /// comments, cargo doc --open.
Performance: build with --release (debug builds are much slower); avoid needless clone/allocation; iterators are zero-cost.`),
];
