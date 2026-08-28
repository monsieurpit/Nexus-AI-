import { KnowledgeItem } from '../../types';

export const PROGRAMMING_LANGUAGES_OVERVIEW_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-proglang-rust-go',
    title: 'Rust and Go: What They\'re Used For',
    category: 'Programming',
    keywords: ['what is rust programming language used for', 'what is go programming language', 'rust memory safety', 'golang use cases'],
    content: `**Rust** is a systems programming language, first released in 2010 by Mozilla, designed to give programmers the raw speed and low-level control of languages like C and C++ while eliminating an entire class of dangerous memory-management bugs (like buffer overflows and use-after-free errors) that have historically caused huge numbers of security vulnerabilities and crashes in software written in those older languages. Rust achieves this through a strict compile-time system called the "borrow checker," which enforces rules about how memory can be accessed and shared, catching many bugs before the program ever runs rather than at runtime. It has become popular for performance-critical, safety-sensitive software including operating system components, web browsers (parts of Firefox are written in Rust), and blockchain infrastructure, and it has topped Stack Overflow's "most loved programming language" developer survey for multiple years running. **Go** (or "Golang"), created by Google and released in 2009, was designed for simplicity, fast compilation, and excellent built-in support for concurrency (running many tasks efficiently at once) — making it especially popular for backend web services, cloud infrastructure, and networked systems at scale; major tools including Docker and Kubernetes (widely used container and infrastructure technologies) are written in Go. Compared to Rust, Go trades some low-level control and Rust's stricter safety guarantees for much simpler syntax and a gentler learning curve, making it faster to learn and write productively.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-proglang-cpp-java-sql',
    title: 'C++, Java, and SQL: What They\'re Used For',
    category: 'Programming',
    keywords: ['what is c++ used for', 'what is java programming language used for', 'what is sql used for', 'java vs c++'],
    content: `**C++**, an extension of the older C language first released in 1985, adds object-oriented programming features (organizing code around reusable "objects" bundling data and behavior together) while retaining C's low-level performance and hardware control. It remains dominant in performance-critical applications where speed matters enormously, including video game engines, real-time systems, and high-frequency trading software, though it's also notoriously complex and gives programmers enough low-level control to introduce serious memory-management bugs if used carelessly. **Java**, released by Sun Microsystems in 1995, popularized the design philosophy "write once, run anywhere" — Java code compiles to an intermediate format that runs on the Java Virtual Machine (JVM), letting the same compiled program run on different operating systems without modification. It remains hugely popular for large enterprise business applications, Android app development (Java was Android's original primary language before Kotlin became preferred), and backend systems at many major companies. **SQL** (Structured Query Language) is fundamentally different from the languages above — it's a specialized language specifically for querying, updating, and managing data stored in relational databases (organized into tables with rows and columns), using commands like SELECT, INSERT, UPDATE, and DELETE. Virtually any application that stores and retrieves structured data — from a small business's customer records to massive banking systems — relies on SQL or a close variant of it somewhere in its backend infrastructure.`,
    createdAt: Date.now(),
  },
];
