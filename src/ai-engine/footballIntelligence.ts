/**
 * Football (Soccer) Encyclopedic Intelligence Core
 * Comprehensive, offline-first knowledge on world football:
 * - History & World Cups (1930 to present, 2022 Lusail epic, 1986 Maradona, 1970 Pele, 1998/2006 Zidane, 2014 7-1)
 * - UEFA Champions League (Real Madrid 15x, Milan 7x, Liverpool 6x, Bayern 6x, Barca 5x, City Treble 2023)
 * - Premier League, La Liga, Serie A, Bundesliga, Ligue 1 & South American leagues
 * - Polish Ekstraklasa & Polish Football Dynasties (Legia Warszawa, Lech Poznań, Wisła Kraków, Górnik Zabrze, Ruch Chorzów, Jagiellonia, Raków Częstochowa)
 * - Polish Football Legends (Robert Lewandowski, Zbigniew Boniek, Grzegorz Lato, Kazimierz Deyna, Włodzimierz Lubański, Wojciech Szczęsny, Jerzy Dudek, Łukasz Piszczek, Jakub Błaszczykowski, Piotr Zieliński)
 * - Poland National Team Lore (1974 & 1982 World Cup 3rd place finishes, Wembley 1973 "The Clowns", Euro 2016 quarterfinal run)
 * - The GOAT Debate (Messi vs Ronaldo vs Pelé vs Maradona vs Cruyff)
 * - Player profiles (Messi, CR7, R9, Ronaldinho, Zidane, Henry, Haaland, Mbappe, Vini Jr, Bellingham, Yamal, Modric, etc.)
 * - Managers & Masterminds (Pep Guardiola, Sir Alex Ferguson, Carlo Ancelotti, José Mourinho, Jürgen Klopp, Cruyff, Sacchi)
 * - Goalkeepers & Defending (Neuer, Buffon, Casillas, Yashin, Maldini, Ramos, Van Dijk)
 * - Tactics (Tiki-taka, Gegenpressing, Catenaccio, Total Football, False 9, Inverted Fullbacks, Low Block)
 * - Rules & Officiating (Offside rule, VAR, Handball interpretations, Red cards, Penalty shootouts, FFP/PSR, Bosman Ruling)
 * - Iconic lore & Derbies (El Clasico, Remontada, Corner taken quickly ORIGI, Aguero 93:20, Istanbul 2005, Leicester 5000-1)
 * - Ballon d'Or history and controversies (Rodri 2024, Lewandowski 2020, Sneijder 2010, Ribery 2013)
 * - Ligue 1 & PSG (QSI era, MNM trio, 2025 UCL title), Europa/Conference League (Sevilla's 7 titles, Villarreal, Atalanta)
 * - South American football (Copa Libertadores, Boca/River, Flamengo, Pelé's Santos), Eredivisie (Ajax Total Football, PSV, Feyenoord)
 * - Primeira Liga (Porto, Benfica, Sporting), Atlético Madrid (Cholismo), Borussia Dortmund (Yellow Wall), Inter/Roma/Napoli
 * - AFCON & African legends (Weah, Drogba, Eto'o, Salah, Mané), FIFA Club World Cup, domestic cups (FA Cup, Copa del Rey, DFB-Pokal, Coppa Italia)
 * - Midfield maestros (Xavi, Iniesta, Busquets, Pirlo, De Bruyne), Premier League legends (Gerrard, Lampard, Beckham, Shearer, Rooney)
 * - Strikers hall of fame (Ibrahimović, Van Nistelrooy, Van Basten, Müller), more managers (Simeone, Conte, Bielsa, Michels, Del Bosque)
 * - More World Cup finals (1966, 1978, 1990, 1994, 2002, 2010, 2018), Euro Championship history (Denmark 1992, Greece 2004, Italy 2020)
 * - Women's football (USWNT dynasty, Marta, Lionesses Euro 2022, Women's Champions League)
 * - World Cup all-time records (Klose's 16 goals, Fontaine's 13 in one tournament, Matthäus' 25 caps, 1950 Maracanã crowd)
 * - World Cup individual awards history (Golden Boot/Ball/Glove/Young Player winners 2006-2022)
 * - World Cup format evolution (13→48 teams, 2026 tri-nation expansion, 2030 centenary hosts)
 * - World Cup's biggest shocks (USA 1950, North Korea 1966, Cameroon/Senegal/S.Korea, Saudi Arabia 2022)
 * - World Cup immortal moments (Carlos Alberto 1970, Hand of God/Goal of Century, Baggio miss, Zidane headbutt, Suárez handball)
 * - World Cup host controversies (2010 vuvuzelas, 2014 Brazil protests, 2022 Qatar migrant workers/winter WC, 2026/2030 hosts)
 */

export interface FootballKnowledgeResult {
  matched: boolean;
  title: string;
  topic: string;
  response: string;
  confidence: number;
}

export function solveFootballKnowledge(prompt: string, isSuperChill: boolean = false): FootballKnowledgeResult | null {
  const p = prompt.trim();
  const lower = p.toLowerCase().replace(/[?!.,'"]/g, '');

  // ==========================================
  // POLISH FOOTBALL & EKSTRAKLASA SPECIALTIES
  // ==========================================

  // 1. ROBERT LEWANDOWSKI (LEWY)
  if (
    /(robert lewandowski|lewandowski|lewy|lewandowski 5 goals in 9 minutes|lewandowski stats|lewandowski bayern|lewandowski barcelona|lewandowski dortmund)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'Robert Lewandowski (Lewy): Poland\'s Greatest Goalscoring King',
      topic: 'polish_football',
      confidence: 1.0,
      response: `Robert Lewandowski (**"Lewy"**) is the greatest Polish footballer of all time and one of the most clinical, lethal number 9s in the entire history of the sport!

### 👑 The Legendary Milestones of Lewy:
1. **The Mythical 5 Goals in 9 Minutes (Sept 22, 2015 vs Wolfsburg)**:
   - Came on as a half-time sub with Bayern losing 0-1.
   - Scored in the **51', 52', 55', 57', and 60'** minutes (5 goals in 8 minutes and 59 seconds), including that unreal acrobatic scissor-kick volley. Pep Guardiola was literally clutching his head in absolute disbelief. Set 4 Guinness World Records in a single night!
2. **The 2020 Sextuple & Ballon d'Or Robbery**:
   - 55 goals in 47 games, top scorer in the Bundesliga, DFB-Pokal, and Champions League (15 goals) as Bayern won all 6 trophies. France Football canceling the 2020 award was the biggest robbery in sports history. Won FIFA The Best Men's Player back-to-back in 2020 and 2021.
3. **Shattering Gerd Müller's 49-Year Record (2020-21)**:
   - Scored **41 Bundesliga goals in just 29 games** (averaging a goal every 60 minutes), breaking Gerd Müller's 1971-72 record of 40 goals with a 90th-minute goal on the final day vs Augsburg!
4. **Borussia Dortmund (2010–2014) & Real Madrid Demolition**:
   - Put 4 goals past Real Madrid in the 2013 Champions League semi-final (first player ever to score 4 in a UCL semi).
5. **FC Barcelona & Poland National Team**:
   - Moved to Barça in 2022 and won La Liga & the Pichichi trophy in his debut season.
   - Poland's all-time top scorer with **84+ goals in 150+ caps**.`,
    };
  }

  // 2. POLISH EKSTRAKLASA & CLUBS
  if (
    /(ekstraklasa|polish league|polska liga|legia warszawa|legia warsaw|lech poznan|wisla krakow|gornik zabrze|ruch chorzow|rakow czestochowa|jagiellonia bialystok|slask wroclaw|pogon szczecin|derby polski|swieta wojna|wielkie derby slaska)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'PKO BP Ekstraklasa & Polish Club Football Lore',
      topic: 'polish_football',
      confidence: 1.0,
      response: `The **PKO BP Ekstraklasa** is Poland's top flight — famous for electric fan choreography, tifos, pyro, high physical intensity, and pure unadulterated chaotic passion!

### 🏆 All-Time Champions & Dynasties:
- 👑 **Legia Warszawa (15 Titles - Record)**: The capital club, historically dominant, UEFA Champions League quarterfinalists in 1996, and famous worldwide for the loudest ultras on Earth (*Żyleta*).
- 🔵⚪ **Ruch Chorzów (14 Titles)** & ⚒️ **Górnik Zabrze (14 Titles)**: The historic Silesian heavyweights who ruled Polish football in the 60s, 70s, and 80s. Górnik reached the European Cup Winners' Cup final in 1970!
- ⚪🔵 **Wisła Kraków (13 Titles)**: The dominant force of the 2000s under Henryk Kasperczak with Żurawski, Frankowski, and Szymkowiak.
- 🚂 **Lech Poznań (8 Titles - "Kolejorz")**: Legia's fiercest rival, known for the world-famous *"Poznań dance"* (fans turning their backs and bouncing in unison, copied by Man City and clubs across the globe) and producing young talents like Robert Lewandowski.
- ⚡ **Modern New Giants**:
  - **Raków Częstochowa**: Rose from the 3rd tier under Marek Papszun to win their first Ekstraklasa title in 2022-23.
  - **Jagiellonia Białystok**: Won their historic first-ever Ekstraklasa title in 2023-24 under Adrian Siemieniec!

### ⚔️ Iconic Polish Derbies:
- **Derby Polski / Klasyk**: Legia Warszawa vs Lech Poznań (the biggest, most heated rivalry in the country).
- **Wielkie Derby Śląska**: Górnik Zabrze vs Ruch Chorzów (the battle for Silesian supremacy).
- **Święta Wojna (Holy War)**: Wisła Kraków vs Cracovia (the oldest derby in Poland, founded in 1906, played with raw local intensity).`,
    };
  }

  // 3. POLISH FOOTBALL LEGENDS & ICONS (Boniek, Deyna, Lato, Szczęsny, Dudek, Błaszczykowski, Piszczek, Zieliński)
  if (
    /(polish football legends|polish soccer players|zbigniew boniek|kazimierz deyna|grzegorz lato|wlodzimierz lubanski|wojciech szczesny|jerzy dudek|jakub blaszczykowski|kuba blaszczykowski|lukasz piszczek|piotr zielinski|arkadiusz milik|jan tomaszewski)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'Hall of Fame: Polish Football Legends & World-Class Talents',
      topic: 'polish_football',
      confidence: 1.0,
      response: `Poland has produced some of the most gifted, tough-as-nails ballers in world football history:

### 🌟 The Golden Era Icons (1970s–1980s):
- 👑 **Kazimierz Deyna ("Kaka")**: The midfield maestro of Legia and Manchester City. Led Poland to Olympic Gold in 1972 (top scorer) and 3rd place in the 1974 World Cup. 3rd in the 1974 Ballon d'Or behind Cruyff and Beckenbauer.
- 🔴 **Zbigniew Boniek ("Zibi" / "Bello di Notte")**: Electric forward for Juventus and Roma alongside Michel Platini. Won the 1985 European Cup and finished 3rd in the 1982 Ballon d'Or after carrying Poland to 3rd place in the 1982 World Cup.
- ⚡ **Grzegorz Lato**: **Golden Boot winner at the 1974 World Cup** with 7 goals! Incredible blazing speed down the right wing.
- 🎯 **Włodzimierz Lubański**: 48 goals for Poland; the youngest scorer in European Cup history at age 16 for Górnik Zabrze.

### 🧤 The Polish Goalkeeping Factory:
- 🧤 **Wojciech Szczęsny**: Elite shot-stopper for Arsenal, AS Roma, Juventus (won 3 Scudettos succeeding Buffon), and FC Barcelona. Saved **TWO penalties at the 2022 World Cup** (including one from Lionel Messi!).
- 🧤 **Jerzy Dudek**: The hero of the 2005 Miracle of Istanbul with Liverpool, using his wobbly legs to deny Shevchenko and Pirlo, then winning La Liga with Real Madrid.
- 🧤 **Jan Tomaszewski ("The Man Who Stopped England")**: Stunned 100,000 fans at Wembley in 1973 after Brian Clough famously called him a "clown". First goalkeeper to save 2 penalties in a single World Cup (1974).
- 🧤 **Artur Boruc & Łukasz Fabiański**: Cult heroes with ice in their veins across the Premier League, Celtic, and Serie A.

### 🟡 The Dortmund Polish Trio & Modern Maestros:
- 🇩🇪 **The BVB Polish Trio**: Robert Lewandowski, **Jakub "Kuba" Błaszczykowski** (heart & soul winger, 108 caps), and **Łukasz Piszczek** (one of the best right-backs in Europe) dominated the Bundesliga under Jürgen Klopp (2011, 2012 titles).
- 🪄 **Piotr Zieliński**: One of the most technically gifted two-footed playmakers in Europe, leading Napoli to the historic 2023 Scudetto and now orchestrating Inter Milan.`,
    };
  }

  // 4. POLAND NATIONAL TEAM LORE (REPREZENTACJA POLSKI)
  if (
    /(poland national team|reprezentacja polski|bialo-czerwoni|poland world cup 1974|poland world cup 1982|wembley 1973 tomaszewski|poland euro 2016)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'Reprezentacja Polski: Historic World Cup Runs & National Lore',
      topic: 'polish_football',
      confidence: 1.0,
      response: `The Polish national team (**"Biało-Czerwoni"** / The White and Reds) has a legendary history on the international stage:

### 🏆 1. The Golden 1974 World Cup in West Germany (3rd Place)
- Managed by the mastermind **Kazimierz Górski**.
- Beat Argentina (3-2), Italy (2-1), Haiti (7-0), Sweden (1-0), and Yugoslavia (2-1).
- Played the legendary **"Water Battle of Frankfurt"** (*Wasserschlacht von Frankfurt*) in semi-finals on a waterlogged swamp pitch vs West Germany, narrowly losing 0-1 to Gerd Müller.
- Defeated defending champions **Brazil 1-0** in the 3rd-place playoff thanks to a Grzegorz Lato solo goal. Lato won the Golden Boot (7 goals)!

### 🏆 2. The 1982 World Cup in Spain (3rd Place)
- Managed by Antoni Piechniczek during a politically tense era in Poland.
- Zbigniew Boniek scored a legendary hat-trick against Belgium (3-0).
- Beat France 3-2 in the 3rd place match (Szarmach, Majewski, Kupcewicz) to take home Poland's second World Cup bronze!

### 🏟️ 3. Wembley 1973: "The Clowns" Silence England
- Before the decisive World Cup qualifier, English TV pundit Brian Clough called Jan Tomaszewski a "circus clown in a yellow jersey".
- Tomaszewski pulled off 15 miracle saves, Jan Domarski scored on a counter (1-1), and Poland knocked England out of the World Cup to qualify for 1974!

### 🇫🇷 4. Euro 2016 Quarter-Final Run
- Under Adam Nawałka with Lewandowski, Milik, Kuba Błaszczykowski, Krychowiak, and Glik.
- Conceded only 2 goals the entire tournament in open play, defeating Switzerland on penalties before getting knocked out in a heartbreaking penalty shootout by eventual champions Portugal in the quarter-finals.`,
    };
  }

  // ==========================================
  // GLOBAL FOOTBALL & ICONIC LORE
  // ==========================================

  // 4.6. FC BARCELONA (BARÇA / BLAUGRANA)
  if (
    /(fc barcelona|barcelona|barca|blaugrana|is barcelona a great|is fc barcelona a great|is barcelona good|what do you think of barcelona|barcelona football club|visca el barca|barca greatness)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'FC Barcelona: Heritage, Tiki-Taka, MSN, and The Blaugrana Dynasty',
      topic: 'barcelona',
      confidence: 1.0,
      response: `Fuck yeah! FC Barcelona (**Barça**) is without a doubt one of the greatest, most influential, and aesthetically iconic football institutions to ever exist on planet Earth!

### 🔴🔵 Why FC Barcelona is Pure Football Royalty:

1. **The Trophy Cabinet & Historic Trebles**:
   - **5 UEFA Champions League Titles** (1992, 2006, 2009, 2011, 2015).
   - **27 La Liga Titles & 31 Copa del Rey Trophies** (all-time Spanish record).
   - **Two European Trebles**: The only club alongside Bayern Munich to win two Trebles (La Liga, Copa del Rey, Champions League) in 2008–09 under Pep Guardiola and 2014–15 under Luis Enrique.
   - **The 2009 Sextuple**: Won all 6 possible trophies in a single calendar year — the first team in football history to achieve perfection.

2. **Johan Cruyff & The Church of Tiki-Taka**:
   - Johan Cruyff didn't just build a team; he created a religion. His *Dream Team* won Barcelona's first European Cup in 1992 with Ronald Koeman's blistering free-kick at Wembley.
   - Pep Guardiola elevated this philosophy to God-tier levels between 2008 and 2012. With **Xavi, Andrés Iniesta, and Sergio Busquets** running the midfield, Barcelona played the most dominant, mesmerizing possession football the sport has ever seen. Sir Alex Ferguson famously called the 2011 Barça side that destroyed Man United 3-1 at Wembley the best team he ever faced in his 26-year career.

3. **The Divine Lionel Messi Era (2004–2021)**:
   - **672 goals in 778 matches** and 35 trophies.
   - From his Ronaldinho-assisted debut chip against Albacete in 2005 to his 91 goals in 2012 and solo masterclasses against Real Madrid at the Bernabéu.

4. **The MSN Trio (The Deadliest Trident in History)**:
   - **Messi, Luis Suárez, and Neymar Jr.**: Between 2014 and 2017, this trio scored an unbelievable **364 goals and provided 173 assists**. In 2014-15 alone, they put up 122 goals on their way to the Treble. Pure unplayable synergy.

5. **La Masia (The World's Greatest Football Academy)**:
   - In 2010, the top three finalists for the Ballon d'Or (**Messi, Iniesta, Xavi**) were all graduates of La Masia!
   - Today, that same academy is keeping the club elite with generational phenoms like **Lamine Yamal**, **Gavi**, **Pedri**, **Pau Cubarsí**, and **Fermín López**, backed by Polish superstar striker **Robert Lewandowski** and **Wojciech Szczęsny** under Hansi Flick's high-pressing tactical machine!

*"Més que un club"* (More than a club) isn't just a marketing slogan — Barcelona shaped the tactical DNA of modern football forever.`,
    };
  }

  // 4.7. REAL MADRID CF (LOS BLANCOS / THE KINGS OF EUROPE)
  if (
    /(real madrid|los blancos|halamadrid|hala madrid|is real madrid a great|is real madrid good|what do you think of real madrid|santiago bernabeu)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'Real Madrid CF: The Undisputed 15-Time Champions of Europe',
      topic: 'real_madrid',
      confidence: 1.0,
      response: `Real Madrid CF is the most successful, decorated, and ruthlessly clutch football club in human history!

### 👑 Why Real Madrid is The King of Football:
1. **15 UEFA Champions League Titles**: More than double the second-place club (AC Milan with 7). From Di Stéfano's 5-peat (1956–1960), Zidane's volley in 2002, *La Décima* (Ramos 92:48 in 2014), the Zidane 3-peat (2016–2018 with CR7), to the miracle comebacks of 2022 and 2024.
2. **The Galáctico Culture**: Alfredo Di Stéfano, Ferenc Puskás, Zinedine Zidane, Ronaldo Nazário, Luís Figo, David Beckham, Cristiano Ronaldo (450 goals in 438 matches), Gareth Bale, Karim Benzema, Luka Modrić, Toni Kroos, and now Kylian Mbappé, Vinícius Jr., and Jude Bellingham.
3. **The Bernabéu Aura**: In Champions League knockout games, 90 minutes at the Santiago Bernabéu is an eternity (*"90 minuti en el Bernabéu son molto longo"*). They are never dead until the final whistle blows.

36 La Liga titles, 15 Champions Leagues, and an unshakeable winning DNA!`,
    };
  }

  // 4.8. PREMIER LEAGUE GIANTS (Arsenal, Liverpool, Chelsea, Man Utd, Man City)
  if (
    /(arsenal|liverpool|chelsea|manchester united|man united|man city|manchester city|tottenham|spurs)/i.test(
      lower
    ) &&
    /(great|good|club|team|history|think of|opinion)/i.test(lower)
  ) {
    return {
      matched: true,
      title: 'Premier League Heavyweight Analysis',
      topic: 'premier_league_clubs',
      confidence: 0.98,
      response: `The English Premier League produces some of the most competitive, high-stakes football on Earth! Here is the lowdown:

- 🔴 **Liverpool FC**: 6x Champions League winners, 19 league titles. Famous for Anfield's legendary Kop atmosphere, *"You'll Never Walk Alone"*, Shankly, Paisley, and Jürgen Klopp's high-pressing Mentality Monsters.
- 🔴 **Manchester United**: 20 league titles, 3 Champions Leagues. Sir Alex Ferguson's 26-year dynasty, the 1999 Treble, and global cultural domination.
- 🔴⚪ **Arsenal**: 13 league titles. Arsène Wenger's 2003-04 **"Invincibles"** (went an entire 38-game Premier League season undefeated: 26W 12D 0L), flowing passing football, and Mikel Arteta's modern resurgence.
- 🔵 **Chelsea**: 2x Champions League winners (2012 in Munich & 2021). Revolutionized the Premier League in 2004-05 under José Mourinho conceding only 15 goals in 38 games.
- 🔵 **Manchester City**: 2023 Treble winners, 4-in-a-row Premier League champions (2021–2024), and the 100-point "Centurions" under Pep Guardiola.

Which club is your squad? Let's talk tactics and transfers!`,
    };
  }

  // 4.5. "THIS IS THE BEST CLUB EVER" / BEST CLUB IN HISTORY
  if (
    /(this is the best club ever|best club ever|the best club in the world|best football club|best soccer club|greatest club in the world|greatest club of all time|best club in history|best club|which club is the best|who is the best club)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'The Best Club Ever: The Undisputed Titans of Club Football & Nightlife',
      topic: 'best_club_ever',
      confidence: 1.0,
      response: `Hell fucking yeah! You're talking about pure pedigree, heritage, and raw passion! Whether you're repping your favorite football club or talking about the greatest nightlife venue on Earth, here is the real breakdown:

### 👑 1. If You Mean Football Clubs (The Kings of Europe):
- 👑 **Real Madrid CF (15x Champions League Winners)**:
  - Simply the most decorated, clutch sports institution in human history. From Di Stéfano's 5-peat in the 1950s, Zidane's 3-peat (2016–2018), to the miracle comebacks of 2022 & 2024. In the Champions League, Real Madrid doesn't just play finals — they *win* them.
- 🔴🔵 **FC Barcelona (The Artists of Pure Football)**:
  - Pep Guardiola's 2008–2012 Sextuple masterpiece with Messi, Xavi, Iniesta, and Busquets. They didn't just win trophies; they played the most aesthetically divine, possession-dominant football the world has ever seen. Plus the lethal MSN trio in 2015!
- 🔴 **AC Milan (7x European Champions)**:
  - Sacchi's Dutch trio (Gullit, Van Basten, Rijkaard), Maldini's 25-year defensive royalty, and Ancelotti's midfield diamond. Pure European royalty.
- 🔴 **Liverpool FC (6x European Champions & The Anfield Roar)**:
  - *"You'll Never Walk Alone"*, the Miracle of Istanbul in 2005, and Klopp's Mentality Monsters demolishing Barca 4-0 (*"Corner taken quickly... ORIGI!"*).
- 🔴 **Manchester United (The 1999 Treble & Fergie Era)**:
  - Sir Alex Ferguson's 26-year dynasty, the Class of '92, and never-say-die stoppage time winners (*Fergie Time*).
- 🔴 **Bayern Munich (6x UCL & The 2020 Sextuple Machine)**:
  - Total German ruthless efficiency, Beckenbauer's 1970s 3-peat, and Lewandowski's 55-goal 2020 masterclass.
- ⚔️ **Legia Warszawa & Lech Poznań (The Wildest Ultras & Atmosphere)**:
  - If you're talking about pure stadium noise, choreography, and pyro, Legia's *Żyleta* and Lech Poznań's world-famous *"Poznań dance"* blow almost every corporate stadium away!

---

### 🪩 2. If You Mean Nightclubs & Electronic Music Clubs:
- 🏛️ **Berghain / Panorama Bar (Berlin, Germany)**: The cathedral of raw industrial techno with a legendary sound system and strict door policy.
- 🌴 **Hï Ibiza & Amnesia (Ibiza, Spain)**: The epicenter of summer clubbing, world-class resident DJs, and massive terrace lasers.
- 🔊 **Fabric (London, UK)**: The underground British bass, techno, and drum'n'bass institution with its body-shaking vibrating floor.
- ⚡ **Printworks & Warehouse Project (Manchester/London)**: Epic industrial stages and mind-bending audio-visual production.

Which specific club are you claiming as the GOAT? Tell me who you're backing and let's debate it!`,
    };
  }

  // 5. THE GOAT DEBATE (Messi vs Ronaldo vs Pelé vs Maradona)
  if (
    /(who is the goat of football|who is the goat in soccer|messi or ronaldo|ronaldo or messi|is messi the goat|is ronaldo the goat|greatest footballer of all time|best soccer player of all time|best football player in history|goat debate)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'The Ultimate Football GOAT Breakdown',
      topic: 'goat_debate',
      confidence: 1.0,
      response: `Alright, let's settle the most heated, bloodthirsty debate in the history of sports without any diplomatic bullshit:

### 👑 1. Lionel Andrés Messi (The Complete Genius)
- **The Hardware**: 8 Ballon d'Ors (all-time record), 4 Champions Leagues, 10 La Liga titles, 2 Copa Américas, and the holy grail: the **2022 FIFA World Cup in Qatar** where he scored 7 goals and carried Argentina to glory.
- **The Insane Stats**: 830+ career goals, 370+ assists, and in 2012 he scored **91 fucking goals in a single calendar year** (a Guinness World Record that will probably never be touched).
- **The Eye Test**: Messi isn't just a goalscorer; he's the best playmaker, dribbler, and free-kick taker of our generation. He sees passes through 4 defenders that physics shouldn't allow.

### ⚡ 2. Cristiano Ronaldo (The Ultimate Athletic Machine / CR7)
- **The Hardware**: 5 Ballon d'Ors, 5 Champions Leagues (all-time UCL top scorer with 140 goals), Euro 2016 champion, league titles in England, Spain, and Italy.
- **The Insane Stats**: 900+ official career goals (the highest official goalscorer in human history), all-time top international goalscorer (130+ goals for Portugal).
- **The Mentality**: A relentless workhorse. Clutch in the biggest Champions League knockout moments (the hat-trick vs Atletico Madrid, the bicycle kick against Juventus in Turin).

### 🏆 3. Pelé (The Pioneer of Glory)
- **3 World Cups** (1958 at age 17, 1962, 1970). Nobody else in human history has won 3 World Cups. Over 1,000 career goals and the original icon of *Joga Bonito*.

### 🇦🇷 4. Diego Armando Maradona (The Pure Artist & Rebel)
- The single greatest individual World Cup carry job in history in **1986 Mexico** (The Hand of God and the Goal of the Century against England within 4 minutes of each other). He single-handedly took humble Napoli to two Serie A titles against the mighty AC Milan and Juventus.

### 🇳🇱 5. Johan Cruyff (The Man Who Invented Modern Football)
- 3 Ballon d'Ors, 3 European Cups with Ajax, and the mastermind behind Total Football which shaped the DNA of modern Barcelona and modern football coaching worldwide.

**The Verdict**: Messi winning the 2022 World Cup basically completed football like a video game. But whether you ride with Messi's pure divine magic or CR7's relentless goal machine engine, we were blessed as fuck to witness both in their prime for 15+ straight years!`,
    };
  }

  // 6. LIONEL MESSI SPECIFIC PROFILE
  if (/(tell me about messi|lionel messi|messi stats|messi career|how good was messi|messi 91 goals|messi barcelona|messi inter miami)/i.test(lower)) {
    return {
      matched: true,
      title: 'Lionel Messi: Career, Records & Legacy',
      topic: 'player_profile',
      confidence: 0.99,
      response: `Lionel Messi is widely considered the most complete offensive football player to ever touch a pitch.

Here is why his career is completely absurd:
1. **The 2011-2012 Season (Peak Football)**:
   - Scored **73 goals in 60 games** for Barcelona in 2011-12.
   - Scored **91 goals in the 2012 calendar year** (shattering Gerd Müller's 85-goal record from 1972).
2. **The Barcelona Dynasty (2004–2021)**:
   - 672 goals in 778 matches for Barça.
   - 35 trophies with Barcelona including two historic Trebles (2008-09 under Pep Guardiola and 2014-15 with the MSN trio of Messi, Suárez, and Neymar).
3. **The International Redemption (2021–2024)**:
   - After years of heartbreak (losing the 2014 World Cup final in extra time, 2015 & 2016 Copa América finals on penalties), he captained Argentina to the **2021 Copa América** at the Maracanã, the **2022 Finalissima** against Italy at Wembley, the legendary **2022 World Cup in Qatar**, and the **2024 Copa América**.
4. **Inter Miami & MLS Era**:
   - Transformed American soccer in 2023, leading Inter Miami to their first-ever trophy (Leagues Cup) and the 2024 MLS Supporters' Shield with record points.
5. **Signature Moves**: The drop of the shoulder, low center of gravity feints, effortless chipped penalties/finishes over onrushing goalkeepers, and pinpoint curling free-kicks into the top corner.`,
    };
  }

  // 7. CRISTIANO RONALDO SPECIFIC PROFILE
  if (/(tell me about ronaldo|cristiano ronaldo|cr7 stats|ronaldo career|how good was ronaldo|cr7 records|ronaldo real madrid|ronaldo al nassr)/i.test(lower)) {
    return {
      matched: true,
      title: 'Cristiano Ronaldo (CR7): Career, Records & Legacy',
      topic: 'player_profile',
      confidence: 0.99,
      response: `Cristiano Ronaldo dos Santos Aveiro is the undisputed greatest goal poacher, aerial threat, and clutch knockout performer in football history.

Key Milestones:
1. **Manchester United (2003–2009 & 2021–2022)**:
   - Transformed from a flashy, stepover-heavy teenage winger into a Ballon d'Or winner (2008) under Sir Alex Ferguson, winning 3 Premier League titles and the 2008 Champions League.
2. **Real Madrid Peak (2009–2018)**:
   - **450 goals in 438 games** for Real Madrid (averaging more than a goal per damn game!).
   - Won 4 Champions League titles in 5 years (including the historic 3-peat: 2016, 2017, 2018 under Zinedine Zidane).
   - Scored an astonishing 17 goals in a single UCL campaign (2013-14).
3. **Juventus & Al-Nassr**:
   - Dominated Serie A winning 2 Scudettos and Capocannoniere, then sparked the massive Saudi Pro League movement, breaking the league scoring record with 35 goals in a season for Al-Nassr.
4. **International Record**:
   - Led Portugal to glory in **Euro 2016** and the **2019 UEFA Nations League**.
   - 130+ international goals, the most by any male player in history.
5. **Iconic Traits**: 40+ inch vertical leaping headers (his 2.56m jump vs Sampdoria), the legendary knuckleball free-kicks, and the worldwide iconic celebration: **"SIUUUUU!"**`,
    };
  }

  // 8. 2022 WORLD CUP FINAL (ARGENTINA VS FRANCE)
  if (/(who won the 2022 world cup|2022 world cup final|argentina vs france 2022|lusail final|messi world cup)/i.test(lower)) {
    return {
      matched: true,
      title: 'The 2022 World Cup Final: Argentina vs France in Lusail',
      topic: 'world_cup',
      confidence: 1.0,
      response: `The **2022 FIFA World Cup Final in Lusail Stadium, Qatar (Dec 18, 2022)** is universally hailed as the greatest football match ever played in history.

Here's how the insane drama went down:
1. **First 75 Minutes (Argentina Masterclass)**:
   - Di María won a penalty converted by Messi (23').
   - Di María scored one of the slickest team counter-attacks in World Cup history (36'). Argentina was cruising 2-0 while France didn't have a single shot on target.
2. **The Kylian Mbappé 97-Second Explosion (80' - 81')**:
   - Mbappé buried a penalty in the 80th minute.
   - 97 seconds later, Mbappé hit an unbelievable volley past Emi Martínez to tie it 2-2 out of nowhere!
3. **Extra Time Carnage**:
   - 108': Messi scrambled in a rebound to make it 3-2 for Argentina.
   - 118': Gonzalo Montiel conceded a handball penalty; Mbappé buried it for a World Cup final hat-trick (first since Geoff Hurst in 1966) to make it 3-3!
   - 123': **The Dibu Martínez Save**: Randal Kolo Muani was 1-on-1 with only seconds left, and Emiliano "Dibu" Martínez pulled off the greatest left-leg reflex save in football history.
4. **Penalty Shootout (4-2 Argentina)**:
   - Dibu Martínez saved Kingsley Coman's penalty, Tchouaméni shot wide, and Montiel buried the winning penalty to crown Argentina 3-time World Champions and seal Messi's destiny.`,
    };
  }

  // 9. ALL WORLD CUP WINNERS & TOURNAMENT HISTORY
  if (/(list of world cup winners|who won the most world cups|all world cup winners|world cup history|world cup tournaments)/i.test(lower)) {
    return {
      matched: true,
      title: 'FIFA World Cup All-Time Champions & Records',
      topic: 'world_cup',
      confidence: 0.99,
      response: `Here is the full list of all 22 FIFA World Cup Champions (1930–2022):

- 🇧🇷 **Brazil (5 Titles)**: 1958, 1962, 1970, 1994, 2002 (The only 5-star nation).
- 🇩🇪 **Germany (4 Titles)**: 1954 (Miracle of Bern), 1974 (Beckenbauer vs Cruyff), 1990, 2014 (7-1 vs Brazil).
- 🇮🇹 **Italy (4 Titles)**: 1934, 1938 (Vittorio Pozzo back-to-back), 1982 (Paolo Rossi), 2006 (Cannavaro & Buffon).
- 🇦🇷 **Argentina (3 Titles)**: 1978 (Mario Kempes), 1986 (Diego Maradona), 2022 (Lionel Messi).
- 🇫🇷 **France (2 Titles)**: 1998 (Zidane headers vs Brazil), 2018 (Mbappé & Griezmann).
- 🇺🇾 **Uruguay (2 Titles)**: 1930 (Inaugural at Centenario), 1950 (The Maracanazo vs Brazil).
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **England (1 Title)**: 1966 (Geoff Hurst hat-trick vs West Germany).
- 🇪🇸 **Spain (1 Title)**: 2010 (Iniesta 116' extra-time winner vs Netherlands).

**Key World Cup Records**:
- **All-Time Top Scorer**: Miroslav Klose (Germany) – 16 goals across 4 tournaments.
- **Ronaldo Nazário**: 15 goals (1998, 2002, 2006).
- **Gerd Müller**: 14 goals (1970, 1974).
- **Lionel Messi**: 13 goals + 8 assists (2006, 2014, 2018, 2022).
- **Kylian Mbappé**: 12 goals in just 2 tournaments (2018, 2022).
- **Most Goals in a Single Tournament**: Just Fontaine (France, 1958) – 13 goals in 6 games!
- **Fastest Goal**: Hakan Şükür (Turkey, 2002) – 10.8 seconds vs South Korea.`,
    };
  }

  // 10. 2014 7-1 GERMANY VS BRAZIL (MINEIRAZO)
  if (/(7-1|germany vs brazil 7-1|brazil vs germany 7-1|mineirazo|brazil 1 germany 7)/i.test(lower)) {
    return {
      matched: true,
      title: 'The Mineirazo: Germany 7 - 1 Brazil (2014 World Cup)',
      topic: 'world_cup',
      confidence: 1.0,
      response: `On July 8, 2014, at the Estádio Mineirão in Belo Horizonte, the world witnessed the most shocking, humiliating slaughter in modern sports history.

What went down:
1. Brazil was hosting the World Cup, but their superstar **Neymar** had his vertebra fractured by Zúñiga in the quarterfinal, and captain **Thiago Silva** was suspended.
2. The First-Half Bloodbath:
   - 11': Thomas Müller taps in unmarked from a corner (1-0).
   - 23': Miroslav Klose scores to break Ronaldo Nazário's all-time World Cup scoring record (2-0).
   - 24': Toni Kroos hits a missile (3-0).
   - 26': Toni Kroos steals the ball and scores again (4-0).
   - 29': Sami Khedira slots it home after an effortless passing drill (5-0).
   - Germany scored **4 goals in 6 fucking minutes**. Brazil fans were weeping in the stands before half an hour had even passed.
3. Second Half: André Schürrle scored two more (including a roofed thunderbolt for 7-0) before Oscar bagged a sad 90th-minute consolation for 7-1.
4. Germany went on to beat Messi's Argentina 1-0 in the final with Mario Götze's 113' extra-time chest-and-volley goal.`,
    };
  }

  // 11. UEFA CHAMPIONS LEAGUE (UCL) & KINGS OF EUROPE
  if (/(who has the most champions leagues|champions league winners|ucl history|real madrid champions league|most ucl titles)/i.test(lower)) {
    return {
      matched: true,
      title: 'UEFA Champions League Records & All-Time Winners',
      topic: 'ucl',
      confidence: 0.99,
      response: `The UEFA Champions League (European Cup) is the pinnacle of club football. **Real Madrid** are the undisputed kings of this competition with an unreal **15 titles**.

### 🏆 All-Time Champions League Winners:
1. 🇪🇸 **Real Madrid (15 titles)**: 1956, 1957, 1958, 1959, 1960 (Di Stéfano 5-peat), 1966, 1998, 2000, 2002 (Zidane volley), 2014 (La Décima, Ramos 92:48), 2016, 2017, 2018 (Zidane 3-peat), 2022 (Courtois/Vini Jr), 2024 (Carvajal/Vini Jr at Wembley).
2. 🇮🇹 **AC Milan (7 titles)**: 1963, 1969, 1989, 1990 (Sacchi era with Gullit/Van Basten), 1994 (4-0 vs Cruyff's Barca), 2003, 2007 (Ancelotti revenge vs Liverpool).
3. 🇩🇪 **Bayern Munich (6 titles)**: 1974, 1975, 1976 (Beckenbauer era), 2001 (Kahn saves), 2013 (Robben 89'), 2020 (Flick sextuple, Coman header).
4. 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Liverpool (6 titles)**: 1977, 1978, 1981, 1984, 2005 (Miracle of Istanbul), 2019 (Klopp's mentality monsters vs Spurs).
5. 🇪🇸 **FC Barcelona (5 titles)**: 1992 (Koeman free kick), 2006 (Ronaldinho/Eto'o), 2009 (Pep Treble), 2011 (Wembley masterclass vs Man Utd), 2015 (MSN Treble).
6. 🇳🇱 **Ajax (4 titles)**: 1971, 1972, 1973 (Cruyff Total Football), 1995 (Kluivert toe-poke vs Milan).
7. 🇮🇹 **Inter Milan (3 titles)**: 1964, 1965 (Herrera Catenaccio), 2010 (Mourinho Treble with Milito brace).
8. 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Manchester United (3 titles)**: 1968 (Busby Babes legacy), 1999 (Sheringham & Solskjaer 90+3' vs Bayern), 2008 (CR7 & Moscow rain).
9. 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Chelsea (2 titles)**: 2012 (Drogba header & penalty in Munich), 2021 (Havertz vs Man City).
10. 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Manchester City (1 title)**: 2023 (Rodri rocket vs Inter to complete the Treble).
11. 🇵🇹 **Benfica (2 titles)**, 🇵🇹 **Porto (2 titles)**, 🇮🇹 **Juventus (2 titles)**, 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Nottingham Forest (2 titles back-to-back under Brian Clough in 1979 & 1980)**, 🏴󠁧󠁢󠁳󠁣󠁴󠁿 **Celtic (1967 Lisbon Lions)**, 🇫🇷 **Marseille (1993)**, 🇷🇴 **Steaua București (1986)**, 🇷🇸 **Red Star Belgrade (1991)**, 🇳🇱 **Feyenoord (1970)**, 🇳🇱 **PSV (1988)**, 🇩🇪 **Borussia Dortmund (1997)**, 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Aston Villa (1982)**, 🇩🇪 **Hamburger SV (1983)**.`,
    };
  }

  // 12. MIRACLE OF ISTANBUL 2005
  if (/(miracle of istanbul|2005 champions league final|liverpool vs milan 2005|milan vs liverpool 2005|istanbul 2005)/i.test(lower)) {
    return {
      matched: true,
      title: 'The Miracle of Istanbul: AC Milan 3 - 3 Liverpool (2005 UCL Final)',
      topic: 'ucl',
      confidence: 1.0,
      response: `May 25, 2005, at the Atatürk Olympic Stadium in Istanbul. The greatest comeback in European Cup history.

- **The First Half (AC Milan Domination)**: AC Milan fielded arguably the greatest starting XI ever assembled (Dida, Cafu, Nesta, Stam, Maldini, Pirlo, Gattuso, Seedorf, Kaká, Shevchenko, Crespo).
  - 1': Paolo Maldini volleys home the fastest final goal ever (1-0).
  - 39' & 44': Hernán Crespo scores a ruthless brace, including an unreal 40-yard curving assist from Kaká. Milan walks in at halftime up **3-0**.
- **The 6 Minutes of Madness (54' - 60')**:
  - 54': Captain Steven Gerrard heads in a cross and passionately rallies the crowd (3-1).
  - 56': Vladimír Šmicer hits a 25-yard low drive (3-2).
  - 60': Gerrard is fouled in the box; Xabi Alonso has his penalty saved by Dida but buries the rebound (3-3)!
- **Extra Time & Jerzy Dudek**:
  - 117': Polish goalkeeper **Jerzy Dudek** makes an impossible double save from point-blank range on Shevchenko.
  - Shootout: Dudek uses the "Bruce Grobbelaar spaghetti legs" distraction to save penalties from Pirlo and Shevchenko. Liverpool lifts their 5th European Cup against all odds!`,
    };
  }

  // 13. LA REMONTADA & CORNER TAKEN QUICKLY ORIGI
  if (/(remontada|barcelona vs psg 6-1|psg vs barcelona 6-1|corner taken quickly|origi goal vs barcelona|liverpool vs barcelona 4-0)/i.test(lower)) {
    return {
      matched: true,
      title: 'Iconic Champions League Comebacks: La Remontada & Corner Taken Quickly',
      topic: 'ucl',
      confidence: 1.0,
      response: `Two of the most insane comebacks in Champions League history:

### 1. La Remontada: Barcelona 6 - 1 PSG (March 8, 2017)
- **First Leg**: PSG crushed Barcelona **4-0 in Paris** with Di María and Draxler running riot.
- **Second Leg at Camp Nou**:
  - Barça pushed to 3-0 by the 50th minute.
  - 62': Edinson Cavani scored an away goal for PSG (3-1). Barcelona now needed **THREE MORE GOALS** with less than 30 minutes left because of the away goals rule.
  - 88': Neymar curled an impossible free-kick into the top corner (4-1).
  - 91': Neymar buried a penalty after Suárez was fouled (5-1).
  - 94:39': Neymar floated a delicate chip into the box, and **Sergi Roberto** stretched his right boot to volley in the 6-1 winner! Camp Nou registered minor seismic activity from the fans celebrating!

### 2. "Corner taken quickly... ORIGI!": Liverpool 4 - 0 Barcelona (May 7, 2019)
- **First Leg**: Barcelona won 3-0 at Camp Nou (Messi 35-yard free kick).
- **Second Leg at Anfield**: Liverpool had NO Mo Salah and NO Roberto Firmino.
- Origi scored early (1-0), Wijnaldum came off the bench at half-time and scored two goals in 122 seconds (3-0).
- 79': 20-year-old Trent Alexander-Arnold spotted Barcelona's entire defense sleeping, feigned walking away from the corner flag, whipped a lightning-fast low cross in, and **Divock Origi** buried it into the top corner. Martin Tyler: *"Corner taken quickly... ORIGI!"*`,
    };
  }

  // 14. PREMIER LEAGUE (EPL) & ICONIC ERAS
  if (/(premier league history|arsenal invincibles|manchester united trebles|fergie time|leicester 5000-1|aguero 93:20|centurions man city)/i.test(lower)) {
    return {
      matched: true,
      title: 'Premier League Legends, Records & Iconic Eras',
      topic: 'premier_league',
      confidence: 0.99,
      response: `The English Premier League (formed in 1992) is the most watched sports league on planet Earth.

### 🌟 Legendary EPL Eras & Milestones:
1. **Sir Alex Ferguson's Manchester United (13 Premier League Titles)**:
   - Fergie ruled English football for over two decades with the Class of '92 (Beckham, Scholes, Giggs, Neville brothers, Butt) and iconic strikers (Cantona, Rooney, Van Nistelrooy, CR7).
   - Won the historic **1999 Treble** (Premier League, FA Cup, Champions League).
2. **Arsenal's "The Invincibles" (2003-04)**:
   - Managed by Arsène Wenger with Thierry Henry, Patrick Vieira, Dennis Bergkamp, and Sol Campbell.
   - Played **38 league games: 26 wins, 12 draws, ZERO losses (49 games unbeaten overall)**. Awarded the unique Gold Premier League Trophy.
3. **Leicester City's 5000-1 Miracle (2015-16)**:
   - Managed by Claudio Ranieri with Jamie Vardy (scoring in 11 consecutive matches), Riyad Mahrez, and N'Golo Kanté. Bookies gave them 5000-to-1 odds to win the league, making it the biggest sporting underdog fairy tale in history.
4. **Manchester City's "Centurions" & 4-in-a-Row (Pep Guardiola)**:
   - In 2017-18, City became the only team in EPL history to hit **100 points** in a single season (with 106 goals scored).
   - In 2024, they became the first club in English top-flight history to win **4 consecutive league titles**.
5. **The Sergio Agüero 93:20 Moment (May 13, 2012)**:
   - Man City needed a win on the final day vs QPR. Down 1-2 in stoppage time: Džeko equalized at 91:14, and at 93:20, Mario Balotelli slipped the ball to Sergio Agüero who buried the winner. Martin Tyler's iconic scream: *"AGÜEROOOOOOO! I swear you'll never see anything like this ever again!"*`,
    };
  }

  // 15. BUNDESLIGA & BAYER LEVERKUSEN UNBEATEN (2023-24)
  if (/(bayer leverkusen unbeaten|xabi alonso leverkusen|bundesliga history|bayern munich 11 in a row|neverkusen)/i.test(lower)) {
    return {
      matched: true,
      title: 'Bundesliga History & Bayer Leverkusen\'s Historic Unbeaten 2023-24 Season',
      topic: 'bundesliga',
      confidence: 1.0,
      response: `The German Bundesliga has one of the highest goal averages and fan cultures in the world.

### 🔴 The Historic Invincible Bayer Leverkusen (2023-24):
- Managed by **Xabi Alonso**, Leverkusen went from 17th place when he took over in 2022 to creating the greatest single season in German football history:
- Became the **first team in Bundesliga history to go completely UNDEFEATED for an entire 34-game season (28 wins, 6 draws)**.
- Shattered the European record with a **51-game unbeaten streak across all competitions**, winning the Bundesliga and the DFB-Pokal!
- Earned the nickname "Laterkusen" because they scored stoppage-time equalizers and winners after the 90th minute in over 15 separate matches (Schick, Frimpong, Grimaldo, Wirtz, Boniface)!

### 🔴 Bayern Munich Dominance:
- 33 Bundesliga titles, including a record **11 consecutive titles from 2013 to 2023**.
- Won two historic **Sextuples** (all 6 trophies in a calendar year): in 2013 under Jupp Heynckes and in 2020 under Hansi Flick with Robert Lewandowski scoring 41 goals in 29 league games (beating Gerd Müller's 1971-72 record).`,
    };
  }

  // 16. SERIE A, THE SCUDETTO & ITALIAN DYNASTIES
  if (/(serie a history|scudetto|napoli 2023 title|juventus 9 in a row|inter milan second star|ac milan 2022)/i.test(lower)) {
    return {
      matched: true,
      title: 'Serie A History, The Scudetto & Iconic Italian Dynasties',
      topic: 'serie_a',
      confidence: 0.99,
      response: `Italian Serie A was the undisputed strongest league in the world throughout the 1980s and 1990s (the "Seven Sisters" era: Juventus, Milan, Inter, Roma, Lazio, Parma, Fiorentina).

### 🇮🇹 Major Historic Milestones:
1. **Juventus Dominance (36 Scudettos)**:
   - Won 9 consecutive league titles from 2012 to 2020 (under Antonio Conte and Max Allegri) powered by the BBC defense (Bonucci, Barzagli, Chiellini) and Gigi Buffon.
2. **Napoli's 2023 Miracle (33 Years in the Making)**:
   - Led by Luciano Spalletti with Victor Osimhen (Capocannoniere with 26 goals) and Khvicha "Kvaradona" Kvaratskhelia, Napoli won their 3rd Scudetto — their first since Diego Maradona lifted it in 1990. The city of Naples threw a party that lasted for months!
3. **Inter Milan's 2024 "Second Star"**:
   - Under Simone Inzaghi, Inter won their 20th Serie A title in 2023-24, earning their second gold star on their crest, beating AC Milan in the Derby della Madonnina to clinch it.
4. **AC Milan (19 Scudettos)**:
   - Sacchi's Dutch trio (Gullit, Van Basten, Rijkaard) and Ancelotti's midfield diamond (Pirlo, Gattuso, Seedorf, Kaká). Won the Scudetto in 2022 under Stefano Pioli with Zlatan Ibrahimović and Rafael Leão.`,
    };
  }

  // 17. MASTER MANAGERS & TACTICAL GENIUSES
  if (/(best football managers|pep guardiola vs jose mourinho|sir alex ferguson|carlo ancelotti|jurgen klopp|arrigo sacchi)/i.test(lower)) {
    return {
      matched: true,
      title: 'The Greatest Football Managers of All Time',
      topic: 'managers',
      confidence: 0.99,
      response: `Football history is shaped by tactical masterminds on the touchline:

### 1. Sir Alex Ferguson (The Ultimate Dynasty Builder)
- 38 trophies with Manchester United (including 13 Premier Leagues, 2 Champions Leagues, 5 FA Cups). Known for ruthless discipline, the "hairdryer treatment", and legendary late winners (*Fergie Time*).

### 2. Pep Guardiola (The Tactical Architect)
- The only manager to win **two European Trebles with two different clubs** (Barcelona in 2008-09 and Manchester City in 2022-23). Revolutionized modern football with positional play, inverted fullbacks, and the False 9.

### 3. Carlo Ancelotti ("Don Carlo")
- The only manager to win the **Champions League 5 times** (Milan 2003, 2007; Real Madrid 2014, 2022, 2024). The only coach to win league titles in all 5 top European leagues (England, Spain, Italy, Germany, France). Legendary man-management and the iconic eyebrow raise.

### 4. José Mourinho ("The Special One")
- Won the UCL with Porto (2004) and the historic Treble with Inter Milan (2010). Held the record of conceding only **15 goals in a 38-game Premier League season** with Chelsea in 2004-05 (which will never be broken).

### 5. Jürgen Klopp (The Heavy Metal King)
- Resurrected Borussia Dortmund (back-to-back Bundesliga titles) and Liverpool (Champions League 2019, Premier League 2020 after 30 years). Master of the *Gegenpress*.`,
    };
  }

  // 18. GOALKEEPERS & DEFENDERS ENCYCLOPEDIA
  if (/(best goalkeeper of all time|manuel neuer|gianluigi buffon|iker casillas|lev yashin|paolo maldini|sergio ramos|virgil van dijk)/i.test(lower)) {
    return {
      matched: true,
      title: 'The Greatest Goalkeepers & Defenders in Football History',
      topic: 'defenders_and_keepers',
      confidence: 0.99,
      response: `Offense sells tickets, but defense wins championships. Here are the titans of the backline:

### 🧤 Goalkeeper Royalty:
- 🇩🇪 **Manuel Neuer**: Revolutionized modern goalkeeping as the **Sweeper-Keeper**. During Germany's 2014 World Cup run (especially vs Algeria), he acted as an 11th outfield player, slide-tackling attackers 40 yards outside his penalty box. 2x Sextuple/Treble winner with Bayern.
- 🇮🇹 **Gianluigi Buffon**: 20+ years at the absolute pinnacle. Won the 2006 World Cup conceding only 2 goals the entire tournament (an own goal and a Zidane penalty). Over 1,100 career appearances.
- 🇪🇸 **Iker Casillas ("San Iker")**: Spain and Real Madrid captain. Won 2 Euros, 1 World Cup, and 3 UCLs. Made the legendary toe save on Arjen Robben in the 2010 World Cup final.
- 🇷🇺 **Lev Yashin ("The Black Spider")**: The **only goalkeeper to ever win the Ballon d'Or (1963)**. Saved over 150 penalties and kept over 270 clean sheets wearing his iconic all-black kit and flat cap.

### 🛡️ Defensive Gods:
- 🇮🇹 **Paolo Maldini**: 25 seasons at AC Milan, 5 Champions League titles, 7 Scudettos. Famous quote: *"If I have to make a tackle, then I have already made a mistake."*
- 🇪🇸 **Sergio Ramos**: The clutch warrior. 4 UCLs, 2 Euros, 1 World Cup. Scored the legendary **92:48 equalizer** against Atlético Madrid in the 2014 UCL final (*La Décima*).
- 🇳🇱 **Virgil van Dijk**: In the 2018-19 season with Liverpool, he went **64 consecutive games without being dribbled past once by any opponent**, finishing runner-up for the Ballon d'Or by just 7 votes to Messi.`,
    };
  }

  // 19. FOOTBALL TACTICS & FORMATIONS
  if (
    /(football tactics|explain tiki taka|what is gegenpressing|explain catenaccio|false 9 explained|4-3-3 vs 4-2-3-1|inverted fullbacks|total football|low block)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'Masterclass on Football Tactics & Philosophy',
      topic: 'tactics',
      confidence: 0.99,
      response: `Modern football is a tactical chess match played at 100 miles per hour. Here are the most influential tactical systems in history:

### 1. Total Football (*Totaalvoetbal*)
- **Pioneers**: Rinus Michels & Johan Cruyff (Ajax & Netherlands 1970s).
- **Core Concept**: Fluid positional interchangeability. Any outfield player can take over the role of any other player (if a defender joins the attack, a midfielder drops back to cover). The pitch is treated as elastic space.

### 2. Tiki-Taka (Positional Play / *Juego de Posición*)
- **Pioneers**: Pep Guardiola (Barcelona 2008–2012) & Luis Aragonés / Vicente del Bosque (Spain 2008–2012).
- **Core Concept**: Overwhelming possession via short, triangular passing, high line of engagement, and the **"6-Second Rule"** (counter-pressing immediately the second you lose the ball).
- **Key Triangles**: Xavi, Iniesta, and Sergio Busquets dictating tempo with Messi operating as a **False 9** (dropping deep into midfield to drag center-backs out of position and create overload).

### 3. Gegenpressing ("Heavy Metal Football")
- **Pioneers**: Ralf Rangnick, Jürgen Klopp (Borussia Dortmund & Liverpool), Marcelo Bielsa.
- **Core Concept**: *"No playmaker in the world can be as good as a good counter-pressing situation."* (Klopp). The moment you lose possession in the attacking third, 3 to 4 players aggressively swarm the opponent before they can organize their transition.

### 4. Catenaccio & The Low Block ("Park the Bus")
- **Pioneers**: Helenio Herrera (Grande Inter 1960s), Giovanni Trapattoni, José Mourinho (Chelsea 2004-06 & Inter 2010), Diego Simeone (Atlético Madrid).
- **Core Concept**: Ironclad defensive structure. Deploying a *Libero* (sweeper) or two compact banks of 4 in a low block to choke central space, forcing opponents out wide to hit harmless crosses, then killing them on ruthless counter-attacks.

### 5. Inverted Fullbacks & Box Midfield (The Modern Meta)
- **Pioneers**: Pep Guardiola (Man City), Mikel Arteta (Arsenal), Roberto De Zerbi.
- **Core Concept**: Instead of fullbacks running down the touchline to cross, they tuck inside next to the defensive midfielder in possession, transforming a 4-3-3 on paper into a **3-2-4-1** in possession. This creates numerical superiority (4v3) in the central midfield box!`,
    };
  }

  // 20. THE OFFSIDE RULE & VAR EXPLAINED
  if (/(offside rule explained|how does offside work in soccer|offside rule|var in football|handball rule in soccer|red card rules)/i.test(lower)) {
    return {
      matched: true,
      title: 'Football Rules: Offside, VAR & Disciplinary Laws',
      topic: 'rules',
      confidence: 1.0,
      response: `Let's break down the rules that spark the loudest yelling in every pub and living room on Earth:

### 🚩 1. The Offside Law (Law 11)
A player is in an **offside position** if:
1. Any part of their head, body, or feet is in the opponent's half of the pitch AND
2. Closer to the opponent's goal line than both the ball AND the **second-last opponent** (usually the last outfield defender, since the goalkeeper is almost always the last opponent).

**Critical Nuances**:
- **Point of Judgment**: Offside is measured at the exact millisecond the ball is **passed/played by a teammate**, NOT when the receiving player touches it.
- **Hands/Arms Don't Count**: You cannot score with your hands or arms, so your arms cannot put you offside (measured from the bottom of the armpit).
- **Active Play Requirement**: Being in an offside position is NOT an offense by itself. You must be **interfering with play**, **interfering with an opponent** (blocking the goalie's line of vision/challenging for the ball), or **gaining an advantage** from a rebound off the post or save.
- **Exceptions (NO Offside Possible On)**:
  1. Throw-ins
  2. Corner kicks
  3. Goal kicks
  4. If the player is behind the ball when passed (square or backward pass)
  5. If the ball was deliberately played backwards by an opponent.

### 📺 2. VAR (Video Assistant Referee)
VAR can only intervene in 4 match-changing situations (under the **"Clear and Obvious Error"** standard):
1. **Goals / No Goal** (fouls in the attacking buildup phase, offside lines, ball out of bounds).
2. **Penalty Decisions** (fouls inside/outside the penalty box).
3. **Direct Red Cards** (violent conduct, serious foul play, dogso — denial of an obvious goal-scoring opportunity).
4. **Mistaken Identity** (referee carding the wrong player).`,
    };
  }

  // 21. BALLON D'OR CONTROVERSIES & WINNERS
  if (/(ballon d'or|who won the ballon d'or|ballon dor robbery|ballon d'or winners|2024 ballon d'or|2020 ballon d'or|2023 ballon d'or)/i.test(lower)) {
    return {
      matched: true,
      title: 'Ballon d\'Or History, Top Winners & Major Controversies',
      topic: 'ballon_dor',
      confidence: 0.99,
      response: `The **Ballon d'Or** (created by *France Football* in 1956) is the most prestigious individual award in global football.

### 🏅 Top All-Time Winners:
- 🇦🇷 **Lionel Messi**: 8 (2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023)
- 🇵🇹 **Cristiano Ronaldo**: 5 (2008, 2013, 2014, 2016, 2017)
- 🇫🇷 **Michel Platini**: 3 (1983, 1984, 1985)
- 🇳🇱 **Johan Cruyff**: 3 (1971, 1973, 1974)
- 🇳🇱 **Marco van Basten**: 3 (1988, 1989, 1992)
- 🇧🇷 **Ronaldo Nazário (R9)**: 2 (1997, 2002)
- 🇩🇪 **Franz Beckenbauer**: 2 (1972, 1976 - one of only 3 defenders to ever win it, alongside Sammer and Cannavaro).

### 🔥 The Most Heated Ballon d'Or Controversies in History:
1. **2020 (The Robert Lewandowski Robbery)**:
   - Lewandowski scored **55 goals in 47 games**, won the Sextuple with Bayern Munich (Bundesliga, DFB-Pokal, UCL, German Supercup, UEFA Super Cup, Club World Cup), and France Football bizarrely canceled the award due to COVID-19 despite all leagues finishing.
2. **2024 (Rodri vs Vinícius Jr)**:
   - Manchester City & Spain midfielder **Rodri** won the 2024 Ballon d'Or after going on an unreal 74-game unbeaten streak, winning the Premier League and Euro 2024 (Player of the Tournament). Real Madrid boycotted the ceremony in protest because they felt Vini Jr (UCL + La Liga champion) deserved it.
3. **2010 (Messi vs Sneijder / Iniesta / Xavi)**:
   - Wesley Sneijder won the Treble with Inter Milan and reached the World Cup final with Netherlands; Iniesta scored the World Cup winning goal; but Messi took it after scoring 60 goals.
4. **2013 (Cristiano Ronaldo vs Franck Ribéry)**:
   - Ribéry won the Treble with Bayern Munich, but FIFA controversially extended the voting deadline after Ronaldo's heroic World Cup playoff hat-trick vs Sweden.`,
    };
  }

  // 22. EL CLÁSICO & FIERCE RIVALRIES
  if (/(el clasico|real madrid vs barcelona|barcelona vs real madrid|biggest football rivalries|superclasico|derby della madonnina|north london derby)/i.test(lower)) {
    return {
      matched: true,
      title: 'El Clásico & The World\'s Fiercest Football Rivalries',
      topic: 'rivalries',
      confidence: 0.99,
      response: `Club football thrives on historic, blood-boiling tribal rivalries.

### ⚔️ 1. El Clásico: Real Madrid vs FC Barcelona
- **Context**: Beyond sporting dominance, it represents Spanish royalist centralism (Madrid) vs Catalan regional identity and culture (Barcelona).
- **The Peak Era (2010–2018)**: Pep Guardiola vs José Mourinho on the touchline; Lionel Messi vs Cristiano Ronaldo on the pitch. The intensity between 2010 and 2012 saw red cards, bench brawls, and football played at an ungodly high technical level.
- **Historic Clásicos**:
  - 2005: Ronaldinho destroyed Real Madrid at the Santiago Bernabéu and received a rare standing ovation from Madridistas.
  - 2009: Barcelona obliterated Real Madrid 6-2 at the Bernabéu.
  - 2010: Barcelona's 5-0 (*La Manita*) masterclass over Mourinho's Madrid at Camp Nou.
  - 2017: Messi scores his 500th Barça goal in the 92nd minute at the Bernabéu (3-2) and holds his shirt up to the silent Madrid crowd.

### 🌍 Other Legendary World Derbies:
- 🇦🇷 **El Superclásico (Boca Juniors vs River Plate)**: Absolute madness in Buenos Aires (La Bombonera vs El Monumental). Flares, drums, raw passion.
- 🏴󠁧󠁢󠁳󠁣󠁴󠁿 **The Old Firm (Celtic vs Rangers)**: Glasgow derby rooted in deep religious, cultural, and political history.
- 🇮🇹 **Derby della Madonnina (Inter Milan vs AC Milan)**: Sharing the legendary San Siro / Stadio Giuseppe Meazza.
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **The North London Derby (Arsenal vs Tottenham)** & **The Manchester Derby (United vs City)**.`,
    };
  }

  // 23. ICONIC PLAYERS ENCYCLOPEDIA (R9, Ronaldinho, Zidane, Henry, Haaland, Mbappe, Yamal, etc.)
  if (/(ronaldo nazario|r9|el fenomeno|ronaldinho|zinedine zidane|thierry henry|erling haaland|kylian mbappe|lamine yamal|jude bellingham|luka modric|neymar)/i.test(lower)) {
    return {
      matched: true,
      title: 'Football Legends & Next-Gen Superstars',
      topic: 'legends',
      confidence: 0.99,
      response: `Here's the rundown on some of the most electrifying ballers to ever grace a pitch:

- 🇧🇷 **Ronaldo Nazário (R9 / El Fenómeno)**: In his prime at PSV, Barcelona, and Inter (pre-knee injury in 1999), R9 was an unstoppable combination of supersonic speed, bull-like power, and Brazilian flair (the elastico, stepovers at full sprint). Won the 1994 and 2002 World Cups (scoring 8 goals in 2002 including 2 in the final vs Oliver Kahn).
- 🇧🇷 **Ronaldinho (The Magician of Joga Bonito)**: Pure joy and smile. No-look passes, bicycle kicks, elastico nutmegs. He won the 2002 World Cup, 2005 Ballon d'Or, and 2006 Champions League while making football feel like street art.
- 🇫🇷 **Zinedine Zidane (Zizou)**: The epitome of elegance and grace in midfield. Ruled the pitch with effortless roulette turns and first-touch control. Scored 2 headers in the 1998 World Cup final, the greatest UCL final volley ever in 2002 vs Leverkusen, and managed Real Madrid to 3 consecutive Champions League titles.
- 🇫🇷 **Thierry Henry**: The king of the Premier League with Arsenal (4 Golden Boots, 175 EPL goals). Trademark move: drifting to the left wing, cutting inside at blazing speed, and opening his body to side-foot the ball into the far right corner.
- 🇧🇷 **Neymar Jr**: The prince who never became king. Unreal trickery, rainbow flicks, leading Santos to the 2011 Copa Libertadores and Barcelona's 2015 Treble with 39 goals.
- 🇳🇴 **Erling Haaland**: A cybernetic Scandinavian goal machine. Shattered the all-time Premier League single-season scoring record with **36 goals in 35 games** in his debut 2022-23 season at Man City.
- 🇫🇷 **Kylian Mbappé**: Electric pace, World Cup winner at 19 in 2018, World Cup final hat-trick hero in 2022, now starring for Real Madrid.
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Jude Bellingham**: Golden Boy winner, Kopa Trophy, scoring 23 goals in his debut season at Real Madrid including last-minute El Clásico winners.
- 🇪🇸 **Lamine Yamal**: The teenage sensation from Barcelona's La Masia who lit up Euro 2024 at age 16/17 (Young Player of the Tournament), hitting that unreal curving golazo vs France.
- 🇭🇷 **Luka Modrić**: Won 6 Champions League titles with Real Madrid and broke the Messi-Ronaldo 10-year Ballon d'Or monopoly in 2018 after leading tiny Croatia to the World Cup final.`,
    };
  }

  // 24. 2024 UEFA CHAMPIONS LEAGUE FINAL (REAL MADRID VS BORUSSIA DORTMUND)
  if (
    /(2024 (?:uefa )?champions league|who won the 2024 (?:uefa )?champions league|2024 ucl final|real madrid vs dortmund 2024|dortmund vs real madrid 2024|what happened in the (?:2024 )?(?:ucl|champions league) final|champions league final 2024)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: '2024 UEFA Champions League Final: Real Madrid 2 - 0 Borussia Dortmund',
      topic: 'ucl_2024_final',
      confidence: 1.0,
      response: `The **2024 UEFA Champions League Final** took place on **June 1, 2024, at Wembley Stadium in London**, and **Real Madrid** won their record-extending **15th European Cup (*La Decimoquinta*)**, defeating **Borussia Dortmund 2–0**!

Here is the exact breakdown of the drama that went down in that final:

### ⏱️ Match Summary & Key Moments:
1. **First Half (Borussia Dortmund Dominated, But Blew Golden Chances)**:
   - Dortmund came out blazing and shocked Madrid in the first 45 minutes with relentless counter-attacks.
   - **21'**: Karim Adeyemi broke clean through on a 1-on-1, rounded goalkeeper Thibaut Courtois, but pushed the ball too wide and had his shot blocked by Dani Carvajal.
   - **23'**: Niclas Füllkrug slid a shot past Courtois that **clattered right off the inside of the far post**!
   - **28'**: Adeyemi sprinted into the box again and fired a low drive, but Courtois made a clutch diving reflex save.
   - **41'**: Marcel Sabitzer hit a blistering 25-yard dipping strike that Courtois tipped around the post. Dortmund should have been up 2–0 or 3–0 at halftime, but couldn't finish.

2. **Second Half (Real Madrid Strikes Like Lightning)**:
   - Carlo Ancelotti adjusted his tactics, and Real Madrid took control in the final 30 minutes.
   - **74' (1–0 Goal)**: From a precision corner whipped in by **Toni Kroos** (playing the final club match of his legendary career), **Dani Carvajal** rose above Dortmund's defense at the near post and buried a glancing header into the far corner!
   - **83' (2–0 Goal)**: Dortmund left-back Ian Maatsen made a catastrophic turnover under pressure, playing a blind square ball across his own box. **Jude Bellingham** intercepted it and fed **Vinícius Júnior**, who took one touch and slotted a left-footed finish past Gregor Kobel!
   - **87' (Disallowed Goal)**: Niclas Füllkrug powered in a header for Dortmund, but it was immediately ruled out by VAR for clear offside.

### 🏆 Historic Milestones:
- **Real Madrid's 15th Title**: Extended their historic supremacy with more than double the trophies of second-place AC Milan (7).
- **Toni Kroos' Fairytale Farewell**: Retired from club football lifting his 6th Champions League trophy with an assist.
- **Record 6 European Cups**: Luka Modrić, Dani Carvajal, Toni Kroos, and Nacho matched Paco Gento's all-time record of **6 European Cup titles**.
- **Carlo Ancelotti**: Won his **5th Champions League title as a manager** (more than anyone in history).
- **Vinícius Júnior**: Scored in his second Champions League final (after also scoring the winner in the 2022 final vs Liverpool).`,
    };
  }

  // 25. 2023 UEFA CHAMPIONS LEAGUE FINAL (MAN CITY VS INTER MILAN)
  if (
    /(2023 (?:uefa )?champions league|who won the 2023 (?:uefa )?champions league|2023 ucl final|man city vs inter 2023|inter vs man city 2023|city treble 2023)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: '2023 UEFA Champions League Final: Manchester City 1 - 0 Inter Milan',
      topic: 'ucl_2023_final',
      confidence: 1.0,
      response: `On **June 10, 2023, at the Atatürk Olympic Stadium in Istanbul**, **Manchester City defeated Inter Milan 1–0** to win their first-ever Champions League and complete a historic **European Treble** (Premier League, FA Cup, Champions League)!

- **68' The Winning Goal**: Bernardo Silva's deflected cross fell to Spanish defensive midfielder **Rodri**, who curled a laser-accurate 18-yard side-footed missile into the bottom right corner!
- **Late Drama & Ederson Heroics**:
  - Federico Dimarco looped a header that hit the crossbar, and his rebound header accidentally hit his own teammate Romelu Lukaku!
  - 88': Lukaku had a free point-blank header from 4 yards out, but Ederson made an unbelievable reaction block with his shin.
  - 95': On the final corner of the match, Ederson pulled off a fingertip save from Acerbi to seal the Treble for Pep Guardiola!`,
    };
  }

  // 26. EURO 2024 (SPAIN CHAMPIONS)
  if (
    /(who won euro 2024|euro 2024 final|spain vs england 2024|england vs spain euro 2024|what happened in euro 2024)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'UEFA Euro 2024 Final: Spain 2 - 1 England in Berlin',
      topic: 'euro_2024_final',
      confidence: 1.0,
      response: `On **July 14, 2024, at the Olympiastadion in Berlin**, **Spain defeated England 2–1** to win a record **4th UEFA European Championship**, winning all 7 matches in the tournament!

- **47' (1–0)**: Just 2 minutes into the second half, 17-year-old **Lamine Yamal** sliced open the defense with an assist to **Nico Williams**, who drilled a first-time finish past Jordan Pickford.
- **73' (1–1)**: England sub **Cole Palmer** hit a brilliant first-time 22-yard curling equalizer into the bottom corner.
- **86' (2–1 Goal)**: Marc Cucurella whipped in a low cross, and **Mikel Oyarzabal** slid in to poke the ball into the net!
- **89' Dani Olmo Miracle Header**: Marc Guéhi headed towards an empty net for England, but **Dani Olmo pulled off an insane goal-line headed clearance** to save Spain's victory!
- **Awards**: **Rodri** won Player of the Tournament; **Lamine Yamal** won Young Player of the Tournament with 1 goal and 4 assists.`,
    };
  }

  // 27. COPA AMÉRICA 2024 (ARGENTINA CHAMPIONS)
  if (
    /(who won copa america 2024|copa america 2024 final|argentina vs colombia 2024|colombia vs argentina 2024)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'Copa América 2024 Final: Argentina 1 - 0 Colombia in Miami',
      topic: 'copa_america_2024',
      confidence: 1.0,
      response: `On **July 14, 2024, at Hard Rock Stadium in Miami**, **Argentina defeated Colombia 1–0 after extra time** to win their record **16th Copa América title** (back-to-back Copa Américas in 2021 & 2024 + 2022 World Cup)!

- **66' Messi's Ankle Injury**: Lionel Messi suffered a severe swollen right ankle, had to be substituted, and wept uncontrollably on the bench.
- **112' The Winning Goal**: In extra time, Giovani Lo Celso slipped a first-time pass to **Lautaro Martínez**, who sprinted through and hammered the winner past Camilo Vargas (Lautaro won the Golden Boot with 5 goals).
- **Ángel Di María's Farewell**: Di María was substituted in the 117th minute to a standing ovation in his final match for Argentina.`,
    };
  }

  // 28. LIGUE 1 & PARIS SAINT-GERMAIN (PSG)
  if (/(ligue 1|paris saint-germain|psg|marseille|monaco 2017|lyon|kylian mbappe psg|neymar psg|qatar sports investments)/i.test(lower)) {
    return {
      matched: true,
      title: 'Ligue 1 & The Rise of Paris Saint-Germain',
      topic: 'ligue_1',
      confidence: 0.98,
      response: `French Ligue 1 has long been a factory for raw, explosive talent even while sitting a notch below the "Big 4" leagues in overall depth.

### 🇫🇷 Paris Saint-Germain's QSI Era (2011–Present):
- **Qatar Sports Investments** bought PSG in 2011 and turned them into a global superpower, assembling the **MNM trio** (Mbappé, Neymar, Messi) from 2021–2023 — arguably the most expensive attacking front three ever fielded, though it never delivered the Champions League.
- **12+ Ligue 1 titles**, including a period of near-total domination (7 titles in 8 seasons from 2015 to 2023).
- **2020 UCL Final Heartbreak**: Lost 1-0 to Bayern Munich (Kingsley Coman header) in the empty-stadium COVID final in Lisbon.
- **2025 Treble & UCL Glory**: Under Luis Enrique and a rebuilt, less star-studded but far more cohesive squad (Dembélé, Vitinha, Hakimi, Doué), PSG finally won their first-ever Champions League, thrashing Inter Milan 5-0 in the 2025 final — the biggest UCL final winning margin in history.

### 🔵⚪ Other Ligue 1 Giants:
- **Olympique de Marseille**: Won France's only Champions League/European Cup in **1993** (Basile Boli header vs AC Milan). Fierce, passionate Stade Vélodrome atmosphere and *Le Classique* rivalry with PSG.
- **AS Monaco**: Shocked Europe winning Ligue 1 in **2016-17** with a teenage Kylian Mbappé, Bernardo Silva, and Fabinho, reaching the UCL semi-finals.
- **Olympique Lyonnais**: Won a remarkable **7 consecutive Ligue 1 titles from 2002 to 2008**, and their women's team (OL Féminin) is the most decorated club in Women's Champions League history (8 titles).`,
    };
  }

  // 29. UEFA EUROPA LEAGUE & CONFERENCE LEAGUE
  if (/(europa league|uefa cup history|conference league|europa league winners|sevilla europa league|jose mourinho europa league)/i.test(lower)) {
    return {
      matched: true,
      title: 'UEFA Europa League & Conference League: Europe\'s Second-Tier Glory',
      topic: 'europa_league',
      confidence: 0.98,
      response: `The UEFA Europa League (rebranded from the UEFA Cup in 2009) is European football's second club competition, and Sevilla FC have turned it into their personal fiefdom.

### 🏆 Sevilla's Unmatched Europa League Dynasty (7 Titles!):
- Won it in **2006, 2007, 2014, 2015, 2016, 2020, and 2023** — no club has ever come close to this level of dominance in a single European competition.
- The 2014-2016 three-peat under Unai Emery remains one of the most underrated feats in modern football, and their 2023 win (beating Roma on penalties, José Mourinho's first-ever European final loss as a manager) extended the legend.

### ⚔️ Other Notable Europa League Moments:
- **José Mourinho's Europa League Obsession**: Won it with Porto (2003) before it was even called the Europa League (still UEFA Cup), then again with Manchester United (2017) and Roma (2022, the first-ever Europa Conference League title).
- **Villarreal 2021**: Beat Manchester United on penalties (11-10, the longest UCL/Europa shootout in a major European final) with goalkeeper Gerónimo Rulli scoring the winning penalty himself before saving the last one.
- **Atalanta 2024**: Ended their trophy drought by demolishing Bayer Leverkusen 3-0 in the final — the only defeat "Neverkusen" suffered in their entire historic 2023-24 season.

### 🥉 UEFA Europa Conference League (Est. 2021):
- The newest third-tier UEFA competition, giving smaller nations and clubs (Roma, West Ham, Fiorentina, Chelsea) a genuine shot at continental silverware. West Ham won the inaugural-era trophy in 2023, their first European title since 1965.`,
    };
  }

  // 30. COPA LIBERTADORES & SOUTH AMERICAN CLUB FOOTBALL
  if (/(copa libertadores|libertadores|south american club football|flamengo|palmeiras|santos fc|corinthians|boca juniors libertadores|river plate libertadores|independiente)/i.test(lower)) {
    return {
      matched: true,
      title: 'Copa Libertadores: South America\'s Ultimate Club Prize',
      topic: 'copa_libertadores',
      confidence: 0.98,
      response: `The **Copa Libertadores** (est. 1960) is South America's equivalent of the Champions League — arguably even more brutal, passionate, and chaotic given the stadium atmospheres in Argentina and Brazil.

### 🏆 All-Time Record Holders:
- 🇦🇷 **Independiente (7 titles)**: The most decorated club in the competition's history, dominant in the 1960s-70s ("Rey de Copas" - King of Cups).
- 🇦🇷 **Boca Juniors (6 titles)**: La Bombonera is one of the most intimidating away venues on Earth. Won a historic Libertadores/Intercontinental double in 2000 and 2003.
- 🇧🇷 **São Paulo (3 titles)** & 🇦🇷 **River Plate (4 titles)**: River's 2015 win over Tigres and 2018 win over bitter rivals Boca (played in Madrid due to fan violence, "La Final de Madrid") are historic.
- 🇧🇷 **Flamengo**: Won a stunning **2019 final** with two stoppage-time goals (Gabigol brace in the 89th & 91st minutes) to beat River Plate 2-1, sparking pandemonium in Rio de Janeiro. Won it again in 2022.
- 🇧🇷 **Palmeiras**: Won back-to-back titles in 2020 and 2021, the latter decided by a Deyverson extra-time header vs Flamengo.

### ⚽ Pelé's Santos FC (The Original Global Icon):
- Pelé's Santos won back-to-back Libertadores/Intercontinental Cup doubles in **1962 and 1963**, beating European champions Benfica and AC Milan, cementing Brazil as the spiritual home of *jogo bonito* football on the world stage decades before the modern Champions League era existed.

### 🔥 The Brasileirão (Campeonato Brasileiro Série A):
- Brazil's top flight is famously the most competitive and physically demanding domestic league in South America, with Palmeiras, Flamengo, Corinthians, and São Paulo as the modern powerhouses.`,
    };
  }

  // 31. EREDIVISIE & DUTCH FOOTBALL (AJAX, PSV, FEYENOORD)
  if (/(eredivisie|ajax amsterdam|psv eindhoven|feyenoord|dutch football|johan cruyff arena|de klassieker)/i.test(lower)) {
    return {
      matched: true,
      title: 'Eredivisie & The Dutch Total Football Legacy',
      topic: 'eredivisie',
      confidence: 0.98,
      response: `The Netherlands has produced a footballing philosophy (Total Football) that influenced the entire modern game, despite the Eredivisie being a relatively small league financially.

### 🔴⚪ AFC Ajax (36 Eredivisie Titles, 4 European Cups):
- **The 1971-1973 European Cup 3-peat** under Rinus Michels then Ştefan Kovács, powered by Johan Cruyff's genius, invented and perfected *Totaalvoetbal* (Total Football).
- **1995 Champions League Title**: Louis van Gaal's legendary young Ajax squad (Edwin van der Sar, Frank & Ronald de Boer, Patrick Kluivert, Clarence Seedorf, Edgar Davids) beat Milan 1-0, arguably the last great triumph of a fully homegrown academy side in the Champions League era.
- **La Masia's European cousin**: Ajax's academy (De Toekomst) produced Cruyff, Van Basten, Bergkamp, the De Boer twins, Davids, Seedorf, and modern stars like De Ligt and Frenkie de Jong.

### 🔵⚪ PSV Eindhoven & 🔴⚫ Feyenoord:
- **PSV**: Won the 1988 European Cup Treble under Guus Hiddink with Ronald Koeman and Romário, and remain Ajax's biggest domestic rival.
- **Feyenoord**: Won the 1970 European Cup (the first Dutch club European champion) and 2002 UEFA Cup on home turf at De Kuip.
- **De Klassieker**: Ajax vs Feyenoord is the fiercest, most historic rivalry in Dutch football, a clash of Amsterdam vs Rotterdam identity.`,
    };
  }

  // 32. PRIMEIRA LIGA & PORTUGUESE FOOTBALL (PORTO, BENFICA, SPORTING)
  if (/(primeira liga|fc porto|benfica|sporting cp|sporting lisbon|portuguese football|estadio da luz|jose mourinho porto 2004)/i.test(lower)) {
    return {
      matched: true,
      title: 'Primeira Liga & The Big Three of Portuguese Football',
      topic: 'primeira_liga',
      confidence: 0.98,
      response: `Portugal punches wildly above its weight in football, producing world-class talent and two European champion clubs from a nation of just 10 million people.

### 🔵 FC Porto (José Mourinho's Launchpad):
- Won the **2003 UEFA Cup and the 2004 Champions League** back-to-back under a then-unknown 41-year-old José Mourinho, beating Monaco 3-0 in the UCL final and launching "The Special One" into global superstardom.
- 30+ Primeira Liga titles, historically Portugal's most dominant club alongside Benfica.

### 🔴 SL Benfica (The Eagles):
- Won back-to-back European Cups in **1961 and 1962** under Béla Guttmann, powered by the legendary **Eusébio** ("The Black Panther"), who scored 4 goals in the 1962 final vs Real Madrid.
- **The Curse of Guttmann**: After being denied a pay rise, Guttmann allegedly cursed the club, declaring Benfica would never win a European title again for 100 years — they've since lost **8 consecutive European finals**.

### 🟢⚪ Sporting CP:
- Poland-adjacent claim to fame: developed Cristiano Ronaldo before selling him to Manchester United in 2003. Won a rare Primeira Liga title in 2021 under Rúben Amorim after a 19-year drought.`,
    };
  }

  // 33. ATLÉTICO MADRID (LOS COLCHONEROS)
  if (/(atletico madrid|atleti|diego simeone atletico|cholismo|wanda metropolitano)/i.test(lower)) {
    return {
      matched: true,
      title: 'Atlético Madrid: Diego Simeone\'s Fortress of Grit',
      topic: 'atletico_madrid',
      confidence: 0.98,
      response: `Atlético Madrid ("Los Colchoneros") have built their entire modern identity around one man: **Diego "Cholo" Simeone**, manager since December 2011.

### ⚔️ "Cholismo" — The Philosophy of Suffering to Win:
- Simeone's Atlético is defined by an ultra-organized, physically relentless **4-4-2 defensive block**, brutal work-rate, and a "no game is over until the final whistle" mentality that has become known globally as *Cholismo*.
- Won **La Liga in 2014 and 2021**, breaking the Real Madrid/Barcelona duopoly both times — the 2014 title was won on the final day at Camp Nou with a Diego Godín header.

### 💔 The Heartbreak of 3 Champions League Finals:
- **2014 Final vs Real Madrid**: Led 1-0 deep into stoppage time before Sergio Ramos' 92:48 header sent it to extra time, where Real Madrid ran away 4-1 winners (*La Décima*).
- **2016 Final vs Real Madrid (again)**: A 1-1 draw went to penalties, where Juanfran hit the post to hand Real Madrid their 11th European Cup.
- Simeone remains one of the greatest managers to never win the Champions League, but has built Atlético into a permanent top-4 European power on a fraction of Real Madrid and Barcelona's budgets.`,
    };
  }

  // 34. BORUSSIA DORTMUND (BVB & THE YELLOW WALL)
  if (/(borussia dortmund|bvb|yellow wall|signal iduna park|westfalenstadion|dortmund champions league)/i.test(lower)) {
    return {
      matched: true,
      title: 'Borussia Dortmund: The Yellow Wall & The Klopp Revolution',
      topic: 'borussia_dortmund',
      confidence: 0.98,
      response: `Borussia Dortmund is famous worldwide for having the single most intimidating fan atmosphere in club football: the **Südtribüne ("Yellow Wall")** at Signal Iduna Park, holding 25,000 standing fans in one continuous terrace.

### 🟡⚫ The Klopp Golden Era (2008–2015):
- Jürgen Klopp built a young, high-pressing, counter-attacking Gegenpressing machine, winning back-to-back Bundesliga titles in **2011 and 2012** (the 2012 season included a domestic double with the DFB-Pokal, going undefeated at home).
- Reached the **2013 Champions League final at Wembley**, losing a bruising 2-1 battle to fellow Bundesliga rivals Bayern Munich (Robben's 89th-minute winner).
- Klopp's Dortmund became the Bundesliga's premier academy for elite talent: Lewandowski, Mario Götze, Marco Reus, İlkay Gündoğan, Shinji Kagawa, and later Jadon Sancho, Erling Haaland, and Jude Bellingham all passed through the Westfalenstadion before becoming global superstars elsewhere.
- Reached a second Champions League final in **2024**, losing 2-0 to Real Madrid despite dominating large stretches of the game (see the 2024 UCL Final entry for the full breakdown).`,
    };
  }

  // 35. INTER MILAN, AS ROMA & NAPOLI DEEP DIVE
  if (/(inter milan history|internazionale|jose mourinho inter treble|as roma history|totti|napoli history|diego maradona napoli)/i.test(lower)) {
    return {
      matched: true,
      title: 'Inter Milan, AS Roma & Napoli: The Soul of Italian Football',
      topic: 'italian_clubs',
      confidence: 0.98,
      response: `Beyond Juventus and AC Milan, Italy's football culture runs deep through Inter, Roma, and Napoli.

### 🔵⚫ Inter Milan (Internazionale):
- **The Grande Inter (1960s)**: Helenio Herrera's Catenaccio masters won back-to-back European Cups in 1964 and 1965.
- **José Mourinho's 2010 Treble**: Won Serie A, Coppa Italia, and the Champions League in the same season — famously eliminating Pep Guardiola's Barcelona in the semi-final playing with 10 men for over an hour, then beating Bayern Munich 2-0 in the final (Diego Milito brace). No Italian club has repeated this Treble since.
- **2024 "Second Star"**: Won their 20th Scudetto under Simone Inzaghi, clinching it in the Derby della Madonnina against bitter rivals AC Milan.

### 🟡🔴 AS Roma:
- **Francesco Totti**: "Il Capitano" spent his entire 25-year career at Roma (786 appearances, 307 goals), winning the 2001 Scudetto and becoming the eternal symbol of one-club loyalty in modern football.
- Reached the 2023 Europa League final under José Mourinho, their first European final in over 30 years.

### 🔵⚪ Napoli:
- **Diego Maradona's Napoli (1984–1991)**: Maradona single-handedly dragged a mid-table southern Italian club to two Scudettos (1987, 1990) and a UEFA Cup (1989), toppling the dominant northern giants Juventus, Milan, and Inter. The city still worships him as a religious figure.
- **2023 Scudetto**: See the Serie A entry — Napoli's first title since Maradona's era, 33 years later.`,
    };
  }

  // 36. AFCON & AFRICAN FOOTBALL LEGENDS
  if (/(afcon|africa cup of nations|african football|george weah|didier drogba|samuel eto'o|sadio mane|mohamed salah|senegal 2022 afcon|ivory coast 2024 afcon)/i.test(lower)) {
    return {
      matched: true,
      title: 'AFCON & The Legends of African Football',
      topic: 'african_football',
      confidence: 0.98,
      response: `African football has produced some of the most electrifying talent in the sport's history, showcased biennially at the **Africa Cup of Nations (AFCON)**.

### 🏆 AFCON Powerhouses:
- 🇪🇬 **Egypt (7 titles - record)**: The most successful AFCON nation, including a stunning 3-peat from 2006 to 2010.
- 🇨🇲 **Cameroon (5 titles)** & 🇬🇭 **Ghana (4 titles)**: Historic African giants.
- 🇸🇳 **Senegal (2022)**: Sadio Mané scored the winning penalty to beat Egypt (and Mohamed Salah) in the final, delivering Senegal's first-ever AFCON title.
- 🇨🇮 **Ivory Coast (2024)**: Hosted and won the tournament on home soil in a stunning turnaround after firing their coach mid-tournament and nearly getting eliminated in the group stage.

### 🌟 African Football Icons:
- 🇱🇷 **George Weah**: The only African player to ever win the Ballon d'Or (1995) with AC Milan, later became President of Liberia.
- 🇨🇮 **Didier Drogba**: Chelsea legend, scored the equalizer and the winning penalty in the 2012 Champions League final shootout vs Bayern Munich. Used his global platform to help broker peace during the Ivorian Civil War.
- 🇨🇲 **Samuel Eto'o**: Won 3 Champions League titles with 3 different clubs (Barcelona x2, Inter Milan) — a treble-treble that mirrors Ronaldo/Zidane's Real Madrid feats.
- 🇪🇬 **Mohamed Salah**: Liverpool's Egyptian King, one of the greatest Premier League forwards ever, adored equally in Merseyside and Cairo.
- 🇸🇳 **Sadio Mané**: Won the Champions League with Liverpool in 2019 and later the AFCON with Senegal in 2022, completing a legendary career double.`,
    };
  }

  // 37. FIFA CLUB WORLD CUP
  if (/(fifa club world cup|club world cup|intercontinental cup|toyota cup|2025 club world cup)/i.test(lower)) {
    return {
      matched: true,
      title: 'FIFA Club World Cup: Crowning the World\'s Best Club',
      topic: 'club_world_cup',
      confidence: 0.97,
      response: `The **FIFA Club World Cup** pits the champions of every continental confederation (UEFA, CONMEBOL, CONCACAF, AFC, CAF, OFC) against each other to crown a true "world champion" club.

### 🏆 History & Evolution:
- Originally the **Intercontinental Cup / Toyota Cup** (1960–2004), a one-off match between the European Cup and Copa Libertadores winners — dominated fiercely by South American clubs in the 60s-80s (Peñarol, Santos, Independiente, Boca Juniors).
- Rebranded as the **FIFA Club World Cup** in 2005 with all confederations included, though European clubs (Real Madrid with a record 5 titles, Barcelona, Bayern) have dominated the modern era almost every year.
- **2025 Expanded 32-Team Format**: FIFA dramatically expanded the tournament into a full month-long, 32-club World Cup-style competition held in the United States, giving it far greater global weight and prize money than ever before — a preview of the infrastructure being tested for the 2026 World Cup.`,
    };
  }

  // 38. DOMESTIC CUP COMPETITIONS (FA CUP, COPA DEL REY, DFB-POKAL, COPPA ITALIA)
  if (/(fa cup history|copa del rey history|dfb-pokal history|coppa italia history|oldest football competition|fa cup final)/i.test(lower)) {
    return {
      matched: true,
      title: 'The Great European Domestic Cup Competitions',
      topic: 'domestic_cups',
      confidence: 0.97,
      response: `Every major football nation has a historic knockout cup competition running parallel to the league season, often producing the game's biggest underdog stories.

### 🏆 The FA Cup (England, est. 1871 — the oldest football competition on Earth):
- Famous for shock giant-killings where lower-league minnows occasionally topple Premier League royalty. Manchester United holds the record with 13 titles, followed by Arsenal with 14 (the current record-holder).
- The magic of the FA Cup Final at Wembley remains one of English football's most cherished traditions.

### 🇪🇸 Copa del Rey (Spain, est. 1903):
- Barcelona hold the record with 31+ titles. Historic finals are played at a neutral venue, often producing iconic moments like Cristiano Ronaldo's petulant celebration in front of the Barcelona bench in 2014.

### 🇩🇪 DFB-Pokal (Germany, est. 1935):
- Known for a completely open first-round bracket where tiny 5th and 6th-division amateur clubs can draw Bayern Munich and occasionally cause massive upsets on live television.

### 🇮🇹 Coppa Italia (Italy, est. 1922):
- Juventus hold the all-time record with 15+ titles, and it's historically used by top clubs to fine-tune their Serie A/UCL squad rotations.`,
    };
  }

  // 39. MIDFIELD MAESTROS (XAVI, INIESTA, BUSQUETS, PIRLO, DE BRUYNE)
  if (/(xavi hernandez|andres iniesta|sergio busquets|andrea pirlo|kevin de bruyne|midfield maestro)/i.test(lower)) {
    return {
      matched: true,
      title: 'Midfield Maestros: The Architects of Tempo & Control',
      topic: 'midfielders',
      confidence: 0.98,
      response: `While strikers grab headlines, these midfielders are the true engines that made their teams historically great.

- 🇪🇸 **Xavi Hernández**: The metronome of Guardiola's Barcelona. Completed more passes than any player in history during his prime, once completing **900+ passes in a single Champions League match** with a 95%+ accuracy rate. Won 8 La Liga titles and 4 Champions Leagues.
- 🇪🇸 **Andrés Iniesta**: Scored the **winning goal in the 2010 World Cup final** (116') for Spain and is widely regarded as one of the greatest dribblers under pressure ever, capable of escaping impossible tight spaces (*"La Croqueta"*).
- 🇪🇸 **Sergio Busquets**: The invisible genius. A defensive midfielder who almost never makes a visible "highlight" play, but whose positional intelligence and half-turn body shape made Barcelona's entire tiki-taka system function for over a decade.
- 🇮🇹 **Andrea Pirlo**: The "L'Architetto" (The Architect) with an impossibly elegant deep-lying playmaker role, famous for his cheeky Panenka penalties (including one vs England in Euro 2012) and orchestrating Milan's 2007 Champions League title and Juventus' Serie A dominance.
- 🇧🇪 **Kevin De Bruyne**: Widely considered the greatest passer and chance-creator of the modern Premier League era, the engine of Pep Guardiola's Manchester City dynasty (4 Premier Leagues, 1 Champions League in 2023), renowned for whipped inch-perfect crosses and long-range screamers.`,
    };
  }

  // 40. PREMIER LEAGUE LEGENDS: GERRARD, LAMPARD, BECKHAM, SHEARER, ROONEY
  if (/(steven gerrard|frank lampard|david beckham|alan shearer|wayne rooney|ryan giggs|paul scholes|premier league goat)/i.test(lower)) {
    return {
      matched: true,
      title: 'Premier League Icons: Gerrard, Lampard, Beckham & More',
      topic: 'premier_league_legends',
      confidence: 0.98,
      response: `The Premier League has its own pantheon of legends who never needed a Ballon d'Or to become immortal in England.

- 🔴 **Steven Gerrard**: Liverpool's talismanic captain, the driving force behind the 2005 Miracle of Istanbul, capable of single-handedly dragging a team from the ashes with thunderous long-range strikes and box-to-box dominance ("Gerrard-esque" performances).
- 🔵 **Frank Lampard**: Chelsea's all-time record goalscorer (211 goals) despite playing as a box-to-box midfielder, renowned for perfectly timed late runs into the box. Won 3 Premier Leagues and the 2012 Champions League.
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **David Beckham**: The most famous footballer on the planet in the early 2000s — pinpoint dead-ball delivery, that iconic last-minute free-kick vs Greece to send England to the 2002 World Cup, and a genuine global marketing phenomenon at Man Utd, Real Madrid, LA Galaxy, and PSG.
- ⚫⚪ **Alan Shearer**: The Premier League's all-time top scorer (260 goals), a ruthless, powerful, aerially dominant striker for Blackburn Rovers (title winner 1995) and Newcastle United.
- 🔴 **Wayne Rooney**: Manchester United's all-time record scorer (253 goals), a generational teenage talent who burst onto the scene at 16 with Everton before becoming England's all-time top scorer for years.
- 🔴 **Ryan Giggs & Paul Scholes**: Two "Class of '92" one-club legends — Giggs (13 Premier League titles, the most decorated player in English top-flight history) and Scholes (Zidane himself called Scholes the toughest midfielder he ever faced).`,
    };
  }

  // 41. STRIKERS HALL OF FAME (IBRAHIMOVIĆ, VAN NISTELROOY, VAN BASTEN, MÜLLER)
  if (/(zlatan ibrahimovic|ruud van nistelrooy|marco van basten|gerd muller|greatest striker of all time|poacher striker)/i.test(lower)) {
    return {
      matched: true,
      title: 'Strikers Hall of Fame: The Ultimate Goal Machines',
      topic: 'strikers',
      confidence: 0.98,
      response: `A pantheon of pure, clinical, and at times outrageously arrogant goal-scoring machines:

- 🇸🇪 **Zlatan Ibrahimović**: A walking highlight reel with unmatched self-confidence ("Lions don't compare themselves to humans"). His overhead bicycle kick from 30+ yards vs England in 2012 is considered one of the greatest goals ever scored. Won league titles in 4 different countries (Netherlands, Italy, Spain, France).
- 🇳🇱 **Ruud van Nistelrooy**: A pure, clinical fox-in-the-box poacher for Manchester United, scoring in **8 consecutive Premier League games** at one stretch and terrorizing defenses with his timing in the box.
- 🇳🇱 **Marco van Basten**: 3x Ballon d'Or winner, scored one of the greatest volleys in football history in the **1988 European Championship final** (an audacious sidefoot volley from an almost impossible angle vs USSR).
- 🇩🇪 **Gerd Müller ("Der Bomber")**: Held the Bundesliga single-season scoring record (40 goals) for nearly 50 years until Lewandowski broke it in 2021. Scored the winning goal in the **1974 World Cup final** for West Germany and remains one of the most ruthlessly efficient six-yard-box finishers ever.`,
    };
  }

  // 42. MANAGERIAL GENIUSES PART 2 (SIMEONE, CONTE, BIELSA, MICHELS)
  if (/(diego simeone|antonio conte|marcelo bielsa|rinus michels|vicente del bosque|luis enrique)/i.test(lower)) {
    return {
      matched: true,
      title: 'Managerial Geniuses: Simeone, Conte, Bielsa & The Total Football Pioneers',
      topic: 'managers_part2',
      confidence: 0.97,
      response: `More tactical trailblazers who reshaped how the game is coached:

- 🇦🇷 **Diego Simeone**: Built Atlético Madrid into a perennial Champions League contender through sheer will, defensive organization, and *Cholismo* — proof that tactical identity and mentality can consistently overcome financial gaps against Real Madrid and Barcelona.
- 🇮🇹 **Antonio Conte**: Won titles at Juventus (launching their 9-in-a-row dynasty), Chelsea (2017 Premier League with a switch to a back-3 mid-season), and Inter Milan (ending Juventus's Serie A dominance in 2021), known for his intensity and rigid tactical discipline.
- 🇦🇷 **Marcelo Bielsa ("El Loco")**: The spiritual godfather of Gegenpressing, hugely influential on Pep Guardiola and Mauricio Pochettino. Promoted Leeds United back to the Premier League in 2020 with his trademark relentless man-marking, high-octane pressing system.
- 🇳🇱 **Rinus Michels**: Invented and coached Total Football at Ajax and the Netherlands in the 1970s, later winning Euro 1988 with Van Basten's Netherlands — voted "Coach of the Century" by FIFA in 1999.
- 🇪🇸 **Vicente del Bosque**: Led Spain to an unprecedented **Euro 2008 → World Cup 2010 → Euro 2012 treble** of consecutive major international tournament wins, the only nation in history to achieve this.`,
    };
  }

  // 43. WORLD CUP FINALS HISTORY (1990, 2002, 2010, 2018)
  if (/(1990 world cup final|2002 world cup final|2010 world cup final|2018 world cup final|west germany vs argentina 1990|brazil vs germany 2002|spain vs netherlands 2010|france vs croatia 2018)/i.test(lower)) {
    return {
      matched: true,
      title: 'Legendary World Cup Finals: 1990, 2002, 2010 & 2018',
      topic: 'world_cup_finals',
      confidence: 0.98,
      response: `A rundown of more iconic modern World Cup Finals beyond 2022 and 2014:

### 🇩🇪 1990: West Germany 1 - 0 Argentina (Rome)
- A bitter, foul-riddled rematch of the 1986 final. Argentina had two players sent off, and West Germany won on a controversial late Andreas Brehme penalty — Franz Beckenbauer became the first man to win the World Cup as both captain (1974) and manager (1990).

### 🇧🇷 2002: Brazil 2 - 0 Germany (Yokohama)
- Ronaldo Nazário's redemption arc after his mysterious 1998 final collapse — scored both goals to win the Golden Boot (8 goals) and cement Brazil's record 5th World Cup title.

### 🇪🇸 2010: Spain 1 - 0 Netherlands (Johannesburg)
- A famously ill-tempered, foul-heavy final (Nigel de Jong's chest-high karate kick on Xabi Alonso somehow avoided a red card) decided by Andrés Iniesta's iconic 116th-minute extra-time winner, sealing Spain's first-ever World Cup and completing their tiki-taka golden generation.

### 🇫🇷 2018: France 4 - 2 Croatia (Moscow)
- An action-packed final featuring an own goal, a Griezmann penalty (awarded after the tournament's first-ever VAR review in a final), and a young Kylian Mbappé becoming only the second teenager ever (after Pelé) to score in a World Cup final.`,
    };
  }

  // 44. UEFA EUROPEAN CHAMPIONSHIP (EURO) HISTORY
  if (/(euro history|european championship history|italy euro 2020|euro 2020 winner|denmark euro 1992|greece euro 2004)/i.test(lower)) {
    return {
      matched: true,
      title: 'UEFA European Championship: History\'s Biggest Shocks & Dynasties',
      topic: 'euro_history',
      confidence: 0.98,
      response: `The UEFA European Championship (Euros) has produced some of international football's most stunning underdog stories.

### 🏆 All-Time Winners:
- 🇩🇪 **Germany & 🇪🇸 Spain (3 titles each)**: The most successful nations in Euro history.
- 🇫🇷 **France (2 titles)**, 🇮🇹 **Italy (2 titles)**.

### 🇩🇰 Denmark 1992: The Greatest Underdog Story in Euro History
- Denmark didn't even qualify for the tournament — they were called up as a **late replacement for war-torn Yugoslavia just 10 days before the tournament started**, players literally coming back from vacation, and somehow went on to beat reigning World Champions Germany 2-0 in the final.

### 🇬🇷 Greece 2004: The Ultimate Miracle
- 150-1 outsiders under German coach Otto Rehhagel, playing ultra-disciplined defensive football, beat co-favorites Portugal **twice** (in the opening match AND the final) to win their only major trophy ever — still considered the biggest upset in the history of international football.

### 🇮🇹 Italy Euro 2020 (Played in 2021):
- Won on penalties against England at Wembley in the final, Gianluigi Donnarumma saving the decisive spot-kick, capping a stunning Roberto Mancini-led revival after Italy failed to even qualify for the 2018 World Cup.`,
    };
  }

  // 45. WOMEN'S FOOTBALL & THE WOMEN'S WORLD CUP
  if (/(women's football|womens world cup|women's world cup|uswnt|megan rapinoe|alex morgan|marta brazil|women's champions league|ballon d'or feminin|lionesses)/i.test(lower)) {
    return {
      matched: true,
      title: 'Women\'s Football: The USWNT Dynasty & Global Growth',
      topic: 'womens_football',
      confidence: 0.97,
      response: `Women's football has exploded in global popularity, professionalism, and quality over the last two decades.

### 🇺🇸 The USWNT Dynasty (4 World Cups):
- The United States Women's National Team is the most dominant program in the sport's history, winning the **Women's World Cup in 1991, 1999, 2015, and 2019**.
- The 1999 team (led by Mia Hamm and Brandi Chastain's iconic shirt-off penalty celebration) sparked a cultural explosion for the sport in America.
- **Megan Rapinoe & Alex Morgan** were the faces of the dominant 2019 back-to-back winning squad, and were vocal leaders in the fight for equal pay that led to a landmark 2022 USSF equal pay agreement.

### 🇧🇷 Marta (The Queen of Football):
- Won a record **6 FIFA World Player of the Year / Best FIFA Women's Player awards**, the all-time leading scorer (male or female) in World Cup history with 17 goals across 6 tournaments for Brazil, despite never winning the trophy itself.

### 🏴󠁧󠁢󠁥󠁮󠁧󠁿 The Lionesses (England) — Euro 2022 Champions:
- Won England's first major trophy (men's or women's) since 1966, beating Germany 2-1 in extra time at a sold-out Wembley in front of 87,192 fans — the largest attendance in Euros history (men's or women's).

### 🏆 Growth of the Women's Champions League & NWSL/WSL:
- Lyon's dominance (8 Women's Champions League titles) mirrors Barcelona's current era (with Alexia Putellas and Aitana Bonmatí both winning Ballon d'Or Féminin back-to-back), while England's WSL and the USA's NWSL have become the two most-watched domestic women's leagues on Earth.`,
    };
  }

  // 46. WORLD CUP ALL-TIME RECORDS (SCORERS, APPEARANCES, HAT-TRICKS, BIGGEST WINS)
  if (/(world cup records|world cup top scorer|world cup most appearances|world cup hat-tricks|world cup biggest win|most world cup goals|world cup attendance record)/i.test(lower)) {
    return {
      matched: true,
      title: 'FIFA World Cup: All-Time Records & Statistical Milestones',
      topic: 'world_cup_records',
      confidence: 0.98,
      response: `The World Cup's 90+ year history is packed with statistical landmarks that separate the merely great from the immortal.

### ⚽ All-Time Top Scorers (Across All Tournaments):
1. 🇩🇪 **Miroslav Klose — 16 goals** (2002, 2006, 2010, 2014) — the current record, set with clinical consistency across four consecutive tournaments rather than one explosive run.
2. 🇧🇷 **Ronaldo Nazário — 15 goals** (1998, 2002, 2006) — held the record before Klose broke it in 2014.
3. 🇩🇪 **Gerd Müller — 14 goals** (1970, 1974).
4. 🇦🇷 **Lionel Messi — 13 goals + a record 8 assists** (2006, 2014, 2018, 2022) — the only man with a genuine claim to both scoring and playmaking supremacy.
5. 🇫🇷 **Just Fontaine — 13 goals in a SINGLE tournament** (1958, France) — still the all-time single-tournament scoring record almost 70 years later, and he only played in that one World Cup.
6. 🇫🇷 **Kylian Mbappé — 12 goals in just 2 tournaments** (2018, 2022), including a World Cup final hat-trick in 2022 (only the second ever, after Geoff Hurst in 1966).

### 🧢 Most Appearances & Tournaments Played:
- 🇩🇪 **Lothar Matthäus** played a record **25 World Cup matches** across 5 tournaments (1982–1998).
- 🇲🇽 **Antonio Carbajal** and 🇲🇽 **Rafael Márquez** are among the few players to appear in **5 different World Cups**.
- 🇦🇷 **Lionel Messi** became the first player to appear in **5 World Cups AND win a Golden Ball more than once** (2014 runner-up, 2022 winner).

### 🎩 Hat-Trick Club Highlights:
- 🇫🇷 **Just Fontaine** scored 4 goals in a single match (vs West Germany, 1958) — still a World Cup single-match record shared with a handful of others.
- 🇫🇷 **Kylian Mbappé (2022 final)** and 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Geoff Hurst (1966 final)** are the only two players in history to score a hat-trick in a World Cup **final**.

### 🏟️ Biggest Wins & Attendance:
- **Biggest win in World Cup history**: Hungary 10-1 El Salvador (1982).
- **Highest-attendance World Cup match**: The 1950 final (Uruguay 2-1 Brazil) at the Maracanã, unofficially estimated at nearly **200,000 spectators** — the largest crowd to ever watch a football match, a record that will never be broken under modern stadium safety regulations.`,
    };
  }

  // 47. WORLD CUP GOLDEN BOOT, GOLDEN BALL & INDIVIDUAL AWARDS HISTORY
  if (/(world cup golden boot|world cup golden ball|world cup golden glove|world cup best young player|world cup player awards)/i.test(lower)) {
    return {
      matched: true,
      title: 'World Cup Individual Awards: Golden Boot, Golden Ball & Golden Glove',
      topic: 'world_cup_awards',
      confidence: 0.98,
      response: `Beyond the trophy itself, FIFA hands out individual honors at every tournament recognizing the standout performers.

### 👟 Golden Boot (Top Scorer) — Recent Winners:
- **2022**: Kylian Mbappé (France) — 8 goals, including a final hat-trick, yet his team still lost on penalties.
- **2018**: Harry Kane (England) — 6 goals.
- **2014**: James Rodríguez (Colombia) — 6 goals, including the tournament's most spectacular goal (a chest-controlled volley vs Uruguay).
- **2010**: Thomas Müller (Germany) — 5 goals, launching his career at just 20 years old.
- **2006**: Miroslav Klose (Germany) — 5 goals.

### ⚽ Golden Ball (Best Overall Player) — Recent Winners:
- **2022**: Lionel Messi (Argentina) — his second Golden Ball (also runner-up in 2014), cementing the 2022 title as the missing piece of his legacy.
- **2018**: Luka Modrić (Croatia) — reward for dragging tiny Croatia to the final, breaking the Messi-Ronaldo decade-long Ballon d'Or duopoly that same year.
- **2014**: Lionel Messi (Argentina) — controversially awarded despite Argentina losing the final, with many pundits feeling Germany's Müller or Kroos deserved it more.
- **2010**: Diego Forlán (Uruguay) — Uruguay's surprise semi-finalist run, Forlán finished as joint-top scorer too.

### 🧤 Golden Glove (Best Goalkeeper):
- **2022**: Emiliano "Dibu" Martínez (Argentina) — his shootout save and 123rd-minute reflex stop on Kolo Muani were instrumental in Argentina's title.
- **2018**: Thibaut Courtois (Belgium).
- **2014**: Manuel Neuer (Germany) — for his revolutionary sweeper-keeper role throughout Germany's title run.

### 🌟 Best Young Player:
- **2022**: Enzo Fernández (Argentina).
- **2018**: Kylian Mbappé (France) — at just 19, already a World Cup winner and household name.`,
    };
  }

  // 48. WORLD CUP FORMAT EVOLUTION & 2026 EXPANSION
  if (/(world cup format|how many teams in the world cup|world cup 2026|2026 world cup|world cup expansion|48 team world cup|world cup qualification)/i.test(lower)) {
    return {
      matched: true,
      title: 'World Cup Format Evolution: From 13 Teams to 48',
      topic: 'world_cup_format',
      confidence: 0.97,
      response: `The World Cup's structure has dramatically expanded over its 90+ year history to accommodate football's explosive global growth.

### 📈 Team Count Evolution:
- **1930 (Uruguay)**: Just **13 teams**, all invited (no qualification existed yet) — many European nations skipped it entirely due to the long, expensive boat journey to South America.
- **1934–1978**: Fluctuated between **13 and 16 teams**.
- **1982 (Spain) – 1994 (USA)**: Expanded to **24 teams**.
- **1998 (France) – 2022 (Qatar)**: Expanded to **32 teams** — 8 groups of 4, top 2 advance to a 16-team knockout bracket. This format lasted an entire generation and is what most modern fans grew up watching.
- **2026 (USA/Canada/Mexico)**: A massive jump to **48 teams** — the largest expansion in tournament history, using 12 groups of 4 with an extra knockout round (Round of 32) added before the traditional Round of 16. The first men's World Cup ever hosted by **three nations simultaneously**.

### 🌍 2026: A New Era:
- Will span **16 host cities** across the United States, Canada, and Mexico.
- Mexico becomes the **first country to host 3 men's World Cups** (1970, 1986, 2026).
- The expanded 48-team format guarantees far more nations (particularly from Africa, Asia, and CONCACAF) a shot at World Cup football, though critics worry it dilutes group-stage quality with more mismatched fixtures.

### 🔮 Looking Further Ahead — 2030:
- The 2030 World Cup will be jointly hosted by **Spain, Portugal, and Morocco**, with a unique twist: Uruguay, Argentina, and Paraguay will each host a single centenary celebration match, marking exactly 100 years since the first-ever World Cup was held in Uruguay in 1930.`,
    };
  }

  // 49. WORLD CUP BIGGEST SHOCKS & UPSETS
  if (/(world cup upsets|world cup shocks|world cup biggest upset|usa beats england 1950|north korea 1966 world cup|cameroon 1990 world cup|senegal beat france 2002|south korea 2002 world cup|saudi arabia beat argentina 2022)/i.test(lower)) {
    return {
      matched: true,
      title: 'The Biggest Shocks & Upsets in World Cup History',
      topic: 'world_cup_upsets',
      confidence: 0.98,
      response: `The World Cup has produced some of the most seismic underdog shocks in the history of organized sport.

### 🇺🇸 1950: The Miracle on Grass (USA 1-0 England)
- A team of part-time American amateurs (including a dishwasher and a hearse driver) beat England — inventors of the sport and pre-tournament favorites — in Belo Horizonte. English newspapers initially thought the scoreline was a typo for 10-1 or 10-0.

### 🇰🇵 1966: North Korea 1-0 Italy
- North Korea, playing in their first-ever World Cup, eliminated two-time champions Italy at Ayresome Park in Middlesbrough, sending the Italian team home to be pelted with rotten tomatoes by furious fans.

### 🇨🇲 1990: Cameroon 1-0 Argentina (Opening Match)
- Reigning champions Argentina (with Maradona) were stunned by Cameroon in the tournament opener despite Cameroon finishing the match with 9 men. Cameroon went on to reach the quarter-finals, the best-ever finish by an African nation at that point.

### 🇸🇳 2002: Senegal 1-0 France (Opening Match)
- Defending champions France, unchanged from their 1998 winning squad plus Euro 2000 glory, were stunned by Senegal (playing in their first-ever World Cup) in the tournament opener. France went on to be eliminated in the group stage without scoring a single goal.

### 🇰🇷 2002: South Korea's Run to the Semi-Finals
- Co-hosts South Korea, ranked 40th in the world, beat Portugal, Italy, and Spain (both knockout wins on penalties/golden goal) to reach the semi-finals — still the best-ever finish by an Asian nation.

### 🇸🇦 2022: Saudi Arabia 2-1 Argentina
- Eventual champions Argentina lost their opening match to Saudi Arabia (ranked 51st in the world) despite Messi opening the scoring — one of the biggest ranking-gap upsets in World Cup history, and a national holiday was declared in Saudi Arabia.`,
    };
  }

  // 50. WORLD CUP ICONIC GOALS & UNFORGETTABLE MOMENTS
  if (/(world cup iconic goals|greatest world cup goal|hand of god|goal of the century|carlos alberto 1970 goal|roberto baggio penalty miss|zidane headbutt|luis suarez handball|james rodriguez goal)/i.test(lower)) {
    return {
      matched: true,
      title: 'World Cup Immortal Moments: Goals, Miracles & Villains',
      topic: 'world_cup_moments',
      confidence: 0.98,
      response: `The single moments that define World Cup folklore forever:

### ⚽ 1970: Carlos Alberto's Goal (Brazil vs Italy Final)
- The culmination of a mesmerizing team move involving nearly every outfield Brazilian player, finished by captain Carlos Alberto's thunderous first-time strike. Regularly voted **the greatest team goal in football history**.

### 🖐️ 1986: The Hand of God & The Goal of the Century (Maradona vs England, 4 Minutes Apart)
- **51'**: Maradona punched the ball into the net with his fist, later claiming it was scored "a little with the head of Maradona, and a little with the hand of God."
- **55'**: Four minutes later, Maradona picked up the ball in his own half and dribbled past **5 English players** (Beardsley, Reid, Butcher, Fenwick, and Shilton) before slotting home — voted the greatest solo goal in World Cup history.

### 💔 1994: Roberto Baggio's Penalty Miss
- Italy's talisman, carrying the team almost single-handedly to the final, skied the decisive penalty over the bar in the shootout against Brazil — one of the most heartbreaking individual moments in World Cup final history.

### 🤕 2006: Zinedine Zidane's Headbutt (His Final Match)
- In his literal final match before retirement, Zidane headbutted Marco Materazzi in the chest during extra time of the final and was sent off, unable to take part in the penalty shootout France ultimately lost to Italy.

### ✋ 2010: Luis Suárez's Handball (Uruguay vs Ghana, Quarter-Final)
- With the last kick of extra time, Suárez deliberately punched a certain goal off the line, was sent off, but Ghana missed the resulting penalty (Asamoah Gyan hit the crossbar) and Uruguay won the shootout — one of the most controversial "professional foul" moments ever, celebrated wildly by Suárez.

### 🎯 2014: James Rodríguez's Chest-and-Volley (Colombia vs Uruguay)
- A perfectly controlled chest touch followed by an instant, dipping left-footed volley into the top corner — widely regarded as the single best individual goal of the 2014 tournament.`,
    };
  }

  // 51. WORLD CUP HOST CONTROVERSIES & CULTURAL FLASHPOINTS
  if (/(world cup controversies|qatar world cup controversy|2022 world cup controversy|south africa 2010 vuvuzela|world cup human rights|world cup migrant workers|winter world cup)/i.test(lower)) {
    return {
      matched: true,
      title: 'World Cup Host Controversies & Cultural Flashpoints',
      topic: 'world_cup_controversies',
      confidence: 0.97,
      response: `Hosting the World Cup has repeatedly thrust host nations into intense global political and cultural scrutiny.

### 🇿🇦 2010 South Africa: The First African World Cup
- A historic milestone — the first World Cup ever hosted on African soil. Remembered globally for the deafening, controversial drone of **vuvuzela horns** that dominated broadcast audio throughout the tournament, dividing fans between "part of the authentic experience" and "unbearable background noise."

### 🇧🇷 2014 Brazil: Protests & National Trauma
- Massive public protests erupted before the tournament over the billions spent on stadiums while public services suffered. The home nation's catastrophic 7-1 semi-final loss to Germany (the Mineirazo) became a genuine national trauma, discussed in Brazil with the same gravity as a historical tragedy.

### 🇷🇺 2018 Russia: Geopolitical Tension
- Hosted amid heavy international scrutiny over Russia's geopolitical conduct, though the tournament itself ran smoothly and was widely praised for its organization and atmosphere.

### 🇶🇦 2022 Qatar: The Most Controversial World Cup Ever
- **First Middle Eastern host nation**, and the first World Cup ever moved to **November-December** instead of the traditional June-July, due to Qatar's extreme summer heat.
- Faced sustained international criticism over the treatment and deaths of **migrant construction workers** who built the stadiums, and over Qatar's laws regarding LGBTQ+ rights, sparking "OneLove" armband protests from several European captains (which FIFA threatened to sanction).
- Despite the controversy, the tournament produced arguably the greatest final in World Cup history (Argentina's 2022 triumph over France).

### 🇺🇸🇨🇦🇲🇽 2026: The Commercial Mega-Tournament
- The 48-team, 3-nation format is partly driven by maximizing commercial revenue and stadium capacity (many NFL stadiums being repurposed), representing the World Cup's evolution into an even larger global commercial spectacle.`,
    };
  }

  // 52. 1966, 1978, 1994 & OTHER WORLD CUP FINALS NOT YET COVERED
  if (/(1966 world cup final|england 1966 world cup|1978 world cup final|argentina 1978 world cup|1994 world cup final|usa 1994 world cup|brazil vs italy 1994)/i.test(lower)) {
    return {
      matched: true,
      title: 'More Legendary World Cup Finals: 1966, 1978 & 1994',
      topic: 'world_cup_finals_extra',
      confidence: 0.97,
      response: `Rounding out the legendary World Cup finals not covered elsewhere:

### 🏴󠁧󠁢󠁥󠁮󠁧󠁿 1966: England 4 - 2 West Germany (Wembley, extra time)
- England's only World Cup title, won on home soil. **Geoff Hurst** scored a hat-trick in the final (still the only hat-trick in a World Cup final until Mbappé matched it in 2022), including the famously disputed "did-it-cross-the-line" goal in extra time that Soviet linesman Tofiq Bahramov controversially awarded.

### 🇦🇷 1978: Argentina 3 - 1 Netherlands (Buenos Aires, extra time)
- Argentina's first World Cup title, won at home under a controversial military dictatorship, with Mario Kempes scoring twice. The Netherlands, in their second consecutive final loss (after 1974), remain the best team never to win a World Cup.

### 🇧🇷 1994: Brazil 0 - 0 Italy (Pasadena, decided on penalties)
- The only World Cup final ever to be scoreless after extra time, decided entirely on penalties. Brazil won 3-2 in the shootout after **Roberto Baggio** — Italy's best player all tournament — skied the decisive penalty over the bar, sealing Brazil's record 4th World Cup title.`,
    };
  }

  return null;
}

