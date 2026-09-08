import { KnowledgeItem } from '../../types';

// Batch 88 (economics concepts, deeper — batches 11, 26, 60 covered the rest).
// nexus-4b misses: "what is a black market" refused and leaked its retrieval
// context ("the context doesn't say anything about a black market... it talks
// about stock exchanges"); "the multiplier effect" answered about the names of
// large numbers (million, billion, trillion); "the paradox of thrift" answered
// about thrift-store shopping and fast fashion; "recession and a depression"
// defined depression as a mood disorder; "moral hazard" started with moral
// relativism; "a Giffen good" got the mechanism backwards.
export const ECONOMICS_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-black-market',
    title: 'What a Black Market Is',
    category: 'Economics',
    keywords: [
      'what is a black market', 'underground economy shadow economy', 'illegal trade of goods and services', 'why do black markets form',
      'black market currency exchange price controls', 'smuggling tax evasion black market', 'downsides of the black market',
    ],
    content: `A black market (also called the underground, shadow, or informal economy) is the trade of goods and services outside the law. It exists in two forms: trade in things that are themselves illegal (drugs, weapons, endangered wildlife, counterfeit goods, stolen property, trafficked labour), and legal goods traded in an illegal way to evade taxes, tariffs, price controls, rationing, licensing, or sanctions (undeclared cash work, smuggled cigarettes and alcohol, unlicensed street vending, and black-market money-changing where a government fixes the official exchange rate above the real one). Black markets emerge wherever the legal market cannot or will not meet demand, or where taxes and regulation make the legal option far more costly. They are hard to measure but are estimated at anywhere from a few percent of GDP in wealthy countries to a third or more in some developing economies. The costs: no consumer protection or recourse, lost public revenue, unsafe products, and a revenue stream for organised crime.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-multiplier-effect',
    title: 'What the Multiplier Effect Is',
    category: 'Economics',
    keywords: [
      'what is the multiplier effect', 'fiscal multiplier government spending', 'marginal propensity to consume multiplier formula', 'money re-spent successive rounds',
      'keynesian stimulus multiplier', 'when are multipliers large or small', 'money multiplier banking reserves',
    ],
    content: `The multiplier effect is the principle that an initial injection of spending into an economy produces a larger total increase in economic activity, because that money is re-spent in successive rounds. It has nothing to do with the names of large numbers. If the government spends $1 billion building a bridge, the workers and suppliers who receive that income spend part of it (say 70%) on food, rent, and goods; those shopkeepers and landlords then spend part of what they received; and so on, each round smaller than the last. The total boost depends on the "marginal propensity to consume" (MPC) — the fraction of extra income people spend rather than save: the simple multiplier is roughly 1 / (1 − MPC). Multipliers are larger when there is spare capacity and unemployment, interest rates are near zero, and the money goes to cash-constrained people who will spend it; they are smaller, even below 1, at full employment or when spending leaks into imports and savings. The idea, from Keynes, underpins the case for fiscal stimulus in recessions. A related "money multiplier" describes how bank reserves, lent out and redeposited, expand the money supply.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-paradox-of-thrift',
    title: 'What the Paradox of Thrift Is',
    category: 'Economics',
    keywords: [
      'what is the paradox of thrift', 'paradox of saving keynes', 'everyone saves more spending falls recession', 'fallacy of composition economics',
      'why saving in a downturn can shrink the economy', 'aggregate demand private saving', 'thrift paradox criticism',
    ],
    content: `The paradox of thrift (or paradox of saving), associated with John Maynard Keynes, is the idea that although it is sensible for one household to save more, if everyone tries to save more at the same time — especially in a recession — total spending across the economy falls. Businesses then earn less, cut investment and jobs, incomes drop, and the economy contracts. As a result, the total amount actually saved may not rise at all, and can even fall, because people end up saving a larger share of a smaller income. It has nothing to do with buying secondhand clothes. It is an example of a "fallacy of composition": what is true for an individual is not necessarily true for everyone doing it together. The paradox is used to argue that in a downturn the government should spend more or cut interest rates to offset the surge in private saving. Economists from other schools push back, arguing that higher saving finances investment and that the paradox only holds when the economy is demand-constrained and monetary policy cannot respond.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-recession-vs-depression-econ',
    title: 'The Difference Between a Recession and a Depression',
    category: 'Economics',
    keywords: [
      'what is the difference between a recession and a depression', 'two consecutive quarters falling gdp recession', 'depression severe prolonged downturn',
      'great depression 1930s gdp fell 30 percent unemployment 25', 'is there an official definition of depression', 'economic depression not mood disorder',
    ],
    content: `A recession is a significant, widespread decline in economic activity lasting more than a few months, showing up across GDP, employment, industrial production, incomes and retail sales. A common rule of thumb is two consecutive quarters of falling real GDP, though official arbiters like the US National Bureau of Economic Research use a broader judgement of depth, breadth and duration. A depression is a much more severe and prolonged version of the same thing: a very large fall in output (often more than 10%), unemployment in the double digits sustained for years, falling prices (deflation), and widespread failures of businesses and banks. There is no agreed numerical threshold — a depression is essentially an exceptionally deep and long recession. The benchmark is the Great Depression of the 1930s: in the US, GDP dropped roughly 30%, unemployment reached about 25%, and full recovery took most of the decade. (This is the economic sense of "depression," unrelated to the clinical mood disorder of the same name.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-moral-hazard',
    title: 'What Moral Hazard Is',
    category: 'Economics',
    keywords: [
      'what is moral hazard', 'taking more risk when someone else bears the cost', 'too big to fail bank bailout moral hazard',
      'insurance moral hazard less careful', 'moral hazard vs adverse selection', 'asymmetric information moral hazard',
    ],
    content: `Moral hazard is the tendency of a person or organisation to take on more risk, or to take less care, when they are shielded from the consequences because someone else will bear the cost. It has nothing to do with moral relativism. Examples: a large bank makes reckless bets expecting the government to bail it out if it fails ("too big to fail"); a person with full insurance drives less carefully, leaves their bike unlocked, or over-uses covered medical services; an employee on a fixed salary puts in less effort; a borrower takes bigger risks with money that is guaranteed by a third party. It arises from asymmetric information — the party carrying the risk cannot fully observe or control the other party's behaviour after the deal is struck. Moral hazard is a central concern in insurance design, banking regulation (capital requirements, "bail-in" rules), and contracts (deductibles, co-payments, performance pay). It is distinct from "adverse selection," which happens before a deal is made, when the riskiest individuals are the most eager to buy insurance or borrow.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-giffen-good',
    title: 'What a Giffen Good Is',
    category: 'Economics',
    keywords: [
      'what is a giffen good', 'demand rises when price rises law of demand exception', 'inferior staple food large budget share',
      'income effect outweighs substitution effect giffen', 'giffen good vs veblen good', 'rice potatoes giffen good example',
    ],
    content: `A Giffen good is a good for which demand RISES when its price RISES, and falls when its price falls — the opposite of the normal law of demand. The mechanism: it is a cheap, inferior staple food that makes up a large share of a poor household's budget. When the price of that staple goes up, the household is effectively poorer and can no longer afford the more expensive foods (meat, vegetables) it had been eating alongside the staple — so, to get enough calories, it actually buys EVEN MORE of the now-more-expensive staple. The "income effect" (feeling poorer, needing the cheap calories) outweighs the "substitution effect" (wanting to switch away from the dearer good). The classic hypothetical is bread or potatoes for the Victorian poor; there is some real evidence from rice in Hunan and wheat in poor provinces of China. Giffen goods are extremely rare and require very specific conditions. They should not be confused with a Veblen good — a luxury whose demand rises with price because a higher price signals status.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-normal-vs-inferior-good',
    title: 'The Difference Between a Normal Good and an Inferior Good',
    category: 'Economics',
    keywords: [
      'what is the difference between a normal good and an inferior good', 'income elasticity of demand positive negative', 'buy more as income rises normal good',
      'inferior good switch to preferred alternative', 'instant noodles bus travel inferior good', 'inferior does not mean low quality',
    ],
    content: `A normal good is one that people buy MORE of as their income rises (and less of when income falls). Most goods are normal: restaurant meals, new cars, holidays, brand-name clothing, better cuts of meat. An inferior good is one that people buy LESS of as their income rises, because they switch to a preferred alternative they can now afford. Classic examples: instant noodles, generic supermarket brands, canned or boxed food, bus and subway travel (people move to a car), boxed wine, second-hand goods. "Inferior" here is a technical term about the relationship with income — it does not mean the good is low quality. The distinction is measured by "income elasticity of demand" — the percentage change in quantity demanded divided by the percentage change in income: it is positive for normal goods and negative for inferior goods. A Giffen good is a rare special case of an inferior good where demand also rises when the price rises; a Veblen good is a luxury whose demand rises with price for status reasons.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-comparative-advantage-detail',
    title: 'What Comparative Advantage Is',
    category: 'Economics',
    keywords: [
      'what is comparative advantage', 'ricardo 1817 gains from trade', 'comparative vs absolute advantage', 'lower opportunity cost specialization',
      'why trade benefits both countries even if one is better at everything', 'england portugal cloth wine', 'basis of free trade theory',
    ],
    content: `Comparative advantage, set out by David Ricardo in 1817, explains why two parties — countries, firms, or people — both gain from trade even when one of them is more efficient at producing everything. The key is opportunity cost, not absolute skill. A party has a comparative advantage in whatever it can produce at the lowest opportunity cost — that is, by giving up the least amount of other output. Each party then specialises in the good where its opportunity cost is lowest and trades for the rest, and total production rises, leaving both better off. Ricardo's example: Portugal can make both cloth and wine with fewer hours than England, but it gives up relatively less wine to make cloth... actually the reverse — Portugal's edge is bigger in wine, England's disadvantage is smaller in cloth, so Portugal makes wine, England makes cloth, and both consume more of both. This is the core theoretical argument for free trade. Real-world qualifications: transition costs fall on displaced workers and industries, and factors like transport costs, economies of scale, and strategic concerns complicate the simple model.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-consumer-producer-surplus',
    title: 'Consumer Surplus and Producer Surplus',
    category: 'Economics',
    keywords: [
      'what is consumer surplus', 'willingness to pay minus price paid', 'producer surplus price minus cost', 'total welfare gains from trade graph',
      'consumer surplus triangle demand curve', 'how taxes and monopoly reduce surplus', 'deadweight loss lost surplus',
    ],
    content: `Consumer surplus is the benefit a buyer gets from a purchase beyond what they paid: the difference between the maximum they would have been willing to pay and the actual market price. If you would have paid $50 for a pair of shoes and buy them for $30, your consumer surplus is $20. Across a whole market, it is the area on a supply-and-demand graph between the demand curve and the price line. Producer surplus is the mirror image for sellers: the difference between the price they receive and the lowest price they would have been willing to accept (roughly their cost), shown as the area between the price line and the supply curve. Added together, consumer plus producer surplus measures the total economic welfare, or "gains from trade," created by a market. Anything that pushes the market away from the competitive equilibrium quantity — a tax, a price control, a monopoly restricting output — shrinks the combined surplus; the value that vanishes entirely (not just transferred from one party to another) is the "deadweight loss."`,
    createdAt: Date.now(),
  },
];
