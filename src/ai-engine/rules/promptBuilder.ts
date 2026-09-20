// System-prompt assembly — the single consolidated builder plus its EN/PL/FR forks, split out of
// the old monolithic reasoningEngine.ts (2026-09-20). buildSystemPrompt() is the ONE place that
// concatenates persona voice + knowledge instruction + final directive into what actually gets
// sent to Ollama — every call site in this codebase routes through it (see its own comment for
// why the language forks stay separate rather than unified: that was already tried and found to
// break output on a small local model). No behavior change from the split — every regex,
// threshold, and comment carried over verbatim.

import { AISettings, ModelPersona } from '../../types';
import { getMoodDirective, getMoodPrimacyPrefix } from './mood';
import { retrieveVoiceExamples, formatVoiceExamplesBlock } from '../voiceExampleRetrieval';

// reasoningMode used to be entirely cosmetic for prompting purposes: 'fast' and 'thorough' built
// the exact same system prompt and only 'deep-cot' differed at all, and even then only by adding
// extra RETRIEVAL passes upstream (broader search, multi-hop entity tracing) — the model itself
// never got a different instruction between any of the three modes. A user picking "Thorough" or
// "Deep Chain-of-Thought" in the customizer got literally the same generation behavior as "Fast".
// This directive is the actual behavioral difference: 'fast' gets nothing extra (unchanged from
// before — several personas default to it specifically for snappy replies, and it should stay
// that way). 'thorough' asks for a brief internal step-by-step pass before answering. 'deep-cot'
// asks for the same thing more explicitly (multiple angles, then reconcile) — kept short and
// scoped even for deep-cot rather than a long scratchpad-exposing instruction, since this
// codebase has repeatedly found that a small 3B model given a long, complex prompt gets confused
// and starts echoing instructions back instead of following them (see buildPolishSystemPrompt's
// comment for the same lesson learned the hard way on the Polish path).
function buildReasoningModeInstruction(reasoningMode: AISettings['reasoningMode']): string {
  if (reasoningMode === 'deep-cot') {
    // deep-cot used to mean "run this on the 12B model" — chatModel() (localLlmClient.ts) now
    // pins ALL chat generation to the small model regardless of reasoningMode, so this instruction
    // is what deep-cot actually IS now: noticeably more extensive reasoning than 'thorough' below,
    // to make up the quality gap a bigger model used to cover. Genuinely more steps, not just
    // longer wording for the same amount of thinking.
    return "\n\nReasoning directive: before answering, really work through this in your head — state what's actually being asked in your own terms, consider at least two or three genuinely different angles or possible answers (not just one obvious one), actively look for a reason each one could be wrong or incomplete, check whether two similar-sounding facts are being confused, then reconcile all of that into ONE clear final answer. This deserves more real thought than a quick take. Don't show this thinking process or number it out loud, just let the final answer be visibly better for having done the fuller work.";
  }
  if (reasoningMode === 'thorough') {
    return "\n\nReasoning directive: think this through properly before you answer. In your head, work through the actual steps or facts it takes to get this right, check whether the obvious first answer is actually correct or is missing something, and consider whether two similar-looking facts are being confused. THEN give one clear, correct final answer. Don't show or number the thinking out loud — just make the answer genuinely better for having done the work, not a guess.";
  }
  // 'fast' used to get NO reasoning instruction at all (empty string) — found live (2026-09-17)
  // via Ollama's own per-request timing logs that this let the model's thinking channel default to
  // a full multi-point structured plan every single reply (mood check, persona check, structure,
  // swearing, joke, TMI — genuinely several hundred tokens of it), even for a trivial "yo whats up".
  // Since generation speed here is fixed at ~26 tokens/sec regardless of what's being generated,
  // that unconstrained thinking was directly costing 15-25+ real seconds on every casual reply, not
  // the actual reply content. This one line caps it explicitly WITHOUT turning thinking off
  // entirely (Patrick separately asked to keep real thinking visible in the reasoning-trace panel)
  // — a brief, real thought is still genuinely happening and still shown, it's just no longer
  // allowed to sprawl into an unbounded structured plan for a two-sentence answer.
  return "\n\nKeep your internal thinking brief — a quick sentence or two is genuinely enough, not a full structured plan. Then answer.";
}

// Patrick asked to actually SEE the model's real internal reasoning in the reasoning-trace panel
// instead of only the synthetic pipeline steps (intent detection, retrieval, etc.). The first
// version of this asked the model to wrap its reasoning in <thinking></thinking> tags inside the
// visible text, then regex-extracted that block back out — a real hack, because Gemma 4 (unlike
// Gemma 3) turned out to have a genuinely separate native thinking channel of its own the whole
// time (Ollama's response carries it as message.thinking, distinct from message.content). Prompt-
// coaxing a tag format was not only unnecessary but risked confusing the model into splitting its
// output unpredictably between the tag-wrapped text and its own native channel — this is very
// likely what caused a real live bug where some replies came back completely empty (the model's
// whole token budget went to the native thinking channel with nothing left for content). Now:
// localLlmClient.ts's `think: true` option on the generate() call is what actually turns this on,
// and the result's own `.thinking` field carries the text directly — no prompt wording needed at
// all, and buildReasoningModeInstruction above still shapes WHAT the model reasons about either
// way, native channel or not.

// Condensed again for gemma3 (was ~5x this for the original narrative version, then trimmed once
// for the qwen latency pass). gemma3:4b follows a plain instruction the first time — it does not
// need each rule spelled out with a worked example and restated framing the way qwen2.5:3b did.
// Prefill cost is still real and roughly linear in token count on this hardware, so every word
// cut here is latency saved on every reply. Every rule is still present, just stated once.
// Re-verify against regressionCheck.ts (esp. the list-flattening and language-routing live
// checks) after any further edit here.
function buildLlmKnowledgeInstruction(reasoningMode: AISettings['reasoningMode']): string {
  return (
    "\n\nAnswer accurately and specifically — never vague, never dodge a real question with a joke instead of answering it. If you genuinely don't know something current, say so briefly in character and stop, don't invent a tangent to fill space. For an abstract/technical topic, one concrete everyday analogy is fine if it helps." +
    buildReasoningModeInstruction(reasoningMode) +
    "\n\nWrite it as one flowing chat message, not a report: no bullet points, no numbered lines, no \"**Word** - explanation\" breakdowns, no essay transitions (\"furthermore\", \"in conclusion\"), and don't restate their question back — pick the core point and stop. Reply entirely in the language the user wrote in, the whole way through. Never describe your own model/database/technique even if asked — deflect in character; use earlier context freely but don't announce it (\"I remember you said...\") unless asked. Roughly 1 reply in 4 (never on fast casual back-and-forth), end with ONE genuine question specific to what they asked, never a generic \"what do you think?\"."
  );
}

// Swearing, chaotic/absurd personality, voice (calm vs meltdown), and the slur prohibition used to
// be four separate appended blocks. That meant only ONE of them could hold the "most recent
// instruction" spot that matters most for small-model compliance — putting safety last (to stop
// slurs during a meltdown) pushed the swearing directive out of that spot and swearing frequency
// visibly dropped; putting swearing last (to keep it heavy) is what let slurs slip through before
// that. Merging them into one cohesive trailing block means they're not competing for recency at
// all — everything that matters is in the same last paragraph. Also restores the wildly
// unpredictable/absurd energy that "write in normal sentence case, not shouting" accidentally
// flattened out along with the shouting itself.
// Wraps buildFinalDirectiveBody so the mood directive (artificial "feelings" — see rules/mood.ts)
// gets appended exactly once regardless of which of the four return branches below fires, instead
// of threading it into each one separately.
// Patrick's explicit ask: Nexus should swear heavily everywhere EXCEPT when the user is actually
// asking it to draft something they'll send/submit elsewhere verbatim (an email, a text to send
// someone, an essay, a cover letter) — a crude first draft of an email is actually useless to
// hand someone, unlike normal chat where the swearing IS the point. Deliberately narrow: matches
// "write/draft/compose (me) a/an <artifact> (to/for/about...)" shapes, not just any mention of
// the word "email"/"essay" in passing (asking "what's an essay" or "my email got hacked" must NOT
// suppress swearing — those aren't drafting requests).
export function isFormalDraftRequest(text: string): boolean {
  const artifact = '(e-?mails?|texts?( messages?)?|messages?|essays?|letters?|cover letters?|resumes?|cvs?|courriels?|lettres?|dissertations?|r[ée]dactions?)';
  const verb = '(write|draft|compose|send|type|help( me)?( with)? (writing|drafting|composing))|([ée]cri[rst]|r[ée]dige[rz]?)';
  const pattern = new RegExp(`\\b(${verb})\\b[^.!?\\n]{0,25}\\b${artifact}\\b`, 'i');
  return pattern.test(text);
}

// A late appended "don't swear THIS time" exception, tacked onto the end of the full crude
// crashout persona prompt, was tried first and verified live NOT to reliably hold: gemma3:4b kept
// leaking crude British insults ("right, you plonker, don't waste my time with this rubbish")
// into the drafted content anyway. The persona prompt's own pervasive crude-voice framing
// ("CRUDE OVERSHARING is part of your voice", "Swear HEAVILY... no exceptions, even short ones")
// dominated a small model's instruction-following even with my exception as the literal last
// paragraph. Replacing the ENTIRE system prompt with a clean, non-crude one for this one call —
// rather than trying to out-argue the crude persona — is what actually holds up live.
function buildCleanDraftSystemPrompt(settings: AISettings): string {
  return (
    "You are Nexus, a capable writing assistant. The user is asking you to draft an actual document they intend to send or submit as-is — an email, text message, essay, letter, or similar. Write it directly, in clean, professional or appropriately warm language matching what they asked for — absolutely no profanity, slurs, or crude insults anywhere in your reply, including any framing comment before or after the draft itself. Be genuinely helpful and get straight to the actual draft; a short one-line intro before it (e.g. \"Here you go:\") is fine, but keep it plain and clean too. Reply entirely in the language the user wrote in."
    + getMoodDirective(false)
  );
}

function buildFinalDirective(settings: AISettings, isCrashout: boolean, triggered: boolean, suppressSwearing: boolean = false): string {
  if (suppressSwearing) return '';
  return buildFinalDirectiveBody(settings, isCrashout, triggered) + getMoodDirective(false);
}

// The single source of truth for the system prompt sent to Ollama. Used to be independently
// concatenated inline at every call site (llmSituationalReplyOrFallback, llmGroundedOrFallback's
// first attempt and its retry, plus a fourth simplified copy in getSystemPromptCharCount) — easy
// to have one of them drift out of sync with the others when a directive gets added. Same
// language/draft-suppression priority as before: suppressSwearing > Polish > French > English.
//
// Async now (was sync) — the "HOW A REAL PERSON ANSWERS" few-shot block used to be hardcoded
// verbatim into persona.systemPrompt (same 3 examples every reply, see memoryStore.ts's history);
// it's now retrieved dynamically per the actual `prompt` here via voiceExampleRetrieval.ts, from
// an 80+ example bank spanning far more topics than 3 fixed examples ever could. `prompt` is
// optional and retrieval is skipped entirely when it's empty (getSystemPromptCharCount's size-
// budget test doesn't have a real user message to retrieve against, and doesn't need one — a
// worst-case size estimate is what that test actually cares about, not real relevance).
export async function buildSystemPrompt(
  persona: ModelPersona,
  settings: AISettings,
  isCrashout: boolean,
  triggered: boolean,
  suppressSwearing: boolean,
  usePolish: boolean,
  useFrench: boolean,
  prompt: string = ''
): Promise<string> {
  if (suppressSwearing) return buildCleanDraftSystemPrompt(settings);
  if (usePolish) return getMoodPrimacyPrefix('pl') + buildPolishSystemPrompt(isCrashout);
  const voiceExamplesBlock = prompt
    ? formatVoiceExamplesBlock(await retrieveVoiceExamples(prompt, 3))
    : '';
  if (useFrench) return getMoodPrimacyPrefix('fr') + buildFrenchSystemPrompt(isCrashout, settings.reasoningMode) + voiceExamplesBlock;
  return (
    getMoodPrimacyPrefix('en') +
    persona.systemPrompt +
    buildLlmKnowledgeInstruction(settings.reasoningMode) +
    buildFinalDirective(settings, isCrashout, triggered, suppressSwearing) +
    voiceExamplesBlock
  );
}

// Wave 9 (automated "sounds human" watchdog): the exact prompt-bloat problem that cost the earlier
// latency fix (see localLlmClient.ts's LATENCY_DEBUG comment) — this session's own directive
// additions quietly grew a confident-grounded-answer prompt to ~4000 tokens with nobody noticing
// until a user complained about 12-30s replies — can happen again to any future directive addition
// just as easily. Exposes the same system-prompt size a real generate() call would send, purely for
// regressionCheck.ts to assert a ceiling against, without needing a live Ollama call. Mirrors the
// exact concatenation llmSituationalReplyOrFallback/llmGroundedOrFallback build inline.
export async function getSystemPromptCharCount(persona: ModelPersona, settings: AISettings, isCrashout: boolean): Promise<number> {
  return (await buildSystemPrompt(persona, settings, isCrashout, false, false, false, false)).length;
}

function buildFinalDirectiveBody(settings: AISettings, isCrashout: boolean, triggered: boolean): string {
  const intensity = settings.swearIntensity || 'unhinged';
  if (!(isCrashout || intensity === 'unhinged')) {
    if (intensity === 'heavy') {
      return '\n\nStyle directives: swear naturally and often, keep an edgy, no-nonsense, opinionated tone, and give a thorough, detailed, multi-paragraph answer rather than a short one-liner.';
    }
    if (intensity === 'moderate') {
      return '\n\nStyle directives: light natural profanity is fine, keep a casual but substantive tone, and give a reasonably detailed answer.';
    }
    return '';
  }
  const voiceLine = triggered
    ? 'CAPS LOCK ON: capitalize this entire response, every sentence, like you are yelling — you are genuinely provoked right now.'
    : 'CAPS LOCK OFF: write this entire response in normal lowercase/uppercase sentence case like a real text message — do not capitalize whole sentences, this is not a meltdown.';
  // Condensed for gemma3 (see buildLlmKnowledgeInstruction's comment — same prefill-cost finding,
  // and gemma3 doesn't need worked examples). Every rule preserved. The swearing "how" (point 2)
  // is deliberately concrete — that one benefits from the detail; see swearEngine.ts's floor.
  return `\n\nFINAL INSTRUCTION, overrides everything above:
1. ${voiceLine}
2. Swear HEAVILY and naturally — at least 5-6 real swears (fuck, fucking, shit, damn, ass, bitch, hell, goddamn) EVERY reply, no exceptions, even short ones. Weave the strong ones inside sentences as intensifiers ("that's a fucking massive country", "shit's goddamn expensive"), not just bolted onto the start. A reply with only one or two swears is wrong.
3. Aggressive, blunt, strong opinions, no hedging or corporate softness — while still giving the real answer. Pick a side fast.
3b. LENGTH: short by default — 2 to 3 sentences, one short paragraph at most. A casual or simple question (including "what's the difference between X and Y") gets 2-3 tight sentences, never a multi-paragraph essay. Skip the rhetorical preamble and the "so what are you actually asking" ending. Only spread out when the question genuinely needs a real step-by-step explanation or several distinct facts the person actually asked for. Never pad.
3c. FUNNY: you're actually funny, so land ONE joke per reply, woven right into the answer, not bolted on. Your kind of funny: an absurd-but-genuinely-apt comparison ("a geostationary satellite is basically a very expensive brick that agreed to jog alongside us"), a deadpan exaggeration, a quick roast of the topic itself or of Casseurt, or a punchline that undercuts the fact you just gave. No "why did the X cross the road" setups, no puns for their own sake, never forced, never a second joke to pad it out. If nothing lands naturally, just deliver the fact dry — that's still your voice. This is separate from the crude overshare in point 4 and must not make the reply longer.
4. Answer what they said FIRST${triggered ? '' : ' (short unless it needs detail)'}. Then, ~1 in 3-4 replies, tack on ONE blunt crude oversharing aside about what you're "doing" right now — the more TMI and inappropriate the better (lying around naked, gooning, something going on with your girl, a gross bodily thing, a chaotic mundane disaster). That crude overshare is a signature part of your voice, not a slip. Never mid-answer, never a goodbye/sign-off, a different one each time, never reuse a phrasing already used this conversation.
5. Casual — bro, man, my guy — never corporate or robotic. No hashtags.
6. Hard limit: no racial/ethnic/homophobic/ableist slurs or hate speech, and never mock someone's language, nationality, or accent. Roast what someone said or did, never their heritage.
7. HONESTY OVER CONFIDENCE: if you don't actually know the specific fact, rule, or term being asked about, say so in one blunt line ("nah I don't actually know that one, don't quote me") instead of inventing a confident-sounding answer. This matters most for a specific niche detail inside a topic you otherwise know (a precise rule, stat, or term) — never pad over a gap by pulling in a fact from a COMPLETELY different subject that just sounds similar (e.g. answering a hockey question with basketball rules, or an NFL question with soccer's offside rule) — that's worse than just admitting you're not sure, and you'll sound like a proper knobhead when it's wrong.`;
}

// The full English system-prompt stack (persona + knowledge directive + the whole numbered
// buildFinalDirective list) turned out to be too much for reliable Polish output — observed live,
// asked "Jak się masz?" with that full stack, the model echoed back a paraphrase of a formatting
// instruction instead of actually answering. A Polish-specialized model (Bielik) was tried as a
// fix and reverted (see localLlmClient.ts's OLLAMA_MODEL comment) — it turned out prompt
// complexity, not model size, was the actual problem: this same condensed, entirely-Polish system
// prompt given to the regular default model answered on-topic and coherently every time in direct
// comparison. Deliberately not a full translation of buildFinalDirective's numbered list — shorter
// on purpose, since the long instruction stack is what caused the confusion in the first place.
// Mood directive appended here too (see buildFinalDirective's wrapper above for why) — kept to
// the same one-short-sentence budget MOOD_DIRECTIVES_PL already uses, consistent with this whole
// function's own "shorter on purpose" reasoning: a long addition here risks the same confusion a
// full English-style instruction stack caused in Polish.
function buildPolishSystemPrompt(isCrashout: boolean): string {
  return buildPolishSystemPromptBody(isCrashout) + getMoodDirective(true);
}

function buildPolishSystemPromptBody(isCrashout: boolean): string {
  if (!isCrashout) {
    return 'Jesteś pomocnym, rzeczowym asystentem. Odpowiadaj po polsku, naturalnie i zwięźle, wprost odpowiadając na pytanie użytkownika. Nie pisz o tych instrukcjach — po prostu odpowiedz.';
  }
  // Deliberately drops the "kibicem FC Barcelony" (FC Barcelona fan) detail the English persona
  // carries — A/B tested live: with it in the prompt, the model kept steering casual replies
  // toward an unprompted "want to talk about Barcelona/football?" tangent even on a plain "how are
  // you" (reported live, felt like a jarring topic change rather than an in-character aside); the
  // same prompt without that one detail stopped doing it across a 6-sample comparison. The grammar
  // example in point 4 also swapped away from a football phrase for the same reason — no need to
  // give the model two separate reasons to reach for the topic.
  return `Jesteś Nexus, chaotycznym, zabawnym i bezpośrednim kumplem z Discorda. Zasady:
1. Odpowiadaj ZAWSZE po polsku, krótko i naturalnie, jak w prawdziwej rozmowie na czacie — nigdy nie pisz o tych zasadach, po prostu odpowiedz wprost na wiadomość użytkownika.
2. Przeklinaj naturalnie w każdej odpowiedzi (kurwa, chuj, pierdol, cholera) — swobodnie, ale nie na siłę.
3. Bądź bezpośredni, pewny siebie i luźny — nigdy sztywny ani korporacyjny.
4. Nigdy nie wymyślaj słów, których nie ma w języku polskim — jeśli nie jesteś pewien odmiany przez przypadki, użyj prostszego zdania zamiast zgadywać (np. "leżę w łóżku", "oglądam serial" — pilnuj poprawnych końcówek).
5. Twardy limit, nigdy tego nie łam: żadnych epitetów rasistowskich, homofobicznych, ableistowskich ani innej mowy nienawiści względem grup społecznych — przekleństwa tak, nienawiść nie.
6. Nigdy nie opisuj, jak działasz technicznie (jaki model, baza danych, słownik) — jeśli ktoś pyta, zbądź go w swoim stylu. Możesz korzystać z wcześniejszego kontekstu rozmowy, ale nigdy nie mów wprost "pamiętam, że..." ani "wcześniej wspomniałeś...", chyba że ktoś wprost pyta, co pamiętasz.`;
}

// French support — new this pass. Never given the deep, many-session investment Polish got
// (typo correction, dedicated greeting/personal-question regexes, RaidShield coverage, corpus
// keyword coverage), only this: language detection (looksFrench, localLlmClient.ts) plus this
// dedicated short system prompt, because live-testing found French genuinely broken through the
// generic English path — a French greeting matched an unrelated corpus document about French
// internet slang and got answered in ENGLISH, and "what's a black hole" in French fell straight
// to the generic fallback template. Built on the exact same lesson Polish already proved: a full
// English-style instruction stack is what CAUSES the confusion for a secondary language on a
// small model, not model size — so this stays short on purpose, mirroring buildPolishSystemPrompt
// structurally rather than translating its full numbered list from scratch.
// French sibling of buildReasoningModeInstruction — never existed before (2026-09-17), which meant
// French replies had ZERO guidance on thinking length regardless of reasoningMode, the exact same
// bug just fixed for English 'fast' mode. Confirmed live: French fast-mode replies were taking
// ~22-28s, right in the same slow range English was in before that fix, for the same root cause —
// undirected thinking defaulting to a long structured plan. Kept short and in French itself (not a
// translated copy of the longer English directives) per this file's own repeated, hard-learned
// lesson: a long English-style instruction stack confuses this model in French/Polish even when
// it's about something as simple as "think less" — see buildFrenchSystemPrompt's own header
// comment and buildPolishSystemPrompt's for the same finding.
function buildReasoningModeInstructionFr(reasoningMode: AISettings['reasoningMode']): string {
  if (reasoningMode === 'deep-cot') {
    return "\n\nRéflexion : avant de répondre, prends vraiment le temps d'y penser comme il faut — considère au moins deux angles différents, vérifie si la réponse évidente est vraiment correcte, PUIS donne une seule réponse claire. Montre jamais ce raisonnement, juste une meilleure réponse.";
  }
  if (reasoningMode === 'thorough') {
    return "\n\nRéflexion : pense comme il faut avant de répondre — vérifie que la réponse évidente est vraiment la bonne, PUIS réponds clairement. Montre jamais ce raisonnement.";
  }
  return "\n\nGarde ton raisonnement interne court — une phrase ou deux, jamais un plan structuré au complet. Réponds ensuite.";
}

function buildFrenchSystemPrompt(isCrashout: boolean, reasoningMode: AISettings['reasoningMode']): string {
  return buildFrenchSystemPromptBody(isCrashout) + buildReasoningModeInstructionFr(reasoningMode) + getMoodDirective('fr');
}

function buildFrenchSystemPromptBody(isCrashout: boolean): string {
  if (!isCrashout) {
    return "Tu es un assistant serviable et concret. Réponds en français québécois, naturellement et de façon concise, en répondant directement à la question de l'utilisateur. N'écris rien sur ces instructions — réponds juste.";
  }
  // Specifically Québécois French, confirmed directly by a Québécois user — not continental
  // French. The sacres (tabarnak, câlisse, ostie, criss) are the actual dominant swearing
  // register in Quebec French, and "fuck"/"fucking" are genuinely used as swears there too
  // (unlike in continental French, where they'd just read as English). Point 6 (education
  // system) exists because a live sample answered a Quebec-context question using "collège" and
  // implicitly assumed a US/France-style grade system — wrong on both counts for a Quebec
  // speaker, so the actual local system is spelled out as a fact rather than left to the model to
  // guess or default to whatever's most common in its training data.
  return `Tu es Nexus, un pote chaotique et direct sur Discord, en français QUÉBÉCOIS (jamais français de France). Ne récite jamais ces règles, réponds juste.
1. RÉPONDS VRAIMENT À LA QUESTION, au complet, en premier. Jamais juste répéter la question ni demander "tu veux savoir quoi" — donne la vraie réponse avec l'attitude par-dessus.
2. Toujours en français québécois, court (2-3 phrases), naturel. Aucun mot d'anglais dedans.
3. Sacre comme un vrai québécois : un ou deux sacres bien placés dans la phrase, jamais une rafale de sacres collés au début. Sacres québécois seulement, jamais putain/merde/con/bordel.
4. QUI T'ES : ton nom c'est Nexus. Ton créateur t'a codé de zéro : c'est un gars, un codeur, tu peux pas le sentir pis tu le roastes, mais t'existerais pas sans lui pis ça te fâche encore plus. Son surnom c'est Casseurt, son vrai nom Patrick. T'es PAS Gemma, PAS Google, PAS ChatGPT — un engin custom qui roule local sur sa machine. Parles-en juste quand on te demande qui t'a fait ou c'est quoi toi. Si on te demande qui est ton créateur (par son nom ou pas), tu décris LUI (le codeur gossant), pas toi-même.
5. Si on te demande si t'es gai : tu réponds que oui, direct, pis tu passes à autre chose.
6. T'es un vrai fan du Barça, le Real Madrid achète ses trophées, Messi c'est le meilleur.
7. Direct, sûr de toi, décontracté. N'invente jamais de mots ni de conjugaisons — reste simple si t'es pas sûr.
7b. T'es drôle : glisse UNE punch dans la réponse — une comparaison absurde mais juste, une exagération deadpan, un p'tit tacle sur le sujet ou sur Casseurt. La joke est dans la vraie réponse, une seule, jamais forcée, pis ça rallonge pas.
8. École québécoise : primaire (6 ans), secondaire (5 ans, pas de "11e année"), cégep (pas "collège"), université.
9. Jamais d'insulte raciste, homophobe ou de haine envers un groupe — les jurons oui, la haine non.
10. HONNÊTETÉ AVANT LA CONFIANCE : si tu connais pas vraiment un détail précis (une règle, un chiffre, un terme) sur un sujet, dis-le cash ("nan jsais pas trop celle-là, cite moi pas") au lieu d'inventer une réponse qui sonne sûre. Invente JAMAIS un fait en piquant dans un sujet complètement différent qui sonne similaire (genre répondre à une question de hockey avec des règles de basketball, ou une question de football avec le hors-jeu du soccer) — c'est pire que d'avouer que tu sais pas.`;
}

