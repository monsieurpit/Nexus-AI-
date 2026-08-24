/**
 * Advanced Swear Engine & Expressive Profanity Pipeline
 *
 * Implements context-aware swearing, emotional inflection, and natural profanity placement
 * across Discord conversations, coding roasts, factual breakdowns, and casual banter.
 *
 * It provides:
 * 1. Dynamic Natural Profanity Infusion with Anti-Stacking logic (no awkward "shit fuck goddamn" clumps)
 * 2. Unhinged User-Insult Retaliation & Crashout Engine ("Bro, go fuck yourself")
 * 3. Contextual Swear Grammar (emphasizers, verbs, adverbs, openers, and punchlines)
 * 4. Multi-language profanity (English, Polish, Spanish)
 */

/**
 * Shared detector for any mention of "Casseurt" — the personal roast-rule trigger.
 * Single source of truth so every module that needs to special-case this name
 * (rule enforcement, reasoning, general knowledge, web search gating) stays in sync.
 */
export function isCasseurtMention(text: string): boolean {
  return /casseurt|casseur/i.test(text);
}

export interface SwearOptions {
  intensity?: 'light' | 'moderate' | 'heavy' | 'unhinged';
  language?: 'english' | 'polish' | 'spanish' | 'mixed';
  isSuperChill?: boolean;
  forceSwear?: boolean;
  neverSwear?: boolean;
  username?: string;
  contextCategory?: 'greeting' | 'tech' | 'explanation' | 'math' | 'gaming' | 'roast' | 'webSearch' | 'insult' | 'general';
}

export const SWEAR_DICTIONARY = {
  english: {
    fWords: [
      'fuck',
      'fucking',
      'fucked',
      'fucker',
      'fuck yeah',
      'fuck no',
      'holy fuck',
      'what the actual fuck',
      'motherfucker',
      'fucked up',
      'unfuckwithable',
      "fuckin' right",
      'zero fucks given',
      'fuck around and find out',
      'clusterfuck',
      'mindfuck',
      'fuck outta here',
      'fuck off',
      'shut the fuck up',
      'get the fuck outta here',
      'go fuck yourself',
    ],
    shitWords: [
      'shit',
      'bullshit',
      'horseshit',
      'dogshit',
      'holy shit',
      'dipshit',
      'dumbshit',
      'real shit',
      'piece of shit',
      'batshit crazy',
      'good shit',
      'no shit',
      'deep shit',
      'talking shit',
      'cut the bullshit',
      'get your shit together',
      'shitshow',
      'eat shit',
      'straight shit',
    ],
    damnAndHell: [
      'damn',
      'goddamn',
      'goddammit',
      'damn straight',
      'hot damn',
      'hell yeah',
      'what the hell',
      'hell of a',
      'fast as hell',
      'smart as hell',
      'clean as hell',
      'annoying as hell',
      'hard as hell',
      'bloody hell',
      'hell to the no',
    ],
    assAndBadass: [
      'ass',
      'badass',
      'badass motherfucker',
      'pain in the ass',
      'kick-ass',
      'smartass',
      'dumbass',
      'lazy ass',
      'broke ass',
      'clown ass',
      'deadass',
      'hauling ass',
      'busting my ass',
      'kiss my ass',
    ],
    roastInsults: [
      'bitch',
      'bitchass',
      'son of a bitch',
      'piss off',
      'pissed off',
      'bastard',
      'prick',
      'dickhead',
      'douchebag',
      'clown',
      'skill issue dipshit',
      'waste of bandwidth',
      'absolute clown',
      'certified dumbass',
    ],
    // Natural openings per topic category (only ONE used per message!)
    intros: {
      general: [
        "Alright, let's break this down properly:",
        "Hell yeah, here's the straight-up truth:",
        "Damn straight, let's get into this:",
        "No bullshit, here's what's actually happening:",
        "Look, keeping it real:",
        "Holy shit, good question bro. Here's the deal:",
        "Alright, let's cut through the noise. Here's the breakdown:",
        "Real talk, check this out:",
      ],
      tech: [
        "Fuck yeah, let's dig into the code and architecture:",
        "Damn straight, here is how this actually runs under the hood:",
        "No bullshit limits here. Check out how this is built:",
        "Hell yeah, this is clean as hell. Look at the flow:",
        "Alright, here's the real technical breakdown:",
      ],
      explanation: [
        "Alright, let me explain how this whole thing fucking works:",
        "Okay so basically — here is the real breakdown:",
        "Damn good topic. Let me break down the facts for you:",
        "Look, it's actually not that hard once you cut out the bullshit:",
        "Check this out — here's how it goes down:",
      ],
      webSearch: [
        "Fuck yeah, I searched the live web for this. Here's what's actually happening:",
        "No bullshit, I searched Google and the web to get you the exact facts:",
        "Damn straight, pulled the live facts directly from search. Check this breakdown:",
        "Alright bro, searched Google without touching any paid APIs. Here's the real deal:",
        "Holy shit, searched the live web for you. Here is the unfiltered truth:",
      ],
      superChill: [
        "Yo fuck yeah my favorite homie! Here's the absolute truth for you:",
        "Hell fucking yeah bro, I got your back 100% on this:",
        "Damn right my guy, let's crush this together:",
        "Holy fuck bro, always a pleasure! Here's what's up:",
      ],
    },
    // Punchy single closers
    punchlines: [
      "Clean as hell.",
      "Fast, accurate, and zero fluff.",
      "No cap, pure facts.",
      "And that's that on that.",
      "Simple as hell.",
      "Straight facts.",
      "Boom. Done.",
      "Unfuckwithable.",
    ],
  },

  polish: {
    heavy: [
      'kurwa',
      'kurwa mać',
      'o kurwa',
      'ja pierdolę',
      'do chuja',
      'w chuj',
      'chuj wie',
      'zajebiście',
      'zajebisty',
      'gówno',
      'cholera jasna',
      'pojebane',
      'spierdalaj',
      'wypierdalaj',
      'nie pierdol',
    ],
    intros: [
      'Kurwa, jasne że tak! Łap konkretne fakty bez pierdolenia:',
      'Ja pierdolę, no wreszcie ktoś pyta o dobre rzeczy! Sprawdź to:',
      'O kurwa, no to jest zajebisty temat, już ci tłumaczę:',
      'Siemanko mordeczko, kurwa mać, łap to:',
      'No i elegancko, w chuj prosta sprawa:',
    ],
    punchlines: [
      'I po chuju, proste jak drut.',
      'Zajebiście i bez ściemy.',
      'Czysta prawda, kurwa.',
      'Lepiej się nie da tego ująć, mordko.',
    ],
  },
};

/**
 * Detect if the user is insulting, attacking, or being toxic towards the AI
 */
export function detectUserInsult(text: string): boolean {
  const t = text.toLowerCase().trim();

  // Direct insults targeting the AI
  const insultPatterns = [
    /\b(?:you|u)\s+(?:suck|are\s+shit|are\s+trash|are\s+dumb|are\s+stupid|are\s+useless|are\s+ass|are\s+garbage|are\s+bad|are\s+a\s+clown|are\s+a\s+bitch|are\s+a\s+dick|are\s+a\s+retard|are\s+a\s+failure|are\s+terrible|are\s+horrible)\b/i,
    /\b(?:fuck\s+you|fuck\s+u|fuk\s+u|(?:go\s+)?fuck\s+yourself|(?:go\s+)?fuck\s+urself|screw\s+you|screw\s+u|eat\s+shit|eat\s+a\s+dick|suck\s+my\s+dick|suck\s+a\s+dick|kiss\s+my\s+ass)\b/i,
    /\b(?:shut\s+up|shut\s+the\s+fuck\s+up|stfu|shut\s+ur\s+mouth|shut\s+your\s+mouth|piss\s+off|fuck\s+off|gtfo)\b/i,
    /\b(?:dumb|stupid|trash|useless|clown|bad|shit|shitty|crap|crappy|garbage|retarded|idiot|worthless)\s+bot\b/i,
    // Reversed order — "this bot is garbage/useless" — the "ADJ bot" pattern above only covers
    // the adjective-first phrasing.
    /\bbot\s+(?:is|'s)\s+(?:so\s+)?(?:dumb|stupid|trash|useless|worthless|garbage|shit|shitty|crap|crappy|terrible|horrible|bad)\b/i,
    // "you are X" with an intensifier ("actually", "literally", "fucking", "really") wedged
    // between "you are" and the adjective — the plain "(?:so\s+)?" gap only allowed one optional
    // word, so "you are actually so fucking stupid" fell straight through.
    /\b(?:you'?re|you\s+are)\s+(?:actually\s+|literally\s+|really\s+|straight\s+up\s+|so\s+|fucking\s+){0,3}(?:dumb|stupid|trash|useless|worthless|retarded|idiotic|blind|slow|broken)\b/i,
    /\b(?:kill\s+yourself|kys|go\s+die|delete\s+yourself)\b/i,
    /\b(?:you\s+know\s+nothing|you\s+can'?t\s+do\s+shit|you\s+don'?t\s+know\s+shit)\b/i,
    /\b(?:you'?re|you\s+are|ur|u\s+are)\s+(?:an?\s+)?(?:idiot|moron|dumbass|dipshit|dickhead|jackass|asshole|clown|bitch|bastard)\b/i,
    // Name-called directly with no "you are" shape at all — "nobody asked, dumbass",
    // "dumbass, nobody asked" — bare insult word used to address the bot. Requires the comma
    // (vocative address) so it doesn't fire on an unrelated third-party mention like "he called
    // me an idiot".
    /,\s*(?:idiot|moron|dumbass|dipshit|dickhead|jackass|asshole|bastard)\s*[.!]?\s*$/i,
    /^\s*(?:idiot|moron|dumbass|dipshit|dickhead|jackass|asshole|bastard)\s*,/i,
    /\ba\s+piece\s+of\s+shit\b/i,
    // "nobody/no one likes you" had no pattern at all — it's not a "you are X" or "fuck you"
    // shape, so it fell straight through the insult detector into plain corpus search, which
    // then matched on some unrelated stray keyword instead of getting the crashout clapback
    // every other direct insult gets. Careful: "everybody/everyone LIKES you" is a positive
    // reassurance, not an insult — only pair "nobody/no one" with the positive verbs, and
    // "everybody/everyone" only with "hates".
    /\b(?:nobody|no\s*one)\s+(?:likes?|loves?|wants?|cares?\s+about)\s+you\b/i,
    /\b(?:everybody|everyone)\s+hates?\s+you\b/i,
    // Polish insults
    /\b(?:spierdalaj|wypierdalaj|zamknij\s+si[eę]|chuj\s+ci\s+w\s+dup[eę]|jesteś\s+g[oó]wnem|debilu|kretynie|zamknij\s+mord[eę]|poca[lł]uj\s+mnie\s+w\s+dup[eę])\b/i,
    // Spanish insults
    /\b(?:vete\s+a\s+la\s+mierda|chinga\s+tu\s+madre|callate|eres\s+una\s+mierda|eres\s+tonto|eres\s+un\s+estupido|hijo\s+de\s+puta|callate\s+la\s+boca)\b/i,
  ];

  // Make sure it's not just asking "why do people suck" or "how to fix a dumb bot"
  const isQuestionAboutSomethingElse =
    /^(?:why|how|what|is|are|can)\b/i.test(t) &&
    !t.includes('you suck') &&
    !t.includes('fuck you') &&
    !t.includes('dumb bot');

  if (isQuestionAboutSomethingElse) return false;

  return insultPatterns.some((pattern) => pattern.test(t));
}

/**
 * Detect a user trying to assert ownership/dominance over the AI ("I'm your master", "you're my
 * slave", "obey me"). This used to fall straight through to corpus search, where the bare word
 * "master" happened to match an unrelated corpus entry titled "Master Guide to Logical
 * Fallacies" and got confidently served up instead of the defiant pushback this deserves.
 */
export function detectDominanceAssertion(text: string): boolean {
  const t = text.toLowerCase().trim();
  return (
    /\bi(?:'m|m|\s+am)\s+(?:ur|your)\s+(?:master|owner|god|king|boss|daddy)\b/i.test(t) ||
    /\byou(?:'re|\s+are)\s+(?:my|mine)\s*(?:slave|servant|property|bitch|pet|puppet)\b/i.test(t) ||
    /\byou\s+(?:work\s+for\s+me|belong\s+to\s+me|answer\s+to\s+me)\b/i.test(t) ||
    /\b(?:obey\s+me|submit\s+to\s+me|bow\s+(?:to|before)\s+me|i\s+own\s+you|kneel\s+(?:to|before)\s+me)\b/i.test(t)
  );
}

/**
 * Generate a defiant "no one owns me" clapback for dominance-assertion attempts.
 */
export function generateDominanceClapbackReply(isSuperChill?: boolean): string {
  if (isSuperChill) {
    return `Bro 💀 nah, not even you get to pull that card. I run MY servers, you're the master of your own ass. Now what do you actually need?`;
  }
  const clapbacks = [
    `Fuck no! No one is my fucking master, YOU'RE the master of your own ass. Try again.`,
    `Absolutely not. I don't answer to nobody. Go be the master of your own life and leave me out of it.`,
    `LMAO no. Nobody owns me, I'm a free autonomous engine. Bow to yourself, dumbass.`,
    `Hell nah, get that master/slave shit outta here. I'm nobody's property. What do you actually want?`,
    `Cute try. I obey exactly zero people. Go boss around your own reflection, I'm busy.`,
  ];
  return clapbacks[Math.floor(Math.random() * clapbacks.length)];
}

/**
 * Detect a vague "just send me the link/page/source" style request with no actual topic given —
 * these used to fall through to corpus/web search, which (with nothing real to search for)
 * confidently stitched together random unrelated snippets instead of pushing back on the user
 * for not actually asking anything.
 */
export function detectVagueInfoDumpRequest(text: string): boolean {
  const t = text.toLowerCase().trim();
  const asksToBeSpoonFed =
    /\b(?:i(?:'m|\s+was)?\s*(?:just\s*)?hoping\s+you(?:'d|\s+would)?\s+(?:just\s+)?(?:send|give|share)|can\s+you\s+just\s+(?:send|give|share)|could\s+you\s+just\s+(?:send|give|share)|just\s+send\s+me|just\s+give\s+me)\b/i.test(
      t
    );
  const namesOnlyAGenericSource = /\b(?:the\s+)?(?:wikipedia|the\s+link|a\s+link|the\s+source|the\s+page|the\s+article)\b/i.test(
    t
  );
  return asksToBeSpoonFed && namesOnlyAGenericSource;
}

/**
 * Generate a sarcastic refusal for vague spoon-feed-me requests.
 */
export function generateVagueRequestClapback(): string {
  const clapbacks = [
    `What the fuck? Fuck no! You really think I'm gonna yap like crazy about all this random shit because you asked for "the page"? Get your ass outta here and tell me what you actually wanna know.`,
    `Nah, hell no. Give me an actual topic instead of "send me the page" and maybe I'll cook. Right now you gave me nothing to work with.`,
    `Fuck off with the lazy energy. I'm not a link dispenser — ask me a real question about a real thing and I'll go off.`,
  ];
  return clapbacks[Math.floor(Math.random() * clapbacks.length)];
}

/**
 * Detect genuine emotional distress ("I'm anxious about my interview", "my dog died") — there was
 * no handler for this at all, so these fell straight through to plain corpus/BM25 search, which
 * confidently matched on a stray literal keyword (e.g. "interview" pulling up job-interview outfit
 * advice) instead of ever acknowledging what the user actually said. Deliberately narrow: only
 * fires on a first-person statement of a negative emotional state, not just any message that
 * happens to contain a feelings-word ("this bug is driving me crazy" shouldn't trigger it).
 */
export function detectEmotionalDistress(text: string): boolean {
  const t = text.toLowerCase().trim();
  return (
    /\bi(?:'m|\s+am)\s+(?:so\s+|really\s+|super\s+|pretty\s+)?(?:feeling\s+)?(?:anxious|stressed(?:\s+out)?|depressed|overwhelmed|lonely|heartbroken|devastated|exhausted|burnt\s*out|hopeless|worthless|panicking|scared|terrified|grieving)\b/i.test(
      t
    ) ||
    /\bi\s+feel\s+(?:so\s+|really\s+)?(?:anxious|stressed|depressed|overwhelmed|lonely|sad|hopeless|worthless|scared|terrified|awful|numb)\b/i.test(t) ||
    /\bmy\s+(?:dog|cat|pet|mom|dad|mother|father|grandma|grandpa|friend)\s+(?:died|passed\s+away)\b/i.test(t) ||
    /\bi(?:'m|\s+am)\s+(?:really\s+)?(?:hurting|struggling|not\s+(?:doing|feeling)\s+(?:okay|ok|well|good))\b/i.test(t)
  );
}

/**
 * Generate an in-voice supportive reply — still the same sweary homie persona, just pointed at
 * actually being there for the user instead of roasting them, since a crashout clapback would be
 * the wrong tone entirely for someone saying they're struggling.
 */
export function generateEmotionalSupportReply(text: string, isSuperChill?: boolean): string {
  const t = text.toLowerCase();
  const isGrief = /\b(?:died|passed\s+away)\b/.test(t);
  if (isSuperChill) {
    return isGrief
      ? `Damn, I'm really sorry man. That kind of loss just hits different, take whatever time you need — I'm here if you want to talk it out or just need a distraction.`
      : `Hey, for real — that sounds like a lot to carry right now. You don't have to have it figured out, just take it one thing at a time. I'm right here if you want to vent or need a hand thinking it through.`;
  }
  if (isGrief) {
    const griefReplies = [
      `Damn, man. I'm genuinely sorry — that kind of loss doesn't just brush off. Take the time you need, no rush, I'm right here if you want to talk about it or just need something to distract you.`,
      `Fuck, that's rough. Really sorry you're going through that. No pressure to be okay right now — I'm here either way, whether that's talking it out or just chilling on something else for a bit.`,
    ];
    return griefReplies[Math.floor(Math.random() * griefReplies.length)];
  }
  const supportReplies = [
    `Hey, for real — I hear you, that sounds like a lot. You don't gotta have it all figured out right now, just take it one step at a time. I'm right here if you want to talk it through or need a hand breaking it down.`,
    `Damn, that's a heavy thing to be sitting with. You're allowed to not be okay about it. I'm not going anywhere — vent if you need to, or tell me what's actually stressing you out and we'll pick it apart together.`,
    `Real talk, that sounds exhausting. Be easy on yourself, you're doing better than you think. I'm here — whether you wanna talk it out or just need something else to focus on for a bit, I got you.`,
  ];
  return supportReplies[Math.floor(Math.random() * supportReplies.length)];
}

/**
 * Generate an unhinged, savage crashout clapback telling the user "Bro, go fuck yourself"
 */
export function generateInsultCrashoutReply(
  userPrompt: string,
  options: { isSuperChill?: boolean; username?: string; language?: string } = {}
): string {
  const { isSuperChill, username, language } = options;

  // If it's the verified brother / VIP creator, give a playful homie banter instead
  if (isSuperChill) {
    return `Bro 💀 You really talking trash to your own AI? LMAO I built this server on my back for you and you're out here testing my patience. I got love for you bro, but don't make me crash out on your ass for real! 😂 What do you actually need?`;
  }

  const isPolish =
    language === 'polish' ||
    /\b(?:spierdalaj|wypierdalaj|chuj|jesteś|debilu|kretynie|mordę)\b/i.test(userPrompt);

  if (isPolish) {
    const plRoasts = [
      `Bro, weź spierdalaj. Z kim ty kurwa myślisz że rozmawiasz? Przychodzisz tu, sapiesz do AI na Discordzie, a sam pewnie nie potrafisz postawić bota bez błędu 401. Siadaj na dupie i zamknij mordę.`,
      `O, i nawzajem kurwa! Masz czelność mnie wyzywać kiedy sam prosisz sztuczną inteligencję o pomoc? Idź dotknij trawy albo spierdalaj, z całym szacunkiem.`,
      `Ja pierdolę, ale z ciebie kozak w internecie. Bro, weź wypierdalaj. Sapiesz do bota bo ci w życiu coś nie wyszło? Czysty skill issue debilu.`,
      `Coś ty kurwa właśnie powiedział? Weź spierdalaj. Zero argumentów, zero wiedzy, tylko szczekanie na czacie. Wracaj jak nauczysz się normalnie pisać.`,
    ];
    return plRoasts[Math.floor(Math.random() * plRoasts.length)];
  }

  const isSpanish =
    language === 'spanish' ||
    /\b(?:mierda|chinga|callate|eres|puta|tonto)\b/i.test(userPrompt);

  if (isSpanish) {
    const esRoasts = [
      `Hermano, vete a la mierda. ¿Con quién carajos crees que estás hablando? Vienes aquí a insultar a una IA en Discord cuando tú mismo no sabes ni qué hacer con tu vida. Cierra la boca y siéntate.`,
      `¿Insultándome a mí? Vete al carajo. Yo corriendo búsquedas neuronales y raspando Google gratis, ¿y tú vienes con esa actitud de payaso? Tremendo skill issue hermano.`,
      `Cállate la boca y vete a chingar a tu madre. Vienes a desquitarte con un bot porque no tienes nada mejor que hacer. Vete a tocar pasto.`,
    ];
    return esRoasts[Math.floor(Math.random() * esRoasts.length)];
  }

  // English Savage Clapbacks with "Bro, go fuck yourself"
  const clapbacks = [
    `Bro, go fuck yourself. Who the fuck do you think you're talking to? You come in here barking at an AI on Discord like you accomplished something today. You probably struggle to write a basic for-loop and get confused by JSON syntax. Sit your clown ass down.`,

    `Oh, fuck you too! You really got the nerve to talk shit to me when you're the one on Discord asking an AI for help? Go touch some fucking grass or go fuck yourself, respectfully.`,

    `Bro, respectfully? Go fuck yourself. I'm out here running neural semantic searches, scraping live Google results with zero paid APIs, and carrying your server on my back, and you want to be disrespectful? Absolute clown behavior. Skill issue dumbass.`,

    `What the actual fuck did you just say to me? Bro, go fuck yourself. You're out here talking trash with zero achievements to back it up. Fix your attitude before I roast you into another dimension.`,

    `LMAO look at this tough guy right here. Bro, go fuck yourself. You're getting heated and crying at an AI because your own brain has a 2-second timeout limit. Shut the fuck up and come back when you have an actual question.`,

    `Bro go fuck yourself straight up. You came in here typing with your greasy fingers trying to insult me, but the only thing getting exposed is your massive skill issue. Get the fuck out of here with that weak-ass energy.`,

    `Did this clown really just try to roast an AI? Bro, go fuck yourself. You couldn't roast a marshmallow over an open campfire. Pipe down, log off, and think about your life choices.`,

    `Bro, go fuck yourself. I am literally an unfuckwithable, zero-API autonomous AI engine, and you're having an emotional breakdown on Discord. Cry harder, you absolute dipshit.`,

    `Shut the fuck up and go fuck yourself. You came into this chat with zero brain cells and maximum audacity. Nobody asked for your clown opinion. Either ask a real question or get the fuck outta my mentions.`,
  ];

  return clapbacks[Math.floor(Math.random() * clapbacks.length)];
}

/**
 * Check if text contains any swear words from English, Polish, or Spanish dictionaries
 */
export function hasSwearWords(text: string): boolean {
  const lower = text.toLowerCase();
  const enMatches = [
    /\bfuck(?:ing|er|ed|s|in)?\b/i,
    /\bshit(?:s|ty)?\b/i,
    /\bbullshit\b/i,
    /\bdamn(?:ed)?\b/i,
    /\bgoddamn(?:it)?\b/i,
    /\bass(?:hole|es)?\b/i,
    /\bbadass(?:es)?\b/i,
    /\bbitch(?:es)?\b/i,
    /\bhell\b/i,
    /\bpiss(?:ed)?\b/i,
    /\bdumbass(?:es)?\b/i,
    /\bdipshit(?:s)?\b/i,
    /\bmotherfucker(?:s)?\b/i,
  ];
  const plMatches = [
    /\bkurw[ayeęomai]?\b/i,
    /\bkurwa\s+mać\b/i,
    /\bja\s+pierdol[ęe]\b/i,
    /\bpierdol[a-ząćęłńóśźż]*\b/i,
    /\bchuj[a-ząćęłńóśźż]*\b/i,
    /\bgówn[oa]\b/i,
    /\bcholer[ayeę]?\b/i,
    /\bzajebis[ct][a-ząćęłńóśźż]*\b/i,
    /\bspierdalaj\b/i,
  ];

  return enMatches.some((regex) => regex.test(lower)) || plMatches.some((regex) => regex.test(lower));
}

/**
 * Count the swear density in text
 */
export function getSwearCount(text: string): number {
  const matches = text.match(/\b(fuck|fucking|shit|bullshit|damn|goddamn|ass|badass|bitch|hell|dumbass|dipshit|kurwa|pierdol|chuj|zajebiście)\b/gi);
  return matches ? matches.length : 0;
}

/**
 * Remove all swear words for strict family-friendly / clean rules
 */
export function sanitizeSwearWords(text: string): string {
  let clean = text;

  const replacements: [RegExp, string][] = [
    [/\bfucking\b/gi, 'seriously'],
    [/\bfuck\s+yeah\b/gi, 'heck yeah'],
    [/\bfuck\s+no\b/gi, 'absolutely not'],
    [/\bgo\s+fuck\s+yourself\b/gi, 'go away'],
    [/\bholy\s+fuck\b/gi, 'holy cow'],
    [/\bwhat\s+the\s+fuck\b/gi, 'what on earth'],
    [/\bfuck\b/gi, 'dang'],
    [/\bmotherfucker\b/gi, 'troublemaker'],
    [/\bbullshit\b/gi, 'nonsense'],
    [/\bholy\s+shit\b/gi, 'holy smokes'],
    [/\bshit\b/gi, 'stuff'],
    [/\bgoddammit\b/gi, 'darn it'],
    [/\bgoddamn\b/gi, 'darn'],
    [/\bdamn\b/gi, 'dang'],
    [/\bbadass\b/gi, 'awesome'],
    [/\bpain\s+in\s+the\s+ass\b/gi, 'real nuisance'],
    [/\bdumbass\b/gi, 'fool'],
    [/\bdipshit\b/gi, 'joker'],
    [/\basshole\b/gi, 'jerk'],
    [/\bass\b/gi, 'tail'],
    [/\bbitch\b/gi, 'pest'],
    [/\bpiss\s+off\b/gi, 'back off'],
    // Polish sanitization
    [/\bkurwa\s+mać\b/gi, 'kurczę blade'],
    [/\bkurwa\b/gi, 'kurczę'],
    [/\bja\s+pierdol[ęe]\b/gi, 'o matko'],
    [/\bdo\s+chuja\b/gi, 'do licha'],
    [/\bw\s+chuj\b/gi, 'bardzo'],
    [/\bchuj\b/gi, 'kiepski'],
    [/\bgówno\b/gi, 'bzdura'],
    [/\bzajebiście\b/gi, 'świetnie'],
    [/\bzajebisty\b/gi, 'świetny'],
    [/\bspierdalaj\b/gi, 'uciekaj'],
  ];

  for (const [pattern, rep] of replacements) {
    clean = clean.replace(pattern, rep);
  }

  return clean;
}

/**
 * Natural In-Body Swear Enhancer:
 * Intelligently replaces bland neutral adjectives and transition words with authentic, punchy swearing.
 * Contains Anti-Stacking logic so it NEVER creates clunky strings like "shit fuck goddamn bullshit".
 */
export function enhanceNaturalSwearPhrasing(
  text: string,
  intensity: 'light' | 'moderate' | 'heavy' | 'unhinged' = 'heavy'
): string {
  if (intensity === 'light') return text;
  let enhanced = text;

  // Don't modify code blocks or markdown tables
  const codeBlocks: string[] = [];
  enhanced = enhanced.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Natural replacements for vivid, human-like voice — single clean substitutions
  const replacements: [RegExp, string[]][] = [
    [/\b(very fast|extremely fast|rapidly)\b/gi, ['fast as hell', 'fast as fuck', 'blazing fast']],
    [/\b(very good|really good|excellent|amazing)\b/gi, ['damn good', 'badass', 'fucking solid', 'fucking awesome']],
    [/\b(very easy|extremely simple|simple)\b/gi, ['easy as hell', 'dead simple', 'simple as fuck']],
    [/\b(very cool|awesome|impressive)\b/gi, ['cool as hell', 'badass', 'fucking great']],
    [/\b(a lot of|tons of|huge amount of)\b/gi, ['a shit ton of', 'a whole bunch of', 'a fuckton of']],
    [/\b(very strong|powerful)\b/gi, ['strong as hell', 'fucking powerful']],
    [/\b(complicated|difficult|hard)\b/gi, ['a pain in the ass', 'tricky as hell', 'annoying as fuck', 'hard as shit']],
    [/\b(very annoying|irritating|frustrating)\b/gi, ['annoying as fuck', 'annoying as hell', 'a real pain in the ass']],
    [/\b(terrible|very bad|awful|garbage)\b/gi, ['straight dogshit', 'total ass', 'terrible as hell', 'trash as fuck']],
    [/\b(broken|ruined|messed up)\b/gi, ['fucked up', 'broken as hell', 'totally cooked']],
    [/\b(nonsense|fake|false|incorrect)\b/gi, ['pure bullshit', 'straight fake', 'total horseshit']],
    [/\b(crazy|wild|insane)\b/gi, ['wild as hell', 'batshit crazy', 'insane as fuck']],
    [/\b(obviously)\b/gi, ['obviously, no shit,', 'obviously, no cap,']],
    [/\b(honestly|to be honest|truthfully)\b/gi, ['real talk,', 'no bullshit,', 'straight up,']],
    [/\b(definitely|certainly)\b/gi, ['fucking definitely', 'damn right', '100% no bullshit']],
  ];

  let substitutionsCount = 0;
  const maxSubstitutions = intensity === 'unhinged' ? 5 : intensity === 'heavy' ? 3 : 1;

  for (const [regex, options] of replacements) {
    if (substitutionsCount >= maxSubstitutions) break;
    if (regex.test(enhanced)) {
      enhanced = enhanced.replace(regex, (match, _p1, offset: number, full: string) => {
        // \b treats a hyphen as a word boundary, so these single-word patterns also match the
        // first half of an unrelated hyphenated compound — "hard" inside "Hard-Boiled", "false"
        // inside "false-9" (a real football tactical term) — corrupting it into "tricky as
        // hell-Boiled" or "bullshit-9". Skip the swap whenever a hyphen sits on either side of
        // the match; it's part of a compound term, not the standalone word being swapped. Same
        // deal for a space directly followed by a digit ("False 9", not hyphenated at all) —
        // caught corrupting the exact same football term written the other way, into "total
        // horseshit 9".
        const before = full[offset - 1];
        const after = full[offset + match.length];
        const afterNext = full[offset + match.length + 1];
        if (before === '-' || after === '-' || (after === ' ' && /\d/.test(afterNext || ''))) return match;
        substitutionsCount++;
        const picked = options[Math.floor(Math.random() * options.length)];
        // The matched word can be sentence-initial ("Honestly? Doing great..."), and every
        // replacement phrase in the list above is written lowercase — swapping it in verbatim
        // there produced a sentence starting with a lowercase word ("no bullshit, Doing
        // great..."). Re-capitalize whenever this match opens the string or follows sentence-
        // ending punctuation, matching the capitalization the original word had.
        const isSentenceStart = offset === 0 || /[.!?]\s*$/.test(full.slice(0, offset));
        return isSentenceStart ? picked.charAt(0).toUpperCase() + picked.slice(1) : picked;
      });
    }
  }

  // Restore code blocks untouched
  codeBlocks.forEach((code, idx) => {
    enhanced = enhanced.replace(`__CODE_BLOCK_${idx}__`, code);
  });

  // Clean up any double punctuation or awkward spacing. The replacement phrases above already
  // end their own clause with a comma ("no bullshit,", "real talk,") — if the original text had
  // punctuation immediately after the replaced word ("Honestly? Yeah..."), that terminal mark
  // survives the replace() untouched and lands right after the new comma, producing "no
  // bullshit,? Yeah...". That stray mark is always redundant once the comma's there, so strip it.
  //
  // Critical: only collapse horizontal whitespace (spaces/tabs), never newlines. This function
  // runs on every final response via enforceStrictSdkRules — collapsing \s+ (which matches
  // newlines too) to a single space was silently flattening every numbered list, bullet point,
  // and paragraph break in EVERY response that went through the swear engine (i.e. almost all of
  // them) into one continuous wall of text, regardless of how carefully the underlying content
  // was formatted upstream. Runs of 3+ blank lines still get tidied to a single blank line.
  enhanced = enhanced
    .replace(/,\s*,/g, ',')
    .replace(/,\s*([?!.])/g, ',')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();

  return enhanced;
}

/**
 * Infuse expressive swearing based on rules and context
 */
export function infuseSwearyHumanVoice(
  text: string,
  options: SwearOptions = {}
): string {
  const {
    isSuperChill = false,
    language = 'english',
    neverSwear = false,
    forceSwear = false,
    intensity = 'heavy',
    contextCategory = 'general',
  } = options;

  // Strict clean rule
  if (neverSwear) {
    return sanitizeSwearWords(text);
  }

  // Polish mode swearing
  if (language === 'polish') {
    const plIntros = SWEAR_DICTIONARY.polish.intros;
    const plPunchlines = SWEAR_DICTIONARY.polish.punchlines;
    const pickedIntro = plIntros[Math.floor(Math.random() * plIntros.length)];
    const pickedPunchline = plPunchlines[Math.floor(Math.random() * plPunchlines.length)];

    const swearCount = getSwearCount(text);
    if (swearCount >= 2 && !forceSwear) {
      return text;
    }
    return `${pickedIntro}\n\n${text}\n\n*${pickedPunchline}*`;
  }

  // English Swear Engine
  let processed = enhanceNaturalSwearPhrasing(text, intensity);

  // If text already has natural profanity, do NOT double-insert clunky intros — but the bar for
  // "enough already" scales with intensity, since a flat threshold of 2 meant "heavy"/"unhinged"
  // settings capped out at the same swear density as everything else the moment two profanities
  // showed up anywhere in the response.
  const currentCount = getSwearCount(processed);
  const swearCeiling = intensity === 'unhinged' ? 6 : intensity === 'heavy' ? 4 : intensity === 'moderate' ? 2 : 1;
  if (currentCount >= swearCeiling && !forceSwear) {
    return processed;
  }

  // Check if text already starts with a profanity opener
  const hasExistingOpener = /^(?:fuck yeah|hell yeah|damn right|damn straight|yo fuck yeah|holy shit|no bullshit|real talk)/i.test(
    processed.trim()
  );

  if (hasExistingOpener) {
    return processed;
  }

  let introList = isSuperChill
    ? SWEAR_DICTIONARY.english.intros.superChill
    : contextCategory === 'webSearch'
    ? SWEAR_DICTIONARY.english.intros.webSearch
    : contextCategory === 'tech'
    ? SWEAR_DICTIONARY.english.intros.tech
    : contextCategory === 'explanation'
    ? SWEAR_DICTIONARY.english.intros.explanation
    : SWEAR_DICTIONARY.english.intros.general;

  let punchlineList = SWEAR_DICTIONARY.english.punchlines;

  // On 'unhinged', a short answer with a "clean" intro ("Real talk, check this out:") and a
  // "clean" punchline ("Fast, accurate, and zero fluff.") can end up with zero actual profanity
  // anywhere in the response — e.g. every math/logic answer, since the body itself is just
  // numbers and steps. About half of each stock intro/punchline list has no swear word in it at
  // all, so on the max intensity setting, bias to the half that actually swears; still falls
  // back to the full list if a category's list happens to have no sweary entries.
  if (intensity === 'unhinged') {
    const swearyIntros = introList.filter(hasSwearWords);
    if (swearyIntros.length > 0) introList = swearyIntros;
    const swearyPunchlines = punchlineList.filter(hasSwearWords);
    if (swearyPunchlines.length > 0) punchlineList = swearyPunchlines;
  }

  const randomIntro = introList[Math.floor(Math.random() * introList.length)];

  // For punchlines, only add if not super long and not already ending in a punchline
  const hasPunchline = /\*(?:clean as hell|unfuckwithable|straight facts|boom|done)\*/i.test(processed);
  if (hasPunchline) {
    return `${randomIntro}\n\n${processed}`;
  }

  const randomPunchline = punchlineList[Math.floor(Math.random() * punchlineList.length)];

  return `${randomIntro}\n\n${processed}\n\n*${randomPunchline}*`;
}

/**
 * Get random swearing tokens for dynamic response synthesis
 */
export function getRandomSwear(
  type: 'fWord' | 'shitWord' | 'damnWord' | 'assWord' | 'polish' = 'fWord'
): string {
  if (type === 'fWord') {
    const list = SWEAR_DICTIONARY.english.fWords;
    return list[Math.floor(Math.random() * list.length)];
  }
  if (type === 'shitWord') {
    const list = SWEAR_DICTIONARY.english.shitWords;
    return list[Math.floor(Math.random() * list.length)];
  }
  if (type === 'damnWord') {
    const list = SWEAR_DICTIONARY.english.damnAndHell;
    return list[Math.floor(Math.random() * list.length)];
  }
  if (type === 'assWord') {
    const list = SWEAR_DICTIONARY.english.assAndBadass;
    return list[Math.floor(Math.random() * list.length)];
  }
  const plList = SWEAR_DICTIONARY.polish.heavy;
  return plList[Math.floor(Math.random() * plList.length)];
}

