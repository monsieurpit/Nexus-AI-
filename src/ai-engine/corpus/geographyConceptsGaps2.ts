import { KnowledgeItem } from '../../types';

/**
 * GEOGRAPHY_CONCEPTS_GAPS_2 — batch 238 corrections.
 * nexus-4b was solid on most (Arctic/Antarctic, magma/lava, hurricane/typhoon/
 * cyclone, magnitude/intensity, delta/estuary, peninsula/isthmus, glacier/
 * iceberg). Misses:
 * - "UK vs Great Britain vs England" was a cut-off web dump.
 * - "city vs town" gave a circular mayor answer.
 * - "river vs stream" answered about a river delta.
 * - "hill vs mountain" and "plateau vs mesa" came back BLANK.
 * - "equator vs prime meridian" said the equator "runs north-south".
 * - "Global North vs developed world" rambled about global cities and UN
 *   membership.
 * - "border vs frontier" said a border is "a line where people settled".
 * - "census vs survey" was a raw web dump.
 * - "compass rose vs cardinal direction" conflated the compass rose with a
 *   compass instrument.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'geography', keywords, content, createdAt: now,
});

export const GEOGRAPHY_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-geo2-uk-gb-england',
    'United Kingdom vs Great Britain vs England',
    [
      'difference between the United Kingdom Great Britain and England', 'England is one country', 'Great Britain is the island holding England Scotland and Wales',
      'the United Kingdom is Great Britain plus Northern Ireland', 'British Isles also includes Ireland', 'nested terms not synonyms',
    ],
    `Three nested things, not synonyms:

ENGLAND is one country — the largest of the four that make up the UK, capital London. Scotland, Wales, and Northern Ireland are separate countries; calling the whole state "England" leaves them out and annoys people.

GREAT BRITAIN is a geographic term: the largest ISLAND of the British Isles, which contains three countries — England, Scotland, and Wales. "Team GB" at the Olympics, ".gb", and "Great Britain" strictly mean just that island's three nations.

The UNITED KINGDOM (full name "the United Kingdom of Great Britain and Northern Ireland") is the sovereign state: Great Britain PLUS Northern Ireland — so all four countries. This is the entity with a seat at the UN, a passport, and a Parliament at Westminster (Scotland, Wales, and Northern Ireland also have devolved legislatures).

Wider still, the "British Isles" is the whole archipelago and also includes the Republic of Ireland (an independent country, not part of the UK) and the Isle of Man and Channel Islands (Crown dependencies, not part of the UK).`,
  ),
  k(
    'kb-gap-geo2-city-vs-town',
    'City vs town',
    [
      'difference between a city and a town', 'no universal rule varies by country', 'a city is generally larger and more populous with more services and infrastructure',
      'in the UK city status is granted by the monarch historically linked to a cathedral', 'in the US a city is an incorporated municipality often with a charter', 'town is smaller',
    ],
    `There is no single worldwide rule — it depends on the country and is often a matter of legal status rather than pure size.

Generally, a CITY is larger and more populous than a TOWN, with a denser built-up core, more infrastructure and public services (hospitals, universities, transit, government offices), and a bigger economic role. A town is a smaller settlement — more than a village, with its own shops, schools, and local government, but without a city's scale or range of institutions.

Legal definitions vary:
- In the UK, "city" is an honorary status formally granted by the monarch; historically it was tied to having a cathedral, and some small places (St Davids, ~1,600 people) are cities while large towns are not.
- In the US, a "city" is usually just an incorporated municipality with a charter; the label depends on state law and local choice, so some "cities" are tiny and some "towns" are large.
- Many countries use population thresholds (e.g. a set number of inhabitants) to classify settlements.

So "city" often signals official status or a large regional centre; "town" signals a smaller local centre — but the exact line is set locally.`,
  ),
  k(
    'kb-gap-geo2-river-vs-stream',
    'River vs stream',
    [
      'difference between a river and a stream', 'a stream is any flowing body of water in a channel', 'a river is a large stream',
      'no strict size cutoff', 'brook creek rivulet tributary', 'streams feed into rivers rivers flow to the sea or a lake',
    ],
    `"Stream" is the general scientific term for ANY body of water flowing in a natural channel, of any size — a hydrologist calls a trickle and the Amazon both "streams". "River" means a LARGE stream.

In everyday use:
- a STREAM is small — narrow enough to step across or wade, shallow, often seasonal. Regional words for small streams include brook, creek, rivulet, and burn.
- a RIVER is large — wide, deep, permanent, carrying a substantial volume of water, usually the main channel that smaller streams (its "tributaries") flow into. Rivers generally end by flowing into a lake, a larger river, or the sea.

There is no official width or flow rate that turns a stream into a river; it is a matter of scale and local naming convention. A single watercourse can be called a stream near its source in the hills and a river downstream once enough tributaries have joined it.`,
  ),
  k(
    'kb-gap-geo2-hill-vs-mountain',
    'Hill vs mountain',
    [
      'difference between a hill and a mountain', 'no universal rule', 'a mountain is higher steeper and more prominent a hill is lower and more rounded',
      'some countries used a 1000 foot or 300 metre cutoff', 'local relief prominence', 'UK abandoned the strict height rule',
    ],
    `There is no globally agreed definition — it comes down to height, steepness, and local prominence, and different bodies have drawn the line differently.

A MOUNTAIN is a large landform that rises high and steeply above its surroundings, with significant local relief (the height difference between summit and base), often a defined peak, and — if high enough — distinct climate/vegetation zones or permanent snow. A HILL is lower, with gentler, more rounded slopes and less prominence, usually able to be climbed easily on foot.

Historical thresholds: the UK and US at times used about 1,000 feet (roughly 300 m) of elevation above the surrounding land as the cutoff, but the UK's Ordnance Survey abandoned any official distinction. Some definitions use total elevation above sea level, others use prominence. The 1995 film "The Englishman Who Went Up a Hill but Came Down a Mountain" is about exactly this ambiguity.

Practically: if it dominates the skyline, is hard to climb, and has a real summit, people call it a mountain; if it is a modest rounded rise, they call it a hill.`,
  ),
  k(
    'kb-gap-geo2-plateau-vs-mesa',
    'Plateau vs mesa (vs butte)',
    [
      'difference between a plateau and a mesa', 'a plateau is a large elevated area of relatively flat land', 'a mesa is a smaller isolated flat-topped hill or mountain with steep sides',
      'a mesa is an erosional remnant of a plateau', 'a butte is smaller and narrower than a mesa', 'tableland caprock',
    ],
    `All three are flat-topped, steep-sided landforms; they differ in SIZE and how isolated they are.

A PLATEAU (or tableland) is a LARGE area of relatively level, elevated ground standing well above the land around it, often covering hundreds or thousands of square kilometres — the Colorado Plateau, the Tibetan Plateau, the Deccan Plateau. It can be formed by uplift, by stacked lava flows, or by erosion leaving a resistant layer high.

A MESA (Spanish for "table") is a much SMALLER, ISOLATED flat-topped hill or small mountain with steep cliff sides, typically wider than it is tall. Mesas are erosional REMNANTS: as a plateau's edges wear back, isolated tables are left standing. A resistant "caprock" layer protects the softer rock beneath.

A BUTTE is smaller still than a mesa — a narrow, isolated tower or column of rock, taller relative to its width (the classic Monument Valley spires). As a mesa keeps eroding it eventually becomes a butte, then a spire, then nothing.

Size order: plateau (huge) → mesa (a table-sized remnant) → butte (a narrow pillar).`,
  ),
  k(
    'kb-gap-geo2-equator-vs-prime-meridian',
    'Equator vs prime meridian',
    [
      'difference between the equator and the prime meridian', 'the equator is the line of zero latitude circling east-west around the middle dividing north and south hemispheres',
      'the prime meridian is the line of zero longitude running north-south pole to pole through Greenwich dividing east and west', 'latitude versus longitude reference lines',
    ],
    `Both are the zero-lines of the coordinate grid, but for the two different coordinates, and they run in perpendicular directions.

The EQUATOR is the line of 0 degrees LATITUDE. It is a full circle around the Earth midway between the poles, running EAST-WEST, and it divides the planet into the Northern and Southern Hemispheres. Its position is fixed by the Earth's rotation axis (it is the widest circle, perpendicular to the axis). Places on the equator get roughly 12 hours of daylight year-round and the most direct sunlight.

The PRIME MERIDIAN is the line of 0 degrees LONGITUDE. It runs NORTH-SOUTH from the North Pole to the South Pole, passing through Greenwich, London, and it divides the Earth into the Eastern and Western Hemispheres. Unlike the equator its location is an arbitrary human choice (agreed internationally in 1884); any meridian could have been "prime". It is also the basis of the world's time zones (UTC/GMT).

So: equator = zero latitude, east-west circle, set by physics, N/S split; prime meridian = zero longitude, north-south line, set by convention, E/W split.`,
  ),
  k(
    'kb-gap-geo2-global-north-vs-developed-world',
    'Global North vs the developed world',
    [
      'difference between the Global North and the developed world', 'developed world is an economic classification high income HDI industrialised', 'Global North is a geopolitical grouping term used in development studies',
      'largely the same countries different framing', 'Global South successor to Third World', 'Australia and New Zealand are in the Global North despite being south',
    ],
    `They pick out roughly the same set of wealthy, industrialised countries, but they come from different framings.

"DEVELOPED WORLD" / "developed countries" is an ECONOMIC classification based on measurable criteria: high income per capita, a high Human Development Index, advanced industry and services, strong infrastructure and institutions. Bodies like the UN, IMF, and World Bank publish lists (with categories such as "advanced economies" or "high-income countries"). The counterpart terms are "developing" and "least developed" countries.

"GLOBAL NORTH" is a term from development studies and geopolitics, used as a less loaded replacement for older labels ("First World", "the West", "developed"). It emphasises a country's position in the global distribution of WEALTH and POWER rather than a single economic score. Its counterpart is the "Global South". Notably it is not literally geographic: Australia and New Zealand sit in the Global North despite being in the Southern Hemisphere, and much of the Global South is north of the equator.

So "developed world" is a metric-based bucket; "Global North" is a structural/relational concept about who holds economic and political leverage. In practice the membership lists overlap heavily.`,
  ),
  k(
    'kb-gap-geo2-border-vs-frontier',
    'Border vs frontier',
    [
      'difference between a border and a frontier', 'a border is a precise defined line separating two political territories', 'a frontier is a zone not a line',
      'frontier as the region near a border or the edge of settled and controlled territory', 'the American frontier', 'boundary demarcation',
    ],
    `A BORDER (or boundary) is a precise LINE that separates two political territories — two countries, states, or provinces. It is defined by treaty or law, often surveyed and marked on the ground with posts, fences, or checkpoints, and it has an exact location. "The border between France and Spain" is a specific line you can stand on.

A FRONTIER is a ZONE, not a line, and the word has two related senses:
1. the region of a country that lies ALONG or NEAR its border — the borderlands, often less densely settled and with mixed culture and trade (e.g. "frontier towns").
2. historically, the outer edge of a state's SETTLEMENT and CONTROL — the shifting band between organised territory and land that is unsettled, contested, or beyond effective government (the "American frontier" moving west, the "final frontier" of space). In this sense it implies expansion into an area not yet fully claimed or developed.

So a border is a sharp, agreed line; a frontier is a fuzzy band — either hugging a border or marking the limit of where a society's control currently reaches.`,
  ),
  k(
    'kb-gap-geo2-census-vs-survey',
    'Census vs survey',
    [
      'difference between a census and a survey', 'a census attempts to count every member of a population complete enumeration', 'a survey collects data from a sample a subset and generalises',
      'census expensive infrequent decennial', 'survey cheaper faster more frequent has sampling error', 'representative sample margin of error',
    ],
    `A CENSUS is a COMPLETE count. It tries to collect information from EVERY member of a population — every person and household in a country, every business in an industry. Because it reaches everyone, it gives exact totals even for small areas and small subgroups, but it is enormously expensive and slow, so national population censuses are usually run only every 5 or 10 years (the US and UK do it every 10).

A SURVEY collects information from a SAMPLE — a carefully chosen subset of the population — and uses statistics to generalise the findings to the whole. A well-designed random sample of a few thousand people can estimate national figures quite accurately. Surveys are far cheaper and faster, so they can be run often (monthly labour-force surveys, opinion polls), and can ask longer or more detailed questions. The trade-off is "sampling error": results are estimates with a margin of error, and they are unreliable for very small subgroups the sample barely covers.

Short version: a census measures everyone once in a long while; a survey estimates from a sample, cheaply and often, with a margin of error.`,
  ),
  k(
    'kb-gap-geo2-compass-rose-vs-cardinal-direction',
    'Compass rose vs cardinal direction',
    [
      'difference between a compass rose and a cardinal direction', 'cardinal directions are the four main points north east south west', 'a compass rose is the figure on a map or chart showing orientation',
      'intercardinal directions northeast southeast', 'compass rose also shows intermediate points and sometimes degrees', 'not the compass instrument',
    ],
    `CARDINAL DIRECTIONS are the four principal points of the horizon: NORTH, EAST, SOUTH, WEST. (The four points halfway between them — northeast, southeast, southwest, northwest — are the "intercardinal" or "ordinal" directions.) They are concepts/reference directions, not objects.

A COMPASS ROSE is the FIGURE drawn on a map, nautical chart, or the face of a compass that displays those directions as a circular design — a star or wheel with labelled points radiating out, showing north (often with a fleur-de-lis or arrow), the other cardinals, usually the intercardinals, and often finer points or a full 360-degree scale. Its job is to show the map's orientation so you can relate directions on the paper to directions in the real world.

So cardinal directions are WHAT (the named directions); the compass rose is the DIAGRAM that shows them. Neither is the magnetic compass instrument itself, which is the physical tool with a needle that points toward magnetic north.`,
  ),
  k(
    'kb-gap-geo2-holland-vs-netherlands',
    'Holland vs the Netherlands',
    [
      'difference between Holland and the Netherlands', 'the Netherlands is the country', 'Holland is a region made of two provinces North Holland and South Holland',
      'using Holland for the whole country is a common informal shorthand', 'Amsterdam Rotterdam The Hague are in Holland', 'Dutch government stopped promoting the Holland nickname',
    ],
    `The NETHERLANDS is the country — one of the constituent countries of the Kingdom of the Netherlands, with 12 provinces, capital Amsterdam, seat of government The Hague.

HOLLAND is only a part of it: a historical region that today consists of just TWO of those provinces, North Holland and South Holland, on the western coast. It contains the biggest cities (Amsterdam, Rotterdam, The Hague) and has historically been the wealthiest, most populous, and most internationally visible part, which is why foreigners — and the Dutch themselves, when abroad or at football — often say "Holland" to mean the whole country.

That usage is informal and technically wrong, like calling the whole UK "England". In 2020 the Dutch government officially dropped "Holland" from its branding and now consistently promotes "the Netherlands". People from the other ten provinces (Brabant, Friesland, Limburg, etc.) are Dutch but not "Hollanders".`,
  ),
  k(
    'kb-gap-geo2-gmt-vs-utc',
    'GMT vs UTC',
    [
      'difference between GMT and UTC', 'GMT is a time zone based on the mean solar time at the Greenwich meridian', 'UTC is the modern time standard based on atomic clocks kept within 0.9 seconds of solar time by leap seconds',
      'for everyday purposes they are the same offset', 'UTC is not a time zone it is the reference', 'UT1 astronomical time',
    ],
    `For everyday purposes GMT and UTC are the same clock — both are "zero offset", and 12:00 GMT and 12:00 UTC are the same moment. The difference is technical, in how each is defined and used.

GMT (Greenwich Mean Time) is based on ASTRONOMY: the mean solar time at the Greenwich meridian — roughly, the average moment the Sun is highest over Greenwich. It was the world's time reference from 1884. It is still used as the name of a TIME ZONE (the UK in winter, and several West African countries).

UTC (Coordinated Universal Time) is the modern STANDARD, based on a worldwide network of ATOMIC clocks (International Atomic Time, TAI), which keep far more precise and stable time than the Earth's slightly irregular rotation allows. To keep UTC from drifting away from solar time, "leap seconds" are occasionally inserted so UTC stays within 0.9 seconds of astronomical time (UT1). UTC is not itself a time zone — it is the reference from which every time zone is defined as an offset (e.g. "UTC-5").

So: GMT = a solar-based time and a time-zone name; UTC = an atomic-based global standard that tracks it to under a second. Casual use treats them as identical; scientific and computing use says UTC.`,
  ),
];
