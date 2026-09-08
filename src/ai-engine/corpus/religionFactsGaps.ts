import { KnowledgeItem } from '../../types';

// Batch 18 (world religions) gap-fills. Live misses on nexus-4b:
// "ten commandments" -> Discord slash-command API dump; "what is the sabbath" ->
// "there's no mention of a sabbath"; "hinduism" -> "Meldi Mata is a Hindu
// goddess" dump; "five pillars of islam" -> listed only four (no hajj);
// "orthodox vs catholic" -> answered catholic-vs-protestant; "caste system" ->
// Nepalese-caste dump; "buddhist meditation" -> drifted into Kabat-Zinn MBSR;
// "shinto" -> "blended with high-speed trains"; "buddhism"/"reincarnation" ->
// thin one-line candle metaphor only.
export const RELIGION_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-ten-commandments',
    title: 'The Ten Commandments',
    category: 'Religion',
    keywords: [
      'what are the ten commandments', 'list the ten commandments', 'ten commandments meaning', 'the decalogue',
      'what are the 10 commandments', 'moses ten commandments', 'ten commandments in the bible',
    ],
    content: `The Ten Commandments (the Decalogue) are a set of moral and religious rules that, in the Bible, God gives to Moses on Mount Sinai for the people of Israel (Exodus 20 and Deuteronomy 5). They are central to both Judaism and Christianity. In summary: (1) worship only the one God; (2) do not make or worship idols; (3) do not misuse God's name; (4) keep the Sabbath day holy; (5) honour your father and mother; (6) do not murder; (7) do not commit adultery; (8) do not steal; (9) do not give false testimony (do not lie about others); (10) do not covet (desire) what belongs to your neighbour. Different traditions (Jewish, Catholic/Lutheran, Reformed) number and divide them slightly differently, but the content is the same. This has nothing to do with computer commands.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sabbath',
    title: 'What the Sabbath Is',
    category: 'Religion',
    keywords: [
      'what is the sabbath', 'what does sabbath mean', 'when is the sabbath', 'sabbath day', 'shabbat meaning',
      'why do jews rest on saturday', 'why do christians worship on sunday', 'sabbath in the bible',
    ],
    content: `The Sabbath is a weekly day of rest and worship commanded in the Bible (it's the fourth of the Ten Commandments), modelled on God resting on the seventh day after creating the world. In Judaism it is called Shabbat and runs from Friday sunset to Saturday nightfall; observant Jews refrain from work and specific categories of activity, light candles, share festive meals, attend synagogue, and treat it as a joyful day set apart. Most Christians moved their main day of worship to Sunday (the "Lord's Day"), commemorating the resurrection of Jesus, though some groups (Seventh-day Adventists, Seventh Day Baptists) keep Saturday. The general idea — one day in seven stepping back from work — has spread well beyond religion into the modern weekend.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hinduism-beliefs',
    title: 'What Hindus Believe',
    category: 'Religion',
    keywords: [
      'what do hindus believe', 'what is hinduism', 'hinduism beliefs', 'core beliefs of hinduism',
      'hindu gods', 'what is dharma', 'what is moksha', 'is hinduism polytheistic',
    ],
    content: `Hinduism is the world's oldest major religion (roots over 3,000 years old) and the third largest, with around 1.2 billion followers, mostly in India and Nepal. It has no single founder, no single scripture and a wide range of beliefs, but common threads are: Brahman, the one ultimate reality underlying everything, which is worshipped through many gods and goddesses (Vishnu, Shiva, Devi/Shakti, Brahma, Ganesha, Krishna, Rama and thousands more) — so it is often described as both one and many; the atman (soul/self), which is deep down identical with Brahman; samsara, the cycle of reincarnation; karma, the moral law that your actions shape future lives; dharma, your righteous duty according to your role and stage of life; and moksha, liberation from the cycle of rebirth, the ultimate goal. Key texts include the Vedas, Upanishads, the Bhagavad Gita, and the epics Ramayana and Mahabharata.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-five-pillars-islam',
    title: 'The Five Pillars of Islam',
    category: 'Religion',
    keywords: [
      'what are the five pillars of islam', 'five pillars of islam', '5 pillars of islam', 'pillars of islam list',
      'what is shahada', 'what is zakat', 'what is hajj', 'what is sawm',
    ],
    content: `The Five Pillars are the core practices required of Muslims: (1) Shahada — the declaration of faith: "There is no god but God, and Muhammad is the messenger of God." (2) Salat — the five daily prayers, performed at set times facing the Kaaba in Mecca. (3) Zakat — obligatory almsgiving, normally about 2.5% of one's accumulated wealth each year, given to the poor. (4) Sawm — fasting from food, drink and other physical needs from dawn to sunset during the month of Ramadan. (5) Hajj — the pilgrimage to Mecca, which every Muslim who is physically and financially able must make at least once in their lifetime. Any list that stops at four is missing the Hajj.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-buddhism-overview',
    title: 'What Buddhism Is',
    category: 'Religion',
    keywords: [
      'what is buddhism', 'buddhism beliefs', 'core teachings of buddhism', 'four noble truths', 'eightfold path',
      'what do buddhists believe', 'is buddhism a religion', 'who founded buddhism',
    ],
    content: `Buddhism is a religion and philosophy founded in northern India around 2,500 years ago by Siddhartha Gautama, the Buddha ("awakened one"). It has roughly 500 million followers, mostly in Asia. Its foundation is the Four Noble Truths: (1) life involves suffering and dissatisfaction (dukkha); (2) this is caused by craving and attachment; (3) suffering can end; (4) the way to end it is the Noble Eightfold Path — right view, intention, speech, action, livelihood, effort, mindfulness and concentration. Buddhists generally accept karma and rebirth (but, unlike Hinduism, no permanent soul — the doctrine of anatta, "not-self") and aim for nirvana, the end of craving and of the cycle of rebirth. There is no creator god at the centre. Major branches: Theravada (Sri Lanka, Southeast Asia), Mahayana (China, Japan, Korea, Vietnam), and Vajrayana/Tibetan Buddhism.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-reincarnation',
    title: 'What Reincarnation Is',
    category: 'Religion',
    keywords: [
      'what is reincarnation', 'what does reincarnation mean', 'reincarnation meaning', 'what is transmigration of the soul',
      'do hindus believe in reincarnation', 'reincarnation vs rebirth', 'what is samsara',
    ],
    content: `Reincarnation is the belief that after death a being is born again into a new body, and that this repeats over many lifetimes. In Hinduism the eternal soul (atman) transmigrates from body to body, and the circumstances of each new life are shaped by karma — the moral quality of one's past actions; the whole cycle is called samsara, and escaping it (moksha) is the goal. Jainism and Sikhism share a similar view. Buddhism accepts rebirth but not a permanent soul that carries over: it describes it more like one candle flame lighting the next — a causal continuation, connected but not the same "self." Belief in some form of reincarnation also appears in ancient Greek thought (Pythagoras, Plato), in various Indigenous traditions, and in modern spiritual movements, though mainstream Judaism, Christianity and Islam instead teach a single life followed by resurrection or judgement.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-caste-system',
    title: 'What the Caste System Is',
    category: 'Religion',
    keywords: [
      'what is the caste system', 'caste system explained', 'indian caste system', 'what are the four varnas',
      'what are dalits', 'what are untouchables', 'is the caste system legal', 'caste system meaning',
    ],
    content: `The caste system is a form of rigid, hereditary social hierarchy historically associated with Hinduism in South Asia. Classical texts describe four broad ranked classes (varnas): Brahmins (priests and scholars), Kshatriyas (rulers and warriors), Vaishyas (merchants and farmers) and Shudras (labourers and servants). Below and outside this scheme were the "untouchables," now called Dalits, who were assigned the most stigmatised work and subjected to severe discrimination. In everyday life the system operates through thousands of much smaller birth-groups called jatis, which traditionally determined occupation, whom one could marry, and social contact. Caste-based discrimination was made illegal in India by the 1950 Constitution (largely through the work of B. R. Ambedkar, himself a Dalit), and affirmative-action quotas exist, but caste still strongly influences marriage, politics and social life, especially in rural areas.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-buddhist-meditation',
    title: 'Meditation in Buddhism',
    category: 'Religion',
    keywords: [
      'what is meditation in buddhism', 'buddhist meditation', 'types of buddhist meditation', 'what is samatha',
      'what is vipassana', 'what is metta meditation', 'how do buddhists meditate', 'what is zazen',
    ],
    content: `Meditation (bhavana, "mental cultivation") is a central Buddhist practice for training the mind toward the calm and insight needed for liberation. The two main types are samatha — calming and concentrating the mind, usually by resting attention on the breath, to reach deep stillness (jhana); and vipassana — "insight" meditation, observing bodily sensations, feelings and thoughts as they arise and pass, to directly see impermanence, suffering and not-self. Other forms include metta (loving-kindness) meditation, cultivating goodwill toward oneself and all beings, and, in Zen, zazen ("just sitting"). Modern secular mindfulness programs (like Jon Kabat-Zinn's MBSR, 1979) are adapted from vipassana but strip out the religious framework — they are an offshoot, not Buddhist meditation itself.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-shinto',
    title: 'What Shinto Is',
    category: 'Religion',
    keywords: [
      'what is shinto', 'shinto beliefs', 'what is shintoism', 'what are kami', 'shinto religion japan',
      'what is a torii gate', 'does shinto have a founder', 'shinto vs buddhism in japan',
    ],
    content: `Shinto ("the way of the kami") is the indigenous religion of Japan. It has no founder, no single sacred text, and no absolute set of doctrines. Its core is the kami — sacred spirits or presences found in nature (mountains, rivers, trees, the sun), in remarkable people and ancestors, and in objects. Practice centres on shrines (jinja), marked by torii gates, where people make offerings, pray for blessings, and hold seasonal festivals (matsuri). Ritual purity is very important — worshippers rinse their hands and mouth before approaching a shrine, and priests perform purification rites. Shinto focuses on this life, community and harmony with nature rather than sin, judgement or an afterlife. Most Japanese people practise Shinto and Buddhism side by side (Shinto for births, weddings and New Year; Buddhism for funerals).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-orthodox-vs-catholic',
    title: 'Eastern Orthodox vs Roman Catholic Christianity',
    category: 'Religion',
    keywords: [
      'what is the difference between orthodox and catholic christianity', 'orthodox vs catholic',
      'eastern orthodox vs roman catholic', 'the great schism', 'what is the filioque', 'why did the church split in 1054',
    ],
    content: `The Eastern Orthodox and Roman Catholic churches were one church for the first thousand years of Christianity and formally split in the Great Schism of 1054, after centuries of drift. The core dispute was authority: Catholics hold that the Pope (Bishop of Rome) has supreme, universal jurisdiction over the whole Church and (since 1870) can teach infallibly under set conditions; the Orthodox reject papal supremacy and are a communion of self-governing national churches (Greek, Russian, Serbian, etc.) led by bishops, with the Patriarch of Constantinople as "first among equals," not a ruler. Other differences: the "filioque" clause (Catholics say the Holy Spirit proceeds "from the Father and the Son," Orthodox say "from the Father" only); Orthodox parish priests may be married (bishops may not); different calendars and liturgical styles; Orthodox use leavened bread for communion, Catholics unleavened. Both keep bishops, seven sacraments, and honour Mary and the saints — that's the Protestant contrast, a different split (1517).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sunni-vs-shia',
    title: 'Sunni vs Shia Islam',
    category: 'Religion',
    keywords: [
      'what is the difference between sunni and shia islam', 'sunni vs shia', 'shia and sunni difference',
      'why did islam split', 'who can lead the muslim community', 'what is the imamate', 'sunni shia divide',
    ],
    content: `Sunni and Shia are the two main branches of Islam. The split goes back to a dispute over leadership right after the Prophet Muhammad died in 632: who should lead the Muslim community? Sunnis (about 85–90% of Muslims worldwide) held that the community should choose its leader (caliph) and accepted Abu Bakr, Muhammad's close companion. Shia (about 10–15%, a majority in Iran, Iraq, Bahrain, Azerbaijan and parts of Lebanon) held that leadership belonged to Muhammad's family, specifically his cousin and son-in-law Ali and Ali's descendants, the Imams, seen as divinely guided. From that grew differences in religious authority (Shia have a more structured hierarchy of clergy, e.g. ayatollahs), some law and practice, and distinct commemorations — above all Ashura, mourning the killing of Ali's son Husayn at Karbala in 680. Both share the Quran, the oneness of God, the Prophet, and the Five Pillars.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-catholic-vs-protestant',
    title: 'Catholic vs Protestant Christianity',
    category: 'Religion',
    keywords: [
      'what is the difference between catholic and protestant', 'catholic vs protestant', 'protestant reformation',
      'what did martin luther believe', 'sola fide sola scriptura', 'why did protestants break from the catholic church',
    ],
    content: `Protestantism began with the Reformation, usually dated to 1517 when the German monk Martin Luther publicly protested Catholic practices (especially selling "indulgences"). Main differences: Authority — Catholics recognise the Pope and sacred tradition alongside the Bible; Protestants hold to "scripture alone" (sola scriptura) and reject papal authority. Salvation — Protestants emphasise "faith alone" (sola fide), being saved by God's grace through faith, not by works or church ritual; Catholics teach faith working together with grace-filled sacraments and good works. Sacraments — Catholics have seven; most Protestants keep two (baptism and communion). The Eucharist — Catholics believe the bread and wine truly become Christ's body and blood (transubstantiation); Protestant views range from a real spiritual presence to pure symbol. Catholics venerate Mary and the saints and pray for the dead (purgatory); Protestants generally do not. Protestantism also splintered into many denominations (Lutheran, Reformed/Presbyterian, Anglican, Baptist, Methodist, Pentecostal, and more).`,
    createdAt: Date.now(),
  },
];
