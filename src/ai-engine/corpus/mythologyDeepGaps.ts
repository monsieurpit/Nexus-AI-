import { KnowledgeItem } from '../../types';

// Batch 35 (mythology, deeper) gap-fills. Live misses on nexus-4b:
// "Loki" -> "son of Jormungandr and Hel" (he's their FATHER); "Thor" -> "rides
// the eight-legged horse Sleipnir" (that's Odin's; Thor has a goat chariot);
// "Anubis" -> "falcon-headed" (he's jackal-headed); "Isis and Osiris" -> left
// Isis out entirely; "Orpheus and Eurydice" -> web dump cut off before the
// look-back; "Ragnarok" -> "Thor: Ragnarok is a 2017 film" dump.
export const MYTHOLOGY_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-loki-parentage',
    title: 'Who Loki Is (Norse Mythology)',
    category: 'Mythology',
    keywords: [
      'who is loki in norse mythology', 'what is loki the god of', 'loki children', 'loki parents', 'is loki a giant',
      'loki and the death of baldr', 'loki norse trickster',
    ],
    content: `Loki is the trickster figure of Norse mythology — a shape-shifting schemer who lives among the Aesir gods in Asgard but is by blood a giant (jötunn), the son of the giant Fárbauti and Laufey. He is NOT the son of the world serpent and Hel — he is their FATHER: with the giantess Angrboða he sired three monstrous children, Fenrir the wolf, Jörmungandr the world serpent, and Hel, ruler of the dead. (He also, in one tale, became the mother of Odin's eight-legged horse Sleipnir.) Loki helps the gods with clever solutions to problems he often caused, but grows steadily more malicious, engineering the death of the beloved god Baldr. For that the gods bind him beneath a serpent dripping venom until Ragnarok, when he breaks free and fights against the gods, killing and being killed by the watchman Heimdall.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-thor-goats',
    title: 'Who Thor Is (Norse Mythology)',
    category: 'Mythology',
    keywords: [
      'who is thor in norse mythology', 'what is thor the god of', 'what does thor ride', 'thor hammer mjolnir',
      'thor chariot goats', 'is thor odin son', 'thor vs jormungandr',
    ],
    content: `Thor is the Norse god of thunder, lightning, storms and strength, and the great protector of both gods and humans against the giants. He is the son of Odin and the earth goddess Jörd (Fjörgyn). His attributes: the hammer Mjölnir, which always returns to his hand and can level mountains; the belt Megingjörð that doubles his strength; and iron gloves. Thor rides a CHARIOT pulled by two goats, Tanngrisnir and Tanngnjóstr, which he can slaughter and eat at night and revive the next morning with his hammer — he does NOT ride the eight-legged horse Sleipnir, which belongs to Odin. He was the most widely worshipped god among ordinary Norse people (Thursday = "Thor's day"). At Ragnarok he kills the world serpent Jörmungandr but dies from its venom nine steps later.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-anubis-jackal',
    title: 'Who Anubis Is (Egyptian Mythology)',
    category: 'Mythology',
    keywords: [
      'who is anubis', 'what is anubis the god of', 'why does anubis have a jackal head', 'anubis and mummification',
      'weighing of the heart anubis', 'is anubis the god of death', 'anubis vs osiris',
    ],
    content: `Anubis is the ancient Egyptian god of mummification, embalming, cemeteries and the passage to the afterlife — a "psychopomp" who guides the dead. He is depicted as a man with the head of a JACKAL (or a crouching black jackal/dog), not a falcon — the black colour symbolised both the decay of the body and the fertile black soil of rebirth, and jackals were associated with cemeteries because they scavenged around graves. He was said to have invented embalming when he preserved the body of the murdered Osiris. In the judgement of the dead, Anubis leads the deceased to the scales and weighs their heart against the feather of Maat (truth); if the heart is heavier, the monster Ammit devours it. In older myth Anubis was a son of Ra; later he is called the son of Osiris and Nephthys. The falcon-headed Egyptian gods are Ra (or Ra-Horakhty) and Horus.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-isis-and-osiris',
    title: 'The Story of Isis and Osiris',
    category: 'Mythology',
    keywords: [
      'what is the story of isis and osiris', 'isis and osiris myth', 'who is isis egyptian goddess', 'how did osiris die',
      'osiris murdered by set', 'how was horus conceived', 'osiris resurrection myth',
    ],
    content: `Osiris was a wise king of Egypt (and a god), married to his sister Isis. His jealous brother Set tricked him into lying in a coffin, sealed it and threw it in the Nile; when Isis recovered the body, Set cut it into pieces (traditionally 14) and scattered them across Egypt. Isis, a powerful goddess of magic, searched the land and gathered all the pieces (in most versions she couldn't find one, so she fashioned a replacement), reassembled him with the help of Anubis and Nephthys, and used her magic to revive him just long enough to conceive a son, Horus. Osiris could not fully return to the living, so he became lord of the underworld and judge of the dead. Isis hid and raised Horus in the marshes; grown, Horus challenged Set for the throne in a long conflict and eventually won, becoming the rightful king of Egypt (which every living pharaoh was then identified with, while dead pharaohs became Osiris). The myth is the Egyptian model of death, resurrection, family loyalty, and rightful kingship.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hercules-twelve-labors',
    title: 'Heracles / Hercules and the Twelve Labours',
    category: 'Mythology',
    keywords: [
      'who is hercules and what were his twelve labors', 'the twelve labours of heracles', 'list the labors of hercules',
      'why did hercules have to do the labors', 'nemean lion hydra', 'hercules cerberus',
    ],
    content: `Heracles (Roman: Hercules) was the greatest Greek hero, son of Zeus and the mortal Alcmene, famed for superhuman strength. Zeus's wife Hera hated him and drove him into a madness in which he killed his own wife and children; as penance the oracle sent him to serve King Eurystheus, who set him ten tasks that became twelve after two were disqualified. The Twelve Labours: (1) slay the Nemean Lion (invulnerable hide); (2) kill the many-headed Lernaean Hydra; (3) capture the Ceryneian Hind; (4) capture the Erymanthian Boar; (5) clean the Augean Stables in one day (by rerouting rivers); (6) drive off the Stymphalian Birds; (7) capture the Cretan Bull; (8) steal the man-eating Mares of Diomedes; (9) obtain the belt of the Amazon queen Hippolyta; (10) fetch the cattle of the giant Geryon; (11) fetch the golden Apples of the Hesperides; (12) bring Cerberus, the three-headed hound, up from the underworld. Completing them purified him, and after death he was made a god on Olympus.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-orpheus-eurydice',
    title: 'The Story of Orpheus and Eurydice',
    category: 'Mythology',
    keywords: [
      'what is the story of orpheus and eurydice', 'orpheus and eurydice myth', 'who was orpheus', 'why did orpheus look back',
      'orpheus in the underworld', 'the myth of not looking back', 'orpheus tragic love story',
    ],
    content: `Orpheus was a legendary Greek musician and poet whose lyre-playing was so beautiful it could charm animals, trees and even stones. He married the nymph Eurydice, but on their wedding day she was bitten by a snake and died. Grief-stricken, Orpheus descended into the underworld and played music so moving that Hades and Persephone agreed to let Eurydice return to the living — on one condition: Orpheus must walk ahead of her back to the surface and NOT look back at her until they had both fully emerged into daylight. He led her up the long dark path, but just before reaching the surface, seized by doubt that she was really behind him, he turned to look — and she was still just inside the underworld, so she was pulled back down forever, with only a faint "farewell." Orpheus's failed backward glance is the archetype of losing something by not trusting at the final moment. He wandered inconsolable afterward and was eventually torn apart by the Maenads.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ragnarok-clean',
    title: 'What Ragnarök Is',
    category: 'Mythology',
    keywords: [
      'what is ragnarok', 'ragnarok norse mythology', 'the norse end of the world', 'fimbulwinter', 'who dies at ragnarok',
      'does the world end at ragnarok', 'ragnarok survivors',
    ],
    content: `Ragnarök ("fate/doom of the gods") is the prophesied end of the world in Norse mythology — a great cataclysm that the gods know is coming and cannot prevent. It is preceded by the Fimbulwinter, three years of unbroken winter, and by the breaking of all moral bonds among humans. Then the wolf Fenrir breaks free, the world serpent Jörmungandr rises from the sea, the fire giant Surtr marches from Muspelheim, and Loki leads the giants and the dead against the gods on the plain of Vígríðr. In the battle nearly everyone dies in single combat: Odin is swallowed by Fenrir; Thor kills Jörmungandr but dies of its venom; Freyr falls to Surtr; Loki and Heimdall kill each other. Surtr's fire then engulfs the nine worlds and they sink beneath the sea. But it is not a final end — the world rises again, green and renewed; a few gods survive (including Baldr, returned from the dead), and two humans, Líf and Lífthrasir, repopulate the earth.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pandoras-box',
    title: "What Pandora's Box Is",
    category: 'Mythology',
    keywords: [
      "what is pandora's box", 'pandora myth', 'who was pandora', 'what came out of pandoras box', 'why was hope left in the box',
      'was it a box or a jar', 'pandora and prometheus',
    ],
    content: `In Greek myth, after the Titan Prometheus stole fire and gave it to humans, Zeus punished humanity by having the gods create Pandora, the first woman, each giving her a gift (her name means "all-gifts"). She was sent to earth with a large sealed jar (Greek pithos — mistranslated centuries later as "box"). Despite being warned not to, Pandora opened it out of curiosity, and out flew all the evils, hardships and diseases that have plagued the world ever since — sickness, toil, sorrow, death. She slammed the lid shut, but only one thing remained trapped inside: Elpis, usually translated as "Hope." Interpretations differ on whether keeping hope inside means hope stays available to comfort humans, or that hope too is denied to them. Today "opening Pandora's box" means starting something that unleashes many troubles that can't be undone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-greek-underworld',
    title: 'The Underworld in Greek Mythology',
    category: 'Mythology',
    keywords: [
      'what is the underworld in greek mythology', 'greek underworld regions', 'what is elysium', 'what is tartarus',
      'who is charon', 'river styx', 'what is cerberus', 'where do the dead go in greek myth',
    ],
    content: `The Greek underworld — often just called "Hades" after its ruler — is the realm of all the dead, deep beneath the earth, not a place of punishment for the wicked specifically. The newly dead are led by Hermes to the river Styx (or Acheron), where the ferryman Charon takes across only those who were buried with a coin as payment; the three-headed dog Cerberus guards the gate so none escape. Inside, souls are judged and sent to a region: ELYSIUM (the Elysian Fields), a paradise for heroes and the virtuous; TARTARUS, a deep pit of torment for the truly wicked and for defeated Titans; and the ASPHODEL MEADOWS, a grey, neutral place where ordinary souls drift. The five rivers include Lethe, whose water brings forgetfulness. Ruling over it all are Hades and his queen Persephone, who spends part of each year above ground with her mother Demeter, which the Greeks used to explain the seasons.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hermes',
    title: 'Who Hermes Is',
    category: 'Mythology',
    keywords: [
      'who is hermes', 'what is hermes the god of', 'hermes messenger of the gods', 'what does hermes carry',
      'hermes winged sandals caduceus', 'hermes psychopomp', 'roman name for hermes',
    ],
    content: `Hermes is the Greek god of boundaries, travel, trade, roads, communication, cunning and luck — and the fleet-footed messenger and herald of the Olympian gods, especially Zeus. He is the son of Zeus and the nymph Maia, and famously precocious: on the day he was born he invented the lyre and stole Apollo's cattle. His attributes are winged sandals (talaria), a winged cap, and the caduceus — a herald's staff entwined with two snakes (often confused with the single-snake rod of Asclepius used as a medical symbol). He is also a "psychopomp," the god who escorts the souls of the dead down to the underworld. As patron of merchants and of thieves and tricksters alike, and as the god who moves freely between the worlds of gods, mortals and the dead, he's a crosser of every boundary. His Roman equivalent is Mercury.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trojan-war-clean',
    title: 'What the Trojan War Was',
    category: 'Mythology',
    keywords: [
      'what is the trojan war', 'what caused the trojan war', 'the trojan horse story', 'who was helen of troy',
      'achilles and hector', 'how did troy fall', 'was the trojan war real',
    ],
    content: `In Greek myth, the Trojan War was a ten-year siege of the city of Troy by an alliance of Greek kingdoms. It began when Paris, a prince of Troy, took (or abducted) Helen, the wife of King Menelaus of Sparta — this after the goddess Aphrodite promised Paris the world's most beautiful woman for judging her fairest of three goddesses. Menelaus's brother Agamemnon led the Greek fleet to get her back. The war is the subject of Homer's Iliad, which focuses on the rage of the greatest Greek warrior, Achilles, and his killing of the Trojan champion Hector. Troy finally fell through a trick devised by Odysseus: the Greeks built a giant hollow wooden horse, hid soldiers inside, and pretended to sail away; the Trojans dragged it into the city as a victory trophy, and that night the hidden Greeks came out and opened the gates. This gave us "Trojan horse" for any hidden threat. A real city at the site (Hisarlik, Turkey) was destroyed around 1180 BC, so the legend may have a historical kernel.`,
    createdAt: Date.now(),
  },
];
