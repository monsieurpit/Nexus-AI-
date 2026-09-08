import { KnowledgeItem } from '../../types';

// Batch 66 (world history events, deeper). Strong category overall (~19/25).
// Real misses on nexus-4b: "what was the Cultural Revolution" opened with "I
// don't know jack about it" then drifted to the Enlightenment before
// recovering; "what was the Marshall Plan" said it "was casseurt's idea" and
// stayed vague; "what ended the Roman Empire" only gave the two dates with no
// causes; "why did the Berlin Wall fall" put the 1990 reunification before the
// 1989 fall.
export const WORLD_HISTORY_EVENTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-cultural-revolution',
    title: 'What the Cultural Revolution in China Was',
    category: 'History',
    keywords: [
      'what was the cultural revolution in china', 'mao cultural revolution 1966', 'red guards china', 'gang of four',
      'why did mao launch the cultural revolution', 'struggle sessions china', 'when did the cultural revolution end',
    ],
    content: `The Cultural Revolution was a decade of upheaval in China from 1966 to 1976, launched by Communist Party chairman Mao Zedong. Having lost influence after the disaster of the Great Leap Forward, Mao called on the youth to purge "capitalist" and "bourgeois" elements and revolutionary rivals from the party and society, and to defend Maoist thought. Millions of teenage "Red Guards" formed, attacking teachers, officials and intellectuals in public "struggle sessions," destroying temples, books and art ("the Four Olds"), and splitting into violent factions. Senior leaders including Deng Xiaoping and Liu Shaoqi were purged; universities closed; urban youth were "sent down" to the countryside. Radical leaders later known as the "Gang of Four," including Mao's wife Jiang Qing, drove the later phase. Estimates of deaths from persecution, factional fighting and suicide range from several hundred thousand to a few million. It ended with Mao's death in September 1976 and the arrest of the Gang of Four weeks later; the party has officially called it a catastrophe.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-marshall-plan',
    title: 'What the Marshall Plan Was',
    category: 'History',
    keywords: [
      'what was the marshall plan', 'european recovery program', 'who was the marshall plan named after', 'marshall plan 1948 1952',
      'how much did the marshall plan cost', 'why did the soviet union reject the marshall plan', 'george marshall secretary of state',
    ],
    content: `The Marshall Plan, officially the European Recovery Program, was a United States programme that sent about $13 billion in economic aid (roughly $150 billion in today's money) to rebuild Western Europe between 1948 and 1952, after the Second World War. It was named for US Secretary of State George C. Marshall, who proposed it in a 1947 speech; the aid funded raw materials, food, machinery and reconstruction, and required recipient countries to cooperate on economic planning. Its goals were both humanitarian and strategic: restore industrial output and trade, stabilise currencies, and blunt the appeal of communism in a devastated, hungry Europe. The offer was formally extended to the Soviet Union and Eastern Europe, but Stalin refused it and forced the countries in his sphere to decline, deepening the Cold War division of the continent. It is generally judged a major success and a model for later foreign-aid efforts.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fall-of-rome-causes',
    title: 'What Ended the Western Roman Empire',
    category: 'History',
    keywords: [
      'what ended the roman empire', 'why did the roman empire fall', 'fall of rome 476 ad', 'romulus augustulus odoacer',
      'barbarian invasions rome', 'causes of the decline of rome', 'did the eastern roman empire survive',
    ],
    content: `The traditional end date of the Western Roman Empire is 476 CE, when the Germanic commander Odoacer deposed the last western emperor, the teenager Romulus Augustulus, and did not replace him. But that was the end point of a long decline, not a single cause. Contributing factors historians emphasise: repeated invasions and mass migrations of Germanic and Hunnic peoples (Visigoths sacked Rome in 410, Vandals in 455), an overstretched frontier and shrinking tax base, chronic civil wars and rapid turnover of emperors, heavy reliance on non-Roman troops whose loyalty was to their commanders, economic troubles including debased coinage and declining trade, and the administrative split of the empire into western and eastern halves in 395, which left the poorer west more exposed. The eastern half, centred on Constantinople (the Byzantine Empire), was wealthier and survived for nearly another thousand years, until the Ottomans captured Constantinople in 1453.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-berlin-wall-fall',
    title: 'The Berlin Wall and Why It Fell',
    category: 'History',
    keywords: [
      'what was the berlin wall and why did it fall', 'when did the berlin wall fall', 'november 9 1989 berlin wall',
      'did german reunification cause the wall to fall', 'why did east germany build the berlin wall', 'checkpoint charlie',
    ],
    content: `The Berlin Wall was a fortified barrier built by communist East Germany starting on 13 August 1961 to seal off West Berlin, stopping the flood of East Germans (about 3.5 million had already left) escaping to the West through the city. It became the central symbol of the Cold War's division of Europe. It fell on the night of 9 November 1989: after months of mass protests and a wave of liberalisation across the Eastern bloc, and with Hungary already having opened its border, an East German official mistakenly announced at a press conference that citizens could cross "immediately." Crowds gathered at the checkpoints, overwhelmed guards opened the gates, and people climbed and began dismantling the wall. Note the order: the wall opened first (November 1989), and German reunification followed almost a year later, on 3 October 1990. The Soviet Union itself dissolved in December 1991.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scramble-for-africa',
    title: 'What the Scramble for Africa Was',
    category: 'History',
    keywords: [
      'what was the scramble for africa', 'berlin conference 1884 1885', 'european partition of africa', 'colonization of africa 19th century',
      'king leopold congo free state', 'how much of africa was colonized', 'effects of the scramble for africa',
    ],
    content: `The "Scramble for Africa" was the rapid invasion, occupation and colonisation of almost the entire African continent by European powers between roughly 1881 and 1914. Before it, Europeans controlled only about 10% of Africa, mostly coastal footholds; by 1914 they controlled about 90%, with only Ethiopia and Liberia remaining independent. The Berlin Conference of 1884–85, hosted by Bismarck, did not carve up Africa on a map directly but set the ground rules — chiefly "effective occupation," meaning a power had to actually administer territory to claim it, which accelerated the land grab. Belgium's King Leopold II took the Congo as personal property, where forced-labour rubber extraction killed millions. The borders drawn cut across ethnic and linguistic lines with no African input, and many of those arbitrary boundaries are still today's national borders, a lasting source of conflict. The motives were raw materials, markets, strategic position, national prestige, and missionary activity, enabled by new weapons (the Maxim gun), quinine against malaria, steamships and railways.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-apartheid-south-africa',
    title: 'What Apartheid in South Africa Was',
    category: 'History',
    keywords: [
      'what was apartheid in south africa', 'when did apartheid start and end', 'national party 1948 apartheid',
      'sharpeville massacre soweto uprising', 'nelson mandela anc apartheid', 'pass laws homelands bantustans', '1994 south africa election',
    ],
    content: `Apartheid (Afrikaans for "apartness") was the system of institutionalised racial segregation and white-minority rule enforced by law in South Africa from 1948, when the National Party won power, until the early 1990s. The population was classified by race; where people could live, work, go to school, and whom they could marry was dictated by law; "pass laws" controlled the movement of Black South Africans, and millions were forcibly relocated to impoverished "homelands" (Bantustans) and stripped of citizenship. Resistance was led by the African National Congress (ANC) and others; the state responded with bans, imprisonment and violence — the Sharpeville massacre (1960), the Soweto uprising (1976), and the imprisonment of Nelson Mandela and others from 1962/64. International sanctions, economic pressure and sustained internal protest forced the government to negotiate; President F. W. de Klerk lifted the bans and released Mandela in 1990. Apartheid law was repealed, and in April 1994 South Africa held its first fully multiracial election, which the ANC won, making Mandela president.`,
    createdAt: Date.now(),
  },
];
