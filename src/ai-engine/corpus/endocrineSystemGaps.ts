import { KnowledgeItem } from '../../types';

// Batch 90 (endocrine system & hormones). Weak category (~8/25). nexus-4b
// misses: "hormone vs neurotransmitter", "hyper- vs hypothyroidism", "the
// parathyroid", "prolactin" all came back as raw web dumps; "what is diabetes
// insipidus" was refused ("the text doesn't say anything about it, you're
// asking about something that isn't in this shit"); "what is the thymus" said
// T cells "come from" it and only cytotoxic ones; "what does cortisol do"
// listed only the harms of chronic stress, never the normal function; "what
// does oxytocin do" confused it with ADH; "what is puberty from an endocrine
// standpoint" said "the pituitary going bonkers ... the pancreas is also
// involved, insulin and glucagon."
export const ENDOCRINE_SYSTEM_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-hormone-vs-neurotransmitter',
    title: 'The Difference Between a Hormone and a Neurotransmitter',
    category: 'Endocrine',
    keywords: [
      'what is the difference between a hormone and a neurotransmitter', 'hormone bloodstream vs neurotransmitter synapse',
      'can a molecule be both a hormone and a neurotransmitter', 'adrenaline hormone and neurotransmitter', 'endocrine vs nervous signaling speed range',
    ],
    content: `Both are chemical messengers, and a few substances (adrenaline/noradrenaline, dopamine) act as both. The difference is how they are delivered and how far they reach. A NEUROTRANSMITTER is released by a neuron into the microscopic gap (synapse) between it and one specific target cell, acts within milliseconds, and is broken down or reabsorbed almost immediately — so nervous signalling is fast, local and precise, and runs reflexes, sensation, movement and thought. A HORMONE is released by an endocrine gland into the bloodstream, circulates through the whole body, and acts on any cell anywhere that carries the matching receptor — so endocrine signalling is slower to start (seconds to hours, sometimes days), longer-lasting, and body-wide. Hormones run growth, metabolism, blood sugar, reproduction, the stress response, water balance and daily rhythms. The hypothalamus is the main bridge between the two systems.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-cortisol-do',
    title: 'What Cortisol Does',
    category: 'Endocrine',
    keywords: [
      'what does cortisol do', 'cortisol stress hormone function', 'cortisol raises blood sugar anti-inflammatory', 'hpa axis cortisol',
      'cortisol daily rhythm morning peak', 'what happens with chronically high cortisol', 'cushing syndrome cortisol',
    ],
    content: `Cortisol is the body's main "stress hormone," a steroid (glucocorticoid) made by the outer layer of the adrenal glands. It is released more slowly than adrenaline — over minutes to hours — through the HPA axis: the hypothalamus signals the pituitary to release ACTH, which tells the adrenal cortex to make cortisol. Its normal, healthy jobs: raise blood glucose by prompting the liver to make new glucose and by freeing up fat and protein for fuel; maintain blood pressure and heart function; dampen inflammation and calm the immune system; and increase alertness and focus. Cortisol follows a strong daily rhythm — highest in the early morning (it helps wake you up) and lowest around midnight. The problems come from chronic elevation (long-term stress, or the disease Cushing's syndrome): weight gain around the abdomen and face, high blood pressure and blood sugar, muscle wasting, thin bruise-prone skin, poor wound healing and infections, bone loss, and disturbed mood and sleep. Too little cortisol (Addison's disease) causes fatigue, low blood pressure, weight loss and salt craving.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-adrenaline-do',
    title: 'What Adrenaline Does',
    category: 'Endocrine',
    keywords: [
      'what does adrenaline do', 'epinephrine fight or flight', 'adrenaline heart rate blood pressure pupils', 'adrenal medulla adrenaline',
      'adrenaline vs cortisol', 'adrenaline releases glucose for energy', 'epipen adrenaline anaphylaxis',
    ],
    content: `Adrenaline (also called epinephrine) is the fast-acting fight-or-flight hormone, released within a second or two by the inner core of the adrenal glands (the adrenal medulla) when the sympathetic nervous system senses a threat, shock, fright or intense effort. In one coordinated burst it: speeds up the heart and makes it beat harder, raises blood pressure, opens the airways wide, dilates the pupils, redirects blood from the gut and skin to the large muscles, releases glucose and fatty acids into the blood for instant fuel, and blunts the sense of pain. This primes the body for immediate physical action, and it wears off within a few minutes once the danger passes. Adrenaline is separate from cortisol, the slower stress hormone — a threat triggers both, by different routes. As a medicine, adrenaline is the drug in an EpiPen (it reverses the swelling and low blood pressure of a severe allergic reaction) and is given in cardiac arrest.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-the-thyroid-do',
    title: 'What the Thyroid Does',
    category: 'Endocrine',
    keywords: [
      'what does the thyroid do', 'thyroid gland metabolism thyroxine t3 t4', 'thyroid hormone heart rate temperature weight', 'thyroid uses iodine',
      'tsh pituitary controls thyroid', 'thyroid and brain development', 'calcitonin thyroid calcium',
    ],
    content: `The thyroid is a butterfly-shaped gland wrapped around the front of the windpipe, low in the neck. It makes thyroid hormone — thyroxine (T4) and the more active triiodethyronine (T3) — which sets the body's "idle speed," or basal metabolic rate: how fast cells use oxygen and burn fuel. Thyroid hormone therefore influences heart rate, body temperature, how fast you burn calories (and so body weight), digestive speed, energy level, mood, skin and hair, menstrual cycles, and — critically in babies and children — brain development and growth. The gland needs dietary iodine to build its hormones. Its output is controlled by TSH (thyroid-stimulating hormone) from the pituitary, in a negative-feedback loop. The thyroid also makes calcitonin, a minor hormone that lowers blood calcium. Too little thyroid hormone (hypothyroidism) slows everything down; too much (hyperthyroidism) speeds everything up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hyper-vs-hypothyroidism',
    title: 'Hyperthyroidism versus Hypothyroidism',
    category: 'Endocrine',
    keywords: [
      'what is the difference between hyperthyroidism and hypothyroidism', 'overactive vs underactive thyroid symptoms', 'hashimotos hypothyroidism',
      'graves disease hyperthyroidism', 'levothyroxine treatment', 'thyroid weight gain weight loss', 'goiter thyroid',
    ],
    content: `Both are disorders of thyroid hormone level, with opposite effects. HYPOTHYROIDISM (underactive thyroid) means too little thyroid hormone, so metabolism slows down: tiredness, weight gain, feeling cold, constipation, dry skin, thinning hair, slow heart rate, low mood, poor memory, heavy or irregular periods, and sometimes a swollen neck (goitre). The commonest cause in iodine-sufficient countries is Hashimoto's thyroiditis (the immune system attacks the gland); worldwide it is iodine deficiency. It is treated simply and effectively with a daily tablet of levothyroxine (synthetic T4). HYPERTHYROIDISM (overactive thyroid) means too much thyroid hormone, so everything speeds up: unintentional weight loss despite a big appetite, feeling hot and sweaty, anxiety, irritability, tremor, a fast or irregular heartbeat, frequent bowel movements, difficulty sleeping, and — in Graves' disease, the commonest cause and also autoimmune — bulging eyes and a goitre. It is treated with anti-thyroid drugs, radioactive iodine that shrinks the gland, or surgery.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-the-pancreas-do-endocrine',
    title: 'What the Pancreas Does (Both Jobs)',
    category: 'Endocrine',
    keywords: [
      'what does the pancreas do', 'pancreas exocrine digestive enzymes bicarbonate', 'pancreas endocrine insulin glucagon islets of langerhans',
      'beta cells alpha cells pancreas', 'how the pancreas controls blood sugar', 'why does the pancreas matter in diabetes',
    ],
    content: `The pancreas, a leaf-shaped organ behind the stomach, has two entirely different functions. The EXOCRINE part is the bulk of the organ: it produces pancreatic juice — digestive enzymes for fat (lipase), protein (trypsin, chymotrypsin) and carbohydrate (amylase), plus bicarbonate to neutralise stomach acid — which flows through a duct into the small intestine. The ENDOCRINE part is just 1–2% of the tissue, scattered clusters called the islets of Langerhans, which release hormones directly into the blood: INSULIN from beta cells (lowers blood glucose by letting cells take it up and by prompting storage as glycogen and fat), GLUCAGON from alpha cells (raises blood glucose by telling the liver to release its stores), and somatostatin. Insulin and glucagon work as an opposing pair to keep blood sugar in a narrow safe range. Diabetes is a failure of this endocrine role — type 1 (beta cells destroyed, no insulin) or type 2 (cells resist insulin and the pancreas can't keep up).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-adrenal-gland',
    title: 'What the Adrenal Glands Do',
    category: 'Endocrine',
    keywords: [
      'what is the adrenal gland', 'adrenal cortex vs adrenal medulla', 'cortisol aldosterone adrenal cortex', 'adrenaline noradrenaline adrenal medulla',
      'aldosterone blood pressure sodium potassium', 'addisons disease cushings syndrome', 'adrenal glands on top of kidneys',
    ],
    content: `There are two adrenal glands, one perched on top of each kidney, and each has two distinct layers. The outer ADRENAL CORTEX makes steroid hormones: cortisol (the main stress hormone — raises blood sugar, maintains blood pressure, suppresses inflammation), aldosterone (controls blood pressure and fluid balance by making the kidneys hold on to sodium and excrete potassium), and small amounts of sex hormones (androgens, important for body hair and, in women, a share of total androgen). The inner ADRENAL MEDULLA makes adrenaline and noradrenaline, the rapid fight-or-flight hormones, and functions as an extension of the sympathetic nervous system. Disorders: Addison's disease (the cortex fails, causing fatigue, low blood pressure, salt craving, skin darkening), Cushing's syndrome (too much cortisol), Conn's syndrome (too much aldosterone, causing high blood pressure), and phaeochromocytoma (an adrenaline-secreting tumour causing episodes of racing heart, sweating and headache).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hypothalamus-endocrine',
    title: 'What the Hypothalamus Does',
    category: 'Endocrine',
    keywords: [
      'what is the hypothalamus', 'hypothalamus links nervous system and endocrine system', 'hypothalamus controls pituitary releasing hormones',
      'hypothalamus hunger thirst temperature sleep', 'hypothalamus makes oxytocin and adh', 'homeostasis control center brain',
    ],
    content: `The hypothalamus is a small region at the base of the brain, below the thalamus and just above the pituitary gland — and it is the main junction between the nervous system and the endocrine system. It constantly monitors the blood and incoming nerve signals for temperature, blood glucose, salt and water balance, and circulating hormone levels, and works to hold them at their set points. It does this three ways: (1) it releases "releasing" and "inhibiting" hormones down a short blood vessel to the anterior pituitary, telling it to switch other glands on or off (thyroid, adrenal cortex, gonads, growth, prolactin); (2) it makes oxytocin and antidiuretic hormone (ADH/vasopressin) itself, which are stored and released by the posterior pituitary; and (3) it directly drives behaviours and automatic responses — hunger and fullness, thirst, body-temperature regulation (sweating, shivering), the sleep-wake cycle via the body clock, the stress response, and sex drive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-oxytocin-do',
    title: 'What Oxytocin Does',
    category: 'Endocrine',
    keywords: [
      'what does oxytocin do', 'oxytocin labour contractions uterus', 'oxytocin breastfeeding milk let-down reflex', 'oxytocin bonding love hormone',
      'is oxytocin the same as adh', 'pitocin synthetic oxytocin induction', 'oxytocin trust social behavior',
    ],
    content: `Oxytocin is a hormone made in the hypothalamus and released by the posterior pituitary. Its two well-established physical roles both involve smooth muscle: it makes the uterus contract during childbirth (a synthetic version, sold as Pitocin/Syntocinon, is used to induce or strengthen labour and to control bleeding afterwards), and it triggers the milk "let-down" reflex that squeezes milk out of the breast during nursing — and suckling stimulates more oxytocin, keeping the supply going. Oxytocin is also released during hugging, gentle touch, sex, orgasm, and bonding with a baby or partner, which is why it is nicknamed the "love" or "bonding" hormone; it appears to promote attachment, trust, calm and reduced stress, though its real effects on human social behaviour are more subtle and situation-dependent than popular headlines claim. It is a different hormone from ADH (antidiuretic hormone), the other posterior-pituitary hormone, which controls water retention by the kidneys.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-parathyroid',
    title: 'What the Parathyroid Glands Do',
    category: 'Endocrine',
    keywords: [
      'what does the parathyroid do', 'parathyroid hormone pth blood calcium', 'four tiny glands behind the thyroid', 'pth releases calcium from bone',
      'parathyroid vs calcitonin', 'hyperparathyroidism kidney stones bones groans', 'vitamin d calcium absorption pth',
    ],
    content: `The parathyroid glands are four tiny glands, each about the size of a grain of rice, sitting on the back surface of the thyroid in the neck (despite the similar name, they are unrelated to the thyroid's job). They make parathyroid hormone (PTH), the main regulator of the calcium level in the blood, which must be kept in a narrow range for nerves, muscles and the heart to work. When blood calcium drops, PTH rises and raises it three ways: it releases calcium from bone, it makes the kidneys reabsorb more calcium (and excrete phosphate), and it activates vitamin D so the gut absorbs more calcium from food. Calcitonin, from the thyroid, does the reverse. Overactive parathyroids (primary hyperparathyroidism, usually a small benign tumour) push blood calcium too high, classically causing kidney stones, weakened bones, abdominal complaints and low mood ("stones, bones, groans and psychiatric moans"). Underactive glands (often after thyroid surgery) cause low calcium with tingling, muscle cramps and spasms.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-thymus-endocrine',
    title: 'What the Thymus Does',
    category: 'Endocrine',
    keywords: [
      'what is the thymus', 'thymus t cell maturation education', 'central tolerance thymus autoimmune', 'thymus largest in childhood shrinks after puberty',
      'do t cells come from the thymus or bone marrow', 'thymosin hormone thymus', 'involution of the thymus with age',
    ],
    content: `The thymus is a gland in the upper chest, behind the breastbone and in front of the heart. Its main job is to mature and "educate" T cells (T lymphocytes), a key type of immune cell. The T cells themselves are made in the bone marrow; while still immature they travel to the thymus, where they mature into all the T-cell types (helper T cells, cytotoxic/killer T cells, regulatory T cells) and go through a strict screening. They must be able to recognise foreign antigens, and — most importantly — any T cell that reacts against the body's own tissues is destroyed there. This "central tolerance" is a main defence against autoimmune disease; only about 2% of the T cells that enter the thymus survive the process. The thymus is largest and most active in infancy and childhood, then slowly shrinks and is replaced by fat after puberty ("involution"), which is a major reason the immune system makes fewer new T cells and responds less well to new infections and vaccines with age. It also secretes hormones (thymosins) that support T-cell development.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-testosterone-do',
    title: 'What Testosterone Does',
    category: 'Endocrine',
    keywords: [
      'what does testosterone do', 'testosterone main male sex hormone androgen steroid', 'testosterone made in the testes', 'testosterone muscle bone libido',
      'testosterone puberty voice deepening facial hair', 'low testosterone hypogonadism symptoms', 'do women have testosterone',
    ],
    content: `Testosterone is the principal male sex hormone (an androgen), a steroid made mostly by the testes, with small amounts from the adrenal glands and, in women, the ovaries. In male puberty it drives growth of the penis and testes, deepening of the voice, facial and body hair, oilier skin, and the pubertal growth spurt in bones and muscle. Throughout adult life it maintains sperm production, muscle mass and strength, bone density, red-blood-cell production, sex drive and, to some degree, mood and energy. Its release is controlled by luteinising hormone (LH) from the pituitary, itself driven by GnRH from the hypothalamus, in a feedback loop. Women have roughly one-tenth to one-twentieth the male level, and it still matters for their libido, bone and muscle. Male levels decline gradually from around age 30; clinically low testosterone (hypogonadism) can cause fatigue, low libido, erectile problems, loss of muscle and bone, and low mood — but normal age-related decline is not usually treated, and testosterone supplements carry risks.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-estrogen-do',
    title: 'What Estrogen Does',
    category: 'Endocrine',
    keywords: [
      'what does estrogen do', 'estrogen estradiol main female sex hormone', 'estrogen made by the ovaries', 'estrogen puberty breast development menstrual cycle',
      'estrogen bone health menopause', 'estrogen and progesterone menstrual cycle', 'do men have estrogen',
    ],
    content: `Estrogen (mainly estradiol) is the principal group of female sex hormones — steroids made chiefly by the ovaries, and by the placenta in pregnancy, with small amounts from fat tissue and, in men, from converting testosterone. In female puberty it drives breast development, widening of the pelvis, the growth spurt, maturation of the uterus and vagina, fat distribution to hips and thighs, and the start of menstruation. In the reproductive years, estrogen and progesterone together run the menstrual cycle: estrogen rises in the first half to thicken the uterine lining and trigger ovulation. Estrogen also maintains bone density, keeps blood-vessel and skin tissue healthy, and influences cholesterol and mood. At menopause the ovaries stop producing it, causing hot flushes, vaginal dryness, sleep and mood changes, and — over years — accelerated bone loss and higher heart-disease risk. Its release is controlled by FSH and LH from the pituitary. Men have low levels that are still needed for bone health and sperm production.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-melatonin-endocrine',
    title: 'What Melatonin Does',
    category: 'Endocrine',
    keywords: [
      'what is melatonin', 'melatonin sleep hormone pineal gland', 'melatonin signals darkness to the body', 'suprachiasmatic nucleus body clock melatonin',
      'light suppresses melatonin screens at night', 'is melatonin a sedative', 'melatonin supplement dose jet lag',
    ],
    content: `Melatonin is the hormone that tells the body it is night. It is made by the pineal gland, a small structure deep in the brain, and its release is governed by the master body clock (the suprachiasmatic nucleus in the hypothalamus) based on light entering the eyes: light — especially bright and blue-rich light — suppresses melatonin, darkness releases it. So levels are near zero during the day, rise a couple of hours before your usual bedtime, peak in the middle of the night, and fall by morning. Rising melatonin promotes sleepiness, lowers core body temperature and reduces alertness — it helps set the timing of the sleep-wake cycle rather than knocking you out like a sedative. Evening screen use and bright indoor light push melatonin release later, delaying sleep. As a supplement it is taken (usually 0.5–3 mg, a few hours before the target bedtime) mainly for jet lag, shift-work sleep problems, and delayed sleep-phase disorder; higher doses are not more effective and can cause grogginess.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-puberty-endocrine',
    title: 'What Puberty Is (from an Endocrine Standpoint)',
    category: 'Endocrine',
    keywords: [
      'what is puberty from an endocrine standpoint', 'gnrh pulses start puberty hypothalamus', 'lh fsh gonads testosterone estrogen puberty',
      'adrenarche pubic hair body odor', 'what triggers puberty leptin body fat', 'hpg axis puberty hormones',
    ],
    content: `From an endocrine standpoint, puberty starts when the hypothalamus begins releasing GnRH (gonadotropin-releasing hormone) in regular pulses — something that was active in infancy, then switched off for most of childhood. Pulsing GnRH makes the pituitary release the gonadotropins LH and FSH, which act on the gonads: the testes then produce testosterone and begin making sperm; the ovaries produce estrogen and begin the menstrual cycle. Those rising sex hormones drive the visible changes — genital and breast development, body, facial and pubic hair, voice deepening, skin oiliness and acne, fat redistribution, and the growth spurt (working alongside growth hormone), which then ends when the sex hormones fuse the growth plates. Separately, a year or two earlier, the adrenal glands ramp up weak androgen production ("adrenarche"), contributing to early pubic and underarm hair and adult body odour. What actually triggers the restart of GnRH pulses involves genetics, nutrition and body-fat signals (the hormone leptin), which is part of why better nutrition has lowered the average age of puberty over the past century.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-diabetes-insipidus',
    title: 'What Diabetes Insipidus Is',
    category: 'Endocrine',
    keywords: [
      'what is diabetes insipidus', 'diabetes insipidus vs diabetes mellitus', 'large volumes of dilute urine extreme thirst', 'antidiuretic hormone adh vasopressin problem',
      'central vs nephrogenic diabetes insipidus', 'desmopressin treatment diabetes insipidus', 'lithium nephrogenic diabetes insipidus',
    ],
    content: `Diabetes insipidus is a rare condition in which a person passes very large volumes of dilute, watery urine (sometimes many litres a day) and is constantly, intensely thirsty. It has nothing to do with blood sugar or the common "diabetes" (diabetes mellitus); the two share only the old word "diabetes" (Greek for "siphon," from the heavy urine flow) — in diabetes insipidus the urine is tasteless and dilute, not sweet. It is caused by a problem with antidiuretic hormone (ADH, also called vasopressin), which normally tells the kidneys to reabsorb water and concentrate the urine. In CENTRAL diabetes insipidus the hypothalamus/pituitary does not make enough ADH (from a head injury, brain surgery, or a tumour); in NEPHROGENIC diabetes insipidus the kidneys don't respond to ADH (inherited, or a side effect of long-term lithium). Central DI is treated with desmopressin, a synthetic form of ADH, taken as a nasal spray or tablet; nephrogenic DI is harder and is managed with diet, fluids and certain medicines.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-does-prolactin-do',
    title: 'What Prolactin Does',
    category: 'Endocrine',
    keywords: [
      'what does prolactin do', 'prolactin milk production breastfeeding', 'prolactin from the anterior pituitary', 'prolactin suppresses ovulation during lactation',
      'prolactin controlled by dopamine inhibition', 'prolactinoma pituitary tumour symptoms', 'drugs that raise prolactin antipsychotics',
    ],
    content: `Prolactin is a hormone from the anterior pituitary whose main role is to make the breasts develop during pregnancy and produce milk after birth; suckling stimulates further prolactin release, maintaining the supply. High prolactin during breastfeeding also suppresses ovulation, which is why full-time nursing delays the return of fertility. Prolactin is unusual among pituitary hormones in that it is controlled mainly by inhibition — dopamine released from the hypothalamus continuously holds it down — so anything that blocks dopamine (many antipsychotic drugs, and some anti-nausea medicines) raises prolactin levels. A prolactin-secreting tumour of the pituitary (a "prolactinoma") is the most common type of pituitary tumour; in women it causes milky nipple discharge, irregular or absent periods and infertility, and in men low libido and erectile dysfunction, and if large it can press on nearby structures and affect vision. Prolactinomas are usually treated effectively with dopamine-agonist drugs rather than surgery.`,
    createdAt: Date.now(),
  },
];
