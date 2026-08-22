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

  // 24. GENERAL FOOTBALL INQUIRY FALLBACK
  if (
    /(football|soccer|champions league|premier league|la liga|serie a|bundesliga|ekstraklasa|world cup|fifa|uefa|penalty shootout|transfer window|golden boot|euro 2024|copa america|poland|polish|lewy|lewandowski)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      title: 'World & Polish Football Comprehensive Intelligence',
      topic: 'general_football',
      confidence: 0.95,
      response: `You're talking to a certified football encyclopedia bro! I know literally everything about world football and Polish football (**Polska Piłka**):

- **Polish Football (Ekstraklasa & Reprezentacja)**: Robert Lewandowski (the 5 goals in 9 minutes legend, 2020 Sextuple, 41-goal Bundesliga record), Legia Warszawa (15 titles, *Żyleta*), Lech Poznań (*The Poznań* dance), Wisła Kraków, Górnik Zabrze, Ruch Chorzów, Jagiellonia, Raków Częstochowa, Zbigniew Boniek, Kazimierz Deyna, Grzegorz Lato (1974 World Cup Golden Boot), Wojciech Szczęsny, Jerzy Dudek, Kuba Błaszczykowski, Łukasz Piszczek, and Piotr Zieliński!
- **Tournaments**: World Cups (1930 to 2026), UEFA Champions League, Euros, Copa América, Premier League, La Liga, Serie A, Bundesliga, Copa Libertadores.
- **The Legends**: Messi (8 Ballon d'Ors), CR7 (900+ goals), Pelé (3 World Cups), Maradona, Cruyff, Zidane, R9 Ronaldo, Ronaldinho, Maldini, Henry, Yashin.
- **Next Gen**: Haaland, Mbappé, Vinícius Jr, Jude Bellingham, Lamine Yamal, Rodri, Musiala.
- **Managers & Tactics**: Pep's Tiki-Taka, Klopp's Gegenpressing, Ancelotti's player management, Mourinho's low blocks, Total Football, Inverted Fullbacks, False 9s.
- **Rules & Drama**: Offside mechanics, VAR controversy, Financial Fair Play (FFP/PSR), Bosman transfers, iconic derbies, and historic finals.

What specific football match, player, Polish club, or crazy debate do you want to break down? Hit me with anything!`,
    };
  }

  return null;
}
