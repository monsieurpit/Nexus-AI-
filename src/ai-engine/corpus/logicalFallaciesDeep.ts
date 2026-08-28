import { KnowledgeItem } from '../../types';

export const LOGICAL_FALLACIES_DEEP_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-fallacies-strawman-adhominem',
    title: 'Straw Man and Ad Hominem Fallacies',
    category: 'Philosophy',
    keywords: ['what is a straw man fallacy', 'straw man argument', 'what is ad hominem', 'ad hominem attack meaning'],
    content: `A **straw man fallacy** occurs when someone misrepresents or oversimplifies another person's argument into a weaker, more extreme version that's easier to attack, then knocks down that distorted version instead of engaging with what was actually said — the name evokes attacking a flimsy stuffed "straw man" instead of a real opponent. For example, if someone argues "we should have some regulations on factory emissions" and their opponent responds "so you want to shut down every business and destroy the economy," that's a straw man — it exaggerates the original, modest claim into an extreme one nobody actually made. An **ad hominem** fallacy (Latin for "to the person") attacks the person making an argument — their character, motives, appearance, or unrelated flaws — rather than addressing the substance of their actual argument. For instance, dismissing a scientist's climate research by saying "he's just a hypocrite because he flies on airplanes" attacks the person's consistency rather than engaging with the actual data or reasoning presented. Not every personal criticism is a fallacy, though — if someone's credibility or bias is directly relevant to evaluating their claim (e.g., pointing out a paid spokesperson has a financial conflict of interest), that can be a legitimate, relevant point rather than a fallacious diversion; the fallacy specifically occurs when the personal attack substitutes for addressing the argument's actual merits.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-fallacies-slippery-slope-false-dichotomy',
    title: 'Slippery Slope and False Dichotomy Fallacies',
    category: 'Philosophy',
    keywords: ['slippery slope fallacy', 'what is a slippery slope argument', 'false dichotomy fallacy', 'false dilemma fallacy'],
    content: `A **slippery slope** argument claims that one relatively small first step will inevitably trigger a chain reaction leading to a much larger, usually negative, outcome — without adequately establishing that each step in the chain actually follows logically or inevitably from the one before it. For example, "if we allow students to redo one test, soon nobody will ever have to complete any assignment at all" skips over many intermediate steps that would need to happen (and aren't shown to be inevitable) for that extreme outcome to occur. Not all slippery-slope reasoning is fallacious — sometimes a chain of consequences really is well-supported by evidence or precedent — the fallacy specifically occurs when the chain is asserted without genuine justification for each link. A **false dichotomy** (or false dilemma) presents only two options as if they were the only possibilities, when in reality more options exist. "You're either with us or against us" is a classic false dichotomy — it ignores the possibility of neutrality, partial agreement, or entirely different positions. False dichotomies are a common rhetorical tactic because they force an audience into an artificially narrow choice, making one option look obviously correct simply because the alternative was framed as extreme or unreasonable, without honestly presenting the full range of actual possibilities.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-fallacies-authority-red-herring-circular',
    title: 'Appeal to Authority, Red Herring, and Circular Reasoning',
    category: 'Philosophy',
    keywords: ['appeal to authority fallacy', 'what is a red herring fallacy', 'circular reasoning fallacy', 'begging the question'],
    content: `An **appeal to authority** fallacy occurs when someone argues a claim must be true simply because an authority figure or celebrity said so, especially when that person lacks relevant expertise in the specific subject at hand (a famous actor endorsing a medical claim, for instance) — citing genuine, relevant expert consensus isn't inherently fallacious, but treating any authority's word as automatically settling a question, regardless of their actual expertise or the underlying evidence, is. A **red herring** is an argument tactic that introduces an irrelevant point to distract from the actual issue being discussed, deflecting attention rather than engaging directly — for example, responding to a question about a company's environmental record by pivoting to talk about how many jobs it creates, without actually addressing the environmental question raised. **Circular reasoning** (also called "begging the question") occurs when an argument's conclusion is essentially just restated as one of its own premises, so the argument never actually proves anything new — for example, "the Bible is true because it says it's the word of God, and we know that's true because the Bible says so" assumes the very thing it's trying to prove. These fallacies are common not necessarily because people are being deliberately deceptive, but because they can feel intuitively persuasive in the moment — recognizing them is a core skill of critical thinking and careful argument evaluation.`,
    createdAt: Date.now(),
  },
];
