import { KnowledgeItem } from '../../types';

// Batch 75 (internet & computing infrastructure). Strong domain. Real misses
// on nexus-4b: "what is HTTP versus HTTPS" and "what is the difference between
// HTTP and TCP IP" came back as garbled web-dump fragments (mid-sentence, cut
// off); "what is end-to-end encryption" explained the crypto backwards ("your
// message is encrypted with YOUR private key, decrypted with YOUR public
// key"); "what is a packet" answered "one of those minimum packets of energy"
// (confused with quantum physics).
export const INTERNET_INFRA_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-http-vs-https',
    title: 'HTTP versus HTTPS',
    category: 'Technology',
    keywords: [
      'what is http versus https', 'what does the s in https mean', 'is https encrypted', 'tls ssl https padlock',
      'why is http insecure', 'http vs https difference', 'does https hide the website i visit',
    ],
    content: `HTTP (HyperText Transfer Protocol) is the language browsers and web servers use to request and send web pages, images, and data. Plain HTTP sends everything in the clear: anyone able to observe the connection — on the same Wi-Fi, at your internet provider, or on any network in between — can read the pages you load and anything you submit, such as passwords, and could even alter the content in transit. HTTPS is HTTP running inside an encrypted TLS (formerly SSL) connection. Before any web data is exchanged, the browser and server perform a TLS handshake that verifies the server's identity using a digital certificate and sets up encryption keys. After that, the request paths, page contents, form data and cookies are all encrypted, so an eavesdropper can see which server you connected to (the domain) and roughly how much data moved, but not the specific pages or the data itself. The browser padlock icon indicates HTTPS. Modern browsers now treat plain HTTP as "not secure" and most of the web has moved to HTTPS.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-http-vs-tcpip',
    title: 'The Difference Between HTTP and TCP/IP',
    category: 'Technology',
    keywords: [
      'what is the difference between http and tcp ip', 'network layers http tcp ip', 'does http run on top of tcp',
      'what does ip do vs tcp', 'application layer vs transport layer', 'osi model http tcp',
    ],
    content: `HTTP and TCP/IP sit at different layers of the networking stack and do different jobs. TCP/IP is the foundational pair that actually moves data between machines. IP (Internet Protocol) handles addressing and routing: it gives every device an IP address and forwards individual packets, hop by hop, across networks toward that address, with no guarantee of delivery or order. TCP (Transmission Control Protocol) runs on top of IP and turns that unreliable packet delivery into a reliable, ordered, two-way connection — it opens the connection with a handshake, numbers the bytes, acknowledges what arrived, and retransmits anything lost. HTTP is an application-layer protocol that runs on top of TCP (or, in HTTP/3, on top of QUIC over UDP). It defines the actual conversation about web content: request methods like GET and POST, headers, status codes like 404, and the response body. Analogy: IP is the postal address and sorting network, TCP is the certified-mail service that guarantees your envelopes all arrive intact and in order, and HTTP is the language of the letter written inside.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-end-to-end-encryption',
    title: 'What End-to-End Encryption Is (and How the Keys Work)',
    category: 'Technology',
    keywords: [
      'what is end-to-end encryption', 'e2ee how does it work', 'which key encrypts a message public or private',
      'why cant whatsapp read your messages', 'end to end vs encryption in transit', 'signal protocol e2ee',
    ],
    content: `End-to-end encryption (E2EE) means a message is encrypted on the sender's device and can only be decrypted on the recipient's device — the service carrying it (WhatsApp, Signal, iMessage) never has the keys and cannot read the content, and neither can anyone who intercepts it or breaches the server. This is stronger than "encryption in transit" (like plain HTTPS to a server), where the provider decrypts and can see everything on its end. How the keys actually work: each user has a public key (shared openly) and a private key (kept secret on their device). To send Alice a message, Bob encrypts it with ALICE'S PUBLIC key; only Alice's private key can decrypt it. (Encrypting with your own private key is the opposite operation — a digital signature that proves you sent it, not a way to keep it secret.) In practice, apps use this public-key step to agree on a fast shared symmetric key for the actual conversation, and rotate keys frequently. E2EE protects the message contents, but metadata (who talked to whom, when, how often) is often still visible to the provider.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-network-packet',
    title: 'What a Network Packet Is',
    category: 'Technology',
    keywords: [
      'what is a packet', 'what is a network packet', 'how is data split into packets', 'packet header source destination',
      'why do packets take different routes', 'packet loss retransmission', 'is a packet the same as a quantum',
    ],
    content: `A network packet is a small, formatted chunk of data — the unit in which information travels across the internet. It has nothing to do with the physics term "quantum." When you send anything over a network — an email, a video frame, a web request — it is split into many packets, typically around 1,500 bytes each. Every packet carries a header wrapped around its slice of the data, containing the source and destination IP addresses, a sequence number, error-check values, and other control fields. Packets are sent independently and may travel by different routes and arrive out of order or not at all; routers along the way read each packet's destination address and forward it toward its target. At the receiving end, TCP uses the sequence numbers to reassemble the packets in the right order and requests retransmission of any that went missing. Breaking data into packets is what lets a single link carry many conversations at once and lets the network route around congestion and failures ("packet switching"), the core idea the internet is built on.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-browser-engine',
    title: 'What a Browser Engine Is',
    category: 'Technology',
    keywords: [
      'what is a browser engine', 'rendering engine vs javascript engine', 'blink gecko webkit', 'what engine does chrome use',
      'v8 spidermonkey javascriptcore', 'why do websites look different in different browsers', 'chromium blink',
    ],
    content: `A browser engine (rendering engine) is the core component that takes a page's HTML and CSS and turns it into the pixels you see — parsing the markup into a document tree, applying styles, laying out the elements, and painting them, while also handling things like scrolling and events. It works together with a separate JavaScript engine that executes the page's scripts. The main families today: Blink (rendering) with V8 (JavaScript) powers Google Chrome, Microsoft Edge, Opera, Brave and most others, and is developed as part of the Chromium open-source project — so "Chrome uses Chromium's engine, Blink." Firefox uses Gecko with the SpiderMonkey JavaScript engine. Safari (and all browsers on iOS, by Apple's rules) uses WebKit with JavaScriptCore. Because each engine implements web standards slightly differently and at a different pace, the same site can render or behave a little differently across browsers, which is why web developers test in more than one.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-cdn',
    title: 'What a CDN Is',
    category: 'Technology',
    keywords: [
      'what is a cdn', 'content delivery network explained', 'edge server cache cdn', 'why does a cdn make a site faster',
      'cdn ddos protection', 'cloudflare akamai fastly cdn', 'origin server vs edge',
    ],
    content: `A CDN (content delivery network) is a large, geographically distributed set of servers that store cached copies of a website's content close to users. When someone loads the site, static files — images, video, stylesheets, scripts, and increasingly whole pages — are served from the nearest CDN "edge" location instead of from the website's single origin server, which may be on another continent. The benefits: much lower latency (the data travels a shorter distance), less load on the origin server (the edge absorbs most requests), resilience during traffic spikes, and built-in protection against many denial-of-service attacks, since the distributed capacity soaks up the flood. The CDN decides what to cache and for how long based on rules and HTTP cache headers, and it can be told to "purge" content when the site updates. Major providers include Cloudflare, Akamai, Fastly, and Amazon CloudFront. (This is distinct from an in-application data cache like Redis, which sits between an app server and its database.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-caching',
    title: 'What Caching Is',
    category: 'Technology',
    keywords: [
      'what is caching', 'why is a cache faster', 'cache hit vs cache miss', 'cache invalidation stale data',
      'browser cache cpu cache redis', 'what does clearing the cache do', 'cache expiry ttl',
    ],
    content: `Caching means keeping a copy of data, or the result of an expensive computation, somewhere faster or closer so that future requests can be answered without repeating the slow original work. Examples at every level: the CPU has small on-chip caches holding recently used memory; your browser stores images and scripts on disk so a revisited page loads instantly ("browser cache"); a CDN caches files near users; a web app keeps frequent database results in fast memory (e.g. Redis); an operating system caches recently read files in RAM. A request answered from the cache is a "hit"; one that has to go to the slow source is a "miss." The hard part is invalidation — knowing when the cached copy is out of date and must be refreshed or discarded. Strategies include time-to-live expiry (drop after N seconds), explicit purges when the source changes, and versioned URLs. The well-known joke: "there are only two hard things in computer science: cache invalidation and naming things." Clearing a cache forces fresh copies to be fetched, which fixes stale or corrupted data at the cost of a slower next load.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ram-vs-storage',
    title: 'The Difference Between RAM and Storage',
    category: 'Technology',
    keywords: [
      'what is the difference between ram and storage', 'ram vs ssd vs hard drive', 'is ram volatile', 'working memory vs long term storage',
      'why does more ram make a computer faster', 'does closing programs free ram', 'gb of ram vs gb of storage',
    ],
    content: `RAM (random-access memory) is the computer's fast working memory. The processor loads the operating system, running programs, and the files you currently have open into RAM because it can read and write there in nanoseconds. RAM is volatile: its contents vanish when power is lost, so nothing is kept there permanently. Typical amounts are 8–64 GB. Storage (a solid-state drive or hard disk) is the permanent home of everything — the operating system, installed applications, documents, photos, downloads — and it keeps its contents with the power off (non-volatile). It is much larger (hundreds of GB to several TB) but much slower to access than RAM. Analogy: RAM is your desk, where you spread out the papers you are actively working on; storage is the filing cabinet where everything lives. Running out of RAM forces the system to shuffle data back and forth to much slower storage ("swapping" or "paging"), which is why a machine with too little RAM stutters when many apps are open; running out of storage means you cannot save new files or install software.`,
    createdAt: Date.now(),
  },
];
