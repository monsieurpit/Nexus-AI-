import { KnowledgeItem } from '../../types';

// Batch 71 (geology & earth science, deeper — batch 25 covered the basics).
// nexus-4b misses: "what is a volcano and why does it erupt" only described
// Hawaiian shield volcanoes and never said why magma rises or erupts; "what is
// the carbon cycle" was garbled ("using those cycles like carbon, nitrogen,
// phosphorus, and water"); "mineral versus crystal" called zinc oxide and
// titanium dioxide minerals (those are the synthetic compounds; the minerals
// are zincite and rutile); "groundwater and an aquifer" called aquifers "deep
// pockets."
export const GEOLOGY_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-why-volcano-erupts',
    title: 'What a Volcano Is and Why It Erupts',
    category: 'Geology',
    keywords: [
      'what is a volcano and why does it erupt', 'why does magma rise', 'why are some eruptions explosive', 'volcanic gases dissolved magma',
      'shield volcano vs stratovolcano', 'magma viscosity silica eruption', 'what triggers a volcanic eruption',
    ],
    content: `A volcano is an opening in Earth's crust where molten rock (magma), gas and ash reach the surface. Magma forms where the mantle or lower crust partly melts — at spreading plate boundaries, above subducting plates, and over hotspots. It erupts for two linked reasons. First, magma is less dense than the surrounding solid rock, so it is buoyant and slowly rises, collecting in a chamber. Second, magma contains dissolved gases (mostly water vapour and carbon dioxide); as it rises and the pressure drops, those gases come out of solution and form bubbles that expand rapidly — the same as opening a shaken bottle of soda. How violent the eruption is depends on the magma: runny, low-silica basalt lets gas escape gently, giving lava flows and broad "shield" volcanoes (Hawaii); thick, sticky, high-silica magma traps gas until it bursts, producing explosive eruptions, ash columns and steep "stratovolcanoes" (Mount St. Helens, Vesuvius). An eruption is often triggered when fresh hot magma enters the chamber, or when the roof rock finally fails.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-carbon-cycle',
    title: 'What the Carbon Cycle Is',
    category: 'Geology',
    keywords: [
      'what is the carbon cycle', 'fast vs slow carbon cycle', 'photosynthesis respiration carbon', 'ocean carbon sink',
      'how do fossil fuels fit the carbon cycle', 'carbon reservoirs atmosphere ocean rock', 'why is human carbon a problem',
    ],
    content: `The carbon cycle is the continuous movement of carbon among four main reservoirs: the atmosphere (as CO2 and methane), the oceans (dissolved CO2, carbonate ions, and marine organisms), the land (plants, soils, and rock), and living things. It runs at two speeds. The FAST cycle (years to centuries): photosynthesis pulls CO2 out of the air and builds it into plant tissue; respiration by plants, animals and microbes, plus decomposition and fire, release it back; the ocean surface constantly exchanges CO2 with the air, and phytoplankton draw it down. The SLOW cycle (thousands to millions of years): carbon gets locked away as limestone and other rock formed from marine shells, and as buried organic matter that becomes coal, oil and gas; it returns slowly through volcanic eruptions and the chemical weathering of rock. These flows were roughly in balance. Burning fossil fuels takes carbon that the slow cycle stored over hundreds of millions of years and injects it into the atmosphere in a couple of centuries — far faster than plants and the ocean can absorb the excess — which is why atmospheric CO2 is rising.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mineral-vs-crystal',
    title: 'The Difference Between a Mineral and a Crystal',
    category: 'Geology',
    keywords: [
      'what is the difference between a mineral and a crystal', 'is every mineral a crystal', 'are all crystals minerals',
      'crystalline vs amorphous solid', 'what makes something a mineral', 'quartz mineral crystal', 'is glass a crystal',
    ],
    content: `The two words describe different things. A MINERAL is defined by four criteria: it occurs naturally, it is inorganic (not made by living processes), it is solid, and it has a definite chemical composition and an ordered internal atomic arrangement. Quartz, feldspar, calcite, halite and pyrite are minerals. A CRYSTAL is any solid whose atoms are arranged in an orderly, repeating three-dimensional pattern (a lattice); when a crystal grows freely it develops flat faces and geometric shapes that reflect that internal order. So the relationship: almost all minerals are crystalline, and a well-formed mineral specimen is a crystal. But not all crystals are minerals — table salt, sugar, snowflakes, and lab-grown gemstones are crystals that are either synthetic or organic. And not all solids are crystals: glass and obsidian are "amorphous," their atoms frozen in a disordered jumble, so they are not crystalline and (for glass) not minerals. Everyday jewellery use of "crystal" for cut glass or clear quartz is looser than the scientific meaning.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-groundwater-aquifer',
    title: 'What Groundwater and an Aquifer Are',
    category: 'Geology',
    keywords: [
      'what is groundwater and an aquifer', 'water table definition', 'confined vs unconfined aquifer', 'how does an aquifer recharge',
      'porosity permeability aquifer', 'why is groundwater depletion a problem', 'aquitard aquifer',
    ],
    content: `Groundwater is water that has soaked down through the soil and fills the spaces (pores and fractures) in rock and sediment below the surface. The depth below which all those spaces are completely saturated is the "water table." An aquifer is a body of rock or sediment porous and permeable enough to both hold a useful amount of groundwater and let it flow to a well or spring — sand, gravel, sandstone and fractured limestone make good aquifers; clay and solid granite do not (a low-permeability layer is an "aquitard"). Aquifers are not necessarily deep or shaped like pockets; some are shallow and continent-spanning. An "unconfined" aquifer is open to the surface and recharges directly from rain and rivers; a "confined" aquifer is trapped between impermeable layers and recharges only where it reaches the surface far away, sometimes over thousands of years. About a third of the world's drinking water and much of its irrigation come from aquifers, and many are being pumped faster than they recharge, causing water tables to drop, land to subside, and wells and rivers to dry up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-fossils-form',
    title: 'How Fossils Form',
    category: 'Geology',
    keywords: [
      'how do fossils form', 'permineralization petrification', 'mold and cast fossil', 'why are fossils rare',
      'trace fossils footprints', 'what conditions preserve a fossil', 'carbonization amber fossil',
    ],
    content: `Most fossils form when an organism dies and is buried quickly by sediment — mud, sand, or volcanic ash, usually in water — before scavengers, decay or erosion destroy it. Soft tissue almost always rots, so it is normally the hard parts (bones, teeth, shells, wood) that survive. Over thousands to millions of years, as sediment piles up and turns to rock, several things can happen: PERMINERALIZATION, where mineral-rich water seeps in and deposits minerals in the pores, turning the remains to stone ("petrified"); replacement, where the original material dissolves and is swapped mineral-for-mineral; MOLD AND CAST, where the object dissolves leaving a cavity that later fills with minerals; carbonization, where pressure squeezes everything but a thin carbon film (common for leaves and fish); or original preservation in amber, tar, ice or dry caves. "Trace fossils" record activity rather than the body — footprints, burrows, droppings. Fossilization is rare: it needs hard parts, rapid burial, low oxygen and the right chemistry, and the rock must then survive and be exposed, so the fossil record is a small, biased sample of past life.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tsunami-cause',
    title: 'What Causes a Tsunami',
    category: 'Geology',
    keywords: [
      'what causes a tsunami', 'how does an undersea earthquake make a tsunami', 'why is a tsunami barely noticeable in the open ocean',
      'tsunami drawback before wave', 'tsunami speed deep ocean', 'landslide volcanic tsunami', 'tsunami vs tidal wave',
    ],
    content: `A tsunami is a series of very long-wavelength ocean waves caused by the sudden vertical displacement of a large volume of water. The usual cause is a large undersea earthquake at a subduction zone, where the seafloor abruptly thrusts up or drops, shoving the entire water column above it. Underwater landslides, volcanic eruptions or collapses, and (rarely) meteorite impacts can do the same. In the deep ocean a tsunami travels extremely fast — around 700–900 km/h, as fast as a jet — but its wave height is often under a metre and its crests are minutes to an hour apart, so ships barely feel it pass. As it reaches shallow coastal water it slows down and the energy piles up vertically ("shoaling"), so the wave grows to many metres. A common warning sign is the sea suddenly retreating far from shore (the trough arriving first) minutes before the first crest. Tsunamis are not related to tides, so "tidal wave" is a misleading old name.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soil-composition',
    title: 'What Soil Is Made Of',
    category: 'Geology',
    keywords: [
      'what is soil made of', 'soil mineral organic water air proportions', 'soil horizons o a b c', 'how long does soil take to form',
      'sand silt clay loam', 'humus organic matter soil', 'is soil alive',
    ],
    content: `Healthy topsoil is roughly 45% mineral particles, 25% water, 25% air, and about 5% organic matter, though the proportions shift constantly. The mineral fraction comes from weathered rock and is sorted by particle size into sand (largest), silt, and clay (smallest); a balanced mix is called loam and is best for plants. The organic fraction is living organisms (a teaspoon of soil can hold billions of bacteria, plus fungi, protozoa, nematodes, insects and worms) and dead material breaking down into dark, stable "humus," which stores nutrients and water. Soil develops downward into layers called horizons: O (surface litter), A (topsoil, dark, rich in organic matter and life), B (subsoil, where clay and minerals accumulate), and C (weathered parent rock). Forming a few centimetres of true soil takes centuries to thousands of years, which is why soil erosion and degradation are treated as effectively permanent losses on a human timescale.`,
    createdAt: Date.now(),
  },
];
