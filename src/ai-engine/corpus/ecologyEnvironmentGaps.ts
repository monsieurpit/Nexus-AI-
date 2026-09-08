import { KnowledgeItem } from '../../types';

// Batch 81 (ecology & environment). Weak category (~11/25). nexus-4b misses:
// "what is a food chain versus a food web" dumped ocean depth zones; "what is
// carrying capacity" answered about fibre-optic data capacity and parrots
// talking; "what is a watershed" confused it with a continental divide; "what
// is desertification" called the Sahara "that huge as hell fucking country";
// primary/secondary succession, eutrophication, bioaccumulation, wetland, and
// tragedy of the commons were all raw web dumps (the last one ended up talking
// about an episode of Fargo).
export const ECOLOGY_ENVIRONMENT_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-watershed',
    title: 'What a Watershed Is',
    category: 'Ecology',
    keywords: [
      'what is a watershed', 'drainage basin catchment area', 'watershed vs continental divide', 'where does rainwater drain',
      'nested watersheds river basin', 'why do watersheds matter for pollution', 'ridgeline watershed boundary',
    ],
    content: `A watershed (also called a drainage basin or catchment) is the entire area of land from which all water — rain, snowmelt, streams and springs — drains toward a single common outlet: one river, lake, or point on the coast. The boundary of a watershed is the ridgeline of high ground around it; rain falling on one side runs to one river system, rain on the other side runs to another. Watersheds are nested: a small creek's watershed is part of the larger watershed of the river it joins, all the way up to a major river basin like the Mississippi or the St. Lawrence. The narrower British meaning of "watershed" is the dividing ridge itself; a "continental divide" is a major ridge separating watersheds that drain to different oceans. The concept matters because everything that happens on the land in a watershed — farming, paving, logging, a chemical spill — affects the quality and quantity of water in its river, so water is increasingly managed at the watershed scale.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-food-chain-vs-web',
    title: 'Food Chain versus Food Web',
    category: 'Ecology',
    keywords: [
      'what is a food chain versus a food web', 'linear feeding sequence vs network', 'producer consumer food chain example',
      'why are food webs more stable', 'energy flow through a food web', 'who eats whom ecosystem',
    ],
    content: `A food chain is a single, straight-line sequence showing who eats whom, starting from a producer and moving up one step at a time: for example grass → grasshopper → frog → snake → hawk. Each link is a "trophic level" — producer, primary consumer (herbivore), secondary consumer, and so on. A food web is the realistic picture: the interconnected network of many overlapping food chains in an ecosystem, because almost every organism eats more than one kind of food and is eaten by more than one kind of predator. Food webs are more stable than single chains — if one prey species crashes, its predators can switch to other prey, so the whole system is less likely to collapse. In both, energy flows one way and shrinks at every step (most is lost as heat and life processes, only about 10% passes up), while nutrients like carbon and nitrogen are recycled by decomposers back to the producers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trophic-level',
    title: 'What a Trophic Level Is',
    category: 'Ecology',
    keywords: [
      'what is a trophic level', 'producer primary secondary consumer', 'ten percent rule energy transfer', 'ecological pyramid biomass',
      'why are there few top predators', 'trophic level definition ecology', 'apex predator trophic level',
    ],
    content: `A trophic level is an organism's feeding position in a food chain or food web. Level 1 is the producers — plants, algae and some bacteria that make their own food from sunlight or chemicals. Level 2 is the primary consumers — herbivores that eat producers. Level 3 is the secondary consumers — carnivores (and omnivores) that eat herbivores. Level 4 and up are tertiary and higher consumers, ending with apex predators that nothing routinely hunts. Decomposers and detritivores feed on dead material from every level. A key rule: only about 10% of the energy captured at one trophic level is passed on to the next; roughly 90% is lost as heat, movement, and undigested waste. This is why food chains rarely have more than four or five levels, why there is far more plant biomass than herbivore biomass and far more herbivore than predator biomass (the "ecological pyramid"), and why eating lower on the food chain feeds more people per hectare of farmland.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ecological-succession',
    title: 'Primary versus Secondary Ecological Succession',
    category: 'Ecology',
    keywords: [
      'what is primary versus secondary succession', 'ecological succession explained', 'pioneer species lichen moss bare rock',
      'succession after fire or abandoned farm', 'climax community', 'why is secondary succession faster',
    ],
    content: `Ecological succession is the gradual, more-or-less predictable change in the species making up a community over time. PRIMARY succession begins on a lifeless surface with no soil at all — bare rock exposed by a retreating glacier, cooled lava, a new sandbar or volcanic island. "Pioneer species" such as lichens and mosses colonise first, slowly weathering the rock and, along with windblown dust and their own dead tissue, building the first thin soil. Only then can grasses take hold, followed over centuries by shrubs and trees. SECONDARY succession happens where a disturbance — a fire, flood, storm, logging, or an abandoned farm field — has removed the vegetation but left the soil and its seed bank and roots intact. Because the soil is already there, recovery is much faster, often a matter of decades: fast-growing weedy plants and grasses first, then shrubs and sun-loving trees, then shade-tolerant forest species. Both processes tend toward a relatively stable "climax" community suited to the climate, though ecologists now see that endpoint as dynamic rather than fixed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-carrying-capacity',
    title: 'What Carrying Capacity Is',
    category: 'Ecology',
    keywords: [
      'what is carrying capacity', 'maximum sustainable population environment', 'carrying capacity K logistic growth',
      'population overshoot and crash', 'what limits population size', 'is human carrying capacity fixed',
    ],
    content: `Carrying capacity is the maximum population size of a species that a given environment can support indefinitely, given its food, water, shelter, breeding sites and ability to absorb waste. It has nothing to do with the data capacity of a cable. In population models it is written as "K." When a population is well below K it can grow quickly; as it rises toward K, competition for resources, predation, disease and stress increase, birth rates fall and death rates climb, until the population roughly levels off — the S-shaped "logistic" growth curve. A population can temporarily "overshoot" carrying capacity by depleting its resources, then crash below K as those resources recover. Carrying capacity is not a fixed number: it varies with the seasons, weather, and disturbances, and it drops when habitat is degraded or destroyed. For humans it is heavily debated, because technology (agriculture, sanitation, energy) and differences in per-person consumption change how many people a given amount of land and resources can sustain.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-eutrophication',
    title: 'What Eutrophication Is',
    category: 'Ecology',
    keywords: [
      'what is eutrophication', 'nutrient pollution algal bloom', 'nitrogen phosphorus runoff fertilizer', 'dead zone hypoxia water',
      'why do algae blooms kill fish', 'cyanobacteria toxic bloom', 'gulf of mexico dead zone eutrophication',
    ],
    content: `Eutrophication is the over-enrichment of a body of water with plant nutrients — chiefly nitrogen and phosphorus — which throws the ecosystem out of balance. The nutrients usually come from fertiliser washing off farmland, sewage and wastewater, animal manure, and phosphate detergents. Flooded with nutrients, algae and cyanobacteria multiply explosively into a surface "bloom." The bloom blocks sunlight, so submerged plants die; then the huge mass of algae itself dies, and the bacteria that decompose it consume the dissolved oxygen in the water. The result is hypoxic or anoxic "dead zones" where fish, shellfish and invertebrates suffocate — as in the Gulf of Mexico off the Mississippi, the Baltic Sea, and Lake Erie. Some cyanobacterial blooms also release toxins dangerous to people, pets and livestock. Eutrophication can occur slowly and naturally over centuries, but human nutrient pollution has made it one of the most widespread water-quality problems in the world; the fix is reducing nutrient runoff at the source.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bioaccumulation',
    title: 'What Bioaccumulation Is (and Biomagnification)',
    category: 'Ecology',
    keywords: [
      'what is bioaccumulation', 'bioaccumulation vs biomagnification', 'ddt mercury pcbs food chain', 'why is mercury high in tuna',
      'fat soluble persistent chemicals accumulate', 'forever chemicals bioaccumulate', 'top predator contaminant levels',
    ],
    content: `Bioaccumulation is the gradual build-up of a substance inside a single organism over its lifetime, because the organism takes the substance in — from food, water, or air — faster than its body can break it down or excrete it. Substances that bioaccumulate most are chemically stable and fat-soluble, so they get stored in fatty tissue rather than flushed out: examples include the pesticide DDT, methylmercury, PCBs, dioxins, and "forever chemicals" (PFAS). BIOMAGNIFICATION is the related effect that occurs along a food chain: a predator eats many contaminated prey animals and retains the contaminant from all of them, so the concentration multiplies at each trophic level. By the time you reach top predators — large tuna and swordfish, birds of prey, seals, orcas, and humans — the levels can be millions of times higher than in the surrounding water. This is why DDT thinned the eggshells of eagles and falcons (nearly wiping them out before it was banned) and why health advisories limit how much large predatory fish young children and pregnant women should eat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-desertification',
    title: 'What Desertification Is',
    category: 'Ecology',
    keywords: [
      'what is desertification', 'land degradation dryland desert', 'overgrazing overfarming deforestation soil', 'sahel desertification great green wall',
      'is the sahara a country', 'salinization irrigation desertification', 'how to stop desertification',
    ],
    content: `Desertification is the process by which fertile, productive land in dry regions (arid, semi-arid and dry sub-humid zones) degrades until it can no longer support crops, livestock, or natural vegetation — taking on desert-like conditions. It is not simply "the Sahara" (which is a desert, not a country) marching outward; it happens in patches wherever dryland is pushed too hard. The causes combine climate stress (drought, and rising temperatures from climate change) with unsustainable human land use: overgrazing that strips the ground cover, over-cultivation that exhausts the soil, cutting trees and shrubs for firewood, and poorly managed irrigation that leaves salt building up in the soil (salinisation). Once the protective vegetation is gone, wind and rain strip the topsoil and the land's ability to hold water collapses. It affects the African Sahel, North Africa, the Middle East, Central Asia, northern China, and parts of the US, Australia and Spain, and threatens the food and water security of hundreds of millions of people. Countermeasures include the African-led "Great Green Wall" tree-planting effort, restoring soil with cover crops, terracing and contour bunds, rotational grazing, and agroforestry.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wetland',
    title: 'What a Wetland Is and Why It Matters',
    category: 'Ecology',
    keywords: [
      'what is a wetland and why does it matter', 'marsh swamp bog fen mangrove', 'wetlands filter water flood control',
      'wetlands carbon storage peat', 'why are wetlands biologically productive', 'ramsar convention wetland loss',
    ],
    content: `A wetland is an area where the soil is saturated with water — permanently or seasonally — for long enough that water-tolerant plants dominate and the waterlogged soil becomes low in oxygen. The main types are marshes (grasses and reeds), swamps (trees and shrubs), bogs and fens (peat-forming, acidic or mineral-fed), and coastal mangroves and salt marshes. Wetlands cover only about 6% of the Earth's land surface but provide outsized benefits: they filter sediment, nutrients and pollutants out of water (acting as natural water treatment), recharge groundwater, soak up floodwater and slow it down, buffer coastlines against storm surges and erosion, and store enormous amounts of carbon — peatlands alone hold roughly twice as much carbon as all the world's forests. They are also among the most biologically productive habitats on Earth, serving as nurseries for fish and shellfish and breeding and stopover grounds for huge numbers of birds. Roughly a third of the world's wetlands have been lost since 1970, mostly drained for farmland and development; the Ramsar Convention (1971) is the international treaty for protecting them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tragedy-of-the-commons',
    title: 'What the Tragedy of the Commons Is',
    category: 'Ecology',
    keywords: [
      'what is the tragedy of the commons', 'garrett hardin 1968', 'shared resource overuse depletion', 'overfishing overgrazing commons',
      'elinor ostrom governing the commons', 'solutions to the tragedy of the commons', 'free rider problem shared resource',
    ],
    content: `The tragedy of the commons, named in a 1968 essay by ecologist Garrett Hardin, is the situation in which a shared, finite resource that anyone can access gets overused and depleted, because each individual user gets the full benefit of taking a little more, while the cost of the depletion is spread thinly across everyone. So it stays individually rational to keep taking even as the resource collapses for the whole group. Classic examples: an overgrazed common pasture, overfished seas, drained groundwater, cleared forests, and pollution of shared air and oceans — climate change is often described as a global tragedy of the commons. Proposed solutions include government regulation and quotas, assigning private property rights, and taxes or tradable permits that make users pay the true cost. The economist Elinor Ostrom, who won a Nobel Prize for the work, showed that communities around the world have also successfully managed shared resources themselves through locally agreed rules, monitoring, and graduated penalties — so the "tragedy" is not inevitable. (This is an economics and ecology concept, unrelated to the television series Fargo, which used the phrase as an episode title.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nitrogen-cycle-full',
    title: 'What the Nitrogen Cycle Is',
    category: 'Ecology',
    keywords: [
      'what is the nitrogen cycle', 'nitrogen fixation nitrification denitrification', 'why cant plants use n2 gas directly',
      'rhizobium legumes nitrogen fixing bacteria', 'haber bosch process fertilizer nitrogen', 'ammonia nitrite nitrate',
    ],
    content: `The nitrogen cycle is the movement of nitrogen between the atmosphere, living things, soil and water. Nitrogen gas (N2) makes up 78% of the air, but the two atoms are triple-bonded and almost no organism can use it directly. FIXATION converts N2 into usable ammonia: mostly by specialised bacteria (free-living, and Rhizobium living in nodules on the roots of legumes like beans, peas and clover), plus a little by lightning. NITRIFICATION: soil bacteria then convert ammonia to nitrite and nitrite to nitrate, the form most plants take up through their roots. ASSIMILATION: plants build the nitrogen into proteins and DNA, and animals get it by eating plants. When organisms excrete waste or die, DECOMPOSERS release the nitrogen back to ammonia (ammonification). DENITRIFICATION: another group of bacteria converts nitrate back to N2 gas, returning it to the atmosphere and closing the loop. Humans have roughly doubled the amount of reactive nitrogen in circulation, mainly through the industrial Haber-Bosch process that makes synthetic fertiliser, which boosts crop yields but also drives eutrophication and produces nitrous oxide, a potent greenhouse gas.`,
    createdAt: Date.now(),
  },
];
