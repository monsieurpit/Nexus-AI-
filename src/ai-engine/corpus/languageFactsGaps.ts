import { KnowledgeItem } from '../../types';

// Batch 14 (languages of the world) gap-fills. Live misses on nexus-4b:
// "most spoken language" -> said Hindi/Arabic (it's English by total speakers);
// "what language is spoken in brazil" -> never said Portuguese (dumped the
// 7,000-languages stat); "dead language" -> Flatliners album web dump;
// "click language" -> interpreted as clicking a hyperlink -> HTTP;
// "what does bilingual mean" -> nonsense about Madagascar's capital;
// "oldest language still spoken" -> claimed Latin descends from Greek;
// "language vs dialect" -> claimed Mandarin & Cantonese are mutually
// intelligible; Esperanto answer truncated ("Created by L,").
export const LANGUAGE_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-most-spoken-language',
    title: 'The Most Spoken Language in the World',
    category: 'Languages',
    keywords: [
      'what is the most spoken language', 'most spoken language in the world', 'most widely spoken language',
      'what language is spoken by the most people', 'top languages by number of speakers', 'biggest language in the world',
    ],
    content: `By TOTAL number of speakers (first language plus second language), the most spoken language in the world is English, with roughly 1.5 billion speakers — most of them non-native. Second is Mandarin Chinese (~1.1–1.2 billion total), then Hindi and Spanish (each around 550–600 million). By NATIVE speakers only, the order is different: Mandarin Chinese is first (~940 million native), then Spanish (~485 million), then English (~380 million), then Hindi. So "most spoken" depends on the measure: English wins on total speakers because it is the world's main second language; Mandarin wins on native speakers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-language-brazil',
    title: 'The Language Spoken in Brazil',
    category: 'Languages',
    keywords: [
      'what language is spoken in brazil', 'what do they speak in brazil', 'brazil language',
      'is spanish spoken in brazil', 'official language of brazil', 'do brazilians speak spanish',
    ],
    content: `The language of Brazil is Portuguese — it is the official language and the first language of about 98% of the population. Brazil is by far the largest Portuguese-speaking country (over 200 million speakers, more than Portugal and all the other Lusophone countries combined). Brazilian Portuguese differs from European Portuguese in accent, some vocabulary and grammar, but they are the same language. Spanish is NOT the main language of Brazil, even though almost every neighbouring country speaks Spanish — this is because Brazil was colonised by Portugal, not Spain, under the 1494 Treaty of Tordesillas. Brazil also has around 150–200 surviving Indigenous languages, spoken by small communities.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dead-language',
    title: 'What a Dead Language Is',
    category: 'Languages',
    keywords: [
      'what is a dead language', 'what is an extinct language', 'dead language meaning',
      'what does dead language mean', 'is latin a dead language', 'difference between dead and extinct language',
      'examples of dead languages',
    ],
    content: `A dead language is a language that no longer has any native speakers — nobody grows up speaking it as their first language. Latin is the classic example: it is "dead" because no community raises children in it, even though it is still studied, used in the Catholic Church, and lives on through its descendants (Italian, Spanish, French, Portuguese, Romanian). A distinction is sometimes drawn between a "dead" language (still used in some limited way, like Latin or Sanskrit in ritual and scholarship) and an "extinct" language (completely gone, like Etruscan or Gothic, with no speakers and no ceremonial use). A dead language can occasionally be revived — Hebrew was a dead everyday language for about 1,700 years and was brought back as a living spoken language in the 19th–20th centuries, now the first language of millions in Israel.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-language-vs-dialect',
    title: 'Language vs Dialect',
    category: 'Languages',
    keywords: [
      'what is the difference between a language and a dialect', 'language vs dialect', 'is it a language or a dialect',
      'when is something a dialect', 'are mandarin and cantonese the same language', 'dialect meaning',
    ],
    content: `There is no strict scientific line between a "language" and a "dialect" — the difference is mostly political and social. A rough linguistic guideline is mutual intelligibility: if speakers can understand each other without having learned the other variety, they're usually speaking dialects of one language; if they can't, they're usually separate languages. But this is overridden by politics all the time. Danish, Norwegian and Swedish are largely mutually intelligible yet are called separate languages (separate countries). Mandarin and Cantonese are both called "Chinese" and share a writing system, but in speech they are NOT mutually intelligible — a Mandarin speaker and a Cantonese speaker cannot understand each other, so by the linguistic test they are separate languages. The linguist Max Weinreich's famous quip sums it up: "a language is a dialect with an army and a navy."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-oldest-language',
    title: 'The Oldest Language Still Spoken',
    category: 'Languages',
    keywords: [
      'what is the oldest language still spoken', 'oldest living language', 'oldest language in the world',
      'what is the oldest language', 'is tamil the oldest language', 'oldest spoken language today',
    ],
    content: `There is no single answer, because every living language is exactly as "old" as every other — they all descend in an unbroken chain from earlier speech. What people usually mean is: which languages have the oldest continuous written record under roughly the same name. Common answers: Tamil (literature going back over 2,000 years and still spoken by ~80 million people), Hebrew (ancient scriptures, revived as an everyday language), Greek (documented for ~3,400 years, from Mycenaean to Modern Greek), Chinese (writing back to ~1250 BC), Sanskrit (still used liturgically, ancestor of many Indian languages), and Basque (a language isolate in the Pyrenees with no known relatives, likely older than the arrival of Indo-European languages in Europe). Note: Latin did NOT come from Greek — both are separate branches of the Indo-European family, and the Romance languages come from Latin, not Greek.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lingua-franca',
    title: 'What a Lingua Franca Is',
    category: 'Languages',
    keywords: [
      'what is a lingua franca', 'lingua franca meaning', 'what does lingua franca mean', 'define lingua franca',
      'examples of a lingua franca', 'common language between speakers',
    ],
    content: `A lingua franca is a shared language that people use to communicate when they don't have a native language in common. It's a "bridge" language for trade, travel, science, diplomacy or the internet. Today English is the world's main lingua franca — two people from, say, Japan and Brazil will often talk to each other in English even though it's native to neither. Historically there have been many: actual Lingua Franca (a mixed Italian-based trade pidgin used around the Mediterranean, which gave the term its name), Latin in medieval European scholarship, French in 18th–19th century diplomacy, Swahili across much of East Africa, Aramaic and Greek in the ancient Near East, Hindustani/Urdu across the Indian subcontinent. A lingua franca is defined by its use (a common second language), not by being anyone's mother tongue.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-english-germanic',
    title: 'English Is a Germanic Language',
    category: 'Languages',
    keywords: [
      'is english a germanic or romance language', 'is english a germanic language', 'is english a romance language',
      'what type of language is english', 'why is english considered germanic', 'is english related to german',
    ],
    content: `English is a Germanic language, not a Romance language. It belongs to the West Germanic branch of the Indo-European family, alongside German, Dutch, Frisian (its closest relative) and Afrikaans. The evidence is in the core of the language: the everyday, high-frequency words — I, you, is, have, water, house, eat, drink, mother, hand, day, night — and the basic grammar all come from Old English, brought by the Anglo-Saxons in the 5th century. English does have a huge amount of Romance vocabulary — roughly 60% of the dictionary is from French and Latin — but that's borrowing, mostly after the Norman Conquest of 1066, layered on top of a Germanic skeleton. Linguists classify a language by its inherited core, so English is firmly Germanic with a heavily Romance-influenced vocabulary.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-esperanto',
    title: 'What Esperanto Is',
    category: 'Languages',
    keywords: [
      'what is esperanto', 'who created esperanto', 'esperanto meaning', 'what is a constructed language',
      'how many people speak esperanto', 'is esperanto a real language',
    ],
    content: `Esperanto is the most widely spoken constructed (invented) language. It was created by L. L. Zamenhof, a Polish-Jewish eye doctor, who published it in 1887 under the pen name "Doktoro Esperanto" ("one who hopes"). His goal was a politically neutral, easy-to-learn second language to foster international understanding. It has a small, fully regular grammar (16 rules, no irregular verbs, no grammatical exceptions) and vocabulary drawn mainly from Romance and Germanic languages with some Slavic influence. Today it has perhaps 100,000 to 2 million speakers worldwide, including around 1,000 native speakers (children raised by Esperantist parents). It never became the universal language Zamenhof hoped for, but it has an active global community, literature, and its own culture.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-click-languages',
    title: 'Click Languages (Click Consonants)',
    category: 'Languages',
    keywords: [
      'what is the click language', 'what are click languages', 'click consonants', 'languages with clicks',
      'what language has clicking sounds', 'xhosa clicks', 'khoisan languages', 'the language with clicks',
    ],
    content: `Click languages are languages that use click consonants — sharp popping or clicking sounds made by creating suction with the tongue — as normal speech sounds, the way English uses "t" or "k". (This has nothing to do with clicking a mouse or a link.) They are found almost entirely in southern and eastern Africa. The Khoisan languages (such as Nǃxa̷õ, Khoekhoe, and the ǃKung/Juǀʼhoansi languages) have the most clicks — some have dozens of distinct click sounds. Clicks also spread into several neighbouring Bantu languages, most famously Xhosa and Zulu in South Africa (the "X" in Xhosa is itself a click). Outside Africa, the only language known to use a click as a regular speech sound is Damin, an extinct ceremonial language of Australia. English speakers make click sounds (like "tsk-tsk" for disapproval) but only as gestures, not as parts of words.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bilingual-meaning',
    title: 'What Bilingual Means',
    category: 'Languages',
    keywords: [
      'what does bilingual mean', 'bilingual meaning', 'what is bilingualism', 'what does multilingual mean',
      'difference between bilingual and multilingual', 'what does monolingual mean', 'what is a polyglot',
    ],
    content: `Bilingual means able to speak two languages. It usually implies a good working command of both, though people use it loosely for anyone who functions in two languages, and linguists distinguish degrees (from "can hold a conversation" to "native-like in both"). Related terms: monolingual = speaks one language; trilingual = three; multilingual or plurilingual = several; polyglot = a person who has learned many languages. Someone can be bilingual from childhood (raised with two languages at home) or become bilingual later by learning a second language. More than half the world's population is bilingual or multilingual; being monolingual is actually the minority globally. (Canada is officially bilingual — English and French — at the federal level.)`,
    createdAt: Date.now(),
  },
];
