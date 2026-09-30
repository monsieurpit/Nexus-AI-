import { KnowledgeItem } from '../../types';

// Batch 2026-09-29 — online safety on Discord. Prompted by real "dox @user" requests (every one
// of them fell back to a canned line in production). The corpus had one "Doxxing vs cyberbullying"
// doc but nothing on swatting, token grabbers / fake-Nitro account takeovers, the "I accidentally
// reported you" scam, IP grabbers, catfishing or sextortion — the exact threats a young Discord
// community actually runs into. Written to help people protect themselves and each other.
export const ONLINE_SAFETY_DISCORD: KnowledgeItem[] = [
  {
    id: 'kb-safety-doxxing-what-to-do',
    title: 'Doxxing: What It Is and What to Do If It Happens to You',
    category: 'security',
    keywords: ['doxxing', 'dox', 'doxx', 'doxxed', 'what is doxxing', 'i got doxxed', 'someone leaked my address', 'what to do if doxxed', 'is doxxing illegal'],
    content: `Doxxing (or doxing, from "dropping docs") means finding and publicly posting someone's private personal information — real name, home address, phone number, school or workplace, IP address, family members — without their consent, usually to intimidate or harass them. It can lead to real-world harm: stalking, threats, people showing up at someone's home, or swatting. It breaks Discord's rules and gets accounts banned, and depending on the country and circumstances it can be a crime (harassment, stalking, or specific doxxing laws). If you get doxxed: don't engage with the person; screenshot everything with usernames and timestamps; report the messages to the server's moderators and to Discord (Trust & Safety); lock down your accounts (private profiles, remove your real name and school from bios, change passwords, enable 2FA); tell a trusted adult or family members; and if there are threats to your safety, contact local police. The best prevention is simply not sharing identifying details online — even small ones like your school, your street, or photos that show landmarks.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-swatting',
    title: 'Swatting: What It Is and Why It\'s Dangerous',
    category: 'security',
    keywords: ['swatting', 'swat', 'swatted', 'what is swatting', 'swatting streamer', 'fake 911 call', 'is swatting illegal'],
    content: `Swatting is making a fake emergency call — usually claiming a hostage situation, shooting or bomb — to send armed police (a SWAT team) to someone's home. It's often targeted at streamers and gamers after online arguments, sometimes live on stream, and it usually relies on first doxxing the victim's address. It is extremely dangerous: police arrive expecting an armed threat, and people have been killed. In a notorious 2017 case in Wichita, Kansas, a man who had nothing to do with an online Call of Duty dispute was shot dead by police responding to a swatting call; the caller was sentenced to 20 years in prison. Swatting is a serious crime in the US, Canada and many other countries, prosecuted as false reporting, and when someone is hurt, far worse. It is never a joke or a prank.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-discord-token-grabbers',
    title: 'Discord Account Hacked? Token Grabbers, Fake Nitro Links and How to Recover',
    category: 'security',
    keywords: ['token grabber', 'token logger', 'discord hacked', 'my discord got hacked', 'discord account hacked', 'got hacked', 'account hacked', 'hacked discord account recover', 'recover hacked discord', 'how to recover discord account', 'discord account recovery', 'locked out of discord', 'fake nitro', 'free nitro scam', 'discord account stolen', 'steam gift scam', 'discord token', 'hacked'],
    content: `Most hacked Discord accounts are stolen through scams, not by "hacking" in the movie sense. Common methods: a "free Nitro" or "Steam gift" link leading to a fake login page; a friend's (already-hacked) account sending "try my game" or "is this you in this video?" with a download link — the file is malware called a token grabber that steals your Discord login token (a key that lets someone use your account without your password or 2FA) plus saved browser passwords and crypto wallets; and fake "verify" bots in servers. Once in, the scammer messages all your friends with the same scam. Protect yourself: never download or run files people send you, even from friends; Discord Nitro is never given away through random links; check the URL is really discord.com; enable 2FA; and never share your token. How to recover a hacked Discord account: if you can still log in, change your password immediately (this logs out every session and invalidates stolen tokens), turn on 2FA, remove unknown authorized apps under Settings > Authorized Apps, and run an antivirus scan to remove any token grabber still on your PC. If the hacker changed your email or password and you're locked out, use "Forgot your password?" and contact Discord Support (support.discord.com) with proof the account is yours. Then warn your friends that any messages from your account were the scammer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-discord-report-scam-qr',
    title: 'The "I Accidentally Reported You" Scam and QR Code Login Scams',
    category: 'security',
    keywords: ['i accidentally reported you', 'discord report scam', 'fake discord staff', 'qr code scam discord', 'discord staff dm', 'fake moderator scam', 'discord qr login'],
    content: `A very common Discord scam: someone messages you saying they "accidentally reported you" and your account is about to be banned, and tells you to contact a "Discord staff member" or "moderator" who then pressures you into handing over your login, scanning a QR code, or paying. Real Discord staff never DM you out of nowhere, never ask for your password or token, and Discord doesn't ban accounts because one person "accidentally" reported them. The QR code scam uses Discord's legitimate "log in with QR code" feature: if you scan a scammer's QR code with the Discord mobile app, you log them straight into your account. Only ever scan a login QR code shown on your own computer's official Discord login screen. If anyone pressures you with urgency ("you have 10 minutes before your account is deleted"), that pressure itself is the red flag — block and report.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-ip-grabbers',
    title: 'IP Grabbers: What Someone Can (and Can\'t) Do With Your IP Address',
    category: 'security',
    keywords: ['ip grabber', 'ip logger', 'grabify', 'someone has my ip', 'what can someone do with my ip', 'can someone find my address from my ip', 'ip address location', 'ddos threat'],
    content: `An IP grabber (or IP logger, like Grabify-style links) is a link that records the IP address of anyone who clicks it. Having your IP does NOT give someone your home address: an IP address usually reveals only your internet provider and an approximate area — often just your city or region, and sometimes a city nearby. Your provider knows which customer had that IP, but only shares it with police via legal process. The real risks are smaller: someone could try to DDoS your connection (flooding it so your internet lags or drops, mostly an issue in online games), or use your rough location to intimidate you. If someone threatens you with your IP, restarting your router often gets you a new IP, and a VPN hides your real IP. Threats like "I have your IP, I'm going to find you" are mostly bluffing, but report them to moderators anyway.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-catfishing',
    title: 'Catfishing: Fake Identities Online',
    category: 'security',
    keywords: ['catfish', 'catfishing', 'catfished', 'what is catfishing', 'fake profile', 'how to tell if someone is catfishing', 'reverse image search'],
    content: `Catfishing is pretending to be someone else online — using fake photos, a fake name, age or backstory — to build a relationship with someone. Motives range from loneliness or pranks to scams (asking for money, gift cards or crypto), sextortion, or adults posing as teens to target young people. Warning signs: they won't video call or always have an excuse, their photos look too professional or they only have a few, their story has inconsistencies, they move fast emotionally, and they try to move you to a private app or ask you to keep the relationship secret. You can check their photos with a reverse image search (Google Lens, TinEye). Never send money or intimate photos to someone you've only met online, and tell someone you trust if something feels off.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-sextortion',
    title: 'Sextortion: What to Do If Someone Threatens to Share Your Photos',
    category: 'security',
    keywords: ['sextortion', 'someone is blackmailing me', 'blackmail nudes', 'threatening to leak my pictures', 'take it down', 'ncmec', 'cybertip', 'what to do if blackmailed online'],
    content: `Sextortion is when someone threatens to share intimate images or videos of a person unless they pay money or send more images. It very often targets teenage boys, usually by a scammer posing as a girl their age who sends a photo first and asks for one back, then immediately demands money. If this happens: you are not in trouble and it is not your fault — the person threatening you is the one committing a crime. Do NOT pay (paying almost never stops it and often leads to more demands). Stop responding, but don't delete the account or messages yet — screenshot everything as evidence. Block and report the account on the platform. Tell a trusted adult. Report it to police or, for anyone under 18, to NCMEC's CyberTipline (US) or Cybertip.ca (Canada). NCMEC's free "Take It Down" tool can help get images of minors removed from participating platforms. Sextortion has led to tragedies because victims felt trapped and alone — talking to someone is the most important step.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-password-managers-2fa',
    title: 'Password Managers, Passkeys and Keeping Accounts Safe',
    category: 'security',
    keywords: ['password manager', 'strong password', 'passkeys', 'reuse passwords', 'how to make a strong password', 'bitwarden', 'account security tips', 'have i been pwned'],
    content: `The biggest account-security mistake is reusing the same password everywhere: when one site gets breached, attackers try that email and password on every other site ("credential stuffing"). A password manager (Bitwarden, 1Password, or the one built into your browser/phone) generates and remembers a unique, long password for every account, so you only need to remember one strong master password. A good password is long — a passphrase of several random words beats a short string of symbols. Turn on two-factor authentication (2FA), preferably with an authenticator app rather than SMS. Passkeys, now supported by Google, Apple, Microsoft and Discord, replace passwords with a key stored on your device and unlocked with your fingerprint, face or PIN, and are resistant to phishing. You can check whether your email appeared in a known breach at haveibeenpwned.com.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-vpn-basics',
    title: 'What a VPN Actually Does (and Doesn\'t Do)',
    category: 'security',
    keywords: ['vpn', 'what is a vpn', 'do i need a vpn', 'vpn hide ip', 'nordvpn', 'is a vpn safe', 'vpn for gaming', 'free vpn'],
    content: `A VPN (virtual private network) encrypts your internet traffic and sends it through the VPN company's server, so websites and games see the VPN server's IP address instead of yours, and people on your local network (like public Wi-Fi) can't see what you're doing. It's useful for hiding your IP from people you game or chat with, protecting yourself on public Wi-Fi, and accessing content from other regions. It does NOT make you anonymous: you're shifting trust from your internet provider to the VPN company, and logging into accounts still identifies you. It doesn't stop viruses, phishing or scams. Free VPNs often make money by collecting and selling your data, so a reputable paid or well-reviewed provider is safer. VPNs can add some lag to games because traffic takes a longer route.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-safety-discord-raids-mods',
    title: 'Discord Server Raids and How Moderators Handle Them',
    category: 'Discord',
    keywords: ['discord raid', 'server raid', 'raiders', 'how to stop a raid', 'discord automod', 'verification level discord', 'nuke discord server', 'mass ping'],
    content: `A Discord raid is when a group of accounts (often coordinated from another server, sometimes bots) floods a server all at once with spam, mass pings, slurs, shock images or scam links, aiming to disrupt it. A "nuke" is worse: someone who got admin permissions deletes channels and bans members. Defences: raise the server's verification level (requiring a verified email/phone or a waiting period), use AutoMod keyword and spam filters, limit who can @everyone, give admin permissions to as few people as possible and require 2FA for moderators, use an anti-raid bot that detects join spikes and can lock the server, and keep an audit of who has which roles. During a raid moderators typically lock channels (slowmode or deny sending), ban the raiding accounts, and report them to Discord.`,
    createdAt: Date.now(),
  },
];
