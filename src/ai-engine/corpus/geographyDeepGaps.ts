import { KnowledgeItem } from '../../types';

// Batch 30 (geography superlatives) gap-fills. Strong category (~19/25). Live
// misses on nexus-4b: "largest rainforest" -> "Rainforest Foundation Norway"
// web dump, never said Amazon; "lowest point on land" -> "most points on land
// don't have an antipode... it's just land"; "country with the most islands"
// -> "Fiji, over 300" (it's Sweden, ~270,000); "countries bordering the most
// others" -> "Afghanistan... Pakistan, Iran... and Kabulistan" (not a country).
export const GEOGRAPHY_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-largest-rainforest',
    title: 'The Largest Rainforest in the World',
    category: 'Geography',
    keywords: [
      'what is the largest rainforest', 'biggest rainforest in the world', 'largest rainforest', 'where is the amazon rainforest',
      'how big is the amazon', 'what is the second largest rainforest', 'largest tropical forest',
    ],
    content: `The largest rainforest in the world is the Amazon rainforest in South America — about 5.5–6 million square kilometres, roughly the size of the contiguous United States or of Australia. It spans nine countries, with around 60% in Brazil and large shares in Peru and Colombia. It holds about half of the planet's remaining tropical rainforest, an estimated 390 billion trees, and roughly 10% of all known species on Earth, and the Amazon River running through it carries about a fifth of the world's river water. The second-largest rainforest is the Congo Basin in central Africa; the third is in Southeast Asia and New Guinea. All three are shrinking from logging, farming, ranching and mining.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lowest-point-on-land',
    title: 'The Lowest Point on Land',
    category: 'Geography',
    keywords: [
      'what is the lowest point on land', 'lowest point on earth land', 'lowest place on earth', 'how far below sea level is the dead sea',
      'what is the lowest exposed land', 'deepest land depression', 'lowest dry point on earth',
    ],
    content: `The lowest point on exposed land is the shore of the Dead Sea, between Israel, the West Bank and Jordan, at about 430 metres (1,410 feet) below sea level — and it's still dropping about a metre a year as the lake shrinks. The Dead Sea is also the deepest hypersaline lake, so its bed lies over 700 m below sea level. The lowest point on land NOT covered by liquid water is the floor of the Bentley Subglacial Trench in Antarctica, about 2,540 m below sea level, but it's buried under the ice sheet. Other notable low spots: the Turpan Depression in China (−154 m), Death Valley in California (−86 m), and the Qattara Depression in Egypt (−133 m). (The single deepest point on the solid Earth overall is the Challenger Deep on the ocean floor, about 10,935 m down.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-most-islands-country',
    title: 'The Country With the Most Islands',
    category: 'Geography',
    keywords: [
      'what country has the most islands', 'which country has the most islands', 'country with most islands',
      'does sweden have the most islands', 'how many islands does sweden have', 'most islands in the world',
    ],
    content: `Sweden has the most islands of any country — roughly 267,000 (about 270,000), though the vast majority are tiny uninhabited rocks and skerries in the Baltic archipelagos, and only around 1,000 are inhabited. Close behind are Norway (around 240,000), Finland (around 180,000), and Canada (well over 50,000, with the Arctic archipelago). This is different from countries famous for being island nations — Indonesia has about 17,500 islands and the Philippines about 7,600, which are the largest counts among archipelagic states, and Indonesia is the country with the most inhabited islands. Fiji has only a few hundred islands, not the most.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-most-land-borders',
    title: 'The Countries With the Most Land Borders',
    category: 'Geography',
    keywords: [
      'which countries border the most other countries', 'country with the most neighbours', 'most land borders',
      'how many countries does china border', 'how many countries does russia border', 'country that touches the most countries',
    ],
    content: `China and Russia are tied for the most land neighbours, at 14 countries each. China borders Afghanistan, Bhutan, India, Kazakhstan, North Korea, Kyrgyzstan, Laos, Mongolia, Myanmar, Nepal, Pakistan, Russia, Tajikistan and Vietnam. Russia borders Azerbaijan, Belarus, China, Estonia, Finland, Georgia, Kazakhstan, North Korea, Latvia, Lithuania, Mongolia, Norway, Poland and Ukraine (16 if you count the two partially recognised states of Abkhazia and South Ossetia). Next come Brazil and the Democratic Republic of the Congo with 10 each, then Germany, Austria, France, Serbia, Tanzania, Turkey and Zambia with 8. Afghanistan borders 6 countries (Pakistan, Iran, Turkmenistan, Uzbekistan, Tajikistan and China) — "Kabulistan" is not a country; Kabul is Afghanistan's capital.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arctic-vs-antarctica',
    title: 'The Difference Between the Arctic and Antarctica',
    category: 'Geography',
    keywords: [
      'what is the difference between the arctic and antarctica', 'arctic vs antarctica', 'is antarctica a continent',
      'is the arctic land or water', 'why are there polar bears in the arctic but not antarctica', 'which pole is colder',
      'who lives in antarctica',
    ],
    content: `The fundamental difference: the Arctic is an OCEAN surrounded by land, while Antarctica is a CONTINENT surrounded by ocean. The Arctic is a frozen sea (floating sea ice a few metres thick) ringed by the northern edges of North America, Europe and Asia; there is no land at the North Pole itself. It has indigenous peoples (Inuit, Sami, Nenets and others) who have lived there for thousands of years, plus land mammals like polar bears, Arctic foxes and reindeer. Antarctica is a landmass about 1.5 times the size of the US, buried under an ice sheet up to ~4.8 km thick that holds ~60% of the world's fresh water; it has no native human population and no land mammals — only visiting scientists (a few thousand in summer) and coastal wildlife (penguins, seals). Antarctica is far colder (record −89 °C) and higher in average elevation, and is governed internationally by the 1959 Antarctic Treaty, which bans military activity and mining and reserves it for science.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tallest-mountain-nuance',
    title: 'The Tallest / Highest Mountain in the World',
    category: 'Geography',
    keywords: [
      'what is the tallest mountain in the world', 'what is the highest mountain in the world', 'is everest the tallest mountain',
      'what is mauna kea', 'tallest mountain from base to peak', 'what is the mountain closest to space', 'chimborazo vs everest',
    ],
    content: `It depends how you measure. By height above SEA LEVEL, Mount Everest is the winner at 8,849 m (29,032 ft) — this is what "highest mountain" normally means, first summited by Edmund Hillary and Tenzing Norgay in 1953. By height from BASE TO PEAK, Mauna Kea in Hawai'i is taller: it rises about 10,200 m from the ocean floor, though only 4,207 m of that is above the water. By distance of the summit from the CENTRE OF THE EARTH, Mount Chimborazo in Ecuador wins, because it sits on the equatorial bulge — its peak is the point on Earth's surface farthest from the centre and the closest to outer space, even though it's "only" 6,263 m above sea level. K2 (8,611 m) is the world's second-highest peak above sea level and considered a harder climb than Everest.`,
    createdAt: Date.now(),
  },
];
