import { KnowledgeItem } from '../../types';

export const FAMOUS_PAINTINGS_DEEP_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-paintings-mona-lisa',
    title: 'The Mona Lisa: History and Why It\'s So Famous',
    category: 'culture',
    keywords: ['why is the mona lisa famous', 'mona lisa da vinci', 'mona lisa theft 1911', 'mona lisa smile'],
    content: `The **Mona Lisa**, painted by Leonardo da Vinci around 1503-1519, is arguably the most famous painting in the world, housed at the Louvre Museum in Paris, where it draws enormous crowds daily. Its subject is generally believed to be Lisa Gherardini, wife of a Florentine silk merchant, though her identity was debated for centuries. Part of the painting's renown stems from Leonardo's technical mastery, particularly his pioneering use of "sfumato" — a subtle blending technique creating soft, smoky transitions between colors and tones rather than harsh outlines, giving the subject's famously ambiguous smile and expression a lifelike, almost shifting quality that seems to change depending on the angle it's viewed from. But much of its modern fame is arguably as much about history and mystique as pure artistic merit: the painting became a global sensation largely after it was dramatically **stolen from the Louvre in 1911** by an Italian handyman who had briefly worked there and believed (incorrectly) it rightfully belonged in Italy; the theft made international headlines, and the painting's recovery two years later (found in Florence) cemented its status as an object of global fascination. The painting is now protected behind bulletproof glass, both due to its immense value and following past incidents of vandalism, and it remains a frequent subject of parody, reproduction, and scholarly analysis, further reinforcing its status as visual art's most universally recognized single image.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-paintings-starry-night-guernica',
    title: 'The Starry Night and Guernica: Two Landmark Paintings',
    category: 'culture',
    keywords: ['van gogh starry night meaning', 'picasso guernica meaning', 'famous expressionist paintings', 'anti-war art'],
    content: `**The Starry Night**, painted by Vincent van Gogh in 1889, depicts a swirling, emotionally intense night sky over a quiet village, painted from memory while van Gogh was voluntarily staying at a mental health asylum in Saint-Rémy, France, following a severe personal crisis (including the infamous incident where he cut off part of his own ear). The painting is considered a landmark of Post-Impressionism, using bold, expressive brushwork and exaggerated, almost hallucinatory color and movement rather than realistic depiction, to convey inner emotional and psychological experience rather than simply record an accurate scene — an approach hugely influential on the later Expressionist art movement. Van Gogh sold almost no paintings during his lifetime and died largely unrecognized in 1890, making his posthumous rise to being one of history's most celebrated and valuable artists a particularly striking case of delayed artistic recognition. **Guernica**, painted by Pablo Picasso in 1937, is a massive, stark black-and-white-and-gray painting created in direct response to the bombing of the Basque town of Guernica, Spain, by Nazi German and Italian fascist warplanes supporting Francisco Franco's forces during the Spanish Civil War — one of history's first deliberate aerial bombings of a civilian population center. Rendered in Picasso's fragmented Cubist style, the painting depicts anguished human and animal figures amid chaos and suffering, and it has become one of the most powerful and enduring anti-war artworks ever created, still widely referenced as a symbol of the horror of war and violence against civilians.`,
    createdAt: Date.now(),
  },
];
