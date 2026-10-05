# Video analysis (2026-10-05)

Nexus watches videos sent on Discord (attachments up to 100 MB) or uploaded on the website (up to 45 MB).

**How** (`src/ai-engine/videoAnalyzer.ts`, measured on the Mac mini M4, 2-minute 720p clip):
1. Metadata with ffmpeg: duration, resolution, fps, sound, title/creation tags — 0.01 s.
2. 12 frames spread over the whole video, tiled into one 4x3 collage — 0.5 s, ~100 MB.
3. Speech transcript with timestamps: Whisper small (MLX), `scripts/video/transcribe.py` — ~2-6 s, ~850 MB, freed after.
4. The vision model (qwen2.5vl:3b) reads the collage + the person's question — ~15 s.
3 and 4 run at the same time: **~18 s of analysis, ~30 s for the whole reply** (the chat model reloads after the
vision model). The specialists then answer from it like someone who watched it (timestamps, quotes).

**Memory**: the vision model temporarily takes the chat model's place in Ollama (it doesn't add to it), Whisper's
~850 MB is freed when it finishes — the 16 GB Mac doesn't run out.

**Setup (no admin)**: `uv pip install --python ~/nexus-mlx/.venv/bin/python mlx-whisper imageio-ffmpeg` (ffmpeg comes
with imageio-ffmpeg; it's linked as `~/.nexus-video/bin/ffmpeg`). The Whisper model downloads once (~480 MB) to the
Hugging Face cache. Env: `NEXUS_MLX_PYTHON`, `NEXUS_WHISPER_MODEL` (default `mlx-community/whisper-small-mlx`).

**Paths**: the bot forwards a video attachment as `videoUrl`; the website sends the upload as a `data:video/...` URL
(in `imageUrl`). The website never saves videos in the browser's history (localStorage would overflow) — only the name.
The engine log shows `[video] analysis ok {...timings}` per video.
