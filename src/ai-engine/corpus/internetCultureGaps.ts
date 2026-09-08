import { KnowledgeItem } from '../../types';

// Batch 24 (internet culture & memes) gap-fills. This category scored well
// (~20/25); the misses: "what does it mean to go viral" -> web dump ("list of
// viral videos... 6-7 is an Internet meme"); "psyop joke" -> a serious lecture
// on disinformation campaigns, missing that it's an ironic joke format.
export const INTERNET_CULTURE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-go-viral',
    title: 'What It Means to Go Viral',
    category: 'Internet Culture',
    keywords: [
      'what does it mean to go viral', 'what is going viral', 'how does something go viral', 'why do things go viral',
      'what makes a video go viral', 'viral content meaning',
    ],
    content: `Something "goes viral" when it spreads extremely fast and widely across the internet as people share it with each other, the way a virus spreads through a population — each person who sees it passes it to several more, so the audience grows exponentially in hours or days rather than gradually. It usually applies to a video, image, post, tweet, sound or meme. Content tends to go viral when it triggers a strong quick emotion (funny, shocking, heart-warming, enraging, awe), is easy to share and remix, is short, and lands with a group that's primed to pass it on; platform recommendation algorithms (TikTok's "For You" page especially) amplify anything getting fast early engagement. Going viral can bring sudden fame, money or backlash, and most viral content fades from attention just as quickly as it rose.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psyop-joke',
    title: '"Psyop" as an Internet Joke',
    category: 'Internet Culture',
    keywords: [
      'what does it mean when something is a psyop joke', 'why do people call things a psyop', 'psyop meme meaning',
      'calling something a psyop joke', 'this is a psyop meaning', 'psyop as slang',
    ],
    content: `"Psyop" literally means psychological operation — a real military/intelligence term for efforts to influence a target audience's beliefs and behaviour. Online, though, calling something "a psyop" is almost always a JOKE. People ironically accuse some trivial, annoying or baffling thing — a song they can't escape, a fashion trend, a weird meme, a food, a celebrity's popularity — of being a deliberate covert operation designed to manipulate the public, precisely because that's an absurd overreaction. It's a bit like sarcastically saying "this was manufactured in a lab to torment me." Sometimes it's a mock-conspiratorial way of saying "I refuse to believe people genuinely like this on their own." The humour comes from applying deadly-serious spy language to something that obviously isn't a plot. (A minority use it semi-seriously about actual coordinated marketing or bot campaigns.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lurking',
    title: 'What Lurking Online Means',
    category: 'Internet Culture',
    keywords: [
      'what is lurking online', 'what does lurking mean', 'what is a lurker', 'is lurking bad', 'lurk more meaning',
      'what does it mean to lurk on a forum',
    ],
    content: `Lurking is reading or watching an online community — a forum, subreddit, Discord server, comment section, livestream chat — without posting or otherwise participating. Someone who does this is a "lurker." It is completely normal and extremely common: on most platforms the large majority of users are lurkers ("the 1% rule" — roughly 1% create content, 9% comment, 90% just consume). People lurk to learn how a community works before joining in, to stay informed, to enjoy something without the effort or risk of posting, or just out of shyness. The old forum advice "lurk more" (or "lurk moar") means: hang around and get a feel for the norms before you post, so you don't embarrass yourself. It only has a negative sense when it implies watching someone specifically without their knowledge.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-streisand-effect',
    title: 'The Streisand Effect',
    category: 'Internet Culture',
    keywords: [
      'what is the streisand effect', 'streisand effect meaning', 'streisand effect origin', 'why is it called the streisand effect',
      'when trying to hide something backfires', 'examples of the streisand effect',
    ],
    content: `The Streisand effect is when an attempt to hide, remove or censor a piece of information ends up drawing far more attention to it than it would ever have gotten otherwise. It's named after singer Barbra Streisand, who in 2003 sued a photographer for $50 million over an aerial photo of her Malibu house that was part of a public coastal-erosion survey. The lawsuit made the once-obscure photo headline news — it had been downloaded only six times (twice by her own lawyers) before the suit, and hundreds of thousands of times in the month after. The lesson: on the internet, trying to suppress something often guarantees it spreads, because the censorship attempt is itself newsworthy and provokes people to copy and mirror the material out of defiance.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brainrot',
    title: 'What "Brainrot" Means',
    category: 'Internet Culture',
    keywords: [
      'what is brainrot', 'what does brainrot mean', 'brain rot meaning', 'brainrot slang', 'brainrot words',
      'what is brainrot content', 'why is it called brainrot',
    ],
    content: `"Brainrot" (Oxford's 2024 Word of the Year) has two related uses. As a description of media: low-effort, hyper-stimulating, often absurd internet content — endless short-form video, meme compilations, AI slop — that is addictive to scroll but leaves you feeling mentally foggy and drained, as if it's rotting your brain. As a description of a person or their speech: someone so soaked in that content that they can only communicate in the latest meme references and slang ("Skibidi," "gyatt," "only in Ohio," "Italian brainrot" characters), often unintelligibly to anyone outside the trend. It's used self-deprecatingly ("sorry, brainrot") and as a mild insult. The term itself is older — Thoreau used "brain-rot" in Walden in 1854 — but the internet meaning took off around 2023–2024, largely aimed at Gen Alpha.`,
    createdAt: Date.now(),
  },
];
