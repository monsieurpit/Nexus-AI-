import { KnowledgeItem } from '../../types';

/**
 * MEDICINE_CONCEPTS_GAPS_2 — batch 257 corrections. Follows mainstream clinical
 * guidance. nexus-4b did well on much of this batch (cold/flu, symptom/sign,
 * acute/chronic, fever/hyperthermia, allergy/intolerance, benign/malignant,
 * heart attack/cardiac arrest, type 1/type 2 diabetes, LDL/HDL, ibuprofen/
 * acetaminophen, brand/generic, ER/urgent care, quarantine/isolation,
 * mortality/morbidity). Misses:
 * - "flu vs COVID-19" answered about antibiotics and viruses.
 * - "chemotherapy vs radiation therapy", "hypoglycemia vs hyperglycemia",
 *   "painkiller vs anti-inflammatory", "side effect vs adverse reaction" were
 *   web dumps.
 * - "X-ray vs CT scan" drifted to PET scans.
 * - "immunity vs resistance" answered only about herd-immunity thresholds.
 * - "virus vs vaccine" was cut before the second half.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'medicine', keywords, content, createdAt: now,
});

export const MEDICINE_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-med2-flu-vs-covid',
    'Flu vs COVID-19',
    [
      'difference between the flu and COVID-19', 'both are contagious respiratory illnesses caused by different viruses flu by influenza viruses COVID-19 by SARS-CoV-2 a coronavirus', 'symptoms overlap heavily fever cough fatigue body aches sore throat so testing is needed to tell them apart',
      'COVID has a longer incubation 2 to 14 days typically 5 versus flu 1 to 4 days COVID was more likely to cause loss of taste or smell and historically higher rates of severe disease clots long COVID and death though this has narrowed COVID is generally more transmissible', 'both have vaccines and antivirals oseltamivir for flu nirmatrelvir-ritonavir for COVID',
    ],
    `Both are contagious RESPIRATORY illnesses spread mainly by airborne droplets and aerosols, but they are caused by DIFFERENT viruses:
- FLU (influenza) is caused by influenza A and B viruses;
- COVID-19 is caused by SARS-CoV-2, a coronavirus.

Because the SYMPTOMS overlap so much — fever, cough, sore throat, runny/blocked nose, body aches, headache, fatigue, sometimes shortness of breath, and (with COVID especially) loss of taste or smell — you generally cannot tell which one you have from symptoms alone. A test (rapid antigen or PCR) is needed to be sure.

Differences that do exist:
- INCUBATION: flu symptoms usually start 1-4 days after exposure; COVID typically ~5 days but anywhere from 2 to 14, so COVID can spread further before people know they are ill.
- SEVERITY: historically COVID caused higher rates of severe illness, blood clots, "long COVID" (persistent symptoms), and death than flu, and is more transmissible; that gap has NARROWED as population immunity (from infection and vaccination) has built up and treatments improved. Both can be dangerous for the elderly, the very young, pregnant people, and those with chronic illness.
- TREATMENT: both have VACCINES (updated yearly/periodically), and both have ANTIVIRALS that work best given early — oseltamivir (Tamiflu) and similar for flu; nirmatrelvir-ritonavir (Paxlovid) and remdesivir for COVID.

(This is general information — see a clinician for diagnosis and treatment.)`,
  ),
  k(
    'kb-gap-med2-chemo-vs-radiation',
    'Chemotherapy vs radiation therapy',
    [
      'difference between chemotherapy and radiation therapy', 'both damage cancer cell DNA so they cannot divide but they are delivered differently', 'chemotherapy uses drugs by IV injection or pills that travel through the whole bloodstream systemic so it reaches cancer cells anywhere including undetected micro-metastases but also affects fast-dividing normal cells hair follicles gut lining bone marrow causing hair loss nausea and low blood counts',
      'radiation therapy uses high-energy beams X-rays or protons or implanted radioactive sources aimed precisely at a specific tumour site local or regional sparing most of the body with side effects limited to the treated area skin changes fatigue', 'they are often combined and with surgery and immunotherapy',
    ],
    `Both are major cancer treatments that work by damaging cancer cells' DNA so badly they cannot keep dividing, and both are often used together and alongside surgery and newer treatments (immunotherapy, targeted drugs). The difference is HOW they reach the cancer.

CHEMOTHERAPY uses DRUGS — given by drip (IV), injection, or as tablets. The drugs travel through the WHOLE BLOODSTREAM, so it is a SYSTEMIC treatment: it can reach cancer cells ANYWHERE in the body, including tiny deposits that have already spread but are too small to see on a scan. Its downside is that it also hits the body's other FAST-DIVIDING normal cells — hair follicles (hair loss), the lining of the mouth and gut (mouth sores, nausea, diarrhoea), and the bone marrow (low red cells = tiredness, low white cells = infection risk, low platelets = bruising). It is usually given in cycles with recovery gaps.

RADIATION THERAPY (radiotherapy) uses high-energy X-ray or proton BEAMS aimed precisely at the tumour from a machine outside the body, or implanted radioactive sources placed next to or inside the tumour ("brachytherapy"). It is a LOCAL (or regional) treatment: it targets one specific area, so it spares the rest of the body. Side effects are mostly confined to the TREATED AREA — skin redness/soreness, and effects on whatever organs the beam passes through — plus general fatigue. It is usually given as many small daily doses over several weeks.

Short version: chemo = drugs that circulate everywhere (systemic, whole-body side effects); radiation = beams focused on one spot (local, local side effects).`,
  ),
  k(
    'kb-gap-med2-hypo-vs-hyperglycemia',
    'Hypoglycemia vs hyperglycemia',
    [
      'difference between hypoglycemia and hyperglycemia', 'hypoglycemia is blood glucose too LOW typically under 70 mg/dL or 3.9 mmol/L causes shakiness sweating confusion irritability hunger palpitations and if severe seizures loss of consciousness an acute emergency treated fast with sugar or glucagon usually from too much insulin or diabetes medication relative to food or activity', 'hyperglycemia is blood glucose too HIGH the hallmark of uncontrolled diabetes causes thirst frequent urination fatigue blurred vision long term damages nerves kidneys eyes vessels and acutely can progress to diabetic ketoacidosis or a hyperosmolar state',
      'hypo drops you fast hyper harms you over time with acute crises too',
    ],
    `Both are abnormal blood-sugar levels, mostly seen in people with diabetes, but they are opposites in direction, cause, speed, and treatment.

HYPOGLYCEMIA ("hypo") is blood glucose too LOW — usually defined as below about 70 mg/dL (3.9 mmol/L). It comes on FAST (minutes) and is an acute EMERGENCY. Symptoms: shakiness, sweating, pallor, pounding heart, intense hunger, anxiety or irritability, then confusion, slurred speech, and — if not corrected — seizures, unconsciousness, and death. The usual cause is TOO MUCH insulin or a sulfonylurea relative to food eaten or activity done (a missed meal, extra exercise, alcohol). Treatment is IMMEDIATE fast-acting sugar (glucose tablets, juice, sugary drink) if conscious, or an injection of GLUCAGON / IV glucose if not.

HYPERGLYCEMIA ("hyper") is blood glucose too HIGH — fasting above ~126 mg/dL (7.0 mmol/L), or random above ~200 (11.1 mmol/L). It develops over HOURS TO DAYS. Symptoms: excessive THIRST, frequent URINATION, blurred vision, fatigue, and (if very high) fruity breath and drowsiness. Chronically high sugar is what damages the small blood vessels and nerves in diabetes — leading to eye, kidney, nerve, and heart disease over years. Acutely it can tip into DIABETIC KETOACIDOSIS (DKA, mainly type 1) or a HYPEROSMOLAR HYPERGLYCEMIC STATE (mainly type 2), both life-threatening and needing hospital care. Treatment: insulin, fluids, and correcting the cause (missed medication, infection, illness).

Memory aid: "hypo" = low, hits you like a lightning bolt; "hyper" = high, grinds you down over time (with its own crises).`,
  ),
  k(
    'kb-gap-med2-painkiller-vs-antiinflammatory',
    'Painkiller vs anti-inflammatory',
    [
      'difference between a painkiller and an anti-inflammatory', 'an analgesic painkiller is any drug whose main job is to reduce pain includes paracetamol acetaminophen central acting no anti-inflammatory effect opioids morphine codeine act on opioid receptors no anti-inflammatory effect local anaesthetics and also the NSAIDs', 'an anti-inflammatory reduces inflammation swelling redness heat the two main classes are NSAIDs ibuprofen naproxen aspirin diclofenac which block COX enzymes so they reduce pain inflammation and fever and corticosteroids prednisone dexamethasone powerful broad immune suppression',
      'NSAIDs are both painkillers and anti-inflammatories paracetamol and opioids are painkillers that are not anti-inflammatory steroids are anti-inflammatories not primarily painkillers',
    ],
    `The two labels describe what a drug's MAIN action is, and the categories OVERLAP.

An ANALGESIC ("painkiller") is any drug given primarily to reduce PAIN. This class includes:
- PARACETAMOL / ACETAMINOFEN — works mainly in the central nervous system; relieves pain and fever but has essentially NO effect on inflammation;
- OPIOIDS (codeine, morphine, oxycodone, fentanyl) — act on opioid receptors in the brain and spinal cord; very effective for moderate-to-severe pain, NO anti-inflammatory action, and carry addiction and overdose risk;
- LOCAL ANAESTHETICS (lidocaine) — block nerve conduction in one area;
- and also the NSAIDs (see below).

An ANTI-INFLAMMATORY is a drug given to reduce INFLAMMATION — the swelling, heat, redness, and pain of tissue irritation. The two main groups:
- NSAIDs (non-steroidal anti-inflammatory drugs): ibuprofen, naproxen, diclofenac, aspirin. They block the COX enzymes, so a SINGLE NSAID reduces PAIN + INFLAMMATION + FEVER. Downside: stomach ulcers/bleeding, kidney and blood-pressure effects.
- CORTICOSTEROIDS (prednisone, dexamethasone, hydrocortisone): powerful, broad suppression of the immune/inflammatory response; used for asthma flares, autoimmune disease, severe allergy. Not primarily for pain, and long-term use has significant side effects.

So: NSAIDs are BOTH painkillers and anti-inflammatories. Paracetamol and opioids are painkillers that are NOT anti-inflammatory. Steroids are anti-inflammatories that are not primarily painkillers.`,
  ),
  k(
    'kb-gap-med2-side-effect-vs-adverse-reaction',
    'Side effect vs adverse drug reaction',
    [
      'difference between a side effect and an adverse reaction', 'a side effect is any effect of a drug other than the intended therapeutic one it can be neutral unwanted or even beneficial usually predictable from the drugs pharmacology often mild and dose-related drowsiness from an antihistamine dry mouth', 'an adverse drug reaction ADR is a harmful and unintended response to a drug at normal doses always negative ranges from mild to life-threatening rash liver injury anaphylaxis Stevens-Johnson syndrome includes both predictable dose-related and unpredictable allergic or idiosyncratic reactions',
      'all adverse reactions are side effects not all side effects are adverse serious ADRs must be reported',
    ],
    `A SIDE EFFECT is ANY effect of a drug OTHER than the one it was given for. Crucially, a side effect is not necessarily bad:
- often it is UNWANTED but minor (drowsiness from an antihistamine, dry mouth from an antidepressant, a mild upset stomach);
- sometimes it is NEUTRAL;
- occasionally it is even USEFUL and gets repurposed (a blood-pressure beta-blocker also calms performance anxiety; minoxidil for blood pressure also grows hair; the sildenafil story).
Side effects are usually PREDICTABLE from the drug's known pharmacology and are frequently dose-related.

An ADVERSE DRUG REACTION (ADR) — also "adverse effect" or, for an unproven association, "adverse event" — is specifically a HARMFUL and unintended response to a drug taken at NORMAL therapeutic doses. It is ALWAYS negative, and it ranges from mild (a rash) to SERIOUS or life-threatening: severe allergic reactions (anaphylaxis), liver or kidney injury, dangerous drops in blood cells, and severe skin reactions like Stevens-Johnson syndrome. ADRs include:
- "Type A" — predictable, dose-related exaggerations of the drug's effect (bleeding on a blood thinner);
- "Type B" — unpredictable, not dose-related, idiosyncratic or allergic (a penicillin anaphylaxis in a susceptible person).

Relationship: every adverse reaction is technically a "side effect", but not every side effect is adverse — many are trivial or beneficial. In drug safety ("pharmacovigilance"), serious suspected ADRs are formally REPORTED so regulators can spot new risks.`,
  ),
  k(
    'kb-gap-med2-xray-vs-ct',
    'X-ray vs CT scan',
    [
      'difference between an X-ray and a CT scan', 'a plain X-ray radiograph is a single 2D projection image the beam passes through the body onto a detector dense things bone metal show white air shows black quick cheap low-dose great for fractures chest pneumonia foreign bodies but structures overlap and soft-tissue detail is poor', 'a CT scan takes many X-ray projections from all angles as the tube rotates around you and a computer reconstructs detailed cross-sectional slices and 3D images far more detail separates overlapping structures sees soft tissue bleeding and small lesions but higher radiation dose and costs more',
      'CT is essentially 3D X-ray by computer', 'a PET scan is a different thing showing function with radioactive tracers',
    ],
    `Both use X-RAYS (ionising radiation), but a CT scan is essentially a computer-assembled 3D version of an X-ray. (This is not a PET scan, which is a separate test that shows metabolic activity using a radioactive tracer.)

A PLAIN X-RAY (radiograph) is a SINGLE two-dimensional SHADOW image. An X-ray beam is fired once through the body onto a detector on the other side; dense tissues (bone, metal, contrast dye) absorb more and show WHITE, soft tissue shows grey, and air (lungs, bowel gas) shows BLACK. It is FAST (seconds), CHEAP, portable, and uses a LOW radiation dose. It is excellent for FRACTURES, checking the chest (pneumonia, fluid, heart size, a collapsed lung), dental problems, and spotting swallowed or embedded foreign objects. Its limitation: everything the beam passes through is superimposed onto one flat picture, so structures OVERLAP and hide each other, and soft-tissue detail is poor.

A CT (Computed Tomography) SCAN takes MANY X-ray projections — hundreds — from all around the body as the X-ray tube spins around you in a doughnut-shaped gantry, and a COMPUTER reconstructs those into thin CROSS-SECTIONAL "slices" (and 3D renderings). This removes the overlap problem and gives far more detail: it can distinguish organs and blood vessels, show internal BLEEDING, small tumours, subtle fractures, blood clots in the lungs, and appendicitis. The trade-offs: a HIGHER radiation dose (a chest CT is roughly 100-500 times a chest X-ray), higher cost, and often an iodine contrast injection.

Rule of thumb: X-ray for a quick look at bones and the chest; CT when you need detailed cross-sectional anatomy or to rule out something serious.`,
  ),
  k(
    'kb-gap-med2-ct-vs-mri',
    'CT scan vs MRI',
    [
      'difference between a CT scan and an MRI', 'a CT scan uses X-rays rotated around you reconstructed into cross-sectional slices fast seconds to minutes excellent for bone bleeding lungs and emergencies involves ionising radiation often uses iodine contrast', 'an MRI uses a strong magnet and radio waves no ionising radiation superb soft-tissue detail brain spinal cord ligaments cartilage tumours slow 20 to 60 minutes loud claustrophobic expensive and unsafe for certain metal implants and older pacemakers',
      'standard MRI shows anatomy not function functional MRI is a specialised type', 'CT for a fast look and bone MRI for detailed soft tissue',
    ],
    `Both produce detailed cross-sectional images of the inside of the body, but by completely different physics, and each is better for different things.

A CT SCAN uses X-RAYS. The tube rotates around you and a computer builds the slices. Strengths: it is FAST (a whole-body scan in seconds to a couple of minutes — vital in trauma and stroke), it shows BONE and acute BLEEDING beautifully, it is excellent for the LUNGS, for kidney stones, for lung clots (CT pulmonary angiogram), and for the abdomen. It is widely available and cheaper than MRI. Downsides: it uses IONISING RADIATION (a real but small cancer-risk consideration, especially in children and repeated scans), and it often needs an iodine CONTRAST injection that can affect the kidneys or cause allergy.

An MRI uses a very strong MAGNET plus RADIO WAVES to map the behaviour of hydrogen atoms (mostly in water and fat). Strengths: NO ionising radiation, and outstanding SOFT-TISSUE contrast — it is the best test for the BRAIN and SPINAL CORD, for LIGAMENTS, TENDONS, and CARTILAGE (knee, shoulder), for many tumours, and for the liver and pelvis. Downsides: it is SLOW (20-60+ minutes, and you must hold still), LOUD, an enclosed tube that many people find CLAUSTROPHOBIC, EXPENSIVE, less available, and it is UNSAFE around certain metal — some pacemakers/defibrillators, cochlear implants, metal fragments in the eye, and some older aneurysm clips (most modern implants are "MRI-conditional").

Standard MRI shows ANATOMY; "functional MRI (fMRI)" is a specialised type that maps brain activity.`,
  ),
  k(
    'kb-gap-med2-immunity-vs-resistance',
    'Immunity vs resistance (to disease)',
    [
      'difference between immunity and resistance', 'immunity specifically means protection mediated by the immune system a learned specific defence antibodies and memory cells against a particular pathogen from prior infection natural immunity or from a vaccine', 'resistance is a broader term for any factor that makes an organism less susceptible to a disease or drug can be immune-based but also non-immune barriers skin stomach acid genetics age general health',
      'antibiotic or drug resistance is a different sense where the pathogen has evolved to withstand a drug not the host', 'immunity is a specific learned immune defence resistance is the general state of being hard to infect from any cause',
    ],
    `IMMUNITY, in the strict sense, is protection produced by the IMMUNE SYSTEM: the body has developed (or been given) a SPECIFIC defence against a particular pathogen — antibodies plus long-lived "memory" B and T cells that recognise that microbe and destroy it rapidly on any future encounter. It is ACQUIRED, either:
- ACTIVELY, by surviving the infection ("natural immunity") or by vaccination — long-lasting because memory cells persist;
- PASSIVELY, by receiving ready-made antibodies (across the placenta, in breast milk, or as an antibody infusion) — immediate but temporary.
Immunity is specific: being immune to measles does nothing for your risk of flu.

RESISTANCE is a BROADER term for anything that makes a host LESS SUSCEPTIBLE to getting or being harmed by a disease. It INCLUDES immune protection but also NON-IMMUNE factors:
- physical/chemical barriers — intact skin, stomach acid, mucus, lysozyme in tears;
- GENETICS — e.g. sickle-cell trait resists severe malaria; a CCR5-delta32 mutation resists HIV; blood type affects norovirus susceptibility;
- general health, nutrition, age, and the microbiome.

And "resistance" has a completely separate common meaning in "ANTIBIOTIC RESISTANCE" or "drug resistance" — there it is the PATHOGEN, not the host, that has evolved to survive a drug that used to kill it.

So: immunity = a specific, learned immune defence against one pathogen; resistance = the overall state of being hard to infect or harm, from any cause (and, in the drug context, a property of the germ).`,
  ),
  k(
    'kb-gap-med2-virus-vs-vaccine',
    'Virus vs vaccine',
    [
      'difference between a virus and a vaccine', 'a virus is an infectious agent genetic material in a protein coat that causes disease by invading your cells and forcing them to make copies of it', 'a vaccine is a medical preparation that protects against a virus or bacterium it contains a harmless version or piece of the pathogen killed or weakened whole virus a viral protein or mRNA instructions that trains your immune system to recognise and rapidly destroy the real pathogen without causing the disease',
      'a virus makes you sick a vaccine teaches your body to fight that virus before it can',
    ],
    `A VIRUS is an infectious agent — a tiny package of genetic material (DNA or RNA) wrapped in a protein coat (and sometimes a membrane envelope). It is not fully "alive" on its own: it cannot grow, make energy, or reproduce by itself. To multiply it must INVADE a living host cell, hijack that cell's machinery to churn out thousands of copies of itself, and usually destroy the cell as the new viruses burst out. That process, spreading from cell to cell, is what makes you ill (flu, measles, COVID-19, HIV, hepatitis).

A VACCINE is a medical PREPARATION designed to PROTECT you against a specific pathogen (a virus or a bacterium) BEFORE you ever meet it. It works by showing your IMMUNE SYSTEM a harmless preview of the pathogen so it can learn to recognise it. Depending on the type, a vaccine contains:
- a killed ("inactivated") whole virus;
- a live but WEAKENED ("attenuated") virus that can't cause real disease;
- just a PIECE of the pathogen — a surface protein ("subunit") or a sugar coat;
- or mRNA / a harmless carrier virus carrying the INSTRUCTIONS for your own cells to briefly make one pathogen protein.
Your immune system responds by making ANTIBODIES and MEMORY cells. If the real pathogen later infects you, that memory response kicks in fast and clears it — often before you feel anything.

In one line: a virus is the thing that makes you sick; a vaccine trains your body to defeat that virus.`,
  ),
  k(
    'kb-gap-med2-virus-vs-bacterial-infection',
    'Viral vs bacterial infection',
    [
      'difference between a virus and a bacterial infection', 'bacteria are living single-celled organisms that can grow and reproduce on their own some are harmless or helpful gut flora a few cause disease by damaging tissue or releasing toxins treated with antibiotics', 'a virus is a non-living particle genetic material in a protein coat that must invade host cells and force them to make copies destroying the cells antibiotics do nothing some viruses have antivirals many are managed with rest and fluids',
      'both can cause fever fatigue and localised symptoms testing culture or PCR distinguishes them bacterial infections often but not always have thick coloured discharge and stay localised',
    ],
    `BACTERIA are living, single-celled ORGANISMS. They have their own cell wall, membrane, and machinery, and can GROW and DIVIDE on their own, in your tissue or in a lab dish. Most bacteria are harmless or beneficial (the trillions in your gut and on your skin); only a minority are PATHOGENS, and they cause disease by multiplying in tissue, damaging it directly, provoking strong inflammation, or releasing TOXINS. Examples: strep throat, most urinary infections, bacterial pneumonia, tuberculosis, tetanus, many wound and skin infections. Treatment: ANTIBIOTICS, which attack structures unique to bacteria (cell wall, ribosomes) and do not harm human cells.

VIRUSES are NOT independent organisms — they are tiny particles of genetic material in a protein shell. They cannot reproduce alone; they must INVADE a host cell and turn it into a factory that makes new virus copies, usually killing the cell. Examples: the common cold, influenza, COVID-19, measles, chickenpox, most sore throats, hepatitis, HIV, most gastroenteritis. ANTIBIOTICS DO NOTHING against viruses (and taking them anyway breeds resistance and can harm your microbiome). Some viruses have specific ANTIVIRAL drugs (flu, COVID, HIV, herpes, hepatitis C), but many viral illnesses are simply managed with rest, fluids, and time while the immune system clears them; vaccines prevent many of them.

Telling them apart clinically can be hard — both cause fever, fatigue, aches, and local symptoms. Doctors use the pattern, duration, and, when needed, tests (a throat swab culture, a urine dipstick and culture, blood tests, PCR). As rough (not reliable) hints, bacterial infections more often produce thick, coloured discharge, worsen after initially improving, and stay focused on one body part, while viral illnesses more often come with several sites at once (runny nose + cough + sore throat) and resolve on their own in about a week.`,
  ),
  k(
    'kb-gap-med2-allergy-vs-cold',
    'Allergy (hay fever) vs a cold',
    [
      'difference between an allergy and a cold', 'allergic rhinitis hay fever is an immune overreaction to a harmless allergen pollen dust dander symptoms sneezing itchy watery eyes clear runny nose congestion itchiness is prominent no fever persists as long as you are exposed weeks or months seasonal or year-round responds to antihistamines', 'a cold is a viral infection symptoms build over a couple of days and resolve in about a week to 10 days may have a low fever body aches sore throat thicker or discoloured mucus sometimes a cough itchiness is not typical',
    ],
    `Both give you a runny, blocked nose and sneezing, so they are easy to confuse — but one is an allergy and one is an infection.

ALLERGIC RHINITIS ("HAY FEVER") is your IMMUNE SYSTEM overreacting to a HARMLESS substance — pollen, house-dust mite, mould spores, or animal dander. Key features:
- ITCHINESS is prominent — itchy, watery EYES, itchy nose, throat, and ears;
- lots of SNEEZING and a CLEAR, WATERY runny nose;
- NO FEVER, no body aches;
- symptoms last as LONG AS YOU ARE EXPOSED — weeks or months, seasonally (tree/grass/weed pollen) or all year (dust, pets);
- they often come on suddenly on going outside or into a dusty room, and both nostrils/eyes are affected;
- they respond to ANTIHISTAMINES and steroid nasal sprays, and to avoiding the trigger.

A COLD is a VIRAL infection of the nose and throat (usually a rhinovirus). Key features:
- symptoms BUILD over a day or two, peak, then FADE, clearing in about 7-10 days;
- may include a mild fever, SORE THROAT, body aches, and general tiredness — none of which hay fever causes;
- nasal mucus often starts clear then turns THICKER and yellow/green;
- a COUGH is common, especially later;
- ITCHY EYES are NOT typical;
- it is contagious; hay fever is not.

Rule of thumb: itchy eyes + no fever + lasts for weeks whenever you're near the trigger = allergy; sore throat/aches/mild fever + gone in a week + others around you have it too = cold.`,
  ),
  k(
    'kb-gap-med2-inflammation-vs-infection',
    'Inflammation vs infection',
    [
      'difference between inflammation and infection', 'inflammation is the bodys protective response to injury or irritation of any kind infection trauma autoimmune toxins allergens redness heat swelling pain loss of function driven by immune cells and mediators', 'infection is the invasion and multiplication of a pathogen bacteria virus fungus parasite in body tissue',
      'infection is one cause of inflammation you can have inflammation without infection a sprain rheumatoid arthritis sunburn an allergic rash and rarely infection with a blunted inflammatory response in the immunocompromised',
    ],
    `They are related but distinct — one is a PROCESS, the other is a CAUSE.

INFLAMMATION is the body's general PROTECTIVE RESPONSE to ANY tissue injury or irritant. Blood vessels widen and become leaky, immune cells and fluid pour into the area, and chemical signals amplify the reaction — producing the classic signs: REDNESS, HEAT, SWELLING, PAIN, and loss of function. It is meant to contain damage, destroy any invader, clear debris, and start repair. Its triggers are many: a physical injury (a sprained ankle, a burn, a cut), a chemical or toxin, UV (sunburn), an allergen (a rash, asthma), an AUTOIMMUNE attack (rheumatoid arthritis, lupus), or an INFECTION.

INFECTION is specifically the INVASION and MULTIPLICATION of a PATHOGEN — bacteria, virus, fungus, or parasite — within body tissue.

The relationship: infection is ONE common cause of inflammation, but they are not the same thing.
- You can have INFLAMMATION WITHOUT INFECTION — an ankle sprain, gout, rheumatoid arthritis, a sunburn, an allergic reaction, and chronic conditions like atherosclerosis all involve inflammation with no germ.
- You can (rarely) have INFECTION WITH LITTLE INFLAMMATION — in someone whose immune system is severely suppressed, an infection can spread with only a muted response, which is dangerous because the usual warning signs (fever, redness, pus) are missing.
- And an infection can be cleared while inflammation lingers ("post-viral" symptoms).

Practically: pus, fever, spreading redness with a warm tender area, and feeling systemically unwell point toward infection; localised swelling and pain after a known injury, or in a joint with a chronic disease, is inflammation without infection.`,
  ),
];
