import { KnowledgeItem } from '../../types';

// Batch 286 corpus fixes — consumer tech/social media topics. Rough batch, 15/25 misses. Mostly
// the "answered only half the comparison, cut off before the second term" pattern. Two severe
// topic-dodge hallucinations: "blog vs vlog" answered with trivia about the web series
// "Lonelygirl15" and an unrelated influencer, never actually defining either term; "clickbait vs
// headline" answered with English-language history and an unrelated "hot take" journalism
// definition. Also a fabricated distinction: "laptop vs notebook computer" invented a difference
// where none really exists — they're essentially synonyms for the same device category.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'technology',
  keywords,
  content,
  createdAt: now,
});

export const CONSUMER_TECH_SOCIAL_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-tech-app-vs-website',
    'App vs website',
    ['app', 'website', 'difference app website'],
    "A website is a page or set of pages accessed through a web browser (Chrome, Safari, etc.) — it doesn't need to be installed, works across any device with a browser, and updates instantly since you're always loading the current version from the server. An app (application) is a piece of software installed directly onto a device (phone, computer) from an app store — it can often work offline, tends to run faster and access more device features (camera, GPS, notifications) than a website can, but requires downloading, installing, and updating separately. A growing middle ground, 'web apps' or PWAs, blur the line by offering app-like behavior through a browser, but the classic distinction is: a website is accessed through a browser with nothing installed, an app is installed software with deeper device access.",
  ),
  k(
    'kb-gap-tech-laptop-vs-notebook-correction',
    'Laptop vs notebook computer (correcting a fabricated distinction)',
    ['laptop', 'notebook computer', 'difference laptop notebook'],
    "Correcting a common misconception: 'laptop' and 'notebook computer' are essentially SYNONYMS referring to the same category of portable computer — there is no meaningful technical difference between them. 'Notebook' was historically sometimes used to describe a slightly thinner, lighter variant of a laptop (in the 1990s, marketing sometimes distinguished 'notebook' as more compact than a bulkier 'laptop'), but today the two terms are used interchangeably by virtually everyone, including manufacturers — a 'laptop' and a 'notebook computer' both refer to the same portable, foldable, all-in-one computer with a built-in screen and keyboard.",
  ),
  k(
    'kb-gap-tech-monitor-vs-tv',
    'Monitor vs TV',
    ['monitor', 'tv', 'television', 'difference monitor tv'],
    "A computer monitor is designed to be viewed up close at a desk, typically has a higher pixel density and faster refresh rates (important for gaming and detailed work), usually lacks a built-in TV tuner or smart TV apps, and connects primarily via HDMI/DisplayPort to a computer or console. A TV (television) is designed to be viewed from farther away across a room, generally has a larger screen size, includes a built-in tuner for broadcast channels and/or smart TV apps (Netflix, YouTube, etc.) built directly into the device, and typically has more input processing lag than a monitor since it prioritizes picture enhancement over raw responsiveness. The key differences: viewing distance the screen is optimized for, whether a broadcast tuner/smart apps are built in, and how much input lag/refresh rate is prioritized for gaming and computer use versus general television viewing.",
  ),
  k(
    'kb-gap-tech-buffering-vs-lag',
    'Buffering vs lag',
    ['buffering', 'lag', 'difference buffering lag'],
    "Buffering happens specifically during streaming (video or audio) when your device pauses playback to download and store ('buffer') enough of the upcoming content before it can keep playing smoothly — it's a direct symptom of your internet connection not delivering data fast enough to keep up with what's being played. Lag is a broader term for any noticeable DELAY between an action and its result — most commonly used for online gaming, where lag means a delay between pressing a button and seeing that action happen on screen, caused by network latency (the time data takes to travel to a game server and back) or a device struggling to process something fast enough. The key difference: buffering is specifically a streaming-content pause while data catches up; lag is a broader delay between input and response, most associated with gaming and real-time interaction rather than media playback.",
  ),
  k(
    'kb-gap-tech-podcast-vs-radio-show',
    'Podcast vs radio show',
    ['podcast', 'radio show', 'difference podcast radio show'],
    "A radio show is broadcast live (or recorded but scheduled at a specific time) over radio airwaves to whoever happens to be tuned in at that moment — listeners generally can't choose exactly when to listen or easily go back to a specific past episode. A podcast is pre-recorded, on-demand audio content that's uploaded to the internet and can be downloaded or streamed whenever a listener wants, from any past episode in the show's catalog — there's no live broadcast schedule to catch, and it's typically distributed through podcast apps/platforms rather than radio frequencies. The key difference: a radio show is tied to a live/scheduled broadcast that you have to catch at a specific time, while a podcast is on-demand audio you can access anytime, in any order.",
  ),
  k(
    'kb-gap-tech-influencer-vs-celebrity',
    'Influencer vs celebrity',
    ['influencer', 'celebrity', 'difference influencer celebrity'],
    "A celebrity typically becomes famous through a traditional talent-based career — acting, music, sports, or another profession — and their public recognition comes as a byproduct of that work, often built up through traditional media (film, TV, music industry) over years. An influencer builds their following and public presence directly ON social media platforms (Instagram, YouTube, TikTok) — their 'career' often IS the content creation and audience-building itself, rather than fame arising from an unrelated talent or profession, and their influence is typically measured by engagement/follower metrics rather than traditional achievements like box office numbers or album sales. The key difference: a celebrity's fame usually originates from a traditional talent/profession that social media then amplifies, while an influencer's fame originates directly from building an audience through social media content itself.",
  ),
  k(
    'kb-gap-tech-subscriber-vs-follower-correction',
    'Subscriber vs follower',
    ['subscriber', 'follower', 'difference subscriber follower'],
    "A subscriber typically opts in to receive direct, ongoing content or updates — often by providing contact information like an email address (for a newsletter) or by subscribing to a channel to get notified of new content — subscribing usually implies a more direct, sometimes personal connection to receiving that content (like an email inbox). A follower chooses to see someone's content within a social media platform's feed (Twitter/X, Instagram) — following doesn't require sharing contact information, it just adds that account's posts to what you might see in your feed, and depends on the platform's algorithm for whether you actually see every post. The key difference: a subscriber has actively opted into a more direct, guaranteed delivery channel (like email), while a follower has just added an account to their feed, with actual visibility depending on the platform's algorithm.",
  ),
  k(
    'kb-gap-tech-organic-vs-paid-reach',
    'Organic reach vs paid reach',
    ['organic reach', 'paid reach', 'difference organic paid reach'],
    "Organic reach is the number of people who see your content for free, without any money spent — driven by the platform's algorithm deciding to show it to people based on engagement, relevance, or their existing follow/interest patterns. Paid reach is the number of people who see your content specifically because you paid the platform to promote or advertise it (a 'boosted' or sponsored post) — guaranteeing it gets shown to a targeted audience regardless of organic algorithm performance. The key difference: organic reach is free and algorithm-dependent, while paid reach is purchased and guarantees a targeted audience size regardless of how the algorithm would have treated the post on its own.",
  ),
  k(
    'kb-gap-tech-hashtag-vs-keyword',
    'Hashtag vs keyword',
    ['hashtag', 'keyword', 'difference hashtag keyword'],
    "A hashtag is a word or phrase preceded by the '#' symbol used specifically on social media platforms to categorize content and make it discoverable to anyone browsing or searching that hashtag (like #travel or #gaming) — it's a built-in platform feature that groups posts together. A keyword is a broader term for any word or phrase someone types into a SEARCH ENGINE (like Google) to find relevant information — keywords aren't tagged onto content directly by the creator the way hashtags are; instead, search engines analyze a page's actual content to determine which keywords it's relevant to. The key difference: a hashtag is a creator-added social media tag for categorization and discovery within that platform, while a keyword is a search term used to find content across the web, determined by the content itself rather than manually tagged.",
  ),
  k(
    'kb-gap-tech-blog-vs-vlog',
    'Blog vs vlog',
    ['blog', 'vlog', 'difference blog vlog'],
    "A blog (web log) is a website or section of a website featuring written content, typically posted regularly in reverse-chronological order — articles, personal reflections, tutorials, or news, consumed by reading text (often with images). A vlog (video blog) is the video equivalent — instead of writing, the creator records themselves talking or documenting their experiences on camera, and it's consumed by watching rather than reading, typically hosted on video platforms like YouTube. The core difference is simply the medium: a blog is written content you read; a vlog is video content you watch, though both often cover similar personal, informational, or storytelling content.",
  ),
  k(
    'kb-gap-tech-username-vs-handle',
    'Username vs handle',
    ['username', 'handle', 'difference username handle'],
    "A username is the unique identifier you choose (or are assigned) to log into an account and be identified by the platform's system — it's often used for login purposes and must be unique on that specific platform. A handle is typically the public-facing version of your identity on social media, usually prefixed with '@' (like @nexusbot on Twitter/X or Instagram), used for others to mention, tag, or find you — on most modern platforms, your username and handle are actually the same string, just used in different contexts (login/system identification vs. public @-mentions), though some platforms distinguish a 'display name' (which can be anything, including spaces and emoji) from the more restricted, unique handle/username underneath it.",
  ),
  k(
    'kb-gap-tech-data-breach-vs-data-leak',
    'Data breach vs data leak',
    ['data breach', 'data leak', 'difference data breach data leak'],
    "A data breach involves an unauthorized party actively gaining access to data through a deliberate attack or exploit — hacking into a system, bypassing security, or stealing credentials to get in. A data leak (or data exposure) happens accidentally, with no attacker necessarily involved at all — often caused by a misconfiguration, like a database left publicly accessible without a password, or a company employee accidentally sending sensitive data to the wrong place. The key difference: a data breach implies an active, malicious intrusion by an attacker; a data leak implies an accidental exposure of data, often due to human error or misconfiguration, without necessarily involving a deliberate attack at all — though a leak can absolutely be discovered and exploited by bad actors after the fact.",
  ),
  k(
    'kb-gap-tech-scam-vs-hoax',
    'Scam vs hoax',
    ['scam', 'hoax', 'difference scam hoax'],
    "A scam is a deliberate scheme specifically designed to steal money, personal information, or property from a victim — the end goal is always some kind of theft or financial/material gain for the scammer (a fake job offer, a phishing email, a fraudulent investment). A hoax is a deception designed to make people believe something false is true, but it doesn't necessarily aim to steal anything — a hoax's goal is usually to deceive, prank, spread misinformation, or cause a reaction (like a fake news story, a fabricated urban legend, or an April Fools' prank), without a direct theft component. The key difference: a scam's core purpose is to steal something of value from the victim, while a hoax's core purpose is simply to deceive people into believing something false, regardless of whether any theft occurs.",
  ),
  k(
    'kb-gap-tech-clickbait-vs-headline',
    'Clickbait vs headline',
    ['clickbait', 'headline', 'difference clickbait headline'],
    "A headline is simply the title of any article or piece of content, meant to summarize what the content is about and draw a reader's attention — headlines can be written well or poorly, but their basic job is honest summarization. Clickbait is a specific, often criticized STYLE of headline deliberately designed to manipulate curiosity and get clicks — commonly using vague teasers ('You won't believe what happened next'), exaggeration, or withholding key information to force someone to click just to find out what's being talked about, often at the expense of accurately representing the actual content. The key difference: every clickbait title IS a headline, but not every headline is clickbait — a headline becomes 'clickbait' specifically when it prioritizes manipulative curiosity-baiting over honestly summarizing the content.",
  ),
  k(
    'kb-gap-tech-bot-vs-troll',
    'Bot vs troll',
    ['bot', 'troll', 'difference bot troll'],
    "A bot is an automated computer program that performs actions based on programmed rules or commands, without a real person actively controlling it in the moment — like a Discord bot that plays music when commanded, or an automated account that posts on a schedule; bots can be helpful (like Carl-bot or Dyno) or malicious (spam bots), but the defining trait is automation, not intent. A troll is a real HUMAN who deliberately posts inflammatory, provocative, or off-topic content specifically to upset people, start arguments, or disrupt a conversation for their own amusement — trolling is about intentional human behavior aimed at provoking a reaction, not automation. The key difference: a bot is defined by being automated software (regardless of whether it's helpful or harmful), while a troll is defined by being a real person acting with deliberate intent to provoke or upset others.",
  ),
];
