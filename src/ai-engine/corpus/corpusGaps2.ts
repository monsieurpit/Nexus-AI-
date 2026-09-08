import { KnowledgeItem } from '../../types';

// Tech gap-fills. Several are homonym disambiguations — "the cloud" was matching a meteorology
// doc, "binary" a non-binary-gender doc — so these lead hard with the computing meaning and
// carry keyword variants that only make sense as tech questions.
export const CORPUS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-cloud-computing',
    title: 'What "The Cloud" (Cloud Computing) Is',
    category: 'Technology',
    keywords: [
      'what is the cloud', 'what is cloud computing', 'the cloud explained', 'cloud storage',
      'what does the cloud mean', 'is the cloud just someone elses computer', 'aws azure google cloud',
      'cloud vs on premise',
    ],
    content: `"The cloud" in computing means renting computing power, storage, and software that run on someone else's servers in large data centres, accessed over the internet, instead of owning and running the hardware yourself. Common examples: storing photos in iCloud or Google Drive, streaming from Netflix, hosting a website or app on Amazon Web Services (AWS), Microsoft Azure, or Google Cloud. The joke "there is no cloud, it's just someone else's computer" is basically accurate. Benefits: you pay only for what you use, can scale up or down quickly, and don't maintain physical machines. Trade-offs: ongoing cost, dependence on an internet connection and on the provider, and handing your data to a third party. This has nothing to do with clouds in the sky (weather).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-binary-computing',
    title: 'What Binary (Base-2) Is in Computing',
    category: 'Technology',
    keywords: [
      'what is binary', 'what is binary code', 'binary number system', 'base 2', 'ones and zeros',
      'how does binary work', 'binary explained', 'why do computers use binary',
    ],
    content: `Binary is the base-2 number system: it uses only two digits, 0 and 1, instead of the ten digits (0–9) of the everyday base-10 (decimal) system. Each binary digit is called a "bit". In binary, each place value is a power of 2 (1, 2, 4, 8, 16, 32…), so for example 1011 in binary means 8 + 0 + 2 + 1 = 11 in decimal. Computers use binary because their electronic components have two stable states — a transistor or wire is either at high voltage or low voltage, on or off — which map cleanly to 1 and 0. All data in a computer — numbers, text, images, sound, program code — is ultimately stored and processed as long strings of bits. (This question is about the number system, not "non-binary" gender identity, which is an unrelated topic.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-git-vcs',
    title: 'What Git Is (Version Control)',
    category: 'Technology',
    keywords: [
      'what is git', 'what does git do', 'git version control', 'git vs github', 'what is git used for',
      'why use git', 'git explained',
    ],
    content: `Git is a version control system: a tool that tracks every change made to a set of files (usually source code) over time, so you can see the full history, go back to an earlier version, and work on different features in parallel using "branches" that are later merged. It was created by Linus Torvalds in 2005 for developing the Linux kernel. It is "distributed", meaning every developer has a complete copy of the project's history on their own machine, not just a link to a central server. Git is the tool; GitHub, GitLab and Bitbucket are websites that host Git repositories and add collaboration features (pull requests, issues, code review). Under the hood Git stores content as a graph of snapshots (blobs, trees, commits), but for everyday use it's "the thing that lets a team of developers work on the same code without overwriting each other and keeps a history of everything".`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-python-creator',
    title: 'Who Created Python',
    category: 'Technology',
    keywords: [
      'who created python', 'who made python', 'who invented python', 'python creator', 'guido van rossum',
      'when was python created', 'python history', 'why is python called python',
    ],
    content: `Python was created by Guido van Rossum, a Dutch programmer, who began working on it in December 1989 and released the first version in 1991. He led the project for decades as its "Benevolent Dictator For Life" (BDFL) until stepping back from that role in 2018. The language is named after the British comedy group Monty Python's Flying Circus, not the snake. Python is now one of the most widely used programming languages in the world, especially for data science, machine learning, scripting, automation, and web backends, known for readable, indentation-based syntax.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dice-probability',
    title: 'Common Dice and Coin Probabilities',
    category: 'Mathematics',
    keywords: [
      'probability of rolling a 7', 'chance of rolling a 7 with two dice', 'two dice probability',
      'odds of rolling doubles', 'probability rolling a 7', 'dice odds', 'coin flip probability',
      'chance of rolling snake eyes', 'most likely dice roll',
    ],
    content: `With two standard six-sided dice there are 36 equally likely outcomes. The probability of rolling a total of 7 is 6/36 = 1/6 (about 16.7%) — 7 is the MOST likely total, because there are 6 ways to make it: 1+6, 6+1, 2+5, 5+2, 3+4, 4+3 (both orders count). Other totals: rolling a 2 ("snake eyes") or a 12 is 1/36 each; rolling doubles (any matching pair) is 6/36 = 1/6; rolling a total of 6 or 8 is 5/36 each. For coins: the chance of getting all heads on n fair flips is (1/2)^n — so 3 heads in a row is 1/8 (12.5%), 4 in a row is 1/16. Each flip is independent; a run of tails does NOT make heads "due" (that is the gambler's fallacy).`,
    createdAt: Date.now(),
  },
];
