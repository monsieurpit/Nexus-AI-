import { KnowledgeItem } from '../../types';

// Batch 34 (nutrition & diet) gap-fills. Strong category (~19/25). Live misses
// on nexus-4b: "what is metabolism" -> "hummingbirds do this too, going into
// torpor"; "what is a calorie" -> "just the energy your body burns" (no unit
// definition); "what are vitamins" -> jumped straight to vitamin E and K with
// no definition; "recommended daily protein intake" -> gave the macro % range,
// not g/kg.
export const NUTRITION_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-is-metabolism',
    title: 'What Metabolism Is',
    category: 'Nutrition',
    keywords: [
      'what is metabolism', 'what does metabolism mean', 'how does metabolism work', 'what is basal metabolic rate',
      'what is a fast metabolism', 'can you speed up your metabolism', 'catabolism and anabolism',
    ],
    content: `Metabolism is the sum of all the chemical reactions your body runs to stay alive — turning food into energy and building blocks, building and repairing tissues, and clearing waste. It has two sides: catabolism, breaking molecules down to release energy (digesting food, burning fat and glycogen), and anabolism, using that energy to build things up (making muscle, bone, enzymes, hormones). The energy is often measured in calories. Your basal metabolic rate (BMR) is what you burn just keeping the lights on at complete rest — heartbeat, breathing, brain, kidneys, body temperature — and it's typically 60–70% of your daily energy use. On top of BMR comes the energy to digest food (~10%) and all your movement, from exercise to fidgeting. BMR is driven mostly by your size and lean muscle mass, plus age, sex, genetics and thyroid hormones. "Speeding up your metabolism" is largely a myth — building muscle and staying active raise it modestly, but there's no food or supplement that meaningfully cranks it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-calorie',
    title: 'What a Calorie Is',
    category: 'Nutrition',
    keywords: [
      'what is a calorie', 'what does a calorie mean', 'calorie vs kilocalorie', 'how many calories in a gram of fat',
      'what is a kcal', 'are all calories the same', 'how is calorie content of food measured',
    ],
    content: `A calorie is a unit of energy. Technically, one small calorie is the energy needed to raise the temperature of 1 gram of water by 1 °C. In food and nutrition, the "Calorie" on labels is actually a kilocalorie (kcal) — 1,000 small calories — the energy to heat 1 kilogram of water by 1 °C. Food provides energy roughly as: carbohydrate 4 kcal per gram, protein 4 kcal per gram, fat 9 kcal per gram, and alcohol 7 kcal per gram (fibre gives about 2). Your body uses that energy to power everything it does; if you take in more than you burn, the surplus is stored (mostly as fat), and if you take in less, you draw on stores. "A calorie is a calorie" for pure energy balance, but the source still matters for hunger, hormones, muscle, and health — 200 kcal of nuts and 200 kcal of soda affect the body very differently.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-are-vitamins',
    title: 'What Vitamins Are',
    category: 'Nutrition',
    keywords: [
      'what are vitamins', 'what do vitamins do', 'fat soluble vs water soluble vitamins', 'how many vitamins are there',
      'why do we need vitamins', 'what is a vitamin deficiency', 'do i need to take a multivitamin',
    ],
    content: `Vitamins are organic compounds the body needs in small amounts to work properly but mostly can't make itself (or can't make enough of), so they have to come from food. There are 13 essential vitamins, split into two groups. FAT-SOLUBLE (A, D, E, K): stored in body fat and the liver, so they build up and don't need to be eaten every day, but large doses can be toxic. WATER-SOLUBLE (the eight B vitamins and vitamin C): not stored much, excess is passed in urine, so they're needed regularly. Each has specific jobs — vitamin C for collagen and immune function, D for calcium absorption and bones, the B group for turning food into energy and making blood and DNA, A for vision and skin, K for blood clotting, E as an antioxidant. Deficiencies cause specific diseases (scurvy from lack of C, rickets from lack of D, pellagra from lack of B3). A varied diet covers most people's needs; supplements help for specific gaps (vitamin D in low-sun climates, B12 for vegans, folate in pregnancy) but aren't a general health booster.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-protein-intake',
    title: 'How Much Protein You Need Per Day',
    category: 'Nutrition',
    keywords: [
      'what is the recommended daily protein intake', 'how much protein do i need', 'how many grams of protein per day',
      'protein per kg of body weight', 'how much protein to build muscle', 'do i need extra protein if i work out',
    ],
    content: `The baseline recommended intake (RDA) for a healthy, mostly sedentary adult is about 0.8 grams of protein per kilogram of body weight per day — roughly 55 g for a 70 kg person, or about 45–56 g/day as a rough general figure. This is a minimum to prevent deficiency, not an optimum. People who are physically active, building muscle, older, recovering from illness or injury, or dieting to lose fat generally do better on more — commonly cited ranges are 1.2–1.6 g/kg for active people and 1.6–2.2 g/kg for serious strength training or a fat-loss phase (to protect muscle). Very high intakes (above ~2.5 g/kg) show no added benefit for most people. Total daily amount matters far more than exact timing or spreading it across meals, despite common gym advice. Athletes aside, most people in wealthy countries already eat enough or more than enough protein.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-carbohydrate',
    title: 'What a Carbohydrate Is',
    category: 'Nutrition',
    keywords: [
      'what is a carbohydrate', 'what are carbs', 'what do carbohydrates do', 'types of carbohydrates', 'what is a sugar starch fiber',
      'do you need carbs', 'what is a monosaccharide',
    ],
    content: `Carbohydrates are one of the three macronutrients (with protein and fat) and the body's main quick energy source, providing about 4 kcal per gram. Chemically they're built from sugar units: monosaccharides (single sugars — glucose, fructose, galactose), disaccharides (two joined — sucrose = table sugar, lactose = milk sugar, maltose), and polysaccharides (long chains — starch, which the body digests to glucose, and fibre, which it can't digest). During digestion, digestible carbs are broken down to glucose, which cells burn for energy or the body stores as glycogen in the liver and muscles (and converts the rest to fat). The brain and red blood cells rely heavily on glucose. "Carbs" isn't a single thing nutritionally — a bowl of lentils and a can of cola are both carbohydrate but behave very differently, which is what "simple vs complex" and the glycemic index try to capture. There is no strict dietary requirement for carbohydrate (the body can make glucose from protein and fat), but they're the easiest fuel and fibre-rich carb foods are strongly linked to good health.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-saturated-unsaturated-chemistry',
    title: 'Saturated vs Unsaturated Fat (What the Difference Actually Is)',
    category: 'Nutrition',
    keywords: [
      'what is the difference between saturated and unsaturated fat', 'saturated vs unsaturated fat', 'why is saturated fat solid',
      'what is a monounsaturated fat', 'what is a polyunsaturated fat', 'is saturated fat bad', 'what are omega 3 fats',
    ],
    content: `The chemical difference is in the fatty-acid chains. A SATURATED fat has no double bonds between its carbon atoms — every carbon is "saturated" with hydrogen — so the chains are straight, pack tightly, and the fat is usually solid at room temperature (butter, lard, coconut oil, the fat in red meat and cheese). An UNSATURATED fat has one or more carbon–carbon double bonds, which put kinks in the chain so it can't pack as tightly and stays liquid (oils). Monounsaturated has one double bond (olive oil, avocado, most nuts); polyunsaturated has several and includes the essential omega-3 and omega-6 fats (oily fish, walnuts, flax, sunflower/soybean oil). Health guidance: replacing some saturated fat with unsaturated fat lowers LDL cholesterol and heart-disease risk; the strongest advice is to avoid trans fats entirely and favour unsaturated sources, while the harm of saturated fat itself is now seen as more moderate and dependent on what it's replaced with.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-fiber',
    title: 'What Fibre Is and Why It Matters',
    category: 'Nutrition',
    keywords: [
      'what is fiber and why is it important', 'what is dietary fiber', 'soluble vs insoluble fiber', 'what does fiber do',
      'how much fiber per day', 'why is fiber good for you', 'what foods are high in fiber',
    ],
    content: `Dietary fibre is the part of plant foods that human digestive enzymes can't break down, so it passes through to the large intestine largely intact. Two broad types: SOLUBLE fibre (oats, beans, apples, psyllium) dissolves into a gel that slows digestion — this blunts blood-sugar spikes, helps lower LDL cholesterol, and increases fullness; INSOLUBLE fibre (whole grains, wheat bran, vegetable skins, nuts) adds bulk and speeds transit, easing constipation. Both feed the beneficial bacteria in the colon, which ferment fibre into short-chain fatty acids that nourish the gut lining. Higher fibre intake is consistently linked to lower rates of heart disease, type 2 diabetes, colon cancer and obesity. Most adults should aim for about 25–38 g a day but average well under that; increase it gradually with plenty of water to avoid gas and bloating. Fibre is found only in plant foods — fruit, vegetables, whole grains, legumes, nuts and seeds.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sodium-in-body',
    title: 'What Sodium Does in the Body',
    category: 'Nutrition',
    keywords: [
      'what does sodium do in the body', 'why do we need salt', 'what is sodium for', 'how much sodium per day',
      'what happens if you eat too much salt', 'sodium and blood pressure', 'what is an electrolyte',
    ],
    content: `Sodium is an essential electrolyte (an ion that carries electric charge in body fluids). Its jobs: it's the main ion in the fluid outside cells, so it controls the body's water balance and blood volume by drawing water where it goes; it's required for every nerve impulse (the sodium rushing into a neuron is what fires the signal); and it's needed for muscle contraction, including the heartbeat, and for absorbing some nutrients in the gut. The body needs only a small amount — roughly 500 mg a day for basic function, and health guidelines cap intake around 2,000–2,300 mg (about a teaspoon of salt). Most people in industrial countries eat far more, mostly from processed and restaurant food, and chronically high sodium raises blood pressure in many people, increasing stroke and heart-disease risk. The rare opposite problem, hyponatraemia (dangerously low blood sodium), happens mainly from drinking huge amounts of plain water during endurance events.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trans-fat',
    title: 'What a Trans Fat Is',
    category: 'Nutrition',
    keywords: [
      'what is a trans fat', 'what are trans fats', 'why are trans fats bad', 'what is partially hydrogenated oil',
      'are trans fats banned', 'natural vs artificial trans fat', 'trans fat and cholesterol',
    ],
    content: `A trans fat is an unsaturated fat whose double bond is in the "trans" configuration, which makes the chain straighter and behave more like a saturated fat. Almost all the trans fat that caused public-health concern was ARTIFICIAL: made by "partial hydrogenation," bubbling hydrogen through vegetable oil to make it semi-solid, shelf-stable and good for frying and baked goods (margarine, shortening, many packaged snacks and fast food). Artificial trans fat is uniquely bad for the heart because it does two harmful things at once — it raises LDL ("bad") cholesterol AND lowers HDL ("good") cholesterol — and it's linked to inflammation. There is no safe level, so many countries (the US, Canada, the EU and others) have effectively banned added trans fat since the 2010s, and the WHO has pushed for global elimination. Small amounts of natural trans fat occur in dairy and meat from cows and sheep and are not considered a significant risk at normal intakes.`,
    createdAt: Date.now(),
  },
];
