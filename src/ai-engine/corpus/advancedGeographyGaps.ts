import { KnowledgeItem } from '../../types';

// Batch 292 corpus fixes — advanced geography/geology topics. Strong domain, 6/25 misses, mostly
// the "only explained the first term of the comparison" pattern, plus one complete dodge
// (crater vs caldera answered with random volcano trivia instead of the actual distinction).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'geography',
  keywords,
  content,
  createdAt: now,
});

export const ADVANCED_GEOGRAPHY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-geo2-crater-vs-caldera',
    'Crater vs caldera',
    ['crater', 'caldera', 'difference crater caldera'],
    "A crater is a relatively small, bowl-shaped depression formed directly at a volcano's vent by an explosive eruption blasting material outward, or (in a non-volcanic context) by a meteorite impact — craters are typically no more than a couple of kilometers across. A caldera is a much LARGER depression, often many kilometers wide, formed differently — it happens when a volcano's underground magma chamber empties out during a massive eruption, and the ground surface above that now-empty chamber collapses inward under its own weight, leaving a huge basin (like Yellowstone's caldera or Crater Lake in Oregon, which despite its name is actually a caldera). The key difference: a crater is a smaller vent-opening depression formed by material being blasted OUT, while a caldera is a much larger collapse structure formed when the ground sinks INTO an emptied magma chamber below.",
  ),
  k(
    'kb-gap-geo2-oasis-vs-mirage',
    'Oasis vs mirage',
    ['oasis', 'mirage', 'difference oasis mirage'],
    "An oasis is a REAL, physical spot in a desert where water is actually present — from an underground spring, well, or water table close enough to the surface to support vegetation and human/animal life, allowing travelers to genuinely rest and resupply water. A mirage is NOT a real place or water source at all — it's an optical illusion caused by light bending (refracting) as it passes through layers of air at different temperatures near the hot desert ground, which can make the sky appear to reflect off the ground like a shimmering pool of water in the distance, even though there's nothing there. The key difference: an oasis is a genuine, physical source of real water in the desert, while a mirage is a visual illusion with no actual water present at all — the exact opposite of a real oasis, despite sometimes looking similar from a distance.",
  ),
  k(
    'kb-gap-geo2-savanna-vs-steppe',
    'Savanna vs steppe',
    ['savanna', 'steppe', 'difference savanna steppe'],
    "A savanna is a tropical or subtropical grassland with a pronounced wet and dry seasonal cycle — long dry spells followed by a rainy season, typically warm year-round, and dotted with scattered trees (like the iconic acacia trees of the African savanna), supporting large populations of grazing animals. A steppe is a different type of grassland, typically found in more temperate or semi-arid mid-latitude regions (like Central Asia or parts of North America) — steppes generally have more extreme temperature swings between summer and winter (unlike a savanna's consistent warmth), lower and more evenly-spread rainfall without the same dramatic wet/dry seasonality, and are usually treeless or nearly treeless, dominated by grasses and low shrubs rather than scattered trees. The key difference: a savanna is a warm, tree-dotted grassland with sharp wet/dry seasons, while a steppe is a more temperate, largely treeless grassland with more extreme temperature swings and less dramatic seasonal rainfall patterns.",
  ),
  k(
    'kb-gap-geo2-tundra-vs-taiga',
    'Tundra vs taiga',
    ['tundra', 'taiga', 'difference tundra taiga'],
    "The taiga (also called boreal forest) is a huge belt of coniferous forest — pine, spruce, fir trees — found across Russia, Canada, and Scandinavia, with a short but real growing season warm enough to support substantial tree growth, even though winters are still very cold. The tundra is found farther north/at higher latitudes than the taiga (or at high elevations), and is MUCH colder and harsher — the ground stays frozen as permafrost for most or all of the year, the growing season is extremely short, and it's largely TREELESS, supporting only low-growing plants like mosses, lichens, and small shrubs since trees can't establish roots in the permanently frozen ground. The key difference: taiga is a forested biome with enough of a growing season to support large coniferous trees, while tundra is a colder, treeless biome further north where permafrost prevents trees from growing at all.",
  ),
  k(
    'kb-gap-geo2-floodplain-vs-delta',
    'Floodplain vs delta',
    ['floodplain', 'delta', 'difference floodplain delta'],
    "A floodplain is the flat area of land alongside a river that regularly floods when the river overflows its banks — sediment gets deposited across this land during flood events, building up fertile soil over time, but the floodplain exists along the river's course, well before it reaches the sea. A delta is a landform that forms specifically where a river meets a larger body of water (like an ocean or lake) and DEPOSITS its remaining sediment there, because the water suddenly slows down and spreads out — this sediment builds up over time into new land, often in a fan or triangular shape (like the Mississippi River Delta), extending the coastline outward. The key difference: a floodplain is the flat, flood-prone land alongside a river's course inland, while a delta is the new land built specifically at a river's mouth, where it deposits sediment upon reaching the sea or another large body of water.",
  ),
  k(
    'kb-gap-geo2-abyssal-plain-vs-trench',
    'Abyssal plain vs trench',
    ['abyssal plain', 'ocean trench', 'difference abyssal plain trench'],
    "An abyssal plain is a vast, remarkably FLAT area of the deep ocean floor, typically found at depths of about 3,000-6,000 meters, covered in a thick layer of fine sediment that has settled and smoothed out the terrain over millions of years — it's one of the flattest, most featureless landscapes on Earth. An ocean trench is the complete opposite of flat — it's a narrow, extremely deep, V-shaped depression in the ocean floor, formed where one tectonic plate is forced (subducted) beneath another — trenches are the deepest parts of the ocean (the Mariana Trench reaches nearly 11,000 meters), far deeper than the surrounding abyssal plain. The key difference: an abyssal plain is a vast, flat, sediment-covered deep-ocean floor, while a trench is a narrow, extremely deep, steep-sided depression formed by tectonic plate subduction — trenches are dramatically deeper and far less flat than the abyssal plain around them.",
  ),
];
