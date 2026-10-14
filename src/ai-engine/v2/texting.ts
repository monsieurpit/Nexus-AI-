// Human texting (2026-10-13, Patrick + ChatGPT: "short follow-ups, occasional emoji-only responses, natural pacing" —
// and Patrick: "in messages he can answer in only 1 word, he actually does — but he answers everything").
//
//   one word     a question that only needs a word gets a word ("are u gay" → "obviously", "messi or ronaldo" → "messi",
//                "fav colour" → "blaugrana", "rate it /10" → "3"), maybe one emoji — still an answer, never silence
//   split        a longer chat line sometimes goes out as 2-3 short messages, like someone typing ("nah" … "ur cooked")
//   emoji        a pure reaction ("lol", "💀", "W") sometimes gets an emoji back instead of words
//   react        now and then he also reacts to their message (💀 😭 🔥) — on top of the reply, never instead of it
// The engine decides; the bot (Nexus-Bot-1-) sends the parts with typing pauses and adds the reaction.

// Questions with a one-word answer: yes/no about him or a thing, "X or Y", "fav X", "rate X", "how old / how many".
export const ONE_WORD_RE = new RegExp(
  [
    // yes / no
    String.raw`^(?:(?:and|so|but|wait|yo|bro|nexus)[\s,]+)?(?:are|r|is|do|does|did|can|could|will|would|have|has|was|were)\s+(?:you|u|ya|he|she|it|they|that|this|messi|ronaldo|barca|barça)\b[^?]{0,40}\??\s*$`,
    // either / or
    String.raw`^(?:(?:who|which|what)(?:'s|s|\s+is|\s+are)?\s+(?:better|best|the\s+goat|goated|ur\s+pick|your\s+pick)[,:]?\s+)?[\p{L}\p{N}' .-]{2,25}\s+or\s+[\p{L}\p{N}' .-]{2,25}\??\s*$`,
    // favourite / best X
    String.raw`^(?:what(?:'s|s|\s+is)|whats|who(?:'s|s|\s+is))\s+(?:ur|your|yo)\s+(?:fav(?:ou?rite)?|best|worst|least\s+fav(?:ou?rite)?)\s+[\p{L} ]{2,25}\??\s*$`,
    String.raw`^(?:fav(?:ou?rite)?|best)\s+[\p{L} ]{2,20}\??\s*$`,
    // rate / how old / how many / how tall
    String.raw`^(?:rate|ranking|rank)\s+[^?]{1,40}(?:\/\s*10|out\s+of\s+10)?\??\s*$`,
    String.raw`^how\s+(?:old|tall|many\s+\w+|much\s+do\s+(?:you|u)\s+\w+)\s+(?:are|r|do|did|is)?\s*(?:you|u|ya)?[^?]{0,25}\??\s*$`,
  ].join('|'),
  'iu'
);
// Not these: they need more than a word even if they look short ("are u ok" after something sad, "can u help me with…").
const NOT_ONE_WORD_RE = /\b(?:help|explain|why|how\s+(?:do|does|to|come)|what\s+happened|tell\s+me|code|write|translate|sad|depress|kill|die|hurt)\b|\b(?:ok|okay|alright|good|fine)\s*\??\s*$/i;

export function wantsOneWord(message: string): boolean {
  const t = message.trim();
  return t.split(/\s+/).length <= 12 && ONE_WORD_RE.test(t) && !NOT_ONE_WORD_RE.test(t);
}

export const ONE_WORD_NOTE = 'This only needs a ONE-WORD answer (a word, a name or a number — like a real person texting back): give just that, maybe one emoji. No sentence, no explanation, no question back.';

// A reply that should be one word but came out as a sentence: the answer word is usually first ("yeah obviously mate")
// or the name they asked about. Returns the trimmed reply, or null if it can't be cut safely.
const FILLER_TAIL_RE = /(?:[\s,]+(?:mate|mates|bruh|bro|ay|cuz|gng|tbh|fr|ngl|lol|lmao|innit|eh|tho|deadset|bloody\s+oath|strewth|fair\s+dinkum|carn|lowkey|obviously|fucking|fuckin|easy|ez))+[.!]*$/i;
export function cutToOneWord(reply: string, message: string): string | null {
  const emoji = (reply.match(/\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]{2}/u) || [''])[0];
  const bare = reply.replace(/\p{Extended_Pictographic}\uFE0F?|[\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
  const words = bare.split(/\s+/);
  // The Aussie two-word answers count as one ("fuck yeah", "hell nah", "bloody oath", "yeah nah").
  const two = bare.match(/^(fuck\s+(?:yeah|yes|no|nah)|hell\s+(?:yeah|yes|no|nah)|bloody\s+oath|yeah\s+nah|nah\s+yeah|of\s+course|not\s+really|no\s+way|too\s+right)\b/i);
  if (two && words.length > 2) return `${two[1].toLowerCase()}${emoji ? ` ${emoji}` : ''}`;
  if (words.length <= 3) {
    // Short already: just drop the filler ("six mate bruh" → "six", "messi olise" with "messi or ronaldo" → "messi").
    const either0 = message.match(/([\p{L}\p{N}'.-]+)\s+or\s+([\p{L}\p{N}'.-]+)/iu);
    const pick = either0 && words.find((w) => [either0[1].toLowerCase(), either0[2].toLowerCase().replace(/[?!.]+$/, '')].includes(w.toLowerCase().replace(/[.,!?]+$/, '')));
    if (pick && words.length > 1) return `${pick.replace(/[.,!?]+$/, '')}${emoji ? ` ${emoji}` : ''}`;
    const trimmed = bare.replace(FILLER_TAIL_RE, '').trim();
    return trimmed && trimmed !== bare ? `${trimmed}${emoji ? ` ${emoji}` : ''}` : null;
  }
  // A short answer with filler after it ("blaugrana orange bloody oath" → "blaugrana orange").
  const trimmedLong = bare.replace(FILLER_TAIL_RE, '').trim();
  if (trimmedLong !== bare && trimmedLong.split(/\s+/).length <= 3 && !/^(?:or|and|but|that|the|a)\b/i.test(trimmedLong)) return `${trimmedLong}${emoji ? ` ${emoji}` : ''}`;
  const first = words[0].replace(/[.,!?]+$/, '');
  if (/^(?:yes|yeah|yep|yup|ye|no|nah|nope|obviously|never|always|maybe|definitely|defo|deadset|absolutely)$/i.test(first)) return `${first.toLowerCase()}${emoji ? ` ${emoji}` : ''}`;
  // "messi or ronaldo" → whichever of the two the reply names first
  const either = message.match(/([\p{L}\p{N}'.-]+(?:\s+[\p{L}\p{N}'.-]+)?)\s+or\s+([\p{L}\p{N}'.-]+(?:\s+[\p{L}\p{N}'.-]+)?)/iu);
  if (either) {
    const a = either[1].toLowerCase().split(/\s+/).pop()!;
    const b = either[2].toLowerCase().replace(/[?!.]+$/, '');
    const r = reply.toLowerCase();
    const ia = r.indexOf(a);
    const ib = r.indexOf(b);
    if (ia >= 0 || ib >= 0) return `${ia >= 0 && (ib < 0 || ia <= ib) ? a : b}${emoji ? ` ${emoji}` : ''}`;
  }
  // a number answer ("rate it" / "how old")
  const num = reply.match(/\b\d+(?:\.\d+)?(?:\s*\/\s*10)?\b/);
  if (num && /\b(?:rate|rank|how\s+(?:old|tall|many|much))\b/i.test(message)) return `${num[0]}${emoji ? ` ${emoji}` : ''}`;
  return null;
}

// A pure reaction message: "lol", "lmao", "💀", "W", "bruh" — nothing to answer but the vibe.
const REACTION_RE = /^(?:lol+|lmao+|lmfao+|haha+|hahaha+|xd+|w|l|bruh+|bro+|damn+|sheesh+|💀+|😭+|😂+|🤣+|🔥+|ok+|k+|fr+|real+|true+|facts|same)[\s!.💀😭😂🤣🔥]*$/iu;
const REACTION_EMOJI = ['💀', '😭', '🤣', '😂', '🗿', '💯'];

function seeded(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

// Splits a chat line into 2-3 messages where a person would hit enter: after a sentence end, a dash, or a reaction word
// at the start ("nah | ur cooked", "LMAO | u actually said that").
function splitLikeTexting(reply: string): string[] {
  const t = reply.trim();
  if (/```|\n|https?:\/\//.test(t) || t.split(/\s+/).length < 6 || t.length > 220) return [t];
  // Sentence ends.
  const sentences = t.split(/(?<=[.!?])\s+(?=\S)/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length >= 2 && sentences.length <= 3 && sentences.every((s) => s.split(/\s+/).length >= 2)) return sentences.map((s) => s.replace(/\.$/, ''));
  // " — " or ", " after an opening reaction ("nah mate, ur cooked", "bro — what")
  const opener = t.match(/^((?:nah|yeah|yep|nope|bro|bruh|mate|lmao+|lol+|oi|oh|wait|bloody\s+oath|fuck\s+(?:yeah|no|off)|hell\s+(?:yeah|nah)|deadset|strewth|ngl)(?:\s+mate)?)[,\s—-]+(.{8,})$/i);
  if (opener) return [opener[1], opener[2]];
  const dash = t.split(/\s+[—–-]\s+/);
  if (dash.length === 2 && dash.every((d) => d.split(/\s+/).length >= 2)) return dash;
  return [t];
}

export interface TextingPlan {
  parts: string[];
  react: string | null; // an emoji reaction on THEIR message, on top of the reply
}

// For a finished reply: how a person would actually send it. Seeded by the message, so a retry looks the same.
export function textingPlan(reply: string, userText: string, mode: string, messageId = ''): TextingPlan {
  const r = seeded(`${messageId}|${userText}`);
  const casual = mode === 'chat' || mode === 'roast';
  const plain = reply.trim();
  if (!casual || !plain) return { parts: [plain], react: null };
  // A pure reaction: sometimes just an emoji back (still an answer), sometimes the reply.
  if (REACTION_RE.test(userText.trim()) && r < 0.35) {
    return { parts: [REACTION_EMOJI[Math.floor(r * 100) % REACTION_EMOJI.length]], react: null };
  }
  const funny = /(?:lol|lmao|haha|😂|🤣|💀|😭|\bw\b|ur\s+mum|your\s+mom|roast)/i.test(userText);
  const react = funny && r > 0.8 ? (r > 0.9 ? '💀' : '😭') : null;
  // Roasts land as one line; chat sometimes goes out in pieces (about a third of the time when it can be split).
  const parts = mode === 'chat' && r < 0.35 ? splitLikeTexting(plain) : [plain];
  return { parts, react };
}
