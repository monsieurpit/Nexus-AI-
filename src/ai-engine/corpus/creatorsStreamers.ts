import { KnowledgeItem } from '../../types';

// Batch 2026-09-29 — the creators a young Discord server actually references. Coverage probe found
// zero dedicated titles for MrBeast, IShowSpeed or Kai Cenat. Kept to well-established facts;
// follower/subscriber counts change constantly, so they're given as rough orders of magnitude.
export const CREATORS_STREAMERS: KnowledgeItem[] = [
  {
    id: 'kb-creator-mrbeast',
    title: 'MrBeast (Jimmy Donaldson)',
    category: 'Entertainment',
    keywords: ['mrbeast', 'mr beast', 'jimmy donaldson', 'mrbeast youtube', 'beast games', 'feastables', 'most subscribed youtuber', 'mrbeast burger'],
    content: `MrBeast is the online name of Jimmy Donaldson (born May 7, 1998, in Kansas; raised in Greenville, North Carolina), the most-subscribed individual creator on YouTube — his main channel passed T-Series in 2024 to become the most-subscribed channel of all, with hundreds of millions of subscribers. He started as a teenager and broke through in 2017 with a video of himself counting to 100,000. His style is huge-budget stunts and giveaways: "Last to Leave" challenges, recreating Squid Game with real contestants for a $456,000 prize, giving away cars, houses and islands, and philanthropy projects like #TeamTrees and funding cataract surgeries. He runs businesses including Feastables (chocolate), Lunchly and MrBeast Burger, and his Amazon Prime show Beast Games (2024) offered a record $5 million prize. He has faced criticism over contestant treatment and working conditions in his productions.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-creator-ishowspeed',
    title: 'IShowSpeed (Speed)',
    category: 'Entertainment',
    keywords: ['ishowspeed', 'speed', 'i show speed', 'darren watkins', 'speed ronaldo', 'siuu', 'speed tour', 'speed streamer'],
    content: `IShowSpeed, or just "Speed," is Darren Watkins Jr. (born January 21, 2005, in Cincinnati, Ohio), one of the biggest live streamers in the world, streaming mainly on YouTube. He's known for loud, chaotic, high-energy reactions — barking, backflips, rage moments — and for his obsession with Cristiano Ronaldo, whose "SIUUU" celebration he copies constantly (he finally met Ronaldo in 2024). He started with gaming (FIFA, NBA 2K, Fortnite) and blew up in 2021-22 with clips on TikTok. In 2024-25 he became famous for IRL world tours — streaming live through Europe, Asia, Africa, Australia and South America, drawing huge crowds — which turned him into a global celebrity. He also released music ("World Cup", 2022) and played in charity football matches.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-creator-kai-cenat',
    title: 'Kai Cenat and Twitch Subathons',
    category: 'Entertainment',
    keywords: ['kai cenat', 'kai', 'kai cenat twitch', 'mafiathon', 'subathon', 'most subscribed twitch', 'amp', 'any means possible'],
    content: `Kai Cenat (born December 16, 2001, in New York City) is one of Twitch's biggest streamers and a member of the YouTube group AMP (Any Means Possible). He's famous for "subathons" — month-long nonstop streams where each new subscription adds time — especially the "Mafiathon" series: the first (February 2023) set the record for the most simultaneous Twitch subscribers, Mafiathon 2 (late 2024) broke it, and Mafiathon 3 (2025) broke it again, pushing into the high hundreds of thousands to around a million subs. His streams feature celebrity guests, IRL challenges and chaotic reactions. In 2023 a giveaway he announced in Manhattan's Union Square drew a crowd so large it turned into a riot, and he faced charges that were later resolved. He has won Streamer of the Year at The Streamer Awards.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-creator-streaming-platforms',
    title: 'Twitch vs YouTube vs Kick: Streaming Platforms',
    category: 'Entertainment',
    keywords: ['twitch', 'kick', 'kick streaming', 'twitch vs youtube', 'twitch vs kick', 'streaming platforms', 'twitch subs', 'streamer platforms', 'how streamers make money'],
    content: `The main live-streaming platforms are Twitch, YouTube and Kick. Twitch (owned by Amazon since 2014) built the modern streaming culture — gaming streams, emotes, raids, subscriptions and "Just Chatting" — and streamers earn from subs (split with Twitch), Bits (tips), ads and sponsorships. YouTube combines live streams with on-demand videos and Shorts, and is where many big creators like IShowSpeed stream. Kick, launched in 2022 and linked to the gambling site Stake, lured big names (xQc, Adin Ross, Amouranth) with huge contracts and a 95/5 subscription split in the streamer's favour, but it's controversial for its lax moderation and gambling content. Streamers typically earn most money not from subs but from sponsorships, merch and brand deals.`,
    createdAt: Date.now(),
  },
];
