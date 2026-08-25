// Forwards the AI engine's own operational warnings/errors (Google Search 429s, Ollama
// connectivity failures, uncaught exceptions, etc.) directly to a Discord channel via a webhook —
// decoupled from the Discord bot process entirely, so this keeps working even if the bot itself is
// down, and needs no Railway API access or log-streaming setup on either side. No-ops silently
// (never throws, never blocks the caller) whenever DISCORD_LOG_WEBHOOK_URL isn't configured, so
// this is safe to call from anywhere without needing its own error handling at the call site.
const DISCORD_LOG_WEBHOOK_URL = process.env.DISCORD_LOG_WEBHOOK_URL;

// Bursts of the same failure (e.g. several Google Search 429s in the same minute while the engine
// is under load) would otherwise spam the channel with dozens of near-identical messages. Keyed by
// the exact message text so different errors are never suppressed by an unrelated one's cooldown.
const recentlySent = new Map<string, number>();
const DEDUP_WINDOW_MS = 60_000;

export async function postToDiscordLog(message: string, level: 'warn' | 'error' = 'warn'): Promise<void> {
  if (!DISCORD_LOG_WEBHOOK_URL) return;

  const now = Date.now();
  const lastSent = recentlySent.get(message);
  if (lastSent && now - lastSent < DEDUP_WINDOW_MS) return;
  recentlySent.set(message, now);
  if (recentlySent.size > 500) {
    const oldestKey = recentlySent.keys().next().value;
    if (oldestKey !== undefined) recentlySent.delete(oldestKey);
  }

  const icon = level === 'error' ? '🔴' : '🟡';
  try {
    await fetch(DISCORD_LOG_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `${icon} \`[engine]\` ${message.slice(0, 1900)}` }),
    });
  } catch {
    // Never let a failed webhook post affect the caller — this is best-effort observability, not
    // a critical path. Falls back to whatever console logging already happened at the call site.
  }
}
