import { KnowledgeItem } from '../../types';

export const OTHER_SPORTS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-othersports-basketball-basics',
    title: 'Basketball Basics: Rules, Positions, and the NBA',
    category: 'Daily Life',
    keywords: [
      'basketball rules', 'nba', 'basketball positions', 'point guard', 'center', 'three pointer',
      'shot clock', 'basketball basics', 'how does basketball work', 'nba playoffs',
    ],
    content: `Basketball is played 5-on-5, with the goal of shooting a ball through the opponent's elevated hoop more times than they score on yours. A made basket is worth 2 points from inside the three-point line, 3 points from beyond it, and 1 point per free throw (an uncontested shot awarded after certain fouls). NBA games are 48 minutes across four 12-minute quarters; a 24-second shot clock forces a team to attempt a shot within that window or lose possession, which is why NBA basketball moves so much faster than, say, a stalling soccer match. The five traditional positions are point guard (primary ball-handler/playmaker), shooting guard, small forward, power forward, and center (traditionally the tallest player, near the basket) — though modern "positionless basketball" blurs these roles heavily, with many players expected to shoot, pass, and defend across multiple spots. The NBA season runs roughly October to June, ending with a best-of-seven Finals series between the winners of the Eastern and Western Conference playoffs. Common terms: a "dunk" is scoring by forcefully putting the ball directly through the hoop; an "assist" is a pass that directly leads to a teammate's score; a "rebound" is recovering the ball after a missed shot; a "triple-double" (10+ in three statistical categories, usually points/rebounds/assists in one game) is considered a mark of an elite all-around performance.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-othersports-tennis-basics',
    title: 'Tennis Basics: Scoring, the Grand Slams, and Court Basics',
    category: 'Daily Life',
    keywords: [
      'tennis rules', 'tennis scoring', 'love in tennis', 'grand slam tennis', 'wimbledon', 'us open tennis',
      'french open', 'australian open', 'tennis basics', 'how does tennis scoring work',
    ],
    content: `Tennis scoring is famously non-intuitive: points within a game go 0 ("love"), 15, 30, 40, then game — a player must win by at least 2 points, so a 40-40 tie ("deuce") requires winning two points in a row (the first is "advantage") to take the game. Games are grouped into sets (first to 6 games, win by 2, with a tiebreak usually played at 6-6), and matches are best-of-3 sets (most WTA/women's matches, and men's matches outside majors) or best-of-5 (men's Grand Slam matches). The four Grand Slam tournaments — tennis's most prestigious events — are the Australian Open (hard court, January), the French Open/Roland-Garros (clay court, May-June), Wimbledon (grass court, June-July, the oldest and most traditional, with a strict all-white dress code), and the US Open (hard court, August-September). Court surface meaningfully changes how the game plays: clay slows the ball and produces longer rallies (favoring patient, defensive players), grass produces low, fast bounces (favoring aggressive serve-and-volley play, though this style has become rarer even at Wimbledon), and hard court sits in between. A "Grand Slam" (capital-S, the achievement) means winning all four majors in the same calendar year — an extremely rare feat; winning all four across a career (not necessarily the same year) is called a "career Grand Slam."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-othersports-combat-sports',
    title: 'Boxing and MMA Basics: Scoring, Weight Classes, and the UFC',
    category: 'Daily Life',
    keywords: [
      'boxing rules', 'mma rules', 'ufc', 'weight classes boxing', 'how is boxing scored', 'tko', 'ko',
      'submission mma', 'boxing basics', 'mma basics', 'octagon',
    ],
    content: `Boxing matches are scored round-by-round (typically 3-minute rounds, up to 12 rounds at the professional championship level) using the "10-point must" system — the winner of a round gets 10 points, the loser 9 or fewer, and judges' scorecards are totaled at the end if no knockout occurs. A KO (knockout) ends the fight immediately when a fighter can't continue (usually knocked down and unable to get up within a 10-count); a TKO (technical knockout) happens when the referee or a fighter's own corner stops the fight because they're taking excessive, unanswered damage, even if not literally knocked unconscious. MMA (mixed martial arts — the UFC is by far its largest and most well-known promotion) combines striking (boxing, kickboxing, Muay Thai) with grappling (wrestling, Brazilian jiu-jitsu) inside an eight-sided fenced ring commonly called "the Octagon." MMA fights can end by KO/TKO, submission (a fighter taps out or verbally submits when caught in a joint lock or chokehold rather than risk injury/unconsciousness), or judges' decision if it goes the distance (typically three 5-minute rounds, or five rounds for championship/main-event fights). Both sports organize fighters into weight classes (boxing has 17 recognized professional divisions from strawweight to heavyweight; the UFC has similar tiered divisions) specifically so fighters of wildly different size never compete against each other.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-othersports-baseball-nfl-basics',
    title: 'Baseball and American Football (NFL) Basics',
    category: 'Daily Life',
    keywords: [
      'baseball rules', 'mlb', 'how does baseball work', 'innings', 'strike out', 'home run',
      'nfl rules', 'american football rules', 'touchdown', 'super bowl', 'down and distance',
    ],
    content: `Baseball is played over 9 innings, each split into a top half (the visiting team bats) and bottom half (the home team bats); a team's turn at bat ends after 3 outs (recorded via a strikeout — 3 missed/called strikes — a fly ball caught before it hits the ground, or a runner tagged/thrown out). A batter reaches base safely by hitting the ball into fair territory and beating the throw, or by drawing a "walk" (4 pitches outside the strike zone). A home run — the ball hit over the outfield fence in fair territory — scores the batter and every runner already on base. MLB (Major League Baseball)'s season runs roughly April to October, ending in the World Series, a best-of-7 championship. American football (NFL) is organized around "downs" — a team gets 4 attempts (downs) to advance the ball 10 yards; succeeding resets the down count, failing after 4 attempts turns the ball over to the opponent (teams almost always punt — kick the ball away — on 4th down rather than risk losing possession deep in their own territory). A touchdown (6 points, carrying or catching the ball in the opponent's end zone) can be followed by an extra point kick (1 point) or a two-point conversion attempt; a field goal (3 points) is a kick through the goalposts, usually attempted when a team can't reach the end zone. NFL games are 60 minutes across four 15-minute quarters, and the season culminates in the Super Bowl, the single most-watched annual sporting broadcast in the United States.`,
    createdAt: Date.now(),
  },
];
