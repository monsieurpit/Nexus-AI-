import { KnowledgeItem } from '../../types';

// Batch 60 (economics concepts) gap-fills. Strong category (~18/25). Live
// misses on nexus-4b: "what is the invisible hand" -> "'invisible' status means
// you're browsing online but don't look available... hiding on Discord";
// "what is a public good" -> "basically, like pollution costs" (that's a
// negative externality); "what is the unemployment rate actually measuring" ->
// never said what the rate is; "inflation versus cost of living" -> conflated
// cost of living with purchasing power parity.
export const ECONOMICS_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-invisible-hand',
    title: 'What the Invisible Hand Is',
    category: 'Economics',
    keywords: [
      'what is the invisible hand', 'adam smith invisible hand', 'how do markets coordinate without a planner',
      'self interest benefits society', 'wealth of nations invisible hand', 'free market invisible hand meaning',
    ],
    content: `"The invisible hand" is a metaphor from Adam Smith (in "The Wealth of Nations," 1776) for how individuals each pursuing their own self-interest in a competitive market can, without intending to, produce outcomes that benefit society as a whole. Smith's example: you get your dinner not because the butcher, brewer and baker care about you, but because it's in their interest to sell to you — and prices, set by supply and demand, act as signals that coordinate the decisions of millions of producers and consumers so that goods get made and distributed roughly where they're wanted, with no central planner directing anyone. It's the foundational idea of free-market economics: decentralised, self-interested activity can be self-organising and efficient. Its recognised limits are "market failures" — situations where self-interest does NOT lead to good outcomes: pollution and other externalities, monopolies, public goods that no one will pay for, and cases where buyers and sellers have very unequal information. (It has nothing to do with an "invisible" status online.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-public-good',
    title: 'What a Public Good Is',
    category: 'Economics',
    keywords: [
      'what is a public good', 'non-excludable non-rival', 'free rider problem', 'examples of public goods',
      'why does government provide public goods', 'public good vs private good', 'is a road a public good',
    ],
    content: `In economics a public good has two properties: it is NON-EXCLUDABLE (you can't practically stop people who didn't pay from using it) and NON-RIVAL (one person using it doesn't reduce the amount available to anyone else). Classic examples: national defence, clean air, a lighthouse, street lighting, flood defences, basic scientific research, and freely broadcast radio. The problem is the "free-rider" problem — since you get the benefit whether you contribute or not, everyone has an incentive to let others pay, so a private market will underprovide or not provide these goods at all. That's why they're typically funded through taxation and provided by government. (Pollution is NOT a public good — it's a negative externality, a cost imposed on third parties; the clean environment that pollution damages can be thought of as a public good.) Goods can be partly public: a park is non-rival until it gets crowded; cable TV is non-rival but excludable ("club goods"); fish stocks are non-excludable but rival ("common resources," prone to overuse).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-unemployment-rate',
    title: 'What the Unemployment Rate Actually Measures',
    category: 'Economics',
    keywords: [
      'what is the unemployment rate actually measuring', 'how is the unemployment rate calculated', 'who counts as unemployed',
      'what is the labor force participation rate', 'discouraged workers', 'u-3 vs u-6 unemployment', 'why does unemployment fall when people stop looking',
    ],
    content: `The headline unemployment rate (in the US, "U-3") is: the number of people who are UNEMPLOYED, divided by the LABOUR FORCE. To be counted as "unemployed" you must be (1) without a job, (2) available to work, and (3) actively looking for work in the past few weeks. The "labour force" is the unemployed plus the employed. Everyone else — students, retirees, full-time carers, people who have given up looking ("discouraged workers"), and anyone not searching — is "not in the labour force" and does not appear in the rate at all. This is why the rate has quirks: if a job market gets so bad that people stop searching, the measured unemployment rate can actually FALL even though fewer people have jobs, because those people left the labour force. To see the fuller picture, economists also watch the labour-force participation rate (share of the working-age population in the labour force), the employment-to-population ratio, and broader measures like "U-6," which adds discouraged workers and people stuck in part-time jobs who want full-time.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inflation-vs-cost-of-living',
    title: 'Inflation vs Cost of Living',
    category: 'Economics',
    keywords: [
      'what is inflation versus cost of living', 'inflation vs cost of living', 'is a cost of living increase the same as inflation',
      'why is my city expensive but inflation is low', 'cost of living index', 'does inflation raise the cost of living',
    ],
    content: `INFLATION is a RATE — how fast the general level of prices is RISING over time, usually stated as a percentage per year and measured by an index like the CPI (Consumer Price Index). "Inflation was 3% last year" means a typical basket of goods costs 3% more than it did a year ago. COST OF LIVING is a LEVEL — how much money you actually need, right now, to afford a given standard of living (housing, food, transport, taxes) in a particular place. It's used to compare cities or countries and to adjust salaries and pensions. The two are related but not the same: inflation raises the cost of living over time, but a city can have a very HIGH cost of living with LOW inflation (expensive but stable, like Zurich), or a LOW cost of living with HIGH inflation (cheap overall but prices rising fast, like some emerging economies during a currency crisis). A "cost-of-living adjustment" (COLA) to wages is meant to keep purchasing power constant by matching the local inflation rate.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-supply-and-demand',
    title: 'What Supply and Demand Is',
    category: 'Economics',
    keywords: [
      'what is supply and demand', 'supply and demand curves', 'what is market equilibrium', 'what causes prices to rise',
      'why does a shortage push prices up', 'demand curve slopes down', 'what shifts a supply or demand curve',
    ],
    content: `Supply and demand is the basic model of how prices and quantities are set in a competitive market. The DEMAND curve slopes downward: as a good's price falls, buyers want more of it; as the price rises, they want less (and substitutes look better). The SUPPLY curve slopes upward: at a higher price, producers are willing and able to make and sell more. The market settles at the price where the two curves cross — the EQUILIBRIUM — where the quantity people want to buy exactly matches the quantity producers want to sell. If the price is above equilibrium there's a surplus (unsold goods) that pushes the price down; below equilibrium there's a shortage that bids the price up. The whole curves can SHIFT: demand rises with higher incomes, more buyers, a change in tastes, or a rise in the price of substitutes; supply rises with cheaper inputs, better technology, or more producers. A shift in either curve moves the equilibrium price and quantity — for example, a bad harvest (supply falls) raises the price and lowers the quantity traded.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tariff-who-pays',
    title: 'What a Tariff Is and Who Pays It',
    category: 'Economics',
    keywords: [
      'what is a tariff and who pays it', 'does the exporting country pay the tariff', 'how do tariffs raise prices',
      'purpose of a tariff', 'tariff vs quota', 'do tariffs protect domestic jobs', 'who really pays for tariffs',
    ],
    content: `A tariff is a tax that a government charges on goods coming into the country. Legally and practically it is paid to the government by the IMPORTER — the domestic company bringing the goods across the border — at the time of import. Despite political claims that "the other country pays," the exporting country does not write the cheque; instead the importing firm passes most or all of the extra cost on to its customers as higher prices, so studies of recent tariffs find the burden falls largely on consumers and businesses in the country that imposed them. Purposes of a tariff: to make imported goods more expensive so domestic producers can compete ("protectionism"), to raise government revenue (its main historical role), to pressure or retaliate against another country, or to protect an "infant industry." Downsides: higher prices and less choice for consumers, retaliation (a trade war), reduced overall efficiency, and protected industries that stay uncompetitive. A "quota" is a related tool that limits the QUANTITY of imports rather than taxing them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-monopoly',
    title: 'What a Monopoly Is and Why It Is a Problem',
    category: 'Economics',
    keywords: [
      'what is a monopoly and why is it a problem', 'why are monopolies bad', 'antitrust law', 'what is a natural monopoly',
      'monopoly vs oligopoly vs monopsony', 'deadweight loss monopoly', 'is it illegal to be a monopoly',
    ],
    content: `A monopoly is a market with a single seller of a product or service that has no close substitute, so buyers have nowhere else to go. Because a monopolist doesn't face competition, it can raise the price and cut the quantity it supplies to maximise its own profit — customers pay more and get less, and some who would have bought at a competitive price are priced out entirely (economists call this lost mutually-beneficial trade a "deadweight loss"). Monopolies also tend to under-invest in quality and innovation, since there's no rival forcing them to improve, and they can use their power to keep new competitors out. Governments respond with "antitrust" / competition law — blocking mergers that would create too much concentration, breaking up or fining firms that abuse a dominant position, and regulating prices of "natural monopolies" (utilities like water and electricity grids, where one network is genuinely the cheapest way to serve everyone). Being big isn't itself illegal in most systems; abusing market power is. Related terms: oligopoly (a few dominant sellers), monopsony (a single dominant buyer, e.g. one big employer in a town).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-subsidy',
    title: 'What a Subsidy Is',
    category: 'Economics',
    keywords: [
      'what is a subsidy', 'how do subsidies work', 'examples of government subsidies', 'why do governments subsidize industries',
      'agricultural subsidies', 'fossil fuel subsidies', 'subsidy vs tax break', 'do subsidies distort markets',
    ],
    content: `A subsidy is financial support the government gives to producers or consumers to lower a price, encourage an activity, or keep an industry viable. Forms: direct cash grants, tax breaks and credits, low-interest or guaranteed loans, government purchases at a set price ("price supports"), and cheap access to public resources. Common examples: farm subsidies, fossil-fuel subsidies, subsidies for renewable energy and electric cars, public transport, housing assistance, and university tuition support. Governments use them to protect strategic or "infant" industries, ensure a domestic food or energy supply, promote goods with wider social benefits (vaccines, education, green tech), support jobs in struggling regions, or cushion consumers from high prices. Criticisms: subsidies cost taxpayers money, tend to keep inefficient producers alive, can be captured by well-connected interests, distort trade (a frequent source of WTO disputes), and are politically very hard to remove once in place. A subsidy is essentially the mirror image of a tax.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stagflation',
    title: 'What Stagflation Is',
    category: 'Economics',
    keywords: [
      'what is stagflation', 'stagflation 1970s', 'high inflation and high unemployment at the same time', 'phillips curve stagflation',
      'oil shock stagflation', 'why is stagflation hard to fix', 'who coined the term stagflation',
    ],
    content: `Stagflation is the painful combination of high INFLATION, STAGNANT (or negative) economic growth, and high UNEMPLOYMENT all at once. The name blends "stagnation" and "inflation" and was coined by the British politician Iain Macleod in 1965. It was considered nearly impossible before the 1970s, because the prevailing "Phillips curve" idea held that inflation and unemployment traded off against each other — you got one OR the other. The classic episode was the 1970s in the US and much of the West, triggered mainly by the 1973 and 1979 oil-price shocks (which raised costs across the economy while cutting output) on top of years of loose monetary policy. Stagflation is hard to fight because the usual tools conflict: raising interest rates and cutting spending to bring down inflation deepens the recession and unemployment, while stimulating the economy to fight unemployment stokes inflation. The 1970s stagflation was eventually broken by US Federal Reserve chair Paul Volcker, who pushed interest rates to nearly 20% around 1980–81, crushing inflation but causing a severe recession first.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inverted-yield-curve',
    title: 'What an Inverted Yield Curve Is',
    category: 'Economics',
    keywords: [
      'what is a recession indicator like an inverted yield curve', 'what is an inverted yield curve', 'why does the yield curve invert before a recession',
      'short term vs long term bond yields', 'is an inverted yield curve always a recession signal', 'yield curve inversion history',
    ],
    content: `A "yield curve" plots the interest rate (yield) on government bonds against how long until they mature. Normally it slopes UP: you get paid more to lock your money away for 10 years than for 3 months, as compensation for the extra time and risk. An INVERTED yield curve is the abnormal situation where SHORT-term yields are HIGHER than long-term yields. It usually happens for two reasons at once: the central bank has raised short-term rates sharply to fight inflation, and investors, expecting the economy to weaken and rates to be cut later, rush to buy long-term bonds now to lock in today's yields — which bids their prices up and pushes their yields down below the short end. Historically, an inversion of the US 10-year vs 3-month (or 10-year vs 2-year) spread has preceded almost every recession since the 1950s, typically by 6 to 24 months, making it one of the most closely watched signals — though it has given the odd false alarm and doesn't tell you how bad or exactly when.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-purchasing-power-parity',
    title: 'What Purchasing Power Parity Is',
    category: 'Economics',
    keywords: [
      'what is purchasing power parity', 'ppp vs market exchange rate', 'big mac index', 'why is china bigger than the us in ppp terms',
      'how do you compare living standards between countries', 'ppp adjusted gdp', 'why are prices lower in poorer countries',
    ],
    content: `Purchasing power parity (PPP) is the exchange rate at which a given basket of goods and services would cost the same amount in two countries. It's used instead of the market exchange rate when comparing economies and living standards, because market exchange rates are swung around by trade flows, investment and speculation and don't reflect that many things — rent, haircuts, restaurant meals, bus fares, locally grown food — are simply cheaper in lower-wage countries and aren't traded internationally. So converting a poorer country's GDP at the market rate understates how much its people can actually buy; converting it at PPP gives a fairer picture. That's why, measured at PPP, China's economy is larger than the United States', even though at market exchange rates it's smaller. A light, memorable version is The Economist's "Big Mac Index," which compares the price of a Big Mac across countries to see which currencies look over- or under-valued. PPP is imperfect — the "right" basket is debatable, quality differs, and transport and taxes get in the way — but it's the standard way to compare real incomes across borders.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gdp-vs-gnp',
    title: 'GDP vs GNP (GNI)',
    category: 'Economics',
    keywords: [
      'what is gdp versus gnp', 'gdp vs gni', 'difference between gross domestic product and gross national product',
      'why is irelands gdp higher than its gni', 'which is better gdp or gnp', 'income earned abroad gdp gnp',
    ],
    content: `GDP (Gross Domestic Product) measures the value of all goods and services produced WITHIN a country's borders in a period, regardless of who owns the factories or does the work. GNP (Gross National Product), now usually called GNI (Gross National Income), measures the income earned by a country's RESIDENTS AND FIRMS wherever it's earned — so it adds income they earn abroad and subtracts income that foreigners earn inside the country. For most countries the two numbers are close. They diverge where a lot of activity is foreign-owned: Ireland's GDP is far higher than its GNI because huge profits are produced by US-headquartered multinationals based there but flow out to foreign owners, so GDP overstates how well-off Irish residents actually are. Conversely, a country whose citizens work heavily abroad and send money home (remittances) can have GNI above GDP. GDP is the standard headline measure of the size of an economy and its growth; GNI is used for things like ranking national incomes and deciding eligibility for development aid.`,
    createdAt: Date.now(),
  },
];
