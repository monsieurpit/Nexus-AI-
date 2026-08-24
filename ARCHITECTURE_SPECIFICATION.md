# ARCHITECTURE_SPECIFICATION.md
# Nexus Autonomous AI Engine & SDK — Complete Architectural Specification

> **Target Audience:** AI Engineering Models, Autonomous Coding Agents, and Software Engineers modifying or extending this codebase.
> **Design Guarantee:** 100% self-contained, offline-capable, autonomous cognitive architecture with zero third-party cloud AI API calls. Response generation optionally calls a self-hosted local LLM (Ollama) the operator controls; it is never a cloud dependency and the engine degrades gracefully to its deterministic pipeline without it.

---

## 1. Executive Summary & Core Philosophy

**Nexus AI** is a fully autonomous, in-memory cognitive engine and backend server written in TypeScript and Node.js. It does not call OpenAI, Anthropic, or external Gemini endpoints. Instead, it implements a deterministic and probabilistic multi-stage reasoning pipeline, optionally calling a self-hosted Ollama instance (configured via `OLLAMA_BASE_URL`/`OLLAMA_MODEL`) for response generation, with automatic fallback to the deterministic template/retrieval pipeline if Ollama is unreachable — see §3.5:

```
[Incoming Request / Discord Event / API Call]
                     │
                     ▼
       ┌───────────────────────────┐
       │     Request Queue         │ (Global FIFO / Priority Execution)
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │   Semantic Tokenizer &    │ (N-gram, Bag-of-Words, TF-IDF Cosine,
       │   Latent Embedding Engine │  Latent Vector Semantic Projections)
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │   Strict Directives &     │ (Casseurt Roast, Hard Security,
       │   Rule Engine Pre-Pass    │  VIP Brother Mode, Custom Directives)
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │   Multi-Domain Cognitive  │ ──► Math Solver (Algebra, Calculus, Stats)
       │   Graph & Solver Network  │ ──► Code Solver (Algorithms, Big-O, Bugs)
       │                           │ ──► Logic Solver (Syllogisms, Truth Tables)
       │                           │ ──► Football & Sports Intelligence
       │                           │ ──► General Physical Intelligence
       │                           │ ──► Verified Knowledge Graph (49+ Docs)
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │  Autonomous Generator &   │ (Persona System Prompt Alignment,
       │   Swear / Persona Engine  │  Direct Human Voice, Anti-Corporate)
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │   Strict Output Post-Pass │ (RaidShield 21-Rule Scan, Forbidden
       │   & Rule Enforcement      │  Phrases Filter, Formatting Guarantee)
       └─────────────┬─────────────┘
                     │
                     ▼
        [Structured JSON Response]
```

---

## 2. Directory Structure & Key Files

```
├── server.ts                       # Express HTTP server + REST API endpoints + API key auth
├── nexus-ai.js                     # Standalone Universal Client SDK (Node.js & Browser)
├── src/
│   ├── ai-engine/
│   │   ├── reasoningEngine.ts      # Central orchestrator coordinating all cognitive modules
│   │   ├── localLlmClient.ts       # Self-hosted Ollama HTTP client (never throws; typed unavailable results)
│   │   ├── semanticEngine.ts       # Latent semantic vectors, cosine similarity, doc ranking
│   │   ├── ruleEngine.ts           # Strict directives, RaidShield 21 hard security rules
│   │   ├── swearEngine.ts          # Profanity injection, tone modulation, anti-bot filtering
│   │   ├── generator.ts            # Text assembly, persona voice framing, template stitching
│   │   ├── tokenizer.ts            # Word tokenization, BPE estimation, token counting
│   │   ├── knowledgeBase.ts        # Built-in verified knowledge corpus (49+ deep documents)
│   │   ├── memoryStore.ts          # Personas, session store, local storage persistence
│   │   ├── mathSolver.ts           # Deterministic arithmetic, algebra, calculus, unit conversions
│   │   ├── codeSolver.ts           # Code syntax explanation, refactoring, algorithms, Big-O
│   │   ├── logicSolver.ts          # Boolean logic, formal deduction, truth tables
│   │   ├── footballIntelligence.ts # Elite football knowledge, club rankings, ultras culture
│   │   └── generalIntelligence.ts  # Physical how-to, mechanics, everyday object manipulation
│   ├── components/                 # React UI for testing, chat playground, API key management
│   ├── types.ts                    # Core TypeScript interfaces (Persona, Message, Rule, etc.)
│   └── App.tsx                     # Main React application entry point
```

---

## 3. Cognitive Engine Subsystems

### 3.1. Central Orchestrator (`src/ai-engine/reasoningEngine.ts`)
The main function is `generateReasoningPath(userPrompt, conversationHistory, persona, settings, knowledgeBase, customRules)`.
- **Step 1:** Tokenizes user input and parses conversational context.
- **Step 2:** Runs semantic similarity check against the knowledge base (`findRelevantKnowledge`).
- **Step 3:** Identifies domain queries:
  - Math expressions $\rightarrow$ `mathSolver.ts`
  - Code generation/debugging $\rightarrow$ `codeSolver.ts`
  - Logic/deduction $\rightarrow$ `logicSolver.ts`
  - Football/club queries $\rightarrow$ `footballIntelligence.ts`
  - Everyday physical tasks $\rightarrow$ `generalIntelligence.ts`
- **Step 4:** If domain-specific match occurs, constructs a detailed, formatted factual answer.
- **Step 5:** If general query, synthesizes knowledge hits and applies persona tone and system prompts.

### 3.2. Strict Directives & Rule Engine (`src/ai-engine/ruleEngine.ts`)
Executes **before and after** all generation to enforce unbreakable behavioral rules:
1. **Casseurt Roast Rule**: If user asks about "Casseurt" (opinions, liking him, hating him), the engine unconditionally returns a savage crashout roast (`"Fuck no! That dude's an annoying pain in the ass..."`).
2. **VIP Brother Mode**: Triggered if `isSuperChill` is true or if `authorId` matches VIP IDs (`1394001641899954368`, `726207198757257257`). Responds with maximum loyalty, brotherly banter, and zero corporate disclaimers.
3. **Custom Directives**: Parses user custom prompt directives (e.g., `ALWAYS end with X`, `NEVER mention Y`, `format as markdown table`).
4. **RaidShield 21 Hard Security Rules (`evaluateRaidShieldRules`)**:
   - Token grabbers, webhook exfiltration patterns.
   - Fake Discord Nitro phishing links (e.g. `dlscord`, `discrod`, `steamcomrnunity`).
   - Steam gift card scams, crypto drainers.
   - Mass mention spam, raid invite links, zalgo text.

### 3.3. Swear Engine (`src/ai-engine/swearEngine.ts`)
Implements authentic, human-style colloquial language:
- Injects natural Discord-style profanity (`fuck`, `shit`, `damn`, `hell yeah`) when persona demands it (`nexus-homie`, `crashout-bot`, `roast-master`).
- Strips sterile AI clichés (`"I'd be happy to assist you"`, `"As an AI language model"`, `"I apologize for any inconvenience"`).
- Supports English and Polish (`kurwa`, `chuj`, `jebany`) swear styles when requested.

### 3.4. Semantic Embeddings & Knowledge Corpus (`semanticEngine.ts`, `knowledgeBase.ts`, `corpus/*`)
- Implements multi-token cosine similarity ranking and keyword matching over **100+ comprehensive verified knowledge documents** spanning 25 distinct domains:
  - *Physics*: Classical mechanics, quantum mechanics, thermodynamics, general & special relativity, electromagnetism.
  - *Chemistry*: Periodic table, chemical bonding, organic chemistry, reaction kinetics, thermodynamics, stoichiometry.
  - *Biology*: Cell biology, genetics, evolutionary theory, ecology, molecular biology, biochemistry.
  - *Astronomy*: Solar system, stellar life cycles, black holes, cosmology, exoplanets, space exploration.
  - *Mathematics*: Calculus, linear algebra, discrete mathematics, probability, statistics, number theory.
  - *Computer Science*: Data structures, algorithms, operating systems, networking, computer architecture, databases.
  - *History*: Ancient civilizations, Middle Ages, Renaissance, Industrial Revolution, World Wars, Cold War.
  - *Geography*: Physical geography, human geography, climatology, cartography, geomorphology.
  - *Philosophy*: Epistemology, ethics, metaphysics, political philosophy, logic, existentialism.
  - *Economics*: Microeconomics, macroeconomics, monetary policy, international trade, behavioral economics.
  - *Psychology*: Cognitive psychology, developmental psychology, social psychology.
  - *Technology*: Semiconductor technology, Moore's Law, renewable energy, internet history, quantum computing.
  - *Football (Soccer)*: Origins & history, IFAB laws of the game, FIFA World Cup, UEFA Champions League, Premier League, La Liga, tactics, Messi, Ronaldo, Pelé & Maradona, club rivalries, player skills.
  - *Daily Life Skills*: Showering, tooth brushing, hand washing, eating fruits, sandwich preparation, boiling water/tea/coffee, making beds, laundry, dishwashing, home cleaning, food safety, first aid, sleep hygiene, dressing, shoelaces, street crossing, social etiquette, hydration, stretching.
  - *Discord Platform*: Server structure, account safety & 2FA, RaidShield anti-raid, scam identification, AutoMod, Nitro tiers, bot ecosystems (MEE6, Carl-bot, Wick), Community Guidelines, privacy settings, AI features, voice channels.
  - *Nutrition*: Macronutrients, vitamins & minerals, caloric balance, diet types (Mediterranean, Keto, Vegan, IF), hydration, sugar & gut health.
  - *Mental Health*: Anxiety disorders, depression, stress management, sleep science, mindfulness & meditation, burnout recovery.
  - *Personal Finance*: 50/30/20 budgeting, emergency funds, credit scores (FICO), investing basics (ETFs, index funds), debt payoff strategies.
  - *Fitness*: Strength training & hypertrophy, cardiovascular health, HIIT protocols, recovery & rest, beginner workout plans.
  - *Programming*: Python fundamentals, JavaScript & DOM/Node, Git version control, Data structures & algorithms, REST APIs & HTTP.
  - *Health & Medicine*: Immune system, colds vs influenza, first aid emergencies, chronic diseases (diabetes, hypertension).
  - *Environment*: Climate change science, renewable energy transition, biodiversity & extinction, carbon footprints.
  - *Cooking*: Dry vs moist heat cooking, knife skills & kitchen safety, flavour & seasoning chemistry, baking science.
  - *World Geography*: Continents, major global powers, climate zones & biomes, natural wonders & landforms.
  - *Entertainment*: Music theory, music genres, video game culture & esports, cinema history, social media platforms.

### 3.5. Local LLM Generation Tier (`src/ai-engine/localLlmClient.ts`)
- A two-tier generation model layered on top of the retrieval/confidence pipeline above, not a replacement for it — `bm25Engine.ts`'s scoring, `computeConfidence()`, and `answerVerifier.ts`'s shape checks are unchanged.
- `localLlmClient.generate()` calls a self-hosted Ollama instance's `POST /api/generate` (non-streaming), reached via `OLLAMA_BASE_URL` (e.g. a Cloudflare Tunnel to a machine running `OLLAMA_MODEL`, default `qwen2.5:3b`). It never throws — every failure mode (not configured, connection error, timeout, HTTP error, empty response) returns a typed `unavailable` result, and `generateReasoningPath` falls back to its existing deterministic path on any of them.
- **Grounded tier** — when corpus retrieval is confident (`isConfident`, STANDARD MODE only for now), the top-scoring documents are injected into the LLM prompt as context with an explicit "don't invent facts" instruction; the LLM's answer is still passed through `verifyAnswer()` as a post-hoc shape check, falling back to the existing template synthesis (`synthesiseStandard`) if it fails or Ollama is unavailable.
- **Free-response tier** — when there is no confident corpus match (all reasoning modes), the LLM answers in persona instead of a hardcoded pool reply, falling back to the existing pool text (e.g. `unknownResponse()`) if Ollama is unavailable.
- Deterministic/safety-critical branches (prompt-injection detection, math/code/logic solvers, insult/dominance/emotional-distress handling, bot-meta questions, etc.) never route through the LLM — they remain fully deterministic.
- Every return path — LLM-generated or template — still passes through `enforceStrictSdkRules()` last, so persona voice, swear intensity, and formatting rules apply uniformly regardless of text source.

---

## 4. API Endpoints (`server.ts`)

All endpoints authenticate via `Authorization: Bearer <NEXUS_API_KEY>`.

### 1. `POST /api/v1/nexus` (Primary Gateway)
- **Body:** `{ "prompt": string, "persona"?: string, "authorId"?: string, "customRules"?: string, "imageUrl"?: string }`
- **Output:**
  ```json
  {
    "response": "...",
    "text": "...",
    "persona": "nexus-homie",
    "personaName": "Nexus (Discord Homie)",
    "rulesRespected": true,
    "tokens": 280,
    "timestamp": "2026-08-22T06:29:57.000Z"
  }
  ```

### 2. `POST /api/v1/raidshield` (Security Scanner)
- **Body:** `{ "messageText": string, "imageUrl"?: string, "authorId"?: string }`
- **Output:**
  ```json
  {
    "classification": "scam" | "spam" | "bot" | "raid" | "safe",
    "confidence": 0.99,
    "reason": "Critical threat: Fake Discord Nitro phishing scam vector.",
    "actionRecommended": "DELETE_AND_TIMEOUT" | "ALLOW" | "FLAG_FOR_REVIEW"
  }
  ```

### 3. `POST /api/v1/vision/analyze` (Autonomous Image Inspection)
- **Body:** `{ "imageUrl": string, "prompt"?: string, "mode"?: "general" | "security" }`
- **Output:** Analysis report on visual payload, optical metadata, and threat scan.

### 4. `POST /api/v1/generate` (Standardized Prompt Gateway)
- **Body:** `{ "prompt": string, "persona"?: string, "customRules"?: string }`

### 5. `POST /api/v1/chat/completions` (OpenAI-Compatible Drop-In)
- **Body:** `{ "model": "nexus-v1", "messages": [{ "role": "user", "content": "..." }] }`

---

## 5. Universal Client SDK (`nexus-ai.js`)

`nexus-ai.js` is a zero-dependency SDK for Node.js, Discord.js bots, and frontend apps.

### Initializing the SDK
```javascript
const { NexusAI } = require('./nexus-ai.js');
// or: import NexusAI from './nexus-ai.js';

const ai = new NexusAI({
  apiKey: process.env.NEXUS_API_KEY || 'nexus_sk_live_a89f41b7e092c31d4e68bb507ef194',
  baseUrl: 'https://ais-dev-ibvpx7fn3pnxtdxabola6x-240233116101.us-east1.run.app/api/v1',
  persona: 'nexus-homie'
});
```

### Key SDK Methods

| Method | Parameters | Description |
|---|---|---|
| `ai.askJSON(options)` | `{ prompt, persona, authorId, rules, imageUrl }` | Core chat reasoning execution, full structured JSON response |
| `ai.ask(options)` | `prompt: string \| options object` | Quick query returning clean text string |
| `ai.checkSecurity(options)` | `{ messageText, authorId, imageUrl, imageData }` | RaidShield security threat check |
| `ai.isSafe(messageText)` | `messageText: string` | Quick boolean safety check |
| `ai.createChatSession(options)` | `{ persona, authorId, username, rules }` | Stateful multi-turn `NexusChatSession` with automatic history |
| `ai.solveMath(expression)` | `expression: string` | Math & algebraic deduction |
| `ai.extractEntities(text)` | `text: string` | Named entity / salient noun extraction |
| `ai.searchDocuments(options)` | `{ query, limit }` | BM25 knowledge-corpus search |

### Discord.js Bot Integration Example
```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { NexusAI } = require('./nexus-ai.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const nexus = new NexusAI({
  apiKey: process.env.NEXUS_API_KEY,
  persona: 'nexus-homie'
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // 1. Instant RaidShield Security Scan
  const scan = await nexus.checkSecurity({ messageText: message.content, authorId: message.author.id });
  if (scan.classification === 'scam' || scan.classification === 'raid') {
    await message.delete().catch(() => {});
    await message.channel.send(`🛡️ **RaidShield Security Action:** Removed malicious payload from <@${message.author.id}>. Reason: ${scan.reason}`);
    return;
  }

  // 2. Respond when mentioned
  if (message.mentions.has(client.user)) {
    const cleanPrompt = message.content.replace(/<@!?\d+>/g, '').trim();
    const reply = await nexus.ask({
      prompt: cleanPrompt,
      authorId: message.author.id,
      username: message.author.username
    });
    await message.reply(reply);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
```

---

## 6. Rules for Future AI Models Modifying This Codebase

When writing code or making modifications to this repository:
1. **NO External AI API Calls:** Never introduce `@google/genai`, `openai`, `anthropic`, or external LLM API calls in `server.ts` or `src/ai-engine/`.
2. **Deterministic Rules Preserved:** Keep the Casseurt roast, VIP brother mode, and RaidShield 21 rules intact in `src/ai-engine/ruleEngine.ts`.
3. **Extend Solvers Modularly:** To add knowledge or logic, add structured documents to `src/ai-engine/knowledgeBase.ts` or add specialized handlers to `mathSolver.ts`, `codeSolver.ts`, or `generalIntelligence.ts`.
4. **Maintain TypeScript Strictness:** Run `npm run lint` (`tsc --noEmit`) to verify zero syntax and type errors after any change.
