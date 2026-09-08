import { KnowledgeItem } from '../../types';

// Batch 25 (geology & earth science) gap-fills. Live misses on nexus-4b:
// "layers of the earth" -> answered atmosphere layers (troposphere...);
// "how are fossils formed" -> answered coal/oil/gas formation; "continental
// drift" -> "humanity originated in Africa... Australia is the only continent
// that's also a country"; "what is weathering" -> weather vs climate; "geode"
// -> AMD Geode SoC microprocessor; "what is the mantle" -> "rock and magma,
// temperatures no machine could handle".
export const GEOLOGY_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-layers-of-earth',
    title: 'The Layers of the Earth',
    category: 'Geology',
    keywords: [
      'what are the layers of the earth', 'earth internal structure', 'crust mantle core', 'what is the earth made of inside',
      'inner core and outer core', 'how deep is the earth crust', 'structure of the earth',
    ],
    content: `Earth has four main internal layers (this is the solid planet, not the atmosphere). The CRUST is the thin, brittle outer shell — 5–10 km thick under the oceans, 30–50 km under continents — the only part we've ever drilled into. The MANTLE below it is about 2,900 km thick and makes up ~84% of Earth's volume: solid rock (mostly silicates rich in iron and magnesium) that is so hot it flows extremely slowly over millions of years, and this slow churning (convection) drives the movement of tectonic plates. The OUTER CORE, from ~2,900 to ~5,150 km down, is liquid iron and nickel; its swirling motion generates Earth's magnetic field. The INNER CORE at the centre is a ball of iron–nickel about 1,220 km in radius that is solid despite being ~5,200 °C, because the crushing pressure keeps it from melting. A common alternative split is by behaviour: rigid lithosphere (crust + top of mantle), then the softer, partly molten asthenosphere the plates slide on.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-plate-tectonics',
    title: 'What Plate Tectonics Is',
    category: 'Geology',
    keywords: [
      'what is plate tectonics', 'plate tectonics theory', 'how do tectonic plates move', 'what drives plate tectonics',
      'how many tectonic plates are there', 'what is the lithosphere', 'why do plates move',
    ],
    content: `Plate tectonics is the theory that Earth's rigid outer shell (the lithosphere — crust plus the uppermost mantle) is broken into about 15 major pieces, called plates, that slowly move — a few centimetres per year, about as fast as your fingernails grow — riding on the hotter, softer asthenosphere beneath. The motion is driven mainly by convection in the mantle, by "ridge push" where new crust forms, and by "slab pull" where a cold dense plate edge sinks back into the mantle. Almost all of Earth's earthquakes, volcanoes, mountain ranges, ocean trenches and mid-ocean ridges occur at plate boundaries. The theory came together in the 1960s, combining Wegener's continental drift with seafloor-spreading evidence, and it's the unifying framework of modern geology — it explains why the continents fit together, why matching fossils and rock formations appear on now-separated continents, and how the map of the world has changed over hundreds of millions of years.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-causes-earthquakes',
    title: 'What Causes Earthquakes',
    category: 'Geology',
    keywords: [
      'what causes earthquakes', 'why do earthquakes happen', 'how does an earthquake work', 'what is elastic rebound',
      'what are seismic waves', 'what is the focus and epicentre of an earthquake', 'can humans cause earthquakes',
    ],
    content: `Most earthquakes are caused by the sudden release of stress that has slowly built up in Earth's crust as tectonic plates grind against each other. Along a fault, friction locks the two blocks of rock together while the plates keep moving, so the rock bends and stores elastic energy like a loaded spring. When the stress finally exceeds the friction, the rock snaps and the blocks lurch past each other in seconds — "elastic rebound" — releasing the stored energy as seismic waves that radiate outward and shake the ground. The point underground where the slip starts is the focus (hypocentre); the spot on the surface directly above it is the epicentre. Aftershocks are smaller adjustments afterward. Earthquakes can also be caused by magma moving under volcanoes, by large landslides, and by human activity (filling big reservoirs, mining, and injecting wastewater deep underground near faults).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fault-line',
    title: 'What a Fault Line Is',
    category: 'Geology',
    keywords: [
      'what is a fault line', 'what is a fault in geology', 'types of faults', 'what is a normal fault', 'what is a strike slip fault',
      'what is the san andreas fault', 'is a fault the same as a plate boundary',
    ],
    content: `A fault is a fracture or zone of fractures in rock along which the two sides have moved relative to each other. The "fault line" is where that fracture meets the surface. Types by movement: a normal fault (the rock above the fault slips down, from the crust being pulled apart), a reverse or thrust fault (the upper block is pushed up over the lower, from compression — this builds mountains), and a strike-slip fault (the two sides slide horizontally past each other, like California's San Andreas Fault). Big plate boundaries are essentially large fault systems, but faults also exist far from plate edges, within a single plate. Movement on a fault is usually not smooth: it sticks under friction and then jerks, and each jerk is an earthquake. Some faults are "active" (moved recently, likely to move again) and others are long dead.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-plate-boundary-types',
    title: 'Types of Tectonic Plate Boundary',
    category: 'Geology',
    keywords: [
      'what is a tectonic plate boundary', 'types of plate boundaries', 'divergent convergent transform boundary',
      'what happens at a divergent boundary', 'what is a subduction zone', 'what is a transform boundary',
    ],
    content: `A plate boundary is where two tectonic plates meet. There are three kinds. DIVERGENT: the plates pull apart and magma rises to fill the gap, creating new crust — mid-ocean ridges like the Mid-Atlantic Ridge, and continental rifts like the East African Rift. CONVERGENT: the plates push together. If an ocean plate meets a continent, the denser ocean plate bends and sinks (subducts) beneath the other, forming a deep trench, a chain of volcanoes and strong earthquakes (the Andes, the Cascades, Japan). If two continents collide, neither sinks easily and the crust crumples upward into huge mountains (the Himalayas, from India hitting Asia). TRANSFORM: the plates slide horizontally past each other, neither creating nor destroying crust, producing frequent earthquakes (the San Andreas Fault). Most volcanic and seismic activity on Earth is concentrated along these boundaries.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-fossils-form',
    title: 'How Fossils Form',
    category: 'Geology',
    keywords: [
      'how are fossils formed', 'how do fossils form', 'what is fossilization', 'what is permineralization', 'what is a trace fossil',
      'why are fossils rare', 'how is a dinosaur fossil made',
    ],
    content: `A fossil is the preserved remains or trace of an ancient living thing. The usual path: an organism dies and is buried quickly by sediment (mud, sand, volcanic ash) before scavengers, weather or bacteria destroy it — this is why water environments produce most fossils. The soft parts rot away; the hard parts (bones, shells, teeth, wood) remain. Over long time, groundwater seeps through and mineral crystals slowly fill the tiny pore spaces and sometimes replace the original material molecule by molecule (permineralization / petrification), turning it to stone while keeping its shape. Other kinds: molds and casts (the object dissolves, leaving a hollow that later fills with minerals), compressions (a thin carbon film, common for leaves), amber (insects trapped in tree resin), and trace fossils (footprints, burrows, dung — evidence of behaviour, not the body). Fossilization is rare, needing just the right conditions, so the fossil record is only a small sample of past life. (This is different from fossil fuels — coal, oil and gas — which form from compressed organic matter but aren't "fossils" you can study as organisms.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-age-of-earth-how-we-know',
    title: 'How We Know the Age of the Earth',
    category: 'Geology',
    keywords: [
      'how old is the earth and how do we know', 'how do we know the age of the earth', 'how is the age of the earth measured',
      'radiometric dating', 'how do scientists date rocks', 'why is the earth 4.5 billion years old',
    ],
    content: `Earth is about 4.54 billion years old (give or take about 50 million years). We know this from radiometric dating: certain elements in rocks and minerals are radioactive and decay to stable "daughter" elements at a precisely known, constant rate (measured by half-life). By measuring the ratio of parent to daughter atoms in a sample, you can calculate how long the decay has been running — a natural clock. The key systems for very old material are uranium-238 → lead-206 (half-life 4.47 billion years) and uranium-235 → lead-207. Earth's own surface rocks have mostly been recycled by erosion and plate tectonics, so the oldest date about 4.0–4.4 billion years (tiny zircon crystals from Australia). The full age comes from dating the oldest meteorites (leftover building blocks of the solar system) and Moon rocks, which all cluster at ~4.5 billion years — the age of the whole solar system, Earth included. Older methods (cooling rates, ocean saltiness, sediment thickness) gave rough minimums before radiometric dating settled it in the 20th century.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-continental-drift',
    title: 'What Continental Drift Is',
    category: 'Geology',
    keywords: [
      'what is continental drift', 'who proposed continental drift', 'alfred wegener', 'what is pangaea', 'evidence for continental drift',
      'how did the continents move', 'continental drift vs plate tectonics',
    ],
    content: `Continental drift is the idea, proposed by the German scientist Alfred Wegener in 1912, that the continents were once joined in a single supercontinent (which he called Pangaea, ~300 million years ago) and have since slowly drifted apart to their present positions. His evidence: the coastlines of South America and Africa fit together like puzzle pieces; identical fossils of the same land plants and animals (Mesosaurus, Glossopteris) appear on continents now separated by oceans; matching rock formations and mountain belts line up across those gaps; and glacial deposits show ice-age glaciers in places that are now tropical. Wegener's idea was rejected for decades because he couldn't explain HOW continents move. That mechanism — seafloor spreading and mantle convection — was found in the 1950s–60s, and continental drift became part of the broader theory of plate tectonics.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-weathering',
    title: 'What Weathering Is',
    category: 'Geology',
    keywords: [
      'what is weathering', 'what does weathering mean', 'types of weathering', 'physical vs chemical weathering',
      'what is freeze thaw weathering', 'difference between weathering and erosion', 'what is mechanical weathering',
    ],
    content: `Weathering is the breakdown of rocks, soil and minerals in place, at or near Earth's surface, by contact with the atmosphere, water and living things. (It's about breaking rock DOWN where it sits; erosion is the separate process that then carries the broken pieces away.) Physical/mechanical weathering breaks rock into smaller pieces without changing its chemistry: freeze–thaw (water seeps into cracks, freezes, expands and levers the rock apart), heating and cooling, salt crystal growth, and pressure release. Chemical weathering changes the minerals themselves: rainwater is slightly acidic and dissolves limestone; oxygen rusts iron-bearing minerals; water reacts with feldspar to form clay. Biological weathering is done by life: tree roots wedging into cracks, lichens and bacteria producing acids, burrowing animals. Weathering is the first step in making soil and in wearing mountains down over millions of years. (Nothing to do with the weather forecast.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-geode',
    title: 'What a Geode Is',
    category: 'Geology',
    keywords: [
      'what is a geode', 'how do geodes form', 'what is inside a geode', 'why are geodes hollow', 'where are geodes found',
      'geode vs nodule', 'are geodes valuable',
    ],
    content: `A geode is a roughly spherical, hollow rock lined on the inside with mineral crystals — plain and lumpy on the outside, but crack it open and the cavity is coated with sparkling quartz, amethyst, calcite, agate bands or other minerals. They form when a rounded hollow exists in rock (a gas bubble in cooling lava, or a space left by a buried root, shell or nodule that dissolved away). Over long spans of time, mineral-rich groundwater seeps in through the porous outer shell and deposits crystals layer by layer on the inside walls, growing inward toward the centre; if the supply runs out before it fills, you get the classic hollow crystal-lined geode. They're common in volcanic rocks and some limestones (famous spots: Brazil, Uruguay, Mexico, the US Midwest). (Not to be confused with "Geode," an old line of AMD embedded processors.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-earth-mantle',
    title: "What Earth's Mantle Is",
    category: 'Geology',
    keywords: [
      'what is the mantle of the earth', 'what is the earth mantle made of', 'is the mantle liquid or solid', 'how hot is the mantle',
      'what is mantle convection', 'how thick is the mantle', 'upper mantle vs lower mantle',
    ],
    content: `The mantle is the thick layer of rock between Earth's crust and its core, about 2,900 km deep, making up roughly 84% of the planet's volume and 67% of its mass. It is mostly SOLID silicate rock, rich in iron and magnesium (minerals like olivine and pyroxene) — not a sea of magma. However, over geological timescales it behaves like an extremely stiff, slow-moving fluid: heat from the core and from radioactive decay makes it churn in giant convection cells, hot rock rising and cooler rock sinking over tens of millions of years, and this is the engine that drags the tectonic plates around. Temperatures range from about 500–900 °C near the crust to about 4,000 °C near the core, and pressure increases enormously with depth. Only in a few spots does mantle rock actually melt into magma — under mid-ocean ridges, hotspots and subduction zones — feeding volcanoes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-soil-made-of',
    title: 'What Soil Is Made Of',
    category: 'Geology',
    keywords: [
      'what is soil made of', 'what is soil composed of', 'components of soil', 'what is humus', 'difference between soil and dirt',
      'what are soil horizons', 'how is soil formed',
    ],
    content: `Soil is a mixture of four things: mineral particles (about 45% by volume) — broken-down rock sorted by size into sand (gritty), silt (floury) and clay (sticky); organic matter (a few percent) — decaying plant and animal material and the dark, stable end-product called humus, which holds nutrients and water; water; and air. It's also full of living organisms — bacteria, fungi, earthworms, insects, roots — a teaspoon of healthy soil holds billions of microbes. Soil forms slowly (often 100+ years per centimetre) from parent rock being weathered, mixed with dead organisms, and worked by climate, organisms, slope and time. A vertical slice shows layers ("horizons"): dark topsoil (O and A) rich in organic matter, lighter subsoil (B) where minerals accumulate, then weathered rock (C) and bedrock. "Dirt" is just displaced soil that's no longer part of that living system.`,
    createdAt: Date.now(),
  },
];
