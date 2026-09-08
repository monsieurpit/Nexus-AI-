import { KnowledgeItem } from '../../types';

// Batch 76 (US history). Strong category, but hard misses on nexus-4b: "what
// was Reconstruction" answered about rebuilding Warsaw and the Marshall Plan;
// "what was the Trail of Tears" answered about a Billy Ray Cyrus album; "what
// was the Manhattan Project" said "Niels Bohr helped sequence human DNA"; "what
// was Watergate" and "what was the McCarthy era" were raw web dumps; "what was
// the Gold Rush" answered about Levi Strauss inventing jeans in 1873.
export const US_HISTORY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-reconstruction-era',
    title: 'What Reconstruction Was (US, 1865–1877)',
    category: 'History',
    keywords: [
      'what was reconstruction', 'reconstruction era after the civil war', '13th 14th 15th amendments', 'freedmen bureau',
      'compromise of 1877 end of reconstruction', 'black codes jim crow', 'radical reconstruction south',
    ],
    content: `Reconstruction was the period from 1865 to 1877, after the American Civil War, when the federal government worked to readmit the eleven former Confederate states to the Union and to determine the status of about four million newly freed slaves. It has nothing to do with rebuilding European cities. Key measures: the 13th Amendment abolished slavery (1865); the 14th made everyone born in the US a citizen and guaranteed "equal protection of the laws" (1868); the 15th barred denying the vote based on race (1870). The Freedmen's Bureau provided food, schools and legal help. Under "Radical Reconstruction" from 1867, federal troops enforced Black political participation, and Black men voted and held office across the South for the first time. White Southern resistance was fierce — "Black Codes," economic coercion, and terrorism by the Ku Klux Klan. Northern political will faded, and the disputed 1876 election was settled by the Compromise of 1877, which withdrew federal troops. Southern states then rolled back Black rights through segregation ("Jim Crow") and disenfranchisement that lasted until the 1960s Civil Rights Movement.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trail-of-tears',
    title: 'What the Trail of Tears Was',
    category: 'History',
    keywords: [
      'what was the trail of tears', 'indian removal act 1830', 'cherokee forced removal oklahoma', 'andrew jackson native american removal',
      'five civilized tribes removal', 'worcester v georgia jackson ignored', 'trail of tears deaths',
    ],
    content: `The Trail of Tears was the forced removal, mainly during the 1830s, of the Native American nations of the southeastern United States from their ancestral homelands to "Indian Territory" west of the Mississippi, in present-day Oklahoma. It was carried out under the Indian Removal Act of 1830, championed and signed by President Andrew Jackson, which authorized negotiating (and coercing) removal treaties. The nations affected — the Cherokee, Muscogee (Creek), Seminole, Chickasaw and Choctaw — were pushed out over the decade; the Seminole resisted in a long war. The Cherokee case is the most infamous: the Supreme Court ruled in Worcester v. Georgia (1832) that Georgia had no authority over Cherokee land, but Jackson did not enforce it, and in 1838 the US Army rounded up about 16,000 Cherokee into stockades and marched them roughly 1,200 miles west. Thousands — estimates run from 4,000 to 8,000 — died of exposure, disease, and starvation along the way. In all, around 60,000 people were displaced.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-manhattan-project',
    title: 'What the Manhattan Project Was',
    category: 'History',
    keywords: [
      'what was the manhattan project', 'us atomic bomb ww2', 'oppenheimer los alamos', 'trinity test 1945',
      'oak ridge hanford uranium plutonium', 'why did the us build the atomic bomb', 'leslie groves manhattan project',
    ],
    content: `The Manhattan Project was the secret research and engineering program, led by the United States with British and Canadian participation, that built the first nuclear weapons during the Second World War (1942–1945). It had nothing to do with DNA. It was launched out of fear that Nazi Germany was developing an atomic bomb, prompted by a 1939 letter to President Roosevelt signed by Albert Einstein. The US Army Corps of Engineers ran it under General Leslie Groves; the physicist J. Robert Oppenheimer directed the weapons-design laboratory at Los Alamos, New Mexico. It ultimately employed about 130,000 people at a cost of roughly $2 billion, with major sites at Oak Ridge, Tennessee (enriching uranium), Hanford, Washington (producing plutonium), and Los Alamos. The first device was detonated at the "Trinity" test in the New Mexico desert on 16 July 1945. Atomic bombs were then dropped on Hiroshima (6 August) and Nagasaki (9 August 1945), killing well over 100,000 people and preceding Japan's surrender, and opening the nuclear age and the Cold War arms race.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-watergate',
    title: 'What Watergate Was',
    category: 'History',
    keywords: [
      'what was watergate', 'nixon resignation scandal', 'watergate break-in 1972 dnc', 'woodward bernstein deep throat',
      'white house tapes watergate', 'what did nixon do wrong watergate', 'ford pardon nixon',
    ],
    content: `Watergate was the political scandal that forced US President Richard Nixon to resign in August 1974 — the only president ever to resign. In June 1972, five men connected to Nixon's re-election committee were caught breaking into the Democratic National Committee headquarters in the Watergate office complex in Washington to wiretap phones and photograph documents. The scandal was not really the burglary but the cover-up: the White House paid hush money, obstructed the FBI investigation, and misused federal agencies against political enemies. Investigative reporting by Bob Woodward and Carl Bernstein of the Washington Post, aided by a secret source later revealed as FBI official Mark Felt ("Deep Throat"), and televised Senate hearings, kept exposing it. The hearings revealed that Nixon had secretly tape-recorded his office conversations; after a Supreme Court ruling, the tapes were released and proved he had ordered the cover-up days after the break-in. Facing certain impeachment and removal, Nixon resigned; his successor Gerald Ford pardoned him a month later. Dozens of administration officials were convicted.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-california-gold-rush',
    title: 'What the California Gold Rush Was',
    category: 'History',
    keywords: [
      'what was the gold rush', 'california gold rush 1849', 'sutters mill gold discovery 1848', 'forty-niners',
      'how did the gold rush change california', 'gold rush effect on native californians', 'san francisco gold rush boom',
    ],
    content: `The California Gold Rush was the mass migration triggered by the discovery of gold at Sutter's Mill, near Sacramento, in January 1848 — just days before Mexico ceded California to the United States. As word spread, roughly 300,000 people ("forty-niners," after the peak year 1849) poured in from across the US and from Latin America, Europe, Australia and China. San Francisco grew from a village of about 200 to a city of 36,000 in a few years; California's non-Native population exploded, and it was admitted as a state in 1850, skipping the usual territorial stage. Early prospectors could pan gold from streams; later, capital-intensive hydraulic and hard-rock mining took over. The rush brought roads, banking and rapid economic growth, but also lawlessness, environmental destruction from hydraulic mining, brutal discrimination against Chinese and Latino miners, and a catastrophic collapse of California's Native population through violence, disease and displacement. (Levi Strauss did supply goods to miners, but the riveted denim work-pants he and Jacob Davis patented came later, in 1873.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mccarthy-era',
    title: 'What the McCarthy Era Was',
    category: 'History',
    keywords: [
      'what was the mccarthy era', 'what is mccarthyism', 'joseph mccarthy communist accusations', 'red scare 1950s',
      'hollywood blacklist huac', 'army mccarthy hearings 1954', 'senate censure mccarthy',
    ],
    content: `The McCarthy era, roughly 1947 to 1957, was a period of intense anti-communist suspicion in the United States (the "Second Red Scare"), named for Republican Senator Joseph McCarthy of Wisconsin. From a 1950 speech onward, McCarthy made sweeping, largely unsubstantiated claims that communists and Soviet spies had infiltrated the State Department, the army, universities, Hollywood and other institutions. "McCarthyism" now means the practice of making accusations of disloyalty or subversion without regard for evidence. The era featured government loyalty oaths and investigations, the House Un-American Activities Committee (HUAC) hearings, and blacklists — most famously the Hollywood blacklist, which barred screenwriters, directors and actors suspected of communist ties from working. Careers and lives were destroyed on rumour. McCarthy overreached by attacking the US Army; the televised Army–McCarthy hearings in 1954 exposed his bullying tactics to millions ("Have you no sense of decency?"), his support collapsed, and the Senate voted to censure him that year. He died in 1957.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dust-bowl',
    title: 'What the Dust Bowl Was',
    category: 'History',
    keywords: [
      'what was the dust bowl', 'dust bowl 1930s great plains', 'black blizzards dust storms', 'why did the dust bowl happen',
      'okies migration grapes of wrath', 'soil conservation service dust bowl', 'over-plowing prairie grassland',
    ],
    content: `The Dust Bowl was an environmental and economic catastrophe on the southern Great Plains — the panhandles of Oklahoma and Texas and neighbouring parts of Kansas, Colorado and New Mexico — during the 1930s. Two causes combined: a severe multi-year drought, and decades of farmers plowing up the deep-rooted native prairie grass to plant wheat, which left bare, dry topsoil with nothing to hold it. High winds lifted that soil into enormous dust storms ("black blizzards") that buried farms, killed livestock and people (from "dust pneumonia"), and darkened skies as far as Washington and New York. On top of the Great Depression, it ruined hundreds of thousands of farm families; about 2.5 million people left the Plains, many heading to California, where they were derided as "Okies" — the migration John Steinbeck dramatised in "The Grapes of Wrath." The federal response created the Soil Conservation Service and promoted contour plowing, crop rotation, and shelterbelts of trees to prevent a recurrence.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mlk-jr',
    title: 'Who Martin Luther King Jr. Was',
    category: 'History',
    keywords: [
      'who was martin luther king jr', 'mlk civil rights leader', 'i have a dream speech 1963', 'montgomery bus boycott mlk',
      'march on washington selma birmingham', 'mlk nobel peace prize', 'mlk assassination 1968 memphis',
    ],
    content: `Martin Luther King Jr. (1929–1968) was a Baptist minister and the most prominent leader of the American Civil Rights Movement. Drawing on Christian teaching and Gandhi's philosophy of nonviolent resistance, he came to national attention leading the year-long Montgomery bus boycott (1955–56), sparked when Rosa Parks refused to give up her bus seat, which ended in a Supreme Court ruling against bus segregation. As head of the Southern Christian Leadership Conference he led campaigns in Birmingham (1963), where police used dogs and fire hoses on marchers, and Selma (1965), which pushed Congress to act. He delivered the "I Have a Dream" speech at the 1963 March on Washington, and wrote the "Letter from Birmingham Jail." His work helped secure the Civil Rights Act of 1964 (banning segregation and employment discrimination) and the Voting Rights Act of 1965. He won the Nobel Peace Prize in 1964. In his last years he broadened his focus to poverty and opposed the Vietnam War. He was assassinated in Memphis on 4 April 1968; a US federal holiday now marks his birthday.`,
    createdAt: Date.now(),
  },
];
