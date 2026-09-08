import { KnowledgeItem } from '../../types';

// Batch 78 (soccer / football knowledge — Patrick is a Barça fan, this matters).
// nexus-4b misses: "what is a free kick" and "what is an own goal" answered
// with rugby rules; "what is a clean sheet" answered about bed sheets; "what is
// a false nine" answered about the idiom "the whole nine yards"; "what is a
// corner kick" said you cannot score directly from one (you can); "what is VAR"
// dumped a huge markdown wall of text; "yellow card versus red card" was a
// cut-off web fragment.
export const SOCCER_KNOWLEDGE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-soccer-free-kick',
    title: 'What a Free Kick Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is a free kick in soccer', 'direct vs indirect free kick', 'free kick wall 10 yards', 'free kick football not rugby',
      'how far must defenders stand from a free kick', 'can you score directly from a free kick', 'set piece free kick',
    ],
    content: `In soccer (association football), a free kick is awarded to a team when the opposition commits a foul or infringement. This is nothing like a rugby free kick. There are two types. A DIRECT free kick (given for fouls such as kicking, tripping, pushing, or handball) can be scored straight into the goal without touching anyone else. An INDIRECT free kick (given for offside, dangerous play, obstruction, or goalkeeper infringements) must touch a second player before a goal counts; the referee holds an arm up until it does. The ball is placed where the offense occurred, and defenders must retreat at least 10 yards (9.15 m); the defending team usually forms a "wall" of players to block the direct path to goal. Free kicks in shooting range are major scoring opportunities — specialists bend the ball around or over the wall, or drive it low. A free kick just outside the penalty area is one of the game's most dangerous set pieces; a foul inside the area gives a penalty kick instead.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-own-goal',
    title: 'What an Own Goal Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is an own goal', 'own goal soccer meaning', 'deflection into own net', 'is a deflected shot an own goal or credited to the shooter',
      'own goal counts for the other team', 'og football statistics',
    ],
    content: `An own goal in soccer is when a player causes the ball to go into their own team's net, so the goal is credited to the opposing team. It has nothing to do with rugby's "grounding" the ball. Own goals almost always happen by accident — a defender's attempted block or clearance of a cross or shot deflects past their own goalkeeper. It still counts as a normal goal for the other side. By statistical convention, a goal is only recorded as an own goal (marked "OG") if a defender's touch was the decisive action that put the ball in or clearly redirected it; if an attacker's shot was already going in or on target and merely brushes a defender on the way, the goal stays credited to the attacker. Own goals are considered embarrassing but are a routine part of the game.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-clean-sheet',
    title: 'What a Clean Sheet Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is a clean sheet', 'clean sheet soccer meaning', 'keeping a clean sheet goalkeeper', 'shutout football',
      'golden glove most clean sheets', 'clean sheet not a bed sheet',
    ],
    content: `In soccer, a clean sheet means a team completes a match without conceding a single goal — it has nothing to do with bedding. "Keeping a clean sheet" is a headline statistic for goalkeepers and defenders, since it reflects a shutout defensive performance. Season-long awards recognise it: the Premier League's Golden Glove goes to the goalkeeper with the most clean sheets in a campaign. The term comes from the paper score-sheet a match reporter kept: if a team let in no goals, that side of the sheet stayed "clean." The equivalent term in North American sports is a "shutout."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-false-nine',
    title: 'What a False Nine Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is a false nine', 'false 9 tactic soccer', 'centre forward drops deep into midfield', 'messi false nine guardiola',
      'false nine creates space behind defence', 'hidegkuti false nine history', 'false nine not the idiom nine yards',
    ],
    content: `A "false nine" is a centre-forward — traditionally the number 9, the highest striker — who deliberately does NOT play as a fixed target up front. Instead the player repeatedly drops back into midfield to receive the ball. This forces a defensive choice: if a centre-back follows him out, space opens up behind the defence for wingers or midfielders to run into; if the centre-back stays put, the false nine is free to turn and create in a dangerous zone, and the attacking team effectively has an extra man in central midfield. The most famous modern example is Lionel Messi under Pep Guardiola at Barcelona (2009–2012), notably the 6–2 win at Real Madrid. Other examples: Cesc Fàbregas for Spain at Euro 2012 (a team that sometimes fielded no recognised striker at all), Francesco Totti at Roma, and Roberto Firmino at Liverpool. The idea dates back to Matthias Sindelar for 1930s Austria and Nándor Hidegkuti for Hungary's "Magical Magyars," who bewildered England in 1953. (It has nothing to do with the phrase "the whole nine yards.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-corner-kick',
    title: 'What a Corner Kick Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is a corner kick', 'corner kick awarded when', 'can you score directly from a corner', 'olympic goal corner',
      'corner arc flag taking a corner', 'defenders 10 yards corner kick', 'set piece corner delivery',
    ],
    content: `A corner kick is awarded to the attacking team when the whole ball crosses a goal line (but not between the posts for a goal) having last been touched by a defending player. It is taken from the small quarter-circle arc at whichever corner flag is on the side the ball went out. The ball must be stationary and within the arc; the corner flag must not be moved; defending players must stay at least 10 yards away until it is kicked. A goal CAN be scored directly from a corner kick — a rare feat called an "Olympic goal" (gol olímpico), where the ball curls straight into the net. Normally the corner is a set-piece delivery aimed into the penalty area, often toward a tall attacker to head at goal, or played short to a teammate to keep possession and cross from a better angle. Corners are a significant source of goals over a season.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-var-soccer',
    title: 'What VAR Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is var in soccer', 'video assistant referee', 'clear and obvious error var', 'what can var review',
      'var offside penalty red card', 'pitchside monitor referee review', 'var criticism delays offside lines',
    ],
    content: `VAR (Video Assistant Referee) is a match official, supported by assistants and video operators, who watches replays and can advise the on-field referee. VAR is only allowed to get involved for a "clear and obvious error" or a "serious missed incident," and only in four categories of decision: (1) goals — checking for offside, a foul, or the ball out of play anywhere in the passage leading to the goal; (2) penalty decisions — a penalty given wrongly or a clear penalty missed; (3) direct red cards (not second yellows); and (4) mistaken identity, when the referee books the wrong player. For subjective calls the referee is invited to look at a pitchside monitor and makes the final decision; factual calls like offside are settled by the video team. VAR entered the Laws of the Game in 2018 and was used at the 2018 World Cup. It is credited with correcting glaring mistakes but heavily criticised for long stoppages, killing goal celebrations, and disallowing goals for offsides of a few centimetres.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-derby-match',
    title: 'What a Derby Match Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is a derby match', 'local derby football rivalry', 'el clasico manchester derby north london derby', 'milan derby superclasico',
      'why are derbies so intense', 'derby della madonnina old firm', 'derby just a normal match in rules',
    ],
    content: `A "derby" (or "local derby") is a match between two clubs that share a city or region and have a long, fierce rivalry rooted in geography, history, class, religion or politics. It is a normal match in terms of rules and length — the intensity comes from what is at stake for the fans, and results can defy the league table. Famous examples: the Manchester derby (City v United), the North London derby (Arsenal v Tottenham), the Merseyside derby (Liverpool v Everton), the Milan derby or Derby della Madonnina (Inter v AC Milan, who share the San Siro), the Rome derby (Roma v Lazio), the Old Firm (Celtic v Rangers in Glasgow, with a sectarian dimension), and the Superclásico (Boca Juniors v River Plate in Buenos Aires). El Clásico (Real Madrid v Barcelona) is often called a derby though the clubs are in different cities — it is a national and political rivalry. Derbies routinely produce red cards, upsets and lasting bragging rights.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-yellow-vs-red-card',
    title: 'Yellow Card versus Red Card (Soccer)',
    category: 'Football',
    keywords: [
      'what is a yellow card versus a red card', 'caution vs sending off soccer', 'second yellow red card', 'straight red card offenses',
      'dogso denial of goalscoring opportunity', 'do red cards carry a suspension', 'yellow card accumulation ban',
    ],
    content: `A yellow card is a formal caution. It is shown for offenses such as a reckless foul, unsporting behaviour, dissent toward the referee, time-wasting, persistent fouling, or entering/leaving the field without permission. A red card is a sending-off: the player must leave immediately and cannot be replaced, so their team plays the rest of the match a player short. A red is shown either for a second yellow card in the same match, or as a "straight red" for serious foul play, violent conduct, spitting or biting, using offensive or abusive language, or denying the opposing team an obvious goal-scoring opportunity ("DOGSO") by a foul or deliberate handball. A red card brings an automatic suspension of one match (serious cases: two, three or more). Separately, yellow cards accumulate across a competition, and reaching a set number (for example five in the early part of a Premier League season) triggers a one-match ban.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tiki-taka',
    title: 'What Tiki-Taka Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is tiki-taka', 'tiki taka possession style barcelona spain', 'juego de posicion positional play', 'origins of tiki-taka cruyff',
      'guardiola barcelona 2008 2012 tiki taka', 'death by a thousand passes', 'criticism of tiki-taka sterile',
    ],
    content: `Tiki-taka is a style of play built on short, quick passing, patient ball retention, constant movement off the ball, and positional discipline ("juego de posición" — positional play). The team works the ball through the thirds with triangles and one-touch passing, waits for the defence to be pulled out of shape, and, the moment possession is lost, presses hard to win it straight back — "death by a thousand passes." Its lineage runs from Johan Cruyff's Dutch-influenced Barcelona and his time as Barça coach, through Frank Rijkaard, to its peak under Pep Guardiola's Barcelona (2008–2012) and Vicente del Bosque and Luis Aragonés's Spain team that won Euro 2008, the 2010 World Cup and Euro 2012. After Bayern Munich thrashed Barcelona 7–0 over two legs in 2013 and other sides learned to defend deep and counter, tiki-taka was widely criticised as sterile — possession for its own sake without penetration — and pure versions of it faded, though its principles live on in Guardiola's later teams.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-financial-fair-play',
    title: 'What Financial Fair Play Is (Soccer)',
    category: 'Football',
    keywords: [
      'what is financial fair play', 'ffp uefa rules', 'break-even requirement football', 'squad cost ratio financial sustainability',
      'ffp sanctions transfer ban champions league', 'manchester city psg ffp cases', 'financial sustainability regulations 2022',
    ],
    content: `Financial Fair Play (FFP) is a set of rules introduced by UEFA in 2011 to stop clubs spending far beyond their means and to curb wealthy owners simply buying success. Its central "break-even" requirement limited how much a club could lose over a rolling multi-year period, counting football revenue (gate receipts, TV money, sponsorship, prize money) but restricting how much an owner could inject as equity or inflated sponsorship. Clubs that breached it faced sanctions escalating from fines and squad-size limits in the Champions League to transfer bans and exclusion from European competition — AC Milan were barred from the 2019–20 Europa League; Manchester City's two-year ban was overturned on appeal in 2020. From 2022 UEFA replaced FFP with "Financial Sustainability Regulations," which add a squad-cost ratio capping spending on wages, transfer amortisation and agent fees at a percentage of revenue (phased down to 70%). England's Premier League runs its own separate profit-and-sustainability rules, which led to points deductions for Everton and Nottingham Forest in 2023–24.`,
    createdAt: Date.now(),
  },
];
