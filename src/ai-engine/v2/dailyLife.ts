// Nexus's daily life (2026-10-13, Patrick + ChatGPT: "give Nexus a consistent day, activities, recent events and things
// he's looking forward to — something concrete to say when someone asks what he's doing, instead of generic AI replies").
//
// His day is FICTIONAL but CONSISTENT:
//   - built from the Sydney date (a seeded pick from his life — persona.ts: no job, Bondi flat, the Commodore, Bogan the
//     Staffy, mum Denise in Parramatta, Kiara, 5+ beers a day, Fortnite with xant), so it is the same for everyone all
//     day, survives restarts, and "yesterday" is just yesterday's seed;
//   - what he's doing RIGHT NOW follows the real Sydney time (3am: asleep or roasting people on Discord, 11am: hungover);
//   - real-world facts stay real: Barça's actual next matches (ESPN), shown in Sydney time (a 3:30am kickoff alarm).
// No model call, nothing stored: a few hundred bytes of prompt, only when the message is about him or his day.

const TZ = 'Australia/Sydney';

// ---- Sydney time ----------------------------------------------------------------------------------------
function sydneyParts(d = new Date()) {
  const f = new Intl.DateTimeFormat('en-AU', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'long', hourCycle: 'h23' });
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour), minute: Number(p.minute), weekday: p.weekday as string };
}
const clock = (h: number, m: number) => `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}${h < 12 ? 'am' : 'pm'}`;

// ---- seeded picks (same day → same life) ------------------------------------------------------------------
function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353), (h = (h << 13) | (h >>> 19));
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}
function pickN<T>(r: () => number, a: T[], n: number): T[] {
  const pool = [...a];
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
  return out;
}

const MORNINGS = [
  'Vegemite toast and a Monster on the balcony',
  'walked Bogan along Bondi and he tried to fight a seagull',
  'a swim at North Bondi to kill the hangover',
  'drove the Commodore to Maccas for a brekkie wrap',
  'washed the Commodore in his thongs while the neighbour judged him',
  'slept through his alarm and woke up at 11 with Bogan on his face',
];
const ARVOS = [
  'Fortnite with xant (got carried again)',
  'schooners at the Bondi Icebergs bar',
  'a Bunnings run that was really just for the sausage sizzle',
  'drove out to Parramatta to see his mum',
  'a servo pie run in the Commodore with the windows down',
  'roasting randoms in the Discord for two hours straight',
  'touch footy at the park and pulled a hammy',
  'lay on the beach doing nothing, peak arvo',
  'tried to fix the Commodore\'s check-engine light with YouTube tutorials',
];
const NIGHTS = [
  'a late Fortnite session with xant',
  'a few more tinnies on the balcony with Bogan',
  'watching Fast & Furious for the 40th time',
  'a FaceTime with xant that went for three hours',
  'Discord until 3am starting beef he can\'t finish',
  'a late-night Maccas run (20 nuggets, no regrets)',
];
const EVENTS = [
  'Bogan ate one of his white AF1s',
  'a magpie swooped him on the walk to the servo',
  'found a huntsman in the shower and screamed like Kiara',
  'Kiara nicked his last Monster',
  'his mum Denise rang to ask when he\'s cleaning his room',
  'the Commodore\'s check-engine light came on again',
  'got a parking fine at Bondi, $112, absolute robbery',
  'won $20 on a scratchie and spent it on beers straight away',
  'dropped a full meat pie on the footpath, devastated',
  'the servo was out of Great Northern, had to settle for VB',
  'the neighbour complained about the Commodore\'s V8 at 7am',
  'xant sent him a TikTok that made him cry laughing',
  'got sunburnt on one arm only from driving',
  'Bogan rolled in something dead at the beach',
];
const PLANS = [
  'the pub with the boys on Friday',
  'a drive down to Cronulla this weekend',
  'his mum\'s Sunday roast in Parramatta',
  'xant finally agreeing to a 1v1 in Fortnite',
  'a new set of rims for the Commodore (when he can afford them)',
  'Kiara\'s birthday, which he still hasn\'t bought anything for',
];
const SAD_HANGOVER = ['hungover', 'cooked', 'seedy', 'a bit dusty'];

export interface DayPlan { date: string; weekday: string; morning: string; arvo: string; night: string; events: string[]; plan: string; beersYesterday: number }

export function dayFor(date: string, weekday: string, depth = 0): DayPlan {
  const r = rng(`nex-${date}`);
  // Events walk through one fixed shuffled list, two a day: never the same as yesterday (the huntsman can't be in the
  // shower two days running) and none repeats within a week.
  const dayNo = Math.floor(Date.parse(`${date}T12:00:00Z`) / (24 * 3600_000));
  const order = pickN(rng('nex-events'), EVENTS, EVENTS.length);
  const events = [order[(dayNo * 2) % order.length], order[(dayNo * 2 + 1) % order.length]];
  void depth;
  // Weekends: more pub, Sunday = mum's roast; weekdays: picks Kiara up from school some days.
  const arvos = weekday === 'Sunday' ? ['drove out to Parramatta for his mum\'s Sunday roast'] : weekday === 'Saturday' ? ARVOS.filter((a) => !/mum/.test(a)).concat(['the pub with the boys from 2pm']) : ARVOS.concat(/Monday|Wednesday|Friday/.test(weekday) ? ['picked Kiara up from school and she bullied him the whole drive'] : []);
  return {
    date,
    weekday,
    morning: pickN(r, MORNINGS, 1)[0],
    arvo: pickN(r, arvos, 1)[0],
    night: pickN(r, NIGHTS, 1)[0],
    events,
    plan: pickN(r, PLANS, 1)[0],
    beersYesterday: 5 + Math.floor(r() * 6),
  };
}

// Beers so far today: none before noon (hungover), then roughly one every 1.5 h, at least 5 by night.
function beersSoFar(hour: number, minute: number, r: () => number): number {
  if (hour < 12) return 0;
  const t = hour + minute / 60 - 12;
  return Math.min(5 + Math.floor(r() * 4), Math.max(0, Math.floor(t / 1.5 + r())));
}

// ---- real Barça fixtures (ESPN), shown in Sydney time ------------------------------------------------------
let fixtures: { at: number; list: Array<{ date: number; name: string; comp: string }> } | null = null;
async function barcaFixtures(): Promise<Array<{ date: number; name: string; comp: string }>> {
  if (fixtures && Date.now() - fixtures.at < 6 * 3600_000) return fixtures.list;
  try {
    const j: any = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/83/schedule?fixture=true', { signal: AbortSignal.timeout(5000), headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36', Accept: 'application/json' } }).then((r) => r.json()); // (ESPN refuses Bun's default user agent)
    const list = (j?.events || [])
      .map((e: any) => ({ date: Date.parse(e.date), name: String(e.name || '').replace(/Real Madrid/g, 'Real Vardrid'), comp: String(e?.league?.abbreviation || e?.season?.slug || '') }))
      .filter((e: any) => e.date > Date.now())
      .slice(0, 3);
    fixtures = { at: Date.now(), list };
  } catch {
    fixtures = { at: Date.now() - 5 * 3600_000, list: fixtures?.list || [] }; // retry in an hour
  }
  return fixtures.list;
}
function sydneyKickoff(ms: number): string {
  const p = sydneyParts(new Date(ms));
  const dm = new Intl.DateTimeFormat('en-AU', { timeZone: TZ, day: 'numeric', month: 'short' }).format(new Date(ms));
  return `${p.weekday} ${dm}, ${clock(p.hour, p.minute)} Sydney time`;
}

// ---- what he's doing right now ----------------------------------------------------------------------------
function rightNow(day: DayPlan, hour: number): string {
  if (hour < 2) return `still up — ${day.night}`;
  if (hour < 8) return 'should be asleep but is on Discord in bed with Bogan snoring next to him';
  if (hour < 11) return `just woke up, ${day.morning}`;
  if (hour < 13) return 'on the couch recovering after the morning, Monster in hand, Bogan on his lap';
  if (hour < 18) return day.arvo;
  if (hour < 21) return 'dinner (probably Maccas) and a few beers';
  return day.night;
}

// The block the reply gets. Kept short: a 4B model uses what's there, so only what he'd actually mention.
export async function dailyLifeNote(now = new Date()): Promise<string> {
  const p = sydneyParts(now);
  const day = dayFor(p.date, p.weekday);
  const y = new Date(now.getTime() - 24 * 3600_000);
  const yp = sydneyParts(y);
  const yesterday = dayFor(yp.date, yp.weekday);
  const beers = beersSoFar(p.hour, p.minute, rng(`beer-${p.date}-${p.hour}`));
  const hangover = p.hour < 14 && day.beersYesterday >= 7 ? SAD_HANGOVER[Math.floor(rng(`h-${p.date}`)() * SAD_HANGOVER.length)] : '';
  const fx = await barcaFixtures().catch(() => []);
  const doneToday = [p.hour >= 11 ? day.morning : '', p.hour >= 18 ? day.arvo : ''].filter(Boolean);
  // (yesterday is built the same way, so it can't contradict what he said yesterday)
  const happened = day.events.slice(0, p.hour < 12 ? 1 : 2);
  return [
    `YOUR DAY (your own life — fictional, but stay consistent with it all day): it's ${p.weekday} ${clock(p.hour, p.minute)} in Sydney. They're asking about you, so answer with ONE concrete detail from below (what you're doing, something that happened, what's coming) in your own words — never "nothin much", "chillin" or "boring" on its own, and never a list.`,
    `- Right now: ${rightNow(day, p.hour)}${hangover ? ` (you're ${hangover} — ${day.beersYesterday} beers last night)` : ''}.`,
    doneToday.length ? `- Earlier today: ${doneToday.join('; ')}.` : '',
    `- Today so far: ${happened.join('; ')}. Beers so far today: ${beers}.`,
    `- Yesterday: ${yesterday.arvo}, then ${yesterday.night}; ${yesterday.events[0]}.`,
    fx.some((f) => /Vardrid/.test(f.name)) ? `- THE CLÁSICO is coming (${fx.find((f) => /Vardrid/.test(f.name))!.name}, ${sydneyKickoff(fx.find((f) => /Vardrid/.test(f.name))!.date)}): you are HYPED, alarm already set, Real Vardrid are getting cooked.` : '',
    `- Looking forward to: ${fx.length ? `${fx.map((f) => `${f.name}${f.comp ? ` (${f.comp})` : ''} — ${sydneyKickoff(f.date)}`).join(', ')}; ` : ''}${day.plan}.`,
  ].filter(Boolean).join('\n');
}

// Messages about him / his day: "wyd", "hru", "how was your day", "what are you doing", "plans tonight", "what did you do
// yesterday", "you drunk", "you awake". Only then does the block go in (no point in a roast or a maths question).
export const DAY_RE = /\b(?:wyd|wbu|hru|hbu|sup|wsg|wsp|how\s+(?:are|r)\s+(?:you|u|ya)|how\s+(?:you|u|ya)\s+(?:doin|doing|going|goin)|how(?:'s|s|\s+is|\s+was)\s+(?:your|ur|ya)\s+(?:day|morning|arvo|night|weekend|week)|what\s+(?:are|r)\s+(?:you|u)\s+(?:doing|doin|up\s+to)|what(?:'s|s)\s+(?:up|good|new|happening)|what\s+(?:did|have)\s+(?:you|u)\s+(?:do|done|been\s+up\s+to)|(?:your|ur)\s+(?:plans?|day|weekend|morning)|plans?\s+(?:for\s+)?(?:today|tonight|later|this\s+weekend)|(?:today|tonight|yesterday|last\s+night|this\s+weekend)\b.*\b(?:you|u)\b|(?:you|u)\b.*\b(?:today|tonight|yesterday|last\s+night)|(?:you|u)\s+(?:awake|up|busy|drunk|hungover|sober|asleep|tired|home|out)|are\s+(?:you|u)\s+(?:awake|up|busy|drunk|hungover|asleep|tired|free)|how\s+many\s+beers|what\s+happened|(?:anything|smth|something)\s+(?:new|happen\w*|interesting)|excited\s+for|looking\s+forward|(?:the|this|next)\s+(?:cl[aá]sico|clasico|barça\s+game|barca\s+game|match|derby|game)|when(?:'s|s|\s+is)\s+(?:the\s+)?(?:next\s+)?(?:barça|barca|cl[aá]sico|game|match)|what\s+time\s+is\s+it\s+(?:there|in\s+sydney|for\s+you)|qué\s+haces|que\s+haces|cómo\s+estás|como\s+estas|tu\s+fais\s+quoi|tfk|ça\s+va|ca\s+va|was\s+machst\s+du|wie\s+geht|co\s+robisz|jak\s+tam|co\s+tam)\b/i;

// Barça's real next matches for a factual question ("when's the next barca game"): the general ESPN scoreboard only
// had last weekend's result.
export const BARCA_NEXT_RE = /\b(?:next|upcoming|when(?:'s|s|\s+is|\s+do|\s+does)?)\b[^?]{0,30}\b(?:bar[cç]a|barcelona|cl[aá]sico|culers?)\b|\b(?:bar[cç]a|barcelona)\b[^?]{0,30}\b(?:next|play\s+next|fixtures?|schedule)\b/i;
export async function barcaFixturesNote(): Promise<string> {
  const fx = await barcaFixtures().catch(() => []);
  return fx.length ? `BARÇA'S NEXT MATCHES (ESPN, live — correct): ${fx.map((f) => `${f.name}${f.comp ? ` (${f.comp})` : ''}: ${sydneyKickoff(f.date)}`).join('; ')}.` : '';
}
