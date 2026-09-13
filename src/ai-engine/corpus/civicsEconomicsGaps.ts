import { KnowledgeItem } from '../../types';

// Batch 274 corpus fixes — civics/government/economics topics.
// 6/25 misses. Two severe topic-confusion hallucinations: "loan vs mortgage"
// was answered as a SOCCER player-loan transfer ("a loan's a temporary move
// for a player... football registration thing"), and "soft power vs hard
// power" was answered as economics' "soft landing" (inflation/recession)
// concept instead of the actual international-relations term. Also several
// answers that dodged the real comparison (president vs prime minister
// never actually described a prime minister at all; ambassador vs diplomat
// never explained that an ambassador IS a type of diplomat).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'civics',
  keywords,
  content,
  createdAt: now,
});

export const CIVICS_ECONOMICS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-civics-tariff-vs-tax',
    'Tariff vs tax',
    ['tariff', 'tax', 'difference tariff tax'],
    "A tariff is a specific TYPE of tax — one charged only on goods imported from other countries, meant to make foreign products more expensive so they compete less easily with domestic ones (or simply to raise government revenue on trade). A tax, in the broader sense, is any mandatory payment to the government and comes in many other forms that have nothing to do with imports at all — income tax (on what you earn), sales tax (on what you buy locally), property tax (on what you own). So every tariff is a tax, but most taxes aren't tariffs — the key giveaway is that a tariff only applies at the border, specifically to goods crossing into the country.",
  ),
  k(
    'kb-gap-civics-loan-vs-mortgage',
    'Loan vs mortgage (financial, not a soccer transfer)',
    ['loan', 'mortgage', 'difference loan mortgage', 'financial loan definition'],
    "A loan is a general term for any borrowed money that has to be paid back, usually with interest — it can be for almost anything (a car, school, a personal loan, a small business). A mortgage is a SPECIFIC type of loan used only to buy real estate (a house or property), and it comes with one key feature most other loans don't have: the property itself is used as collateral, meaning if the borrower stops paying, the lender can legally take and sell the property (foreclosure) to recover the money. So a mortgage is a loan, but a much more specialized one — tied specifically to real estate, secured by that real estate, and typically repaid over a much longer term (often 15-30 years) than most other loans. Important: this has nothing to do with a 'loan' in the sports sense (a player temporarily moving to another club) — that's a completely different, unrelated meaning of the word.",
  ),
  k(
    'kb-gap-civics-president-vs-pm',
    'President vs prime minister',
    ['president', 'prime minister', 'difference president prime minister'],
    "A president is typically both the head of state (the ceremonial national representative) AND the head of government (who actually runs day-to-day policy) in a presidential system — usually elected directly by the people for a fixed term, and independent of the legislature (e.g. the U.S. president can't be removed just because Congress disagrees with them). A prime minister is the head of government ONLY, in a parliamentary system — they're not directly elected by the public as prime minister; instead they're typically the leader of whichever party (or coalition) controls the legislature/parliament, and they can be removed by a vote of no confidence from that same legislature. Parliamentary systems usually keep a separate, mostly ceremonial head of state (a monarch, like in the UK, or a largely ceremonial president, like in Germany or Italy) alongside the prime minister. In short: a president's power comes directly from the people and a fixed term; a prime minister's power comes from and can be taken away by the legislature.",
  ),
  k(
    'kb-gap-civics-ambassador-vs-diplomat',
    'Ambassador vs diplomat',
    ['ambassador', 'diplomat', 'difference ambassador diplomat'],
    "A diplomat is the broad category: anyone who officially represents their country abroad and handles relations with other nations — this includes many ranks and roles, from junior attachés and consuls up through senior officials. An ambassador is a SPECIFIC, senior type of diplomat — the highest-ranking official representative a country sends to another country, who heads that country's embassy and speaks with the most authority on the home government's behalf. So every ambassador is a diplomat, but not every diplomat is an ambassador — an ambassador is essentially the top of the diplomatic hierarchy in a given country, while 'diplomat' covers everyone doing that kind of foreign-relations work at any level.",
  ),
  k(
    'kb-gap-civics-referendum-vs-election',
    'Referendum vs election',
    ['referendum', 'election', 'difference referendum election'],
    "A referendum is a direct vote where the public decides YES or NO on a specific issue or proposed law itself (like approving a new constitution or a specific policy change) — the people are voting on the actual decision. An election is a vote where the public chooses WHO will represent them or hold office (a president, a mayor, a member of parliament) — the people are voting on a person, not a policy, and that elected person then makes decisions on their behalf afterward. The simplest way to remember it: a referendum votes on an issue directly; an election votes on a person who will then decide issues for you.",
  ),
  k(
    'kb-gap-civics-soft-power-vs-hard-power',
    'Soft power vs hard power',
    ['soft power', 'hard power', 'difference soft power hard power', 'international relations power'],
    "Hard power is a country's ability to influence others through coercion or force — military strength, economic sanctions, or the threat of either; it makes other countries do something because they have to or fear the consequences of refusing. Soft power is a country's ability to influence others through attraction rather than force — culture, values, diplomacy, education, media, and reputation that make other countries WANT to align with or cooperate with it, without any coercion at all. The term was coined by political scientist Joseph Nye. A simple example: a country using its military or trade sanctions to pressure another nation is hard power; a country influencing others because its movies, universities, or diplomatic reputation make people admire and want to align with it is soft power. Note: this is unrelated to the economics term 'soft landing' (when an economy slows inflation without tipping into recession) — that's a completely different concept that just happens to share the word 'soft.'",
  ),
];
