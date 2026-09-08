import { KnowledgeItem } from '../../types';

// Batch 39 (inventions & discoveries) gap-fills. Live misses on nexus-4b:
// "who invented the camera" -> "Tim Berners-Lee did, apparently" (bleed from
// the WWW question); "history of electricity" -> "Edison showed up with AC"
// (Edison championed DC; Tesla/Westinghouse pushed AC); "Green Revolution" ->
// "high-yielding varieties thanks to genetic modification" (it was
// conventional breeding); "assembly line" -> "Bessemer process... chemical
// synthesis"; "transistor radio" -> a rant about Marconi and Tesla;
// "refrigeration" -> garbled inventor names; "history of antibiotics" -> a
// chemistry-of-beta-lactams web dump.
export const INVENTIONS_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-who-invented-camera',
    title: 'Who Invented the Camera',
    category: 'Inventions',
    keywords: [
      'who invented the camera', 'history of the camera', 'first photograph', 'who took the first photo', 'daguerreotype',
      'george eastman kodak', 'when was the digital camera invented', 'camera obscura',
    ],
    content: `The camera developed over centuries, not from one inventor. The "camera obscura" — a dark box or room projecting an image through a pinhole — was described in antiquity and used by artists for centuries, but it couldn't record anything. The first permanent PHOTOGRAPH was made by the Frenchman Nicéphore Niépce around 1826–27 ("View from the Window at Le Gras"), an 8-hour exposure on a pewter plate. His partner Louis Daguerre announced the daguerreotype in 1839 — sharp images on silvered copper — usually taken as the birth of practical photography (the same year Henry Fox Talbot in England produced the negative–positive process that all film later used). George Eastman made photography a mass activity with flexible roll film and the simple Kodak camera in 1888 ("you press the button, we do the rest"). The first digital camera sensor was built by Steven Sasson at Kodak in 1975. (This has nothing to do with Tim Berners-Lee, who invented the World Wide Web.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-history-of-electricity',
    title: 'A Short History of Electricity',
    category: 'Inventions',
    keywords: [
      'what is the history of electricity', 'who discovered electricity', 'war of the currents', 'AC vs DC edison tesla',
      'who invented the electric generator', 'faraday electromagnetic induction', 'when did homes get electricity',
    ],
    content: `Static electricity was known to the ancient Greeks (rubbed amber attracts). Serious study began in the 1600s–1700s (Gilbert, Franklin's kite experiment ~1752 showing lightning is electrical). The big leaps: Volta's battery (1800) gave the first steady current; Ørsted and Ampère (1820s) linked electricity and magnetism; Faraday's electromagnetic induction (1831) — moving a magnet near a coil makes current — is the principle behind every generator and transformer. In the 1880s came the "War of the Currents": Thomas Edison built the first power stations and lighting systems using DIRECT current (DC), while Nikola Tesla and George Westinghouse promoted ALTERNATING current (AC), which can be stepped up to high voltage for efficient long-distance transmission and stepped back down. AC won (helped by Tesla's practical AC motor and the 1893 Chicago World's Fair and Niagara Falls power project), and it's what the grid uses today. Electrification of homes spread through cities in the early 1900s and reached most rural areas only decades later.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-green-revolution',
    title: 'What the Green Revolution Was',
    category: 'History',
    keywords: [
      'what was the green revolution', 'green revolution norman borlaug', 'how did crop yields increase in the 20th century',
      'green revolution wheat rice', 'was the green revolution GMO', 'green revolution criticism',
    ],
    content: `The Green Revolution was a set of agricultural changes from roughly the 1940s–1970s that hugely increased crop yields in the developing world and is credited with averting mass famine, especially in Mexico, India, Pakistan and the Philippines. Its core was new high-yielding "dwarf" varieties of wheat and rice, bred by CONVENTIONAL selective breeding and crossbreeding — NOT genetic modification, which didn't exist yet. The dwarf plants put energy into grain rather than tall stalks and didn't fall over under heavy heads. The agronomist Norman Borlaug, working in Mexico (later the institute CIMMYT), led the wheat work and won the Nobel Peace Prize in 1970. These varieties only reached their potential with a package of inputs: synthetic nitrogen fertiliser, chemical pesticides, controlled irrigation, and mechanisation. Yields soared, but critics point to downsides: heavy dependence on fossil-fuel-based fertiliser and water, loss of crop diversity (monocultures), soil and water pollution, and benefits skewed toward larger farms.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-assembly-line',
    title: 'What the Assembly Line Was',
    category: 'Inventions',
    keywords: [
      'what was the assembly line', 'who invented the assembly line', 'henry ford model t assembly line', 'moving assembly line',
      'how did the assembly line change manufacturing', 'ford highland park', 'mass production history',
    ],
    content: `The moving assembly line is a way of manufacturing where the product moves along a line (on a conveyor) past workers who each stay in one place and repeatedly do one small task, instead of a team building a whole product from start to finish. Henry Ford's company installed the first full moving assembly line for a complete car at the Highland Park plant in 1913, to build the Model T. The effect was dramatic: the time to assemble a Model T chassis fell from over 12 hours to about 1.5 hours, the price dropped from around $850 to under $300 over the decade, and Ford could pay the famous $5-a-day wage. It made the car affordable for ordinary people and became the template for 20th-century mass production and consumer society. Ford drew on earlier ideas — the "disassembly" lines of Chicago meatpacking, interchangeable parts (Eli Whitney), and Frederick Taylor's time-and-motion studies. The trade-off was monotonous, high-turnover work, later a driver of labour organising and, eventually, automation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-transistor-radio',
    title: 'The Transistor Radio',
    category: 'Inventions',
    keywords: [
      'who invented the transistor radio', 'what was the first transistor radio', 'regency tr-1', 'sony tr-55',
      'why was the transistor radio important', 'first portable radio', 'transistor radio history',
    ],
    content: `A transistor radio is a small portable radio receiver that uses transistors instead of bulky, hot, fragile vacuum tubes — which made it pocket-sized and battery-powered. The first commercial transistor radio was the Regency TR-1, released in the United States in late 1954 (a collaboration between Texas Instruments, which supplied the transistors, and IDEA/Regency). It was expensive and not very good, but it proved the concept. Japan's fledgling Sony (then Tokyo Tsushin Kogyo) followed with the TR-55 in 1955 and the shirt-pocket TR-63 in 1957, and over the next decade sold tens of millions worldwide, establishing "Sony" as a global brand and Japan as an electronics power. The cheap transistor radio put music and news in teenagers' hands during the rise of rock and roll, spread news in the developing world, and was a major early driver of the miniaturisation that led to all modern portable electronics. (The transistor itself was invented at Bell Labs in 1947 by Bardeen, Brattain and Shockley.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-refrigeration-history',
    title: 'The History of Refrigeration',
    category: 'Inventions',
    keywords: [
      'who invented refrigeration', 'history of the refrigerator', 'first ice machine', 'who invented the fridge',
      'vapor compression refrigeration history', 'carl von linde', 'jacob perkins refrigeration', 'when did home fridges become common',
    ],
    content: `Mechanical refrigeration had no single inventor. William Cullen demonstrated artificial cooling by evaporation at Glasgow in 1748. Oliver Evans designed a vapour-compression system in 1805; Jacob Perkins built the first working vapour-compression refrigerating machine, using ether, and patented it in 1834. John Gorrie, a Florida doctor, built an ice-making machine in the 1840s to cool fever patients. Ferdinand Carré made an ammonia-absorption machine in 1859. Carl von Linde in Germany developed efficient industrial ammonia refrigeration from 1876, which transformed brewing, meatpacking and food shipping. The domestic electric refrigerator arrived in the 1910s–20s (Kelvinator, Frigidaire, General Electric's "Monitor Top" of 1927), and the invention of safe non-toxic Freon refrigerants in 1928 made home fridges practical and common through the 1930s–50s (Freon's CFCs were later banned for damaging the ozone layer). All of them use the same idea: a refrigerant absorbs heat inside by evaporating and releases it outside when compressed and condensed — moving heat, not "making cold."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-history-of-antibiotics',
    title: 'The History of Antibiotics',
    category: 'Inventions',
    keywords: [
      'what is the history of antibiotics', 'who discovered antibiotics', 'history of penicillin', 'first antibiotic',
      'antibiotic golden age', 'salvarsan sulfa drugs', 'how did antibiotic resistance start',
    ],
    content: `The first drug that specifically killed a disease-causing microbe was Salvarsan (arsphenamine), developed by Paul Ehrlich in 1909 for syphilis — a "magic bullet." In the 1930s came the sulfonamides ("sulfa drugs," from Prontosil, 1935), the first broadly used antibacterials. The turning point was penicillin: Alexander Fleming noticed in 1928 that a Penicillium mould killed bacteria on a contaminated plate, but he couldn't purify it. Howard Florey, Ernst Chain and their Oxford team turned it into a usable drug in 1940–41, and wartime mass-production in the US made it widely available by 1944 (Fleming, Florey and Chain shared the 1945 Nobel Prize). That launched the "golden age" (roughly 1940s–1960s): streptomycin (for tuberculosis, 1943, Selman Waksman, who coined the word "antibiotic"), tetracycline, erythromycin, vancomycin and many more, mostly found by screening soil microbes. Antibiotic RESISTANCE appeared almost immediately (Fleming himself warned of it in 1945) and has grown steadily from overuse in medicine and agriculture, while few genuinely new classes have been discovered since about 1990 — now a major global health threat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gps-impact',
    title: 'The Impact of GPS',
    category: 'Inventions',
    keywords: [
      'what was the impact of gps', 'how has gps changed the world', 'what is gps used for', 'who invented gps',
      'how many gps satellites', 'why does gps need relativity', 'is gps free to use',
    ],
    content: `GPS (Global Positioning System) was built by the US military from the 1970s and opened fully to civilian use (free, worldwide) after 2000. About 30 satellites broadcast precise time signals; a receiver works out its position from the tiny differences in arrival time from four or more of them. Its impact is huge and often invisible: turn-by-turn navigation for drivers, ships and aircraft; the entire "location services" economy — ride-hailing, food delivery, mapping apps, fitness trackers, geotagged photos; precision agriculture (auto-steering tractors, variable-rate spraying); surveying, construction and earthquake monitoring; search and rescue and disaster response; and — critically — precise timing that synchronises mobile-phone networks, power grids and financial-market transaction timestamps, so a GPS outage would disrupt far more than maps. It's also a strategic asset, which is why other powers built their own systems (Russia's GLONASS, the EU's Galileo, China's BeiDou). GPS satellites must correct their atomic clocks for both special and general relativity, or positions would drift by about 10 km per day.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-steam-engine-impact',
    title: 'The Impact of the Steam Engine',
    category: 'Inventions',
    keywords: [
      'what was the impact of the steam engine', 'why was the steam engine important', 'james watt steam engine',
      'newcomen engine', 'how did the steam engine cause the industrial revolution', 'steam locomotive impact',
    ],
    content: `The steam engine converts heat from burning fuel into mechanical work, and it was the prime mover of the Industrial Revolution. Thomas Newcomen built the first practical version in 1712 to pump water out of coal mines. James Watt's improvements from the 1760s–80s (a separate condenser, then rotary motion) made it several times more fuel-efficient and able to drive rotating machinery, not just pumps. Consequences: factories no longer had to sit beside fast rivers for water power, so industry (and population) concentrated in coal-rich areas and cities; textile and other manufacturing mechanised and scaled up massively; steam locomotives (from the 1820s, Stephenson's Rocket 1829) and steamships collapsed travel times and freight costs, knitting together national markets and enabling global trade and empire. It also locked in large-scale coal burning, the start of fossil-fuel-driven economic growth — and of human-caused climate change.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-first-flight',
    title: 'Who Invented the Airplane',
    category: 'Inventions',
    keywords: [
      'who invented the airplane', 'wright brothers first flight', 'when was the first airplane flight', 'kitty hawk 1903',
      'first powered flight', 'how did the wright brothers succeed', 'first controlled flight',
    ],
    content: `The airplane is credited to the American brothers Wilbur and Orville Wright, who made the first sustained, powered, controlled flight of a heavier-than-air craft on 17 December 1903 at Kitty Hawk, North Carolina — the first flight lasted 12 seconds and covered 37 metres; the fourth that day went 260 metres. Others had built gliders (Otto Lilienthal, killed in 1896) and even powered craft that hopped, but the Wrights' breakthrough was CONTROL: they invented "wing-warping" (twisting the wingtips) for roll control, combined with rudder and elevator, worked out from years of glider tests and their own wind tunnel. They were bicycle makers who funded the work themselves. Recognition came slowly — they demonstrated properly controllable flight in France and the US in 1908–09, which finally convinced sceptics. Within about 15 years aircraft were used in World War I, and within 50 there were jet airliners.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-penicillin-full',
    title: 'Who Discovered Penicillin (and Who Made It a Medicine)',
    category: 'Inventions',
    keywords: [
      'who discovered penicillin', 'alexander fleming penicillin', 'how was penicillin discovered', 'florey and chain penicillin',
      'when did penicillin become available', 'first antibiotic penicillin', 'penicillin nobel prize',
    ],
    content: `Alexander Fleming, a Scottish bacteriologist at St Mary's Hospital in London, discovered penicillin by accident in September 1928: returning from holiday, he noticed that a mould (Penicillium notatum) contaminating one of his bacterial culture plates had killed the bacteria around it. He identified the antibacterial substance and named it, but couldn't purify or stabilise it and moved on. A decade later, at Oxford, Howard Florey and Ernst Chain (with biochemist Norman Heatley) took up the problem, purified enough to test — curing infected mice in 1940 and then a human in 1941 — and proved its power. With Britain at war, mass production was scaled up in the United States, and by D-Day in 1944 there was enough to treat Allied casualties. Fleming, Florey and Chain shared the 1945 Nobel Prize in Physiology or Medicine. Penicillin was the first true antibiotic and began the antibiotic era.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-history-of-computer',
    title: 'A Short History of the Computer',
    category: 'Inventions',
    keywords: [
      'what is the history of the computer', 'who invented the computer', 'first computer', 'eniac', 'babbage analytical engine',
      'alan turing computer', 'when was the first personal computer', 'history of computing',
    ],
    content: `Computing ideas go back to mechanical calculators and, in the 1830s, Charles Babbage's designs for a programmable "Analytical Engine" (never finished; Ada Lovelace wrote about programming it). The theoretical foundation came from Alan Turing in 1936. The first electronic computers were built in the 1940s using thousands of vacuum tubes and filling rooms — Britain's Colossus (1943, codebreaking), and the American ENIAC (1945). The transistor (1947) and then the integrated circuit (1958) made machines smaller, faster, cheaper and more reliable. Mainframes served governments and big companies through the 1960s–70s (IBM System/360). Intel's 4004 (1971) was the first commercial microprocessor — a whole CPU on one chip — which made the personal computer possible: the Altair (1975), then the Apple II (1977) and the IBM PC (1981). The graphical interface and mouse (Xerox PARC, popularised by the Apple Macintosh, 1984), the World Wide Web (1991) and the smartphone (iPhone, 2007) each brought computing to far more people.`,
    createdAt: Date.now(),
  },
];
