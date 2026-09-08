import { KnowledgeItem } from '../../types';

// Batch 124 (notable inventions & their history). The inventions corpus was
// fairly good (printing press, light bulb, Wright brothers, penicillin
// discovery, transistor). Errors on nexus-4b: "steam engine" credited Watt
// with the FIRST practical engine (Newcomen, 1712); "telegraph and Morse code"
// attributed the telegraph to "the fucking idiot bell" (Samuel Morse); "who
// invented the battery" answered with the Bell Labs transistor team;
// "computer" only discussed microprocessors, no Babbage/ENIAC; "sewing
// machine" and "refrigerator/AC" were garbled and confused with each other;
// "anesthesia" gave only modern drug names, no history.
export const INVENTIONS_HISTORY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-inv-steam-engine',
    title: 'Who Invented the Steam Engine (Newcomen, Watt)',
    category: 'History of Technology',
    keywords: [
      'who invented the steam engine and how did it start the industrial revolution', 'thomas newcomen built the first practical atmospheric steam engine in 1712 used to pump water out of coal mines building on thomas saverys 1698 pump',
      'james watts 1769 improvement the separate condenser made it about four times more fuel efficient and practical for driving machinery factories and locomotives not the first engine',
      'watt also added rotary motion the sun and planet gear and the centrifugal governor his partnership with matthew boulton commercialised it',
    ],
    content: `The steam engine was not invented by one person, and it was NOT James Watt who built the first practical one. Thomas Savery patented a crude steam pump ("the Miner's Friend") in 1698. Thomas NEWCOMEN built the first genuinely practical steam engine in 1712 — an "atmospheric" engine that used steam to create a vacuum under a piston, which atmospheric pressure then pushed down; it was slow and hugely wasteful of coal but reliable, and hundreds were built over the next 60 years to pump water out of deep coal and tin mines. James WATT's contribution, patented in 1769, was a fundamental improvement: he added a separate condenser so the cylinder no longer had to be cooled and reheated every stroke, roughly quadrupling fuel efficiency. Working with the manufacturer Matthew Boulton, Watt then added a crank and "sun and planet" gear to turn the up-and-down motion into rotary motion, and a centrifugal governor to regulate speed — turning the steam engine from a mine pump into a source of power for spinning mills, factories, ironworks, and eventually railway locomotives and steamships. That is why Watt is associated with the Industrial Revolution even though he did not invent the engine.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-telegraph-morse',
    title: 'Who Invented the Telegraph and Morse Code',
    category: 'History of Technology',
    keywords: [
      'who invented the telegraph and morse code', 'samuel morse an american painter with the technician alfred vail developed a working single wire electric telegraph and the morse code of dots and dashes in the late 1830s and 1840s',
      'in britain william cooke and charles wheatstone built a working telegraph around the same time 1837 morses simpler system won out', 'the famous first message what hath god wrought sent washington to baltimore in 1844 the first transatlantic cable 1858 then 1866',
      'this is samuel morse not alexander graham bell who invented the telephone decades later',
    ],
    content: `The electric telegraph was developed in the late 1830s and 1840s by Samuel MORSE — an American portrait painter who turned to invention — working with the machinist Alfred Vail. Morse built a practical single-wire system and, with Vail, devised Morse code, in which each letter and number is a short pattern of electrical pulses ("dots" and "dashes") that an operator taps out on a key and another reads by ear or from a paper tape. In Britain, William Cooke and Charles Wheatstone independently built and patented a working (multi-wire, needle-pointing) telegraph at nearly the same time, in 1837; Morse's system spread more widely because it needed only one wire and a cheap key. Morse's celebrated first public message, "What hath God wrought," was sent from Washington to Baltimore on 24 May 1844. Telegraph lines then spread across continents, and the first (short-lived) transatlantic cable was laid in 1858, with a permanent one in 1866, collapsing the time to send a message across the world from weeks to minutes. (The telegraph is Morse's invention; Alexander Graham Bell invented the telephone more than 30 years later, in 1876.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-battery',
    title: 'Who Invented the Battery (Volta)',
    category: 'History of Technology',
    keywords: [
      'who invented the battery', 'alessandro volta invented the first true battery the voltaic pile in 1800 stacked discs of zinc and copper separated by brine soaked cloth the first source of steady electric current the volt is named for him',
      'it built on luigi galvanis frog leg experiments the lead acid rechargeable battery came from gaston plante in 1859 alkaline batteries in the 1950s',
      'the lithium ion battery from john goodenough stanley whittingham and akira yoshino in the 1970s and 80s 2019 nobel prize powers phones laptops and electric cars',
    ],
    content: `The battery was invented by the Italian physicist Alessandro Volta, who built the first one — the "voltaic pile" — in 1800. It was a tall stack of alternating discs of zinc and copper (or silver), each pair separated by a piece of cardboard or cloth soaked in salt water or acid. This was the first device that could deliver a steady, continuous electric current, as opposed to the brief static-electricity sparks known before, and it made possible the whole science of electrochemistry and electromagnetism that followed. The unit of electric potential, the "volt," is named after him. Volta's work grew out of a dispute with Luigi Galvani, who had made a frog's leg twitch by touching it with two different metals and thought he had found "animal electricity"; Volta showed the electricity came from the metals and the moist tissue, not the animal. Later milestones: Gaston Planté invented the rechargeable lead-acid battery in 1859 (still used to start cars); alkaline batteries were commercialised in the 1950s–60s; and the rechargeable lithium-ion battery — the work of Stanley Whittingham, John Goodenough, and Akira Yoshino across the 1970s and 1980s (2019 Nobel Prize in Chemistry) — is what powers phones, laptops, and electric vehicles today. (The battery has nothing to do with the transistor or its Bell Labs inventors.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-paper',
    title: 'How Paper Was Invented (Cai Lun, China)',
    category: 'History of Technology',
    keywords: [
      'how was paper invented', 'true paper a mat of macerated plant fibres originally hemp rags and mulberry bark pounded to pulp suspended in water drained on a screen pressed and dried was invented in china traditionally credited to the court official cai lun around 105 ad',
      'papyrus egypt around 3000 bce is a different thing a laminated writing surface made from strips of a reed not pulped fibre', 'paper spread west along the silk road reaching the islamic world after the battle of talas in 751 and europe via muslim spain by the 12th to 13th centuries',
    ],
    content: `True paper is a thin sheet made by suspending macerated plant fibres in water, draining the water off through a screen so the fibres mat together, then pressing and drying the sheet. It was invented in China; tradition credits the eunuch court official Cai Lun, who standardised and improved the process and presented it to the emperor around 105 AD, though archaeological fragments push the origin somewhat earlier. Early Chinese paper used hemp, old rags, fishnets, and the inner bark of the mulberry tree, pounded to a pulp. This is a genuinely different invention from PAPYRUS, which the Egyptians made from about 3000 BCE by laying strips cut from the pith of the papyrus reed in two crossed layers and pressing them into a laminated writing surface — papyrus is a woven mat of plant strips, not a sheet of reconstituted fibre. Papermaking spread slowly westward: to the Islamic world by the 8th century (legend says Chinese papermakers captured at the Battle of Talas in 751 taught the craft in Samarkand), and into Christian Europe through Muslim Spain and Italy by the 12th–13th centuries, where it gradually replaced expensive parchment (animal skin) and, together with the printing press, made cheap books possible.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-internal-combustion-car',
    title: 'Who Invented the Internal Combustion Engine and the Automobile',
    category: 'History of Technology',
    keywords: [
      'who invented the internal combustion engine and the automobile', 'etienne lenoir built an early inefficient two stroke gas engine in 1860 nikolaus otto built the first practical four stroke engine the otto cycle in 1876',
      'karl benz built the first practical automobile powered by an internal combustion engine the benz patent motorwagen 1885 to 1886 generally considered the first true car gottlieb daimler and wilhelm maybach developed a fast engine and fitted it to a carriage the same period',
      'rudolf diesel not ernst invented the compression ignition diesel engine in 1897 fords model t 1908 and the moving assembly line made cars affordable',
    ],
    content: `The internal combustion engine developed over decades. Étienne Lenoir built a commercially sold but very inefficient gas engine in 1860. The breakthrough was Nikolaus OTTO's practical four-stroke engine of 1876 (intake, compression, power, exhaust — still called the "Otto cycle" and used in almost every petrol engine today). The AUTOMOBILE followed: Karl BENZ built and patented the first practical car powered by an internal combustion engine, the three-wheeled Benz Patent-Motorwagen, in 1885–86, and it is generally recognised as the first true automobile. Gottlieb Daimler and Wilhelm Maybach, working separately in the same years, built a lightweight high-speed engine and mounted it first on a two-wheeler and then on a carriage. Rudolf DIESEL (his first name was Rudolf, not Ernst) invented the compression-ignition diesel engine in 1897, which ignites fuel by the heat of compression rather than a spark and is far more efficient for heavy work. Cars remained expensive playthings until Henry Ford's Model T (1908) and his moving assembly line (1913) cut the price and the build time enough to put a car within reach of ordinary families.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-computer-history',
    title: 'Who Invented the Computer and What the First Computer Was',
    category: 'History of Technology',
    keywords: [
      'who invented the computer and what was the first computer', 'charles babbage designed the never built analytical engine in the 1830s a mechanical general purpose computer ada lovelace wrote what is considered the first algorithm for it',
      'the first working programmable computers were the electromechanical z3 konrad zuse 1941 the british colossus 1943 to 1944 codebreaking and the american eniac 1945 ballistics room sized vacuum tube machines',
      'the stored program von neumann architecture 1945 is the basis of all modern computers then the transistor 1947 the integrated circuit 1958 and the microprocessor intel 4004 1971 miniaturised it',
    ],
    content: `"The computer" has no single inventor. The conceptual origin is Charles BABBAGE, who in the 1830s designed the Analytical Engine, a mechanical general-purpose programmable calculating machine with a "mill" (processor), "store" (memory), and punched-card input — it was never built in his lifetime, but Ada LOVELACE, writing notes on it in 1843, produced what is generally called the first published algorithm intended for a machine. The first WORKING programmable digital computers were built around World War II: Konrad Zuse's electromechanical Z3 in Germany (1941), the British Colossus machines used to break the Lorenz cipher (1943–44), and the American ENIAC (1945), a room-sized machine of ~18,000 vacuum tubes built for artillery calculations. The decisive idea for modern computing was the "stored-program" concept — keeping the instructions in the same memory as the data — described in John von Neumann's 1945 report and first implemented in machines like the Manchester "Baby" (1948) and EDSAC (1949); this "von Neumann architecture" is still how essentially every computer works. What followed was miniaturisation: the transistor (1947) replaced the vacuum tube, the integrated circuit (1958) put many transistors on one chip, and the microprocessor (Intel 4004, 1971) put a whole processor on one chip, which in turn made the personal computer possible (Altair 1975, Apple II 1977, IBM PC 1981).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-refrigeration-ac',
    title: 'Who Invented the Refrigerator and Air Conditioning',
    category: 'History of Technology',
    keywords: [
      'who invented the refrigerator and air conditioning', 'vapor compression refrigeration jacob perkins built the first working system in 1834 the first practical commercial refrigeration came from james harrison in the 1850s and carl von linde in the 1870s enabling the beer and meatpacking industries',
      'domestic electric refrigerators appeared from about 1913 to 1927 kelvinator frigidaire ge monitor top early ones used toxic ammonia or sulfur dioxide until freon a cfc thomas midgley 1928 later banned for damaging the ozone layer',
      'air conditioning willis carrier built the first modern electrical ac in 1902 for a printing plant to control humidity not comfort',
    ],
    content: `Both refrigeration and air conditioning use the vapor-compression cycle: a refrigerant is compressed (heating it), cooled and condensed to a liquid, then allowed to expand and evaporate, which absorbs heat from the space being cooled. The first working vapor-compression machine was built by Jacob Perkins in 1834. The first practical and commercial refrigeration systems came from James Harrison in Australia in the 1850s and, most importantly, Carl von Linde in Germany in the 1870s, whose reliable ammonia machines transformed the brewing and meatpacking industries and made shipping frozen meat across oceans possible. Domestic electric refrigerators for the home appeared between about 1913 and 1927 (Kelvinator, Frigidaire, and GE's famous "Monitor-Top"). Early units used toxic or flammable refrigerants — ammonia, sulphur dioxide, methyl chloride — until the chemist Thomas Midgley developed Freon (a chlorofluorocarbon) in 1928, which was safe indoors but was later found to destroy stratospheric ozone and was phased out under the 1987 Montreal Protocol. AIR CONDITIONING as we know it was invented by Willis Carrier, who built the first modern electrical air-conditioning system in 1902 — not for human comfort but to control the temperature and humidity of a Brooklyn printing plant so the paper and ink would behave; comfort cooling of theatres, shops, and homes came in the following decades.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-integrated-circuit',
    title: 'Who Invented the Integrated Circuit (Microchip)',
    category: 'History of Technology',
    keywords: [
      'who invented the microchip integrated circuit', 'the integrated circuit was invented independently by jack kilby at texas instruments in 1958 germanium and robert noyce at fairchild semiconductor in 1959 silicon using the planar process which is the practical manufacturable one',
      'kilby received the 2000 nobel prize in physics noyce co founded intel', 'putting many transistors resistors and their wiring on one small piece of semiconductor instead of soldering separate parts moores law 1965 predicted the transistor count doubling roughly every two years',
      'the transistor radio the regency tr-1 1954 by regency and texas instruments came just before this',
    ],
    content: `The integrated circuit — a whole electronic circuit with many transistors, resistors, and the wiring between them fabricated together on a single small chip of semiconductor — was invented independently and almost simultaneously by two people. Jack KILBY at Texas Instruments demonstrated the first working integrated circuit in September 1958, built on germanium with the connections still made by tiny gold wires. Robert NOYCE at Fairchild Semiconductor came up with a version in 1959 built on silicon using the "planar process," in which the components and their metal interconnections are all created in flat layers on the chip surface — this is the method that could actually be mass-produced, and it is the basis of all modern chips. Kilby received the 2000 Nobel Prize in Physics (Noyce had died in 1990 and the prize is not awarded posthumously); Noyce went on to co-found Intel. The integrated circuit is what made computing cheap and small: instead of soldering thousands of individual transistors together, an entire processor could be printed on one wafer. Gordon Moore's 1965 observation ("Moore's Law") that the number of transistors on a chip was doubling roughly every one to two years held for about 50 years and drove the exponential growth of computing power. (The pocket "transistor radio," the Regency TR-1 of 1954, made by Regency Electronics with Texas Instruments transistors, came just before the IC and first showed the public what miniaturised electronics could do.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-anesthesia',
    title: 'Who Invented Anesthesia',
    category: 'History of Technology',
    keywords: [
      'who invented anesthesia', 'the first public demonstration of surgical anesthesia was ether given by the dentist william t g morton at massachusetts general hospital on 16 october 1846 ether day',
      'crawford long had used ether for surgery earlier in 1842 but did not publish the dentist horace wells demonstrated nitrous oxide laughing gas in 1844 but the demo failed', 'chloroform followed james young simpson 1847 popularised when queen victoria used it in childbirth in 1853',
      'before this surgery was done as fast as possible on conscious patients held or strapped down',
    ],
    content: `Before the 1840s, surgery was a horror: operations were performed as fast as humanly possible on fully conscious patients who were held down or strapped to the table, and pain and shock killed many. The change came with inhaled anesthetics. Nitrous oxide ("laughing gas") had been known since the 1790s, and the dentist Horace Wells tried to demonstrate it for tooth extraction in 1844, but the demo went badly and he was discredited. Ether was the real breakthrough: the Georgia doctor Crawford Long used it to remove tumours painlessly in 1842 but did not publish his results. The event usually taken as the birth of anesthesia is "Ether Day," 16 October 1846, when the Boston dentist William T. G. Morton publicly gave ether to a patient at Massachusetts General Hospital while the surgeon John Collins Warren removed a neck tumour; the patient felt nothing, and the news spread around the world within months. Chloroform was introduced by the Scottish obstetrician James Young Simpson in 1847 and became respectable when Queen Victoria accepted it for the birth of her eighth child in 1853. Local and regional anesthesia (cocaine as a nerve block, 1884; spinal anesthesia, 1898) and modern intravenous agents came later.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-sewing-machine',
    title: 'Who Invented the Sewing Machine',
    category: 'History of Technology',
    keywords: [
      'who invented the sewing machine', 'elias howe patented a practical lockstitch sewing machine in 1846 in the united states isaac singer built a better more commercial version in 1851',
      'after singer lost a patent suit to howe several makers pooled their patents in the sewing machine combination of 1856 the first patent pool in us history', 'barthelemy thimonnier in france built an earlier chain stitch machine in 1830 but a mob of tailors fearing for their jobs destroyed his workshop',
      'the sewing machine was one of the first mass marketed home appliances and hugely cut garment making time',
    ],
    content: `The sewing machine came together in stages. The Frenchman Barthélemy Thimonnier built a working chain-stitch machine in 1830 and had 80 of them making army uniforms — until a mob of Parisian tailors, fearing for their livelihoods, broke into his workshop and destroyed the machines. The key American development was the lockstitch — a stitch made by an upper thread from a needle interlocking with a lower thread from a shuttle or bobbin, which is strong and doesn't unravel. Walter Hunt built an early lockstitch machine but never patented it; Elias HOWE patented a practical lockstitch machine in 1846. Isaac SINGER built a more usable and marketable version in 1851 (with a foot treadle, a straight needle moving up and down, and a presser foot). Singer was sued for patent infringement by Howe and lost, and in 1856 Singer, Howe, and two other firms formed the "Sewing Machine Combination," pooling their patents and licensing the whole industry — the first patent pool in US history. The Singer company then pioneered installment-plan selling and made the sewing machine one of the very first mass-marketed consumer appliances, cutting the time to sew a shirt from over 14 hours by hand to about one.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-photography',
    title: 'Who Invented Photography',
    category: 'History of Technology',
    keywords: [
      'who invented the camera and photography', 'the camera obscura projecting an image through a small hole was known for centuries the problem was fixing the image',
      'nicephore niepce made the first permanent photograph the view from the window at le gras around 1826 with an eight hour exposure louis daguerre developed the daguerreotype the first commercially successful process announced 1839',
      'william henry fox talbot invented the negative positive calotype process 1841 the ancestor of film george eastman made photography a mass hobby with the roll film kodak camera in 1888 you press the button we do the rest',
    ],
    content: `The camera itself is old — the "camera obscura," a dark box or room with a small hole that projects an inverted image of the scene outside onto the opposite wall, was described by Alhazen around 1000 AD and used by Renaissance artists as a drawing aid. The hard part of photography was chemically FIXING that projected image so it lasts. Nicéphore Niépce made the first surviving permanent photograph, "View from the Window at Le Gras," around 1826–27, using a pewter plate coated in light-sensitive bitumen and an exposure of about eight hours. His partner Louis Daguerre developed this into the daguerreotype — a sharp, one-of-a-kind image on a silvered copper plate — which was announced publicly in 1839 and became a worldwide craze; France bought the patent and gave the process "free to the world." At almost the same time, William Henry Fox Talbot in England invented the calotype (1841), which produced a paper NEGATIVE from which many positive prints could be made — the negative/positive principle that all film photography used afterward. George Eastman then made photography a mass hobby: in 1888 his Kodak camera came pre-loaded with a roll of flexible film for 100 exposures, and the customer mailed the whole camera back to the factory for developing and reloading — "You press the button, we do the rest."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-telescope-eyeglasses',
    title: 'Who Invented Eyeglasses and the Telescope',
    category: 'History of Technology',
    keywords: [
      'who invented eyeglasses and the telescope', 'eyeglasses convex lenses for presbyopia farsightedness appeared in northern italy pisa venice florence around 1285 to 1290 maker unknown concave lenses for myopia nearsightedness came in the 15th century bifocals attributed to benjamin franklin',
      'the telescope was invented by dutch spectacle makers hans lippershey and jacob metius who applied for patents in 1608 galileo did not invent it he built his own improved version in 1609 and was the first to turn it systematically to the sky discovering jupiters moons and the phases of venus',
    ],
    content: `EYEGLASSES: wearable spectacles were invented in northern Italy — around Pisa, Venice, and Florence — in the 1280s, with the first clear references to convex "reading stones" mounted in frames dating to about 1285–1290; the individual maker is unknown, and a sermon of 1306 refers to the art of making spectacles as barely twenty years old. These early glasses had convex lenses that helped older people with presbyopia (age-related farsightedness); concave lenses to correct myopia (nearsightedness) appeared in the 15th century. Benjamin Franklin is credited with inventing bifocals in the 1780s. TELESCOPE: it was invented by Dutch spectacle-makers — Hans Lippershey applied for a patent in October 1608, and Jacob Metius applied a few weeks later, with Zacharias Janssen sometimes also claimed. Galileo did NOT invent the telescope; hearing of the Dutch device in 1609, he quickly built his own much-improved version (about 20x magnification), and he was the first to point one systematically at the night sky, discovering the four large moons of Jupiter, the mountains of the Moon, the phases of Venus, and that the Milky Way is made of countless stars — observations that helped overturn the Earth-centred model.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-penicillin-mass-production',
    title: 'Penicillin: From Fleming to Mass Production (Florey and Chain)',
    category: 'History of Technology',
    keywords: [
      'who discovered penicillin and how did it become a drug', 'alexander fleming noticed penicillium mould killing bacteria on a plate in 1928 but he could not purify or produce it in useful amounts and largely set it aside',
      'howard florey ernst chain and norman heatley at oxford from 1939 to 1941 isolated purified and clinically proved penicillin then took the work to the united states where wartime industry scaled up production in time for the d day landings',
      'fleming florey and chain shared the 1945 nobel prize in medicine',
    ],
    content: `Alexander Fleming's 1928 discovery — noticing that a stray mould of the genus Penicillium had killed the bacteria around it on a culture plate at St Mary's Hospital, London — is the famous beginning of penicillin, but it was only the beginning. Fleming published his observation but could not extract the active substance in any useful quantity or keep it stable, and after a few years he largely moved on. The drug was made real a decade later at Oxford, where the pathologist Howard FLOREY, the biochemist Ernst CHAIN, and the technician Norman HEATLEY (whose improvised extraction apparatus was crucial) took up Fleming's paper, isolated and concentrated penicillin, and in 1940–41 proved it could cure otherwise-fatal bacterial infections in mice and then in patients. With Britain at war and unable to build the factories, Florey and Heatley travelled to the United States in 1941, where government labs and pharmaceutical companies (Pfizer, Merck, Squibb) developed deep-tank fermentation and scaled production up more than a thousand-fold — enough that penicillin was available to treat wounded Allied soldiers by the 1944 D-Day landings. Fleming, Florey, and Chain shared the 1945 Nobel Prize in Physiology or Medicine.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inv-telephone-meucci',
    title: 'The Telephone: Bell, Gray, and Meucci',
    category: 'History of Technology',
    keywords: [
      'who invented the telephone and the bell versus meucci and gray dispute', 'alexander graham bell received the first us patent for the telephone on 7 march 1876 and made the first intelligible telephone call days later mr watson come here i want to see you',
      'elisha gray filed a patent caveat describing a similar device the same day 14 february 1876 just hours after bells application feeding a long running dispute about whether bell had improperly seen grays design',
      'antonio meucci an italian immigrant had demonstrated a voice communication device years earlier and filed a cheap renewable caveat in 1871 but could not afford the fee to convert it to a full patent the us house of representatives passed a resolution in 2002 recognising his contribution',
    ],
    content: `Alexander Graham BELL was granted the first US patent for the telephone on 7 March 1876 and, a few days later, transmitted the first fully intelligible sentence — famously "Mr. Watson, come here, I want to see you" — to his assistant in the next room. His priority has been disputed ever since on two fronts. Elisha GRAY, an experienced electrical inventor, filed a "caveat" (a notice of an invention in progress) at the US Patent Office describing a very similar telephone using a liquid transmitter on the SAME DAY, 14 February 1876, apparently just hours after Bell's application was filed; and Bell's granted patent contained a liquid-transmitter method in a margin note that resembled Gray's, fuelling accusations — never proven in court, though Bell won every legal challenge — that Bell or his lawyer had improperly learned of Gray's design. Separately, Antonio MEUCCI, an impoverished Italian immigrant in New York, had built and demonstrated voice-transmitting devices ("teletrofono") from the late 1850s and filed a one-year, low-cost renewable caveat in 1871 but could not afford the $10 fee to renew it after 1874, so no full patent ever issued. In 2002 the US House of Representatives passed a resolution recognising Meucci's work and contribution, while Canada's parliament responded by re-affirming Bell.`,
    createdAt: Date.now(),
  },
];
