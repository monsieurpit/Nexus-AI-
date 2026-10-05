// Nexus v2 pipeline (2026-10-05): route -> gather what that specialist needs -> generate with the specialist's own
// instructions and settings -> the specialist's own cleanup -> repeat guard. Turned on per request by
// settings.routerVersion === 'v2' (server.ts: NEXUS_ROUTER env, or the test bank's override).
// Safety checks, teaching, hex colours and links run BEFORE this in reasoningEngine.ts, exactly as in v1.

import * as localLlmClient from '../localLlmClient';
import type { AISettings, ThoughtStep } from '../../types';
import { routeMessage, type Route } from './router';
import { SPECIALISTS, type Specialist, type SpecialistId } from './specialists';
import { chatMeaningHints, isRepeat, isEchoReply, SAD_RE, overusedPhrases } from '../rules/messageMode';
import { finalizeSpecialistReply, hasContextLeak, stripCrudeAside } from '../rules/postProcess';
import { isFormalDraftRequest, buildMoodUserPreamble } from '../rules/promptBuilder';
import { containsSlurOrHateSpeech } from '../swearEngine';
import { CANADIAN_RETAIL_DOMAINS, expandStickCounts, getPriceNote, isPriceQuestion } from '../priceTracker';
import { searchTavilyDirect } from '../tavilySearch';
import { trySolveMath } from '../mathSolver';
import { fxNote, getUsdToCad } from '../fx';
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
export type Lang = 'en' | 'fr' | 'pl';
export function langOf(text: string): Lang {
  return localLlmClient.looksPolish(text) ? 'pl' : localLlmClient.looksFrench(text) ? 'fr' : 'en';
}
export const LANG_NOTE: Record<Lang, string> = {
  en: '',
  fr: "\n\n(LANGUE : réponds UNIQUEMENT en français québécois (joual), comme un jeune de Québec sur Discord — pas en anglais, pas en français de France. Sacre naturellement DANS tes phrases (tabarnak, câlisse, ostie, criss, calvaire), jamais putain/merde/bordel/con, et jamais une rafale de sacres au début. Même longueur et mêmes règles que plus haut. N'invente pas de mots.)",
  pl: '\n\n(JĘZYK: odpowiadaj WYŁĄCZNIE po polsku, naturalnie i poprawnie — pilnuj końcówek, nie wymyślaj słów. Przeklinaj naturalnie w środku zdań (kurwa, chuj, cholera, pierdolić), nigdy serią na początku. Ta sama długość i zasady co wyżej.)',
};

// server.ts folds an image's description into the message ("...\n\n[Attached image shows: X]" or "React to this image: X").
// The router must see only what the person wrote; the specialist gets the image as something it saw.
export function splitImage(prompt: string): { text: string; image: string | null } {
  const attached = prompt.match(/^([\s\S]*?)\n\n\[Attached image shows: ([\s\S]+)\]\s*$/);
  if (attached) return { text: attached[1].trim(), image: attached[2].trim() };
  const react = prompt.match(/^React to this image: ([\s\S]+)$/);
  if (react) return { text: '', image: react[1].trim() };
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

async function buildSearchContext(prompt: string): Promise<{ block: string; sources: string[]; searchedFor: string; count: number }> {
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
    `\n${fxNote(await getUsdToCad())}`;
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

async function buildUserTurn(id: SpecialistId, prompt: string, deps: V2Deps, thoughtSteps: ThoughtStep[]): Promise<{ text: string; sources: string[] }> {
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
      const ctx = await buildSearchContext(prompt);
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
        text: `${thread}${facts}PC FACTS (correct and current as of Oct 2026, they win over your memory):\n${deps.pcFacts(all, wantsBuild)}\n${priceNote ? `${priceNote}\n` : ''}${fxNote(await getUsdToCad())}\n${deps.budgetNote(all)}\n\nThey said: "${s}"\nYour answer:`,
        sources: [],
      };
    }
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
  const { text, image } = splitImage(rawPrompt);
  const prompt = text || (image ? 'look at this' : rawPrompt);
  const lang = langOf(text || rawPrompt);
  const route = await routeMessage(prompt);
  const spec = SPECIALISTS[route.mode];
  thoughtSteps.push({ id: 'step-v2-route', type: 'intent', title: `🧭 Router → ${spec.label}`, description: `${route.by}: ${route.reason}${lang !== 'en' ? ` (${lang})` : ''}${image ? ' (with an image)' : ''}`, data: { mode: route.mode, by: route.by, lang } as any });
  const built = await buildUserTurn(route.mode, prompt, deps, thoughtSteps);
  const imageBlock = image
    ? `THE IMAGE THEY SENT (you looked at it yourself; this is what's in it): ${image}\n${text ? '' : 'They sent it with no text: react to it.\n'}\n`
    : '';
  const userTurn = `${imageBlock}${built.text}${LANG_NOTE[lang]}`;
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
  let content = dropBannedEmoji(finalize(raw));
  // A parts list keeps ONE part per line even when the model runs the intro into the first part.
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
