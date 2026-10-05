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
  const lookup = async (name: string) =>
    (await fetchJsonWithTimeout(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json`))?.results?.[0];
  // "quebec city" / "mexico city": the geocoder knows "Québec" / "Mexico City" — retry without the "city" word
  // (2026-10-05: the weather in "quebec city" came back "couldn't find that city").
  let hit = await lookup(trimmed);
  if (!hit && /\s+city$/i.test(trimmed)) hit = await lookup(trimmed.replace(/\s+city$/i, ''));
  // Still nothing: drop trailing words one by one ("quebec city like" -> "quebec city" -> "quebec"), so a filler word
  // stuck to the name can't make a real city "not found".
  let words = trimmed.split(/\s+/);
  while (!hit && words.length > 1) {
    words = words.slice(0, -1);
    const name = words.join(' ');
    hit = (await lookup(name)) || (/\s+city$/i.test(name) ? await lookup(name.replace(/\s+city$/i, '')) : null);
  }
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
  // 7-day forecast (2026-10-05: "is it gonna rain tomorrow", "will it snow this weekend" had no data to answer from).
  daily: DailyForecast[];
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD, local to the city
  weekday: string;
  condition: string;
  maxC: number;
  minC: number;
  rainChance: number | null; // %
  rainMm: number;
  snowCm: number;
}

// One line per day for the model ("Tomorrow (Tuesday) Oct 6: light rain, 9 to 14°C, rain chance 80% (4 mm)") — weekday
// written out next to the date, so the model never mismatches them.
export function describeForecast(daily: DailyForecast[], days = 7): string {
  return daily
    .slice(0, days)
    .map((d, i) => `${i === 0 ? `Today (${d.weekday})` : i === 1 ? `Tomorrow (${d.weekday})` : d.weekday} ${new Date(`${d.date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}: ${d.condition}, ${d.minC} to ${d.maxC}°C${d.rainChance !== null ? `, rain chance ${d.rainChance}%` : ''}${d.rainMm > 0 ? ` (${d.rainMm} mm)` : ''}${d.snowCm > 0 ? `, snow ${d.snowCm} cm` : ''}`)
    .join('; ');
}

export async function getWeather(lat: number, lon: number, locationLabel: string): Promise<WeatherResult | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,snowfall_sum&forecast_days=7` +
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
    daily: Array.isArray(data?.daily?.time)
      ? data.daily.time.map((date: string, i: number) => ({
          date,
          weekday: new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }),
          condition: WMO_DESCRIPTIONS[data.daily.weather_code?.[i]] || 'unclear conditions',
          maxC: Math.round(data.daily.temperature_2m_max?.[i] ?? 0),
          minC: Math.round(data.daily.temperature_2m_min?.[i] ?? 0),
          rainChance: typeof data.daily.precipitation_probability_max?.[i] === 'number' ? data.daily.precipitation_probability_max[i] : null,
          rainMm: Math.round((data.daily.precipitation_sum?.[i] ?? 0) * 10) / 10,
          snowCm: Math.round((data.daily.snowfall_sum?.[i] ?? 0) * 10) / 10,
        }))
      : [],
  };
}

// --- Intent detection (regex, same style/discipline as the rest of this codebase's solvers) ---

const WEATHER_REGEX =
  /\bwetter\b|\b(?:regnet|schneit|gewittert)\s+es\b|\bwird\s+es\s+(?:morgen\s+|heute\s+)?(?:regnen|schneien|warm|kalt|sonnig)\b|\bwie\s+(?:warm|kalt|heiß|heiss)\s+ist\s+es\b|\bbrauche?\s+ich\s+(?:eine?n?\s+)?(?:jacke|regenschirm)\b|\b(?:will|gonna|going\s+to|is\s+it\s+(?:gonna|going\s+to))\s+(?:it\s+)?(?:rain|snow|storm|be\s+(?:sunny|cold|hot|warm|windy|nice))\b|\b(?:rain|snow|storm)\w*\s+(?:today|tonight|tomorrow|this\s+week(?:end)?|on\s+\w+day)\b|\b(?:do|should|will)\s+i\s+(?:need|bring|wear)\s+(?:a|an|my)\s+(?:jacket|coat|umbrella|hoodie|sweater)\b|\bweather\s+(?:tomorrow|tonight|this\s+week(?:end)?)\b|\bforecast\b|\b(?:il\s+va\s+(?:pleuvoir|neiger|faire\s+(?:beau|froid|chaud)))\b|\b(?:what'?s|whats|how'?s|hows)\s+the\s+weather\b|\bweather\s+(?:in|for|at|like)\b|\bweather\s+today\b|\bis\s+it\s+(?:raining|snowing|sunny|cold|hot|windy)\b|\bhow\s+(?:hot|cold)\s+is\s+it\b|\btemperature\s+(?:in|outside|today)\b|\bforecast\s+(?:for|in)\b|\bm[ée]t[ée]o\b|\bquel\s+temps\s+(?:fait[- ]il|il\s+fait)\b|\bfait[- ]il\s+(?:beau|froid|chaud)\b/i;

// Captures a trailing "in/for/at <city>" (EN) or "à/en/pour/dans <city>" (FR) — deliberately
// conservative (stops at common sentence-ending punctuation/conjunctions) so it doesn't swallow
// the rest of a longer sentence. Uses (?:^|\s) rather than \b before the preposition: JS's \b is
// an ASCII-only word-boundary check, so it silently never matches immediately before an accented
// character like "à" (both the preceding space and "à" itself count as "non-word" to \b, so no
// boundary is seen there) — this was found live-testing a French query that should have matched.
const WEATHER_CITY_REGEX =
  /(?:^|\s)(?:in|for|at|à|a|en|pour|dans)\s+([a-zà-ÿ][a-zà-ÿ\s'-]{1,40}?)(?:[?.!,]|$|\s+(?:today|right now|rn|tonight|tomorrow|là|maintenant|aujourd'hui|demain|ce\s+soir))/i;

// Time words are never part of the city ("forecast for london this week" -> "london").
const TIME_WORDS_RE = /\s+(?:heute|morgen|übermorgen|jetzt|gerade|am\s+wochenende|diese\s+woche|today|tonight|tomorrow|this\s+week(?:end)?|next\s+week(?:end)?|on\s+\w+day|\w+day|rn|right\s+now|now|later|demain|ce\s+soir|aujourd'hui|cette\s+semaine|ce\s+week-?end)\b.*$/i;

// Words people put after the city that are never part of it ("in Quebec city like right now", "in paris looking").
const TRAILING_FILLER_RE = /\s+(?:like|looking|lookin|looks|lol|lmao|bro|bruh|mate|fam|gng|pls|please|outside|out|there|now|rn|atm|currently|tho|though|again|nexus|today|tonight|tomorrow)$/i;
function stripFillers(city: string): string {
  let c = city.trim();
  while (TRAILING_FILLER_RE.test(c)) c = c.replace(TRAILING_FILLER_RE, '').trim();
  return c;
}

export function detectWeatherIntent(prompt: string): { city: string | null } | null {
  if (!WEATHER_REGEX.test(prompt)) return null;
  // The LAST place mentioned wins ("do i need a jacket today in toronto"), and a bare "a" (French "à" typed without
  // its accent) only counts in French — otherwise "a jacket" became the city "jacket".
  const french = /\b(?:météo|meteo|quel\s+temps|fait[- ]il|il\s+va|demain|pleuvoir|neiger)\b/i.test(prompt);
  const matches = [...prompt.matchAll(new RegExp(WEATHER_CITY_REGEX.source, 'gi'))].filter((m) => french || !/^\s*a\s/i.test(m[0].replace(/^\s+/, '').slice(0, 2)));
  const last = matches[matches.length - 1];
  const city = last ? stripFillers(last[1].replace(TIME_WORDS_RE, '')) || null : null;
  return { city };
}

const TIME_REGEX =
  /\bwie\s+sp(?:ä|ae)t\s+ist\s+es\b|\bwieviel\s+uhr\s+ist\s+es\b|\bwhat\s+time\s+is\s+it\b|\bwhat'?s\s+the\s+time\b|\bcurrent\s+time\b|\bquelle\s+heure\s+(?:est[- ]il|il\s+est|qu'il\s+est)\b|\bil\s+est\s+quelle\s+heure\b/i;
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
