import { KnowledgeItem } from '../../types';

// Batch 95 (personal finance, deeper — batch 26 and personalFinance.ts covered
// the basics). Fairly strong category. Real misses on nexus-4b: "what is a
// mortgage" defined it as "a home loan given to someone considered high-risk"
// and tied it straight to the 2008 crisis (that is a subprime mortgage, a
// specific category); "Roth versus traditional retirement account" answered
// about 401(k) rollovers and cut off without ever explaining the tax
// difference; "what is liquidity" got the first sentence right then drifted
// into "everyone dumping shares of Barça would massively increase liquidity"
// and short selling.
export const PERSONAL_FINANCE_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-is-a-mortgage',
    title: 'What a Mortgage Is',
    category: 'Finance',
    keywords: [
      'what is a mortgage', 'home loan property is collateral foreclosure', 'mortgage principal interest amortization down payment',
      'fixed vs adjustable rate mortgage', 'mortgage insurance less than 20 percent down', 'subprime mortgage vs regular mortgage',
    ],
    content: `A mortgage is a loan used to buy real estate (usually a home) in which the property itself serves as collateral: if the borrower stops making payments, the lender can "foreclose" — seize the property, sell it, and recover the outstanding debt. It is not inherently a high-risk loan. The key terms are the principal (amount borrowed), the interest rate (fixed for the whole term, or variable / adjustable), and the amortization period — commonly 25 or 30 years — over which the loan is repaid in equal monthly instalments of principal plus interest. Early payments are mostly interest and later payments mostly principal, so equity builds slowly at first. Buyers normally need a down payment (often 5–20% of the price); with less than 20% down, most lenders require mortgage default insurance. A "subprime" mortgage is specifically one made to a borrower with weak credit at a higher rate — the widespread default of subprime mortgages is what triggered the 2008 financial crisis — but that is one risky sub-category, not what "mortgage" means in general.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roth-vs-traditional',
    title: 'Roth versus Traditional Retirement Account',
    category: 'Finance',
    keywords: [
      'what is the difference between a roth and a traditional retirement account', 'roth pay tax now grow tax-free withdraw tax-free',
      'traditional pre-tax deduction now taxed on withdrawal', 'roth ira 401k traditional ira 401k', 'when to choose roth vs traditional tax bracket',
      'canada rrsp tfsa equivalent roth traditional',
    ],
    content: `The difference is WHEN you pay tax. A TRADITIONAL (pre-tax) account — traditional 401(k) or traditional IRA — lets you deduct contributions now, so they come out of pre-tax income; the money grows untaxed inside the account; and you pay ordinary income tax on every dollar you withdraw in retirement. A ROTH account — Roth 401(k) or Roth IRA — is funded with money you have already paid income tax on (no deduction now), but it grows tax-free and qualified withdrawals in retirement (generally after age 59½ and a 5-year holding period) are entirely tax-free, including all the investment growth. Rule of thumb: choose TRADITIONAL if you expect to be in a lower tax bracket in retirement than you are now (take the deduction at a high rate, pay tax later at a low one); choose ROTH if you expect the same or a higher bracket later, are young with decades of growth ahead, or simply want tax certainty. Roth IRAs also have no required minimum distributions, and you can withdraw your own contributions (not the earnings) at any time without tax or penalty. This is a US framework; Canada's rough equivalents are the RRSP (like traditional) and the TFSA (like Roth).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-liquidity-personal',
    title: 'What Liquidity Means',
    category: 'Finance',
    keywords: [
      'what is liquidity', 'how quickly an asset converts to cash at fair value', 'liquid assets cash savings stocks illiquid house car business',
      'why hold an emergency fund in liquid assets', 'bid-ask spread market liquidity', 'liquid vs illiquid investments',
    ],
    content: `Liquidity is how quickly and easily an asset can be turned into cash at close to its fair market value. Cash is perfectly liquid; a chequing or savings account is highly liquid; publicly traded stocks and large ETFs are very liquid (you can sell in seconds during market hours). By contrast, a house, a car, jewellery, art, or a stake in a private business are illiquid — selling can take weeks or months, and forcing a quick sale usually means accepting a lower price. In personal finance, the practical point is to keep enough liquid savings (an emergency fund in a savings or high-yield savings account) that a sudden expense or a job loss never forces you to sell long-term investments at a bad moment or run up high-interest debt. When people talk about a market or a particular stock being "liquid," they mean there are many buyers and sellers and a small gap between the highest bid and lowest ask price, so even a large trade barely moves the price. (Panic selling does not "increase liquidity" — a rush of sellers with few buyers is a liquidity problem, and prices fall.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-saving-vs-investing-detail',
    title: 'The Difference Between Saving and Investing',
    category: 'Finance',
    keywords: [
      'what is the difference between saving and investing', 'saving short term goals safety net principal safe', 'investing long term growth stocks volatility',
      'when to save vs when to invest time horizon', 'risk of not investing inflation', 'stock market average real return over decades',
    ],
    content: `SAVING means setting money aside where the amount is safe and you can get at it quickly — a savings account, high-yield savings account, or a short-term GIC/CD. It is for your emergency fund and for goals within roughly the next one to three years (a car, a trip, a house down payment). The return is low, but the principal will not drop in value, which is the point. INVESTING means putting money into assets that can grow — stock index funds, ETFs, bonds — accepting that their value will rise and fall in the short term in exchange for much higher expected returns over the long term. It is for goals five or more years away, above all retirement. Historically a broad stock-market index has returned roughly 7% per year after inflation averaged over long periods, though any single year can be sharply up or down. The risk of investing is short-term volatility (and the temptation to sell at the bottom); the risk of only ever saving is that inflation quietly erodes your money's purchasing power and you never build real wealth. Most sound plans do both: build the cash emergency fund first, then invest steadily for the long term.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-credit-score-detail',
    title: 'What Goes Into a Credit Score',
    category: 'Finance',
    keywords: [
      'what is a credit score', 'credit score factors payment history utilization', 'fico score 300 to 850 vantagescore', 'credit utilization ratio keep below 30 percent',
      'how to build and improve credit score', 'hard inquiry vs soft inquiry credit', 'length of credit history age of accounts',
    ],
    content: `A credit score is a three-digit number (commonly 300–850, from FICO or VantageScore in the US; Canada uses a similar range) that lenders use to estimate how likely you are to repay borrowed money. It is calculated from the information in your credit report, roughly weighted as: PAYMENT HISTORY (about 35%) — do you pay bills on time; a single missed payment 30+ days late can drop a good score a lot. AMOUNTS OWED / CREDIT UTILIZATION (about 30%) — how much of your available credit you are using; keeping balances below about 30% (ideally under 10%) of your limits helps. LENGTH OF CREDIT HISTORY (about 15%) — how long your accounts have been open, so closing an old card can hurt. NEW CREDIT / INQUIRIES (about 10%) — a "hard" inquiry from applying for credit dings the score slightly for a few months (checking your own score is a harmless "soft" inquiry). CREDIT MIX (about 10%) — having both revolving credit (cards) and instalment loans. A higher score gets you lower interest rates on mortgages, car loans and cards, and can affect renting an apartment or getting insurance.`,
    createdAt: Date.now(),
  },
];
