import { KnowledgeItem } from '../../types';

/**
 * FINANCE_MARKETS_CONCEPTS_GAPS_3 — batch 237 corrections.
 * nexus-4b was strong on most finance contrasts. Misses:
 * - "common vs preferred stock" confused stock with cooking STOCK ("used to
 *   make sauces").
 * - "index fund vs mutual fund" framed an index fund as "a scoreboard" and a
 *   mutual fund as "how you buy into it".
 * - "mutual fund vs hedge fund" got the regulation backwards (called mutual
 *   funds lightly regulated).
 * - "Nasdaq vs NYSE" put Apple and Microsoft on the NYSE.
 * - "accounts payable vs receivable" said "there's no such thing".
 * - "depreciation vs amortization" was a raw web dump.
 * - "secured vs unsecured loan" and "mortgage vs home equity loan" answered
 *   only about HELOCs.
 * - "deficit vs debt" was a web dump.
 * - "currency vs cryptocurrency" answered about coin vs token instead.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'finance', keywords, content, createdAt: now,
});

export const FINANCE_MARKETS_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-finm3-common-vs-preferred-stock',
    'Common stock vs preferred stock',
    [
      'difference between common stock and preferred stock', 'common stock voting rights variable dividend last in line residual claim upside',
      'preferred stock priority on dividends usually fixed priority in liquidation usually no vote bond-like', 'not cooking stock',
      'cumulative preferred callable convertible',
    ],
    `Both are equity — ownership shares in a company (nothing to do with cooking stock).

COMMON STOCK is ordinary ownership. Holders normally get one vote per share on directors and major decisions, receive dividends only if and when the board declares them (variable, and paid after preferred holders), and rank LAST in a bankruptcy — behind bondholders and preferred holders. In exchange for that risk they get the full upside: if the company does well, common shares appreciate without limit.

PREFERRED STOCK behaves partway between a bond and common stock. Holders get a fixed, stated dividend that must be paid before any common dividend (and if it is "cumulative", missed preferred dividends accumulate and must be caught up first). They rank ahead of common stock in liquidation. In return they usually have NO voting rights and limited price upside — the shares trade more like a bond, moving with interest rates. Preferred can also be "callable" (company can buy it back) or "convertible" (holder can swap it for common).

Short version: common = votes, variable dividend, first loss, unlimited upside; preferred = no votes, fixed priority dividend, paid before common, bond-like.`,
  ),
  k(
    'kb-gap-finm3-index-fund-vs-mutual-fund',
    'Index fund vs mutual fund (and active vs passive)',
    [
      'difference between an index fund and a mutual fund', 'an index fund is a type of fund that passively tracks a market index', 'a mutual fund is a pooled-investment structure that can be actively managed or an index fund',
      'active management stock picking higher fees', 'passive low cost', 'S&P 500 index fund', 'ETF can also be an index fund',
    ],
    `These are not opposites — they describe different things.

A MUTUAL FUND is a STRUCTURE: a pooled vehicle where many investors' money is combined, a manager invests it in a portfolio of securities, and you own units priced once a day at net asset value. That structure can hold an ACTIVELY managed portfolio (a manager and analysts pick stocks/bonds trying to beat a benchmark, charging higher fees) or a PASSIVE one.

An INDEX FUND is a STRATEGY: a fund that simply holds all (or a representative sample) of the securities in a market index — say the S&P 500 — in the same proportions, aiming to match the index's return, not beat it. Because there is little research or trading, fees are very low.

So an index fund can be packaged as a mutual fund OR as an ETF. And a mutual fund can be an index fund or an actively managed fund. The comparison people usually mean is INDEX/PASSIVE vs ACTIVELY MANAGED: passive is cheaper and, on average over long periods, beats most active funds after fees; active offers the chance (not the guarantee) of outperformance and more flexibility.`,
  ),
  k(
    'kb-gap-finm3-mutual-fund-vs-hedge-fund',
    'Mutual fund vs hedge fund',
    [
      'difference between a mutual fund and a hedge fund', 'mutual fund open to the retail public heavily regulated daily liquidity long-only transparent', 'hedge fund private accredited or institutional investors lightly regulated lock-ups',
      'hedge fund can short use leverage derivatives', 'two and twenty fee 2 percent management 20 percent performance', 'mutual fund regulation is strict not light',
    ],
    `MUTUAL FUNDS are retail products. Anyone can buy one, often for a small minimum. They are HEAVILY regulated (in the US, the Investment Company Act of 1940): required diversification, daily redemption at net asset value, published holdings, limits on leverage and short-selling, and capped, disclosed fees. Most are "long-only" (they buy securities and hold them).

HEDGE FUNDS are private pools open only to accredited/wealthy individuals and institutions. They are LIGHTLY regulated: they can use aggressive tools — short-selling, heavy leverage, derivatives, concentrated bets, illiquid assets — and pursue "absolute return" (trying to make money whether markets rise or fall). In return they impose lock-up periods and limited redemption windows, disclose little, and charge much more, classically "2 and 20" (a 2% annual management fee plus 20% of profits).

So the contrast is: mutual fund = public, transparent, tightly regulated, modest fees, constrained strategy; hedge fund = private, opaque, lightly regulated, high fees, wide latitude and higher risk. (The earlier claim that mutual funds are "lightly regulated" is backwards.)`,
  ),
  k(
    'kb-gap-finm3-nasdaq-vs-nyse',
    'Nasdaq vs NYSE',
    [
      'difference between the Nasdaq and the NYSE', 'NYSE older auction market historically had a physical trading floor and designated market makers', 'Nasdaq founded 1971 fully electronic dealer market',
      'Nasdaq is tech-heavy Apple Microsoft Amazon Google are listed on Nasdaq', 'NYSE lists many large industrial and financial blue chips', 'both are US stock exchanges',
    ],
    `Both are major US stock exchanges; the differences are history, mechanics, and the mix of companies.

The NYSE (New York Stock Exchange), founded 1792, is the older and larger by total market value. It grew up as an AUCTION market with a physical trading floor and "designated market makers"/specialists who help match buyers and sellers and smooth trading in each stock (most trading is now electronic, but that structure remains). It lists a broad range of large, established companies, heavy on industrials, banks, energy, and consumer names (e.g. JPMorgan, ExxonMobil, Walmart, Coca-Cola, IBM).

The NASDAQ, founded 1971, was the world's first fully ELECTRONIC exchange — a DEALER market where competing market makers post bid and ask quotes and trades execute through the computer network, with no trading floor. It became the home of technology and growth companies: APPLE, MICROSOFT, AMAZON, ALPHABET (GOOGLE), NVIDIA, META, and TESLA are all Nasdaq-listed, not NYSE.

So: NYSE = older, auction/specialist model, blue-chip and industrial tilt; Nasdaq = electronic dealer model, tech and high-growth tilt. Listing requirements differ slightly but both are top-tier. (A common mistake is to put Apple or Microsoft on the NYSE — they are on the Nasdaq.)`,
  ),
  k(
    'kb-gap-finm3-accounts-payable-vs-receivable',
    'Accounts payable vs accounts receivable',
    [
      'difference between accounts payable and accounts receivable', 'accounts receivable money customers owe the company an asset', 'accounts payable money the company owes suppliers a liability',
      'AR is on the asset side AP is on the liability side', 'trade credit invoices', 'one company AR is another company AP',
    ],
    `They are mirror images on a company's balance sheet, and they are real, standard accounting terms.

ACCOUNTS RECEIVABLE (AR) is money OWED TO the company by its customers for goods or services already delivered but not yet paid for — i.e. the company sold on credit and is waiting to collect. It is an ASSET (a current asset), because it is cash the business expects to receive soon.

ACCOUNTS PAYABLE (AP) is money the company OWES to its suppliers and vendors for goods or services it has received but not yet paid for — the company bought on credit. It is a LIABILITY (a current liability), because it is cash the business must pay out soon.

Memory aid: reCEIVEable = you will receive money (asset); PAYable = you have to pay money (liability). And the same invoice is accounts receivable on the seller's books and accounts payable on the buyer's books. Managing the gap between how fast you collect AR and how slowly you must settle AP is a core part of working-capital management.`,
  ),
  k(
    'kb-gap-finm3-depreciation-vs-amortization',
    'Depreciation vs amortization',
    [
      'difference between depreciation and amortization', 'depreciation spreads the cost of a tangible fixed asset over its useful life', 'amortization spreads the cost of an intangible asset over its useful life',
      'equipment buildings vehicles versus patents copyrights trademarks goodwill software', 'amortization also means paying down loan principal on a schedule', 'both are non-cash expenses',
    ],
    `Both are accounting methods for spreading the cost of a long-lived asset across the years it is used, instead of expensing it all at once. Both are non-cash expenses that reduce reported profit and the asset's book value. The difference is the KIND of asset:

DEPRECIATION applies to TANGIBLE fixed assets — physical things like machinery, equipment, vehicles, buildings, and furniture. Methods include straight-line (equal amount each year) and accelerated (more in early years). Land is not depreciated. Tangible assets often have a "salvage value" left at the end.

AMORTIZATION applies to INTANGIBLE assets — non-physical things with a limited legal or useful life: patents, copyrights, trademarks with finite terms, licences, and purchased software. It is almost always straight-line, usually with no salvage value. (Intangibles with indefinite lives, like goodwill, are not amortized but tested for impairment instead.)

"Amortization" has a second common meaning: paying down a LOAN's principal on a fixed schedule, so each payment is part interest and part principal (an "amortization schedule"). Same root idea — gradually writing something down over time.`,
  ),
  k(
    'kb-gap-finm3-secured-vs-unsecured-loan',
    'Secured vs unsecured loan',
    [
      'difference between a secured and an unsecured loan', 'secured loan backed by collateral the lender can seize on default', 'unsecured loan no collateral relies on creditworthiness higher interest rate',
      'mortgage auto loan secured by the house or car', 'credit cards student loans personal loans unsecured', 'repossession versus lawsuit and collections',
    ],
    `A SECURED loan is backed by COLLATERAL — a specific asset the borrower pledges. If the borrower defaults, the lender can seize and sell that asset to recover the money. A mortgage is secured by the house; an auto loan by the car; a secured credit card by a cash deposit. Because the lender's risk is lower, secured loans carry lower interest rates, allow larger amounts, and are easier to get with weaker credit — but you can lose the asset (foreclosure, repossession).

An UNSECURED loan has NO collateral. The lender relies only on the borrower's promise to repay and their creditworthiness (credit score, income, history). Most credit cards, personal loans, student loans, and medical debt are unsecured. If the borrower defaults, the lender cannot automatically take any particular asset — it must pursue collections, report to credit bureaus, or sue for a judgment. Because that is riskier for the lender, unsecured loans have higher interest rates, smaller limits, and stricter approval.

Short version: secured = "here's an asset you can take if I don't pay" (cheaper, riskier for you); unsecured = "trust my credit" (pricier, riskier for the lender).`,
  ),
  k(
    'kb-gap-finm3-mortgage-vs-home-equity-loan',
    'Mortgage vs home equity loan (vs HELOC)',
    [
      'difference between a mortgage and a home equity loan', 'primary purchase mortgage is the main loan to buy the home first lien', 'home equity loan is a second loan against the equity you have built lump sum fixed rate second lien',
      'HELOC is the revolving line-of-credit version draw period', 'equity is home value minus what you still owe', 'second mortgage',
    ],
    `A (primary) MORTGAGE is the loan you take out to BUY the home. It is secured by the property, is usually the largest and longest loan (15-30 years), and sits in "first lien" position — it gets paid first if the home is sold or foreclosed. You typically borrow most of the purchase price and pay it down over decades.

A HOME EQUITY LOAN is a SECOND loan taken out LATER, once you have built up equity (equity = the home's current value minus what you still owe on the first mortgage). It lets you borrow against that equity — you receive a lump sum, at a fixed interest rate, repaid over a set term. It is also secured by the house but sits in "second lien" position (paid after the primary mortgage), so its rate is a bit higher. People use it for renovations, debt consolidation, or big expenses.

A HELOC (home equity line of credit) is the REVOLVING version of a home equity loan: instead of a lump sum you get a credit limit you can draw from, repay, and redraw during a "draw period", usually at a variable rate, then repay the balance over a "repayment period".

So: mortgage = buys the house (first lien); home equity loan = lump-sum second loan against built-up equity (second lien, fixed); HELOC = same idea as a reusable credit line (variable).`,
  ),
  k(
    'kb-gap-finm3-deficit-vs-debt',
    'Deficit vs debt (government finance)',
    [
      'difference between the deficit and the debt', 'the deficit is the annual shortfall spending minus revenue in one year a flow', 'the debt is the accumulated total of all past deficits minus surpluses a stock',
      'a surplus reduces the debt', 'running a smaller deficit still adds to the debt', 'national debt bathtub analogy',
    ],
    `The DEFICIT is a one-year figure: how much MORE the government spent than it collected in revenue during that fiscal year. Spending minus revenue. If revenue exceeds spending, that year has a SURPLUS instead. It is a FLOW — a rate measured over a period.

The DEBT is the running total: the sum of every past year's deficits, minus every past year's surpluses, still outstanding. It is what the government has borrowed and not yet repaid, held as bonds/treasury securities. It is a STOCK — a level measured at a point in time.

The relationship: every year the government runs a deficit, that amount is added to the debt (it must borrow to cover the gap). A surplus year pays some debt down. So the debt keeps GROWING as long as there is any deficit at all — even a shrinking deficit still increases the total debt, just more slowly. Bathtub analogy: the debt is the water level in the tub; the deficit is the rate water is pouring in from the tap; a surplus is the drain being open.`,
  ),
  k(
    'kb-gap-finm3-currency-vs-cryptocurrency',
    'Currency vs cryptocurrency',
    [
      'difference between a currency and a cryptocurrency', 'fiat currency issued and backed by a government or central bank legal tender centrally controlled', 'cryptocurrency decentralized digital money on a blockchain not issued by any government secured by cryptography',
      'supply set by protocol volatile not generally legal tender', 'no central authority peer to peer', 'Bitcoin Ethereum',
    ],
    `A (fiat) CURRENCY is money issued and backed by a government and managed by its central bank — the US dollar, euro, yen, Canadian dollar. It is legal tender (creditors must accept it for debts), its supply is set by a central authority (monetary policy), it exists as physical cash and as balances in the regulated banking system, and its value is relatively stable day to day because institutions manage it. Payments ultimately clear through banks and the central bank.

A CRYPTOCURRENCY is digital money that runs on a blockchain — a shared ledger maintained by a decentralized network of computers rather than any government or bank. Key features: no central issuer or controller; transactions are verified by the network and secured by cryptography; the money supply and issuance rules are fixed in the protocol's code (Bitcoin is capped at 21 million coins); anyone can hold and transfer it peer-to-peer without a bank; and prices are highly volatile because value rests on supply/demand and sentiment, not a managing authority. In most countries it is not legal tender (El Salvador and a few others are exceptions).

Short version: a currency is centrally issued, regulated, stable, and legal tender; a cryptocurrency is decentralized, code-governed, volatile, and generally not legal tender.`,
  ),
  k(
    'kb-gap-finm3-debit-vs-credit-accounting',
    'Debit vs credit (double-entry accounting)',
    [
      'difference between debit and credit in accounting', 'debit is the left side of an entry credit is the right side', 'debits increase assets and expenses decrease liabilities equity and revenue',
      'credits increase liabilities equity and revenue decrease assets and expenses', 'every transaction has equal debits and credits', 'not about whether something is good or bad',
    ],
    `In double-entry bookkeeping, DEBIT just means the LEFT side of an accounting entry and CREDIT means the RIGHT side. Neither is inherently "good" or "bad" — they are directions, and every transaction records equal totals of each so the books stay balanced.

Which one increases an account depends on the account type:
- ASSETS and EXPENSES: a debit INCREASES them, a credit decreases them.
- LIABILITIES, EQUITY, and REVENUE: a credit INCREASES them, a debit decreases them.

Example: a company makes a $100 cash sale. It debits Cash $100 (an asset goes up) and credits Sales Revenue $100 (revenue goes up). If it then pays $30 rent, it debits Rent Expense $30 (expense up) and credits Cash $30 (asset down).

Note this is the opposite of everyday bank language: when your bank "credits your account" that raises your balance, because from the BANK's point of view your deposit is a liability it owes you, and credits increase liabilities.`,
  ),
];
