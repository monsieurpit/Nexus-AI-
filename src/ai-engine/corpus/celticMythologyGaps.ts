import { KnowledgeItem } from '../../types';

// Batch 120 (Celtic mythology & Irish folklore) — almost entirely absent from
// the corpus. Errors and web dumps on nexus-4b: "geis/geas" was attributed to
// Norse seidr and Odin; "Salmon of Knowledge" was answered with the Gettier
// problem (justified true belief); "Children of Lir" said the swans spent
// "three days and nights in winter" (it is 900 years); "Manannan mac Lir"
// ruled from "Avalon" with "griffins and unicorns"; "four treasures of the
// Tuatha De Danann", "Tain Bo Cuailnge", "changeling", and "Battle of Mag
// Tuired" got flat non-answers; "banshee", "Samhain", "Fomorians", "aos si",
// "selkie", "Brigid" were raw web dumps.
export const CELTIC_MYTHOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-celtic-geis',
    title: 'What a Geis (Geas) Is — an Irish Magical Taboo',
    category: 'Mythology',
    keywords: [
      'what is geis or geas a magical taboo', 'a geis plural geasa is an idiosyncratic personal prohibition or obligation laid on a hero or king in irish myth you must never refuse hospitality never eat the flesh of your name animal',
      'keeping your geasa maintains your honour and luck breaking one brings disaster or death', 'heroes are trapped by contradictory geasa engineered by enemies cu chulainn is doomed when offered dog meat by hags he cannot refuse',
      'kings of tara had elaborate geasa conaire mor in da dergas hostel this is irish gaelic not norse seidr',
    ],
    content: `A geis (plural geasa; also spelled geas) is a supernatural injunction unique to Irish and Scottish Gaelic mythology — a personal taboo or sacred obligation placed on an individual, especially a hero or a king, often at birth or by a druid, a lover, or an enemy. It can be a prohibition ("you must never turn left leaving Tara," "you must never eat the flesh of a dog," "you must never refuse a meal offered by a woman") or a compulsion ("you must fight any man who challenges you at a ford"). As long as a person keeps all of their geasa they retain their honour, strength, and luck; violating one brings ruin or death. The tragic device in the sagas is to trap a hero between contradictory geasa: Cú Chulainn is under a geis never to eat dog meat AND a geis never to refuse hospitality, so when three hags roasting a dog invite him to share it, he is doomed either way, and eating it strips his strength before his final battle. The king Conaire Mór's death in "The Destruction of Da Derga's Hostel" is a cascade of geasa broken one after another. (This is a Gaelic concept — it has nothing to do with Norse seiðr or Odin.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-salmon-of-knowledge',
    title: 'The Salmon of Knowledge (Irish Myth)',
    category: 'Mythology',
    keywords: [
      'what is the salmon of knowledge', 'an ordinary salmon in the river boyne gains all the worlds knowledge by eating hazelnuts of wisdom that fall into the well of segais',
      'the poet finn eces finnegas spends seven years trying to catch it a prophecy says whoever eats it first gains its wisdom he lands it and sets the boy fionn to cook it warning him not to eat any',
      'fionn burns his thumb on the fish sticks it in his mouth and so tastes the salmon first gaining its knowledge ever after fionn accesses all knowledge by biting his thumb',
    ],
    content: `In the Fenian Cycle of Irish mythology, an ordinary salmon swimming in the River Boyne ate nine hazelnuts of wisdom that dropped into the Well of Segais from the sacred hazel trees around it, and thereby absorbed all the knowledge in the world. A prophecy said the first person to eat the salmon would gain that knowledge. The poet Finn Eces (Finnegas) spent seven years fishing the Boyne for it and finally caught it. He gave the fish to his young pupil — a boy then called Demne, later Fionn mac Cumhaill — to cook, ordering him not to eat any of it. While cooking, Fionn pressed his thumb to the sizzling skin, burned it, and instinctively stuck his thumb in his mouth to ease the pain — and so, by accident, he was the first to taste the Salmon of Knowledge. The wisdom passed to him instead of his teacher. From then on, whenever Fionn needed knowledge or foresight, he would put his thumb between his teeth and chew it, and the answer would come to him. (This is a legend, not the philosophical "justified true belief" analysis of knowledge.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-children-of-lir',
    title: 'The Story of the Children of Lir',
    category: 'Mythology',
    keywords: [
      'what is the story of the children of lir', 'lir a lord of the tuatha de danann has four children fionnuala aodh and the twins fiachra and conn by aoibh when aoibh dies lir marries her sister aoife',
      'aoife grows jealous of his love for the children and uses a druids wand to turn them into swans cursed to spend 900 years as swans 300 on lough derravaragh 300 on the sea of moyle 300 on the western sea keeping their human voices and beautiful singing',
      'the curse ends only when a bell of the new christian faith is heard in ireland they turn back into withered ancients and die baptised by a monk aoife is turned into a demon of the air',
    ],
    content: `"The Children of Lir" is one of the "Three Sorrowful Tales of Erin." Lir, a lord of the Tuatha Dé Danann, has four beloved children with his wife Aoibh: a daughter, Fionnuala, a son, Aodh, and twin boys, Fiachra and Conn. When Aoibh dies, Lir marries her sister Aoife. Aoife becomes consumed with jealousy of Lir's devotion to the children, and one day, using a druid's wand, she transforms them into four white swans and lays a curse: they must spend 900 years as swans — 300 on the calm Lough Derravaragh, 300 on the cold and stormy Sea of Moyle between Ireland and Scotland, and 300 on the western ocean near Erris — and the spell can only be broken when the sound of a Christian church bell is heard in Ireland. She leaves them their human speech and gives them the most beautiful singing voices in the world. Their father and the Tuatha Dé cannot undo it. After the 900 years, when Saint Patrick's mission has reached Ireland and a monk's bell rings out, the swans regain human form — but as three-centuries-old withered elders, and they die almost at once, baptised by the monk and buried together. Aoife, for her cruelty, is turned by Lir's father Bodb Derg into a demon of the air forever.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-manannan',
    title: 'Manannán mac Lir, the Irish Sea God',
    category: 'Mythology',
    keywords: [
      'who is manannan mac lir the sea god', 'the irish and manx god of the sea and the otherworld his name is linked to the isle of man mannin',
      'rides the waves in a self navigating boat wave sweeper or a chariot pulled by the horse enbarr across the sea as if it were a plain a cloak of mist feth fiada makes him invisible', 'owns the sword the answerer fragarach and pigs that regenerate when eaten a guardian of the otherworld emain ablach mag mell',
      'fosters lugh appears in the voyage of bran not the arthurian avalon and no griffins or unicorns',
    ],
    content: `Manannán mac Lir is the Irish god of the sea and a guardian and gatekeeper of the Otherworld. His name is bound to the Isle of Man (Mannin), which folklore says he protected under a magic mist. He travels the sea as though it were solid ground — in a boat that sails without oar or sail ("Wave-Sweeper," Scuabtuinne) and in a chariot drawn by his horse Enbarr of the Flowing Mane, who gallops over the waves. His possessions are all wonders: a cloak of mist (the féth fíada) that renders him invisible or changes his shape; the sword Fragarach ("the Answerer"), which no armour can stop; a self-refilling cup that shatters at a lie; and a herd of pigs that can be eaten and come back to life the next day. He rules the Otherworld islands — Emain Ablach ("Emain of the Apple-trees") and Mag Mell ("the Plain of Delight") — and ferries souls there, and he acts as a mentor and fosterer of the hero-god Lugh. He is a central figure in the voyage tale "The Voyage of Bran." (He rules an Irish paradise island, not the Arthurian Avalon, and Irish myth has no griffins or unicorns.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-four-treasures',
    title: 'The Four Treasures of the Tuatha Dé Danann',
    category: 'Mythology',
    keywords: [
      'what are the four treasures of the tuatha de danann', 'four magical objects brought from four northern island cities falias gorias finias murias',
      'the lia fail stone of destiny from falias which cried out under the rightful king of ireland at the hill of tara', 'the sword of nuada from findias no one escaped it once drawn the spear of lugh from gorias victory assured the cauldron of the dagda from murias which never left anyone unsatisfied',
    ],
    content: `The Tuatha Dé Danann were said to have come to Ireland from four mystical cities in the northern islands of the world — Falias, Gorias, Findias (Finias), and Murias — and from each they brought one magical treasure. (1) From FALIAS: the Lia Fáil, the "Stone of Destiny," which roared aloud under the foot of the man who was the true rightful king of Ireland; it is traditionally said to stand on the Hill of Tara. (2) From FINDIAS: the Sword of Nuada (the "Claíomh Solais," Sword of Light), from which no enemy could escape once it was drawn from its sheath. (3) From GORIAS: the Spear of Lugh, which guaranteed victory to whoever wielded it and could not be overcome. (4) From MURIAS: the Cauldron of the Dagda (the "coire ansic"), an inexhaustible vessel from which no company ever went away unsatisfied. Together they represent kingship, war, and abundance.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-tain-bo-cuailnge',
    title: 'The Táin Bó Cúailnge (Cattle Raid of Cooley)',
    category: 'Mythology',
    keywords: [
      'what is the cattle raid of cooley or tain bo cuailnge', 'the central epic of the ulster cycle irelands nearest equivalent to the iliad queen medb of connacht launches an army to seize the great brown bull of cooley from ulster',
      'the warriors of ulster are incapacitated by a curse the pangs so the teenage cu chulainn alone defends the province invoking single combat at fords killing a champion a day including his foster brother fer diad in a three day duel',
      'when ulsters men recover they rout medbs army but the brown bull has already been taken it fights and kills medbs white bull scattering the remains across ireland then dies of exhaustion',
    ],
    content: `The Táin Bó Cúailnge, "The Cattle Raid of Cooley," is the great heroic epic of the Ulster Cycle, roughly Ireland's counterpart to Homer's Iliad. The trouble starts with a pillow-talk argument between Queen Medb of Connacht and her husband Ailill over whose possessions are greater; Medb finds she is exactly matched except that Ailill owns a magnificent bull, Finnbhennach, and she has no equal. Told that the only bull to rival it is the Donn Cúailnge, the great Brown Bull of Cooley in Ulster, she raises an army to take it by force. But the warriors of Ulster lie helpless under an ancient curse — for several days at a time they suffer the "pangs," the weakness of a woman in labour — leaving only the seventeen-year-old Cú Chulainn, immune to the curse, to defend the entire province. He holds Medb's army at the border fords by demanding the right of single combat, killing one champion a day for months, until he is forced to fight and kill his own foster-brother and dearest friend, Fer Diad, in a harrowing three-day duel. When the men of Ulster finally recover and take the field, they crush Medb's army — but by then the Brown Bull has already been carried off. It meets Finnbhennach, gores it to death, and rampages across Ireland dropping pieces of the white bull's body that give many places their names, before its own heart bursts.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-fomorians',
    title: 'Who the Fomorians Are',
    category: 'Mythology',
    keywords: [
      'who are the fomorians', 'a hostile often monstrous supernatural race in irish myth coming from under the sea or the earth representing the wild chaotic and destructive forces of nature blight drought winter opposed to the ordered agricultural tuatha de danann',
      'often depicted as deformed one eye one arm one leg their leaders include balor of the evil poisonous eye whose gaze destroys armies and bres a half fomorian who briefly rules the tuatha de as a tyrant',
      'defeated at the second battle of mag tuired when lugh balors own grandson kills balor the two races also intermarry',
    ],
    content: `The Fomorians (Fomoire) are a race of destructive, chaotic beings in Irish mythology, said to rise from under the sea or out of the earth. They personify the wild and harmful forces of nature — blight, drought, plague, storm, the barren cold of winter — set against the Tuatha Dé Danann, who represent settled agriculture, craft, and cosmic order. They are frequently described as misshapen or monstrous, sometimes with a single eye, arm, and leg. Their most feared figure is Balor "of the baleful (poisonous) eye," whose enormous eyelid takes four men to lift and whose gaze annihilates an army. Another, Bres, is half-Fomorian by blood and is made king of the Tuatha Dé Danann for a time, but rules as a stingy, oppressive tyrant and is deposed. The Fomorians are broken at the second Battle of Mag Tuired, where Lugh — who is Balor's own grandson, thanks to a marriage between the two races meant to prevent exactly this — kills Balor with a sling-stone through his eye. The intermarriage between Tuatha Dé and Fomorians shows the two are not a simple good-versus-evil pair but complementary forces.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-battles-mag-tuired',
    title: 'The Battles of Mag Tuired',
    category: 'Mythology',
    keywords: [
      'what happened at the battle of mag tuired', 'two mythical battles on the plain of mag tuired moytura in sligo mayo first battle the tuatha de danann defeat the fir bolg the previous inhabitants',
      'their king nuada loses an arm and no longer unblemished must give up the kingship which passes to the half fomorian bres', 'second and greater battle bres rules as a mean tyrant and is deposed nuada given a silver then flesh arm resumes the throne then yields command to lugh',
      'the tuatha de fight the fomorians lugh kills his grandfather balor with a sling stone through his destructive eye breaking fomorian power',
    ],
    content: `There are two Battles of Mag Tuired ("Moytura") in the Mythological Cycle, fought on a plain in the northwest of Ireland. The FIRST BATTLE: the newly arrived Tuatha Dé Danann fight the Fir Bolg, the people already holding Ireland, and defeat them. In the fighting the Tuatha Dé king, Nuada, has his arm cut off; because a king of Ireland had to be physically unblemished, Nuada is disqualified from the throne, and it passes to Bres, who is half-Fomorian. The SECOND (and far more important) BATTLE: Bres proves a mean, oppressive ruler who taxes the Tuatha Dé harshly and neglects hospitality, and he is deposed. Nuada — restored, after the physician Dian Cécht makes him first a working silver arm and then, through his son Miach, a real arm of flesh — takes back the kingship, but then hands battle command to the newcomer Lugh, who has shown himself master of every art. The Tuatha Dé then fight the Fomorians. The turning point comes when Lugh confronts his own grandfather Balor and drives a sling-stone (or spear) through Balor's death-dealing eye as the eyelid is being raised, killing him and the men behind him, and ending Fomorian dominance over Ireland.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-cu-chulainn',
    title: 'Who Cú Chulainn Is',
    category: 'Mythology',
    keywords: [
      'who is cu chulainn and what is his story', 'the greatest hero of the ulster cycle son of the god lugh and deichtine sister of king conchobar of ulster born setanta',
      'earned the name cu chulainn hound of culann as a boy after killing the smith culanns guard dog with a hurling ball and offering to guard the house himself trained in arms by the warrior woman scathach in scotland',
      'famous for his riastrad or warp spasm a monstrous battle frenzy single handedly holds off queen medbs army at the fords during the tain dies at about 27 tying himself to a standing stone the morrigan lands on his shoulder as a crow',
    ],
    content: `Cú Chulainn is the supreme hero of the Ulster Cycle. He is the son of the god Lugh and of Deichtine, sister of Conchobar mac Nessa, king of Ulster. Born as Sétanta, he gained his adult name as a small boy: arriving late to a feast at the house of the smith Culann, he was set upon by Culann's ferocious guard-hound and killed it by driving a hurling ball down its throat; to make amends he offered to guard Culann's house himself until a replacement was reared, and so became "Cú Chulainn," the Hound of Culann. He trained in arms overseas with the warrior-woman Scáthach in Scotland, who taught him the "gáe bolg," a barbed spear thrust from between the toes. In battle he is seized by the "ríastrad" or warp-spasm, a terrifying distortion of the body — one eye sucked into his skull, the other bulging on his cheek, a spout of black blood from his crown — during which he cannot tell friend from foe. His greatest feat is in the Táin Bó Cúailnge, where, while the men of Ulster lie cursed, he alone defends the province against Queen Medb's whole army by claiming single combat at the fords. He is bound by fatal geasa and dies young, around age twenty-seven; mortally wounded, he straps himself upright to a standing stone so he can die on his feet facing his enemies, and they know he is truly dead only when the Morrígan, in the form of a crow, settles on his shoulder.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-fionn-fianna',
    title: 'Fionn mac Cumhaill and the Fianna',
    category: 'Mythology',
    keywords: [
      'who is fionn mac cumhaill and the fianna finn mccool', 'hero of the fenian cycle leader of the fianna roving bands of hunter warriors who guarded ireland and defended the high king',
      'gained wisdom by accidentally tasting the salmon of knowledge and could thereafter access all knowledge by biting his thumb his son is the poet oisin his grandson oscar', 'the giants causeway is folklorically attributed to him the fianas most famous tragedy is the pursuit of diarmuid and grainne grainne betrothed to the ageing fionn elopes with the young warrior diarmuid',
      'fionn sleeps in a cave and will wake to defend ireland in its hour of need',
    ],
    content: `Fionn mac Cumhaill (anglicised "Finn McCool") is the central hero of the Fenian Cycle of Irish mythology. He leads the Fianna, roaming bands of elite hunter-warriors who lived apart from settled society, guarded the coasts of Ireland, and served the High King. To join, a man had to be a skilled poet as well as a fighter and pass severe physical tests. Fionn himself is also a seer: as a boy he burned his thumb cooking the Salmon of Knowledge and tasted it first, so ever after he could summon any knowledge by chewing his thumb. His son is Oisín, the poet who narrates many of the tales and who later spends 300 years in Tír na nÓg; his grandson is the warrior Oscar. Folklore credits Fionn with building the Giant's Causeway in County Antrim (as stepping-stones to Scotland, in a contest with a Scottish giant). The most famous story of the Fianna is the tragic "Pursuit of Diarmuid and Gráinne": Gráinne, betrothed against her will to the ageing Fionn, places a geis on the young warrior Diarmuid to run away with her, and the couple are hunted across Ireland for years until Fionn engineers Diarmuid's death. Like King Arthur, Fionn is said to lie sleeping in a cave, to wake and defend Ireland in its greatest need.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-samhain',
    title: 'The Festival of Samhain and Its Link to Halloween',
    category: 'Mythology',
    keywords: [
      'what is the festival of samhain and how does it relate to halloween', 'one of the four gaelic seasonal festivals with imbolc beltane lughnasadh marking the end of the harvest and the start of winter around 31 october to 1 november',
      'the boundary between this world and the otherworld thinned so the aos si and the spirits of the dead could cross people left food and drink out lit bonfires wore disguises to hide from harmful spirits and did divination',
      'the church placed all saints day on 1 november halloween is all hallows eve irish and scottish emigrants carried guising turnip then pumpkin lanterns apple bobbing to north america',
    ],
    content: `Samhain (pronounced roughly "SOW-in") is one of the four great Gaelic seasonal festivals, alongside Imbolc (spring), Beltane (summer), and Lughnasadh (harvest). It falls around 31 October–1 November and marks the end of the harvest and the beginning of the dark half of the year. The Celts believed that at Samhain the veil between the ordinary world and the Otherworld grew thin, so the aos sí (fairy folk) and the spirits of dead ancestors could pass into the human world. In response, people set a place at the table and left out food and drink for the dead and the fairies, lit great communal bonfires, wore costumes and masks — sometimes to hide from harmful spirits, sometimes to impersonate them — and played divination games (about future spouses, deaths, harvests) with apples and nuts. When Christianity spread, the Church placed All Saints' Day ("All Hallows") on 1 November and All Souls' Day on 2 November; "Hallowe'en" is simply "All Hallows' Eve," 31 October. Irish and Scottish emigrants took the old customs — "guising" (going door to door in disguise), carving lanterns from turnips (which became pumpkins in America), and apple-bobbing — to North America in the 19th century, where they merged into modern Halloween.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-banshee',
    title: 'What a Banshee Is',
    category: 'Mythology',
    keywords: [
      'what is a banshee', 'from irish bean sidhe woman of the fairy mound a female spirit whose wailing keening or shrieking cry at night foretells an imminent death in the family',
      'traditionally attached to certain old gaelic families sometimes seen as a beautiful young woman a matron or a withered old hag often combing her long hair', 'related to the scottish bean nighe washerwoman washing the grave clothes of the doomed',
      'the keening echoes the real tradition of the keener a woman hired to lament at wakes not the tv series',
    ],
    content: `A banshee (from Irish bean sídhe, "woman of the fairy mound") is a female spirit in Irish folklore whose eerie cry — a wail, shriek, or the drawn-out lament called "keening" — heard outside a house at night foretells that a member of that family is about to die. In the older tradition each banshee was attached to a particular ancient Gaelic family (surnames beginning Ó or Mac), and several banshees crying together were said to mark the death of someone very great or holy. She appears variously as a beautiful young woman in white or grey, a stately matron, or a hideous old hag with long streaming hair that she combs (picking up a comb left outside was thought to be dangerous). A closely related figure in Scottish Highland lore is the bean nighe, seen at a stream washing the blood from the clothes of those who are about to die. The banshee's keening reflects a real historical custom: the "keeners," women (sometimes paid) who performed loud, formal lamentation over the body at a wake.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-aos-si-changeling',
    title: 'The Aos Sí (Fairy Folk), the Sídhe Mounds, and Changelings',
    category: 'Mythology',
    keywords: [
      'what is the aos si or the fairy folk and the sidhe mounds what is a changeling in celtic folklore',
      'the aos si people of the mounds are the supernatural fairy race of irish and scottish gaelic folklore the diminished hidden descendants of the tuatha de danann who went underground after being defeated by the milesians',
      'they live in the sidhe the ancient burial mounds and passage tombs newgrange knowth and hollow hills doorways to the otherworld do not build on a fairy fort or cut a lone hawthorn',
      'a changeling is a fairy child or sickly old fairy or enchanted wood left in the cradle in place of a stolen human baby a pre modern explanation for infant illness and failure to thrive led to real abuse and deaths such as bridget cleary 1895',
    ],
    content: `The aos sí (older aes sídhe, "people of the mounds") are the fairy race of Irish and Scottish Gaelic folklore. They are understood to be the Tuatha Dé Danann after their defeat by the Milesians (the Gaels): rather than leave Ireland, they withdrew into the "sídhe" — the ancient earthen mounds, passage tombs (Newgrange, Knowth, Dowth), ringforts, and hollow hills that stand all over the countryside, which serve as entrances to the Otherworld. They are not the tiny winged fairies of children's books but a proud, beautiful, and dangerous people who must be respected: you do not build on or plough through a "fairy fort," you never cut down a lone hawthorn tree ("fairy tree"), you leave offerings of milk and bread, and you avoid the roads at dusk and on festival nights. A CHANGELING is what folklore says the fairies leave behind when they steal a human infant: a fairy child, a withered old fairy, or an enchanted lump of wood glamoured to look like the baby. Signs of a changeling were a baby who suddenly looked or behaved differently, cried constantly, would not thrive, or seemed unnaturally old or knowing. Suspected changelings were subjected to cruel "cures" meant to drive the fairy out — leaving the child exposed, on a hot shovel, or over a fire — a belief that caused real deaths, most infamously the 1895 killing of Bridget Cleary in Tipperary. Historians read the changeling belief as a pre-modern explanation for infant illness, disability, and failure to thrive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-selkie',
    title: 'What a Selkie Is',
    category: 'Mythology',
    keywords: [
      'what is a selkie', 'a shapeshifting creature of orkney shetland faroese icelandic irish and scottish folklore especially the northern isles a seal in the water and a human on land shedding its sealskin to come ashore',
      'the classic tale a man finds and hides a female selkies skin forcing her to stay and marry him she bears children and seems content but years later a child finds the hidden skin she takes it and returns to the sea forever watching over her children from the water',
      'male selkies are handsome and seduce dissatisfied human women selkie stories are about longing entrapment and belonging',
    ],
    content: `A selkie (Scots for "seal," also selchie or silkie) is a shapeshifting being from the folklore of the Northern Isles of Scotland (Orkney and Shetland), the Faroes, Iceland, and coastal Ireland and Scotland. In the sea it is a seal; on land it can shed its sealskin and take beautiful human form, but it must keep the skin safe to be able to return to the water. The most common story is of a fisherman or farmer who watches selkie women dancing on the shore, steals and hides one's skin, and thereby forces her to become his wife. She lives with him for years, bears him children, and is a good and gentle partner, but she is always drawn to the sea and quietly searches for her skin. Eventually one of the children innocently mentions or finds the hidden skin; the selkie seizes it, transforms, and slips back into the ocean forever — though she often surfaces near the shore afterwards to watch over the children she left behind. In other tales male selkies, described as irresistibly handsome, come ashore to seduce women who are unhappy or lonely in their marriages. The stories are usually read as being about longing, captivity, divided loyalty, and the pull of one's true nature and home.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-brigid',
    title: 'Brigid — the Goddess and Saint Brigid',
    category: 'Mythology',
    keywords: [
      'who is brigid in irish mythology and how does she relate to saint brigid', 'brigid a goddess of the tuatha de danann daughter of the dagda associated with poetry healing smithcraft livestock holy wells and sacred fire possibly three sisters all named brigid',
      'her festival is imbolc 1 february marking the start of spring and the lactation of ewes', 'saint brigid of kildare one of irelands three patron saints with patrick and columba shares the name feast day fire associations a perpetual flame at kildare livestock and generosity',
      'scholars think the saints cult absorbed and christianised the goddess the st brigids cross woven from rushes is made on her eve',
    ],
    content: `In Irish mythology, Brigid (Brigit, Bríd) is a goddess of the Tuatha Dé Danann, a daughter of the Dagda. She is associated with poetry and inspiration, healing, and smithcraft — sometimes described as three sisters, all called Brigid, each governing one of those domains, and sometimes as a single goddess with three functions. She is also linked to livestock, dairying, holy wells, and a sacred, tended fire. Her festival is Imbolc, on 1 February, which marks the first stirrings of spring and the beginning of the ewes' milk. SAINT BRIGID of Kildare (traditionally c. 451–525) is one of Ireland's three national patron saints, alongside Patrick and Columba. She shares with the goddess the name, the feast day (1 February, "St Brigid's Day"), a strong association with fire (her monastery at Kildare was said to keep a perpetual flame, tended by nuns, into the medieval period), a role as protector of cattle and dairy, and legends of miraculous generosity and abundance. Most scholars conclude that the cult of the saint absorbed and Christianised the older goddess, though a historical abbess of Kildare very likely existed. On the eve of her feast, people still weave the distinctive "St Brigid's cross" out of rushes and hang it in the house for protection.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celtic-irish-welsh-gaulish',
    title: 'Irish vs Welsh vs Gaulish Celtic Mythology',
    category: 'Mythology',
    keywords: [
      'what is the difference between irish welsh and gaulish celtic mythology', 'irish gaelic mythology the richest surviving branch preserved in medieval manuscripts lebor gabala erenn and the four cycles by christian monks tuatha de danann cu chulainn fionn',
      'welsh brythonic mythology survives mainly in the four branches of the mabinogi rhiannon bran manawydan arawn gwydion lleu cognate to lugh don cognate to danu feeds into arthurian legend',
      'gaulish continental celtic mythology has almost no native literature reconstructed from roman authors inscriptions and iconography lugus cernunnos epona taranis teutates',
    ],
    content: `The Celtic-speaking peoples shared gods and themes, but what survives of their mythologies differs enormously by region because of what got written down. IRISH (Goidelic/Gaelic) mythology is the fullest, recorded by Christian monks from the 8th century onward in manuscripts such as the Lebor Gabála Érenn ("Book of Invasions") and organised by later scholars into four cycles — Mythological (the Tuatha Dé Danann, the Battles of Mag Tuired), Ulster (Cú Chulainn, the Táin), Fenian (Fionn and the Fianna), and Kings' (semi-historical royal tales). WELSH (Brythonic) mythology survives mainly in the Four Branches of the Mabinogi and tales like "Culhwch and Olwen," featuring Rhiannon, Pryderi, Brân the Blessed, Manawydan (cognate to the Irish Manannán), Arawn king of the Otherworld Annwn, the magician Gwydion, and Lleu Llaw Gyffes (cognate to Lugh); its characters are less openly gods, and the material flows directly into the Arthurian legend. GAULISH (Continental Celtic) mythology has almost no native narrative at all, because the Gauls left very little writing; it is pieced together from Roman authors (who identified Gaulish gods with Roman ones), from thousands of votive inscriptions, and from carved images — giving us names and attributes for gods like Lugus, the antlered Cernunnos, the horse-goddess Epona, Taranis (thunder), Teutates, Esus, and Sucellus, but no stories. In short: Ireland preserves the myths, Wales preserves them bent toward Arthur, and Gaul preserves only the gods' names and faces.`,
    createdAt: Date.now(),
  },
];
