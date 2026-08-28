import { KnowledgeItem } from '../../types';

export const BASIC_CIVICS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-civics-three-branches',
    title: 'The Three Branches of US Government',
    category: 'civics',
    keywords: ['three branches of government', 'branches of us government', 'legislative executive judicial', 'separation of powers', 'checks and balances'],
    content: `The US government is divided into three branches, designed to check and balance each other's power so no single branch becomes too powerful: **Legislative** (Congress — the House of Representatives and the Senate), which makes laws, controls federal spending/taxation, and can declare war. **Executive** (the President, Vice President, and federal agencies/Cabinet), which enforces and carries out laws, commands the military, and conducts foreign policy — the President can veto bills passed by Congress. **Judicial** (the Supreme Court and lower federal courts), which interprets laws and the Constitution, and can strike down laws or executive actions as unconstitutional through judicial review. Checks and balances mean each branch can limit the others: Congress can override a presidential veto with a two-thirds vote in both chambers, the Senate must confirm presidential appointments (including judges), and courts can rule executive or legislative actions unconstitutional — this structure, established by the US Constitution, was deliberately designed by the framers to prevent any one branch from accumulating too much unchecked power.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-civics-house-vs-senate',
    title: 'House of Representatives vs. Senate: What\'s the Difference?',
    category: 'civics',
    keywords: ['difference between the house and the senate', 'house vs senate', 'how many senators', 'how many representatives', 'congress structure'],
    content: `Congress is made up of two chambers, together called a "bicameral" legislature. The **House of Representatives** has 435 voting members, with each state's number of representatives based on its population (more populous states get more representatives) — members serve 2-year terms, and the whole House is up for re-election every 2 years. The **Senate** has 100 members — exactly 2 per state regardless of population, giving smaller states equal representation to larger ones — senators serve 6-year terms, staggered so roughly one-third of the Senate is up for re-election every 2 years. This structure was a deliberate compromise (the "Great Compromise" of 1787) between larger states wanting representation based on population and smaller states wanting equal representation regardless of size. Both chambers must pass identical versions of a bill for it to become law (sent to the President to sign or veto), but they have some distinct powers: the House alone can initiate revenue/spending bills and impeach federal officials, while the Senate alone confirms presidential appointments (Cabinet members, federal judges, Supreme Court justices) and ratifies treaties, and holds impeachment trials.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-civics-electoral-college',
    title: 'How the US Presidential Election and Electoral College Work',
    category: 'civics',
    keywords: ['how does voting work in a presidential election', 'electoral college explained', 'how many electoral votes to win', 'electoral votes needed president', '270 electoral votes'],
    content: `US presidents are not elected by a simple national popular vote — they're elected through the **Electoral College**, a system where each state is assigned a number of "electoral votes" roughly proportional to its population (equal to its number of Representatives plus its 2 Senators; Washington DC also gets 3). There are **538 total electoral votes**, and a candidate needs a majority — **270 votes** — to win the presidency. When you vote in a presidential election, you're technically voting for a slate of "electors" pledged to a candidate in your state, not directly for the candidate. In 48 states and DC, the system is "winner-take-all" — whichever candidate wins the most popular votes in that state gets ALL of that state's electoral votes (Maine and Nebraska are exceptions, splitting some votes by congressional district). This system means it's possible (and has happened, including in 2000 and 2016) for a candidate to win the national popular vote but lose the Electoral College and the presidency, since what matters is winning enough individual states to reach 270 electoral votes, not the raw national vote total. This system is a frequent subject of political debate, with critics arguing it can override the popular will and gives disproportionate influence to smaller "swing states," and supporters arguing it ensures candidates must build broad geographic coalitions rather than focusing only on high-population urban centers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-civics-quorum',
    title: 'What Is a Quorum?',
    category: 'civics',
    keywords: ['what is a quorum', 'how many people needed for a quorum', 'quorum meaning', 'quorum rules'],
    content: `A quorum is the minimum number of members of a group (a legislature, board, committee, club, or any formal organization) who must be present for that group to legally conduct business and have its votes/decisions count as valid. The specific number required varies by organization and is usually defined in that group's governing rules (bylaws, a constitution, or parliamentary procedure like Robert's Rules of Order) — a common default rule of thumb is a simple majority (more than half) of all members, though many organizations set their own specific threshold, which can be higher or lower. The purpose of a quorum requirement is to prevent a small, unrepresentative minority of members from making binding decisions for the whole group when most members aren't even present to weigh in — for example, in the US House of Representatives, a quorum is a majority of members (218 of 435); without a quorum present, the body generally cannot officially vote on legislation, though it can still conduct some limited procedural business.`,
    createdAt: Date.now(),
  },
];
