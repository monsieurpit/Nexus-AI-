/**
 * Compound Question Decomposer
 *
 * A single user message often bundles multiple independent questions
 * ("What is photosynthesis and why does it matter for climate change?").
 * Treating that as one bag-of-words search only ever surfaces whichever
 * half scores higher in BM25 — the other half silently goes unanswered.
 * This module splits a compound prompt into independent sub-questions so
 * each can be searched and answered on its own, then recombined.
 */

const QUESTION_LEAD_WORDS =
  /^(?:what|who|when|where|why|how|which|is|are|does|do|did|can|could|will|would|should|explain|describe|tell me|list)\b/i;

export interface DecomposedQuestion {
  isCompound: boolean;
  parts: string[];
}

function looksLikeQuestionFragment(fragment: string): boolean {
  const trimmed = fragment.trim();
  if (trimmed.split(/\s+/).length < 3) return false;
  return QUESTION_LEAD_WORDS.test(trimmed);
}

/**
 * Splits a compound prompt into independent sub-questions.
 * Conservative by design: only splits when both resulting halves independently
 * look like real question fragments, so it won't shred ordinary noun-phrase
 * conjunctions like "bread and butter" or "salt and pepper".
 */
export function decomposeCompoundQuestion(query: string): DecomposedQuestion {
  const trimmed = query.trim();

  // 1. Explicit multiple question marks: "What is X? How does Y work?"
  const questionMarkParts = trimmed
    .split(/(?<=\?)\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (questionMarkParts.length >= 2 && questionMarkParts.every(looksLikeQuestionFragment)) {
    return { isCompound: true, parts: questionMarkParts };
  }

  // 2. "X and Y" / "X, and also Y" where both halves independently read as questions
  const conjunctionSplit = trimmed.split(/\s*,?\s+(?:and also|and|but also)\s+/i);
  if (conjunctionSplit.length === 2) {
    const [first, second] = conjunctionSplit.map((p) => p.trim());
    const secondLooksLikeQuestion = looksLikeQuestionFragment(second);
    const firstLooksLikeQuestion = looksLikeQuestionFragment(first);

    // The second half needs its own lead word (what/why/how/does/...) — otherwise it's
    // very likely just a compound noun phrase or object list, not a second question.
    if (firstLooksLikeQuestion && secondLooksLikeQuestion) {
      return { isCompound: true, parts: [first, second] };
    }
  }

  return { isCompound: false, parts: [trimmed] };
}
