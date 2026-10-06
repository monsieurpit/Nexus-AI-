// Name ideas (2026-10-06, Patrick: "his suggestions are trash" — generic Willow/Hazel lists that ignored "names that make
// people think she's beautiful"). Real names with their meaning, grouped by style; a name request gets a shuffled sample
// of the style it asked for, so the answer fits the request, says WHY each name fits, and changes every time.

type Gender = 'girl' | 'boy';
type Style = 'beautiful' | 'strong' | 'cute' | 'unique' | 'french' | 'nature' | 'celestial' | 'royal' | 'myth' | 'classic' | 'modern';

const N: Record<Gender, Record<Style, string[]>> = {
  girl: {
    beautiful: ['Isabella — "Bella" means beautiful (Italian)', 'Belle — "beautiful" (French)', 'Mirabelle — "wonderful beauty"', 'Calista — "most beautiful" (Greek)', 'Callie — from Greek kallos, "beauty"', 'Naomi — "pleasant, lovely" (Hebrew)', 'Jolie — "pretty" (French)', 'Amara — "grace, eternal beauty"', 'Linda — "pretty" (Spanish)', 'Bonnie — "pretty" (Scottish)', 'Annabelle — "graceful and beautiful"', 'Keziah — a fragrant spice, a byword for beauty (Hebrew)', 'Shayna — "beautiful" (Yiddish)', 'Jamila — "beautiful" (Arabic)', 'Hermosa — "beautiful" (Spanish)', 'Nomvula — "mother of rain", a gentle beauty name (Zulu)', 'Bellamy — "beautiful friend"', 'Mabel — "lovable"', 'Alana — "fair, beautiful" (Celtic)', 'Zaina — "beautiful, graceful" (Arabic)', 'Vashti — "beautiful" (Persian)', 'Ainhoa — a lovely Basque name with a soft sound', 'Aurelia — "golden"', 'Ophélie — "help", soft and romantic (French)'],
    strong: ['Valentina — "strong, healthy"', 'Matilda — "mighty in battle"', 'Alexandra — "defender of the people"', 'Louise — "famous warrior"', 'Bridget — "strength, exalted one"', 'Audrey — "noble strength"', 'Valerie — "strong, brave"', 'Gabrielle — "God is my strength"', 'Andrea — "strong, brave"', 'Kendra — "greatest champion"', 'Imelda — "all-consuming fight"', 'Maeve — "she who intoxicates", a warrior queen (Irish)', 'Thea — "goddess"', 'Brienne — "strong", the knight from Game of Thrones'],
    cute: ['Lily — the flower, sweet and simple', 'Ellie — "light"', 'Mia — "mine, beloved"', 'Rosie — "rose"', 'Poppy — the red flower', 'Daisy — the flower, cheerful', 'Lulu — playful, "pearl"', 'Coco — sweet, chic (French)', 'Millie — "gentle strength"', 'Zoé — "life" (Greek)', 'Bijou — "jewel" (French)', 'Mimi — "beloved"', 'Pia — "pious, devout", tiny and cute', 'Nina — "little girl"'],
    unique: ['Elowen — "elm tree" (Cornish)', 'Seren — "star" (Welsh)', 'Isolde — "fair lady", from the legend', 'Saoirse — "freedom" (Irish)', 'Liora — "my light" (Hebrew)', 'Thalia — "blooming" (Greek muse)', 'Marisol — "sea and sun" (Spanish)', 'Anouk — "grace" (Dutch/French)', 'Inès — "pure" (French)', 'Wren — the little songbird', 'Odalys — "wealthy, prosperous"', 'Zinnia — the bright flower', 'Esmée — "esteemed, loved" (French)', 'Sabine — elegant and rare (French)'],
    french: ['Aurélie — "golden"', 'Élodie — "foreign riches", musical sound', 'Rosalie — "rose"', 'Camille — elegant, timeless', 'Léa — "meadow", top name in Quebec', 'Florence — "flourishing"', 'Juliette — "youthful", romantic', 'Maëlle — "princess, chief" (Breton)', 'Clémence — "mercy, gentle"', 'Océane — "ocean"', 'Charlotte — "free", classic', 'Margaux — "pearl"', 'Éloïse — "healthy, wide"', 'Noémie — "pleasant", popular in Quebec', 'Anaïs — "grace"', 'Solène — "solemn, sunlight"'],
    nature: ['Rose — the flower of love', 'Violette — "violet"', 'Iris — "rainbow"', 'Flora — "flower"', 'Jasmine / Yasmine — the fragrant flower', 'Ivy — the evergreen vine', 'Willow — the graceful tree', 'Magnolia — the big white flower', 'Fleur — "flower" (French)', 'Azalea — the bright flower', 'Laurel — the victory tree', 'Coral — from the sea', 'Marina — "of the sea"', 'Lilou — little lily (French)'],
    celestial: ['Luna — "moon"', 'Stella — "star"', 'Aurora — "dawn"', 'Estelle — "star" (French)', 'Celeste — "heavenly"', 'Elena — "bright, shining light"', 'Soleil — "sun" (French)', 'Nova — "new star"', 'Lucia — "light"', 'Selena — "moon goddess"', 'Esther — "star" (Persian)', 'Lyra — the constellation', 'Danica — "morning star" (Slavic)', 'Clara — "bright, clear"'],
    royal: ['Sarah — "princess" (Hebrew)', 'Regina — "queen"', 'Victoria — "victory", a queen name', 'Adeline — "noble"', 'Alice — "noble"', 'Elizabeth — royal and timeless', 'Sadie — "princess"', 'Rania — "queenly"', 'Allison — "noble"', 'Gloria — "glory"', 'Ariana — "most holy"', 'Malika — "queen" (Arabic)', 'Elara — a moon of Jupiter, named for a princess', 'Deborah — "bee", a prophetess-queen'],
    myth: ['Athena — goddess of wisdom', 'Freya — Norse goddess of love and beauty', 'Aphrodite — goddess of beauty (bold!)', 'Venus — Roman goddess of beauty', 'Iris — messenger goddess of the rainbow', 'Penelope — loyal heroine of the Odyssey', 'Calliope — "beautiful voice" (muse)', 'Daphne — the laurel nymph', 'Artemis — goddess of the moon and the hunt', 'Persephone — queen of spring', 'Ophelia — "help", Shakespeare\'s heroine', 'Niamh — "radiant", Irish goddess', 'Hera — queen of the gods', 'Psyche — "soul", loved by Eros'],
    classic: ['Eleanor — "light"', 'Grace — elegance itself', 'Catherine — "pure"', 'Sophia — "wisdom"', 'Charlotte — "free"', 'Amelia — "work, industrious"', 'Evelyn — "wished-for child"', 'Margaret — "pearl"', 'Victoria — "victory"', 'Audrey — "noble strength"', 'Josephine — "she will grow"', 'Anne — "grace"', 'Emma — "whole, universal"', 'Lucy — "light"'],
    modern: ['Ava — "life"', 'Mila — "gracious, dear"', 'Harper — trendy, "harp player"', 'Aria — "melody"', 'Zara — "princess, radiant"', 'Everly — "wild boar meadow", soft sound', 'Nova — "new"', 'Isla — "island"', 'Maya — "illusion, water"', 'Kaia — "pure, sea"', 'Remi — "oarsman", unisex and cool', 'Sienna — the warm colour', 'Ayla — "moonlight"', 'Livia — "envious", chic Roman name'],
  },
  boy: {
    beautiful: ['Beau — "handsome" (French)', 'Kevin — "handsome, kind" (Irish)', 'Alan — "handsome, cheerful"', 'Hassan — "handsome" (Arabic)', 'Jamal — "beauty" (Arabic)', 'Bellamy — "beautiful friend"', 'Kenneth — "handsome, born of fire"', 'Adonis — the handsome god', 'Joli — "handsome, pretty" (French)', 'Keanu — "cool breeze" (Hawaiian)', 'Florian — "flowering"', 'Rhys — "ardour, enthusiasm"'],
    strong: ['Ethan — "strong, firm"', 'Liam — "strong-willed warrior"', 'Leo — "lion"', 'Alexander — "defender of men"', 'Arnaud — "eagle power" (French)', 'Gabriel — "God is my strength"', 'Valentin — "strong, healthy"', 'Bernard — "brave as a bear"', 'Andrew — "manly, strong"', 'Maximus — "the greatest"', 'Richard — "strong ruler"', 'Ezekiel — "God strengthens"', 'Kane — "warrior"', 'Brian — "high, noble, strong"'],
    cute: ['Milo — "gracious"', 'Teddy — "gift of God"', 'Ollie — "olive tree"', 'Benji — "son of the right hand"', 'Arlo — "fortified hill"', 'Louie — "famous warrior"', 'Finn — "fair"', 'Jules — "youthful" (French)', 'Noé — "rest, comfort"', 'Timothée — "honouring God"', 'Leo — "lion"', 'Sammy — "God has heard"'],
    unique: ['Caspian — the sea', 'Lucan — "light"', 'Evander — "good man"', 'Thibault — "bold people" (French)', 'Idris — "interpreter"', 'Ronan — "little seal" (Irish)', 'Bastien — "venerable" (French)', 'Soren — "stern" (Danish)', 'Lior — "my light" (Hebrew)', 'Cassius — "hollow", cool Roman name', 'Anouar — "lights" (Arabic)', 'Elio — "sun"'],
    french: ['Félix — "lucky, happy"', 'Mathis — "gift of God", top name in Quebec', 'Raphaël — "God heals"', 'Antoine — "priceless"', 'Olivier — "olive tree"', 'Émile — "eager"', 'Laurent — "laurel"', 'Thomas — classic Quebec name', 'Xavier — "new house"', 'Gabriel — "God is my strength"', 'Édouard — "rich guardian"', 'Loïc — "famous warrior"', 'William — huge in Quebec', 'Zachary — "God remembered"'],
    nature: ['River — the flowing water', 'Rowan — the red-berried tree', 'Ash — the tree', 'Forest — the woods', 'Jasper — the gemstone', 'Leo — "lion"', 'Oakley — "oak meadow"', 'Silas — "of the forest"', 'Bodhi — "awakening"', 'Reed — the water plant', 'Wolf — the animal', 'Sylvain — "of the forest" (French)'],
    celestial: ['Orion — the hunter constellation', 'Elio — "sun"', 'Sol — "sun"', 'Lucas — "light"', 'Atlas — holds up the sky', 'Cyrus — "sun"', 'Samson — "of the sun"', 'Leo — the constellation', 'Kiran — "ray of light"', 'Apollo — god of the sun', 'Sirius — the brightest star', 'Castor — one of the Gemini twins'],
    royal: ['Henry — "ruler of the home"', 'Arthur — the legendary king', 'Rex — "king"', 'Leroy — "the king" (French)', 'Malik — "king" (Arabic)', 'Ryan — "little king"', 'Basil — "royal"', 'Elric — "noble ruler"', 'Frederick — "peaceful ruler"', 'Louis — French kings\' name', 'Roy — "king"', 'Emir — "prince"'],
    myth: ['Apollo — god of sun and music', 'Thor — Norse god of thunder', 'Achilles — the hero', 'Odin — the all-father', 'Ares — god of war', 'Atlas — the titan', 'Perseus — slayer of Medusa', 'Jason — leader of the Argonauts', 'Hector — the noble Trojan', 'Loki — the trickster (bold)', 'Orion — the hunter', 'Hermes — the messenger god'],
    classic: ['James — "supplanter"', 'William — "resolute protector"', 'Henry — "ruler of the home"', 'Charles — "free man"', 'Edward — "rich guardian"', 'Thomas — "twin"', 'Samuel — "God has heard"', 'Benjamin — "son of the right hand"', 'Daniel — "God is my judge"', 'Joseph — "he will add"', 'Theodore — "gift of God"', 'Louis — "famous warrior"'],
    modern: ['Kai — "sea"', 'Ezra — "help"', 'Mason — "stone worker"', 'Jaxon — trendy, energetic', 'Nolan — "champion"', 'Rowan — "little red one"', 'Asher — "happy, blessed"', 'Luca — "light"', 'Hudson — "son of Hugh"', 'Axel — "father of peace"', 'Theo — "gift of God"', 'Enzo — "ruler of the home"'],
  },
};

const PET_DOG = ['Bear', 'Biscuit', 'Maple', 'Ziggy', 'Moose', 'Pepper', 'Bruno', 'Nala', 'Rocky', 'Hazel', 'Waffles', 'Duke', 'Juno', 'Poutine (Quebec classic)', 'Koda', 'Mochi', 'Ranger', 'Lola', 'Bandit', 'Cookie', 'Atlas', 'Pickles', 'Sasha', 'Teddy'];
const PET_CAT = ['Luna', 'Mochi', 'Salem', 'Cleo', 'Nugget', 'Milo', 'Pixel', 'Olive', 'Simba', 'Tofu', 'Shadow', 'Bijou', 'Pumpkin', 'Misty', 'Oreo', 'Nala', 'Ziggy', 'Cosmo', 'Biscotti', 'Minou (French for kitty)', 'Smokey', 'Nyx', 'Ginger', 'Sushi'];

const STYLE_CUES: Array<[Style, RegExp]> = [
  ['beautiful', /\b(?:beautiful|beauty|pretty|gorgeous|elegant|lovely|stunning|attractive|handsome|bell[ea]|belle)\b|\bthink\s+(?:she|he)(?:'?s|\s+is)\s+(?:beautiful|pretty|gorgeous|handsome)/i],
  ['strong', /\b(?:strong|strength|powerful|power|badass|fierce|brave|warrior|tough)\b/i],
  ['cute', /\b(?:cute|sweet|adorable|soft|little)\b/i],
  ['unique', /\b(?:unique|rare|uncommon|different|original|unusual)\b/i],
  ['french', /\b(?:french|fran[cç]ais|quebec|qu[eé]b[eé]c(?:ois|ois)?)\b/i],
  ['nature', /\b(?:nature|flower|floral|tree|plant|ocean|sea)\b/i],
  ['celestial', /\b(?:moon|star|sun|sky|celestial|space|light)\b/i],
  ['royal', /\b(?:royal|princess|prince|queen|king|noble)\b/i],
  ['myth', /\b(?:goddess|god|myth(?:ology|ical)?|greek|norse|legend)\b/i],
  ['classic', /\b(?:classic|old[\s-]?(?:school|fashioned)|timeless|traditional|vintage)\b/i],
  ['modern', /\b(?:modern|trendy|popular|cool)\b/i],
];

export const NAME_REQUEST_RE = /\b(?:name|names|naming)\b/i;
const PERSON_RE = /\b(?:baby|bb|newborn|daughter|son|girl|boy|kid|child|twins?|she|he|her|him)\b/i;

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

// The block for the question specialist, or null when it isn't a name request for a baby/child/pet.
export function nameIdeasBlock(text: string): string | null {
  if (!NAME_REQUEST_RE.test(text)) return null;
  const dog = /\b(?:dog|puppy|pup|doggo)\b/i.test(text);
  const cat = /\b(?:cat|kitten|kitty)\b/i.test(text);
  if (dog || cat) {
    const pool = shuffle(dog ? PET_DOG : PET_CAT).slice(0, 14);
    return `NAME LIST (real ${dog ? 'dog' : 'cat'} names — pick 6-8 that fit, add a tiny reason for one or two):\n${pool.join(', ')}`;
  }
  if (!PERSON_RE.test(text)) return null;
  const girl = /\b(?:girl|daughter|she|her|female|princess)\b/i.test(text);
  const boy = /\b(?:boy|son|he|him|male)\b/i.test(text);
  const genders: Gender[] = girl && !boy ? ['girl'] : boy && !girl ? ['boy'] : ['girl', 'boy'];
  const styles = STYLE_CUES.filter(([, re]) => re.test(text)).map(([s]) => s);
  const picks: string[] = [];
  for (const g of genders) {
    const from = styles.length ? styles : (['beautiful', 'french', 'celestial', 'unique', 'classic', 'nature'] as Style[]);
    const pool = shuffle(from.flatMap((s) => N[g][s]));
    picks.push(`${genders.length > 1 ? `${g === 'girl' ? 'GIRLS' : 'BOYS'}: ` : ''}${[...new Set(pool)].slice(0, genders.length > 1 ? 9 : 14).join('; ')}`);
  }
  const want = styles.length ? `They want names that are ${styles.join(' / ')}.` : 'No style asked — give a lovely varied mix.';
  return `NAME LIST (real names with what they mean). ${want} Pick 6-8 from it that best fit THEIR request, one per line as "Name — meaning" (keep each meaning a few words), then your one-line favourite. Don't add names that aren't on the list.\n${picks.join('\n')}`;
}

// "Hermosa — beautiful; Amara — grace, ... I'd pick Hermosa" → one "Name — meaning" per line, the favourite on its own line.
export function formatNameList(content: string): string {
  if ((content.match(/ — /g) || []).length < 3) return content;
  return content
    .replace(/\s*[;,]\s+(?=[A-ZÀ-Ý][\p{L}'’/ ]{1,30} — )/gu, '\n')
    .replace(/\s+(?=(?:I'?d\s+(?:pick|go\s+(?:with|for))|My\s+(?:pick|fav(?:ou?rite)?)|I\s+reckon|Top\s+pick|Personally|Go\s+(?:with|for)|Honestly)\b)/i, '\n')
    .replace(/[ \t]+\n/g, '\n');
}
