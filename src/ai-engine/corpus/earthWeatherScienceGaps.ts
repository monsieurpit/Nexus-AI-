import { KnowledgeItem } from '../../types';

// Batch 289 corpus fixes — earth/weather science topics. Strong domain, 4/25 misses. One
// hallucination ("heat wave vs warm spell" answered entirely about sea-level rise and
// geoengineering, never addressing the actual question) and three answers cut off mid-sentence
// before finishing the comparison.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'science',
  keywords,
  content,
  createdAt: now,
});

export const EARTH_WEATHER_SCIENCE_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-earth-fscale-vs-efscale',
    'F-scale vs EF-scale tornado rating',
    ['fujita scale', 'enhanced fujita scale', 'f-scale', 'ef-scale', 'difference f-scale ef-scale'],
    "Both the original Fujita Scale (F-scale) and the Enhanced Fujita Scale (EF-scale) rate tornado intensity on a 0-to-5 range based on the DAMAGE a tornado causes, not directly measured wind speed. The Enhanced Fujita Scale (introduced in 2007, replacing the original) improved on the old F-scale by using 28 specific damage indicators (different building types, trees, structures) with much more detailed degree-of-damage descriptions for each, giving meteorologists a more precise and consistent way to estimate wind speeds from the damage observed — the original F-scale's wind speed estimates were considered too high and less precisely calibrated to actual engineering data. In short: the EF-scale is a more accurate, detailed, and better-calibrated successor to the original F-scale, both still working by inferring wind speed from a damage assessment rather than direct measurement.",
  ),
  k(
    'kb-gap-earth-heatwave-vs-warmspell',
    'Heat wave vs warm spell',
    ['heat wave', 'warm spell', 'difference heat wave warm spell'],
    "A heat wave is a specific meteorological term for a prolonged period of abnormally and uncomfortably HOT weather, usually defined by exceeding a certain temperature threshold for multiple consecutive days (the exact threshold varies by region and climate — what counts as a heat wave in a cold climate might be normal summer weather somewhere hotter). A warm spell is a more general, less formally defined term for a stretch of warmer-than-usual weather that doesn't necessarily reach the extreme, sustained intensity or duration needed to officially qualify as a heat wave — it's milder and less strictly defined. The key difference: a heat wave is a more extreme, often officially-defined weather event with specific temperature/duration thresholds, while a warm spell is a more general, milder period of above-average warmth without necessarily meeting those stricter criteria.",
  ),
  k(
    'kb-gap-earth-solarflare-vs-cme',
    'Solar flare vs coronal mass ejection',
    ['solar flare', 'coronal mass ejection', 'cme', 'difference solar flare cme'],
    "A solar flare is a sudden, intense burst of ELECTROMAGNETIC RADIATION (light and X-rays) from the Sun's surface — it travels at the speed of light and reaches Earth in about 8 minutes, potentially disrupting radio communications and GPS signals almost immediately. A coronal mass ejection (CME) is a massive PHYSICAL ERUPTION of billions of tonnes of magnetized plasma (actual charged particles/matter) blasted out from the Sun's corona into space at 300 to 3,000 km/second — much slower than light, so a CME typically takes 1-3 days to reach Earth, but when it arrives it can cause geomagnetic storms, disrupt power grids and satellites, and produce spectacular auroras. The key difference: a solar flare is a flash of light/radiation that arrives almost instantly, while a CME is an actual eruption of physical matter that takes days to arrive but can cause much more widespread, longer-lasting effects on Earth's magnetic field.",
  ),
  k(
    'kb-gap-earth-magnitude-vs-intensity',
    'Earthquake magnitude vs intensity',
    ['earthquake magnitude', 'earthquake intensity', 'difference magnitude intensity'],
    "Earthquake magnitude measures the total amount of ENERGY released at the earthquake's source (the fault where it originated) — a single earthquake has exactly ONE magnitude value, typically measured using the moment magnitude scale, regardless of where you are. Earthquake intensity measures the actual FELT EFFECTS and damage experienced at a SPECIFIC LOCATION — a single earthquake can have MANY different intensity values, since a location closer to the epicenter will experience much stronger shaking/damage than a location far away, even though it's the exact same earthquake with the same magnitude. The key difference: magnitude is a single, fixed number describing the earthquake's total energy at its source, while intensity varies place-by-place based on how strongly that earthquake was actually felt or how much damage it caused at each specific location.",
  ),
];
