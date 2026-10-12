// Send messages to the live engine like the Discord bot does and print each reply with its steps.
//   bun run scripts/eval/ask.ts "nexus hru" "nexus wyd"        (several messages = one conversation, in order)
//   bun run scripts/eval/ask.ts --steps "nexus who won the 1998 ucl final"
//   bun run scripts/eval/ask.ts --user 123 --name Gabberuuhh "nexus hi"
// evalRun: true, so tests never move the shared mood or feed the learning system.
const args = process.argv.slice(2);
let showSteps = false;
let userId = 'eval-ask';
let username = 'Tester';
let fresh = false;
let real = false; // --real: a normal request (personal memory saves it, mood/learning see it) — for testing memory
const msgs: string[] = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--steps') showSteps = true;
  else if (args[i] === '--user') userId = args[++i];
  else if (args[i] === '--name') username = args[++i];
  else if (args[i] === '--fresh') fresh = true; // each message on its own (no shared history)
  else if (args[i] === '--real') real = true;
  else msgs.push(args[i]);
}
const BASE = process.env.NEXUS_ENGINE_URL || 'http://localhost:3000';
const history: Array<{ role: string; content: string }> = [];
for (const message of msgs) {
  const t = Date.now();
  const res = await fetch(`${BASE}/api/v1/nexus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, userId, username, history: fresh ? [] : history, evalRun: !real }),
    signal: AbortSignal.timeout(200_000),
  });
  const j: any = await res.json().catch(() => ({}));
  const steps: any[] = j.thoughtSteps || [];
  const route = steps.find((s) => /^🧭 Router/.test(s.title || ''))?.title?.replace('🧭 Router → ', '') || '?';
  console.log(`\n> ${message}   [${route} · ${((Date.now() - t) / 1000).toFixed(1)}s]`);
  if (showSteps) for (const s of steps) console.log(`   · ${s.title} | ${String(s.description || '').replace(/\n/g, ' ⏎ ').slice(0, 260)}`);
  console.log(j.response ?? JSON.stringify(j).slice(0, 300));
  if (j.privacyNotice) console.log(`   [privacy notice attached for the bot to DM]`);
  history.push({ role: 'user', content: message }, { role: 'assistant', content: j.response ?? '' });
}
