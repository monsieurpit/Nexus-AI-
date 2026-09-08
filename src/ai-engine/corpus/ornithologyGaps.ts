import { KnowledgeItem } from '../../types';

// Batch 115 (ornithology) — rich weak area. Errors and web dumps on nexus-4b:
// "how birds breathe vs mammals" said air sacs are a mammal feature (they are
// a bird feature); "molting" said birds molt "to grow larger, like lobsters";
// "how do owls fly silently" answered only about hearing and never mentioned
// the feather adaptations; "how do woodpeckers avoid brain damage" gave a flat
// non-answer; "raptor vs passerine", "murmuration", "why are bird bones
// hollow" were raw web dumps; "standing on ice" invented a "claws conduct heat
// away like a heat shield" mechanism.
export const ORNITHOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-bird-breathing',
    title: 'How Birds Breathe (Differently from Mammals)',
    category: 'Ornithology',
    keywords: [
      'how do birds breathe differently from mammals', 'birds have air sacs not part of gas exchange that act as bellows pushing air through rigid non-expanding lungs in one direction unidirectional flow over two breath cycles',
      'fresh oxygen rich air flows across the gas exchange surfaces continuously even during exhalation far more efficient than the mammalian tidal in and out partially stale lung', 'this is why birds can fly over everest',
      'parabronchi instead of alveoli air capillaries crosscurrent exchange', 'air sacs are a bird feature not a mammal feature',
    ],
    content: `Birds have a fundamentally more efficient respiratory system than mammals, built for the huge oxygen demand of flight. Instead of lungs that inflate and deflate, a bird's lungs are small, rigid, and do not change volume. The pumping is done by a set of nine air sacs (in the chest, abdomen, and even inside some bones) that are NOT gas-exchange organs — they are bellows. Over two full breath cycles, air is drawn first into the rear air sacs, then pushed forward through the lungs, then into the front air sacs, then exhaled — so it flows through the lungs in ONE direction, and fresh, oxygen-rich air passes over the gas-exchange surfaces continuously, including while the bird is breathing out. In the lung itself, air flows through millions of tiny tubes (parabronchi and air capillaries) that run at an angle to the blood flow ("crosscurrent exchange"), extracting more oxygen than the mammalian setup where fresh and stale air mix in dead-end sacs (alveoli). This is why bar-headed geese can fly over the Himalayas at altitudes where a mammal would black out. (Air sacs are a bird feature; mammals do not have them.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-owl-silent-flight',
    title: 'How Owls Fly Silently',
    category: 'Ornithology',
    keywords: [
      'how do owls fly silently and hunt in the dark', 'three feather adaptations comb like serrated leading edge on the primary feathers breaks up air turbulence into tiny streams',
      'soft fringe on the trailing edge velvety down covering the wing surface absorbs remaining sound', 'quiet enough that the owl can hear its prey over its own wingbeats and the prey does not hear it coming',
      'trade off only works at slow speed fast flying fish owls have lost the adaptation', 'plus large light wings for low speed low workload flight',
    ],
    content: `An owl's near-silent flight comes from three modifications to its wing feathers. First, the leading edge of the outermost flight feathers is fringed into a stiff comb of tiny hooks that breaks the oncoming air into many small streams instead of letting one big turbulent wake form — the main source of wing noise. Second, the trailing edge of each flight feather has a soft, flexible fringe that lets air slip off smoothly rather than snapping free. Third, the whole upper surface of the wing is covered in a layer of fine, velvety down that absorbs the remaining high-frequency sound. On top of this, owls have unusually large wings for their body weight, so they can fly slowly with slow, low-effort wingbeats. The payoff is twofold: the owl can hear the faint rustle of a mouse over the sound of its own flight, and the prey never hears the owl coming. The trade-off is that the fringes only quiet slow flight — owls that hunt fast or over open water (some fish owls) have largely lost these adaptations. Their hunting is completed by huge light-gathering eyes and, in barn owls, ear openings set at different heights that let them pinpoint a sound in total darkness.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bird-molting',
    title: 'What Molting Is in Birds',
    category: 'Ornithology',
    keywords: [
      'what is molting in birds', 'molt the regular gradual replacement of old worn feathers with new ones grown from the same follicles birds do not molt to grow they are full size at fledging',
      'most birds do a complete molt once a year usually after breeding some also a partial pre breeding molt into brighter plumage', 'flight feathers replaced in a symmetrical sequence a few at a time so the bird can keep flying',
      'ducks geese and some others drop all flight feathers at once and are flightless for a few weeks', 'molt is energetically costly timed to avoid overlapping with breeding or migration',
    ],
    content: `Molting is the scheduled replacement of a bird's feathers. Feathers are dead structures that wear out — they fade, fray, and break — so they must be regrown periodically from the same follicles in the skin. Birds do NOT molt in order to grow: they reach full adult size before they leave the nest, and molt does not make them bigger (this is unlike insect or crustacean molting). Most birds have one complete molt per year, usually right after breeding when food is plentiful and parental duties are over; many also have a partial molt before the breeding season, replacing body feathers to bring in brighter courtship plumage (which is why many male ducks and warblers look drab in autumn and vivid in spring). Wing and tail feathers are normally shed and regrown in a set, symmetrical order — one or two matching feathers on each side at a time — so the bird stays able to fly. The exceptions are ducks, geese, swans, rails, and grebes, which drop all their flight feathers at once and are completely flightless for a few weeks, hiding in dense cover until the new set grows in. Because growing a whole set of feathers is metabolically expensive, molt is timed not to overlap with breeding or long migration.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-raptor-vs-passerine',
    title: 'Raptor vs Passerine',
    category: 'Ornithology',
    keywords: [
      'what is the difference between a raptor and a passerine', 'raptors birds of prey hawks eagles falcons owls kites harriers ospreys vultures hooked beaks powerful feet with sharp talons keen eyesight',
      'raptors are not a single evolutionary group falcons are more closely related to parrots than to hawks', 'passerines perching birds songbirds order passeriformes over 6000 species more than half of all birds',
      'passerine foot three toes forward one strong toe back that automatically grips a perch songbird syrinx for complex song sparrows finches robins crows warblers',
    ],
    content: `These are two different ways of grouping birds. RAPTORS ("birds of prey") are the hunting birds: hawks, eagles, kites, harriers, ospreys, Old World and New World vultures (which scavenge), falcons, and owls. They share a hunter's toolkit — a strongly hooked beak for tearing flesh, powerful feet with long curved talons for seizing and killing, and exceptional eyesight — but they are NOT a single branch of the bird family tree; DNA shows falcons are actually closer relatives of parrots and songbirds than of hawks, and owls are a separate lineage again. PASSERINES are the "perching birds" or, loosely, "songbirds" — the order Passeriformes, which contains over 6,000 species, more than half of all living birds. They are defined anatomically by their feet: three toes point forward and one strong toe points back, with a tendon arrangement that automatically curls the toes closed when the leg bends, so a passerine grips its perch effortlessly, even asleep. Most (the "oscine" songbirds) also have a highly developed syrinx for complex, learned song. Passerines are generally small to medium — sparrows, finches, thrushes, warblers, tits, crows, birds-of-paradise — and eat insects, seeds, or fruit.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-birds-sing',
    title: 'How and Why Birds Sing (the Syrinx)',
    category: 'Ornithology',
    keywords: [
      'how do birds sing and why do they sing', 'birds produce sound with the syrinx a vocal organ at the bottom of the trachea where it splits into the two bronchi unlike a mammals larynx at the top',
      'membranes on each side vibrate as air passes two independent sound sources some birds sing two notes at once and take mini breaths to sing continuously', 'song learned complex seasonal mostly males calls innate short year round both sexes',
      'song learning has a critical period regional dialects parallel to human speech development testosterone and day length',
    ],
    content: `Birds do not have a larynx with vocal cords like mammals. They sing with the SYRINX, a unique organ located deep in the chest at the point where the windpipe (trachea) forks into the two bronchi leading to the lungs. Thin membranes and muscles on each side of the fork vibrate as air is forced past them, and because there are effectively two sound sources — one at each bronchus — a bird can produce two different notes simultaneously, slur rapidly between pitches, and even "circular breathe," taking tiny sips of air between syllables to sing a long phrase without a pause. Function-wise, ornithologists distinguish SONG from CALLS. Song is usually longer and more complex, given mainly by males in the breeding season under the influence of testosterone and lengthening days, and it serves to attract a mate and to warn rival males off a territory. Calls are short, simple, given year-round by both sexes, and mostly innate — alarm calls, contact calls, flight calls, begging calls. In the "true songbirds," song is largely learned: a young bird must hear an adult tutor during a critical period, babbles a "subsong," and gradually crystallises its adult song, which often carries a local "dialect" — a process biologists study as a parallel to how human infants learn speech.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-birds-standing-on-ice',
    title: 'How Birds Keep Warm and Stand on Ice',
    category: 'Ornithology',
    keywords: [
      'how do birds keep warm and why can they stand on ice', 'fluff up feathers to trap layers of air insulation like a duvet oil from the preen gland waterproofs',
      'countercurrent heat exchange rete mirabile in the legs arteries carrying warm blood run against veins carrying cold blood returning warmth to the body before it reaches the feet', 'the feet are held just above freezing cold enough to lose almost no heat to the ice warm enough not to freeze',
      'bird feet are mostly tendon and bone with little muscle or fluid so there is little to freeze', 'birds also tuck one foot into belly feathers and shiver to generate heat',
    ],
    content: `Birds are warm-blooded and run a high body temperature (~40°C), and they keep it up in the cold in several ways: fluffing their feathers to trap thick layers of still air like a duvet, coating the feathers with waterproofing oil from the preen gland, shivering their flight muscles to generate heat, roosting communally, and reducing exposed surface area by tucking the head under a wing and standing on one leg. The puzzle of standing barefoot on ice is solved by a "countercurrent heat exchanger" (rete mirabile) in the legs: the arteries carrying warm blood down to the feet run right alongside the veins carrying cold blood back up, so heat passes across from the outgoing to the returning blood before it can be lost. This keeps the feet at a temperature only just above freezing — cold enough that almost no body heat leaks away into the ice, but warm enough that the tissue doesn't freeze. It helps that a bird's foot is mostly tendon, bone and skin with very little muscle or fluid, so there is little there to freeze and it needs little blood flow. (Claws do not "conduct cold away as a heat shield," and bird bones are not denser to retain heat.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-starling-murmuration',
    title: 'What a Starling Murmuration Is and How It Works',
    category: 'Ornithology',
    keywords: [
      'what is a murmuration of starlings and how does it work', 'a swirling shape shifting aerial flock of thousands sometimes over a million starlings usually at dusk before roosting',
      'emerges from simple local rules each bird tracks its roughly seven nearest neighbours matching speed and direction while avoiding collision no leader', 'changes propagate through the flock as a wave faster than any individual bird could react like a phase transition in physics',
      'functions confusing predators dilution and confusion effects sharing warmth and roost information safety in numbers',
    ],
    content: `A murmuration is the swirling, rolling, ink-blot cloud that huge flocks of common starlings form in the sky, usually for up to an hour around dusk before they drop down to a communal roost. Flocks can number tens of thousands to over a million birds, yet there is no leader and no choreography. Studies that filmed murmurations with multiple cameras found each bird pays attention to a fixed number of its nearest neighbours — about seven — regardless of how far away they are, and does three simple things: match their heading, match their speed, and don't collide. From those local rules alone, a global pattern emerges, and a turn started by a few birds on one edge sweeps across the whole flock as a wave that travels faster than any single bird could react — physicists describe the flock as being poised at a "critical" state, like a material on the edge of a phase change, so it responds coherently to the tiniest disturbance. The behaviour is thought to protect against predators: a peregrine or sparrowhawk struggles to fix on and single out one target in the churning mass (the "confusion effect"), and the denser the flock, the lower any individual's odds of being the one caught (the "dilution effect"). Gathering also lets birds share warmth and information about good roost sites.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bird-evolution-from-dinosaurs',
    title: 'How Birds Evolved from Dinosaurs',
    category: 'Ornithology',
    keywords: [
      'how did birds evolve from dinosaurs', 'birds are living theropod dinosaurs specifically within the coelurosaur maniraptoran group that also includes velociraptor',
      'feathers wishbones hollow bones air sacs three fingered hands and brooding behaviour all evolved in non-avian dinosaurs first for insulation and display not flight', 'archaeopteryx about 150 million years ago is a classic transitional form',
      'true birds avialae survived the end cretaceous asteroid 66 million years ago that killed all other dinosaurs small beaked seed eating ground birds scraped by about 11000 living species today',
    ],
    content: `Birds are not merely descended from dinosaurs — by the standard definition they ARE dinosaurs, a surviving branch of the theropods (the two-legged, mostly carnivorous group that includes Tyrannosaurus and Velociraptor). Within the theropods, birds sit inside the "maniraptorans," close relatives of the dromaeosaurs (raptors). Fossils from China and elsewhere show that the classic "bird" features arose in ground-living dinosaurs long before flight and for other reasons: simple filament feathers appeared for insulation and later complex vaned feathers for display and brooding; the wishbone (fused collarbones), hollow air-filled bones, an efficient air-sac respiratory system, a backward-pointing big toe, and sitting on nests to incubate eggs are all found in non-flying dinosaurs. Archaeopteryx (~150 million years ago) is the famous halfway form — feathered wings and a wishbone, but also teeth, clawed fingers, and a long bony tail. When the asteroid struck 66 million years ago and wiped out every non-avian dinosaur, one group of small, toothless, beaked birds survived — probably because beaked seed-eaters could live off buried seeds through the years of ecological collapse — and radiated into today's roughly 11,000 species.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-bird-bones-hollow',
    title: 'Why Bird Bones Are Hollow',
    category: 'Ornithology',
    keywords: [
      'why are bird bones hollow', 'many bird bones are pneumatic hollow with air spaces connected to the respiratory air sacs reinforced inside with a lattice of strut like trabeculae like the trusses in a bridge or aircraft wing',
      'high strength for low weight a birds skeleton is not necessarily lighter than a same size mammals the bone is denser and mass is redistributed but it is stiffer', 'some bones are fused synsacrum fused hand and foot bones for rigidity',
      'diving birds penguins and loons have dense solid bones to reduce buoyancy',
    ],
    content: `Many (not all) of a bird's larger bones are "pneumatic": hollow, with the internal cavity connected to the air-sac system so it actually holds air. Inside, they are braced by a network of thin bony struts (trabeculae) arranged along the lines of stress, exactly like the triangulated trusses inside an aircraft wing or a bridge — this gives a very high strength-to-weight ratio and, importantly, stiffness, which matters when a wing is loaded during flight. A subtle point often missed: a bird's whole skeleton is not necessarily lighter than that of a mammal the same size — the bone walls are dense and the mass is redistributed (more in the core, less in the extremities) — but it is stiffer for its weight. Birds also save weight and gain rigidity by fusing bones that are separate in other vertebrates: the "synsacrum" (fused lower spine and hip), the "pygostyle" (fused tail vertebrae that anchor the tail feathers), and fused hand and foot bones. The exception is diving birds: penguins, loons, and auks have dense, solid, non-pneumatic bones, because buoyant hollow bones would fight their efforts to dive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-woodpecker-brain',
    title: 'How Woodpeckers Avoid Brain Damage',
    category: 'Ornithology',
    keywords: [
      'how do woodpeckers avoid brain damage', 'a small smooth tightly fitting brain with little cerebrospinal fluid cushion so it cannot slosh a smaller brain has a better surface area to mass ratio and withstands higher g forces',
      'skull bone is spongy and slightly compressible especially at the front specialized hyoid bone tongue support wraps around the back of the skull acting like a seatbelt', 'upper and lower beak halves slightly unequal length directing impact force below the brain into the neck muscles',
      'head moves in a near perfectly straight line to avoid rotational forces the most damaging kind recent research the head acts as a stiff hammer and the brain is simply small and light enough to tolerate it',
    ],
    content: `A woodpecker's head decelerates at over 1,000 g when it strikes a tree, thousands of times a day, yet it does not concuss itself. Several features contribute. Its brain is small and light (so it has a high surface-area-to-mass ratio and can tolerate higher g-forces), smooth, and packed tightly into the skull with very little cushioning fluid, so it cannot slosh back and forth. The skull bone is dense but with a spongy, slightly compressible structure, especially at the front and back. A remarkable bone called the hyoid — which supports the tongue — loops all the way around the back and over the top of the skull, and is thought to act like a built-in safety harness that snugs the skull during impact. The upper and lower halves of the beak are very slightly unequal in length, which is believed to route impact force downward past the braincase and into the strong neck muscles rather than straight into the brain. And the bird keeps its head moving in an almost perfectly straight line, avoiding the twisting, rotational forces that cause the worst brain injuries. Recent high-speed studies argue the head essentially works as a rigid hammer with minimal shock absorption, and the main reason the bird is fine is simply that its brain is so small and light that even huge decelerations stay below the injury threshold — a large animal doing the same thing would be knocked out.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brood-parasitism-cuckoo',
    title: 'Brood Parasitism and How the Cuckoo Does It',
    category: 'Ornithology',
    keywords: [
      'what is brood parasitism and how does the cuckoo do it', 'brood parasitism a bird lays its eggs in another species nest and lets the host raise its young',
      'the female cuckoo watches a host waits until it leaves removes one host egg lays her own often mimicking the host egg colour different cuckoo gentes specialize on different hosts all in about ten seconds',
      'the cuckoo egg hatches early the blind naked chick pushes the hosts own eggs and chicks out of the nest monopolizing the food growing far larger than the foster parents', 'evolutionary arms race hosts evolve egg recognition cuckoos evolve better mimicry cowbirds honeyguides also do it',
    ],
    content: `Brood parasitism is a reproductive strategy in which a bird lays its eggs in the nest of another bird — usually another species — and leaves that "host" to incubate the egg and raise the chick, saving all the effort of parenting. The common (Eurasian) cuckoo is the textbook example. A female cuckoo spends time watching several potential host nests (reed warblers, dunnocks, meadow pipits, and others). When a host pair leaves the nest unattended, she flies down, removes one of the host's own eggs, and lays a single egg of her own — the whole visit takes about ten seconds. Her egg often closely mimics the colour and pattern of that particular host's eggs, because cuckoos are split into "gentes," lines of females that each specialise on one host species and pass the matching egg type down the female line. The cuckoo egg is adapted to hatch a day or two early; the newly hatched cuckoo, though blind and naked, has an instinct to brace against the floor of the nest and heave every other egg and chick over the rim, so within a day it is the sole occupant. It then exploits the foster parents with an exaggerated gape and a rapid begging call that sounds like a whole brood of hungry chicks, and it grows into a bird several times their size while they wear themselves out feeding it. Brown-headed cowbirds in North America and honeyguides in Africa are other brood parasites, and the relationship is a co-evolutionary arms race — hosts get better at spotting and ejecting foreign eggs, and parasites get better at mimicry.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-birds-fly-flapping',
    title: 'How Birds Fly (Wing Shape and the Flapping Stroke)',
    category: 'Ornithology',
    keywords: [
      'how do birds fly and how is a wing shaped', 'wing is an airfoil curved upper surface flatter lower surface generating lift by deflecting air downward newtons third law',
      'flapping downstroke generates both lift and forward thrust the primary flight feathers twist to act like propeller blades upstroke feathers spread and the wing folds to reduce drag',
      'the alula thumb feather acts as a leading edge slat preventing stall at low speed', 'flight styles soaring on thermals continuous flapping bounding flap glide',
    ],
    content: `A bird's wing is an airfoil — curved more on top than underneath and tilted slightly nose-up — so air passing over it is deflected downward, and by Newton's third law the wing is pushed up (lift). That explains gliding, but powered flight needs the flapping stroke. On the DOWNSTROKE the whole wing sweeps down and forward and the long "primary" feathers at the wingtip twist so that each acts like a small propeller blade, so the downstroke produces both lift and forward thrust. On the UPSTROKE the wing partly folds, the primaries separate like slats to let air slip through, and the wing sweeps up and back with much less resistance, so it costs little and produces little force. At low speed — taking off or landing — a bird raises the "alula," a small tuft of feathers on the "thumb," which works like the leading-edge slat on an aircraft, keeping airflow attached to the wing and delaying the stall. Different birds specialise: broad-winged hawks and vultures soar for hours on rising thermals with barely a flap; small songbirds use "bounding" flight, flapping in bursts and folding the wings between; hummingbirds beat the wings in a figure-eight to hover.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bird-migration-navigation',
    title: 'How Birds Navigate During Migration',
    category: 'Ornithology',
    keywords: [
      'how do birds navigate during migration magnetic field', 'birds combine several compasses the sun position corrected for time of day the pattern of stars around the celestial pole and the earths magnetic field',
      'magnetic sense a radical pair reaction in cryptochrome proteins in the eye that is light dependent an inclination compass senses the angle of field lines to the ground not north south polarity plus magnetite particles as a backup',
      'young birds fly a genetically programmed direction and distance on their first migration alone experienced birds also use a learned map of landmarks coastlines smells and infrasound',
    ],
    content: `Migrating birds use several navigational systems together. A SUN COMPASS: they read direction from the sun's position, correcting for the time of day using their internal clock. A STAR COMPASS: night migrants learn, as juveniles, the pattern of rotation of the stars around the celestial pole and use the still point of the sky (roughly Polaris) as north. A MAGNETIC COMPASS: birds sense Earth's magnetic field, and the leading explanation is a light-dependent quantum process in "cryptochrome" proteins in the retina — incoming blue light creates pairs of molecules whose spin states are affected by the magnetic field, which the bird may literally "see" as a pattern overlaid on its vision; iron-mineral (magnetite) receptors, possibly in the beak, provide a backup. The bird's magnetic compass reads the inclination (the dip angle of the field lines relative to the ground), not north-versus-south polarity. On top of the compasses, experienced birds build a MAP from remembered landmarks, coastlines, mountain ranges, smells, and low-frequency infrasound. First-year birds migrating alone rely mainly on an inherited program — an innate heading and a rough sense of how long to fly — which is why a young bird blown off course will keep flying the "wrong" way, while an adult can correct.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bird-of-prey-pellet',
    title: 'What a Bird Pellet Is',
    category: 'Ornithology',
    keywords: [
      'what is a bird of prey pellet', 'a pellet is a compacted mass of indigestible prey parts bones fur feathers teeth insect exoskeletons and claws that a bird coughs up',
      'the muscular gizzard compacts it and the bird casts it usually 6 to 10 hours after eating before the next meal', 'owls have weaker stomach acid so their pellets contain intact identifiable bones hawks and falcons digest more bone',
      'not just raptors herons gulls crows kingfishers and many other birds also cast pellets used by scientists to study diet',
    ],
    content: `A pellet (or "casting") is a firm, roughly oval mass of the parts of a meal that a bird cannot digest — bones, fur, feathers, teeth, claws, beetle wing-cases, and fish scales — which the bird brings back up through its mouth. A bird that swallows prey whole or in large chunks digests the flesh in its stomach, while the muscular gizzard packs the leftover hard material into a pellet; the bird then "casts" it, typically 6 to 10 hours after eating and usually before it will take its next meal. Owls are especially useful to study because their stomach acid is relatively weak, so their pellets contain whole, undamaged bones and skulls — a researcher or student can tease one apart and identify every mouse, vole, and shrew the owl ate. Hawks, falcons and eagles have stronger digestive acid and their pellets contain more dissolved bone. Pellet-casting is not unique to birds of prey: herons, gulls, crows, ravens, kingfishers, grebes, and many shorebirds do it too.`,
    createdAt: Date.now(),
  },
];
