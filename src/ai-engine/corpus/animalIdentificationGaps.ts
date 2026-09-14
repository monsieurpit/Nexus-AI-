import { KnowledgeItem } from '../../types';

// Batch 290 corpus fixes — animal identification topics. 9/25 misses. One bizarre hallucination
// ("slug vs snail" answered "slug" as a railroading term — a type of diesel-electric locomotive
// without its own engine — never addressing the actual mollusks) and one real factual error
// ("moth caterpillar vs butterfly caterpillar" claimed caterpillars are distinguished by antenna
// shape and that one type "sucks up nectar" — that's true of the ADULT moths/butterflies, not the
// caterpillar stage, which in both cases eats plant material).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'biology',
  keywords,
  content,
  createdAt: now,
});

export const ANIMAL_IDENTIFICATION_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-animal-crow-vs-magpie',
    'Crow vs magpie',
    ['crow', 'magpie', 'difference crow magpie'],
    "A crow is entirely glossy black all over — beak, feathers, legs — with a fan-shaped tail, and is known for its harsh 'caw' call and notable intelligence (tool use, remembering faces, planning ahead). A magpie has a much more striking black-and-white (often iridescent blue/green sheen) plumage pattern, and a distinctively long, elegant tail that's typically longer relative to its body than a crow's — magpies are also highly intelligent corvids, but are visually easy to tell apart from crows because of that bold black-and-white coloring and much longer tail, versus a crow's uniform black appearance.",
  ),
  k(
    'kb-gap-animal-chimp-vs-gorilla',
    'Chimpanzee vs gorilla',
    ['chimpanzee', 'gorilla', 'difference chimpanzee gorilla'],
    "Chimpanzees are smaller (typically 90-130 lbs), more energetic and agile, live in larger, more complex, often more aggressive social groups, are omnivorous (eating fruit, leaves, insects, and occasionally hunting small animals like monkeys), and are humans' closest living genetic relatives (sharing roughly 98-99% of our DNA). Gorillas are much larger and more physically powerful (adult male silverbacks can weigh 300-400+ lbs), are almost entirely herbivorous (eating mostly leaves, stems, and fruit), live in smaller, calmer family groups led by a dominant silverback male, and are generally more gentle and less aggressive than chimpanzees despite their much larger size. The key differences: gorillas are far larger and more herbivorous with calmer social structures, while chimpanzees are smaller, more omnivorous, and live in larger, more dynamic and sometimes more aggressive social groups.",
  ),
  k(
    'kb-gap-animal-moth-vs-butterfly-caterpillar-correction',
    'Moth caterpillar vs butterfly caterpillar',
    ['moth caterpillar', 'butterfly caterpillar', 'difference moth butterfly caterpillar'],
    "Correcting an error: BOTH moth caterpillars and butterfly caterpillars eat plant material (leaves, stems) — caterpillars of either type do not drink nectar; that's something only the ADULT (fully metamorphosed) moth or butterfly does. The antenna-shape distinction (feathery/comb-like for moths, thin with a clubbed tip for butterflies) also applies to the ADULT insect, not the caterpillar stage — caterpillars of both moths and butterflies look broadly similar (segmented, soft-bodied larvae) and aren't reliably told apart by antennae. More reliable ways to distinguish them at the caterpillar stage: moth caterpillars are often hairier/fuzzier and tend to build cocoons wrapped in silk for pupation, while butterfly caterpillars are typically smoother-skinned and form a hardened chrysalis without a silk wrapping. The clear, easy-to-see differences (antenna shape, day vs night activity, wings held flat vs upright at rest) only become visible once they've transformed into adults.",
  ),
  k(
    'kb-gap-animal-slug-vs-snail-correction',
    'Slug vs snail (mollusks, not train parts)',
    ['slug', 'snail', 'difference slug snail', 'slug locomotive'],
    "A snail is a gastropod mollusk with a visible, coiled external shell that it can retreat into for protection — found on land, in freshwater, and in the ocean. A slug is essentially the same type of gastropod mollusk, but without a full external shell (some slugs have a small internal shell remnant, but nothing like a snail's protective coiled shell) — this makes slugs more vulnerable to drying out and predators, but also lets them squeeze into tighter spaces than a shelled snail could. In short: a slug and a snail are closely related mollusks, and the main visible difference is simply the presence (snail) or absence (slug) of an external protective shell. Note: this is unrelated to 'slug' as a railroading term (a type of unpowered locomotive that draws power from a companion locomotive) — that's a completely different, unrelated meaning of the word.",
  ),
  k(
    'kb-gap-animal-jellyfish-vs-manowar',
    'Jellyfish vs Portuguese man o\' war',
    ['jellyfish', 'portuguese man o war', 'difference jellyfish man o war'],
    "A true jellyfish is a single organism — one animal with a bell-shaped body and trailing tentacles, all part of one connected creature. A Portuguese man o' war LOOKS like a jellyfish but is actually NOT a true jellyfish at all — it's a siphonophore, a colonial organism made up of many small, specialized individual organisms called zooids, each performing a different function (one forms the gas-filled float, others form the stinging tentacles, others handle digestion or reproduction), all working together as if they were a single animal. The key difference: a jellyfish is one single organism, while a Portuguese man o' war is actually a colony of many genetically identical but functionally specialized organisms living and working together — despite looking similar and both delivering painful stings, they're taxonomically quite different.",
  ),
  k(
    'kb-gap-animal-penguin-vs-puffin',
    'Penguin vs puffin',
    ['penguin', 'puffin', 'difference penguin puffin'],
    "Penguins are completely flightless birds — their wings have evolved into rigid flippers purely for swimming, and they can't fly at all; they're found almost exclusively in the Southern Hemisphere (Antarctica and nearby regions), can be quite large (emperor penguins stand about 4 feet tall), and are built for deep, long dives (some species can dive 500+ meters). Puffins CAN fly (their wings work for both flying and swimming, though a bit clumsily for both), are much smaller than most penguins, live in the Northern Hemisphere (North Atlantic and Arctic regions), and are actually more closely related to gulls and auks than to penguins at all — despite superficially similar black-and-white coloring, penguins and puffins are in completely different bird families that evolved similar looks independently. The single biggest difference: penguins cannot fly at all, while puffins can.",
  ),
  k(
    'kb-gap-animal-ostrich-vs-emu',
    'Ostrich vs emu',
    ['ostrich', 'emu', 'difference ostrich emu'],
    "An ostrich is the larger of the two — the largest living bird species, native to the African savanna, capable of running up to about 45 mph, with two toes on each foot and a longer neck. An emu is native to Australia, somewhat smaller than an ostrich (though still a large flightless bird), has three toes on each foot instead of two, and tends to have shaggier, more grass-like feathers compared to an ostrich's smoother plumage. Both are large flightless birds (ratites) that are actually only distantly related despite looking broadly similar — the clearest differences are their native continent (Africa for ostriches, Australia for emus), overall size (ostriches are bigger), and toe count (two for ostriches, three for emus).",
  ),
  k(
    'kb-gap-animal-bison-vs-buffalo',
    'Bison vs buffalo',
    ['bison', 'buffalo', 'difference bison buffalo'],
    "A bison is a large, shaggy-coated bovine native to North America (the American bison, often informally called a 'buffalo,' and a similar species in Europe) — bison have a large muscular hump over their shoulders, a huge shaggy head/mane, and shorter, curved horns. A true buffalo refers to different species entirely — the water buffalo (native to South Asia) and the African (Cape) buffalo — which are native to Asia and Africa respectively, generally lack the large shoulder hump, and have longer, more prominent horns (African buffalo horns can form a distinctive fused 'boss' across the forehead). The key point: 'buffalo' is commonly used in North America as an informal, technically incorrect nickname for bison, but true buffalo (water buffalo and African buffalo) are actually different species native to different continents, with a different body shape (no large shoulder hump) and different horn styles.",
  ),
  k(
    'kb-gap-animal-antelope-vs-gazelle',
    'Antelope vs gazelle',
    ['antelope', 'gazelle', 'difference antelope gazelle'],
    "Antelope is a broad, general category covering many different species of hoofed, horned grazing mammals in the family Bovidae — including wildebeest, kudu, eland, oryx, impala, and many others, ranging widely in size from quite small to very large. A gazelle is one SPECIFIC type of antelope, in the genus Gazella (and a few closely related genera) — gazelles are generally smaller, slender, and built for speed and agility, known for their graceful leaping (called 'stotting' or 'pronking') as an escape/signaling behavior when threatened by predators. In short: every gazelle is an antelope, but not every antelope is a gazelle — 'antelope' is the broad family-level category, while 'gazelle' refers to a specific, smaller, faster-built group of antelope species.",
  ),
];
