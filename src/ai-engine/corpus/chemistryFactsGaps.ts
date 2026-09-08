import { KnowledgeItem } from '../../types';

// Batch 19 (deeper chemistry) gap-fills. Live misses on nexus-4b — retrieval
// kept bleeding into a battery / car-engine domain entry:
// "what is oxidation" -> "that's the reduction part" (swapped definitions);
// "atom vs molecule" -> "six carbon and ten oxygen atoms forming CO2";
// "what is a polymer" -> "a long chain of carbon molecules... alkanes/alkenes";
// "what is a solution" -> drifted into stomach-acid pH; "what is combustion" ->
// spark plugs and the Otto cycle only; "what is a salt" -> "a mixture of ions,
// not a single compound"; "activation energy" -> a productivity metaphor about
// writing an essay.
export const CHEMISTRY_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-oxidation',
    title: 'What Oxidation Is',
    category: 'Chemistry',
    keywords: [
      'what is oxidation', 'what does oxidation mean', 'oxidation vs reduction', 'what is being oxidized',
      'oil rig chemistry', 'what is an oxidizing agent', 'is rust oxidation',
    ],
    content: `Oxidation is the LOSS of electrons by an atom, ion or molecule (a handy mnemonic: "OIL RIG" — Oxidation Is Loss, Reduction Is Gain). It is always paired with reduction, the gain of electrons by something else — together they make a redox reaction, because the electrons lost by one species are gained by another. The name comes from reactions with oxygen (oxygen is very good at pulling electrons away), so iron rusting, wood burning, and a cut apple browning are all oxidation, but the modern definition is purely about electron transfer and doesn't require oxygen at all. The substance that gets oxidized is the "reducing agent" (it donates electrons); the substance that does the oxidizing and gets reduced itself is the "oxidizing agent." In terms of oxidation numbers, oxidation is an increase in oxidation state.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-atom-vs-molecule',
    title: 'Atom vs Molecule',
    category: 'Chemistry',
    keywords: [
      'what is the difference between an atom and a molecule', 'atom vs molecule', 'what is an atom', 'what is a molecule',
      'is water an atom or a molecule', 'how many atoms in a molecule', 'what is a diatomic molecule',
    ],
    content: `An atom is the smallest unit of a chemical element that still counts as that element — a nucleus of protons and neutrons with electrons around it. A molecule is two or more atoms held together by covalent bonds, acting as one unit. The atoms in a molecule can be the same element (oxygen gas is O2, two oxygen atoms; other diatomic elements are H2, N2, F2, Cl2, Br2, I2) or different elements (water is H2O — two hydrogen atoms and ONE oxygen atom; carbon dioxide is CO2 — ONE carbon atom and TWO oxygen atoms; methane is CH4). So every molecule is made of atoms, but not every substance is molecular — metals and ionic compounds like table salt are giant lattices of atoms or ions, not discrete molecules.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-polymer',
    title: 'What a Polymer Is',
    category: 'Chemistry',
    keywords: [
      'what is a polymer', 'what does polymer mean', 'what is a monomer', 'polymer vs monomer', 'examples of polymers',
      'is plastic a polymer', 'is dna a polymer', 'what is polymerization',
    ],
    content: `A polymer is a very large molecule built by chemically linking many small repeating units, called monomers, into a long chain (or a branched or cross-linked network). "Poly" = many, "mer" = part. The monomers don't have to be carbon or hydrocarbons: synthetic polymers include polyethylene and polypropylene (from alkene monomers), PVC, nylon, polyester, Teflon and silicones (silicon–oxygen backbone); natural polymers include cellulose and starch (chains of glucose), proteins (chains of amino acids), DNA and RNA (chains of nucleotides), and natural rubber. The process of joining monomers is polymerization. Polymers get their useful properties — flexibility, strength, elasticity — from the length and arrangement of those chains and how much they tangle or bond to each other.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-solution-chemistry',
    title: 'What a Solution Is (Chemistry)',
    category: 'Chemistry',
    keywords: [
      'what is a solution in chemistry', 'what is a solution chemistry', 'solute and solvent', 'what is a solvent',
      'what is a solute', 'what is a homogeneous mixture', 'what does dissolved mean', 'what is concentration',
    ],
    content: `A solution is a homogeneous mixture — one substance evenly dispersed in another at the molecular or ionic level, so it looks uniform throughout and doesn't settle out. The substance present in the larger amount is the solvent; the substance being dissolved is the solute. Salt water is a solution (solute: salt, solvent: water); so are sugar in tea, carbon dioxide in soda, air (a solution of gases), and metal alloys like brass (solid solutions). Water is called the "universal solvent" because it dissolves so many things. The amount of solute per amount of solution is the concentration; the maximum that will dissolve at a given temperature is the solubility, and a solution holding that maximum is "saturated." A solution is not the same as a suspension (particles big enough to settle, like muddy water) or a colloid (like milk or fog).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-combustion',
    title: 'What Combustion Is',
    category: 'Chemistry',
    keywords: [
      'what is combustion', 'what does combustion mean', 'combustion reaction', 'what is burning', 'the fire triangle',
      'what are the products of combustion', 'complete vs incomplete combustion',
    ],
    content: `Combustion is a rapid chemical reaction between a fuel and an oxidiser (usually oxygen from the air) that releases energy as heat and usually light — in other words, burning. It needs three things at once (the "fire triangle"): fuel, oxygen, and enough heat to reach the ignition temperature; remove any one and it stops. Complete combustion of a hydrocarbon fuel (like methane, propane, gasoline, or wood) produces mainly carbon dioxide and water vapour: e.g. CH4 + 2O2 → CO2 + 2H2O + energy. If there isn't enough oxygen, incomplete combustion occurs, producing toxic carbon monoxide (CO) and soot (unburned carbon) as well. Combustion is strongly exothermic and is a type of redox reaction (the fuel is oxidised, the oxygen is reduced). Engines harness it, but the reaction itself is just fuel + oxygen → oxides + heat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-salt-chemistry',
    title: 'What a Salt Is (Chemistry)',
    category: 'Chemistry',
    keywords: [
      'what is a salt in chemistry', 'what is a salt chemistry', 'what is an ionic compound', 'how are salts formed',
      'is table salt a salt', 'acid base neutralization salt', 'examples of salts in chemistry',
    ],
    content: `In chemistry a salt is an ionic compound — a solid made of positive ions (cations) and negative ions (anions) held together in a regular crystal lattice by electrostatic attraction. It is a definite compound with a fixed formula, not a "mixture." Salts most often form when an acid and a base neutralise each other: the acid's anion pairs with the base's cation, and water is the other product (HCl + NaOH → NaCl + H2O; here NaCl, table salt, is the salt). They also form from a metal reacting with a non-metal or an acid. Familiar salts besides sodium chloride include calcium carbonate (chalk, limestone), sodium bicarbonate (baking soda), potassium chloride, copper sulfate, and ammonium nitrate. Many salts dissolve in water, splitting into their free ions, which is why salt solutions conduct electricity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-activation-energy',
    title: 'What Activation Energy Is',
    category: 'Chemistry',
    keywords: [
      'what is activation energy', 'what does activation energy mean', 'activation energy definition',
      'why do reactions need activation energy', 'how do catalysts lower activation energy', 'reaction energy barrier',
    ],
    content: `Activation energy is the minimum amount of energy that colliding reactant particles must have for a chemical reaction to actually happen. Even a reaction that releases energy overall (exothermic) usually has this initial "hill" to climb: existing bonds have to be stretched or broken before new ones form, and that costs energy. If particles collide with less than the activation energy, they just bounce apart unchanged. This is why many reactions need a spark, a flame, or heating to get started, and why food doesn't spontaneously combust at room temperature even though burning it releases energy. Raising the temperature helps because more particles have enough energy. A catalyst speeds a reaction up by providing an alternative pathway with a LOWER activation energy, so a larger fraction of collisions succeed — without the catalyst itself being used up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-catalyst',
    title: 'What a Catalyst Is',
    category: 'Chemistry',
    keywords: [
      'what is a catalyst', 'what does a catalyst do', 'how do catalysts work', 'what is an enzyme',
      'what is a catalytic converter', 'is a catalyst used up', 'examples of catalysts',
    ],
    content: `A catalyst is a substance that speeds up a chemical reaction by lowering its activation energy — providing an easier route from reactants to products — without being consumed in the process, so a tiny amount can be used over and over. It doesn't change how much product you can ultimately get or the reaction's overall energy balance, just how fast equilibrium is reached. Examples: enzymes are biological catalysts (protein molecules) that run virtually every reaction in living cells; the platinum, palladium and rhodium in a car's catalytic converter turn exhaust pollutants into less harmful gases; iron catalyses the Haber process that makes ammonia for fertiliser; and manganese dioxide speeds the breakdown of hydrogen peroxide. An inhibitor (or "negative catalyst") does the opposite and slows a reaction down.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-electronegativity',
    title: 'What Electronegativity Is',
    category: 'Chemistry',
    keywords: [
      'what is electronegativity', 'what does electronegativity mean', 'electronegativity definition',
      'most electronegative element', 'electronegativity trend periodic table', 'how does electronegativity affect bonding',
      'pauling scale',
    ],
    content: `Electronegativity is a measure of how strongly an atom pulls on the shared electrons in a chemical bond. It is usually given on the Pauling scale, from about 0.7 (caesium, francium) to 3.98 (fluorine, the most electronegative element); oxygen, nitrogen and chlorine are also high. On the periodic table it increases going up a group and left-to-right across a period (toward fluorine), because the nucleus pulls harder when it has more protons and the outer electrons are closer in. Electronegativity difference between two bonded atoms tells you the bond type: near zero → non-polar covalent (electrons shared evenly, as in H2 or C–H); moderate → polar covalent (electrons pulled toward the more electronegative atom, as in O–H, giving water its polarity); large (roughly 1.7+) → ionic (electrons transferred, as in NaCl).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-electron-shell',
    title: 'What an Electron Shell Is',
    category: 'Chemistry',
    keywords: [
      'what is an electron shell', 'what are electron shells', 'electron energy levels', 'how many electrons per shell',
      'what is the valence shell', 'electron configuration basics', 'why do atoms want a full outer shell',
    ],
    content: `Electrons around an atom occupy distinct energy levels called shells (labelled by the principal quantum number n = 1, 2, 3, …), and within each shell there are subshells (s, p, d, f) made of orbitals. A shell farther from the nucleus is higher in energy. The maximum number of electrons a shell can hold is 2n²: 2 in the first shell, 8 in the second, 18 in the third, 32 in the fourth. Electrons fill from the lowest energy upward. The outermost occupied shell is the valence shell, and the electrons in it (valence electrons) are the ones that take part in bonding. Atoms are especially stable when their valence shell is full (like the noble gases), which is why they gain, lose or share electrons to reach that configuration — the "octet rule" for the common elements.`,
    createdAt: Date.now(),
  },
];
