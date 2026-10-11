// Route a list of messages and print mode / how / why:  bun run scripts/eval/routeList.ts "msg1" "msg2" ...
import { routeMessage } from '../../src/ai-engine/v2/router';
for (const q of process.argv.slice(2)) {
  const r = await routeMessage(q.replace(/^\s*nexus[\s,]*/i, ''));
  console.log(`${r.mode.padEnd(9)} ${r.by.padEnd(8)} ${String(r.reason).slice(0, 60).padEnd(61)} ${q.slice(0, 70)}`);
}
