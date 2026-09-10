import { KnowledgeItem } from '../../types';

/**
 * COMPARATIVE_RELIGION_CONCEPTS_GAPS_2 — batch 236 corrections.
 * Many wrong-domain / web-dump misses:
 * - "nirvana vs enlightenment" answered about the European Age of Reason.
 * - "soul vs spirit" answered about Egyptian ka/ba/akh.
 * - "heaven vs paradise" was a Paradise Lost / Milton dump.
 * - "purgatory vs limbo" defined Limbo the video game.
 * - "sin vs vice", "pastor vs preacher", "Roman vs Greek mythology" were raw
 *   web dumps.
 * - "agnosticism vs apatheism" never defined apatheism.
 * - "Protestant vs Evangelical" answered Catholic vs Protestant instead.
 * - "Orthodox vs Reform Judaism", "reincarnation vs resurrection",
 *   "priest vs pastor", "Zen vs Tibetan Buddhism" were muddled or wrong.
 * - "Sunni vs Shia" and "Judaism vs Zionism" dumped text and missed the core.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'religion', keywords, content, createdAt: now,
});

export const COMPARATIVE_RELIGION_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-relig2-nirvana-vs-enlightenment',
    'Nirvana vs enlightenment (Buddhism)',
    [
      'difference between nirvana and enlightenment buddhism', 'bodhi awakening seeing reality clearly', 'nirvana extinguishing of craving and suffering end of rebirth',
      'the Buddha attained both under the Bodhi tree', 'not the European Age of Reason', 'arhat buddha awakening',
    ],
    `In a Buddhist context (this is not the European "Enlightenment", the 18th-century Age of Reason):

ENLIGHTENMENT translates "bodhi", meaning AWAKENING. It is the breakthrough of insight in which a person sees reality as it actually is — impermanence, suffering, and non-self — and is freed from ignorance and delusion. It is the realisation event, the waking up. The historical Buddha's "enlightenment" is the night he attained this under the Bodhi tree.

NIRVANA ("nibbana", literally "blowing out", as of a flame) is the RESULT and GOAL: the complete extinguishing of greed, hatred, and delusion, and with them the end of dukkha (suffering) and of the cycle of rebirth (samsara). "Nirvana with remainder" is the liberated state of an awakened person still alive; "nirvana without remainder" (parinirvana) is what happens at their death, with no further rebirth.

So they are two aspects of one liberation: enlightenment is the awakening insight; nirvana is the peace and freedom from the cycle that the awakened mind rests in. The Buddha reached both at once.`,
  ),
  k(
    'kb-gap-relig2-soul-vs-spirit',
    'Soul vs spirit',
    [
      'difference between a soul and a spirit', 'often used interchangeably', 'soul the individual life mind and personality animating the body',
      'spirit the higher God-oriented faculty or the divine breath', 'Hebrew nephesh versus ruach Greek psyche versus pneuma', 'trichotomy body soul spirit',
    ],
    `In ordinary speech "soul" and "spirit" are near-synonyms for the non-physical part of a person that outlasts the body. Where traditions DO distinguish them:

SOUL usually means the individual principle of life and identity — the mind, will, emotions, and personality that animate a particular body and make you "you". Hebrew "nephesh", Greek "psyche". In the common "body and soul" (dichotomy) view, this is simply the immaterial self.

SPIRIT often means either (a) the higher faculty of a person that is capable of relationship with God — conscience, the God-ward orientation — or (b) the animating "breath" of life given by God. Hebrew "ruach" (also "wind, breath"), Greek "pneuma".

Some Christian theology uses a three-part (trichotomy) model: body (physical), soul (mind/personality/will), spirit (the part that communes with God). Other theologians treat soul and spirit as the same thing described from different angles. "Spirit" is also used for non-human beings (angels, demons, "the Holy Spirit"), where "soul" normally is not.`,
  ),
  k(
    'kb-gap-relig2-heaven-vs-paradise',
    'Heaven vs paradise',
    [
      'difference between heaven and paradise', 'heaven the dwelling place of God and eternal home of the saved', 'paradise a place or state of bliss originally a garden Eden',
      'paradise as the intermediate blessed state', 'Islam Jannah the Garden', 'not the poem Paradise Lost',
    ],
    `HEAVEN, in Christian usage, is the realm where God dwells and the final, eternal destiny of the redeemed — being in the full presence of God forever. It is the ultimate goal.

PARADISE (from an old Persian word for a walled garden) is a place or state of perfect happiness and peace. The word is used a few overlapping ways:
- the original garden of Eden, humanity's first home;
- the intermediate blessed state entered right after death, before the final resurrection — as when Jesus tells the criminal on the cross "today you will be with me in paradise";
- loosely, as a straight synonym for heaven.

In Islam the garden of paradise is "Jannah", the reward of the righteous in the afterlife, described with rivers, shade, and gardens. In Judaism "Gan Eden" (the Garden of Eden) is likewise used for the abode of the righteous dead.

So heaven emphasises God's presence and the final state; paradise emphasises the garden imagery of bliss and is often the word for the waiting state or for Eden. (The John Milton poem "Paradise Lost" is about the expulsion from Eden — a literary work, not a definition.)`,
  ),
  k(
    'kb-gap-relig2-purgatory-vs-limbo',
    'Purgatory vs limbo (Catholic theology)',
    [
      'difference between purgatory and limbo', 'purgatory temporary purification of the saved before heaven', 'limbo the permanent borderland state',
      'limbo of the infants unbaptised limbo of the fathers righteous dead before Christ', 'purgatory is defined doctrine limbo is a theological hypothesis', 'not the video game',
    ],
    `Both are ideas in Catholic theology about states after death that are neither heaven nor hell. (Neither is a video game.)

PURGATORY is defined Catholic doctrine: a TEMPORARY state of purification for people who die in God's grace and friendship but still imperfectly purified. They are certain of heaven, but are cleansed of the lingering effects of sin first. The living are encouraged to pray for the "holy souls in purgatory". Protestants generally reject it as unbiblical.

LIMBO (from Latin "limbus", edge/border) was never defined dogma — it is a theological hypothesis for a PERMANENT borderland:
- the "limbo of the Fathers": where the righteous who died before Christ waited until he opened heaven to them (linked to the "harrowof hell");
- the "limbo of infants": a proposed state of natural happiness, without the direct vision of God, for babies who die without baptism and thus without personal sin. The modern Church has moved away from this, expressing "hope" that such infants are saved, while never having taught limbo as required belief.

Key contrast: purgatory is temporary, purifying, and ends in heaven; limbo was imagined as a permanent, painless state outside the beatific vision.`,
  ),
  k(
    'kb-gap-relig2-sin-vs-vice',
    'Sin vs vice',
    [
      'difference between a sin and a vice', 'a sin is a specific wrongful act or omission against moral law or God', 'a vice is a habitual disposition or character flaw inclining toward sin',
      'sin is an act vice is a habit', 'vice is the opposite of virtue', 'seven deadly sins are really capital vices',
    ],
    `A SIN is a specific act (or deliberate omission) that violates a moral or divine law — a discrete wrong you commit at a particular time. "Telling that lie was a sin."

A VICE is a settled HABIT or disposition of character that inclines a person toward sinning — an ingrained bad trait, the opposite of a virtue. "He has a vice of dishonesty" describes a standing tendency, not one act.

So sin is to vice roughly as a single action is to a habit: repeated sins of the same kind engrain a vice, and a vice then makes further sins of that kind easier and more likely. The traditional "seven deadly sins" (pride, greed, lust, envy, gluttony, wrath, sloth) are more precisely the seven CAPITAL VICES — root dispositions from which many individual sins spring. In non-religious usage "vice" also just means an immoral or unhealthy habit (gambling, heavy drinking), and "vice" as a legal/police category covers offences like prostitution and illegal gambling.`,
  ),
  k(
    'kb-gap-relig2-grace-vs-mercy',
    'Grace vs mercy',
    [
      'difference between grace and mercy', 'mercy is not receiving the punishment you deserve', 'grace is receiving a good gift you did not earn',
      'mercy withholds deserved judgement grace gives unmerited favour', 'both are aspects of divine love', 'compassion versus favour',
    ],
    `A common one-line summary: MERCY is NOT getting the bad thing you DO deserve; GRACE is getting the good thing you DON'T deserve.

MERCY is compassion shown by withholding a deserved penalty or relieving someone's suffering. A judge who suspends a sentence, or God not imposing the full consequence of wrongdoing, is showing mercy. It responds to guilt or misery by holding back judgement.

GRACE is unmerited favour — actively giving a benefit that was never earned and could not be earned. In Christian theology, grace is God freely offering salvation, forgiveness, and his own life to people who have no claim on it. It goes beyond withholding punishment to bestowing a positive gift.

They overlap and often appear together ("grace and mercy"), both flowing from love, but the emphasis differs: mercy looks at the misery/guilt and spares; grace looks at the need/poverty and lavishly gives.`,
  ),
  k(
    'kb-gap-relig2-pastor-vs-preacher',
    'Pastor vs preacher',
    [
      'difference between a pastor and a preacher', 'pastor is an office ongoing care and leadership of a congregation', 'preacher is a role anyone who delivers sermons',
      'a pastor usually preaches but a preacher is not necessarily a pastor', 'evangelist guest speaker lay preacher', 'shepherd versus proclaimer',
    ],
    `PASTOR is a settled OFFICE. A pastor (from the Latin for "shepherd") is the ordained or appointed leader with ongoing responsibility for a particular congregation: preaching, teaching, leading worship, administering ordinances/sacraments, counselling, visiting the sick, overseeing the church's life, and providing spiritual "care of souls". It is a role you hold at a specific church.

PREACHER is a FUNCTION. A preacher is anyone who proclaims a sermon — expounds Scripture and calls people to respond. That includes pastors, but also travelling evangelists, guest speakers, seminary professors, chaplains, and authorised lay preachers who have no pastoral charge of their own.

So a pastor is normally also a preacher (preaching is part of the job), but many preachers are not pastors. "Preacher" highlights the act of delivering the message; "pastor" highlights the standing relationship of leadership and care over a flock.`,
  ),
  k(
    'kb-gap-relig2-priest-vs-pastor',
    'Priest vs pastor',
    [
      'difference between a priest and a pastor', 'priest ordained clergy in sacramental liturgical traditions Catholic Orthodox Anglican', 'priest administers sacraments stands in apostolic succession mediates',
      'pastor Protestant congregational leader focus on preaching and shepherding', 'presbyter minister', 'sacrifice of the Mass versus symbolic ordinance',
    ],
    `PRIEST is the term used in sacramental, liturgical churches — Roman Catholic, Eastern Orthodox, Anglican/Episcopal, and others. A priest is ordained into a line understood to go back to the apostles (apostolic succession) and is authorised to celebrate the Eucharist/Mass, hear confession and pronounce absolution, anoint the sick, and administer the other sacraments. The role is understood as mediating — acting in the person of Christ to bring God's grace to the people through the sacraments. Roman Catholic priests of the Latin rite are normally celibate.

PASTOR is the term used in most Protestant churches (Baptist, Methodist, Pentecostal, non-denominational, etc.). A pastor is the called leader of a congregation, ordained or licensed by that denomination, whose central tasks are preaching and teaching the Bible, leading worship, and shepherding the members. Protestant theology generally holds to the "priesthood of all believers" and does not see the pastor as a sacrificing priest; communion and baptism are usually understood as ordinances/symbols rather than grace-conferring sacraments. Pastors may marry.

Overlap: Lutheran and Anglican traditions sit in between and may use "pastor", "minister", "priest", or "presbyter" for essentially the same office. The core contrast is sacramental mediator (priest) vs preacher-shepherd of a congregation (pastor).`,
  ),
  k(
    'kb-gap-relig2-agnosticism-vs-apatheism',
    'Agnosticism vs apatheism',
    [
      'difference between agnosticism and apatheism', 'agnosticism is about knowledge the existence of god is unknown or unknowable', 'apatheism is an attitude of indifference to whether god exists',
      'apatheistic does not care regardless of belief', 'practical atheism', 'coined term apathy plus theism',
    ],
    `AGNOSTICISM is a claim about KNOWLEDGE: the agnostic holds that whether any god exists is not known — and, in the strong ("hard") form, cannot be known by anyone. It is a considered epistemological position and an agnostic may still care a great deal about the question.

APATHEISM (a blend of "apathy" and "theism", also called "practical atheism" or "pragmatic atheism") is an ATTITUDE, not a knowledge claim: the apatheist is simply INDIFFERENT to the question of whether God exists and to religion generally. They may think the question is unanswerable, or answerable but unimportant, or they may hold no view at all — the defining feature is that they don't consider it worth their attention and it does not affect how they live.

So an agnostic says "I don't know (and maybe can't know)"; an apatheist says "I don't care either way." A person can be both, but they can also come apart: a passionate agnostic keeps wrestling with the question, while an apatheist who is confident God exists might still not bother to worship.`,
  ),
  k(
    'kb-gap-relig2-protestant-vs-evangelical',
    'Protestant vs evangelical',
    [
      'difference between Protestant and Evangelical', 'Protestant is the broad family of churches from the Reformation', 'evangelical is a movement across denominations emphasising conversion born again',
      'Bebbington quadrilateral conversionism biblicism crucicentrism activism', 'all evangelicals are Protestant not all Protestants are evangelical', 'mainline versus evangelical',
    ],
    `PROTESTANT is the broad category: all the Western Christian churches that broke from Rome in and after the 16th-century Reformation, plus their descendants — Lutheran, Reformed/Presbyterian, Anglican, Baptist, Methodist, Pentecostal, and thousands of independent churches. What unites them is roughly "scripture alone", "faith alone", "grace alone", and rejection of papal authority. It covers a huge theological range.

EVANGELICAL is a MOVEMENT that runs across many Protestant denominations (and is almost entirely within Protestantism). Historians describe it by four marks (the "Bebbington quadrilateral"):
1. conversionism — the need for a personal, life-changing conversion ("being born again");
2. biblicism — a high view of the Bible as the final authority;
3. crucicentrism — central focus on Christ's atoning death on the cross;
4. activism — expressing the faith through evangelism and social effort.

So the relationship is: essentially all evangelicals are Protestants, but many Protestants are not evangelicals. "Mainline" Protestant churches (much of Episcopalianism, the United Church, mainline Methodism and Presbyterianism) are Protestant but generally not called evangelical; more theologically liberal Protestants likewise. "Evangelical" is also sometimes confused with "evangelistic" (doing outreach) and, in German, "evangelisch" just means "Lutheran/Protestant".`,
  ),
  k(
    'kb-gap-relig2-orthodox-vs-reform-judaism',
    'Orthodox vs Reform Judaism',
    [
      'difference between Orthodox and Reform Judaism', 'Orthodox holds Torah written and oral as divinely revealed and halakha as binding and unchanging', 'Reform sees Judaism as evolving emphasises ethical monotheism individual autonomy',
      'Reform egalitarian vernacular services drove liturgical change', 'Conservative Judaism in between', 'kashrut Shabbat observance',
    ],
    `ORTHODOX JUDAISM holds that the entire Torah — the written Torah and the oral Torah (Mishnah, Talmud, later codes) — was revealed by God and that halakha (Jewish law) is binding and, in its essentials, unchanging. Observance is comprehensive: strict Sabbath rules, kashrut (kosher food laws), daily prayer in Hebrew, traditional gender roles, separate seating in synagogue, and rabbinic authority over practice. It ranges from Modern Orthodox (full observance plus engagement with secular society and education) to Haredi/Hasidic communities.

REFORM JUDAISM (originating in 19th-century Germany) holds that Judaism has always DEVELOPED and that each generation may adapt practice. It emphasises ethical monotheism and the prophetic call to justice over the binding force of ritual law, and it grants individual autonomy: a Reform Jew chooses which traditional practices are personally meaningful. In practice: egalitarian (women as rabbis and in all roles since the 1970s), services largely in the vernacular with instrumental music, no requirement of kashrut or full Sabbath restrictions, and acceptance of patrilineal descent and of interfaith families.

CONSERVATIVE (Masorti) Judaism sits between them — committed to halakha as binding but as capable of evolving through rabbinic rulings. Reconstructionist and other movements exist too. The sharpest divide is over whether Jewish law is fixed divine command (Orthodox) or an evolving human response to the divine (Reform).`,
  ),
  k(
    'kb-gap-relig2-reincarnation-vs-resurrection',
    'Reincarnation vs resurrection',
    [
      'difference between reincarnation and resurrection', 'reincarnation the soul returns in a new body repeatedly cycle of rebirth', 'resurrection the dead are raised bodily back to life usually once at the end of time',
      'Hinduism Buddhism transmigration samsara', 'Christianity Islam Judaism bodily resurrection last judgement', 'same body restored versus new body',
    ],
    `REINCARNATION (also transmigration; "rebirth" in Buddhism) is the idea that after death the soul or stream of consciousness returns in ANOTHER body and lives again — repeatedly, across many lifetimes. The kind of life you are reborn into is shaped by karma. The goal in Hinduism, Buddhism, Jainism, and Sikhism is eventually to be RELEASED from this endless cycle (samsara) — moksha or nirvana. It is a recurring process, and usually the new body is a different one (human, animal, etc.).

RESURRECTION is the idea that the dead are RAISED — restored to bodily life — typically ONCE, as a decisive act of God, most often at the end of history and followed by final judgement. It is central to Christianity (grounded in the resurrection of Jesus), Islam (the Day of Resurrection), and most of Judaism. The same person, body and all (transformed/glorified), is brought back, not sent round again.

Contrast: reincarnation = many lives, a cycle to escape, often a new body each time, driven by karma; resurrection = one life, then death, then a single bodily raising by God, then eternal judgement. (Some ancient Greek schools, e.g. Pythagoreans and Platonists, taught a version of reincarnation of the soul until it is purified.)`,
  ),
  k(
    'kb-gap-relig2-sunni-vs-shia',
    'Sunni vs Shia Islam',
    [
      'difference between Sunni and Shia Islam', 'dispute over succession to Muhammad', 'Sunnis accept the elected caliphs Abu Bakr Umar Uthman Ali',
      'Shia hold Ali and his descendants the imams were the rightful leaders divinely designated', 'about 85 to 90 percent Sunni', 'Twelvers Ismailis Ashura Karbala Husayn',
    ],
    `The split is originally POLITICAL — over who should lead the Muslim community after the Prophet Muhammad's death in 632 CE — and it later grew into distinct theological and legal traditions. Both share the Quran, the oneness of God, Muhammad as final prophet, and the core practices (the Five Pillars).

SUNNIS (from "sunnah", the Prophet's example; ~85-90% of Muslims) hold that leadership passed to the most capable companion chosen by the community's consensus. They accept the first four "Rightly Guided Caliphs" — Abu Bakr, Umar, Uthman, and Ali — and, after them, the historical caliphates. Religious authority rests on the Quran, hadith, and the consensus of scholars across four main schools of law.

SHIA (from "shiat Ali", the party of Ali; most of the remainder, concentrated in Iran, Iraq, Bahrain, Azerbaijan, and parts of Lebanon and Yemen) hold that Muhammad designated his cousin and son-in-law ALI as his successor, and that leadership (the imamate) should have stayed in the Prophet's family (Ahl al-Bayt) through a line of divinely guided IMAMS. The largest branch, the "Twelvers", recognises twelve imams, the last of whom is in occultation and will return as the Mahdi. Shia Islam has its own hadith collections and law (Ja'fari school), reveres shrines of the imams, and commemorates the killing of Ali's son Husayn at Karbala (680 CE) each year on Ashura.`,
  ),
  k(
    'kb-gap-relig2-judaism-vs-zionism',
    'Judaism vs Zionism',
    [
      'difference between Judaism and Zionism', 'Judaism is the religion peoplehood and civilisation of the Jewish people over three thousand years', 'Zionism is a modern 19th century political and national movement for Jewish self-determination in the Land of Israel',
      'Theodor Herzl 1897 Basel Congress', 'one can be Jewish and non-Zionist or Zionist and secular', 'religion versus nationalism',
    ],
    `JUDAISM is the RELIGION and broader civilisation of the Jewish people — its belief in one God, the Torah and its commandments, the festivals, ethics, law (halakha), and a shared history and peoplehood stretching back over three thousand years. It is practised by Jews across the world and comes in many streams (Orthodox, Conservative, Reform, and others).

ZIONISM is a modern POLITICAL and NATIONAL movement, founded in late-19th-century Europe (Theodor Herzl; the first Zionist Congress, Basel, 1897), holding that Jews are a nation entitled to self-determination and a homeland in the historic Land of Israel, and working to establish and sustain a Jewish state there (achieved with Israel in 1948). It arose partly in response to persistent European antisemitism.

They are related but distinct: Zionism draws on Jewish attachment to the land and on biblical and liturgical longing for Zion, but it is a secular-national programme, and one's stance on it is a political question. There are, and have long been, Jews who are anti-Zionist or non-Zionist on religious or political grounds (e.g. some Haredi groups, and parts of the historic Reform and Bundist movements), and there are non-Jews who are Zionists (e.g. many Christian Zionists). Being Jewish does not by itself make someone a Zionist, and vice versa. Zionism itself has several strands — Labour, Revisionist, Religious, cultural.`,
  ),
  k(
    'kb-gap-relig2-zen-vs-tibetan-buddhism',
    'Zen vs Tibetan Buddhism',
    [
      'difference between Zen and Tibetan Buddhism', 'Zen developed as Chan in China from about the 6th century CE spread to Japan Korea Vietnam', 'Zen stresses seated meditation zazen direct insight simplicity minimal ritual',
      'Tibetan Buddhism Vajrayana from about the 7th century CE tantra deity yoga mantra elaborate ritual lamas', 'both are Mahayana', 'Buddha lived around the 5th century BCE not 2500 BC',
    ],
    `Both are forms of Mahayana Buddhism, but from very different lineages and with different methods. (Note: the Buddha lived around the 5th century BCE; neither school goes back to him directly — they are much later developments.)

ZEN began as CHAN in China from around the 6th-7th century CE (traditionally traced to Bodhidharma) and spread to Japan (Zen), Korea (Seon), and Vietnam (Thien). It stresses direct, wordless insight into one's own nature, cultivated mainly through seated meditation ("zazen", "just sitting") and, in the Rinzai school, work with koans (paradoxical questions). Its aesthetic is spare and disciplined — minimal ritual, plain halls, and arts like calligraphy, tea, and garden design as practice.

TIBETAN BUDDHISM (Vajrayana, the "diamond vehicle") took shape from around the 7th-8th century CE when Indian tantric Buddhism was brought to Tibet (Padmasambhava, later Atisha). It keeps the full monastic and philosophical curriculum but adds tantric methods: visualising and identifying with deities (yidams), mantra recitation, mandalas, elaborate ritual, and guru devotion, often described as a faster path. It has distinctive institutions — lineages (Nyingma, Kagyu, Sakya, Gelug), reincarnate teachers (tulkus, such as the Dalai Lama), and a rich iconography.

Short version: Zen strips practice down to bare attention and simplicity; Tibetan Buddhism is highly ritual, visual, and devotional, using tantra and the teacher-student bond.`,
  ),
  k(
    'kb-gap-relig2-roman-vs-greek-mythology',
    'Roman vs Greek mythology',
    [
      'difference between Roman and Greek mythology', 'largely the same gods and myths with different names Zeus Jupiter Ares Mars', 'Greek myths came first Romans adopted and adapted them',
      'Greek emphasis on personality and human drama Roman emphasis on duty state ancestry and founding legend', 'Roman gods originally more abstract numina less anthropomorphic', 'Aeneas Romulus',
    ],
    `The two are deeply intertwined: as Rome absorbed Greek culture (from about the 3rd century BCE), it identified its own gods with the Greek ones and took over most of the Greek stories wholesale. So the mythologies overlap heavily, with different NAMES: Zeus/Jupiter, Hera/Juno, Poseidon/Neptune, Ares/Mars, Aphrodite/Venus, Athena/Minerva, Hermes/Mercury, Artemis/Diana, Hades/Pluto.

Differences of EMPHASIS and CHARACTER:
- Chronology: the Greek myths are older and were the source; the Roman versions are adaptations, most famously in Latin literature (Virgil's Aeneid, Ovid's Metamorphoses).
- Focus: Greek myth dwells on the personalities, flaws, and dramatic adventures of gods and heroes as individuals. Roman myth is more concerned with the state, duty ("pietas"), ancestry, and Rome's destiny — its central story is a national founding legend (Aeneas fleeing Troy, Romulus and Remus).
- Nature of the gods: early Roman religion conceived of divine powers ("numina") more abstractly and with less vivid human form and biography; the rich personalities came largely from the Greek overlay.
- Values: Greek heroes are often celebrated for individual excellence and glory; Roman heroes for service, discipline, and self-sacrifice for the community.

So it is less "two different mythologies" than one shared body of stories told with Roman names and refocused around Rome's civic identity.`,
  ),
];
