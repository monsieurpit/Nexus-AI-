import { KnowledgeItem } from '../../types';

// Batch 108 (political systems & international relations). Mostly OK
// (separation of powers, parliamentary vs presidential, UNSC, NATO,
// constitutional monarchy, left/right, PR vs FPTP, authoritarian vs
// totalitarian, nation vs state, coalition government). Real misses on
// nexus-4b: "failed state" was answered about a negligence claim failing;
// "what does it mean to recognize another country" returned a plot summary of
// No Country for Old Men; "de jure vs de facto" only covered technical
// standards; "gerrymandering" was a raw web dump.
export const POLITICS_IR_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-failed-state',
    title: 'What a Failed State Is',
    category: 'Politics',
    keywords: [
      'what is a failed state', 'failed state a government that has lost the ability to perform basic functions no effective control over its territory', 'cannot provide security public services or enforce law competing armed groups collapsed economy',
      'examples somalia 1990s libya post 2011 yemen', 'fragile states index state fragility', 'failed state is not a negligence claim',
    ],
    content: `A failed state is a country whose central government has largely lost the ability to do the basic things a state is supposed to do: maintain a monopoly on the legitimate use of force, control its borders and territory, provide security and public services, collect taxes, and enforce the law. Typical features are one or more armed groups controlling parts of the country, widespread violence, a collapsed or informal economy, mass displacement, and an inability to act as a functioning member of the international system. It sits at the extreme end of a spectrum from stable through "fragile" to "failed," tracked by measures such as the Fragile States Index. Commonly cited examples over recent decades include Somalia through the 1990s and 2000s, Libya after 2011, Yemen, and South Sudan. (This is a term in political science and international relations; it has nothing to do with a legal negligence claim "failing.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-state-recognition',
    title: 'What It Means for a Country to Recognise Another Country',
    category: 'International Relations',
    keywords: [
      'what does it mean for a country to recognize another country', 'recognition formal acknowledgment that an entity is a sovereign state or that a government legitimately represents a state', 'enables diplomatic relations treaties embassies un membership support',
      'declaratory theory statehood exists once montevideo criteria are met constitutive theory recognition makes a state', 'contested cases taiwan kosovo palestine northern cyprus', 'de jure vs de facto recognition',
    ],
    content: `Recognition is a formal act by which one state acknowledges that another entity is a sovereign state, or that a particular government is the legitimate authority of a state. It is politically significant because it opens the door to diplomatic relations, exchanging ambassadors and embassies, signing treaties, and support for the entity's membership in bodies like the UN. Two theories compete on what recognition does: the "declaratory" theory (reflected in the 1933 Montevideo Convention) says an entity is a state once it objectively has a permanent population, defined territory, a government, and the capacity to conduct foreign relations — recognition merely acknowledges this. The "constitutive" theory says an entity only becomes a state when other states recognise it. In practice both matter. Recognition can be full ("de jure") or limited ("de facto"), and it can be withdrawn. This is why some places function as states but have contested status: Taiwan (recognised by a shrinking handful of countries), Kosovo (recognised by many but not all), Palestine (recognised by a large majority of UN members but not most Western powers), and Northern Cyprus (recognised only by Turkey).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-de-jure-de-facto',
    title: 'De Jure vs De Facto',
    category: 'Politics',
    keywords: [
      'what is the difference between de jure and de facto', 'de jure by law the official legally recognised situation', 'de facto in fact how things actually are in practice regardless of legal status',
      'de facto government controls territory without legal legitimacy', 'de jure segregation mandated by law de facto segregation persists through housing patterns', 'english is the de facto but not de jure official language of the united states',
    ],
    content: `These Latin phrases contrast law with reality. "De jure" means "by law" or "by right" — the official, legally established position. "De facto" means "in fact" — the way things actually work in practice, whether or not the law says so. The two often diverge. A de facto government is one that actually controls a country's territory and population even though it took power unconstitutionally and may not be the legally recognised authority. De jure segregation (as in the US Jim Crow South) was racial separation required by statute; de facto segregation is separation that persists through residential patterns, school catchments and economics without any law demanding it. The United States has no de jure official language at the federal level, but English is its de facto official language. A country can hold a territory de facto (it governs it) without holding it de jure (no legal title or international recognition).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gerrymandering-detail',
    title: 'What Gerrymandering Is',
    category: 'Politics',
    keywords: [
      'what is gerrymandering', 'gerrymandering drawing electoral district lines to favour one party packing and cracking', 'packing concentrate opposition voters into a few districts they win by huge margins wasting their votes',
      'cracking spread the rest across many districts where they are a permanent minority', 'party wins a share of seats well above its share of votes', 'countered by independent redistricting commissions or proportional representation',
      'term coined 1812 elbridge gerry salamander shaped district',
    ],
    content: `Gerrymandering is the manipulation of electoral district boundaries so that one party or group wins more seats than its share of the vote would fairly give it. It relies on two techniques. "Packing" crams as many of the opposing party's voters as possible into a small number of districts, which that party then wins by lopsided margins — every vote above 50%+1 is "wasted." "Cracking" splits the remaining opposition voters thinly across many districts so they fall just short of a majority in each. The result is safe seats and a legislature that does not reflect how people actually voted. It is easiest where the party in power also controls the once-a-decade redistricting process. Remedies include handing redistricting to independent or bipartisan commissions, court-imposed limits on partisan maps, and using proportional representation (which has no single-member districts to distort). The word dates to 1812, when Massachusetts governor Elbridge Gerry signed off on a district shaped so contortedly that a newspaper drew it as a salamander — a "Gerry-mander."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-federal-vs-unitary',
    title: 'Federal vs Unitary State',
    category: 'Politics',
    keywords: [
      'what is the difference between a federal and a unitary state', 'unitary state one sovereign centre that may delegate power to regions but can reclaim or abolish it france japan most countries',
      'federal state sovereignty constitutionally divided between national and regional governments each supreme in its own sphere us canada germany australia india', 'federal division can only be changed by constitutional amendment not ordinary law',
      'devolution as in the uk is in between', 'confederation is looser than a federation',
    ],
    content: `The difference is where sovereignty ultimately sits. In a UNITARY state there is one sovereign authority — the national government. It may create regional or local governments and hand them powers (and often does), but it can also change those powers, or abolish those bodies, by an ordinary act of the national legislature. France, Japan, and the great majority of the world's countries are unitary. In a FEDERAL state, the constitution itself divides sovereignty between a national government and regional governments (states, provinces, Länder, cantons), each of which is supreme within its own assigned areas and cannot simply be overridden or abolished by the other. Changing that division normally requires a constitutional amendment, not just a majority in the national parliament. The United States, Canada, Germany, Australia, Switzerland, India and Brazil are federations. In between sits "devolution," as in the United Kingdom, where a legally unitary parliament has transferred substantial powers to Scotland, Wales and Northern Ireland but retains the theoretical right to take them back. A "confederation" is looser still — largely independent states cooperating through a weak central body.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-coup-vs-revolution',
    title: 'Coup vs Revolution',
    category: 'Politics',
    keywords: [
      'what is the difference between a coup and a revolution', 'coup detat a sudden usually illegal seizure of power by a small group already within the state military officials palace guard',
      'coup leaves most of society and institutions intact just swaps who is at the top', 'revolution a mass movement from below that overturns not just the rulers but the political and social order',
      'french russian revolutions vs napoleon 18 brumaire coup', 'self-coup autogolpe leader seizes extra power',
    ],
    content: `A coup d'état ("blow of state") is a sudden, usually unconstitutional seizure of power by a small group that is already part of the state apparatus — most often the military, but sometimes senior officials, a palace faction, or the presidential guard. It is fast, top-down, and typically leaves the rest of society, the economy and most institutions intact; it just changes who occupies the top offices. A revolution is a much broader upheaval driven from below by a mass movement, which overturns not only the current rulers but the entire political and often social and economic order — property relations, the class structure, the official ideology. The French Revolution and the Russian Revolution transformed their whole societies; Napoleon's 18 Brumaire (1799) seizure of power was a coup. A related term, "self-coup" (autogolpe), is when a sitting leader who came to power legally then illegally dissolves the legislature or courts to grab near-total power.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-socialism-vs-communism-neutral',
    title: 'Socialism vs Communism (Definitions)',
    category: 'Politics',
    keywords: [
      'what is the difference between socialism and communism', 'socialism social or collective ownership or strong public control of the means of production often via the state can be democratic',
      'communism marxist sense the theoretical final stage a classless stateless moneyless society with common ownership distribution to each according to need', 'communist states were one party marxist leninist regimes that considered themselves in the socialist transitional stage',
      'democratic socialism vs marxism leninism', 'nordic social democracy is regulated capitalism with a large welfare state not socialism',
    ],
    content: `Both are left-wing ideologies centred on reducing or ending private ownership of the economy's productive assets, but they differ in scope and end goal. SOCIALISM is the broad idea that the means of production (factories, land, major industries) should be owned or controlled collectively — through the state, worker cooperatives, or public bodies — rather than by private capitalists, with the aim of a more equal distribution of wealth and power. It spans a wide range, from democratic socialists who want this achieved through elections and who accept a mixed economy, to revolutionary currents. COMMUNISM, in the Marxist sense, refers to a specific hypothetical end state: a classless, stateless, moneyless society in which all property is held in common and goods are distributed "from each according to his ability, to each according to his needs." Marxists saw socialism as the transitional phase leading toward it. In practice, the 20th-century states called "communist" (the USSR, Maoist China, Cuba, North Korea) were one-party Marxist-Leninist dictatorships that described themselves as building socialism; none claimed to have reached communism. Note that the Nordic countries, often loosely called "socialist," actually run regulated market capitalism with large welfare states — "social democracy," not socialism in the ownership sense.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-judicial-review-detail',
    title: 'What Judicial Review Is',
    category: 'Politics',
    keywords: [
      'what is judicial review', 'judicial review the power of courts to examine laws and government actions and strike them down if they conflict with the constitution',
      'established in the united states by marbury v madison 1803', 'not universal some countries have a dedicated constitutional court germany france others parliamentary sovereignty uk courts cannot strike down primary legislation',
      'a core check and balance on the legislature and executive', 'constitutional court vs supreme court',
    ],
    content: `Judicial review is the power of courts to review laws passed by the legislature and actions taken by the executive, and to declare them invalid if they conflict with the constitution (or, for executive acts, with the law). It is one of the main checks that stops the elected branches from exceeding their constitutional limits. In the United States it is not written explicitly into the Constitution; the Supreme Court asserted it in Marbury v. Madison (1803) and it has been accepted ever since. Systems handle it differently: some countries route all constitutional questions to a single dedicated constitutional court (Germany's Bundesverfassungsgericht, France's Conseil constitutionnel), while ordinary supreme courts do it elsewhere. And it is not universal — under strict parliamentary sovereignty, as historically in the United Kingdom and New Zealand, courts can interpret statutes and review executive action but cannot strike down an Act of Parliament itself (UK courts can now only declare a law incompatible with human-rights obligations and leave it to Parliament to change).`,
    createdAt: Date.now(),
  },
];
