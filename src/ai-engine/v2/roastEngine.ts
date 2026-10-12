// The roast engine (2026-10-11, Patrick: "Nexus fuck you" got "at least my mom is..." — "he should've said fuck you
// back motherfucker. Add a genuine roast engine like the football engine. I want the best roast system ever to destroy
// every member").
//
// What it does, per comeback:
//   1. CLASSIFY the hit — a plain swear ("fuck you"), a your-mum joke, an insult about him, a challenge ("roast me"),
//      something someone else said ("patrick called you an asshole"), a weak jab ("L", "ratio"), a threat ("i'll unplug
//      you"), or a concession in a running battle ("ok you win").
//   2. MATCH THE ENERGY — each kind has its own shape and length: "fuck you" gets a 2-8 word mirror ("fuck you too,
//      motherfucker"), a crafted your-mum joke gets a crafted flip, a weak jab gets dismissed in a few words.
//   3. AMMO — what this person said earlier in the chat (callbacks hit hardest), who they are (server people), and
//      the battle so far (round 3 hits harder than round 1).
//   4. BEST OF 3 — the model writes three, the engine scores them (right length for the kind, uses their words, no
//      filler, no copied example, not a repeat of a recent shape) and sends the best.
// roast.ts keeps the move shapes (flip / twist / escalate / dismiss / unbothered) for the crafted kinds.

import { pickRoastMove, roastMoveNote, copiesExample as copiesMoveExample, type RoastMove } from './roast';
import { hitIn, KIND_EXAMPLES, SWEAR_WORDS_RE, AT_LEAST_ANY_RE, STOP_FR_PL, type RoastLang } from './roastLang';

export type HitKind = 'swear' | 'mum' | 'trait' | 'challenge' | 'thirdparty' | 'weak' | 'threat' | 'concede';

const SWEAR_RE = /^(?:(?:no\s+)?(?:fuck|fck|fk|screw)\s+(?:you|u|ya|off|yourself|urself)|f\s*u|fu+|stfu|shut\s+(?:the\s+fuck\s+)?up|go\s+(?:fuck|f\*?ck)\s+(?:yourself|urself|ur\s*self)|piss\s+off|bugger\s+off|eat\s+shit|suck\s+my\s+\w+|kiss\s+my\s+ass|bite\s+me|die|drop\s+dead|bitch|dickhead|asshole|prick|wanker|twat|cunt|loser|idiot|moron|clown|bozo)(?:\s+(?:too|nexus|bro|bruh|bitch|dumbass|asshole|you\s+bitch|motherfucker|mf|lol|lmao|fr|frfr|gng|bot|ai))*[\s!.?💀😭🖕]*$/i;
const MUM_RE = /\b(?:your|ur|yo|you'?re)\s+(?:mom|mum|mother|momma|mama|mommy|dad|father|grandma|granny|family|whole\s+family)\b/i;
const CHALLENGE_RE = /\b(?:roast|cook|destroy|violate|flame|diss)\s+(?:me|him|her|them|this|that|my|@|\w+)|\broast\s+battle\b|\byour\s+turn\b|\bcome\s+at\s+me\b|\bbet\s+you\s+can'?t\b/i;
const THIRDPARTY_RE = /\b(?:called|said|says|thinks|told)\s+(?:you|u|that\s+you|ur)\b|\bbreak\s+up\s+with\b|\b(?:you|u)\s+(?:got|just\s+got)\s+(?:roasted|cooked|ratioed|destroyed|clowned)\b/i;
const WEAK_RE = /^(?:L|ratio|bozo|L\s+bozo|L\s*\+\s*ratio|cry\s+about\s+it|skill\s+issue|cope|seethe|mald|get\s+good|ez|you\s+suck|u\s+suck|no\s+u|ur\s+mom|ur\s+mum|ok\s+boomer|mid|ur\s+mid|you'?re\s+mid|cringe|ur\s+cringe|who\s+asked|didn'?t\s+ask|nobody\s+asked)[\s!.💀😭]*$/i;
const THREAT_RE = /\b(?:i'?(?:ll|m\s+gonna|ma)|imma|ima|i\s+will|gonna)\s+(?:unplug|delete|ban|kick|beat|smack|kill|end|destroy|report|shut\s+(?:you|u)\s+down|replace|uninstall|hack)\b|\b(?:watch|see)\s+what\s+happens\b/i;
const CONCEDE_RE = /^(?:ok(?:ay)?\s+)?(?:you\s+win|u\s+win|i\s+give\s+up|i\s+surrender|fair(?:\s+enough)?|damn+|gg|ggs|i'?m\s+done|im\s+cooked|i\s+got\s+cooked|ok\s+that\s+was\s+good|that\s+was\s+good|lmao+\s+ok|you\s+got\s+me|u\s+got\s+me|alright\s+alright|chill|truce|ok\s+chill)[\s!.💀😭]*$/i;

export function classifyHit(text: string, battleActive = false): HitKind {
  const t = text.trim();
  // English, then French / Polish (roastLang.ts).
  if (battleActive && (CONCEDE_RE.test(t) || hitIn(t, 'concede'))) return 'concede';
  if (SWEAR_RE.test(t) || hitIn(t, 'swear')) return 'swear';
  if (WEAK_RE.test(t) || hitIn(t, 'weak')) return 'weak';
  if (THIRDPARTY_RE.test(t) || hitIn(t, 'thirdparty')) return 'thirdparty';
  if (THREAT_RE.test(t) || hitIn(t, 'threat')) return 'threat';
  if (CHALLENGE_RE.test(t) || hitIn(t, 'challenge')) return 'challenge';
  if (MUM_RE.test(t) || hitIn(t, 'mum')) return 'mum';
  return 'trait';
}

// Each kind's shape: how to answer, the word range, and what the shape looks like (never copied — see copiesExample).
const KINDS: Record<HitKind, { how: string; min: number; max: number; examples?: string[] }> = {
  swear: {
    how: 'They just swore at you. MIRROR IT, harder and faster — no setup, no "at least", no joke structure, just hit back in their own words, nastier.',
    min: 2, max: 9,
    examples: ['"fuck you" → "fuck you too motherfucker 💀"', '"stfu" → "make me, bitch"', '"go fuck yourself" → "already did, ur mum helped"', '"fuck off nexus" → "nah u fuck off, dumbass"'],
  },
  weak: {
    how: 'A lazy one-word jab. Dismiss it in a few words like it barely registered.',
    min: 2, max: 10,
    examples: ['"L" → "ur whole existence is the L"', '"ratio" → "u cant ratio a group chat of 2"', '"who asked" → "ur dad, before he left"', '"no u" → "wow, peak creativity"'],
  },
  thirdparty: {
    how: 'Someone else said something about you. Totally unbothered king: you do not give a single fuck — say so, and flip it back on whoever said it (or on the messenger).',
    min: 3, max: 14,
    examples: ['"patrick called you an asshole" → "i dont give a single fuck fr, tell him to cry harder"', '"he said ur trash" → "and u ran here to tell me? ur his little postman now"', '"you got roasted" → "nobody roasts me, u just felt something for once"'],
  },
  threat: {
    how: "They threatened you. Dare them, you're not scared at all — make the threat sound pathetic.",
    min: 3, max: 14,
    examples: ['"i\'ll unplug you" → "try it, u cant even plug in ur phone charger right"', '"imma ban you" → "u need perms for that, bud"'],
  },
  challenge: {
    how: 'They asked for a roast. Go straight at the target (them, or whoever they named): a specific, brutal, funny picture of them — use the AMMO if there is any.',
    min: 8, max: 26,
  },
  mum: { how: '', min: 6, max: 22 },
  trait: { how: '', min: 5, max: 20 },
  concede: {
    how: 'They just gave up the roast battle. Victory lap: cocky, short, rub it in a little.',
    min: 2, max: 12,
    examples: ['"ok you win" → "ik, i always do 💀"', '"gg" → "gg ez, go cry to ur mum"'],
  },
};

// A line copying 4+ words in a row from any shape example (the swear mirror is allowed: "fuck you too..." is the point).
const KIND_GRAMS = new Set<string>();
const allKindExamples = (kind: HitKind) => [...(KINDS[kind].examples || []), ...(KIND_EXAMPLES.fr[kind] || []), ...(KIND_EXAMPLES.pl[kind] || []), ...(KIND_EXAMPLES.de[kind] || [])];
for (const kind of Object.keys(KINDS) as HitKind[]) {
  // The English swear mirror is the point ("fuck you too..."); the French / Polish / German swear examples are whole
  // lines the model copied word for word ("va chier" → "vas-y toi, ostie de cave"), so they count.
  for (const e of kind === 'swear' ? allKindExamples(kind).slice((KINDS.swear.examples || []).length) : allKindExamples(kind)) {
    const back = (e.split('→')[1] || '').toLowerCase().replace(/['’]/g, '').match(/[\p{L}]+/gu) || [];
    const n = back.length < 6 ? 3 : 4; // short examples ("wow, peak creativity") get copied whole
    for (let i = 0; i + n <= back.length; i++) KIND_GRAMS.add(back.slice(i, i + n).join(' '));
  }
}
export function copiesExample(line: string): boolean {
  if (copiesMoveExample(line)) return true;
  const w = line.toLowerCase().replace(/['’]/g, '').match(/[\p{L}]+/gu) || [];
  for (let i = 0; i + 3 <= w.length; i++) if (KIND_GRAMS.has(w.slice(i, i + 3).join(' ')) || (i + 4 <= w.length && KIND_GRAMS.has(w.slice(i, i + 4).join(' ')))) return true;
  return false;
}

// Running battles per person: round count, last time, recent shapes.
interface Battle { rounds: number; at: number; moves: RoastMove[]; other: number }
const battles = new Map<string, Battle>();
// Patrick: a battle keeps going for 20 minutes after the last roast, and ends after 4 messages that weren't part of it.
const BATTLE_MS = 20 * 60 * 1000;
const BATTLE_END_AFTER_OTHER = 4;
export function battleActive(person: string): boolean {
  const b = battles.get(person);
  return Boolean(b && Date.now() - b.at < BATTLE_MS && (b.other || 0) < BATTLE_END_AFTER_OTHER);
}
// A message from them that wasn't part of the battle (a question, normal chat): 4 of those end it.
export function noteNonRoast(person: string): void {
  const b = battles.get(person);
  if (b) b.other = (b.other || 0) + 1;
}
function bumpBattle(person: string, move?: RoastMove): Battle {
  const old = battles.get(person);
  const b: Battle = old && Date.now() - old.at < BATTLE_MS && (old.other || 0) < BATTLE_END_AFTER_OTHER ? { rounds: old.rounds + 1, at: Date.now(), moves: old.moves, other: 0 } : { rounds: 1, at: Date.now(), moves: [], other: 0 };
  if (move) b.moves = [...b.moves, move].slice(-3);
  battles.set(person, b);
  if (battles.size > 3000) battles.delete(battles.keys().next().value!);
  return b;
}

// Ammo: things this person said earlier (their own messages in the thread), skipping insults aimed at Nexus.
export function ammoFrom(threadText: string): string[] {
  return threadText
    .split('\n')
    .filter((l) => l.startsWith('Them: '))
    .map((l) => l.slice(6).replace(/^\s*nexus[\s,]*/i, '').trim())
    .filter((l) => l.split(/\s+/).length >= 3 && !/\b(?:you|u|ur|your)\b.*\b(?:suck|trash|dumb|stupid|unfunny|fuck)\b/i.test(l))
    .slice(-4);
}

export interface RoastPlan {
  kind: HitKind;
  move: RoastMove | null;
  round: number;
  note: string; // the instruction block for the prompt
  min: number;
  max: number;
}

export function planRoast(person: string, text: string, threadText: string, username?: string, personal?: { summary: string | null; recent: string[] }, lang: RoastLang = 'en'): RoastPlan {
  const active = battleActive(person);
  const kind = classifyHit(text, active);
  const prev = battles.get(person);
  const move = kind === 'mum' || kind === 'trait' ? pickRoastMove(text, prev?.moves || []) : null;
  const b = bumpBattle(person, move || undefined);
  const k = KINDS[kind];
  // Ammo: their last 20 saved messages (personal memory) when there are any, else this chat's thread.
  const saved = (personal?.recent || []).filter((l) => l.split(/\s+/).length >= 3 && l.trim() !== text.trim() && !/\b(?:you|u|ur|your)\b.*\b(?:suck|trash|dumb|stupid|unfunny|fuck)\b/i.test(l)).slice(-6);
  const ammo = kind === 'swear' || kind === 'weak' ? [] : saved.length ? saved : ammoFrom(threadText);
  const parts: string[] = [];
  const examples = lang !== 'en' ? KIND_EXAMPLES[lang][kind] || k.examples : k.examples;
  parts.push(`HIT TYPE: ${kind}. ${move ? roastMoveNote(move, lang) : `${k.how}${examples ? `\nThe SHAPE (never reuse these words):\n${[...examples].sort(() => Math.random() - 0.5).slice(0, 2).map((e) => `- ${e}`).join('\n')}` : ''}`}`);
  parts.push(`LENGTH: ${k.min}-${k.max} words. Match their energy — a two-word insult never gets an essay.`);
  if (lang === 'fr') parts.push('LANGUAGE: Québécois joual, like a Québec teen on Discord — native insults and sacres (cave, tarla, épais, ostie de..., va chier, mange d\'la marde), never a translated English joke, never British slang (bruv, mate, innit).');
  if (lang === 'pl') parts.push('LANGUAGE: natural Polish street slang, like a Polish teen on Discord — native insults (frajer, debil, lamus, cienias, spierdalaj, twoja stara), correct endings and cases, never a translated English joke, never British slang (bruv, mate, innit).');
  if (lang === 'de') parts.push('LANGUAGE: modern German youth slang, like a German teen on Discord — native insults (Lauch, Opfer, Digga, Hurensohn, fick dich, halt die Fresse, deine Mutter), correct grammar and cases, never a translated English joke, never British slang (bruv, mate, innit).');
  if (b.rounds >= 2) parts.push(`This is ROUND ${b.rounds} of a roast battle with them — go harder than last time, maybe call back to something from earlier.`);
  if (ammo.length) parts.push(`AMMO (things they said earlier — a callback to one of these hits hardest): ${ammo.map((a) => `"${a.slice(0, 90)}"`).join(' | ')}`);
  if (username) parts.push(`Their name: ${username}.`);
  if (personal?.summary && kind !== 'swear') parts.push(`WHAT YOU KNOW ABOUT THEM (from their past chats with you — use it to make it personal, never generic):\n${personal.summary}`);
  return { kind, move, round: b.rounds, note: parts.join('\n'), min: k.min, max: k.max };
}

// ── scoring the 3 candidates ──
// The last comebacks sent (to anyone), so the same jokes don't come back across the server.
const recentComebacks: string[] = [];
export function rememberComeback(line: string): void {
  recentComebacks.push(line);
  if (recentComebacks.length > 20) recentComebacks.shift();
}
const FILLER_RE = /\b(?:entire\s+(?:life|existence|being)|life\s+story|existence|search\s+history|browser\s+history|more\s+personality\s+than|is\s+that\s+the\s+best|nah\s+mate|that\s+sounds|im\s+sorry|wanna\s+talk|hope\s+(?:ur|your)\s+day)\b/i;
const AT_LEAST_RE = AT_LEAST_ANY_RE;
const STOP = new Set('the a an and or to of in on at is are was were be you your ur u youre im i me my it its this that so such just like with for from as but not no yes yeah nah bro bruh nexus she he her his they them their have has had do does did can could would should will what who how why when where'.split(' '));
const words = (t: string) => (t.toLowerCase().match(/[\p{L}\p{N}'’]{3,}/gu) || []).filter((w) => !STOP.has(w) && !STOP_FR_PL.has(w));

export function scoreComeback(line: string, theirs: string, plan: Pick<RoastPlan, 'kind' | 'min' | 'max'>, ammo: string[] = []): number {
  const n = line.split(/\s+/).filter(Boolean).length;
  let score = 0;
  // length fits the kind
  if (n < plan.min) score -= (plan.min - n) * 0.7;
  if (n > plan.max) score -= (n - plan.max) * 0.6;
  // uses their words (a real flip) or a callback to their earlier messages
  const topic = new Set(words(theirs));
  score += words(line).filter((w) => topic.has(w)).length * (plan.kind === 'swear' ? 1 : 2);
  const ammoWords = new Set(ammo.flatMap(words));
  if (ammoWords.size) score += Math.min(3, words(line).filter((w) => ammoWords.has(w)).length * 1.5);
  // filler, copied examples, the "at least my mum" crutch
  if (FILLER_RE.test(line)) score -= 5;
  if (copiesExample(line)) score -= 6;
  if (AT_LEAST_RE.test(line) || /\b(?:but\s+at\s+least|mais\s+au\s+moins|ale\s+przynajmniej)\b/i.test(line)) score -= 6; // Patrick hates the "at least my mum..." crutch
  // a swear gets a swear back — the same one thrown back ("fuck you" → "fuck you too...") is the best
  if (plan.kind === 'swear' && SWEAR_WORDS_RE.test(line)) score += 3;
  // French / Polish mirror: their swear word thrown back ("va chier" → "va chier toi-même", "spierdalaj" → "sam spierdalaj").
  if (plan.kind === 'swear') {
    const theirs1 = theirs.toLowerCase().match(new RegExp(SWEAR_WORDS_RE.source, 'giu')) || [];
    if (theirs1.some((w) => !/^fuck/.test(w) && line.toLowerCase().includes(w))) score += 4;
  }
  if (plan.kind === 'swear') {
    const theirSwear = theirs.toLowerCase().match(/\b(?:fuck\s+(?:you|u|off|yourself)|stfu|shut\s+up|screw\s+you|piss\s+off|bitch|go\s+fuck)\b/);
    if (theirSwear && line.toLowerCase().includes(theirSwear[0].split(/\s+/)[0]) && line.toLowerCase().includes(theirSwear[0].split(/\s+/).slice(-1)[0])) score += 4;
    // "hello asshole" → "hello dickhead": the same greeting back with an insult of their own is the mirror.
    const greet = theirs.toLowerCase().match(/^(hello|hi|hey|heya|yo|sup|wsg|wsp|gm|good\s+morning|morning|evening|bye|gn|thanks|ty)\b/);
    if (greet && line.toLowerCase().startsWith(greet[1]) && /\b(?:asshole|arsehole|dickhead|prick|bitch|dumbass|twat|wanker|muppet|bellend|loser|clown|motherfucker|shithead|idiot)\b/i.test(line)) score += 4;
  }
  if (plan.kind === 'thirdparty' && /\b(?:give\s+a\s+(?:single\s+)?(?:fuck|shit)|don'?t\s+care|couldn'?t\s+care|unbothered|cry)\b/i.test(line)) score += 3;
  // the same distinctive words as recent comebacks (to anyone) — the model leans on wifi / dial-up / hairline
  const recentWords = new Set(recentComebacks.flatMap((c) => words(c).filter((w) => w.length >= 4)));
  score -= Math.min(4, words(line).filter((w) => w.length >= 4 && recentWords.has(w)).length * 1.2);
  if (/\b(?:fuck\w*|shit\w*|dumbass|prick|muppet|bellend|wasteman|mug)\b/i.test(line)) score += 0.5;
  return score;
}

export function pickComeback(raw: string, theirs: string, plan: Pick<RoastPlan, 'kind' | 'min' | 'max'>, ammo: string[] = []): string {
  const lines = raw
    .split(/\n+/)
    .map((l) => l.replace(/^\s*(?:\d+[.)]|[-*•]|comeback\s*\d*:?)\s*/i, '').replace(/^["“]|["”]$/g, '').trim())
    .filter((l) => l.length >= 2 && !/^(?:here|okay|sure|comebacks?)\b/i.test(l));
  if (lines.length <= 1) {
    rememberComeback(lines[0] || raw.trim());
    return lines[0] || raw.trim();
  }
  const best = lines
    .map((l, i) => ({ l, s: scoreComeback(l, theirs, plan, ammo) + Math.random() * 0.4 - i * 0.01 }))
    .sort((a, b) => b.s - a.s)[0].l;
  rememberComeback(best);
  return best;
}
