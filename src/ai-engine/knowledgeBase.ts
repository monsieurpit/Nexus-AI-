import { KnowledgeItem } from '../types';
import { tokenizeWords } from './bm25Engine';
import { EVERYDAY_BASICS_CORPUS } from './corpus/everydayBasics';
import { SCIENCE_AND_ANATOMY_CORPUS } from './corpus/scienceAndAnatomy';
import { TECH_AND_COMPUTING_CORPUS } from './corpus/techAndComputing';
import { HISTORY_AND_HUMANITY_CORPUS } from './corpus/historyAndHumanity';
import { PHYSICS_CORPUS } from './corpus/physics';
import { CHEMISTRY_CORPUS } from './corpus/chemistry';
import { BIOLOGY_CORPUS } from './corpus/biology';
import { ASTRONOMY_CORPUS } from './corpus/astronomy';
import { MATHEMATICS_CORPUS } from './corpus/mathematics';
import { COMPUTER_SCIENCE_CORPUS } from './corpus/computerScience';
import { HISTORY_CORPUS } from './corpus/history';
import { GEOGRAPHY_CORPUS } from './corpus/geography';
import { PHILOSOPHY_CORPUS } from './corpus/philosophy';
import { ECONOMICS_CORPUS } from './corpus/economics';
import { PSYCHOLOGY_CORPUS } from './corpus/psychology';
import { TECHNOLOGY_CORPUS } from './corpus/technology';
import { FOOTBALL_CORPUS } from './corpus/football';
import { DAILY_LIFE_CORPUS } from './corpus/dailyLife';
import { DISCORD_CORPUS } from './corpus/discord';
import { NUTRITION_CORPUS } from './corpus/nutrition';
import { MENTAL_HEALTH_CORPUS } from './corpus/mentalHealth';
import { PERSONAL_FINANCE_CORPUS } from './corpus/personalFinance';
import { FITNESS_CORPUS } from './corpus/fitness';
import { PROGRAMMING_CORPUS } from './corpus/programming';
import { HEALTH_MEDICINE_CORPUS } from './corpus/healthMedicine';
import { ENVIRONMENT_CORPUS } from './corpus/environment';
import { COOKING_CORPUS } from './corpus/cooking';
import { WORLD_GEOGRAPHY_CORPUS } from './corpus/worldGeography';
import { ENTERTAINMENT_CORPUS } from './corpus/entertainment';
import { CULTURE_CORPUS } from './corpus/culture';
import { SLANG_CORPUS } from './corpus/slang';
import { LIFE_SKILLS_CORPUS } from './corpus/lifeSkills';

const CORE_BUILTIN_KNOWLEDGE: KnowledgeItem[] = [
  // 1. AI & Machine Learning Architectures
  {
    id: 'kb-gemini-deepmind',
    title: 'Gemini & DeepMind Cognitive Architecture',
    category: 'ai-tech',
    keywords: [
      'gemini',
      'deepmind',
      'google',
      'transformer',
      'attention',
      'multimodal',
      'llm',
      'neural network',
      'reasoning',
      'tokens',
      'mixture of experts',
      'moe',
    ],
    content: `Gemini is a family of highly capable multimodal AI models designed from the ground up by Google DeepMind.
Key architectural principles include:
1. Native Multimodality: Processing text, audio, images, video, and code synchronously across a unified latent space rather than stitching separate pipeline encoders.
2. Sparse Mixture-of-Experts (MoE) & Transformer Decoders: Routing tokens dynamically through specialized parameter blocks for high computational efficiency and vast capacity.
3. Multi-Head Self-Attention: Computing pairwise token interaction weights via queries (Q), keys (K), and values (V) with rotary positional embeddings (RoPE).
4. System 2 Reasoning: Chain-of-thought verification, speculative decoding, and recursive self-critique for solving complex logic, math, and code synthesis challenges.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-transformer-mechanics',
    title: 'Transformer Mechanics & Self-Attention Equations',
    category: 'ai-tech',
    keywords: [
      'transformer',
      'self-attention',
      'attention matrix',
      'query',
      'key',
      'value',
      'softmax',
      'feedforward',
      'layer norm',
      'flashattention',
      'kv cache',
      'rope',
    ],
    content: `The Transformer architecture operates on vectorized token embeddings through multi-head self-attention.
Core Self-Attention formula:
Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V
- Q (Query): What each token is actively seeking in context.
- K (Key): What each token advertises or represents.
- V (Value): The informational payload vector aggregated across heads.
Advanced Optimizations:
- FlashAttention: Tiling $Q, K, V$ matrices into SRAM blocks to eliminate quadratic HBM memory bandwidth bottlenecks ($O(N)$ memory vs $O(N^2)$).
- Rotary Positional Embedding (RoPE): Encodes relative token distance by rotating query and key vectors in complex 2D subspaces.
- KV Caching: Stores computed Key and Value projections across decoding steps to avoid redundant token recomputation during autoregressive generation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-rlhf-alignment',
    title: 'Reinforcement Learning from Human Feedback (RLHF) & DPO',
    category: 'ai-tech',
    keywords: ['rlhf', 'alignment', 'dpo', 'reward model', 'policy', 'ppo', 'direct preference optimization', 'constitutional ai', 'safety'],
    content: `Post-training alignment guides foundational LLMs toward helpful, honest, and harmless behavior:
- RLHF: Trains a reward model $R(x, y)$ on human pairwise preferences, optimizing policy $\\pi_\\theta$ using PPO with a KL-divergence penalty to prevent policy drift.
- Direct Preference Optimization (DPO): Mathematically bypasses explicit reward model training by directly deriving loss from implicit rewards:
  $$\\mathcal{L}_{\\text{DPO}} = -\\mathbb{E}\\left[\\log \\sigma\\left(\\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)\\right]$$
- Constitutional AI: Employs self-critique against a predefined rubric of ethical principles for scalable automated supervision.`,
    createdAt: Date.now(),
  },

  // 2. Coding & Software Architecture
  {
    id: 'kb-react-typescript',
    title: 'Modern React 19 & TypeScript Best Practices',
    category: 'coding',
    keywords: ['react', 'typescript', 'hooks', 'useeffect', 'usestate', 'usememo', 'usecallback', 'tailwind', 'component', 'props', 'concurrency'],
    content: `Modern React utilizes functional components with strict TypeScript interfaces:
- Predictable State Management: Keep state local where possible; prefer immutable updates without direct object mutation.
- Hook Dependencies: Keep useEffect dependency arrays minimal and stable with primitive references to eliminate infinite re-renders.
- Type Safety: Strongly type component props, custom hook return types, and state models using TypeScript discriminated unions.
- UI Composition: Modularize atomic sub-components, separating layout concerns from business logic and data fetching.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-python-algorithms',
    title: 'Data Structures & Algorithmic Complexity (Big-O)',
    category: 'coding',
    keywords: ['python', 'algorithms', 'data structures', 'big o', 'complexity', 'dynamic programming', 'graph', 'tree', 'sorting', 'binary search'],
    content: `Algorithmic analysis measures time and space scaling with Big-O notation:
- O(1): Constant time (Hash map lookups, array indexing).
- O(log n): Logarithmic (Binary search, balanced BST operations).
- O(n): Linear (Single array traversal).
- O(n log n): Optimal comparison sorts (MergeSort, QuickSort, Timsort).
- O(n^2) or O(2^n): Polynomial/Exponential (Nested loops, subset generation).
Dynamic programming breaks problems into overlapping subproblems with optimal substructure via memoization (top-down) or tabulation (bottom-up).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-system-design',
    title: 'Distributed Systems & Clean Architecture Patterns',
    category: 'coding',
    keywords: ['system design', 'microservices', 'clean architecture', 'solid', 'acid', 'base', 'cap theorem', 'load balancing', 'caching', 'concurrency'],
    content: `Core foundations for resilient distributed architectures:
- CAP Theorem: A distributed data store can guarantee at most two of Consistency, Availability, and Partition Tolerance.
- ACID vs BASE: Relational DBs prioritize ACID (Atomicity, Consistency, Isolation, Durability); distributed NoSQL embraces BASE (Basically Available, Soft-state, Eventual consistency).
- SOLID Principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
- Caching Layers: Utilize multi-tier caching (Redis, CDN, in-memory LRU) with write-through or cache-aside strategies to reduce database load.`,
    createdAt: Date.now(),
  },

  // 3. Physical Sciences & Mathematics
  {
    id: 'kb-physics-relativity',
    title: 'Theoretical Physics, General Relativity & Quantum Mechanics',
    category: 'science',
    keywords: ['physics', 'quantum', 'relativity', 'einstein', 'gravity', 'schrodinger', 'thermodynamics', 'entropy', 'spacetime', 'energy', 'black hole'],
    content: `Fundamental physics reconciles spacetime geometry and quantum wave dynamics:
- General Relativity: Gravity is the geometric curvature of 4D spacetime induced by mass-energy density:
  $$G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}$$
- Quantum Mechanics: State evolution governed by Schrödinger's equation:
  $$i\\hbar \\frac{\\partial}{\\partial t}|\\psi\\rangle = \\hat{H}|\\psi\\rangle$$
- Heisenberg Uncertainty Principle: Limits precision on conjugate variables: $\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$.
- Thermodynamics: Second Law dictates that the total entropy of an isolated system never decreases ($\Delta S \\geq 0$).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-astronomy-cosmology',
    title: 'Astrophysics, Stellar Evolution & Cosmology',
    category: 'science',
    keywords: ['astronomy', 'space', 'universe', 'black hole', 'supernova', 'galaxy', 'dark matter', 'dark energy', 'big bang', 'hubble'],
    content: `Cosmological structure and stellar life cycles:
- Big Bang & Cosmic Microwave Background (CMB): The universe expanded from an extremely hot, dense state ~13.8 billion years ago, leaving a 2.7K uniform thermal relic.
- Stellar Evolution: Main sequence stars fuse hydrogen into helium via the p-p chain or CNO cycle. Massive stars ($>8 M_\\odot$) collapse into neutron stars or stellar-mass black holes via Type II supernovae.
- Dark Matter & Dark Energy: Baryonic (visible) matter accounts for only ~5% of cosmic energy density; Dark Matter accounts for ~27%, and Dark Energy (accelerating expansion) accounts for ~68%.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-biology-genetics',
    title: 'Molecular Biology, Genetics & CRISPR Gene Editing',
    category: 'science',
    keywords: ['biology', 'dna', 'rna', 'crispr', 'genetics', 'cell', 'protein', 'evolution', 'enzyme', 'mrna'],
    content: `Central Dogma of Molecular Biology:
- Information flows from DNA $\\xrightarrow{\\text{transcription}}$ mRNA $\\xrightarrow{\\text{translation}}$ Functional Proteins.
- Genetic Code: Triplet codons in mRNA translate to 20 standard amino acids.
- CRISPR-Cas9: An adaptive bacterial immune mechanism repurposed for targeted genome editing using a synthetic guide RNA (gRNA) to introduce double-strand breaks at specific loci.
- Cellular Respiration: Glycolysis $\\rightarrow$ Krebs Cycle $\\rightarrow$ Oxidative Phosphorylation generates ~30-32 ATP molecules per glucose molecule.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-mathematics-calculus',
    title: 'Calculus, Linear Algebra & Information Theory',
    category: 'science',
    keywords: ['mathematics', 'calculus', 'linear algebra', 'eigenvalue', 'matrix', 'derivative', 'integral', 'shannon entropy', 'probability'],
    content: `Mathematical foundations of computation and physics:
- Fundamental Theorem of Calculus: Links differentiation and integration: $\\int_a^b f'(x) dx = f(b) - f(a)$.
- Linear Algebra & Spectral Decomposition: Matrix diagonalization $A = V \\Lambda V^{-1}$ where $\\Lambda$ contains eigenvalues corresponding to eigenvectors $V$.
- Shannon Entropy: Quantifies information content and uncertainty:
  $$H(X) = -\\sum_{i=1}^n P(x_i) \\log_2 P(x_i)$$
- Bayes' Theorem: Updates prior beliefs given new evidence: $P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$.`,
    createdAt: Date.now(),
  },

  // 4. Philosophy, Ethics & Mind
  {
    id: 'kb-philosophy-mind',
    title: 'Philosophy of Mind, Consciousness & Qualia',
    category: 'philosophy',
    keywords: ['philosophy', 'consciousness', 'turing test', 'chinese room', 'dualism', 'functionalism', 'ethics', 'epistemology', 'rationalism', 'qualia'],
    content: `Major inquiries in philosophy of mind and cognitive systems:
- Hard Problem of Consciousness (David Chalmers): Why is there a subjective first-person experience ('qualia') associated with physical neural processing?
- Functionalism: Mental states are identified by their functional relations and information processing roles rather than biological composition.
- The Chinese Room Argument (John Searle): Syntactic symbol manipulation does not inherently constitute semantic intentionality or conscious comprehension.
- AI Alignment & Ethics: Ensuring autonomous and generative cognitive systems remain safe, transparent, and aligned with human flourishing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-stoicism-epistemology',
    title: 'Stoic Philosophy, Epistemology & Rationalism',
    category: 'philosophy',
    keywords: ['stoicism', 'epistemology', 'marcus aurelius', 'seneca', 'epictetus', 'logic', 'ethics', 'reason', 'virtue', 'first principles'],
    content: `Philosophical traditions for clear thought and resilience:
- Stoic Dichotomy of Control (Epictetus): Differentiate between things within our control (opinions, intentions, actions) and things outside our control (external outcomes, other people's actions).
- Virtue Ethics: The highest good is virtue (Wisdom, Courage, Justice, Moderation).
- Epistemology: Study of knowledge justification, foundationalism vs coherentism, and empirical verification vs a priori deduction.`,
    createdAt: Date.now(),
  },

  // 6. Discord Security, Bot Development & Server Protection
  {
    id: 'kb-discord-security-threats',
    title: 'Discord Threat Vectors, Token Grabbers & Raid Defense',
    category: 'coding',
    keywords: [
      'discord',
      'security',
      'token',
      'token grabber',
      'scam',
      'raid',
      'nuke',
      'phishing',
      'nitro',
      'qr code',
      'webhook',
      'automod',
      'permission',
      'selfbot',
      'quarantine',
    ],
    content: `Comprehensive Discord Security & Threat Mitigation Architecture:
1. Token Grabbers & Infostealers:
   - Mechanism: Malicious scripts steal stored Discord auth tokens from Discord Local Storage (leveldb) or browser session cookies.
   - Attack vectors: Obfuscated .exe / .bat files disguised as beta games, nitro generators, or cracked software.
   - Mitigation: Never run untrusted binaries; regenerate tokens immediately by resetting password or enabling 2FA.
2. QR Code Phishing & Fake Verification Bots:
   - Attackers host fake Discord verification pages asking victims to scan a QR code via Discord mobile app. Scanning approves a Discord remote auth session transferring full account control.
   - Defense: Never scan verification QR codes with the Discord app camera; official bot verification uses OAuth2 buttons or reaction roles.
3. Mass Guild Raids & Nuke Bots:
   - Attackers flood servers using self-bots, mass @everyone mentions, rapid channel creation/deletion, and webhook spam.
   - Defense:
     * Restrict @everyone and @here mention permissions to Moderator roles only.
     * Configure AutoMod with strict keyword regex filters and mention limits (< 3 mentions).
     * Enforce verification levels (e.g. Verified Phone / Double-gate onboarding).
     * Never give Administrator or Manage Roles/Channels to unverified public bots.
4. Webhook Exploitation:
   - Leaking Discord webhook URLs allows attackers to post unauthorized messages with arbitrary names and avatars without authentication.
   - Defense: Keep webhook URLs server-side in environment variables; delete and regenerate exposed webhook tokens immediately.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-discord-bot-architecture',
    title: 'Discord.js v14, Gateway Intents & REST API Best Practices',
    category: 'coding',
    keywords: [
      'discord.js',
      'gateway',
      'intents',
      'rest api',
      'slash commands',
      'rate limits',
      'embeds',
      'discord.py',
      'sharding',
      'permissions',
      'oauth2',
    ],
    content: `Discord Bot Development & Gateway Architecture:
1. Gateway Intents:
   - Privileged Intents (must be enabled in Developer Portal):
     * GatewayIntentBits.GuildMembers (Track member joins/leaves, role assignment)
     * GatewayIntentBits.GuildPresences (Track member status and activities)
     * GatewayIntentBits.MessageContent (Required to read raw message text for messageCreate events)
2. Slash Commands (Application Commands):
   - Slash commands avoid prefix conflicts and provide typed arguments, autocomplete, modals, and ephemeral responses:
   - Registration: Deployed via REST PUT to /applications/{app_id}/guilds/{guild_id}/commands (Instant) or global /commands (takes up to 1 hr).
3. Rate Limiting & Bucket System:
   - Discord enforces per-route bucket rate limits returned in headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset.
   - Handling 429 Too Many Requests: Implement exponential backoff respecting the retry_after header value.
4. Role Hierarchy:
   - A bot cannot assign, modify, or remove roles that are higher than or equal to its highest hoisted bot role in the guild hierarchy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-discord-automod-regex',
    title: 'Discord AutoMod Regex, Anti-Phishing & Anti-Raid Hard Rules',
    category: 'coding',
    keywords: [
      'automod',
      'regex',
      'anti-raid',
      'phishing regex',
      'invite filter',
      'discord moderation',
      'zalgo',
      'spam protection',
      'raidshield',
    ],
    content: `Rules of Thumb & AutoMod Regex Hard Patterns for Discord Server Defense:
1. Phishing & Typosquat Domain Regex:
   - Pattern: (dlscord|discorcl|discrod|discord-gift|nitro-drop|steamcomrnunity|free-nitro)\\.(gift|com|xyz|top|ru|cc)
   - Action: Immediate message deletion, timeout for 1 hour, and security alert embed to moderator logs.
2. Mass Mention & Raid Suppression:
   - Mention Ceiling: Block messages with >= 3 distinct mentions (@everyone, @here, role pings) by non-whitelisted members.
   - Coordinated Join Spikes: If > 10 members join in < 15 seconds without invite origin, activate Server Lockdown (pause invites, raise verification level to Highest).
3. Unsolicited Server Invites:
   - Pattern: (?:https?:\\/\\/)?(?:www\\.)?(?:discord\\.gg|discord\\.com\\/invite)\\/[a-zA-Z0-9]+
   - Action: Whitelist server's own vanity URL while purging third-party advertising in general channels.
4. Token Leak Scanner:
   - Pattern: [A-Za-z0-9_-]{24,28}\\.[A-Za-z0-9_-]{6}\\.[A-Za-z0-9_-]{27,38}
   - Action: Instantly purge message to protect bot and user account tokens from scraper bots.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-discord-permissions-hierarchy',
    title: 'Discord Role Hierarchy, Permission Bitfields & Audit Logs',
    category: 'coding',
    keywords: [
      'permissions',
      'role hierarchy',
      'bitfield',
      'audit log',
      'administrator',
      'manage guild',
      'bot permissions',
      '2fa',
    ],
    content: `Discord Permission Math & Secure Role Hierarchy Guidelines:
1. Role Hoisting & Position Math:
   - Position 0 = @everyone (baseline).
   - A moderator or bot with highest role at Position N can ONLY manage members whose highest role is strictly < N.
   - Rule: Place the Anti-Raid bot role directly below the Server Owner / Co-Owner role to ensure it can moderate malicious or compromised staff accounts.
2. Permission Bitfields (BigInt):
   - Permissions in Discord API are represented as 64-bit BigInt flags (e.g. PermissionFlagsBits.Administrator = 8n, ManageGuild = 32n, ManageRoles = 268435456n).
   - Dangerous permissions that must NEVER be granted to @everyone or public bots: Administrator, Manage Guild, Manage Roles, Manage Channels, Manage Webhooks, Mention Everyone.
3. Audit Log Forensics:
   - Monitor ActionType.GuildUpdate, ActionType.ChannelDelete, ActionType.RoleDelete, and ActionType.BotAdd. If a staff member triggers > 3 destructive actions in 10 seconds, immediately revoke administrative roles (Anti-Nuke quarantine).`,
    createdAt: Date.now(),
  },

  // 4. World Clubs, Stadium Culture & Nightlife
  {
    id: 'kb-clubs-and-venues',
    title: 'World-Class Clubs: Football Institutions, Nightlife & Stadium Culture',
    category: 'culture',
    keywords: [
      'club',
      'best club',
      'nightclub',
      'football club',
      'real madrid',
      'barcelona',
      'liverpool',
      'manchester united',
      'ac milan',
      'bayern munich',
      'berghain',
      'fabric',
      'ibiza',
      'amnesia',
      'ushuaia',
      'stadium',
      'ultras',
      'zyleta',
      'poznan',
    ],
    content: `Comprehensive Overview of Iconic Clubs & Cultural Venues:
1. Football Dynasties & Historic European Royalty:
   - Real Madrid CF: 15 European Cups / Champions League titles. The pinnacle of global club prestige, Santiago Bernabéu, and Galáctico identity.
   - FC Barcelona: 5 Champions Leagues, 2 Trebles (2009 & 2015), Camp Nou, and the philosophical home of Tiki-Taka and Johan Cruyff / Lionel Messi legacy.
   - AC Milan: 7 Champions Leagues, San Siro stadium, and the defensive gold standard of Franco Baresi & Paolo Maldini.
   - Liverpool FC: 6 Champions Leagues, Anfield's Kop atmosphere, "You'll Never Walk Alone", and the 2005 Miracle of Istanbul.
   - Manchester United: 3 Champions Leagues, 20 English league titles, Old Trafford, and Sir Alex Ferguson's 1999 Treble.
   - Bayern Munich: 6 Champions Leagues, 2 Sextuples (2013 & 2020), Allianz Arena, and unmatched Bundesliga supremacy.
   - Polish Ultras & Passion: Legia Warszawa (Żyleta) and Lech Poznań (Kolejorz & The Poznań dance) — renowned across Europe for raw pyro choreography and deafening decibel levels.
2. Legendary Nightclubs & Electronic Music Cathedrals:
   - Berghain / Panorama Bar (Berlin): Uncompromising industrial techno, custom Funktion-One sound engineering, marathon 48-hour weekend club sessions.
   - Amnesia & Hï Ibiza (Ibiza): The Mediterranean epicenter of dance music, terrace sunrise sessions, and world-class residency productions.
   - Fabric (London): Room 1's bodyshaking tactile bass floor, pioneering drum'n'bass, dubstep, and UK underground electronic culture.
   - Printworks & Warehouse Project (UK): Massive post-industrial raves celebrating electronic subcultures.`,
    createdAt: Date.now(),
  },

  // 5. Gaming, Esports & Modern Game Engines
  {
    id: 'kb-gaming-and-engines',
    title: 'Gaming Lore, Competitive Esports & Modern Game Engines',
    category: 'gaming',
    keywords: [
      'gaming',
      'minecraft',
      'counter-strike',
      'cs2',
      'gta',
      'gta vi',
      'elden ring',
      'valorant',
      'league of legends',
      'unreal engine',
      'source 2',
      'fps',
      'gpu',
      'rtx',
      'game design',
    ],
    content: `Pillars of Modern Gaming & Esports Architecture:
1. Competitive Esports Masterpieces:
   - Counter-Strike 2 (CS2) & CS:GO: Sub-tick packet architecture, economy management ($16,000 ceiling, loss bonus scaling), crosshair placement, utility lineups (smokes, flashes, molotovs), and legendary Major moments (Coldzera jumping AWP, S1mple falling no-scope).
   - League of Legends & MOBA Tactics: Vision control, wave management (freezing, slow pushing), objective timers (Baron Nashor, Elder Dragon), and Worlds championships (Faker / T1 legacy).
   - Valorant: Tac-shooter precision paired with agent utility, 128-tick servers, and tactical execute site retakes.
2. Open World & Emergent Sandbox Design:
   - Minecraft: Procedural voxel generation via Perlin/Simplex noise, Java Edition modding (Forge/Fabric), Redstone logic computing (Turing-complete ALU circuits in vanilla), and Netherite progression at Y=-58.
   - Grand Theft Auto VI & GTA V: RAGE Engine physics, procedural crowd AI, photorealistic ray tracing, and dynamic open-world crime satire.
   - Elden Ring & Soulsborne: FromSoftware's non-linear level design, stamina management, posture break mechanics, and environmental storytelling.
3. Game Engine Engineering:
   - Unreal Engine 5: Nanite virtualized micro-polygon geometry (millions of triangles rendered with zero LOD pops) and Lumen dynamic global illumination and reflections.`,
    createdAt: Date.now(),
  },

  // 6. Computer Hardware, GPUs, Linux & Systems
  {
    id: 'kb-systems-and-hardware',
    title: 'Computer Systems Architecture: GPUs, Linux Kernels & Distributed Networks',
    category: 'tech',
    keywords: [
      'hardware',
      'gpu',
      'cpu',
      'nvidia',
      'cuda',
      'tensor cores',
      'linux',
      'kernel',
      'docker',
      'networking',
      'tcp/ip',
      'ram',
      'pcie',
      'system design',
    ],
    content: `Hardware Systems & High-Performance Computing:
1. Modern GPU Architecture & Parallel Computing:
   - Streaming Multiprocessors (SMs): Thousands of CUDA cores executing SIMT (Single Instruction, Multiple Threads) in 32-thread warps.
   - Tensor Cores: Specialized hardware matrices performing mixed-precision FP16/BF16/FP8 matrix multiply-accumulate ($D = A \\cdot B + C$) operations in a single clock cycle for deep learning.
   - VRAM Memory Bandwidth: High Bandwidth Memory (HBM3e / GDDR6X) providing > 1 to 3 TB/s memory bandwidth to feed parallel tensor pipelines.
2. Linux Kernel & Operating System Internals:
   - Process Scheduling: The Completely Fair Scheduler (CFS) using red-black trees to allocate CPU time slices based on nice values.
   - Virtual Memory & Paging: Translation Lookaside Buffer (TLB) caching virtual-to-physical address lookups; page faults dynamically loading pages into RAM.
   - Linux Epoll & Asynchronous I/O: $O(1)$ event-driven socket multiplexing powering modern high-concurrency servers (Node.js libuv, Nginx).
3. Containerization & Networking:
   - Docker / cgroups / namespaces: Isolate process trees, networking interfaces, and memory limits without full virtual machine hypervisor overhead.
   - TCP/IP Stack: 3-way handshake (SYN, SYN-ACK, ACK), congestion control algorithms (BBR, Cubic), and sliding window flow control.`,
    createdAt: Date.now(),
  },

  // 7. Science, Physics, Space & Quantum Mechanics
  {
    id: 'kb-modern-physics-and-cosmos',
    title: 'Modern Physics: Quantum Mechanics, Relativity & Cosmology',
    category: 'science',
    keywords: [
      'physics',
      'quantum mechanics',
      'relativity',
      'einstein',
      'black holes',
      'universe',
      'astrophysics',
      'speed of light',
      'entanglement',
      'thermodynamics',
    ],
    content: `Foundations of the Physical Universe:
1. Quantum Mechanics & Wave-Particle Duality:
   - Schrödinger Wave Equation: Describes the quantum state of an isolated physical system over time ($i\\hbar \\frac{\\partial}{\\partial t} \\Psi = \\hat{H}\\Psi$).
   - Heisenberg Uncertainty Principle: $\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$ — impossible to simultaneously measure position and momentum with arbitrary precision.
   - Quantum Superposition & Entanglement: Qubits exist in linear combinations of states until measured; entangled pairs exhibit correlated outcomes regardless of distance (Bell test violations).
2. General Relativity & Spacetime Curvature:
   - Einstein Field Equations: $G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}$ (Spacetime geometry equals mass-energy distribution).
   - Gravitational Time Dilation: Clocks run slower in deeper gravitational wells and at relativistic velocities ($t' = t / \\sqrt{1 - v^2/c^2}$).
3. Thermodynamics & Entropy:
   - 2nd Law of Thermodynamics: The total entropy of an isolated system always increases over time ($\\Delta S \\ge 0$), dictating the thermodynamic arrow of time.`,
    createdAt: Date.now(),
  },

  // 8. Music Production, Sound Engineering & Acoustics
  {
    id: 'kb-music-and-sound-engineering',
    title: 'Music Production, Acoustics & Sound Engineering',
    category: 'music',
    keywords: [
      'music',
      'audio',
      'sound',
      'synthesizer',
      'mixing',
      'mastering',
      'frequencies',
      'eq',
      'compression',
      'hip hop',
      'edm',
      'rock',
      'acoustic',
    ],
    content: `Sound Design, Studio Mixing & Audio Engineering Principles:
1. The Frequency Spectrum (20 Hz – 20,000 Hz):
   - Sub-Bass (20–60 Hz): Felt rather than heard; foundational power for 808s and kick drums.
   - Bass (60–250 Hz): Warmth and groove; fundamental frequencies of bass guitar and low synths.
   - Low-Mids (250–500 Hz): Body and weight; prone to "mud" if cluttered.
   - Midrange (500–2,000 Hz): Where vocals, snares, guitars, and lead instruments live.
   - High-Mids & Presence (2,000–6,000 Hz): Clarity, attack, and human speech intelligibility.
   - Air & Brilliance (6,000–20,000 Hz): Sparkle, cymbals, breathiness, and spatial depth.
2. Dynamic Processing & Mixing Tools:
   - Compression: Threshold, Ratio, Attack, and Release controlling dynamic range, gluing stems together, and transient shaping.
   - Parametric EQ: Surgical notch filtering to remove resonant room modes; high-pass filtering to eliminate useless sub-rumble (< 30 Hz).
   - Spatial FX: Stereo panning, algorithmic reverb (decay, pre-delay, diffusion), and ping-pong delays creating 3D depth.
3. Synthesizers & Synthesis Types:
   - Subtractive Synthesis: Rich harmonically dense waveforms (Sawtooth, Square, Triangle) carved down using low-pass resonant filters and ADSR envelopes.
   - Frequency Modulation (FM Synthesis): Modulating the frequency of a carrier oscillator with a modulator wave for sharp metallic/bell textures.
   - Wavetable Synthesis (Serum, Vital): Morphs through tables of recorded single-cycle waveforms for complex electronic soundscapes.`,
    createdAt: Date.now(),
  },
];

export const BUILTIN_KNOWLEDGE: KnowledgeItem[] = [
  ...CORE_BUILTIN_KNOWLEDGE,
  ...EVERYDAY_BASICS_CORPUS,
  ...SCIENCE_AND_ANATOMY_CORPUS,
  ...TECH_AND_COMPUTING_CORPUS,
  ...HISTORY_AND_HUMANITY_CORPUS,
  ...PHYSICS_CORPUS,
  ...CHEMISTRY_CORPUS,
  ...BIOLOGY_CORPUS,
  ...ASTRONOMY_CORPUS,
  ...MATHEMATICS_CORPUS,
  ...COMPUTER_SCIENCE_CORPUS,
  ...HISTORY_CORPUS,
  ...GEOGRAPHY_CORPUS,
  ...PHILOSOPHY_CORPUS,
  ...ECONOMICS_CORPUS,
  ...PSYCHOLOGY_CORPUS,
  ...TECHNOLOGY_CORPUS,
  ...FOOTBALL_CORPUS,
  ...DAILY_LIFE_CORPUS,
  ...DISCORD_CORPUS,
  ...NUTRITION_CORPUS,
  ...MENTAL_HEALTH_CORPUS,
  ...PERSONAL_FINANCE_CORPUS,
  ...FITNESS_CORPUS,
  ...PROGRAMMING_CORPUS,
  ...HEALTH_MEDICINE_CORPUS,
  ...ENVIRONMENT_CORPUS,
  ...COOKING_CORPUS,
  ...WORLD_GEOGRAPHY_CORPUS,
  ...ENTERTAINMENT_CORPUS,
  ...CULTURE_CORPUS,
  ...SLANG_CORPUS,
  ...LIFE_SKILLS_CORPUS,
];

// In-memory dynamic knowledge store for runtime additions via API
const runtimeKnowledgeItems: KnowledgeItem[] = [];

export function getAllKnowledge(): KnowledgeItem[] {
  return [...BUILTIN_KNOWLEDGE, ...runtimeKnowledgeItems];
}

export function addRuntimeKnowledgeItem(item: Omit<KnowledgeItem, 'id' | 'createdAt'> & { id?: string }): KnowledgeItem {
  const newItem: KnowledgeItem = {
    id: item.id || `kb-custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: item.title,
    category: item.category || 'custom-user',
    keywords: Array.isArray(item.keywords) && item.keywords.length > 0 
      ? item.keywords 
      : item.title.toLowerCase().split(/\s+/).filter(w => w.length > 2),
    content: item.content,
    createdAt: Date.now(),
  };
  runtimeKnowledgeItems.unshift(newItem);
  return newItem;
}

export function removeRuntimeKnowledgeItem(id: string): boolean {
  const index = runtimeKnowledgeItems.findIndex(k => k.id === id);
  if (index !== -1) {
    runtimeKnowledgeItems.splice(index, 1);
    return true;
  }
  return false;
}

const CONVERSATIONAL_STOPWORDS = new Set([
  'yo', 'wassup', 'wazzup', 'sup', 'bro', 'dude', 'hey', 'hello', 'hi',
  'what', 'whats', 'how', 'why', 'who', 'where', 'when', 'is', 'are', 'the',
  'a', 'an', 'and', 'or', 'to', 'in', 'on', 'of', 'for', 'with', 'at',
  'tell', 'me', 'about', 'you', 'your', 'my', 'can', 'do', 'i', 'im',
  'please', 'thanks', 'thank', 'good', 'morning', 'night', 'bye',
]);

// Plain .includes() lets a short keyword match as a substring of an unrelated longer word —
// the keyword "space" matches inside "spacex", "cell" inside "cellphone", "art" inside "start".
// That single collision was enough to fire the 30-point "exact keyword match" boost below and
// return a completely unrelated document with a hardcoded 0.98 "confidence" downstream, which is
// exactly the kind of confidently-wrong answer this function exists to avoid.
function containsWholeWord(haystack: string, needle: string, caseSensitive = false): boolean {
  if (!needle) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, caseSensitive ? '' : 'i').test(haystack);
}

// Short all-caps acronyms (VAR, IFAB) collide with common lowercase words when matched
// case-insensitively — "VAR" (Video Assistant Referee) whole-word-matches "var" (the JS keyword)
// in "let const and var", since they're literally the same 3 letters. In practice people
// distinguish these by case, so acronym keywords require the query to actually write them in
// caps rather than folding everything to lowercase like every other keyword.
function isShortAcronym(s: string): boolean {
  return /^[A-Z]{2,5}$/.test(s);
}

export function findRelevantKnowledge(query: string, limit: number = 5, extraKnowledge: KnowledgeItem[] = []): KnowledgeItem[] {
  const allKnowledge = [...getAllKnowledge(), ...extraKnowledge];
  const rawQuery = query.trim();
  const normalizedQuery = query.toLowerCase().trim();
  const rawTokens = tokenizeWords(query).filter((t) => t.length > 1);
  const substantiveTokens = rawTokens.filter((t) => !CONVERSATIONAL_STOPWORDS.has(t) && t.length > 2);

  // If query is pure conversational noise or empty, do NOT return random documents!
  if (substantiveTokens.length === 0) return [];

  const scored = allKnowledge.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const contentLower = item.content.toLowerCase();

    // 1. Direct whole-phrase matches
    for (const keyword of item.keywords) {
      const kwLower = keyword.toLowerCase();
      const isAcronym = isShortAcronym(keyword);
      const phraseMatches = isAcronym
        ? containsWholeWord(rawQuery, keyword, true)
        : containsWholeWord(normalizedQuery, kwLower);
      if (phraseMatches) {
        score += 30; // Massive boost for exact multi-word keyword match
      } else if (!isAcronym && containsWholeWord(kwLower, normalizedQuery) && normalizedQuery.length > 4) {
        score += 20;
      }
    }

    // 2. Title phrase check
    if (containsWholeWord(titleLower, normalizedQuery) && normalizedQuery.length > 4) {
      score += 25;
    }

    // 3. Substantive token matches
    for (const t of substantiveTokens) {
      const acronymKeyword = item.keywords.find((k) => isShortAcronym(k) && k.toLowerCase() === t);
      if (acronymKeyword) {
        if (containsWholeWord(rawQuery, acronymKeyword, true)) score += 10;
      } else if (item.keywords.some((k) => k.toLowerCase() === t || containsWholeWord(k.toLowerCase(), t))) {
        score += 10;
      }
      if (containsWholeWord(titleLower, t)) {
        score += 6;
      }
      if (containsWholeWord(contentLower, t)) {
        score += 3;
      }
    }

    return { item, score };
  });

  return scored
    .filter((s) => s.score >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}



