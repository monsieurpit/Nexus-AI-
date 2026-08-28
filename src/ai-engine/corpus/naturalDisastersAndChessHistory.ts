import { KnowledgeItem } from '../../types';

export const NATURAL_DISASTERS_AND_CHESS_HISTORY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-disasters-wildfires',
    title: 'How Wildfires Start and Spread',
    category: 'Environment',
    keywords: ['what causes wildfires', 'how do wildfires spread', 'human caused vs natural wildfires', 'wildfire season climate change'],
    content: `**Wildfires** require three basic ingredients, often called the "fire triangle": fuel (dry vegetation, dead trees, brush), oxygen (readily available in open air), and a heat source sufficient to ignite that fuel. Natural ignition sources include lightning strikes, but the large majority of wildfires — some studies suggest over 80% in the U.S. — are actually human-caused, whether through unattended campfires, discarded cigarettes, faulty power line equipment, arson, or agricultural burning that escapes control. Once ignited, a fire's spread and intensity depend heavily on fuel dryness and density, wind (which can carry embers well ahead of the main fire front, igniting new spot fires), and terrain (fire spreads faster uphill, since rising heat preheats and dries fuel further up a slope before flames even reach it). Wildfires have become more frequent, larger, and more intense in many regions over recent decades, a trend widely linked by climate scientists to rising temperatures and more prolonged droughts drying out vegetation further, extending fire seasons and creating conditions for faster, larger, harder-to-control fires. While wildfires are often framed purely as destructive, many ecosystems — including some pine forests and grasslands — have evolved to depend on periodic natural fire for healthy regeneration (some pinecones only release their seeds after fire exposure), and decades of aggressive fire suppression policy in some regions inadvertently allowed dangerous fuel buildup, an issue land management agencies increasingly address today through controlled, deliberately set "prescribed burns" to reduce future wildfire risk.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-games-chess-history',
    title: 'The History of Chess',
    category: 'culture',
    keywords: ['history of chess', 'where did chess originate', 'chess origin india', 'oldest board game'],
    content: `**Chess** is generally believed to have originated in northern India around the 6th century CE, under the name "chaturanga," a game whose pieces represented four divisions of an ancient Indian army — infantry, cavalry, elephants, and chariots — which evolved over subsequent centuries into the modern pawn, knight, bishop, and rook. The game spread to Persia (where it was known as "shatranj") and, following the Islamic conquest of Persia, further across the Muslim world and into Europe by around the 9th-10th centuries, undergoing continued rule changes along the way. Several of the game's most powerful modern moves emerged in Europe during the 15th century, notably giving the queen — originally a much weaker piece, able to move only one square diagonally — the sweeping, powerful movement across any number of squares that makes her the most powerful piece on the board today, a change so significant it's sometimes called the birth of "modern chess." Chess has since become one of the most widely played and rigorously studied strategy games in the world, home to a rich tradition of formal competition (the World Chess Championship has been contested since 1886) and a landmark moment in artificial intelligence history when IBM's computer Deep Blue defeated reigning World Champion Garry Kasparov in 1997, marking one of the first major public demonstrations of a computer defeating a human world champion at a complex strategic game.`,
    createdAt: Date.now(),
  },
];
