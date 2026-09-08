import { KnowledgeItem } from '../../types';

// Batch 63 (climate & clean energy) gap-fills. Live misses on nexus-4b:
// "what is a climate feedback loop" -> a rant about manga publishing and reader
// polls; "what is a tipping point in the climate system" -> "when the weather
// you're getting contradicts the climate you expect"; "why is concrete a
// climate problem" -> drifted into "climate models aren't testing tomorrow's
// forecast"; "recycling vs composting" -> "recycling just... it's overrated";
// "how does a solar panel generate electricity" -> "the photovoltaic effect,
// Bell Labs 1954" with no mechanism.
export const CLIMATE_ENERGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-climate-feedback-loop',
    title: 'What a Climate Feedback Loop Is',
    category: 'Climate',
    keywords: [
      'what is a climate feedback loop', 'positive vs negative climate feedback', 'ice albedo feedback', 'water vapor feedback',
      'permafrost feedback loop', 'what makes climate change accelerate', 'runaway warming feedback',
    ],
    content: `A climate feedback loop is a process where an initial change in the climate causes effects that feed back and either amplify that change (a POSITIVE feedback) or dampen it (a NEGATIVE feedback) — "positive" means self-reinforcing, not "good." The big positive feedbacks, which is why warming can accelerate and tip: the ICE-ALBEDO feedback (bright ice and snow reflect sunlight; as they melt they expose dark ocean and land that absorb more heat, causing more warming and more melting); the WATER-VAPOUR feedback (warmer air holds more water vapour, which is itself a greenhouse gas, so it warms things further); PERMAFROST THAW (frozen Arctic soil holds enormous amounts of carbon; as it thaws it releases CO2 and methane); and FOREST DIEBACK AND WILDFIRES (heat and drought kill forests and cause fires that release the carbon the trees stored). A stabilising negative feedback: more atmospheric CO2 and warmth can speed plant growth, absorbing some CO2 back. Because the positive feedbacks are stronger, the climate system doesn't respond to emissions in a simple, gentle line — it can amplify a push. (Nothing to do with manga publishing or reader polls.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-climate-tipping-point',
    title: 'What a Tipping Point in the Climate System Is',
    category: 'Climate',
    keywords: [
      'what is a tipping point in the climate system', 'climate tipping points list', 'amoc collapse', 'greenland ice sheet tipping point',
      'amazon rainforest dieback', 'is climate change reversible', 'abrupt irreversible climate change',
    ],
    content: `A climate tipping point is a threshold in a part of the Earth system beyond which a small extra push of warming triggers a large, self-sustaining and often irreversible shift to a new state — the change keeps going even if you stop adding heat, and it can't easily be undone on human timescales. It has nothing to do with the difference between weather and climate. The main tipping elements scientists worry about: the collapse (over centuries to millennia) of the Greenland and West Antarctic ice sheets, committing the world to many metres of sea-level rise; dieback of the Amazon rainforest into savanna, releasing its carbon and changing rainfall across South America; a slowdown or shutdown of the Atlantic Meridional Overturning Circulation (AMOC), the ocean current system that includes the Gulf Stream, which would sharply cool north-west Europe and shift monsoons; abrupt thawing of large areas of permafrost; die-off of the world's warm-water coral reefs; and loss of Arctic summer sea ice. Some of these may be crossed at only 1.5–2 °C of warming, which is a central reason for treating those temperature limits as hard lines rather than gentle guidelines.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-concrete-climate',
    title: 'Why Concrete (Cement) Is a Climate Problem',
    category: 'Climate',
    keywords: [
      'why is concrete a climate problem', 'cement carbon emissions', 'how much co2 does cement produce', 'process emissions cement',
      'clinker cement climate', 'low carbon concrete alternatives', 'is concrete bad for the environment',
    ],
    content: `Cement — the binder in concrete — is responsible for roughly 7–8% of global CO2 emissions, more than aviation and shipping combined, and concrete is the second-most-used substance on Earth after water. The emissions come from two sources. First, the chemistry: making cement means heating crushed limestone (calcium carbonate) in a kiln to about 1,450 °C to make "clinker," and that reaction drives off CO2 that was locked in the rock — these unavoidable "process emissions" are roughly 60% of the total. Second, the fuel: reaching that temperature normally burns coal, petcoke or gas, adding the other ~40%. Ways to cut it: replace some of the clinker with waste materials (fly ash, slag, calcined clay), use alternative low-carbon binders, capture the CO2 from cement plants (a rare case where CCS makes clear sense because the process emissions can't just be electrified away), design buildings to use less concrete and reuse it, and let concrete slowly reabsorb some CO2 over its life ("carbonation"). (This is unrelated to how climate models are validated.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-recycling-vs-composting',
    title: 'The Difference Between Recycling and Composting',
    category: 'Environment',
    keywords: [
      'what is the difference between recycling and composting', 'recycling vs composting', 'can you compost paper',
      'why cant you put food waste in the recycling', 'what goes in a compost bin', 'is composting better than recycling',
      'greens and browns composting',
    ],
    content: `Recycling and composting are two different ways of keeping waste out of landfill, for two different kinds of material. RECYCLING is an industrial process: used INORGANIC or manufactured materials — paper and cardboard, glass, aluminium and steel cans, and certain plastics — are collected, sorted, cleaned, broken down and remade into new products. COMPOSTING is a biological process: ORGANIC matter — fruit and vegetable scraps, coffee grounds, eggshells, garden trimmings, leaves, and uncoated paper — is broken down by microbes, fungi and sometimes worms into a dark, crumbly, soil-like material ("compost") that improves garden soil. They're kept separate because each ruins the other: food and liquids contaminate a batch of recyclables (a greasy pizza box can spoil a whole load of paper), and metal, glass and most plastic won't decompose in a compost heap. Good composting balances "greens" (wet, nitrogen-rich food and grass) with "browns" (dry, carbon-rich leaves and cardboard), stays about as damp as a wrung-out sponge, and gets air. Composting food scraps also matters for climate: in a landfill they rot without oxygen and produce methane, a potent greenhouse gas, whereas a compost heap doesn't.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-solar-panel-mechanism',
    title: 'How a Solar Panel Actually Generates Electricity',
    category: 'Energy',
    keywords: [
      'how does a solar panel actually generate electricity', 'photovoltaic effect explained', 'how does a solar cell work',
      'p-n junction solar cell', 'why do solar panels produce dc', 'solar inverter what does it do', 'why are solar panels blue or black',
    ],
    content: `A solar panel is made of many "photovoltaic" cells, each a thin wafer of silicon that has been "doped" with tiny amounts of other elements to create two layers: an "n-type" layer with spare electrons and a "p-type" layer with spare "holes" (missing electrons). Where the two layers meet, a permanent internal electric field forms. When a particle of sunlight (a photon) strikes the silicon, it transfers its energy to an electron and knocks it free, leaving a hole behind. The built-in electric field at the junction pushes the freed electrons toward one side and the holes toward the other, so if you connect a wire between the panel's terminals, the electrons flow around the external circuit as an electric current — that's the "photovoltaic effect." The current a panel produces is direct current (DC); an "inverter" converts it to the alternating current (AC) that homes and the grid use. Panels look dark because they're designed to absorb, not reflect, as much light as possible, and an anti-reflective coating is why many look blue. Typical panels convert about 20–22% of the sunlight's energy into electricity; the rest is lost as reflection and heat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sea-level-rise',
    title: 'What Causes Sea Level Rise',
    category: 'Climate',
    keywords: [
      'what causes sea level rise', 'thermal expansion sea level', 'melting ice sheets sea level rise', 'why does melting sea ice not raise sea level',
      'how much has sea level risen', 'greenland antarctica ice melt', 'is sea level rise accelerating',
    ],
    content: `Global sea level is rising for two main reasons, roughly equal so far. (1) THERMAL EXPANSION: the ocean has absorbed more than 90% of the extra heat trapped by greenhouse gases, and warm water takes up slightly more volume than cold water — so the ocean is literally swelling. (2) LAND ICE MELTING: glaciers worldwide and the huge ice sheets on GREENLAND and ANTARCTICA are losing mass to the sea, adding water that was previously stored on land. Melting Arctic SEA ice (which floats) does NOT meaningfully raise sea level, for the same reason a melting ice cube doesn't overflow a full glass — the floating ice already displaces its own weight of water. Since 1900 global average sea level has risen about 20–25 cm, and the rate has more than doubled in recent decades to around 4 mm per year. Projections for 2100 range from about 30 cm to over 1 m, depending on emissions and how fast the ice sheets destabilise; the rise continues for centuries after warming stops because the ice sheets respond slowly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-paris-agreement',
    title: 'What the Paris Agreement Is',
    category: 'Climate',
    keywords: [
      'what is the paris agreement', 'paris agreement 2015 climate', 'nationally determined contributions', '1.5 degrees paris agreement',
      'is the paris agreement legally binding', 'did the us leave the paris agreement', 'cop climate conference',
    ],
    content: `The Paris Agreement is an international climate treaty adopted in 2015 at the UN climate conference (COP21) in Paris and now joined by nearly every country (around 195 parties). Its central goal is to hold the increase in global average temperature to "well below 2 °C" above pre-industrial levels, and to pursue efforts to limit it to 1.5 °C. Its design is "bottom-up": rather than assigning each country a binding emissions cap, every country submits its own voluntary plan — a "Nationally Determined Contribution" (NDC) — and is required to report progress transparently and to submit a new, stronger NDC every five years (the "ratchet mechanism"). So the reporting and review process is legally binding, but hitting the targets is not. The US left the agreement in 2017 under President Trump, rejoined in 2021 under President Biden, and announced withdrawal again in 2025. Current national pledges, even if met, put the world on track for roughly 2.5–2.9 °C — well short of the goal — but the agreement has driven policy, investment and technology cost declines, and provides the framework everyone negotiates within.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ocean-warming',
    title: 'What Ocean Warming Is Doing to the Planet',
    category: 'Climate',
    keywords: [
      'what is ocean warming doing to the planet', 'ocean absorbs heat global warming', 'marine heatwave effects', 'coral bleaching ocean warming',
      'ocean warming and hurricanes', 'ocean deoxygenation dead zones', 'why is the ocean the climate buffer',
    ],
    content: `The ocean has absorbed more than 90% of the extra heat trapped by human greenhouse-gas emissions, which is why the air has warmed "only" about 1.2–1.3 °C so far — the ocean has been the planet's shock absorber. The consequences of that stored heat are large and growing: CORAL BLEACHING and death, as heat stress makes corals expel the algae they depend on (mass bleaching events are now happening every few years instead of once a decade); MARINE HEATWAVES that kill kelp forests, fish and seabirds; STRONGER HURRICANES AND TYPHOONS, because warm surface water is their fuel, so they intensify faster and hold more rain; SEA-LEVEL RISE from thermal expansion (warm water takes up more volume); DEOXYGENATION, as warm water holds less oxygen, expanding low-oxygen "dead zones"; ICE-SHELF MELTING from below by warm ocean water pushing under Antarctic and Greenland ice; disrupted CURRENTS and a possible slowdown of the Atlantic overturning circulation; and species shifting toward the poles and to deeper water, reshuffling fisheries. The ocean also absorbs about a quarter of our CO2, causing the separate problem of ocean acidification.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-greenhouse-effect-vs-warming',
    title: 'Greenhouse Effect vs Global Warming',
    category: 'Climate',
    keywords: [
      'what is the greenhouse gas effect versus global warming', 'natural vs enhanced greenhouse effect', 'how does the greenhouse effect work',
      'which gases cause the greenhouse effect', 'why is the greenhouse effect necessary', 'enhanced greenhouse effect human',
    ],
    content: `The GREENHOUSE EFFECT is a natural and essential process: sunlight passes through the atmosphere and warms the Earth's surface, which then radiates heat back out as infrared radiation; certain gases — water vapour, carbon dioxide, methane, nitrous oxide — absorb some of that outgoing infrared and re-radiate it in all directions, including back down, keeping heat near the surface. Without it, Earth's average temperature would be about −18 °C instead of +15 °C, and life as we know it couldn't exist. GLOBAL WARMING is what happens when humans strengthen this effect — the "enhanced greenhouse effect" — by burning fossil fuels, clearing forests and farming livestock, which have raised atmospheric CO2 from about 280 parts per million before the Industrial Revolution to over 420 ppm today, the highest in at least 800,000 years. The result: about 1.2–1.3 °C of warming so far, likely reaching 1.5 °C in the early 2030s, and somewhere between roughly 1.5 °C and 4+ °C by 2100 depending on how fast emissions are cut. "Climate change" is the broader term, covering not just the temperature rise but shifting rainfall, extreme weather, sea-level rise and ecosystem disruption.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-methane-climate',
    title: 'Why Methane Is a Concern for Climate',
    category: 'Climate',
    keywords: [
      'why is methane a concern for climate', 'methane vs co2 greenhouse gas', 'how potent is methane', 'sources of methane emissions',
      'cow burps methane', 'natural gas leaks methane', 'why is cutting methane the fastest way to slow warming',
    ],
    content: `Methane (CH4) is the second-biggest driver of human-caused warming after CO2, responsible for roughly 30% of the warming to date. Per tonne it traps far more heat than CO2 — about 80 times as much over a 20-year period and around 28–30 times over 100 years — but it breaks down in the atmosphere in about 12 years, whereas CO2 lasts centuries. That short lifetime is the key point: cutting methane emissions is the single fastest lever available to slow warming in the next few decades. The main human sources are: agriculture, especially the digestion of cattle and other ruminants (they belch it out, more than they release from the other end) and flooded rice paddies and manure; the fossil-fuel industry, from leaks and deliberate venting at oil and gas wells, pipelines and coal mines; and landfills and wastewater, where organic waste rots without oxygen. A worrying natural feedback is methane released by thawing Arctic permafrost and wetlands. Because fossil-fuel methane leaks are cheap to plug, and satellites can now spot the biggest leaks, methane reduction is seen as some of the lowest-hanging fruit in climate policy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wind-turbine',
    title: 'How a Wind Turbine Works',
    category: 'Energy',
    keywords: [
      'how does a wind turbine work', 'wind turbine generate electricity', 'do turbine blades push or lift', 'wind turbine gearbox generator',
      'why do wind turbines only have three blades', 'cut-in cut-out wind speed', 'offshore wind turbine',
    ],
    content: `A wind turbine converts the kinetic energy of moving air into electricity. The blades are shaped like long, thin aeroplane wings: as wind flows over them, it creates LIFT (a sideways force), not just a push, which is what makes them spin efficiently. The rotating blades turn a shaft; in most large turbines a gearbox steps that slow rotation (10–20 rpm) up to the high speed a GENERATOR needs, and the generator uses electromagnetic induction (spinning magnets past coils) to produce electricity. A "yaw" motor keeps the whole nacelle pointed into the wind, and the blade "pitch" is adjusted to catch more or less wind. Turbines start generating at a "cut-in" wind speed of about 3–4 m/s, reach full power around 12–15 m/s, and shut down ("cut-out") above about 25 m/s to avoid damage. Three blades is the standard because it's the best balance of efficiency, cost, smoothness and low noise. The biggest offshore turbines now exceed 14–15 MW, with blades longer than a football field, and their output varies with the wind, which is why grids pair wind with storage, flexible backup and long transmission lines.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ev-battery-materials',
    title: 'What an Electric Vehicle Battery Is Made Of',
    category: 'Energy',
    keywords: [
      'what is an electric vehicle battery made of', 'ev battery lithium ion', 'nmc vs lfp battery', 'what metals are in an ev battery',
      'cobalt in ev batteries', 'how big is an ev battery pack', 'can ev batteries be recycled',
    ],
    content: `Almost all electric vehicles use lithium-ion battery packs — the same basic chemistry as a phone or laptop, but scaled up to thousands of individual cells wired together, typically weighing 300–500 kg and storing 40–100+ kilowatt-hours. Each cell has: a POSITIVE electrode (cathode) made of a lithium compound — either NMC (lithium plus nickel, manganese and cobalt), which is energy-dense, or increasingly LFP (lithium iron phosphate), which is cheaper, longer-lasting and safer but slightly heavier per kWh and uses no nickel or cobalt; a NEGATIVE electrode (anode) usually of graphite; a liquid ELECTROLYTE carrying lithium ions between them; a separator; and copper and aluminium current collectors. A "battery management system" monitors and balances every cell's charge, temperature and health. The materials raise real concerns — cobalt mining (much of it in the Democratic Republic of Congo, with child-labour issues), the water and land use of lithium extraction, and mining nickel — which is pushing the industry toward LFP, cobalt-free chemistries, and recycling: EV batteries can be reused for grid storage after they fade below driving spec, and their metals can be recovered and reprocessed.`,
    createdAt: Date.now(),
  },
];
