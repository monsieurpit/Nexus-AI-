import { KnowledgeItem } from '../../types';

/**
 * HISTORY_CONCEPTS_GAPS_2 — batch 219 corrections.
 * Misses: "colony vs dominion" answered about the deck-building game,
 * "Ottoman Empire vs Turkish Republic" said the empire ended in 1453 (that was
 * its conquest of Constantinople), "Industrial Revolution first vs second" put
 * electricity in the first, "king vs emperor" answered only in Roman terms,
 * plus blanks (Bronze Age/Iron Age, nomad/settler) and web dumps (Roman
 * Republic/Empire, American/French Revolutions, fascism/Nazism, genocide/
 * ethnic cleansing, serf/slave, East/West Roman Empire).
 */
export const HISTORY_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-hist2-colony-vs-dominion',
    title: 'Colony vs dominion (British Empire)',
    category: 'history',
    keywords: [
      'difference between a colony and a dominion', 'colony vs dominion', 'British Empire',
      'self-governing', 'Canada Australia New Zealand', 'Statute of Westminster', 'Crown colony',
      'responsible government', 'not the deck-building card game', 'commonwealth',
    ],
    content: `In the history of the British Empire (this is not about Dominion the card game):

A colony was a territory directly controlled and administered by Britain, with real power held by a British-appointed governor and, ultimately, the government in London. Colonies had limited or no self-rule; laws could be made or vetoed from Britain, and the colony was run for the empire's economic and strategic interests. "Crown colonies" were the most tightly controlled.

A dominion was a self-governing nation within the empire. Starting with Canada in 1867, then Australia (1901), New Zealand, South Africa, Newfoundland and the Irish Free State, these territories were granted "responsible government": their own elected parliament and prime minister running domestic affairs, with the British monarch as head of state represented by a governor-general who acted on local advice. The 1931 Statute of Westminster made the dominions legally equal to Britain and fully independent in law, while remaining linked through the Crown and the Commonwealth.

So the progression for a settler territory was typically colony -> self-governing colony -> dominion -> fully independent Commonwealth realm or republic. The word "dominion" faded after the 1940s-50s in favour of "Commonwealth realm" and simply "independent country".`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-ottoman-vs-turkish-republic',
    title: 'Ottoman Empire vs Republic of Turkey',
    category: 'history',
    keywords: [
      'difference between the Ottoman Empire and the Turkish Republic', 'Ottoman vs Turkey',
      'founded c.1299', 'conquest of Constantinople 1453', 'collapse after World War I', 'abolition of the sultanate 1922',
      'republic proclaimed 1923', 'Mustafa Kemal Ataturk', 'Ankara', 'secular nation-state',
    ],
    content: `The Ottoman Empire was a multi-ethnic, multi-religious Islamic empire ruled by a sultan (also claiming the title of caliph from 1517). It was founded around 1299 by Osman I in Anatolia. In 1453 it CONQUERED Constantinople from the Byzantines — that was the start of its golden age, not its end — and at its height it ruled the Balkans, Anatolia, the Middle East and North Africa. It declined over the 18th-19th centuries ("the sick man of Europe"), sided with the Central Powers in World War I, and was defeated and partitioned. Turkish nationalists under Mustafa Kemal fought the Turkish War of Independence; the sultanate was abolished in 1922, ending the empire after more than 600 years.

The Republic of Turkey was proclaimed on 29 October 1923, with Mustafa Kemal (later "Ataturk", "father of the Turks") as first president. It is a nation-state, not an empire: its territory is essentially Anatolia and eastern Thrace, its capital moved from Istanbul to Ankara, the caliphate was abolished in 1924, and Ataturk imposed sweeping secular, Western-facing reforms — a secular constitution, the Latin alphabet, legal codes based on European models, and the separation of religion and state.

So the empire and the republic are the same land and people but a complete rupture in system: sultan-caliph and a sprawling multinational empire, versus an elected president and a secular Turkish nation-state.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-industrial-revolution-1-vs-2',
    title: 'First vs Second Industrial Revolution',
    category: 'history',
    keywords: [
      'difference between the Industrial Revolution first and second', 'first vs second industrial revolution',
      'steam power textiles iron coal', 'electricity steel chemicals oil', 'c.1760 to 1840', 'c.1870 to 1914',
      'Britain', 'assembly line mass production', 'internal combustion engine', 'not electricity in the first',
    ],
    content: `The First Industrial Revolution ran roughly from 1760 to 1840, starting in Britain. Its key technologies were the steam engine (Watt), mechanised textile production (spinning jenny, power loom), coke-fired iron smelting, coal as the dominant fuel, canals and then early railways. It shifted work from home and farm to factories and from muscle and water power to steam. It did NOT involve electricity.

The Second Industrial Revolution ran roughly from 1870 to 1914, centred in Germany and the United States as well as Britain. Its key advances were cheap mass-produced steel (Bessemer process), the electrical industry (generators, motors, lighting, the grid — Edison, Tesla, Westinghouse), the internal combustion engine and petroleum, the chemical industry (synthetic dyes, fertilisers, explosives), the telephone and telegraph networks, and new production methods — interchangeable parts and the moving assembly line (Ford, from 1913). It brought large corporations, mass consumer goods and rapid urbanisation.

Short version: First = steam, coal, iron, textiles, railways (late 1700s to ~1840); Second = electricity, steel, oil, chemicals, the assembly line (~1870 to 1914).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-king-vs-emperor',
    title: 'King vs emperor (and kingdom vs empire)',
    category: 'history',
    keywords: [
      'difference between a king and an emperor', 'king vs emperor', 'kingdom vs empire',
      'rules one realm or people', 'rules many peoples and territories', 'higher rank', 'imperator',
      'suzerainty over lesser kings', 'not just a Roman distinction', 'crowned by the Pope',
    ],
    content: `A king (or queen) is the hereditary sovereign ruler of a single kingdom — typically one country, nation or people with a shared identity (the King of France, the King of Spain).

An emperor (empress) ranks above a king and rules an empire — a large state made up of multiple nations, kingdoms, territories or peoples brought together under one supreme authority, usually by conquest. An emperor is, in effect, "a king of kings": lesser kings and princes may rule pieces of the empire while owing allegiance to the emperor. The title carries a claim to universal or supreme authority (from the Roman "imperator"). Examples: the Roman emperors, the Holy Roman Emperor, the emperors of China, Napoleon (crowned Emperor of the French to outrank the kings of Europe), the German Kaiser, Queen Victoria as Empress of India.

Kingdom vs empire follows the same logic: a kingdom is one realm; an empire is a collection of territories and peoples under a single dominant centre, held together by military and administrative power rather than shared nationhood. An empire can be ruled by someone who does not use the title "emperor" (the British Empire was headed by a king or queen), and the boundary is partly about the scale and diversity of what is ruled, partly about the claimed rank of the title.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-roman-republic-vs-empire',
    title: 'Roman Republic vs Roman Empire',
    category: 'history',
    keywords: [
      'difference between the Roman Republic and the Roman Empire', 'republic vs empire Rome',
      '509 BC to 27 BC', '27 BC onward', 'consuls and Senate', 'Augustus first emperor',
      'elected magistrates', 'one-man rule', 'SPQR', 'fall of the republic',
    ],
    content: `Both are phases of ancient Roman history, divided at 27 BC.

The Roman Republic (509-27 BC) began when the Romans overthrew their last king. Power was deliberately split so no one person could dominate: two consuls elected for one year jointly headed the state and army; other elected magistrates (praetors, quaestors, aediles, and the censors) ran specific functions; the Senate, a body of ex-magistrates, guided policy and finance with great informal authority; and citizen assemblies voted on laws, war, and elections. It expanded from a city to control the whole Mediterranean, but in the last century BC civil wars between generals (Marius, Sulla, Pompey, Caesar) broke the system.

The Roman Empire began in 27 BC when the Senate gave Octavian, Julius Caesar's heir, the name Augustus and effective supreme power. He kept the outward forms of the Republic — Senate, consuls, the title "first citizen" (princeps) — but held permanent control of the army, the provinces and the treasury. Real power now passed by inheritance or force to one man, the emperor. The Empire reached its greatest extent around 117 AD; the Western half fell in 476 AD, while the Eastern (Byzantine) half continued until 1453.

Short version: Republic = elected officials, Senate and assemblies, no single ruler (509-27 BC); Empire = rule by an emperor with a facade of republican institutions (27 BC onward).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-american-vs-french-revolution',
    title: 'American Revolution vs French Revolution',
    category: 'history',
    keywords: [
      'difference between the American and French Revolutions', 'American Revolution vs French Revolution',
      '1775 to 1783', '1789 to 1799', 'war of independence from Britain', 'overthrow of the monarchy and social order',
      'relatively conservative', 'radical and violent', 'Reign of Terror', 'Napoleon',
    ],
    content: `Both were late-18th-century revolutions inspired by Enlightenment ideas (liberty, natural rights, popular sovereignty), and the American example helped inspire the French one, but they differed sharply in aim, scope and outcome.

The American Revolution (1775-1783) was primarily a war of independence: thirteen British colonies broke away from Britain to govern themselves. It changed who ruled (a republic instead of a distant king and Parliament) but largely preserved the existing social structure — property, class, and, notably, slavery continued. It produced a written Constitution (1787) with checks and balances, and it was comparatively stable and non-violent internally after the war.

The French Revolution (1789-1799) was a revolution against a society, not a foreign ruler. The French overthrew their own absolute monarchy, abolished feudal privileges, the nobility and the established church's power, executed the king and queen, and tried to rebuild the entire social and political order around "liberty, equality, fraternity". It was far more radical and violent — the Reign of Terror (1793-94) killed tens of thousands — swung through several governments, fought wars with most of Europe, and ended with Napoleon seizing power and crowning himself emperor.

Short version: America threw off an outside ruler and kept its social order; France tore up its own social and political order from the inside, at enormous cost.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-fascism-vs-nazism',
    title: 'Fascism vs Nazism',
    category: 'history',
    keywords: [
      'difference between fascism and Nazism', 'fascism vs nazism', 'Mussolini Italy', 'Hitler Germany',
      'National Socialism', 'ultranationalism and one-party state', 'biological racism and antisemitism',
      'the state versus the race', 'Nazism is a form of fascism', 'Lebensraum',
    ],
    content: `Nazism (National Socialism) is generally treated as a specific, extreme variant of fascism, so the two share a core and differ in emphasis.

Shared fascist core (Italy under Mussolini from 1922, and others): ultranationalism; a one-party dictatorship under a cult-of-personality leader; rejection of liberal democracy, socialism and communism; glorification of the nation, violence, war and militarism; suppression of trade unions and opposition; corporatist control of the economy; and a myth of national rebirth after decline and humiliation. Italian Fascism centred on the STATE as the supreme entity ("everything within the state, nothing outside the state") and, while authoritarian and imperialist, was not originally built on racial theory (Italy adopted antisemitic laws only in 1938, under German influence).

Nazism adds, and makes central, a pseudo-scientific biological racism: the belief in a hierarchy of races with an "Aryan" master race, virulent antisemitism as the organising obsession, the drive for "Lebensraum" (living space) through conquest in the east, eugenics, and ultimately genocide (the Holocaust). For the Nazis the supreme entity was the RACE (the Volk), not the state; the state was just a tool to serve it.

Short version: all Nazism is fascism, but not all fascism is Nazism. Fascism is the broader family (nationalist, anti-democratic, militarist dictatorship); Nazism is the German form defined by racial ideology and exterminationist antisemitism.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-genocide-vs-ethnic-cleansing',
    title: 'Genocide vs ethnic cleansing',
    category: 'history',
    keywords: [
      'difference between genocide and ethnic cleansing', 'genocide vs ethnic cleansing',
      'intent to destroy a group', 'forced removal to make an area homogeneous', 'Genocide Convention',
      'deportation and expulsion', 'legal term', 'overlap', 'Bosnia Rwanda Holocaust',
    ],
    content: `Genocide is defined in international law (the 1948 Genocide Convention) as acts committed with the INTENT TO DESTROY, in whole or in part, a national, ethnical, racial or religious group as such. The listed acts include killing members of the group, causing serious bodily or mental harm, deliberately inflicting conditions of life calculated to bring about physical destruction, preventing births, and forcibly transferring children. The defining element is the specific intent to eliminate the group's existence.

Ethnic cleansing is the systematic forced removal of an ethnic, racial or religious group from a territory to make that area ethnically homogeneous. It is achieved by deportation, expulsion, population transfer, and by terror tactics — massacres, mass rape, destroying homes and cultural sites, blocking return — designed to make people flee and never come back. The goal is removal from the land, not necessarily the destruction of the group everywhere.

The two overlap heavily and often occur together: a campaign of ethnic cleansing can involve enough killing with enough intent to also be genocide (Srebrenica, 1995, was ruled genocide within the wider ethnic-cleansing campaign of the Bosnian War). "Ethnic cleansing" is not itself a distinct crime in international law but is prosecuted as crimes against humanity, war crimes, and where the intent is proven, genocide.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-serf-vs-slave',
    title: 'Serf vs slave',
    category: 'history',
    keywords: [
      'difference between a serf and a slave', 'serf vs slave', 'bound to the land', 'owned as property',
      'feudalism manorialism', 'chattel slavery', 'rights and obligations', 'could not be sold apart from the land',
      'serfdom in medieval Europe and Russia', 'transatlantic slavery',
    ],
    content: `A slave is legally a piece of property — a "chattel" — owned by another person. A slave can be bought, sold, inherited, and separated from family at the owner's will, has no legal personhood, no right to property, marriage or their own labour, and typically no path out of the condition (which is usually inherited). Transatlantic chattel slavery of Africans in the Americas (roughly 1500s-1800s) is the starkest example.

A serf was a peasant bound to a lord's manor under medieval European feudalism/manorialism (and in Russia until 1861). A serf was tied to the LAND, not owned as a person: if the estate was sold, the serfs went with it, but they could not normally be sold away from the land on their own. Serfs owed the lord labour (working his fields a set number of days), a share of their crops, and various dues and fees, and needed permission to marry outside the manor or leave. In return they had customary rights — to farm strips of land for their own family, to protection, to the use of common woods and pasture — that were recognised, if often abused. Serfdom was hereditary and hard to escape, but a serf was a legal person with a household and a place in the village.

Short version: a slave is owned as property and can be sold anywhere; a serf is bound to a specific estate, owes labour and dues, but keeps a household, customary rights and legal personhood.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-bronze-vs-iron-age',
    title: 'Bronze Age vs Iron Age',
    category: 'history',
    keywords: [
      'difference between the Bronze Age and the Iron Age', 'bronze age vs iron age', 'three-age system',
      'copper and tin alloy', 'ironworking and steel', 'trade networks for tin', 'iron ore is common',
      'Bronze Age collapse', 'roughly 3300 to 1200 BC', 'from about 1200 BC',
    ],
    content: `These are consecutive periods in the "three-age system" (Stone, Bronze, Iron), named for the main material used for tools and weapons. The dates vary a lot by region.

The Bronze Age (roughly 3300-1200 BC in the Near East and Mediterranean) is defined by the use of bronze — an alloy of copper and tin. Because tin is rare and found in few places, making bronze required long-distance trade, which fostered organised states, palace economies, writing (cuneiform, Linear B), and the great civilisations of Mesopotamia, Egypt, the Minoans, Mycenaeans and Hittites. Around 1200 BC many of these collapsed together (the "Bronze Age collapse").

The Iron Age (from about 1200 BC in the Near East, later elsewhere — Britain from around 800 BC) began when smiths learned to smelt and work iron, and then to make early steel by adding carbon. Iron ore is far more common and widespread than tin, so once the harder smelting technology spread, iron tools and weapons became cheaper and available to ordinary farmers and soldiers, not just elites. Iron is also harder and holds an edge better than bronze. This period covers the rise of Assyria, Greece's Archaic and Classical eras, the Roman Republic, and Iron Age Celtic Europe, up to the point each region enters recorded history.

Short version: Bronze Age = copper-tin alloy, rare tin, trade-dependent palace states; Iron Age = ironworking and steel, common ore, cheaper and more widespread metal tools.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-nomad-vs-settler',
    title: 'Nomad vs settler (settled society)',
    category: 'history',
    keywords: [
      'difference between a nomad and a settler', 'nomadic vs sedentary', 'pastoralism', 'moving with herds',
      'permanent settlement and farming', 'no fixed dwelling', 'agriculture and cities', 'hunter-gatherer',
      'transhumance', 'Mongols Bedouin versus farming civilisations',
    ],
    content: `A nomadic people has no single permanent home and moves regularly, taking their dwellings (tents, yurts) with them. The main types are pastoral nomads, who move herds of animals (sheep, goats, cattle, camels, horses) between seasonal pastures — Mongols, Bedouin, the Maasai, Central Asian steppe peoples — and hunter-gatherers, who move to follow game and wild food. Nomads own portable wealth (herds, textiles), have flexible kin-based political structures, and are often highly mobile and militarily formidable (the Mongol conquests).

A settled (sedentary) people lives in permanent settlements — villages, towns, cities — in one place year-round, and is usually based on agriculture: growing crops in fixed fields and keeping animals in one area. Settled life allows food surpluses to be stored, which supports specialists (priests, soldiers, craftsmen, administrators), monumental building, writing, formal law, and states. Most of what is usually called "civilisation" arose from sedentary farming societies.

The two have interacted throughout history — trading (animals and craft goods for grain and manufactured items), raiding, and conquering each other. "Transhumance" is a middle case: a mostly settled community whose herders move livestock seasonally between valley and mountain pasture.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hist2-east-vs-west-roman-empire',
    title: 'Eastern vs Western Roman Empire',
    category: 'history',
    keywords: [
      'difference between the East and West Roman Empire', 'eastern vs western roman empire',
      'Diocletian division', 'permanent split 395 AD', 'Rome and Ravenna versus Constantinople',
      'Latin versus Greek', 'West fell 476 AD', 'East became Byzantine and lasted to 1453', 'wealthier east',
    ],
    content: `Diocletian first split the administration of the huge Roman Empire into eastern and western halves around 285 AD for manageability, and the division became permanent in 395 AD when Emperor Theodosius I left the two halves to his two sons.

The Western Roman Empire covered Italy, Gaul, Hispania, Britain and North Africa, with its capital moved from Rome to Milan and then Ravenna. It was poorer, less urbanised, harder to defend along the Rhine and Danube, and it fragmented under pressure from Germanic peoples (Goths, Vandals, Franks). The line of Western emperors ended in 476 AD when the general Odoacer deposed the last one, Romulus Augustulus.

The Eastern Roman Empire covered the Balkans, Anatolia, the Levant and Egypt, with its capital at Constantinople (founded 330 AD). It was richer, more heavily urbanised, easier to defend (Constantinople's walls, a shorter land frontier), and culturally Greek-speaking rather than Latin. It survived the fall of the West by nearly a thousand years, is called the Byzantine Empire by modern historians (its people always called themselves Romans), and finally fell when the Ottomans took Constantinople in 1453.

Short version: same empire, split for administration; the Latin, less wealthy West fell in 476, the Greek-speaking, wealthier East (Byzantium) lasted until 1453.`,
    createdAt: Date.now(),
  },
];
