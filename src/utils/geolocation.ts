// Browser geolocation for the "weather/time/nearby places without naming a city" feature — see
// handleLocationAwareQuery() in reasoningEngine.ts. The permission prompt (Safari included) fires
// once, triggered by the location button in ChatView.tsx's composer; the resulting fix is cached
// in memory + localStorage so every later message in the session reuses it automatically via
// getCachedClientLocation() without re-prompting, as long as it's still fresh.

export interface ClientLocation {
  lat: number;
  lon: number;
}

const STORAGE_KEY = 'nexus-client-location';
const FRESHNESS_MS = 30 * 60 * 1000;

interface StoredLocation extends ClientLocation {
  capturedAt: number;
}

let memoryCache: StoredLocation | null = null;

function readStored(): StoredLocation | null {
  if (memoryCache) return memoryCache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.lat === 'number' &&
      typeof parsed?.lon === 'number' &&
      typeof parsed?.capturedAt === 'number'
    ) {
      memoryCache = parsed;
      return parsed;
    }
  } catch {
    // Private browsing / storage-disabled Safari can throw here — just means no cache.
  }
  return null;
}

export function getCachedClientLocation(): ClientLocation | null {
  const stored = readStored();
  if (!stored || Date.now() - stored.capturedAt > FRESHNESS_MS) return null;
  return { lat: stored.lat, lon: stored.lon };
}

export function isGeolocationSupported(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.geolocation;
}

export function requestClientLocation(): Promise<ClientLocation | null> {
  return new Promise((resolve) => {
    if (!isGeolocationSupported()) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: StoredLocation = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          capturedAt: Date.now(),
        };
        memoryCache = loc;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
        } catch {
          // In-memory cache still covers the rest of this session even if storage is unavailable.
        }
        resolve({ lat: loc.lat, lon: loc.lon });
      },
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: FRESHNESS_MS }
    );
  });
}
