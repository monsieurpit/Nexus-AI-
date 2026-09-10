import { KnowledgeItem } from '../../types';

/**
 * ECONOMICS_FINANCE_CONCEPTS_GAPS_2 — batch 207 corrections.
 * Economics / finance "difference between X and Y" misses: GNP called "Gini",
 * "debit vs credit in accounting" answered about debit/credit CARDS, "franchise
 * vs chain" answered about media franchises (Pokemon, Halo), "chapter 7 vs
 * chapter 11" answered chapter 7 vs chapter 13, "fixed vs variable costs"
 * answered about fixed vs floating exchange rates, plus raw web dumps for
 * weather/climate, bond yield/coupon rate, wholesaler/retailer, bull/bear
 * economy, and thin answers for supply/demand and ETF/mutual fund.
 */
export const ECONOMICS_FINANCE_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-econ2-gdp-vs-gnp',
    title: 'GDP vs GNP (GNP is not the Gini coefficient)',
    category: 'economics',
    keywords: [
      'difference between GDP and GNP', 'GDP vs GNP', 'gross domestic product',
      'gross national product', 'GNI', 'gross national income', 'inside borders',
      'by residents', 'not the Gini coefficient', 'net factor income from abroad',
    ],
    content: `GDP and GNP both measure the total value of goods and services produced in a year, but they draw the boundary differently. GNP has nothing to do with the Gini coefficient (which measures income inequality on a 0-to-1 scale).

Gross Domestic Product (GDP) counts all production that happens INSIDE a country's borders, no matter who owns the factory or firm. A Toyota plant in Kentucky adds to US GDP; a US-owned firm operating in Ireland does not.

Gross National Product (GNP) counts all production by a country's residents and firms, WHEREVER in the world it takes place, and excludes production by foreigners inside the country. So GNP = GDP + income earned by nationals abroad − income earned by foreigners domestically (this adjustment is "net factor income from abroad").

The gap matters for countries with lots of foreign investment. Ireland's GDP is far higher than its GNP because much output there comes from foreign multinationals whose profits flow out. Most modern statistics use "Gross National Income" (GNI), which is essentially GNP measured from the income side.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-debit-vs-credit-accounting',
    title: 'Debit vs credit in accounting (double-entry, not bank cards)',
    category: 'economics',
    keywords: [
      'difference between a debit and a credit in accounting', 'debit vs credit accounting',
      'double-entry bookkeeping', 'left side right side', 'T-account', 'DEALER mnemonic',
      'not debit card vs credit card', 'journal entry', 'ledger', 'normal balance',
    ],
    content: `In accounting, "debit" and "credit" are just the left side and the right side of an entry in a ledger account. They are NOT about debit cards versus credit cards, and debit does not mean "money out" while credit means "money in".

Every transaction in double-entry bookkeeping is recorded with at least one debit and one credit, and the total debits must equal the total credits. Whether a debit increases or decreases an account depends on the account type:

- Debits INCREASE: assets, expenses, and losses (and drawings/dividends).
- Credits INCREASE: liabilities, equity, revenue, and gains.

A common mnemonic is DEALER: Dividends, Expenses, Assets increase on the Debit side; Liabilities, Equity, Revenue increase on the Credit side.

Example: a business buys equipment for 1,000 cash. Equipment (an asset) is debited 1,000 (asset up); Cash (an asset) is credited 1,000 (asset down). Both sides balance.

The reason a bank calls a deposit a "credit" to your account is that your deposit is a liability of the bank (it owes you the money), and liabilities go up with credits — it is the same rule seen from the bank's books.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-franchise-vs-chain',
    title: 'Franchise vs chain (business), not media franchises',
    category: 'economics',
    keywords: [
      'difference between a franchise and a chain', 'franchise vs chain', 'franchisor franchisee',
      'company-owned stores', 'franchise fee royalty', 'corporate ownership', 'business model',
      'not movie or game franchise', 'McDonald’s Starbucks', 'licensing a business format',
    ],
    content: `This is about how a multi-location business is owned and run, not about media properties like Pokemon or Halo.

A chain is a group of outlets all owned and operated directly by one parent company. The company hires the staff, keeps the profits, takes the losses, and controls every location centrally. Starbucks is largely a chain (most stores are company-owned). Corporate makes all the money and bears all the risk.

A franchise is a business format that the owner (the franchisor) licenses to independent operators (franchisees). The franchisee puts up the capital, buys or leases the location, hires local staff, and runs that outlet as their own business, but must follow the franchisor's brand standards, recipes, suppliers and systems. In exchange the franchisee pays an upfront franchise fee plus ongoing royalties (a percentage of sales) and marketing contributions. Most McDonald's, Subway and Tim Hortons locations are franchised — the sign is identical but the owner is a local businessperson, not the corporation.

Many companies mix both: some locations company-owned (chain-style), others franchised. Customers usually cannot tell the difference; the distinction is in who holds the lease, the risk and the profit.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-chapter-7-vs-11',
    title: 'Bankruptcy Chapter 7 vs Chapter 11 (US)',
    category: 'economics',
    keywords: [
      'difference between bankruptcy chapter 7 and chapter 11', 'chapter 7 vs chapter 11',
      'liquidation bankruptcy', 'reorganization bankruptcy', 'US Bankruptcy Code', 'trustee',
      'debtor in possession', 'not chapter 13', 'business bankruptcy', 'discharge of debts',
    ],
    content: `Both are chapters of the US Bankruptcy Code, used by individuals or businesses. (Chapter 13 is a separate thing — a repayment plan for individuals with regular income.)

Chapter 7 is liquidation. A court-appointed trustee takes the debtor's non-exempt assets, sells them, and distributes the proceeds to creditors in a set priority order. Remaining eligible unsecured debts are then discharged (wiped out). For a business, Chapter 7 usually means it shuts down permanently. For an individual it is fast (a few months) but there is an income-based "means test" to qualify.

Chapter 11 is reorganization, used mostly by businesses (and occasionally wealthy individuals). The company keeps operating as a "debtor in possession" — existing management stays in control — while it proposes a plan to restructure its debts, renegotiate contracts and leases, and keep the enterprise alive. Creditors vote on the plan and a judge must confirm it. It is expensive and can take months or years. Airlines and large retailers routinely use Chapter 11 to shed debt and emerge as going concerns.

Short version: Chapter 7 = sell everything, close down, discharge the rest; Chapter 11 = stay open, renegotiate the debt, try to survive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-fixed-vs-variable-costs',
    title: 'Fixed vs variable costs (not exchange rates)',
    category: 'economics',
    keywords: [
      'difference between fixed and variable costs', 'fixed vs variable costs', 'overhead',
      'cost per unit', 'rent salaries', 'materials and commissions', 'break-even analysis',
      'not fixed vs floating exchange rate', 'total cost', 'contribution margin',
    ],
    content: `In business and cost accounting these describe how a cost behaves as output changes. This is not about fixed versus floating exchange rates or the "impossible trinity".

Fixed costs stay the same in total regardless of how much the business produces or sells, at least within a normal range of activity. Examples: rent, insurance, equipment leases, salaried staff, loan interest. If you make zero units this month you still pay them. Per unit, fixed cost falls as volume rises (the rent is spread over more units).

Variable costs change in total in proportion to output. Examples: raw materials, packaging, hourly production wages, shipping, sales commissions, payment-processing fees. Make twice as many units and total variable cost roughly doubles. Per unit, variable cost stays about constant.

Total cost = fixed costs + variable costs. The split drives break-even analysis: contribution margin per unit (price − variable cost per unit) must cover the fixed costs before the firm makes a profit. Some costs are "semi-variable" (a phone plan with a base fee plus per-use charges) or "step" costs (you need a second machine only past a certain volume).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-weather-vs-climate',
    title: 'Weather vs climate',
    category: 'science',
    keywords: [
      'difference between weather and climate patterns', 'weather vs climate', 'short term atmosphere',
      'long term average', '30 year average', 'climate normals', 'forecast vs projection',
      'one cold winter', 'variability', 'climate change',
    ],
    content: `Weather is the state of the atmosphere at a particular place over a short period — hours to about two weeks. Temperature, rain, wind, humidity, cloud and storms right now or in the coming days are weather. It is chaotic and only predictable a week or so ahead.

Climate is the long-term statistical picture of weather for a region, usually the average and the range of variability over 30 years or more ("climate normals"). "The Sahara has a hot, dry climate" or "Vancouver has mild wet winters" are statements about climate, not about any single day.

A useful line: weather is what you get; climate is what you expect. Climate tells you to pack a coat for a Montreal January; weather tells you whether it will actually snow this Tuesday.

This is why a single cold snap or a record snowstorm does not disprove long-term global warming, and one hot day does not prove it. Climate change is a shift in the long-run averages and in the odds of extremes — measured over decades, not felt in one forecast.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-bond-yield-vs-coupon',
    title: 'Bond yield vs coupon rate',
    category: 'economics',
    keywords: [
      'difference between a bond yield and a coupon rate', 'yield vs coupon', 'face value par value',
      'current yield', 'yield to maturity', 'fixed interest payment', 'bond price moves inversely',
      'discount premium bond', 'YTM',
    ],
    content: `The coupon rate is fixed and set when the bond is issued. It is the annual interest the bond promises, stated as a percentage of the bond's face value (par, usually 1,000). A 5% coupon on a 1,000 bond pays 50 a year for the life of the bond, no matter what happens to its market price.

The yield is what an investor actually earns given the price they pay today, and it moves because bond prices move.
- Current yield = annual coupon ÷ current market price. Buy that 5% bond for 1,000 and the current yield is 5%; buy it for 900 and it is about 5.56%; buy it for 1,100 and it is about 4.55%.
- Yield to maturity (YTM) is the fuller measure: the total annualised return if you hold to maturity, counting every coupon plus the gain or loss between your purchase price and the face value repaid at the end.

Key relationship: bond prices and yields move in opposite directions. When market interest rates rise, existing bonds with lower coupons fall in price until their yield matches the new rates. A bond trading below par is "at a discount" (yield above coupon); above par is "at a premium" (yield below coupon); at par, yield equals coupon.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-wholesaler-vs-retailer',
    title: 'Wholesaler vs retailer',
    category: 'economics',
    keywords: [
      'difference between a wholesaler and a retailer', 'wholesaler vs retailer', 'distribution channel',
      'bulk buying', 'sells to businesses', 'sells to consumers', 'markup', 'supply chain',
      'middleman', 'not cash and carry or dropshipping specifically',
    ],
    content: `These are two links in the chain that moves goods from a manufacturer to the end customer.

A wholesaler (or distributor) buys goods in large quantities directly from manufacturers, stores them, breaks the bulk into smaller lots, and sells them on to businesses — mainly retailers, but also restaurants, offices and tradespeople. Wholesalers do not usually sell to the general public, they deal in cases and pallets rather than single items, they charge lower per-unit prices, and their customers arrange resale or their own use. Their profit comes from a modest markup on high volume.

A retailer buys goods (from wholesalers or straight from manufacturers) and sells them individually to final consumers for personal use, through shops, websites or catalogues. Retailers hold smaller, varied inventory, add a larger markup to cover storefront costs, staff and marketing, and provide customer-facing services like display, advice, returns and warranties.

Short chain: manufacturer → wholesaler → retailer → consumer. Some businesses collapse steps: warehouse clubs, factory outlets and many online sellers buy direct and sell direct, cutting out one middleman.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-supply-vs-demand',
    title: 'Supply vs demand',
    category: 'economics',
    keywords: [
      'difference between supply and demand', 'supply vs demand', 'law of demand', 'law of supply',
      'demand curve downward', 'supply curve upward', 'equilibrium price', 'shortage surplus',
      'buyers and sellers', 'shift versus movement',
    ],
    content: `Demand is the relationship between the price of a good and the quantity buyers are willing and able to purchase. The law of demand says that, all else equal, a higher price means a lower quantity demanded, so the demand curve slopes downward. Demand for the whole market shifts when incomes, tastes, population, expectations, or the prices of substitutes and complements change.

Supply is the relationship between the price of a good and the quantity sellers are willing to produce and offer. The law of supply says a higher price means a higher quantity supplied (more profit incentive, worth bringing higher-cost production online), so the supply curve slopes upward. Supply shifts when input costs, technology, the number of producers, taxes or subsidies, and expectations change. A bad harvest shifts the supply of wheat left, raising its price.

Where the two curves cross is the equilibrium: the price at which the quantity buyers want equals the quantity sellers offer. Above that price there is a surplus (pushing price down); below it there is a shortage (pushing price up). Demand is the buyers' side, supply is the sellers' side, and the price is what balances them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-etf-vs-mutual-fund',
    title: 'ETF vs mutual fund',
    category: 'economics',
    keywords: [
      'difference between an ETF and a mutual fund', 'ETF vs mutual fund', 'exchange traded fund',
      'trades intraday', 'priced once a day NAV', 'expense ratio', 'minimum investment',
      'tax efficiency', 'in-kind creation redemption', 'index fund',
    ],
    content: `Both pool many investors' money to hold a diversified basket of securities. The differences are in how you buy them and how they are structured.

A mutual fund is bought and sold directly with the fund company. Orders execute once per day after the market closes, all at that day's net asset value (NAV). Funds often have minimum initial investments, may charge sales loads, and you can buy exact dollar amounts. When other investors redeem, the manager may have to sell holdings, which can create taxable capital-gains distributions passed on to everyone still in the fund.

An ETF (exchange-traded fund) trades on a stock exchange like a share, so you buy and sell it through a brokerage at fluctuating prices throughout the day. There is generally no minimum beyond one share (or a fraction), usually no sales load, and a bid-ask spread instead. ETFs use an "in-kind" creation/redemption mechanism with large institutions that makes them more tax-efficient — they rarely distribute capital gains.

Both can be index-tracking or actively managed (passive-vs-active is a separate axis from ETF-vs-mutual-fund). Fees, measured by the expense ratio, are often lower for ETFs but the cheapest index mutual funds are competitive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-econ2-bull-vs-bear-economy',
    title: 'Bull vs bear — market versus economy',
    category: 'economics',
    keywords: [
      'difference between a bull and a bear economy', 'bull vs bear economy', 'bull market bear market',
      'sustained rising prices', '20 percent decline', 'investor sentiment', 'market versus economy',
      'leading indicator', 'recession', 'optimism pessimism',
    ],
    content: `"Bull" and "bear" describe a sustained direction plus the mood that goes with it — bull = rising and optimistic, bear = falling and fearful — but they are applied slightly differently to a market versus to the economy.

Applied to a market (stocks, crypto, housing), the terms are fairly precise: a bull market is a prolonged rise in prices, often dated from the last low; a bear market is conventionally a decline of 20% or more from a recent peak, driven by pessimism and selling. A drop of 10–20% is called a correction.

Applied to the economy, "bull" and "bear" are looser and really mean an expansion (growing GDP, rising employment, strong spending) versus a contraction or recession (falling output, rising unemployment).

The two do not have to line up, because markets are forward-looking and price in expectations. You can get a roaring bull market while unemployment is still high and the economy feels weak (2009–10, 2020–21), because investors expect recovery. And you can get a savage bear market in the middle of an apparent boom, as investors start pricing in a downturn they see coming. Stock prices are a leading indicator; economic data lags.`,
    createdAt: Date.now(),
  },
];
