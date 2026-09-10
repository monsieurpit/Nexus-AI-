import { KnowledgeItem } from '../../types';

/**
 * ANATOMY_CONCEPTS_GAPS_2 — batch 239 corrections.
 * nexus-4b was strong across anatomy/physiology. Misses:
 * - "artery vs vein" and "pulmonary vs systemic circulation" were web dumps.
 * - "inhalation vs exhalation" said exhalation "drops the pressure in the chest".
 * - "trachea vs esophagus" called the tracheal rings "flat rings".
 * - "liver vs pancreas" only described the liver.
 * - "hormone vs enzyme" never said an enzyme is a catalyst.
 * - "endocrine vs exocrine system" was a cut-off pancreas dump.
 * - "reflex vs voluntary movement" buried the answer under bladder anatomy.
 * - "rods vs cones" put rods "packed around the fovea".
 * - "cornea vs lens" said the lens "adjusts how much light gets through".
 * - "cochlea vs semicircular canals" only described the cochlea.
 * - "vaccine vs antibiotic" was cut off mid-sentence.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'anatomy', keywords, content, createdAt: now,
});

export const ANATOMY_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-anat2-artery-vs-vein',
    'Artery vs vein',
    [
      'difference between an artery and a vein', 'arteries carry blood away from the heart under high pulsing pressure thick muscular elastic walls', 'veins carry blood back toward the heart low pressure thin walls valves',
      'pulmonary artery carries deoxygenated blood pulmonary veins carry oxygenated blood', 'direction relative to the heart is the defining rule not oxygen content',
    ],
    `The defining difference is DIRECTION relative to the heart, not oxygen.

ARTERIES carry blood AWAY from the heart. Because they receive each ventricular contraction, blood in them is under high, pulsing pressure, so they have thick walls with lots of smooth muscle and elastic tissue and a relatively narrow lumen. They branch into arterioles and then capillaries.

VEINS carry blood BACK toward the heart. Pressure in them is low and steady, so their walls are thin and floppy with little muscle and a wide lumen; larger veins have one-way VALVES, and blood is helped along by skeletal-muscle squeezing and breathing movements. Veins hold roughly two-thirds of the body's blood at rest.

Oxygen content usually follows this (systemic arteries carry oxygen-rich blood, systemic veins carry oxygen-poor blood) but NOT always: the pulmonary artery carries deoxygenated blood from the heart to the lungs, and the pulmonary veins carry oxygenated blood from the lungs back to the heart — the reverse of the usual pattern. So "artery = oxygenated" is a common mistake; "artery = away from the heart" is the real rule.`,
  ),
  k(
    'kb-gap-anat2-pulmonary-vs-systemic-circulation',
    'Pulmonary vs systemic circulation',
    [
      'difference between the pulmonary and systemic circulation', 'pulmonary circuit right heart to the lungs and back picks up oxygen drops off carbon dioxide short low pressure', 'systemic circuit left heart to the whole body and back delivers oxygen collects carbon dioxide long high pressure',
      'double circulation two loops in series', 'right ventricle thinner left ventricle thicker',
    ],
    `The human circulation is a DOUBLE circulation — two loops arranged in series, each powered by one side of the heart, so blood passes through the heart twice per full circuit.

The PULMONARY circuit is the short loop to the LUNGS, driven by the RIGHT side of the heart. Oxygen-poor blood returning from the body fills the right atrium, drops into the right ventricle, and is pumped through the pulmonary artery to the lung capillaries, where it releases carbon dioxide and picks up oxygen. Oxygen-rich blood returns via the pulmonary veins to the left atrium. Pressure here is LOW (the right ventricle is thin-walled) because the lungs are close and delicate.

The SYSTEMIC circuit is the long loop to the REST OF THE BODY, driven by the LEFT side of the heart. Oxygen-rich blood goes from the left atrium to the left ventricle and out through the aorta to every organ and tissue, delivering oxygen and nutrients and collecting carbon dioxide and waste. It returns via the venae cavae to the right atrium. Pressure here is HIGH (the left ventricle is thick-walled) to push blood around the whole body.

Short version: pulmonary = right heart → lungs → left heart, short and low-pressure, oxygenates blood; systemic = left heart → body → right heart, long and high-pressure, delivers oxygen.`,
  ),
  k(
    'kb-gap-anat2-inhalation-vs-exhalation',
    'Inhalation vs exhalation (mechanics of breathing)',
    [
      'difference between inhalation and exhalation', 'inhalation diaphragm contracts and flattens rib cage expands thoracic volume increases pressure drops air flows in', 'exhalation diaphragm relaxes and domes up thoracic volume decreases pressure rises air flows out',
      'quiet exhalation is passive elastic recoil', 'Boyle law volume and pressure inverse',
    ],
    `Both are driven by changing the volume of the chest cavity, which changes the air pressure inside the lungs relative to the outside (Boyle's law: bigger volume → lower pressure, and vice versa).

INHALATION (inspiration) is ACTIVE: the diaphragm CONTRACTS and flattens downward, and the external intercostal muscles lift the rib cage up and out. Thoracic volume INCREASES, so the pressure inside the lungs DROPS below atmospheric pressure, and air flows IN down that pressure gradient.

EXHALATION (expiration) at rest is PASSIVE: the diaphragm and intercostals RELAX, the diaphragm domes back up, and the elastic lungs and rib cage recoil to their resting size. Thoracic volume DECREASES, so the pressure inside the lungs RISES above atmospheric, and air flows OUT. (Forced exhalation — coughing, exercise, playing a wind instrument — adds active effort from the internal intercostals and abdominal muscles.)

So the key contrast: inhalation enlarges the chest and lowers lung pressure to pull air in; exhalation shrinks the chest and raises lung pressure to push air out. Note it is inhalation that lowers the pressure, not exhalation.`,
  ),
  k(
    'kb-gap-anat2-trachea-vs-esophagus',
    'Trachea vs esophagus',
    [
      'difference between the trachea and the esophagus', 'trachea the windpipe carries air anterior held open by C-shaped cartilage rings', 'esophagus carries food and drink to the stomach posterior collapsible muscular tube',
      'epiglottis covers the larynx during swallowing', 'the open back of the C-shaped rings lets the esophagus bulge forward as food passes',
    ],
    `Two separate tubes running down the neck, side by side, doing opposite jobs.

The TRACHEA (windpipe) carries AIR between the larynx and the lungs. It sits in FRONT (anterior). It must stay open at all times, so it is held permanently open by a stack of about 16-20 C-SHAPED rings of cartilage — firm at the front and sides, with the gap of the "C" at the BACK. That open back is deliberate: it lets the esophagus, right behind it, bulge forward when a mouthful of food passes.

The ESOPHAGUS (gullet) carries FOOD and DRINK from the pharynx down to the stomach. It sits BEHIND (posterior). It is a collapsible muscular tube with no cartilage — normally flat and closed, opening only to let a bolus of food through, which is pushed down by waves of muscle contraction (peristalsis).

They share one entrance at the throat, so during swallowing a flap of cartilage called the EPIGLOTTIS folds down over the larynx to keep food and liquid out of the airway. When that fails, you choke or food "goes down the wrong pipe".`,
  ),
  k(
    'kb-gap-anat2-liver-vs-pancreas',
    'Liver vs pancreas',
    [
      'difference between the liver and the pancreas', 'liver large multifunctional organ makes bile processes nutrients from the gut detoxifies stores glycogen makes plasma proteins', 'pancreas gland behind the stomach exocrine digestive enzymes into the duodenum endocrine insulin and glucagon into the blood',
      'liver is not a gland in the classic sense pancreas is both an exocrine and endocrine gland', 'both empty into the duodenum',
    ],
    `Both sit in the upper abdomen and both feed secretions into the small intestine, but they are very different organs.

The LIVER is the body's largest internal organ and a metabolic hub with dozens of jobs: it processes everything absorbed from the gut (arriving via the hepatic portal vein) — storing glucose as glycogen and releasing it, building and breaking down fats and proteins; it DETOXIFIES drugs, alcohol, and ammonia; it makes most plasma proteins (albumin, clotting factors); it stores iron and vitamins; it destroys old red blood cells; and it produces BILE. Bile is stored in the gallbladder and released into the duodenum to emulsify fats.

The PANCREAS is a gland, about 15 cm long, tucked behind the stomach. It has TWO distinct roles:
- EXOCRINE (about 98% of its mass): it makes pancreatic juice — digestive enzymes (amylase for starch, lipase for fat, proteases for protein) plus bicarbonate to neutralise stomach acid — delivered through the pancreatic duct into the duodenum.
- ENDOCRINE (the islets of Langerhans, ~1-2%): it secretes hormones straight into the blood, chiefly INSULIN and GLUCAGON, which control blood sugar.

Short version: the liver processes, stores, detoxifies, and makes bile; the pancreas makes digestive enzymes for the gut and blood-sugar hormones for the body.`,
  ),
  k(
    'kb-gap-anat2-hormone-vs-enzyme',
    'Hormone vs enzyme',
    [
      'difference between a hormone and an enzyme', 'a hormone is a chemical messenger released into the blood by an endocrine gland acting on distant target cells with matching receptors', 'an enzyme is a biological catalyst usually a protein that speeds up a specific chemical reaction without being used up',
      'hormones signal slowly and body-wide enzymes act locally and instantly', 'insulin adrenaline versus amylase DNA polymerase',
    ],
    `They are both usually proteins (some hormones are steroids or amino-acid derivatives) but they do completely different things.

An ENZYME is a biological CATALYST. It speeds up a specific chemical reaction — often by millions of times — by binding its "substrate" at an active site and lowering the activation energy, and it comes out UNCHANGED, ready to do it again. Each enzyme is highly specific to its reaction (amylase splits starch, DNA polymerase copies DNA, pepsin cuts proteins). Enzymes act right where they are, essentially instantly, on molecules, and are not "messages".

A HORMONE is a chemical MESSENGER. An endocrine gland releases it into the BLOODSTREAM, and it travels around the body and produces an effect only in "target" cells that carry the matching receptor. It changes what those cells DO (grow, take up glucose, release calcium, mature). Hormonal signalling is comparatively slow (seconds to hours to days) and can be body-wide (insulin, adrenaline, thyroxine, oestrogen, growth hormone).

Short version: an enzyme makes a particular reaction go faster, locally and immediately; a hormone carries an instruction through the blood to distant cells and changes their behaviour.`,
  ),
  k(
    'kb-gap-anat2-endocrine-vs-exocrine',
    'Endocrine vs exocrine glands',
    [
      'difference between the endocrine and exocrine systems', 'endocrine glands are ductless secrete hormones directly into the bloodstream', 'exocrine glands secrete through ducts onto an epithelial surface or into a cavity',
      'pituitary thyroid adrenal pancreas islets are endocrine', 'sweat salivary mammary sebaceous digestive glands are exocrine', 'pancreas and gonads do both',
    ],
    `The difference is WHERE the secretion goes and whether there is a DUCT.

ENDOCRINE glands are DUCTLESS. They release their products — HORMONES — directly into the surrounding tissue fluid and then the BLOODSTREAM, which carries the hormone throughout the body to act on distant target cells. Examples: the pituitary, thyroid, parathyroids, adrenal glands, and the islets of Langerhans in the pancreas. Their effects are widespread and relatively slow.

EXOCRINE glands secrete through DUCTS (tubes) that carry the product to an epithelial surface — the skin, or the lining of a hollow organ — rather than into the blood. Examples: sweat glands, sebaceous (oil) glands, salivary glands, mammary glands, tear glands, mucous glands, and the enzyme-producing part of the pancreas and the digestive glands of the stomach and intestine. Their products act locally where the duct delivers them.

Some organs do BOTH: the pancreas has an exocrine part (enzymes via a duct to the gut) and an endocrine part (insulin/glucagon into the blood); the ovaries and testes release gametes (exocrine-like) and sex hormones (endocrine).`,
  ),
  k(
    'kb-gap-anat2-reflex-vs-voluntary',
    'Reflex vs voluntary movement',
    [
      'difference between a reflex and a voluntary movement', 'a reflex is an automatic rapid stereotyped response not requiring conscious thought often routed through the spinal cord reflex arc', 'a voluntary movement is consciously initiated planned by the brain motor cortex',
      'knee jerk withdrawal from a hot surface pupil constriction are reflexes', 'walking writing reaching are voluntary', 'reflexes can happen before you are aware',
    ],
    `A REFLEX is an automatic, involuntary, rapid, and stereotyped response to a stimulus. It does not require conscious thought and often does not even reach the brain first: in a spinal reflex the signal travels sensory neuron → spinal cord → motor neuron (the "reflex arc"), producing the response before you are consciously aware of the stimulus. The response is the same every time for a given stimulus. Examples: the knee-jerk (patellar) reflex, jerking your hand off a hot surface, blinking when something nears the eye, the pupil constricting in bright light, coughing, the gag reflex.

A VOLUNTARY movement is consciously INITIATED and planned. It starts in the brain — the motor cortex and associated areas decide on a goal, plan the sequence, and send commands down the spinal cord to the muscles, with the cerebellum and basal ganglia refining coordination and timing. It can be started, stopped, changed, or practised, and it varies with intent. Examples: walking, reaching for a cup, writing, speaking, kicking a ball.

Key contrasts: reflex = automatic, fast, fixed, often spinal, protective; voluntary = deliberate, slower to start, flexible, brain-initiated, goal-directed. (Some actions blur the line — breathing and blinking run automatically but can be taken over consciously.)`,
  ),
  k(
    'kb-gap-anat2-rods-vs-cones',
    'Rods vs cones (photoreceptors)',
    [
      'difference between rods and cones in the eye', 'rods very light sensitive night and peripheral vision no colour low acuity absent from the fovea dense in the periphery', 'cones need bright light give colour and sharp detail three types red green blue packed in the fovea',
      'about 120 million rods 6 million cones', 'scotopic versus photopic vision', 'rods NOT in the fovea',
    ],
    `Both are photoreceptor cells in the retina; they divide the labour between dim and bright conditions.

RODS (~120 million per eye) are extremely light-SENSITIVE — they work in dim light and at night (scotopic vision). They do NOT distinguish colour (one pigment, rhodopsin) and give low-resolution, "grainy" detail because many rods share each output neuron. They are ABSENT from the fovea (the central pit) and most densely packed in the PERIPHERAL retina — which is why faint stars are easier to see slightly off to the side, and why night vision is blurry and colourless.

CONES (~6 million per eye) need BRIGHT light to respond (photopic vision). They give COLOUR vision — there are three types tuned to roughly red, green, and blue wavelengths — and sharp, high-resolution detail because in the fovea each cone has nearly its own output line. They are densely PACKED IN THE FOVEA and thin out toward the periphery, which is why you turn your eyes to point the fovea straight at whatever you want to see clearly.

Short version: rods = dim light, no colour, peripheral, not in the fovea; cones = bright light, colour, sharp, concentrated in the fovea.`,
  ),
  k(
    'kb-gap-anat2-cornea-vs-lens',
    'Cornea vs lens (focusing the eye)',
    [
      'difference between the cornea and the lens', 'cornea the clear front dome provides most of the eyes fixed focusing power', 'lens behind the iris changes shape to fine-tune focus accommodation near and far',
      'the iris not the lens controls how much light enters', 'lens hardens with age presbyopia cataract', 'cornea has no blood vessels',
    ],
    `Both are transparent structures that bend (refract) incoming light to focus an image on the retina, but they do different parts of the job.

The CORNEA is the clear, curved DOME at the very front of the eye. It provides about TWO-THIRDS of the eye's total focusing power, and that power is FIXED — the cornea cannot change shape. It has no blood vessels (it gets oxygen from the air and from tears), which is what keeps it clear. An irregular corneal curvature causes astigmatism; reshaping the cornea is what laser eye surgery (LASIK) does.

The LENS sits just BEHIND the iris and pupil. It provides the remaining focusing power and, crucially, it can CHANGE SHAPE — the ciliary muscle squeezes it rounder to focus on near objects and lets it flatten for distant ones. This fine-tuning is called ACCOMMODATION. With age the lens stiffens and can no longer round up (presbyopia — needing reading glasses), and it can cloud over (a cataract).

Note: it is the IRIS (the coloured ring), by adjusting the size of the PUPIL, that controls how much light enters the eye — not the lens.`,
  ),
  k(
    'kb-gap-anat2-cochlea-vs-semicircular-canals',
    'Cochlea vs semicircular canals',
    [
      'difference between the cochlea and the semicircular canals', 'cochlea the spiral organ of hearing converts sound vibrations to nerve signals', 'semicircular canals three fluid loops detect rotational movement of the head part of the balance vestibular system',
      'both are in the inner ear filled with fluid and hair cells', 'vestibular system also includes the utricle and saccule for linear acceleration and gravity',
    ],
    `Both are fluid-filled parts of the INNER EAR that use tiny "hair cells" to turn movement into nerve signals, but they sense completely different things.

The COCHLEA is the organ of HEARING. It is a spiral tube shaped like a snail shell. Sound vibrations transmitted from the eardrum through the middle-ear bones set its fluid moving; the moving fluid bends hair cells along a membrane, and they fire signals to the brain via the auditory (cochlear) nerve. Different positions along the spiral respond to different frequencies — high pitches near the base, low pitches near the tip — which is how the brain tells pitch apart.

The SEMICIRCULAR CANALS are part of the BALANCE (vestibular) system, NOT hearing. There are three of them, set at right angles to each other (one for each plane of rotation). When your head turns, the fluid inside lags behind and bends a tuft of hair cells, signalling ROTATIONAL acceleration — spinning, nodding, tilting. This is why spinning around and stopping makes you feel like the room is still moving. (The nearby utricle and saccule handle linear acceleration and the pull of gravity.)

Short version: cochlea = hearing (sound → pitch); semicircular canals = balance (head rotation).`,
  ),
  k(
    'kb-gap-anat2-vaccine-vs-antibiotic',
    'Vaccine vs antibiotic',
    [
      'difference between a vaccine and an antibiotic', 'a vaccine is preventive trains the immune system in advance by showing it a harmless version of a pathogen', 'an antibiotic is a treatment a drug that kills or stops bacteria during an active infection',
      'antibiotics do not work on viruses', 'vaccines exist against both viral and bacterial diseases', 'prophylaxis versus therapy antibiotic resistance',
    ],
    `They work at opposite ends of an illness and by opposite mechanisms.

A VACCINE is PREVENTIVE. It contains a harmless form of a pathogen — a killed or weakened microbe, a piece of it (a protein), or mRNA instructions to make that piece — and giving it "trains" your own IMMUNE SYSTEM in advance. Your body makes antibodies and memory cells, so if you later meet the real pathogen you fight it off quickly, often before you feel ill. Vaccines are given to healthy people before exposure, and they exist against both VIRAL diseases (measles, polio, COVID, flu) and BACTERIAL ones (tetanus, whooping cough, pneumococcus).

An ANTIBIOTIC is a TREATMENT. It is a drug taken DURING an active BACTERIAL infection that either kills the bacteria (bactericidal) or stops them multiplying (bacteriostatic) so your immune system can clear them — by attacking bacterial cell walls, protein-making machinery, or DNA replication. Antibiotics do NOTHING against VIRUSES (colds, flu, COVID), because viruses lack the bacterial machinery the drugs target — taking them for a viral illness just breeds antibiotic RESISTANCE without helping.

Short version: a vaccine prepares your immune system before you get sick and covers viral and bacterial diseases; an antibiotic is a drug that fights an active bacterial infection and does nothing to viruses.`,
  ),
];
