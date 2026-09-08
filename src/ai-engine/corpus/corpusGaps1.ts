import { KnowledgeItem } from '../../types';

// Gap-fill entries added after batched factual testing of the live model turned up specific
// misses (see git history for the batches). Each is deliberately narrow and keyword-dense so it
// wins retrieval for the exact question that missed.
export const CORPUS_GAPS_1: KnowledgeItem[] = [
  {
    id: 'kb-gap-film-noir',
    title: 'What Film Noir Is',
    category: 'Film',
    keywords: [
      'film noir', 'what is film noir', 'noir film', 'noir movies', 'define film noir',
      'neo-noir', 'femme fatale', 'hardboiled detective movie',
    ],
    content: `Film noir is a style and mood of American crime cinema at its peak from roughly 1940 to 1958 (classic examples: The Maltese Falcon, Double Indemnity, The Big Sleep, Out of the Past, Sunset Boulevard, Touch of Evil). It is defined by cynical, morally compromised characters, a bleak or fatalistic tone, crime and corruption plots often centred on a hardboiled private detective or an ordinary man dragged into trouble, and a "femme fatale" — a dangerous, alluring woman. Visually it uses stark high-contrast black-and-white photography, deep shadows, night-time city streets, venetian-blind lighting, unusual camera angles, and voice-over narration and flashbacks. It grew out of hardboiled crime fiction (Raymond Chandler, Dashiell Hammett, James M. Cain) and German Expressionist visual style brought to Hollywood by émigré directors. It is NOT gothic fiction or magical realism — those are literary genres about crumbling castles / everyday magic, unrelated to noir. Later crime films in the same spirit (Chinatown, Blade Runner, L.A. Confidential, Se7en) are called neo-noir.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-oscar-best-picture-winners',
    title: 'Academy Award Best Picture Winners (Recent Years)',
    category: 'Film',
    keywords: [
      'best picture', 'oscar best picture', 'academy award best picture', 'what won best picture',
      'best picture winner', 'best picture 2019', 'best picture 2020', 'best picture 2021',
      'best picture 2022', 'best picture 2023', 'best picture 2024', 'best picture 2025', 'oscar winner best picture',
    ],
    content: `Academy Award for Best Picture — recent winners (the ceremony year honours films released the previous calendar year):
- 2025 ceremony (2024 films): Anora, directed by Sean Baker (which also won him Best Director, Best Original Screenplay and Best Film Editing).
- 2024 ceremony (2023 films): Oppenheimer, directed by Christopher Nolan.
- 2023 ceremony (2022 films): Everything Everywhere All at Once.
- 2022 ceremony (2021 films): CODA.
- 2021 ceremony (2020 films): Nomadland, directed by Chloé Zhao.
- 2020 ceremony (2019 films): Parasite, directed by Bong Joon-ho — the first non-English-language film ever to win Best Picture.
- 2019 ceremony (2018 films): Green Book.
- 2018 ceremony (2017 films): The Shape of Water.
- 2017 ceremony (2016 films): Moonlight (famously announced after La La Land was read out by mistake).
So "what won Best Picture in 2020" most often means Parasite (the 2020 ceremony); if someone means films from the year 2020, that is Nomadland.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-most-streamed-song',
    title: 'Most-Streamed Songs and Spotify Records',
    category: 'Music',
    keywords: [
      'most streamed song', 'most streamed song of all time', 'most streamed song on spotify',
      'biggest song on spotify', 'most played song', 'spotify record', 'most streamed artist',
    ],
    content: `The most-streamed song of all time on Spotify is "Blinding Lights" by The Weeknd (2019), which passed 4 billion streams — the first song to do so — and topped Spotify's own "most-streamed songs" list. Other songs very high on the all-time list include "Shape of You" by Ed Sheeran, "Someone You Loved" by Lewis Capaldi, "As It Was" by Harry Styles, "Sunflower" by Post Malone & Swae Lee, and "Starboy" by The Weeknd. ("Old Town Road" by Lil Nas X set the record for most weeks at #1 on the US Billboard Hot 100 — 19 weeks — but is not the most-streamed song.) These streaming totals keep climbing, so exact figures date quickly; Blinding Lights has held the overall Spotify record since about 2021.`,
    createdAt: Date.now(),
  },
];
