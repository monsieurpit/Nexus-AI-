import { KnowledgeItem } from '../../types';

/**
 * BOTANY_GARDENING_CONCEPTS_GAPS — batch 254 corrections. Misses:
 * - "full sun vs partial shade" answered about PHOTOGRAPHY (camera sensors,
 *   high-ISO noise).
 * - "tree vs shrub" said a shrub "dies back to the ground each winter"
 *   (that's a herbaceous perennial; a shrub is woody).
 * - "conifer vs evergreen" gave maples as an example of evergreens.
 * - "transplanting vs repotting" gave a wrong distinction (bigger vs smaller
 *   plants).
 * - "berry vs drupe", "pollination vs fertilization", "stamen vs pistil",
 *   "weed vs wildflower", "grafting vs cutting", "hybrid vs heirloom",
 *   "GMO vs hybrid" were web dumps.
 * - "legume vs bean" answered about amino acid profiles.
 * - "organic vs inorganic fertilizer" answered about soil amendments.
 * - "nut vs seed", "bulb vs tuber", "greenhouse vs cold frame", "hardiness
 *   zone vs heat zone", "moss vs lichen" were cut off.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'botany', keywords, content, createdAt: now,
});

export const BOTANY_GARDENING_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-bot-full-sun-vs-part-shade',
    'Full sun vs partial shade (plant light needs)',
    [
      'difference between full sun and partial shade', 'full sun means at least 6 hours of direct sunlight per day ideally including midday', 'partial sun or partial shade means roughly 3 to 6 hours of direct sun often shaded during the hottest afternoon',
      'full shade is less than about 3 hours of direct sun or dappled light all day not zero light', 'matching a plant to its light category is one of the biggest factors in whether it thrives', 'not about camera sensors',
    ],
    `These are the LIGHT-REQUIREMENT categories printed on plant labels and in gardening guides (nothing to do with photography).

FULL SUN: at least 6 HOURS of DIRECT, unobstructed sunlight per day — and many sun-lovers want 8+ and specifically the strong MIDDAY-to-afternoon sun. Vegetables (tomatoes, peppers, squash), most herbs, roses, lavender, sunflowers, and many perennials need this to flower and fruit well.

PARTIAL SUN / PARTIAL SHADE: roughly 3 to 6 HOURS of direct sun a day, or bright filtered light. Often this means MORNING sun with shade during the hot afternoon. ("Part sun" hints at the higher end of that range and tolerance of some heat; "part shade" hints at the lower end and a preference for cooler morning light.) Many woodland-edge plants, and greens like lettuce and spinach in summer, do best here.

FULL SHADE: LESS than about 3 hours of direct sun, or dappled/indirect light all day — NOT total darkness (almost nothing grows in true dark). Ferns, hostas, astilbe, and impatiens suit these spots.

Getting the light category right is one of the single biggest factors in whether a plant thrives: a full-sun plant in shade grows leggy and won't bloom, and a shade plant in full sun scorches.`,
  ),
  k(
    'kb-gap-bot-tree-vs-shrub',
    'Tree vs shrub',
    [
      'difference between a tree and a shrub', 'both are woody perennials with a permanent woody framework above ground neither dies back to the ground each year', 'a tree typically has a single main trunk and reaches greater height usually over 6 metres with branching starting well above the ground',
      'a shrub is generally shorter with several woody stems arising from at or near ground level and no single dominant trunk', 'the line is fuzzy large shrubs versus small trees and some species can be trained either way',
    ],
    `Both a tree and a shrub are WOODY PERENNIALS — they build a PERMANENT woody framework (trunk and branches) that persists above ground through winter and grows larger year after year. (Neither "dies back to the ground and regrows from the roots each year" — that describes a HERBACEOUS perennial like a hosta or a peony.)

A TREE typically has:
- a SINGLE dominant main stem (trunk / bole) at least near the base;
- greater HEIGHT — usually taken as over about 6 m (20 ft) at maturity;
- its branching beginning WELL ABOVE ground level, leaving a clear length of trunk.

A SHRUB (or bush) typically has:
- SEVERAL woody stems arising FROM or NEAR ground level, with no single dominant trunk;
- a SHORTER mature height, generally under about 6-8 m;
- a bushier, often rounded overall form.

The boundary is genuinely fuzzy. Large multi-stemmed things (lilac, hazel, crape myrtle) sit between the two, some species grow as a shrub in a harsh site and a tree in a good one, and pruning can train a shrub into a single-trunk "standard" (a tree form) or coppice a tree into a shrub. "Subshrub" describes a low plant woody only at the base (lavender, thyme, sage).`,
  ),
  k(
    'kb-gap-bot-conifer-vs-evergreen',
    'Conifer vs evergreen',
    [
      'difference between a conifer and an evergreen', 'conifer is a taxonomic group cone-bearing gymnosperms pines spruces firs cedars junipers yews usually with needle or scale leaves', 'evergreen is a leaf-habit description a plant that keeps functional foliage all year shedding and replacing leaves gradually not all at once',
      'most conifers are evergreen but some are deciduous larch bald cypress dawn redwood', 'many evergreens are not conifers holly live oak eucalyptus rhododendron most tropical broadleaf trees', 'maples are deciduous not evergreen',
    ],
    `These describe DIFFERENT things — one is a family tree, one is a leaf habit — and they overlap a lot but are not the same.

"CONIFER" is a TAXONOMIC group: the cone-bearing gymnosperms — pines, spruces, firs, hemlocks, larches, cedars, cypresses, junipers, yews, redwoods. Most have needle-like or scale-like leaves and produce seeds on the scales of a woody CONE (junipers and yews have fleshy cone-berries).

"EVERGREEN" is a LEAF-HABIT description: a plant that keeps a full canopy of LIVING, functional leaves ALL YEAR ROUND. It does shed old leaves — but gradually and continuously, so it is never bare. The opposite is DECIDUOUS (drops all its leaves seasonally).

The overlap and the exceptions:
- MOST conifers are evergreen — but a few are DECIDUOUS conifers that go bare in winter: larch (Larix), bald cypress (Taxodium), and dawn redwood (Metasequoia).
- MANY evergreens are NOT conifers — they are broadleaf angiosperms that hold their leaves: holly, live oak, eucalyptus, rhododendron, boxwood, olive, and most tropical rainforest trees.
- MAPLES, oaks (most), birches, and beeches are deciduous broadleaf trees — NOT evergreens.

So "conifer" tells you the plant makes cones and usually has needles; "evergreen" tells you it stays green in winter. A pine is both; a larch is a conifer but not evergreen; a holly is evergreen but not a conifer.`,
  ),
  k(
    'kb-gap-bot-berry-vs-drupe',
    'Berry vs drupe (fruit types)',
    [
      'difference between a berry and a drupe', 'both are fleshy fruits from a single flower with one ovary the difference is the seed structure', 'a true berry has the entire fruit wall fleshy with seeds embedded directly in the flesh grapes tomatoes blueberries bananas peppers kiwi',
      'a drupe or stone fruit has a thin skin a fleshy middle and a hard woody stone or pit enclosing a single seed peaches plums cherries olives mangoes coconuts almonds', 'raspberry and blackberry are aggregates of tiny drupelets strawberry is an accessory fruit',
    ],
    `Both are FLESHY fruits that develop from a single flower with a single ovary; the difference is what happens to the SEEDS and the innermost fruit wall.

A true (botanical) BERRY has the ENTIRE pericarp (fruit wall) fleshy or juicy all the way through, with the seeds scattered DIRECTLY in that flesh — no hard casing around them. Botanical berries include grapes, tomatoes, blueberries, cranberries, currants, gooseberries, peppers, aubergine/eggplant, kiwifruit, avocado, and (surprisingly) bananas.

A DRUPE (or "stone fruit") has THREE distinct layers: a thin outer SKIN (exocarp), a fleshy or fibrous MIDDLE (mesocarp — the part you eat, or in a coconut the husk), and a HARD, WOODY "STONE" / "PIT" (endocarp) that completely encloses usually a SINGLE seed (the kernel). Drupes include peaches, nectarines, plums, cherries, apricots, olives, mangoes, coconuts, dates, and almonds (where we eat the seed inside the stone, not the flesh).

Confusers: a RASPBERRY or BLACKBERRY is an "aggregate fruit" made of many tiny DRUPELETS (each a mini-drupe with its own seed). A STRAWBERRY is an "accessory fruit" — the red part is swollen flower base, and the true fruits are the little "seeds" (achenes) on the outside. So neither is a true berry, while a banana is.`,
  ),
  k(
    'kb-gap-bot-pollination-vs-fertilization',
    'Pollination vs fertilization (plants)',
    [
      'difference between pollination and fertilization plants', 'pollination is the transfer of pollen from an anther the male part to a stigma the female part by wind water insects birds or bats', 'fertilization is the fusion of a male gamete delivered through the pollen tube with the egg cell inside an ovule producing a zygote that becomes the embryo of a seed',
      'pollination comes first fertilization follows after the pollen grain germinates and grows a tube down the style', 'double fertilization in flowering plants also produces the endosperm',
    ],
    `They are two consecutive steps in plant sexual reproduction, and pollination does NOT by itself make a seed.

POLLINATION is the TRANSFER of pollen grains from the ANTHER (the pollen-bearing tip of a stamen — the male part) to the STIGMA (the receptive tip of the pistil — the female part), of the same flower (self-pollination) or a different plant (cross-pollination). The transfer is done by wind, water, or animal vectors (bees, butterflies, moths, beetles, birds, bats). Pollination is just DELIVERY — the pollen has arrived at the right place.

FERTILIZATION happens AFTER. Once a compatible pollen grain lands on the stigma, it GERMINATES and grows a POLLEN TUBE down through the style to the OVARY. The tube delivers the male GAMETES (sperm cells) to an OVULE, and one sperm cell FUSES with the egg cell to form a ZYGOTE — the first cell of the new embryo. That fertilized ovule then develops into a SEED, and the surrounding ovary usually swells into the FRUIT. (Flowering plants do "double fertilization": a second sperm fuses with two other nuclei to form the ENDOSPERM, the seed's food store.)

So: pollination = pollen gets to the stigma; fertilization = the gametes fuse to start a seed. A flower can be pollinated but fail to be fertilized (incompatible pollen, damaged style).`,
  ),
  k(
    'kb-gap-bot-stamen-vs-pistil',
    'Stamen vs pistil (flower parts)',
    [
      'difference between a flowers stamen and pistil', 'the stamen is the male reproductive part consisting of the anther the sac that produces and releases pollen on a stalk called the filament a flower usually has several stamens the androecium', 'the pistil or carpel the gynoecium is the female part consisting of the stigma the sticky top that catches pollen the style the stalk and the ovary at the base containing ovules that become seeds the ovary becomes the fruit',
      'a perfect flower has both an imperfect flower has only one', 'not tulips or Euphorbia',
    ],
    `A typical flower has four whorls of parts: sepals (protective, often green), petals (usually the showy display), and the two reproductive parts — stamens and pistil.

The STAMEN is the MALE part. Each stamen has two bits: the ANTHER, a small sac at the top that produces and then releases POLLEN (which carries the male gametes), and the FILAMENT, the thin stalk that holds the anther up. A flower usually has SEVERAL stamens, and collectively they are called the ANDROECIUM.

The PISTIL (made of one or more CARPELS; collectively the GYNOECIUM) is the FEMALE part, usually in the centre of the flower, with three regions:
- the STIGMA at the top — sticky or feathery, it CATCHES and holds pollen;
- the STYLE — the stalk down which the pollen tube grows;
- the OVARY at the base — a chamber containing one or more OVULES. After fertilization each ovule becomes a SEED, and the ovary itself swells to become the FRUIT.

A flower with BOTH stamens and a pistil is "perfect" (or hermaphrodite) — most flowers. A flower with only one is "imperfect": staminate (male-only) or pistillate (female-only). Some plants (holly, kiwi, willows) have separate male and female individuals entirely.`,
  ),
  k(
    'kb-gap-bot-legume-vs-bean',
    'Legume vs bean',
    [
      'difference between a legume and a bean', 'legume is the broad botanical category plants of the family Fabaceae that bear their seeds in a pod and fix nitrogen via root nodules beans peas lentils chickpeas soybeans peanuts alfalfa clover lupins', 'a bean is a common non-scientific name for the seeds or pods of certain legume species mostly Phaseolus kidney black pinto navy green and Vicia broad or fava',
      'all beans are legumes not all legumes are beans peas lentils peanuts are legumes but not beans pulse means the dried edible seeds of legume crops',
    ],
    `"LEGUME" is the broad BOTANICAL category. It means a plant of the family FABACEAE (the pea/bean family) — the third-largest plant family — characterised by:
- seeds borne in a POD (the pod itself is technically "a legume", a fruit type that splits along two seams);
- the ability to FIX NITROGEN from the air via symbiotic bacteria in root NODULES, which is why legumes enrich soil and are used in crop rotation.
Legumes include beans, peas, lentils, chickpeas, soybeans, peanuts, broad beans, mung beans, cowpeas, AND the forage/cover crops alfalfa, clover, vetch, and lupins, plus trees like acacia, mesquite, and the redbud.

A "BEAN" is a common, non-scientific NAME for the edible seeds (or immature pods) of PARTICULAR legume species — mostly in the genus Phaseolus (kidney, black, pinto, navy, cannellini, and green/string beans) and Vicia (broad/fava beans), plus loose uses like "soybean", "runner bean", "lima bean". (And some "beans" aren't legumes at all — coffee beans, cocoa beans, vanilla beans, castor beans.)

So: all beans are legumes; NOT all legumes are beans — peas, lentils, chickpeas, and peanuts are legumes but not "beans". "PULSE" is the term for the DRIED edible seeds of legume crops (dried peas, lentils, chickpeas, dry beans) as opposed to the fresh/green ones or the oil crops.`,
  ),
  k(
    'kb-gap-bot-organic-vs-inorganic-fertilizer',
    'Organic vs inorganic (synthetic) fertilizer',
    [
      'difference between organic and inorganic fertilizer', 'an organic fertilizer is derived from once-living material or natural deposits compost manure bone meal blood meal fish emulsion seaweed feather meal rock phosphate nutrients released slowly as soil microbes break it down feeds gently improves soil biology hard to burn plants lower more variable nutrient concentration', 'an inorganic synthetic mineral fertilizer is manufactured ammonium nitrate urea superphosphate potassium chloride blended NPK nutrients in a readily available often water-soluble form fast uptake immediate precise effect can burn roots if over-applied leaches quickly does nothing for soil structure or microbes',
    ],
    `Both supply plant nutrients (nitrogen, phosphorus, potassium, and micronutrients); the difference is the SOURCE and how the nutrients become available.

ORGANIC fertilizers come from ONCE-LIVING material or minimally processed natural deposits: compost, animal MANURE, BONE MEAL, BLOOD MEAL, FISH emulsion, SEAWEED/kelp, feather meal, alfalfa meal, worm castings, and rock phosphate or greensand. Their nutrients are mostly locked in complex molecules and are released SLOWLY as SOIL MICROBES decompose the material, so they feed plants gently over weeks to months, are very hard to "burn" plants with, and they also FEED THE SOIL — improving structure, water-holding, and microbial and earthworm life. Downsides: lower and more VARIABLE nutrient percentages, bulkier to apply, slower to correct an acute deficiency, and they need warm, biologically active soil to work.

INORGANIC (synthetic / mineral / "chemical") fertilizers are MANUFACTURED into concentrated salts: ammonium nitrate, UREA, ammonium sulfate, superphosphate, potassium chloride/sulfate, and blended granular or liquid NPK products (e.g. 10-10-10). The nutrients are already in the simple, often WATER-SOLUBLE ionic forms plants take up, so the effect is FAST, predictable, and precisely controllable. Downsides: they can BURN roots and foliage if over-applied, they LEACH away quickly (wasting money and polluting waterways), high salt loads can stress soil life over time, and they do nothing to build soil structure.

Many gardeners use organic matter to build the soil and a modest amount of targeted fertilizer (organic or synthetic) to top up specific nutrients.`,
  ),
  k(
    'kb-gap-bot-nut-vs-seed',
    'Nut vs seed',
    [
      'difference between a nut and a seed', 'a seed is a fertilized ovule an embryo plus a food store in a seed coat the reproductive unit inside a fruit', 'a botanical nut is a type of fruit a hard dry one-seeded fruit whose ovary wall becomes a hard shell that does not split open at maturity acorns hazelnuts chestnuts beechnuts',
      'most culinary nuts are not botanical nuts almonds walnuts pecans pistachios are seeds of drupes peanuts are legume seeds pine nuts are gymnosperm seeds', 'culinary nut just means a hard oily edible kernel',
    ],
    `A SEED is a plant's REPRODUCTIVE unit: a fertilized ovule containing an EMBRYO (a tiny plant), a FOOD STORE (endosperm or cotyledons), all wrapped in a protective SEED COAT. Seeds form inside FRUITS. An acorn's kernel, a bean, a sunflower kernel, an apple pip, and a grain of wheat are all seeds.

A botanical NUT is a specific TYPE OF FRUIT, not a seed: a HARD, DRY, usually ONE-SEEDED fruit in which the ovary WALL hardens into a woody SHELL that stays CLOSED (does not split open, "indehiscent") when ripe — you have to crack it. True botanical nuts: ACORNS, HAZELNUTS/filberts, CHESTNUTS, BEECHNUTS, and hornbeam nuts.

Most things sold as "nuts" are NOT botanical nuts:
- ALMONDS, WALNUTS, PECANS, PISTACHIOS, cashews are the SEEDS (kernels) of DRUPES — we eat the seed from inside the stone, discarding the flesh;
- PEANUTS ("groundnuts") are the SEEDS of a LEGUME pod;
- PINE NUTS are the SEEDS of pine cones (a gymnosperm — no fruit at all);
- Brazil nuts are seeds packed in a hard capsule.

So in everyday/culinary use, "nut" just means "a hard-shelled, oily, edible kernel"; botanically, a nut is a fruit and a seed is what is inside a fruit.`,
  ),
  k(
    'kb-gap-bot-bulb-vs-tuber',
    'Bulb vs tuber (vs corm and rhizome)',
    [
      'difference between a bulb and a tuber', 'a bulb is a short compressed underground stem the basal plate surrounded by fleshy modified leaves scales that store food wrapped in papery layers grows from the centre tulips daffodils onions garlic lilies', 'a tuber is a swollen thickened underground stem stem tuber potato with eyes that are buds or root sweet potato dahlia that stores starch no papery covering no basal plate new shoots sprout from buds scattered over its surface',
      'a corm is a solid stem base gladiolus crocus a rhizome is a horizontal underground stem ginger iris',
    ],
    `These are all underground STORAGE ORGANS that let a plant survive dormancy and regrow, but they are built differently.

A BULB is a compressed underground STEM — a small flat "basal plate" at the bottom — surrounded by concentric FLESHY LEAVES (the "scales") that store the food, often enclosed in dry papery TUNIC layers. Cut an onion in half and the rings are those storage leaves. The new plant grows up from the CENTRE of the bulb; roots come from the basal plate. Examples: tulip, daffodil, hyacinth, lily, onion, garlic, amaryllis.

A TUBER is a swollen, thickened piece of STEM (a "stem tuber" — the POTATO, whose "EYES" are nodes with buds) or of ROOT (a "root tuber" — the SWEET POTATO, the dahlia, the cassava). It has NO basal plate and NO papery skin; it is just a lump of starchy tissue, and new shoots can sprout from BUDS scattered over its surface (which is why one seed potato with several eyes makes several plants).

Two more you will meet:
- CORM: a SOLID, swollen stem BASE (not layered like a bulb), used up each year and replaced by a new one on top. Gladiolus, crocus, freesia, taro.
- RHIZOME: a horizontal STEM that creeps along at or just below the surface, sending up shoots and down roots as it goes. Ginger, turmeric, bearded iris, bamboo, mint, canna.`,
  ),
  k(
    'kb-gap-bot-greenhouse-vs-cold-frame',
    'Greenhouse vs cold frame',
    [
      'difference between a greenhouse and a cold frame', 'a greenhouse is a walk-in structure of glass or plastic over a frame large enough to work inside often with heating ventilation and benching used to grow plants year-round start seeds overwinter tender plants and raise crops', 'a cold frame is a small low bottomless box knee-high with a hinged transparent lid set on the ground over a bed or holding pots unheated relies only on trapped sun and ground warmth used to harden off seedlings start cool-season crops early extend the autumn harvest and overwinter hardy plants',
    ],
    `Both are transparent enclosures that TRAP SOLAR HEAT to protect plants and extend the growing season; they differ in SIZE and whether they are heated.

A GREENHOUSE (glasshouse) is a walk-in STRUCTURE — a frame of wood, aluminium, or steel glazed with glass or twin-wall polycarbonate or polythene film — big enough to stand and work INSIDE. It usually has doors, opening vents or fans for ventilation, staging/benches, and often SUPPLEMENTAL HEATING (and sometimes shading, misting, and grow lights). It is used to grow plants YEAR-ROUND: raising large numbers of seedlings, growing tomatoes/cucumbers/peppers through the season, overwintering tender perennials and citrus, and propagating.

A COLD FRAME is a small, low, BOTTOMLESS box — typically knee- to waist-high — with SLOPING sides and a HINGED transparent LID (traditionally an old window sash), set directly on the ground over a garden bed or holding trays of pots. It is UNHEATED: it works purely by trapping the sun's warmth and the heat of the earth beneath. You prop the lid open on warm days and close it at night. Uses: HARDENING OFF greenhouse- or windowsill-raised seedlings before planting out, starting hardy salad and vegetable crops a few weeks early in spring, protecting late crops into autumn, and overwintering hardy plants and cuttings. It is the cheap, passive, small-scale season-extender; a "hotbed" is a cold frame with fresh manure or a heating cable underneath for extra warmth.`,
  ),
  k(
    'kb-gap-bot-hardiness-vs-heat-zone',
    'Hardiness zone vs heat zone',
    [
      'difference between a hardiness zone and a heat zone', 'a plant hardiness zone USDA and similar is based on the average annual minimum winter temperature divided into about 10 degree F bands it tells you whether a perennial can survive your winter cold', 'a heat zone AHS Plant Heat Zone Map is based on the average number of days per year above 86 degrees F 30 C the point many plants start to suffer heat stress divided into 12 zones it tells you whether a plant can tolerate your summer heat',
      'a plant may be rated with both cold hardiness alone does not tell you if a plant will melt in a hot southern summer',
    ],
    `Both are map-based ratings that help you choose plants that will survive your CLIMATE, but they measure OPPOSITE extremes.

A PLANT HARDINESS ZONE (the USDA zones in the US, and equivalents like the RHS zones in the UK, or Canadian and European systems) is based on the AVERAGE ANNUAL MINIMUM WINTER TEMPERATURE for an area. The USDA divides the country into 13 zones in roughly 10 F (5.6 C) bands (Zone 1 is the coldest, Zone 13 the warmest), each split into "a" and "b" halves. A plant rated "hardy to Zone 5" can normally survive the winter LOW in Zone 5 and warmer; grow it in colder Zone 3 and it will freeze and die. Hardiness zones answer: "will it survive my winter COLD?"

A HEAT ZONE (the American Horticultural Society "Plant Heat Zone" map) is based on the AVERAGE NUMBER OF DAYS PER YEAR when the temperature exceeds 86 F (30 C) — the threshold at which many plants begin to suffer HEAT STRESS (protein damage, wilting, flower drop). It runs from Zone 1 (under 1 hot day) to Zone 12 (over 210 hot days). Heat zones answer: "can it take my summer HEAT?"

A well-labelled plant may carry BOTH, e.g. "USDA 4-8, AHS 8-1". This matters because a plant can be perfectly cold-hardy for the South's mild winters yet MELT in the long, hot summer — the heat-zone rating catches that where the hardiness zone alone cannot.`,
  ),
  k(
    'kb-gap-bot-moss-vs-lichen',
    'Moss vs lichen',
    [
      'difference between moss and lichen', 'a moss is a small simple plant a bryophyte with tiny leaves and stems it photosynthesises has no true roots uses rhizoids to anchor no vascular tissue or flowers reproduces by spores needs moisture forms soft green cushions in damp shady places', 'a lichen is not a plant at all it is a symbiotic partnership between a fungus which provides structure and protection and a photosynthetic partner an alga or cyanobacterium which makes food',
      'lichens are tough slow-growing colonise bare rock and bark grey-green orange yellow crusty leafy or shrubby forms sensitive to air pollution used as bioindicators',
    ],
    `They can look superficially alike on a rock or a tree, but they are fundamentally different kinds of organism.

MOSS is a PLANT — a "bryophyte". It has tiny green LEAVES and STEMS and does its own PHOTOSYNTHESIS. But it is a simple, ancient plant: NO true roots (just anchoring threads called rhizoids), NO internal plumbing (vascular tissue), NO flowers or seeds. It reproduces by SPORES, released from little capsules on stalks, and it needs surface MOISTURE to reproduce (the sperm swim). Mosses form soft, springy green CUSHIONS and mats in damp, shady, humid spots.

LICHEN is NOT a plant and NOT a single organism. It is a stable SYMBIOSIS: a FUNGUS (the dominant partner, which forms the body and shelters the partnership) living together with a PHOTOSYNTHETIC partner — a green ALGA and/or a CYANOBACTERIUM — that makes sugars to feed both. Lichens are extremely TOUGH and SLOW-GROWING; they can colonise BARE ROCK, tombstones, bark, and deserts and polar regions where nothing else survives. They come in three growth forms — crusty (crustose), leafy (foliose), and shrubby/hairy (fruticose) — in grey-green, orange, yellow, and other colours. Because many are killed by air pollution (especially sulphur dioxide), lichen diversity is used as a BIOINDICATOR of air quality.

Quick tell: soft, feathery, uniformly green, in damp shade = moss. Flat and crusty or leathery, often pale grey-green or bright orange/yellow, clinging to rock or bark, surviving full sun and drought = lichen.`,
  ),
  k(
    'kb-gap-bot-transplanting-vs-repotting',
    'Transplanting vs repotting',
    [
      'difference between transplanting and repotting', 'repotting specifically means moving a container plant from one pot to another usually a larger one refreshing the potting mix and sometimes root-pruning a container-gardening and houseplant task', 'transplanting is the broader term for moving a plant from one growing location to another from a seed tray or nursery pot into the garden ground from one spot in the garden to another or dividing and replanting',
      'repotting is essentially transplanting that stays in containers transplanting usually implies a change of location often into the ground', 'not that transplanting is for big plants and repotting for small ones',
    ],
    `They overlap but are not just "the same thing for big vs small plants".

REPOTTING specifically means moving a CONTAINER plant OUT OF ITS POT and into ANOTHER POT — usually one size larger to give the roots more room, or the same pot after root-pruning — while replacing the old, spent POTTING MIX with fresh. It is a routine houseplant and container-gardening task: you repot when a plant becomes root-bound (roots circling, poking out the drainage holes, water running straight through), when the mix has broken down, or every 1-2 years for vigorous growers. The plant STAYS in a container.

TRANSPLANTING is the BROADER term for moving a plant from one GROWING LOCATION to another. It includes:
- "planting out" / "pricking out" seedlings from a seed tray or plug into bigger cells or into the GARDEN BED;
- shifting a nursery-bought plant from its pot into the GROUND;
- digging up an established perennial or shrub and RELOCATING it elsewhere in the garden;
- DIVIDING a clump and replanting the pieces.
Transplanting usually implies a CHANGE OF SITE, very often from a container INTO open ground, and it carries "transplant shock" risk from disturbed roots.

So repotting is really a type of transplanting that begins and ends in a pot; "transplanting" on its own usually means the plant is going into (or moving within) the garden.`,
  ),
  k(
    'kb-gap-bot-weed-vs-wildflower',
    'Weed vs wildflower',
    [
      'difference between a weed and a wildflower', 'neither is a botanical category both are subjective and contextual', 'a weed is any plant growing where a person does not want it competing with crops or garden plants spreading aggressively or considered unsightly many weeds are wildflowers or even crop plants',
      'a wildflower is a flowering plant that grows naturally without cultivation in its native or naturalised range valued for beauty ecology or pollinator support', 'the same species can be a treasured wildflower in a meadow and a hated weed in a lawn',
    ],
    `Neither "weed" nor "wildflower" is a scientific classification — both are HUMAN JUDGEMENTS about a plant, and the SAME species can be both.

A WEED is simply a plant growing WHERE SOMEONE DOES NOT WANT IT. It is defined by CONTEXT and human intent, not by biology. A plant earns the label by competing with crops or ornamentals for light, water, and nutrients; by spreading aggressively (running roots, prolific seed); by being hard to remove; or just by looking out of place. Many classic "weeds" — dandelion, clover, chicory, plantain, Queen Anne's lace, bindweed — are perfectly good WILDFLOWERS. Even a crop can be a weed: a self-sown wheat plant in next year's bean field, or a mint that has escaped its bed.

A WILDFLOWER is a flowering plant that grows NATURALLY, without being deliberately planted or cultivated, in its NATIVE range (or where it has naturalised). The term carries a POSITIVE connotation — wildflowers are valued for their beauty, for supporting pollinators and other wildlife, and for belonging to the local ecosystem. "Wildflower meadows" are deliberately encouraged.

So: "weed" tells you how the observer FEELS about a plant in that spot; "wildflower" tells you the plant grows wild and flowers, usually with approval. Dandelions in a lawn = weeds; dandelions in a spring meadow buzzing with bees = wildflowers.`,
  ),
  k(
    'kb-gap-bot-hybrid-vs-heirloom',
    'Hybrid vs heirloom plant',
    [
      'difference between a hybrid and an heirloom plant', 'an heirloom or heritage variety is an open-pollinated variety passed down for generations often pre-1940s its seeds breed true so gardeners can save seed and get the same plant valued for flavour diversity history and local adaptation may have less disease resistance and uniformity', 'a hybrid specifically an F1 hybrid is the first-generation cross between two different carefully selected inbred parent lines done deliberately each season shows hybrid vigour more uniform productive disease-resistant but saved seed does not breed true so you buy fresh seed each year',
      'not the same as GMO',
    ],
    `Both are ways plant varieties are developed and maintained; the key practical difference is whether you can SAVE THE SEED.

An HEIRLOOM (heritage) variety is an OPEN-POLLINATED variety — one that is pollinated naturally (by wind, insects, or self) and whose offspring GROW TRUE TO TYPE. It has been grown and its seed saved and passed down for many generations (a common cutoff is pre-1940s or "at least 50 years"). Because the seed breeds true, a gardener can save seed from this year's best plants and grow the SAME tomato or bean next year, indefinitely, for free. Heirlooms are prized for FLAVOUR, unusual colours and shapes, regional history, and adaptation to local conditions. Trade-offs: often less DISEASE RESISTANCE, less uniform ripening and size, and sometimes lower yields.

A HYBRID — specifically an F1 HYBRID — is the FIRST-generation cross between two different, carefully inbred PARENT LINES that a breeder crosses DELIBERATELY every season. F1 hybrids show "HYBRID VIGOUR" (heterosis): they are typically more UNIFORM, more VIGOROUS, higher-yielding, more DISEASE-RESISTANT, and better for shipping. The catch: if you save seed from an F1 hybrid, the next generation SEGREGATES into a random mix of the grandparents' traits — it does NOT come true — so you must BUY fresh hybrid seed each year.

Neither is a GMO — both are made by ordinary pollination and selection, not genetic engineering.`,
  ),
  k(
    'kb-gap-bot-gmo-vs-hybrid',
    'GMO vs hybrid',
    [
      'difference between a GMO and a hybrid', 'a hybrid is produced by cross-pollinating two different parent plants of the same or closely related species a natural reproductive process humans just direct done for centuries and happens in nature', 'a GMO genetically modified or engineered or transgenic organism has had its DNA altered directly in a lab inserting deleting or editing specific genes sometimes from an entirely different species bypassing normal breeding',
      'hybrids are not regulated as GMOs most GMO-free produce can still be hybrid', 'Bt corn Roundup Ready soy are GMOs',
    ],
    `Both are ways humans have changed crop plants, but by completely different mechanisms.

A HYBRID is made by CROSS-POLLINATION — taking pollen from one parent plant and using it to fertilise the flowers of another, different parent plant of the SAME species (or a closely related one). This is ordinary plant SEX, just directed by a person choosing the parents. It has been done for CENTURIES, it happens on its own in nature all the time, and the resulting plant's genes are simply a reshuffled combination of its two parents' genes. Most modern vegetable and flower seed ("F1 hybrids") is made this way for vigour and uniformity.

A GMO (genetically modified / genetically engineered / transgenic organism) has had its DNA altered DIRECTLY IN A LABORATORY using genetic-engineering tools — inserting a specific gene, deleting one, or editing the sequence — WITHOUT going through normal breeding. Crucially, the added gene often comes from a COMPLETELY DIFFERENT organism that could never cross with the plant naturally: Bt corn carries a gene from the soil bacterium Bacillus thuringiensis to make its own insecticide; "Roundup Ready" soy carries a bacterial gene for herbicide tolerance. (Newer "gene-edited" crops use CRISPR to tweak the plant's own genes, and their regulatory status is still being worked out.)

So: hybrid = controlled conventional breeding, within species, old technology, unregulated as GM; GMO = direct lab modification of the DNA, often across species, and subject to specific regulation and labelling in many countries.`,
  ),
  k(
    'kb-gap-bot-photosynthesis-vs-transpiration',
    'Photosynthesis vs transpiration',
    [
      'difference between photosynthesis and transpiration', 'photosynthesis is the plant making sugar from carbon dioxide and water using light energy in the chloroplasts of green cells it captures and stores energy and releases oxygen', 'transpiration is the loss of water vapour from the plant mostly through the stomata of the leaves it pulls water and minerals up from the roots the transpiration stream cools the leaf and is largely an unavoidable side effect of opening the stomata to take in carbon dioxide',
    ],
    `Two different plant processes that happen in the leaf and are linked by the stomata.

PHOTOSYNTHESIS is how a plant MAKES FOOD. In the CHLOROPLASTS of green cells, light energy is used to combine CARBON DIOXIDE (taken in from the air) and WATER (brought up from the roots) into GLUCOSE (sugar), releasing OXYGEN as a by-product. It captures and STORES energy in chemical form, and it only runs when there is light. Summary: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.

TRANSPIRATION is the LOSS OF WATER as vapour from the plant — mainly through the STOMATA, the adjustable pores on the underside of the leaves (a little also escapes through the cuticle). It happens whenever the stomata are open and the air is drier than the leaf's interior, which is most of the day. Its consequences: it creates the suction ("transpiration pull") that draws the continuous column of water — and the dissolved MINERALS — up the xylem from the roots to every leaf; it COOLS the leaf by evaporative cooling; and it can DEHYDRATE the plant if water loss outpaces uptake (causing wilting), which is why plants close their stomata in heat and drought.

The link: a plant MUST open its stomata to let CO2 in for photosynthesis, but every time it does, water escapes — so transpiration is largely the unavoidable "cost" of photosynthesis. Plants constantly trade off carbon gain against water loss.`,
  ),
];
