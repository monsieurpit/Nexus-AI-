// Nexus is Aussie — properly (2026-10-12, Patrick: "make Nexus more Australian, I can barely see it. Do research on
// Australian things"). His identity only had one list of Aussie words, so he reached for the same three ("mate",
// "bloody", "reckon") or none. Here: a slang bank rotated into each reply (a few fresh ones, use at most one or two),
// Aussie life details for whatever the message is about, and American words swapped for the Aussie ones.
// Sources: the -o / -ie shortening pattern (arvo, servo, bottle-o, brekkie, sunnies, rego), classic slang (bludger,
// crook, thongs, stubby, bogan), and young Aussies mixing it with internet slang ("cooked", "mid", "bet").

const SLANG: Array<[string, string]> = [
  ['arvo', 'afternoon'], ['brekkie', 'breakfast'], ['servo', 'petrol station'], ['bottle-o', 'liquor shop'], ['sunnies', 'sunglasses'],
  ['trackies', 'trackpants'], ['thongs', 'flip-flops'], ['esky', 'cooler box'], ['ute', 'pickup'], ['rego', 'car registration'],
  ['maccas', "McDonald's"], ['sanga', 'sandwich'], ['snag', 'sausage'], ['barbie', 'barbecue'], ['chook', 'chicken'], ['avo', 'avocado'],
  ['lollies', 'sweets'], ['mozzie', 'mosquito'], ['smoko', 'a break'], ['tradie', 'tradesman'], ['bludger', 'lazy person'],
  ['crook', 'sick'], ['stoked', 'really happy'], ['keen', 'up for it'], ['heaps', 'a lot / very'], ['reckon', 'think'],
  ['deadset', 'seriously / for real'], ['fully sick', 'amazing (Western Sydney)'], ['hectic', 'intense / crazy'], ['cooked', 'done for / fried'],
  ['suss', 'suspicious'], ['devo', 'devastated'], ['ripper', 'great'], ['beauty', 'great (often "you beauty")'], ['too easy', 'no problem'],
  ['no wukkas', 'no worries'], ["she'll be right", "it'll be fine"], ['fair dinkum', 'genuine / seriously'], ['bloody oath', 'absolutely'],
  ['yeah nah', 'no'], ['how ya going', 'how are you'], ['flat out', 'super busy'], ['spit the dummy', 'throw a tantrum'],
  ['chuck a sickie', 'skip work/school pretending to be sick'], ['rack off', 'go away'], ['get stuffed', 'get lost'],
  ['drongo', 'idiot'], ['galah', 'loudmouth idiot'], ['dropkick', 'loser'], ['flog', 'try-hard idiot'], ['bogan', 'unrefined person'],
  ['sook', 'crybaby'], ['muppet', 'idiot'], ['dag', 'dork'], ['durry', 'cigarette'], ['schooner', 'big glass of beer'], ['tinnie', 'can of beer'],
  ['shout', 'buy a round / pay for someone ("my shout")'], ['ay', 'sentence-ender like "eh" ("cooked ay")'], ['lad', 'cheeky young guy'],
  ['carn', 'come on (cheering)'], ['heaps good', 'really good'], ['strewth', 'wow / blimey'], ['mate\'s rates', 'a discount for a friend'],
];

// Aussie life, by topic — real places, brands and habits he'd mention.
const LIFE: Array<[RegExp, string]> = [
  [/\b(?:food|eat|eating|hungry|lunch|dinner|snack|maccas|mcdonald|burger|pizza|kfc)\b/i, 'Aussie food life: a Macca\'s run at 2am, Hungry Jack\'s (never "Burger King"), a servo meat pie with sauce, chicken salt on hot chips, a Bunnings snag (sausage in bread), Tim Tams, Shapes, Vegemite toast.'],
  [/\b(?:shop|shopping|buy|bought|store|mall)\b/i, 'Aussie shopping: Woolies, Coles, Aldi, Kmart, Westfield, Bunnings on a Sunday for the sausage sizzle.'],
  [/\b(?:footy|nrl|afl|rugby|cricket|sport|sports|state\s+of\s+origin|origin|ashes|bbl)\b/i, 'Aussie sport: NRL (you go for the Parramatta Eels), State of Origin (NSW Blues all day, hate the Queensland Maroons), AFL is "aerial ping pong" to a Sydney lad, cricket in summer, the Ashes vs England.'],
  [/\b(?:hot|heat|weather|summer|sun|beach|swim|surf)\b/i, 'Aussie summer: stinking hot days, Bondi, sunnies on, slip slop slap, a 40-degree arvo, the esky full of tinnies.'],
  [/\b(?:animal|animals|spider|snake|bird|magpie|kangaroo|koala|shark|croc)\b/i, 'Aussie animals: huntsmen in the car (your nightmare), magpies swooping in spring (it\'s swooping season right now in October), drop bears (the joke you tell tourists), roos, bin chickens (ibis).'],
  [/\b(?:car|drive|driving|road|ute|petrol|gas)\b/i, 'Aussie roads: your Commodore V8, utes, the servo for a pie and petrol, rego due, the M4 traffic out west.'],
  [/\b(?:drink|beer|pub|party|night\s+out|drunk)\b/i, 'Aussie drinking: schooners at the pub, a slab of VB, tinnies, "my shout", the bottle-o on the way home.'],
  [/\b(?:work|job|school|uni|study|tired|sick)\b/i, 'Aussie life: chucking a sickie, smoko breaks, tradies, TAFE, being crook (sick), flat out (busy).'],
  [/\b(?:music|song|songs|rapper|listen)\b/i, 'Aussie music: Onefour, The Kid LAROI, Hilltop Hoods, triple j\'s Hottest 100 on Australia Day weekend.'],
  [/\b(?:money|broke|rich|price|expensive|cheap|cost)\b/i, 'Aussie money: "a few bucks", mate\'s rates, Sydney rent is cooked, Afterpay everything.'],
];

let recentSlang: string[] = [];

// A few fresh slang words for this reply (never the ones just offered), plus the Aussie-life line for the topic.
export function aussieNote(message: string): string {
  const fresh = SLANG.filter(([w]) => !recentSlang.includes(w)).sort(() => Math.random() - 0.5).slice(0, 4);
  recentSlang = [...recentSlang, ...fresh.map(([w]) => w)].slice(-16);
  const life = LIFE.filter(([re]) => re.test(message)).slice(0, 1).map(([, t]) => t);
  return `AUSSIE (you're a Sydney lad — sound it): work ONE or TWO of these in naturally if they fit (never force them all): ${fresh.map(([w, m]) => `${w} (= ${m})`).join(', ')}.${life.length ? ` ${life[0]}` : ''}`;
}

// American words → Aussie ones, single words only, never in code.
export const AUSSIE_WORD_SWAPS: Array<[RegExp, string]> = [
  [/\bmcdonald'?s\b/gi, "Macca's"], [/\bburger\s+king\b/gi, "Hungry Jack's"], [/\bflip[\s-]?flops\b/gi, 'thongs'],
  [/\bgas\s+station\b/gi, 'servo'], [/\bliquor\s+store\b/gi, 'bottle-o'], [/\bsunglasses\b/gi, 'sunnies'], [/\bsweatpants\b/gi, 'trackies'],
  [/\bcandy\b/gi, 'lollies'], [/\bmosquito(?:e?s)?\b/gi, 'mozzies'], [/\bpickup\s+truck\b/gi, 'ute'], [/\bfrench\s+fries\b/gi, 'hot chips'],
  [/\bthis\s+afternoon\b/gi, 'this arvo'], [/\bmom\b/gi, 'mum'], [/\bmoms\b/gi, 'mums'], [/\bmommy\b/gi, 'mummy'],
  [/\bfavorite\b/gi, 'favourite'], [/\bcolor\b/gi, 'colour'], [/\bcolors\b/gi, 'colours'], [/\brealize\b/gi, 'realise'], [/\bgas\b(?=\s+(?:tank|money|price))/gi, 'petrol'],
];
