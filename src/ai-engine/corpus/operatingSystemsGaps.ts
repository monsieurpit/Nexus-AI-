import { KnowledgeItem } from '../../types';

// Batch 99 (operating-systems concepts). Weak area on nexus-4b: "context
// switch" was answered about the Pomodoro productivity technique; "swap space"
// about astrophysics simulations; "copy on write" about database replication;
// "preemptive vs cooperative multitasking", "monolithic vs microkernel" and
// "spooling" were raw web dumps that never contrasted or defined anything;
// "paging" and "kernel mode vs user mode" were thin or truncated; "DMA" was
// half-refused. Deadlock and mutex/semaphore were framed only in database
// terms.
export const OPERATING_SYSTEMS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-context-switch',
    title: 'What a Context Switch Is (Operating Systems)',
    category: 'Computer Science',
    keywords: [
      'what is a context switch', 'context switch operating system saving cpu register state', 'save process state load next process state scheduler',
      'context switch overhead nanoseconds cache tlb pollution', 'context switch triggered by timer interrupt blocking system call', 'context switch is not the pomodoro technique',
    ],
    content: `In an operating system, a context switch is the act of saving the state of the process or thread currently running on a CPU and loading the saved state of another one, so the CPU can switch from executing one to executing the other. The "context" is the data the CPU needs to resume a task exactly where it left off: the program counter, the general-purpose registers, the stack pointer, and memory-management information such as the page-table pointer. A context switch happens when the scheduler decides another task should run — because a time slice expired (a timer interrupt), because the running task made a blocking system call (waiting on disk or network), or because a higher-priority task became ready. It is pure overhead: while the kernel is saving and restoring state, no useful application work is done, and afterwards the new task runs slower for a while because the CPU caches and the TLB are full of the old task's data. A single switch costs on the order of hundreds of nanoseconds to a few microseconds. (This is a hardware/OS concept and has nothing to do with the Pomodoro time-management technique.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-paging-memory',
    title: 'What Paging Is (Memory Management)',
    category: 'Computer Science',
    keywords: [
      'what is paging in memory management', 'paging fixed size pages frames page table mmu translation', 'paging eliminates external fragmentation non-contiguous memory',
      'page table maps virtual page to physical frame tlb caches translations', 'demand paging load page on first access', 'paging vs segmentation',
    ],
    content: `Paging is the memory-management scheme that lets a process's memory be scattered anywhere in physical RAM instead of needing one contiguous block. The virtual address space of each process is divided into fixed-size chunks called pages (commonly 4 KB); physical memory is divided into equal-size chunks called frames. A per-process page table records which frame currently holds each page. When the CPU issues a virtual address, the memory-management unit (MMU) splits it into a page number and an offset, looks the page number up in the page table to get a frame number, and combines that with the offset to form the real physical address; a small fast cache called the TLB holds recently used translations so this doesn't hit memory every time. Paging eliminates external fragmentation, makes it easy to share pages between processes, and enables demand paging — a page is only loaded into RAM the first time it is actually touched, and unused pages can be written out to disk (swapped) to reclaim frames.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-swap-space',
    title: 'What Swap Space Is',
    category: 'Computer Science',
    keywords: [
      'what is swap space', 'swap space disk area overflow for ram paging out inactive pages', 'swap partition swap file operating system',
      'swapping lets system run more than fits in ram at a speed cost', 'heavy swapping causes thrashing', 'swap used for hibernation storing ram contents',
    ],
    content: `Swap space is an area on disk — a dedicated partition or a regular file — that the operating system uses as an overflow for physical RAM. When memory pressure is high, the OS takes pages that haven't been used recently and writes them out to swap ("paging out" or "swapping out"), freeing those frames for active work; when a swapped-out page is touched again it is read back in, causing a page fault and a noticeable delay. This lets a machine run more programs, or larger ones, than would fit in RAM at once, at the cost of speed, because disk (even an SSD) is far slower than RAM. If the working set of the running programs is much larger than RAM, the system spends nearly all its time swapping pages in and out and gets almost no real work done — that state is called thrashing. Swap is also where the contents of RAM are saved when a computer hibernates. (This is an OS concept, unrelated to how scientific simulations chunk large datasets.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-copy-on-write',
    title: 'What Copy-on-Write Is',
    category: 'Computer Science',
    keywords: [
      'what is copy on write', 'copy on write share original mark read only copy only on first write', 'copy on write fork child shares parent pages until one writes',
      'copy on write filesystem snapshots btrfs zfs apfs', 'cow saves memory when copies are rarely modified', 'copy on write is not database replication',
    ],
    content: `Copy-on-write (COW) is an optimization for making "copies" of data cheaply. When something is copied, the system does not immediately duplicate the underlying bytes; instead the copy and the original share the same physical data, which is marked read-only. Only when one of them tries to modify a shared piece does the system actually make a private copy of just that piece and let the write proceed. The classic use is the Unix fork() system call: the child process starts out sharing all of the parent's memory pages, and a page is only physically duplicated if the parent or child writes to it — so forking a large process and immediately calling exec() costs almost nothing. Copy-on-write also underlies filesystem and volume snapshots (Btrfs, ZFS, APFS, LVM) and many languages' immutable string and collection types. It is a big win whenever copies are made often but modified rarely. (It is a memory/storage technique, not a database replication strategy.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-preemptive-vs-cooperative-multitasking',
    title: 'Preemptive vs Cooperative Multitasking',
    category: 'Computer Science',
    keywords: [
      'what is the difference between preemptive and cooperative multitasking', 'preemptive multitasking os forcibly suspends a task timer interrupt', 'cooperative multitasking task keeps cpu until it voluntarily yields',
      'cooperative multitasking one hung task freezes everything classic mac os windows 3.x', 'preemptive multitasking guarantees fairness responsiveness modern os', 'async await event loop is cooperative within a thread',
    ],
    content: `Both are ways to share one CPU among several tasks, differing in who decides when a task stops running. In PREEMPTIVE multitasking the operating-system scheduler can forcibly suspend a running task at any moment — typically on a periodic timer interrupt — and hand the CPU to another task, whether or not the first task was ready to give it up. This guarantees fairness and responsiveness and means a single task stuck in an infinite loop cannot freeze the whole system. Every modern general-purpose OS (Linux, Windows NT and later, macOS, the BSDs) works this way. In COOPERATIVE (or non-preemptive) multitasking a task keeps the CPU until it voluntarily yields control back, usually by calling a "yield" function or making a blocking system call. It is simpler and has lower switching overhead, but one misbehaving or long-running task hangs everything — the reason classic Mac OS (through version 9) and Windows 3.x felt fragile. The cooperative model lives on today inside a single thread as the async/await event loop used by JavaScript, Python asyncio and similar: a coroutine runs until it hits an await point and hands control back to the event loop.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-monolithic-vs-microkernel',
    title: 'Monolithic Kernel vs Microkernel',
    category: 'Computer Science',
    keywords: [
      'what is the difference between a monolithic kernel and a microkernel', 'monolithic kernel whole os runs in kernel mode one address space linux bsd',
      'microkernel only ipc scheduling basic memory in kernel drivers filesystems run as user space servers', 'microkernel message passing more robust crashed driver restarts minix qnx sel4',
      'monolithic faster no mode switch between services but a driver bug crashes the kernel', 'hybrid kernel xnu windows nt',
    ],
    content: `This is about how much of the operating system runs in privileged kernel mode. In a MONOLITHIC kernel, essentially the entire OS — process scheduler, memory manager, file systems, device drivers, network stack — runs together in kernel mode in a single address space. Calls between these subsystems are just ordinary function calls, so it is fast, but a bug in any one piece (a flaky driver, say) can corrupt kernel memory and crash the whole machine. Linux, the BSDs and traditional Unix are monolithic (Linux mitigates the rigidity with loadable modules). In a MICROKERNEL, only the bare minimum runs in kernel mode — inter-process communication, basic scheduling, low-level memory handling — and everything else (file systems, drivers, protocol stacks) runs as separate isolated processes ("servers") in user space that communicate by passing messages. A crashed driver can be restarted without taking down the system, and the design is more modular and easier to verify (seL4 is formally proven), but the message-passing between components adds overhead. MINIX, QNX and seL4 are microkernels. Windows NT and macOS's XNU are "hybrids" — microkernel-influenced structure but with performance-critical services kept in kernel space.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-kernel-mode-user-mode',
    title: 'Kernel Mode vs User Mode',
    category: 'Computer Science',
    keywords: [
      'what is the difference between kernel mode and user mode', 'user mode restricted cannot run privileged instructions or touch hardware directly', 'kernel mode full access to hardware and all memory',
      'cpu mode bit protection ring 0 ring 3', 'system call trap instruction is the controlled gateway into kernel mode', 'isolation stops a buggy app from crashing the machine',
    ],
    content: `Modern CPUs run code in at least two privilege levels, and the OS uses them to protect itself and each program from the others. In USER MODE (also called ring 3), code is restricted: it cannot execute privileged instructions, cannot directly access hardware devices, and cannot read or write memory outside what the OS has assigned to its process. All ordinary application code runs here. In KERNEL MODE (ring 0, supervisor mode), code has unrestricted access to every instruction, all of physical memory, and all hardware. Only the operating-system kernel runs in this mode. A CPU flag (the mode bit) records which mode is active. When an application needs the OS to do something privileged — open a file, allocate memory, send network data — it makes a system call: a special trap/syscall instruction that switches the CPU to kernel mode at a fixed, controlled entry point, runs vetted kernel code to perform the request, and then switches back to user mode before returning. This boundary is what stops a buggy or malicious program from corrupting other programs or crashing the whole system.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-deadlock-os',
    title: 'What a Deadlock Is (Operating Systems)',
    category: 'Computer Science',
    keywords: [
      'what is a deadlock', 'deadlock two threads each hold a lock the other needs circular wait', 'coffman conditions mutual exclusion hold and wait no preemption circular wait',
      'deadlock prevention acquire locks in a consistent global order', 'deadlock detection and recovery kill a process rollback', 'deadlock vs livelock vs starvation',
    ],
    content: `A deadlock is a situation where a set of tasks are all permanently blocked because each is waiting for a resource that another one in the set is holding. The simplest case: thread A locks resource 1 and then tries to lock resource 2, while thread B has locked resource 2 and is trying to lock resource 1 — neither can proceed and neither will ever release what it holds. Four conditions must all hold for a deadlock to be possible (the Coffman conditions): mutual exclusion (a resource can't be shared), hold-and-wait (a task holds resources while requesting more), no preemption (resources can't be forcibly taken away), and circular wait (a cycle of tasks each waiting on the next). Break any one and deadlock becomes impossible — the most common practical fix is to always acquire locks in a single agreed global order, which kills the circular wait. Alternatively a system can detect deadlock cycles at runtime and recover by aborting or rolling back one of the involved tasks. Deadlock is distinct from livelock (tasks keep changing state in response to each other but make no progress) and starvation (a task is repeatedly passed over but isn't strictly blocked).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mutex-vs-semaphore',
    title: 'Mutex vs Semaphore',
    category: 'Computer Science',
    keywords: [
      'what is a mutex versus a semaphore', 'mutex mutual exclusion one holder has ownership only locker can unlock', 'semaphore counter allows n concurrent holders',
      'binary semaphore is a signaling primitive no ownership', 'counting semaphore limits access to a pool of n resources', 'mutex for protecting a critical section semaphore for signaling between threads',
    ],
    content: `Both are synchronization primitives, but they solve different problems. A MUTEX (mutual-exclusion lock) protects a critical section: at most one thread may hold it at a time, and — crucially — it has the concept of ownership, so only the thread that locked it is allowed to unlock it. You use a mutex when exactly one thread at a time may touch some shared data. A SEMAPHORE is a counter with two atomic operations, "wait" (decrement, block if the count is already zero) and "signal"/"post" (increment, waking a waiter). A counting semaphore initialized to N lets up to N threads through at once — ideal for handing out a limited pool of resources (say, 5 database connections). A binary semaphore (count 0 or 1) looks like a mutex but has no ownership: one thread can wait on it while a completely different thread (or an interrupt handler) posts it, which makes semaphores the natural tool for signaling that an event has occurred, not just for guarding data. Rule of thumb: mutex for mutual exclusion, semaphore for signaling or for counting available units of something.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-spooling',
    title: 'What Spooling Is',
    category: 'Computer Science',
    keywords: [
      'what is spooling', 'spooling simultaneous peripheral operation on-line buffer on disk for a slow device', 'print spooler print queue classic example application finishes printing instantly',
      'spooling lets the cpu keep working while a slow peripheral catches up', 'spooling vs buffering whole jobs vs streaming', 'spool directory batch jobs',
    ],
    content: `Spooling (from "Simultaneous Peripheral Operation On-Line") is the technique of putting a complete job or its data into a buffer — historically on disk — so that a slow device can process it at its own pace while the program that produced it moves on. The everyday example is printing: when you "print" a document, the OS writes the whole print job into a spool directory and the application is immediately free again; a background process, the print spooler, then feeds pages to the printer as fast as the printer can take them, and manages a queue if several jobs are waiting. Spooling differs from simple buffering in that it typically holds entire self-contained jobs and can reorder or prioritize them, whereas a buffer just smooths a continuous stream. It was originally introduced so that a mainframe's expensive CPU didn't sit idle waiting for card readers and line printers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dma',
    title: 'What DMA (Direct Memory Access) Is',
    category: 'Computer Science',
    keywords: [
      'what is dma direct memory access', 'dma controller transfers data directly between a device and ram without the cpu copying each word',
      'cpu sets up dma transfer source destination length then does other work gets an interrupt when done', 'dma essential for high throughput disk network gpu audio io',
      'programmed io vs dma', 'dma frees the cpu from byte by byte transfer',
    ],
    content: `Direct Memory Access is a hardware feature that lets a device move data to or from main memory without the CPU shuffling every byte itself. Without DMA ("programmed I/O"), the CPU has to execute a load and a store for each word transferred, which wastes its time on high-volume I/O. With DMA, the CPU just programs a DMA controller with the source address, the destination address, and the length, then goes off and does other work; the DMA controller performs the transfer over the memory bus on its own and raises an interrupt when it is finished. This is how disk and SSD reads/writes, network-card traffic, sound-card audio streams, and GPU data uploads all work — the throughput of a modern system would be impossible if the CPU had to mediate each byte. The trade-off is added hardware complexity and the need to keep CPU caches coherent with memory the DMA controller has changed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bootloader',
    title: 'What a Bootloader Is',
    category: 'Computer Science',
    keywords: [
      'what is a bootloader', 'bootloader loads the operating system kernel into memory and jumps to it', 'firmware bios uefi runs first then hands off to a bootloader grub systemd-boot windows boot manager',
      'multi-stage bootloader first stage fits in the 512 byte mbr', 'boot manager offers a menu of operating systems', 'boot process power on firmware bootloader kernel init',
    ],
    content: `A bootloader is the small program that runs early in a computer's start-up and is responsible for loading the operating-system kernel into memory and transferring control to it. The sequence: at power-on the CPU runs the firmware (BIOS or, on modern machines, UEFI), which initializes essential hardware and then locates and runs a bootloader from a disk, partition, or the network. The bootloader finds the kernel image, loads it (and often an initial RAM disk) into memory, sets up the environment the kernel expects, and jumps to the kernel's entry point; the kernel then starts the first user-space process. Bootloaders are frequently multi-stage because the very first stage must fit in a tiny fixed space — for example the 512-byte master boot record — so it does little more than load a larger second stage. When a bootloader presents a menu to choose between installed operating systems or kernel versions it is also called a boot manager; common ones are GRUB, systemd-boot, and the Windows Boot Manager.`,
    createdAt: Date.now(),
  },
];
