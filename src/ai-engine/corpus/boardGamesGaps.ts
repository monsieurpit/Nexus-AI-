import { KnowledgeItem } from '../../types';

// Batch 125 (board games & tabletop games). Wrong-domain and wrong answers on
// nexus-4b: "how did tabletop RPGs begin" -> "started with stuff like
// Undertale"; "what is Risk and how does it work" -> a lecture on medical risk
// (acetaminophen + NSAID, x-ray radiation); "Shogi vs Xiangqi vs chess" -> a
// paragraph about checkers being solved; "Elo rating" -> "named after Arthur
// Tyler Eulo who invented it in the 1880s"; "oldest known board game" -> "chess,
// 6th century India"; "mahjong" -> a flat refusal. Web dumps: Scrabble,
// playing-card history. Outdated: "the best Go programs still don't beat top
// players consistently."
export const BOARD_GAMES_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-bg-chess-origin',
    title: 'Where Chess Came From and How the Modern Rules Developed',
    category: 'Board Games',
    keywords: [
      'where did chess originate and how did the modern rules develop', 'chess descends from chaturanga a 6th century indian game four divisions of the army infantry cavalry elephants chariots became pawn knight bishop rook',
      'it spread to persia as shatranj check and checkmate come from persian shah mat the king is helpless and via the islamic conquests to europe by about 1000', 'in the late 15th century in spain and italy the queen and bishop got their modern long range moves briefly called mad queen chess pawns got the two square first move castling was added this is modern chess',
      'standardised rules and the first world championship steinitz came in 1886',
    ],
    content: `Chess descends from chaturanga, a game played in northern India by the 6th century AD. Its name means "four divisions" — infantry, cavalry, elephants, and chariots — which became the pawn, knight, bishop, and rook. The game passed to Persia, where it was called shatranj; the words "check" and "checkmate" come from the Persian "shāh māt," roughly "the king is helpless." After the Arab conquest of Persia, Muslim traders and armies carried it across the Islamic world and into Europe, where it was well established by around 1000 AD. For its first several centuries in Europe the rules were essentially those of shatranj, with a weak queen (moving one square diagonally) and a weak bishop. Then, in the late 15th century in Spain and Italy, a burst of rule changes produced "modern chess": the queen became the most powerful piece with unlimited straight and diagonal movement, the bishop got its long diagonal move, pawns gained the option of a two-square first step (and with it en passant), and castling was introduced. Contemporaries called the faster, more violent new game "mad queen chess" (scacchi alla rabiosa). Rules were finally fully standardised internationally in the 19th century, and Wilhelm Steinitz is recognised as the first official World Chess Champion in 1886.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-go-ai',
    title: 'The Game of Go and Why It Was Hard for Computers',
    category: 'Board Games',
    keywords: [
      'what is the game of go and why is it considered harder for computers than chess', 'go is a 2500 year old chinese game two players place black and white stones on the intersections of a 19 by 19 grid to surround territory and capture enemy groups',
      'it was hard for computers because there are about 250 legal moves per turn versus about 35 in chess and it is nearly impossible to write a good position evaluation function so brute force search does not work',
      'the breakthrough was deep neural networks plus monte carlo tree search plus self play reinforcement learning alphago beat lee sedol 4 to 1 in 2016 alphazero 2017 was superhuman and also mastered chess and shogi from scratch computers have been far stronger than any human since 2017',
    ],
    content: `Go is a board game that originated in China at least 2,500 years ago (called weiqi in China, baduk in Korea, igo in Japan). Two players alternately place black and white stones on the intersections of a 19×19 grid; stones that are completely surrounded are captured and removed, and the winner is whoever controls (surrounds) more of the board's territory at the end. For decades Go resisted the computer techniques that cracked chess. Two things made it hard: the branching factor — roughly 250 legal moves per position versus about 35 in chess — makes brute-force look-ahead search explode far faster; and, more fundamentally, it is extremely difficult to write a function that looks at a Go position and says who is winning, because value comes from subtle, long-range judgments about "influence," "thickness," and "shape" that don't reduce to counting material. The breakthrough came in 2015–2017 from DeepMind: combine a deep neural network that learns to evaluate positions and suggest moves, Monte Carlo tree search to look ahead selectively, and reinforcement learning by playing millions of games against itself. AlphaGo defeated the top human Lee Sedol 4–1 in March 2016; AlphaGo Zero (2017) learned entirely from self-play and surpassed all previous versions; and AlphaZero generalised the method to also master chess and shogi from nothing but the rules. Computer Go programs have been decisively stronger than the best human players since 2017.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-rpg-origins',
    title: 'How Dungeons & Dragons and Tabletop Roleplaying Games Began',
    category: 'Board Games',
    keywords: [
      'what is dungeons and dragons and how did tabletop roleplaying games begin', 'dungeons and dragons was created by gary gygax and dave arneson and published in 1974 it grew out of tabletop miniature wargaming specifically gygaxs medieval wargame chainmail 1971',
      'arneson added one player controlling one character rather than an army that character persisting and improving between sessions a referee the dungeon master narrating a world and adjudicating and exploration of a dungeon',
      'it invented the tabletop rpg genre spawned video game rpgs from rogue and wizardry to baldurs gate is on its 5th edition 2014 and had a huge resurgence critical role stranger things not undertale',
    ],
    content: `Dungeons & Dragons, the first tabletop roleplaying game, was created by Gary Gygax and Dave Arneson and published in 1974 by Gygax's tiny company TSR. It came directly out of tabletop wargaming — moving units of painted miniatures across a table by rules. Gygax had written a medieval-combat wargame called Chainmail (1971) with a small fantasy supplement (adding trolls, wizards, and dragons). Arneson, running his own campaign, made a series of key leaps: each player would control a SINGLE character rather than an army; that character would survive from session to session, gaining experience and growing more powerful; one person (the "Dungeon Master") would design and narrate an imaginary world, play all the monsters and non-player characters, and rule on what happened; and the players would explore a "dungeon," describing what their characters tried to do while the DM adjudicated with dice. Gygax and Arneson combined these ideas into D&D. It essentially invented the entire RPG genre — video-game RPGs from the early "Rogue" and "Wizardry" through "Baldur's Gate" and modern games all trace back to it — and after decades as a niche hobby it had a huge popular resurgence in the 2010s (5th Edition in 2014, the actual-play show "Critical Role," and its role in "Stranger Things"). (It has nothing to do with Undertale, a 2015 indie video game influenced by RPGs.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-risk',
    title: 'What the Board Game Risk Is and How It Works',
    category: 'Board Games',
    keywords: [
      'what is risk and how does it work board game', 'risk is a strategy board game of global military domination invented by the french filmmaker albert lamorisse in 1957 as la conquete du monde published by parker brothers in 1959',
      'the board is a world map of 42 territories in 6 continents players get armies place them and on their turn attack adjacent territories by rolling dice attacker up to 3 dice defender up to 2 highest dice compared defender wins ties',
      'holding whole continents grants bonus armies aim to eliminate opponents or complete a secret mission known for very long games luck swings and alliances not medical risk',
    ],
    content: `Risk is a classic strategy board game about conquering the world by force. It was invented by the French film director Albert Lamorisse in 1957 (originally "La Conquête du Monde," "The Conquest of the World") and published by Parker Brothers in 1959. The board is a stylised map of the world divided into 42 territories grouped into 6 continents. Each player commands coloured armies; on your turn you (1) place reinforcements — a number based on how many territories you hold, plus a bonus for controlling an entire continent, plus armies traded in from a set of cards; (2) attack: you may attack any territory adjacent to one of yours, rolling up to 3 dice as attacker against up to 2 as defender, matching highest die to highest, next to next, with the defender winning ties — each loss removes one army; and (3) fortify: move armies between two connected friendly territories once. The goal is either to eliminate all opponents (in the classic game) or to be the first to complete a secret objective card (in the "mission" version). Risk is famous for games that run for hours, dramatic dice-luck swings, and shifting table alliances and betrayals. (This is the board game — it is unrelated to "risk" in the sense of medical or statistical hazard.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-shogi-xiangqi-chess',
    title: 'Shogi vs Xiangqi vs Western Chess',
    category: 'Board Games',
    keywords: [
      'what is the difference between shogi and xiangqi and western chess', 'all three descend from the same indian chaturanga ancestor',
      'western chess 8 by 8 captured pieces are removed permanently the queen is the strongest piece xiangqi chinese chess played on the intersections of a 9 by 10 grid with a river and a palace cannons capture by jumping over one piece the general cannot leave the palace and the two generals cannot face each other on an open file',
      'shogi japanese chess 9 by 9 the defining rule is that captured pieces switch sides and can be dropped back onto the board as your own so material never leaves play and the game almost never draws many pieces promote in the far ranks shogi was the last of the three for ai to master',
    ],
    content: `Chess, Chinese chess, and Japanese chess all descend from the same 6th-century Indian ancestor, chaturanga, but evolved very differently. WESTERN CHESS: an 8×8 board; captured pieces are gone for good; the queen is a devastatingly powerful long-range piece; draws are common at high level. XIANGQI (Chinese chess): pieces sit on the intersections of a 9×10 grid; a "river" across the middle limits some pieces, and each side has a 3×3 "palace" the general and its two guards can never leave; the general also can't stand on an open file directly facing the enemy general. Its signature piece is the cannon, which moves like a rook but can only CAPTURE by jumping over exactly one intervening piece. Captured pieces are removed. SHOGI (Japanese chess): a 9×9 board, and its defining and unique rule is that when you capture an enemy piece you keep it "in hand" and may, on a later turn instead of a normal move, DROP it onto almost any empty square as one of YOUR pieces. This means material almost never permanently leaves the board, attacks can come from anywhere, and draws are extremely rare (under 2% of games). Many shogi pieces also "promote" (flip to a stronger side) when they reach the far three ranks. The drop rule makes shogi's game tree far larger than chess's, and it was the last of the three to fall to computers — AlphaZero mastered it (along with chess and Go) in 2017.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-elo-notation',
    title: 'Chess Notation and the Elo Rating System',
    category: 'Board Games',
    keywords: [
      'what is chess notation and the elo rating system', 'algebraic notation the modern standard writes each move as the piece initial k q r b n nothing for a pawn plus the destination square files a to h ranks 1 to 8 with x for a capture plus for check hash for mate o-o and o-o-o for castling',
      'the elo rating system is named after arpad elo a hungarian american physics professor who devised it for the us chess federation adopted by fide in 1970 not arthur eulo and not the 1880s',
      'it models each players strength as a number the expected score depends only on the rating difference a 400 point gap is about a 10 to 1 favourite you gain or lose points based on result versus expectation scaled by a k factor now used in go tennis esports and online matchmaking as elo or mmr',
    ],
    content: `CHESS NOTATION: the modern international standard is algebraic notation. The board's columns (files) are lettered a–h from White's left, the rows (ranks) numbered 1–8 from White's side. Each move is written as the moving piece's initial — K (king), Q (queen), R (rook), B (bishop), N (knight), and nothing at all for a pawn — followed by the destination square: so "e4" is a pawn to e4, "Nf3" is a knight to f3. Extra symbols: "x" for a capture (Bxc6), "+" for check, "#" for checkmate, "O-O" for kingside castling and "O-O-O" for queenside, "=Q" for a pawn promoting. When two identical pieces could go to the same square, the file or rank of origin is added (Nbd2). The ELO RATING SYSTEM is named after Arpad ELO (1903–1992), a Hungarian-born American physics professor and strong amateur player, who designed it for the United States Chess Federation in the 1950s–60s; FIDE, the world chess body, adopted it in 1970. It assigns each player a number representing strength; the model says the EXPECTED score of a game depends only on the difference between the two ratings (a gap of ~400 points makes the higher-rated player about a 10:1 favourite). After each game you gain or lose points equal to (your actual score minus your expected score) times a "K-factor" that controls volatility. The system has spread far beyond chess — it is used for Go, Scrabble, tennis and football rankings, and it is the basis of the "Elo" or "MMR" matchmaking numbers in competitive video games.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-monopoly-origin',
    title: 'The Real Origin of Monopoly and The Landlord\'s Game',
    category: 'Board Games',
    keywords: [
      'what is the real origin of monopoly and the landlords game', 'lizzie magie an american progressive designed the landlords game and patented it in 1904 as an anti monopolist teaching tool based on henry georges land value tax it was meant to show how rent enriches landlords and impoverishes everyone else',
      'the game spread as a folk game for decades charles todd taught a version to charles darrow who redrew the board with atlantic city street names claimed he had invented it himself and sold it to parker brothers in 1935',
      'parker brothers bought magies patent for 500 dollars and printed two of her other games which flopped darrow became rich and was credited as sole inventor for decades',
    ],
    content: `Monopoly was not invented by Charles Darrow, the man Parker Brothers credited for 50 years. It descends from "The Landlord's Game," designed by Elizabeth "Lizzie" Magie, an American writer, feminist, and follower of the economist Henry George. She patented it in 1904 as a piece of political education: George argued that land is a common resource and that the "unearned" rise in land value should be taxed away, and Magie built a game to demonstrate how, under the existing system, landlords grow rich collecting rent while tenants are gradually ruined — the game was meant to make players FEEL the injustice of monopoly. (She designed two rule sets: a "monopolist" version where one player bankrupts the rest, and an "anti-monopolist" version where wealth is shared.) The game circulated for about three decades as a hand-made folk game among Quakers, university economics students, and left-wing groups, evolving as it went. In the early 1930s a man named Charles Todd taught a version — by then using Atlantic City street names — to his neighbour Charles Darrow. Darrow tidied up the board, had it illustrated, claimed to have invented the whole thing, and in 1935 sold it to Parker Brothers, who marketed it as a rags-to-riches Depression success story. To secure the rights, Parker Brothers also bought Magie's original patent for $500 (no royalties) and published two of her other games, which flopped. Darrow became a millionaire; Magie's role was buried until researchers and a 1970s lawsuit brought it back to light.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-eurogame-ameritrash',
    title: 'Eurogames vs Ameritrash (Thematic) Board Games',
    category: 'Board Games',
    keywords: [
      'what is the difference between eurogames and ameritrash board games', 'eurogames emphasise strategy resource management and engine building with low luck low direct player conflict indirect competition abstract or pasted on theme no player elimination and often a points salad ending catan ticket to ride carcassonne puerto rico agricola wingspan',
      'ameritrash or thematic games emphasise a strong theme and story high luck via dice and card draws direct combat and take that attacks miniatures player elimination and dramatic swings twilight imperium risk axis and allies cosmic encounter blood rage nemesis zombicide',
      'many modern hits deliberately blend both dominion is a eurogame not ameritrash',
    ],
    content: `"Eurogame" and "Ameritrash" (now more politely "thematic") are the two rough poles of hobby board-game design. EUROGAMES, associated with German designers, prize elegant mechanics over story: you manage resources, build an "engine," and optimise your position, luck is limited (or mitigated), and players compete INDIRECTLY — you can't attack or eliminate each other, you just try to be more efficient. The theme is often thin or "pasted on." Everyone plays to the end and the winner is decided by a points count. Examples: Catan, Ticket to Ride, Carcassonne, Puerto Rico, Agricola, Terraforming Mars, Wingspan, Dominion. AMERITRASH / THEMATIC games prize experience and drama: a strong, integrated theme and narrative, lots of dice-rolling and card-drawing, direct player conflict — armies fighting, "take that" cards, kingmaking — often lavish miniatures and components, player elimination, and big swings of fortune. The point is the story and the moments, even if you lose. Examples: Twilight Imperium, Risk, Axis & Allies, Cosmic Encounter, Blood Rage, Nemesis, Zombicide, Dead of Winter. The line is blurry and many acclaimed modern games (Scythe, Root, Spirit Island) deliberately combine tight Euro systems with a rich theme and player interaction.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-catan',
    title: 'What Settlers of Catan Is and Why It Mattered',
    category: 'Board Games',
    keywords: [
      'what is settlers of catan and why was it so influential', 'a 1995 board game by the german designer klaus teuber players build settlements roads and cities on a modular hex island collecting five resources wood brick sheep wheat and ore',
      'each turn two dice are rolled and hexes with that number produce resources for adjacent buildings players trade resources negotiate and the robber blocks a hex first to 10 victory points wins',
      'it was the game that broke german style designer board games into the mainstream especially north america sold over 40 million copies and launched the modern hobby board game boom not set in a real place and not really an engine builder',
    ],
    content: `Settlers of Catan (now just "Catan") is a board game designed by Klaus Teuber and published in Germany in 1995. Players compete to develop a modular island built from hexagonal tiles — there is no real-world location; "Catan" is fictional. Each hex produces one of five resources (wood, brick, sheep/wool, wheat, ore). On your turn you roll two dice; every hex bearing that number produces its resource for each settlement or city touching it, so production is shared and probabilistic. You spend resources to build roads, new settlements, and cities, and to buy development cards, racing to 10 "victory points." The core of the game is trading and negotiation — you almost never have exactly the resources you need, so you must deal with opponents ("I'll give you two sheep for an ore"), while the "robber" (moved when a 7 is rolled) blocks a hex and steals a card. Catan mattered enormously as the game that carried German-style designer board games — with their focus on clever mechanics, constant player involvement, no elimination, and a 60–90 minute playtime — out of a hobby niche and into the mainstream, especially in North America. It has sold over 40 million copies in dozens of languages and is generally credited with kicking off the modern boom in "hobby" board gaming.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-mahjong',
    title: 'What Mahjong Is and How It Is Played',
    category: 'Board Games',
    keywords: [
      'what is mahjong and how is it played', 'a tile based game for four players developed in 19th century qing dynasty china played with 144 tiles three number suits bamboo characters and circles 1 to 9 four of each plus honour tiles four winds and three dragons and often bonus flower and season tiles',
      'play is like rummy on your turn you draw a tile and discard one you can claim another players discard to complete a set pung three of a kind kong four of a kind chow a run of three in one suit',
      'you win by forming a complete hand of four sets plus a pair many regional rule systems hong kong japanese riichi taiwanese american the single player tile matching computer game mahjong solitaire is a completely different unrelated game',
    ],
    content: `Mahjong is a tile game for four players, developed in southern China in the mid-19th century (Qing dynasty). A set has 144 tiles: three "simple" suits — bamboo (sticks), characters ("wan"), and circles (dots) — each numbered 1 to 9 with four copies of each; the "honour" tiles, four winds (East, South, West, North) and three dragons (red, green, white); and usually eight "bonus" tiles (four flowers, four seasons). Gameplay resembles the card game rummy. Each player starts with 13 tiles. On your turn you draw a tile (from the "wall") and then discard one face-up. Crucially, you may also interrupt the turn order to CLAIM another player's discard if it completes a set for you: a "pung" (three identical tiles), a "kong" (four identical), or a "chow" (a run of three consecutive numbers in one suit, claimable only from the player to your left). You WIN — declare "mahjong" — when your hand forms four sets plus one pair, and scoring depends on how the hand was made (concealed hands, all one suit, all honours, and many named patterns score more). There are many incompatible regional rule sets — Hong Kong (the most common internationally), Japanese Riichi (with its rich scoring and "riichi" bet), Taiwanese (16-tile hands), and American (with a printed "card" of legal hands and a tile-passing "Charleston"). The solitaire tile-matching video game often called "Mahjong" (or "Shanghai") is a completely separate game that merely borrows the tiles.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-playing-cards',
    title: 'The History of Playing Cards and the Four Suits',
    category: 'Board Games',
    keywords: [
      'what is the history of playing cards and the four suits', 'playing cards originated in tang or song dynasty china around the 9th to 11th century spread to the mamluk sultanate of egypt by the 14th century the mamluk deck had four suits cups coins swords and polo sticks and non figurative court cards due to islamic aniconism',
      'cards reached europe via italy and spain around 1370 latin suits cups coins swords batons german suits hearts bells acorns leaves',
      'the french suits around 1480 hearts diamonds clubs spades used just two colours and simple stencil shapes so they became cheap to print and are now the international standard the 52 cards equals weeks theory is a modern coincidence',
    ],
    content: `Playing cards were invented in China during the Tang or Song dynasty (roughly the 9th–11th century), growing out of paper dominoes and money-card games. Cards spread west along trade routes and are clearly recorded in the Mamluk Sultanate of Egypt by the 14th century; a nearly complete Mamluk deck survives, with four suits — cups, coins, swords, and polo-sticks — and three non-figurative court cards per suit (Islamic prohibition on images meant the "kings" were just ornate inscriptions). From there cards reached Europe through Italy and Spain around 1370. The Italian and Spanish decks kept "Latin" suits: cups, coins, swords, and batons/clubs (which is why English still calls the suit "clubs" even though the French symbol is a clover). German decks used hearts, bells, acorns, and leaves. The suits we use worldwide today are the FRENCH suits, developed around 1480: cœurs (hearts), carreaux (paving tiles → "diamonds"), trèfles (clovers → "clubs"), and piques (pike-heads → "spades"). Their advantage was practical — only two colours and four very simple silhouettes, so they could be mass-produced with cheap stencils, and they spread with France's printing trade. The popular claim that a 52-card deck encodes the calendar (52 weeks, 4 suits = seasons, 13 cards = lunar months, pips summing to about 365) is a modern coincidence, not the design intent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-scrabble',
    title: 'What Scrabble Is and How It Was Invented',
    category: 'Board Games',
    keywords: [
      'what is scrabble and how was it invented', 'a word game for two to four players who place lettered tiles on a 15 by 15 grid forming interlocking words scoring by tile values and premium squares',
      'created by alfred mosher butts an out of work architect in 1938 originally lexiko then criss cross words he set the letter frequencies and point values by counting letters on the front page of the new york times rejected by every major game company',
      'james brunot bought the rights refined it renamed it scrabble 1948 made sets by hand losing money until 1952 when the president of macys ordered it for the store and demand exploded selchow and righter then hasbro took it over',
    ],
    content: `Scrabble is a word game in which 2–4 players draw random lettered tiles and take turns placing them on a 15×15 board to build interlocking words (crossword-style). Each letter has a point value (common letters like E and A are worth 1, rare ones like Q and Z worth 10), and the board has premium squares that double or triple a letter or a whole word; using all seven of your tiles in one move earns a 50-point "bingo" bonus. It was invented by Alfred Mosher Butts, an unemployed architect in Poughkeepsie, New York, in 1938. He first made a version called "Lexiko" and then "Criss-Cross Words," and — a detail often quoted — he set the frequency and point value of each letter by tallying letters on the front page of the New York Times. Every established game company turned it down. In 1948 James Brunot, who had played and loved it, bought the manufacturing rights, made small refinements (including the name "Scrabble" and the premium-square layout), and began producing sets by hand in an old schoolhouse in Connecticut — losing money for four years. In 1952 the game caught on, the story going that the head of Macy's department store discovered it on holiday and placed a large order; orders overwhelmed Brunot, who licensed production to Selchow & Righter. It later passed to Hasbro (in North America) and Mattel (elsewhere), and is now published in dozens of languages, each with its own letter distribution.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-oldest-board-game',
    title: 'The Oldest Known Board Games',
    category: 'Board Games',
    keywords: [
      'what is the oldest known board game', 'the oldest known board games are far older than chess senet ancient egypt played by about 3100 bc boards found in predynastic burials a race game with religious meaning about the souls journey to the afterlife',
      'the royal game of ur or game of twenty squares mesopotamia about 2600 bc a race game whose rules were reconstructed from a babylonian clay tablet by british museum curator irving finkel', 'the chinese game go is about 2500 years old backgammons ancestors are about 5000 years old chess is a relative newcomer at about 1500 years old',
    ],
    content: `Chess (about 1,500 years old) is nowhere near the oldest board game. The two strongest candidates for "oldest known" are both from the ancient Near East: SENET, from Egypt, which appears on game boards and wall paintings from before 3100 BC and was buried with the dead (a full set was in Tutankhamun's tomb) — it was a race game for two players along a track of 30 squares, moved by throwing sticks or knucklebones, and it took on a religious meaning as a symbolic journey of the soul through the afterlife. And the ROYAL GAME OF UR (also called the Game of Twenty Squares), from the Sumerian city of Ur in Mesopotamia, with boards dating to about 2600 BC; it is another race game, and its rules were reconstructed in the 1980s by the British Museum curator Irving Finkel from a Babylonian clay tablet written by a scribe around 177 BC. Other very old games: the Chinese Go is more than 2,500 years old; games ancestral to backgammon (tabula, the Game of Twenty Squares, and boards found at Shahr-e Sukhteh in Iran) go back roughly 5,000 years; and Mancala-type sowing games are also ancient, though harder to date because the "board" is often just holes scooped in the ground.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-deck-building',
    title: 'What a Deck-Building Game Is (Dominion)',
    category: 'Board Games',
    keywords: [
      'what is a deck building game like dominion', 'a game where every player starts with the same small weak deck and the core gameplay is acquiring new cards from a shared central market and adding them to your own deck during the game which you shuffle and draw from as it grows and improves',
      'the genre was created by donald x vaccarinos dominion in 2008 others ascension star realms clank legendary', 'different from a collectible card game like magic the gathering or hearthstone where you build the deck beforehand from cards you own then bring it to a match in a deck builder you build the deck as part of playing from a common pool',
    ],
    content: `A deck-building game is a board/card game in which building your deck IS the game. Every player starts with an identical, small, deliberately weak starting deck (in Dominion, seven copper coins and three basic estates). On your turn you play cards from your hand to generate "money" and "actions," and you spend that money to BUY new, better cards from a shared central supply — attack cards, more valuable money, powerful action cards, and the "victory point" cards that decide the winner — placing each purchase into your own discard pile. As your discard pile grows you reshuffle it into your draw deck, so your deck steadily gets bigger and stronger (and, if you buy badly, more clogged), and each turn you draw a fresh hand from it. The genre was invented by Donald X. Vaccarino's DOMINION (2008), which won the top industry award, and it spawned Ascension, Star Realms, Clank!, Legendary, and deck-building components inside larger games. The key contrast with a collectible/trading card game like Magic: The Gathering or Hearthstone: there, you assemble a deck ahead of time from cards you own and bring it to a match; in a deck-builder, everyone builds from the same pool of cards on the table, during and as part of the single game being played.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bg-mancala',
    title: 'The Mancala Family of Games',
    category: 'Board Games',
    keywords: [
      'what is the mancala family of games', 'mancala is a large family of ancient count and capture sowing games from africa and asia not a single game the board is rows of pits and usually a large store for each player',
      'on your turn you pick up all the seeds from one of your pits and sow them one per pit going around the board rules for capturing vary commonly if your last seed lands in an empty pit on your own side you capture it and the seeds in the pit opposite',
      'the goal is to collect the most seeds in your store kalah and awari are simple western versions oware west africa and bao east africa are deep tournament games',
    ],
    content: `Mancala is not one game but a whole family — hundreds of related games played across Africa, the Middle East, and South and Southeast Asia for thousands of years, often on a board of carved wooden bowls or simply holes scooped in the earth, using seeds, beans, cowrie shells, or pebbles. The shared mechanic is "count-and-capture sowing." The board has two (sometimes four) rows of small pits, and usually one large "store" (or "home") pit per player. On your turn you scoop up ALL the seeds from one of the pits on your side and "sow" them one at a time into consecutive pits, moving around the board (typically counterclockwise), dropping a seed in your own store as you pass it but skipping your opponent's store. Then a capture rule fires — the details vary by game, but a very common one is: if your last seed lands in an empty pit on your own side, you capture that seed plus all the seeds in the opponent's pit directly opposite, and move them to your store. The game ends when one side's pits are all empty, and whoever has collected the most seeds in their store wins. Simple Western versions are usually called Kalah or Awari; deeper traditional versions played competitively include Oware (Ghana), Omweso (Uganda), and especially Bao (East Africa), which is regarded as one of the most strategically demanding board games in the world.`,
    createdAt: Date.now(),
  },
];
