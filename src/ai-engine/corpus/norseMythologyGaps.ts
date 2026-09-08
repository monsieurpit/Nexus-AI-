import { KnowledgeItem } from '../../types';

// Batch 92 (Norse mythology — batch 35 covered mythology broadly). nexus-4b
// misses: "what is Ragnarok", "what is Mjolnir" and "what is the Bifrost" all
// came back as web dumps starting with the Marvel film / Chris Hemsworth; "who
// is Baldr and how did he die" was a garbled web fragment ("King Haldingr,
// whom he eventually killed with a club"); "what are the Nine Realms" listed
// only four and refused more; "what is the story of how Thor got his hammer"
// was invented ("Thor got Mjolnir by smashing the head of Jormungandr");
// "who is Tyr" answered "some ancient Greek dude?" then talked about the
// appendix; "what is seidr" was refused ("maybe some new age bullshit or a
// crypto thing").
export const NORSE_MYTHOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-norse-mythology-overview',
    title: 'What Norse Mythology Is',
    category: 'Mythology',
    keywords: [
      'what is norse mythology', 'norse gods aesir vanir', 'poetic edda prose edda snorri sturluson', 'yggdrasil nine realms',
      'odin thor loki norse', 'viking religion myths', 'where does norse mythology come from',
    ],
    content: `Norse mythology is the set of myths of the pre-Christian North Germanic peoples of Scandinavia. Almost everything we know comes from Iceland in the 13th century — the anonymous poems of the Poetic Edda, and the Prose Edda written by the Christian scholar Snorri Sturluson as a handbook for poets — plus skaldic verse, the sagas, and archaeology. The cosmos centres on the world-tree Yggdrasil, which holds nine realms including Asgard (the gods), Midgard (humans) and Jotunheim (the giants). There are two divine families: the Aesir (Odin, Thor, Frigg, Tyr, Heimdall, Baldr) and the Vanir (Njord, Freyr, Freyja), who fought a war and then merged. The central figures are Odin — one-eyed god of wisdom, war, poetry, magic and death, who sacrificed an eye and hung himself on Yggdrasil for knowledge; Thor — the red-bearded thunder god who defends gods and humans from the giants with his hammer Mjolnir; and Loki — a shape-shifting trickster of giant descent whose schemes drift from mischief to malice and finally trigger Ragnarök, the prophesied doom in which most of the gods die, the world burns and sinks, and then rises again renewed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ragnarok',
    title: 'What Ragnarök Is',
    category: 'Mythology',
    keywords: [
      'what is ragnarok', 'ragnarok norse end of the world', 'fimbulwinter surtr bifrost shatters', 'odin swallowed by fenrir',
      'thor kills jormungandr dies nine steps', 'ragnarok survivors lif and lifthrasir', 'twilight of the gods',
    ],
    content: `Ragnarök ("fate of the gods," popularly "twilight of the gods") is the prophesied end of the world in Norse mythology — foretold, and unstoppable. It is preceded by the Fimbulwinter, three years of endless winter with no summer between; the breakdown of family and moral bonds; and the wolves Skoll and Hati finally catching and devouring the sun and moon. Then the bound monsters break loose: Loki and the great wolf Fenrir escape, the World Serpent Jormungandr writhes ashore flooding the land, and the fire-giant Surtr leads the sons of Muspell across the rainbow bridge Bifrost, which shatters under them. Heimdall blows the Gjallarhorn and the gods ride out to the plain of Vigrid. In the battle: Fenrir swallows Odin (avenged by his son Vidar); Thor kills Jormungandr but staggers only nine paces before dying of its venom; Freyr falls to Surtr; Tyr and the hound Garm kill each other; Loki and Heimdall kill each other. Surtr then flings fire over the whole world and it sinks beneath the sea. Afterward the earth rises again, green and fertile; a handful of gods survive or return from the dead (Vidar, Vali, and the reconciled brothers Baldr and Hod), Thor's sons inherit Mjolnir, and two hidden humans, Lif and Lifthrasir, come out to repopulate the world.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mjolnir',
    title: 'What Mjolnir Is (and How Thor Got It)',
    category: 'Mythology',
    keywords: [
      'what is mjolnir', 'thors hammer mjolnir', 'how did thor get his hammer', 'brokkr sindri dwarves forged mjolnir loki bet his head',
      'mjolnir short handle loki fly bit the bellows', 'mjolnir returns to thors hand always hits', 'mjolnir hallows weddings funerals',
    ],
    content: `Mjolnir is the hammer of the thunder god Thor. It was NOT won by killing a monster — it was forged by dwarves, in a smithing contest set up by Loki. The story: Loki spitefully cut off the golden hair of Thor's wife Sif and, forced to make amends, got the dwarf craftsmen the Sons of Ivaldi to make new living gold hair for Sif, the ship Skidbladnir, and Odin's spear Gungnir. Loki then bet his own head with the dwarf brothers Brokkr and Sindri (Eitri) that they could not make three items as fine. They forged the golden boar Gullinbursti, the self-multiplying ring Draupnir, and the hammer Mjolnir; while they worked, Loki turned into a fly and bit the dwarf pumping the bellows, so Mjolnir came out with a handle too short (which is why Thor wields it one-handed). The gods judged the dwarves' three treasures the best, so Loki owed his head — but escaped on the technicality that they couldn't take his neck, and the dwarves sewed his lips shut instead. Mjolnir's powers: it never misses when thrown and returns to Thor's hand, can shrink to hide in his shirt, throws lightning, and is used to "hallow" (bless) weddings, births and funerals. Thor also needs the iron gloves Jarngreipr to hold it and the belt Megingjord to double his strength.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bifrost',
    title: 'What the Bifrost Is',
    category: 'Mythology',
    keywords: [
      'what is the bifrost', 'rainbow bridge norse mythology', 'bifrost connects midgard and asgard', 'heimdall guards the bifrost',
      'bifrost shatters at ragnarok surtr', 'bilrost bifrost poetic edda prose edda', 'burning bridge of the gods',
    ],
    content: `The Bifrost is the burning, three-coloured (rainbow) bridge that connects Midgard, the world of humans, to Asgard, the realm of the gods. It is guarded at its Asgard end by the watchman god Heimdall, who lives beside it and lets no giant across. Despite being extremely strong, it is fated to break: when the fire-giants of Muspelheim, led by Surtr, ride across it during Ragnarök, their weight and fire shatter it. It is called Bilröst in the older Poetic Edda and Bifröst in Snorri Sturluson's Prose Edda, where Snorri explains that the red band in it is flame, burning to keep the frost giants from using it to invade Asgard. (It has nothing to do with a Marvel film — that franchise borrows the name.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-baldr',
    title: 'Who Baldr Was and How He Died',
    category: 'Mythology',
    keywords: [
      'who is baldr and how did he die', 'balder god of light son of odin and frigg', 'frigg oath every thing not to harm baldr except mistletoe',
      'loki mistletoe dart blind hod kills baldr', 'hel would free baldr if everything wept loki refused', 'baldr returns after ragnarok',
    ],
    content: `Baldr (Balder, Baldur) is the god of light, beauty, joy and goodness — a son of Odin and Frigg, and the most beloved of the gods. He began having ominous dreams of his own death, so his mother Frigg travelled the whole world and took an oath from every thing in it — fire, water, iron, stones, plants, animals, sicknesses — that none of them would ever harm Baldr. The gods then made a game of hurling weapons and stones at the now-invulnerable Baldr, watching everything bounce off. But Frigg had passed over the mistletoe, thinking it too young and small to matter. Loki found this out, fashioned a dart of mistletoe, and put it in the hands of Baldr's blind brother Hod, guiding his aim; Hod threw it and killed Baldr without knowing. The gods sent a messenger to Hel, who agreed to release Baldr if every single creature in the world would weep for him. All did — except one giantess in a cave, who was Loki in disguise — so Baldr had to remain among the dead. For this the gods hunted Loki down and bound him. Baldr's death is regarded as the first great step toward Ragnarök; he comes back from the dead to help rule the renewed world afterward.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nine-realms',
    title: 'What the Nine Realms of Norse Mythology Are',
    category: 'Mythology',
    keywords: [
      'what are the nine realms', 'nine worlds norse mythology yggdrasil', 'asgard vanaheim alfheim midgard jotunheim', 'svartalfheim muspelheim niflheim helheim',
      'list of the nine norse realms', 'realm of the elves dwarves giants dead norse',
    ],
    content: `The Nine Realms (or Nine Worlds) are the domains held within and connected by the world-tree Yggdrasil. The sources are not perfectly consistent, but the standard list is: ASGARD, home of the Aesir gods; VANAHEIM, home of the Vanir gods; ALFHEIM, home of the light elves (ruled by Freyr); MIDGARD, the world of humans, encircled by the sea and the World Serpent; JOTUNHEIM (also Utgard), land of the giants (jotnar); SVARTALFHEIM / NIDAVELLIR, the underground world of the dwarves (and "dark elves"); MUSPELHEIM, the primordial realm of fire and the fire-giants, ruled by Surtr; NIFLHEIM, the primordial realm of ice, mist and cold in the far north; and HELHEIM (Hel), the realm of the dead who did not fall in battle, ruled by the goddess Hel. Of these, Midgard, Asgard, Jotunheim, Muspelheim and Niflheim are the most firmly attested in the medieval texts; the neat count of "nine" and some of the other realms are largely later systematisation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-who-is-tyr',
    title: 'Who Tyr Is (Norse God)',
    category: 'Mythology',
    keywords: [
      'who is tyr', 'tyr norse god of war law justice', 'tyr lost his hand to fenrir gleipnir', 'tyr one-handed god',
      'tyr origin of tuesday tiw', 'tyr sacrifices honour for the greater good', 'tyr dies against garm at ragnarok',
    ],
    content: `Tyr is the Norse god of war, law, justice and the keeping of oaths — one of the Aesir, and probably a very ancient sky-god whose prominence had faded before Odin rose to the top of the pantheon. His name is the origin of "Tuesday" (Tiw's day / Tyr's day), the counterpart of Roman Mars. His central myth: when the gods realised the wolf Fenrir was growing dangerously fast, they had the dwarves make the magical ribbon-thin fetter Gleipnir. Fenrir, suspecting a trick, agreed to be bound only if one of the gods would place a hand in his jaws as a pledge of good faith. Only Tyr was willing. When Fenrir found he could not break loose and understood the deception, he bit off Tyr's right hand. Tyr is therefore the one-handed god, the mythology's model of courage, honour and self-sacrifice for the common good even at a personal cost. At Ragnarök he fights and falls against the monstrous hound Garm, each killing the other.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-seidr',
    title: 'What Seidr Is (Norse Magic)',
    category: 'Mythology',
    keywords: [
      'what is seidr', 'seidr norse magic sorcery fate', 'volva seidkona seeress trance prophecy', 'freyja taught seidr to the aesir',
      'odin practised seidr ergi taunt', 'seidr divination cursing weather', 'saga of erik the red seeress',
    ],
    content: `Seidr (seiðr) is a form of magic and shamanic practice in Old Norse religion, concerned above all with perceiving and altering fate — prophecy and divination, but also cursing and blessing, influencing weather and the minds of others, healing, harming, and contacting spirits and the dead. It was strongly associated with women: a female practitioner was a völva or seiðkona, often a travelling seeress who would be seated on a raised platform, sing special chants, and enter a trance to answer a community's questions about the coming season and the future (a scene described in detail in the Saga of Erik the Red). In myth, the goddess Freyja knew seidr and brought it to the Aesir, teaching it to Odin. For a man to practise seidr carried a heavy stigma of "ergi" (unmanliness, effeminacy), and in one poem Loki mocks Odin for having done exactly that. Seidr is a major touchstone for modern Norse-pagan and Heathen revival practice.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-odin-norse',
    title: 'Who Odin Is',
    category: 'Mythology',
    keywords: [
      'who is odin', 'odin allfather chief of the aesir', 'odin sacrificed an eye at mimirs well for wisdom', 'odin hung on yggdrasil nine nights runes',
      'odin sleipnir huginn muninn valhalla', 'odin god of war death poetry magic', 'odin swallowed by fenrir at ragnarok',
    ],
    content: `Odin is the chief of the Aesir and the "Allfather," god of wisdom, war, death, poetry, prophecy and magic. He is relentlessly driven by the pursuit of knowledge: he sacrificed one of his eyes at Mimir's well to drink from it and gain wisdom, and he hung himself, pierced by his own spear, on the world-tree Yggdrasil for nine days and nights, receiving no food or drink, until he grasped the runes and their magic. He rides the eight-legged horse Sleipnir (a child of Loki), sends out two ravens, Huginn ("thought") and Muninn ("memory"), each day to bring him news of the whole world, and carries the spear Gungnir, which never misses. He gathers slain warriors (the einherjar) into his hall Valhalla to fight at his side at Ragnarök. He is married to Frigg and is the father of Thor, Baldr and others. Despite his power he cannot escape fate: at Ragnarök the wolf Fenrir swallows him whole, and his son Vidar avenges him.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-thor-norse',
    title: 'Who Thor Is (Norse God)',
    category: 'Mythology',
    keywords: [
      'who is thor', 'thor norse thunder god', 'thor son of odin and jord the earth', 'thor hammer mjolnir belt of strength iron gloves',
      'thor chariot pulled by goats', 'thor defends gods and humans from the giants', 'thor dies killing jormungandr at ragnarok thursday',
    ],
    content: `Thor is the Norse god of thunder, lightning, storms and strength, and the guardian of both gods and humankind against the giants (jotnar). He is a son of Odin and Jord (the personified Earth), red-bearded, enormously strong, and quick to anger. His equipment: the hammer Mjolnir, which returns to his hand and throws lightning; the belt Megingjord, which doubles his already vast strength; and the iron gloves Jarngreipr, needed to grip the hammer. He rides a chariot drawn by two goats (Tanngrisnir and Tanngnjostr), which he can slaughter and eat and then revive with Mjolnir. Many myths show him travelling to Jotunheim to fight giants, fishing for the World Serpent Jormungandr, or being outwitted by the giant Utgarda-Loki. He was the most popular god among ordinary people, and "Thursday" is his day. At Ragnarök he finally kills Jormungandr, but its venom overcomes him and he falls dead after nine steps; his sons inherit Mjolnir.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-aesir-vanir-war',
    title: 'The Aesir, the Vanir, and Their War',
    category: 'Mythology',
    keywords: [
      'what is the difference between the aesir and the vanir', 'aesir vanir two families of norse gods', 'aesir-vanir war truce hostage exchange',
      'njord freyr freyja go to the aesir', 'kvasir created from spit aesir vanir', 'vanaheim fertility gods vs asgard war gods',
    ],
    content: `Norse mythology has two families of gods. The AESIR live in Asgard, are led by Odin, and are associated with war, sovereignty, wisdom, law and the sky — Odin, Thor, Frigg, Tyr, Heimdall, Baldr, Bragi. The VANIR live in Vanaheim and are associated with fertility, the sea, wealth, prosperity and nature magic — Njord and his children Freyr and Freyja. The two groups fought the Aesir–Vanir War, one of the oldest events in the mythology, which ended in a stalemate and a peace treaty sealed by an exchange of hostages: Njord, Freyr and Freyja went to live among the Aesir (and are counted among them thereafter), while Hoenir and the wise Mimir went to the Vanir. As part of the truce the two sides all spat into a vat, and from the spittle the gods created Kvasir, the wisest of all beings, whose blood later became the Mead of Poetry. After the merger the distinction between the two groups largely disappears in the surviving stories.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-norse-paganism-end',
    title: 'What Happened to Norse Paganism',
    category: 'Mythology',
    keywords: [
      'what happened to norse paganism', 'christianization of scandinavia', 'when did norse paganism die out', 'iceland converted by the althing in the year 1000',
      'harald bluetooth olaf tryggvason forced conversion', 'temple at uppsala sweden last pagan holdout', 'asatru heathenry modern revival',
    ],
    content: `Norse paganism (the "Old Norse religion" or Heathenry) was gradually replaced by Christianity between roughly the 8th and 12th centuries. Conversion was mostly top-down and political: kings who adopted Christianity pressured, bribed or forced their people. Harald Bluetooth Christianised Denmark around 965; Olaf Tryggvason and Olaf Haraldsson (Saint Olaf) drove conversion in Norway, often brutally; Olof Skötkonung was the first Christian king of Sweden. Iceland converted uniquely peacefully, by a legal ruling of its national assembly, the Althing, in the year 1000, adopted as a compromise to prevent civil war (with pagan practices tolerated privately for a while). Sweden held out longest; the great pagan temple at Uppsala is described as still operating in the late 11th century. The old beliefs then survived for centuries in folklore, magic, place-names and the days of the week (Tuesday, Wednesday, Thursday, Friday), and the myths themselves were only written down in the 1200s by Christian Icelanders such as Snorri Sturluson — which is why we still have them. Modern Ásatrú / Heathenry is a 20th-century religious revival, now officially recognised in Iceland and elsewhere.`,
    createdAt: Date.now(),
  },
];
