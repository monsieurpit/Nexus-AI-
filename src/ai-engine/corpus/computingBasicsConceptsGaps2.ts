import { KnowledgeItem } from '../../types';

/**
 * COMPUTING_BASICS_CONCEPTS_GAPS_2 — batch 240 corrections.
 * Misses:
 * - "32-bit vs 64-bit" answered about 32-bit-float AUDIO / dynamic range.
 * - "kilobyte vs kibibyte" said a kibibyte is 1024*1024 bytes (it is 1024).
 * - "USB-A vs USB-C" was a USB + GPS web dump.
 * - "Wi-Fi vs the internet" was an HTTP/HTTPS web dump.
 * - "HDMI vs DisplayPort" was a web dump.
 * - Several comparison answers described only the first half before being cut:
 *   SSD/HDD, bus/port, IPv4/IPv6, domain name/URL, download/upload,
 *   firewall/antivirus, file/folder, kernel/shell, cloud/data center,
 *   CPU core/thread.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'technology', keywords, content, createdAt: now,
});

export const COMPUTING_BASICS_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-comp2-32-vs-64-bit',
    '32-bit vs 64-bit (computing architecture)',
    [
      'difference between 32-bit and 64-bit', 'refers to CPU word size and memory address width not audio', '32-bit can address about 4 GB of RAM',
      '64-bit can address far more memory and process larger numbers per operation', '64-bit operating systems and applications', 'x86 versus x86-64 amd64',
    ],
    `In computing this refers to the CPU architecture — how many bits the processor handles in one operation and, crucially, how wide its memory ADDRESSES are. (It is not the audio "32-bit float" thing.)

A 32-bit CPU/OS uses 32-bit memory addresses, so it can address at most 2^32 bytes = about 4 GB of RAM (often less usable in practice). It works with 32-bit integers natively.

A 64-bit CPU/OS uses 64-bit addresses, so it can address 2^64 bytes — theoretically 16 exabytes, in practice far more RAM than any machine has. It also processes 64-bit numbers in one step, which speeds up large-number and some media/crypto work, and has more CPU registers.

Consequences: 64-bit is required to use more than ~4 GB of RAM; a 64-bit OS can run most 32-bit apps (with a compatibility layer) but a 32-bit OS cannot run 64-bit apps; and modern software increasingly ships 64-bit only. Essentially all computers and phones since the mid-2010s are 64-bit.`,
  ),
  k(
    'kb-gap-comp2-kilobyte-vs-kibibyte',
    'Kilobyte vs kibibyte',
    [
      'difference between a kilobyte and a kibibyte', 'kilobyte kB is 1000 bytes decimal SI', 'kibibyte KiB is exactly 1024 bytes binary IEC',
      'mebibyte MiB gibibyte GiB', 'why a 500 GB drive shows as about 465 GiB', 'the 1024 confusion',
    ],
    `The difference is 1000 versus 1024, and it is a source of endless confusion.

A KILOBYTE (kB) in the strict modern (SI/decimal) sense is exactly 1,000 bytes — "kilo" means a thousand, as in kilometre or kilogram. A megabyte is 1,000,000 bytes, a gigabyte 1,000,000,000. Storage manufacturers use these decimal units.

A KIBIBYTE (KiB) is exactly 1,024 bytes (2^10) — the binary unit. Likewise a mebibyte (MiB) = 1,024 KiB = 1,048,576 bytes, and a gibibyte (GiB) = 1,024 MiB. These IEC binary prefixes (kibi, mebi, gibi) were introduced in 1998 precisely to remove ambiguity. (A kibibyte is NOT 1024x1024 — that is a mebibyte.)

Historically "kilobyte" was loosely used to mean 1,024 bytes because computer memory is organised in powers of two. That legacy usage is why a hard drive sold as "500 GB" (500,000,000,000 bytes, decimal) shows up in some operating systems as about "465 GB" — the OS is really showing 465 GiB but labelling it "GB". Windows still mislabels; macOS and Linux now use the decimal definition for display.`,
  ),
  k(
    'kb-gap-comp2-usb-a-vs-usb-c',
    'USB-A vs USB-C',
    [
      'difference between USB-A and USB-C', 'USB-A is the classic flat rectangular connector one orientation only usually on the host', 'USB-C is small oval reversible same on both ends',
      'USB-C supports much higher power delivery up to 240W higher data rates and alt modes like DisplayPort and Thunderbolt', 'connector shape not a data-speed spec by itself',
    ],
    `These are USB CONNECTOR shapes, not data-speed standards (a given cable's speed depends on the USB version — USB 2.0, 3.2, USB4 — separately).

USB-A is the original: a flat rectangular plug that only goes in one way (the source of endless "flip it three times" jokes). It is almost always the "host" end — on a computer, charger, or hub. Its shape limits it to lower power and, on the same generation, generally lower practical throughput.

USB-C is the modern connector: a small, rounded, symmetrical oval that is REVERSIBLE (no wrong way up) and the SAME on both ends of the cable. Its 24 pins allow a lot more: USB Power Delivery up to 240 W (enough to charge laptops), the newest data rates (USB 3.2 Gen 2x2 at 20 Gbps, USB4/Thunderbolt at 40 Gbps), and "alternate modes" that carry DisplayPort video, Thunderbolt, or HDMI over the same port. It is now the standard connector for phones, laptops, tablets, and — by EU law since 2024 — most small devices.

Short version: USB-A = old, one-way, host-side, limited; USB-C = new, reversible, both-ends, high power, high speed, video-capable.`,
  ),
  k(
    'kb-gap-comp2-hdmi-vs-displayport',
    'HDMI vs DisplayPort',
    [
      'difference between HDMI and DisplayPort', 'both carry digital video and audio over one cable', 'HDMI is consumer-electronics focused proprietary licensing common on TVs consoles and set-top boxes',
      'DisplayPort is a royalty-free VESA standard PC and monitor focused higher bandwidth per version multi-stream daisy chaining adaptive sync', 'DP to HDMI adapters are common',
    ],
    `Both are digital interfaces that carry video and audio down a single cable; they come from different worlds.

HDMI (High-Definition Multimedia Interface) is aimed at CONSUMER ELECTRONICS — TVs, games consoles, Blu-ray players, set-top boxes, soundbars. It is a proprietary standard whose makers pay licensing fees. It carries video, audio, and control signals (HDMI-CEC lets one remote control several devices), and modern versions (HDMI 2.1) support 4K/120 Hz and 8K.

DISPLAYPORT is aimed at COMPUTERS and MONITORS. It is an open standard from VESA with no royalty, and it generally offers more raw bandwidth per version than the contemporary HDMI. Its distinctive features: Multi-Stream Transport (daisy-chaining several monitors from one port), Adaptive-Sync (the basis of FreeSync/G-Sync for tear-free gaming), and it is the video signal carried over USB-C "DP alt mode".

In practice: use HDMI to connect to a TV or console; use DisplayPort for a gaming PC and monitor, especially for high refresh rates and multiple displays. Adapters between the two are common because the signalling is convertible.`,
  ),
  k(
    'kb-gap-comp2-wifi-vs-internet',
    'Wi-Fi vs the internet',
    [
      'difference between Wi-Fi and the internet', 'Wi-Fi is a wireless technology that connects devices to a local network usually to a router', 'the internet is the global network of interconnected networks',
      'you can have Wi-Fi with no internet router offline', 'you can have internet with no Wi-Fi ethernet or cellular', 'Wi-Fi is one way to reach the internet not the internet itself',
    ],
    `WI-FI is a short-range WIRELESS networking technology. It connects your devices (phone, laptop, TV) to a local network — in a home, that means to your ROUTER — without cables. That is all it does: it is the last hop between your device and the router.

The INTERNET is the global system of interconnected computer networks — millions of networks worldwide exchanging data via shared protocols (IP). Your router reaches it through your internet service provider (over cable, fibre, DSL, or a cellular link).

They are independent:
- Wi-Fi with NO internet: your phone connects to the router fine, but the modem/ISP link is down — you see "connected, no internet".
- Internet with NO Wi-Fi: a desktop plugged in by Ethernet, or a phone on 5G, is on the internet with no Wi-Fi involved.

So Wi-Fi is just one way to get onto a network that can then reach the internet. Saying "the Wi-Fi is down" when you mean "the internet connection is down" is a common mix-up.`,
  ),
  k(
    'kb-gap-comp2-ssd-vs-hdd',
    'SSD vs HDD',
    [
      'difference between an SSD and an HDD', 'HDD hard disk drive stores data magnetically on spinning platters read by a moving head', 'SSD solid state drive stores data in flash memory chips no moving parts',
      'SSD much faster silent more durable more expensive per gigabyte', 'HDD cheaper and available in larger capacities', 'SSD for the OS and apps HDD for bulk storage',
    ],
    `Both store your files permanently (they keep data with the power off), but they use completely different technology.

An HDD (Hard Disk Drive) stores data MAGNETICALLY on rapidly spinning metal platters (5,400 or 7,200 rpm), with a tiny arm and head that moves across the surface to read and write. Because it has moving mechanical parts it is slower (especially at finding scattered data), makes noise, uses more power, and can be damaged by drops. It is CHEAP per gigabyte and comes in very large capacities (many terabytes).

An SSD (Solid State Drive) stores data in FLASH memory chips — no moving parts at all. It is far faster (a computer with an SSD boots and loads apps in seconds), silent, cooler, lower power, and much more shock-resistant. It costs more per gigabyte, though prices have fallen a lot. NVMe SSDs that plug into the PCIe bus are faster still than older SATA SSDs.

Common setup: an SSD for the operating system and programs (for speed), and an HDD for bulk storage of media and backups (for cheap capacity).`,
  ),
  k(
    'kb-gap-comp2-bus-vs-port',
    'Bus vs port (computer hardware)',
    [
      'difference between a bus and a port', 'a bus is an internal shared pathway that carries data between components address data and control lines', 'a port is an interface or endpoint where a device connects',
      'PCIe and system bus versus USB port HDMI port', 'software port number is a different concept', 'a port often connects to a bus',
    ],
    `A BUS is a shared internal PATHWAY that carries data between the components of a computer — the CPU, RAM, and peripherals. It is a set of parallel or serial wires/traces grouped by function: the data lines carry the actual bytes, the address lines say where they go, and the control lines carry timing and command signals. Examples: the system/front-side bus, the memory bus, and PCI Express (PCIe), which connects graphics cards and NVMe SSDs.

A PORT is an INTERFACE or endpoint where something plugs in or connects. In hardware it is the physical connector on the outside of the machine — a USB port, HDMI port, Ethernet port, headphone jack — through which an external device attaches. (In networking software, a "port number" like 80 or 443 is a separate idea: a numbered channel that lets one computer run many network services at once.)

Relationship: data coming in through a hardware port is routed onto an internal bus to reach the CPU and memory. The bus is the highway inside; the port is the on-ramp at the edge.`,
  ),
  k(
    'kb-gap-comp2-ipv4-vs-ipv6',
    'IPv4 vs IPv6',
    [
      'difference between IPv4 and IPv6', 'IPv4 is 32-bit about 4.3 billion addresses dotted decimal like 192.168.1.1 exhausted', 'IPv6 is 128-bit about 340 undecillion addresses hexadecimal colon notation',
      'IPv6 removes the need for NAT has simpler headers built-in autoconfiguration', 'the two are not directly interoperable dual stack transition',
    ],
    `Both are versions of the Internet Protocol — the addressing scheme that lets data find the right device. They differ mainly in address SIZE.

IPv4 uses 32-bit addresses, written as four decimal numbers 0-255 (e.g. 192.0.2.14). That gives about 4.3 billion possible addresses — which sounded infinite in 1981 but ran out in the 2010s. Workarounds like NAT (many devices sharing one public address) have kept it going.

IPv6 uses 128-bit addresses, written as eight groups of hexadecimal digits separated by colons (e.g. 2001:0db8:85a3::8a2e:0370:7334). That gives about 3.4 x 10^38 addresses — enough to give every device on Earth billions of its own. IPv6 also simplifies routing (cleaner headers), supports automatic address configuration, and removes the need for NAT since every device can have a real public address.

They are not directly compatible, so the internet is in a long transition: most networks run "dual stack" (both at once), and adoption of IPv6 is now well over half of traffic to major sites.`,
  ),
  k(
    'kb-gap-comp2-domain-name-vs-url',
    'Domain name vs URL',
    [
      'difference between a domain name and a URL', 'a domain name identifies a website or server like example.com', 'a URL is the full address of a specific resource including scheme path query and fragment',
      'the domain is one component of a URL', 'https colon slash slash www dot example dot com slash page', 'DNS resolves the domain to an IP',
    ],
    `A DOMAIN NAME is the human-readable NAME of a website or server — "example.com", "wikipedia.org", "bbc.co.uk". It is what DNS translates into an IP address so your computer can connect. A domain has parts: the top-level domain (.com, .org), the second-level domain (the name you register), and optional subdomains (www., mail., shop.).

A URL (Uniform Resource Locator) is the FULL ADDRESS of one specific resource — a page, image, or file — and the domain name is just one piece of it. A URL is built from:
- scheme: https://
- domain (host): www.example.com
- optional port: :443
- path: /articles/2026/index.html
- optional query string: ?id=42&sort=new
- optional fragment: #section3

So "example.com" is a domain name; "https://example.com/help/contact?ref=footer" is a URL. Every URL contains a domain (or an IP); not every mention of a domain is a URL.`,
  ),
  k(
    'kb-gap-comp2-download-vs-upload',
    'Download vs upload speed',
    [
      'difference between download and upload speed', 'download is data coming from the internet to your device streaming browsing downloading files', 'upload is data going from your device out to the internet video calls posting backups sending large email',
      'most home connections are asymmetric much faster down than up', 'fibre is often symmetric', 'measured in Mbps',
    ],
    `DOWNLOAD speed is how fast data comes FROM the internet TO your device: loading web pages, streaming video and music, downloading files and games, receiving email. This is what most everyday use depends on, which is why providers advertise the download figure.

UPLOAD speed is how fast data goes FROM your device OUT to the internet: your side of a video call, posting photos and videos, sending large email attachments, backing up to cloud storage, screen sharing, hosting or live-streaming.

Most home broadband is ASYMMETRIC — a much bigger download number than upload (e.g. cable might be 300 Mbps down but only 20 Mbps up) because typical households consume far more than they send. Fibre-to-the-home connections are often SYMMETRIC (equal both ways). Upload matters more than people expect: a weak upload makes video calls stutter and cloud backups crawl even when downloads are fast. Both are measured in megabits per second (Mbps).`,
  ),
  k(
    'kb-gap-comp2-firewall-vs-antivirus',
    'Firewall vs antivirus software',
    [
      'difference between a firewall and antivirus software', 'a firewall monitors and controls network traffic in and out based on rules blocking unauthorised connections', 'antivirus scans files and programs on the device for known malware signatures and suspicious behaviour and removes it',
      'network gatekeeper versus on-device scanner', 'they complement each other', 'firewall is about connections antivirus is about content',
    ],
    `They protect a computer in different places and against different threats, and are meant to be used together.

A FIREWALL controls NETWORK TRAFFIC. It sits between your device (or network) and the outside, inspecting connections going in and out and allowing or blocking them according to rules — by port, address, program, or direction. Its job is to stop unauthorised connections: an attacker on the internet probing your machine, or a program on your PC quietly "phoning home". It does not look at the contents of files; it looks at who is talking to whom. Firewalls can be software on the device or hardware in the router.

ANTIVIRUS software examines the CONTENT on the device: it scans files, downloads, email attachments, and running programs, comparing them against a database of known malware "signatures" and watching for malicious behaviour (encrypting your files, injecting into other processes). When it finds something it quarantines or deletes it.

Analogy: the firewall is the border checkpoint deciding who gets through; the antivirus is the inspector checking what is already inside for anything dangerous. Neither replaces the other.`,
  ),
  k(
    'kb-gap-comp2-file-vs-folder',
    'File vs folder',
    [
      'difference between a file and a folder', 'a file is a named collection of data stored as one unit a document image program', 'a folder or directory is a container that organises files and other folders into a hierarchy',
      'folders contain files and subfolders creating a tree', 'a folder holds no document content itself just references', 'path separates folder names',
    ],
    `A FILE is a single named unit of stored data — a document, a photo, a song, a spreadsheet, a program. It has a name, usually an extension indicating its type (.txt, .jpg, .mp3), a size, and actual content. It is the thing you open, edit, and save.

A FOLDER (also called a directory) is a CONTAINER used to organise files. It has a name but no "content" of its own in the document sense — instead it holds a list of files and/or other folders (subfolders). Folders nest inside folders, creating a tree-shaped hierarchy so you can group related items (Documents > Work > 2026 > Reports).

The "path" is the route through that tree to a specific item, with folder names separated by slashes: /Users/pat/Documents/report.pdf means the file "report.pdf" inside the "Documents" folder inside "pat" inside "Users". A folder is like a physical file folder or drawer; the files are the papers inside it.`,
  ),
  k(
    'kb-gap-comp2-kernel-vs-shell',
    'Kernel vs shell (operating system)',
    [
      'difference between a kernel and a shell', 'the kernel is the core of the OS runs in privileged mode manages memory CPU scheduling devices and system calls', 'the shell is the outer interface that lets users and programs issue commands to the OS',
      'command-line shell bash zsh powershell or a graphical shell', 'the shell talks to the kernel on your behalf', 'kernel is protected user never touches it directly',
    ],
    `Think of the operating system as having a core and an outer layer.

The KERNEL is the CORE. It is the part of the OS that always runs, in a protected "privileged" mode with full control of the hardware. It manages memory, schedules which program uses the CPU when, talks to devices through drivers, handles the file system, and services "system calls" — the requests programs make when they need the OS to do something (open a file, send network data). Users never interact with the kernel directly; it is deliberately walled off so a buggy or malicious program cannot crash or seize the machine.

The SHELL is the OUTER interface — the layer that takes commands from a user (or a script) and asks the kernel to carry them out. It can be a COMMAND-LINE shell (bash, zsh, PowerShell) where you type commands, or a GRAPHICAL shell (the Windows desktop, macOS Finder, GNOME) where you click. The name "shell" is literal: it wraps around the kernel.

So: you type a command into the shell → the shell interprets it and makes system calls → the kernel does the actual work on the hardware → the result comes back out through the shell.`,
  ),
  k(
    'kb-gap-comp2-cloud-vs-data-center',
    'The cloud vs a data center',
    [
      'difference between the cloud and a data center', 'a data center is a physical facility full of servers storage and networking hardware', 'the cloud is the model of renting computing and storage as an on-demand service over the internet',
      'the cloud runs on data centers usually someone elses like AWS Azure Google Cloud', 'you manage a data center you consume the cloud', 'capital expense versus pay as you go',
    ],
    `A DATA CENTER is a physical PLACE — a building (or hall) full of racks of servers, storage arrays, and networking gear, with heavy-duty power, cooling, fire suppression, and security, running 24/7. A company can own and operate its own data center, or rent space in a "colocation" facility. It is hardware you (or someone) must buy, house, power, and maintain.

THE CLOUD is a delivery MODEL, not a place: renting computing power, storage, databases, and services ON DEMAND over the internet, paying only for what you use, and scaling up or down in minutes. You do not see or manage the underlying machines. Providers like Amazon Web Services, Microsoft Azure, and Google Cloud offer this.

The link: the cloud RUNS ON data centers — huge ones, owned by the cloud providers, spread around the world. So "moving to the cloud" usually means moving your systems off your own data center and onto rented capacity in the provider's data centers. Difference in a line: a data center is infrastructure you or a provider operates; the cloud is that infrastructure sold to you as a flexible, pay-as-you-go service.`,
  ),
  k(
    'kb-gap-comp2-cpu-core-vs-thread',
    'CPU core vs thread',
    [
      'difference between a CPU core and a thread', 'a core is a physical independent execution unit on the processor that can run instructions', 'a thread is a sequence of instructions a stream of work',
      'hardware threads simultaneous multithreading hyperthreading let one core interleave two threads', 'a 4-core 8-thread CPU', 'software threads versus hardware threads',
    ],
    `A CORE is a physical, self-contained processing unit on the CPU chip — it has its own arithmetic units, registers, and (usually) low-level cache, and can execute a stream of instructions independently. A modern CPU has several cores (4, 8, 16...), so it can genuinely do that many things at once.

A THREAD is a SEQUENCE of instructions — a single flow of execution through a program. Software creates threads to split its work into parts that can run concurrently. The operating system schedules these software threads onto the available cores.

The confusing bit is "hardware threads" / simultaneous multithreading (Intel calls it Hyper-Threading): a single core is given a second set of registers so it can hold two threads' state at once and interleave them, keeping its execution units busy when one thread stalls waiting for memory. That is why a CPU is advertised as, say, "8 cores, 16 threads" — 8 physical cores, each able to juggle 2 threads. Two threads sharing a core are faster than one but slower than two full cores, because they compete for the same execution hardware.

Short version: a core is the physical worker; a thread is a task/flow of instructions; SMT lets one core pretend to be two for scheduling purposes.`,
  ),
  k(
    'kb-gap-comp2-virus-vs-malware',
    'Virus vs malware',
    [
      'difference between a virus and malware', 'malware is the umbrella term for all malicious software', 'a virus is one specific type of malware that attaches its code to a host file or program and spreads when that host is run',
      'other malware types worms trojans ransomware spyware adware rootkits', 'all viruses are malware not all malware is a virus', 'a virus self-replicates a trojan does not',
    ],
    `MALWARE ("malicious software") is the UMBRELLA term for any software written to harm, exploit, or gain unauthorised access to a system. Its categories include:
- virus — attaches its code to a legitimate host file/program and replicates when that host runs;
- worm — self-replicating, spreads across networks on its own with no host and no user action;
- trojan — disguised as something desirable; does not self-replicate, relies on the user running it;
- ransomware — encrypts your files and demands payment;
- spyware / keyloggers — secretly collect information;
- adware — forces unwanted ads;
- rootkit — hides deep in the system to maintain stealthy control.

A VIRUS is just ONE of those categories. Its defining traits: it needs a HOST (it cannot exist as a standalone file), and it SELF-REPLICATES by inserting copies of itself into other files, usually spreading when an infected file is opened or shared.

So: all viruses are malware, but most malware is not a virus. Casually people say "virus" for any infection, the way "antivirus" software actually protects against all malware types.`,
  ),
];
