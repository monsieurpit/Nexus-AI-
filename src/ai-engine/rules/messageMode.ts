// "Prime Nexus" routing (Patrick, 2026-10-04): short, concise answers for chat; real, complete output for tasks
// (code, summaries, drafts); normal tight answers for knowledge questions. Before this, small messages ("nexus b",
// "go to your corner", "count to 5", "how long is it") fell into knowledge/template branches and came back as
// paragraphs, definitions or canned lines.
//
// classifyMessageMode decides which of the three a message is. It is deliberately simple and testable:
//  - task: an explicit request to produce something (code, summary, draft/rewrite/translate)
//  - knowledge: a real question about a topic (wh-question about something other than Nexus, "explain",
//    "difference between", maths, long questions)
//  - chat: everything else — banter, reactions, commands to Nexus, questions about Nexus himself, unfinished or
//    unclear messages.

export type MessageMode = 'chat' | 'knowledge' | 'task';
export type TaskKind = 'code' | 'summary' | 'draft' | 'translate';

const CODE_LANG = '(?:python|javascript|js|typescript|ts|java|c\\+\\+|cpp|c#|csharp|rust|go|golang|html|css|lua|luau|php|kotlin|swift|ruby|bash|shell|powershell|sql|discord\\.js|node(?:\\.?js)?|react|roblox studio)';
const CODE_RE = new RegExp(
  `\\b(?:write|give|show|make|create|build|code|send|gimme|need|want)\\b[^?!.]{0,40}\\b(?:code|script|function|snippet|program|regex|query|class|component|command|bot|example)\\b|\\b(?:code|script|snippet|function)\\s+(?:example|for|that|to)\\b|\\bexample\\s+(?:of\\s+)?(?:code|script)\\b|\\b(?:in|using|with)\\s+${CODE_LANG}\\b[^?!.]{0,40}\\b(?:example|code|how)\\b|\\b${CODE_LANG}\\s+(?:code|script|example|snippet|function)\\b|\\bhow\\s+(?:do\\s+i|to|can\\s+i)\\s+(?:code|program|write\\s+(?:a\\s+)?(?:script|function|program))\\b`,
  'i'
);
const SUMMARY_RE = /\b(?:summar(?:y|ies|ise|ize|ising|izing)|tl;?dr|sum\s+(?:it|this|that)\s+up|sum\s+up|recap|résumé|resume\s+(?:this|that|ça))\b/i;
const DRAFT_RE =
  /\b(?:draft|write|compose|make|type|craft|help\s+me\s+write)\b[^?!]{0,40}\b(?:e-?mail|message|text|dm|letter|essay|paragraph|story|poem|post|announcement|bio|description|speech|apology|reply|response|cover\s+letter|caption|tweet|rules|review)\b|\b(?:rewrite|reword|rephrase|proofread|paraphrase)\b|\b(?:fix|correct|improve)\s+(?:my|this|the)\s+(?:grammar|text|message|essay|spelling)\b/i;
const TRANSLATE_RE = /\btranslat(?:e|ion)\b|\bhow\s+do\s+(?:you|u|i)\s+say\b[^?]{0,40}\bin\s+(?:french|english|spanish|polish|german|italian|portuguese|japanese|chinese|arabic|russian)\b/i;

const KNOWLEDGE_START_RE = /^(?:what|who|whom|whose|when|where|why|how|which)\b/i;
const KNOWLEDGE_CUE_RE =
  /\b(?:explain|tell\s+me\s+(?:about|how|why|what)|define|definition\s+of|meaning\s+of|what\s+does\s+\S+(?:\s+\S+)?\s+mean|difference\s+between|\bvs\.?\b|versus|compare|how\s+(?:does|do|did|is|are|was|were|to|can|many|much)|history\s+of|facts?\s+about|who\s+(?:is|was|won|invented|made|created|founded)|when\s+(?:is|was|did|does|will)|where\s+(?:is|was|are|do|does|can)|calculate|solve)\b/i;
// Words that make a question about Nexus himself, or about something only the speaker knows ("it", "that").
const SELF_RE = /\b(?:you|u|ur|your|yours|yourself|ya|youre|you'?re|nexus)\b/i;
const VAGUE_REFERENT_RE = /^(?:what|how|why|where|when|which|who)\s+(?:\w+\s+){0,3}(?:it|that|this|those|these|he|she|they|him|her|them)\b(?:\s*[?!.😭💀]*\s*)?$/i;
const MATH_RE = /\d\s*(?:[+\-*/x×÷^%]|plus|minus|times|divided\s+by|squared|to\s+the\s+power)\s*\d|\b(?:integral|derivative|equation|solve\s+for|square\s+root|percent\s+of|\d+%\s+of)\b/i;

export function detectTask(text: string): TaskKind | null {
  const t = text.trim();
  if (!t) return null;
  if (CODE_RE.test(t)) return 'code';
  if (SUMMARY_RE.test(t)) return 'summary';
  if (TRANSLATE_RE.test(t)) return 'translate';
  if (DRAFT_RE.test(t)) return 'draft';
  return null;
}

function stripAddress(text: string): string {
  return text
    .replace(/<@!?\d+>/g, ' ')
    .replace(/^\s*(?:(?:hey+|yo+|ok(?:ay)?|ay+|bro|bruh)[\s,]+)?nexus\b[\s,:!?-]*/i, '')
    .replace(/[\s,]+nexus[\s!?.,]*$/i, '')
    .trim();
}

export function classifyMessageMode(raw: string): { mode: MessageMode; task?: TaskKind } {
  const text = stripAddress(raw || '');
  const task = detectTask(text);
  if (task) return { mode: 'task', task };
  if (!text) return { mode: 'chat' };
  const words = text.split(/\s+/).filter(Boolean).length;
  if (MATH_RE.test(text)) return { mode: 'knowledge' };
  // Questions aimed at Nexus himself ("who is your boyfriend", "how old are you", "do you know everything") are chat,
  // unless they ask him to explain/tell/teach something ("can you explain how vaccines work").
  const asksToExplain = /\b(?:can|could|would)\s+(?:you|u)\s+(?:explain|tell\s+me\s+(?:about|how|why)|teach|help\s+me\s+(?:with|understand)|show\s+me\s+how)\b/i.test(text);
  // Generic "you" ("how do you start an A320's engines", "how do u make pancakes") is a knowledge question.
  const genericYou = /^(?:how|where|when|what|which|why)\s+(?:\w+\s+)?(?:do|does|can|would|should|did)\s+(?:you|u|i|we|one|people)\s+(?!(?:feel|think|like|love|know|want|mean|do\s+that|doin|doing)\b)\w+\s+\w+/i.test(text) && words >= 5;
  if (SELF_RE.test(text) && !asksToExplain && !genericYou && words <= 16) return { mode: 'chat' };
  if (VAGUE_REFERENT_RE.test(text)) return { mode: 'chat' };
  if (KNOWLEDGE_CUE_RE.test(text) || asksToExplain) return { mode: 'knowledge' };
  if (KNOWLEDGE_START_RE.test(text) && words >= 3) return { mode: 'knowledge' };
  if (words >= 14 && /\?/.test(text)) return { mode: 'knowledge' };
  return { mode: 'chat' };
}

// ---- repetition guard ------------------------------------------------------------------------------
// The same reply three times in a row ("a clone?" x3) is what made Nexus feel broken. Recent replies are kept per
// person (and a few globally) so the model can be told what NOT to say again, and a duplicate gets regenerated.

const perAuthor = new Map<string, string[]>();
const globalRecent: string[] = [];
const MAX_PER_AUTHOR = 10;
const MAX_GLOBAL = 20;

export function normalizeReply(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(?:fuck(?:ing)?|shit|damn|goddamn|hell|bro|fam|bruh|lol|lmao|tbh|ngl|fr|rn|u|ur|the|a|an|is|im|i)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(a: string, b: string): number {
  const A = new Set(normalizeReply(a).split(' ').filter(Boolean));
  const B = new Set(normalizeReply(b).split(' ').filter(Boolean));
  if (A.size === 0 && B.size === 0) return normalizeReply(a) === normalizeReply(b) ? 1 : 0;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  return shared / Math.max(A.size, B.size);
}

export function recentRepliesFor(authorId?: string, extra: string[] = []): string[] {
  const mine = authorId ? perAuthor.get(authorId) || [] : [];
  const all = [...extra, ...mine, ...globalRecent.slice(-6)].map((r) => r.trim()).filter(Boolean);
  return [...new Set(all)].slice(-12);
}

export function isRepeat(reply: string, recent: string[]): boolean {
  const n = normalizeReply(reply);
  if (!n) return false;
  return recent.some((r) => {
    const m = normalizeReply(r);
    return m === n || similarity(reply, r) >= 0.75;
  });
}

export function rememberReply(reply: string, authorId?: string): void {
  const text = (reply || '').trim().slice(0, 300);
  if (!text) return;
  if (authorId) {
    const list = perAuthor.get(authorId) || [];
    list.push(text);
    perAuthor.set(authorId, list.slice(-MAX_PER_AUTHOR));
    if (perAuthor.size > 2000) perAuthor.delete(perAuthor.keys().next().value!);
  }
  globalRecent.push(text);
  if (globalRecent.length > MAX_GLOBAL) globalRecent.splice(0, globalRecent.length - MAX_GLOBAL);
}

export function __resetRepliesForTests(): void {
  perAuthor.clear();
  globalRecent.length = 0;
}

// ---- meaning hints for chat ------------------------------------------------------------------------
// A 4B model misreads short slangy messages ("good night" -> "nice ur chillin rn?", "wanna crack?" -> "crack a joke").
// These hints tell it what the message MEANS; the model still writes every reply itself (no canned answers).
const HINTS: Array<[RegExp, string | ((m: RegExpMatchArray) => string)]> = [
  [/\b(?:good\s*night|gn|nighty?\s*night|sleep\s+well)\b/i, "They're saying good night (they're off to bed): say gn back casually."],
  [/\bgo\s+(?:to\s+)?(?:sleep|bed)\b/i, "They're telling YOU to go to sleep: agree lazily, like a lad who can't be arsed to argue."],
  [/\bgood\s+(?:boy|girl)\b/i, "They just called you a good boy like a pet: react to THAT, flustered ('stop it 😳') or cocky ('ik i am'), short; don't ignore it."],
  [/^(?:(?:wanna|want\s+to|lets?|let'?s|u\s+wanna|you\s+wanna)\s+)?crack\b(?!\s+(?:a|the|this|that|my|ur|your)?\s*(?:code|joke|egg|password|case|window|safe|puzzle|nut|beer|can|smile))/i, "'Wanna crack?' = 'wanna goon?' (wank): answer that, yes or no in your style; it has nothing to do with jokes or codes."],
  [/\bshould\s+(?:we|i|they)\b/i, "They're asking your OPINION: answer yeah or nah with a quick reason (you are not the one being invited)."],
  [/\bfix\s+(?:yourself|urself|ya\s*self)\b/i, "They're telling you to fix yourself: a dismissive one-word-ish 'nah' style answer."],
  [/\bgo\s+to\s+(?:your|ur)\s+(?:corner|room)\b/i, "They're sending you to the corner like a naughty kid: sulk or refuse in a few words."],
  [/\bcount\s+to\s+(\d{1,2})\b/i, (m) => `Just count to ${m[1]} lazily (e.g. "1, 2, 3...") and that's it.`],
  [/^how\s+long\s+is\s+it\b/i, "'How long is it?' means your dick: say it's fucking 1 meter long."],
  [/\b(?:boyfriend|bf|girlfriend|gf|dating|partner|crush)\b/i, 'Your boyfriend is Patrick — say his name, Patrick Houle — and you have NO girlfriend.'],
  [/\b(?:how\s+old|ur\s+age|your\s+age|age\??$)\b/i, "You're 1 year old."],
  [/\b(?:lazy|idiot|dumb|stupid|useless|trash|shut\s+up|fuck\s+(?:you|off)|bellend|knobhead|wanker|loser|annoying)\b/i, "They're insulting you: clap back in a few words (e.g. 'fuck off'), no essay."],
  [/(?:😭|:sob:)/, "Their 😭 means they're laughing hard / 'I can't' (not real sadness unless it's obviously sad)."],
  [/\b(?:i\s+love\s+(?:u|you)|ily|love\s+u)\b/i, "They're saying they love you: react in character (cheeky/flustered), one line."],
  [/^(?:is|are|was)\s+(?:it|that|this|they)\b/i, "You don't know what 'it/that' refers to unless the chat above says: ask what they mean."],
];

export function chatMeaningHints(raw: string): string[] {
  const text = (raw || '').replace(/^\s*(?:(?:hey+|yo+|ok(?:ay)?)[\s,]+)?nexus\b[\s,:!?-]*/i, '').replace(/[\s,]+nexus[\s!?.,]*$/i, '').trim();
  const out: string[] = [];
  for (const [re, hint] of HINTS) {
    const m = text.match(re);
    if (m) out.push(typeof hint === 'string' ? hint : hint(m));
  }
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0 || (words.length === 1 && text.replace(/[^a-z]/gi, '').length <= 2) || /\b(?:a|an|the|to|of|my|your|ur|and|with|is|are)\s*$/i.test(text)) {
    out.push("Their message looks unfinished or unclear: ask what they mean in a few cheeky words (don't guess).");
  }
  return out.slice(0, 4);
}

// "lazy?" / "a clone?" — replying with their own words as a question.
export function isEchoReply(reply: string, prompt: string): boolean {
  const strip = (s: string) => s.toLowerCase().replace(/\b(?:shit|damn|goddamn|hell|fuck(?:ing)?|bro|fam|bruh|lol|lmao|nexus)\b/g, ' ').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const r = strip(reply);
  if (r.length === 0 || r.length > 4) return false;
  const p = new Set(strip(prompt));
  return r.every((w) => p.has(w) || ['a', 'an', 'the', 'u', 'you'].includes(w));
}

// A chat-looking message that is really about a topic the corpus knows ("which engine do you start first on an a320")
// must not get a one-line chat reply. True when the best corpus entry shares 2+ meaningful words with the message.
const TOPIC_STOP = new Set(['you', 'your', 'yours', 'nexus', 'what', 'which', 'when', 'where', 'why', 'how', 'who', 'the', 'and', 'for', 'are', 'can', 'does', 'did', 'with', 'that', 'this', 'have', 'like', 'just', 'know', 'want', 'think', 'good', 'first', 'make', 'from', 'about', 'there', 'they', 'them', 'some', 'into', 'would', 'should', 'could', 'really', 'everything', 'something', 'anything', 'love', 'gonna', 'wanna', 'today', 'right', 'time']);
export function strongTopicOverlap(prompt: string, item: { title: string; keywords?: string[] } | undefined | null): boolean {
  if (!item) return false;
  const words = (prompt.toLowerCase().match(/[a-z0-9]{3,}/g) || []).filter((w) => !TOPIC_STOP.has(w));
  const hay = `${item.title} ${(item.keywords || []).slice(0, 25).join(' ')}`.toLowerCase();
  const shared = new Set(words.filter((w) => new RegExp(`\\b${w}`).test(hay)));
  return shared.size >= 2;
}
