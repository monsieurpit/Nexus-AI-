import { KnowledgeItem } from '../../types';

// Batch 130 (gardening & horticulture) — a gap. Errors on nexus-4b: "why and
// how do you prune plants" and "what causes yellow leaves on a plant" were
// both answered as "transpiration does it"; "what is transpiration and why do
// plants wilt" explained transpiration correctly but never actually said why
// plants wilt; "how do you know when to water a plant" said "you basically
// don't have a clue, just watch for drooping." Web dumps: NPK numbers (the
// phosphate miner OCP Group), deadheading (the Coreopsis and Aquilegia
// genera), soil amendment vs fertilizer.
export const GARDENING_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-garden-npk',
    title: 'What the NPK Numbers on Fertilizer Mean',
    category: 'Gardening',
    keywords: [
      'what do the numbers on fertilizer npk mean', 'the three numbers on a fertilizer bag are the percentages by weight of nitrogen n phosphorus as p2o5 and potassium as k2o always in that order',
      '10-10-10 is a balanced fertilizer with 10 percent of each 46-0-0 is urea pure nitrogen', 'nitrogen drives leafy green growth phosphorus supports roots flowers and fruit potassium supports overall vigour disease resistance and water regulation',
      'a 50 lb bag of 10-10-10 contains 5 lb n 5 lb p2o5 5 lb k2o the rest is filler',
    ],
    content: `The three numbers on a fertilizer label — for example "10-10-10" or "5-10-5" — are the "guaranteed analysis": the percentage by weight of nitrogen (N), then phosphorus (reported as P₂O₅), then potassium (reported as K₂O), always in that order (remember it as "up, down, all around"). So a 10-10-10 fertilizer is 10% each; a 46-0-0 is urea (pure nitrogen); a 0-20-0 is superphosphate. The rest of the bag is inert carrier/filler and any secondary or micronutrients. Roughly what each does: NITROGEN drives leafy, green, vegetative growth — you want a high first number for lawns, and for leafy vegetables and to green up a stressed plant, but too much gives lush foliage and few flowers or fruit. PHOSPHORUS supports root development, flowering, and fruit/seed set — "bloom booster" fertilizers have a high middle number. POTASSIUM supports overall plant vigour, stem strength, disease and drought resistance, and the plant's water and sugar movement. To find the actual weight of a nutrient, multiply: a 50 lb bag of 10-10-10 delivers 5 lb of N, 5 lb of P₂O₅, and 5 lb of K₂O. (This is a soil-chemistry topic; it is unrelated to any particular fertilizer company.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-pruning',
    title: 'Why and How You Prune Plants and Trees',
    category: 'Gardening',
    keywords: [
      'why and how do you prune plants and trees', 'pruning is cutting away parts of a plant to shape it control size improve health and direct its energy remove dead diseased damaged or crossing rubbing branches the three ds',
      'open the canopy for light and airflow which reduces fungal disease encourage bushier growth cutting a stem tip removes apical dominance so side buds break increase flowering or fruiting rejuvenate an overgrown shrub',
      'cut just above an outward facing bud or back to the branch collar not flush not leaving a stub time it right most deciduous trees and summer bloomers in late winter dormancy spring bloomers right after they flower never remove more than about a quarter in a year',
    ],
    content: `Pruning is the selective removal of parts of a plant — branches, shoots, buds, roots — to shape it, control its size, keep it healthy, and steer where it puts its energy. It has nothing to do with managing the plant's water loss. Reasons to prune: (1) remove the "3 Ds" — dead, diseased, and damaged wood — plus branches that cross and rub each other open; (2) thin a dense canopy so light and air can get in, which dries the foliage faster and cuts down on fungal disease; (3) make a plant bushier — cutting off a growing tip removes "apical dominance," the hormone signal that suppresses side buds, so the plant branches out below the cut; (4) improve flowering or fruiting by removing old unproductive wood or excess growth; (5) train a shape (hedge, standard, espalier); (6) rejuvenate a leggy overgrown shrub by cutting it hard back. How: use clean, sharp secateurs/loppers/saw; cut just above an outward-facing bud (about 5 mm above, angled away from the bud) or, on a tree limb, back to the raised "branch collar" at its base — never cut flush with the trunk (it can't heal) and never leave a long stub (it dies back and rots). Timing matters: most deciduous trees and summer-flowering shrubs are pruned in late-winter dormancy; spring-flowering shrubs (lilac, forsythia, weigela) are pruned right after they finish flowering, because they form next spring's buds during summer; and you generally remove no more than about 25% of a plant in one year.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-yellow-leaves',
    title: 'What Causes Yellow Leaves on a Plant',
    category: 'Gardening',
    keywords: [
      'what causes yellow leaves on a plant chlorosis', 'overwatering the most common cause waterlogged soil suffocates the roots so they cannot take up nutrients or water lower and inner leaves yellow soil stays wet',
      'underwatering leaves yellow and crisp dry soil nitrogen deficiency uniform yellowing of the oldest leaves first nitrogen is mobile the plant moves it to new growth',
      'iron or manganese deficiency yellowing between the veins of the newest leaves veins stay green usually from soil that is too alkaline also too little light cold shock root damage pot bound pests old age',
    ],
    content: `Yellowing leaves ("chlorosis") is a symptom with many possible causes, and the pattern tells you which. OVERWATERING is the single most common cause of yellow leaves on a houseplant: constantly saturated soil has no air, the roots suffocate and can't function, and the plant yellows (often the lower and inner leaves first), goes limp, and drops leaves — while the soil stays wet and heavy, which fools people into watering more. UNDERWATERING gives yellowing that turns dry and crisp, with obviously dry soil and a light pot. NITROGEN DEFICIENCY causes a fairly even yellowing that starts on the OLDEST (lowest) leaves and moves up, because nitrogen is mobile and the plant robs its old leaves to feed new growth. IRON or MANGANESE DEFICIENCY causes yellowing BETWEEN the veins of the NEWEST leaves while the veins themselves stay green ("interveinal chlorosis"), usually because the soil is too alkaline and locks those nutrients up. Other causes: too little light, sudden cold, transplant shock, being root-bound in a too-small pot, damaged roots, sap-sucking pests (spider mites, aphids, whitefly) that stipple the leaves, and simple old age (a plant always sheds its oldest leaves as it grows). (Transpiration — water loss through the leaves — does not cause yellowing.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-wilting',
    title: 'Why Plants Wilt',
    category: 'Gardening',
    keywords: [
      'what is transpiration and why do plants wilt', 'a plant stays rigid because its cells are full of water and pressing against their walls turgor pressure',
      'wilting happens when the plant loses water through transpiration faster than the roots can replace it so the cells lose turgor and go limp and the leaves and stems droop', 'causes dry soil heat and wind temporary midday wilting that recovers by evening is normal damaged or diseased roots waterlogged soil suffocating the roots so a plant can wilt in wet soil vascular wilt diseases fusarium verticillium blocking the xylem root knot nematodes',
    ],
    content: `A healthy plant holds itself up by water pressure: its cells are filled with water and press outward against their cell walls, a stiffness called "turgor." A plant WILTS when it loses water faster than its roots can supply it, so the cells lose turgor, go slack, and the leaves and stems droop. The causes: (1) DRY SOIL — the simplest one, there just isn't enough water to take up. (2) HEAT AND WIND — on a scorching, windy afternoon a plant can transpire faster than even moist soil can feed the roots, causing "temporary" wilting that recovers on its own overnight; this is normal and not a watering problem. (3) DAMAGED OR SUFFOCATED ROOTS — and this is the trap: soil that is WATERLOGGED has no air, the roots suffocate and rot, and a plant with dead roots can't take up water and wilts — so a wilting plant in soggy soil needs LESS water, not more (chronic overwatering is a leading cause of houseplant death). (4) VASCULAR WILT DISEASES — soil fungi like Fusarium and Verticillium (and bacterial wilt) invade and plug the xylem, the tubes that carry water up the stem, so water can't reach the leaves even though the roots and soil are fine; often one side or one branch wilts first, and it doesn't recover. (5) Root-knot nematodes and root-feeding grubs. Transpiration is the normal loss of water vapour from the leaves through the pores (stomata); wilting is what happens when that loss outruns the supply.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-watering',
    title: 'How to Know When to Water a Plant (and What Overwatering Is)',
    category: 'Gardening',
    keywords: [
      'how do you know when to water a plant and what is overwatering', 'do not water on a schedule check the soil stick a finger 3 to 5 cm into the soil if it is dry at that depth water if it is still moist wait',
      'water deeply and less often encourages deep roots rather than a little every day shallow roots water at the base in the morning signs a plant needs water soil dry and pulling away from the pot edge pot feels light leaves slightly limp or dull',
      'overwatering is keeping the soil constantly saturated so the air spaces are filled with water and the roots cannot get oxygen the roots suffocate and rot then the plant wilts yellows drops leaves and the soil smells sour the number one killer of houseplants good drainage matters more than technique',
    ],
    content: `The key rule is: don't water on a fixed schedule — check the soil. Push a finger about 3–5 cm (a knuckle or two) into the soil near the plant. If it's dry at that depth, water; if it's still cool and moist, wait a day or two and check again. Other tells that a potted plant is thirsty: the soil surface is pale and pulling away from the sides of the pot, the pot feels noticeably lighter when lifted, and the leaves look slightly limp or have lost their gloss. When you do water, water DEEPLY — until it runs out the drainage holes — and then let the soil dry out again, rather than giving a little sip every day; deep-and-infrequent watering pushes roots to grow down and makes the plant more drought-tough, while frequent shallow watering keeps roots at the surface. Water at the base of the plant, and in the morning if possible. OVERWATERING does not mean giving too much water at once — it means keeping the soil constantly waterlogged so the air pockets stay full of water and the roots can't get oxygen. Starved of air, the roots suffocate and rot; the plant then can't take up water and it WILTS, yellows (lower leaves first), drops leaves, and the soil smells sour or musky. People misread the wilting as thirst and water more, killing it faster. Overwatering (usually combined with a pot that has no drainage or that sits in a full saucer) is the most common way houseplants die — good drainage matters more than watering technique.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-deadheading',
    title: 'What Deadheading Flowers Does',
    category: 'Gardening',
    keywords: [
      'what does deadheading flowers do', 'deadheading is removing spent faded or dying flowers from a plant',
      'a plants biological goal is to set seed once a bloom is pollinated it stops making new flowers and pours energy into developing seeds cutting off the old flower before it seeds tricks the plant into blooming again so you get a longer and more prolific flowering season roses dahlias cosmos petunias marigolds salvia',
      'it also tidies the plant prevents unwanted self seeding and stops energy waste some plants are left for seed heads that feed birds and give winter interest some do not rebloom regardless',
    ],
    content: `Deadheading means cutting or pinching off the flowers on a plant once they have faded and started to die, before they form seed. The reason it works: a flowering plant's biological purpose is to reproduce, so once a bloom has been pollinated the plant stops putting out new flowers and redirects its energy into ripening the seeds in that spent bloom. By removing the dying flower before the seed develops, you signal the plant that it hasn't succeeded yet, and it responds by producing another flush of flowers to try again. So regular deadheading extends the blooming season and gives you many more flowers over the summer — it makes a big difference for roses, dahlias, cosmos, petunias, marigolds, geraniums, salvia, coreopsis, and most repeat-blooming annuals and perennials. It also keeps the plant looking tidy, prevents plants from self-seeding all over the garden, and stops the plant wasting resources on seed you don't want. Cut back to just above the first healthy leaf or a lateral bud. Exceptions: leave the seed heads on coneflowers, rudbeckia, sedum, and ornamental grasses to feed birds and give winter structure; and some plants (peony, most spring bulbs, once-blooming roses) won't rebloom no matter what, though you should still snap the seedpods off bulbs so they store energy for next year.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-amendment-vs-fertilizer',
    title: 'Soil Amendment vs Fertilizer',
    category: 'Gardening',
    keywords: [
      'what is a soil amendment versus a fertilizer', 'a fertilizer supplies plant nutrients directly nitrogen phosphorus potassium and micronutrients for the plant to take up fast if synthetic slower if organic',
      'a soil amendment changes the physical or chemical properties of the soil itself so it is a better place for roots improving structure drainage aeration water holding capacity ph or biological activity',
      'compost aged manure leaf mould peat coco coir biochar worm castings improve structure and add slow nutrients and microbes lime and sulfur adjust ph gypsum sand perlite change texture fertilizer feeds the plant amendment feeds the soil',
    ],
    content: `A FERTILIZER supplies plant NUTRIENTS — nitrogen, phosphorus, potassium, and micronutrients like iron and magnesium — in a form roots can absorb. Its job is to feed the plant. A SOIL AMENDMENT changes the physical or chemical PROPERTIES of the soil so it is a better environment for roots to grow in: better structure and crumb, better drainage and aeration in heavy clay, better water- and nutrient-holding in sandy soil, adjusted pH, or more soil life. Its job is to fix and feed the soil. Examples of amendments: compost, aged manure, leaf mould, coco coir and peat (structure, water holding, slow nutrients, and microbes — so compost is both an amendment and a mild fertilizer); garden lime (raises pH), elemental sulfur (lowers pH); gypsum (loosens some clays without changing pH); coarse sand, grit, and perlite (improve drainage); biochar and worm castings (structure and microbial habitat). Rule of thumb: fertilizer feeds the plant, amendment builds the soil. The best long-term strategy is to keep adding organic matter (compost, mulch, cover crops) so the soil becomes rich and living, which reduces how much fertilizer you need.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-crop-rotation',
    title: 'What Crop Rotation Is and Why It Works',
    category: 'Gardening',
    keywords: [
      'what is crop rotation and why do farmers do it', 'growing a different plant family in a given plot each year instead of the same crop repeatedly',
      'breaks pest and disease cycles soil borne pests and pathogens that build up on one crop family starve when that family is absent for 2 to 4 years balances soil fertility legumes add nitrogen heavy feeders deplete it different root depths use different soil layers reduces weed pressure',
      'classic home garden rotation legumes then leafy greens then fruiting tomato pepper squash then roots then back to legumes the norfolk four course rotation drove the 18th century agricultural revolution',
    ],
    content: `Crop rotation is the practice of not growing the same crop (or crop family) in the same piece of ground two years running, instead moving each crop through the plots on a multi-year cycle. It has several benefits working together: (1) BREAKING PEST AND DISEASE CYCLES — many soil-dwelling pests, fungi, and bacteria specialise on one plant family (clubroot on brassicas, potato/tomato blight organisms, onion white rot, carrot fly, root-knot nematodes) and build up in the soil where that family grows; take the host away for 2–4 years and those populations crash from starvation. (2) BALANCING FERTILITY — legumes (beans, peas, clover) fix nitrogen and leave the soil richer, while heavy feeders (corn, brassicas, tomatoes, squash) deplete it, so a good rotation follows a heavy feeder with a legume or a light feeder. (3) USING DIFFERENT SOIL LAYERS — deep-rooted crops (carrots, parsnips) and shallow-rooted ones draw on different depths. (4) SUPPRESSING WEEDS — different crops and their cultivation break up weed life cycles. A simple home-garden four-bed rotation: legumes → leafy greens/brassicas → fruiting crops (tomatoes, peppers, cucurbits) → roots → back to legumes. The 18th-century "Norfolk four-course" rotation (wheat, turnips, barley, clover) let farmers stop leaving land fallow and was a key driver of the British Agricultural Revolution.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-compost',
    title: 'What Compost Is and How Composting Works',
    category: 'Gardening',
    keywords: [
      'what is compost and how does composting work', 'compost is decomposed organic matter kitchen and garden waste broken down by bacteria fungi and larger organisms into a dark crumbly earthy smelling soil conditioner',
      'balance greens nitrogen rich kitchen scraps grass clippings coffee grounds with browns carbon rich dry leaves cardboard straw aim roughly 2 to 3 parts browns to 1 part greens by volume it needs air turn it and moisture like a wrung out sponge',
      'a hot pile reaches 55 to 65 celsius kills weed seeds and pathogens finishes in weeks a cold pile takes months to a year do not add meat dairy oils pet waste or diseased plants vermicomposting uses worms',
    ],
    content: `Compost is what you get when you let organic waste rot down under controlled conditions: a dark, crumbly, sweet-earthy-smelling material that you dig into soil or spread as mulch to improve structure, feed soil life, and release nutrients slowly. Composting is done by a succession of organisms — bacteria first, then fungi, then worms, beetles, and other invertebrates — feeding on the material and each other. To keep them working you balance two things: "GREENS," which are moist and nitrogen-rich (vegetable and fruit scraps, fresh grass clippings, coffee grounds, manure, green plant trimmings), and "BROWNS," which are dry and carbon-rich (fallen leaves, straw, shredded cardboard and paper, wood chips, dry stalks). A rough target is 2–3 parts browns to 1 part greens by volume. The pile also needs air (turn it every week or two, or it goes anaerobic and smells of ammonia/sulphur) and moisture (as damp as a wrung-out sponge — too wet and it goes slimy, too dry and it stops). A well-built "hot" pile heats to 55–65°C from the microbial activity, which kills most weed seeds and plant pathogens and produces finished compost in a few weeks to a couple of months; a "cold" pile you just add to over time takes six months to a year. Keep out meat, fish, dairy, fats and oils, pet feces, and diseased or herbicide-treated plants. Worm bins ("vermicomposting") process kitchen scraps indoors and produce especially rich "castings."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-cuttings',
    title: 'How to Propagate a Plant from a Cutting',
    category: 'Gardening',
    keywords: [
      'how do you propagate a plant from a cutting', 'take a stem cutting cut just below a node where a leaf attaches because that is where roots form remove the lower leaves',
      'many plants root better in a moist well draining medium perlite vermiculite potting mix than in water water roots are brittle and struggle to adapt to soil a rooting hormone auxin powder or gel speeds it for woody plants keep humidity high a plastic bag or dome and warmth about 21 to 24 celsius',
      'softwood cuttings this years growth root fastest hardwood cuttings are taken in winter dormancy also leaf cuttings succulents african violet and division',
    ],
    content: `Taking a cutting means cutting off a piece of a plant and getting it to grow its own roots, producing a new plant identical to the parent. The steps for a STEM cutting: (1) choose healthy, non-flowering growth and cut a 8–15 cm piece with a clean sharp blade, cutting just BELOW a "node" (the slightly swollen point where a leaf or leaves attach) — nodes are where root cells originate. (2) Strip the leaves off the lower half, leaving 2–4 leaves at the top (large leaves can be cut in half to reduce water loss). (3) Optionally dip the cut end in rooting hormone (a synthetic auxin powder or gel) — this makes a real difference for woody and slow-rooting plants. (4) Insert the cutting into a moist, sterile, free-draining medium — a 50/50 mix of perlite and potting mix, or vermiculite, or coarse sand — rather than a jar of water: water-grown roots are thin and brittle and often struggle when moved into soil, whereas roots formed in a solid medium adapt straight away. (5) Cover with a clear plastic bag or propagator dome to keep humidity high, keep it warm (21–24°C, bottom heat helps a lot), and in bright indirect light, not direct sun. Roots usually form in 2–8 weeks; tug gently to check, then pot up. "Softwood" cuttings taken from this year's soft new growth in late spring root fastest; "hardwood" cuttings of dormant woody stems are taken in autumn/winter and take months. Other methods: leaf cuttings (succulents, snake plant, African violet, begonia), root cuttings, layering (rooting a stem while still attached), and simply dividing a clump.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-companion-planting',
    title: 'What Companion Planting Is and Whether It Works',
    category: 'Gardening',
    keywords: [
      'what is companion planting and does it actually work', 'growing certain plants near each other for mutual benefit the specific pairing charts in gardening books are mostly folklore but several mechanisms are real and evidence based',
      'trap cropping nasturtiums lure aphids away some plants genuinely suppress pests french marigold roots release compounds that reduce root knot nematodes providing habitat for beneficial predators and pollinators flowering herbs dill fennel attract parasitic wasps and hoverflies',
      'physical benefits three sisters corn provides a pole for beans beans fix nitrogen squash shades out weeds tall plants shade heat sensitive ones and not competing deep versus shallow roots',
    ],
    content: `Companion planting is deliberately growing particular plants next to each other so they help one another. The detailed "plant this next to that, never next to this" charts in gardening books are mostly traditional lore with little rigorous evidence, but several underlying mechanisms are real and well supported: (1) TRAP CROPPING — a more attractive plant draws a pest away from your crop (nasturtiums pull aphids off beans, blue mustard lures flea beetles). (2) GENUINE PEST SUPPRESSION — French marigolds (Tagetes patula) release thiophene compounds from their roots that measurably reduce root-knot nematode populations in the soil (this one is well documented); strong-smelling plants like alliums, mint, and rosemary can mask or deter some pests by scent. (3) ATTRACTING BENEFICIAL INSECTS — planting flowering herbs and umbellifers (dill, fennel, cilantro left to flower, alyssum, yarrow) among vegetables feeds and shelters the parasitic wasps, hoverflies, lacewings, and ladybirds that eat aphids and caterpillars, and brings in pollinators for fruiting crops. (4) PHYSICAL AND SPATIAL BENEFITS — the "Three Sisters" (corn as a living pole for climbing beans, beans fixing nitrogen for the corn, sprawling squash shading the ground and suppressing weeds); tall crops shading lettuce or spinach through summer heat; and pairing deep-rooted with shallow-rooted crops so they don't compete. So the general principles — plant diversity, flowers for beneficials, trap crops, and using space and structure — genuinely work; the specific magic pairings mostly don't.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-hydroponics-systems',
    title: 'How Hydroponics Works and the Main Systems',
    category: 'Gardening',
    keywords: [
      'how does hydroponics work and what are the main systems', 'growing plants without soil delivering a balanced water solution of dissolved mineral nutrients directly to the roots the ph and nutrient strength ec are monitored and adjusted',
      'deep water culture roots dangle in an aerated nutrient reservoir nutrient film technique a thin film flows down a sloped channel past the roots ebb and flow a tray is periodically flooded then drained drip solution dripped onto each plants medium wick passive aeroponics roots suspended in air and misted',
      'media rockwool clay pebbles coco coir perlite benefits faster growth less water no weeds indoor and vertical drawbacks equipment cost power dependence disease spreads fast through shared water',
    ],
    content: `Hydroponics is growing plants with their roots in a nutrient solution (water plus dissolved mineral salts supplying all 14 essential elements) instead of in soil. The grower controls the pH (usually kept around 5.5–6.5 so nutrients stay available) and the nutrient concentration (measured as electrical conductivity, EC/TDS). Because the plant never has to hunt through soil for food or water, growth is fast and yields are high. The main systems: DEEP WATER CULTURE (DWC) — the plant sits in a net pot with its roots dangling into a reservoir of nutrient solution that is kept oxygenated with an air stone; simple and cheap. NUTRIENT FILM TECHNIQUE (NFT) — a very thin, constantly flowing film of solution runs down a gently sloped channel past the bare roots; common in commercial leafy-green production. EBB AND FLOW (flood and drain) — a tray of plants in an inert medium is flooded with solution on a timer and then drained back to a tank. DRIP — solution is dripped onto the medium at the base of each plant, then recirculated or run to waste. WICK — passive, a wick draws solution up into the growing medium (works only for small, low-demand plants). AEROPONICS — the roots hang in a chamber and are misted with solution. Common growing media are rockwool, expanded clay pebbles (LECA), coco coir, and perlite. Advantages: faster growth, up to ~90% less water (it recirculates), no weeds, and it works indoors and stacked vertically. Disadvantages: upfront equipment cost, total dependence on power and pumps, close monitoring of pH and nutrients, and a root disease or pump failure can wipe out every plant sharing the water quickly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-garden-soil-types',
    title: 'Potting Mix vs Garden Soil vs Topsoil',
    category: 'Gardening',
    keywords: [
      'what is the difference between potting soil garden soil and topsoil', 'potting mix often contains no actual soil it is peat or coco coir plus perlite or vermiculite plus compost or bark formulated to be light sterile well draining and to not compact in a pot',
      'garden soil bagged is topsoil blended with compost and sometimes fertilizer meant to be dug into existing garden beds too dense and heavy for containers',
      'topsoil is the screened upper mineral layer of soil variable quality used to fill and level beds and raised beds usually mixed with compost before planting real garden soil in a pot turns to concrete and drowns roots',
    ],
    content: `These three bagged products are for different jobs and are not interchangeable. POTTING MIX ("potting soil") usually contains NO real soil at all — it is a blend of peat moss or coconut coir for water retention, perlite or vermiculite for air and drainage, and compost, bark fines, or a slow-release fertilizer for nutrition, plus a wetting agent and lime to balance pH. It is engineered to stay light and fluffy, drain freely, and NOT compact when confined in a pot — real soil in a container packs down into an airless block that drowns roots. Use potting mix for anything in a container, and for seed starting (use a finer, sterile "seed-starting mix"). GARDEN SOIL (the bagged kind) is topsoil that has been blended with compost and often fertilizer, intended to be dug INTO existing in-ground garden beds to improve them or to top them up — it is far too dense and heavy to use alone in pots. TOPSOIL is simply the screened upper mineral layer of soil, sold in bulk to fill and level low spots, build up beds, or fill raised beds; its quality varies enormously by supplier, and for planting you normally mix it roughly half-and-half with compost first. Rule of thumb: containers get potting mix; in-ground beds get garden soil or compost dug in; big volume-filling jobs get topsoil-plus-compost.`,
    createdAt: Date.now(),
  },
];
