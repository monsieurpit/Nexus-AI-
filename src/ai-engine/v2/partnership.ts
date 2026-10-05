// Partnership requests (Patrick, 2026-10-05 — the rules from the server's #partnership-rules post):
//   - at least 1,200 members, no exceptions (older smaller partners were approved while the rule wasn't enforced);
//   - a healthy, active chat;
//   - Tier 1 (2,000+ members): ad posted in the partnerships channel + the partnership role pinged;
//   - Tier 2 (1,200-1,999 members): ad posted, WITHOUT a ping;
//   - never a server about sexual / NSFW content "or things like that" (18+, porn, gore, hate, scams/raids...).
// Facts come from Discord itself when they give an invite link (public invite API, no key: real member count, online
// count, the server's NSFW level, name and description), otherwise from what they claim (marked unverified).

export interface InviteInfo {
  code: string;
  name: string;
  description: string;
  members: number | null;
  online: number | null;
  nsfwLevel: number | null; // Discord: 0 default, 1 explicit, 2 safe, 3 age-restricted
}

export interface PartnershipCheck {
  verdict: 'tier1' | 'tier2' | 'too-small' | 'nsfw' | 'need-info';
  lines: string[];
}

const INVITE_RE = /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9-]{2,32})/gi;
export const PARTNER_RE = /\bpartner(?:ship|ships|ing|ed)?\b|\baffiliat\w*\b|\bad\s+(?:swap|exchange)\b|\bpartenariat\b|\bpartnerschaft\b/i;
// Sexual/NSFW "or things like that": adult content, gore, hate, and the usual scam/raid servers.
const NSFW_RE = /\b(?:sell(?:ing|s)?\s+(?:\w+\s+)?accounts?|nsfw|18\s?\+|adults?\s+only|porn\w*|hentai|nudes?|onlyfans|sexting|sexual|sex\s+(?:chat|content|server)|lewd|r34|rule\s?34|fetish\w*|kink\w*|erp|e-?girls?\s+for\s+sale|gore|hate\s+speech|nazi\w*|raid\s+server|raiding\s+(?:other\s+)?servers|nitro\s+scam|free\s+nitro|selling\s+accounts?|account\s+shop|token\s+(?:grabber|logger))\b/i;

// A bad word preceded by "no / anti / zero / without / strictly no" or followed by "-free / banned / not allowed" is a rule
// AGAINST it ("no NSFW", "anti-raid", "NSFW-free"), not the content itself.
export function findBadContent(text: string): string | null {
  const re = new RegExp(NSFW_RE.source, 'gi');
  for (const m of text.matchAll(re)) {
    const before = text.slice(Math.max(0, m.index! - 24), m.index!).toLowerCase();
    const after = text.slice(m.index! + m[0].length, m.index! + m[0].length + 16).toLowerCase();
    if (/\b(?:no|zero|non|anti|without|never|not|nor|strictly\s+no|ban(?:ned)?\s+on)[\s,-]*(?:\w+[\s,/-]+){0,1}$/.test(before) || /^[\s-]*(?:free|banned|prohibited|not\s+allowed|isn'?t\s+allowed)\b/.test(after)) continue;
    return m[0];
  }
  return null;
}

export async function fetchInvite(code: string): Promise<InviteInfo | null> {
  try {
    const res = await fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const j: any = await res.json();
    return {
      code,
      name: j?.guild?.name || '',
      description: j?.guild?.description || '',
      members: typeof j?.approximate_member_count === 'number' ? j.approximate_member_count : null,
      online: typeof j?.approximate_presence_count === 'number' ? j.approximate_presence_count : null,
      nsfwLevel: typeof j?.guild?.nsfw_level === 'number' ? j.guild.nsfw_level : null,
    };
  } catch {
    return null;
  }
}

// "we have 1.5k members", "1,450 members", "around 2000 ppl"
export function claimedMembers(text: string): number | null {
  const m = text.match(/(\d{1,3}(?:[.,]\d{3})+|\d+(?:[.,]\d+)?)\s*(k)?\s*\+?\s*(?:members?|ppl|people|users|membres?|mitglied\w*)/i);
  if (!m) return null;
  const raw = /^\d{1,3}(?:[.,]\d{3})+$/.test(m[1]) ? m[1].replace(/[.,]/g, '') : m[1].replace(',', '.');
  const n = parseFloat(raw) * (m[2] ? 1000 : 1);
  return Number.isFinite(n) ? Math.round(n) : null;
}

const fmt = (n: number) => n.toLocaleString('en-US');

export async function checkPartnership(text: string): Promise<PartnershipCheck> {
  const lines: string[] = [];
  const codes = [...text.matchAll(INVITE_RE)].map((m) => m[1]);
  const invite = codes.length ? await fetchInvite(codes[0]) : null;
  if (codes.length && !invite) lines.push(`Their invite link (discord.gg/${codes[0]}) is invalid or expired — they need to send a working, permanent invite.`);
  if (invite) lines.push(`From their invite (checked live with Discord): server "${invite.name}"${invite.members !== null ? `, ${fmt(invite.members)} members` : ''}${invite.online !== null ? `, ${fmt(invite.online)} online right now` : ''}.${invite.description ? ` Description: "${invite.description.slice(0, 160)}".` : ''}`);

  // Content first: an NSFW server is refused whatever its size.
  const contentText = `${text} ${invite?.name ?? ''} ${invite?.description ?? ''}`;
  if (invite?.nsfwLevel === 1 || invite?.nsfwLevel === 3) {
    lines.push(`Discord itself marks this server as ${invite.nsfwLevel === 1 ? 'EXPLICIT' : 'AGE-RESTRICTED'} (NSFW) — not allowed.`);
    return { verdict: 'nsfw', lines };
  }
  const bad = findBadContent(contentText);
  if (bad) {
    lines.push(`Content: their server/ad mentions "${bad[0]}" — sexual/NSFW or similar content is not allowed for partners.`);
    return { verdict: 'nsfw', lines };
  }

  const members = invite?.members ?? claimedMembers(text);
  const verified = invite?.members != null;
  if (members === null) {
    lines.push('Member count: not given — ask for their server invite link (a permanent one) so the member count can be checked.');
    return { verdict: 'need-info', lines };
  }
  if (!verified) lines.push(`Member count: they CLAIM ${fmt(members)} (not verified — ask for their invite link before posting).`);

  // Activity proxy: the share of members online right now.
  if (invite?.online != null && invite.members) {
    const pct = (100 * invite.online) / invite.members;
    lines.push(`Activity: ${pct.toFixed(1)}% of members online right now ${pct >= 8 ? '(looks active ✅)' : pct >= 3 ? '(okay — check that their chat is actually active ⚠️)' : '(very few online — the chat may be dead ⚠️)'}.`);
  } else lines.push('Activity: can\'t be checked from here — the rules require a healthy, active chat (consistently active or strong peak times).');

  if (members < 1200) {
    lines.push(`${fmt(members)} members is under the 1,200-member minimum — NOT eligible, and no exceptions are made (older smaller partners were approved before the rule was enforced and were terminated or grandfathered).`);
    return { verdict: 'too-small', lines };
  }
  if (members >= 2000) {
    lines.push(`${fmt(members)} members → TIER 1 (2,000+): the ad is posted in the partnerships channel AND the partnership role is pinged.`);
    return { verdict: 'tier1', lines };
  }
  lines.push(`${fmt(members)} members → TIER 2 (1,200-1,999): the ad is posted in the partnerships channel, WITHOUT a ping.`);
  return { verdict: 'tier2', lines };
}

export function partnershipNote(check: PartnershipCheck): string {
  const head = {
    tier1: '✅ Eligible — Tier 1 (post + ping)',
    tier2: '✅ Eligible — Tier 2 (post, no ping)',
    'too-small': '❌ Not eligible — under 1,200 members',
    nsfw: '❌ Not eligible — sexual/NSFW or similar content',
    'need-info': '⚠️ Need more info',
  }[check.verdict];
  return `PARTNERSHIP CHECK (computed from the server's partnership rules — these facts and this result are correct, use them):\nRESULT: ${head}\n${check.lines.map((l) => `- ${l}`).join('\n')}\nReply concisely: the result line first, then the 2-4 key reasons, then the next step (eligible: open a partnership ticket / staff posts the ad in the partnerships channel${check.verdict === 'tier1' ? ' with the partnership ping' : check.verdict === 'tier2' ? ', no ping' : ''}; not eligible: politely say why and that there are no exceptions; need info: ask for exactly what's missing). Professional and friendly, no swearing, no jokes.\n`;
}

// For questions about the rules themselves ("what are the partnership requirements?").
export const PARTNERSHIP_RULES = `PARTNERSHIP RULES (the server's official post — explain them, don't invent others):
- Requirements: at least 1,200 members; a healthy, active chat (either consistently active or strong peak activity times).
- Tier 1 (2,000+ members): the ad is posted in the partnerships channel and the partnership role is pinged.
- Tier 2 (1,200-1,999 members): the ad is posted in the partnerships channel, without a ping.
- No server about sexual/NSFW content or similar (18+, porn, gore, hate, scams, account selling).
- Old partners under 1,200 members were approved while the rules weren't enforced; they were terminated or grandfathered. No exceptions from now on.
- To apply: open a partnership ticket (with a permanent invite link).`;

// The note for a partnership message: a real check when they give a size or an invite, the rules otherwise.
export async function partnershipTurn(text: string): Promise<string> {
  const hasData = INVITE_RE.test(text) || claimedMembers(text) !== null;
  INVITE_RE.lastIndex = 0;
  const asksRules = /\b(?:rules?|requirements?|requirement|how\s+(?:do|does|can|to)|what\s+(?:do|are|is)|tiers?|ping)\b/i.test(text);
  if (!hasData && asksRules) return `${PARTNERSHIP_RULES}\nAnswer their question from these rules, concisely (a few lines or short bullets), friendly and professional.\n`;
  return `${partnershipNote(await checkPartnership(text))}${PARTNERSHIP_RULES}\n`;
}

// Is this message a partnership request? ONLY when it says "partner"/"partnership" (or affiliate / partenariat /
// Partnerschaft). Patrick, 2026-10-05: guessing from "our server + members" or the channel could make mistakes, so
// the word is required. The channel argument is kept for callers but no longer widens it.
export function isPartnershipMessage(text: string, _channel?: string | null): boolean {
  return PARTNER_RE.test(text);
}
