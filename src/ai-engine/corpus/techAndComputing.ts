import { KnowledgeItem } from '../../types';

export const TECH_AND_COMPUTING_CORPUS: KnowledgeItem[] = [
  // 1. How the Internet Works & Network Protocols
  {
    id: 'kb-how-internet-works-dns-tcp',
    title: 'How the Internet Works: DNS, TCP/IP, TLS Handshake & HTTP/3',
    category: 'networking',
    keywords: [
      'how internet works',
      'dns',
      'dns resolution',
      'tcp ip',
      'tcp handshake',
      'tls handshake',
      'http3',
      'quic',
      'packets',
      'router',
      'bgp',
      'ssl',
    ],
    content: `When you type a URL (e.g. https://example.com) and hit Enter, this exact sequence occurs within milliseconds:
1. **DNS (Domain Name System) Resolution**:
   - Browser checks local cache ➔ OS resolver cache ➔ Recursive DNS Resolver (e.g. 1.1.1.1 or 8.8.8.8).
   - If uncached, the resolver queries the **Root Name Servers** (13 root clusters labeled A–M) ➔ **TLD Servers** (.com registry) ➔ **Authoritative Name Server** (e.g. Cloudflare/AWS Route 53) to return the target IPv4/IPv6 address.
2. **TCP 3-Way Handshake (Connection Setup)**:
   - Client sends **SYN** packet (Synchronize sequence number).
   - Server responds with **SYN-ACK** (Synchronize-Acknowledge).
   - Client returns **ACK** (Acknowledge) — establishing a reliable, ordered, bi-directional byte stream.
3. **TLS 1.3 Security Handshake**:
   - Client and server exchange supported cipher suites and ephemeral Diffie-Hellman keys via **ClientHello** and **ServerHello**.
   - Authenticates server identity via X.509 Certificate and negotiates symmetric encryption keys (AES-GCM or ChaCha20-Poly1305) in just 1 round-trip time (1-RTT).
4. **HTTP Request & Response**:
   - Client sends an encrypted \`GET /\` request with headers.
   - The web server/reverse proxy (Nginx, Caddy, Node.js) processes the request and streams back the HTML/CSS/JS payload with status codes (200 OK, 301 Redirect, 404 Not Found, 500 Error).
5. **HTTP/3 & QUIC Protocol**:
   - Modern HTTP/3 replaces TCP with UDP-based **QUIC**, eliminating Head-of-Line blocking across multiplexed streams and enabling 0-RTT connection resumption.`,
    createdAt: Date.now(),
  },

  // 2. CPU vs GPU Architecture & Memory Hierarchy
  {
    id: 'kb-cpu-vs-gpu-memory-hierarchy',
    title: 'Computer Architecture: CPU vs GPU, Cache Hierarchy & Pipelining',
    category: 'hardware',
    keywords: [
      'cpu',
      'gpu',
      'difference between cpu and gpu',
      'l1 l2 l3 cache',
      'registers',
      'simd',
      'cuda',
      'clock speed',
      'branch prediction',
      'pipelining',
    ],
    content: `Comparison of Central Processing Units (CPUs) and Graphics Processing Units (GPUs):
1. **CPU Architecture (Low Latency, High Single-Thread Performance)**:
   - Features 4 to 64 large cores optimized for sequential execution.
   - **Out-of-Order Execution & Branch Prediction**: Speculatively executes instruction paths using history tables; rolls back state on branch mispredictions.
   - **Complex Cache Hierarchy**:
     - Registers (<1 clock cycle, tiny capacity ~few KB).
     - L1 Cache (~32-64 KB per core, ~1 ns latency, 4-5 cycles).
     - L2 Cache (~512 KB - 1 MB per core, ~3-4 ns latency).
     - L3 Cache (~16-128 MB shared pool, ~10-15 ns latency).
     - System RAM (DDR5, ~60-80 ns latency, 32-128 GB).
2. **GPU Architecture (Massive Parallel Throughput)**:
   - Features thousands of compact, lightweight cores executing SIMD/SIMT (Single Instruction, Multiple Threads).
   - Designed to execute matrix operations and rasterization in parallel across 32-thread warps.
   - Prioritizes massive memory bandwidth (HBM3e / GDDR6X at >1,000 GB/s) over low cache latency.
- **Summary**: CPUs excel at low-latency sequential logic, branching, and system coordination; GPUs excel at parallel matrix multiplication, 3D graphics rendering, and neural network tensor operations.`,
    createdAt: Date.now(),
  },

  // 3. Cryptography & Data Security Essentials
  {
    id: 'kb-cryptography-hashing-encryption',
    title: 'Cryptography: Symmetric vs Asymmetric Encryption & Cryptographic Hashing',
    category: 'security',
    keywords: [
      'cryptography',
      'encryption',
      'symmetric encryption',
      'asymmetric encryption',
      'rsa',
      'aes 256',
      'sha 256',
      'hashing',
      'public key',
      'private key',
      'bcrypt',
    ],
    content: `Modern cryptographic algorithms safeguard data at rest and in transit:
1. **Symmetric Encryption (Single Shared Secret Key)**:
   - Both encryption and decryption use the exact same secret key.
   - **AES-256 (Advanced Encryption Standard)**: Uses substitution-permutation network rounds (14 rounds for 256-bit). Highly efficient in hardware (AES-NI instructions) and mathematically unbreakable against brute force with current computing.
2. **Asymmetric Encryption (Public / Private Key Pair)**:
   - **Public Key**: Shared openly; anyone can encrypt messages or verify signatures.
   - **Private Key**: Kept strictly confidential; only the owner can decrypt messages or sign documents.
   - **RSA**: Relies on the computational hardness of factoring large prime numbers ($N = p \\times q$).
   - **ECC (Elliptic Curve Cryptography / Ed25519)**: Provides equivalent 256-bit security to 3072-bit RSA with vastly smaller key sizes and faster math based on the discrete logarithm problem on elliptic curves.
3. **One-Way Cryptographic Hashing**:
   - Deterministic, fixed-length output (digest) with collision resistance and avalanche effect (changing 1 bit in input changes ~50% of output bits).
   - **SHA-256**: Generates a 256-bit (64 hex characters) hash for integrity checks, Git commits, and blockchain verification.
   - **Password Hashing (bcrypt, Argon2, scrypt)**: Intentionally slow and memory-hard with salting and work factors to prevent GPU brute-force and rainbow table attacks.`,
    createdAt: Date.now(),
  },

  // 4. Git Internals & Directed Acyclic Graphs (DAG)
  {
    id: 'kb-git-internals-dag-objects',
    title: 'Git Internals: Object Database, DAG Architecture & Merge vs Rebase',
    category: 'coding',
    keywords: [
      'git',
      'how git works',
      'git internals',
      'git objects',
      'blob',
      'tree',
      'commit',
      'rebase vs merge',
      'git dag',
      'git commit',
    ],
    content: `Git is a content-addressable storage filesystem and Directed Acyclic Graph (DAG):
1. **The 4 Fundamental Git Object Types (stored in .git/objects)**:
   - **Blob (Binary Large Object)**: Stores pure file content (no filenames or metadata), keyed by the SHA hash of its content.
   - **Tree**: Represents a directory, linking file mode, filenames, and SHA hashes pointing to Blobs or sub-Trees.
   - **Commit**: Contains a pointer to the root Tree object, author/committer metadata, timestamp, commit message, and parent commit SHA(s).
   - **Tag (Annotated)**: An immutable reference pointing directly to a specific commit object with a cryptographic signature.
2. **References & HEAD**:
   - Branches and tags are simply plain text files in \`.git/refs/heads/\` containing a 40-character SHA pointer to a commit.
   - \`HEAD\` points to the currently checked-out branch reference.
3. **Merge vs Rebase**:
   - **Merge (\`git merge feature\`)**: Creates a 3-way merge commit with two parents, preserving complete historical context and timeline topology.
   - **Rebase (\`git rebase main\`)**: Replays commits from the feature branch on top of main's latest commit, rewriting commit hashes for a clean, linear commit history.`,
    createdAt: Date.now(),
  },

  // 5. Relational Databases vs NoSQL & Indexing
  {
    id: 'kb-database-indexing-acid-nosql',
    title: 'Databases: B-Tree Indexing, ACID Transactions & SQL vs NoSQL',
    category: 'coding',
    keywords: [
      'databases',
      'sql vs nosql',
      'b-tree index',
      'acid transactions',
      'indexing',
      'relational database',
      'mongodb',
      'postgresql',
      'write ahead log',
    ],
    content: `Database engineering principles and storage engines:
1. **ACID Guarantees in Relational DBs (PostgreSQL, MySQL, SQLite)**:
   - **Atomicity**: All operations in a transaction succeed or all roll back (all-or-nothing).
   - **Consistency**: Data always satisfies schema constraints, foreign keys, and unique checks.
   - **Isolation**: Concurrent transactions execute without cross-contamination (Read Committed, Repeatable Read, Serializable).
   - **Durability**: Committed data survives power outages via Write-Ahead Logging (WAL) flushed to non-volatile disk.
2. **B-Tree & B+ Tree Indexing**:
   - Self-balancing multi-way search trees with high fan-out (hundreds of keys per node), reducing disk I/O seek operations to $O(\\log N)$.
   - All data records/pointers reside in the leaf nodes, which are linked sequentially for rapid range queries (\`WHERE age BETWEEN 20 AND 30\`).
3. **SQL vs NoSQL Architectural Trade-offs**:
   - **Relational / SQL**: Structured schemas, strict normalization, relational \`JOIN\` operations, and strong consistency.
   - **Document / NoSQL (MongoDB, Firestore)**: Flexible JSON schemas, denormalized documents, horizontal scalability via automatic sharding.
   - **Key-Value / In-Memory (Redis)**: Sub-millisecond $O(1)$ reads and writes for session caches, leaderboards, and rate limiters.`,
    createdAt: Date.now(),
  },

  // 6. Race Conditions, Deadlocks & Concurrency Control
  {
    id: 'kb-race-conditions-concurrency-deadlocks',
    title: 'Race Conditions, Deadlocks & Concurrency Control',
    category: 'coding',
    keywords: [
      'race condition',
      'data race',
      'deadlock',
      'concurrency',
      'thread safety',
      'mutex',
      'semaphore',
      'critical section',
      'atomic operation',
      'lock',
    ],
    content: `A **race condition** happens when two or more threads (or processes) access shared data at the same time, and the final outcome depends on the unpredictable order in which their operations happen to interleave.
1. **Classic Example**: Two threads both run \`balance = balance + 10\`. Each reads the current value, adds 10, then writes it back. If both threads read the same starting value before either writes, one of the +10 updates gets silently lost the final balance is wrong, and it happens non-deterministically, making these bugs notoriously hard to reproduce.
2. **Critical Section**: The block of code that touches the shared resource. The fix is making it execute atomically only one thread inside it at a time.
3. **Concurrency Control Tools**:
   - **Mutex (mutual exclusion lock)**: Only the thread holding the lock may enter the critical section; others block until it's released.
   - **Semaphore**: Like a mutex but allows up to N concurrent holders useful for limiting access to a pool of N resources.
   - **Atomic operations**: Hardware-guaranteed single-instruction read-modify-write (e.g. compare-and-swap), avoiding the need for a lock entirely for simple counters.
4. **Deadlock**: A different failure mode where two or more threads each hold a lock the other needs and wait forever classic cause: acquiring multiple locks in inconsistent order across different code paths. Fixed by always acquiring locks in the same global order, or using a lock-free/timeout-based approach.
5. **Data Race vs Race Condition**: A *data race* is specifically simultaneous unsynchronized access to the same memory (at least one write) technically undefined behavior in languages like C++/Rust. A *race condition* is the broader logic bug where correctness depends on timing, which can happen even without a technical data race (e.g. two separate database transactions racing).`,
    createdAt: Date.now(),
  },
];
