import { KnowledgeItem } from '../../types';

// Batch 72 (world religions, deeper — batch 18 covered the basics). nexus-4b
// misses: "what is Christianity" answered only about the 1054 and 1517 schisms
// and never said what it is; "what is Taoism" treated "Taoism" and "Daoism" as
// two different things ("don't even get me started on casseurt trying to
// explain that"); "the Talmud", "a bar mitzvah", and "church/synagogue/mosque/
// temple" were raw web dumps, the last two cut off mid-sentence.
export const RELIGIONS_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-is-christianity',
    title: 'What Christianity Is',
    category: 'Religion',
    keywords: [
      'what is christianity', 'christian beliefs jesus', 'who do christians believe jesus is', 'resurrection salvation christianity',
      'trinity old new testament', 'largest religion in the world', 'catholic orthodox protestant branches',
    ],
    content: `Christianity is a monotheistic religion centred on the life, death and resurrection of Jesus of Nazareth, a Jewish teacher in first-century Roman Palestine whom Christians believe to be the Son of God and the Messiah (Christ) foretold in Jewish scripture. Core beliefs: there is one God existing as three persons (the Trinity — Father, Son and Holy Spirit); Jesus was crucified, died, and rose from the dead, and his sacrifice reconciles humanity to God and offers eternal life to those who have faith in him; he will return. The scripture is the Bible — the Old Testament (largely shared with Judaism) and the New Testament (the four Gospels, the letters of Paul and others, and Revelation). Central practices include baptism, communion (the Eucharist), prayer and worship on Sunday. With about 2.4 billion adherents it is the world's largest religion, divided into three broad families: Roman Catholicism (led by the Pope), Eastern Orthodoxy, and Protestantism (itself thousands of denominations stemming from the 16th-century Reformation).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-taoism',
    title: 'What Taoism (Daoism) Is',
    category: 'Religion',
    keywords: [
      'what is taoism', 'what is daoism', 'is taoism and daoism the same thing', 'the tao the way', 'wu wei effortless action',
      'tao te ching laozi', 'yin yang taoism', 'philosophical vs religious taoism',
    ],
    content: `Taoism (also spelled Daoism — the two spellings are the SAME word, from different systems for writing Chinese in the Roman alphabet) is a Chinese philosophical and religious tradition. Its central idea is the "Tao" ("the Way"): the natural, underlying order and source of the universe, which cannot be fully named or grasped, only lived in accordance with. Key principles: "wu wei," usually translated "effortless action" or "non-forcing" — acting in harmony with the natural flow rather than struggling against it, like water finding its way downhill; simplicity, spontaneity, humility, and balance between complementary opposites (yin and yang). The foundational text is the Tao Te Ching, traditionally attributed to Laozi (around the 6th century BCE); the Zhuangzi is the other classic. Over time a "religious Taoism" developed alongside the philosophy, with a pantheon of gods (headed by the Jade Emperor), temples, priests, rituals, and practices aimed at health and longevity or immortality. Taoism deeply shaped Chinese medicine, martial arts, painting and poetry, and interacted with Confucianism and Buddhism.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-the-talmud',
    title: 'What the Talmud Is',
    category: 'Religion',
    keywords: [
      'what is the talmud', 'mishnah and gemara', 'oral torah written torah', 'babylonian vs jerusalem talmud',
      'rabbinic judaism central text', 'how is the talmud studied', 'is the talmud the same as the torah',
    ],
    content: `The Talmud is the central text of Rabbinic Judaism, ranking second in authority only to the Hebrew Bible. It is not the Torah (the first five books of the Bible) — it is a vast record of centuries of rabbinic discussion, debate, legal reasoning, ethics, stories and lore built around Jewish law. It has two layers: the MISHNAH, a concise written code of the "Oral Torah" compiled around 200 CE by Rabbi Judah the Prince; and the GEMARA, generations of rabbis' analysis, argument and expansion of the Mishnah, recorded over the following centuries. There are two versions: the BABYLONIAN Talmud (completed around 500 CE, far longer and the one usually meant by "the Talmud"), and the earlier JERUSALEM (Palestinian) Talmud, from the land of Israel. The Talmud is studied in a distinctive dialectical style — often in pairs (chavruta) — that follows the arguments rather than just the conclusions, and it remains the core curriculum of traditional Jewish learning.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-bar-mitzvah',
    title: 'What a Bar Mitzvah Is',
    category: 'Religion',
    keywords: [
      'what is a bar mitzvah', 'what is a bat mitzvah', 'jewish coming of age 13', 'called to the torah bar mitzvah',
      'bar mitzvah meaning son of the commandment', 'difference bar mitzvah bat mitzvah', 'do you have to have a party',
    ],
    content: `"Bar mitzvah" is Hebrew/Aramaic for "son of the commandment"; "bat mitzvah" ("daughter of the commandment") is the term for girls. It marks the point at which a Jewish young person — 13 for boys, 12 or 13 for girls depending on the community — becomes religiously an adult, personally responsible for keeping the commandments (mitzvot), able to be counted in a prayer quorum (minyan), and able to be called up to read from the Torah. Strictly, a person automatically "becomes" bar or bat mitzvah on reaching that age; the word refers to the status, not a ceremony. In practice it is marked by the young person being called to the Torah in synagogue for the first time — chanting a blessing, a Torah portion and often the week's prophetic reading (haftarah), and giving a short teaching (d'var Torah) — usually followed by a family celebration. Orthodox, Conservative, Reform and Reconstructionist communities differ in how fully girls participate and in the details.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-house-of-worship-types',
    title: 'Church vs Synagogue vs Mosque vs Temple',
    category: 'Religion',
    keywords: [
      'what is the difference between a church synagogue mosque and temple', 'christian jewish muslim house of worship',
      'what is a mosque mihrab minaret', 'what is a synagogue ark torah', 'is a temple hindu or buddhist', 'gurdwara mandir',
    ],
    content: `A CHURCH is a Christian house of worship (larger or higher-status ones may be called a cathedral, basilica, chapel or minster); the focus is usually an altar, and services centre on scripture, prayer, song and communion. A SYNAGOGUE is a Jewish house of worship and study (also called a "shul," or a "temple" in Reform Judaism); it faces toward Jerusalem and its focus is the "ark," a cabinet holding the Torah scrolls. A MOSQUE (Arabic "masjid") is an Islamic house of worship; it has a "mihrab," a niche in the wall showing the direction of Mecca that worshippers face, an open carpeted floor for lined-up communal prayer, often a minaret (tower for the call to prayer), and no images of God, people or animals. "TEMPLE" is the general word for a house of worship in many traditions: Hindu temples (also "mandir") house images of deities; Buddhist temples hold shrines and often relics; Sikh houses of worship are specifically called gurdwaras; and the word also covers ancient Greek, Roman and Egyptian temples and Latter-day Saint (Mormon) temples. Ancient Judaism had one central Temple in Jerusalem, destroyed in 70 CE, after which synagogues became the norm.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-buddhism-core',
    title: 'What Buddhism Teaches',
    category: 'Religion',
    keywords: [
      'what is buddhism', 'buddhism core teachings', 'four noble truths eightfold path', 'nirvana samsara buddhism',
      'does buddhism have a god', 'anatta anicca impermanence no-self', 'theravada mahayana vajrayana',
    ],
    content: `Buddhism is a religion and philosophy founded in northern India around the 5th century BCE by Siddhartha Gautama, called the Buddha ("the awakened one") after his enlightenment. Its core diagnosis is the Four Noble Truths: life involves suffering and dissatisfaction (dukkha); this is caused by craving and attachment; it can end; and the way to end it is the Noble Eightfold Path (right view, intention, speech, action, livelihood, effort, mindfulness and concentration). The goal is nirvana — the extinguishing of craving and the escape from samsara, the cycle of rebirth driven by karma. Buddhism has no creator god. Other central ideas: anicca (everything is impermanent), anatta (there is no permanent, unchanging self), and dependent origination (everything arises from causes and conditions). Meditation and ethical conduct are the main practices. The three great branches are Theravada (Sri Lanka and Southeast Asia, closest to the earliest texts), Mahayana (East Asia, emphasising the bodhisattva who delays nirvana to help others), and Vajrayana (Tibet, using tantra and ritual).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-hinduism-core',
    title: 'What Hinduism Teaches',
    category: 'Religion',
    keywords: [
      'what is hinduism', 'hinduism core beliefs', 'brahman atman moksha', 'is hinduism polytheistic or monotheistic',
      'vedas upanishads bhagavad gita', 'dharma karma samsara hinduism', 'vishnu shiva devi',
    ],
    content: `Hinduism is the world's oldest major living religion and its third largest (about 1.2 billion people, mostly in India and Nepal). It has no single founder, no single founding date, and no single scripture or creed — it is a family of traditions that developed over more than three thousand years. Common threads: Brahman, the one ultimate reality or divine ground of everything; atman, the innermost self or soul, which many schools hold to be identical with Brahman; samsara, the cycle of birth, death and rebirth; karma, the moral law by which actions shape future lives; dharma, one's duty and righteous conduct; and moksha, liberation from the cycle, the ultimate goal. Hindus may worship one deity, several, or none as a personal focus — major figures include Vishnu (and his avatars such as Rama and Krishna), Shiva, and the Goddess (Devi) — and many understand these as forms of the one Brahman. Key texts include the Vedas and Upanishads, and the epics the Ramayana and Mahabharata (which contains the Bhagavad Gita).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-zen-buddhism',
    title: 'What Zen Buddhism Is',
    category: 'Religion',
    keywords: [
      'what is zen buddhism', 'zazen just sitting', 'what is a koan', 'chan buddhism china japan', 'satori kensho sudden insight',
      'rinzai soto zen', 'zen influence on japanese arts',
    ],
    content: `Zen is a school of Mahayana Buddhism that developed in China (where it is called Chan) from the 6th century CE and later flourished in Japan, Korea and Vietnam. It emphasises direct, personal experience of awakening over study of scripture, doctrine or elaborate ritual — the insight is said to be transmitted "mind to mind" from teacher to student. The central practice is zazen, seated meditation ("just sitting"), often facing a wall, attending to breath and posture. The Rinzai school also uses koans — paradoxical questions or stories ("what is the sound of one hand?") meant to exhaust ordinary logical thinking and provoke a breakthrough (kensho or satori); the Soto school stresses zazen itself as the expression of enlightenment rather than a means to it. Zen's aesthetic of simplicity, spontaneity and presence deeply shaped Japanese culture — the tea ceremony, calligraphy, ink painting, garden design, archery and swordsmanship. Modern secular "mindfulness" programmes draw on this meditative tradition with the religious framework removed.`,
    createdAt: Date.now(),
  },
];
