import { KnowledgeItem } from '../../types';

/**
 * INTERNET_SAFETY_PRIVACY_GAPS — batch 270 corrections. Another strong
 * domain for nexus-4b (only 7 misses out of 25, similar tier to PC hardware
 * batch 264 and personal finance batch 269) — and notably, unlike the whole
 * string of sports batches before it, ZERO wrong-domain hallucinations here.
 * Every miss in this batch was simply "explained the first half, got cut off
 * before the second half" rather than fabricating wrong content. Handled
 * well: VPN/proxy, HTTP/HTTPS, 2FA/strong password, virus/malware, firewall/
 * antivirus, end-to-end/regular encryption, incognito/VPN, data breach/
 * identity theft, cookie/cache, strong password/passphrase, spam/phishing,
 * scam/too-good-to-be-true, blocking/reporting, password manager/memory,
 * public/private profile, screen time/parental controls, verified/regular
 * account, oversharing/normal posting. Misses:
 * - "phishing vs social engineering" explained phishing well then got cut
 *   off right before ever explaining social engineering (the broader
 *   category phishing belongs to).
 * - "public wifi vs private home network" was a pure web dump (generic
 *   definitions of Wi-Fi and the World Wide Web), never addressed the
 *   actual security distinction at all.
 * - "doxxing vs cyberbullying" explained doxxing well then got cut off
 *   before ever explaining cyberbullying.
 * - "digital footprint vs privacy settings" only explained digital
 *   footprint, never explained (or contrasted with) privacy settings.
 * - "catfish vs real online friend" explained catfish well then got cut off
 *   before describing a real online friend for contrast.
 * - "ad tracker vs website cookie" explained cookie fine then got cut off
 *   right as it was about to explain ad trackers.
 * - "deepfake vs photoshopped image" explained photoshop fine then got cut
 *   off right before ever defining deepfake — ironic, since deepfake was the
 *   actual subject of the question.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'internet safety', keywords, content, createdAt: now,
});

export const INTERNET_SAFETY_PRIVACY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-isp-phishing-vs-social-engineering',
    'Phishing vs social engineering',
    [
      'difference between phishing and social engineering', 'phishing is a specific digital tactic tricking someone into giving up login details or personal info usually through a fake email text message or website that impersonates something trustworthy',
      'social engineering is the much broader umbrella category any manipulation tactic that exploits human psychology trust fear urgency or authority to get someone to do something or reveal something they normally would not',
      'phishing is one specific TYPE of social engineering other types include pretexting baiting tailgating following someone into a secure building and vishing voice phone call scams',
    ],
    `PHISHING is one specific DIGITAL tactic: tricking someone into giving up login details or personal info, usually through a fake email, text message, or website designed to impersonate something trustworthy (a bank, Steam, Discord support, etc.).

SOCIAL ENGINEERING is the much broader UMBRELLA category that phishing belongs to — it covers any manipulation tactic that exploits human psychology (trust, fear, urgency, authority, curiosity) to get someone to do something or reveal something they normally wouldn't. Social engineering doesn't have to happen online or through a screen at all.

Phishing is just ONE type of social engineering. Other types include: "pretexting" (inventing a false scenario/identity to extract info, like pretending to be IT support), "baiting" (leaving an infected USB drive somewhere tempting), "tailgating" (physically following someone into a secure building without their own access badge), and "vishing" (voice/phone-call scams). So every phishing attempt is social engineering, but not all social engineering is phishing.`,
  ),
  k(
    'kb-gap-isp-public-vs-private-wifi',
    'Public wifi vs a private home network',
    [
      'difference between public wifi and a private home network', 'public wifi at a coffee shop airport or mall is typically shared with many strangers often has weak or no encryption and anyone else on that same network can potentially see or intercept your unencrypted traffic',
      'a private home network is password protected and controlled by you or your household so only devices you trust and allow are connected making it much harder for a stranger to snoop on your traffic',
      'the real security risk on public wifi is other people on that same shared network intercepting your data or a fake malicious hotspot pretending to be the real one always use a VPN or stick to HTTPS sites on public wifi',
    ],
    `PUBLIC WIFI (at a coffee shop, airport, mall, or hotel) is typically shared with many strangers at once, often has weak or no encryption on the connection itself, and is frequently completely open (no password needed). Anyone else connected to that same public network can potentially see or intercept unencrypted traffic, and scammers sometimes set up fake hotspots with a legitimate-sounding name specifically to lure people into connecting so they can spy on their traffic.

A PRIVATE HOME NETWORK is password-protected and controlled by you or your household — only devices you specifically trust and allow are connected, which makes it much harder for a random stranger to snoop on what you're doing.

The practical safety advice that follows from this: on public wifi, stick to websites using HTTPS (the padlock icon), avoid logging into sensitive accounts (banking) if possible, and use a VPN if you need real protection — the risk isn't the wifi itself, it's the other untrusted devices potentially sharing that same open network with you.`,
  ),
  k(
    'kb-gap-isp-doxxing-vs-cyberbullying',
    'Doxxing vs cyberbullying',
    [
      'difference between doxxing and cyberbullying', 'doxxing is specifically leaking or publishing someones real personal identifying information online without their consent like their home address real name phone number or workplace',
      'cyberbullying is a broader category of using digital platforms messages posts or comments to repeatedly harass threaten humiliate or intimidate someone it does not require revealing any personal information at all',
      'doxxing can be used as a weapon inside a cyberbullying campaign to escalate it into real world danger but plenty of cyberbullying happens with zero personal information ever revealed just repeated harassment',
    ],
    `DOXXING is specifically about LEAKING or PUBLISHING someone's real, personal identifying information online without their consent — their home address, real name, phone number, workplace, or other details that can be used to find or target them in real life.

CYBERBULLYING is a much broader category: using digital platforms — messages, posts, comments, group chats — to repeatedly harass, threaten, humiliate, or intimidate someone. Crucially, cyberbullying does NOT require revealing any personal information at all; plenty of cyberbullying is just relentless insults, exclusion, or harassment with zero doxxing involved.

The two can overlap — doxxing is sometimes used as a weapon INSIDE a cyberbullying campaign to escalate it into real-world danger (harassment showing up at someone's actual house) — but they're separate concepts: doxxing is about exposing private information, cyberbullying is about the ongoing pattern of harassment itself, which can happen with or without anyone's real info ever being revealed.`,
  ),
  k(
    'kb-gap-isp-digital-footprint-vs-privacy-settings',
    'Digital footprint vs privacy settings',
    [
      'difference between your digital footprint and your privacy settings', 'your digital footprint is the passive ongoing trail of data created by everything you do online messages sent servers joined searches made photos posted whether you think about it or not',
      'privacy settings are the active tools and controls you deliberately configure on a platform to decide who can see your posts profile information or activity',
      'your digital footprint keeps accumulating in the background regardless of your settings privacy settings only control who is ALLOWED to see certain parts of that footprint going forward not what has already been collected',
    ],
    `Your DIGITAL FOOTPRINT is the PASSIVE, ongoing trail of data created by everything you do online — messages sent, servers joined, searches made, photos posted, sites visited — whether you're thinking about it or not. It keeps accumulating in the background just from using the internet normally.

PRIVACY SETTINGS are the ACTIVE tools and controls you deliberately configure on a specific platform to decide who can see your posts, profile information, or activity going forward — things like making an account private, hiding your friends list, or turning off location sharing.

The key relationship: privacy settings only control who's ALLOWED to see certain parts of your footprint from here on out — they don't erase or reduce the footprint that's already been created, and they don't control what a platform itself (or anyone who already saw something before you changed a setting) has already collected or seen. Your footprint keeps growing regardless of your settings; privacy settings just manage visibility of parts of it going forward.`,
  ),
  k(
    'kb-gap-isp-catfish-vs-real-friend',
    'Catfish vs a real online friend',
    [
      'difference between a catfish and a real online friend', 'a catfish is someone who deliberately fakes their identity online using stolen photos a fake name and a fabricated life story usually to manipulate deceive or scam the person they are talking to',
      'a real online friend is someone who is honest about who they are consistent over time and whose story details and even video calls or voice check out and match up rather than always having an excuse for never showing their face',
      'warning signs of a catfish include refusing video calls always having an excuse claiming their camera is broken asking for money quickly and photos that reverse image search to someone elses real account',
    ],
    `A CATFISH is someone who deliberately FAKES their identity online — using stolen photos, a fake name, and a fabricated life story — usually to manipulate, deceive, or scam the person they're talking to, whether for money, attention, or some other motive.

A REAL ONLINE FRIEND is someone who is honest about who they actually are, is consistent over time, and whose details actually hold up — they're willing to video call eventually, their story doesn't keep changing, and their photos and claims check out rather than always having a new excuse for why they can't prove who they say they are.

Warning signs of a likely catfish: refusing every video call with a rotating excuse ("camera's broken," "bad wifi," forever), moving to ask for money or gift cards quickly, professing intense feelings unusually fast, and photos that turn out (via a reverse image search) to belong to a completely different, real person's account somewhere else online.`,
  ),
  k(
    'kb-gap-isp-ad-tracker-vs-cookie',
    'Ad tracker vs a website cookie',
    [
      'difference between an ad tracker and a website cookie', 'a regular first party website cookie is small data stored by the SPECIFIC site you are visiting to remember things just for that one site like your login or shopping cart',
      'an ad tracker often using third party cookies pixels or device fingerprinting is designed to follow and identify you ACROSS many different unrelated websites building a profile of your browsing habits and interests to target ads at you',
      'the key difference is scope a regular cookie usually only helps the one site you are on an ad tracker is built specifically to watch you everywhere you go across the whole internet',
    ],
    `A regular, FIRST-PARTY website COOKIE is small data stored by the SPECIFIC site you're visiting, used to remember things just for that one site — like keeping you logged in, remembering items in a shopping cart, or saving your language preference. Its scope is limited to that one website.

An AD TRACKER (often implemented via third-party cookies, tracking pixels, or device fingerprinting) is designed to follow and identify YOU specifically ACROSS many different, unrelated websites — building up a profile of your browsing habits and interests across the entire internet, specifically so advertisers can target ads at you based on everywhere you've been, not just the one site you're currently on.

The key difference is SCOPE: a regular cookie usually only helps (and only "watches") the one site you're actually using, while an ad tracker is specifically built to watch and connect your activity across many completely different sites you visit, often without you realizing the same tracker is following you from site to site.`,
  ),
  k(
    'kb-gap-isp-deepfake-vs-photoshop',
    'Deepfake vs a photoshopped image',
    [
      'difference between a deepfake and a photoshopped image', 'a photoshopped image is a still picture that has been manually edited altered or manipulated by a person using photo editing software',
      'a deepfake uses artificial intelligence and machine learning specifically to generate entirely new fabricated video or audio of a real person doing or saying things they never actually did or said often mapping one persons face or voice onto another',
      'photoshop requires a human to manually manipulate an existing real photo a deepfake uses AI to automatically generate convincing fake video or audio content that can look and sound extremely realistic',
    ],
    `A PHOTOSHOPPED image is a still picture that has been manually edited or altered by a person using photo-editing software — adding text, changing a background, combining elements from different photos — it's human-driven manual manipulation of an existing image.

A DEEPFAKE uses ARTIFICIAL INTELLIGENCE and machine learning to generate entirely new, fabricated VIDEO or AUDIO of a real person doing or saying things they never actually did or said — often by mapping one person's face or voice onto someone else's body/voice in a video, automatically and convincingly.

The key differences: photoshop is manual human editing of a still image using traditional software, while a deepfake is AI-GENERATED moving video or audio content, created automatically by a machine-learning model rather than by hand — and deepfakes can be far more convincing and harder to detect because the AI is specifically trained to make the fabrication look and sound realistic in motion, not just in a single frozen image.`,
  ),
];
