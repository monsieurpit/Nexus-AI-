import { KnowledgeItem } from '../../types';

/**
 * EARTH_SCIENCE_CONCEPTS_GAPS_2 — batch 210 corrections.
 * Earth-science / geography was mostly well covered. Misses: "latitude vs
 * longitude" came back garbled ("latitude's north-south, running east-west...
 * it's a mess"), "earthquake magnitude vs intensity" was a truncated web dump,
 * "delta vs estuary" and "tornado vs waterspout" were muddled, "compass vs GPS"
 * wrongly said GPS corrects for magnetic declination, and "weather satellites
 * vs radar" only framed both in terms of cyclones.
 */
export const EARTH_SCIENCE_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-earth2-latitude-vs-longitude',
    title: 'Latitude vs longitude',
    category: 'geography',
    keywords: [
      'difference between latitude and longitude', 'latitude vs longitude', 'parallels', 'meridians',
      'equator', 'prime meridian', 'north-south position', 'east-west position', 'degrees minutes seconds',
      'lines run east-west', 'coordinates',
    ],
    content: `Latitude and longitude together give any point on Earth a coordinate.

Latitude measures how far NORTH or SOUTH a place is from the equator. Lines of latitude (parallels) are drawn running east-west around the globe, but the value they give you is a north-south position. They range from 0 degrees at the equator to 90 degrees north (North Pole) and 90 degrees south (South Pole). Parallels are evenly spaced, roughly 111 km apart everywhere, and never meet.

Longitude measures how far EAST or WEST a place is from the Prime Meridian (which runs through Greenwich, London). Lines of longitude (meridians) are drawn running north-south from pole to pole, but the value they give you is an east-west position. They range from 0 degrees at the Prime Meridian to 180 degrees east and 180 degrees west (which meet near the International Date Line). Meridians are farthest apart at the equator (about 111 km per degree) and converge to a single point at each pole.

Memory aid: latitude lines are like the rungs of a ladder (horizontal, tell you how high = north/south); longitude lines are the ladder's rails (vertical, tell you how far around = east/west). By convention a coordinate is written latitude first, then longitude.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-earth2-magnitude-vs-intensity',
    title: 'Earthquake magnitude vs intensity',
    category: 'geography',
    keywords: [
      'difference between earthquake magnitude and intensity', 'magnitude vs intensity', 'Richter scale',
      'moment magnitude', 'Modified Mercalli intensity', 'energy released at the source', 'shaking felt at a place',
      'one number per earthquake', 'varies by location', 'seismograph',
    ],
    content: `Magnitude measures the size of the earthquake at its source — how much energy was released when the fault slipped. It is a single number for the whole event, calculated from seismograph recordings. The old Richter scale and the modern moment magnitude scale (Mw, now standard, better for large quakes) are both logarithmic: each whole number up means about 10 times more ground-shaking amplitude and roughly 32 times more energy released. A magnitude 7 is one number, regardless of where you are.

Intensity measures how strongly the shaking was actually felt and how much damage occurred at a PARTICULAR place. It is not one number — it varies across the affected region, being highest near the epicentre and on soft soil, and fading with distance and on solid bedrock. The Modified Mercalli scale (MMI) runs in Roman numerals from I (not felt) through VII (hard to stand) to XII (total destruction), based on human observations and structural damage.

Short version: one earthquake has one magnitude (energy at the source) but many intensity values (felt effects, place by place). A deep or remote large-magnitude quake can produce low intensity where people live; a shallow moderate quake right under a city can produce high intensity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-earth2-delta-vs-estuary',
    title: 'Delta vs estuary',
    category: 'geography',
    keywords: [
      'difference between a delta and an estuary', 'delta vs estuary', 'river mouth', 'sediment deposition',
      'tidal mixing', 'brackish water', 'distributaries', 'drowned river valley', 'Nile delta',
      'funnel-shaped mouth', 'salt wedge',
    ],
    content: `Both are landforms where a river meets the sea or a lake, but they form under opposite balances of power between the river and the ocean.

A delta forms where the river carries in more sediment than waves, tides and currents can carry away. The sediment piles up at the mouth and the river splits into a branching network of channels (distributaries) that spread across it, building new land seaward in a triangular or fan shape. Examples: the Nile, Mississippi, Ganges-Brahmaputra deltas. Deltas need a heavy sediment load and a relatively calm, low-energy receiving basin.

An estuary is the wide, often funnel-shaped tidal mouth of a river where freshwater and seawater mix, producing brackish water. It forms where the sea is energetic enough (strong tides) to keep sediment flushed out and prevent a delta building, and typically where rising sea level has drowned a former river valley. The water is tidal, the salinity changes with the tide and with depth (a salt wedge), and estuaries are among the most biologically productive habitats on Earth. Examples: the Thames, the St. Lawrence, Chesapeake Bay, San Francisco Bay.

Short version: delta = river wins, sediment builds land in many channels; estuary = tides win, one drowned tidal channel of mixing brackish water. A few large rivers (like the Nile historically) have both a delta and estuarine conditions within it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-earth2-tornado-vs-waterspout',
    title: 'Tornado vs waterspout',
    category: 'geography',
    keywords: [
      'difference between a tornado and a waterspout', 'tornado vs waterspout', 'rotating column of air',
      'over land versus over water', 'fair-weather waterspout', 'tornadic waterspout', 'supercell',
      'mesocyclone', 'landspout', 'Fujita scale',
    ],
    content: `A tornado is a violently rotating column of air in contact with both the ground and a cumulonimbus (thunderstorm) cloud. The strongest ones descend from the rotating updraft (mesocyclone) of a supercell thunderstorm and can reach wind speeds over 300 km/h, rated on the Enhanced Fujita scale.

A waterspout is the same phenomenon — a rotating column of air — occurring over water. There are two kinds:
- Fair-weather waterspouts are the common type. They form from the surface upward under growing cumulus clouds on relatively calm, humid days, are not linked to severe thunderstorms, are usually weak and short-lived, and are similar in origin to a landspout (a weak tornado not born from a supercell mesocyclone).
- Tornadic waterspouts are simply tornadoes that formed over or moved over water, with the same supercell mesocyclone origin and the same destructive potential as land tornadoes.

So the plain distinction is location: tornado over land, waterspout over water. But a fair-weather waterspout and a supercell tornado are quite different beasts in how they form and how dangerous they are; a fair-weather waterspout that moves onshore is officially reclassified as a tornado.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-earth2-compass-vs-gps',
    title: 'Compass vs GPS',
    category: 'geography',
    keywords: [
      'difference between a compass and GPS', 'compass vs GPS', 'magnetic needle', 'satellite positioning',
      'magnetic declination', 'true north versus magnetic north', 'direction versus location',
      'no batteries', 'trilateration', 'GPS does not use magnetism',
    ],
    content: `A magnetic compass shows DIRECTION. Its needle aligns with Earth's magnetic field and points to magnetic north, which is not the same as true (geographic) north — the angle between them is the magnetic declination, and it varies by location and drifts over years, so a careful navigator adjusts for it. A compass needs no power, works anywhere with a view of nothing, but tells you only which way you are facing, not where you are, and it is thrown off by nearby iron, magnets or electrical equipment.

A GPS receiver shows LOCATION. It times signals from several satellites and calculates your position (latitude, longitude, elevation) by trilateration. It does NOT use magnetism at all and has nothing to do with magnetic declination; the tiny relativistic clock corrections it applies are to the satellite atomic clocks, not for any magnetic effect. A GPS unit needs power and a clear view of the sky, and a basic one only knows which way you are heading while you are moving (from successive positions), not while standing still — that is why many GPS devices also contain a separate electronic compass.

Short version: compass = direction, magnetic, no batteries; GPS = position, satellites, needs power. They complement each other.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-earth2-satellite-vs-radar',
    title: 'Weather satellite vs weather radar',
    category: 'geography',
    keywords: [
      'difference between weather satellites and radar', 'satellite vs radar weather', 'passive imaging from orbit',
      'active microwave from the ground', 'cloud cover and temperature', 'precipitation intensity',
      'geostationary', 'Doppler radar', 'reflectivity', 'coverage area',
    ],
    content: `Weather satellites observe from orbit, looking down. They passively sense visible light and infrared radiation, producing images of cloud cover, cloud-top temperature and height, water vapour, snow and ice cover, sea-surface temperature and large-scale storm structure. Geostationary satellites (like the GOES series) stay over one spot and give a continuous big-picture view of whole continents and oceans; polar-orbiting satellites give higher-resolution passes. Satellites are best for the overall pattern — where fronts, hurricanes and cloud systems are and how they are evolving — but they see the tops of clouds, not what is falling underneath.

Weather radar sits on the ground and actively transmits microwave pulses, then measures the energy scattered back by raindrops, snow, hail and even insects. It maps precipitation location and intensity (reflectivity) in fine detail out to a few hundred kilometres from each site. Doppler radar also measures the motion of those particles toward or away from the radar, which reveals wind shear, rotation in a storm (mesocyclones, possible tornadoes) and gust fronts.

Short version: satellites = passive, from space, wide view of clouds and moisture; radar = active, from the ground, detailed view of actual precipitation and its motion. Forecasters use both together.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-earth2-canyon-vs-valley',
    title: 'Canyon vs valley',
    category: 'geography',
    keywords: [
      'difference between a canyon and a valley', 'canyon vs valley', 'gorge', 'steep narrow walls',
      'V-shaped valley', 'U-shaped glacial valley', 'river downcutting', 'arid climate', 'Grand Canyon',
      'not Death Valley', 'ravine',
    ],
    content: `A valley is any elongated low area between higher ground, usually with a river or a former glacier along its floor. Valleys come in a range of shapes: a young river cuts a narrow V-shaped valley, a mature river has a wide flat-floored valley with a floodplain, and a glacier carves a broad U-shaped valley. Slopes can be gentle or steep. (Death Valley is a fault-bounded basin, a graben, not a canyon.)

A canyon (or gorge) is a specific, extreme kind of valley: deep, narrow, with very steep or sheer rock walls, where a river has cut downward much faster than the walls have worn back. Canyons form best where the river has strong erosive power and the surrounding rock is resistant and the climate is dry, so the walls are not softened and widened by rain and vegetation. The Grand Canyon (the Colorado River cutting through the arid Colorado Plateau) is the classic example; a slot canyon is an even narrower version.

So every canyon is a valley, but a canyon specifically means deep plus narrow plus steep-walled, typically in arid, rocky country.`,
    createdAt: Date.now(),
  },
];
