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
];
