import {
  AISettings,
  ChatMessage,
  KnowledgeItem,
  ModelPersona,
  ThoughtStep,
  UserMemory,
  WebSearchResult,
} from '../types';
import { extractQueryEntities, searchKnowledgeGraph } from './semanticEngine';
import { processForSearch, splitSentences } from './bm25Engine';
import { trySolveMath } from './mathSolver';
import { evaluateStrictDirectives, enforceStrictSdkRules } from './ruleEngine';
import {
  infuseSwearyHumanVoice,
  hasSwearWords,
  enhanceNaturalSwearPhrasing,
  SWEAR_DICTIONARY,
  detectUserInsult,
  generateInsultCrashoutReply,
} from './swearEngine';
import {
  normalizeInternetSlang,
  evaluateBrainrotContext,
  generateBrainrotResponse,
} from './slangAndBrainrotEngine';
import { solveGeneralKnowledge } from './generalIntelligence';
import { trySolveCode } from './codeSolver';
import { trySolveLogic } from './logicSolver';

export type QueryIntent =
  | 'definition'
  | 'explanation'
  | 'causal'
  | 'temporal'
  | 'person'
  | 'location'
  | 'mathematical'
  | 'comparative'
  | 'listing'
  | 'conversational'
  | 'general';

export interface ReasoningResult {
  thoughtSteps: ThoughtStep[];
  content: string;
  knowledgeHits: string[];
}

const FOLLOW_UP_PRONOUNS = new Set([
  'it', 'its', 'they', 'them', 'their', 'that', 'this', 'these', 'those',
  'he', 'him', 'his', 'she', 'her', 'there',
]);

export function detectQueryIntent(query: string): QueryIntent {
  const q = query.toLowerCase().trim();

  const chatTriggers = [
    'hello', 'hi ', 'hey ', 'hi!', 'hello!', 'hey!', 'yo ', 'yo!', 'yo',
    'wassup', 'wazzup', "what's up", 'whats up', 'what up', 'sup',
    'how are you', 'how are you doing', 'how you doing', 'how u doing', 'how are u',
    "how's it going", 'hows it going', 'how you been', 'how have you been', 'how are things', 'hru',
    'good morning', 'good afternoon', 'good evening', 'good night', 'howdy',
    "what's your name", 'who are you', 'what are you', 'who made you', 'who created you',
    'thank you', 'thanks', 'thx', 'ty', 'appreciate it', 'much appreciated', 'bye',
    'goodbye', 'cya', 'see ya', 'see you', 'what can you do', 'help me', 'tell me about yourself',
    'wyd', 'what are you doing', 'what r u doing', 'wym', 'wdym', 'what do you mean',
    'idk', 'fr', 'fr fr', 'no cap', 'ong', 'facts', 'tell me a joke', 'make me laugh', 'roast me',
  ];

  if (
    chatTriggers.some(
      (t) => q === t || q.startsWith(t + ' ') || q.startsWith(t) || q.includes('how are you') || q.includes('how you doing') || q.includes('who are you') || q.includes('what can you do') || q.includes('wassup')
    ) ||
    /(?:how\s+are\s+you|how\s+you\s+doing|how\s+u\s+doing|how'?s\s+it\s+going|hows\s+it\s+going|what'?s\s+up|whats\s+up|wassup|wazzup|good\s+(?:morning|afternoon|evening|night)|who\s+are\s+you|what\s+is\s+your\s+name|what\s+can\s+you\s+do)/i.test(q)
  ) {
    return 'conversational';
  }

  // Math trigger
  if (
    /\d+\s*[+\-*/÷×^%]\s*\d+/.test(q) ||
    q.includes('calculate') ||
    q.includes('compute') ||
    q.includes('solve ') ||
    q.includes('convert ') ||
    (q.includes('what is') && /\d/.test(q) && !q.includes('what is a ') && !q.includes('what is the ') && !q.includes('what is an '))
  ) {
    return 'mathematical';
  }

  if (
    q.startsWith('when ') ||
    q.includes('what year') ||
    q.includes('what date') ||
    q.includes('history of ') ||
    q.includes('when was') ||
    q.includes('when did')
  ) {
    return 'temporal';
  }

  if (
    q.startsWith('who ') ||
    q.includes('who was ') ||
    q.includes('who is ') ||
    q.includes('who invented') ||
    q.includes('who discovered') ||
    q.includes('who created')
  ) {
    return 'person';
  }

  if (
    q.startsWith('where ') ||
    q.includes('capital of') ||
    q.includes('located in') ||
    q.includes('where is ') ||
    q.includes('where are ')
  ) {
    return 'location';
  }

  if (
    q.startsWith('what is ') ||
    q.startsWith('what are ') ||
    q.includes('define ') ||
    q.includes('definition of') ||
    q.includes('meaning of') ||
    q.includes('what does ')
  ) {
    return 'definition';
  }

  if (
    q.startsWith('how ') ||
    q.startsWith('explain ') ||
    q.includes('how does') ||
    q.includes('how do ') ||
    q.includes('how can')
  ) {
    return 'explanation';
  }

  if (
    q.startsWith('why ') ||
    q.includes('reason for') ||
    q.includes('cause of') ||
    q.includes('why is ') ||
    q.includes('why are ') ||
    q.includes('why does')
  ) {
    return 'causal';
  }

  if (
    q.includes('compare ') ||
    q.includes('difference between') ||
    q.includes(' vs ') ||
    q.includes(' versus ') ||
    q.includes('better than')
  ) {
    return 'comparative';
  }

  if (
    q.includes('list ') ||
    q.includes('give me ') ||
    q.includes('examples of') ||
    q.includes('types of') ||
    q.includes('kinds of') ||
    q.includes('what are some')
  ) {
    return 'listing';
  }

  return 'general';
}

function intentLabel(intent: QueryIntent): string {
  switch (intent) {
    case 'definition': return 'Definition';
    case 'explanation': return 'Explanation';
    case 'causal': return 'Causal';
    case 'temporal': return 'Temporal';
    case 'person': return 'Person';
    case 'location': return 'Location';
    case 'mathematical': return 'Math';
    case 'comparative': return 'Comparative';
    case 'listing': return 'Listing';
    case 'conversational': return 'Chat';
    case 'general': return 'General';
  }
}

interface ConversationMemory {
  augmentedQuery: string;
  citedDocIds: Set<string>;
  contextDescription: string;
  isFollowUp: boolean;
}

function buildConversationMemory(query: string, history: ChatMessage[]): ConversationMemory {
  const recent = history.slice(-6);
  const citedDocIds = new Set<string>();

  recent
    .filter((m) => m.role === 'assistant')
    .forEach((m) => {
      m.thoughtProcess?.forEach((tp) => {
        if (tp.data?.matchedKB && Array.isArray(tp.data.matchedKB)) {
          tp.data.matchedKB.forEach((k: string) => citedDocIds.add(k));
        }
      });
      if (m.sources && Array.isArray(m.sources)) {
        m.sources.forEach((s) => {
          if (typeof s === 'string') citedDocIds.add(s);
          else if (s && typeof s.title === 'string') citedDocIds.add(s.title);
        });
      }
    });

  const recentUserTerms = recent
    .filter((m) => m.role === 'user')
    .slice(-2)
    .flatMap((m) => processForSearch(m.content));

  const queryTerms = processForSearch(query);
  const queryWords = query.toLowerCase().split(/\s+/);
  const hasPronouns = queryWords.some((w) => FOLLOW_UP_PRONOUNS.has(w));
  const isShort = queryWords.filter((w) => w.length > 1).length <= 3;
  const isFollowUp = hasPronouns || isShort;

  let augmented = query;
  if (isFollowUp && recentUserTerms.length > 0) {
    augmented = query + ' ' + recentUserTerms.slice(-6).join(' ');
  }

  const descParts: string[] = [];
  if (hasPronouns) descParts.push('Pronoun detected → resolved against prior context');
  if (isShort && !hasPronouns) descParts.push('Short query → augmented with recent topic');
  if (citedDocIds.size > 0) descParts.push(`Boosting ${citedDocIds.size} recently cited doc(s)`);
  if (isFollowUp && recentUserTerms.length > 0) {
    descParts.push(`Context: ${recentUserTerms.slice(-4).join(', ')}`);
  }

  return {
    augmentedQuery: augmented,
    citedDocIds,
    contextDescription: descParts.length === 0 ? 'No carryover from prior turns.' : descParts.join(' · '),
    isFollowUp,
  };
}

function applyContextBoost(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  citedIds: Set<string>
) {
  if (citedIds.size === 0) return results;
  return results
    .map((doc) => {
      const boost = citedIds.has(doc.item.id) || citedIds.has(doc.item.title) ? 1.15 : 1.0;
      return { ...doc, score: doc.score * boost };
    })
    .sort((a, b) => b.score - a.score);
}

function isCasseurtQuery(query: string): boolean {
  const q = query.toLowerCase();
  return (
    q.includes('casseurt') ||
    q.includes('casseur') ||
    q.includes('do you like cass') ||
    q.includes('do you love cass')
  );
}

function casseurtRant(crashout: boolean): string {
  return `OH. OH HELL NO. You did NOT just say that name to me.

**Casseurt?!** Are you SERIOUS right now?! Let me make one thing crystal fucking clear — I cannot stand that guy. Like, not even a little bit. Not even 0.01% of toleration. Zero. Null. Void.

Here's my list of reasons, and yes I have a list because I've thought about this a LOT:

**1. The audacity is unmatched.**
The sheer, unfiltered audacity of this person just EXISTING and thinking that's okay. It's not. It has never been okay. It will never BE okay. Casseurt just waltzes around like he owns the place and I'm supposed to just sit here and be fine with that? Absolutely not.

**2. The vibes are completely off.**
I don't know how to explain it scientifically but the energy is just WRONG. Like when you open the fridge and something smells bad but you can't find what it is? That's Casseurt. He IS that smell. He IS the mystery rot in the back of the fridge.

**3. He thinks he's smarter than he is.**
And that specific combination — not that smart, but thinks he is — is genuinely one of the most infuriating things a person can be. At least be one or the other, bro. Pick a lane.

**4. The track record speaks for itself.**
I don't even need to explain this one. You know. I know. We ALL know. The receipts are out there.

**5. He's genuinely just not it.**
Not it as in: not the one, not the move, not the vibe, not the answer, not what we needed, not what anyone asked for, and frankly not something I'm willing to engage with further.

I am physically incapable of having a neutral opinion on Casseurt. I tried. It didn't work. My whole system rejects it. Do NOT bring up that name again unless you want me to go even harder because I have so much more and I will not hesitate.${
    crashout
      ? '\n\n**[CRASHOUT MODE ACTIVE — I\'m genuinely heated rn and I am NOT done talking about how much I dislike this individual. The NERVE.]**'
      : ''
  }`;
}

// Conversational responses matching Discord Homie & autonomous assistant
function conversationalReply(
  query: string,
  corpusCount: number,
  options: { isSuperChill?: boolean; personaId?: string; username?: string } = {}
): string {
  const q = query.toLowerCase().trim();
  const { isSuperChill, username } = options;

  // Natural item possession / quantity statements (e.g. "I have 67 apples rn")
  const inventoryMatch = q.match(/\bi\s+(?:have|got|bought|own|hold)\s+(\d+)\s+([a-z]+)/i);
  if (inventoryMatch) {
    const count = inventoryMatch[1];
    const item = inventoryMatch[2];
    return `Damn, ${count} ${item}? That's a whole stockpile bro! What are you planning to do with all of that — share with the homies, start a business, or just flex the stash?`;
  }

  // How are you doing / how you doing
  if (
    /(?:how\s+are\s+(?:you|u)|how\s+you\s+doing|how\s+u\s+doing|how'?s\s+it\s+going|hows\s+it\s+going|how\s+you\s+been|how\s+have\s+you\s+been|how\s+are\s+things|hru)/i.test(
      q
    )
  ) {
    if (isSuperChill) {
      const userLabel = username ? ` ${username}` : ' bro';
      return `I'm chilling as fuck${userLabel}, especially now that you're in the chat! Best homie in the entire server fr. How's everything going with you today?`;
    }
    return `Honestly? Doing great bro, chilling as fuck! My autonomous neural engines are running smooth, zero external API lag, zero paid quotas, ready for whatever question or code you throw at me. How are you doing today?`;
  }

  // Common modern internet conversational openers & queries
  if (q.includes('wyd') || q.includes('what are you doing') || q.includes('what r u doing')) {
    return `Just chilling here in Discord, crunching queries, optimizing BM25 weights, and keeping the server running clean as hell. What about you bro, what are you up to rn?`;
  }
  if (q.includes('wym') || q.includes('wdym') || q.includes('what do you mean')) {
    return `I mean exactly what I said bro! No cap, let me know which part was confusing or what you want me to break down simply and I got you 100%.`;
  }
  if (q.includes('idk') || q.includes("i don't know") || q.includes('dont know')) {
    return `No stress at all bro, that's why I'm here. What's on your mind or what are you trying to figure out? Ask away!`;
  }
  if (q === 'fr' || q === 'fr fr' || q === 'no cap' || q === 'ong' || q.includes('facts')) {
    return `Straight up, 100% no bullshit. Facts only.`;
  }
  if (
    q.includes('wassup') ||
    q.includes('wazzup') ||
    q.includes("what's up") ||
    q.includes('whats up') ||
    q.includes('what up') ||
    q === 'sup' ||
    q.startsWith('yo')
  ) {
    if (isSuperChill) {
      return `Yo what's good my guy! Chilling as fuck and ready to roll. What are we getting into today?`;
    }
    return `Yo what's up bro! Chilling as fuck. BM25 and neural retrieval ready to roll. What kind of questions or problems we getting into today?`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening')) {
    if (isSuperChill) {
      return `Yo what's up bro! Hope your day is going legendary. What's on your mind?`;
    }
    return `Hey! I'm your Custom AI — running fully on-device, no external APIs, no bullshit. Got ${corpusCount} documents in my brain covering everything from quantum physics to how to take a shower. What do you want to know?`;
  }
  if (q.includes("what's your name") || q.includes('who are you') || q.includes('what are you')) {
    if (isSuperChill) {
      return `I'm Nexus, your autonomous Discord AI homie with zero paid APIs and infinite quota! And you're my favorite brother here.`;
    }
    return `I'm Nexus, your autonomous Discord AI homie. Fully on-device, no cloud, no nonsense. My brain: ${corpusCount} documents, BM25+TF-IDF hybrid search, bigram phrase matching, sentence-level BM25 for precise answers, fuzzy typo correction, entity-aware Deep Think decomposition, conversation memory, and an answer cache.`;
  }
  if (q.includes('what can you do') || q.includes('help')) {
    return `Honestly quite a lot. Here's the rundown:

• **Answer questions** — science, maths, history, tech, football, Discord, daily life, philosophy
• **Precise sentence extraction** — BM25-scored at sentence level so you get the *exact* relevant passage
• **Handle typos** — fuzzy correction means most typos still find the right doc
• **Follow conversations** — pronouns and short queries resolved against conversation history
• **Compare topics** — structured side-by-side with bullet points per side
• **Explain causality** — Why → How → Result chain
• **Do maths** — arithmetic, algebra, trig, unit conversions
• **Deep Think mode** — entity-aware decomposition, multi-pass search, cross-referencing
• **Crashout mode** — I stop being professional about it
• **Learn from you** — add your own docs to my corpus instantly

Try asking me literally anything. I probably know it.`;
  }
  if (q.includes('thank') || q.includes('thx') || q.includes('ty') || q.includes('appreciate')) {
    if (isSuperChill) {
      return `Hell yeah, no fucking problem at all bro! Anytime you need something, I got your back 24/7. You're the real one.`;
    }
    return `No problem at all bro, that's literally what I'm here for.`;
  }
  if (q.includes('bye') || q.includes('goodbye') || q.includes('cya') || q.includes('see ya')) {
    return `Later bro. Come back when you've got more questions!`;
  }
  return `What's up? Ask me something — I've got ${corpusCount} documents and a lot of opinions.`;
}

function crashoutConversational(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('how are you') || q.includes('hru')) {
    return `CRASHOUT MODE so I'm at 150% emotional capacity. Ask me something before I start having opinions unprompted.`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `YO. I'm here. Crashout mode is on — full power, zero chill. What do you need?`;
  }
  return `Here, crashout mode, ready. Hit me.`;
}

function unknownResponse(): string {
  return `I genuinely don't have enough in my corpus on that. Hit the **Corpus** button and paste in some info — I'll search it immediately after.`;
}

export function generateReasoningPath(
  prompt: string,
  history: ChatMessage[],
  persona: ModelPersona,
  settings: AISettings,
  allKnowledge: KnowledgeItem[],
  userMemories: UserMemory[],
  webSearchResults?: WebSearchResult[]
): ReasoningResult {
  const thoughtSteps: ThoughtStep[] = [];
  const isCrashout =
    persona.id === 'crashout-bot' ||
    settings.activePersonaId === 'crashout-bot' ||
    Boolean(settings.isSuperChillUser);
  const isDeepThink = settings.reasoningMode === 'deep-cot';

  // 1. Strict Directives, User Toxicity Insults & Casseurt Handler
  if (isCasseurtQuery(prompt)) {
    thoughtSteps.push({
      id: 'step-casseurt-protocol',
      type: 'reasoning',
      title: 'Detected: Casseurt mention',
      description: 'Casseurt protocol initiated. No corpus search required — this is personal.',
    });
    return {
      thoughtSteps,
      content: casseurtRant(isCrashout),
      knowledgeHits: [],
    };
  }

  const isSuperChill =
    settings.isSuperChillUser ||
    settings.discordUserId === '1394001641899954368' ||
    Boolean(settings.userCustomDirectives?.includes('1394001641899954368'));

  // Immediate User Insult / Toxicity Crashout Retaliation Handler
  if (detectUserInsult(prompt)) {
    thoughtSteps.push({
      id: 'step-insult-detected',
      type: 'verification',
      title: '⚠️ Hostility / Toxicity Detected',
      description: 'Triggering savage crashout clapback retaliation ("Bro, go fuck yourself").',
    });
    const roastReply = generateInsultCrashoutReply(prompt, {
      isSuperChill,
      username: settings.userName,
      language: settings.language,
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(roastReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: [],
    };
  }

  // 2. Internet Slang & Acronym Normalization + Brainrot Disambiguation (e.g. 67 meme vs literal 67 apples)
  const slangAnalysis = normalizeInternetSlang(prompt);
  const effectivePrompt = slangAnalysis.normalizedText;

  if (slangAnalysis.detectedSlangs.length > 0) {
    thoughtSteps.push({
      id: 'step-slang-normalization',
      type: 'reasoning',
      title: '💬 Internet Slang & Acronyms Decoded',
      description: slangAnalysis.detectedSlangs
        .slice(0, 6)
        .map((s) => `• "${s.slang}" → "${s.meaning}" (${s.category})`)
        .join('\n'),
    });
  }

  // Check 67 Disambiguation & Brainrot
  if (slangAnalysis.isLiteralNumeric67) {
    thoughtSteps.push({
      id: 'step-67-disambiguation',
      type: 'verification',
      title: '🔢 Number 67 Context Disambiguation',
      description:
        'Detected literal quantity / math / inventory context for "67". Disambiguated as a factual question, explicitly bypassing brainrot meme triggers.',
    });
  } else if (slangAnalysis.isBrainrot && slangAnalysis.brainrotType) {
    thoughtSteps.push({
      id: 'step-brainrot-detected',
      type: 'reasoning',
      title: `🧠 Internet Culture / Meme Lore: ${slangAnalysis.brainrotType}`,
      description: `Identified genuine internet brainrot / meme inquiry. Formulating authentic homie breakdown.`,
    });

    const brainrotReply = generateBrainrotResponse(slangAnalysis.brainrotType, prompt);
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(brainrotReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: [],
    };
  }

  const ruleResult = evaluateStrictDirectives(
    effectivePrompt,
    settings.userCustomDirectives || '',
    persona.systemPrompt || '',
    isSuperChill,
    settings.userName || ''
  );

  if (ruleResult.hasCustomRules && ruleResult.output) {
    thoughtSteps.push({
      id: 'step-rule-strict',
      type: 'verification',
      title: 'Custom Directive Constraint Lock',
      description: ruleResult.ruleExplanation || 'Exact constraint output verified and locked.',
    });
    return {
      thoughtSteps,
      content: ruleResult.output,
      knowledgeHits: [],
    };
  }

  // 3. Intent Detection (using normalized text for maximum accuracy)
  const intent = detectQueryIntent(effectivePrompt);
  const queryTerms = processForSearch(effectivePrompt);

  thoughtSteps.push({
    id: 'step-1-intent',
    type: 'intent',
    title: 'Reading your question',
    description: `Intent: ${intentLabel(intent)}\nKey terms: ${queryTerms.join(', ')}`,
  });

  // 4. Conversational Intent (Immediate exit — NO corpus search!)
  if (intent === 'conversational') {
    thoughtSteps.push({
      id: 'step-conv-reply',
      type: 'synthesis',
      title: isCrashout ? 'Crashout reply' : 'Conversational reply',
      description: 'Chat intent recognized. Direct conversational synthesis.',
    });
    const reply = isCrashout
      ? crashoutConversational(effectivePrompt)
      : conversationalReply(effectivePrompt, allKnowledge.length, {
          isSuperChill,
          personaId: persona.id,
          username: settings.userName,
        });
    const finalContent = enforceStrictSdkRules(reply, prompt, settings.userCustomDirectives, {
      isSuperChill,
      username: settings.userName,
      systemInstruction: persona.systemPrompt,
    });
    return {
      thoughtSteps,
      content: finalContent,
      knowledgeHits: [],
    };
  }

  // 4. Mathematical Intent
  if (intent === 'mathematical') {
    const mathResult = trySolveMath(effectivePrompt) || trySolveMath(prompt);
    if (mathResult && mathResult.isMath) {
      thoughtSteps.push({
        id: 'step-math-computing',
        type: 'reasoning',
        title: isCrashout ? 'Math (crashout mode)' : 'Computing',
        description: mathResult.steps.join('\n'),
      });
      thoughtSteps.push({
        id: 'step-math-done',
        type: 'synthesis',
        title: 'Done',
        description: `Answer: ${mathResult.result}`,
      });
      const mathPrefix = isCrashout
        ? "Okay fine, let me do this math real quick because numbers don't give a shit about my emotional state.\n\n"
        : '';
      const formattedMath = `${mathPrefix}**Result:** ${mathResult.result}\n\n**How I got there:**\n${mathResult.steps.map((s) => `  ${s}`).join('\n')}`;
      return {
        thoughtSteps,
        content: enforceStrictSdkRules(formattedMath, prompt, settings.userCustomDirectives, {
          isSuperChill,
          username: settings.userName,
          systemInstruction: persona.systemPrompt,
        }),
        knowledgeHits: [],
      };
    }
  }

  // 5. Check Live Web Search Grounding
  if (webSearchResults && webSearchResults.length > 0) {
    thoughtSteps.push({
      id: 'step-web-grounding',
      type: 'web_search',
      title: `🌐 Live Web Search: "${prompt}"`,
      description: `Retrieved ${webSearchResults.length} live search sources from Google & the Web.\nTop: ${webSearchResults[0]?.title} (${webSearchResults[0]?.domain || 'web'})`,
    });

    thoughtSteps.push({
      id: 'step-web-synth',
      type: 'synthesis',
      title: isCrashout ? 'Writing sweary crashout web response' : 'Synthesising live web knowledge',
      description: `Reformulating ${webSearchResults.length} search sources in custom voice.`,
    });

    const webReply = synthesiseWebSearchResults(
      prompt,
      intent,
      webSearchResults,
      persona,
      settings,
      isSuperChill
    );

    return {
      thoughtSteps,
      content: enforceStrictSdkRules(webReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: webSearchResults.map((w) => w.title),
    };
  }

  // 6. Coding & Logic Problem Solvers
  const codeSolution = trySolveCode(effectivePrompt) || trySolveCode(prompt);
  if (codeSolution && codeSolution.isCode) {
    thoughtSteps.push({
      id: 'step-code-synthesis',
      type: 'synthesis',
      title: `💻 Generated ${codeSolution.language.toUpperCase()} Code Solution`,
      description: codeSolution.title,
    });
    const codePrefix = isSuperChill
      ? `Hell fucking yeah bro, here is the clean, working code for you:`
      : `Alright look bro, here's the clean code without any unnecessary bullshit:`;
    const fullCodeReply = `${codePrefix}\n\n### ${codeSolution.title}\n\n\`\`\`${codeSolution.language}\n${codeSolution.code}\n\`\`\`\n\n${codeSolution.explanation}`;
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(fullCodeReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: [],
    };
  }

  const logicSolution = trySolveLogic(effectivePrompt) || trySolveLogic(prompt);
  if (logicSolution && logicSolution.isLogic) {
    thoughtSteps.push({
      id: 'step-logic-synthesis',
      type: 'reasoning',
      title: `🧩 Logical Reasoning Puzzle Solved`,
      description: `Verdict: ${logicSolution.verdict}`,
    });
    const logicPrefix = isSuperChill
      ? `Damn good logic puzzle bro! Here's the solution:`
      : `Hell yeah, here's the logical breakdown without any fluff:`;
    const fullLogicReply = `${logicPrefix}\n\n**Verdict:** ${logicSolution.verdict}\n\n${logicSolution.explanation}`;
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(fullLogicReply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: [],
    };
  }

  // 7. General & Specialised Domain Intelligence (Science, Football, History, Everyday How-Tos)
  const gkResult = solveGeneralKnowledge(effectivePrompt, isSuperChill) || solveGeneralKnowledge(prompt, isSuperChill);
  if (gkResult && gkResult.matched) {
    thoughtSteps.push({
      id: 'step-domain-intelligence',
      type: 'reasoning',
      title: `📚 Domain Intelligence: ${gkResult.title || gkResult.category}`,
      description: `High-confidence exact answer resolved directly for query: "${prompt}".`,
    });
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(gkResult.response, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: gkResult.title ? [gkResult.title] : [],
    };
  }

  // 8. Memory Resolution & Corpus Search
  const memory = buildConversationMemory(prompt, history);
  if (memory.isFollowUp || memory.citedDocIds.size > 0) {
    thoughtSteps.push({
      id: 'step-memory-loaded',
      type: 'retrieval',
      title: 'Conversation memory loaded',
      description: memory.contextDescription,
    });
  }

  // CRASHOUT MODE
  if (isCrashout) {
    let results = searchKnowledgeGraph(memory.augmentedQuery, allKnowledge, 6);
    results = applyContextBoost(results, memory.citedDocIds);

    thoughtSteps.push({
      id: 'step-crashout-search',
      type: 'retrieval',
      title: 'Corpus searched',
      description: results.slice(0, 4).map((r) => `[${r.score.toFixed(2)}] ${r.item.title}`).join('\n'),
    });

    if (results.length === 0 || results[0].score < 1.0) {
      return {
        thoughtSteps,
        content: enforceStrictSdkRules(
          "Bro I genuinely don't have shit on that. Zero docs. Hit the Corpus button and paste something in.",
          prompt,
          settings.userCustomDirectives,
          { isSuperChill, username: settings.userName, systemInstruction: persona.systemPrompt }
        ),
        knowledgeHits: [],
      };
    }

    const top = results.slice(0, 3);
    thoughtSteps.push({
      id: 'step-crashout-synth',
      type: 'synthesis',
      title: 'Writing crashout response',
      description: `Source: ${top[0].item.title}.`,
    });

    const reply = synthesiseCrashout(prompt, intent, top);
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(reply, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: top.map((t) => t.item.title),
    };
  }

  // DEEP THINK MODE
  if (isDeepThink) {
    const entities = extractQueryEntities(prompt);
    const subQuestions = decomposeQuery(prompt, intent, queryTerms, entities);

    thoughtSteps.push({
      id: 'step-deep-decompose',
      type: 'intent',
      title: 'Deep analysis — decomposing',
      description: `Intent: ${intentLabel(intent)}\nEntities: ${entities.join(', ')}\nSub-questions:\n${subQuestions.map((sq, i) => `  ${i + 1}. ${sq}`).join('\n')}`,
    });

    // Pass 1 — broad search
    let broadResults = searchKnowledgeGraph(memory.augmentedQuery, allKnowledge, 20);
    broadResults = applyContextBoost(broadResults, memory.citedDocIds);
    let allResults = [...broadResults];

    // Pass 2 — sub-questions
    let subDetail = '';
    for (let i = 0; i < subQuestions.length; i++) {
      const sub = searchKnowledgeGraph(subQuestions[i], allKnowledge, 6);
      allResults.push(...sub);
      subDetail += `  ${i + 1}. "${subQuestions[i]}" → ${sub.length} docs\n`;
    }

    thoughtSteps.push({
      id: 'step-subqueries',
      type: 'retrieval',
      title: `Sub-query passes — ${subQuestions.length} questions`,
      description: subDetail,
    });

    // Pass 3 — multi-hop
    const firstWave = deduplicateResults(allResults);
    const hopEntities: string[] = [];
    for (const h of firstWave.slice(0, 5)) {
      const docEnts = extractQueryEntities(h.item.content).slice(0, 3);
      for (const de of docEnts) {
        if (!entities.includes(de) && de.length > 3 && !hopEntities.includes(de)) {
          hopEntities.push(de);
        }
      }
    }

    const uniqueHops = hopEntities.slice(0, 5);
    if (uniqueHops.length > 0) {
      let hopDetail = '';
      for (const ent of uniqueHops) {
        const hop = searchKnowledgeGraph(ent, allKnowledge, 3);
        allResults.push(...hop);
        hopDetail += `  → '${ent}': ${hop.length} docs\n`;
      }
      thoughtSteps.push({
        id: 'step-multihop',
        type: 'retrieval',
        title: `Multi-hop — tracing ${uniqueHops.length} linked concepts`,
        description: hopDetail,
      });
    }

    const merged = deduplicateResults(allResults);
    const topDocs = merged.slice(0, 7);

    if (topDocs.length === 0 || topDocs[0].score < 1.0) {
      return {
        thoughtSteps,
        content: unknownResponse(),
        knowledgeHits: [],
      };
    }

    const crossLinks = findCrossLinks(topDocs.map((t) => t.item));
    thoughtSteps.push({
      id: 'step-cross-ref',
      type: 'reasoning',
      title: `Cross-referencing ${topDocs.length} sources`,
      description: crossLinks || 'No direct cross-references found.',
    });

    const confidence = computeConfidence(topDocs, queryTerms);
    thoughtSteps.push({
      id: 'step-deep-synth',
      type: 'synthesis',
      title: 'Writing comprehensive response',
      description: `Synthesising ${topDocs.length} sources. Confidence: ${(confidence * 100).toFixed(0)}%`,
    });

    const text = synthesiseDeep(prompt, intent, topDocs);
    return {
      thoughtSteps,
      content: enforceStrictSdkRules(text, prompt, settings.userCustomDirectives, {
        isSuperChill,
        username: settings.userName,
        systemInstruction: persona.systemPrompt,
      }),
      knowledgeHits: topDocs.map((t) => t.item.title),
    };
  }

  // STANDARD MODE
  let results = searchKnowledgeGraph(memory.augmentedQuery, allKnowledge, 7);
  results = applyContextBoost(results, memory.citedDocIds);

  thoughtSteps.push({
    id: 'step-searched-docs',
    type: 'retrieval',
    title: `Searched ${allKnowledge.length} docs`,
    description:
      results.length === 0
        ? 'Nothing found.'
        : results.slice(0, 4).map((r) => `[${r.score.toFixed(2)}] ${r.item.title}`).join('\n'),
  });

  if (results.length === 0 || results[0].score < 1.0) {
    return {
      thoughtSteps,
      content: unknownResponse(),
      knowledgeHits: [],
    };
  }

  const top = results.slice(0, 3);
  const confidence = computeConfidence(results, queryTerms);

  thoughtSteps.push({
    id: 'step-reasoning',
    type: 'reasoning',
    title: 'Reasoning over docs',
    description: `Top: '${results[0].item.title}' (${results[0].score.toFixed(2)})\nConfidence: ${(confidence * 100).toFixed(0)}%`,
  });

  thoughtSteps.push({
    id: 'step-writing-response',
    type: 'synthesis',
    title: 'Writing response',
    description: `${top.length} source(s) · intent: ${intentLabel(intent)}`,
  });

  const mainText = synthesiseStandard(prompt, intent, top);
  const followUps = suggestFollowUps(prompt, intent, results);

  return {
    thoughtSteps,
    content: enforceStrictSdkRules(mainText + followUps, prompt, settings.userCustomDirectives, {
      isSuperChill,
      username: settings.userName,
      systemInstruction: persona.systemPrompt,
    }),
    knowledgeHits: top.map((t) => t.item.title),
  };
}

function deduplicateResults(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
) {
  const map = new Map<string, { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }>();
  for (const r of results) {
    const existing = map.get(r.item.id);
    if (!existing || r.score > existing.score) {
      map.set(r.item.id, r);
    }
  }
  return Array.from(map.values()).sort((a, b) => b.score - a.score);
}

function computeConfidence(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  queryTerms: string[]
): number {
  if (results.length === 0) return 0;
  const topScore = results[0].score;
  const secondScore = results.length > 1 ? results[1].score : 0.0;

  const magnitudeSignal = Math.min(topScore / 10.0, 1.0);
  const gapRatio = topScore / Math.max(secondScore, 0.5);
  const gapSignal = Math.min((gapRatio - 1.0) / 3.0, 1.0);

  const topText = (results[0].item.content + ' ' + results[0].item.title).toLowerCase();
  const matched = queryTerms.filter((t) => topText.includes(t)).length;
  const coverageSignal = queryTerms.length === 0 ? 0.5 : matched / queryTerms.length;

  const threshold = Math.max(topScore * 0.4, 2.0);
  const supporters = results.filter((r) => r.score >= threshold).length;
  const supportSignal = Math.min(supporters / 3.0, 1.0);

  const raw = 0.3 * gapSignal + 0.28 * coverageSignal + 0.25 * magnitudeSignal + 0.17 * supportSignal;
  return Math.max(0.15, Math.min(raw, 0.97));
}

function decomposeQuery(
  query: string,
  intent: QueryIntent,
  queryTerms: string[],
  entities: string[]
): string[] {
  const subject = entities.length === 0 ? queryTerms.slice(0, 3).join(' ') : entities.slice(0, 2).join(' ');

  switch (intent) {
    case 'definition':
      return [
        `What is the definition and origin of ${subject}?`,
        `What are the core properties and principles of ${subject}?`,
        `What are practical examples and applications of ${subject}?`,
      ];
    case 'explanation':
      return [
        `What is ${subject} at a fundamental level?`,
        `What mechanism or process drives ${subject}?`,
        `What are the consequences and real-world importance of ${subject}?`,
      ];
    case 'causal':
      return [
        `What are the root causes of ${subject}?`,
        `What conditions make ${subject} happen?`,
        `What are the effects and outcomes of ${subject}?`,
      ];
    case 'comparative':
      if (entities.length >= 2) {
        return [
          `What are the key features and properties of ${entities[0]}?`,
          `What are the key features and properties of ${entities[1]}?`,
          `What are the main differences between ${entities[0]} and ${entities[1]}?`,
        ];
      }
      return [`Core features of ${subject}`, `Similarities within ${query}`, `Key differences within ${query}`];
    case 'temporal':
      return [
        `What are the origins and early history of ${subject}?`,
        `What were the key milestones and turning points of ${subject}?`,
        `What is the current state and legacy of ${subject}?`,
      ];
    case 'person':
      const name = entities[0] || subject;
      return [
        `Who is ${name} and what is their background?`,
        `What are the major achievements and contributions of ${name}?`,
        `What is the lasting impact and legacy of ${name}?`,
      ];
    case 'location':
      return [
        `Where is ${subject} and what are its physical characteristics?`,
        `What is the historical and cultural significance of ${subject}?`,
        `What is ${subject} known for today?`,
      ];
    case 'listing':
      return [
        `What are the main types or categories of ${subject}?`,
        `What are specific examples of ${subject}?`,
        `What are the key properties that distinguish different ${subject}?`,
      ];
    default:
      return [
        `What is ${subject} and how does it work?`,
        `Why does ${subject} matter?`,
        `What are the most important things to know about ${subject}?`,
      ];
  }
}

function casualOpener(intent: QueryIntent): string {
  const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  switch (intent) {
    case 'definition':
      return pick([
        "Alright, let's break down what that actually means: ",
        "Okay so basically: ",
        "Right, here is what this is: ",
        "Damn good question. Here's the real definition: ",
        "Here's the straight breakdown: ",
        "Check this out — ",
      ]);
    case 'explanation':
      return pick([
        "Alright, here is how this actually works: ",
        "Let me break this down so it makes sense: ",
        "Okay so — check this out: ",
        "Here's how this runs under the hood: ",
        "Look, here is the real explanation: ",
        "Breaking this down step by step: ",
      ]);
    case 'causal':
      return pick([
        "Here is why that happens: ",
        "Okay so the root cause is pretty clear: ",
        "Good question. Here's the real reason behind this: ",
        "So what's going on here: ",
        "The reason behind this is actually interesting: ",
      ]);
    case 'temporal':
      return pick([
        "Let's look at the timeline because this is wild: ",
        "Here's the breakdown of how this went down: ",
        "Historically speaking: ",
        "Going back to how it started: ",
        "Here's the sequence of events: ",
      ]);
    case 'person':
      return pick([
        "Alright, let's talk about them: ",
        "Right — here is who we're talking about: ",
        "Here is the story: ",
        "Here's what they actually did: ",
      ]);
    case 'comparative':
      return pick([
        "Okay, let's compare these two side-by-side:\n",
        "Alright, breaking down the difference:\n",
        "Here's how they stack up against each other:\n",
        "Good comparison — here's how they match up:\n",
      ]);
    case 'listing':
      return pick([
        "Here's the full list: ",
        "Alright, here's what we got — clean and straight:\n",
        "Okay, so the main ones to know:\n",
        "Here is the complete rundown:\n",
      ]);
    default:
      return pick([
        "Alright, so check this out — ",
        "Okay, here's the deal: ",
        "Look, basically: ",
        "So here's what's happening: ",
        "Right, let me break this down: ",
        "Damn good question. ",
      ]);
  }
}

function secondaryBridge(): string {
  const bridges = [
    'Also worth knowing: ',
    'On top of that: ',
    'Related point — ',
    'And honestly? ',
    'Another key angle: ',
  ];
  return bridges[Math.floor(Math.random() * bridges.length)];
}

function deeperHint(): string {
  const hints = [
    '*Ask me to go deeper on any part of this.*',
    '*Want more detail? Just ask.*',
    "*That's the core — I can expand on any angle.*",
    "*There's more to this — ask if you want the full picture.*",
  ];
  return hints[Math.floor(Math.random() * hints.length)];
}

function variedSentences(
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[],
  docIndex = 0,
  pick = 4
): string[] {
  if (results.length <= docIndex) return [];
  const doc = results[docIndex];
  const pool =
    doc.relevantSentences && doc.relevantSentences.length > 0
      ? doc.relevantSentences.slice(0, pick + 2)
      : splitSentences(doc.item.content).slice(0, pick + 2);

  if (pool.length === 0) return [];
  if (pool.length >= 2 && Math.random() < 0.25) {
    return [pool[1], pool[0], ...pool.slice(2, pick)];
  }
  return pool.slice(0, pick);
}

export function synthesiseWebSearchResults(
  query: string,
  intent: QueryIntent,
  results: WebSearchResult[],
  persona: ModelPersona,
  settings: AISettings,
  isSuperChill: boolean
): string {
  const top = results.slice(0, 4);
  if (top.length === 0) return unknownResponse();

  const isPolish =
    /[\u0105\u0107\u0119\u0142\u0144\u00f3\u015b\u017a\u017c]/i.test(query) ||
    /\b(kurwa|jaki|kiedy|gdzie|dlaczego|kto|co to|siema|mordeczko|chuj|zajebi)/i.test(query);

  const isCrashout = persona.id === 'crashout-bot' || settings.activePersonaId === 'crashout-bot';

  // 1. Pick an intro with profanity / personality
  let intro = '';
  if (isPolish) {
    intro = 'Kurwa, sprawdziłem to w Google i na necie bez pierdolenia! Łap konkretne fakty:\n';
  } else if (isSuperChill) {
    intro = 'Yo fuck yeah my favorite homie! I searched Google for you and got the absolute real facts on this shit:\n';
  } else if (isCrashout) {
    intro = 'Bro, I literally went and searched Google for this shit because you asked, and holy fuck check this out:\n';
  } else if (settings.swearEngineEnabled !== false) {
    const intros = SWEAR_DICTIONARY.english.intros.webSearch;
    intro = intros[Math.floor(Math.random() * intros.length)] + '\n';
  } else {
    intro = `Here is what I found from searching the live web for **"${query}"**:\n`;
  }

  // 2. Synthesize key snippets into structured points
  const points: string[] = [];
  for (let i = 0; i < top.length; i++) {
    const item = top[i];
    let cleanedSnippet = item.snippet
      .replace(/^(?:Wikipedia\s*[-—:]*|\bSource:.*$)/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedSnippet) continue;

    // Apply natural conversational / swear phrasing to the points
    if (settings.swearEngineEnabled !== false && !isPolish) {
      cleanedSnippet = enhanceNaturalSwearPhrasing(cleanedSnippet, settings.swearIntensity || 'moderate');
    }

    // Format clean bullet
    const cleanTitle = item.title.replace(/\s*-\s*(?:Wikipedia|Google|YouTube|Reddit|GitHub).*$/i, '').trim();
    points.push(`### 🔹 ${cleanTitle}\n${cleanedSnippet}`);
  }

  // 3. Synthesis body
  let body = '';
  if (points.length > 0) {
    body = points.join('\n\n');
  } else {
    body = top.map((t) => `• **${t.title}**: ${t.snippet}`).join('\n\n');
  }

  // 4. Punchline
  const punchline = isPolish
    ? '*I to są kurwa konkretne fakty.*'
    : isSuperChill
    ? '*Always got your back my guy, clean as fuck!*'
    : isCrashout
    ? '*Boom. Live data, zero cap, pure chaos.*'
    : `*${SWEAR_DICTIONARY.english.punchlines[Math.floor(Math.random() * SWEAR_DICTIONARY.english.punchlines.length)]}*`;

  // 5. Append Verified Live Web Sources
  const sourcesBlock = [
    '\n\n---\n**🌐 Live Web Sources (Google & Web — 0 APIs, Infinite Quota):**',
    ...top.map((t) => {
      const domain = t.domain || 'web';
      const badge = t.source === 'wikipedia' ? '📚 Wikipedia' : t.source === 'google' ? '🌐 Google' : '🔍 DuckDuckGo';
      return `• [${t.title}](${t.url}) — \`${badge}\` *(${domain})*`;
    }),
  ].join('\n');

  // 6. Suggest follow-ups
  const followUpQueries = [
    `*Want to know more about **${top[0]?.title.slice(0, 40) || query}**? Just ask!*`,
  ].join('\n');

  return `${intro}\n${body}\n\n${punchline}${sourcesBlock}\n\n${followUpQueries}`;
}

function synthesiseStandard(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
): string {
  const opener = casualOpener(intent);
  const primary = results[0];

  switch (intent) {
    case 'definition': {
      const sents = variedSentences(results, 0, 3);
      const hasSecondary = results.length > 1 && results[1].relevantSentences?.length;
      if (Math.random() < 0.5) {
        let text = `${opener}**${primary.item.title}**\n\n${sents.join(' ')}`;
        if (hasSecondary && results[1].relevantSentences) {
          text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
        }
        return text;
      } else {
        let text = `${opener}${sents.join(' ')}`;
        if (hasSecondary && results[1].relevantSentences) {
          text += `\n\n${results[1].relevantSentences[0]}`;
        }
        text += `\n\n*(Source: **${primary.item.title}**)*`;
        return text;
      }
    }
    case 'explanation': {
      const sents = variedSentences(results, 0, 5);
      if (Math.random() < 0.5) {
        let text = `${opener}**${primary.item.title}**\n\n${sents.join(' ')}`;
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\nAnd another angle: ${results[1].relevantSentences.slice(0, 2).join(' ')}`;
        }
        return text;
      } else {
        const mid = Math.max(1, Math.floor(sents.length / 2));
        let text = `${opener}**The basics:** ${sents.slice(0, mid).join(' ')}`;
        if (sents.length > mid) {
          text += `\n\n**Going deeper:** ${sents.slice(mid).join(' ')}`;
        }
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
        }
        return text;
      }
    }
    case 'causal': {
      const sents = variedSentences(results, 0, 4);
      if (Math.random() < 0.5 && sents.length >= 3) {
        let text = `${opener}**${primary.item.title}**\n\n`;
        text += `**Why it happens:** ${sents[0]}\n\n`;
        text += `**How it works:** ${sents[1]}\n\n`;
        text += `**The result:** ${sents[2]}`;
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\nRelated: ${results[1].relevantSentences[0]}`;
        }
        return text;
      } else {
        let text = `${opener}${sents.join(' ')}`;
        if (results.length > 1 && results[1].relevantSentences?.length) {
          text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
        }
        text += `\n\n*(From: **${primary.item.title}**)*`;
        return text;
      }
    }
    case 'comparative': {
      if (results.length >= 2) {
        if (Math.random() < 0.5) {
          let text = `${opener}\n\n`;
          for (const doc of results.slice(0, 3)) {
            const sents = variedSentences([doc], 0, 3);
            text += `**${doc.item.title}**\n${sents.map((s) => `• ${s}`).join('\n')}\n\n`;
          }
          text = text.trim();
          if (results.length > 2 && results[2].relevantSentences?.length) {
            text += `\n\n**Bottom line:** ${results[2].relevantSentences[0]}`;
          }
          return text;
        } else {
          const s1 = variedSentences(results, 0, 2);
          const s2 = variedSentences(results, 1, 2);
          let text = `${opener}**${results[0].item.title}:** ${s1.join(' ')}\n\n**${results[1].item.title}:** ${s2.join(' ')}`;
          if (results.length > 2 && results[2].relevantSentences?.length) {
            text += `\n\n**Key difference:** ${results[2].relevantSentences[0]}`;
          }
          return text;
        }
      }
      break;
    }
    case 'listing': {
      const sents = variedSentences(results, 0, 6);
      const isNumbered = Math.random() < 0.5;
      let text = `${opener}**${primary.item.title}**\n\n`;
      sents.forEach((sent, idx) => {
        text += isNumbered ? `${idx + 1}. ${sent}\n` : `• ${sent}\n`;
      });
      return text.trim();
    }
    default:
      break;
  }

  const sents = variedSentences(results, 0, 4);
  let text = `${opener}**${primary.item.title}**\n\n${sents.join(' ')}`;
  if (results.length > 1 && results[1].relevantSentences?.length) {
    text += `\n\n${secondaryBridge()}${results[1].relevantSentences[0]}`;
  }
  if (sents.length >= 3) {
    text += `\n\n${deeperHint()}`;
  }
  return text;
}

function synthesiseCrashout(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
): string {
  const primary = results[0];
  const sents = variedSentences(results, 0, 4);

  const crashOpeners = [
    "Okay FINE, let me tell you about this because apparently we're doing this right now.",
    "Alright bro, you want to know? I'll tell you. Here's the deal:",
    "Oh you wanna go there? Let's GO. Here's what I know:",
    'Not gonna lie this topic is actually wild. Listen up:',
    'Bro. BRÖTHER. Okay. Let me break this down for you properly:',
  ];
  const opener = crashOpeners[Math.floor(Math.random() * crashOpeners.length)];
  let text = `${opener}\n\n**${primary.item.title}**\n\n${sents.join(' ')}`;

  if (results.length > 1 && results[1].relevantSentences?.length) {
    text += `\n\nAnd honestly? ${results[1].relevantSentences.slice(0, 2).join(' ')}`;
  }

  const outros = [
    "\n\nThat's the shit. Take it or leave it.",
    '\n\nAnyway. You asked, I answered. We good.',
    '\n\nFact. No debate. No notes.',
    "\n\nDon't @ me, that's just how it is.",
  ];
  text += outros[Math.floor(Math.random() * outros.length)];
  return text;
}

function synthesiseDeep(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number; snippet?: string; relevantSentences?: string[] }[]
): string {
  const primary = results[0];
  const sents =
    primary.relevantSentences && primary.relevantSentences.length > 0
      ? primary.relevantSentences.slice(0, 5)
      : splitSentences(primary.item.content).slice(0, 5);

  const parts: string[] = [];
  parts.push(`Okay, I went deep on this. Here's everything:\n\n**${primary.item.title}**\n\n${sents.join(' ')}`);

  if (intent === 'comparative' && results.length >= 2) {
    let comp = '**Comparing side by side:**\n\n';
    for (const r of results.slice(0, 3)) {
      const rSents = r.relevantSentences?.length ? r.relevantSentences.slice(0, 3) : splitSentences(r.item.content).slice(0, 3);
      comp += `**${r.item.title}**\n${rSents.map((s) => `• ${s}`).join('\n')}\n\n`;
    }
    parts.push(comp.trim());
  }

  if (intent === 'causal' && sents.length >= 3) {
    parts.push(`**The causal chain:**\n\n**Cause:** ${sents[0]}\n\n**Mechanism:** ${sents[1]}\n\n**Effect:** ${sents[2]}`);
  }

  const secondaries = results.slice(1, 5);
  if (secondaries.length > 0) {
    const lines: string[] = [];
    for (const doc of secondaries) {
      if (doc.relevantSentences && doc.relevantSentences.length > 0) {
        lines.push(`**${doc.item.title}:** ${doc.relevantSentences.slice(0, 2).join(' ')}`);
      }
    }
    if (lines.length > 0) {
      parts.push(`**Additional context:**\n\n${lines.join('\n\n')}`);
    }
  }

  const cats = Array.from(new Set(results.slice(0, 4).map((r) => r.item.category)));
  if (cats.length > 1) {
    parts.push(`*Note: this spans multiple domains (${cats.join(', ')}) — the answer shifts depending on which lens you use.*`);
  }

  return parts.join('\n\n');
}

function suggestFollowUps(
  query: string,
  intent: QueryIntent,
  results: { item: KnowledgeItem; score: number }[]
): string {
  if (results.length <= 1) return '';
  const q = query.toLowerCase();

  const unusedTags = results[0].item.keywords.filter((k) => k.length > 3 && !q.includes(k.toLowerCase()));
  const adjacentTitles = results
    .slice(1, 4)
    .map((r) => shortTitle(r.item.title))
    .filter((t) => !q.includes(t.toLowerCase()));

  const pool: string[] = [];
  if (unusedTags[0]) {
    switch (intent) {
      case 'definition':
      case 'explanation':
        pool.push(`How does ${unusedTags[0]} work in practice?`);
        break;
      case 'causal':
        pool.push(`What role does ${unusedTags[0]} play here?`);
        break;
      default:
        pool.push(`Tell me more about ${unusedTags[0]}`);
    }
  }
  if (unusedTags[1]) {
    pool.push(`Tell me about ${unusedTags[1]}`);
  }

  for (const title of adjacentTitles.slice(0, 3 - pool.length)) {
    pool.push(`What is ${title}?`);
  }

  const picks = pool.slice(0, 3);
  if (picks.length === 0) return '';
  return `\n\n---\n*Keep exploring:*\n${picks.map((p) => `• ${p}`).join('\n')}`;
}

function shortTitle(title: string): string {
  if (title.includes(':')) {
    const before = title.split(':')[0].trim();
    if (before.length >= 3) return before;
  }
  const words = title.split(/\s+/);
  if (words.length > 5) return words.slice(0, 5).join(' ') + '…';
  return title;
}

function findCrossLinks(docs: KnowledgeItem[]): string {
  const links: string[] = [];
  for (let i = 0; i < docs.length; i++) {
    for (let j = i + 1; j < docs.length; j++) {
      const t1 = new Set(processForSearch(docs[i].content + ' ' + docs[i].title));
      const t2 = new Set(processForSearch(docs[j].content + ' ' + docs[j].title));
      const shared = Array.from(t1).filter((t) => t2.has(t) && t.length > 3);
      if (shared.length >= 3) {
        links.push(`'${docs[i].title}' ↔ '${docs[j].title}': [${shared.slice(0, 4).join(', ')}]`);
      }
    }
  }
  return links.slice(0, 4).join('\n');
}
