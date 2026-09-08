import { KnowledgeItem } from '../../types';

// Batch 21 (weather & climate) gap-fills. Live misses on nexus-4b:
// "what causes wind" -> only katabatic/downhill; "why is it colder at higher
// altitude" -> "cold air is denser, your body works harder"; "how do clouds
// form" -> just listed cloud types; "why does it snow instead of rain" ->
// answered sleet vs freezing rain; "jet stream" -> only flight times;
// "thunder and lightning" -> thunder only, no charge separation; "how do
// hurricanes form" -> naming rules, no mechanism.
export const WEATHER_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-causes-wind',
    title: 'What Causes Wind',
    category: 'Weather',
    keywords: [
      'what causes wind', 'why does wind blow', 'how does wind form', 'what makes wind', 'what is a pressure gradient',
      'why is it windy', 'what is a sea breeze',
    ],
    content: `Wind is air moving from areas of higher air pressure to areas of lower air pressure. Those pressure differences come from the Sun heating the Earth's surface unevenly: warm air is less dense and rises, leaving lower pressure below it, while cooler denser air sinks and creates higher pressure. Air then flows sideways from the high toward the low to even things out — that flow is wind, and the bigger and closer-together the pressure difference (the "pressure gradient"), the stronger the wind. On a large scale this drives global wind belts (trade winds, westerlies); the Earth's rotation bends these flows (the Coriolis effect). On a small scale it explains a sea breeze: on a sunny day land heats faster than the sea, air rises over the land, and cooler air blows in off the water. Katabatic (downhill) winds off glaciers are just one special local case.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-colder-at-altitude',
    title: 'Why It Is Colder at Higher Altitude',
    category: 'Weather',
    keywords: [
      'why is it colder at higher altitude', 'why is it colder on mountains', 'why does temperature drop with height',
      'why is the air cold up high', 'why is it colder higher up', 'lapse rate',
    ],
    content: `Two main reasons, and neither is "cold air is denser." First, the atmosphere is heated mostly from the BOTTOM: sunlight passes through the air without warming it much, is absorbed by the ground and ocean, and the surface then warms the air touching it. So the air is warmest near the ground and cooler the farther you get from that heat source. Second, air pressure drops with height (less air pressing down from above). When a parcel of air rises, the lower pressure lets it expand, and expanding uses up energy, so its temperature falls — this is "adiabatic cooling." On top of that, the thin high-altitude air holds less heat and radiates it away to space easily. In the lowest layer (the troposphere) temperature falls by roughly 6.5 °C per 1000 m on average. (Higher up, in the stratosphere, it actually warms again because the ozone layer absorbs UV.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-clouds-form',
    title: 'How Clouds Form',
    category: 'Weather',
    keywords: [
      'how do clouds form', 'what are clouds made of', 'why do clouds form', 'what is condensation nuclei',
      'what is the dew point', 'why do clouds float', 'how does a cloud form',
    ],
    content: `A cloud is a visible mass of tiny water droplets or ice crystals floating in the air. It forms when a body of air is cooled to its "dew point" — the temperature at which the water vapour it holds becomes saturated and starts to condense. The usual way air cools enough is by rising: warm moist air is lifted (by daytime heating, by flowing up a mountain, by a weather front pushing it up, or by converging winds), the lower pressure higher up lets it expand and cool, and once it hits the dew point the vapour condenses. It condenses onto microscopic floating particles — dust, salt, smoke, pollen — called condensation nuclei; without them it struggles to form droplets. The droplets are so small and light that air currents keep them aloft. Cloud shape depends on how the air rose: puffy cumulus from strong local updrafts, flat layered stratus from gentle broad lifting, wispy high cirrus made of ice crystals.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-snow-vs-rain',
    title: 'Why It Snows Instead of Raining',
    category: 'Weather',
    keywords: [
      'why does it snow instead of rain', 'what makes it snow', 'why is it snow and not rain', 'when does rain turn to snow',
      'what temperature does it snow', 'difference between snow sleet and freezing rain',
    ],
    content: `Most precipitation actually starts as snow or ice high in the cloud, where it's below freezing. What reaches the ground depends on the temperature of the air the flakes fall through: If the whole column from cloud to ground is at or below about 0 °C, the flakes stay frozen and it snows (it can even snow when the ground is a couple of degrees above freezing if the fall is quick). If the flakes pass through a deep layer of above-freezing air, they melt completely and it rains. If they melt in a warm layer and then refreeze in a cold layer near the ground, you get sleet (ice pellets). If they melt and then hit a very thin freezing layer right at the surface, they stay liquid until they touch cold ground and objects, freezing on contact — that's freezing rain (glaze ice). So it's not about the cloud, it's about the temperature profile of the air below it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jet-stream',
    title: 'What the Jet Stream Is',
    category: 'Weather',
    keywords: [
      'what is the jet stream', 'what causes the jet stream', 'how does the jet stream affect weather', 'polar jet stream',
      'why does the jet stream flow west to east', 'what is the jet stream doing to my weather',
    ],
    content: `Jet streams are narrow bands of very fast wind (often 130–200+ km/h) that flow high in the atmosphere, around 9–12 km up (near where airliners cruise). They form along the boundaries between air masses of sharply different temperature — the biggest is the polar jet, where cold polar air meets warmer mid-latitude air. That temperature contrast creates a strong pressure difference aloft, and the Earth's rotation turns the resulting flow so the jet streams generally blow from west to east. They matter for weather because they steer storm systems and areas of high and low pressure along their path, and their waves (troughs and ridges) dipping south or bulging north bring cold snaps or warm spells. Planes flying east ride them to save time and fuel; flying west they avoid them. A "wavier," slower jet stream is associated with more stuck, extreme weather.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-thunder-lightning',
    title: 'What Causes Thunder and Lightning',
    category: 'Weather',
    keywords: [
      'what causes thunder and lightning', 'how does lightning form', 'what is lightning', 'why does thunder happen',
      'how does a thunderstorm make lightning', 'what causes the flash and the bang', 'why do you see lightning before hearing thunder',
    ],
    content: `Lightning starts inside tall storm clouds (cumulonimbus). Strong updrafts and downdrafts fling ice crystals, hail and water droplets past each other; the collisions strip off electric charge, and the lighter positive bits get carried to the top of the cloud while heavier negative charge collects near the base. This builds a huge voltage difference — between cloud base and ground, or between parts of the cloud — until the air can't insulate it any longer and it breaks down into a conducting channel: a lightning bolt carries a massive current in a fraction of a second. That current heats the narrow channel of air to about 30,000 °C — roughly five times the surface of the Sun — almost instantly. The air explodes outward as a shockwave that spreads out and becomes the sound wave we hear as thunder. You see the flash first because light travels far faster than sound; count the seconds to the thunder and divide by 3 for the distance in kilometres (by 5 for miles).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-hurricanes-form',
    title: 'How Hurricanes Form',
    category: 'Weather',
    keywords: [
      'how do hurricanes form', 'what causes a hurricane', 'how does a hurricane develop', 'why do hurricanes need warm water',
      'what is the eye of a hurricane', 'what powers a hurricane', 'hurricane vs typhoon vs cyclone',
    ],
    content: `A hurricane is a large rotating tropical storm powered by heat from warm ocean water. It needs several things at once: sea-surface temperature of at least about 26.5 °C to a good depth; warm, humid air; being far enough from the equator (roughly 5°+ latitude) for the Earth's rotation to start a spin (the Coriolis effect); and little change in wind with height (low wind shear) so the storm isn't torn apart. The process: warm sea water evaporates; the moist air rises and, as it cools, the vapour condenses into clouds and releases latent heat; that heat warms the air more, making it rise faster and lowering the surface pressure; surrounding air rushes in toward the low pressure, is deflected into a spiral by the Coriolis effect, picks up more moisture, and the cycle feeds itself. A clear, calm "eye" forms at the centre, ringed by the strongest winds (the eyewall). Same storm, different names by region: hurricane (Atlantic, NE Pacific), typhoon (NW Pacific), cyclone (Indian Ocean, South Pacific). It weakens rapidly over land or cold water because its fuel source is cut off.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-does-it-rain',
    title: 'Why It Rains',
    category: 'Weather',
    keywords: [
      'why does it rain', 'how does rain form', 'what makes it rain', 'how do raindrops form', 'what is precipitation',
      'why does rain fall from clouds', 'collision coalescence',
    ],
    content: `Rain forms inside a cloud when the tiny droplets or ice crystals grow big and heavy enough that rising air can no longer hold them up. First the cloud has to form: moist air rises, cools to its dew point, and water vapour condenses onto floating particles into cloud droplets far too small to fall. Then they grow two ways. In warm clouds, "collision–coalescence": droplets of different sizes fall at different speeds, bump into each other and merge into ever-bigger drops. In colder clouds, the "Bergeron process": ice crystals grow at the expense of surrounding supercooled water droplets, get heavy, fall, and often melt on the way down into raindrops. A single raindrop is made of roughly a million cloud droplets. If the air below the cloud stays below freezing, it reaches the ground as snow or ice instead.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-monsoon',
    title: 'What a Monsoon Is',
    category: 'Weather',
    keywords: [
      'what is a monsoon', 'what causes a monsoon', 'what is the monsoon season', 'indian monsoon', 'why does the monsoon happen',
      'is a monsoon just heavy rain', 'monsoon meaning',
    ],
    content: `A monsoon is a seasonal REVERSAL of the prevailing winds over a region, which brings a marked wet season and dry season — it's a wind pattern, not just "heavy rain," though the wet phase does bring most of the year's rainfall. It's driven by the different rates at which land and sea heat and cool. In summer the land heats up much faster than the ocean; hot air rises over the land, lowering the pressure, and moisture-laden wind blows in from the cooler ocean, dumping heavy rain (the South Asian summer monsoon over India is the classic example, vital for its agriculture). In winter the land cools faster than the sea, the flow reverses, and dry air blows from land to ocean. Monsoon systems occur in South and East Asia, West Africa, northern Australia, and to a lesser degree the American Southwest. A late or weak monsoon can mean drought and crop failure; an excessive one, flooding.`,
    createdAt: Date.now(),
  },
];
