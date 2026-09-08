import { KnowledgeItem } from '../../types';

// Batch 117 (herpetology — reptiles & amphibians). Very weak area. Errors and
// web dumps on nexus-4b: "how does a snake shed its skin" confused shedding
// with brumation and said it sheds "every four weeks thanks to melanin";
// "frog vs toad" said toads "don't need water when little" (both have aquatic
// tadpoles); "how do frogs survive being frozen" said "frogs don't actually
// freeze" (wood frogs freeze ~65% solid); "python vs boa" returned "[NO]";
// "largest and smallest reptile and amphibian" returned the heights of Everest
// and K2; "how do geckos stick to walls" and "ectothermic" were web dumps.
export const HERPETOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-snake-shedding',
    title: 'How and Why a Snake Sheds Its Skin',
    category: 'Herpetology',
    keywords: [
      'how does a snake shed its skin and why', 'snakes shed their entire outer skin layer in one piece ecdysis several times a year more often when young and growing',
      'before a shed a new skin forms underneath and fluid separates old from new eyes turn milky blue colours dull in the blue', 'the snake rubs its nose to split the old skin at the lips and crawls out turning it inside out like a sock the discarded skin is a slough',
      'shedding replaces worn skin and removes parasites it is not brumation which is winter dormancy',
    ],
    content: `A snake sheds ("moults" or, technically, undergoes "ecdysis") by removing its entire outer skin layer in a single piece, several times a year — more often in fast-growing young snakes (every few weeks) and less often in old adults. In the run-up to a shed, a fresh layer of skin grows beneath the old one, and a thin layer of fluid forms between the two; this makes the snake's normally clear eye caps turn milky bluish-grey and its body colours go dull and cloudy — a snake in this state is said to be "in the blue" or "opaque," is nearly blind, and tends to hide and refuse food. When the new skin is ready and the fluid reabsorbs, the snake rubs its snout against a rock or branch to tear the old skin at the lips, then crawls forward out of it, effectively peeling it off inside-out like pulling off a sock. The cast-off skin, called a "slough," comes off in one connected tube (including the eye caps) and is usually longer than the snake because it stretches. Shedding replaces worn, damaged skin, removes external parasites like mites, and accommodates growth. (This is unrelated to "brumation," which is a reptile's winter dormancy.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-frog-vs-toad',
    title: 'Frog vs Toad',
    category: 'Herpetology',
    keywords: [
      'what is the difference between a frog and a toad', 'all toads are frogs toad is an informal name for chunkier drier skinned frogs especially the family bufonidae not a taxonomic split',
      'toads warty thick dry skin shorter legs walk or hop parotoid glands behind the eyes that secrete toxins can live farther from water', 'frogs smooth moist skin long legs for leaping stay near water',
      'both frogs and toads lay eggs in water and have aquatic tadpoles with gills', 'toads do not skip the tadpole stage',
    ],
    content: `Biologically there is no clean line: "toad" is an informal, mostly English-language name for frogs that are chunkier, shorter-legged, and drier-skinned, and it does not correspond to a single branch of the amphibian family tree (though the "true toads," family Bufonidae, are the animals the word fits best). Both frogs and toads are members of the order Anura, both lay jelly eggs in water, and both go through an aquatic tadpole stage with gills — toads do NOT skip that and are not born on land. The rough distinguishing features: toads have dry, thick, warty skin, squat bodies, and short legs so they walk or make short hops rather than leaping; they have prominent "parotoid" glands behind the eyes that ooze a bitter, mildly toxic secretion when a predator bites; and as adults they can live in drier habitats farther from water. Frogs have smooth, moist skin, slim bodies, long powerful hind legs for jumping and swimming, often webbed feet, and stay in or near water.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-frogs-survive-freezing',
    title: 'How Frogs Survive Being Frozen in Winter',
    category: 'Herpetology',
    keywords: [
      'how do frogs survive being frozen in winter', 'wood frogs and some treefrogs are freeze tolerant up to 65 to 70 percent of their body water turns to ice the heart stops breathing stops they appear dead for weeks then thaw and hop away',
      'they flood their cells with cryoprotectants glucose and urea that stop the cells themselves freezing and dehydrating fatally and control ice to form only in the body cavity and under the skin not inside cells',
      'aquatic frogs bullfrogs leopard frogs instead avoid freezing by overwintering underwater below the ice at about 4 celsius absorbing oxygen through the skin',
    ],
    content: `Different frogs use opposite strategies. The wood frog (and spring peepers, chorus frogs, and gray treefrogs) is genuinely FREEZE-TOLERANT: as the ground freezes, ice spreads through the frog until 65-70% of its total body water is frozen solid, its heart stops beating, it stops breathing, and it lies rigid and apparently dead for days to weeks. It survives because, at the first touch of ice on its skin, its liver dumps huge amounts of glucose (and it also carries high urea) into the blood; these "cryoprotectants" flood into the cells and lower their freezing point and hold water in, so the cells themselves never freeze or dehydrate to death — the ice is confined to the body cavity, the bladder, and the spaces under the skin. When spring warms it, it thaws from the inside out, the heart restarts, and the frog hops away. AQUATIC frogs like bullfrogs and leopard frogs instead avoid freezing altogether: they spend winter at the bottom of a pond, resting on (not buried in) the mud below the ice where the water stays around 4°C, absorbing the dissolved oxygen they need directly through their skin.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-python-vs-boa-constrictors',
    title: 'Python vs Boa, and How Constrictors Kill',
    category: 'Herpetology',
    keywords: [
      'what is the difference between a python and a boa and how do constrictors kill', 'pythons and boas both non-venomous constrictors both keep vestigial hind limb spurs',
      'pythons old world africa asia australia lay eggs the female coils around and shivers to incubate boas mostly new world americas give live birth', 'constriction the snake seizes prey with its teeth throws coils and tightens each time the prey exhales',
      'death is faster than suffocation the pressure cuts off blood flow causing cardiac arrest and unconsciousness within about a minute circulatory arrest not crushing constrictors do not break bones then swallowed whole head first',
    ],
    content: `Pythons and boas are the two big families of non-venomous constricting snakes, and both are "primitive" enough to retain tiny vestigial hind-limb bones ending in visible claw-like "spurs" beside the vent. The clearest difference is reproduction: pythons (native to the Old World — Africa, Asia, Australia) lay eggs, and the female coils around the clutch and rhythmically contracts her muscles to "shiver" and keep them warm; boas (mostly New World — Central and South America, with a few elsewhere) give birth to live young. HOW CONSTRICTION KILLS: the snake first bites and holds the prey with its backward-curving teeth, then throws one or more coils of its body around it. It doesn't crush — it squeezes, and crucially it tightens a little more every time the prey breathes out, so the animal cannot re-expand its chest to inhale. But careful studies show the prey dies faster than suffocation alone would take: the constriction pressure also stops blood circulation, spiking blood pressure, cutting off flow to the brain and heart, and causing cardiac arrest and unconsciousness within about a minute. The snake senses the heartbeat stop, releases, and swallows the prey whole, usually head-first, its jaws walking over the carcass.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-largest-smallest-reptiles-amphibians',
    title: 'The Largest and Smallest Reptiles and Amphibians',
    category: 'Herpetology',
    keywords: [
      'what is the largest and smallest reptile and amphibian', 'largest reptile saltwater crocodile up to 6 to 7 metres over 1000 kg longest snake reticulated python heaviest snake green anaconda largest lizard komodo dragon largest turtle leatherback sea turtle',
      'smallest reptile brookesia nana a madagascar chameleon about 13 to 29 mm tiny sphaerodactylus geckos similar', 'largest amphibian chinese giant salamander up to about 1.8 metres',
      'smallest amphibian and smallest vertebrate paedophryne amauensis a new guinea frog about 7.7 mm',
    ],
    content: `REPTILES: the largest living reptile is the saltwater crocodile, with big males reaching 6-7 metres and over a tonne. The longest snake is the reticulated python (commonly 6-7 m, occasionally longer); the heaviest is the green anaconda (usually ~5 m but far bulkier, exceeding 100 kg and reported over 200). The largest lizard is the Komodo dragon (up to ~3 m and 70-90 kg). The largest turtle is the leatherback sea turtle (shell ~1.8 m, up to ~700 kg). The smallest reptile known is Brookesia nana, a leaf chameleon from Madagascar described in 2021, whose adult males are about 13.5 mm snout-to-vent (around 22 mm total); some dwarf geckos of the genus Sphaerodactylus are similarly tiny. AMPHIBIANS: the largest is the Chinese giant salamander, historically recorded to around 1.8 m (most now are far smaller due to overharvesting). The smallest amphibian — and, when it was described in 2012, the smallest known vertebrate of any kind — is Paedophryne amauensis, a frog from Papua New Guinea averaging 7.7 mm, small enough to sit on a fingernail. (This has nothing to do with the heights of Mount Everest or K2.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gecko-adhesion',
    title: 'How Geckos Stick to Walls and Ceilings',
    category: 'Herpetology',
    keywords: [
      'how do geckos stick to walls and ceilings', 'gecko toes covered in millions of microscopic hairs called setae each splitting into hundreds of tinier spatula shaped tips',
      'adhesion is van der waals forces the weak electrical attraction between molecules at extremely close range summed over the enormous contact area of billions of spatulae', 'a dry adhesive no glue no suction works in a vacuum and underwater self cleaning',
      'the gecko engages and releases it by changing the angle of its toes peeling inspired synthetic gecko tape dry adhesives',
    ],
    content: `A gecko's grip is not glue, suction, or static electricity — it is van der Waals force, the extremely weak attraction that exists between any two molecules when they are brought within about a nanometre of each other. The trick is contact area. The underside of each gecko toe is covered with hundreds of thousands of microscopic hair-like bristles called setae, and the tip of each seta frays into hundreds of even smaller spatula-shaped pads. A single spatula's attraction is trivial, but a gecko foot has roughly a billion of them, and when they are pressed flat against a surface the summed force is enormous — enough that a gecko could in principle hang its whole body weight from one toe. Because it relies only on close molecular contact, the adhesive is "dry," works on almost any surface, works in a vacuum and underwater, does not leave residue, and is self-cleaning. The gecko switches it on by rolling its toes down to lay the setae flat, and off by peeling the toes up from the tip (which is why geckos curl their toes upward as they lift a foot), letting it run up glass at speed. It has inspired a generation of synthetic reusable "dry adhesives."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ectothermy',
    title: 'What It Means That Reptiles Are Ectothermic ("Cold-Blooded")',
    category: 'Herpetology',
    keywords: [
      'what does it mean that reptiles are ectothermic or cold blooded', 'ectotherms regulate body temperature mainly by behaviour and environment rather than by generating heat internally basking to warm up seeking shade water or burrows to cool down',
      'cold blooded is misleading a basking lizard can be warmer than a mammal', 'ectotherms need about a tenth of the food an endotherm of the same size needs so they thrive where food is scarce or seasonal',
      'disadvantages sluggish when cold cannot be active at night or in cold climates limited to warmer regions',
    ],
    content: `"Ectothermic" means an animal's body heat comes from outside itself. Rather than burning food to hold a constant internal temperature the way mammals and birds do, a reptile (or amphibian, fish, or insect) manages its temperature by behaviour: basking on a warm rock or in the sun to heat up, moving into shade, water, or a burrow to cool down, flattening or orienting its body to the sun, and changing colour (darker to absorb more heat). "Cold-blooded" is a misleading label — a lizard that has been basking can be warmer than your hand, and its blood is not cold. The huge advantage of ectothermy is energy efficiency: because none of its food budget is spent on internal heating, an ectotherm needs only around a tenth as much food as a warm-blooded animal of the same size, so reptiles flourish in deserts and other places where food is scarce or highly seasonal, and can go weeks or months between meals. The costs are that they become sluggish and cannot digest or move well when it is cold, they generally can't be active on cold nights or in winter, and they are largely shut out of cold climates (very few reptiles live near the poles or high mountains).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-amniotic-egg-detail',
    title: 'The Amniotic Egg and Why It Mattered for Vertebrate Evolution',
    category: 'Herpetology',
    keywords: [
      'what is the amniotic egg and why was it important for reptile evolution', 'the amniotic egg has a shell leathery or calcareous and internal membranes the amnion a fluid sac around the embryo its own private pond the yolk sac food the allantois waste storage and gas exchange the chorion outer membrane gas exchange',
      'lets the embryo develop on dry land without drying out or needing an external water body', 'before it tetrapods amphibians laid unshelled jelly eggs in water not live birth',
      'the key innovation about 340 million years ago that let vertebrates the amniotes reptiles birds mammals fully colonise land amphibians still cannot',
    ],
    content: `The amniotic egg is a self-contained life-support capsule for a developing embryo, and its evolution around 340 million years ago is what freed backboned animals from the water's edge. It has an outer shell — leathery in most reptiles, hard and calcified in birds — that keeps water in and predators and microbes out while still letting oxygen and carbon dioxide pass. Inside are four membranes: the AMNION, a fluid-filled bag directly around the embryo that acts as its own private pond so it can develop in a wet environment on dry land; the YOLK SAC, holding the food supply; the ALLANTOIS, which stores the embryo's nitrogenous waste and, pressed against the shell, handles gas exchange; and the CHORION, the outer membrane lining the shell. Before this, tetrapods (the amphibians) had to lay small, unshelled, jelly-coated eggs in or right next to standing water, where they would otherwise dry out — they did NOT give live birth on land. The amniotic egg let the group called amniotes (reptiles, and their descendants the birds and mammals) breed anywhere and spread into deserts, uplands, and every dry habitat; amphibians, still tied to water for reproduction, never made that leap.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chameleon-color-change',
    title: 'How Chameleons Change Colour',
    category: 'Herpetology',
    keywords: [
      'how do chameleons change color', 'chameleons change colour mainly to signal mood dominance and courtship and to regulate temperature darker to absorb heat camouflage is a secondary function a resting chameleon does match its background',
      'mechanism a lattice of guanine nanocrystals in special skin cells iridophores by actively relaxing or tightening the spacing of the lattice they change which wavelengths it reflects a structural colour change',
      'a second deeper layer of dark and yellow pigment cells provides the base tones not mainly pigment migration',
    ],
    content: `Chameleons change colour for communication and thermoregulation more than for hiding: a chameleon flushes bright and high-contrast when displaying dominance or courting, goes dark and dull when stressed or submissive, and turns dark to soak up warmth on a cool morning. (Camouflage is real but secondary — a calm chameleon does settle into muted tones close to its background.) The mechanism, worked out in 2015, is mostly structural, not pigment-based. Under the skin, chameleons have a layer of special cells called iridophores containing an orderly three-dimensional lattice of guanine nanocrystals. By relaxing or contracting the skin, the animal changes the spacing of that lattice, and that changes which wavelengths of light the lattice reflects — from blues and greens when the crystals are packed tightly to yellows, oranges and reds when spread apart. This "photonic crystal" effect is the same physics that colours a butterfly wing or an opal. Beneath it sits a second, deeper layer of iridophores that reflects near-infrared (helping with heat), and above and below are ordinary pigment cells (dark melanophores and yellow/red xanthophores) that set the baseline tones and can darken the whole animal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-snake-senses',
    title: 'How Snakes Hunt and Sense Their Prey',
    category: 'Herpetology',
    keywords: [
      'how do snakes hunt and sense their prey', 'forked tongue and jacobsons vomeronasal organ the snake flicks its tongue to collect scent particles and delivers them to two openings in the roof of the mouth the fork senses a chemical gradient which side is stronger for directional tracking like stereo smell',
      'most snakes have no external ears and poor airborne hearing but detect ground vibrations through the jawbone', 'good motion vision pit vipers pythons and boas have heat sensing pits infrared',
      'ambush predators strike then track a bitten envenomed animal by scent constrictors seize and coil',
    ],
    content: `Snakes hunt with a set of senses tuned differently from ours. Their most important tool is smell: a snake constantly flicks its forked tongue out to pick up scent molecules from the air and ground, then withdraws it and presses the two tips into a pair of pits in the roof of the mouth connected to the Jacobson's (vomeronasal) organ, which analyses them. The fork matters — by comparing how strong the scent is on the left versus the right tine, the snake gets a direction, effectively smelling in stereo, and can follow a trail. Hearing is limited: snakes have no external ear openings and barely register airborne sound, but they are very sensitive to ground-borne vibrations, which travel through the lower jawbone (resting on the ground) to the inner ear, so an approaching footstep is easily felt. Vision is generally good for detecting movement, poorer for detail; a few burrowing snakes are nearly blind. Pit vipers, and also pythons and boas, add infrared "heat vision" through facial pits. A typical hunting sequence for a venomous snake is to ambush, strike and inject venom, let the prey run off and die, then track it down by scent; constrictors instead grab and hold with the teeth and throw coils immediately.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-snake-venom-types',
    title: 'How Snake Venom Works and Its Main Types',
    category: 'Herpetology',
    keywords: [
      'how does snake venom work and what are the main types', 'venom is modified saliva delivered through hollow or grooved fangs a mix of enzymes and toxins',
      'neurotoxic venom elapids cobras mambas kraits sea snakes taipans blocks nerve to muscle signalling paralysis and respiratory failure', 'hemotoxic hemorrhagic venom many vipers destroys blood cells and vessel walls internal bleeding and clotting disorders',
      'cytotoxic venom spitting cobras puff adders severe local tissue death swelling necrosis myotoxic breaks down muscle', 'antivenom made by immunising horses with small venom doses and harvesting antibodies most venoms are cocktails',
    ],
    content: `Snake venom is highly modified saliva — a complex cocktail of enzymes, peptides, and proteins — injected through fangs that are either hollow (vipers, whose long fangs fold back against the roof of the mouth) or grooved and fixed (elapids, and rear-fanged colubrids). Its jobs are to immobilise prey quickly and to start digesting it from the inside. The main functional categories: NEUROTOXIC venom, characteristic of the elapids (cobras, mambas, kraits, coral snakes, sea snakes, taipans), blocks the chemical signal between nerves and muscles, causing progressive paralysis that reaches the breathing muscles and kills by respiratory arrest — often with little pain or swelling at the bite. HEMOTOXIC / haemorrhagic venom, typical of many vipers and pit vipers, attacks the blood and blood vessels, breaking down vessel walls and either preventing clotting or triggering runaway clotting, so the victim bleeds internally and externally. CYTOTOXIC venom (spitting cobras, puff adders, some vipers) causes severe local swelling and tissue death (necrosis) that can destroy a limb. MYOTOXIC venom (some sea snakes, some rattlesnakes) dissolves skeletal muscle, releasing proteins that damage the kidneys. Most real venoms combine several of these effects. The treatment, antivenom, is made by injecting horses or sheep with small, escalating doses of venom and purifying the antibodies they produce.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lizard-tail-autotomy',
    title: 'Why Lizards Drop Their Tails and How They Regrow Them',
    category: 'Herpetology',
    keywords: [
      'why do lizards drop their tails and can they regrow them', 'caudal autotomy a defence the tail detaches at a preformed fracture plane in the vertebrae when grabbed the muscles clamp the blood vessels shut and the shed tail thrashes for minutes to distract the predator',
      'the lizard regrows a replacement over weeks to months but it is a rod of cartilage not new vertebrae shorter often a different colour and scale pattern and can only be dropped once at that point',
      'autotomy costs the lizard stored fat lowered social status and slower running geckos skinks and many others do it monitor lizards like the komodo dragon do not',
    ],
    content: `Many lizards — including most geckos, skinks, and anoles — can deliberately detach their own tail when a predator grabs it, a defence called caudal autotomy. Special "fracture planes" run through the tail vertebrae and muscles, and when the tail is seized (or sometimes just when the lizard is badly frightened) muscles at one of these planes contract to snap the tail off cleanly and simultaneously clamp the blood vessels shut so there is little bleeding. The severed tail then writhes and flops energetically for several minutes, driven by its own nerves, holding the predator's attention while the lizard runs. The lizard regrows a replacement over the following weeks to months, but it is not a true copy: the regenerated tail is supported by a simple rod of cartilage rather than segmented bone, is usually shorter, often a plainer colour, and has a different scale pattern — and because it has no fracture planes, it cannot be dropped again. Autotomy is costly: the lizard loses fat stored in the tail, often drops in social rank, balances and runs less well until the tail regrows, and may have to spend energy on regeneration instead of growth or reproduction. Not all lizards do it — the large monitor lizards, including the Komodo dragon, keep their tails and use them as whips.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-turtle-vs-tortoise',
    title: 'Turtle vs Tortoise (and Terrapin)',
    category: 'Herpetology',
    keywords: [
      'what is the difference between a turtle and a tortoise', 'tortoises live entirely on land stumpy elephant like feet with claws high domed shells herbivores', 'turtles in the strict sense are aquatic or semi aquatic sea turtles pond turtles flippers or webbed feet flatter streamlined shells',
      'terrapin small freshwater or brackish species', 'in american usage turtle covers all of them all are in the order testudines',
    ],
    content: `All shelled reptiles belong to the order Testudines, and the words "turtle," "tortoise," and "terrapin" divide them up informally, mostly by lifestyle. A TORTOISE lives entirely on land: it has stumpy, column-like hind legs and elephantine feet with blunt claws for walking (not swimming), a heavy high-domed shell, and it is almost always a plant-eater. Examples: the Galápagos and Aldabra giant tortoises, the desert tortoise, the leopard tortoise. A TURTLE, in the strict British sense, is aquatic or semi-aquatic — the sea turtles with flipper-shaped limbs and flat, hydrodynamic shells, and the freshwater pond and river turtles with webbed feet. A TERRAPIN is a small turtle of fresh or brackish water, such as the diamondback terrapin of North American salt marshes. In North American usage the situation is simpler: "turtle" is the general word for all of them, "tortoise" is reserved for the land species, and "terrapin" is rarely used. (It is not the case that turtles are land animals and tortoises just have "tougher shells.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-caecilian',
    title: 'What a Caecilian Is',
    category: 'Herpetology',
    keywords: [
      'what is a caecilian', 'caecilians the third least known order of amphibians gymnophiona limbless mostly burrowing a few aquatic', 'range from a few centimetres to about 1.5 metres ringed body annuli look like large earthworms tiny or skin covered eyes',
      'a unique pair of chemosensory tentacles between eye and nostril carnivores worms insect larvae', 'some give live birth and the young scrape a nutrient rich outer layer off the mothers skin dermatophagy at least one species is venomous',
      'found throughout the wet tropics central and south america africa south and southeast asia not just south america',
    ],
    content: `Caecilians make up the third and least familiar order of living amphibians (Gymnophiona), alongside the frogs and the salamanders. They are legless, and most are dedicated burrowers with a compact skull used to push through soil (a few species are aquatic). They range from about 10 cm to nearly 1.5 m long, and their bodies are marked by rings of grooves ("annuli") that, combined with the lack of limbs and their slick skin, make them look strikingly like giant earthworms. Their eyes are tiny and sometimes completely covered by skin or bone, so they rely on smell and touch — including a feature unique in the animal kingdom, a small retractable chemosensory tentacle on each side of the head between the eye and the nostril. They are carnivores, eating earthworms, termites, and insect larvae. Reproduction varies widely: some lay eggs, many give live birth, and in several egg-laying species the hatchlings feed for weeks by scraping off and eating a specially thickened, fat-rich outer layer of their mother's skin ("dermatophagy"). At least one caecilian has recently been shown to have venom glands at the base of its teeth. Caecilians live throughout the wet tropics of the Americas, Africa, and southern and Southeast Asia — not only South America.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-amphibian-decline-chytrid',
    title: 'Why Amphibian Populations Are Declining Worldwide',
    category: 'Herpetology',
    keywords: [
      'why are amphibian populations declining worldwide', 'chytrid fungus batrachochytrium dendrobatidis bd a skin fungus spread worldwide partly by trade disrupts the skins ability to regulate electrolytes causing cardiac arrest',
      'bd has driven about 90 amphibian species to extinction and declined hundreds more the worst wildlife disease ever recorded', 'plus habitat loss pesticides and pollution absorbed through permeable skin uv-b invasive predators bullfrogs and fish over collection climate change',
      'about 41 percent of amphibian species are threatened the highest of any vertebrate class',
    ],
    content: `Amphibians are declining faster than any other vertebrate group — roughly 41% of species are now threatened with extinction. Habitat loss, drainage of wetlands, and drought driven by climate change are the broad background causes, worsened by the fact that amphibians' thin, permeable skin readily absorbs pesticides, fertilisers, road salt, and other pollutants from the water and soil, and by increased UV-B radiation damaging eggs, and by introduced predators like American bullfrogs and stocked fish that eat native tadpoles. But the single most devastating driver is a disease: chytridiomycosis, caused by the fungus Batrachochytrium dendrobatidis ("Bd"). It infects the keratin in amphibian skin and destroys the skin's ability to take up water and regulate electrolytes like sodium and potassium, which throws off the heart's rhythm and causes cardiac arrest. Spread around the world since the late 20th century, partly through the trade in amphibians for pets, food, and lab use, Bd has been implicated in the decline of over 500 species and the extinction of around 90 — described by researchers as the worst disease ever recorded in wild vertebrates. A related fungus, Bsal, now threatens salamanders.`,
    createdAt: Date.now(),
  },
];
