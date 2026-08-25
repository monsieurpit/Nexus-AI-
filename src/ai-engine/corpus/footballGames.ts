import { KnowledgeItem } from '../../types';

export const FOOTBALL_GAMES_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-footballgames-ea-fc-history',
    title: 'EA Sports FC (formerly FIFA): History and the Split From FIFA',
    category: 'gaming',
    keywords: [
      'ea sports fc', 'fc26', 'fc 26', 'fifa game', 'why did fifa become ea sports fc', 'fifa vs ea fc',
      'ea fc history', 'fc24', 'fc25', 'ultimate team', 'fut', 'career mode',
    ],
    content: `EA Sports FC is the modern name for what was, for nearly three decades, the FIFA video game series — EA and FIFA (the sport's real-world governing body) ended their licensing partnership after FIFA 23, and EA rebranded the series EA Sports FC starting with FC 24 (2023), continuing annually with FC 25 and FC 26. EA kept its individual league and club licenses (Premier League, La Liga, Bundesliga, most major clubs and players) since those are separate deals from the FIFA organization itself, so the on-pitch product stayed largely the same — it was mainly the FIFA name and the official World Cup license that were lost (Konami's eFootball has since picked up some World Cup-adjacent content instead). Ultimate Team (FUT) is the series' dominant mode by player count and revenue — you build a squad by opening packs (earned or bought with real money) or buying/selling individual player cards on a transfer-market-style auction house, and it's built around chasing rarer, higher-rated special cards released throughout the season (Team of the Week, Team of the Season, promo cards tied to real-world events). Career Mode is the more traditional single-player experience — manage a club (or play as a created pro) across multiple seasons with transfers, contracts, and league progression. Each yearly release typically brings gameplay tuning (pace, physicality, shooting/passing feel), graphical/engine updates, and new or refreshed game modes, while the core structure (Ultimate Team, Career Mode, online seasons/Champions play) has stayed consistent for years.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-footballgames-efootball',
    title: 'eFootball (Konami): History, Free-to-Play Model, and How It Differs From EA FC',
    category: 'gaming',
    keywords: [
      'efootball', 'e-football', 'pes', 'pro evolution soccer', 'konami football game', 'efootball vs fifa',
      'efootball vs ea fc', 'dream team', 'is efootball free',
    ],
    content: `eFootball is Konami's football game, the direct successor to the long-running Pro Evolution Soccer (PES) series — Konami rebranded and relaunched it as eFootball in 2021, moving to a free-to-play model instead of PES's traditional full-price release structure. The initial 2021 launch was notoriously rough (widely mocked for its unfinished state, stiff player animations, and missing content compared to the PES games it replaced), and Konami spent the next couple of years rebuilding trust with a series of substantial content and gameplay updates. Its core team-building mode is Dream Team (eFootball's equivalent of Ultimate Team) — collecting and upgrading player cards, though structured somewhat differently from EA's model. eFootball is generally considered by many players to have a slower, more grounded, simulation-leaning feel to its gameplay compared to EA FC's generally faster, more arcade-accessible pace, though both have shifted over different yearly updates. Being free-to-play, eFootball makes money primarily through microtransactions for Dream Team packs/players rather than an upfront purchase price, which is the single biggest structural difference from EA Sports FC's traditional paid-game-plus-Ultimate-Team-microtransactions model. Licensing is more fragmented than EA FC's — Konami has various individual league/club deals but historically lacked the same breadth of exclusive top-league licensing EA built up over decades, though this has shifted over time as EA lost the FIFA branding.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-footballgames-fc-mobile',
    title: 'EA Sports FC Mobile: How It Differs From the Console/PC Game',
    category: 'gaming',
    keywords: [
      'fc mobile', 'fifa mobile', 'ea fc mobile', 'fc mobile vs fc console', 'fc mobile manager mode',
      'fc mobile vs attack', 'fc mobile ultimate team',
    ],
    content: `EA Sports FC Mobile (the rebrand of what was FIFA Mobile) is a separate, purpose-built mobile game rather than a straight port of the console/PC version — it's designed around shorter session lengths, touch controls, and its own progression systems. Its Ultimate Team mode works on similar principles to the main game (packs, player cards, an auction-house-style market) but with mobile-specific mechanics layered on, including VS Attack, a distinct competitive mode built around alternating attacking possessions between two players rather than full 11v11 real-time matches, designed to fit short mobile play sessions. Manager Mode lets players build and progress a club over time with a stronger emphasis on long-term collection and upgrading systems than deep tactical management. Matches can be played with full manual touch controls or a more automated "auto-play"/simulation style, which is a mobile-specific option not present in the console/PC version. Because it runs on a different engine and release cadence than the main console/PC game, FC Mobile's roster updates, card releases, and promo events run on their own separate schedule rather than being a direct mirror of the console version's content drops, even though both games are built around similar Ultimate Team card-collecting principles.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-footballgames-ultimate-team-culture',
    title: 'Ultimate Team Culture: Packs, Trading, Skill Moves, and Community Terms',
    category: 'gaming',
    keywords: [
      'fut trading', 'pack luck', 'skill moves fifa', 'fifa slang', 'fut coins', 'sbc squad building challenge',
      'weekend league', 'rivals fifa', 'fut champions', 'fifa mechanics', 'ea fc terms',
    ],
    content: `Squad Building Challenges (SBCs) are a core Ultimate Team mechanic across EA's games — you submit a squad meeting specific requirements (certain league, nationality, rating, chemistry) in exchange for packs, players, or other rewards, and a large part of the mode's long-term engagement comes from completing chains of increasingly demanding SBCs. "Chemistry" measures how well players link together based on shared league, nation, and club — low-chemistry squads perform noticeably worse in-game, which is why Ultimate Team squad-building is as much a puzzle about compatible players as it is about picking the highest-rated ones. Competitive online modes (branded Weekend League/FUT Champions in various years) are how top players earn the best rewards, and consistently strong online results are how the most valuable in-game items get distributed to the playerbase. Trading (buying low, selling high on the in-game transfer market) is its own semi-economy within the game, and player prices genuinely fluctuate based on real-world form, promo timing, and supply from packs — a real-world hat-trick can spike a player's in-game market price within hours. Common community slang: a "meta" player/card means one that's considered overpowered or exceptionally efficient for its cost in the current version of the game (same usage as "meta" in gaming generally); "pack luck" refers to the random-chance nature of what you pull from packs, a frequent source of community frustration given the real-money option to buy packs; skill moves (step-overs, rainbow flicks, elastico, etc.) are input combinations for flashy dribbling maneuvers, rated on a 1-5 star scale per player reflecting how many they can reliably perform.`,
    createdAt: Date.now(),
  },
];
