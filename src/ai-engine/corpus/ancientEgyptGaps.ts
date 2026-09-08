import { KnowledgeItem } from '../../types';

// Batch 48 (ancient Egypt) gap-fills. Live misses on nexus-4b:
// "who was Ramesses II" -> "a New Kingdom pharaoh from Mesopotamia";
// "significance of cats in ancient Egypt" -> "there's absolutely nothing about
// cats in those texts"; "Egyptian afterlife" -> "a coin in your mouth for
// Charon was key" (that's Greek); "how long did ancient Egyptian civilization
// last" -> a Rosetta Stone dump; "what was papyrus" -> "Papyrus is a typeface
// designed by Chris Costello"; "the Sphinx" -> "with the wings of an eagle".
export const ANCIENT_EGYPT_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-ramesses-ii',
    title: 'Who Ramesses II Was',
    category: 'Ancient Egypt',
    keywords: [
      'who was ramesses ii', 'ramesses the great', 'ramses 2 pharaoh', 'battle of kadesh', 'abu simbel ramesses',
      'was ramesses the pharaoh of the exodus', 'how long did ramesses ii reign',
    ],
    content: `Ramesses II ("Ramesses the Great") was an EGYPTIAN pharaoh of the 19th Dynasty, not from Mesopotamia. He ruled for about 66 years (c. 1279–1213 BC), one of the longest and most powerful reigns in Egyptian history, during the New Kingdom. Early on he fought the Hittite Empire at the Battle of Kadesh (c. 1274 BC) in Syria — a huge chariot clash that he trumpeted as a personal victory but was really a draw; years later he and the Hittites signed the first known written peace treaty. He was a prolific builder: the rock-cut temples at Abu Simbel (with four giant seated statues of himself), the Ramesseum, a new capital called Pi-Ramesses, and vast additions to the temples at Karnak and Luxor, plus colossal statues of himself all over Egypt. He fathered more than 100 children and lived to around 90. Because of his fame and timing he is often popularly identified as the pharaoh of the biblical Exodus, though there's no archaeological evidence for that. His mummy survives and is in Cairo.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cats-in-egypt',
    title: 'The Significance of Cats in Ancient Egypt',
    category: 'Ancient Egypt',
    keywords: [
      'what was the significance of cats in ancient egypt', 'why did egyptians worship cats', 'bastet cat goddess',
      'were cats sacred in ancient egypt', 'cat mummies egypt', 'egyptian cat punishment', 'battle of pelusium cats',
    ],
    content: `Cats were deeply revered in ancient Egypt. Practically, they protected grain stores and homes by killing rats, mice and snakes, so they were welcomed and fed. Religiously, the domestic cat was linked to the goddess Bastet (Bast) — depicted as a cat or a cat-headed woman — protector of the home, women, children, fertility and the household, and a gentler counterpart to the fierce lioness goddess Sekhmet; her cult centre was Bubastis. Cats were kept as beloved pets, sometimes shown under chairs in tomb paintings, and were often given jewellery. The Greek historian Herodotus wrote that when a household cat died naturally, the family would shave their eyebrows in mourning, and that harming a cat — even accidentally — could bring a death sentence. Millions of cats were bred, killed and mummified as votive offerings to Bastet and buried in vast cat cemeteries. There's also a story (from Polyaenus) that at the Battle of Pelusium (525 BC) the Persian king Cambyses had his men carry cats to make the Egyptians afraid to fight.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egyptian-afterlife',
    title: 'What Ancient Egyptians Believed About the Afterlife',
    category: 'Ancient Egypt',
    keywords: [
      'what did ancient egyptians believe about the afterlife', 'weighing of the heart', 'field of reeds aaru',
      'the duat egyptian underworld', 'ka ba akh soul', 'why did egyptians mummify their dead', 'feather of maat judgement',
    ],
    content: `The Egyptians believed death was a passage to another life that could be as good as, or better than, life on earth — if you were prepared. The soul had several parts, chiefly the "ka" (life-force, which needed offerings), the "ba" (personality, which could leave the tomb), and the "akh" (the transfigured spirit). After death you travelled through the Duat (the underworld) and faced the "weighing of the heart": Anubis led you before Osiris, judge of the dead, and your heart was set on a scale against the feather of Ma'at (truth and cosmic order), with Thoth recording the result. If your heart was light — you had lived justly — you passed into the Field of Reeds (Aaru), an idealised, eternal version of Egypt. If it was heavy with wrongdoing, the monster Ammit devoured it and you ceased to exist. To make the journey you needed: your body preserved by mummification so the ka and ba could recognise it, a tomb stocked with food, tools and treasures, and spells (the Book of the Dead). There was no ferryman Charon or coin in the mouth — that's ancient Greek belief, not Egyptian.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egypt-civilization-length',
    title: 'How Long Ancient Egyptian Civilization Lasted',
    category: 'Ancient Egypt',
    keywords: [
      'how long did ancient egyptian civilization last', 'how old is ancient egypt', 'timeline of ancient egypt',
      'old middle new kingdom egypt', 'when did ancient egypt begin and end', 'oldest civilization egypt',
    ],
    content: `Ancient Egyptian civilization lasted roughly 3,000 years — from the unification of Upper and Lower Egypt by King Narmer (Menes) around 3100 BC to the Roman conquest in 30 BC (or, for the pharaonic religion and hieroglyphs, until about 400 AD). That makes it one of the longest continuous civilizations in history — for perspective, the time from Cleopatra back to the building of the Great Pyramid (c. 2560 BC) is longer than the time from Cleopatra to us. Historians divide it into three great eras of strong central rule — the Old Kingdom (c. 2686–2181 BC, the age of the pyramids), the Middle Kingdom (c. 2055–1650 BC), and the New Kingdom (c. 1550–1069 BC, the age of empire, Tutankhamun and Ramesses II) — separated by weaker "Intermediate Periods." After the New Kingdom came a long decline under Libyan, Nubian, Assyrian and Persian rule, then the Greek Ptolemaic dynasty (from Alexander's conquest in 332 BC), and finally Rome.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-papyrus',
    title: 'What Papyrus Was',
    category: 'Ancient Egypt',
    keywords: [
      'what was papyrus', 'how was papyrus made', 'papyrus writing material', 'papyrus plant nile', 'papyrus vs parchment vs paper',
      'why did egyptians use papyrus', 'is papyrus paper',
    ],
    content: `Papyrus was the main writing surface of the ancient Mediterranean world for around 4,000 years, invented in Egypt where the papyrus reed (Cyperus papyrus) grew thickly in the Nile marshes. To make it, workers cut the plant's stem into thin strips of its spongy inner pith, laid a layer of strips side by side, then a second layer crosswise on top, pressed and pounded them so the plant's own sap glued them together, dried the sheet under weights, and polished it smooth with a stone or shell. Sheets were then glued end to end into long scrolls. Papyrus was light, took ink well and could be reused by washing, but it was brittle and rotted in damp climates — which is why so much survives in Egypt's dry sands and so little elsewhere. It was gradually replaced by parchment (treated animal skin) and, from the Middle Ages, by paper. Our word "paper" comes from "papyrus." (It is unrelated to the Papyrus font.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hieroglyphics',
    title: 'What Hieroglyphics Were',
    category: 'Ancient Egypt',
    keywords: [
      'what was hieroglyphics', 'egyptian hieroglyphs explained', 'how do hieroglyphs work', 'are hieroglyphs an alphabet',
      'who deciphered hieroglyphics', 'champollion hieroglyphs', 'hieratic and demotic script',
    ],
    content: `Hieroglyphics was the formal writing system of ancient Egypt, used from about 3200 BC to around 400 AD — one of the oldest writing systems in the world, alongside Mesopotamian cuneiform. It has around 1,000 pictorial signs and is not a simple alphabet or pure picture-writing: it mixes three kinds of sign. "Logograms" stand for a whole word (a drawing of a house means "house"). "Phonograms" stand for sounds — single consonants (a functional alphabet of about 24) or groups of two or three consonants; vowels weren't written. "Determinatives" are silent signs added at the end of a word to show its category (a walking-legs sign after a verb of motion, a scroll after an abstract idea). Hieroglyphs were mainly for monuments, temples and tombs; scribes used faster cursive scripts, hieratic and later demotic, for everyday documents. The knowledge was lost after the 4th century AD and hieroglyphs stayed unreadable for over 1,400 years, until Jean-François Champollion cracked the system in 1822 using the trilingual Rosetta Stone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-book-of-the-dead',
    title: 'What the Book of the Dead Was',
    category: 'Ancient Egypt',
    keywords: [
      'what was the book of the dead', 'egyptian book of the dead spells', 'what is in the book of the dead',
      'pyramid texts coffin texts', 'book of the dead papyrus of ani', 'how did egyptians use the book of the dead',
    ],
    content: `The "Book of the Dead" is the modern name for a collection of ancient Egyptian funerary texts — its Egyptian title translates as "Book of Coming Forth by Day." It's a set of around 200 spells, hymns, prayers and instructions, of which any one copy contains a selection, written on a papyrus scroll (or painted on coffins and tomb walls) and placed with the deceased from the New Kingdom onward (c. 1550 BC). Its purpose was to guide and protect the dead person on the dangerous journey through the Duat: spells to give the mouth back the power of speech, to ward off monsters and demons, to know the secret names of gatekeepers, to keep the heart from testifying against its owner, and above all a text for the "weighing of the heart" before Osiris. It was not a fixed sacred book like a Bible — wealthy people commissioned personalised copies with their name written in, illustrated with vignettes (the famous Papyrus of Ani is one). It developed out of earlier bodies of funerary spells, the Pyramid Texts (Old Kingdom, for kings only) and the Coffin Texts (Middle Kingdom, for nobles).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-the-sphinx',
    title: 'What the Great Sphinx Is',
    category: 'Ancient Egypt',
    keywords: [
      'what was the sphinx', 'great sphinx of giza', 'who built the sphinx', 'does the sphinx have wings',
      'what happened to the sphinx nose', 'how old is the sphinx', 'greek sphinx vs egyptian sphinx',
    ],
    content: `The Great Sphinx of Giza is a colossal statue carved from the natural limestone bedrock of the Giza plateau, showing a recumbent (lying) lion's body with a human head wearing a royal headdress. It's about 73 metres long and 20 metres high — the largest monolithic statue from the ancient world. It faces due east, and most scholars date it to around 2500 BC and attribute it to the pharaoh Khafre (whose face it may portray), as part of his pyramid complex. Note: the Egyptian sphinx does NOT have wings — that's the GREEK sphinx, a winged female monster who posed the famous riddle to Oedipus. The Great Sphinx's missing nose was not shot off by Napoleon's soldiers (a persistent myth): drawings show it already gone in the 1750s, and it was likely deliberately smashed by an iconoclast in the 14th century. Its beard fragments and other pieces are in museums, and it has been dug out of encroaching sand many times over the millennia.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-happened-to-egypt',
    title: 'What Happened to Ancient Egypt',
    category: 'Ancient Egypt',
    keywords: [
      'what happened to ancient egypt', 'how did ancient egypt end', 'who conquered ancient egypt', 'the decline of ancient egypt',
      'ptolemaic egypt rome', 'when did egypt become muslim', 'why did ancient egyptian religion die out',
    ],
    content: `Ancient Egypt didn't vanish suddenly — it slowly lost independence and then its distinct culture over about a thousand years. After the New Kingdom collapsed around 1069 BC, Egypt was fragmented and then ruled in turn by Libyan dynasties, Nubian (Kushite) kings from the south, the Assyrians, and from 525 BC the Persian Empire. Alexander the Great took Egypt from Persia in 332 BC; his general Ptolemy founded a Greek-speaking dynasty (the Ptolemies) that ruled for nearly 300 years from the new city of Alexandria, ending with Cleopatra VII. When she and Mark Antony lost to Octavian, Rome annexed Egypt in 30 BC and ran it as a province — the breadbasket of the empire. Under Roman then Byzantine rule the old religion faded as Egypt became largely Christian (the Coptic Church), the temples closed, and the last hieroglyphic inscription was carved around 394 AD. The Arab Muslim conquest of 641 AD brought Islam and the Arabic language, which most Egyptians eventually adopted. So the land and its people continued unbroken; it was the pharaonic state, religion and script that ended.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-pyramids-built',
    title: 'How the Pyramids Were Built',
    category: 'Ancient Egypt',
    keywords: [
      'how were the pyramids built', 'how did egyptians move pyramid blocks', 'pyramid construction ramps',
      'how long did it take to build the great pyramid', 'were the pyramids built by slaves', 'did aliens build the pyramids',
    ],
    content: `The pyramids were built by organised teams of paid Egyptian workers — skilled craftsmen plus rotating gangs of ordinary labourers, housed in nearby workers' villages and fed by the state (not by enslaved Israelites, and not by aliens). The methods, worked out from tomb scenes, tools, unfinished sites and experiment: most blocks (the Great Pyramid has about 2.3 million, averaging ~2.5 tonnes) were cut with copper chisels and stone hammers from a quarry right next to the site; harder granite for the inner chambers was floated down the Nile from Aswan. Blocks were dragged on wooden sledges — a wall painting shows a worker pouring water on the sand in front of a sledge, which experiments confirm roughly halves the friction. To raise them, the builders used ramps: probably a large straight ramp on one face plus ramps wrapping around the pyramid as it rose, dismantled at the end (a 2013 discovery of a papyrus logbook, the "Diary of Merer," records a crew hauling limestone by boat and canal for the Great Pyramid's casing). Precise surveying with cords, plumb-lines and star sightings kept it square and level. The Great Pyramid took roughly 20–27 years, during Khufu's reign around 2560 BC.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-role-of-pharaoh',
    title: 'The Role of the Pharaoh',
    category: 'Ancient Egypt',
    keywords: [
      'what was the role of the pharaoh', 'what did the pharaoh do', 'was the pharaoh a god', 'what is maat',
      'pharaoh as living horus', 'pharaoh high priest and commander', 'why was the pharaoh so powerful',
    ],
    content: `The pharaoh was the absolute ruler of Egypt and also its chief religious figure — regarded as a living god, the earthly embodiment of the falcon god Horus while alive and identified with Osiris after death. His central duty was to maintain "ma'at" — cosmic order, truth, balance and justice — against "isfet" (chaos): by governing well, defending the borders, ensuring the Nile flood and harvest, and above all by performing the rituals and offerings to the gods, on which the whole country's wellbeing was believed to depend (in theory the pharaoh officiated at every temple; in practice priests acted for him). Practically, he was head of state, commander of the army, supreme judge and owner of the land, working through a chief minister (the vizier) and a large bureaucracy of officials, scribes and priests. Kingship was normally hereditary, passing from father to son, and the pharaoh's role in linking the human and divine worlds is why so much of Egypt's wealth went into royal tombs and temples. The word "pharaoh" originally meant "great house" (the palace).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egyptian-gods',
    title: 'The Gods of Ancient Egypt',
    category: 'Ancient Egypt',
    keywords: [
      'what gods did the ancient egyptians worship', 'egyptian gods list', 'who is ra amun osiris isis', 'egyptian pantheon',
      'was egyptian religion polytheistic', 'egyptian gods with animal heads', 'who is thoth hathor anubis',
    ],
    content: `Ancient Egyptian religion was polytheistic, with hundreds of gods and goddesses — some worshipped across the whole country, others local to a single town — and the same god could take different forms and merge with others (Amun of Thebes fused with the sun god Ra to become Amun-Ra, chief god of the New Kingdom). Many were shown with animal heads representing their nature. The major figures: RA, the sun god, who sailed across the sky each day and through the underworld each night; OSIRIS, king and judge of the dead, god of resurrection and the Nile's fertility; ISIS, his wife, goddess of magic, motherhood and healing, hugely popular; HORUS, the falcon-headed sky god and god of kingship — the living pharaoh WAS Horus, and he was not a "sidekick" but the son of Osiris and Isis who avenged his murdered father against SET (god of chaos, storms and the desert); ANUBIS, the jackal-headed god of embalming and the passage to the afterlife; THOTH, the ibis-headed god of writing, wisdom and the moon; HATHOR, goddess of love, music and joy; PTAH, creator god and patron of craftsmen; plus Sobek (crocodile), Bastet (cat), Sekhmet (lioness), Ma'at (truth), and many more.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-egyptians-tell-time',
    title: 'How Ancient Egyptians Told Time',
    category: 'Ancient Egypt',
    keywords: [
      'how did ancient egyptians tell time', 'who invented the 24 hour day', 'egyptian water clock', 'egyptian calendar',
      'shadow clock obelisk', 'decan stars egypt', 'how did egyptians measure the night',
    ],
    content: `The ancient Egyptians made major contributions to timekeeping. They divided the day into 24 parts — the basis of our 24-hour day — with 12 "hours" of daylight, 12 of night, plus short twilight periods, though these hours changed length with the seasons. By day they read a shadow clock or "sundial": a horizontal bar or an obelisk casting a moving shadow along marked scales. By night, and to divide the darkness into 12, they tracked the rising of 36 specific stars or star-groups called "decans," listed on tables painted inside coffin lids and tomb ceilings. For measuring intervals regardless of the sky (in temples, at night, in cloud) they used the water clock (clepsydra) — a stone vessel with a small hole at the bottom and inside markings, so the falling water level showed elapsed time. Their civil calendar had 365 days: 12 months of 30 days plus 5 extra "days upon the year," and the new year was tied to the heliacal rising of Sirius (Sopdet), which came just before the annual Nile flood.`,
    createdAt: Date.now(),
  },
];
