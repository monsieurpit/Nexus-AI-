import { KnowledgeItem } from '../../types';

// Batch 50 (modern world history) gap-fills. Live misses on nexus-4b:
// "what was the Russian Revolution" -> a Gregorian-calendar-adoption web dump;
// "what was colonialism" -> "a lasting effect of how colonial-era narratives
// framed the continent"; "WW1 causes" -> named the Treaty of Versailles as a
// cause (it came after WW1); "Scientific Revolution" -> "sparking Gutenberg's
// printing press" (backwards); "Space Race" -> "started with Gagarin, ended
// with the ISS"; "the Enlightenment" -> a Cicero tangent then rambling.
export const MODERN_HISTORY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-russian-revolution',
    title: 'What the Russian Revolution Was',
    category: 'History',
    keywords: [
      'what was the russian revolution', 'russian revolution 1917', 'february and october revolution', 'bolsheviks lenin',
      'why did the tsar fall', 'how did the soviet union begin', 'reds vs whites russian civil war',
    ],
    content: `The Russian Revolution of 1917 was actually two revolutions in one year. The FEBRUARY Revolution: strikes and bread riots in Petrograd, joined by mutinying soldiers, forced Tsar Nicholas II to abdicate, ending over 300 years of Romanov rule; a weak Provisional Government took over but kept Russia in World War I. The OCTOBER Revolution: the Bolsheviks, a radical Marxist party led by Vladimir Lenin, seized power in an armed takeover, promising "peace, land and bread." Causes: catastrophic losses and food shortages in WWI, an autocratic and out-of-touch monarchy, extreme inequality between landowners and peasants, and industrial unrest. The Bolsheviks pulled Russia out of the war (the harsh Treaty of Brest-Litovsk, 1918), executed the Tsar and his family, and fought a brutal civil war (1918–1922) between their "Red" army and the anti-communist "Whites," which they won. Out of it came the Soviet Union (USSR, 1922), the world's first communist state; after Lenin's death in 1924, Stalin took control.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-was-colonialism',
    title: 'What Colonialism Was',
    category: 'History',
    keywords: [
      'what was colonialism', 'what is colonialism', 'difference between colonialism and imperialism', 'scramble for africa',
      'european colonial empires', 'settler colonialism', 'effects of colonialism',
    ],
    content: `Colonialism is the practice of one country taking political and economic control over territory outside its borders, settling people there and/or ruling the existing population, and exploiting the land's resources and labour for the benefit of the "mother country." European colonialism unfolded in waves: from the late 1400s Spain and Portugal (and later Britain, France and the Netherlands) conquered and colonised the Americas, devastating Indigenous populations with violence and disease and importing enslaved Africans; from the late 1700s to the early 1900s the powers seized much of Asia (the British Raj in India, the Dutch East Indies) and, in the "Scramble for Africa" (roughly 1881–1914), carved up nearly the entire African continent among themselves, drawing borders with no regard for existing peoples. Colonisers typically extracted raw materials, imposed their language, religion, laws and economy, and set up a racial hierarchy. Most colonies became independent after World War II (decolonization), but the borders, economic dependencies and social divisions colonialism created still shape the world. "Imperialism" is the broader idea/ideology of dominating others; colonialism is one way of doing it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ww1-causes-fix',
    title: 'What Caused World War I',
    category: 'History',
    keywords: [
      'what caused world war 1', 'causes of ww1', 'assassination franz ferdinand', 'the alliance system ww1',
      'MAIN causes of world war 1', 'why did the assassination cause a world war', 'was the treaty of versailles a cause of ww1',
    ],
    content: `The spark for World War I was the assassination of Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, by the Bosnian Serb Gavrilo Princip in Sarajevo on 28 June 1914. But the reason a local killing became a world war lies in the underlying conditions, often summarised as MAIN: MILITARISM (an arms race, especially Britain–Germany naval rivalry, and war plans on hair-trigger timetables); ALLIANCES (two armed camps — the Triple Alliance of Germany, Austria-Hungary and Italy, and the Triple Entente of France, Russia and Britain — so a war between two members pulled in the rest); IMPERIALISM (competition for colonies and prestige, and Austria-Hungary and Russia both meddling in the crumbling Ottoman Balkans); and NATIONALISM (Slav nationalism straining Austria-Hungary, French desire to reverse the loss of Alsace-Lorraine, and general jingoism). After the assassination, Austria-Hungary (backed by Germany) issued Serbia an ultimatum; Russia mobilised to defend Serbia; Germany declared war on Russia and France and invaded neutral Belgium, bringing in Britain. The Treaty of Versailles (1919) came AFTER the war ended it — it's often blamed for causing World War TWO, not World War I.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-the-enlightenment',
    title: 'What the Enlightenment Was',
    category: 'History',
    keywords: [
      'what was the enlightenment', 'the age of reason', 'enlightenment thinkers', 'locke voltaire rousseau montesquieu kant',
      'enlightenment ideas', 'how did the enlightenment influence revolutions', 'enlightenment and the church',
    ],
    content: `The Enlightenment (the "Age of Reason") was an intellectual and cultural movement in Europe and its colonies, roughly from the late 1600s to about 1800, centred on France, Britain and Scotland. Building on the Scientific Revolution, its thinkers argued that human reason, observation and debate — not tradition, superstition, or the authority of kings and the Church — should be the basis for knowledge, morality, law and government. Core ideas: individual liberty and natural rights; religious tolerance and separation of church and state; government by consent, with a social contract between rulers and ruled; the separation of powers (Montesquieu) to prevent tyranny; free inquiry, free speech and a free press; and a belief in progress and the improvability of society through education and reform. Key figures include John Locke, Voltaire, Jean-Jacques Rousseau, Montesquieu, Denis Diderot (the Encyclopédie), Immanuel Kant, David Hume, and Adam Smith. These ideas directly inspired the American Declaration of Independence and Constitution and the French Revolution, and underpin modern democracy, human rights and secular government.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scientific-revolution',
    title: 'What the Scientific Revolution Was',
    category: 'History',
    keywords: [
      'what was the scientific revolution', 'scientific revolution 16th 17th century', 'copernicus galileo kepler newton',
      'the scientific method history', 'heliocentrism revolution', 'the royal society', 'francis bacon descartes',
    ],
    content: `The Scientific Revolution was the transformation in how Europeans understood the natural world, roughly from Copernicus in 1543 to Newton in 1687. Its central shift was away from relying on ancient authorities (Aristotle, Ptolemy, Galen) and toward knowledge built from systematic observation, controlled experiment and mathematics — the "scientific method," argued for by Francis Bacon and René Descartes. Landmark advances: Copernicus put the Sun, not the Earth, at the centre of the cosmos; Kepler worked out that planets move in ellipses; Galileo used the telescope to find evidence for this and pioneered experimental physics (and was tried by the Inquisition for it); Vesalius and Harvey overturned old anatomy and showed how blood circulates; and Isaac Newton unified it all with his laws of motion and universal gravitation, showing the heavens and the Earth obey the same maths. New institutions (the Royal Society, 1660) and journals spread findings. (The printing press, from the 1440s, made this possible by spreading books cheaply — it PRECEDED the Scientific Revolution and enabled it, it wasn't a product of it.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-space-race',
    title: 'What the Space Race Was',
    category: 'History',
    keywords: [
      'what was the space race', 'space race cold war', 'sputnik 1957', 'first man in space gagarin', 'apollo 11 moon landing',
      'when did the space race end', 'usa vs ussr space',
    ],
    content: `The Space Race was a Cold War competition, mainly between the United States and the Soviet Union (1955–1975), to achieve firsts and demonstrate technological and ideological superiority through spaceflight. It BEGAN when the USSR launched Sputnik 1, the first artificial satellite, on 4 October 1957 — a shock to the US that led to the creation of NASA (1958). Soviet firsts kept coming: first animal in orbit (Laika, 1957), first human in space (Yuri Gagarin, April 1961), first woman (Valentina Tereshkova, 1963), first spacewalk (1965). President Kennedy responded in 1961 by committing the US to landing a man on the Moon before the decade was out, and NASA achieved it with Apollo 11 on 20 July 1969 (Neil Armstrong and Buzz Aldrin). That Moon landing is usually taken as the point the US "won" the race; the symbolic end came with the cooperative Apollo–Soyuz docking in orbit in 1975. It drove huge advances in computing, materials, rocketry and satellites. (It did not "end with the ISS," which is a later, cooperative project begun in 1998.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-french-revolution',
    title: 'What the French Revolution Was',
    category: 'History',
    keywords: [
      'what was the french revolution', 'french revolution 1789', 'storming of the bastille', 'reign of terror robespierre',
      'execution of louis xvi', 'liberty equality fraternity', 'why did the french revolution happen',
    ],
    content: `The French Revolution (1789–1799) overthrew France's absolute monarchy and its rigid society of privileged nobles and clergy versus an over-taxed common people (the "Third Estate"). Causes: a state bankruptcy made worse by helping in the American Revolution, bad harvests and bread prices, resentment of aristocratic privilege, and Enlightenment ideas about rights and popular sovereignty. Key events: King Louis XVI called the Estates-General (1789) for the first time in 175 years; the Third Estate broke away as a National Assembly; a Paris crowd stormed the Bastille prison on 14 July 1789 (now the national holiday); the Assembly abolished feudal privileges and issued the Declaration of the Rights of Man and of the Citizen. The Revolution radicalised: the monarchy was abolished and Louis XVI and Marie Antoinette were guillotined (1793); the "Reign of Terror" under Robespierre executed thousands of suspected enemies before he too was guillotined (1794). A conservative phase (the Directory) followed, ended by Napoleon Bonaparte's coup in 1799. Its slogan "Liberté, égalité, fraternité" and its assault on inherited privilege reshaped modern politics across Europe.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-transatlantic-slave-trade',
    title: 'What the Transatlantic Slave Trade Was',
    category: 'History',
    keywords: [
      'what was the transatlantic slave trade', 'middle passage', 'triangular trade', 'how many africans were enslaved',
      'when was slavery abolished', 'atlantic slave trade facts', 'which countries ran the slave trade',
    ],
    content: `The transatlantic (Atlantic) slave trade was the forced transportation of enslaved Africans across the Atlantic Ocean to the Americas, from the 1500s to the 1800s — an estimated 12.5 million people put on ships, of whom about 10.7 million survived the voyage. European traders (Portugal and Britain being the largest, then France, Spain, the Netherlands) exchanged manufactured goods on the African coast for captives sold by African and Arab middlemen, shipped them in horrific, often deadly conditions (the "Middle Passage"), and sold them in the Americas to work — mostly on sugar, tobacco, cotton and coffee plantations in Brazil, the Caribbean and what became the southern United States. The crops and raw materials went back to Europe (the "triangular trade"). It was built on and entrenched racial slavery and modern racism, enriched port cities and industries in Europe and the Americas, and depopulated regions of West and Central Africa. Britain abolished the trade in 1807 and slavery in its colonies in 1833; the United States ended the trade in 1808 but slavery only with the Civil War and the 13th Amendment (1865); Brazil was the last major country to abolish it, in 1888.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-partition-of-india',
    title: 'What the Partition of India Was',
    category: 'History',
    keywords: [
      'what was the partition of india', 'india pakistan partition 1947', 'radcliffe line', 'partition violence and migration',
      'why was india partitioned', 'east and west pakistan', 'kashmir dispute origin',
    ],
    content: `The Partition of India was the 1947 division of the British Indian Empire, at the moment of independence, into two new states: a Hindu-majority India and a Muslim-majority Pakistan (the latter in two wings, West Pakistan and, 1,600 km away, East Pakistan — which broke off to become Bangladesh in 1971). It came about because, as independence neared, the Muslim League under Muhammad Ali Jinnah demanded a separate Muslim homeland, fearing domination in a Hindu-majority India, while the Congress and Gandhi wanted a united India. Britain, eager to leave quickly, agreed to partition; a British lawyer, Cyril Radcliffe, drew the border ("the Radcliffe Line") in just a few weeks, with limited knowledge of the ground. The result was one of the largest and most violent mass migrations in history: 10–20 million people fled across the new borders (Hindus and Sikhs into India, Muslims into Pakistan), and communal massacres, especially in Punjab and Bengal, killed somewhere between several hundred thousand and two million people. The disputed princely state of Kashmir sparked the first India–Pakistan war and remains a flashpoint today.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-berlin-wall',
    title: 'What the Berlin Wall Was',
    category: 'History',
    keywords: [
      'what was the berlin wall', 'when was the berlin wall built', 'why was the berlin wall built', 'when did the berlin wall fall',
      'east germany west germany', 'the iron curtain', 'berlin wall 1989',
    ],
    content: `The Berlin Wall was a fortified barrier that physically divided the city of Berlin from 13 August 1961 until 9 November 1989. After World War II, Germany and its capital Berlin were split between the Western Allies and the Soviet Union; Berlin lay deep inside communist East Germany, and West Berlin became an island of the capitalist West. Between 1949 and 1961, about 2.5–3 million East Germans — often young and skilled — escaped to the West through Berlin, a humiliating drain the East German government stopped by suddenly sealing the border with barbed wire and then a concrete wall, ringed by a "death strip" of watchtowers, guard dogs, anti-vehicle obstacles and a shoot-to-kill order. At least 140 people were killed trying to cross. The Wall became the defining symbol of the Cold War and the "Iron Curtain." As communist governments across Eastern Europe collapsed in 1989 and East Germany allowed travel, crowds swarmed the crossings on 9 November and began tearing the Wall down; Germany was formally reunified less than a year later, on 3 October 1990.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-meiji-restoration',
    title: 'What the Meiji Restoration Was',
    category: 'History',
    keywords: [
      'what was the meiji restoration', 'meiji restoration 1868', 'end of the shogunate', 'how did japan modernize',
      'meiji restoration samurai', 'rich country strong army japan', 'why did japan open to the west',
    ],
    content: `The Meiji Restoration (from 1868) was the rapid, top-down transformation of Japan from an isolated feudal society into a modern industrial nation-state. For over 250 years Japan had been ruled by the Tokugawa shogunate (a military government) and largely closed to the outside world. When US Commodore Perry's warships forced Japan open in 1853–54, and unequal treaties followed, reformist samurai concluded that the shogunate had to go or Japan would be colonised like China. In 1868 they overthrew the shogun and "restored" political authority to the young Emperor Meiji (in practice a small group of leaders ruled in his name). They then abolished the feudal domains and the hereditary samurai class, built a national army with conscription, a modern navy, railways, telegraphs, factories, banks, a Western-style legal code and constitution (1889), and compulsory public education — sending students abroad and hiring foreign experts to learn Western methods (not to adopt the English language). The slogan was "rich country, strong army." Within a generation Japan defeated China (1895) and Russia (1905) and became a colonial power itself. Displaced samurai revolted (the Satsuma Rebellion, 1877) and were crushed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-decolonization',
    title: 'What Decolonization Was',
    category: 'History',
    keywords: [
      'what was decolonization', 'decolonization after world war 2', 'when did african countries become independent',
      'year of africa 1960', 'why did the european empires end', 'independence movements 20th century', 'legacy of colonialism',
    ],
    content: `Decolonization was the process, concentrated between about 1945 and 1975, by which dozens of colonies in Asia, Africa, the Caribbean and the Pacific gained independence from the European empires (mainly Britain, France, the Netherlands, Belgium and Portugal). It was driven by: the empires' exhaustion and bankruptcy after World War II; the war having discredited European claims of superiority and mobilised colonial peoples (many fought for the empires); strong nationalist and independence movements with charismatic leaders (Gandhi and Nehru in India, Nkrumah in Ghana, Ho Chi Minh in Vietnam, Sukarno in Indonesia); pressure from the new United States and USSR, both officially anti-colonial and competing for the new states' loyalty; and the UN promoting self-determination. Some transitions were relatively peaceful (India 1947, Ghana 1957 — the first sub-Saharan African colony to go, then "the Year of Africa" in 1960 when 17 countries became independent); others were long and bloody (Algeria against France, Indonesia against the Netherlands, Kenya's Mau Mau, the Portuguese colonial wars to 1975). The colonial-era borders, single-crop economies and internal divisions left many new states struggling.`,
    createdAt: Date.now(),
  },
];
