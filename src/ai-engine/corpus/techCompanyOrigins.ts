import { KnowledgeItem } from '../../types';

export const TECH_COMPANY_ORIGINS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-techorigins-apple-microsoft',
    title: 'How Apple and Microsoft Were Founded',
    category: 'Technology',
    keywords: ['how was apple founded', 'steve jobs steve wozniak', 'how was microsoft founded', 'bill gates paul allen'],
    content: `**Apple** was founded in 1976 by **Steve Jobs**, **Steve Wozniak**, and Ronald Wayne (who sold his 10% stake back for just $800 within weeks, a decision now famously regarded as one of history's costliest business mistakes) — reportedly starting out of the Jobs family garage in Los Altos, California. Wozniak, the more technically gifted engineer, designed the Apple I and Apple II personal computers, while Jobs brought business vision, marketing instinct, and an intense focus on design. Apple went on to pioneer the mass-market graphical user interface with the Macintosh (1984), and after Jobs was controversially pushed out of the company in 1985 amid internal power struggles, he returned in 1997 (after Apple acquired his subsequent company, NeXT) to lead one of the most celebrated corporate turnarounds in business history, launching the iMac, iPod, iPhone (2007), and iPad. **Microsoft** was founded in 1975 by **Bill Gates** and **Paul Allen**, childhood friends who dropped out of or left college to build software for the emerging personal computer industry. Their pivotal early break came in 1980, when IBM contracted Microsoft to supply an operating system for its new personal computer — Microsoft didn't yet have one ready, so it purchased rights to an existing system from another company, adapted it into MS-DOS, and crucially retained the right to license it to other computer manufacturers too, not just IBM — a deal that became the foundation of Microsoft's enormous market dominance through the following decades, particularly once Windows became the standard operating system on the vast majority of the world's personal computers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-techorigins-google-amazon',
    title: 'How Google and Amazon Were Founded',
    category: 'Technology',
    keywords: ['how was google founded', 'larry page sergey brin', 'how was amazon founded', 'jeff bezos amazon garage'],
    content: `**Google** was founded in 1998 by **Larry Page** and **Sergey Brin**, PhD students at Stanford University who developed a new web search algorithm, called PageRank, that ranked search results partly based on how many other reputable web pages linked to a given page — treating links roughly like citations in academic papers, as a signal of a page's relevance and authority — a meaningfully better approach than competing search engines of the era, which often relied more heavily on simple keyword matching and were more easily manipulated or cluttered with irrelevant results. Google's search quality quickly won over users and advertisers, and the company later expanded into email (Gmail), maps, mobile operating systems (Android, acquired in 2005), video (YouTube, acquired in 2006), and eventually reorganized under a parent holding company, Alphabet, in 2015. **Amazon** was founded by **Jeff Bezos** in 1994, initially operating out of his rented Bellevue, Washington garage as an online bookstore — a category Bezos reportedly chose partly because books were relatively easy to ship and had a huge number of possible titles that no single physical bookstore could stock, making an online catalog's advantages especially compelling. Amazon steadily expanded into nearly every retail category, and its cloud computing division, Amazon Web Services (AWS, launched 2006), grew to become one of the company's most profitable businesses, providing the underlying server and computing infrastructure that a huge share of the modern internet's websites and apps run on.`,
    createdAt: Date.now(),
  },
];
