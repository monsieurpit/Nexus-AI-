import { code } from './_k';

// Less common languages (one dense doc each) + DevOps (Docker, CI/CD, servers).
export const CODE_EXTRA = [
  code('scala', 'essentials', 'Scala essentials: vals, case classes, pattern matching, collections, Option, for-comprehensions, sbt', ['scala', 'scala case class', 'scala pattern matching', 'sbt', 'scala collections', 'scala option', 'scala 3'],
    `Scala 3: @main def run(): Unit = println("Hi"). val (immutable) / var; type inference; def add(a: Int, b: Int): Int = a + b; string interpolation s"Hi $name \${x + 1}", f"$pi%.2f".
case class User(name: String, age: Int) — immutable data with equals/copy/pattern matching: user.copy(age = 30). enum Color { case Red, Green }. traits (interfaces with code), objects (singletons, companion objects), given/using (implicits), extension methods.
Pattern matching: x match { case 0 => "zero"; case n if n < 0 => "neg"; case User(name, _) => name; case _ => "other" }.
Collections (immutable by default): List(1, 2, 3).map(_ * 2).filter(_ > 2).sum; Vector, Map("a" -> 1), Set; foldLeft, groupBy, sortBy, zip, flatMap, take, exists, find (returns Option).
Option/Either/Try instead of null/exceptions: opt.getOrElse(0), opt.map(...), for-comprehensions: for { a <- fa; b <- fb } yield a + b.
Futures: Future { work() } with an ExecutionContext; Cats Effect / ZIO for typed effects; Akka/Pekko actors; Spark (big data) uses Scala. Build: sbt (sbt run, sbt test), scala-cli for scripts.`),

  code('haskell', 'essentials', 'Haskell essentials: types, pure functions, pattern matching, lists, typeclasses, Maybe, IO, monads', ['haskell', 'haskell monad', 'haskell typeclass', 'haskell maybe', 'ghci', 'haskell io', 'functional programming haskell'],
    `Pure, lazy, statically typed. main :: IO (); main = putStrLn "Hi". GHCi REPL (ghci), build with cabal or stack.
Functions: add :: Int -> Int -> Int; add a b = a + b (curried: add 1 is a function); lambdas \\x -> x * 2; composition (f . g); application $ (print $ sum xs); operators sections (+1), (*2).
Pattern matching + guards: factorial 0 = 1; factorial n = n * factorial (n - 1); classify n | n < 0 = "neg" | n == 0 = "zero" | otherwise = "pos"; case x of Just v -> v; Nothing -> 0; where / let bindings.
Lists: [1..10], x : xs (cons), head/tail (partial — prefer pattern matching), map, filter, foldr/foldl', zip, take, length, list comprehensions [x * 2 | x <- xs, even x]; strings are [Char] (Data.Text for real apps).
Types: data Shape = Circle Double | Rect Double Double deriving (Show, Eq); records data User = User { name :: String, age :: Int }; type synonyms; newtype. Typeclasses: class Describable a where describe :: a -> String; instance Describable Shape where ...; Functor (fmap / <$>), Applicative (<*>), Monad (>>= and do-notation), Foldable, Traversable (mapM_, traverse).
Maybe a (Just/Nothing) and Either e a (Left/Right) replace null/exceptions. IO actions in do blocks: do { line <- getLine; putStrLn ("You said " ++ line) }. Libraries via Hackage: containers (Map, Set), text, aeson (JSON), mtl, servant/scotty (web).`),

  code('elixir', 'essentials', 'Elixir essentials: pattern matching, pipes, functions, modules, processes, GenServer, Phoenix', ['elixir', 'phoenix framework', 'genserver', 'elixir pipe operator', 'elixir pattern matching', 'beam erlang', 'liveview'],
    `Runs on the Erlang VM (BEAM): lightweight processes, fault tolerance, hot code. iex (REPL), mix new app, mix test, mix deps.get.
Data: atoms :ok, tuples {:ok, value}, lists [1, 2], maps %{name: "Ana"} (access map.name / map[:name]), keyword lists [a: 1], strings "Hi #{name}" (binaries), immutable everything.
Pattern matching: {:ok, result} = File.read("f.txt"); case File.read(p) do {:ok, body} -> body; {:error, reason} -> IO.puts("failed: #{reason}") end; function clauses: def fact(0), do: 1; def fact(n) when n > 0, do: n * fact(n - 1); with for chained matches.
Pipes: "hello world" |> String.split() |> Enum.map(&String.capitalize/1) |> Enum.join(" "). Enum/Stream: map, filter, reduce, group_by, sort_by, sum; for comprehensions.
Modules: defmodule Greeter do def hello(name), do: "Hi #{name}"; defp private_fun... end. Structs: defstruct [:name, age: 0].
Processes: spawn, send(pid, msg), receive do {:ping, from} -> send(from, :pong) end; GenServer (handle_call/handle_cast/handle_info) for stateful servers; Supervisors restart crashed processes ("let it crash"); Task.async/await for concurrent work.
Phoenix: web framework with LiveView (real-time UIs without JS), Ecto (database: schemas, changesets, Repo.insert), channels/websockets. Discord bots: Nostrum.`),

  code('assembly', 'x86-arm', 'Assembly language: registers, instructions, stack, calling conventions, x86-64 and ARM64 basics', ['assembly language', 'x86 assembly', 'arm assembly', 'nasm', 'registers', 'mov instruction', 'asm hello world', 'calling convention'],
    `Assembly maps almost 1:1 to CPU instructions; each architecture differs (x86-64 on most PCs, ARM64/AArch64 on Apple Silicon, phones, Raspberry Pi).
x86-64 registers: rax (return value), rbx, rcx, rdx, rsi, rdi, rbp (frame), rsp (stack pointer), r8-r15; 32-bit halves eax..., rip (instruction pointer), flags (ZF zero, CF carry, SF sign, OF overflow).
Instructions (Intel syntax, NASM): mov rax, 5; add rax, rbx; sub; imul; idiv (rdx:rax); inc/dec; and/or/xor (xor rax, rax zeroes); shl/shr; cmp rax, 10 then je/jne/jl/jg/jle/jge label; jmp; call func / ret; push/pop; lea rax, [rbx + rcx*4] (address arithmetic); memory operands [rbp - 8].
Linux x86-64 hello world (NASM):
section .data
  msg db "Hello", 10
section .text
  global _start
_start:
  mov rax, 1        ; sys_write
  mov rdi, 1        ; stdout
  mov rsi, msg
  mov rdx, 6
  syscall
  mov rax, 60       ; sys_exit
  xor rdi, rdi
  syscall
Build: nasm -f elf64 hello.asm && ld hello.o -o hello. System V calling convention: args in rdi, rsi, rdx, rcx, r8, r9; return in rax; callee saves rbx, rbp, r12-r15; stack 16-byte aligned before call. Windows x64 uses rcx, rdx, r8, r9 + 32-byte shadow space.
ARM64: registers x0-x30 (w0 32-bit), sp, x30 = link register; mov x0, #5; add x0, x0, x1; ldr/str (load/store architecture); cmp + b.eq/b.ne; bl func / ret; args in x0-x7. macOS syscalls differ (svc #0x80, x16 = syscall number).
Use cases: reverse engineering (Ghidra, IDA, gdb/lldb disassemble), embedded, performance hot spots, OS dev, CTFs; see compiler output with gcc -S -O2 or godbolt.org.`),

  code('perl', 'essentials', 'Perl essentials: scalars, arrays, hashes, regex, file handling, one-liners', ['perl', 'perl regex', 'perl one liner', 'perl hash', 'cpan'],
    `use strict; use warnings; at the top of every script. Sigils: $scalar, @array, %hash; my declares lexical variables. print "Hi $name\\n";
Arrays: my @a = (1, 2, 3); push @a, 4; $a[0]; scalar(@a); for my $x (@a) { }; map { $_ * 2 } @a; grep { $_ > 1 } @a; sort { $a <=> $b } @nums; join(", ", @a); split /,/, $line.
Hashes: my %age = (ana => 20); $age{ben} = 30; exists $age{ana}; delete; for my $k (sort keys %age) { }. References: \\@a, \\%h, [1, 2], { k => 'v' }, $ref->[0], $ref->{k}.
Regex (Perl's strength): if ($s =~ /(\\d+)-(\\d+)/) { print $1 } ; $s =~ s/old/new/g; tr/a-z/A-Z/; named captures %+.
Files: open(my $fh, '<', $path) or die "Can't open $path: $!"; while (my $line = <$fh>) { chomp $line; } close $fh.
Subs: sub add { my ($a, $b) = @_; return $a + $b; }. Modules from CPAN (cpanm Module::Name). One-liners: perl -ne 'print if /error/' log.txt; perl -pi -e 's/foo/bar/g' *.txt (in-place edit).`),

  code('julia', 'essentials', 'Julia essentials: syntax, arrays, multiple dispatch, packages, performance', ['julia language', 'julia multiple dispatch', 'julia arrays', 'julia packages', 'julia plots'],
    `Fast scientific computing with a dynamic feel (JIT compiled). REPL: julia; ] enters the package manager (add DataFrames Plots).
x = 5; name = "Ana"; println("Hi $name, $(x + 1)"); 1-based indexing; ranges 1:10; arrays [1, 2, 3], matrices [1 2; 3 4]; push!(a, 4) (! = mutates); broadcasting with dot syntax: a .* 2, sin.(a); comprehensions [x^2 for x in 1:5 if isodd(x)].
Functions: f(x) = x^2 + 1; function greet(name::String; loud=false) ... end; anonymous x -> x * 2; map/filter/reduce/sum.
Types and multiple dispatch: struct Point x::Float64; y::Float64 end; area(c::Circle) = π * c.r^2; area(r::Rect) = r.w * r.h — the method is chosen by all argument types.
Control: if/elseif/else/end, for i in 1:n ... end, while, try/catch.
Packages: DataFrames, CSV, Plots/Makie, Flux (ML), DifferentialEquations, JuMP (optimisation). Performance: put code in functions (avoid global variables), keep types stable, use @time / @btime (BenchmarkTools), preallocate arrays.`),

  code('matlab', 'essentials', 'MATLAB / Octave essentials: matrices, vectorisation, plotting, scripts and functions', ['matlab', 'octave', 'matlab plot', 'matlab matrix', 'matlab for loop', 'simulink'],
    `Everything is a matrix; 1-based indexing; semicolon suppresses output. A = [1 2 3; 4 5 6]; A(2, 3); A(:, 1) (column); A(end, :); size(A); zeros(3), ones(2, 3), eye(3), rand(3), linspace(0, 1, 100), 1:0.5:3.
Operators: * matrix product, .* .^ ./ element-wise, ' transpose, A \\ b solves Ax = b; inv, det, eig; sum, mean, max, sort, find(A > 2), logical indexing A(A > 2) = 0.
Vectorise instead of loops when possible; loops: for i = 1:10 ... end, while, if/elseif/else/end, switch.
Functions in their own file (or at the end of scripts): function [s, p] = sumprod(a, b) s = a + b; p = a * b; end; anonymous f = @(x) x.^2 + 1; fplot(f, [0 5]).
Plotting: x = linspace(0, 2*pi); plot(x, sin(x), 'r-', 'LineWidth', 2); hold on; plot(x, cos(x)); xlabel('x'); ylabel('y'); title('Waves'); legend('sin', 'cos'); grid on; subplot(2, 1, 1); scatter, bar, histogram, surf/mesh (3D).
Strings: "text" (string) vs 'chars'; sprintf / fprintf('%d items\\n', n); num2str; strsplit; contains. Data: readtable('data.csv'), writetable, load/save .mat files; structs s.name and cell arrays {1, 'a'}. Toolboxes: Signal Processing, Image Processing, Simulink (block diagrams), Control Systems. GNU Octave is a free, mostly compatible alternative.`),

  code('objectivec', 'essentials', 'Objective-C essentials: classes, messages, properties, memory (ARC), blocks, Swift interop', ['objective-c', 'objective c', 'objc', 'nsstring', 'ios objective c'],
    `A superset of C with Smalltalk-style messages. Header (.h) declares, implementation (.m) defines:
@interface Player : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic) NSInteger score;
- (void)addPoints:(NSInteger)points;
@end
@implementation Player
- (void)addPoints:(NSInteger)points { self.score += points; }
@end
Messages: [player addPoints:10]; Player *p = [[Player alloc] init]; NSLog(@"Name: %@, score: %ld", p.name, (long)p.score); class methods start with +.
Foundation: NSString (@"literal", stringWithFormat:), NSArray (@[@1, @2]) / NSMutableArray, NSDictionary (@{@"key": @"value"}), NSNumber (@42), nil (messaging nil is a no-op), BOOL YES/NO.
Memory: ARC (automatic reference counting) — strong (default), weak (delegates, avoid cycles), copy (strings/blocks). Blocks: void (^done)(BOOL) = ^(BOOL ok) { ... }; use __weak typeof(self) weakSelf inside blocks that self keeps.
Protocols (@protocol, delegates), categories (extend classes), selectors (@selector(tap:)). Interop: Swift can use Objective-C via a bridging header; new Apple code is usually Swift.`),

  code('clojure', 'essentials', 'Clojure essentials: Lisp syntax, immutable data, sequences, functions, REPL', ['clojure', 'lisp', 'clojurescript', 'leiningen'],
    `A Lisp on the JVM: code is data, (function arg1 arg2). (println "Hi" name); (def x 5); (defn add [a b] (+ a b)); anonymous #(* % 2) or (fn [x] (* x 2)); let bindings (let [a 1 b 2] (+ a b)).
Immutable persistent data: lists '(1 2), vectors [1 2 3], maps {:name "Ana" :age 20} (get with (:name m)), sets #{1 2}; assoc, dissoc, update, conj, merge, get-in/assoc-in for nested data.
Sequences: (map inc [1 2 3]), filter, reduce, take, range, partition, group-by, sort-by, frequencies; threading macros (->> data (filter even?) (map #(* % %)) (reduce +)) and -> for nested calls.
Control: if, when, cond, case; recursion with loop/recur; destructuring [{:keys [name age]}].
State: atoms (swap! counter inc, @counter), refs, agents. Java interop (.toUpperCase "hi"). Tools: Leiningen or deps.edn (clj), REPL-driven development; ClojureScript compiles to JS.`),

  code('devops', 'docker-ci', 'DevOps: Docker, docker compose, CI/CD with GitHub Actions, nginx reverse proxy, environment variables, Linux servers', ['docker', 'dockerfile', 'docker compose', 'github actions', 'ci cd', 'nginx', 'reverse proxy', 'deploy to vps', 'kubernetes', 'ssl certificate', 'systemd service'],
    `Dockerfile (cache-friendly order: dependencies before source):
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "main.py"]
docker build -t myapp . ; docker run -d -p 3000:3000 --env-file .env --name myapp --restart unless-stopped myapp ; docker ps, docker logs -f myapp, docker exec -it myapp sh, docker stop/rm, docker images, docker system prune. .dockerignore (node_modules, .git, .env). Multi-stage builds for small images (build in one stage, copy the output into a slim/distroless one). Run as a non-root USER.
docker compose (compose.yaml): services: app: build: . ; ports: ["3000:3000"]; env_file: .env; depends_on: [db]; db: image: postgres:16; environment: POSTGRES_PASSWORD: secret; volumes: [pgdata:/var/lib/postgresql/data] ; volumes: pgdata: {} → docker compose up -d --build, docker compose logs -f, docker compose down. Services reach each other by service name (host "db").
GitHub Actions (.github/workflows/ci.yml): on: { push: { branches: [main] }, pull_request: {} } jobs: test: runs-on: ubuntu-latest; steps: - uses: actions/checkout@v4 - uses: actions/setup-node@v4 with: { node-version: 22, cache: npm } - run: npm ci - run: npm test. Secrets via \${{ secrets.NAME }}; matrix builds; deploy jobs with needs: test.
nginx reverse proxy (VPS): server { listen 80; server_name example.com; location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade"; } } then free HTTPS with certbot --nginx -d example.com (Let's Encrypt). Caddy does HTTPS automatically.
Linux server basics: ssh in with keys (disable password login), sudo apt update && sudo apt upgrade, ufw allow OpenSSH/80/443 && ufw enable, systemd service: /etc/systemd/system/bot.service ([Service] ExecStart=/usr/bin/node /opt/bot/index.js, Restart=always, User=bot, EnvironmentFile=/opt/bot/.env) → systemctl enable --now bot; journalctl -u bot -f.
Kubernetes (when you really need orchestration): Deployments, Services, Ingress, ConfigMaps/Secrets, kubectl apply -f. Infrastructure as code: Terraform. Monitoring: uptime checks, logs, metrics (Prometheus/Grafana), alerts.`),
];
