import { KnowledgeItem } from '../../types';

// Batch 96 (logic & argumentation, deeper — batches 31 and 54 covered
// fallacies/philosophy broadly). Strong category. Real misses on nexus-4b:
// "what is the false equivalence fallacy" answered about a false dilemma
// ("presents only two options"); "the genetic fallacy" was collapsed into the
// appeal to nature; "difference between a valid and a sound argument" was a
// garbled web dump; "what is the sunk cost fallacy" was cut off mid-sentence;
// "the motte and bailey fallacy" garbled the mechanism.
export const LOGIC_ARGUMENTATION_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-false-equivalence',
    title: 'What the False Equivalence Fallacy Is',
    category: 'Logic',
    keywords: [
      'what is the false equivalence fallacy', 'treating two things as comparable when they differ in scale or severity', 'false equivalence vs false dilemma',
      'bothsidesism false balance media', 'both candidates lied so equally dishonest', 'that is the same as no different from',
    ],
    content: `A false equivalence is treating two things as equivalent — morally, logically, or in importance — when they actually differ in a way that matters, usually in scale, severity, evidence, frequency, or kind. It flattens a real difference so one side looks better or worse than it is. Examples: "Both candidates told lies, so they're equally dishonest" (when one told a small exaggeration and the other told dozens of serious falsehoods); "Scientists have been wrong before, so climate science can't be trusted" (equating an isolated corrected error with an entire field's converging evidence); "Jaywalking and armed robbery are both against the law, so..."; and media "both-sidesing" a question where the evidence overwhelmingly favours one answer ("false balance"). It often appears as the phrases "that's the same as" or "no different from." It is NOT the same as a false dilemma, which is the fallacy of wrongly limiting the choices to only two.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-genetic-fallacy',
    title: 'What the Genetic Fallacy Is',
    category: 'Logic',
    keywords: [
      'what is the genetic fallacy', 'judging a claim by its origin or source not its merits', 'genetic fallacy vs appeal to nature vs appeal to tradition',
      'that idea came from a bad person so it is wrong', 'you only believe that because of how you were raised', 'etymology fallacy',
    ],
    content: `The genetic fallacy is judging a claim, idea, or argument as true or false based on its ORIGIN — where it came from, who first said it, or how someone came to hold it — rather than on its actual content and the evidence for it. A good idea can come from a bad source, and a bad idea from a respectable one. Examples: "You only support that policy because you were raised that way, so it must be wrong"; "That theory was first proposed by a scientist who was later discredited on another topic, so it's false"; "The founder of this company was a crook, therefore the product is bad"; "This word has an offensive etymology, so using it today is offensive" (etymology is not current meaning). The "appeal to nature" (it's natural, therefore good), the "appeal to tradition" (we've always done it this way, therefore it's right), and "poisoning the well" are all common special cases of the genetic fallacy. Knowing an idea's origin can be a reason to examine it more carefully, but it is not by itself evidence for or against the idea.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-valid-vs-sound-argument',
    title: 'The Difference Between a Valid and a Sound Argument',
    category: 'Logic',
    keywords: [
      'what is the difference between a valid and a sound argument', 'valid argument conclusion follows necessarily from premises', 'sound argument valid plus all premises actually true',
      'valid but not sound argument false premise', 'every sound argument is valid not every valid argument is sound', 'strong vs weak inductive argument',
    ],
    content: `A VALID argument is one whose conclusion follows necessarily from its premises: IF the premises were all true, it would be impossible for the conclusion to be false. Validity is purely about the logical structure and says nothing about whether the premises are actually true. So this argument is valid even though its premises are false: "All fish can fly. A salmon is a fish. Therefore a salmon can fly." A SOUND argument is a valid argument whose premises are ALSO all actually true — which makes its conclusion guaranteed to be true. "All humans are mortal. Socrates is a human. Therefore Socrates is mortal" is both valid (good structure) and sound (true premises). Every sound argument is valid, but not every valid argument is sound. In a debate, saying an argument is "valid but not sound" means "your reasoning is fine, but one of your starting assumptions is wrong." (These terms apply to deductive arguments; inductive arguments are instead described as "strong" or "weak," and "cogent" if they are also built on true premises.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sunk-cost-fallacy-clean',
    title: 'What the Sunk Cost Fallacy Is',
    category: 'Logic',
    keywords: [
      'what is the sunk cost fallacy', 'continuing because of what you have already invested not future value', 'sunk cost money time effort cannot be recovered',
      'throwing good money after bad', 'finishing a bad movie because you paid for it', 'would i start this today sunk cost',
    ],
    content: `The sunk cost fallacy is the tendency to keep investing time, money, or effort into something — a project, a job, a degree, a relationship, a losing investment, a movie you're not enjoying — because of how much you have already put in, instead of deciding based purely on whether continuing is the best choice going forward. Money and effort already spent are "sunk": they are gone regardless of what you do next, so they should carry no weight in the decision — only the future costs and future benefits from this point on should matter. Everyday examples: eating food you don't want because you paid for it; staying in a career you dislike because of the years of training behind you; a company or government pouring more resources into a failing project because so much is already committed ("throwing good money after bad"). The corrective question is: "Knowing what I know now, would I choose to start this today?" This does not mean quitting everything at the first difficulty — it means not letting past investment, by itself, trap you into a bad future.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-motte-and-bailey',
    title: 'What the Motte-and-Bailey Fallacy Is',
    category: 'Logic',
    keywords: [
      'what is the motte and bailey fallacy', 'defensible modest claim vs bold controversial claim switch', 'retreat to the motte when challenged then return to the bailey',
      'medieval castle motte bailey analogy argument', 'equivocating between a strong and a weak version of a claim', 'nicholas shackel motte and bailey',
    ],
    content: `The motte-and-bailey fallacy is named after a type of medieval castle: the "bailey" is a spacious, pleasant courtyard where you actually want to live but which is hard to defend, and the "motte" is a small, cramped stone tower on a raised mound that is easy to defend but no good to live in. In argument, someone advances a bold, useful, controversial claim (the bailey) — for example, "science is just one belief system among many, no more objective than religion." When challenged, they retreat to a much weaker, obviously reasonable claim (the motte) — "all I'm saying is that scientists are human and influenced by their funding and culture." The critic can't really dispute the motte, so eases off — and the arguer then quietly goes back to asserting the strong bailey claim as though it had been successfully defended. The fallacy is treating two importantly different claims as if they were one and the same, and sliding between the strong version and the weak version depending on whether the point is under attack. It was named by the philosopher Nicholas Shackel.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-whataboutism-clean',
    title: 'What Whataboutism Is',
    category: 'Logic',
    keywords: [
      'what is whataboutism', 'deflecting criticism by pointing to a different wrong', 'tu quoque appeal to hypocrisy', 'what about when you did x what about country y',
      'whataboutism does not rebut the original point', 'changing the subject muddying the waters whataboutism',
    ],
    content: `Whataboutism is a form of the "tu quoque" (Latin, "you too") or appeal-to-hypocrisy fallacy: deflecting a criticism or an uncomfortable question by immediately raising a different alleged wrong — usually committed by the accuser, their side, or someone else — instead of addressing the point that was made. "You say my government censors the press? What about the surveillance YOUR government does?" The move can feel like a rebuttal, but it isn't one: whether the accuser is also guilty of something has no bearing on whether the original criticism is true. Its purposes are to change the subject, put the critic on the defensive, and suggest that "everyone is equally bad, so no one has standing to judge." It is not a fallacy when the comparison is genuinely relevant — for example, pointing out that a critic is applying an inconsistent standard, or that the two situations really are analogous — but it is a fallacy when the point of raising it is simply to avoid answering.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-appeal-to-authority',
    title: 'What the Appeal to Authority Fallacy Is (and When It Is Not a Fallacy)',
    category: 'Logic',
    keywords: [
      'what is appeal to authority', 'argument from authority fallacy vs legitimate expert testimony', 'appeal to authority who is not an expert in the field',
      'celebrity endorsement appeal to authority', 'expert consensus is reasonable evidence not proof', 'lone expert against the consensus',
    ],
    content: `An appeal to authority uses the fact that some person or body endorses a claim as support for that claim. It is a FALLACY when the "authority" is not actually an expert in the relevant field (a famous actor promoting a health product, a Nobel physicist opining on economics), when a single authority is cited against a strong consensus of other experts, when the authority is biased or being paid, or when their word is treated as absolute proof that ends all discussion. It is NOT a fallacy — it is reasonable, though not conclusive, evidence — to defer to the settled consensus of qualified experts in a field you are not equipped to judge yourself (accepting that vaccines are safe, that the climate is warming, that a bridge design is sound), because that consensus is itself the product of evidence and peer review. The key questions: is this a genuine expert in this specific field, do other experts agree, and is the claim being offered as strong evidence or as an unchallengeable last word?`,
    createdAt: Date.now(),
  },
];
