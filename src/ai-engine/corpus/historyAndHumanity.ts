import { KnowledgeItem } from '../../types';

export const HISTORY_AND_HUMANITY_CORPUS: KnowledgeItem[] = [
  // 1. Milestones of Human Civilization & World History
  {
    id: 'kb-world-history-milestones',
    title: 'Epochs of Human Civilization: From Agriculture to the Space Age',
    category: 'history',
    keywords: [
      'history',
      'world history',
      'civilization',
      'mesopotamia',
      'ancient egypt',
      'ancient greece',
      'roman empire',
      'industrial revolution',
      'printing press',
      'world war 2',
      'moon landing',
    ],
    content: `Chronological landmarks of human historical development:
1. **Agricultural Revolution (Neolithic Era, ~10,000 BCE)**: Domestication of wheat, barley, sheep, and cattle in the Fertile Crescent (Mesopotamia), shifting humanity from nomadic hunter-gatherers to permanent settlements.
2. **First Cities & Writing (~3500–3000 BCE)**: Sumerian cuneiform on clay tablets, Egyptian hieroglyphics along the Nile, and the Code of Hammurabi (one of the earliest written legal codes).
3. **Classical Antiquity (8th Century BCE – 5th Century CE)**:
   - **Ancient Greece**: Direct democracy in Athens, Socratic philosophy, Euclidean geometry, Olympic Games.
   - **Roman Republic & Empire**: Pax Romana, Roman law, monumental concrete engineering (aqueducts, Colosseum), legal citizenship.
4. **The Gutenberg Printing Press (~1440 CE)**: Johannes Gutenberg invented movable metal type, democratizing literacy, sparking the Scientific Revolution, and enabling the Protestant Reformation.
5. **The Industrial Revolutions (1760s – Present)**:
   - **1st**: Steam engine (James Watt), mechanized textile looms, railways.
   - **2nd (Late 19th C)**: Mass steel production (Bessemer process), electricity, assembly line, chemical synthesis.
   - **3rd (Mid 20th C)**: Silicon semiconductors, microprocessors, automated computing, ARPANET/Internet.
   - **4th**: Artificial intelligence, quantum computing, autonomous robotics.
6. **20th Century Pivots**:
   - **World War I (1914–1918)**: Trench warfare, collapse of Ottoman, Austro-Hungarian, and Russian empires.
   - **World War II (1939–1945)**: Global conflict against Axis fascism, Holocaust, introduction of nuclear energy.
   - **Apollo 11 Moon Landing (July 20, 1969)**: Neil Armstrong and Buzz Aldrin set foot on the lunar surface.`,
    createdAt: Date.now(),
  },

  // 2. World Geography & Earth Extremes
  {
    id: 'kb-world-geography-earth-extremes',
    title: 'World Geography: Continents, Oceans & Extreme Terrestrial Landmarks',
    category: 'geography',
    keywords: [
      'geography',
      'continents',
      'oceans',
      'mount everest',
      'amazon river',
      'mariana trench',
      'sahara desert',
      'world capitals',
      'deepest point',
      'longest river',
    ],
    content: `Global terrestrial landmarks and planetary physical geography:
1. **The 7 Continents (by land area)**:
   - **Asia** (~44.6M $\\text{km}^2$, ~60% of human population, highest peak Mt. Everest).
   - **Africa** (~30.4M $\\text{km}^2$, 54 countries, Sahara Desert, Nile River).
   - **North America** (~24.7M $\\text{km}^2$, stretching from Canadian Arctic to Panama).
   - **South America** (~17.8M $\\text{km}^2$, Amazon Rainforest, Andes Mountains).
   - **Antarctica** (~14.2M $\\text{km}^2$, 98% covered by ice sheet averaging 1.9 km thickness; Earth's largest cold desert).
   - **Europe** (~10.2M $\\text{km}^2$, 44 nations, Ural mountains boundary).
   - **Australia / Oceania** (~8.6M $\\text{km}^2$, island continent, Great Barrier Reef).
2. **The 5 Oceans**:
   - **Pacific Ocean** (Largest & deepest, covers >30% of Earth's surface, houses the Ring of Fire).
   - **Atlantic Ocean** (Separates Old and New Worlds, Mid-Atlantic Ridge rift).
   - **Indian Ocean** (Warmest ocean, monsoon weather patterns).
   - **Southern Ocean** (Circumpolar current insulating Antarctica).
   - **Arctic Ocean** (Smallest, shallowest, covered in seasonal sea ice).
3. **Planetary Extremes**:
   - **Highest Elevation**: Mount Everest (8,848.86 m / 29,031.7 ft above sea level in the Himalayas).
   - **Deepest Point**: Challenger Deep in the Mariana Trench (~10,994 m / 36,070 ft deep).
   - **Longest Rivers**: The Nile River (~6,650 km) and Amazon River (~6,400 km; largest by water volume discharge, carrying more water than the next 7 largest rivers combined).
   - **Largest Hot Desert**: The Sahara Desert (~9.2 million $\\text{km}^2$).`,
    createdAt: Date.now(),
  },

  // 3. Personal Finance & Financial Mathematics
  {
    id: 'kb-personal-finance-compound-interest',
    title: 'Financial Literacy: Compound Interest, Budgeting 50/30/20 & Index Investing',
    category: 'economics',
    keywords: [
      'personal finance',
      'compound interest',
      'budget',
      '50 30 20 rule',
      'investing',
      'index funds',
      'stocks vs bonds',
      'rule of 72',
      'inflation',
      'emergency fund',
    ],
    content: `Essential mathematical principles for building long-term financial security:
1. **Compound Interest Formula**:
   $$A = P \\left(1 + \\frac{r}{n}\\right)^{nt}$$
   - $A$: Final accrued amount.
   - $P$: Principal initial deposit.
   - $r$: Annual nominal interest rate (in decimal).
   - $n$: Number of times interest compounds per year (e.g. 12 for monthly).
   - $t$: Time in years.
   - *Example*: Investing $10,000 at 8% annual return compounded monthly over 30 years yields **$109,357** (over 10x your principal!).
2. **The Rule of 72 (Doubling Time Estimation)**:
   - Approximate years to double your money $= \\frac{72}{\\text{Annual Return Rate } (\%)}$.
   - *Example*: At an 8% return, money doubles every $\\frac{72}{8} = 9$ years.
3. **The 50/30/20 Budgeting Rule**:
   - **50% Needs**: Housing, rent/mortgage, utilities, essential groceries, transportation, minimum debt payments.
   - **30% Wants**: Dining out, entertainment, subscriptions, hobbies, travel.
   - **20% Savings & Debt Acceleration**: High-interest debt payoff, 3–6 month emergency fund, retirement index investments (401k, Roth IRA, S&P 500 ETFs).
4. **Dollar-Cost Averaging & Broad Market Index Funds**:
   - Investing a fixed dollar amount at regular intervals (e.g. $500 monthly into an S&P 500 index fund) removes emotional market timing, buying more shares when prices dip and fewer when prices rise.`,
    createdAt: Date.now(),
  },

  // 4. Cognitive Biases & Logical Fallacies
  {
    id: 'kb-logical-fallacies-cognitive-biases',
    title: 'Critical Thinking: Master Guide to Logical Fallacies & Cognitive Biases',
    category: 'philosophy',
    keywords: [
      'logical fallacies',
      'cognitive biases',
      'confirmation bias',
      'dunning kruger',
      'sunk cost fallacy',
      'ad hominem',
      'straw man',
      'occams razor',
      'first principles',
      'critical thinking',
    ],
    content: `Mental models to detect flawed arguments and avoid cognitive traps:
1. **Common Logical Fallacies in Debate**:
   - **Ad Hominem**: Attacking the speaker's personal character or identity rather than evaluating the merits of their argument.
   - **Straw Man**: Distorting, exaggerating, or misrepresenting an opponent's argument to make it easier to attack.
   - **False Dilemma (Black-or-White)**: Presenting only two extreme choices when nuanced middle-ground alternatives exist.
   - **Post Hoc Ergo Propter Hoc**: Confusing correlation with causation ("Event B followed Event A, therefore A caused B").
   - **Appeal to Authority**: Declaring an argument true solely because an authority figure stated it, without empirical proof.
2. **Major Cognitive Biases in Human Psychology**:
   - **Confirmation Bias**: Actively seeking out, remembering, and overvaluing evidence that confirms preexisting beliefs while ignoring contrary data.
   - **The Dunning-Kruger Effect**: Cognitive bias where individuals with low competence in a domain overestimate their ability, while true experts tend to underestimate their relative skill.
   - **Sunk Cost Fallacy**: Continuing an unprofitable or doomed endeavor simply because of the resources (time, money, effort) already invested.
   - **Survivorship Bias**: Focusing exclusively on successful examples while ignoring the vast silent majority of failures that used the exact same strategy.
3. **Reasoning Heuristics**:
   - **Occam's Razor**: When presented with competing hypotheses that make identical predictions, the one with the fewest assumptions is generally preferred.
   - **First Principles Thinking**: Breaking a problem down into its most fundamental undeniable truths and reasoning upwards from scratch.`,
    createdAt: Date.now(),
  },
];
