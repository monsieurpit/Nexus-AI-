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
  {
    id: 'kb-geo-time-zones-explained',
    title: 'Time Zones and the International Date Line, Explained',
    category: 'geography',
    keywords: [
      'time zones explained', 'international date line', 'utc gmt', 'why do time zones exist',
      'daylight saving time', 'how many time zones are there',
    ],
    content: `Time zones exist because Earth rotates continuously, meaning it's simultaneously a different local time at every longitude — a single global clock would put "noon" at midnight for half the planet, so the world is divided into roughly 24 standard time zones, each offset from Coordinated Universal Time (UTC, the modern successor to Greenwich Mean Time/GMT) by whole or, in some regions, half/quarter hours. UTC itself is anchored to the Prime Meridian (0° longitude), which passes through Greenwich, England — a historical artifact of when Britain's Royal Observatory set the global standard for navigation and timekeeping in the 19th century. The International Date Line runs roughly along the 180° meridian (opposite the Prime Meridian) through the Pacific Ocean, deliberately routed around land and island nations to avoid splitting any single country across two calendar dates — crossing it westward advances the calendar date by one day, and crossing it eastward moves it back a day, which is the actual mechanism behind the classic "arrive the day before you left" effect on long trans-Pacific flights. Some countries use unusual, non-whole-hour offsets from UTC for various historical or political reasons — India (UTC+5:30) and Nepal (UTC+5:45) are commonly cited examples — and a handful of very large countries (China, despite spanning a geographic width that would justify five time zones, uses a single official time zone nationwide for political unity). Daylight Saving Time (practiced in much of North America, Europe, and a few other regions, but notably not in most of the world, including most of Asia, Africa, and near-equatorial countries generally) shifts clocks forward an hour in spring and back in autumn to shift more daylight into evening hours during summer months — its actual energy-saving benefit is debated and modest at best in modern research, and there's ongoing political discussion in several countries about eliminating the twice-yearly clock change altogether.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geo-map-projections',
    title: 'Map Projections: Why Every World Map Distorts Something',
    category: 'geography',
    keywords: [
      'map projections explained', 'mercator projection distortion', 'why is greenland so big on maps',
      'map distortion', 'true size map',
    ],
    content: `Every flat map of the spherical Earth necessarily distorts something — it's a mathematical certainty (proven by Gauss's Theorema Egregium) that a curved surface cannot be flattened without stretching, compressing, or tearing it somewhere, so every map projection is really a choice about which kind of distortion to prioritize and which to sacrifice: shape, area, distance, or direction can't all be preserved simultaneously. The Mercator projection (created in 1569, originally for nautical navigation because it preserves accurate compass bearings/straight-line direction) is still extremely common in classrooms and web maps, but it severely distorts area at high latitudes — this is why Greenland appears comparable in size to Africa on a Mercator map despite Africa actually being roughly 14 times larger by land area, and why Alaska, Canada, and Russia all look dramatically larger relative to equatorial countries than they really are. Equal-area projections (like the Gall-Peters or Mollweide projections) fix this by accurately representing relative land area, at the cost of distorting shape — continents near the poles look visibly stretched or squashed compared to their true outline. The Robinson projection is a deliberate compromise, not perfectly preserving any single property (area, shape, distance, or direction) but keeping all of the distortions modest and visually reasonable, which is why it became a popular general-purpose choice for atlases and world maps aiming for a "looks right" appearance rather than any specific technical accuracy. Modern interactive tools like "The True Size Of" let users drag country outlines around a globe-accurate projection specifically to correct the common misconception people build from growing up looking at Mercator-style maps — many people are surprised, for instance, that the entire continental United States fits inside Africa multiple times over, or that Russia — while genuinely the largest country by area — looks considerably larger on a standard Mercator map than its true relative size.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geo-ocean-currents-basics',
    title: 'Ocean Currents: How They Work and Why They Matter for Climate',
    category: 'geography',
    keywords: [
      'ocean currents explained', 'gulf stream', 'thermohaline circulation', 'how do ocean currents work',
      'why is the ocean moving', 'global conveyor belt',
    ],
    content: `Ocean currents are large-scale, persistent movements of seawater driven mainly by wind patterns near the surface and by density differences (caused by temperature and salinity variations) at deeper levels — together these form a genuinely interconnected global circulation system, sometimes called the "global conveyor belt" or thermohaline circulation, that moves water (and the heat it carries) around the entire planet over the course of roughly a thousand years for a full cycle. Surface currents are driven primarily by prevailing winds combined with the Coriolis effect (Earth's rotation deflecting moving air and water — rightward in the Northern Hemisphere, leftward in the Southern) — this is why major current systems form large rotating loops called gyres in each ocean basin. The Gulf Stream is one of the most significant and well-known currents: a powerful, warm current flowing from the Gulf of Mexico up the eastern US coast and across the North Atlantic toward Western Europe, carrying an enormous amount of heat — it's a major reason why Western Europe (particularly the UK and Scandinavia) has notably milder winters than other regions at similar latitude, like parts of Canada or Russia, which don't benefit from a comparable warm current. Thermohaline circulation (the "deep water" part of the conveyor belt) is driven by density: cold, salty water is denser and sinks in specific polar regions (notably the North Atlantic near Greenland), pulling more warm surface water in to replace it and driving the whole system's slow, deep circulation — this is why the system is sensitive to melting polar ice, since a large influx of fresh (less dense, less salty) meltwater could theoretically weaken or disrupt the sinking process that drives the entire circulation, a scenario climate scientists actively monitor and model given accelerating ice melt. Ocean currents also strongly influence weather and fishing: they redistribute nutrients (upwelling zones, where deep nutrient-rich water rises to the surface, support some of the world's most productive fisheries) and transport heat that shapes regional climate far beyond what latitude alone would predict.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geo-volcanoes-basics',
    title: 'Volcanoes: How They Form and Why They Erupt',
    category: 'geography',
    keywords: [
      'how do volcanoes work', 'why do volcanoes erupt', 'types of volcanoes', 'magma vs lava',
      'ring of fire volcanoes', 'shield volcano vs stratovolcano',
    ],
    content: `Volcanoes form where molten rock (magma) from deep in Earth's mantle finds a path to the surface — most commonly at tectonic plate boundaries, either where plates pull apart (divergent boundaries, letting magma rise to fill the gap, as along the Mid-Atlantic Ridge) or where one plate is forced under another (subduction zones, where the descending plate melts under intense heat and pressure, generating magma that rises through the overriding plate, as around much of the Pacific "Ring of Fire"). "Hotspot" volcanoes are a notable exception, forming not at plate boundaries but over unusually persistent plumes of rising heat from deep within the mantle that stay in roughly one place while tectonic plates slowly drift over them — Hawaii's volcanic island chain is the textbook example, with each island having formed in sequence as the Pacific Plate moved over a stationary hotspot beneath it over millions of years. The technical distinction between magma and lava is simply location: magma is molten rock still underground, and it's called lava only once it reaches the surface and erupts. Volcano shape and eruption style depend heavily on magma's viscosity (thickness): shield volcanoes (like those in Hawaii) form from very fluid, low-viscosity basaltic magma that flows easily over long distances, producing wide, gently-sloped mountains with relatively non-explosive eruptions; stratovolcanoes (also called composite volcanoes — Mt. Fuji, Mt. St. Helens, Vesuvius) form from thicker, higher-viscosity magma that traps gas pressure until it releases suddenly and violently, building the classic tall, steep, cone-shaped mountain through alternating layers of lava and ash, and producing the most dangerous, explosive eruptions. An eruption's explosiveness ultimately comes down to how easily dissolved gases can escape the magma before pressure builds too high — fluid magma lets gas bubble out relatively calmly, while thick, viscous magma traps it until the pressure overwhelms the rock plugging the vent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geo-desertification-water-scarcity',
    title: 'Desertification and Global Water Scarcity',
    category: 'geography',
    keywords: [
      'desertification explained', 'water scarcity global', 'why is fresh water limited', 'aquifer depletion',
      'land degradation', 'freshwater crisis',
    ],
    content: `Despite covering roughly 70% of Earth's surface, water suitable for drinking, agriculture, and most human use is genuinely scarce — around 97% of all water on Earth is saline ocean water, and of the remaining ~3% freshwater, roughly two-thirds is locked up in glaciers and ice caps, leaving only a small fraction as accessible surface water (lakes, rivers) and groundwater — which is why freshwater scarcity is a real and worsening global issue despite oceans covering most of the planet. Groundwater, stored in underground aquifers, supplies a large share of the world's drinking and agricultural water, but many major aquifers worldwide are being depleted faster than natural recharge can replace them (a slow process that can take decades to centuries) — this is a particular concern in heavily irrigated agricultural regions, since once a deep aquifer is significantly depleted, restoring it isn't a short-term fix even with reduced usage. Desertification is the process by which fertile or semi-arid land degrades into desert-like conditions, losing its capacity to support vegetation and agriculture — driven by a combination of natural climate variability (drought cycles) and human activity: overgrazing that strips protective vegetation, deforestation, unsustainable irrigation practices that can actually increase soil salinity over time, and climate change shifting historical rainfall patterns. The Sahel region south of the Sahara Desert in Africa is one of the most cited real-world examples of ongoing desertification pressure, though large-scale reforestation and land-management initiatives (such as the "Great Green Wall" project spanning multiple African countries) aim to reverse or slow the trend. Water scarcity and desertification compound into serious humanitarian and geopolitical issues — competition over shared river systems and aquifers between countries, large-scale agricultural failure driving migration, and food security risks — making sustainable water management one of the more significant global environmental and policy challenges of the coming decades.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geo-population-distribution',
    title: 'Why Population Is So Unevenly Distributed Across the Planet',
    category: 'geography',
    keywords: [
      'why is population unevenly distributed', 'population density explained', 'why are cities near coasts',
      'most densely populated countries', 'habitable land',
    ],
    content: `Human population is extremely unevenly spread across Earth's land surface — a large share of humanity is concentrated on a relatively small fraction of habitable land, driven by a consistent set of geographic factors that have shaped where people settle for thousands of years. Fresh water access is the most fundamental driver — nearly every major historical civilization and modern megacity developed along a river, lake, or coastline, since reliable water is essential for drinking, agriculture, and (historically) trade and transport. Climate and arable land matter enormously too: temperate and subtropical regions with fertile soil and moderate rainfall support far higher agricultural yields (and therefore population density) than extreme deserts, polar regions, or dense unmodified rainforest, which is why vast stretches of the Sahara, Siberia, the Amazon interior, and Antarctica remain nearly empty despite covering huge total land area. Elevation and terrain play a role as well — very high-altitude and extremely mountainous terrain generally support smaller populations due to thinner air, harsher climate, and the practical difficulty of farming and building infrastructure on steep terrain, though some high-altitude regions (parts of the Andes, the Ethiopian highlands) do support substantial populations adapted over generations to the conditions. Historically, coastlines and natural harbors additionally attracted dense settlement because of trade access — a huge share of the world's largest cities (Tokyo, New York, Shanghai, Mumbai, Lagos) sit on or very near a coast. Modern economic factors reinforce these ancient geographic patterns rather than replacing them: cities that grew large due to historical trade or agricultural advantages became hubs for industry and services, creating self-reinforcing economic opportunity that continues to draw population toward already-dense areas — which is part of why global urbanization (the share of people living in cities) has been steadily rising for over a century and now exceeds half of the world's population.`,
    createdAt: Date.now(),
  },
];
