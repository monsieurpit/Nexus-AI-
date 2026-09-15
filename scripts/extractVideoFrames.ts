/**
 * Pulls frames out of a Playwright-recorded .webm (see scripts/e2eBrowserCheck.ts --record) into
 * a numbered sequence of PNGs — the closest thing to "watching" a video that's actually possible
 * here: there is no way to play back a .webm directly, but a filmstrip of frames can genuinely be
 * looked at, one by one, via the Read tool. Uses Playwright's own bundled ffmpeg (installed
 * alongside its browsers) rather than requiring a separate system ffmpeg install.
 *
 * Run: bun run scripts/extractVideoFrames.ts <path-to-video.webm> [--fps 1] [--out <dir>]
 */
import { execFileSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import path from 'path';
import os from 'os';

const args = process.argv.slice(2);
const videoPath = args[0];
if (!videoPath || videoPath.startsWith('--')) {
  console.error('Usage: bun run scripts/extractVideoFrames.ts <path-to-video.webm> [--fps 1] [--out <dir>]');
  process.exit(1);
}
if (!existsSync(videoPath)) {
  console.error(`Video not found: ${videoPath}`);
  process.exit(1);
}

const fpsArgIdx = args.indexOf('--fps');
const fps = fpsArgIdx !== -1 ? args[fpsArgIdx + 1] : '1';
const outArgIdx = args.indexOf('--out');
const outDir =
  outArgIdx !== -1
    ? args[outArgIdx + 1]
    : path.join(process.cwd(), 'scripts', 'e2e-frames', path.basename(videoPath, '.webm'));
mkdirSync(outDir, { recursive: true });

// Playwright caches its bundled ffmpeg under a version-numbered folder (ffmpeg-<build>) inside its
// standard browser cache location — found by listing that cache dir rather than hardcoding a build
// number, since that number changes across playwright versions/reinstalls.
function findBundledFfmpeg(): string | null {
  const cacheRoot =
    process.env.PLAYWRIGHT_BROWSERS_PATH ||
    path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright'); // macOS default
  if (!existsSync(cacheRoot)) return null;
  const ffmpegDir = readdirSync(cacheRoot).find((d) => d.startsWith('ffmpeg-'));
  if (!ffmpegDir) return null;
  const candidates = ['ffmpeg-mac', 'ffmpeg-linux', 'ffmpeg.exe', 'ffmpeg'];
  for (const c of candidates) {
    const p = path.join(cacheRoot, ffmpegDir, c);
    if (existsSync(p)) return p;
  }
  return null;
}

const ffmpeg = findBundledFfmpeg();
if (!ffmpeg) {
  console.error('Could not find Playwright\'s bundled ffmpeg — run `bunx playwright install chromium` first.');
  process.exit(1);
}

console.log(`Extracting frames from ${videoPath} at ${fps} fps into ${outDir} ...`);
// Playwright's bundled ffmpeg is a minimal build (--disable-everything, only a handful of filters
// enabled — see its own -version output) that does NOT include the `fps` filter at all, so `-vf
// fps=N` fails outright ("No option name near ...") regardless of how N is formatted. `-r` as an
// OUTPUT option achieves the same resampling without needing a filter — it's handled by the muxer,
// not the filter graph — and this stripped build does support it.
execFileSync(ffmpeg, ['-y', '-i', videoPath, '-r', fps, path.join(outDir, 'frame-%03d.png')], {
  stdio: 'inherit',
});

const frames = readdirSync(outDir).filter((f) => f.endsWith('.png')).sort();
console.log(`\nExtracted ${frames.length} frames:`);
frames.forEach((f) => console.log(`  ${path.join(outDir, f)}`));
