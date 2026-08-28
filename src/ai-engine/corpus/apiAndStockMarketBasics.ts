import { KnowledgeItem } from '../../types';

export const API_AND_STOCK_MARKET_BASICS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-tech-what-is-an-api',
    title: 'What Is an API? How Software Talks to Software',
    category: 'Programming',
    keywords: ['what is an api', 'what does api stand for', 'how does a rest api work', 'api explained simply'],
    content: `**API** stands for Application Programming Interface — essentially a defined set of rules that lets one piece of software request information or functionality from another piece of software, without either side needing to know the internal details of how the other actually works. A useful analogy is a restaurant: you (the "client") don't walk into the kitchen and cook your own food — you give your order to a waiter (the API), who takes it to the kitchen (the "server," where the actual work happens) and brings back exactly what you asked for, following a defined menu of what's actually available to request. When a weather app shows you a forecast, it's typically calling a weather service's API behind the scenes, sending a request (like "give me the forecast for this location") and receiving structured data back, which the app then displays. A **REST API** (Representational State Transfer) is a particularly common style of API design that uses standard, predictable web addresses and methods (like GET to retrieve data, POST to create something new, PUT/PATCH to update, and DELETE to remove) over the same HTTP protocol that powers regular web browsing, making it relatively simple and standardized to work with across countless different programming languages and platforms. APIs are the fundamental connective tissue underlying nearly all modern software — letting a ride-share app pull in map data, a website process a credit card payment through a payment provider's API, or one company's software integrate smoothly with another's, without either needing to rebuild the other's functionality from scratch.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-finance-stock-market-basics',
    title: 'How the Stock Market Actually Works',
    category: 'Personal Finance',
    keywords: ['how does the stock market work', 'what is a stock', 'what is a stock exchange', 'how do stock prices go up and down'],
    content: `A **stock** (or "share") represents a small ownership stake in a company — when you buy a share of a company, you literally own a tiny fraction of that business, entitling you (depending on the share type) to a proportional claim on its profits and, sometimes, voting rights on major company decisions. Companies issue stock, primarily through an **Initial Public Offering (IPO)**, as a way to raise money from investors to fund growth, without having to take on debt through a loan. Once issued, shares trade on a **stock exchange** (like the New York Stock Exchange or Nasdaq) — a regulated marketplace where investors buy and sell shares between each other, rather than from the company itself in most everyday trading. Stock prices fluctuate continuously based on supply and demand, which in turn is driven by investors' collective, ever-shifting expectations about a company's future profitability and prospects — positive news (strong earnings, a promising new product) tends to push demand and prices up, while negative news pushes them down, though short-term price movements are also heavily influenced by broader market sentiment, interest rates, and macroeconomic conditions unrelated to any single company's actual performance. Over long time horizons, the stock market has historically trended upward on average, reflecting overall economic growth, though it can and does experience sharp, sometimes prolonged downturns along the way — a core reason financial advisors commonly recommend that money needed in the short term shouldn't be invested in stocks, since there's no guarantee prices will have recovered by the time it's needed.`,
    createdAt: Date.now(),
  },
];
