import { KnowledgeItem } from '../../types';

// Batch 141 (beekeeping) — a mostly-OK category on nexus-4b, but with several
// homonym/domain failures: "why do beekeepers use smoke" was answered about
// the smoke point of cooking oil; "requeening" as API rate limiting; "a
// laying worker" as an ant colony tactic with hormone manipulation; "a nuc /
// nucleus colony" as pheromone self-organisation; "foundation and drawn comb"
// as building foundations and wool carding. Web dump for the Langstroth hive
// (+ Langstroth Cottage), and "brood box vs honey super" got refused. Also
// beeswax was said to come from the hypopharyngeal (head) gland.
export const BEEKEEPING_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-bee-wax-glands',
    title: 'How Bees Make Beeswax',
    category: 'Beekeeping',
    keywords: [
      'how do bees make beeswax and what is it used for wax glands',
      'worker bees secrete beeswax from four pairs of wax glands on the underside of their abdomen on the last four segments not from the hypopharyngeal glands in the head which make royal jelly and brood food',
      'young workers about 12 to 18 days old that have gorged on honey convert the sugar to wax the wax oozes out as tiny clear flakes scales the bee passes them forward to her mandibles chews and warms them and adds them to the comb',
      'making wax is metabolically expensive bees eat roughly 6 to 8 kg of honey to produce 1 kg of wax used to build the hexagonal comb cap ripe honey cells cap brood cells and seal small gaps',
    ],
    content: `Beeswax is secreted by worker bees from eight WAX GLANDS — four pairs on the underside of the abdomen, on the last four visible segments (sternites 4–7). (It does NOT come from the hypopharyngeal glands, which are in the head and produce royal jelly and larval food.) The wax-producing workers are young adults, roughly 12–18 days old, at the "wax-building" stage of their lives; they cluster and gorge on honey, and their bodies convert the sugars into wax. The wax emerges through pores as tiny, thin, colourless, translucent flakes ("scales") about 3 mm across. The bee reaches back with her legs, passes a scale forward to her mandibles, chews and warms it (working in warm hanging chains of bees that keep the comb-building area near 35°C so the wax stays plastic), and presses it onto the growing comb, where many bees together shape the precise hexagonal cells. Wax is expensive to make — a colony must consume roughly 6–8 kg of honey to secrete 1 kg of wax — which is why "drawn comb" that bees have already built is so valuable to a beekeeper. Uses in the hive: building all the hexagonal comb (for brood, pollen, and honey), capping ripe honey cells with an airtight lid, capping brood cells (with a porous wax-and-pollen cap), and sealing small cracks (larger gaps and rough surfaces are sealed with propolis instead). Harvested beeswax is used for candles, cosmetics, food wraps, polishes, and cosmetics.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-langstroth',
    title: 'The Langstroth Hive',
    category: 'Beekeeping',
    keywords: [
      'what is a langstroth hive and how is it structured bee space movable frame',
      'the standard modern beehive a vertically stacked stack of open topped and bottomed rectangular boxes each holding a row of removable wooden or plastic frames hung from a rebate the bees build comb inside the frames so any frame can be lifted out and inspected',
      'it works because of the bee space the roughly 6 to 9 mm gap that bees leave as a walkway and neither fill with comb nor glue shut with propolis langstroth patented it in 1852 every part is spaced a bee space apart so it comes apart cleanly',
      'from the bottom up a bottom board with the entrance one or more deep brood boxes an optional queen excluder shallow or medium honey supers an inner cover and a weatherproof telescoping or migratory outer cover',
    ],
    content: `The Langstroth hive is the dominant hive design worldwide and the basis of commercial beekeeping. It is a vertically modular stack of rectangular boxes, open at top and bottom, each holding a row of removable frames (usually 8 or 10) that hang from a ledge (rebate) inside the box. The bees build their comb within the wooden or plastic frames rather than attaching it to the box walls, so every frame can be individually lifted out, inspected, moved, or replaced without destroying the comb — this is what made modern hive management, disease inspection, and non-destructive honey harvesting possible. The design works because of "BEE SPACE": Rev. Lorenzo Langstroth's 1851 observation (patented 1852) that bees leave a gap of about 6–9 mm as a passageway — they do not fill a bee space with comb, and they do not glue it shut with propolis — but they DO build comb across a gap larger than that and propolise a gap smaller than that. Every surface in a Langstroth hive is separated from the next by one bee space, so the whole thing comes apart cleanly. Structure, bottom to top: a BOTTOM BOARD with the hive entrance and a landing board; one or two deep BROOD BOXES (also "deeps" or "hive bodies") where the queen lays; an optional QUEEN EXCLUDER; then HONEY SUPERS (usually shallower "mediums" or "shallows" so a full one isn't too heavy to lift) for surplus honey; an INNER COVER (with a ventilation/feed hole); and a weatherproof OUTER COVER (a "telescoping" lid that overlaps the top box, or a flat "migratory" lid). Boxes are added ("supering") as the colony grows and removed for winter. Other hive types: the horizontal top-bar hive and the Warré hive (both foundationless), the National hive (UK), and the flow hive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-brood-super',
    title: 'Brood Box vs Honey Super',
    category: 'Beekeeping',
    keywords: [
      'what is a brood box vs a honey super beehive',
      'the brood box is the deep box or two at the bottom of the hive where the queen lays her eggs and the colony raises its young brood and stores the pollen and the honey it needs for itself the beekeeper leaves this for the bees and does not harvest it',
      'a honey super is a box usually shallower placed on top often above a queen excluder that the beekeeper adds so the bees have somewhere to store surplus honey that can then be harvested super means over or above',
      'keeping brood below and surplus honey above with an excluder in between means the harvested honey frames are clean with no brood or larvae in them',
    ],
    content: `In a Langstroth-style hive the boxes are used for two different purposes. The BROOD BOX (or "brood chamber," "brood nest," "hive body") is the deep box — sometimes two stacked "brood doubles" — at the bottom of the hive. This is where the queen lays eggs and the colony rears its brood (eggs, larvae, pupae), stores pollen ("bee bread") close to the brood, and keeps the honey reserves it needs to feed itself and survive winter. The beekeeper leaves the brood box for the bees and does not harvest from it — taking a colony's own brood-nest honey can starve it. A HONEY SUPER (from Latin "super," meaning above/over) is a box, usually a shallower one so that a full one is liftable (a full deep of honey weighs ~40 kg), that the beekeeper places ON TOP of the brood box or boxes, often with a queen excluder between them. Supers are added ("supering up") when the colony is strong and the nectar flow is on, giving the bees empty comb to fill with SURPLUS honey — the amount over and above what the colony needs. This surplus is what the beekeeper harvests, by removing the supers, uncapping the frames, and extracting the honey (usually by centrifuge). With the queen confined below the excluder, the super frames stay free of brood, so the harvested honey is clean.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-foundation-comb',
    title: 'Foundation and Drawn Comb',
    category: 'Beekeeping',
    keywords: [
      'what is foundation and drawn comb beekeeping frames',
      'foundation is a thin flat sheet of beeswax or plastic embossed on both sides with the hexagonal cell pattern that is fitted into an empty frame it gives the bees a straight guide and a starting surface so they build even flat comb aligned in the frame instead of wavy cross comb this has nothing to do with a building foundation',
      'drawn comb is a frame in which the bees have already built the foundation or an empty starter strip out into full three dimensional comb with cells on both sides ready to be used for brood or filled with honey',
      'drawn comb is the single most valuable thing in a beekeepers store because making wax costs the colony 6 to 8 kg of honey per kg of wax giving a swarm or a new hive drawn comb rather than bare foundation can advance it by weeks',
    ],
    content: `FOUNDATION is a thin, flat sheet — pure beeswax, wax-coated plastic, or all plastic — that is machine-embossed on both faces with the raised outline of the hexagonal worker-cell pattern. It is mounted inside an otherwise empty wooden or plastic frame (held by wires, pins, or the frame's own channel). Its job is to give the bees a straight, centred, correctly spaced starting surface and a pattern to follow, so they build flat comb that sits neatly in the plane of the frame and can be lifted out, rather than building wavy comb, "cross comb" between frames, or too many drone cells. (It has nothing to do with a building's foundation — that was a homonym error, as was "carding and combing wool.") "Foundationless" beekeeping uses just a thin starter strip or a comb guide and lets the bees build their own cell sizes. DRAWN COMB is a frame in which the bees have already "drawn out" the foundation (or a starter strip, or a bare frame) into finished, three-dimensional comb — full-depth hexagonal cells on both sides — ready to be laid in by the queen or filled with nectar and honey. Drawn comb is prized because, as above, secreting the wax to build it costs the colony roughly 6–8 kg of honey per kg of wax and diverts young bees from other work; so a beekeeper who can give a swarm, split, or package colony frames of drawn comb instead of bare foundation gets it productive weeks sooner. Beekeepers hoard, protect (from wax moth and mice), and reuse drawn comb for years, rotating out only old, dark, or diseased comb.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-smoke',
    title: 'Why Beekeepers Use Smoke',
    category: 'Beekeeping',
    keywords: [
      'why do beekeepers use smoke on bees smoker',
      'smoke calms a colony so it can be opened and inspected with far fewer stings this is about bee behaviour not the smoke point of cooking oil',
      'it works two ways first smoke triggers a feeding response the bees think the hive may be about to burn and gorge themselves on honey a full bee is docile and physically less able to curl its abdomen to sting second smoke masks the alarm pheromones mainly isopentyl acetate that guard bees release when the hive is disturbed so the alarm signal does not spread and recruit more defenders',
      'the beekeeper puffs a little cool white smoke into the entrance waits about 30 seconds then a puff under the lid as it is lifted fuel is dry natural material pine needles burlap wood shavings the smoke must be cool not hot',
    ],
    content: `Beekeepers use a "smoker" — a metal firebox with a bellows that produces a stream of cool smoke from smouldering natural fuel — to calm a colony before and during an inspection, dramatically reducing stings. (This has nothing to do with the "smoke point" of cooking oils.) Smoke works in two ways. (1) FEEDING RESPONSE: smoke is an ancient signal of a forest fire, and it triggers the bees to prepare to abandon the hive by gorging themselves on honey from the comb. A bee with a full honey crop is distended, docile, and physically far less able to flex its abdomen into the curl needed to sting. (2) MASKING ALARM PHEROMONE: when a hive is opened and bees are jostled or crushed, guard and disturbed bees release alarm pheromones — chiefly isopentyl (isoamyl) acetate, which smells of bananas, plus 2-heptanone — that recruit nestmates to defend and mark the intruder as a target. Smoke interferes with the bees' ability to detect these odours, so the alarm doesn't spread and escalate. Technique: a few gentle puffs into the entrance, then wait ~30 seconds for it to take effect, then a light puff across the top bars as the cover is lifted, and occasional puffs to move bees off an area or down between frames. Good smoke is COOL, white, and copious; hot smoke or flames harm the bees. Common fuels: pine needles, dry grass, wood shavings or pellets, burlap/hessian, dried cow dung, punk wood.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-nuc',
    title: 'What a Nuc (Nucleus Colony) Is',
    category: 'Beekeeping',
    keywords: [
      'what is a nuc or nucleus colony beekeeping',
      'a nuc is a small complete working miniature honey bee colony usually 3 to 5 frames in a small box containing a laying queen frames of brood at all stages nurse and other worker bees and frames of pollen and honey stores',
      'it is a self contained functioning unit not a pheromone command centre and not the area around the queen it is scaled down but has everything a full colony has',
      'uses buying a nuc is the easiest way to start a hive because it is already established with drawn comb and brood beekeepers also make nucs to increase colony numbers to hold a spare mated queen to requeen a hive to catch a swarm impulse split and to overwinter small colonies',
    ],
    content: `A "nuc" (nucleus colony, nucleus hive) is a small but complete and fully functioning honey bee colony — a colony in miniature. A standard nuc is 3 to 5 frames housed in a small box ("nuc box") and contains everything a full hive has, just scaled down: a laying QUEEN, frames of BROOD in all stages (eggs, open larvae, capped pupae), plenty of young NURSE bees plus foragers and house bees, and frames of stored POLLEN and HONEY. (It is not a "control centre," and "nucleus" does not mean the area immediately around the queen — the whole small unit is the nucleus.) Uses: (1) STARTING A HIVE — buying a nuc is the most reliable way for a beginner to start, because unlike a "package" (a screened box of loose bees plus a caged queen) it is already an established, laying, brood-rearing unit with drawn comb, so it builds up fast. (2) MAKING INCREASE — an established beekeeper pulls frames of brood and bees from strong hives to create new nucs and grow their apiary. (3) HOLDING A SPARE QUEEN — a mated queen kept alive in a nuc is insurance against a hive going queenless. (4) REQUEENING — a laying queen in a nuc can be united with a hive whose queen has failed. (5) SWARM CONTROL — splitting a swarmy hive into a nuc relieves the crowding. (6) OVERWINTERING — small nucs can be wintered (often stacked or in a "queen bank") to have colonies ready in spring. A nuc that outgrows its box is simply transferred, frames and all, into a full-size hive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-requeening',
    title: 'Requeening a Colony',
    category: 'Beekeeping',
    keywords: [
      'what is requeening and why is it done beekeeping',
      'requeening is deliberately replacing a honey bee colonys queen with a different younger or better bred queen this is a beekeeping practice not api rate limiting',
      'reasons the old queen is failing laying poorly spotty brood pattern running low on stored sperm or has become a drone layer the colony is too defensive aggressive or too swarmy and you want calmer more productive genetics you want mite tolerant or disease resistant stock or simply routine replacement every one to two years to keep egg laying at its peak',
      'method find and remove the old queen wait a few hours then introduce the new queen in a candy plugged cage so the workers eat through over two to four days and accept her pheromone releasing her too soon or into a colony with laying workers or a hidden virgin usually gets her killed alternatively let the colony raise its own from an introduced queen cell',
    ],
    content: `Requeening is the deliberate replacement of a colony's queen with a new one — normally a young, mated queen of chosen genetics. (It is a beekeeping term and has nothing to do with "queuing" or API rate limiting.) Reasons to requeen: (1) THE QUEEN IS FAILING — she is old (queens can live 3–5 years but lay best in their first two), her laying is sparse or erratic, the brood pattern is "spotty" or "shotgun" (many empty cells), she is running out of the sperm she stored on her single mating flight and starting to lay unfertilised (drone) eggs in worker cells, or she has become a full "drone layer." (2) TEMPERAMENT / BEHAVIOUR — the colony is excessively defensive/aggressive (a real safety issue, and often africanised genetics), overly prone to swarming, or a poor honey producer, and you want to swap in gentler, more productive stock. (3) GENETICS — to bring in varroa-resistant or hygienic (disease-resistant) lines, or local survivor stock. (4) ROUTINE — many keepers requeen every one or two years as insurance and to keep egg-laying vigorous. METHOD: locate and kill the old queen; leave the colony queenless for a few hours to a day so it "notices"; then introduce the new queen inside a small cage whose exit is plugged with sugar candy — the workers chew through it over 2–4 days, during which they get used to her pheromone and accept rather than kill her. Direct release, or introducing a queen while a virgin queen, queen cells, or laying workers are present, usually ends with the new queen "balled" and killed. Alternatively the colony can be given a ripe queen cell and left to raise and mate its own.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-laying-worker',
    title: 'Laying Workers',
    category: 'Beekeeping',
    keywords: [
      'what is a laying worker honey bee queenless colony',
      'when a honey bee colony has been without a queen and without any young brood for two to three weeks and cannot raise a replacement the pheromones that normally suppress the workers ovaries fade and some workers ovaries develop and they begin laying eggs this is a honey bee problem not an ant colony tactic',
      'workers never mate so their eggs are all unfertilised and hatch only into drones the colony cannot recover on its own and slowly dwindles as its population ages out and is replaced only by useless drones',
      'diagnostic signs multiple eggs per cell often several stuck to the cell walls rather than centred on the base scattered patchy drone brood in worker sized cells and bullet shaped raised cappings a laying worker hive is very hard to requeen and usually the frames must be shaken out well away from the hive',
    ],
    content: `A "laying worker" is a worker honey bee whose ovaries have developed and who has started laying eggs. It happens when a colony has been QUEENLESS for a prolonged period — typically two to three weeks — AND has no eggs or young larvae left from which to raise an emergency queen. Normally the queen's pheromone (queen mandibular pheromone) and "open brood pheromone" suppress the workers' ovary development; when both disappear for long enough, that suppression lifts and a number of workers (in a bad case, dozens or hundreds) begin to lay. (This is a specific honey-bee failure mode; it is not an ant-colony reproductive tactic and does not involve hormone manipulation by another individual.) The problem: worker bees never mate, so every egg a laying worker produces is UNFERTILISED, and unfertilised honey-bee eggs develop only into DRONES (males). The colony therefore raises nothing but drones, its worker population keeps ageing and dying without replacement, and it inevitably dwindles and dies. Diagnostic signs on the comb: MULTIPLE eggs in a single cell (a real queen lays exactly one, centred on the cell base; laying workers lay several, often on the cell walls because their abdomens are too short to reach the bottom); a scattered, patchy area of drone brood in normal worker-sized cells; and raised, domed, "bullet" cappings on that brood. Fixing it is difficult — a laying-worker colony almost always kills any queen you try to introduce. Common remedies: carry every frame ~50–100 m from the hive and shake all the bees off into the grass (the flightless laying workers can't return; the fliers do and will then accept a new queen or cell), or simply combine the salvageable brood and bees with a strong queenright colony over newspaper.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-swarming',
    title: 'Swarming and Why Bees Swarm',
    category: 'Beekeeping',
    keywords: [
      'what is swarming and why do bees swarm honey bee reproduction',
      'swarming is how a honey bee colony reproduces at the level of the whole colony the old queen leaves the hive with roughly half to two thirds of the workers in a flying cloud and they do not come back they cluster temporarily on a branch while scout bees search for a permanent new nest cavity then fly to it',
      'the original hive is left with the remaining bees plenty of stores and several capped queen cells one of the new virgin queens emerges kills her rivals takes a mating flight and becomes the new laying queen so one colony has become two',
      'triggers a strong colony running out of room to store honey and for the queen to lay congestion of young bees good spring nectar flow and warm weather beekeepers prevent it by adding space early doing splits and cutting queen cells',
    ],
    content: `Swarming is honey bees' method of colony-level reproduction — the way one colony becomes two. When a healthy colony decides to swarm, it first raises a batch of new queens (building 5–20 vertical "swarm cells," usually along the bottom edges of frames). Then, shortly before or as the first of those queen cells is capped, the OLD queen leaves the hive with roughly half to two-thirds of the adult workers, pouring out in a great flying cloud. This swarm does NOT return to the parent hive. It settles nearby — hanging in a beard-shaped cluster on a branch, fence, or wall for anywhere from an hour to a few days — while "scout" bees fly out, find candidate nest cavities (a hollow tree, a wall void, a chimney, an empty hive), assess them, and campaign for their choice by dancing; when a quorum agrees, the whole cluster lifts off and flies to the new home. The parent hive is left with the remaining workers, all the stores, and the capped queen cells; the first virgin queen to emerge destroys her unhatched rivals (or the colony may "afterswarm" with a virgin if still crowded), takes her mating flight(s), and becomes the new laying queen. So both halves survive as separate colonies. Triggers: a strong, populous colony that is running out of room — no empty comb for the queen to lay in, no space to store an incoming nectar flow, and an excess of idle young "nurse" bees — combined with spring, a good nectar flow, and warm weather; genetics and an ageing queen also play a part. Beekeepers reduce swarming by giving space early (adding supers and drawn comb), reversing brood boxes, making pre-emptive splits/nucs, and inspecting weekly in spring to find and manage queen cells.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bee-types',
    title: 'Honey Bees vs Bumblebees vs Solitary Bees',
    category: 'Beekeeping',
    keywords: [
      'what is the difference between honey bees and bumblebees and solitary bees',
      'all bees belong to the clade anthophila within the order hymenoptera which also contains wasps and ants bees are essentially wasps that switched to feeding their young on pollen and nectar there are about 20000 bee species',
      'honey bees genus apis live in large perennial colonies of tens of thousands that survive winter as a heat producing cluster on stored honey they reproduce by swarming and only the honey bee WORKER has a barbed sting that tears out and kills her',
      'bumblebees genus bombus are social but ANNUAL only the new mated queen overwinters and starts a fresh nest each spring building to a few dozen to a few hundred bees then dying out in autumn they are large furry buzz pollinators and can sting repeatedly solitary bees about 90 percent of all bee species mason leafcutter mining each female builds and stocks her own small nest with no workers and no honey and most rarely or cannot sting',
    ],
    content: `All bees form the clade Anthophila within the insect order Hymenoptera (which also holds the wasps and ants) — bees evolved from predatory wasps that switched to provisioning their offspring with pollen and nectar instead of paralysed prey, and gained branched body hairs and pollen-carrying structures. There are roughly 20,000 species. HONEY BEES (genus Apis, ~8 species; the domesticated one is Apis mellifera) live in large PERENNIAL colonies of 20,000–60,000+ individuals that persist year after year, surviving winter by forming a tight cluster and shivering to keep the centre warm, fuelled by tens of kilograms of stored honey. One queen, thousands of sterile female workers, and seasonal male drones. They reproduce as a colony by SWARMING. Only the honey bee WORKER has a barbed sting that lodges in mammalian skin and tears out of her abdomen, killing her (the queen's sting is smooth and reusable). BUMBLEBEES (genus Bombus, ~250 species) are also social but their colonies are ANNUAL: in spring a single mated queen that overwintered alone founds a small nest (often in an old mouse hole), rears the first workers herself, and the colony grows to only a few dozen to a few hundred bees over the summer, produces new queens and males, and then everyone except the newly mated queens dies in autumn. Bumblebees are large, round, and furry, are effective in cool and dull weather, "buzz-pollinate" (sonicate) flowers like tomatoes, do not hoard surplus honey, and can sting repeatedly (smooth sting). SOLITARY BEES make up ~90% of species — mason bees, leafcutter bees, mining/digger bees, carpenter bees, and many more. Each female builds and provisions her OWN nest (a burrow in the ground, a hollow stem, a beetle hole, a snail shell), lays her eggs on pollen-nectar stores, seals the cells, and dies; there are no workers, no cooperation, and no honey. Many are extremely efficient pollinators, active for only a few weeks, and most are docile — they rarely sting and many are too small to pierce skin.`,
    createdAt: Date.now(),
  },
];
