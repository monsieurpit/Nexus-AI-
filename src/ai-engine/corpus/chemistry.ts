import { KnowledgeItem } from '../../types';

export const CHEMISTRY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-chemistry-periodic-table',
    title: 'The Periodic Table of Elements',
    category: 'Chemistry',
    keywords: ['periodic table', 'elements', 'atoms', 'protons', 'electrons', 'metals', 'nonmetals', 'groups', 'periods', 'chemistry'],
    content: `The periodic table, organised by Dmitri Mendeleev in 1869 and refined since, arranges the 118 known elements by increasing atomic number (number of protons). Elements in the same column (group) share similar chemical properties because they have the same number of valence electrons. Rows are periods; as you move across a period, electrons fill the same shell. Metals (left and centre) are generally shiny, malleable, and conduct electricity. Non-metals (upper right) are poor conductors. Metalloids (along the staircase line) have intermediate properties. Group 1 alkali metals (Li, Na, K…) are highly reactive. Group 17 halogens (F, Cl, Br…) are very reactive non-metals. Group 18 noble gases (He, Ne, Ar…) are largely inert due to full valence shells. Atomic radius increases down a group and decreases across a period. Electronegativity increases across a period and up a group — fluorine is the most electronegative element. The periodic table is the primary organisational tool of chemistry, enabling prediction of element behaviour and compound formation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-chemistry-chemical-bonding',
    title: 'Chemical Bonding: Ionic, Covalent, and Metallic',
    category: 'Chemistry',
    keywords: ['chemical bonding', 'ionic', 'covalent', 'metallic', 'hydrogen bond', 'electrons', 'valence', 'electronegativity'],
    content: `Atoms bond together to achieve more stable electron configurations, typically fulfilling the octet rule (eight valence electrons). Ionic bonds form when electrons transfer from one atom to another, creating oppositely charged ions that attract each other. Sodium chloride (table salt) is a classic example: Na donates an electron to Cl, forming Na⁺ and Cl⁻. Ionic compounds typically form crystalline lattices, have high melting points, and conduct electricity when dissolved. Covalent bonds form when atoms share electron pairs. Oxygen (O₂) shares two pairs (double bond). Carbon forms four covalent bonds, enabling organic chemistry's vast diversity. Covalent compounds can be polar (unequal sharing, as in water H₂O) or non-polar (equal sharing, as in methane CH₄). Hydrogen bonds are weak attractions between polar molecules — crucial for water's properties and DNA's double helix. Metallic bonds form in metals, where electrons delocalise across a lattice of cations, creating the "electron sea" that enables conductivity. Van der Waals forces are weak temporary dipole attractions between all molecules.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-chemistry-acids-bases-ph',
    title: 'Acids, Bases, and pH',
    category: 'Chemistry',
    keywords: ['acid', 'base', 'pH', 'chemistry', 'proton', 'buffer', 'neutral', 'alkaline', 'acidic', 'dissociation'],
    content: `The Brønsted-Lowry definition classifies acids as proton (H⁺) donors and bases as proton acceptors. The Lewis definition broadens this: acids accept electron pairs, bases donate them. Strong acids like hydrochloric acid (HCl) and sulfuric acid (H₂SO₄) dissociate completely in water; weak acids like acetic acid (CH₃COOH) dissociate partially. The pH scale measures acidity: pH = −log[H⁺]. pH 0–6 is acidic, pH 7 is neutral (pure water at 25°C), and pH 8–14 is basic (alkaline). Each unit represents a tenfold difference in H⁺ concentration. A neutralisation reaction between an acid and a base produces a salt and water: HCl + NaOH → NaCl + H₂O. Buffer solutions resist pH changes by containing a weak acid and its conjugate base; blood is buffered near pH 7.4. Indicators like litmus change colour with pH. pH is critical in biology (enzymes work in narrow pH ranges), agriculture (soil pH affects crop growth), and industry (food preservation, water treatment, manufacturing).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-chemistry-organic-chemistry',
    title: 'Organic Chemistry and Carbon',
    category: 'Chemistry',
    keywords: ['organic chemistry', 'carbon', 'hydrocarbons', 'functional groups', 'polymer', 'amino acids', 'isomers', 'alkane', 'alkene'],
    content: `Organic chemistry studies compounds containing carbon, which is uniquely capable of forming four stable covalent bonds and chaining into long molecules. Hydrocarbons contain only carbon and hydrogen. Alkanes (methane CH₄, ethane C₂H₆…) are saturated with single bonds. Alkenes contain carbon-carbon double bonds (ethene C₂H₄). Alkynes have triple bonds. Functional groups define reactivity: hydroxyl (−OH) makes alcohols, carbonyl (C=O) appears in aldehydes and ketones, carboxyl (−COOH) makes carboxylic acids, and amino (−NH₂) makes amines and amino acids. Polymers are long chains of repeating monomers: polyethylene, nylon, proteins (amino acid chains), and DNA (nucleotide chains). Isomers are compounds with the same molecular formula but different structures, often having dramatically different properties. Chirality means a molecule is non-superimposable on its mirror image — many drugs are only effective as one enantiomer. Organic chemistry underpins pharmaceuticals, plastics, food chemistry, and biochemistry.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-chemistry-nuclear-chemistry',
    title: 'Nuclear Chemistry and Radioactivity',
    category: 'Chemistry',
    keywords: ['nuclear', 'radioactivity', 'fission', 'fusion', 'half-life', 'alpha', 'beta', 'gamma', 'carbon dating', 'uranium'],
    content: `Nuclear chemistry studies changes in atomic nuclei. Radioactive decay occurs when unstable nuclei emit particles or radiation. Alpha (α) decay emits a helium nucleus (2 protons, 2 neutrons), reducing atomic number by 2. Beta (β) decay converts a neutron to a proton (β⁻) or a proton to a neutron (β⁺), changing the element. Gamma (γ) radiation is high-energy electromagnetic radiation accompanying other decays. Half-life is the time for half the atoms in a sample to decay; carbon-14 has a half-life of ~5,730 years, making it useful for radiocarbon dating of organic material up to ~50,000 years old. Nuclear fission splits heavy nuclei (like uranium-235) into lighter ones, releasing enormous energy via E = mc². Nuclear fusion combines light nuclei (like hydrogen isotopes) into heavier ones, releasing even more energy per gram — it powers the Sun and hydrogen bombs. Fusion is the holy grail of clean energy. Radioactivity is measured in becquerels (decays per second); dose in sieverts. Nuclear medicine uses radioactive isotopes for imaging (PET scans) and cancer treatment.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-chem-ph-scale-explained',
    title: 'The pH Scale: What It Actually Measures',
    category: 'Chemistry',
    keywords: [
      'ph scale explained', 'what is ph', 'acid vs base', 'how is ph measured', 'ph of common substances',
      'logarithmic scale ph',
    ],
    content: `The pH scale measures how acidic or basic (alkaline) a water-based solution is, based specifically on the concentration of free hydrogen ions (H+) in that solution — more free H+ ions means more acidic (lower pH), fewer free H+ ions (relative to hydroxide ions, OH-) means more basic (higher pH). The scale runs from 0 to 14, with 7 as neutral (pure water) — below 7 is acidic, above 7 is basic. Crucially, pH is a logarithmic scale, not a linear one, meaning each single whole-number step represents a tenfold change in actual hydrogen ion concentration — a solution with pH 4 isn't twice as acidic as pH 5, it's ten times more acidic, and a hundred times more acidic than pH 6, which is why relatively small pH differences between common substances (like stomach acid around pH 1-2 versus black coffee around pH 5) represent enormous real differences in actual acidity. Some familiar reference points: battery acid sits near pH 0-1, stomach acid around pH 1.5-3.5, black coffee around pH 5, pure water at pH 7 (neutral), seawater around pH 8, baking soda solution around pH 9, and household ammonia or drain cleaner up around pH 11-13. pH is measured practically using either pH indicator strips/paper (which change color at specific pH ranges through embedded chemical dyes) or an electronic pH meter (which measures the actual electrical voltage generated by hydrogen ion activity through a specialized glass electrode, giving a more precise numeric reading). pH matters far beyond the chemistry classroom — it's critical to human physiology (blood pH is very tightly regulated around 7.35-7.45, and even small deviations outside that narrow range are medically serious), agriculture (soil pH significantly affects which nutrients plants can actually absorb), and countless industrial and cooking processes (baking soda vs. baking powder reactions, cheese-making, and water treatment all depend on carefully managed pH).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-chem-states-of-matter-phase-changes',
    title: 'States of Matter and Phase Changes: Beyond Solid, Liquid, Gas',
    category: 'Chemistry',
    keywords: [
      'states of matter explained', 'phase changes', 'plasma fourth state of matter', 'sublimation explained',
      'melting boiling freezing points',
    ],
    content: `The three states of matter taught earliest — solid, liquid, and gas — describe how tightly and how freely a substance's particles (atoms or molecules) are arranged and able to move relative to each other. In a solid, particles are packed tightly in a fixed structure, vibrating in place but not moving past each other, giving solids a fixed shape and volume. In a liquid, particles are still close together but can slide past one another, giving a liquid a fixed volume but a shape that conforms to its container. In a gas, particles are far apart and moving freely and rapidly, giving gases neither fixed shape nor fixed volume — they expand to fill whatever container they're in. Phase changes between these states happen at specific temperatures (and are also affected by pressure) as energy is added or removed: melting (solid to liquid) and freezing (liquid to solid) happen at the same temperature for a given substance under given conditions — water's melting/freezing point is 0°C at standard atmospheric pressure — while boiling (liquid to gas) and condensation (gas to liquid) similarly happen at water's boiling point of 100°C at sea level (this is why water boils at a lower temperature at high altitude, where atmospheric pressure is lower). Sublimation is the less commonly discussed direct transition from solid straight to gas, skipping the liquid phase entirely — dry ice (solid carbon dioxide) is the most familiar everyday example, producing its visible "smoke" effect as it sublimates directly into CO2 gas at normal atmospheric pressure without ever becoming liquid. Plasma is often called the fourth state of matter — an extremely energetic state where atoms have been stripped of some or all of their electrons, creating a charged, highly conductive substance; while relatively rare in everyday life on Earth's surface, plasma is actually the most common state of matter in the observable universe overall, since it's what stars (including our Sun) are made of, along with lightning, neon signs, and the aurora borealis being more familiar Earth-based examples.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-chem-why-metals-conduct-electricity',
    title: 'Why Metals Conduct Electricity and Heat So Well',
    category: 'Chemistry',
    keywords: [
      'why do metals conduct electricity', 'metallic bonding explained', 'why are metals good conductors',
      'electron sea model', 'why do metals feel cold',
    ],
    content: `Metals conduct electricity and heat exceptionally well because of a distinctive type of chemical bonding called metallic bonding, structurally different from the bonds in most other materials. In a metal, atoms don't hold onto their outermost (valence) electrons tightly or share them exclusively with one specific neighboring atom the way covalent bonds do — instead, those outer electrons become "delocalized," essentially forming a shared, mobile "sea" of electrons that flows freely around a fixed lattice of positively charged metal atom cores. This free-flowing electron sea is the key to both of metals' signature properties: applying an electric field (like connecting a wire to a battery) causes these already-mobile electrons to drift in a consistent direction, which is literally what electric current is, and this happens far more readily in metals than in materials where electrons are locked into fixed bonds between specific atoms. The same mobile electrons also explain metals' excellent thermal conductivity — heat energy causes electrons to move and collide more energetically, and because they're already free to move throughout the material, they rapidly spread that thermal energy through the whole structure much faster than materials relying on slower molecular vibration alone to transfer heat. This is also the actual physics behind why a metal doorknob feels colder to the touch than a wooden one in the same room at the same actual temperature — it's not that the metal is genuinely colder, it's that its excellent thermal conductivity rapidly pulls heat away from your warmer hand, which your skin's nerve endings register as "cold," while wood (a poor conductor by comparison) transfers heat away from your hand far more slowly and so feels comparatively warmer despite being the exact same ambient temperature. Metallic bonding's electron mobility also explains metals' characteristic malleability and ductility (the ability to be hammered into sheets or drawn into wires without shattering) — since the electron sea isn't tied to specific fixed bonds between particular atoms, the metal atom lattice can shift and slide into new arrangements under stress without breaking the underlying bonding structure, unlike the rigid, direction-specific bonds in a brittle material like glass or ceramic.`,
    createdAt: Date.now(),
  },
];
