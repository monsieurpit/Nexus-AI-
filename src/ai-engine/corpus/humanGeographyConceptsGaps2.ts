import { KnowledgeItem } from '../../types';

/**
 * HUMAN_GEOGRAPHY_CONCEPTS_GAPS_2 — batch 216 corrections.
 * Misses: "primary/secondary/tertiary industry" answered about disease
 * prevention, "natural vs political boundary" answered about natural vs
 * synthetic essential oils, "plain vs prairie" was garbled, "formal vs
 * functional region" answered about federal political autonomy, and
 * infrastructure/superstructure came back as a Marxism web dump.
 */
export const HUMAN_GEOGRAPHY_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-humgeo2-industry-sectors',
    title: 'Primary vs secondary vs tertiary industry (economic sectors)',
    category: 'geography',
    keywords: [
      'difference between primary secondary and tertiary industry', 'economic sectors',
      'primary secondary tertiary quaternary', 'extraction manufacturing services',
      'raw materials', 'not disease prevention', 'sector shift with development', 'quinary sector',
    ],
    content: `These are the sectors of an economy by what kind of work is done. (This has nothing to do with primary/secondary/tertiary prevention in medicine.)

Primary sector: extracting or harvesting raw materials directly from the earth and nature — farming, fishing, forestry, mining, quarrying, oil and gas extraction. Dominant in the least developed economies.

Secondary sector: manufacturing and construction — taking raw materials and turning them into finished goods (steel mills, car factories, food processing, building). Grows during industrialisation.

Tertiary sector: services — providing something intangible rather than a physical good: retail, transport, healthcare, education, tourism, banking, hospitality, government. It dominates in developed economies (often 70-80% of jobs).

Some models add:
- Quaternary sector: knowledge and information services — research, IT, consultancy, finance analysis, R&D.
- Quinary sector: top-level decision-making — senior executives, senior government, top academics.

As a country develops, employment typically shifts from primary to secondary to tertiary (the "Clark-Fisher model").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-natural-vs-political-boundary',
    title: 'Natural vs political (artificial) boundary',
    category: 'geography',
    keywords: [
      'difference between a natural and political boundary', 'natural vs political boundary',
      'physical boundary', 'geometric boundary', 'river mountain range', 'lines of latitude',
      'not natural versus synthetic oils', 'border demarcation', 'antecedent superimposed',
    ],
    content: `A boundary is the line dividing one country's or region's territory from another's. This is about geography, not about natural versus synthetic ingredients.

A natural (physical) boundary follows a natural feature of the landscape: a river (the Rio Grande between the US and Mexico), a mountain range (the Pyrenees between France and Spain, the Andes between Chile and Argentina), a lake, a coastline, or a desert. These are easy to see and were often used historically, but they can be disputed (which bank of a shifting river? which watershed line?).

A political (artificial) boundary is a line agreed by people that does not follow any physical feature. This includes:
- Geometric boundaries: straight lines along a line of latitude or longitude (the US-Canada border along the 49th parallel, much of the Africa-Sahara borders drawn by colonial powers).
- Boundaries drawn by treaty, war settlement, or negotiation regardless of terrain.

Boundaries are also classified by timing relative to settlement: antecedent (drawn before an area was populated), subsequent (evolved with the cultural landscape), superimposed (forced onto an existing cultural landscape by an outside power), and relict (a former boundary no longer in force but still visible, like the old inner-German border).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-plain-vs-prairie',
    title: 'Plain vs prairie',
    category: 'geography',
    keywords: [
      'difference between a plain and a prairie', 'plain vs prairie', 'flat land landform',
      'temperate grassland', 'vegetation type', 'Great Plains', 'steppe pampas veld',
      'a prairie is a kind of plain', 'tallgrass shortgrass',
    ],
    content: `A plain is a landform: a large area of flat or gently rolling land with little change in elevation, regardless of what grows on it. Plains can be grassland, forest, farmland, desert or wetland; they form by sediment deposition (river floodplains, coastal plains) or erosion. Examples: the North European Plain, the Indo-Gangetic Plain, the coastal plain of the eastern US.

A prairie is a type of ecosystem / vegetation: a temperate grassland dominated by grasses and wildflowers with few trees, with deep fertile soils, occurring in the continental interior of North America (the tallgrass, mixed-grass and shortgrass prairies of the Great Plains and Canadian Prairies). Much of it has been ploughed for agriculture.

So a prairie is a specific kind of plain — a flat-to-rolling area that happens to be covered by temperate grassland. The same grassland ecosystem has other regional names: steppe (Eurasia), pampas (Argentina), veld (South Africa), the Downs (Australia). Not every plain is a prairie (a plain can be forested or a desert), and grassland can occur on land that is not perfectly flat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-formal-vs-functional-region',
    title: 'Formal vs functional region (and perceptual region)',
    category: 'geography',
    keywords: [
      'difference between a formal and functional region', 'formal vs functional region',
      'uniform region', 'nodal region', 'shared characteristic', 'organized around a node',
      'metropolitan area', 'not political autonomy', 'vernacular perceptual region',
    ],
    content: `Geographers divide space into three kinds of region. This is not about legal or constitutional autonomy.

A formal (uniform) region is defined by one or more shared characteristics that are roughly the same throughout it: a physical trait (the Sahara Desert, the Rocky Mountains), a political unit (Canada, the state of Texas), a language area (the Francophone region of Quebec), a climate zone, or an economic trait (the Corn Belt). You are either inside it or outside it, and it has a clear defining property.

A functional (nodal) region is organised around a central point (node) and the connections radiating from it. It is defined by movement, interaction and flow rather than a uniform trait. Examples: a metropolitan area tied to its downtown, the delivery area of a pizza shop, the circulation area of a newspaper, an airport's catchment, a port's hinterland. The influence is strongest at the node and fades outward.

A perceptual (vernacular) region exists mainly in people's minds and cultural identity, with fuzzy, contested edges: "the American South", "the Midwest", "Downtown", "the Bible Belt". People agree it exists but not exactly where it ends.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-infrastructure-vs-superstructure',
    title: 'Infrastructure vs superstructure',
    category: 'geography',
    keywords: [
      'difference between infrastructure and superstructure', 'infrastructure vs superstructure',
      'physical facilities', 'roads utilities networks', 'Marxist base and superstructure',
      'buildings above ground', 'two meanings', 'transport water power communications',
    ],
    content: `"Infrastructure vs superstructure" has two quite different meanings depending on context.

In everyday and engineering use, infrastructure is the basic physical systems and facilities a society or a place needs to function: roads, railways, bridges, ports, airports, water and sewage systems, the electricity grid, telecommunications and internet networks, and sometimes schools and hospitals ("social infrastructure"). It is the underlying network everything else relies on. In building and civil engineering, "substructure" is the part of a structure below ground (foundations) and "superstructure" is everything above ground (walls, floors, roof).

In Marxist theory, the "base" (sometimes loosely called infrastructure, from the French infrastructure) is the economic foundation of society: the forces of production (technology, labour, resources) and the relations of production (who owns what, class structure). The "superstructure" is everything built on top of that base — the state, law, politics, religion, education, culture, ideology, media. Marx argued the economic base fundamentally shapes the superstructure, while the superstructure in turn works to legitimise and reproduce the base.

Which meaning applies depends entirely on whether the discussion is about engineering/public works or about social theory.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-country-vs-nation-state',
    title: 'Country vs nation vs state vs nation-state',
    category: 'geography',
    keywords: [
      'difference between a country and a nation state', 'country vs nation state', 'sovereign state',
      'a people with shared identity', 'borders match the nation', 'Japan Iceland', 'multinational state',
      'stateless nation', 'not about signing treaties',
    ],
    content: `These overlap in casual speech but are distinct.

A state is a political and legal entity: a defined territory, a permanent population, a government, and sovereignty (recognised control of its own affairs). Signing treaties does not reduce a state's sovereignty — that is a normal exercise of it.

A nation is a large group of people who see themselves as belonging together through shared culture, language, history, ethnicity or identity — a "people". A nation does not need its own government (the Kurds and the Catalans are nations without a fully independent state; the Scots are a nation within the UK).

A country is the everyday word, usually meaning the same thing as a sovereign state (a place with its own government and borders).

A nation-state is the specific case where the borders of a state closely match a single nation — most of the population shares one national identity, and that nation has its own state. Japan, Iceland, Portugal and South Korea are near-perfect examples. Contrast this with a multinational state (the UK, Canada, Belgium, Nigeria — several nations in one state) and a stateless nation (a nation with no state of its own). So the "nation-state" label is about the fit between people and borders, not about the degree of sovereignty.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-colony-vs-territory',
    title: 'Colony vs territory (and protectorate)',
    category: 'geography',
    keywords: [
      'difference between a colony and a territory', 'colony vs territory', 'settled and governed by another country',
      'dependent area', 'overseas territory', 'protectorate', 'direct versus indirect rule',
      'not full sovereign control', 'unincorporated territory', 'decolonisation',
    ],
    content: `A colony is a territory that is fully controlled and governed by a distant "parent" country (the colonial power), typically settled by that power's people, exploited for resources, and administered for the parent country's benefit, with the local population having little or no self-government. The word carries the historical baggage of the European empires. The colony does NOT have sovereign control of itself — the colonial power does.

A territory, in modern usage, is a broader and softer term for an area that is under a country's sovereignty but is not a full constituent part of it (not a state, province or the "metropolitan" homeland) and usually has limited self-government and limited representation. Examples: the US territories of Puerto Rico and Guam, British Overseas Territories like Bermuda and the Falklands, the French overseas territories. Some have substantial local autonomy; some are almost self-governing.

A protectorate is a related historical form where a local ruler or government stays nominally in place but a stronger state controls its defence and foreign affairs — this is the "rule through a local ruler" (indirect rule) arrangement.

Broadly: "colony" implies full external control and an exploitative imperial relationship; "territory" is the modern, more neutral term for a dependent area under a country's sovereignty with a lesser status than its core regions.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-density-vs-distribution',
    title: 'Population density vs population distribution',
    category: 'geography',
    keywords: [
      'difference between population density and distribution', 'density vs distribution',
      'people per square kilometre', 'spatial pattern', 'where people live', 'evenly or clustered',
      'arithmetic density', 'sparsely and densely populated', 'a number versus a pattern',
    ],
    content: `Population distribution is the PATTERN of where people live across an area — how they are spread out. It is described in words and maps: clustered along coasts and rivers, concentrated in cities, sparse in deserts and mountains, uneven overall. Globally, distribution is highly uneven: about two-thirds of people live in a few dense clusters (East Asia, South Asia, Europe, north-eastern North America), while huge areas (the Sahara, Amazon interior, Siberia, central Australia) are nearly empty.

Population density is a NUMBER: the average people per unit of area, usually per square kilometre or square mile (arithmetic density = total population divided by total land area). It measures how crowded an area is on average. Monaco and Bangladesh have very high density; Mongolia, Canada and Namibia have very low density.

The relationship: density is a single summary statistic; distribution is the fuller spatial picture. A country can have a modest national density but a wildly uneven distribution — Canada's average density is tiny, but most Canadians are packed into a thin band near the US border, so local densities in Toronto or Montreal are high. Density hides that; a distribution map shows it. (Physiological density — people per unit of farmable land — is another refinement.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humgeo2-rural-vs-urban',
    title: 'Rural vs urban area',
    category: 'geography',
    keywords: [
      'difference between a rural and urban area', 'rural vs urban', 'population size and density threshold',
      'built-up area', 'countryside', 'land use', 'agriculture versus services', 'commuting',
      'census definitions vary', 'rural-urban continuum',
    ],
    content: `An urban area is a place with a relatively large, dense, concentrated population living in a built-up settlement — a town or city — where most land is used for housing, industry, commerce, services and transport rather than for growing food, and most people work in manufacturing or (mostly) services. Governments set a threshold to define it (often a minimum population like 2,000-5,000 plus a minimum density), so the exact line varies by country.

A rural area is the opposite: sparse, low-density population spread across the countryside, with land dominated by farming, forestry, mining or open natural space, smaller settlements (villages, hamlets, isolated farms), a higher share of primary-sector jobs, and fewer services (people travel further for a hospital, a big shop or a secondary school).

In practice there is a rural-urban continuum rather than a hard boundary: the edge of a city, commuter villages, "peri-urban" fringe and market towns sit in between. Suburbs are part of the urban area even though they feel less dense. Worldwide, the population has shifted from mostly rural to majority urban — over half of humanity now lives in urban areas, and the share is still rising fastest in Africa and Asia.`,
    createdAt: Date.now(),
  },
];
