import { KnowledgeItem } from '../../types';

/**
 * HOCKEY_CONCEPTS_GAPS — batch 265 corrections. First-ever hockey/NHL batch —
 * no hockey corpus file existed before this. Brutal result: 15 misses out of
 * 25, several of them severe wrong-sport hallucinations (basketball,
 * volleyball, soccer terminology dropped into hockey questions), putting
 * hockey among the worst domains tested this session, alongside automotive
 * (batch 251) and video game genres (batch 263). nexus-4b handled well:
 * icing/offside, power play/penalty kill, minor/major penalty, slashing/
 * tripping, hat trick/Gordie Howe hat trick, shootout/overtime, body check/
 * boarding, Stanley Cup playoffs/regular season, blue line/red line, man
 * advantage/even strength. Misses:
 * - "AHL vs NHL" claimed hybrid icing is an AHL-specific rule the NHL
 *   doesn't use — wrong, the NHL adopted hybrid icing back in 2013-14.
 * - "forward vs defenseman" and "captain vs alternate captain" and "one-timer
 *   vs regular shot" and "game misconduct vs match penalty" all explained
 *   only the FIRST half and got cut off before the second.
 * - "center vs winger" hallucinated SOCCER terms (touchline, crossing,
 *   cutting inside on the stronger foot) for a hockey question.
 * - "slap shot vs wrist shot" hallucinated BASKETBALL (block/steal) and
 *   claimed there's nothing about slap/wrist shots at all.
 * - "faceoff win vs faceoff violation" hallucinated VOLLEYBALL (hitting a
 *   ball with fists at center court).
 * - "delayed penalty vs immediate penalty" was a pure web dump about penalty
 *   cards in other sports.
 * - "breakaway vs two-on-one" never answered the question at all, dumping
 *   generic overtime/shootout + basic hockey-rules text instead.
 * - "power forward vs grinder" explained power forward reasonably but never
 *   addressed "grinder" at all.
 * - "Original Six vs expansion teams" was a severe factual disaster: claimed
 *   the Original Six were COUNTRIES (Canada, USA, Russia, Sweden, Finland,
 *   UK) from "1926" — it's actually six specific NHL TEAMS (Bruins,
 *   Blackhawks, Red Wings, Canadiens, Rangers, Maple Leafs) from the
 *   1942-1967 era when the league had exactly six teams.
 * - "plus/minus vs points" explained plus/minus loosely but never explained
 *   points (goals + assists) at all.
 * - "glove save vs blocker save" used "ball" throughout instead of "puck" —
 *   wrong-sport terminology bleeding into an otherwise roughly-correct idea.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'hockey', keywords, content, createdAt: now,
});

export const HOCKEY_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-hky-ahl-vs-nhl',
    'AHL vs NHL',
    [
      'difference between the ahl and the nhl', 'nhl national hockey league is the top professional league the highest level of pro hockey in north america',
      'ahl american hockey league is the primary minor league developmental affiliate one level below the nhl where prospects and players on entry level contracts develop and injured nhl players rehab',
      'both the ahl and the nhl use hybrid icing it is not an ahl only rule the nhl adopted hybrid icing in the 2013 to 2014 season',
      'ahl teams are directly affiliated with and owned by or partnered with specific nhl parent clubs',
    ],
    `The NHL (National Hockey League) is the top professional hockey league in the world — the highest level a player can reach in North America, with the best talent, biggest arenas, and the Stanley Cup as its championship.

The AHL (American Hockey League) is the primary MINOR/developmental league one level below the NHL. Each AHL team is directly affiliated with (usually owned by or partnered with) a specific NHL parent club, and it's where prospects develop, players on entry-level contracts get NHL-adjacent game experience, and injured NHL players go to rehab through game action before returning.

Important correction: hybrid icing is NOT something that separates the two leagues — the NHL adopted hybrid icing (the "race to the dot" rule instead of full touch-icing) back in the 2013–14 season, and the AHL uses the same rule too. The real differences are level of talent, arena size/atmosphere, and pay, not the icing rule.`,
  ),
  k(
    'kb-gap-hky-forward-vs-defenseman',
    'Forward vs defenseman in hockey',
    [
      'difference between a forward and a defenseman in hockey', 'forwards centers and wingers primarily focus on offense attacking scoring goals and forechecking in the opponents zone',
      'defensemen play closer to their own goal primarily focus on defense blocking shots clearing the puck out of their own zone and starting breakout passes though they can also join the rush and score',
      'a team has three forwards and two defensemen on the ice at a time plus a goalie for a total of six skaters',
    ],
    `FORWARDS (centers and wingers) are the primary attackers — their main job is generating offense: carrying the puck up ice, forechecking to pressure the other team, creating and finishing scoring chances in the offensive zone.

DEFENSEMEN play closer to their own net and their main job is defense: blocking shots and passing lanes, clearing the puck out of their own zone under pressure, and starting the breakout (the transition from defense to offense) with an outlet pass. Good defensemen also join the offensive rush and can score plenty of goals themselves, but their primary defensive responsibility comes first.

On the ice at any moment, a team normally has three forwards and two defensemen (plus the goalie) — five skaters at even strength — split between those two roles.`,
  ),
  k(
    'kb-gap-hky-center-vs-winger',
    'Center vs winger in hockey (not soccer terms)',
    [
      'difference between a center and a winger in hockey', 'this is ice hockey positions not soccer or football',
      'a center plays in the middle of the ice takes most defensive and offensive zone faceoffs and is responsible for supporting both wingers and covering the most ice defensively',
      'a winger left wing or right wing plays out wide along the boards on their side of the ice generally more specialized in scoring or physical forechecking along the boards than centers',
    ],
    `A CENTER plays in the middle of the ice and is generally considered the most complete, two-way position — they take the vast majority of faceoffs, are expected to backcheck (help defend) more than wingers, and link up with both wingers on their line, covering more of the ice overall.

A WINGER (left wing or right wing) plays out wide, along their respective side of the ice near the boards, and is typically more specialized — either as a pure scorer who camps near the net for chances, or as a physical forechecker who battles for the puck along the boards. Wingers generally have a narrower defensive responsibility than centers.

(This is ice hockey terminology specifically — it has nothing to do with soccer positions like touchline wingers or crossing the ball; hockey wingers don't "cross" anything, they pass and shoot on a rink.)`,
  ),
  k(
    'kb-gap-hky-slap-shot-vs-wrist-shot',
    'Slap shot vs wrist shot (hockey, not basketball)',
    [
      'difference between a slap shot and a wrist shot in hockey', 'this is about shooting a puck in ice hockey not basketball blocks or steals',
      'a slap shot involves winding up bringing the stick back high then swinging down hard hitting the ice slightly behind the puck to load the stick like a spring producing the hardest and fastest shot but the slowest to release and easiest for a goalie to see coming',
      'a wrist shot uses a quick wrist flicking motion with the puck rolling along the blade with almost no backswing much faster to release and more accurate though generally not as hard as a full slap shot',
    ],
    `A SLAP SHOT is hockey's hardest, fastest shot: the player winds up with a big backswing, brings the stick down hard and strikes the ICE just slightly behind the puck first (flexing/loading the stick like a spring) before it snaps forward into the puck. It produces the highest shot speed of any shot type, but takes the longest to wind up and release, which makes it the easiest for a goalie and defenders to see coming and react to.

A WRIST SHOT uses a quick flicking motion of the wrists, rolling the puck along the stick blade with almost no backswing at all. It's released far faster than a slap shot and is generally more accurate, though it's usually not as hard/fast as a full slap shot.

The trade-off in both cases: slap shots trade release speed for raw power, wrist shots trade raw power for quicker release and better accuracy/deception. (Nothing here relates to basketball — "block" and "steal" are basketball/football defensive plays, not hockey shot types.)`,
  ),
  k(
    'kb-gap-hky-captain-vs-alternate-captain',
    'Captain vs alternate captain in hockey',
    [
      'difference between a captain and an alternate captain in hockey', 'the captain wears a C on their jersey is the single official team leader chosen for the season and is the only player normally allowed to discuss rule interpretations with the referee',
      'an alternate captain wears an A on their jersey there can be up to two or three at a time and they take on the captains on ice leadership duties including talking to referees when the captain is off the ice injured or a defenseman is needed at the point',
      'if the captain is not on the ice or not in the lineup an alternate captain automatically has the same rights to speak with officials',
    ],
    `The CAPTAIN wears the "C" on their jersey and is the single official team leader for the season — traditionally, NHL rules also make the captain the only player normally allowed to discuss rule interpretations directly with the referee.

An ALTERNATE CAPTAIN wears an "A" on their jersey — a team can have up to two or three alternate captains at once (NHL rules cap how many can be on the ice with the "A" rights at a given time). They share the on-ice leadership role and, importantly, get the SAME right to speak with officials as the captain whenever the actual captain is off the ice, injured, or not in the lineup that game — so there's always someone wearing a letter who can talk to the refs even when the captain themselves isn't playing.

In short: the captain is the singular, season-long official leader; alternate captains are the backups who share leadership duties and step into the captain's on-ice referee-communication role whenever the captain can't do it themselves.`,
  ),
  k(
    'kb-gap-hky-icing-waved-off',
    'Icing waved off vs icing called',
    [
      'difference between icing being waved off and icing being called in hockey', 'icing is called when the puck is shot from behind the center red line on your own side all the way across the opposing goal line untouched and stops there or is touched by the defending team first in a hybrid icing race',
      'icing is automatically waved off not called even if the puck crosses the goal line untouched in several exception cases',
      'exceptions where icing is waved off include the shorthanded team icing the puck while on a penalty kill, the puck going in the net which just counts as a goal, the goalie leaving the crease to play the puck or being able to play it, the puck touching any player of either team before crossing the goal line, or the puck passing through the crease area in a way officials judge the goalie could have played',
    ],
    `Icing is CALLED (whistled dead) when a team shoots the puck from their own side of the center red line all the way down and across the opposing team's goal line, untouched, and the defending team reaches/touches it first in the "hybrid icing" race to the faceoff dot — play stops and there's a faceoff back in the offending team's own zone.

Icing is automatically WAVED OFF (not called, even though the puck crossed the line) in several specific exception cases: if the puck actually goes IN the net (that's just a goal, not icing), if the team that shot it is SHORTHANDED on a penalty kill (a shorthanded team is allowed to ice the puck freely to relieve pressure), if the puck is TOUCHED by any player of either team before it crosses the goal line, if the goalie could have played the puck but chose not to (referee judgment), or if the goalie actually comes out of the crease to play it.

So the key distinction isn't a different rule set (like NHL vs IIHF) — it's these specific built-in EXCEPTIONS that override an icing call even when the puck technically traveled the full length of the ice.`,
  ),
  k(
    'kb-gap-hky-delayed-penalty',
    'Delayed penalty vs immediate penalty',
    [
      'difference between a delayed penalty and an immediate penalty in hockey', 'an immediate penalty stops play right away with a whistle and the offending player goes straight to the penalty box',
      'a delayed penalty happens when the referee sees an infraction by the defending team but the team that was fouled still has possession of the puck the referee raises an arm and does not blow the whistle letting play continue',
      'during a delayed penalty the non offending team can pull their goalie for an extra attacker since play only stops once the offending team touches the puck or the play ends',
    ],
    `An IMMEDIATE penalty is the normal case: the referee blows the whistle right away the moment they see the infraction, stopping play instantly, and the offending player skates straight to the penalty box.

A DELAYED penalty happens specifically when the DEFENDING team commits a foul while the team that got fouled still has possession/control of the puck. Instead of blowing the whistle immediately (which would take the puck away from the team that just got fouled), the referee raises an arm and lets play CONTINUE — the whistle only blows once the offending team's player touches the puck, or the attacking team's possession ends (like the puck leaving the zone).

This matters tactically: during a delayed penalty, the team benefiting from it can pull their own goalie for an extra attacker (since no penalty has technically started yet and there's zero risk — the whistle stops play the instant the other team touches the puck anyway), giving them a brief 6-on-4 or similar advantage to try to score before the delayed penalty officially takes effect.`,
  ),
  k(
    'kb-gap-hky-faceoff-win-vs-violation',
    'Faceoff win vs faceoff violation (not volleyball)',
    [
      'difference between a faceoff win and a faceoff violation in hockey', 'this is about ice hockey faceoffs not volleyball',
      'a faceoff is how play restarts one player from each team called the centers face each other and the linesman or referee drops the puck between their sticks on the ice',
      'a faceoff win is simply gaining possession by legally winning control of the puck after the drop usually by pulling it back to a teammate',
      'a faceoff violation happens when a player moves too early encroaches or otherwise breaks the faceoff rules before the puck is dropped resulting in that player being ejected from the dot and replaced by a teammate or in some cases a penalty',
    ],
    `A FACEOFF is how play restarts in hockey: one player from each team (usually the centers) line up facing each other over a faceoff dot, sticks on the ice, and the official DROPS THE PUCK between them — first player to gain control wins the faceoff, usually by pulling the puck back to a teammate.

A FACEOFF VIOLATION happens when a player breaks the faceoff rules BEFORE the puck is even dropped — moving their stick or body too early, encroaching into the dot area, or otherwise cheating the timing. The penalty for a violation is that the offending player gets EJECTED from taking that particular faceoff and has to be replaced by a teammate to take it instead (repeated violations can also draw an actual penalty).

So: a faceoff win is about what happens AFTER the legal puck drop (who actually gets possession), while a faceoff violation is about breaking the rules BEFORE the drop even happens. (This is entirely a hockey rink concept — nothing to do with volleyball, which has no faceoffs at all.)`,
  ),
  k(
    'kb-gap-hky-breakaway-vs-two-on-one',
    'Breakaway vs two-on-one in hockey',
    [
      'difference between a breakaway and a two on one in hockey', 'a breakaway is when a single attacking player has the puck with a clear path to the net and no defenders back except the goalie a pure one on one against the goaltender',
      'a two on one is when two attacking players skate in against just one defender giving the attackers a numbers advantage where the puck carrier can pass to the open teammate if the defender commits to them',
      'both are high danger scoring chances but a breakaway is one attacker alone versus the goalie while a two on one involves two attackers against one defender plus the goalie',
    ],
    `A BREAKAWAY is when a single attacking player gets the puck with a clear path to the net and NO defenders left back to stop them — it's a pure one-on-one race against just the goaltender, usually because the defense got caught out of position or the attacker beat everyone with speed.

A TWO-ON-ONE is when TWO attacking players skate in against just ONE defenseman back — the attackers have a numbers advantage. The puck carrier can either shoot themselves or pass to the open teammate if the lone defender commits to stopping the puck carrier, creating a high-percentage scoring chance because the defender can't cover both attackers at once.

Both are considered dangerous, high-quality scoring chances, but the key difference is the numbers: a breakaway is one attacker completely alone against the goalie, while a two-on-one still has one defender in the mix trying to take away one of the two options.`,
  ),
  k(
    'kb-gap-hky-power-forward-vs-grinder',
    'Power forward vs grinder in hockey',
    [
      'difference between a power forward and a grinder in hockey', 'a power forward is a big physical player who combines size and strength with real scoring skill playing a hard physical game in front of the net and along the boards while still producing goals and points',
      'a grinder is a hard working lower skill role player valued for effort forechecking winning puck battles along the boards and physical energy rather than for scoring they usually play on a lower line and put up modest point totals',
      'a power forward is expected to be a top line scorer despite the physical style a grinder is not expected to score much at all',
    ],
    `A POWER FORWARD is a big, physically dominant player who ALSO has real scoring skill — they combine size and strength (winning puck battles, playing a hard game in front of the net and along the boards) with the offensive touch to actually be a significant scorer, often on a top line.

A GRINDER is a hard-working, lower-skill role player valued mainly for EFFORT rather than offense — forechecking relentlessly, winning puck battles along the boards, physically wearing down the other team, and providing energy, usually while playing on a lower line and not expected to put up much in the way of goals or points.

The key difference: a power forward is a physically imposing player who is STILL expected to be a real offensive threat despite (or alongside) the physical style, while a grinder brings the same kind of hard-nosed physical game but with little scoring expectation attached — their value is measured in effort and puck battles won, not points.`,
  ),
  k(
    'kb-gap-hky-one-timer-vs-regular-shot',
    'One-timer vs regular shot in hockey',
    [
      'difference between a one timer and a regular shot in hockey', 'a regular shot involves first receiving and controlling the puck stopping or cradling it on your stick and then shooting as a separate second action',
      'a one timer means shooting the puck immediately off of a pass without first stopping or controlling it the player swings and strikes the moving puck directly off the passers pass in one continuous motion',
      'a one timer is much harder to execute with good accuracy and timing but is much faster for the goalie to react to since there is no delay between receiving and shooting',
    ],
    `A REGULAR SHOT involves two separate steps: the player first receives and controls the puck (stopping it, cradling it on the stick), and THEN takes a shot as a separate follow-up action.

A ONE-TIMER skips that first step entirely — the player strikes the moving puck directly off a teammate's pass, in one single continuous motion, without ever stopping or controlling it first. It's much harder to execute accurately (the timing has to be perfect to connect cleanly with a moving puck), but it's far more dangerous for the goalie, since there's no gap between the shooter receiving the puck and releasing the shot for the goalie to read and react to — the shot effectively comes out of nowhere compared to a regular shot's telegraphed windup.`,
  ),
  k(
    'kb-gap-hky-game-misconduct-vs-match-penalty',
    'Game misconduct vs match penalty in hockey',
    [
      'difference between a game misconduct and a match penalty in hockey', 'a game misconduct ejects the player from the rest of that game for things like abuse of officials or repeated bad conduct but does not carry an automatic suspension for future games and a teammate can usually replace them on the ice after a short additional penalty time',
      'a match penalty is for a more serious deliberate attempt to injure another player it also ejects the player from the game immediately but additionally results in an automatic review by the league that can add supplementary suspension games on top',
      'a match penalty is considered more severe than a game misconduct because of the intent to injure element and the follow up league discipline',
    ],
    `A GAME MISCONDUCT ejects a player from the rest of that specific game (for things like abusing an official, or a particularly bad but non-injurious act), but it does NOT automatically carry any suspension for future games — usually the team can put another skater on the ice after serving some additional penalty time.

A MATCH PENALTY is for something more serious: a deliberate attempt to injure another player. It also ejects the offending player from the rest of that game immediately, but on top of that, it automatically triggers a LEAGUE REVIEW afterward that can result in additional supplementary suspension games — a consequence that reaches beyond just that one game.

So the key difference is severity and what happens afterward: a game misconduct is "you're done for tonight," while a match penalty is "you're done for tonight, AND the league is going to review this and possibly suspend you further" because of the intent-to-injure element involved.`,
  ),
  k(
    'kb-gap-hky-original-six-vs-expansion',
    'Original Six vs expansion teams in the NHL',
    [
      'difference between the original six and expansion teams in the nhl', 'the original six refers to six specific nhl teams not countries boston bruins chicago blackhawks detroit red wings montreal canadiens new york rangers and toronto maple leafs',
      'the original six era ran from 1942 to 1967 when the nhl had exactly these six teams and no others before the league doubled in size',
      'expansion teams are every team added to the nhl since the 1967 expansion which doubled the league from six to twelve teams and every team added since then',
    ],
    `The "Original Six" is NOT a group of countries — it refers to six SPECIFIC NHL TEAMS: the Boston Bruins, Chicago Blackhawks, Detroit Red Wings, Montreal Canadiens, New York Rangers, and Toronto Maple Leafs. From 1942 to 1967, these were the only six teams in the entire NHL, and that era is nostalgically remembered as the "Original Six" era.

EXPANSION TEAMS are every team added to the league since then — starting with the massive 1967 expansion that doubled the NHL from six teams to twelve overnight (adding teams like the Los Angeles Kings, Philadelphia Flyers, and St. Louis Blues), and continuing with every team added in the decades since (including modern additions like the Vegas Golden Knights and Seattle Kraken).

So the real distinction is history and prestige, not gameplay rules: Original Six teams carry an extra layer of tradition/rivalry from being the sole NHL teams for 25 years, while expansion teams joined afterward as the league grew.`,
  ),
  k(
    'kb-gap-hky-plus-minus-vs-points',
    'Plus/minus rating vs points in hockey',
    [
      'difference between a plus minus rating and points in hockey', 'a plus minus rating tracks the goal differential while a specific player is on the ice at even strength gaining a plus one for every goal their team scores and a minus one for every goal their team allows while they are on the ice',
      'points in hockey are simply the sum of a players goals plus assists over a season or game a pure offensive production count',
      'plus minus reflects both offense and defense on ice impact while points only measure a players own scoring and passing contribution',
    ],
    `A PLUS/MINUS rating tracks a player's on-ice goal differential at even strength: every time their team scores a goal while they're on the ice, they get a +1; every time their team gets scored on while they're on the ice, they get a −1. It's meant to capture a player's overall two-way impact — both offense and defense — while they're skating, not just their own individual stats.

POINTS are much simpler: it's just the sum of a player's own GOALS plus ASSISTS over a game or season — a pure measure of that player's own direct offensive production (scoring or setting up a goal), with nothing about what happens defensively or who else was on the ice.

So: points measure a player's OWN scoring contribution directly, while plus/minus measures the overall goal differential of the TEAM whenever that player happens to be on the ice — a much broader, noisier stat that depends heavily on linemates and matchups too, not just what one player personally did.`,
  ),
  k(
    'kb-gap-hky-glove-save-vs-blocker-save',
    "Goalie's glove save vs blocker save (puck, not ball)",
    [
      'difference between a goalies glove save and a blocker save in hockey', 'this is about stopping a puck with a hockey goalie glove and blocker not a ball',
      'the glove hand or catching glove is a large mitt worn on one hand specifically designed to catch the puck directly out of the air',
      'the blocker is a rectangular flat pad worn on the goalies stick hand used to deflect or block the puck away from the net rather than catch it',
      'glove saves are on the goalies glove hand side and blocker saves are on the goalies stick hand side',
    ],
    `A GLOVE SAVE uses the goalie's "catching glove" (the trapper) — a large mitt worn on one hand specifically designed to actually CATCH the puck out of the air, closing around it the way a baseball glove catches a ball.

A BLOCKER SAVE uses the "blocker" — a flat, rectangular pad worn on the goalie's STICK hand — used to DEFLECT or block the puck away from the net rather than catch it; the goalie angles the blocker to redirect the shot off to the side or into the corner instead of grabbing it.

The simplest way to remember which side is which: the glove is on whichever hand ISN'T holding the stick (the catching hand), and the blocker is on the same hand that IS holding the stick. Both are stopping a PUCK, not a ball — hockey goaltending equipment is built specifically around puck shapes and speeds, distinct from ball-sport goalkeeping gear.`,
  ),
];
