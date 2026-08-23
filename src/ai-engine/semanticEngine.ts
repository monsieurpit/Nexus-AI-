import { KnowledgeItem, AttentionScore, UserMemory } from '../types';
import { tokenize } from './tokenizer';

// 24-Dimensional Semantic Latent Representation
export const SEMANTIC_DIMENSIONS = [
  'mathematics', // 0: Arithmetic, algebra, calculus, stats
  'coding_ts_js', // 1: TypeScript, JavaScript, React, frontend
  'coding_py_algo', // 2: Python, Data structures, Algorithms
  'coding_sys_db', // 3: SQL, Databases, Backend, System design
  'deep_learning', // 4: Transformers, LLMs, Attention, Gemini
  'physics_space', // 5: Relativity, Quantum, Mechanics, Astrophysics
  'bio_chemistry', // 6: Genetics, CRISPR, Molecular biology, Reactions
  'logic_deduction', // 7: Syllogisms, Riddles, Formal logic, Truth tables
  'philosophy_ethics', // 8: Mind, Consciousness, Epistemology, Stoicism
  'creative_writing', // 9: Story, Narrative, Poetry, Metaphor
  'rhetoric_strategy', // 10: Persuasion, Debate, Structure, Frameworks
  'business_economics', // 11: Market, Strategy, 80/20, Optimization
  'conversational', // 12: Greetings, Casual talk, Rapport
  'factual_qa', // 13: Direct definitions, History, Summaries
  'debugging_review', // 14: Finding bugs, Refactoring, Syntax fixes
  'decision_analysis', // 15: Pros/cons, Trade-offs, Multi-criteria
  'emotional_warmth', // 16: Empathy, Encouragement, Support
  'teaching_socratic', // 17: Step-by-step guidance, Inquiry
  'conciseness_focus', // 18: Short, Crisp, Direct
  'multistep_cot', // 19: High-complexity chain of thought needed
  'user_memory_query', // 20: Referring to past context or personal info
  'architecture_design', // 21: High-level system blueprints, Diagrams
  'data_visualization', // 22: Charts, Matrices, Tables, Formatting
  'meta_cognition', // 23: Identity, Prompt introspection, Safety
];

/**
 * Human-readable display labels for SEMANTIC_DIMENSIONS. The raw keys are snake_case
 * identifiers meant for code, not UI — rendering them directly (even with CSS `capitalize`)
 * just shows "Coding_ts_js" verbatim, since CSS only capitalizes the first letter of a string
 * with no whitespace in it; underscores aren't word boundaries to CSS.
 */
export const SEMANTIC_DIMENSION_LABELS: Record<string, string> = {
  mathematics: 'Mathematics',
  coding_ts_js: 'Coding (TS/JS)',
  coding_py_algo: 'Coding (Python/Algorithms)',
  coding_sys_db: 'Systems & Databases',
  deep_learning: 'Deep Learning',
  physics_space: 'Physics & Space',
  bio_chemistry: 'Biology & Chemistry',
  logic_deduction: 'Logic & Deduction',
  philosophy_ethics: 'Philosophy & Ethics',
  creative_writing: 'Creative Writing',
  rhetoric_strategy: 'Rhetoric & Strategy',
  business_economics: 'Business & Economics',
  conversational: 'Conversational',
  factual_qa: 'Factual Q&A',
  debugging_review: 'Debugging & Review',
  decision_analysis: 'Decision Analysis',
  emotional_warmth: 'Emotional Warmth',
  teaching_socratic: 'Teaching (Socratic)',
  conciseness_focus: 'Conciseness Focus',
  multistep_cot: 'Multi-Step Reasoning',
  user_memory_query: 'User Memory Query',
  architecture_design: 'Architecture & Design',
  data_visualization: 'Data Visualization',
  meta_cognition: 'Meta-Cognition',
};

export interface IntentAnalysis {
  primaryIntent:
    | 'math'
    | 'coding'
    | 'debugging'
    | 'algorithm'
    | 'logic_puzzle'
    | 'science'
    | 'philosophy'
    | 'creative'
    | 'explanation'
    | 'reasoning'
    | 'casual'
    | 'fact'
    | 'teaching'
    | 'memory';
  complexityScore: number; // 0.1 to 1.0
  sentimentScore: number; // -1 to 1
  isQuestion: boolean;
  requiresCoT: boolean;
  detectedTopics: string[];
  semanticVector: number[];
  extractedMemories?: { key: string; fact: string }[];
}

export function computeEmbedding(text: string): number[] {
  const lower = text.toLowerCase();
  const vec = new Array(SEMANTIC_DIMENSIONS.length).fill(0);

  // Helper keyword matcher
  const matchCount = (words: string[]) => {
    let count = 0;
    for (const w of words) {
      if (lower.includes(w)) count++;
    }
    return count;
  };

  // Check if query is about deep learning / neural networks
  const isDeepLearning = matchCount([
    'transformer',
    'self-attention',
    'attention',
    'query key value',
    'query, key',
    'key and value',
    'latent space',
    'neural network',
    'deep learning',
  ]) > 0;

  // 0: Mathematics
  // Real arithmetic operators only count when they actually sit between two numbers
  // ("5 + 3") — checking bare '+'/'-'/'*'/'/'/'^' via plain substring match (as this list
  // used to) false-positives on any hyphenated word ("self-attention", "state-of-the-art")
  // or markdown emphasis, none of which have anything to do with math.
  const hasArithmeticExpression = /\d+\s*[+\-*/^%]\s*\d+/.test(lower);
  const mathMatches =
    matchCount([
      'equation',
      'integral',
      'derivative',
      'algebra',
      'sqrt',
      'factorial',
      'percentage',
      'percent',
      'average',
      'mean',
      'median',
      'radius',
      'solve for',
      'arithmetic',
      'pi',
    ]) +
    (hasArithmeticExpression ? 3 : 0) +
    (!isDeepLearning ? matchCount(['calculate', 'compute', 'solve']) : 0);
  if (mathMatches > 0) vec[0] = Math.min(1.0, 0.2 + mathMatches * 0.22);

  // 1: TypeScript / JavaScript / Frontend
  const tsMatches = matchCount([
    'typescript',
    'javascript',
    'react',
    'hook',
    'useeffect',
    'usestate',
    'usecallback',
    'component',
    'tsx',
    'jsx',
    'tailwind',
    'debounce',
    'throttle',
    'interface',
    'async',
    'await',
  ]);
  if (tsMatches > 0) vec[1] = Math.min(1.0, 0.2 + tsMatches * 0.25);

  // 2: Python / Algorithms
  const pyAlgoMatches = matchCount([
    'python',
    'algorithm',
    'quicksort',
    'mergesort',
    'binary search',
    'lru',
    'dynamic programming',
    'memoization',
    'complexity',
    'big o',
    'tree',
    'graph',
    'bfs',
    'dfs',
    'def ',
  ]);
  if (pyAlgoMatches > 0) vec[2] = Math.min(1.0, 0.2 + pyAlgoMatches * 0.25);

  // 3: SQL / Backend / System Design
  const sysMatches = matchCount([
    'sql',
    'postgres',
    'database',
    'join',
    'group by',
    'table',
    'microservice',
    'distributed system',
    'acid',
    'cap theorem',
    'cache',
    'redis',
    'api endpoint',
  ]) + (!isDeepLearning ? matchCount(['query']) : 0);
  if (sysMatches > 0) vec[3] = Math.min(1.0, 0.2 + sysMatches * 0.22);

  // 4: Deep Learning / Gemini / Attention
  const dlMatches = matchCount([
    'transformer',
    'gemini',
    'deepmind',
    'attention',
    'self-attention',
    'query key value',
    'query, key',
    'key, and value',
    'neural network',
    'llm',
    'embedding',
    'token',
    'weights',
    'flashattention',
    'kv cache',
    'rlhf',
    'dpo',
    'rope',
    'loss',
  ]);
  if (dlMatches > 0) vec[4] = Math.min(1.0, 0.2 + dlMatches * 0.25);

  // 5: Physics / Space / Relativity
  const physMatches = matchCount([
    'physics',
    'quantum',
    'relativity',
    'einstein',
    'gravity',
    'schrodinger',
    'entropy',
    'spacetime',
    'black hole',
    'universe',
    'galaxy',
    'astronomy',
    'speed of light',
    'thermodynamics',
  ]);
  if (physMatches > 0) vec[5] = Math.min(1.0, 0.2 + physMatches * 0.25);

  // 6: Bio / Genetics / Chemistry
  const bioMatches = matchCount([
    'biology',
    'genetics',
    'dna',
    'rna',
    'crispr',
    'cell',
    'protein',
    'enzyme',
    'photosynthesis',
    'molecule',
    'chemistry',
    'reaction',
  ]);
  if (bioMatches > 0) vec[6] = Math.min(1.0, 0.2 + bioMatches * 0.25);

  // 7: Logic / Deduction
  const logicMatches = matchCount([
    'puzzle',
    'riddle',
    'monty hall',
    'knights and knaves',
    'syllogism',
    'wolf goat cabbage',
    'premise',
    'conclusion',
    'truth table',
    'deduce',
    'deduction',
    'paradox',
  ]);
  if (logicMatches > 0) vec[7] = Math.min(1.0, 0.2 + logicMatches * 0.25);

  // 8: Philosophy / Ethics / Consciousness
  const philMatches = matchCount([
    'philosophy',
    'consciousness',
    'qualia',
    'chinese room',
    'hard problem',
    'functionalism',
    'stoicism',
    'epistemology',
    'ethics',
    'free will',
    'trolley problem',
    'kant',
    'socrates',
  ]);
  if (philMatches > 0) vec[8] = Math.min(1.0, 0.2 + philMatches * 0.25);

  // 9: Creative Writing
  const creativeMatches = matchCount([
    'story',
    'poem',
    'write a',
    'narrative',
    'fiction',
    'metaphor',
    'rhyme',
    'novel',
    'prose',
    'character',
    'imagine',
    'scene',
  ]);
  if (creativeMatches > 0) vec[9] = Math.min(1.0, 0.2 + creativeMatches * 0.25);

  // 10: Rhetoric & Strategy
  const stratMatches = matchCount([
    'strategy',
    'mental model',
    'first principles',
    'inversion',
    'pareto',
    'framework',
    'decision',
    'swot',
    'second order',
  ]);
  if (stratMatches > 0) vec[10] = Math.min(1.0, 0.2 + stratMatches * 0.25);

  // 12: Conversational
  const convMatches = matchCount([
    'hello',
    'hi',
    'hey',
    'good morning',
    'good afternoon',
    'thanks',
    'thank you',
    'how are you',
    'who are you',
    'what are you',
    'nice to meet',
    'idk',
    'i created you',
    'what',
    'cool',
    'haha',
  ]);
  if (convMatches > 0) vec[12] = Math.min(1.0, 0.2 + convMatches * 0.3);

  // 14: Debugging
  const debugMatches = matchCount([
    'bug',
    'error',
    'debug',
    'fix',
    'broken',
    'why is this failing',
    'exception',
    'syntax error',
    'wrong',
  ]);
  if (debugMatches > 0) vec[14] = Math.min(1.0, 0.2 + debugMatches * 0.3);

  // 13-23 were declared in SEMANTIC_DIMENSIONS but never actually scored — vec[13] and
  // vec[15] through vec[23] stayed at their initial 0 for every single query regardless of
  // content, since nothing ever wrote to them. That's 10 of the 24 "dimensions" permanently
  // inert. Filled in the remaining matchers below, one per dimension.

  // 13: Factual Q&A (direct definitions, history, summaries)
  const factualMatches = matchCount([
    'define',
    'definition',
    'who was',
    'who invented',
    'when did',
    'when was',
    'what year',
    'history of',
    'summarize',
    'summary of',
    'fact about',
    'facts about',
  ]);
  if (factualMatches > 0) vec[13] = Math.min(1.0, 0.2 + factualMatches * 0.25);

  // 15: Decision Analysis (pros/cons, trade-offs, multi-criteria)
  const decisionMatches = matchCount([
    'pros and cons',
    'trade-off',
    'tradeoff',
    'should i',
    'which is better',
    'compare',
    'versus',
    'vs',
    'decide',
    'decision',
    'choose between',
    'weigh the options',
  ]);
  if (decisionMatches > 0) vec[15] = Math.min(1.0, 0.2 + decisionMatches * 0.25);

  // 16: Emotional Warmth (empathy, encouragement, support)
  const emotionalMatches = matchCount([
    'feel',
    'feeling',
    'sad',
    'upset',
    'hurt',
    'hate',
    'hating',
    'angry',
    'mad at',
    'stressed',
    'anxious',
    'lonely',
    'support me',
    'comfort',
    'encourage',
    'proud of',
    'love you',
    'care about',
    'worried',
  ]);
  if (emotionalMatches > 0) vec[16] = Math.min(1.0, 0.2 + emotionalMatches * 0.3);

  // 17: Teaching (Socratic) — step-by-step guidance, inquiry
  const teachingMatches = matchCount([
    'explain step by step',
    'teach me',
    'walk me through',
    'help me understand',
    'guide me',
    'how would you approach',
    'why do you think',
  ]);
  if (teachingMatches > 0) vec[17] = Math.min(1.0, 0.2 + teachingMatches * 0.3);

  // 18: Conciseness Focus (short, crisp, direct)
  const concisenessMatches = matchCount([
    'briefly',
    'short answer',
    'tl;dr',
    'tldr',
    'in one sentence',
    'quick answer',
    'sum up',
    'concise',
    'one word',
  ]);
  if (concisenessMatches > 0) vec[18] = Math.min(1.0, 0.2 + concisenessMatches * 0.3);

  // 19: Multi-Step Reasoning (high-complexity chain of thought needed)
  const cotMatches = matchCount([
    'step by step',
    'chain of thought',
    'multi-step',
    'break this down',
    'think through',
    'analyze this carefully',
    'deep think',
  ]);
  if (cotMatches > 0) vec[19] = Math.min(1.0, 0.2 + cotMatches * 0.3);

  // 20: User Memory Query (referring to past context or personal info)
  const memoryMatches = matchCount([
    'remember',
    'you said earlier',
    'last time',
    'previously',
    'my name is',
    'do you remember',
    'what did i tell you',
    'earlier i said',
    'recall',
  ]);
  if (memoryMatches > 0) vec[20] = Math.min(1.0, 0.2 + memoryMatches * 0.3);

  // 21: Architecture & Design (high-level system blueprints, diagrams)
  const architectureMatches = matchCount([
    'architecture',
    'system design',
    'blueprint',
    'diagram',
    'high level design',
    'microservices',
    'design pattern',
    'scalable system',
    'infrastructure',
  ]);
  if (architectureMatches > 0) vec[21] = Math.min(1.0, 0.2 + architectureMatches * 0.25);

  // 22: Data Visualization (charts, matrices, tables, formatting)
  const dataVizMatches = matchCount([
    'chart',
    'graph',
    'table',
    'visualize',
    'plot',
    'bar chart',
    'pie chart',
    'dashboard',
    'visualization',
    'matrix',
  ]);
  if (dataVizMatches > 0) vec[22] = Math.min(1.0, 0.2 + dataVizMatches * 0.25);

  // 23: Meta-Cognition (identity, prompt introspection, safety)
  const metaMatches = matchCount([
    'are you conscious',
    'are you sentient',
    'are you safe',
    'who made you',
    'are you an ai',
    'your limitations',
    'can you think',
    'are you alive',
    'your rules',
    'jailbreak',
  ]);
  if (metaMatches > 0) vec[23] = Math.min(1.0, 0.2 + metaMatches * 0.3);

  // Normalize vector to unit sphere if non-zero
  const sumSquares = vec.reduce((sum, v) => sum + v * v, 0);
  if (sumSquares === 0) return vec;
  const norm = Math.sqrt(sumSquares);
  return vec.map((v) => parseFloat((v / norm).toFixed(4)));
}

export function cosineSimilarity(v1: number[], v2: number[]): number {
  if (v1.length !== v2.length) return 0;
  let dot = 0;
  let n1 = 0;
  let n2 = 0;
  for (let i = 0; i < v1.length; i++) {
    dot += v1[i] * v2[i];
    n1 += v1[i] * v1[i];
    n2 += v2[i] * v2[i];
  }
  if (n1 === 0 || n2 === 0) return 0;
  const denom = Math.sqrt(n1) * Math.sqrt(n2);
  return denom === 0 ? 0 : parseFloat((dot / denom).toFixed(4));
}

export function analyzePromptIntent(prompt: string): IntentAnalysis {
  const vec = computeEmbedding(prompt);
  const lower = prompt.toLowerCase();
  const isQuestion =
    prompt.includes('?') ||
    /^(what|how|why|who|when|where|can|could|is|are|will|should|solve|calculate|write|fix|explain)/i.test(
      prompt.trim()
    );

  let primaryIntent: IntentAnalysis['primaryIntent'] = 'casual';

  // Math check
  if (
    vec[0] > 0.35 ||
    /(calculate|compute|solve|percentage|average|sqrt|factorial|\d+\s*[\+\-\*\/\^%]\s*\d+)/i.test(
      lower
    )
  ) {
    primaryIntent = 'math';
  } else if (
    vec[14] > 0.4 ||
    /(why does this error|debug this|fix this code|what is wrong with|fix bug)/i.test(lower)
  ) {
    primaryIntent = 'debugging';
  } else if (
    vec[2] > 0.35 ||
    /(quicksort|mergesort|binary search|lru cache|algorithm|dynamic programming|big o)/i.test(lower)
  ) {
    primaryIntent = 'algorithm';
  } else if (
    vec[1] > 0.35 ||
    vec[3] > 0.35 ||
    /(write code|typescript|javascript|react|python|sql|function|implement|api)/i.test(lower)
  ) {
    primaryIntent = 'coding';
  } else if (
    vec[7] > 0.35 ||
    /(monty hall|knights and knaves|riddle|wolf goat cabbage|puzzle|syllogism)/i.test(lower)
  ) {
    primaryIntent = 'logic_puzzle';
  } else if (vec[9] > 0.4 || /(write a story|write a poem|creative|narrative|rhyme)/i.test(lower)) {
    primaryIntent = 'creative';
  } else if (
    vec[8] > 0.35 ||
    /(consciousness|meaning of life|free will|philosophy|ethics|stoicism|qualia)/i.test(lower)
  ) {
    primaryIntent = 'philosophy';
  } else if (
    vec[5] > 0.35 ||
    vec[6] > 0.35 ||
    /(physics|quantum|relativity|gravity|astronomy|biology|dna|crispr)/i.test(lower)
  ) {
    primaryIntent = 'science';
  } else if (
    vec[4] > 0.35 ||
    /(transformer|gemini|deepmind|self-attention|neural network|llm)/i.test(lower)
  ) {
    primaryIntent = 'explanation';
  } else if (isQuestion) {
    primaryIntent = 'fact';
  }

  // Memory extraction — matched against the original-case `prompt`, not `lower`, so a
  // captured name like "Patrick" isn't permanently stored/displayed back as "patrick".
  const extractedMemories: { key: string; fact: string }[] = [];
  const nameMatch = prompt.match(/(?:my name is|i am called|call me)\s+([a-zA-Z]+)/i);
  if (nameMatch) {
    extractedMemories.push({ key: 'user_name', fact: `User's name is ${nameMatch[1]}` });
  }
  const interestMatch = prompt.match(/(?:i like|i love|i am interested in|i am building|i am learning)\s+([^.!?]+)/i);
  if (interestMatch) {
    extractedMemories.push({ key: 'user_interest', fact: `User is interested in: ${interestMatch[1].trim()}` });
  }

  const complexityScore = Math.min(
    1.0,
    parseFloat(
      (
        prompt.length / 280 +
        (primaryIntent === 'math' ||
        primaryIntent === 'algorithm' ||
        primaryIntent === 'coding' ||
        primaryIntent === 'debugging' ||
        primaryIntent === 'logic_puzzle'
          ? 0.4
          : 0.15)
      ).toFixed(2)
    )
  );

  const detectedTopics: string[] = [];
  if (vec[0] > 0.25) detectedTopics.push('Mathematical Computation');
  if (vec[1] > 0.25 || vec[2] > 0.25 || vec[3] > 0.25) detectedTopics.push('Software Architecture & Code');
  if (vec[4] > 0.25) detectedTopics.push('AI & Neural Architectures');
  if (vec[5] > 0.25 || vec[6] > 0.25) detectedTopics.push('Physical & Biological Sciences');
  if (vec[7] > 0.25) detectedTopics.push('Logic & Deductive Systems');
  if (vec[8] > 0.25) detectedTopics.push('Philosophy & Ethics');
  if (vec[9] > 0.25) detectedTopics.push('Creative Synthesis');

  return {
    primaryIntent,
    complexityScore,
    sentimentScore:
      lower.includes('great') || lower.includes('awesome') || lower.includes('love')
        ? 0.7
        : lower.includes('error') || lower.includes('broken') || lower.includes('fail')
        ? -0.5
        : 0.1,
    isQuestion,
    requiresCoT:
      complexityScore > 0.35 ||
      primaryIntent === 'math' ||
      primaryIntent === 'coding' ||
      primaryIntent === 'algorithm' ||
      primaryIntent === 'logic_puzzle' ||
      primaryIntent === 'debugging',
    detectedTopics: detectedTopics.length > 0 ? detectedTopics : ['General Dialectic'],
    semanticVector: vec,
    extractedMemories,
  };
}

import { BM25Engine, processForSearch } from './bm25Engine';

// Global cached BM25 instance
let cachedBM25Engine: BM25Engine | null = null;
let cachedDocsCount = 0;

export function getBM25Engine(knowledgeList: KnowledgeItem[]): BM25Engine {
  if (!cachedBM25Engine || cachedDocsCount !== knowledgeList.length) {
    cachedBM25Engine = new BM25Engine(knowledgeList);
    cachedDocsCount = knowledgeList.length;
  }
  return cachedBM25Engine;
}

/**
 * Extract named entities and salient nouns from query
 */
export function extractQueryEntities(text: string): string[] {
  const entities: string[] = [];
  const words = text.split(/\s+/).map((w) => w.replace(/[^\w]/g, '').trim()).filter(Boolean);

  // Capitalized entity phrases (e.g. "Albert Einstein", "Cristiano Ronaldo")
  let currentCap: string[] = [];
  for (const w of words) {
    if (/^[A-Z][a-z0-9]/.test(w) && !/^(What|Who|When|Where|Why|How|Tell|Explain|Can|Could|Please|Is|Are)$/.test(w)) {
      currentCap.push(w);
    } else {
      if (currentCap.length > 0) {
        entities.push(currentCap.join(' '));
        currentCap = [];
      }
    }
  }
  if (currentCap.length > 0) {
    entities.push(currentCap.join(' '));
  }

  // Significant topic nouns > 3 chars
  const processed = processForSearch(text);
  for (const p of processed) {
    if (p.length > 3 && !entities.some((e) => e.toLowerCase().includes(p))) {
      entities.push(p);
    }
  }

  return Array.from(new Set(entities));
}

export function searchKnowledgeGraph(
  prompt: string,
  knowledgeList: KnowledgeItem[],
  topK: number = 3,
  recentlyCitedDocIds?: Set<string>
): { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[] {
  const engine = getBM25Engine(knowledgeList);
  const bm25Results = engine.search(prompt, topK, true, recentlyCitedDocIds);

  if (bm25Results.length > 0) {
    return bm25Results.map((r) => ({
      item: r.item,
      score: r.score,
      snippet: r.snippet,
      relevantSentences: r.relevantSentences,
    }));
  }

  // Fallback to vector cosine similarity if BM25 had 0 hits
  const promptVec = computeEmbedding(prompt);
  const scored = knowledgeList
    .map((item) => {
      const itemVec =
        item.embeddingVector ||
        computeEmbedding(item.title + ' ' + item.keywords.join(' ') + ' ' + item.content);
      const cosSim = cosineSimilarity(promptVec, itemVec);
      return {
        item,
        score: parseFloat(cosSim.toFixed(3)),
      };
    })
    .filter((entry) => entry.score > 0.45);

  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}

export function calculateAttentionMatrix(
  prompt: string,
  systemPrompt: string,
  topKnowledge: KnowledgeItem[],
  numHeads: number = 4
): AttentionScore[] {
  const promptTokens = tokenize(prompt);
  const result: AttentionScore[] = [];

  promptTokens.forEach((t, i) => {
    const isStopWord = /^(the|a|an|is|are|was|were|in|on|at|to|for|of|with|by|and|or|it|that|this)$/i.test(
      t.text.trim()
    );
    const lengthBoost = Math.min(1.0, t.text.length / 8);
    const positionBias = Math.sin((i / Math.max(1, promptTokens.length)) * Math.PI) * 0.2;

    let headVariance = 0;
    for (let h = 0; h < numHeads; h++) {
      headVariance += Math.sin(i + h * 1.7) * 0.08;
    }

    const baseScore = isStopWord
      ? 0.18
      : 0.58 + lengthBoost * 0.3 + positionBias + headVariance / numHeads;
    result.push({
      token: t.text,
      score: Math.max(0.08, Math.min(0.99, parseFloat(baseScore.toFixed(3)))),
      source: 'prompt',
    });
  });

  if (topKnowledge.length > 0) {
    topKnowledge.forEach((k) => {
      result.push({
        token: `[KB: ${k.title}]`,
        score: 0.92,
        source: 'knowledge',
      });
    });
  }

  result.push({
    token: `[System Persona]`,
    score: 0.82,
    source: 'system',
  });

  return result;
}
