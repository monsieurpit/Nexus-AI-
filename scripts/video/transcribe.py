# Speech-to-text for Nexus video analysis (src/ai-engine/videoAnalyzer.ts). Runs in the MLX venv (~/nexus-mlx/.venv,
# packages mlx-whisper + imageio-ffmpeg). Whisper "small" (MLX): ~2 s for 2 min of audio on the M4, ~850 MB of RAM,
# freed when this process exits. Prints one JSON object: {"language": "en", "text": "...", "segments": [[start, text]...]}
import json, sys
import mlx_whisper

path = sys.argv[1]
model = sys.argv[2] if len(sys.argv) > 2 else "mlx-community/whisper-small-mlx"
r = mlx_whisper.transcribe(path, path_or_hf_repo=model, condition_on_previous_text=False)
print(json.dumps({
    "language": r.get("language"),
    "text": (r.get("text") or "").strip(),
    "segments": [[round(s["start"], 1), s["text"].strip()] for s in r.get("segments", []) if s.get("text", "").strip()],
}))
