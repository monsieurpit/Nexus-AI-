#!/bin/bash
# After a Mac restart: is everything Nexus needs up? (Ollama service, engine, v2, keep-hot, tunnel, Railway, bot)
#   bash scripts/check-after-reboot.sh
# Prints ✅/❌ per check. Read-only: it changes nothing, except one test message (marked evalRun, so it is never learned
# from and never moves Nexus's mood).

RAILWAY="$HOME/.bun-1314/install/global/node_modules/@railway/cli/bin/railway"
T="$HOME/.nexus-tunnel"
ok() { echo "✅ $*"; }
bad() { echo "❌ $*"; }

echo "== launchd services"
for s in com.nexus.ollamaserve com.nexus.engine com.nexus.enginetunnel com.nexus.ttsserve com.nexus.ttstunnel; do
  st=$(launchctl print "gui/$UID/$s" 2>/dev/null | awk '/^\tstate =/{print $3; exit}')
  [[ "$st" == "running" ]] && ok "$s running" || bad "$s: ${st:-not loaded}"
done

echo "== Ollama"
owner=$(lsof -nP -iTCP:11434 -sTCP:LISTEN 2>/dev/null | awk 'NR==2{print $2}')
svc=$(launchctl print "gui/$UID/com.nexus.ollamaserve" 2>/dev/null | awk '/^\tpid =/{print $3; exit}')
if [[ -n "$owner" && "$owner" == "$svc" ]]; then ok "port 11434 owned by com.nexus.ollamaserve (pid $owner)"
elif [[ -n "$owner" ]]; then bad "port 11434 owned by pid $owner, NOT the service (the Ollama app's own server?) — quit the Ollama app, then: launchctl kickstart -k gui/\$UID/com.nexus.ollamaserve"
else bad "nothing listens on 11434"; fi
par=$(ps eww -p "${owner:-0}" 2>/dev/null | tr ' ' '\n' | grep -m1 '^OLLAMA_NUM_PARALLEL=' | cut -d= -f2)
[[ "$par" == "1" ]] && ok "OLLAMA_NUM_PARALLEL=1" || bad "OLLAMA_NUM_PARALLEL=${par:-unset} (should be 1)"
ps_json=$(curl -s -m 5 localhost:11434/api/ps)
if echo "$ps_json" | jq -e '.models[] | select(.name | startswith("nexus2"))' >/dev/null 2>&1; then
  ok "nexus2:4b loaded ($(echo "$ps_json" | jq -r '.models[] | select(.name | startswith("nexus2")) | "\((.size / 1e9 * 10 | floor) / 10) GB, expires \(.expires_at[0:4])"'))"
else bad "nexus2:4b not loaded (the engine warms it ~1 min after start)"; fi

echo "== Engine"
h=$(curl -s -m 10 localhost:3000/api/health)
[[ -n "$h" ]] && ok "engine answers on :3000" || bad "engine not answering on :3000"
[[ "$(echo "$h" | jq -r '.llm.available')" == "true" ]] && ok "engine sees the LLM" || bad "engine says LLM unavailable"
beats=$(echo "$h" | jq -r '.llm.keepHot.beats // 0'); [[ "$beats" -ge 1 ]] && ok "keep-hot heartbeat running ($beats beat(s), last $(echo "$h" | jq -r '.llm.keepHot.lastMs')ms)" || bad "no keep-hot beat yet (first one ~45 s after engine start)"
launchctl print "gui/$UID/com.nexus.engine" 2>/dev/null | grep -q "NEXUS_ROUTER => v2" && ok "NEXUS_ROUTER=v2" || bad "NEXUS_ROUTER is not v2"
echo "   search: $(echo "$h" | jq -c '.webSearch | {mode, usedToday, dailyLimit, pausedUntil}')"

echo "== Tunnel"
url=$(cat "$T/current-engine-url.txt" 2>/dev/null)
[[ -n "$url" ]] && ok "tunnel URL: $url" || bad "no tunnel URL in $T/current-engine-url.txt"
code=$(curl -s -o /dev/null -m 15 -w '%{http_code}' "$url/api/health")
[[ "$code" == "200" ]] && ok "engine reachable from the internet through the tunnel" || bad "tunnel health check returned HTTP $code"

echo "== Railway"
if [[ -x "$RAILWAY" ]]; then
  host="${url#https://}"
  bot=$(cd "$T" && "$RAILWAY" variables --service "Nexus-Bot-1-" --kv 2>/dev/null | grep '^NEXUS_API_URL=' | cut -d= -f2-)
  web=$(cd "$T" && "$RAILWAY" variables --service "Nexus-AI-" --kv 2>/dev/null | grep '^ENGINE_BASE_URL=' | cut -d= -f2-)
  [[ "$bot" == *"$host"* ]] && ok "bot (Nexus-Bot-1-) points at the current tunnel" || bad "bot NEXUS_API_URL=${bot:-?} (current tunnel: $host)"
  [[ "$web" == *"$host"* ]] && ok "website (Nexus-AI-) points at the current tunnel" || bad "website ENGINE_BASE_URL=${web:-?} (current tunnel: $host)"
  echo "   last bot log lines:"; (cd "$T" && "$RAILWAY" logs --service "Nexus-Bot-1-" 2>/dev/null | tail -n 4 | sed 's/^/     /')
else bad "Railway CLI not found at $RAILWAY"; fi

echo "== Live test (through the tunnel, like the bot)"
t0=$(date +%s)
reply=$(curl -s -m 90 "$url/api/v1/nexus" -H 'Content-Type: application/json' -d '{"message":"nexus yo wyd","userId":"780000000000000001","username":"RebootCheck","history":[],"evalRun":true}' | jq -r '.response // empty')
[[ -n "$reply" ]] && ok "reply in $(( $(date +%s) - t0 ))s: $reply" || bad "no reply through the tunnel"

echo "== Memory"
sysctl -n vm.swapusage | sed 's/^/   swap: /'
