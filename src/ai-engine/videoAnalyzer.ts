// Video understanding (Patrick, 2026-10-05: "analyse videos for real through Discord and the website... like ChatGPT,
// a 2-minute video in 15-30 seconds... without my Mac mini M4 16 GB running out").
// How (measured on the M4, 2-minute 720p video):
//   1. metadata from ffmpeg (duration, resolution, fps, sound, title/creation tags) ............ 0.01 s
//   2. 12 frames spread over the whole video, tiled into ONE 4x3 collage (480 px each) .......... 0.5 s, ~100 MB
//   3. the speech, transcribed by Whisper small (MLX, scripts/video/transcribe.py) ............... ~2-6 s, ~850 MB (freed)
//   4. the vision model (qwen2.5vl:3b) reads the collage + the person's question ................ ~15 s
//   (3) and (4) run at the same time; total ~20-30 s. Memory: the vision model (3.2 GB) temporarily takes the chat
//   model's place in Ollama instead of adding to it, so the Mac never runs out; the chat model reloads after (~6 s).
// No admin rights needed: ffmpeg comes from the imageio-ffmpeg package and Whisper from mlx-whisper, both in the
// MLX venv. The result is a plain-text description the specialists answer from, like an image description.

import { execFile } from 'child_process';
import { existsSync, mkdirSync, rmSync, symlinkSync, writeFileSync, createWriteStream, readFileSync, statSync } from 'fs';
import { homedir, tmpdir } from 'os';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { generateVision } from './localLlmClient';

const MLX_PY = process.env.NEXUS_MLX_PYTHON || join(homedir(), 'nexus-mlx/.venv/bin/python');
const WHISPER_MODEL = process.env.NEXUS_WHISPER_MODEL || 'mlx-community/whisper-small-mlx';
const BIN_DIR = join(homedir(), '.nexus-video/bin');
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const TRANSCRIBE_SCRIPT = process.env.NEXUS_TRANSCRIBE_SCRIPT || join(process.cwd(), 'scripts/video/transcribe.py');

function run(cmd: string, args: string[], timeoutMs: number, env?: NodeJS.ProcessEnv): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    execFile(cmd, args, { timeout: timeoutMs, maxBuffer: 20 * 1024 * 1024, env: env ?? process.env }, (err, stdout, stderr) => {
      resolve({ stdout: String(stdout), stderr: String(stderr), code: err ? (typeof (err as any).code === 'number' ? (err as any).code : 1) : 0 });
    });
  });
}

let ffmpegPath: string | null = null;
// The ffmpeg binary shipped with imageio-ffmpeg, symlinked as ~/.nexus-video/bin/ffmpeg (Whisper calls "ffmpeg").
async function ffmpeg(): Promise<string | null> {
  if (ffmpegPath && existsSync(ffmpegPath)) return ffmpegPath;
  const link = join(BIN_DIR, 'ffmpeg');
  if (!existsSync(link)) {
    const r = await run(MLX_PY, ['-c', 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())'], 20000);
    const exe = r.stdout.trim();
    if (!exe || !existsSync(exe)) return null;
    mkdirSync(BIN_DIR, { recursive: true });
    try {
      symlinkSync(exe, link);
    } catch {
      /* already there */
    }
  }
  ffmpegPath = link;
  return link;
}

export function videoAnalysisAvailable(): boolean {
  return existsSync(MLX_PY);
}

function isPrivateHost(raw: string): boolean {
  let host = '';
  try {
    host = new URL(raw).hostname.toLowerCase();
  } catch {
    return true;
  }
  if (!host || host === 'localhost' || /\.(?:localhost|local|internal)$/.test(host) || host.includes(':')) return true;
  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/);
  if (!v4) return false;
  const [a, b] = [Number(v4[1]), Number(v4[2])];
  return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
}

// A video URL (Discord attachment) or a data: URI / raw base64 (website upload) -> a temp file.
async function fetchToFile(source: string, dir: string): Promise<string | null> {
  const file = join(dir, 'video');
  const dataUri = source.match(/^data:video\/[\w.+-]+;base64,(.+)$/s);
  if (dataUri || (!/^https?:\/\//.test(source) && source.length > 1000)) {
    const buf = Buffer.from((dataUri ? dataUri[1] : source).replace(/\s/g, ''), 'base64');
    if (buf.length > MAX_VIDEO_BYTES) return null;
    writeFileSync(file, buf);
    return file;
  }
  if (!/^https?:\/\//.test(source) || isPrivateHost(source)) return null;
  const res = await fetch(source, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'NexusBot/2.0' } });
  if (!res.ok || !res.body) return null;
  if (Number(res.headers.get('content-length') || 0) > MAX_VIDEO_BYTES) return null;
  let bytes = 0;
  const capped = Readable.fromWeb(res.body as any).on('data', (c: Buffer) => {
    bytes += c.length;
    if (bytes > MAX_VIDEO_BYTES) capped.destroy(new Error('video too large'));
  });
  await pipeline(capped, createWriteStream(file));
  return file;
}

export interface VideoMeta {
  durationSec: number | null;
  width: number | null;
  height: number | null;
  fps: number | null;
  videoCodec: string | null;
  hasAudio: boolean;
  sizeMb: number;
  tags: Record<string, string>;
}

export function parseFfmpegInfo(stderr: string, sizeBytes = 0): VideoMeta {
  const dur = stderr.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  const v = stderr.match(/Stream #\S+.*?Video:\s*(\w+)[^\n]*?(\d{2,5})x(\d{2,5})/);
  const fpsM = stderr.match(/Stream #\S+.*?Video:[^\n]*?(\d+(?:\.\d+)?)\s*fps/);
  const tags: Record<string, string> = {};
  for (const m of stderr.matchAll(/^\s{4}(title|creation_time|artist|comment|encoder|location|com\.apple\.quicktime\.\w+)\s*:\s*(.+)$/gim)) tags[m[1]] = m[2].trim().slice(0, 120);
  return {
    durationSec: dur ? Number(dur[1]) * 3600 + Number(dur[2]) * 60 + Number(dur[3]) : null,
    width: v ? Number(v[2]) : null,
    height: v ? Number(v[3]) : null,
    fps: fpsM ? Number(fpsM[1]) : null,
    videoCodec: v ? v[1] : null,
    hasAudio: /Stream #\S+.*?Audio:/.test(stderr),
    sizeMb: Math.round((sizeBytes / 1048576) * 10) / 10,
    tags,
  };
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export interface VideoAnalysis {
  ok: boolean;
  description: string; // folded into the prompt: "[Attached video shows: ...]"
  timings: Record<string, number>;
  error?: string;
  // The parts, for the website's thinking panel.
  meta?: VideoMeta;
  frameTimes?: string[];
  seen?: string;
  transcript?: string;
  transcriptLanguage?: string | null;
}

export async function analyzeVideo(source: string, question = ''): Promise<VideoAnalysis> {
  const timings: Record<string, number> = {};
  const t0 = Date.now();
  if (!videoAnalysisAvailable()) return { ok: false, description: '', timings, error: 'video tools not installed (MLX venv missing)' };
  const ff = await ffmpeg();
  if (!ff) return { ok: false, description: '', timings, error: 'ffmpeg not available' };
  const dir = join(tmpdir(), `nexus-video-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  mkdirSync(dir, { recursive: true });
  try {
    const file = await fetchToFile(source, dir).catch(() => null);
    timings.download = Date.now() - t0;
    if (!file) return { ok: false, description: '', timings, error: 'could not download the video (too big, private address or expired link)' };

    // 1. Metadata.
    const info = await run(ff, ['-hide_banner', '-i', file], 15000);
    const meta = parseFfmpegInfo(info.stderr, statSync(file).size);
    if (!meta.durationSec || !meta.width) return { ok: false, description: '', timings, error: 'not a readable video' };
    timings.metadata = Date.now() - t0;

    // 2. 12 frames over the whole video, one 4x3 collage.
    const frames = 12;
    const grid = join(dir, 'grid.jpg');
    await run(ff, ['-y', '-loglevel', 'error', '-i', file, '-vf', `fps=${frames}/${Math.max(1, meta.durationSec)},scale=480:-2,tile=4x3`, '-frames:v', '1', '-q:v', '4', grid], 30000);
    timings.frames = Date.now() - t0;
    const gridB64 = existsSync(grid) ? readFileSync(grid).toString('base64') : null;

    // 3 + 4 at the same time: the speech and the pictures.
    const step = meta.durationSec / frames;
    const visionPrompt = `These are ${frames} frames from ONE video, in time order: left to right, top row first (frame 1 at ${mmss(0)}, frame ${frames} at about ${mmss(step * (frames - 1))}). Describe what happens in the video: the setting, people/objects, what changes between frames, any text on screen (copy it exactly), and the overall topic. 4-8 sentences.${question ? ` The person asks: "${question.slice(0, 300)}" — answer that precisely from what you see.` : ''}`;
    const [vision, speech] = await Promise.all([
      gridB64 ? generateVision(gridB64, visionPrompt, { timeoutMs: 60000 }) : Promise.resolve(null),
      meta.hasAudio && existsSync(TRANSCRIBE_SCRIPT)
        ? run(MLX_PY, [TRANSCRIBE_SCRIPT, file, WHISPER_MODEL], 90000, { ...process.env, PATH: `${BIN_DIR}:${process.env.PATH ?? ''}` }).then((r) => {
            timings.transcript = Date.now() - t0;
            try {
              return JSON.parse(r.stdout.trim().split('\n').pop() || '{}');
            } catch {
              return null;
            }
          })
        : Promise.resolve(null),
    ]);
    timings.vision = Date.now() - t0;

    const seen = (vision as any)?.status === 'success' ? String((vision as any).text).trim() : '(the frames could not be read)';
    let said = '(no sound)';
    if (meta.hasAudio) {
      // Whisper invents "you" / "Thank you." over silence: those lone segments are dropped.
      const segs: Array<[number, string]> = (speech?.segments || []).filter(([, s]: [number, string]) => !/^(?:you|thank\s+you\.?|thanks\s+for\s+watching!?|\.+)$/i.test(s.trim()));
      said = segs.length
        ? `${speech.language ? `(${speech.language}) ` : ''}${segs.map(([t, s]) => `[${mmss(t)}] ${s}`).join(' ').slice(0, 2500)}`
        : speech?.text
        ? String(speech.text).slice(0, 2500)
        : '(no speech, or only music/noise)';
    }
    const tagText = Object.entries(meta.tags).filter(([k]) => k !== 'encoder').map(([k, v]) => `${k}: ${v}`).join(', ');
    const description =
      `VIDEO ${mmss(meta.durationSec)} long, ${meta.width}x${meta.height}${meta.fps ? `, ${meta.fps} fps` : ''}, ${meta.hasAudio ? 'with sound' : 'no sound'}, ${meta.sizeMb} MB${tagText ? `, ${tagText}` : ''}. ` +
      `WHAT YOU SEE (12 frames from start to end): ${seen} ` +
      `WHAT IS SAID (speech transcript with timestamps): ${said}`;
    timings.total = Date.now() - t0;
    return {
      ok: true,
      description,
      timings,
      meta,
      frameTimes: Array.from({ length: frames }, (_, i) => mmss(step * i)),
      seen,
      transcript: said,
      transcriptLanguage: speech?.language ?? null,
    };
  } catch (err: any) {
    return { ok: false, description: '', timings, error: String(err?.message || err) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
