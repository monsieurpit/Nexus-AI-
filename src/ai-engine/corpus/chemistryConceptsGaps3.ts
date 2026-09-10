import { KnowledgeItem } from '../../types';

/**
 * CHEMISTRY_CONCEPTS_GAPS_3 — batch 226 corrections.
 * Errors: "saturated vs unsaturated solution" answered REVERSED, "evaporation
 * vs boiling" said evaporation has bubbles, "orbital vs shell" answered about
 * orbits (Kuiper belt), "concentration vs dilution" answered concentration vs
 * molarity, "element symbol vs ion symbol" said ion symbols "aren't a thing",
 * plus web dumps for exothermic/endothermic and electronegativity/ionization
 * energy and a muddled solution/mixture answer.
 */
export const CHEMISTRY_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  {
    id: 'kb-gap-chem3-saturated-vs-unsaturated-solution',
    title: 'Saturated vs unsaturated (vs supersaturated) solution',
    category: 'science',
    keywords: [
      'difference between a saturated and unsaturated solution', 'saturated vs unsaturated solution',
      'holds the maximum solute', 'can dissolve more solute', 'undissolved solid at the bottom',
      'solubility at that temperature', 'supersaturated', 'not reversed',
    ],
    content: `A SATURATED solution contains the MAXIMUM amount of solute that will dissolve in that solvent at that temperature. If you add any more solute, it will NOT dissolve — it sits undissolved at the bottom, in equilibrium with the dissolved solute. The solution is "full".

An UNSATURATED solution contains LESS solute than it could hold, so there is still room: add more solute and it will dissolve.

(Be careful not to state this backwards: unsaturated = can take more; saturated = cannot take more.)

A SUPERSATURATED solution is a special unstable case: it temporarily holds MORE solute than the normal maximum, usually made by dissolving a lot at a high temperature then cooling gently without disturbance. A tiny seed crystal or a knock will make the excess crash out suddenly (this is how "hot ice" / sodium acetate hand warmers and rock-candy work).

Solubility (and therefore what counts as saturated) depends on temperature — usually more solid dissolves when hot, less when cold; for gases it is the opposite.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-evaporation-vs-boiling',
    title: 'Evaporation vs boiling',
    category: 'science',
    keywords: [
      'difference between evaporation and boiling', 'evaporation vs boiling', 'surface only versus throughout the liquid',
      'any temperature versus at the boiling point', 'no bubbles in evaporation', 'vapour pressure equals atmospheric',
      'slow versus rapid', 'cooling effect',
    ],
    content: `Both turn a liquid into a gas (vaporisation), but they happen differently.

Evaporation occurs only at the SURFACE of the liquid, where the fastest-moving molecules escape. It happens at ANY temperature (a puddle dries, sweat evaporates, wet washing dries in the cold), it is slow, it produces NO bubbles, and it cools the remaining liquid (the fastest molecules leave, lowering the average energy). Its rate goes up with temperature, surface area, air movement, and low humidity.

Boiling occurs THROUGHOUT the whole liquid, not just the surface. It only happens at the BOILING POINT — the temperature at which the liquid's vapour pressure equals the surrounding atmospheric pressure — so bubbles of vapour can form INSIDE the liquid and rise. It is rapid and needs a continuous supply of heat, and the liquid's temperature stays constant at the boiling point while it boils. Lowering the pressure lowers the boiling point (water boils below 100 C at altitude, or at room temperature under strong vacuum).

Short version: evaporation = surface, any temperature, no bubbles, slow; boiling = whole liquid, at the boiling point, bubbles, fast.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-orbital-vs-shell',
    title: 'Orbital vs shell (atomic structure, not orbits)',
    category: 'science',
    keywords: [
      'difference between an orbital and a shell', 'orbital vs shell atom', 'energy level',
      'region where an electron is likely to be found', 's p d f orbitals', 'principal quantum number',
      'subshell', 'not a planetary orbit or the Kuiper belt', 'two electrons per orbital',
    ],
    content: `This is about the electron structure of an atom, not planetary orbits.

A shell (also called a principal energy level, labelled by the principal quantum number n = 1, 2, 3...) is a broad grouping of electrons at roughly the same energy and average distance from the nucleus. Shell 1 holds up to 2 electrons, shell 2 up to 8, shell 3 up to 18, and so on (2n squared). The old "Bohr model" rings are shells.

Each shell is divided into subshells (s, p, d, f), and each subshell is made of orbitals. An orbital is a specific three-dimensional region of space where there is a high probability (about 90%) of finding a particular electron. Each orbital holds a maximum of 2 electrons (with opposite spin). An s subshell has 1 orbital (2 electrons), a p subshell has 3 orbitals (6 electrons), a d subshell has 5 (10 electrons), an f subshell has 7 (14 electrons).

So the nesting is: shell (energy level) > subshell (s/p/d/f) > orbital (a shape holding up to 2 electrons). An orbital is NOT a path the electron travels; it is a probability cloud.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-concentration-vs-dilution',
    title: 'Concentration vs dilution',
    category: 'science',
    keywords: [
      'difference between concentration and dilution', 'concentration vs dilution', 'amount of solute per volume',
      'the act of adding solvent to lower concentration', 'concentrated versus dilute', 'C1V1 equals C2V2',
      'making a solution weaker', 'moles of solute stay the same',
    ],
    content: `Concentration is a QUANTITY: how much solute is present per amount of solution or solvent (grams per litre, moles per litre / molarity, percent, ppm). "Concentrated" means a high concentration; "dilute" means a low one.

Dilution is a PROCESS: adding more solvent (usually water) to a solution to LOWER its concentration. The amount (moles) of solute does not change during a dilution — you are just spreading the same solute through a larger volume, so the concentration drops. The standard calculation is C1V1 = C2V2 (initial concentration times initial volume equals final concentration times final volume).

So concentration is "how strong the solution is" (a number); dilution is "making it weaker by adding solvent" (an action). The opposite process — removing solvent (by evaporation) to raise the concentration — is "concentrating" the solution.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-element-symbol-vs-ion-symbol',
    title: 'Element symbol vs ion symbol',
    category: 'science',
    keywords: [
      'difference between an element symbol and an ion symbol', 'element symbol vs ion symbol',
      'one or two letters', 'charge written as a superscript', 'Na versus Na plus', 'Cl versus Cl minus',
      'polyatomic ion charge', 'ion symbols do exist',
    ],
    content: `An element (or atom) symbol is the one- or two-letter abbreviation for a chemical element from the periodic table: H, He, Na, Cl, Fe, Au. The first letter is always capitalised, the second (if any) is lowercase. On its own it represents a neutral atom.

An ion symbol is that same element (or a group of atoms) WITH ITS ELECTRIC CHARGE written as a superscript to the upper right. Ions absolutely do have symbols:
- A sodium atom that has lost one electron: Na+ (or Na with a plus superscript).
- A chloride ion (chlorine plus one electron): Cl-.
- A calcium ion (lost two electrons): Ca2+.
- An oxide ion: O2-.
- Polyatomic ions carry a single overall charge for the whole group: sulfate SO4 2-, ammonium NH4+, hydroxide OH-, nitrate NO3-, carbonate CO3 2-.

So the only difference is the charge superscript: no superscript = neutral atom/element; a "+" or "-" (with a number if the charge is more than 1) = an ion. The number of protons (and therefore which element it is) is unchanged; only the electron count differs.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-electronegativity-vs-ionization-energy',
    title: 'Electronegativity vs ionization energy',
    category: 'science',
    keywords: [
      'difference between electronegativity and ionization energy', 'electronegativity vs ionization energy',
      'attracting shared electrons in a bond', 'energy to remove an electron completely', 'Pauling scale',
      'kJ per mol', 'periodic trends', 'both increase across a period',
    ],
    content: `Both measure how strongly an atom holds onto electrons, and both increase across a period (left to right) and decrease down a group — but they describe different situations.

Electronegativity is the tendency of an atom, WHEN IT IS BONDED to another atom, to attract the SHARED (bonding) pair of electrons toward itself. It is a relative, unitless number (the Pauling scale runs roughly 0.7 for caesium to 4.0 for fluorine, the most electronegative element). The DIFFERENCE in electronegativity between two bonded atoms tells you whether a bond is nonpolar covalent, polar covalent, or ionic.

Ionization energy is the actual ENERGY (in kJ/mol) needed to REMOVE the most loosely held electron COMPLETELY from a neutral atom in the gas phase, forming a positive ion. The "first ionization energy" removes one electron; the "second" removes a second (always larger). It is a directly measured physical quantity for an isolated atom, not about bonding.

Short version: electronegativity = pull on shared electrons within a bond (relative scale); ionization energy = energy to strip an electron right off a lone atom (measured in kJ/mol). They correlate but are not the same thing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-exothermic-vs-endothermic-process',
    title: 'Exothermic vs endothermic process',
    category: 'science',
    keywords: [
      'difference between an exothermic and endothermic process', 'exothermic vs endothermic',
      'releases heat to the surroundings', 'absorbs heat from the surroundings', 'gets hotter', 'gets colder',
      'negative delta H', 'positive delta H', 'hand warmer versus cold pack',
    ],
    content: `An EXOTHERMIC process RELEASES energy (usually as heat) to its surroundings, so the surroundings get warmer. The products end up with less stored chemical energy than the reactants, so the enthalpy change (delta H) is negative. Examples: combustion (burning fuel), respiration, neutralising an acid with a base, most explosions, water freezing, and a sodium-acetate or iron-oxidation hand warmer.

An ENDOTHERMIC process ABSORBS energy from its surroundings, so the surroundings get colder. The products store more chemical energy than the reactants, so delta H is positive, and it usually needs a continuous energy supply to keep going. Examples: photosynthesis, thermal decomposition (heating limestone to make quicklime), water evaporating or ice melting, dissolving ammonium nitrate (the basis of an instant COLD PACK), and cooking an egg.

Quick test: does the beaker (or the pack) get hot to the touch (exothermic) or cold (endothermic)? A useful mnemonic: EXothermic EXits heat; ENDothermic takes heat IN.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-solution-vs-mixture',
    title: 'Solution vs mixture',
    category: 'science',
    keywords: [
      'difference between a solution and a mixture', 'solution vs mixture', 'a solution is a type of mixture',
      'homogeneous versus heterogeneous', 'dissolved at the molecular level', 'components not chemically bonded',
      'colloid suspension', 'separable by physical means',
    ],
    content: `A mixture is any combination of two or more substances that are physically together but NOT chemically bonded — each keeps its own properties, the proportions can vary, and they can be separated by physical means (filtering, evaporation, distillation, a magnet). Mixtures split into homogeneous (uniform throughout) and heterogeneous (you can see or detect different parts).

A solution is a specific KIND of mixture: a HOMOGENEOUS mixture in which one substance (the solute) is dissolved in another (the solvent) so completely that the particles are separated to the level of individual molecules or ions and spread evenly. The result is uniform, transparent (though it can be coloured), does not settle out, and does not scatter a beam of light. Salt water, air, brass and sugar dissolved in tea are solutions.

So "solution" is a subset of "mixture", not its opposite. Other mixture types by particle size: a suspension (large particles that settle and can be filtered, like muddy water) and a colloid (in-between particles that do not settle but do scatter light, like milk or fog).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chem3-atom-vs-element',
    title: 'Atom vs element',
    category: 'science',
    keywords: [
      'difference between an atom and an element', 'atom vs element', 'smallest unit of matter',
      'a type of substance defined by proton number', 'a single particle versus a category', 'gold atom versus the element gold',
      'not atoms clumped together',
    ],
    content: `An atom is a single, physical PARTICLE — the smallest unit of ordinary matter, made of a nucleus of protons and neutrons surrounded by electrons. You can point to "an atom of carbon".

An element is a TYPE / CATEGORY of substance, defined by its number of protons (its atomic number): every atom with 6 protons is a carbon atom, and "carbon" is the element. An element is not "atoms clumped together" — a lump of pure carbon is a sample OF the element carbon, made of many carbon atoms, but the element is the classification, not the clump. There are about 118 known elements, each a distinct kind of atom.

The relationship: an element is made up of only ONE kind of atom. A carbon atom is a particle; carbon the element is the whole class of matter that consists of carbon atoms. Similarly a "gold atom" is one particle; "the element gold" is the substance and the periodic-table entry (Au, atomic number 79).`,
    createdAt: Date.now(),
  },
];
