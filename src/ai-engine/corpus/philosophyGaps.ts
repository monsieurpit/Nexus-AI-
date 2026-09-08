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
];
