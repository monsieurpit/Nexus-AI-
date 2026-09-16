#!/bin/bash
# Tails every log across the whole Nexus stack in one interleaved stream — the Node API server,
# the local voice-cloning TTS service, Ollama itself, and both Cloudflare tunnels. Built so one
# person watching one terminal can actually "track every single thing" instead of needing a
# separate tab per service. Each line is prefixed with which service it came from.
#
# Usage: scripts/tailAllLogs.sh

set -euo pipefail

NEXUS_LOG="/tmp/nexus-server.log"
TTS_OUT="$HOME/.nexus-tunnel/ttsserve.out.log"
TTS_ERR="$HOME/.nexus-tunnel/ttsserve.err.log"
OLLAMA_OUT="$HOME/.nexus-tunnel/ollamaserve.out.log"
OLLAMA_ERR="$HOME/.nexus-tunnel/ollamaserve.err.log"
OLLAMA_TUNNEL="$HOME/.nexus-tunnel/tunnel.log"
TTS_TUNNEL="$HOME/.nexus-tunnel/tts-tunnel.log"

# Only tail files that actually exist — a fresh machine won't have all of these yet, and this
# should degrade gracefully rather than erroring out on a missing one.
FILES=()
LABELS=()
add_if_exists() {
  if [[ -f "$1" ]]; then
    FILES+=("$1")
    LABELS+=("$2")
  fi
}
add_if_exists "$NEXUS_LOG" "nexus"
add_if_exists "$TTS_OUT" "tts-out"
add_if_exists "$TTS_ERR" "tts-err"
add_if_exists "$OLLAMA_OUT" "ollama-out"
add_if_exists "$OLLAMA_ERR" "ollama-err"
add_if_exists "$OLLAMA_TUNNEL" "ollama-tunnel"
add_if_exists "$TTS_TUNNEL" "tts-tunnel"

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No log files found yet — start the services first."
  exit 1
fi

echo "Tailing ${#FILES[@]} log file(s): ${LABELS[*]}"
echo "---"

# tail -F follows by name (survives log rotation/truncation), one process per file, each piping
# through sed to prefix its own label so interleaved output stays attributable.
for i in "${!FILES[@]}"; do
  tail -n 20 -F "${FILES[$i]}" 2>/dev/null | sed "s/^/[${LABELS[$i]}] /" &
done

wait
