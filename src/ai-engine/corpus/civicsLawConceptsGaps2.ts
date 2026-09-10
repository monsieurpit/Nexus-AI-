import { KnowledgeItem } from '../../types';

/**
 * CIVICS_LAW_CONCEPTS_GAPS_2 — batch 211 corrections.
 * Civics / law "difference between X and Y" misses: "probation vs parole"
 * never distinguished them, "primary vs caucus" claimed caucuses have been
 * abandoned, "liberal vs conservative" dumped political-compass text without
 * answering, "governor vs mayor" and "embassy vs consulate" came back as web
 * dumps about 2026 elections and Israel's borders, and democracy/republic,
 * federal/state law, constitution/statute, treaty/executive-agreement and
 * ratify/veto were muddled or flippant.
 */
export const CIVICS_LAW_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-civ2-probation-vs-parole',
    title: 'Probation vs parole',
    category: 'law',
    keywords: [
      'difference between probation and parole', 'probation vs parole', 'instead of prison',
      'early release from prison', 'community supervision', 'sentencing', 'parole board',
      'served part of the sentence', 'suspended sentence', 'revocation',
    ],
    content: `Both are forms of supervised release into the community with conditions (regular reporting to an officer, no new offences, drug testing, curfews, travel limits), and violating either can send you to prison. The difference is WHEN in the process they happen.

Probation is imposed by the judge at sentencing, INSTEAD OF (or in addition to a short) incarceration. The offender never goes to prison for that offence, or serves only a brief jail term, and completes the rest of the sentence under supervision in the community. It is an alternative to prison, decided by the court.

Parole is the early conditional release of someone who has ALREADY been sent to prison and served part of their sentence. A parole board (not the trial judge) decides whether to grant it, based on behaviour, risk and rehabilitation, and the person serves the remainder of the sentence under supervision outside. It is a back-end release from prison.

Short version: probation is a sentence served in the community from the start; parole is getting out of prison early to finish the sentence in the community. (Note: the US federal system abolished parole for crimes committed after 1987, replacing it with "supervised release", but most states still use parole.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-primary-vs-caucus',
    title: 'Primary vs caucus (US nominating contests)',
    category: 'civics',
    keywords: [
      'difference between a primary and a caucus', 'primary vs caucus', 'presidential nomination',
      'secret ballot', 'in-person gathering', 'delegates', 'Iowa caucus', 'New Hampshire primary',
      'party-run versus state-run', 'open and closed primary',
    ],
    content: `Both are how US political parties let voters help choose the party's presidential nominee, by awarding convention delegates. Caucuses have not been abolished — a handful of states and territories still use them — but most states have switched to primaries.

A primary is a straightforward election with a secret ballot, usually run and paid for by the state government, held over a full day with normal polling places. Voters show up, mark a ballot, and leave; delegates are allocated by the results. Primaries can be "closed" (only registered party members vote), "open" (any voter may choose which party's primary to vote in), or semi-open.

A caucus is a series of local meetings run and paid for by the party itself, held at a set time in the evening at schools, community halls and homes. Participants must attend in person for the whole event, listen to speeches, and publicly declare support — historically by physically grouping in different corners of the room, with supporters of non-viable candidates reallocating. It rewards organisation and enthusiasm, takes hours, and has much lower turnout. Iowa was long the famous first caucus; New Hampshire holds the first primary.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-liberal-vs-conservative',
    title: 'Liberal vs conservative (US politics)',
    category: 'civics',
    keywords: [
      'difference between a liberal and a conservative', 'liberal vs conservative', 'left and right',
      'progressive', 'traditionalist', 'role of government', 'social policy', 'economic policy',
      'Democratic and Republican', 'not just the political compass',
    ],
    content: `In modern US usage these are the broad left and right positions, roughly aligned with the Democratic Party (liberal/progressive) and the Republican Party (conservative).

Liberals generally favour an active federal government that regulates business, funds a strong social safety net (healthcare, education, unemployment support) and redistributes through progressive taxation; support expansive civil-rights protections and social change; take a more permissive line on abortion, LGBTQ rights, immigration and drug policy; and prioritise action on climate change. The underlying instinct is that government can and should correct social and economic inequities.

Conservatives generally favour limited federal government, lower taxes, less regulation and more reliance on free markets and private initiative; emphasise individual responsibility over government programmes; defend traditional institutions, religious values and existing social norms, and are more restrictive on abortion and immigration; support strong national defence and gun rights; and are sceptical of rapid social change and of government mandates. The underlying instinct is that established institutions and market freedom produce better outcomes than centrally directed change.

Caveats: these labels are US-specific and shift over time; "liberal" elsewhere often means free-market classical liberalism. Individuals mix positions (economically left but socially conservative, or libertarian on both), which is what the two-axis "political compass" tries to capture.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-governor-vs-mayor',
    title: 'Governor vs mayor',
    category: 'civics',
    keywords: [
      'difference between a governor and a mayor', 'governor vs mayor', 'head of a state',
      'head of a city', 'executive branch', 'state government', 'municipal government',
      'National Guard', 'city council', 'jurisdiction levels',
    ],
    content: `A governor is the elected chief executive of a US state (or of a province/region in other countries). The governor heads the state's executive branch, signs or vetoes bills passed by the state legislature, proposes the state budget, appoints heads of state agencies and often judges, commands the state National Guard, and can grant pardons for state crimes. Their authority covers the entire state — every city, county and town within it.

A mayor is the elected (or sometimes council-appointed) head of a single city or town's government. A mayor's powers vary by the city's charter: a "strong mayor" runs city departments, proposes the municipal budget and can veto city-council ordinances; a "weak mayor" mainly presides over the council and has a ceremonial role while a city manager runs operations. A mayor's authority stops at the city limits and covers local matters — police and fire departments, streets, zoning, water, sanitation, parks, local permits.

So it is a question of level: governor = state level, over many cities; mayor = one municipality. A mayor operates within the laws set by the state and, in a conflict, state law generally prevails over city ordinances.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-embassy-vs-consulate',
    title: 'Embassy vs consulate',
    category: 'civics',
    keywords: [
      'difference between an embassy and a consulate', 'embassy vs consulate', 'diplomatic mission',
      'ambassador', 'consul', 'capital city', 'visas and passports', 'consular services',
      'high commission', 'chancery',
    ],
    content: `Both are official offices a country maintains in another country, but they differ in rank, location and job.

An embassy is a country's primary diplomatic mission, and there is normally only one per host country, located in the host country's capital city. It is headed by an ambassador, the sending country's top representative, and handles the big-picture relationship: diplomacy, political and economic negotiation, treaty work, and representing the government at the highest level. (Between Commonwealth countries the equivalent is called a "high commission" and its head a "high commissioner".)

A consulate is a smaller, subordinate office, and a country can have several in a single host country, placed in major cities other than the capital (New York, Los Angeles, Chicago, etc.). It is headed by a consul and focuses on practical services: issuing visas to foreigners wanting to travel to the sending country, helping and protecting the sending country's own citizens abroad (lost passports, arrests, emergencies, births and deaths), and promoting trade and tourism. The consular section inside an embassy does this same work in the capital.

Short version: one embassy in the capital doing diplomacy under an ambassador; multiple consulates in other cities doing visas and citizen services under a consul.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-democracy-vs-republic',
    title: 'Democracy vs republic',
    category: 'civics',
    keywords: [
      'difference between a democracy and a republic', 'democracy vs republic', 'rule by the people',
      'no monarch', 'elected head of state', 'representative democracy', 'constitutional limits',
      'not mutually exclusive', 'the US is both', 'direct democracy',
    ],
    content: `The two words answer different questions, and a country can be both at once.

"Democracy" describes WHERE authority comes from: from the people, who govern themselves, either directly (voting on laws) or through elected representatives. It is about popular sovereignty and majority rule.

"Republic" describes the FORM of the state: there is no monarch, and the head of state is an elected or appointed official (a president) serving for a limited term rather than a hereditary king or queen. "Res publica" means "the public thing" — the state belongs to the citizens, not to a ruler.

So they are not opposites. The United States is a republic (no monarch, an elected president) AND a representative democracy (the people elect those who govern). The United Kingdom is a democracy but NOT a republic (it has a hereditary monarch as head of state). North Korea calls itself a republic but is not a democracy.

When Americans say "we're a republic, not a democracy", they usually mean a narrower point: the US is a representative democracy with constitutional limits on majority power (a bill of rights, courts, the separation of powers, federalism), not a pure direct democracy where a 51% majority can do anything.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-federal-vs-state-law',
    title: 'Federal law vs state law',
    category: 'law',
    keywords: [
      'difference between federal and state law', 'federal vs state law', 'Supremacy Clause',
      'enumerated powers', 'police power', 'preemption', 'concurrent jurisdiction',
      'US Constitution', 'which law applies', 'state courts and federal courts',
    ],
    content: `In the US, federal and state governments each make law in their own spheres, and both apply to people at the same time.

Federal law is made by Congress (and federal agencies) under the specific powers the Constitution grants the national government — interstate and foreign commerce, immigration, currency, national defence, patents and copyright, federal taxes, civil rights. It applies uniformly across all 50 states.

State law is made by each state's legislature under its general "police power" to regulate health, safety, welfare and morals. It covers most of everyday life: criminal law (most crimes are state crimes), contracts, property, family law, torts, traffic, business licensing, education. State laws differ from one state to the next.

When they conflict, the Supremacy Clause of the Constitution makes valid federal law win, and the state law is "preempted" and unenforceable — but only where the federal government actually had the power to act. Many areas are concurrent: you must obey both (federal and state tax, federal and state drug law). This is why marijuana can be legal under a state's law while still illegal under federal law. Most cases are heard in state courts; federal courts handle federal questions, disputes between citizens of different states, and cases against the United States.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-constitution-vs-statute',
    title: 'Constitution vs statute',
    category: 'law',
    keywords: [
      'difference between a constitution and a statute', 'constitution vs statute', 'supreme law',
      'ordinary legislation', 'harder to amend', 'judicial review', 'unconstitutional',
      'framework of government', 'Act of Congress', 'hierarchy of law',
    ],
    content: `A constitution is a country's (or state's) highest law. It sets up the structure of government — the branches, their powers, how officials are chosen — and guarantees fundamental rights. It sits above everything else in the legal hierarchy: any statute, regulation or executive act that conflicts with it is void ("unconstitutional"), and courts can strike such laws down (judicial review). A constitution is deliberately hard to change: the US Constitution requires two-thirds of both houses of Congress plus ratification by three-quarters of the states.

A statute is an ordinary law passed by a legislature (an Act of Congress, a state statute) through the normal process: introduced as a bill, passed by majority vote in each chamber, signed by the executive. Statutes fill in the details of governing within the limits the constitution sets. They are far easier to change — a later ordinary majority can amend or repeal them — and they must yield to the constitution whenever the two conflict.

Note: the US has a single written constitution (1787, plus 27 amendments). The UK has an "unwritten" constitution — no single document; its constitutional rules are spread across ordinary statutes, court decisions and conventions — which is the situation the muddled answer was gesturing at.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-treaty-vs-executive-agreement',
    title: 'Treaty vs executive agreement (US)',
    category: 'civics',
    keywords: [
      'difference between a treaty and an executive agreement', 'treaty vs executive agreement',
      'Senate advice and consent', 'two-thirds vote', 'sole executive agreement',
      'congressional-executive agreement', 'international law', 'supreme law of the land',
      'binding commitment', 'president foreign policy',
    ],
    content: `Both are binding international commitments the United States makes with other countries; the difference is the domestic process for making them.

A treaty, in the US constitutional sense, is negotiated by the president but cannot take effect until the Senate gives "advice and consent" by a two-thirds vote (67 of 100). Once ratified it becomes part of "the supreme law of the land". Examples: the NATO treaty, arms-control treaties, extradition treaties.

An executive agreement is an international agreement the president concludes WITHOUT a two-thirds Senate vote. Two main kinds:
- Congressional-executive agreement: authorised or approved by a simple majority of both houses (used for most trade agreements).
- Sole executive agreement: made by the president alone, under the president's own constitutional foreign-affairs powers (for example, agreements settling claims or arranging routine cooperation).

Executive agreements are far more common than treaties because they are faster and avoid the two-thirds hurdle. They are binding internationally and generally have the force of federal law domestically, but a sole executive agreement cannot override an existing statute or the Constitution, and a future president or Congress can more easily undo one.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-civ2-ratify-vs-veto',
    title: 'Ratify vs veto',
    category: 'civics',
    keywords: [
      'difference between ratify and veto', 'ratify vs veto', 'formal approval', 'formal rejection',
      'treaty ratification', 'constitutional amendment', 'presidential veto', 'pocket veto',
      'override', 'Senate two-thirds', 'states three-fourths',
    ],
    content: `These are near-opposites: ratifying is formally approving something so it takes effect; vetoing is formally rejecting something so it does not.

To ratify is to give official final consent that makes an agreement or change legally binding. In the US: the Senate ratifies a treaty by a two-thirds vote; three-quarters of the state legislatures must ratify a proposed constitutional amendment for it to become part of the Constitution. Internationally, a country ratifies a treaty when its competent authority confirms it will be bound.

To veto is for an executive to reject a bill passed by the legislature. A US president who vetoes a bill returns it to Congress with objections; the bill dies unless both houses override the veto by a two-thirds vote in each chamber. A "pocket veto" happens when the president simply does not sign a bill and Congress adjourns within the 10-day window, killing it with no possibility of override.

So a legislature (or the states) ratifies; an executive vetoes. Ratification completes something; a veto blocks it. (The Senate "ratifying" a treaty and the president "vetoing" a bill are two different stages involving two different actors.)`,
    createdAt: Date.now(),
  },
];
