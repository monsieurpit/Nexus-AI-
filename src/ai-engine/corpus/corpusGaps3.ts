import { KnowledgeItem } from '../../types';

// Round-3 gap-fills from batched testing (finance homonyms, a few misc).
export const CORPUS_GAPS_3: KnowledgeItem[] = [
  {
    id: 'kb-gap-financial-bond',
    title: 'What a Bond Is (Finance)',
    category: 'Finance',
    keywords: [
      'what is a bond', 'what is a bond finance', 'government bond', 'corporate bond', 'treasury bond',
      'how do bonds work', 'bond vs stock', 'what is a coupon rate', 'what is a bond yield', 'why buy bonds',
      'are bonds safe',
    ],
    content: `A bond is a loan you make to a government or company, packaged as a tradeable security. When you buy a bond you are lending the issuer money for a set period; in return they pay you regular interest (the "coupon") and repay the original amount (the "face value" or "principal") on a fixed date (the "maturity"). Governments issue bonds to fund spending (US Treasuries, UK gilts); companies issue corporate bonds to raise money without giving up ownership. Bonds are generally lower-risk and lower-return than stocks: a bondholder gets paid before shareholders if the company goes bust, and the income is fixed and predictable, but you don't share in the company's growth. Bond prices move opposite to interest rates — when rates rise, existing bonds paying lower rates become worth less. "Junk" or "high-yield" bonds pay more because the issuer is more likely to default. (This is the finance meaning — a "bond" in chemistry, a force holding atoms together, is a completely different topic.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stock-market-crash-causes',
    title: 'What Causes a Stock Market Crash',
    category: 'Finance',
    keywords: [
      'what causes a stock market crash', 'why do stock markets crash', 'reasons for a market crash',
      'stock market crash explained', 'what triggers a crash', 'how do market crashes happen',
    ],
    content: `A stock market crash — a sudden, sharp drop in prices over days or weeks — usually needs two ingredients: prices that were already stretched too high, and a trigger that makes everyone want to sell at once. Common underlying causes: a speculative bubble where prices have risen far above what companies actually earn; too much borrowed money (margin/leverage) in the market, so a small drop forces investors to sell to cover loans, driving prices down further; and overconfidence, with everyone assuming prices only go up. Common triggers: an economic shock (a recession, a spike in interest rates, an oil-price jump, a war, a pandemic), a major company or bank collapsing, disappointing earnings or economic data, or simply a large sell-off that spooks others. Once selling starts, panic and herd behaviour take over — people sell because prices are falling, which makes prices fall more. Automated trading and (historically) forced margin calls accelerate it. Famous examples: 1929, Black Monday 1987, the 2000 dot-com crash, 2008, and the brief COVID crash of March 2020.`,
    createdAt: Date.now(),
  },
];
