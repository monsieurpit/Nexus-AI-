import { KnowledgeItem } from '../../types';

/**
 * SOCCER_CONCEPTS_GAPS — batch 220 corrections. Association football (soccer).
 * Nexus is meant to be a real Barca fan but kept answering soccer questions
 * with other domains: "transfer vs loan" -> bank transfers, "man marking vs
 * zonal marking" -> the jet stream, "header vs volley" -> network packet
 * headers, "cap vs appearance" -> atmospheric cap + renal cortex, "nutmeg vs
 * rainbow flick" -> optical rainbows, "set piece vs open play" -> rugby,
 * "sport vs game"/"friendly vs competitive" -> esports, "brace" -> dental
 * braces. Plus thin answers for striker/forward, keeper types, the European
 * competitions and playmaker roles.
 */
export const SOCCER_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-soccer-transfer-vs-loan',
    title: 'Transfer vs loan (football)',
    category: 'sports',
    keywords: [
      'difference between a transfer and a loan in soccer', 'transfer vs loan football',
      'permanent move', 'temporary spell', 'transfer fee', 'loan fee and wage split', 'buy option',
      'registered to the parent club', 'not a bank transfer or bank loan', 'window',
    ],
    content: `In football these both move a player from one club to another, but for how long and who owns his registration differs. This is nothing to do with bank transfers or loans.

A transfer is a permanent move. The buying club pays the selling club a transfer fee (unless the player is out of contract, a "free transfer"), the player signs a new contract, and his registration now belongs to the new club for good. Transfers can only be completed during a transfer window.

A loan is a temporary move, usually for half a season or a full season. The player's registration stays with his parent club; the loan club pays a loan fee and typically covers some or all of his wages, and he returns to the parent club when the loan ends. Clubs loan out young players for game time and development, or fringe players to save on wages, and loan IN to cover a gap without paying a full fee. A loan can include an "option to buy" (the loan club may sign him permanently for a set fee) or an "obligation to buy" (it must, if certain conditions are met). A player generally cannot play against his parent club while on loan.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-man-vs-zonal-marking',
    title: 'Man marking vs zonal marking (football)',
    category: 'sports',
    keywords: [
      'difference between man marking and zonal marking', 'man marking vs zonal marking soccer',
      'track a specific opponent', 'defend a space', 'set piece defending', 'corners and free kicks',
      'hybrid marking', 'not the jet stream zonal flow', 'defensive organisation',
    ],
    content: `These are two ways a team organises its defending, especially at set pieces (corners, free kicks). This has nothing to do with the jet stream or "zonal flow" in weather.

Man marking (man-to-man): each defender is assigned a specific opponent and follows him wherever he goes, staying tight, contesting every ball he might receive. Strengths: clear responsibility, hard for an attacker to get free. Weaknesses: a clever runner can drag his marker out of position and open space; defenders end up ball-watching their man instead of the ball; blocks and screens ("picks") are effective against it.

Zonal marking: each defender is responsible for a fixed area of the pitch (or penalty box) and attacks any ball that comes into his zone, regardless of which opponent is there. Strengths: defenders face the ball and can attack it with momentum; harder to disrupt with runs and blocks; keeps defensive shape. Weaknesses: an attacker with a running jump can beat a stationary defender to a ball in his zone; the gaps between zones can be exploited.

Most modern teams use a hybrid: a few players zonally protecting key areas (near post, six-yard box) plus a couple of man-markers on the opposition's biggest aerial threats.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-header-vs-volley',
    title: 'Header vs volley (football)',
    category: 'sports',
    keywords: [
      'difference between a header and a volley', 'header vs volley soccer', 'ball struck with the head',
      'ball struck out of the air with the foot', 'before it bounces', 'half-volley', 'glancing header',
      'not a network packet header', 'finishing techniques',
    ],
    content: `Both are ways of striking a moving ball in football; this is not about packet headers in networking.

A header is playing the ball with your head — forehead for power and accuracy, the side of the head for a glancing flick. Used to score from crosses and corners, to clear the ball defensively, and to pass or knock the ball down for a teammate. A "glancing header" redirects the ball's existing pace with a slight touch; a "powered header" is driven with a snap of the neck and a jump.

A volley is striking the ball with your foot while it is still in the air, before it touches the ground. It is a hard technique because you have to time the swing and keep the ball down. Famous goals (Zidane's 2002 Champions League final, Van Basten in Euro 88) are volleys. A "half-volley" is striking the ball at the exact instant it bounces off the ground — slightly easier and very powerful.

So the difference is body part and moment: header = with the head; volley = with the foot, ball in the air, no bounce.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-cap-vs-appearance',
    title: 'Cap vs appearance (football)',
    category: 'sports',
    keywords: [
      'difference between a cap and an appearance in soccer', 'cap vs appearance football',
      'international match for your country', 'any match played for a club or country', 'earning a cap',
      'the tradition of the physical cap', 'not the atmospheric cap or renal cortex', 'senior debut',
    ],
    content: `This is football terminology, not meteorology (the atmospheric "cap"/"lid") or anatomy (the renal cortex).

An "appearance" is any match a player takes part in for a team — playing club league games, cup games, friendlies, or international matches all count as appearances. "150 appearances for the club" means he played in 150 matches.

A "cap" specifically means an appearance for your NATIONAL team in a recognised international match. "He won his 50th cap for England" means he has played 50 times for the national side. The term comes from the old British tradition of literally awarding a player an embroidered cap for each international he played; the physical caps are still given out (often one cap covering several games in a tournament) even though "cap" is now just a counting word.

So: every cap is an appearance (an international one), but most appearances are club appearances and are not caps. A player can have a huge club career and few or no caps if he was never picked for his country.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-nutmeg-vs-rainbow-flick',
    title: 'Nutmeg vs rainbow flick (football skills)',
    category: 'sports',
    keywords: [
      'difference between a nutmeg and a rainbow flick', 'nutmeg vs rainbow flick', 'panna',
      'ball through the legs', 'ball flicked up and over the head', 'skill move', 'okocha rabona',
      'not the optical secondary rainbow', 'beating a defender',
    ],
    content: `Both are football skill moves; this is not about optics or secondary rainbows in raindrops.

A nutmeg (also "panna", "megs") is pushing or poking the ball through the gap between an opponent's legs and collecting it on the other side, usually while dribbling past them or making a pass. It humiliates the defender and is a staple of street football; a whole street-football format (panna) is built around it.

A rainbow flick (also "reverse rainbow", "okocha") is a showboating move where the player, with the ball behind them, rolls it up the back of one leg with the other foot and flicks it up and forward over their own head (and often over a defender's head), then runs onto it. The ball's path traces an arc — hence "rainbow". It is high-risk, mostly used to beat a defender down the line or just to show off, and referees and opponents often consider it disrespectful.

Short version: a nutmeg goes through the legs along the ground; a rainbow flick goes up and over the head in an arc.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-set-piece-vs-open-play',
    title: 'Set piece vs open play (football)',
    category: 'sports',
    keywords: [
      'difference between a set piece and open play', 'set piece vs open play soccer', 'dead ball situation',
      'corner free kick penalty throw-in', 'restart', 'flowing continuous play', 'not a rugby scrum',
      'rehearsed routines', 'goals from set pieces',
    ],
    content: `In football (this is not about rugby scrums and rucks):

A set piece (dead-ball situation) is any restart of play from a stationary ball: a corner kick, a free kick (direct or indirect), a penalty kick, a throw-in, a goal kick, and the kick-off. Play has stopped, the ball is not moving, and teams can get organised — bring players forward, set up a wall, run rehearsed routines. A large share of goals (roughly a third at the top level) come from set pieces, so clubs spend a lot of training time on them, both attacking and defending.

Open play is everything else: the continuous, flowing phase when the ball is live and moving and both teams are contesting it in real time, without a stoppage. Goals "from open play" are scored during that flow rather than directly from a restart.

So the split is simply: is the ball dead and being restarted from a fixed spot (set piece), or is it live and in motion (open play)?`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-striker-vs-forward',
    title: 'Striker vs forward (football positions)',
    category: 'sports',
    keywords: [
      'difference between a striker and a forward', 'striker vs forward soccer', 'centre-forward number 9',
      'attacking players collectively', 'wingers and second striker', 'poacher target man',
      'the forward line', 'lone striker versus front three',
    ],
    content: `"Forward" is the broad category; "striker" is a specific role within it.

Forwards (or "attackers") are all the players whose main job is to create and score goals and who play highest up the pitch. This includes centre-forwards/strikers, wingers (wide forwards), and a "second striker" or "number 10" who plays just behind the main striker.

A striker (centre-forward, the classic number 9) is the central forward closest to the opponent's goal, the team's main goal threat and the focal point of the attack. Sub-types: a poacher lives in the box and finishes chances; a target man is big and strong, holds the ball up and wins headers to bring others in; a complete forward does a bit of everything; a false nine drops deep into midfield to drag defenders out and create space.

So every striker is a forward, but not every forward is a striker — a winger is a forward who is not a striker. A team playing 4-3-3 has three forwards (two wingers plus one striker); a team playing with "two up top" has two strikers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-keeper-vs-sweeper-keeper',
    title: 'Goalkeeper vs sweeper-keeper (football)',
    category: 'sports',
    keywords: [
      'difference between a goalkeeper and a sweeper keeper', 'sweeper-keeper', 'traditional shot-stopper',
      'high starting position', 'acts as an extra defender', 'plays out from the back', 'off the line',
      'Neuer Ederson', 'rushing out to clear through balls',
    ],
    content: `Every sweeper-keeper is a goalkeeper; "sweeper-keeper" describes a modern style of playing the position.

A traditional goalkeeper focuses on the core duties: shot-stopping, commanding the penalty area on crosses, organising the defence, and distribution. He mostly stays close to his line and inside his box.

A sweeper-keeper does all of that PLUS acts almost like an extra outfield defender. He takes up a much higher starting position (sometimes near the edge of the box or beyond), so he can rush out to "sweep up" through balls in behind a high defensive line and clear them before an attacker reaches them, and he is heavily involved in build-up play — comfortable with the ball at his feet, receiving back-passes under pressure and passing accurately to start attacks ("playing out from the back"). Manuel Neuer popularised the modern version; Ederson and Alisson are current examples.

The trade-off: a sweeper-keeper lets his team defend higher up the pitch and keep possession, but a misjudged sprint out of goal, or a mistake on the ball near his own box, is very costly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-champions-vs-europa-league',
    title: 'Champions League vs Europa League (vs Conference League)',
    category: 'sports',
    keywords: [
      'difference between the Champions League and the Europa League', 'UEFA club competitions',
      'top tier versus second tier', 'league position qualification', 'prize money and prestige',
      'Europa Conference League', 'winner gets a Champions League place', 'Big Ears trophy',
    ],
    content: `Both are annual UEFA competitions for European clubs, ranked by prestige and by how a club qualifies.

The UEFA Champions League is the top tier and the biggest club competition in the world. Clubs qualify by finishing high in their domestic league (the number of places per country depends on UEFA's coefficient ranking — the strongest leagues get four or five). It has by far the largest prize money, TV audience and prestige; the trophy is nicknamed "Big Ears". The reigning champions also qualify automatically.

The UEFA Europa League is the second tier. Clubs qualify by finishing a few places below the Champions League spots in their league, or by winning a domestic cup. It carries less money and prestige, but it matters: since 2015 the Europa League winners earn a place in the next season's Champions League. Sevilla have historically dominated it.

The UEFA Europa Conference League (from 2021) is a third tier for clubs from smaller nations and those finishing just below Europa League qualification; its winner is promoted to the Europa League.

So it is a pyramid: your league finish (and cup results) decide which of the three you enter, with the Champions League the elite tournament and routes upward for the winners of the lower two.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-hat-trick-vs-brace',
    title: 'Hat-trick vs brace (football goals)',
    category: 'sports',
    keywords: [
      'difference between a hat trick and a brace', 'hat-trick vs brace', 'three goals in a match',
      'two goals in a match', 'perfect hat-trick', 'match ball', 'not dental braces', 'cricket origin',
      'one player scoring',
    ],
    content: `Both describe how many goals ONE player scores in a single match. A "brace" has nothing to do with dental braces on teeth.

A brace is two goals by the same player in one match.

A hat-trick is three goals by the same player in one match. The player traditionally keeps the match ball. A "perfect hat-trick" is one goal with the right foot, one with the left, and one header. Four goals is sometimes called a "haul" and there is no fixed word beyond that (five is a "glut" informally).

The term "hat-trick" comes from cricket (a bowler taking three wickets with consecutive balls was rewarded with a hat), and it spread to football and hockey. "Brace" comes from an old hunting term for a pair of shot birds.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-friendly-vs-competitive',
    title: 'Friendly vs competitive match (football)',
    category: 'sports',
    keywords: [
      'difference between a friendly and a competitive match', 'friendly vs competitive fixture',
      'no points or trophy at stake', 'counts towards a league or cup', 'pre-season friendlies',
      'international friendlies', 'unlimited substitutions in friendlies', 'not an esports scrim',
    ],
    content: `In football (not esports scrims and best-of-series):

A friendly (exhibition match) has nothing at stake in terms of standings or silverware. Clubs play friendlies in pre-season to build fitness and try out players and tactics; national teams play friendlies on international break dates outside qualifiers and tournaments. Rules are relaxed — unlimited or rolling substitutions are allowed, the intensity is often lower, and results do not affect any table (though they do affect the FIFA rankings for international friendlies).

A competitive match counts towards something official: league points, cup progression, or a tournament. League games, domestic cup ties, Champions/Europa League games, World Cup and continental qualifiers and finals are all competitive. Standard substitution limits apply, cautions and suspensions carry over, and teams pick their strongest available sides.

So the test is simply whether the result changes a league position, a cup draw, or a trophy — competitive — or not — friendly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-sport-vs-game',
    title: 'Sport vs game (general)',
    category: 'sports',
    keywords: [
      'difference between a sport and a game', 'sport vs game', 'physical exertion and skill',
      'structured competition with rules', 'all sports are games', 'chess and video games as games not sports',
      'esports debate', 'athleticism', 'organised competition',
    ],
    content: `A game is any structured activity with rules, players, a goal, and a way to win or lose — from tag and cards to chess, board games and video games. Games can be purely mental, purely social, or physical.

A sport is a game that also requires significant physical exertion, athletic skill, and physical competition between the participants, governed by an organising body with standardised rules and competition. Football, tennis, swimming, athletics and boxing are sports.

So the usual view is that all sports are games, but not all games are sports — the extra requirement is physical athleticism and bodily competition. This is why chess ("a game", though it has competitive federations), darts and snooker (borderline — skill and governing bodies, limited exertion), and video games / esports (highly competitive and organised, but the physical demand is fine motor skill rather than whole-body athleticism) are argued about. The International Olympic Committee's own definition leans on physical exertion, which keeps most pure board and video games classed as games rather than sports.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-tackle-vs-challenge',
    title: 'Tackle vs challenge (football)',
    category: 'sports',
    keywords: [
      'difference between a tackle and a challenge in soccer', 'tackle vs challenge football',
      'winning the ball with the foot', 'any attempt to dispossess', 'slide tackle standing tackle',
      'aerial challenge shoulder challenge', 'not the rugby Challenge Cup or MTV Challenge',
      '50-50', 'fouls',
    ],
    content: `In football (not the rugby Challenge Cup or reality TV):

A "challenge" is the broad term for any attempt by a defender to win the ball from, or compete with, an opponent who has or is going for it. It covers tackling but also jumping for a header (an aerial challenge), using your body to hold someone off (a shoulder-to-shoulder challenge), and closing a player down to pressure him. A "50-50" is a challenge where both players have an equal chance of winning the ball. Referees judge whether a challenge is fair, careless (a foul), reckless (a yellow), or using excessive force (a red).

A tackle is a specific type of challenge: using your foot (or feet) to take the ball away from an opponent who is in possession. A standing tackle is done on your feet, poking or blocking the ball; a slide tackle is done by going to ground to reach it. A tackle is legal if you play the ball first and don't endanger the opponent; catching the player instead of the ball, or going in studs-up or two-footed, is a foul.

So every tackle is a challenge, but a challenge can also be an aerial duel or a shoulder barge that involves no tackle at all.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-playmaker-vs-box-to-box',
    title: 'Playmaker vs box-to-box midfielder (football roles)',
    category: 'sports',
    keywords: [
      'difference between a playmaker and a box to box midfielder', 'playmaker vs box-to-box',
      'creative passer dictates play', 'covers the whole pitch defends and attacks', 'number 10 deep-lying playmaker',
      'regista', 'stamina and all-round', 'Modric Xavi versus Vieira Gerrard',
    ],
    content: `Both are central midfield roles but they emphasise different things.

A playmaker is the team's chief creator — the player through whom attacks are built. His job is vision, first touch, and passing: finding teammates in space, threading through balls, switching play, and setting the tempo. Types: an attacking playmaker or "number 10" operates between the lines near the box (Zidane, De Bruyne); a deep-lying playmaker or "regista" sits in front of the defence and sprays passes from deep (Pirlo, Busquets, Xavi and Modric hybrids). A playmaker is not expected to cover huge distances or do heavy defensive work.

A box-to-box midfielder is defined by energy and all-round contribution: he gets from his own penalty box to the opponent's and back, over and over, defending alongside the back line one moment and arriving late in the attacking box the next. He tackles, carries the ball, presses, and chips in with goals and assists, but is usually not the single main creator. Stamina is the key trait (Vieira, Gerrard, Bellingham).

Short version: a playmaker supplies the creativity from a fixed zone; a box-to-box midfielder supplies the running and two-way work across the whole pitch.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-possession-vs-counter',
    title: 'Possession football vs counter-attacking football',
    category: 'sports',
    keywords: [
      'difference between possession and counter attacking football', 'possession vs counter-attack',
      'tiki-taka keep the ball', 'sit deep and break fast', 'controlling the game with the ball',
      'transitions', 'low block', 'Guardiola versus Mourinho or Simeone',
    ],
    content: `These are two contrasting team styles.

Possession football (associated with Guardiola, Barcelona's tiki-taka, Spain 2008-2012) is about keeping the ball for long spells, moving the opponent around with patient short passing until a gap opens, and defending by immediately trying to win the ball back when you lose it (counter-pressing) so the opponent never gets settled. The team usually has a high share of possession, plays a high defensive line, and dominates territory.

Counter-attacking football (associated with Mourinho's big-game plans, Simeone's Atletico, Leicester's 2016 title) is about deliberately giving the opponent the ball, defending in a compact, disciplined shape ("low block") deep in your own half, staying solid, and then breaking forward very fast the instant you win possession — hitting the space behind an opponent who has committed players forward, often with just three or four quick passes and pacey forwards.

So possession sides control the game WITH the ball; counter-attacking sides control it by conceding the ball, staying organised, and being lethal in transition. Many teams mix both depending on the opponent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-aggregate-vs-away-goals',
    title: 'Aggregate score vs away goals rule (two-legged ties)',
    category: 'sports',
    keywords: [
      'difference between aggregate score and away goals', 'two-legged tie', 'total goals over both legs',
      'tiebreaker for goals scored away from home', 'UEFA abolished away goals in 2021', 'extra time and penalties',
      'home and away legs', 'knockout rounds',
    ],
    content: `In a knockout round played over two legs (home and away), the "aggregate score" is simply the total goals each team scored across BOTH matches added together. If Team A wins 2-1 at home and loses 1-0 away, the aggregate is 2-2.

The "away goals rule" was a tiebreaker used when the aggregate was level: the team that had scored more goals AT THE OPPONENT'S GROUND went through. In the 2-2 example above, Team B scored 1 away goal and Team A scored 0 away, so Team B would advance. The rule was designed to reward attacking play away from home and reduce ultra-defensive second legs.

Important: UEFA ABOLISHED the away goals rule from the 2021-22 season. Now, if the aggregate is level after the second leg, the tie goes straight to 30 minutes of extra time and then a penalty shootout, with away goals counting the same as home goals throughout. Some other competitions still use away goals, so it depends on the tournament.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-derby-vs-rivalry',
    title: 'Derby vs rivalry (football)',
    category: 'sports',
    keywords: [
      'difference between a derby and a rivalry', 'derby vs rivalry football', 'local derby same city or region',
      'broader ongoing rivalry', 'El Clasico', 'Merseyside derby North London derby', 'geography',
      'historical political religious edge',
    ],
    content: `A rivalry is any long-running, intense competitive feud between two clubs, wherever they are — built up over decades of meeting in big matches, title races, controversial games and transfers. Real Madrid vs Barcelona (El Clasico) is the most famous rivalry in the world, fuelled by the two cities representing the Spanish state versus Catalan identity, but the clubs are 600 km apart.

A derby (local derby) is a specific kind of rivalry between two clubs from the SAME city or immediate region, so the fans live and work alongside each other. The Merseyside derby (Liverpool vs Everton), the Manchester derby, the North London derby (Arsenal vs Tottenham), the Milan derby (Inter vs Milan, who share a stadium), the Old Firm (Celtic vs Rangers in Glasgow) are derbies. The word may come from the Derby horse race or from local Shrovetide football in the town of Derby.

So all derbies are rivalries, but a rivalry only counts as a "derby" when geography puts the two sets of supporters in the same place. El Clasico is a rivalry, not strictly a local derby (though people loosely call it one); Real Madrid's local derby is against Atletico Madrid.`,
    createdAt: Date.now(),
  },
];
