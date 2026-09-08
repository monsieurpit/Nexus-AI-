import { KnowledgeItem } from '../../types';

// Batch 45 (money & banking) gap-fills. Live misses on nexus-4b:
// "how is money created" -> "central banks print money... 401k" (missed that
// most money is created by commercial banks lending); "what is the money
// supply" -> "whatever a central bank decides to print"; "hyperinflation" -> a
// Zimbabwe web dump with no cause; "government bond auction" -> just "governments
// issue bonds"; "subprime mortgage" -> a crisis-timeline web dump, never
// defined; "what is an interest rate" -> jumped straight to APR.
export const MONEY_BANKING_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-how-money-created',
    title: 'How Money Is Created',
    category: 'Economics',
    keywords: [
      'how is money created', 'where does money come from', 'do banks create money', 'how do banks create money',
      'does the government print all the money', 'loans create deposits', 'money creation explained',
    ],
    content: `Most money in a modern economy is NOT physical cash printed by the government — it's electronic bank deposits, and it is created mainly by ordinary commercial banks when they make loans. When a bank approves a mortgage or a business loan, it doesn't hand over someone else's savings; it simply credits the borrower's account with a new deposit, and that new deposit IS new money. ("Loans create deposits," not the other way round.) Repaying the loan destroys that money again. Banks are limited in how much they can do this by capital rules, the demand for loans, profitability, and the interest rate. The CENTRAL BANK creates a different, smaller kind of money: physical banknotes and coins, plus the electronic "reserves" that commercial banks hold with it. It influences the total money supply mainly by setting its policy interest rate (making borrowing cheaper or dearer), and in a crisis by "quantitative easing" — creating reserves to buy government bonds. So: central bank sets the conditions and makes base money; commercial banks create the bulk of the money by lending.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-money-supply',
    title: 'What the Money Supply Is',
    category: 'Economics',
    keywords: [
      'what is the money supply', 'what is m1 and m2', 'how is the money supply measured', 'what counts as money supply',
      'money supply and inflation', 'how much money is in the economy', 'monetary aggregates',
    ],
    content: `The money supply is the total amount of money circulating in an economy at a given time. It's measured in layers ("monetary aggregates"): M0 / the monetary base = physical cash in circulation plus the reserves commercial banks hold at the central bank; M1 = cash held by the public plus money in checking accounts and other easily spendable deposits; M2 = M1 plus savings accounts, small time deposits and retail money-market funds — money that's a little less liquid. Most of the money supply is bank deposits, not paper cash, and — as above — it's mostly created by banks lending, not by the central bank printing notes. Economists watch the money supply because, very roughly, if the amount of money grows much faster than the amount of goods and services (real output), you tend to get inflation; if it shrinks (as in the early 1930s), you can get a slump and deflation. The relationship is loose in the short run because the "velocity" of money (how often each unit is spent) also changes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hyperinflation-causes',
    title: 'What Causes Hyperinflation',
    category: 'Economics',
    keywords: [
      'what causes hyperinflation', 'why does hyperinflation happen', 'hyperinflation examples', 'weimar germany hyperinflation',
      'zimbabwe hyperinflation cause', 'how to stop hyperinflation', 'money printing hyperinflation',
    ],
    content: `Hyperinflation — inflation so fast that prices double in days or weeks and money becomes almost worthless — is nearly always caused by a government printing (creating) enormous amounts of money to pay for spending it cannot fund by taxes or genuine borrowing. This usually follows a shock that wrecks the state's finances and credibility: losing a war and owing crushing reparations (Weimar Germany, 1921–23), a collapse of production or the loss of a major export, revolution or the breakup of a country (post-Soviet states, 1990s), or years of economic mismanagement and corruption (Zimbabwe in the 2000s, Venezuela in the 2010s). Once people lose faith in the currency, they spend it the instant they get it and demand payment in a stable foreign currency or goods; this rush makes money circulate faster, which pushes prices up even more, which forces the government to print still more to keep operating — a self-feeding spiral. It only ends when the government stops the money printing and restores confidence, often by introducing a brand-new currency, tying money to a foreign currency or to gold, and cutting the budget deficit. The worst case on record was Hungary in 1946 (prices doubling about every 15 hours).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bond-auction',
    title: 'What a Government Bond Auction Is',
    category: 'Economics',
    keywords: [
      'what is a government bond auction', 'how does a treasury auction work', 'how does the government sell bonds',
      'what is a primary dealer', 'competitive vs non-competitive bid', 'how is the interest rate on government debt set',
      'who buys government bonds',
    ],
    content: `When a government needs to borrow, its treasury or debt-management office regularly sells new bonds through an auction rather than at a fixed price. Ahead of each auction it announces how much it wants to raise and the bond's maturity. Buyers — big banks (in the US, the "primary dealers," who are obliged to bid), pension and mutual funds, insurers, and foreign central banks — submit bids. "Competitive" bidders state the yield (interest rate) they're willing to accept; "non-competitive" bidders (including small investors) agree to take whatever rate the auction settles at. The treasury fills the lowest-yield (highest-price) bids first and works up until the amount is raised; the yield of the last accepted bid becomes the rate the government pays on that whole batch, and everyone usually pays that same clearing price ("single-price" or Dutch auction). So the market, not the government, sets the interest rate on public debt at each auction — and weak demand (few bidders, high yields demanded) is a warning sign about a country's finances. Bonds then trade freely on the "secondary" market, where their prices move opposite to interest rates.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-subprime-mortgage',
    title: 'What a Subprime Mortgage Is',
    category: 'Economics',
    keywords: [
      'what is a subprime mortgage', 'subprime mortgage definition', 'subprime vs prime borrower', 'what is a teaser rate mortgage',
      'why are subprime loans risky', 'NINJA loan', 'adjustable rate mortgage reset',
    ],
    content: `A subprime mortgage is a home loan made to a borrower who is considered high-risk — a poor or short credit history, low or unstable income, a small down payment, or a high existing debt load — meaning they're more likely to fall behind or default than a "prime" borrower. To compensate for that risk, the lender charges a higher interest rate and fees. In the US housing boom of the mid-2000s, subprime lending exploded, often with features that made it worse: little or no proof of income ("NINJA" loans — no income, no job, no assets), and "adjustable-rate" structures with a low "teaser" rate for the first two or three years that then reset much higher. As long as house prices kept rising, borrowers could refinance or sell; when prices stalled and fell in 2006–07, waves of these loans defaulted. Because they had been bundled into mortgage-backed securities and sold worldwide (with credit-rating agencies wrongly stamping many as safe), the losses spread through the whole financial system and triggered the 2008 crisis. Post-crisis rules tightened lending standards sharply.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-an-interest-rate',
    title: 'What an Interest Rate Is',
    category: 'Economics',
    keywords: [
      'what is an interest rate', 'what does interest rate mean', 'how does interest work', 'nominal vs real interest rate',
      'what is APR', 'why do interest rates change', 'what is the central bank policy rate',
    ],
    content: `An interest rate is the price of borrowing money (or, from the other side, the reward for lending or saving it), expressed as a percentage of the amount (the "principal") per year. Borrow $1,000 at 5% for a year and you owe $50 in interest on top of repaying the $1,000. Rates differ by the risk that the borrower won't repay (a government pays less than a risky company; a credit card charges far more than a mortgage), by how long the money is tied up, and by expected inflation. Key distinctions: the "nominal" rate is the stated rate; the "real" rate is roughly the nominal rate minus inflation, and is what tells you the true change in purchasing power. The APR (annual percentage rate) rolls the base rate together with compulsory fees to give a truer cost of a loan. The most important single rate is the central bank's "policy rate," which it raises to cool inflation (making borrowing and spending more expensive) and cuts to stimulate a weak economy; that rate ripples out to mortgages, business loans, savings accounts and bond yields.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fractional-reserve-banking',
    title: 'What Fractional Reserve Banking Is',
    category: 'Economics',
    keywords: [
      'what is fractional reserve banking', 'how does fractional reserve banking work', 'why do banks only keep a fraction of deposits',
      'reserve requirement', 'do banks lend out your deposits', 'is fractional reserve banking safe',
    ],
    content: `Fractional reserve banking is the normal system in which a bank keeps only a small fraction of its customers' deposits available as cash/reserves and lends or invests the rest, earning interest on it. It works because on any given day only a few depositors want their money at once, so the bank doesn't need to hold it all. This is how banks make most of their profit and how the banking system as a whole expands the money supply (each loan becomes a deposit somewhere, part of which can be lent again). It is centuries old — goldsmith-bankers in 1600s England were already doing it — not something created by the US Federal Reserve in 1913. Its weakness is the "bank run": if too many depositors demand cash at the same time, a solvent bank can still run out of ready funds. That risk is now managed by deposit insurance, minimum capital rules, and the central bank acting as "lender of last resort." Some countries have dropped formal reserve requirements entirely (Canada, the UK, and the US since March 2020), relying on capital and liquidity rules instead.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-backs-the-dollar',
    title: 'What Backs the US Dollar',
    category: 'Economics',
    keywords: [
      'what backs the us dollar', 'is the us dollar backed by gold', 'what gives the dollar value', 'why is the dollar worth anything',
      'fiat currency backing', 'why do people trust the dollar', 'what is legal tender',
    ],
    content: `Since 1971 the US dollar has not been backed by gold or any physical commodity — it's a fiat currency. What gives it value is a combination of things: (1) the US government requires taxes to be paid in dollars, so everyone in the economy needs them; (2) it is legal tender, meaning it must be accepted to settle debts; (3) it's the unit for pricing wages, contracts and debts throughout the world's largest economy, backed by that economy's productive capacity; (4) the Federal Reserve manages the money supply to keep inflation low and stable, protecting its purchasing power; and (5) it's the world's dominant reserve and trade currency — most oil, most international loans and much global trade are priced in dollars, and central banks hold huge dollar reserves, which creates constant demand. So the dollar is "backed" by trust in the stability and enforcement power of the US government and economy, plus its entrenched global role — not by a vault of gold.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-2008-crisis',
    title: 'What Caused the 2008 Financial Crisis',
    category: 'Economics',
    keywords: [
      'what caused the 2008 financial crisis', 'causes of the 2008 crash', 'lehman brothers collapse', 'the great recession',
      'mortgage backed securities crisis', 'housing bubble 2008', 'what was TARP',
    ],
    content: `The 2008 financial crisis had several linked causes. In the early-to-mid 2000s, low interest rates and lax lending fuelled a US housing bubble; banks made huge numbers of risky "subprime" mortgages. Those loans were bundled into complex securities (mortgage-backed securities, CDOs) and sold to investors and banks worldwide, and credit-rating agencies wrongly stamped many of them as very safe (AAA). Financial firms took on enormous leverage — borrowing many times their capital to buy these assets — and insured them with instruments like credit default swaps (notably from AIG). When US house prices peaked in 2006 and then fell, subprime borrowers defaulted in waves, the "safe" securities collapsed in value, and no one knew which banks were holding the losses, so lending between banks froze. Bear Stearns was rescued in March 2008; the government took over Fannie Mae and Freddie Mac; and on 15 September 2008 the investment bank Lehman Brothers was allowed to fail, triggering global panic. Governments and central banks responded with massive bank bailouts (the US TARP programme), guarantees, and interest-rate cuts. The result was the "Great Recession" — the worst global downturn since the 1930s — and sweeping new financial regulation (Dodd-Frank in the US, Basel III internationally).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hedge-fund',
    title: 'What a Hedge Fund Is',
    category: 'Economics',
    keywords: [
      'what is a hedge fund', 'how do hedge funds work', 'hedge fund vs mutual fund', 'what is 2 and 20',
      'what is short selling', 'who can invest in a hedge fund', 'hedge fund strategies',
    ],
    content: `A hedge fund is a private, pooled investment fund that is open only to wealthy individuals and institutions (pension funds, endowments, sovereign wealth funds) and is much more lightly regulated than a mutual fund. Because of that, it can use aggressive strategies most retail funds can't: "short selling" (betting a price will fall), leverage (investing with borrowed money to amplify returns and losses), derivatives, arbitrage (exploiting small price differences), and concentrated bets on currencies, commodities, distressed companies or takeovers. The name comes from the original idea of "hedging" — holding offsetting long and short positions so the fund could make money whether markets rose or fell — though many modern hedge funds aren't hedged at all. They typically charge "2 and 20": a 2% annual management fee plus 20% of any profits. On average, after fees, hedge funds as a group have not reliably beaten a simple low-cost index fund, but a minority have produced spectacular long-run returns (Renaissance Technologies, Bridgewater).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-national-debt',
    title: 'What the National Debt Is',
    category: 'Economics',
    keywords: [
      'what is the national debt', 'what is the government debt', 'how does the national debt work', 'is the national debt a problem',
      'who does the government owe money to', 'debt to gdp ratio', 'can a country go bankrupt',
    ],
    content: `The national (or government / public) debt is the total amount a national government owes, built up from every year it has run a budget deficit — spending more than it collected in taxes — and covered the gap by borrowing, mostly by selling bonds. It's the accumulated total; the yearly shortfall that adds to it is the "deficit." The government owes it to whoever holds those bonds: domestic investors, pension funds, banks, its own central bank, other government accounts (like the US Social Security trust fund), and foreign governments and investors. Economists usually judge it not as a raw dollar figure but as a ratio to the size of the economy (debt-to-GDP), since a bigger economy can service a bigger debt; and by the interest cost as a share of the budget. A country that borrows in its own currency can't be forced into default the way a household can (it can always create money to pay, though that risks inflation); the real limits are investors demanding higher interest, crowding out private investment, and reduced room to respond to future crises.`,
    createdAt: Date.now(),
  },
];
