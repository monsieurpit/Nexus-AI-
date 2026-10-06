import { KnowledgeItem } from '../../../types';

// The coding reference corpus (2026-10-05, Patrick: "one category per coding language, each with literally every
// single thing — I want the AI to be a master"). One file per language, category `code-<lang>` (the v2 code
// specialist pulls the top matches for the detected language into its prompt — v2/pipeline.ts codeReference).
// Dense cheat-sheet style: real syntax, real APIs, idioms, pitfalls and short working examples.
const now = Date.now();
export const code = (lang: string, slug: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id: `kb-v2code-${lang}-${slug}`,
  title,
  category: `code-${lang}`,
  keywords,
  content,
  createdAt: now,
});
