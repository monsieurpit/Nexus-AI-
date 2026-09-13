import { KnowledgeItem } from '../../types';

/**
 * FOOTBALL_AMERICAN_CONCEPTS_GAPS — batch 268 corrections. First-ever
 * dedicated American football (NFL) batch. Worst sports result of the whole
 * session: 17 misses out of 25, with the cross-sport-contamination pattern
 * (seen across hockey, basketball, and baseball batches before this one)
 * showing up again and again — soccer terms/rules bleeding in FOUR separate
 * times, plus a business-franchising hallucination and a WWII history
 * hallucination. Note: this file is a plain knowledge-base corpus about
 * general NFL/football terminology — it does NOT touch footballIntelligence.ts,
 * which is off-limits per Patrick's standing rule and covers different
 * ground (real-time match intelligence, not rules/terminology explainers).
 * nexus-4b handled well: cornerback/safety, field goal/extra point, first
 * down/touchdown, wide receiver/tight end, man/zone coverage, Pro Bowl/Super
 * Bowl, practice squad/roster. Misses:
 * - "offensive lineman vs defensive lineman", "fumble vs interception", "play
 *   action vs normal pass", "two-point conversion vs extra point" all
 *   explained only the FIRST half and got cut off.
 * - "quarterback sack vs tackle" used "slide tackle" — a SOCCER term — and
 *   never clarified a sack is specifically a tackle of the QB behind the
 *   line before he can throw.
 * - "punt vs kickoff" was a pure web dump (American vs Canadian football,
 *   then a random 2003 NFL playoffs recap).
 * - "NFC vs AFC" was a SEVERE hallucination: claimed AFC stands for "Asian
 *   Football Confederation" (soccer's Asian governing body) — in NFL context
 *   it's the American Football Conference, one of the league's two halves.
 * - "blitz vs normal pass rush" hallucinated a SOCCER GOALKEEPER concept,
 *   then pivoted into describing the WWII Battle of Britain and the Blitz
 *   bombing of London — totally unrelated to the football term.
 * - "running back vs fullback" was a web dump that never contrasted the two.
 * - "false start vs offside penalty" described SOCCER's offside rule
 *   (nearer the goal line than the ball and second-last defender, indirect
 *   free kick) instead of the actual American-football false start penalty.
 * - "franchise tag vs contract extension" hallucinated BUSINESS FRANCHISING
 *   (McDonald's-style franchisees paying fees/royalties) instead of the NFL
 *   roster mechanism that restricts a player's free agency for a season.
 * - "man in motion vs shift" described generic man-to-man MARKING (a
 *   basketball/soccer defensive concept) instead of either pre-snap concept.
 * - "hail mary vs normal passing play" injected soccer language ("score a
 *   goal", "get their foot on it", a reference to Aguero's famous 2012
 *   soccer title-winning goal).
 * - "college overtime rules vs NFL overtime rules" never actually described
 *   either league's OVERTIME format, rambling about unrelated catch/clock
 *   rules instead.
 * - "red zone vs rest of field" said "22-yard box" and "score goals" — wrong
 *   number (it's the 20-yard line) and soccer vocabulary (touchdowns, not
 *   goals).
 * - "audible vs called play" got it backwards, describing an audible as the
 *   COACH calling a play during the game, when an audible is specifically
 *   the QUARTERBACK changing the play AT THE LINE based on what he sees.
 * - "nickel package vs base defense" gave a muddled, wrong personnel count
 *   and never explained base defense for contrast.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'american football', keywords, content, createdAt: now,
});

export const FOOTBALL_AMERICAN_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-nfl-oline-vs-dline',
    'Offensive lineman vs defensive lineman',
    [
      'difference between an offensive lineman and a defensive lineman in football', 'offensive linemen block for their own team protecting the quarterback from being tackled and opening running lanes for the ball carrier',
      'defensive linemen do the opposite job they try to get past the offensive line to tackle the quarterback or ball carrier and disrupt the play',
      'offensive line and defensive line face off directly against each other at the snap trying to push in opposite directions',
    ],
    `An OFFENSIVE LINEMAN blocks FOR their own team — their job is to protect the quarterback from being tackled long enough for him to throw, and to open running lanes for the ball carrier by physically pushing defenders out of the way.

A DEFENSIVE LINEMAN does the OPPOSITE job — their goal is to fight past the offensive line to get to the quarterback or ball carrier, tackling them and disrupting the play before it can develop.

The two groups line up directly across from each other at the snap and are constantly pushing in opposite directions: offensive linemen trying to hold their ground (or drive forward on running plays) to protect their own side, defensive linemen trying to break through and make a play on the other team's side.`,
  ),
  k(
    'kb-gap-nfl-sack-vs-tackle',
    'Quarterback sack vs a regular tackle (not soccer)',
    [
      'difference between a quarterback sack and a tackle in football', 'this is american football not soccer there is no slide tackle in gridiron football',
      'a tackle is the general term for bringing any ball carrier down to the ground to stop the play regardless of which player or position is involved',
      'a sack is a specific TYPE of tackle that only applies to the quarterback and only counts when he is brought down BEHIND the line of scrimmage before he can throw a pass or hand the ball off',
      'every sack is a tackle but most tackles are not sacks since a sack requires the quarterback specifically to be stopped behind his own line before the play develops',
    ],
    `A TACKLE is the general term for bringing ANY ball carrier down to the ground to stop the play — it can happen to a running back, a receiver, or a quarterback, anywhere on the field.

A SACK is a specific, narrower TYPE of tackle: it only applies to the QUARTERBACK, and it only counts when he's brought down BEHIND the line of scrimmage before he manages to throw a pass or hand the ball off. It's specifically about stopping the play before it even develops downfield.

So the relationship is: every sack is technically a tackle, but most tackles are NOT sacks — a tackle on a running back after a 5-yard gain, or on a receiver after he catches a pass, is just a regular tackle, not a sack, since a sack requires that very specific "quarterback stopped behind the line before the ball leaves his hands" situation. (There is no "slide tackle" in American football — that's a soccer term for a defender sliding to kick the ball away, which doesn't exist in this sport.)`,
  ),
  k(
    'kb-gap-nfl-fumble-vs-interception',
    'Fumble vs interception',
    [
      'difference between a fumble and an interception in football', 'a fumble happens when a ball carrier loses control of the ball while running with it and it comes loose usually from a hit or a mishandled catch',
      'an interception happens when a defensive player catches a forward pass that was thrown by the quarterback intended for one of his own receivers',
      'both are turnovers meaning the offense loses possession but a fumble is a lost grip on the ball during a play and an interception is specifically a caught pass meant for someone else',
    ],
    `A FUMBLE happens when a ball carrier — usually a running back, receiver, or quarterback — LOSES CONTROL of the ball while running with it or being tackled, and it comes loose on the ground, where either team can then recover it.

An INTERCEPTION happens specifically when a DEFENSIVE player CATCHES a forward pass that the quarterback threw, intending it for one of his own receivers — the ball never even touches the ground, it's caught directly out of the air by the wrong team.

Both count as turnovers (the offense loses possession either way), but the mechanism is completely different: a fumble is about LOSING GRIP on the ball during a play, while an interception is specifically about a THROWN PASS being caught by the other team instead of the intended receiver.`,
  ),
  k(
    'kb-gap-nfl-punt-vs-kickoff',
    'Punt vs kickoff',
    [
      'difference between a punt and a kickoff in football', 'a punt happens during a normal offensive possession usually on fourth down when a team gives up trying to advance the ball and kicks it away to the other team to improve field position',
      'a kickoff happens at the start of each half and after every score it is how possession is handed over to begin a new drive from a designated spot usually the 35 yard line',
      'a punter kicks the ball on a punt a kicker usually kicks off on a kickoff both involve kicking but they happen at completely different moments in the game for different reasons',
    ],
    `A PUNT happens DURING a normal offensive possession — typically on fourth down, when a team decides they can't (or don't want to try to) gain the yards needed for a first down, so instead they kick the ball away to the other team to improve field position rather than risk turning it over on downs right where they are.

A KICKOFF happens at the START of each half, and after every score (touchdown or field goal) — it's the mechanism used to hand possession over to begin a brand new drive, kicked from a designated spot (usually around the 35-yard line).

Both involve kicking the ball to the other team, but they happen at completely different moments for different reasons: a punt is a strategic choice made mid-drive to avoid a risky 4th-down attempt, while a kickoff is the automatic, scheduled way every half and every scoring drive restarts.`,
  ),
  k(
    'kb-gap-nfl-nfc-vs-afc',
    'NFC vs AFC (NFL conferences, not soccer confederations)',
    [
      'difference between the nfc and the afc in the nfl', 'this is about the national football league not soccer confederations the afc here does not mean asian football confederation',
      'the nfl is split into two conferences the national football conference nfc and the american football conference afc each with sixteen teams organized into four divisions',
      'the winner of the nfc and the winner of the afc each season meet in the super bowl to decide the nfl champion',
      'afc in this football context stands for american football conference not any soccer organization',
    ],
    `In the NFL, "NFC" and "AFC" are the league's two CONFERENCES — the National Football Conference (NFC) and the American Football Conference (AFC) — each made up of 16 teams split into four divisions (East, West, North, South).

Every season, the winner of the NFC and the winner of the AFC (each conference has its own separate playoff bracket) meet each other in the SUPER BOWL to decide the overall NFL champion.

Important correction: in this context, "AFC" has nothing to do with soccer's Asian Football Confederation, which is a completely different organization governing a different sport on a different continent. In American football, AFC = American Football Conference, one of the NFL's own two halves.`,
  ),
  k(
    'kb-gap-nfl-blitz-vs-pass-rush',
    'Blitz vs normal pass rush (not soccer, not WWII)',
    [
      'difference between a blitz and a normal pass rush in football', 'this is american football terminology not a soccer goalkeeper concept and not the WWII Blitz bombing of London',
      'a normal pass rush is when only the players already on the defensive line rush the quarterback typically four defensive linemen while everyone else drops back into pass coverage',
      'a blitz is when the defense sends EXTRA players beyond the normal defensive line usually linebackers or defensive backs to rush the quarterback all at once trying to overwhelm the offensive line and get to him faster',
      'a blitz increases the pressure and speed of the pass rush but leaves fewer defenders in coverage which is riskier if the quarterback gets the ball out quickly',
    ],
    `A normal PASS RUSH is when only the players already positioned on the defensive line — typically four defensive linemen — rush forward to try to get to the quarterback, while everyone else on defense drops back into pass coverage to guard receivers.

A BLITZ is when the defense sends EXTRA players beyond that normal defensive line — usually linebackers or defensive backs — to rush the quarterback all at once, on top of the regular line rush. The goal is to overwhelm the offensive line with more rushers than they have blockers, getting to the quarterback faster than a normal rush would.

The trade-off: a blitz creates more pressure and speed, but it leaves FEWER defenders back in coverage, which is riskier if the quarterback manages to get the ball out quickly to an open receiver before the extra rushers arrive. (This is a completely different concept from a soccer goalkeeper coming off his line, and has nothing to do with the World War II "Blitz" bombing campaign — the football term borrows the word for "sudden, overwhelming attack" but describes a specific defensive football tactic.)`,
  ),
  k(
    'kb-gap-nfl-running-back-vs-fullback',
    'Running back vs fullback',
    [
      'difference between a running back and a fullback in football', 'a running back also called a halfback or tailback is usually the primary ball carrier the player who most often actually runs with the ball and tries to gain yards',
      'a fullback is usually a bigger more physical player whose main job is blocking for the running back leading the way and clearing a path rather than carrying the ball himself most of the time',
      'in many modern offenses only one running back is on the field at a time and the fullback role is used less often but the core distinction is ball carrier versus blocker',
    ],
    `A RUNNING BACK (also called a halfback or tailback) is usually the PRIMARY BALL CARRIER — the player who most often actually runs with the ball and tries to gain yards on running plays, and who can also catch passes out of the backfield.

A FULLBACK is typically a bigger, more physically powerful player whose main job is BLOCKING for the running back — leading the way ahead of him and clearing a path by taking on linebackers and defenders, rather than carrying the ball himself most of the time (though fullbacks do occasionally get short-yardage carries).

The core distinction: a running back is primarily the one who carries the ball, while a fullback is primarily the one who blocks to help the running back carry it further. Many modern NFL offenses use fullbacks less often than in the past, favoring more passing-focused formations, but the basic role difference is still ball-carrier vs. blocker.`,
  ),
  k(
    'kb-gap-nfl-false-start-vs-offside',
    'False start vs offside penalty (American football, not soccer)',
    [
      'difference between a false start and an offside penalty in american football', 'this is american football penalties not soccer offside rules there is no indirect free kick or second last defender rule here',
      'a false start is called on the OFFENSE when any offensive player moves illegally before the ball is snapped a five yard penalty',
      'an offside penalty in american football is called on the DEFENSE when a defensive player is lined up across the line of scrimmage into the neutral zone before the ball is snapped also a five yard penalty',
      'both are pre snap penalties for moving or being positioned illegally before the play starts the difference is which side of the ball committed it offense false start defense offside',
    ],
    `In American football, both a false start and an offside penalty are PRE-SNAP penalties — violations that happen before the ball is even snapped — but they're called on OPPOSITE sides of the ball.

A FALSE START is called on the OFFENSE: any offensive player (other than a legal shift/motion) moves illegally before the ball is snapped — typically a 5-yard penalty.

An OFFSIDE penalty (in American football) is called on the DEFENSE: a defensive player is lined up across the line of scrimmage, into the neutral zone, before the ball is snapped — also typically a 5-yard penalty.

The simple way to remember it: false start = offense jumped early, offside = defense jumped early. (This has nothing to do with soccer's offside rule, which is about attacking players' positioning relative to the ball and the second-last defender during play — American football's "offside" is purely a pre-snap lining-up violation, a completely different concept using the same word.)`,
  ),
  k(
    'kb-gap-nfl-play-action-vs-normal-pass',
    'Play action pass vs a normal pass play',
    [
      'difference between a play action pass and a normal pass play in football', 'a normal pass play is when the quarterback drops back to throw right from the snap with no fake handoff involved',
      'a play action pass starts by having the quarterback fake a handoff to the running back as if it were a running play to trick the defense into believing run is coming before he pulls the ball back and throws it',
      'the goal of play action is to get linebackers and safeties to step forward toward the fake run opening up passing lanes and space behind them for receivers',
    ],
    `A NORMAL PASS PLAY is straightforward: the quarterback drops back to throw the ball right from the snap, with no deception about a run — the defense generally knows a pass is likely coming based on the situation.

A PLAY ACTION PASS starts by having the quarterback FAKE a handoff to the running back, making it look exactly like a running play, before pulling the ball back and actually throwing a pass instead.

The whole point of play action is to trick linebackers and safeties into stepping forward or committing toward the fake run, which opens up passing lanes and creates open space behind them for receivers to get open — it's a deception play that borrows the threat of the run to make the actual pass more effective.`,
  ),
  k(
    'kb-gap-nfl-franchise-tag',
    'Franchise tag vs contract extension (NFL, not business franchising)',
    [
      'difference between a franchise tag and a contract extension in the nfl', 'this is an nfl roster and free agency mechanism not mcdonalds style business franchising there are no franchisees paying royalties here',
      'a franchise tag is a one year restriction a team can place on one of its own players who is about to become a free agent guaranteeing him a high one year salary based on the average of the top salaries at his position while keeping him from signing with another team that season',
      'a contract extension is a new multi year deal negotiated and agreed to by both the player and the team usually offering long term security and often more total guaranteed money than a single franchise tag year',
      'teams use the franchise tag as a temporary one year stopgap when they want to keep a player but have not yet agreed on a long term contract extension',
    ],
    `The FRANCHISE TAG is a specific NFL roster mechanism: it's a one-year restriction a team can place on one of its OWN players who's about to become a free agent, guaranteeing him a high one-year salary (based on the average of the top salaries at his position) while preventing him from signing with another team that season. It's essentially a temporary "we're keeping you for one more year" tool, used when a team wants to retain a player but hasn't yet worked out a longer deal.

A CONTRACT EXTENSION is a completely different thing: a new, negotiated multi-year deal that both the player and team have actually AGREED to, typically offering long-term security and often more total guaranteed money spread across several years, rather than just one locked-in season.

Teams often use the franchise tag as a stopgap specifically because they haven't yet reached agreement on a real long-term extension — buying themselves one more year to keep negotiating (or to eventually let the player walk) rather than losing him to free agency immediately. (This has nothing to do with business franchising like a McDonald's franchisee paying licensing fees and royalties — it's an entirely NFL-specific labor/roster rule.)`,
  ),
  k(
    'kb-gap-nfl-two-point-conversion-vs-extra-point',
    'Two-point conversion vs extra point',
    [
      'difference between a two point conversion and an extra point in football', 'an extra point is a short kick through the uprights after a touchdown worth one point and is successful the large majority of the time',
      'a two point conversion is an alternative option after a touchdown where instead of kicking the offense runs one more play from a short distance usually the two or three yard line trying to run or pass the ball into the end zone again worth two points if successful but riskier and less consistently successful than the extra point kick',
      'a team can choose either option after every touchdown but not both the extra point is the safer higher percentage choice the two point conversion is the higher risk higher reward choice',
    ],
    `An EXTRA POINT is a short kick through the goalposts (uprights) after a touchdown, worth ONE point — it's successful the large majority of the time since it's a relatively short, low-risk kick.

A TWO-POINT CONVERSION is the alternative option after a touchdown: instead of kicking, the offense runs one more play from very close range (usually the 2- or 3-yard line), trying to run or pass the ball into the end zone again. If successful, it's worth TWO points instead of one — but it's riskier and succeeds less consistently than the extra point kick.

A team gets to choose ONE of these two options after every touchdown, never both: the extra point is the safer, higher-percentage choice for a guaranteed point, while the two-point conversion is the higher-risk, higher-reward choice, usually attempted when a team needs the extra point specifically to tie or take the lead in a close game.`,
  ),
  k(
    'kb-gap-nfl-man-in-motion-vs-shift',
    'Man in motion vs a shift (pre-snap offense)',
    [
      'difference between man in motion and a shift in football', 'this is about pre snap offensive movement not defensive man to man marking',
      'man in motion is when ONE offensive player moves laterally parallel to the line of scrimmage before the snap while the rest of the offense stays still trying to create a mismatch or reveal the defenses coverage',
      'a shift is when multiple offensive players change their positions or the whole formation repositions before settling back down and coming to a complete stop before the ball is snapped',
      'both are legal pre snap offensive adjustments used to confuse the defense or gain a positional advantage before the play even starts',
    ],
    `MAN IN MOTION is when just ONE offensive player moves laterally (parallel to the line of scrimmage, not toward it) before the snap, while the rest of the offense stays still — often used to create a favorable matchup, or to force the defense to reveal whether they're in man or zone coverage by seeing who follows the moving player.

A SHIFT is when MULTIPLE offensive players (or the entire formation) change position before the snap — moving from one formation to another — but everyone has to come to a complete stop and set before the ball is actually snapped, or it's a penalty.

Both are legal pre-snap adjustments used to confuse the defense or gain a positional edge before the play even begins, but the scale is different: man in motion is one player moving, a shift involves several players or the whole formation repositioning. (This is different from defensive man-to-man marking, which is about which defender covers which offensive player during the actual play, not pre-snap offensive movement.)`,
  ),
  k(
    'kb-gap-nfl-hail-mary',
    'Hail Mary vs a normal passing play (football, not soccer)',
    [
      'difference between a hail mary and a normal passing play in football', 'this is american football not soccer there is no scoring goals or kicking it in here',
      'a hail mary is a very long low percentage forward pass usually thrown as a desperate last resort near the end of a half or game when a team is out of time and needs a big play',
      'multiple offensive receivers run to the same area near the end zone hoping one of them can out jump the defenders and catch the pass for a touchdown',
      'a normal passing play targets a specific receiver based on a designed route and read rather than just throwing it up for grabs to a crowd of players',
    ],
    `A HAIL MARY is a very long, low-percentage forward pass — thrown as a desperate last resort, almost always near the end of a half or game when a team is nearly out of time and needs one big play to have a chance. The quarterback typically just heaves the ball as far as he can toward the end zone, where several of his own receivers have all run to the same general area, hoping one of them can out-jump the defenders and catch it for a touchdown.

A NORMAL passing play, by contrast, targets a SPECIFIC receiver based on a designed route and the quarterback reading the defense — it's a controlled, planned throw to whoever gets open, not a "throw it up and hope" situation.

The difference is essentially desperation and probability: a normal pass play has a real, planned target and a decent chance of success, while a Hail Mary is a low-odds, chaotic heave used only when there's no time or better option left. (This is football scoring a touchdown by catching the pass in the end zone — not "scoring a goal" or "getting a foot on it," which are soccer terms for a completely different sport.)`,
  ),
  k(
    'kb-gap-nfl-overtime-rules',
    'College football overtime rules vs NFL overtime rules',
    [
      'difference between college football overtime rules and nfl overtime rules', 'in the nfl overtime is a modified sudden death period both teams generally get a chance at possession unless the first team scores a touchdown on their opening drive in which case the game ends immediately',
      'nfl overtime starts with a kickoff just like a normal period and is played with a running clock like the rest of the game a single period is usually ten minutes in the regular season',
      'in college football ncaa overtime there is no kickoff at all instead each team gets the ball starting at the opponents 25 yard line taking turns trying to score with no game clock running during these possessions',
      'college overtime keeps alternating these short possessions until one team scores and the other does not on the same round the nfl format ends faster on a first drive touchdown while college guarantees both teams get an equal shot at the same distance',
    ],
    `NFL overtime is a MODIFIED SUDDEN-DEATH period: it starts with a normal kickoff and is played with a running game clock just like regulation. Both teams generally get a chance at possession — UNLESS the team that gets the ball first scores a TOUCHDOWN on that opening drive, in which case the game ends immediately without the other team ever touching the ball. If it's a field goal instead, the other team gets a chance to answer.

College football (NCAA) overtime works completely differently: there's no kickoff at all. Instead, each team gets the ball starting at the OPPONENT'S 25-yard line, taking turns trying to score, with no game clock running during these short possessions at all. This keeps alternating — both teams get an equal-distance opportunity each round — until one team scores and the other doesn't on the same round, ending the game.

The core difference: NFL overtime is closer to a continuation of regular football (kickoff, running clock, sudden-death-with-a-twist), while college overtime is a series of short, clock-free, equal-opportunity possessions from the same short field for both teams.`,
  ),
  k(
    'kb-gap-nfl-red-zone',
    'Red zone vs the rest of the field (correct yard line and terminology)',
    [
      'difference between the red zone and the rest of the field in football', 'the red zone is the area of the field between the opponents 20 yard line and their goal line not the 22 yard line',
      'in the red zone teams are trying to score a touchdown not a goal touchdowns are worth six points not goals',
      'outside the red zone in the rest of the field teams focus more on gaining yardage moving the chains and setting up field position rather than being in immediate scoring range',
    ],
    `The RED ZONE is the specific area of the field between the opponent's 20-YARD LINE and their goal line — not the 22-yard line. It's called that because a team inside this area is in serious scoring range, and how well (or poorly) a team converts red zone trips into touchdowns is a heavily tracked stat.

Inside the red zone, teams are trying to score a TOUCHDOWN (worth six points) — not a "goal," which is soccer terminology for a different sport entirely.

Outside the red zone, in the rest of the field, teams are more focused on gaining yardage, moving the chains for first downs, and building field position, rather than being in immediate scoring range — the red zone is specifically the part of the field where the offense's priorities shift toward finishing drives.`,
  ),
  k(
    'kb-gap-nfl-audible-vs-called-play',
    'Audible vs a called play (the QB changes it, not the coach mid-game)',
    [
      'difference between an audible and a called play in football', 'a called play is the play the coaching staff decides on and sends in to the quarterback usually through a signal or radio headset before the snap',
      'an audible is when the QUARTERBACK himself changes that called play AT THE LINE OF SCRIMMAGE right before the snap based on what he sees in the defenses formation calling out a new play or adjustment to his teammates',
      'the coach picks the original play through the normal call the quarterback is the one who overrides it with an audible not the coach shouting instructions live during the down',
    ],
    `A CALLED PLAY is the play the coaching staff decides on and sends in to the quarterback — usually through hand signals, a play sheet, or a radio headset — BEFORE the play even starts, while the offense is in the huddle or getting set.

An AUDIBLE is when the QUARTERBACK HIMSELF changes that already-called play AT THE LINE OF SCRIMMAGE, right before the snap, based on what he sees in the defense's formation or coverage — he calls out a new play or adjustment to his own teammates on the spot.

The key correction: an audible is the quarterback's own real-time override of the coach's play call, made in the few seconds right before the snap based on what he's reading from the defense — it's not the coach shouting new instructions live during the play from the sideline.`,
  ),
  k(
    'kb-gap-nfl-nickel-package-vs-base',
    'Nickel package vs base defense',
    [
      'difference between a nickel package and a base defense in football', 'a base defense is the standard defensive personnel grouping a team uses most often typically four defensive linemen three linebackers and four defensive backs in a common 4-3 setup',
      'a nickel package replaces one linebacker with a FIFTH defensive back the nickelback giving the defense more pass coverage instead of run support used when the offense is expected to pass',
      'nickel comes from the US five cent coin as a reference to the fifth defensive back not from six players on the line',
    ],
    `A BASE DEFENSE is the standard defensive personnel grouping a team uses most often — a common example is four defensive linemen, three linebackers, and four defensive backs (a "4-3" defense), built to handle a balanced mix of running and passing plays.

A NICKEL PACKAGE swaps out one of the linebackers for a FIFTH defensive back (called the "nickelback") — giving the defense more pass coverage at the cost of a run-stopper, typically brought in specifically when the defense expects the offense to pass the ball.

The name "nickel" comes from the U.S. five-cent coin, referencing that FIFTH defensive back specifically — it's not about six defensive linemen or any other headcount; the defining feature of a nickel package is simply "one extra defensive back instead of a linebacker."`,
  ),
];
