import { KnowledgeItem } from '../../types';

export const US_FOUNDING_DOCUMENTS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-founding-us-constitution',
    title: 'The U.S. Constitution: Structure and Purpose',
    category: 'core',
    keywords: ['what is the us constitution', 'us constitution structure', 'three branches of government constitution', 'when was the constitution written'],
    content: `The **U.S. Constitution**, drafted in 1787 and ratified in 1788, is the foundational legal document establishing the structure, powers, and limits of the United States federal government, replacing the earlier, notably weaker Articles of Confederation, which had left the young nation without enough central authority to function effectively. It establishes the three-branch system of government still in place today: the **legislative branch** (Congress, split into the House of Representatives and Senate, responsible for making laws), the **executive branch** (the President, responsible for enforcing laws), and the **judicial branch** (the Supreme Court and lower federal courts, responsible for interpreting laws) — a deliberate design intended to create "checks and balances," so no single branch could accumulate excessive, unchecked power. The Constitution begins with its famous preamble ("We the People..."), outlining the government's broad purposes, and is structured into seven original articles plus a growing list of amendments. It was designed to be difficult, though not impossible, to change — amending it requires approval by two-thirds of both houses of Congress (or a constitutional convention called by two-thirds of states) plus ratification by three-fourths of all state legislatures, a high bar that has resulted in only 27 amendments being ratified in the document's entire history, despite thousands of proposed amendments over the centuries.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-founding-bill-of-rights',
    title: 'The Bill of Rights: The First Ten Amendments',
    category: 'core',
    keywords: ['what is the bill of rights', 'first ten amendments', 'freedom of speech first amendment', 'bill of rights purpose'],
    content: `The **Bill of Rights** refers to the first ten amendments to the U.S. Constitution, ratified together in 1791, added specifically to guarantee individual liberties and limit government power, addressing concerns from several states and influential figures (including Thomas Jefferson) that the original 1787 Constitution didn't sufficiently protect citizens' basic rights against potential government overreach. Key provisions include: the **First Amendment** (protecting freedom of speech, religion, the press, peaceful assembly, and the right to petition the government); the **Second Amendment** (the right to keep and bear arms, still a heavily debated and litigated provision today over its precise scope); the **Fourth Amendment** (protection against unreasonable government searches and seizures, generally requiring a warrant); the **Fifth Amendment** (protections including against self-incrimination — the basis for "pleading the Fifth" — and against being tried twice for the same crime, called double jeopardy); and the **Sixth Amendment** (the right to a speedy public trial and legal counsel in criminal cases). The Bill of Rights initially only restricted the federal government directly, not individual state governments, but over the 20th century the Supreme Court gradually applied most of its protections to states as well through a legal principle called "incorporation," primarily via the 14th Amendment's due process clause, extending these core protections much more broadly and uniformly across the whole country.`,
    createdAt: Date.now(),
  },
];
