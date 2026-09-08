import { KnowledgeItem } from '../../types';

// Batch 111 (oceanography). Real errors/misses on nexus-4b: "the marine food
// chain from phytoplankton up" was answered with a terrestrial food chain
// (grasshoppers, frogs, snakes, hawks); "what causes waves in the ocean" was
// answered about tsunamis; "continental shelf slope and rise" defined the rise
// as a cliff face (that is the slope); "why is the ocean salty" returned a
// summary of the Corto Maltese graphic novel; "plankton nekton and benthos"
// was a web dump that never mentioned nekton; "deep scattering layer" was
// explained backwards (it scatters sonar strongly, it does not disappear).
export const OCEANOGRAPHY_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-marine-food-chain',
    title: 'The Marine Food Chain from Phytoplankton Up',
    category: 'Oceanography',
    keywords: [
      'what is the marine food chain from phytoplankton up', 'phytoplankton photosynthesisers the base zooplankton copepods and krill graze on them', 'small forage fish anchovies herring sardines and baleen whales eat plankton',
      'larger predatory fish tuna cod then apex predators sharks dolphins seals seabirds orcas', 'krill is a key link baleen whales eat plankton directly', 'microbial loop decomposers marine snow',
    ],
    content: `The ocean food web is built on PHYTOPLANKTON — microscopic drifting algae and cyanobacteria that photosynthesise in the sunlit surface layer and produce roughly half of all the oxygen on Earth. They are grazed by ZOOPLANKTON: tiny drifting animals, above all copepods and, in colder seas, krill. Those are eaten by small "forage fish" — anchovies, sardines, herring, capelin — and also directly by filter feeders including basking sharks, whale sharks, manta rays and the great baleen whales (which is why the largest animals on the planet eat some of the smallest). The forage fish are eaten by larger predatory fish such as tuna, cod, salmon, and squid, which in turn are taken by apex predators: sharks, dolphins, seals and sea lions, seabirds, and orcas. Dead material and waste sink as "marine snow," feeding deep-sea and seafloor life and being recycled by bacteria (the microbial loop) back into nutrients. (This is an entirely aquatic chain — grasshoppers, frogs, snakes and hawks belong to a land food chain.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-causes-ocean-waves',
    title: 'What Causes Waves in the Ocean',
    category: 'Oceanography',
    keywords: [
      'what causes waves in the ocean', 'most ocean waves are wind waves wind blowing over the surface transfers energy through friction and pressure', 'wave size depends on wind speed duration and fetch the distance of open water',
      'the water moves in circles not forward it is the energy that travels', 'far from the storm waves sort into smooth swell', 'tides from gravity tsunamis from displacement internal waves',
    ],
    content: `The great majority of ocean waves are WIND WAVES. When wind blows across the water it drags on the surface through friction and pushes unevenly on the little ripples it creates, transferring energy into the water. How big the waves get depends on three things: the wind's speed, how long it blows (duration), and the "fetch" — the uninterrupted distance of open water it blows over. A key point: the water itself does not travel across the ocean with the wave; each parcel of water moves in a roughly circular loop and returns near where it started — it is the *energy* that propagates. As waves move away from the storm that made them, they sort themselves by wavelength into long, smooth, regular "swell" that can cross an entire ocean. Other, less common wave types are driven differently: tides are waves driven by the gravity of the Moon and Sun, tsunamis are caused by the sudden displacement of a large volume of water (earthquake, landslide, volcano), and internal waves ripple along the boundary between water layers of different density below the surface.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-continental-shelf-slope-rise',
    title: 'Continental Shelf, Slope and Rise',
    category: 'Oceanography',
    keywords: [
      'what is the continental shelf slope and rise', 'continental shelf shallow gently sloping submerged edge of the continent average about 130 m deep out to the shelf break',
      'continental slope the relatively steep drop from the shelf break down to the deep ocean floor 3 to 6 degrees cut by submarine canyons', 'continental rise the gently sloping wedge of sediment piled at the foot of the slope transitioning to the abyssal plain',
      'together they form the continental margin', 'the rise is not a cliff face that is the slope',
    ],
    content: `Going from the coast out to the deep sea, the submerged edge of a continent has three parts. The CONTINENTAL SHELF is the shallow, very gently sloping platform that fringes the land — geologically it is part of the continent, just flooded. It averages about 130 m deep at its outer edge and can be anywhere from a few kilometres wide (off steep coasts like western South America) to over 1,000 km (the Siberian shelf). It ends at the "shelf break." The CONTINENTAL SLOPE is the comparatively steep descent from the shelf break down toward the ocean floor, typically at 3–6 degrees, often gouged by deep submarine canyons carved by sediment-laden currents. The CONTINENTAL RISE is NOT the steep part — it is the gently sloping apron of sediment that has accumulated at the *base* of the slope, spreading out and thinning as it merges into the flat abyssal plain of the deep ocean. Shelf plus slope plus rise together make up the "continental margin."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-ocean-salty',
    title: 'Why the Ocean Is Salty (and Whether It Is Getting Saltier)',
    category: 'Oceanography',
    keywords: [
      'why is the ocean salty and does it get saltier over time', 'rivers weather rocks on land and carry dissolved minerals mainly sodium and chloride ions to the sea',
      'water evaporates and returns as rain but the salts stay behind and accumulate', 'also submarine volcanism and hydrothermal vents', 'ocean salinity is roughly in steady state salt is removed about as fast as it is added not getting saltier over geological time',
      'average salinity about 35 grams per kilogram 3.5 percent',
    ],
    content: `Ocean salt comes mainly from the land. Rain is slightly acidic and slowly dissolves minerals out of rocks and soil; rivers carry those dissolved ions to the sea. When seawater evaporates it leaves the salts behind, so over hundreds of millions of years the dissolved ions — dominated by sodium and chloride, with magnesium, sulfate, calcium and potassium — have built up. Undersea volcanoes and hydrothermal vents add more. However, the ocean is not steadily getting saltier: it is close to a long-term steady state, because salt is removed about as fast as it is supplied — precipitating into seafloor sediments and minerals, being incorporated into new oceanic crust at hydrothermal vents, and blown ashore as sea spray. Average ocean salinity is about 35 grams of dissolved salt per kilogram of water (3.5%), varying with evaporation, rainfall, river inflow and ice formation. (There is no connection to "The Ballad of the Salty Sea," a Corto Maltese comic.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-plankton-nekton-benthos',
    title: 'Plankton vs Nekton vs Benthos',
    category: 'Oceanography',
    keywords: [
      'what is the difference between plankton nekton and benthos', 'plankton drifters that cannot swim against currents phytoplankton zooplankton jellyfish larvae',
      'nekton active swimmers that move independently of currents fish squid marine mammals sea turtles', 'benthos organisms living on or in the seafloor corals clams crabs sea stars worms sponges',
      'three lifestyle categories of aquatic organisms not depth zones', 'many animals are planktonic as larvae then become nekton or benthos as adults',
    ],
    content: `These are three categories that classify marine organisms by how they live and move, not by where in the water column they are. PLANKTON are drifters: organisms that float and are carried by currents because they cannot swim strongly enough to go against them. This includes phytoplankton (drifting algae), zooplankton (drifting animals — copepods, krill, arrow worms), most jellyfish, and the tiny larval stages of many fish and invertebrates. NEKTON are active swimmers: animals powerful enough to move where they want independently of the current — fish, squid and octopuses, marine mammals (whales, dolphins, seals), sea turtles, and sea snakes. BENTHOS are bottom-dwellers: organisms that live on, attached to, or burrowed into the seafloor — corals, sponges, anemones, clams and other bivalves, crabs and lobsters, sea stars, sea urchins, and marine worms. Many species move between categories over their life cycle, for example a crab that drifts as planktonic larvae and then settles to become benthos as an adult.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-deep-scattering-layer',
    title: 'The Mesopelagic Twilight Zone and the Deep Scattering Layer',
    category: 'Oceanography',
    keywords: [
      'what is the twilight zone or mesopelagic and the deep scattering layer', 'mesopelagic zone roughly 200 to 1000 metres dim fading light below the sunlit epipelagic above the dark bathypelagic',
      'deep scattering layer strongly reflects sonar early operators mistook it for a false seafloor phantom bottom', 'caused by swim bladders of billions of small fish lanternfish plus siphonophores and krill',
      'diel vertical migration rises toward the surface at night to feed descends at dawn the largest animal migration on earth by biomass',
    ],
    content: `The mesopelagic or "twilight" zone runs from about 200 m down to about 1,000 m — below the sunlit surface layer and above the permanently dark bathypelagic. A tiny amount of blue light filters down, too little for photosynthesis but enough for the eyes of the animals living there. Sonar surveys of this zone revealed the DEEP SCATTERING LAYER: a band that reflects sound so strongly that early Second World War sonar operators mistook it for a false seafloor and called it the "phantom bottom." It is not that the animals "disappear" from sonar — the opposite: they scatter it powerfully. The reflection comes mostly from the gas-filled swim bladders of billions of small mesopelagic fish (especially lanternfish, the most numerous vertebrates on Earth), together with gas floats of siphonophores and dense swarms of krill. The layer performs "diel vertical migration": every night it rises hundreds of metres toward the surface to feed under cover of darkness, and every dawn it sinks back down — collectively the largest animal migration on the planet, repeated every 24 hours.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-great-pacific-garbage-patch',
    title: 'What the Great Pacific Garbage Patch Is',
    category: 'Oceanography',
    keywords: [
      'what is the great pacific garbage patch', 'not a solid island a diffuse soup of mostly microplastics concentrated by the north pacific subtropical gyre',
      'about 1.6 million square kilometres roughly three times the size of france', 'about half the mass is abandoned fishing gear ghost nets the rest mostly land-based plastic', 'an eastern patch near california and a western patch near japan linked by the subtropical convergence zone',
      'harms marine life through entanglement and ingestion breaks down into microplastics does not biodegrade',
    ],
    content: `The Great Pacific Garbage Patch is a vast area of the North Pacific where floating plastic debris accumulates, trapped by the slow, clockwise rotation of the North Pacific Subtropical Gyre, which draws surface water and anything in it toward the centre. It is not a solid, walkable island of trash — most of it is a diffuse "soup" of small fragments and microplastics spread through the water, with larger items scattered across it. It is often estimated at roughly 1.6 million square kilometres (about three times the size of France, or twice Texas), though the boundary is fuzzy because concentration just tapers off. Around half of its mass is abandoned or lost fishing gear ("ghost nets"), and most of the rest is land-sourced plastic that washed or blew out to sea via rivers and coasts. There is actually more than one accumulation zone — an eastern patch between Hawaii and California and a western patch off Japan, connected by the North Pacific Subtropical Convergence Zone. It harms wildlife through entanglement and through ingestion of plastic that fills stomachs and carries toxins up the food chain, and the plastic does not biodegrade — it only breaks into ever-smaller pieces. (It has nothing to do with the voyages of Bering or Cook.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-coastal-upwelling',
    title: 'What Upwelling Is and Why It Matters for Fisheries',
    category: 'Oceanography',
    keywords: [
      'what is upwelling and why does it matter for fisheries', 'upwelling wind pushes surface water away from a coast ekman transport and deep cold nutrient-rich water rises to replace it',
      'nutrients fuel phytoplankton blooms which feed the whole food web', 'major upwelling zones off peru california northwest and southwest africa', 'these coastal zones produce a huge share of the world fish catch on a small fraction of ocean area',
      'el nino suppresses peruvian upwelling and the anchovy fishery collapses',
    ],
    content: `Upwelling is the rising of deep water toward the surface. The most important kind is coastal upwelling: when wind blows along a coastline, the Coriolis effect deflects the wind-driven surface water offshore ("Ekman transport"), and cold, dense water from a few hundred metres down rises to take its place. That deep water is rich in the nitrate, phosphate and silicate that have accumulated from sinking, decomposing organic matter. Bringing those nutrients up into the sunlit layer triggers huge blooms of phytoplankton, which feed zooplankton, which feed vast schools of small fish, and so on up the chain. As a result, the few narrow coastal upwelling zones — off Peru and Chile, California, northwest Africa (Mauritania/Senegal), and southwest Africa (Benguela current) — produce roughly a fifth of the world's wild fish catch while covering only about 1% of the ocean's surface. This also makes those fisheries fragile: during an El Niño the trade winds weaken, upwelling off Peru shuts down, the phytoplankton crashes, and the enormous Peruvian anchoveta fishery collapses.`,
    createdAt: Date.now(),
  },
];
