import { KnowledgeItem } from '../../types';

// Batch 281 corpus fixes — geography topics. 6/25 misses, almost entirely the "answered only half
// the comparison, cut off before the second term" pattern (savanna, jungle, geyser, archipelago,
// and plain all never got properly defined even though the first term of each pair did).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'geography',
  keywords,
  content,
  createdAt: now,
});

export const GEOGRAPHY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-geo-desert-vs-savanna',
    'Desert vs savanna',
    ['desert', 'savanna', 'difference desert savanna'],
    "A desert is defined by extreme dryness — it gets less than about 250mm (10 inches) of rain per year, and can be hot (like the Sahara) or cold (like Antarctica or the Gobi in winter), but either way it's too dry to support much plant life beyond scattered, drought-adapted species. A savanna is a tropical grassland with a distinct SEASONAL climate — it has a long dry season and a shorter wet season each year, getting significantly more total rainfall than a desert (roughly 500-1500mm annually), which is enough to support wide-open grasslands dotted with scattered trees (like the African savanna's iconic acacia trees) and large grazing animal populations — something a true desert's extreme dryness can't sustain.",
  ),
  k(
    'kb-gap-geo-rainforest-vs-jungle',
    'Rainforest vs jungle',
    ['rainforest', 'jungle', 'difference rainforest jungle'],
    "A rainforest is the broader, more precise scientific term: a dense forest ecosystem that receives very high, consistent rainfall (often 2,000mm+ per year), with a tall, closed canopy that blocks most sunlight from reaching the forest floor — this canopy shade actually means the ground level of a mature rainforest is often fairly open and easy to walk through. A jungle specifically refers to a much denser, tangled, hard-to-walk-through area with thick undergrowth — this typically happens at the EDGES of a rainforest, along riverbanks, or in areas where the canopy has been disturbed or broken (letting more sunlight reach the ground and fuel dense undergrowth growth), not in the shaded interior. So all jungles are essentially a specific, denser type of rainforest-adjacent terrain, but the interior of a mature rainforest itself is usually not as densely tangled as the popular image of a 'jungle' suggests.",
  ),
  k(
    'kb-gap-geo-volcano-vs-geyser',
    'Volcano vs geyser',
    ['volcano', 'geyser', 'difference volcano geyser'],
    "A volcano is an opening in the Earth's crust where molten rock (magma), ash, and gases erupt from deep underground — driven by intense heat and pressure from within the planet, and capable of building up entire mountains over repeated eruptions. A geyser is a much smaller, gentler natural feature where heated GROUNDWATER (not molten rock) periodically erupts as a jet of hot water and steam — this happens when water seeps down into a chamber near a heat source (often near volcanic or geothermal activity), gets superheated under pressure, and then bursts upward through a narrow vent once the pressure is released, like Old Faithful in Yellowstone. The key difference: a volcano erupts molten rock and ash from the Earth's mantle; a geyser erupts heated water and steam, and while it's often located in the same volcanically active regions, a geyser itself involves no molten rock at all.",
  ),
  k(
    'kb-gap-geo-canyon-vs-valley',
    'Canyon vs valley',
    ['canyon', 'valley', 'difference canyon valley'],
    "A canyon is a deep, narrow gorge with steep, often near-vertical rock walls, typically carved by a river cutting downward through rock over a very long time (like the Grand Canyon) — canyons are usually found in dry, arid regions where there isn't enough rainfall to weather the steep walls into gentler slopes. A valley is a much broader, more general term for any low area of land between hills or mountains — valleys are often wider, with gentler sloped sides, and are frequently shaped by a combination of river erosion AND glacial activity over time, which tends to smooth out the terrain more than a canyon's sharp, steep walls. In short: a canyon is a specific type of narrow, steep-walled valley, usually found in dry climates and carved primarily by river erosion; 'valley' is the broader term covering any low land between higher ground, regardless of how steep or wide it is.",
  ),
  k(
    'kb-gap-geo-archipelago-vs-atoll',
    'Archipelago vs atoll',
    ['archipelago', 'atoll', 'difference archipelago atoll'],
    "An archipelago is simply a group or chain of many islands clustered together in an area of water (like Indonesia, the Philippines, or Hawaii) — the islands can be volcanic, continental fragments, or coral-based, and there's no specific shape requirement; it's just the general term for a collection of islands. An atoll is a much more SPECIFIC type of island formation: a ring-shaped coral reef (often with a lagoon in the middle) that forms around a sinking, extinct volcanic island — as the volcano gradually erodes and sinks beneath the sea over millions of years, the coral reef that grew around its edges keeps growing upward, eventually leaving just a ring of coral and small islands surrounding a central lagoon where the volcano used to be. So an atoll is one specific TYPE of island (a coral ring around a sunken volcano), while an archipelago is the broader term for any cluster of islands — a single archipelago can even contain multiple atolls among its islands.",
  ),
  k(
    'kb-gap-geo-plateau-vs-plain',
    'Plateau vs plain',
    ['plateau', 'plain', 'difference plateau plain'],
    "A plateau is a large area of relatively flat land that sits significantly ELEVATED above the surrounding landscape, typically with at least one steep edge or cliff dropping down to the lower land around it (like the Tibetan Plateau or the Deccan Plateau) — it's essentially a flat-topped highland. A plain is a large area of flat (or gently rolling) land that sits at a LOW or moderate elevation, roughly level with the surrounding terrain, with no steep drop-off (like the Great Plains in the US) — plains are often formed by sediment deposits from rivers or ancient seas, and are typically prized for agriculture due to their fertile, easily farmable flat terrain at accessible elevation. Both are flat on top; the key difference is elevation and edges — a plateau is a flat highland with steep sides, while a plain is flat land at a low elevation with no significant drop-off.",
  ),
];
