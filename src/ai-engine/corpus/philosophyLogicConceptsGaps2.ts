import { KnowledgeItem } from '../../types';

/**
 * PHILOSOPHY_LOGIC_CONCEPTS_GAPS_2 — batch 218 corrections.
 * Misses driven by homonyms: "validity vs soundness" answered psychometric
 * test validity, "value vs fact judgment" answered artistic "value" (lightness),
 * "analytic vs synthetic statements" answered analytic/synthetic Cubism,
 * "wisdom vs intelligence" answered wisdom teeth, "positive vs normative
 * statements" answered positive vs negative liberty. Plus web dumps for
 * syllogism/enthymeme and coherence/correspondence truth, and muddled
 * right/duty and justice/fairness.
 */
export const PHILOSOPHY_LOGIC_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-phil2-validity-vs-soundness',
    title: 'Validity vs soundness (in logic)',
    category: 'philosophy',
    keywords: [
      'difference between validity and soundness', 'validity vs soundness logic', 'valid argument',
      'sound argument', 'form versus truth of premises', 'conclusion follows necessarily',
      'true premises plus valid form', 'not psychometric test validity', 'deductive argument',
    ],
    content: `These describe deductive arguments (not the "validity" of a psychological test, which is a different concept).

An argument is VALID if its logical form is such that IF the premises were all true, the conclusion would HAVE to be true — the conclusion follows necessarily from the premises. Validity is only about structure, not about whether the premises are actually true. "All fish can fly; salmon are fish; therefore salmon can fly" is valid: the reasoning is airtight even though a premise is false.

An argument is SOUND if it is (1) valid AND (2) all of its premises are actually true. A sound argument therefore has a true conclusion, guaranteed. "All humans are mortal; Socrates is human; therefore Socrates is mortal" is sound: valid form plus true premises.

So every sound argument is valid, but not every valid argument is sound (it can be valid with a false premise). To attack an argument you either show the form is invalid (the conclusion doesn't follow) or show a premise is false (so it isn't sound). Validity is about the shape; soundness adds the requirement that you built it on truth.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-analytic-vs-synthetic-statements',
    title: 'Analytic vs synthetic statements (not Cubism)',
    category: 'philosophy',
    keywords: [
      'difference between analytic and synthetic statements', 'analytic vs synthetic proposition',
      'true by definition', 'true in virtue of the world', 'Kant', 'Quine two dogmas',
      'bachelors are unmarried', 'the cat is on the mat', 'not analytic cubism',
    ],
    content: `In philosophy of language (this is not about analytic and synthetic Cubism in art):

An analytic statement is true (or false) purely in virtue of the meanings of its words, so you do not need to check the world to know it. The predicate is "contained in" the subject. Examples: "All bachelors are unmarried", "A triangle has three sides", "2 + 2 = 4". Denying an analytic truth is a kind of contradiction.

A synthetic statement's truth depends on how the world actually is; the predicate adds information not already contained in the subject, so you need experience or observation to settle it. Examples: "The cat is on the mat", "Water boils at 100 degrees Celsius at sea level", "Some bachelors are lonely".

Kant introduced the distinction and argued there are also "synthetic a priori" truths (informative yet knowable by reason, he thought maths and geometry). The empiricists tied analytic to a priori and synthetic to a posteriori. W.V.O. Quine, in "Two Dogmas of Empiricism", attacked the sharp analytic/synthetic boundary, arguing no statement is entirely immune from revision. But the basic distinction is: true by meaning alone (analytic) versus true because of the facts (synthetic).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-value-vs-fact-judgment',
    title: 'Value judgment vs factual (descriptive) statement',
    category: 'philosophy',
    keywords: [
      'difference between a value and a fact judgment', 'value judgment vs factual claim',
      'normative versus descriptive', 'is versus ought', 'evaluative statement', 'can be verified',
      'good bad right wrong', 'not artistic value lightness', 'objective versus evaluative',
    ],
    content: `This is about kinds of claims, not about "value" meaning lightness/darkness in art.

A factual (descriptive) statement asserts something about how the world is, and in principle it can be checked against evidence and found true or false: "The unemployment rate rose 2% last year", "Lead is denser than aluminium", "This policy reduced traffic deaths by 10%". People can disagree about a factual claim, but there is a fact of the matter.

A value judgment (evaluative or normative statement) asserts that something is good or bad, right or wrong, better or worse, beautiful or ugly, just or unjust, or that something ought or ought not to be done: "The government should raise the minimum wage", "That was a cruel thing to do", "This is the best album of the decade". It expresses an evaluation or a prescription, not just a description, and it cannot be settled by observation alone.

Hume's is-ought gap points out that you cannot validly derive a value judgment ("we ought to X") from purely factual premises ("X is the case") without smuggling in at least one other value premise. Many real statements mix both ("this dangerous intersection needs a light" combines a factual claim about danger with a value judgment about what should be done).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-positive-vs-normative',
    title: 'Positive vs normative statements',
    category: 'philosophy',
    keywords: [
      'difference between positive and normative statements', 'positive vs normative economics',
      'what is versus what ought to be', 'descriptive versus prescriptive', 'testable claim',
      'value-laden claim', 'not positive versus negative liberty', 'fact versus opinion in economics',
    ],
    content: `This distinction, used heavily in economics and social science, is essentially the fact/value distinction. It is not about positive versus negative liberty (Isaiah Berlin's separate idea).

A positive statement is descriptive: it says what IS, was, or will be, and it can in principle be tested against data and confirmed or refuted, even if doing so is hard. Examples: "Raising the minimum wage increases unemployment among teenagers", "Inflation was 4% last year", "Cutting this tax will raise the deficit". A positive statement can be wrong, but the disagreement is about facts.

A normative statement is prescriptive: it says what OUGHT to be, what is good or bad, or what should be done, and it rests on values, so it cannot be settled by data alone. Examples: "The government should raise the minimum wage", "Reducing inequality is more important than maximising growth", "It is unfair to tax inheritance".

The point of separating them is that reasonable people can agree on all the positive facts and still disagree on policy because they hold different values, and conversely that debates framed as moral often hide a factual disagreement that evidence could resolve.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-right-vs-duty',
    title: 'Right vs duty (obligation)',
    category: 'philosophy',
    keywords: [
      'difference between a right and a duty', 'right vs duty', 'entitlement versus obligation',
      'claim right', 'correlative duties', 'positive and negative duties', 'moral and legal obligation',
      'Hohfeld', 'what you may claim versus what you must do',
    ],
    content: `A right is an entitlement: something you may legitimately claim, do, or demand, which others (often the state) are required to respect. Rights come in types — liberty rights (freedom to act: speech, movement, religion), claim rights (a valid claim that someone provide or not deny something: a fair trial, payment on a contract), and so on.

A duty (obligation) is a requirement to act or to refrain from acting — something you are morally or legally bound to do whether or not you want to. Duties also come in types: negative duties (do NOT harm, do not steal, do not interfere) and positive duties (DO provide aid, keep promises, pay taxes, care for your children).

The two are linked by correlativity: many rights entail a matching duty on someone else. Your right to free speech implies a duty on the government not to censor you; a creditor's right to be repaid implies your duty to pay. But not every duty has a corresponding right-holder (some hold a general duty of charity is not owed to any specific person), and some rights (liberty rights) mainly generate duties of non-interference rather than duties to provide.

Short version: a right is what you are owed or permitted; a duty is what you owe or must do.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-justice-vs-fairness',
    title: 'Justice vs fairness',
    category: 'philosophy',
    keywords: [
      'difference between justice and fairness', 'justice vs fairness', 'giving each their due',
      'impartial treatment', 'distributive retributive procedural justice', 'Rawls justice as fairness',
      'the broader concept', 'not procedural versus substantive due process',
    ],
    content: `Fairness is the narrower, more everyday idea: treating people impartially and consistently, without favouritism, bias or arbitrary discrimination, and applying the same rules to everyone in like situations. A referee is fair if they apply the rules evenly; a process is fair if everyone gets the same opportunity to be heard.

Justice is the broader concept: people getting what they are due — the proper distribution of benefits, burdens, rewards and punishments across a society. It has several branches:
- Distributive justice: how resources, wealth and opportunities should be shared out.
- Retributive justice: proportionate punishment for wrongdoing.
- Corrective/restorative justice: repairing harm and restoring victims.
- Procedural justice: fair, unbiased procedures for reaching decisions.

Fairness is one important ingredient of justice (especially procedural justice), but justice can require more than fairness: a perfectly fair procedure (identical rules for all) can still produce an unjust outcome if the starting positions are grossly unequal. John Rawls's "justice as fairness" argues the principles of a just society are those people would choose from behind a "veil of ignorance" not knowing their own place in it — deliberately building fairness into the foundation of justice.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-syllogism-vs-enthymeme',
    title: 'Syllogism vs enthymeme',
    category: 'philosophy',
    keywords: [
      'difference between a syllogism and an enthymeme', 'syllogism vs enthymeme', 'two premises and a conclusion',
      'unstated premise', 'suppressed premise', 'Aristotle', 'rhetorical syllogism', 'implicit assumption',
      'fully stated deductive argument',
    ],
    content: `A syllogism is a deductive argument with all its parts spelled out: two premises and a conclusion, sharing three terms. The classic example: "All men are mortal (major premise); Socrates is a man (minor premise); therefore Socrates is mortal (conclusion)." Aristotle worked out which patterns of syllogism are valid.

An enthymeme is a syllogism with one part left unstated because it is obvious or taken for granted — usually a suppressed premise, sometimes the conclusion. "Socrates is a man, so he is mortal" is an enthymeme: the premise "all men are mortal" is assumed rather than said. "She's a doctor, so she'll know what to do" leaves unstated "doctors know what to do in medical situations."

Aristotle called the enthymeme the "rhetorical syllogism" because it is how people actually argue in speech and writing — you rarely state every premise. This makes enthymemes persuasive (they invite the listener to fill in the gap and feel they reasoned it out themselves) but also a place where weak arguments hide: the unstated premise is often the questionable one. Analysing an enthymeme means making its hidden premise explicit so you can check it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-wisdom-vs-intelligence',
    title: 'Wisdom vs intelligence (not wisdom teeth)',
    category: 'philosophy',
    keywords: [
      'difference between wisdom and intelligence', 'wisdom vs intelligence', 'good judgment',
      'problem-solving ability', 'knowing what matters', 'practical wisdom phronesis', 'IQ',
      'experience and perspective', 'not wisdom teeth dental',
    ],
    content: `Intelligence is cognitive capacity: the ability to learn quickly, reason, solve problems, spot patterns, hold and manipulate information, and grasp abstract ideas. It is roughly what IQ tests try to measure. Intelligence is largely about processing power and is fairly stable across a lifetime.

Wisdom is good judgment about how to live and act, especially in complex, uncertain, value-laden situations. It involves knowing what actually matters, seeing a situation from multiple perspectives, weighing long-term against short-term, understanding people and one's own limits, tolerating ambiguity, and acting well under those conditions. Aristotle called practical wisdom "phronesis" and treated it as the master virtue that tells you how to apply all the others. Wisdom tends to grow with reflective experience and is not well captured by any test.

They can come apart: a highly intelligent person can make foolish life decisions (poor judgment, blind spots, arrogance), and a person of modest intelligence can be genuinely wise about people and priorities. Intelligence helps you find clever solutions; wisdom helps you choose the right problem to solve and the right ends to pursue. (This has nothing to do with wisdom teeth, the third molars that erupt in late adolescence.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phil2-coherence-vs-correspondence-truth',
    title: 'Correspondence vs coherence theories of truth',
    category: 'philosophy',
    keywords: [
      'difference between coherence and correspondence theories of truth', 'correspondence theory',
      'coherence theory', 'truth matches reality', 'truth is consistency with a belief system',
      'facts', 'web of belief', 'pragmatic theory', 'what makes a statement true',
    ],
    content: `These are competing philosophical accounts of what truth IS — what makes a statement true.

The correspondence theory says a statement is true if and only if it matches (corresponds to) the way the world actually is. "Snow is white" is true because, out in reality, snow is white. Truth is a relation between a claim and a mind-independent fact. This is the common-sense view and the default in science, but it faces hard questions: what exactly are "facts", and how do we compare a sentence to reality without using more sentences?

The coherence theory says a statement is true if and only if it fits consistently into a larger system of beliefs that all hang together and mutually support one another. A claim is true by virtue of its logical relationships to the rest of what we hold, not by a direct comparison with the world. It handles abstract and mathematical truths well and reflects how we actually test claims (against our other beliefs), but it is criticised because a perfectly coherent system could still be a coherent fiction, detached from reality.

(A third option, the pragmatic theory, says a belief is true if it "works" — if acting on it reliably succeeds over the long run.)`,
    createdAt: Date.now(),
  },
];
