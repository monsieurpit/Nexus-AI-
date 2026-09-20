// Post-process pipeline — the mechanical "guarantee" layer applied on top of raw LLM output, split
// out of the old monolithic reasoningEngine.ts (2026-09-20). This exists because instruction-
// following alone plateaued for several things (swear floor, list formatting, reply length) — see
// each function's own comment for the specific live case that proved the prompt-only approach
// wasn't reliable enough on gemma3:4b/nexus-4b. No behavior change from the split — every regex,
// threshold, and comment carried over verbatim. Order matters where these compose (see
// topUpLlmSwearing's own body): list-flatten -> de-stack interjections -> swear substitution ->
// swear floor -> chaotic overshare -> (caller applies toShoutCase last, if triggered).

import { looksFrench } from '../localLlmClient';
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

function capRamblingReply(text: string, userPrompt: string): string {
  if (!text || !userPrompt) return text;
  if (/```/.test(text)) return text;
  const promptWords = userPrompt.trim().split(/\s+/).filter(Boolean).length;
  if (DEPTH_REQUEST_RE.test(userPrompt) || promptWords > 26) return text;

  let body = text.trim();
  let aside = '';
  const asideMatch = body.match(/(\s+)(Anyway,[\s\S]*)$/i);
  if (asideMatch && typeof asideMatch.index === 'number') {
    aside = ' ' + asideMatch[2].trim();
    body = body.slice(0, asideMatch.index).trim();
  }

  body = body.replace(/\s*\n+\s*/g, ' ').replace(/[ \t]+/g, ' ').trim();
  const sentences = (body.match(/[^.!?]+(?:[.!?]+|$)/g) || [body]).map((s) => s.trim()).filter(Boolean);
  if (sentences.length === 0) return text;

  // Drop one leading content-free preamble sentence (short only — a long first sentence that
  // matches probably also carries the answer).
  if (sentences.length > 2 && sentences[0].length < 70 && PREAMBLE_SENTENCE_RE.test(sentences[0])) {
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
  const MAX_SENTENCES = COMPARISON_RE.test(userPrompt) ? 6 : 4;
  const kept = sentences.length > MAX_SENTENCES ? sentences.slice(0, MAX_SENTENCES) : sentences;
  let out = kept.join(' ').replace(/[ \t]+/g, ' ').trim();
  if (out && !/[.!?…"']$/.test(out)) out += '.';
  return (out + aside).trim();
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
export function topUpLlmSwearing(text: string, settings: AISettings, isCrashout: boolean, userPrompt?: string, suppressSwearing: boolean = false): string {
  if (userPrompt) text = capRamblingReply(text, userPrompt);
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
