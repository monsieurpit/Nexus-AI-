// What Nexus can tell about a link someone pastes (Patrick, 2026-10-04: "I thought you made it so Nexus can visit
// websites, but he can't", and a Discord bot invite link got answered with a whole discord.js bot's code).
//  - Discord bot invite / OAuth2 links and server invites are DECODED (which bot id, which permissions — 8 means
//    Administrator — which scopes), never treated as a coding request.
//  - YouTube links use YouTube's public oEmbed endpoint (title + channel), since the watch page is JavaScript-heavy.
//  - Any other page goes through urlFetcher.ts (SSRF-safe: private/loopback addresses are refused), plus its meta
//    description.
// The result is plain text facts for the model; the model answers what the person actually asked about the link.

import { fetchUrlContent } from './urlFetcher';

const DISCORD_PERMISSIONS: Array<[bigint, string]> = [
  [1n << 0n, 'Create Invite'], [1n << 1n, 'Kick Members'], [1n << 2n, 'Ban Members'], [1n << 3n, 'Administrator (full control of the server)'],
  [1n << 4n, 'Manage Channels'], [1n << 5n, 'Manage Server'], [1n << 6n, 'Add Reactions'], [1n << 7n, 'View Audit Log'],
  [1n << 10n, 'View Channels'], [1n << 11n, 'Send Messages'], [1n << 13n, 'Manage Messages'], [1n << 14n, 'Embed Links'],
  [1n << 15n, 'Attach Files'], [1n << 16n, 'Read Message History'], [1n << 17n, 'Mention @everyone'], [1n << 18n, 'Use External Emojis'],
  [1n << 20n, 'Connect (voice)'], [1n << 21n, 'Speak'], [1n << 22n, 'Mute Members'], [1n << 23n, 'Deafen Members'], [1n << 24n, 'Move Members'],
  [1n << 26n, 'Change Nickname'], [1n << 27n, 'Manage Nicknames'], [1n << 28n, 'Manage Roles'], [1n << 29n, 'Manage Webhooks'],
  [1n << 30n, 'Manage Expressions'], [1n << 31n, 'Use Application Commands'], [1n << 34n, 'Manage Threads'], [1n << 40n, 'Timeout Members'],
];

export function describeDiscordLink(rawUrl: string): string | null {
  let u: URL;
  try {
    u = new URL(rawUrl);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, '').toLowerCase();
  if ((host === 'discord.gg') || ((host === 'discord.com' || host === 'discordapp.com') && /^\/invite\//.test(u.pathname))) {
    const code = host === 'discord.gg' ? u.pathname.slice(1) : u.pathname.split('/')[2];
    return `This is a Discord SERVER INVITE link (invite code "${code}"): clicking it lets someone join a Discord server. It is not code and not a bot.`;
  }
  if ((host === 'discord.com' || host === 'discordapp.com') && /^\/(?:api\/)?oauth2\/authorize/.test(u.pathname)) {
    const clientId = u.searchParams.get('client_id') || 'unknown';
    const scopes = (u.searchParams.get('scope') || '').split(/[\s+]+/).filter(Boolean);
    const permRaw = u.searchParams.get('permissions');
    let perms = 'no specific permissions requested';
    if (permRaw && /^\d+$/.test(permRaw)) {
      const bits = BigInt(permRaw);
      if (bits === 0n) perms = 'no permissions (0)';
      else if (bits & (1n << 3n)) perms = `${permRaw} = Administrator: the bot gets FULL control of the server (every permission), so only add bots you trust`;
      else {
        const names = DISCORD_PERMISSIONS.filter(([bit]) => bits & bit).map(([, name]) => name);
        perms = `${permRaw} = ${names.join(', ') || 'unknown bits'}`;
      }
    }
    const isBot = scopes.includes('bot') || scopes.includes('applications.commands');
    return `This is a Discord ${isBot ? 'BOT INVITE (OAuth2 authorize) link' : 'OAuth2 authorize link'}: opening it lets a server admin add the application with client id ${clientId} to a server. Scopes: ${scopes.join(', ') || 'none'}. Permissions requested: ${perms}. It is just an invite link — not code, nothing to write or install by hand.`;
  }
  return null;
}

async function youtubeInfo(rawUrl: string): Promise<string | null> {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.replace(/^(?:www\.|m\.|music\.)/, '');
    if (host !== 'youtube.com' && host !== 'youtu.be') return null;
    const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(rawUrl)}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const j: any = await res.json();
    return `YouTube video: "${j.title}" by ${j.author_name}.`;
  } catch {
    return null;
  }
}

export interface LinkInfo {
  url: string;
  kind: 'discord' | 'youtube' | 'page' | 'unreadable';
  text: string;
}

export async function readLink(rawUrl: string): Promise<LinkInfo> {
  const discord = describeDiscordLink(rawUrl);
  if (discord) return { url: rawUrl, kind: 'discord', text: discord };
  const yt = await youtubeInfo(rawUrl);
  if (yt) return { url: rawUrl, kind: 'youtube', text: yt };
  const page = await fetchUrlContent(rawUrl);
  if (page.status === 'success') {
    return { url: page.url, kind: 'page', text: `Page title: "${page.title}". Page text (start): ${page.content.slice(0, 3500)}` };
  }
  return { url: rawUrl, kind: 'unreadable', text: `The page could not be read (${page.reason}${page.detail ? `: ${page.detail}` : ''}).` };
}
