import { KnowledgeItem } from '../../types';

// Batch 59 (explorers & discovery) gap-fills. Live misses on nexus-4b:
// "who was James Cook" -> a pressure-cooking / reaction-rate web dump;
// "who reached the North Pole first" -> "Amundsen, on foot, June 21 1909"
// (wrong on all three); "Trans-Siberian expedition history" -> "there's no
// Trans-Siberian expedition... Magellan didn't go through Siberia";
// "Northwest Passage search" -> a definition-of-the-passage web dump; "Amerigo
// Vespucci" -> "he sailed with Columbus"; "Hernan Cortes" -> "rolled up to
// Mexico in 1521... allied with the Mexica who were angry at the Aztecs."
export const EXPLORERS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-james-cook',
    title: 'Who James Cook Was',
    category: 'History',
    keywords: [
      'who was james cook', 'captain cook voyages', 'james cook australia new zealand', 'cook antarctic circle',
      'how did captain cook die', 'james cook scurvy', 'captain cook hawaii',
    ],
    content: `James Cook (1728–1779) was a British Royal Navy officer, navigator and cartographer who led three great voyages of exploration in the Pacific and produced maps so accurate some were used into the 20th century. First voyage (1768–71): observed the transit of Venus from Tahiti, then charted the entire coastline of New Zealand and the previously unmapped east coast of Australia, landing at Botany Bay and claiming the east coast for Britain. Second voyage (1772–75): searched for a supposed southern continent, becoming the first known expedition to cross the Antarctic Circle and circumnavigating the globe at high southern latitudes. Third voyage (1776–79): searched (unsuccessfully) for the Northwest Passage from the Pacific side, and was the first European to make contact with the Hawaiian Islands — where, after a dispute over a stolen boat, he was killed by Hawaiians in February 1779. He also pioneered practical scurvy prevention (fresh food and sauerkraut) and mapped much of the Pacific, though his voyages also opened the region to European colonisation and its harms.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-north-pole-first',
    title: 'Who Reached the North Pole First',
    category: 'History',
    keywords: [
      'who reached the north pole first', 'cook peary north pole dispute', 'first person to the north pole',
      'when was the north pole first reached', 'amundsen north pole airship', 'wally herbert north pole 1969',
      'was peary the first to the north pole',
    ],
    content: `This is genuinely disputed and the honest answer is "no one is certain." The American Frederick Cook claimed to have reached the North Pole in 1908, and Robert Peary claimed it in 1909 — the two feuded bitterly, and modern analysis of both men's records and speeds makes it very likely NEITHER actually got to the exact Pole. The first fully verified expedition to reach the North Pole by any means was in 1926, when Roald Amundsen (who had already been first to the South Pole and first through the Northwest Passage), with Lincoln Ellsworth and Umberto Nobile, flew over it in the airship Norge — making Amundsen the first person confirmed to have reached BOTH poles. The first surface expedition confirmed to reach the Pole was Ralph Plaisted's snowmobile team in 1968, and the first confirmed to reach it on foot (dog sled, one way) was Wally Herbert's British Trans-Arctic Expedition in 1969. So it was reached by air decades before it was reached on the ground — not "on foot in 1909."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-northwest-passage-search',
    title: 'The Search for the Northwest Passage',
    category: 'History',
    keywords: [
      'what was the northwest passage search', 'why did explorers look for the northwest passage', 'franklin lost expedition',
      'who first navigated the northwest passage', 'northwest passage history', 'sir john franklin erebus terror',
      'is the northwest passage open now',
    ],
    content: `The Northwest Passage is a sea route through the Arctic islands of northern Canada that links the Atlantic and Pacific oceans. For roughly 400 years, from the 1500s on, European explorers (Frobisher, Davis, Hudson, Baffin, Parry and many others) searched for a navigable version of it as a shorter trade route to Asia that would bypass the long way round Africa or South America. The most famous disaster was Sir John Franklin's 1845 expedition: his two ships, HMS Erebus and HMS Terror, and all 129 men vanished into the ice; the dozens of search parties sent to find them ended up mapping most of the Canadian Arctic (and the wrecks were finally located by sonar in 2014 and 2016). The passage was first fully navigated by Roald Amundsen in a small ship over three years, 1903–1906, and it proved too shallow and ice-choked to be commercially useful. Since about 2007, melting sea ice from climate change has made it increasingly passable, raising questions about shipping, sovereignty and the Arctic environment.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-siberia-exploration',
    title: 'The Russian Exploration of Siberia',
    category: 'History',
    keywords: [
      'trans-siberian expedition history', 'how did russia explore siberia', 'yermak conquest of siberia', 'vitus bering great northern expedition',
      'when did russia reach the pacific', 'russian fur trade siberia', 'trans-siberian railway history',
    ],
    content: `Russia's push across Siberia was one of history's fastest territorial expansions. Starting with the Cossack leader Yermak Timofeyevich's campaign against the Khanate of Sibir in the 1580s, bands of Cossacks and fur traders (drawn by valuable sable and other pelts) advanced along the great east-flowing rivers, building fortified trading posts ("ostrogs") — and by 1639, just about 60 years later, they had reached the Pacific coast at the Sea of Okhotsk. Semyon Dezhnyov sailed through the strait between Asia and America in 1648 (before Bering). The scientific mapping came with the Great Northern Expedition (1733–1743), one of the largest exploration projects ever, led by the Danish-born officer Vitus Bering in Russian service, which charted the whole Arctic coast of Siberia and confirmed the Bering Strait and the route to Alaska. The famous Trans-Siberian RAILWAY, linking Moscow to Vladivostok over ~9,300 km, is a much later project, built between 1891 and 1916.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-amerigo-vespucci',
    title: 'Who Amerigo Vespucci Was and Why America Is Named After Him',
    category: 'History',
    keywords: [
      'who was amerigo vespucci and why is america named after him', 'amerigo vespucci new world', 'martin waldseemuller map 1507',
      'did vespucci sail with columbus', 'who named america', 'why isnt it called columbia',
    ],
    content: `Amerigo Vespucci (1454–1512) was a Florentine merchant and navigator. He did NOT sail with Columbus — he made his own voyages along the coast of South America around 1499–1502, on Spanish and then Portuguese expeditions. His important contribution was an idea: where Columbus went to his grave insisting he had reached the edge of Asia, Vespucci argued in widely-read published letters that the lands to the west were an entirely NEW continent ("Mundus Novus"), unknown to the ancients. In 1507 a German mapmaker, Martin Waldseemüller, produced the first map to show this new landmass as separate from Asia, and labelled its southern part "America" — a Latinised, feminine form of "Amerigo," to match the female names of the other continents (Europa, Asia, Africa). The name caught on and later spread to the northern continent too. So America is named after Vespucci not because he "discovered" it but because he was credited with recognising what it was.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hernan-cortes',
    title: 'Who Hernán Cortés Was',
    category: 'History',
    keywords: [
      'who was hernan cortes', 'cortes conquest of the aztec empire', 'fall of tenochtitlan', 'cortes and moctezuma',
      'tlaxcala alliance cortes', 'la malinche', 'why did the aztec empire fall so fast',
    ],
    content: `Hernán Cortés (1485–1547) was a Spanish conquistador who overthrew the Aztec (Mexica) Empire. He landed on the coast of Mexico in 1519 with about 500 men, burned his ships to prevent retreat, and marched inland toward the capital, Tenochtitlan. His decisive move was alliance-building: many indigenous peoples, above all the TLAXCALANS (not the Mexica themselves, who were the Aztecs), hated Aztec domination and tribute demands and joined him with tens of thousands of warriors. Aided by his translator and adviser La Malinche, Cortés entered Tenochtitlan peacefully and then took the emperor Moctezuma II hostage. After being driven out in 1520 (the "Noche Triste"), he besieged the city with his indigenous allies while a smallpox epidemic — a disease the Aztecs had no immunity to — killed a large part of the population, including much of the leadership. Tenochtitlan fell in August 1521, and Cortés became governor of "New Spain," built on the ruins of the Aztec capital.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-zheng-he',
    title: 'Who Zheng He Was',
    category: 'History',
    keywords: [
      'who was zheng he', 'ming treasure fleet', 'chinese treasure ships zheng he', 'zheng he voyages indian ocean',
      'why did china stop the treasure voyages', 'yongle emperor zheng he', 'zheng he vs columbus',
    ],
    content: `Zheng He (1371–1433) was a Chinese admiral, diplomat and eunuch of the early Ming dynasty. Under the Yongle Emperor he commanded the "treasure fleet" on seven enormous state expeditions across the Indian Ocean between 1405 and 1433 — reaching Southeast Asia, India, Sri Lanka, Arabia (Mecca) and the east coast of Africa (Malindi, in modern Kenya), from where he brought back exotic goods and animals, including a giraffe presented to the emperor. The fleets were vast — hundreds of ships and up to 28,000 men — and the largest "treasure ships" are traditionally described (with some dispute) as several times the length of Columbus's Santa Maria, which sailed decades later. Their purpose was to display Ming power, collect tribute, and establish diplomatic and trade links, not to conquer. After Zheng He's death and a shift in imperial priorities toward defending the northern land border, China halted the voyages, restricted overseas trade, and the records were largely destroyed — one of history's great "what ifs."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ibn-battuta',
    title: 'Who Ibn Battuta Was',
    category: 'History',
    keywords: [
      'who was ibn battuta', 'the rihla travelogue', 'ibn battuta vs marco polo', 'how far did ibn battuta travel',
      'ibn battuta china india maldives', 'medieval muslim traveller', 'ibn battuta qadi judge',
    ],
    content: `Ibn Battuta (1304 – c. 1369) was a Moroccan Muslim scholar from Tangier who became the most-travelled person of the pre-modern world. He set out in 1325 at age 21 to make the pilgrimage to Mecca and did not return home for good until about 1354 — nearly 30 years and roughly 117,000 km (about 73,000 miles), farther than Marco Polo. He crossed North Africa, Arabia, East Africa, Persia, Central Asia, India (where he served the Sultan of Delhi as a judge for years), the Maldives (another judgeship), Sri Lanka, Southeast Asia and China, and later West Africa across the Sahara to the Mali Empire. Because he was an educated Muslim, he could find work and hospitality throughout the vast Islamic world using shared law, language and faith. On his return the Sultan of Morocco had him dictate his account, the "Rihla" ("Journey"), which is a major source on the 14th-century world — its cities, rulers, customs and trade — though scholars think he embellished parts and may not personally have reached everywhere he describes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lewis-and-clark',
    title: 'Who Lewis and Clark Were',
    category: 'History',
    keywords: [
      'who was lewis and clark', 'corps of discovery expedition', 'lewis and clark louisiana purchase', 'sacagawea',
      'what was the purpose of the lewis and clark expedition', 'did lewis and clark reach the pacific', 'jefferson lewis and clark',
    ],
    content: `Meriwether Lewis and William Clark led the "Corps of Discovery," a US Army expedition sent by President Thomas Jefferson to explore the newly bought Louisiana Territory and the lands beyond it, from 1804 to 1806. The Louisiana Purchase (1803) had already doubled the size of the United States — the expedition's job was to MAP this vast unknown interior, look for a practical water route across the continent to the Pacific ("the Northwest Passage" by river), record the plants, animals, geography and peoples, and establish trade and diplomatic relations with the Native American nations. Setting out from near St. Louis, they travelled up the Missouri River, over the Rocky Mountains, and down the Columbia River, reaching the Pacific Ocean in Oregon in late 1805, then returned. They were guided and aided by, among others, the Shoshone woman Sacagawea, whose presence with her infant also signalled to tribes that the party was not a war party. They found no easy water route, but their maps, journals and specimens opened the West to American settlement.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-david-livingstone',
    title: 'Who David Livingstone Was',
    category: 'History',
    keywords: [
      'who was david livingstone', 'livingstone source of the nile', 'dr livingstone i presume stanley', 'livingstone victoria falls',
      'livingstone anti-slavery africa', 'how did david livingstone die', 'livingstone missionary explorer',
    ],
    content: `David Livingstone (1813–1873) was a Scottish physician, Christian missionary and explorer, and one of the most famous Victorians. Over more than 30 years he travelled thousands of kilometres across south-central Africa, becoming the first European to see and name the huge waterfall the local Kololo people called "the smoke that thunders," which he renamed Victoria Falls after the Queen (1855), and crossing the continent coast to coast. His later years were consumed by a search for the source of the Nile, which he never found. Two things stand out in a more critical modern view: first, he was a determined campaigner AGAINST the Arab-Swahili slave trade in East Africa, and his reports helped drive its suppression; but second, his fame and mapping also helped open the interior to the European "Scramble for Africa" and colonisation. When contact with him was lost for years, the New York Herald sent the journalist Henry Morton Stanley to find him — Stanley did, at Ujiji on Lake Tanganyika in 1871, greeting him (by the legend) with "Dr Livingstone, I presume?" Livingstone refused to leave and died of malaria and dysentery in 1873; his heart was buried in Africa and his body carried to England.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-roald-amundsen',
    title: 'Who Roald Amundsen Was',
    category: 'History',
    keywords: [
      'who was roald amundsen', 'amundsen south pole 1911', 'amundsen northwest passage', 'first person to both poles',
      'amundsen vs scott race to the pole', 'how did amundsen die', 'amundsen belgica gjoa',
    ],
    content: `Roald Amundsen (1872–1928) was a Norwegian polar explorer, arguably the most successful in history. He was the first to sail the entire Northwest Passage, in the small ship Gjøa over 1903–1906, learning Arctic survival and dog-sledding from the Netsilik Inuit. He then beat Britain's Robert Falcon Scott in the "race to the South Pole," reaching it on 14 December 1911 with a well-planned, dog-powered journey and returning safely, while Scott's team reached the Pole a month later and died on the way back. In 1926 Amundsen (with Lincoln Ellsworth and Umberto Nobile) flew over the North Pole in the airship Norge — the first verified reaching of the North Pole and, since he had already been to the South Pole, the first person to reach BOTH poles and (with the Norge) the first to cross the Arctic Ocean. He disappeared in June 1928 while flying a rescue mission for Nobile, whose later airship had crashed; his body was never found.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-henry-the-navigator',
    title: 'Who Henry the Navigator Was',
    category: 'History',
    keywords: [
      'who was henry the navigator', 'prince henry portugal exploration', 'did henry the navigator sail', 'sagres school of navigation',
      'henry the navigator west africa', 'portuguese age of exploration henry', 'caravel henry the navigator',
    ],
    content: `Henry the Navigator (Infante Dom Henrique, 1394–1460) was a Portuguese prince who sponsored and organised the systematic exploration of the west coast of Africa in the early 1400s — the opening phase of the European Age of Exploration. Despite the nickname (given by later English writers), he was not a sailor himself and rarely went to sea. From his base in the Algarve he financed voyage after voyage of small, manoeuvrable ships (the caravel was developed for this work), pushing further south each time past "Cape Bojador," which sailors had feared, to reach the coasts of Senegal and Guinea. His motives were mixed: profit from a gold and (increasingly) an enslaved-African trade, spreading Christianity, gathering geographic knowledge, and hoping to link up with the legendary Christian king "Prester John." He died in 1460, decades before Bartolomeu Dias rounded the Cape of Good Hope (1488) and Vasco da Gama reached India (1498), but that success was built directly on the base of knowledge, ships and confidence Henry's programme created.`,
    createdAt: Date.now(),
  },
];
