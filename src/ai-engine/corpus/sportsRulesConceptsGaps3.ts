import { KnowledgeItem } from '../../types';

/**
 * SPORTS_RULES_CONCEPTS_GAPS_3 — batch 261 corrections. nexus-4b handled many
 * (deuce/advantage, match play/stroke play, birdie/bogey, touchdown/field goal,
 * down/first down, personal/technical foul, field goal/free throw, penalty/
 * power play, icing/offside, goal/assist, try/conversion, union/league, scrum/
 * ruck, marathon/sprint, freestyle/butterfly, over/innings). Misses:
 * - "fault vs let in tennis" answered about GEOLOGY faults.
 * - "heat vs final in track" answered about thermal energy.
 * - "relay vs individual race" was a web dump.
 * - "set vs match in tennis" garbled games/points and added a sexist claim.
 * - "Test cricket vs T20" said Test cricket is "50 overs per side".
 * - "wicket vs run in cricket" was a caught/run-out web dump.
 * - "coach vs manager in sports" answered about the sporting-director role.
 * - "Olympics vs Paralympics" called lawn bowls and netball Olympic sports.
 * - "home run vs grand slam", "block vs steal", "bowler vs batsman",
 *   "league vs tournament", "NFL vs college", "NBA vs FIBA" were cut.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'sports', keywords, content, createdAt: now,
});

export const SPORTS_RULES_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-sport3-fault-vs-let-tennis',
    'Fault vs let (tennis)',
    [
      'difference between a fault and a let in tennis', 'a fault is a serving error the served ball misses the correct service box hits the net and lands out or the server foot-faults two consecutive faults a double fault lose the point', 'a let is a replay call most commonly when a served ball clips the net cord but still lands in the correct service box the serve does not count no fault and it is taken again',
      'a let can also be called for an outside interruption a ball rolling onto court', 'not a geological fault',
    ],
    `In tennis (not geology):

A FAULT is a SERVING ERROR. It is called when the server:
- hits the serve into the net, or long, or wide of the correct service box;
- foot-faults (a foot touches the baseline or the wrong side of the centre mark before contact);
- misses the ball entirely on the toss-and-swing (in most rulebooks), or serves before the receiver is ready in a way that counts.
The server gets a SECOND serve after one fault. TWO consecutive faults is a "DOUBLE FAULT" and the server LOSES the point outright.

A LET is a "PLAY IT AGAIN, no harm done" call. The most common case: on the serve, the ball CLIPS THE TOP OF THE NET CORD but still drops into the CORRECT service box — that is a "let" (specifically a "net serve"), the serve simply does not count (it is NOT a fault), and the server takes that serve over, with the same number of serves remaining. (In the "no-let" rule used in some competitions and college tennis, a net serve that lands in is just played on.)
A let is also called during a rally for an outside INTERRUPTION — a stray ball rolling onto the court, a hindrance — and the whole point is replayed.

Short version: a fault costs the server (a bad serve; two in a row lose the point); a let costs nobody (redo the serve, or replay the point).`,
  ),
  k(
    'kb-gap-sport3-heat-vs-final-track',
    'Heat vs final (track and field, swimming)',
    [
      'difference between a heat and a final in track', 'a heat is a preliminary round race run when there are too many competitors to fit in one race athletes are split into several heats the fastest finishers from each heat plus sometimes the next-fastest overall times advance to the next round semifinals then the final', 'the final is the last decisive race the qualifiers compete and the finishing order determines the medals and placings',
      'automatic qualifier Q by place small q by time not thermal energy',
    ],
    `In track and field, swimming, cycling, and similar timed sports (this is not "heat" as thermal energy):

A HEAT is a PRELIMINARY / qualifying round. When an event has more entrants than can race at once (a 100 m track has 8-9 lanes; an Olympic 100 m might have 50+ sprinters), the field is divided into several HEATS run separately. From each heat, the top few finishers ADVANCE — usually the automatic qualifiers "Q" (advancing by PLACE, e.g. the first 3 in each heat) plus a number of "q" (advancing by fastest TIME among the non-automatic qualifiers across all heats). Big events have multiple rounds: heats -> quarterfinals -> semifinals -> final.

The FINAL is the LAST, decisive race of the event. Only the athletes who qualified through the heats (and semis) line up, and their FINISHING ORDER in this one race determines the WINNER, the medals, and all the final placings. There is no "advancing" from a final — it is the end.

So heats sort a large field down to the best few; the final decides who actually wins. Athletes often "coast" in heats — doing just enough to qualify while saving energy — and go all-out only in the final.`,
  ),
  k(
    'kb-gap-sport3-relay-vs-individual-race',
    'Relay vs individual race',
    [
      'difference between a relay and an individual race', 'an individual race is contested by single athletes competing on their own one person covers the whole distance results are individual', 'a relay is a team race the distance is divided into legs and teammates take turns in track each runner sprints a leg then passes a baton within a marked exchange zone 4x100m 4x400m in swimming each swimmer swims a leg and the next starts when they touch the wall medley relay each swims a different stroke',
      'a bad baton pass or an early exchange can disqualify the whole team the medal goes to the team',
    ],
    `An INDIVIDUAL race is contested by SINGLE athletes racing on their own. One person covers the ENTIRE distance (100 m, 1500 m, a marathon, 200 m freestyle), and the result is theirs alone — the medal, the record, the placing.

A RELAY is a TEAM race in which the total distance is split into LEGS and teammates take turns, each running or swimming ONE leg:
- TRACK relays (4x100 m, 4x400 m, and mixed 4x400 m): each runner sprints their leg and must hand a hollow BATON to the next runner within a marked "exchange zone" (about 20-30 m long) — the pass must happen inside that zone or the team is disqualified, and a dropped baton is disaster. The baton, not the runner, must cross the finish line.
- SWIMMING relays (4x100 m freestyle, 4x200 m free, 4x100 m MEDLEY where each swimmer does a different stroke — back, breast, fly, free): each swimmer completes their leg and touches the wall; the NEXT swimmer may not leave the block until the previous one touches (an early start = disqualification of the team).

In a relay the whole TEAM shares one result — one time, one medal each, and one team is disqualified if any single leg breaks the rules. Relay tactics include the running order (often fastest leadoff or fastest anchor) and, in track, the "acceleration" pass where the outgoing runner is already sprinting when they receive the baton.`,
  ),
  k(
    'kb-gap-sport3-set-vs-match-tennis',
    'Set vs match (tennis scoring)',
    [
      'difference between a set and a match in tennis', 'the scoring hierarchy is points then games then sets then match', 'a game is won by the first player to 4 points love 15 30 40 game with a 2-point margin deuce and advantage at 40-40', 'a set is won by the first to 6 games with a 2-game margin at 6-6 a tiebreak first to 7 points 2 clear usually decides it',
      'a match is won by taking the majority of sets best of 3 first to 2 sets or best of 5 first to 3 sets mens Grand Slams women play best of 3 by rule',
    ],
    `Tennis scoring is a nested hierarchy: POINTS build GAMES, games build SETS, and sets decide the MATCH.

A GAME: won by the first player to reach 4 POINTS — scored oddly as love (0), 15, 30, 40, game — with a margin of at least 2 points. If both reach 40 ("DEUCE"), a player must win 2 points in a row: the first is "ADVANTAGE", the second wins the game; lose the advantage point and it goes back to deuce.

A SET: won by the first player to reach 6 GAMES with a lead of at least 2 games (6-4, 7-5). If the games reach 6-6, a TIEBREAK is played — first to 7 POINTS, win by 2 (some final sets at Grand Slams use a 10-point tiebreak at 6-6). So a set is a race to 6 games; a match is not.

A MATCH: won by taking the MAJORITY of a set number of sets:
- BEST OF 3: first player to win 2 sets — used for all women's professional matches and most men's matches;
- BEST OF 5: first player to win 3 sets — used for men's singles at the four Grand Slams (Australian Open, French Open, Wimbledon, US Open).
Women play best of 3 by the RULES of the tour, not because of ability.

So a set is one chunk of the match (about 45-70 minutes); the match is the whole contest, decided when someone wins the required number of sets.`,
  ),
  k(
    'kb-gap-sport3-test-vs-t20-cricket',
    'Test cricket vs T20 (and ODI)',
    [
      'difference between Test cricket and T20', 'Test cricket lasts up to 5 days each side bats TWO innings there is NO over limit per innings played in whites with a red ball the oldest and most prestigious format', 'T20 Twenty20 is 20 overs per side one innings each about 3 hours coloured kit white ball entertainment-focused',
      'the 50-overs-per-side format is the One Day International ODI not Test cricket', 'a Test can end in a draw if not finished T20 cannot',
    ],
    `Three formats of international cricket, differing mainly in LENGTH.

TEST CRICKET is the longest and oldest form. A match lasts up to FIVE DAYS. Each team bats TWO innings ("first innings" and "second innings"), and there is NO LIMIT on the number of overs per innings — an innings ends only when 10 wickets fall, the batting captain "declares", or (in the fourth innings) the target is reached. Played in white clothing with a RED ball, over multiple sessions a day. A Test can end in a DRAW if neither side has won by the end of day five, which makes it a strategic, attritional game. There is no substitute; the two teams' pace bowlers, spinners, and batters grind it out.

T20 (Twenty20) is the shortest form. Each team bats ONE innings of a MAXIMUM 20 OVERS (so ~120 balls). The whole match lasts about 3 hours. Played in COLOURED kit with a WHITE ball, often at night under lights, with fireworks and music — designed as fast, aggressive entertainment. Batters attack from the first ball; there is no draw (a tie goes to a "Super Over"). The IPL, Big Bash, and the T20 World Cup use this format.

Between them is the ONE DAY INTERNATIONAL (ODI): 50 OVERS per side, one innings each, one day. (The "50 overs per side" figure belongs to ODI cricket, NOT to Test cricket, which has no over limit.)`,
  ),
  k(
    'kb-gap-sport3-wicket-vs-run-cricket',
    'Wicket vs run (cricket)',
    [
      'difference between a wicket and a run in cricket', 'a run is the unit of scoring the batters run to exchange ends 1 run per completed length or hit boundaries 4 if the ball reaches the rope along the ground 6 if it clears it on the full plus extras byes leg byes wides no-balls', 'a wicket has two meanings the physical target three stumps topped by two bails and a dismissal when a batter is out bowled caught LBW run out stumped',
      'runs are what you score wickets are what you lose the score is stated as runs for wickets 220 for 5 an innings ends when 10 of the 11 batters are out all out',
    ],
    `RUNS are how you SCORE in cricket. The batters score by:
- physically RUNNING between the two sets of stumps after hitting the ball — one "run" for each completed length exchanged (they can run 1, 2, 3);
- hitting a BOUNDARY — 4 runs if the ball crosses the boundary rope having touched the ground, 6 runs if it clears the rope on the full;
- EXTRAS — runs given to the batting side without the bat scoring them: wides, no-balls (the bowler's fault), and byes / leg byes (the ball evades the keeper).
The team's total is its runs.

A WICKET has TWO meanings:
1. The physical TARGET at each end: three wooden STUMPS driven into the ground, with two small wooden BAILS balanced on top. The bowler is trying to hit it; the batter is defending it.
2. A DISMISSAL. When a batter is OUT — bowled (ball hits the stumps), caught, leg-before-wicket (LBW), run out, stumped, hit wicket — the fielding side has "taken a wicket". Each team has 11 batters; once 10 are out the innings ends ("all out"), because the last batter has no partner.

So: RUNS are what the batting side gains; WICKETS are what it loses (one per dismissal). A score is quoted as "RUNS for WICKETS" — e.g. "England 250 for 4" means 250 runs scored, 4 batters out.`,
  ),
  k(
    'kb-gap-sport3-bowler-vs-batsman-cricket',
    'Bowler vs batsman (cricket)',
    [
      'difference between a bowler and a batsman in cricket', 'a bowler is the fielding-side player who delivers bowls the ball toward the batter aiming to dismiss them hit the stumps induce a catch get an LBW or restrict runs bowlers deliver in overs of 6 balls fast pace bowlers or spinners', 'a batsman or batter is the batting-side player who defends their wicket and scores runs by hitting the ball two batters are at the crease at once one at each end batting in a set order until dismissed',
      'an all-rounder does both well the bowler attacks the batter defends and scores',
    ],
    `At any moment in cricket, one side is FIELDING (11 players out) and the other is BATTING (2 players in the middle, the rest waiting).

A BOWLER is a FIELDING-side player whose job is to DELIVER the ball toward the batter and try to get them OUT — by hitting the stumps ("bowled"), trapping them leg-before-wicket, inducing an edge that is caught, or tempting a false shot — and, failing that, to RESTRICT the runs scored. Bowlers deliver in "OVERS" of 6 legal balls, then a different bowler bowls the next over from the other end. They specialise as FAST (pace) bowlers, who rely on speed, swing, and bounce, or SPINNERS, who rely on turning the ball off the pitch with finger or wrist spin. A bowler's key stats are wickets taken and "economy rate" (runs conceded per over).

A BATSMAN / BATTER is a BATTING-side player whose job is to DEFEND their wicket (not get out) and SCORE RUNS by hitting the ball into gaps and to the boundary. Two batters are on the field at once — one at each end (the "striker" faces the current ball, the "non-striker" backs up) — and the team bats in a fixed ORDER (openers, middle order, tail) until each is dismissed. A batter's key stats are runs scored and "average" (runs per dismissal).

An ALL-ROUNDER is a player skilled at BOTH — a valuable asset because they do two jobs. The bowler is on the attack; the batter is trying to survive and score.`,
  ),
  k(
    'kb-gap-sport3-homerun-vs-grandslam',
    'Home run vs grand slam (baseball)',
    [
      'difference between a home run and a grand slam in baseball', 'a home run is a hit where the batter circles all the bases and scores in one play almost always by hitting the ball over the outfield fence in fair territory it scores the batter plus any runners already on base 1 to 4 runs', 'a grand slam is a specific maximum home run a home run hit when the bases are loaded runners on first second and third so it scores 4 runs the batter plus all three runners',
      'a grand slam is a home run the term for one with the bases full the phrase is borrowed by tennis and golf for winning all four majors',
    ],
    `A HOME RUN is a batted ball that lets the batter round ALL FOUR bases and score in a single play — nearly always by hitting the ball OVER the outfield fence in FAIR territory (an "inside-the-park home run", where the batter circles the bases on a ball still in play, is rare). It always scores the batter PLUS any teammates who were already on base, so a home run is worth 1, 2, 3, or 4 runs depending on how many runners were on.

A GRAND SLAM is a specific KIND of home run: one hit when the bases are LOADED — that is, there is a runner on FIRST, SECOND, AND THIRD base. Because all three runners plus the batter score, a grand slam produces the MAXIMUM 4 RUNS from one swing. It is the biggest single play in baseball and often a game-turner.

So the relationship: every grand slam IS a home run; "grand slam" is simply the name for a home run hit with the bases full (4 RBIs). A "solo home run" (nobody on) scores 1, a "two-run homer" scores 2, a "three-run homer" scores 3, and a grand slam scores 4.

(The phrase "grand slam" is borrowed by other sports — tennis and golf use it to mean winning all four major championships in one year; it comes originally from the card game bridge.)`,
  ),
  k(
    'kb-gap-sport3-block-vs-steal-basketball',
    'Block vs steal (basketball)',
    [
      'difference between a block and a steal in basketball', 'a block is when a defender legally deflects or stops a shot attempt knocking the ball away as the offensive player tries to score without hitting the shooters hand or arm illegally or catching it on the way down which is goaltending', 'a steal is when a defender legally takes the ball away from the offense during a pass or a dribble intercepting a pass or knocking the ball loose from a dribbler and gaining possession',
      'a block prevents a shot a steal takes possession from a ball-handler both are individual defensive stats',
    ],
    `Both are defensive plays, but they happen at different moments.

A BLOCK (blocked shot) occurs when a defender legally DEFLECTS or STOPS a SHOT ATTEMPT — swatting or pinning the ball as the offensive player is trying to put it in the basket. To count as a clean block the defender must hit the BALL, not the shooter's hand, wrist, or arm (that is a foul), and must not touch the ball on its DOWNWARD arc toward the rim or while it is on the rim/backboard (that is GOALTENDING, which awards the basket). A great block can send the ball out of bounds (still the offense's ball) or, better, be kept in play by the blocking team.

A STEAL occurs when a defender legally GAINS POSSESSION of the ball from the OFFENSE while the offense still has it — by INTERCEPTING a pass, or by knocking the ball loose from a DRIBBLER and recovering it, or picking it off a careless ball-handler. A steal directly turns the ball over to the defensive team and often leads to a fast-break score.

The key difference: a BLOCK stops a shot from going in (the offense usually keeps trying to score or rebound); a STEAL takes the ball AWAY from a passer or dribbler and flips possession. Both are tracked as individual stats, and a player who racks up both (plus rebounds and assists) alongside points is chasing a "5x5" or a triple-double.`,
  ),
  k(
    'kb-gap-sport3-coach-vs-manager-sports',
    'Coach vs manager (in sports)',
    [
      'difference between a coach and a manager in sports', 'the terms and division of labour vary by sport and country', 'US sports NFL NBA MLB NHL the head coach or manager in baseball runs the team on the field sets tactics picks the lineup makes in-game decisions runs practice a separate general manager GM handles roster trades drafts and contracts off-field', 'British and European soccer the manager traditionally does both picks the team sets tactics and has a major say in transfers the gaffer a head coach is a narrower training-and-tactics role under a sporting director who handles recruitment',
    ],
    `The titles "coach" and "manager" are used differently depending on the sport and the country, and the split of duties is really "who runs the team on game day" vs "who builds the roster".

In NORTH AMERICAN team sports (NFL, NBA, NHL — and MLB where the on-field boss is called the "manager"):
- the HEAD COACH runs the team on the FIELD/COURT — designs the game plan, calls plays, sets the starting lineup and rotations, makes substitutions and in-game decisions, and runs training;
- a separate GENERAL MANAGER (GM) handles the OFF-FIELD business — signing and trading players, the draft, contracts, salary-cap management, and hiring/firing the head coach.
So the coach coaches; the GM builds the squad.

In traditional BRITISH and much of European SOCCER:
- the MANAGER (the "gaffer" / "boss") traditionally does BOTH jobs — picks the team and tactics AND has the decisive say in which players the club buys and sells;
- a "HEAD COACH" is a narrower role — training and match tactics only — working UNDER a "SPORTING DIRECTOR" / "director of football" who runs recruitment, contracts, the academy, and the club's playing philosophy. This "continental model" splits the manager's old power in two, and English clubs have increasingly moved to it.

So: US = coach (on-field) + GM (off-field); classic English soccer = one all-powerful manager; modern soccer = head coach + sporting director.`,
  ),
  k(
    'kb-gap-sport3-olympics-vs-paralympics',
    'Olympics vs Paralympics',
    [
      'difference between the Olympics and the Paralympics', 'the Olympic Games are the elite multi-sport event for the worlds top able-bodied athletes run by the IOC', 'the Paralympic Games are the equivalent elite multi-sport event for athletes with a range of physical visual and intellectual disabilities using classification systems to group athletes fairly run by the IPC',
      'since 1988 held in the same host city immediately after the Olympics using the same venues many Paralympic sports are adapted wheelchair basketball para athletics blind football plus unique ones goalball boccia not lawn bowls or netball those are Commonwealth Games sports',
    ],
    `The OLYMPIC GAMES are the world's foremost multi-sport event for elite ABLE-BODIED athletes, held every four years (Summer and Winter Games alternating every two), run by the INTERNATIONAL OLYMPIC COMMITTEE (IOC), featuring about 200 national teams and ~30-40 sports (athletics, swimming, gymnastics, cycling, football, and so on). (Lawn bowls and netball are NOT Olympic sports — they are Commonwealth Games sports.)

The PARALYMPIC GAMES are the equivalent elite multi-sport event for athletes with DISABILITIES — physical impairments (limb loss, spinal cord injury, cerebral palsy, muscular conditions), visual impairment, and intellectual impairment. They are run by the INTERNATIONAL PARALYMPIC COMMITTEE (IPC). To keep competition fair, athletes are grouped by a CLASSIFICATION system based on how much their impairment affects performance in that sport.

Since the 1988 Seoul Games it has been the arrangement that the Paralympics are held in the SAME HOST CITY, immediately AFTER the Olympics, using the SAME venues and village.

Most Paralympic sports are ADAPTED versions of Olympic sports — wheelchair basketball, wheelchair rugby, para athletics and swimming, para cycling, sitting volleyball, blind (5-a-side) football, para alpine skiing — plus a few sports UNIQUE to the Paralympics, notably GOALBALL (played by visually impaired athletes with a bell-ball) and BOCCIA (a precision ball sport for athletes with severe impairments).`,
  ),
  k(
    'kb-gap-sport3-league-vs-tournament',
    'League vs tournament',
    [
      'difference between a league and a tournament', 'a league is an ongoing competition where a fixed set of teams play each other repeatedly over a season often home and away a double round-robin earning points for wins and draws the team with the most points at the end wins the title no single elimination a bad result is recoverable', 'a tournament is a self-contained competition usually shorter that produces a winner through a bracket or knockout structure single or double elimination and or a group stage followed by knockouts one bad game can end your run',
      'many sports combine both a league season for seeding then a knockout tournament the playoffs for the championship',
    ],
    `A LEAGUE is an ONGOING competition run over a whole SEASON. A fixed set of teams (or players) play each other REPEATEDLY — usually a "double round-robin" where everyone plays everyone else home AND away. You earn POINTS for results (e.g. 3 for a win, 1 for a draw in football; win/loss records in US sports), and the team with the most points at the end wins the TITLE. There is NO single-elimination — one bad result is just three dropped points that you can recover from over 30-plus more matches. It rewards CONSISTENCY over months. Examples: the Premier League, La Liga, the NBA regular season, county cricket.

A TOURNAMENT (or "cup") is a SELF-CONTAINED competition, usually over a shorter, concentrated period (a few weeks, or one weekend). It produces a winner through:
- a KNOCKOUT bracket — single elimination (lose once and you are out — the FA Cup, Wimbledon, March Madness) or double elimination;
- and/or a GROUP STAGE (a mini round-robin to whittle the field down) FOLLOWED by knockouts — the format of the FIFA World Cup, the Champions League, and most international competitions.
One bad game — or one penalty shootout — can end your run regardless of how well you have played. It rewards PEAKING at the right moment.

Many sports use BOTH: a long LEAGUE season to establish standings and seeding, then a short knockout TOURNAMENT (the "playoffs" or "finals series") to crown the champion — as in the NBA, NHL, NFL, MLB, and the AFL.`,
  ),
  k(
    'kb-gap-sport3-inning-vs-atbat',
    'Inning vs at-bat (baseball)',
    [
      'difference between an inning and an at-bat in baseball', 'an inning is a division of the game there are nine innings each with a top half visiting team bats home team fields and a bottom half home team bats a half-inning ends when the batting team records 3 outs', 'an at-bat or plate appearance is one batters turn to face the pitcher it ends when the batter reaches base is put out or the inning ends',
      'a plate appearance counts walks and hit-by-pitch an official at-bat excludes them for the batting-average denominator',
    ],
    `An INNING is a DIVISION of a baseball game. A standard game has NINE innings (more if tied — "extra innings"). Each inning has TWO halves:
- the TOP half — the VISITING (away) team bats, the home team fields;
- the BOTTOM half — the HOME team bats, the visitors field.
A half-inning ENDS when the fielding side records THREE OUTS against the batting side. So over one full inning, each team gets one turn to bat and try to score.

An AT-BAT (more precisely a "plate appearance") is one BATTER'S TURN to face the pitcher. It BEGINS when the batter steps into the batter's box and ENDS when that batter:
- reaches base (a hit, a walk, hit-by-pitch, an error, a fielder's choice);
- is put OUT (strikeout, groundout, flyout, etc.);
- or the half-inning ends on the third out while they are batting.
A team works through its 9-man batting ORDER, and after the 9th batter it cycles back to the 1st.

(Statistical nuance: a PLATE APPEARANCE counts every trip to the plate; an official "AT-BAT" for batting-average purposes EXCLUDES walks, hit-by-pitches, sacrifice bunts/flies, and catcher's interference — so a player can have 4 plate appearances but only 3 "at-bats".)

Rough scale: a plate appearance lasts a minute or two; a half-inning a few minutes; a full inning ~15-20 minutes; a nine-inning game ~3 hours.`,
  ),
  k(
    'kb-gap-sport3-al-vs-nl-baseball',
    'American League vs National League (MLB)',
    [
      'difference between the American League and the National League', 'the AL and NL are the two leagues that make up Major League Baseball merged operations in 2000 before that legally separate with their own presidents and rules', 'historically the biggest difference was the designated hitter the AL used a DH since 1973 the NL made pitchers bat as of 2022 the DH is universal in both leagues erasing that gap',
      'each league has 15 teams in 3 divisions teams mostly play within their league the champions meet in the World Series each league has its own All-Star team',
    ],
    `The AMERICAN LEAGUE (AL, founded 1901) and the NATIONAL LEAGUE (NL, founded 1876) are the two "leagues" that together make up MAJOR LEAGUE BASEBALL. Until 2000 they were legally SEPARATE organisations, each with its own president and the power to set some of its own rules; since 2000 they have been administrative divisions of a single MLB.

The historically SIGNIFICANT difference was the DESIGNATED HITTER (DH):
- from 1973 the AL used a DH — a batter who hits every time in place of the pitcher, who never comes to the plate;
- the NL kept the traditional rule that PITCHERS BAT for themselves.
This led to genuinely different STRATEGY: NL managers did more bunting, more pinch-hitting, and "double switches" to manage the pitcher's spot in the order, while AL lineups were deeper and higher-scoring.

As of the 2022 season the DH is UNIVERSAL — BOTH leagues use it — so that difference is now GONE.

What remains is largely organisational and historical:
- each league has 15 teams in 3 divisions (East, Central, West);
- teams play MOSTLY within their own league, with a limited "interleague" schedule;
- the AL and NL pennant winners meet in the WORLD SERIES each October;
- each league fields its own team in the ALL-STAR GAME;
- and the umpiring crews and some traditions still carry a league identity.

So today "which league?" is mostly a matter of which division bracket and which World Series side a team is on.`,
  ),
];
