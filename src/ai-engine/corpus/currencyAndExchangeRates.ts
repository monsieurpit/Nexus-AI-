import { KnowledgeItem } from '../../types';

export const CURRENCY_AND_EXCHANGE_RATES_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-currency-exchange-rates-basics',
    title: 'How Currency Exchange Rates Work',
    category: 'Economics',
    keywords: ['how do currency exchange rates work', 'why do currencies fluctuate', 'exchange rate meaning', 'strong dollar weak dollar'],
    content: `An **exchange rate** is simply the price of one currency expressed in terms of another — for example, if 1 U.S. dollar equals 0.92 euros, that rate tells you how much euro you'd get for a dollar. Most major currencies today "float," meaning their value is determined continuously by supply and demand in global currency markets rather than being fixed by a government (a "fixed" or "pegged" exchange rate, by contrast, is one a country's central bank deliberately holds steady against another currency, as some countries do with the U.S. dollar). Currency values fluctuate based on many factors: interest rates (higher rates tend to attract foreign investment seeking better returns, increasing demand for that currency), inflation (a currency losing purchasing power quickly tends to weaken relative to more stable ones), a country's trade balance (strong export demand increases foreign demand for its currency), political stability, and overall investor confidence in an economy's health. A "strong" or "appreciating" currency makes imports cheaper for that country's consumers but can hurt its exporters (their goods become pricier for foreign buyers); a "weak" or "depreciating" currency does the reverse — helping exporters but making imports and foreign travel pricier for locals. Central banks sometimes intervene directly in currency markets (buying or selling their own currency in large volumes) to try to influence its value, though sustained, large-scale intervention against strong market forces is often difficult and expensive to maintain.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-currency-fiat-vs-commodity',
    title: 'Fiat Currency vs. the Gold Standard',
    category: 'Economics',
    keywords: ['what is fiat currency', 'gold standard explained', 'why is paper money worth anything', 'money backed by gold'],
    content: `**Fiat currency** is money that has value simply because a government declares it legal tender and people collectively trust and accept it for transactions — it isn't backed by a physical commodity like gold or silver, unlike historical "commodity money" systems. Most of the world's major currencies today, including the U.S. dollar, euro, and yen, are fiat currencies. Historically, many countries operated under a **gold standard**, where a currency's value was directly tied to a fixed quantity of gold, and paper currency could in principle be exchanged for that amount of gold on demand — this constrained how much money a government could print, since it needed enough gold reserves to back it. The U.S. gradually moved away from the gold standard through the 20th century, most decisively in 1971 when President Nixon ended the direct convertibility of dollars to gold (an event sometimes called the "Nixon Shock"), moving the U.S. and effectively much of the world's financial system fully onto fiat currency. Proponents of fiat systems argue it gives central banks crucial flexibility to manage the money supply and respond to economic crises (like recessions) by adjusting interest rates or increasing spending; critics worry fiat systems are more vulnerable to inflation from excessive money creation, since there's no hard physical constraint on how much a government can print, only political and economic discipline.`,
    createdAt: Date.now(),
  },
];
