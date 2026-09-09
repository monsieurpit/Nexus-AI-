import { KnowledgeItem } from '../../types';

// Batch 129 (transportation history) — a total gap. Errors and web dumps on
// nexus-4b: "what killed the great ocean liners" was answered as the sinking
// of the Titanic; "history of the bicycle" invented people ("Baron von
// Kempelen built the Draisienne around 1879", "Karl Drais invented the
// velocipede in the 1870s"); "history of the subway" invented "Joseph
// McKinstry" as the inventor of the Metropolitan line; "high-speed rail" said
// the Japanese Shinkansen is a maglev; "container standard" put Malcom McLean
// "in the late 1800s"; "why knots and nautical miles" said a knot = 1 mph and
// a nautical mile = 1 degree of latitude. Web dumps: sail-to-steam, bulk
// carrier vs tanker, interstate highways, hub-and-spoke, Boeing 747,
// Panamax/Suezmax, reefer shipping.
export const TRANSPORTATION_HISTORY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-tr-ocean-liners-decline',
    title: 'What Killed the Great Ocean Liners',
    category: 'History of Technology',
    keywords: [
      'what killed the great ocean liners and passenger ship travel', 'the transatlantic ocean liner queen mary normandie united states was killed by the jet airliner',
      'in 1957 for the first time more people crossed the atlantic by air than by sea by 1965 it was about four to one air the boeing 707 made the crossing in six to seven hours versus five days by ship at a competitive or lower price',
      'liners switched to leisure cruising a different business or were scrapped the ss united states 1952 still the fastest ocean liner ever was laid up in 1969 the modern cruise industry from the 1970s is about the ship as a destination not transport not the titanic',
    ],
    content: `The decline of the great transatlantic ocean liners — the Queen Mary, the Normandie, the SS United States — was caused by the jet airliner, not by any single disaster. Through the 1950s the liner was still the standard way to cross the Atlantic. Then in October 1958 the Boeing 707 entered transatlantic service, cutting the New York–to–Europe journey from about five days to six or seven hours, at a fare that was soon competitive with and then cheaper than a first-class cabin. The switch was fast: 1957 was the first year more people crossed the Atlantic by air than by sea, and by the mid-1960s it was roughly four-to-one in favour of flying. Liner companies could not compete on time or, eventually, on price. Some ships were converted to leisure "cruising" — a completely different business where the voyage itself is the holiday — and the rest were laid up or scrapped. The SS United States, the fastest ocean liner ever built (1952), made its last crossing in 1969. The modern cruise industry that grew from the 1970s uses the ship as a floating resort and destination, not as transport between two places. (The Titanic sank in 1912, decades before the liner era ended, and its loss did not stop transatlantic ship travel.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-bicycle-history',
    title: 'The History of the Bicycle',
    category: 'History of Technology',
    keywords: [
      'what is the history of the bicycle and how did it change mobility', '1817 karl von drais invents the draisine running machine or dandy horse a two wheeled steerable frame with no pedals pushed along by the feet',
      '1860s pierre michaux in paris adds pedals directly to the front wheel the velocipede or boneshaker iron frame wooden wheels 1870s the high wheeler penny farthing huge front wheel dangerous',
      '1885 john kemp starleys rover safety bicycle two equal wheels a chain drive to the rear wheel a diamond frame the template for every bicycle since 1888 john boyd dunlops pneumatic tyre the 1890s bicycle craze cheap mass production expanded mobility and liberated women',
    ],
    content: `The bicycle developed over about 70 years. 1817: Karl von Drais, in Germany, builds the "draisine" (also "running machine," "hobby horse," or "dandy horse") — a wooden two-wheeled steerable frame with a saddle and handlebars but NO pedals; you sit on it and push along with your feet. It was a brief fad. 1860s: Pierre Michaux and his son, in Paris, attach cranks and pedals directly to the front wheel, creating the "velocipede" — quickly nicknamed the "boneshaker" for its iron frame and wooden (later steel) wheels on cobbled streets. 1870s: the "high wheeler" or "penny-farthing," with an enormous front wheel (bigger wheel = more distance per pedal turn) — fast but dangerous, prone to pitching the rider head-first ("taking a header"). 1885: John Kemp Starley's "Rover safety bicycle" — two wheels of equal, moderate size, a chain drive to the REAR wheel (so gearing no longer depended on wheel size), and a diamond-shaped frame. This is the design every bicycle has used since. 1888: John Boyd Dunlop's practical pneumatic (air-filled) tyre makes riding smooth and quick. The result was the "bicycle craze" of the 1890s: cheap factory production put a bike within reach of ordinary workers, giving rural people access to towns and jobs, spurring road improvement (cyclists lobbied for paved roads before motorists), and — most celebrated — giving women independent mobility and helping drive dress reform (Susan B. Anthony said cycling "has done more to emancipate women than anything else in the world").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-subway-history',
    title: 'The History of the Subway / Metro',
    category: 'History of Technology',
    keywords: [
      'what is the history of the subway or metro urban rail', 'the worlds first underground urban railway was londons metropolitan railway opened january 1863 running steam trains in shallow cut and cover tunnels to relieve the citys choked horse clogged streets',
      'the first deep level electric tube line was londons city and south london railway 1890 steam could not work in deep bored tunnels so electric traction was essential', 'budapest 1896 had continental europes first boston 1897 and new york 1904 the first in the us paris metro 1900',
      'the metro let cities grow larger and denser by moving huge passenger volumes on grade separated right of way moscows 1935 palatial stations driverless trains from the 1980s',
    ],
    content: `The world's first underground urban railway was the Metropolitan Railway in London, opened in January 1863, built to relieve streets choked with horse traffic and pedestrians. It used steam locomotives running through shallow "cut-and-cover" tunnels (dig a trench, build the railway, roof it over, restore the street). The next leap was electric traction: steam engines could not operate in deep, fully enclosed bored tunnels because of the smoke, so when London's City & South London Railway opened in 1890 as the first deep-level "tube," it had to be electric — and electric traction became the standard for all metros. Other early systems: Budapest (1896, continental Europe's first), Glasgow (1896), Boston (1897, first in the US, initially for streetcars), Paris (Métro, 1900), New York (IRT, 1904), and Moscow (1935, famous for its ornate palace-like stations built as socialist showpieces). The metro's importance is that a grade-separated line (in tunnel or on viaduct, never crossing roads) can move tens of thousands of passengers per hour per direction, which is what allowed cities to grow far larger and denser than walking or surface transport could support. Automation and driverless operation arrived from the 1980s (Vancouver's SkyTrain, Lille's VAL, later Paris Line 14 and Copenhagen).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-high-speed-rail',
    title: 'How High-Speed Rail Works and Which Countries Have It',
    category: 'History of Technology',
    keywords: [
      'how does high-speed rail work and which countries have it', 'high speed rail trains running over 250 km/h often 300 to 350 on dedicated gently curved grade separated track with no level crossings electrified with lightweight streamlined trainsets and in cab signalling',
      'it is almost all conventional steel wheel on rail maglev frictionless magnetic levitation exists only on the shanghai airport line and test tracks the japanese shinkansen is conventional steel wheel not a maglev',
      'the first hsr was japans tokaido shinkansen 1964 major networks china by far the largest japan france tgv spain ave germany ice italy south korea ktx the us has none',
    ],
    content: `High-speed rail means trains running faster than about 250 km/h (155 mph) in normal service, and typically 300–350 km/h. Achieving that safely requires a purpose-built line, not just faster trains on old track: the route is dead straight or very gently curved (tight curves are impossible at speed), completely grade-separated with no level crossings, electrified (usually 25 kV overhead), and fitted with in-cab signalling because trackside signals flash past too fast to read. The trains themselves are lightweight, aerodynamically streamlined multiple-units with power distributed along the train and tilting or air-suspension systems. Almost all high-speed rail in the world is conventional steel-wheel-on-steel-rail; "maglev" (magnetic levitation, no wheels, no rolling friction) exists only on the Shanghai airport line (~30 km, 430 km/h) and on test tracks — Japan's Shinkansen ("bullet train") is a conventional steel-wheeled system, though Japan is building a separate maglev line. The first high-speed line was Japan's Tōkaidō Shinkansen (Tokyo–Osaka, 1964). Major networks today: China (by far the world's largest, ~45,000 km, all built since 2008), Japan, France (TGV, from 1981; holds the wheeled-rail speed record of 574.8 km/h on a test run), Spain (AVE, Europe's largest network), Germany (ICE), Italy (Frecciarossa), South Korea (KTX), plus Taiwan and Morocco. The United States has effectively none (the Northeast's Acela only briefly touches ~240 km/h).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-containerization',
    title: 'Shipping Containerization and Why It Was Revolutionary',
    category: 'History of Technology',
    keywords: [
      'what is shipping containerization and why was it revolutionary and how did the standard get adopted', 'before containers break bulk cargo was loaded piece by piece by gangs of longshoremen a ship could spend a week or more in port port labor was about half the total shipping cost pilferage and damage were rampant',
      'malcom mclean a us trucking magnate ran the first container voyage in 1956 the ideal-x the same sealed box moves seamlessly by ship truck and rail intermodal without being unpacked iso standardised the 20 foot teu and 40 foot sizes in the late 1960s',
      'port time fell from days to hours cost per item collapsed about 90 percent ports moved from city centres to deepwater terminals dockworker numbers crashed it made the modern globalised supply chain possible not docker software',
    ],
    content: `Before the shipping container, ocean cargo was "break-bulk": crates, sacks, barrels, and bundles were carried aboard and stowed piece by piece by gangs of dockworkers, and unloaded the same way. A ship could sit in port for a week or more, port handling was around half of the total cost of shipping a good, and theft and breakage were endemic. In April 1956 Malcom McLean, an American trucking businessman, sent the first container ship voyage — 58 truck-body containers on a converted tanker, the Ideal-X, from Newark to Houston. The key idea was "intermodal": one sealed, standard-sized steel box is craned straight from a truck chassis onto a ship, off onto a railcar, and delivered without ever being opened. The US military's heavy use of containers to supply the Vietnam War (mid-1960s) proved the system at scale and gave McLean's Sea-Land a lucrative business carrying Japanese exports on the return legs. ISO standardised the box in 1968–70 — fixed lengths (the 20-foot TEU and 40-foot FEU), corner castings, and stacking strength — so that any container fit any ship, crane, chassis, and railcar anywhere in the world. The effects: port turnaround fell from days to hours, the cost of shipping an item dropped by roughly 90%, it became cheaper to manufacture on the far side of the planet, big ports migrated out of old city centres (Manhattan, San Francisco, London's docklands) to automated deepwater terminals, dockworker employment collapsed, and the whole modern globalised, just-in-time supply chain became possible. (This is unrelated to "containerization" in software, i.e. Docker, which borrowed the metaphor.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-knots-nautical-miles',
    title: 'Why Ships and Planes Use Knots and Nautical Miles',
    category: 'History of Technology',
    keywords: [
      'why are ships and planes measured in knots and nautical miles', 'a nautical mile is defined as one minute one sixtieth of a degree of arc along a meridian about 1852 metres about 1.15 statute miles',
      'this makes it natural for navigation because a position is given in degrees and minutes of latitude and 1 minute of latitude on the chart equals 1 nautical mile of distance a knot is one nautical mile per hour not one mile per hour',
      'the name comes from the common log a board on a knotted rope thrown overboard a sailor counted how many knots ran out while a sand glass emptied giving speed directly aviation uses the same units because air charts also use latitude and longitude',
    ],
    content: `A NAUTICAL MILE is defined as the length of one minute of arc (1/60 of a degree) measured along a meridian of the Earth — internationally standardised at exactly 1,852 metres, which is about 1.15 statute (land) miles. This definition is what makes it useful for navigation: positions at sea and in the air are given in degrees and minutes of latitude and longitude, so on a chart, one minute of latitude on the side scale is exactly one nautical mile of distance — you can measure how far apart two points are directly off the latitude scale with dividers. A KNOT is a speed of one nautical mile per hour (NOT one statute mile per hour). The word comes from the "common log" or "chip log," used from the 16th to the 19th century: a weighted wooden board was thrown off the stern trailing a long line with knots tied in it at regular intervals; a sailor let the line run out for the duration of a small sandglass (traditionally 28 seconds) and counted how many knots passed through his hand — the count was the ship's speed in "knots." Aircraft use nautical miles and knots for the same reason ships do: aeronautical charts are laid out in latitude and longitude, and wind, heading, and groundspeed calculations are cleaner when distance and speed share that framework. (A nautical mile is one MINUTE of latitude, not one degree, and a knot is not one mph.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-sail-to-steam',
    title: 'How the Shift from Sail to Steam Changed Ocean Shipping',
    category: 'History of Technology',
    keywords: [
      'how did the shift from sail to steam change ocean shipping', 'steam made ocean voyages predictable and scheduled rather than at the mercy of wind so companies could publish timetables liners running a line',
      'steam cut crossing times atlantic from about six weeks to about ten days by 1850 and about five days by 1900 enabled routes against prevailing winds and through the suez canal which a sailing ship could not easily transit killing the tea clipper trade',
      'steamers needed coaling stations driving imperial expansion of ports replaced large crews of skilled sailors with smaller crews plus stokers and with iron then steel hulls and screw propellers allowed far larger ships and economies of scale',
    ],
    content: `The change from sail to steam, spread over the 19th century, transformed shipping from an unpredictable craft into a scheduled industry. A sailing ship's voyage time depended entirely on the wind and could vary by weeks; a steamship's was reliable, so shipping companies could for the first time publish fixed timetables and run regular services — "liners" operating a "line." Steam also cut journey times dramatically (the Atlantic crossing fell from roughly six weeks under sail to about ten days by 1850 and five days by 1900) and freed ships from the trade winds, letting them take direct routes and sail against prevailing winds. Critically, a steamer could transit the Suez Canal (opened 1869), which is nearly windless — this instantly made the long sailing route around Africa uncompetitive and ended the era of the tea and wool clipper. The costs: steamers had to carry huge amounts of coal and stop to refuel, which drove the great powers to seize and fortify coaling stations around the world (a major motive in late-19th-century imperialism); and the romantic skilled crew of a sailing ship gave way to a smaller deck crew plus engineers and coal-shovelling "stokers." Combined with iron and then steel hulls and the screw propeller (replacing paddle wheels), steam allowed far bigger ships and the economies of scale that carried mass emigration and the bulk trade in grain, coal, and ore.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-jet-age',
    title: 'The Jet Age and How It Changed Air Travel',
    category: 'History of Technology',
    keywords: [
      'what was the jet age and how did it change air travel', 'the first jet airliner the de havilland comet entered service in 1952 but a series of fatal crashes from metal fatigue at its square windows grounded it in 1954',
      'the jet age really took off with the boeing 707 and douglas dc-8 from 1958 jets fly higher above the weather faster halving trip times new york to london from about twelve hours to about six smoother and far more reliable than piston engines',
      'combined with bigger aircraft this cut the cost per seat and turned intercontinental flight from a luxury for the rich into mass travel by the 1960s and 70s killed the ocean liners created the package holiday and long haul tourism jet set',
    ],
    content: `The "jet age" is the period, beginning in the 1950s, when turbojet and turbofan airliners replaced propeller-driven aircraft on long routes. The first jet airliner was Britain's de Havilland Comet, which entered service in 1952 and was a sensation — but after two aircraft broke up in flight in 1954 (traced to metal fatigue cracks spreading from the corners of its square windows) the whole type was grounded and redesigned, and the initiative passed to the United States. The jet age truly arrived with the Boeing 707 (transatlantic service October 1958) and the Douglas DC-8. Jets changed flying in several ways: they cruise much higher (around 35,000–40,000 ft, above most weather and turbulence), roughly twice as fast (New York–London fell from about 12 hours by piston airliner to about 6), far smoother, and dramatically more reliable — jet engines have far fewer moving parts than a big piston engine and break down much less. Bigger jet aircraft carrying more passengers cut the cost per seat, and through the 1960s and 1970s that turned long-distance and intercontinental flight from something only the wealthy did once in a lifetime into ordinary mass travel. The jet airliner killed the transatlantic ocean liner, made the package holiday and long-haul tourism possible, enabled mass labour migration across oceans, and put the phrase "jet set" into the language.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-concorde',
    title: 'Concorde and Why Supersonic Passenger Flight Ended',
    category: 'History of Technology',
    keywords: [
      'what is the concorde and why did supersonic passenger flight end', 'concorde an anglo french airliner in service 1976 to 2003 with british airways and air france cruised at mach 2 about 2180 km/h at 60000 feet crossing london new york in about 3.5 hours versus 8',
      'it was banned from supersonic flight over land because of the sonic boom so only transatlantic routes were profitable it burned enormous fuel and carried only about 100 passengers so seats cost a fortune a return new york fare was about 12000 dollars in the 1990s',
      'only 14 entered service the july 2000 paris crash killed 113 and shattered its safety image the post 9/11 slump and airbus ending maintenance support led both airlines to retire it in 2003 no supersonic airliner has replaced it',
    ],
    content: `Concorde was a supersonic passenger airliner built jointly by Britain and France, in airline service from 1976 to 2003. It cruised at Mach 2 (about 2,180 km/h, twice the speed of sound) at 60,000 feet, crossing London–New York in about three and a half hours versus eight for a normal jet. Only 20 were built and just 14 entered service, all with British Airways and Air France (other airlines cancelled their orders after the 1973 oil crisis). Supersonic passenger flight ended, and has not returned, for several linked reasons: (1) the sonic boom meant Concorde was banned from flying supersonically over land almost everywhere, so its speed only paid off on ocean routes, mainly the North Atlantic; (2) it burned roughly four times the fuel per passenger of a subsonic jet and carried only about 100 people, so tickets were extraordinarily expensive (a mid-1990s return New York fare was around $12,000); (3) it needed specialised, costly maintenance for a tiny fleet; (4) on 25 July 2000 an Air France Concorde crashed on take-off from Paris (a metal strip on the runway burst a tyre, and debris ruptured a fuel tank), killing all 109 aboard and 4 on the ground, which destroyed its safety reputation; and (5) the slump in air travel after the September 2001 attacks, plus Airbus's decision to stop supporting the ageing airframes, led both airlines to retire it in 2003. Start-ups such as Boom Supersonic are again trying to build a supersonic airliner, but none is yet flying.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-cargo-ship-types',
    title: 'Bulk Carrier vs Container Ship vs Tanker',
    category: 'History of Technology',
    keywords: [
      'what is a bulk carrier versus a container ship versus a tanker', 'bulk carrier bulker carries unpackaged dry bulk iron ore coal grain bauxite cement poured loose into large open holds and unloaded by grabs or conveyors capesize panamax handymax classes',
      'tanker carries liquids in bulk in tanks crude oil crude carriers up to the vlcc supertanker refined products chemicals lng at minus 162 celsius lpg',
      'container ship carries standardised intermodal boxes stacked in cell guides and lashed on deck sized in teu twenty foot equivalent units the largest now over 24000 teu carries most of the worlds manufactured goods also ro-ro car carriers reefers',
    ],
    content: `The three dominant types of merchant cargo ship: BULK CARRIER ("bulker") carries dry cargo that is not packaged — iron ore, coal, grain, bauxite, phosphate, cement — poured loose into a row of large box-shaped holds and loaded/unloaded by shore cranes with grabs, conveyor systems, or (on "self-unloaders") onboard conveyors. Size classes are named for chokepoints and ports: Handysize, Handymax/Supramax, Panamax, Capesize (too big for the Panama Canal, must round the Cape). TANKER carries bulk liquids in a set of internal tanks: crude-oil carriers (the biggest are the VLCC and ULCC "supertankers", carrying up to ~2 million barrels), product tankers (refined petrol, diesel, jet fuel), chemical tankers (coated or stainless tanks for many different cargoes), LNG carriers (liquefied natural gas held at −162°C in heavily insulated spherical or membrane tanks), and LPG carriers. CONTAINER SHIP carries standard intermodal boxes, slotted into vertical "cell guides" in the holds and lashed in stacks on deck; capacity is measured in TEU (twenty-foot equivalent units), and the largest ships now exceed 24,000 TEU. Container ships carry the great majority of the world's manufactured and general ("non-bulk") cargo. Other specialised types include ro-ro (roll-on/roll-off) ferries and dedicated car carriers, refrigerated "reefer" ships, and heavy-lift and project-cargo vessels.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-ship-size-classes',
    title: 'Panamax, New Panamax, Suezmax, and Other Ship Size Classes',
    category: 'History of Technology',
    keywords: [
      'what is a panamax and post-panamax and suezmax ship', 'ship size classes named for the biggest that can pass a chokepoint panamax the largest ship that fits the original panama canal locks 1914 about 294 m long 32.3 m beam about 5000 teu',
      'new panamax or neopanamax the limit of the 2016 expanded locks about 366 by 51.25 m about 14000 teu post panamax anything too big for the original canal ultra large container ships now exceed 24000 teu and can only use suez not panama',
      'suezmax the largest that fits the suez canal limited by depth and beam rather than length no locks about 20 m draft capesize too big for either canal must round the cape',
    ],
    content: `Ship size classes are named for the largest vessel that can pass a particular strait or canal. PANAMAX: the maximum that fits the ORIGINAL Panama Canal locks (opened 1914) — length about 294 m, beam (width) 32.3 m, draft ~12 m; a Panamax container ship carries around 5,000 TEU. NEW PANAMAX / NEOPANAMAX: the limit of the expanded canal's third set of locks, opened in 2016 — about 366 m long, 51.25 m beam, 15.2 m draft, roughly 14,000 TEU. POST-PANAMAX: any ship too large for the original locks (a category that has existed since the 1980s); today's ultra-large container ships of 20,000–24,000+ TEU are far beyond even the new locks and can transit only Suez, not Panama. SUEZMAX: the largest ship that fits the Suez Canal, which has no locks and is limited instead by its depth and width — about 20 m draft and ~50 m beam (a Suezmax tanker carries roughly a million barrels of oil). CAPESIZE: bulk carriers and supertankers too big for either canal, which must sail the long way round the Cape of Good Hope or Cape Horn. Other named limits include Malaccamax (the Strait of Malacca), Aframax and VLCC/ULCC (tanker sizes), and Q-Max (the giant LNG carriers built for Qatar).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-interstate-highways',
    title: 'How the Interstate Highway System Changed American Cities',
    category: 'History of Technology',
    keywords: [
      'how did the interstate highway system change american cities', 'authorized by the federal aid highway act of 1956 championed by eisenhower partly justified for defence and evacuation about 78000 km 90 percent federally funded',
      'it enabled and accelerated mass suburbanisation and white flight fast commutes from cheap outer land urban segments were often rammed through and demolished dense poor disproportionately black neighbourhoods displacing about a million people',
      'it hollowed out downtown retail as shopping moved to suburban malls decimated the passenger railroad and streetcar locked in car dependence freeway revolts stopped some routes and a few are now being torn down',
    ],
    content: `The US Interstate Highway System was authorised by the Federal-Aid Highway Act of 1956, strongly promoted by President Eisenhower (who had been impressed by Germany's autobahns and framed it partly as a national-defence and civil-evacuation project). It grew to about 78,000 km of limited-access freeway, 90% funded by the federal government from a fuel tax. Its effect on cities was profound and, in retrospect, largely destructive to urban cores. Fast radial freeways made it practical to live far out on cheap land and drive in, so they enabled and greatly accelerated postwar mass suburbanisation and "white flight," draining population and tax base from central cities. Where interstates were driven THROUGH cities, planners routinely chose routes through dense, poor, and disproportionately Black and immigrant neighbourhoods (land was cheap and the residents had little political power): the freeways demolished hundreds of thousands of homes, displaced roughly a million people nationally, and left concrete walls slicing communities in half — the Cross-Bronx Expressway, Detroit's Black Bottom and Paradise Valley, and New Orleans's Claiborne Avenue are notorious examples. Downtown department stores and cinemas declined as retail followed the freeways to suburban shopping malls, and the new highways helped finish off intercity passenger rail and urban streetcars. "Freeway revolts" in San Francisco, Boston, New Orleans's French Quarter, and elsewhere blocked some planned routes, and a handful of urban freeways (San Francisco's Embarcadero, Portland's Harbor Drive, Seoul's Cheonggyecheon) have since been demolished and replaced with boulevards or parks.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-hub-and-spoke',
    title: 'Hub-and-Spoke vs Point-to-Point Airline Networks',
    category: 'History of Technology',
    keywords: [
      'what is a hub and spoke airline network versus point to point', 'hub and spoke an airline funnels passengers from many smaller spoke cities into one or a few big hub airports where they connect onto onward flights delta at atlanta united at chicago lufthansa at frankfurt',
      'it lets an airline serve a huge number of city pairs with far fewer flights filling planes by pooling demand and concentrating maintenance crew and operations at hubs downside passengers must connect and a hub disruption cascades system wide',
      'point to point fly passengers directly between city pairs with no connection southwest ryanair most low cost carriers faster for the passenger simpler operations but only works on routes with enough direct demand',
    ],
    content: `These are the two ways an airline can organise its route network. HUB-AND-SPOKE: the airline concentrates its flights on one or a few large "hub" airports, and most passengers fly from their origin ("spoke") city into a hub, change planes, and fly out on a second flight to their destination. Examples: Delta at Atlanta, United at Chicago O'Hare and Denver, American at Dallas–Fort Worth, Lufthansa at Frankfurt and Munich, Emirates at Dubai. The advantage is enormous route coverage from few flights: with a hub, an airline can connect, say, 100 cities to each other (roughly 5,000 possible city-pairs) with only ~100 routes, and it can fill those planes by pooling passengers who are all heading to different final destinations. It also concentrates maintenance bases, crew, and spare aircraft. The disadvantages: passengers face a connection and longer total travel time, hub airports become congested, and bad weather, a strike, or an IT outage at a single hub ripples through the entire system. POINT-TO-POINT: the airline flies passengers directly between city pairs with no hub connection. This is the model of low-cost carriers like Southwest, Ryanair, and easyJet. It gives passengers faster non-stop trips and lets the airline run simpler operations with quick aircraft turnarounds, but it only works on routes that individually have enough demand to fill a plane, so a point-to-point carrier serves fewer distinct destinations. New fuel-efficient twin-jets (Boeing 787, Airbus A321neo) that can profitably fly long, thin routes are pushing even long-haul travel somewhat back toward point-to-point.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-boeing-747',
    title: 'The Impact of the Boeing 747 Jumbo Jet',
    category: 'History of Technology',
    keywords: [
      'what was the impact of the boeing 747 jumbo jet', 'the 747 first flight 1969 service 1970 with pan am was the first jumbo jet its wide body twin aisles about 2.5 times the capacity of the 707 and its distinctive hump upper deck',
      'by roughly halving the seat mile cost it made long haul international travel genuinely affordable for the middle class driving the 1970s and 80s boom in mass tourism migration and family visits across oceans',
      'the 747 freighter with its nose that swings up became the workhorse of global air cargo and express shipping it carried the space shuttle and serves as air force one production ended in 2023 displaced by efficient twin engine wide bodies',
    ],
    content: `The Boeing 747 (first flight 1969, in service with Pan Am from January 1970) was the first "jumbo jet" — a wide-body aircraft with two passenger aisles and about two and a half times the seating of the Boeing 707 that preceded it, instantly recognisable from the hump housing its partial upper deck (originally there so the nose could hinge upward for cargo loading, since Boeing expected supersonic jets to take over passenger work). Its impact came from scale: by carrying so many more people per flight, the 747 roughly halved the cost per seat-mile on long routes, and that is what turned intercontinental air travel from an expensive occasional trip into something ordinary middle-class families could do — fuelling the 1970s–80s explosion in overseas tourism, long-distance labour migration, and visiting relatives across oceans. For 40 years it was the backbone of most airlines' long-haul fleets and the flagship of national carriers. The 747 freighter, with its upward-swinging nose door, became and remains a workhorse of global air cargo and express parcel networks. The type also carried the Space Shuttle piggyback and serves (heavily modified) as the US presidential aircraft, Air Force One. Boeing ended 747 production in 2023 after more than 1,500 built; it was displaced by efficient long-range twin-engine wide-bodies (the 777, 787, and Airbus A350) that can now fly the same routes more cheaply on two engines instead of four.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tr-reefer-shipping',
    title: 'How Refrigerated Shipping ("Reefer") Transformed the Global Food Trade',
    category: 'History of Technology',
    keywords: [
      'how did refrigerated shipping reefer transform the global food trade', 'mechanical refrigeration from the 1870s and 80s let perishable food cross oceans for the first time the first successful frozen meat voyages argentina and australia new zealand to britain around 1877 to 1882 turned those countries into major meat exporters',
      'bananas via the united fruit companys great white fleet of refrigerated ships from the 1900s became a cheap everyday fruit from a tropical luxury',
      'in the container era the reefer container an insulated box with its own refrigeration unit plugged into ship port and truck power extended this to door to door cold chains making year round global trade in fresh fruit vegetables fish flowers and pharmaceuticals routine',
    ],
    content: `Before mechanical refrigeration, food that spoiled quickly could not be traded over long distances — it had to be produced near where it was eaten, or preserved by salting, drying, or canning. Refrigerated ships, developed from the 1870s and 1880s, changed that. The first commercially successful frozen-meat voyages carried beef and mutton from Argentina, Australia, and New Zealand to Britain between roughly 1877 and 1882, and within a generation those countries had become the world's great meat exporters and Britain had a cheap supply of protein it could not have grown at home. Refrigerated banana ships (the United Fruit Company's "Great White Fleet," from the 1900s) turned the banana from an exotic luxury into one of the cheapest everyday fruits in North America and Europe — and gave United Fruit the political power that produced the term "banana republic." In the container-shipping era, the "reefer container" — an insulated steel box with its own built-in refrigeration unit that plugs into electrical power on the ship, in the port, and on the truck chassis — extended cold storage to an unbroken door-to-door "cold chain." This made routine the year-round global trade in fresh fruit and vegetables (Chilean grapes and Peruvian asparagus in a northern winter), fish and seafood, cut flowers (Kenya and Colombia supplying Europe and the US), dairy, and temperature-sensitive pharmaceuticals and vaccines — while concentrating production in a few low-cost exporting regions and pushing local, seasonal produce toward a niche.`,
    createdAt: Date.now(),
  },
];
