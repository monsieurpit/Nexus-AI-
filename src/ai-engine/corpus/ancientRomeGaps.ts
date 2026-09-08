import { KnowledgeItem } from '../../types';

// Batch 44 (ancient Rome) gap-fills. Live misses on nexus-4b:
// "who was Hannibal" -> "a sharp manager for Barcelona... Ronaldinho, Messi,
// tiki-taka" (confused with Guardiola); "what was slavery like in ancient
// Rome" -> "represented by maror, the bitter herbs of Passover" (confused with
// Exodus); "the Roman Senate" -> "two per state, six-year staggered terms"
// (confused with the US Senate); "the Roman army" -> "led by Julius Caesar" and
// nothing else; "Republic vs Empire" -> a web dump about 476 and 1453.
export const ANCIENT_ROME_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-hannibal',
    title: 'Who Hannibal Was',
    category: 'Ancient Rome',
    keywords: [
      'who was hannibal', 'hannibal barca', 'hannibal elephants over the alps', 'second punic war hannibal',
      'battle of cannae', 'hannibal vs rome', 'battle of zama',
    ],
    content: `Hannibal Barca (247 – c. 183 BC) was the Carthaginian general widely rated one of the greatest military commanders in history, and Rome's most dangerous enemy. In the Second Punic War (218–201 BC) he led an army — famously including war elephants — overland from Spain, across the Pyrenees and the Alps in winter, and invaded Italy from the north, catching Rome completely off guard. He crushed Roman armies at the Trebia (218 BC) and Lake Trasimene (217 BC), and at Cannae (216 BC) he destroyed a much larger Roman force in a double-envelopment that is still taught in military academies. But he lacked the siege equipment and reinforcements to take the city of Rome itself, and spent years fighting inconclusively in Italy while Rome recovered and attacked Carthage's other territories. Recalled home, he was finally defeated by the Roman general Scipio Africanus at Zama in 202 BC. He later lived in exile advising Rome's enemies, and took poison to avoid capture. (Nothing to do with FC Barcelona or "tiki-taka.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roman-slavery',
    title: 'What Slavery Was Like in Ancient Rome',
    category: 'Ancient Rome',
    keywords: [
      'what was slavery like in ancient rome', 'roman slaves', 'how many slaves in ancient rome', 'how did romans get slaves',
      'roman manumission freedmen', 'spartacus slave revolt', 'were roman slaves treated well',
    ],
    content: `Slavery was everywhere in ancient Rome — at its height, perhaps 10–30% of the population of Italy were enslaved, and the whole economy depended on them. Slaves were legally "property" (chattel), with no rights, owned by an individual who could sell, punish, or (in earlier law) kill them. People became slaves mainly by being captured in war or by pirates, by being born to an enslaved mother, or by being sold for debt or as unwanted infants. What their life was like varied enormously: those sent to the mines, mills, galleys or big rural estates (latifundia) faced brutal, often short lives; household slaves in a wealthy city home might be cooks, cleaners, hairdressers, secretaries, or child-minders; and educated slaves (often Greeks) worked as tutors, doctors, accountants and estate managers, sometimes with real influence and savings. A master could free a slave ("manumission"), and freed slaves ("libertini") became citizens, though with some restrictions — but their freeborn children were full citizens, so ex-slave families sometimes rose to wealth and status. The largest slave revolt, led by the gladiator Spartacus (73–71 BC), took a huge Roman army to crush; 6,000 captured rebels were crucified along the Appian Way. (This has nothing to do with the enslavement of the Israelites in Egypt.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roman-senate',
    title: 'What the Roman Senate Was',
    category: 'Ancient Rome',
    keywords: [
      'what was the roman senate', 'how did the roman senate work', 'how many senators in rome', 'what did the roman senate do',
      'senatus consultum', 'roman senate republic vs empire', 'were roman senators elected',
    ],
    content: `The Roman Senate was Rome's most prestigious governing body — a council of the city's leading men, NOT an elected chamber with fixed terms. Membership was essentially for life: you joined after holding a senior elected magistracy (quaestor and above), and were enrolled by the censors, who could also expel members for misconduct. It had about 300 members in the Republic, raised to 600 by Sulla and briefly to about 900 under Julius Caesar. Formally the Senate only "advised" the magistrates, issuing decrees called senatus consulta, but during the Republic it held enormous real power: it directed foreign policy and war, controlled state finances and the treasury, assigned provinces and governors, and its authority (auctoritas) carried huge weight. Under the emperors it kept its dignity and some administrative and judicial functions, but lost independent power — emperors packed it with their supporters and it largely ratified their decisions. (It was nothing like the US Senate, which has two elected senators per state serving staggered six-year terms.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roman-army',
    title: 'What the Roman Army Was Like',
    category: 'Ancient Rome',
    keywords: [
      'what was the roman army like', 'roman legion structure', 'how big was a roman legion', 'roman legionary equipment',
      'marian reforms', 'roman auxiliaries', 'how long did roman soldiers serve', 'why was the roman army so effective',
    ],
    content: `The Roman army was one of history's most effective fighting forces, built on organisation, engineering and discipline rather than individual heroics. Its core unit was the LEGION — around 5,000 heavy infantry, all Roman citizens, divided into 10 cohorts, each of about 6 centuries of ~80 men led by a centurion. Alongside the legions served AUXILIARIES — non-citizen troops from across the empire providing cavalry, archers, slingers and light infantry, who earned citizenship on discharge. Marius's reforms (from 107 BC) opened the ranks to the landless poor and turned the army professional: standardised equipment (the short sword gladius, the heavy throwing spear pilum, a large shield, segmented or mail armour, a helmet), standardised training and drills, and a fixed 20–25-year term of service with a land grant or cash bonus on retirement. Legions also functioned as engineers — building a fortified camp every night on the march, plus roads, bridges, forts and siege works. Their weaknesses showed against very mobile enemies (Parthian horse archers) and in dense forest or civil war, but for centuries they held a frontier stretching from Britain to the Euphrates.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-republic-vs-empire',
    title: 'Roman Republic vs Roman Empire',
    category: 'Ancient Rome',
    keywords: [
      'what was the roman republic versus the roman empire', 'roman republic vs roman empire', 'when did rome become an empire',
      'how did the roman republic end', 'what is the difference between a republic and an empire in rome', 'roman kingdom republic empire',
    ],
    content: `Rome went through three phases. The KINGDOM (traditionally 753–509 BC) was ruled by kings. The REPUBLIC (509–27 BC) replaced the king with elected officials so no one person could dominate: two consuls elected annually as heads of state and army, other magistrates (praetors, quaestors, aediles, censors), the powerful Senate, and citizen assemblies that voted on laws and elections and elected the officials. Power was deliberately split and time-limited. This system conquered Italy and then the Mediterranean, but the strain of empire, huge wealth gaps, and ambitious generals with loyal private armies broke it in a century of civil wars (the Gracchi, Marius vs Sulla, Caesar vs Pompey, then Octavian vs Antony). The EMPIRE (from 27 BC) began when Octavian — Julius Caesar's heir, who won the last civil war — took the name Augustus and, while keeping Republican titles and the Senate as a façade, concentrated real power in himself as "first citizen" (princeps) and later emperor. From then on Rome was ruled by emperors, with succession usually hereditary or by adoption, and the assemblies faded away. The Western Empire fell in 476 AD; the Eastern (Byzantine) half lasted until 1453.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fall-of-rome',
    title: 'What Caused the Fall of the Roman Empire',
    category: 'Ancient Rome',
    keywords: [
      'what caused the fall of the roman empire', 'why did rome fall', 'reasons for the fall of rome', 'was it barbarians that destroyed rome',
      'when did the western roman empire fall', 'decline of the roman empire',
    ],
    content: `Historians debate this endlessly, but it was a combination of long-term pressures on the Western Empire, not a single cause. Political instability: after about 235 AD the throne changed hands constantly by assassination and civil war ("the Crisis of the Third Century"), wasting armies and money on internal fights. Economic strain: heavy taxation, debased coinage and inflation, over-reliance on slave labour, and the cost of defending a vast frontier. Military problems: the army increasingly recruited non-Roman "barbarian" troops whose loyalty was uncertain, and it was stretched thin. External pressure: from the late 300s, whole peoples (Goths, Vandals, Huns, and others), themselves pushed west by the Huns, moved across the frontier — Rome was sacked by the Visigoths in 410 and the Vandals in 455. Structural: Diocletian split the empire into East and West (c. 285–395) for manageability, and the richer, more urbanised East survived while the West fragmented. The conventional end date is 476 AD, when the general Odoacer deposed the last Western emperor, the boy Romulus Augustulus, and didn't bother replacing him. (Gibbon also blamed Christianity and moral decline; most modern historians give those little weight.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roman-citizenship',
    title: 'What Roman Citizenship Was',
    category: 'Ancient Rome',
    keywords: [
      'what was roman citizenship', 'roman citizen rights', 'how did you become a roman citizen', 'edict of caracalla',
      'civis romanus sum', 'social war roman citizenship', 'what did roman citizens get',
    ],
    content: `Roman citizenship was a legal status carrying real privileges: the right to vote in the assemblies and to stand for public office, to make legally recognised contracts and marriages, to sue and be sued in Roman courts, protection from certain degrading punishments (a citizen couldn't be flogged or crucified without trial), and the right of appeal — the apostle Paul famously used "I appeal to Caesar." At first it belonged only to freeborn residents of Rome and their descendants. It was extended in stages: to Latin allies and then, after the bloody Social War (91–88 BC), to all free inhabitants of the Italian peninsula; then piecemeal to communities and individuals across the provinces, often as a reward for service or loyalty (retired auxiliary soldiers earned it). Finally, the Edict of Caracalla (Constitutio Antoniniana) in 212 AD granted citizenship to virtually every free person in the empire — partly to widen the tax base. Freed slaves also became citizens, with some limits, and their children had full rights.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-patricians-plebeians',
    title: 'Patricians vs Plebeians',
    category: 'Ancient Rome',
    keywords: [
      'what was the difference between patricians and plebeians', 'patricians vs plebeians', 'what is a patrician',
      'what is a plebeian', 'conflict of the orders', 'tribune of the plebs', 'roman class system',
    ],
    content: `In early Rome, patricians were members of a closed set of aristocratic families who claimed descent from the city's founding fathers; plebeians ("the plebs") were everyone else — the ordinary citizens, from poor labourers to wealthy merchants. At first patricians monopolised the priesthoods, the Senate and the magistracies, and marriage between the two orders was banned. Over roughly two centuries (the "Conflict of the Orders," ~494–287 BC) the plebeians won concessions largely by "seceding" — walking out of the city and refusing to serve in the army: they gained their own protective officials (tribunes of the plebs, whose persons were sacrosanct and who could veto state acts), the right to intermarry (445 BC), access to the consulship (367 BC), and finally, with the Lex Hortensia (287 BC), the power for plebeian assemblies to pass laws binding on everyone. After that, birth mattered far less than wealth: a rich plebeian family could be more powerful than a poor patrician one, and the real Roman elite became the "nobiles" — families of either order that had produced a consul.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roman-aqueduct',
    title: 'What a Roman Aqueduct Was',
    category: 'Ancient Rome',
    keywords: [
      'what was a roman aqueduct', 'how did roman aqueducts work', 'did aqueducts use pipes or channels', 'how did water flow in an aqueduct',
      'roman aqueduct gravity', 'pont du gard', 'aqua appia',
    ],
    content: `A Roman aqueduct was a system for bringing fresh water from distant springs and rivers into a city entirely by GRAVITY. Contrary to the popular image, it was not mostly a raised row of arches — most of an aqueduct's length was an enclosed channel (specus) running just below ground or at surface level, sloping downhill very gently (often only a few tens of centimetres of drop per kilometre). The famous arched bridges were used only where the channel had to cross a valley or low ground while keeping its careful gradient (the Pont du Gard in France is one). At the city end the water fed a distribution tank (castellum), then lead or ceramic pipes carried it to public fountains, baths, latrines, industry, and the homes of those who paid. Rome eventually had 11 aqueducts delivering enormous volumes of water. The first was the Aqua Appia (312 BC); the longest ran over 90 km. They needed constant maintenance (a dedicated staff, the "aquarii") because of leaks and mineral build-up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roman-triumph',
    title: 'What a Roman Triumph Was',
    category: 'Ancient Rome',
    keywords: [
      'what was a roman triumph', 'roman triumphal parade', 'what happened in a triumph', 'memento mori slave triumph',
      'triumphal chariot horses', 'who was allowed a triumph', 'roman general parade rome',
    ],
    content: `A triumph was the greatest honour a victorious Roman general could receive — a huge ceremonial procession through the city of Rome. To qualify, a commander needed a major victory over a foreign enemy (thousands of enemy dead) that ended a war, and the Senate had to vote him the honour. The parade went along a fixed route to the Temple of Jupiter on the Capitoline Hill and included: the general's soldiers, magistrates and senators; wagons of plundered treasure and captured weapons and standards; paintings and models of the conquered lands; exotic animals; and the most important enemy captives, sometimes executed at the end. The general himself rode a four-horse chariot (quadriga), his face painted red like the statue of Jupiter, wearing a purple-and-gold toga and holding a laurel branch — and, by tradition, a slave stood behind him holding a golden crown over his head and whispering a reminder that he was only a man ("memento mori" / "respice post te, hominem te memento"). Under the emperors, full triumphs were reserved for the imperial family, and generals got lesser honours.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-daily-life-rome',
    title: 'Daily Life in Ancient Rome',
    category: 'Ancient Rome',
    keywords: [
      'what was daily life like in ancient rome', 'how did romans live', 'roman houses insulae domus', 'what did romans eat',
      'roman daily routine', 'what was a roman day like', 'roman street life',
    ],
    content: `For most people in the city of Rome, life meant living in an "insula" — a cramped, often shoddily built apartment block up to six or seven storeys, with no running water above the ground floor, shared latrines or a chamber pot, real fire risk, and constant noise from the streets below (wheeled traffic was banned in daylight, so carts rumbled all night). The wealthy lived in a "domus," a single-storey house built around a courtyard, or a country villa, staffed by slaves. The day started at dawn; a poor man might queue for the free or cheap grain dole and then look for casual work, while a rich patron received his "clients" in the morning "salutatio." Meals were light in the morning and midday (bread, cheese, olives, fruit; many ate from street food shops called thermopolia because home cooking was dangerous in an insula), with the main meal, the "cena," in the late afternoon. Afternoons often meant the public baths — for washing, exercise, gossip and business — and there was no weekly rest day, but the calendar was studded with dozens of public holidays and free games. Family life centred on the "paterfamilias," the male head with legal authority over the household.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cicero',
    title: 'Who Cicero Was',
    category: 'Ancient Rome',
    keywords: [
      'who was cicero', 'marcus tullius cicero', 'cicero orator philosopher', 'catiline conspiracy cicero',
      'cicero philippics against antony', 'why was cicero important', 'how did cicero die',
    ],
    content: `Marcus Tullius Cicero (106–43 BC) was Rome's greatest orator, a leading lawyer, politician and philosopher, and one of the most influential prose writers in Western history. A "new man" from outside the old aristocracy, he rose by his speaking ability to become consul in 63 BC, when he exposed and crushed the Catiline conspiracy — a plot to overthrow the state — and had the ringleaders executed without trial, which later got him exiled for a time. Politically he championed the traditional Republic against the strongmen of the age (Caesar, then Antony), and after Caesar's assassination he attacked Mark Antony in a series of ferocious speeches called the "Philippics." That cost him his life: Antony had him proscribed and killed in 43 BC, and his head and hands were displayed on the speaker's platform in the Forum. His letters, speeches and philosophical works (on duty, friendship, old age, the nature of the gods) survived in bulk, shaped Latin as a literary language, and were rediscovered with huge effect in the Renaissance and the Enlightenment.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-marcus-aurelius',
    title: 'Who Marcus Aurelius Was',
    category: 'Ancient Rome',
    keywords: [
      'who was marcus aurelius', 'marcus aurelius stoic philosopher', 'meditations marcus aurelius', 'five good emperors',
      'marcmarcus aurelius commodus', 'antonine plague', 'the philosopher emperor',
    ],
    content: `Marcus Aurelius was Roman emperor from 161 to 180 AD, the last of the so-called "Five Good Emperors" and the last ruler of the Pax Romana. He is remembered as the "philosopher emperor": a committed Stoic who, during long military campaigns on the Danube frontier against Germanic tribes (the Marcomannic Wars), kept a private notebook of reflections on duty, mortality, self-control and accepting what you cannot change. That notebook, never meant for publication, survives as the "Meditations," one of the most widely read works of practical philosophy. His reign was hard: the Marcomannic Wars, the devastating Antonine Plague (probably smallpox, brought back by troops from the East, which killed millions), and financial strain. His great failure was the succession — instead of choosing a capable adopted heir as his predecessors had, he was succeeded by his own son Commodus, an erratic and brutal ruler whose reign is often taken to mark the beginning of Rome's long decline.`,
    createdAt: Date.now(),
  },
];
