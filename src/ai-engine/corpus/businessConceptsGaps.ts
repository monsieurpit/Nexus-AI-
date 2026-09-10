import { KnowledgeItem } from '../../types';

/**
 * BUSINESS_CONCEPTS_GAPS — batch 260 corrections. nexus-4b was OK on much of it
 * (partnership/corporation, sole prop/LLC, startup/small business, B2B/B2C,
 * marketing/sales, revenue/income, gross/net margin, equity/debt financing,
 * angel/VC, valuation/market cap, IPO/direct listing, monopoly/oligopoly,
 * supply/demand, micro/macro). Misses:
 * - "manager vs leader" answered about FOOTBALL managers and caretakers.
 * - "lead vs prospect" answered about prospect theory (Kahneman) and rock
 *   climbing.
 * - "nonprofit vs for-profit" answered about banks vs credit unions.
 * - "stakeholder vs shareholder" and "merger vs acquisition" were web dumps.
 * - "recession vs inflation" said a recession means "prices are falling" and
 *   framed them as opposites.
 * - "shortage vs scarcity" was garbled.
 * - "asset vs expense" got tangled in accounting debits.
 * - "product vs service", "marketing vs advertising", "customer vs consumer",
 *   "fixed vs variable costs", "401k vs IRA" were cut before the second half.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'business', keywords, content, createdAt: now,
});

export const BUSINESS_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-biz-manager-vs-leader',
    'Manager vs leader',
    [
      'difference between a manager and a leader', 'a manager is a formal role with authority they plan organise allocate resources direct tasks monitor performance responsible for the team hitting targets management is about maintaining systems and predictable results through process and control', 'a leader is someone others choose to follow they set a vision inspire and motivate build trust challenge the status quo and develop people leadership is about change and influence and does not require a title',
      'the two overlap you can be one without the other managers do things right leaders do the right things',
    ],
    `A MANAGER holds a formal ROLE with authority delegated by the organisation. The job is to PLAN, ORGANISE, allocate resources, assign and coordinate tasks, monitor performance against targets, solve day-to-day problems, and be accountable for the team's output. Management is fundamentally about creating ORDER and PREDICTABILITY — running systems and processes so the work gets done reliably. A manager's power comes from their POSITION.

A LEADER is someone others CHOOSE to follow, whether or not they have a title. Leadership is about setting a compelling VISION or direction, INSPIRING and motivating people toward it, building TRUST, challenging the status quo, taking risks, and developing people's potential. A leader's influence comes from their CREDIBILITY, character, and ideas, not from an org chart — which is why informal leaders emerge in teams with no authority, and why some people with big titles are not really leaders.

The two OVERLAP and both matter. A good manager also leads (motivates, sets direction), and effective leaders usually also manage (organise, follow through). But you can have one without the other: a manager everyone obeys but nobody is inspired by, or a respected colleague with no direct reports whom everyone follows.

Warren Bennis's line: "Managers do things right; leaders do the right things." John Kotter frames it as management copes with COMPLEXITY, leadership copes with CHANGE. Organisations need both.`,
  ),
  k(
    'kb-gap-biz-lead-vs-prospect',
    'Lead vs prospect (sales)',
    [
      'difference between a lead and a prospect sales', 'a lead is a person or company who has shown some initial interest or been identified as a potential customer filled in a form downloaded content subscribed largely unqualified you do not yet know if they are a good fit or ready to buy', 'a prospect is a lead that has been qualified they match your ideal customer profile budget authority need timeline there is a real potential for a sale and they have been engaged and moved into the pipeline',
      'progression contact lead qualified lead prospect opportunity customer a lead is a maybe a prospect is a maybe worth pursuing not prospect theory or rock climbing',
    ],
    `In sales and marketing (not the psychology "prospect theory", not rock climbing):

A LEAD is a person or company at the TOP of the sales funnel who has shown SOME sign of possible interest, or who fits a target list. They might have filled in a web form, downloaded a whitepaper, attended a webinar, subscribed to a newsletter, handed over a business card, or simply been scraped from a list of companies in the right industry. Leads are mostly UNQUALIFIED — you do not yet know whether they have a real need, a budget, buying authority, or any intention to purchase. Marketing generates leads in volume.

A PROSPECT is a lead that has been QUALIFIED — you have checked and confirmed that they are a realistic potential customer. Common qualification frameworks: BANT (Budget, Authority, Need, Timeline) or MEDDIC. A prospect matches your "ideal customer profile", has a genuine problem your product solves, and has been engaged in a real conversation, so they are worth a salesperson's time. Prospects sit in the SALES PIPELINE.

The typical progression: suspect / contact -> LEAD -> marketing-qualified lead -> sales-qualified lead / PROSPECT -> OPPORTUNITY (an active deal with a value and expected close date) -> CUSTOMER.

One-line version: a lead is anyone who might be interested; a prospect is a lead you have vetted as a genuine potential buyer.`,
  ),
  k(
    'kb-gap-biz-nonprofit-vs-forprofit',
    'Nonprofit vs for-profit organisation',
    [
      'difference between a nonprofit and a for-profit', 'a for-profit organisation exists to generate profit for its owners or shareholders profits can be distributed as dividends or reinvested at the owners discretion it pays tax on profits', 'a nonprofit not-for-profit exists to serve a mission or public social benefit it can earn a surplus but that surplus must be reinvested in the mission it cannot be distributed to any owners nonprofits have no owners a board governs them',
      'registered nonprofits 501c3 in the US are exempt from income tax and donors can deduct contributions both types pay salaries hold assets and can run like a business',
    ],
    `The core difference is the PURPOSE and what happens to any SURPLUS.

A FOR-PROFIT business exists to create financial value for its OWNERS (a sole proprietor, partners, shareholders). Any PROFIT it makes belongs to those owners: it can be paid out as DIVIDENDS/distributions or reinvested to grow the business, at the owners' discretion. The company pays income/corporate tax on its profits, and success is ultimately measured in returns to owners.

A NONPROFIT (not-for-profit) organisation exists to advance a MISSION — a public, charitable, educational, religious, scientific, artistic, or social-advocacy purpose. Crucially:
- it has NO owners; it is governed by a volunteer BOARD OF DIRECTORS/trustees;
- it CAN and often must earn a SURPLUS (revenue exceeding expenses) to be sustainable, but that surplus CANNOT be distributed to anyone — it must be RE-INVESTED in the mission. This is the "non-distribution constraint";
- in exchange, a registered charitable nonprofit (a US 501(c)(3), a UK registered charity) is EXEMPT from income tax, and DONORS can usually deduct their gifts.

Operationally, nonprofits are still businesses: they hire and pay staff (sometimes well), own property and investments, run earned-revenue programs, market themselves, and can go bankrupt. "Nonprofit" does not mean "makes no money" — it means "does not exist to enrich owners".

(Some hybrids exist: benefit corporations / B Corps are for-profit but legally commit to a social mission; social enterprises pursue a mission through trading.)`,
  ),
  k(
    'kb-gap-biz-stakeholder-vs-shareholder',
    'Stakeholder vs shareholder',
    [
      'difference between a stakeholder and a shareholder', 'a shareholder stockholder owns shares equity in a company has a financial stake in its share price and dividends voting rights and is one type of stakeholder', 'a stakeholder is anyone affected by or able to affect the companys operations and success shareholders but also employees customers suppliers creditors the local community government regulators and sometimes the environment',
      'shareholder primacy versus stakeholder theory is a central corporate governance debate all shareholders are stakeholders most stakeholders are not shareholders',
    ],
    `A SHAREHOLDER (stockholder) is someone who OWNS SHARES of a company's stock — a slice of its equity. Their interest is financial and specific: the share price, dividends, and (for common shares) VOTING rights on directors and major decisions. In a bankruptcy they rank last, after creditors. Shareholders are ONE kind of stakeholder.

A STAKEHOLDER is ANYONE who has a "stake" in the company — anyone who is AFFECTED by what the company does, or who can AFFECT the company. That is a much wider group:
- shareholders / owners;
- EMPLOYEES (jobs, wages, safety, conditions);
- CUSTOMERS (product quality, safety, price, service);
- SUPPLIERS and business partners (payment terms, orders, dependence);
- CREDITORS / lenders (repayment);
- the LOCAL COMMUNITY (jobs, tax base, pollution, congestion);
- GOVERNMENTS and REGULATORS (taxes, compliance, law);
- sometimes society at large and the environment.

The distinction underpins a long-running governance debate:
- SHAREHOLDER PRIMACY (Milton Friedman): a company's main obligation is to maximise shareholder value within the law.
- STAKEHOLDER THEORY (Ed Freeman; the 2019 US Business Roundtable statement; "ESG"): a company should be run to balance the legitimate interests of ALL its stakeholders, not just owners.

Relationship: every shareholder is a stakeholder, but most stakeholders (employees, customers, neighbours) are NOT shareholders.`,
  ),
  k(
    'kb-gap-biz-merger-vs-acquisition',
    'Merger vs acquisition',
    [
      'difference between a merger and an acquisition', 'in a merger two companies usually of similar size combine to form a single new entity typically a merger of equals agreed by both boards shareholders of both get stock in the new company Exxon plus Mobil', 'in an acquisition takeover one company the acquirer usually larger buys another the target buying its stock or assets and the target ceases to exist as an independent entity becoming part of the acquirer',
      'acquisitions can be friendly the board agrees or hostile via a tender offer or proxy fight most mergers are really acquisitions in friendlier language',
    ],
    `Both are ways companies combine, and they are grouped as "M&A", but they differ in structure and framing.

In a MERGER, two companies — usually of ROUGHLY SIMILAR SIZE — COMBINE to form a SINGLE, often NEW legal entity. It is negotiated and AGREED by BOTH boards of directors as a "merger of equals", and shareholders of BOTH original companies exchange their old shares for stock in the combined company. Classic examples: Exxon + Mobil -> ExxonMobil; Daimler-Benz + Chrysler -> DaimlerChrysler; the AOL-Time Warner deal.

In an ACQUISITION (or "takeover"), one company — the ACQUIRER, usually the LARGER — BUYS another company, the TARGET. It purchases either the target's SHARES (buying control) or its ASSETS, pays the target's shareholders in cash and/or acquirer stock, and the TARGET CEASES to exist as an independent company, absorbed into the acquirer, which KEEPS ITS OWN name and identity. Examples: Disney acquiring Pixar, Marvel, and Fox; Facebook acquiring Instagram and WhatsApp.

Acquisitions can be:
- FRIENDLY — the target's board recommends the deal to its shareholders;
- HOSTILE — the acquirer bypasses a resistant board and goes straight to shareholders with a TENDER OFFER, or runs a PROXY FIGHT to replace the board.

In practice, most deals called "mergers" are really acquisitions — the acquiring company uses "merger" language because it sounds more equal and reassures the target's employees, customers, and shareholders.`,
  ),
  k(
    'kb-gap-biz-recession-vs-inflation',
    'Recession vs inflation',
    [
      'difference between a recession and inflation', 'they measure different things and are not opposites', 'a recession is a significant broad decline in economic activity lasting more than a few months falling GDP commonly two consecutive quarters rising unemployment falling production retail sales and incomes', 'inflation is a sustained increase in the general price level your money buys less over time measured by CPI',
      'you can have inflation without recession recession without much inflation recession with high inflation stagflation or deflation in a severe recession one is about output and jobs the other about prices',
    ],
    `They are NOT opposites — they measure completely different things.

A RECESSION is a broad, significant decline in economic ACTIVITY (output and employment) that lasts more than a few months. Signs: falling GDP (a common rule of thumb is two consecutive quarters of contraction; in the US the NBER weighs several indicators), rising UNEMPLOYMENT, falling industrial production, retail sales, and real incomes, and business failures. It is about the economy PRODUCING LESS and jobs being lost.

INFLATION is a sustained rise in the GENERAL PRICE LEVEL — the cost of a typical basket of goods and services goes up over time, so each unit of money buys LESS (loss of purchasing power). It is measured by indexes like the Consumer Price Index (CPI). Moderate inflation (~2% a year) is normal and even targeted by central banks; high inflation erodes savings and wages.

The two can occur in any combination:
- inflation WITHOUT recession — a normally growing economy with rising prices (most years);
- recession WITH LOW inflation, or even DEFLATION (falling prices) — as in the Great Depression and the 2008-09 crisis, when weak demand pulled prices down;
- recession WITH HIGH inflation — "STAGFLATION", the painful mix of stagnant output, high unemployment, AND rising prices, seen in the 1970s oil shocks and again in 2022.

So a recession is a problem with JOBS and OUTPUT; inflation is a problem with PRICES. A recession does NOT necessarily mean prices are falling.`,
  ),
  k(
    'kb-gap-biz-shortage-vs-scarcity',
    'Shortage vs scarcity',
    [
      'difference between a shortage and a scarcity', 'scarcity is the fundamental economic condition that resources are limited relative to unlimited human wants permanent and universal it is why economics exists and it is not solved by higher prices', 'a shortage is a specific usually temporary market situation where at the current price the quantity demanded exceeds the quantity supplied buyers want more than is available',
      'shortages are typically caused by a price held below equilibrium price ceilings rent control a sudden demand spike or supply disruption and they resolve when the price rises to equilibrium',
    ],
    `They sound similar but are very different economic ideas.

SCARCITY is the FUNDAMENTAL, PERMANENT condition that underlies all of economics: human wants are effectively UNLIMITED, but the RESOURCES to satisfy them (time, labour, land, materials, capital) are LIMITED. Because you cannot have everything, every choice involves a trade-off and an opportunity cost. Scarcity applies to virtually everything with any value — even things that seem abundant (fresh water, clean air, doctors' time). It is NOT "solved" by raising prices; it is just a fact of the world, and economics is the study of how societies ALLOCATE scarce resources among competing uses.

A SHORTAGE is a SPECIFIC, usually TEMPORARY market situation: AT THE CURRENT PRICE, the quantity that buyers want to buy (quantity demanded) is GREATER than the quantity that sellers are offering (quantity supplied). The visible signs are empty shelves, waiting lists, rationing, and queues. Shortages are typically caused by:
- a price held BELOW the market-clearing level — by a price CEILING, rent control, or a company's decision not to raise prices;
- a sudden SURGE in demand, or a SUPPLY disruption (a factory fire, a drought, a war), before prices have had time to adjust.
A shortage RESOLVES when the price is allowed to RISE to equilibrium: the higher price both reduces the quantity demanded and encourages more supply, until the two match.

So: scarcity is a permanent background fact (there is not enough of everything, ever); a shortage is a temporary imbalance at a given price that price adjustment fixes.`,
  ),
  k(
    'kb-gap-biz-asset-vs-expense',
    'Asset vs expense (accounting)',
    [
      'difference between an asset and an expense', 'an asset is something the business owns that has future economic value it provides benefit over multiple periods so it goes on the balance sheet and its cost is spread over its useful life via depreciation or amortisation equipment buildings vehicles inventory patents cash', 'an expense is a cost consumed or used up in the current period to generate revenue now it goes on the income statement and reduces this periods profit immediately rent wages utilities supplies advertising',
      'the test does the spending buy a lasting resource capitalise it or pay for something used up now expense it',
    ],
    `The difference is about the TIMING of the benefit, and it determines which financial statement the cost lands on.

An ASSET is a resource the business OWNS (or controls) that is expected to provide ECONOMIC BENEFIT over MORE THAN ONE accounting period. Because its usefulness is spread across the future, its cost is "CAPITALISED": it is recorded on the BALANCE SHEET, and then its value is charged against profit gradually over its useful life through DEPRECIATION (tangible assets) or AMORTISATION (intangibles). Examples: machinery, vehicles, buildings, land, computers, patents, trademarks, long-term investments, inventory, and cash itself.

An EXPENSE is a cost that is CONSUMED or used up in the CURRENT period in the course of earning revenue right now. It provides no lasting benefit, so it is recorded on the INCOME STATEMENT and reduces THIS period's profit in full, immediately. Examples: rent, salaries and wages, electricity, office supplies, advertising, insurance for the year, interest, shipping.

The practical test ("capitalise vs expense"): does the money buy a LASTING resource you'll use for years -> ASSET; or does it pay for something used up now -> EXPENSE. A $3,000 laptop expected to last four years is an asset (depreciated $750/year); $3,000 spent on this month's Google Ads is an expense. Small, low-value long-lived items are usually expensed anyway for simplicity (a "capitalisation threshold").

(This has nothing to do with accounting "debits" — both assets and expenses happen to be increased by a debit, but that is a bookkeeping mechanic, not the definition.)`,
  ),
  k(
    'kb-gap-biz-product-vs-service',
    'Product vs service',
    [
      'difference between a product and a service', 'a product is a tangible good a physical item you can see touch own store and resell a phone a car food clothing', 'a service is an intangible activity or benefit provided to a customer you cannot touch or store it it is produced and consumed simultaneously a haircut legal advice a flight a streaming subscription cleaning',
      'services are perishable an empty seat is lost forever variable inseparable from the provider you pay for an outcome not an object many offerings blend both',
    ],
    `A PRODUCT is a TANGIBLE good — a physical object that a customer can see, touch, examine before buying, take away, OWN, store, use over time, and often resell. A phone, a car, a loaf of bread, a pair of shoes, a bottle of shampoo. The value is in the object itself.

A SERVICE is an INTANGIBLE activity, performance, or benefit that one party provides to another. You cannot hold it, and (usually) you cannot store it. A haircut, a taxi ride, a doctor's consultation, a flight, legal advice, house cleaning, a Netflix subscription, IT support. You pay for an OUTCOME or an EXPERIENCE, not for an object you keep.

Services have four classic distinguishing features:
- INTANGIBILITY — nothing to inspect before purchase, so trust, reputation, and reviews matter more;
- PERISHABILITY — unused capacity is lost forever (an empty airline seat, an unbooked hotel room, an idle plumber's hour cannot be stored and sold tomorrow), which is why services use yield management, appointments, and off-peak pricing;
- VARIABILITY (heterogeneity) — quality depends on WHO delivers it, WHEN, and to WHOM; two haircuts from the same barber can differ;
- INSEPARABILITY — production and consumption happen at the SAME time, usually with the customer present and involved.

Most real offerings are a MIX: a restaurant sells food (product) plus dining service; a car comes with a warranty and servicing; software-as-a-service delivers a "product" as an ongoing service. Economies shift toward services as they develop.`,
  ),
  k(
    'kb-gap-biz-marketing-vs-advertising',
    'Marketing vs advertising',
    [
      'difference between marketing and advertising', 'marketing is the entire process of creating communicating and delivering value to customers market research product development pricing distribution branding public relations content SEO events customer relationships and advertising the four Ps product price place promotion', 'advertising is just one component of the promotion P the paid controlled messages placed in media TV radio print billboards online display social ads search ads to inform and persuade an audience',
      'advertising is a subset of marketing specifically paid promotion marketing is the whole strategy of which advertising is one tactic',
    ],
    `ADVERTISING is a SUBSET of MARKETING — one tactic within a much bigger discipline.

MARKETING is the whole process of understanding a market and creating, communicating, and delivering VALUE to customers profitably. It is often summarised as the "4 Ps":
- PRODUCT: what you offer, its features, design, quality, packaging, and the range;
- PRICE: how you price it, discounts, and payment terms;
- PLACE: distribution — how and where customers can buy it (retail, e-commerce, wholesale);
- PROMOTION: all the ways you communicate with the market.
Marketing also covers market RESEARCH, customer segmentation and targeting, BRAND strategy and positioning, public relations, content and SEO, email, social media, partnerships, events and sponsorship, customer relationship management and loyalty, and analysing results.

ADVERTISING is specifically the PAID, CONTROLLED placement of persuasive messages in media that the advertiser does not own: TV and radio spots, print ads, billboards and outdoor, online display and video ads, paid social media ads, and paid search (Google Ads). The advertiser fully controls the message and where it appears, and pays for the space or the clicks/impressions. Advertising sits inside the PROMOTION "P".

So: advertising = "we pay to put our message in front of an audience"; marketing = the entire strategy of what to sell, to whom, at what price, through which channels, with what brand — of which advertising is one channel among many. A company can do marketing with no advertising at all (relying on PR, word of mouth, content, and referrals).`,
  ),
  k(
    'kb-gap-biz-customer-vs-consumer',
    'Customer vs consumer',
    [
      'difference between a customer and a consumer', 'a customer is the person or business that pays for and buys a product or service the one who makes the purchase transaction', 'a consumer is the person who actually uses or consumes it',
      'often the same person but they diverge a parent buys cereal for a child a company buys software its employees use someone buys a gift you may need to persuade the customer who holds the wallet differently from the consumer who experiences the product',
    ],
    `A CUSTOMER is whoever PAYS for and BUYS the product or service — the party in the purchase TRANSACTION, the one who hands over the money.

A CONSUMER is whoever actually USES, eats, wears, or otherwise CONSUMES the product — the end user who experiences it.

Very often the customer and the consumer are the SAME PERSON: you buy your own coffee and drink it. But they frequently DIVERGE:
- a PARENT (customer) buys baby food, toys, or children's cereal for a CHILD (consumer);
- a COMPANY / procurement department (customer) buys software, uniforms, or office chairs that EMPLOYEES (consumers/users) actually use;
- someone buys a GIFT — the giver is the customer, the recipient is the consumer;
- pet food: the owner buys, the pet consumes;
- in B2B generally, the "buyer" (who signs the contract) and the "user" (who works with the product daily) are different people with different priorities.

Why it matters for marketing: your message and channel may need to target the CUSTOMER (who controls the budget and makes the decision — appeal to price, convenience, safety, reputation) differently from the CONSUMER (who wants the product to taste good, be fun, or be easy to use). Cereal ads run cartoons to make kids ask, and put "whole grain" and "no artificial colours" on the box to convince the parent. Good marketers map out every person in the "buying centre".`,
  ),
  k(
    'kb-gap-biz-fixed-vs-variable-costs',
    'Fixed vs variable costs',
    [
      'difference between fixed and variable costs', 'fixed costs stay the same regardless of how much you produce or sell within a normal range rent salaries insurance equipment leases loan payments per unit fixed cost falls as volume rises', 'variable costs change in direct proportion to output or sales volume raw materials direct labour per unit packaging shipping sales commissions payment processing fees per unit they stay roughly constant',
      'semi-variable mixed costs have both a fixed base and a variable part the split drives break-even analysis contribution margin equals price minus variable cost per unit',
    ],
    `The difference is how a cost behaves when the VOLUME of output or sales changes.

FIXED COSTS stay the SAME in total regardless of how much you produce or sell, at least within a "relevant range" of activity. You pay them even if you sell nothing. Examples: rent/lease on premises, permanent staff salaries, insurance, equipment leases and depreciation, software subscriptions, loan repayments, business rates. On a PER-UNIT basis, fixed cost FALLS as volume rises (spreading the rent over more units) — this is "economies of scale".

VARIABLE COSTS change in DIRECT PROPORTION to the volume produced or sold — more output, more cost; zero output, zero cost. Examples: raw materials and components, the per-unit direct labour to make each item, packaging, freight/shipping, sales commissions, credit-card processing fees, hourly wages tied to production. On a PER-UNIT basis, variable cost stays roughly CONSTANT.

Some costs are SEMI-VARIABLE (mixed): they have a fixed base plus a variable element — a phone bill with a line rental plus call charges, a delivery van (fixed lease + variable fuel), utilities with a standing charge plus usage.

Why the split matters — BREAK-EVEN analysis:
- CONTRIBUTION MARGIN per unit = selling price - variable cost per unit;
- BREAK-EVEN volume = total fixed costs / contribution margin per unit.
Every unit sold beyond break-even contributes its full contribution margin to PROFIT. A business with high fixed costs and low variable costs (airlines, software) has high operating leverage — very profitable once past break-even, very exposed below it.`,
  ),
  k(
    'kb-gap-biz-401k-vs-ira',
    '401(k) vs IRA',
    [
      'difference between a 401k and an IRA', 'both are US tax-advantaged retirement accounts', 'a 401k is an employer-sponsored plan contribute via payroll deduction often with an employer match higher contribution limits about 23000 a year limited to the plans investment menu traditional contributions are pre-tax', 'an IRA individual retirement account is one you open yourself at a brokerage independent of any job far more investment choice lower limits about 7000 a year income limits on deductibility and Roth eligibility',
      'both come in traditional pre-tax and Roth after-tax versions many people do both max the 401k match then fund a Roth IRA',
    ],
    `Both are US tax-advantaged accounts for retirement saving; the differences are who runs them, the limits, and the investment choice.

A 401(k) is EMPLOYER-SPONSORED. Your company sets up the plan (a 403(b) for non-profits, a TSP for federal workers, a SIMPLE/SEP for small firms). You contribute by automatic PAYROLL DEDUCTION, and many employers add a MATCHING contribution (e.g. 50% of the first 6% you put in) — effectively free money you should not leave on the table. Contribution limits are HIGH (about $23,000 a year in 2024, plus a catch-up if you are 50+). The catch: you can only invest in the MENU of funds the plan offers, which may be limited and carry higher fees.

An IRA (Individual Retirement Account) is one YOU open yourself, at any brokerage, completely independent of your job. You can invest in ALMOST ANYTHING — individual stocks, any ETF or mutual fund, bonds. But contribution limits are much LOWER (about $7,000 a year in 2024, plus a catch-up), and there are INCOME LIMITS on whether traditional-IRA contributions are tax-deductible and on whether you can contribute to a Roth IRA at all.

Both come in two tax flavours:
- TRADITIONAL: contributions are PRE-TAX (reduce this year's taxable income), the money grows untaxed, and you pay income tax on WITHDRAWALS in retirement;
- ROTH: contributions are AFTER-TAX (no deduction now), but growth and qualified WITHDRAWALS are TAX-FREE.

Common strategy: contribute to the 401(k) at least up to the full employer match, then max a Roth IRA, then go back and add more to the 401(k).`,
  ),
  k(
    'kb-gap-biz-ceo-vs-president',
    'CEO vs president (of a company)',
    [
      'difference between a CEO and a president of a company', 'the CEO chief executive officer is the highest-ranking executive sets the overall vision strategy and major decisions reports to the board of directors ultimately accountable for the company', 'the president is often the number two responsible for day-to-day operations or heads a specific division in large companies the president reports to the CEO or they split external CEO versus internal president roles in small companies one person holds both titles',
      'the COO chief operating officer is a similar operations-focused role the chairman leads the board not management',
    ],
    `CEO (Chief Executive Officer) is the HIGHEST-ranking executive in a company and the person ultimately ACCOUNTABLE for its overall performance. The CEO sets the VISION and long-term STRATEGY, makes the biggest capital-allocation and organisational decisions, is the public face to investors and the media, hires the rest of the senior team, and REPORTS TO the BOARD OF DIRECTORS (which represents shareholders and can fire the CEO).

PRESIDENT is usually the SECOND-in-command (or, in companies that split the roles, an equal partner focused inward). The president is typically responsible for RUNNING the company day to day — operations, execution of the strategy the CEO sets, and often direct oversight of the major functions or business units. In large corporations the president REPORTS TO the CEO. In some companies the roles are divided as "outside" vs "inside": the CEO handles strategy, the board, and external relationships; the president handles internal operations. In many SMALL companies, ONE person is both CEO and president (and often founder).

Related roles:
- COO (Chief Operating Officer): very similar to the "president" idea — the operations chief, reporting to the CEO. Some companies have a president OR a COO, some have both, some have neither.
- CHAIRMAN (of the board): leads the BOARD OF DIRECTORS, not management. Sometimes the CEO is also chairman ("combined" role); many governance codes prefer them separate.

Titles are not standardised — a startup "President" and a Fortune-500 "President" are very different jobs — so what the role actually means depends on the company.`,
  ),
];
