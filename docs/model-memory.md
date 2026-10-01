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
