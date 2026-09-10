import { KnowledgeItem } from '../../types';

/**
 * CANADA_CIVICS_CONCEPTS_GAPS — batch 227 corrections. Canadian government and
 * politics (relevant to Patrick, who lives in Quebec). Nexus kept answering
 * Canadian questions with US or UK equivalents, or with unrelated dumps
 * (Mongolia's "MPP" party, time zones for "GST/PST", FIFA for "transfer
 * payments"). Content reflects the Canadian federal / Quebec context.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem =>
  ({ id, title, category: 'civics', keywords, content, createdAt: now });

export const CANADA_CIVICS_CONCEPTS_GAPS: KnowledgeItem[] = [
  k('kb-gap-cancivics-gst-vs-pst', 'GST vs PST vs HST (Canadian sales tax)', [
    'difference between GST and PST', 'GST vs PST Canada', 'Goods and Services Tax federal 5 percent',
    'Provincial Sales Tax', 'Harmonized Sales Tax HST', 'QST Quebec sales tax', 'not time zones',
  ], `These are Canadian consumption (sales) taxes, not time zones (that is EST/PST for Eastern/Pacific time).

GST (Goods and Services Tax) is the FEDERAL value-added tax, currently 5%, charged on most goods and services across the whole country, collected by the Canada Revenue Agency.

PST (Provincial Sales Tax) is an additional tax charged by some provinces on top of the GST, at their own rate: British Columbia 7%, Saskatchewan 6%, Manitoba 7%. It is a separate retail tax administered by the province.

HST (Harmonized Sales Tax) is used by provinces that have MERGED their provincial tax with the GST into a single combined rate collected federally: Ontario 13%, and Nova Scotia, New Brunswick, Newfoundland and Labrador, Prince Edward Island at 15% (Nova Scotia dropped to 14% in 2025).

QST (Quebec Sales Tax / TVQ) is Quebec's own provincial tax at 9.975%, administered by Revenu Quebec, which also collects the GST in the province. So in Quebec you pay 5% GST + 9.975% QST (about 14.975% total).

Alberta and the three territories have NO provincial sales tax — you pay only the 5% GST.`),

  k('kb-gap-cancivics-senator-vs-mp', 'Senator vs Member of Parliament (Canada)', [
    'difference between a senator and a member of parliament Canada', 'Canadian Senate appointed',
    'House of Commons elected', 'senators serve to age 75', 'regional representation', 'sober second thought',
    'not two senators per state', 'GG appoints on PM advice',
  ], `In Canada's Parliament (not the US Congress):

A Member of Parliament (MP) is ELECTED by the voters of one riding (electoral district) to sit in the House of Commons, the lower and dominant chamber. There are 338 (rising to 343). MPs serve until the next general election (no fixed term; up to five years). The government is formed by whichever party holds the confidence of the House, and the Prime Minister and most Cabinet ministers are MPs.

A senator sits in the Senate, the upper chamber, and is NOT elected. Senators are APPOINTED by the Governor General on the advice of the Prime Minister (since 2016 through an independent advisory board), and they serve until age 75. There are 105 seats, distributed by region (Ontario 24, Quebec 24, the West 24, the Maritimes 24, plus Newfoundland and the territories) rather than by population, to give smaller regions a stronger voice. The Senate's role is "sober second thought" — reviewing, amending and occasionally delaying legislation from the Commons — but by convention it rarely blocks a bill the elected House has passed, and it cannot introduce money bills.

So: MPs are elected and hold the real power; senators are appointed for life-to-75 and act as a revising chamber.`),

  k('kb-gap-cancivics-lt-gov-vs-gg', 'Lieutenant Governor vs Governor General (Canada)', [
    'difference between a lieutenant governor and a governor general', 'the King is head of state',
    'GG represents the Crown federally', 'LG represents the Crown provincially', 'royal assent',
    'reserve powers', 'not the head of state themselves',
  ], `Canada's head of state is the KING (Charles III). He is represented by viceregal officials — NEITHER of whom is the head of state themselves; they act on the King's behalf.

The GOVERNOR GENERAL represents the Crown at the FEDERAL level. Appointed by the King on the advice of the Canadian Prime Minister (usually for about five years), the GG gives Royal Assent to federal bills, summons, prorogues and dissolves Parliament, reads the Speech from the Throne, appoints the Prime Minister and (on the PM's advice) Cabinet, senators and judges, and is Commander-in-Chief. In a crisis the GG holds "reserve powers" (e.g. deciding whether to grant a dissolution) but by convention almost always acts on the advice of the elected government.

A LIEUTENANT GOVERNOR represents the Crown in ONE PROVINCE (each of the ten provinces has one; the three territories have a "Commissioner" who represents the federal government, not the Crown). Appointed by the GG on the advice of the federal Prime Minister, the LG gives Royal Assent to provincial bills, opens and dissolves the provincial legislature, and appoints the Premier. Their role mirrors the GG's but within provincial jurisdiction.

Short version: the King is head of state; the GG is his federal stand-in; a Lieutenant Governor is his stand-in for one province.`),

  k('kb-gap-cancivics-mp-vs-mpp', 'MP vs MPP vs MLA vs MNA (Canada)', [
    'difference between an MP and an MPP', 'Member of Parliament federal', 'Member of Provincial Parliament Ontario',
    'MLA Member of the Legislative Assembly', 'MNA Member of the National Assembly Quebec', 'not the Mongolian MPP party',
    'provincial versus federal legislator',
  ], `These are all titles for an elected legislator in Canada; the difference is which legislature they sit in. (Not the Mongolian People's Party.)

MP (Member of Parliament) = a member of the FEDERAL House of Commons in Ottawa, elected from a federal riding, dealing with national matters (defence, criminal law, currency, immigration, trade, the federal budget).

MPP (Member of Provincial Parliament) = a member of the PROVINCIAL legislature, but this specific term is used only in ONTARIO (Queen's Park).

MLA (Member of the Legislative Assembly) = the equivalent term in most other provinces and territories (BC, Alberta, Saskatchewan, Manitoba, Nova Scotia, New Brunswick, PEI, and the territories).

MNA (Member of the National Assembly) / in French "depute" = the term in QUEBEC, whose legislature is the National Assembly (Assemblee nationale). Newfoundland and Labrador uses "MHA" (Member of the House of Assembly).

So an Ontario voter has both a federal MP and a provincial MPP; a Quebec voter has a federal MP (depute federal) and a provincial MNA (depute a l'Assemblee nationale). All represent one district; provincial members handle health, education, provincial highways, and provincial civil law.`),

  k('kb-gap-cancivics-bloc-vs-pq', 'Bloc Quebecois vs Parti Quebecois', [
    'difference between the Bloc Quebecois and the Parti Quebecois', 'BQ federal party Ottawa',
    'PQ provincial party Quebec National Assembly', 'both sovereigntist', 'Rene Levesque founded the PQ',
    'Lucien Bouchard founded the Bloc', 'two levels of government',
  ], `Both are Quebec sovereigntist parties, but they operate at different levels of government.

The Parti Quebecois (PQ) is a PROVINCIAL party that runs candidates for the Quebec National Assembly and seeks to form the Government of Quebec. Founded in 1968 by Rene Levesque, it governed Quebec several times (Levesque, Parizeau, Bouchard, Landry, Marois) and held the two independence referendums, in 1980 (No 60/40) and 1995 (No 50.6/49.4). Its platform combines Quebec independence with social democracy and secularism.

The Bloc Quebecois (BQ) is a FEDERAL party that runs candidates ONLY in Quebec ridings for seats in the House of Commons in Ottawa. Founded in 1991 by Lucien Bouchard and MPs who left the Progressive Conservatives and Liberals during the collapse of the Meech Lake Accord, its purpose is to defend Quebec's interests in the federal Parliament and to promote sovereignty from within Ottawa. It cannot form the federal government (it does not run outside Quebec) and was briefly the Official Opposition in 1993.

So: the PQ wants to govern Quebec and take it out of Canada; the Bloc wants to speak for Quebec inside the Canadian Parliament until that happens. A sovereigntist Quebecer might vote PQ provincially and Bloc federally.`),

  k('kb-gap-cancivics-notwithstanding-clause', 'Notwithstanding clause vs veto (Canada)', [
    'difference between the notwithstanding clause and a veto', 'Section 33 Charter of Rights',
    'legislature overrides certain Charter rights', 'five-year renewable declaration', 'Quebec Bill 21 Bill 96',
    'not a US presidential veto', 'nonobstant',
  ], `A veto is an EXECUTIVE power to REJECT a law the legislature has passed (as with a US president). Canada's system has no real legislative veto of this kind — the Governor General or a Lieutenant Governor technically could "reserve" or refuse Royal Assent, but this has not been used federally since 1878 and is considered a dead power.

The NOTWITHSTANDING CLAUSE (Section 33 of the Canadian Charter of Rights and Freedoms, "la clause nonobstant" / "la disposition de derogation") is the opposite: it lets Parliament OR a provincial legislature pass a law and declare that it operates "notwithstanding" certain Charter rights — meaning the courts cannot strike the law down for violating those rights. It only covers Section 2 (fundamental freedoms like expression and religion) and Sections 7-15 (legal and equality rights); it cannot be used against democratic rights, mobility rights, language rights or gender equality (Section 28). A declaration lasts a maximum of five years, after which it must be re-enacted or it lapses.

It was the price of getting the provinces (except Quebec) to agree to the 1982 Charter. Quebec has used it routinely, including pre-emptively on Bill 21 (secularism/religious symbols) and Bill 96 (French language), and Ontario and Saskatchewan have invoked or threatened it. So a veto BLOCKS a law; the notwithstanding clause SHIELDS a law from being blocked by the courts.`),

  k('kb-gap-cancivics-rcmp-vs-municipal', 'RCMP vs provincial vs municipal police (Canada)', [
    'difference between the RCMP and municipal police', 'Royal Canadian Mounted Police federal',
    'RCMP contract policing for provinces and cities', 'Ontario Provincial Police OPP', 'Surete du Quebec SQ',
    'Toronto Police Service', 'three levels of policing',
  ], `Canada has three levels of police, and the RCMP is unusual in that it works at all three.

The RCMP (Royal Canadian Mounted Police / "the Mounties" / la GRC) is Canada's FEDERAL police force, enforcing federal law nationwide (drug trafficking, organised crime, national security, financial crime, border integrity, protecting officials). BUT it also acts as the CONTRACT provincial police in eight provinces (all except Ontario and Quebec) and the three territories, and as the contract municipal police for many smaller cities and towns that pay for RCMP service instead of running their own force.

Provincial police: Ontario has the Ontario Provincial Police (OPP) and Quebec has the Surete du Quebec (SQ) — these two provinces do NOT use the RCMP for provincial policing. They patrol highways and police rural areas and small municipalities in their province.

Municipal police: larger cities run their own forces — Toronto Police Service, Montreal's SPVM, Vancouver, Calgary, Edmonton, Ottawa, Halifax, etc. — responsible for day-to-day policing within city limits.

So in Quebec you might deal with the SPVM (Montreal), the SQ (highways, small towns), or the RCMP (federal offences). In most of the rest of Canada, the RCMP might be your local police AND the provincial police AND the federal police.`),

  k('kb-gap-cancivics-throne-speech-vs-budget', 'Speech from the Throne vs the Budget (Canada)', [
    'difference between the throne speech and the budget', 'Speech from the Throne opens a session',
    'government legislative agenda', 'the budget is the fiscal and spending plan', 'read by the Governor General',
    'delivered by the Finance Minister', 'confidence votes',
  ], `Both are set-piece moments where the Canadian government lays out its plans, but they cover different things and are delivered by different people.

The Speech from the Throne (le discours du Trone) opens each new session of Parliament. It is written by the Prime Minister's Office but READ by the Governor General (or occasionally the monarch) in the Senate chamber, with MPs summoned to listen. It is a broad statement of the government's PRIORITIES and legislative agenda for the coming session — the themes and promises, with no numbers. A vote on the "Address in Reply" to the throne speech is a confidence vote; losing it can bring down a government.

The Budget (le budget) is delivered later, usually in the spring, by the Minister of Finance in the House of Commons. It is the government's detailed FISCAL and ECONOMIC plan: projected revenues, planned spending by area, the deficit or surplus, tax changes, and new spending measures, plus an economic outlook. The budget vote is also a confidence matter — a defeated budget triggers an election or a change of government (this brought down governments in 1979 and 2005-06).

Short version: the throne speech says what the government wants to DO (priorities, no money); the budget says how much it will TAX and SPEND (the numbers).`),

  k('kb-gap-cancivics-budget-vs-supply', 'The Budget vs supply / appropriation bills (Canada)', [
    'difference between the federal budget and a supply bill', 'budget is a policy statement',
    'the Estimates', 'appropriation act legally authorises spending', 'Main Estimates Supplementary Estimates',
    'supply days opposition days', 'Parliament controls the purse',
  ], `In Canada, the Budget itself is NOT a law and does not by itself authorise a single dollar of spending. It is a POLICY and economic statement by the Minister of Finance — projections, priorities, tax proposals, the deficit figure.

The actual legal authority to spend comes through the SUPPLY process. The government tables the "Estimates" (Main Estimates each spring, plus Supplementary Estimates during the year) — a detailed department-by-department breakdown of proposed spending. Parliament studies these in committee, and then passes APPROPRIATION ACTS (supply bills) that legally grant the government the money. A few sitting days each period are set aside as "supply days" (also called "opposition days"), where the opposition chooses the topic of debate.

Tax changes proposed in the budget are enacted through a separate "Budget Implementation Act". So the sequence is: budget (the plan) -> Estimates (the itemised request) -> appropriation act / supply bill (the law that releases the funds). This is the constitutional principle that "the Crown proposes, Parliament disposes" — the government cannot tax or spend without Parliament's approval, and a defeated supply bill is a loss of confidence.`),

  k('kb-gap-cancivics-official-opp-vs-third-party', 'Official Opposition vs a third party (Canada)', [
    'difference between the official opposition and a third party', 'second largest party in the House of Commons',
    'Leader of the Official Opposition shadow cabinet', 'extra resources and speaking time', 'party status 12 seats',
    'not FIFA third-party ownership or a battle royale',
  ], `In the House of Commons, the OFFICIAL OPPOSITION (also "Her Majesty's Loyal Opposition", now "His Majesty's") is the party with the SECOND-most seats (after the governing party). It has a special constitutional role: its leader is the "Leader of the Opposition" (with a higher salary and an official residence, Stornoway), it appoints a "shadow cabinet" of critics who scrutinise each minister, it gets the first opposition question in Question Period and the largest share of opposition speaking time and committee seats, and it is treated as the government-in-waiting.

A "third party" is any other recognised party in the House that is not the government and not the Official Opposition — for example the NDP, the Bloc Quebecois or the Greens when they are not in first or second place. To have official "party status" a party generally needs at least 12 seats, which unlocks research funding, guaranteed questions, and committee membership; below 12 seats its MPs sit as recognised members but the party gets far less. Third parties still matter enormously in a minority Parliament, where the government needs their votes to survive.

(This has nothing to do with FIFA "third-party ownership" of players, or "third-partying" in a battle-royale video game.)`),

  k('kb-gap-cancivics-liberal-vs-conservative', 'Federal Liberal Party vs Conservative Party (Canada)', [
    'difference between the federal Liberal and Conservative parties', 'Liberals centre to centre-left brokerage party',
    'Conservatives centre-right', 'NDP Bloc Green', 'natural governing party', 'Reform Canadian Alliance merger 2003',
    'not US Democrats and Republicans',
  ], `Canada's two historic governing parties (this is the Canadian, not US, spectrum):

The Liberal Party of Canada sits in the CENTRE to centre-left. Long called "the natural governing party" for holding power most of the 20th century, it is a "brokerage" party that adjusts its positions to build a broad coalition. Broadly it favours an active federal government, social programs, multiculturalism and immigration, bilingualism, and (recently) carbon pricing, while being business-friendly on trade. Leaders: Pierre Trudeau, Jean Chretien, Paul Martin, Justin Trudeau, Mark Carney.

The Conservative Party of Canada sits CENTRE-RIGHT. The current party was formed in 2003 by merging the old Progressive Conservatives with the Western-based Reform Party / Canadian Alliance. It favours lower taxes, smaller government, balanced budgets, resource development (pipelines), a tougher line on crime, and a more decentralised federation, with a socially conservative wing. Leaders: Stephen Harper, later Pierre Poilievre.

The other federal parties: the NDP (New Democratic Party) on the left (labour, expanded public healthcare — it created Medicare provincially in Saskatchewan); the Bloc Quebecois (Quebec sovereigntist, Quebec ridings only); and the Green Party. Because of this multi-party system, minority governments are common and the NDP or Bloc often hold the balance of power.`),

  k('kb-gap-cancivics-equalization-vs-transfers', 'Equalization vs transfer payments (Canada)', [
    'difference between equalization payments and transfer payments', 'federal transfers to provinces',
    'equalization to have-not provinces', 'Canada Health Transfer Canada Social Transfer', 'fiscal capacity',
    'no strings on equalization', 'not FIFA payments',
  ], `"Transfer payments" is the umbrella term for money the federal government sends to the provinces and territories. There are three main streams (not football transfer fees):

1. The Canada Health Transfer (CHT) — the largest, a per-capita cash payment to help fund provincial health care, conditional on provinces respecting the Canada Health Act (public administration, universality, portability, comprehensiveness, accessibility).
2. The Canada Social Transfer (CST) — a per-capita payment supporting post-secondary education, social assistance and social services / childcare.
3. Equalization — a payment ONLY to provinces whose "fiscal capacity" (their ability to raise revenue at average tax rates) is BELOW the national average. It is paid out of federal general revenue (not by "rich" provinces directly) and comes with NO strings — the receiving province can spend it however it likes. Its purpose, written into the Constitution (Section 36), is to ensure all provinces can provide "reasonably comparable levels of public services at reasonably comparable levels of taxation". Quebec, the Atlantic provinces and (recently) Manitoba have long been recipients; Alberta, BC and Ontario are usually not. The territories get a separate, larger arrangement called Territorial Formula Financing.

Short version: equalization is one specific transfer, unconditional, aimed at levelling fiscal capacity; "transfer payments" also includes the health and social transfers, which are per-capita and tied to conditions.`),

  k('kb-gap-cancivics-premier-vs-mayor', 'Premier vs mayor (Canada)', [
    'difference between a premier and a mayor in Canada', 'premier head of a provincial government',
    'mayor head of a municipal council', 'province controls health education civil law', 'city controls zoning water roads transit',
    'premier does not control defence or currency', 'municipalities are creatures of the province',
  ], `A premier is the head of government of a PROVINCE (or territory) — the leader of the party that holds the confidence of the provincial legislature (the National Assembly in Quebec, Queen's Park in Ontario, etc.). The premier and provincial cabinet run everything in provincial jurisdiction under the Constitution: hospitals and health-care delivery, schools and universities, provincial highways, natural resources, property and civil law, policing arrangements, municipalities, labour, and the provincial budget and provincial taxes. A premier does NOT control defence, the armed forces, currency, criminal law, immigration or foreign affairs — those are federal, run by the Prime Minister.

A mayor is the head of a MUNICIPAL council — one city, town or borough. Municipalities are "creatures of the province": they only have the powers the province grants them. A mayor and council handle strictly local matters: zoning and land use, local streets and sidewalks, water and sewers, garbage collection, public transit, parks and libraries, the fire department, municipal police, and property taxes. Big-city mayors (Montreal, Toronto) run large budgets but still answer to provincial law.

So it is a jurisdiction ladder: Prime Minister (Canada) -> Premier (province) -> Mayor (city), each with a defined and limited set of responsibilities.`),

  k('kb-gap-cancivics-quebec-french-vs-france', 'Quebec French vs France French', [
    'difference between Quebec French and France French', 'joual', 'archaic vocabulary and pronunciation',
    'anglicisms', 'sacres religious swearing', 'more informal tu', 'not heavily Indigenous-influenced',
    'nasal vowels affrication', 'francais quebecois',
  ], `Quebec French (le francais quebecois) and the French of France (le francais hexagonal / "de France") are the same language, fully mutually intelligible in writing and in formal speech, but everyday spoken Quebec French differs in several ways. It is NOT heavily grammatically restructured by Indigenous languages — Innu and other First Nations languages contributed only a handful of loanwords (mostly place names and things like "carcajou", "atoca").

Pronunciation: Quebec French kept some older 17th-18th century features (a wider set of vowel distinctions, diphthongised long vowels), and adds "affrication" — "t" and "d" before "i"/"u" are said like "ts" and "dz" ("tu dis" sounds like "tsu dzis"). The accent and intonation are distinctive.

Vocabulary: some archaic words retained from colonial-era France ("char" for car, "barrer la porte" for lock the door, "magasiner" for shop), some unique coinages, and — ironically, given the strong language protection — many everyday anglicisms in casual speech ("c'est le fun", "canceller", "checker"), even while France borrows different English words (le week-end, le parking).

Register: Quebecers use "tu" much more readily; "vous" feels quite formal. Swearing ("les sacres") is drawn from Catholic liturgy — tabarnak, calisse, criss, osti, ciboire — rather than the sexual/scatological swearing of France. "Joual" is the name for the strongest working-class Montreal vernacular.

France's spoken French, meanwhile, has its own heavy slang (verlan, "wesh", "ouf") that Quebecers do not use. Both are "correct" — just two branches of the same tree.`),

  k('kb-gap-cancivics-school-board-vs-ministry', 'School board vs ministry of education (Canada)', [
    'difference between a school board and a ministry of education', 'education is provincial jurisdiction in Canada',
    'no federal department of education', 'provincial ministry sets curriculum', 'local elected school board governs schools',
    'Quebec service centres CSS', 'francophone anglophone boards',
  ], `In Canada, education is entirely a PROVINCIAL responsibility — there is NO federal department of education. So a "ministry of education" means a PROVINCIAL ministry, not a national one.

The provincial Ministry (or Department) of Education, led by a Cabinet minister, sets province-wide policy for the K-12 system: the curriculum, graduation requirements, standardised testing, teacher certification standards, the school year, and the funding formula that distributes provincial money to local boards. Every province runs its own separate system, which is why curricula and diplomas differ across the country.

A school board (in some provinces a "school district" or "division") is the LOCAL governing body for the public schools in one area. Its trustees are usually elected by local voters. The board hires the superintendent and staff, allocates its budget among its schools, sets local policies, decides on school openings and closures and catchment boundaries, and runs day-to-day operations within the framework the province sets. Many provinces have separate English and French boards, and some have separate public and Catholic (separate) boards.

Quebec abolished elected English and French "commissions scolaires" and replaced most of them with appointed "centres de services scolaires" (CSS) in 2020, though the English-language boards kept elected commissioners after a court challenge.`),

  k('kb-gap-cancivics-riding-vs-constituency', 'Riding vs constituency vs electoral district (Canada)', [
    'difference between a riding and a constituency', 'synonyms in Canada', 'electoral district official term',
    'circonscription in French', 'comte county informal', 'single-member district', 'Elections Canada boundaries',
  ], `In Canada these three terms are SYNONYMS for the same thing: a geographic area that elects one representative to a legislature.

- "Electoral district" is the formal, legal term used by Elections Canada.
- "Riding" is the traditional and most common everyday word (from an old English administrative division).
- "Constituency" is a more formal synonym, and "the constituents" means the voters who live there.
- In French the official word is "circonscription", but it is also informally called a "comte" (county).

Each riding elects one MP federally (or one MPP/MLA/MNA provincially) by first-past-the-post — whoever gets the most votes wins the seat. Federal riding boundaries are redrawn roughly every ten years after the census by independent commissions to keep populations roughly equal, with the current count moving from 338 to 343 seats.

So "which riding are you in?" and "which constituency / electoral district do you live in?" are asking the exact same question.`),

  k('kb-gap-cancivics-fptp-vs-pr', 'First-past-the-post vs proportional representation', [
    'difference between first past the post and proportional representation', 'FPTP single-member plurality',
    'winner takes the seat with a plurality', 'PR seats match vote share', 'MMP mixed-member proportional',
    'STV single transferable vote', 'wasted votes majoritarian bias', 'Canada uses FPTP',
  ], `First-past-the-post (FPTP), also called single-member plurality, is what Canada uses federally and in every province. The country is divided into single-member ridings; in each one, the candidate with the MOST votes wins the seat — a simple plurality, no majority required. It is easy to understand, produces a clear local MP, and tends to manufacture stable single-party majorities. Its criticisms: a party can win a majority of seats with well under 40% of the vote; votes for losing candidates and "surplus" votes for winners are "wasted"; smaller parties with geographically spread support (like the Greens) win far fewer seats than their vote share; and regional parties are over-rewarded.

Proportional representation (PR) allocates seats to parties roughly in PROPORTION to their share of the vote. Common systems: party-list PR (voters pick a party, seats filled from ranked candidate lists), Mixed-Member Proportional (MMP — you get a local MP by FPTP plus "top-up" seats to make the overall result proportional, as in Germany and New Zealand), and Single Transferable Vote (STV — multi-member districts with ranked ballots). PR produces legislatures that better mirror how people voted and almost always coalition governments, at the cost of weaker local representation and more negotiation to form a government.

Canada has debated switching (a 2015 Liberal promise, several provincial referendums) but has kept FPTP every time.`),

  k('kb-gap-cancivics-pmb-vs-govt-bill', 'Private member\'s bill vs government bill (Canada)', [
    'difference between a private members bill and a government bill', 'government bill from Cabinet numbered C-1 upward',
    'private members bill from a backbench MP or senator', 'lottery draw order of precedence', 'one hour of debate slots',
    'rarely becomes law', 'cannot spend money without royal recommendation',
  ], `A government bill is introduced by a Cabinet minister on behalf of the government, is part of the government's legislative program, gets priority scheduling and unlimited debate time, and usually passes because the governing party whips its MPs to support it. Government bills in the Commons are numbered C-1, C-2, and so on. Only a government bill (with a "royal recommendation" from the Crown) can authorise new spending or taxation.

A private member's bill (PMB) is introduced by any MP who is NOT in Cabinet (a backbencher, or an opposition member) — or the Senate equivalent by a senator. There is far less time for these: MPs' names are drawn in a lottery to set an "order of precedence", and each bill that reaches the floor gets only a few one-hour slots of debate. A PMB cannot commit government money. Most PMBs die on the order paper, but some do become law, often on non-partisan or "conscience" issues (holidays, symbols, minor Criminal Code changes, awareness days). The government occasionally lets a PMB through, or picks up its idea in a government bill.

Short version: a government bill is the Cabinet's priority legislation with time and votes behind it; a private member's bill is a backbencher's initiative with little time, no spending power, and long odds of passing.`),

  k('kb-gap-cancivics-north-vs-provinces', 'The territories ("the North") vs the provinces (Canada)', [
    'difference between the north and the provinces in Canada', 'ten provinces three territories',
    'Yukon Northwest Territories Nunavut', 'provinces have constitutional powers', 'territories powers delegated by Parliament',
    'devolution', 'commissioner not lieutenant governor', 'Territorial Formula Financing',
  ], `Canada has ten PROVINCES and three TERRITORIES (Yukon, the Northwest Territories, and Nunavut — collectively "the North"). The difference is the source of their authority.

A province's powers come directly from the CONSTITUTION (the Constitution Act, 1867, sections 92 and 93). Those powers are the province's own and cannot be taken away by the federal Parliament — health, education, property and civil rights, natural resources, municipalities, and so on. Each province has a Lieutenant Governor representing the Crown.

A territory's powers are DELEGATED by an ordinary Act of the federal Parliament, which could in principle amend or repeal them. Historically Ottawa administered the North directly; through "devolution" agreements the territories have gradually been given province-like control over their lands, resources and public services (Yukon in 2003, the NWT in 2014; Nunavut is still negotiating). A territory has a "Commissioner" (a federal appointee) rather than a Lieutenant Governor.

Other northern realities: Nunavut (created 1999) is about 85% Inuit and its legislature runs by consensus with no political parties; the territories are huge in area but tiny in population (all three together under 130,000 people); and they receive a separate, more generous federal funding arrangement (Territorial Formula Financing) instead of equalization.`),
];
