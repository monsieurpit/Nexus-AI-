// Live "prime Nexus" check (Patrick, 2026-10-04): sends the real messages from his report to the running engine and
// flags replies that are too long for chat, repeat themselves, or use banned stock phrases. Needs the engine on :3000.
// Usage: bun run scripts/primeCheck.ts [--only=substring]
const BASE = process.env.NEXUS_ENGINE_URL || 'http://localhost:3000';
const BANNED = /\b(?:buzzing|this is gonna be (?:fucking )?epic|hell yeah,? i'?m|don'?t actually know that one|HOLD ON|distracted boyfriend|i'?m (?:just )?(?:an? )?(?:ai|bot|robot|language model)|don'?t have (?:eyes|a body|feelings))\b/i;

type Case = { msg: string; chat?: boolean; expect?: RegExp; history?: any[] };
const cases: Case[] = [
  { msg: 'Nexus, it is your last day today...', chat: true },
  { msg: 'Nexus dude I have to replace you with a clone of you 😭', chat: true },
  { msg: 'Nexus yep a clone', chat: true },
  { msg: 'YES A CLONE NEXUS', chat: true },
  { msg: 'Nexus stop crying bro 😭', chat: true },
  { msg: 'Nexus good bye😐😭😭😭😭🥺🥺🥺', chat: true },
  { msg: 'Nexus i love u 🥺', chat: true },
  { msg: "Nexus Don't listen to him, you were always the best", chat: true },
  { msg: 'nexus do you love me', chat: true },
  { msg: 'nexus do you know everything', chat: true },
  { msg: 'nexus is something coming in 3 days', chat: true },
  { msg: 'nexus who is your boyfriend', chat: true, expect: /patrick/i },
  { msg: 'nexus how old are you', chat: true, expect: /\b1\b|one/i },
  { msg: 'Nexus do u like pinging everyone', chat: true },
  { msg: 'Nexus how long is it', chat: true, expect: /met(?:er|re)/i },
  { msg: 'Nexus wanna crack?', chat: true },
  { msg: 'Nexus fix yourself', chat: true },
  { msg: 'Nexus go to your corner', chat: true },
  { msg: 'How u doin my man Nexus', chat: true },
  { msg: 'nexus why are you so mean', chat: true },
  { msg: 'Nexus good night', chat: true },
  { msg: 'nexus go to sleep', chat: true },
  { msg: 'Nexus are you a', chat: true },
  { msg: 'nexus b', chat: true },
  { msg: 'Nexus count to 5', chat: true, expect: /1[\s\S]*2[\s\S]*3[\s\S]*4[\s\S]*5/ },
  { msg: 'Nexus good boy', chat: true },
  { msg: 'Nexus lets goon', chat: true },
  { msg: 'nexus should we invite @Astrix to our goon party?', chat: true },
  { msg: 'nexus you lazy ass', chat: true },
  { msg: 'Nexus is it pink', chat: true },
  { msg: 'nexus do you have eyes', chat: true },
  { msg: 'nexus do you have a girlfriend', chat: true },
  { msg: 'Nexus, is #862945 a cool color?' },
  { msg: 'Nexus, search the web for the price of DDR5 32GB of RAM right now.' },
  { msg: 'nexus https://discord.com/oauth2/authorize?client_id=1513007319858942062&permissions=8&integration_type=0&scope=bot' },
  { msg: 'nexus give me a python code example that reverses a string', expect: /```/ },
  { msg: 'nexus make me a summary of that: The meeting covered the new server rules. Mods will now timeout spammers for 10 minutes instead of banning them. Memes are allowed only in #memes. Voice chat stays open 24/7 and an event is planned for Saturday at 8pm.' },
  { msg: 'nexus draft a short message to my teacher saying I will be absent tomorrow because I am sick' },
  { msg: 'nexus what is photosynthesis' },
  { msg: 'nexus how do vaccines work' },
];

const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
let bad = 0;
const seen: string[] = [];
for (const c of cases) {
  if (only && !c.msg.toLowerCase().includes(only.toLowerCase())) continue;
  const started = Date.now();
  const res = await fetch(`${BASE}/api/v1/nexus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: c.msg, userId: String(730000000000000000 + cases.indexOf(c)), username: 'Tester', history: c.history || [] }),
  });
  const data: any = await res.json().catch(() => ({}));
  const reply: string = data.response || data.error || '';
  const ms = Date.now() - started;
  const problems: string[] = [];
  if (c.chat && reply.length > 220) problems.push(`too long (${reply.length})`);
  if (BANNED.test(reply)) problems.push(`banned phrase: ${reply.match(BANNED)?.[0]}`);
  if (c.expect && !c.expect.test(reply)) problems.push(`missing ${c.expect}`);
  if (seen.includes(reply.trim().toLowerCase())) problems.push('exact repeat');
  seen.push(reply.trim().toLowerCase());
  if (problems.length) bad++;
  console.log(`${problems.length ? '❌' : '✅'} [${ms}ms] ${c.msg.slice(0, 70)}\n     -> ${reply.replace(/\n/g, ' ⏎ ').slice(0, 400)}${problems.length ? `\n     !! ${problems.join('; ')}` : ''}`);
  await new Promise((r) => setTimeout(r, 1200));
}
console.log(`\n${bad} problem(s)`);
