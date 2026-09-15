/**
 * Weather / location intelligence — Open-Meteo (geocoding + forecast), deliberately chosen over
 * OpenWeatherMap or any other keyed provider: genuinely free, no API key, no signup, no rate-limit
 * registration required. Matches this codebase's existing "zero-quota" philosophy (see
 * webSearchEngine.ts's own header comment) rather than adding one more secret Patrick would need
 * to create and set on Railway from his phone.
 *
 * "Nearby places" uses OpenStreetMap's Overpass API for the same reason — real, free, no key —
 * rather than having the LLM invent plausible-sounding business names it has no actual way to
 * verify exist.
 */

const FETCH_TIMEOUT_MS = 8000;

async function fetchJsonWithTimeout(url: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<any | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'NexusAI/1.0 (personal project)' } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export interface GeocodeResult {
  lat: number;
  lon: number;
  name: string;
  country: string;
  admin1?: string;
}

export async function geocodeCity(city: string): Promise<GeocodeResult | null> {
  const trimmed = city.trim();
  if (!trimmed) return null;
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=en&format=json`;
  const data = await fetchJsonWithTimeout(url);
  const hit = data?.results?.[0];
  if (!hit || typeof hit.latitude !== 'number' || typeof hit.longitude !== 'number') return null;
  return {
    lat: hit.latitude,
    lon: hit.longitude,
    name: hit.name,
    country: hit.country || '',
    admin1: hit.admin1,
  };
}

// WMO Weather interpretation codes (the standard Open-Meteo's `current.weather_code` uses) —
// https://open-meteo.com/en/docs, "WMO Weather interpretation codes" table.
const WMO_DESCRIPTIONS: Record<number, string> = {
  0: 'clear sky',
  1: 'mainly clear',
  2: 'partly cloudy',
  3: 'overcast',
  45: 'foggy',
  48: 'foggy with rime frost',
  51: 'light drizzle',
  53: 'moderate drizzle',
  55: 'dense drizzle',
  56: 'freezing drizzle',
  57: 'dense freezing drizzle',
  61: 'light rain',
  63: 'moderate rain',
  65: 'heavy rain',
  66: 'freezing rain',
  67: 'heavy freezing rain',
  71: 'light snow',
  73: 'moderate snow',
  75: 'heavy snow',
  77: 'snow grains',
  80: 'light rain showers',
  81: 'moderate rain showers',
  82: 'violent rain showers',
  85: 'light snow showers',
  86: 'heavy snow showers',
  95: 'a thunderstorm',
  96: 'a thunderstorm with light hail',
  99: 'a thunderstorm with heavy hail',
};

export interface WeatherResult {
  locationLabel: string;
  temperatureC: number;
  feelsLikeC: number;
  condition: string;
  humidity: number;
  windKph: number;
  isDay: boolean;
  timezone: string;
  localTime: string;
}

export async function getWeather(lat: number, lon: number, locationLabel: string): Promise<WeatherResult | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m` +
    `&timezone=auto`;
  const data = await fetchJsonWithTimeout(url);
  const c = data?.current;
  if (!c || typeof c.temperature_2m !== 'number') return null;
  return {
    locationLabel,
    temperatureC: Math.round(c.temperature_2m),
    feelsLikeC: Math.round(c.apparent_temperature),
    condition: WMO_DESCRIPTIONS[c.weather_code] || 'unclear conditions',
    humidity: Math.round(c.relative_humidity_2m),
    // Open-Meteo's default wind_speed unit is already km/h (no wind_speed_unit param passed
    // above), so no conversion needed here.
    windKph: Math.round(c.wind_speed_10m || 0),
    isDay: c.is_day === 1,
    timezone: data.timezone || 'UTC',
    localTime: c.time || '',
  };
}

// --- Intent detection (regex, same style/discipline as the rest of this codebase's solvers) ---

const WEATHER_REGEX =
  /\b(?:what'?s|whats|how'?s|hows)\s+the\s+weather\b|\bweather\s+(?:in|for|at|like)\b|\bweather\s+today\b|\bis\s+it\s+(?:raining|snowing|sunny|cold|hot|windy)\b|\bhow\s+(?:hot|cold)\s+is\s+it\b|\btemperature\s+(?:in|outside|today)\b|\bforecast\s+(?:for|in)\b|\bm[ée]t[ée]o\b|\bquel\s+temps\s+(?:fait[- ]il|il\s+fait)\b|\bfait[- ]il\s+(?:beau|froid|chaud)\b/i;

// Captures a trailing "in/for/at <city>" (EN) or "à/en/pour/dans <city>" (FR) — deliberately
// conservative (stops at common sentence-ending punctuation/conjunctions) so it doesn't swallow
// the rest of a longer sentence. Uses (?:^|\s) rather than \b before the preposition: JS's \b is
// an ASCII-only word-boundary check, so it silently never matches immediately before an accented
// character like "à" (both the preceding space and "à" itself count as "non-word" to \b, so no
// boundary is seen there) — this was found live-testing a French query that should have matched.
const WEATHER_CITY_REGEX =
  /(?:^|\s)(?:in|for|at|à|a|en|pour|dans)\s+([a-zà-ÿ][a-zà-ÿ\s'-]{1,40}?)(?:[?.!,]|$|\s+(?:today|right now|rn|tonight|tomorrow|là|maintenant|aujourd'hui|demain|ce\s+soir))/i;

export function detectWeatherIntent(prompt: string): { city: string | null } | null {
  if (!WEATHER_REGEX.test(prompt)) return null;
  const cityMatch = prompt.match(WEATHER_CITY_REGEX);
  const city = cityMatch ? cityMatch[1].trim() : null;
  return { city };
}

const TIME_REGEX =
  /\bwhat\s+time\s+is\s+it\b|\bwhat'?s\s+the\s+time\b|\bcurrent\s+time\b|\bquelle\s+heure\s+(?:est[- ]il|il\s+est|qu'il\s+est)\b|\bil\s+est\s+quelle\s+heure\b/i;
const TIME_CITY_REGEX = /(?:^|\s)(?:in|for|at|à|a|en|pour|dans)\s+([a-zà-ÿ][a-zà-ÿ\s'-]{1,40}?)(?:[?.!,]|$)/i;

export function detectTimeIntent(prompt: string): { city: string | null } | null {
  if (!TIME_REGEX.test(prompt)) return null;
  const cityMatch = prompt.match(TIME_CITY_REGEX);
  const city = cityMatch ? cityMatch[1].trim() : null;
  return { city };
}

const NEARBY_PLACES_REGEX =
  /\b(?:somewhere|something|places?|spots?|anywhere)\s+(?:to\s+go\s+)?(?:near(?:by)?|close\s+by|around\s+(?:me|here))\b|\bwhat'?s\s+(?:good\s+)?(?:around|near)\s+me\b|\bnear\s+me\b.*\bgo\b|\bsuggest\s+(?:a\s+)?(?:place|spot)\s+(?:near|close)\b|\bpr[èe]s\s+(?:de\s+moi|d'ici)\b|\bautour\s+de\s+moi\b|\b(?:endroit|place)s?\s+(?:proches?|pas\s+loin)\b/i;

export function detectNearbyPlacesIntent(prompt: string): boolean {
  return NEARBY_PLACES_REGEX.test(prompt);
}

// --- Nearby real places, via OpenStreetMap's free Overpass API (no key) ---

export interface NearbyPlace {
  name: string;
  type: string;
  distanceM: number;
}

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const PLACE_TAG_LABELS: Record<string, string> = {
  restaurant: 'restaurant',
  cafe: 'café',
  bar: 'bar',
  pub: 'pub',
  fast_food: 'fast food spot',
  park: 'park',
  cinema: 'cinema',
  museum: 'museum',
  viewpoint: 'viewpoint',
  attraction: 'attraction',
  artwork: 'public art',
};

export async function findNearbyPlaces(lat: number, lon: number, radiusM = 1500): Promise<NearbyPlace[]> {
  // A modest, single-radius query across a handful of common leisure/food/tourism tags — kept
  // small deliberately: Overpass's public instance is a shared, free resource with no key, so a
  // wide/expensive query is both slow and inconsiderate of that.
  const query = `
    [out:json][timeout:6];
    (
      node["amenity"~"^(restaurant|cafe|bar|pub|fast_food|cinema)$"](around:${radiusM},${lat},${lon});
      node["leisure"="park"](around:${radiusM},${lat},${lon});
      node["tourism"~"^(museum|viewpoint|attraction)$"](around:${radiusM},${lat},${lon});
    );
    out center ${25};
  `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const data = await fetchJsonWithTimeout(url, 10000);
  const elements: any[] = Array.isArray(data?.elements) ? data.elements : [];
  const places: NearbyPlace[] = [];
  for (const el of elements) {
    const name = el.tags?.name;
    if (!name) continue; // unnamed POIs are useless to recommend
    const tag = el.tags?.amenity || el.tags?.leisure || el.tags?.tourism;
    const type = PLACE_TAG_LABELS[tag] || tag || 'place';
    const elLat = el.lat ?? el.center?.lat;
    const elLon = el.lon ?? el.center?.lon;
    if (typeof elLat !== 'number' || typeof elLon !== 'number') continue;
    places.push({ name, type, distanceM: Math.round(haversineMeters(lat, lon, elLat, elLon)) });
  }
  places.sort((a, b) => a.distanceM - b.distanceM);
  return places.slice(0, 12);
}
