import { KnowledgeItem } from '../../types';

// Batch 103 (law & the justice system). Much of the corpus was OK (common vs
// civil law, criminal vs civil, burden of proof, tort, felony/misdemeanor,
// habeas corpus, due process, jurisdiction, murder/manslaughter, injunction,
// defamation, plea bargaining, grand jury). Real misses on nexus-4b:
// "presumption of innocence", "void vs voidable contract", "mens rea and actus
// reus", "subpoena vs summons" and "barrister vs solicitor" were raw web dumps;
// "negligence" wrongly said "the state can go after you" (it is a civil tort);
// "intellectual property law" was thin.
export const LAW_JUSTICE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-presumption-of-innocence',
    title: 'What Presumption of Innocence Means',
    category: 'Law',
    keywords: [
      'what does presumption of innocence mean', 'presumption of innocence innocent until proven guilty', 'burden is on the prosecution the defendant need not prove anything',
      'linked to beyond a reasonable doubt and the right to silence', 'enshrined in constitutions and udhr article 11', 'presumption of innocence not a feeling it is a legal rule',
    ],
    content: `The presumption of innocence is the principle that anyone accused of a crime is treated by the law as innocent until the prosecution proves otherwise. Its practical consequences: the burden of proof rests entirely on the state, not the accused; the defendant is not required to testify, produce evidence, or explain anything, and no adverse inference may (in principle) be drawn from staying silent; and the prosecution must meet a high standard — "beyond a reasonable doubt" — before a conviction. If the evidence leaves reasonable doubt, the verdict must be acquittal. It is considered a cornerstone of a fair trial and is written into many national constitutions and into Article 11 of the Universal Declaration of Human Rights. (It is a rule about how the legal process must operate, not a philosophical or emotional idea about guilt.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-void-vs-voidable-contract',
    title: 'Void vs Voidable Contract',
    category: 'Law',
    keywords: [
      'what is the difference between a contract being void and voidable', 'void contract no legal effect from the start void ab initio as if it never existed illegal purpose',
      'voidable contract valid and enforceable until the disadvantaged party chooses to rescind it', 'voidable duress undue influence misrepresentation minor', 'right to avoid a voidable contract lost by affirmation or delay',
      'unenforceable contract vs void vs voidable',
    ],
    content: `A VOID contract has no legal force at all and never did — it is treated as if it was never formed ("void ab initio"). Neither party can enforce it. Contracts are void when the subject matter is illegal, the performance is impossible, an essential element (like consideration or certainty of terms) is missing, or a party lacked all legal capacity. A VOIDABLE contract is a valid, binding contract that one party — the disadvantaged one — has the option to either keep or cancel ("rescind"/"avoid"). It arises where consent was defective: the contract was entered under duress or undue influence, induced by misrepresentation or certain mistakes, or made by a minor or someone lacking full capacity. Until the entitled party avoids it, the contract is fully effective and enforceable; and that right to avoid can be lost by affirming the contract after learning the truth, by unreasonable delay, or once third-party rights have intervened. (A third category, "unenforceable," means a valid contract that a court simply won't enforce, e.g. for lack of required writing.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mens-rea-actus-reus',
    title: 'Mens Rea and Actus Reus',
    category: 'Law',
    keywords: [
      'what is mens rea and actus reus', 'actus reus the guilty act the physical element prohibited act or omission with a duty', 'mens rea the guilty mind the mental element intention knowledge recklessness negligence',
      'most crimes require both to coincide', 'strict liability offences require only actus reus', 'concurrence of act and intent',
    ],
    content: `These are the two elements that most crimes require. ACTUS REUS ("guilty act") is the physical element: the prohibited conduct itself. It can be a positive act (striking someone), a failure to act where the law imposes a duty (a parent not feeding a child, a driver not stopping after a collision), or sometimes a state of affairs. It must generally be voluntary. MENS REA ("guilty mind") is the mental element: the state of mind the offence requires, which varies by crime — intention (aiming to bring about the result), knowledge, recklessness (consciously taking an unjustified risk), or criminal negligence (failing to see a risk a reasonable person would). For a conviction the two normally must coincide — the guilty mind must accompany the guilty act. The main exception is "strict liability" offences (many regulatory and traffic matters), where the prosecution need only prove the actus reus and the defendant's intent is irrelevant.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-subpoena-vs-summons',
    title: 'Subpoena vs Summons',
    category: 'Law',
    keywords: [
      'what is the difference between a subpoena and a summons', 'summons notifies a person that a legal action has been started against them brings them under the court jurisdiction',
      'subpoena commands a witness to appear and testify subpoena ad testificandum or produce documents subpoena duces tecum', 'summons for a party or defendant subpoena for a witness',
      'ignoring a subpoena or summons can be contempt of court',
    ],
    content: `Both are court documents ordering someone to do something, but they target different people. A SUMMONS is served on a party to a case — most often a defendant — to notify them that a lawsuit or charge has been filed and to require their response or appearance; serving it is what formally brings that person under the court's authority. (The word is also used for an order to report for jury duty, or, in some systems, a minor criminal charge that proceeds without arrest.) A SUBPOENA is directed at a witness, who is usually not a party to the case, and commands them either to attend and give testimony ("subpoena ad testificandum") or to hand over specified documents or physical evidence ("subpoena duces tecum"). Disobeying either can be punished as contempt of court.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-negligence-elements',
    title: 'What Negligence Is (Law) and Its Four Elements',
    category: 'Law',
    keywords: [
      'what is negligence in law', 'negligence failing to exercise the care a reasonable person would causing foreseeable harm', 'four elements duty of care breach causation damages',
      'causation factual but-for test and legal proximate cause', 'negligence is a civil tort not a crime the victim sues for compensation', 'standard of care reasonable person',
    ],
    content: `Negligence is the tort (civil wrong) of causing harm by failing to take the care that a reasonable person would take in the circumstances. It is not a crime — the injured person sues the careless party for compensation ("damages"); the state is not the one bringing the case (the narrow exception is gross/criminal negligence causing death, which can be a separate criminal charge). To win a negligence claim the plaintiff must prove four elements: (1) DUTY — the defendant owed the plaintiff a legal duty of care (drivers owe it to other road users, doctors to patients, occupiers to visitors); (2) BREACH — the defendant fell below the standard of care a reasonable person would have met; (3) CAUSATION — the breach in fact caused the harm ("but for" the breach it would not have happened) and the harm was not too remote a consequence (legal/proximate cause); and (4) DAMAGES — the plaintiff suffered actual, recognised loss (injury, property damage, financial loss). If any element is missing the claim fails.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-barrister-vs-solicitor',
    title: 'Barrister vs Solicitor',
    category: 'Law',
    keywords: [
      'what is the difference between a barrister and a solicitor', 'solicitor does most legal work directly with clients advice contracts wills conveyancing preparing cases',
      'barrister specialist in courtroom advocacy and expert legal opinions instructed by a solicitor', 'split legal profession england and wales cab-rank rule chambers wigs and gowns',
      'united states canada australia have a fused or partly fused profession',
    ],
    content: `In England and Wales (and, with variations, several other common-law countries such as Ireland, Hong Kong and historically Australia) the legal profession is "split" into two branches. SOLICITORS are the general practitioners: they deal directly with clients, give day-to-day legal advice, draft contracts and wills, handle property transactions (conveyancing), manage litigation and prepare cases, and increasingly do their own courtroom advocacy in the lower courts. BARRISTERS are specialist advocates and legal advisers: they argue cases in the higher courts, provide expert written opinions on difficult points of law, and are traditionally instructed by a solicitor on the client's behalf rather than hired directly by the client. They are usually self-employed, grouped into "chambers," bound by the "cab-rank rule" (they cannot refuse a case in their field just because they dislike the client or cause), and wear wig and gown in the senior courts. The United States and most of Canada have a "fused" profession where one licensed attorney/lawyer does both roles.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-intellectual-property-law',
    title: 'What Intellectual Property Law Is',
    category: 'Law',
    keywords: [
      'what is intellectual property law', 'intellectual property law protects creations of the mind copyright patents trademarks trade secrets',
      'copyright original literary artistic musical works automatic life plus 70', 'patent new non-obvious useful invention 20 years must be applied for', 'trademark brand name logo slogan identifying a source potentially indefinite',
      'trade secret confidential business information protected as long as kept secret',
    ],
    content: `Intellectual property (IP) law is the body of law that gives people and companies rights over creations of the mind, so others cannot copy or exploit them without permission. Its main branches are distinct and often confused: COPYRIGHT protects original expressive works — writing, music, art, film, software code — arising automatically the moment the work is fixed, and lasting (in most countries) the author's life plus 70 years; it protects the expression, not the underlying idea. PATENTS protect new, non-obvious, and useful inventions (devices, processes, chemical compounds); they must be actively applied for and examined, are published, and last about 20 years from filing, after which the invention is free for anyone to use. TRADEMARKS protect brand identifiers — names, logos, slogans, sometimes colours or sounds — that tell consumers who a product comes from; they can last indefinitely as long as the mark stays in use and is renewed. TRADE SECRETS protect valuable confidential business information (formulas, customer lists, methods) for as long as the owner keeps it secret and takes reasonable steps to protect it. Related rights include registered designs and, in some countries, database and plant-variety rights.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-double-jeopardy-detail',
    title: 'What Double Jeopardy Is (and Its Limits)',
    category: 'Law',
    keywords: [
      'what is double jeopardy', 'double jeopardy cannot be tried twice for the same offence after acquittal or conviction', 'us fifth amendment attaches once the jury is sworn or first witness testifies',
      'exceptions separate sovereigns doctrine mistrial retrial after a successful defence appeal', 'double jeopardy is not the same as pleading the fifth self-incrimination',
      'uk relaxed the rule in 2005 for serious crimes with new compelling evidence',
    ],
    content: `Double jeopardy is the rule that a person cannot be prosecuted again for an offence once they have been acquitted or convicted of it. In the United States it comes from the Fifth Amendment and "attaches" once a jury is sworn (or the first witness is sworn in a bench trial), after which the prosecution generally cannot abandon and restart the case. It is a separate protection from "pleading the Fifth," which is the right not to incriminate yourself. Important limits: the "separate sovereigns" doctrine lets both a state and the federal government (or two different states) prosecute the same conduct, because they are different jurisdictions; a mistrial or a hung jury usually permits a retrial; and if a defendant successfully appeals a conviction, they can normally be retried. England and Wales, which historically applied the rule strictly, changed it in 2005 so that a person acquitted of a serious offence can be retried once if compelling new evidence emerges.`,
    createdAt: Date.now(),
  },
];
