import { KnowledgeItem } from '../../types';

/**
 * BIOLOGY_CONCEPTS_GAPS_3 — batch 217 corrections.
 * Biology was mostly well covered. Misses: "monocot vs dicot" gave sunflowers
 * and cabbages as monocots (they are dicots), "antlers vs horns" missed the
 * keratin sheath and shedding, "shark vs whale" never said fish vs mammal,
 * "wasp vs bee" never gave the practical distinction, plus a web dump for
 * warm-blooded vs cold-blooded and a fuzzy endangered/threatened answer.
 */
export const BIOLOGY_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  {
    id: 'kb-gap-bio3-monocot-vs-dicot',
    title: 'Monocot vs dicot',
    category: 'science',
    keywords: [
      'difference between a monocot and a dicot', 'monocot vs dicot', 'cotyledons seed leaves',
      'one versus two', 'parallel versus net veins', 'flower parts in threes versus fours or fives',
      'grasses lilies corn are monocots', 'beans roses sunflowers are dicots', 'fibrous versus taproot',
    ],
    content: `Monocots and dicots are the two traditional groups of flowering plants (angiosperms), told apart by several features that go together:

- Seed leaves (cotyledons): monocots have ONE; dicots have TWO. This is the origin of the names.
- Leaf veins: monocots have parallel veins (like a blade of grass); dicots have branching, net-like veins.
- Flower parts: monocots come in multiples of THREE (3 or 6 petals); dicots in multiples of FOUR or FIVE.
- Roots: monocots have a fibrous root system; dicots typically have a taproot.
- Vascular bundles in the stem: scattered in monocots; arranged in a ring in dicots.
- Pollen: one pore/furrow in monocots; three in dicots.

Examples of MONOCOTS: grasses, wheat, rice, corn (maize), lilies, tulips, orchids, onions, palms, bamboo.
Examples of DICOTS: beans and other legumes, roses, sunflowers, daisies, cabbage, tomatoes, oaks, maples, most broadleaf trees and garden flowers.

(So sunflowers and cabbages are dicots, not monocots.) Modern classification splits the old "dicots" further, but the monocot / (broad) dicot distinction is still taught and useful.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bio3-antlers-vs-horns',
    title: 'Antlers vs horns',
    category: 'science',
    keywords: [
      'difference between antlers and horns', 'antlers vs horns', 'shed and regrow every year',
      'permanent lifelong', 'pure bone', 'bone core with keratin sheath', 'branched versus unbranched',
      'deer versus cattle antelope goats', 'velvet', 'cervids versus bovids',
    ],
    content: `Antlers grow on members of the deer family (cervids: deer, elk, moose, caribou). They are made of pure bone, they branch (into tines), and they are shed and completely regrown every single year — growing under a skin of blood-rich "velvet" that is later rubbed off. They are grown almost only by males (the exception is caribou/reindeer, where females also have them), and they get larger each year with the animal's age and condition.

Horns grow on the cattle family (bovids: cattle, sheep, goats, antelope, bison) and also on pronghorn and rhinos (a special case). A true horn has a core of living bone attached to the skull, permanently covered by a sheath of keratin (the same material as fingernails and hair). Horns are NOT branched and are NOT shed — they are permanent and grow throughout life. In many species both sexes have them. (Pronghorn shed just the keratin sheath yearly; a rhino "horn" is solid keratin with no bone core.)

Quick test: branched, bone, dropped every year -> antler; unbranched, bone-plus-keratin, kept for life -> horn.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bio3-shark-vs-whale',
    title: 'Shark vs whale',
    category: 'science',
    keywords: [
      'difference between a shark and a whale', 'shark vs whale', 'fish versus mammal',
      'gills versus lungs', 'cold-blooded versus warm-blooded', 'lays eggs or live young',
      'vertical versus horizontal tail', 'cartilage skeleton', 'nurses young milk', 'blowhole',
    ],
    content: `A shark is a fish; a whale is a mammal. That single fact drives most of the differences.

Shark: breathes dissolved oxygen from water through gills, so it never surfaces to breathe. Cold-blooded (a few large sharks keep some muscles warm, but they do not regulate a constant body temperature). Skeleton made of cartilage, not bone. Skin covered in tooth-like scales (dermal denticles). Tail fin is vertical and swishes side to side. Most lay eggs or bear live young that get no parental care. Sharks are an ancient group of cartilaginous fish.

Whale (including dolphins and porpoises): breathes air with lungs through a blowhole and must surface regularly. Warm-blooded, maintaining a constant body temperature with a layer of blubber. Skeleton of bone. Nearly hairless skin, not scaly. Tail fluke is horizontal and moves up and down. Gives birth to live young that are nursed on milk and cared for. Whales are mammals whose ancestors returned to the sea about 50 million years ago.

Size overlaps (a whale shark is a shark; a dwarf sperm whale is small), so size is not the distinction — breathing, blood temperature, skeleton, tail orientation and how they reproduce are.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bio3-wasp-vs-bee',
    title: 'Wasp vs bee',
    category: 'science',
    keywords: [
      'difference between a wasp and a bee', 'wasp vs bee', 'hairy branched body hairs', 'smooth shiny body',
      'pollen and nectar diet', 'predatory carnivorous larvae', 'pollination', 'narrow waist',
      'barbed versus smooth stinger', 'hornet is a wasp',
    ],
    content: `Bees and wasps are both in the order Hymenoptera, and bees actually evolved from within the wasps, but they differ in body, diet and behaviour.

Bees: bodies are rounder and covered in branched, feathery hairs (which trap pollen), often brownish or with dull yellow/black. They are vegetarians: adults and larvae live on nectar and pollen, so bees are major pollinators. A honeybee's stinger is barbed and tears loose when used, killing the bee; most other bees can sting repeatedly. Bees are generally not aggressive away from the hive.

Wasps: bodies are slender, smooth, shiny and nearly hairless, with a sharply pinched "wasp waist" and often bright yellow-and-black warning colours. Most wasps are predators or parasites: they hunt other insects and spiders to feed their larvae (the adults often still take nectar). Their stinger is smooth, so they can sting many times, and social wasps (yellowjackets, hornets) can be aggressive, especially in late summer. A hornet is simply a large social wasp, not a separate group.

Quick test: fuzzy, on flowers for pollen, chunky -> bee; smooth and shiny, hunting other insects, narrow-waisted -> wasp.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bio3-warm-vs-cold-blooded',
    title: 'Warm-blooded (endotherm) vs cold-blooded (ectotherm)',
    category: 'science',
    keywords: [
      'difference between warm blooded and cold blooded', 'endotherm vs ectotherm', 'generates its own heat',
      'relies on the environment', 'constant body temperature', 'basking', 'metabolic rate and food needs',
      'active in cold', 'poikilotherm homeotherm', 'misleading terms',
    ],
    content: `"Warm-blooded" and "cold-blooded" are old, somewhat misleading labels. A basking lizard can be hotter than your hand; its blood is not literally cold.

Endotherm ("warm-blooded" — mammals and birds): generates its own body heat internally by burning food, and holds a roughly constant, high body temperature regardless of the surroundings (using shivering, sweating, panting, fur, feathers, fat). This allows constant activity — at night, in winter, in cold climates. The cost is a high metabolic rate: an endotherm needs roughly 5-10 times more food than an ectotherm of the same size, most of it spent just staying warm.

Ectotherm ("cold-blooded" — reptiles, amphibians, fish, insects): body temperature tracks the environment. It warms up by basking in the sun or on warm rock and cools in the shade or water. When it is cold, an ectotherm becomes sluggish and cannot digest, move or hunt well, so most are inactive on cold nights and through winter, and very few live near the poles. The upside is efficiency: needing far less food, ectotherms can survive long fasts and thrive where food is scarce.

(Related precise terms: homeotherm = keeps a stable temperature; poikilotherm = variable temperature.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bio3-endangered-vs-threatened',
    title: 'Endangered vs threatened species',
    category: 'science',
    keywords: [
      'difference between an endangered and a threatened species', 'endangered vs threatened',
      'IUCN Red List categories', 'US Endangered Species Act', 'vulnerable near threatened',
      'critically endangered', 'risk of extinction levels', 'conservation status',
    ],
    content: `Both mean a species is at risk, but they are graded levels, and two systems use the words slightly differently.

Under the US Endangered Species Act:
- Endangered = in danger of extinction throughout all or a significant part of its range (the higher-risk category).
- Threatened = likely to become endangered in the foreseeable future (a step less severe).

Under the IUCN Red List (the global standard), "threatened" is the UMBRELLA term covering three categories of increasing risk:
- Vulnerable — high risk of extinction in the wild.
- Endangered — very high risk of extinction in the wild.
- Critically Endangered — extremely high risk, on the brink.
Below "threatened" are Near Threatened and Least Concern; above it are Extinct in the Wild and Extinct.

So in casual use "endangered" is worse than "threatened". In IUCN terms, "endangered" is one specific rung on the "threatened" ladder, sitting between vulnerable and critically endangered. Either way, the classification is based on population size, rate of decline, geographic range and the severity of threats.`,
    createdAt: Date.now(),
  },
];
