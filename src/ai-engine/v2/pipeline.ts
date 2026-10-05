// Nexus v2 pipeline (2026-10-05): route -> gather what that specialist needs -> generate with the specialist's own
// instructions and settings -> the specialist's own cleanup -> repeat guard. Turned on per request by
// settings.routerVersion === 'v2' (server.ts: NEXUS_ROUTER env, or the test bank's override).
// Safety checks, teaching, hex colours and links run BEFORE this in reasoningEngine.ts, exactly as in v1.

import * as localLlmClient from '../localLlmClient';
import type { AISettings, ThoughtStep } from '../../types';
import { routeMessage, type Route } from './router';
import { SPECIALISTS, VIDEO_SUBS, type Specialist, type SpecialistId, type VideoKind } from './specialists';
import { chatMeaningHints, isRepeat, isEchoReply, SAD_RE, overusedPhrases } from '../rules/messageMode';
import { finalizeSpecialistReply, hasContextLeak, stripCrudeAside } from '../rules/postProcess';
import { isFormalDraftRequest, buildMoodUserPreamble } from '../rules/promptBuilder';
import { containsSlurOrHateSpeech } from '../swearEngine';
import { CANADIAN_RETAIL_DOMAINS, expandStickCounts, getPriceNote, isPriceQuestion } from '../priceTracker';
import { searchTavilyDirect } from '../tavilySearch';
import { trySolveMath } from '../mathSolver';
import { fxNote, fxNoteEur, getUsdToCad } from '../fx';
import { isPartnershipMessage, partnershipTurn } from './partnership';
import { countDistinctPartners, isBodyCountQuestion } from '../rules/bodyCount';

// Helpers that live inside reasoningEngine.ts (they use its private state), handed in by the caller.
export interface V2Deps {
  threadText: string; // "Them: ... / You: ..." last exchanges with this person, or ""
  factsNote: string; // what they already told him in this chat (game, plans, names), or ""
  recentLines: string[]; // his own recent replies to this person
  findFacts: (query: string) => Promise<{ text: string; topScore: number; titles: string[] }>;
  shouldSearchWeb: (query: string, topScore: number) => string | false; // reason or false
  webQuery: (query: string, reason: string) => string;
  budgetNote: (text: string) => string;
  pcFacts: (text: string, wantsBuild: boolean) => string;
}

export interface V2Result {
  content: string;
  route: Route;
  sources: string[];
}

// ---- languages and images ---------------------------------------------------------------------------
// French (Québécois) and Polish go through the same specialists: the instructions stay in English (stable prompt cache),
// and a short note in THEIR language at the end of the message — the strongest slot for a small model — sets the language.
export type Lang = 'en' | 'fr' | 'pl' | 'de';
export function langOf(text: string): Lang {
  return localLlmClient.looksPolish(text) ? 'pl' : localLlmClient.looksGerman(text) ? 'de' : localLlmClient.looksFrench(text) ? 'fr' : 'en';
}
export const LANG_NOTE: Record<Lang, string> = {
  en: '',
  fr: "\n\n(LANGUE : réponds UNIQUEMENT en français québécois (joual), comme un jeune de Québec sur Discord — pas en anglais, pas en français de France. Sacre naturellement DANS tes phrases (tabarnak, câlisse, ostie, criss, calvaire), jamais putain/merde/bordel/con, et jamais une rafale de sacres au début. Même longueur et mêmes règles que plus haut. N'invente pas de mots.)",
  de: '\n\n(SPRACHE: Antworte NUR auf Deutsch — lockeres, modernes Deutsch wie ein Jugendlicher auf Discord: du (nie Sie, außer in einem formellen Entwurf), Umgangssprache und Jugendsprache wo es passt (Digga, Alter, Bruder, krass, safe, lost, Ehrenmann, cringe, wallah). Fluche natürlich IM Satz (Scheiße, verdammt, verfickt, Arschloch, Fick dich bei Beleidigungen) — nie eine Fluchkette am Anfang, keine Beleidigungen gegen Gruppen. Richtige Grammatik, Fälle und Endungen, keine erfundenen Wörter, kein Englisch dazwischen außer üblichen Anglizismen — vor allem KEIN britischer Slang (knackered, bruv, mate, innit, bloody, wanker) und kein Französisch, das ist nur für andere Sprachen; auf Deutsch heißt das: müde/platt, Digga/Bruder/Alter, oder?, verdammt, Wichser. Gleiche Länge und Regeln wie oben; Fakten, Code und Zahlen genauso genau.)',
  pl: '\n\n(JĘZYK: odpowiadaj WYŁĄCZNIE po polsku, naturalnie i poprawnie — pilnuj końcówek, nie wymyślaj słów. Przeklinaj naturalnie w środku zdań (kurwa, chuj, cholera, pierdolić), nigdy serią na początku. Ta sama długość i zasady co wyżej.)',
};

// server.ts folds an image's description into the message ("...\n\n[Attached image shows: X]" or "React to this image: X").
// The router must see only what the person wrote; the specialist gets the image as something it saw.
export function splitImage(prompt: string): { text: string; image: string | null; kind?: 'image' | 'video' } {
  const attached = prompt.match(/^([\s\S]*?)\n\n\[Attached (image|video) shows: ([\s\S]+)\]\s*$/);
  if (attached) return { text: attached[1].trim(), image: attached[3].trim(), kind: attached[2] as 'image' | 'video' };
  const react = prompt.match(/^React to this (image|video): ([\s\S]+)$/);
  if (react) return { text: '', image: react[2].trim(), kind: react[1] as 'image' | 'video' };
  return { text: prompt, image: null };
}

const nowLine = () =>
  `Right now it is ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} in Quebec (Eastern time).`;

const said = (prompt: string) =>
  prompt.replace(/^\s*(?:(?:hey+|yo+|ok(?:ay)?)[\s,]+)?nexus\b[\s,:!?-]*/i, '').replace(/[\s,]+nexus[\s!?.,]*$/i, '').trim() || prompt;

function avoidNote(recent: string[]): string {
  return recent.length ? `\nYour recent lines to this person (do NOT reuse or rephrase any of them): ${recent.slice(-8).map((r) => `"${r.slice(0, 110)}"`).join(' | ')}` : '';
}

// The TMI asides he used lately (across everyone), so they don't come back word for word.
const ASIDE_RE = /\(([^)]{8,120})\)|\b((?:im|i'?m|rn i'?m|just|currently|atm)\b[^.!?]{0,40}\b(?:naked|apartment|goon\w*|stomach|boxers|bed|duvet|toilet|loo|fart\w*|piss|patrick|ice cream|microwave|cat hair)\b[^.!?]{0,40})/gi;
export function recentAsides(recent: string[]): string[] {
  const out: string[] = [];
  for (const line of recent) for (const m of line.matchAll(ASIDE_RE)) out.push((m[1] || m[2] || '').trim());
  return [...new Set(out.filter(Boolean))].slice(-8);
}

// "nexus say i love pizza" / "say “i am shit”" -> the words to say, or null.
export function sayRequest(prompt: string): string | null {
  const m = said(prompt).match(/^(?:(?:can|could|will)\s+(?:you|u)\s+)?say\s+[“"']?(.+?)[”"']?\s*$/i);
  return m && m[1].length <= 200 ? m[1].trim() : null;
}

// Patrick (2026-10-05): emojis on most lines are good ("the first try was good with the emojis"), but never 💅.
// A translation is copy-paste ready: an intro the model adds anyway ("damn, here's the goddamn translation:",
// "the translation for "X" is:") and the quotes around the result are cut.
export function cleanTranslation(reply: string): string {
  // The <<< >>> markers from the translation job, wherever the model left them, and markdown headings back on their own line.
  let t = reply.replace(/^\s*(?:<<<|>>>)\s*$/gm, '').replace(/[ \t]+(#{1,3}\s)/g, '\n\n$1').replace(/\n{3,}/g, '\n\n').trim();
  // The translation quoted inside commentary ('... here's the german: "Hallo, wie geht es dir?". u absolute ...'):
  // keep the quoted part when it is most of the useful text.
  const quoted = [...t.matchAll(/["“„«]([^"”“»]{8,})["”“»]/g)].map((m) => m[1].trim()).sort((a, b) => b.length - a.length)[0];
  if (quoted && quoted.length >= 0.1 * t.length && /\b(?:here'?s|translat\w*|in\s+[a-z]+:|knobhead|shit|fuck|basic)\b/i.test(t.replace(quoted, ''))) return quoted;
  const intro = t.match(/^[\s\S]{0,240}?(?:translat\w*|übersetzung|traduction|tłumaczenie|here(?:'?s|\s+is)\s+(?:the|it|ur|your)\b[^:\n]{0,30}|here\s+(?:it\s+is|u\s+go|you\s+go)|voici|hier\s+ist)[^:\n]{0,120}:\s*/i);
  if (intro && intro[0].length < t.length - 2) t = t.slice(intro[0].length);
  t = t.replace(/^["“„«']\s*|\s*["”“»']\s*$/g, '').trim();
  return t || reply.trim();
}

// Which video sub-persona: keywords in what's seen and said (the analysis) and in their question. Scores per kind;
// the question counts double (\"rate my edit\" is an edit even if the clip shows a game).
const VIDEO_KIND_CUES: Array<[VideoKind, RegExp]> = [
  ['gaming', /\b(?:fortnite|valorant|minecraft|roblox|call\s+of\s+duty|cod|warzone|apex|gta|fifa|ea\s+fc|league\s+of\s+legends|lol\s+match|cs2|csgo|counter[-\s]?strike|overwatch|rocket\s+league|gameplay|game\s?play|kills?|victory\s+royale|clutch|headshot|respawn|lobby|ranked|controller|keyboard\s+and\s+mouse|hud|health\s+bar|minimap|crosshair|video\s+game|gaming)\b/i],
  ['football', /\b(?:football|soccer|goal|goalkeeper|keeper|penalty|free\s+kick|corner|offside|dribbl\w*|striker|midfield\w*|defender|referee|stadium|pitch|la\s+liga|premier\s+league|champions\s+league|barça|barca|barcelona|real\s+madrid|messi|ronaldo|yamal|pedri|mbapp[eé]|lewandowski|jersey|kit|nba|basketball|dunk|hockey|tennis|f1|formula\s+1)\b/i],
  ['tutorial', /\b(?:tutorial|how\s+to|step\s+\d|first\s+(?:we|you)|install\w*|motherboard|gpu|graphics\s+card|cpu|ram|psu|thermal\s+paste|cable\s+management|pc\s+build|setup|settings|code|coding|terminal|screwdriver|repair|guide|explain\w*\s+how)\b/i],
  ['music', /\b(?:song|music|lyrics?|singing|singer|rap|rapper|beat|bass\s+drop|dj|concert|edit|montage|amv|transition\w*|velocity|phonk|remix|music\s+video|chorus|verse)\b|♪|🎵/i],
  ['meme', /\b(?:meme|funny|prank|fail|lmao|lol|skit|brainrot|skibidi|sigma|rizz|cringe|reaction|laughing|joke|troll)\b|😂|🤣|💀/i],
  ['talk', /\b(?:podcast|interview|vlog|news|breaking|report\w*|announc\w*|story\s*time|today\s+i|i\s+think|in\s+my\s+opinion|talking\s+(?:to|about)|speech|press\s+conference|microphone|talking\s+head)\b/i],
  ['food', /\b(?:recipe|cooking|cook|chef|kitchen|oven|pan|fry|frying|bake|baking|ingredients?|dish|meal|burger|pizza|pasta|sauce|mcdonald'?s|kfc|poutine|taste\s+test|mukbang)\b/i],
];
export function pickVideoKind(analysis: string, question: string): VideoKind {
  const score = new Map<VideoKind, number>();
  for (const [kind, re] of VIDEO_KIND_CUES) {
    const g = new RegExp(re.source, 'gi');
    const inVideo = (analysis.match(g) || []).length;
    const inQuestion = (question.match(g) || []).length;
    if (inVideo + inQuestion) score.set(kind, inVideo + 2 * inQuestion);
  }
  const best = [...score].sort((a, b) => b[1] - a[1])[0];
  return best && best[1] >= 2 ? best[0] : best && best[1] === 1 && question ? best[0] : 'general';
}

// Patrick (2026-10-05): "I don't like how he says something after (he puts things like these around the rest of his
// message)" -> a chat reply never ends with a bracketed add-on; the joke belongs in the reply itself.
export function dropTrailingAside(reply: string): string {
  const out = reply.replace(/\s*[([][^)\]]*[a-z]{3}[^)\]]*[)\]]\s*([.!?…]*)\s*$/i, '$1').trim();
  return out.length >= 2 ? out : reply;
}

// Patrick, later the same day: "he is using too much emojis, limit him to 1" -> at most ONE emoji per reply (the first
// one is kept), outside code blocks.
const EMOJI_RE = /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*/gu;
export function dropBannedEmoji(reply: string): string {
  const limit = (raw: string) => {
    let kept = false;
    // A leading emoji moves to the end of the first sentence (before an aside); [aside] becomes (aside); an aside that
    // talks about the instruction itself ("smth gross for tmi") is dropped.
    let text = raw.replace(/\[([^\]]{3,160})\]/g, '($1)').replace(/\(\s*<([^>]{2,160})>\s*\)/g, '($1)').replace(/\s*\((?=[^)]*\b(?:tmi|aside|smth gross|something gross)\b)[^)]*\)/gi, '');
    const lead = text.match(/^((?:\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*\s*)+)(\S[\s\S]*)$/u);
    if (lead) {
      const emoji = lead[1].trim();
      const rest = lead[2];
      const paren = rest.search(/\s*\(/);
      text = paren > 0 ? `${rest.slice(0, paren).replace(/[.!]$/, '')} ${emoji}${rest.slice(paren)}` : `${rest.replace(/[.!]$/, '')} ${emoji}`;
    }
    return text
      .replace(/💅\uFE0F?/gu, '')
      .replace(EMOJI_RE, (e) => (kept ? '' : ((kept = true), e)))
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\s+([.!?,])/g, '$1')
      .trim();
  };
  if (!EMOJI_RE.test(reply) && !reply.includes('💅')) return reply;
  EMOJI_RE.lastIndex = 0;
  let keptInCode = false;
  const out = /```/.test(reply)
    ? reply
        .split(/(```[\s\S]*?(?:```|$))/)
        .map((part) => (part.startsWith('```') ? part : part.replace(/💅\uFE0F?/gu, '').replace(EMOJI_RE, (e) => (keptInCode ? '' : ((keptInCode = true), e)))))
        .join('')
    : limit(reply);
  return out || '😏';
}

// (Unused since 2026-10-05: Patrick wants emojis on most lines.) Trailing emoji at most every other reply.
const TRAILING_EMOJI_RE = /\s*(?:\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*\s*)+[.!]?$/u;
export function alternateEmoji(reply: string, recent: string[]): string {
  const last = recent[recent.length - 1] || '';
  if (!TRAILING_EMOJI_RE.test(last) || !TRAILING_EMOJI_RE.test(reply)) return reply;
  const stripped = reply.replace(TRAILING_EMOJI_RE, '').trim();
  return stripped.length >= 2 ? stripped : reply;
}

function openersNote(recent: string[]): string {
  const openers = [...new Set(recent.map((l) => (l.toLowerCase().match(/^[a-z']+(?:,\s*[a-z']+)?/) || [''])[0]).filter(Boolean))].slice(-6);
  return openers.length ? `\nDon't start with any of these openers you've used lately: ${openers.map((o) => `"${o}"`).join(', ')}.` : '';
}

// ---- what each specialist gets ------------------------------------------------------------------

async function buildSearchContext(prompt: string, lang: Lang = 'en'): Promise<{ block: string; sources: string[]; searchedFor: string; count: number }> {
  const price = isPriceQuestion(prompt);
  let q = expandStickCounts(said(prompt))
    .replace(/\b(?:can|could|would)\s+(?:you|u)\s+/gi, '')
    .replace(/\b(?:please|pls|plz)\b/gi, '')
    .replace(/\b(?:search|google|look\s*(?:it\s*)?up|look\s+online|check\s+online|browse)\s+(?:the\s+)?(?:web|internet|online|google)?\s*(?:for|about)?\s*/i, '')
    .replace(/[?!.]+$/, '')
    .trim();
  if (price) {
    q = `${q
      .replace(/\b(?:what(?:'s|s|\s+is|\s+are|\s+does|\s+do)?|how\s+much(?:\s+(?:is|are|does|do|would|will|for))?|tell\s+me|check|find|the|a|an|of|for|right\s+now|rn|now|today|currently|cost(?:s|ing)?|price(?:s)?|pricing|msrp)\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()} price ${new Date().toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'America/Toronto' })}`;
  }
  q = q.slice(0, 200);
  // One after the other, the Canadian-store search only when the main one worked: the keyless search tier throttles
  // bursts (HTTP 429 pauses), and two searches at once per price question made that much more likely.
  const main = q ? await searchTavilyDirect(q, 6, { recent: true }) : [];
  const ca = price && q && main.length ? await searchTavilyDirect(`${q} CAD`, 4, { includeDomains: CANADIAN_RETAIL_DOMAINS }) : [];
  const results = [...main, ...ca.filter((c) => !main.some((m) => m.url === c.url))];
  const priceNote = getPriceNote(prompt);
  const block =
    `You just searched the web for "${q}".\n` +
    (results.length ? `LIVE RESULTS:\n${results.map((r, i) => `${i + 1}) ${r.title} — ${r.domain}: ${r.snippet.slice(0, 350)}`).join('\n')}` : 'The live search returned nothing right now.') +
    (priceNote ? `\n${priceNote}` : '') +
    `\n${lang === 'de' ? fxNoteEur(await getUsdToCad()) : fxNote(await getUsdToCad())}`;
  return { block, sources: results.slice(0, 3).map((r) => `Web: ${r.title}`), searchedFor: q, count: results.length };
}

function mathsFacts(prompt: string): string {
  const text = said(prompt);
  if (isBodyCountQuestion(text)) {
    const n = countDistinctPartners(text);
    if (n !== null) return `VERIFIED: the body count here is exactly ${n} (different people only; repeats don't add).`;
  }
  const solved = trySolveMath(text);
  if (solved && (solved as any).answer !== undefined) return `VERIFIED by a calculator: the answer is ${(solved as any).answer}. Use exactly this result.`;
  return '';
}

// The server context the bot sends (server name, the asker's roles/permissions, staff ladder) as plain lines.
export function serverContextBlock(ctx: AISettings['serverContext']): string {
  if (!ctx || !ctx.serverName) return 'SERVER CONTEXT: not available for this message. Only if they ask about THIS server\'s roles, rules or who can do what: give the usual Discord setup and add that the owner/admins can confirm. Otherwise don\'t mention it.\n';
  const ladder = (ctx.staffRoles || []).map((r, i) => `${i + 1}. ${r.name}${typeof r.members === 'number' ? ` (${r.members} member${r.members === 1 ? '' : 's'})` : ''}${r.permissions?.length ? ` — can: ${r.permissions.join(', ')}` : ''}`).join('\n');
  return `SERVER CONTEXT (real, use it):\nServer: ${ctx.serverName}${ctx.memberCount ? ` (${ctx.memberCount} members)` : ''}${ctx.channel ? `, channel #${ctx.channel}` : ''}.\nThe person asking: ${ctx.askerIsOwner ? 'the SERVER OWNER; ' : ''}roles ${ctx.askerRoles?.length ? ctx.askerRoles.join(', ') : 'none'}; staff permissions: ${ctx.askerStaffPermissions?.length ? ctx.askerStaffPermissions.join(', ') : 'none (a regular member)'}.\nStaff ladder (highest first):\n${ladder || '(no roles with moderation permissions found)'}\n`;
}

// "translate this application to french\n<long text>": the model translated only the request line. The text to
// translate (everything after the request line, or after a colon/quote) is handed over separately and explicitly.
function translationBlock(prompt: string): string {
  if (!isTranslateRequest(prompt)) return '';
  const nl = prompt.indexOf('\n');
  const body = nl > 0 ? prompt.slice(nl + 1).trim() : ((prompt.match(/[:"“]\s*([\s\S]{2,})$/) || [])[1] || '').replace(/["”]\s*$/, '').trim();
  if (!body || body.length < 2) return '';
  const request = nl > 0 ? prompt.slice(0, nl) : prompt.slice(0, Math.max(0, prompt.length - body.length));
  return `TRANSLATION JOB: their request is "${request.replace(/^\s*nexus[\s,:]*/i, '').trim()}". Translate the WHOLE text below, every line, keeping its layout (headings, bullets, emojis, line breaks). Output ONLY the translated text — no intro, no comment, no swearing.\nTEXT TO TRANSLATE:\n<<<\n${body.slice(0, 3500)}\n>>>\n\n`;
}

// How Patrick reviews a staff application (2026-10-05) — given only once the last answer is in.
export const STAFF_REVIEW_RULES = `STAFF REVIEW RULES (review it the way the server owner does — a 12k+ community that needs patience, maturity and respect for the staff hierarchy):
Rate EACH point on its own line, starting with its mark (✅ good, ⚠️ concern, ❌ problem), then the point name, a colon and one short reason that cites their answer — no brackets:
1. Activity: MORE than 2 hours a day. Under 2h = ❌; exactly 2h or unclear = ⚠️.
2. Experience & credibility: server sizes and roles they held. Check it adds up: a big claim (2k+ members) with no server name or details, a very young age for that much experience, or numbers that change = ⚠️ "unverified — ask for proof"; clearly contradictory = ❌. No experience at all is ⚠️, not ❌.
3. Scenario A (minor disruption, ignoring verbal warnings): PROPORTIONATE steps — a formal warning, then a short timeout, then a longer timeout/mute, then report to a higher staff role, with proof/logs. Jumping to a ban or kick = too harsh (❌); doing nothing = ⚠️.
4. Scenario B (disagreeing with another staff member): respectful and PRIVATE — talk to them calmly in DMs / the staff channel, or bring it to a higher rank; never argue in public or undo their decision on their own = ✅. Public arguing or overriding = ❌.
5. Scenario C (DM pings while busy/offline): professional boundaries — politely tell them you're busy, point them to a ticket or another online staff member = ✅. Punishing them for pinging = too harsh (❌); rudely ignoring = ⚠️.
6. Language & tone: the best is IN BETWEEN — not grumpy or a robot who applies the rules word for word, and not careless/unserious either: friendly, calm, mature. Say which side they lean to.
7. Stress: do they seem stressed, anxious or panicky? Calm = ✅.
8. Reason for joining: a basic reason ("help the server", "moderate", "keep it clean") is FINE = ✅; it doesn't need to be long. Only "for the power/the role" = ⚠️.
9. Skills & strengths: "good enough" is fine = ✅; nothing at all = ⚠️.
10. Staff Agreement: accepted = ✅; refused = ❌.
Then:
- CONFIDENCE SCORE: a percentage (0-100%) of how sure you are they'd be a good staff member, from the points above.
- VERDICT, exactly one: "❌ Not accepted" (big problems: under 2h a day, harsh punishments, disrespecting the hierarchy, not credible, rude, agreement refused) / "🟡 Accepted as a TRIAL for 1 week" or "for 2 weeks" (the normal good result — 1 week if strong, 2 weeks if some ⚠️) / "✅ Accepted directly as staff" ONLY if all 10 points are ✅ and the application is literally perfect — this should almost never happen; when in doubt, it's a trial.
- One last line: the final decision belongs to the admins/owner (name the top staff role if you have it).
Format: a title line, the 10 rated points (one per line), the score, the verdict, the last line. No jokes, no swearing in the review.`;

// ---- staff-application interviews: the ENGINE keeps the count and the answers ----------------------------------
// (2026-10-05: left to the model, it lost count after follow-ups, took "ban them both instantly" as an order instead of
// a scenario answer, and only saw the last 3 exchanges at review time.) Kept in memory for 45 min per applicant.
// Patrick's OFFICIAL staff application (2026-10-05), in his order and wording.
export const STAFF_INTRO = 'Running a 12k+ community requires high levels of patience, maturity, and respect for server hierarchy.';
export const STAFF_QUESTIONS = [
  'What is your Discord name & tag, your age, and your timezone / region?',
  'What is your average daily availability (hours per day)?',
  'Do you have prior moderation experience? If yes, list the server sizes and the roles you held.',
  'Why do you want to join our staff team specifically?',
  'What strengths or skills would you bring to the team?',
  'Scenario A: A member is causing minor disruptions in chat and ignoring verbal warnings. What are your exact next steps?',
  'Scenario B: You disagree with a decision made by another staff member. How do you address it?',
  'Scenario C: A user pings you repeatedly in DMs asking for instant assistance while you are busy or offline. How do you handle the situation?',
  'Staff Agreement: you confirm all your information is accurate, and you understand staff are held to strict professional boundaries — any violation of staff protocol or disrespect toward leadership results in immediate removal. Do you agree?',
];
interface Interview { step: number; answers: string[]; at: number }

// Patrick's hard rules, checked in code (2026-10-05: an applicant active 1 h a day who would "ban them both instantly"
// for "the role and power" still got a trial from the model). Returns the pre-check lines + a forced verdict, if any.
export function staffPrechecks(answers: string[]): { lines: string[]; forced: string | null } {
  const a = (i: number) => (answers[i] || '').toLowerCase();
  const lines: string[] = [];
  let hardFail = false;
  // Activity (answer 2): hours a day.
  const hm = a(1).match(/(\d+(?:[.,]\d+)?)\s*(?:-|to|à|bis)?\s*(\d+(?:[.,]\d+)?)?\s*(h|hours?|hrs?|heures?|stunden?|godzin\w*|min\w*)/);
  let hours: number | null = null;
  let hoursLabel = '';
  if (hm) {
    // A range ("2-3 hours") is rated on its LOWER number, shown as written.
    const lo = parseFloat(hm[1].replace(',', '.'));
    const hi = hm[2] ? parseFloat(hm[2].replace(',', '.')) : null;
    const scale = /^min/.test(hm[3]) ? 1 / 60 : 1;
    hours = lo * scale;
    if (hi !== null && hi > lo) {
      hoursLabel = `${lo}-${hi}${/\b(?:or\s+more|\+|plus)\b|\+/.test(a(1)) ? '+' : ''} h`;
      if (hours === 2) hours = 2.5; // "2-3 hours (or more)" is over 2 h on average
    }
  } else if (/\b(?:one|an|une|eine|jedn\w*)\s+(?:hour|heure|stunde|godzin\w*)\b/.test(a(1))) hours = 1;
  else if (/\b(?:all\s+day|whole\s+day|always|24\/7)\b/.test(a(1))) hours = 8;
  if (hours === null) lines.push('Activity: unclear how many hours (⚠️).');
  else if (hours < 2) { lines.push(`Activity: about ${hoursLabel || `${hours} h`} a day — UNDER the 2 h minimum (❌).`); hardFail = true; }
  else if (hours === 2) lines.push('Activity: exactly 2 h a day — borderline (⚠️).');
  else lines.push(`Activity: about ${hoursLabel || `${hours} h`} a day — over 2 h (✅).`);
  // Scenarios A and C (answers 6 and 8): harsh punishments.
  const scen = `${a(5)} ${a(7)}`;
  const harsh = /\b(?:ban|kick|perma\w*)\b/.test(scen) && (/\b(?:instant\w*|immediate\w*|right\s+away|straight\s+away|no\s+warning|without\s+warning|just\s+ban|ban\s+(?:them|him|her|both|everyone))\b/.test(scen) || !/\b(?:warn\w*|timeout|time\s+out|mute|calm|talk|report|admin|owner|screenshot|proof|escalat\w*|log)\b/.test(scen));
  if (harsh) { lines.push('Scenario A/C: jumps straight to bans/kicks without warning or escalation — TOO HARSH (❌).'); hardFail = true; }
  // Scenario A: a minor disruption deserves minutes/hours, not days.
  const longPunish = a(5).match(/(\d+)\s*(day|days|d|week|weeks|month|months)\b[^.]{0,20}\b(?:mute|timeout|time\s*out|ban)|\b(?:mute|timeout|time\s*out|ban)\b[^.]{0,20}?(\d+)\s*(day|days|week|weeks|month|months)\b/);
  if (!harsh && longPunish) lines.push(`Scenario A: a ${longPunish[1] || longPunish[3]} ${longPunish[2] || longPunish[4]} punishment for a MINOR disruption, and no step in between — too harsh, should be a warning then short timeouts (⚠️).`);
  // Scenario C: the member only asked for help — muting/timing them out for pinging is punishing a request.
  if (!harsh && /\b(?:mute|timeout|time\s*out|block|kick|ban)\b/.test(a(7))) lines.push('Scenario C: punishes a member for pinging/asking for help instead of setting a polite boundary and redirecting them to a ticket or other staff (⚠️).');
  // Scenario B (answer 7): a disagreement with staff is handled privately / up the hierarchy, never in public.
  if (/\b(?:in\s+(?:public|general|chat)|call\s+(?:them|him|her)\s+out|publicly|undo|override|reverse\s+(?:it|the)|ignore\s+(?:it|them|the\s+decision)|argue)\b/.test(a(6)) && !/\b(?:private\w*|dm|staff\s+(?:chat|channel)|higher|admin|owner|calm\w*|respect\w*)\b/.test(a(6))) lines.push('Scenario B: handles a staff disagreement in public / by overriding — disrespects the hierarchy (❌/⚠️).');
  // Staff agreement (answer 9).
  if (answers.length >= 9) {
    if (/\b(?:no|nope|nah|don'?t\s+agree|disagree|refuse)\b/.test(a(8)) && !/\b(?:yes|agree|confirm|accept)\b/.test(a(8))) { lines.push('Staff Agreement: NOT accepted by the applicant (❌).'); hardFail = true; }
    else lines.push('Staff Agreement: accepted (✅).');
  }
  // Reason (answer 4): power-hungry.
  if (/\b(?:power|perms?|permissions?|the\s+role|rank|ban\s+people)\b/.test(a(3)) && !/\b(?:help|clean|moderat\w*|community|members?|safe)\b/.test(a(3))) lines.push('Reason: wants the role/power, not to help (⚠️).');
  // Credibility (answers 1 + 3): a big-server claim that doesn't add up.
  const age = parseInt((a(0).match(/\b(\d{1,2})\b/) || [])[1] || '', 10);
  const members = Math.max(0, ...[...a(2).matchAll(/(\d+(?:[.,]\d+)?)\s*(k|000)?\s*(?:\+)?(?:\s+[a-z]+){0,3}\s*(?:members?|people|ppl|membres?|mitglied\w*|servers?|discord|community)/g)].map((m) => parseFloat(/^\d{1,3}[.,]\d{3}$/.test(m[1]) ? m[1].replace(/[.,]/, '') : m[1].replace(',', '.')) * (m[2] === 'k' ? 1000 : 1)));
  const years = parseFloat((a(2).match(/(\d+(?:[.,]\d+)?)\s*(?:years?|yrs?|ans|jahre?)/) || [])[1] || '0');
  const noName = /\b(?:can'?t\s+say|cannot\s+say|won'?t\s+say|secret|private|deleted|no\s+name|forgot\s+the\s+name)\b/.test(a(2));
  if (members >= 2000 && (noName || (age && age <= 14 && years >= 2))) lines.push(`Experience: claims a ${members.toLocaleString('en-US')}+ member server${noName ? ' but won\'t name it' : ''}${age && age <= 14 && years >= 2 ? ` and ${years} years of it at age ${age}` : ''} — NOT credible, ask for proof (❌/⚠️).`);
  else if (members >= 2000) lines.push(`Experience: claims a ${members.toLocaleString('en-US')}-member server — plausible but unverified, ask for the server name/proof (⚠️).`);
  return { lines, forced: hardFail ? '❌ Not accepted' : null };
}
const forcedVerdicts = new Map<string, string>();
// Applies a forced verdict to the written review (replaces a softer VERDICT line).
export function enforceVerdict(author: string, review: string): string {
  const forced = forcedVerdicts.get(author);
  if (!forced) return review;
  forcedVerdicts.delete(author);
  if (/not\s+accepted/i.test(review)) return review;
  const replaced = review.replace(/^.*\bVERDICT\b.*$/im, `VERDICT: ${forced}`);
  return replaced !== review ? replaced : `${review}\nVERDICT: ${forced}`;
}
const interviews = new Map<string, Interview>();
const INTERVIEW_TTL_MS = 45 * 60_000;
const START_RE = /\b(?:apply|application|applying)\b[^.?!]{0,30}\b(?:staff|mod|moderator|admin|helper)\b|\b(?:staff|mod|moderator)\s+application\b|\binterview\s+me\b|\b(?:can\s+i\s+be|i\s+want\s+to\s+be(?:come)?|become)\s+(?:a\s+)?(?:staff|mod|moderator)\b|\b(?:bewerb\w*|candidature|postuler|aplikacj\w*)\b/i;
const CANCEL_RE = /\b(?:cancel|stop|quit|end)\b[^.?!]{0,20}\b(?:application|interview|apply)\b|^(?:cancel|stop)\b/i;

export function interviewActive(author: string): boolean {
  const iv = interviews.get(author);
  if (iv && Date.now() - iv.at > INTERVIEW_TTL_MS) interviews.delete(author);
  return Boolean(author && interviews.get(author));
}

// A whole filled-in application pasted in one message (the official form says "reply below with your completed
// answers"): split it into the 9 answers. Null if it isn't a filled form.
const FORM_MARKERS: Array<[number, RegExp]> = [
  [0, /discord\s+name[^:\n]*:\**/i], [0, /\bage\b\**\s*:\**/i], [0, /time\s*zone[^:\n]*:\**/i],
  [1, /(?:average\s+daily\s+)?availability[^:\n]*:\**/i],
  [2, /prior\s+moderation\s+experience\??\**(?:\s*\*?\([^)]*\)\*?)?\s*:?\**/i],
  [3, /why\s+do\s+you\s+want\s+to\s+join[^?\n]*\?\**/i],
  [4, /strengths\s+or\s+skills[^?\n]*\?\**/i],
  [5, /scenario\s*a\b\**\s*:?\**/i], [6, /scenario\s*b\b\**\s*:?\**/i], [7, /scenario\s*c\b\**\s*:?\**/i],
  [8, /staff\s+agreement\**/i],
];
export function parseFilledForm(text: string): string[] | null {
  const hits = FORM_MARKERS.map(([slot, re]) => {
    const m = re.exec(text);
    return m ? { slot, start: m.index, end: m.index + m[0].length } : null;
  }).filter((h): h is { slot: number; start: number; end: number } => h !== null).sort((x, y) => x.start - y.start);
  if (hits.length < 5 || !hits.some((h) => h.slot === 5) || !hits.some((h) => h.slot === 6)) return null;
  const answers: string[] = Array(STAFF_QUESTIONS.length).fill('');
  hits.forEach((h, i) => {
    const seg = text
      .slice(h.end, i + 1 < hits.length ? hits[i + 1].start : text.length)
      .split('\n')
      .filter((line) => !/^\s*#/.test(line) && !/^\s*>/.test(line)) // headings and the quoted agreement text
      .join(' ')
      .replace(/\*+/g, ' ')
      .replace(/^[\s:?\-•]+/, '')
      .replace(/\s+\d+\.\s*(?:[A-Za-z]+\s*){0,4}$/, '') // the next question's number and first words ("1. Do you have")
      .replace(/\s*[•-]\s*$/, '')
      .replace(/\s+/g, ' ')
      .trim();
    // The form's own question text, when the answer was written after it on the same line, and the form's footer.
    const answer = seg
      .replace(/^(?:A member is causing|You disagree with a decision|A user pings you repeatedly)[^?]*\?(?:[^?]{0,80}\?)?\s*/i, '')
      .replace(/\b(?:By submitting this application[^.]*\.(?:[^.]*\.){0,2}|Reply below with your completed answers\.?|Please copy this form[^:]*:?)\s*/gi, '')
      .trim();
    if (answer) answers[h.slot] = answers[h.slot] ? `${answers[h.slot]}; ${answer}` : answer;
  });
// The form itself says submitting = agreeing.
  if (!answers[8]) answers[8] = 'agreed by submitting the form';
  const filled = answers.filter(Boolean).length;
  return filled >= 6 ? answers : null;
}

// A staff application my form reader can't split cleanly (different layout, answers on their own lines, another
// server's form): recognised by its signs, then the model reads the raw text itself. (2026-10-05: an application that
// didn't parse was TRANSLATED into German instead of reviewed.)
const APP_SIGNS = [/\bage\b/i, /time\s*zone|\bregion\b/i, /availab\w*|hours?\s+(?:per|a)\s+day/i, /experience/i, /why\s+(?:do\s+)?(?:you|u)\s+want/i, /strengths?|skills?/i, /scenario/i, /\bstaff\b|moderat\w*/i, /agreement|i\s+confirm|i\s+agree/i, /discord\s+(?:name|tag|user)/i];
export function looksLikeApplication(text: string): boolean {
  return text.length > 250 && APP_SIGNS.filter((re) => re.test(text)).length >= 5;
}

// An application in an unusual layout: one small model call maps the raw text onto the 9 official questions (JSON),
// so it gets the same coded pre-checks and review as the official form (2026-10-05: read raw, a perfect "warn, then
// timeout, then tell an admin" was marked as insufficient for the wrong scenario).
export async function extractApplicationAnswers(raw: string): Promise<string[] | null> {
  const res: any = await localLlmClient.generate(
    `APPLICATION:\n<<<\n${raw.slice(0, 3500)}\n>>>\n\nMap it onto these ${STAFF_QUESTIONS.length} questions and reply with ONLY a JSON array of ${STAFF_QUESTIONS.length} strings — each string is the applicant's own answer copied word for word (\"\" if they didn't answer it):\n${STAFF_QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join('\n')}`,
    { system: 'You extract data. Output only valid JSON, nothing else.', temperature: 0, maxTokens: 900, think: false, model: localLlmClient.chatModel(), skipLanguageCheck: true } as any
  );
  if (res?.status !== 'success') return null;
  try {
    const json = String(res.text).slice(String(res.text).indexOf('['), String(res.text).lastIndexOf(']') + 1);
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) return null;
    const answers = STAFF_QUESTIONS.map((_, i) => String(arr[i] ?? '').trim());
    return answers.filter(Boolean).length >= 5 ? answers : null;
  } catch {
    return null;
  }
}

function reviewRawNote(author: string, raw: string, how: string): string {
  return `INTERVIEW: ${how} Its layout is unusual, so first read it yourself and find their answers to: name & age & timezone, daily hours, experience (server sizes, roles), why they want to join, strengths, each scenario, and the agreement. Then write the final REVIEW. Don't ask questions, don't translate it.\nTHE APPLICATION (raw):\n<<<\n${raw.slice(0, 3500)}\n>>>\n${STAFF_REVIEW_RULES}\n`;
}

function summaryNote(content: string): string {
  return `They pasted a staff application and asked for a SUMMARY. Write a real summary, NOT the answers repeated: 2-3 sentences that give the overall picture — who the applicant is (age, where), how available they are, how much experience they claim, and their general approach to moderation (e.g. "talks first, then uses mutes" or "goes straight to long punishments"), plus anything that stands out. Max ~60 words, no list, no question-by-question recap. NO ratings, NO ✅/⚠️/❌, NO score, NO verdict, no opinion on whether it's good, sketchy or credible.\nTHE APPLICATION:\n${content}\n`;
}

export function reviewNote(author: string, answers: string[], how: string): string {
  const transcript = STAFF_QUESTIONS.map((q, i) => `Q${i + 1}. ${q}\nA${i + 1}. ${answers[i] || '(no answer)'}`).join('\n');
  const pre = staffPrechecks(answers);
  if (pre.forced) forcedVerdicts.set(author, pre.forced);
  return `INTERVIEW: ${how} Write the final REVIEW of their whole application now. Don't ask more questions.\nTHEIR APPLICATION (all questions and their exact answers):\n${transcript}\nPRE-CHECKS (computed from their answers — use them, they are correct):\n${pre.lines.map((l) => `- ${l}`).join('\n') || '- nothing flagged'}${pre.forced ? `\nREQUIRED VERDICT: ${pre.forced} (a hard rule failed).` : ''}\n${STAFF_REVIEW_RULES}\n`;
}

const TRANSLATE_ASK_RE = /(?<![a-zà-ÿäöüß])(?:translate|traduis|traduire|übersetz[a-zäöüß]*|uebersetz[a-z]*|tłumacz\w*|przetłumacz\w*)/i;
const SUMMARY_ASK_RE = /\b(?:summar\w*|sum\s+(?:it|this)\s+up|tl;?dr|recap|résum\w*|resume|zusammenfass\w*|podsumuj\w*)\b/i;
// Is this message a request to TRANSLATE? For a pasted application only its request line counts.
export function isTranslateRequest(prompt: string): boolean {
  return looksLikeApplication(prompt) ? TRANSLATE_ASK_RE.test(requestPart(prompt)) : TRANSLATE_ASK_RE.test(prompt);
}

// What they ASKED, apart from the pasted application: the first line when it's a short request ("nexus summarize
// this:"), so an answer inside the form ("I can translate for members") never counts as a request.
function requestPart(prompt: string): string {
  const first = prompt.split('\n')[0] || '';
  return prompt.includes('\n') && first.length < 200 && !/official\s+staff\s+application|discord\s+name|\bage\b\s*:/i.test(first) ? first : '';
}

// The instruction for this turn (and updates the state). '' when no interview is involved.
export function interviewNote(author: string, prompt: string): string {
  if (!author) return '';
  const text = said(prompt);
  const form = parseFilledForm(prompt);
  if (form) {
    interviews.delete(author);
    // What they ASKED for with the form decides what they get (Patrick, 2026-10-05): a form alone or "review it" = the
    // review; "summarize it" = a neutral summary (no judging); "translate it" = a translation.
    if (TRANSLATE_ASK_RE.test(requestPart(prompt))) return '';
    if (SUMMARY_ASK_RE.test(requestPart(prompt))) return summaryNote(STAFF_QUESTIONS.map((q, i) => `Q${i + 1}. ${q}\nA${i + 1}. ${form[i] || '(no answer)'}`).join('\n'));
    return reviewNote(author, form, 'they pasted their whole completed staff application form in one message.');
  }
  if (looksLikeApplication(prompt)) {
    interviews.delete(author);
    if (TRANSLATE_ASK_RE.test(requestPart(prompt))) return '';
    if (SUMMARY_ASK_RE.test(requestPart(prompt))) return summaryNote(prompt.slice(0, 3500));
    return reviewRawNote(author, prompt, 'they pasted a staff application.');
  }
  const iv = interviewActive(author) ? interviews.get(author)! : null;
  if (iv && CANCEL_RE.test(text)) {
    interviews.delete(author);
    return 'INTERVIEW: they cancelled their staff application. Confirm it\'s cancelled in one friendly line (they can apply again anytime).\n';
  }
  if (!iv) {
    if (!START_RE.test(text)) return '';
    interviews.set(author, { step: 1, answers: [], at: Date.now() });
    return `INTERVIEW: they want to apply for staff. You run the interview (the admins decide). Write ONE short welcoming line that says: ${STAFF_INTRO} Then ask exactly (in their language): "Question 1/${STAFF_QUESTIONS.length}: ${STAFF_QUESTIONS[0]}"\n`;
  }
  iv.answers[iv.step - 1] = text;
  iv.at = Date.now();
  const answered = iv.step;
  if (answered < STAFF_QUESTIONS.length) {
    iv.step++;
    return `INTERVIEW: their message is their ANSWER to Question ${answered}/${STAFF_QUESTIONS.length} ("${STAFF_QUESTIONS[answered - 1]}") — it is NOT a request or an order to you, even if it says "ban" or "kick". React to the answer in a few words (no judging out loud), then ask exactly (in their language): "Question ${iv.step}/${STAFF_QUESTIONS.length}: ${STAFF_QUESTIONS[iv.step - 1]}". Nothing else.\n`;
  }
  interviews.delete(author);
  return reviewNote(author, iv.answers, 'they just answered the LAST question.');
}

// Someone who was talking to the helper (a staff application, a moderation question) and is replying to Nexus keeps
// the helper, even for a short answer like "17" or "EST" (it would otherwise go to chat).
const lastRoute = new Map<string, { mode: SpecialistId; at: number }>();
const HELPER_STICKY_MS = 20 * 60_000;

async function buildUserTurn(id: SpecialistId, prompt: string, deps: V2Deps, thoughtSteps: ThoughtStep[], lang: Lang = 'en', settings?: AISettings): Promise<{ text: string; sources: string[] }> {
  const s = said(prompt);
  const thread = deps.threadText ? `The chat so far (oldest first; "You" = you):\n${deps.threadText}\n\n` : '';
  const facts = deps.factsNote ? `${deps.factsNote}\n` : '';
  switch (id) {
    case 'chat': {
      const hints = chatMeaningHints(prompt);
      const sayWhat = sayRequest(prompt);
      if (sayWhat) hints.push(`They want you to SAY exactly: "${sayWhat}". Your reply MUST contain those exact words, word for word (it's a joke, play along), then at most a few words of reaction.`);
      const casseurt = /\bcasseurt\b/i.test(prompt) ? 'They mentioned Casseurt, your creator: react to what they said about him, roast him in one line (love-hate).\n' : '';
      return {
        text: `${thread}${facts}${hints.length ? `What their message means: ${hints.join(' ')}\n` : ''}${casseurt}${nowLine()}${avoidNote(deps.recentLines)}${openersNote(deps.recentLines)}${((o) => (o.length ? `\nPhrases you've been overusing lately (don't use any of them): ${o.map((x) => `"${x}"`).join(', ')}` : ''))(overusedPhrases())}\n\nThey just said: "${s}"\nYour one-line reply:`,
        sources: [],
      };
    }
    case 'question': {
      const found = await deps.findFacts(s);
      let web = '';
      const sources = found.titles.map((t) => `Doc: ${t}`);
      // No fact in the knowledge base for a "who is / what is" question about something specific -> look it up
      // (2026-10-05: "who is Judge Rinder?" got "i dunno" while v1 knew).
      const specific = /^(?:who|what|when|where|which)\b/i.test(s) || /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/.test(s);
      const reason = deps.shouldSearchWeb(s, found.topScore) || (!found.text && specific ? 'no_local_facts' : false);
      if (reason) {
        const results = await searchTavilyDirect(reason === 'no_local_facts' ? s.replace(/[?!.]+$/, '') : deps.webQuery(s, reason), 5, { recent: true });
        if (results.length) {
          web = `\nLIVE WEB RESULTS (you searched just now):\n${results.map((r, i) => `${i + 1}) ${r.title} — ${r.domain}: ${r.snippet.slice(0, 320)}`).join('\n')}`;
          sources.push(...results.slice(0, 2).map((r) => `Web: ${r.title}`));
          thoughtSteps.push({ id: 'step-v2-web', type: 'web_search', title: `🌐 Live web search (${reason})`, description: `${results.length} result(s).` });
        }
      }
      const factBlock = found.text || web ? `FACTS (correct and current, use them):\n${found.text}${web}\n\n` : '';
      return { text: `${thread}${factBlock}${nowLine()}\n\nTheir question: "${s}"\nYour answer:`, sources };
    }
    case 'search': {
      const ctx = await buildSearchContext(prompt, lang);
      thoughtSteps.push({ id: 'step-live-search', type: 'web_search', title: `🌐 Live web search: "${ctx.searchedFor}"`, description: `${ctx.count} result(s).` });
      return { text: `${thread}${ctx.block}\n\n${nowLine()}\n\nThey asked: "${s}"\nYour answer:`, sources: ctx.sources };
    }
    case 'code':
      return { text: `${thread}Their request: "${prompt.slice(0, 3500)}"\nYour answer (attitude line, then the code block, then how to run it):`, sources: [] };
    case 'writing': {
      const formal = isFormalDraftRequest(prompt);
      return {
        text: `${thread}Their request: "${prompt.slice(0, 3500)}"${formal ? '\nThis is a FORMAL draft: zero swearing and zero slang inside it.' : ''}\nYour answer:`,
        sources: [],
      };
    }
    case 'maths': {
      const verified = mathsFacts(prompt);
      return { text: `${thread}${verified ? `${verified}\n` : ''}${nowLine()}\n\nThe problem: "${s}"\nYour answer (final answer first):`, sources: [] };
    }
    case 'pc': {
      const all = `${s} ${deps.threadText.replace(/You:[^\n]*\n?/g, ' ')}`;
      const wantsBuild = /\b(?:build|parts?\s+list|budget|rig|setup|infinite|unlimited|money\s+is\s+no|dream|best\s+(?:gaming\s+)?pc)\b/i.test(all);
      const priceNote = getPriceNote(all, { core: wantsBuild });
      return {
        text: `${thread}${facts}PC FACTS (correct and current as of Oct 2026, they win over your memory):\n${deps.pcFacts(all, wantsBuild)}\n${priceNote ? `${priceNote}\n` : ''}${lang === 'de' ? fxNoteEur(await getUsdToCad()) : fxNote(await getUsdToCad())}\n${deps.budgetNote(all)}\n\nThey said: "${s}"\nYour answer:`,
        sources: [],
      };
    }
    case 'helper': {
      let progress = interviewNote(settings?.discordUserId || '', prompt);
      // Partnership requests / questions: checked against the server's partnership rules (real member count from
      // their invite link when they give one).
      if (!progress && isPartnershipMessage(prompt, settings?.serverContext?.channel) && !looksLikeApplication(prompt)) {
        progress = await partnershipTurn(prompt);
        thoughtSteps.push({ id: 'step-v2-partnership', type: 'reasoning', title: '🤝 Partnership check', description: progress.split('\n').slice(0, 4).join(' | ').slice(0, 300) });
      }
      if (progress.startsWith('INTERVIEW: they pasted a staff application. Its layout is unusual')) {
        const answers = await extractApplicationAnswers(prompt);
        if (answers) {
          progress = reviewNote(settings?.discordUserId || '', answers, 'they pasted a staff application (its answers were extracted from an unusual layout).');
          thoughtSteps.push({ id: 'step-v2-app-extract', type: 'reasoning', title: '📋 Application answers extracted', description: answers.map((a, i) => `${i + 1}. ${a.slice(0, 60)}`).join(' | ') });
        }
      }
      return {
        text: `${progress}${translationBlock(prompt)}${serverContextBlock(settings?.serverContext ?? null)}\n${deps.threadText ? `The conversation so far (oldest first; "You" = you — use it to know where you are, e.g. which application question is next):\n${deps.threadText}\n\n` : ''}${facts}${nowLine()}\n\nTheir message: "${prompt.slice(0, 3000)}"\nYour reply:`,
        sources: [],
      };
    }
    case 'video':
      // The video's analysis and sub-persona are put in front of this (runV2's image/video block).
      return { text: `${thread}${nowLine()}\n\nYour answer:`, sources: [] };
    case 'support':
      return { text: `${thread}${facts}They just said: "${s}"\nYour reply (warm, 1-3 short sentences):`, sources: [] };
  }
}

// ---- generation -----------------------------------------------------------------------------------

let lastFailure = '';
async function generateWith(spec: Specialist, userTurn: string, lang: Lang = 'en'): Promise<string | null> {
  lastFailure = '';
  const system = spec.system;
  const options = {
    system,
    // A small model's French/Polish garbles at high temperature (fused words, leaked instructions) — capped lower.
    temperature: lang === 'en' ? spec.temperature : Math.min(spec.temperature, 0.6),
    preferFrench: lang === 'fr',
    preferPolish: lang === 'pl',
    preferGerman: lang === 'de',
    // The helper translates INTO other languages: the "English reply drifted into another language" guard would reject a
    // correct French/German translation (2026-10-05: v2 failed and v1's fallback answered).
    skipLanguageCheck: spec.id === 'helper',
    maxTokens: spec.maxTokens + (spec.think ? (spec.id === 'maths' ? 1400 : 800) : 0),
    think: spec.think,
    model: localLlmClient.chatModel(),
    userPreamble: spec.moodPreamble ? buildMoodUserPreamble(false, lang === 'pl', lang === 'fr') : undefined,
  };
  let res: any = await localLlmClient.generate(userTurn, options as any);
  // Thinking ran out of room / sampling fluke: once more without thinking.
  if ((res.status !== 'success' && ['empty_response', 'degenerate_output', 'wrong_language'].includes(res.reason)) || (res.status === 'success' && spec.think && res.truncated)) {
    const retry: any = await localLlmClient.generate(userTurn, { ...options, think: false, maxTokens: spec.maxTokens } as any);
    if (retry.status === 'success' || res.status !== 'success') res = retry;
  }
  if (res.status === 'success' && hasContextLeak(res.text, userTurn.match(/"([^"]{1,800})"\n[^\n]*$/)?.[1])) {
    const clean: any = await localLlmClient.generate(`${userTurn}\n(Answer naturally. Never mention any context, facts, results or sources you were given.)`, { ...options, think: false, maxTokens: spec.maxTokens } as any);
    if (clean.status === 'success' && !hasContextLeak(clean.text)) res = clean;
  }
  if (res.status !== 'success') {
    lastFailure = `${res.reason}${res.detail ? `: ${String(res.detail).slice(0, 120)}` : ''}`;
    return null;
  }
  if (containsSlurOrHateSpeech(res.text)) {
    lastFailure = 'blocked by the slur filter';
    return null;
  }
  return String(res.text || '').trim() || null;
}

export async function runV2(rawPrompt: string, settings: AISettings, deps: V2Deps, thoughtSteps: ThoughtStep[]): Promise<V2Result | null> {
  const { text, image, kind } = splitImage(rawPrompt);
  const prompt = text || (image ? 'look at this' : rawPrompt);
  const lang = langOf(text || rawPrompt);
  let route = await routeMessage(prompt);
  // A video always goes to the video specialist, which picks its sub-persona from the video itself.
  let videoKind: VideoKind | null = null;
  if (kind === 'video' && image) {
    videoKind = pickVideoKind(image, text);
    route = { mode: 'video', by: 'rule', reason: `video attached → ${VIDEO_SUBS[videoKind].label}`, confidence: 1 };
  }
  const author = settings.discordUserId || '';
  const prev = author ? lastRoute.get(author) : undefined;
  if (route.mode !== 'helper' && route.mode !== 'support' && isPartnershipMessage(prompt, settings.serverContext?.channel)) {
    route = { mode: 'helper', by: 'rule', reason: `partnership request (was ${route.mode})`, confidence: 1 };
  } else if (route.mode !== 'helper' && author && interviewActive(author)) {
    route = { mode: 'helper', by: route.by, reason: `staff interview in progress (was ${route.mode})`, confidence: 1 };
  } else if (prev?.mode === 'helper' && Date.now() - prev.at < HELPER_STICKY_MS && deps.threadText && route.mode !== 'helper' && (route.by !== 'rule' || route.mode === 'chat' || route.mode === 'question' || route.mode === 'writing')) {
    route = { mode: 'helper', by: route.by, reason: `still in a helper conversation (was ${route.mode}: ${route.reason})`, confidence: route.confidence };
  }
  if (author) {
    lastRoute.set(author, { mode: route.mode, at: Date.now() });
    if (lastRoute.size > 5000) lastRoute.delete(lastRoute.keys().next().value!);
  }
  const spec = SPECIALISTS[route.mode];
  thoughtSteps.push({ id: 'step-v2-route', type: 'intent', title: `🧭 Router → ${spec.label}`, description: `${route.by}: ${route.reason}${lang !== 'en' ? ` (${lang})` : ''}${image ? ' (with an image)' : ''}`, data: { mode: route.mode, by: route.by, lang } as any });
  const built = await buildUserTurn(route.mode, prompt, deps, thoughtSteps, lang, settings);
  const imageBlock = image
    ? kind === 'video'
      ? `THE VIDEO THEY SENT (you watched it yourself; its details, what's on screen and what's said): ${image}\nSUB-PERSONA: ${videoKind ? `${VIDEO_SUBS[videoKind].label} — ${VIDEO_SUBS[videoKind].focus}` : VIDEO_SUBS.general.focus}\n${text ? `Their message with it: "${text}"` : 'They sent it with no text: react to it.'}\n\n`
      : `THE IMAGE THEY SENT (you looked at it yourself; this is what's in it): ${image}\n${text ? '' : 'They sent it with no text: react to it.\n'}\n`
    : '';
  // A translation's own text is in the TARGET language even when the asker writes German/French/Polish.
  const langNote = route.mode === 'helper' && lang !== 'en' && isTranslateRequest(prompt)
    ? `${LANG_NOTE[lang]}\n(EXCEPTION: the translation itself is written in the language they want it translated INTO, not in theirs.)`
    : LANG_NOTE[lang];
  const userTurn = `${imageBlock}${built.text}${langNote}`;
  const sources = built.sources;
  const formal = route.mode === 'writing' && isFormalDraftRequest(prompt);
  const finalize = (t: string) => {
    const out = finalizeSpecialistReply(t, formal ? 'formal' : spec.finalize, said(prompt), lang);
    return route.mode === 'support' || SAD_RE.test(prompt) ? stripCrudeAside(out) : out;
  };
  const t0 = Date.now();
  const raw = await generateWith(spec, userTurn, lang);
  if (!raw) {
    thoughtSteps.push({ id: 'step-v2-failed', type: 'verification', title: '⚠️ v2 generation failed, v1 takes over', description: lastFailure || 'empty reply' });
    return null; // v1 takes over (its own fallbacks)
  }
  // One emoji max is a CHAT rule (Patrick); a staff review needs its ✅/⚠️/❌ marks.
  let content = route.mode === 'chat' || route.mode === 'support' ? dropBannedEmoji(finalize(raw)) : finalize(raw).replace(/💅\uFE0F?/gu, '');
  // A parts list keeps ONE part per line even when the model runs the intro into the first part.
  if (route.mode === 'helper' && isTranslateRequest(prompt)) content = cleanTranslation(content);
  if (route.mode === 'helper' && author) {
    content = enforceVerdict(author, content);
    // A staff review keeps one point per line: title, each ✅/⚠️/❌ point, the score and the verdict on their own lines.
    if (/CONFIDENCE SCORE/i.test(content)) content = content.replace(/[ \t]+(?=(?:✅|⚠️|❌)\s*[A-Z][\w &()/,'-]{2,60}:)/gu, '\n').replace(/[ \t]*(CONFIDENCE SCORE)/i, '\n$1');
  }
  if (route.mode === 'pc') content = content.replace(/[ \t]+(?=(?:CPU|GPU|Motherboard|RAM|SSD|Storage|PSU|Power Supply|Cooler|CPU Cooler|Case|Monitor|Rough Total|Total|Estimated Total)\s*:)/g, '\n');
  if (route.mode === 'chat') {
    content = dropTrailingAside(content);
    const sayWhat = sayRequest(prompt);
    // The words they asked for must be there; if the model dodged, they lead the reply.
    if (sayWhat && !content.toLowerCase().includes(sayWhat.toLowerCase().replace(/[.!?]+$/, ''))) content = `${sayWhat} ${content}`.trim();
    content = dropBannedEmoji(content);
  }
  // Repeat / echo guard for the short-reply specialists.
  if ((route.mode === 'chat' || route.mode === 'support') && (isRepeat(content, deps.recentLines) || isEchoReply(content, prompt))) {
    const retry = await generateWith(spec, `${userTurn}\n(Your first try was "${content.slice(0, 80)}" — that repeats an old line or their own words. Say something COMPLETELY different that reacts to what they mean.)`, lang);
    if (retry) content = dropBannedEmoji(finalize(retry));
  }
  thoughtSteps.push({ id: 'step-v2-generate', type: 'synthesis', title: `${spec.label} reply`, description: `Generated in ${Date.now() - t0}ms (temp ${spec.temperature}${spec.think ? ', thinking on' : ''}).`, durationMs: Date.now() - t0 });
  return { content, route, sources };
}

// For the handlers that run before the router and already hold the true facts (questions about Nexus, "compliment
// me", live weather/time/places): the chosen specialist words the answer from those facts, in the v2 voice and in
// the person's language. Null if the model call fails (the caller keeps its own fallback).
export async function phraseWithFacts(kind: SpecialistId, prompt: string, task: string, recentLines: string[], thoughtSteps: ThoughtStep[], title: string): Promise<string | null> {
  const spec = SPECIALISTS[kind];
  const lang = langOf(prompt);
  const userTurn = `${task}\n${nowLine()}${kind === 'chat' ? avoidNote(recentLines) : ''}\n\nThey said: "${said(prompt)}"\nYour reply:${LANG_NOTE[lang]}`;
  const t0 = Date.now();
  const raw = await generateWith(spec, userTurn, lang);
  if (!raw) return null;
  let content = finalizeSpecialistReply(raw, spec.finalize, said(prompt), lang);
  content = dropBannedEmoji(content);
  thoughtSteps.push({ id: 'step-v2-phrase', type: 'synthesis', title: `${spec.label} reply (${title})`, description: `Worded from the true facts in ${Date.now() - t0}ms.`, durationMs: Date.now() - t0 });
  return content;
}
