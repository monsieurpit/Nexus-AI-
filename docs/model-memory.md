# Model memory: always loaded, `pat unload` for gaming

Cold-loading `nexus2:4b` takes 10–30 s, so a reply after the model was dropped felt broken. Nexus now keeps
the model loaded **forever** (`keep_alive: -1`, about 9–10 GB of the Mac Mini's 16 GB) and loads it again on
engine start (`[model] warm-up on start: …` in the log).

When the Mac is needed for something heavy (Roblox, a game, video editing) use the `pat` command
(`~/bin/pat`):

| Command | What it does |
|---|---|
| `pat unload [hours]` | Gaming mode for 1–12 h (default 6): unloads the model(s) right now. A Discord message still gets answered (slowly, the model loads), then it is dropped again 2 minutes later. |
| `pat load` | Leaves gaming mode and loads the model again (waits until it is loaded). |
| `pat status` | Gaming mode on/off, loaded models, free memory. |

Gaming mode lives in the engine's memory only: it ends by timer, with `pat load`, or when the engine restarts.
If the engine can't be reached, `pat unload` says so (the model is still unloaded, but a Discord message
would reload it and keep it).

## Settings
- `NEXUS_MODEL_KEEP_ALIVE` — e.g. `30m` or `2h` to go back to timed unloading; default is forever.
- The vision model always unloads after 90 s.

## Engine endpoints (used by `pat`)
`GET/POST /api/v1/model/gaming` (`{"on":true,"minutes":360}` / `{"on":false}`) and `POST /api/v1/model/warm`.
They answer 404 unless the request comes from this Mac itself (loopback, no proxy headers such as
`Cf-Connecting-IP`) **and** carries the admin token from `~/.nexus-learning/admin-token`, so they are
unreachable through the Cloudflare tunnel.

## Ollama settings (`~/.nexus-tunnel/set-ollama-env.sh` and `com.nexus.ollamaserve.plist`)
- `OLLAMA_NUM_PARALLEL=1` — the engine runs one generation at a time; 2 parallel slots doubled the context memory.
- `OLLAMA_MAX_LOADED_MODELS=3` — chat model + embeddings + the vision model fit together, so analysing an image no
  longer kicks the chat model out (which made the next reply a cold start and images time out).
- `OLLAMA_FLASH_ATTENTION=1`, `OLLAMA_KV_CACHE_TYPE=q8_0`, `OLLAMA_KEEP_ALIVE=30m` (the chat model overrides this with
  "forever" per request).
- The port must be owned by `com.nexus.ollamaserve` (it has these variables). The Ollama menu-bar app stays in the login
  items (Patrick wants it) and uses the service's server when one is running — but at boot it can start first and run
  its OWN server without these settings (2 parallel slots, model at 17 GB). `com.nexus.ollamatakeover`
  (`~/.nexus-tunnel/ollama-takeover.sh`, at login + every 2 min) fixes that by itself: if the port is held by an
  `ollama serve` that isn't the service, it stops exactly that process and starts the service. Log:
  `~/.nexus-tunnel/ollama-takeover.log`. Everything at once after a reboot: `bash scripts/check-after-reboot.sh`.
- Keep-hot: `src/ai-engine/v2/keepHot.ts` runs a 1-token chat generation every 2 min while idle, so macOS never evicts
  the weights (the MLX runner reads them from disk; "loaded Forever" alone still gave 12 s first replies).
