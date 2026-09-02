import { KnowledgeItem } from '../../types';

export const ECONOMICS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-economics-supply-demand',
    title: 'Supply, Demand, and Market Equilibrium',
    category: 'Economics',
    keywords: ['supply', 'demand', 'economics', 'market', 'price', 'equilibrium', 'elasticity', 'surplus', 'scarcity'],
    content: `Economics studies how individuals, firms, and governments allocate scarce resources. Supply and demand is the fundamental model of markets. The law of demand: as price rises, quantity demanded falls, and vice versa (ceteris paribus). The demand curve slopes downward. The law of supply: as price rises, quantity supplied increases. The supply curve slopes upward. Market equilibrium occurs at the intersection of supply and demand, where quantity supplied equals quantity demanded. If price is above equilibrium, a surplus drives price down; below equilibrium, a shortage drives price up. Elasticity measures responsiveness: price elasticity of demand = % change in quantity / % change in price. Elastic demand (>1) responds strongly to price (luxuries); inelastic demand (<1) responds weakly (necessities like insulin). Consumer surplus is the difference between willingness to pay and actual price; producer surplus is the difference between price received and minimum acceptable. Together they form total economic welfare. Market failures occur when markets fail to allocate resources efficiently: externalities (pollution costs borne by others), public goods (non-excludable, non-rival), information asymmetry, and monopoly power.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-economics-macroeconomics-gdp',
    title: 'Macroeconomics: GDP, Inflation, and Monetary Policy',
    category: 'Economics',
    keywords: ['GDP', 'inflation', 'monetary policy', 'macroeconomics', 'interest rates', 'central bank', 'unemployment', 'fiscal policy', 'recession'],
    content: `Macroeconomics studies economy-wide phenomena. Gross Domestic Product (GDP) measures total economic output — the sum of all goods and services produced within a country in a year. GDP can be calculated by expenditure (C + I + G + NX: consumption + investment + government + net exports), income (wages + profits + rents + interest), or production. Real GDP adjusts for inflation; GDP per capita divides by population. Inflation is the general rise in price levels, measured by the Consumer Price Index (CPI). Moderate inflation (~2%) is targeted by central banks as healthy; hyperinflation destroys purchasing power (Weimar Germany, Zimbabwe). Unemployment is when people seeking work cannot find it; the natural rate includes frictional (between jobs) and structural (skills mismatch) unemployment. Monetary policy is conducted by central banks (Federal Reserve, ECB, Bank of Canada): adjusting interest rates and the money supply to target inflation and employment. Lower interest rates stimulate borrowing and spending; higher rates cool inflation. Quantitative easing (QE) involves central banks buying assets to inject money. Fiscal policy uses government spending and taxation to influence aggregate demand. A recession is commonly defined as two consecutive quarters of falling real GDP, though official calls (e.g. by the NBER in the US) also weigh employment, income, and industrial output. Recessions are typically triggered by demand shocks (a sudden drop in spending), supply shocks (an oil crisis, a pandemic), or the bursting of an asset bubble (2008's housing crash), and they're usually fought with the same two levers: central banks cutting interest rates, and governments increasing fiscal spending, to push demand back up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-economics-behavioural-economics',
    title: 'Behavioural Economics',
    category: 'Economics',
    keywords: ['behavioural economics', 'Kahneman', 'bias', 'nudge', 'prospect theory', 'decision making', 'psychology', 'rational', 'heuristics'],
    content: `Behavioural economics integrates psychology into economic analysis, showing that people systematically deviate from rational decision-making. Daniel Kahneman and Amos Tversky pioneered prospect theory: people weigh losses more heavily than equivalent gains (loss aversion), and evaluate outcomes relative to a reference point. System 1 thinking is fast, automatic, and intuitive; System 2 is slow, deliberate, and rational (Kahneman's 'Thinking, Fast and Slow'). Cognitive biases distort decision-making: anchoring (over-relying on first information), availability heuristic (overweighting memorable events), confirmation bias (seeking information that confirms existing beliefs), framing effects (choices change depending on how options are presented), and the endowment effect (overvaluing what we own). Hyperbolic discounting means people prefer smaller, sooner rewards over larger, later ones — explaining procrastination and low savings rates. Nudge theory (Thaler and Sunstein) designs choice architectures to guide better decisions without restricting freedom — opt-out pension enrolment dramatically increases savings rates. Behavioural economics informs public policy, product design, and financial planning.`,
    createdAt: Date.now(),
  },

  {
    id: 'kb-econ-black-swan',
    title: 'Black Swan Events & Antifragility',
    category: 'economics',
    keywords: [
      'black swan',
      'black swan event',
      'nassim taleb',
      'antifragile',
      'tail risk',
      'unpredictable event',
      'rare event',
    ],
    content: `A **black swan event**, a term popularized by Nassim Nicholas Taleb in his 2007 book of the same name, is an extremely rare, unpredictable event with severe, widespread consequences — one that seems obvious and explainable only in hindsight.
1. **Three defining traits**: (1) It's an outlier — nothing in the past reliably predicted it was possible. (2) It carries an extreme impact when it happens. (3) After the fact, people concoct explanations that make it seem predictable and expected all along (hindsight bias).
2. **The name's origin**: Europeans assumed all swans were white for centuries — a reasonable belief based on every swan anyone had ever seen — until black swans were discovered in Australia in 1697, instantly falsifying an assumption built on total historical experience. Taleb used this to illustrate how a single unprecedented observation can upend seemingly rock-solid conclusions.
3. **Real-world examples commonly cited**: The 2008 global financial crisis, the September 11 attacks, the rise of the internet, and the COVID-19 pandemic — all events that most models and institutions considered essentially impossible or negligible in probability beforehand, yet reshaped the world.
4. **Antifragility**: In a follow-up book, Taleb introduced "antifragile" — systems that don't just resist shocks (robust) but actually get STRONGER from volatility, randomness, and stress, the way a muscle grows from the stress of a workout, or a well-diversified portfolio can benefit from market chaos that wipes out overleveraged competitors.
5. **Practical takeaway**: Because black swans are by definition unpredictable, the strategy isn't to try to forecast them — it's to build systems (financial, organizational, personal) with enough slack and optionality to survive, or even benefit from, being wrong about what "normal" looks like.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-econ-startup-saas-pricing',
    title: 'Startup & SaaS Business Strategy: Pricing, Revenue, and Growth',
    category: 'economics',
    keywords: [
      'pricing strategy',
      'saas',
      'startup',
      'revenue',
      'profit margin',
      'monetization',
      'business model',
      'venture capital',
      'valuation',
      'cash flow',
      'market share',
      'roi',
    ],
    content: `Common pricing and growth strategy for startups, especially SaaS (Software as a Service):
1. **Pricing models**: Flat-rate (one price, all features), tiered (Basic/Pro/Enterprise — the most common SaaS approach, since it lets a low tier capture price-sensitive users while a high tier captures high-willingness-to-pay customers), usage-based (pay per API call/seat/GB — scales with the customer's own usage), and freemium (a free tier drives adoption and word-of-mouth, converting a small percentage to paid over time).
2. **How to actually set the number**: Value-based pricing (charge based on the value delivered to the customer, not your own cost) consistently outperforms cost-plus pricing for software, since the marginal cost of serving one more customer is near zero. A common early-stage approach is to interview target customers about willingness-to-pay, then price at the low end of what serious buyers say they'd pay — undercharging early and raising prices later is far easier than overcharging and losing trust.
3. **Key metrics investors and founders track**: MRR/ARR (Monthly/Annual Recurring Revenue), churn rate (% of customers who cancel), CAC (Customer Acquisition Cost), LTV (Customer Lifetime Value) — a healthy SaaS business wants LTV:CAC of at least 3:1, and revenue, profit margin, and cash flow (a profitable business can still die from running out of cash if customers pay slowly and expenses are due now).
4. **Funding & growth**: Venture capital trades equity for capital across funding rounds (seed, Series A, B, C...), each with a company valuation attached; bootstrapped startups grow from revenue instead, trading a slower growth rate for keeping full ownership and not answering to investors. Market share is a company's percentage of total sales in its industry — growing it can matter more than short-term profit in the early land-grab phase of a new market.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-economics-gig-economy',
    title: 'The Gig Economy: What It Is and the Actual Tradeoffs',
    category: 'Economics',
    keywords: ['gig economy', 'what is the gig economy', 'gig work', 'independent contractor vs employee', 'freelance economy', 'Uber Lyft DoorDash economy'],
    content: `The "gig economy" refers to a labor market built around short-term, flexible, task-based work — "gigs" — rather than traditional long-term employment with a single employer. It includes app-based platform work (Uber and Lyft drivers, DoorDash and Instacart delivery workers, TaskRabbit taskers) as well as a much older tradition of freelance and contract work (freelance writers, graphic designers, independent consultants, contract programmers) that existed long before smartphone apps, though the term "gig economy" is most associated with the platform-based version that grew rapidly through the 2010s. The core economic distinction that matters most: gig workers are typically classified as independent contractors, not employees — this is the single biggest structural difference and the source of most controversy around gig work. Employees generally get legal protections and benefits an employer is required to help fund: minimum wage guarantees, overtime pay, employer-subsidized health insurance, unemployment insurance, workers' compensation for injuries, and paid time off. Independent contractors generally get none of these automatically — they set (or are offered) their own gig-by-gig pay, cover their own taxes in full (including the employer's usual share of payroll taxes), get no employer-subsidized benefits, and have far less job security, but in exchange get real flexibility: choosing when, how much, and whether to work at all, with no fixed schedule or single boss. Proponents highlight the flexibility and low barrier to entry (someone can start driving or delivering with minimal setup, valuable as supplemental or flexible income). Critics highlight that this flexibility often comes at the cost of unpredictable income, no safety net if work dries up or they're injured on the job, and that some workers who function essentially like full-time employees (a similar schedule, real dependence on one platform for income) don't get employee protections despite that reality — this exact question (whether certain gig workers should legally be reclassified as employees) has been the subject of major legal and ballot fights in multiple US states and countries, with outcomes still varying significantly by jurisdiction as of now.`,
    createdAt: Date.now(),
  },
];
