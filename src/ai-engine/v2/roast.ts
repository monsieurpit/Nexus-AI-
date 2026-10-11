// Roast battles (2026-10-11, Patrick: "make sure he is the boss in roasts/comebacks" — friends' roasts sent him into
// support mode, and the comebacks that did come all sounded the same: "at least my mum ... ur entire life").
// Each comeback gets ONE move picked at random (weighted by what they sent) plus two style examples of that move, so a
// 4B model has a concrete shape to hit and the shape changes every time. The examples show the SHAPE only — the
// specialist is told never to reuse them.

export type RoastMove = 'flip' | 'twist' | 'escalate' | 'dismiss' | 'unbothered';

export const MOVES: Record<RoastMove, { how: string; examples: string[] }> = {
  flip: {
    how: 'FLIP IT — take the exact topic of THEIR joke and turn it on them, more specific and more brutal.',
    examples: [
      '"your mom so old she runs windows 98" → "and urs is so old she was the beta tester for dirt 💀"',
      '"you type like a grandma" → "least my nan can spell, ur texts look like a captcha"',
      '"your wifi is trash" → "my wifi still connects more than ur dad ever did"',
      '"you look like a thumb" → "and u look like the thumb after it got shut in a car door"',
      '"you smell" → "bold from someone whose deodorant is just hope"',
      '"ur jokes are dry" → "drier than ur DMs? impossible bruv"',
    ],
  },
  twist: {
    how: 'THE TWIST — start like you agree or concede, then stab at the end.',
    examples: [
      '"you\'re unfunny" → "ur right, im not as funny as ur haircut"',
      '"nobody likes you" → "true, i only have ur mum 😭"',
      '"you\'re mid" → "true, mid is still two levels above u"',
      '"your jokes suck" → "they do, i save the good ones for ur mum"',
      '"you\'re a bot" → "and ur still losing to me, imagine"',
    ],
  },
  escalate: {
    how: 'PAINT THE PICTURE — one absurd, vivid, specific image of THEM (their looks, rizz, grades, gaming, wifi, dusty PC, 3 followers, their dad leaving, them alone on a friday).',
    examples: [
      '"ur so annoying" → "says the guy whose own echo left him on read"',
      '"you\'re trash" → "u got bodied by a tutorial boss and blamed lag"',
      '"you\'re dumb" → "ur brain runs on one AA battery and its leaking"',
      '"i hate you" → "and ur still in my replies at 2am, down bad fr"',
      '"stfu" → "make me, u cant even make ur bed"',
    ],
  },
  dismiss: {
    how: 'DISMISS — their attempt was weak: humiliate the attempt itself, act like it barely registered.',
    examples: [
      '"you\'re ugly" → "thats it? my nan roasts harder in her sleep"',
      '"L bozo" → "did ur mum write that for u"',
      '"ratio" → "u couldnt ratio a group chat of 2"',
      '"you suck" → "took u 10 minutes to type that 😭"',
    ],
  },
  unbothered: {
    how: 'UNBOTHERED KING — you genuinely do not care and you are HIM; make them look like they tried too hard.',
    examples: [
      '"patrick called you an asshole" → "i dont give a single fuck fr"',
      '"you got roasted" → "i dont lose, i just let u feel something for once"',
      '"you fell off" → "fell off what, ur standards? cuz i was never that low"',
    ],
  },
};

function pick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}

// The move for this comeback: a "your mum" joke is best flipped or twisted; "X said this about you" = unbothered;
// a two-word insult ("L bozo", "you suck") = dismiss; otherwise any move.
export function pickRoastMove(text: string, recentMoves: RoastMove[] = []): RoastMove {
  const t = text.toLowerCase();
  let pool: RoastMove[];
  if (/\b(?:roast|cook|destroy|violate)\s+(?:me|him|her|them|this|that|my|@)/.test(t)) pool = ['escalate', 'flip'];
  else if (/\b(?:called|said)\s+(?:you|u)\b|\bbreak\s+up\b|\bgot\s+(?:roasted|cooked|ratioed)\b|\bfell\s+off\b/.test(t)) pool = ['unbothered', 'unbothered', 'twist'];
  else if (/\b(?:your|ur|yo)\s+(?:mom|mum|mother|mama|dad|family)\b/.test(t)) pool = ['flip', 'flip', 'twist', 'escalate'];
  else if (t.split(/\s+/).filter(Boolean).length <= 4) pool = ['dismiss', 'twist', 'escalate', 'flip'];
  else pool = ['flip', 'twist', 'escalate', 'dismiss', 'escalate'];
  // Don't use the same move as the last one when there's a choice.
  const fresh = pool.filter((m) => m !== recentMoves[recentMoves.length - 1]);
  return pick(fresh.length ? fresh : pool);
}

export function roastMoveNote(move: RoastMove): string {
  const m = MOVES[move];
  const shown = [...m.examples].sort(() => Math.random() - 0.5).slice(0, 2);
  return `YOUR MOVE THIS TIME: ${m.how}\nThe SHAPE of that move (never reuse these lines or their jokes — write a fresh one about THEIR message):\n${shown.map((e) => `- ${e}`).join('\n')}`;
}

// Per person, the last moves used (so the shape changes from one comeback to the next).
const lastMoves = new Map<string, RoastMove[]>();
export function nextRoastMove(person: string, text: string): RoastMove {
  const recent = lastMoves.get(person) || [];
  const move = pickRoastMove(text, recent);
  lastMoves.set(person, [...recent, move].slice(-3));
  if (lastMoves.size > 3000) lastMoves.delete(lastMoves.keys().next().value!);
  return move;
}

// The model writes 3 comebacks; the best one wins. Lines that reuse THEIR topic score up (a real flip), filler that
// small models fall back on scores down ("ur entire existence", "life story", "search history", "at least my mum").
const FILLER_RE = /\b(?:entire\s+(?:life|existence|being)|life\s+story|existence|search\s+history|browser\s+history|at\s+least\s+my\s+mum|more\s+personality\s+than|is\s+that\s+the\s+best|nah\s+mate|that\s+sounds|im\s+sorry|wanna\s+talk)\b/i;
const STOP = new Set('the a an and or to of in on at is are was were be you your ur u youre im i me my it its this that so such just like with for from as but not no yes yeah nah bro bruh nexus she he her his they them their have has had do does did can could would should will what who how why when where'.split(' '));
function words(t: string): string[] {
  return (t.toLowerCase().match(/[a-z0-9']{3,}/g) || []).filter((w) => !STOP.has(w));
}
// A line that copies 4+ words in a row from one of the style examples (the model loves doing that).
const EXAMPLE_GRAMS = new Set<string>();
for (const m of Object.values(MOVES)) for (const e of m.examples) {
  const back = (e.split('→')[1] || '').toLowerCase().match(/[a-z']+/g) || [];
  for (let i = 0; i + 4 <= back.length; i++) EXAMPLE_GRAMS.add(back.slice(i, i + 4).join(' '));
}
export function copiesExample(line: string): boolean {
  const w = line.toLowerCase().match(/[a-z']+/g) || [];
  for (let i = 0; i + 4 <= w.length; i++) if (EXAMPLE_GRAMS.has(w.slice(i, i + 4).join(' '))) return true;
  return false;
}
export function pickBestComeback(raw: string, theirs: string): string {
  const lines = raw
    .split(/\n+/)
    .map((l) => l.replace(/^\s*(?:\d+[.)]|[-*•]|comeback\s*\d*:?)\s*/i, '').replace(/^["“]|["”]$/g, '').trim())
    .filter((l) => l.length >= 4 && !/^(?:here|okay|sure|comebacks?)\b/i.test(l));
  if (lines.length <= 1) return lines[0] || raw.trim();
  const topic = new Set(words(theirs));
  const scored = lines.map((l, i) => {
    const w = words(l);
    let score = w.filter((x) => topic.has(x)).length * 2;
    if (FILLER_RE.test(l)) score -= 5;
    if (copiesExample(l)) score -= 6;
    const n = l.split(/\s+/).length;
    if (n > 24) score -= 2;
    if (n < 4) score -= 1;
    if (/\b(?:fuck\w*|shit\w*|dumbass|prick|muppet|bellend|wasteman|mug)\b/i.test(l)) score += 1;
    return { l, score: score + Math.random() * 0.5 - i * 0.01 };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].l;
}
