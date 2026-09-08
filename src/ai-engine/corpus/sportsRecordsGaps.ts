import { KnowledgeItem } from '../../types';

// Sports "who has the most / who won X" facts that the live model got wrong or vague in testing.
// Keyword-dense so a "who has won the most ___" query lands here instead of a player bio doc.
export const SPORTS_RECORDS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-ballon-dor-most',
    title: "Ballon d'Or: Who Has Won the Most",
    category: 'Football',
    keywords: [
      "who has won the most ballon d'or", 'who has won the most ballon dor', 'most ballon dor',
      'who has the most ballon dor', 'ballon dor record', 'ballondor', 'balon dor', 'ballon dor winner',
      'how many ballon dor does messi have', 'how many ballon dor does ronaldo have', 'golden ball award',
      "most ballon d'or", "who has the most ballon d'or", 'record ballon dor', 'ballon dor winners',
    ],
    content: `Lionel Messi has won the most Ballon d'Or (Ballon dOr / golden ball) awards, with 8: 2009, 2010, 2011, 2012, 2015, 2019, 2021, and 2023. That is more than any player in the award's history. Cristiano Ronaldo is second with 5 (2008, 2013, 2014, 2016, 2017). No one else has won more than 3 (Michel Platini, Johan Cruyff and Marco van Basten each won 3). The Ballon d'Or is awarded every year by France Football magazine to the best footballer of the year. Recent winners: Ousmane Dembélé (2025, after PSG's first Champions League title), Rodri (2024), Lionel Messi (2023), and Karim Benzema (2022).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pele-footballer',
    title: 'Pelé the Footballer (Not the Hawaiian Goddess)',
    category: 'Football',
    keywords: [
      'who is pele', 'who was pele', 'pele footballer', 'pele brazil', 'pele soccer',
      'pele world cups', 'edson arantes do nascimento', 'is pele the greatest',
    ],
    content: `When someone asks "who is Pelé" they almost always mean the Brazilian footballer, not the Hawaiian volcano goddess Pele. Pelé (Edson Arantes do Nascimento, 1940–2022) is the only player to have won three FIFA World Cups (1958, 1962, 1970). He spent almost his whole club career at Santos FC in Brazil, later played for the New York Cosmos, and scored well over 1,000 career goals (many in friendlies), plus 77 in 92 games for Brazil. He is one of the two or three players most often named the greatest footballer of all time, alongside Diego Maradona and Lionel Messi. The Hawaiian deity Pele (goddess of fire and volcanoes) is a completely separate topic.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-euros-winners',
    title: 'UEFA European Championship (Euros) Recent Winners',
    category: 'Football',
    keywords: [
      'who won euro 2020', 'who won euro 2024', 'who won euro 2016', 'who won euro 2012', 'who won euro 2008',
      'european championship winners', 'euros winner', 'who won the euros',
    ],
    content: `Euro 2020 was won by ITALY. (The tournament was played in the summer of 2021 because of the COVID pandemic but kept the name "Euro 2020". Italy beat England on penalties in the final at Wembley in London.) Euro 2016 was won by Portugal (Cristiano Ronaldo's team, beating host France 1–0 after extra time). Euro 2024 was won by Spain (beat England 2–1). Euro 2012 — Spain. Euro 2008 — Spain. Euro 2004 — Greece (a shock, beating host Portugal). So: Euro 2020 = Italy, Euro 2016 = Portugal, Euro 2024 = Spain. Spain has won the most European Championships (4: 1964, 2008, 2012, 2024), with Germany next (3).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-champions-league-most-titles',
    title: 'Which Club Has Won the Most Champions Leagues',
    category: 'Football',
    keywords: [
      'which club has won the most champions leagues', 'most champions league titles',
      'who has won the most champions league', 'record champions league titles',
      'how many champions leagues has real madrid won', 'most european cups',
    ],
    content: `Real Madrid have won the most Champions League / European Cup titles, with 15 — far more than any other club. Their haul includes the first five editions in a row (1956–1960) and a modern run of three straight (2016, 2017, 2018) under Zinedine Zidane, plus wins in 2022 and 2024. After Real Madrid: AC Milan have 7, Liverpool have 6, Bayern Munich have 6, and Barcelona have 5. Paris Saint-Germain won their first title in 2025 (thrashing Inter Milan 5–0 in the final). The competition began as the European Cup in the 1955–56 season and was rebranded the UEFA Champions League in 1992–93.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tennis-slam-counts',
    title: 'Men\'s and Women\'s Grand Slam Title Counts',
    category: 'Tennis',
    keywords: [
      'how many grand slams has nadal won', 'how many grand slams does djokovic have',
      'how many grand slams has federer won', 'most grand slam titles', 'who has the most grand slams',
      'nadal grand slams', 'djokovic grand slams', 'serena grand slams', 'tennis goat', 'greatest tennis player',
    ],
    content: `Men's singles Grand Slam title counts (as of 2024): Novak Djokovic leads with 24, the most in men's history. Rafael Nadal has 22 (including a record 14 French Opens). Roger Federer has 20. Pete Sampras had 14. In the women's game, Margaret Court holds 24 (many in the amateur era), Serena Williams has 23 (the most in the Open era for a woman), and Steffi Graf has 22. The "GOAT" debate in men's tennis is genuinely unsettled, but by the raw Grand Slam count Djokovic is now ahead of both Federer and Nadal; Serena Williams is the near-universal pick for women's GOAT.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-f1-most-titles',
    title: 'Formula 1: Most World Championships',
    category: 'Motorsport',
    keywords: [
      'who has the most f1 championships', 'most f1 world titles', 'most formula 1 championships',
      'how many titles does hamilton have', 'how many titles does schumacher have', 'how many titles does verstappen have',
      'f1 championship record', 'most successful f1 driver',
    ],
    content: `The most Formula 1 World Drivers' Championships is 7, held jointly by Michael Schumacher (1994, 1995, 2000, 2001, 2002, 2003, 2004) and Lewis Hamilton (2008, 2014, 2015, 2017, 2018, 2019, 2020). Juan Manuel Fangio won 5 in the 1950s. Max Verstappen has won 4 in a row (2021, 2022, 2023, 2024) and is the dominant driver of the current era but has not yet matched the record of 7. Sebastian Vettel and Alain Prost each won 4. Schumacher also holds the record for most race wins alongside Hamilton (both above 90).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soccer-match-length',
    title: 'How Long a Football (Soccer) Match Is',
    category: 'Football',
    keywords: [
      'how long is a football match', 'how long is a soccer game', 'length of a football match',
      'how many minutes in a football game', 'football match duration', 'how long does soccer last',
    ],
    content: `A standard association football (soccer) match lasts 90 minutes of play, split into two halves of 45 minutes each, with a 15-minute half-time break. The referee then adds "stoppage time" (added/injury time) at the end of each half to make up for time lost to injuries, substitutions and other stoppages — usually a few minutes, sometimes 8–10+ in a busy half. In knockout matches level after 90 minutes, two 15-minute periods of extra time are played, and if still level, the match goes to a penalty shoot-out. (This is different from American football, where an NFL game is four 15-minute quarters of game clock but takes about 3 hours of real time.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hockey-offside',
    title: 'The Offside Rule in Ice Hockey',
    category: 'Ice Hockey',
    keywords: [
      'offside rule in hockey', 'what is offside in hockey', 'ice hockey offside', 'hockey offsides',
      'blue line rule hockey', 'offside hockey vs football',
    ],
    content: `In ice hockey, offside is about the blue line, not defenders (unlike soccer). A player is offside if they cross the attacking blue line into the offensive zone before the puck does. If an attacking player precedes the puck over the blue line, play is stopped and a face-off is held outside the zone. The rule exists to stop players "cherry-picking" — camping near the opposing goal waiting for a long pass. Since 2005 the NHL also allows "tag-up" offside: if attackers are offside but then all skate back out of the zone and re-establish behind the blue line, play can continue without a whistle. This is completely different from the soccer offside rule (which is about being behind the second-last defender).`,
    createdAt: Date.now(),
  },
];
