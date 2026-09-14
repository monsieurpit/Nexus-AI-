import { KnowledgeItem } from '../../types';

// Batch 283 corpus fixes — literature/language topics. Strong domain, 4/25 misses, mostly the
// "answered only half the comparison" pattern.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'literature',
  keywords,
  content,
  createdAt: now,
});

export const LITERATURE_LANGUAGE_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-lit-novelist-vs-author',
    'Novelist vs author',
    ['novelist', 'author', 'difference novelist author'],
    "'Author' is the broad, general term for anyone who has written any kind of written work — a novel, a poem, a textbook, an article, a screenplay, a cookbook, anything. A novelist is a more specific term: an author who specifically writes NOVELS (long-form fiction, typically 60,000-120,000 words). So every novelist is technically an author, but not every author is a novelist — a poet, a journalist, a screenwriter, and a textbook writer are all 'authors' of their respective works, but none of them are 'novelists' unless they've also written a novel specifically.",
  ),
  k(
    'kb-gap-lit-idiom-vs-proverb',
    'Idiom vs proverb',
    ['idiom', 'proverb', 'difference idiom proverb'],
    "An idiom is a phrase whose meaning can't be figured out just from the individual words — it only makes sense figuratively, as a whole fixed expression ('cost an arm and a leg' means expensive, not literal limb loss; 'break the ice' means to ease social tension, not literally break ice). A proverb is a short, well-known saying that expresses a general truth, piece of wisdom, or practical advice about life ('the early bird catches the worm', 'don't count your chickens before they hatch') — a proverb usually still makes literal sense on its own and is meant to teach a lesson or offer guidance, rather than just being a fixed figurative phrase. The key difference: an idiom is a figurative expression that replaces a literal meaning entirely, while a proverb is a piece of wisdom or advice phrased as a short, memorable statement (which may itself sometimes use figurative language, but its purpose is to teach a lesson, not just express a non-literal meaning).",
  ),
  k(
    'kb-gap-lit-mythology-vs-folklore',
    'Mythology vs folklore',
    ['mythology', 'folklore', 'difference mythology folklore'],
    "Mythology consists of sacred, foundational stories tied closely to a culture's religion — explaining how the world, gods, and humanity came to be (like Greek myths about Zeus and the creation of the world), and traditionally treated as religiously true within that culture. Folklore is a much broader category of traditional stories, customs, and beliefs passed down through a culture — including legends, fairy tales, superstitions, folk songs, and folk remedies — that aren't necessarily tied to religious belief and don't need to explain cosmic origins; folklore is more about everyday cultural wisdom, entertainment, and tradition. In short: mythology is specifically the sacred, foundational, religiously-significant stories of a culture (gods, creation, cosmic order), while folklore is the much wider umbrella of a culture's traditional stories and customs in general, religious or not.",
  ),
  k(
    'kb-gap-lit-legend-vs-myth',
    'Legend vs myth',
    ['legend', 'myth', 'difference legend myth'],
    "A legend is a traditional story that's usually based on an actual historical person or event, even if it's been exaggerated or embellished heavily over time (like King Arthur or Robin Hood) — legends are presented as having some grounding in real history, even if much of the detail is fictional or legendary embellishment. A myth is a traditional story with NO basis in actual historical events — myths explain natural phenomena, the origin of the world, or the actions of gods and supernatural beings (like Greek myths about how the seasons came to be), and they're understood as symbolic or religious rather than historical. The key difference: a legend claims some connection to real history (a real person or event, exaggerated over time), while a myth is a purely symbolic/religious story about gods, creation, or the supernatural, with no claim to historical accuracy at all.",
  ),
];
