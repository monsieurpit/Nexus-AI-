// Runs the Python Nexus writes, in a sealed macOS sandbox (2026-10-12, Patrick: "build this!!" — his program for the
// Nexus Gauntlet found 0 solutions but his written answer invented two, because he couldn't run it). The output comes
// back and he rewrites the answer from it (pipeline.ts).
//
// The seal (sandbox-exec, tested): no network, no file writes (except /dev/null), no reading anything under /Users
// (your saved messages, the plist with the Browserless key, SSH keys…), no starting other programs (only python3
// itself), 25 s of CPU, a process cap, 20 s wall clock, output capped. A fresh temp folder per run, deleted after.

import { execFile } from 'child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

// The real interpreter (/usr/bin/python3 is a launcher that needs the developer env): Xcode's, or the Command Line Tools'.
const PYTHON = ['/Applications/Xcode.app/Contents/Developer/usr/bin/python3', '/Library/Developer/CommandLineTools/usr/bin/python3'].find((p) => existsSync(p)) || '/usr/bin/python3';
const MAX_OUT = 6000;

export interface RunResult { ok: boolean; stdout: string; stderr: string; timedOut: boolean; ms: number }

function profile(dir: string): string {
  return `(version 1)
(deny default)
(allow process-exec* (literal "${PYTHON}") (subpath "/Applications/Xcode.app/Contents/Developer/Library/Frameworks/Python3.framework") (subpath "/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework"))
(allow process-fork)
(allow file-read*)
(deny file-read* (subpath "/Users"))
(allow file-read* (subpath "${dir}"))
(allow file-write* (literal "/dev/null"))
(allow sysctl-read)
(allow mach-lookup)
(deny network*)
`;
}

export function runPythonSandboxed(code: string, timeoutMs = 20_000): Promise<RunResult> {
  const dir = mkdtempSync(join(tmpdir(), 'nexus-run-'));
  const t0 = Date.now();
  writeFileSync(join(dir, 'main.py'), code);
  writeFileSync(join(dir, 'p.sb'), profile(dir));
  const cmd = `ulimit -t 25; ulimit -u 256 2>/dev/null; exec /usr/bin/sandbox-exec -f "${dir}/p.sb" ${PYTHON} -I -B "${dir}/main.py" < /dev/null`;
  return new Promise((resolve) => {
    execFile('/bin/sh', ['-c', cmd], { timeout: timeoutMs, killSignal: 'SIGKILL', maxBuffer: 2 * 1024 * 1024, cwd: dir, env: { PATH: '/usr/bin:/bin', HOME: dir, LANG: 'en_US.UTF-8' } }, (err, stdout, stderr) => {
      rmSync(dir, { recursive: true, force: true });
      const timedOut = Boolean(err && ((err as any).killed || (err as any).signal === 'SIGKILL'));
      resolve({ ok: !err, stdout: String(stdout).slice(0, MAX_OUT), stderr: String(stderr).slice(-2000), timedOut, ms: Date.now() - t0 });
    });
  });
}

// The Python program in a reply (the first ```python block), or null.
export function pythonBlock(reply: string): string | null {
  const m = reply.match(/```(?:python|py)\s*\n([\s\S]*?)```/i);
  return m && m[1].trim().length > 20 ? m[1] : null;
}

// Worth running: they want a RESULT (solve / find / count / verify…), not just code to keep.
export const WANTS_RESULT_RE = /\b(?:solve|solution|find|count|how\s+many|verify|check|determine|compute|calculate|enumerate|prove|exist|output|result|answer|test\s+it|run\s+it|what\s+does\s+(?:it|this)\s+print)\b/i;
