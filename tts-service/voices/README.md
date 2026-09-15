# Reference voice

Drop your recorded voice sample here as `reference.wav` (or any format ffmpeg/soundfile can read —
XTTS-v2 will resample it itself). ~20-60 seconds of clean, natural speech, no background noise or
music, normal conversational pace.

Once `reference.wav` exists in this folder, `tts-service/server.py`'s `/speak` endpoint will clone
that voice for every reply. No retraining/restart needed — it's read fresh on the next request
after the model is warm (just restart `server.py` once after adding/replacing the file).

This file is gitignored (a personal voice recording doesn't belong in a shared/public git history)
— it stays local to this machine only.
