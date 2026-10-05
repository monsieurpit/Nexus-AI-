// Router accuracy on the test bank: which specialist the v2 router picks for every message vs. the label.
//   bun run scripts/eval/routeCheck.ts [--no-model]
import { CASES } from './cases';
import { routeMessage } from '../../src/ai-engine/v2/router';

let ok = 0;
const byHow = new Map<string, { n: number; ok: number }>();
const confusion: string[] = [];
for (const c of CASES) {
  const r = await routeMessage(c.msg);
  const hit = r.mode === c.mode || (c.alt || []).includes(r.mode as any);
  if (hit) ok++;
  const h = byHow.get(r.by) || { n: 0, ok: 0 };
  h.n++;
  if (hit) h.ok++;
  byHow.set(r.by, h);
  if (!hit) confusion.push(`  ${c.mode.padEnd(8)} → ${r.mode.padEnd(8)} [${r.by}: ${r.reason}] ${c.msg.slice(0, 70)}`);
}
console.log(confusion.join('\n'));
console.log(`\nrouter: ${ok}/${CASES.length} (${Math.round((100 * ok) / CASES.length)}%)`);
for (const [k, v] of byHow) console.log(`  by ${k.padEnd(9)} ${v.ok}/${v.n}`);
process.exit(0);
