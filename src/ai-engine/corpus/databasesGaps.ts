import { KnowledgeItem } from '../../types';

// Batch 97 (databases & SQL). Very weak category (~7/25). nexus-4b misses:
// "what is sharding" answered about The Shard skyscraper in London; "indexing
// versus full table scan" answered about CT scans and Google Books;
// "connection pooling" answered about pooling layers in convolutional neural
// networks; "what is a composite key" answered about composite materials;
// "DELETE TRUNCATE and DROP" answered about the divergence between Anglicanism
// and Methodism; "query optimizer" and "the N+1 query problem" both dragged in
// "flash attention"; "normalization", "transaction", "deadlock", "stored
// procedure", and "replication" were raw web dumps (deadlock -> a pro-wrestling
// promotion); "what is a primary key" was self-contradictory ("a table can
// have several ... it CAN allow one null").
export const DATABASES_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-primary-key',
    title: 'What a Primary Key Is',
    category: 'Databases',
    keywords: [
      'what is a primary key', 'primary key uniquely identifies each row', 'primary key unique not null one per table',
      'surrogate key auto increment id uuid', 'natural key vs surrogate key', 'primary key is automatically indexed',
    ],
    content: `A primary key is the column (or set of columns) whose value uniquely identifies each row in a table. It follows two rules: the value must be unique across every row, and it can never be NULL. A table has exactly ONE primary key — though that key may be built from several columns together (a "composite key"). Other tables point to a row by storing its primary-key value as a "foreign key," and the database automatically builds an index on the primary key, so looking a row up by it is very fast. Two common designs: a "natural key" uses an existing real-world unique value (an ISBN, a national ID number), while a "surrogate key" — far more common — adds a column with no outside meaning, usually an auto-incrementing integer named "id" or a UUID, purely to serve as the identifier.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-database-normalization',
    title: 'What Database Normalization Is',
    category: 'Databases',
    keywords: [
      'what is database normalization', 'reduce data redundancy split into related tables', 'first second third normal form 1nf 2nf 3nf',
      'edgar codd normal forms relational', 'update insert delete anomalies normalization', 'normalization vs denormalization tradeoff joins',
    ],
    content: `Normalization is the process of organising a relational database into multiple related tables so that each fact is stored in exactly one place, reducing redundancy and preventing update/insert/delete "anomalies" (contradictory copies of the same data). The idea, from Edgar F. Codd, is a series of increasingly strict "normal forms": FIRST normal form (1NF) — every column holds one atomic value, with no lists or repeating groups packed into a single cell; SECOND normal form (2NF) — every non-key column depends on the whole primary key, not just part of a composite key; THIRD normal form (3NF) — non-key columns depend only on the key, not on each other (no "transitive" dependencies, like storing a customer's city AND their postcode when the postcode determines the city). Most operational databases aim for 3NF. The cost is that data is spread across many tables, so reconstructing it requires JOINs — which is why analytics databases and some high-traffic systems are deliberately "denormalized" for speed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-database-transaction',
    title: 'What a Database Transaction Is',
    category: 'Databases',
    keywords: [
      'what is a transaction in a database', 'group of operations all or nothing commit rollback', 'begin commit rollback transaction',
      'bank transfer transaction example', 'transaction gives acid guarantees', 'why use a transaction',
    ],
    content: `A database transaction is a group of one or more operations (reads and writes) treated as a single, indivisible unit of work: either all of them take effect ("commit"), or none of them do ("rollback"). The classic example is a bank transfer — subtract money from account A and add it to account B — which must never be left half-done if something fails in between. You begin one with BEGIN (or START TRANSACTION), perform the statements, then COMMIT to make the changes permanent or ROLLBACK to undo everything since the BEGIN (also triggered automatically by an error or a crash). Transactions are what give you the ACID guarantees — atomicity, consistency, isolation, durability — and they let a database safely let many users read and modify the same data concurrently without corrupting it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-query-optimizer',
    title: 'What a Query Optimizer Is',
    category: 'Databases',
    keywords: [
      'what is a query optimizer', 'database decides how to execute a sql query', 'execution plan index scan join order join algorithm',
      'cost based optimizer table statistics selectivity', 'explain plan analyze query', 'why a query can suddenly get slow',
    ],
    content: `The query optimizer is the part of a database engine that decides HOW to execute a SQL query. SQL is declarative — you state what data you want, not the steps to get it — so for any query there are many possible "execution plans": which index to use (or whether to scan the whole table), the order in which to join the tables, which join algorithm to use (nested loop, hash join, merge join), and whether to sort explicitly or read an index in order. The optimizer estimates the cost of each plausible plan (in disk reads, CPU and memory) using statistics it maintains about the tables — row counts, how many distinct values a column has, value distributions — and picks the cheapest. A poor plan can make a query thousands of times slower, which is why keeping those statistics current (running ANALYZE) and reading the query's EXPLAIN output matter when tuning performance. This has nothing to do with neural-network "attention."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sharding',
    title: 'What Sharding Is (Databases)',
    category: 'Databases',
    keywords: [
      'what is sharding', 'split a database horizontally across multiple servers', 'shard key partition rows by hash or range',
      'scale out vs scale up database', 'cross-shard query and rebalancing difficulty', 'sharding vs partitioning vs replication',
    ],
    content: `Sharding is splitting one large database horizontally across multiple servers ("shards"), so each shard stores a distinct subset of the rows — for example users A–M on one server and N–Z on another, or rows partitioned by a hash of their ID. Each shard is a full, independent database; together they hold the whole dataset. It's done when a single machine can no longer handle the data volume or the query load — "scaling out" across many machines instead of "scaling up" to one bigger machine. Benefits: more total storage, throughput and parallelism. Costs: real complexity — queries and transactions that need to touch more than one shard are hard and slow, adding a shard means rebalancing data, and a badly chosen "shard key" creates hot spots where one shard gets most of the traffic. Sharding (disjoint pieces of the data on different servers) is different from replication (full copies of the whole database) and from partitioning (splitting a table within one database). It has nothing to do with the skyscraper in London.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-indexing-vs-full-table-scan',
    title: 'Index Seek versus Full Table Scan',
    category: 'Databases',
    keywords: [
      'what is indexing versus full table scan', 'full table scan reads every row slow on large tables', 'index seek b-tree jump to matching rows',
      'optimizer chooses index vs scan by selectivity', 'why indexes speed up reads and slow down writes', 'index the columns you filter join sort on',
    ],
    content: `When a database runs a query with a WHERE condition, it has two basic ways to find the matching rows. A FULL TABLE SCAN reads every row in the table and tests each one against the condition — simple, but its cost grows in direct proportion to the table's size, so it becomes slow on large tables. An INDEX SEEK/SCAN uses a pre-built index (a sorted structure, usually a B-tree) on the filtered column to jump straight to the matching rows without reading the rest — much faster when the query returns only a small fraction of the table. The optimizer chooses between them: for a highly selective query (few matching rows) it uses the index; for a query that returns most of the table, a full scan is actually faster, because chasing an index for millions of rows means a lot of scattered random reads. Indexes speed up reads but slow down every INSERT, UPDATE and DELETE (the indexes must be updated too) and take extra disk space — so you add indexes on the columns you actually filter, join, or sort on. This is unrelated to CT scans or scanning books.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-connection-pooling',
    title: 'What Connection Pooling Is',
    category: 'Databases',
    keywords: [
      'what is connection pooling', 'reuse database connections instead of opening one per request', 'opening a db connection is slow expensive handshake auth',
      'borrow connection from pool use return it', 'pool min max size idle timeout', 'hikaricp pgbouncer sqlalchemy pool',
    ],
    content: `Connection pooling is a technique for reusing database connections instead of opening a fresh one for every request. Establishing a database connection is relatively slow and costly — a network handshake, authentication, and session setup — and databases can only handle a limited number of connections at once. A connection pool keeps a set of already-open connections ready; when the application needs to run a query it "borrows" one from the pool, uses it, and returns it to the pool afterward rather than closing it, so the next request reuses it. This cuts latency dramatically and lets a busy application serve thousands of requests through a small pool of real database connections. Key settings to tune are the minimum and maximum pool size and how long an idle connection is kept before being closed. Common implementations: HikariCP (Java), pgbouncer (a standalone pooler that sits in front of PostgreSQL), SQLAlchemy's pool, and the built-in poolers of most web frameworks and ORMs. It has nothing to do with pooling layers in neural networks.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-composite-key',
    title: 'What a Composite Key Is (Databases)',
    category: 'Databases',
    keywords: [
      'what is a composite key', 'compound key primary key made of two or more columns', 'combination of columns is unique even if each alone is not',
      'junction table many to many composite key', 'student_id course_id enrollment composite key', 'composite key vs surrogate id',
    ],
    content: `A composite key (also called a compound key) is a primary key made up of two or more columns together, where no single column is unique on its own but the combination is. Classic example: a table of course enrolments where neither student_id nor course_id is unique by itself (a student takes many courses; a course has many students), but the pair (student_id, course_id) uniquely identifies one enrolment. Composite keys are common in "junction" or "join" tables that implement many-to-many relationships. The downsides: any foreign key that references such a table has to carry all of the key's columns, and joins and indexes on it become wider. For that reason many designers instead give the table a single surrogate "id" column as the primary key and put a UNIQUE constraint on the composite columns. It has nothing to do with composite materials.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-delete-truncate-drop',
    title: 'DELETE versus TRUNCATE versus DROP',
    category: 'Databases',
    keywords: [
      'what is the difference between delete truncate and drop', 'delete removes selected rows where clause logged rollback',
      'truncate empties whole table fast deallocates pages resets auto increment', 'drop deletes the table structure and all data',
      'delete vs truncate performance', 'which one can be rolled back',
    ],
    content: `All three remove data, at different levels. DELETE removes rows from a table: you can add a WHERE clause to remove only some of them, it logs every row (so it can be rolled back inside a transaction and it fires row triggers), it does not reset an auto-increment counter, and it is the slowest option on a large table. TRUNCATE removes ALL rows from a table very quickly by deallocating the data pages rather than deleting row by row: it usually cannot be filtered with WHERE, it writes minimal logging, it often resets the auto-increment counter, and it may not fire row triggers — but the table's structure (columns, indexes, constraints) stays. DROP deletes the entire table itself — the data AND the definition, indexes, constraints and permissions — so afterward the table no longer exists. Quick summary: DELETE = remove chosen rows; TRUNCATE = empty the table fast; DROP = destroy the table. (There is also DROP DATABASE, which removes a whole database.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-database-deadlock',
    title: 'What a Database Deadlock Is',
    category: 'Databases',
    keywords: [
      'what is a deadlock in a database', 'two transactions each hold a lock the other needs', 'circular wait for locks deadlock',
      'database detects deadlock kills a victim transaction rollback retry', 'acquire locks in the same order to avoid deadlocks', 'keep transactions short reduce deadlocks',
    ],
    content: `A database deadlock happens when two (or more) transactions each hold a lock that the other one needs, and each is waiting for the other to release it — a circular wait, so neither can ever proceed. Example: transaction 1 locks row A and then tries to lock row B; meanwhile transaction 2 has already locked row B and now tries to lock row A. Databases detect this automatically (typically by building a "wait-for" graph) and break the deadlock by choosing one transaction as the "victim," rolling it back, and returning a deadlock error to that connection, so the application can retry the operation. Ways to reduce deadlocks: always acquire locks on multiple resources in the same order everywhere in the code, keep transactions short so locks are held briefly, use a lower isolation level where it is safe, and add proper indexes so the engine locks fewer rows. (It has nothing to do with pro wrestling.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-denormalization',
    title: 'What Denormalization Is',
    category: 'Databases',
    keywords: [
      'what is denormalization', 'deliberately add redundant duplicated data for faster reads', 'store customer name on each order row avoid join',
      'precomputed count column instead of counting rows', 'denormalization tradeoff writes must update every copy', 'analytics data warehouse wide tables denormalized',
    ],
    content: `Denormalization is deliberately adding redundant or duplicated data to a normalized (relational) database to make reads faster — the opposite of normalization, and it is a normal relational design choice, not a NoSQL-only thing. Instead of splitting data across many tables and reassembling it with JOINs on every query, you keep copies of frequently needed values together. Examples: storing a customer's name directly on every order row (in addition to the customers table) so listing orders needs no join; keeping a "comment_count" column on a post rather than counting the comments table each time it is displayed; building a wide "reporting" table that pre-joins several sources for a dashboard. The trade-off: reads become faster and simpler, but writes become more complex and error-prone, because every copy of the duplicated value must be updated to stay consistent, and the database grows larger. It is standard in analytics and data-warehouse schemas (star and snowflake schemas) and in read-heavy applications.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stored-procedure',
    title: 'What a Stored Procedure Is',
    category: 'Databases',
    keywords: [
      'what is a stored procedure', 'named block of sql saved in the database called by name with parameters', 'stored procedure runs on the db server reduces network round trips',
      'pl/pgsql t-sql pl/sql procedural sql', 'stored procedure security grant execute not table access', 'stored procedure vs function vs trigger',
    ],
    content: `A stored procedure is a named block of SQL — plus procedural logic such as variables, conditionals, loops and error handling — that is saved inside the database and can be called by name, optionally with parameters, like a function. Benefits: the logic lives in one place and can be reused by many applications; it runs on the database server, avoiding lots of statements and data being sent back and forth over the network for a multi-step operation; and you can grant a user permission to run the procedure without granting direct access to the underlying tables, which is a useful security boundary. Drawbacks: the application's logic is now split between the app code and the database (harder to version-control, test and reason about), the procedural SQL dialects are database-specific (PL/pgSQL for PostgreSQL, T-SQL for SQL Server, PL/SQL for Oracle) so procedures are not portable, and putting heavy business logic in the database is now often considered an anti-pattern. Related terms: a "function" returns a value and can be used inside a query; a "trigger" is a procedure that runs automatically in response to an INSERT, UPDATE or DELETE.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-n-plus-1-query',
    title: 'What the N+1 Query Problem Is',
    category: 'Databases',
    keywords: [
      'what is the n plus 1 query problem', 'one query plus one extra query per row of the result', 'orm lazy loading related object inside a loop',
      'fetch list of posts then a query per post for the author', 'fix with eager loading join or single batched query', 'select_related prefetch_related includes joinedload',
    ],
    content: `The N+1 query problem is a common performance bug where code that ought to run a couple of queries instead runs one query plus N more — one for every row of the first result. Typical case: you fetch a list of 100 blog posts with one query, then loop over them and, for each post, run another query to load its author — 1 + 100 = 101 database round trips, when 2 would be enough. It usually comes from an ORM "lazily" loading a related object the first time you access it inside a loop, so it is invisible in the code and silently gets worse as the data grows. Each individual query is cheap, but the network and parsing overhead of hundreds of them makes the operation slow. The fix is "eager loading" — telling the ORM to fetch the related data up front, either with a JOIN or with a single follow-up query that gets all the authors for the collected post IDs at once (Django's select_related / prefetch_related, Rails' includes, SQLAlchemy's joinedload / selectinload, Prisma's include). It has nothing to do with "flash attention" or memory usage.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-database-replication',
    title: 'What Database Replication Is',
    category: 'Databases',
    keywords: [
      'what is database replication', 'keep synced copies of a database on multiple servers', 'primary replica master slave writes to primary reads from replicas',
      'replication for read scaling high availability failover backups', 'synchronous vs asynchronous replication replication lag stale read', 'multi-master multi-primary replication conflicts',
    ],
    content: `Database replication means keeping copies of the same database on more than one server, kept in sync as data changes. The most common form is PRIMARY–REPLICA (formerly "master–slave"): all writes go to the primary server, which streams its changes to one or more read-only replicas. Benefits: read scaling (send read-heavy traffic to the replicas), high availability (if the primary fails, a replica can be promoted to take over — "failover"), running backups and heavy analytics on a replica without slowing the primary, and placing geographic replicas near far-away users. Replication can be SYNCHRONOUS (a write is not confirmed until at least one replica has it — safer, but slower) or ASYNCHRONOUS (fast, but a replica can lag slightly behind, so a read immediately after a write might return stale data — "replication lag"). MULTI-PRIMARY (multi-master) replication lets any node accept writes, which improves write availability but introduces difficult conflict-resolution problems. Replication (redundant full copies of the whole database) is different from sharding (splitting the data into disjoint pieces on different servers).`,
    createdAt: Date.now(),
  },
];
