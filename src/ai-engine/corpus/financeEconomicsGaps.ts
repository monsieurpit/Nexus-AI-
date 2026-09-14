import { KnowledgeItem } from '../../types';

// Batch 291 corpus fixes — finance/economics topics. Strong domain, 4/25 misses.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'finance',
  keywords,
  content,
  createdAt: now,
});

export const FINANCE_ECONOMICS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-fin-index-fund-vs-etf-correction',
    'Index fund vs ETF',
    ['index fund', 'etf', 'exchange-traded fund', 'difference index fund etf'],
    "An index fund is a fund designed to track/mirror a specific market index (like the S&P 500), holding the same stocks in similar proportions — you genuinely own shares in this fund, just like any other investment. An ETF (Exchange-Traded Fund) is not a different asset from an index fund in terms of ownership — the key difference is HOW it trades: an ETF trades throughout the day on a stock exchange just like an individual stock, with its price fluctuating in real time, while a traditional index mutual fund only trades once per day, priced at the end-of-day net asset value (NAV) regardless of when you place your order. Many index funds ARE also structured as ETFs — the terms overlap rather than being mutually exclusive; the real distinction is whether the fund trades continuously during the day (ETF) or only settles once daily after market close (traditional mutual fund structure).",
  ),
  k(
    'kb-gap-fin-market-cap-vs-enterprise-value',
    'Market cap vs enterprise value',
    ['market cap', 'enterprise value', 'difference market cap enterprise value'],
    "Market capitalization (market cap) is simply a company's stock price multiplied by its total number of outstanding shares — it only reflects the value of the company's EQUITY (what shareholders own) as priced by the stock market. Enterprise value (EV) is a more complete measure of a company's total worth: it takes market cap and ADDS the company's total debt, then SUBTRACTS its cash and cash equivalents (EV = Market Cap + Total Debt − Cash). The idea is that if someone wanted to buy the entire company outright, they'd need to pay off its debt but could immediately use its cash reserves, so enterprise value better reflects the true cost of acquiring the whole business, not just its publicly-traded equity value. In short: market cap only values the shares; enterprise value accounts for debt and cash too, giving a fuller picture of what it would actually cost to acquire the entire company.",
  ),
  k(
    'kb-gap-fin-tariff-vs-quota',
    'Tariff vs quota',
    ['tariff', 'quota', 'import quota', 'difference tariff quota'],
    "A tariff is a TAX placed on imported goods — it makes foreign products more expensive (raising their price) without limiting how many units can actually be imported; buyers can still import as much as they want, they just pay more for it. A quota is a LIMIT on the actual QUANTITY of a good that can be imported during a given period — once that quota amount is reached, no more of that good can be imported at all, regardless of price, until the next period begins. The key difference: a tariff controls trade through PRICE (making imports more expensive but unlimited in quantity), while a quota controls trade through a hard QUANTITY CAP (limiting how many units can come in, regardless of price).",
  ),
  k(
    'kb-gap-fin-subsidy-vs-grant',
    'Subsidy vs grant',
    ['subsidy', 'grant', 'difference subsidy grant'],
    "A subsidy is ongoing government financial support given to an industry or activity to lower costs, keep prices down for consumers, or encourage a specific behavior (like agricultural subsidies to farmers, or subsidies for renewable energy production) — it's typically tied to ongoing production or activity and can take the form of direct payments, tax breaks, or price supports. A grant is typically a one-time (or fixed-term) direct payment awarded for a SPECIFIC purpose or project — commonly given to individuals, nonprofits, researchers, or small businesses for a defined goal (like a research grant or a small business startup grant) — and usually doesn't require repayment, but is tied to that specific project rather than ongoing production. The key difference: a subsidy is ongoing support tied to continuing production/activity in an industry, while a grant is typically a one-time or fixed-term award tied to a specific, defined project or purpose.",
  ),
];
