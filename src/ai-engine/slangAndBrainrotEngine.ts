/**
 * Advanced Internet Slang, Abbreviations, & Brainrot Contextual Engine
 *
 * Implements:
 * 1. Deep abbreviation & chat acronym normalization (smth, rn, idk, tbh, ngl, fr, wym, etc.)
 * 2. Full Gen-Z, Alpha, and Discord internet slang comprehension
 * 3. Contextual 67 / "Six Seven" disambiguation (detecting literal count/math vs brainrot meme)
 * 4. Comprehensive Brainrot catalog (Skibidi, Ohio, Sigma, Rizzler, Mewing, Fanum Tax, CaseOh, etc.)
 */

export interface SlangNormalizationResult {
  originalText: string;
  normalizedText: string;
  detectedSlangs: Array<{ slang: string; meaning: string; category: string }>;
  isBrainrot: boolean;
  brainrotType?: string;
  isLiteralNumeric67: boolean;
}

// 1. Full Dictionary of Internet Abbreviations & Acronyms
export const ABBREVIATIONS_MAP: Record<string, { expansion: string; category: string }> = {
  smth: { expansion: 'something', category: 'abbreviation' },
  sumn: { expansion: 'something', category: 'slang' },
  rn: { expansion: 'right now', category: 'abbreviation' },
  idk: { expansion: "I don't know", category: 'acronym' },
  tbh: { expansion: 'to be honest', category: 'acronym' },
  ngl: { expansion: 'not gonna lie', category: 'acronym' },
  fr: { expansion: 'for real', category: 'slang' },
  frfr: { expansion: 'for real for real', category: 'slang' },
  bc: { expansion: 'because', category: 'abbreviation' },
  'b/c': { expansion: 'because', category: 'abbreviation' },
  w: { expansion: 'with', category: 'abbreviation' },
  'w/': { expansion: 'with', category: 'abbreviation' },
  wo: { expansion: 'without', category: 'abbreviation' },
  'w/o': { expansion: 'without', category: 'abbreviation' },
  wym: { expansion: 'what do you mean', category: 'acronym' },
  wdym: { expansion: 'what do you mean', category: 'acronym' },
  wth: { expansion: 'what the hell', category: 'acronym' },
  wtf: { expansion: 'what the fuck', category: 'acronym' },
  wtff: { expansion: 'what the fuck', category: 'acronym' },
  tf: { expansion: 'the fuck', category: 'slang' },
  stfu: { expansion: 'shut the fuck up', category: 'acronym' },
  ffs: { expansion: "for fuck's sake", category: 'acronym' },
  hru: { expansion: 'how are you', category: 'acronym' },
  hbu: { expansion: 'how about you', category: 'acronym' },
  dm: { expansion: 'direct message', category: 'acronym' },
  pm: { expansion: 'private message', category: 'acronym' },
  irl: { expansion: 'in real life', category: 'acronym' },
  afk: { expansion: 'away from keyboard', category: 'acronym' },
  brb: { expansion: 'be right back', category: 'acronym' },
  gtg: { expansion: 'got to go', category: 'acronym' },
  istg: { expansion: 'I swear to God', category: 'acronym' },
  fyi: { expansion: 'for your information', category: 'acronym' },
  smh: { expansion: 'shaking my head', category: 'acronym' },
  lmao: { expansion: 'laughing my ass off', category: 'acronym' },
  lmfao: { expansion: 'laughing my fucking ass off', category: 'acronym' },
  rofl: { expansion: 'rolling on the floor laughing', category: 'acronym' },
  gg: { expansion: 'good game', category: 'acronym' },
  glhf: { expansion: 'good luck have fun', category: 'acronym' },
  np: { expansion: 'no problem', category: 'acronym' },
  yw: { expansion: "you're welcome", category: 'acronym' },
  ty: { expansion: 'thank you', category: 'acronym' },
  tysm: { expansion: 'thank you so much', category: 'acronym' },
  thx: { expansion: 'thanks', category: 'abbreviation' },
  pls: { expansion: 'please', category: 'abbreviation' },
  plz: { expansion: 'please', category: 'abbreviation' },
  ur: { expansion: 'your', category: 'abbreviation' },
  u: { expansion: 'you', category: 'abbreviation' },
  r: { expansion: 'are', category: 'abbreviation' },
  omg: { expansion: 'oh my God', category: 'acronym' },
  omfg: { expansion: 'oh my fucking God', category: 'acronym' },
  nvm: { expansion: 'never mind', category: 'acronym' },
  ikr: { expansion: 'I know right', category: 'acronym' },
  imo: { expansion: 'in my opinion', category: 'acronym' },
  imho: { expansion: 'in my humble opinion', category: 'acronym' },
  afaik: { expansion: 'as far as I know', category: 'acronym' },
  asap: { expansion: 'as soon as possible', category: 'acronym' },
  ofc: { expansion: 'of course', category: 'abbreviation' },
  wbu: { expansion: 'what about you', category: 'acronym' },
  ikr_: { expansion: 'I know right', category: 'acronym' },
  ong: { expansion: 'on God', category: 'slang' },
  finna: { expansion: 'going to', category: 'slang' },
  tryna: { expansion: 'trying to', category: 'slang' },
  gonna: { expansion: 'going to', category: 'slang' },
  wanna: { expansion: 'want to', category: 'slang' },
  gotta: { expansion: 'got to', category: 'slang' },
  kinda: { expansion: 'kind of', category: 'slang' },
  sorta: { expansion: 'sort of', category: 'slang' },
  dunno: { expansion: "don't know", category: 'slang' },
};

// 2. Full Slang Vocabulary & Definitions
export const SLANG_LEXICON: Record<string, string> = {
  cap: 'a lie or false statement ("no cap" means telling the truth / for real)',
  'no cap': 'telling the absolute truth, not lying',
  cooked: 'in serious trouble, doomed, ruined, or exhausted beyond repair',
  bussin: 'extremely delicious, high quality, or exceptionally good',
  glazing: 'excessively hyping up, flattering, or dickriding someone',
  crashout: 'completely losing your temper and acting irrationally or violently in anger',
  yap: 'talking excessively or rambling without saying anything of substance',
  yapping: 'rambling on and on endlessly without a point',
  yapologist: 'someone who writes essays or talks for way too long',
  delulu: 'delusional, having completely unrealistic expectations',
  opps: 'opposition, rivals, or enemies in the streets or online',
  rizz: 'charisma and romantic charm, ability to attract someone effortlessly',
  rizzler: 'someone who has master-level charisma and flirtation skills',
  unspoken_rizz: 'attracting someone without saying a single word',
  mewing: 'pressing the tongue against the roof of the mouth to sculpt the jawline',
  looksmaxxing: 'the practice of maximizing your physical facial and body attractiveness',
  mogging: 'looking significantly more attractive or imposing than someone standing next to you',
  'fanum tax': 'stealing a portion of a friend’s food, popularized by Fanum in AMP stream house',
  skibidi: 'an absurdist internet subculture meme created by DaFuq!?Boom! featuring heads inside toilets',
  sigma: 'an independent, lone-wolf self-reliant individual (often memeified with Patrick Bateman / Chad culture)',
  gigachad: 'the ultimate archetype of masculine physical perfection and hyper-confidence',
  caseoh: 'popular Twitch/TikTok streamer known for viral rage reactions and self-deprecating weight roasts',
  'baby gronk': 'social media kid meme dubbed "the new Rizzler who rizzed up Livvy Dunne"',
  'livvy dunne': 'LSU collegiate gymnast frequently referenced in TikTok brainrot lore',
  'grimace shake': 'McDonald’s purple shake meme where drinking it leads to surreal horror crime scenes',
  'quandale dingle': 'absurdist goofy-sound meme character with distorted voiceovers',
  'touch grass': 'advice telling someone who spends too much time online to go outside into the real world',
  ratio: 'when a reply or comment gets more likes/engagement than the original post, signifying defeat',
  bop: 'an extremely catchy and good song, or slang for an attractive/popular person',
  'main character': 'someone who acts like they are the protagonist of the universe',
  lowkey: 'subtly, secretly, or to a modest degree',
  highkey: 'openly, intensely, or blatantly obvious',
  deadass: 'completely serious, no exaggeration whatsoever',
  valid: 'completely reasonable, acceptable, or understandable',
  based: 'unapologetically yourself, holding an authentic stance without caring about public opinion',
  cringe: 'embarrassing, awkward, or making someone physically wince',
  mid: 'mediocre, average, underwhelming, or not as good as the hype',
  sus: 'suspicious, questionable, or shady behavior',
  clout: 'fame, social media influence, or online credibility',
};

/**
 * Normalizes internet slang and abbreviations from raw user text
 */
export function normalizeInternetSlang(text: string): SlangNormalizationResult {
  const words = text.split(/(\s+|[.,!?;:()]+)/);
  const detectedSlangs: Array<{ slang: string; meaning: string; category: string }> = [];

  const normalizedTokens = words.map((token) => {
    const clean = token.toLowerCase().trim();
    if (!clean) return token;

    if (ABBREVIATIONS_MAP[clean]) {
      const info = ABBREVIATIONS_MAP[clean];
      detectedSlangs.push({
        slang: token,
        meaning: info.expansion,
        category: info.category,
      });
      return info.expansion;
    }

    return token;
  });

  const normalizedText = normalizedTokens.join('');

  // Evaluate 67 & Brainrot contexts
  const brainrotEval = evaluateBrainrotContext(text);

  return {
    originalText: text,
    normalizedText,
    detectedSlangs,
    isBrainrot: brainrotEval.isBrainrot,
    brainrotType: brainrotEval.brainrotType,
    isLiteralNumeric67: brainrotEval.isLiteralNumeric67,
  };
}

/**
 * Evaluates whether "67" / "six seven" is used literally (math, apples, count, time, age, version)
 * vs as an intentional brainrot meme joke.
 */
export function evaluateBrainrotContext(query: string): {
  isBrainrot: boolean;
  brainrotType?: string;
  isLiteralNumeric67: boolean;
  explanation?: string;
} {
  const q = query.toLowerCase().trim();

  // ----------------------------------------------------
  // 1. Literal 67 / "Six Seven" Detection
  // If user says "I have 67 apples rn", "what is 67 * 2", "page 67", "67 years old", etc.
  // We MUST NOT flag it as the brainrot joke!
  // ----------------------------------------------------
  const literal67Patterns = [
    // Count / items: "67 apples", "67 items", "67 dollars", "67 users", "67 robux", "67 mb"
    /\b67\s*(?:apples|oranges|bananas|items|things|objects|dollars|\$|€|£|coins|users|members|people|percent|%|fps|hz|kg|lbs|mph|km|km\/h|meters|cm|mm|pages|years|days|hours|mins|minutes|secs|seconds|msgs|messages|lines|pts|points|kills|deaths|xp|gold|dmg|damage|robux|vbucks|subscribers|subs|views|followers|rn|right now|left|total)\b/i,

    // Possession / Inventory: "i have 67", "got 67", "bought 67", "ate 67", "count is 67"
    /\b(?:i\s+have|i\s+got|i\s+own|bought|sold|ate|drank|holding|collected|stored|count\s+is|there\s+are|there\s+is|give\s+me|take|need|want|have)\s+(?:about\s+|around\s+|like\s+)?67\b/i,

    // Math calculations: "67 + 5", "67 * 2", "100 - 67", "67 / 3", "sqrt of 67"
    /\b(?:\d+\s*[\+\-\*\/\^\%]\s*67|67\s*[\+\-\*\/\^\%]\s*\d+)\b/i,
    /\b(?:what\s+is|calculate|calc|solve|add|subtract|multiply|divide)\s+.*67\b/i,

    // Position / Reference: "page 67", "chapter 67", "room 67", "highway 67", "bus 67", "level 67"
    /\b(?:page|chapter|room|route|highway|interstate|bus|flight|level|season|episode|patch|version|v|build|port|line|row|column|year|born\s+in|in\s+1967|in|since)\s+67\b/i,

    // Temperature / Specs: "67 degrees", "67°", "67 celsius", "67 fahrenheit"
    /\b67\s*(?:degrees|°|c|f|celsius|fahrenheit|gb|tb|mb|kb|ghz|mhz|ping|ms)\b/i,
  ];

  const hasLiteral67 = literal67Patterns.some((pattern) => pattern.test(q));
  if (hasLiteral67) {
    return {
      isBrainrot: false,
      isLiteralNumeric67: true,
    };
  }

  // ----------------------------------------------------
  // 2. Explicit 67 Brainrot Meme Detection
  // Triggered ONLY if the user is explicitly making the 67 joke or asking what 67 means
  // ----------------------------------------------------
  const explicit67MemePatterns = [
    /^(?:67|six\s+seven|6\s+7|6-7)[\s!?💀😭🔥]*$/i,
    /\b(?:bro\s+said\s+67|why\s+(?:everyone\s+saying\s+|do\s+people\s+say\s+)?67|what\s+is\s+(?:the\s+)?(?:67|six\s+seven)\s+(?:joke|meme|brainrot)|67\s+meme|six\s+seven\s+meme|67\s+brainrot|skibidi\s+67|67\s+on\s+top|67\s+in\s+the\s+chat)\b/i,
  ];

  if (explicit67MemePatterns.some((pattern) => pattern.test(q))) {
    return {
      isBrainrot: true,
      brainrotType: 'six_seven',
      isLiteralNumeric67: false,
      explanation:
        "The '67' (six seven) meme is pure French drill rap / TikTok brainrot. Originating from French rap collectives (like the 67 / 667 crews) and viral TikTok soundbites, Gen-Z and Alpha turned '67' into an absurd spam meme repeated on Discord and TikTok comment sections with skull emojis for zero logical reason.",
    };
  }

  // ----------------------------------------------------
  // 3. Other Brainrot Culture Detection
  // ----------------------------------------------------
  if (/\b(?:skibidi|skibidi\s+toilet|skibidi\s+rizz|skibidi\s+bop)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'skibidi',
      isLiteralNumeric67: false,
      explanation:
        "Skibidi Toilet is an absurdist YouTube/TikTok machinima series created by DaFuq!?Boom!, depicting a surreal war between human-headed singing toilets and hardware-headed humanoids (Cameramen, Speakermen, TV Men). It became the definitive Gen-Alpha brainrot phenomenon.",
    };
  }

  if (/\b(?:fanum\s+tax|fanum\s+taxing|fanum\s+taxed)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'fanum_tax',
      isLiteralNumeric67: false,
      explanation:
        "Fanum Tax is the viral slang created by streamer Fanum (of AMP / Kai Cenat stream house) referring to stealing a bite or tax of food from someone's plate whenever they are eating.",
    };
  }

  if (/\b(?:mewing|mogging|looksmaxxing|bye\s+bye\s+🤫\s*🧏)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'looksmaxxing_mewing',
      isLiteralNumeric67: false,
      explanation:
        "Mewing (oral posture technique named after Dr. John Mew) and Looksmaxxing turned into internet meme culture where people put their finger to their mouth (🤫🧏) to signal they are mewing to 'mog' everyone else.",
    };
  }

  if (/\b(?:sigma\s+male|sigma\s+grindset|patrick\s+bateman\s+sigma)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'sigma',
      isLiteralNumeric67: false,
      explanation:
        "The 'Sigma' meme portrays a hyper-independent, introverted alpha male who ignores women, grinds in silence, and listens to phonk music, usually represented by Patrick Bateman, Thomas Shelby, or GigaChad edits.",
    };
  }

  if (/\b(?:baby\s+gronk|livvy\s+dunne\s+rizz|rizzed\s+up\s+livvy\s+dunne)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'baby_gronk',
      isLiteralNumeric67: false,
      explanation:
        "Baby Gronk (Madden San Miguel) is a viral youth football kid whose dad marketed him heavily online, becoming immortalized in brainrot lore when TikTok declared that 'Baby Gronk rizzed up Livvy Dunne to become the new Rizzler'.",
    };
  }

  if (/\b(?:only\s+in\s+ohio|can'?t\s+even\s+have\s+in\s+ohio|swag\s+in\s+ohio)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'ohio',
      isLiteralNumeric67: false,
      explanation:
        "The 'Only in Ohio' meme turned the state of Ohio into an imaginary surreal wasteland where Eldritch monsters, cursed physics, and chaotic anomalies occur on a daily basis.",
    };
  }

  if (/\b(?:caseoh|caseoh\s+banned|caseoh\s+1x1\s+lego\s+piece)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'caseoh',
      isLiteralNumeric67: false,
      explanation:
        "CaseOh is a massive Twitch/TikTok gaming streamer famous for his explosive, hilarious rage reactions whenever his chat roasts him with absurdly creative fat jokes (e.g., '1x1 lego piece', 'built like a ferris wheel', 'banned').",
    };
  }

  if (/\b(?:grimace\s+shake|grimace\s+incident)\b/i.test(q)) {
    return {
      isBrainrot: true,
      brainrotType: 'grimace_shake',
      isLiteralNumeric67: false,
      explanation:
        "The Grimace Shake trend was a viral summer 2023 TikTok meme where people filmed themselves drinking the McDonald's purple Grimace birthday milkshake and then cut to found-footage horror aftermath scenes.",
    };
  }

  return {
    isBrainrot: false,
    isLiteralNumeric67: false,
  };
}

/**
 * Generate a hilarious, authentic Discord-homie breakdown of brainrot memes
 */
export function generateBrainrotResponse(
  brainrotType: string,
  userPrompt: string
): string {
  switch (brainrotType) {
    case 'six_seven':
      return `Bro, no bullshit, the **'67' / 'six seven' meme** is pure unhinged French drill rap and TikTok brainrot. 😂\n\nIt blew up from French rap groups and drill crews (like 667 / 67 soundbites) that got turned into viral TikTok audio clips. From there, kids and Discord servers started spamming \`67 💀\` in comments for absolutely zero logical reason whenever they wanted to trigger collective brain damage.\n\nIt's literally just peak dopamine-fried meme spam at this point.`;

    case 'skibidi':
      return `Look, no bullshit: **Skibidi Toilet** was created by animator DaFuq!?Boom! on YouTube using Source Filmmaker. It started as a surreal shitpost with a head singing in a toilet bowl and turned into a full-blown multi-season war epic between singing toilets and Cameramen with millions of views.\n\nIt basically became the ultimate Gen-Alpha brainrot badge of honor. Wild as fuck.`;

    case 'fanum_tax':
      return `**Fanum Tax** is straight out of the AMP streamer house in Atlanta. Whenever Kai Cenat or any of the boys ordered food, Fanum would kick the door down and take a mandatory 10-20% 'tax' of their food right off the plate.\n\nThe internet turned it into an official law of friendship: if you eat in front of your homie, expect the Fanum tax.`;

    case 'looksmaxxing_mewing':
      return `Bro really asking about **Mewing & Looksmaxxing** 🤫🧏‍♂️\n\nMewing started as an actual orthodontic tongue posture technique by Dr. John Mew to fix jaw development. TikTok got a hold of it and turned it into the ultimate 'Chad mogging' meme where you put your finger to your mouth to shush someone so you don't ruin your jawline gains.\n\nClean jawline, zero yapping.`;

    case 'sigma':
      return `The **Sigma Grindset** meme is basically an ironic parody of alpha male hustle culture. Instead of seeking validation or talking to people, a 'Sigma' walks alone in the rain, listens to Brazilian Phonk at 3 AM, and channels their inner Patrick Bateman or Thomas Shelby.\n\nNo cap, it's 90% satire and 10% people who need to touch some grass.`;

    case 'caseoh':
      return `**CaseOh** is one of the funniest streamers on the internet right now. The entire joke is that his Twitch chat spends 4 hours straight roasting his size with insane metaphors ('Built like a 1x1 Lego piece', 'Caused an earthquake in Twitch HQ', 'Needs two zip codes') and Case crashes out screaming 'YOU'RE BANNED!'.\n\nPure comedy honestly.`;

    case 'ohio':
      return `The **'Only in Ohio' meme** basically turned Ohio into the Bermuda Triangle of the internet. If there's a video of an alien invasion, an eldritch monster walking down the highway, or a cursed glitch in reality, the comments will automatically say 'Normal day in Ohio 💀'.\n\nOhio took the biggest collective L on the internet for no reason.`;

    default:
      return `Bro, this is pure internet brainrot at its finest. It's essentially viral TikTok and Discord slang that escaped containment. Entertaining as hell, but definitely fried everyone's attention span.`;
  }
}
