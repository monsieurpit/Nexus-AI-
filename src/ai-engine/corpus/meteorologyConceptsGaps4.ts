import { KnowledgeItem } from '../../types';

/**
 * METEOROLOGY_CONCEPTS_GAPS_4 — batch 244 corrections.
 * nexus-4b handled most weather/climate contrasts well. Misses:
 * - "weather vs microclimate" said a microclimate is "a tiny version of weather".
 * - "monsoon vs hurricane season" was a web dump (monsoon definition + Katrina).
 * - "weather vs climate variability" and "El Nino vs La Nina" were cut-off dumps.
 * - "flood vs flash flood", "heatwave vs hot day", "renewable vs flow resource"
 *   were cut before the second half.
 * - "solar thermal vs photovoltaic" conflated solar thermal with CSP only.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'meteorology', keywords, content, createdAt: now,
});

export const METEOROLOGY_CONCEPTS_GAPS_4: KnowledgeItem[] = [
  k(
    'kb-gap-met4-weather-vs-microclimate',
    'Weather vs microclimate',
    [
      'difference between weather and a microclimate', 'weather is the state of the atmosphere at a place right now short term hours to days', 'a microclimate is the persistent local climate of a small area that differs from the surrounding region',
      'urban heat island south-facing slope forest floor frost hollow coastal strip', 'microclimate is a climate concept a long-term average pattern not small-scale weather',
    ],
    `WEATHER is the state of the atmosphere at a particular place and moment — temperature, cloud, wind, rain, humidity — and how it changes over hours to a couple of weeks. It is short-term and constantly shifting.

A MICROCLIMATE is a CLIMATE — a persistent, long-term average pattern of conditions — but for a SMALL, localised area whose conditions consistently DIFFER from the wider region around it. It is not "small-scale weather"; it is the typical climate of that spot, sustained over years.

Examples: a city centre is a few degrees warmer than the surrounding countryside (the "urban heat island"); a south-facing slope in the Northern Hemisphere is warmer and drier than a north-facing one; the floor of a dense forest is cooler, shadier, more humid, and less windy than open ground; a sheltered walled garden lets tender plants survive; a low-lying "frost hollow" collects cold air and frosts when nearby higher ground does not; a narrow coastal strip is milder in winter and cooler in summer than a few kilometres inland.

So: weather = now; microclimate = the enduring local character of a small place.`,
  ),
  k(
    'kb-gap-met4-monsoon-vs-hurricane-season',
    'Monsoon vs hurricane season',
    [
      'difference between a monsoon and a hurricane season', 'a monsoon is a seasonal reversal of prevailing winds producing a pronounced wet season and dry season driven by differential heating of land and sea', 'a hurricane season is the annual calendar window when tropical cyclones are most likely to form in a basin',
      'South Asian monsoon West African monsoon', 'Atlantic hurricane season June 1 to November 30 peak September', 'one is a wind and rainfall regime the other is a period of storm risk',
    ],
    `A MONSOON is a large-scale seasonal REVERSAL of the prevailing winds over a region, with a corresponding switch between a wet season and a dry season. In summer the land heats faster than the ocean, drawing in moist air off the sea and producing months of heavy rain; in winter the flow reverses, bringing dry air off the land. The South Asian monsoon is the classic case (roughly June-September wet), and there are West African, East Asian, Australian, and North American monsoon systems, all tied to the seasonal migration of the Intertropical Convergence Zone. It is a WIND-AND-RAINFALL REGIME.

A HURRICANE SEASON is simply the annual PERIOD OF THE CALENDAR during which tropical cyclones (hurricanes, typhoons) are most likely to form in a particular ocean basin, because sea-surface temperatures and atmospheric conditions are favourable then. The Atlantic hurricane season runs 1 June to 30 November, with a sharp peak in early-to-mid September; the Northwest Pacific typhoon season is broader. It is a WINDOW OF STORM RISK, not a weather pattern in itself.

So they are different kinds of thing: a monsoon is a recurring circulation-and-rain system; a hurricane season is a stretch of the year when a certain hazard is elevated. (Some places, like parts of the Philippines or Mexico, experience both.)`,
  ),
  k(
    'kb-gap-met4-climate-variability-vs-change',
    'Weather vs climate variability vs climate change',
    [
      'difference between weather and climate variability', 'weather is the atmosphere now over hours to days', 'climate variability is the natural fluctuation of climate around its long-term average over months years and decades ENSO a cold winter a wet decade',
      'climate change is a sustained directional shift in the long-term average', 'variability is the noise change is the trend', 'attribution',
    ],
    `Three timescales, often confused:

WEATHER is the day-to-day state of the atmosphere — what is happening now and over the next hours to about two weeks (the limit of useful forecasts).

CLIMATE VARIABILITY is the natural, roughly cyclical or irregular FLUCTUATION of the climate system AROUND its long-term average, on timescales of months to decades. A single unusually cold winter, a run of wet years, a strong El Nino warming a year globally, the North Atlantic Oscillation flipping a season's storm track — these are variability. The average and the range stay the same over the long run; the system just wobbles within it.

CLIMATE CHANGE is a SUSTAINED, DIRECTIONAL SHIFT in the long-term average state itself — the mean moving, the extremes shifting with it, over decades and longer. Present-day warming from rising greenhouse gases is climate change.

A useful framing: variability is the NOISE, change is the TREND. Any single hot summer is weather plus variability; you detect climate change by looking at 30-year averages, and "attribution science" estimates how much a given extreme event was made more likely by the underlying trend.`,
  ),
  k(
    'kb-gap-met4-elnino-vs-lanina',
    'El Nino vs La Nina',
    [
      'difference between El Nino and La Nina', 'two opposite phases of ENSO the El Nino Southern Oscillation in the tropical Pacific with a neutral state in between', 'El Nino trade winds weaken warm surface water spreads east central Pacific warms tends to raise global temperature',
      'La Nina trade winds strengthen cold water upwells in the eastern Pacific tends to lower global temperature more Atlantic hurricanes', 'they flip rainfall patterns drought and flood around the Pacific rim', 'each lasts about 9 to 12 months',
    ],
    `El Nino and La Nina are the two OPPOSITE phases of a natural climate cycle in the tropical Pacific Ocean called ENSO (the El Nino-Southern Oscillation); between them is a "neutral" state. Each phase typically lasts about 9-12 months and they recur every 2-7 years.

EL NINO ("the boy"): the equatorial TRADE WINDS WEAKEN, so warm surface water that is normally piled up in the western Pacific spreads EASTWARD, and the central and eastern Pacific become unusually WARM. Effects: a boost to GLOBAL average temperature for that year; heavy rain and flooding on the west coast of South America and the southern US; drought and fire risk in Indonesia, eastern Australia, and parts of India and southern Africa; and generally FEWER Atlantic hurricanes (more wind shear).

LA NINA ("the girl"): the trade winds STRENGTHEN, pushing warm water further west and drawing cold deep water up to the surface in the eastern Pacific, which becomes unusually COOL. Effects are broadly the mirror image: a slight DAMPING of global temperature; drought in the southern US and along western South America; heavier rain and flood risk in Indonesia, eastern Australia, and southern Africa; and MORE Atlantic hurricane activity.

So the single lever is the trade winds and where the warm Pacific water sits; everything else follows from that.`,
  ),
  k(
    'kb-gap-met4-flood-vs-flash-flood',
    'Flood vs flash flood',
    [
      'difference between a flood and a flash flood', 'a flood is any overflow of water onto normally dry land often developing over hours to days river flooding from prolonged rain or snowmelt', 'a flash flood is a rapid sudden flood within minutes to about six hours of the causing event intense rainfall dam or levee failure ice jam release',
      'flash floods are localised fast-moving and give little warning canyons urban streets dry creek beds', 'both can be deadly flash floods especially so',
    ],
    `A FLOOD is any overflow of water submerging land that is normally dry. The common type is RIVER (fluvial) flooding: prolonged or heavy rain, or snowmelt, fills a river beyond its banks and the water spreads slowly across the floodplain over HOURS TO DAYS, often with warning as forecasters watch upstream levels. Other types include coastal storm surge and slow "pluvial" ponding of rain on flat ground.

A FLASH FLOOD is a specific, dangerous subset: a RAPID flood that develops within MINUTES to about SIX HOURS of the triggering event. Causes: an intense downpour (often from a slow-moving or repeating thunderstorm), a dam or levee failure, a sudden release from an ice jam, or rain falling on ground that cannot absorb it (baked desert soil, burned hillsides, paved city streets). Flash floods are typically LOCALISED, carry fast-moving, debris-laden water, and strike with little or no warning — in canyons and washes, at low road crossings, and in urban areas. Most flood deaths, especially those involving vehicles swept away, are from flash floods.

Short version: a flood is water over land; a flash flood is a flood that arrives suddenly and moves fast.`,
  ),
  k(
    'kb-gap-met4-heatwave-vs-hot-day',
    'Heatwave vs a hot day',
    [
      'difference between a heatwave and a hot day', 'a hot day is a single day above a temperature threshold', 'a heatwave is a prolonged period usually three or more consecutive days of excessive heat often defined relative to the local climate above the 90th or 95th percentile',
      'heatwaves often stay hot overnight and can be humid', 'defined relative to what is normal for that place and season', 'health impacts excess deaths',
    ],
    `A HOT DAY is just one day on which the temperature exceeds some threshold — whether an absolute number (say 30 C) or simply "warmer than usual for the time of year". It is a single data point.

A HEATWAVE is a PROLONGED spell of excessively hot weather — usually defined as at least THREE consecutive days (definitions vary by country and agency) — and it is normally judged RELATIVE TO THE LOCAL CLIMATE, e.g. daytime highs above the 90th or 95th percentile for that location and season. Extra features that make a heatwave dangerous: the heat often persists OVERNIGHT (little cooling, so bodies and buildings never recover), it is frequently HUMID, and it is usually caused by a stalled high-pressure system ("heat dome") that also brings clear skies and light winds.

The consequences differ in kind, not just degree: a hot day is uncomfortable; a heatwave causes measurable EXCESS DEATHS (heatstroke, cardiovascular strain, especially in the elderly and unhoused), strains the power grid, buckles roads and rails, and worsens wildfire and drought risk. 25 C in Scotland can qualify as a heatwave; 25 C in Dubai would be a cool day.`,
  ),
  k(
    'kb-gap-met4-renewable-vs-flow-resource',
    'Renewable resource vs flow resource',
    [
      'difference between a renewable resource and a flow resource', 'a flow or continuous resource is always available regardless of use cannot be depleted or stockpiled solar wind tides running water geothermal', 'a renewable stock resource replenishes over a human timescale but CAN be depleted if used faster than it regenerates forests fish soil groundwater',
      'flow resources are a subset you cannot overuse', 'stock-renewables can be exhausted through mismanagement overfishing deforestation aquifer depletion',
    ],
    `Both are contrasted with non-renewable resources (fossil fuels, most minerals) that took millions of years to form and are effectively finite. The difference between the two "renewable" kinds is whether human use can exhaust them.

A FLOW RESOURCE (also "continuous" or "perpetual") is one that is CONSTANTLY AVAILABLE whether or not we use it, and CANNOT be depleted or stockpiled — you either capture the flow now or lose it. Examples: solar radiation, wind, tides, wave energy, running water in a river, geothermal heat. No amount of use "runs them down".

A RENEWABLE (STOCK) RESOURCE regenerates naturally on a human timescale but exists as a STANDING STOCK that CAN be drawn down — and destroyed — if it is used FASTER than it replenishes. Examples: forests (deforestation), fish stocks (overfishing to collapse), fertile soil (erosion faster than formation), and groundwater in slowly-recharging aquifers (mining it dry). These need MANAGEMENT to stay renewable.

So all flow resources are renewable, but not all renewable resources are flow resources — and the ones that are not can be lost through overuse.`,
  ),
  k(
    'kb-gap-met4-solar-thermal-vs-pv',
    'Solar thermal vs photovoltaic',
    [
      'difference between solar thermal and photovoltaic', 'solar thermal captures the suns heat using collectors for hot water space heating or to drive a turbine in concentrated solar power', 'photovoltaic PV converts sunlight directly into electricity in semiconductor cells no moving parts',
      'solar thermal produces heat first PV produces electricity directly', 'domestic solar water heaters flat plate and evacuated tube versus rooftop PV panels', 'CSP uses mirrors PV about 20 to 23 percent efficient',
    ],
    `Both use sunlight, but they capture different things.

SOLAR THERMAL captures the sun's HEAT. Sunlight warms a fluid (water, oil, air, molten salt) in a collector. At domestic scale, flat-plate or evacuated-tube collectors on a roof heat water for taps and heating — no electricity involved, just hot water. At utility scale, CONCENTRATED SOLAR POWER (CSP) uses fields of mirrors to focus sunlight onto a receiver, heating a fluid to hundreds of degrees to raise steam and drive a turbine-generator — and the hot fluid can be stored, so CSP can keep generating after sunset.

PHOTOVOLTAIC (PV) converts sunlight DIRECTLY into ELECTRICITY. Photons striking a semiconductor cell (usually silicon) knock electrons loose, creating a current — no heat step, no moving parts, no working fluid. Rooftop panels and solar farms are PV. Commercial modules are roughly 20-23% efficient.

Short version: solar thermal makes HEAT (for water/heating, or via CSP for power with built-in storage); PV makes ELECTRICITY directly and is what nearly all small-scale and most new large-scale solar now uses.`,
  ),
  k(
    'kb-gap-met4-greenhouse-effect-vs-warming',
    'Greenhouse effect vs global warming',
    [
      'difference between the greenhouse effect and global warming', 'the greenhouse effect is the natural process by which certain atmospheric gases absorb and re-emit infrared radiation keeping Earths surface about 33 degrees warmer than it would be', 'global warming is the recent human-caused intensification of that effect from burning fossil fuels and land-use change raising the global average temperature',
      'water vapour CO2 methane nitrous oxide', 'about 1.3 degrees of warming since pre-industrial times', 'the effect is natural and essential the warming is the problem',
    ],
    `The GREENHOUSE EFFECT is a NATURAL and essential process. The Sun warms Earth's surface, which radiates heat back out as infrared. Certain gases in the atmosphere — water vapour, carbon dioxide, methane, nitrous oxide — absorb some of that outgoing infrared and re-emit it in all directions, including back down. This keeps the surface roughly 33 C warmer than it would be with no atmosphere; without it, Earth's average temperature would be about -18 C and largely frozen.

GLOBAL WARMING is the recent, HUMAN-CAUSED INTENSIFICATION of that effect. Burning fossil fuels, deforestation, cement-making, and agriculture have raised atmospheric CO2 from about 280 ppm before the Industrial Revolution to over 420 ppm today, along with more methane and nitrous oxide. The thicker "blanket" traps more heat, and the global average surface temperature has risen about 1.3 C since pre-industrial times, with continued rise projected (commonly cited scenarios range from roughly 1.5 C to 3 C or more by 2100 depending on future emissions).

So: the greenhouse effect is the mechanism (and mostly a good thing); global warming is what happens when humans crank that mechanism up beyond its natural level. Global warming is one part of the broader "climate change".`,
  ),
  k(
    'kb-gap-met4-cyclone-vs-anticyclone',
    'Cyclone vs anticyclone',
    [
      'difference between a cyclone and an anticyclone', 'a cyclone is a low-pressure system air spirals inward and rises causing cloud rain and unsettled windy weather', 'an anticyclone is a high-pressure system air sinks and spirals outward causing clear calm settled weather',
      'rotation depends on hemisphere cyclone anticlockwise in the northern hemisphere', 'not the same as a tropical cyclone though a hurricane is an intense cyclone',
    ],
    `A CYCLONE is a region of LOW atmospheric pressure. Surface air spirals INWARD toward the centre and then RISES; as it rises it cools, water vapour condenses, and cloud and precipitation form. So cyclones bring UNSETTLED weather — cloud, rain, and often strong, gusty winds (the tighter the pressure gradient, the stronger the wind). In the Northern Hemisphere the inflow rotates ANTICLOCKWISE (clockwise in the Southern).

An ANTICYCLONE is a region of HIGH pressure. Air aloft converges and SINKS toward the surface, then spirals OUTWARD. Sinking air warms and dries, so cloud tends to evaporate — anticyclones bring SETTLED weather: clear skies, light winds, hot days in summer, and cold nights, frost, or fog in winter (because clear skies let heat escape at night). Rotation is the reverse of a cyclone: clockwise in the Northern Hemisphere.

Note "cyclone" in this general sense (any low) is different from a "tropical cyclone" (a hurricane/typhoon), though a hurricane is a particularly intense, warm-core cyclone.`,
  ),
  k(
    'kb-gap-met4-ozone-layer-vs-hole',
    'Ozone layer vs ozone hole',
    [
      'difference between the ozone layer and the ozone hole', 'the ozone layer is a region of the stratosphere about 15 to 35 km up with a relatively high concentration of ozone that absorbs most of the Suns harmful ultraviolet', 'the ozone hole is a severe seasonal thinning of that layer over Antarctica each spring caused by chlorine and bromine from CFCs',
      'the Montreal Protocol 1987 phased out CFCs the hole is slowly recovering', 'not a literal hole a region of very low ozone', 'distinct from greenhouse warming',
    ],
    `The OZONE LAYER is a permanent feature: a band within the STRATOSPHERE, roughly 15-35 km up, where ozone (O3) is relatively concentrated (still only a few parts per million). It matters because it ABSORBS most of the Sun's harmful medium- and short-wavelength ULTRAVIOLET radiation, shielding life at the surface from UV that causes skin cancer, cataracts, and crop damage.

The OZONE HOLE is not a literal hole and not a separate thing — it is a severe, SEASONAL THINNING of that same layer, occurring over ANTARCTICA every Southern-Hemisphere spring (September-November). It is caused by chlorine and bromine released from human-made CFCs (once used in refrigerants, aerosols, and foams), which destroy ozone catalytically in the extreme cold of the polar stratosphere, on the surfaces of polar stratospheric clouds. A smaller, less regular thinning also appears over the Arctic.

The 1987 MONTREAL PROTOCOL phased out CFCs worldwide — one of the most successful environmental treaties — and the ozone layer is now slowly recovering, with the Antarctic hole expected to close around mid-century. (This is a distinct problem from greenhouse-gas global warming, though a few chemicals contribute to both.)`,
  ),
];
