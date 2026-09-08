import { KnowledgeItem } from '../../types';

// Batch 31 (logic & fallacies) gap-fills. Strong category (~18/25). Live misses
// on nexus-4b: "begging the question" -> answered red herring; "bandwagon
// fallacy" -> answered slippery slope ("Not 100% certain here..."); "what is
// whataboutism" -> "Some commentators have defended the usage... Goalposts
// Persuasive definition" web dump; "what is a logical fallacy" -> defined it
// only by giving the straw-man example.
export const LOGIC_FALLACIES_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-logical-fallacy',
    title: 'What a Logical Fallacy Is',
    category: 'Logic',
    keywords: [
      'what is a logical fallacy', 'what does logical fallacy mean', 'what is a fallacy', 'formal vs informal fallacy',
      'types of logical fallacies', 'why are fallacies bad', 'what is an error in reasoning',
    ],
    content: `A logical fallacy is a flaw in reasoning that makes an argument invalid, weak or misleading — the argument may still feel persuasive, but the conclusion isn't properly supported by the premises. There are two broad kinds. A FORMAL fallacy is a defect in the argument's structure, so it's invalid no matter what it's about (e.g. "affirming the consequent": if it rained the ground is wet; the ground is wet; therefore it rained — ignores other ways the ground could get wet). An INFORMAL fallacy is a problem with the content, context or language rather than the form — irrelevant appeals (to emotion, authority, popularity, force), misrepresenting the opponent (straw man), attacking the person (ad hominem), assuming what you're trying to prove (begging the question), hasty generalisations, false dilemmas, and so on. Spotting a fallacy shows an argument is badly made; it does NOT prove the conclusion is false (that's the "fallacy fallacy").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-whataboutism',
    title: 'What Whataboutism Is',
    category: 'Logic',
    keywords: [
      'what is whataboutism', 'what does whataboutism mean', 'whataboutism examples', 'whataboutism vs tu quoque',
      'deflecting criticism with what about', 'why is whataboutism a fallacy',
    ],
    content: `Whataboutism is deflecting a criticism or awkward question by immediately pointing to a supposed wrong committed by the accuser or by someone else — "What about when YOU did X?" / "What about country Y?" — instead of actually answering the point raised. It's a variant of the tu quoque ("you too") fallacy and of the red herring: even if the counter-accusation is true, it doesn't address or excuse the original issue. The term became well known as a Cold War-era Soviet rhetorical tactic (responding to criticism of the USSR with "And you are lynching Negroes"), and it's now common in political debate and online arguments. It works because it feels like a fair comeback and shifts the burden onto the other person, but logically it's a dodge — two wrongs don't make a right, and the original claim still stands unanswered.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-begging-the-question',
    title: 'What "Begging the Question" Means',
    category: 'Logic',
    keywords: [
      'what is begging the question', 'begging the question fallacy', 'what does begging the question mean',
      'begging the question vs raising the question', 'petitio principii', 'circular argument example',
    ],
    content: `"Begging the question" (Latin petitio principii) is a fallacy where an argument assumes the very thing it's supposed to prove — the conclusion is smuggled into the premises, so the argument goes in a circle and proves nothing to anyone who doesn't already agree. Example: "Paranormal activity is real because I've experienced things that can only be explained by the paranormal." Another: "Free speech is good for society because a society benefits when people can speak freely." It's closely related to circular reasoning. Note a very common MISUSE: in everyday speech people say "that begs the question…" to mean "that raises the question…" or "that prompts the obvious follow-up." Careful writers avoid that usage and say "raises the question" instead, reserving "begs the question" for the fallacy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bandwagon-fallacy',
    title: 'What the Bandwagon Fallacy Is',
    category: 'Logic',
    keywords: [
      'what is the bandwagon fallacy', 'bandwagon fallacy meaning', 'appeal to popularity', 'argumentum ad populum',
      'everyone believes it so it must be true', 'bandwagon fallacy examples', 'appeal to the majority',
    ],
    content: `The bandwagon fallacy (also "appeal to popularity" or argumentum ad populum) is arguing that a claim is true, or an action is right, simply because a lot of people believe it or do it — "everyone knows that…", "millions of users can't be wrong", "it's the most popular choice, so it must be the best". Popularity is not evidence: whole populations have been wrong for centuries (that the Sun orbits the Earth, that bloodletting cured disease), and advertising and social pressure spread beliefs regardless of merit. It's used a lot in marketing and peer pressure ("everyone's going"). A close cousin is the appeal to tradition ("we've always done it this way"). Popularity CAN be weak evidence in narrow cases — if nearly all experts in a field agree, that consensus carries weight — but "lots of ordinary people think so" on its own proves nothing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-correlation-causation',
    title: 'Why Correlation Does Not Imply Causation',
    category: 'Logic',
    keywords: [
      'what is the correlation does not imply causation principle', 'correlation is not causation', 'why does correlation not imply causation',
      'what is a confounding variable', 'spurious correlation', 'does one thing cause the other',
    ],
    content: `"Correlation does not imply causation" means that just because two things rise and fall together, it doesn't follow that one causes the other. There are several innocent explanations for a correlation: (1) coincidence — with enough data sets, some will line up by chance (ice-cream sales and drowning deaths both rise in summer). (2) A confounding third factor causes both — the real driver here is hot weather. (3) Reverse causation — you assumed A causes B, but B causes A. (4) A two-way loop. To actually establish causation you need more: a plausible mechanism, the cause coming before the effect, a dose-response relationship, and ideally a controlled experiment (randomised trial) that changes one variable while holding others fixed. Observational data can only suggest causation; it can't prove it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-burden-of-proof',
    title: 'What the Burden of Proof Is',
    category: 'Logic',
    keywords: [
      'what is the burden of proof', 'who has the burden of proof', 'burden of proof meaning', 'shifting the burden of proof',
      'the one who asserts must prove', 'do i have to disprove a claim', 'burden of proof in an argument',
    ],
    content: `The burden of proof is the obligation to provide evidence or reasoning for a claim. The core rule: whoever makes a positive claim carries the burden of supporting it — "the one who asserts must prove." It is not the job of the doubter to disprove an unsupported claim; a claim made without evidence can be dismissed without evidence. So if someone says "there's a teapot orbiting the Sun" or "this supplement cures cancer," they must back it up; you don't have to prove it isn't so. "Shifting the burden of proof" is a fallacy where someone makes a claim and then demands that YOU disprove it ("prove ghosts aren't real"). In law the burden also sits with the party bringing the case, and the required standard varies — "beyond a reasonable doubt" in criminal trials, "balance of probabilities" in civil ones.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hasty-generalization',
    title: 'What a Hasty Generalization Is',
    category: 'Logic',
    keywords: [
      'what is a hasty generalization', 'hasty generalization fallacy', 'what is a faulty generalization', 'jumping to conclusions fallacy',
      'small sample size fallacy', 'anecdotal evidence fallacy', 'hasty generalization examples',
    ],
    content: `A hasty generalization is drawing a broad conclusion about a whole group or pattern from a sample that is too small, not representative, or biased. Examples: "I met two rude people from that city, so everyone there is rude"; "my grandfather smoked and lived to 95, so smoking isn't harmful"; judging an entire country by one bad holiday. The problem is that small or cherry-picked samples don't reliably reflect the whole, and vivid personal anecdotes feel more convincing than they should (the related "anecdotal fallacy"). To generalize soundly you need a large enough sample, chosen to represent the group, and you should account for how much variation there is. It's the opposite failure from ignoring strong statistical evidence in favour of one story.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-appeal-to-nature',
    title: 'What the Appeal to Nature Fallacy Is',
    category: 'Logic',
    keywords: [
      'what is the appeal to nature fallacy', 'appeal to nature meaning', 'natural means good fallacy', 'is natural always better',
      'naturalistic fallacy', 'appeal to nature examples',
    ],
    content: `The appeal to nature fallacy is arguing that something is good, safe, right or better simply because it is "natural," or bad because it is "unnatural" or "artificial." Natural things can be harmful (arsenic, hemlock, snake venom, deadly bacteria, hurricanes), and many artificial things are enormously beneficial (vaccines, antibiotics, eyeglasses, water treatment). "Natural" is also a vague, often marketing-driven label with no consistent meaning. The fallacy shows up in advertising ("all-natural, so it's healthy"), in rejecting medical treatments, and in debates about food, medicine and lifestyle. Whether something is good has to be judged on its actual effects and evidence, not on where it came from. (Philosophers also use a related term, the "naturalistic fallacy," for deriving what OUGHT to be from what simply IS.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-non-sequitur',
    title: 'What a Non Sequitur Is',
    category: 'Logic',
    keywords: [
      'what is a non sequitur', 'non sequitur meaning', 'what does non sequitur mean', 'non sequitur fallacy',
      'when a conclusion does not follow', 'non sequitur examples',
    ],
    content: `A non sequitur (Latin for "it does not follow") is a statement or conclusion that has no logical connection to what came before it. In formal logic it's the broad label for any argument whose conclusion simply doesn't follow from its premises, even if each premise is true — for example, "She's a great cook, so she'll make a great manager," or "I bought a lottery ticket, so I deserve to win." In everyday use, a non sequitur is also just a remark that comes out of nowhere in a conversation, unrelated to what was being discussed ("The meeting is at 3." "I've never trusted pelicans."), which is often played for comedic effect. Many named fallacies (like the appeal to emotion or the ad hominem) are specific types of non sequitur.`,
    createdAt: Date.now(),
  },
];
