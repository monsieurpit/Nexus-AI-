import { KnowledgeItem } from '../../types';

// Batch 87 (weather & meteorology, deeper — batches 21 and 63 covered the
// basics). nexus-4b misses: "difference between a watch and a warning" had them
// REVERSED (said a watch means "it's actually happening"); "the jet stream",
// "humidity versus dew point", "the polar vortex", and "relative humidity" were
// all cut-off web-dump fragments starting mid-sentence; "what causes hail" said
// updrafts carry ice "into stupidly cold clouds above freezing"; "what is a
// nor'easter" said it's named for winds blowing OUT to sea.
export const METEOROLOGY_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-watch-vs-warning',
    title: 'Weather Watch versus Warning',
    category: 'Weather',
    keywords: [
      'what is the difference between a watch and a warning in weather', 'tornado watch vs tornado warning', 'severe weather watch conditions favorable',
      'warning means take action now', 'weather advisory vs warning', 'watch out it could happen warning it is happening',
    ],
    content: `A WATCH means conditions are favourable for a hazardous weather event — a severe thunderstorm, tornado, winter storm, flash flood — to develop in or near the area over the next several hours. Nothing dangerous is happening yet; the message is "be prepared, review your plan, keep an eye on the sky and on updates." A WARNING means the hazardous event is already happening, is imminent, or has been detected by radar or trained spotters — take protective action immediately (for a tornado warning, go to a small interior room on the lowest floor). An ADVISORY sits below a warning: it covers less severe conditions that will cause inconvenience and could be hazardous if you are careless, such as a few centimetres of snow or patchy freezing drizzle. A useful memory aid: a watch means "watch out, it could happen"; a warning means "it's happening now, act." (Some meteorological agencies outside North America use a coloured system — yellow/amber/red — that maps roughly onto advisory/watch/warning.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jet-stream-detail',
    title: 'What the Jet Stream Is',
    category: 'Weather',
    keywords: [
      'what is the jet stream', 'narrow band of fast wind high in the atmosphere', 'polar jet subtropical jet', 'jet stream steers weather systems',
      'zonal vs meridional jet stream', 'wavy jet stream stuck weather heat wave', 'why are eastbound flights faster',
    ],
    content: `The jet stream is a narrow ribbon of very strong wind — typically 130 to 250-plus km/h — that flows generally from west to east about 9 to 12 km up, near the boundary between the troposphere and the stratosphere (roughly airliner cruising altitude). It forms where there is a sharp horizontal temperature contrast: the "polar jet" runs along the edge of cold polar air, and a weaker "subtropical jet" lies further toward the equator. The jet stream steers surface storm systems and separates warm air to its south from cold air to its north, so its position largely determines a region's day-to-day weather. When it is strong and runs nearly straight west-to-east ("zonal flow"), weather systems move through quickly. When it buckles into large north-south loops ("meridional flow"), those loops can stall for days or weeks, locking a region into a persistent heat wave, cold spell, drought, or rainy pattern. Flights heading east across an ocean ride the jet stream and are noticeably faster than westbound flights fighting it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-humidity-vs-dew-point',
    title: 'Humidity versus Dew Point',
    category: 'Weather',
    keywords: [
      'what is humidity versus dew point', 'dew point absolute measure of moisture', 'relative humidity depends on temperature',
      'why does 50 percent humidity feel different hot vs cold', 'dew point comfort scale muggy oppressive', 'when does dew or fog form',
    ],
    content: `Dew point is the temperature to which the air would have to be cooled for its water vapour to begin condensing. It is a direct, absolute measure of how much moisture is actually in the air right now, and it does not change just because the temperature changes. Relative humidity is a percentage: how much vapour the air currently holds compared to the most it could hold at its present temperature. Because warm air can hold far more vapour than cold air, the same relative-humidity number feels completely different at different temperatures: 50% relative humidity at 32 °C corresponds to a high dew point (around 20 °C) and feels heavy and muggy, while 50% at 5 °C is a low dew point and feels dry and crisp. Meteorologists judge summer comfort by dew point, not relative humidity: below about 13 °C feels comfortable, 16–20 °C feels sticky, and above 21 °C feels oppressive. Dew, frost, and fog form when a surface or the air cools to the dew point.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-relative-humidity-detail',
    title: 'What Relative Humidity Is',
    category: 'Weather',
    keywords: [
      'what is relative humidity', 'percentage of maximum water vapor air can hold', '100 percent relative humidity saturation',
      'why does relative humidity rise at night', 'relative humidity vs actual moisture', 'is relative humidity a good comfort measure',
    ],
    content: `Relative humidity is the amount of water vapour in the air expressed as a percentage of the maximum the air could hold at its current temperature. At 100% the air is saturated and can hold no more, so dew, fog, clouds, or rain begin to form. It is the humidity figure most often quoted, but it can mislead, because the "maximum" it is measured against changes strongly with temperature. Warm air holds much more vapour, so 60% relative humidity on a hot afternoon represents far more actual moisture — and feels far muggier — than 60% on a cold morning. Relative humidity also climbs through the night, often reaching 90–100%, simply because the air is cooling toward its (unchanged) dew point, not because moisture was added; and it drops during the day as the air warms. For judging how humid it actually feels, the dew point is a more reliable guide than relative humidity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-polar-vortex-detail',
    title: 'What the Polar Vortex Is',
    category: 'Weather',
    keywords: [
      'what is the polar vortex', 'ring of cold low pressure air over the pole', 'stratospheric polar vortex winter', 'sudden stratospheric warming',
      'polar vortex weakens splits cold air spills south', 'is the polar vortex the same as a cold snap', 'polar vortex vs jet stream',
    ],
    content: `The polar vortex is a large, persistent area of low pressure and very cold air high in the atmosphere over each of Earth's poles, circulating counterclockwise in the Northern Hemisphere. There is a weaker one in the lower atmosphere and a strong, well-defined one in the stratosphere during winter. It is always there — what makes news is when it is disrupted. When the vortex is strong and tight, it corrals the coldest air near the pole. When it weakens, stretches, or splits into pieces — often triggered by a "sudden stratospheric warming," a rapid rise in stratospheric temperature that reverses the winds — lobes of frigid Arctic air break away and plunge much further south than usual into North America, Europe, or Asia, producing severe multi-day cold outbreaks. The media often loosely calls the resulting cold snap "the polar vortex," but strictly the vortex is the circulation, and it is its breakdown that pushes the cold south, usually alongside a buckled, wavy jet stream.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-causes-hail',
    title: 'What Causes Hail',
    category: 'Weather',
    keywords: [
      'what causes hail', 'thunderstorm updraft carries ice pellet', 'supercooled water freezes in layers hailstone', 'why do hailstones have rings',
      'stronger updraft bigger hail', 'graupel hail growth', 'why is hail common on the great plains',
    ],
    content: `Hail forms inside strong thunderstorms. A tiny ice pellet (graupel) starts in the upper part of the storm and is carried up and down through the cloud by powerful updrafts and downdrafts. Each time it passes through the region of the cloud that is BELOW freezing but still full of supercooled liquid water, that water freezes onto it, adding a layer: clear, dense ice when it accretes slowly and wet, cloudy white ice full of trapped air bubbles when it accretes fast — which is why a sliced hailstone shows concentric rings like an onion. The stronger the storm's updraft, the longer a stone can stay suspended and the more layers it can add before its weight finally overcomes the updraft and it falls. Large, damaging hail (golf-ball size and up) needs a very strong, sustained updraft, which requires a lot of atmospheric instability — the reason hail is so common on the US and Canadian Great Plains in spring and early summer, and rare in mild maritime climates.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-noreaster',
    title: "What a Nor'easter Is",
    category: 'Weather',
    keywords: [
      'what is a noreaster', 'east coast winter storm cold air meets gulf stream', 'noreaster named for northeast winds onshore',
      'noreaster snow coastal flooding blizzard', 'bomb cyclone bombogenesis', 'storm of the century 1993 noreaster',
    ],
    content: `A nor'easter is a large storm that forms or rapidly intensifies just off the eastern coast of the United States, most often between October and April, when cold air pouring off the North American continent meets warm, moist air over the Gulf Stream. Its counterclockwise circulation drives strong winds onto the coast FROM the northeast — coming off the ocean, not blowing out to sea — which is what gives the storm its name (a New England contraction of "northeaster"). Nor'easters bring heavy snow or cold rain, coastal flooding and beach erosion from the piled-up water and big waves, and winds that can reach blizzard or near-hurricane force from the Mid-Atlantic through New England and Atlantic Canada. Notable ones include the March 1993 "Storm of the Century" and the January 2018 storm. A nor'easter whose central pressure drops at least 24 millibars in 24 hours is undergoing "bombogenesis" and is called a "bomb cyclone."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-el-nino-la-nina',
    title: 'What El Niño and La Niña Are',
    category: 'Weather',
    keywords: [
      'what is el nino and la nina', 'enso el nino southern oscillation', 'trade winds pacific sea surface temperature', 'el nino warms la nina cools',
      'el nino la nina global weather impacts', 'how often does el nino happen', 'el nino atlantic hurricane season',
    ],
    content: `El Niño and La Niña are the two opposite phases of a natural climate pattern in the tropical Pacific Ocean called ENSO (the El Niño–Southern Oscillation); in between is a "neutral" state. Normally, trade winds blow east-to-west across the Pacific, piling warm water near Indonesia and letting cold water well up off South America. In EL NIÑO, the trade winds weaken, so warm surface water spreads eastward across the Pacific; in LA NIÑA, the trade winds strengthen and the eastern Pacific becomes unusually cold. These sea-surface temperature shifts move the zones of rising air and rainfall, changing weather far beyond the Pacific. El Niño tends to bring a wetter southern US and drier Indonesia and Australia, more eastern-Pacific hurricanes and fewer Atlantic hurricanes, and a slight boost to global average temperature. La Niña tends to do the reverse. Each phase typically lasts 9–12 months, and the cycle swings back and forth every 2 to 7 years.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tornado-formation',
    title: 'How a Tornado Forms',
    category: 'Weather',
    keywords: [
      'what is a tornado and how does it form', 'supercell mesocyclone tornado', 'wind shear horizontal rotation tilted vertical', 'funnel cloud touches ground',
      'tornado alley conditions', 'why do most tornadoes come from supercells', 'dryline warm moist air cold dry air',
    ],
    content: `A tornado is a violently rotating column of air extending from the base of a thunderstorm to the ground. Most strong tornadoes are born from a "supercell" — a thunderstorm with a persistent rotating updraft called a mesocyclone. The setup: warm, moist air near the surface (in the US, drawn north from the Gulf of Mexico) is capped by cooler, drier air above, storing up instability; strong "wind shear" — wind that changes speed and direction with height — sets a horizontal tube of air spinning like a rolling pin. The thunderstorm's powerful updraft tilts that spinning tube upright, creating the mesocyclone. If the rotation tightens and stretches downward, a funnel cloud forms and can reach the ground as a tornado. This combination is common in the US "Tornado Alley" (Texas, Oklahoma, Kansas, Nebraska) and increasingly the Southeast, especially in spring, though tornadoes occur on every continent except Antarctica. Damage is rated EF0 to EF5 on the Enhanced Fujita scale.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fog-vs-mist',
    title: 'The Difference Between Fog and Mist',
    category: 'Weather',
    keywords: [
      'what is the difference between fog and mist', 'fog visibility less than 1 km', 'mist visibility 1 to 2 km', 'suspended water droplets near the ground',
      'is fog just thick mist', 'radiation fog advection fog', 'when does fog become mist',
    ],
    content: `Fog and mist are the same thing physically — a cloud of tiny water droplets suspended in the air right at ground level, formed when the air cools to its dew point and the vapour condenses. The distinction is by how much they cut visibility, not by droplet size. By the standard meteorological definition, it is FOG when horizontal visibility drops below 1 kilometre (about 1,000 m), and MIST when visibility is reduced but still between roughly 1 and 2 km. So mist is simply the thinner, less obscuring version; as it thickens it becomes fog. Common types by cause: "radiation fog" forms on clear, calm nights as the ground radiates heat and chills the air just above it (typical in valleys before dawn); "advection fog" forms when warm moist air blows over a cold surface, such as sea fog rolling into San Francisco Bay; "upslope fog" forms as air is pushed up a hillside and cools. Anything thicker still that reduces visibility — smoke, dust, pollution — is "haze" rather than mist.`,
    createdAt: Date.now(),
  },
];
