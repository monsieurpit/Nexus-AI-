import { KnowledgeItem } from '../../types';

/**
 * CHEMISTRY_CONCEPTS_GAPS_4 — batch 242 corrections.
 * nexus-4b handled most chemistry contrasts well. Misses:
 * - "ion vs isotope": called Na+ "an isotope of sodium".
 * - "cation vs anion": gave Mg2+ as an example of an anion.
 * - "mole vs molecule": said a mole is "sixty billion".
 * - "atomic mass vs mass number": said carbon-12 is "12 grams", conflated the
 *   two, and treated "atomic mass" and "mass number" as synonyms.
 * - "organic vs inorganic chemistry": claimed "inorganic reactions are fast".
 * - "endotherm vs exotherm in chemistry": answered about warm-blooded animals.
 * - "melting vs dissolving", "metal vs nonmetal", "heat vs temperature",
 *   "hydrocarbon vs carbohydrate" were cut off before the second half.
 * - "chromatography vs distillation" said chromatography "uses GC-MS".
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'chemistry', keywords, content, createdAt: now,
});

export const CHEMISTRY_CONCEPTS_GAPS_4: KnowledgeItem[] = [
  k(
    'kb-gap-chem4-ion-vs-isotope',
    'Ion vs isotope',
    [
      'difference between an ion and an isotope', 'an isotope is an atom of an element with a different number of neutrons same protons', 'an ion is an atom or molecule with a net electric charge from losing or gaining electrons',
      'Na+ is an ion not an isotope carbon-14 is an isotope', 'neutrons change mass electrons change charge', 'the two are independent',
    ],
    `They describe two different ways an atom can differ from the "standard" version, and they are independent.

An ISOTOPE differs in the number of NEUTRONS. All atoms of an element have the same number of protons (that is what makes them that element), but the neutron count can vary, which changes the MASS. Carbon-12, carbon-13, and carbon-14 are isotopes of carbon — 6 protons each, but 6, 7, and 8 neutrons. Isotopes of an element are chemically almost identical; some are radioactive.

An ION differs in the number of ELECTRONS, giving it a net electric CHARGE. An atom that loses electrons becomes a positive ion (Na → Na+); one that gains electrons becomes a negative ion (Cl → Cl−). Molecules can be ions too (SO4^2−, NH4+).

So Na+ is an ION of sodium (charged), NOT an isotope. Na-23 and Na-22 are isotopes of sodium. A single atom can be both at once — for example a carbon-14 atom that has also lost or gained electrons — because neutrons and electrons are separate.`,
  ),
  k(
    'kb-gap-chem4-cation-vs-anion',
    'Cation vs anion',
    [
      'difference between a cation and an anion', 'a cation is a positively charged ion formed when an atom loses electrons', 'an anion is a negatively charged ion formed when an atom gains electrons',
      'Na+ Mg2+ Al3+ Ca2+ are cations Cl- O2- OH- SO4^2- are anions', 'metals tend to form cations nonmetals tend to form anions', 'cations move toward the cathode',
    ],
    `A CATION is a POSITIVELY charged ion. It forms when a neutral atom LOSES one or more electrons, leaving more protons than electrons. Metals typically form cations: Na+, K+, Mg2+, Ca2+, Al3+, Fe2+/Fe3+, and the polyatomic NH4+ (ammonium). The name comes from the fact that in electrolysis cations migrate to the cathode (the negative electrode).

An ANION is a NEGATIVELY charged ion. It forms when a neutral atom or group GAINS one or more electrons, leaving more electrons than protons. Nonmetals typically form anions: Cl−, Br−, O2−, S2−, N3−, and polyatomic ions like OH− (hydroxide), NO3− (nitrate), SO4^2− (sulfate), CO3^2− (carbonate). Anions migrate to the anode.

So magnesium becoming Mg2+ is a CATION (it lost two electrons), not an anion. A memory aid: "anion" contains an "n" as in "negative"; a "cation" has a "t" that looks like a "+" — or "cats are pawsitive".`,
  ),
  k(
    'kb-gap-chem4-mole-vs-molecule',
    'Mole vs molecule',
    [
      'difference between a mole and a molecule', 'a molecule is a group of two or more atoms bonded together one particle', 'a mole is a counting unit equal to 6.022 times 10 to the 23 particles Avogadro number',
      'a mole of water contains 6.022e23 water molecules and weighs 18 grams', 'mole is to molecule as dozen is to egg', 'not sixty billion',
    ],
    `A MOLECULE is a single particle — two or more atoms held together by chemical bonds. O2 is a molecule (2 atoms), H2O is a molecule (3 atoms), a protein is one very large molecule.

A MOLE is a COUNTING UNIT, like "dozen" but enormous: one mole = 6.022 x 10^23 particles (Avogadro's number — that is 602 sextillion, roughly, NOT "sixty billion"). Chemists use it because atoms and molecules are far too small and numerous to count individually, and one mole of a substance conveniently weighs its molar mass in grams. One mole of water = 6.022 x 10^23 water molecules and weighs about 18 g.

So the relationship is: a molecule is one thing; a mole is 602,000,000,000,000,000,000,000 of them. "A mole of oxygen molecules" means that many O2 units.`,
  ),
  k(
    'kb-gap-chem4-atomic-mass-vs-mass-number',
    'Atomic mass vs mass number vs atomic number',
    [
      'difference between atomic mass and mass number', 'atomic number Z is the number of protons and defines the element', 'mass number A is the whole-number count of protons plus neutrons in one specific nucleus',
      'atomic mass is the actual measured mass of an atom in atomic mass units or the weighted average atomic weight of an element across its natural isotopes', 'carbon-12 has mass number 12 and atomic mass 12 u not 12 grams', 'chlorine atomic weight 35.45',
    ],
    `Three related numbers for an atom or element:

ATOMIC NUMBER (Z) = the number of PROTONS in the nucleus. It defines which element the atom is (Z = 1 is hydrogen, Z = 6 is carbon, Z = 92 is uranium). Always a whole number.

MASS NUMBER (A) = the whole-number count of PROTONS + NEUTRONS in one particular nucleus. Carbon-12 has A = 12 (6 protons + 6 neutrons); carbon-14 has A = 14. It labels a specific isotope. Always a whole number.

ATOMIC MASS = the ACTUAL mass of an atom, measured in atomic mass units (u or Da), where 1 u is defined as 1/12 the mass of a carbon-12 atom. It is very close to the mass number but not exactly equal (nuclear binding energy and the tiny electron mass shift it). A carbon-12 atom's atomic mass is exactly 12 u — NOT 12 grams (12 grams is one MOLE of carbon-12).

"Atomic mass" is also often used to mean the ATOMIC WEIGHT of an element — the weighted average of its natural isotopes' masses. That is why the periodic table lists chlorine as 35.45 (a mix of Cl-35 and Cl-37) rather than a whole number.`,
  ),
  k(
    'kb-gap-chem4-organic-vs-inorganic-chemistry',
    'Organic vs inorganic chemistry',
    [
      'difference between organic and inorganic chemistry', 'organic chemistry is the study of carbon-based compounds hydrocarbons and their derivatives with carbon skeletons and C-H bonds', 'inorganic chemistry is everything else metals minerals salts acids coordination compounds',
      'a few simple carbon compounds CO CO2 carbonates cyanides are treated as inorganic', 'not a rule that inorganic reactions are fast', 'Wohler urea 1828',
    ],
    `The split is by what the compounds are made of, not by how fast they react.

ORGANIC CHEMISTRY is the chemistry of CARBON-based compounds — specifically molecules built on carbon skeletons, usually with carbon-hydrogen bonds: hydrocarbons (methane, octane), alcohols, acids, sugars, proteins, DNA, plastics, drugs, fuels. Carbon's ability to form four stable bonds and long chains and rings gives millions of these compounds. The name is historical: they were once thought to come only from living things, until Wohler made urea from an inorganic salt in 1828.

INORGANIC CHEMISTRY is essentially EVERYTHING ELSE — the elements and their compounds that are not carbon-skeleton molecules: metals and alloys, minerals and rocks, salts (NaCl), mineral acids (H2SO4), water, ammonia, transition-metal complexes, semiconductors, ceramics. By convention a handful of simple carbon species are also treated as inorganic: carbon monoxide, carbon dioxide, carbonates, bicarbonates, cyanides, and elemental carbon (diamond, graphite).

Reaction speed is not a defining feature — plenty of inorganic reactions are slow (rusting) and plenty of organic ones are fast (combustion, acid-base).`,
  ),
  k(
    'kb-gap-chem4-endothermic-vs-exothermic',
    'Endothermic vs exothermic (chemical reactions)',
    [
      'difference between an endothermic and an exothermic reaction chemistry', 'exothermic releases heat to the surroundings delta H negative surroundings warm up combustion neutralisation hand warmers', 'endothermic absorbs heat from the surroundings delta H positive surroundings cool down photosynthesis instant cold packs thermal decomposition',
      'not about warm-blooded animals', 'bond breaking absorbs energy bond making releases energy',
    ],
    `In chemistry this is about the heat FLOW of a reaction (not warm- vs cold-blooded animals — that is the biology sense of "endotherm/ectotherm").

An EXOTHERMIC reaction RELEASES energy to its surroundings, usually as heat, so the surroundings get WARMER. The products have less stored chemical energy than the reactants, so the enthalpy change (delta H) is NEGATIVE. Examples: burning fuel, respiration, neutralising an acid with an alkali, most explosions, and a hand warmer (the oxidation of iron powder).

An ENDOTHERMIC reaction ABSORBS energy from its surroundings, so the surroundings get COLDER. The products have more stored chemical energy than the reactants, and delta H is POSITIVE. Examples: photosynthesis, thermal decomposition (heating limestone to make lime), dissolving ammonium nitrate in water, and an instant cold pack.

Why: breaking bonds always costs energy (absorbs it); making bonds always releases energy. If a reaction makes stronger bonds than it breaks, the net result is energy released (exothermic); if it breaks more than it makes, energy is taken in (endothermic).`,
  ),
  k(
    'kb-gap-chem4-melting-vs-dissolving',
    'Melting vs dissolving',
    [
      'difference between melting and dissolving', 'melting is a phase change of one pure substance from solid to liquid caused by heat at its melting point', 'dissolving is a mixing process a solute disperses among a solvent to form a solution',
      'melting needs heat dissolving can happen at any temperature and often needs a suitable solvent', 'melted ice is still water dissolved salt is salt water', 'both are physical changes and reversible',
    ],
    `Both are physical changes (no new substance forms) and both can be reversed, but they are different processes.

MELTING is a PHASE CHANGE of a single pure substance: adding heat gives its particles enough energy to break out of the rigid solid lattice, so the solid turns to LIQUID. It happens at a definite temperature (the melting point) characteristic of that substance — ice melts at 0 C, iron at 1538 C. Melted ice is still pure water; nothing else is involved. Reverse it by cooling (freezing).

DISSOLVING is a MIXING process involving TWO substances: the particles of a SOLUTE (e.g. salt, sugar) separate and spread out evenly among the particles of a SOLVENT (e.g. water), held there by attractions between them, forming a SOLUTION. It does not require heat — sugar dissolves in cold water — though warming usually speeds it up, and it needs a solvent the solute is compatible with (salt dissolves in water, not in oil). Dissolved salt is still salt, now mixed into salt water. Reverse it by evaporating the solvent (the solute is left behind).

Quick check: melting turns a solid into its own liquid using heat; dissolving spreads one substance through another to make a mixture.`,
  ),
  k(
    'kb-gap-chem4-metal-vs-nonmetal',
    'Metal vs nonmetal',
    [
      'difference between a metal and a nonmetal', 'metals are shiny malleable ductile good conductors of heat and electricity mostly solid high melting points form positive ions basic oxides left and centre of the periodic table', 'nonmetals are dull brittle if solid poor conductors insulators lower melting points many are gases form negative ions acidic oxides upper right of the table',
      'metalloids like silicon boron are in between', 'hydrogen is a nonmetal', 'the staircase line on the periodic table',
    ],
    `METALS (most of the periodic table — the left and centre) are typically: shiny when polished; good conductors of heat and electricity; malleable (hammer into sheets) and ductile (draw into wire); solid at room temperature (except mercury) with generally high melting and boiling points and high density; they tend to LOSE electrons to form positive ions (cations); and their oxides are basic. Examples: iron, copper, aluminium, gold, sodium.

NONMETALS (upper right of the table, plus hydrogen) are typically: dull in appearance; poor conductors of heat and electricity (insulators — graphite is the odd exception); if solid, brittle rather than malleable; often gases or low-melting solids (bromine is a liquid) with low density; they tend to GAIN electrons to form negative ions (anions) or share electrons in covalent bonds; and their oxides are acidic. Examples: oxygen, nitrogen, sulfur, chlorine, carbon.

Between the two, along the "staircase" line, sit the METALLOIDS (silicon, boron, germanium, arsenic) with mixed properties — semiconductors are the classic use.`,
  ),
  k(
    'kb-gap-chem4-heat-vs-temperature',
    'Heat vs temperature',
    [
      'difference between heat and temperature', 'temperature measures the average kinetic energy of the particles how hot something is an intensive property in celsius or kelvin', 'heat is the total thermal energy transferred between objects because of a temperature difference an extensive property in joules',
      'a bathtub of warm water holds more heat energy than a spark at 1000 degrees', 'heat flows from hot to cold', 'specific heat capacity',
    ],
    `TEMPERATURE is a measure of how HOT something is — technically, the average KINETIC ENERGY of its particles' random motion. It does not depend on how much of the substance there is (an "intensive" property): a cup and a bucket of boiling water are both at 100 C. Measured in C, F, or K.

HEAT is a quantity of ENERGY — specifically thermal energy that is TRANSFERRED from one body to another because they are at different temperatures. It flows spontaneously from the hotter object to the cooler one until they reach the same temperature (thermal equilibrium). It depends on the amount of material (an "extensive" property). Measured in joules (or calories).

The classic illustration: a single spark from a firework is at maybe 1000 C but carries almost no heat energy — it can land on your skin harmlessly — whereas a bathtub of water at 40 C contains far more total heat energy, enough to badly scald you. How much a given amount of heat raises an object's temperature depends on its mass and its "specific heat capacity" (water's is unusually high, which is why it heats and cools slowly).`,
  ),
  k(
    'kb-gap-chem4-hydrocarbon-vs-carbohydrate',
    'Hydrocarbon vs carbohydrate',
    [
      'difference between a hydrocarbon and a carbohydrate', 'a hydrocarbon contains only carbon and hydrogen fuels like methane petrol diesel', 'a carbohydrate contains carbon hydrogen and oxygen roughly in the ratio CH2O sugars starch cellulose',
      'hydrocarbons are hydrophobic and burn releasing lots of energy', 'carbohydrates are often water-soluble and are the bodys main quick energy source', 'the key extra element is oxygen',
    ],
    `The names look similar but the key difference is one extra element: OXYGEN.

A HYDROCARBON contains ONLY carbon and hydrogen — nothing else. Methane (CH4), propane, octane (in petrol), the compounds in diesel, natural gas, crude oil, and candle wax are all hydrocarbons. They do not mix with water (hydrophobic), and they burn readily in oxygen, releasing a lot of energy as heat — which is why they are used as fuels.

A CARBOHYDRATE contains carbon, hydrogen, AND oxygen, with hydrogen and oxygen usually in the same 2:1 ratio as in water — the general formula is roughly (CH2O)n, which is where the name comes from ("hydrate of carbon"). Sugars (glucose C6H12O6, sucrose), starch, glycogen, and cellulose are carbohydrates. Many are soluble in water, and in living things they are the main source of quick chemical energy (and, as cellulose, structural material in plants).

So: hydrocarbon = C + H only, a fuel; carbohydrate = C + H + O, a sugar/starch and a biological energy store.`,
  ),
  k(
    'kb-gap-chem4-chromatography-vs-distillation',
    'Chromatography vs distillation',
    [
      'difference between chromatography and distillation', 'distillation separates liquids by differences in boiling point evaporate then condense', 'chromatography separates the components of a mixture by how strongly each is attracted to a stationary phase versus a moving mobile phase',
      'paper thin-layer column gas and liquid chromatography', 'chromatography works on tiny amounts and closely similar substances distillation on bulk liquids', 'Rf value',
    ],
    `Both separate mixtures, but by different physical properties and at different scales.

DISTILLATION separates liquids (or a liquid from a dissolved solid) by differences in BOILING POINT. You heat the mixture; the component with the lower boiling point vaporises first, its vapour is led away and cooled back to liquid (condensed) in a separate container. Simple distillation works for large boiling-point gaps (water from salt); fractional distillation, using a tall column, separates liquids with close boiling points (ethanol from water, the fractions of crude oil). It handles BULK quantities.

CHROMATOGRAPHY separates the components of a mixture by how strongly each one is ATTRACTED to a STATIONARY phase (paper, a thin gel layer, a packed column, a coated capillary) versus how much it is carried along by a MOBILE phase (a solvent flowing through, or a carrier gas). Components that cling to the stationary phase move slowly; those that prefer the mobile phase move fast, so they spread out and separate. Types include paper, thin-layer (TLC), column, gas (GC), and high-performance liquid chromatography (HPLC). It works on TINY amounts and can separate very similar substances, and is mainly used to identify and measure what is in a sample rather than to collect large quantities.`,
  ),
  k(
    'kb-gap-chem4-ph-vs-pka',
    'pH vs pKa',
    [
      'difference between pH and pKa', 'pH measures the actual acidity of a particular solution the negative log of the hydrogen ion concentration and changes with dilution', 'pKa is a fixed property of an acid the negative log of its acid dissociation constant Ka how readily it gives up a proton',
      'lower pKa means stronger acid', 'at pH equal to pKa the acid is half dissociated', 'Henderson-Hasselbalch',
    ],
    `pH describes a SOLUTION; pKa describes an ACID.

pH = -log10[H+], the negative logarithm of the hydrogen-ion concentration in a particular solution right now. It tells you how acidic or basic THAT sample is (0-7 acidic, 7 neutral, 7-14 basic), and it CHANGES if you dilute the solution or add acid or base.

pKa = -log10(Ka), where Ka is the acid dissociation constant. It is a FIXED, characteristic property of a given acid (at a given temperature), measuring how strongly that acid tends to donate its proton. A LOWER pKa means a STRONGER acid (hydrochloric acid pKa about -7; acetic acid pKa 4.76; it does not change with concentration).

They connect through the Henderson-Hasselbalch relationship: when the pH of a solution equals the acid's pKa, exactly half of that acid is dissociated. So pKa tells you the intrinsic strength of the acid; pH tells you the state of one particular solution.`,
  ),
];
