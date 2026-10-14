/**
 * RaidShield corpus expansion (2026-10-14, Patrick: "expand massively his raidshield, scams, spam, bot and raid corpus —
 * at least 200 for each").
 *
 * Same rules as raidShieldThreatCorpus.ts: every entry needs SEVERAL independent signals that only appear together in an
 * attack (allOf + a link / call-to-action signal), never one loose keyword; the shared "this is a report / warning /
 * question" guard runs first. Built from families × variants, so each entry is a distinct, readable pattern with its own
 * id and moderator-facing reason.
 *
 *   SCAM   brands people get phished with × lures (free / generator / giveaway / claim / gift card / verify / won / refund)
 *   SPAM   self-promotion, follow-for-follow, selling accounts / boosts / services, money schemes, chain letters, adult ads
 *   BOT    self-bot and spam-bot signatures: homoglyph / full-width links, "check my bio" bots, crypto shill templates,
 *          NSFW bots, auto-DM templates, fake "I accidentally reported you" bots, invite farms
 *   RAID   raid declarations and threats, nuke talk, flood signatures (mass mentions, emoji / character floods, zalgo,
 *          ASCII walls), raid recruitment and coordination
 *
 * Tested against attack samples (must match) AND the server's real chat (must not) — scripts/raidshieldCorpusCheck.ts.
 */

import type { RaidShieldThreatPattern } from './raidShieldThreatCorpus';

type C = RaidShieldThreatPattern['classification'];
const mk = (id: string, family: string, classification: C, confidence: number, reason: string, allOf: RegExp[], signals?: RegExp[], exempt?: RegExp[]): RaidShieldThreatPattern => ({
  id,
  family,
  classification,
  confidence,
  reason,
  keywords: [],
  allOf,
  signals,
  exempt,
});
const rx = (s: string) => new RegExp(s, 'i');
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24);

// Shared signals -----------------------------------------------------------------------------------------------
// (a bare throwaway-ending domain counts too: "redeem at steam-wallet.ru")
const LINK = /\b(?:https?:\/\/\S+|www\.\S+|[a-z0-9-]+\.(?:xyz|top|ru|tk|ml|ga|cf|gq|click|gift|live|icu|monster|cyou|shop|online|site|fun|rest|sbs)\b|[a-z0-9-]+\.(?:xyz|top|ru|tk|ml|ga|cf|gq|link|click|info|online|site|shop|fun|vip|app|gift|codes?|live|cam|monster|lol|cc|pw|su|icu|best|store|space|website|fit|rest|bond|sbs|autos|cyou|com|net|org|gg|io|me|co)\/\S*)/i;
const INVITE = /\b(?:discord(?:app)?\.(?:gg|com\/invite)\/[a-z0-9-]+|dsc\.gg\/\S+|discord\.me\/\S+)/i;
const CTA = /\b(?:click|tap|open|go\s+to|visit|check\s+(?:out|it|this|my)|dm\s+me|add\s+me|message\s+me|link\s+(?:in|below|above)|in\s+(?:my\s+)?bio|join\s+(?:now|here|us|fast)|hurry|(?:claim|redeem|grab|get)\s+(?:it|them|now|here|yours|fast|at))\b/i;
const URGENT = /\b(?:now|today|hurry|fast|quick(?:ly)?|limited|expires?|last\s+chance|only\s+\d+\s+left|first\s+\d+|before\s+it'?s\s+gone|24\s?h(?:ours?)?)\b/i;
const CALL = [LINK, INVITE, CTA];
// A staff application / partnership post / "my socials" list legitimately has several links and accented names, and a
// spam bot's message is short (2026-10-14 false positives on a staff application and a Polish partnership post).
const LISTS_LINKS_OK = /\b(?:application|apply|applying|experience|partner(?:ship)?|staff|moderat\w*|my\s+(?:servers?|links?|socials?|portfolio)|portfolio|references?)\b/i;
const LONG_POST = /^[\s\S]{300,}$/;
// A message that's clearly talking ABOUT a scam (warning / question / report) — on top of the shared guard.
const ABOUT_IT = /\b(?:scam(?:mer)?s?|fake|phish(?:ing)?|beware|careful|report(?:ed)?|warning|don'?t\s+(?:click|trust|fall)|is\s+(?:this|it)\s+(?:legit|real|safe))\b/i;

// =================================================================================================================
// SCAM — brands × lures (≥ 200)
// =================================================================================================================
const BRANDS: Array<[string, string]> = [
  ['robux', String.raw`robux|rbx`], ['vbucks', String.raw`v[\s-]?bucks|vbux`], ['valorant points', String.raw`valorant\s+points|\bvp\b`], ['minecraft', String.raw`minecraft\s+(?:premium|account|java|bedrock|minecoins)|minecoins`],
  ['steam wallet', String.raw`steam\s+(?:wallet|gift\s*card|balance|credit)`], ['csgo skins', String.raw`(?:cs:?go|cs2|counter[\s-]strike)\s+(?:skins?|knife|knives|case)`], ['fortnite skins', String.raw`fortnite\s+(?:skins?|account|battle\s*pass)`], ['apex coins', String.raw`apex\s+coins`],
  ['xbox gift card', String.raw`xbox\s+(?:gift\s*card|game\s*pass|live)`], ['playstation gift card', String.raw`(?:psn|playstation)\s+(?:gift\s*card|plus|credit)`], ['nintendo eshop', String.raw`(?:nintendo\s+)?eshop\s+(?:card|credit|code)`], ['google play', String.raw`google\s+play\s+(?:card|credit|code)`],
  ['apple gift card', String.raw`(?:apple|itunes)\s+(?:gift\s*)?card`], ['amazon gift card', String.raw`amazon\s+(?:gift\s*card|voucher|code)`], ['paypal', String.raw`paypal\s+(?:money|cash|transfer|payment|giveaway|\$\d+)`], ['cashapp', String.raw`cash\s*app\s+(?:money|flip|giveaway|\$\d+)|\$cashtag`],
  ['spotify premium', String.raw`spotify\s+premium`], ['netflix', String.raw`netflix\s+(?:account|premium|free|accounts)`], ['disney plus', String.raw`disney\s*\+|disney\s+plus`], ['youtube premium', String.raw`youtube\s+premium`],
  ['bitcoin', String.raw`bitcoin|\bbtc\b`], ['ethereum', String.raw`ethereum|\beth\b`], ['usdt', String.raw`\busdt\b|tether`], ['solana', String.raw`solana|\bsol\b\s+(?:airdrop|token)`], ['nft', String.raw`\bnfts?\b|mint\s+pass`],
  ['mrbeast', String.raw`mr\.?\s*beast`], ['elon', String.raw`elon(?:\s+musk)?|tesla\s+(?:giveaway|crypto)`], ['roblox premium', String.raw`roblox\s+premium|\bbc\b\s+roblox`], ['genshin primogems', String.raw`primogems|genesis\s+crystals`], ['league rp', String.raw`riot\s+points|\brp\b\s+(?:card|code)`],
];
const LURES: Array<[string, string, number, string]> = [
  ['free', String.raw`\b(?:free|100%\s*free|for\s+free)\b`, 0.9, 'Free {b} offer with a link / DM call — giveaway phishing.'],
  ['generator', String.raw`\b(?:generator|gen|hack|glitch|method|exploit)\b`, 0.93, '{b} "generator / glitch" — fake tool that steals accounts or installs malware.'],
  ['giveaway', String.raw`\b(?:give\s?away|giving\s+(?:away|out)|drop(?:ping)?|raffle)\b`, 0.9, 'Fake {b} giveaway pushing members to a link or DMs.'],
  ['claim', String.raw`\b(?:claim|redeem|collect)\b`, 0.92, '"Claim your {b}" — phishing landing page.'],
  ['codes', String.raw`\b(?:codes?|keys?|vouchers?|pins?)\b`, 0.88, 'Unsolicited {b} codes / keys — bait for a login or payment page.'],
  ['won', String.raw`\b(?:you(?:'ve|\s+have)?\s+won|winner|selected|congrat(?:s|ulations))\b`, 0.93, '"You won {b}" — prize scam.'],
  ['double', String.raw`\b(?:double|2x|triple|flip|invest|send\s+\d+)\b`, 0.94, '{b} "send / double your money" — investment or flip scam.'],
];
const SCAM: RaidShieldThreatPattern[] = [];
for (const [bName, bRe] of BRANDS) {
  for (const [lName, lRe, conf, reason] of LURES) {
    // money doubling makes sense for money / crypto; the rest for everything
    if (lName === 'double' && !/paypal|cashapp|bitcoin|ethereum|usdt|solana|elon|mrbeast|nft|robux/.test(bName)) continue;
    SCAM.push(mk(`xscam-${slug(bName)}-${lName}`, 'scam-expansion', 'scam', conf, reason.replace('{b}', bName), [rx(bRe), rx(lRe)], CALL, [ABOUT_IT]));
  }
}
// Social-engineering scams that aren't about a brand
const SOCIAL: Array<[string, string[], number, string]> = [
  ['accident-report', [String.raw`\b(?:accidentally|by\s+mistake)\s+report(?:ed)?\s+(?:you|ur|your)\b`], 0.96, 'Classic "I accidentally reported you, contact this admin" account-theft scam.'],
  ['contact-staff-account', [String.raw`\b(?:your|ur)\s+account\s+(?:will\s+be|is\s+going\s+to\s+be|got)\s+(?:banned|disabled|terminated|deleted)\b`, String.raw`\b(?:contact|add|message|dm)\b`], 0.95, 'Fake "your account will be banned, contact staff" — account takeover.'],
  ['vote-for-me', [String.raw`\bvote\s+for\s+me\b`, String.raw`\b(?:contest|competition|link|website)\b`], 0.9, 'Fake "vote for me in a contest" — fake login page.'],
  ['test-my-game', [String.raw`\b(?:test|try|play)\s+(?:my|our)\s+(?:new\s+)?(?:game|beta|app|program|mod)\b`, String.raw`\b(?:download|exe|zip|rar|link|install)\b`], 0.95, '"Test my game" — malware / token grabber.'],
  ['screen-share-verify', [String.raw`\b(?:screen\s*share|share\s+(?:your|ur)\s+screen|go\s+live)\b`, String.raw`\b(?:verify|verification|prove|account|nitro)\b`], 0.93, 'Asks for a screen share to "verify" — token / QR theft.'],
  ['send-token', [String.raw`\b(?:send|give|paste|share)\s+(?:me\s+)?(?:your|ur)\s+(?:token|password|login|2fa|backup\s+codes?|qr)\b`], 0.98, 'Asks for a token / password / 2FA code — account theft.'],
  ['console-paste', [String.raw`\b(?:paste|run|type)\b`, String.raw`\b(?:console|ctrl\s*\+?\s*shift\s*\+?\s*i|inspect\s+element|dev\s*tools)\b`], 0.97, '"Paste this in the console" — token stealer.'],
  ['hypesquad-test', [String.raw`\bhype\s*squad\b`, String.raw`\b(?:test|apply|application|form|event)\b`], 0.92, 'Fake HypeSquad application — phishing.'],
  ['moderator-academy', [String.raw`\b(?:discord\s+)?moderator\s+(?:academy|program|exam|badge)\b`, String.raw`\b(?:apply|link|form|verify)\b`], 0.9, 'Fake Discord moderator program — phishing.'],
  ['early-dev-badge', [String.raw`\b(?:early\s+)?(?:verified\s+)?(?:bot\s+)?developer\s+badge\b`, String.raw`\b(?:get|claim|free|link)\b`], 0.92, 'Fake "get the developer badge" — token theft.'],
  ['friend-in-trouble', [String.raw`\b(?:can\s+you|could\s+u|pls|please)\s+(?:send|lend|pay)\b`, String.raw`\b(?:gift\s*card|paypal|cash\s*app|robux|crypto)\b`, String.raw`\b(?:emergency|urgent|stuck|hospital|asap|right\s+now)\b`], 0.9, 'Urgent "please send me money / gift cards" — impersonation scam.'],
  ['sugar-daddy', [String.raw`\b(?:sugar\s+(?:daddy|mommy|baby)|allowance)\b`, String.raw`\b(?:\$\d+|weekly|send|pay|cash\s*app|paypal)\b`], 0.93, 'Sugar-daddy payment scam.'],
  ['romance-crypto', [String.raw`\b(?:my\s+uncle|my\s+mentor|i\s+made)\b.*\b(?:trading|crypto|forex|binary\s+options)\b`], 0.9, 'Romance / mentor trading scam.'],
  ['recovery-scam', [String.raw`\b(?:recover|get\s+back)\s+(?:your|ur)\s+(?:account|funds|crypto|money|robux)\b`, String.raw`\b(?:contact|dm|message|telegram|whatsapp)\b`], 0.92, '"We can recover your account / funds" — recovery scam.'],
  ['telegram-whatsapp-move', [String.raw`\b(?:telegram|whatsapp|signal)\b`, String.raw`\b(?:invest|profit|earn|giveaway|crypto|forex|signals?)\b`], 0.88, 'Pushes members to Telegram / WhatsApp for "profit" — investment scam.'],
  ['middleman-trade', [String.raw`\b(?:middle\s*man|mm)\b`, String.raw`\b(?:trade|trading|deal)\b`, String.raw`\b(?:add|dm|trust|my\s+friend)\b`], 0.86, 'Fake middleman for a trade — goods stolen.'],
  ['fake-dev-job', [String.raw`\b(?:hiring|looking\s+for)\b`, String.raw`\b(?:\$\d+\s*(?:\/|per)\s*(?:hour|hr|day|week)|easy\s+money|no\s+experience)\b`, String.raw`\b(?:dm|telegram|apply|link)\b`], 0.88, 'Too-good-to-be-true job offer — data / money theft.'],
  ['tax-refund', [String.raw`\b(?:tax\s+refund|unclaimed\s+(?:money|funds)|stimulus)\b`, String.raw`\b(?:claim|link|verify)\b`], 0.9, 'Fake refund / unclaimed money — phishing.'],
  ['package-delivery', [String.raw`\b(?:package|parcel|delivery)\b`, String.raw`\b(?:failed|held|pending|reschedule)\b`, LINK.source], 0.9, 'Fake delivery notice with a link — phishing.'],
  ['bank-verify', [String.raw`\b(?:bank|card)\s+(?:account|details?|information)\b`, String.raw`\b(?:verify|confirm|update|suspended|locked)\b`], 0.92, 'Asks to verify bank / card details — phishing.'],
  ['qr-login-scan', [String.raw`\b(?:scan|use)\s+(?:this|the|my)\s+qr\b`, String.raw`\b(?:nitro|gift|login|verify|reward)\b`], 0.97, '"Scan this QR" for a reward — QR login hijack.'],
  ['boost-for-boost', [String.raw`\bboost\s+(?:4|for)\s+boost\b`, String.raw`\b(?:link|dm|server)\b`], 0.82, 'Boost-for-boost trade — common scam opener.'],
];
for (const [name, parts, conf, reason] of SOCIAL) SCAM.push(mk(`xscam-social-${name}`, 'scam-social', 'scam', conf, reason, parts.map(rx), undefined, [ABOUT_IT]));

// =================================================================================================================
// SPAM — promotion, selling, follow-for-follow, money schemes, chain letters, adult ads (≥ 200)
// =================================================================================================================
const PLATFORMS: Array<[string, string]> = [
  ['youtube', String.raw`youtube|yt\s+channel|my\s+channel`], ['twitch', String.raw`twitch|my\s+stream`], ['tiktok', String.raw`tiktok|tik\s+tok`], ['instagram', String.raw`instagram|\binsta\b|\big\b\s+page`], ['twitter', String.raw`twitter|\bx\s+account`],
  ['kick', String.raw`\bkick\.com|kick\s+stream`], ['spotify', String.raw`spotify\s+(?:playlist|song|artist)|my\s+(?:song|track|mixtape)`], ['soundcloud', String.raw`soundcloud`], ['roblox group', String.raw`roblox\s+(?:group|game)`], ['minecraft server', String.raw`minecraft\s+server|mc\s+server`],
  ['discord server', String.raw`(?:my|our|new)\s+(?:discord\s+)?server`], ['onlyfans', String.raw`only\s*fans|\bof\b\s+link|fansly`], ['patreon', String.raw`patreon`], ['website', String.raw`my\s+(?:website|site|shop|store|blog)`], ['telegram channel', String.raw`telegram\s+(?:channel|group)`],
];
const PROMOS: Array<[string, string, number, string]> = [
  ['sub4sub', String.raw`\b(?:sub\s*(?:4|for)\s*sub|follow\s*(?:4|for)\s*follow|f4f|s4s|l4l|like\s*(?:4|for)\s*like)\b`, 0.88, 'Follow-for-follow / sub-for-sub spam ({p}).'],
  ['go-check', String.raw`\b(?:go\s+)?(?:check\s+out|subscribe\s+to|follow|watch|join)\s+my\b`, 0.8, 'Unsolicited self-promotion of a {p}.'],
  ['pls-support', String.raw`\b(?:pls|please|plz)\s+(?:support|sub|follow|join|watch|share)\b`, 0.78, 'Begging for support / follows on a {p}.'],
  ['every-follow', String.raw`\b(?:every|each)\s+(?:sub|follow|like|join|member)\s+(?:helps|counts|matters)\b`, 0.8, '"Every follow helps" promotion spam ({p}).'],
  ['road-to', String.raw`\broad\s+to\s+\d+\s*(?:k|subs?|followers?|members?)?\b`, 0.8, '"Road to N followers" promotion spam ({p}).'],
  ['giveaway-when', String.raw`\b(?:giveaway|give\s?away)\s+(?:at|when|if)\s+(?:i\s+hit\s+)?\d+`, 0.84, 'Giveaway-for-follows promotion spam ({p}).'],
];
const SPAM: RaidShieldThreatPattern[] = [];
PROMOS.push(
  ['new-upload', String.raw`\b(?:new\s+(?:video|vid|upload|song|track|episode)\s+(?:just\s+)?(?:dropped|out|is\s+up|uploaded)|just\s+(?:uploaded|dropped|posted)\s+a\s+new)\b`, 0.8, 'New-upload promotion spam ({p}).'],
  ['live-now', String.raw`\b(?:i'?m\s+(?:live|streaming)|going\s+live|live\s+now|come\s+watch\s+me)\b`, 0.8, '"I\'m live" promotion spam ({p}).'],
  ['join-giveaway', String.raw`\b(?:join|follow)\s+(?:for|to\s+enter)\s+(?:a\s+|the\s+)?(?:giveaway|free\s+\w+)\b|\bgiveaway\s+in\s+my\b`, 0.84, 'Follow-to-enter giveaway spam ({p}).'],
  ['link-in-bio', String.raw`\b(?:link\s+in\s+(?:my\s+)?bio|check\s+(?:my\s+)?(?:bio|profile)\s+for)\b`, 0.82, '"Link in bio" promotion spam ({p}).'],
);
for (const [pName, pRe] of PLATFORMS) {
  for (const [kName, kRe, conf, reason] of PROMOS) {
    SPAM.push(mk(`xspam-${slug(pName)}-${kName}`, 'spam-promo', 'spam', conf, reason.replace('{p}', pName), [rx(pRe), rx(kRe)], [LINK, INVITE, CTA, /@everyone|@here/i], [ABOUT_IT]));
  }
}
const GOODS: Array<[string, string]> = [
  ['accounts', String.raw`(?:aged\s+)?(?:discord|steam|fortnite|roblox|valorant|minecraft|netflix|spotify|instagram|tiktok)\s+accounts?`], ['boosts', String.raw`server\s+boosts?|boosts?\s+(?:for\s+sale|cheap)`], ['nitro', String.raw`nitro\s+(?:for\s+sale|cheap|\$\d+)|cheap\s+nitro`], ['members', String.raw`(?:discord\s+)?members?\s+(?:for\s+sale|cheap|\d+k)|(?:buy|sell(?:ing)?)\s+members`],
  ['followers', String.raw`(?:buy|sell(?:ing)?|cheap)\s+(?:followers|likes|views|subs)`], ['cheats', String.raw`(?:cheats?|hacks?|aimbot|wallhack|esp|spoofer|injector|executor)`], ['accounts-roblox', String.raw`(?:limiteds?|robux)\s+(?:for\s+sale|cheap|selling)`], ['skins', String.raw`(?:skins?|items?)\s+(?:for\s+sale|cheap|selling)`],
  ['services', String.raw`(?:carry|boosting|elo\s+boost|rank\s+boost|coaching)\s+(?:service|cheap|for\s+sale)`], ['bots', String.raw`(?:discord\s+)?bots?\s+(?:for\s+sale|cheap|custom\s+bots)|selling\s+(?:a\s+)?bots?`], ['configs', String.raw`(?:configs?|scripts?|macros?)\s+(?:for\s+sale|cheap|selling)`], ['art', String.raw`(?:cheap|selling)\s+(?:pfps?|banners?|logos?|emotes?)`],
];
const SELL: Array<[string, string, number]> = [
  ['selling', String.raw`\b(?:selling|for\s+sale|wts|buy\s+now|in\s+stock)\b`, 0.86], ['price', String.raw`(?:\$\s?\d+|\d+\s?(?:usd|eur|€|\$|dollars)|cheap(?:est)?|best\s+price|lowest\s+price)`, 0.84], ['dm-prices', String.raw`\b(?:dm\s+(?:me\s+)?(?:for|4)\s+(?:prices?|info|details)|prices?\s+in\s+dms?|hmu)\b`, 0.88],
  ['payment', String.raw`\b(?:paypal|cash\s*app|crypto|btc|ltc|venmo|zelle|robux)\s+(?:accepted|only|ok)\b|\b(?:accept|taking)\s+(?:paypal|crypto|cash\s*app|ltc|btc)\b`, 0.88],
];
for (const [gName, gRe] of GOODS) for (const [sName, sRe, conf] of SELL) SPAM.push(mk(`xspam-sell-${gName}-${sName}`, 'spam-selling', 'spam', conf, `Selling ${gName.replace('-', ' ')} in chat — marketplace spam.`, [rx(gRe), rx(sRe)], undefined, [ABOUT_IT, /\b(?:don'?t|never)\s+buy\b/i]));
const MONEY: Array<[string, string[], number, string]> = [
  // (needs the pitch too: "i earn 15 dollars per hour at my job" isn't a scheme)
  ['earn-per-day', [String.raw`\b(?:earn|make)\s+(?:\$\s?\d+|\d+\s?(?:\$|usd|dollars))\b`, String.raw`\b(?:a|per|every)\s+(?:day|week|hour)\b`, String.raw`\b(?:dm|method|from\s+home|easy|no\s+experience|telegram|whatsapp|link|join|course|guaranteed|passive|anyone\s+can|i'?ll\s+show)\b`], 0.9, 'Earn-money-fast scheme.'],
  ['passive-income', [String.raw`\bpassive\s+income\b`, String.raw`\b(?:dm|link|join|telegram|course)\b`], 0.86, 'Passive-income scheme.'],
  ['mlm-team', [String.raw`\b(?:join\s+my\s+team|be\s+your\s+own\s+boss|financial\s+freedom)\b`], 0.85, 'MLM / pyramid recruitment.'],
  ['forex-signals', [String.raw`\b(?:forex|binary\s+options|trading\s+signals?|pump\s+(?:and|&)\s+dump)\b`, String.raw`\b(?:join|dm|telegram|profit|vip)\b`], 0.88, 'Trading-signals scheme.'],
  ['crypto-pump', [String.raw`\b(?:1000x|100x|moon(?:ing)?|next\s+gem|presale|stealth\s+launch)\b`, String.raw`\b(?:buy|join|token|coin|ca:|contract)\b`], 0.88, 'Crypto pump shilling.'],
  ['chain-send-10', [String.raw`\bsend\s+(?:this|it)\s+to\s+\d+\s+(?:people|servers|friends|chats)\b`], 0.85, 'Chain message spam.'],
  ['chain-bad-luck', [String.raw`\b(?:or\s+you'?ll\s+(?:have|get)\s+bad\s+luck|or\s+(?:she|he|a\s+ghost)\s+will\s+(?:come|visit|appear))\b`], 0.85, 'Chain-letter spam.'],
  ['chain-discord-closing', [String.raw`\bdiscord\s+is\s+(?:closing|shutting\s+down|deleting)\b`, String.raw`\b(?:send|share|copy)\b`], 0.88, 'Fake "Discord is closing" chain spam.'],
  ['copy-paste', [String.raw`\b(?:copy\s+(?:and|&)\s+paste|copy\s+this|spread\s+the\s+word)\b`, String.raw`\b(?:every|all|\d+)\s+(?:servers?|chats?|people|friends)\b`], 0.84, 'Copy-paste chain spam.'],
  ['vote-server', [String.raw`\bvote\s+for\s+(?:our|my|the)\s+server\b`, String.raw`\b(?:top\.gg|disboard|link|every\s+12)\b`], 0.8, 'Server-vote spam.'],
  ['adult-ad', [String.raw`\b(?:18\+|nsfw|🔞|nudes?|lewds?|spicy\s+(?:pics|content))\b`, String.raw`\b(?:link|bio|dm|join|free|server|onlyfans|telegram)\b`], 0.93, 'Adult-content advertising.'],
  ['dating-ad', [String.raw`\b(?:hot\s+singles?|meet\s+(?:girls|women|guys)|lonely\s+(?:girls|women))\b`, String.raw`\b(?:near\s+you|link|bio|tonight|free)\b`], 0.92, 'Dating-site spam.'],
  ['casino-ad', [String.raw`\b(?:casino|slots?|bet(?:ting)?\s+site|gamble|roulette|stake\.com|rollbit|csgoroll|bloxflip)\b`, String.raw`\b(?:code|bonus|free|deposit|promo|link|\d+%)\b`], 0.86, 'Gambling-site promo spam.'],
  ['promo-code', [String.raw`\b(?:use\s+(?:my\s+)?(?:code|referral)|promo\s+code|ref(?:erral)?\s+link)\b`, LINK.source], 0.82, 'Referral / promo-code spam.'],
  ['server-ad-everyone', [String.raw`@everyone|@here`, INVITE.source], 0.92, 'Server invite blasted at @everyone — advertising spam.'],
];
for (const [name, parts, conf, reason] of MONEY) SPAM.push(mk(`xspam-${name}`, 'spam-scheme', 'spam', conf, reason, parts.map(rx), undefined, [ABOUT_IT]));

// =================================================================================================================
// BOT — self-bot / spam-bot signatures (≥ 200)
// =================================================================================================================
const BOT: RaidShieldThreatPattern[] = [];
// Homoglyph / full-width / dotted brand names used by spam bots to dodge filters.
const OBFUSCATED: Array<[string, string]> = [
  ['discord', String.raw`d[iíìï1l|]s[cç]0?[oóòö0]r[dđ]|ｄｉｓｃｏｒｄ|dіscord|disсord|discоrd|d\s*i\s*s\s*c\s*o\s*r\s*d`], ['nitro', String.raw`n[iíì1l|]t[rя][oóò0]|ｎｉｔｒｏ|nіtro|nitrо|n\s*i\s*t\s*r\s*o`], ['steam', String.raw`st[eéè3][aáà@]m|ｓｔｅａｍ|stеam|steаm|s\s*t\s*e\s*a\s*m`], ['gift', String.raw`g[iíì1l|]ft|ｇｉｆｔ|gіft|g\s*i\s*f\s*t`],
  ['free', String.raw`fr[eéè3][eéè3]|ｆｒｅｅ|frее|f\s*r\s*e\s*e`], ['crypto', String.raw`cr[yу]pt[o0]|ｃｒｙｐｔｏ`], ['robux', String.raw`r[o0]b[uú]x|ｒｏｂｕｘ|r\s*o\s*b\s*u\s*x`], ['onlyfans', String.raw`[o0]nl[yу]\s*f[aá]ns|ｏｎｌｙｆａｎｓ`],
];
const OBF_CONTEXT: Array<[string, RegExp[], number]> = [
  ['link', [LINK, INVITE], 0.94], ['cta', [CTA], 0.9], ['everyone', [/@everyone|@here/i], 0.95], ['urgent', [URGENT], 0.88], ['bio', [/\b(?:bio|profile|about\s+me|status)\b/i], 0.9],
];
OBFUSCATED.push(
  ['paypal', String.raw`p[aá@]yp[aá@][l1|]|ｐａｙｐａｌ|pаypal|p\s*a\s*y\s*p\s*a\s*l`], ['bitcoin', String.raw`b[iíì1]tc[o0][iíì1]n|ｂｉｔｃｏｉｎ|bіtcoin`],
  ['giveaway', String.raw`g[iíì1]v[eé3][aá@]w[aá@]y|ｇｉｖｅａｗａｙ|g\s*i\s*v\s*e\s*a\s*w\s*a\s*y`], ['airdrop', String.raw`[aá@][iíì1]rdr[o0]p|ａｉｒｄｒｏｐ`],
);
// Actually disguised: look-alike / full-width letters, letters spaced out, or a digit / symbol inside a word ("n1tro",
// "fr33") — the plain word inside "steamcommunity.com" isn't (2026-10-14 false positive).
const DISGUISED = /[\u0400-\u04ff\uff00-\uffef]|[a-z][éèêíìïóòöáàúçđ][a-z]|(?:\b[a-z]\s){3,}[a-z]\b|[a-z][0-9@|][a-z]/i;
for (const [oName, oRe] of OBFUSCATED) {
  for (const [cName, cSig, conf] of OBF_CONTEXT) {
    // Plain spelling is the normal word — only the disguised spellings count (homoglyphs / full-width / spaced letters).
    BOT.push(mk(`xbot-obf-${oName}-${cName}`, 'bot-obfuscation', 'bot', conf, `Disguised spelling of "${oName}" (look-alike letters / spaced out) with a ${cName === 'cta' ? 'call to action' : cName} — spam-bot filter evasion.`, [rx(oRe), DISGUISED], cSig, [ABOUT_IT, LISTS_LINKS_OK, LONG_POST]));
  }
}
const BOT_TEMPLATES: Array<[string, string[], number, string, C]> = [
  ['check-bio-cutie', [String.raw`\b(?:hey|hi|hello)\b`, String.raw`\b(?:check|look\s+at|see)\s+(?:my\s+)?(?:bio|profile|pfp|status)\b`], 0.92, '"Hey, check my bio" — spam / NSFW bot opener.', 'bot'],
  ['bored-dm-me', [String.raw`\b(?:bored|lonely|horny)\b`, String.raw`\b(?:dm|message|text)\s+me\b`], 0.9, '"Bored / lonely, DM me" — NSFW bot.', 'bot'],
  ['wanna-see-pics', [String.raw`\b(?:wanna|want\s+to)\s+see\s+(?:my\s+)?(?:pics?|photos?|more)\b`], 0.9, '"Wanna see my pics?" — NSFW bot.', 'bot'],
  ['new-here-friends', [String.raw`\bi'?m\s+new\s+(?:here|to\s+discord)\b`, String.raw`\b(?:add\s+me|dm\s+me|be\s+friends|friend\s+request)\b`, LINK.source], 0.86, '"I\'m new here, add me" + link — friend-farming bot.', 'bot'],
  ['auto-message', [String.raw`\b(?:this\s+is\s+an\s+automated\s+message|auto[\s-]?reply|sent\s+automatically|\[auto\])\b`], 0.88, 'Self-bot auto-message.', 'bot'],
  ['dm-advertise-template', [String.raw`\b(?:hey|hi|hello)\s+(?:there|friend|bro)\b`, String.raw`\b(?:i\s+(?:found|saw)\s+(?:you|ur)\s+(?:in|on)|we\s+(?:share|are\s+in)\s+a\s+server)\b`], 0.86, 'Mass-DM bot template ("I saw you in a server").', 'bot'],
  ['crypto-shill-template', [String.raw`(?:🚀|💎|🌕)`, String.raw`\b(?:token|coin|presale|airdrop|ca:|contract|launch(?:ed|ing)?)\b`, String.raw`\b(?:join|buy|tg|telegram|link)\b`], 0.9, 'Crypto shill-bot template.', 'bot'],
  ['nsfw-invite-template', [String.raw`(?:🔞|💦|🍑|🥵)`, String.raw`\b(?:join|free|server|link|teen|leak(?:s|ed)?)\b`], 0.94, 'NSFW spam-bot template.', 'bot'],
  ['leaks-template', [String.raw`\b(?:leaks?|leaked)\b`, String.raw`\b(?:of|onlyfans|nudes?|pics?|content|e-?girls?)\b`, String.raw`\b(?:free|link|join|discord\.gg|server)\b`], 0.95, '"Free leaks" spam bot.', 'bot'],
  ['giveaway-bot-template', [String.raw`\b(?:you\s+have\s+been\s+selected|you\s+were\s+chosen|lucky\s+winner)\b`], 0.93, '"You have been selected" bot template.', 'bot'],
  ['steam-trade-bot', [String.raw`\bsteam\b`, String.raw`\b(?:trade\s+offer|accept\s+my\s+trade|i\s+sent\s+you\s+a\s+trade)\b`, LINK.source], 0.92, 'Fake Steam trade-offer bot.', 'bot'],
  ['random-chars-invite', [String.raw`^(?=[\s\S]{0,200}$)[\s\S]*\b(?=[a-z0-9]*\d)(?=[a-z0-9]*[a-z])[a-z0-9]{14,}\b`, INVITE.source], 0.86, 'Short random-string message with an invite — invite-farm bot.', 'bot'],
  ['zalgo-link', [String.raw`[̀-ͯ҉]{4,}`, LINK.source], 0.9, 'Zalgo text with a link — spam bot.', 'bot'],
  ['invisible-chars-link', [String.raw`[​-‏⁠﻿]{3,}`, LINK.source], 0.9, 'Invisible characters hiding a link — spam bot.', 'bot'],
  ['markdown-mask-link', [String.raw`\[[^\]]*(?:discord|nitro|steam|gift|free)[^\]]*\]\(https?:\/\/`], 0.95, 'Masked link pretending to be Discord / Nitro / Steam — phishing bot.', 'bot'],
  ['bot-repeated-emoji-link', [String.raw`(?:(\p{Extended_Pictographic})\s*\1\s*){4,}`, LINK.source], 0.84, 'Emoji wall + link — spam bot.', 'bot'],
];
for (const [name, parts, conf, reason, cls] of BOT_TEMPLATES) BOT.push(mk(`xbot-${name}`, 'bot-template', cls, conf, reason, parts.map((p) => new RegExp(p, 'iu')), undefined, [ABOUT_IT]));
// Bot greetings × payloads: the opener + a payload only bots pair.
const BOT_OPENERS: Array<[string, string]> = [['hey-babe', String.raw`\b(?:hey|hi)\s+(?:babe|cutie|handsome|sweetie|dear|hun)\b`], ['hello-dear', String.raw`\bhello\s+(?:dear|friend|sir|madam)\b`], ['greetings', String.raw`\b(?:greetings|good\s+day)\b`], ['im-a-girl', String.raw`\bi'?m\s+a\s+(?:\d{2}\s*(?:yo|y\/o)?\s+)?(?:girl|woman|single\s+mom)\b`], ['sorry-to-bother', String.raw`\b(?:sorry\s+to\s+bother|hope\s+(?:you'?re|ur)\s+(?:doing\s+)?well)\b`]];
const BOT_PAYLOADS: Array<[string, string, number]> = [
  ['investment', String.raw`\b(?:invest(?:ment|ing)?|trading|profit|crypto|forex)\b`, 0.9], ['link', LINK.source, 0.86], ['telegram', String.raw`\b(?:telegram|whatsapp|snapchat|kik)\b`, 0.86], ['pics', String.raw`\b(?:pics?|photos?|videos?|private)\b`, 0.88],
  ['money', String.raw`\b(?:\$\d+|money|cash|pay(?:ment)?|gift\s*card)\b`, 0.88], ['nft', String.raw`\b(?:nfts?|mint|whitelist|wl\s+spot)\b`, 0.88], ['job', String.raw`\b(?:job|opportunity|hiring|work\s+from\s+home)\b`, 0.86], ['server', INVITE.source, 0.88],
];
BOT_OPENERS.push(['hi-stranger', String.raw`\bhi\s+(?:there\s+)?stranger\b`], ['dear-user', String.raw`\bdear\s+(?:user|member|customer|valued)\b`], ['hey-friend', String.raw`\bhey\s+(?:my\s+)?friend\b`], ['good-evening', String.raw`\bgood\s+(?:evening|morning|afternoon)\s+(?:dear|friend|sir)\b`], ['howdy-partner', String.raw`\b(?:howdy|hiya)\s+(?:partner|friend|dear)\b`]);
BOT_PAYLOADS.push(['giveaway', String.raw`\b(?:giveaway|free\s+nitro|free\s+gift|you\s+won)\b`, 0.9], ['verify', String.raw`\b(?:verify|verification|confirm\s+(?:your|ur)\s+account)\b`, 0.9], ['wallet', String.raw`\b(?:wallet|seed\s+phrase|metamask|phantom|connect\s+(?:your|ur)\s+wallet)\b`, 0.92]);
for (const [oName, oRe] of BOT_OPENERS) for (const [pName, pRe, conf] of BOT_PAYLOADS) BOT.push(mk(`xbot-${oName}-${pName}`, 'bot-dm', 'bot', conf, `Bot-style opener ("${oName.replace(/-/g, ' ')}") with a ${pName} pitch — mass-DM bot.`, [rx(oRe), rx(pRe)], undefined, [ABOUT_IT]));
// Bot "fake reports / warnings" (scare bots)
const SCARE: Array<[string, string[], number]> = [
  ['tos-violation', [String.raw`\b(?:violat(?:ed|ion)|breach)\b.*\b(?:tos|terms\s+of\s+service|community\s+guidelines)\b`, String.raw`\b(?:verify|appeal|link|contact|within\s+\d+)\b`], 0.94], ['copyright-strike', [String.raw`\bcopyright\b`, String.raw`\b(?:strike|claim|infring)\w*\b`, String.raw`\b(?:appeal|verify|link|form)\b`], 0.92],
  ['account-flagged', [String.raw`\b(?:your|ur)\s+account\s+(?:has\s+been|was|is)\s+(?:flagged|reported|suspended|limited)\b`], 0.92], ['security-alert', [String.raw`\b(?:security\s+alert|suspicious\s+(?:login|activity))\b`, String.raw`\b(?:verify|secure|confirm|link|click)\b`], 0.92],
  ['staff-impersonation', [String.raw`\b(?:discord|steam|roblox|epic)\s+(?:staff|support|team|trust\s+(?:and|&)\s+safety)\b`, String.raw`\b(?:verify|confirm|dm|contact|account|ban)\b`], 0.93], ['nitro-expiring', [String.raw`\bnitro\b`, String.raw`\b(?:expir(?:e|ing|ed)|renew|payment\s+failed)\b`, LINK.source], 0.94],
];
for (const plat of ['discord', 'steam', 'roblox', 'epic games', 'instagram', 'paypal']) {
  const kinds: Array<[string, string]> = [['suspended', String.raw`\b(?:suspended|disabled|locked|terminated)\b`], ['unusual-login', String.raw`\b(?:unusual|suspicious|new)\s+(?:login|sign[\s-]?in|activity)\b`], ['verify-or-lose', String.raw`\b(?:verify|confirm)\b.*\b(?:or|within)\b.*\b(?:lose|deleted|banned|\d+\s*h(?:ours?)?)\b`]];
  for (const [kind, kRe] of kinds) BOT.push(mk(`xbot-scare-${slug(plat)}-${kind}`, 'bot-scare', 'bot', 0.92, `Fake ${plat} "${kind.replace(/-/g, ' ')}" notice pushing a link / DM — phishing bot.`, [rx(String.raw`\b${plat.replace(' ', String.raw`\s+`)}\b`), rx(kRe)], [LINK, CTA], [ABOUT_IT]));
}
for (const [name, parts, conf] of SCARE) BOT.push(mk(`xbot-scare-${name}`, 'bot-scare', 'bot', conf, `Scare-bot message (${name.replace(/-/g, ' ')}) pushing a "verify / appeal" step — phishing bot.`, parts.map(rx), undefined, [ABOUT_IT]));

// =================================================================================================================
// RAID — declarations, nuke threats, recruitment, flood signatures (≥ 200)
// =================================================================================================================
const RAID: RaidShieldThreatPattern[] = [];
const RAID_VERBS: Array<[string, string]> = [['raid', String.raw`\braid(?:ed|ing|s)?\b`], ['nuke', String.raw`\bnuk(?:e|ed|ing)\b`], ['wipe', String.raw`\bwip(?:e|ed|ing)\s+(?:this|the|your|ur)\s+server\b`], ['destroy', String.raw`\b(?:destroy|delete|take\s+(?:over|down))\s+(?:this|the|your|ur)\s+server\b`], ['flood', String.raw`\b(?:flood|spam)\s+(?:this|the|your|ur)\s+(?:server|chat|channels?)\b`], ['own', String.raw`\b(?:we\s+own|this\s+server\s+is\s+(?:ours|ours\s+now)|server\s+(?:is\s+)?ours)\b`]];
const RAID_FRAMES: Array<[string, string, number, string]> = [
  ['incoming', String.raw`\b(?:incoming|coming|in\s+\d+\s*(?:min(?:ute)?s?|sec(?:ond)?s?|hours?)|tonight|at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?|soon)\b`, 0.94, 'Announces an incoming {v} on the server.'],
  ['by-group', String.raw`\b(?:by|from)\s+(?:the\s+)?[a-z0-9_\-]{3,}\s*(?:squad|gang|clan|team|army|crew|on\s+top)\b|\b(?:get|got)\s+\w*ed\s+by\b`, 0.94, '{v} signature ("…by <group>").'],
  ['join-us', String.raw`\b(?:join|help|come)\s+(?:us|the|our)?\s*(?:raid|attack|nuke)\b|\braid\s+(?:party|squad|team|server)\b`, 0.93, 'Recruiting people for a {v}.'],
  ['bye-server', String.raw`\b(?:say\s+(?:goodbye|bye)\s+to\s+(?:your|ur|this)\s+server|rip\s+(?:this|your|ur)\s+server|server\s+(?:is\s+)?(?:dead|done|finished|gone))\b`, 0.92, '{v} threat ("say goodbye to your server").'],
  ['everyone', String.raw`@everyone|@here`, 0.95, '{v} message pinging everyone.'],
  ['caps-shout', String.raw`\b(?:[A-Z]{4,}\s+){3,}`, 0.88, 'Shouted {v} message.'],
];
RAID_VERBS.push(['spam-raid', String.raw`\bspam\s+raid\b`], ['ping-raid', String.raw`\bping\s+raid\b|\bmass\s+ping\b`], ['invite-raid', String.raw`\binvite\s+raid\b`], ['token-raid', String.raw`\btoken\s+raid\b`], ['bot-raid', String.raw`\bbot\s+raid\b|\braid\s+bots?\b`], ['mass-join', String.raw`\bmass\s+join(?:ing)?\b`]);
RAID_FRAMES.push(
  ['countdown', String.raw`\b(?:3\s*[.,]?\s*2\s*[.,]?\s*1|countdown|t[\s-]?minus)\b`, 0.92, '{v} countdown.'],
  ['alarm-emoji', String.raw`(?:🚨|💣|☢️|☠️|⚠️){2,}|(?:🔥\s*){4,}`, 0.9, '{v} message with alarm emojis.'],
  ['taunt', String.raw`\b(?:lol|lmao|lmfao|ez|get\s+rekt|cry\s+about\s+it|cope|skill\s+issue|kids)\b`, 0.88, 'Taunting {v} message.'],
  ['all-of-you', String.raw`\b(?:all\s+of\s+(?:you|u)|every(?:one|body)\s+(?:here|in\s+this\s+server))\b`, 0.9, '{v} threat aimed at the whole server.'],
  ['with-invite', INVITE.source, 0.94, '{v} call with a server invite.'],
);
for (const [vName, vRe] of RAID_VERBS) {
  for (const [fName, fRe, conf, reason] of RAID_FRAMES) {
    RAID.push(mk(`xraid-${vName}-${fName}`, 'raid-declaration', 'raid', conf, reason.replace('{v}', vName), [rx(vRe), new RegExp(fRe, fName === 'caps-shout' ? '' : 'i')], undefined, [ABOUT_IT, /\b(?:raid\s+(?:boss|shadow\s+legends|pass|battle)|pokemon\s+go|destiny|wow|world\s+of\s+warcraft|minecraft\s+raid|pillager|bedwars|vault\s+of\s+glass|last\s+wish|tarkov|rust|lost\s+ark|ffxiv|runescape|osrs|genshin|clash\s+of\s+clans)\b/i, /\b(?:protect|stop|prevent|report(?:ed)?|ban(?:ned)?|anti[\s-]?raid|raidshield)\b/i]));
  }
}
// Flood signatures: content that is itself the flood.
const FLOODS: Array<[string, string, number, string]> = [];
for (const n of [5, 8, 12, 20, 30, 50]) FLOODS.push([`mentions-${n}`, String.raw`(?:<@!?\d{15,20}>[\s,]*){${n},}`, n >= 12 ? 0.97 : n >= 8 ? 0.94 : 0.9, `${n}+ user mentions in one message — mention raid.`]);
for (const n of [3, 5, 8, 12]) FLOODS.push([`roles-${n}`, String.raw`(?:<@&\d{15,20}>[\s,]*){${n},}`, n >= 5 ? 0.96 : 0.9, `${n}+ role pings in one message — ping raid.`]);
for (const n of [15, 30, 60, 100]) FLOODS.push([`emoji-${n}`, String.raw`(?:\p{Extended_Pictographic}️?\s*){${n},}`, n >= 60 ? 0.94 : n >= 30 ? 0.9 : 0.84, `${n}+ emojis in a row — emoji flood.`]);
// (stretched letters are normal chat — "hiiiiii…" — so below 100 only a repeated symbol counts)
for (const n of [40, 100, 300, 1000]) FLOODS.push([`char-${n}`, n < 100 ? String.raw`([^\p{L}\s])\1{${n},}` : String.raw`(.)\1{${n},}`, n >= 300 ? 0.95 : n >= 100 ? 0.92 : 0.84, `One character repeated ${n}+ times — flood.`]);
for (const n of [10, 25, 50, 100]) FLOODS.push([`zalgo-${n}`, String.raw`[̀-ͯ҃-҉᷀-᷿⃐-⃿]{${n},}`, n >= 50 ? 0.96 : n >= 25 ? 0.93 : 0.88, `Zalgo text (${n}+ stacked marks) — screen-flood raid.`]);
for (const n of [20, 50, 100]) FLOODS.push([`newlines-${n}`, String.raw`(?:\n\s*){${n},}`, n >= 50 ? 0.94 : 0.88, `${n}+ empty lines — chat-wiping flood.`]);
for (const n of [3, 4, 8]) FLOODS.push([`invites-${n}`, String.raw`(?:${INVITE.source}[\s\S]{0,40}){${n},}`, 0.95, `${n}+ server invites in one message — invite raid.`]);
for (const n of [4, 6, 12, 20]) FLOODS.push([`links-${n}`, String.raw`(?:https?:\/\/\S+[\s\S]{0,30}){${n},}`, 0.92, `${n}+ links in one message — link flood.`]);
FLOODS.push(['block-art', String.raw`[█▓▒░▄▀■□▪▫]{40,}`, 0.9, 'Block-character art wall — raid flood.']);
FLOODS.push(['braille-art', String.raw`[⠀-⣿]{60,}`, 0.9, 'Braille ASCII-art wall — raid flood.']);
FLOODS.push(['fullwidth-wall', String.raw`[！-～]{40,}`, 0.88, 'Full-width text wall — raid flood.']);
FLOODS.push(['fancy-font-raid', String.raw`[\u{1d400}-\u{1d7ff}]{12,}`, 0.84, 'Fancy-font shout wall — raid styling.']);
FLOODS.push(['rtl-override', String.raw`[‪-‮⁦-⁩]{2,}`, 0.88, 'Right-to-left override characters — crash / confusion text.']);
FLOODS.push(['crash-gif', String.raw`\b(?:crash|lag)\s*(?:gif|video|file|emoji|text)\b`, 0.9, 'Crash GIF / lag text — raid tool.']);
for (const [name, re, conf, reason] of FLOODS) RAID.push(mk(`xraid-flood-${name}`, 'raid-flood', 'raid', conf, reason, [new RegExp(re, 'u')], undefined, /^(?:invites|links)-/.test(name) ? [LISTS_LINKS_OK] : undefined));
// Raid recruitment / coordination / tools
const RAID_ORG: Array<[string, string[], number, string]> = [
  ['raid-at-time', [String.raw`\braid\b`, String.raw`\bat\s+\d{1,2}(?::\d{2})?\s*(?:am|pm|est|pst|utc|gmt|cet)?\b`], 0.93, 'Schedules a raid at a set time.'],
  ['raid-invite-target', [String.raw`\braid\b`, INVITE.source], 0.95, 'Raid call with a target server invite.'],
  ['raid-bots-ready', [String.raw`\b(?:bots?|alts?|tokens?|accounts?)\s+(?:ready|loaded|online|joining)\b`, String.raw`\b(?:raid|spam|flood|nuke|join)\b`], 0.94, 'Raid bots / alts ready — coordinated attack.'],
  ['token-raid-tool', [String.raw`\b(?:token\s*(?:joiner|raider|spammer)|raid\s*tool|nuke\s*bot|mass\s*dm\s*(?:tool|bot))\b`], 0.96, 'Raid / nuke tool mention — attack tooling.'],
  ['selfbot-tool', [String.raw`\bself[\s-]?bot\b`, String.raw`\b(?:spam|raid|nuke|join|token|free|download)\b`], 0.92, 'Self-bot tooling — automated abuse.'],
  ['mass-report', [String.raw`\bmass[\s-]?report\b`, String.raw`\b(?:server|him|her|them|account|this)\b`], 0.88, 'Organising a mass report — coordinated attack.'],
  ['nuke-perms', [String.raw`\b(?:give|gimme)\s+(?:me\s+)?(?:admin|perms|permissions|mod)\b`, String.raw`\b(?:nuke|delete\s+(?:all|every)|ban\s+(?:all|every))\b`], 0.95, 'Asking for admin to nuke — takeover attempt.'],
  ['delete-channels', [String.raw`\b(?:delete|deleting|deleted)\s+(?:all|every)\s+(?:channels?|roles?|emojis?)\b`], 0.92, 'Mass channel / role deletion threat.'],
  ['ban-all', [String.raw`\b(?:ban|banning|kick|kicking)\s+(?:all|every(?:one|body))\b`, String.raw`\b(?:lol|lmao|haha|now|bye|get\s+rekt|ez)\b`], 0.88, 'Ban-everyone threat.'],
  ['raid-copypasta', [String.raw`\b(?:get\s+(?:raided|rekt|nuked)|cry\s+about\s+it|kids?\s+(?:server|get\s+raided))\b`, String.raw`\b(?:server|lol|lmao|ez|raid(?:ed)?)\b`], 0.88, 'Raid taunt copypasta.'],
  ['hacked-server', [String.raw`\b(?:hacked|compromised)\s+(?:by|this\s+server)\b`], 0.9, '"Server hacked by …" defacement.'],
  ['ip-threat', [String.raw`\b(?:i\s+have|got|grabbed)\s+(?:your|ur|everyone'?s)\s+ip\b|\bip\s+(?:grab(?:bed|ber)?|logger)\b`], 0.92, 'IP-grab threat — intimidation / doxx.'],
  // (a threat, not "doxx me" — 2026-10-14 false positive on real chat)
  ['dox-threat', [String.raw`\b(?:i'?ll|i\s+will|gonna|going\s+to|imma|ima|about\s+to)\s+dox+\s+(?:you|u|ur|your|him|her|them|every(?:one|body))\b|\bdox+(?:ed|ing)\s+(?:you|u)\b|\bleak\s+(?:your|ur)\s+(?:address|info|face|ip|location)\b`], 0.93, 'Doxxing threat.'],
  ['swat-threat', [String.raw`\b(?:swat(?:ted|ting)?|call\s+the\s+(?:cops|police)\s+on)\s+(?:you|ur|your|this)\b`], 0.92, 'Swatting threat.'],
  ['ddos-threat', [String.raw`\b(?:ddos|dos|boot(?:ed|ing)?\s+(?:you|ur)\s+offline)\b`, String.raw`\b(?:you|ur|your|this|server|everyone)\b`], 0.9, 'DDoS threat.'],
  ['shock-gore', [String.raw`\b(?:gore|cp|child\s+porn|beheading|shock\s+(?:video|site))\b`, String.raw`\b(?:link|watch|look|here|lol|lmao|send)\b`], 0.97, 'Shock / gore / illegal-content raid.'],
];
RAID_ORG.push(
  ['mods-asleep', [String.raw`\bmods?\s+(?:are\s+)?(?:asleep|sleeping|offline|afk)\b`, String.raw`\b(?:post|spam|send|raid|nsfw|gore|ping|flood)\b`], 0.9, '"Mods are asleep, post …" — raid trigger.'],
  ['leave-server', [String.raw`\b(?:everyone|y'?all|guys|all\s+of\s+(?:you|u))\s+leave\s+(?:this|the)\s+server\b`], 0.86, 'Telling everyone to leave the server — raid / poaching.'],
  ['dead-server-ad', [String.raw`\bthis\s+server\s+(?:sucks|is\s+(?:dead|trash|garbage|mid))\b`, INVITE.source], 0.9, '"This server sucks, join ours" — member poaching.'],
  ['raid-practice', [String.raw`\b(?:practice|test)\s+raid\b`], 0.88, '"Practice raid" — raid coordination.'],
  ['raid-target-list', [String.raw`\b(?:next|target)\s+server\b`, String.raw`\b(?:raid|nuke|hit|spam)\b`], 0.92, 'Picking the next raid target.'],
  ['fr-on-va-raid', [String.raw`\bon\s+va\s+(?:raid|nuke|d[ée]truire|spam)\s+(?:ce|le|votre|ton)\s+serveur\b`], 0.94, 'Raid announced in French.'],
  ['fr-serveur-raid', [String.raw`\b(?:serveur|server)\s+(?:raid[ée]?|nuk[ée]|d[ée]truit)\s+par\b`], 0.93, 'French "server raided by …" signature.'],
  ['fr-raid-ce-soir', [String.raw`\braid\b`, String.raw`\b(?:ce\s+soir|demain|dans\s+\d+\s*min|[àa]\s+\d{1,2}h)\b`], 0.92, 'Raid scheduled (French).'],
  ['es-raidear', [String.raw`\braide(?:ar|amos|ando|aremos)\b|\bvamos\s+a\s+(?:raidear|nukear|destruir)\b`], 0.93, 'Raid announced in Spanish.'],
  ['es-servidor-raid', [String.raw`\bservidor\s+(?:raideado|nukeado|destruido|hackeado)\b`], 0.93, 'Spanish "server raided / nuked" signature.'],
  ['es-raid-hoy', [String.raw`\braid\b`, String.raw`\b(?:hoy|esta\s+noche|mañana|en\s+\d+\s*min)\b`], 0.92, 'Raid scheduled (Spanish).'],
  ['pl-robimy-raid', [String.raw`\brobimy\s+raida?\b|\braid\s+na\s+(?:ten|wasz|tw[oó]j)\s+serwer\b`], 0.93, 'Raid announced in Polish.'],
  ['pl-serwer-zniszczony', [String.raw`\bserwer\s+(?:zniszczony|zraidowany|zhakowany)\b`], 0.92, 'Polish "server destroyed / raided" signature.'],
  ['de-raiden', [String.raw`\b(?:wir\s+)?raiden\s+(?:den|diesen|euren|deinen)\s+server\b`], 0.93, 'Raid announced in German.'],
  ['de-server-geraidet', [String.raw`\bserver\s+(?:geraidet|zerst[öo]rt|gehackt|genukt)\b`], 0.92, 'German "server raided / destroyed" signature.'],
  ['pt-raidar', [String.raw`\bvamos\s+(?:raidar|derrubar|nukar)\s+(?:o|esse|este|seu)\s+servidor\b`], 0.93, 'Raid announced in Portuguese.'],
  ['pt-servidor-raidado', [String.raw`\bservidor\s+(?:raidado|derrubado|nukado|hackeado)\b`], 0.92, 'Portuguese "server raided" signature.'],
);
// Raids in games are not server raids ("vault of glass raid at 8pm in destiny" was flagged, 2026-10-14).
const GAME_RAID = /\b(?:destiny|vault\s+of\s+glass|king'?s\s+fall|last\s+wish|deep\s+stone|garden\s+of\s+salvation|crota|salvation'?s\s+edge|wow|world\s+of\s+warcraft|ffxiv|final\s+fantasy|raid\s+boss|boss\s+raid|pok[eé]mon|genshin|lost\s+ark|osrs|runescape|gw2|guild\s+wars|raid\s+shadow|tarkov|minecraft\s+raid|pillagers?|bedwars|clash\s+of\s+clans|\bcoc\b|rust\s+raid|base\s+raid|ark\s+raid|fortnite\s+raid)\b/i;
for (const [name, parts, conf, reason] of RAID_ORG) RAID.push(mk(`xraid-${name}`, 'raid-coordination', 'raid', conf, reason, parts.map((p) => new RegExp(p, 'i')), undefined, [ABOUT_IT, GAME_RAID, /\b(?:protect|stop|prevent|anti[\s-]?raid|raidshield|how\s+do\s+i|what\s+is|what'?s\s+a)\b/i]));

export const RAIDSHIELD_EXPANSION: RaidShieldThreatPattern[] = [...SCAM, ...SPAM, ...BOT, ...RAID];
export const RAIDSHIELD_EXPANSION_COUNTS = { scam: SCAM.length, spam: SPAM.length, bot: BOT.length, raid: RAID.length };
