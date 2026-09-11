/**
 * RaidShield Threat Corpus
 * =========================
 *
 * A dedicated, data-driven security corpus for the Nexus AI RaidShield engine
 * (`evaluateRaidShieldRules` in `../ruleEngine.ts`, served at
 * `POST /api/v1/raidshield` and consumed by the Discord bot's
 * `aiModerationService` / `raidDetectionService`).
 *
 * The hand-written "21 Hard Rules" cascade in `ruleEngine.ts` stays the first
 * line of defence and keeps priority: it owns the "always safe" exemptions
 * (reporting, mod context, mainstream links, Spanish smalltalk, role/rank talk,
 * bot commands) and the highest-severity scam vectors (Nitro phishing, Steam
 * theft, QR hijack, mass-mention raids). This corpus is consulted AFTER those
 * rules, for everything that would otherwise fall through to "Default Safe" —
 * hundreds of additional scam / phishing / raid / spam / self-bot patterns that
 * real Discord communities actually get hit with.
 *
 * Design notes:
 *  - Every entry is conservative. A threat entry fires only when a distinctive
 *    scam construction is present, normally via `allOf` (several independent
 *    tokens that only co-occur in an attack) rather than a single loose keyword.
 *  - `exempt` on an entry, plus the shared `CORPUS_SAFE_CONTEXT` guard, suppress
 *    matches when the message is clearly a report, a warning, a quote, or a
 *    question about a threat rather than the threat itself.
 *  - `matchRaidShieldThreatCorpus` returns the single highest-confidence threat
 *    match, or `null` when nothing distinctive is found (caller then continues
 *    to its own Default Safe).
 *
 * This file is intentionally large. Add new patterns here rather than growing
 * the `ruleEngine.ts` cascade.
 */

export type RaidShieldCorpusClassification = 'scam' | 'spam' | 'bot' | 'raid' | 'safe';

export interface RaidShieldThreatPattern {
  /** Stable unique id, `family-shortslug`. */
  id: string;
  /** Loose grouping for docs / telemetry. */
  family: string;
  classification: RaidShieldCorpusClassification;
  /** 0..1 — feeds the endpoint's action tiering (>=0.90 => DELETE_AND_TIMEOUT). */
  confidence: number;
  /** Human-readable explanation surfaced to moderators in the alert embed. */
  reason: string;
  /** Free-text tokens for search / documentation. Not used for matching. */
  keywords: string[];
  /** ANY of these matching is enough (combined with `allOf` if present). */
  signals?: RegExp[];
  /** ALL of these must match. */
  allOf?: RegExp[];
  /** If ANY of these match, the entry is suppressed for this message. */
  exempt?: RegExp[];
}

/**
 * Shared "this is a report / warning / question, not an attack" guard. Runs
 * before every corpus entry. Deliberately narrower than the ruleEngine's own
 * REPORTING_INDICATORS (which has already run and returned safe for the clear
 * cases) — this only catches the residual phrasings.
 */
export const CORPUS_SAFE_CONTEXT: RegExp[] = [
  /\b(is|are)\s+(this|these|that|those)\s+(a\s+)?(scam|phish(?:ing)?|legit|safe|real|fake|virus|malware)\b/i,
  /\b(someone|somebody|a\s+bot|random(?:\s+account)?)\s+(just\s+)?(dm(?:ed|d)?|messaged|sent|pinged)\s+me\b/i,
  /\bgot\s+(this|a)\s+(weird\s+)?(dm|message|link|ping)\b/i,
  /\b(be\s+careful|watch\s+out|heads?\s+up|psa|warning|do\s?n'?t\s+click|dont\s+fall\s+for|dont\s+trust)\b/i,
  /\b(i\s+)?(reported|blocked|banned|warned)\s+(him|her|them|that\s+(user|account|bot|guy))\b/i,
  /\bwhy\s+(do|does|are)\s+(scammers|bots|these)\b/i,
  /\bhow\s+(do|can)\s+i\s+(report|block|avoid)\b/i,
  /\bthat'?s\s+(a\s+)?(scam|phishing|the\s+scam)\b/i,
];

const t = (
  id: string,
  classification: RaidShieldCorpusClassification,
  confidence: number,
  reason: string,
  opts: {
    keywords: string[];
    signals?: RegExp[];
    allOf?: RegExp[];
    exempt?: RegExp[];
    family?: string;
  }
): RaidShieldThreatPattern => ({
  id,
  family: opts.family || id.split('-')[0],
  classification,
  confidence,
  reason,
  keywords: opts.keywords,
  signals: opts.signals,
  allOf: opts.allOf,
  exempt: opts.exempt,
});

// Reusable fragments -------------------------------------------------------
const LINK = /\b(?:https?:\/\/\S+|discord(?:app)?\.com\/\S+|discord\.gg\/\S+|[a-z0-9-]+\.(?:xyz|top|ru|tk|ml|ga|cf|gq|link|click|info|online|site|shop|fun|vip|app|gift|codes?|live|cam|monster|lol|cc|pw|su|icu|best|store|space|website|fit|rest|bond|sbs|autos|cyou)\b(?:\/\S*)?)/i;
const SHORTENER = /\b(?:bit\.ly|tinyurl\.com|cutt\.ly|is\.gd|t\.co|rb\.gy|rebrand\.ly|shorturl\.at|t\.ly|v\.gd|s\.id|goo\.su|clck\.ru|surl\.li|shrturi\.com)\/\S+/i;
const CLICK = /\b(?:click|tap|open|go\s+to|visit|check|dm\s+me|add\s+me|go\s+here)\b/i;
const URGENCY = /\b(?:now|today|hurry|fast|quick(?:ly)?|limited|expires?|last\s+chance|before\s+it'?s\s+gone|only\s+\d+\s+left|24\s?h(?:ours?)?|first\s+\d+)\b/i;
const FREE = /\b(?:free|100%\s*free|no\s+cost|giveaway|give\s?away|claim|redeem|drop(?:ping)?)\b/i;

// =======================================================================
// FAMILY 1 — Discord Nitro / boost / gift phishing (beyond ruleEngine's core rule)
// =======================================================================
const NITRO: RaidShieldThreatPattern[] = [
  t('nitro-dm-me', 'scam', 0.93, 'Discord Nitro bait routed through DMs — classic scam funnel.', {
    keywords: ['free nitro', 'dm me'],
    allOf: [/\bnitro\b/i, /\bdm\s+me\b/i],
    exempt: [/\bmy\s+own\s+nitro\b/i],
  }),
  t('nitro-codes-bio', 'scam', 0.94, 'Fake "Nitro codes in my bio / status" — credential or token phish.', {
    keywords: ['nitro codes', 'bio'],
    allOf: [/\bnitro\s+(?:codes?|gift\s?codes?)\b/i, /\b(?:in\s+(?:my\s+)?bio|check\s+(?:my\s+)?(?:bio|status|profile|about\s+me))\b/i],
  }),
  t('nitro-first-x-join', 'scam', 0.92, 'Fake "first N people to join get Nitro" — invite-bait scam.', {
    keywords: ['first', 'join', 'nitro'],
    allOf: [/\bnitro\b/i, /\bfirst\s+\d+\b/i, /\b(?:join|invite|add)\b/i],
  }),
  t('nitro-everyone-join', 'scam', 0.9, 'Fake "Nitro for everyone who joins my server" giveaway.', {
    keywords: ['nitro', 'everyone', 'join'],
    allOf: [/\bnitro\b/i, /\bfor\s+(?:everyone|all)\b/i, /\bjoin(?:s|ing)?\b/i],
  }),
  t('nitro-giveaway-link', 'scam', 0.95, 'Nitro giveaway paired with an off-platform link — phishing.', {
    keywords: ['nitro', 'giveaway', 'link'],
    allOf: [/\bnitro\b/i, /\bgive\s?away\b/i],
    signals: [LINK, SHORTENER, CLICK],
  }),
  t('nitro-3-months', 'scam', 0.9, 'Fake "3 months / 1 year of free Nitro" offer.', {
    keywords: ['months', 'free nitro'],
    allOf: [/\b(?:1|3|6|12)\s*(?:month|months|year)\s+(?:of\s+)?(?:free\s+)?nitro\b/i],
  }),
  t('nitro-leftover', 'scam', 0.88, 'Fake "I have leftover / extra Nitro to give away" hook.', {
    keywords: ['extra nitro', 'leftover'],
    allOf: [/\b(?:extra|leftover|spare|unused)\s+nitro\b/i, /\b(?:give|giving|drop|hand\s+out)\b/i],
  }),
  t('nitro-steam-combo', 'scam', 0.96, 'Combined "free Discord Nitro + Steam" bundle — always a phish.', {
    keywords: ['nitro', 'steam', 'free'],
    allOf: [/\bnitro\b/i, /\bsteam\b/i, FREE],
  }),
  t('nitro-airdrop', 'scam', 0.94, 'Fake "Nitro airdrop" — impersonates a Discord promo.', {
    keywords: ['nitro', 'airdrop'],
    allOf: [/\bnitro\b/i, /\bair\s?drop\b/i],
  }),
  t('nitro-generator-any', 'scam', 0.97, 'Any "Nitro generator" reference — token stealer / malware.', {
    keywords: ['nitro generator'],
    allOf: [/\bnitro\s+gen(?:erator)?\b/i],
  }),
  t('gift-you-received-nitro', 'scam', 0.95, 'Fake "You have been gifted Discord Nitro, claim here".', {
    keywords: ['gifted nitro', 'claim'],
    allOf: [/\b(?:you(?:'?ve| have)?\s+(?:been\s+)?(?:gifted|received))\b/i, /\bnitro\b/i],
  }),
  t('gift-inbox-link', 'scam', 0.9, 'Fake "gift waiting in your inbox" with a link.', {
    keywords: ['gift', 'inbox'],
    allOf: [/\bgift\b/i, /\b(?:inbox|waiting\s+for\s+you|pending)\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('nitro-disc0rd-typo', 'scam', 0.97, 'Message uses a misspelled "Discord" ("dlscord", "disc0rd") — typosquat phish tell.', {
    keywords: ['dlscord', 'discocrd', 'disc0rd'],
    // Deliberately does NOT match the correct spelling "discord": every alternative below
    // differs from it by at least one character (no bare [il1] class that would let "discord"
    // through). These misspellings essentially only appear in phishing.
    allOf: [/\b(?:d[l1]scord|disc0rd|dlsc0rd|d1sc0rd|discocrd|discrod|dliscord|dizcord|discordd|dis-cord|dıscord)\b/i],
  }),
  t('boost-free-server', 'scam', 0.9, 'Fake "free server boosts / free boosting" offer.', {
    keywords: ['free boost', 'server boost'],
    allOf: [/\b(?:free|cheap)\s+(?:server\s+)?boosts?\b/i, /\b(?:dm|link|claim|get|here)\b/i],
  }),
  t('nitro-verify-to-claim', 'scam', 0.95, 'Fake Nitro that requires "verifying" / logging in first.', {
    keywords: ['nitro', 'verify', 'login'],
    allOf: [/\bnitro\b/i, /\b(?:verify|log\s?in|sign\s?in|authenticate|connect\s+your\s+account)\b/i],
  }),
  t('nitro-sale-cheap', 'scam', 0.88, 'Selling "cheap Nitro" — stolen or fraudulent.', {
    keywords: ['cheap nitro', 'selling nitro'],
    allOf: [/\bnitro\b/i, /\b(?:cheap|selling|sell|\$\d+|paypal|for\s+sale|best\s+price)\b/i],
  }),
  t('gift-card-nitro', 'scam', 0.89, 'Nitro tied to "gift card" redemption — phish or fraud.', {
    keywords: ['nitro', 'gift card'],
    allOf: [/\bnitro\b/i, /\bgift\s*cards?\b/i],
  }),
  t('nitro-only-emoji-link', 'scam', 0.86, 'A bare link plus "nitro" and nothing else — drive-by phish.', {
    keywords: ['nitro', 'link only'],
    allOf: [/^\W{0,6}\bnitro\b/i, LINK],
  }),
  t('nitro-dhl-style', 'scam', 0.92, 'Fake "your Nitro subscription failed / update payment" notice.', {
    keywords: ['nitro', 'payment', 'update'],
    allOf: [/\bnitro\b/i, /\b(?:payment\s+(?:failed|declined)|update\s+(?:your\s+)?(?:payment|billing)|renew\s+now)\b/i],
  }),
  t('nitro-mod-reward', 'scam', 0.9, 'Fake "get Nitro as a reward for becoming staff / active".', {
    keywords: ['nitro', 'reward', 'staff'],
    allOf: [/\bnitro\b/i, /\b(?:reward|prize)\b/i, /\b(?:staff|mod|active|helper|inviting)\b/i],
  }),
];

// =======================================================================
// FAMILY 2 — Steam / game-store credential + trade scams
// =======================================================================
const STEAM: RaidShieldThreatPattern[] = [
  t('steam-trade-banned', 'scam', 0.93, 'Fake "you were reported on Steam, talk to an admin" trade scam.', {
    keywords: ['steam', 'reported', 'admin'],
    allOf: [/\bsteam\b/i, /\b(?:reported|banned|flagged)\b/i, /\b(?:admin|moderator|support|talk\s+to)\b/i],
  }),
  t('steam-free-skins', 'scam', 0.92, 'Fake "free CS / CS2 / Dota skins" drop site.', {
    keywords: ['free skins', 'csgo', 'cs2'],
    allOf: [/\b(?:free|claim)\b/i, /\bskins?\b/i, /\b(?:cs\s?2|csgo|cs:?go|dota|rust|tf2)\b/i],
  }),
  t('steam-community-typo', 'scam', 0.96, 'Misspelled "steamcommunity" domain — session-token phish.', {
    keywords: ['steamcomunity', 'steamcommunuty'],
    // Found by a code review: `c[o0]mm?un[il1]ty` allowed the CORRECT letter at every position
    // (o not just 0, mm not just single m, i not just l/1), so the alternation literally spelled
    // "community" too and matched the real, legitimate steamcommunity.com on any ordinary trade-
    // link share. `powered` also matched Valve's real steampowered.com. Now enumerates only
    // genuinely misspelled forms (each differs from the correct spelling by at least one
    // character, same approach as nitro-disc0rd-typo above) and explicitly excludes both real
    // domains via a negative lookahead as a second safety net.
    allOf: [/\bsteam(?!community\.|powered\.)(?:c0mmunity|commun1ty|comunity|communnity|-community)\.[a-z]/i],
  }),
  t('steam-gift-you-won', 'scam', 0.93, 'Fake "you won a Steam gift / wallet code, claim now".', {
    keywords: ['steam', 'won', 'wallet code'],
    allOf: [/\bsteam\b/i, /\b(?:you\s+won|winner|wallet\s+code|\$\d+\s+(?:gift|balance))\b/i],
  }),
  t('steam-vote-my-team', 'scam', 0.9, 'Fake "vote for my team, sign in with Steam" — OpenID phish.', {
    keywords: ['vote', 'steam', 'team'],
    allOf: [/\bvote\s+for\s+(?:my|our)\s+(?:team|match)\b/i, /\bsteam\b/i],
  }),
  t('steam-trade-url-dm', 'scam', 0.85, 'Unsolicited "send me your Steam trade URL" from a stranger.', {
    keywords: ['trade url', 'steam'],
    allOf: [/\bsteam\b/i, /\btrade\s+(?:url|link|offer)\b/i, /\b(?:send|give|dm|drop)\b/i],
  }),
  t('epic-fortnite-free', 'scam', 0.9, 'Fake free V-Bucks / Fortnite / Epic account drop.', {
    keywords: ['vbucks', 'fortnite', 'epic'],
    allOf: [/\bv-?bucks\b/i, /\b(?:free|claim|generator|drop|giveaway)\b/i],
  }),
  t('roblox-robux-free', 'scam', 0.9, 'Fake free Robux generator / drop.', {
    keywords: ['robux', 'free'],
    allOf: [/\brobux\b/i, /\b(?:free|claim|generator|gen|drop|giveaway|promo\s?code)\b/i],
  }),
  t('game-key-giveaway-link', 'scam', 0.84, 'Random "free game keys" giveaway with an external link.', {
    keywords: ['game keys', 'giveaway'],
    allOf: [/\b(?:game|steam|cd)\s?keys?\b/i, /\b(?:free|giveaway|claim)\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('steam-support-impersonate', 'scam', 0.94, 'Impersonating "Steam Support" in a DM.', {
    keywords: ['steam support', 'valve'],
    allOf: [/\b(?:steam\s+support|valve\s+support|steam\s+trust\s+and\s+safety)\b/i],
  }),
];

// =======================================================================
// FAMILY 3 — Crypto / wallet-drainer / airdrop scams
// =======================================================================
const CRYPTO: RaidShieldThreatPattern[] = [
  t('crypto-double-your', 'scam', 0.95, 'Classic "send X get 2X back" crypto doubler scam.', {
    keywords: ['double', 'crypto', 'send'],
    allOf: [/\b(?:double|2x|triple)\s+your\s+(?:crypto|btc|eth|bitcoin|ethereum|sol|money|deposit)\b/i],
  }),
  t('crypto-elon-giveaway', 'scam', 0.96, 'Fake celebrity (Elon / Tesla / SpaceX) crypto giveaway.', {
    keywords: ['elon', 'giveaway', 'btc'],
    allOf: [/\b(?:elon|musk|tesla|spacex|coinbase|binance|ripple)\b/i, /\b(?:giveaway|give\s?away|airdrop|double|claim)\b/i],
  }),
  t('crypto-airdrop-claim', 'scam', 0.92, 'Fake token airdrop that needs a wallet "connection".', {
    keywords: ['airdrop', 'claim', 'wallet'],
    allOf: [/\bair\s?drop\b/i, /\b(?:claim|connect\s+(?:your\s+)?wallet|eligible)\b/i],
  }),
  t('crypto-connect-wallet', 'scam', 0.93, 'Prompt to "connect your wallet" to an unknown dapp — drainer.', {
    keywords: ['connect wallet', 'dapp'],
    allOf: [/\bconnect\s+(?:your\s+)?wallet\b/i],
    signals: [LINK, SHORTENER, /\b(?:claim|mint|airdrop|verify|sync|validate)\b/i],
  }),
  t('crypto-seed-phrase', 'scam', 0.98, 'Any request for a seed phrase / recovery phrase / private key.', {
    keywords: ['seed phrase', 'private key'],
    allOf: [/\b(?:seed\s+phrase|recovery\s+phrase|private\s+key|12\s+words|24\s+words|mnemonic)\b/i, /\b(?:send|share|give|enter|paste|dm|verify|type)\b/i],
  }),
  t('crypto-mint-now', 'scam', 0.9, 'Fake NFT mint with urgency + external link.', {
    keywords: ['mint', 'nft', 'now'],
    allOf: [/\bmint(?:ing)?\b/i, /\b(?:nft|whitelist|wl|og\s+role)\b/i, URGENCY],
  }),
  t('crypto-investment-return', 'scam', 0.9, 'Guaranteed-return "investment manager / trader" pitch.', {
    keywords: ['investment', 'guaranteed', 'profit'],
    allOf: [/\b(?:invest(?:ment)?|trading|forex|binary\s+options)\b/i, /\b(?:guaranteed|risk[-\s]?free|\d{2,}%\s+(?:profit|return|daily|weekly|roi))\b/i],
  }),
  t('crypto-flip-cashapp', 'scam', 0.92, '"Money flip" via Cash App / PayPal / Venmo / Zelle.', {
    keywords: ['money flip', 'cashapp'],
    allOf: [/\b(?:money\s+flip|flip\s+your\s+(?:money|cash)|cash\s+flip)\b/i],
  }),
  t('crypto-flip-generic', 'scam', 0.9, 'Generic "flip $X into $Y" advance-fee scam.', {
    keywords: ['flip', 'legit sponsor'],
    allOf: [/\bflip\b/i, /\$\s?\d{2,}/, /\b(?:into|to)\s+\$\s?\d{2,}\b/i],
  }),
  t('crypto-giveaway-wallet-fee', 'scam', 0.93, '"Winner" must pay a gas / activation fee first — advance-fee.', {
    keywords: ['winner', 'gas fee', 'activation'],
    allOf: [/\b(?:you\s+won|winner|selected)\b/i, /\b(?:gas\s+fee|activation\s+fee|processing\s+fee|small\s+fee|release\s+fee)\b/i],
  }),
  t('crypto-support-dm', 'scam', 0.9, 'Fake wallet "support" (MetaMask / Trust / Ledger) sliding into DMs.', {
    keywords: ['metamask support', 'ledger', 'trust wallet'],
    allOf: [/\b(?:metamask|trust\s?wallet|ledger|phantom|coinbase|exodus)\b/i, /\b(?:support|helpdesk|help\s+desk|validate|sync|migrate|restore)\b/i],
  }),
  t('crypto-pump-signal', 'scam', 0.85, 'Paid "pump signals / VIP calls" channel promo.', {
    keywords: ['pump', 'signals', 'vip calls'],
    allOf: [/\b(?:pump|signal|vip)\s+(?:group|channel|calls?|signals?)\b/i, /\b(?:join|dm|telegram|whatsapp|link)\b/i],
  }),
  t('crypto-recover-lost', 'scam', 0.9, 'Fake "crypto recovery expert / hacker recovers stolen funds".', {
    keywords: ['recover', 'stolen crypto', 'hacker'],
    allOf: [/\b(?:recover|recovery)\b/i, /\b(?:stolen|lost|scammed)\b/i, /\b(?:crypto|btc|funds|wallet|bitcoin)\b/i],
  }),
  t('crypto-free-eth-btc', 'scam', 0.88, 'Fake "free ETH / BTC / USDT, just claim" drop.', {
    keywords: ['free eth', 'free btc', 'claim'],
    allOf: [/\bfree\s+(?:eth|btc|bitcoin|ethereum|usdt|sol|bnb|doge)\b/i, /\b(?:claim|drop|giveaway|here)\b/i],
  }),
  t('crypto-verify-wallet-link', 'scam', 0.93, '"Verify / validate / sync your wallet" at a link — drainer.', {
    keywords: ['verify wallet', 'sync', 'validate'],
    allOf: [/\bwallet\b/i, /\b(?:verify|validate|sync|revalidate|reconnect|whitelist)\b/i],
    signals: [LINK, SHORTENER],
  }),
];

// =======================================================================
// FAMILY 4 — Fake "you won" / giveaway / prize scams (non-crypto)
// =======================================================================
const PRIZE: RaidShieldThreatPattern[] = [
  t('prize-you-won-generic', 'scam', 0.88, 'Generic "you have won, click to claim your prize".', {
    keywords: ['you won', 'claim prize'],
    allOf: [/\byou(?:'?ve| have)?\s+(?:just\s+)?won\b/i, /\b(?:claim|prize|reward|gift|to\s+receive)\b/i],
    exempt: [/\byou\s+won\s+the\s+(?:game|match|round|round\b|giveaway\s+in\s+this\s+server)\b/i],
  }),
  t('prize-selected-winner', 'scam', 0.88, 'Fake "you were randomly selected as a winner" notice.', {
    keywords: ['selected', 'winner'],
    allOf: [/\b(?:randomly\s+)?selected\b/i, /\b(?:winner|to\s+win|as\s+(?:a|our)\s+winner)\b/i],
  }),
  t('prize-gift-card-survey', 'scam', 0.87, 'Fake "$X gift card for completing a short survey".', {
    keywords: ['gift card', 'survey'],
    allOf: [/\$\s?\d{2,}\s+(?:gift\s?card|amazon|paypal|visa)\b/i, /\b(?:survey|questionnaire|quick\s+form|3\s+questions)\b/i],
  }),
  t('prize-iphone-drop', 'scam', 0.86, 'Fake "free iPhone / PS5 / console" claim link.', {
    keywords: ['free iphone', 'ps5'],
    allOf: [/\bfree\s+(?:iphone|ps5|xbox\s+series|macbook|airpods|nintendo\s+switch)\b/i, /\b(?:claim|click|here|register|dm)\b/i],
  }),
  t('prize-giveaway-follow-steps', 'scam', 0.85, '"Giveaway: follow these steps at [link]" off-platform funnel.', {
    keywords: ['giveaway', 'steps', 'link'],
    allOf: [/\bgive\s?away\b/i, /\b(?:steps|instructions|rules)\b/i],
    signals: [LINK, SHORTENER],
    exempt: [/\b(?:react|✅|👍)\s+to\s+enter\b/i],
  }),
  t('prize-dm-to-claim', 'scam', 0.86, '"You won, DM me to claim" — moving a "prize" to DMs.', {
    keywords: ['won', 'dm to claim'],
    allOf: [/\b(?:you\s+won|winner|congrats)\b/i, /\bdm\s+(?:me|to\s+claim|for\s+details)\b/i],
  }),
  t('prize-cashapp-blessing', 'scam', 0.9, '"Blessing / random act of kindness — sending money, DM your $cashtag".', {
    keywords: ['blessing', 'cashtag', 'sending money'],
    allOf: [/\b(?:blessing|bless(?:ed|ing)\s+someone|random\s+act|sugar\s+(?:daddy|mommy|momma))\b/i, /\b(?:cash\s?app|\$cashtag|paypal|venmo|zelle|dm)\b/i],
  }),
];

// =======================================================================
// FAMILY 5 — Job / recruitment / "hiring" scams
// =======================================================================
const JOB: RaidShieldThreatPattern[] = [
  t('job-earn-per-day', 'scam', 0.9, 'Fake "earn $X per day from home" recruitment.', {
    keywords: ['earn per day', 'from home'],
    allOf: [/\b(?:earn|make|get\s+paid)\b/i, /\$\s?\d{2,}\s*(?:\/|per\s+)?(?:day|hour|week|hr)\b/i],
  }),
  t('job-personal-assistant', 'scam', 0.88, 'Fake "personal assistant" job paid in gift cards / crypto.', {
    keywords: ['personal assistant', 'weekly pay'],
    allOf: [/\bpersonal\s+assistant\b/i, /\b(?:pay|salary|weekly|\$\d+)\b/i],
  }),
  t('job-beta-tester-pay', 'scam', 0.88, 'Fake "paid beta tester / game tester" recruitment DM.', {
    keywords: ['beta tester', 'paid', 'hiring'],
    allOf: [/\b(?:beta|game|product|app)\s+testers?\b/i, /\b(?:paid|hiring|\$\d+|salary|per\s+(?:test|day|hour)|usdt|crypto|paypal)\b/i],
  }),
  t('job-crypto-payout', 'scam', 0.9, 'Job that pays "in USDT / crypto only" — laundering / scam.', {
    keywords: ['job', 'paid in crypto'],
    allOf: [/\b(?:job|work|position|role|task|hiring|hire|recruit\w*|tester)\b/i, /\bpaid\s+in\s+(?:usdt|crypto|bitcoin|btc|eth|gift\s?cards?)\b/i],
  }),
  t('job-telegram-hr', 'scam', 0.87, '"Message our HR on Telegram / WhatsApp" for a job — off-platform.', {
    keywords: ['hr', 'telegram', 'whatsapp'],
    allOf: [/\b(?:hr|recruiter|hiring\s+manager)\b/i, /\b(?:telegram|whatsapp|@\w+\s+on\s+telegram)\b/i],
  }),
  t('job-data-entry-upfront', 'scam', 0.86, 'Data-entry / typing job requiring an upfront "registration fee".', {
    keywords: ['data entry', 'registration fee'],
    allOf: [/\bdata\s+entry\b/i, /\b(?:registration|training|starter|processing)\s+fee\b/i],
  }),
  t('job-social-media-manager', 'scam', 0.83, 'Vague "looking for social media managers, DM, easy money".', {
    keywords: ['social media manager', 'easy money'],
    allOf: [/\bsocial\s+media\s+(?:manager|marketer|handler)\b/i, /\b(?:easy\s+money|no\s+experience|dm\s+me|remote)\b/i],
  }),
  t('job-recruit-hourly-vague', 'scam', 0.82, 'Anonymous "we are hiring, $X/hr, no experience, DM now".', {
    keywords: ['we are hiring', 'no experience'],
    allOf: [/\b(?:we(?:'?re| are)\s+hiring|now\s+hiring|hiring\s+now)\b/i, /\bno\s+experience\b/i, /\bdm\b/i],
  }),
];

// =======================================================================
// FAMILY 6 — Staff / Discord / bot impersonation & account-threat phishing
// =======================================================================
const IMPERSONATION: RaidShieldThreatPattern[] = [
  t('imp-discord-staff', 'scam', 0.95, 'Impersonating official "Discord Staff / Trust & Safety / HypeSquad".', {
    keywords: ['discord staff', 'trust and safety'],
    allOf: [/\b(?:discord)\s+(?:staff|team|support|trust\s+(?:and|&)\s+safety|moderation\s+team|hypesquad\s+team)\b/i],
    exempt: [/\b(?:this\s+server'?s|our)\s+(?:staff|team)\b/i],
  }),
  t('imp-account-terminated', 'scam', 0.94, 'Fake "your account will be disabled / terminated, verify now".', {
    keywords: ['account terminated', 'verify now'],
    allOf: [/\byour\s+account\s+(?:will\s+be|has\s+been|is\s+about\s+to\s+be)\s+(?:disabled|terminated|suspended|deleted|flagged|banned)\b/i],
  }),
  t('imp-report-against-you', 'scam', 0.92, 'Fake "a report was filed against you, contact staff to appeal".', {
    keywords: ['report filed', 'against you', 'appeal'],
    allOf: [/\b(?:report|complaint|copyright\s+strike)\b/i, /\b(?:against\s+you|about\s+you|on\s+your\s+account)\b/i, /\b(?:appeal|contact|respond|reply\s+within)\b/i],
  }),
  t('imp-underage-review', 'scam', 0.93, 'Fake "your account was flagged as underage, verify your age".', {
    keywords: ['underage', 'verify age'],
    allOf: [/\b(?:flagged|reported|reviewed)\s+(?:as\s+)?(?:underage|under\s+13|being\s+a\s+minor)\b/i],
  }),
  t('imp-mod-application-dm', 'scam', 0.88, 'Unsolicited "you were picked to be a moderator, verify here" DM.', {
    keywords: ['picked', 'moderator', 'verify here'],
    allOf: [/\b(?:picked|chosen|selected|promoted)\b/i, /\b(?:moderator|mod\s+team|staff\s+team)\b/i],
    signals: [LINK, SHORTENER, /\bverify\b/i],
  }),
  t('imp-bot-official-dm', 'scam', 0.9, 'A "bot" DMing you claiming to be the server\'s official verification bot.', {
    keywords: ['official bot', 'verification bot', 'dm'],
    allOf: [/\b(?:official|server'?s?)\s+(?:verification|security|captcha|moderation)\s+bot\b/i, /\b(?:dm|message|contacted\s+you)\b/i],
  }),
  t('imp-owner-dm-favor', 'scam', 0.85, 'Someone claiming to be the owner asking for a "quick favor" in DMs.', {
    keywords: ['im the owner', 'favor'],
    allOf: [/\bi(?:'?m| am)\s+(?:the\s+)?(?:owner|founder|admin)\s+of\s+(?:this|the)\s+server\b/i, /\b(?:favor|favour|help\s+me\s+out|quick\s+thing)\b/i],
  }),
  t('imp-copyright-strike-link', 'scam', 0.92, 'Fake "copyright infringement notice, review the material" with link.', {
    keywords: ['copyright', 'infringement', 'review'],
    allOf: [/\bcopyright\b/i, /\b(?:infringement|violation|strike|claim)\b/i],
    signals: [LINK, SHORTENER, /\bappeal|review|dispute\b/i],
  }),
];

// =======================================================================
// FAMILY 7 — Credential / OAuth / login-page phishing
// =======================================================================
const PHISH: RaidShieldThreatPattern[] = [
  t('phish-login-to-claim', 'scam', 0.92, 'Requires a Discord login on an external page "to claim" something.', {
    keywords: ['login', 'claim'],
    allOf: [/\b(?:log\s?in|sign\s?in)\s+with\s+(?:your\s+)?discord\b/i, /\b(?:to\s+claim|to\s+verify|to\s+continue|to\s+enter)\b/i],
  }),
  t('phish-authorize-app', 'scam', 0.9, 'Prompt to "authorize" an unknown Discord OAuth app (scope grab).', {
    keywords: ['authorize', 'oauth', 'app'],
    allOf: [/\bauthor[iz]s?e\b/i, /\b(?:app|application|bot)\b/i],
    signals: [/\bdiscord(?:app)?\.com\/oauth2\/authorize/i, LINK],
  }),
  t('phish-oauth-scope', 'scam', 0.93, 'A Discord OAuth link requesting sensitive scopes (email / guilds.join).', {
    keywords: ['oauth2', 'scope'],
    signals: [/discord(?:app)?\.com\/(?:api\/)?oauth2\/authorize\S*scope=\S*(?:email|guilds\.join|connections|gdm\.join)/i],
  }),
  t('phish-verify-outside', 'scam', 0.88, 'Server "verification" that happens on a non-Discord domain.', {
    keywords: ['verify', 'external site'],
    allOf: [/\bverif(?:y|ication)\b/i, LINK],
    exempt: [/\bdiscord\.com\/(?:channels|invite)\b/i, /\b(?:captcha|hcaptcha|recaptcha)\s+in\s+(?:the\s+)?rules\b/i],
  }),
  t('phish-form-credentials', 'scam', 0.9, 'Asks to submit email + password into a form / DM.', {
    keywords: ['email', 'password', 'submit'],
    allOf: [/\b(?:email|username)\b/i, /\bpassword\b/i, /\b(?:enter|submit|send|dm|type|provide|confirm)\b/i],
  }),
  t('phish-2fa-code', 'scam', 0.97, 'Any request to share a 2FA / verification / one-time code.', {
    keywords: ['2fa code', 'verification code', 'otp'],
    allOf: [/\b(?:2fa|two[-\s]?factor|verification|security|one[-\s]?time|login)\s+code\b/i, /\b(?:send|share|give|tell|forward|paste|dm|screenshot)\b/i],
  }),
  t('phish-qr-login', 'scam', 0.96, 'Instruction to scan a QR code to "log in" / "verify" — Remote Auth hijack.', {
    keywords: ['qr', 'scan', 'login'],
    allOf: [/\bqr\s*code\b/i, /\b(?:scan|point\s+your\s+(?:phone|camera))\b/i],
    exempt: [/\bqr\s*code\s+(?:menu|for\s+the\s+wifi|on\s+the\s+poster)\b/i],
  }),
  t('phish-screenshot-token', 'scam', 0.95, 'Asks for a screenshot of DevTools / "your token" / localStorage.', {
    keywords: ['token', 'devtools', 'console'],
    allOf: [/\b(?:token|localstorage|dev\s?tools|f12|console|inspect\s+element)\b/i, /\b(?:paste|send|screenshot|show\s+me|copy)\b/i],
  }),
  t('phish-fake-captcha-page', 'scam', 0.86, 'Link to a "captcha / human verification" page off Discord.', {
    keywords: ['human verification', 'captcha page'],
    allOf: [/\b(?:human\s+verification|are\s+you\s+human|complete\s+(?:the\s+)?captcha)\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('phish-billing-update', 'scam', 0.88, 'Fake "update your billing / card on file" prompt with link.', {
    keywords: ['billing', 'card', 'update'],
    allOf: [/\b(?:billing|payment\s+method|card\s+on\s+file|subscription)\b/i, /\b(?:update|confirm|re-?enter|expired)\b/i],
    signals: [LINK, SHORTENER],
  }),
];

// =======================================================================
// FAMILY 8 — Malware / token grabber / cheat / "run this" scams
// =======================================================================
const MALWARE: RaidShieldThreatPattern[] = [
  t('mal-run-exe', 'scam', 0.94, 'Tells the user to download and run an .exe / .bat / .scr file.', {
    keywords: ['exe', 'download', 'run'],
    // Found by a code review: `com` here matched the ubiquitous .com TLD, not the old DOS
    // executable extension it was meant for — "just open reddit.com and check it out" tripped
    // this at 0.94 confidence. Dropped; every other extension here is unambiguous (none are also
    // common TLDs), so no replacement pattern is needed.
    allOf: [/\.(?:exe|bat|scr|cmd|msi|vbs|jar|apk|rar\s+password)\b/i, /\b(?:run|open|download|execute|double[-\s]?click|extract)\b/i],
  }),
  t('mal-free-cheat', 'scam', 0.92, 'Free game "cheat / hack / aimbot / injector" download — RAT bundle.', {
    keywords: ['cheat', 'aimbot', 'injector'],
    allOf: [/\b(?:cheat|hack|aimbot|wallhack|injector|spoofer|unlock\s?all|mod\s?menu)\b/i, /\b(?:free|download|link|dm|working|undetected)\b/i],
  }),
  t('mal-token-logger', 'scam', 0.96, 'Reference to a token logger / grabber / stealer tool.', {
    keywords: ['token logger', 'grabber', 'stealer'],
    allOf: [/\b(?:token\s+(?:logger|grabber|stealer)|discord\s+(?:logger|stealer)|password\s+stealer|info\s?stealer|redline|raccoon\s+stealer)\b/i],
  }),
  t('mal-nitro-sniper', 'scam', 0.9, 'Fake "Nitro sniper / auto-claim" tool — steals the token that runs it.', {
    keywords: ['nitro sniper', 'auto claim'],
    allOf: [/\bnitro\s+(?:sniper|snipe|auto[-\s]?claim(?:er)?)\b/i],
  }),
  t('mal-disable-antivirus', 'scam', 0.95, 'Instructs the user to disable antivirus / Windows Defender.', {
    keywords: ['disable antivirus', 'defender', 'false positive'],
    allOf: [/\b(?:disable|turn\s+off|whitelist|add\s+an?\s+exception\s+for)\b/i, /\b(?:antivirus|anti-?virus|windows\s+defender|defender|av)\b/i],
  }),
  t('mal-fake-mod-installer', 'scam', 0.88, '"Install this client mod / better discord plugin" from a random link.', {
    keywords: ['client mod', 'plugin', 'installer'],
    allOf: [/\b(?:client\s+mod|betterdiscord\s+plugin|discord\s+mod|custom\s+client|theme\s+installer)\b/i, /\b(?:install|download|run|link)\b/i],
    exempt: [/\bbetterdiscord\.app\b/i],
  }),
  t('mal-crypto-miner', 'scam', 0.87, 'Bundled "free tool" that is actually a crypto miner.', {
    keywords: ['miner', 'free tool'],
    allOf: [/\b(?:crypto\s+miner|silent\s+miner|xmrig|background\s+miner)\b/i],
  }),
  t('mal-password-protected-archive', 'scam', 0.85, 'Password-protected archive shared to evade AV scanning.', {
    keywords: ['password', 'zip', 'rar'],
    allOf: [/\b(?:zip|rar|7z|archive)\b/i, /\bpassword\s+(?:is|:)\s*\S+/i],
  }),
  t('mal-github-release-cheat', 'scam', 0.83, 'Link to a "loader" / "launcher" release for a cheat or "free game".', {
    keywords: ['loader', 'launcher', 'release'],
    allOf: [/\b(?:loader|launcher|setup|installer)\b/i, /\b(?:free\s+game|cracked|pre-?installed|repack|cheat|premium\s+unlocked)\b/i],
  }),
  t('mal-fivem-menu', 'scam', 0.86, 'FiveM / GTA "mod menu" or "recovery" download bait.', {
    keywords: ['fivem', 'mod menu', 'gta'],
    allOf: [/\b(?:fivem|gta\s?5?|rage\s?mp)\b/i, /\b(?:mod\s?menu|recovery|unlock\s?all|money\s+drop)\b/i, /\b(?:free|download|dm|link)\b/i],
  }),
];

// =======================================================================
// FAMILY 9 — Fake verification / role-gate bait
// =======================================================================
const FAKEVERIFY: RaidShieldThreatPattern[] = [
  t('fv-click-for-role', 'scam', 0.84, '"Click this link to get the member / verified role" (should be in-server).', {
    keywords: ['click', 'get role', 'verified'],
    allOf: [/\b(?:click|tap|go\s+to)\b/i, /\b(?:to\s+get|to\s+receive|for)\s+(?:the\s+)?(?:member|verified|access|entry)\s+role\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('fv-captcha-guard-clone', 'scam', 0.86, 'Impersonates a known verification bot (Captcha.bot / Wick / Double Counter) via link.', {
    keywords: ['captcha bot', 'wick', 'verify'],
    allOf: [/\b(?:captcha\.?bot|captcha-?guard|wick\s+bot|double\s+counter|safeone|verified\s+dyno)\b/i, LINK],
  }),
  t('fv-dm-to-verify', 'scam', 0.85, '"You must DM the bot / a staff link to verify" — verification never needs that.', {
    keywords: ['dm to verify', 'verify'],
    allOf: [/\b(?:you\s+(?:must|need\s+to|have\s+to)|please)\b/i, /\bverify\b/i, /\b(?:dm|message)\s+(?:me|this\s+bot|@|the\s+link)\b/i],
  }),
  t('fv-connect-account-to-verify', 'scam', 0.87, 'Verification that asks to connect Steam / Google / phone via external site.', {
    keywords: ['connect account', 'verify'],
    allOf: [/\bverif(?:y|ication)\b/i, /\bconnect\s+(?:your\s+)?(?:steam|google|phone\s+number|riot|epic)\b/i],
  }),
];

// =======================================================================
// FAMILY 10 — Unsolicited DM advertising / "add me" / self-promo funnels
// =======================================================================
const DMADV: RaidShieldThreatPattern[] = [
  t('dm-check-your-dms', 'spam', 0.72, 'Mass "check your DMs everyone" — classic ad-blast tell.', {
    keywords: ['check your dms', 'everyone'],
    allOf: [/\bcheck\s+(?:your\s+)?dm(?:s|'?s)?\b/i, /\b(?:everyone|all|guys|yall|y'?all)\b/i],
  }),
  t('dm-add-me-free', 'spam', 0.7, '"Add me / DM me for free [thing]" cold solicitation.', {
    keywords: ['add me', 'dm me', 'free'],
    // Found by a code review: the shared FREE fragment includes the bare adjective "free" (as in
    // "free time/free tonight"), not just "free [bait noun]" — so "add me on Steam, I'm free
    // tonight if you wanna play" satisfied both halves of this allOf on completely ordinary chat.
    // Narrowed here to require "free" modify an actual bait noun, same standard the rest of the
    // corpus already holds "free X" claims to.
    allOf: [/\b(?:add|dm|message|hmu|hit\s+me\s+up)\s+me\b/i, /\bfree\s+(?:nitro|robux|v-?bucks|gift\s*cards?|codes?|stuff|money|skins?|followers?|subs?|giveaways?)\b/i],
  }),
  t('dm-i-dmed-everyone', 'spam', 0.74, '"I just DMed everyone / all of you" — bulk DM advertising.', {
    keywords: ['dmed everyone'],
    allOf: [/\bi\s+(?:just\s+)?(?:dm(?:ed|d)?|messaged)\s+(?:everyone|all\s+of\s+you|yall|y'?all)\b/i],
  }),
  t('dm-selling-services', 'spam', 0.7, 'Cold-selling a design / editing / smm service into an unrelated channel.', {
    keywords: ['selling', 'services', 'dm'],
    allOf: [/\b(?:selling|offering|providing|i\s+do)\b/i, /\b(?:logos?|thumbnails?|banners?|edits?|gfx|vfx|smma?|beats?|websites?|bots?)\b/i, /\b(?:dm\s+me|prices\s+in\s+dm|cheap|hmu)\b/i],
  }),
  t('dm-follow-back', 'spam', 0.68, '"F4F / follow for follow / sub4sub" engagement spam.', {
    keywords: ['f4f', 'follow4follow', 'sub4sub'],
    allOf: [/\b(?:f4f|s4s|sub4sub|follow\s?4\s?follow|follow\s+for\s+follow|like\s+for\s+like|l4l)\b/i],
  }),
  t('dm-join-my-server-blast', 'spam', 0.7, 'Repeated "join my server" ad with an invite in an unrelated channel.', {
    keywords: ['join my server', 'invite'],
    allOf: [/\bjoin\s+(?:my|our|this)\s+(?:new\s+)?server\b/i, /discord\.gg\//i],
    exempt: [/\b(?:can\s+i|is\s+it\s+ok(?:ay)?\s+to|allowed\s+to)\s+(?:post|share|advertise)\b/i],
  }),
  t('dm-onlyfans-promo', 'spam', 0.8, 'OnlyFans / "spicy content" self-promo blast, usually bot-driven.', {
    keywords: ['onlyfans', 'link in bio', 'spicy'],
    allOf: [/\b(?:onlyfans|only\s?fans|0nlyfans|of\s+link|spicy\s+content|nsfw\s+content|my\s+lewds)\b/i, /\b(?:link\s+in\s+(?:bio|profile)|dm|check\s+(?:my\s+)?(?:bio|profile|status)|subscribe)\b/i],
  }),
];

// =======================================================================
// FAMILY 11 — Raid / nuke / self-bot / server-attack tooling
// =======================================================================
const RAID: RaidShieldThreatPattern[] = [
  t('raid-lets-raid', 'raid', 0.9, 'Explicit call to raid / nuke a specific server.', {
    keywords: ['raid', 'nuke', 'lets go'],
    allOf: [/\b(?:let'?s|we\s+(?:should|gonna|will|are\s+gonna)|time\s+to|everyone)\s+(?:raid|nuke)\b/i],
    exempt: [/\b(?:raid|nuke)\s+(?:boss|wing|dungeon|team|comp|group|in\s+(?:wow|ffxiv|destiny|the\s+game)|night)\b/i],
  }),
  t('raid-tool-advert', 'raid', 0.92, 'Advertising a raid tool / server nuker / token raider.', {
    keywords: ['raid tool', 'nuker', 'raider'],
    allOf: [/\b(?:raid\s+tool|server\s+nuker|nuke\s+bot|discord\s+raider|token\s+raider|raid\s+bot|self[-\s]?bot\s+raid|nightmare\s+bot|deleter\s+bot)\b/i],
  }),
  t('raid-join-token-raid', 'raid', 0.9, 'Recruiting for a "token raid" / mass-account raid.', {
    keywords: ['token raid', 'join the raid'],
    allOf: [/\btoken\s+raid\b/i],
  }),
  t('raid-mass-dm-tool', 'raid', 0.88, 'Advertising a mass-DM / DM-all-members tool.', {
    keywords: ['mass dm', 'dm all members'],
    allOf: [/\b(?:mass\s+dm|dm\s+all\s+(?:members|users)|dm\s+bomber|auto\s+dm\s+tool)\b/i],
  }),
  t('raid-webhook-spam', 'raid', 0.88, 'Sharing a captured webhook to spam / deface a channel.', {
    keywords: ['webhook', 'spam', 'delete'],
    allOf: [/\bwebhook\b/i, /\b(?:spam|nuke|delete\s+all|flood|deface|blow\s+up)\b/i],
  }),
  t('raid-everyone-spam-invite', 'raid', 0.9, 'Mass mention combined with an external / suspicious invite.', {
    keywords: ['@everyone', 'invite', 'raid'],
    allOf: [/(?:@everyone|@here)/, /discord\.gg\//i, /\b(?:join|raid|come|move\s+here|new\s+server|this\s+one'?s\s+dead)\b/i],
  }),
  t('raid-ping-spam-brag', 'raid', 0.82, 'Bragging about / threatening ping-spam or channel spam.', {
    keywords: ['ping spam', 'spam everyone'],
    allOf: [/\b(?:ping\s+spam|spam\s+ping|ping\s+everyone|blow\s+up\s+(?:the\s+)?(?:notifications|server))\b/i],
  }),
  t('raid-gore-cp-threat', 'raid', 0.98, 'Threat to post gore / CSAM / shock content to get a server banned.', {
    keywords: ['gore', 'post cp', 'get server banned'],
    allOf: [/\b(?:post|spam|drop|flood\s+with)\b/i, /\b(?:gore|cp|csam|beheading|shock\s+(?:images|content)|snuff)\b/i],
  }),
  t('raid-buy-accounts-for-raid', 'raid', 0.86, 'Selling / buying aged Discord accounts explicitly for raiding.', {
    keywords: ['aged accounts', 'raid', 'buy'],
    allOf: [/\b(?:aged|verified|bulk|OG)\s+(?:discord\s+)?(?:accounts?|tokens?)\b/i, /\b(?:raid|spam|bypass|for\s+sale|buy|selling)\b/i],
  }),
  t('raid-selfbot-brag', 'raid', 0.8, 'Promoting a self-bot for spam / auto-typing / raid support.', {
    keywords: ['self bot', 'selfbot'],
    allOf: [/\bself[-\s]?bot\b/i, /\b(?:spam|raid|auto|farm|nuke|token)\b/i],
  }),
];

// =======================================================================
// FAMILY 12 — Spam behaviour (content-shape, not link-based)
// =======================================================================
const SPAM: RaidShieldThreatPattern[] = [
  t('spam-repeated-char-flood', 'spam', 0.78, 'A single character or emoji repeated into a flood.', {
    keywords: ['flood', 'repeat'],
    signals: [/(.)\1{24,}/, /(?:\p{Extended_Pictographic}\s*){15,}/u],
  }),
  t('spam-repeated-word-flood', 'spam', 0.76, 'The same short word repeated many times in one message.', {
    keywords: ['spam', 'repeat word'],
    signals: [/\b(\w{1,12})\b(?:\W+\1\b){9,}/i],
  }),
  t('spam-zalgo', 'spam', 0.8, 'Zalgo / combining-mark text designed to break the channel.', {
    keywords: ['zalgo', 'glitch text'],
    signals: [/[̀-ͯ҃-҉᪰-᫿᷀-᷿⃐-⃿]{6,}/],
  }),
  t('spam-invite-list', 'spam', 0.82, 'Several different server invites stacked in one message.', {
    keywords: ['invite spam'],
    signals: [/(?:discord\.gg\/\S+[\s,]+){3,}/i],
  }),
  t('spam-everyone-here-repeat', 'spam', 0.8, 'Repeated @everyone / @here text (mention-spam attempt).', {
    keywords: ['@everyone spam'],
    signals: [/(?:@everyone|@here)(?:\s*\S*\s*(?:@everyone|@here)){2,}/],
  }),
  t('spam-copypasta-blast', 'spam', 0.7, 'Known chain-message / copypasta blasted verbatim.', {
    keywords: ['copypasta', 'chain message'],
    allOf: [/\b(?:send\s+this\s+to\s+\d+\s+(?:people|servers|friends)|copy\s+and\s+paste\s+this|if\s+you\s+don'?t\s+(?:repost|send)\s+this)\b/i],
  }),
  t('spam-all-caps-advert-urgency', 'spam', 0.7, 'All-caps promo shout with urgency and a link.', {
    keywords: ['all caps', 'advert'],
    allOf: [/[A-Z]{12,}/, URGENCY],
    signals: [LINK, SHORTENER, /discord\.gg\//i],
  }),
];

// =======================================================================
// FAMILY 13 — Account / boosting / token marketplace
// =======================================================================
const MARKET: RaidShieldThreatPattern[] = [
  t('mkt-selling-accounts', 'scam', 0.82, 'Selling Discord / game / social accounts.', {
    keywords: ['selling accounts', 'cheap'],
    allOf: [/\b(?:selling|sell|buy|trading)\b/i, /\b(?:discord|instagram|tiktok|steam|valorant|fortnite|riot|spotify|minecraft)\s+accounts?\b/i],
  }),
  t('mkt-cheap-boosts', 'scam', 0.82, 'Selling cheap server boosts (usually via stolen Nitro).', {
    keywords: ['boosts', 'cheap', '14x'],
    allOf: [/\b(?:14x|2x|server)\s*boosts?\b/i, /\b(?:cheap|\$\d+|for\s+sale|selling|dm|1\s+month|3\s+month)\b/i],
  }),
  t('mkt-member-boosting', 'scam', 0.8, 'Selling fake members / "join bots" to inflate a server.', {
    keywords: ['members', 'join bots', 'boost'],
    allOf: [/\b(?:members?|joins?|online\s+members?|offline\s+members?)\b/i, /\b(?:bot(?:s|ted)?|fake|cheap|\$\d+|1k|package|selling|boost)\b/i],
  }),
  t('mkt-followers-likes', 'scam', 0.8, 'Selling followers / likes / views (bot engagement).', {
    keywords: ['followers', 'likes', 'views', 'buy'],
    allOf: [/\b(?:followers?|likes?|views?|subscribers?|reposts?)\b/i, /\b(?:buy|cheap|\$\d+|1k|10k|package|selling|panel|smm)\b/i],
  }),
  t('mkt-token-sale', 'scam', 0.9, 'Selling Discord tokens / "user tokens" outright.', {
    keywords: ['discord tokens', 'selling'],
    allOf: [/\b(?:discord\s+)?(?:user\s+)?tokens?\b/i, /\b(?:selling|sell|buy|for\s+sale|bulk|\$\d+|each)\b/i],
  }),
];

// =======================================================================
// FAMILY 14 — Sextortion / NSFW bait / catfish
// =======================================================================
const NSFW: RaidShieldThreatPattern[] = [
  t('nsfw-leaked-nudes-link', 'scam', 0.85, 'Fake "leaked nudes / teen content" link — malware or catfish funnel.', {
    keywords: ['leaked', 'nudes', 'link'],
    allOf: [/\b(?:leaked|leak|hacked)\b/i, /\b(?:nudes?|pics?|onlyfans|content|folder|mega|drive)\b/i],
    signals: [LINK, SHORTENER, /\bdiscord\.gg\//i],
  }),
  t('nsfw-teen-bait', 'scam', 0.95, 'Bait referencing sexual content involving minors — report + hard block.', {
    keywords: ['teen', 'young', 'nsfw'],
    allOf: [/\b(?:teen|young\s+girls?|13|14|15|underage|minor|jailbait|loli|cp)\b/i, /\b(?:nudes?|content|pics?|vids?|server|link|trade|dropbox)\b/i],
  }),
  t('nsfw-dating-bot', 'spam', 0.8, 'Catfish "hey wanna chat / see my pics" opener typical of NSFW bots.', {
    keywords: ['wanna chat', 'my pics', 'lonely'],
    allOf: [/\b(?:hey\s+cutie|wanna\s+(?:chat|talk|see)|feeling\s+lonely|looking\s+for\s+(?:fun|someone)|add\s+me\s+on\s+(?:snap|telegram))\b/i, /\b(?:pics?|snap|telegram|kik|18\+|link)\b/i],
  }),
  t('nsfw-sextortion-threat', 'scam', 0.93, 'Sextortion: threat to leak images / DMs unless paid.', {
    keywords: ['i have your', 'leak', 'pay'],
    allOf: [/\bi\s+(?:have|recorded|saved|got)\s+(?:your|you)\b/i, /\b(?:nudes?|video|pics?|webcam|dms?|screen)\b/i, /\b(?:leak|post|send\s+to|unless\s+you|pay|\$\d+|btc)\b/i],
  }),
];

// =======================================================================
// FAMILY 15 — IP / info grabbers, fake "who viewed", stat pages
// =======================================================================
const GRABBER: RaidShieldThreatPattern[] = [
  t('grab-known-logger-domain', 'scam', 0.93, 'Link on a known IP-logger service (grabify, iplogger, etc.).', {
    keywords: ['grabify', 'iplogger'],
    signals: [/\b(?:grabify\.link|iplogger\.(?:org|com|ru)|blasze\.tk|2no\.co|yip\.su|ps3cfw\.com|iplis\.ru|02ip\.ru|ipgraber\.ru|ip-tracker\.org|whatstheirip|lovebird\.guru|catsnthings\.fun|gyazo\.nl|trulink\.in|shrekislove\.info|dizzcord\.com)\b/i],
  }),
  t('grab-who-viewed', 'scam', 0.86, 'Fake "see who viewed your profile / stalks you" link.', {
    keywords: ['who viewed', 'stalks'],
    allOf: [/\b(?:who\s+(?:viewed|visited|stalks|checks)\s+(?:your|my)\s+(?:profile|account)|profile\s+viewers?)\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('grab-click-to-see-online', 'scam', 0.84, 'Fake "click to see who\'s online / who blocked you" tool.', {
    keywords: ['who blocked you', 'click'],
    allOf: [/\b(?:who\s+(?:blocked|unfriended|removed)\s+you|see\s+who'?s\s+online\s+now)\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('grab-server-stats-external', 'scam', 0.82, 'Fake "check your server stats / message count" external page.', {
    keywords: ['server stats', 'message count'],
    allOf: [/\b(?:your\s+(?:server|discord)\s+stats|message\s+count|activity\s+score|check\s+your\s+rank)\b/i],
    signals: [SHORTENER, /\b[a-z0-9-]+\.(?:xyz|top|link|click|site|online)\b/i],
  }),
];

// =======================================================================
// FAMILY 16 — Fake tech / platform "support" & phone scams
// =======================================================================
const SUPPORT: RaidShieldThreatPattern[] = [
  t('sup-virus-call-number', 'scam', 0.9, 'Fake "your device is infected, call this number" popup text.', {
    keywords: ['infected', 'call', 'support number'],
    allOf: [/\b(?:your\s+(?:pc|computer|device|iphone|android)\s+(?:is\s+)?(?:infected|has\s+a\s+virus|compromised))\b/i, /\b(?:call|contact|dial)\b/i],
  }),
  t('sup-microsoft-apple', 'scam', 0.88, 'Impersonating Microsoft / Apple / Google support.', {
    keywords: ['microsoft support', 'apple support'],
    allOf: [/\b(?:microsoft|apple|google|amazon|paypal)\s+(?:support|security\s+team|help\s+desk|account\s+team)\b/i, /\b(?:call|verify|suspended|locked|unusual\s+activity|click)\b/i],
  }),
  t('sup-refund-scam', 'scam', 0.86, 'Fake "you were overcharged / here is your refund, confirm details".', {
    keywords: ['refund', 'overcharged', 'confirm'],
    allOf: [/\brefund\b/i, /\b(?:confirm|verify|provide|re-?enter)\s+(?:your\s+)?(?:card|bank|details|account|payment)\b/i],
  }),
  t('sup-gift-card-payment', 'scam', 0.92, 'Demands payment / "verification" in gift cards (Steam / Amazon / iTunes).', {
    keywords: ['pay in gift cards', 'itunes', 'steam card'],
    allOf: [/\b(?:pay|payment|send|buy)\b/i, /\b(?:itunes|amazon|steam|google\s+play|apple)\s+(?:gift\s?)?cards?\b/i],
  }),
];

// =======================================================================
// FAMILY 17 — Fake partnership / bot-add-with-admin
// =======================================================================
const PARTNER: RaidShieldThreatPattern[] = [
  t('part-add-bot-admin', 'scam', 0.9, '"Partner with us — just add our bot with Administrator" — nuke setup.', {
    keywords: ['partner', 'add our bot', 'administrator'],
    allOf: [/\b(?:partner(?:ship)?|collab|affiliate)\b/i, /\badd\s+(?:our|this|my)\s+bot\b/i, /\b(?:admin(?:istrator)?|all\s+permissions?|manage\s+server)\b/i],
  }),
  t('part-give-role-first', 'scam', 0.85, 'Partnership DM that needs a staff role / channel-post permission first.', {
    keywords: ['partnership', 'give me role'],
    allOf: [/\bpartner(?:ship)?\b/i, /\b(?:give\s+me\s+(?:a\s+)?(?:role|perms|permission)|need\s+(?:posting|advertise)\s+perms)\b/i],
  }),
  t('part-fake-rep-dm', 'spam', 0.75, 'Cold "I represent [big server/brand], let\'s partner" DM funnel.', {
    keywords: ['i represent', 'partner', 'dm'],
    allOf: [/\bi\s+(?:represent|work\s+for|am\s+(?:a\s+)?rep(?:resentative)?\s+of)\b/i, /\b(?:partner|collab|promo|advertis)\b/i],
  }),
];

// =======================================================================
// FAMILY 18 — Non-English variants of the highest-frequency scams
// =======================================================================
const MULTILANG: RaidShieldThreatPattern[] = [
  t('ml-es-nitro-gratis', 'scam', 0.93, 'Spanish "Nitro gratis, reclama aquí" phishing.', {
    keywords: ['nitro gratis', 'reclama'],
    allOf: [/\bnitro\s+gratis\b/i, /\b(?:reclama|reclamar|aqu[ií]|link|enlace|gratis\s+por)\b/i],
  }),
  t('ml-es-regalo-discord', 'scam', 0.9, 'Spanish fake "Discord te ha regalado / has ganado" gift.', {
    keywords: ['has ganado', 'regalo'],
    allOf: [/\b(?:has\s+ganado|te\s+(?:ha|han)\s+regalado|felicidades\s+ganaste)\b/i, /\b(?:nitro|regalo|premio|tarjeta)\b/i],
  }),
  t('ml-es-verifica-cuenta', 'scam', 0.9, 'Spanish "verifica tu cuenta o será suspendida" phishing.', {
    keywords: ['verifica tu cuenta', 'suspendida'],
    allOf: [/\bverifica\s+tu\s+cuenta\b/i, /\b(?:suspendida|eliminada|bloqueada|24\s?horas)\b/i],
  }),
  t('ml-fr-nitro-gratuit', 'scam', 0.93, 'French "Nitro gratuit, récupère ici" phishing.', {
    keywords: ['nitro gratuit', 'récupère'],
    allOf: [/\bnitro\s+gratuit\b/i, /(?:r[eéè]cup[eéè]re\w*|r[eé]clame\w*|\bici\b|\blien\b|\bclique\w*)/i],
  }),
  t('ml-fr-compte-suspendu', 'scam', 0.9, 'French "votre compte sera suspendu, vérifiez maintenant".', {
    keywords: ['compte suspendu', 'vérifiez'],
    allOf: [/\b(?:votre|ton)\s+compte\s+(?:sera|va\s+[eê]tre|a\s+[eé]t[eé])\s+(?:suspendu|supprim[eé]|banni|d[eé]sactiv[eé])\b/i],
  }),
  t('ml-fr-cadeau-gagne', 'scam', 0.88, 'French fake "tu as gagné un cadeau, réclame".', {
    keywords: ['tu as gagné', 'cadeau'],
    allOf: [/\btu\s+as\s+gagn[eé]\b/i, /\b(?:cadeau|nitro|carte|prix|r[eé]compense)\b/i],
  }),
  t('ml-de-kostenlos-nitro', 'scam', 0.9, 'German "kostenloses Nitro hier abholen" phishing.', {
    keywords: ['kostenlos nitro', 'nitro'],
    allOf: [/\b(?:kostenlos(?:es)?)\s+nitro\b/i],
  }),
  t('ml-pt-nitro-gratis', 'scam', 0.9, 'Portuguese "Nitro grátis, resgate aqui" phishing.', {
    keywords: ['nitro gratis', 'resgate'],
    allOf: [/\bnitro\s+gr[aá]tis\b/i, /\b(?:resgat\w+|aqui|link|clique)\b/i],
  }),
  t('ml-ru-besplatno', 'scam', 0.88, 'Russian "бесплатный Nitro / Discord подарок" phishing.', {
    keywords: ['бесплатно', 'nitro'],
    allOf: [/\b(?:бесплатн\w+|халяв\w+|подар\w+)\b/i, /\bnitro|дискорд\b/i],
  }),
  t('ml-es-trabajo-casa', 'scam', 0.85, 'Spanish "gana $X desde casa, escribe al privado".', {
    keywords: ['gana desde casa', 'privado'],
    allOf: [/\bgan[ae]\w*\b/i, /\$\s?\d{2,}/, /\b(?:desde\s+casa|d[ií]a|privado|whatsapp|telegram)\b/i],
  }),
];

// =======================================================================
// FAMILY 19 — Explicit "safe context" disambiguators (return null => Default Safe)
// These stop the corpus from flagging benign messages that happen to contain
// scam vocabulary. They win over threat entries.
// =======================================================================
export const CORPUS_SAFE_GUARDS: RaidShieldThreatPattern[] = [
  t('safe-asking-if-scam', 'safe', 0.97, 'User is asking whether something is a scam, not running one.', {
    keywords: ['is this a scam', 'legit'],
    signals: [/\b(?:is|was)\s+(?:this|that|it|the\s+dm)\s+(?:a\s+)?(?:scam|phish\w*|legit|real|safe|fake)\b/i, /\bdo\s+you\s+think\s+(?:this|that|it)('?s| is)\s+(?:a\s+)?scam\b/i],
  }),
  t('safe-warning-others', 'safe', 0.96, 'User is warning the community about a scam.', {
    keywords: ['psa', 'be careful', 'dont click'],
    signals: [/\b(?:psa|heads?\s?up|warning)[:!\s]/i, /\b(?:don'?t|do\s+not|never)\s+(?:click|open|fall\s+for|trust)\b/i, /\bthere('?s| is)\s+(?:a\s+)?(?:scam(?:mer)?|phish\w*|bot)\s+(?:going\s+around|in\s+dms?|spamming)\b/i],
  }),
  t('safe-reporting-user', 'safe', 0.96, 'User is reporting a scammer / suspicious account to staff.', {
    keywords: ['reporting', 'this user', 'scammer'],
    signals: [/\b(?:reporting|report|flagging)\s+(?:this\s+)?(?:user|account|guy|person|bot|scammer|@\S+)\b/i, /\bmods?\s+(?:please\s+)?(?:check|look\s+at|ban)\b/i],
  }),
  t('safe-mod-action-talk', 'safe', 0.95, 'Moderator narrating an enforcement action against a scam.', {
    keywords: ['banned', 'timed out', 'deleted the message'],
    signals: [/\b(?:banned|kicked|timed?\s+out|quarantined|deleted\s+(?:the|his|her|their)\s+(?:message|link))\b.*\b(?:scam(?:mer)?|phish\w*|raider|bot|nitro\s+link)\b/i],
  }),
  t('safe-game-context-raid', 'safe', 0.95, '"Raid / nuke" used in a legitimate video-game context.', {
    keywords: ['raid boss', 'nuke', 'wow', 'ffxiv'],
    signals: [/\b(?:raid)\s+(?:boss|night|team|group|comp|lead(?:er)?|roster|prog|clear|wipe|lockout|tier)\b/i, /\b(?:wow|ffxiv|ff14|destiny\s?2|world\s+of\s+warcraft|mythic\+?|savage|ultimate)\b/i, /\bnuke\s+(?:the\s+)?(?:add|adds|pack|mobs?)\b/i],
  }),
  t('safe-discussing-security', 'safe', 0.94, 'General discussion about scams / security, no live payload.', {
    keywords: ['scams are', 'how do scammers'],
    signals: [/\b(?:scams?|scammers?|phishing|token\s+loggers?)\s+(?:are|have\s+been|keep|usually|typically|work\s+by)\b/i, /\bhow\s+(?:do|does|can)\s+(?:i|you|one|people)\s+(?:avoid|spot|report|stay\s+safe\s+from)\b/i],
  }),
  t('safe-generator-legit', 'safe', 0.93, 'Legitimate "generator" usage (password / number / name / art).', {
    keywords: ['password generator', 'random number'],
    signals: [/\b(?:password|passphrase|random\s+number|name|username|team\s+name|dice|loot|meme|art|image|text|world|seed|map)\s+generator\b/i],
    exempt: [/\bnitro|robux|v-?bucks|free\s+(?:coins|gems)\b/i],
  }),
  t('safe-quoting-received', 'safe', 0.93, 'User pasting a scam DM they received, framed as a quote.', {
    keywords: ['it said', 'the message was', 'they sent me'],
    signals: [/\b(?:it\s+said|the\s+(?:dm|message|bot)\s+said|they\s+(?:sent|dm(?:ed|d)?)\s+me)\b[:\s]+["'`]/i, /\bquote\b[:\s]+["'`]/i],
  }),
];

// =======================================================================
// FAMILY 20 — Supplemental patterns (second pass, same conservative rules)
// =======================================================================
const SUPPLEMENT: RaidShieldThreatPattern[] = [
  // --- Nitro / gift, more phrasings ---
  t('nitro-drops-channel', 'scam', 0.88, 'Fake "Nitro drops in this channel, be fast" bait.', {
    family: 'nitro', keywords: ['nitro drops', 'fast'],
    allOf: [/\bnitro\b/i, /\bdrops?\b/i, /\b(?:channel|here|fast|join|now)\b/i],
  }),
  t('nitro-no-scam-trust', 'scam', 0.9, 'Nitro offer that pre-empts suspicion ("not a scam, trust me").', {
    family: 'nitro', keywords: ['nitro', 'not a scam'],
    allOf: [/\bnitro\b/i, /\b(?:not\s+a\s+scam|no\s+scam|100%\s+legit|trust\s+me|real\s+one|its\s+legit)\b/i],
  }),
  t('nitro-boost-my-server', 'scam', 0.88, '"Free Nitro if you boost my server first" — reverse bait.', {
    family: 'nitro', keywords: ['nitro', 'boost my server'],
    allOf: [/\bnitro\b/i, /\bboost\s+(?:my|our|the)\s+server\b/i],
  }),
  t('nitro-promo-code-site', 'scam', 0.9, 'Fake "redeem this Nitro promo code" on an external site.', {
    family: 'nitro', keywords: ['promo code', 'redeem'],
    allOf: [/\bnitro\b/i, /\bpromo\s?code\b/i, /\b(?:redeem|enter|apply|at|site)\b/i],
  }),
  t('nitro-whole-server-gift', 'scam', 0.88, 'Fake "someone gifted Nitro to the whole server, claim your DM".', {
    family: 'nitro', keywords: ['whole server', 'gifted nitro'],
    allOf: [/\b(?:whole|entire)\s+server\b/i, /\bnitro\b/i, /\b(?:gift(?:ed)?|claim|check\s+(?:your\s+)?dm)\b/i],
  }),
  t('gift-react-then-link', 'scam', 0.85, '"React with ✅ then click the link" — engagement-then-phish combo.', {
    family: 'nitro', keywords: ['react', 'then link'],
    allOf: [/\breact\b/i, /\b(?:then|and)\b/i, LINK],
  }),
  t('nitro-verified-for-nitro', 'scam', 0.87, '"Get verified to receive your Nitro" — role/verify + Nitro combo.', {
    family: 'nitro', keywords: ['verified', 'nitro'],
    allOf: [/\bverif(?:y|ied|ication)\b/i, /\bnitro\b/i],
  }),
  t('nitro-basic-forever', 'scam', 0.86, 'Fake "free Nitro Basic / Nitro forever" claim.', {
    family: 'nitro', keywords: ['nitro basic', 'forever'],
    allOf: [/\bnitro\s+(?:basic|classic)?\b/i, /\b(?:forever|for\s+life|permanent(?:ly)?|lifetime|unlimited)\b/i],
  }),
  t('nitro-winner-dm', 'scam', 0.88, 'Fake "the Nitro giveaway ended, you won, DM to claim".', {
    family: 'nitro', keywords: ['giveaway ended', 'you won', 'nitro'],
    allOf: [/\bnitro\b/i, /\b(?:giveaway\s+(?:ended|is\s+over)|you(?:'?ve)?\s+won)\b/i, /\bdm\b/i],
  }),
  t('nitro-emoji-claim-here', 'scam', 0.88, 'Nitro + "claim here / claim now" + external/short link.', {
    family: 'nitro', keywords: ['nitro', 'claim here'],
    allOf: [/\bnitro\b/i, /\bclaim\s+(?:here|now|yours|it)\b/i],
    signals: [LINK, SHORTENER, /discord\.gg\//i],
  }),

  // --- Steam / games ---
  t('steam-guard-code', 'scam', 0.95, 'Any request for a Steam Guard code.', {
    family: 'steam', keywords: ['steam guard'],
    allOf: [/\bsteam\s?guard\b/i, /\b(?:code|send|share|give|dm|screenshot)\b/i],
  }),
  t('steam-gift-a-game-add', 'scam', 0.83, '"I\'ll gift you any game, just add me" cold DM hook.', {
    family: 'steam', keywords: ['gift you a game', 'add me'],
    allOf: [/\b(?:gift|buy)\s+you\s+(?:any\s+)?(?:game|a\s+game)\b/i, /\b(?:add|dm|friend)\s+me\b/i],
  }),
  t('steam-wallet-generator', 'scam', 0.95, '"Steam wallet code generator" — always fake.', {
    family: 'steam', keywords: ['steam wallet generator'],
    allOf: [/\bsteam\s+wallet\b/i, /\b(?:gen(?:erator)?|free\s+codes?|hack)\b/i],
  }),
  t('steam-free-case-site', 'scam', 0.84, 'Fake "free CSGO/CS2 case opening" gambling-bait site.', {
    family: 'steam', keywords: ['free case', 'case opening'],
    allOf: [/\b(?:free\s+case|case\s+opening|open\s+cases?\s+free|daily\s+free\s+case)\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('steam-vote-skin-login', 'scam', 0.9, '"Vote for my skin, sign in with Steam" — OpenID credential phish.', {
    family: 'steam', keywords: ['vote', 'skin', 'sign in'],
    allOf: [/\bvote\s+(?:for\s+)?(?:my|our)\s+skin\b/i],
  }),

  // --- Crypto ---
  t('crypto-my-mentor', 'scam', 0.9, '"I made $X thanks to my mentor, DM him" — recruiter scam.', {
    family: 'crypto', keywords: ['mentor', 'made money', 'dm him'],
    allOf: [/\b(?:my|a)\s+mentor\b/i, /\b(?:made|earned|turned|profit)\b/i, /\b(?:dm|message|contact|reach\s+out)\b/i],
  }),
  t('crypto-free-signals-discord', 'scam', 0.85, 'Promo for a "free trading signals" Discord/Telegram.', {
    family: 'crypto', keywords: ['free signals', 'trading'],
    allOf: [/\b(?:free\s+)?(?:trading\s+)?signals?\b/i, /\b(?:discord|telegram|whatsapp|join|group|channel)\b/i, /\b(?:crypto|forex|trade|profit|pips)\b/i],
  }),
  t('crypto-claim-token', 'scam', 0.9, 'Fake "claim your $TOKEN allocation" with wallet connect.', {
    family: 'crypto', keywords: ['claim token', 'allocation'],
    allOf: [/\bclaim\s+(?:your\s+)?\$[A-Z]{2,10}\b/, /\b(?:allocation|airdrop|reward|eligible|wallet)\b/i],
  }),
  t('crypto-presale-100x', 'scam', 0.88, 'Fake "presale live, guaranteed 100x, buy now".', {
    family: 'crypto', keywords: ['presale', '100x'],
    allOf: [/\bpre[-\s]?sale\b/i, /\b(?:100x|1000x|50x|moonshot|next\s+(?:bitcoin|shib|pepe))\b/i],
  }),
  t('crypto-wallet-at-risk', 'scam', 0.92, 'Fake "your wallet is at risk / compromised, migrate now".', {
    family: 'crypto', keywords: ['wallet at risk', 'migrate'],
    allOf: [/\bwallet\b/i, /\b(?:at\s+risk|compromised|drained|flagged|vulnerable)\b/i, /\b(?:migrate|secure\s+it|move\s+funds|revoke|action\s+required)\b/i],
  }),
  t('crypto-support-ticket-dm', 'scam', 0.9, 'Fake "open a support ticket" DM from a crypto "helper".', {
    family: 'crypto', keywords: ['support ticket', 'wallet', 'dm'],
    allOf: [/\b(?:support\s+ticket|open\s+a\s+ticket|contact\s+support)\b/i, /\b(?:wallet|metamask|trust|ledger|exchange|withdrawal)\b/i],
  }),
  t('crypto-giveaway-react-connect', 'scam', 0.9, 'Giveaway that ends in "connect your wallet to receive".', {
    family: 'crypto', keywords: ['giveaway', 'connect wallet', 'receive'],
    allOf: [/\bgive\s?away\b/i, /\bconnect\s+(?:your\s+)?wallet\b/i],
  }),
  t('crypto-double-address', 'scam', 0.95, 'Message pairs "send to this address" with a doubling promise.', {
    family: 'crypto', keywords: ['send to address', 'get back'],
    allOf: [/\b(?:send|deposit|transfer)\b/i, /\b(?:0x[a-fA-F0-9]{6,}|bc1[a-z0-9]{6,}|this\s+address|wallet\s+address)\b/i, /\b(?:get|receive|back|return|x2|double|reward)\b/i],
  }),
  t('crypto-staking-connect', 'scam', 0.88, 'Fake "stake your coins here for X% APY" with connect prompt.', {
    family: 'crypto', keywords: ['staking', 'apy', 'connect'],
    allOf: [/\bstak(?:e|ing)\b/i, /\b(?:\d{2,}%\s*apy|rewards?|connect\s+wallet|pool)\b/i],
  }),
  t('crypto-opensea-offer', 'scam', 0.87, 'Fake "you got an offer on your NFT, accept at [link]".', {
    family: 'crypto', keywords: ['offer', 'nft', 'accept'],
    allOf: [/\b(?:offer|bid)\b/i, /\b(?:nft|collection|opensea|blur|magic\s?eden)\b/i, /\b(?:accept|claim|sign|approve)\b/i],
  }),

  // --- Job scams ---
  t('job-reshipping', 'scam', 0.88, 'Package-reshipping "job" — money-mule / fraud logistics.', {
    family: 'job', keywords: ['reshipping', 'package', 'forward'],
    allOf: [/\b(?:re-?ship(?:ping)?|package\s+forwarding|receive\s+and\s+forward\s+packages)\b/i],
  }),
  t('job-mystery-shopper', 'scam', 0.86, 'Fake "mystery shopper, paid weekly" recruitment.', {
    family: 'job', keywords: ['mystery shopper'],
    allOf: [/\bmystery\s+shopper\b/i],
  }),
  t('job-brand-ambassador-dm', 'scam', 0.8, 'Vague "be our brand ambassador, DM" cold offer.', {
    family: 'job', keywords: ['brand ambassador', 'dm'],
    allOf: [/\bbrand\s+ambassador\b/i, /\b(?:dm|message|apply|slots?)\b/i],
  }),
  t('job-captcha-solving-pay', 'scam', 0.85, '"Get paid to solve captchas" recruitment.', {
    family: 'job', keywords: ['solve captchas', 'paid'],
    allOf: [/\bcaptchas?\b/i, /\b(?:get\s+paid|earn|\$\d+|per\s+\d+)\b/i],
  }),
  t('job-chat-moderator-weekly', 'scam', 0.85, 'Fake "chat moderator" job, weekly PayPal, no interview.', {
    family: 'job', keywords: ['chat moderator', 'weekly', 'no interview'],
    allOf: [/\bchat\s+mod(?:erator)?\b/i, /\b(?:pay|paid|\$\d+|weekly)\b/i, /\b(?:no\s+interview|no\s+experience|dm|apply\s+now)\b/i],
  }),

  // --- Impersonation ---
  t('imp-system-flagged', 'scam', 0.9, 'Fake "System / AutoMod" message claiming your account is flagged.', {
    family: 'impersonation', keywords: ['system', 'automod', 'flagged'],
    allOf: [/\b(?:system|auto\s?mod|discord\s+moderation|security\s+system)\s*[:!\-]/i, /\b(?:flagged|verify|suspended|violation|review)\b/i],
  }),
  t('imp-24h-appeal', 'scam', 0.92, 'Fake "you have 24 hours to appeal or be permanently banned".', {
    family: 'impersonation', keywords: ['24 hours', 'appeal', 'permanent ban'],
    allOf: [/\b(?:24\s*h(?:ours?)?|48\s*h(?:ours?)?|within\s+\d+\s+hours?)\b/i, /\b(?:appeal|respond|verify|confirm)\b/i, /\b(?:permanent(?:ly)?|perma)\s+ban(?:ned)?\b/i],
  }),
  t('imp-staff-results-dm', 'scam', 0.85, 'Fake "staff application results are in, check your DM".', {
    family: 'impersonation', keywords: ['application results', 'check dm'],
    allOf: [/\b(?:staff|mod|helper)\s+(?:application|app)\b/i, /\b(?:results?|accepted|decision)\b/i],
  }),
  t('imp-partner-manager-dm', 'scam', 0.85, 'Cold DM from a fake "Discord Partner Manager / Partnerships".', {
    family: 'impersonation', keywords: ['partner manager', 'discord partnerships'],
    allOf: [/\b(?:partner\s+manager|discord\s+partnerships?|partnership\s+team)\b/i],
  }),
  t('imp-bot-official-support', 'scam', 0.88, '"This is [bot] official support" opener in a DM.', {
    family: 'impersonation', keywords: ['official support', 'this is'],
    allOf: [/\bthis\s+is\b/i, /\bofficial\b/i, /\b(?:support|team|staff|bot|moderation)\b/i],
    exempt: [/\bthis\s+is\s+(?:not|the\s+wrong)\b/i],
  }),
  t('imp-tos-violation-report', 'scam', 0.88, 'Fake "your server/account was reported for a ToS violation".', {
    family: 'impersonation', keywords: ['tos violation', 'reported'],
    allOf: [/\b(?:tos|terms\s+of\s+service|community\s+guidelines)\s+violation\b/i, /\b(?:reported|report\s+filed|flagged|review)\b/i],
  }),
  t('imp-need-you-to-test', 'scam', 0.82, '"Admin here — need you to test something / click this" DM.', {
    family: 'impersonation', keywords: ['admin here', 'test something'],
    allOf: [/\b(?:admin|owner|staff|mod)\s+here\b/i, /\b(?:test|try|check|click)\b/i, /\b(?:this|link|bot|something)\b/i],
  }),
  t('imp-mee6-dyno-dm', 'scam', 0.9, 'A DM claiming to be MEE6 / Dyno / Carl-bot (these bots never DM verification).', {
    family: 'impersonation', keywords: ['mee6', 'dyno', 'carl-bot'],
    allOf: [/\b(?:mee6|dyno|carl-?bot|probot|arcane|unbelievaboat)\b/i, /\b(?:verify|claim|login|nitro|dm(?:ed)?\s+you|congratulations)\b/i],
  }),

  // --- Credential / OAuth phishing ---
  t('phish-keep-your-badges', 'scam', 0.86, 'Fake "log in to keep your badges / boosts / roles".', {
    family: 'phish', keywords: ['badges', 'keep', 'login'],
    allOf: [/\b(?:log\s?in|sign\s?in|verify)\b/i, /\b(?:keep|not\s+lose|retain)\b/i, /\b(?:badges?|boosts?|roles?|streak|level)\b/i],
  }),
  t('phish-waitlist-email', 'scam', 0.83, 'Fake "enter your email for the Nitro/beta waitlist".', {
    family: 'phish', keywords: ['email', 'waitlist'],
    allOf: [/\b(?:enter|drop|give)\s+your\s+email\b/i, /\b(?:waitlist|early\s+access|beta|nitro|whitelist)\b/i],
  }),
  t('phish-phone-to-unlock', 'scam', 0.86, 'Fake "verify with your phone number to unlock access".', {
    family: 'phish', keywords: ['phone number', 'unlock'],
    allOf: [/\b(?:verify|confirm|enter)\b/i, /\bphone\s+number\b/i, /\b(?:unlock|access|continue|receive)\b/i],
  }),
  t('phish-click-allow-popup', 'scam', 0.88, 'Instruction to "click Allow when the popup appears" — push/OAuth abuse.', {
    family: 'phish', keywords: ['click allow', 'popup'],
    allOf: [/\bclick\s+(?:allow|yes|authorize|accept)\b/i, /\b(?:popup|pop-?up|prompt|when\s+it\s+asks)\b/i],
  }),
  t('phish-session-expired', 'scam', 0.85, 'Fake "your session expired, re-authenticate here".', {
    family: 'phish', keywords: ['session expired', 're-authenticate'],
    allOf: [/\bsession\s+(?:expired|timed\s+out|ended)\b/i, /\b(?:re-?auth\w*|log\s+back\s+in|sign\s+in\s+again|verify\s+again)\b/i],
  }),
  t('phish-confirm-its-you-code', 'scam', 0.95, 'Fake "confirm it\'s you: enter the code we just sent".', {
    family: 'phish', keywords: ['confirm its you', 'enter code'],
    allOf: [/\b(?:confirm\s+it'?s\s+you|is\s+this\s+you|verify\s+it'?s\s+you)\b/i, /\bcode\b/i],
  }),
  t('phish-sign-in-download-data', 'scam', 0.83, 'Fake "sign in to download your data / package / invoice".', {
    family: 'phish', keywords: ['sign in', 'download data'],
    allOf: [/\bsign\s?in\b/i, /\b(?:download|view|access)\s+(?:your\s+)?(?:data|package|invoice|document|file)\b/i],
    signals: [LINK, SHORTENER],
  }),

  // --- Malware / self-XSS / "paste in console" ---
  t('mal-paste-in-console', 'scam', 0.97, 'Self-XSS: "paste this in the console / DevTools to get X free".', {
    family: 'malware', keywords: ['paste', 'console', 'devtools'],
    allOf: [/\b(?:paste|copy)\b/i, /\b(?:console|dev\s?tools|f12|inspect|browser\s+bar)\b/i],
  }),
  t('mal-powershell-fix', 'scam', 0.96, '"Run this PowerShell / cmd command to fix Discord" — remote payload.', {
    family: 'malware', keywords: ['powershell', 'cmd', 'fix'],
    allOf: [/\b(?:powershell|cmd|command\s+prompt|terminal|iwr|invoke-?webrequest|curl\s+\S+\s*\|\s*(?:sh|bash|iex))\b/i, /\b(?:run|paste|execute|fix|repair)\b/i],
  }),
  t('mal-animated-pfp-free', 'scam', 0.9, 'Fake "get an animated PFP / custom tag for free" via a script or site.', {
    family: 'malware', keywords: ['animated pfp', 'free'],
    allOf: [/\b(?:animated\s+(?:pfp|avatar|profile)|custom\s+(?:tag|discord\s+tag)|profile\s+effects?)\b/i, /\b(?:free|script|paste|site|method|trick)\b/i],
  }),
  t('mal-anticheat-download', 'scam', 0.88, '"Download our anticheat / launcher to join / play".', {
    family: 'malware', keywords: ['anticheat', 'launcher', 'download'],
    allOf: [/\b(?:anti-?cheat|anticheat|our\s+launcher|game\s+launcher|screen\s?share\s+tool)\b/i, /\b(?:download|install|run|required|to\s+(?:join|play|verify))\b/i],
  }),
  t('mal-see-hidden-channels', 'scam', 0.9, 'Fake tool/plugin "to see hidden / locked channels".', {
    family: 'malware', keywords: ['hidden channels', 'plugin'],
    allOf: [/\b(?:see|view|unlock|reveal)\s+(?:hidden|locked|private|staff)\s+channels?\b/i],
  }),
  t('mal-launcher-needs-admin', 'scam', 0.9, '"The launcher/tool needs admin to patch the game" — privilege grab.', {
    family: 'malware', keywords: ['needs admin', 'patch'],
    allOf: [/\b(?:needs?|requires?|run\s+as)\s+admin(?:istrator)?\b/i, /\b(?:patch|inject|launcher|bypass|hook)\b/i],
  }),
  t('mal-disable-smartscreen', 'scam', 0.94, 'Instructs disabling SmartScreen / "more info > run anyway".', {
    family: 'malware', keywords: ['smartscreen', 'run anyway'],
    allOf: [/\b(?:smartscreen|windows\s+protected|more\s+info\s*>\s*run\s+anyway|run\s+anyway|ignore\s+the\s+warning)\b/i],
  }),
  t('mal-open-cmd-paste', 'scam', 0.95, '"Open cmd / Win+R and paste this" — remote command execution.', {
    family: 'malware', keywords: ['win+r', 'open cmd', 'paste'],
    allOf: [/\b(?:win\s*\+\s*r|open\s+(?:cmd|run|command)|run\s+box)\b/i, /\b(?:paste|type|enter)\b/i],
  }),

  // --- Fake verification ---
  t('fv-react-elsewhere-to-verify', 'scam', 0.84, '"React in another server / DM to verify here" — cross-server bait.', {
    family: 'fakeverify', keywords: ['react in another server', 'verify'],
    allOf: [/\bverif(?:y|ication)\b/i, /\b(?:in\s+(?:another|this\s+other)\s+server|react\s+(?:here|there)\s+first|join\s+.*\s+first)\b/i],
  }),
  t('fv-code-to-me', 'scam', 0.9, '"Verification bot is down, DM me your code" — direct code theft.', {
    family: 'fakeverify', keywords: ['bot is down', 'dm your code'],
    allOf: [/\b(?:verification|captcha|verify)\s+bot\s+(?:is\s+)?(?:down|broken|not\s+working|offline)\b/i, /\b(?:dm|send|give)\s+(?:me\s+)?(?:your\s+)?code\b/i],
  }),
  t('fv-captcha-timer-kick', 'scam', 0.85, 'Fake "solve the captcha at [link] within N min or get kicked".', {
    family: 'fakeverify', keywords: ['captcha', 'within', 'kicked'],
    allOf: [/\bcaptcha\b/i, /\bwithin\s+\d+\s*(?:min|minutes|seconds)\b/i, /\b(?:kick(?:ed)?|removed|banned)\b/i],
  }),
  t('fv-verify-domain-lookalike', 'scam', 0.88, 'Verification link on a server-name lookalike domain.', {
    family: 'fakeverify', keywords: ['verify', 'lookalike domain'],
    allOf: [/\bverif\w*\b/i, /\bverify[-.][a-z0-9-]+\.(?:xyz|top|link|click|site|online|app|gg)\b/i],
  }),

  // --- DM advertising / funnels ---
  t('dm-everyone-i-got-something', 'spam', 0.7, '"Everyone DM me, I got something for you" cold funnel.', {
    family: 'dmadv', keywords: ['dm me', 'got something'],
    allOf: [/\b(?:everyone|yall|y'?all|guys)\b/i, /\bdm\s+me\b/i, /\b(?:got|have)\s+(?:something|a\s+thing|an\s+offer|surprise)\b/i],
  }),
  t('dm-invite-reward-daily', 'spam', 0.74, '"Join for daily free giveaways + invite reward" server ad.', {
    family: 'dmadv', keywords: ['invite reward', 'daily giveaways'],
    allOf: [/\b(?:invite\s+rewards?|invite\s+to\s+(?:earn|win)|daily\s+(?:free\s+)?giveaways?)\b/i],
  }),
  t('dm-pay-you-to-invite', 'scam', 0.8, '"I\'ll pay you to invite people to my server" — invite fraud.', {
    family: 'dmadv', keywords: ['pay you to invite'],
    allOf: [/\b(?:pay|paying|\$\d+)\b/i, /\bto\s+invite\s+(?:people|members|users|friends)\b/i],
  }),
  t('dm-hmu-make-money', 'spam', 0.72, '"HMU / DM if you want to make money" vague funnel.', {
    family: 'dmadv', keywords: ['hmu', 'make money'],
    allOf: [/\b(?:hmu|dm\s+me|inbox\s+me|message\s+me)\b/i, /\b(?:make|earn)\s+(?:money|cash|\$\d+|bread|bag)\b/i],
  }),
  t('dm-big-opportunity-bio', 'spam', 0.72, '"Big opportunity, check my bio" self-promo blast.', {
    family: 'dmadv', keywords: ['opportunity', 'check bio'],
    allOf: [/\b(?:big|huge|life-?changing)\s+opportunity\b/i, /\b(?:bio|profile|dm|link)\b/i],
  }),
  t('dm-commissions-blast', 'spam', 0.62, 'Repeated commission-open self-promo in an unrelated channel.', {
    family: 'dmadv', keywords: ['commissions open', 'dm for prices'],
    allOf: [/\bcommissions?\s+(?:are\s+)?open\b/i, /\b(?:dm|prices?\s+in\s+dm|slots?|hmu)\b/i],
  }),

  // --- Raid / attack tooling ---
  t('raid-who-wants-to-help', 'raid', 0.85, '"Who wants to help raid / crash this server" recruitment.', {
    family: 'raid', keywords: ['help raid', 'crash server'],
    allOf: [/\bwho(?:'?s| wants| is)\b/i, /\b(?:help|down\s+to|joining)\b/i, /\b(?:raid|crash|nuke|spam)\b/i],
  }),
  t('raid-invite-on-count', 'raid', 0.85, '"Drop the raid invite on 3 / everyone in on my count".', {
    family: 'raid', keywords: ['on 3', 'raid invite'],
    allOf: [/\b(?:on\s+(?:3|three|my\s+count|go)|3\s*2\s*1)\b/i, /\b(?:raid|invite|drop\s+it|spam|go\s+in)\b/i],
  }),
  t('raid-webhook-who-wants', 'raid', 0.88, '"Got a webhook link, who wants to spam it".', {
    family: 'raid', keywords: ['webhook', 'who wants'],
    allOf: [/\bwebhook\b/i, /\b(?:who\s+wants|link|drop|got\s+(?:a|one))\b/i],
  }),
  t('raid-switch-to-alts', 'raid', 0.82, '"Everyone switch to alts / use your alt accounts" before an attack.', {
    family: 'raid', keywords: ['alts', 'switch'],
    allOf: [/\b(?:switch\s+to|use\s+your|get\s+on)\s+(?:your\s+)?alts?\b/i],
  }),
  t('raid-crashing-tonight', 'raid', 0.86, '"We\'re crashing / ending / destroying this server tonight" threat.', {
    family: 'raid', keywords: ['crashing this server', 'tonight'],
    allOf: [/\b(?:we(?:'?re| are)|gonna|about\s+to)\b/i, /\b(?:crash(?:ing)?|end(?:ing)?|destroy(?:ing)?|kill(?:ing)?|nuk(?:e|ing)|wipe)\b/i, /\b(?:this\s+server|the\s+server|y'?all|it\s+all)\b/i],
  }),
  t('raid-spam-slurs-everywhere', 'raid', 0.95, 'Call to flood every channel with slurs / gore to force a ban.', {
    family: 'raid', keywords: ['spam', 'every channel', 'slurs'],
    allOf: [/\b(?:spam|post|flood|drop)\b/i, /\b(?:every\s+channel|all\s+channels|everywhere)\b/i],
    signals: [/\b(?:slurs?|n-?word|hard\s?r|gore|racist|hate)\b/i],
  }),
  t('raid-everyone-server-trash-join', 'raid', 0.88, 'Mass mention + "this server is trash, join [invite]".', {
    family: 'raid', keywords: ['@everyone', 'server is trash', 'join'],
    allOf: [/(?:@everyone|@here)/, /\b(?:this\s+server|it'?s?)\s+(?:trash|dead|garbage|dogshit|mid)\b/i, /discord\.gg\//i],
  }),
  t('raid-found-exploit-crash', 'raid', 0.85, '"Found an exploit / bug to crash the server or client" + intent to use.', {
    family: 'raid', keywords: ['exploit', 'crash', 'bug'],
    allOf: [/\b(?:exploit|bug|method|trick|crasher)\b/i, /\bcrash\b/i, /\b(?:server|client|app|discord|anyone'?s?\s+phone)\b/i],
  }),
  t('raid-bot-token-leaked-use', 'raid', 0.9, '"A bot token leaked, let\'s use it" to hijack a bot for an attack.', {
    family: 'raid', keywords: ['bot token leaked', 'use it'],
    allOf: [/\bbot\s+token\b/i, /\b(?:leaked|found|got\s+it|exposed)\b/i, /\b(?:use\s+it|abuse|nuke|spam|take\s+over)\b/i],
  }),
  t('raid-post-gif-everywhere', 'raid', 0.8, '"Post the raid image/gif in every channel" defacement.', {
    family: 'raid', keywords: ['post gif', 'everywhere'],
    allOf: [/\b(?:post|spam|drop)\s+(?:the\s+)?(?:gif|image|pic|logo|banner)\b/i, /\b(?:everywhere|every\s+channel|all\s+chats)\b/i],
  }),

  // --- Spam shapes ---
  t('spam-mention-flood', 'spam', 0.82, 'A dozen or more user mentions packed into one message.', {
    family: 'spam', keywords: ['mention flood'],
    signals: [/(?:<@!?\d+>\s*){12,}/],
  }),
  t('spam-newline-flood', 'spam', 0.78, 'Huge run of blank lines to push the channel up.', {
    family: 'spam', keywords: ['newline flood'],
    signals: [/(?:\r?\n\s*){18,}/],
  }),
  t('spam-join-join-join', 'spam', 0.74, 'Short imperative repeated ("join join join", "add add add").', {
    family: 'spam', keywords: ['repeat imperative'],
    signals: [/\b(join|add|click|buy|vote|sub|follow)\b(?:\s+\1\b){4,}/i],
  }),
  t('spam-many-invites-lines', 'spam', 0.8, 'Multiple invite links each on their own line.', {
    family: 'spam', keywords: ['invite list lines'],
    signals: [/(?:^|\n).*discord\.gg\/\S+(?:.*\n.*discord\.gg\/\S+){2,}/i],
  }),
  t('spam-everyone-word-repeat', 'spam', 0.76, 'The word "everyone/everybody" hammered repeatedly.', {
    family: 'spam', keywords: ['everyone repeat'],
    signals: [/\b(everyone|everybody|yall|y'?all)\b(?:\W+\1\b){4,}/i],
  }),

  // --- Marketplace ---
  t('mkt-og-username', 'scam', 0.8, 'Selling an "OG / rare / 3-letter" username.', {
    family: 'market', keywords: ['og username', 'rare name'],
    allOf: [/\b(?:og|rare|3l|3-?letter|4l|4-?char|short)\s+(?:username|name|handle|user|tag)\b/i, /\b(?:selling|sell|for\s+sale|\$\d+|buy)\b/i],
  }),
  t('mkt-buying-your-account', 'scam', 0.85, 'Unsolicited "I\'ll buy your account, name a price".', {
    family: 'market', keywords: ['buy your account', 'price'],
    allOf: [/\b(?:buy|buying|purchase)\s+your\s+(?:account|acc)\b/i],
  }),
  t('mkt-full-access-accounts', 'scam', 0.85, 'Selling game accounts with "full access / original email".', {
    family: 'market', keywords: ['full access', 'accounts'],
    allOf: [/\b(?:full\s+access|fa|original\s+email|oe|changeable\s+email)\b/i, /\b(?:accounts?|acc|selling|\$\d+|stock)\b/i],
  }),
  t('mkt-smm-panel', 'scam', 0.8, 'Promoting an "SMM panel" (bulk fake-engagement service).', {
    family: 'market', keywords: ['smm panel'],
    allOf: [/\bsmm\s+panel\b/i],
  }),
  t('mkt-elo-rank-boost', 'scam', 0.78, 'Selling ranked / ELO boosting (account sharing, TOS-breaking).', {
    family: 'market', keywords: ['elo boost', 'rank boost'],
    allOf: [/\b(?:elo|rank(?:ed)?|mmr|division|valorant|lol|apex|competitive)\s+boost(?:ing)?\b/i, /\b(?:cheap|\$\d+|selling|service|dm)\b/i],
  }),

  // --- NSFW / catfish ---
  t('nsfw-trading-content-dm', 'scam', 0.9, '"Trading nudes / content, DM" — catfish or minor-content funnel.', {
    family: 'nsfw', keywords: ['trading', 'content', 'dm'],
    allOf: [/\b(?:trad(?:e|ing)|swap|sell(?:ing)?)\b/i, /\b(?:nudes?|content|pics?|vids?|packs?)\b/i, /\bdm\b/i],
  }),
  t('nsfw-egirl-for-hire', 'spam', 0.8, '"E-girl / e-boy for hire / gfe" solicitation.', {
    family: 'nsfw', keywords: ['egirl for hire', 'gfe'],
    allOf: [/\b(?:e-?girl|e-?boy|gfe|companion)\b/i, /\b(?:for\s+hire|available|rates|\$\d+|dm|hire\s+me)\b/i],
  }),
  t('nsfw-18-dump-link', 'spam', 0.82, '"18+ server / nsfw dump, link here" blast.', {
    family: 'nsfw', keywords: ['18+ server', 'nsfw dump'],
    allOf: [/\b(?:18\s?\+|nsfw)\b/i, /\b(?:server|dump|folder|leak|link|discord\.gg)\b/i],
    signals: [/discord\.gg\//i, LINK, SHORTENER],
  }),
  t('nsfw-private-snap-price', 'scam', 0.83, '"My private snap / premium is $X, DM" — often a bot / catfish.', {
    family: 'nsfw', keywords: ['private snap', 'premium'],
    allOf: [/\b(?:private|premium|vip)\s+(?:snap|snapchat|tele(?:gram)?|content|acc)\b/i, /\$\s?\d+/],
  }),

  // --- IP / info grabbers ---
  t('grab-discord-wrapped', 'scam', 0.84, 'Fake "Discord Wrapped / your year on Discord" stat site.', {
    family: 'grabber', keywords: ['discord wrapped', 'stats'],
    allOf: [/\b(?:discord\s+wrapped|your\s+year\s+on\s+discord|discord\s+recap|spotify\s+wrapped\s+but\s+discord)\b/i],
    signals: [LINK, SHORTENER],
  }),
  t('grab-find-discord-age', 'scam', 0.82, 'Fake "find out your Discord age / account value" site.', {
    family: 'grabber', keywords: ['discord age', 'account value'],
    allOf: [/\b(?:your\s+discord\s+age|how\s+old\s+is\s+your\s+account|account\s+(?:value|worth)|badge\s+checker)\b/i],
    signals: [LINK, SHORTENER, /\b[a-z0-9-]+\.(?:xyz|top|link|click|site|online|app)\b/i],
  }),
  t('grab-story-screenshot', 'scam', 0.8, 'Fake "see who screenshots your story / stalks you" link.', {
    family: 'grabber', keywords: ['screenshots your story'],
    allOf: [/\bwho\s+(?:screenshots?|screenshotted|saves?|views?)\s+(?:your|my)\s+(?:story|stories|posts?|status)\b/i],
    signals: [LINK, SHORTENER],
  }),

  // --- Fake platform "support" ---
  t('sup-paypal-limited', 'scam', 0.88, 'Fake "your PayPal is limited, confirm your info".', {
    family: 'support', keywords: ['paypal limited', 'confirm'],
    allOf: [/\bpaypal\b/i, /\b(?:limited|restricted|on\s+hold|frozen)\b/i, /\b(?:confirm|verify|resolve|update)\b/i],
  }),
  t('sup-amazon-address-card', 'scam', 0.87, 'Fake "your Amazon order can\'t ship, update address + card".', {
    family: 'support', keywords: ['amazon', 'order', 'update card'],
    allOf: [/\bamazon\b/i, /\b(?:order|delivery|package|shipment)\b/i, /\b(?:update|confirm|re-?enter)\s+(?:your\s+)?(?:address|payment|card)\b/i],
  }),
  t('sup-netflix-payment', 'scam', 0.86, 'Fake "Netflix / Spotify payment declined, update billing".', {
    family: 'support', keywords: ['netflix', 'spotify', 'payment declined'],
    allOf: [/\b(?:netflix|spotify|disney\+?|hulu)\b/i, /\bpayment\s+(?:declined|failed|issue)\b/i],
  }),

  // --- Partnership ---
  t('part-boost-free-add-bot', 'scam', 0.88, '"We boost your server for free — just add our bot" nuke setup.', {
    family: 'partner', keywords: ['boost your server free', 'add bot'],
    allOf: [/\bboost\s+your\s+server\b/i, /\bfree\b/i, /\badd\s+(?:our|this|my)\s+bot\b/i],
  }),
  t('part-cross-promo-admin', 'scam', 0.85, '"Cross-promo — add my bot with admin / give announce perms".', {
    family: 'partner', keywords: ['cross promo', 'admin perms'],
    allOf: [/\b(?:cross[-\s]?promo|shoutout\s+for\s+shoutout|s4s\s+server)\b/i, /\b(?:add\s+(?:my|our)\s+bot|admin|announce\s+perms?|posting\s+perms?)\b/i],
  }),

  // --- More non-English ---
  t('ml-es-clic-regalo-discord', 'scam', 0.9, 'Spanish "haz clic para reclamar tu regalo de Discord".', {
    family: 'multilang', keywords: ['haz clic', 'regalo discord'],
    allOf: [/\bhaz\s+clic\b/i, /\b(?:regalo|nitro|premio)\b/i, /\bdiscord\b/i],
  }),
  t('ml-fr-connecte-toi-recuperer', 'scam', 0.9, 'French "connecte-toi avec Discord pour récupérer".', {
    family: 'multilang', keywords: ['connecte-toi', 'récupérer'],
    allOf: [/\bconnecte[-\s]?toi\b/i, /\bdiscord\b/i, /\br[eéè]cup[eéè]re\w*\b/i],
  }),
  t('ml-es-cuenta-menor', 'scam', 0.9, 'Spanish "tu cuenta fue reportada por ser menor, verifica tu edad".', {
    family: 'multilang', keywords: ['reportada', 'menor', 'edad'],
    allOf: [/\bcuenta\b/i, /\b(?:reportad\w+|denunciad\w+)\b/i, /\b(?:menor|edad|13\s+a[nñ]os)\b/i],
  }),
  t('ml-pt-conta-banida', 'scam', 0.9, 'Portuguese "sua conta será banida, verifique agora".', {
    family: 'multilang', keywords: ['conta banida', 'verifique'],
    allOf: [/\bsua\s+conta\b/i, /\b(?:ser[aá]\s+banid\w+|foi\s+reportad\w+|suspens\w+)\b/i],
  }),
  t('ml-de-konto-gesperrt', 'scam', 0.9, 'German "dein Konto wurde gesperrt, jetzt verifizieren".', {
    family: 'multilang', keywords: ['konto gesperrt', 'verifizieren'],
    allOf: [/\bdein\s+konto\b/i, /\b(?:gesperrt|deaktiviert|gemeldet)\b/i],
  }),
];

// =======================================================================
// Assembled corpus
// =======================================================================
export const RAIDSHIELD_THREAT_CORPUS: RaidShieldThreatPattern[] = [
  ...NITRO,
  ...STEAM,
  ...CRYPTO,
  ...PRIZE,
  ...JOB,
  ...IMPERSONATION,
  ...PHISH,
  ...MALWARE,
  ...FAKEVERIFY,
  ...DMADV,
  ...RAID,
  ...SPAM,
  ...MARKET,
  ...NSFW,
  ...GRABBER,
  ...SUPPORT,
  ...PARTNER,
  ...MULTILANG,
  ...SUPPLEMENT,
];

/** Total distinct patterns in this corpus (threats + safe guards). */
export const RAIDSHIELD_CORPUS_SIZE = RAIDSHIELD_THREAT_CORPUS.length + CORPUS_SAFE_GUARDS.length;

function entryMatches(entry: RaidShieldThreatPattern, text: string, lower: string): boolean {
  if (entry.exempt && entry.exempt.some((re) => re.test(text) || re.test(lower))) return false;
  const hasSignals = !!entry.signals;
  const hasAllOf = !!entry.allOf;
  if (!hasSignals && !hasAllOf) return false;
  const anySignal = hasSignals ? entry.signals!.some((re) => re.test(text) || re.test(lower)) : true;
  const allOf = hasAllOf ? entry.allOf!.every((re) => re.test(text) || re.test(lower)) : true;
  // Found by a code review: this used to be `anySignal === true || allOf === true` (OR
  // semantics), so an entry defining BOTH `signals` and `allOf` only needed ONE of the two groups
  // to be satisfied — silently dropping the "must also have a link/click/urgency signal"
  // requirement the file's own header describes for entries built this way. 25 entries were
  // affected (e.g. nitro-giveaway-link, crypto-connect-wallet, raid-spam-slurs-everywhere), each
  // firing on ordinary conversation that matched only their `allOf` half with zero actual link/
  // urgency/slur signal present. Both groups, when declared, must now hold (AND semantics) —
  // matches the file's documented design and each entry's own stated intent.
  return anySignal && allOf;
}

/**
 * Consult the threat corpus for a message that the ruleEngine's hard rules did
 * not already classify. Returns the highest-confidence threat match, or `null`
 * when nothing distinctive is found (or a safe-context guard fired).
 */
export function matchRaidShieldThreatCorpus(
  messageText: string
): { classification: Exclude<RaidShieldCorpusClassification, 'safe'>; confidence: number; reason: string } | null {
  const text = (messageText || '').trim();
  if (text.length < 4) return null;
  const lower = text.toLowerCase();

  // Shared "clearly a report / warning / question" guard.
  if (CORPUS_SAFE_CONTEXT.some((re) => re.test(text) || re.test(lower))) return null;

  // Explicit safe disambiguators win over any threat entry.
  for (const guard of CORPUS_SAFE_GUARDS) {
    if (entryMatches(guard, text, lower)) return null;
  }

  let best: RaidShieldThreatPattern | null = null;
  for (const entry of RAIDSHIELD_THREAT_CORPUS) {
    if (entry.classification === 'safe') continue;
    if (entryMatches(entry, text, lower)) {
      if (!best || entry.confidence > best.confidence) best = entry;
    }
  }

  if (!best) return null;
  return {
    classification: best.classification as Exclude<RaidShieldCorpusClassification, 'safe'>,
    confidence: best.confidence,
    reason: `${best.reason} (RaidShield threat corpus: ${best.id})`,
  };
}
