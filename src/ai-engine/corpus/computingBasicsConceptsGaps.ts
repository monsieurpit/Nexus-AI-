import { KnowledgeItem } from '../../types';

/**
 * COMPUTING_BASICS_CONCEPTS_GAPS — batch 212 corrections.
 * Consumer-computing "difference between X and Y" misses: "wifi vs bluetooth"
 * and "database vs spreadsheet" came back as web dumps, "library vs API" and
 * "PDF vs Word" were joke/non-answers, "variable vs constant" drifted into
 * science-experiment variables, "JPEG vs PNG" missed transparency, and
 * synchronous/asynchronous, machine-learning/AI, 4G/5G and bug/feature were
 * muddled.
 */
export const COMPUTING_BASICS_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-compbas-wifi-vs-bluetooth',
    title: 'Wi-Fi vs Bluetooth',
    category: 'technology',
    keywords: [
      'difference between wifi and bluetooth', 'wifi vs bluetooth', 'wireless networking',
      'personal area network', 'range and power', 'internet access', 'device to device pairing',
      '2.4GHz 5GHz', 'bandwidth', 'not just connection troubleshooting',
    ],
    content: `Both are short-range wireless radio technologies (both can use the 2.4 GHz band), but they are built for different jobs.

Wi-Fi connects devices to a local network and, through a router, to the internet. It is built for range (tens of metres indoors) and high bandwidth (tens to hundreds of megabits per second, enough for video streaming and large downloads), at the cost of higher power consumption. Many devices connect to one access point at once. It uses 2.4 GHz and 5 GHz (and now 6 GHz) bands.

Bluetooth connects two devices directly to each other over a short range (typically up to about 10 metres) to exchange small amounts of data at low bandwidth, using very little power. It is designed for peripherals: wireless earbuds and headphones, keyboards and mice, speakers, fitness trackers, car audio, file transfer between phones. Devices "pair" once and then reconnect automatically. Bluetooth Low Energy (BLE) drops power use further for sensors and wearables.

Short version: Wi-Fi = get onto a network/the internet, longer range, fast, power-hungry; Bluetooth = link one gadget to another nearby, short range, slow, very low power.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-database-vs-spreadsheet',
    title: 'Database vs spreadsheet',
    category: 'technology',
    keywords: [
      'difference between a database and a spreadsheet', 'database vs spreadsheet', 'Excel versus SQL',
      'relational tables', 'rows and columns', 'concurrent users', 'data integrity', 'queries',
      'scale and structure', 'single file versus DBMS',
    ],
    content: `A spreadsheet (Excel, Google Sheets) is a grid of cells you edit directly. Each cell can hold a value or a formula, and formulas recalculate live. It is excellent for ad-hoc calculation, quick analysis, charts, modelling and small lists that one person works on. Weaknesses: it mixes data and presentation, has no enforced structure (any cell can hold anything), gets slow and fragile past tens of thousands of rows, handles multiple simultaneous editors badly, and relationships between sheets are manual and easy to break.

A database (managed by a DBMS like PostgreSQL, MySQL, SQLite) stores data in structured tables with defined columns and data types, and enforces rules: required fields, unique keys, and relationships between tables (a customer's orders link back to one customer record). You interact with it through queries (usually SQL) rather than by pointing at cells. Databases handle millions of rows, many concurrent users safely (transactions, locking), validation, access control, and backups, and they keep the data separate from whatever application displays it.

Rough rule: a spreadsheet is a tool for a person to compute and explore; a database is infrastructure for storing shared, structured data reliably at scale. Many teams outgrow a spreadsheet and move the data into a database with an app on top.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-library-vs-api',
    title: 'Library vs API',
    category: 'technology',
    keywords: [
      'difference between a library and an API', 'library vs API', 'reusable code you call',
      'interface contract', 'application programming interface', 'web API', 'endpoints',
      'you import a library', 'you request from an API', 'not a book library',
    ],
    content: `A library is a collection of pre-written code (functions, classes) that you include in your own program and call directly. It runs inside your process, on your machine. Examples: a date-handling library, a maths library, React. You add it to your project and use its functions as if you had written them.

An API (Application Programming Interface) is a specification — the set of rules and definitions for how to interact with something: what you can call, what inputs it expects, what it returns. It is a contract, not code you run.

The two relate like this:
- A library HAS an API: the public list of functions and how to use them is that library's API.
- A "web API" is a service running on someone else's server that your program talks to over the network (usually HTTP), sending requests to defined endpoints and getting data back (often JSON). Example: a weather service's API, a payments API, a maps API. You do not get their code; you send requests and get responses.

Short version: a library is code you pull into your program and call locally; an API is the defined interface for talking to something (a library, an operating system, or a remote service). "Using an API" usually means calling a remote service over the network.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-variable-vs-constant',
    title: 'Variable vs constant (in programming)',
    category: 'technology',
    keywords: [
      'difference between a variable and a constant', 'variable vs constant programming', 'mutable',
      'immutable', 'let versus const', 'reassignment', 'named value', 'compile-time constant',
      'not independent and dependent variables', 'magic number',
    ],
    content: `In programming, both a variable and a constant are a name bound to a value in memory. The difference is whether that binding can change. (This is not about independent and dependent variables in a science experiment.)

A variable's value can be reassigned during the program's run. You declare it (in JavaScript with let or var, in Python just by assigning), give it an initial value, and later code can set it to something else: a loop counter, an accumulating total, the current user input.

A constant is a name whose value is fixed once set and cannot be reassigned. You use it for values that should never change while the program runs and to give a meaningful name to a fixed number ("magic number") so the code is readable and there is one place to change it: MAX_RETRIES = 5, PI = 3.14159, API_BASE_URL. In JavaScript you declare it with const; many languages use const, final, or ALL_CAPS by convention.

Trying to reassign a constant is an error (or ignored, depending on the language). Note: in JavaScript, const stops reassignment of the name but does not freeze the contents of an object or array it points to — you can still mutate those.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-sync-vs-async',
    title: 'Synchronous vs asynchronous',
    category: 'technology',
    keywords: [
      'difference between synchronous and asynchronous', 'sync vs async', 'blocking versus non-blocking',
      'wait for the result', 'continue immediately', 'callbacks promises async await', 'event loop',
      'concurrency', 'I/O bound', 'does not block',
    ],
    content: `Synchronous means one step waits for the previous step to finish before it starts. The program blocks: it sits idle until the current operation (a file read, a network call, a database query) returns, then continues to the next line. It is simple to read and reason about — the code runs top to bottom in order — but time spent waiting is wasted, and in a single-threaded program the whole thing freezes during a slow operation.

Asynchronous means a slow operation is started and the program moves on without waiting for it. When the operation eventually completes, its result is delivered later — through a callback, a promise/future, or an async/await continuation — and the program handles it then. This keeps the program responsive: while one request is in flight, other work (or other requests) can proceed. The cost is more complex control flow and having to handle results and errors that arrive out of order.

Everyday analogy: synchronous is standing at the counter until your coffee is made before doing anything else; asynchronous is ordering, getting a buzzer, sitting down to do other things, and coming back when it buzzes. Async matters most for I/O-bound work (network, disk, database) where the program would otherwise spend most of its time waiting.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-ml-vs-ai',
    title: 'Machine learning vs AI',
    category: 'technology',
    keywords: [
      'difference between machine learning and AI', 'machine learning vs artificial intelligence',
      'subset relationship', 'learning from data', 'rule-based systems', 'deep learning',
      'neural networks', 'AI is the broad field', 'ML is one approach', 'expert systems',
    ],
    content: `Artificial intelligence (AI) is the broad field of making computers do things that would normally require human intelligence: reasoning, planning, understanding language, recognising images, playing games, making decisions. AI includes many approaches, including old-style "symbolic" or rule-based systems where humans explicitly program the logic (expert systems, search algorithms, hand-written chess engines).

Machine learning (ML) is one approach within AI: instead of a programmer writing the rules, the system is given lots of examples (data) and an algorithm that adjusts the model's parameters until it performs well on those examples, so it "learns" the patterns itself. Spam filters, recommendation systems, and image classifiers are ML.

Deep learning is a subset of ML that uses many-layered neural networks; it is what powers modern image recognition, speech, and large language models.

So the nesting is: AI (the goal and the whole field) contains machine learning (learning from data) which contains deep learning (neural networks). All ML is AI, but not all AI is ML. Today "AI" in everyday speech usually means ML/deep-learning systems, because that is where almost all recent progress has come from.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-4g-vs-5g',
    title: '4G vs 5G',
    category: 'technology',
    keywords: [
      'difference between 4G and 5G', '4G vs 5G', 'LTE', 'mobile network generation', 'peak speed',
      'latency', 'millimeter wave', 'sub-6 GHz', 'network capacity', 'more cell sites',
    ],
    content: `4G (LTE) and 5G are consecutive generations of cellular mobile networks. 5G improves on 4G in three main ways:

- Speed: real-world 5G is several times faster than 4G (4G tops out around 100-150 Mbps in practice; 5G can reach several hundred Mbps to over 1 Gbps, mostly on mid-band and mmWave).
- Latency: 5G cuts the round-trip delay from roughly 30-50 ms on 4G to around 10 ms or less, which matters for cloud gaming, video calls, AR/VR and real-time control.
- Capacity: 5G can connect far more devices per cell (important for dense areas and the "internet of things").

5G uses a wider spread of frequencies: low-band (wide coverage, speeds similar to good 4G), mid-band (the sweet spot of speed and range), and high-band millimetre wave (very fast but only short range and blocked by walls, so it needs many small cell sites and is mostly deployed in stadiums and city centres). 4G is not going away and is still the fallback everywhere 5G coverage is thin.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-jpeg-vs-png',
    title: 'JPEG vs PNG',
    category: 'technology',
    keywords: [
      'difference between a JPEG and a PNG', 'jpeg vs png', 'lossy versus lossless', 'photographs',
      'transparency alpha channel', 'sharp edges and text', 'file size', 'artefacts',
      'screenshots and logos', 'no transparency in jpeg',
    ],
    content: `JPEG (.jpg) uses lossy compression: it permanently discards image data your eye is less likely to notice, which makes files small (often 10x smaller) but introduces "artefacts" — blocky or smeary patches, especially around sharp edges and text, and worse each time you re-save. JPEG has no transparency support. It is the right choice for photographs and other images with smooth colour gradients, where the small quality loss is invisible and the size saving is large.

PNG uses lossless compression: it stores the image exactly, with no quality loss no matter how many times you edit and re-save. It also supports an alpha channel, meaning parts of the image can be fully or partially transparent. PNG files are larger than JPEG for photos, but for images with flat colours, sharp lines, text and logos it compresses well and stays crisp. Use PNG for screenshots, logos, icons, diagrams, UI graphics, and anything that needs a transparent background.

Rule of thumb: photo -> JPEG; screenshot, logo, text, or anything needing transparency -> PNG. (WebP and AVIF are newer formats that do both jobs with smaller files.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-pdf-vs-word',
    title: 'PDF vs Word document',
    category: 'technology',
    keywords: [
      'difference between a PDF and a Word document', 'pdf vs word', 'fixed layout', 'editable document',
      'DOCX', 'looks the same everywhere', 'final versus working copy', 'fonts embedded',
      'forms and signatures', 'reflowable',
    ],
    content: `A Word document (.docx) is an editable working format. It stores the text, styles and structure in a way that lets the layout reflow — text rewraps if you change the font, page size or margins, or open it on a different device. It is meant for creating and revising a document. Its exact appearance can shift between Word versions, other apps (Google Docs, LibreOffice), and computers that lack the same fonts.

A PDF (Portable Document Format) is a fixed, final-output format. It captures the exact page layout — positions, fonts (which can be embedded), images — so the document looks identical on every device and prints the same everywhere. PDFs are hard to edit (you can annotate, fill forms, and sign them, but reworking the text properly needs the original or a dedicated PDF editor). They can also be locked, password-protected and digitally signed.

Workflow: write and edit in Word (or Google Docs), then export to PDF when you want to send the finished version — a résumé, a contract, a report — so the recipient sees it exactly as intended and cannot easily alter it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compbas-bug-vs-feature',
    title: 'Bug vs feature',
    category: 'technology',
    keywords: [
      'difference between a bug and a feature', 'bug vs feature', 'unintended behaviour',
      'intended behaviour', 'defect', 'specification', 'it is not a bug it is a feature',
      'works as designed', 'regression', 'expected result',
    ],
    content: `A feature is behaviour the software is intended to have — something designers and developers deliberately built, described in the specification or requirements. A bug (defect) is behaviour that is unintended: the program does something other than what it was designed to do, or crashes, or gives a wrong result. The test is intent and specification: does the software do what it was meant to do?

The joke "it's not a bug, it's a feature" is used two ways: genuinely, when a surprising behaviour turns out to be useful and gets kept on purpose; and sarcastically, when a team relabels a defect they do not want to fix as if it were intentional.

Related terms: a "regression" is a bug that breaks something that used to work; "works as designed" (or "as intended") means the reported behaviour is actually a feature and the report is really a request for a change; an "edge case" is an unusual input that the design did not account for, which may be a bug or an accepted limitation.

Whether something counts as a bug is ultimately decided against the intended behaviour, not against what any individual user wanted.`,
    createdAt: Date.now(),
  },
];
