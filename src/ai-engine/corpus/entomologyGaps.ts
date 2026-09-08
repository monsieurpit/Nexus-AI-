import { KnowledgeItem } from '../../types';

// Batch 113 (entomology) — weak area, no dedicated insect corpus. Errors and
// web dumps on nexus-4b: "how is a bee colony organized" said the queen lays
// eggs for "workers and soldiers" and then described ants; "which insects
// pollinate" and "why are insect populations declining" and "how do
// cockroaches survive" were raw web dumps; "colony collapse disorder" got a
// flat non-answer ("the context doesn't say"); "why do moths fly toward light"
// said their wing patterns mimic stars via iridescence; "invasive insect
// species" gave zebra mussels (a mollusk) as the example; "wasp bee hornet"
// never actually explained bee vs wasp.
export const ENTOMOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-bee-colony-organization',
    title: 'How a Honeybee Colony Is Organized',
    category: 'Entomology',
    keywords: [
      'how is a bee colony organized and what are the roles', 'one queen the only fertile female lays up to 2000 eggs a day produces pheromones that regulate the hive',
      'tens of thousands of sterile female workers age-based jobs cleaning nursing building comb guarding then foraging', 'a few hundred male drones only job is to mate with a virgin queen then die expelled before winter',
      'no commander coordination via pheromones and simple local rules honeybees do not have soldiers',
    ],
    content: `A honeybee colony has three kinds of bee. The QUEEN is the single fertile female. She does not command anything; her job is to lay eggs — up to about 2,000 a day in summer — and to release pheromones ("queen substance") that spread through the hive by contact and tell the workers she is alive and healthy, suppressing their ovaries and holding the colony together. The WORKERS are tens of thousands of sterile females and do everything else. They move through a sequence of jobs as they age: the first days cleaning cells, then feeding larvae ("nurse bees"), then building and repairing wax comb, handling incoming nectar, and guarding the entrance, and finally — for the last two or three weeks of a ~6-week summer life — foraging outside for nectar, pollen, water and resin. The DRONES are a few hundred males; their only function is to fly out and mate with a virgin queen from another colony (dying in the act), and they are driven out of the hive to die when food gets scarce in autumn. There is no central controller — the colony self-organises through pheromones and simple rules each bee follows locally. (Honeybees have no "soldier" caste; that terminology belongs to ants and termites.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-colony-collapse-disorder',
    title: 'What Colony Collapse Disorder Is',
    category: 'Entomology',
    keywords: [
      'what is colony collapse disorder in bees', 'ccd the adult worker bees of a hive abruptly abandon it leaving the queen brood and food stores behind with few dead bees found nearby',
      'no single cause varroa destructor mite and the viruses it spreads neonicotinoid pesticides poor nutrition from monoculture nosema parasite transport stress', 'notably 2006 to 2013 in the us and europe reported cases have declined since',
      'overall honeybee colony losses of 30 to 40 percent a year continue wild bee decline is a separate bigger concern',
    ],
    content: `Colony collapse disorder (CCD) is a specific pattern of honeybee die-off that drew alarm from around 2006 to 2013, especially in the United States and parts of Europe. Its signature: the adult worker bees of an apparently healthy hive suddenly vanish over a short period, leaving behind the queen, the unhatched brood, and full stores of honey and pollen — and, tellingly, very few dead bees in or near the hive, as if the foragers simply flew off and never came back. Extensive investigation never pinned down a single cause; the consensus is that it results from several stresses acting together: the parasitic Varroa destructor mite and the deforming viruses it transmits, exposure to neonicotinoid and other pesticides, poor nutrition where bees forage on vast single-crop monocultures, the gut fungus Nosema, and the stress of trucking hives long distances for commercial pollination. Reports of classic CCD have fallen since the early 2010s, but beekeepers still lose roughly 30-40% of their colonies each year (made up by splitting surviving hives), and the decline of wild, non-managed bees and other pollinators is a larger and less reversible problem.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-moths-fly-toward-light',
    title: 'Why Moths Fly Toward Light',
    category: 'Entomology',
    keywords: [
      'why do moths fly toward light', 'dorsal light response moths keep their back toward the brightest light source normally the sky to stay upright and level',
      'an artificial point light close by makes them constantly bank and turn to keep their back to it trapping them in a spiral around the light', 'they are not attracted to the light they are disoriented by it',
      'older transverse orientation navigate by the moon hypothesis now considered less likely', 'not caused by wing iridescence mimicking stars',
    ],
    content: `Moths are not "attracted" to lights in the sense of wanting to reach them — they are disoriented by them. The best-supported explanation (from high-speed flight studies published in 2024) is the "dorsal light response": flying insects keep their back (dorsal surface) pointed toward the brightest part of their surroundings, which in nature is the sky, and this keeps them upright and flying level. A bright artificial light close to the ground hijacks that reflex: to keep its back turned toward the lamp, the moth constantly banks and rolls, ending up circling, climbing, or diving around the light in a trap it cannot fly out of. The older idea — that moths navigate by keeping a constant angle to the distant Moon and that a nearby light throws off that angle ("transverse orientation") — is now considered less likely. It has nothing to do with wing patterns, iridescence, or mimicking stars.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fireflies-produce-light',
    title: 'How Fireflies Produce Light',
    category: 'Entomology',
    keywords: [
      'how do fireflies produce light', 'bioluminescence in a light organ on the underside of the abdomen the enzyme luciferase acts on luciferin with oxygen atp and magnesium',
      'cold light almost no heat nearly 100 percent efficient', 'the flash is controlled by regulating oxygen delivery to the light cells via the tracheae and nitric oxide', 'each species has a species-specific flash pattern for courtship',
      'photuris femme fatale fireflies mimic other species signals to lure and eat the males',
    ],
    content: `A firefly's light comes from a bioluminescent organ on the underside of the last few abdominal segments. Inside, the enzyme luciferase catalyses a reaction on the molecule luciferin, using oxygen, ATP and magnesium ions; the reaction releases energy almost entirely as light rather than heat, making it "cold light" close to 100% efficient (a normal incandescent bulb wastes most of its energy as heat). The firefly turns the glow on and off very precisely, not by controlling the chemistry directly but by controlling how much oxygen reaches the light cells through its tracheal tubes, with nitric oxide acting as the fast switch. Each species has its own flash "code" — a characteristic colour, number of pulses, pulse length and interval — that males and females use to recognise and signal to each other at dusk. Predatory female fireflies of the genus Photuris ("femme fatale" fireflies) exploit this by mimicking the answering flash of other firefly species, luring in the responding males and eating them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pollinators-importance',
    title: 'Why Pollinators Matter and Which Insects Pollinate',
    category: 'Entomology',
    keywords: [
      'why are pollinators important and which insects pollinate', 'pollinators move pollen between flowers enabling fruit and seed production', 'about 75 percent of leading food crops and 35 percent of global food volume depend at least partly on animal pollination apples almonds berries squash coffee cocoa',
      'main insect pollinators bees honeybees bumblebees and thousands of wild solitary bee species plus hoverflies butterflies moths beetles some wasps', 'wind pollinates grasses and grains',
      'pollinator decline threatens food security and wild plant reproduction',
    ],
    content: `Pollination is the transfer of pollen from a flower's male parts to the female parts of the same or another flower, which is what lets the plant set fruit and seed. Many flowering plants can't do it without help, and animals — mostly insects — do most of that work. About three-quarters of the world's leading food crops benefit from animal pollination, and roughly a third of global food volume depends on it to some degree: apples, almonds, blueberries and most berries, squashes and melons, tomatoes, coffee, cocoa, and canola all yield far more (or only) with pollinators. Staple grains (wheat, rice, corn) are wind-pollinated and don't need them. The most important insect pollinators are bees: managed honeybees, wild bumblebees, and about 20,000 species of wild solitary bees, some of them far more efficient per visit than honeybees. Also significant are hoverflies, butterflies and moths (including night-pollinating moths), many beetles, and some wasps and ants; hummingbirds and bats pollinate too. The widespread decline of these pollinators is therefore a direct threat to both crop yields and the reproduction of wild plants that feed the rest of an ecosystem.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-grasshopper-cricket-locust',
    title: 'Grasshopper vs Cricket vs Locust',
    category: 'Entomology',
    keywords: [
      'what is the difference between a grasshopper cricket and locust', 'grasshoppers short horned short antennae day active plant eating sing by rubbing hind leg against wing suborder caelifera',
      'crickets and katydids long horned long antennae often night active omnivorous sing by rubbing the two forewings together suborder ensifera', 'all are in the order orthoptera and are related',
      'locusts are not a separate group they are certain grasshopper species that switch to a swarming gregarious phase at high density desert locust',
    ],
    content: `All three are in the order Orthoptera and are related, but grasshoppers and crickets sit in two different suborders. GRASSHOPPERS are "short-horned" — short antennae — belong to the suborder Caelifera, are active by day, feed on plants, and produce sound (in the species that do) by scraping a row of pegs on the hind leg against a forewing. CRICKETS, and their close relatives the katydids, are "long-horned" — antennae as long as or longer than the body — belong to the suborder Ensifera, are often active at night, are usually omnivorous (seeds, plants, other insects), and sing by rubbing their two forewings together, one with a file, one with a scraper. LOCUSTS are not a separate kind of insect at all: they are particular grasshopper species (most famously the desert locust, Schistocerca gregaria) that have a density-dependent "phase change." Living alone at low density they are a drab, shy "solitary" form; when crowding forces them together, they change colour, behaviour and body shape within a generation into a brightly marked, mutually attracted "gregarious" form that bands together into the vast, crop-destroying swarms of the biblical plagues.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cockroach-survival',
    title: 'Why Cockroaches Survive So Well',
    category: 'Entomology',
    keywords: [
      'how do cockroaches survive so well', 'generalist omnivores eat almost any organic matter glue hair paper survive weeks without food about a week without water',
      'flattened body squeezes into tiny cracks run very fast sense air movement via cerci for predator escape', 'reproduce fast egg case ootheca with dozens of eggs rapidly evolve pesticide resistance and glucose aversion to avoid baits',
      'can survive some time without a head breathe through spiracles distributed nervous system until they dehydrate', 'only about 30 of 4600 species are pests',
    ],
    content: `Cockroaches are extreme generalists. They eat essentially any organic matter — food scraps, grease, glue, paper, soap, hair, and each other — and can go weeks without food and about a week without water. Their flat, flexible bodies let them squeeze through cracks as thin as a coin's edge, and they are among the fastest-running insects, with two rear sensory appendages (cerci) that detect the tiny air movement of an approaching foot or hand and trigger an escape sprint in a few milliseconds. They breed fast: a female produces egg cases ("oothecae") each holding a few dozen eggs. They tolerate cold, high radiation doses, and low oxygen far better than most animals, and they evolve resistance to insecticides quickly — German cockroaches have even evolved "glucose aversion," refusing sweet bait. The famous claim that a cockroach can live without its head is partly true: it breathes through body spiracles rather than its mouth and has a decentralised nervous system, so a headless cockroach can survive for a week or more until it dies of dehydration because it can't drink. Only about 30 of the roughly 4,600 cockroach species are household pests; most live in forests and leaf litter.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wasp-bee-hornet',
    title: 'Bee vs Wasp vs Hornet',
    category: 'Entomology',
    keywords: [
      'what is the difference between a wasp bee and hornet', 'bees vegetarian feed larvae pollen and nectar hairy fuzzy branched hairs carry pollen most sting once barbed sting honeybees die',
      'wasps predators or scavengers feed larvae insects or carrion smooth slender narrow waist little hair can sting repeatedly', 'hornets are simply the largest social wasps genus vespa european hornet asian giant hornet murder hornet',
      'all bees wasps and hornets are in the order hymenoptera', 'bees evolved from predatory wasps that switched to pollen',
    ],
    content: `All three are in the order Hymenoptera, and bees actually evolved from wasps. The key split is diet. BEES are vegetarians: they feed their larvae on pollen and nectar, so they are built to gather pollen — fuzzy bodies with branched hairs, often pollen baskets on the legs. They are generally not aggressive away from the hive; a honeybee's sting is barbed and tears loose when used, killing the bee (bumblebees and solitary bees can sting repeatedly). WASPS are predators and scavengers: they feed their larvae chewed-up insects or carrion (which makes them useful pest controllers), while the adults drink nectar and sugary liquids (why they bother you at a picnic in late summer). They have smooth, shiny, slender bodies with a pinched "wasp waist," little hair, and a smooth stinger they can use many times. HORNETS are not a separate thing — they are simply the largest kinds of social wasp, in the genus Vespa, such as the European hornet and the Asian giant hornet (the so-called "murder hornet"). They build large paper nests and defend them fiercely, but away from the nest they are no more aggressive than other wasps.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-invasive-insects',
    title: 'What an Invasive Insect Species Is (with Examples)',
    category: 'Entomology',
    keywords: [
      'what is an invasive insect species and give examples', 'an insect introduced usually accidentally via trade and travel outside its native range that establishes and harms ecosystems agriculture or infrastructure',
      'harmful because its natural predators parasites and diseases are absent', 'emerald ash borer spotted lanternfly asian longhorned beetle brown marmorated stink bug red imported fire ant argentine ant asian tiger mosquito spongy gypsy moth',
      'zebra mussel is a mollusk not an insect',
    ],
    content: `An invasive insect is a species carried — almost always accidentally, in cargo, packing wood, plants, soil, or on vehicles — beyond its native range, where it establishes a breeding population and causes ecological or economic harm. It thrives because the predators, parasitic wasps, and diseases that kept it in check at home are absent. Notable examples in North America and Europe: the emerald ash borer, a beetle from Asia that has killed hundreds of millions of ash trees; the spotted lanternfly, a planthopper damaging vineyards and orchards; the Asian longhorned beetle, which kills hardwood trees; the brown marmorated stink bug, a major crop pest and household nuisance; the red imported fire ant and the Argentine ant, which displace native ants and other wildlife; the Asian tiger mosquito, which spreads dengue, Zika and chikungunya; and the spongy moth (formerly "gypsy moth"), which defoliates forests. (The zebra mussel, often cited as an invasive species, is a mollusk, not an insect.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-insects-survive-winter',
    title: 'How Insects Survive Winter',
    category: 'Entomology',
    keywords: [
      'how do insects survive winter', 'diapause a hormonally programmed dormancy not just cold torpor', 'overwintering as a specific life stage egg larva pupa or adult depending on species',
      'freeze avoidance antifreeze compounds glycerol and antifreeze proteins supercool body fluids below zero without ice', 'freeze tolerance some survive their body fluids actually freezing controlling where ice forms',
      'migration monarch butterflies to mexico sheltering under bark leaf litter soil or buildings honeybees cluster and shiver to keep the hive at 35 celsius',
    ],
    content: `Insects use several strategies, often in combination. Most enter DIAPAUSE, a hormonally programmed dormant state (triggered in advance by shortening day length, not just by cold) in which development halts and metabolism drops far below simple cold torpor. Each species overwinters at a particular life stage — as eggs (many grasshoppers), larvae (woolly bear caterpillars), pupae (many moths and butterflies), or adults (mourning cloak butterflies, ladybugs, some bees). To handle the cold itself, some are FREEZE-AVOIDANT: they flush their tissues with antifreeze compounds such as glycerol and special "antifreeze proteins" that let their body fluids supercool well below 0°C without ice crystals forming. Others are FREEZE-TOLERANT: they allow their body fluids to freeze in a controlled way, seeding ice in safe extracellular spaces so it doesn't rupture their cells. Many simply shelter in insulated microhabitats — under bark, deep in leaf litter, in soil below the frost line, in galls, or inside human buildings. Some migrate out of the cold entirely (monarch butterflies to central Mexico). Honeybees stay active: the whole colony clusters into a ball and the workers shiver their flight muscles to hold the centre near 35°C all winter, taking turns on the cold outside.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-insect-decline',
    title: 'Why Insect Populations Are Declining and Why It Matters',
    category: 'Entomology',
    keywords: [
      'why are insect populations declining and why does it matter', 'studies since the 2010s report widespread declines the german nature reserve study found about 75 percent flying insect biomass loss over 27 years the windshield phenomenon',
      'drivers habitat loss and agricultural intensification the biggest pesticides especially neonicotinoids light pollution climate change invasive species disease', 'data are patchy and geographically biased mostly europe and north america',
      'insects pollinate crops and wild plants are the base of food webs for birds fish amphibians recycle nutrients control pests aerate soil a collapse cascades through whole ecosystems',
    ],
    content: `Since the 2010s a series of studies has reported steep declines in insect abundance and diversity in monitored areas — most influentially a German study across 63 nature reserves that found flying-insect biomass had dropped about 75% over 27 years — matching the everyday "windshield phenomenon," fewer bugs splattered on cars than decades ago. The evidence is real but uneven: long-term monitoring is concentrated in Europe and North America, some groups (freshwater insects in cleaned-up rivers) are recovering, and global figures carry wide uncertainty. The main drivers, roughly in order: loss and fragmentation of habitat, especially the conversion of diverse landscapes to intensive monoculture farming; pesticides, particularly neonicotinoids; light pollution (which disrupts nocturnal insects); climate change; invasive species; and disease. It matters because insects are load-bearing for ecosystems: they pollinate most flowering plants including many crops, they are the primary food of most freshwater fish, most amphibians and reptiles, and huge numbers of birds and small mammals, and they decompose dung, leaf litter and carcasses and cycle those nutrients back into the soil. A large sustained decline therefore propagates upward and outward through food webs and downward into soil fertility, and directly into agricultural output.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-metamorphosis-complete-incomplete',
    title: 'Complete vs Incomplete Metamorphosis',
    category: 'Entomology',
    keywords: [
      'what is the difference between complete and incomplete metamorphosis in insects', 'incomplete hemimetabolous egg nymph adult three stages nymphs resemble small wingless adults eat the same food gradually develop wings through molts grasshoppers dragonflies true bugs cockroaches',
      'complete holometabolous egg larva pupa adult four stages larva and adult look completely different often eat different things wings develop internally during the pupa', 'beetles flies butterflies moths bees ants about 85 percent of insect species',
      'instar is the stage between two molts',
    ],
    content: `Insects grow by moulting, and they come in two developmental styles. In INCOMPLETE metamorphosis (hemimetabolous) there are three stages: egg, nymph, adult. The nymph that hatches looks like a small, wingless version of the adult, lives in the same habitat and eats the same food, and simply gets bigger through a series of moults, with wing buds enlarging externally each time until the final moult produces a winged, sexually mature adult. Grasshoppers, crickets, cockroaches, mantises, termites, true bugs, cicadas, and dragonflies (whose aquatic nymphs are an exception on habitat) develop this way. In COMPLETE metamorphosis (holometabolous) there are four stages: egg, larva, pupa, adult. The larva (a caterpillar, grub, or maggot) looks nothing like the adult, often lives somewhere different and eats different food — which reduces competition between the generations — and its whole body is then reorganised during the immobile pupal stage, with the wings and adult organs developing from internal cell clusters. Beetles, flies, butterflies and moths, bees, wasps, and ants develop this way, and this group makes up roughly 85% of all insect species. (Each stage between two moults is called an "instar.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inside-a-chrysalis',
    title: 'What Happens Inside a Chrysalis',
    category: 'Entomology',
    keywords: [
      'what is metamorphosis and what happens inside a chrysalis', 'the caterpillar digests most of its own tissues into a nutrient rich soup of cells', 'clusters of cells called imaginal discs already present in the caterpillar survive and grow into the adult wings legs eyes antennae',
      'the nervous system is largely retained moths that learned a smell as caterpillars remember it as adults', 'chrysalis is the pupa of a butterfly with a hard shell a cocoon is the silk case a moth spins around its pupa',
      'the process takes days to weeks driven by hormones',
    ],
    content: `A chrysalis is the pupa of a butterfly — a hardened case that forms when the caterpillar moults for the last time. (A cocoon is different: it is a silk envelope that a moth caterpillar spins around itself before pupating inside.) Within the chrysalis the caterpillar releases enzymes that digest most of its own body — muscle, gut, and other larval tissue — into a nutrient-rich fluid of loose cells, often described as "soup." But it is not a total blank slate: small groups of cells called imaginal discs, which were already present and set aside in the caterpillar (one pair for the wings, others for the legs, eyes, antennae, genitals), survive and now rapidly divide, feeding on the dissolved tissue, and grow into the adult structures. Much of the nervous system is retained too — experiments show a moth can remember a smell it was trained to avoid as a caterpillar. The reorganisation is driven by hormones (ecdysone and juvenile hormone) and takes anywhere from about a week to several months depending on species and temperature, after which the adult splits the case, pumps fluid into its crumpled wings, and lets them harden.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-eusociality',
    title: 'Social Insects and Eusociality',
    category: 'Entomology',
    keywords: [
      'what are social insects and eusociality', 'eusociality the three defining criteria reproductive division of labor a mostly non-reproductive worker caste overlapping generations cooperative care of young',
      'ants all bees are not eusocial but honeybees bumblebees stingless bees are wasps termites', 'haplodiploidy in hymenoptera full sisters share 75 percent of genes a hypothesis for why eusociality evolved repeatedly there',
      'termites are eusocial but diploid naked mole rats are eusocial mammals',
    ],
    content: `"Social insects" loosely means insects that live in organised colonies rather than alone. The strict scientific term is EUSOCIALITY ("true sociality"), defined by three features occurring together: (1) reproductive division of labour — most colony members are a functionally sterile worker caste and reproduction is concentrated in one or a few individuals (queens, and in termites also kings); (2) overlapping generations living together, so offspring help raise later broods; and (3) cooperative care of young that are not the carer's own. All ants and all termites are eusocial, as are the social wasps and social bees (honeybees, bumblebees, stingless bees) — though most of the ~20,000 bee species are actually solitary. A long-standing puzzle is why workers evolved to give up reproduction to help raise siblings. One influential hypothesis points to "haplodiploidy" in the Hymenoptera (ants, bees, wasps): males develop from unfertilised eggs and are haploid, which makes full sisters share about 75% of their genes rather than the usual 50%, so a female can propagate more of her genes by raising sisters than daughters. Haplodiploidy isn't the whole story (termites are diploid and eusocial, and so are the naked mole-rats, a mammal), but it shows how the maths of kin selection can favour sterile helpers.`,
    createdAt: Date.now(),
  },
];
