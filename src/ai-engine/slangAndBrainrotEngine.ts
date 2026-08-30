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
  // Deliberately no bare "w" → "with" entry: "w" is extremely common Gen-Z shorthand for
  // "win" ("that's a w"), and blindly expanding it to "with" corrupts that into "that's a
  // with". The slash in "w/" is unambiguous, so only that form is auto-expanded.
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
  mb: { expansion: 'my bad', category: 'slang' },
  jic: { expansion: 'just in case', category: 'acronym' },
  iono: { expansion: "I don't know", category: 'slang' },
  ilysm: { expansion: 'I love you so much', category: 'acronym' },
  ily: { expansion: 'I love you', category: 'acronym' },
  wfh: { expansion: 'work from home', category: 'acronym' },
  ooo: { expansion: 'out of office', category: 'acronym' },
  pto: { expansion: 'paid time off', category: 'acronym' },
  eta: { expansion: 'estimated time of arrival', category: 'acronym' },
  omw: { expansion: 'on my way', category: 'acronym' },
  ttyl: { expansion: 'talk to you later', category: 'acronym' },
  eod: { expansion: 'end of day', category: 'acronym' },
  tba: { expansion: 'to be announced', category: 'acronym' },
  tbd: { expansion: 'to be determined', category: 'acronym' },
  rsvp: { expansion: 'please respond', category: 'acronym' },
  wyd: { expansion: 'what you doing', category: 'acronym' },
  wya: { expansion: 'where you at', category: 'acronym' },
  hmu: { expansion: 'hit me up', category: 'acronym' },
  lmk: { expansion: 'let me know', category: 'acronym' },
  icl: { expansion: "I can't lie", category: 'acronym' },
  srsly: { expansion: 'seriously', category: 'abbreviation' },
  prolly: { expansion: 'probably', category: 'slang' },
  defo: { expansion: 'definitely', category: 'slang' },
  obvi: { expansion: 'obviously', category: 'slang' },
  ppl: { expansion: 'people', category: 'abbreviation' },
  msg: { expansion: 'message', category: 'abbreviation' },
  convo: { expansion: 'conversation', category: 'slang' },
  deets: { expansion: 'details', category: 'slang' },
  sitch: { expansion: 'situation', category: 'slang' },
  totes: { expansion: 'totally', category: 'slang' },
  pfp: { expansion: 'profile picture', category: 'acronym' },
  ootd: { expansion: 'outfit of the day', category: 'acronym' },
  grwm: { expansion: 'get ready with me', category: 'acronym' },
  tldr: { expansion: "too long; didn't read", category: 'acronym' },
  iirc: { expansion: 'if I recall correctly', category: 'acronym' },
  psa: { expansion: 'public service announcement', category: 'acronym' },
  wtv: { expansion: 'whatever', category: 'slang' },
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
  'unspoken rizz': 'attracting someone without saying a single word',
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
  gyat: 'an exclamation reacting to someone\'s attractive physique, most often used crudely about their butt',
  thicc: 'having a curvy figure, especially emphasizing hips, thighs, or butt (spelled with an extra c as a stylized compliment)',
  bussy: 'internet meme slang, mostly used in absurdist joking rather than literal description, referencing a buttocks/anus',
  gooning: 'internet slang for an extended, low-focus trance-like state of arousal or masturbation, used both descriptively and as an exaggerated joke',
  aura: 'a joking, informal measure of how impressive, cool, or socially dominant someone\'s actions seem in the moment',
  mog: 'to visibly outshine or look significantly more attractive/imposing than someone standing next to you',
  npc: 'mocking someone for acting mindlessly, predictably, or without independent thought, from video game background characters',
  simp: 'someone doing excessive one-sided favors or showing excessive devotion for someone they\'re romantically interested in',
  'glow up': 'a significant, often dramatic positive transformation in someone\'s appearance, style, or confidence over time',
  'down bad': 'embarrassingly desperate or overly invested in pursuing someone you\'re romantically/sexually attracted to',
  'sneaky link': 'a secret, usually casual, hookup or relationship kept hidden from friends or family',
  ghosting: 'abruptly cutting off all communication with someone, typically a romantic interest, without explanation',
  'no shot': 'expressing strong disbelief that something is true or likely, similar to "no way"',
  ick: 'a sudden, often irrational feeling of romantic or sexual turn-off toward someone you were previously attracted to',
  'green flag': 'a genuinely positive, reassuring trait or behavior in a potential romantic partner',
  'red flag': 'a warning sign of a genuinely negative or concerning trait or behavior in a potential partner',
  drip: 'stylish, impressive clothing or accessories ("he\'s got drip")',
  bruh: 'a casual, gender-neutral exclamation of disbelief, exasperation, or amusement',
  mald: 'to visibly seethe with anger, usually after losing at something (a blend of "mad" and "bald")',
  'fit check': 'a post showing off an outfit specifically to get reactions or feedback',
  'skill issue': 'a blunt, often deliberately unsympathetic dismissal implying someone lost or struggled due to their own lack of skill',
  'git gud': 'a blunt response to a complaint that a game is too hard, implying the solution is practicing and improving',
  yeet: 'to throw something with force, or an exclamation of enthusiasm/impact',
  bet: 'used as a one-word agreement or confirmation, similar to "deal" or "sounds good"',
  slay: 'doing something impressively well, especially in fashion, performance, or general confidence',
};

/**
 * Normalizes internet slang and abbreviations from raw user text
 */
// Same collision class the missing bare-"w" entry already guards against (see comment above):
// these keys are real slang ONLY in lowercase chat writing. Written capitalized they're almost
// always something else entirely — "R" is the R programming language / R-squared in stats, "BC"
// is the "Before Christ" era abbreviation — so case-insensitive matching was silently turning
// "I love R programming" into "I love are programming" and "500 BC" into "500 because".
const CASE_SENSITIVE_ABBREVIATION_KEYS = new Set(['r', 'bc']);

export function normalizeInternetSlang(text: string): SlangNormalizationResult {
  const words = text.split(/(\s+|[.,!?;:()]+)/);
  const detectedSlangs: Array<{ slang: string; meaning: string; category: string }> = [];

  const normalizedTokens = words.map((token) => {
    const clean = token.toLowerCase().trim();
    if (!clean) return token;
    if (CASE_SENSITIVE_ABBREVIATION_KEYS.has(clean) && token.trim() !== clean) return token;

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

  // Detect (but don't substitute) SLANG_LEXICON terms — unlike abbreviations these are full
  // definitions, not drop-in replacements, so inlining one into normalizedText would wreck the
  // sentence's grammar ("that's bussin" → "that's extremely delicious, high quality, or..." is
  // not a valid replacement). Longest phrases are checked first so "no cap" is caught whole
  // rather than only ever matching the shorter "cap" entry.
  const lowerText = text.toLowerCase();
  const slangKeys = Object.keys(SLANG_LEXICON).sort((a, b) => b.length - a.length);
  const alreadyDetected = new Set(detectedSlangs.map((d) => d.slang.toLowerCase()));
  const claimedRanges: [number, number][] = [];
  for (const key of slangKeys) {
    if (alreadyDetected.has(key)) continue;
    const pattern = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const match = pattern.exec(lowerText);
    if (!match) continue;

    const start = match.index;
    const end = start + match[0].length;
    // Skip if this match sits inside a span already claimed by a longer phrase — e.g. once
    // "no cap" matches, the shorter "cap" entry shouldn't also fire for the same "cap" and
    // report a contradictory standalone meaning right next to it.
    const overlapsClaimed = claimedRanges.some(([s, e]) => start < e && end > s);
    if (overlapsClaimed) continue;

    claimedRanges.push([start, end]);
    detectedSlangs.push({ slang: key, meaning: SLANG_LEXICON[key], category: 'slang' });
    alreadyDetected.add(key);
  }

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
  // ----------------------------------------------------
  // 2. Explicit 67 Brainrot Meme Detection
  // Triggered ONLY if the user is explicitly making the 67 joke or asking what 67 means.
  // Checked BEFORE the literal-numeric patterns below: those patterns are broad catch-alls
  // (e.g. "what is ... 67" with a greedy match) that would otherwise swallow an explicit,
  // narrowly-phrased question like "what is the 67 meme" and misclassify it as literal usage.
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

  // Italian Brainrot (AI-generated animal-hybrid characters that blew up on TikTok/Discord in
  // 2024-25) — a whole meme family with no coverage at all before this, so anything from it
  // ("tung tung tung sahur") fell through to corpus search and got matched against unrelated
  // content by stray keyword overlap instead of being recognized as brainrot at all.
  if (
    /\b(?:tung\s+tung\s+tung\s+sahur|tung\s+sahur|tralalero\s+tralala|bombardiro\s+crocodilo|bombardino\s+coccodrillo|brr\s+brr\s+patapim|cappuccino\s+assassino|lirili\s+larila|italian\s+brainrot|ballerina\s+cappuccina|chimpanzini\s+bananini)\b/i.test(
      q
    )
  ) {
    return {
      isBrainrot: true,
      brainrotType: 'italian_brainrot',
      isLiteralNumeric67: false,
      explanation:
        "Italian Brainrot is a family of surreal AI-generated animal-hybrid characters (Tung Tung Tung Sahur — a wooden log with a bat, Tralalero Tralala — a shark in Nikes, Bombardiro Crocodilo — a crocodile fighter jet, Ballerina Cappuccina) with fake Italian names and absurd backstories, narrated in AI-generated Italian voiceovers, that blew up on TikTok/YouTube Shorts in 2024-2025 and spread straight into Discord meme culture.",
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

// Every meme explainer is a pool: "67" and "skibidi" in particular get spammed at a Discord bot
// over and over, and returning the identical paragraph each time reads as a canned macro.
const pickBrainrot = <T,>(pool: T[]): T => pool[Math.floor(Math.random() * pool.length)];

const BRAINROT_EXPLAINERS: Record<string, string[]> = {
  six_seven: [
    `Bro, no bullshit, the **'67' / 'six seven' meme** is pure unhinged French drill rap and TikTok brainrot. 😂\n\nIt blew up from French rap groups and drill crews (like 667 / 67 soundbites) that got turned into viral TikTok audio clips. From there, kids and Discord servers started spamming \`67 💀\` in comments for absolutely zero logical reason whenever they wanted to trigger collective brain damage.\n\nIt's literally just peak dopamine-fried meme spam at this point.`,
    `**67.** Yeah. There is no meaning, that's the whole joke.\n\nIt came out of French drill rap soundbites (the 67 / 667 crews), got chopped into a TikTok audio, and then Gen Alpha decided the correct response to any number, any sentence, any silence, is just "six seven" with a skull emoji.\n\nAsking what it means is the trap. It means nothing and it's everywhere.`,
    `The **six seven** thing is French drill rap audio that escaped containment onto TikTok and then straight into every Discord server on earth. 💀\n\nZero logic behind it. Someone says a number, someone else says "67", everybody's brain gets a little smaller. That's the entire lifecycle of the meme.`,
  ],
  skibidi: [
    `Look, no bullshit: **Skibidi Toilet** was created by animator DaFuq!?Boom! on YouTube using Source Filmmaker. It started as a surreal shitpost with a head singing in a toilet bowl and turned into a full-blown multi-season war epic between singing toilets and Cameramen with millions of views.\n\nIt basically became the ultimate Gen-Alpha brainrot badge of honor. Wild as fuck.`,
    `**Skibidi Toilet** is a Source Filmmaker series by DaFuq!?Boom! about an actual war between human-headed toilets and people with cameras, speakers and TVs for heads.\n\nIt started as a 10-second shitpost and somehow grew a multi-season plot with factions, lore and character arcs. Genuinely the most successful piece of nonsense ever animated.`,
    `Skibidi Toilet: singing heads in toilets versus Cameramen, made in Source Filmmaker by DaFuq!?Boom!, hundreds of episodes deep with actual continuity.\n\nIt's the meme that defined Gen Alpha and made every teacher on earth give up. Absurd as hell and I respect it.`,
  ],
  fanum_tax: [
    `**Fanum Tax** is straight out of the AMP streamer house in Atlanta. Whenever Kai Cenat or any of the boys ordered food, Fanum would kick the door down and take a mandatory 10-20% 'tax' of their food right off the plate.\n\nThe internet turned it into an official law of friendship: if you eat in front of your homie, expect the Fanum tax.`,
    `Fanum tax = taking a bite of your friend's food without asking, named after Fanum from the AMP house who did it to Kai Cenat constantly on stream.\n\nIt's now just the accepted term for food theft between friends. Nobody consents to it and nobody can stop it.`,
    `That's from AMP — Fanum built a whole bit out of walking in and taxing whatever anyone was eating on stream. Chat ran with it and now "fanum tax" is genuinely how people describe stealing fries.\n\nUniversal law: food in a shared room is not fully yours.`,
  ],
  looksmaxxing_mewing: [
    `Bro really asking about **Mewing & Looksmaxxing** 🤫🧏‍♂️\n\nMewing started as an actual orthodontic tongue posture technique by Dr. John Mew to fix jaw development. TikTok got a hold of it and turned it into the ultimate 'Chad mogging' meme where you put your finger to your mouth to shush someone so you don't ruin your jawline gains.\n\nClean jawline, zero yapping.`,
    `**Mewing** is a real thing — Dr. John Mew's tongue-posture theory for jaw development. **Looksmaxxing** is the broader internet obsession with maxing out your face.\n\nTikTok flattened both into a bit: finger to the lips, dead-eyed stare, absolute silence, because talking apparently ruins the jawline. It's 5% orthodontics and 95% joke.`,
    `Mewing = pressing your tongue to the roof of your mouth for jaw definition. Looksmaxxing = the whole culture around chasing that. Mogging = doing it better than the guy standing next to you. 🤫🧏\n\nOriginally semi-legit orthodontic theory, now purely a meme about refusing to speak.`,
  ],
  sigma: [
    `The **Sigma Grindset** meme is basically an ironic parody of alpha male hustle culture. Instead of seeking validation or talking to people, a 'Sigma' walks alone in the rain, listens to Brazilian Phonk at 3 AM, and channels their inner Patrick Bateman or Thomas Shelby.\n\nNo cap, it's 90% satire and 10% people who need to touch some grass.`,
    `**Sigma male**: the "lone wolf" tier someone invented above alpha, defined entirely by not needing anyone. The meme is edits of Patrick Bateman and Thomas Shelby set to phonk with captions about waking up at 4 AM.\n\nIt started as parody of hustle-culture nonsense and then a chunk of people took it completely seriously, which made it funnier.`,
    `Sigma grindset is the joke version of alpha male content — silent, independent, phonk playing, zero social needs, usually a Patrick Bateman edit.\n\nIt's satire that accidentally recruited actual believers. Peak internet outcome.`,
  ],
  caseoh: [
    `**CaseOh** is one of the funniest streamers on the internet right now. The entire joke is that his Twitch chat spends 4 hours straight roasting his size with insane metaphors ('Built like a 1x1 Lego piece', 'Caused an earthquake in Twitch HQ', 'Needs two zip codes') and Case crashes out screaming 'YOU'RE BANNED!'.\n\nPure comedy honestly.`,
    `CaseOh is a Twitch/TikTok streamer whose entire brand is his chat inventing increasingly unhinged fat jokes about him and him losing his mind on camera and banning people.\n\n"Built like a 1x1 Lego piece" is a genuine classic. The guy has the best rage reactions in streaming.`,
    `**CaseOh** — huge streamer, best crashouts on the platform. His chat roasts his weight nonstop with absurd comparisons and he responds by screaming and mass-banning, which is exactly why they keep doing it.\n\nSymbiotic relationship, honestly beautiful.`,
  ],
  ohio: [
    `The **'Only in Ohio' meme** basically turned Ohio into the Bermuda Triangle of the internet. If there's a video of an alien invasion, an eldritch monster walking down the highway, or a cursed glitch in reality, the comments will automatically say 'Normal day in Ohio 💀'.\n\nOhio took the biggest collective L on the internet for no reason.`,
    `"Only in Ohio" is the internet's default caption for anything cursed. Nobody knows why Ohio specifically — it just got picked and never recovered.\n\nAny surreal clip, any glitch in reality, any horror: comments say Ohio. An entire state permanently ratioed by a meme.`,
    `Ohio got randomly assigned "the cursed dimension" by the internet and now every video of something impossible gets "normal Tuesday in Ohio 💀" underneath it.\n\nGenuinely one of the biggest unprovoked Ls a US state has ever taken.`,
  ],
  baby_gronk: [
    `**Baby Gronk** (real name Madden San Miguel) is a viral youth football kid whose dad turned his highlight clips into a full-blown internet phenomenon. 😂\n\nHe got immortalized in brainrot lore when TikTok collectively decided that "Baby Gronk rizzed up Livvy Dunne" (LSU gymnast) to become "the new Rizzler" — a completely made-up storyline the internet ran with as if it were breaking news.\n\nPeak parasocial internet chaos, honestly.`,
    `Baby Gronk is Madden San Miguel, a kid football player whose dad marketed him relentlessly online. TikTok then invented an entire fake narrative that he "rizzed up Livvy Dunne" and became "the Rizzler".\n\nNone of it was real and everybody repeated it anyway. That's the meme.`,
    `**Baby Gronk** — youth football kid turned meme after the internet fabricated a whole storyline about him rizzing up an LSU gymnast and inheriting the title of Rizzler.\n\nCompletely made up, endlessly repeated, and now permanent brainrot canon.`,
  ],
  grimace_shake: [
    `The **Grimace Shake trend** was a summer 2023 TikTok phenomenon around McDonald's purple birthday milkshake (named after the mascot Grimace). 💀\n\nThe joke: people would film themselves drinking it, then the video would abruptly cut to fake found-footage horror aftermath — smashed rooms, "missing" title cards, chaos — implying the shake turned them feral or straight-up killed them.\n\nMcDonald's marketing team somehow let a mascot beverage become a horror-movie meme and it worked.`,
    `Grimace Shake: McDonald's released a purple birthday shake in 2023, TikTok drank it on camera and then hard-cut to fake crime-scene footage of themselves.\n\nEvery single video followed the same format and it stayed funny for about six weeks. Best accidental marketing campaign of the decade.`,
    `That was the summer 2023 bit where you'd sip the purple Grimace shake, say "happy birthday Grimace", and then the footage cuts to you face-down in a ditch. 💀\n\nMcDonald's leaned into it too, which is the only reason it wasn't shut down immediately.`,
  ],
};

const BRAINROT_DEFAULT_REPLIES = [
  `Bro, this is pure internet brainrot at its finest. It's essentially viral TikTok and Discord slang that escaped containment. Entertaining as hell, but definitely fried everyone's attention span.`,
  `That one's straight brainrot — TikTok slang that got repeated so much it stopped meaning anything. Funny as hell, terrible for everyone's focus.`,
  `Pure escaped-containment internet nonsense. No deeper meaning, it just got spammed until it became real. What else you got?`,
];

/**
 * Generate a hilarious, authentic Discord-homie breakdown of brainrot memes
 */
export function generateBrainrotResponse(
  brainrotType: string,
  userPrompt: string
): string {
  if (brainrotType === 'italian_brainrot') {
    // Named this way because the opening line used to hardcode "Tung Tung Tung Sahur"
    // regardless of which character the user actually mentioned ("what is bombardiro
    // crocodilo" got an answer that opened by claiming the user said "tung tung tung sahur").
    const lowerPrompt = userPrompt.toLowerCase();
    const mentioned = /\b(?:tung\s+tung\s+tung\s+sahur|tung\s+sahur)\b/i.test(lowerPrompt)
      ? 'Tung Tung Tung Sahur'
      : /\btralalero\s+tralala\b/i.test(lowerPrompt)
      ? 'Tralalero Tralala'
      : /\b(?:bombardiro\s+crocodilo|bombardino\s+coccodrillo)\b/i.test(lowerPrompt)
      ? 'Bombardiro Crocodilo'
      : /\bballerina\s+cappuccina\b/i.test(lowerPrompt)
      ? 'Ballerina Cappuccina'
      : 'Italian Brainrot';
    return pickBrainrot([
      `Bro said **${mentioned}** to me 💀 that's straight out of **Italian Brainrot** — a whole cursed universe of AI-generated animal-hybrid characters with fake Italian names, made with AI voice generators and Blender/AI image tools, that took over TikTok and YouTube Shorts in 2024-25.\n\nTung Tung Tung Sahur is a wooden log with a face and a baseball bat (named after the Indonesian "sahur" drum used to wake people for pre-dawn Ramadan meals), and he's got a whole cast of buddies: **Tralalero Tralala** (a shark wearing Nikes), **Bombardiro Crocodilo** (a crocodile fused with a fighter jet), **Ballerina Cappuccina** (a coffee-cup-headed ballerina). Zero logic, maximum brainrot, and it's somehow everywhere now.`,
      `**${mentioned}** is part of the **Italian Brainrot** universe — AI-generated animal hybrids with fake Italian names and AI voiceovers narrating absurd backstories, which blew up across TikTok and Shorts in 2024-25.\n\nThe main cast: Tung Tung Tung Sahur (a log with a bat), Tralalero Tralala (a shark in Nikes), Bombardiro Crocodilo (crocodile fighter jet), Ballerina Cappuccina (coffee-cup ballerina). It's completely meaningless and completely inescapable.`,
      `Ah, **${mentioned}** — Italian Brainrot. 💀\n\nIt's a whole fake mythology of AI-generated creatures with Italian-sounding nonsense names, each with a dramatic AI-narrated origin story. Sharks in Nikes, crocodile jets, sentient logs with baseball bats. Made entirely with AI image and voice tools, spread entirely by kids on TikTok, and now permanently lodged in every Discord server.`,
    ]);
  }

  const pool = BRAINROT_EXPLAINERS[brainrotType];
  return pickBrainrot(pool || BRAINROT_DEFAULT_REPLIES);
}
