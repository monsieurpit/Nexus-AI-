import { KnowledgeItem } from '../../types';

// Batch 122 (Chinese mythology) — almost entirely absent. Errors and web dumps
// on nexus-4b: "Sun Wukong" said he "sprang from chaos alongside Pangu,
// splitting the universe" (he hatches from a stone egg long after creation);
// "Dragon King" was answered about Dragon Ball (Shenron, King Piccolo, Whis);
// "Houyi" was answered as Aztec myth ("five suns and jaguars... never heard of
// Houyi"); "Guanyin" and "Nuwa" and "Chang'e" and "Eight Immortals" and
// "Cowherd and Weaver Girl" and "Yanluo" and "Xiwangmu" were web dumps or flat
// non-answers ("the solar system has eight..."); "Guan Yu" said he was
// "originally a humble officer named Liu Bei" (a different person).
export const CHINESE_MYTHOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-cn-nuwa',
    title: 'Nüwa and How She Created Humans',
    category: 'Mythology',
    keywords: [
      'who is nuwa and how did she create humans', 'nuwa a mother goddess often with a serpent or dragon lower body sometimes paired with her brother husband fuxi',
      'lonely in the newly made world she moulded the first people from yellow clay by hand these became the nobles tiring of the slow work she dragged a rope through the mud and flicked the drops which became the common people',
      'nuwa also repaired the sky after the water god gonggong smashed a heavenly pillar mount buzhou she smelted five colored stones to patch the hole and cut the legs off a giant turtle to prop up the four corners',
    ],
    content: `Nüwa is a great mother goddess of Chinese mythology, usually depicted as a woman from the waist up and a serpent or dragon from the waist down, and often paired with her brother-and-husband Fuxi (shown with their tails intertwined). Her two most famous deeds: CREATING HUMANITY — alone in the freshly made world and lonely, she knelt by a river and moulded the first people one by one out of yellow clay with her hands; these carefully made ones became the aristocrats. Growing tired, she dipped a length of rope or vine into the mud and whipped it around so the flying droplets became people too; these became the common folk. And REPAIRING THE SKY — when the water god Gonggong, defeated in a fight, rammed his head against Mount Buzhou, one of the pillars holding up the heavens, the sky cracked open, fire and flood poured through, and beasts ravaged the people. Nüwa smelted stones of five colours and used the molten mixture to patch the hole in the sky, then killed a giant turtle and used its four legs as new props to hold up the corners of the world, restoring order.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-sun-wukong',
    title: 'Who Sun Wukong the Monkey King Is',
    category: 'Mythology',
    keywords: [
      'who is sun wukong the monkey king', 'born from a magic stone egg on flower fruit mountain long after the world was made not alongside pangu at creation',
      'learns taoist magic 72 transformations the cloud somersault 108000 li per leap takes the as you wish gold banded cudgel from the dragon kings undersea palace erases his name from the book of death',
      'declares himself great sage equal to heaven wreaks havoc in heaven eats the peaches of immortality only the buddha subdues him trapping him under a mountain for 500 years then released to escort the monk xuanzang to india restrained by a golden headband',
    ],
    content: `Sun Wukong, the Monkey King, is the central figure of the novel Journey to the West. He is NOT present at the creation of the universe and has nothing to do with Pangu — he is born, long after the world exists, from a stone egg on top of Flower-Fruit Mountain, formed over ages by the energies of heaven and earth. He becomes king of the monkeys, then seeks out a Taoist master and learns supernatural powers: the "72 transformations," a cloud-somersault that carries him 108,000 li in one leap, and immortality techniques. He bullies the Dragon King of the Eastern Sea into giving him the "As-You-Wish Gold-Banded Cudgel" (a pillar that shrinks to a needle behind his ear or grows to any size), and he storms the underworld to strike his name and all monkeys' names out of the Book of Death. Given a minor post in Heaven and insulted by it, he rebels, names himself "Great Sage Equal to Heaven," steals and eats the Queen Mother's peaches of immortality and Laozi's elixir, and fights off Heaven's armies. Only the Buddha can subdue him, trapping him under the Five-Element Mountain for 500 years. He is released to become the disciple and protector of the monk Xuanzang on the pilgrimage west, kept in line by a golden headband the Bodhisattva Guanyin locks on his head, which tightens agonizingly when the monk chants a spell.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-journey-to-the-west',
    title: 'The Story of Journey to the West',
    category: 'Mythology',
    keywords: [
      'what is the story of journey to the west', 'one of the four great classical novels of chinese literature attributed to wu chengen about 1592 a fictionalised account of the real 7th century monk xuanzang pilgrimage to india to retrieve buddhist scriptures',
      'guanyin arranges for xuanzang tripitaka to be protected by three disciples doing penance sun wukong the monkey king zhu bajie pigsy a lustful gluttonous pig man and sha wujing sandy a former heavenly general plus a dragon prince who becomes his horse',
      'over 81 tribulations they travel west fighting demons who want to eat xuanzangs flesh for immortality and finally reach the buddha obtain the scriptures and are rewarded with buddhahood',
    ],
    content: `Journey to the West (Xiyouji) is one of the Four Great Classical Novels of Chinese literature, written in the 16th century and traditionally attributed to Wu Cheng'en (~1592). It is a fantastical retelling of a true event: the 7th-century Tang-dynasty monk Xuanzang's real seventeen-year overland journey to India to bring back authentic Buddhist scriptures ("sutras"). In the novel, the Bodhisattva Guanyin arranges for the monk Xuanzang (also called Tripitaka) to be guarded on the road by three disciples, each a powerful being working off the sins of a past life: Sun Wukong the Monkey King; Zhu Bajie ("Pigsy"), a lazy, gluttonous, lustful pig-headed man; and Sha Wujing ("Sandy"), a subdued river-ogre and former heavenly general. A repentant dragon prince is transformed into the white horse Xuanzang rides. The four (five) travel westward through 81 ordeals, most involving demons and monsters — many of them escaped celestial pets or servants — who want to capture and eat Xuanzang because eating the flesh of so holy a monk grants immortality. They finally reach the Buddha's mountain, receive the scriptures, carry them back to China, and are all elevated to buddhahood or sainthood. The book blends Buddhist allegory, Taoist cosmology, folk demonology, satire of officialdom, and slapstick comedy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-yin-yang',
    title: 'What Yin and Yang Are',
    category: 'Mythology',
    keywords: [
      'what is yin and yang', 'the concept that reality is made of two complementary interdependent and constantly transforming forces yin dark cold passive feminine night moon earth receptive inward yang light warm active masculine day sun heaven assertive outward',
      'neither is good or bad and neither exists without the other each contains a seed of the other the dot in each half of the taijitu symbol they wax and wane cyclically as day becomes night',
      'health harmony and the dao are a dynamic balance underlies chinese medicine martial arts cuisine feng shui and the i ching not the same as wu wei',
    ],
    content: `Yin and yang is the core Chinese idea that everything in the universe arises from and is described by two opposite but complementary aspects that depend on each other and continually transform into each other. YIN is the shady side: dark, cold, still, yielding, receptive, downward and inward, associated with night, the moon, water, earth, and the feminine. YANG is the sunny side: bright, warm, active, assertive, upward and outward, associated with day, the sun, fire, heaven, and the masculine. Crucially, neither is "good" or "bad," neither can exist without the other (there is no shadow without light), each contains the seed of its opposite (shown as the small dot of the other colour in each half of the taijitu symbol), and they are never static — as day peaks it begins turning to night, as cold deepens it begins turning to warmth. Harmony, health, and the natural way (the Dao) are a dynamic balance between them, not the elimination of one. This framework underpins traditional Chinese medicine (illness is an imbalance of yin and yang, or of hot and cold), martial arts, cooking, feng shui, and the divination system of the I Ching. (Yin-yang is the underlying dualism; "wu wei," effortless non-forcing action, is a separate Taoist principle.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-kitchen-god',
    title: 'Who the Kitchen God (Zao Jun) Is',
    category: 'Mythology',
    keywords: [
      'who is the kitchen god and why is he important', 'zao jun stove master the most important chinese domestic god whose paper image is pasted above the kitchen stove',
      'he watches the household all year and about a week before chinese new year ascends to heaven to report to the jade emperor on the familys conduct good behaviour earns blessings bad behaviour a shortened lifespan',
      'on the day he departs the family smears his paper lips with honey or sticky sweets so he speaks only sweet words then burns the old image and pastes a fresh one on new years eve when he returns',
    ],
    content: `The Kitchen God, Zao Jun ("Stove Master") or Zao Shen, is the most important of the household gods in Chinese folk religion. A simple paper print of him (often with his wife) is pasted on the wall above the family cooking stove. He is a domestic spy for Heaven: he observes everything the family does and says all year long, and then, about a week before Chinese New Year (the 23rd or 24th day of the twelfth lunar month), he ascends to Heaven to deliver an annual report on the household's conduct to the Jade Emperor, who rewards good families with blessings and prosperity and punishes bad ones with misfortune or a shortened lifespan. So on the evening he leaves, the family holds a farewell ritual: they offer him sweet, sticky foods and smear honey or malt sugar or sticky rice on the lips of his paper image — either so he will report only "sweet" things, or so his mouth is literally stuck shut and he cannot tattle. They then take down the old image and burn it, sending him up to Heaven in the smoke, and paste up a brand-new one on New Year's Eve to welcome him back for the coming year. Various legends explain his origin, usually involving a man who mistreated his faithful wife, felt shame, and threw himself into the hearth fire.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-change',
    title: "Chang'e the Moon Goddess and Her Story",
    category: 'Mythology',
    keywords: [
      'who is change the moon goddess and what is her story', 'change is the goddess who lives on the moon her husband was houyi the archer',
      'after houyi shot down nine of the ten suns he was given an elixir of immortality enough for one person change drank it to keep it from a thief or out of temptation or because houyi was becoming a tyrant and floated up to the moon',
      'on the moon she lives with only a jade rabbit who pounds the elixir of immortality with a mortar and pestle the mid autumn festival with mooncakes honours her not the chinese lunar space program',
    ],
    content: `Chang'e is the goddess who lives alone on the Moon. In the best-known version of the myth, her husband was the divine archer Houyi. After Houyi saved the world by shooting down nine of the ten suns that were scorching the earth, he was rewarded with a pill or bottle of the elixir of immortality — but only enough for one person to ascend to Heaven, or enough to make two people immortal without ascending, and Houyi wanted to stay on earth with Chang'e. He hid the elixir at home. While he was away, either a treacherous apprentice broke in and tried to force Chang'e to hand it over, and to keep it from him she swallowed it herself; or (in gentler versions) she took it out of curiosity or temptation; or (in darker ones) Houyi had become a cruel tyrant and she drank it to stop him living forever. Either way she immediately became weightless and floated up, choosing the Moon so she could stay near her husband. There she lives with only a jade rabbit for company, which endlessly pounds herbs with a mortar and pestle to make more elixir, and in some tellings the woodcutter Wu Gang, condemned to chop forever at a self-healing cassia tree. The Mid-Autumn Festival (the Moon Festival), when families gaze at the full moon and eat round mooncakes, honours her. (China's robotic lunar missions are named "Chang'e" after this goddess.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-eight-immortals',
    title: 'Who the Eight Immortals Are',
    category: 'Mythology',
    keywords: [
      'who are the eight immortals ba xian', 'a group of eight legendary taoist immortals xian who each attained immortality and travel together each carrying a distinctive magical object',
      'lu dongbin the leader a scholar with a demon slaying sword li tieguai iron crutch li a lame beggar with an iron crutch and a medicine gourd zhongli quan a fat man with a reviving fan zhang guolao an old man riding a donkey backwards',
      'han xiangzi a flute playing youth cao guojiu a nobleman with jade castanets lan caihe androgynous with a flower basket he xiangu the only woman with a lotus they represent male female old young rich poor noble humble the eight immortals cross the sea',
    ],
    content: `The Eight Immortals (Ba Xian) are a band of eight xian — transcendent beings who achieved immortality through Taoist cultivation — who wander the world together, usually depicted crossing the sea or feasting. Each carries an emblematic magical object, and together their objects are said to be able to bring the dead to life. They are: LÜ DONGBIN, the informal leader, a scholar carrying a demon-slaying sword and a fly-whisk; LI TIEGUAI ("Iron-Crutch Li"), an irascible lame beggar with an iron crutch and a gourd of medicine; ZHONGLI QUAN, a jolly fat man with a fan that revives the dead and turns stones to gold; ZHANG GUOLAO, an ancient man who rides a white donkey (often backwards) that he folds up like paper when not needed; HAN XIANGZI, a gentle youth who plays a magic flute that makes things grow; CAO GUOJIU, a nobleman in court dress with a jade tablet or castanets; LAN CAIHE, an androgynous wandering figure with a flower basket; and HE XIANGU, the only woman, carrying a lotus flower. Between them they embody every kind of person — male and female, old and young, rich and poor, noble and lowly — which is why they represent good fortune for all. The tale "The Eight Immortals Cross the Sea," in which each uses their own object to cross rather than share a boat, is the source of the Chinese saying meaning "each shows what they can do."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-cowherd-weaver',
    title: 'The Cowherd and the Weaver Girl (and the Qixi Festival)',
    category: 'Mythology',
    keywords: [
      'what is the story of the cowherd and the weaver girl and qixi', 'niulang the cowherd star altair a poor mortal orphan zhinu the weaver girl star vega a heavenly goddess who weaves the clouds granddaughter of the queen mother',
      'she comes to earth to bathe niulang takes her robe on his oxs advice they marry and have two children heaven discovers the goddess married a mortal and the queen mother scratches the milky way across the sky to separate them',
      'moved by their grief she lets them meet once a year on the 7th day of the 7th lunar month when a flock of magpies forms a bridge across the river that day is qixi chinese valentines day',
    ],
    content: `Niulang, the cowherd, is a poor mortal orphan mistreated by his brother and sister-in-law, left with only an old ox — which is secretly a banished god. Zhinü, the weaver girl, is a heavenly goddess, a daughter or granddaughter of the Jade Emperor and the Queen Mother of the West, whose job is to weave the clouds and the rosy dawn. One day Zhinü and her sisters come down to bathe in a river; on the talking ox's advice, Niulang hides Zhinü's clothes so she cannot fly back to Heaven. They fall in love, marry, and have a son and a daughter, living happily as farmer and weaver. But when Heaven discovers a goddess has married a mortal, the Queen Mother comes down and drags Zhinü back to the sky. Niulang, with the ox's hide now letting him fly, chases after her carrying the two children in baskets on a shoulder-pole — but the Queen Mother pulls out her hairpin and scratches a wide, uncrossable river across the heavens between them (the Milky Way). Moved by their weeping (and by the children), she relents just enough to allow the family to reunite once each year: on the seventh night of the seventh lunar month, all the magpies in the world fly up and link wings to form a bridge across the river of stars, and the cowherd (the star Altair) and the weaver (the star Vega) meet on it for one night. That day is the Qixi Festival, often called "Chinese Valentine's Day."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-guanyin',
    title: 'Who Guanyin, the Goddess of Mercy, Is',
    category: 'Mythology',
    keywords: [
      'who is guanyin the goddess of mercy', 'guanyin short for guanshiyin one who perceives the sounds or cries of the world the bodhisattva of compassion and mercy the most beloved deity in chinese popular religion',
      'originally the male indian bodhisattva avalokiteshvara guanyin came to be depicted as female in china from the tang and song dynasties a serene woman in white robes holding a vase of pure water and a willow branch sometimes with a thousand arms and eyes',
      'she hears every prayer rescues people from danger fire water demons execution grants children and guides souls she appears in journey to the west associated with mount putuo not tieguanyin tea',
    ],
    content: `Guanyin (a shortening of Guanshiyin, "the one who perceives the sounds/cries of the world") is the bodhisattva of compassion and mercy, and by far the most widely loved figure in Chinese popular religion. Guanyin derives from the Indian bodhisattva Avalokiteshvara, who was originally male; over the Tang and Song dynasties the Chinese form came to be portrayed as a woman — usually a calm, gentle figure in flowing white robes, holding a small vase of pure water and a willow branch (used to sprinkle the nectar of compassion), sometimes seated on a lotus, sometimes shown with a thousand arms each with an eye in the palm, so she can see and reach out to every suffering being at once. Devotees believe she hears every sincere plea and comes to the rescue from any of the "perils" — fire, drowning, demons, bandits, wrongful execution, childlessness — and that she guides the dying to the Pure Land. She is the compassionate mover behind the plot of Journey to the West, and her main sacred site is Mount Putuo, an island off Zhejiang. (Tieguanyin, "Iron Guanyin," is a famous oolong tea named after her, but is a separate thing.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-zodiac-great-race',
    title: 'The Chinese Zodiac and the Story of the Great Race',
    category: 'Mythology',
    keywords: [
      'what is the chinese zodiac and the story of the great race', 'a 12 year cycle of animal signs rat ox tiger rabbit dragon snake horse goat monkey rooster dog pig the jade emperor held a race across a river to decide the order',
      'the rat could not swim well so it rode on the oxs back then leaped off just before the far bank to finish first so rat is year 1 and ox year 2', 'tiger third rabbit fourth dragon fifth because it stopped to make rain snake sixth horse seventh goat monkey rooster shared a raft eighth ninth tenth dog eleventh stopped to bathe pig last stopped to eat and nap',
      'the cat tricked by the rat missed the race and got no year the origin of cats hating rats',
    ],
    content: `The Chinese zodiac (shengxiao) assigns each year one of twelve animal signs in a repeating 12-year cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat (Sheep), Monkey, Rooster, Dog, Pig. The order comes from the legend of the Great Race. The Jade Emperor announced a race across a wide river; the first twelve animals to cross would each be given a year, in the order they finished. The Rat and the Cat, both poor swimmers and friends, planned to ride across on the strong Ox's back. The Ox agreed and set off with both on his head. Near the far bank, the Rat shoved the Cat into the water and, just as the Ox was about to touch land, leaped off his head and scampered across the finish line FIRST — so the Rat is the first sign and the Ox, robbed of first place, is second. The Tiger struggled in against the current for third; the Rabbit hopped across on stepping stones and a floating log for fourth; the Dragon came fifth, explaining it had stopped to bring rain to a drought-stricken village and to blow the Rabbit's log to shore. The Snake, hidden on the Horse's hoof, slid off and startled it at the line, taking sixth and pushing the Horse to seventh. The Goat, Monkey, and Rooster crossed together on a raft they built and cooperated to steer, taking eighth, ninth, and tenth. The Dog, though a fine swimmer, had stopped to play and bathe and came eleventh, and the Pig, having paused to eat and nap, came in last. The Cat never finished, and never got a year — which is why cats have hated rats ever since.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-dragon-king',
    title: 'Who the Dragon Kings Are and What They Rule',
    category: 'Mythology',
    keywords: [
      'who is the dragon king and what does he rule', 'the dragon kings longwang are the divine rulers of water the seas rivers lakes and rain there are four principal ones the dragon kings of the four seas east south west north the greatest being ao guang of the eastern sea',
      'each lives in an opulent crystal palace beneath the waves commands an army of aquatic creatures shrimp soldiers crab generals and is responsible for bringing rain to his region', 'farmers prayed to them in droughts a dragon king who failed to deliver rain could be punished by the jade emperor',
      'in journey to the west sun wukong bullies ao guang into giving him his magic cudgel in nezhas story nezha kills the dragon kings son not dragon ball',
    ],
    content: `The Dragon Kings (Longwang) are the dragon-gods who rule over all water — the oceans, rivers, lakes, wells, and, above all, rainfall. The most important are the four Dragon Kings of the Four Seas, one for each cardinal direction (East, South, West, North), the senior being Ao Guang, Dragon King of the Eastern Sea. Each lives in a magnificent palace of crystal, coral, and pearl on the sea floor, holds court over an army of sea creatures (shrimp soldiers, crab generals, fish ministers, turtle scribes), and is charged by Heaven with delivering the right amount of rain to the lands under his sea. In times of drought, farmers, officials, and emperors prayed and made offerings at Dragon King temples, and a Dragon King who withheld rain or caused floods could be reported to and punished by the Jade Emperor. They feature in many myths: in Journey to the West, Sun Wukong barges into Ao Guang's undersea palace and bullies him out of the magic iron cudgel; in the legend of the child-god Nezha, Nezha kills the Third Prince, son of a Dragon King, sparking a feud. (They have nothing to do with Shenron or any character in Dragon Ball, which merely borrows the wish-granting-dragon idea.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-qi',
    title: 'What Qi (Chi) Is in Chinese Thought',
    category: 'Mythology',
    keywords: [
      'what is qi or chi in chinese thought', 'qi the fundamental vital energy or breath that constitutes and animates everything in the universe in chinese philosophy and medicine',
      'it flows through the body along channels called meridians jingluo traditional chinese medicine aims to keep it flowing smoothly and in balance with yin yang and the five phases', 'practices to cultivate it qigong tai chi breathing diet acupuncture and moxibustion unblocking meridian points',
      'in neo confucian philosophy qi is the material stuff of the world paired with li principle the japanese ki and korean gi are the same concept',
    ],
    content: `Qi (氣, also romanized "chi" or "ch'i") is the concept of a fundamental vital energy or "breath" that makes up and animates everything in the universe — the same force that flows in a person, in the wind, in a landscape, and in the cosmos as a whole. In Chinese medicine, qi circulates through the body along a network of channels called meridians (jingluo), and health is a matter of having enough of it, moving freely, in the right places, and balanced with yin and yang and the five phases (wood, fire, earth, metal, water). Stagnant, deficient, or blocked qi causes illness. Practices to build and regulate it include qigong and tai chi (slow coordinated movement with breath), meditation, breathing exercises, appropriate diet, and acupuncture and moxibustion (needling or warming specific points to clear blockages). In classical and Neo-Confucian philosophy, qi is the concrete material "stuff" out of which things are made, paired with "li," the underlying pattern or principle that shapes it. The Japanese "ki" (as in aikido, reiki) and the Korean "gi" are the same idea borrowed into those cultures.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-yu-the-great',
    title: 'Yu the Great and How He Tamed the Floods',
    category: 'Mythology',
    keywords: [
      'who is yu the great and how did he tame the floods', 'yu da yu the legendary founder of the xia dynasty chinas first celebrated for ending the great flood',
      'his father gun tried to stop the floods by building dams and dikes to block the water and failed and was executed yu took the opposite approach dredging and channeling the rivers to guide the water to the sea',
      'he worked for 13 years so dedicated that he passed his own house three times without going in once hearing his newborn son cry a confucian model of the selfless hardworking ruler',
    ],
    content: `Yu the Great (Da Yu) is the legendary founder of the Xia dynasty, traditionally China's first dynasty (~2070 BC), and its semi-mythical hero. He is remembered above all for ending the Great Flood that had devastated China for generations. His father, Gun, had been tasked with the problem first and tried to solve it by force — building ever-higher dams and dikes to hold the floodwaters back — and after nine years of failure he was put to death. Yu learned from this and did the reverse: instead of blocking the water, he organized enormous public works to dredge the riverbeds and dig channels and canals that would GUIDE the water safely down to the sea. He laboured at this for thirteen years, travelling the whole land, and was so devoted to the task that he passed by the door of his own house three times without going in — the third time hearing his newborn son crying inside, and still not stopping. His success and selflessness led Emperor Shun to name him as successor, and he became the model in Confucian tradition of the diligent, self-sacrificing ruler who serves the people. "Passing his house three times without entering" is a common Chinese idiom for total dedication to duty.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-houyi',
    title: 'Houyi, the Archer Who Shot Down the Suns',
    category: 'Mythology',
    keywords: [
      'who is houyi the archer who shot down the suns', 'houyi hou yi the divine archer of chinese myth in the age of emperor yao the ten suns children of the god dijun who normally crossed the sky one at a time all rose together',
      'scorching the earth drying the rivers and burning the crops houyi was sent with his bow and shot down nine of the ten suns one by one each falling to earth as a three legged crow leaving one to light the world',
      'as a reward he received the elixir of immortality which his wife change took flying to the moon this is chinese myth not aztec',
    ],
    content: `Houyi (Hou Yi) is the great archer of Chinese mythology. In the reign of the sage-emperor Yao, disaster struck: the ten suns — children of the sky god Dijun and the goddess Xihe, who were supposed to travel across the sky one at a time so there was one day at a time — all rose into the heavens together. Their combined heat scorched the fields to dust, dried up the rivers and lakes, melted rocks, and drove monsters out of the parched wilds; the crops died and people were starving. Houyi was sent down (or came) to save the world. Standing on the earth with his great bow, he shot the suns out of the sky one by one — nine arrows, nine suns, each falling to the ground as a dead three-legged crow (the bird that was said to carry each sun) — and was stopped from shooting the tenth so that the world would still have light and warmth. He also killed several of the monsters. For saving humanity he was rewarded with the elixir of immortality, which his wife Chang'e ended up taking, floating away to become the goddess of the Moon. (This is Chinese mythology; the story of multiple suns destroyed in successive world-ages, with jaguars, belongs to Aztec myth and is unrelated.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-four-symbols',
    title: 'The Four Symbols (Azure Dragon, Vermilion Bird, White Tiger, Black Tortoise)',
    category: 'Mythology',
    keywords: [
      'who are the four symbols the azure dragon vermilion bird white tiger black tortoise', 'the si xiang four mythological creatures each representing a compass direction a season and an element color and a quadrant of the night sky containing seven of the 28 chinese lunar mansions constellations',
      'azure dragon qinglong east spring wood vermilion bird zhuque south summer fire white tiger baihu west autumn metal black tortoise xuanwu depicted as a turtle entwined with a snake north winter water',
      'a fifth the yellow dragon of the center is sometimes added they appear on tomb walls city gates banners and in feng shui site orientation',
    ],
    content: `The Four Symbols (Si Xiang) are four mythological guardian creatures, each tied to a compass direction, a season, one of the five phases, and a colour — and, importantly, to a quarter of the night sky. The ancient Chinese divided the stars near the celestial equator into 28 "lunar mansions," and grouped them into four constellation-quadrants, one per direction, each imagined as one of these beasts. AZURE DRAGON (Qinglong): East, spring, the phase Wood, the colour blue-green. VERMILION BIRD (Zhuque, a phoenix-like bird): South, summer, Fire, red. WHITE TIGER (Baihu): West, autumn, Metal, white. BLACK TORTOISE (Xuanwu, always shown as a tortoise with a snake coiled around it): North, winter, Water, black. A fifth figure, the Yellow Dragon of the Centre (Earth), is sometimes added. The Four Symbols appear painted on the walls of Han-dynasty tombs, carved on the four gates of walled cities, flown on army banners, and used in feng shui to orient a house or grave (ideally with a "black tortoise" hill behind, an "azure dragon" ridge on the left, a "white tiger" ridge on the right, and open ground with water — the "vermilion bird" — in front).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-jiangshi',
    title: 'What a Jiangshi (Chinese Hopping Vampire) Is',
    category: 'Mythology',
    keywords: [
      'what is a jiangshi the chinese hopping vampire', 'a jiangshi stiff corpse a reanimated corpse in chinese folklore and 1980s hong kong horror comedy films rigor mortis has set its limbs rigid so it moves by hopping with arms outstretched',
      'often dressed in a qing dynasty officials robe and hat it kills the living by draining their qi life force', 'origin folklore corpse driving transporting a body over a thousand li taoist priests marched bodies back to their home villages for burial with paper talismans',
      'countermeasures a yellow paper talisman on the forehead freezes it hold your breath it senses breathing mirrors black dog blood glutinous rice a peach wood sword',
    ],
    content: `A jiangshi ("stiff corpse") is a reanimated dead body in Chinese folklore. Because rigor mortis has locked its arms and legs straight, it cannot walk normally and instead advances in stiff little hops with its arms held out in front — hence the English nickname "hopping vampire." It is usually pictured in the robes and winged cap of a Qing-dynasty official, its face pale green or blotched, sometimes with a paper talisman stuck across its forehead. It preys on the living by sucking out their qi (life energy) rather than blood. The folklore is thought to have grown out of the real practice of "corpse driving" or "transporting a corpse over a thousand li": migrant workers who died far from home needed to be buried in their ancestral village, and stories told of Taoist priests who marched the bodies back overland at night, keeping them upright and moving in single file with control talismans. In the popular 1980s Hong Kong "mr. vampire" horror-comedy films, a jiangshi is stopped by sticking a yellow paper spell (written in chicken blood or cinnabar) on its forehead; because it is blind and hunts by sensing breath, you can hide by holding your breath; and it is repelled by mirrors, the blood of a black dog, uncooked glutinous (sticky) rice, a sword or tools made of peach wood, fire, and the sound of a bell.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-diyu-yanluo',
    title: 'Yanluo (Yama) and Diyu, the Chinese Underworld',
    category: 'Mythology',
    keywords: [
      'who is yanluo or yama the king of the underworld diyu', 'yanluo wang from sanskrit yama raja the god of death and chief judge of diyu the chinese underworld which is not eternal damnation but a purgatory like realm of ten courts each ruled by one of the ten yama kings and many levels of punishment chambers',
      'after death a soul is escorted by the ox headed and horse faced guards before the courts where its deeds are weighed and its sins are punished proportionally for a set time then it drinks meng po soup of forgetfulness and is sent back through reincarnation into one of six paths',
      'yanluo also keeps the register of every persons lifespan',
    ],
    content: `Yanluo Wang (a Chinese rendering of the Sanskrit "Yama Raja," borrowed with Buddhism) is the god of death and the chief magistrate of Diyu, the Chinese underworld. Diyu is not a place of permanent damnation like the Christian hell — it is closer to a vast bureaucratic purgatory. It is organized into (traditionally) ten "courts," each presided over by one of the Ten Kings of Hell, and each court oversees a set of graphically imagined punishment chambers — the "hell of grinding," the "hell of the tongue-pulling," the "hell of boiling oil," and so on. When a person dies, ox-headed and horse-faced guards (Niutou and Mama) escort the soul down. It is brought before the courts in turn; its whole life's deeds are read from the register and weighed on the "mirror of retribution," and it serves a fixed sentence in whichever chambers match its sins. When the sentence is complete, the soul is taken to the old woman Meng Po, who gives it a bowl of "soup of forgetfulness" that erases all memory of its past life and of the underworld, and it is sent across the Bridge of Helplessness back onto the wheel of reincarnation, to be reborn into one of six paths (as a god, human, animal, hungry ghost, and so on) according to its overall karma. Yanluo also keeps the ledger recording the exact allotted lifespan of every living person.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-guan-yu',
    title: 'Guan Yu, the Chinese God of War',
    category: 'Mythology',
    keywords: [
      'what is the story of the chinese god of war guan yu', 'a real general who died in 220 ad who served the warlord liu bei guan yu and liu bei are two different people guan yu was liu beis sworn brother and general not liu bei himself',
      'in romance of the three kingdoms he swears the oath of the peach garden brotherhood with liu bei and zhang fei famed for his loyalty he leaves the enemy cao cao to rejoin liu bei despite being treated generously',
      'progressively deified into guandi guan gong worshipped as a god of war but even more of loyalty brotherhood and righteousness venerated by soldiers police and businessmen red face green robe shrine in countless shops',
    ],
    content: `Guan Yu was a real military general who died in 220 AD, during the collapse of the Han dynasty and the Three Kingdoms period. He served the warlord Liu Bei — Guan Yu and Liu Bei are two DIFFERENT people; Guan Yu was Liu Bei's sworn brother and his most trusted general, not Liu Bei under another name. In the enormously popular novel "Romance of the Three Kingdoms," the three men Liu Bei, Guan Yu, and Zhang Fei swear the "Oath of the Peach Garden," pledging to live and die as brothers. Guan Yu becomes the model of the virtue of "yi" — loyalty and righteousness: captured by the rival warlord Cao Cao and showered with gifts, titles, and a fine horse, he serves honourably only until he learns where Liu Bei is, then returns everything and rides across the country to rejoin his brother. Over the following centuries Guan Yu was gradually deified, elevated by emperors and by popular devotion into a god known as Guandi ("Emperor Guan") or Guan Gong ("Lord Guan"). He is nominally a god of war, but he is worshipped far more widely as the god of loyalty, sworn brotherhood, righteousness, and protection — and, by extension, of good faith in business. His red-faced, long-bearded, green-robed image, holding his great curved polearm (the guandao), stands in police stations, in the shrines of martial-arts schools and secret societies, and on the counter of shops and restaurants across the Chinese world; in Hong Kong both the police and organized crime pray to him.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cn-xiwangmu',
    title: 'The Queen Mother of the West (Xiwangmu)',
    category: 'Mythology',
    keywords: [
      'who is the queen mother of the west xiwangmu', 'one of the oldest and highest goddesses in chinese religion in early myth a fearsome figure with tigers teeth and a leopards tail controlling plague and punishment',
      'by the han and later she became a beautiful benevolent goddess of immortality and the highest female deity ruling a paradise on the mythical mount kunlun', 'in her garden grow the peaches of immortality that ripen once every 3000 years she holds a great banquet for the gods when they ripen the banquet sun wukong crashes and ruins',
      'she grants immortality and the elixir she gave houyi his and is the leader of the female xian often paired with the king father of the east',
    ],
    content: `Xiwangmu, the "Queen Mother of the West," is one of the most ancient and important goddesses in Chinese religion, worshipped for well over two thousand years. In the earliest sources (Shang oracle bones, the "Classic of Mountains and Seas") she is a wild and terrifying being — a woman's form with a tiger's teeth, a leopard's tail, and matted hair, dwelling in a mountain cave, in charge of cosmic punishments, calamities, and plagues. By the Han dynasty and afterward she had been completely transformed into a majestic, beautiful, benevolent goddess: the supreme female deity, ruler of a paradise on the mythical Mount Kunlun in the far west, and the keeper of the secret of eternal life. Her palace garden holds the trees of the "peaches of immortality," which blossom once every three thousand years and take another three thousand to ripen; when they ripen she throws the "Peach Banquet" for all the gods and immortals (this is the feast that Sun Wukong gate-crashes and wrecks in Journey to the West). She bestows the elixir of immortality — she is the one who rewarded the archer Houyi with it — and she is the patron and leader of all the female xian (immortals). She is often paired with a male counterpart, the King Father of the East (Dongwanggong).`,
    createdAt: Date.now(),
  },
];
