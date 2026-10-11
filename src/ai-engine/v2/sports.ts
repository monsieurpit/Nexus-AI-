// Live football data from ESPN's public JSON (no key) — 2026-10-11, Patrick: "he doesn't know the Ligue 1
// leaderboard", "he can't see the top scorer and top assist leaderboards", "who is leading the Bundesliga — wrong and he
// surely didn't search ESPN", "was the red card from Gravenberch deserved today — should've searched".
// Web search results for tables were scraps from random sites (Polymarket, Facebook). This module reads the real data:
// tables, top scorers, top assists, recent results and red cards, and the search specialist answers from it.

// ESPN's CDN refuses anything that looks like a bot ("NexusBot", Bun's default agent): a normal browser agent.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const TIMEOUT_MS = 8000;
const CACHE_MS = 5 * 60 * 1000;

interface League { slug: string; name: string; re: RegExp }
const LEAGUES: League[] = [
  { slug: 'uefa.champions', name: 'UEFA Champions League', re: /\b(?:champions\s+league|ucl|ldc|ligue\s+des\s+champions)\b/i },
  { slug: 'uefa.europa', name: 'UEFA Europa League', re: /\beuropa(?:\s+league)?\b|\buel\b/i },
  { slug: 'eng.1', name: 'Premier League', re: /\b(?:premier\s+league|epl|prem|english\s+league)\b/i },
  { slug: 'esp.1', name: 'LaLiga', re: /\b(?:la\s*liga|laliga|spanish\s+league|liga\s+espa[nñ]ola)\b/i },
  { slug: 'ger.1', name: 'Bundesliga', re: /\b(?:bundesliga|german\s+league)\b/i },
  { slug: 'ita.1', name: 'Serie A', re: /\b(?:serie\s+a|italian\s+league|calcio)\b/i },
  { slug: 'fra.1', name: 'Ligue 1', re: /\b(?:ligue\s*1|ligue\s+un|french\s+league)\b/i },
  { slug: 'usa.1', name: 'MLS', re: /\b(?:mls|major\s+league\s+soccer)\b/i },
  { slug: 'por.1', name: 'Liga Portugal', re: /\b(?:liga\s+portugal|primeira\s+liga|portuguese\s+league)\b/i },
  { slug: 'ned.1', name: 'Eredivisie', re: /\beredivisie\b/i },
];
// A team named alone → its league.
const TEAM_LEAGUE: Array<[RegExp, string]> = [
  [/\b(?:barca|bar[cç]a|barcelona|real\s+madrid|vardrid|atletico|atl[eé]tico|sevilla|valencia|villarreal|betis|real\s+sociedad|athletic\s+bilbao|girona)\b/i, 'esp.1'],
  [/\b(?:liverpool|arsenal|man(?:chester)?\s+(?:city|utd|united)|chelsea|tottenham|spurs|newcastle|aston\s+villa|west\s+ham|everton|brighton|gravenberch|salah|haaland|saka|palmer)\b/i, 'eng.1'],
  [/\b(?:bayern|dortmund|bvb|leverkusen|leipzig|frankfurt|stuttgart|gladbach|kane|musiala)\b/i, 'ger.1'],
  [/\b(?:juventus|juve|inter|ac\s+milan|milan|napoli|roma|lazio|atalanta)\b/i, 'ita.1'],
  [/\b(?:psg|paris\s+saint[\s-]germain|paris\s+sg|marseille|om\b|lyon|monaco|lille|rennes|lens|nice|nuno\s+mendes|demb[eé]l[eé])\b/i, 'fra.1'],
  [/\b(?:cf\s+montr[eé]al|inter\s+miami|la\s+galaxy|lafc|toronto\s+fc|vancouver\s+whitecaps)\b/i, 'usa.1'],
];

const cache = new Map<string, { at: number; data: any }>();
async function getJson(url: string): Promise<any | null> {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (cache.size > 200) cache.delete(cache.keys().next().value!);
    cache.set(url, { at: Date.now(), data });
    return data;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function detectLeague(text: string): League | null {
  for (const l of LEAGUES) if (l.re.test(text)) return l;
  for (const [re, slug] of TEAM_LEAGUE) if (re.test(text)) return LEAGUES.find((l) => l.slug === slug) || null;
  return null;
}

type Want = 'table' | 'scorers' | 'assists' | 'results' | 'cards';
export function detectWant(text: string): Want[] {
  const t = text.toLowerCase();
  const out: Want[] = [];
  if (/\b(?:table|standings?|leaderboard|classement|tabelle|ranking|who(?:'s|\s+is)?\s+(?:leading|top|first|winning\s+the\s+league)|league\s+leader|points?)\b/.test(t)) out.push('table');
  if (/\b(?:top\s*scorers?|scorers?|goals?\s+leaders?|golden\s+boot|most\s+goals|buteurs?|torsch[uü]tzen|top\s+goal)\b/.test(t)) out.push('scorers');
  if (/\b(?:assists?|passeurs?|most\s+assists|playmakers?)\b/.test(t)) out.push('assists');
  if (/\b(?:red\s+cards?|yellow\s+cards?|cartons?|sent\s+off|sending\s+off|ejected)\b/.test(t)) out.push('cards');
  if (/\b(?:result|results|score|scores|scoreline|won|win|lose|lost|draw|drew|beat|match|game|fixture|yesterday|today|tonight|last\s+night|this\s+weekend)\b/.test(t) && !out.includes('cards')) out.push('results');
  return out.length ? out : ['table'];
}

async function table(l: League): Promise<string | null> {
  const d = await getJson(`https://site.api.espn.com/apis/v2/sports/soccer/${l.slug}/standings`);
  const groups: any[] = d?.children || [];
  if (!groups.length) return null;
  const season = d?.seasons?.[0]?.displayName || groups[0]?.standings?.seasonDisplayName || '';
  const lines: string[] = [];
  for (const g of groups.slice(0, l.slug.startsWith('uefa') ? 1 : 1)) {
    const entries: any[] = g?.standings?.entries || [];
    entries.slice(0, 20).forEach((e, i) => {
      const st: Record<string, string> = {};
      for (const s of e.stats || []) st[s.name] = s.displayValue;
      lines.push(`${st.rank || i + 1}. ${e.team?.displayName} — ${st.points ?? '?'} pts (${st.gamesPlayed ?? '?'} played, ${st.wins ?? '?'}W ${st.ties ?? '?'}D ${st.losses ?? '?'}L, GD ${st.pointDifferential ?? '?'})`);
    });
  }
  return lines.length ? `${l.name} ${season} TABLE (ESPN, live):\n${lines.join('\n')}` : null;
}

async function leaders(l: League, kind: 'goalsLeaders' | 'assistsLeaders'): Promise<string | null> {
  const d = await getJson(`https://site.web.api.espn.com/apis/site/v2/sports/soccer/${l.slug}/statistics`);
  const block = (d?.stats || []).find((s: any) => s.name === kind);
  if (!block?.leaders?.length) return null;
  const rows = block.leaders.slice(0, 10).map((x: any, i: number) => `${i + 1}. ${x.athlete?.displayName} (${x.athlete?.team?.displayName || '?'}) — ${x.displayValue}`);
  return `${l.name} ${d?.season?.displayName || ''} ${kind === 'goalsLeaders' ? 'TOP SCORERS' : 'TOP ASSISTS'} (ESPN, live):\n${rows.join('\n')}`;
}

function eventLine(e: any): string {
  const c = e?.competitions?.[0];
  const teams = (c?.competitors || []).map((t: any) => `${t.team?.displayName} ${t.score ?? ''}`.trim());
  const status = e?.status?.type?.shortDetail || e?.status?.type?.description || '';
  const when = e?.date ? new Date(e.date).toLocaleDateString('en-CA', { timeZone: 'America/Toronto', month: 'short', day: 'numeric' }) : '';
  return `${when}: ${teams.join(' – ')} (${status})`;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}
// One request per day (ESPN refuses date ranges for soccer): the last 4 days, today and tomorrow, oldest first.
async function recentEvents(l: League): Promise<any[]> {
  const now = Date.now();
  const days = [-4, -3, -2, -1, 0, 1].map((o) => ymd(new Date(now + o * 86400000 - 5 * 3600000))); // Quebec time
  const all = await Promise.all(days.map((d) => getJson(`https://site.api.espn.com/apis/site/v2/sports/soccer/${l.slug}/scoreboard?dates=${d}`)));
  const seen = new Set<string>();
  return all.flatMap((d) => d?.events || []).filter((e: any) => (seen.has(e.id) ? false : (seen.add(e.id), true)));
}

async function results(l: League, text: string): Promise<string | null> {
  const events = await recentEvents(l);
  if (!events.length) return null;
  const team = teamWords(text);
  const pick = team.length ? events.filter((e) => team.some((w) => JSON.stringify(e?.competitions?.[0]?.competitors?.map((c: any) => c.team?.displayName) || '').toLowerCase().includes(w))) : events;
  const list = (pick.length ? pick : events).slice(-12);
  return `${l.name} RECENT / UPCOMING MATCHES (ESPN, live):\n${list.map(eventLine).join('\n')}`;
}

// Red cards in the last few days of matches (from each match's key events).
async function cards(l: League, text: string): Promise<string | null> {
  const events = (await recentEvents(l)).filter((e) => e?.status?.type?.completed || e?.status?.type?.state === 'in');
  const out: string[] = [];
  for (const e of events.slice(-12)) {
    const s = await getJson(`https://site.api.espn.com/apis/site/v2/sports/soccer/${l.slug}/summary?event=${e.id}`);
    for (const k of s?.keyEvents || []) {
      const type = String(k?.type?.text || k?.type?.type || '');
      if (!/red\s*card/i.test(type)) continue;
      const who = (k?.participants || []).map((p: any) => p?.athlete?.displayName).filter(Boolean).join(', ');
      out.push(`${eventLine(e)} — RED CARD ${k?.clock?.displayValue || ''}: ${who || '?'} (${k?.team?.displayName || ''})${k?.text ? ` — ${String(k.text).slice(0, 160)}` : ''}`);
    }
  }
  const named = teamWords(text);
  const relevant = named.length ? out.filter((o) => named.some((w) => o.toLowerCase().includes(w))) : out;
  if (!relevant.length && !out.length) return `${l.name}: no red cards found in matches from the last 4 days (ESPN).`;
  return `${l.name} RED CARDS, last 4 days (ESPN, live):\n${(relevant.length ? relevant : out).join('\n')}`;
}

function teamWords(text: string): string[] {
  const t = text.toLowerCase();
  const out: string[] = [];
  for (const [re] of TEAM_LEAGUE) {
    const m = t.match(re);
    if (m) out.push(m[0].replace(/^(?:barca|barça)$/, 'barcelona').replace(/^vardrid$/, 'real madrid').replace(/^juve$/, 'juventus').replace(/^spurs$/, 'tottenham'));
  }
  return out;
}

// The facts block for a football question, or null when it isn't one (or ESPN didn't answer).
export async function sportsFacts(text: string): Promise<{ block: string; covered: boolean; titles: string[] } | null> {
  const league = detectLeague(text);
  if (!league) return null;
  const wants = detectWant(text);
  const parts = await Promise.all(
    wants.map((w) => (w === 'table' ? table(league) : w === 'scorers' ? leaders(league, 'goalsLeaders') : w === 'assists' ? leaders(league, 'assistsLeaders') : w === 'cards' ? cards(league, text) : results(league, text)))
  );
  const got = parts.filter(Boolean) as string[];
  if (!got.length) return null;
  // Tables, scorers and results are fully answered by the data; "was it deserved" still wants opinions from the web.
  const covered = !/\b(?:deserved|fair|why|should|opinion|controvers\w*|var)\b/i.test(text);
  return { block: got.join('\n\n'), covered, titles: wants.map((w) => `ESPN ${league.name} ${w}`) };
}
