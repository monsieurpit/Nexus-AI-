import { KnowledgeItem } from '../../types';

// Batch 47 (ancient Greece) gap-fills. Live misses on nexus-4b:
// "Greek city-state" -> "basically Byzantium, founded by Constantine in 330 AD";
// "who was Plato" -> "he got executed for corrupting youth" (that was Socrates);
// "Battle of Marathon" -> "the Spartans, led by Mimicus" (it was Athens under
// Miltiades); "Thermopylae" -> "King Leandros of Sparta" (Leonidas);
// "Peloponnesian War" -> "Athens won in the end" (Sparta won); "ostracism" ->
// "every ten years they'd hold one" (the assembly voted annually);
// "Athenian assembly" -> tail about hemlock (Socrates bleed).
export const ANCIENT_GREECE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-greek-city-state',
    title: 'What a Greek City-State (Polis) Was',
    category: 'Ancient Greece',
    keywords: [
      'what was a greek city state', 'what is a polis', 'greek city states list', 'why were greek city states independent',
      'athens sparta corinth thebes', 'how were greek city states governed', 'what held greek city states together',
    ],
    content: `A Greek city-state — a "polis" (plural "poleis") — was a small, independent, self-governing political community made up of a walled town and the farmland and villages around it, typically with a few thousand to a few tens of thousands of citizens. Each polis had its own government, laws, army, coinage, calendar and patron god or goddess, and Greeks identified fiercely with their own polis rather than with "Greece" as a whole. There were hundreds of them across mainland Greece, the Aegean islands, the coast of Asia Minor, and colonies around the Mediterranean and Black Sea — the biggest and most famous being Athens (a democracy and naval/cultural power) and Sparta (a militarised society), plus Corinth, Thebes, Argos and Syracuse. They shared a language, religion, the Olympic Games and a sense of being Greek (as opposed to "barbarians"), but were politically separate and frequently at war with one another. This fragmentation was a source of both their creativity and their vulnerability — it left them unable to unite against Macedon, which conquered them in 338 BC. (Byzantium was just one such polis; it later became Constantinople.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-who-was-plato',
    title: 'Who Plato Was',
    category: 'Ancient Greece',
    keywords: [
      'who was plato', 'plato philosopher', 'what did plato write', 'theory of forms', 'platos republic',
      'platos academy', 'plato and socrates', 'did plato get executed',
    ],
    content: `Plato (c. 428–348 BC) was an Athenian philosopher, a student of Socrates and the teacher of Aristotle — one of the three most influential thinkers in Western philosophy. He was NOT executed; that was his teacher Socrates, whose trial and death by hemlock in 399 BC deeply shaped Plato's thought and turned him against Athenian democracy. Plato lived to about 80 and died of natural causes. He founded the Academy in Athens (around 387 BC), often called the first institution of higher learning in the West, which ran for centuries. Almost all his work survives, written as dialogues in which characters (usually Socrates) argue toward the truth — the "Socratic method." Central ideas: the Theory of Forms (the everyday world is an imperfect shadow of a realm of perfect, eternal ideal "Forms" — of Justice, Beauty, the Good — which the mind can grasp through reason); the tripartite soul; and, in "The Republic," a blueprint for an ideal state ruled by wise "philosopher-kings," containing the famous Allegory of the Cave.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-battle-of-marathon',
    title: 'What the Battle of Marathon Was',
    category: 'Ancient Greece',
    keywords: [
      'what was the battle of marathon', 'battle of marathon 490 bc', 'who won the battle of marathon', 'miltiades marathon',
      'first persian invasion of greece', 'pheidippides marathon run', 'why is the race called a marathon',
    ],
    content: `The Battle of Marathon (490 BC) was fought on a coastal plain about 40 km from Athens, when Persia's King Darius I sent an army to punish Athens for helping the Ionian Greek revolt — the FIRST Persian invasion of Greece. The Athenians, roughly 10,000 hoplites with about 1,000 from Plataea (the Spartans were delayed by a religious festival and arrived after it was over), were led by the general Miltiades. Outnumbered, they charged the Persian line at a run, thinned their own centre and reinforced the wings, enveloped the Persians and drove them back to their ships in a decisive rout — ancient sources claim about 6,400 Persian dead against 192 Athenians. The victory stunned the Greek world (it showed the Persians could be beaten) and bought a decade before Xerxes' bigger invasion of 480 BC. Legend says a messenger, Pheidippides, ran from Marathon to Athens with news of the win and died on arrival — the story behind the modern 42.195 km marathon race (though the historical Pheidippides actually ran a far longer distance to Sparta for help before the battle).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-battle-of-thermopylae',
    title: 'What the Battle of Thermopylae Was',
    category: 'Ancient Greece',
    keywords: [
      'what was the battle of thermopylae', 'battle of thermopylae 480 bc', 'king leonidas 300 spartans', 'xerxes persian invasion',
      'who betrayed the greeks at thermopylae', 'ephialtes thermopylae', 'was it really only 300 spartans',
    ],
    content: `The Battle of Thermopylae (480 BC) was fought during the SECOND Persian invasion of Greece, led by King Xerxes I with a vast army. A Greek force under the Spartan king LEONIDAS I held the narrow coastal pass at Thermopylae ("the Hot Gates"), where the huge Persian numbers couldn't be brought to bear. It was not "300 Spartans" alone — Leonidas had his personal guard of 300 Spartans plus several thousand other Greeks (Thespians, Thebans, Arcadians and more), perhaps 7,000 in total. They held for two days of frontal assaults until a local man, Ephialtes, showed the Persians a mountain path around the pass. Learning he was being outflanked, Leonidas sent most of the army away and stayed with the 300 Spartans, the Thespians and others as a rearguard; they fought to the death. Thermopylae was a Greek defeat, but it bought time and became the West's enduring symbol of standing against overwhelming odds. The war turned soon after at the naval battle of Salamis (480 BC) and the land battle of Plataea (479 BC), which ended the invasion.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-peloponnesian-war',
    title: 'What the Peloponnesian War Was',
    category: 'Ancient Greece',
    keywords: [
      'what was the peloponnesian war', 'who won the peloponnesian war', 'athens vs sparta war', 'peloponnesian war 431 404 bc',
      'thucydides peloponnesian war', 'sicilian expedition', 'delian league',
    ],
    content: `The Peloponnesian War (431–404 BC) was a long conflict between Athens (with its maritime empire, the Delian League) and Sparta (with the Peloponnesian League) for dominance of the Greek world, chronicled by the historian Thucydides. Athens was strong at sea and behind its long walls; Sparta was supreme on land. Key phases: a first decade of raids and stalemate ending in a shaky truce (the Peace of Nicias, 421 BC); then Athens's catastrophic Sicilian Expedition (415–413 BC), where an entire fleet and army were destroyed at Syracuse; and a final phase in which Sparta, funded by Persian gold, built a navy and cut off Athens's grain supply. SPARTA WON: after the decisive naval defeat at Aegospotami (405 BC), Athens was besieged and surrendered in 404 BC. Its empire was dissolved, its walls were torn down, and a Spartan-backed oligarchy (the Thirty Tyrants) briefly ruled. The war exhausted all the Greek city-states, and within decades none was strong enough to resist the rise of Macedon.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-spartan-society',
    title: 'What Spartan Society Was Like',
    category: 'Ancient Greece',
    keywords: [
      'what was sparta like', 'spartan society structure', 'what were the helots', 'spartan agoge training',
      'spartiates perioeci helots', 'why was sparta so militarized', 'spartan women',
    ],
    content: `Sparta was an austere, militarised city-state built on rigid class division. At the top were the SPARTIATES — the few thousand full male citizens, a professional warrior elite forbidden to do manual labour or trade. Below them, the PERIOECI ("dwellers around") were free non-citizens who handled crafts, commerce and manufacturing. At the bottom, and by far the most numerous, were the HELOTS — state-owned serfs, mostly the conquered people of Messenia, who farmed the land so that every Spartiate could train for war full-time. The helots vastly outnumbered their masters and revolted repeatedly, so Sparta lived in constant fear of them, kept them terrorised (the secret-police "krypteia" could kill helots), and needed a permanent army — this is the main reason Sparta was so militarised. Spartan boys entered the harsh state upbringing, the "agoge," at age seven, trained until 30, and lived in barracks even when married. Spartan women, unusually for Greece, were educated, exercised, owned property and had a public voice, because their role was to raise strong warriors and manage estates. Sparta produced almost no art, philosophy or literature — its "constitution" and its soldiers were its achievement.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-athenian-assembly',
    title: 'What the Athenian Assembly Was',
    category: 'Ancient Greece',
    keywords: [
      'what was the athenian assembly', 'what was the ekklesia', 'how did athenian democracy vote', 'the pnyx athens',
      'how often did the athenian assembly meet', 'who could vote in athens', 'boule council of 500',
    ],
    content: `The Assembly (Ekklesia) was the main decision-making body of Athenian democracy — a mass meeting open to every adult male citizen (roughly 30,000–40,000 eligible, of whom several thousand typically attended; women, slaves and resident foreigners were excluded). It met about 40 times a year on the Pnyx, a hill west of the Acropolis, with a quorum of 6,000 for important votes. It debated and voted (by show of hands, or with pebbles/potsherds for special cases) on laws, war and peace, alliances and treaties, the grain supply, public finances, major building projects, and the election of generals — and it could put officials on trial. Any citizen had the right to stand up and speak. The agenda was prepared by the Council of 500 (the Boule), whose members were chosen by lottery for one-year terms, and juries were also large and randomly selected — Athens deliberately used the lottery, not just elections, so ordinary citizens actually held power. Pay for attendance was later introduced so poorer men could take part.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ostracism-fix',
    title: 'What Ostracism Was in Athens',
    category: 'Ancient Greece',
    keywords: [
      'what was ostracism in athens', 'how did ostracism work', 'what is an ostrakon', 'how long was an ostracism exile',
      'who was ostracised from athens', 'why did athens have ostracism', 'ostracism vs exile',
    ],
    content: `Ostracism was a procedure in Athenian democracy for removing a citizen seen as too powerful or dangerous to the state — a safety valve against would-be tyrants. Each year the Assembly voted on a single question: should an ostracism be held this year? If a majority said yes, a special vote was held about two months later, in which any citizen could scratch onto a broken piece of pottery (an "ostrakon" — hence "ostracism") the name of the man he most wanted gone. If at least 6,000 votes were cast in total, the man with the most was exiled for TEN YEARS. Crucially it was not a criminal punishment: the person kept his citizenship and property and could return afterward with full rights, and there was no trial or charge. It was aimed at prominent politicians and generals (Themistocles, Aristides "the Just," Cimon and others were ostracised), sometimes to break a political deadlock between two rivals, and it fell out of use after 415 BC. Thousands of inscribed ostraka have been dug up in Athens.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-greek-afterlife',
    title: 'What Ancient Greeks Believed About the Afterlife',
    category: 'Ancient Greece',
    keywords: [
      'what did ancient greeks believe about the afterlife', 'greek underworld beliefs', 'what happens after death in greek religion',
      'elysium tartarus asphodel', 'why did greeks bury their dead', 'coin for charron', 'greek mystery cults afterlife',
    ],
    content: `The mainstream Greek view was fairly bleak. At death the "psyche" (a shade or ghost) travelled to the Underworld, the realm of Hades, entering by crossing the river Styx (or Acheron), ferried by Charon — which is why the dead were buried with a coin in the mouth to pay him, and why proper burial rites mattered so much (an unburied soul was left to wander). Most of the dead — the ordinary majority — drifted as feeble shades in the grey Asphodel Meadows, remembering little; a favoured few heroes went to the pleasant Elysian Fields (Elysium); and the truly wicked, plus defeated Titans, were punished in the deep pit of Tartarus. There was no general resurrection or moral judgement of everyone. Two exceptions: some philosophers and religious groups — the Orphics, the Pythagoreans, and Plato — believed instead in reincarnation (the soul reborn into new bodies until purified); and the mystery cults (especially the Eleusinian Mysteries) promised initiates a happier fate after death.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-greek-theatre',
    title: 'What Ancient Greek Theatre Was Like',
    category: 'Ancient Greece',
    keywords: [
      'what was greek theatre like', 'ancient greek drama', 'greek tragedy and comedy', 'aeschylus sophocles euripides',
      'aristophanes comedy', 'the dionysia festival', 'greek theatre masks chorus', 'greek amphitheatre',
    ],
    content: `Greek theatre grew out of religious ritual and was itself an act of worship of Dionysus, god of wine and transformation. In Athens it was staged as a competition at the annual City Dionysia festival, where playwrights each presented a set of plays and judges awarded prizes. Performances were in large open-air stone amphitheatres built into hillsides (the theatre of Dionysus below the Acropolis seated ~17,000, with famous acoustics), with a circular "orchestra" for the chorus and a raised stage building (skene) behind. All performers were men, wearing large stylised masks (which also amplified the voice) and distinctive costumes; a chorus of 12–15 sang and danced, commenting on the action, while only two or three speaking actors played all the individual roles. The two main forms were TRAGEDY — serious plays on myth and moral catastrophe, by Aeschylus, Sophocles (Oedipus Rex, Antigone) and Euripides (Medea, The Bacchae) — and COMEDY, bawdy political and social satire, above all by Aristophanes (Lysistrata, The Clouds, The Frogs). These plays founded Western drama, and terms like "protagonist," "chorus," "scene" and "catharsis" come from them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-greek-philosophy',
    title: 'What Greek Philosophy Was About',
    category: 'Ancient Greece',
    keywords: [
      'what was greek philosophy about', 'pre-socratic philosophers', 'thales heraclitus parmenides', 'socrates plato aristotle',
      'stoics epicureans skeptics cynics', 'what did the greeks think philosophy was for', 'the birth of western philosophy',
    ],
    content: `Greek philosophy is usually taken as the start of the Western tradition, and it moved through phases. The PRE-SOCRATICS (from ~600 BC, in Ionia and southern Italy — Thales, Anaximander, Heraclitus, Parmenides, Pythagoras, Democritus) broke with mythological explanations and asked what the universe is fundamentally made of and how change is possible; Democritus proposed atoms. SOCRATES (469–399 BC) turned the focus to how one should live, using relentless questioning (the Socratic method) to expose that people didn't really know what justice, courage or virtue were; he wrote nothing and was executed by Athens. His pupil PLATO built a whole system around eternal ideal "Forms" and an ideal state; Plato's pupil ARISTOTLE (384–322 BC), who also tutored Alexander the Great, was more empirical — he catalogued the natural world, founded formal logic, and argued that the good life ("eudaimonia," flourishing) comes from living virtuously by reason, aiming at the "golden mean." After Alexander came the HELLENISTIC schools offering practical guidance for a chaotic world: Stoicism (accept what you can't control, live by reason and virtue), Epicureanism (seek modest, lasting pleasure and freedom from fear), Skepticism (suspend judgement), and Cynicism (reject convention and possessions).`,
    createdAt: Date.now(),
  },
];
