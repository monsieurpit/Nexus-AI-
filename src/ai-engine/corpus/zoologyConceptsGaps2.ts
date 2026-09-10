import { KnowledgeItem } from '../../types';

/**
 * ZOOLOGY_CONCEPTS_GAPS_2 — batch 255 corrections. Misses:
 * - "snake vs legless lizard" said "a snake is venomous" as the distinction
 *   (most snakes are not; venom is not the difference).
 * - "spider vs scorpion" said "scorpions totally are [insects]" (both are
 *   arachnids).
 * - "dolphin vs shark" said dolphins are "generally bigger than a shark".
 * - "alligator vs caiman" gave caimans a "V-shaped snout" (both are broad).
 * - "leopard vs cheetah" said a cheetah has "solid black stripes".
 * - "mouse vs rat" and "rat vs vole" were nonsense (naked mole rat facts,
 *   FPS-game "ratting").
 * - "eagle vs hawk", "duck vs goose", "crab vs lobster" never contrasted the
 *   two.
 * - "dragonfly vs damselfly" was a web dump.
 * - "rabbit vs hare" was self-contradicting.
 * - "centipede vs millipede", "owl vs hawk", "raven vs crow", "cricket vs
 *   grasshopper", "squid vs octopus", "jaguar vs leopard" were muddled or cut.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'zoology', keywords, content, createdAt: now,
});

export const ZOOLOGY_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-zoo2-snake-vs-legless-lizard',
    'Snake vs legless lizard',
    [
      'difference between a snake and a legless lizard', 'most snakes are not venomous venom is not the distinction', 'legless lizards have eyelids that blink external ear openings a short or notched fleshy tongue can shed and regrow the tail cannot expand their jaws so they eat small prey and often keep tiny limb remnants',
      'snakes have a fixed transparent eye scale no ear openings a deeply forked tongue flexible jaws that swallow large prey', 'glass lizards slow worms are legless lizards convergent evolution',
    ],
    `Venom is NOT the difference — only about 15-20% of snakes are venomous, and legless lizards are never venomous. Several lizard groups (glass lizards, slow worms, some skinks, the "worm lizards") have independently lost their legs and look snake-like through CONVERGENT evolution, but they keep tell-tale lizard features:

- EYELIDS: legless lizards have movable eyelids and can BLINK; a snake's eyes are covered by a fixed transparent scale (the "spectacle" or brille) and it cannot blink.
- EARS: legless lizards have visible EXTERNAL EAR OPENINGS; snakes have none (no external ear at all).
- TONGUE: a legless lizard has a relatively short, fleshy, only slightly notched tongue; a snake has a long, DEEPLY FORKED tongue it flicks constantly.
- JAWS: a snake's lower jaw halves are joined only by a stretchy ligament and the skull bones are loosely linked, so it can open enormously and swallow prey WIDER than its own head. A legless lizard has a rigid lizard jaw and eats small prey (insects, worms).
- TAIL: many legless lizards can DROP and regrow the tail (autotomy), and the tail is often as long as or longer than the body; snakes cannot regrow the tail and the tail (past the vent) is short.
- Some also keep tiny vestigial limb stubs.

Quick check: if it blinks and has ear holes, it's a lizard, not a snake.`,
  ),
  k(
    'kb-gap-zoo2-spider-vs-scorpion',
    'Spider vs scorpion',
    [
      'difference between a spider and a scorpion', 'both are arachnids not insects eight legs two body regions no antennae', 'a scorpion has large grasping pedipalps pincers at the front and a long segmented tail ending in a venomous stinger gives birth to live young that ride on the mothers back',
      'a spider has small fang-like chelicerae no tail or sting produces silk from spinnerets injects venom through fangs a compact rounded abdomen', 'neither is an insect',
    ],
    `BOTH are ARACHNIDS — NEITHER is an insect. All arachnids have eight legs, two main body parts (a fused head-thorax called the cephalothorax, plus the abdomen), no antennae, and no wings.

The differences between the two arachnids:

A SCORPION has:
- big, obvious PEDIPALPS at the front modified into PINCERS (claws) for grabbing and crushing prey;
- a long, segmented TAIL (the "metasoma") curving up over its back, ending in a bulb and a venomous STINGER — this is how it delivers venom;
- a flattened, elongated body;
- live BIRTH — the babies climb onto the mother's back and ride there until their first moult;
- it does NOT make silk.

A SPIDER has:
- small fang-like CHELICERAE (jaws) tipped with fangs, through which it injects venom when it bites;
- NO tail and NO sting;
- SPINNERETS at the rear that produce SILK (for webs, egg sacs, draglines, wrapping prey) — a defining spider trait scorpions lack;
- a rounded, usually unsegmented-looking abdomen;
- most lay eggs in a silk sac.

So: pincers + tail-stinger + live young = scorpion; fangs + silk + (usually) egg sac + no tail = spider.`,
  ),
  k(
    'kb-gap-zoo2-dolphin-vs-shark',
    'Dolphin vs shark',
    [
      'difference between a dolphin and a shark', 'a dolphin is an air-breathing mammal lungs and a blowhole warm-blooded gives live birth and nurses with milk a horizontal tail fluke that moves up and down smooth skin', 'a shark is a fish breathes water through gills a skeleton of cartilage not bone cold-blooded rough skin denticles a vertical tail fin that moves side to side most lay eggs or bear live young',
      'sharks range up to the whale shark over 12 metres most dolphins are 2 to 4 metres dolphins are not generally bigger than sharks',
    ],
    `They look superficially similar (streamlined body, dorsal fin) because of convergent evolution, but they are completely different animals.

A DOLPHIN is a MAMMAL (a toothed whale, or "odontocete"). It:
- breathes AIR with LUNGS, through a BLOWHOLE on top of the head, and must surface;
- is WARM-BLOODED (endothermic);
- gives BIRTH to live young and NURSES them with milk;
- has a HORIZONTAL tail fluke that it beats UP AND DOWN;
- has smooth, rubbery skin and a bony skeleton;
- uses echolocation and lives in social pods.

A SHARK is a FISH (a cartilaginous fish). It:
- breathes WATER, extracting oxygen through GILLS (5-7 gill slits);
- is mostly COLD-BLOODED (a few, like the great white and mako, are partly warm-bodied);
- most lay EGGS or bear live young without a placenta or milk;
- has a VERTICAL tail fin that sweeps SIDE TO SIDE;
- has a skeleton made entirely of CARTILAGE (no true bone), and skin covered in tooth-like "dermal denticles" that feel like sandpaper;
- continually replaces its teeth throughout life.

Size: this is where the common claim is wrong — sharks are NOT smaller. The whale shark reaches 12-18 m and the great white 4-6 m, while most dolphins are only 2-4 m (the orca, technically the largest dolphin, reaches ~9 m).`,
  ),
  k(
    'kb-gap-zoo2-alligator-vs-caiman',
    'Alligator vs caiman',
    [
      'difference between an alligator and a caiman', 'caimans are in the alligator family Alligatoridae native to Central and South America both have broad rounded snouts not V-shaped', 'caimans are generally smaller except the black caiman have a bony ridge or spectacle between the eyes more heavily ossified belly scales longer sharper teeth and tend to be more agile and aggressive',
      'the American alligator is the large Southeastern US species the Chinese alligator is small and rare', 'the V-snout is the crocodile trait not the caiman trait',
    ],
    `Caimans are CLOSE COUSINS of alligators — both are in the family ALLIGATORIDAE, distinct from true crocodiles — so BOTH have the broad, rounded, U-SHAPED SNOUT and the overbite that hides the lower teeth. (The narrow V-shaped snout with visible lower teeth is the CROCODILE trait, not a caiman trait.)

ALLIGATORS: there are only two species — the AMERICAN alligator (large, up to ~4 m, common in the freshwater swamps and rivers of the Southeastern US) and the CHINESE alligator (small, ~1.5 m, critically endangered, along the Yangtze).

CAIMANS: six species, all in CENTRAL and SOUTH AMERICA (the Amazon basin, the Pantanal, and as an invasive in Florida). Compared with the American alligator, caimans:
- are usually SMALLER (spectacled caiman ~2 m; the exception is the BLACK CAIMAN, which rivals the American alligator at 4-5 m+);
- often have a bony RIDGE or "spectacle" between or in front of the eyes (hence "spectacled caiman");
- have more heavily OSSIFIED, bony belly scales (osteoderms) — which makes their hide poor for leather and historically protected them from hunting;
- tend to have LONGER, sharper teeth and a more agile, more aggressive temperament.

So: alligator vs caiman is a within-family split (mostly geography and size); alligator/caiman vs CROCODILE is the bigger split (snout shape, tooth display, salt tolerance).`,
  ),
  k(
    'kb-gap-zoo2-leopard-vs-cheetah',
    'Leopard vs cheetah',
    [
      'difference between a leopard and a cheetah', 'a cheetah has solid round black spots not stripes and not rosettes plus black tear-mark lines from the inner eye down the muzzle slender long-legged small head semi-retractable claws the fastest land animal built for a short sprint hunts by day cannot roar', 'a leopard has rosettes rose-shaped clusters of spots with a lighter centre stocky and muscular an excellent climber that hoists kills into trees mostly nocturnal can roar an ambush hunter',
      'they are different genera Acinonyx versus Panthera',
    ],
    `Two spotted African cats that are often confused, but easy to tell apart.

COAT MARKINGS: a CHEETAH has SOLID, round, evenly spaced BLACK SPOTS all over its tan coat — NOT stripes and NOT rosettes. It also has unmistakable black "TEAR MARK" lines running from the inner corner of each eye down the sides of the muzzle. A LEOPARD has ROSETTES — rose-shaped rings/clusters of dark spots with a paler tan centre, and no tear marks.

BUILD and ABILITIES:
- The cheetah is built for SPEED: slender, tall, long-legged, small rounded head, deep chest, a long tail for balance, and blunt, only SEMI-RETRACTABLE claws that act like running spikes. It is the FASTEST land animal (~100-110 km/h in bursts of a few hundred metres), hunts in the DAYTIME to avoid competition, and CANNOT roar — it chirps and purrs.
- The leopard is built for POWER and STEALTH: stocky, heavily muscled (especially the shoulders and neck), shorter legs, fully retractable claws. It is a superb CLIMBER and routinely DRAGS its kills up into trees to keep them from lions and hyenas. It hunts mostly at NIGHT by ambush, is highly adaptable (from rainforest to desert to city fringes), and CAN roar (a rasping "sawing" call).

They are not even the same genus: cheetah = Acinonyx jubatus; leopard = Panthera pardus.`,
  ),
  k(
    'kb-gap-zoo2-mouse-vs-rat',
    'Mouse vs rat',
    [
      'difference between a mouse and a rat', 'mouse and rat are size-based common names not precise scientific terms', 'a mouse is small about 10 to 25 grams slender build large ears and eyes relative to the head a thin hairless tail about as long as the body a pointed snout house mouse Mus musculus',
      'a rat is larger 150 to 300 grams or more heavier build proportionally smaller ears a thicker scaly tail a blunter snout larger feet brown or Norway rat Rattus norvegicus black rat Rattus rattus', 'a young rat looks like a mouse but has an oversized head and feet',
    ],
    `"MOUSE" and "RAT" are not precise scientific categories — they are SIZE-BASED common names applied to hundreds of unrelated rodent species around the world. But for the familiar house/pest animals:

A MOUSE (the house mouse, Mus musculus) is SMALL — roughly 10-25 g, with a head-and-body about 7-10 cm plus a tail about the same length again. It has a SLENDER, dainty build, LARGE ears and LARGE eyes relative to its small head, a thin, nearly hairless tail, a pointed snout, and small feet. Droppings are small (~3-6 mm) and rod-shaped.

A RAT (the brown/Norway rat, Rattus norvegicus, or the black/roof rat, Rattus rattus) is much LARGER — roughly 150-300 g or more, head-and-body 15-25 cm. It has a HEAVY, thick-set body, proportionally SMALLER ears, a THICK, scaly, less hairy tail, a BLUNTER heavier snout, and noticeably LARGER feet. Droppings are large (~12-18 mm), capsule- or banana-shaped.

The catch: a JUVENILE rat is mouse-sized and often mistaken for a mouse. The giveaway is proportion — a young rat has an OVERSIZED head and feet for its body, thick pink feet, and a stubby tail, whereas a mouse is delicately proportioned all over.

(The "naked mole rat" with a 30-year lifespan and cancer resistance is neither a true mouse nor a true rat — it is a specialised African burrowing rodent in its own family.)`,
  ),
  k(
    'kb-gap-zoo2-rat-vs-vole',
    'Rat vs vole',
    [
      'difference between a rat and a vole', 'a vole field mouse or meadow mouse has a stocky rounded compact body a short tail much shorter than the body small rounded ears mostly hidden in fur small eyes and a blunt rounded snout looks like a chubby hamster-ish mouse', 'a vole is mainly a herbivore grasses roots bark lives in grassland and gardens makes surface runways and shallow burrows famous boom-and-bust population cycles',
      'a rat is larger long-tailed long-snouted big-eared an omnivorous scavenger associated with human buildings', 'not FPS-game ratting',
    ],
    `Both are rodents, but a VOLE and a RAT look and live quite differently.

A VOLE (genus Microtus and relatives; also called "field mouse" or "meadow mouse") has:
- a STOCKY, ROUNDED, compact body — like a small chubby hamster or a fat mouse;
- a SHORT tail, distinctly shorter than the body (often less than a third of the body length), and lightly furred;
- SMALL, rounded ears mostly buried in the fur;
- small eyes;
- a BLUNT, rounded snout.
Voles are mainly HERBIVORES — grasses, seeds, roots, bulbs, and bark (they can girdle young trees in winter) — and live in fields, meadows, gardens, and woodland edges, where they make networks of shallow burrows and worn surface "runways" through the grass. They are active day and night and are famous for dramatic BOOM-AND-BUST population cycles every few years.

A RAT is LARGER, with a LONG scaly tail (as long as or longer than the body), a longer pointed snout, larger prominent ears, and a lean build. Rats are OMNIVOROUS scavengers strongly associated with HUMAN buildings, sewers, farms, and waste, and they are agile climbers and swimmers.

Quick check: short-tailed, blunt-faced, hamster-shaped, in a field = vole; long-tailed, pointy-faced, in or near buildings = rat.`,
  ),
  k(
    'kb-gap-zoo2-eagle-vs-hawk',
    'Eagle vs hawk',
    [
      'difference between an eagle and a hawk', 'both are in the family Accipitridae true hawks eagles kites harriers', 'an eagle is a large powerful hawk-family raptor bigger body much longer and broader wings a heavier hooked bill and larger talons and feet capable of taking large prey fish rabbits other birds eagle is not a single genus sea eagles booted eagles harpy eagles',
      'a hawk usually means a Buteo broad-winged soaring hawk like the red-tailed or an Accipiter short-winged long-tailed forest hawk like the Cooper hawk smaller than eagles', 'it is largely a size and power continuum within the same family',
    ],
    `Eagles and hawks are close relatives — most are in the same family, ACCIPITRIDAE (which also contains kites and harriers). The distinction is mostly one of SIZE and POWER, not deep taxonomy.

An EAGLE is essentially a very LARGE, powerful hawk-family raptor:
- much bigger body and MUCH longer, broader WINGS (a bald or golden eagle's wingspan is ~2 m);
- a heavier, deeper HOOKED BILL;
- larger, stronger TALONS and feet, able to seize and carry large prey — fish, hares, marmots, geese, and (for the biggest, like the harpy or Philippine eagle) monkeys and sloths.
"Eagle" is not one genus — it is a loose grouping including sea/fish eagles (bald eagle), booted eagles (golden eagle), snake eagles, and the giant harpy eagles.

A HAWK, in everyday North American use, means one of:
- a BUTEO — a medium-large, broad-winged, short-tailed hawk that SOARS in circles hunting open country (red-tailed hawk, red-shouldered hawk); called "buzzards" in Britain;
- an ACCIPITER — a smaller hawk with SHORT rounded wings and a LONG tail, built to fly fast through woodland chasing birds (Cooper's hawk, sharp-shinned hawk, goshawk).

So there is no sharp line — an eagle is roughly "a hawk big and strong enough to be called an eagle". (Falcons, by contrast, are a SEPARATE family and only distantly related.)`,
  ),
  k(
    'kb-gap-zoo2-hawk-vs-falcon',
    'Hawk vs falcon',
    [
      'difference between a hawk and a falcon', 'despite similar looks falcons family Falconidae are not close relatives of hawks DNA places them near parrots and songbirds', 'falcons have long pointed wings a fast flapping flight and dive stoop at high speed kill with a notched tomial tooth on the beak often to the neck compact bodies dark eyes',
      'hawks family Accipitridae have broader more rounded wings soar more kill with their feet and talons and vary from soaring buteos to forest accipiters', 'a peregrine is a falcon a red-tailed is a hawk',
    ],
    `They look alike — hooked beak, sharp talons, forward-facing eyes, superb vision — but hawks and falcons are only DISTANTLY related. DNA studies place FALCONS (family Falconidae) closer to parrots and songbirds than to hawks; HAWKS and eagles (family Accipitridae) are a separate lineage.

FALCONS:
- have LONG, POINTED, swept-back wings (a scythe-like silhouette) and a relatively short tail;
- fly with fast, powerful WINGBEATS rather than much soaring;
- are the fastest animals alive — the PEREGRINE dives ("stoops") on prey at 300+ km/h;
- kill mainly by the STRIKE itself, then use a notched "TOMIAL TOOTH" on the upper beak to sever the prey's neck;
- have compact, muscular bodies, dark eyes, and often a "moustache" mark on the face;
- do NOT build nests — they use scrapes or ledges or other birds' old nests.
Examples: peregrine, kestrel, merlin, hobby, gyrfalcon.

HAWKS:
- have BROADER, more ROUNDED wings and (in accipiters) a longer tail;
- SOAR and glide much more, or ambush from a perch or through cover;
- kill with their powerful FEET and TALONS, gripping and crushing;
- build stick nests.
Examples: red-tailed hawk, Cooper's hawk, goshawk, sparrowhawk.

Rule of thumb: pointed wings + blistering dive = falcon; rounded wings + soaring or perch-hunting = hawk.`,
  ),
  k(
    'kb-gap-zoo2-owl-vs-hawk',
    'Owl vs hawk',
    [
      'difference between an owl and a hawk', 'hawks are diurnal day-hunting raptors owls are mostly nocturnal or crepuscular', 'owls have forward-facing eyes in a flat facial disc that funnels sound asymmetrical ear openings for pinpointing sound acute hearing fringed flight feathers for near-silent flight a head that rotates about 270 degrees and swallow prey whole coughing up pellets of fur and bone',
      'hawks have eyes on the sides of the head hunt by soaring or perching and diving rely on daylight vision they are not close relatives owls order Strigiformes hawks Accipitriformes',
    ],
    `Both are birds of prey with hooked beaks and talons, but they hunt in different ways at different times and are not closely related (OWLS are the order Strigiformes; HAWKS are Accipitriformes — they only converged on the raptor lifestyle).

OWLS:
- are mostly NOCTURNAL or crepuscular (active at dusk/dawn);
- have large, FORWARD-facing eyes fixed in their sockets, set in a flat FACIAL DISC of stiff feathers that works like a satellite dish, funnelling sound to the ears;
- have ASYMMETRICAL ear openings (one higher than the other), letting them pinpoint a sound's location in complete darkness — some hunt by hearing alone;
- have specially fringed and downy FLIGHT FEATHERS that muffle the sound of the wingbeat, so they fly almost SILENTLY;
- have very flexible necks and can rotate the head about 270 degrees (the eyes can't move, so the head must);
- swallow small prey WHOLE and later regurgitate a compact PELLET of fur, feathers, and bones (owl stomach acid is weak, so their pellets contain intact bones — a naturalist can dissect them to see the whole skeleton of the meal).

HAWKS:
- are DIURNAL (day hunters), relying on outstanding daylight VISION;
- have eyes set more toward the SIDES of the head;
- hunt by soaring and stooping, or ambushing from a perch, and use their feet to catch and kill;
- also produce pellets, but tend to tear and pluck prey more and have stronger stomach acid, so their pellets contain far less bone.`,
  ),
  k(
    'kb-gap-zoo2-raven-vs-crow',
    'Raven vs crow',
    [
      'difference between a raven and a crow', 'a raven is noticeably larger common raven about 63 cm wingspan 1.2 m versus American crow about 45 cm with a heavier bill shaggy throat feathers hackles a wedge or diamond-shaped tail in flight soars and does aerial rolls a deep croaking gronk call usually seen alone or in pairs', 'a crow is smaller with a slimmer bill a fan-shaped rounded tail flaps steadily rather than soaring a higher caw call and is highly gregarious in flocks and roosts',
      'both are corvids and among the most intelligent birds',
    ],
    `Both are large black CORVIDS and among the most intelligent of all birds, but they differ in several ways once you know what to look for.

SIZE: a common RAVEN is much bigger — about 63 cm long with a 1.2 m wingspan, roughly the size of a buzzard/red-tailed hawk. An American (or carrion) CROW is about 45 cm, pigeon-to-chicken sized.

BILL and THROAT: the raven has a massive, deep, heavy BILL and a shaggy "beard" of loose feathers (hackles) on the throat that it can fluff out. The crow's bill is slimmer and its throat feathers are smooth.

TAIL in flight: the raven's tail is WEDGE- or DIAMOND-shaped (longer in the middle). The crow's tail is squared-off or FAN-shaped (rounded, all feathers a similar length).

FLIGHT: ravens SOAR and glide a lot, and perform aerial acrobatics — rolls, tumbles, flying upside down. Crows FLAP steadily and soar rarely.

VOICE: the raven gives a deep, hollow, croaking "gronk-gronk" or "cr-r-ruck". The crow gives the familiar higher-pitched "CAW-caw-caw".

SOCIAL LIFE: ravens are usually seen ALONE or in PAIRS (they mate for life and hold large territories). Crows are highly GREGARIOUS — family groups, foraging flocks, and enormous communal winter roosts.

Range/habitat: ravens favour wilder country — mountains, forests, coasts, deserts; crows are birds of farmland, towns, and suburbs (though ravens are now moving into cities too).`,
  ),
  k(
    'kb-gap-zoo2-centipede-vs-millipede',
    'Centipede vs millipede',
    [
      'difference between a centipede and a millipede', 'a centipede has one pair of legs per body segment legs stick out to the sides relatively long moves fast a flattened body a carnivorous predator with venomous forcipules modified front legs 15 to 177 pairs of legs', 'a millipede has two pairs of legs per segment segments fused in pairs a dense wavy fringe of many short legs underneath a rounded cylindrical body a slow detritivore that eats decaying plant matter no venom curls into a spiral and secretes foul or toxic chemicals for defence',
    ],
    `Both are MYRIAPODS with long, many-segmented bodies, but the key structural difference is LEGS PER SEGMENT.

A CENTIPEDE ("hundred-legger") has ONE pair of legs per body segment. The legs are relatively LONG and stick out to the SIDES, well spaced along the body. Centipedes are:
- FAST-moving;
- FLATTENED top-to-bottom;
- carnivorous PREDATORS — the first pair of legs is modified into venomous claws ("forcipules") used to seize and poison prey (insects, spiders, worms; a big tropical one can take a mouse). A centipede bite can be painful to humans.
- They have 15 to 177 pairs of legs (always an ODD number of leg-bearing segments — never exactly 100).

A MILLIPEDE ("thousand-legger") has TWO pairs of legs per apparent segment (each visible ring is two segments fused, a "diplosegment"). The legs are SHORT and packed close TOGETHER underneath, moving in mesmerising waves. Millipedes are:
- SLOW-moving;
- rounded and CYLINDRICAL (tube-shaped);
- harmless DETRITIVORES — they eat DECAYING leaves and rotting wood, recycling nutrients in the soil;
- non-venomous; their defence is to CURL into a tight spiral and, in many species, ooze a foul, bitter, sometimes toxic fluid (some can smell of almonds/cyanide).
- The record-holder has about 1,300 legs; most have 34-400.

Quick check: fast, flat, long side-legs, bites = centipede; slow, round, dense wave of tiny legs, curls up = millipede.`,
  ),
  k(
    'kb-gap-zoo2-crab-vs-lobster',
    'Crab vs lobster',
    [
      'difference between a crab and a lobster', 'both are decapod crustaceans ten legs an exoskeleton they must moult to grow and claws chelae on the first pair of legs', 'a lobster has a long muscular extended abdomen the tail that it flexes to swim backward rapidly an elongated body long antennae and in clawed lobsters large asymmetric claws it walks forward',
      'a crab has a short abdomen folded tightly under a broad flattened carapace so it looks tailless walks sideways a rounder compact shape and shorter antennae',
    ],
    `Both are DECAPOD crustaceans — ten legs, a hard exoskeleton they must MOULT (shed) to grow, eyes on stalks, and a pair of CLAWS (chelae) on the first pair of legs. The obvious difference is the shape of the rear body.

A LOBSTER has a long, heavily MUSCULAR, EXTENDED ABDOMEN — the "tail" — trailing straight out behind the body. It uses this tail as a swimming paddle: a sharp flex of the tail shoots the lobster BACKWARD to escape danger. Its body is elongated, its antennae are long, and clawed ("true") lobsters like the Maine/European lobster have two big, unequal claws (one heavy "crusher", one finer "pincer"); spiny lobsters/rock lobsters have no big claws but very long spiky antennae. A lobster WALKS forward on the sea floor.

A CRAB has a very SHORT abdomen that is FOLDED FLAT and tucked TIGHTLY UNDER the body, out of sight — so a crab appears to have no tail at all. Its carapace (shell) is broad, rounded, and FLATTENED, giving that compact "crab" shape, and its antennae are short. Its legs splay out to the sides, and a crab characteristically WALKS SIDEWAYS.

So: long tail sticking out the back = lobster; tail hidden underneath a wide flat shell, scuttles sideways = crab. (Hermit crabs are in between — a soft, curled abdomen they protect inside a borrowed snail shell; and some "crabs", like the king crab, evolved from hermit-crab ancestors.)`,
  ),
  k(
    'kb-gap-zoo2-duck-vs-goose',
    'Duck vs goose',
    [
      'difference between a duck and a goose', 'both are waterfowl family Anatidae geese are larger with much longer necks longer legs more terrestrial graze on grass on land less sexual dimorphism males and females look alike mate for life both parents raise the young and honk', 'ducks are smaller shorter-necked more aquatic dabble or dive for food often show strong sexual dimorphism colourful drake versus drab hen form seasonal pair bonds usually only the female tends the ducklings and quack or make raspier calls',
      'swans are the largest with even longer necks',
    ],
    `Ducks, geese, and swans are all WATERFOWL in the family Anatidae; the differences are mostly size, neck length, and lifestyle.

A GOOSE is:
- LARGER and heavier;
- LONG-NECKED (though not as long as a swan) and long-legged;
- more TERRESTRIAL — geese spend a lot of time walking on land and GRAZING on grass, grain, and shoots;
- monomorphic — males (ganders) and females look ALIKE;
- long-term PAIR-BONDED, often mating for life, with BOTH parents defending and raising the goslings;
- vocal with HONKING calls.

A DUCK is:
- SMALLER;
- SHORT-NECKED and short-legged, waddling awkwardly on land;
- more AQUATIC — "dabbling" ducks tip up to feed at the surface, "diving" ducks go underwater;
- often strongly DIMORPHIC — the male (drake) is brightly coloured for display, the female (hen) is drab brown for camouflage on the nest (mallards are the classic example);
- seasonally pair-bonded — a new mate most years, and usually only the FEMALE incubates and raises the ducklings;
- the female QUACKS; males make quieter raspy or whistling sounds.

(Swans are the largest of the three, with the longest necks, all-white or black plumage, and lifelong pair bonds.)`,
  ),
  k(
    'kb-gap-zoo2-dragonfly-vs-damselfly',
    'Dragonfly vs damselfly',
    [
      'difference between a dragonfly and a damselfly', 'both are in the order Odonata dragonflies suborder Anisoptera are robust thick-bodied eyes very large and usually touching on top of the head hindwings broader than forewings at rest hold the wings out flat horizontal strong fast fliers', 'damselflies suborder Zygoptera are slender delicate eyes clearly separated one on each side of the head fore and hindwings similar and narrowing to a stalk at the base at rest most hold the wings closed along the abdomen weaker fluttery fliers',
    ],
    `Both belong to the order ODONATA and both are aquatic as larvae (nymphs), but adults are easy to separate.

DRAGONFLIES (suborder ANISOPTERA):
- robust, THICK bodies;
- huge compound EYES that usually TOUCH (or nearly touch) on top of the head, wrapping most of it;
- HINDWINGS distinctly BROADER at the base than the forewings;
- at REST they hold their wings OUT FLAT and horizontal, spread away from the body like an aeroplane;
- strong, fast, agile fliers that can hover and fly backwards.

DAMSELFLIES (suborder ZYGOPTERA):
- slender, delicate, DAINTY bodies, like a flying matchstick;
- compact head with the EYES clearly SEPARATED, one bulging out on each side (a "dumbbell" or hammerhead look);
- fore- and hindwings SIMILAR in shape, each tapering to a narrow STALK at the base;
- at rest most FOLD their wings together, held along or just above the abdomen (a few, the "spreadwings", hold them partly open);
- weaker, fluttery, short-hop fliers, staying near vegetation at the water's edge.

Quick check: perched with wings OUT flat, eyes meeting on top, chunky = dragonfly; wings FOLDED back, wide-set eyes, thread-thin = damselfly.`,
  ),
  k(
    'kb-gap-zoo2-rabbit-vs-hare',
    'Rabbit vs hare',
    [
      'difference between a rabbit and a hare', 'hares are larger with longer ears and hind legs live solitary above ground in a shallow form do not dig burrows and their young leverets are precocial born fully furred eyes open able to run within minutes', 'rabbits are smaller social and (most species) live in underground burrows or warrens and their young kittens are altricial born naked blind and helpless',
      'hares are generally not domesticated the pet and farm rabbit descends from the European rabbit', 'a jackrabbit is actually a hare',
    ],
    `They look similar but differ in size, lifestyle, and — most tellingly — how the young are born.

HARES are:
- LARGER, with LONGER ears (often black-tipped) and much LONGER, more powerful HIND LEGS built for speed (a brown hare can run 60+ km/h);
- SOLITARY and live entirely ABOVE GROUND — they do NOT dig burrows. A hare rests in a "FORM", a shallow scrape hidden in grass;
- their young are called LEVERETS and are PRECOCIAL: born FULLY FURRED, with EYES OPEN, and able to hop and run within minutes. The mother visits briefly once a day to nurse.

RABBITS (the European rabbit and its relatives) are:
- SMALLER, with shorter ears and legs;
- SOCIAL — most species live in colonies in extensive underground BURROW SYSTEMS ("warrens"). (The cottontails of the Americas are an exception — they live above ground like hares but are true rabbits.)
- their young are called KITTENS or KITS and are ALTRICIAL: born NAKED, BLIND, and helpless in a fur-lined nest, and totally dependent on the mother for weeks.

Other notes: the domestic pet/meat rabbit descends from the European rabbit; hares have never been domesticated. And several animals are misnamed — the "jackrabbit" is a HARE, and the "Belgian hare" is a breed of domestic rabbit.`,
  ),
  k(
    'kb-gap-zoo2-cricket-vs-grasshopper',
    'Cricket vs grasshopper',
    [
      'difference between a cricket and a grasshopper', 'both are in the order Orthoptera and both have incomplete metamorphosis so wing buds is not a distinction', 'grasshoppers suborder Caelifera have short antennae shorter than the body are day-active herbivores hear via an organ on the abdomen and stridulate by rubbing a hind leg against a wing', 'crickets suborder Ensifera have long thread-like antennae often longer than the body are mostly nocturnal omnivores or scavengers hear via organs on the front legs and males chirp by rubbing the wings together females have a long needle-like ovipositor',
    ],
    `Both are jumping insects in the order ORTHOPTERA, and BOTH go through incomplete metamorphosis (egg -> nymph -> adult, with wing buds on the nymphs), so "wing buds" is not what tells them apart. The real differences:

GRASSHOPPERS (suborder CAELIFERA, "short-horned"):
- SHORT antennae, always shorter than the body;
- active by DAY, and almost entirely plant-eating (herbivores);
- "ears" (tympanal organs) on the sides of the ABDOMEN;
- males make sound ("stridulate") by rubbing a row of pegs on the HIND LEG against a hardened vein on the forewing;
- a short, blunt ovipositor; lay eggs in the soil.

CRICKETS (suborder ENSIFERA, "long-horned" — which also includes katydids/bush-crickets):
- LONG, thread-like antennae, often LONGER than the whole body;
- mostly NOCTURNAL, and typically OMNIVOROUS or scavenging (plants, other insects, detritus);
- "ears" on the FRONT LEGS (on the tibia, just below the knee);
- males "sing" the familiar chirp by rubbing the two FOREWINGS together (a file on one, a scraper on the other);
- often a flatter body held close to the ground, and females have a long, thin, needle- or sword-like OVIPOSITOR sticking out the back.

Quick check: short antennae, day, chirps with its leg = grasshopper; long whip antennae, night, chirps with its wings, long tail-spike on the female = cricket.`,
  ),
  k(
    'kb-gap-zoo2-squid-vs-octopus',
    'Squid vs octopus',
    [
      'difference between a squid and an octopus', 'both are cephalopod molluscs an octopus has 8 arms no tentacles a rounded soft bulbous body no internal shell lives on the sea bottom in a den crawls and jets highly intelligent a master of camouflage short-lived suckers along the whole arm', 'a squid has 8 arms plus 2 longer feeding tentacles ten appendages a streamlined torpedo-shaped body with two fins and a stiff internal pen a vestigial shell lives in the open ocean often in schools a fast jet swimmer suckers often on stalks with rings or hooks',
    ],
    `Both are CEPHALOPODS (soft-bodied molluscs with arms, a beak, and jet propulsion), but they are built for different lives.

An OCTOPUS:
- has EIGHT arms and NO tentacles — all eight limbs are the same, lined with suckers along their whole length;
- has a rounded, SOFT, bulbous body (mantle) and NO internal shell of any kind, so it can squeeze through any gap bigger than its beak;
- lives mostly on the SEA BOTTOM, sheltering in a DEN among rocks; it crawls as well as jets;
- is famously INTELLIGENT (problem-solving, tool use, escaping tanks), with much of its nervous system distributed into the arms;
- is a supreme quick-change CAMOUFLAGE artist (colour and skin texture);
- is generally SHORT-LIVED (1-2 years) and dies soon after reproducing.

A SQUID:
- has EIGHT arms PLUS TWO longer, retractable FEEDING TENTACLES with clubbed, sucker-covered tips — ten appendages in total;
- has a STREAMLINED, torpedo-shaped mantle with a pair of triangular FINS at the rear, and a stiff internal "PEN" (the gladius, the vestige of the ancestral shell) that stiffens the body;
- lives in the OPEN WATER, many species in SCHOOLS, and is a FAST swimmer by jet propulsion — some can even launch out of the water;
- ranges from thumb-sized to the giant and colossal squid (10+ m).

Quick check: 8 identical arms, blobby body, on the bottom = octopus; 8 arms + 2 long tentacles, sleek finned body, in open water = squid. (Cuttlefish are a third group — 8 arms + 2 tentacles like a squid, but a broad flat body and an internal chalky "cuttlebone".)`,
  ),
  k(
    'kb-gap-zoo2-jaguar-vs-leopard',
    'Jaguar vs leopard',
    [
      'difference between a jaguar and a leopard', 'jaguars are larger and more muscular and stocky with a bigger blockier head and the strongest bite of any big cat relative to size killing by piercing the skull their rosettes have spots inside the ring found in the Americas strong swimmers that love water hunting caiman fish capybara', 'leopards are more slender found in Africa and Asia more arboreal drag kills into trees more adaptable and widespread and more elusive their rosettes usually have no central spot',
    ],
    `Both are large cats with a golden coat marked in ROSETTES, and they are easy to confuse in photos — but they live on different continents and are built differently.

A JAGUAR (Panthera onca — the Americas: Amazon, Pantanal, Central America):
- is LARGER and much more MUSCULAR and STOCKY, with shorter, thicker legs and a big, BLOCKY HEAD and powerful jaws;
- has the STRONGEST BITE of any big cat relative to its size — it kills unusually by piercing straight through the SKULL between the ears, and can crack turtle shells and caiman armour;
- its ROSETTES are larger and usually contain one or more small SPOTS INSIDE the ring;
- LOVES water — it swims readily and hunts fish, caiman, capybara, and turtles as well as deer and peccary.

A LEOPARD (Panthera pardus — Africa and Asia):
- is more SLENDER and lighter, with a smaller head;
- kills by a throat bite or nape bite, like most big cats;
- its ROSETTES are smaller, packed closer, and usually have NO central spot;
- is intensely ARBOREAL — it hauls kills up into trees to keep them from lions and hyenas, and is famously secretive and adaptable, living everywhere from rainforest to desert to the edges of cities across a huge range.

Size order among the spotted cats: jaguar (up to ~100 kg) > leopard (up to ~70 kg) > cheetah (up to ~60 kg, but a totally different build with plain spots, not rosettes).`,
  ),
  k(
    'kb-gap-zoo2-dolphin-vs-porpoise',
    'Dolphin vs porpoise',
    [
      'difference between a dolphin and a porpoise', 'both are toothed whales dolphins family Delphinidae about 40 species generally larger with a prominent beak cone-shaped teeth a curved falcate dorsal fin more social and acrobatic more vocal with whistles', 'porpoises family Phocoenidae 7 species smaller mostly under 2 metres no beak a blunt rounded head spade-shaped flattened teeth a small triangular dorsal fin shyer and less acrobatic do not whistle',
    ],
    `Both are small TOOTHED WHALES (odontocetes), but they are in different families and differ consistently.

DOLPHINS (family DELPHINIDAE, about 40 species — including the bottlenose, common, spinner, and the orca):
- generally LARGER (bottlenose ~2.5-4 m);
- usually have a pronounced BEAK (rostrum);
- CONE-shaped, pointed teeth;
- a DORSAL FIN that is tall and CURVED BACK (falcate);
- highly SOCIAL, ACROBATIC (bow-riding, leaping, spinning), and very VOCAL, using whistles as well as clicks.

PORPOISES (family PHOCOENIDAE, only 7 species — harbour porpoise, Dall's porpoise, vaquita, etc.):
- SMALLER (mostly under 2 m; the vaquita is the smallest cetacean);
- NO beak — a BLUNT, rounded head;
- SPADE-shaped, flattened teeth;
- a small, TRIANGULAR dorsal fin (or almost none);
- SHYER, rarely bow-ride or leap, live in small groups, and do NOT whistle (only clicks).

Rule of thumb: bigger, beaked, whistling, showy = dolphin; smaller, blunt-faced, triangular fin, retiring = porpoise. (In the US "porpoise" is sometimes used loosely for any small dolphin, but they are genuinely distinct groups.)`,
  ),
];
