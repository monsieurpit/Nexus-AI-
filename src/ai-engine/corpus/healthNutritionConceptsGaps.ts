import { KnowledgeItem } from '../../types';

/**
 * HEALTH_NUTRITION_CONCEPTS_GAPS — batch 213 corrections.
 * Content follows mainstream clinical / nutrition-science consensus.
 * Misses: "calorie vs joule" gave a wrong conversion, "vitamin vs mineral"
 * called iron a vitamin and invented plant biology, "nurse practitioner vs
 * doctor" answered MD vs DO, "white vs brown fat" answered about cooking roux,
 * "OTC vs prescription drugs" claimed OTC drugs are basically supplements,
 * "stroke vs heart attack" said strokes clear up quicker, "dehydration vs
 * hyponatremia" said they are the same thing, plus web dumps for simple/
 * complex carbs, strength/hypertrophy, HDL/LDL and MRI/CT.
 */
export const HEALTH_NUTRITION_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-healthnut-calorie-vs-joule',
    title: 'Calorie vs joule',
    category: 'health',
    keywords: [
      'difference between a calorie and a joule', 'calorie vs joule', 'unit of energy',
      'small calorie versus kilocalorie', 'food Calorie', '4.184 joules', '4184 joules',
      'kilojoules on nutrition labels', 'SI unit',
    ],
    content: `Both measure energy; they are just different units, like metres versus feet.

The joule (J) is the SI (metric) unit of energy used in science. One kilojoule (kJ) = 1000 J.

The calorie has two meanings:
- The "small calorie" (cal): the energy to raise 1 gram of water by 1 degree Celsius. 1 cal = about 4.184 J.
- The "large Calorie" or kilocalorie (kcal, Cal with a capital C): 1000 small calories = about 4184 J = about 4.184 kJ. This is the "calorie" used on food labels and in diets. A "2000-calorie diet" means 2000 kcal.

So the conversions are: 1 cal = 4.184 J, and 1 food Calorie (kcal) = 4.184 kJ. A snack labelled "250 Calories" contains about 1046 kJ. Many countries (Australia, EU) print kilojoules on labels instead of, or alongside, kilocalories. Note it is wrong to say a calorie "is about 4.184 joules and basically the same amount of energy" — the food Calorie is a thousand times larger than that.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-vitamin-vs-mineral',
    title: 'Vitamin vs mineral (iron is a mineral)',
    category: 'health',
    keywords: [
      'difference between a vitamin and a mineral', 'vitamin vs mineral', 'organic compound',
      'inorganic element', 'iron is a mineral not a vitamin', 'fat-soluble water-soluble vitamins',
      'macrominerals trace minerals', 'micronutrients', 'destroyed by cooking',
    ],
    content: `Both are micronutrients the body needs in small amounts, but they are chemically different kinds of thing.

Vitamins are organic compounds (they contain carbon and are made by living things — plants, animals, some microbes). There are 13: the fat-soluble ones (A, D, E, K) which the body can store, and the water-soluble ones (the B vitamins and C) which are not stored much and are needed regularly. Because they are complex molecules, vitamins can be broken down by heat, light, air and prolonged cooking.

Minerals are inorganic chemical elements that come originally from soil and water and enter the food chain through plants and animals. They are indestructible by cooking (though they can leach into cooking water). They divide into major minerals, needed in larger amounts (calcium, phosphorus, magnesium, sodium, potassium, chloride, sulfur), and trace minerals, needed in tiny amounts (iron, zinc, iodine, selenium, copper, manganese, fluoride, chromium).

Important: iron is a MINERAL, not a vitamin. Iron-deficiency anaemia (fatigue, pallor, brittle nails, shortness of breath) is a mineral deficiency. And humans do not absorb nutrients "through roots" or xylem — that is plant biology; we absorb vitamins and minerals from food through the lining of the small intestine.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-np-vs-doctor',
    title: 'Nurse practitioner vs doctor (physician)',
    category: 'health',
    keywords: [
      'difference between a nurse practitioner and a doctor', 'nurse practitioner vs physician',
      'NP versus MD', 'advanced practice registered nurse', 'scope of practice', 'training length',
      'prescribing', 'supervision and collaboration', 'not MD versus DO',
    ],
    content: `A physician (doctor) — MD or DO — completes a 4-year undergraduate degree, 4 years of medical school, and then 3 to 7+ years of residency (and often a fellowship), roughly 11-15+ years of training. Physicians have the broadest scope of practice: they can diagnose and treat the full range of conditions, perform surgery and complex procedures, and manage the most complicated or critically ill patients. (MD vs DO is a separate, much smaller distinction — two equivalent physician degrees with slightly different training philosophy; both are fully licensed doctors.)

A nurse practitioner (NP) is an advanced practice registered nurse: a registered nurse (BSN, plus clinical experience) who then completes a master's or doctoral NP degree, roughly 6-8 years of education total. NPs take histories, examine patients, order and interpret tests, diagnose, prescribe medication, and manage common acute and chronic conditions, often in primary care, and frequently serve as a patient's main provider. Their legal scope varies by jurisdiction: in some places NPs practise fully independently, in others they must work under or in collaboration with a physician. They generally refer complex cases and surgical needs to physicians.

Short version: both diagnose and prescribe, but a physician has substantially longer training and a wider scope, especially for complex, surgical and critical care; NPs are central to primary and routine care and, depending on the region, may work independently or in a collaborative arrangement.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-white-vs-brown-fat',
    title: 'White fat vs brown fat (adipose tissue, not roux)',
    category: 'health',
    keywords: [
      'difference between white and brown fat', 'white adipose tissue', 'brown adipose tissue',
      'energy storage', 'heat production thermogenesis', 'mitochondria UCP1', 'BAT in infants',
      'beige fat', 'not white and brown roux', 'brown fat burns calories',
    ],
    content: `This is about body fat (adipose tissue), not cooking roux.

White fat (white adipose tissue) is the main fat in the adult body. Its cells are large, each containing one big droplet of stored triglyceride and few mitochondria. Its job is energy storage: it holds calories for later, cushions organs, insulates the body, and releases hormones (leptin, adiponectin). Excess white fat, especially visceral fat around the organs, raises the risk of type 2 diabetes and heart disease.

Brown fat (brown adipose tissue) has small cells with many fat droplets and a very high density of mitochondria — the iron in those mitochondria is what makes it look brown. Its job is heat production (non-shivering thermogenesis): a protein called UCP1 lets the mitochondria "burn" fatty acids to release energy as heat instead of storing it as ATP. Brown fat is abundant in newborns (who cannot shiver well) and in hibernating animals; adults keep small deposits (neck, upper back) that activate in the cold. Because it burns energy, brown fat is studied as a possible target for treating obesity.

"Beige" (brite) fat is white fat that can take on brown-fat-like calorie-burning behaviour when stimulated by cold or exercise.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-otc-vs-prescription',
    title: 'Over-the-counter vs prescription drugs',
    category: 'health',
    keywords: [
      'difference between over the counter and prescription drugs', 'OTC vs prescription',
      'no prescription needed', 'requires a doctor', 'safety margin', 'FDA drug approval',
      'not dietary supplements', 'behind the counter', 'schedule controlled substances',
    ],
    content: `Both over-the-counter (OTC) and prescription products are regulated DRUGS that have been reviewed for safety and effectiveness and are legally allowed to treat, relieve, cure or prevent specific conditions. (This is different from dietary supplements, which cannot legally claim to treat or cure anything — that is the "supports immune health" wording. OTC medicines are not supplements.)

OTC drugs (ibuprofen, acetaminophen/paracetamol, loratadine and other antihistamines, antacids, hydrocortisone cream, many cough and cold products) can be bought without a prescription because, used as directed on the label, they have a wide safety margin, treat conditions people can reliably self-diagnose, and have low potential for harm or misuse. The label must give clear dosing and warnings.

Prescription drugs require a licensed prescriber's authorisation and are dispensed by a pharmacist because they need a professional diagnosis, have narrower safety margins, need dose adjustment or monitoring, carry serious interaction or side-effect risks, or have abuse potential (controlled substances are prescription drugs with extra restrictions). Antibiotics, blood-pressure and diabetes medicines, most psychiatric drugs, opioids and inhaled steroids are prescription-only.

Some drugs are "behind the counter" — no prescription, but a pharmacist must hand them over (for example pseudoephedrine). A drug can move from prescription to OTC once it has a long enough safety record.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-stroke-vs-heart-attack',
    title: 'Stroke vs heart attack',
    category: 'health',
    keywords: [
      'difference between a stroke and a heart attack', 'stroke vs heart attack', 'brain versus heart',
      'ischemic stroke', 'hemorrhagic stroke', 'myocardial infarction', 'coronary artery',
      'FAST warning signs', 'time is brain', 'call emergency services',
    ],
    content: `Both are medical emergencies caused (usually) by a blocked blood vessel starving tissue of oxygen, but in different organs, with different warning signs. Neither one "clears up quickly on its own" — both cause permanent tissue death within minutes to hours and need emergency treatment immediately.

A heart attack (myocardial infarction) is a blockage of a coronary artery, cutting blood to part of the heart muscle. Typical signs: chest pain or pressure (often spreading to the arm, jaw, neck or back), shortness of breath, cold sweat, nausea, light-headedness. Women and people with diabetes more often have subtler symptoms.

A stroke is loss of blood flow to part of the brain, either from a clot (ischemic, ~85%) or a bleed (hemorrhagic). Signs are sudden and neurological — remembered as FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. Also sudden vision loss, severe headache, confusion, or loss of balance.

For both, "time is tissue": clot-busting drugs and procedures work only within a few hours, and every minute of delay means more permanent damage (paralysis, speech loss, disability, or death for a stroke; heart failure or cardiac arrest for a heart attack). Call emergency services immediately; do not wait to see if it passes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-dehydration-vs-hyponatremia',
    title: 'Dehydration vs hyponatremia',
    category: 'health',
    keywords: [
      'difference between dehydration and hyponatremia', 'dehydration vs hyponatremia', 'fluid loss',
      'low blood sodium', 'water intoxication', 'overhydration', 'endurance athletes', 'electrolytes',
      'opposite sodium states', 'confusion seizures',
    ],
    content: `These are close to opposites in what is happening to the body's sodium, even though both can cause confusion and can occur during heavy exercise.

Dehydration is a deficit of body water — from sweating, vomiting, diarrhoea, fever, or not drinking enough. You lose both water and salt, but usually proportionally more water, so blood sodium concentration tends to stay normal or rise (the blood becomes more concentrated). Signs: thirst, dark urine, dry mouth, fatigue, dizziness, low blood pressure, fast heart rate. Treatment is fluids, with electrolytes if losses are large.

Hyponatremia is abnormally LOW blood sodium concentration. In the exercise setting ("exercise-associated hyponatremia") it is typically caused by drinking too much plain water — more than the kidneys can excrete — during prolonged endurance events, which dilutes the sodium in the blood. The body actually has too much water relative to salt. Signs: nausea, headache, bloating, puffiness, confusion, and in severe cases seizures, coma and brain swelling, which can be fatal. Treatment is fluid restriction and, if severe, hypertonic (concentrated) saline under medical care — giving plain water or lots of fluid makes it worse.

Key point: a marathon runner who collapses confused might be dehydrated OR hyponatremic, and the treatments are opposite, which is why sodium level is checked before giving fluids.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-simple-vs-complex-carbs',
    title: 'Simple vs complex carbohydrates',
    category: 'health',
    keywords: [
      'difference between simple and complex carbohydrates', 'simple vs complex carbs', 'sugars',
      'starches and fiber', 'monosaccharides disaccharides', 'polysaccharides', 'glycemic index',
      'blood sugar spike', 'whole grains legumes vegetables', 'refined versus whole food',
    ],
    content: `Carbohydrates are classified by the size of their sugar molecules.

Simple carbohydrates are one or two sugar units: monosaccharides (glucose, fructose, galactose) and disaccharides (sucrose = table sugar, lactose = milk sugar, maltose). They are found naturally in fruit and milk, and added to sweets, soft drinks and many processed foods. They are digested quickly.

Complex carbohydrates are long chains of many sugar units (polysaccharides): starches (in grains, potatoes, legumes) and dietary fibre (in whole grains, vegetables, fruit skins, beans). Starch is digested more slowly than simple sugar; fibre is not digested at all and adds bulk, feeds gut bacteria and slows the absorption of other nutrients.

The common advice "eat complex, avoid simple" is a rough guide, not a rule. What actually matters most is whether the food is minimally processed and fibre-rich: lentils, beans, intact whole grains and non-starchy vegetables are healthy because of their fibre, vitamins and slow digestion, not simply because their carbs are "complex". White bread and white rice are complex carbs but behave much like sugar. The glycemic index and glycemic load (how fast and how much a food raises blood sugar) are more useful measures than the simple/complex label.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-strength-vs-hypertrophy',
    title: 'Strength training vs hypertrophy training',
    category: 'health',
    keywords: [
      'difference between strength and hypertrophy training', 'strength vs hypertrophy', 'max force',
      'muscle size', 'low reps heavy weight', 'moderate reps moderate weight', 'neural adaptation',
      'time under tension', 'rest periods', 'powerlifting versus bodybuilding',
    ],
    content: `Both are resistance training and both build muscle and strength, but the emphasis and the typical programming differ.

Strength training aims to maximise how much force you can produce, mostly in the big compound lifts. It relies heavily on neural adaptations (better motor-unit recruitment, coordination, technique) as well as muscle growth. Typical scheme: heavy loads (about 85%+ of your one-rep max), low reps (1-5 per set), more sets, long rest periods (3-5 minutes) so each set is near-maximal. This is how powerlifters and Olympic lifters train.

Hypertrophy training aims to maximise muscle size. It uses mechanical tension plus metabolic stress and accumulated training volume to drive muscle protein synthesis and satellite-cell activity. Typical scheme: moderate loads (about 65-80% of one-rep max), moderate reps (6-12, sometimes up to 20), moderate rest (60-90 seconds), and a focus on total weekly volume (sets x reps x load) and taking sets close to failure. This is how bodybuilders train.

Endurance-focused resistance work sits further along: light loads, 15+ reps, short rest. In practice the ranges overlap and getting bigger and getting stronger go together, especially for beginners; the distinction matters most for people optimising for one specific goal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-hdl-vs-ldl',
    title: 'HDL vs LDL cholesterol',
    category: 'health',
    keywords: [
      'difference between HDL and LDL cholesterol', 'HDL vs LDL', 'good and bad cholesterol',
      'high-density lipoprotein', 'low-density lipoprotein', 'plaque in arteries', 'reverse cholesterol transport',
      'atherosclerosis', 'lipid panel', 'triglycerides',
    ],
    content: `Cholesterol is a waxy substance the body needs to build cell membranes and make hormones and vitamin D. It is not water-soluble, so it travels through the blood packaged in particles called lipoproteins. HDL and LDL are two of those carrier particles; "good" and "bad" refer to the carriers, not to different cholesterol.

LDL (low-density lipoprotein), the "bad" one, carries cholesterol from the liver out to the body's tissues. When there is more LDL than the tissues need, the excess can be deposited in artery walls, where it drives the buildup of plaque (atherosclerosis) that narrows and stiffens arteries and can rupture to cause heart attacks and strokes. Lower LDL is better.

HDL (high-density lipoprotein), the "good" one, does reverse transport: it picks up excess cholesterol from artery walls and tissues and carries it back to the liver to be removed. Higher HDL is generally associated with lower cardiovascular risk, though raising HDL with drugs has not clearly reduced risk, so LDL is the main treatment target.

A standard lipid panel reports total cholesterol, LDL, HDL and triglycerides (a separate blood fat, also raised by excess sugar and alcohol). Diet (less saturated and trans fat, more fibre), exercise, weight loss, not smoking, and statin drugs are the main ways to improve the picture.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-mri-vs-ct',
    title: 'MRI vs CT scan',
    category: 'health',
    keywords: [
      'difference between an MRI and a CT scan', 'MRI vs CT', 'magnetic resonance imaging',
      'computed tomography', 'X-rays versus magnets and radio waves', 'soft tissue detail',
      'bone and bleeding', 'radiation dose', 'speed', 'contraindications metal implants',
    ],
    content: `Both produce cross-sectional ("slice") images of the inside of the body, but by completely different physics.

A CT scan spins an X-ray tube around the patient and reconstructs many projections into detailed slices. It is very fast (seconds to a minute), widely available, and excellent for bone and fractures, acute bleeding (especially in the brain and abdomen), lung disease, kidney stones, and trauma where speed matters. Downsides: it uses ionising radiation (a meaningful dose), and soft-tissue contrast is more limited than MRI. Iodine contrast dye is often used and can affect the kidneys or cause allergic reactions.

An MRI uses a strong magnetic field and radio-frequency pulses to map hydrogen atoms in tissue. It gives superb soft-tissue detail and is the best choice for the brain and spinal cord, joints and ligaments, muscles, and many tumours, and it uses no ionising radiation. Downsides: it is slow (20-60 minutes), noisy, cramped (hard for claustrophobic patients), expensive and less available, and the powerful magnet means it is unsafe for people with certain metal implants (some pacemakers, aneurysm clips, metal fragments in the eye).

Rough rule: CT for fast assessment of trauma, bleeding, bone and chest; MRI for detailed soft-tissue questions, especially brain, spine and joints, and when avoiding radiation matters.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-healthnut-deficit-vs-surplus',
    title: 'Calorie deficit vs calorie surplus',
    category: 'health',
    keywords: [
      'difference between a calorie deficit and surplus', 'calorie deficit vs surplus', 'energy balance',
      'eat less than you burn', 'eat more than you burn', 'weight loss', 'weight gain', 'TDEE',
      'not a government budget', 'bulking and cutting',
    ],
    content: `This is about energy balance in the body: calories eaten versus calories burned (your total daily energy expenditure, TDEE — resting metabolism plus digestion plus activity). It is nothing to do with government budgets or national debt.

A calorie deficit means you take in fewer calories than you burn. The body makes up the shortfall by using stored energy, so over time you lose weight. A deficit of roughly 500 kcal/day produces about 0.45 kg (1 lb) of loss per week. Too aggressive a deficit risks losing muscle along with fat, low energy, and hunger that leads to rebound, so a moderate deficit plus adequate protein and resistance training is the usual advice.

A calorie surplus means you take in more calories than you burn. The excess is stored, mostly as fat, and some as muscle if you are also training hard ("lean bulk"). A surplus is needed to gain size and support strength gains.

Calorie balance (eating about what you burn) keeps weight roughly stable. The size of the deficit or surplus controls how fast weight changes; what you eat and how you train influence how much of that change is fat versus muscle.`,
    createdAt: Date.now(),
  },
];
