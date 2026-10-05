// Keep the chat model HOT, not just "loaded" (Patrick, 2026-10-05: "the LLM model is supposed to always be loaded!").
// Ollama listed nexus2:4b as loaded "Forever", yet a reply took 12 s: its MLX runner reads the weights from the model
// file on disk (the runner itself held ~60 MB), and on this 16 GB Mac with Chrome/VS Code open macOS evicts those
// pages under memory pressure (12 GB of swap in use). The next message then re-reads gigabytes from disk.
// The existing warm-up sends an EMPTY prompt, which loads the model without running it, so it never touches the
// weights. This heartbeat runs a real one-token generation through the CHAT specialist every 2 minutes while idle:
// that reads every weight (keeping them resident) and keeps the chat instructions in Ollama's prompt cache too.
// Skipped while the model is busy and in gaming mode (which frees the memory on purpose).

import * as localLlmClient from '../localLlmClient';
import { SPECIALISTS } from './specialists';

const EVERY_MS = 2 * 60_000;
let timer: ReturnType<typeof setInterval> | null = null;
let running = false;
export const keepHotStats = { beats: 0, skipped: 0, lastMs: 0, lastAt: 0 };

export async function heartbeat(): Promise<number | null> {
  if (running || localLlmClient.isModelBusy() || localLlmClient.getGamingMode().active) {
    keepHotStats.skipped++;
    return null;
  }
  running = true;
  const t0 = Date.now();
  try {
    const chat = SPECIALISTS.chat;
    await localLlmClient.generate('They just said: "yo"\nYour one-line reply:', {
      system: chat.system,
      temperature: chat.temperature,
      maxTokens: 1,
      think: false,
      model: localLlmClient.chatModel(),
    } as any);
    keepHotStats.beats++;
    keepHotStats.lastMs = Date.now() - t0;
    keepHotStats.lastAt = Date.now();
    return keepHotStats.lastMs;
  } catch {
    return null;
  } finally {
    running = false;
  }
}

export function startKeepHot(): void {
  if (timer || (process.env.NEXUS_KEEP_HOT || 'on').toLowerCase() === 'off') return;
  setTimeout(() => void heartbeat(), 45_000).unref?.();
  timer = setInterval(() => void heartbeat(), EVERY_MS);
  timer.unref?.();
}
