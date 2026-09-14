import { KnowledgeItem } from '../../types';

// Batch 304 corpus fixes — fourth coding-priority batch (2026-09-14). 10/25 misses.
// Topic: build tools & package ecosystems, testing concepts, database/ORM concepts, and
// deployment/devops concepts (chosen because grep confirmed these angles were NOT yet covered
// by the existing 219-item Programming corpus or by batches 301-303's gap files).
// One severe wrong-domain hallucination: database migration vs seed dumped generic Wikipedia
// trivia about "database" as a concept, then pivoted entirely to ANIMAL MIGRATION IN ECOLOGY,
// never touching database migrations or seed data at all. One factual conflation: blue-green vs
// canary deployment claimed "they're basically the same thing" and only described blue-green
// (two full idle environments, instant cutover) — canary deployment (gradual % traffic shift with
// monitoring before full rollout) is a genuinely different strategy, never explained. One
// trivia-dump-and-cutoff: read committed vs serializable isolation levels dumped a generic ACID
// properties bullet list and got cut off mid-sentence by a "Fact. No debate." artifact, never
// actually contrasting the two isolation levels. One bizarre dodge: yarn vs npm briefly joked
// about literal knitting yarn before only explaining npm, never actually describing Yarn the
// package manager. Five one-sided cutoffs: webpack vs vite (explained only webpack), lockfile vs
// manifest file (cut off mid-sentence describing the lockfile), smoke test vs regression test
// (explained only smoke test), clustered vs non-clustered index (explained only clustered index),
// and rolling vs recreate deployment (explained only rolling deployment). One under-specified
// answer: horizontal vs vertical pod autoscaling answered with generic horizontal/vertical cloud
// scaling instead of the actual Kubernetes HPA/VPA mechanism the question asked about.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const CODING_BUILD_DEPLOY_DATA_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-code-webpack-vs-vite',
    'webpack vs Vite',
    ['webpack vs vite', 'difference webpack vite', 'vite bundler'],
    "webpack is an older, highly configurable JavaScript bundler — it builds a full dependency graph of your app up front and bundles everything (JS, CSS, images, fonts) into optimized output files; this bundling step runs even during local development, which means large apps can have slow dev-server startup and slow hot-reload as the project grows, though webpack's huge plugin ecosystem makes it able to handle almost any build requirement. Vite (French for 'fast') takes a fundamentally different approach for development: it serves your source files directly to the browser using native ES modules over an esbuild-powered dev server, so there's NO bundling step at all during development — the browser requests modules on demand, giving near-instant server start and extremely fast hot module replacement (HMR) regardless of app size; for production builds, Vite switches to using Rollup under the hood to bundle everything, since shipping unbundled ES modules to production would be too many network requests. The key difference: webpack bundles your code both in development and production (which can make dev servers slow on large apps), while Vite skips bundling entirely during development by serving native ES modules straight to the browser and only bundles (via Rollup) for the production build.",
  ),
  k(
    'kb-gap-code-db-migration-vs-seed',
    'Database migration vs database seed',
    ['database migration vs seed', 'difference migration seed database', 'db migration seed data'],
    "A database migration is a versioned, ordered script that changes the STRUCTURE (schema) of a database over time — creating a table, adding a column, renaming a field, adding an index or constraint — and migration tools (Prisma Migrate, Rails migrations, Alembic, Flyway, Knex) track which migrations have already run so the schema can be reliably built up (or rolled back) the same way across every developer's machine and every environment (dev/staging/prod). A database seed is a script that inserts actual DATA into the already-existing tables — not structural changes, but rows of content, like default admin users, sample products for local testing, lookup-table values (e.g. a fixed list of country codes), or fake data for a demo — seeding is typically run after migrations have set up the schema, and is often re-runnable/idempotent so you can reset your local database to a known state. The key difference: a migration changes what the database's SCHEMA looks like (tables, columns, constraints), while a seed populates that schema with actual DATA (rows) — this has nothing to do with animal migration in ecology; in a software context 'migration' always refers to schema changes.",
  ),
  k(
    'kb-gap-code-read-committed-vs-serializable',
    'Read committed vs serializable transaction isolation',
    ['read committed vs serializable', 'transaction isolation levels', 'difference read committed serializable', 'isolation level database'],
    "Read committed is a transaction isolation level (the default in PostgreSQL and SQL Server) where a transaction only ever sees data that has already been COMMITTED by other transactions — it prevents 'dirty reads' (reading another transaction's uncommitted changes), but it does NOT protect against a 'non-repeatable read': if you read the same row twice within one transaction, another transaction could commit a change in between, and your second read would see different data, because each individual query in a read committed transaction takes a fresh snapshot. Serializable is the STRICTEST isolation level — it guarantees that a set of concurrently running transactions produces the exact same result as if they had been run one at a time, in some serial order; the database achieves this by detecting when concurrent transactions would conflict (e.g. one wrote something the other read) and forcing one of them to abort and retry (a 'serialization failure'), which eliminates dirty reads, non-repeatable reads, AND phantom reads, at the cost of more transaction retries and reduced concurrency/throughput under contention. The key difference: read committed only guarantees you never see uncommitted data (data can still shift between reads within your own transaction), while serializable guarantees your transaction behaves as if it ran completely alone with no other transaction interleaved at all, which is far stronger but more expensive under heavy concurrent load.",
  ),
  k(
    'kb-gap-code-blue-green-vs-canary',
    'Blue-green deployment vs canary deployment',
    ['blue-green vs canary deployment', 'difference blue green canary', 'canary release'],
    "Blue-green deployment keeps TWO complete, identical production environments ('blue' = currently live, 'green' = the new version) running at the same time — you deploy and fully test the new version on green while blue still serves 100% of real traffic, and then you cut over ALL traffic to green at once (usually by flipping a router/load-balancer config), giving an instant switch and an instant rollback (just flip back to blue) if something's wrong — but every user is on the new version the moment you switch, so a bug hits everyone simultaneously. Canary deployment is a GRADUAL rollout: instead of an all-at-once switch, you route a small percentage of real traffic (say 5%) to the new version while the rest keeps hitting the old one, then monitor error rates/metrics on that small slice, and if it looks healthy you gradually increase the percentage (5% → 25% → 50% → 100%) until everyone is on the new version — this limits the 'blast radius' of a bad release to a small fraction of users before it's caught, unlike blue-green's instant full cutover. The key difference: blue-green switches ALL traffic to the new version instantly (with instant full rollback if needed), while canary deployment shifts traffic to the new version gradually and incrementally, catching problems in a small slice of users before they'd affect everyone — these are NOT the same strategy.",
  ),
  k(
    'kb-gap-code-hpa-vs-vpa',
    'Horizontal pod autoscaling vs vertical pod autoscaling (Kubernetes)',
    ['horizontal pod autoscaling vs vertical', 'HPA vs VPA', 'kubernetes autoscaling', 'difference horizontal vertical pod autoscaler'],
    "In Kubernetes, the Horizontal Pod Autoscaler (HPA) automatically changes the NUMBER of pod replicas running for a deployment based on observed metrics (typically CPU or memory utilization, or custom metrics) — if load spikes and average CPU usage crosses a configured threshold, the HPA spins up more pod replicas to spread the load, and scales the count back down when demand drops; this is the standard way to handle variable traffic for stateless services since more replicas can be spread across more nodes. The Vertical Pod Autoscaler (VPA) instead automatically adjusts the CPU/memory RESOURCE REQUESTS AND LIMITS of the existing pods themselves — rather than adding more pods, it makes each individual pod bigger or smaller based on its actual observed usage, which is useful for workloads that can't easily be horizontally scaled (e.g. a single stateful process) but typically requires restarting the pod to apply new resource values, causing a brief disruption. The key difference: HPA scales OUT/IN by changing how many pod replicas exist to handle changing load, while VPA scales UP/DOWN by changing the CPU/memory resources allocated to each existing pod — and unlike generic cloud horizontal/vertical scaling, both HPA and VPA are Kubernetes-specific controllers that continuously watch metrics and adjust automatically without manual intervention.",
  ),
  k(
    'kb-gap-code-lockfile-vs-manifest',
    'Package manager lockfile vs manifest file',
    ['lockfile vs manifest file', 'difference lockfile manifest', 'package-lock.json vs package.json', 'Cargo.lock vs Cargo.toml'],
    "A manifest file (`package.json` for npm/yarn, `Cargo.toml` for Rust, `requirements.txt`/`pyproject.toml` for Python, `pom.xml` for Maven) is the file YOU write and edit — it declares your project's dependencies using flexible version RANGES (e.g. `^4.17.1` meaning 'any compatible 4.x.x version 4.17.1 or higher'), so it says what you WANT, loosely. A lockfile (`package-lock.json`/`yarn.lock` for npm/yarn, `Cargo.lock` for Rust, `poetry.lock` for Python) is auto-generated by the package manager — it records the EXACT resolved version (down to the specific patch version and often a content hash) of every single dependency and sub-dependency that was actually installed, so that running the install again (on a teammate's machine, in CI, in production) reproduces the identical dependency tree byte-for-byte, instead of potentially resolving to a newer version that happens to match the manifest's range. The key difference: the manifest file declares loose, human-edited version ranges expressing what you want, while the lockfile pins the exact, machine-generated versions that were actually resolved and installed, guaranteeing reproducible installs across machines and time — you commit both to version control, but you only ever hand-edit the manifest.",
  ),
  k(
    'kb-gap-code-yarn-vs-npm',
    'Yarn vs npm (package managers)',
    ['yarn vs npm', 'difference yarn npm', 'yarn package manager javascript'],
    "Yarn is a JavaScript package manager (created by Facebook in 2016, unrelated to literal knitting yarn) built as an alternative to npm, originally to fix npm's early problems with slow, non-deterministic installs — like npm, Yarn installs packages from the npm registry into `node_modules` based on a `package.json`, but historically it distinguished itself with faster parallel/cached installs, a lockfile (`yarn.lock`) that came before npm had one built in, and (in Yarn 2+, called 'Yarn Berry') an optional 'Plug'n'Play' mode that skips `node_modules` entirely for speed. npm (Node Package Manager) is the default package manager bundled with Node.js itself — no separate install needed — and it has closed most of the historical gap with Yarn: modern npm also has a lockfile (`package-lock.json`), a local cache, and comparable install speed, so today the two are largely interchangeable for most projects, with the choice often coming down to team preference or a specific feature like Yarn's workspaces implementation or Plug'n'Play. The key difference: they're two different implementations of the same job (installing and managing JavaScript/Node.js dependencies from the npm registry) — Yarn started as a faster/more deterministic alternative to npm, but npm has since caught up on most of those features, and Yarn has nothing to do with actual textile yarn.",
  ),
  k(
    'kb-gap-code-smoke-vs-regression-test',
    'Smoke test vs regression test',
    ['smoke test vs regression test', 'difference smoke regression testing', 'smoke testing software'],
    "A smoke test is a quick, shallow check run right after a new build to verify the most basic, critical functionality isn't completely broken — does the app start, can you log in, does the homepage load — the name comes from hardware testing ('turn it on and see if smoke comes out'); it's meant to be fast (minutes, not hours) so a badly broken build can be rejected immediately before wasting time on deeper testing. A regression test is a much broader, deeper suite run to verify that a NEW change (a bug fix, a new feature) hasn't accidentally broken EXISTING functionality that used to work — it re-runs a large set of previously-passing test cases covering many parts of the app, not just the critical path, and is typically slower and more thorough than a smoke test, often run in CI before merging or before a release rather than immediately after every build. The key difference: a smoke test is a fast, shallow 'does it even turn on' sanity check on the most critical paths right after a build, while a regression test is a slower, broader re-verification that a specific change hasn't broken previously working functionality elsewhere in the app.",
  ),
  k(
    'kb-gap-code-clustered-vs-nonclustered-index',
    'Clustered index vs non-clustered index',
    ['clustered vs non-clustered index', 'difference clustered nonclustered index', 'database index types'],
    "A clustered index determines the PHYSICAL order the actual table rows are stored on disk — the table's data is literally sorted and stored according to the clustered index's key, which is why a table can only have ONE clustered index (the data can only be physically arranged in one order at a time); in many databases the primary key automatically becomes the clustered index, and lookups on it are extremely fast since the data is already sorted right there. A non-clustered index is a SEPARATE structure stored apart from the actual table data — it holds a sorted copy of just the indexed column(s) plus a pointer (a row locator, or the clustered index key) back to where the full row actually lives; a table can have MANY non-clustered indexes (one per column or column combination you frequently query on), but looking up a row through a non-clustered index requires an extra step ('bookmark lookup') to jump from the index entry to the actual row data, making it slightly slower than a clustered index lookup for retrieving full rows. The key difference: a clustered index physically reorders and stores the table's actual data (only one allowed per table), while a non-clustered index is a separate, additional lookup structure that points back to the real data (many allowed per table) — clustered index lookups go straight to the data, non-clustered index lookups need an extra pointer hop.",
  ),
  k(
    'kb-gap-code-rolling-vs-recreate-deployment',
    'Rolling deployment vs recreate deployment',
    ['rolling vs recreate deployment', 'difference rolling recreate deployment', 'recreate deployment strategy'],
    "A rolling deployment updates instances of your app gradually, one (or a small batch) at a time — it takes down one old instance, brings up a new instance with the updated version, waits for it to become healthy, then moves to the next one, so at any given moment during the rollout BOTH old and new versions are running simultaneously and serving traffic side by side; this means zero downtime, but it requires your old and new versions to be compatible enough to coexist (e.g. a database schema change has to work with both versions at once), and a bad rollout can be harder to reason about since you're mid-migration with a mixed fleet. A recreate deployment is the simplest and crudest strategy: it terminates ALL old instances completely FIRST, and only THEN starts up the new version — there's a guaranteed window where NOTHING is running and the app is fully down, so it causes real downtime, but it's simple and guarantees you're never running two incompatible versions at the same time (useful when old and new versions genuinely can't coexist, like a breaking database migration). The key difference: a rolling deployment replaces instances gradually with zero downtime but a period of mixed old/new versions running together, while a recreate deployment kills everything old before starting anything new, causing a guaranteed downtime window but avoiding ever running two incompatible versions simultaneously.",
  ),
];
