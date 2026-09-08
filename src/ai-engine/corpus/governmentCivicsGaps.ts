import { KnowledgeItem } from '../../types';

// Batch 82 (government & civics — batch 15 covered law & government basics).
// nexus-4b misses: "difference between a right and a privilege" and "difference
// between a citizen and a resident" both answered about Roman citizenship;
// "difference between civil law and common law" conflated the civil-vs-criminal
// distinction with the civil-law-vs-common-law legal traditions; "difference
// between the House and the Senate" gave only the Senate's numbers; "impeachment"
// claimed Nixon was impeached (he resigned first); "PR versus first past the
// post" and "what is lobbying" were raw web dumps.
export const GOVERNMENT_CIVICS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-civil-law-vs-common-law',
    title: 'Civil Law versus Common Law (Legal Systems)',
    category: 'Government',
    keywords: [
      'what is the difference between civil law and common law', 'civil law tradition codes vs common law precedent', 'stare decisis common law',
      'napoleonic code civil law countries', 'is quebec civil law or common law', 'judge-made law common law',
    ],
    content: `"Civil law" has two unrelated meanings, and the model often confuses them. (1) Civil law versus CRIMINAL law: civil law covers disputes between private parties (contracts, negligence, property, family, defamation) where one side sues the other for a remedy; criminal law covers offences against society, prosecuted by the state, which can result in punishment. (2) Civil law versus COMMON law as whole legal systems or traditions. Civil-law systems (France, Germany, most of continental Europe, Latin America, Japan, and the Canadian province of Quebec for private matters) are built on comprehensive written codes — descended from Roman law and the Napoleonic Code — which judges apply to the facts; past decisions guide but do not formally bind. Common-law systems (England, the US, Canada outside Quebec, Australia, India) build much of the law through the accumulation of judicial decisions, where courts are bound by precedent ("stare decisis"), with statutes layered on top. Common-law trials are more adversarial with a strong role for juries; civil-law proceedings are more inquisitorial, led by the judge.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-right-vs-privilege',
    title: 'The Difference Between a Right and a Privilege',
    category: 'Government',
    keywords: [
      'what is the difference between a right and a privilege', 'is driving a right or a privilege', 'rights cannot be revoked without due process',
      'privilege granted by authority conditional', 'is healthcare a right or a privilege', 'natural rights vs legal privileges',
    ],
    content: `A right is something a person is entitled to that the government must respect and cannot take away arbitrarily — only through due process, and generally it applies to everyone equally within the relevant group. Examples: freedom of speech and religion, a fair trial, protection from unreasonable search, and (for citizens) the right to vote. In rights-based political theory these exist independent of government permission; legally, labelling something a "right" raises the bar the state must clear to restrict it. A privilege is a benefit granted by an authority under conditions: it is not owed to everyone, it can be limited, suspended or revoked for cause, and it depends on meeting requirements. Examples: a driver's licence, a professional or liquor licence, parole, security clearance, club membership, diplomatic immunity. The boundary is politically contested — debates over whether healthcare, housing, or higher education are rights or privileges are really arguments about what the state is obligated to guarantee.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-citizen-vs-resident',
    title: 'The Difference Between a Citizen and a Resident',
    category: 'Government',
    keywords: [
      'what is the difference between a citizen and a resident', 'permanent resident vs citizen rights', 'green card vs citizenship',
      'can permanent residents vote', 'jus soli jus sanguinis naturalization', 'can a resident be deported',
    ],
    content: `A citizen is a full legal member of a country. Citizenship brings the complete set of rights and obligations: the right to vote and run for office, an unconditional right to enter and live in the country, a passport and consular protection abroad, access to all public jobs and benefits, and duties such as jury service and (in some countries) military service. It is acquired by birth — in the territory ("jus soli") or from citizen parents ("jus sanguinis") — or by naturalisation after meeting residency, language and civics requirements. A resident is someone who lawfully lives in a country without being a citizen: on a temporary visa, a work or study permit, or as a "permanent resident" (a green-card holder in the US, "PR" status in Canada). Residents can usually work, use most public services, and must pay taxes, but they generally cannot vote in national elections, can be denied entry or deported for serious crimes, can lose status by spending too long abroad, and may face limits on certain jobs. Permanent residents can typically apply for citizenship after a set number of years.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-house-vs-senate',
    title: 'The Difference Between the House and the Senate (US Congress)',
    category: 'Government',
    keywords: [
      'what is the difference between the house and the senate', 'house 435 members two year terms population', 'senate 100 members six year terms two per state',
      'house originates revenue bills impeachment', 'senate confirms appointments ratifies treaties', 'great compromise 1787 bicameral',
    ],
    content: `The US Congress has two chambers, and a bill must pass both in identical form to become law. The HOUSE OF REPRESENTATIVES has 435 voting members, distributed among the states by population and reapportioned every ten years after the census, so big states have far more representatives than small ones. Members serve 2-year terms (the whole House is up every election). The House starts all revenue (tax) bills and votes the articles of impeachment. The SENATE has 100 members — exactly two per state regardless of population, so Wyoming and California have equal weight. Senators serve staggered 6-year terms, with about a third up each election. The Senate confirms presidential appointments (federal judges, the cabinet, ambassadors), ratifies treaties by a two-thirds vote, and holds the trial when the House impeaches. This split — representation by population in one chamber, equal state representation in the other — was the "Great Compromise" that let the 1787 Constitutional Convention agree on a bicameral legislature.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-impeachment-detail',
    title: 'What Impeachment Is (and Which Presidents Were Impeached)',
    category: 'Government',
    keywords: [
      'what is impeachment', 'house impeaches senate convicts two thirds', 'high crimes and misdemeanors', 'was nixon impeached',
      'andrew johnson clinton trump impeached', 'impeachment is not removal', 'can a judge be impeached',
    ],
    content: `Impeachment is the constitutional process for charging a sitting federal official — the president, vice president, judges, cabinet members — with "treason, bribery, or other high crimes and misdemeanors." It has two stages. The House of Representatives investigates and votes on articles of impeachment; a simple majority "impeaches" the official, which is like an indictment, not removal. The Senate then holds a trial (the Chief Justice presides for a presidential trial), and a two-thirds vote is required to convict and remove the person from office, after which the Senate may also bar them from future office. Three presidents have been impeached by the House: Andrew Johnson (1868), Bill Clinton (1998), and Donald Trump (twice, in 2019 and 2021) — all were acquitted by the Senate, so none was removed. Richard Nixon was NOT impeached: the House Judiciary Committee approved articles over Watergate in 1974, but he resigned before the full House voted. Several federal judges have been impeached and removed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pr-vs-fptp',
    title: 'Proportional Representation versus First Past the Post',
    category: 'Government',
    keywords: [
      'what is proportional representation versus first past the post', 'fptp single member district plurality', 'party list pr seats vote share',
      'wasted votes fptp small parties', 'mixed member proportional germany new zealand', 'single transferable vote stv',
    ],
    content: `These are two families of electoral system for choosing a legislature. FIRST PAST THE POST (FPTP): the country is divided into single-member districts (ridings, constituencies); in each, the candidate with the most votes wins the seat, even without a majority. It is simple, gives every area one local representative, and usually manufactures a clear single-party majority government — but a party's seat share can diverge sharply from its vote share, small and geographically spread-out parties win almost nothing, and votes for anyone but the winner elect no one. Used in the UK, the US, Canada, and India. PROPORTIONAL REPRESENTATION (PR): seats are allocated to parties roughly in proportion to their national or regional vote share, via party lists or the single transferable vote in multi-member districts. It wastes far fewer votes and represents minority views, but normally produces coalition governments and can weaken the tie between a voter and one local member. Used across most of continental Europe. Mixed systems (Germany, New Zealand, Scotland) combine local FPTP seats with proportional "top-up" seats.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-lobbying',
    title: 'What Lobbying Is',
    category: 'Government',
    keywords: [
      'what is lobbying', 'influencing legislators regulators policy', 'lobbyist registration disclosure', 'revolving door lobbying',
      'is lobbying legal', 'corporate vs public interest lobbying', 'lobbying vs bribery',
    ],
    content: `Lobbying is the organised effort to influence the decisions of government — legislators, regulators, and sometimes their staff or the executive — on behalf of a specific interest. That interest can be a corporation, an industry trade association, a labour union, a professional body, a charity or advocacy group, a religious organisation, a local government, or a foreign state. Lobbyists supply officials with data and analysis, draft model legislation and amendments, arrange meetings and testimony, and mobilise constituents and media ("grassroots lobbying"). In the US and the EU, lobbyists must register and periodically disclose their clients, the issues they work on, and their spending. Lobbying is legal and is defended as a legitimate way for affected groups to be heard and to inform lawmakers on technical subjects. Critics point out that wealthy interests can afford vastly more of it than the public can, that the "revolving door" cycles people between government posts and lobbying firms, and that campaign contributions often travel alongside lobbying — making the line with influence-buying hard to police.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-republic-vs-democracy',
    title: 'The Difference Between a Republic and a Democracy',
    category: 'Government',
    keywords: [
      'what is the difference between a republic and a democracy', 'direct vs representative democracy', 'is the us a republic or a democracy',
      'republic no hereditary monarch', 'can a democracy have a king', 'democratic republic constitutional monarchy',
    ],
    content: `The two terms answer different questions and are not opposites. DEMOCRACY describes where power comes from: from the people, exercised through voting. It can be DIRECT (citizens vote on the laws themselves — ancient Athens, Swiss referendums, town meetings) or REPRESENTATIVE (citizens elect officials who legislate for them — nearly all modern democracies). REPUBLIC describes the form of the state: there is no hereditary monarch as head of state; the head of state is elected or appointed (usually a president), and government is treated as a public matter ("res publica"), not the ruler's property. So most countries today are both — a "democratic republic" like the US, France, or Germany. But the categories can come apart: a state can be a republic while being barely democratic (one-party states that hold sham elections), and a genuine democracy can keep a ceremonial monarch — the UK, Sweden, Japan, Canada and Spain are democratic constitutional monarchies, not republics. The US civics slogan "it's a republic, not a democracy" is really a claim that the system is representative rather than direct, plus has counter-majoritarian features (the Senate, the courts, the Bill of Rights).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-referendum-civics',
    title: 'What a Referendum Is',
    category: 'Government',
    keywords: [
      'what is a referendum', 'direct vote of the electorate on one question', 'mandatory vs advisory referendum', 'brexit referendum 2016',
      'swiss referendums popular initiative', 'double majority referendum', 'criticism of referendums',
    ],
    content: `A referendum is a direct vote by the eligible electorate on a single defined question — a proposed law, a constitutional amendment, or a major decision such as joining or leaving an international organisation. Types: MANDATORY referendums are required by the constitution for certain changes (amending the constitutions of Australia, Ireland, or Switzerland). OPTIONAL or ADVISORY referendums are called by a government or parliament, or triggered by a citizens' petition (Switzerland's frequent popular votes and citizens' initiatives; the 2016 UK vote on EU membership, which was legally advisory but treated as binding). The threshold varies: a simple majority, a supermajority, or a "double majority" — of voters nationwide and of the constituent states or regions (Switzerland, Australia). Supporters see referendums as democracy in its purest form and a check on an out-of-touch political class. Critics argue they compress complex, multi-part issues into a single yes/no, are vulnerable to money, slogans and misinformation, can entrench a narrow majority's will over a large minority, and bypass the negotiation and amendment that representative legislatures provide.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-coalition-government',
    title: 'What a Coalition Government Is',
    category: 'Government',
    keywords: [
      'what is a coalition government', 'no single party majority parties govern together', 'coalition agreement cabinet posts junior partner',
      'minority government confidence and supply', 'coalitions in proportional representation countries', 'why are coalitions unstable',
    ],
    content: `A coalition government forms when no single party wins a majority of the seats in the legislature, so two or more parties agree to govern together. They combine their seats to command a majority, negotiate a joint programme for government, and share out the cabinet ministries — the largest party's leader usually becomes prime minister, with junior partners taking a proportionate number of posts. Coalitions are the normal way of governing in countries with proportional representation (Germany, the Netherlands, the Nordic countries, Ireland, Israel, Italy) and much rarer under first-past-the-post (the UK 2010–2015 Conservative–Liberal Democrat coalition was unusual). The alternatives when no party has a majority are a MINORITY GOVERNMENT (the largest party governs alone and must build a majority vote by vote) or a CONFIDENCE-AND-SUPPLY deal (a smaller party agrees only to support the government on budget and no-confidence votes, without joining the cabinet). Coalitions give more parties a share of power but can be slow to form, prone to internal disputes, and collapse if a partner withdraws, forcing a reshuffle or an early election.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-de-jure-de-facto',
    title: 'The Difference Between De Jure and De Facto',
    category: 'Government',
    keywords: [
      'what is the difference between de jure and de facto', 'de jure by law de facto in fact', 'de facto leader without the title',
      'de jure vs de facto segregation', 'de facto standard vs de jure standard', 'de facto independence no recognition',
    ],
    content: `"De jure" is Latin for "by law" — it describes what is officially, formally, legally the case. "De facto" means "in fact" or "in practice" — it describes what actually happens or exists on the ground, regardless of official status. The two often diverge. A DE FACTO leader holds real power without the formal office (a general who runs a country while a figurehead president signs papers; a party boss who is not the head of government). DE JURE segregation is separation mandated by law (the US "Jim Crow" laws); DE FACTO segregation results from housing patterns, economics and private choices without any law requiring it. A DE JURE standard is set by an official standards body; a DE FACTO standard is one the market has simply adopted (a file format everyone uses). A territory can have DE FACTO independence — its own government, borders and military — while lacking DE JURE recognition from other states and the UN (Taiwan, Somaliland, Kosovo in the eyes of some countries). Courts, diplomats and historians constantly distinguish the two.`,
    createdAt: Date.now(),
  },
];
