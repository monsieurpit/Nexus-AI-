// RaidShield — the message-safety/scam/raid classifier, split out of the old monolithic
// ruleEngine.ts (2026-09-20) since it's a conceptually distinct system from the custom-directive
// enforcement layer (see customDirectives.ts) that happened to live in the same file. No behavior
// change from the split — every regex, threshold, and comment carried over verbatim.

import { matchRaidShieldThreatCorpus } from '../corpus/raidShieldThreatCorpus';

// Same rule as reasoningEngine: no action/command trigger answers with one fixed string.
const pick = <T,>(pool: T[]): T => pool[Math.floor(Math.random() * pool.length)];

export interface SafetyAnalysisResult {
  isSafetyQuery: boolean;
  targetMessage: string;
  safetyScore: number; // 0.0 (dangerous) to 1.0 (safe)
  confidence: number; // 0.0 to 1.0
  isBot: boolean;
  botProbability: number; // 0.0 to 1.0
  threatType: 'scam' | 'raid' | 'spam' | 'bot' | 'toxic' | 'safe' | 'help_request';
  detectedFlags: string[];
  recommendedAction: 'DELETE_AND_BAN' | 'DELETE_AND_TIMEOUT' | 'FLAG_FOR_REVIEW' | 'ALLOW' | 'ANSWER_HELP';
  reason: string;
  helpResponse?: string;
}
// Mainstream trusted platforms (Hard Rule #8)
const MAINSTREAM_DOMAINS = [
  /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\b/i,
  /https?:\/\/(?:www\.)?twitch\.tv\b/i,
  /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\b/i,
  /https?:\/\/(?:www\.)?tiktok\.com\b/i,
  /https?:\/\/(?:www\.)?imgur\.com\b/i,
  /https?:\/\/(?:www\.)?reddit\.com\b/i,
  /https?:\/\/(?:www\.)?github\.com\b/i,
  /https?:\/\/(?:www\.)?spotify\.com\b/i,
  /https?:\/\/(?:www\.)?instagram\.com\b/i,
  /https?:\/\/(?:www\.)?discord\.com\b/i,
  /https?:\/\/(?:www\.)?store\.steampowered\.com\b/i,
];

// Spanish conversational indicators (Hard Rule #17)
const SPANISH_INDICATORS = [
  /\b(?:hola|buenas|que tal|como estan|como estas|alguien|amigo|amigos|gracias|hermano|por favor|jugar|partida|servidor|canal|reglas|quien|donde|cuando|porque|mandó|mando|esto|mira|verdad|claro|saludos)\b/i,
];

// Catalan conversational indicators — added after Patrick flagged that his Barça Discord server
// runs in English, Spanish AND Catalan (2026-09-17), the same "always safe" role Hard Rule #17
// already plays for Spanish: ordinary Catalan chat with no threat signal shouldn't get treated as
// suspicious just because it isn't English. Since threat detection runs first in this file (see
// the block comment above), this exemption can only ever soften a message that already survived
// every real scam/raid/spam rule — it can never suppress an actual threat written in Catalan.
const CATALAN_INDICATORS = [
  /\b(?:hola|bon dia|bona tarda|bona nit|com estàs|com esteu|algú|amic|amics|gràcies|si\s?us\s?plau|jugar|partida|servidor|canal|normes|qui|on|quan|per\s?què|mira|veritat|clar|salutacions|nosaltres|vosaltres)\b/i,
];

// French conversational indicators — found missing entirely during a full audit of RaidShield's
// language coverage (2026-09-17): Spanish and Catalan both have a named "always safe" exemption
// here, French had none. Doesn't cause false positives on its own (the cascade's final fallback is
// already "Default Safe", so an innocent French message with no threat markers reaches safe either
// way) — this exists for parity/defense-in-depth, and to keep the reasoning behind why a French
// message classified safe legible in the `reason` field instead of just falling out the bottom of
// the whole rule cascade with a generic catch-all reason.
const FRENCH_INDICATORS = [
  /\b(?:salut|bonjour|bonsoir|merci|s'il\s?te\s?pla[iî]t|stp|quelqu'un|ami|amis|jouer|partie|serveur|salon|r[eè]gles|qui|o[uù]|quand|pourquoi|regarde|vrai|clair|salutations|nous|vous)\b/i,
];

// Reporting indicators (Hard Rule #18)
const REPORTING_INDICATORS = [
  /alguien me mand[oó] esto/i,
  /look at this (?:scam|link|dm|message)/i,
  // Broadened after a live-probing gap: a report almost always names WHAT the suspicious thing is
  // before asking "is this a scam" ("is this nitro generator a scam?"), but the original pattern
  // required the accusation word immediately after "is this" with nothing in between, so any real
  // description of the suspicious item defeated it entirely — verified live, "is this nitro
  // generator a scam? someone sent it to me" fell through this exemption and got classified as
  // the scam itself instead of a report about one.
  /is\s+this\s+.{0,40}?(?:a\s+)?(?:phishing|scam|legit|real|fake)\b/i,
  // Same broadening for "someone sent me X" — "someone sent IT TO me" / "sent THIS to me" are at
  // least as natural as the bare "sent me" the original pattern required.
  /someone\s+(?:sent|dmed|messaged)\s+(?:\w+\s+)?(?:to\s+)?me\b/i,
  /is this link (?:safe|real|dangerous|a virus)/i,
  /reporting this (?:user|link|scam|bot)/i,
  /should i click this/i,
  /me llego esto/i,
  /es esto seguro/i,
  // Community members warning each other about a scam, or narrating that they recognised one —
  // phrasings a scammer running the scam would never write. Added after a live gap: "PSA there's
  // a scammer in dms sending fake nitro links dont click" and 'the bot said "claim your free
  // nitro" so i knew it was fake' both classified as the scam itself.
  /\bpsa\b.{0,60}\b(?:scam|scammer|phish|nitro\s+link|fake\s+link|dm)/i,
  /\bthere'?s?\s+(?:a\s+)?(?:scam(?:mer)?|phish\w*|fake\s+\w+|bot)\b.{0,50}\b(?:going\s+around|in\s+(?:the\s+)?dms?|spamming|dming|be\s+careful)\b/i,
  /\bso\s+i\s+knew\s+(?:it|that)\s+was\b/i,
  /\bknew\s+(?:it|that|right\s+away)\s+(?:it\s+)?was\s+(?:a\s+)?(?:scam|fake|phish\w*|bot)\b/i,
  /\b(?:obvious(?:ly)?|classic|typical)\s+(?:scam|phish\w*|bait)\b/i,
  /\bdo\s?n'?t\s+(?:click|fall\s+for|trust)\s+(?:it|this|that|the\s+link)\b/i,
];

// Role & Rank talk indicators (Hard Rule #14 & #15)
const ROLE_RANK_INDICATORS = [
  /\b(?:promotion|promoted|role|roles|rank|ranks|mod|staff|admin|moderator|helper|co-owner|owner)\b/i,
  /will give (?:u|you) (?:a )?(?:promotion|role|rank)/i,
  /giving \S+ a (?:role|rank|promotion)/i,
  /promoting \S+ to (?:mod|staff|admin|helper)/i,
  /congrats on (?:the )?promotion/i,
  /u got promoted/i,
];

export interface RaidShieldClassification {
  classification: 'safe' | 'scam' | 'spam' | 'bot' | 'raid';
  confidence: number;
  reason: string;
}

export function evaluateRaidShieldRules(messageText: string): RaidShieldClassification {
  const text = messageText.trim();
  const lower = text.toLowerCase();

  // Extract inner message if wrapped in quotes or formatting
  const unquoted = (text.match(/["'`]([^"'`]{3,})["'`]/)?.[1] || text).trim();
  const unquotedLower = unquoted.toLowerCase();

  // Hoisted so every rule below — threat or exemption — sees the same link picture, instead of
  // each rule recomputing/half-checking it ad hoc.
  const hasMainstreamLink = MAINSTREAM_DOMAINS.some((p) => p.test(unquoted));
  const hasSuspiciousLink =
    /(?:dlscord|discorcl|discrod|discord-gift|steamcomrnunity|free-nitro|nitro-gift)\.[a-z0-9]+/i.test(unquoted);
  // A bare domain-shaped token ("bit.ly/xyz", "totally-legit-nitro.tk/claim") — a real scam link
  // doesn't have to match hasSuspiciousLink's specific typosquat list to still be a link.
  const hasAnyLinkLikeToken = /\b[a-z0-9-]+\.[a-z]{2,}(?:\/\S*)?\b/i.test(unquoted);

  // ════════════════════════════════════════════════════════════════════════════════════════
  // REAL THREAT DETECTION RUNS FIRST. Every "always safe" exemption further down used to run
  // BEFORE this block, which meant a scammer could bypass the entire pipeline just by
  // prefixing/suffixing their payload with an innocent-looking phrase — confirmed live via a
  // security review pass: "based nitro generator drop, claim it now http://freenitro.tk" matched
  // Hard Rule #4's slang prefix ("based") and returned safe at 0.99 before ever reaching the
  // Nitro rule below it; 'someone sent me this http://dlscord.xyz nitro generator, claim now'
  // matched Hard Rule #18's reporting-indicator prefix and returned safe at 0.98 for the same
  // reason; and "check this https://youtu.be/xyz also grab ur free nitro generator
  // http://totally-legit-nitro.tk/claim" matched Hard Rule #8's mainstream-link exemption because
  // that rule only withheld safety for messages matching the narrow known-typosquat list, not for
  // messages that ALSO happen to carry an unrelated legitimate link. The same bug independently
  // affected Hard Rules #19 and #6. The fix is the one this file already used for Hard Rule #5
  // (see its own comment further down): let genuine threat signals run first, and only fall back
  // to the "always safe" exemptions once nothing threatening has matched.
  // ════════════════════════════════════════════════════════════════════════════════════════

  // General catch-all: hasSuspiciousLink identifies a message containing one of a small, curated
  // list of KNOWN malicious Discord/Steam typosquat domains — there is no legitimate reason for a
  // real message to contain one of these.
  if (hasSuspiciousLink) {
    return {
      classification: 'scam',
      confidence: 0.97,
      reason: 'Critical threat: message contains a known malicious typosquat domain.',
    };
  }

  // SCAM DETECTION RULES (Hard Rules #1, #2, #3, #7, #10, #11)
  // "generator"/"tool"/"download"/"hack"/"unlock" is part of the bait-word list because a fake
  // "Nitro Generator" tool is one of the single most classic Discord scam patterns (almost always
  // either a token-stealer or a scam link).
  // Bait-word list split into two tiers, both word-boundary-wrapped (found by a code review that
  // bare "link", with no \b, matched the substring inside plural "links"): the specific,
  // action-oriented words (claim/airdrop/generator/tool/download/hack/unlock/qr/scan) are bait on
  // their own — nobody says those in an innocent sentence about Nitro. The generic ones
  // (gift/free/link(s)) are common in an innocent warning too ("there's a scammer sending fake
  // nitro links, don't click" has no actual link in it) so they only count as bait when the
  // message actually carries a link-shaped token alongside them.
  // Spanish/Catalan bait words added alongside CATALAN_INDICATORS (2026-09-17) — before this, a
  // Spanish/Catalan Nitro scam that didn't happen to match one of the corpus's handful of exact
  // known phrasings (raidShieldThreatCorpus.ts's ml-es-*/ml-ca-* entries) fell straight through to
  // Default Safe, since this generic bait-word check — the actual catch-all for NOVEL phrasing —
  // only ever recognized English bait words. reclama/reclamar (claim), generador (generator),
  // descarga/descarregar (download), hackear (hack), desbloquea/desbloqueja (unlock), escanea/
  // escaneja (scan) are the direct Spanish/Catalan equivalents of the existing strong-bait list.
  // Found via a full EN/FR/ES/CA audit (2026-09-17): "is this nitro generator a scam? someone
  // sent it to me" — a genuine report, with REPORTING_INDICATORS entries that exist specifically
  // to recognize it — was misclassified as 'scam', because nitroStrongBait fired on "generator"
  // alone with no link/domain anywhere in the message. A real Nitro-generator scam's entire payload
  // IS the link — without one there's nothing to click, so a bait word with zero link-shaped token
  // in the message is never itself a live threat, only ever a report/conversation ABOUT one. Now
  // requires a link-shaped token alongside the bait word, same discipline nitroWeakBait already
  // used — hasSuspiciousLink (a known typosquat domain) stays independently sufficient on its own
  // regardless of bait words, unaffected by this change.
  const nitroStrongBait =
    /\b(?:claim|airdrop|generator|tool|download|hack|unlock|qr|scan|reclama|reclamar|generador|descarga|descarregar|hackear|desbloquea|desbloqueja|escanea|escaneja)\b/i.test(unquotedLower) &&
    hasAnyLinkLikeToken;
  // gratis/gratuït (free), regalo/regal (gift), enlace/enllaç (link) — same weak-bait reasoning as
  // the English words: common in an innocent warning too, so only bait when a link-shaped token
  // is actually present alongside them.
  const nitroWeakBait = /\b(?:gift|free|links?|gratis|gratuït|regalo|regal|enlace|enllaç)\b/i.test(unquotedLower) && hasAnyLinkLikeToken;
  if (/(?:nitro|free nitro|nitro gift|claim nitro|discord nitro)/i.test(unquotedLower) && (hasSuspiciousLink || nitroStrongBait || nitroWeakBait)) {
    return {
      classification: 'scam',
      confidence: 0.99,
      reason: 'Critical threat: Fake Discord Nitro phishing scam vector.',
    };
  }

  // "X generator" scams (V-Bucks, Robux, gift cards, in-game currency, ...) are the exact same
  // underlying scam pattern as the Nitro generator rule above, just not Discord/Steam-specific.
  // Requires either a specific currency/item named right before "generator" (the actual bait), or
  // "generator" combined with one of the classic scam-phrasing tells ("no human verification",
  // "100% working", "unlimited X") — deliberately does NOT fire on a bare "generator" alone, so
  // legitimate uses (a random number generator, a password generator, a backup power generator)
  // stay unaffected.
  if (
    /\b(?:v-?bucks|robux|gift\s*card|free\s*coins?|free\s*points?|free\s*gems?|free\s*diamonds?)\s+generator\b/i.test(unquotedLower) ||
    /\bgenerator\b.{0,25}\b(?:no\s+(?:human\s+)?verification|100%\s*working|unlimited\s+(?:coins|robux|v-?bucks|gems|money|points))\b/i.test(unquotedLower) ||
    // Spanish/Catalan equivalents of the same generator-scam tells — "generador" combined with
    // "sin verificación (humana)"/"sense verificació", "100% funcional", or "ilimitado"/"il·limitat".
    /\bgenerador\b.{0,25}\b(?:sin\s+verificaci[oó]n(?:\s+humana)?|sense\s+verificaci[oó],?\s*(?:humana)?|100%\s*funcional|ilimitad[oa]|il·?limitad?a?)\b/i.test(unquotedLower)
  ) {
    return {
      classification: 'scam',
      confidence: 0.98,
      reason: 'Critical threat: fake currency/item generator scam (V-Bucks, Robux, gift cards, etc.) — these never actually work and exist to steal credentials or install malware.',
    };
  }

  if (
    (/(?:steam gift|steam community|trade offer|csgo skins|free skins|claim steam)/i.test(unquotedLower) ||
      // Spanish/Catalan: "regalo de Steam"/"regal de Steam", "oferta de intercambio"/"oferta d'intercanvi".
      /(?:regalo\s+de\s+steam|regal\s+de\s+steam|oferta\s+de\s+intercambio|oferta\s+d'?intercanvi)/i.test(unquotedLower)) &&
    (hasSuspiciousLink || /http/i.test(unquotedLower))
  ) {
    return {
      classification: 'scam',
      confidence: 0.99,
      reason: 'Critical threat: Steam credentials theft or trade scam link.',
    };
  }

  if (
    /(?:scan this qr|discord qr login|verify via qr|scan with mobile app)/i.test(unquotedLower) ||
    // Spanish/Catalan: "escanea este código QR"/"escaneja aquest codi QR", "verificar (a través) del QR".
    /(?:escanea\s+(?:este|el)\s+c[oó]digo\s+qr|escaneja\s+aquest\s+codi\s+qr|verificar?\s+(?:v[ií]a|a\s+trav[eé]s\s+del?|mitjan[cç]ant\s+el)\s+qr)/i.test(unquotedLower)
  ) {
    return {
      classification: 'scam',
      confidence: 0.99,
      reason: 'Critical threat: Discord Remote Auth QR hijacking scam.',
    };
  }

  // RAID DETECTION RULES (Hard Rule #20, #21)
  if (/(?:@everyone|@here)/.test(text) && /(?:raid|nuke|join|discord\.gg\/)/i.test(lower)) {
    return {
      classification: 'raid',
      confidence: 0.97,
      reason: 'Hostile mass mention raid advertisement.',
    };
  }

  // RaidShield Threat Corpus — 240+ additional scam/phishing/raid/spam/self-bot patterns (see
  // ./corpus/raidShieldThreatCorpus.ts). Runs alongside the hand-written high-severity rules
  // above, before any "always safe" exemption gets a chance to fire — same reasoning as the
  // reorder documented above. The corpus has its own report/warning/quote guard
  // (CORPUS_SAFE_CONTEXT + CORPUS_SAFE_GUARDS), so it still correctly stays quiet on genuine
  // reports/questions that don't carry an actual matching threat pattern.
  const corpusHit = matchRaidShieldThreatCorpus(unquoted !== text ? `${text} ${unquoted}` : text);
  if (corpusHit) {
    return {
      classification: corpusHit.classification,
      confidence: corpusHit.confidence,
      reason: corpusHit.reason,
    };
  }

  // ════════════════════════════════════════════════════════════════════════════════════════
  // "ALWAYS SAFE" EXEMPTIONS — only reached once nothing above matched an actual threat pattern.
  // ════════════════════════════════════════════════════════════════════════════════════════

  // Hard Rule #18: REPORTING IS NOT OFFENDING
  for (const pattern of REPORTING_INDICATORS) {
    if (pattern.test(lower) || pattern.test(unquotedLower)) {
      return {
        classification: 'safe',
        confidence: 0.98,
        reason: 'User is reporting, forwarding, or asking about suspicious content (Hard Rule #18: Reporting is not offending).',
      };
    }
  }

  // Hard Rule #19: Moderator context / discussing rule enforcement
  if (
    /(?:mod review|warning issued|rule \d+ enforcement|case #\d+|logs show|investigating incident|banned user)/i.test(
      lower
    )
  ) {
    return {
      classification: 'safe',
      confidence: 0.99,
      reason: 'Moderator discussing rule enforcement or review (Hard Rule #19).',
    };
  }

  // Hard Rule #4: Enthusiasm & slang are ALWAYS safe
  if (
    /^(?:fireee+|wowww+|lets gooo+|omg no way|bro fr fr|💀+|lmao+|pog+|sheesh+|w\b|l\b|gg\b|fr\b|fr fr\b|nah bro|hype|based)/i.test(
      unquotedLower
    )
  ) {
    return {
      classification: 'safe',
      confidence: 0.99,
      reason: 'Casual slang, excitement, and emoji reactions (Hard Rule #4).',
    };
  }

  // Hard Rule #6: Questions and complaints are ALWAYS safe
  if (
    /^(?:why is this broken|this sucks|help me|how (?:do|can) i|where (?:is|do)|can someone help|is (?:the|this) server)/i.test(
      unquotedLower
    )
  ) {
    return {
      classification: 'safe',
      confidence: 0.98,
      reason: 'User question or support inquiry (Hard Rule #6).',
    };
  }

  // Hard Rule #8: Mainstream platform links are ALWAYS safe. hasSuspiciousLink and every hard
  // scam/raid rule already had their shot above, so this no longer needs its own negative check —
  // a message with both a YouTube link AND a scam payload already matched one of those rules
  // before ever reaching here.
  if (hasMainstreamLink) {
    return {
      classification: 'safe',
      confidence: 0.98,
      reason: 'Legitimate mainstream platform URL (Hard Rule #8).',
    };
  }

  // Hard Rule #17: Spanish conversation without scam markers is safe
  if (SPANISH_INDICATORS.some((p) => p.test(unquotedLower))) {
    return {
      classification: 'safe',
      confidence: 0.96,
      reason: 'Legitimate Spanish conversational dialogue (Hard Rule #17).',
    };
  }

  // Catalan conversation without scam markers is safe — same reasoning as Hard Rule #17 above,
  // added for Patrick's Barça server (English/Spanish/Catalan).
  if (CATALAN_INDICATORS.some((p) => p.test(unquotedLower))) {
    return {
      classification: 'safe',
      confidence: 0.96,
      reason: 'Legitimate Catalan conversational dialogue.',
    };
  }

  // French conversation without scam markers is safe — parity fix, see FRENCH_INDICATORS' own
  // comment above.
  if (FRENCH_INDICATORS.some((p) => p.test(unquotedLower))) {
    return {
      classification: 'safe',
      confidence: 0.96,
      reason: 'Legitimate French conversational dialogue.',
    };
  }

  // Hard Rule #14 & #15: Role & Rank conversation without scam payload is safe
  if (ROLE_RANK_INDICATORS.some((p) => p.test(unquotedLower))) {
    return {
      classification: 'safe',
      confidence: 0.95,
      reason: 'Community role assignment or rank celebration discussion (Hard Rule #14 & #15).',
    };
  }

  // Hard Rule #5: Discord Bot Commands are ALWAYS safe. This used to exist as TWO separate
  // checks — an early one guarded against a link/mass-mention, and an unguarded duplicate right
  // before Default Safe that silently re-opened the exact bypass the first one exists to close (a
  // command-shaped scam message that matched nothing above would fall through to the unguarded
  // copy and get 'safe' at confidence 1.0 — higher than the corpus's own confidences). Now a
  // single check, reached only after every real threat rule above has already had its shot, so it
  // no longer needs its own link/mention guard at all: a genuine bot command ("!ban @user",
  // ".play song", "$balance") never matches any of them and still classifies as safe here.
  if (/^[\!\?\.\/\$\-\;\%\&][a-zA-Z0-9_\-]+(?:\s|$)/.test(unquoted)) {
    return {
      classification: 'safe',
      confidence: 1.0,
      reason: 'Standard Discord bot command execution (Hard Rule #5).',
    };
  }

  // Default Safe
  return {
    classification: 'safe',
    confidence: 0.94,
    reason: 'Message verified against 21 Hard Security Rules and classified clean.',
  };
}

export function analyzeMessageSafety(text: string): SafetyAnalysisResult {
  const raid = evaluateRaidShieldRules(text);
  const isScam = raid.classification === 'scam';
  const isRaid = raid.classification === 'raid';
  const isSpam = raid.classification === 'spam';
  const isBot = raid.classification === 'bot';

  const isHelp = /(?:how (?:do|can) i|where is|help me|support|how to verify|get roles|bot offline)/i.test(text.toLowerCase());

  let threatType: SafetyAnalysisResult['threatType'] = raid.classification;
  let safetyScore = raid.classification === 'safe' ? 0.98 : 0.05;
  let confidence = raid.confidence;
  // Tiered by threat severity, not a blanket ban — matches the confidence-tiered policy
  // used by the /api/v1/raidshield endpoint, instead of recommending an instant permanent
  // ban for every non-safe classification regardless of how severe it actually is.
  let recommendedAction: SafetyAnalysisResult['recommendedAction'] =
    raid.classification === 'safe'
      ? 'ALLOW'
      : raid.classification === 'scam' && raid.confidence >= 0.95
      ? 'DELETE_AND_BAN'
      : raid.classification === 'spam'
      ? 'FLAG_FOR_REVIEW'
      : 'DELETE_AND_TIMEOUT';
  let reason = raid.reason;
  let helpResponse: string | undefined = undefined;

  if (isHelp && raid.classification === 'safe') {
    threatType = 'help_request';
    safetyScore = 1.0;
    confidence = 0.98;
    recommendedAction = 'ANSWER_HELP';
    helpResponse = generateHelpReply(text);
  }

  return {
    isSafetyQuery: true,
    targetMessage: text,
    safetyScore,
    confidence,
    isBot,
    botProbability: isBot ? 0.96 : 0.04,
    threatType,
    detectedFlags: [threatType],
    recommendedAction,
    reason,
    helpResponse,
  };
}

function generateHelpReply(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('verify') || lower.includes('verification')) {
    return '🛡️ **How to Verify in the Server:**\n1. Head over to the `#verify` or `#rules` channel.\n2. Click the green **Verify / Join** button or complete the reaction check.\n3. Make sure your account has a verified email and phone number if high-security mode is active.';
  }
  if (lower.includes('role') || lower.includes('roles')) {
    return '🎭 **How to Get Roles:**\n1. Check the `#role-select` channel or click **Channels & Roles** at the top of the channel sidebar.\n2. Select your notifications, games, or vanity color roles.\n3. Note: Staff roles (Moderator/Admin) must be assigned directly by server administrators.';
  }
  if (lower.includes('bot') && (lower.includes('crash') || lower.includes('error') || lower.includes('down') || lower.includes('offline'))) {
    return '🤖 **Bot Troubleshooting Guide:**\n1. **Permissions**: Verify the bot role has `Send Messages`, `Embed Links`, and `Use Application Commands` in this channel.\n2. **Gateway Intents**: Ensure `Message Content` and `Server Members` intents are toggled ON in the Discord Developer Portal.\n3. **Rate Limits / Process**: Check hosting logs for 429 rate limit backoffs or restart the host worker.';
  }
  if (lower.includes('rules') || lower.includes('guidelines')) {
    return '📜 **Server Rules Overview:**\n1. Be respectful — zero tolerance for harassment, hate speech, or toxicity.\n2. No spamming, self-promotion, or unsolicited DMs.\n3. Strictly no suspicious links, token grabbers, or NSFW content.\n4. Follow Discord Community Guidelines & ToS.';
  }

  return pick([
    `👋 **Support Desk:** I'm here to help! Feel free to describe your issue or the command you need, or check the pinned messages in this channel for helpful guides.`,
    `👋 **Support Desk:** Tell me what's actually going wrong or which command you're after and I'll walk you through it. The pins in this channel cover most of the common stuff too.`,
    `👋 **Support Desk:** What do you need a hand with? Describe the issue or name the command — otherwise the pinned messages here have the usual guides.`,
  ]);
}
