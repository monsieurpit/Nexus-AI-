import { KnowledgeItem } from '../../types';

// Batch 74 (Greek mythology, deeper). nexus-4b misses: "who is Apollo"
// answered about the NASA Apollo program; "what is the story of Theseus"
// answered with the Ship of Theseus philosophy puzzle; "who are the Three
// Fates" answered with the Norse Norns; "who is Zeus" claimed he stole fire
// (that was Prometheus); "what is the myth of King Midas" called him an
// "asshole pharaoh" cursed by Aphrodite (he was a Phrygian king and it was
// Dionysus).
export const GREEK_MYTHOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-apollo-god',
    title: 'Who Apollo Is (Greek God)',
    category: 'Mythology',
    keywords: [
      'who is apollo', 'apollo greek god of', 'apollo oracle of delphi', 'apollo artemis twins', 'apollo sun music prophecy',
      'is apollo the sun god', 'apollo lyre laurel muses', 'apollo god not the nasa program',
    ],
    content: `Apollo is one of the Twelve Olympian gods of Greek mythology — not the NASA Moon program. He is the god of light and the sun, music and poetry, prophecy, archery, healing, and (its flip side) plague. He is the son of Zeus and the Titaness Leto, and the twin brother of Artemis, goddess of the hunt and the Moon. His most important cult site was Delphi, home of the Oracle, where the priestess Pythia delivered his prophecies and where "know thyself" was inscribed. He is usually shown as a beautiful, beardless youth with a lyre (or a golden bow), crowned with laurel — the tree into which the nymph Daphne transformed to escape him — and he leads the nine Muses. Myths involving him include the slaying of the serpent Python, the flaying of the satyr Marsyas for challenging him to a music contest, his love for Hyacinthus, and the punishments he sent when disrespected, such as the plague on the Greek camp at the start of the Iliad. The Romans worshipped him under the same name.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-theseus-story',
    title: 'The Story of Theseus',
    category: 'Mythology',
    keywords: [
      'what is the story of theseus', 'theseus and the minotaur', 'ariadne thread labyrinth', 'theseus founder hero of athens',
      'why is the aegean sea named after aegeus', 'theseus black sails white sails', 'theseus vs the ship of theseus puzzle',
    ],
    content: `Theseus is the legendary founder-hero and king of Athens (this is the myth of the hero, distinct from the "Ship of Theseus" philosophical puzzle about identity). He was raised in Troezen and, on reaching manhood, travelled to Athens clearing the road of bandits and monsters, and was recognised by his father, King Aegeus. His most famous exploit: Athens was forced to send seven youths and seven maidens to Crete every few years to be fed to the Minotaur, a bull-headed monster kept in the Labyrinth built by Daedalus for King Minos. Theseus volunteered, and Minos's daughter Ariadne, in love with him, gave him a ball of thread to unwind on the way in so he could find his way back out. He killed the Minotaur and escaped, but abandoned Ariadne on the island of Naxos, and then forgot to change his ship's black mourning sails to white as a signal of success. Seeing the black sails, Aegeus threw himself from a cliff into the sea, which was thereafter called the Aegean. Theseus also united the towns of Attica into one state, fought the Amazons, and joined the hunt for the Calydonian Boar.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-three-fates-moirai',
    title: 'Who the Three Fates (Moirai) Are',
    category: 'Mythology',
    keywords: [
      'who are the three fates', 'the moirai greek mythology', 'clotho lachesis atropos', 'thread of life fate',
      'are the fates the same as the norns', 'greek goddesses of destiny', 'can the fates be overruled by zeus',
    ],
    content: `In Greek mythology the Three Fates are the Moirai, three goddesses who control the thread of every mortal's life. Clotho ("the spinner") spins the thread onto her spindle at birth; Lachesis ("the allotter") measures out its length, deciding how long the person lives and what happens to them; and Atropos ("the inflexible"), the smallest and most terrible, cuts the thread with her shears at the moment of death. Their decrees are binding even on the gods — Zeus himself is usually said to be subject to fate, though a few myths let him bend it. They are the Greek figures; the Norse Norns (Urd, Verdandi and Skuld) are the parallel destiny-weavers of a different mythology and should not be confused with them. The Roman equivalent is the Parcae (Nona, Decima and Morta). The expression "cut short" and the image of a "lifeline" both trace back to the Moirai.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-achilles-heel',
    title: "Who Achilles Is and What His Weakness Was",
    category: 'Mythology',
    keywords: [
      'who is achilles and what is his weakness', 'achilles heel meaning', 'river styx thetis achilles', 'achilles death paris arrow',
      'achilles greatest greek warrior troy', 'why did achilles fight hector', 'achilles tendon origin',
    ],
    content: `Achilles is the greatest Greek warrior of the Trojan War and the central figure of Homer's Iliad. He was the son of Peleus, a mortal king, and Thetis, a sea nymph. According to the best-known version, Thetis tried to make him immortal by dipping him as a baby in the River Styx; the water made his whole body invulnerable except the heel by which she held him — his one fatal weak point, the origin of the phrase "Achilles' heel" for a single hidden vulnerability (and the name of the tendon at the back of the ankle). At Troy his rage drives the Iliad: he withdraws from the fighting after a quarrel with Agamemnon, rejoins only after his close companion Patroclus is killed by the Trojan prince Hector, and then kills Hector and drags his body around the walls. Achilles himself is later killed when Paris, guided by the god Apollo, shoots an arrow into his heel.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-king-midas',
    title: 'The Myth of King Midas',
    category: 'Mythology',
    keywords: [
      'what is the myth of king midas', 'midas golden touch', 'was midas a pharaoh', 'dionysus granted midas the golden touch',
      'river pactolus midas', 'midas donkey ears apollo pan', 'the midas touch meaning',
    ],
    content: `Midas was a king of Phrygia (in what is now Turkey) — not an Egyptian pharaoh. In the famous myth, he showed hospitality to Silenus, the elderly companion of the wine-god Dionysus, and as a reward Dionysus (not Aphrodite) offered him any wish. Midas asked that everything he touched turn to gold. Delighted at first, he quickly found he could not eat or drink — his food and wine turned to metal — and in the cruelest versions he turned his own daughter to gold with an embrace. Begging to be released, he was told by Dionysus to wash in the River Pactolus, which carried the golden touch away (and, the Greeks said, is why that river's sands were rich in gold). "The Midas touch" now means an ability to make money from anything, usually said without irony. A separate Midas myth: he judged Pan's pipes better than Apollo's lyre in a music contest, and Apollo gave him the ears of a donkey.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-zeus-detail',
    title: 'Who Zeus Is',
    category: 'Mythology',
    keywords: [
      'who is zeus', 'zeus king of the gods', 'zeus overthrew cronus titanomachy', 'zeus sky thunder justice',
      'did zeus steal fire', 'zeus poseidon hades divided the world', 'zeus many affairs offspring',
    ],
    content: `Zeus is the king of the Greek gods and ruler of Mount Olympus, god of the sky, thunder and lightning, law, order, justice and hospitality. He is the youngest child of the Titans Cronus and Rhea. Cronus swallowed each of his children at birth to prevent being overthrown; Rhea hid the infant Zeus, who grew up, forced Cronus to disgorge his siblings (Poseidon, Hades, Hera, Demeter, Hestia), and led them in the ten-year war against the Titans (the Titanomachy), winning with the help of the Cyclopes, who forged his thunderbolts. Afterward the three brothers drew lots: Zeus took the sky, Poseidon the sea, Hades the underworld, with the earth and Olympus shared. Zeus is famous for his countless affairs — with goddesses, nymphs and mortal women, often in disguise (a swan, a bull, golden rain) — producing many gods and heroes (Athena, Apollo, Artemis, Hermes, Dionysus, Heracles, Perseus) and the constant jealous anger of his wife Hera. Note: Zeus did NOT steal fire from the gods — that was the Titan Prometheus, whom Zeus then punished.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trojan-war-full',
    title: 'The Story of the Trojan War',
    category: 'Mythology',
    keywords: [
      'what is the story of the trojan war', 'judgement of paris golden apple', 'helen of troy menelaus paris', 'trojan horse',
      'achilles hector agamemnon troy', 'how did the trojan war end', 'iliad odyssey trojan war',
    ],
    content: `The Trojan War myth begins at a wedding, where the goddess of discord throws down a golden apple "for the fairest." Paris, a prince of Troy, is made to judge between Hera, Athena and Aphrodite; he chooses Aphrodite, who has bribed him with Helen, the most beautiful woman in the world — already the wife of Menelaus, king of Sparta. Paris takes Helen to Troy, and Menelaus's brother Agamemnon leads a massive Greek expedition to get her back. The siege lasts ten years. Homer's Iliad covers only a few weeks near the end, centred on the rage of Achilles, his withdrawal from battle, the death of his friend Patroclus, and his killing of the Trojan champion Hector. Achilles is later killed by an arrow to his heel. The war ends by a trick usually credited to Odysseus: the Greeks build a huge hollow wooden horse, hide soldiers inside, and pretend to sail away; the Trojans drag it into the city as a trophy, and that night the hidden Greeks open the gates and Troy is sacked and burned. Odysseus's ten-year voyage home is the subject of the Odyssey.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sisyphus-myth',
    title: 'The Myth of Sisyphus',
    category: 'Mythology',
    keywords: [
      'what is the myth of sisyphus', 'why was sisyphus punished', 'sisyphus cheated death twice', 'sisyphus boulder uphill forever',
      'sisyphus chained thanatos', 'sisyphean task meaning', 'camus myth of sisyphus absurdism',
    ],
    content: `Sisyphus was the cunning founder and king of Corinth. In the myth he twice cheated death: first he trapped and chained Thanatos (Death) so that no one on earth could die, until the gods intervened; then, having arranged for his own body to be left unburied, he talked Hades (or Persephone) into letting him return to the living to "scold his wife," and simply stayed, living to old age. As punishment for this defiance and trickery, the gods condemned him in the underworld to roll a huge boulder up a hill; every time it nears the top it rolls back down, and he must begin again, forever. A "Sisyphean task" is any endless, futile labour. The 20th-century philosopher Albert Camus, in "The Myth of Sisyphus" (1942), reinterpreted this as an image of the human condition — confronting a meaningless universe — and argued "one must imagine Sisyphus happy," finding meaning in the struggle itself; that essay is a later reading, not part of the ancient myth.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dionysus',
    title: 'Who Dionysus Is',
    category: 'Mythology',
    keywords: [
      'who is dionysus', 'dionysus god of wine', 'dionysus born from zeus thigh semele', 'maenads bacchae dionysus',
      'dionysus and greek theatre', 'only olympian with a mortal parent', 'bacchus roman dionysus',
    ],
    content: `Dionysus (the Romans' Bacchus) is the Greek god of wine, the grape harvest, fertility, vegetation, ecstasy, ritual madness and the theatre. He is the son of Zeus and the mortal princess Semele — the only major Olympian with a human parent. Semele was tricked by a jealous Hera into asking Zeus to appear in his full divine form and was burnt up; Zeus rescued the unborn Dionysus and sewed him into his own thigh until he was ready to be born, so Dionysus is called "twice-born." His followers, the maenads (or Bacchae), women in a state of divine frenzy, roam the mountains; his symbols are the thyrsus (a fennel staff topped with a pine cone), the grapevine and ivy, and the leopard. He travels the world spreading viticulture and punishing those who deny his divinity — most famously King Pentheus of Thebes, torn apart by his own mother in Euripides' play "The Bacchae." The Athenian festival in his honour, the City Dionysia, is where Greek tragedy and comedy were first performed.`,
    createdAt: Date.now(),
  },
];
