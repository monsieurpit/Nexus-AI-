import { KnowledgeItem } from '../../types';

// Batch 85 (physical geography). Strong category. Real misses on nexus-4b:
// "what are the Great Lakes" never named them ("those are the badass lakes...
// specifically the superior one. It's a huge as hell country containing them");
// "what is the Ring of Fire geographically" came back as a cut-off web dump
// about volcano formation; "what is Oceania" called it "a continent...
// 8.6 million square kilometers—that's a huge as hell country"; "difference
// between a country and a continent" was garbled ("Australia's the only
// continent that's also a single country, population-wise").
export const PHYSICAL_GEOGRAPHY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-great-lakes',
    title: 'What the Great Lakes Are',
    category: 'Geography',
    keywords: [
      'what are the great lakes', 'superior michigan huron erie ontario', 'HOMES mnemonic great lakes', 'largest group of freshwater lakes',
      'great lakes us canada border', 'lake superior largest freshwater lake by area', 'st lawrence river great lakes drainage',
    ],
    content: `The Great Lakes are five large, connected freshwater lakes in east-central North America, straddling the border between the United States and Canada: Superior, Michigan, Huron, Erie, and Ontario (the mnemonic "HOMES" gives all five). Together they contain about 21% of the world's surface fresh water and form the largest group of freshwater lakes on Earth by total surface area, covering roughly 244,000 square kilometres. Lake Superior alone is the largest freshwater lake in the world by surface area. The lakes are linked by rivers and canals and flow generally eastward — from Superior down through Huron, Michigan and Erie, over Niagara Falls into Ontario, and out via the St. Lawrence River to the Atlantic Ocean. Lake Michigan is the only one lying entirely within the United States; the other four are shared with the Canadian province of Ontario. They support major shipping, cities (Chicago, Toronto, Detroit, Cleveland), fisheries, and drinking water for tens of millions of people.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ring-of-fire-geography',
    title: 'What the Ring of Fire Is (Geographically)',
    category: 'Geography',
    keywords: [
      'what is the ring of fire geographically', 'pacific ocean rim volcanoes earthquakes', 'ring of fire subduction zones',
      'which countries are on the ring of fire', 'why do most earthquakes happen on the ring of fire', 'andes japan indonesia new zealand ring of fire',
    ],
    content: `The Ring of Fire is a roughly horseshoe-shaped belt about 40,000 km long that runs around the rim of the Pacific Ocean. Starting at the southern tip of South America it goes up the west coast of South and North America, along Alaska and the Aleutian Islands, then south through Kamchatka, Japan, Taiwan, the Philippines, and Indonesia, and on to Papua New Guinea, the Solomon Islands, Tonga, and New Zealand. It marks the boundaries where the Pacific Plate and several smaller plates meet the surrounding plates, mostly at subduction zones where one plate is forced down beneath another, melting and feeding magma upward. As a result, about 75% of the world's active and dormant volcanoes and roughly 90% of its earthquakes — including nearly all the most powerful ones — occur along it. Landmarks on the ring include the Andes, Mount St. Helens, Mount Fuji, Krakatoa, Mount Pinatubo, and the deep ocean trenches, among them the Mariana Trench.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-oceania',
    title: 'What Oceania Is',
    category: 'Geography',
    keywords: [
      'what is oceania', 'is oceania a continent or a region', 'melanesia micronesia polynesia', 'australia new zealand pacific islands',
      'oceania countries fiji samoa tonga papua new guinea', 'oceania vs australia continent', 'how many islands in oceania',
    ],
    content: `Oceania is a geographic region — not a single country, and not universally counted as a "continent." It takes in Australia, New Zealand, the island of New Guinea, and the thousands of islands scattered across the tropical Pacific, traditionally divided into three parts: MELANESIA (Papua New Guinea, Fiji, Solomon Islands, Vanuatu, New Caledonia), MICRONESIA (Kiribati, Marshall Islands, Palau, the Federated States of Micronesia, Nauru, Guam), and POLYNESIA (Samoa, Tonga, Tuvalu, the Cook Islands, French Polynesia, and — at the region's far corners — Hawaii, New Zealand, and Easter Island). It contains about 14 sovereign countries plus various territories, and around 45 million people, the large majority of them in Australia. In the seven-continent model, the continent here is usually called "Australia" (meaning the continental landmass) or, more broadly, "Oceania" or "Australasia." Its land area is only about 8.5 million square kilometres, but the islands are spread across roughly a third of the Earth's surface.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-country-vs-continent',
    title: 'The Difference Between a Country and a Continent',
    category: 'Geography',
    keywords: [
      'what is the difference between a country and a continent', 'how many continents are there', 'continent physical landmass country political',
      'which country is a whole continent', 'how many countries in africa', 'does antarctica have any countries',
    ],
    content: `A continent is one of Earth's major landmasses — a physical and geographical category. The number depends on the model: the English-speaking world usually teaches seven (Africa, Antarctica, Asia, Europe, North America, South America, and Australia or "Oceania"), while other traditions count six (merging the two Americas, or joining Europe and Asia as "Eurasia") or five. A country (also called a state or nation) is a political entity: a defined territory with a permanent population, a government, and sovereignty recognised by other states — there are about 195. So the two categories describe different things: continents are drawn by geography, countries by politics and history. A continent normally contains many countries (Africa has 54, Asia has about 48). Australia is the only country that occupies an entire continent on its own. Antarctica has no countries at all — it is governed collectively under the Antarctic Treaty, which sets it aside for peaceful scientific use.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-time-zones-count',
    title: 'How Many Time Zones There Are',
    category: 'Geography',
    keywords: [
      'how many time zones are there', '24 standard time zones earth rotation', 'why are there more than 24 time zones',
      'half hour and 45 minute time zones india nepal', 'china one time zone', 'utc international date line',
    ],
    content: `In principle there are 24 time zones, one for each hour of Earth's rotation, each spanning 15 degrees of longitude and measured as an offset from UTC (Coordinated Universal Time). In practice there are more like 38 distinct time offsets in use around the world, because: some regions use half-hour offsets (India is UTC+5:30, Iran UTC+3:30, parts of Australia UTC+9:30) or even 45-minute offsets (Nepal UTC+5:45, the Chatham Islands UTC+12:45); the zone boundaries zig-zag to follow national and state borders rather than straight meridians; some large countries choose a single zone for the whole territory (all of China runs on UTC+8, though it spans five geographic zones); and a few places set their clocks for political reasons (Spain uses Central European Time despite lying at Britain's longitude). Zones at the far ends of the day are separated by the International Date Line, which roughly follows the 180° meridian in the Pacific, jogging around island nations so each keeps one date.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-longest-river-debate',
    title: 'The Longest River: Nile versus Amazon',
    category: 'Geography',
    keywords: [
      'what is the longest river in the world', 'nile vs amazon length', 'is the amazon longer than the nile', 'why is river length disputed',
      'amazon river source apurimac', 'nile 6650 km amazon 6400 km', 'largest river by volume amazon',
    ],
    content: `The conventional answer is the Nile, in northeastern Africa, at about 6,650 km, flowing north from central Africa through Sudan and Egypt to the Mediterranean. But the ranking is genuinely disputed. The Amazon in South America is usually given as about 6,400 km, but some surveys that push its source further up remote Andean headwater streams (the Apurímac or Mantaro) measure it at 6,400–7,000 km, which would make it the longest. The difficulty is that "length of a river" depends on where you decide the source begins, how you measure a braided, shifting channel through a delta, and which distributary you follow to the sea — so different reputable sources give different winners. What is not in dispute: the Amazon is by far the largest river by water volume, discharging roughly a fifth of all the fresh water that rivers carry to the oceans — more than the next seven largest rivers combined.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-map-projections',
    title: 'Map Projections: Mercator versus Reality',
    category: 'Geography',
    keywords: [
      'what is the difference between a map projection like mercator and reality', 'why is greenland so big on maps', 'mercator distorts area near the poles',
      'equal area vs conformal projection', 'gall peters robinson winkel tripel projection', 'no flat map is accurate',
    ],
    content: `A map projection is a mathematical method for flattening the curved surface of the Earth onto a flat sheet, and no projection can do this without distorting something — area, shape, distance, or direction. The choice is always a trade-off. The MERCATOR projection (1569) keeps compass bearings straight and preserves local shapes and angles ("conformal"), which made it ideal for navigation, but it stretches everything more and more toward the poles: Greenland appears roughly the size of Africa when Africa is about 14 times larger, and Antarctica becomes a giant white band. Because Mercator and its variants are used for most online maps, this gives many people a badly skewed sense of the relative sizes of countries. Alternatives make different trade-offs: the GALL–PETERS and other equal-area projections show true relative area but squash shapes; the ROBINSON and WINKEL TRIPEL projections (the latter used by National Geographic) are compromises that keep no property exactly right but spread the distortion so nothing looks too wrong. A globe is the only fully accurate representation.`,
    createdAt: Date.now(),
  },
];
