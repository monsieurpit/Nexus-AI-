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
    keywords: ['GDP', 'inflation', 'monetary policy', 'macroeconomics', 'interest rates', 'central bank', 'unemployment', 'fiscal policy'],
    content: `Macroeconomics studies economy-wide phenomena. Gross Domestic Product (GDP) measures total economic output — the sum of all goods and services produced within a country in a year. GDP can be calculated by expenditure (C + I + G + NX: consumption + investment + government + net exports), income (wages + profits + rents + interest), or production. Real GDP adjusts for inflation; GDP per capita divides by population. Inflation is the general rise in price levels, measured by the Consumer Price Index (CPI). Moderate inflation (~2%) is targeted by central banks as healthy; hyperinflation destroys purchasing power (Weimar Germany, Zimbabwe). Unemployment is when people seeking work cannot find it; the natural rate includes frictional (between jobs) and structural (skills mismatch) unemployment. Monetary policy is conducted by central banks (Federal Reserve, ECB, Bank of Canada): adjusting interest rates and the money supply to target inflation and employment. Lower interest rates stimulate borrowing and spending; higher rates cool inflation. Quantitative easing (QE) involves central banks buying assets to inject money. Fiscal policy uses government spending and taxation to influence aggregate demand.`,
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
];
