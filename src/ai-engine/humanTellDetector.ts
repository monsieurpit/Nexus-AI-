// Wave 9: automated "sounds human" watchdog. This session found two real quality regressions the
// same way both times — manually testing and noticing something felt off (the list-formatting
// AI-tell, found by eyeballing a "how do vaccines work" reply; the prompt-bloat latency problem,
// found by measuring a slow reply after complaining it felt sluggish). That works, but it doesn't
// scale and it doesn't catch a REGRESSION later — a future directive addition could quietly
// reintroduce either problem with nobody noticing until a user complains again. This codifies both
// known AI-tell classes as real, checkable signals so scripts/regressionCheck.ts can catch them
// automatically on every future run instead of relying on someone happening to notice.

// List/bold-header formatting — the single biggest structural AI-tell found this session (see
// flattenListFormatting in reasoningEngine.ts, the mechanical fix for this same signal). A numbered
// or bulleted breakdown, or a "**Word** - explanation" sub-point, reads as a report/study-guide,
// not a chat message from a real person.
const LIST_MARKER_PATTERN = /^\s*(?:\d+[.)]\s|[-•]\s)/m;
const BOLD_HEADER_PATTERN = /\*\*.+?\*\*/;

export function hasListFormatting(text: string): boolean {
  return LIST_MARKER_PATTERN.test(text) || BOLD_HEADER_PATTERN.test(text);
}

// Essay/report transition phrases — nobody says "furthermore" or "in conclusion" in a text
// message. Word-boundary matched and case-insensitive; deliberately narrow phrases with no
// legitimate casual-chat use, not words that could appear naturally in ordinary conversation.
const ESSAY_TRANSITION_PATTERN =
  /\b(?:furthermore|in conclusion|overall,|to conclude|in summary|it(?:'s| is) worth noting that|that being said|moreover,|additionally,)\b/i;

export function hasEssayTransitions(text: string): boolean {
  return ESSAY_TRANSITION_PATTERN.test(text);
}

// Restating the question back before answering it ("so you're asking about X...", "you want to
// know how Y works...") — a real person who understood the question just answers it. Checked only
// at the START of a response (a real answer might legitimately reference the topic mid-reply)
// since that's specifically where this tell shows up.
const QUESTION_RESTATING_PATTERN = /^\s*(?:so\s+)?(?:you'?re\s+asking|you\s+want\s+to\s+know|your\s+question\s+is)\b/i;

export function hasQuestionRestating(text: string): boolean {
  return QUESTION_RESTATING_PATTERN.test(text);
}

export interface HumanTellReport {
  tells: string[];
  clean: boolean;
}

// Runs every known tell against one piece of generated text — the single entry point
// regressionCheck.ts (and any future caller) should use, so a new tell class only needs to be
// added here once to start getting checked everywhere this is called.
export function detectHumanTells(text: string): HumanTellReport {
  const tells: string[] = [];
  if (hasListFormatting(text)) tells.push('list-formatting');
  if (hasEssayTransitions(text)) tells.push('essay-transition');
  if (hasQuestionRestating(text)) tells.push('question-restating');
  return { tells, clean: tells.length === 0 };
}
