import { KnowledgeItem } from '../../types';

// Batch 116 (Egyptian mythology). Reasonably covered but real errors on
// nexus-4b: the "weighing of the heart" answer said Ammit eats your LIVER
// (twice), and contradicted itself; "who is Hathor" said she has an ibis head
// (that is Thoth); "Nut the sky goddess" said she was "a gigantic endless egg";
// "Sekhmet" gave her cult centre as Bubastis (that is Bastet's); "Ra",
// "Ennead", and "Khepri" were fragments or web dumps; "Eye of Horus" turned
// into first-aid advice about rinsing your eyes.
export const EGYPTIAN_MYTHOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-egypt-ra',
    title: 'Who Ra Is in Egyptian Mythology',
    category: 'Mythology',
    keywords: [
      'who is ra in egyptian mythology', 'ra the sun god the most important deity of ancient egypt falcon headed man crowned with a sun disc encircled by a cobra',
      'created himself from the primordial waters as atum-ra at heliopolis then created the other gods', 'sails across the sky by day in his solar barque travels through the duat at night fighting the serpent apep reborn at dawn as khepri',
      'pharaohs called themselves son of ra merged with amun as amun-ra in the new kingdom', 'ra khepri at dawn ra at midday atum at dusk',
    ],
    content: `Ra (also Re) is the sun god and, for most of Egyptian history, the supreme deity. He is usually shown as a man with a falcon's head crowned by a sun disc wrapped in a cobra (uraeus). In the Heliopolitan account he brought himself into being from Nun, the primordial waters, as Atum-Ra, and then created the first divine couple, Shu and Tefnut, from whom the rest of the gods descend. Ra's defining activity is the daily solar cycle: he sails across the sky in his barque (the "boat of millions of years"), aging from the scarab-god Khepri at dawn, to Ra at his midday height, to the old man Atum at dusk; he dies in the west, travels the twelve hours of the Duat (underworld) through the night — where he unites with the mummified Osiris and is rejuvenated while the serpent Apep tries to stop the boat — and is reborn each morning. Egyptian kings styled themselves "Son of Ra." In the New Kingdom Ra was fused with the Theban god Amun as Amun-Ra, "king of the gods."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-weighing-of-heart',
    title: 'The Weighing of the Heart Ceremony',
    category: 'Mythology',
    keywords: [
      'what is the weighing of the heart ceremony', 'the dead persons heart is weighed on a scale against the feather of maat truth and cosmic order in the hall of two truths before osiris',
      'anubis operates the scale thoth records the result the forty two assessor gods hear the negative confession', 'if the heart balances the feather the person is justified and passes to the field of reeds aaru',
      'if the heart is heavier with wrongdoing the devourer ammit crocodile head lion forepart hippo hindquarters eats the heart and the person suffers the second death ceasing to exist',
    ],
    content: `The weighing of the heart (or "judgement of the dead") is the central scene of the Egyptian afterlife, illustrated in the Book of the Dead (spell 125). In the Hall of Two Truths, before Osiris as judge, the deceased recites the "negative confession" — a list of forty-two sins they declare they have NOT committed — to a panel of forty-two assessor gods. Then their heart, believed to record every deed, is placed on one pan of a great balance; on the other pan sits the single ostrich feather of Maat, representing truth, justice, and cosmic order. Anubis adjusts the scale and Thoth, the ibis-headed scribe, writes down the verdict. If the heart balances evenly against the feather, the person is declared "true of voice" and is led to eternal life in the Field of Reeds (Aaru), an idealised Egypt. If the heart is heavier — weighed down by wrongdoing — it is thrown to Ammit, "the Devourer," a monster with a crocodile's head, a lion's front, and a hippo's hindquarters, who eats it. Losing the heart meant the "second death": the person simply ceased to exist, with no afterlife at all. (Ammit devours the heart, not the liver.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-horus-eye-of-horus',
    title: 'Horus and the Eye of Horus',
    category: 'Mythology',
    keywords: [
      'who is horus and what is the eye of horus', 'horus falcon headed sky god son of osiris and isis the rightful heir who battles his uncle set to avenge osiris and win the throne of egypt the living pharaoh was the earthly horus',
      'the eye of horus wedjat set tore out horuss left eye the moon and it was restored by thoth', 'the wedjat became the great symbol of healing wholeness protection and royal power an amulet its parts used as fractions',
      'distinct from the eye of ra a fierce feminine force sekhmet hathor wadjet', 'horus of two eyes sun and moon',
    ],
    content: `Horus is the falcon-headed sky god, son of Osiris and Isis, conceived after Isis briefly revived the murdered Osiris. He is the rightful heir to the throne of Egypt, and the myth of his long struggle to take it from his uncle Set — avenging his father — is the mythic charter of kingship: every living pharaoh was "the Horus," and on death became Osiris, passing Horus-hood to his son. Horus's right eye was the sun, his left eye the moon. THE EYE OF HORUS (the wedjat or udjat eye) comes from the conflict with Set, who gouged out Horus's left eye and tore it to pieces; the god Thoth (in some versions Hathor) found and magically restored it. Because it was made whole again, the wedjat eye became the supreme Egyptian symbol of healing, protection, restoration, and royal authority — painted on coffins, carved as amulets for the living and the dead, and its six stylised parts were even used to write the fractions 1/2 down to 1/64. It should not be confused with the Eye of Ra, which is a fierce, destructive feminine power (identified with Sekhmet, Hathor, Wadjet, or Bastet) that acts as the sun god's agent of vengeance.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-hathor',
    title: 'Who Hathor Is in Egyptian Mythology',
    category: 'Mythology',
    keywords: [
      'who is hathor in egyptian mythology', 'hathor goddess of love joy music dance beauty motherhood and drunkenness the golden one',
      'depicted as a cow or a woman with cow horns holding a sun disc or with cow ears not an ibis head that is thoth', 'lady of the west welcomes the dead into the afterlife nursed the young horus',
      'can also be the fierce eye of ra the distant goddess who nearly destroys humanity as sekhmet before being pacified with red beer', 'cult centre dendera',
    ],
    content: `Hathor is one of the most widely worshipped Egyptian goddesses, associated with love, joy, music and dance, beauty, feminine sexuality, motherhood, and even drunkenness (festivals of Hathor involved deliberate intoxication). She was called "the Golden One." She is depicted as a cow, as a woman with a headdress of cow's horns cradling a sun disc, or as a woman with cow's ears — NOT with the head of an ibis, which belongs to Thoth. As "Lady of the West" she greets and protects the newly dead entering the afterlife, and in the Osiris cycle she helps nurse the infant Horus (she is sometimes called his mother, sometimes his consort). Hathor also has a ferocious side: she is one form of the "Eye of Ra," and in the myth of the Destruction of Mankind, Ra sends her out as the lioness Sekhmet to slaughter rebellious humanity; she goes into a killing frenzy and can only be stopped when the gods flood the fields with beer dyed red like blood, which she drinks until she falls asleep and reverts to the gentle Hathor. Her great temple is at Dendera.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-nut-geb',
    title: 'Nut the Sky Goddess and Geb the Earth God',
    category: 'Mythology',
    keywords: [
      'who is nut the sky goddess and geb the earth god', 'nut the sky goddess arching her star covered body over the earth held up by shu the god of air geb the earth god lying beneath her',
      'set eternally separates them shu holding nut up', 'nut swallows the sun and the stars each evening and gives birth to them each dawn',
      'ra cursed nut not to give birth on any day of the year thoth won five extra epagomenal days gambling with the moon on which she bore osiris horus the elder set isis and nephthys',
    ],
    content: `Nut is the sky goddess and Geb is the earth god — an inversion of the usual arrangement in mythologies, where the sky is male. In Egyptian cosmic imagery, Nut is a woman whose long body, spangled with stars, arches over the world touching the ground with her fingertips and toes; Geb lies stretched out on his back beneath her, his body the land, sometimes shown with an erection reaching up toward her. Between them stands their father Shu, the god of air, holding Nut up and keeping the pair apart — the gap between earth and sky. Each evening Nut swallows the sun (and the stars), which pass through her body during the night and are born again from her at dawn. In one myth Ra, angry that Nut and Geb had lain together against his will, cursed Nut so she could not give birth on any of the 360 days of the year; Thoth then gambled with the moon god and won enough moonlight to make five extra days (the "epagomenal" days added to the calendar), and on those days Nut bore her children: Osiris, Horus the Elder, Set, Isis, and Nephthys. (Nut is not "a giant egg"; she is the personified sky.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-sekhmet',
    title: 'Who Sekhmet the Lioness Goddess Is',
    category: 'Mythology',
    keywords: [
      'who is sekhmet the lioness goddess', 'sekhmet the powerful one lioness headed goddess of war destruction plague and also healing the destructive aspect of the eye of ra',
      'ra sends her to punish rebellious humanity she goes on a bloodbath stopped only by tricking her into drinking red dyed beer she mistakes for blood', 'consort of ptah mother of nefertem her main cult centre was memphis not bubastis',
      'her priests were physicians she both sends and cures disease the gentler cat goddess bastet is her counterpart',
    ],
    content: `Sekhmet ("the Powerful One") is a lioness-headed goddess of war, destruction, and plague — and, paradoxically, of healing. She is the fierce, destructive form of the "Eye of Ra." In the myth of the Destruction of Mankind, an aged Ra learns that humans are plotting against him and sends his Eye, as Sekhmet, to punish them; she massacres them and wades in blood, and cannot be called off, so the gods dye a huge quantity of beer red and pour it over the fields, and Sekhmet drinks it thinking it is blood until she passes out, sparing the survivors. Because she both sends pestilence and can withdraw it, her priests functioned as physicians and she was invoked against disease. Her consort is Ptah of Memphis and their son is Nefertem, so her principal cult centre was Memphis — NOT Bubastis, which is the centre of Bastet, the gentle cat goddess who is Sekhmet's tamer counterpart (the two are sometimes treated as two faces of one goddess).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-khepri-scarab',
    title: 'Khepri and the Significance of the Scarab',
    category: 'Mythology',
    keywords: [
      'what is the significance of the scarab beetle khepri', 'khepri scarab headed god of the rising morning sun and of creation coming into being and renewal his name relates to kheper to come into being',
      'egyptians saw the dung beetle rolling its ball of dung and thought the sun was rolled across the sky young beetles seemed to emerge spontaneously from the ball so the scarab symbolised self creation and rebirth',
      'ra was khepri at dawn ra at midday atum at dusk the scarab was the most common amulet the heart scarab placed over a mummys heart inscribed with a spell telling the heart not to testify at the judgement',
    ],
    content: `Khepri is the god of the rising sun, of creation, and of "coming into being" — his name is built from the verb kheper, "to come into existence, to become." He is shown as a scarab beetle or a man with a whole scarab for a head. The symbolism comes from watching the dung beetle: it rolls a ball of dung across the ground, which the Egyptians took as a divine parallel to the sun being rolled across the sky each day; and because young beetles seemed to appear out of nowhere from the buried ball (the female actually lays her eggs in it), the scarab became an emblem of spontaneous self-creation and, by extension, of rebirth after death. The solar god was understood as Khepri at sunrise, Ra at midday, and Atum at sunset — the same sun in three ages. The scarab was the single most common form of Egyptian amulet, worn by the living for good fortune and, most importantly, placed over the heart of a mummy: this "heart scarab" was inscribed with Book of the Dead spell 30B, a magical plea for the heart not to speak against its owner during the weighing of the heart.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-ennead-heliopolis',
    title: 'The Ennead of Heliopolis',
    category: 'Mythology',
    keywords: [
      'what is the ennead of heliopolis', 'the ennead the nine principal gods of heliopolis creation account atum self created produced shu air and tefnut moisture who produced geb earth and nut sky who produced osiris isis set and nephthys',
      'represents the generations of creation', 'other cities had their own systems the ogdoad of hermopolis eight primordial deities the memphite theology with ptah creating by thought and speech',
    ],
    content: `The Ennead ("the Nine," Egyptian Pesedjet) is the group of nine gods at the heart of the creation theology of Heliopolis, one of ancient Egypt's oldest religious centres. It lays out the first generations of the cosmos: Atum, who created himself out of the primordial waters of Nun, produced by himself the first divine pair — Shu (air, dryness) and Tefnut (moisture). Shu and Tefnut produced Geb (the earth) and Nut (the sky). Geb and Nut produced the two couples central to the Osiris myth: Osiris and Isis, and Set and Nephthys. Together those nine (Atum plus the four generations) are the Ennead; Horus the Elder is sometimes added. It is a genealogy of creation as much as a pantheon. Rival cities had different accounts: Hermopolis taught an Ogdoad ("the Eight") of four primordial frog-and-snake-headed couples embodying the pre-creation chaos, from whom the sun emerged on a mound or from a cosmic egg or lotus; Memphis credited the craftsman-god Ptah with creating everything by conceiving it in his heart and speaking it into being.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-osiris-myth-full',
    title: 'The Full Myth of Osiris',
    category: 'Mythology',
    keywords: [
      'what is the myth of osiris and how was he killed', 'osiris the good king of egypt married to his sister isis his jealous brother set tricked him into lying in a decorated chest at a banquet then sealed it and threw it in the nile',
      'isis recovered the body set found it and cut it into fourteen pieces scattered across egypt isis and nephthys gathered all but the phallus eaten by a fish and bound him with bandages the first mummy',
      'isis briefly revived him to conceive horus osiris then became ruler and judge of the dead horus grew up and defeated set to take the throne',
    ],
    content: `Osiris was the wise, benevolent king who taught the Egyptians agriculture and law, married to his sister Isis. His brother Set, jealous of the throne, held a banquet at which he displayed a beautiful decorated chest and offered it to whoever fit inside perfectly; it had been built to Osiris's exact measurements, and when Osiris lay down in it Set and his conspirators slammed the lid, sealed it with lead, and threw it into the Nile. Isis searched and eventually recovered the chest (it had lodged in a tamarisk tree at Byblos), but Set found the body again, cut it into fourteen pieces, and scattered them the length of Egypt. Isis, helped by her sister Nephthys and by Anubis, travelled the country collecting the parts; she found all but the phallus, which a fish had eaten, and fashioned a replacement. The gods bound the reassembled body in linen — the first mummy — and Isis, transforming into a kite, briefly revived Osiris just long enough to conceive their son Horus. Osiris did not return to the land of the living; he descended to rule the Duat as king and judge of the dead. Horus, raised in secret in the marshes, later confronted Set and won back the throne of Egypt. The myth models the cycle of death and rebirth (and the annual flooding of the Nile) and legitimises kingship: every dead pharaoh became Osiris, every living one Horus.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-contendings-horus-set',
    title: 'The Contendings of Horus and Set',
    category: 'Mythology',
    keywords: [
      'what is the contendings of horus and set', 'a new kingdom papyrus telling the eighty year legal dispute between horus and set before the divine tribunal over the throne of egypt',
      'contests including a boat race in stone boats transforming into hippopotamuses set trying to dishonour horus sexually which backfires via isiss trick with lettuce and semen', 'isis repeatedly intervenes the sun god ra favours set',
      'eventually osiris threatens the gods from the underworld horus is awarded the throne set is given a place beside ra as a storm god',
    ],
    content: `"The Contendings of Horus and Seth" is a specific literary text preserved on a New Kingdom papyrus (the Chester Beatty Papyrus I, ~1150 BC) that tells the dispute over Egypt's throne as a long, often comic, courtroom drama. For eighty years the gods' tribunal, the Ennead, cannot decide between Horus (the young rightful heir) and Set (the powerful uncle, favoured by the sun god Ra as the stronger defender of the solar barque). The two undergo a series of trials: they turn into hippopotamuses and try to outlast each other underwater; they hold a race in boats of stone, which Horus wins by secretly building his of wood and painting it to look like stone so Set's sinks. In the strangest episode, Set tries to humiliate Horus by having sex with him to prove dominance, but Isis catches Horus's semen, and through a trick involving lettuce (Set's favourite food) she arranges for Set to unknowingly ingest Horus's seed instead, so that when the gods call the semen to testify, Set's rises from the marsh while Horus's answers from inside Set's own body — humiliating Set. Finally Osiris sends word from the underworld threatening to unleash its demons on the gods if justice is not done, and the tribunal awards the throne to Horus. Set is not destroyed: Ra takes him to the sky to be the god of thunder and storms.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-ka-ba-akh',
    title: 'The Egyptian Soul: Ka, Ba, Akh (and Ren, Shut)',
    category: 'Mythology',
    keywords: [
      'what is the ka and the ba in egyptian belief about the soul', 'ka the life force or vital essence that leaves the body at death and must be sustained with offerings of food and drink or images of them lives in the tomb',
      'ba the personality or individuality shown as a human headed bird that can leave the tomb and travel including revisiting the body each night', 'akh the transfigured effective spirit formed when ka and ba reunite successfully after death and the rituals are complete which dwells among the stars',
      'ren the name and shut the shadow are also parts of the person destroying someones name erased them from existence',
    ],
    content: `The Egyptians divided a person into several distinct parts. The KA is the life-force or vital essence, created at birth (the ram-god Khnum was said to shape it on his potter's wheel). At death the ka separates from the body but does not go far; it stays with the corpse in the tomb and must be sustained by real offerings of food and drink, or by depictions and recitations of them, which is why tomb chapels had offering tables and "false doors." The BA is closer to what we mean by personality or individuality — the unique character of the person. It is pictured as a bird with a human head, and unlike the ka it is mobile: it can leave the tomb by day, fly about the world of the living, and must return to reunite with the mummified body each night. The AKH is the goal: a "transfigured," fully effective spirit that comes into being only when the ka and ba are successfully reunited after death and the proper funerary rituals have been performed; the akh is an immortal being that joins the imperishable stars or the entourage of Ra. Two further components were the REN (the name — to speak or write someone's name preserved them, to erase it destroyed them) and the SHUT (the shadow).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-cats-bastet',
    title: 'Bastet and Why Cats Were Sacred in Egypt',
    category: 'Mythology',
    keywords: [
      'who is bastet and why were cats sacred in egypt', 'bastet originally a fierce lioness goddess later softened into a gentler cat goddess of the home women childbirth fertility music and protection cult centre bubastis',
      'cats valued for protecting granaries and homes from rats mice and snakes', 'killing a cat even accidentally could be a capital offence households shaved their eyebrows in mourning when a cat died',
      'cats were mummified in vast numbers as votive offerings to bastet a cemetery at bubastis and beni hasan held hundreds of thousands',
    ],
    content: `Bastet (or Bast) was originally, in the Old Kingdom, a fierce lioness war-goddess much like Sekhmet, but over time she was "domesticated" into a gentler goddess associated with the house cat: protector of the home, of women, of children and childbirth, of music and festivity, and of the pharaoh. Her cult centre was Bubastis in the Nile Delta, and Herodotus described her huge, riotous annual festival there. Cats themselves were held sacred partly because they embodied Bastet and partly for a very practical reason: they killed the rats, mice and snakes that threatened grain stores and homes, protecting both food supply and family. Egyptian law protected cats fiercely — killing one, even by accident, could carry the death penalty — and when a household cat died naturally, the family went into mourning and shaved their eyebrows. Enormous numbers of cats were also deliberately bred, killed young, mummified, and sold to pilgrims as votive offerings to Bastet; cat cemeteries at Bubastis and Beni Hasan contained hundreds of thousands of mummified cats.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-ra-night-journey',
    title: "Ra's Journey Through the Underworld Each Night",
    category: 'Mythology',
    keywords: [
      'what is the story of ras journey through the underworld each night', 'after sunset ra enters the duat in his night barque and travels its twelve hours or regions each guarded by gates and demons',
      'the great serpent apep chaos tries to stop the boat by drinking the river or hypnotising the crew set and other gods spear apep each night', 'at the midpoint ra unites with the corpse of osiris and the two revitalise each other',
      'the sun god emerges reborn at dawn from the eastern horizon the books of the netherworld amduat book of gates decorate royal tombs',
    ],
    content: `When the sun sets in the west, Ra does not simply vanish — he enters the Duat, the underworld, and sails through it in his night barque during the twelve hours of darkness. The Duat is divided into twelve regions or "hours," each sealed by a guarded gate and populated by blessed dead, demons, and the damned. The central drama is the nightly attack of Apep (Apophis), a colossal serpent embodying chaos and non-existence, who lies in wait to swallow the river, becalm the boat, or hypnotise its crew; a company of defender gods — prominently Set, along with Serqet, Mehen (a protective serpent coiled around Ra), and others — spear and dismember Apep every night, but he is never permanently destroyed. At the deepest point of the journey, Ra's soul unites with the mummified body of Osiris in the underworld, and the two revitalise each other — the union of the sun's light with the power of regeneration. Renewed, Ra is towed onward, passes the final gate, and is reborn at the eastern horizon as the morning sun (Khepri). This journey is the subject of the illustrated "Books of the Netherworld" — the Amduat, the Book of Gates, the Book of Caverns — painted on the walls of New Kingdom royal tombs.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-creation-myth',
    title: 'The Egyptian Creation Myths',
    category: 'Mythology',
    keywords: [
      'what is the egyptian creation myth', 'no single canonical version each major temple city had its own the shared starting point is nun the dark limitless primordial waters and the first mound benben rising from it at the first sunrise',
      'heliopolis atum self creates and produces shu and tefnut by spitting or masturbation then the ennead', 'hermopolis the ogdoad of eight chaos deities and the sun emerging from a cosmic egg or a lotus on the mound',
      'memphis ptah creates all things by conceiving them in his heart and speaking them with his tongue',
    ],
    content: `Egypt never had one official creation story; the major religious centres each developed their own, and they coexisted for millennia. All of them begin the same way: before creation there was only Nun, a dark, formless, limitless expanse of water, and from it rose the first patch of dry land — the primordial mound, sometimes called the benben — on which the first sunrise occurred. From there the accounts diverge. HELIOPOLIS: the creator Atum arose from Nun on the mound and, alone, brought forth the first pair of gods, Shu (air) and Tefnut (moisture) — texts variously say by spitting, sneezing, or masturbating them into existence — beginning the Ennead. HERMOPOLIS: the pre-creation state is personified as the Ogdoad, four couples of frog- and serpent-headed deities embodying water, darkness, infinity, and hiddenness; from their interaction the sun burst forth, in some versions hatching from a cosmic egg laid on the mound, in others opening from a lotus flower. MEMPHIS: the craftsman-god Ptah is the ultimate creator, who thinks each thing in his heart (the seat of the mind) and then brings it into being by naming it with his tongue — a notably abstract "creation by word."`,
    createdAt: Date.now(),
  },
];
