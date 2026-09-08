import { KnowledgeItem } from '../../types';

// Batch 15 (law & government) gap-fills. Live misses on nexus-4b:
// "civil law vs criminal law" -> answered common-law-system vs civil-law-system
// instead (homonym); "habeas corpus" -> vague "forerunner of habeas corpus";
// "rule of law" / "due process" -> only Magna Carta history, no definition;
// "what is a jury" -> "most people get released after waiting around... Socrates";
// "what is a constitution" -> only described the US one.
export const LAW_GOVERNMENT_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-civil-vs-criminal-law',
    title: 'Civil Law vs Criminal Law',
    category: 'Law',
    keywords: [
      'what is the difference between civil law and criminal law', 'civil law vs criminal law',
      'civil case vs criminal case', 'difference between a civil and criminal case', 'what is civil law',
      'what is criminal law', 'civil suit vs criminal charge',
    ],
    content: `This is about two types of legal case, not two legal systems. Criminal law deals with acts considered offences against society as a whole (theft, assault, murder, fraud). The case is brought by the state/government (the "prosecution" or "Crown"), the standard of proof is high — "beyond a reasonable doubt" — and the penalties are punishment: prison, fines paid to the state, probation, a criminal record. Civil law (in this sense) deals with disputes between private parties — people, companies, organisations — such as breach of contract, negligence causing injury, property disputes, divorce, defamation. The case is brought by the wronged party (the "plaintiff") against the "defendant", the standard of proof is lower — "the balance of probabilities" / "preponderance of the evidence" — and the outcome is usually money (damages) or a court order to do or stop doing something, not jail. The same act can lead to both: e.g. a drunk driver who injures someone can be prosecuted criminally AND sued civilly by the victim. (Separately, "civil law" can also mean the codified Roman-based legal SYSTEM used in France, Germany, Quebec, etc., as opposed to common law — a different meaning of the term.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-habeas-corpus',
    title: 'What Habeas Corpus Is',
    category: 'Law',
    keywords: [
      'what is habeas corpus', 'habeas corpus meaning', 'what does habeas corpus mean', 'writ of habeas corpus',
      'define habeas corpus', 'why is habeas corpus important',
    ],
    content: `Habeas corpus (Latin, "you shall have the body") is a legal action that lets a person who is imprisoned or detained challenge whether that detention is lawful. A court issues a "writ of habeas corpus" ordering whoever is holding the person to bring them before the court and justify the imprisonment; if there is no lawful basis, the court orders their release. It is one of the oldest and most important protections against arbitrary or indefinite detention by the state — its roots go back to English law and Magna Carta (1215), and it was formalised in the Habeas Corpus Act 1679. It appears in the US Constitution (which says the "privilege" can only be suspended "in cases of rebellion or invasion"), in Canadian law, and in many other legal systems. It does not decide guilt or innocence — only whether the detention itself is legal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rule-of-law',
    title: 'What the Rule of Law Means',
    category: 'Government',
    keywords: [
      'what is the rule of law', 'rule of law meaning', 'what does rule of law mean', 'define rule of law',
      'why is the rule of law important', 'rule of law vs rule by law',
    ],
    content: `The rule of law is the principle that everyone — including the government, officials, and the most powerful people — is subject to the law and accountable under it, rather than being ruled by the arbitrary decisions of individuals. Its core elements: laws are public, clear, stable and applied prospectively (not retroactively); the same law applies equally to everyone; nobody is punished except for a defined breach of law, proven in a fair process; and disputes are decided by independent, impartial courts. It is often contrasted with "rule by law" (where rulers use law as a tool to control others but are not bound by it themselves) and with arbitrary or personal rule. The idea has deep historical roots (Magna Carta forced the English king to accept that even he was under the law), but the modern principle is broader than any one document.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-due-process',
    title: 'What Due Process Is',
    category: 'Law',
    keywords: [
      'what is due process', 'due process meaning', 'what does due process mean', 'define due process',
      'due process of law', 'procedural vs substantive due process',
    ],
    content: `Due process is the requirement that the government must follow fair, established legal procedures before it deprives anyone of life, liberty or property. In practice that means things like: fair notice of the charge or action against you, a genuine chance to be heard before a neutral decision-maker, the right to present evidence and challenge the other side's, a decision based on the record, and often the right to a lawyer and to appeal. "Procedural due process" is about the fairness of the procedure itself; "substantive due process" (mainly a US concept) is the idea that some rights are so fundamental the government can't take them away no matter what procedure it uses. In the United States it comes from the 5th and 14th Amendments; equivalent guarantees exist elsewhere as "natural justice", "fundamental justice" (Canada's Charter s. 7), or "the right to a fair hearing".`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-jury',
    title: 'What a Jury Is',
    category: 'Law',
    keywords: [
      'what is a jury', 'what does a jury do', 'jury meaning', 'how does a jury work', 'what is jury duty',
      'trial by jury', 'how many people are on a jury',
    ],
    content: `A jury is a group of ordinary citizens, chosen at random from the community, whose job is to decide the questions of FACT in a trial — most importantly, in a criminal case, whether the accused is guilty or not guilty. The judge decides questions of law and the sentence; the jury decides what happened based only on the evidence presented in court. A criminal trial jury is typically 12 people (sometimes fewer for less serious cases), and in many systems a criminal conviction requires a unanimous verdict. Jurors are selected from voter or licence rolls, screened for bias, and serving is a legal obligation ("jury duty"). Trial by jury is meant to put a check of community judgement between the state and the individual — it's protected in the US Constitution, the Canadian Charter (for serious offences), and has roots in Magna Carta's "judgement of his peers". Juries are used in serious criminal cases and, in some countries (especially the US), some civil cases; most countries use them far less than the US does.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-constitution',
    title: 'What a Constitution Is',
    category: 'Government',
    keywords: [
      'what is a constitution', 'constitution meaning', 'what does a constitution do', 'define constitution',
      'what is in a constitution', 'written vs unwritten constitution', 'does the uk have a constitution',
    ],
    content: `A constitution is the fundamental set of rules that establishes a state's system of government: what the branches of government are, what powers each one has and how they check each other, how leaders are chosen, the relationship between different levels of government (national vs regional), and usually a list of the rights of citizens that the government cannot violate. It is "higher law" — ordinary laws that conflict with it can be struck down. Most countries have a single written constitutional document (the US Constitution of 1787 is the oldest still in force; Canada's is spread across the Constitution Acts of 1867 and 1982, which include the Charter of Rights and Freedoms). A few, like the United Kingdom, New Zealand and Israel, have an "unwritten" or "uncodified" constitution — the rules exist but are spread across many statutes, court decisions and long-standing conventions rather than one document. Constitutions are usually harder to change than normal laws (e.g. needing a supermajority or a referendum).`,
    createdAt: Date.now(),
  },
];
