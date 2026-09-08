import { KnowledgeItem } from '../../types';

// Batch 26 (personal finance) gap-fills. This category scored well (~18/25).
// Misses: "what is a bond" -> chemistry bonds (covalent/ionic) despite an
// existing finance-bond doc — retrieval keeps losing to the chemistry homonym,
// so this adds a harder-leading finance entry; "what does it mean to be in
// debt" -> Justin Bieber song + debt-service-coverage-ratio dump; "net worth"
// -> "music artists with the highest net worth, Jay-Z"; "debit vs credit card"
// -> only "one builds credit history."
export const FINANCE_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-bond-investing-hard',
    title: 'What a Bond Is (Investing / Personal Finance)',
    category: 'Personal Finance',
    keywords: [
      'what is a bond', 'what is a bond investment', 'what is a bond in finance', 'what is a bond in investing',
      'how do bonds work', 'what is a government bond', 'what is a treasury bond', 'what is a corporate bond',
      'are bonds a good investment', 'bond vs stock', 'what is a savings bond', 'what is a municipal bond',
      'what is bond yield', 'what is a coupon payment',
    ],
    content: `In investing and personal finance, a bond is an IOU — a loan you make to a government or company in exchange for interest. When you buy a bond you hand the issuer a fixed amount (the "face value" or "principal"); they pay you interest at a set rate (the "coupon"), usually twice a year, and pay the principal back on a fixed future date (the "maturity"). Governments issue bonds to fund spending (US Treasuries, Canada Savings Bonds, UK gilts, municipal bonds for local projects); companies issue corporate bonds to raise money without giving away ownership. Compared with stocks, bonds are lower-risk and lower-return: the income is fixed and predictable, and bondholders get paid before shareholders if the issuer goes bankrupt, but you don't share in the company's growth. Bond prices move opposite to interest rates — when rates rise, older bonds paying less become worth less. Investors hold bonds for steady income and to steady a portfolio when stocks fall. (A chemical "bond" between atoms is an unrelated topic.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-debt',
    title: 'What It Means to Be in Debt',
    category: 'Personal Finance',
    keywords: [
      'what does it mean to be in debt', 'what is debt', 'what does being in debt mean', 'types of debt',
      'what is good debt vs bad debt', 'how does debt work', 'what happens if you dont pay your debt',
    ],
    content: `Being in debt means you owe money to someone else — a lender — and are obligated to pay it back, almost always with interest (an extra charge for the use of their money over time). Debt is created when you borrow: a credit-card balance you don't pay off in full, a car loan, a student loan, a mortgage, a payday loan, money owed to family. You usually repay in regular instalments covering interest plus a bit of the principal. People distinguish "productive" debt — borrowing at a low rate for something that builds value or income (a mortgage, education, a business) — from "expensive" debt like credit cards and payday loans, which carry very high interest and can snowball if only the minimum is paid. If you stop paying, consequences escalate: late fees, a damaged credit score, calls from collections, repossession of the financed item, wage garnishment or a lawsuit, and as a last resort bankruptcy. Being debt-free means you owe nothing and your income is entirely your own.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-net-worth-clean',
    title: 'What Net Worth Is',
    category: 'Personal Finance',
    keywords: [
      'what is net worth', 'how do you calculate net worth', 'what does net worth mean', 'assets minus liabilities',
      'how to figure out my net worth', 'what counts as an asset', 'can net worth be negative',
    ],
    content: `Net worth is what you own minus what you owe: add up the value of all your assets (cash and bank accounts, investments, retirement accounts, the market value of your home and car, valuable possessions) and subtract all your liabilities (mortgage, car loan, student loans, credit-card balances, any other debt). The result is your net worth — a single snapshot of your overall financial position at a moment in time. It can be negative, which is common early in adult life (for example, a new graduate with student loans and few assets). Tracking it every few months shows whether you're building wealth: it goes up when you pay down debt, save, invest, or your assets appreciate, and down when you take on debt or asset values fall. The same calculation applies to a company (total assets minus total liabilities = shareholders' equity).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-debit-vs-credit-card',
    title: 'Debit Card vs Credit Card',
    category: 'Personal Finance',
    keywords: [
      'what is the difference between a debit card and a credit card', 'debit vs credit card', 'debit card vs credit card',
      'should i use debit or credit', 'how does a credit card work', 'how does a debit card work', 'is a debit card safer',
    ],
    content: `A debit card spends money you already have: it's linked to your chequing/bank account, and every purchase is withdrawn from that balance almost immediately. You can't spend more than you have (unless you opt into overdraft). A credit card spends the bank's money: each purchase is a short-term loan up to a set limit, and you get a monthly statement. If you pay the full balance by the due date, it's interest-free; if you only pay part, the rest carries a high interest charge (often ~20% APR) that compounds. Other differences: credit cards report to credit bureaus, so using one responsibly builds your credit history and score (debit cards don't); credit cards usually have stronger fraud protection and perks (cash back, points, purchase protection); debit cards have no risk of debt or interest and help you stay within your means. A common approach is to use a credit card like a debit card — only for what you can already afford — and pay it off in full every month.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-taxes-work',
    title: 'How Income Taxes Work',
    category: 'Personal Finance',
    keywords: [
      'how do taxes work', 'how does income tax work', 'what is a tax bracket', 'what is a marginal tax rate',
      'does a raise put me in a higher bracket and cost me money', 'what is a tax deduction vs a tax credit',
      'what is withholding', 'do i have to file a tax return',
    ],
    content: `Income tax is usually "progressive" with "marginal brackets." Your income is sliced into bands, and each band is taxed at its own rate, rising as you go up. Crucially, moving into a higher bracket does NOT mean your whole income is taxed at the higher rate — only the dollars inside that top band are; a raise always leaves you with more take-home pay. Your employer withholds an estimate of the tax from each paycheque and sends it to the government; once a year you file a tax return that reconciles what was withheld with what you actually owe, and you get a refund or a bill. A deduction reduces the income that gets taxed (so it saves you your marginal rate on that amount); a tax credit reduces the tax bill directly, dollar for dollar. Deadlines are annual (April 15 in the US, April 30 in Canada). Free filing tools exist for simple returns. (This is general information, not personalised tax advice.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dividend-clean',
    title: 'What a Dividend Is',
    category: 'Personal Finance',
    keywords: [
      'what is a dividend', 'how do dividends work', 'what does dividend mean', 'what is dividend yield',
      'which stocks pay dividends', 'when do you get paid a dividend', 'what is a dividend reinvestment',
    ],
    content: `A dividend is a share of a company's profits paid out to its shareholders, usually in cash, typically every quarter. If you own 100 shares and the company declares a $0.50 per-share dividend, you receive $50. Not all companies pay dividends: mature, steady, profitable companies (utilities, big banks, consumer-goods firms) tend to, while fast-growing companies usually reinvest all profits back into the business instead. "Dividend yield" is the annual dividend divided by the share price (a $2 yearly dividend on a $50 stock is a 4% yield). Dividends give investors a regular income stream on top of any change in the share price, and many investors automatically reinvest them to buy more shares (compounding). The company's board decides the dividend and can raise, cut or suspend it. Key dates: you must own the stock before the "ex-dividend date" to receive the next payment.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bankruptcy',
    title: 'What Bankruptcy Is',
    category: 'Personal Finance',
    keywords: [
      'what is bankruptcy', 'how does bankruptcy work', 'what does filing for bankruptcy mean', 'chapter 7 vs chapter 13',
      'what happens when you declare bankruptcy', 'does bankruptcy clear all debt', 'how long does bankruptcy last',
    ],
    content: `Bankruptcy is a legal process for people or businesses that cannot pay their debts. You file with a court, which then oversees either wiping out (discharging) most of what you owe or restructuring it into a manageable repayment plan, while protecting you from lawsuits and collection efforts in the meantime. In the US the two personal types are Chapter 7 (liquidation — non-exempt assets can be sold to pay creditors, then most remaining unsecured debt is erased; takes a few months) and Chapter 13 (a 3–5 year court-supervised repayment plan, letting you keep your house/car). Some debts usually survive bankruptcy: most student loans, child support and alimony, recent taxes, and court fines. It's a genuine fresh start but has real costs: it stays on your credit report for 7–10 years, makes borrowing hard and expensive for years, and some assets may be lost. It's meant as a last resort after other options (budgeting, negotiating with creditors, credit counselling, debt consolidation) have failed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gross-vs-net-income',
    title: 'Gross Income vs Net Income',
    category: 'Personal Finance',
    keywords: [
      'what is the difference between gross and net income', 'gross vs net income', 'gross pay vs net pay',
      'what is take home pay', 'why is my paycheck less than my salary', 'what does net income mean',
    ],
    content: `Gross income (or gross pay) is the full amount before any deductions — your stated salary or hourly earnings, or, for a business, its total revenue. Net income (or net pay, "take-home pay," or the "bottom line") is what's actually left after deductions. For an individual paycheque, the deductions are things like income tax withholding, payroll taxes (Social Security/Medicare, or CPP/EI in Canada), health insurance premiums, and retirement contributions — which is why your deposit is noticeably smaller than your salary divided by the number of pay periods. For a business, net income is revenue minus all costs: cost of goods, wages, rent, interest, taxes and so on. When budgeting, always plan around your NET income, because that's the money you can actually spend.`,
    createdAt: Date.now(),
  },
];
