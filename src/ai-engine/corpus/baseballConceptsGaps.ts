import { KnowledgeItem } from '../../types';

/**
 * BASEBALL_CONCEPTS_GAPS — batch 267 corrections. First-ever dedicated
 * baseball batch. Worst sports result yet: 16 misses out of 25, including
 * TWO separate wrong-sport hallucinations (hockey's AHL/NHL, and a random
 * 1992 baseball MOVIE + an NFL quarterback bio) plus a CRICKET term ("run
 * between the stumps") bleeding into an RBI answer — confirms the
 * cross-sport-contamination pattern seen in the hockey and basketball
 * batches extends to a THIRD sport in a row. nexus-4b handled well: starting
 * pitcher/relief pitcher, closer/setup man, walk/hit-by-pitch, AL/NL,
 * sacrifice bunt/sacrifice fly, World Series/LCS, foul ball/foul tip. Misses:
 * - "single vs double" flatly DENIED these terms exist in baseball at all —
 *   they're extremely standard base-hit terminology.
 * - "error vs hit" was a pure web dump defining what an "inning" is, never
 *   touching the actual question.
 * - "designated hitter vs pitcher batting" ranted about NL history and never
 *   actually defined what a DH is.
 * - "wild pitch vs passed ball" described BOTH as "the catcher's fault",
 *   erasing the entire point of the distinction (wild pitch = pitcher's
 *   fault, uncatchable; passed ball = catcher's fault, was catchable).
 * - "pop fly vs line drive" wrongly described a pop fly as traveling far,
 *   and never explained line drive at all.
 * - "pinch hitter vs pinch runner" wrongly claimed a pinch hitter always
 *   substitutes specifically "for the pitcher" — a pinch hitter can sub for
 *   any batter in the lineup.
 * - "infield fly rule vs normal fly ball" got cut off right as it was about
 *   to explain the actual infield fly rule.
 * - "complete game vs shutout" seriously conflated the two — a complete game
 *   is about ONE PITCHER throwing every inning (regardless of runs allowed),
 *   not about shutting the other team out; the answer described a complete
 *   game as if it meant a shutout.
 * - "no-hitter vs perfect game" explained no-hitter fine then never
 *   contrasted with perfect game (no hits AND nobody reaches base at all).
 * - "batting average vs OBP" wrongly implied home runs are something OBP
 *   counts that batting average doesn't — a home run is already a hit,
 *   counted in both; the real OBP-only additions are walks and HBP.
 * - "double play vs triple play" only explained double play, never triple.
 * - "minor leagues vs Triple-A" hallucinated the NHL/AHL (hockey) answer.
 * - "rookie vs veteran" hallucinated a 1992 baseball MOVIE plot and an NFL
 *   quarterback's college career — total non-answer.
 * - "RBI vs run scored" was otherwise correct but injected CRICKET language
 *   ("run between the stumps") into a baseball explanation.
 * - "bunt vs check swing" explained bunt fine, never addressed check swing.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'baseball', keywords, content, createdAt: now,
});

export const BASEBALL_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-bb-minor-leagues-vs-triple-a',
    'Minor leagues vs Triple-A specifically (baseball, not hockey)',
    [
      'difference between the minor leagues and triple a specifically in baseball', 'this is about baseball not hockey there is no AHL or NHL here',
      'the minor leagues is the umbrella term for the entire multi level system of professional baseball below MLB itself organized in tiers from complex level and rookie ball up through single a high a double a and triple a',
      'triple a AAA is specifically the single HIGHEST level within that whole minor league system directly one step below the major leagues themselves players at triple a are considered essentially MLB ready and are the most likely to get called up',
      'so triple a is not a separate thing from the minor leagues it is the top tier inside the minor league system',
    ],
    `The MINOR LEAGUES is the broad, umbrella term for the ENTIRE multi-level system of professional baseball that sits below Major League Baseball (MLB) itself — organized in ascending tiers: complex-level ball, Rookie ball, Single-A, High-A, Double-A, and Triple-A, each level representing more advanced competition as players develop.

TRIPLE-A (AAA) is specifically the single HIGHEST level WITHIN that whole minor-league system — the tier directly one step below the majors themselves. Players at Triple-A are considered essentially MLB-ready, and they're the players most likely to get called up to the big leagues on short notice when an MLB team needs a replacement.

So Triple-A isn't a separate thing from "the minor leagues" — it IS part of the minor leagues, specifically the top rung of that ladder. Asking "minor leagues vs Triple-A" is really asking about the whole system versus its highest single level within that same system. (This is baseball terminology — the "AHL"/"NHL" system is a completely separate structure that belongs to hockey, not baseball.)`,
  ),
  k(
    'kb-gap-bb-single-vs-double',
    'Single vs double (these are real, standard baseball terms)',
    [
      'difference between a single and a double in baseball', 'a single and a double are standard official types of base hits in baseball they absolutely exist as terms',
      'a single is a base hit where the batter safely reaches only first base', 'a double is a base hit where the batter safely reaches second base',
      'a triple reaches third base and a home run circles all the bases these are the four types of base hits ranked by how many bases the batter reaches',
    ],
    `A SINGLE and a DOUBLE are standard, official types of base hits in baseball — they absolutely exist as real terms, ranked by how many bases the batter reaches safely on the hit.

A SINGLE is a base hit where the batter reaches only FIRST base.

A DOUBLE is a base hit where the batter reaches SECOND base.

The full family of base hits, in order: a single (1 base), a double (2 bases), a triple (3 bases, reaching third), and a home run (the batter circles all the bases and scores, typically by hitting the ball out of the park, though inside-the-park home runs also exist). These are among the most basic, commonly used terms in all of baseball.`,
  ),
  k(
    'kb-gap-bb-error-vs-hit',
    'Error vs hit (baseball scoring)',
    [
      'difference between an error and a hit in baseball scoring', 'a hit means the batter reached base safely purely because of their own batting skill with no defensive mistake involved the official scorer judges that no fielder could reasonably have made an out on the play',
      'an error is charged when a fielder makes a defensive mistake a dropped ball a bad throw a missed catch that a competent fielder should have converted into an out but the batter or runner reaches or advances an extra base because of that mistake instead',
      'reaching base on an error does not count as a hit or count toward batting average reaching base on a real hit does count',
    ],
    `A HIT means the batter reached base safely purely through their own batting skill, with no defensive mistake involved — the official scorer judges that even a competent fielder could not reasonably have gotten the batter out on that play.

An ERROR is charged instead when a FIELDER makes a defensive mistake — a dropped ball, a bad/wild throw, a misplay — that a competent fielder should have converted into an out, but because of that mistake the batter (or an existing runner) reaches or advances a base they otherwise wouldn't have.

The scoring impact matters a lot: reaching base on an error does NOT count as a hit and does NOT help the batter's batting average, while reaching base on a real hit does count toward both. This is why a batter can look at the box score and see they reached base 3 times in a game, but batted only 1-for-4 — the other two times were on errors or walks, not hits.`,
  ),
  k(
    'kb-gap-bb-designated-hitter',
    'Designated hitter vs pitcher batting',
    [
      'difference between a designated hitter and a pitcher batting', 'a designated hitter dh is a player who only bats in the pitchers spot in the lineup and never plays a defensive position at all',
      'when a pitcher bats it means that team is playing without a dh and the pitcher himself must step up to hit like any other position player',
      'the american league adopted the dh in 1973 the national league did not use it until the universal dh rule started in the 2022 season making the dh now used across all of major league baseball',
    ],
    `A DESIGNATED HITTER (DH) is a player whose only job is to BAT in the pitcher's spot in the batting lineup — they never play any defensive position in the field at all, they just hit.

When a PITCHER BATS instead, it means that team is playing WITHOUT a designated hitter — the pitcher himself has to step into the batter's box and hit like any other position player, in addition to pitching.

Historically, the American League adopted the DH rule in 1973, while the National League had pitchers bat for themselves all the way until the "universal DH" rule started in the 2022 season — now every MLB team uses a designated hitter and pitchers no longer bat in either league.`,
  ),
  k(
    'kb-gap-bb-wild-pitch-vs-passed-ball',
    'Wild pitch vs passed ball (whose fault it is)',
    [
      'difference between a wild pitch and a passed ball in baseball', 'a wild pitch is charged to the PITCHER when the pitch is so errant bouncing in the dirt sailing high or wide that a catcher could not reasonably have been expected to catch or block it',
      'a passed ball is charged to the CATCHER when the pitch was actually a catchable normal pitch that the catcher should have been able to stop or catch but simply missed or muffed it',
      'in both cases the ball gets away from the catcher and runners can advance but the key difference is who is officially blamed for it the pitcher or the catcher',
    ],
    `Both a wild pitch and a passed ball describe the same basic situation — the ball gets past the catcher and runners can advance — but the official scorer assigns BLAME to a different person for each.

A WILD PITCH is charged to the PITCHER: the pitch itself was so errant (bouncing in the dirt, sailing high, way outside) that no catcher could reasonably have been expected to catch or block it.

A PASSED BALL is charged to the CATCHER: the pitch was actually a normal, catchable pitch that a competent catcher should have handled, but the catcher simply missed it, muffed it, or let it get by.

So the real distinction isn't about what happened (the ball got away either way) — it's about WHO'S AT FAULT: an uncatchable pitch is on the pitcher (wild pitch), a catchable pitch the catcher blew is on the catcher (passed ball).`,
  ),
  k(
    'kb-gap-bb-pop-fly-vs-line-drive',
    'Pop fly vs line drive',
    [
      'difference between a pop fly and a line drive in baseball', 'a pop fly is a weakly hit ball that goes very high into the air but usually does not travel far horizontally often landing in or near the infield making it an easy out for a fielder',
      'a line drive is a hard hit ball that travels on a flat fast low trajectory without arcing high often difficult for fielders to react to and more likely to become a hit than an out',
      'a pop fly is high and weak a line drive is fast and flat',
    ],
    `A POP FLY is a weakly-hit ball that goes very HIGH into the air but usually doesn't travel far HORIZONTALLY — it often lands in or near the infield rather than out in the outfield, which normally makes it an easy out since a fielder has plenty of time to get under it and catch it.

A LINE DRIVE is a hard-hit ball that travels on a flat, fast, LOW trajectory, without arcing high the way a pop fly or normal fly ball does. Because it comes off the bat so hard and flat, fielders have very little reaction time, which makes a line drive far more likely to become a hit than an out compared to a pop fly.

Simple contrast: a pop fly is high and weak (usually an easy out), a line drive is fast and flat (usually a tougher play and often a hit).`,
  ),
  k(
    'kb-gap-bb-pinch-hitter-not-just-for-pitcher',
    'Pinch hitter vs pinch runner (pinch hitter can replace ANY batter)',
    [
      'difference between a pinch hitter and a pinch runner in baseball', 'a pinch hitter is a substitute who bats in place of any player currently due up in the batting order not only the pitcher',
      'a pinch hitter is commonly used to replace the pitcher specifically in the national league before the universal dh rule since pitchers are usually weak hitters but a pinch hitter can also replace a tired, injured, or poorly matched up position player at any point in the game',
      'a pinch runner substitutes for a player who has already reached base as a baserunner usually to add speed for stealing a base or scoring from a slower runner',
    ],
    `A PINCH HITTER is a substitute batter who steps in to bat in place of whichever player is currently due up in the lineup — this can be ANY player, not just the pitcher. It's especially common (historically) to sub for the pitcher specifically in games without a designated hitter, since pitchers are usually weak hitters, but a manager can also pinch-hit for a tired, injured, or poorly-matched-up position player at any point in the game, for any reason.

A PINCH RUNNER substitutes for a player who has already reached base as a baserunner — usually brought in to add speed (for stealing a base or scoring from a slower hit) in place of a runner who's tired, injured, or just slow.

The key correction: don't assume a pinch hitter is always specifically "subbing for the pitcher" — that's just the single most common historical use case, not the definition of the role.`,
  ),
  k(
    'kb-gap-bb-infield-fly-rule',
    'Infield fly rule vs a normal fly ball',
    [
      'difference between an infield fly rule call and a normal fly ball', 'a normal fly ball is simply caught or not caught and the runners react accordingly',
      'the infield fly rule specifically applies only when there are runners on first and second base or the bases are loaded with fewer than two outs and the batter hits a fly ball that an infielder could catch with ordinary effort',
      'when the infield fly rule is invoked the umpire immediately calls the batter automatically out regardless of whether the ball is actually caught this exists to stop the defense from intentionally dropping the ball to get a cheap double or triple play on the forced runners',
    ],
    `A NORMAL fly ball is simple: it's either caught (batter is out) or not caught (batter and any runners react and advance as normal, playing the ball live).

The INFIELD FLY RULE is a special exception that only applies in a specific situation: there are runners on first AND second (or the bases are loaded), there are FEWER than two outs, and the batter hits a fly ball that an infielder could catch with ordinary effort. In that exact situation, the umpire immediately declares the batter automatically OUT the moment the ball is hit — regardless of whether a fielder actually catches it or lets it drop.

This rule exists specifically to stop the defense from exploiting a cheap trick: without it, an infielder could deliberately let an easy fly ball drop, then throw the forced runners out at multiple bases for an easy double or triple play, since the runners have to stay near their bases in case the ball is caught. The infield fly rule removes that incentive by making the batter out immediately no matter what.`,
  ),
  k(
    'kb-gap-bb-complete-game-vs-shutout',
    'Complete game vs shutout (not the same thing)',
    [
      'difference between a complete game and a shutout in baseball', 'a complete game means ONE starting pitcher throws every single inning of the game for their team without any relief pitcher coming in regardless of how many runs they allow',
      'a shutout means the opposing team scores zero runs the entire game this is about runs allowed not about how many pitchers were used',
      'a pitcher can throw a complete game while still giving up several runs and losing and separately a shutout can technically be a combined shutout thrown by multiple relief pitchers together not just one pitcher',
      'when the same pitcher throws all nine innings and allows zero runs that specific combination is called a complete game shutout',
    ],
    `A COMPLETE GAME means ONE starting pitcher threw every single inning of the game for their team, with no relief pitcher coming in to help at all — this is entirely about HOW MANY PITCHERS were used, regardless of how many runs that pitcher allowed. A pitcher can throw a complete game and still give up several runs, even lose the game, as long as they were the only pitcher who threw for their team.

A SHUTOUT means the opposing team scored ZERO runs the entire game — this is entirely about RUNS ALLOWED, regardless of how many pitchers were used. In fact, a "combined shutout" can be thrown by several relief pitchers together, as long as none of them ever let the other team score.

They're measuring two completely different things (pitcher usage vs. runs allowed), which is why a pitcher can achieve one without the other. When the SAME pitcher throws all nine innings AND allows zero runs, that specific combination has its own name: a "complete game shutout" — the rare case where both things are true at once.`,
  ),
  k(
    'kb-gap-bb-no-hitter-vs-perfect-game',
    'No-hitter vs perfect game',
    [
      'difference between a no hitter and a perfect game in baseball', 'a no hitter means the pitcher or pitching staff did not allow a single base hit the entire game but the other team can still have reached base via walks hit by pitches or fielding errors',
      'a perfect game is much rarer and stricter it means literally no batter from the opposing team reached base by ANY means at all no hits no walks no hit by pitches no errors twenty seven batters up and twenty seven batters retired in a nine inning game',
      'every perfect game is automatically also a no hitter but a no hitter is not automatically a perfect game since walks errors and hit by pitches can still happen in a no hitter',
    ],
    `A NO-HITTER means the pitcher (or pitching staff) didn't allow a single BASE HIT the entire game — but the opposing team can still have reached base other ways, through walks, hit-by-pitches, or fielding errors. A no-hitter can still be a somewhat messy game with baserunners, as long as none of them got there via an actual hit.

A PERFECT GAME is much rarer and stricter: it means LITERALLY no batter from the opposing team reached base by ANY means at all — no hits, no walks, no hit-by-pitches, no errors. Every single batter faced was retired: 27 batters up, 27 batters down, in a standard nine-inning game.

The relationship: every perfect game is automatically also a no-hitter (since zero hits is a requirement of a perfect game too), but a no-hitter is NOT automatically a perfect game, since walks, errors, and hit-by-pitches can still happen during a no-hitter without breaking it.`,
  ),
  k(
    'kb-gap-bb-batting-average-vs-obp',
    'Batting average vs on-base percentage (home runs count in both)',
    [
      'difference between a batting average and an on base percentage in baseball', 'batting average only counts hits divided by official at bats it does not count walks or hit by pitches at all',
      'on base percentage counts hits PLUS walks PLUS hit by pitches divided by total plate appearances a broader measure of how often a player reaches base by any means',
      'home runs are already counted as hits in both batting average and on base percentage the real thing on base percentage adds that batting average does not count is walks and hit by pitches not home runs',
    ],
    `BATTING AVERAGE only counts HITS divided by official at-bats — it does NOT count walks or hit-by-pitches at all; those situations aren't even included in the at-bat total used to calculate it.

ON-BASE PERCENTAGE (OBP) is broader: it counts hits, PLUS walks, PLUS hit-by-pitches, all divided by total plate appearances — a much more complete measure of how often a player reaches base by any means, not just by getting a hit.

Important correction: home runs are already counted as HITS in both batting average AND on-base percentage — they're not something OBP uniquely adds. The actual things OBP adds that batting average leaves out are specifically WALKS and HIT-BY-PITCHES — those are the situations that help OBP but do nothing for batting average.`,
  ),
  k(
    'kb-gap-bb-double-play-vs-triple-play',
    'Double play vs triple play',
    [
      'difference between a double play and a triple play in baseball', 'a double play is when the defense records two outs on the same continuous play most commonly a ground ball fielded and thrown to force a runner out at second then thrown again to first to get the batter too',
      'a triple play is when the defense records three outs on the same single continuous play extremely rare happening only a handful of times across an entire mlb season',
      'a triple play is essentially a double play plus one more out recorded in that same sequence of throws before the play ends',
    ],
    `A DOUBLE PLAY is when the defense records TWO outs on the same continuous play — most commonly a ground ball that's fielded and thrown to force a runner out at second base, then relayed to first base to get the batter out too, ending the play with two outs at once.

A TRIPLE PLAY is when the defense records THREE outs on that same single continuous play — extremely rare, happening only a handful of times across an entire MLB season league-wide. It's essentially a double play with one additional out recorded in that same sequence before the play ends (for example, a line drive caught for the first out, doubling off a runner at one base for the second, and relaying to another base for the third).

Both are about how many outs come from ONE continuous defensive sequence — a double play gets two, a triple play (much rarer) gets all three.`,
  ),
  k(
    'kb-gap-bb-check-swing',
    'Bunt vs check swing',
    [
      'difference between a bunt and a check swing in baseball', 'a bunt is when the batter deliberately holds the bat still and taps the ball softly into play instead of taking a full swing usually to advance a runner or reach base with a surprise placement',
      'a check swing is when the batter starts to swing at a pitch but stops or holds back before completing the swing usually trying to avoid swinging at a pitch outside the strike zone',
      'the umpire has to judge whether a check swing counts as a full swing for a strike or not a full swing and therefore a ball if not swung at often by asking a base umpire for a second opinion',
    ],
    `A BUNT is a deliberate, intentional action: the batter holds the bat still (doesn't take a real swing) and taps the ball softly into play, usually to advance a runner into scoring position or to try to reach base with a surprise placement the defense isn't set up for.

A CHECK SWING is when the batter STARTS to swing at a pitch but stops or holds back BEFORE completing the swing — usually an attempt to avoid committing to a swing at a pitch that turns out to be outside the strike zone. Since it's ambiguous whether the bat crossed far enough to count as a real swing, the home plate umpire often has to judge (sometimes asking a base umpire for a second opinion) whether it counts as a strike (a real swing happened) or a ball (the batter successfully held back).

So: a bunt is a deliberate soft-contact technique, while a check swing is an aborted attempt at a real swing that requires a judgment call on whether it counts.`,
  ),
  k(
    'kb-gap-bb-rookie-vs-veteran',
    'Rookie vs veteran in baseball',
    [
      'difference between a rookie and a veteran in baseball', 'not the 1992 baseball movie Mr Baseball and not an NFL quarterback this is about a players own experience level in Major League Baseball',
      'a rookie is a player in their first year of eligibility in MLB defined by specific limits on playing time and days on the active roster before those limits are exceeded and they lose rookie status',
      'a veteran is a player who has already exceeded those rookie eligibility limits through enough MLB service time and is no longer considered a first year player regardless of exact age',
      'rookies are eligible for rookie of the year awards veterans are not',
    ],
    `A ROOKIE is a player in their first year of MLB eligibility — defined by specific league rules limiting how many days they can have spent on an active MLB roster or how many at-bats/innings they've accumulated before those limits are exceeded. As long as a player stays under those thresholds, they retain rookie status, even if they had a short earlier cameo in a prior season.

A VETERAN is simply a player who has already exceeded those rookie eligibility limits — through enough accumulated MLB service time, they're no longer considered a "first-year" player, regardless of their exact age (a 24-year-old can be a veteran, and a 30-year-old who only just debuted can technically still be a rookie).

The practical difference that matters most: only rookies are eligible for "Rookie of the Year" awards; once a player's service time crosses the threshold into veteran status, they can never win that specific award again no matter how well they perform.`,
  ),
  k(
    'kb-gap-bb-rbi-not-cricket',
    'RBI vs run scored (baseball, not cricket)',
    [
      'difference between an rbi and a run scored in baseball', 'this is about baseball terminology not cricket there are no stumps or running between wickets in baseball',
      'an rbi run batted in credits the batter for causing a run to score whether by their own hit walk sacrifice or otherwise regardless of who actually crosses home plate',
      'a run scored credits the player who actually crossed home plate themselves to score not the batter who drove them in unless the batter hit a home run and drove in and scored themselves',
    ],
    `An RBI (run batted in) credits the BATTER for causing a run to score — through their own hit, sacrifice fly, walk with bases loaded, or other batted-ball event — regardless of who actually crosses home plate. It's a stat about what the batter's action CAUSED.

A RUN SCORED credits the RUNNER who actually physically crosses home plate to score, regardless of who batted them in. It's a stat about the player who actually completed the trip around the bases.

A single player can obviously get both on the same play (a batter who hits a home run gets both an RBI and a run scored, since they drove themselves in), but generally these credit two different roles: the batter who created the run (RBI) versus the runner who actually scored it (run scored). (For clarity, this is baseball scoring — there's no "running between the stumps," that's cricket terminology and doesn't apply here; baseball has bases and a diamond, not wickets.)`,
  ),
];
