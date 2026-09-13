import { KnowledgeItem } from '../../types';

/**
 * SOCCER_CONCEPTS_GAPS_3 — batch 262 corrections (Barça / football culture &
 * history theme). nexus-4b handled most of this batch well (La Liga vs Copa
 * del Rey, clean sheet vs shutout, friendly vs competitive, extra time vs
 * shootout, treble vs quadruple, Spanish Super Cup vs UEFA Super Cup, loan vs
 * permanent transfer, man-marking vs zone marking, sweeper-keeper vs
 * traditional keeper, Camp Nou vs neutral venue, El Clasico, promotion vs
 * relegation, penalty vs direct free kick, hat-trick vs brace, false nine vs
 * traditional striker, tiki-taka vs counter-attacking). Misses:
 * - "Ballon d'Or vs FIFA Best" explained the Ballon d'Or fine but never said
 *   what the FIFA Best award actually is.
 * - "La Masia academy player vs signed transfer" turned into a pure trivia
 *   dump about the 2010 Ballon d'Or podium and got cut off mid-sentence,
 *   never actually contrasting the two development paths.
 * - "starting eleven vs matchday squad" said the starting XI is "twelve
 *   players" (it's eleven).
 * - "preseason friendly tour vs preseason training" hallucinated CYCLING
 *   content ("glorified piss-up for cyclists") for a football question.
 * - "goal assist vs secondary assist" was a severe hallucination — dumped a
 *   definition of "Computer-assisted reviewing (CAR) tools" (document-
 *   comparison software) before pivoting to an accurate but irrelevant xG
 *   definition. Never answered the actual question.
 * - "golden boot vs golden glove" gave a solid golden boot answer but the
 *   golden glove got one throwaway clause with no real definition.
 * - "club captain vs wearing the armband on a given day" only explained what
 *   a club captain is and never addressed the actual second half of the
 *   question (a different player — usually the vice-captain — wearing the
 *   armband when the real captain is absent/subbed off).
 * NOTE: "Champions League vs Europa League" is ALREADY correctly covered by
 * two separate entries (soccerConceptsGaps.ts and soccerConceptsGaps2.ts,
 * both batch-tested and confirmed correct before), yet the live model still
 * answered with an unrelated Sevilla trivia dump instead of the structural
 * explanation. This is NOT a missing-corpus problem — it's a retrieval/
 * grounding issue (the correct entries exist but aren't winning/being used
 * for this query) and needs a separate investigation into
 * knowledgeBase.ts/reasoningEngine.ts's retrieval ranking, not another
 * duplicate corpus entry.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'soccer', keywords, content, createdAt: now,
});

export const SOCCER_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-soc3-ballon-dor-vs-fifa-best',
    "Ballon d'Or vs FIFA Best award",
    [
      "difference between the ballon d'or and the fifa best award", 'ballon dor is awarded by France Football magazine since 1956 based on a vote of journalists',
      'FIFA Best awards fifa the best football awards started 2016 voted by national team captains coaches journalists and fans', 'two separate awards after FIFA and France Football split in 2016',
      'messi has won a record number of ballons dor',
    ],
    `The Ballon d'Or ("Golden Ball") is awarded by the French magazine FRANCE FOOTBALL, running since 1956 — it's decided by a panel of football JOURNALISTS from around the world voting for the best individual player of the year. Messi holds the record with the most wins.

The FIFA BEST Men's/Women's Player award (formally "The Best FIFA Football Awards") is a completely separate award run by FIFA itself, only since 2016. Its winner is decided by a combined vote split between international team CAPTAINS, national team COACHES, one journalist per country, and a public FAN vote — four different voter groups, not just journalists.

The two used to be the SAME award for a few years: from 2010 to 2015, FIFA and France Football merged their prizes into one joint "FIFA Ballon d'Or". They split back into two separate, competing awards in 2016 after the partnership ended, which is why some players in that window have both a Ballon d'Or AND a Best FIFA award for the same year, and others don't — the two panels don't always agree on a winner since 2016.`,
  ),
  k(
    'kb-gap-soc3-la-masia-vs-signed-transfer',
    'La Masia academy player vs a signed transfer',
    [
      'difference between a la masia academy player and a signed transfer', 'la masia is fc barcelonas own youth academy players raised in the club system since childhood free of charge',
      'a signed transfer is a player bought from another club for a transfer fee as an adult or teenager already developed elsewhere',
      'homegrown player vs bought player', 'cantera product',
    ],
    `A LA MASIA player ("home-grown", from the club's own academy — "La Masia" literally means "the farmhouse", the building the academy was originally run out of) joined FC Barcelona's own youth system as a kid and was trained, coached, and developed entirely inside the club for years before ever making the first team — no transfer fee is paid for them, since the club raised them itself. Xavi, Iniesta, and Messi are the classic examples; all three were on the 2010 Ballon d'Or podium together as La Masia products.

A SIGNED TRANSFER is a player who developed somewhere else — another club's academy, a lower-tier team, or a different country entirely — and was BOUGHT by Barça as an already-formed player, usually for a transfer fee (sometimes free if their contract had expired). They arrive as adults or near-adults with an existing career, rather than growing up inside the club's own system.

The practical difference on matchday: a squad's "La Masia" percentage is a point of pride for a club built around its academy identity, since it means the team is producing its own talent rather than only buying it — but both types of player can absolutely be first-team starters and internationals.`,
  ),
  k(
    'kb-gap-soc3-starting-eleven-vs-matchday-squad',
    'Starting eleven vs matchday squad (headcount)',
    [
      'difference between a starting eleven and a matchday squad', 'the starting eleven is the ELEVEN players who begin the match on the pitch not twelve',
      'matchday squad is a larger group of around twenty to twenty three players named for that game including substitutes',
      'starting XI eleven players not twelve a team is reduced to ten men if a player is sent off',
    ],
    `The STARTING ELEVEN (or "starting XI") is exactly ELEVEN players per side — one goalkeeper plus ten outfield players — the ones who begin the match on the pitch at kickoff. It is eleven, not twelve: that's why a team down to ten men after a red card is playing a player short, and why the phrase is "eleven versus eleven", never "twelve".

The MATCHDAY SQUAD is the wider group named for that specific game, which also includes the SUBSTITUTES sitting on the bench — typically another 7 to 12 players depending on the competition's rules, for a total squad of around 18 to 23-ish named players. Only the starting eleven begin the game; the rest of the matchday squad can be brought on as substitutes during play, subject to that competition's substitution limit.`,
  ),
  k(
    'kb-gap-soc3-preseason-tour-vs-training',
    'Preseason friendly tour vs preseason training',
    [
      'difference between a preseason friendly tour and preseason training', 'this is about football soccer not cycling',
      'preseason training is fitness conditioning tactical work and closed sessions at the clubs own facility before the season starts',
      'a preseason tour is a series of exhibition friendly matches often abroad in front of paying fans used to build fitness match sharpness and sell the brand internationally',
    ],
    `PRESEASON TRAINING is the internal conditioning phase: closed sessions at the club's own training ground, building up players' fitness after the summer break, running tactical drills, and integrating new signings — no crowd, no opponent, no result that counts for anything.

A PRESEASON (or "friendly") TOUR is the club actually traveling — often abroad, frequently to Asia or North America for the bigger clubs — to play a short series of EXHIBITION matches against other clubs in front of paying fans. These games help build match sharpness and fitness the way training alone can't, but they also exist to grow the club's brand and fanbase internationally and generate sponsorship/ticket revenue; results are treated as meaningless and managers rotate the whole squad through the games rather than fielding a fixed best XI.

So: training is the internal fitness/tactics work with no games, and a tour is the external, revenue-generating stretch of real (if meaningless) friendly matches against other clubs, usually the phase that follows initial training.`,
  ),
  k(
    'kb-gap-soc3-goal-assist-vs-secondary-assist',
    'Goal assist vs secondary assist (pre-assist)',
    [
      'difference between a goal assist and a secondary assist', 'an assist is the final pass or action that directly leads to a goal by a teammate',
      'a secondary assist also called a pre assist or hockey assist is the pass immediately before that final assist one step further back in the buildup',
      'not computer assisted review CAR that is unrelated document comparison software has nothing to do with football',
    ],
    `An ASSIST is the pass, cross, or other final action that DIRECTLY sets up a teammate to score — if you pass the ball to someone and they score with basically their next touch, that pass is the assist. It's the standard, universally-tracked stat.

A SECONDARY ASSIST (also called a "pre-assist", a term borrowed from hockey where it's officially tracked) is the pass ONE STEP EARLIER in the buildup — the pass that set up the player who then made the actual assist. So in a sequence "Player A passes to Player B, who passes to Player C, who scores": Player B gets the assist, and Player A gets the secondary assist.

Secondary assists are NOT an official FIFA/league statistic the way assists are — they're an informal, analytics-community stat (tracked by data sites like Opta/FBref) used to credit players for good buildup play that a bare assist count misses, since a lot of the passing work that creates a chance happens before the final pass.`,
  ),
  k(
    'kb-gap-soc3-golden-boot-vs-golden-glove',
    'Golden boot vs golden glove',
    [
      'difference between the golden boot and the golden glove', 'golden boot goes to the top goalscorer of a tournament or league',
      'golden glove goes to the best goalkeeper usually measured by fewest goals conceded or most clean sheets not top scorer',
      'world cup golden glove award for best goalkeeper',
    ],
    `The GOLDEN BOOT (or "Golden Shoe") goes to the top GOALSCORER of a tournament or season — whoever scores the most goals, full stop. It exists at the World Cup, most domestic leagues, and continental tournaments.

The GOLDEN GLOVE is a completely different award for the best GOALKEEPER of that same competition — judged mainly on fewest goals conceded and/or most clean sheets kept, not goals scored (goalkeepers obviously aren't the ones scoring). At the World Cup specifically, the Golden Glove has been awarded since 2010 (won by Iker Casillas that year); in domestic leagues like the Premier League, the Golden Glove goes to whichever keeper recorded the most clean sheets across the season.

So: Golden Boot rewards attacking output (goals scored), Golden Glove rewards defensive/goalkeeping output (goals kept out) — they're never competing for the same trophy and are usually won by completely different types of players.`,
  ),
  k(
    'kb-gap-soc3-club-captain-vs-armband-on-day',
    'Club captain vs wearing the armband on a given day',
    [
      'difference between being club captain and wearing the armband on a given day', 'the club captain is the permanent official leadership role appointed by the manager or club for the season or longer',
      'the armband on any specific matchday can be worn by the vice captain or another senior player if the actual club captain is injured suspended rested or substituted off',
      'captaincy passes down a pre agreed pecking order during a match',
    ],
    `The CLUB CAPTAIN is the fixed, official leadership role — one player formally appointed by the manager (sometimes with input from the squad) to hold that title for the season or longer. It's a real off-pitch responsibility too: representing the players to the club, being the senior voice in the dressing room, and so on.

WEARING THE ARMBAND ON A GIVEN DAY is not always the same thing. If the actual club captain is injured, suspended, rested, or gets substituted off mid-match, the armband passes to whoever is next in the club's pre-agreed leadership pecking order — usually the VICE-CAPTAIN, or the most senior player left on the pitch. So on any single matchday, the player physically wearing the armband might be a stand-in, while the club captain title itself doesn't change hands just because someone else wore the armband that day.

In short: club captain is a season-long (or longer) title held by one named player; the armband on the pitch on any given day reflects who's actually available and senior enough to lead in that specific moment, which is sometimes a different person entirely.`,
  ),
];
