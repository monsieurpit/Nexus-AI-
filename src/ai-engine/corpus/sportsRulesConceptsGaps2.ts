import { KnowledgeItem } from '../../types';

/**
 * SPORTS_RULES_CONCEPTS_GAPS_2 — batch 231 corrections. Non-soccer sports.
 * Errors: "American League vs National League" answered MLS vs EFL, "ice hockey
 * vs field hockey" said field hockey uses a puck, "Commonwealth Games" said
 * they are chess/darts/esports, plus web dumps for NBA/FIBA rules,
 * weightlifting/powerlifting, referee/umpire and amateur/professional, and
 * thin/muddled answers for NFL/college, pitcher/catcher, basketball/netball and
 * tennis/table-tennis scoring.
 */
export const SPORTS_RULES_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-sports2-al-vs-nl',
    title: 'American League vs National League (MLB)',
    category: 'sports',
    keywords: [
      'difference between the American League and National League', 'AL NL Major League Baseball',
      'designated hitter', 'two leagues within MLB', 'World Series', 'interleague play', 'not MLS versus EFL',
      'universal DH 2022',
    ],
    content: `The American League (AL) and National League (NL) are the two leagues that make up Major League Baseball (MLB) in the USA and Canada — not two different pro-sports structures. Each has 15 teams (three divisions of five). The NL is older (1876); the AL was founded in 1901.

For most of their history the main rule difference was the DESIGNATED HITTER (DH): the AL adopted it in 1973 — a hitter bats in place of the pitcher, who never bats — while the NL kept pitchers hitting for themselves, meaning more bunting and pinch-hitting strategy. In 2022 MLB adopted the UNIVERSAL DH, so both leagues now use it and this distinction has largely disappeared, leaving the two leagues nearly identical in rules.

The season ends with the two league champions meeting in the WORLD SERIES. During the regular season, "interleague play" pits AL and NL teams against each other. Historically the leagues also had separate umpiring crews and a slightly different feel, but they are now administratively part of one organisation. (Nothing to do with promotion and relegation — MLB is a closed franchise league with a draft and no relegation.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-ice-vs-field-hockey',
    title: 'Ice hockey vs field hockey',
    category: 'sports',
    keywords: [
      'difference between ice hockey and field hockey', 'ice hockey puck skates 6 players body checking',
      'field hockey ball grass or turf 11 players no checking', 'hooked stick one side only', 'penalty corner',
      'winter Olympic versus summer Olympic', 'not both use a puck',
    ],
    content: `They share a name and the goal of hitting an object into a net with sticks, but they are very different sports. Field hockey does NOT use a puck.

Ice hockey: played on an ice rink, on SKATES, 6 players a side (including a goalie), using an L-shaped stick to move a flat rubber PUCK. It is fast and physical, with legal BODY CHECKING, boards to bounce off, frequent "line changes" of tired players, a blue-line offside rule, icing, and penalties that put a team a player short (power play / penalty kill). It is a WINTER sport (Winter Olympics); the top league is the NHL. Canada, the USA, Russia, Sweden, Finland and Czechia are the powers.

Field hockey: played on GRASS or artificial turf, running (no skates), 11 players a side, using a stick that is curved and flat on ONE SIDE ONLY (you may only play the ball with the flat side). The object is a small, hard BALL. There is NO body checking and no stick-tackling of an opponent, the ball generally must stay low, and you cannot play it with your feet. Scoring is mostly from inside the shooting circle, often via "penalty corners". It is a SUMMER Olympic sport; the Netherlands, Australia, India, Germany and Belgium are the powers.

Short version: ice = skates, puck, checking, winter; field = running, ball, no contact, one-sided stick, summer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-olympics-vs-commonwealth',
    title: 'Olympic Games vs Commonwealth Games',
    category: 'sports',
    keywords: [
      'difference between the Olympics and the Commonwealth Games', 'Olympics all nations IOC every four years',
      'Commonwealth Games former British Empire countries every four years', 'lawn bowls netball squash rugby sevens',
      'the Friendly Games', 'not chess darts esports',
    ],
    content: `Both are large multi-sport events held every four years, but they differ in who competes and their scale. (Neither is about board or video games — no chess, darts or esports at the core.)

The Olympic Games are the biggest sporting event in the world, open to athletes from ALL recognised National Olympic Committees (about 200 nations), run by the International Olympic Committee. They have a Summer edition (athletics, swimming, gymnastics, cycling, team sports, ~10,000+ athletes) and a Winter edition (skiing, skating, ice hockey), on a two-year alternating cycle.

The Commonwealth Games are a multi-sport event for the ~54 member states of the Commonwealth of Nations — mostly former territories of the British Empire (the UK, Canada, Australia, New Zealand, India, Jamaica, Kenya, South Africa, etc.). Nicknamed "the Friendly Games", they are smaller than the Olympics (~5,000 athletes, ~20 sports). The programme overlaps heavily with the Summer Olympics (athletics, swimming, gymnastics, cycling, boxing) but also features sports that are strong in Commonwealth countries and not in the Olympics: LAWN BOWLS, NETBALL, SQUASH, and rugby sevens, plus para-sports fully integrated into the main event. England, Scotland, Wales and Northern Ireland compete as separate nations (unlike at the Olympics, where they are "Great Britain").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-weightlifting-vs-powerlifting',
    title: 'Olympic weightlifting vs powerlifting',
    category: 'sports',
    keywords: [
      'difference between weightlifting and powerlifting', 'snatch and clean and jerk', 'squat bench press deadlift',
      'explosive overhead lifts', 'maximal strength three lifts', 'Olympic sport versus not', 'technique versus raw strength',
    ],
    content: `Both are barbell strength sports where athletes attempt maximal single lifts in weight classes, but the lifts are completely different.

Olympic WEIGHTLIFTING contests TWO lifts: the SNATCH (lift the bar from the floor to locked-out overhead in one continuous, explosive movement) and the CLEAN AND JERK (pull the bar to the shoulders, then drive it overhead). Both require enormous power, speed, mobility, and precise technique — the bar moves fast and the lifter drops under it. It is an Olympic sport (since 1896), governed by the IWF. The winner is decided by the combined total of best snatch + best clean and jerk.

POWERLIFTING contests THREE lifts: the SQUAT (bar on the back, sit down and stand up), the BENCH PRESS (lie on a bench, lower the bar to the chest, press it up), and the DEADLIFT (lift the bar from the floor to standing). These are slower "grind" lifts that test raw maximal strength rather than explosive speed. It is NOT an Olympic sport (though it has its own world championships and federations like the IPF). The winner is decided by the combined total of best squat + bench + deadlift.

Short version: weightlifting = 2 fast overhead lifts, technical and explosive, Olympic; powerlifting = 3 heavy grinding lifts (squat/bench/deadlift), pure strength, not Olympic.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-referee-vs-umpire',
    title: 'Referee vs umpire (sports officials)',
    category: 'sports',
    keywords: [
      'difference between a referee and an umpire', 'which sports use which term', 'referee moves with play soccer rugby boxing basketball',
      'umpire stationed baseball cricket tennis', 'some sports use both', 'assistant referee linesman', 'judges',
    ],
    content: `"Referee" and "umpire" both mean an official who enforces the rules of a game; which word a sport uses is mostly historical convention, and some sports use both.

Sports that call the main official a REFEREE: association football (soccer), rugby (both codes), basketball, boxing, ice hockey, handball, water polo. The referee typically MOVES around the field of play with the action.

Sports that call officials UMPIRES: baseball, cricket, tennis, field hockey, netball, badminton, and (Australian rules) football. An umpire is often STATIONED at a fixed position (behind home plate in baseball, at the net or in a chair in tennis, at the crease in cricket).

Sports that use BOTH terms for different roles: American football has a referee (the crew chief) PLUS an umpire (who watches the line of scrimmage) plus a head linesman, back judge, etc. Cricket has on-field umpires plus a "match referee" who handles discipline and code-of-conduct issues off the field. Volleyball has a first and second referee.

Other titles for officials: "judge" (boxing scorecards, gymnastics, diving, figure skating), "linesman" / "assistant referee" (soccer, tennis line calls, ice hockey), "marshal" (motorsport), "starter" (athletics).

Short version: it is terminology, not a real functional difference — a referee usually runs with play, an umpire is usually fixed, and several sports have both.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-tennis-vs-table-tennis-scoring',
    title: 'Tennis vs table tennis scoring',
    category: 'sports',
    keywords: [
      'difference between tennis and table tennis scoring', 'tennis 15 30 40 game deuce advantage',
      'table tennis games to 11 win by 2', 'serve alternates every two points', 'best of five or seven games',
      'sets and matches', 'ping pong points',
    ],
    content: `TENNIS scoring is layered and uses its own number names. Within a GAME the points are 0 ("love"), 15, 30, 40; if both reach 40 it is "deuce" and a player must win two points in a row (win the "advantage", then the game). Win 6 games (by a margin of two) to take a SET; at 6-6 a tiebreak (first to 7 by 2) usually decides it. A MATCH is best of 3 sets (women, most men's events) or best of 5 sets (men's Grand Slams). The server serves an entire game, then serving alternates.

TABLE TENNIS (ping-pong) scoring is simpler and modern. A GAME is first to 11 POINTS, and you must win by 2 (so at 10-10, "deuce", play continues until someone leads by 2). A point is scored on EVERY rally regardless of who served. The SERVE alternates every 2 points (every 1 point once the score reaches deuce). A MATCH is best of 5 or best of 7 games (odd number, so 3 or 4 games wins it). There are no "sets" and no "15/30/40" — just straight points to 11.

(Table tennis used to play games to 21 with serve changing every 5 points; it switched to 11 in 2001 to make matches more TV-friendly.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-nba-vs-fiba',
    title: 'NBA rules vs FIBA rules (basketball)',
    category: 'sports',
    keywords: [
      'difference between the NBA and FIBA rules', 'game length 48 minutes versus 40', 'three-point line distance',
      'defensive three seconds NBA only', 'goaltending', 'fouls to foul out six versus five', 'wider key trapezoid history',
      'timeouts',
    ],
    content: `The NBA (the American pro league) and FIBA (which governs international basketball — the Olympics, World Cup, EuroLeague uses similar rules) play the same game with several rule differences:

- Game length: NBA is 4 quarters of 12 minutes (48 total); FIBA is 4 quarters of 10 minutes (40 total).
- Three-point line: farther out in the NBA (7.24 m at the top, 6.70 m in the corners) than FIBA (6.75 m / 6.60 m).
- Fouling out: NBA players foul out on their 6th personal foul; FIBA (and college) on the 5th.
- Defensive three seconds: banned in the NBA (a defender cannot camp in the paint without guarding someone); LEGAL in FIBA, which lets teams pack the lane.
- Goaltending: in the NBA the ball is untouchable once it is on the rim or in the cylinder; FIBA allows players to knock the ball off the rim once it has touched it (after it hits the rim it is live).
- Timeouts, the shot clock reset (24 vs 14 on an offensive rebound — now similar), and the width of the key (FIBA long used a wider "trapezoid" lane before switching to the rectangular NBA-style key in 2010).
- Physicality: NBA officiating traditionally allows more contact; FIBA is tighter on it but rougher in the post.

Short version: FIBA games are shorter, the arc is closer, you foul out one foul sooner, and defenders can sit in the paint — the NBA game is longer, spaced wider, and more one-on-one.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-nhl-vs-international-hockey',
    title: 'NHL vs international (IIHF/Olympic) hockey',
    category: 'sports',
    keywords: [
      'difference between the NHL and international hockey', 'rink size wide ice', 'no fighting internationally',
      'IIHF rules', 'automatic icing', 'different penalties', 'best of four teams round-robin at the Olympics', 'not disorganised',
    ],
    content: `The NHL (the North American pro league) and international hockey (governed by the IIHF — the World Championship, the Olympics, and most European leagues) play the same sport with rule and style differences. International hockey is NOT "disorganised" — it is highly tactical.

- Rink size: international rinks were historically WIDER (about 30 m vs the NHL's ~26 m / 85 feet), which favours skating, passing and puck possession over hitting; some events and leagues have since moved toward NHL dimensions.
- Fighting: essentially results in ejection (and suspension) in IIHF play; in the NHL it is penalised (5 minutes) but not automatically an ejection, and is part of the culture.
- Icing: the NHL uses "hybrid" icing (a race to a faceoff dot); the IIHF uses AUTOMATIC / no-touch icing (whistle as soon as the puck crosses the line).
- Penalties: some infractions and the severity of calls differ; the IIHF is generally stricter on head contact and checking.
- Format: the NHL is an 82-game season plus best-of-seven playoff series; the Olympics and Worlds are short tournaments (a group stage then single-elimination knockouts), which rewards a hot goalie and gives more room for upsets.
- Ice / puck / equipment standards, video review, and overtime formats also vary.

Short version: international hockey traditionally means bigger ice, no fighting, automatic icing, stricter officiating, and a short-tournament format — a more possession- and skating-oriented game.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-nfl-vs-college-football',
    title: 'NFL vs college (NCAA) football',
    category: 'sports',
    keywords: [
      'difference between the NFL and college football', 'two feet inbounds versus one foot for a catch',
      'clock stops on first downs in college', 'different overtime rules', 'hash marks wider in college', 'targeting rule',
      'pass interference penalty distance', 'NIL amateurism',
    ],
    content: `Both play American football with the same basic structure (four downs, ten yards, four 15-minute quarters), but the rules differ in ways that noticeably change the game:

- Completing a catch: NFL requires BOTH feet inbounds; college (NCAA) requires only ONE foot.
- Clock: in college, the game clock STOPS when a team gets a first down (briefly) and after incomplete passes and out-of-bounds plays until the chains are set; this, plus more plays, makes college games longer despite the same quarter length.
- Overtime: totally different. NFL OT is a timed period with modified sudden-death (2022 rules give both teams a possession). College OT gives each team a possession from the opponent's 25-yard line, no clock, alternating, and from the third round teams must attempt two-point conversions (and after another round, run alternating two-point plays only).
- Hash marks are WIDER apart in college (so plays start closer to the sideline), which affects field position and play design.
- Pass interference: a spot foul in the NFL (huge yardage); capped at 15 yards in college.
- Targeting: college has a specific "targeting" rule with an automatic ejection for hits to a defenceless player's head.
- Players: NFL players are salaried professionals; college players are students, now able to earn from "Name, Image and Likeness" (NIL) deals and the transfer portal but not (traditionally) a salary.

Short version: college has one-foot catches, a first-down clock stop, wider hashes, capped PI, targeting ejections, and a distinctive alternating-possession overtime.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-basketball-vs-netball',
    title: 'Basketball vs netball',
    category: 'sports',
    keywords: [
      'difference between basketball and netball', 'basketball dribbling backboard contact 5 players',
      'netball no dribbling no running with the ball 7 players positions', 'footwork rule', 'no backboard shooting circle',
      'women\'s Commonwealth sport', 'goal third centre third',
    ],
    content: `Both are 5-a-side... no — that is one of the differences. They descend from a common origin but netball is a distinct sport, strong in Commonwealth countries and played mostly by women.

Basketball: 5 players a side, on a court with a backboard behind each hoop. Players DRIBBLE (bounce the ball continuously) to move it and may take shots from anywhere. Physical contact is common (and often not called). A 24-second shot clock forces quick offence. Any player can go anywhere.

Netball: 7 players a side, each locked into a POSITION (Goal Shooter, Goal Attack, Wing Attack, Centre, Wing Defence, Goal Defence, Goalkeeper) that restricts which THIRDS of the court and which areas they may enter. There is NO dribbling and NO running with the ball at all — once you catch it you may pivot on one foot but must pass or shoot within 3 seconds (the "footwork" rule). Only the two attacking positions may shoot, and only from inside the shooting circle. There is NO backboard — the ring stands alone. Contact is strictly penalised; a defender must stay 0.9 m (3 feet) away when marking a pass or shot. It is a faster passing game with less individual carrying.

Short version: basketball = 5 players, dribble, contact, shoot from anywhere; netball = 7 positional players, no dribble, no travelling, no contact, shoot only from the circle, no backboard.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-pitcher-vs-catcher',
    title: 'Pitcher vs catcher (baseball)',
    category: 'sports',
    keywords: [
      'difference between a pitcher and a catcher', 'pitcher throws from the mound', 'catcher receives calls the game frames pitches',
      'blocks the plate throws out base stealers', 'battery', 'the most demanding defensive positions', 'signs',
    ],
    content: `The pitcher and catcher form the "battery" and are the two most involved defensive players on every pitch.

The pitcher stands on the raised mound (60 feet 6 inches from home plate) and throws the ball toward the batter, trying to get outs via strikeouts, weak contact, or ground/fly balls. Pitchers specialise: a starting pitcher goes deep into the game, relievers pitch an inning or two, and the closer finishes close games. The pitcher's job is to command a mix of pitches (fastball, breaking ball, changeup) and locations.

The catcher squats behind home plate and does far more than "catch it or drop it". The catcher:
- CALLS THE GAME — signals to the pitcher which pitch to throw and where (based on the batter, the count, scouting).
- FRAMES pitches — subtly receives borderline pitches to make them look like strikes to the umpire.
- BLOCKS pitches in the dirt so runners cannot advance.
- Controls the RUNNING GAME — throws to bases to catch stealers and holds runners.
- Fields bunts and pop-ups, covers the plate on plays at home, and is a field general directing the defence.

Catching is the most physically punishing position (hundreds of squats a game, foul tips, home-plate collisions), which is why catchers often hit less and are prized for their defence and game-management.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-fieldgoal-vs-freethrow-bball',
    title: 'Field goal vs free throw (basketball)',
    category: 'sports',
    keywords: [
      'difference between a field goal and a free throw in basketball', 'field goal any basket from live play two or three points',
      'free throw uncontested shot after a foul worth one point', 'bonus penalty situation', 'and-one', 'foul shots',
    ],
    content: `A FIELD GOAL is any basket scored during live play — a shot made while the game clock is running, with the defence able to contest it. It is worth 2 POINTS from inside the three-point arc and 3 POINTS from beyond it. "Field-goal percentage" is a player's made shots divided by attempts.

A FREE THROW ("foul shot") is an uncontested shot taken from the free-throw line (15 feet from the basket), awarded after certain fouls. The shooter stands alone at the line, no defender may interfere, and EACH successful free throw is worth exactly 1 POINT (not two if missed — a miss is worth nothing). Free throws are awarded:
- Two shots for a shooting foul on a missed 2-point attempt (three shots if fouled on a missed 3-point attempt).
- One shot plus the basket ("and-one") if the shot went in despite the foul.
- Two shots for any foul once a team is "in the bonus" / "penalty" (over the team foul limit for that period), or for a technical or flagrant foul.

Short version: a field goal is a real basket from open play (2 or 3 points, contested); a free throw is a 1-point bonus shot given because the other team fouled.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sports2-amateur-vs-professional',
    title: 'Amateur vs professional athlete',
    category: 'sports',
    keywords: [
      'difference between an amateur and a professional athlete', 'amateur competes without pay', 'professional is paid to compete and train',
      'Olympic amateurism abolished 1980s', 'NCAA amateurism NIL', 'prize money endorsements', 'shamateurism',
    ],
    content: `The traditional distinction is money: a PROFESSIONAL athlete is paid to compete and train — a salary, prize money, appearance fees, and/or endorsement income — and it is their job. An AMATEUR competes without being paid for it (they may have another job, or be a student, or be supported by a federation or scholarship).

Historically the line was policed strictly and was tangled up with class: the Olympic Games barred professionals until the 1970s-80s, forcing top athletes to compete as amateurs or "shamateurs" (paid under the table) — the rule was dropped so the Olympics could feature the best players (the 1992 US "Dream Team" in basketball). Rugby union was amateur until 1995. Boxing keeps a genuine amateur (Olympic) vs professional split with different rules.

The biggest live debate is US college sports: the NCAA enforced "amateurism" (no salaries, limited benefits) for over a century while generating billions, until court rulings and state laws forced it to allow athletes to earn from their "Name, Image and Likeness" (NIL) from 2021, and revenue-sharing with athletes is now arriving.

In practice most sports now have a clear pro tier and an amateur/participation tier, and "amateur" often just means "not (yet) making a living at it" rather than a moral category.`,
    createdAt: Date.now(),
  },
];
