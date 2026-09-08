import { KnowledgeItem } from '../../types';

// Batch 33 (human body systems, deeper) gap-fills. Live misses on nexus-4b:
// "how does a nerve impulse travel" -> "nerve conduction velocity (CV) is the
// speed..." web dump, no mechanism; "somatic vs autonomic nervous system" ->
// "the central nervous system... is the somatic nervous system" (confused the
// CNS/PNS split). Plus several thin answers on the major systems and organs.
export const BODY_SYSTEMS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-nerve-impulse',
    title: 'How a Nerve Impulse Travels',
    category: 'Human Body',
    keywords: [
      'how does a nerve impulse travel', 'what is an action potential', 'how do neurons send signals', 'what is depolarization',
      'what is saltatory conduction', 'how fast do nerve signals travel', 'what is a synapse', 'nodes of ranvier',
    ],
    content: `A nerve impulse is an "action potential" — a brief electrical spike that travels along a neuron's axon. At rest, a neuron pumps ions so the inside is about −70 mV relative to the outside (the "resting potential"). When a stimulus pushes a spot on the membrane past a threshold (~−55 mV), voltage-gated sodium channels snap open and Na+ ions rush in, flipping that patch briefly positive (depolarisation). This opens the channels just ahead, so the spike sweeps down the axon like a line of falling dominoes; behind it, potassium flows out to reset the membrane. It's all-or-nothing (either a full spike or none) and one-way. In myelinated axons the impulse leaps between the bare gaps in the insulation (nodes of Ranvier) — "saltatory conduction" — which is far faster (up to ~120 m/s) than in unmyelinated fibres (~1 m/s). At the end of the axon the electrical signal is converted to a chemical one: it triggers release of neurotransmitter molecules across the tiny gap (synapse) to the next cell.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-somatic-vs-autonomic',
    title: 'Somatic vs Autonomic Nervous System',
    category: 'Human Body',
    keywords: [
      'what is the difference between the somatic and autonomic nervous system', 'somatic vs autonomic nervous system',
      'what is the somatic nervous system', 'what is the autonomic nervous system', 'sympathetic vs parasympathetic',
      'voluntary vs involuntary nervous system',
    ],
    content: `Both are subdivisions of the PERIPHERAL nervous system (everything outside the brain and spinal cord), and both carry signals to and from the central nervous system. The SOMATIC nervous system handles the parts you consciously control and sense: it carries sensory information from the skin, muscles and joints inward, and motor commands out to the skeletal (voluntary) muscles — so it's how you feel a touch and decide to move your arm. The AUTONOMIC nervous system runs automatically, without conscious thought, controlling smooth muscle, cardiac muscle and glands — heart rate, blood pressure, digestion, breathing rate, sweating, pupil size. It has two opposing branches: the sympathetic ("fight or flight" — speeds the heart, dilates pupils, diverts blood to muscles) and the parasympathetic ("rest and digest" — slows the heart, stimulates digestion), which are usually balancing each other. A third part, the enteric nervous system, manages the gut fairly independently.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-circulatory-system-full',
    title: 'What the Circulatory System Is',
    category: 'Human Body',
    keywords: [
      'what is the circulatory system', 'what does the circulatory system do', 'parts of the circulatory system',
      'what is the cardiovascular system', 'pulmonary vs systemic circulation', 'what does blood transport',
    ],
    content: `The circulatory (cardiovascular) system moves blood around the body, and with it oxygen, nutrients, hormones, immune cells, and heat, while carrying away carbon dioxide and other wastes. Its parts: the heart (a double pump), the blood vessels (arteries carrying blood away from the heart, veins returning it, capillaries — one-cell-wall-thick — where exchange with tissues happens), and the blood itself (red cells, white cells, platelets, plasma). It runs as two loops in series: the PULMONARY circuit sends oxygen-poor blood from the right side of the heart to the lungs to pick up oxygen and drop off CO2; the SYSTEMIC circuit sends the now oxygen-rich blood from the left side of the heart out to the whole body and back. An adult has about 5 litres of blood, and the heart pushes the whole volume around roughly once a minute at rest.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-digestive-system-full',
    title: 'What the Digestive System Does',
    category: 'Human Body',
    keywords: [
      'what is the digestive system', 'how does digestion work', 'path of food through the body', 'what does the stomach do',
      'what does the small intestine do', 'what does the large intestine do', 'how long does digestion take',
    ],
    content: `The digestive system breaks food down into molecules small enough to absorb into the blood, and packages the rest as waste. The path: MOUTH — chewing plus saliva (amylase starts on starch); ESOPHAGUS — muscular waves (peristalsis) push the ball of food down; STOMACH — churns it with hydrochloric acid and the enzyme pepsin into a soupy "chyme," mainly starting protein digestion and killing microbes; SMALL INTESTINE (about 6 m) — the main site of digestion and absorption: bile from the liver/gallbladder emulsifies fat, enzymes from the pancreas (and the intestinal lining) finish breaking down carbs, protein and fat, and the products are absorbed through millions of finger-like villi into the blood and lymph; LARGE INTESTINE (colon) — reabsorbs water and salts, houses gut bacteria that ferment fibre and make some vitamins, and forms feces; RECTUM and ANUS — store and expel waste. The liver, gallbladder and pancreas are accessory organs that feed in juices. Whole transit takes roughly 24–72 hours.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-kidney-filter',
    title: 'How the Kidney Filters Blood',
    category: 'Human Body',
    keywords: [
      'how does the kidney filter blood', 'what does the kidney do', 'what is a nephron', 'what is the glomerulus',
      'how is urine made', 'what do kidneys regulate', 'what is filtration and reabsorption in the kidney',
    ],
    content: `Each kidney holds about a million tiny filtering units called nephrons. In each nephron, a tuft of leaky capillaries (the glomerulus) sits inside a cup (Bowman's capsule); blood pressure forces water and small dissolved substances — glucose, salts, amino acids, urea — out of the blood and into the tubule, while blood cells and proteins stay behind. This "filtrate" (about 180 litres a day) then runs down a long looping tubule where the body reclaims what it wants to keep: essentially all the glucose and amino acids, most of the water and salts are reabsorbed back into surrounding capillaries, and a few extra wastes and excess ions are actively secreted in. What's left — roughly 1–2 litres a day of concentrated urea, excess salts and water — is urine, which drains to the bladder. Beyond removing waste, the kidneys regulate blood pressure, blood volume, pH, and electrolyte levels, activate vitamin D, and release the hormone (erythropoietin) that tells the marrow to make red blood cells.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arteries-vs-veins-full',
    title: 'Arteries vs Veins',
    category: 'Human Body',
    keywords: [
      'what is the difference between arteries and veins', 'arteries vs veins', 'what do arteries do', 'what do veins do',
      'why do veins have valves', 'is blood in veins blue', 'what are capillaries', 'pulmonary artery exception',
    ],
    content: `Arteries carry blood AWAY from the heart; veins carry blood BACK to the heart. Arteries have thick, muscular, elastic walls to handle the high pressure of each heartbeat and they don't need valves; veins have thinner walls, operate at low pressure, and have one-way valves plus help from surrounding muscle contractions to push blood upward against gravity. Usually arteries carry oxygen-rich blood and veins carry oxygen-poor blood — but there are two exceptions: the pulmonary arteries carry oxygen-poor blood to the lungs, and the pulmonary veins carry oxygen-rich blood back. Between the smallest arteries and veins are capillaries, whose walls are a single cell thick, where oxygen, nutrients and wastes actually pass between blood and tissue. Blood is never actually blue; deoxygenated blood is dark red, and veins look bluish only because of how skin filters light.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hypothalamus',
    title: 'What the Hypothalamus Does',
    category: 'Human Body',
    keywords: [
      'what is the role of the hypothalamus', 'what does the hypothalamus do', 'hypothalamus function', 'where is the hypothalamus',
      'how does the hypothalamus control hormones', 'what controls body temperature in the brain', 'hypothalamus and pituitary',
    ],
    content: `The hypothalamus is a small region at the base of the brain, below the thalamus and just above the pituitary gland. It's the main link between the nervous system and the endocrine (hormone) system, and it keeps the body's internal conditions stable (homeostasis). Its jobs include regulating body temperature, hunger and thirst, the sleep–wake cycle and circadian rhythms, and emotional and stress responses, and it drives the autonomic nervous system. It controls hormones two ways: it makes "releasing" and "inhibiting" hormones that tell the anterior pituitary when to secrete its hormones (which in turn control the thyroid, adrenals, ovaries/testes, growth, and milk production), and it directly produces two hormones (ADH for water balance and oxytocin) that are stored and released by the posterior pituitary. In short, it's the body's master thermostat and control panel.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-white-blood-cells',
    title: 'What White Blood Cells Do',
    category: 'Human Body',
    keywords: [
      'what is the function of white blood cells', 'what do white blood cells do', 'types of white blood cells', 'what are leukocytes',
      'what is a neutrophil', 'what is a lymphocyte', 'what do b cells and t cells do', 'innate vs adaptive immunity',
    ],
    content: `White blood cells (leukocytes) are the body's mobile immune defence, made in the bone marrow and patrolling the blood and tissues. The main types: NEUTROPHILS — the most numerous, first on the scene at an infection, they swallow and destroy bacteria and fungi (phagocytosis) then die (forming pus). MACROPHAGES and DENDRITIC CELLS — bigger "eaters" that engulf pathogens and debris and then show fragments of them to other immune cells to raise the alarm. LYMPHOCYTES, which run the specific, adaptive response: B cells make antibodies that tag or neutralise a particular pathogen; helper T cells coordinate the whole response; cytotoxic (killer) T cells destroy the body's own cells that are infected by a virus or turned cancerous; and memory cells stick around for years so a second exposure is beaten fast (the basis of immunity and vaccination). EOSINOPHILS and BASOPHILS deal with parasites and allergic reactions. NEUTROPHILS/MACROPHAGES are "innate" (fast, general); lymphocytes are "adaptive" (slower, targeted, remembered).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-liver-functions',
    title: 'What the Liver Does',
    category: 'Human Body',
    keywords: [
      'what does the liver do', 'functions of the liver', 'what is the largest internal organ', 'how does the liver detoxify',
      'does the liver store energy', 'what does the liver make', 'why can the liver regenerate',
    ],
    content: `The liver is the largest internal organ and one of the busiest, with hundreds of jobs. Key ones: it processes everything absorbed from the gut (blood from the intestines goes to the liver first) — storing excess glucose as glycogen and releasing it when blood sugar drops, converting nutrients, and building most of the body's plasma proteins including clotting factors and albumin. It detoxifies: breaking down alcohol, drugs, and metabolic wastes (turning toxic ammonia into urea for the kidneys to excrete). It makes bile, which is stored in the gallbladder and released to digest fats. It stores iron and vitamins A, D, B12 and K. It clears old red blood cells and bacteria from the blood, and helps regulate cholesterol and hormone levels. It's famous for regenerating — it can regrow to full size from as little as 25% of its tissue — but chronic damage from alcohol, fatty liver or hepatitis can eventually scar it permanently (cirrhosis).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-homeostasis-clean',
    title: 'What Homeostasis Is',
    category: 'Human Body',
    keywords: [
      'what is homeostasis', 'what does homeostasis mean', 'examples of homeostasis', 'what is negative feedback in biology',
      'how does the body regulate temperature', 'how does the body control blood sugar', 'what is a set point in biology',
    ],
    content: `Homeostasis is the process by which the body keeps its internal conditions stable and within a narrow healthy range despite changes outside — things like body temperature (~37 °C), blood glucose, blood pH (~7.4), water and salt balance, blood pressure, and oxygen/CO2 levels. It mostly works by negative feedback: a sensor detects that a value has drifted from its "set point," a control centre (often the hypothalamus or an endocrine gland) is informed, and effectors act to push it back — then, as the value returns to normal, the correction switches off. Examples: too hot → sweating and skin blood vessels widen → temperature drops; blood sugar high after a meal → pancreas releases insulin → cells take up glucose → sugar falls; blood sugar low → pancreas releases glucagon → liver releases stored glucose. Positive feedback (which amplifies a change) is rarer and used for events that need to run to completion, like blood clotting and childbirth.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-blood-brain-barrier',
    title: 'What the Blood–Brain Barrier Is',
    category: 'Human Body',
    keywords: [
      'what is the blood brain barrier', 'what does the blood brain barrier do', 'how does the blood brain barrier work',
      'what can cross the blood brain barrier', 'why is it hard to get drugs into the brain', 'blood brain barrier function',
    ],
    content: `The blood–brain barrier is a highly selective filter formed by the walls of the tiny blood vessels (capillaries) that run through the brain. In the rest of the body, capillary walls have small gaps that let substances leak through; in the brain, the cells lining the capillaries are sealed together by "tight junctions" with no gaps, and are wrapped by support cells (astrocytes and pericytes). This lets essential things through by specific transport — oxygen and carbon dioxide diffuse freely, and glucose, some amino acids and small fat-soluble molecules have dedicated carriers — while blocking most large molecules, many toxins, most bacteria, and the majority of drugs, and keeping the brain's chemical environment stable and protected from swings in blood composition. The downside is that it makes treating brain infections, tumours and disorders hard, because most medicines can't get in; it can also break down in stroke, infection or MS.`,
    createdAt: Date.now(),
  },
];
