import { KnowledgeItem } from '../../types';

export const INTERNET_HISTORY_DEEP_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-internet-arpanet-origins',
    title: 'ARPANET: The Internet\'s Military Research Origins',
    category: 'Technology',
    keywords: ['what was arpanet', 'internet origin history', 'history of the internet arpanet', 'first internet message'],
    content: `The internet's origins trace back to **ARPANET**, a project funded by the U.S. Department of Defense's Advanced Research Projects Agency (ARPA, later DARPA) and launched in 1969. It was designed to let a small number of university and research computers communicate and share resources over a decentralized network — decentralization was a deliberate design goal, partly because a network without a single central point of failure would be more resilient (including, per popular but somewhat overstated legend, in the event of a nuclear attack; the more immediate driver was simply the practical goal of efficient resource-sharing between expensive, scarce research computers). The first message sent over ARPANET, on October 29, 1969, between UCLA and Stanford, was meant to be the word "LOGIN" — but the system crashed after transmitting just "LO," making that accidental two-letter fragment the internet's first-ever message. ARPANET's key technical innovation was **packet switching**, breaking data into small chunks ("packets") that could travel independently across the network and be reassembled at their destination — a fundamentally different, more robust and efficient approach than traditional dedicated-circuit telephone networking. Through the 1970s-80s, the core communication rules (protocols) that let separate, independent networks interconnect — most importantly **TCP/IP**, standardized in 1983 — were developed, effectively creating "a network of networks," which is the literal meaning behind the term "internet."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-internet-www-invention',
    title: 'Who Invented the World Wide Web?',
    category: 'Technology',
    keywords: ['who invented the world wide web', 'tim berners-lee www', 'difference between internet and world wide web', 'first website'],
    content: `The **World Wide Web** was invented by British computer scientist **Tim Berners-Lee** in 1989 while working at CERN, the European particle physics research organization, as a way to let researchers there easily share and link documents across different computers. It's a common point of confusion, but "the internet" and "the World Wide Web" are not the same thing: the internet is the underlying global network of interconnected computers and communication infrastructure (which had already existed for two decades by 1989), while the Web is a specific system built on top of that infrastructure for accessing and linking documents — Berners-Lee's contribution combined three key components: HTML (HyperText Markup Language, for formatting web pages), HTTP (HyperText Transfer Protocol, for transmitting them), and URLs (a standardized addressing system to locate them), plus hyperlinks connecting documents to each other. The first website went live in 1991, and Berners-Lee made a deliberate, historically significant decision to release the Web's underlying technology royalty-free and open to anyone, rather than patenting or licensing it — a choice widely credited with enabling its explosive, unrestricted global growth through the 1990s, as anyone could build on it freely without needing permission or paying fees. Berners-Lee has continued advocating for an open, decentralized web, and later founded the World Wide Web Consortium (W3C) to help maintain open technical standards for it.`,
    createdAt: Date.now(),
  },
];
