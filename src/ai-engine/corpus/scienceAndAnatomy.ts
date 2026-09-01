import { KnowledgeItem } from '../../types';

export const SCIENCE_AND_ANATOMY_CORPUS: KnowledgeItem[] = [
  // 1. Cardiovascular System & Heart Anatomy
  {
    id: 'kb-human-heart-circulation',
    title: 'The Human Heart & Dual Circulatory System',
    category: 'human-biology',
    keywords: [
      'heart',
      'human heart',
      'chambers of the heart',
      'atrium',
      'ventricle',
      'circulation',
      'cardiovascular',
      'blood flow',
      'aorta',
      'pulmonary artery',
      'valves',
    ],
    content: `The human heart is a muscular 4-chambered pump operating two interconnected circulatory loops:
1. **The 4 Chambers**:
   - **Right Atrium**: Receives deoxygenated blood from the body via the Superior and Inferior Vena Cava.
   - **Right Ventricle**: Pumps deoxygenated blood through the pulmonary valve into the pulmonary arteries toward the lungs.
   - **Left Atrium**: Receives freshly oxygenated blood from the lungs via pulmonary veins.
   - **Left Ventricle**: The thickest, most muscular chamber; pumps oxygen-rich blood through the aortic valve into the **Aorta** under high pressure (~120 mmHg) to supply the entire body.
2. **The 4 One-Way Valves**:
   - Tricuspid & Mitral (Bicuspid) valves prevent backflow from ventricles to atria.
   - Pulmonary & Aortic semilunar valves prevent backflow into ventricles during diastole.
3. **Dual Loops**:
   - **Pulmonary Circuit**: Heart ➔ Lungs (oxygen uptake & $\\text{CO}_2$ release) ➔ Heart.
   - **Systemic Circuit**: Heart ➔ Brain, organs, muscles (oxygen & nutrient delivery) ➔ Heart.
- **Electrical Conduction**: Initiated by the **Sinoatrial (SA) Node** (the heart's natural pacemaker), traveling through the AV node, Bundle of His, and Purkinje fibers to trigger coordinated cardiac contraction.`,
    createdAt: Date.now(),
  },

  // 2. Human Brain Lobes & Neurotransmitters
  {
    id: 'kb-brain-lobes-neurotransmitters',
    title: 'Human Brain Anatomy: Lobes, Cerebellum & Primary Neurotransmitters',
    category: 'neuroscience',
    keywords: [
      'brain',
      'brain lobes',
      'frontal lobe',
      'jak dziala ludzki mozg',
      'jak działa mózg',
      'temporal lobe',
      'parietal lobe',
      'occipital lobe',
      'cerebellum',
      'neurotransmitters',
      'dopamine',
      'serotonin',
      'gaba',
      'neurons',
    ],
    content: `The human brain contains ~86 billion neurons organized into distinct anatomical regions:
1. **The Cerebral Cortex Lobes**:
   - **Frontal Lobe**: Executive functions, abstract reasoning, planning, decision-making, emotional regulation, and motor control (precentral gyrus). Includes Broca's area for speech production.
   - **Parietal Lobe**: Somatosensory processing (touch, temperature, spatial navigation, proprioception).
   - **Occipital Lobe**: Primary visual cortex (processing light, shape, color, and optical recognition).
   - **Temporal Lobe**: Auditory processing, language comprehension (Wernicke's area), and memory encoding (housing the Hippocampus).
2. **Subcortical Structures**:
   - **Cerebellum**: Precision coordination, motor timing, and balance.
   - **Brainstem (Midbrain, Pons, Medulla)**: Autonomic life-support (respiration, cardiac rate, blood pressure, sleep cycles).
   - **Amygdala & Hippocampus**: Limbic hub for fear conditioning, emotional valence, and long-term memory formation.
3. **Key Neurotransmitters**:
   - **Dopamine**: Reward prediction, motivation, motor reinforcement.
   - **Serotonin (5-HT)**: Mood stabilization, sleep regulation, gut motility.
   - **GABA**: Primary inhibitory neurotransmitter (calms neural hyperactivity).
   - **Glutamate**: Primary excitatory neurotransmitter (synaptic plasticity & learning).
   - **Acetylcholine**: Muscle contraction and attentional focus.`,
    createdAt: Date.now(),
  },

  // 3. Human Digestive System & Macronutrient Breakdown
  {
    id: 'kb-digestive-system-metabolism',
    title: 'The Human Digestive Tract & Macronutrient Breakdown',
    category: 'human-biology',
    keywords: [
      'digestion',
      'digestive system',
      'stomach',
      'small intestine',
      'liver',
      'pancreas',
      'enzymes',
      'macronutrients',
      'metabolism',
      'colon',
    ],
    content: `The gastrointestinal (GI) tract breaks down complex foods into absorbable molecular nutrients:
1. **Mouth & Esophagus**: Mastication mechanically breaks food down; salivary amylase begins carbohydrate breakdown. Peristalsis moves the bolus down the esophagus.
2. **Stomach**: Hydrochloric acid (HCl, pH ~1.5 to 2.0) denatures proteins and destroys ingested bacteria. The enzyme **pepsin** cuts proteins into shorter peptide chains. Stomach churning produces acidic **chyme**.
3. **Small Intestine (Duodenum, Jejunum, Ileum)**:
   - The primary site of chemical digestion and nutrient absorption (~90%).
   - The **Pancreas** secretes bicarbonate (neutralizing acid), lipase (fats), trypsin (proteins), and pancreatic amylase (carbs).
   - The **Liver** produces **bile** (stored in gallbladder) to emulsify fats into tiny droplets for lipase action.
   - Microscopic **villi and microvilli** increase absorptive surface area to ~30 square meters.
4. **Large Intestine (Colon)**: Absorbs remaining water and electrolytes, houses trillions of symbiotic gut microbiome bacteria (synthesizing Vitamin K and short-chain fatty acids), and compacts waste.
5. **Metabolic Fates**:
   - Carbohydrates ➔ Glucose (stored as Glycogen or burned for ATP).
   - Proteins ➔ Amino acids (muscle synthesis, enzymes, tissue repair).
   - Fats ➔ Fatty acids & glycerol (cell membranes, hormones, energy storage).`,
    createdAt: Date.now(),
  },

  // 4. DNA vs RNA & Molecular Genetics
  {
    id: 'kb-dna-vs-rna-genetics',
    title: 'DNA vs RNA: Structural Differences, Transcription & Translation',
    category: 'genetics',
    keywords: [
      'dna',
      'rna',
      'difference between dna and rna',
      'nucleotides',
      'transcription',
      'translation',
      'genes',
      'mrna',
      'trna',
      'ribosome',
      'genetic code',
    ],
    content: `Comparison of genetic nucleic acids and the Central Dogma of Molecular Biology:
1. **Core Structural Differences**:
   - **Sugar Backbone**: DNA contains **Deoxyribose** (lacks an oxygen at carbon-2'); RNA contains **Ribose** (has a 2'-OH hydroxyl group, making it more chemically reactive).
   - **Strand Geometry**: DNA is a stable double-stranded anti-parallel **double helix** (B-form); RNA is typically single-stranded and folds into complex 3D ribozyme structures.
   - **Nitrogenous Bases**:
     - DNA: **Adenine (A), Thymine (T), Guanine (G), Cytosine (C)**. Base pairs: $A=T$, $G\\equiv C$.
     - RNA: **Adenine (A), Uracil (U), Guanine (G), Cytosine (C)**. Base pairs: $A=U$, $G\\equiv C$.
2. **The Central Dogma Process**:
   - **Transcription (in Nucleus)**: RNA Polymerase unzips DNA and synthesizes a complementary **messenger RNA (mRNA)** transcript from the template strand.
   - **Splicing**: Introns (non-coding regions) are excised, and exons are joined together with a 5' cap and poly-A tail.
   - **Translation (in Cytoplasm / Ribosomes)**: Ribosomes read mRNA codons (3-nucleotide sequences). **Transfer RNA (tRNA)** molecules bring corresponding amino acids matching the codon, linking them into polypeptide protein chains.`,
    createdAt: Date.now(),
  },

  // 5. Electricity, Circuits, Ohm's Law & Power
  {
    id: 'kb-electricity-ohms-law-circuits',
    title: "Electricity Fundamentals: Ohm's Law, Power Equations & AC vs DC",
    category: 'physics',
    keywords: [
      'electricity',
      'ohms law',
      'voltage',
      'current',
      'resistance',
      'ac dc',
      'circuits',
      'power formula',
      'series parallel',
      'amps',
      'volts',
      'watts',
    ],
    content: `Fundamental physics governing electrical current flow:
1. **The Core Triad of Electricity**:
   - **Voltage ($V$, Volts)**: The electrical potential difference or "pressure" pushing electrons.
   - **Current ($I$, Amperes)**: The rate of electron charge flow ($1\\text{ A} = 1\\text{ Coulomb/second} = 6.242 \\times 10^{18}\\text{ electrons/s}$).
   - **Resistance ($R$, Ohms $\\Omega$)**: The opposition to current flow in a material.
2. **Ohm's Law**:
   $$V = I \\times R \\quad \\implies \\quad I = \\frac{V}{R} \\quad \\implies \\quad R = \\frac{V}{I}$$
3. **Electrical Power Equations**:
   $$P = V \\times I = I^2 R = \\frac{V^2}{R} \\quad (\\text{Watts})$$
4. **AC vs DC**:
   - **DC (Direct Current)**: Electrons flow continuously in one direction (batteries, solar panels, computer motherboards).
   - **AC (Alternating Current)**: Electrons oscillate back and forth (50 Hz or 60 Hz in wall outlets). AC is used for grid transmission because transformers can step up voltage to hundreds of thousands of volts, minimizing $I^2 R$ transmission line heat losses over long distances.
5. **Series vs Parallel Circuits**:
   - **Series**: $R_{\\text{total}} = R_1 + R_2 + \\dots$; current is identical everywhere; one broken component kills the whole circuit.
   - **Parallel**: $\\frac{1}{R_{\\text{total}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots$; voltage is identical across branches; each device operates independently.`,
    createdAt: Date.now(),
  },

  // 6. States of Matter, Thermodynamics & Phase Changes
  {
    id: 'kb-states-of-matter-thermodynamics',
    title: 'States of Matter, Phase Changes & The Laws of Thermodynamics',
    category: 'physics',
    keywords: [
      'states of matter',
      'solid',
      'liquid',
      'gas',
      'plasma',
      'phase change',
      'thermodynamics',
      'entropy',
      'sublimation',
      'latent heat',
      'absolute zero',
      'why does ice float',
      'water density anomaly',
    ],
    content: `Physical states of matter and thermodynamic laws:
1. **The 4 Fundamental States of Matter**:
   - **Solid**: Fixed volume and shape; particles vibrate tightly in locked crystal lattice positions.
   - **Liquid**: Fixed volume, variable shape; particles slide past each other with kinetic freedom.
   - **Gas**: Variable volume and shape; particles move rapidly and collide elastically.
   - **Plasma**: Superheated ionized gas where electrons are stripped from atomic nuclei (constitutes >99% of visible matter in the universe, including the Sun and lightning).
2. **Phase Transitions**:
   - Melting (Solid ➔ Liquid) / Freezing (Liquid ➔ Solid).
   - Vaporization (Liquid ➔ Gas) / Condensation (Gas ➔ Liquid).
   - Sublimation (Solid ➔ Gas directly, e.g. dry ice $\\text{CO}_2$) / Deposition (Gas ➔ Solid, e.g. frost).
   - **Latent Heat**: Thermal energy absorbed or released during a phase change without altering temperature.
3. **The 4 Laws of Thermodynamics**:
   - **Zeroth Law**: If system A is in thermal equilibrium with B, and B with C, then A is in equilibrium with C (foundation of temperature measurement).
   - **First Law (Conservation of Energy)**: $\\Delta U = Q - W$ (Energy cannot be created or destroyed, only transformed).
   - **Second Law (Entropy)**: Total entropy of an isolated system always increases ($\\Delta S \\ge 0$). Heat flows spontaneously from hot to cold bodies.
   - **Third Law**: As temperature approaches Absolute Zero ($0\\text{ K} = -273.15^\\circ\\text{C}$), the entropy of a pure crystalline substance approaches zero.
4. **Why Ice Floats (Water's Density Anomaly)**: Almost every liquid gets denser as it cools and freezes, because the molecules pack closer together, so the solid sinks. Water is a famous exception: hydrogen bonds lock water molecules into a hexagonal crystal lattice as ice forms, and that lattice holds the molecules farther apart than they are in liquid water. Ice floats because it ends up about 9% less dense than liquid water — the same reason lakes freeze from the top down, letting fish survive winter under the ice sheet.`,
    createdAt: Date.now(),
  },

  // 7. The Periodic Table, Chemical Bonds & pH Scale
  {
    id: 'kb-chemistry-periodic-table-ph',
    title: 'Chemistry: The Periodic Table, Chemical Bonds & The pH Scale',
    category: 'chemistry',
    keywords: [
      'periodic table',
      'chemistry',
      'chemical bonds',
      'covalent bond',
      'ionic bond',
      'ph scale',
      'acids and bases',
      'atoms',
      'protons',
      'electrons',
      'neutrons',
    ],
    content: `Core foundations of atomic structure and chemical reactivity:
1. **Atomic Structure**:
   - **Protons** (positive charge, inside nucleus, determines atomic number $Z$).
   - **Neutrons** (neutral charge, inside nucleus, determines isotope mass number $A$).
   - **Electrons** (negative charge, orbit in quantized energy shells: $2, 8, 18, 32$).
2. **Chemical Bonding**:
   - **Covalent Bonding**: Atoms share pairs of valence electrons (e.g. $\\text{H}_2\\text{O}$, $\\text{CH}_4$, $\\text{O}_2$). Common between nonmetals.
   - **Ionic Bonding**: Large electronegativity difference causes one atom to transfer electrons to another, forming attracted cations (+) and anions (-) (e.g. $\\text{NaCl}$).
   - **Metallic Bonding**: Delocalized "sea of electrons" shared freely among metal cation cores (giving metals electrical conductivity and malleability).
   - **Hydrogen Bonds**: Weak intermolecular electrostatic attractions between partially positive H and highly electronegative atoms (O, N, F).
3. **The pH Scale (0 to 14)**:
   - Measures logarithmic hydrogen ion concentration: $\\text{pH} = -\\log_{10}[\\text{H}^+]$.
   - **Acidic (pH < 7)**: High $[\\text{H}^+]$ concentration (Gastric acid pH 1.5, Lemon juice pH 2, Coffee pH 5).
   - **Neutral (pH = 7)**: Pure distilled water at $25^\\circ\\text{C}$.
   - **Basic / Alkaline (pH > 7)**: High $[\\text{OH}^-]$ concentration (Human blood pH 7.35–7.45, Baking soda pH 9, Bleach pH 12.5).`,
    createdAt: Date.now(),
  },

  // 8. Optics & The Electromagnetic Spectrum
  {
    id: 'kb-electromagnetic-spectrum-optics',
    title: 'Optics & The Complete Electromagnetic Spectrum',
    category: 'physics',
    keywords: [
      'electromagnetic spectrum',
      'light',
      'photons',
      'optics',
      'refraction',
      'snells law',
      'wavelength',
      'frequency',
      'infrared',
      'ultraviolet',
      'x-rays',
      'gamma rays',
    ],
    content: `Electromagnetic radiation travels as oscillating electric and magnetic field waves at the speed of light ($c = f \\lambda \\approx 3 \\times 10^8\\text{ m/s}$):
1. **The EM Spectrum (from Longest to Shortest Wavelength)**:
   - **Radio Waves** ($>1\\text{ m}$): AM/FM radio, Wi-Fi, television, 5G cellular communication.
   - **Microwaves** ($1\\text{ mm} - 1\\text{ m}$): Radar, GPS satellites, microwave cooking.
   - **Infrared (IR)** ($700\\text{ nm} - 1\\text{ mm}$): Thermal heat radiation, TV remotes, night vision.
   - **Visible Light** ($380\\text{ nm} - 700\\text{ nm}$): Red (~700nm) ➔ Orange ➔ Yellow ➔ Green ➔ Blue ➔ Violet (~380nm).
   - **Ultraviolet (UV)** ($10\\text{ nm} - 400\\text{ nm}$): Sunlight tanning, Vitamin D synthesis, germicidal sterilization (UVC).
   - **X-Rays** ($0.01\\text{ nm} - 10\\text{ nm}$): Medical bone imaging, airport luggage security scans.
   - **Gamma Rays** ($<0.01\\text{ nm}$): High-energy radioactive decay, cosmic hypernovae; highly ionizing.
2. **Optics Laws**:
   - **Law of Reflection**: Angle of incidence equals angle of reflection ($\\theta_i = \\theta_r$).
   - **Snell's Law of Refraction**: $n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2$ (Light bends towards the normal when entering a denser optical medium with higher refractive index $n$).
   - **Total Internal Reflection**: When incident angle exceeds critical angle $\\theta_c$, 100% of light is reflected internally (enabling fiber-optic broadband internet).`,
    createdAt: Date.now(),
  },
];
