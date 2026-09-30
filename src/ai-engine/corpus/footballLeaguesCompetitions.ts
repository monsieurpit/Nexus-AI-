import { KnowledgeItem } from '../../types';

// Batch 2026-09-29 — leagues and competitions with zero dedicated coverage before this (the probe
// found 0 titles for the Bundesliga, Serie A or Ligue 1, nothing on the new 32-team Club World
// Cup, and nothing on Poland's national team despite a real "who will win Poland or Sweden"
// question from a Polish-speaking server member).
export const FOOTBALL_LEAGUES_COMPETITIONS: KnowledgeItem[] = [
  {
    id: 'kb-league-bundesliga',
    title: 'The Bundesliga: Germany\'s Top League',
    category: 'Football',
    keywords: ['bundesliga', 'german league', 'germany football league', '50+1 rule', 'bundesliga teams', 'bundesliga champions'],
    content: `The Bundesliga is Germany's top football division, founded in 1963, with 18 teams. The bottom two are relegated automatically and the 16th-placed team plays a relegation play-off against the third-placed team from the 2. Bundesliga. Bayern Munich is by far the most successful club, including 11 straight titles from 2013 to 2023, before Bayer Leverkusen's unbeaten title in 2023-24. Other big clubs include Borussia Dortmund, RB Leipzig, Eintracht Frankfurt, Schalke and VfB Stuttgart. The league is known for the "50+1 rule" (club members must hold a majority of voting rights, limiting takeovers by outside investors), cheap tickets, safe-standing terraces like Dortmund's Yellow Wall, and the highest average attendances in world football. There's no winter-break-free schedule like England's: it traditionally pauses over Christmas.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-league-serie-a',
    title: 'Serie A: Italy\'s Top League',
    category: 'Football',
    keywords: ['serie a', 'italian league', 'calcio', 'italy football league', 'scudetto', 'serie a teams', 'catenaccio'],
    content: `Serie A is Italy's top football division, with 20 teams. The champion wins the "Scudetto" (a small shield badge in Italian colours worn on the next season's shirt), and a club earns a gold star for every 10 titles. Juventus has the most titles, followed by Inter and AC Milan; Napoli, Roma, Lazio, Atalanta and Fiorentina are other major clubs. In the late 1980s and 1990s Serie A was considered the best league in the world, attracting Maradona, Van Basten, Zidane and Ronaldo Nazário. Italian football is historically associated with tactical, defensive play — "catenaccio" (door-bolt) — and with scandals like Calciopoli (2006). Recent champions include Inter (2020-21, 2023-24) and Napoli (2022-23, 2024-25).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-league-ligue-1',
    title: 'Ligue 1: France\'s Top League',
    category: 'Football',
    keywords: ['ligue 1', 'french league', 'france football league', 'ligue 1 teams', 'farmers league', 'le classique', 'psg ligue 1'],
    content: `Ligue 1 is France's top football division, reduced from 20 to 18 teams from the 2023-24 season. Paris Saint-Germain has dominated since its 2011 Qatari takeover, winning most titles since 2013 and becoming the most successful club in league titles; Saint-Étienne and Marseille are the historic giants. Other notable clubs are Lyon (seven straight titles from 2002 to 2008), Monaco (champions in 2017 with a young Mbappé), Lille and Lens. Marseille is the only French club to win the Champions League before PSG (1993). Ligue 1 is sometimes mocked online as a "farmers league" because of PSG's dominance, but it's one of the world's best talent producers — France's academies develop huge numbers of players who star across Europe. Le Classique is PSG vs Marseille.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-comp-club-world-cup-2025',
    title: 'The FIFA Club World Cup and the New 32-Team Format (2025)',
    category: 'Football',
    keywords: ['club world cup', 'fifa club world cup', 'club world cup 2025', 'club world cup winner', 'chelsea club world cup', '32 team club world cup'],
    content: `The FIFA Club World Cup is a tournament between the champion clubs of each continent. For years it was a small, short event every December, usually won by the European champion. FIFA expanded it into a 32-team tournament held every four years, like the World Cup; the first edition took place in the United States in June-July 2025, with 12 European clubs plus teams from South America, Africa, Asia, North America and Oceania. Chelsea won it, beating Champions League holders PSG 3-0 in the final at MetLife Stadium in New Jersey, with Cole Palmer scoring twice. The tournament was criticised for extreme summer heat, lunchtime kick-offs and extra strain on already-overworked players, but it brought record prize money for the participating clubs.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-comp-europa-conference-league',
    title: 'The Europa League and Conference League',
    category: 'Football',
    keywords: ['europa league', 'conference league', 'uefa europa league', 'uecl', 'uel', 'europa league winners', 'sevilla europa league'],
    content: `Below the Champions League, UEFA runs two more club competitions. The Europa League (formerly the UEFA Cup) is the second tier; Sevilla has won it a record seven times, and winning it earns a spot in the next Champions League. Recent winners include Atalanta (2024, beating unbeaten Leverkusen) and Tottenham (2025, beating Manchester United in an all-English final). The Conference League, created in 2021, is the third tier, giving clubs from smaller leagues more European matches; José Mourinho's Roma won the first edition, West Ham won in 2023, Olympiacos in 2024 (the first Greek European trophy) and Chelsea in 2025. Since 2024-25 all three competitions use a single "league phase" table instead of traditional groups.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-national-poland',
    title: 'Poland National Football Team',
    category: 'Football',
    keywords: ['poland national team', 'polish national team', 'reprezentacja polski', 'poland football', 'poland world cup', 'poland euro', 'bialo czerwoni', 'poland vs sweden'],
    content: `Poland's national team ("Biało-Czerwoni", the White-Reds) had its golden era in the 1970s and early 1980s, finishing third at the 1974 World Cup (Grzegorz Lato won the Golden Boot) and again in 1982 with Zbigniew Boniek, and winning Olympic gold in 1972. The modern team has been built around striker Robert Lewandowski, the country's record scorer and cap holder, and goalkeeper Wojciech Szczęsny. Poland co-hosted Euro 2012 with Ukraine, reached the Euro 2016 quarter-finals (its best Euro result, losing on penalties to eventual winners Portugal) and reached the knockout round of the 2022 World Cup, losing to France. Games against Sweden are a recurring qualifier matchup; results vary, so for an upcoming match there's no guaranteed winner — current form and injuries matter most.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-comp-euro-2024',
    title: 'Euro 2024: Spain\'s Record Fourth European Championship',
    category: 'Football',
    keywords: ['euro 2024', 'euros 2024', 'european championship 2024', 'spain euro 2024', 'euro 2024 final', 'euro 2024 winner'],
    content: `UEFA Euro 2024 was held in Germany in June-July 2024. Spain won every one of its seven matches, beating England 2-1 in the final in Berlin (goals from Nico Williams and Mikel Oyarzabal) to win a record fourth European Championship (1964, 2008, 2012, 2024). Spain's team was built on young wingers Lamine Yamal and Nico Williams plus midfielders Rodri (player of the tournament), Pedri and Fabián Ruiz. England reached a second consecutive Euros final and lost again. Lamine Yamal became the youngest scorer in tournament history with his semi-final screamer against France and won the Young Player award. The next Euros, Euro 2028, is hosted by the UK and Ireland.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-comp-world-cup-2026',
    title: 'The 2026 FIFA World Cup: USA, Canada and Mexico',
    category: 'Football',
    keywords: ['world cup 2026', '2026 world cup', 'world cup canada', 'world cup usa mexico', '48 team world cup', 'world cup toronto vancouver'],
    content: `The 2026 FIFA World Cup was co-hosted by the United States, Canada and Mexico — the first World Cup with three hosts and the first with 48 teams (up from 32), for a total of 104 matches. It ran from June 11 to July 19, 2026, with the final scheduled at MetLife Stadium in New Jersey. Canadian matches were played in Toronto and Vancouver, and Mexico's Estadio Azteca became the first stadium to host games at three World Cups (1970, 1986, 2026). The format used 12 groups of four, with the top two plus the eight best third-placed teams advancing to a new round of 32. Argentina entered as reigning champions after winning the 2022 World Cup in Qatar. This entry doesn't record the 2026 results — for who won or how far a specific team got, look up the actual results.`,
    createdAt: Date.now(),
  },
];
