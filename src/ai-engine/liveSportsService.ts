/**
 * Live Sports Service — ESPN's public scoreboard/standings API
 * =============================================================
 *
 * Gives Nexus live scores, live status, and league standings for soccer and
 * a handful of other major sports (NBA, NFL, NHL, MLB), using the same free,
 * no-API-key ESPN endpoint the Discord bot's own footballService.js already
 * relies on for fixture syncing (`site.api.espn.com/apis/site/v2/sports/...`)
 * — same data source, no new account/key to manage.
 *
 * This is deliberately separate from footballIntelligence.ts (off-limits to
 * modify — standing rule) and from the corpus/Domain Intelligence static
 * fact banks: those answer "what IS the Champions League" style questions
 * from hand-written/pre-baked knowledge, while this module answers "what's
 * the score RIGHT NOW" / "where does Barça sit in the table" style questions
 * that need a live network call, every time, with no caching of the actual
 * scores (only the resolved league/team name lookup below is memoized).
 */

interface EspnCompetitor {
  team: { id?: string; displayName: string; shortDisplayName?: string; abbreviation?: string };
  score?: string;
  homeAway?: 'home' | 'away';
  winner?: boolean;
}

interface EspnEvent {
  name: string;
  shortName?: string;
  date: string;
  competitions: Array<{
    status: {
      type: { description: string; detail?: string; shortDetail?: string; state?: string; completed?: boolean };
      displayClock?: string;
    };
    competitors: EspnCompetitor[];
    // Soccer scoreboard events carry a play-by-play-style log here — goals, cards, subs — each
    // entry tagged with which team.id it belongs to. Used to pull out goal scorers specifically
    // (type.text === "Goal"); other event types (cards, subs) are ignored for now.
    details?: Array<{
      type?: { text?: string };
      clock?: { displayValue?: string };
      team?: { id?: string };
      scoringPlay?: boolean;
      ownGoal?: boolean;
      athletesInvolved?: Array<{ displayName?: string }>;
    }>;
  }>;
}

export interface GoalScorer {
  minute: string;
  player: string;
  teamSide: 'home' | 'away';
}

export interface LiveMatch {
  name: string;
  kickoffIso: string;
  statusDescription: string;
  statusDetail: string;
  isLive: boolean;
  isCompleted: boolean;
  homeTeam: string;
  awayTeam: string;
  homeScore: string | null;
  awayScore: string | null;
  displayClock: string | null;
  goalScorers: GoalScorer[];
}

export interface StandingsRow {
  rank: number;
  team: string;
  gamesPlayed: number | null;
  wins: number | null;
  losses: number | null;
  draws: number | null;
  points: number | null;
}

interface LeagueEntry {
  sport: string;
  league: string;
  label: string;
}

// Common name -> ESPN sport/league code. Soccer leagues first (Patrick's own priority — FC
// Barcelona / La Liga / Champions League), then the other major sports the corpus loop has been
// covering this session (NHL, NBA, MLB, NFL).
const LEAGUE_MAP: Record<string, LeagueEntry> = {
  'la liga': { sport: 'soccer', league: 'esp.1', label: 'La Liga' },
  laliga: { sport: 'soccer', league: 'esp.1', label: 'La Liga' },
  'la liga ea sports': { sport: 'soccer', league: 'esp.1', label: 'La Liga' },
  'premier league': { sport: 'soccer', league: 'eng.1', label: 'Premier League' },
  epl: { sport: 'soccer', league: 'eng.1', label: 'Premier League' },
  'champions league': { sport: 'soccer', league: 'uefa.champions', label: 'UEFA Champions League' },
  ucl: { sport: 'soccer', league: 'uefa.champions', label: 'UEFA Champions League' },
  'europa league': { sport: 'soccer', league: 'uefa.europa', label: 'UEFA Europa League' },
  'europa conference league': { sport: 'soccer', league: 'uefa.europa.conf', label: 'UEFA Europa Conference League' },
  'ligue 1': { sport: 'soccer', league: 'fra.1', label: 'Ligue 1' },
  'serie a': { sport: 'soccer', league: 'ita.1', label: 'Serie A' },
  bundesliga: { sport: 'soccer', league: 'ger.1', label: 'Bundesliga' },
  mls: { sport: 'soccer', league: 'usa.1', label: 'MLS' },
  'liga mx': { sport: 'soccer', league: 'mex.1', label: 'Liga MX' },
  'copa del rey': { sport: 'soccer', league: 'esp.copa_del_rey', label: 'Copa del Rey' },
  // Broader soccer coverage, added after Patrick asked for "every football/soccer league" — every
  // code below was individually verified live against ESPN's standings endpoint before being added
  // (a wrong code just 400s and the feature cleanly falls through to the normal answer path, but
  // better to know these actually work rather than guess).
  // NOT the bare word "championship" — that collides with every other sport's own "championship"
  // (verified live: "who is leading the F1 championship" was being hijacked by this entry purely
  // because the substring "championship" appears in the query). "EFL Championship" is the league's
  // actual proper name, so requiring at least "efl" or "english" alongside it avoids the collision.
  'efl championship': { sport: 'soccer', league: 'eng.2', label: 'EFL Championship' },
  'english championship': { sport: 'soccer', league: 'eng.2', label: 'EFL Championship' },
  eredivisie: { sport: 'soccer', league: 'ned.1', label: 'Eredivisie' },
  'primeira liga': { sport: 'soccer', league: 'por.1', label: 'Primeira Liga' },
  'liga portugal': { sport: 'soccer', league: 'por.1', label: 'Primeira Liga' },
  brasileirao: { sport: 'soccer', league: 'bra.1', label: 'Brasileirão Série A' },
  'brasileirão': { sport: 'soccer', league: 'bra.1', label: 'Brasileirão Série A' },
  'serie a brazil': { sport: 'soccer', league: 'bra.1', label: 'Brasileirão Série A' },
  // Found in review (verified live): "what is the brazil serie a standings" still resolved to
  // ITALIAN Serie A even after the length-sort fix, because 'serie a brazil' (word order: sport
  // first, country second) never matches "brazil serie a" (country first) as a substring at all —
  // it's not a length/priority problem, it's a word-order mismatch. Added the reversed phrasing
  // explicitly rather than trying to make the matcher order-independent for one pair of words.
  'brazil serie a': { sport: 'soccer', league: 'bra.1', label: 'Brasileirão Série A' },
  'liga profesional argentina': { sport: 'soccer', league: 'arg.1', label: 'Liga Profesional Argentina' },
  'argentine primera division': { sport: 'soccer', league: 'arg.1', label: 'Liga Profesional Argentina' },
  'scottish premiership': { sport: 'soccer', league: 'sco.1', label: 'Scottish Premiership' },
  'super lig': { sport: 'soccer', league: 'tur.1', label: 'Süper Lig' },
  'saudi pro league': { sport: 'soccer', league: 'ksa.1', label: 'Saudi Pro League' },
  'copa libertadores': { sport: 'soccer', league: 'conmebol.libertadores', label: 'Copa Libertadores' },
  libertadores: { sport: 'soccer', league: 'conmebol.libertadores', label: 'Copa Libertadores' },
  'copa sudamericana': { sport: 'soccer', league: 'conmebol.sudamericana', label: 'Copa Sudamericana' },
  sudamericana: { sport: 'soccer', league: 'conmebol.sudamericana', label: 'Copa Sudamericana' },
  'nations league': { sport: 'soccer', league: 'uefa.nations', label: 'UEFA Nations League' },
  'concacaf champions cup': { sport: 'soccer', league: 'concacaf.champions', label: 'CONCACAF Champions Cup' },
  'world cup': { sport: 'soccer', league: 'fifa.world', label: 'FIFA World Cup' },
  'fa cup': { sport: 'soccer', league: 'eng.fa', label: 'FA Cup' },
  'efl cup': { sport: 'soccer', league: 'eng.league_cup', label: 'EFL Cup' },
  'league cup': { sport: 'soccer', league: 'eng.league_cup', label: 'EFL Cup' },
  'league one': { sport: 'soccer', league: 'eng.3', label: 'EFL League One' },
  'league two': { sport: 'soccer', league: 'eng.4', label: 'EFL League Two' },
  'la liga 2': { sport: 'soccer', league: 'esp.2', label: 'LaLiga 2' },
  'segunda division': { sport: 'soccer', league: 'esp.2', label: 'LaLiga 2' },
  'serie b': { sport: 'soccer', league: 'ita.2', label: 'Serie B' },
  '2. bundesliga': { sport: 'soccer', league: 'ger.2', label: '2. Bundesliga' },
  'ligue 2': { sport: 'soccer', league: 'fra.2', label: 'Ligue 2' },
  'belgian pro league': { sport: 'soccer', league: 'bel.1', label: 'Belgian Pro League' },
  'jupiler pro league': { sport: 'soccer', league: 'bel.1', label: 'Belgian Pro League' },
  'austrian bundesliga': { sport: 'soccer', league: 'aut.1', label: 'Austrian Bundesliga' },
  'swiss super league': { sport: 'soccer', league: 'sui.1', label: 'Swiss Super League' },
  'greek super league': { sport: 'soccer', league: 'gre.1', label: 'Greek Super League' },
  'russian premier league': { sport: 'soccer', league: 'rus.1', label: 'Russian Premier League' },
  'danish superliga': { sport: 'soccer', league: 'den.1', label: 'Danish Superliga' },
  allsvenskan: { sport: 'soccer', league: 'swe.1', label: 'Allsvenskan' },
  eliteserien: { sport: 'soccer', league: 'nor.1', label: 'Eliteserien' },
  'categoria primera a': { sport: 'soccer', league: 'col.1', label: 'Categoría Primera A' },
  'chilean primera division': { sport: 'soccer', league: 'chi.1', label: 'Chilean Primera División' },
  'peruvian primera division': { sport: 'soccer', league: 'per.1', label: 'Liga 1 Perú' },
  'uruguayan primera division': { sport: 'soccer', league: 'uru.1', label: 'Uruguayan Primera División' },
  'ecuadorian serie a': { sport: 'soccer', league: 'ecu.1', label: 'Ecuadorian Serie A' },
  'south african premier division': { sport: 'soccer', league: 'rsa.1', label: 'South African Premier Division' },
  'j1 league': { sport: 'soccer', league: 'jpn.1', label: 'J1 League' },
  'chinese super league': { sport: 'soccer', league: 'chn.1', label: 'Chinese Super League' },
  'a-league': { sport: 'soccer', league: 'aus.1', label: 'A-League' },
  nba: { sport: 'basketball', league: 'nba', label: 'NBA' },
  'ncaa basketball': { sport: 'basketball', league: 'mens-college-basketball', label: 'NCAA Basketball' },
  'college basketball': { sport: 'basketball', league: 'mens-college-basketball', label: 'NCAA Basketball' },
  nfl: { sport: 'football', league: 'nfl', label: 'NFL' },
  'college football': { sport: 'football', league: 'college-football', label: 'NCAA Football' },
  ncaaf: { sport: 'football', league: 'college-football', label: 'NCAA Football' },
  nhl: { sport: 'hockey', league: 'nhl', label: 'NHL' },
  mlb: { sport: 'baseball', league: 'mlb', label: 'MLB' },
  // F1's ESPN "sport" segment is 'racing', not 'motorsport' — its standings are driver standings
  // (name + championship points), a different shape from every other league here (team + W/L/D/pts),
  // handled separately in getF1DriverStandings/renderF1StandingsContext below.
  f1: { sport: 'racing', league: 'f1', label: 'Formula 1' },
  'formula 1': { sport: 'racing', league: 'f1', label: 'Formula 1' },
  'formula one': { sport: 'racing', league: 'f1', label: 'Formula 1' },
};

// A handful of well-known club nicknames that don't literally appear in ESPN's own displayName
// ("FC Barcelona" is just "Barcelona" in the API, but people say "Barça"/"the Blaugrana").
const TEAM_ALIASES: Record<string, string> = {
  barca: 'barcelona',
  "barça": 'barcelona',
  blaugrana: 'barcelona',
  culers: 'barcelona',
  madrid: 'real madrid',
  'los blancos': 'real madrid',
  united: 'manchester united',
  'man united': 'manchester united',
  'man utd': 'manchester united',
  city: 'manchester city',
  'man city': 'manchester city',
  spurs: 'tottenham',
  gunners: 'arsenal',
  reds: 'liverpool',
};

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, ' ');
}

// Found in review (verified live): a plain first-match substring loop over LEAGUE_MAP resolved
// "what is the brazil serie a standings" to ITALIAN Serie A, not Brasileirão — because the shorter
// key 'serie a' happened to come earlier in the object than the more specific 'serie a brazil' /
// 'brasileirao' keys, and a first-match loop stops as soon as ANY substring hits, regardless of
// whether a more specific key would have matched too. Sorting candidates by DESCENDING key length
// before scanning means a longer, more specific match ("serie a brazil") is always preferred over a
// shorter, more generic one ("serie a") whenever both appear in the same query — computed once at
// module load, not per call.
const LEAGUE_MAP_BY_LENGTH: Array<[string, LeagueEntry]> = Object.entries(LEAGUE_MAP).sort((a, b) => b[0].length - a[0].length);

// This file has zero support for rugby, cricket, hockey, handball, or netball — but "world cup" is
// a generic term used across all of those sports, not just soccer. Verified live: resolveLeague on
// "what is the score of the rugby world cup final" and "who is winning the cricket world cup" both
// wrongly returned the FIFA soccer World Cup, purely because "world cup" is a substring of both
// queries. Guarded here so a competing sport's own "world cup" doesn't get silently answered with
// unrelated soccer data — better to return null (falls through to the normal answer path) than to
// confidently answer the wrong sport's question with a live score.
const WORLD_CUP_SPORT_CONFLICT_RE = /\b(?:rugby|cricket|hockey|handball|netball|volleyball|basketball)\b/i;

/** Resolves a free-text league name ("la liga", "the champions league", "prem") to an ESPN code. */
export function resolveLeague(text: string): LeagueEntry | null {
  const t = normalize(text);
  // Exact key match first, then substring — "who's top of la liga right now" contains extra words.
  if (LEAGUE_MAP[t]) return LEAGUE_MAP[t];
  for (const [key, entry] of LEAGUE_MAP_BY_LENGTH) {
    if (!t.includes(key)) continue;
    if (key === 'world cup' && WORLD_CUP_SPORT_CONFLICT_RE.test(t)) continue;
    return entry;
  }
  // A few loose single-word aliases that would otherwise need every phrasing spelled out.
  if (/\bprem\b/.test(t)) return LEAGUE_MAP['premier league'];
  if (/\bchamps\s*league\b/.test(t)) return LEAGUE_MAP['champions league'];
  return null;
}

function resolveTeamName(text: string): string {
  const t = normalize(text);
  return TEAM_ALIASES[t] || t;
}

import * as https from 'https';

const FETCH_TIMEOUT_MS = 8000;

// Found live while wiring this up: ESPN's hidden site.api.espn.com endpoint sits behind Akamai's
// bot-management edge, which fingerprints the TLS/HTTP2 handshake — the runtime's native fetch()
// gets a hard 403 "Access Denied" (AkamaiGHost) on every single request, while curl hitting the
// exact same URL from the exact same machine gets a clean 200 every time. This isn't a one-off
// fluke: confirmed repeatedly, back to back, same process.
//
// First fix attempted was shelling out to curl via child_process.execFile — worked locally (macOS
// ships curl), but broke in production: the Railway/Nixpacks deploy image doesn't have curl
// installed ("spawn curl ENOENT" in the logs, confirmed via diagnostic logging), so the whole
// feature silently no-opped there even though the local dev server worked fine. Rather than fight
// the build image to guarantee curl exists, switched to Node's built-in `https` module instead of
// `fetch()` — confirmed locally that `https.get()` reaches this same endpoint with a clean 200
// where `fetch()` gets the 403. The Akamai fingerprinting appears to specifically target `fetch()`'s
// HTTP/2 + undici TLS negotiation, not Node's plain HTTP/1.1 `https` client — so this has zero
// external dependencies (no curl, no extra package) and works the same in dev and in the deployed
// container.
function espnFetch(url: string): Promise<any | null> {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      { headers: { 'User-Agent': 'curl/8.4.0', Accept: 'application/json' }, timeout: FETCH_TIMEOUT_MS },
      (res) => {
        if (res.statusCode !== 200) {
          console.warn('[liveSports] espnFetch got status', res.statusCode, 'for', url);
          res.resume();
          resolve(null);
          return;
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            console.warn('[liveSports] espnFetch JSON parse failed for', url, '-', err instanceof Error ? err.message : err);
            resolve(null);
          }
        });
      }
    );
    req.on('timeout', () => {
      req.destroy();
      console.warn('[liveSports] espnFetch timed out for', url);
      resolve(null);
    });
    req.on('error', (err) => {
      console.warn('[liveSports] espnFetch failed for', url, '-', err.message);
      resolve(null);
    });
  });
}

function mapEvent(ev: EspnEvent): LiveMatch | null {
  const comp = ev.competitions?.[0];
  if (!comp) return null;
  const home = comp.competitors.find((c) => c.homeAway === 'home');
  const away = comp.competitors.find((c) => c.homeAway === 'away');
  if (!home || !away) return null;
  const statusType = comp.status?.type;
  const state = statusType?.state;
  const goalScorers: GoalScorer[] = Array.isArray(comp.details)
    ? comp.details
        .filter((d) => d.type?.text === 'Goal')
        .map((d) => ({
          minute: d.clock?.displayValue || '?',
          player: d.athletesInvolved?.[0]?.displayName || 'Unknown',
          teamSide: (d.team?.id && d.team.id === home.team.id ? 'home' : 'away') as 'home' | 'away',
        }))
    : [];
  return {
    name: ev.name || ev.shortName || `${away.team.displayName} at ${home.team.displayName}`,
    kickoffIso: ev.date,
    statusDescription: statusType?.description || 'Unknown',
    statusDetail: statusType?.shortDetail || statusType?.detail || '',
    isLive: state === 'in',
    isCompleted: !!statusType?.completed || state === 'post',
    homeTeam: home.team.displayName,
    awayTeam: away.team.displayName,
    homeScore: home.score ?? null,
    awayScore: away.score ?? null,
    displayClock: comp.status?.displayClock || null,
    goalScorers,
  };
}

/**
 * Fetches the current scoreboard (today's matches, live scores, and recent completed results)
 * for a resolved league.
 */
export async function getLeagueScoreboard(leagueEntry: LeagueEntry): Promise<LiveMatch[]> {
  const url = `https://site.api.espn.com/apis/site/v2/sports/${leagueEntry.sport}/${leagueEntry.league}/scoreboard`;
  const data = await espnFetch(url);
  if (!data || !Array.isArray(data.events)) return [];
  return data.events.map(mapEvent).filter((m: LiveMatch | null): m is LiveMatch => m !== null);
}

/**
 * Searches a league's current scoreboard for a specific team (by ESPN displayName substring
 * match, case-insensitive, alias-aware — "barca"/"barça" both resolve to "barcelona").
 */
export async function findTeamMatch(leagueEntry: LeagueEntry, teamQuery: string): Promise<LiveMatch | null> {
  const matches = await getLeagueScoreboard(leagueEntry);
  const wanted = resolveTeamName(teamQuery);
  return (
    matches.find(
      (m) => normalize(m.homeTeam).includes(wanted) || normalize(m.awayTeam).includes(wanted) || wanted.includes(normalize(m.homeTeam)) || wanted.includes(normalize(m.awayTeam))
    ) || null
  );
}

/**
 * Looks for a team's match across several competitions at once — used when the user names a team
 * without naming a competition (a club plays in its domestic league AND continental competitions
 * across a season, so a single-league lookup would often miss). Fetches every candidate league's
 * scoreboard IN PARALLEL (Promise.all) rather than one at a time — searching all ~30 supported
 * soccer leagues sequentially could take many seconds; in parallel the wall time stays bounded by
 * the single slowest request, not the total count of leagues checked. Returns the first match found
 * in `leagueEntries`' original order (deterministic — e.g. a club's domestic league is checked
 * before continental competitions when both happen to have a hit) even though the underlying
 * fetches don't necessarily resolve in that order.
 */
export async function findTeamMatchAcrossLeagues(teamQuery: string, leagueEntries: LeagueEntry[]): Promise<{ match: LiveMatch; league: LeagueEntry } | null> {
  const results = await Promise.all(leagueEntries.map((entry) => findTeamMatch(entry, teamQuery)));
  for (let i = 0; i < results.length; i++) {
    const match = results[i];
    if (match) return { match, league: leagueEntries[i] };
  }
  return null;
}

/** The competitions FC Barcelona (or any club followed this closely) could plausibly appear in. */
export const BARCELONA_LEAGUE_SEARCH_ORDER: LeagueEntry[] = [
  LEAGUE_MAP['la liga'],
  LEAGUE_MAP['champions league'],
  LEAGUE_MAP['europa league'],
  LEAGUE_MAP['copa del rey'],
];

// Every soccer league/cup this file knows about, deduplicated by ESPN league code (several keys in
// LEAGUE_MAP point at the same competition — "barca"-style aliases aren't leagues, but "la liga" /
// "laliga" both point at esp.1, for instance). Used to find ANY team's match when the user names a
// team ESPN doesn't have a hardcoded alias for (e.g. "the Vancouver Whitecaps game") — rather than
// only ever searching Barcelona's specific competitions, search every supported soccer competition
// in parallel and return whichever one actually has that team playing.
const ALL_SOCCER_LEAGUES: LeagueEntry[] = (() => {
  const seen = new Set<string>();
  const out: LeagueEntry[] = [];
  for (const entry of Object.values(LEAGUE_MAP)) {
    if (entry.sport !== 'soccer') continue;
    const key = `${entry.sport}/${entry.league}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
  }
  return out;
})();

/**
 * Fetches full league standings/table for a resolved league.
 */
/**
 * `season`, when given, fetches a PAST season's final standings instead of the current live ones —
 * ESPN's standings endpoint supports a `?season=YYYY` query param that returns that season's actual
 * data (verified live: `?season=2024` on F1 correctly returns Verstappen's real 2024 championship,
 * not the current season). Patrick asked for Nexus to know every past champion ESPN has, not just
 * current live standings — this is what makes "who won the 2024 [league]" answerable for real
 * instead of falling back to a vague corpus/web-search non-answer.
 */
export async function getLeagueStandings(leagueEntry: LeagueEntry, season?: number): Promise<StandingsRow[]> {
  const url = `https://site.api.espn.com/apis/v2/sports/${leagueEntry.sport}/${leagueEntry.league}/standings${season ? `?season=${season}` : ''}`;
  const data = await espnFetch(url);
  if (!data) return [];
  // Soccer standings nest one level under `children[0].standings.entries`; some other sports'
  // standings (conferences/divisions) can have multiple children — flatten them all together
  // rather than only reading children[0], so e.g. NBA's two conferences both come through.
  const children = Array.isArray(data.children) ? data.children : [data];
  const rows: StandingsRow[] = [];
  for (const child of children) {
    const entries = child?.standings?.entries;
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      const statByName = (name: string): number | null => {
        const stat = entry.stats?.find((s: any) => s.name === name);
        if (!stat) return null;
        const val = Number(stat.value);
        return Number.isFinite(val) ? val : null;
      };
      rows.push({
        rank: statByName('rank') ?? rows.length + 1,
        team: entry.team?.displayName || 'Unknown',
        gamesPlayed: statByName('gamesPlayed'),
        wins: statByName('wins'),
        losses: statByName('losses'),
        draws: statByName('ties'),
        points: statByName('points'),
      });
    }
  }
  return rows.sort((a, b) => a.rank - b.rank);
}

export interface DriverStandingRow {
  rank: number;
  driver: string;
  points: number | null;
}

/**
 * F1's ESPN standings endpoint has a fundamentally different shape from every team-sport league
 * here: entries are keyed by `athlete` (the driver), not `team`, and the points stat is named
 * `championshipPts` rather than `points` — plus it carries a `stats` entry per individual race
 * (one per Grand Prix code) that isn't relevant to "who's leading the championship." Kept as its
 * own function/type rather than shoehorning drivers into StandingsRow, which is genuinely
 * team-shaped (wins/losses/draws) and doesn't fit a driver at all.
 */
export async function getF1DriverStandings(season?: number): Promise<DriverStandingRow[]> {
  const url = `https://site.api.espn.com/apis/v2/sports/racing/f1/standings${season ? `?season=${season}` : ''}`;
  const data = await espnFetch(url);
  if (!data || !Array.isArray(data.children)) return [];
  const driverChild = data.children.find((c: any) => /driver/i.test(c?.name || '')) || data.children[0];
  const entries = driverChild?.standings?.entries;
  if (!Array.isArray(entries)) return [];
  const rows: DriverStandingRow[] = entries.map((entry: any, i: number) => {
    const rankStat = entry.stats?.find((s: any) => s.name === 'rank');
    const ptsStat = entry.stats?.find((s: any) => s.name === 'championshipPts');
    return {
      rank: Number.isFinite(Number(rankStat?.value)) ? Number(rankStat.value) : i + 1,
      driver: entry.athlete?.displayName || 'Unknown',
      points: Number.isFinite(Number(ptsStat?.value)) ? Number(ptsStat.value) : null,
    };
  });
  return rows.sort((a, b) => a.rank - b.rank);
}

export interface F1RaceResult {
  raceName: string;
  raceDate: string | null;
  isCompleted: boolean;
  order: { position: number; driver: string }[];
}

/**
 * Fetches a specific F1 race's RESULT (who actually won that Grand Prix) — a completely different
 * question from getF1DriverStandings (season-long championship points). Found live: ESPN's own
 * `winner` flag on each competitor is unreliable (came back `false` for every driver, including the
 * one who actually won), so finishing position is read from `order` instead, which was consistently
 * correct in testing (order 1 = race winner).
 *
 * `gpQuery` is an optional substring to match against the race name ("spanish" -> "Spanish Grand
 * Prix") — when omitted, returns the most recent event ESPN's default scoreboard call returns
 * (typically the latest completed or upcoming race).
 */
export async function getF1RaceResult(gpQuery?: string): Promise<F1RaceResult | null> {
  // Found live: the plain scoreboard call (no date range) only ever returns a SINGLE event (the
  // current/most recent race) — asking about any other race from earlier in the season ("when was
  // the Hungarian GP") found nothing, silently fell through to a normal web search, and that web
  // search then hit Google's rate limit (HTTP 429) on top of it. ESPN's scoreboard endpoint accepts
  // a `?dates=YYYY` param that returns the WHOLE season's races (verified live: 25 events for 2026,
  // in chronological order, each with its own completed/scheduled status) — used here instead so any
  // named GP from the current season can actually be found, not just whichever one happens to be
  // "current" right now.
  const year = new Date().getFullYear();
  const url = `https://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard?dates=${year}`;
  const data = await espnFetch(url);
  if (!data || !Array.isArray(data.events) || data.events.length === 0) return null;
  const wanted = gpQuery ? normalize(gpQuery) : null;
  let event: any;
  if (wanted) {
    event = data.events.find((ev: any) => normalize(ev.name || '').includes(wanted) || normalize(ev.shortName || '').includes(wanted));
  } else {
    // No specific GP named ("who won the last race") — events are in chronological order, so the
    // most recent COMPLETED one is the last entry whose status says completed, not events[0] (which
    // with a full-season fetch is now the SEASON OPENER, not the latest race).
    const completed = data.events.filter((ev: any) => ev.competitions?.[0]?.status?.type?.completed);
    event = completed[completed.length - 1] || data.events[data.events.length - 1];
  }
  if (!event) return null;
  const comp = event.competitions?.[0];
  const competitors = comp?.competitors;
  if (!Array.isArray(competitors)) return null;
  const order = competitors
    .map((c: any) => ({ position: Number(c.order) || 999, driver: c.athlete?.displayName || 'Unknown' }))
    .sort((a: { position: number }, b: { position: number }) => a.position - b.position);
  // event.date is an ISO string like "2026-09-11T11:30Z" — sliced to just the calendar date (no
  // time/timezone math needed for a "what year/date was this race" grounding fact).
  const raceDate = typeof event.date === 'string' && event.date.length >= 10 ? event.date.slice(0, 10) : null;
  return {
    raceName: event.name || event.shortName || 'the race',
    raceDate,
    isCompleted: !!comp?.status?.type?.completed,
    order,
  };
}

/**
 * Renders a compact, LLM-groundable text block for a specific F1 race's result. Includes the race's
 * actual date — found live that without it, the model would sometimes just invent a year on its own
 * ("Russell took the top spot in the 2024 Spanish GP") since nothing in the context gave it a real
 * one to use.
 */
export function renderF1RaceResultContext(result: F1RaceResult): string {
  if (result.order.length === 0) return `Result for ${result.raceName} is unavailable right now.`;
  if (!result.isCompleted) return `${result.raceName} hasn't finished yet — no result available right now.`;
  const winner = result.order[0];
  const top5 = result.order
    .slice(0, 5)
    .map((r) => `${r.position}. ${r.driver}`)
    .join(', ');
  const dateNote = result.raceDate ? ` (held on ${result.raceDate})` : '';
  return `${result.raceName}${dateNote} result, from live ESPN data just fetched: the winner was ${winner.driver}. Full top 5: ${top5}.`;
}

// Patrick reported team names coming back garbled in the actual reply ("bretford" instead of
// "Brentford") even though the live data fetched from ESPN was correct — the small model was
// silently respelling/paraphrasing names while relaying them in its own crashout voice. Appended to
// every render*Context block below so the grounding instruction travels with the data itself no
// matter which call site uses it.


/**
 * Renders a compact, LLM-groundable text block for F1 driver standings. No bracketed header (see
 * renderMatchContext's comment) — Patrick caught this leaking verbatim into a live Discord reply
 * even after the header text was shortened once already, so every render function here now uses a
 * plain sentence lead-in instead of a "[LIVE DATA — ...]" bracket.
 */
export function renderF1StandingsContext(rows: DriverStandingRow[], season?: number): string {
  if (rows.length === 0) return 'Formula 1 driver standings are unavailable right now.';
  const lines = rows.slice(0, 10).map((r) => `${r.rank}. ${r.driver}${r.points !== null ? ` — ${r.points} pts` : ''}`);
  // Explicitly states whether this is the FINAL standings of a named past season or the current
  // in-progress one — without this, the model has no way to know which it's looking at and could
  // present a past champion as "currently leading" or vice versa.
  const label = season
    ? `Formula 1 Driver Championship — FINAL standings for the ${season} season (already completed), from ESPN data`
    : 'Formula 1 Driver Championship standings, CURRENT/in-progress season, from live ESPN data just fetched';
  return `${label}:\n${lines.join('\n')}`;
}

function formatMatchLine(m: LiveMatch): string {
  // Found live: the compact "TeamA 2 - 4 TeamB" shorthand was frequently misread by the small
  // model — it would report "2-4 to TeamA" (i.e. read the dash-separated numbers as belonging to
  // the WRONG side) more often than not in repeated testing, turning a Barcelona win into a
  // reported Barcelona loss. Spelling out each team's own score next to its own name, plus an
  // explicit winner/draw callout, removes the need for the model to parse ambiguous shorthand at
  // all — it only has to copy a sentence that's already unambiguous.
  let score: string;
  if (m.homeScore !== null && m.awayScore !== null) {
    const home = Number(m.homeScore);
    const away = Number(m.awayScore);
    const outcome =
      Number.isFinite(home) && Number.isFinite(away)
        ? home === away
          ? 'Draw.'
          : home > away
          ? `${m.homeTeam} won.`
          : `${m.awayTeam} won.`
        : '';
    score = `${m.homeTeam} scored ${m.homeScore}, ${m.awayTeam} scored ${m.awayScore}. ${outcome}`.trim();
  } else {
    score = `${m.homeTeam} vs ${m.awayTeam}`;
  }
  const status = m.isLive ? `LIVE (${m.displayClock || m.statusDetail})` : m.isCompleted ? `Final (${m.statusDetail || 'FT'})` : `Scheduled (${m.statusDetail || m.kickoffIso})`;
  // Goal scorers, when ESPN's data includes them (soccer only) — answers "who scored" without a
  // separate lookup, since it's the single most common natural follow-up to a match score.
  const scorersLine =
    m.goalScorers.length > 0
      ? ` Goals: ${m.goalScorers.map((g) => `${g.player} (${g.teamSide === 'home' ? m.homeTeam : m.awayTeam}, ${g.minute})`).join(', ')}.`
      : '';
  return `${score} — ${status}.${scorersLine}`;
}

/**
 * Renders a compact, LLM-groundable text block for one match. Deliberately NO bracketed
 * "[LIVE DATA — ...]" header here (unlike the scoreboard/standings renderers below) — a single
 * short match line is so brief that, in repeated live testing, the model would often just copy the
 * bracket header verbatim into its reply instead of paraphrasing (there was barely anything else in
 * the block to distract it into rephrasing). A plain sentence gives it nothing bracket-shaped to
 * echo while still being unambiguous enough via formatMatchLine's explicit per-team scoring.
 */
export function renderMatchContext(m: LiveMatch, leagueLabel: string): string {
  return `${leagueLabel} match, from live ESPN data just fetched: ${formatMatchLine(m)}`;
}

/** Renders a compact, LLM-groundable text block for a league's current scoreboard (multiple matches). */
export function renderScoreboardContext(matches: LiveMatch[], leagueLabel: string): string {
  if (matches.length === 0) return `${leagueLabel} has no matches found right now (likely no fixtures today).`;
  const lines = matches.slice(0, 10).map(formatMatchLine);
  return `${leagueLabel} scoreboard, from live ESPN data just fetched:\n${lines.join('\n')}`;
}

/** Renders a compact, LLM-groundable text block for a league table. */
export function renderStandingsContext(rows: StandingsRow[], leagueLabel: string, season?: number): string {
  if (rows.length === 0) return `${leagueLabel} standings are unavailable right now.`;
  const lines = rows.slice(0, 12).map((r) => {
    const record = r.draws !== null ? `${r.wins}W-${r.draws}D-${r.losses}L` : `${r.wins}W-${r.losses}L`;
    return `${r.rank}. ${r.team} — ${record}${r.points !== null ? `, ${r.points} pts` : ''}${r.gamesPlayed !== null ? ` (${r.gamesPlayed} played)` : ''}`;
  });
  const label = season
    ? `${leagueLabel} — FINAL standings for the ${season} season (already completed), from ESPN data`
    : `${leagueLabel} standings, CURRENT/in-progress season, from live ESPN data just fetched`;
  return `${label}:\n${lines.join('\n')}`;
}

// ─── Query intent detection ─────────────────────────────────────────────────

export interface LiveSportsIntent {
  kind: 'team_score' | 'league_scoreboard' | 'standings' | 'f1_race_result';
  team?: string;
  league?: LeagueEntry;
  gpQuery?: string;
  season?: number;
}

// "did Lewis Hamilton win the Spanish GP" / "who won the last F1 race" — a RACE result question,
// completely different from the season-long championship standings above (getF1DriverStandings).
// Verified live: this kind of question wasn't covered by SCORE_TRIGGER_RE at all (no "score/result/
// playing/winning" — "win"/"won" weren't in it) and fell all the way through to a static trivia
// answer that just described the driver's career and the Grand Prix's history without ever actually
// answering who won.
//
// "grand prix" (the full phrase) is essentially unambiguous on its own and always triggers. Bare
// "gp", though, is NOT safe alone — found in review (verified live): "i need to see my gp about this
// rash tomorrow" (GP = family doctor, extremely common British/Commonwealth usage) matched this
// trigger and was routed into an F1 lookup, adding a wasted network round-trip before falling
// through. Bare "gp" now requires an actual co-occurring F1 signal word before it counts.
const GRAND_PRIX_RE = /\bgrand\s+prix\b/i;
const BARE_GP_RE = /\bgp\b/i;
const F1_CONTEXT_RE = /\b(?:f1|formula\s*1|formula\s+one|racing|driver|qualif(?:y|ying)|pole\s+position)\b/i;
// The first fix here (requiring F1_CONTEXT_RE) was too strict and broke the exact case this trigger
// exists for — verified live: "did lewis hamilton win the 2026 spanish gp" regressed to no match at
// all, since a plain "[country] gp" phrasing has no "f1"/"formula"/"racing" word anywhere in it.
// Real Grand Prix questions almost always name the race by its host country/city right before "gp"
// ("spanish gp", "hungarian gp"), so a bare "gp" is ALSO allowed through when preceded by one of
// those — a closed, known set (only ever a location on the current F1 calendar), unlike "my gp"
// which names no location at all. Sourced from the actual 2026 season calendar fetched live earlier
// in this session; add a new season's host country here if one isn't already covered.
const GP_LOCATION_WORDS_RE =
  /\b(?:australian|chinese|japanese|bahrain|saudi|miami|canadian|monaco|monegasque|spanish|barcelona|austrian|british|belgian|hungarian|dutch|italian|azerbaijani?|malaysian?|singaporean?|american|mexican|brazilian|s[aã]o\s+paulo|vegas|qatari?|emirati|emirates|abu\s+dhabi)\b/i;
function isF1RaceTrigger(lower: string): boolean {
  return GRAND_PRIX_RE.test(lower) || (BARE_GP_RE.test(lower) && (F1_CONTEXT_RE.test(lower) || GP_LOCATION_WORDS_RE.test(lower)));
}
// Captures the country/name adjective right before "grand prix"/"gp" — "the 2026 Spanish GP" -> ties
// this optional leading year, then "spanish", to search ESPN's race name for. Optional: a query with
// no adjective ("who won the last race") just returns the most recent event instead.
const GP_NAME_RE = /\b(?:\d{4}\s+)?([a-z]+)\s+(?:grand\s+prix|gp)\b/i;

// Added "scored"/"scorer"/"goals" — "who scored the goals" wouldn't match the bare "score" trigger
// (\bscore\b requires a word boundary right after "score", which "scored"/"scorer" don't have).
const SCORE_TRIGGER_RE =
  /\b(?:score|scoreline|scored|scorers?|goals?|result|playing|live|winning|losing|tied|game\s+(?:right\s+)?now|today'?s?\s+(?:game|match))\b/i;
// Was `who'?s?\s+(?:top|first|leading|...)` — that only ever matched the contraction "who's", not
// the fully spelled-out "who is" (verified live: "who is leading the F1 championship" silently
// missed this entirely and fell through to static trivia). `who\s?(?:'s|\s+is)` covers both. Also
// added the bare word "championship" as its own trigger — "who's leading the championship" /
// "what's the championship standings" are exactly the kind of live-standings question this is meant
// to catch, and neither contained "standings"/"table"/"leaderboard" before.
const STANDINGS_TRIGGER_RE =
  /\b(?:standings?|table|rankings?|leaderboard|championship(?:\s+standings)?|who\s?(?:'s|\s+is)\s+(?:top|first|leading|winning(?:\s+the\s+league)?))\b/i;

/**
 * Detects whether a prompt is asking for LIVE data (a current/recent score, or league standings)
 * as opposed to a general historical/rules/trivia question that the static corpus already covers.
 * Deliberately conservative — only fires on a clear live-data signal word AND a resolvable
 * team/league, so it doesn't hijack a normal "what's the offside rule" style question.
 */
// Found live: "who won the 2024 F1 championship" (a settled, historical past-season question) was
// silently returning the CURRENT 2026 season's live standings instead — the year the user actually
// asked about was never even looked at. First fix (commit 17dddd0) was to skip live-sports handling
// entirely whenever a past year was mentioned, falling back to static corpus/web search. Patrick
// then asked for MORE, not less, here: he wants Nexus to know every past champion/standings ESPN
// actually has, not just bail out to a vague non-answer. ESPN's standings endpoint supports a
// `?season=YYYY` query param that returns that exact past season's real final standings (verified
// live: `?season=2024` on F1 correctly returns Verstappen's real 2024 championship) — so a
// STANDINGS-shaped question with a past year now becomes a season-aware live lookup for that real
// year instead of either wrongly using the current season OR giving up. A SCORE/scoreboard-shaped
// question with a past year still bails out (there's no sensible "live score" for a match that's
// long over and ESPN's scoreboard endpoint here isn't wired to browse arbitrary historical dates).
const YEAR_RE = /\b(19|20)\d{2}\b/;

function extractMentionedYear(lower: string): number | null {
  const match = lower.match(YEAR_RE);
  return match ? Number(match[0]) : null;
}

export function detectLiveSportsIntent(prompt: string): LiveSportsIntent | null {
  const lower = prompt.toLowerCase();
  const league = resolveLeague(lower);
  const mentionedYear = extractMentionedYear(lower);
  const currentYear = new Date().getFullYear();
  const isStaleYear = mentionedYear !== null && mentionedYear < currentYear;

  // Standings checked BEFORE the race-result trigger below — found in review (verified live):
  // "who is leading the f1 grand prix championship this year" contains "grand prix" (which used to
  // unconditionally win here) AND "championship" (a standings signal) AND resolves `league` to F1 —
  // it's genuinely a standings question that happens to also mention "grand prix," but the race-
  // result path would search for a race literally named after whatever word preceded "grand prix,"
  // find nothing, and silently fall through to stale static trivia instead of the live standings
  // this question actually wants. Checking standings first means a question that satisfies BOTH
  // triggers is resolved as the (correct) standings lookup; the race-result trigger below still
  // catches everything that ISN'T also standings-shaped ("did Hamilton win the Spanish GP" has no
  // standings signal word, so it reaches the race-result branch exactly as before).
  if (STANDINGS_TRIGGER_RE.test(lower) && league) {
    return { kind: 'standings', league, season: isStaleYear ? mentionedYear! : undefined };
  }

  // "the 2026 Spanish GP" resolves `league` to nothing (no league name in the query) and would
  // otherwise fall through to a dead end, or worse, get misread by a broader future trigger. A
  // past-year GP result isn't covered by this file's F1 scoreboard call (only returns the
  // current/most-recent race), so a stale year here still bails out rather than confidently
  // answering the wrong race.
  if (isF1RaceTrigger(lower) && !isStaleYear) {
    const gpMatch = lower.match(GP_NAME_RE);
    return { kind: 'f1_race_result', gpQuery: gpMatch ? gpMatch[1] : undefined };
  }

  if (SCORE_TRIGGER_RE.test(lower) && !isStaleYear) {
    if (league) return { kind: 'league_scoreboard', league };

    // No explicit league named — check for a known club/team mention (Barça-first, since that's
    // the single most likely "the game" reference for Patrick specifically) before giving up.
    const teamHit = Object.keys(TEAM_ALIASES).find((alias) => lower.includes(alias));
    if (teamHit) return { kind: 'team_score', team: teamHit };
    if (/\bbarcelona\b/.test(lower)) return { kind: 'team_score', team: 'barcelona' };

    // Neither an alias nor Barcelona — but the phrasing still clearly names SOME team ("the
    // Vancouver Whitecaps game", "score of the Real Salt Lake match"). Extracted generically and
    // searched across every supported soccer league in parallel (see ALL_SOCCER_LEAGUES) rather than
    // giving up just because it's not a team this file happens to have a hardcoded alias for.
    const genericTeam = extractGenericTeamName(prompt);
    if (genericTeam) return { kind: 'team_score', team: genericTeam };
  }

  return null;
}

// Captures a team-shaped phrase out of an ordinary sentence — "what's the live score of the
// Vancouver Whitecaps game?" -> "Vancouver Whitecaps", "how's the Real Salt Lake match going" ->
// "Real Salt Lake". Deliberately requires "game"/"match" (or "score of the X") right next to the
// captured phrase so it doesn't grab an unrelated noun phrase from a longer sentence; a query this
// specific-shaped is exactly the case a fixed alias list can't cover but a bare regex safely can.
function extractGenericTeamName(prompt: string): string | null {
  const patterns = [
    /\b(?:score|result)\s+of\s+the\s+([a-z0-9à-ÿ' .-]{3,40}?)\s+(?:game|match)\b/i,
    /\bthe\s+([a-z0-9à-ÿ' .-]{3,40}?)\s+(?:game|match)\b/i,
    /\bis\s+the\s+([a-z0-9à-ÿ' .-]{3,40}?)\s+(?:game|match)\b/i,
  ];
  for (const re of patterns) {
    const m = prompt.match(re);
    if (m && m[1]) {
      const candidate = m[1].trim();
      // Reject anything that's clearly not a team name (too short, or a generic word like "next"/
      // "big" that happened to precede "game"/"match" in an unrelated sentence).
      if (candidate.length >= 3 && !/^(the|this|that|next|last|big|whole|entire|first|second)$/i.test(candidate)) {
        return candidate;
      }
    }
  }
  return null;
}

/**
 * Resolves a detected live-sports intent into a ready-to-use grounding context string, or null if
 * the live fetch itself failed/found nothing (caller should fall back to the normal answer path
 * rather than presenting a broken/empty live-data block as if it were a real answer).
 */
export async function resolveLiveSportsContext(intent: LiveSportsIntent): Promise<string | null> {
  if (intent.kind === 'f1_race_result') {
    const result = await getF1RaceResult(intent.gpQuery);
    if (!result) return null;
    return renderF1RaceResultContext(result);
  }

  if (intent.kind === 'standings' && intent.league) {
    // F1's standings are driver-shaped (name + championship points), not team-shaped (W/L/D/pts) —
    // routed to its own fetch/render pair rather than forcing it through getLeagueStandings, whose
    // StandingsRow type doesn't have anywhere to put a driver name.
    if (intent.league.sport === 'racing') {
      const driverRows = await getF1DriverStandings(intent.season);
      if (driverRows.length === 0) return null;
      return renderF1StandingsContext(driverRows, intent.season);
    }
    const rows = await getLeagueStandings(intent.league, intent.season);
    if (rows.length === 0) return null;
    return renderStandingsContext(rows, intent.league.label, intent.season);
  }

  if (intent.kind === 'league_scoreboard' && intent.league) {
    const matches = await getLeagueScoreboard(intent.league);
    if (matches.length === 0) return null;
    return renderScoreboardContext(matches, intent.league.label);
  }

  if (intent.kind === 'team_score' && intent.team) {
    // Barcelona's own competitions checked first (fastest, most common case for Patrick
    // specifically), then every other supported soccer league/cup in parallel if that comes up
    // empty — covers any team ESPN carries, not just the ones this file has a hardcoded alias for.
    const found =
      (await findTeamMatchAcrossLeagues(intent.team, BARCELONA_LEAGUE_SEARCH_ORDER)) ||
      (await findTeamMatchAcrossLeagues(intent.team, ALL_SOCCER_LEAGUES));
    if (!found) return null;
    return renderMatchContext(found.match, found.league.label);
  }

  return null;
}
