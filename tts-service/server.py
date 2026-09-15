"""
Local voice-cloning TTS microservice for Nexus AI — Coqui XTTS-v2, running fully offline on this
Mac (no cloud service, no API key), same "zero-quota" philosophy as the rest of this project (see
webSearchEngine.ts / weatherEngine.ts's own header comments in the main Node app).

Loads the XTTS-v2 model ONCE at process startup (large, ~15-30s cold load) and keeps it warm in
memory for every request after that — a per-request load would make every single reply take that
long. Clones the voice from a single reference clip (voices/reference.wav, replaced once Patrick
records his own sample) rather than a canned/generic voice.

Run: source venv/bin/activate && python server.py
Listens on 127.0.0.1:5050 by default (override with TTS_SERVICE_PORT) — matches the same
localhost-only, tunneled-when-needed pattern already used for Ollama in this project
(~/.nexus-tunnel/), since voice-over is only ever triggered by Patrick's own click, never a
background/automatic process.
"""
import io
import os
import threading

from flask import Flask, request, send_file, jsonify

os.environ.setdefault("COQUI_TOS_AGREED", "1")

PORT = int(os.environ.get("TTS_SERVICE_PORT", "5050"))
REFERENCE_WAV = os.environ.get(
    "TTS_REFERENCE_WAV", os.path.join(os.path.dirname(__file__), "voices", "reference.wav")
)

app = Flask(__name__)

_tts = None
_tts_lock = threading.Lock()
# The actual XTTS-v2 inference call itself (tts.tts(...)) is NOT thread-safe to run concurrently —
# PyTorch model state can get corrupted by two overlapping forward passes on the same instance.
# Flask now runs threaded=True (below) specifically so the process can still accept/respond to
# /health and reject malformed requests instantly even while a generation is in progress, but real
# generations are serialized through this lock so two overlapping /speak calls queue safely instead
# of racing on the model. Found live: an earlier single-threaded version let one stuck request block
# every subsequent request forever with no way to even health-check what was wrong.
_inference_lock = threading.Lock()


def get_tts():
    """Lazy singleton — the model loads on the FIRST real request instead of blocking server
    startup, so the process is reachable (for health checks) immediately, but the actual first
    /speak call pays the one-time ~15-30s load cost. Every call after that reuses the warm model."""
    global _tts
    if _tts is None:
        with _tts_lock:
            if _tts is None:
                from TTS.api import TTS

                print("Loading XTTS-v2 (one-time, ~15-30s)...", flush=True)
                _tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
                print("XTTS-v2 loaded and ready.", flush=True)
    return _tts


@app.route("/health", methods=["GET"])
def health():
    has_reference = os.path.exists(REFERENCE_WAV)
    return jsonify({"status": "ok", "modelLoaded": _tts is not None, "hasReferenceVoice": has_reference})


@app.route("/speak", methods=["POST"])
def speak():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()
    language = data.get("language") or "en"

    if not text:
        return jsonify({"error": "text is required"}), 400
    if not os.path.exists(REFERENCE_WAV):
        return jsonify({"error": "no reference voice recorded yet — see tts-service/voices/README.md"}), 412

    # XTTS-v2 has a real per-call text length limit (roughly ~250 chars per language before
    # quality/stability degrades) — chunk on sentence boundaries and synthesize each piece, then
    # concatenate, rather than truncating a long reply to just its first sentence.
    chunks = _chunk_text(text, max_len=240)

    tts = get_tts()
    import numpy as np
    import soundfile as sf

    audio_parts = []
    sample_rate = 24000
    with _inference_lock:
        for chunk in chunks:
            wav = tts.tts(text=chunk, speaker_wav=REFERENCE_WAV, language=language)
            audio_parts.append(np.array(wav, dtype=np.float32))

    combined = np.concatenate(audio_parts) if len(audio_parts) > 1 else audio_parts[0]

    buffer = io.BytesIO()
    sf.write(buffer, combined, sample_rate, format="WAV")
    buffer.seek(0)
    return send_file(buffer, mimetype="audio/wav")


def _chunk_text(text: str, max_len: int) -> list:
    """Splits on sentence boundaries first, then hard-wraps any single sentence that's still too
    long on its own — never mid-word, so a truncation never happens inside chunking itself."""
    import re

    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks: list = []
    current = ""
    for sentence in sentences:
        candidate = f"{current} {sentence}".strip() if current else sentence
        if len(candidate) <= max_len:
            current = candidate
        else:
            if current:
                chunks.append(current)
            if len(sentence) <= max_len:
                current = sentence
            else:
                words = sentence.split(" ")
                piece = ""
                for word in words:
                    cand = f"{piece} {word}".strip() if piece else word
                    if len(cand) <= max_len:
                        piece = cand
                    else:
                        if piece:
                            chunks.append(piece)
                        piece = word
                current = piece
    if current:
        chunks.append(current)
    return chunks if chunks else [text[:max_len]]


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=PORT, debug=False, threaded=True)
