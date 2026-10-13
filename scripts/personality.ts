// Nexus's personality settings (v2/personality.ts) — no model change needed.
//   bun run scripts/personality.ts                 show the settings
//   bun run scripts/personality.ts set energy 9    change one (0-10): energy, sarcasm, verbosity, formality, warmth, bite
//   bun run scripts/personality.ts reset           back to his normal self
// The engine picks a change up within 10 seconds, no restart.

import { baseDials, setDials, DIALS, DEFAULT_DIALS } from '../src/ai-engine/v2/personality';

const [cmd, name, value] = process.argv.slice(2);
if (cmd === 'set') {
  if (!(DIALS as readonly string[]).includes(name) || !Number.isFinite(Number(value))) {
    console.log(`usage: set <${DIALS.join('|')}> <0-10>`);
    process.exit(1);
  }
  console.log(setDials({ [name]: Number(value) }));
} else if (cmd === 'reset') {
  console.log(setDials({ ...DEFAULT_DIALS }));
} else {
  const d = baseDials();
  for (const k of DIALS) console.log(`${k.padEnd(10)} ${'█'.repeat(d[k])}${'░'.repeat(10 - d[k])} ${d[k]}/10${d[k] !== DEFAULT_DIALS[k] ? `  (normal: ${DEFAULT_DIALS[k]})` : ''}`);
}
