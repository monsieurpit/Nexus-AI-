import { KnowledgeItem } from '../../types';

// Batch 27 (sports rules) gap-fills. Live misses on nexus-4b:
// "penalty shootout in soccer" -> web dump ("Shootout is a method..." then
// Jonathan David bio); "what is a slam dunk" -> answered the tennis grand slam
// ("isn't some kind of basketball move"). Plus several thin/garbled answers.
export const SPORTS_RULES_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-penalty-shootout-soccer',
    title: 'How a Penalty Shootout Works (Soccer)',
    category: 'Sports',
    keywords: [
      'how does a penalty shootout work in soccer', 'penalty shootout rules', 'how does a soccer shootout work',
      'what happens after extra time in soccer', 'penalty kicks tiebreaker', 'sudden death penalties soccer',
    ],
    content: `A penalty shootout decides a knockout match that is still level after extra time. Each team picks five different players; they alternate taking one kick each from the penalty spot (11 m / 12 yards) against the opposing goalkeeper only. The team that has scored more of its five kicks wins. As soon as one team cannot be caught even with kicks remaining, it's over (so it often ends before all ten are taken). If the score is still tied after five kicks each, it goes to sudden death: one kick each per round, and the first team to lead after both have taken that round wins. Every outfield player (and the keeper) must take a kick before anyone goes again. A referee tosses a coin to decide which team kicks first and which goal is used. It's a tiebreaker only — the result counts as a draw for stats, with the winner advancing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-slam-dunk',
    title: 'What a Slam Dunk Is',
    category: 'Sports',
    keywords: [
      'what is a slam dunk', 'what is a dunk in basketball', 'how do you dunk', 'what is an alley oop', 'slam dunk meaning',
      'is a dunk worth more points', 'what is a posterizing dunk',
    ],
    content: `A slam dunk (or just "dunk") is a basketball shot where a player jumps up and throws the ball down through the hoop with one or both hands while their hand is at or above the level of the rim. It's the highest-percentage shot in the game (you're basically placing the ball in the basket) and the most spectacular, so it's a momentum and crowd play. It still counts as a normal field goal — two points (or three only if the shooter takes off from behind the three-point line, which essentially never happens). Variations: an alley-oop (a teammate lobs the ball near the rim and the jumper catches it in mid-air and dunks before landing), a reverse dunk, a windmill, and "posterizing" someone (dunking right over a defender). The NBA holds a Slam Dunk Contest at All-Star weekend. (This is unrelated to the tennis "Grand Slam.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tennis-scoring-full',
    title: 'How Tennis Scoring Works (Full Structure)',
    category: 'Sports',
    keywords: [
      'how does scoring work in tennis', 'tennis scoring explained', 'what is a set in tennis', 'what is a tiebreak in tennis',
      'how do you win a tennis match', 'best of three sets', 'why is tennis score 15 30 40', 'what is deuce and advantage',
    ],
    content: `Tennis scoring has four nested levels. POINTS within a game are called 0 ("love"), 15, 30, 40, then game — but you must win by two points, so 40–40 is "deuce," the next point is "advantage," and you need the point after that to take the game (lose it and it's back to deuce). GAMES: the first player to 6 games wins the SET, but again by a margin of two (7–5). At 6–6 they play a TIEBREAK: first to 7 points (win by two), and whoever wins it takes the set 7–6. MATCH: women play best-of-three sets, men's Grand Slams best-of-five. Players alternate serving each game, and switch ends after odd-numbered games. The odd 15/30/40 counting is thought to come from a medieval clock face (quarters), with "40" a shortening of "45."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-power-play-hockey',
    title: 'What a Power Play Is (Hockey)',
    category: 'Sports',
    keywords: [
      'what is a power play in hockey', 'power play meaning hockey', 'what is a penalty kill', 'what is a man advantage',
      'how long is a hockey penalty', 'what is a 5 on 3', 'what happens when you get a penalty in hockey',
    ],
    content: `When a player commits a penalty, they must sit in the penalty box (2 minutes for a minor, 5 for a major) and their team is not allowed to replace them, so it plays "short-handed." The team with the extra skater is said to be "on the power play" — usually 5 skaters against 4 — and has a much better chance to score because it can control the puck and outnumber the defenders. The short-handed team is "killing the penalty" (the penalty kill). A minor penalty ends early if the power-play team scores; a major runs the full 5 minutes regardless. If two players from the same team are in the box, it's a 5-on-3, a big advantage. Power plays typically convert around 20% of the time in the NHL.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-yellow-red-card',
    title: 'Yellow Card vs Red Card (Soccer)',
    category: 'Sports',
    keywords: [
      'what is a yellow card versus a red card', 'yellow card vs red card', 'what does a yellow card mean',
      'what does a red card mean', 'how many yellow cards is a red', 'what happens when you get a red card',
      'can a team replace a sent-off player',
    ],
    content: `A yellow card is a caution — an official warning for things like a reckless foul, dissent, time-wasting, or repeated minor fouls. A second yellow card in the same match is automatically shown alongside a red card, and the player is sent off. A straight (direct) red card is for serious offences: violent conduct, a dangerous or brutal tackle, spitting, deliberate handball or a foul that denies an obvious goal-scoring opportunity, or offensive language. A sent-off player must leave the field and cannot be replaced, so their team plays the rest of the match a player short (10 v 11). Red cards also carry a suspension for the next match(es); yellow cards accumulate across a competition and trigger a one-game ban once a player reaches a set total.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rugby-union-vs-league',
    title: 'Rugby Union vs Rugby League',
    category: 'Sports',
    keywords: [
      'what is the difference between rugby union and rugby league', 'rugby union vs rugby league', 'union vs league rugby',
      'how many players in rugby union', 'how many players in rugby league', 'what is a ruck vs a play the ball',
    ],
    content: `They are two separate codes that split in 1895. Rugby UNION: 15 players a side; when a player is tackled the ball stays live and both teams contest it on the ground in a "ruck" (and standing in a "maul"); play restarts from touch with a "lineout" (players lifted to catch a throw-in); scrums involve 8 forwards and are properly contested. Scoring: try 5, conversion 2, penalty/drop goal 3. Rugby LEAGUE: 13 players a side; after a tackle the game stops and the tackled player rolls the ball back with their foot ("play-the-ball"), and a team gets six of these tackles before it must hand over possession (like American football downs), which makes it faster and more structured; no lineouts, and scrums are uncontested formalities. Scoring: try 4, conversion 2, penalty goal 2, drop goal 1. Union is the more globally widespread game (the Rugby World Cup); league is strongest in northern England and eastern Australia.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lbw-cricket',
    title: 'What LBW (Leg Before Wicket) Is in Cricket',
    category: 'Sports',
    keywords: [
      'what is an lbw in cricket', 'leg before wicket explained', 'lbw rule cricket', 'how does lbw work',
      'when is a batsman out lbw', 'why is lbw controversial',
    ],
    content: `LBW ("leg before wicket") is a way of being dismissed in cricket: the batter is out if the ball would have gone on to hit the stumps but was stopped by hitting the batter's body (usually the pads/legs) first, instead of the bat. For the umpire to give it out, several conditions must be met: the ball must not have pitched (bounced) outside the line of leg stump; it must strike the batter in line with the stumps (or outside off stump only if the batter made no genuine attempt to play a shot); and, in the umpire's judgment, it must have been going on to hit the wicket. The batter is NOT out if they hit the ball with the bat first. It's one of cricket's most debated decisions, which is why the "Decision Review System" uses ball-tracking technology to predict the ball's path.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-try-rugby',
    title: 'What a Try Is (Rugby)',
    category: 'Sports',
    keywords: [
      'what is a try in rugby', 'how many points is a try', 'how do you score a try', 'what is a conversion in rugby',
      'what is the in-goal area', 'why is it called a try', 'grounding the ball rugby',
    ],
    content: `A try is the main way to score in rugby — you carry or kick the ball into the opposition's in-goal area (behind their goal line) and "ground" it by pressing it down to the turf with a hand, arm or the front of the torso while in control. It is worth 5 points in rugby union and 4 in rugby league. Scoring a try also earns your team a "conversion": a free kick at goal (through the uprights, above the crossbar) taken from a spot in line with where the ball was grounded, worth 2 more points — so scoring near the middle of the posts makes the conversion easier. It's called a "try" because historically grounding the ball scored nothing itself; it only earned the chance to "try" a kick at goal, and over time the try became the more valuable part.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-volleyball-scoring',
    title: 'How Volleyball Scoring Works',
    category: 'Sports',
    keywords: [
      'how does the scoring work in volleyball', 'volleyball scoring rules', 'how many points to win a volleyball set',
      'what is rally scoring', 'how many sets in volleyball', 'best of five sets volleyball', 'what is a deciding set',
    ],
    content: `Modern volleyball uses "rally scoring": a point is scored on every rally, whoever served (the ball hitting the floor in-bounds, going out, or a team's fourth touch or net violation all end the rally). A set is won by the first team to 25 points, and you must win by at least 2, so a set can go to 26–24, 30–28, etc. Matches are best-of-five sets. If the match reaches a fifth, deciding set, that set is played only to 15 points (still win by 2). The winning team must also win the match by taking 3 sets. Teams rotate one position clockwise each time they win back the serve. (Beach volleyball differs: two players a side, sets to 21, deciding set to 15, best-of-three.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knockout-boxing',
    title: 'Knockout (KO) vs Technical Knockout (TKO) in Boxing',
    category: 'Sports',
    keywords: [
      'what is a knockout in boxing', 'what is a KO', 'what is a TKO', 'difference between KO and TKO',
      'what is a standing eight count', 'how does a boxing match end', 'what does it mean to be knocked out',
    ],
    content: `A knockout (KO) ends a fight when a boxer is knocked down and cannot get back to their feet, ready to continue, before the referee counts to ten. The fighter does not have to be unconscious — just unable to beat the count. A technical knockout (TKO) is when the fight is stopped for a fighter's safety even though they weren't counted out: the referee decides they can no longer defend themselves, the ringside doctor stops it, or the fighter's own corner "throws in the towel." Three knockdowns in one round can also trigger an automatic TKO in some rules. If neither fighter is stopped, the bout goes the scheduled number of rounds and is decided on the judges' scorecards (a decision), or ends in a draw. A "flash knockdown" is a quick drop the fighter pops straight back up from.`,
    createdAt: Date.now(),
  },
];
