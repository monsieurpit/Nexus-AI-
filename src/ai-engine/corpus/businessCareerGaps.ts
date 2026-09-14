import { KnowledgeItem } from '../../types';

// Batch 277 corpus fixes — business/finance/career topics. 6/25 misses. Three severe
// topic-confusion hallucinations: "internship vs co-op" answered "co-op" as a VIDEO GAME term
// (cooperative multiplayer like Left 4 Dead) instead of a cooperative-education work program;
// "overtime vs comp time" answered entirely about NFL/college football overtime RULES instead of
// the actual workplace question (extra pay vs time off in lieu); "union vs guild" answered about
// the American Civil War's "Union" (the North) instead of a labor union vs a professional guild.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'business',
  keywords,
  content,
  createdAt: now,
});

export const BUSINESS_CAREER_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-biz-gdp-vs-percapita',
    'GDP vs per capita income',
    ['gdp', 'per capita income', 'difference gdp per capita income'],
    "GDP (Gross Domestic Product) is the TOTAL value of all goods and services produced within a country in a given period — one big national number, regardless of population size. Per capita income divides that (or a similar total income measure) by the number of people in the country, giving an AVERAGE amount per person — this is what actually tells you how wealthy an average individual in that country is. The key reason this matters: a country can have a huge total GDP but a LOW per capita income if it has a massive population spread across it (a lot of total output divided among many people means less per person), while a smaller country with fewer people can have a much higher per capita income even with a smaller total GDP. GDP measures a nation's total economic size; per capita income measures individual prosperity.",
  ),
  k(
    'kb-gap-biz-internship-vs-coop',
    'Internship vs co-op (not a video game term)',
    ['internship', 'co-op', 'cooperative education', 'difference internship co-op'],
    "An internship is typically a single, shorter-term work placement (often a summer or one semester) where a student gains real-world experience at a company, sometimes paid and sometimes unpaid, usually while still enrolled full-time in school. A co-op (cooperative education program) is a more structured, longer-term arrangement, usually built into a school's curriculum, where a student ALTERNATES between full semesters of classes and full semesters of paid, full-time work at a company — often repeating this cycle multiple times over their degree, gaining more extensive, often multiple rounds of real professional experience than a single internship would give. Note: this is unrelated to 'co-op' as a video game term (players teaming up against the game, like in Left 4 Dead) — that's a completely different, unrelated meaning of the word.",
  ),
  k(
    'kb-gap-biz-insurance-vs-warranty',
    'Insurance vs warranty',
    ['insurance', 'warranty', 'difference insurance warranty'],
    "Insurance is a policy you pay for (usually as an ongoing premium) that protects you against a broad range of UNEXPECTED, unpredictable events — accidents, theft, fire, illness — regardless of the cause, and it's sold by insurance companies covering almost any type of risk you choose to insure against. A warranty is a promise from a MANUFACTURER or seller that a specific product will work correctly for a set period, and it only covers DEFECTS in that product itself (a manufacturing flaw or part failure) — not accidents, misuse, or unrelated damage. The key difference: insurance covers a broad range of unpredictable risks to something you own (and you choose to buy it separately), while a warranty is a narrower promise tied specifically to one product's own quality and workmanship, usually included with the purchase or bought as an add-on from the seller.",
  ),
  k(
    'kb-gap-biz-overtime-vs-comptime',
    'Overtime vs comp time (workplace, not football)',
    ['overtime pay', 'comp time', 'compensatory time', 'difference overtime comp time'],
    "In a workplace context, overtime is EXTRA PAY (usually 1.5x a worker's normal hourly rate, sometimes called 'time and a half') that an eligible employee earns for hours worked beyond a standard threshold (commonly 40 hours per week in the US). Comp time (compensatory time) is EXTRA TIME OFF instead of extra pay — instead of being paid more for those extra hours, the employee 'banks' that time and can take it off later. In the US, private-sector employers generally cannot legally offer comp time instead of overtime pay to eligible (non-exempt) employees — comp time in lieu of pay is mostly limited to public-sector/government jobs. This is unrelated to 'overtime' in sports (extra playing time when a game is tied) — that's a completely different meaning of the word.",
  ),
  k(
    'kb-gap-biz-union-vs-guild',
    'Union vs guild (labor, not the American Civil War)',
    ['labor union', 'trade union', 'guild', 'difference union guild'],
    "A (labor/trade) union is an organization of WORKERS in a particular industry or company who band together to collectively bargain with their employer for better pay, benefits, and working conditions — unions are adversarial by design, built around negotiating against management's interests, and are common in industries like manufacturing, transportation, and increasingly tech and media. A guild is historically an association of skilled CRAFTSPEOPLE or professionals in the same trade (like the medieval guilds of blacksmiths or weavers) — traditionally focused on maintaining quality standards, training apprentices, and protecting the trade's reputation, more like a professional association than an adversarial bargaining unit against an employer. Modern 'guilds' (like the Writers Guild of America or Directors Guild of America) actually function very similarly to unions today, blurring the historical distinction, but the ORIGINAL difference was quality/craft standards and training (guild) versus collective bargaining against an employer (union). Note: this is unrelated to 'the Union' in the American Civil War (the Northern states) — that's a completely different, unrelated meaning of the word.",
  ),
  k(
    'kb-gap-biz-401k-vs-pension',
    '401(k) vs pension',
    ['401k', 'pension', 'defined contribution', 'defined benefit', 'difference 401k pension'],
    "A 401(k) is a DEFINED-CONTRIBUTION retirement plan — the employee (and often the employer, via a matching contribution) puts money into an individual investment account, and the eventual retirement payout depends entirely on how much was contributed and how those investments performed. The employee bears the investment risk and typically chooses how the money is invested (stocks, bonds, funds). A pension is a DEFINED-BENEFIT retirement plan — the employer guarantees a specific, predictable payout in retirement (often based on years worked and salary), regardless of how any underlying investments perform. The employer bears the investment risk and is responsible for making sure the promised amount is there. In short: with a 401(k), your retirement income depends on the market and how much you saved; with a pension, your employer guarantees a fixed amount no matter what the market does. Pensions have become far less common in the private sector, with most employers now offering 401(k)s instead.",
  ),
];
