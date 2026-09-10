import { KnowledgeItem } from '../../types';

/**
 * SOCCER_CONCEPTS_GAPS_2 — batch 241 corrections.
 * nexus-4b is strong on soccer overall. Misses:
 * - "sweeper vs libero" pivoted to "sweeper-keeper".
 * - "gegenpressing vs low block" started describing tiki-taka instead.
 * - "tiki-taka vs possession football" said they are the same thing.
 * - "offside rule vs offside trap" said defenders position themselves offside
 *   (defenders cannot be offside).
 * - "derby vs rivalry" garbled the definition.
 * - "Champions League vs Europa League" dodged into Sevilla's record.
 * - "domestic treble vs continental treble" was a web dump.
 * - "aggregate vs away goals" stated the away-goals rule as current (UEFA
 *   scrapped it in 2021).
 * - "FFP vs salary cap" missed the core structural difference.
 * - "striker vs centre-forward" and "sporting director vs technical director"
 *   were muddled (the latter said a TD "is just the head coach").
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'soccer', keywords, content, createdAt: now,
});

export const SOCCER_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-soc2-sweeper-vs-libero',
    'Sweeper vs libero',
    [
      'difference between a sweeper and a libero', 'both are an extra defender behind the back line with no direct marking assignment who covers and clears', 'sweeper is the defensive English term',
      'libero is Italian for free and emphasises the ball-playing attacking version Beckenbauer', 'not the sweeper-keeper which is a goalkeeper', 'catenaccio',
    ],
    `They are essentially the SAME role, seen from two angles — an extra central defender who plays BEHIND the rest of the back line with no man to mark, free to read the game, cover in behind, and clear ("sweep up") any ball that gets past his teammates.

"SWEEPER" is the plain English term and stresses the DEFENSIVE job: the safety net behind a man-marking defence, central to the Italian catenaccio system of the 1960s.

"LIBERO" is Italian for "free man" and stresses the more ADVANCED, ball-playing version: once the danger is cleared, the libero steps out with the ball, carries it forward, and joins the attack or starts moves from deep. Franz Beckenbauer defined this — a defender who was also a playmaker. So a libero is a sweeper who also builds play.

Both roles faded once the offside law changes and zonal defending made a spare man at the back a luxury; teams went to a flat back four or a marking-based back three. Note this is NOT the "sweeper-keeper" — that is a goalkeeper (Neuer, Ederson) who plays high off his line and acts almost as an extra defender.`,
  ),
  k(
    'kb-gap-soc2-gegenpressing-vs-low-block',
    'Gegenpressing vs a low block',
    [
      'difference between gegenpressing and a low block', 'gegenpressing is German for counter-pressing immediately swarming to win the ball back the instant it is lost high up the pitch', 'a low block is a defensive strategy the whole team drops deep and compact near its own goal conceding possession',
      'gegenpressing is proactive and aggressive Klopp Bielsa', 'low block is reactive absorb and counter', 'they are near opposites',
    ],
    `They are near-opposite defensive approaches.

GEGENPRESSING (German for "counter-pressing") is aggressive and PROACTIVE. The moment a team loses the ball, several players immediately swarm the opponent who won it — high up the pitch, within a few seconds — to win it straight back before the opposition can settle and counter. The theory (associated with Klopp, Bielsa, Rangnick) is that the opponent is most disorganised in the instant they gain possession, so that is the best time to press. It needs high fitness, compact team shape when attacking, and coordinated triggers.

A LOW BLOCK is defensive and REACTIVE. The whole team drops DEEP toward its own goal, forms two compact banks (often 4-4 or 5-4), gives the opponent the ball and the space in midfield, and defends the area in front of goal — denying space rather than chasing the ball. When possession is won, the team counter-attacks quickly or just clears and resets. Smaller sides use it against stronger ones; strong sides use it to protect a lead.

Short version: gegenpressing hunts the ball back instantly and high; a low block hands over the ball, sits deep, and waits.`,
  ),
  k(
    'kb-gap-soc2-tikitaka-vs-possession',
    'Tiki-taka vs possession football',
    [
      'difference between tiki-taka and possession football', 'possession football is the broad approach of keeping the ball to control the game can be patient or slow', 'tiki-taka is a specific extreme style very short quick one and two touch passing constant positional rotation high counter-press',
      'Guardiola Barcelona 2008 to 2012 and Spain 2008 to 2012', 'tiki-taka has tempo and a goal not just retention', 'all tiki-taka is possession football not all possession football is tiki-taka',
    ],
    `POSSESSION FOOTBALL is the broad idea: keep the ball, make the opponent chase, control the game's rhythm and territory, and reduce the other team's chances simply by denying them the ball. It can be patient and slow (recycling across the back), or used cynically to kill a game out, or a platform for measured build-up. Many teams and eras have played possession football in different tempos.

TIKI-TAKA is one SPECIFIC, extreme version of it, most associated with Guardiola's Barcelona (2008-2012) and the Spain side that won Euro 2008, the 2010 World Cup, and Euro 2012. Its hallmarks: very short, very quick one- and two-touch passing; constant movement and positional rotation to always offer angles; drawing the opponent out and then playing through them; and an immediate high counter-press the instant the ball is lost, so possession is regained within seconds. It is possession with high TEMPO and the explicit aim of creating openings, not just holding the ball.

So: all tiki-taka is possession football; not all possession football is tiki-taka. The word itself ("tiki-taka") was popularised by Spanish commentator Andrés Montes and was sometimes used mockingly for sterile sideways passing — which is why Guardiola himself disliked the term.`,
  ),
  k(
    'kb-gap-soc2-offside-rule-vs-trap',
    'Offside rule vs offside trap',
    [
      'difference between the offside rule and the offside trap', 'the offside rule an attacker is offside if nearer the opponents goal line than both the ball and the second-last defender when the ball is played to him and then becomes involved', 'the offside trap defenders step up in unison just before a through ball so the attacker is left offside',
      'defenders cannot be offside', 'a defensive tactic timing the step', 'active involvement interfering with play',
    ],
    `The OFFSIDE RULE is Law 11 of the game. An attacker is in an offside POSITION if, at the moment a teammate plays the ball, he is in the opponents' half AND nearer to the opponents' goal line than both the ball and the second-last opponent (usually the last outfield defender, since the goalkeeper is normally the last). Being in that position is not an offence by itself — it becomes an offence only if he then becomes involved in active play (plays the ball, interferes with an opponent, or gains an advantage). The position is judged at the instant the ball is played, not when it is received.

The OFFSIDE TRAP is a DEFENSIVE TACTIC that uses that rule as a weapon. Just before an opposition through-ball is played, the defensive line steps UP toward halfway in a coordinated, sudden movement, so that the intended runner — who was level or onside a second earlier — is suddenly left BEHIND the line and therefore offside when the pass is played. Done well it kills the attack with no tackle; done a fraction late, or if one defender lags, it plays the striker clean through on goal. (Note: defenders themselves can never be "offside" — the trap is about catching the ATTACKER out.)`,
  ),
  k(
    'kb-gap-soc2-derby-vs-rivalry',
    'Derby vs rivalry',
    [
      'difference between a derby and a rivalry', 'a rivalry is any intense sustained competitive antagonism between two clubs based on geography history success politics or a famous match', 'a derby is specifically a rivalry between clubs from the same city or region local derby',
      'all derbies are rivalries not all rivalries are derbies', 'El Clasico is a national rivalry not a derby', 'North London derby Milan derby Old Firm',
    ],
    `A RIVALRY is any intense, sustained mutual antagonism between two clubs. It can come from many sources: shared geography, a history of meeting in finals, competing for the same trophies, class or political divides, or one infamous match. Examples: Real Madrid vs Barcelona (national, political/historical), Liverpool vs Manchester United (two cities, competing for dominance), Boca vs River (Buenos Aires, class-tinged).

A DERBY (or "local derby") is a SPECIFIC KIND of rivalry: one between clubs from the SAME city or immediate area, where the two sets of supporters are literally neighbours, workmates, even family. Examples: the North London derby (Arsenal vs Tottenham), the Milan derby (Inter vs Milan, same stadium), the Manchester derby, the Old Firm (Celtic vs Rangers, Glasgow), the Superclásico of Buenos Aires.

So the relationship is: every derby is a rivalry, but not every rivalry is a derby. El Clásico is one of football's biggest RIVALRIES but it is NOT a derby, because Madrid and Barcelona are 600 km apart. ("Derby" is sometimes stretched to regional or even national meetings — "the Derby of Italy" for Juventus vs Inter — but strictly it means local.)`,
  ),
  k(
    'kb-gap-soc2-cl-vs-el',
    'Champions League vs Europa League',
    [
      'difference between the Champions League and the Europa League', 'Champions League is UEFAs top-tier club competition for league champions and highest-placed finishers most prestigious and lucrative', 'Europa League is the second-tier competition for teams finishing below the CL places or eliminated from CL qualifying',
      'Europa League winner earns a Champions League place', 'Conference League is the third tier', 'more entrants and prize money in the CL',
    ],
    `Both are annual UEFA competitions for European clubs; they sit in a three-tier pyramid (Champions League > Europa League > Europa Conference League).

The CHAMPIONS LEAGUE is the TOP tier: the most prestigious club trophy in the world and by far the most lucrative. Entry goes to the champions of every UEFA league plus the next-highest finishers of the strongest leagues (England, Spain, Italy, Germany get four or more places each). It has the biggest clubs, the largest audiences, and the most prize money; winning it is the pinnacle for a European club.

The EUROPA LEAGUE is the SECOND tier: entry for teams that finish just BELOW the Champions League places in their domestic league, for some domestic cup winners, and for clubs knocked out of Champions League qualifying (who "drop down"). It is a serious trophy — Sevilla have built an identity on it — and crucially the WINNER earns a place in the next season's Champions League.

Below both, the CONFERENCE LEAGUE (started 2021) is the third tier, mostly for clubs from smaller leagues and lower domestic finishers.

Short version: same idea, different level — the Champions League is for the elite, the Europa League is the step below, and the two are linked because the Europa winner goes up.`,
  ),
  k(
    'kb-gap-soc2-domestic-vs-continental-treble',
    'Domestic treble vs continental treble',
    [
      'difference between a domestic treble and a continental treble', 'a treble is winning three major trophies in one season', 'continental treble the league the main domestic cup and the continental cup Champions League',
      'domestic treble the league plus two domestic cups no continental trophy', 'Man Utd 1999 Barcelona 2009 2015 Bayern 2013 2020 Inter 2010 Man City 2023 continental trebles', 'Celtic 1967 Rangers Bayern domestic',
    ],
    `A "TREBLE" means winning THREE major trophies in a single season. The two types differ by WHICH three.

A CONTINENTAL TREBLE (often just "the treble", and the rarer, more celebrated one) = the domestic LEAGUE title + the country's primary domestic CUP + the CONTINENTAL cup (in Europe, the Champions League). It combines domestic dominance with winning Europe. The men's European examples: Celtic 1967, Ajax 1972, PSV 1988, Manchester United 1999, Barcelona 2009 and 2015, Inter 2010, Bayern Munich 2013 and 2020, Manchester City 2023.

A DOMESTIC TREBLE = three trophies all won WITHIN one country, with NO continental trophy — typically the league + both domestic cups (in England: the Premier League + FA Cup + League Cup; in Spain: LaLiga + Copa del Rey + Supercopa; in Scotland: league + Scottish Cup + League Cup). Examples: Rangers and Celtic have done the Scottish domestic treble many times; Bayern have done the German league-plus-cup double repeatedly but the "domestic treble" proper needs a third domestic prize.

If a club wins the league, the domestic cup, AND the Champions League, that is the continental treble; adding a fourth or fifth (Super Cup, Club World Cup) is sometimes called a "sextuple" (Barcelona 2009, Bayern 2020).`,
  ),
  k(
    'kb-gap-soc2-aggregate-vs-away-goals',
    'Aggregate score vs away goals (two-legged ties)',
    [
      'difference between aggregate score and away goals', 'aggregate is the combined total of both legs added together', 'away goals rule used to break an aggregate tie by counting goals scored at the opponents ground double',
      'UEFA abolished the away goals rule in 2021', 'now a level aggregate goes to extra time then penalties', 'still used in some other confederations and competitions',
    ],
    `In a knockout tie played over TWO legs (home and away), the AGGREGATE score is simply the two results added together. If Team A wins 2-1 at home and loses 1-0 away, the aggregate is 2-2.

The AWAY GOALS RULE was a tie-breaker for a level aggregate: whichever team had scored MORE goals at the OPPONENT's ground went through. In the 2-2 example above, Team A scored 1 away, Team B scored 1 away — still level, so it would go on; but if it had finished A 3-2 at home, B 2-1 at A's ground (aggregate 4-4), B would advance on away goals (2 away goals to A's... wait — count only goals scored AWAY: A scored 2 away, B scored 2 away — the rule compares each team's goals at the other's stadium).

Key update: UEFA ABOLISHED the away goals rule from the 2021-22 season. Now, if a European two-legged tie is level on aggregate after both legs, it goes straight to EXTRA TIME and then a PENALTY SHOOTOUT — an away goal counts exactly the same as a home goal. Some other confederations and competitions still use away goals, but in UEFA competitions it is gone.`,
  ),
  k(
    'kb-gap-soc2-ffp-vs-salary-cap',
    'Financial Fair Play vs a salary cap',
    [
      'difference between Financial Fair Play and a salary cap', 'FFP ties a clubs spending to its own revenue break-even or a squad-cost ratio so richer clubs can still spend more', 'a salary cap is a fixed hard ceiling on wages or spending that is the same for every club regardless of revenue',
      'FFP preserves the gap between big and small clubs a salary cap compresses it', 'NFL NBA MLS use salary caps European football uses FFP style rules',
    ],
    `Both limit club spending, but on completely different principles.

FINANCIAL FAIR PLAY (UEFA, from 2011; now evolving into "financial sustainability" / a "squad-cost ratio") ties a club's spending to its OWN REVENUE. The original rule required clubs to roughly BREAK EVEN over a rolling period — you can only spend what you earn (from broadcasting, matchday, commercial), with limited owner injections. The newer squad-cost ratio caps spending on wages + transfer amortisation + agent fees at a set percentage (heading toward 70%) of the club's football revenue. Crucially, a club with huge revenue (Real Madrid, Manchester City) is still ALLOWED to spend far more than a small club — the rule just stops any club spending money it does not have. It has produced real punishments (points deductions for Everton, Nottingham Forest, Juventus; the ongoing charges against Manchester City).

A SALARY CAP is a FIXED CEILING — a single hard limit on total wages (or total spending) that is the SAME for every team in the league, no matter how rich. Used in North American leagues (NFL, NBA, MLS) and rugby. Its purpose is competitive BALANCE: it stops the wealthiest clubs from simply buying every star and forces roster choices, compressing the gap between big and small.

So: FFP keeps clubs solvent but preserves the financial hierarchy; a salary cap deliberately flattens it. European football has resisted a true salary cap partly because clubs operate across different national leagues and tax regimes.`,
  ),
  k(
    'kb-gap-soc2-striker-vs-centre-forward',
    'Striker vs centre-forward (vs forward)',
    [
      'difference between a striker and a centre-forward', 'striker and centre-forward are near synonyms for the central attacker the number 9', 'striker emphasises the pure goalscorer poacher',
      'centre-forward can imply a more complete leading-the-line role hold-up play link play bringing others in', 'forward is the broader term including wingers and second strikers',
    ],
    `"STRIKER" and "CENTRE-FORWARD" both mean the main central attacker — the number 9, the player closest to the opposition goal whose primary job is to score. In everyday use they are interchangeable.

Where people draw a nuance:
- "STRIKER" leans toward the PURE GOALSCORER — the poacher who lives in the box, finishes chances, and is judged almost entirely on goals (Inzaghi, Van Nistelrooy, Vardy).
- "CENTRE-FORWARD" leans toward the more COMPLETE leading-the-line role — holding the ball up with his back to goal, bringing midfielders and wingers into play, occupying centre-backs, pressing from the front, as well as scoring (Harry Kane, Benzema, Drogba, a "target man" is one type).

"FORWARD" (or "attacker") is the BROADER category that also includes players who are not central: wingers, inside forwards, and second strikers who play off the main man. So every striker is a forward, but a winger is a forward who is not a striker.

Different systems use different numbers of forwards — a lone striker (4-2-3-1), a front two (4-4-2), or a front three with a centre-forward flanked by two wide forwards (4-3-3).`,
  ),
  k(
    'kb-gap-soc2-sporting-vs-technical-director',
    'Sporting director vs technical director',
    [
      'difference between a sporting director and a technical director', 'both are executive front-office roles not the head coach', 'sporting director director of football oversees the whole football department transfers contracts scouting loans coaching appointments playing philosophy',
      'technical director often focuses on the academy youth development coaching methodology player pathway and infrastructure the longer-term technical side', 'titles vary by club they can overlap',
    ],
    `Both are OFF-FIELD executive roles — neither is the head coach (the coach picks the team and runs training; these people sit above or alongside him in the football department).

A SPORTING DIRECTOR (also "director of football", "sporting CEO") runs the whole FOOTBALL OPERATION on the club side: identifying and negotiating transfers, agreeing player and staff contracts, running the scouting network, managing the loan army, hiring and firing head coaches, and — importantly — keeping a consistent playing IDENTITY and squad plan that survives changes of manager. He is the bridge between the owners/board and the football side.

A TECHNICAL DIRECTOR usually focuses on the longer-term "TECHNICAL" side: the ACADEMY and youth development, the club's coaching METHODOLOGY and curriculum from under-9s to the first team, the player pathway, sports science and medical structures, and facilities. The idea is a coherent "way of playing" taught at every level.

In practice the titles are used loosely and vary by country and club — at some clubs one person does both, at others the technical director reports to the sporting director, and a few clubs swap the meanings. But the common split is: sporting director = recruitment and first-team football operations; technical director = development, methodology, and the academy.`,
  ),
  k(
    'kb-gap-soc2-playmaker-vs-number-10',
    'Playmaker vs number 10',
    [
      'difference between a playmaker and a number 10', 'number 10 is a position the attacking midfielder just behind the striker', 'playmaker is a role the teams chief creator can be played from the 10 but also from deep or from wide',
      'deep-lying playmaker regista Pirlo Xavi Busquets', 'advanced playmaker trequartista', 'all good 10s are playmakers not all playmakers are 10s',
    ],
    `A NUMBER 10 is a POSITION: the attacking midfielder who plays in the pocket between the opposition's midfield and defence, just behind the striker(s). It is a spot on the pitch (the "hole").

A PLAYMAKER is a ROLE: the player through whom a team's attacking moves are channelled — the chief creator, the one who sets the tempo and supplies the final or penultimate pass. That role is OFTEN played from the number 10 position (the "advanced playmaker" or trequartista — Zidane, Totti, De Bruyne when advanced), but it does not have to be:
- a DEEP-LYING playmaker / regista operates from in front of the back four, dictating play with long, raking passes (Pirlo, Xavi, Busquets, Rodri);
- a wide playmaker creates from the flank or drifting inside (early Beckham crossing, prime Özil);
- some teams have no orthodox 10 at all and share creativity among midfielders.

So: all effective number 10s are playmakers, but many playmakers operate from deeper or wider. "Number 10" tells you WHERE; "playmaker" tells you WHAT the player does.`,
  ),
];
