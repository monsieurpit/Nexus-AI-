// Deterministic solver for "which of these is/is not a mammal/fruit/etc" style classification
// questions. Same "compute it, don't generate it" principle as mathSolver.ts and dateSolver.ts:
// a small local model asked to classify a handful of named items into a category is prone to
// picking the item that happens to have matched a retrieved document (see the
// isMultiChoiceClassification handling in reasoningEngine.ts) rather than actually reasoning
// about category membership — a bat is a mammal, but "which of these is not a mammal: whale,
// shark, bat" retrieved a "Bats: The Only Mammals That Fly" document and the model, forced to
// answer using only that context, talked exclusively about bats and never named the shark. This
// is a bounded lookup, not an attempt at general-purpose knowledge: it only fires when every
// listed item is recognized, and returns null (letting the normal LLM/corpus path handle it)
// for anything outside its dictionary.

export interface CategorySolution {
  isCategory: true;
  result: string;
  steps: string[];
}

// Reverse-lookup dictionary: item name -> the single category it belongs to, for the category
// classes that actually come up in this kind of trivia question. Deliberately common, unambiguous
// members only (no debatable edge cases like "is a tomato a fruit or a vegetable" — leaving those
// out means the solver stays silent rather than confidently wrong).
const CATEGORY_OF: Record<string, string> = {
  // Mammals
  whale: 'mammal', dolphin: 'mammal', bat: 'mammal', dog: 'mammal', cat: 'mammal', lion: 'mammal',
  tiger: 'mammal', elephant: 'mammal', horse: 'mammal', cow: 'mammal', pig: 'mammal', sheep: 'mammal',
  human: 'mammal', monkey: 'mammal', gorilla: 'mammal', chimpanzee: 'mammal', bear: 'mammal',
  wolf: 'mammal', fox: 'mammal', rabbit: 'mammal', mouse: 'mammal', rat: 'mammal', squirrel: 'mammal',
  kangaroo: 'mammal', koala: 'mammal', platypus: 'mammal', deer: 'mammal', giraffe: 'mammal',
  zebra: 'mammal', rhino: 'mammal', rhinoceros: 'mammal', hippo: 'mammal', hippopotamus: 'mammal',
  seal: 'mammal', walrus: 'mammal', otter: 'mammal', beaver: 'mammal', hedgehog: 'mammal',
  camel: 'mammal', goat: 'mammal', panda: 'mammal', raccoon: 'mammal', skunk: 'mammal',
  // Birds
  eagle: 'bird', sparrow: 'bird', penguin: 'bird', ostrich: 'bird', owl: 'bird', parrot: 'bird',
  crow: 'bird', pigeon: 'bird', flamingo: 'bird', swan: 'bird', duck: 'bird', goose: 'bird',
  chicken: 'bird', turkey: 'bird', hawk: 'bird', falcon: 'bird', robin: 'bird', peacock: 'bird',
  hummingbird: 'bird', woodpecker: 'bird', pelican: 'bird', seagull: 'bird', vulture: 'bird',
  // Fish
  shark: 'fish', salmon: 'fish', tuna: 'fish', goldfish: 'fish', trout: 'fish', catfish: 'fish',
  cod: 'fish', eel: 'fish', clownfish: 'fish', swordfish: 'fish', bass: 'fish', herring: 'fish',
  // Reptiles
  snake: 'reptile', lizard: 'reptile', crocodile: 'reptile', alligator: 'reptile', turtle: 'reptile',
  tortoise: 'reptile', iguana: 'reptile', chameleon: 'reptile', gecko: 'reptile', komodo: 'reptile',
  // Amphibians
  frog: 'amphibian', toad: 'amphibian', salamander: 'amphibian', newt: 'amphibian', axolotl: 'amphibian',
  // Insects
  ant: 'insect', bee: 'insect', wasp: 'insect', beetle: 'insect', butterfly: 'insect', moth: 'insect',
  fly: 'insect', mosquito: 'insect', grasshopper: 'insect', cricket: 'insect', cockroach: 'insect',
  ladybug: 'insect', dragonfly: 'insect', termite: 'insect',
  // Arachnids (a common contrast class for "which is an insect")
  spider: 'arachnid', scorpion: 'arachnid', tick: 'arachnid',
  // Fruits
  apple: 'fruit', banana: 'fruit', orange: 'fruit', grape: 'fruit', strawberry: 'fruit',
  watermelon: 'fruit', pineapple: 'fruit', mango: 'fruit', peach: 'fruit', pear: 'fruit',
  cherry: 'fruit', lemon: 'fruit', lime: 'fruit', kiwi: 'fruit', blueberry: 'fruit',
  raspberry: 'fruit', plum: 'fruit', apricot: 'fruit', coconut: 'fruit', avocado: 'fruit',
  // Vegetables
  carrot: 'vegetable', potato: 'vegetable', broccoli: 'vegetable', spinach: 'vegetable',
  lettuce: 'vegetable', onion: 'vegetable', garlic: 'vegetable', cucumber: 'vegetable',
  cabbage: 'vegetable', celery: 'vegetable', asparagus: 'vegetable', pepper: 'vegetable',
  eggplant: 'vegetable', pumpkin: 'vegetable', zucchini: 'vegetable', kale: 'vegetable',
  radish: 'vegetable', beet: 'vegetable', corn: 'vegetable', pea: 'vegetable',
  // Planets (a frequent "which of these is not a planet" quiz shape, e.g. including a moon or a
  // dwarf planet as the odd one out)
  mercury: 'planet', venus: 'planet', earth: 'planet', mars: 'planet', jupiter: 'planet',
  saturn: 'planet', uranus: 'planet', neptune: 'planet', pluto: 'dwarf planet', moon: 'moon',
};

// A handful of near-alias plurals/variants that don't reduce to the base form via simple
// stemming — mapped explicitly rather than trying to write a general plural-stripper.
const ALIASES: Record<string, string> = {
  wolves: 'wolf', mice: 'mouse', geese: 'goose', men: 'human', women: 'human', people: 'human',
  cacti: 'cactus', leaves: 'kale', potatoes: 'potato', tomatoes: 'tomato',
};

function normalizeItem(raw: string): string {
  let s = raw.trim().toLowerCase().replace(/^(?:an?|the)\s+/, '');
  if (ALIASES[s]) return ALIASES[s];
  // Simple depluralization: try the word as-is first (dictionary keys are singular), then strip
  // a trailing 's' if that singular form is a known category member.
  if (CATEGORY_OF[s]) return s;
  if (s.endsWith('es') && CATEGORY_OF[s.slice(0, -2)]) return s.slice(0, -2);
  if (s.endsWith('s') && CATEGORY_OF[s.slice(0, -1)]) return s.slice(0, -1);
  return s;
}

const CLASSIFICATION_REGEX =
  /\bwhich\s+(?:of\s+(?:these|the\s+following)|one)\b\s*(?:is|are)\s+(not\s+|isn'?t\s+|aren'?t\s+)?an?\s+([a-z]+)\??\s*:?\s*(.+)$/i;

export function trySolveCategoryClassification(prompt: string): CategorySolution | null {
  const match = CLASSIFICATION_REGEX.exec(prompt.trim());
  if (!match) return null;

  const isNegated = !!match[1];
  const categoryRaw = match[2].toLowerCase().replace(/s$/, ''); // "mammals" -> "mammal"
  const listRaw = match[3];

  const items = listRaw
    .split(/,|\band\b|\bor\b/i)
    .map((s) => s.replace(/[?.!]+$/, '').trim())
    .filter(Boolean);
  if (items.length < 2 || items.length > 6) return null; // outside the shape this is built for

  const normalized = items.map((raw) => ({ raw, key: normalizeItem(raw) }));
  // Every item must be a recognized member of the dictionary for this to fire — if even one
  // item is unknown, silently defer to the normal (LLM/corpus) path rather than risk a
  // confidently wrong answer about something outside this bounded lookup.
  if (normalized.some((n) => !CATEGORY_OF[n.key])) return null;

  const belongs = normalized.map((n) => ({ ...n, category: CATEGORY_OF[n.key], matches: CATEGORY_OF[n.key] === categoryRaw }));
  const matchCount = belongs.filter((b) => b.matches).length;

  // For "which is not X": exactly one item should NOT match (the odd one out) and the rest
  // should. For "which is X": exactly one item SHOULD match and the rest shouldn't. If the split
  // isn't clean 1-vs-rest, the question's premise doesn't hold for this dictionary's data (e.g.
  // two items both fail to match) — defer rather than guess which one the asker meant.
  const target = isNegated ? belongs.find((b) => !b.matches) : belongs.find((b) => b.matches);
  const others = belongs.filter((b) => b !== target);
  const cleanSplit = isNegated ? matchCount === belongs.length - 1 : matchCount === 1;
  if (!target || !cleanSplit) return null;

  const articleFor = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a');
  const describe = (b: (typeof belongs)[number]) => `${b.raw} is ${articleFor(b.category)} ${b.category}`;
  const steps = belongs.map(describe);
  // In both the "which is X" and "which is not X" phrasings, `target` is the one item whose
  // category doesn't match the rest of the group — it's always "the odd one out" either way,
  // the negation only changes which item that ends up being (see the `target`/`cleanSplit`
  // logic above), not the grammar of how the answer is phrased.
  const result = `${target.raw} — it is the odd one out (${others.map(describe).join(', ')}, but ${describe(target)}).`;

  return { isCategory: true, result, steps };
}
