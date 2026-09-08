import { KnowledgeItem } from '../../types';

// Batch 69 (finance & markets, deeper). Live misses on nexus-4b: "what is a
// bond" answered about chemical bonds (covalent/ionic); "what is a trade
// deficit" and "what is a sovereign default" were raw web dumps; "what is the
// yield curve" answered only about an inverted curve; "what caused the 2008
// financial crisis" was a vague one-liner.
export const FINANCE_MARKETS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-bond-finance',
    title: 'What a Bond Is (Finance)',
    category: 'Finance',
    keywords: [
      'what is a bond', 'what is a bond in finance', 'how do bonds work', 'bond coupon principal maturity', 'why do bond prices fall when rates rise',
      'government bond vs corporate bond', 'bond yield explained', 'are bonds safer than stocks',
    ],
    content: `In finance, a bond is a loan that an investor makes to a borrower — usually a government or a large company — that is packaged as a tradable security. This has nothing to do with chemical bonds. The borrower agrees to pay the holder a fixed rate of interest (the "coupon"), typically twice a year, and to repay the original amount (the "face value" or "principal") on a set date (the "maturity"). Bonds can be bought and sold before maturity in a secondary market, and their prices move inversely to interest rates: if new bonds are issued at higher rates, existing lower-rate bonds are worth less, and vice versa. The "yield" is the effective return given the price you pay. Bonds are generally safer than stocks because bondholders are paid before shareholders and the payments are contractual, but the expected return is lower, and there is still risk — the issuer can default, inflation can erode the fixed payments, and rising rates cut the market price. Credit-rating agencies grade issuers from investment-grade down to "junk."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trade-deficit',
    title: 'What a Trade Deficit Is',
    category: 'Finance',
    keywords: [
      'what is a trade deficit', 'trade deficit vs surplus', 'balance of trade explained', 'is a trade deficit bad',
      'current account deficit', 'how is a trade deficit financed', 'imports exceed exports',
    ],
    content: `A trade deficit occurs when a country buys more goods and services from the rest of the world (imports) than it sells to it (exports) over a given period; the reverse is a trade surplus, and the two together make up the "balance of trade." Trade in goods and services is the largest part of the broader "current account." A deficit has to be paid for somehow, so it is matched by an inflow of foreign money: foreigners lend to the country, or buy its assets (bonds, stocks, real estate, companies). A trade deficit is not automatically "bad." It can reflect a strong economy whose consumers and businesses are buying a lot, a currency that is attractive to hold, or a country that invests more than it saves domestically. It becomes a problem mainly if it is driven by unsustainable borrowing or a loss of competitiveness. A country issuing a reserve currency (like the US dollar) can run persistent deficits more easily because the world wants to hold its assets.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sovereign-default',
    title: 'What a Sovereign Default Is',
    category: 'Finance',
    keywords: [
      'what is a sovereign default', 'when a country cannot pay its debt', 'government debt default consequences', 'debt restructuring sovereign',
      'argentina greece sovereign default', 'can you foreclose on a country', 'imf bailout sovereign default',
    ],
    content: `A sovereign default is when a national government fails to make payments on its debt (its bonds) when they are due, or forces creditors to accept less than they were promised ("restructuring"). Unlike a person or a company, a country cannot be put into bankruptcy or have its assets seized in any simple way, so defaults are usually resolved by negotiation between the government and its bondholders. Causes include too much borrowing, a collapse in the currency (especially when debt is owed in a foreign currency the government cannot print), a deep recession that cuts tax revenue, a banking crisis, or a sudden loss of access to new loans. Consequences are severe: the country is largely shut out of international borrowing markets for years, its currency and stock market fall, domestic banks holding the debt are damaged, and a recession usually follows. Governments often turn to the International Monetary Fund for emergency loans in exchange for austerity and reform programmes. Notable examples: Argentina (2001 and later), Russia (1998), Greece (2012, the largest restructuring in history).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-yield-curve',
    title: 'What the Yield Curve Is',
    category: 'Finance',
    keywords: [
      'what is the yield curve', 'yield curve explained', 'normal vs inverted yield curve', 'why does the yield curve predict recessions',
      'term premium yield curve', 'short term vs long term bond yields', 'flat yield curve meaning',
    ],
    content: `The yield curve is a graph plotting the interest rate (yield) on bonds of the same credit quality — usually a government's — against their time to maturity, from a few months out to 30 years. Its shape summarises what markets expect. A NORMAL yield curve slopes upward: longer-term bonds pay more, to compensate lenders for tying up money longer and for the greater uncertainty about future inflation and rates (the "term premium"). A FLAT curve means short and long rates are similar. An INVERTED curve, where short-term yields are higher than long-term yields, is unusual and important: it typically happens when a central bank has raised short-term rates sharply to fight inflation while investors, expecting rate cuts and weaker growth ahead, buy long-term bonds and push their yields down. An inverted US Treasury curve (often measured as the 10-year yield minus the 2-year or 3-month) has preceded most recent recessions, which is why it is watched closely as a warning signal, though the lag can be a year or more.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-2008-financial-crisis',
    title: 'What Caused the 2008 Financial Crisis',
    category: 'Finance',
    keywords: [
      'what caused the 2008 financial crisis', 'subprime mortgage crisis explained', 'lehman brothers collapse', 'housing bubble 2008',
      'securitization mbs cdo crisis', 'aig bailout credit default swaps', 'tarp dodd frank great recession',
    ],
    content: `The 2008 crisis grew out of a US housing bubble. Years of low interest rates, loose lending standards and a belief that house prices only rise led banks to issue huge numbers of mortgages, including "subprime" loans to borrowers who couldn't really afford them. Those mortgages were bundled into securities (mortgage-backed securities, then CDOs), sliced into tranches, and often stamped AAA by rating agencies, so they were sold worldwide to banks, pension funds and insurers. Financial firms were also extremely leveraged — borrowing 30 or more times their capital to hold these assets — and insurers like AIG had sold vast amounts of credit default swaps promising to cover losses. When house prices peaked in 2006 and fell, subprime borrowers defaulted, the securities collapsed in value, and no one knew who was exposed. Bear Stearns was rescued in March 2008; Lehman Brothers was allowed to fail in September 2008, freezing global credit markets overnight; AIG, Fannie Mae and Freddie Mac were taken over. Governments responded with bank bailouts (TARP in the US), central-bank emergency lending and quantitative easing. The result was the "Great Recession," and new regulation such as the Dodd-Frank Act.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bank-run',
    title: 'What a Bank Run Is',
    category: 'Finance',
    keywords: [
      'what is a bank run', 'why can a solvent bank fail in a run', 'fractional reserve banking run', 'deposit insurance fdic bank run',
      'silicon valley bank run 2023', 'lender of last resort', 'self-fulfilling panic bank',
    ],
    content: `A bank run is when a large number of a bank's depositors try to withdraw their money at the same time because they fear the bank is about to fail. Banks operate on "fractional reserves": they lend out or invest most of the money deposited with them and keep only a small fraction as cash. That means no bank could return all deposits at once even if it is fundamentally sound — so a run can force a solvent bank into collapse, and the fear of a run can be self-fulfilling. To sell assets fast for cash, the bank takes losses, which makes it genuinely weaker, which draws more withdrawals. Modern defences: government deposit insurance (in the US the FDIC guarantees accounts up to a limit, removing most depositors' reason to panic) and a central bank acting as "lender of last resort," lending against good collateral to a bank facing a run. The 2023 failure of Silicon Valley Bank showed runs can now happen in hours, as large uninsured depositors move money electronically and coordinate online.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-central-bank',
    title: 'What a Central Bank Is',
    category: 'Finance',
    keywords: [
      'what is a central bank', 'what does the federal reserve do', 'lender of last resort central bank', 'central bank independence',
      'policy interest rate central bank', 'ecb bank of canada central bank role', 'dual mandate inflation employment',
    ],
    content: `A central bank is the public institution that manages a country's (or currency area's) money and banking system — for example the Federal Reserve (US), the European Central Bank, the Bank of England, or the Bank of Canada. Its main jobs: set the benchmark short-term interest rate to steer inflation and, in some mandates, employment; issue the physical currency; hold the country's foreign-exchange and gold reserves; run the payment system banks use to settle with each other; act as "lender of last resort," providing emergency cash to solvent banks in a panic; and, in most countries, supervise and regulate banks for safety. In a downturn it can also use "unconventional" tools like quantitative easing (buying bonds to push down long-term rates). Most modern central banks are operationally independent of the elected government — they are given a goal (such as ~2% inflation) but decide the interest-rate moves themselves — on the theory that politicians would be tempted to keep rates too low before elections and let inflation rise.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-short-selling',
    title: 'What Short Selling Is',
    category: 'Finance',
    keywords: [
      'what is short selling', 'how does shorting a stock work', 'borrow shares sell buy back', 'short squeeze explained',
      'is short selling unlimited loss', 'betting a stock will fall', 'naked short selling',
    ],
    content: `Short selling is a way to profit from a price falling. The short seller borrows shares (from a broker, for a fee), immediately sells them at today's price, and waits. If the price drops, they buy the shares back cheaper, return them to the lender, and keep the difference. If they are wrong and the price rises, they still have to buy the shares back — at the higher price — to return them, taking a loss. That is the key asymmetry: a normal buyer can only lose what they put in (the price can't go below zero), but a short seller's loss is theoretically unlimited, because there is no ceiling on how high a price can go. When a heavily shorted stock starts rising, short sellers rushing to buy back and limit losses can drive the price up even faster — a "short squeeze" (as happened with GameStop in 2021). Short selling is legal and provides liquidity and price discovery, but "naked" shorting (selling shares without actually borrowing them first) is restricted in most markets.`,
    createdAt: Date.now(),
  },
];
