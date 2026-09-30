import { KnowledgeItem } from '../../types';

// Batch 2026-09-29 (part 2) — clubs and competitions beyond Europe's top five leagues, plus
// women's football. Coverage probe: zero titles for Ajax, Benfica, Porto, Rangers, MLS/Inter
// Miami, Galatasaray, or women's football at all.
export const FOOTBALL_WORLD_CLUBS: KnowledgeItem[] = [
  {
    id: 'kb-club-ajax',
    title: 'Ajax Amsterdam: Cruyff, Total Football and the Academy',
    category: 'Football',
    keywords: ['ajax', 'ajax amsterdam', 'afc ajax', 'total football', 'johan cruyff', 'cruyff ajax', 'eredivisie', 'ajax academy', 'de toekomst'],
    content: `Ajax, from Amsterdam, is the most successful club in the Netherlands, with the most Eredivisie titles. It won 4 European Cups: three in a row from 1971 to 1973 with Johan Cruyff and coach Rinus Michels's (then Ștefan Kovács's) "Total Football" — a fluid system where players constantly swap positions — and again in 1995 with a young side including Edwin van der Sar, Clarence Seedorf, Patrick Kluivert and the De Boer brothers. Cruyff later took Total Football to Barcelona as a player and coach, shaping Barça's identity and indirectly Pep Guardiola's style. Ajax's academy is one of the world's best; in 2019 a young Ajax (Frenkie de Jong, Matthijs de Ligt) knocked out Real Madrid and Juventus and came seconds from the Champions League final. The stadium is the Johan Cruijff ArenA, and its big rivals are Feyenoord (De Klassieker) and PSV.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-club-portugal-big-three',
    title: 'Portugal\'s Big Three: Benfica, Porto and Sporting',
    category: 'Football',
    keywords: ['benfica', 'porto', 'fc porto', 'sporting', 'sporting cp', 'sporting lisbon', 'eusebio', 'guttmann curse', 'liga portugal', 'estadio da luz'],
    content: `Portuguese football is dominated by the "Big Three." Benfica (Lisbon, Estádio da Luz) won back-to-back European Cups in 1961 and 1962 with the great Eusébio; legend says coach Béla Guttmann, leaving after a pay dispute, cursed the club never to win a European trophy for 100 years — and Benfica has since lost eight European finals. FC Porto (Estádio do Dragão) won the European Cup in 1987 and again in 2004 under a young José Mourinho, a shock win that launched his career. Sporting CP (Lisbon, Estádio José Alvalade) is where Cristiano Ronaldo and Luís Figo started, and its academy is famous. Between them they win almost every Portuguese league title. Portuguese clubs are known for scouting South American talent cheaply and selling it on to Europe's giants for big profits.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-club-old-firm',
    title: 'The Old Firm: Celtic vs Rangers',
    category: 'Football',
    keywords: ['old firm', 'celtic', 'rangers', 'celtic vs rangers', 'glasgow derby', 'lisbon lions', 'scottish premiership', 'celtic fc', 'rangers fc'],
    content: `The Old Firm is the rivalry between Glasgow's two giants, Celtic and Rangers, who have won the vast majority of Scottish league titles (each has well over 50). The rivalry has a long religious and political dimension: Celtic was founded in 1887 by an Irish Catholic priest and has an Irish/Catholic identity, while Rangers has been associated with Protestant and British unionist identity — which has at times fuelled sectarian violence, making it one of the most intense derbies in the world. Celtic's "Lisbon Lions," all born within about 30 miles of Glasgow, became the first British team to win the European Cup in 1967. Rangers went into liquidation in 2012 over financial problems and restarted in Scotland's fourth tier, climbing back to win the title in 2020-21 under Steven Gerrard, ending Celtic's run of nine in a row.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-league-saudi-pro-league',
    title: 'The Saudi Pro League and Its Star Signings',
    category: 'Football',
    keywords: ['saudi pro league', 'saudi league', 'al nassr', 'al hilal', 'al ittihad', 'ronaldo saudi', 'benzema saudi', 'pif football', 'sportswashing', 'saudi world cup 2034'],
    content: `The Saudi Pro League became a global story when Cristiano Ronaldo joined Al-Nassr at the end of 2022. In summer 2023, backed by Saudi Arabia's sovereign wealth fund (the PIF), which took control of four clubs — Al-Hilal, Al-Nassr, Al-Ittihad and Al-Ahli — the league signed a wave of stars, including Neymar (Al-Hilal), Karim Benzema and N'Golo Kanté (Al-Ittihad), Sadio Mané and Riyad Mahrez, with salaries far above European levels. Supporters say it's growing football in the region; critics call it "sportswashing" — using sport to improve the country's image despite its human-rights record. Saudi Arabia was confirmed in December 2024 as host of the 2034 World Cup. Al-Hilal made headlines at the 2025 Club World Cup by knocking out Manchester City.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-league-mls-inter-miami',
    title: 'MLS, Inter Miami and Messi in America',
    category: 'Football',
    keywords: ['mls', 'major league soccer', 'inter miami', 'messi inter miami', 'beckham inter miami', 'cf montreal', 'toronto fc', 'vancouver whitecaps', 'leagues cup', 'mls cup'],
    content: `Major League Soccer (MLS) is the top league in the US and Canada, founded in 1996 after the US hosted the 1994 World Cup. Unlike European leagues it has no promotion or relegation, uses a salary cap with "Designated Player" exceptions for stars, and decides its champion through end-of-season playoffs (MLS Cup), while the best regular-season record wins the Supporters' Shield. Canada has three teams: CF Montréal, Toronto FC and the Vancouver Whitecaps. Inter Miami, co-owned by David Beckham, shocked the football world by signing Lionel Messi in July 2023, followed by his former Barça teammates Sergio Busquets, Jordi Alba and Luis Suárez. Messi won the Leagues Cup in his first weeks and the Supporters' Shield in 2024, and MLS attendances and Apple TV subscriptions (Apple holds the league's broadcast rights) jumped because of him.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-football-womens-game',
    title: 'Women\'s Football: World Cups, Barça Femení and the Ballon d\'Or Féminin',
    category: 'Football',
    keywords: ['womens football', "women's football", 'womens world cup', 'barca femeni', 'aitana bonmati', 'alexia putellas', 'lionesses', 'uswnt', 'womens champions league', 'womens soccer'],
    content: `The FIFA Women's World Cup began in 1991. The United States is the most successful nation with four titles (1991, 1999, 2015 and 2019), and Spain won its first in 2023. England's "Lionesses" won the European Championship in 2022 and again in 2025, beating Spain on penalties in the final. FC Barcelona Femení became the dominant club side of the 2020s, winning the Women's Champions League in 2021, 2023 and 2024 (Arsenal beat them in the 2025 final), and producing Ballon d'Or Féminin winners Alexia Putellas (2021, 2022) and Aitana Bonmatí (2023, 2024, 2025). Attendances have boomed — Barça drew over 91,000 fans to the Camp Nou in 2022, and Wembley sold out for England. Pay and conditions still lag far behind the men's game, and fights for equal pay (the US team won a settlement in 2022) are a major part of the sport's recent history.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-club-galatasaray-fenerbahce',
    title: 'Galatasaray vs Fenerbahçe: The Intercontinental Derby',
    category: 'Football',
    keywords: ['galatasaray', 'fenerbahce', 'fenerbahçe', 'istanbul derby', 'intercontinental derby', 'super lig', 'turkish football', 'welcome to hell', 'besiktas'],
    content: `Istanbul's two biggest clubs, Galatasaray and Fenerbahçe, contest the "Intercontinental Derby" — Galatasaray is on the European side of the Bosphorus and Fenerbahçe on the Asian side. Together with Beşiktaş they dominate the Turkish Süper Lig. Galatasaray ("Cimbom") won the 2000 UEFA Cup and UEFA Super Cup with Gheorghe Hagi, the first European trophies for a Turkish club, and its stadium's ferocious atmosphere is famous for "Welcome to Hell" banners. Fenerbahçe is one of Turkey's most supported clubs and hired big-name coaches like José Mourinho in 2024. Turkish derbies are known for flares, deafening noise and intense rivalries on and off the pitch.`,
    createdAt: Date.now(),
  },
];
