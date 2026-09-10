import { KnowledgeItem } from '../../types';

/**
 * FINANCE_MARKETS_CONCEPTS_GAPS_2 — batch 221 corrections.
 * Homonym / wrong-domain misses: "broker vs dealer" -> art dealers + message
 * brokers (Kafka), "fundamental vs technical analysis" -> football + literary
 * analysis, "soft vs hard landing" -> hard disk drive + a K-drama, "short
 * squeeze vs gamma squeeze" -> gamma correction in displays, "bond vs note vs
 * bill" -> an electricity bill. Plus web dumps for Dow/S&P 500 and equity/debt
 * financing, and half-answers for call/put options and bull/bear traps.
 */
export const FINANCE_MARKETS_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-finmkt2-broker-vs-dealer',
    title: 'Broker vs dealer (securities)',
    category: 'economics',
    keywords: [
      'difference between a broker and a dealer', 'broker vs dealer finance', 'agent versus principal',
      'executes trades for clients', 'trades from its own inventory', 'commission versus spread',
      'broker-dealer', 'market maker', 'not an art dealer or a message broker',
    ],
    content: `In securities markets (not art dealers or message-queue brokers like Kafka/RabbitMQ):

A broker acts as an AGENT for a client. The broker takes your order to buy or sell a security and finds the other side of the trade in the market on your behalf, without taking ownership of the security itself. The broker is paid a commission or fee. The broker's duty is to get you a fair execution.

A dealer acts as a PRINCIPAL, trading for its own account. A dealer holds an inventory of securities and buys from and sells to customers directly out of (or into) that inventory. It quotes a price to buy (the bid) and a price to sell (the ask) and makes money on the spread between them, and it bears the risk of holding the position. A dealer that continuously quotes both sides to keep a market liquid is a "market maker".

In practice most firms are registered as "broker-dealers" and do both, acting as agent on some trades and as principal on others. The distinction matters for disclosure and for conflicts of interest: as a dealer the firm is on the other side of your trade.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-fundamental-vs-technical-analysis',
    title: 'Fundamental vs technical analysis (investing)',
    category: 'economics',
    keywords: [
      'difference between fundamental and technical analysis', 'fundamental vs technical analysis stocks',
      'intrinsic value from financials', 'price and volume charts', 'earnings revenue balance sheet',
      'support resistance trends patterns', 'long-term investing versus trading', 'not football or literary analysis',
    ],
    content: `These are the two main approaches to deciding what security to buy or sell and when. (This is the stock-market meaning, not "fundamentals vs technique" in sport or "close vs technical reading" in literature.)

Fundamental analysis tries to estimate a security's true or "intrinsic" value by studying the underlying business and economy: revenue, earnings, profit margins, debt, cash flow, management quality, competitive position, industry trends, and macro conditions like interest rates. If the market price is well below the estimated intrinsic value, the fundamental analyst buys and holds, expecting the price to converge over time. This is the approach of value investors (Buffett, Graham).

Technical analysis ignores the business and studies the price action itself: charts of past price and trading volume, looking for trends, support and resistance levels, moving averages, momentum, and recurring patterns (head and shoulders, flags, etc.). The premise is that price already reflects all information and that crowd psychology repeats, so patterns give an edge on timing. It is used mostly by shorter-term traders.

Many practitioners combine them: fundamentals to decide WHAT to own, technicals to decide WHEN to enter or exit.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-soft-vs-hard-landing',
    title: 'Soft landing vs hard landing (economy)',
    category: 'economics',
    keywords: [
      'difference between a soft and hard landing in the economy', 'soft landing vs hard landing',
      'central bank raising rates to cool inflation', 'slowdown without a recession', 'recession and job losses',
      'the Fed', 'aircraft analogy', 'not a hard disk drive or a K-drama',
    ],
    content: `This is an economics metaphor (from landing an aircraft), not a hard disk drive or the TV show "Crash Landing on You".

When a central bank raises interest rates to bring down high inflation, it is deliberately slowing the economy. The question is how gently it comes down:

A soft landing is the good outcome: inflation falls back to target and growth slows to a sustainable pace WITHOUT the economy tipping into recession. Unemployment rises only mildly or not at all. It is considered hard to pull off because rate hikes act with a lag and it is easy to over- or under-tighten. The mid-1990s US is the textbook example.

A hard landing is the bad outcome: the tightening (or an external shock) pushes the economy into an outright recession — GDP contracts, unemployment jumps significantly, businesses fail. Inflation usually does come down, but at the cost of real economic pain. The early-1980s Volcker disinflation, which crushed inflation but caused a deep recession, is the classic hard landing.

("No landing" is a third, informal scenario: growth and inflation both stay stubbornly high and the economy just does not slow.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-short-vs-gamma-squeeze',
    title: 'Short squeeze vs gamma squeeze',
    category: 'economics',
    keywords: [
      'difference between a short squeeze and a gamma squeeze', 'short squeeze vs gamma squeeze',
      'short sellers forced to buy back', 'options market makers hedging', 'delta hedging', 'call options',
      'GameStop 2021', 'feedback loop pushing price up', 'not gamma correction in displays',
    ],
    content: `Both are feedback loops that can drive a stock's price sharply higher, and they often happen together. (Nothing to do with gamma correction in graphics/displays.)

A short squeeze: short sellers have borrowed and sold shares, betting the price will fall. If the price rises instead, their losses grow (theoretically without limit), and margin calls or fear force them to "cover" — buy shares back to close their positions. That buying pushes the price up further, forcing more shorts to cover, and so on. The more of a stock's float is sold short, the more fuel for a squeeze.

A gamma squeeze works through the OPTIONS market. When traders buy large amounts of call options, the market makers who sold those calls are short calls and hedge by buying the underlying stock ("delta hedging"). As the stock rises, the calls' delta increases (that rate of change is "gamma"), so the market makers must buy MORE stock to stay hedged. That buying lifts the price, which raises delta again, forcing still more buying — a self-reinforcing loop driven by dealer hedging, not by short sellers.

GameStop in January 2021 involved both: heavy retail call-buying triggered a gamma squeeze that helped ignite a classic short squeeze on a very heavily shorted stock.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-call-vs-put-option',
    title: 'Call option vs put option',
    category: 'economics',
    keywords: [
      'difference between a call and a put option', 'call vs put option', 'right to buy', 'right to sell',
      'strike price', 'bullish versus bearish', 'premium', 'expiration', 'in the money',
      'buying a put as insurance',
    ],
    content: `An option is a contract giving the buyer the RIGHT (not the obligation) to trade an underlying asset at a fixed "strike" price before or on an expiration date, in exchange for paying a "premium" up front.

A call option is the right to BUY the underlying at the strike price. You buy a call when you think the price will RISE: if the stock climbs well above the strike, you can buy at the low strike and are effectively up the difference, while your loss if it falls is capped at the premium you paid. Calls are bullish.

A put option is the right to SELL the underlying at the strike price. You buy a put when you think the price will FALL, or to protect (hedge) shares you already own — a put acts like an insurance policy: if the stock crashes, the put lets you sell at the higher strike. Puts are bearish (or protective).

The seller ("writer") of the option takes the opposite side and keeps the premium but takes on the obligation if the buyer exercises. Quick memory: call = call it up (buy, bullish); put = put it down (sell, bearish).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-dow-vs-sp500',
    title: 'Dow Jones vs S&P 500',
    category: 'economics',
    keywords: [
      'difference between the Dow and the S&P 500', 'Dow Jones Industrial Average vs S&P 500',
      '30 stocks versus 500', 'price-weighted versus market-cap weighted', 'stock market index',
      'broader measure of the US market', 'why a high-priced stock moves the Dow more',
    ],
    content: `Both are US stock market indices — numbers that track the overall performance of a basket of stocks — but they are built differently.

The Dow Jones Industrial Average (the "Dow") contains just 30 large, well-known US companies, chosen by a committee. It is PRICE-WEIGHTED: a stock with a higher share price has more influence on the index, regardless of the company's actual size. So a $500 stock moves the Dow more than a $50 stock even if the $50 company is far bigger. This is widely seen as an outdated method, but the Dow survives because of its long history and name recognition.

The S&P 500 contains 500 of the largest US companies (about 80% of the total US stock market value). It is MARKET-CAP-WEIGHTED: each company's influence is proportional to its total market value (share price times shares outstanding), so the giants (Apple, Microsoft, Nvidia) drive it and tiny members barely register. Because it is broader and cap-weighted, professionals treat the S&P 500 as the benchmark for "the US stock market", and most index funds track it rather than the Dow.

(The Nasdaq Composite is a third major index, cap-weighted and heavily tech.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-bond-note-bill',
    title: 'Bond vs note vs bill (government debt)',
    category: 'economics',
    keywords: [
      'difference between a bond and a note and a bill', 'treasury bill note bond', 'maturity length',
      'T-bill under one year', 'T-note 2 to 10 years', 'T-bond 20 to 30 years', 'sold at a discount',
      'pays coupons', 'not an electricity bill',
    ],
    content: `For US Treasury securities (and similar elsewhere), the three names differ mainly by how long until the debt is repaid (maturity). A Treasury "bill" is not a household bill for electricity or rent.

Treasury bill (T-bill): short-term, maturing in one year or less (4, 8, 13, 26 or 52 weeks). Bills pay no coupon; instead they are sold at a discount to face value and you receive the full face value at maturity — the gain is the interest.

Treasury note (T-note): medium-term, maturing in 2 to 10 years. Notes pay a fixed coupon (interest) every six months and return the face value at maturity.

Treasury bond (T-bond): long-term, maturing in 20 or 30 years. Also pays a semi-annual coupon.

So the ladder is bill (under 1 year) -> note (2-10 years) -> bond (20-30 years). "Bond" is also used loosely as an umbrella term for any of them, and corporate debt uses "notes" and "bonds" with similar maturity conventions (a "commercial paper" is the corporate equivalent of a bill).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-equity-vs-debt-financing',
    title: 'Equity financing vs debt financing',
    category: 'economics',
    keywords: [
      'difference between equity and debt financing', 'equity vs debt financing', 'selling ownership stakes',
      'borrowing money to repay with interest', 'no repayment obligation but dilution', 'fixed repayment and interest',
      'shareholders versus lenders', 'cost of capital', 'startups and companies raising money',
    ],
    content: `These are the two fundamental ways a company raises money to fund itself. (Not to be confused with personal assets vs liabilities.)

Equity financing means selling ownership stakes in the company — shares — to investors (angels, venture capitalists, or the public via an IPO). The company gets cash and does NOT have to pay it back or pay interest. In return, the new shareholders own a piece of the company: existing owners are "diluted", the investors get a share of future profits (dividends) and of any sale, and they may get voting rights and board seats. Equity is patient money but the founders give up control and upside.

Debt financing means borrowing — a bank loan, a line of credit, or issuing bonds. The company keeps full ownership and control, but it must repay the principal on a schedule and pay interest along the way regardless of how the business does, and lenders often impose covenants and can force default/bankruptcy if payments are missed. Interest is usually tax-deductible.

Most companies use a mix (their "capital structure"). Debt is cheaper when the business has steady cash flow to service it; equity is safer when cash flow is uncertain, which is why early-stage startups lean on equity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-index-fund-vs-index',
    title: 'Index vs index fund',
    category: 'economics',
    keywords: [
      'difference between an index fund and an index', 'index vs index fund', 'a measurement versus an investment',
      'S&P 500 the index', 'a fund that tracks it', 'you cannot buy an index directly', 'tracking error',
      'expense ratio', 'passive investing',
    ],
    content: `An index is just a number — a statistical measure of the performance of a defined group of securities. The S&P 500, the FTSE 100, the Dow and the Nasdaq Composite are indices: a committee or rulebook defines which stocks are in, and a formula turns their prices into a single figure you see quoted on the news. You cannot invest in an index directly; it is a yardstick.

An index fund is an actual investable product — a mutual fund or ETF — that holds the securities in an index (or a representative sample) in the same proportions, so that its value moves almost exactly with the index. It lets an ordinary investor "buy the S&P 500" in one purchase. Because it just mirrors the index rather than paying analysts to pick stocks, an index fund has very low fees (expense ratio), and over the long run most index funds beat most actively managed funds after costs. The small gap between the fund's return and the index it tracks is "tracking error".

Short version: the index is the scoreboard; the index fund is the thing you can actually own that follows that scoreboard.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finmkt2-bull-vs-bear-trap',
    title: 'Bull trap vs bear trap (trading)',
    category: 'economics',
    keywords: [
      'difference between a bull and bear trap', 'bull trap vs bear trap', 'false breakout',
      'false breakdown', 'price reverses after luring buyers', 'price reverses after luring short sellers',
      'technical analysis', 'trapped traders',
    ],
    content: `Both are false signals in a chart that "trap" traders on the wrong side of a move; they are mirror images.

A bull trap is a false upside breakout. The price rises above a resistance level (or above a recent high), which looks like the start of a new uptrend, so buyers ("bulls") pile in. Then the price quickly reverses and falls back below the breakout level, leaving those buyers holding losing positions. Short sellers who covered too early also get burned.

A bear trap is a false downside breakdown. The price falls below a support level (or a recent low), which looks like the start of a new downtrend, so sellers and short sellers ("bears") jump in expecting further declines. Then the price snaps back up above the level, squeezing the shorts and leaving sellers having exited near the bottom.

Both are caused by a mix of stop-loss orders clustered around obvious levels, and sometimes deliberate moves by large players to trigger those orders before pushing price the other way. Traders try to avoid them by waiting for a breakout to be confirmed (a retest, higher volume, a close beyond the level) rather than acting on the first touch.`,
    createdAt: Date.now(),
  },
];
