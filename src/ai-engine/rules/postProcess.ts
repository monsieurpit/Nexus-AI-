// Post-process pipeline — the mechanical "guarantee" layer applied on top of raw LLM output, split
// out of the old monolithic reasoningEngine.ts (2026-09-20). This exists because instruction-
// following alone plateaued for several things (swear floor, list formatting, reply length) — see
// each function's own comment for the specific live case that proved the prompt-only approach
// wasn't reliable enough on gemma3:4b/nexus-4b. No behavior change from the split — every regex,
// threshold, and comment carried over verbatim. Order matters where these compose (see
// topUpLlmSwearing's own body): list-flatten -> de-stack interjections -> swear substitution ->
// swear floor -> chaotic overshare -> (caller applies toShoutCase last, if triggered).

import { looksFrench, looksPolish } from '../localLlmClient';
import { splitSentencesSafe } from '../sentences';
import {
  enhanceNaturalSwearPhrasing,
  uncensorProfanity,
  forceSwearFloor,
  forceChaoticOvershare,
  deStackLeadingInterjections,
} from '../swearEngine';
import { AISettings } from '../../types';

export function swearFloorForIntensity(intensity: 'light' | 'moderate' | 'heavy' | 'unhinged', isCrashout: boolean): number {
  // Patrick wants the crashout voice (the persona the Discord bot always uses) to swear HEAVILY —
  // a lot, every reply. An earlier pass lowered this to 3 and he immediately said it wasn't
  // enough. Crashout / unhinged sit at 5, the rest scale down from there.
  if (isCrashout) return 5;
  switch (intensity) {
    case 'unhinged': return 5;
    case 'heavy': return 3;
    case 'moderate': return 2;
    default: return 0;
  }
}

// Numbered/bulleted lists and bold sub-headers are the single biggest visual tell that a reply
// reads as AI-generated rather than a real person texting — observed live even after two rounds
// of progressively more specific wording in buildLlmKnowledgeInstruction's Authenticity directive
// (naming the literal characters "1.", "-", "**" to avoid didn't reliably stop it; a question
// about vaccine types or cloud types kept pulling the model back into report structure). Since
// instruction-following plateaued rather than converging with more rewording, this is a
// mechanical guarantee on top of it, the same pattern already used for the swear floor and
// chaotic overshare. Deliberately conservative: it only strips the LITERAL markdown list/bold
// syntax and joins what's left with the surrounding text — it does not try to cleverly rewrite
// grammar into one fused sentence, since a crude attempt at that risks producing text that reads
// even more broken than the list it replaced. A genuine multi-paragraph reply with normal
// prose (like the "how does the immune system work" sample this was tuned against) is left
// completely untouched — this only fires when an actual list marker is present.
function flattenListFormatting(text: string): string {
  const blocks: string[] = [];
  const protectedText = text.replace(/```[\s\S]*?```/g, (m) => {
    blocks.push(m);
    return `__CODE_${blocks.length - 1}__`;
  });

  const lines = protectedText.split('\n');
  const hasListMarker = lines.some((l) => /^\s*(?:\d+[.)]\s+|[-•]\s+)/.test(l));
  let result = protectedText;
  if (hasListMarker) {
    result = lines
      .map((l) => l.replace(/^\s*(?:\d+[.)]\s+|[-•]\s+)/, '').trim())
      .filter((l) => l.length > 0)
      .join(' ');
  }
  // Markdown bold — a casual chat reply never legitimately needs it, and every observed case was
  // paired with the list-header pattern this function exists to remove in the first place.
  result = result.replace(/\*\*(.+?)\*\*/g, '$1');
  return result.replace(/__CODE_(\d+)__/g, (_m, i) => blocks[Number(i)]).replace(/[ \t]+/g, ' ').trim();
}

// Patrick's ask (Sept 2026): "Nexus answers with really big paragraphs for small things."
// gemma3:4b, handed a large grounding context plus the "give the real answer / strong opinions"
// directive, routinely blows a simple "difference between X and Y" up into a 5-6 paragraph essay
// with a rhetorical preamble ("seriously? you want to know...") and a trailing "better at what,
// exactly?" even when the question was perfectly clear. The LENGTH line in the prompt plateaued
// (same story as flattenListFormatting / the swear floor), so this is the mechanical guarantee on
// top of it: for a question that isn't explicitly asking for depth, flatten to a single chat
// paragraph of a few sentences, drop an opening content-free preamble sentence, and drop a
// tacked-on clarifier question when the prompt itself wasn't actually vague. A detached "Anyway,
// ..." overshare aside (a deliberate voice feature added downstream) is split off and re-appended
// untouched. Fenced code blocks are never touched.
const DEPTH_REQUEST_RE = /\b(in detail|explain|elaborat|walk me through|step by step|break (?:it|this) down|deep ?dive|thorough|comprehensive|everything (?:about|there is)|tell me (?:about|everything)|pros and cons|full (?:list|breakdown|rundown)|how (?:does|do|did|can|would)|why (?:is|are|do|does|did|would|has|have)|what happens (?:when|if)|give me (?:the )?(?:details|a rundown|examples))\b/i;
const PREAMBLE_SENTENCE_RE = /^(?:(?:damn|shit|hell|fuck(?:ing)?|goddamn|bloody hell|christ|jesus|ok(?:ay)?|alright|right|listen up|look|bruv|mate|bro|man)[,\s]+)*(?:seriously\??|really\??|right\??|alright\??|ok(?:ay)?\??|listen up\.?|alright,? listen up\.?|you (?:wanna|want to|want) know|that'?s (?:a )?(?:fucking |bloody |goddamn |proper |right )?(?:stupid|dumb|basic|simple|easy|obvious|good|great|fair|tricky|hard|confusing|loaded|daft|braindead|annoying|weird|classic)\b[^.!?]*)[.!?]*$/i;
const TRAILING_CLARIFIER_RE = /^(?:(?:damn|shit|hell|so|right|anyway|but)[,\s]+)*(?:better at what|what (?:are|is) (?:you|it)(?:\b| )|what (?:exactly )?(?:do you|are you trying|is it you)|what'?s (?:your|the) (?:actual )?(?:question|point|deal|problem)|you (?:getting me|feeling me|with me)|makes? sense|got (?:it|that)|sussed|capiche|you get me|what is it you'?re actually)\b[^.!?]*[.!?]*$/i;

// A rhetorical question the model opens with before getting to the point — measured on 20 real
// server messages (2026-09-30), most replies started with one ("are you fucking serious with this
// shit?", "what the fuck you mean, mate?", "what kind of shit question is that?"). It burns the
// most visible spot in the reply on zero content. Only dropped when a real sentence follows it.
const RHETORICAL_OPENER_RE = /^(?:(?:damn|shit|hell|fuck|goddamn|bloody hell|oh|mate|bro|man|nah|christ)[,\s]+)*(?:are|r)\s+(?:you|u|ya)\s+(?:(?:fucking|actually|seriously|genuinely|really|for real|honestly|even)\s+)*(?:serious|kidding|joking|for real|taking the piss|high|ok|okay|dumb|stupid|mad|having a laugh|asking|trying|telling|saying|out of your)\b[^.!?]*\?+$|^(?:(?:damn|shit|hell|fuck|goddamn|oh|mate|bro|man|nah)[,\s]+)*what\s+the\s+(?:fuck|hell|shit)\s+(?:do\s+|did\s+|are\s+)?(?:you|u|ya)\s+(?:even\s+)?(?:mean|on about|talking about|saying|want)\b[^.!?]*\?+$|^(?:(?:damn|shit|hell|fuck|goddamn|oh|mate|bro|man|nah)[,\s]+)*what\s+(?:the\s+(?:fuck|hell)\s+)?(?:kind|sort)\s+of\s+[^.!?]*\bquestion\b[^.!?]*\?+$/i;

// Someone telling Nexus how they're doing, usually answering his "how are you" ("I'm good nexus, thanks
// for asking"). Real friends answer "yeah bet, wyd?", not a roast.
const STATUS_LEAD_RE = /^(?:(?:hey+|yo+|ok(?:ay)?|ay+|nah|yeah|yep|lol|haha|well)[\s,]+)?(?:nexus[\s,]+)?(?:(?:i'?m|im|i am|doing|feeling|all|pretty|really|kinda|just)\s+)*(?:good|fine|great|ok(?:ay)?|alright|well|chill(?:in[g']?)?|not bad|solid|decent|cool|tired|bored)\b/i;
const FOR_ASKING_RE = /\b(?:thanks?|thx|ty|appreciate (?:it|you|that)|thank you)\b[^.!?]{0,15}\b(?:for\s+)?(?:asking|checking|caring)\b/i;
export function isStatusReply(text: string): boolean {
  const t = text.trim();
  if (!t || t.split(/\s+/).length > 12 || /\b(?:who|what|when|where|why|how)\b/i.test(t.replace(/\b(?:what|how) (?:about|bout|abt) (?:you|u)\b/gi, ''))) return false;
  return STATUS_LEAD_RE.test(t) || FOR_ASKING_RE.test(t);
}

// "teach me how to build a pc", "build me a parts list", "recommend parts for 1440p": the one place a long,
// structured answer is exactly what was asked for (Patrick, 2026-10-01).
export const PC_TOPIC_RE =
  /\b(?:pc|gaming pc|gpu|cpu|graphics card|video card|motherboard|mobo|psu|power supply|ssd|nvme|m\.2|ddr[345]|vram|ram|rtx ?\d{3,4}|gtx ?\d{3,4}|rx ?\d{4}|radeon|geforce|ryzen|threadripper|core ultra|intel core|i[3579]-\d{4,5}|am[45]|lga ?\d{4}|x3d|aio|cpu cooler|pc case|bios|expo|xmp|dlss|fsr|hdmi|displayport)\b/i;
export const PC_BUILD_REQUEST_RE = /\b(?:teach|guide|show|help|tell|walk)\s+me\b[^.?!]*\b(?:build|pc|computer|parts)\b|\bhow\s+(?:do\s+i|to|can\s+i|should\s+i)\s+build\b|\bparts?\s+list\b|\bbuild\s+me\b|\brecommend\b[^.?!]*\b(?:pc|build|parts|gpu|cpu|ram|motherboard|psu|cooler|case|ssd)\b|\bbest\s+parts\b|\bwhat\s+parts\b|\bpc\s+build\b/i;

const BASIC_CHAT_RE = /^(?:(?:hey+|yo+|hi+|sup|ay+|ok(?:ay)?)[\s,]+)?(?:nexus[\s,]+)?(?:(?:are|r|is|do|did|does|have|can|will|you|u|wanna|want)\b|(?:what(?:'?s|\s+are|\s+r)|how(?:'?s|\s+are|\s+r))\s+(?:you|u)\b|wyd\b)/i;

// Everything conversational and short aimed at Nexus himself: bare "nexus", greetings, "wyd", "hru",
// "you good?", thanks, status replies... They all get ONE short human line (server feedback,
// 2026-09-30). Factual questions (who/when/where/why/which, "how to/many/much") never qualify.
const CHAT_GREETING_ONLY_RE = /^(?:(?:hey+|yo+|hi+|hello|sup|wsg|wassup|wazzup|ay+|ok(?:ay)?|lol|lmao|bro|bruh|nexus)[\s,!?.]*)+$/i;
const CHAT_PHRASE_RE = /\b(?:wyd|hru|hbu|wbu|wsg|wassup|wazzup|what'?s up|whats up|sup|how'?s it going|hows it going|how are (?:you|u)|how r u|how you doing|how u doing|what are (?:you|u) (?:doing|up to)|(?:you|u)(?: are|'?re| r)? (?:good|ok|okay|alive|there|awake|up|mad|real|serious|cool|funny|goated|the best|trash|dumb|stupid|annoying|nice|awesome)|thanks|thank you|thx|ty|good (?:morning|night|evening)|gn|gm|(?:i )?(?:love|miss) (?:you|u)|(?:wanna|want to|lets|let's|can we|should we|we should|you wanna|u wanna)\s+(?:play|go|hop|jump|watch|do|talk|chat|call|vc|ranked|queue|game|gaming)|(?:you|u|ur|your)(?: are|'?re| r| a|)\s+(?:a |an )?(?:weirdo|freak|creep|dork|nerd|loser|idiot|clown|goofy|lame|cringe|ugly|stupid|dumb|trash|mid|annoying|boring|cooked|bot))\b/i;
export const FACTUAL_WORD_RE = /\b(?:who|when|where|why|which|how (?:to|do|does|did|many|much|long|old|far|tall|big))\b/i;
// A bare acknowledgement ("ah", "oh", "lol", "ok", "bruh", "damn", "nice") — almost always a reply to
// something Nexus just said. It deserves a few words back, never a paragraph or a roast.
const REACTION_RE = /^(?:(?:nexus|bro|bruh|dude|man|fam)[\s,]+)?(?:a+h+|o+h+|a+w+|o+k+(?:ay)?|k+|l+o+l+|lm+a+o+|ha+(?:ha)+|he+(?:he)+|bruh+|bro+|damn|dang|nice|true|facts?|fr(?:fr)?|bet|ig|mb|ya+|ye+a?h?|yep|yup|nah|nope|wow|ayy+|huh|hm+|mhm|ikr|real|fair|word|cool|aight|alr|ight|sheesh|dead|rip|oof|wtf|wth|omg|same|mood|ohh+|ahh+|hmm+|gg)[\s!?.,]*(?:(?:nexus|bro|bruh|dude|man|fam)[\s!?.]*)?$/i;
export function isReactionPrompt(text: string): boolean {
  const t = (text || '').trim();
  return !!t && t.length <= 20 && REACTION_RE.test(t);
}

export function isBasicChatPrompt(text: string): boolean {
  const t = (text || '').trim();
  if (!t) return false;
  const words = t.split(/\s+/).length;
  if (isReactionPrompt(t)) return true;
  if (words > 8 || FACTUAL_WORD_RE.test(t) || DEPTH_REQUEST_RE.test(t)) return false;
  if (CHAT_GREETING_ONLY_RE.test(t) || CHAT_PHRASE_RE.test(t) || isStatusReply(t)) return true;
  return words <= 7 && BASIC_CHAT_RE.test(t) && /\b(?:you|u|ur|your|yourself)\b/i.test(t);
}

// Filler interjections the swear floor staples around a short line ("goddamn, yep fr, hell, wyd?").
// A one-line chat answer reads human without them; swearing inside real phrases stays.
export function oneLineChat(text: string, ceiling = 130): string {
  let t = text.replace(/\s*\n+\s*/g, ' ').replace(/\s+Anyway,[\s\S]*$/i, '').trim();
  const first = splitSentencesSafe(t)[0] || t;
  let line = first.split(/\s*(?:;|—|–|,\s+(?:which|because|'?cause|since|like|and|but|so|while|as|except)\b)\s*/i)[0];
  if (line.length > ceiling) {
    const cut = line.slice(0, ceiling).lastIndexOf(', ');
    line = cut >= 12 ? line.slice(0, cut) : line.slice(0, ceiling).replace(/\s+\S*$/, '');
  }
  line = stripFillerInterjections(line).trim();
  if (line.length < 4) return text.trim();
  return /[.!?…'"]$/.test(line) ? line : line + '.';
}

function stripFillerInterjections(text: string): string {
  const parts = text.split(/,\s+/);
  const FILLER = /^(?:goddamn|damn|hell|shit|fuck|bloody hell|christ|jesus)[.!?]*$/i;
  const kept = parts.filter((p) => !FILLER.test(p.trim()));
  if (kept.length === 0) return text;
  let out = kept.join(', ').trim();
  out = out.replace(/[,\s]+$/, '');
  if (out && !/[.!?…'"]$/.test(out)) out += '.';
  return out;
}

function capRamblingReply(text: string, userPrompt: string): string {
  if (!text || !userPrompt) return text;
  if (/```/.test(text)) return text;
  const promptWords = userPrompt.trim().split(/\s+/).filter(Boolean).length;
  // A depth request / long question used to skip the cap entirely (unlimited). Patrick
  // (2026-09-29): "almost all the answers are still too fucking long" — so a real "explain how X
  // works" now gets more room (5 sentences) instead of no ceiling at all.
  const wantsDepth = DEPTH_REQUEST_RE.test(userPrompt) || promptWords > 26;

  let body = text.trim();
  let aside = '';
  const asideMatch = body.match(/(\s+)(Anyway,[\s\S]*)$/i);
  if (asideMatch && typeof asideMatch.index === 'number') {
    aside = ' ' + asideMatch[2].trim();
    body = body.slice(0, asideMatch.index).trim();
  }

  body = body.replace(/\s*\n+\s*/g, ' ').replace(/[ \t]+/g, ' ').trim();
  const sentences = splitSentencesSafe(body);
  if (sentences.length === 0) return text;

  // A token-budget cut (or the model just stopping) can leave a trailing half-sentence with no end
  // punctuation ("i'm currently eating a bag of stale crisp") — drop it when a complete sentence
  // precedes it, instead of shipping the fragment with a '.' stapled on.
  const isUnterminated = (t: string) => !/[.!?]["')\]]*$/.test(t);
  const clauseCut = (t: string): string | null => {
    const cut = Math.max(t.lastIndexOf(';'), t.lastIndexOf(' —'), t.lastIndexOf('—'), t.lastIndexOf(', '));
    return cut > 25 ? t.slice(0, cut).replace(/[\s,;—–-]+$/, '') + '.' : null;
  };
  if (sentences.length > 1 && isUnterminated(sentences[sentences.length - 1])) {
    const rest = sentences.slice(0, -1).join(' ');
    // Dropping the fragment must not leave just a short echo of the question ("damn, at least give
    // a guess?") — then keep the fragment's complete clauses instead.
    const salvaged = rest.length < 60 ? clauseCut(sentences[sentences.length - 1]) : null;
    if (salvaged) sentences[sentences.length - 1] = salvaged;
    else sentences.pop();
  } else if (sentences.length === 1 && isUnterminated(sentences[0])) {
    // A single run-on the budget cut mid-word ("...but if that passes for an answer, nah I don")
    // — end it at its last complete clause.
    const salvaged = clauseCut(sentences[0]);
    if (salvaged) sentences[0] = salvaged;
  }
  // Drop one leading content-free preamble sentence (short only — a long first sentence that
  // matches probably also carries the answer).
  if (sentences.length > 2 && sentences[0].length < 70 && PREAMBLE_SENTENCE_RE.test(sentences[0])) {
    sentences.shift();
  }
  if (sentences.length > 1 && RHETORICAL_OPENER_RE.test(sentences[0])) {
    sentences.shift();
  }
  // Drop trailing clarifier questions when the prompt was concrete (>2 words, i.e. not a bare
  // "wat" that genuinely needs a "better at what?").
  if (promptWords > 2) {
    while (sentences.length > 1 && TRAILING_CLARIFIER_RE.test(sentences[sentences.length - 1])) {
      sentences.pop();
    }
  }

  // A comparison question ("difference between X and Y", "X vs Y") legitimately needs to cover
  // both halves plus the contrast, so it gets more room than a single-subject "what is X" — but
  // still far below the 15-sentence essays this function exists to stop. Without this bump the
  // cap was chopping answers off after they'd only described X.
  const COMPARISON_RE = /\b(difference between|vs\.?|versus|compared? (?:to|with)|which is (?:better|worse)|better than)\b/i;
  // Tightened 4 -> 2 (2026-09-28) — Patrick's explicit, emphatic feedback: a Discord reply this
  // long is still too much even at 4 sentences ("1 SMALL SENTENCE IS WAYYY ENOUGH"). Paired with
  // the same trim on buildFinalDirectiveBody's own length directive (promptBuilder.ts) so the
  // model is asked for this length AND mechanically held to it, same two-layer pattern already
  // used for the swear floor — a prompt instruction alone wasn't reliable at 4, no reason to
  // expect it's reliable at 2 either without the mechanical cap actually enforcing it.
  // Depth/comparison 5 -> 3, casual/simple still 2 (2026-09-30, "90% of the time he still answers
  // big paragraphs" — see the CHAR_CEILING note below for why the character bound matters more).
  // Basic chat questions about Nexus himself ("are you gaming?", "you good?", "did you eat") get ONE
  // short slangy line ("nah, just chilling rn"), as the server asked (#feature-ideas, 2026-09-30).
  const isPcBuild = PC_BUILD_REQUEST_RE.test(userPrompt);
  const isBasicChat = !wantsDepth && !isPcBuild && isBasicChatPrompt(userPrompt);
  // A short Casseurt mention ("casseurt", "fuck casseurt") is the persona's crashout bit: long on purpose.
  const isCasseurtCrashout = !isBasicChat && promptWords <= 5 && /\bcasseurt\b/i.test(userPrompt) && !/\?/.test(userPrompt);
  // A PC-hardware question gets room for real numbers and the reason (4 sentences) instead of the 2-sentence chat cap.
  const isPcTopic = !isPcBuild && !isBasicChat && PC_TOPIC_RE.test(userPrompt) && promptWords >= 4;
  const MAX_SENTENCES = isPcBuild ? 6 : isPcTopic ? 4 : isCasseurtCrashout ? 7 : isBasicChat ? 1 : wantsDepth || COMPARISON_RE.test(userPrompt) ? 3 : 2;
  const CHAR_CEILING = isPcBuild ? 1000 : isPcTopic ? 620 : isCasseurtCrashout ? 900 : isBasicChat && isReactionPrompt(userPrompt) ? 45 : isBasicChat ? 110 : MAX_SENTENCES > 2 ? 450 : 260;
  const kept = sentences.length > MAX_SENTENCES ? sentences.slice(0, MAX_SENTENCES) : sentences;
  if (isBasicChat && kept.length === 1) {
    // A run-on glues extra thoughts on after ";" / "—": keep only the first.
    // ...and so does a ", which is ..." / ", because ..." tail ("shit, just chilling rn, which is fucking nice because...").
    let first = kept[0].split(/\s*(?:;|—|–|,\s+(?:which|because|'?cause|since|like|and|but|so|while|as|except)\b)\s*/i)[0];
    if (first.length > CHAR_CEILING) {
      const cut = first.slice(0, CHAR_CEILING).lastIndexOf(', ');
      if (cut >= 12) first = first.slice(0, cut);
    }
    if (first.length >= 8) kept[0] = /[.!?…]$/.test(first) ? first : first + '.';
  }
  // A sentence count alone doesn't bound length — gemma chains clauses with commas/semicolons/
  // dashes, so "5 sentences" measured live at 1043 chars ("explain how black holes form",
  // 2026-09-29). Drop trailing sentences until under a character ceiling (never below 1). The
  // separate "Anyway, ..." aside isn't counted — it's re-appended after.
  // 650/360 -> 450/260 (2026-09-30): real replies averaged ~300 chars even under the 2-sentence
  // cap because gemma chains clauses with ; and — into one run-on "sentence" — 3-4 lines in Discord.
  while (kept.length > 1 && kept.join(' ').length > CHAR_CEILING) kept.pop();
  // One run-on sentence can blow the ceiling on its own (the loop above never drops the last one).
  // Cut it at the last clause break (; — – or ", ") before the ceiling — those are where gemma
  // glues a second thought on, so the cut lands between thoughts rather than mid-idea.
  if (kept.length === 1 && kept[0].length > CHAR_CEILING * 1.25) {
    const head = kept[0].slice(0, CHAR_CEILING);
    const cut = Math.max(head.lastIndexOf(';'), head.lastIndexOf(' —'), head.lastIndexOf(' –'), head.lastIndexOf('—'), head.lastIndexOf(', '));
    if (cut > CHAR_CEILING * 0.4) kept[0] = head.slice(0, cut).replace(/[\s,;—–-]+$/, '') + '.';
  }
  let out = kept.join(' ').replace(/[ \t]+/g, ' ').trim();
  if (out && !/[.!?…"']$/.test(out)) out += '.';
  // A basic chat answer is just that line: no tacked-on "Anyway, ..." aside either.
  return (out + (isBasicChat ? '' : aside)).trim();
}

// Defensive scrub for a formal-draft response (buildCleanDraftSystemPrompt already tells the
// model not to swear, but a 4B local model isn't perfectly reliable — verified live it can still
// leak one stray mild interjection, e.g. a reply opening with "Hell," before an otherwise
// completely clean drafted email). Strips whole-word matches only (guards word boundaries so
// "class"/"assignment"/"hello" etc. are never touched) and tidies up the resulting punctuation.
function scrubSwearingForDraft(text: string): string {
  const words =
    /\b(fuck(ing|ed|er|s)?|shit(ty|s)?|damn(ed|it)?|goddamn(ed|it)?|hell|ass(hole)?|bitch(y|es)?|bastards?|crap(py)?|bloody|bugger(ed)?|knobheads?|wankers?|bollocks|plonkers?|bellends?|tossers?|twats?|piss(ed|y)?|arse(hole)?|dick(head)?|cunt|prick|slut|whore)\b/gi;
  return text
    .replace(words, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/^[,.\s]+/, '')
    .replace(/,\s*,/g, ',')
    .trim();
}

// The LLM's own compliance with the swearing directive is stochastic — a 3B model doesn't
// reliably hit "swear every response" 100% of the time, especially on short casual replies where
// there's less natural surface area for profanity to land. This guarantees a floor via the same
// word-substitution mechanism (not the old header/footer template-stamp, which was correctly
// killed) the legacy template pipeline already used, blending real swears into the ACTUAL
// generated sentence rather than bolting on a fixed phrase — safe to run on any LLM-generated
// text since (unlike the hand-written pool text infuseSwearyHumanVoice's conversational-category
// skip was protecting) it's already unique per request.
// The model sometimes talks about the reference text it was handed instead of just answering —
// seen in live replies (2026-09-30): "the context provided doesn't give any fucking details about
// barcelona winning the ucl", "no context shit here", "that shit context is a fucking mess",
// "this shit doesn't mention it". The grounded prompts now forbid it; this drops any sentence that
// still does. If nothing else is left, it becomes the persona's normal "don't know" line.
// Skipped when the user's own message is about context/sources, where the word is legitimate.
const CONTEXT_LEAK_RE =
  /\bcontext\b|\b(?:info(?:rmation)?|facts?|text|material|data|sources?)\s+(?:provided|given|above|below|i was given)\b|\b(?:provided|given)\s+(?:info(?:rmation)?|facts?|text|material|data|sources?)\b|\bbackground material\b|\b(?:it|this|that)(?:\s+(?:shit|crap|stuff|info))?\s+(?:doesn'?t|does not|don'?t|do not)\s+(?:\w+\s+)?(?:say|mention|give|tell|list|show|record|include)\b|\b(?:it|this|that)(?:\s+(?:shit|crap|stuff|info))?\s+(?:just\s+|only\s+)?(?:says|mentions|talks\s+about)\b/i;
const CONTEXT_LEAK_EXEMPT_PROMPT_RE = /\b(?:context|source|sources|facts?|material|provided)\b/i;
const CONTEXT_LEAK_DONT_KNOW = "nah i don't actually know that one, don't quote me.";

// Nexus mustn't keep announcing that he learned something (Patrick, 2026-09-30: an earlier learning
// attempt made the bot constantly bring up what it had "learned"). Facts from the learned corpus
// (src/ai-engine/learning) should read as things he just knows — only the phrase is cut, the fact
// stays: "someone told me that spain won" -> "spain won".
// First-person "I learned / found out" only counts when it introduces a fact ("i just learned that
// X", "i found out, X") — "i learned to code python in a week" is a real sentence.
// Longest phrases first: "from what y'all told me" / "according to what i learned" must go before
// the shorter "y'all told me" / "i learned," can match inside them.
const LEARNING_MENTION_RES = [
  /\b(?:(?:from|according\s+to)\s+what\s+(?:people|y'?all|you\s+guys|someone)\s+(?:said|told\s+me)|according\s+to\s+(?:my\s+)?(?:memory|what\s+i\s+learned|my\s+notes|my\s+database)|my\s+(?:learned\s+)?(?:memory|database|notes)\s+says(?:\s+that)?)[,:]?\s*/gi,
  /\b(?:so\s+)?i\s+(?:just\s+|recently\s+|literally\s+)?(?:learned|learnt|found\s+out|picked\s+up)(?:\s+that\b|\s*[,:])\s*/gi,
  /\b(?:some(?:one|body)\s+(?:here\s+|in\s+(?:here|the\s+chat)\s+)?(?:told|taught)\s+me|(?:you|y'?all|you\s+guys|people|the\s+chat)\s+(?:told|taught)\s+me|i\s+was\s+told|i\s+heard\s+from\s+(?:someone|y'?all|you\s+guys))(?:\s+that\b)?[,:]?\s*/gi,
];

// Patrick (2026-09-30): "Nexus almost always talks about Casseurt/Patrick coding him in his
// answers — only when it's necessary, asked, or a funny example." The prompts used to push it
// ("roast him at every chance", "a jab at the topic or at Casseurt"); those are fixed, and this is
// the mechanical backstop: when the user's message isn't about him, a mention in the reply survives
// only occasionally (the rare funny comparison) — otherwise the clause carrying it is cut
// (", which is as predictable as Patrick's coding habits"), or the sentence if it's all about him.
const CREATOR_NAME_RE = /\b(?:casseurt|patrick|patrik)(?:'s)?\b/i;
// No trailing \b: JS's \b treats accented letters as non-word characters, so "qui t'a créé" (the
// "é" at the end of the phrase) never matched and the limiter cut the creator's name out of the
// answer to "who made you?" in French (caught by the live suite, 2026-09-30).
const ABOUT_CREATOR_RE =
  /\b(?:casseurt|casseur|patrick|patrik|your\s+(?:creator|dev|developer|maker|owner|dad|father)|who\s+(?:made|created|built|coded|programmed|owns)\s+(?:you|u)|qui\s+t'?a\s+(?:cr[ée]{1,2}|fait|cod[ée]|programm[ée])|ton\s+(?:cr[ée]ateur|dev|p[èe]re))(?![a-zà-ÿ])/i;
export const UNPROMPTED_CREATOR_MENTION_KEEP_RATE = 1 / 6;

// A question about another Patrick (SpongeBob's Patrick Star, St. Patrick...) is not about the
// creator: "Patrick" in the answer is fine there, "Casseurt built me..." is not.
const OTHER_PATRICK_CONTEXT_RE = /\b(?:sponge\s*bob|bikini\s+bottom|patrick\s+star|squidward|krusty|starfish|saint\s+patrick|st\.?\s+patrick|patrick\s+(?!(?:is|was|from|coded|made|built|the)\b)[a-z]{3,})\b/i;
const CASSEURT_ONLY_RE = /\b(?:casseurt(?:'s)?|my\s+creator|(?:coded|built|made|created)\s+me)\b/i;

export function stripUnpromptedCreatorMentions(text: string, userPrompt?: string, random: () => number = Math.random): string {
  if (!text || !userPrompt) return text;
  const otherPatrick = OTHER_PATRICK_CONTEXT_RE.test(userPrompt);
  const nameRe = otherPatrick ? CASSEURT_ONLY_RE : CREATOR_NAME_RE;
  if (!nameRe.test(text)) return text;
  if (!otherPatrick && ABOUT_CREATOR_RE.test(userPrompt)) return text;
  if (otherPatrick && /\bcasseurt\b/i.test(userPrompt)) return text;
  if (random() < UNPROMPTED_CREATOR_MENTION_KEEP_RATE) return text;
  const sentences = splitSentencesSafe(text);
  const kept: string[] = [];
  for (const sentence of sentences) {
    if (!nameRe.test(sentence)) {
      kept.push(sentence);
      continue;
    }
    // Drop only the clause(s) naming him; keep the rest of the sentence when it still says something.
    const parts = sentence.split(/(,\s+|;\s+|\s+[—–-]\s+|—)/);
    const clauses: string[] = [];
    for (let i = 0; i < parts.length; i += 2) {
      if (!nameRe.test(parts[i])) clauses.push(parts[i] + (parts[i + 1] ?? ''));
    }
    let rebuilt = clauses.join('').replace(/[\s,;:—–-]+$/, '').trim();
    rebuilt = rebuilt.replace(/\s+(?:which\s+is|like|as)\s*$/i, '').trim();
    if (rebuilt.length >= 20) kept.push(/[.!?]$/.test(rebuilt) ? rebuilt : `${rebuilt}${/[!?]$/.test(sentence) ? sentence.slice(-1) : '.'}`);
  }
  const out = kept.join(' ').trim();
  return out.length >= 15 ? out : text;
}

export function stripLearningMentions(text: string): string {
  if (!text) return text;
  let out = text;
  for (const re of LEARNING_MENTION_RES) out = out.replace(re, '');
  out = out.replace(/\s{2,}/g, ' ').trim();
  return out || text;
}

export function stripContextLeaks(text: string, userPrompt?: string): string {
  if (!text || /```/.test(text)) return text;
  if (userPrompt && CONTEXT_LEAK_EXEMPT_PROMPT_RE.test(userPrompt)) return text;
  if (!CONTEXT_LEAK_RE.test(text)) return text;
  const sentences = splitSentencesSafe(text, { splitOnNewline: true });
  const kept = sentences.filter((x) => !CONTEXT_LEAK_RE.test(x));
  // Casual chat ("wanna play ranked?", "yeah ig we will") has no fact to be unsure about: "i don't
  // actually know that one, don't quote me" there reads as the bot being confused (Patrick,
  // 2026-10-01). Keep what is left, or a tiny natural line when nothing is.
  const casualChat = !!userPrompt && userPrompt.trim().split(/\s+/).length <= 14 && !FACTUAL_WORD_RE.test(userPrompt) && /\b(?:you|u|ur|we|i|i'm|im|me|my|lol|lmao|ig|tbh|bro|bruh|yeah|yep|nah|idk|ok|okay|wanna|lets|let's|fr)\b/i.test(userPrompt);
  if (kept.length === 0) return casualChat ? 'wait what lol' : CONTEXT_LEAK_DONT_KNOW;
  if (casualChat) return kept.join(' ');
  const rest = kept.join(' ');
  // What's left after the leak is often just the opening insult ("damn, you absolute bellend, i'm
  // pissed off enough already.") — no answer at all. Say "don't know" instead of ending on nothing.
  return rest.length < 80 ? `${rest} ${CONTEXT_LEAK_DONT_KNOW}` : rest;
}

// Chat abbreviations are mandatory (Patrick, 2026-10-01: "if he can use an abbreviation like rn instead
// of right now, he HAS to"). Whole words only, case-insensitive, never inside quoted text or code, and
// never in formal drafts. Longest phrases first.
const ABBREVIATIONS: Array<[RegExp, string | ((m: string, ...g: string[]) => string)]> = [
  [/\bi don'?t give a (?:fuck|shit|damn)\b/gi, 'idgaf'], [/\bgot to go\b/gi, 'gtg'], [/\bgotta go\b/gi, 'gtg'], [/\blet me know\b/gi, 'lmk'], [/\bhit me up\b/gi, 'hmu'],
  [/\bbe back later\b/gi, 'bbl'], [/\bof course\b/gi, 'ofc'], [/\bat the moment\b/gi, 'atm'], [/\bi swear to god\b/gi, 'istg'], [/\bbe for real\b/gi, 'bffr'],
  [/\bfor your information\b/gi, 'fyi'], [/\byou know what i mean\b/gi, 'ykwim'], [/\bin case you didn'?t know\b/gi, 'icydk'], [/\bnot safe for work\b/gi, 'nsfw'],
  [/\bwhat the heck\b/gi, 'wth'], [/\bboyfriend\b/gi, 'bf'], [/\bgirlfriend\b/gi, 'gf'], [/\bbirthday\b/gi, 'bday'], [/\bcongratulations\b/gi, 'congrats'],
  [/\binformation\b/gi, 'info'], [/\bpictures\b/gi, 'pics'], [/\bpicture\b/gi, 'pic'], [/\bphotos?\b/gi, 'pic'], [/\bminutes\b/gi, 'mins'], [/\bseconds\b/gi, 'secs'],
  [/\bweekend\b/gi, 'wknd'], [/\babout\b/gi, 'abt'], [/\byou know\b/gi, 'ya know'], [/\bnothing\b/gi, 'nothin'], [/\beverything\b/gi, 'everythin'],
  [/\bgoing\b(?! to\b)/gi, 'goin'], [/\b(do|chill|play|look|talk|eat|watch|game|scroll|think|sleep|wait|work|be|sit|lay|stay|hang|run)ing\b/gi, (_m: string, v: string) => (v.toLowerCase() === 'be' ? 'bein' : v.toLowerCase().endsWith('e') && v.length > 2 && !/^(be)$/.test(v) ? `${v.slice(0, -1)}in` : `${v}in`) as string],
  [/\bwhat'?s up\b/gi, 'wsp'], [/\bwhat is up\b/gi, 'wsp'], [/\bi have no idea\b/gi, 'idk'], [/\bno idea\b/gi, 'idk'], [/\boh my gosh\b/gi, 'omg'],
  [/\bto be fair\b/gi, 'tbf'], [/\bin my honest opinion\b/gi, 'imho'], [/\bif i remember correctly\b/gi, 'iirc'], [/\bjust kidding\b/gi, 'jk'],
  [/\bjust saying\b/gi, 'js'], [/\bas soon as possible\b/gi, 'asap'], [/\balso known as\b/gi, 'aka'], [/\bwhat do you think\b/gi, 'wdyt'],
  [/\bi don'?t even know\b/gi, 'idek'], [/\bi don'?t care\b/gi, 'idc'], [/\bgood luck\b/gi, 'gl'], [/\bhave fun\b/gi, 'hf'], [/\bgood game\b/gi, 'gg'],
  [/\bwell played\b/gi, 'wp'], [/\bhappy birthday\b/gi, 'hbd'], [/\brest in peace\b/gi, 'rip'], [/\bshaking my head\b/gi, 'smh'],
  [/\baway from keyboard\b/gi, 'afk'], [/\bdon'?t worry\b/gi, 'dw'], [/\bno worries\b/gi, 'nw'], [/\bno problem\b/gi, 'np'], [/\byou'?re welcome\b/gi, 'yw'],
  [/\bthank you\b/gi, 'ty'], [/\bfor sure\b/gi, 'fs'], [/\byou all\b/gi, 'yall'], [/\by'?all\b/gi, 'yall'], [/\bgive me\b/gi, 'gimme'], [/\blet me\b/gi, 'lemme'],
  [/\bcome on\b/gi, 'cmon'], [/\bshould have\b/gi, 'shoulda'], [/\bcould have\b/gi, 'coulda'], [/\bwould have\b/gi, 'woulda'], [/\bout of\b/gi, 'outta'],
  [/\ba lot\b/gi, 'alot'], [/\babout to\b/gi, 'bout to'], [/\btrying to\b/gi, 'tryna'], [/\bi am\b/gi, 'im'], [/\bsomething\b/gi, 'smth'],
  [/\breally\b/gi, 'rly'], [/\bespecially\b/gi, 'esp'], [/\bbefore\b/gi, 'b4'], [/\bit'?s\b/gi, 'its'], [/\bwith you\b/gi, 'w u'],
  [/\bright now\b/gi, 'rn'], [/\bto be honest\b/gi, 'tbh'], [/\bnot gonna lie\b/gi, 'ngl'], [/\bnot going to lie\b/gi, 'ngl'],
  [/\bfor real\b/gi, 'fr'], [/\bi do not know\b/gi, 'idk'], [/\bi don'?t know\b/gi, 'idk'], [/\bi know right\b/gi, 'ikr'],
  [/\bby the way\b/gi, 'btw'], [/\bin my opinion\b/gi, 'imo'], [/\bwhat are you doing\b/gi, 'wyd'], [/\bwhat are you up to\b/gi, 'wyd'],
  [/\bhow are you\b/gi, 'hru'], [/\boh my god\b/gi, 'omg'], [/\bas far as i know\b/gi, 'afaik'], [/\blaughing my ass off\b/gi, 'lmao'],
  [/\bfor what it'?s worth\b/gi, 'fwiw'], [/\bi guess\b/gi, 'ig'], [/\bsee you later\b/gi, 'cya'], [/\btalk to you later\b/gi, 'ttyl'],
  [/\bbecause\b/gi, 'cuz'], [/\bthough\b/gi, 'tho'], [/\bpeople\b/gi, 'ppl'], [/\bplease\b/gi, 'pls'], [/\bthanks\b/gi, 'thx'],
  [/\bokay\b/gi, 'ok'], [/\bgoing to\b/gi, 'gonna'], [/\bwant to\b/gi, 'wanna'], [/\bgot to\b/gi, 'gotta'], [/\bkind of\b/gi, 'kinda'],
  [/\bsort of\b/gi, 'sorta'], [/\bwhat about you\b/gi, 'wbu'], [/\bhow about you\b/gi, 'hbu'], [/\band you\b/gi, 'and u'],
  [/\bi love you\b/gi, 'ily'], [/\bgood night\b/gi, 'gn'], [/\bgood morning\b/gi, 'gm'], [/\bmy bad\b/gi, 'mb'], [/\bnever ?mind\b/gi, 'nvm'],
  [/\bin real life\b/gi, 'irl'], [/\bbe right back\b/gi, 'brb'], [/\blaughing out loud\b/gi, 'lol'], [/\bwhat the fuck\b/gi, 'wtf'],
  [/\bwhat the hell\b/gi, 'wth'], [/\bshut the fuck up\b/gi, 'stfu'], [/\bfuck my life\b/gi, 'fml'], [/\bi can'?t lie\b/gi, 'icl'],
  [/\bon god\b/gi, 'ong'], [/\bi'?m not sure\b/gi, 'idk'], [/\bwithout\b/gi, 'w/o'], [/\btomorrow\b/gi, 'tmrw'], [/\btonight\b/gi, 'tn'],
  [/\bmessage(s?)\b/gi, 'msg$1'], [/\bprobably\b/gi, 'prob'], [/\bdefinitely\b/gi, 'def'], [/\bwhatever\b/gi, 'wtv'],
  [/\bseriously\b/gi, 'srsly'], [/\bobviously\b/gi, 'obv'], [/\bhonestly\b/gi, 'tbh'], [/\balright\b/gi, 'aight'], [/\bgot you\b/gi, 'got u'],
  [/\bsee you\b/gi, 'cya'], [/\bi'?m\b/gi, 'im'], [/\bdon'?t\b/gi, 'dont'], [/\bcan'?t\b/gi, 'cant'], [/\bdidn'?t\b/gi, 'didnt'],
  [/\bdoesn'?t\b/gi, 'doesnt'], [/\bisn'?t\b/gi, 'isnt'], [/\bwon'?t\b/gi, 'wont'], [/\bthat'?s\b/gi, 'thats'], [/\bwhat'?s\b/gi, 'whats'],
  [/\blet'?s\b/gi, 'lets'], [/\bi'?ll\b/gi, 'ill'], [/\bi'?ve\b/gi, 'ive'], [/\bno(?=[,.!]|\s*$)/g, 'nah'],
  [/\byou're\b/gi, 'ur'], [/\byou’re\b/gi, 'ur'], [/\byour\b/gi, 'ur'], [/\byou\b/gi, 'u'],
];
export function abbreviateChat(text: string): string {
  if (!text || /```/.test(text) || looksFrench(text) || looksPolish(text)) return text;
  // Quoted text (song titles, quotes) is left exactly as written.
  return text
    .split(/("[^"]*"|“[^”]*”)/)
    .map((part, i) => (i % 2 === 1 ? part : ABBREVIATIONS.reduce((acc, [re, to]) => acc.replace(re, to as string), part)))
    .join('');
}

export function topUpLlmSwearing(text: string, settings: AISettings, isCrashout: boolean, userPrompt?: string, suppressSwearing: boolean = false): string {
  // Stray HTML the model sometimes leaks ("...or somethin?</blockquote>.") never belongs in a Discord message.
  const noTags = text.replace(/<\/?(?:blockquote|p|br|b|i|u|em|strong|span|div|li|ul|ol|code|pre|h[1-6])\b[^>]*>/gi, ' ').replace(/[ \t]{2,}/g, ' ').replace(/\s+([.,!?])/g, '$1');
  const out = topUpLlmSwearingCore(noTags, settings, isCrashout, userPrompt, suppressSwearing);
  return suppressSwearing ? out : abbreviateChat(out);
}

function topUpLlmSwearingCore(text: string, settings: AISettings, isCrashout: boolean, userPrompt?: string, suppressSwearing: boolean = false): string {
  // gemma sometimes spells the creator's nickname "cassseurt" (triple s) — seen 2/18 live samples.
  text = text.replace(/\b([Cc])as{3,}eurt/g, '$1asseurt');
  text = stripLearningMentions(text);
  text = stripUnpromptedCreatorMentions(text, userPrompt);
  text = stripContextLeaks(text, userPrompt);
  if (userPrompt) text = capRamblingReply(text, userPrompt);
  // One-line chat answers are returned as the model wrote them: no stapled swear floor / filler / aside.
  if (userPrompt && !suppressSwearing && isBasicChatPrompt(userPrompt) && !DEPTH_REQUEST_RE.test(userPrompt)) {
    return stripFillerInterjections(flattenListFormatting(text).trim());
  }
  // Formal draft request (email/text/essay the user will actually send) — none of the swear-floor
  // machinery below should run at all; the system prompt already told the model not to swear in
  // the drafted content (see buildFinalDirective's suppressSwearing branch). scrubSwearingForDraft
  // is a defensive net on top of that in case the model leaks something anyway.
  if (suppressSwearing) return scrubSwearingForDraft(flattenListFormatting(text).trim());
  // Collapse any front-stacked interjection clump the model produced ("bloody hell, shit, fuck,
  // right, listen up, ...") BEFORE the floor logic runs, so the swear volume gets rebuilt inline
  // by enhanceNaturalSwearPhrasing / forceSwearFloor instead of staying piled at the start.
  // Patrick's explicit ask: swear more than a real person, never as a stacked opener.
  const uncensored = deStackLeadingInterjections(uncensorProfanity(flattenListFormatting(text)));
  const intensity = settings.swearIntensity || 'unhinged';
  if (!isCrashout && intensity !== 'unhinged' && intensity !== 'heavy') return uncensored;
  const substituted = enhanceNaturalSwearPhrasing(uncensored, isCrashout ? 'unhinged' : intensity);
  if (!(isCrashout || intensity === 'unhinged')) return substituted;
  // French replies from gemma3 are short and don't self-swear much, so a floor of 5 forced
  // forceSwearFloor to staple 4+ sacres and — with almost no sentence breaks in a 2-line
  // reply to spread them across — they piled up at the very front ("tabarnak, câlisse, criss,
  // ostie, ..."). A lower floor for French keeps it heavy without the mechanical front-pile.
  const isFrenchReply = looksFrench(substituted);
  // gemma3's French keeps reaching for continental swears (putain, merde, bordel) despite the
  // prompt — scrub them to Québécois equivalents. Word-boundary guarded so "connais"/"contre"
  // stay intact.
  const deFranced = isFrenchReply
    ? substituted
        .replace(/\bputain\b/gi, 'tabarnak')
        .replace(/\bmerde\b/gi, 'marde')
        .replace(/\bbordel\b/gi, 'criss de bordel')
        .replace(/\bconnard\b/gi, 'trou de cul')
        .replace(/\bt'?es un con\b/gi, "t'es un cave")
    : substituted;
  const floor = isFrenchReply ? 2 : swearFloorForIntensity(intensity, isCrashout);
  const swornUp = deStackLeadingInterjections(forceSwearFloor(deFranced, floor));
  // forceChaoticOvershare now has its own Polish pool and picks it based on the text's own
  // language, so this applies to both languages symmetrically — Polish never got the LLM
  // INSTRUCTION for this bit (buildPolishSystemPrompt's own comment explains why: the fuller
  // English instruction stack previously confused the model into echoing instructions back on
  // Polish output), but that risk is specific to asking the model to invent this itself as one
  // more thing in an already-loaded prompt. This is pure mechanical post-processing with no
  // prompt involved, so it carries none of that risk and can safely cover both languages.
  return forceChaoticOvershare(swornUp);
}

// "CAPS LOCK ON" (triggered/meltdown mode) was only ever an instruction — nothing mechanically
// enforced it, and the model doesn't reliably keep every single word capitalized while "shouting".
// Observed live: a clapback reply mixed full-caps sentences with stray lowercase words scattered
// through it ("GO THE fuck AWAY... PIECE OF shit POLISH BITCH"), reading as broken formatting
// instead of a deliberate stylistic choice. Applied as the LAST step (after all swear processing)
// so every word — LLM-generated or code-inserted — ends up consistently uppercase. Skips fenced
// code blocks so this can never corrupt code syntax, though a clapback reply containing one is
// unlikely in practice.
export function toShoutCase(text: string): string {
  const blocks: string[] = [];
  const protectedText = text.replace(/```[\s\S]*?```/g, (m) => {
    blocks.push(m);
    return `__CODE_${blocks.length - 1}__`;
  });
  return protectedText.toUpperCase().replace(/__CODE_(\d+)__/g, (_m, i) => blocks[Number(i)]);
}
