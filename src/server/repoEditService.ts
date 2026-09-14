// "Nexus Code" — repo-editing service, native to the Nexus AI website itself (not the Discord
// bot's dashboard — that was a earlier misstep this session; this is the real home for the
// feature, reachable from a "Code" toggle right next to the normal chat view).
//
// Shallow-clones a user's own repo into a per-request temp dir, reads one named file, asks the
// local AI engine (via a loopback call to this same server's own /api/v1/nexus, reusing the
// already-verified codeEditRequest -> code-architect -> nexus-12b path) to rewrite it, diffs the
// result, and — only after explicit approval on the frontend — commits and pushes with the
// user's own token. Owns the single global concurrency lock: this Mac mini is documented
// elsewhere (localLlmClient.ts) as already tight on memory with nexus-12b loaded, so only one
// edit request may be in flight across the whole server at a time.
import { randomUUID } from 'crypto';
import { mkdtemp, readFile as fsReadFile, writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { tmpdir } from 'os';
import { join, normalize, isAbsolute } from 'path';
import simpleGit from 'simple-git';
import { createTwoFilesPatch, diffLines, type Change } from 'diff';

const MAX_FILE_BYTES = 200 * 1024; // one file, not a whole-codebase refactor — v1 scope
const CLONE_TIMEOUT_MS = 30_000;
const PENDING_TTL_MS = 10 * 60 * 1000;
const SELF_PORT = process.env.PORT || 3000;

let lockHolder: { requestId: string; acquiredAt: number } | null = null;

interface PendingRequest {
  dir: string;
  repoUrl: string;
  filePath: string;
  instruction: string;
  oldContent: string;
  newContent: string;
  diffText: string;
  createdAt: number;
}

const pendingRequests = new Map<string, PendingRequest>();

function acquireLock(requestId: string): boolean {
  if (lockHolder) return false;
  lockHolder = { requestId, acquiredAt: Date.now() };
  return true;
}

function releaseLock(requestId: string) {
  if (lockHolder && lockHolder.requestId === requestId) lockHolder = null;
}

setInterval(() => {
  const now = Date.now();
  for (const [requestId, req] of pendingRequests.entries()) {
    if (now - req.createdAt > PENDING_TTL_MS) {
      cleanup(requestId).catch(() => {});
    }
  }
}, 60_000).unref();

export function validateRepoUrl(repoUrl: unknown): { owner: string; repo: string; clean: string } {
  if (typeof repoUrl !== 'string' || !repoUrl.trim()) {
    throw new Error('Repo URL is required.');
  }
  const trimmed = repoUrl.trim();
  const match = trimmed.match(/^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/i);
  if (!match) {
    throw new Error('Repo URL must look like https://github.com/<owner>/<repo>.');
  }
  return { owner: match[1], repo: match[2], clean: `https://github.com/${match[1]}/${match[2]}.git` };
}

export function validateFilePath(filePath: unknown): string {
  if (typeof filePath !== 'string' || !filePath.trim()) {
    throw new Error('File path is required.');
  }
  const trimmed = filePath.trim().replace(/^\/+/, '');
  const normalized = normalize(trimmed);
  if (isAbsolute(normalized) || normalized.startsWith('..')) {
    throw new Error('File path must be a relative path inside the repo.');
  }
  return normalized;
}

async function cloneAndReadFile(opts: { repoUrl: string; filePath: string; githubToken: string }) {
  const { clean } = validateRepoUrl(opts.repoUrl);
  const safeFilePath = validateFilePath(opts.filePath);

  const dir = await mkdtemp(join(tmpdir(), 'nexus-codeedit-'));
  const authedUrl = opts.githubToken
    ? clean.replace('https://', `https://x-access-token:${encodeURIComponent(opts.githubToken)}@`)
    : clean;

  const git = simpleGit({ timeout: { block: CLONE_TIMEOUT_MS } });
  try {
    await git.clone(authedUrl, dir, ['--depth', '1']);
  } catch (err: any) {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
    const msg = String(err?.message || err);
    if (/authentication|403|could not read/i.test(msg)) {
      throw new Error('Could not clone the repo — check the repo URL and that the token has access to it.');
    }
    throw new Error('Could not clone the repo — it may not exist or may be unreachable.');
  }

  const absoluteFilePath = join(dir, safeFilePath);
  if (!absoluteFilePath.startsWith(dir)) {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
    throw new Error('Invalid file path.');
  }
  if (!existsSync(absoluteFilePath)) {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
    throw new Error(`File "${safeFilePath}" was not found in this repo.`);
  }

  const buf = await fsReadFile(absoluteFilePath).catch(() => null);
  if (!buf) {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
    throw new Error(`Could not read "${safeFilePath}".`);
  }
  if (buf.byteLength > MAX_FILE_BYTES) {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
    throw new Error(`"${safeFilePath}" is too large for Nexus Code (v1 limit: ${Math.round(MAX_FILE_BYTES / 1024)}KB, one file at a time).`);
  }

  return { dir, safeFilePath, oldContent: buf.toString('utf8'), repoUrl: clean };
}

function computeDiff(filePath: string, oldContent: string, newContent: string) {
  const patch = createTwoFilesPatch(filePath, filePath, oldContent, newContent, '', '', { context: 3 });
  const lineDiff: Change[] = diffLines(oldContent, newContent);
  return { patch, lineDiff, changed: oldContent !== newContent };
}

/**
 * Loopback call into this same server's already-verified /api/v1/nexus code-edit path
 * (codeEditRequest -> code-architect persona -> nexus-12b, bypassing the conversational
 * pipeline entirely — see server.ts). Reusing that endpoint instead of re-implementing the
 * persona/model routing here keeps there being exactly one place that logic lives.
 */
async function generateEdit(oldContent: string, filePath: string, instruction: string): Promise<string> {
  const prompt =
    `Given this file's exact current content (path: ${filePath}), apply the following instruction ` +
    `and output ONLY the complete modified file content — no markdown fences, no explanation, ` +
    `nothing before or after the file content.\n\n` +
    `Instruction: ${instruction}\n\n` +
    `--- Current file content ---\n${oldContent}\n--- End of file ---`;

  const res = await fetch(`http://127.0.0.1:${SELF_PORT}/api/v1/nexus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, codeEditRequest: true }),
    signal: AbortSignal.timeout(100_000),
  });
  const data = await res.json();
  const text: string = data?.response || data?.text || '';
  return text.replace(/^```[\w-]*\n?/, '').replace(/```\s*$/, '').trim() + '\n';
}

export async function proposeEdit(opts: { repoUrl: string; filePath: string; instruction: string; githubToken: string }) {
  if (typeof opts.instruction !== 'string' || !opts.instruction.trim()) {
    throw new Error('An instruction describing the change is required.');
  }

  const requestId = randomUUID();
  if (!acquireLock(requestId)) {
    const err: any = new Error('Nexus is already working on another repo edit — try again in a minute.');
    err.code = 'BUSY';
    throw err;
  }

  try {
    const { dir, safeFilePath, oldContent, repoUrl: cleanUrl } = await cloneAndReadFile(opts);

    let newContent: string;
    try {
      newContent = await generateEdit(oldContent, safeFilePath, opts.instruction.trim());
    } catch (err: any) {
      await rm(dir, { recursive: true, force: true }).catch(() => {});
      throw new Error(`Nexus couldn't generate a change: ${err.message}`);
    }

    if (!newContent || !newContent.trim()) {
      await rm(dir, { recursive: true, force: true }).catch(() => {});
      throw new Error('Nexus returned an empty response — try rephrasing the instruction.');
    }

    const { patch, lineDiff, changed } = computeDiff(safeFilePath, oldContent, newContent);
    if (!changed) {
      await rm(dir, { recursive: true, force: true }).catch(() => {});
      throw new Error("Nexus didn't propose any actual change to this file — try a more specific instruction.");
    }

    pendingRequests.set(requestId, {
      dir,
      repoUrl: cleanUrl,
      filePath: safeFilePath,
      instruction: opts.instruction.trim(),
      oldContent,
      newContent,
      diffText: patch,
      createdAt: Date.now(),
    });

    return { requestId, filePath: safeFilePath, patch, lineDiff, changed };
  } catch (err) {
    releaseLock(requestId);
    throw err;
  }
}

export async function applyEdit(opts: { requestId: string; githubToken: string }) {
  const req = pendingRequests.get(opts.requestId);
  if (!req) throw new Error('This proposed change has expired or was already resolved.');

  try {
    await writeFile(join(req.dir, req.filePath), req.newContent, 'utf8');

    const git = simpleGit({ baseDir: req.dir, timeout: { block: CLONE_TIMEOUT_MS } });
    await git.addConfig('user.name', 'Nexus Code');
    await git.addConfig('user.email', 'nexus-code@noreply.local');
    await git.add(req.filePath);
    await git.commit(`Nexus Code: ${req.instruction}`.slice(0, 200));

    const authedUrl = req.repoUrl.replace('https://', `https://x-access-token:${encodeURIComponent(opts.githubToken)}@`);
    try {
      await git.push(authedUrl, 'HEAD');
    } catch (err: any) {
      const msg = String(err?.message || err);
      if (/authentication|403|could not read/i.test(msg)) {
        throw new Error('Push rejected — check that the token has write access to this repo.');
      }
      if (/protected branch|rejected/i.test(msg)) {
        throw new Error('Push rejected by the remote (branch protection or a stale ref) — pull the latest changes and try again.');
      }
      throw new Error(`Push failed: ${msg}`);
    }

    const log = await git.log({ maxCount: 1 });
    const commitSha = log.latest?.hash || null;
    const { owner, repo } = validateRepoUrl(req.repoUrl);
    const commitUrl = commitSha ? `https://github.com/${owner}/${repo}/commit/${commitSha}` : null;

    return { commitSha, commitUrl };
  } finally {
    await cleanup(opts.requestId);
  }
}

export async function rejectEdit(requestId: string) {
  if (pendingRequests.has(requestId)) await cleanup(requestId);
}

export async function cleanup(requestId: string) {
  const req = pendingRequests.get(requestId);
  pendingRequests.delete(requestId);
  releaseLock(requestId);
  if (req?.dir) {
    await rm(req.dir, { recursive: true, force: true }).catch(() => {});
  }
}

export function getPendingRequest(requestId: string) {
  const req = pendingRequests.get(requestId);
  if (!req) return null;
  return { filePath: req.filePath, diffText: req.diffText, createdAt: req.createdAt };
}

export function lockStatus() {
  return { locked: lockHolder !== null, since: lockHolder?.acquiredAt || null };
}
