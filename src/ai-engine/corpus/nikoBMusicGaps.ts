import { KnowledgeItem } from '../../types';

/**
 * NIKO_B_MUSIC_GAPS — Patrick asked (Sept 2026) that Nexus know Niko B's song
 * "Why's this dealer?". Nexus's default voice is British, so knowing Niko B —
 * a deadpan small-town-England rapper — fits the persona. Researched from
 * Wikipedia, Apple Music/Spotify, and lyric/analysis sites.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'music', keywords, content, createdAt: now,
});

export const NIKO_B_MUSIC_GAPS: KnowledgeItem[] = [
  k(
    'kb-nikob-whys-this-dealer',
    'Niko B — "Why\'s this dealer?"',
    [
      'whys this dealer niko b', "why's this dealer taking the piss", 'niko b song about waiting for a dealer', 'pets at home car park',
      'niko b 2024 single', 'why is this dealer taking the piss niko b lyrics', 'god of war dealer song', 'small town britain rap',
    ],
    `"Why's this dealer?" (full hook: "why's this dealer taking the piss?") is a 2024 single by Niko B, the English rapper from Newport Pagnell known for his flat Buckinghamshire deadpan and hyper-specific "small-town Britain" storytelling (his breakout was "Who's That What's That", and "Mary Berry" / "Mary Berry Lookalike").

The whole song is just Niko B stuck waiting on a weed dealer who won't show — standing in the rain outside a Pets at Home car park while the dealer takes his time (the bit people quote: the dealer's apparently sat at home playing God of War instead of coming out). "Taking the piss" is British slang for messing someone about / wasting their time. It turns a mundane, low-stakes grievance — being left waiting by someone you need to see — into a weirdly relatable little anthem, which is Niko B's whole thing. Short track, about two minutes, very online, big on TikTok.`,
  ),
  k(
    'kb-nikob-who-is',
    'Who is Niko B',
    [
      'who is niko b', 'niko b rapper', 'tom george austin', 'newport pagnell buckinghamshire rapper', 'whos that whats that',
      'mary berry lookalike song', 'deadpan british rap milton keynes', 'niko b tiktok',
    ],
    `Niko B (real name Tom George Austin, born 1999) is an English rapper, songwriter and former YouTuber from Newport Pagnell, near Milton Keynes. His style is deadpan, monotone delivery over light, melodic beats, with lyrics that narrate very ordinary English suburban life in oddly specific detail. He blew up in 2020 with "Who's That What's That" after it went viral on TikTok, and has kept a run of comedic, low-key hits including "Mary Berry Lookalike", "Wish", "Gangsta" and, in 2024, "Why's this dealer?". The joke and the appeal are the same thing: he raps about car parks, Greggs, exes and dealers with total seriousness.`,
  ),
];
