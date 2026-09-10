import { KnowledgeItem } from '../../types';

/**
 * METEOROLOGY_CONCEPTS_GAPS_3 — batch 228 corrections.
 * Errors: "troposphere vs ozone layer" said the troposphere warms with height
 * (it cools), "jet stream vs trade winds" had the trade winds blowing toward
 * the poles (they blow toward the equator), "weather radar vs doppler" called
 * weather radar passive, "snow vs sleet vs freezing rain" mangled freezing
 * rain, plus web dumps for isobar/isotherm and meteorology/climatology and
 * muddled humidity/RH, drought/dry-spell and air-mass/front answers.
 */
export const METEOROLOGY_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  {
    id: 'kb-gap-met3-troposphere-vs-ozone-layer',
    title: 'Troposphere vs the ozone layer (and stratosphere)',
    category: 'science',
    keywords: [
      'difference between the troposphere and the ozone layer', 'troposphere temperature decreases with height',
      'stratosphere temperature increases with height', 'ozone layer is in the stratosphere', 'where weather happens',
      'lapse rate', 'tropopause', 'UV absorption',
    ],
    content: `The troposphere is the LOWEST layer of the atmosphere, from the surface up to about 8 km (poles) to 18 km (equator). It contains about 75-80% of the atmosphere's mass and nearly all its water vapour, and it is where essentially ALL weather happens. In the troposphere, temperature DECREASES with height (on average about 6.5 C per km — the "environmental lapse rate"), because the ground is heated by the sun and warms the air from below. It ends at the "tropopause".

The ozone layer is NOT a separate atmospheric layer — it is a REGION of relatively high ozone (O3) concentration WITHIN the STRATOSPHERE, roughly 15-35 km up (above the troposphere). The stratosphere as a whole is defined by temperature INCREASING with height, and the reason is the ozone layer: ozone absorbs most of the Sun's harmful ultraviolet (UV-B and UV-C) radiation, and that absorption heats the upper stratosphere. This UV shielding is what makes life on land possible, and the "ozone hole" is the seasonal thinning of this layer over Antarctica caused by CFCs.

So: the troposphere is the bottom weather layer (cools with height); the ozone layer sits above it in the stratosphere (which warms with height because of the ozone).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-jet-stream-vs-trade-winds',
    title: 'Jet stream vs trade winds',
    category: 'science',
    keywords: [
      'difference between the jet stream and trade winds', 'jet stream fast narrow high-altitude west-to-east',
      'trade winds steady surface winds blowing toward the equator', 'easterlies', 'Hadley cell', 'polar and subtropical jets',
      'steers weather systems', 'not blowing toward the poles',
    ],
    content: `The jet stream is a narrow, fast (roughly 130-250+ km/h) ribbon of wind high in the atmosphere, near the tropopause (about 9-12 km, airliner altitude), flowing generally WEST TO EAST in both hemispheres. It forms along strong temperature boundaries (the polar jet between polar and mid-latitude air, the subtropical jet lower down). It steers surface weather systems — a wavy, "meandering" jet brings blocked, stagnant weather and cold or heat outbreaks; a strong straight jet moves storms through quickly.

The trade winds are STEADY SURFACE winds in the tropics that blow FROM the subtropical high-pressure belts (around 30 degrees latitude) TOWARD THE EQUATOR — not toward the poles. Because of the Coriolis effect they blow from the northeast in the Northern Hemisphere and the southeast in the Southern Hemisphere (they are "easterlies"). They are the low-level return flow of the Hadley circulation cell, they were used by sailing ships to cross the oceans westward, and they help steer Atlantic hurricanes westward toward the Americas. Where the two hemispheres' trade winds meet near the equator is the doldrums / Intertropical Convergence Zone.

Short version: jet stream = fast, narrow, high up, west-to-east, steers storms; trade winds = steady, broad, at the surface, tropical, blowing toward the equator from the east.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-humidity-vs-relative-humidity',
    title: 'Humidity vs relative humidity (vs absolute/dew point)',
    category: 'science',
    keywords: [
      'difference between humidity and relative humidity', 'humidity general term for water vapour in air',
      'relative humidity percent of saturation at that temperature', 'absolute humidity mass per volume',
      'specific humidity', 'dew point', 'why RH rises at night',
    ],
    content: `"Humidity" is the general term for the amount of water vapour in the air. It is quantified in several ways:

- ABSOLUTE HUMIDITY: the actual mass of water vapour per unit volume of air (e.g. grams per cubic metre). SPECIFIC HUMIDITY / mixing ratio: mass of vapour per mass of dry air. These are "how much water is actually there" and do not change if you just heat or cool the same air.

- RELATIVE HUMIDITY (RH): the ratio, as a PERCENTAGE, of the water vapour currently in the air to the MAXIMUM the air could hold at that temperature (saturation). RH depends heavily on temperature: warm air can hold much more vapour, so the SAME amount of moisture gives a low RH when warm and a high RH when cool. This is why RH usually climbs at night and drops in the afternoon even though the actual moisture is unchanged, and why 90% RH at 5 C feels nothing like 90% RH at 30 C.

- DEW POINT: the temperature to which the air must be cooled for it to reach saturation (100% RH). Because it does not depend on the current temperature, meteorologists prefer dew point as the honest measure of "how muggy" it is: a dew point above ~18-20 C feels oppressive regardless of what the RH reads.

So "humidity" is the concept; "relative humidity" is one specific, temperature-dependent way of expressing it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-snow-sleet-freezing-rain',
    title: 'Snow vs sleet vs freezing rain',
    category: 'science',
    keywords: [
      'difference between snow and sleet and freezing rain', 'entire column below freezing snow',
      'partial melt then refreeze aloft sleet ice pellets', 'rain that freezes on contact glaze ice',
      'freezing rain coats surfaces', 'temperature profile of the atmosphere', 'ice storm',
    ],
    content: `All three start as snow high up; what falls depends on the TEMPERATURE PROFILE the snowflake passes through on the way down.

SNOW: the whole air column from cloud to ground is at or below freezing, so the ice crystals never melt and reach the ground as snowflakes.

SLEET (ice pellets): the snowflake falls through a shallow WARM layer aloft and partly or fully melts into a raindrop, then falls through a deep COLD layer near the surface and REFREEZES into a small, hard, bouncing ice pellet before it lands. Sleet accumulates like tiny hail and makes a "tapping" sound on windows.

FREEZING RAIN: the snowflake falls through a DEEP warm layer aloft and melts completely into rain, then passes through only a THIN cold layer at the surface — too thin to refreeze the drop in the air. So it lands as liquid rain but instantly freezes ON CONTACT with anything at or below 0 C (roads, trees, power lines, cars), building a smooth, clear "glaze" of ice. A prolonged episode is an "ice storm", the most damaging of the three (downed trees and power lines, treacherous roads).

Hail is separate: it comes only from strong summer thunderstorm updrafts, not from a winter temperature profile.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-drought-vs-dry-spell',
    title: 'Drought vs dry spell',
    category: 'science',
    keywords: [
      'difference between a drought and a dry spell', 'short period of below-normal rain', 'prolonged significant precipitation deficit',
      'meteorological agricultural hydrological drought', 'impacts on water supply and crops', 'weeks versus months or years',
      'no fixed definition',
    ],
    content: `A dry spell is a relatively SHORT run of days to a few weeks with little or no precipitation. It is a normal part of weather variability, causes minor effects at most (a lawn browns, a garden needs watering), and ends quickly when the rain returns. Definitions vary but a common one is roughly 15 consecutive days with under 1 mm of rain.

A drought is a PROLONGED period (months to years) of precipitation well below normal for a region, severe and long enough to cause real impacts. It is graded by what it affects:
- Meteorological drought: a sustained rainfall deficit compared to the local average.
- Agricultural drought: soil moisture drops enough to stress or kill crops and pasture.
- Hydrological drought: reservoirs, rivers, lakes and groundwater fall well below normal — this develops slowly and recovers slowly, long after the rain returns.
- Socioeconomic drought: water shortages start to affect people, industry and ecosystems (rationing, wildfire risk, crop failure).

Short version: a dry spell is a brief lack of rain with little consequence; a drought is an extended, abnormal shortfall serious enough to deplete water supplies and damage agriculture. There is no single universal number — it is relative to what is normal for that place.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-air-mass-vs-front',
    title: 'Air mass vs front',
    category: 'science',
    keywords: [
      'difference between an air mass and a front', 'large body of air uniform temperature and humidity',
      'the boundary where two air masses meet', 'maritime continental polar tropical', 'source region',
      'cold front warm front occluded stationary', 'weather along the front',
    ],
    content: `An AIR MASS is a very large body of air — often hundreds or thousands of kilometres across — that has roughly UNIFORM temperature and humidity throughout, because it sat over a "source region" long enough to take on its character. Air masses are classified by moisture (maritime = m, over ocean, humid; continental = c, over land, dry) and by temperature (polar/arctic = P/A, cold; tropical = T, warm) — so "mT" is warm humid air from the tropical ocean, "cP" is cold dry air from northern land.

A FRONT is the transition zone / BOUNDARY where two different air masses meet. It is not a body of air; it is a line (on a map) or a sloping surface (in three dimensions). Because the two air masses have different density, the boundary tilts, and the warmer, lighter air is forced up along it — which is why fronts produce cloud and precipitation. Types: a COLD front (advancing cold air undercuts warm air — narrow band of intense showers/storms, then clearing and a temperature drop), a WARM front (advancing warm air rides up over cold air — a long broad zone of steady lighter rain, then warming), a STATIONARY front (neither moves), and an OCCLUDED front (a cold front catches up to a warm front and lifts the warm air off the ground).

Short version: an air mass is the "stuff"; a front is the seam between two of them, and it is along that seam that the weather happens.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-isobar-vs-isotherm',
    title: 'Isobar vs isotherm (weather map lines)',
    category: 'science',
    keywords: [
      'difference between an isobar and an isotherm', 'line of equal atmospheric pressure', 'line of equal temperature',
      'contours on a weather map', 'closely spaced isobars mean strong wind', 'pressure gradient', 'isopleth iso-line',
      'not freezing level',
    ],
    content: `Both are "iso-lines" (isopleths) on a weather map — lines joining points of EQUAL value of something — but of different quantities. (This is not the "freezing level" / 0 C isotherm HEIGHT specifically; that is one particular isotherm.)

An ISOBAR joins points of equal atmospheric PRESSURE (usually drawn every 4 hectopascals / millibars). Isobars form the closed loops around Highs and Lows on a surface pressure chart. Their spacing tells you the wind: closely packed isobars mean a steep pressure gradient and STRONG wind; widely spaced isobars mean light winds. Wind blows roughly ALONG the isobars (parallel to them), not across, because of the Coriolis effect — clockwise around a Northern Hemisphere High, anticlockwise around a Low.

An ISOTHERM joins points of equal TEMPERATURE. Isotherm maps show where warm and cold air are and where the sharp temperature gradients (often near fronts) lie. On upper-air charts, a specific isotherm like the 0 C line matters for forecasting snow versus rain, and its HEIGHT is the "freezing level".

Other common iso-lines: isohyet (equal rainfall), isodrosotherm (equal dew point), isotach (equal wind speed), contour lines (equal height of a pressure surface).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-weather-radar-vs-doppler',
    title: 'Weather radar vs Doppler radar',
    category: 'science',
    keywords: [
      'difference between weather radar and doppler radar', 'both are active radar', 'transmit microwave pulses and measure the echo',
      'reflectivity shows precipitation intensity', 'Doppler shift measures particle velocity', 'detect rotation mesocyclone',
      'dual-polarisation', 'not passive',
    ],
    content: `Both are ACTIVE radar — they transmit microwave pulses and listen for the energy scattered back by raindrops, snow, hail and even insects. Neither is "passive".

"Weather radar" in the basic sense measures REFLECTIVITY: how much energy comes back and how long it took, which gives the location and intensity of precipitation (a colour-coded map of light rain to heavy storms).

Doppler weather radar adds a second measurement using the DOPPLER SHIFT — the tiny change in frequency of the returned signal depending on whether the particles that scattered it are moving toward or away from the radar. This gives the RADIAL VELOCITY of the precipitation (and therefore the wind carrying it). That is what lets forecasters see ROTATION inside a storm (a mesocyclone, a possible tornado — a "velocity couplet" of inbound and outbound winds side by side), gust fronts, wind shear, and the inflow/outflow of a supercell.

Essentially all modern operational weather radars (the US NEXRAD network, for example) ARE Doppler radars, and most are now "dual-polarisation" too, sending both horizontal and vertical pulses to tell rain from hail from debris. So "weather radar" is the general tool; "Doppler" describes the velocity capability that all current ones have.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-met3-meteorology-vs-climatology',
    title: 'Meteorology vs climatology',
    category: 'science',
    keywords: [
      'difference between meteorology and climatology', 'study of the atmosphere and weather', 'study of climate over decades',
      'short-term forecasting', 'long-term averages and trends', 'weather is what you get climate is what you expect',
      'a meteorologist versus a climatologist',
    ],
    content: `Meteorology is the science of the atmosphere and its short-term behaviour — WEATHER. It covers the physics of the atmosphere (thermodynamics, fluid dynamics), how clouds, storms, fronts and pressure systems form and move, and the making of forecasts hours to about two weeks ahead. A meteorologist works with current observations and numerical weather-prediction models, and the questions are "will it rain here tomorrow?", "how strong will this hurricane get?".

Climatology is the study of CLIMATE — the statistical description of weather (averages, extremes, variability, and their causes) over long periods, conventionally 30 years or more. A climatologist analyses long records, reconstructs past climates (from ice cores, tree rings, sediments), studies large-scale patterns like ENSO and the monsoons, and — with climate models — projects how the climate may change over decades in response to greenhouse gases, volcanoes or ocean cycles. The questions are "what is a typical July here?", "how are the odds of extreme heat changing?".

Short version: meteorology = the atmosphere day to day, forecasting individual weather; climatology = the long-run statistics of the atmosphere, understanding and projecting climate. "Weather is what you get; climate is what you expect."`,
    createdAt: Date.now(),
  },
];
