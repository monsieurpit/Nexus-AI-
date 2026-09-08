import { KnowledgeItem } from '../../types';

// Batch 109 (nutrition & food science). Good base (macros and cal/gram, trans
// fats, added vs natural sugar, HDL/LDL, whey vs casein, thermic effect,
// heme vs non-heme iron, sodium). Real misses on nexus-4b: "soluble vs
// insoluble fiber" was a web dump about composite-material fibres and sodium
// carbonate; "probiotics vs prebiotics" was a web dump ending in a paragraph
// on abiogenesis; "glycemic load" was defined wrongly as carbohydrate
// "relative to your body weight" (it is GI x grams of carb per serving / 100);
// "glycemic index" and "simple vs complex carbohydrates" never gave a real
// definition.
export const NUTRITION_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-soluble-vs-insoluble-fiber',
    title: 'Soluble vs Insoluble Fiber',
    category: 'Nutrition',
    keywords: [
      'what is the difference between soluble and insoluble fiber', 'soluble fiber dissolves in water forming a gel slows digestion lowers ldl cholesterol moderates blood sugar oats beans apples psyllium',
      'insoluble fiber does not dissolve adds bulk speeds transit prevents constipation wheat bran whole grains vegetable skins nuts', 'most plant foods contain both types',
      'recommended fiber 25 to 38 grams per day most people get about half', 'fiber is not a construction material',
    ],
    content: `Dietary fiber is plant carbohydrate the human gut can't digest, and it comes in two functional types, usually together in the same foods. SOLUBLE fiber dissolves in water to form a viscous gel. That gel slows stomach emptying and the absorption of sugar (flattening blood-glucose spikes) and binds bile acids and cholesterol so they're excreted, which modestly lowers LDL cholesterol. Good sources: oats and oat bran, barley, beans and lentils, apples, citrus, carrots, and psyllium husk. INSOLUBLE fiber does not dissolve; it passes through largely intact, absorbs water, adds bulk to stool, and speeds material through the intestine — which relieves and prevents constipation. Good sources: wheat bran, whole-grain breads and cereals, nuts and seeds, and the skins of fruits and vegetables. Both types are fermented to some degree by gut bacteria into beneficial short-chain fatty acids. The recommended intake is roughly 25 g/day for women and 38 g/day for men; most people eat about half that. (This is a nutrition topic; "natural fibres" in materials science is a different subject.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-probiotics-vs-prebiotics',
    title: 'Probiotics vs Prebiotics',
    category: 'Nutrition',
    keywords: [
      'what is the difference between probiotics and prebiotics', 'probiotics live beneficial bacteria you consume yogurt kefir sauerkraut kimchi supplements transiently add to your gut flora',
      'prebiotics types of fiber your existing gut bacteria feed on inulin resistant starch onions garlic leeks oats bananas', 'synbiotic is both together prebiotics are food for probiotics',
      'probiotics colonise transiently prebiotics feed the microbes already there',
    ],
    content: `The simplest way to keep them straight: prebiotics are food for probiotics. PROBIOTICS are live microorganisms — mostly strains of Lactobacillus, Bifidobacterium, and the yeast Saccharomyces boulardii — that you take in, either in fermented foods (yogurt with live cultures, kefir, sauerkraut, kimchi, miso, some cheeses) or as supplements. They pass through and can transiently boost the population of helpful microbes and crowd out harmful ones, though most do not permanently colonise the gut. PREBIOTICS are non-digestible carbohydrates — certain fibers and resistant starches such as inulin, fructo- and galacto-oligosaccharides, and resistant starch — that your existing gut bacteria ferment as fuel, selectively encouraging the growth of beneficial species. Prebiotics occur in onions, garlic, leeks, asparagus, chicory root, slightly green bananas, oats, barley, and cooled cooked potatoes and rice. A product combining both is called a "synbiotic." (This has nothing to do with abiogenesis, the origin of life, despite the similar-looking word "prebiotic" used there.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-glycemic-index-detail',
    title: 'What the Glycemic Index Is',
    category: 'Nutrition',
    keywords: [
      'what is the glycemic index', 'glycemic index ranks a carbohydrate food 0 to 100 by how much it raises blood glucose over two hours compared to pure glucose',
      'high gi above 70 white bread potatoes sugary drinks fast spike low gi below 55 legumes most fruit whole grains slower rise', 'gi affected by fiber fat protein processing ripeness cooking',
      'gi is measured per fixed amount of carbohydrate not per serving that is what glycemic load adds',
    ],
    content: `The glycemic index (GI) is a 0-to-100 scale that ranks a carbohydrate-containing food by how quickly and how much it raises blood glucose. It is measured by feeding people a portion of the food containing a fixed amount (usually 50 g) of available carbohydrate and tracking their blood sugar over two hours, then comparing the area under that curve to the same amount of pure glucose, which is defined as 100. High-GI foods (above 70) — white bread, most breakfast cereals, white potatoes, watermelon, sugary drinks — are digested fast and cause a rapid spike and crash. Low-GI foods (55 or below) — beans and lentils, most whole fruits, pasta, oats, barley, dairy — release glucose more slowly and steadily. The GI of a food is lowered by fiber, fat, protein, acidity (vinegar, sourdough), and less processing, and raised by ripeness and by cooking (a soft-cooked potato is higher-GI than a firm one). Because GI is defined per fixed gram of carbohydrate rather than per realistic serving, it is usually paired with glycemic load.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-glycemic-load-detail',
    title: 'What Glycemic Load Adds Over Glycemic Index',
    category: 'Nutrition',
    keywords: [
      'what does the glycemic load add over the glycemic index', 'glycemic index is the quality or speed of a carb glycemic load accounts for how much carb is actually in a serving',
      'glycemic load equals gi times available carbohydrate in grams per serving divided by 100', 'watermelon high gi low glycemic load because a serving has little carb', 'low glycemic load 10 or under high 20 or more',
      'glycemic load is not carbohydrate relative to body weight',
    ],
    content: `The glycemic index tells you the "quality" of a carbohydrate — how fast a fixed amount of it raises blood sugar — but it ignores how much carbohydrate is actually in a normal portion of the food. Glycemic load (GL) fixes that by combining the two: GL = (glycemic index × grams of available carbohydrate per serving) ÷ 100. The classic example is watermelon: its GI is high (around 72) because the sugar it does contain is absorbed quickly, but a normal slice contains only about 11 g of carbohydrate, so its glycemic load is a low ~8 and it barely moves blood sugar. Conversely, a food with a moderate GI eaten in a large carb-heavy portion can have a high GL. A GL of 10 or less per serving is considered low, 11–19 medium, and 20 or more high. (Glycemic load is calculated from grams of carbohydrate per serving, not from carbohydrate "relative to body weight.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-simple-vs-complex-carbs',
    title: 'Simple vs Complex Carbohydrates',
    category: 'Nutrition',
    keywords: [
      'what is the difference between simple and complex carbohydrates', 'simple carbs mono and disaccharides glucose fructose sucrose lactose one or two sugar units digested fast table sugar fruit milk honey',
      'complex carbs polysaccharides long chains of glucose starch and fiber grains legumes potatoes vegetables digested more slowly', 'simple is not automatically bad fruit complex is not automatically good white flour',
      'fiber is a complex carbohydrate the body cannot digest at all',
    ],
    content: `Carbohydrates are classified by the length of their sugar chains. SIMPLE carbohydrates are single sugar units (monosaccharides: glucose, fructose, galactose) or two joined together (disaccharides: sucrose = table sugar, lactose = milk sugar, maltose). They need little or no digestion and are absorbed quickly. They occur naturally in fruit, milk and honey, and are the "sugar" added to sweets, soft drinks and processed food. COMPLEX carbohydrates are polysaccharides — long chains of hundreds or thousands of glucose units. This includes starch (in grains, legumes, potatoes, root vegetables, corn), which is broken down more gradually into glucose, and dietary fiber, which humans cannot digest at all. The useful distinction is not "simple = bad, complex = good": whole fruit is simple sugar but comes packaged with fiber, water and nutrients, while white flour and white rice are complex starch that digests almost as fast as sugar. What matters more is the whole food — its fiber, how processed it is, and the portion — which is what the glycemic index and glycemic load try to capture.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-saturated-vs-unsaturated-fat-health',
    title: 'Saturated vs Unsaturated Fat (Structure and Health)',
    category: 'Nutrition',
    keywords: [
      'what is the difference between saturated and unsaturated fat', 'saturated fat no double bonds straight chains pack tight solid at room temperature butter fatty meat coconut palm raises ldl cholesterol',
      'unsaturated fat has double bonds kinked chains liquid oils olive canola nut fish generally lowers ldl the healthy fats', 'monounsaturated one double bond olive avocado polyunsaturated many omega-3 omega-6',
      'guidelines saturated fat under 10 percent of calories replace with unsaturated not with refined carbs',
    ],
    content: `The structural difference: in a SATURATED fat every carbon in the fatty-acid chain is "saturated" with hydrogen and there are no carbon-carbon double bonds, so the chains are straight, pack together tightly, and the fat is solid at room temperature — butter, lard, the fat on meat, coconut oil, palm oil, full-fat dairy. In an UNSATURATED fat there is at least one double bond, which puts a kink in the chain, prevents tight packing, and makes the fat liquid (an oil) — olive, canola, sunflower, peanut, and fish oils. Unsaturated fats are further split into monounsaturated (one double bond: olive oil, avocado, most nuts) and polyunsaturated (several: the omega-3s in oily fish, flax and walnuts, and the omega-6s in vegetable oils). For health: saturated fat raises LDL ("bad") cholesterol, and mainstream guidelines advise keeping it under about 10% of calories and replacing it with unsaturated fat (not with refined carbohydrate, which gives no benefit). Unsaturated fats, especially mono- and omega-3, are associated with lower LDL and better heart-disease outcomes. Artificial trans fats are the worst of all and are now largely banned.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bmr-detail',
    title: 'BMR and How Many Calories You Burn at Rest',
    category: 'Nutrition',
    keywords: [
      'how many calories do you burn at rest and what is bmr', 'basal metabolic rate calories to run vital functions at complete rest breathing circulation brain kidney', 'roughly 1300 to 1600 kcal per day average adult woman 1600 to 1900 man',
      'bmr scales with lean body mass not just weight estimated by mifflin st jeor equation', 'bmr is about 60 to 70 percent of total daily energy expenditure the rest is activity tef and neat',
      'rmr resting metabolic rate is a slightly higher real world measure',
    ],
    content: `Basal metabolic rate (BMR) is the energy your body uses at complete rest, in a neutral-temperature room, fasted, just to keep vital processes running — breathing, circulation, brain activity, kidney filtration, cell maintenance, body-temperature regulation. For an average adult it is roughly 1,300–1,600 kcal per day for a woman and 1,600–1,900 for a man, and it makes up about 60–70% of total daily energy expenditure. The remainder is physical activity, the thermic effect of food (~10%), and non-exercise activity thermogenesis (fidgeting, standing, walking around). BMR is driven mainly by lean body mass — muscle and organs burn more at rest than fat — which is why it scales with size, is higher in men, and drops with age as muscle is lost. It is commonly estimated with the Mifflin–St Jeor equation from weight, height, age and sex. "Resting metabolic rate" (RMR) is a slightly less strict, slightly higher real-world measurement of the same thing and the terms are often used interchangeably.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-body-uses-protein',
    title: 'How the Body Uses Dietary Protein',
    category: 'Nutrition',
    keywords: [
      'what is protein synthesis and how does the body use protein', 'dietary protein is broken down to amino acids absorbed and used to build the body twenty thousand proteins muscle enzymes hormones antibodies',
      'muscle protein synthesis vs breakdown balance determines muscle gain or loss', 'leucine and resistance training stimulate muscle protein synthesis', 'excess amino acids are deaminated and used for energy or stored as fat not stored as protein',
      'protein is not stored the body has no reserve so intake should be spread through the day',
    ],
    content: `Protein you eat is denatured by stomach acid and cut into amino acids and short peptides by digestive enzymes, absorbed through the small intestine, and released into the blood as free amino acids. The body draws on this pool to synthesise its own proteins — a ribosome reads messenger RNA and links amino acids in the coded order (translation) — building and continually replacing the roughly 20,000 different proteins it needs: muscle fibers, enzymes, many hormones (insulin, growth hormone), antibodies, transport proteins, collagen, and more. Muscle is in constant turnover: whether you gain or lose it depends on the balance between muscle protein synthesis and breakdown over the day. Synthesis is stimulated by eating protein (especially the amino acid leucine) and by resistance exercise, which is why spreading protein across meals (~20–40 g each) works better than one large dose. Crucially, the body has no dedicated protein store — any amino acids beyond what's needed for building are stripped of their nitrogen (deamination, with the nitrogen excreted as urea) and the remainder is burned for energy or converted to fat. Extra protein does not get "stored as protein" for later.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-complete-protein-detail',
    title: 'What a Complete Protein Is (and Plant Proteins)',
    category: 'Nutrition',
    keywords: [
      'what is a complete protein', 'complete protein contains all nine essential amino acids in adequate amounts', 'animal proteins meat fish eggs dairy are complete plus soy quinoa buckwheat',
      'most plant proteins are limited in one amino acid grains low in lysine legumes low in methionine', 'complementary proteins rice and beans over the day cover all essential amino acids',
      'you do not need to combine complementary proteins at the same meal',
    ],
    content: `A complete protein is a food that supplies all nine essential amino acids (the ones the body cannot make) in roughly the proportions humans need. Animal proteins — meat, poultry, fish, eggs, and dairy — are all complete, and among plant foods soy (tofu, tempeh, edamame), quinoa, buckwheat, and hemp seeds are too. Most other plant proteins are "incomplete" only in the sense that they are low in one particular essential amino acid: grains (rice, wheat, corn) are low in lysine, while legumes (beans, lentils, peas) are low in methionine but rich in lysine. Combining complementary plant proteins — the classic rice-and-beans, hummus and pita, peanut butter on wholegrain bread — covers the full set. It was once thought you had to combine them in the same meal; that is not true, because the body maintains an amino-acid pool, so simply eating a varied plant diet across the day is enough for people getting adequate total protein.`,
    createdAt: Date.now(),
  },
];
