import { KnowledgeItem } from '../../types';

export const AI_TECH_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-aitech-what-is-llm',
    title: 'What Is an LLM (Large Language Model) and How Does It Actually Work',
    category: 'ai-tech',
    keywords: [
      'llm', 'large language model', 'what is an llm', 'how does chatgpt work', 'how do ai chatbots work',
      'neural network', 'transformer', 'tokens', 'what is a token in ai', 'how does ai generate text',
      'jak dziala sztuczna inteligencja', 'co to jest chatgpt', 'jak działa chatgpt',
    ],
    content: `A large language model (LLM) is a neural network trained on enormous amounts of text to predict the next "token" (a word or word-fragment) in a sequence, given everything that came before it. That's the entire core mechanism — a chatbot response is generated one token at a time, each one chosen based on probabilities the model learned from its training data, repeated until the response is complete. Modern LLMs (GPT, Claude, Gemini, Llama, and this bot's own local model) are built on the "transformer" architecture (introduced in a 2017 Google paper, "Attention Is All You Need"), which uses a mechanism called self-attention to weigh how relevant every other word in the input is to each word being processed — this is what lets the model handle long-range context (like remembering something mentioned several paragraphs earlier) far better than older architectures. Training happens in stages: pre-training (learning general language patterns and knowledge from massive text datasets — this is the expensive, months-long part), then fine-tuning (adjusting the model to follow instructions and be helpful/safe, often using human feedback — this is where "raw" text prediction becomes an actual usable assistant). Model size is often measured in "parameters" (the learned numerical weights inside the network) — more parameters generally means more capability but slower, more expensive inference, which is why there's a real tradeoff between a small, fast local model and a large, slow, cloud-hosted one. Crucially, an LLM doesn't "look things up" or "know" facts the way a database does — it generates plausible-sounding text based on patterns, which is exactly why it can "hallucinate" (state something false with full confidence) and why retrieval systems (searching a real knowledge base or the live web, like this bot does) exist to ground answers in actual verified content instead of trusting the model's memory alone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-aitech-major-ai-companies-models',
    title: 'Major AI Companies and Their Models',
    category: 'ai-tech',
    keywords: [
      'openai', 'chatgpt', 'anthropic', 'claude ai', 'google gemini', 'meta llama', 'mistral ai', 'ai companies',
      'which ai is best', 'gpt vs claude vs gemini',
    ],
    content: `OpenAI created ChatGPT and the GPT model family, and is generally credited with triggering the mainstream AI boom when ChatGPT launched in November 2022 and became one of the fastest-growing consumer products ever. Anthropic, founded by former OpenAI researchers, builds the Claude model family with an explicit focus on AI safety research; Claude is commonly used both as a consumer chatbot and as the model powering coding tools and agents (including tools like this one). Google's Gemini models are built on the same company's original transformer research and are deeply integrated into Google's own products (Search, Workspace, Android). Meta releases the Llama model family as open-weights (meaning the trained model itself can be downloaded and run locally or fine-tuned by anyone, unlike fully closed models accessible only through an API) — this is exactly the category of model this bot itself runs on. Mistral AI (a French company) is another major open-weights player, often praised for strong performance relative to model size. "Open-weights" vs. "closed" is one of the biggest ongoing divides in the industry: closed models are typically more capable at the frontier but require paying per-use through an API you don't control, while open-weights models can be run privately, customized, and used offline (with zero per-message API cost) at the tradeoff of generally being smaller and less capable than the biggest closed frontier models. Local/offline models like the one running this bot trade some raw capability for privacy, cost (no per-message billing), and full control over the system — no data ever leaves the server it's running on.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-aitech-prompt-engineering',
    title: 'Prompt Engineering: How to Get Better Answers From AI',
    category: 'ai-tech',
    keywords: [
      'prompt engineering', 'how to write better ai prompts', 'system prompt', 'chain of thought', 'few shot prompting',
      'how to get better chatgpt answers', 'ai prompting tips',
    ],
    content: `Prompt engineering is the practice of structuring what you ask an AI model to get more accurate, useful, or on-topic answers — it matters because LLMs are highly sensitive to exactly how a request is phrased. Being specific beats being vague: "write a Python function that reverses a string without using slicing" gets a far more useful answer than "help me with Python." Giving the model a role or persona ("act as a senior code reviewer") can shift its tone and focus, and is exactly the mechanism this bot's own "system prompt" uses to set its personality and rules before ever seeing a user's message. "Chain of thought" prompting — asking the model to reason step by step before giving a final answer, or the model doing this on its own — measurably improves accuracy on math and logic problems, since it forces the model to work through intermediate steps instead of jumping straight to a guess (this is part of why this bot's own reasoning pipeline breaks problems into steps rather than free-associating an answer). "Few-shot" prompting means giving the model a couple of example input/output pairs before your real request, which helps it match a specific format or style far more reliably than a written description alone. Context matters enormously — an LLM only "knows" what's in its training data plus whatever's actually included in the current conversation; it has no memory of previous separate conversations unless a system is specifically built to carry that context over (like a memory feature). Being clear about constraints (length, format, tone, what NOT to do) upfront generally works better than asking for something and then correcting it after — though iterating with follow-up corrections is also completely normal and often necessary for complex requests.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-aitech-limitations-hallucination',
    title: 'AI Limitations: Hallucination, Bias, and Why AI Gets Things Wrong',
    category: 'ai-tech',
    keywords: [
      'ai hallucination', 'why does ai make things up', 'ai bias', 'can you trust ai', 'ai mistakes',
      'ai limitations', 'chatgpt lying', 'why is ai wrong',
    ],
    content: `"Hallucination" is when an AI model states something false with full confidence, as if it were a verified fact — this happens because an LLM generates text based on learned patterns of plausible language, not by checking a database of true statements; if a confident-sounding false answer is statistically similar to how a correct answer would be phrased, the model has no independent mechanism to know the difference unless it's specifically hooked up to a real fact-checking or retrieval system. This is worse for niche, recent, or very specific factual claims (exact statistics, obscure dates, citations/sources) than for general well-established knowledge, since the model has seen far less reliable training data on rare topics. AI bias comes from training data reflecting real-world biases present in the text the model learned from (the internet, books, etc.) — a model can reproduce stereotypes or skewed assumptions present in its training data unless specifically corrected for, which is an active, ongoing area of AI safety research rather than a fully solved problem. LLMs also struggle with precise counting/arithmetic on large numbers (they're predicting plausible next-tokens, not running a calculator, which is why dedicated systems often route math to an actual calculator/parser instead of trusting the raw model — exactly what this bot's own math solver does), and with knowing the exact boundary of their own knowledge (a model often can't reliably tell you when it doesn't know something, because "I don't know" isn't inherently more or less "plausible-sounding" to it than a confident wrong answer). The practical takeaway: treat AI-generated factual claims — especially specific numbers, quotes, citations, or niche facts — as a draft to verify, not a guaranteed-true answer, particularly for anything important.`,
    createdAt: Date.now(),
  },
];
