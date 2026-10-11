// Images are turned into a JPEG of at most 1024 px before the vision model sees them (2026-10-11, Patrick: "99% of the
// time I send an image he says he couldn't analyse it"). Two causes, both seen in Ollama's log:
//   - big photos/screenshots became more than 4096 image tokens: "request exceeds the available context size", the
//     vision runner was killed;
//   - WebP/AVIF/HEIC images: "failed to decode buffer as either image or audio".
// sips ships with macOS (reads WebP, HEIC, PNG, GIF…); ffmpeg from the video tools is the fallback.

import { execFile } from 'child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { homedir, tmpdir } from 'os';
import { join } from 'path';

const MAX_SIDE = 1024;
const FFMPEG = join(homedir(), '.nexus-video', 'bin', 'ffmpeg');

function run(cmd: string, args: string[]): Promise<boolean> {
  return new Promise((resolve) => execFile(cmd, args, { timeout: 15000 }, (err) => resolve(!err)));
}

// Returns the JPEG as base64, or the original when every converter fails (the vision call then tries it as it is).
export async function normalizeImageForVision(base64: string): Promise<{ data: string; converted: boolean; bytes: number }> {
  const dir = mkdtempSync(join(tmpdir(), 'nexus-img-'));
  try {
    const input = join(dir, 'in');
    const output = join(dir, 'out.jpg');
    writeFileSync(input, Buffer.from(base64, 'base64'));
    let ok = await run('/usr/bin/sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', '-Z', String(MAX_SIDE), input, '--out', output]);
    if ((!ok || !existsSync(output)) && existsSync(FFMPEG)) {
      ok = await run(FFMPEG, ['-y', '-loglevel', 'error', '-i', input, '-frames:v', '1', '-vf', `scale='min(${MAX_SIDE},iw)':'min(${MAX_SIDE},ih)':force_original_aspect_ratio=decrease`, '-q:v', '3', output]);
    }
    if (ok && existsSync(output)) {
      const buf = readFileSync(output);
      if (buf.length > 0) return { data: buf.toString('base64'), converted: true, bytes: buf.length };
    }
  } catch {
    /* fall through to the original */
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  return { data: base64, converted: false, bytes: Math.round((base64.length * 3) / 4) };
}
