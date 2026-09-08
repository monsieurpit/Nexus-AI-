import { KnowledgeItem } from '../../types';

// Batch 20 (medicine & common conditions) gap-fills. Live misses on nexus-4b:
// "what is a stroke" -> swimming strokes + engine strokes; "what is a heart
// attack" -> Queen album + Heart Attack Grill; "what is cancer" -> naked mole
// rats; "what is inflammation" -> refused ("NARROW IT DOWN"); "what causes a
// fever" -> only listed cold vs flu viruses, no mechanism; "diabetes" -> only
// type 2; "what is a fracture" -> first-aid only; "muscle cramps" -> atrophy
// and hypertrophy.
// NOTE: general health information, not medical advice.
export const MEDICINE_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-stroke',
    title: 'What a Stroke Is',
    category: 'Medicine',
    keywords: [
      'what is a stroke', 'what is a stroke medical', 'what causes a stroke', 'ischemic vs hemorrhagic stroke',
      'signs of a stroke', 'what is a mini stroke', 'what is a TIA', 'FAST stroke',
    ],
    content: `A stroke is a medical emergency in which the blood supply to part of the brain is suddenly cut off, so brain cells in that area start to die within minutes from lack of oxygen. There are two main types: ischemic (about 85%), caused by a blood clot blocking an artery to or in the brain; and hemorrhagic, caused by a blood vessel in the brain bursting and bleeding. A "mini-stroke" or TIA (transient ischemic attack) has the same causes but the blockage clears and symptoms resolve — it's a major warning sign. Warning signs are remembered as FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. Other signs: sudden numbness on one side, confusion, trouble seeing, severe sudden headache, loss of balance. Fast treatment (clot-busting drugs or clot removal) can limit the damage, which is why every minute counts. Risk factors: high blood pressure, smoking, diabetes, high cholesterol, atrial fibrillation, age.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-heart-attack',
    title: 'What a Heart Attack Is',
    category: 'Medicine',
    keywords: [
      'what is a heart attack', 'what causes a heart attack', 'myocardial infarction', 'heart attack symptoms',
      'difference between heart attack and cardiac arrest', 'what is a coronary artery blockage', 'signs of a heart attack',
    ],
    content: `A heart attack (myocardial infarction) happens when blood flow through one of the coronary arteries — the vessels that feed the heart muscle itself — is blocked, usually by a blood clot forming on a ruptured fatty plaque. The part of the heart muscle beyond the blockage is starved of oxygen and begins to die, so it's a medical emergency; the faster the artery is reopened (with clot-busting drugs or a stent), the more muscle is saved. Typical symptoms: pressure, tightness or pain in the centre of the chest, often spreading to the left arm, jaw, neck or back; shortness of breath; cold sweat; nausea; light-headedness. Women, older people and diabetics more often have "atypical" or subtle symptoms. A heart attack is NOT the same as a cardiac arrest — a heart attack is a plumbing/circulation problem where the heart usually keeps beating; a cardiac arrest is an electrical problem where the heart stops pumping entirely and the person collapses and stops breathing (a heart attack can trigger one). Risk factors: smoking, high blood pressure, high cholesterol, diabetes, obesity, inactivity, family history.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-cancer',
    title: 'What Cancer Is',
    category: 'Medicine',
    keywords: [
      'what is cancer', 'what causes cancer', 'how does cancer work', 'what is a tumor', 'benign vs malignant',
      'what is metastasis', 'why is cancer hard to cure', 'what is a carcinogen',
    ],
    content: `Cancer is a group of diseases in which some of the body's own cells start to divide uncontrollably and won't stop. Normally cells grow, divide and die on a tight schedule; cancer begins when a cell accumulates mutations in the genes that control that schedule (often from tobacco, UV light, certain viruses, some chemicals, radiation, inherited faults, or just random copying errors over a lifetime). The abnormal cells ignore stop signals, evade the immune system, and often form a lump called a tumour. A benign tumour stays put and is usually not dangerous; a malignant (cancerous) tumour invades nearby tissue and can shed cells that travel through the blood or lymph to start new tumours elsewhere — this spread is called metastasis and is what makes cancer deadly. There are more than 100 types, named for where they start (lung, breast, colon, blood/leukaemia, etc.), each with different behaviour and treatment (surgery, radiation, chemotherapy, immunotherapy, targeted drugs). Cancer is hard to cure precisely because it's the body's own cells and because it keeps mutating.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-inflammation',
    title: 'What Inflammation Is',
    category: 'Medicine',
    keywords: [
      'what is inflammation', 'what causes inflammation', 'acute vs chronic inflammation', 'signs of inflammation',
      'what does inflamed mean', 'is inflammation bad', 'what is the inflammatory response',
    ],
    content: `Inflammation is the body's built-in response to harm — injury, infection, irritants, or damaged cells. When tissue is hurt, it releases chemical signals (like histamine and cytokines) that widen nearby blood vessels and make them leaky, so more blood and immune cells flood the area. The classic signs are redness, heat, swelling, pain and (sometimes) loss of function. This ACUTE inflammation is protective and short-lived: it isolates the damage, destroys pathogens, clears debris and starts repair, then shuts off. CHRONIC inflammation is when the response doesn't switch off — lasting months or years, from a persistent irritant, an autoimmune reaction, or ongoing stress on tissue. That low-grade smouldering is harmful and is linked to heart disease, type 2 diabetes, arthritis, some cancers and more. So inflammation itself isn't "bad" — acute inflammation is essential healing; it's the chronic, unresolved kind that causes problems.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-causes-fever',
    title: 'What Causes a Fever',
    category: 'Medicine',
    keywords: [
      'what causes a fever', 'why do we get fevers', 'how does a fever work', 'what is a fever', 'why does the body raise its temperature',
      'is a fever helpful', 'what temperature is a fever',
    ],
    content: `A fever is a temporary rise in body temperature above the normal ~37 °C (98.6 °F), generally counted as a fever at about 38 °C (100.4 °F) or higher. It's not the illness itself — it's a controlled response by the body. During an infection, the immune system and invading microbes release substances called pyrogens; these act on the hypothalamus, the brain's thermostat, and reset its target temperature upward. The body then shivers, constricts skin blood vessels and you feel cold, until it reaches the new set point. The higher temperature is thought to help: it makes the body less hospitable to many bacteria and viruses and speeds up immune cell activity. Fevers are most often caused by infections (viral or bacterial), but also by inflammatory conditions, heat exhaustion, some medications and vaccines, and occasionally more serious illness. Very high fevers (above ~40 °C / 104 °F), or fever with confusion, stiff neck, trouble breathing or a non-fading rash, need urgent medical attention.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-diabetes',
    title: 'What Diabetes Is',
    category: 'Medicine',
    keywords: [
      'what is diabetes', 'type 1 vs type 2 diabetes', 'what causes diabetes', 'what is insulin', 'what is insulin resistance',
      'what is blood sugar', 'what is gestational diabetes', 'symptoms of diabetes',
    ],
    content: `Diabetes is a group of conditions where blood glucose (blood sugar) stays too high because the hormone insulin isn't working properly. Insulin, made by the pancreas, lets cells take glucose out of the blood for energy. Type 1 diabetes (about 5–10% of cases, usually diagnosed in childhood) is an autoimmune disease: the immune system destroys the insulin-producing cells, so the body makes little or no insulin and the person needs insulin injections for life. Type 2 diabetes (the large majority) develops when cells become resistant to insulin and the pancreas can't keep up; it's strongly linked to excess weight, inactivity, genetics and age, and is managed with diet, exercise, oral medication and sometimes insulin. Gestational diabetes appears during pregnancy and usually resolves after birth. Classic symptoms: excessive thirst, frequent urination, fatigue, blurred vision, unexplained weight loss. Untreated, chronically high blood sugar damages blood vessels and nerves, leading to heart disease, kidney failure, vision loss and poor wound healing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fracture',
    title: 'What a Fracture Is',
    category: 'Medicine',
    keywords: [
      'what is a fracture', 'what is a bone fracture', 'types of fractures', 'what is a hairline fracture',
      'what is a compound fracture', 'difference between a fracture and a break', 'how do broken bones heal',
    ],
    content: `A fracture is a break or crack in a bone — "fracture" and "break" mean the same thing medically. Types include: hairline/stress fracture (a fine crack from repeated force); greenstick (a partial break, common in children whose bones are softer); complete (the bone is in two or more pieces); comminuted (shattered into several fragments); displaced (the ends are out of line); and open/compound (the broken bone breaks the skin — an emergency because of infection risk) versus closed. Causes: trauma (falls, sports, crashes), overuse, or weakened bone (osteoporosis, tumours). Signs: pain, swelling, bruising, deformity, inability to use the limb, sometimes a snap. Treatment realigns the bone (a cast, splint, or surgery with pins/plates) and holds it still while it heals; bone knits itself back together over roughly 6–8 weeks (longer for large bones or adults) by forming a "callus" of new bone across the break.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-muscle-cramps',
    title: 'What Causes Muscle Cramps',
    category: 'Medicine',
    keywords: [
      'what causes muscle cramps', 'why do i get muscle cramps', 'what is a muscle cramp', 'leg cramps at night',
      'how to stop a muscle cramp', 'what causes a charley horse', 'why do muscles cramp during exercise',
    ],
    content: `A muscle cramp is a sudden, involuntary, painful contraction of a muscle (or part of one) that won't relax for anything from seconds to minutes; the calf, foot and thigh are the usual spots, and a hard calf cramp is nicknamed a "charley horse." The exact cause isn't fully settled, but the main contributors are: muscle fatigue and overuse (the leading factor in exercise-associated cramps — the nerves controlling the muscle become over-excitable); dehydration and loss of electrolytes (sodium, potassium, magnesium, calcium) through heavy sweating; staying in one position too long or poor circulation (common with night-time leg cramps); and sometimes pregnancy, certain medications (like diuretics), or nerve compression. Relief: gently stretch and massage the muscle, walk around, apply heat then cold, and rehydrate. It is not caused by "swimming after eating."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-headache-types',
    title: 'What Causes a Headache',
    category: 'Medicine',
    keywords: [
      'what causes a headache', 'why do i get headaches', 'types of headaches', 'what is a tension headache',
      'what is a cluster headache', 'what causes a headache behind the eyes', 'when is a headache serious',
    ],
    content: `Most headaches are "primary" — the headache is the condition itself, not a symptom of something else. The common types: tension headache (by far the most frequent — a dull, band-like pressure around the head, linked to muscle tightness, stress, poor posture, screen time); migraine (throbbing, often one-sided, with nausea and sensitivity to light and sound, sometimes preceded by visual "aura"); and cluster headache (rare, excruciating pain around one eye in bouts). "Secondary" headaches are caused by another problem: dehydration, hunger, lack of sleep, caffeine or alcohol (or caffeine withdrawal), eye strain, sinus infection, fever, medication overuse, or high blood pressure. Seek urgent care for a "thunderclap" headache (worst ever, sudden), or a headache with fever and stiff neck, confusion, weakness, vision loss, or after a head injury.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-viral-vs-bacterial-infection',
    title: 'Viral vs Bacterial Infection',
    category: 'Medicine',
    keywords: [
      'what is the difference between a viral and bacterial infection', 'viral vs bacterial infection', 'is it viral or bacterial',
      'why dont antibiotics work on viruses', 'how to tell if an infection is bacterial', 'what is antibiotic resistance',
    ],
    content: `Bacteria are complete single-celled living organisms that can grow and multiply on their own; viruses are much smaller, are not really "alive" on their own, and can only reproduce by hijacking your cells' machinery. The practical difference: antibiotics work by attacking structures and processes that bacteria have and human cells and viruses don't (cell walls, bacterial ribosomes) — so antibiotics treat bacterial infections (strep throat, many ear and urinary infections, bacterial pneumonia) but do NOTHING against viruses (colds, flu, COVID, most sore throats and coughs). Taking antibiotics for a viral illness doesn't help and drives antibiotic resistance, where bacteria evolve to survive the drugs. Viral infections are managed with rest, fluids, symptom relief and sometimes specific antivirals or vaccines. You often can't tell them apart from symptoms alone; doctors use the pattern of illness, its duration, and sometimes a swab or blood test.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-anemia',
    title: 'What Anemia Is',
    category: 'Medicine',
    keywords: [
      'what is anemia', 'what is anaemia', 'what causes anemia', 'iron deficiency anemia', 'symptoms of anemia',
      'why does anemia make you tired', 'how is anemia treated',
    ],
    content: `Anemia is a condition where the blood can't carry enough oxygen to the body's tissues, either because there are too few red blood cells or too little haemoglobin (the iron-containing protein in red cells that binds oxygen). Because every tissue needs oxygen, the main symptoms are tiredness and weakness, pale skin, shortness of breath on exertion, dizziness, cold hands and feet, and a fast heartbeat. The most common cause worldwide is iron deficiency — from blood loss (heavy periods, gut bleeding), not enough iron in the diet, or poor absorption. Other causes: deficiency of vitamin B12 or folate; chronic diseases and kidney failure; inherited disorders like sickle cell anemia and thalassemia; and bone marrow problems (aplastic anemia). Treatment depends on the cause — iron or vitamin supplements, diet changes, treating the underlying bleeding or disease, and in severe cases transfusions.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-heartburn',
    title: 'What Causes Heartburn',
    category: 'Medicine',
    keywords: [
      'what causes heartburn', 'what is heartburn', 'what is acid reflux', 'what is GERD', 'why do i get heartburn at night',
      'foods that cause heartburn', 'how to relieve heartburn',
    ],
    content: `Heartburn is a burning feeling behind the breastbone, sometimes rising into the throat with a sour taste, caused by stomach acid flowing back up into the oesophagus (acid reflux). At the top of the stomach is a ring of muscle, the lower oesophageal sphincter, that should stay shut except when swallowing; heartburn happens when it relaxes or is pushed open at the wrong time. Common triggers: large or fatty meals, lying down or bending over soon after eating, being overweight, pregnancy, a hiatus hernia, smoking, alcohol, coffee, chocolate, citrus, tomato, spicy or minty foods, and some medications. Occasional heartburn is normal; frequent heartburn (roughly twice a week or more) is called GERD and can, over time, damage the oesophagus. Relief: smaller meals, not lying down for 2–3 hours after eating, raising the head of the bed, losing excess weight, avoiding trigger foods, and antacids or acid-reducing medicines.`,
    createdAt: Date.now(),
  },
];
