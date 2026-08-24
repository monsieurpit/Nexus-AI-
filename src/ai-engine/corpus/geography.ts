import { KnowledgeItem } from '../../types';

export const GEOGRAPHY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-geography-continents-countries',
    title: "Earth's Continents and Major Countries",
    category: 'Geography',
    keywords: ['continents', 'geography', 'countries', 'capitals', 'Asia', 'Africa', 'Europe', 'America', 'Australia', 'population'],
    content: `Earth has seven continents. Asia is the largest (~44.6 million km²) with the highest population (~4.7 billion), containing China (Beijing), India (New Delhi), Russia (Moscow — also Europe), Japan (Tokyo), and Indonesia (Jakarta). Africa (~30.4 million km²) is the second largest, most diverse continent, with 54 countries; Nigeria, Ethiopia, Egypt, South Africa, and Kenya are major nations. North America includes Canada (Ottawa), the USA (Washington D.C.), and Mexico (Mexico City). South America is dominated by Brazil (Brasília, world's largest Portuguese-speaking nation), Argentina (Buenos Aires), and Colombia (Bogotá). Europe, densely populated, has 44 countries; Germany (Berlin), France (Paris), the UK (London), and Italy (Rome) are major powers. Australia (Canberra) is both continent and country; New Zealand is a nearby island nation. Antarctica is the coldest, driest, windiest continent with no permanent population, only scientific stations. The Pacific Ocean separates Asia from the Americas; the Atlantic separates Europe/Africa from the Americas.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geography-rivers-mountains',
    title: "Earth's Major Rivers and Mountains",
    category: 'Geography',
    keywords: ['rivers', 'mountains', 'Nile', 'Amazon', 'Everest', 'Himalayas', 'Andes', 'Alps', 'geography', 'world'],
    content: `Rivers are Earth's freshwater arteries. The Nile (~6,650 km) is traditionally the world's longest, flowing north through Egypt to the Mediterranean — the lifeblood of ancient Egyptian civilisation. The Amazon (~6,400 km) in South America has by far the world's greatest flow, draining the largest tropical rainforest. The Yangtze (~6,300 km) is Asia's longest, central to Chinese civilisation. The Mississippi-Missouri system drains most of North America's interior. The Congo in Africa is the world's deepest river. Mountain ranges result from tectonic plate collisions. The Himalayas in southern Asia contain Earth's 10 highest peaks, including Mount Everest (8,849 m, Nepal/Tibet) — the world's highest — formed by the Indian plate colliding with Eurasia. The Andes (~7,000 km) are the world's longest mountain range, running along South America's western coast. The Alps in Central Europe, the Rockies in North America, and the Atlas in North Africa are other major ranges. Mountains affect climate by forcing air upward (orographic lift), causing precipitation on windward slopes and rain shadows on leeward slopes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geography-climate-weather',
    title: 'World Climate Zones and Weather Systems',
    category: 'Geography',
    keywords: ['climate', 'weather', 'tropical', 'desert', 'temperate', 'polar', 'Sahara', 'El Nino', 'Coriolis', 'geography'],
    content: `Climate describes long-term average weather patterns; weather is short-term atmospheric conditions. The Köppen climate classification divides Earth into five major groups. Tropical climates (near the equator) are warm year-round with high rainfall; tropical rainforests have no dry season, tropical monsoon climates have seasonal rain. Arid and semi-arid climates cover ~26% of land — deserts like the Sahara (world's largest hot desert) and Arabian Desert receive < 250 mm rainfall per year. Temperate climates have warm summers and cool winters; Mediterranean climates have hot dry summers and wet winters. Continental climates have extreme seasonal temperature swings. Polar climates are cold year-round with permafrost. Climate is determined by latitude, altitude, proximity to oceans, ocean currents, and prevailing winds. The Coriolis effect deflects winds right in the Northern Hemisphere and left in the Southern. Trade winds, westerlies, and polar easterlies are global wind patterns. El Niño (ENSO) is a periodic warming of the Pacific that disrupts global weather. Climate change is shifting these patterns, intensifying extremes and causing sea level rise.`,
    createdAt: Date.now(),
  },

  {
    id: 'kb-geo-earthquakes-plate-tectonics',
    title: 'Earthquakes, the Richter Scale & Plate Tectonics',
    category: 'geography',
    keywords: [
      'earthquake',
      'earthquakes',
      'richter scale',
      'plate tectonics',
      'tectonic plates',
      'seismology',
      'seismic',
      'fault line',
      'magnitude',
    ],
    content: `**Plate tectonics** explains why earthquakes happen: Earth's crust is broken into roughly a dozen major rigid plates that float on the semi-molten mantle beneath them, constantly drifting a few centimeters per year — about as fast as fingernails grow.
1. **Why earthquakes happen**: Where two plates meet (a **fault line**), they can grind past each other, collide, or pull apart. Friction usually locks them in place temporarily, building up enormous stress. When the stress finally exceeds the friction holding the rocks together, they suddenly slip — releasing that stored energy as seismic waves. That sudden release is an earthquake.
2. **The "Ring of Fire"**: A horseshoe-shaped zone around the Pacific Ocean where roughly 90% of the world's earthquakes and most active volcanoes occur, because it traces the boundaries of the Pacific Plate against several neighboring plates.
3. **The Richter Scale**: Developed by Charles Richter in 1935, it measures earthquake magnitude on a **logarithmic** scale — each whole-number increase represents a tenfold increase in measured shaking amplitude and roughly 31.6 times more released energy. A magnitude 7 earthquake isn't twice as strong as a magnitude 3.5 — it's about 3,981 times stronger. Modern seismologists more often use the related **Moment Magnitude Scale (Mw)**, which better captures the energy of very large earthquakes, but the public still commonly calls both "the Richter scale."
4. **Magnitude vs. Intensity**: Magnitude (Richter/Moment) measures the earthquake's total released energy at its source — a single number for the whole event. **Intensity** (measured by the Modified Mercalli scale) instead measures how strongly the shaking was actually felt at a specific location, which varies by distance from the epicenter and local ground conditions.
5. **Aftershocks**: Smaller earthquakes that follow a large one, as the crust readjusts around the newly shifted fault — they can continue for days, months, or even years after a major quake.`,
    createdAt: Date.now(),
  },
];
