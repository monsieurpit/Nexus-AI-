import { KnowledgeItem } from '../types';

/**
 * 250+ Bidirectional Domain Synonyms spanning every corpus category (Physics, Chemistry,
 * Biology, Astronomy, Computer Science, History, Economics, Mathematics, Football, Discord,
 * Daily Life, Psychology, Mental Health, Nutrition, Personal Finance, Fitness, Cooking,
 * Geography, Environment, Entertainment, Philosophy, Programming, and more).
 *
 * Written with natural, unstemmed English words as both keys and values — RAW_SYNONYM_MAP is
 * normalized into the actual SYNONYM_MAP below by running every entry through the real stem()
 * function at module load. This matters because the previous version of this map hand-guessed
 * pre-stemmed keys (e.g. 'veloc' for "velocity", 'forc' for "force") that didn't actually match
 * what stem() produces for those words (stem('velocity') === 'velocity', unchanged — this
 * stemmer has no rule for '-ity' at all) — silently making nearly the entire map unreachable
 * from real queries. Normalizing at load time makes correctness independent of correctly
 * guessing the stemmer's exact suffix rules by hand.
 */
const RAW_SYNONYM_MAP: Record<string, string[]> = {
  // Physics
  velocity: ['speed', 'motion', 'rate', 'movement'],
  speed: ['velocity', 'rate', 'pace', 'rapidity'],
  force: ['push', 'pull', 'strength', 'power', 'thrust'],
  energy: ['power', 'work', 'kinetic', 'potential'],
  atom: ['particle', 'molecule', 'element', 'nucleus'],
  quantum: ['quanta', 'wave', 'particle', 'uncertainty'],
  gravity: ['gravitation', 'weight', 'mass', 'newton'],
  light: ['photon', 'electromagnetic', 'radiation', 'optics'],
  heat: ['temperature', 'thermal', 'warmth', 'thermodynamics'],
  wave: ['frequency', 'wavelength', 'oscillation', 'vibration'],
  magnet: ['electromagnet', 'field', 'pole', 'ferromagnetic'],
  nuclear: ['atomic', 'fission', 'fusion', 'radioactive'],
  electron: ['particle', 'orbit', 'charge', 'atom'],
  pressure: ['force', 'compression', 'atmosphere', 'pascal'],
  friction: ['resistance', 'drag', 'force', 'surface'],
  relativity: ['einstein', 'spacetime', 'gravity', 'time dilation'],
  entropy: ['disorder', 'thermodynamics', 'randomness', 'chaos'],
  momentum: ['inertia', 'mass', 'velocity', 'motion'],
  circuit: ['electricity', 'current', 'voltage', 'resistor'],
  voltage: ['electricity', 'potential', 'current', 'circuit'],

  // Chemistry
  element: ['atom', 'periodic', 'chemical', 'compound'],
  bond: ['chemical', 'covalent', 'ionic', 'molecule'],
  reaction: ['chemical', 'catalyst', 'acid', 'base'],
  acid: ['ph', 'hydrogen', 'proton', 'base'],
  gas: ['vapor', 'pressure', 'temperature', 'volume'],
  compound: ['molecule', 'chemical', 'substance', 'element'],
  metal: ['conductor', 'alloy', 'iron', 'steel'],
  organic: ['carbon', 'biological', 'molecule', 'chemical'],
  molecule: ['compound', 'atom', 'bond', 'chemical'],
  catalyst: ['reaction', 'enzyme', 'accelerant', 'chemical'],
  periodic: ['element', 'table', 'chemistry', 'atomic number'],

  // Biology & Anatomy
  cell: ['organism', 'biology', 'membrane', 'nucleus'],
  gene: ['dna', 'rna', 'chromosome', 'heredity', 'genetics'],
  evolution: ['darwin', 'natural selection', 'species', 'adaptation'],
  protein: ['enzyme', 'amino acid', 'molecule', 'biology', 'muscle', 'nutrition', 'diet'],
  brain: ['mind', 'neural', 'cognition', 'neuron', 'cortex'],
  heart: ['cardiac', 'blood', 'pulse', 'cardiovascular'],
  dna: ['gene', 'rna', 'chromosome', 'heredity', 'nucleotide'],
  species: ['organism', 'evolution', 'adaptation', 'biology'],
  virus: ['bacteria', 'infection', 'pathogen', 'immune'],
  immune: ['antibody', 'virus', 'defense', 'immunity'],
  organism: ['species', 'life form', 'creature', 'biology'],
  enzyme: ['protein', 'catalyst', 'metabolism', 'reaction'],
  digestion: ['stomach', 'metabolism', 'nutrients', 'gut'],
  respiration: ['breathing', 'lungs', 'oxygen', 'metabolism'],
  skeleton: ['bones', 'skeletal system', 'joints', 'anatomy'],
  muscle: ['tissue', 'contraction', 'strength', 'anatomy'],

  // Astronomy
  planet: ['world', 'celestial', 'orbit', 'solar'],
  star: ['sun', 'stellar', 'solar', 'galaxy'],
  galaxy: ['universe', 'cosmos', 'milky way', 'star'],
  space: ['universe', 'cosmos', 'vacuum', 'astronomy'],
  orbit: ['revolve', 'planet', 'gravity', 'path'],
  comet: ['asteroid', 'meteor', 'solar', 'orbit'],
  telescope: ['observatory', 'astronomy', 'lens', 'stargazing'],
  blackhole: ['singularity', 'event horizon', 'gravity', 'star'],
  universe: ['cosmos', 'space', 'galaxy', 'big bang'],

  // Computer Science / Technology / Programming
  computer: ['machine', 'processor', 'cpu', 'hardware'],
  algorithm: ['procedure', 'method', 'process', 'code'],
  code: ['program', 'software', 'algorithm', 'develop'],
  data: ['information', 'knowledge', 'database', 'storage'],
  internet: ['web', 'network', 'online', 'protocol'],
  encrypt: ['secure', 'cryptography', 'hash', 'cipher'],
  network: ['internet', 'protocol', 'tcp', 'connect'],
  server: ['host', 'database', 'cloud', 'computer'],
  software: ['program', 'application', 'code', 'develop'],
  hardware: ['cpu', 'gpu', 'chip', 'circuit'],
  function: ['method', 'procedure', 'routine', 'code'],
  variable: ['value', 'parameter', 'field', 'property'],
  database: ['storage', 'sql', 'table', 'query'],
  api: ['interface', 'endpoint', 'request', 'integration'],
  debug: ['fix', 'troubleshoot', 'error', 'bug'],
  compile: ['build', 'transpile', 'assemble', 'code'],
  framework: ['library', 'toolkit', 'platform', 'stack'],
  // "loop"/"function"/"algorithm" used to sit here, but recursion and iteration (loops) are
  // usually CONTRASTED in CS teaching, not interchangeable — and "loop"/"function" are common
  // enough generic words that expanding into them let totally unrelated docs (a shoelace-tying
  // guide, which literally says "loop" 9 times for physical loops of lace) outscore the actual
  // recursion content for "walk me through how recursion works". Kept to genuinely synonymous,
  // specific terms only.
  recursion: ['recursive', 'self-referential', 'base case'],
  binary: ['bit', 'digital', 'code', 'boolean'],
  processor: ['cpu', 'chip', 'computer', 'hardware'],

  // History & Politics
  war: ['conflict', 'battle', 'fight', 'military'],
  democracy: ['government', 'republic', 'politics', 'vote'],
  revolution: ['rebellion', 'uprising', 'change', 'reform'],
  empire: ['kingdom', 'colony', 'conquest', 'rule'],
  history: ['past', 'ancient', 'timeline', 'event'],
  colony: ['empire', 'settlement', 'conquest', 'territory'],
  civilization: ['society', 'culture', 'empire', 'ancient'],
  monarchy: ['king', 'queen', 'royalty', 'throne'],
  treaty: ['agreement', 'pact', 'accord', 'diplomacy'],

  // Economics & Personal Finance
  economy: ['market', 'finance', 'trade', 'gdp', 'wealth'],
  money: ['currency', 'cash', 'finance', 'capital', 'bank'],
  tax: ['revenue', 'fiscal', 'government', 'income'],
  inflation: ['price', 'deflation', 'monetary', 'economy'],
  market: ['economy', 'trade', 'stock', 'finance'],
  invest: ['capital', 'profit', 'return', 'stock'],
  budget: ['spending', 'finance', 'expenses', 'savings'],
  debt: ['loan', 'credit', 'liability', 'borrow'],
  savings: ['budget', 'emergency fund', 'invest', 'finance'],
  interest: ['rate', 'compound', 'loan', 'apr'],
  credit: ['loan', 'debt', 'score', 'borrow'],

  // Mathematics
  calculus: ['derivative', 'integral', 'limit', 'differential'],
  statistics: ['probability', 'distribution', 'mean', 'variance'],
  equation: ['formula', 'solve', 'algebra', 'expression'],
  prime: ['number', 'factor', 'division', 'integer'],
  geometry: ['shape', 'area', 'volume', 'angle'],
  probability: ['chance', 'odds', 'random', 'statistics'],
  algebra: ['equation', 'variable', 'formula', 'expression'],
  fraction: ['ratio', 'decimal', 'percentage', 'proportion'],

  // Football / Soccer
  goal: ['score', 'net', 'keeper', 'shot', 'finish'],
  football: ['soccer', 'ball', 'match', 'pitch', 'club'],
  player: ['footballer', 'striker', 'defender', 'midfielder'],
  match: ['game', 'fixture', 'play', 'competition'],
  penalty: ['foul', 'kick', 'referee', 'card'],
  tactic: ['formation', 'strategy', 'press', 'position'],
  champion: ['league', 'trophy', 'title', 'win'],
  offside: ['rule', 'linesman', 'referee', 'attack'],
  manager: ['coach', 'tactician', 'boss', 'gaffer'],
  transfer: ['signing', 'deal', 'move', 'fee'],

  // Discord
  discord: ['server', 'channel', 'community', 'guild'],
  bot: ['automation', 'command', 'prefix', 'application'],
  ban: ['kick', 'mute', 'timeout', 'moderate'],
  nitro: ['premium', 'subscription', 'boost', 'perk'],
  raid: ['attack', 'spam', 'protect', 'raidshield'],
  moderator: ['admin', 'ban', 'kick', 'rule'],
  channel: ['server', 'discord', 'text', 'voice'],
  scam: ['phishing', 'fraud', 'fake', 'theft'],
  role: ['rank', 'permission', 'tag', 'badge'],

  // Daily Life & Everyday Basics
  shower: ['wash', 'bath', 'clean', 'hygiene'],
  food: ['eat', 'meal', 'cook', 'nutrition'],
  sleep: ['rest', 'bed', 'insomnia', 'health'],
  cook: ['food', 'recipe', 'meal', 'kitchen'],
  exercise: ['fit', 'workout', 'health', 'activity'],
  clean: ['wash', 'hygiene', 'tidy', 'sanitize'],

  // Psychology & Mental Health
  psychology: ['mind', 'behavior', 'cognition', 'mental'],
  anxiety: ['stress', 'worry', 'nervous', 'panic'],
  depression: ['sadness', 'low mood', 'mental health', 'despair'],
  therapy: ['counseling', 'treatment', 'psychologist', 'mental health'],
  stress: ['anxiety', 'pressure', 'tension', 'overwhelm'],
  emotion: ['feeling', 'mood', 'affect', 'sentiment'],
  motivation: ['drive', 'incentive', 'ambition', 'willpower'],
  habit: ['routine', 'behavior', 'pattern', 'ritual'],
  mindfulness: ['meditation', 'awareness', 'presence', 'relaxation'],
  // The stemmer strips "-tion" from "meditation" (-> "medita") but has no rule connecting the
  // "-ate" verb form "meditate" to it (stem('meditate') === 'meditate', unchanged) — the same
  // stemmer-gap problem the whole self-normalizing RAW_SYNONYM_MAP pattern exists to work around,
  // just for a pair this map didn't have an entry for yet. Without this, "how to meditate" scored
  // as a weak/hedged match against the corpus's own meditation content.
  meditate: ['meditation', 'mindfulness'],
  trauma: ['ptsd', 'distress', 'injury', 'mental health'],
  cognition: ['thinking', 'mind', 'perception', 'psychology'],

  // Nutrition & Health / Medicine
  nutrition: ['diet', 'food', 'vitamins', 'macronutrients'],
  vitamin: ['nutrient', 'supplement', 'mineral', 'nutrition'],
  carbohydrate: ['carbs', 'sugar', 'starch', 'energy'],
  disease: ['illness', 'condition', 'sickness', 'ailment'],
  medicine: ['treatment', 'drug', 'medication', 'therapy'],
  diagnosis: ['assessment', 'condition', 'evaluation', 'medical'],
  symptom: ['sign', 'indicator', 'condition', 'ailment'],
  infection: ['virus', 'bacteria', 'illness', 'disease'],
  vaccine: ['immunization', 'shot', 'immunity', 'medicine'],

  // Fitness
  fitness: ['exercise', 'workout', 'health', 'training'],
  cardio: ['aerobic', 'endurance', 'running', 'heart rate'],
  strength: ['muscle', 'weightlifting', 'power', 'training'],
  hypertrophy: ['muscle growth', 'bodybuilding', 'strength', 'training'],
  workout: ['exercise', 'training', 'routine', 'fitness'],

  // Cooking
  recipe: ['dish', 'meal', 'instructions', 'cooking'],
  bake: ['oven', 'cook', 'roast', 'kitchen'],
  ingredient: ['component', 'recipe', 'food', 'seasoning'],
  knife: ['blade', 'chef knife', 'cutting', 'kitchen'],
  flavor: ['taste', 'seasoning', 'palate', 'spice'],

  // Geography & World Geography
  continent: ['landmass', 'region', 'geography', 'world'],
  country: ['nation', 'state', 'territory', 'republic'],
  climate: ['weather', 'temperature', 'atmosphere', 'region'],
  mountain: ['peak', 'range', 'summit', 'terrain'],
  ocean: ['sea', 'water', 'marine', 'coast'],
  capital: ['city', 'government', 'headquarters', 'seat'],
  population: ['inhabitants', 'demographics', 'people', 'census'],
  // "tallest"/"biggest"/"largest" vs "highest" — corpus docs describing a superlative record
  // (Everest is "the world's highest" peak) almost always use one specific word for it, but users
  // ask with whichever synonym comes naturally ("tallest mountain"). Without this, the sentence
  // actually containing the answer scores 0 on the literal query term and loses to an unrelated
  // sentence that happens to share other words ("world's longest mountain RANGE" beat out the
  // Everest sentence for "what's the tallest mountain in the world").
  tallest: ['highest', 'biggest', 'largest'],
  highest: ['tallest', 'biggest', 'largest'],
  biggest: ['largest', 'tallest', 'highest'],
  largest: ['biggest', 'tallest', 'highest'],

  // Environment
  environment: ['ecosystem', 'nature', 'climate', 'planet'],
  pollution: ['contamination', 'emissions', 'waste', 'toxin'],
  warming: ['climate change', 'emissions', 'greenhouse', 'environment'],
  greenhouse: ['emissions', 'warming', 'carbon', 'atmosphere'],
  sustainability: ['renewable', 'conservation', 'eco-friendly', 'environment'],
  biodiversity: ['species', 'ecosystem', 'wildlife', 'nature'],
  renewable: ['solar', 'wind', 'sustainable', 'energy'],

  // Entertainment
  movie: ['film', 'cinema', 'picture', 'motion picture'],
  music: ['song', 'melody', 'audio', 'sound'],
  game: ['video game', 'gaming', 'play', 'esports'],
  genre: ['style', 'category', 'type', 'classification'],

  // Philosophy
  philosophy: ['ethics', 'logic', 'metaphysics', 'reasoning'],
  ethics: ['morality', 'philosophy', 'values', 'principles'],
  consciousness: ['awareness', 'mind', 'sentience', 'cognition'],
  determinism: ['choice', 'free will', 'autonomy', 'agency'],
  logic: ['reasoning', 'deduction', 'rationality', 'argument'],
};

export const SYNONYM_MAP: Record<string, string[]> = (() => {
  const normalized: Record<string, string[]> = {};
  for (const [rawKey, rawValues] of Object.entries(RAW_SYNONYM_MAP)) {
    const key = stem(rawKey);
    const values = rawValues.flatMap((v) => v.split(/\s+/).map((w) => stem(w)));
    const existing = normalized[key] || [];
    normalized[key] = Array.from(new Set([...existing, ...values]));
  }
  return normalized;
})();

export const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'it', 'its',
  'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
  'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either', 'neither', 'not', 'only', 'than',
  'too', 'very', 'just', 'also', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'into',
  'through', 'during', 'before', 'after', 'to', 'from', 'up', 'down', 'as', 'if', 'then',
  'because', 'while', 'although', 'though', 'more', 'most', 'other', 'some', 'such', 'no',
  'any', 'each', 'every', 'all', 'few', 'many', 'much', 'same', 'own', 'out', 'off', 'over',
  'under', 'again', 'further', 'once', 'here', 'there', 'now', 'where', 'when', 'how', 'why',
  'beside', 'between', 'beyond', 'despite', 'except', 'inside', 'near', 'next',
  'since', 'toward', 'unless', 'until', 'upon', 'within', 'without', 'like', 'get', 'got',
  'make', 'take', 'go', 'come', 'see', 'know', 'think', 'say', 'tell', 'give', 'use', 'find',
  // Apostrophe-dropped contractions ("what's" -> "whats") of question words already above.
  // These are 5+ letters, so correctTypos() doesn't exempt them as "too short to correct" —
  // it was silently rewriting them into the nearest unrelated vocabulary word ("whats" -> the
  // corpus's own "watts", from an Ohm's Law doc's keywords), injecting a bogus term into
  // nearly every "whats X"/"wheres X" query and dragging in an unrelated top-3 result. Filtering
  // them as stopwords, same as their apostrophised forms already are, is the actual fix.
  'whats', 'hows', 'wheres', 'whens', 'whos', 'thats', 'theres', 'heres',
  // Common Polish function words — this list was English-only, which had a real, damaging
  // consequence for Polish queries specifically: a word like "jest" (is) is genuinely rare across
  // this predominantly-English corpus (unlike its English equivalent "is", already a stopword
  // above), so BM25's IDF weighting treats it as a RARE, HIGH-SIGNAL term instead of the near-
  // meaningless connector it actually is in Polish. Verified live: "co to jest czarna dziura"
  // (what is a black hole) top-matched three unrelated country-capital entries — purely because
  // they happen to contain "jest" in their keywords (added this session for the Polish capital-
  // city fix) — with the genuine black-hole corpus content nowhere in the top 3. Adding these as
  // proper stopwords stops "jest"/"to"/"co"/etc. from masquerading as topical signal for any
  // Polish query that happens to contain them, the same protection English queries already get
  // from "is"/"the"/"what" already being filtered.
  'jest', 'są', 'był', 'była', 'było', 'były', 'być', 'to', 'co', 'jak', 'czy', 'ale', 'dla',
  'na', 'nie', 'tak', 'się', 'ja', 'ty', 'on', 'ona', 'ono', 'my', 'wy', 'oni', 'one', 'ten',
  'ta', 'te', 'tego', 'tej', 'tym', 'tych', 'przez', 'bez', 'od', 'pod', 'nad', 'przy', 'że',
  'żeby', 'oraz', 'lub', 'czyli', 'więc', 'bardzo', 'tylko', 'już', 'jeszcze', 'także', 'też',
]);

// Folds accented Latin characters (é, ñ, ü, ...) down to their plain ASCII base letter before
// any word-boundary regex touches the text. JS's `\w` is ASCII-only, so `[^\w\s]` (used by
// tokenizeWords/normaliseEntityKey/entityBoostMap below) treats every diacritic as a delimiter
// instead of part of the letter it's attached to — "Montréal" tokenized to ["montr", "al"]
// instead of one word, and never shared a stemmed token with a plain-ASCII-typed "Montreal"
// query. Verified live: processForSearch("Montréal is a city") -> ["montr","al","city"] vs.
// processForSearch("tell me about Montreal") -> ["montre"] — zero overlap despite being the same
// place name, purely because almost nobody actually types the accented form. Unicode NFD
// decomposition splits each accented character into its base letter plus a separate combining
// mark, which the following regex then strips — the result is the same plain ASCII spelling a
// real user would type, so both the accented corpus text and the ASCII query now tokenize/stem
// identically instead of sharing zero tokens.
function foldDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function stem(word: string): string {
  let w = word.toLowerCase();

  // The generic 'es' -> '' rule further down strips both letters, but only ever fires when
  // w.length - 2 >= 4, i.e. the whole word is 6+ letters — so a genuine 5-letter "-es" plural
  // (box/bus/gas + "es") skips it and falls through to the plain 's' rule instead, which only
  // strips the trailing "s" and leaves "boxe"/"buse"/"gase". That silently broke matching for a
  // whole class of short, common singular/plural pairs: verified live via stem(), "box" -> "box"
  // but "boxes" -> "boxe" (mismatch), same for bus/buses and gas/gases. Handled explicitly here,
  // ahead of the length-gated rule below, for real "-es" plurals (s/x/z/ch/sh + "es") regardless
  // of word length. When the singular itself already ends in "e" instead (vaccine -> vaccines,
  // phone -> phones, gene -> genes), stripping both letters would produce "vaccin"/"phon"/"gen"
  // while the singular form stems to "vaccine"/"phone"/"gene" unchanged (no rule here strips a
  // lone trailing "e") — so only the trailing "s" comes off in that case.
  if (w.endsWith('es') && w.length > 4) {
    if (/(?:[sxz]|ch|sh)es$/.test(w)) {
      return w.slice(0, -2);
    }
    return w.slice(0, -1);
  }

  const rules: [string, string, number][] = [
    ['ational', 'ate', 5], ['tional', 'tion', 5], ['ization', 'ize', 5],
    ['isation', 'ise', 5], ['ousness', 'ous', 5], ['iveness', 'ive', 5],
    ['fulness', 'ful', 5], ['nesses', '', 5], ['ments', '', 5],
    ['tions', 'tion', 5], ['ness', '', 4], ['ment', '', 4],
    ['tion', '', 4], ['sion', '', 4], ['ous', '', 4], ['ive', '', 4],
    ['ful', '', 4], ['ize', '', 4], ['ise', '', 4], ['ary', '', 4],
    ['ery', '', 4], ['ory', '', 4], ['ism', '', 4], ['ist', '', 4],
    ['ing', '', 4], ['ial', '', 4], ['ical', '', 4],
    ['al', '', 5], ['ly', '', 5], ['er', '', 5], ['ed', '', 4],
    ['es', '', 4], ['s', '', 4],
  ];

  for (const [suffix, replacement, minLen] of rules) {
    // Plain "s" needed a stricter minLen(5) than "es" above it (minLen 4) for no real reason,
    // which left common 4-letter root plurals unstemmed ("burns" stayed "burns" instead of
    // matching "burn") — a query for "how do i treat a burn" scored the actual first-aid burns
    // doc below unrelated docs whose titles happened to contain "Treatment" (round-6
    // fact-finding pass). Matching "es"'s threshold fixes that, but "s" alone would then also
    // wrongly destem words where the double "s" IS the root ("class" -> "clas", "glass" ->
    // "glas") since those aren't plurals of a shorter word at all — excluded explicitly.
    if (suffix === 's' && w.endsWith('ss')) continue;
    if (w.endsWith(suffix) && w.length - suffix.length >= minLen) {
      w = w.slice(0, -suffix.length) + replacement;
      break;
    }
  }
  return w;
}

export function tokenizeWords(text: string): string[] {
  return foldDiacritics(text)
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+(?=[A-Z0-9"'])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function processForSearch(text: string): string[] {
  const words = tokenizeWords(text);
  return words
    .filter((w) => !STOP_WORDS.has(w) && w.length > 1 && !/^\d+$/.test(w))
    .map((w) => stem(w));
}

export function expandQuerySynonyms(terms: string[]): string[] {
  const result = new Set<string>(terms);
  for (const t of terms) {
    if (SYNONYM_MAP[t]) {
      for (const syn of SYNONYM_MAP[t]) {
        result.add(syn);
      }
    }
  }
  return Array.from(result);
}

export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/** Two words identical except for one swapped adjacent letter pair ("wehre"/"where"). */
export function isAdjacentTransposition(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const diff: number[] = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff.push(i);
  }
  return (
    diff.length === 2 &&
    diff[1] === diff[0] + 1 &&
    a[diff[0]] === b[diff[1]] &&
    a[diff[1]] === b[diff[0]]
  );
}

export function correctTypos(terms: string[], vocabulary: Set<string>): string[] {
  return terms.map((term) => {
    // Short words (<=4 letters) are the danger zone: against a corpus-sized vocabulary there's
    // almost always SOME unrelated real word 1 edit away ("dogs" -> "dots"/"logs", "cats" ->
    // "cars"/"cuts"), so a correctly-spelled word that simply isn't in this corpus's vocabulary
    // gets silently rewritten into whatever unrelated vocabulary word happened to collide — same
    // class of bug as "that" -> "what" fixed earlier in semanticEngine.ts, just in the retrieval
    // vocabulary instead of the dimension matcher. Longer words have enough letters that a
    // same-first-letter, distance<=2 neighbor is actually likely to be a genuine typo.
    if (vocabulary.has(term) || term.length <= 4 || /^\d+$/.test(term)) {
      return term;
    }

    const candidates = Array.from(vocabulary).filter(
      (v) => Math.abs(v.length - term.length) <= 2 && v[0] === term[0]
    );
    let bestTerm = term;
    // A distance-2 correction on a 5-letter word is a 40% character mismatch — that's not a
    // "typo" by any reasonable definition, it's swapping in an unrelated word. Observed live:
    // "niger" (5 letters, not in this corpus's vocabulary) silently became "never" this way,
    // then confidently answered with unrelated Discord-safety content about "never click login
    // links" — no different in kind from any other word not covered by this corpus, but a
    // uniquely bad failure mode for anything resembling a slur, since it means the query never
    // reaches any real logic (safety-related or otherwise) at all. Scale the allowed edit
    // distance with word length so only a genuinely small, single-character-class typo gets
    // "corrected" on shorter words; longer words have enough letters that distance-2 stays a
    // reasonable typo assumption.
    let bestDist = term.length <= 6 ? 2 : 3;

    for (const cand of candidates) {
      const d = levenshteinDistance(term, cand);
      if (d < bestDist) {
        bestDist = d;
        bestTerm = cand;
      }
    }
    return bestTerm;
  });
}

export interface BM25ScoredItem {
  item: KnowledgeItem;
  score: number;
  snippet: string;
  relevantSentences: string[];
}

export class BM25Engine {
  private documents: KnowledgeItem[] = [];
  private termFrequencies: Map<string, number>[] = [];
  private documentFrequencies: Map<string, number> = new Map();
  private avgDocLength: number = 0;
  private totalDocLength: number = 0;
  private entityIndex: Map<string, number[]> = new Map();
  // Lazily rebuilt on next access after any addDocument()/rebuild() — avoids reconstructing
  // the full vocabulary Set (every unique term/bigram/trigram across the whole corpus) on
  // every single search() call, which is what the uncached getter used to do.
  private cachedVocabulary: Set<string> | null = null;
  // Unstemmed corpus words. correctTypos() exempts anything <=4 characters, but it only ever ran
  // on already-stemmed query terms — so a plainly-misspelled 7-letter word whose stem happens to
  // be short ("lerning" -> stem "lern") slipped under that exemption and was never corrected at
  // all, even though "learn" sat right there in the vocabulary. Correcting the full-length word
  // first is both more effective and safer: more letters means fewer coincidental collisions.
  private rawVocabulary: Set<string> = new Set();

  private readonly k1: number = 1.5;
  private readonly b: number = 0.75;
  private readonly titleBoost: number = 3;
  private readonly tagBoost: number = 2;
  private readonly categoryBoost: number = 1;
  private readonly bigramWeight: number = 1.5;
  private readonly trigramWeight: number = 2.0;

  constructor(initialDocs?: KnowledgeItem[]) {
    if (initialDocs && initialDocs.length > 0) {
      this.rebuild(initialDocs);
    }
  }

  public get count(): number {
    return this.documents.length;
  }

  public get allDocs(): KnowledgeItem[] {
    return this.documents;
  }

  public get vocabulary(): Set<string> {
    if (this.cachedVocabulary) return this.cachedVocabulary;
    const vocab = new Set<string>();
    for (const key of this.documentFrequencies.keys()) {
      // Bigram/trigram keys are joined with '~' (e.g. "term~term~term") and single terms
      // never contain that character, so this also correctly excludes trigrams alongside
      // bigrams from the plain-word vocabulary used for typo correction.
      if (!key.includes('~')) {
        vocab.add(key);
      }
    }
    this.cachedVocabulary = vocab;
    return vocab;
  }

  public addDocument(doc: KnowledgeItem): void {
    this.cachedVocabulary = null;
    const docIdx = this.documents.length;
    this.indexEntityTitle(doc.title, docIdx);
    for (const kw of doc.keywords) {
      this.indexEntityPhrase(kw, docIdx);
    }

    for (const w of tokenizeWords(`${doc.title} ${doc.keywords.join(' ')} ${doc.content}`)) {
      if (w.length > 4 && !/\d/.test(w)) this.rawVocabulary.add(w);
    }

    const baseTitle = processForSearch(doc.title);
    const baseTags = doc.keywords.flatMap((k) => processForSearch(k));
    const baseContent = processForSearch(doc.content);
    const baseCategory = processForSearch(doc.category);

    const titleTerms = Array(this.titleBoost).fill(baseTitle).flat();
    const tagTerms = Array(this.tagBoost).fill(baseTags).flat();
    const allTerms = [...titleTerms, ...tagTerms, ...baseContent, ...baseCategory];

    const titleBigrams = this.makeBigrams(baseTitle);
    const tagBigrams = this.makeBigrams(baseTags);
    const contentBigrams = this.makeBigrams(baseContent);
    const allBigrams = [...titleBigrams, ...tagBigrams, ...contentBigrams];

    // Trigrams catch longer exact phrases bigrams miss ("theory of relativity", "central
    // nervous system") — indexed the same way, just weighted higher since a 3-word exact
    // match is an even stronger relevance signal than a 2-word one.
    const titleTrigrams = this.makeTrigrams(baseTitle);
    const tagTrigrams = this.makeTrigrams(baseTags);
    const contentTrigrams = this.makeTrigrams(baseContent);
    const allTrigrams = [...titleTrigrams, ...tagTrigrams, ...contentTrigrams];

    const tf = new Map<string, number>();
    for (const t of allTerms) {
      tf.set(t, (tf.get(t) || 0) + 1);
    }
    for (const bg of titleBigrams) {
      tf.set(bg, (tf.get(bg) || 0) + this.bigramWeight * this.titleBoost);
    }
    for (const bg of tagBigrams) {
      tf.set(bg, (tf.get(bg) || 0) + this.bigramWeight * this.tagBoost);
    }
    for (const bg of contentBigrams) {
      tf.set(bg, (tf.get(bg) || 0) + this.bigramWeight);
    }
    for (const tg of titleTrigrams) {
      tf.set(tg, (tf.get(tg) || 0) + this.trigramWeight * this.titleBoost);
    }
    for (const tg of tagTrigrams) {
      tf.set(tg, (tf.get(tg) || 0) + this.trigramWeight * this.tagBoost);
    }
    for (const tg of contentTrigrams) {
      tf.set(tg, (tf.get(tg) || 0) + this.trigramWeight);
    }

    for (const t of new Set(allTerms)) {
      this.documentFrequencies.set(t, (this.documentFrequencies.get(t) || 0) + 1);
    }
    for (const bg of new Set(allBigrams)) {
      this.documentFrequencies.set(bg, (this.documentFrequencies.get(bg) || 0) + 1);
    }
    for (const tg of new Set(allTrigrams)) {
      this.documentFrequencies.set(tg, (this.documentFrequencies.get(tg) || 0) + 1);
    }

    this.documents.push(doc);
    this.termFrequencies.push(tf);
    let docTermCount = 0;
    for (const v of tf.values()) docTermCount += v;
    this.totalDocLength += docTermCount;
    this.avgDocLength = this.totalDocLength / this.documents.length;
  }

  public rebuild(docs: KnowledgeItem[]): void {
    this.documents = [];
    this.termFrequencies = [];
    this.documentFrequencies = new Map();
    this.entityIndex = new Map();
    this.rawVocabulary = new Set();
    this.avgDocLength = 0;
    this.totalDocLength = 0;

    for (const doc of docs) {
      this.addDocument(doc);
    }
  }

  /**
   * Fixes misspelled full-length words against the unstemmed corpus vocabulary, before stemming.
   *
   * correctTypos() below exempts anything <=4 characters, but it only ever ran on already-stemmed
   * terms — a plainly misspelled long word whose stem happens to be short ("lerning" -> stem
   * "lern") slipped under that exemption and was never corrected, even with "learning" sitting
   * right there in the vocabulary.
   *
   * Thresholds here were set by running this over /usr/share/dict/words and reading the output:
   *  - 7-letter floor. Under that, a word sits one edit from something in a corpus-sized
   *    vocabulary nearly every time ("advise"/"advice", "alter"/"after", "abort"/"about") and
   *    every one of those is a word a user might genuinely type.
   *  - At exactly 7-9 letters, only *structural* typos count — a length change or an adjacent
   *    transposition. Same-length substitutions at this length are overwhelmingly collisions
   *    between two distinct real words ("agility"/"ability", "audition"/"addition"), not typos.
   *  - At exactly 7 letters, only the dropped-letter direction (a strictly LONGER candidate).
   *    People omit letters far more than they add them, so a 7-letter word matching a shorter
   *    vocabulary word almost always means the user's word was itself real and simply absent
   *    from this corpus ("banking" -> "baking", "auction" -> "action", "armrest" -> "arrest").
   *  - Past 10 letters a coincidental one- or two-edit neighbour essentially stops happening.
   */
  public correctRawWords(query: string): { text: string; corrections: { from: string; to: string }[] } {
    const corrections: { from: string; to: string }[] = [];
    if (this.rawVocabulary.size === 0) return { text: query, corrections };
    const text = query.replace(/[A-Za-z]{7,}/g, (word) => {
      const lower = word.toLowerCase();
      if (STOP_WORDS.has(lower) || this.rawVocabulary.has(lower)) return word;
      const wordStem = stem(lower);
      const isLong = lower.length >= 10;
      const maxDist = isLong ? 2 : 1;
      let best: string | null = null;
      let bestDist = maxDist + 1;
      let tied = false;
      for (const cand of this.rawVocabulary) {
        if (cand[0] !== lower[0] || Math.abs(cand.length - lower.length) > maxDist) continue;
        if (!isLong && cand.length === lower.length && !isAdjacentTransposition(lower, cand)) continue;
        if (lower.length === 7 && cand.length <= lower.length) continue;
        // Rewriting a word into its own inflection ("athlete" -> "athletes") is a no-op once
        // both are stemmed, so it buys nothing and only adds a chance of picking wrong.
        if (stem(cand) === wordStem) continue;
        const d = levenshteinDistance(lower, cand);
        if (d < bestDist) {
          bestDist = d;
          best = cand;
          tied = false;
        } else if (d === bestDist && cand !== best) {
          tied = true;
        }
      }
      if (!best || tied) return word;
      corrections.push({ from: word, to: best });
      return best;
    });
    return { text, corrections };
  }

  public search(
    query: string,
    topK: number = 8,
    expandSynonyms: boolean = true,
    recentlyCitedDocIds?: Set<string>
  ): BM25ScoredItem[] {
    if (this.documents.length === 0) return [];

    const originalTerms = processForSearch(this.correctRawWords(query).text);
    let queryTerms = originalTerms;
    if (expandSynonyms) {
      queryTerms = expandQuerySynonyms(queryTerms);
    }
    queryTerms = correctTypos(queryTerms, this.vocabulary);

    if (queryTerms.length === 0) return [];

    // Terms the user actually typed (post-typo-correction) vs. ones only added by synonym
    // expansion — e.g. "jazz music" expands "music" into "song"/"melody"/"audio"/"sound" too.
    // Rare synonym terms get a naturally high IDF, and a document that happens to score well on
    // several synonyms (an audio-engineering doc matching "audio"/"sound") could outscore the
    // document that actually matches the literal query word ("jazz") once those IDF-boosted
    // synonym hits stack up. bm25() downweights any term not in this set so a synonym can still
    // help a doc get found, but can't out-rank literal query-term matches on its own.
    const literalTerms = new Set(correctTypos(originalTerms, this.vocabulary));

    const queryBigrams = this.makeBigrams(queryTerms);
    const queryTrigrams = this.makeTrigrams(queryTerms);
    const allQueryTerms = [...queryTerms, ...queryBigrams, ...queryTrigrams];

    const scored: { idx: number; score: number }[] = [];
    for (let i = 0; i < this.termFrequencies.length; i++) {
      const s = this.bm25(this.termFrequencies[i], allQueryTerms, literalTerms);
      if (s > 0) {
        scored.push({ idx: i, score: s });
      }
    }

    // Direct Entity Index phrase boosting
    const entityBoosts = this.entityBoostMap(query);
    const scoreMap = new Map<number, number>();
    for (const item of scored) {
      scoreMap.set(item.idx, item.score);
    }
    for (const [idx, bonus] of entityBoosts.entries()) {
      scoreMap.set(idx, (scoreMap.get(idx) || 0) + bonus);
    }

    // Context boost for recently cited documents (+15%)
    if (recentlyCitedDocIds && recentlyCitedDocIds.size > 0) {
      for (let i = 0; i < this.documents.length; i++) {
        if (recentlyCitedDocIds.has(this.documents[i].id)) {
          const current = scoreMap.get(i) || 0;
          if (current > 0) {
            scoreMap.set(i, current * 1.15);
          }
        }
      }
    }

    const mergedScored: { idx: number; score: number }[] = [];
    for (const [idx, score] of scoreMap.entries()) {
      mergedScored.push({ idx, score });
    }
    mergedScored.sort((a, b) => b.score - a.score);

    // TF-IDF Cosine Reranking on candidate pool (2x topK)
    const candidates = mergedScored.slice(0, topK * 2);
    const reranked = this.rerankWithTFIDF(candidates, queryTerms);

    return reranked.slice(0, topK).map((entry) => {
      const doc = this.documents[entry.idx];
      const snippet = this.bestSnippet(doc.content, queryTerms);
      const sentences = this.bm25Sentences(doc, queryTerms, 4, literalTerms);
      return {
        item: doc,
        score: parseFloat(entry.score.toFixed(3)),
        snippet,
        relevantSentences: sentences,
      };
    });
  }

  // literalTerms mirrors bm25()'s synonym downweight. Without it, sentence picking ranked
  // synonym-only matches level with the words the user actually typed: "what is the largest
  // planet" pulled "The eight planets orbit the Sun..." (matching the expanded "orbit"/"solar")
  // over "The outer gas giants — Jupiter (largest, ...)", the one sentence carrying the answer.
  public bm25Sentences(
    document: KnowledgeItem,
    queryTerms: string[],
    count: number = 4,
    literalTerms?: Set<string>
  ): string[] {
    const sents = splitSentences(document.content);
    if (sents.length === 0 || queryTerms.length === 0) return [];

    const sentK1 = 1.2;
    const sentB = 0.4;
    const avgSentLen = 20.0;

    // Query-phrase bigrams (e.g. "largest~country" from "largest country") — without these, a
    // document mentioning several unrelated "largest X" superlatives about different entities
    // (largest economy, largest by population, second-largest by area...) scored every one of
    // those sentences roughly the same as the one actually answering "largest country", since
    // single-term matching can't tell "largest country" apart from "largest" + "country" landing
    // in unrelated sentences. Observed live: a "what is the largest country" query pulled Brazil's
    // "largest country in South America" and India's population blurb into the grounding context
    // ahead of Russia's actual "world's largest country by area" sentence, and the small model
    // conflated them into a wrong answer. Bigram IDF is naturally much higher than either word's
    // own IDF (the exact phrase is rarer than its parts), so a real phrase match now dominates
    // ranking instead of being just one more same-weight single-term hit.
    const queryBigramSet = new Set(this.makeBigrams(Array.from(new Set(queryTerms))));

    const scored: { text: string; score: number }[] = sents.map((sentence) => {
      const terms = processForSearch(sentence);
      const dl = Math.max(terms.length, 1);
      const tf = new Map<string, number>();
      for (const t of terms) {
        tf.set(t, (tf.get(t) || 0) + 1);
      }
      const sentenceBigrams = this.makeBigrams(terms);
      for (const bg of sentenceBigrams) {
        tf.set(bg, (tf.get(bg) || 0) + 1);
      }

      let score = 0;
      const uniqueQuery = Array.from(new Set([...queryTerms, ...queryBigramSet]));
      for (const term of uniqueQuery) {
        const freq = tf.get(term) || 0;
        if (freq > 0) {
          const idfVal = this.idf(term);
          const norm = sentK1 * (1 - sentB + (sentB * dl) / avgSentLen);
          let termScore = (idfVal * freq * (sentK1 + 1)) / (freq + norm);
          if (literalTerms && !literalTerms.has(term) && !term.includes('~')) {
            termScore *= 0.35;
          }
          score += termScore;
        }
      }
      return { text: sentence, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((s) => s.text);
  }

  private makeBigrams(terms: string[]): string[] {
    if (terms.length <= 1) return [];
    const bigrams: string[] = [];
    for (let i = 0; i < terms.length - 1; i++) {
      bigrams.push(`${terms[i]}~${terms[i + 1]}`);
    }
    return bigrams;
  }

  private makeTrigrams(terms: string[]): string[] {
    if (terms.length <= 2) return [];
    const trigrams: string[] = [];
    for (let i = 0; i < terms.length - 2; i++) {
      trigrams.push(`${terms[i]}~${terms[i + 1]}~${terms[i + 2]}`);
    }
    return trigrams;
  }

  private normaliseEntityKey(s: string): string {
    return foldDiacritics(s)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .join(' ');
  }

  private indexEntityTitle(title: string, docIdx: number): void {
    const words = this.normaliseEntityKey(title).split(' ').filter((w) => w.length > 0);
    const full = words.join(' ');
    if (full.length >= 2) {
      if (!this.entityIndex.has(full)) this.entityIndex.set(full, []);
      this.entityIndex.get(full)!.push(docIdx);
    }
    for (const size of [2, 3]) {
      if (words.length > size) {
        for (let start = 0; start <= words.length - size; start++) {
          const window = words.slice(start, start + size);
          // A window edged by a stopword ("facts about", "how to") is a generic English
          // fragment, not a named entity — indexing it caused an unrelated query like "facts
          // about dogs" to phrase-match "Major World Countries: Key Facts About Global Powers"
          // purely because both contain "facts about", with zero topical overlap.
          if (STOP_WORDS.has(window[0]) || STOP_WORDS.has(window[window.length - 1])) continue;
          const phrase = window.join(' ');
          if (!this.entityIndex.has(phrase)) this.entityIndex.set(phrase, []);
          this.entityIndex.get(phrase)!.push(docIdx);
        }
      }
    }
  }

  private indexEntityPhrase(phrase: string, docIdx: number): void {
    const key = this.normaliseEntityKey(phrase);
    if (key.length >= 2) {
      if (!this.entityIndex.has(key)) this.entityIndex.set(key, []);
      this.entityIndex.get(key)!.push(docIdx);
    }
  }

  private entityBoostMap(rawQuery: string): Map<number, number> {
    const words = foldDiacritics(rawQuery)
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 0);

    const boosts = new Map<number, number>();
    if (words.length === 0) return boosts;

    for (let windowSize = Math.min(3, words.length); windowSize >= 1; windowSize--) {
      for (let start = 0; start <= words.length - windowSize; start++) {
        const phrase = words.slice(start, start + windowSize).join(' ');
        const indices = this.entityIndex.get(phrase);
        if (indices) {
          const bonus = windowSize * 2.0; // 2pt for 1 word, 4pt for 2 words, 6pt for 3 words
          for (const idx of indices) {
            boosts.set(idx, Math.max(boosts.get(idx) || 0, bonus));
          }
        }
      }
    }
    return boosts;
  }

  private rerankWithTFIDF(
    candidates: { idx: number; score: number }[],
    queryTerms: string[]
  ): { idx: number; score: number }[] {
    if (candidates.length <= 1) return candidates;
    const maxBM25 = candidates[0].score || 1.0;

    const queryTF = new Map<string, number>();
    for (const t of queryTerms) {
      queryTF.set(t, (queryTF.get(t) || 0) + 1);
    }
    const queryVec = this.tfidfVector(queryTF, queryTerms.length);
    const queryNorm = this.l2Norm(queryVec);

    const reranked = candidates.map(({ idx, score: bm25Score }) => {
      const docCounts = this.termFrequencies[idx];
      let docTotal = 0;
      for (const val of docCounts.values()) docTotal += val;

      const docVec = this.tfidfVector(docCounts, docTotal);
      const docNorm = this.l2Norm(docVec);

      let cosine = 0;
      if (queryNorm > 0 && docNorm > 0) {
        let dot = 0;
        for (const [key, qVal] of queryVec.entries()) {
          const dVal = docVec.get(key) || 0;
          dot += qVal * dVal;
        }
        cosine = dot / (queryNorm * docNorm);
      }

      const normBM25 = bm25Score / Math.max(maxBM25, 1e-9);
      const blended = 0.65 * normBM25 + 0.35 * cosine;
      return {
        idx,
        score: blended * maxBM25,
      };
    });

    return reranked.sort((a, b) => b.score - a.score);
  }

  private tfidfVector(counts: Map<string, number>, totalTerms: number): Map<string, number> {
    const vec = new Map<string, number>();
    for (const [term, count] of counts.entries()) {
      const tf = count / Math.max(totalTerms, 1);
      const idfVal = this.idf(term);
      if (idfVal > 0) {
        vec.set(term, tf * idfVal);
      }
    }
    return vec;
  }

  private l2Norm(vec: Map<string, number>): number {
    let sumSq = 0;
    for (const val of vec.values()) {
      sumSq += val * val;
    }
    return Math.sqrt(sumSq);
  }

  // synonymOnlyTerms: when provided, any query term NOT in it (i.e. only present because
  // synonym expansion added it, not because the user typed it or a bigram/trigram derived from
  // what they typed) contributes at reduced weight — see the comment in search() above.
  private bm25(tf: Map<string, number>, queryTerms: string[], literalTerms?: Set<string>): number {
    let dl = 0;
    for (const v of tf.values()) dl += v;

    const SYNONYM_TERM_WEIGHT = 0.35;

    let score = 0;
    const uniqueTerms = Array.from(new Set(queryTerms));
    for (const term of uniqueTerms) {
      const freq = tf.get(term) || 0;
      if (freq > 0) {
        const idfVal = this.idf(term);
        const norm = this.k1 * (1 - this.b + (this.b * dl) / Math.max(this.avgDocLength, 1));
        let termScore = (idfVal * freq * (this.k1 + 1)) / (freq + norm);
        if (literalTerms && !literalTerms.has(term) && !term.includes('~')) {
          termScore *= SYNONYM_TERM_WEIGHT;
        }
        score += termScore;
      }
    }
    return score;
  }

  private idf(term: string): number {
    const df = this.documentFrequencies.get(term) || 0;
    const n = this.documents.length;
    return Math.log((n - df + 0.5) / (df + 0.5) + 1.0);
  }

  private bestSnippet(content: string, queryTerms: string[], maxChars: number = 280): string {
    const words = content.split(/\s+/);
    const win = Math.min(40, words.length);
    let bestStart = 0;
    let maxHits = 0;

    for (let i = 0; i <= Math.max(0, words.length - win); i++) {
      const chunk = words.slice(i, i + win).join(' ').toLowerCase();
      let hits = 0;
      for (const t of queryTerms) {
        if (chunk.includes(t)) hits++;
      }
      if (hits > maxHits) {
        maxHits = hits;
        bestStart = i;
      }
    }

    let snippet = words.slice(bestStart, Math.min(bestStart + win, words.length)).join(' ');
    if (snippet.length > maxChars) {
      snippet = snippet.slice(0, maxChars) + '…';
    }
    return snippet;
  }

}
