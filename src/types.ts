export type ModelPersonaId =
  | 'gemini-core'
  | 'nexus-homie'
  | 'raidshield-ai'
  | 'deep-researcher'
  | 'creative-synthesizer'
  | 'code-architect'
  | 'socratic-mentor'
  | 'discord-sentinel'
  | 'roast-master'
  | 'crashout-bot'
  | 'chill-mod'
  | 'custom';

export type ReasoningMode = 'fast' | 'thorough' | 'deep-cot';

export interface ModelPersona {
  id: ModelPersonaId;
  name: string;
  tagline: string;
  description: string;
  avatarIcon: string;
  systemPrompt: string;
  defaultTemperature: number;
  defaultTopP: number;
  reasoningMode: ReasoningMode;
  toneSettings: {
    warmth: number; // 0 (clinical) - 100 (warm/friendly)
    technicality: number; // 0 (simple) - 100 (deeply technical)
    verbosity: number; // 0 (concise) - 100 (detailed)
    creativity: number; // 0 (strict factual) - 100 (poetic/creative)
    humor: number; // 0 (serious) - 100 (playful/witty)
  };
}

export interface AISettings {
  activePersonaId: ModelPersonaId;
  customPersona: ModelPersona;
  temperature: number; // 0.0 to 1.5
  topP: number; // 0.1 to 1.0
  topK: number; // 10 to 100
  reasoningMode: ReasoningMode;
  attentionHeads: number; // 1 to 8
  contextWindowTokens: number; // 512 to 8192
  streamingSpeed: 'instant' | 'fast' | 'natural' | 'reflective'; // ms delay per token
  enableChainOfThought: boolean;
  userCustomDirectives: string;
  userName: string;
  discordUserId?: string; // e.g. 1394001641899954368
  isSuperChillUser?: boolean;
  strictRuleAdherence?: boolean;
  roastIntensity?: number; // 0 to 100
  swearEngineEnabled?: boolean;
  swearIntensity?: 'light' | 'moderate' | 'heavy' | 'unhinged';
  language?: 'english' | 'polish' | 'spanish' | 'mixed';
  webSearchEnabled?: boolean;
  webSearchMode?: 'auto' | 'always' | 'disabled';
  webSearchEngine?: 'all' | 'google' | 'duckduckgo' | 'wikipedia';
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
  source: 'google' | 'duckduckgo' | 'wikipedia' | 'web';
  engine?: string;
  domain?: string;
  score?: number;
}

export interface ThoughtStep {
  id: string;
  type: 'intent' | 'retrieval' | 'web_search' | 'attention' | 'reasoning' | 'synthesis' | 'verification';
  title: string;
  description: string;
  data?: Record<string, any>;
  durationMs?: number;
}

export interface AttentionScore {
  token: string;
  score: number; // 0 to 1
  source: 'prompt' | 'memory' | 'knowledge' | 'system' | 'web_search';
}

export interface MessageTelemetry {
  tokensPrompt: number;
  tokensGenerated: number;
  generationTimeMs: number;
  tokensPerSec: number;
  avgAttentionScore: number;
  topKnowledgeHits: string[];
  reasoningStepsCount: number;
  webSearched?: boolean;
  webSearchQuery?: string;
  webSourcesCount?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  imageUrl?: string;
  imageName?: string;
  thoughtProcess?: ThoughtStep[];
  telemetry?: MessageTelemetry;
  attentionMatrix?: AttentionScore[];
  sources?: any[];
  webSources?: WebSearchResult[];
  isStreaming?: boolean;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category:
    | 'Physics'
    | 'Chemistry'
    | 'Biology'
    | 'Astronomy'
    | 'Mathematics'
    | 'Computer Science'
    | 'History'
    | 'Geography'
    | 'Philosophy'
    | 'Economics'
    | 'Psychology'
    | 'Technology'
    | 'Football'
    | 'Daily Life'
    | 'Discord'
    | 'Nutrition'
    | 'Mental Health'
    | 'Personal Finance'
    | 'Fitness'
    | 'Programming'
    | 'Health & Medicine'
    | 'Environment'
    | 'Cooking'
    | 'World Geography'
    | 'Entertainment'
    | 'core'
    | 'science'
    | 'ai-tech'
    | 'coding'
    | 'philosophy'
    | 'culture'
    | 'gaming'
    | 'tech'
    | 'music'
    | 'automotive'
    | 'everyday-science'
    | 'everyday-mechanics'
    | 'practical-skills'
    | 'earth-science'
    | 'human-biology'
    | 'neuroscience'
    | 'genetics'
    | 'physics'
    | 'chemistry'
    | 'networking'
    | 'hardware'
    | 'security'
    | 'history'
    | 'geography'
    | 'economics'
    | 'custom-user'
    | 'user-memory'
    | string;
  keywords: string[];
  content: string;
  embeddingVector?: number[];
  createdAt: number;
}

export interface UserMemory {
  id: string;
  key: string;
  fact: string;
  confidence: number;
  timestamp: number;
}
