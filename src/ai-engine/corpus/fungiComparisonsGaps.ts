import { KnowledgeItem } from '../../types';

// Batch 297 corpus fixes — fungi/mycology "what's the difference between X and Y" topics.
// Rough domain, 14/25 misses: one severe wrong-domain hallucination (rot/decay answered with
// "brain rot" internet slang and radioactive decay physics instead of biological rot), two
// severe Wikipedia-dump dodges (puffball, mycology/botany), a factual error (athlete's foot
// blamed on Candida albicans — that's thrush, athlete's foot is dermatophytes), and several
// answers that only explained one side of the comparison or got cut off before finishing.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'science',
  keywords,
  content,
  createdAt: now,
});

export const FUNGI_COMPARISONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-fungicmp-mushroom-vs-toadstool',
    'Mushroom vs toadstool',
    ['mushroom', 'toadstool', 'difference mushroom toadstool'],
    "There's no actual scientific or taxonomic line between a 'mushroom' and a 'toadstool' — both words describe the exact same thing: the visible fruiting body of a fungus popping up from the mycelium underground. 'Toadstool' is just an old folk term that, in everyday casual use, tends to imply the fungus is inedible or poisonous, or just has a more classic rounded/colorful storybook look, while 'mushroom' tends to get used for ones assumed safe to eat or with the familiar cap-and-stem umbrella shape. Mycologists don't recognize 'toadstool' as a real category at all — the exact same species can get called either name depending on region, folklore, or just how ominous it looks, and there's no lab test or feature that sorts fungi into one bucket or the other. The key difference: there isn't a scientific one — 'toadstool' is just a folk/colloquial term usually implying a mushroom is poisonous or not meant to be eaten, not an actual taxonomic category.",
  ),
  k(
    'kb-gap-fungicmp-mold-vs-mildew',
    'Mold vs mildew',
    ['mold', 'mould', 'mildew', 'difference mold mildew'],
    "Mildew is a specific, surface-level fungal growth — typically flat, thin, and powdery or fuzzy in a gray, white, or yellowish coating, classically seen as 'powdery mildew' or 'downy mildew' on plant leaves, or as a musty surface film on damp fabric, shower grout, or paper. Mold is the broader, more general term for fungal growth that's usually thicker and fuzzier in texture, comes in way more colors (black, green, blue, orange), and — unlike most mildew, which just sits on the surface — mold can actually penetrate down INTO whatever it's growing on (bread, wood, drywall), sending hyphae deep into the material rather than staying superficial. That's also why mildew is usually easy to wipe or scrub off, while mold often needs the whole contaminated material removed or professionally remediated because you can't scrub out what's growing inside it. The key difference: mildew is a flat, powdery, surface-only fungal growth (classically on plants or fabric), while mold is a broader category of fungal growth that's usually fuzzier, more colorful, and can penetrate down into the material it's growing on rather than just sitting on top.",
  ),
  k(
    'kb-gap-fungicmp-edible-vs-poisonous-mushroom',
    'Edible mushroom vs poisonous mushroom',
    ['edible mushroom', 'poisonous mushroom', 'toxic mushroom', 'difference edible poisonous mushroom'],
    "An edible mushroom simply lacks meaningful toxic compounds, so its flesh can be safely digested (usually after cooking) without harming the body. A poisonous mushroom contains actual toxins — things like amatoxins in the death cap, muscarine in some Inocybe species, or psilocybin/other compounds in others — that damage organs (the liver especially, with the worst species), cause severe gastrointestinal illness, or in serious cases kill. Crucially, there is NO simple visual or folk rule that reliably tells them apart — myths like 'shiny caps are safe' or 'a silver spoon turns black near poison' are false and have gotten people killed. Safe identification requires precise species-level ID: cap shape, gill attachment and color, spore print color, stem features, and habitat, because deadly poisonous species (like the death cap) can closely resemble edible lookalikes. The key difference: edible and poisonous mushrooms differ in toxin content, not appearance — telling them apart safely requires exact species identification, not a quick visual test.",
  ),
  k(
    'kb-gap-fungicmp-truffle-vs-mushroom',
    'Truffle vs mushroom',
    ['truffle', 'mushroom', 'difference truffle mushroom'],
    "A regular mushroom is the fruiting body of a fungus that grows ABOVE ground, with a visible cap, stem, and gills (or pores) on the underside that release spores directly into the open air, where wind or brushing animals help disperse them. A truffle is also a fungal fruiting body, but it develops entirely UNDERGROUND (a trait called 'hypogeous') as a solid, lumpy, potato-shaped mass with no cap, no stem, and no gills at all — because it can't release spores into open air like a mushroom can, it instead relies on a powerful, pungent aroma to attract animals (wild pigs, dogs trained for foraging, small mammals) to dig it up, eat it, and spread its spores through their droppings elsewhere. Truffles also form a very specific underground symbiotic relationship with the roots of certain trees (like oak or hazelnut), and that scarcity plus difficulty of cultivation is why they're so expensive. The key difference: mushrooms fruit above ground with an exposed cap/stem/gill structure that releases spores into the air, while truffles fruit entirely underground with no cap or stem, relying on scent and animals rather than air to spread their spores.",
  ),
  k(
    'kb-gap-fungicmp-fermentation-vs-decomposition',
    'Fermentation vs decomposition',
    ['fermentation', 'decomposition', 'difference fermentation decomposition'],
    "Fermentation is a specific, usually controlled anaerobic metabolic process, mainly driven by yeast or particular bacteria, that converts sugars into alcohol, acids, or gases — it's the process deliberately harnessed by humans to make bread rise, beer and wine ferment, or yogurt and kimchi sour, and it doesn't fully break the material down, just chemically transforms specific compounds within it. Decomposition is the much broader, general natural process by which ANY dead organic matter — plants, animals, food waste — gets progressively broken down into simpler substances (water, carbon dioxide, minerals) by a wide range of decomposers working together: fungi, bacteria, insects, and worms. It isn't a single controlled reaction, it's the whole ongoing breakdown that continues until the original material is essentially gone, recycling nutrients back into the ecosystem. Fermentation can actually be thought of as one narrow, specific type of anaerobic metabolic reaction that sometimes happens during decomposition, not something separate from it. The key difference: fermentation is a specific, often human-harnessed conversion of sugars by yeast/bacteria into alcohol, acids, or gas, while decomposition is the broad, general breakdown of organic matter into simpler substances by many different organisms working together.",
  ),
  k(
    'kb-gap-fungicmp-rot-vs-decay',
    'Rot vs decay',
    ['rot', 'decay', 'difference rot decay'],
    "Decay is the broad, general term for anything gradually breaking down or deteriorating over time — it applies well beyond biology (radioactive decay of atoms, tooth decay, a building falling into decay), and biologically it just means organic matter progressively losing its structure and being broken down. Rot specifically refers to the biological decomposition of dead plant or animal matter caused by fungi and bacteria feeding on it, typically producing a soft, wet, often foul-smelling breakdown — think a rotting log, rotting fruit, or rotting meat. So rot is really a specific SUBTYPE of decay: the wet, microbe-driven decomposition of dead organic material, while decay is the umbrella term that covers that and plenty of non-biological deterioration too. The key difference: decay is the general term for any gradual deterioration, biological or not (radioactive atoms, teeth, buildings), while rot specifically means the wet, foul, microorganism-driven decomposition of dead plant or animal matter.",
  ),
  k(
    'kb-gap-fungicmp-saprophyte-vs-parasite',
    'Saprophyte vs parasite',
    ['saprophyte', 'saprotroph', 'parasite', 'difference saprophyte parasite'],
    "A saprophyte (also called a saprotroph) feeds on already-dead or decaying organic matter — fallen logs, leaf litter, dead animals, rotting food — and in doing so harms no living organism at all, since its food source is already dead; saprophytes (many fungi and bacteria) actually play a vital recycling role, breaking dead material down and returning nutrients to the ecosystem. A parasite instead feeds on a LIVING host, extracting nutrients directly from that living organism while it's still alive, which usually weakens, sickens, or otherwise harms the host, and a parasite typically needs its host to survive for at least some period to keep feeding off it. The key difference: a saprophyte feeds on dead organic matter and harms nothing living, while a parasite feeds on a living host and typically harms it in the process.",
  ),
  k(
    'kb-gap-fungicmp-puffball-vs-mushroom',
    'Puffball vs regular mushroom',
    ['puffball', 'mushroom', 'difference puffball mushroom'],
    "A regular gilled mushroom has a clearly differentiated cap and stem, with thin blade-like gills on the underside of the cap that release spores directly into the air as the mushroom matures. A puffball has none of that structure — it's a round or pear-shaped fungus with no cap, no gills, and usually no true stem (at most a stubby base), and it develops its spores entirely INSIDE its body rather than on an external surface. As a puffball matures and dries out, the outer skin either ruptures or opens a small pore at the top, and a visible cloud of fine, dust-like spores puffs out whenever the fungus is disturbed — a raindrop landing on it, a footstep, or an animal brushing past. The key difference: a regular mushroom has an external cap-stem-gill structure that releases spores from the underside as it grows, while a puffball has no gills or true cap at all, developing its spores internally and releasing them in a dusty burst through a rupture or pore once mature.",
  ),
  k(
    'kb-gap-fungicmp-bakers-vs-brewers-yeast',
    "Baker's yeast vs brewer's yeast",
    ["baker's yeast", "brewer's yeast", 'difference baker yeast brewer yeast'],
    "Baker's yeast and brewer's yeast are usually both the same species, Saccharomyces cerevisiae, just different strains bred and selected for different jobs — they're not wild multi-organism cultures (that's more what a sourdough starter or a kombucha SCOBY is). Baker's yeast strains are selected to produce carbon dioxide gas fast and reliably, because that CO2 is what makes bread dough rise — flavor complexity isn't really the priority, and it's sold as a single, fast-acting, mild-tasting strain (fresh, active dry, or instant). Brewer's yeast strains are instead selected for efficiently converting sugars into alcohol and for the flavor byproducts (esters, phenols) they produce during fermentation, with different specific strains chosen depending on whether you're brewing an ale or a lager. The key difference: both are typically the same species (S. cerevisiae) but different strains — baker's yeast is bred for fast, strong CO2 production to leaven bread, while brewer's yeast is bred for efficient alcohol production and richer fermentation flavor in beer or wine.",
  ),
  k(
    'kb-gap-fungicmp-mold-bread-vs-cheese',
    'Mold on bread vs mold on cheese',
    ['mold on bread', 'mold on cheese', 'difference mold bread cheese'],
    "Mold on bread should basically always be treated as unsafe, and the whole loaf thrown out — bread is soft and porous, so the mold spot you can actually see is only the visible tip of a much larger network of hyphae that's likely already spread invisibly through the rest of the loaf, and some bread molds produce dangerous mycotoxins you don't want to risk. Mold on cheese is a different story, especially with hard, dense, low-moisture cheeses like cheddar or parmesan — surface mold there can often be safely cut away with a decent margin around it, because the dense cheese slows how far the hyphae actually penetrate. Even more importantly, some cheeses are DELIBERATELY inoculated with specific edible mold cultures as part of how they're made — blue cheese uses Penicillium roqueforti, brie and camembert use Penicillium camemberti — completely unlike the unwanted mold on bread. Soft cheeses with accidental, unintended mold growth, though, should still be discarded like bread. The key difference: mold on bread means the whole loaf should be tossed because of invisible internal spread, while mold on hard cheese can often be cut away safely, and some cheese mold is actually an intentional edible ingredient — a distinction that just doesn't exist for bread.",
  ),
  k(
    'kb-gap-fungicmp-athletes-foot-vs-rash',
    "Athlete's foot vs regular rash",
    ["athlete's foot", 'rash', 'difference athletes foot rash'],
    "Athlete's foot (tinea pedis) is specifically a fungal infection caused by dermatophyte fungi (species like Trichophyton) — NOT Candida albicans, which is a different fungus that causes thrush/candidiasis elsewhere on the body. Dermatophytes thrive in warm, damp environments like sweaty socks, shoes, and locker room floors, and athlete's foot typically shows up as itching, peeling, cracking, or scaling skin, especially between the toes. A 'regular rash' is a much broader, non-specific term that can come from all sorts of non-fungal causes — irritation, allergic contact dermatitis, heat rash, eczema, insect bites, or a viral or bacterial cause — and isn't necessarily linked to fungus, moisture, or feet at all. Because athlete's foot has one specific fungal cause, it responds to antifungal creams; a generic rash first needs its actual cause figured out, since an antifungal won't do anything for, say, an allergic reaction. The key difference: athlete's foot is a specific fungal infection caused by dermatophytes (not Candida) tied to warm, damp conditions, while 'regular rash' is a broad catch-all term covering many possible non-fungal causes that need different treatment.",
  ),
  k(
    'kb-gap-fungicmp-mycology-vs-botany',
    'Mycology vs botany',
    ['mycology', 'botany', 'difference mycology botany'],
    "Botany is the branch of science that studies plants specifically — their growth, structure, reproduction, classification, and ecology. Mycology is the branch of science that studies fungi — mushrooms, molds, yeasts, and related organisms. Fungi used to be lumped in with plants for a long time, but they're now recognized as their own completely separate biological kingdom, and in several key ways they're actually genetically and biochemically closer to animals than to plants: fungal cell walls are made of chitin (not cellulose like plants), fungi store energy as glycogen (like animals do, not starch like plants), and fungi feed heterotrophically by absorbing nutrients from their surroundings rather than photosynthesizing their own food like plants do. So mycology and botany are two genuinely distinct scientific fields, even though historically mycology grew out of, and still sometimes gets taught inside, botany departments. The key difference: botany studies plants, mycology studies fungi — two separate kingdoms of life, even though fungi were historically (and incorrectly) grouped in with plants.",
  ),
  k(
    'kb-gap-fungicmp-bracket-fungus-vs-gilled-mushroom',
    'Bracket fungus vs gilled mushroom',
    ['bracket fungus', 'shelf fungus', 'polypore', 'gilled mushroom', 'difference bracket fungus gilled mushroom'],
    "A gilled mushroom has the classic upright cap-and-stem shape, growing out of soil or wood, with thin blade-like gills on the underside of the cap that release spores. A bracket fungus (also called a shelf fungus, and often a polypore) instead grows directly out of the side of a living or dead tree trunk in a flat, shelf-like or hoof-like shape, usually with NO real stem at all (or just a short stubby lateral one) — and instead of gills, most bracket fungi release their spores through tiny pores on the underside rather than gill blades, which is exactly where the name 'polypore' comes from. Bracket fungi also tend to be much tougher and woodier than the soft, short-lived flesh of most gilled mushrooms, and many are perennial, surviving for years and adding a new growth layer each season rather than fruiting once and rotting away. The key difference: a gilled mushroom has an upright cap-and-stem shape releasing spores from gills, while a bracket fungus grows flat and shelf-like directly out of wood, is usually stemless, releases spores through pores instead of gills, and can be tough enough to live for years.",
  ),
  k(
    'kb-gap-fungicmp-morel-vs-false-morel',
    'Morel vs false morel',
    ['morel', 'false morel', 'difference morel false morel'],
    "A true morel has a cap covered in an even, honeycomb-like pattern of pits and ridges, and when you slice it open lengthwise from cap to stem base, it's completely HOLLOW all the way through, with the cap fully and directly attached to the stem at its bottom rim. A false morel (species in the Gyromitra genus, among others) instead has a cap that looks more like an irregular, wrinkled, folded, or brain-like blob rather than an even honeycomb, and when sliced open it is NOT cleanly hollow — the inside is filled with cottony fibers or irregular chambers — and the cap typically hangs loosely over the stem, attached only near the top rather than fully down its length. False morels are also seriously toxic: some contain a compound called gyromitrin that converts in the body into a toxin chemically related to rocket fuel, and eating them raw or improperly prepared can be fatal, unlike true morels, which are a prized, safe edible when cooked. The key difference: a true morel has an even honeycomb cap that's fully hollow inside and fully attached to the stem, while a false morel has an irregular wrinkled/brain-like cap that isn't cleanly hollow and attaches only near the top — and false morels can be seriously toxic.",
  ),
];
