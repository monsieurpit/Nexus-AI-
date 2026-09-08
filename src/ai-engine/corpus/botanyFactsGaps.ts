import { KnowledgeItem } from '../../types';

// Batch 22 (plants & botany) gap-fills. Live misses on nexus-4b — homonym /
// web-dump failures: "what is a seed" and "how do seeds spread" -> roguelike
// game seed dumps; "what are roots for" -> English-language roots / Anglo-Saxons;
// "what is bark" -> hunting dogs barking at raccoons; "annual vs perennial" ->
// "Plant senescence... The Land Institute"; "how do plants make food" -> "Food
// is any substance consumed... ultra-processed foods"; "what do plants release
// into the air" -> never clearly said oxygen.
export const BOTANY_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-how-plants-make-food',
    title: 'How Plants Make Their Own Food',
    category: 'Botany',
    keywords: [
      'how do plants make food', 'how do plants make their own food', 'how do plants get energy', 'how do plants feed themselves',
      'what do plants eat', 'do plants make their own food', 'how do plants produce food',
    ],
    content: `Plants make their own food by photosynthesis, so they don't need to eat other organisms — they are "autotrophs." In the green parts of the plant (mainly the leaves), tiny structures called chloroplasts contain the pigment chlorophyll, which captures energy from sunlight. The plant takes in carbon dioxide from the air through pores called stomata, and water from the soil through its roots. Using the light energy, it combines the carbon dioxide and water to build glucose, a sugar that is its food, and releases oxygen as a by-product. The overall reaction: 6CO2 + 6H2O + light energy → C6H12O6 (glucose) + 6O2. The plant uses that glucose for energy (breaking it down again by respiration) and as building material — linking sugars into cellulose for cell walls, and combining them with minerals from the soil (nitrogen, phosphorus, etc.) to make proteins, oils and everything else it needs to grow.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-seed',
    title: 'What a Seed Is',
    category: 'Botany',
    keywords: [
      'what is a seed', 'what is a seed made of', 'what is inside a seed', 'what does a seed contain', 'parts of a seed',
      'what is a seed plant', 'how does a seed become a plant',
    ],
    content: `A seed is the reproductive package a flowering plant or conifer makes to grow a new plant. It forms from a fertilised ovule after pollination. Inside a seed there are three parts: the embryo (a tiny undeveloped plant, with an embryonic root, shoot and one or two seed leaves called cotyledons); a food store (starch, oils and protein — the endosperm, or stored in the cotyledons) to feed the seedling until it can photosynthesise; and a protective seed coat (testa) around the outside. A seed can stay dormant — alive but inactive — for months or years until conditions are right, which lets the plant survive winter or drought and spread to new places. (This has nothing to do with the numeric "seed" used to generate a video-game world.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-are-roots-for',
    title: 'What Roots Are For',
    category: 'Botany',
    keywords: [
      'what are roots for', 'what do roots do', 'function of plant roots', 'why do plants have roots', 'what is the purpose of roots',
      'how do roots help a plant', 'what are root hairs',
    ],
    content: `A plant's roots (the underground part) do several jobs. First, anchorage: they grip the soil and hold the plant upright against wind and its own weight. Second, absorption: fine root hairs near the tips take up water and dissolved mineral nutrients (nitrogen, phosphorus, potassium and trace elements) from the soil, which then travel up through the stem in the xylem. Third, storage: many plants stash food (sugars and starch) in their roots to survive winter or to fuel next season's growth — carrots, beets, cassava and sweet potatoes are swollen storage roots we eat. Some roots have extra roles: they can house helpful bacteria or fungi (nitrogen-fixing nodules on legumes, mycorrhizal fungi that extend the root's reach), and a few plants have roots that help with breathing (mangroves) or climbing (ivy).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-annual-vs-perennial',
    title: 'Annual vs Perennial Plants',
    category: 'Botany',
    keywords: [
      'what is an annual versus a perennial plant', 'annual vs perennial', 'what is an annual plant', 'what is a perennial plant',
      'what is a biennial plant', 'do perennials come back every year', 'difference between annuals and perennials',
    ],
    content: `The difference is how long the plant lives. An annual completes its whole life cycle — germinate, grow, flower, set seed, die — within a single growing season or year; it survives only as seed to the next year. Examples: marigolds, sunflowers, corn, beans, lettuce, most garden "bedding" flowers. A perennial lives for more than two years, usually many; it may die back to the ground in winter and regrow from its roots each spring, or (for trees and shrubs) keep a permanent woody framework. Examples: hostas, peonies, lavender, asparagus, and all trees and shrubs. In between, a biennial takes two years: leaves the first year, then flowers, seeds and dies the second (carrots, foxglove, parsley). Note that a plant grown as an annual in a cold climate (like a tomato or a geranium) may actually be a tender perennial that just can't survive the frost.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-bark',
    title: 'What Bark Is',
    category: 'Botany',
    keywords: [
      'what is bark', 'what is tree bark', 'what is bark made of', 'what does bark do', 'why do trees have bark',
      'what is the inner bark', 'is bark alive',
    ],
    content: `Bark is the protective outer covering of the trunks, branches and roots of woody plants. It has layers. The inner bark (phloem) is living tissue that carries sugars made in the leaves down to the rest of the tree. Just outside that is the cork cambium, which continually produces new cork cells. The outer bark is those cork cells, now dead, filled with a waterproof waxy substance (suberin) — this is the rough, dry layer you see and touch. Bark protects the tree from drying out, from insects and fungi, from fire (thick-barked species like cork oak and giant sequoia survive ground fires), and from physical damage and temperature extremes. Because the outer bark is dead and can't stretch, it cracks, peels or forms plates as the trunk grows wider underneath. (Nothing to do with a dog's bark.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-plants-release',
    title: 'What Plants Release Into the Air',
    category: 'Botany',
    keywords: [
      'what do plants release into the air', 'what gas do plants give off', 'do plants release oxygen', 'what do plants breathe out',
      'do plants release carbon dioxide at night', 'what do plants put into the atmosphere', 'do plants give us oxygen',
    ],
    content: `Mainly two things. Oxygen: during daylight, photosynthesis splits water and releases oxygen gas through the leaf pores (stomata). Plants (along with algae) produce essentially all the oxygen in Earth's atmosphere, so animal and human life depends on them. Water vapour: plants constantly lose water by evaporation from their leaves — transpiration — which is a big part of the water cycle and helps cool the plant and the air around it. They also release small amounts of other things: carbon dioxide, because plants respire (use oxygen and give off CO2) all the time, just like animals — this is normally masked during the day when photosynthesis takes in far more CO2 than respiration gives off, but at night, with no photosynthesis, a plant is a net CO2 emitter. Over a full day and its whole life a growing plant is still a strong net oxygen producer and carbon absorber. Many plants also emit scent compounds (VOCs) that attract pollinators or deter pests.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-seed-dispersal',
    title: 'How Seeds Spread (Seed Dispersal)',
    category: 'Botany',
    keywords: [
      'how do seeds spread', 'how are seeds dispersed', 'seed dispersal methods', 'how do plants spread their seeds',
      'why do plants disperse seeds', 'how do seeds travel', 'what is seed dispersal',
    ],
    content: `Plants can't move, so they've evolved many ways to get their seeds away from the parent (where there'd be competition and shared pests) and into new ground. Wind: light seeds with wings or parachutes of hair — dandelion, maple "helicopters," ash, cottonwood. Water: seeds that float — coconut (crosses oceans), water lily, mangrove. Animals, two ways: fleshy fruit that animals eat, so the tough seeds pass through and are deposited elsewhere with fertiliser (berries, apples, tomatoes), or hooked/sticky burrs that catch on fur and clothing (burdock, cleavers), plus seeds like acorns that animals bury and forget. Explosive/mechanical: pods that dry, build tension and fling seeds — pea and bean pods, impatiens ("touch-me-not"), gorse. Gravity: heavy fruit simply drops and rolls (horse chestnut). Some plants use more than one method. (Not related to a video-game "seed.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-moss',
    title: 'What Moss Is',
    category: 'Botany',
    keywords: [
      'what is moss', 'what is moss made of', 'how does moss grow', 'why does moss grow where it does', 'is moss a plant',
      'does moss have roots', 'how does moss reproduce',
    ],
    content: `Moss is a small, simple, non-vascular plant (a bryophyte). It has no true roots, no internal plumbing (xylem/phloem) to move water and food around, and no flowers or seeds. Because it can't transport water internally, it stays low (usually under a few centimetres) and absorbs water and minerals directly through its surface from rain and humidity — which is why moss grows in damp, shady, sheltered places (north sides of trees and rocks, forest floors, stream banks, between paving stones). It anchors itself with hair-like threads called rhizoids. Moss reproduces by spores released from little capsules on stalks, and it also spreads by fragments. Ecologically it's a pioneer that helps build soil, holds moisture, and provides habitat for tiny creatures like tardigrades ("water bears"). Peat moss (Sphagnum) forms peat bogs and is a major long-term carbon store.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-photosynthesis-clean',
    title: 'What Photosynthesis Is',
    category: 'Botany',
    keywords: [
      'what is photosynthesis', 'how does photosynthesis work', 'what does photosynthesis produce', 'where does photosynthesis happen',
      'light dependent reactions', 'calvin cycle', 'what do plants need for photosynthesis',
    ],
    content: `Photosynthesis is the process green plants, algae and some bacteria use to turn light energy into chemical energy stored in sugar. It happens in chloroplasts, mostly in leaf cells. There are two stages. The light-dependent reactions, in the thylakoid membranes: chlorophyll absorbs light (mainly red and blue, reflecting green), which powers the splitting of water into hydrogen ions, electrons and oxygen gas (released as waste), and stores energy in the carrier molecules ATP and NADPH. The light-independent reactions (Calvin cycle), in the fluid stroma: that ATP and NADPH is used to "fix" carbon dioxide from the air, building it up into glucose. Overall: 6CO2 + 6H2O + light → C6H12O6 + 6O2. Photosynthesis is the base of almost every food chain and the source of the oxygen in the atmosphere and of fossil fuels.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-germination',
    title: 'What Germination Is',
    category: 'Botany',
    keywords: [
      'what is germination', 'how does a seed germinate', 'what does a seed need to germinate', 'what happens when a seed sprouts',
      'why do seeds need water to grow', 'stages of germination', 'what triggers germination',
    ],
    content: `Germination is the process by which a dormant seed "wakes up" and begins to grow into a seedling. It needs three things: water, oxygen, and a suitable temperature (some seeds also need light, or darkness, or a spell of cold or fire first). The steps: the seed soaks up water and swells (imbibition), which activates enzymes; those enzymes break down the seed's stored starch and protein into sugars and amino acids the embryo can use; the embryonic root (radicle) emerges first and grows down, then the shoot (plumule) pushes up toward the light; once the first true leaves open above ground and turn green, the seedling starts photosynthesising and no longer depends on the seed's food store. Germination does not need soil or fertiliser to start — just moisture, air and warmth.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-plants-drink-water',
    title: 'How Plants Take Up and Move Water',
    category: 'Botany',
    keywords: [
      'how do plants drink water', 'how do plants absorb water', 'how does water get to the top of a tree', 'what is the transpiration stream',
      'how do roots take in water', 'how does water move up a plant', 'capillary action in plants',
    ],
    content: `Plants take in water through their roots, mainly through masses of tiny root hairs that give a huge surface area. Water enters by osmosis — it moves from the wetter soil into the more concentrated (saltier, sugarier) cells of the root. From there it has to travel up, sometimes 100+ metres in tall trees, through narrow dead tubes called xylem. The main pulling force is transpiration: water evaporates from the leaves through the stomata, and because water molecules stick to each other (cohesion) and to the tube walls (adhesion), that evaporation pulls a continuous thread of water all the way up from the roots, like sucking a drink up a straw — this is the "transpiration stream" or "cohesion-tension" mechanism. Root pressure and capillary action help, especially in small plants and at night. The plant only keeps a small fraction of the water it takes up; over 90% is lost again by transpiration.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-transpiration',
    title: 'What Transpiration Is',
    category: 'Botany',
    keywords: [
      'what is transpiration', 'what does transpiration mean', 'why do plants transpire', 'what are stomata',
      'how does transpiration cool a plant', 'transpiration in the water cycle', 'what factors affect transpiration',
    ],
    content: `Transpiration is the loss of water vapour from a plant, mostly from the leaves, through microscopic adjustable pores called stomata (on the underside of leaves). The plant opens its stomata to let carbon dioxide in for photosynthesis, and water vapour inevitably escapes at the same time. This isn't purely a loss: the evaporation cools the leaf (like sweating), and the "pull" it creates is what draws water and dissolved minerals up from the roots through the whole plant. Transpiration rates go up with heat, wind, dry air and bright light, and down with humidity; a large tree can move hundreds of litres of water a day. On a landscape scale, transpiration from vegetation returns enormous amounts of water to the atmosphere and is a major part of the water cycle (forests literally generate rainfall downwind).`,
    createdAt: Date.now(),
  },
];
