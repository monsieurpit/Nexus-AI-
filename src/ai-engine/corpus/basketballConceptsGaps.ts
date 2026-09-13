import { KnowledgeItem } from '../../types';

/**
 * BASKETBALL_CONCEPTS_GAPS — batch 266 corrections. First-ever dedicated
 * basketball batch (previously only a handful of basketball pairs existed
 * scattered inside the generic multi-sport files). Moderate result: 9 misses
 * out of 25 — better than hockey (batch 265, 15/25) but with one severe rule
 * error and a recurring soccer-hallucination pattern. nexus-4b handled well:
 * point guard/shooting guard, small forward/power forward, man-to-man/zone,
 * two/three pointer, full-court-press start, NBA/G-League, starting lineup/
 * bench, double-double/triple-double, flagrant/common foul, paint/perimeter,
 * fast break/set play, man/help defense, rebound/putback, alley-oop/dunk,
 * zone press/man press, college basketball/NBA, euro step/layup. Misses:
 * - "pick vs screen" missed that these are literally the SAME THING
 *   (synonyms) — answered as if "screen" only meant an illegal screen.
 * - "and-one vs regular basket" completely misread the question, explaining
 *   field goal vs free throw instead of what an and-one actually is.
 * - "charge vs block" gave a SEVERELY WRONG rule — described goaltending
 *   (touching the ball on its way down) instead of the real charging/
 *   blocking-foul distinction (which offensive/defensive player was moving).
 * - "full court press vs half court trap" and "pick and roll vs pick and
 *   pop" both explained only the first half and got cut off.
 * - "timeout vs media timeout" said media timeouts only happen in the 4th
 *   quarter — wrong, they happen at set stoppages in every quarter.
 * - "regular season MVP vs Finals MVP" claimed MVP is "whoever scores the
 *   most points" (false — it's a voted award, not a scoring title) and
 *   never explained Finals MVP at all.
 * - "starter vs sixth man" hallucinated SOCCER again ("starting XI", "90
 *   minutes", "manager") — the same wrong-sport pattern seen in the hockey
 *   batch just before this one — and never explained "sixth man" at all.
 * - "turnover vs steal" implied they're "basically the same thing", blurring
 *   that a steal is always a turnover but most turnovers (travels, bad
 *   passes, offensive fouls) are NOT steals.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'basketball', keywords, content, createdAt: now,
});

export const BASKETBALL_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-bball-pick-vs-screen',
    'Pick vs screen (they are the same thing)',
    [
      'difference between a pick and a screen in basketball', 'a pick and a screen are actually the same exact thing just two different names for one legal offensive move',
      'a screen also called a pick is when an offensive player without the ball stands still and legally blocks the path of a defender to free up a teammate',
      'commentators use pick and screen interchangeably pick and roll and screen and roll mean the same play',
    ],
    `A "pick" and a "screen" are the SAME THING — just two different words for the exact same legal offensive move, used interchangeably by players, coaches, and commentators. There is no real difference between them, the way "soda" and "pop" both mean the same drink.

The move itself: an offensive player without the ball stands STILL in the path of a defender guarding one of their teammates, legally blocking (screening/picking) that defender's path so the teammate can get free for a shot, drive, or pass. As long as the screener is stationary and gives the defender enough space to stop or go around, it's legal.

You'll hear both "set a pick" and "set a screen" used for identical situations — including the famous play "pick and roll" (also sometimes called "screen and roll"), where after setting the pick/screen, that player then rolls toward the basket for a pass.`,
  ),
  k(
    'kb-gap-bball-and-one-vs-regular-basket',
    'And-one vs a regular basket',
    [
      'difference between an and one and a regular basket in basketball', 'an and one happens when a player is fouled while in the act of shooting and the shot still goes in the basket counts and they are awarded one free throw for a chance at an extra point',
      'a regular basket is just a made shot with no foul involved worth its normal two or three points with no bonus free throw',
      'and one because you get the basket and one extra free throw attempt',
    ],
    `An AND-ONE happens when a player is FOULED while in the act of shooting AND the shot still goes in anyway — the basket counts for its normal points (2 or 3), and on top of that the player is awarded ONE free throw for a chance at an extra point. "And-one" literally refers to "the basket, AND ONE more free throw" for the foul.

A REGULAR BASKET is just a made shot with no foul involved at all — you get the normal 2 or 3 points and nothing else, no bonus free throw.

So the key thing that makes it an "and-one" specifically is the combination of BOTH a made basket AND a shooting foul on the same play — it's not just any made shot, and it's not just any foul, it's the two happening together.`,
  ),
  k(
    'kb-gap-bball-charge-vs-block',
    'Charging foul vs blocking foul',
    [
      'difference between a charge and a block in basketball', 'a charging foul is an offensive foul called on the ball handler who runs into or over a defender who already had their feet set and was legally stationary in that spot',
      'a blocking foul is a defensive foul called on the defender when the defender was still moving into position and had not yet established a legal stationary guarding position before contact happened',
      'the key question referees ask is whether the defenders feet were set and stationary before contact if yes it is a charge on the offensive player if the defender was still moving it is a block on the defensive player',
      'not goaltending goaltending is a completely separate rule about touching the ball on its way down toward the rim',
    ],
    `A CHARGING foul is an OFFENSIVE foul: it's called on the ball-handler when they run into a defender who had already established a legal, stationary guarding position (feet set, not moving) before the contact happened. The offense is penalized for barreling through a defender who got there first and stood their ground.

A BLOCKING foul is a DEFENSIVE foul: it's called on the defender when THEY were still moving into position — sliding over, not yet set — at the moment contact occurred with the offensive player. Since the defender hadn't legally established their spot yet, the contact is on them instead.

The single question referees (and replay review) are actually asking is: were the defender's feet set and stationary BEFORE contact? If yes → charge (offensive foul). If the defender was still moving → block (defensive foul). This is one of the most frequently reviewed, closest calls in basketball.

(This is a completely different rule from goaltending, which is about a defender illegally touching the ball on its way down toward the rim during a shot — that has nothing to do with charges or blocks.)

Simple memory rule: DEFENDER STOPPED FIRST = CHARGE (foul on offense). DEFENDER STILL MOVING = BLOCK (foul on defense). Get this exactly backwards and you have the rule wrong.`,
  ),
  k(
    'kb-gap-bball-full-court-press-vs-half-court-trap',
    'Full-court press vs half-court trap',
    [
      'difference between a full court press and a half court trap in basketball', 'a full court press is defensive pressure applied across the entire length of the court starting the moment the opponent inbounds the ball trying to force turnovers and steal the ball before it even crosses half court',
      'a half court trap only starts applying that same double team pressure once the ball has already crossed into the offensive half of the court usually done more conservatively and used to save energy compared to a full court press',
      'both use double teams and aggressive pressure but they differ in WHERE on the court the pressure begins',
    ],
    `A FULL-COURT PRESS applies aggressive defensive pressure across the ENTIRE length of the court, starting the moment the opposing team inbounds the ball after a made basket — defenders try to force turnovers or steals before the ball even crosses half court. It's exhausting to play and is often used to speed up the game, force mistakes against a team that struggles with ball-handling, or as a comeback tactic late in a game.

A HALF-COURT TRAP applies that same kind of aggressive double-team pressure, but only once the ball has already crossed into the OFFENSIVE half of the court — it's a more conservative, energy-saving version that concedes the backcourt but still tries to trap and force mistakes once the offense sets up.

The core difference is simply WHERE on the court the pressure starts: full-court presses start immediately at the opponent's own inbound, half-court traps wait until the ball reaches the front half of the court.`,
  ),
  k(
    'kb-gap-bball-pick-and-roll-vs-pick-and-pop',
    'Pick and roll vs pick and pop',
    [
      'difference between a pick and roll and a pick and pop in basketball', 'in a pick and roll the screener sets a pick then immediately rolls cuts toward the basket looking for a pass and an easy shot close to the rim',
      'in a pick and pop the screener sets the same pick but instead of rolling to the basket they pop out to open space beyond the three point line or mid range for a jump shot instead',
      'pick and pop is generally used with a screener who is a good outside shooter rather than a strong finisher near the rim',
    ],
    `In a PICK AND ROLL, the screener sets the pick for the ball-handler, and then immediately ROLLS — cuts toward the basket — looking to receive a pass for an easy, close shot near the rim.

In a PICK AND POP, the screener sets the same initial pick, but instead of rolling to the basket, they POP OUT to open space (usually beyond the three-point line or at mid-range) for a jump shot instead.

The choice between the two usually comes down to the screener's skillset: pick and roll is used when the screener is a strong finisher near the basket, while pick and pop is used when the screener is instead a good outside shooter who's more dangerous getting an open jumper than driving to the rim.`,
  ),
  k(
    'kb-gap-bball-timeout-vs-media-timeout',
    'Timeout vs media timeout',
    [
      'difference between a timeout and a media timeout in basketball', 'a regular timeout is called by a coach or player at any point in the game to stop the clock for strategy substitutions or to break an opponents momentum',
      'a media timeout is a mandatory stoppage that happens automatically at set points in EVERY quarter not just the fourth specifically for television commercial breaks',
      'in the nba media timeouts occur at the first dead ball under the 6 minute 59 second mark and under the 2 minute 59 second mark of each of the four quarters',
    ],
    `A regular TIMEOUT is called on demand, by a coach (or in some leagues a player), at basically any point in the game — used to stop the clock for strategy, substitutions, to draw up a play, or to break the other team's momentum.

A MEDIA TIMEOUT is a MANDATORY stoppage built into the broadcast schedule specifically for television commercial breaks — it happens automatically. Importantly, media timeouts occur at set points in EVERY quarter, not just the fourth: in the NBA, they happen at the first dead ball under the 6:59 mark and under the 2:59 mark of each of the four quarters, regardless of whether either team wanted a break.

So the difference isn't when in the game they happen (both can occur any quarter) — it's WHO controls them: a regular timeout is requested by a team, a media timeout is automatic and exists for TV broadcasting, not for either team's strategy.`,
  ),
  k(
    'kb-gap-bball-regular-season-mvp-vs-finals-mvp',
    'Regular season MVP vs Finals MVP',
    [
      'difference between the regular season mvp and the finals mvp in basketball', 'the regular season mvp is NOT simply whoever scores the most points it is a voted award decided by a panel of sportswriters and broadcasters weighing overall individual impact team success and stats across the whole 82 game season',
      'the nba finals mvp is a completely separate award given only to the best player in the nba finals series itself and only eligible players are from the two teams that actually made the finals',
      'a player can lead the league in scoring all season and still not win mvp because it depends on team record and overall value not just points per game',
    ],
    `The regular-season MVP (Most Valuable Player) is NOT simply "whoever scores the most points" — it's a VOTED award, decided by a panel of sportswriters and broadcasters, weighing a player's overall impact, team success/record, and full statistical profile across the whole ~82-game season. A player can lead the league in scoring and still not win MVP if their team doesn't succeed or another player is judged more overall impactful.

The Finals MVP is a completely SEPARATE award, given only to the best player in that specific year's NBA Finals series — and only players from the two teams that actually made the Finals are even eligible, regardless of how good anyone else was during the regular season.

So: regular-season MVP judges the whole season across the entire league, while Finals MVP only judges a short playoff series between two specific teams — a player can win one, both, or neither in the same year, and they're decided completely independently of each other.`,
  ),
  k(
    'kb-gap-bball-starter-vs-sixth-man',
    'Starter vs sixth man (basketball, not soccer)',
    [
      'difference between a starter and a sixth man in basketball', 'this is about basketball not soccer there is no starting XI or 90 minutes in basketball',
      'a starter is one of the five players who begins the game on the court for their team the starting lineup or starting five',
      'a sixth man is specifically the best player who comes off the bench as the first substitute rather than starting the game there is even an official sixth man of the year award for the best bench player in the league',
      'a sixth man is valued precisely because they provide starter level quality production while officially coming off the bench',
    ],
    `A STARTER is one of the FIVE players who begins the game on the court for their team — the "starting five" or starting lineup (basketball has five players per side on the court, not eleven — there's no "starting XI," that's soccer).

A SIXTH MAN specifically refers to the best player who comes off the BENCH as the first substitute, rather than starting the game — the "sixth" player in importance, essentially. It's valued as its own specific role because a great sixth man provides starter-level scoring and impact while officially not starting, often to bring instant offense off the bench or to manage a starter's minutes. The NBA even has an official "Sixth Man of the Year" award specifically honoring the best player in this role league-wide.

So: a starter begins the game on the floor; a sixth man is the top bench player specifically recognized for high-level production despite not starting — a distinct, respected role, not just "any substitute."`,
  ),
  k(
    'kb-gap-bball-turnover-vs-steal',
    'Turnover vs steal (steal is a type of turnover, not a synonym)',
    [
      'difference between a turnover and a steal in basketball', 'a turnover is any loss of possession by the offense without a shot attempt including travels double dribbles bad passes out of bounds and offensive fouls not just steals',
      'a steal is specifically when a defender actively takes the ball away from the offense through a deflection or interception',
      'every steal counts as a turnover for the team that lost the ball but most turnovers are not steals since they can also be self inflicted mistakes like travels or bad passes with no defender taking credit',
    ],
    `A TURNOVER is the broad, general term for ANY loss of possession by the offense without a shot attempt — this includes travels, double dribbles, bad/errant passes, stepping out of bounds, offensive fouls, and shot-clock violations, on top of the ball simply being taken away.

A STEAL is a specific, narrower TYPE of turnover: it's when a defender actively takes the ball away from the offense — deflecting a pass, intercepting it, or stripping the ball-handler — and gets individual credit for the takeaway.

The relationship: every steal automatically counts as a turnover for the team that lost the ball, but most turnovers are NOT steals — a huge share of turnovers are self-inflicted mistakes (a travel, a bad pass sailing out of bounds, an offensive foul) where no defender actually did anything to force it, so nobody gets "credit" for a steal even though the ball still changed hands.`,
  ),
];
