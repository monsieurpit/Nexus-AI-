import { KnowledgeItem } from '../../types';

// Batch 54 (philosophy concepts) gap-fills. Strong category (~19/25). Live
// misses on nexus-4b: "free will versus determinism" -> pulled in
// "self-determination theory" (a psychology theory, not the philosophy);
// "deontology vs consequentialism" -> "deontology is just... wrong, basically";
// "meaning of life according to philosophy" -> "Socrates was all about
// eudaimonia" and nothing else. Rest are precision/completeness fixes.
export const PHILOSOPHY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-free-will-determinism',
    title: 'Free Will vs Determinism',
    category: 'Philosophy',
    keywords: [
      'what is free will versus determinism', 'free will vs determinism', 'what is hard determinism', 'what is compatibilism',
      'do we have free will', 'is everything predetermined', 'libertarian free will philosophy',
    ],
    content: `DETERMINISM is the view that every event, including every human decision, is the inevitable result of prior causes plus the laws of nature — so if you rewound the universe and replayed it, everything would happen exactly the same way. The question is whether that leaves room for FREE WILL (genuine control over our choices, and moral responsibility). Three main positions: HARD DETERMINISM — determinism is true, therefore free will is an illusion and no one is ultimately responsible for anything. LIBERTARIANISM (the philosophical kind, unrelated to the political party) — we do have real free will, and therefore strict determinism about human choices must be false; some appeal to indeterminism in physics, though randomness isn't obviously "control" either. COMPATIBILISM — the most widely held view among philosophers — free will and determinism are compatible: to act "freely" just means to act according to your own desires and reasoning without being coerced or compelled, and that can be true even if those desires themselves have causes. (Self-determination theory in psychology is a separate thing about motivation, not this debate.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-deontology-vs-consequentialism',
    title: 'Deontology vs Consequentialism',
    category: 'Philosophy',
    keywords: [
      'what is the difference between deontology and consequentialism', 'deontology vs consequentialism', 'what is deontology',
      'what is consequentialism', 'kantian ethics vs utilitarianism', 'do the ends justify the means philosophy',
      'rule-based vs outcome-based ethics',
    ],
    content: `These are the two great families of ethical theory about what makes an action right. CONSEQUENTIALISM judges an act ENTIRELY by its outcomes: the right action is the one that produces the best overall results. Utilitarianism is the main version (maximise happiness / well-being / preference-satisfaction, counting everyone equally). On this view, the ends can justify the means — lying, or even sacrificing one person, is right if it produces enough good. DEONTOLOGY (from Greek "deon," duty) judges an act by whether it conforms to moral RULES or DUTIES, regardless of consequences. Kant's version: act only on principles you could will everyone to follow, and always treat people as ends in themselves, never merely as means — so some acts (lying, breaking a promise, killing an innocent) are simply forbidden even when they'd lead to better outcomes; there are also rights that can't be overridden by the greater good. Neither is "just wrong" — each captures real moral intuitions, and the trolley problem is famous precisely because it pulls people toward consequentialism in one version and deontology in another. Virtue ethics is a third major approach that focuses on character instead of acts.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-meaning-of-life-philosophy',
    title: 'The Meaning of Life, According to Philosophy',
    category: 'Philosophy',
    keywords: [
      'what is the meaning of life according to philosophy', 'does life have a meaning', 'philosophical views on the meaning of life',
      'subjective vs objective meaning of life', 'nihilism absurdism meaning', 'what makes a life meaningful',
    ],
    content: `Philosophy has no consensus answer, but the main positions cluster into a few families. RELIGIOUS/SUPERNATURAL views: life's meaning comes from a relationship with God or the divine, or from fulfilling a cosmic plan or reaching an afterlife. OBJECTIVE-NATURALIST views: there's no cosmic purpose, but a life is genuinely meaningful (not just to the person living it) when it's connected to things of real worth — creating knowledge or beauty, loving others, moral achievement, contributing to something larger than yourself (Susan Wolf: meaning comes from "active engagement in projects of worth"). SUBJECTIVIST views: meaning is whatever a person finds deeply fulfilling and commits themselves to; there's no external standard, so your life means whatever you make it mean (an existentialist theme — Sartre, "existence precedes essence"). NIHILISM: there is no meaning of life, full stop. ABSURDISM (Camus): the universe is silent and offers no meaning, but rather than despair or a leap to faith, you can rebel against the absurd and live fully anyway — "one must imagine Sisyphus happy." Aristotle's older answer is that the point of a human life is "eudaimonia," flourishing through the exercise of reason and virtue.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-social-contract',
    title: 'What the Social Contract Is',
    category: 'Philosophy',
    keywords: [
      'what is the social contract', 'hobbes locke rousseau social contract', 'state of nature philosophy',
      'why do we obey the government', 'consent of the governed', 'social contract theory',
    ],
    content: `Social contract theory tries to explain why political authority is legitimate and why people have an obligation to obey the law — by imagining what life would be like without any government (the "state of nature") and what people would rationally agree to in order to leave it. Thomas HOBBES (1651): without a state, life is a "war of all against all," "solitary, poor, nasty, brutish, and short," so rational people would hand almost all their freedom to an absolute sovereign in exchange for security. John LOCKE (1689): the state of nature has natural rights (life, liberty, property) but no impartial enforcement, so people consent to a limited government that protects those rights — and if it violates them, the people may replace it (this influenced the American Declaration of Independence). Jean-Jacques ROUSSEAU (1762): "Man is born free, and everywhere he is in chains"; a legitimate state is one where citizens collectively author the laws (the "general will"), so obeying the law is obeying yourself. John RAWLS (1971) revived the idea with the "veil of ignorance." The recurring point: legitimate authority comes from the consent of the governed, not from a king's or god's command.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-problem-of-evil',
    title: 'What the Problem of Evil Is',
    category: 'Philosophy',
    keywords: [
      'what is the problem of evil', 'problem of evil god', 'epicurean paradox', 'why does god allow suffering',
      'the free will defense', 'theodicy', 'logical vs evidential problem of evil', 'natural evil vs moral evil',
    ],
    content: `The problem of evil is the challenge that the existence of suffering poses to belief in a God who is all-powerful (omnipotent), all-knowing (omniscient) and all-good (omnibenevolent). The old Epicurean formulation: if God can prevent evil but won't, He isn't good; if He would but can't, He isn't all-powerful; if He can and would, why is there evil? Two versions: the LOGICAL problem argues it's a flat contradiction for such a God and any evil to coexist (largely answered by philosophers like Plantinga); the EVIDENTIAL problem argues that the sheer amount and distribution of suffering — especially of children and animals — is strong evidence against such a God. Distinguish MORAL evil (cruelty, injustice, done by human choice) from NATURAL evil (earthquakes, disease, predation). Attempts to answer it are called "theodicies": the free-will defence (a world with genuine freedom, and so the possibility of evil, is better than a world of puppets); the "soul-making" argument (hardship builds moral and spiritual character); appeals to a greater good or limits we can't see; or, in some traditions, denying that God is omnipotent or that evil is fully real.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-moral-relativism',
    title: 'What Moral Relativism Is',
    category: 'Philosophy',
    keywords: [
      'what is moral relativism', 'is morality relative or objective', 'cultural relativism ethics', 'descriptive vs normative relativism',
      'moral relativism problems', 'can we judge other cultures', 'is there objective morality',
    ],
    content: `Moral relativism is the view that there are no universal, objective moral truths — what is right or wrong depends on the standards of a particular culture, society, historical period or individual, and there's no neutral standpoint from which to rank one set of standards above another. It comes in versions: DESCRIPTIVE relativism is just the observation that different cultures do in fact hold different moral views (which is largely true and uncontroversial). META-ETHICAL relativism is the stronger philosophical claim that moral judgements are only ever true or false relative to some framework, with no framework-independent fact of the matter. NORMATIVE relativism goes further: you ought to tolerate practices that your own culture would condemn. Common objections: it seems to make it impossible to say another society's practices (slavery, genocide, oppression of women) are genuinely wrong; it makes moral progress and moral reformers incoherent (if the majority defines right, the reformer is by definition wrong); and normative relativism arguably contradicts itself (it asserts "tolerance" as a universal duty). Its opposite, moral objectivism/universalism, holds that at least some moral truths hold for everyone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-is-ought-problem',
    title: "What the Is–Ought Problem Is",
    category: 'Philosophy',
    keywords: [
      'what is the is-ought problem', 'humes guillotine', 'can you derive ought from is', 'fact value distinction',
      'naturalistic fallacy vs is-ought', 'deriving morality from science', 'hume descriptive prescriptive',
    ],
    content: `The is–ought problem, raised by David Hume in 1739, points out that arguments about morality typically slide from purely DESCRIPTIVE statements (about what IS the case — facts about the world, human nature, biology, God's commands, what most people do) to PRESCRIPTIVE conclusions (about what OUGHT to be done) without ever explaining how that leap is justified. Logically, you cannot validly derive an "ought" conclusion from premises that contain only "is" statements — you need at least one premise that already contains a value or a norm. This is sometimes called "Hume's guillotine" or the fact–value distinction. Its bite: it means you can't get an ethics straight out of science, evolution, "human nature," religion or tradition alone — each of those tells you how things are, and you still need a separate moral premise ("we ought to promote survival," "we ought to obey God") to reach a conclusion about what to do. It's related to, but distinct from, G. E. Moore's "naturalistic fallacy" (that "good" can't be defined as any natural property like "pleasant" or "desired"). Some philosophers argue the gap can be bridged; most think it at least has to be taken seriously.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ship-of-theseus',
    title: 'What the Ship of Theseus Is',
    category: 'Philosophy',
    keywords: [
      'what is the ship of theseus', 'theseus paradox identity', 'if you replace every part is it the same object',
      'grandfathers axe paradox', 'personal identity over time', 'is a rebuilt object the same object',
    ],
    content: `The Ship of Theseus is a thought experiment about identity over time. As the ship's wooden planks rot, they're replaced one by one, until eventually not a single original plank remains. Is it still "the same ship"? Most people say yes — gradual replacement preserves identity. But now add a twist: suppose someone collected all the discarded original planks and reassembled them into a ship. Now there are two ships, and they can't both be the original — so which one is? There's no agreed answer; the puzzle exposes that "the same object" is ambiguous between identity by continuous existence and function versus identity by original matter. The same problem applies far beyond ships: your body replaces most of its cells over years; "my grandfather's axe" has had two new heads and three new handles; a band replaces all its members; a country persists through centuries though every citizen, law and border has changed; and — most importantly — it's a model for the question of personal identity, of what makes you the same person as the child you were.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-solipsism',
    title: 'What Solipsism Is',
    category: 'Philosophy',
    keywords: [
      'what is solipsism', 'only my mind exists', 'can you prove the external world exists', 'problem of other minds',
      'brain in a vat argument', 'is solipsism refutable', 'why doesnt anyone believe solipsism',
    ],
    content: `Solipsism is the philosophical position that the only thing you can be certain exists is your own mind — everything else, including the physical world and other people's minds, might be an illusion, a dream, or a construction of your own consciousness, and you can never conclusively prove otherwise. It's the endpoint of radical skepticism: from your point of view, all you ever have direct access to is your own experiences, and any inference from those to an external reality could be mistaken (Descartes flirted with this in his method of doubt; the modern versions are the "brain in a vat" and the simulation argument). Solipsism is famously very hard to refute by pure logic, but it's also a position almost no one actually holds, because it's psychologically impossible to live and it explains nothing — it doesn't tell you why your experiences are so consistent, orderly and surprising. Most philosophers treat it as a challenge to be answered (why we're rationally entitled to believe in an external world and other minds) rather than a serious contender.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-existentialism',
    title: 'What Existentialism Is',
    category: 'Philosophy',
    keywords: [
      'what is existentialism', 'existentialist philosophers', 'existence precedes essence', 'sartre existentialism',
      'what is bad faith existentialism', 'condemned to be free', 'kierkegaard existentialism',
    ],
    content: `Existentialism is a mostly 19th–20th-century movement holding that there is no pre-given human nature, essence or cosmic purpose that tells you how to live — "existence precedes essence" (Sartre): you exist first, and then, through your choices and actions, you make yourself who you are. Its central claims and moods: radical FREEDOM and responsibility — you're "condemned to be free," fully responsible for what you become, with no excuses ("bad faith" is lying to yourself that you had no choice); ANGST/anguish at that freedom; the search for AUTHENTICITY, living by your own chosen values rather than the herd's or society's roles; and confronting death, meaninglessness and the "absurd" without flinching. Forerunners: Søren Kierkegaard (the individual's leap of faith) and Friedrich Nietzsche. Key figures: Jean-Paul Sartre, Simone de Beauvoir (who applied it to women's situation in "The Second Sex"), Martin Heidegger, Karl Jaspers, and, loosely, Albert Camus — though Camus rejected the label and is usually classed with "absurdism," the closely related idea that we crave meaning in a universe that offers none.`,
    createdAt: Date.now(),
  },
  // --- Batch 110 additions ---
  {
    id: 'kb-gap-necessary-vs-sufficient-condition',
    title: 'Necessary vs Sufficient Condition',
    category: 'Philosophy',
    keywords: [
      'what is a necessary versus a sufficient condition', 'necessary condition must be present for something to be the case but might not be enough on its own oxygen for fire',
      'sufficient condition if present guarantees the thing but might not be the only way being a dog is sufficient for being a mammal', 'p is necessary for q means if q then p p is sufficient for q means if p then q',
      'necessary and sufficient means if and only if biconditional',
    ],
    content: `A NECESSARY condition for something is one that must hold for that thing to be true or to happen — without it, the thing is impossible — but its presence alone may not be enough. Oxygen is necessary for fire; being at least 35 years old is necessary to be US President; having a ticket is necessary to board the plane. A SUFFICIENT condition is one whose presence guarantees the thing, though it may not be the only route to it. Being a dog is sufficient for being a mammal; scoring 100% is sufficient for passing the exam. In terms of conditionals: "P is necessary for Q" means "if Q then P" (Q can't be true without P); "P is sufficient for Q" means "if P then Q" (P brings Q with it). A condition can be one, the other, both, or neither. When it is both necessary and sufficient, the two things are equivalent — "P if and only if Q" — as in "a triangle is equilateral if and only if all three angles are equal."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-category-error',
    title: 'What a Category Error (Category Mistake) Is',
    category: 'Philosophy',
    keywords: [
      'what is a category error', 'category mistake attributing to something a property it cannot possibly have because it belongs to the wrong logical category', 'gilbert ryle the concept of mind',
      'the number seven is green what does justice smell like', 'ryle university example shown the colleges and libraries then asking where is the university', 'ryle used it against cartesian dualism ghost in the machine',
      'category error is not a statistics concept',
    ],
    content: `A category error (or category mistake) is treating something as if it belonged to a logical category it does not belong to — asking of it a question, or ascribing to it a property, that simply cannot apply. "The number seven is green," "what does the colour blue weigh," and "what does justice smell like" are category errors: numbers aren't the sort of thing that has a colour, colours aren't the sort of thing that has weight. The term was made famous by the British philosopher Gilbert Ryle in The Concept of Mind (1949). His illustration: a visitor is shown all the colleges, libraries, laboratories and offices of Oxford, then asks, "But where is the University?" — mistakenly expecting the University to be one more building of the same kind, when in fact it is the organised whole those things constitute. Ryle used the idea to attack Descartes' mind-body dualism (which he mocked as "the ghost in the machine"): he argued that talking about "the mind" as a second, non-physical thing existing alongside the body is itself a category mistake, because mental terms describe patterns and dispositions of behaviour, not the workings of a hidden inner substance. (This is a concept in logic and philosophy of language, not a statistical concept.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-deductive-vs-inductive-reasoning',
    title: 'Deductive vs Inductive Reasoning',
    category: 'Philosophy',
    keywords: [
      'what is the difference between deductive and inductive reasoning', 'deductive reasoning from general premises to a conclusion that must be true if the premises are truth preserving certainty math proofs syllogisms valid or invalid',
      'inductive reasoning from specific observations to a general or probabilistic conclusion likely but not guaranteed scientific generalisation strong or weak', 'abductive reasoning inference to the best explanation',
      'the sun has risen every day so it will rise tomorrow is inductive', 'all men are mortal socrates is a man therefore socrates is mortal is deductive',
    ],
    content: `DEDUCTIVE reasoning moves from premises to a conclusion that is guaranteed if the premises are true — the conclusion contains no more than what the premises already imply, so it is "truth-preserving." "All men are mortal; Socrates is a man; therefore Socrates is mortal" is deductive: if the premises hold, the conclusion cannot be false. Mathematics and formal logic run on it. Deductive arguments are judged as valid or invalid (does the conclusion follow?), and a valid argument with true premises is called sound. INDUCTIVE reasoning moves from specific observations to a broader generalisation or prediction that is probable but not certain — the conclusion goes beyond the evidence. "Every swan I've seen is white, so all swans are white" and "the sun has risen every day so far, so it will rise tomorrow" are inductive; more evidence raises confidence but never gives proof (as the discovery of black swans showed). Inductive arguments are judged as strong or weak rather than valid or invalid. Most scientific reasoning is inductive. A third mode, ABDUCTIVE reasoning, is "inference to the best explanation" — picking the hypothesis that would, if true, best account for the observations (how a detective or a diagnosing doctor works).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ethics-vs-morality',
    title: 'Ethics vs Morality',
    category: 'Philosophy',
    keywords: [
      'what is the difference between ethics and morality', 'often used interchangeably when distinguished morality is the actual norms and beliefs about right and wrong held by a person or society first order practice',
      'ethics is the systematic philosophical study and justification of morality second order reflection metaethics normative ethics applied ethics', 'ethics also used for professional codes medical ethics legal ethics',
      'morality is the practice ethics is the theory about the practice',
    ],
    content: `In everyday use "ethics" and "morality" are near-synonyms, and many philosophers use them interchangeably. When a distinction is drawn, it usually runs like this: MORALITY is the first-order thing — the actual set of norms, values, rules and judgements about right and wrong, good and bad, that a person or a society holds and lives by ("stealing is wrong," "you should keep promises"). ETHICS is the second-order, reflective activity — the systematic study of morality: asking what makes actions right or wrong, whether moral claims can be true, and which moral principles withstand scrutiny. Philosophical ethics is usually divided into metaethics (the nature and status of moral claims), normative ethics (which general theory — consequentialism, deontology, virtue ethics — is correct), and applied ethics (specific issues like euthanasia or AI). Separately, "ethics" is also the ordinary word for the codes of conduct of a profession — medical ethics, legal ethics, research ethics. The short version: morality is the practice; ethics is the theory and examination of that practice.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knowledge-vs-belief-gettier',
    title: 'Knowledge vs Belief (and the Gettier Problem)',
    category: 'Philosophy',
    keywords: [
      'what is the difference between knowledge and belief', 'belief is holding something to be true knowledge is traditionally justified true belief plato theaetetus',
      'you can believe something false but you cannot know something false knowledge requires truth plus a good reason', 'gettier problem 1963 justified true belief is not always knowledge lucky guesses that happen to be right',
      'responses add a no false lemmas condition or a reliabilist condition',
    ],
    content: `A belief is simply something you hold to be true. Knowledge is more demanding. The classic analysis, going back to Plato's Theaetetus, is that knowledge is JUSTIFIED TRUE BELIEF: to know that P, (1) you must believe P, (2) P must actually be true, and (3) you must have adequate justification — a good reason — for believing it. So you can believe a falsehood, but you cannot know a falsehood; and a true belief you hold for no good reason (a lucky guess) isn't knowledge either. In 1963 Edmund Gettier published short counterexamples showing that all three conditions can be met and it still isn't knowledge — cases where your justification points at the truth only by luck. This launched decades of attempts to fix the definition — adding that the justification must involve "no false steps," or that the belief must be produced by a reliable process, or that it must not be true by luck — with no single fix universally accepted.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trolley-problem-footbridge',
    title: 'The Trolley Problem (Both Versions)',
    category: 'Philosophy',
    keywords: [
      'what is the trolley problem', 'runaway trolley heading toward five people you can pull a lever to divert it onto a side track killing one instead', 'footbridge variant push a large stranger off a bridge to stop the trolley and save five',
      'most people pull the lever but refuse to push revealing intuitions killing is worse than letting die using a person as a means is worse', 'introduced by philippa foot developed by judith jarvis thomson',
      'doctrine of double effect trolley problem in autonomous vehicle ethics',
    ],
    content: `The trolley problem is a family of ethics thought experiments introduced by Philippa Foot (1967) and developed by Judith Jarvis Thomson. In the basic "switch" version, a runaway trolley will kill five people on the track ahead; you can pull a lever to divert it onto a side track where it will kill one person instead. Most people say you should pull the lever — the consequentialist answer, five deaths versus one. In the "footbridge" version, the only way to stop the trolley and save the five is to push a large stranger off a bridge into its path, killing him. The numbers are identical, but now most people refuse. The puzzle is why the two cases feel so different. Proposed explanations include: killing someone is worse than merely letting someone die; actively using a person as a means to an end (the footbridge) is worse than harming them as a foreseen side effect (the switch), which is the "doctrine of double effect"; and physically pushing engages a stronger emotional response than flipping a switch. The problem is now a standard reference point in discussions of self-driving-car ethics, though many philosophers argue those real cases are quite different.`,
    createdAt: Date.now(),
  },
];
