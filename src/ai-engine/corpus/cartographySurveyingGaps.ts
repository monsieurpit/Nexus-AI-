import { KnowledgeItem } from '../../types';

// Batch 313 corpus fixes — cartography/surveying "what's the difference between X and Y" topics.
// Zero prior corpus coverage of this domain, 17/25 misses — another brutal zero-coverage domain
// like watches/military/numismatics before it. Two wrong-domain hallucinations (transit answered
// as public transportation instead of the surveying instrument; chain surveyor answered as the
// Fujita tornado-damage scale; "datum" answered as generic raw-data-point instead of the geodetic
// reference surface), a factual error (isogonic line called a rainfall/isohyet line — it's actually
// equal magnetic declination), several Wikipedia-dump non-answers that never actually contrasted
// the two terms (geodesy/cartography, plane/geodetic surveying, theodolite/total station,
// azimuth/bearing, remote sensing/photogrammetry), and a couple of cut-off/dodged answers
// (topo/thematic map, benchmark/triangulation, benchmark elevation/orthometric height, WGS84/NAD83).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Trivia',
  keywords,
  content,
  createdAt: now,
});

export const CARTOGRAPHY_SURVEYING_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-cartography-projection-vs-datum',
    'Map projection vs map datum',
    ['map projection', 'map datum', 'difference map projection datum'],
    "A map projection is the mathematical method used to flatten the Earth's curved surface onto a flat map — every projection (Mercator, Robinson, etc.) distorts something (area, shape, distance, or direction) to make that transformation, and different projections trade off which distortion they accept. A datum is a completely different thing: it's the reference model of the Earth's shape and size (a specific mathematical ellipsoid, like WGS84's) plus a defined origin point, used to assign accurate latitude/longitude/elevation coordinates to real locations in the first place, before any projection even happens. Datum is NOT about direction or 'what counts as true north' — it's the underlying reference surface coordinates are measured against. The key difference: a map projection is how you flatten a globe onto a flat map (and what shape/area/distance distortion you accept doing it), while a datum is the reference ellipsoid and origin point used to define accurate coordinates on the Earth in the first place — projections come after a datum, not instead of one.",
  ),
  k(
    'kb-gap-cartography-declination-vs-convergence',
    'Magnetic declination vs grid convergence',
    ['magnetic declination', 'grid convergence', 'difference magnetic declination grid convergence'],
    "Magnetic declination is the angle between TRUE north (the geographic North Pole) and MAGNETIC north (where a compass needle actually points, which drifts over time due to Earth's shifting magnetic field) — it's the correction you apply to a compass reading to get a true bearing. Grid convergence is a totally different angle: it's the difference between TRUE north and GRID north (the direction 'up' on a map's straight grid lines), which exists because flattening a curved Earth onto a flat projected grid inevitably makes the grid's north-south lines diverge slightly from true north-south meridians except along the projection's central line. Surveyors and land navigators often combine both into a single 'grid-magnetic angle' to convert directly between a compass bearing and a map grid bearing. The key difference: magnetic declination corrects for the gap between true north and where a compass actually points, while grid convergence corrects for the gap between true north and a map's straight grid lines — both are separate corrections that get combined when converting a compass bearing to a map grid bearing.",
  ),
  k(
    'kb-gap-cartography-geodesy-vs-cartography',
    'Geodesy vs cartography',
    ['geodesy', 'cartography', 'difference geodesy cartography'],
    "Geodesy is the science of precisely MEASURING the Earth — its exact shape, size, gravity field, and the precise coordinates of points on its surface, using satellites, gravity models, and reference ellipsoids/datums like WGS84. Cartography is the art and science of DESIGNING and PRODUCING maps — taking geographic data (much of it supplied by geodesy) and deciding how to project, symbolize, generalize, and visually present it so it's readable and useful. In short, geodesy figures out exactly where things are on the Earth with scientific precision, while cartography takes that positional data and turns it into an actual map people can read. The key difference: geodesy is the science of precisely measuring the Earth's shape and the exact location of points on it, while cartography is the craft of designing and drawing maps that represent that geographic data visually — cartography relies on geodesy's measurements as its raw input.",
  ),
  k(
    'kb-gap-cartography-topographic-vs-thematic-map',
    'Topographic map vs thematic map',
    ['topographic map', 'thematic map', 'difference topographic thematic map'],
    "A topographic map's main job is showing the physical shape of the land — using contour lines to depict elevation, hills, valleys, and terrain, plus general reference features like roads, rivers, and buildings, giving a broad, all-purpose picture of a place's physical geography. A thematic map instead focuses on ONE specific topic or dataset layered over a simplified base map — for example a map showing population density, election results by county, average rainfall, or disease outbreak locations, using color, shading, or symbols to highlight that one theme rather than trying to represent terrain or general geography. The key difference: a topographic map shows the physical shape and features of the land (elevation, terrain, general geography) for general reference, while a thematic map is built around one specific subject or dataset (like population, weather, or election results) displayed over a simplified base map.",
  ),
  k(
    'kb-gap-cartography-contour-lines-vs-hachures',
    'Contour lines vs hachures',
    ['contour lines', 'hachures', 'difference contour lines hachures'],
    "Contour lines are continuous lines on a map connecting all points of exactly equal elevation — reading the spacing and shape of these lines tells you the slope and shape of the terrain, and they became the standard way to show relief because they're precise and let you read exact heights. Hachures are an older, different technique for showing relief: short parallel lines drawn directly on the slope itself, running in the direction water would flow downhill, with the lines drawn thicker/darker and closer together on steep slopes and thinner/lighter and more spread out on gentle slopes — they give a quick visual impression of steepness and shape but don't let you read a precise elevation the way a contour line does. Hachures are NOT tick marks attached to contour lines — that's a different, narrower feature (short perpendicular 'tick' marks used specifically on depression contours to show a hollow rather than a hill). The key difference: contour lines are precise, connect points of exactly equal elevation, and let you read exact heights, while hachures are short slope-direction lines drawn to give a quick visual sense of steepness without precise elevation values — hachures largely predate and were replaced by contour lines on modern maps.",
  ),
  k(
    'kb-gap-cartography-benchmark-vs-triangulation-station',
    'Benchmark vs triangulation station',
    ['benchmark surveying', 'triangulation station', 'difference benchmark triangulation station'],
    "In surveying (not finance — a survey benchmark has nothing to do with interest rates), a benchmark is a permanently marked point of precisely known ELEVATION, usually a metal disk set into rock, a building foundation, or a concrete post, used as a fixed vertical reference that surveyors can tie new elevation measurements back to. A triangulation station (also called a trig point or trig station) is instead a fixed point of precisely known HORIZONTAL position (latitude/longitude), historically placed on hilltops or other high, intervisible locations so surveyors could measure angles between stations to calculate positions across a wide area using triangulation. Some markers actually serve both purposes at once, but the concepts are distinct: one anchors height, the other anchors horizontal location. The key difference: a benchmark is a fixed reference point of known elevation (a vertical reference), while a triangulation station is a fixed reference point of known horizontal position used to calculate other locations by measuring angles between visible stations.",
  ),
  k(
    'kb-gap-cartography-plane-vs-geodetic-surveying',
    'Plane surveying vs geodetic surveying',
    ['plane surveying', 'geodetic surveying', 'difference plane geodetic surveying'],
    "Plane surveying treats the Earth's surface as flat, ignoring its curvature — this is accurate enough and much simpler to calculate for smaller areas (typically under about 100 square miles/250 square km), so it's the standard approach for most everyday surveys like construction sites, property boundaries, and road layouts. Geodetic surveying instead accounts for the Earth's actual curvature and shape, using spherical/ellipsoidal geometry and precise datums — it's necessary for surveys covering large areas (like mapping an entire country, state, or long-distance infrastructure), where ignoring curvature would introduce meaningful errors over the distance involved. The key difference: plane surveying assumes a flat Earth and is used for smaller-area, everyday surveys where that assumption is accurate enough, while geodetic surveying accounts for the Earth's actual curvature and is used for large-area surveys where curvature would otherwise cause significant error.",
  ),
  k(
    'kb-gap-cartography-theodolite-vs-total-station',
    'Theodolite vs total station',
    ['theodolite', 'total station', 'difference theodolite total station'],
    "A theodolite is an optical surveying instrument that measures horizontal and vertical ANGLES only — you sight a target through its telescope and read off precise angle values, but it doesn't measure distance on its own (distance has to come from a separate method, like a tape or a separate electronic distance meter attached to it). A total station is essentially a theodolite's modern successor: it combines the same precise angle-measuring optics with a built-in electronic distance meter (using an infrared or laser signal reflected off a prism or the target surface) and an onboard computer, so it measures angles AND distances simultaneously and can calculate and store exact 3D coordinates automatically. The key difference: a theodolite measures only angles and needs a separate instrument for distance, while a total station is an electronic instrument that measures both angles and distances at once and computes coordinates automatically, making it far faster and more capable for modern surveying.",
  ),
  k(
    'kb-gap-cartography-transit-vs-theodolite',
    'Transit vs theodolite (surveying instruments)',
    ['surveying transit', 'transit instrument', 'difference transit theodolite'],
    "In surveying (not public transportation — a surveyor's transit has nothing to do with buses or trains), a transit is an older type of surveying instrument used to measure horizontal and vertical angles, distinguished by its telescope being able to 'transit' — flip all the way over (180°) on its horizontal axis — which let surveyors quickly reverse sight lines to check and cancel out instrument errors. A theodolite is the more precise, generally more modern instrument for the same basic job (measuring angles), typically using finer optical or glass-circle graduations for much higher angular precision than a transit's simpler graduated metal circles, and eventually largely replacing transits in professional use. The key difference: a transit is an older surveying instrument whose defining feature is a telescope that flips fully over to reverse the sight line, while a theodolite is a more precise angle-measuring instrument (usually with finer optical graduations) that gradually superseded the transit in professional surveying.",
  ),
  k(
    'kb-gap-cartography-datum-vs-coordinate-system',
    'Geodetic datum vs coordinate system',
    ['geodetic datum', 'coordinate system', 'difference datum coordinate system'],
    "A geodetic datum is NOT just a raw data point or measurement — in surveying/GIS it's a reference framework consisting of a mathematical model of the Earth's shape (a reference ellipsoid, like the one WGS84 uses) anchored to a specific origin point, which together define what 'zero' and 'true position' mean for measuring locations on Earth. A coordinate system is the actual numbering scheme built on top of that datum to express a location as specific numbers — like latitude/longitude in degrees, or UTM's easting/northing in meters — which lets you pinpoint any location using that framework. The key difference: a datum is the underlying reference model of the Earth's shape and origin point that defines what 'accurate position' means, while a coordinate system is the actual numeric scheme (like lat/long or UTM) used to express specific locations within that datum's framework — you need a datum before a coordinate system's numbers mean anything precise.",
  ),
  k(
    'kb-gap-cartography-wgs84-vs-nad83',
    'WGS84 vs NAD83',
    ['WGS84', 'NAD83', 'difference WGS84 NAD83'],
    "WGS84 (World Geodetic System 1984) is a global geodetic datum, geocentric (centered on the Earth's actual center of mass), maintained and used worldwide — it's the reference datum GPS itself uses, making it the default standard for most modern satellite-based positioning and global mapping. NAD83 (North American Datum 1983) is a regional datum specifically fitted to best match North America, still actively used today (not obsolete) as the official datum for most U.S. and Canadian government mapping, surveying, and legal land records — it was originally very close to WGS84 at creation but the two have drifted apart by roughly a couple meters over time because WGS84 is tied to the whole Earth's center of mass while NAD83 is tied to the fixed, slowly-moving North American tectonic plate. The key difference: WGS84 is the global datum centered on the Earth's overall mass and used by GPS worldwide, while NAD83 is a regional datum fixed to the North American tectonic plate and still the official standard for U.S./Canadian government surveying and land records — neither one is simply 'newer' or 'obsolete,' they serve different scopes and have gradually diverged.",
  ),
  k(
    'kb-gap-cartography-chain-survey-vs-total-station-survey',
    'Chain surveying vs total station survey',
    ['chain surveying', 'total station survey', 'difference chain surveying total station'],
    "Chain surveying (not the Fujita tornado-damage scale — this is a land-measurement method) is one of the oldest and simplest surveying techniques: it measures distances directly along the ground using a physical measuring chain or tape, and locates points using only linear (distance) measurements between reference lines, with no angle-measuring instrument involved — cheap and simple, but limited to small, relatively flat, obstruction-free areas and slower/less precise over larger sites. A total station survey uses a modern electronic instrument that measures both angles and distances simultaneously via a laser/infrared signal reflected off a prism, then automatically calculates and stores precise 3D coordinates — far faster, more accurate, and usable across large or complex terrain that plain chain measurement can't handle well. The key difference: chain surveying uses only physical distance measurements along the ground with a chain or tape and no angles, while a total station survey uses an electronic instrument that measures angles and distances together and computes coordinates automatically, making it dramatically faster and more capable for larger or more complex sites.",
  ),
  k(
    'kb-gap-cartography-azimuth-vs-bearing',
    'Azimuth vs bearing',
    ['azimuth', 'bearing direction', 'difference azimuth bearing'],
    "An azimuth is a direction expressed as a single angle measured clockwise from 0° to 360°, almost always starting from true north (so due east is 90°, due south is 180°, due west is 270°) — it's a full-circle system, giving one unambiguous number for any direction. A bearing instead is expressed relative to the nearest of north or south, as an angle up to 90° toward east or west, written like 'N45°E' (meaning 45° east of due north) or 'S30°W' (30° west of due south) — it's a quadrant-based system rather than a single 0-360 number. Both describe the exact same directions, they're just two different notations for expressing them — surveyors and navigators convert between the two depending on the convention their equipment or tradition uses. The key difference: an azimuth is a single angle measured clockwise 0-360° from true north, while a bearing is expressed as an angle up to 90° within a quadrant relative to north or south (like N45°E) — different notations for the same underlying direction.",
  ),
  k(
    'kb-gap-cartography-benchmark-elevation-vs-orthometric-height',
    'Benchmark elevation vs orthometric height',
    ['benchmark elevation', 'orthometric height', 'difference benchmark elevation orthometric height'],
    "A benchmark elevation is simply the specific, officially recorded height value assigned to one particular fixed benchmark marker, used as a known reference point that other elevation measurements in an area get tied back to — it's a single, practical number for one physical spot. Orthometric height is the more general, technical DEFINITION of what 'elevation above sea level' actually means: it's height measured along the curved plumb line from a point down to the geoid (a model of where mean sea level would be if extended under all land, accounting for gravity variations), rather than height measured against a simplified mathematical ellipsoid (which is a different value called ellipsoidal height, the kind raw GPS naturally gives you). Most everyday elevations printed on maps and benchmarks — including 'height above sea level' — are actually orthometric heights. The key difference: a benchmark elevation is the specific recorded height value at one physical reference marker, while orthometric height is the general technical definition of 'sea-level elevation' itself — measured against the geoid rather than a simplified ellipsoid — and it's the type of height value that most benchmark elevations actually represent.",
  ),
  k(
    'kb-gap-cartography-remote-sensing-vs-aerial-photogrammetry',
    'Remote sensing vs aerial photogrammetry',
    ['remote sensing', 'aerial photogrammetry', 'difference remote sensing photogrammetry'],
    "Remote sensing is the broad category of gathering information about the Earth's surface from a distance, without physical contact — using satellites or aircraft equipped with sensors like cameras, radar, or infrared/thermal detectors, often to study things like vegetation health, temperature, land cover, or weather. Aerial photogrammetry is a specific technique WITHIN remote sensing: it uses overlapping aerial photographs (taken from planes or drones) and precise geometric/mathematical analysis of those overlaps to calculate exact real-world measurements, distances, and 3D shapes of the ground and objects on it — it's specifically about turning photos into precise measurements and maps, not just imagery or general environmental sensing. The key difference: remote sensing is the broad practice of gathering surface data from a distance using any kind of sensor, while aerial photogrammetry is a specific method within it that uses overlapping aerial photos and geometric analysis to extract precise measurements and 3D shapes from those images.",
  ),
  k(
    'kb-gap-cartography-isogonic-vs-contour-line',
    'Isogonic line vs contour line',
    ['isogonic line', 'contour line', 'difference isogonic contour line'],
    "An isogonic line connects points of EQUAL MAGNETIC DECLINATION — the same angular difference between true north and magnetic north — used on navigation and magnetic charts to show how much compass correction is needed in different regions (it is NOT a rainfall line; equal-rainfall lines are called isohyets, a completely different kind of isoline). A contour line connects points of equal ELEVATION above a reference level like sea level, used on topographic maps to show the shape of the land's terrain. Both are 'isolines' (lines joining points of equal value), which is the only thing they have in common — the values they represent are completely unrelated. The key difference: an isogonic line connects points of equal magnetic declination (a navigation/compass-correction concept), while a contour line connects points of equal elevation (a terrain/topography concept) — isogonic lines are unrelated to rainfall, which is instead shown by isohyets.",
  ),
];
