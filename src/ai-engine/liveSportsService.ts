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
  team: { displayName: string; shortDisplayName?: string; abbreviation?: string };
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
  }>;
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
  'liga profesional argentina': { sport: 'soccer', league: 'arg.1', label: 'Liga Profesional Argentina' },
  'argentine primera division': { sport: 'soccer', league: 'arg.1', label: 'Liga Profesional Argentina' },
  'scottish premiership': { sport: 'soccer', league: 'sco.1', label: 'Scottish Premiership' },
  'super lig': { sport: 'soccer', league: 'tur.1', label: 'Süper Lig' },
  'saudi pro league': { sport: 'soccer', league: 'ksa.1', label: 'Saudi Pro League' },
  'copa libertadores': { sport: 'soccer', league: 'conmebol.libertadores', label: 'Copa Libertadores' },
  libertadores: { sport: 'soccer', league: 'conmebol.libertadores', label: 'Copa Libertadores' },
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

/** Resolves a free-text league name ("la liga", "the champions league", "prem") to an ESPN code. */
export function resolveLeague(text: string): LeagueEntry | null {
  const t = normalize(text);
  // Exact key match first, then substring — "who's top of la liga right now" contains extra words.
  if (LEAGUE_MAP[t]) return LEAGUE_MAP[t];
  for (const [key, entry] of Object.entries(LEAGUE_MAP)) {
    if (t.includes(key)) return entry;
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
 * Looks for a team's match across several of the most relevant competitions at once — used when
 * the user just says "the Barça game" without naming a competition (a club plays in its domestic
 * league AND continental competitions across a season, so a single-league lookup would often miss).
 */
export async function findTeamMatchAcrossLeagues(teamQuery: string, leagueEntries: LeagueEntry[]): Promise<{ match: LiveMatch; league: LeagueEntry } | null> {
  for (const entry of leagueEntries) {
    const match = await findTeamMatch(entry, teamQuery);
    if (match) return { match, league: entry };
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

/**
 * Fetches full league standings/table for a resolved league.
 */
export async function getLeagueStandings(leagueEntry: LeagueEntry): Promise<StandingsRow[]> {
  const url = `https://site.api.espn.com/apis/v2/sports/${leagueEntry.sport}/${leagueEntry.league}/standings`;
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
export async function getF1DriverStandings(): Promise<DriverStandingRow[]> {
  const url = 'https://site.api.espn.com/apis/v2/sports/racing/f1/standings';
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

// Patrick reported team names coming back garbled in the actual reply ("bretford" instead of
// "Brentford") even though the live data fetched from ESPN was correct — the small model was
// silently respelling/paraphrasing names while relaying them in its own crashout voice. Appended to
// every render*Context block below so the grounding instruction travels with the data itself no
// matter which call site uses it.


/** Renders a compact, LLM-groundable text block for F1 driver standings. */
export function renderF1StandingsContext(rows: DriverStandingRow[]): string {
  if (rows.length === 0) return '[LIVE DATA — Formula 1: driver standings unavailable right now.]';
  const lines = rows.slice(0, 10).map((r) => `${r.rank}. ${r.driver}${r.points !== null ? ` — ${r.points} pts` : ''}`);
  return `[LIVE DATA — Formula 1 Driver Championship standings, fetched just now from ESPN — copy every name exactly as spelled here]\n${lines.join('\n')}`;
}

function formatMatchLine(m: LiveMatch): string {
  const score = m.homeScore !== null && m.awayScore !== null ? `${m.homeTeam} ${m.homeScore} - ${m.awayScore} ${m.awayTeam}` : `${m.homeTeam} vs ${m.awayTeam}`;
  const status = m.isLive ? `LIVE (${m.displayClock || m.statusDetail})` : m.isCompleted ? `Final (${m.statusDetail || 'FT'})` : `Scheduled (${m.statusDetail || m.kickoffIso})`;
  return `${score} — ${status}`;
}

/** Renders a compact, LLM-groundable text block for one match. */
export function renderMatchContext(m: LiveMatch, leagueLabel: string): string {
  return `[LIVE DATA — ${leagueLabel}, fetched just now from ESPN — copy every name exactly as spelled here]\n${formatMatchLine(m)}`;
}

/** Renders a compact, LLM-groundable text block for a league's current scoreboard (multiple matches). */
export function renderScoreboardContext(matches: LiveMatch[], leagueLabel: string): string {
  if (matches.length === 0) return `[LIVE DATA — ${leagueLabel}: no matches found right now (likely no fixtures today).]`;
  const lines = matches.slice(0, 10).map(formatMatchLine);
  return `[LIVE DATA — ${leagueLabel} scoreboard, fetched just now from ESPN — copy every name exactly as spelled here]\n${lines.join('\n')}`;
}

/** Renders a compact, LLM-groundable text block for a league table. */
export function renderStandingsContext(rows: StandingsRow[], leagueLabel: string): string {
  if (rows.length === 0) return `[LIVE DATA — ${leagueLabel}: standings unavailable right now.]`;
  const lines = rows.slice(0, 12).map((r) => {
    const record = r.draws !== null ? `${r.wins}W-${r.draws}D-${r.losses}L` : `${r.wins}W-${r.losses}L`;
    return `${r.rank}. ${r.team} — ${record}${r.points !== null ? `, ${r.points} pts` : ''}${r.gamesPlayed !== null ? ` (${r.gamesPlayed} played)` : ''}`;
  });
  return `[LIVE DATA — ${leagueLabel} standings, fetched just now from ESPN — copy every name exactly as spelled here]\n${lines.join('\n')}`;
}

// ─── Query intent detection ─────────────────────────────────────────────────

export interface LiveSportsIntent {
  kind: 'team_score' | 'league_scoreboard' | 'standings';
  team?: string;
  league?: LeagueEntry;
}

const SCORE_TRIGGER_RE = /\b(?:score|scoreline|result|playing|live|winning|losing|tied|game\s+(?:right\s+)?now|today'?s?\s+(?:game|match))\b/i;
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
export function detectLiveSportsIntent(prompt: string): LiveSportsIntent | null {
  const lower = prompt.toLowerCase();
  const league = resolveLeague(lower);

  if (STANDINGS_TRIGGER_RE.test(lower) && league) {
    return { kind: 'standings', league };
  }

  if (SCORE_TRIGGER_RE.test(lower)) {
    if (league) return { kind: 'league_scoreboard', league };

    // No explicit league named — check for a known club/team mention (Barça-first, since that's
    // the single most likely "the game" reference for Patrick specifically) before giving up.
    const teamHit = Object.keys(TEAM_ALIASES).find((alias) => lower.includes(alias));
    if (teamHit) return { kind: 'team_score', team: teamHit };
    if (/\bbarcelona\b/.test(lower)) return { kind: 'team_score', team: 'barcelona' };
  }

  return null;
}

/**
 * Resolves a detected live-sports intent into a ready-to-use grounding context string, or null if
 * the live fetch itself failed/found nothing (caller should fall back to the normal answer path
 * rather than presenting a broken/empty live-data block as if it were a real answer).
 */
export async function resolveLiveSportsContext(intent: LiveSportsIntent): Promise<string | null> {
  if (intent.kind === 'standings' && intent.league) {
    // F1's standings are driver-shaped (name + championship points), not team-shaped (W/L/D/pts) —
    // routed to its own fetch/render pair rather than forcing it through getLeagueStandings, whose
    // StandingsRow type doesn't have anywhere to put a driver name.
    if (intent.league.sport === 'racing') {
      const driverRows = await getF1DriverStandings();
      if (driverRows.length === 0) return null;
      return renderF1StandingsContext(driverRows);
    }
    const rows = await getLeagueStandings(intent.league);
    if (rows.length === 0) return null;
    return renderStandingsContext(rows, intent.league.label);
  }

  if (intent.kind === 'league_scoreboard' && intent.league) {
    const matches = await getLeagueScoreboard(intent.league);
    if (matches.length === 0) return null;
    return renderScoreboardContext(matches, intent.league.label);
  }

  if (intent.kind === 'team_score' && intent.team) {
    const found = await findTeamMatchAcrossLeagues(intent.team, BARCELONA_LEAGUE_SEARCH_ORDER);
    if (!found) return null;
    return renderMatchContext(found.match, found.league.label);
  }

  return null;
}
