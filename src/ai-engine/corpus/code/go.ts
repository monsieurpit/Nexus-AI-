import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('go', slug, title, keywords, content);

export const CODE_GO = [
  c('basics', 'Go basics: modules, types, slices, maps, structs, methods, interfaces, errors', ['golang basics', 'go hello world', 'go mod init', 'go slices', 'go maps', 'go struct', 'go interface', 'go error handling', 'go pointers', 'go for loop'],
    `package main
import "fmt"
func main() { fmt.Println("Hello") }
Setup: go mod init example.com/app; go run .; go build; go test ./...; go get github.com/x/y; gofmt/go vet automatically; exported names start with a capital letter.
Variables: var n int = 5; x := 10 (inside functions); const Pi = 3.14; zero values (0, "", false, nil). Types: int, int64, float64, string, bool, byte, rune (Unicode code point), explicit conversions float64(n).
Control: if err != nil {...}; if v, ok := m[k]; ok {...}; for is the only loop: for i := 0; i < n; i++ {}, for cond {}, for {}, for i, v := range slice {}, for range 10 (Go 1.22+); switch without fallthrough; defer runs at function exit (defer f.Close()).
Slices: s := []int{1, 2, 3}; s = append(s, 4); s[1:3]; len/cap; make([]int, 0, 100); slices share the underlying array (copy() for independence); slices.Sort(s), slices.Contains, slices.Index (package slices).
Maps: m := map[string]int{"a": 1}; m["b"] = 2; v, ok := m["c"]; delete(m, "a"); iteration order is random; a nil map panics on write — make(map[string]int).
Strings: immutable bytes; strings.Split/Join/Contains/ToUpper/TrimSpace/Fields/Builder; strconv.Itoa/Atoi; fmt.Sprintf("%d %s %v %+v %.2f", ...); range over a string yields runes.
Functions: func divide(a, b float64) (float64, error) { if b == 0 { return 0, errors.New("divide by zero") }; return a / b, nil } — multiple returns; first-class functions and closures; variadic ...int.
Structs & methods: type User struct { Name string \`json:"name"\`; Age int }; func (u *User) Birthday() { u.Age++ } (pointer receiver to modify); u := User{Name: "Ana"}; embedding for composition.
Interfaces are implicit: type Shape interface { Area() float64 } — any type with Area() satisfies it. any = interface{}; type switches: switch v := x.(type) { case string: ... }. Generics: func Map[T, U any](s []T, f func(T) U) []U.
Errors: check every error; wrap with fmt.Errorf("load config: %w", err); errors.Is(err, os.ErrNotExist), errors.As; custom error types; panic/recover only for truly unrecoverable bugs.`),

  c('concurrency-web', 'Go concurrency and web: goroutines, channels, select, sync, context, net/http, JSON', ['goroutines', 'go channels', 'go select', 'waitgroup', 'go mutex', 'go context', 'go http server', 'go json', 'go rest api', 'go race condition'],
    `Goroutines: go work(x) — lightweight threads. Wait for them: var wg sync.WaitGroup; for _, u := range urls { wg.Add(1); go func() { defer wg.Done(); fetch(u) }() }; wg.Wait() (Go 1.22+ loop variables are per-iteration; wg.Go(func(){...}) in 1.25).
Channels: ch := make(chan int) (unbuffered = synchronous) / make(chan int, 10); ch <- v; v := <-ch; v, ok := <-ch (ok false when closed); close(ch) from the sender; for v := range ch.
select { case msg := <-ch: ...; case <-time.After(2 * time.Second): timeout; case <-ctx.Done(): return ctx.Err() }.
Shared state: sync.Mutex (mu.Lock(); defer mu.Unlock()), sync.RWMutex, sync.Once, atomic.Int64; detect races with go run -race. errgroup for groups of goroutines that can fail. Worker pool: N goroutines reading from a jobs channel.
context.Context: first parameter of request-scoped functions; ctx, cancel := context.WithTimeout(ctx, 5*time.Second); defer cancel().
HTTP server (Go 1.22+ routing):
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"id": id})
})
log.Fatal(http.ListenAndServe(":8080", mux))
Decode a body: var in Input; if err := json.NewDecoder(r.Body).Decode(&in); err != nil { http.Error(w, "bad json", http.StatusBadRequest); return }.
Client: resp, err := http.Get(url); defer resp.Body.Close(); io.ReadAll(resp.Body). Set timeouts (http.Client{Timeout: 10 * time.Second}).
JSON: json.Marshal / json.MarshalIndent / json.Unmarshal(data, &v); struct tags \`json:"name,omitempty"\`; only exported fields are encoded.
Ecosystem: Gin/Echo/Chi/Fiber (web), database/sql + pgx/sqlc, GORM, cobra (CLIs), testing package (func TestX(t *testing.T), table-driven tests), discordgo (Discord bots). Single static binary: GOOS=linux GOARCH=amd64 go build.
Common errors: "declared and not used", "imported and not used", nil map assignment panic, nil pointer dereference, deadlock (all goroutines are asleep), index out of range.`),
];
