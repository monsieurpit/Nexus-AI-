import { KnowledgeItem } from '../../types';

// Batch 123 (Japanese folklore & yokai) — almost entirely absent. Wrong-domain
// answers on nexus-4b: "kappa" -> the Twitch emote; "kitsune" -> the Nine-
// Tailed Fox in Naruto; "shikigami and Abe no Seimei" -> Death Note; "47
// ronin" -> the 2013 Keanu Reeves film; "yuki-onna" -> how snow forms;
// "Amaterasu and the cave myth" -> a description of the Chinese goddess
// Xiwangmu; "Obon" -> a flat non-answer. Web dumps: Susanoo/Orochi, tanuki,
// Momotaro, onryo, Urashima Taro, the Seven Lucky Gods, tsukumogami.
export const JAPANESE_FOLKLORE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-jp-kappa',
    title: 'What a Kappa Is (Japanese Folklore)',
    category: 'Mythology',
    keywords: [
      'what is a kappa in japanese folklore', 'a river and pond yokai the size of a child greenish with webbed hands and feet a turtle like shell and a water filled dish on the top of its head',
      'if the water spills or dries out the kappa is paralysed or dies so make it bow it is compulsively polite so the water pours out', 'kappa drown swimmers horses and cattle reach for the shirikodama a mythical ball in the anus love cucumbers hence kappamaki and sumo wrestling',
      'not the twitch emote',
    ],
    content: `A kappa ("river child") is one of the most famous Japanese water yōkai. It is about the size of a small child, with greenish or yellowish scaly or slimy skin, webbed hands and feet, a beaked or turtle-like face, a shell on its back, and — the crucial feature — a shallow dish or hollow on the crown of its head that must stay filled with water. If that water spills out or dries, the kappa loses all its strength and may die, so the traditional way to escape or defeat one is to bow deeply to it: a kappa is obsessively polite and will bow back, tipping the water out. Kappa are mischievous at best and murderous at worst — they lurk in rivers and ponds and drag in horses, cattle, and especially children to drown them, and folklore says they reach into a drowned victim to pull out the "shirikodama," an imaginary organ or ball. They are, however, honourable if you get a promise from them, and they can be placated: they adore cucumbers (which is why a cucumber sushi roll is a "kappamaki") and love challenging humans to sumo wrestling. (This has nothing to do with the grayscale Twitch chat emote of the same name.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-kitsune',
    title: 'What a Kitsune (Fox Spirit) Is and Its Powers',
    category: 'Mythology',
    keywords: [
      'what is a kitsune the fox spirit and what are its powers', 'a fox with supernatural powers the older it gets the more tails it grows up to nine and the more powerful and wise a nine tailed fox is near divine its fur white or gold',
      'powers shapeshifting into a beautiful woman illusion possession of people kitsune tsuki fox fire kitsunebi appearing in dreams', 'two kinds zenko good foxes celestial messengers of the rice god inari guardians whose statues flank inari shrines and yako or nogitsune field foxes tricksters and malicious spirits',
      'the tale of kuzunoha a fox who marries a man and bears the onmyoji abe no seimei not the naruto nine tails',
    ],
    content: `A kitsune is a fox that has gained supernatural power with age. The older and more spiritually developed it becomes, the more tails it grows — up to nine — and a nine-tailed kitsune (kyūbi) is nearly a god, its fur turned white or gold. Powers: shapeshifting, most often into a beautiful woman (but a real fox's shadow, a tail slipping out, or a reflection can betray it), casting illusions, possessing people ("kitsune-tsuki," historically a folk explanation for certain mental illness), producing "kitsune-bi" (fox-fire, floating flames / will-o'-the-wisp), flying, and entering dreams. There are two broad types. ZENKO ("good foxes") are celestial, benevolent servants and messengers of Inari, the kami of rice, harvest, and prosperity — this is why pairs of stone fox statues, often with a key or a jewel in their mouths, guard the entrances of Inari shrines. YAKO or NOGITSUNE ("field foxes") are wild tricksters, ranging from playful pranksters to genuinely malevolent spirits. A famous story is that of Kuzunoha, a fox who takes human form, marries a kind man, and bears a son — the legendary diviner Abe no Seimei — before her true nature is discovered and she must leave, writing a farewell poem on the wall. (The demonic "Nine-Tailed Fox" sealed inside a character in the anime Naruto is a modern fictional use of this folklore, not the folklore itself.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-amaterasu-cave',
    title: 'Amaterasu the Sun Goddess and the Cave Myth',
    category: 'Mythology',
    keywords: [
      'who is amaterasu the sun goddess and the cave myth', 'amaterasu omikami the sun goddess and highest deity of shinto ancestress of the imperial line born from izanagi washing his left eye',
      'the cave myth ama no iwato after susanoo rampaged through heaven destroying rice fields and flinging a flayed horse through the roof of her weaving hall killing an attendant amaterasu hid in a cave and sealed it plunging the world into darkness',
      'the 800 myriad kami hung a mirror and jewels on a sakaki tree ame no uzume danced a comic striptease on an overturned tub the gods roared with laughter amaterasu peeked out saw her own reflection in the mirror and was pulled free and a sacred rope stretched behind her',
    ],
    content: `Amaterasu-Ōmikami is the sun goddess and the supreme deity of Shinto, from whom the Japanese imperial family traditionally claims descent. She was born when the primordial god Izanagi, purifying himself after visiting the underworld, washed his left eye. Her most famous myth is the Ama-no-Iwato ("Heavenly Rock Cave"). Her brother, the storm god Susanoo, ran wild through Heaven — trampling and flooding her rice paddies, defiling her sacred hall, and finally hurling a flayed piebald horse through the roof of the hall where Amaterasu and her women were weaving, killing an attendant. In fury and grief, Amaterasu shut herself inside a cave and rolled a great boulder across the entrance. The sun vanished, the world fell into permanent night, and evil spirits swarmed. The eight hundred myriad kami gathered on the dry riverbed of Heaven to plan. They uprooted a sakaki tree and hung it with a large bronze mirror and strings of curved jewels (magatama), set roosters to crow, and had the bawdy goddess Ame-no-Uzume dance on an overturned washtub, baring her breasts and hitching up her skirts until every god present was howling with laughter. Puzzled that they could be so merry in the dark, Amaterasu opened the cave a crack and asked why. Uzume told her a more glorious goddess had appeared, and turned the mirror toward her; entranced by her own dazzling reflection, Amaterasu edged out further, the strong-armed god Ame-no-Tajikarao hauled her clear, and another god stretched a sacred straw rope (shimenawa) across the cave mouth so she could not go back. Light returned to the world.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-susanoo-orochi',
    title: 'Susanoo and the Slaying of Yamata no Orochi',
    category: 'Mythology',
    keywords: [
      'who is susanoo and the story of the yamata no orochi serpent', 'susanoo the storm and sea god younger brother of amaterasu born from izanagis nose banished from heaven for his rampage',
      'in izumo he meets an old couple weeping the eight headed eight tailed serpent yamata no orochi its body spanning eight valleys has devoured seven of their eight daughters and is coming for the last kushinada hime',
      'susanoo turns her into a comb tucks it in his hair has the couple brew eight vats of strong sake behind eight gates the serpents eight heads drink get drunk pass out he hacks it apart and finds the sword kusanagi in its tail one of the three imperial regalia',
    ],
    content: `Susanoo (Susanoo-no-Mikoto) is the god of storms and the sea, the tempestuous younger brother of the sun goddess Amaterasu, born from the nose of Izanagi. After the rampage that drove Amaterasu into the cave, the other kami stripped Susanoo of his beard and nails and banished him from Heaven. Wandering the land of Izumo, he came upon an old couple weeping beside their last daughter, Kushinada-hime. They explained that for seven years the monster Yamata no Orochi — a serpent with eight heads and eight tails, its body so vast it stretched over eight valleys and eight hills, its back grown over with moss and trees, its eyes red as winter cherries — had come each year and devoured one of their eight daughters, and it was now due for the last. Susanoo asked for the girl's hand, and when the couple agreed he transformed Kushinada-hime into a close-toothed comb and tucked her safely into his hair. He had the couple brew eight vats of the strongest sake and set them on platforms behind a fence with eight gates. The serpent arrived, plunged one head into each vat, drank it all, and collapsed dead drunk. Susanoo drew his sword and hacked the beast to pieces; when his blade chipped against something in the fourth tail, he cut it open and found a magnificent sword, later named Kusanagi-no-Tsurugi ("Grass-Cutting Sword"). He presented it to Amaterasu as a reconciliation gift, and it became one of the Three Sacred Treasures (Imperial Regalia) of Japan, alongside the mirror and the jewel. Susanoo then married Kushinada-hime and built a palace in Izumo.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-izanagi-izanami',
    title: 'Izanagi, Izanami, and the Creation of Japan',
    category: 'Mythology',
    keywords: [
      'who is izanagi and izanami and the creation of japan', 'izanagi he who invites and izanami she who invites the last primordial kami a brother sister pair who stir the ocean with a jeweled spear the brine dripping from its tip forms the first island onogoro',
      'they marry and give birth to the islands of japan and many kami izanami dies giving birth to the fire god izanagi follows her to yomi the underworld she says not to look at him he lights a torch and sees her rotting corpse he flees and blocks the entrance with a boulder they declare divorce',
      'izanagi purifies himself in a river washing his left eye produces amaterasu the sun his right eye tsukuyomi the moon and his nose susanoo storms',
    ],
    content: `Izanagi ("he who invites") and Izanami ("she who invites") are the last of the seven generations of primordial kami, a brother-and-sister couple charged with making the world solid. Standing on the Floating Bridge of Heaven, they dip a jewelled spear into the formless ocean and stir; brine dripping from the spear's tip piles up into the first island, Onogoro. They descend to it and marry, circling a pillar — but Izanami (the woman) speaks the greeting first, and their first children are the malformed "leech-child" Hiruko and a foam-island, which they set adrift. Redoing the rite with Izanagi speaking first, they then properly give birth to the eight great islands of Japan and to a host of kami of sea, wind, trees, mountains, and food. Izanami is fatally burned giving birth to the fire god Kagutsuchi. Grief-stricken, Izanagi beheads Kagutsuchi and then travels down to Yomi, the land of the dead, to bring Izanami back. She says she has already eaten the food of Yomi and is bound there, but will beg the underworld's permission to leave — and forbids him to look at her meanwhile. Impatient, Izanagi snaps a tooth from his comb and lights it as a torch, and sees Izanami as a rotting, maggot-crawling corpse with thunder-demons growing from her body. He flees in horror; the enraged Izanami sends the hags of Yomi and then comes herself in pursuit, and Izanagi seals the entrance with a boulder. From opposite sides of the rock they pronounce their divorce: Izanami vows to kill a thousand people every day, and Izanagi vows to have fifteen hundred born every day. Back in the world, Izanagi bathes to wash off the pollution of death — the origin of Shinto purification. As he washes his LEFT eye, Amaterasu the sun goddess is born; from his RIGHT eye, Tsukuyomi the moon god; and from his NOSE, Susanoo the storm god — "the three noble children."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-yuki-onna',
    title: 'What a Yuki-onna (Snow Woman) Is',
    category: 'Mythology',
    keywords: [
      'what is a yuki onna the snow woman', 'a yokai who appears on snowy nights as a tall beautiful woman with unnaturally pale or translucent skin long black hair and a white kimono sometimes floating without feet leaving no footprints',
      'in most tales she is deadly she appears to travellers caught in blizzards and freezes them with her icy breath or a kiss or lures them off cliffs or blows open a door and freezes a sleeping victim',
      'in lafcadio hearns version she spares a young woodcutter if he never tells anyone he saw her years later he tells his wife yuki who reveals she is the yuki onna and vanishes',
    ],
    content: `A yuki-onna ("snow woman") is a yōkai that appears during snowstorms and on cold, moonlit winter nights. She takes the form of a tall, strikingly beautiful woman with skin so pale it is almost transparent (she can be nearly invisible against the snow), very long black hair, and a thin white kimono; in many depictions she drifts along without touching the ground and leaves no footprints. In most versions she is lethal: she appears to travellers lost or exhausted in a blizzard and freezes them to death with an icy breath or a kiss, leads them astray until they die of cold or walk off a cliff, or blows open the door of a hut and kills a sleeper with frost. Some tales make her more ambivalent — she may spare a handsome young man, or a mother figure who is really searching for her lost child. The best-known story is Lafcadio Hearn's ("Kwaidan"): two woodcutters shelter from a storm, and a yuki-onna kills the old one but spares the young one, Minokichi, on the condition that he never tell a living soul what he saw. A year later Minokichi marries a lovely travelling woman named O-Yuki; they live happily and have children, until one night, watching her sew by lamplight, he casually tells her the story of the strange white woman. O-Yuki reveals that she IS the yuki-onna, spares him only for the sake of the children, and dissolves into a white mist that vanishes up the smoke-hole.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-shikigami-seimei',
    title: 'Shikigami and Abe no Seimei the Onmyōji',
    category: 'Mythology',
    keywords: [
      'what is a shikigami and abe no seimei the onmyoji', 'a shikigami is a spirit or minor kami summoned and bound to serve an onmyoji a practitioner of onmyodo the heian era japanese cosmology of yin yang the five phases astrology and divination',
      'shikigami are often conjured from folded paper that becomes birds or beasts they spy deliver messages protect a house or attack enemies and can be dangerous if they turn on an unskilled summoner',
      'abe no seimei 921 to 1005 the legendary greatest onmyoji a real court diviner son of the human abe no yasuna and the fox woman kuzunoha able to see demons and command shikigami enshrined at the seimei shrine in kyoto not death note',
    ],
    content: `A shikigami is a spirit servant conjured and controlled by an onmyōji — a specialist in onmyōdō, the Heian-period Japanese system of esoteric knowledge combining the Chinese yin-yang and five-phases theory, astrology, calendar-making, divination, and protective magic, which was an official function at the imperial court. Shikigami are typically low-ranking spirits or animated objects; onmyōji were said to fold them out of paper (which could turn into birds or beasts), and use them to scout, carry messages, guard a household against curses and disease, or attack an enemy. A shikigami requires constant control, and folklore warns that one can turn on a careless or weak master. ABE NO SEIMEI (921–1005) was a real astrologer-diviner of the Heian court who became, over the centuries, the legendary supreme onmyōji of Japanese folklore. Legend makes him the son of the nobleman Abe no Yasuna and Kuzunoha, a white fox in human form — giving him fox blood, the ability to see spirits and demons that others could not, and mastery over shikigami (one story says he kept his shikigami hidden under Ichijō Bridge because their frightening faces upset his wife). His great rival was the sorcerer Ashiya Dōman. He is worshipped at the Seimei Shrine in Kyoto, and is one of the most-used real historical figures in modern Japanese manga, anime, novels, film, and games. (Shikigami are not a Death Note concept; that series borrows the word loosely.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-47-ronin',
    title: 'The Story of the 47 Rōnin',
    category: 'Mythology',
    keywords: [
      'what is the story of the 47 ronin chushingura', 'in 1701 the daimyo asano naganori provoked and insulted by the court official kira yoshinaka drew his sword inside edo castle a capital offence asano was ordered to commit seppuku the same day his lands confiscated his samurai became masterless ronin kira went unpunished',
      'forty seven of asanos retainers led by oishi kuranosuke swore revenge oishi spent nearly two years dissolute and drunk to lull kiras suspicions then on a snowy night in december 1702 the 47 raided kiras mansion killed him and laid his head on asanos grave at sengaku ji',
      'they turned themselves in the government ordered them to commit honourable seppuku rather than be executed they are buried beside their lord the most famous tale of samurai loyalty in japan',
    ],
    content: `The tale of the 47 rōnin ("Chūshingura") is Japan's most celebrated story of samurai loyalty, based on real events of 1701–1703. Asano Naganori, a young provincial lord, was being instructed in court etiquette by Kira Yoshinaka, a senior and corrupt official who repeatedly insulted and humiliated him (in some accounts because Asano would not pay a large enough bribe). Finally Asano lost his temper and attacked Kira with a dagger inside Edo Castle, wounding him. Drawing a weapon in the shogun's castle was a capital crime: Asano was ordered to commit seppuku (ritual disembowelment) that same day, his domain was confiscated, and his roughly 300 retainers became rōnin — masterless samurai. Kira received no punishment at all. Forty-seven of Asano's retainers, led by his senior counsellor Ōishi Kuranosuke, secretly vowed to avenge their lord. Knowing Kira expected a revenge attack, Ōishi spent almost two years apparently abandoning himself to drink and debauchery, frequenting brothels, being seen collapsed in the street, and even divorcing his wife and sending his family away, until Kira's spies concluded the rōnin were broken men and Kira relaxed his guard. Then, on a snowy night in mid-December 1702, the 47 assembled, stormed Kira's Edo mansion from front and back, killed his guards, found Kira hiding in a coal shed, and beheaded him. They carried his head across the city and laid it on Asano's grave at Sengaku-ji temple, then surrendered to the authorities. The shogunate was caught between the law (they had carried out an unauthorized vendetta) and public admiration for their loyalty; it ruled that they should be allowed the honourable death of seppuku rather than be executed as common criminals. All 47 (one had been sent away earlier to report) died by their own hand and were buried beside their lord at Sengaku-ji, where their graves are still tended today. (The 2013 Hollywood film "47 Ronin" is a loose fantasy version.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-seven-lucky-gods',
    title: 'The Seven Lucky Gods (Shichifukujin)',
    category: 'Mythology',
    keywords: [
      'what are the seven lucky gods shichifukujin', 'a group of seven deities of good fortune from shinto buddhism taoism and hinduism who ride together on a treasure ship takarabune an image put under the pillow on new years night brings a lucky first dream',
      'ebisu fishermen and merchants fishing rod and sea bream daikokuten wealth and the kitchen golden mallet and treasure sack benzaiten the only goddess music and eloquence plays a biwa bishamonten warriors armour spear and pagoda',
      'fukurokuju wisdom and longevity elongated bald head jurojin longevity old man with a deer hotei contentment and children the fat laughing monk with a cloth sack',
    ],
    content: `The Seven Lucky Gods (Shichifukujin) are a set of seven deities of good fortune, gathered from Shinto, Japanese Buddhism, Taoism, and Hinduism, who are pictured travelling together on a "treasure ship" (takarabune). Slipping a picture of the ship under the pillow on the night of January 1st is said to bring an auspicious first dream of the year. The seven: EBISU — the only one of purely Japanese origin — god of fishermen, tradesmen, and honest labour, a laughing figure holding a fishing rod and a large red sea bream. DAIKOKUTEN — god of wealth, farmers, and the kitchen, a stout smiling figure standing on rice bales with a golden mallet that grants wishes and a sack of treasure; derived from the Hindu Mahākāla. BENZAITEN (Benten) — the only goddess of the seven — patroness of music, the arts, eloquence, learning, and water, playing a biwa lute; from the Hindu Saraswati. BISHAMONTEN — god of warriors and defender against evil, in full armour with a spear and a small pagoda; from the Buddhist guardian Vaiśravaṇa. FUKUROKUJU — god of wisdom, wealth, and long life, an old man with an enormously elongated bald head, a staff, and a scroll; of Chinese Taoist origin. JUROJIN — another god of longevity, an old man with a walking stick and a scroll, accompanied by a deer; often confused or merged with Fukurokuju. HOTEI — god of contentment, abundance, good health, and children, the fat, bald, laughing wanderer with an enormous cloth sack (the "Laughing Buddha" of Chinese Chan Buddhism, based on the eccentric monk Budai).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-momotaro',
    title: 'The Story of Momotarō the Peach Boy',
    category: 'Mythology',
    keywords: [
      'what is the story of momotaro the peach boy', 'an old childless couple find a giant peach floating down the river when the old woman cuts it open a baby boy is inside sent by heaven they name him momotaro peach taro',
      'he grows up strong and sets off to onigashima demon island to defeat the oni who raid the villages his mother makes him millet dumplings kibi dango along the way he meets a talking dog a monkey and a pheasant and recruits each by sharing a dumpling',
      'together they storm the island defeat the oni chief and return with the demons stolen treasure one of japans most famous folk tales',
    ],
    content: `Momotarō ("Peach Tarō") is one of Japan's best-loved folk tales. An old woodcutter and his wife are childless. One day, while the old woman is washing clothes at the river, an enormous peach comes floating down. She carries it home, and when she and her husband try to cut it open a healthy baby boy leaps out — a gift from Heaven for their kindness. They raise him as their son, naming him Momotarō, and he grows into an unusually strong and brave young man. Hearing that a band of oni (demons) on the far island of Onigashima have been raiding the mainland, stealing treasure and terrorising people, Momotarō sets out to stop them. His mother sends him off with a bag of freshly made millet dumplings (kibi-dango), said to be the best in Japan. On the road he is approached in turn by a talking dog, a monkey, and a pheasant, each hungry; he gives each half a dumpling, and each joins him as a loyal companion. Together they cross to Onigashima, break through the gates (the pheasant pecking eyes, the monkey climbing walls, the dog biting), defeat the oni army, and force the demon chief to surrender and beg for his life. Momotarō and his three animals return home with a cart of the demons' plundered gold and treasure, and the old couple live in comfort. The story is enormously popular in Japan and was used as nationalist and wartime propaganda in the 1930s–40s.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-urashima-taro',
    title: 'The Story of Urashima Tarō',
    category: 'Mythology',
    keywords: [
      'what is the story of urashima taro', 'a young fisherman rescues a small sea turtle that children are tormenting on the beach days later a large turtle carries him under the sea to the dragon palace ryugu jo where the beautiful princess otohime hosts him',
      'after what feels like three days he grows homesick and asks to return otohime gives him a mysterious box tamatebako and tells him never to open it back on land 300 years have passed everyone he knew is dead',
      'bewildered he opens the box a cloud of white smoke rushes out and he instantly ages into a decrepit old man the box held his accumulated years',
    ],
    content: `Urashima Tarō is a classic Japanese folk tale of the type where a visit to the Otherworld swallows a human lifetime. A young, kind-hearted fisherman named Urashima Tarō sees some children on the beach tormenting a small sea turtle; he buys it from them (or shoos them off) and releases it into the sea. A few days later, while he is out fishing, a large turtle surfaces and tells him the little turtle he saved was the daughter of the Dragon King (or an emissary of the sea princess), and offers to carry him to the undersea palace as thanks. Riding on the turtle's back, Urashima reaches Ryūgū-jō, the coral-and-crystal Dragon Palace at the bottom of the sea, where the beautiful princess Otohime welcomes him and entertains him with feasts and dancing fish. After what seems like three days, he becomes homesick and asks to go back to see his aging parents. Otohime sadly agrees and gives him a beautiful ornamental box (the tamatebako), telling him to keep it as a keepsake but never, under any circumstances, to open it. The turtle carries him back to his village — but nothing is familiar, his house is gone, and no one recognises his name. He learns that 300 years have passed; his parents, everyone he knew, and their children and grandchildren are long dead. Alone and heartbroken, forgetting the warning, he opens the box. A puff of white smoke billows out, and in an instant Urashima Tarō turns into a white-haired, wrinkled old man (in some versions he crumbles to dust, or becomes a crane): the box had been holding all the years that should have passed him by.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-obon',
    title: 'What Obon, the Festival of the Dead, Is',
    category: 'Mythology',
    keywords: [
      'what is obon the festival of the dead', 'a japanese buddhist festival honouring the spirits of ancestors held in mid august or mid july a three day period when the dead return to visit the family home',
      'families clean the graves and the household buddhist altar butsudan light welcome fires mukae bi and lanterns to guide the spirits home make food offerings then light send off fires okuri bi such as kyotos giant hillside bonfires daimonji and float paper lanterns down rivers toro nagashi',
      'the communal bon odori folk dance around a raised platform yagura in summer yukata is a central custom one of the main times japanese people travel to their hometowns',
    ],
    content: `Obon (or Bon) is the Japanese Buddhist festival that honours the spirits of one's ancestors. It is held over about three days in mid-August in most of the country (mid-July in parts of the Kantō region and Okinawa's schedule differs), and during it the souls of the dead are believed to return to visit their living relatives. Families clean and decorate the ancestral graves and the household Buddhist altar (butsudan), lay out food offerings, and light "welcoming fires" (mukae-bi) and paper lanterns on the evening the spirits arrive, to guide them home. On the final evening they light "send-off fires" (okuri-bi) to see the spirits back to the other world — the most spectacular being Kyoto's Gozan no Okuribi, in which giant characters and shapes are burned on five mountainsides — and float lit paper lanterns down rivers and out to sea (tōrō nagashi). A central communal custom is the Bon Odori, a folk dance performed by everyone in a circle around a raised drum-tower (yagura), typically in summer-festival cotton kimono (yukata); each region has its own dance and song. Obon is, with New Year, one of the two periods when huge numbers of Japanese people travel back to their family hometowns.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-raijin-fujin',
    title: 'Raijin and Fūjin, the Thunder and Wind Gods',
    category: 'Mythology',
    keywords: [
      'who is raijin and fujin the thunder and wind gods', 'raijin also raiden a fierce muscular oni like god usually green or red with claws encircled by a ring of taiko drums which he strikes with two hammers to make thunder children hide their navels in storms because raijin eats them',
      'fujin an equally demonic green skinned wind god who carries a huge bag furo of winds slung over his shoulders and releases them by opening it', 'the two are almost always depicted together as in sotatsus screen painting and stand as guardians at the kaminarimon thunder gate of senso ji temple in asakusa',
    ],
    content: `Raijin (also called Raiden or Kaminari-sama) and Fūjin are the Japanese gods of thunder/lightning and of wind, and in art they are almost always shown as a pair. RAIJIN is a wild, muscular, demon-like figure, usually with green or red skin, sharp claws and fangs, and a fearsome grimace, surrounded by a ring of taiko drums; he beats the drums with a hammer in each hand to make thunder, and hurls down lightning. Japanese folklore warns children to cover their navels during a thunderstorm, because Raijin is said to eat the belly-buttons of the careless (a way of getting children to lie down and stay warm as the temperature drops before a storm). FŪJIN is his equally demonic-looking companion, a green-skinned god with wild hair who carries an enormous bag or sack of winds (fūro) slung across his shoulders; he creates wind by opening the mouth of the bag and letting it out. Both figures ultimately derive from Buddhist guardian deities brought from India (Fūjin from Vāyu, Raijin from figures associated with Indra). The most famous image of them is Tawaraya Sōtatsu's 17th-century gold folding screen "Wind God and Thunder God." They also stand as the two guardian statues in the great Kaminarimon ("Thunder Gate"), the outer gate of Sensō-ji temple in the Asakusa district of Tokyo.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-onryo-yurei',
    title: 'Yūrei and Onryō (Japanese Ghosts and Vengeful Spirits)',
    category: 'Mythology',
    keywords: [
      'what is an onryo or vengeful ghost and yurei', 'a yurei is a japanese ghost the spirit of a dead person unable to pass on because of a violent or wrongful death unfinished business strong emotion or improper funeral rites',
      'classic depiction a woman in a white burial kimono long black hair hanging loose no feet hands dangling limply hovering near water at 2 am ushi mitsu doki', 'an onryo is the most feared type a vengeful ghost very often a woman betrayed or murdered by a husband or lover whose rage can kill curse bloodlines and cause disasters',
      'oiwa from yotsuya kaidan and okiku the plate counting well ghost are the famous onryo and shaped j horror sadako in ringu kayako in ju on',
    ],
    content: `A yūrei is a Japanese ghost: the soul of a dead person that cannot move on to the afterlife, usually because of a sudden or violent death, a wrongful death, powerful unresolved emotion (grief, love, jealousy, hatred), or the failure of the living to perform the proper funeral and memorial rites. The image fixed by Edo-period kabuki theatre and by the painter Maruyama Ōkyo is instantly recognisable: a figure — very often a young woman — in a plain white burial kimono, with long, unbound black hair hanging over the face, arms held out from the body with the hands dangling limp from the wrists, and legs that fade to nothing (no feet), floating a little above the ground. Yūrei tend to haunt the specific place where they died or where their body lies, often near water, and to appear in the "ox hour," around 2 a.m. An ONRYŌ is the most dangerous class of yūrei: a vengeful spirit, most classically a woman who was betrayed, abused, or murdered by a husband or lover, whose fury is powerful enough to physically harm and kill the living, ruin a whole family line, and even cause plagues and natural disasters, and which cannot be laid to rest until the wrong is put right or the spirit is ritually pacified. The archetypal onryō of Japanese literature are Oiwa (from the play "Yotsuya Kaidan," disfigured and killed by her husband) and Okiku (murdered and thrown down a well, forever counting plates). This tradition is the direct source of modern Japanese horror — Sadako in "Ringu," Kayako in "Ju-On."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-tanuki',
    title: 'What a Tanuki Is in Japanese Folklore',
    category: 'Mythology',
    keywords: [
      'what is a tanuki in japanese folklore', 'the tanuki japanese raccoon dog a real animal is a shapeshifting yokai a jolly bumbling trickster and lucky figure the comic counterpart to the sly kitsune',
      'it can transform into people or objects disguises leaves as money drums on its huge belly and its enormous scrotum is a symbol of good luck that it can stretch into a blanket a net or a weapon in comic tales',
      'the ceramic tanuki statue chubby straw hat sake bottle promissory note big belly stands outside bars and restaurants for luck the classic story is the bunbuku chagama a tanuki that turns into a tea kettle',
    ],
    content: `The tanuki is a real animal — the Japanese raccoon dog, a stocky, short-legged canid — but in folklore it is a shapeshifting yōkai, and specifically the good-natured, clumsy, fun-loving trickster that plays comic foil to the clever and sometimes sinister fox (kitsune). A folkloric tanuki can transform itself into a person, an object, or a landscape; it makes fools of travellers, passes off dried leaves as gold coins to pay for sake, drums on its own enormously distended belly to make eerie music in the night ("tanuki-bayashi"), and — its most famous feature — has a hugely oversized scrotum ("kintama," literally "golden balls"), long treated as a symbol of financial luck and stretched, in humorous prints and tales, into a raincoat, a fishing net, a drum, or a weapon. The ubiquitous ceramic tanuki statue outside Japanese bars, restaurants, and shops shows it standing on two legs, pot-bellied, wearing a big straw hat, and carrying a bottle of sake in one hand (or paw) and a promissory note in the other — a charm for prosperity and for customers who pay their bills. The classic tanuki tale is "Bunbuku Chagama," about a tanuki that transforms into a tea kettle and is bought by a poor man, then performs tightrope tricks as a half-kettle, half-tanuki to make his fortune.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-tengu',
    title: 'What a Tengu Is',
    category: 'Mythology',
    keywords: [
      'what is a tengu', 'a mountain dwelling yokai once considered destructive crow like demons karasu tengu with a beak wings and a birds body later softened into more human yamabushi tengu a red faced man with an extremely long nose dressed as a mountain ascetic monk carrying a feather fan that raises great winds',
      'tengu are proud easily offended skilled in martial arts and trickery they abduct arrogant priests and children cause madness being spirited away and in some tales teach swordsmanship to worthy heroes minamoto no yoshitsune trained by the tengu king sojobo on mt kurama',
      'tengu ni naru to become a tengu means to become conceited',
    ],
    content: `A tengu is a mountain- and forest-dwelling yōkai, one of the best known in Japan. In early belief tengu were purely malevolent, disruptive spirits imagined as crows or birds of prey — the "karasu-tengu" has a black-feathered body, wings, clawed feet, and a sharp beak. Over time a more human form became standard: the "yamabushi-tengu," a tall man with a bright red face, a fierce expression, an absurdly long nose, small wings, and the checkered robe and little black cap of a mountain-ascetic monk (yamabushi), carrying a fan made of feathers (ha-uchiwa) that can whip up gales. Tengu are proud, quick to take offence, and masters of martial arts, illusion, and mischief. They punish the vain — especially arrogant Buddhist priests — by carrying them off, tying them to treetops, or driving them mad ("tengu-gaeshi," being "spirited away"), and they were blamed for children who went missing in the woods. But they can also be teachers: the famous legend of the boy Ushiwaka-maru (later the warrior Minamoto no Yoshitsune) has him trained in swordsmanship at night on Mount Kurama by Sōjōbō, the great king of the tengu. The Japanese phrase "tengu ni naru" ("to become a tengu") means to become boastful and stuck-up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jp-yokai-and-hyakki-yagyo',
    title: 'What a Yōkai Is, and the Night Parade of a Hundred Demons',
    category: 'Mythology',
    keywords: [
      'what is a yokai and what are some common types and the night parade of one hundred demons nurarihyon',
      'yokai bewitching apparition is the umbrella term for japans folkloric supernatural beings bestial monsters kappa tengu shapeshifting animals kitsune tanuki ghosts yurei transformed objects tsukumogami and strange phenomena',
      'toriyama sekien catalogued hundreds in the edo period shigeru mizuki revived them in the 20th century the hyakki yagyo night parade of a hundred demons is a procession of yokai through the streets at night to see it meant death',
      'nurarihyon an old man with an elongated gourd shaped bald head in a fine robe who slips into a house and acts as if he owns it modern pop culture calls him the supreme commander of yokai',
    ],
    content: `"Yōkai" (roughly "bewitching apparition") is the broad Japanese term for the whole world of folkloric supernatural beings. It covers bestial monsters (kappa, tengu, the one-eyed hitotsume-kozō), shapeshifting animals (kitsune, tanuki, mujina), spirits of strange places and weather, ghosts of the dead (yūrei, sometimes counted apart), and "tsukumogami," ordinary objects that come alive with age. Many yōkai are bound to a particular place, hour, or condition. The Edo-period artist Toriyama Sekien systematically catalogued and illustrated hundreds of them in encyclopedic picture-books, and in the 20th century the manga artist Shigeru Mizuki ("GeGeGe no Kitarō") brought them back into popular culture, where they now fill anime, games, and children's media. The classic collective image is the HYAKKI YAGYŌ, the "Night Parade of a Hundred Demons": a rowdy, torch-lit procession of every kind of yōkai — oni, animated umbrellas and lanterns, animal-spirits — marching through the streets of the old capital on certain summer nights. A human who saw the parade, or was simply caught outdoors while it passed, was said to die or be carried off, unless protected by a sacred sutra; it vanishes at first light. NURARIHYON is a yōkai often shown at the head of the parade — a small old man with a huge, smooth, elongated bald head shaped like a gourd, wearing an elegant priest's robe. In the folk tale he slips unnoticed into a busy household in the evening, sits down, helps himself to the family's tea and food, and behaves like the master of the house — and because everyone who glances at him assumes someone so dignified must be the head of the family, no one ever throws him out. His modern reputation as "supreme commander of all yōkai" comes from 20th- and 21st-century manga and anime, not old folklore.`,
    createdAt: Date.now(),
  },
];
