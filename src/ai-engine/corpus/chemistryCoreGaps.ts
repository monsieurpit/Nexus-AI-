import { KnowledgeItem } from '../../types';

// Batch 83 (chemistry core — batches 19 and 55 covered deeper/everyday chem).
// Strong category. Real misses on nexus-4b: "what is an acid versus a base"
// came back garbled and cut off (started mid-sentence about buffers); "what is
// molarity" and "what is a limiting reactant" were raw web dumps ("Turns out
// Molar (tooth), a kind of tooth found in mammals"); "what is a hydrogen bond"
// said "water's double helix relies on shit like that" (DNA has the double
// helix); "element and compound" said a compound is "when you mix different
// elements together."
export const CHEMISTRY_CORE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-acid-vs-base',
    title: 'What an Acid Is versus a Base',
    category: 'Chemistry',
    keywords: [
      'what is an acid versus a base', 'acid donates hydrogen ions proton', 'base accepts h+ produces hydroxide', 'strong vs weak acid',
      'ph below 7 acidic above 7 basic', 'neutralization salt and water', 'litmus red acid blue base',
    ],
    content: `An acid is a substance that donates hydrogen ions (H+, i.e. protons) when dissolved in water, producing a solution with a pH below 7. Acids taste sour, can react with reactive metals to release hydrogen gas, and turn blue litmus paper red — examples include hydrochloric acid (stomach acid), sulfuric acid (car batteries), acetic acid (vinegar), and citric acid (citrus fruit). A base accepts hydrogen ions, or produces hydroxide ions (OH-), giving a pH above 7. Bases taste bitter, feel slippery or soapy, and turn red litmus blue — examples include sodium hydroxide (lye/drain cleaner), ammonia, and sodium bicarbonate (baking soda); a base that dissolves in water is also called an alkali. "Strong" acids and bases dissociate almost completely in water; "weak" ones only partly. When an acid and a base are combined they neutralise each other, producing a salt and water, for example HCl + NaOH → NaCl + H2O.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-element-vs-compound',
    title: 'The Difference Between an Element and a Compound',
    category: 'Chemistry',
    keywords: [
      'what is the difference between an element and a compound', 'element one kind of atom', 'compound elements chemically bonded fixed ratio',
      'compound vs mixture', 'can a compound be separated by chemical means', 'water is a compound not a mixture',
    ],
    content: `An element is a pure substance made of only one kind of atom, defined by its number of protons — hydrogen, carbon, gold, oxygen. It cannot be broken down into simpler substances by any chemical reaction; there are 118 known elements. A compound is a pure substance made of two or more different elements chemically bonded together in a fixed, definite ratio — water (H2O), carbon dioxide (CO2), table salt (NaCl), glucose (C6H12O6). A compound's properties are completely different from those of the elements in it (sodium is an explosive metal, chlorine a poison gas, but sodium chloride is table salt), and it can only be broken apart by a chemical reaction. This is NOT the same as a mixture: mixing elements or compounds physically — in any proportion, with no chemical bonding — gives a mixture (salt water, air, brass), whose components keep their own properties and can be separated physically by filtering, evaporation, or distillation. So water is a compound; salt water is a mixture.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-molarity',
    title: 'What Molarity Is',
    category: 'Chemistry',
    keywords: [
      'what is molarity', 'moles of solute per litre of solution', 'molar concentration M mol/L', 'how to make a 1 molar solution',
      'molarity vs molality', 'concentration units chemistry', 'why do chemists use molarity',
    ],
    content: `Molarity (molar concentration, symbol M, unit mol/L) is the number of moles of a dissolved substance (the solute) per litre of the total solution. A 1 M solution of sodium chloride contains 1 mole — about 58.4 grams — of NaCl dissolved in enough water to make the final volume exactly 1 litre. It has nothing to do with molar teeth. Chemists use molarity because chemical reactions happen in whole-number ratios of moles, so knowing the molarity lets you calculate exactly how much of one solution reacts with another (titrations, dilutions). To prepare a solution of known molarity: calculate the mass needed (moles wanted × molar mass), weigh it out, dissolve it in some solvent, then add solvent up to the target volume in a volumetric flask. A related unit is molality (moles of solute per kilogram of solvent), which is preferred when temperature changes matter because it does not depend on volume.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hydrogen-bond',
    title: 'What a Hydrogen Bond Is',
    category: 'Chemistry',
    keywords: [
      'what is a hydrogen bond', 'hydrogen bonding oxygen nitrogen fluorine', 'why does ice float hydrogen bonds', 'hydrogen bonds in water',
      'hydrogen bonds hold dna strands together', 'hydrogen bond vs covalent bond strength', 'hydrogen bonding protein folding',
    ],
    content: `A hydrogen bond is a relatively weak attraction — roughly a tenth the strength of a covalent bond — between a hydrogen atom that is covalently bonded to a small, highly electronegative atom (oxygen, nitrogen, or fluorine), and a lone pair of electrons on another electronegative atom nearby. Because the electronegative partner pulls electron density away from the hydrogen, that hydrogen carries a partial positive charge and is drawn toward the partial negative charge of the neighbouring atom. Individually weak, but present in vast numbers they have large effects. Hydrogen bonds between water molecules give water its unusually high boiling point and surface tension and make ice less dense than liquid water (so ice floats). They hold the two strands of the DNA double helix together, weakly enough that enzymes can unzip them for replication — note it is DNA, not water, that has the double-helix structure. And they are central to how proteins fold into their working shapes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-limiting-reactant',
    title: 'What a Limiting Reactant Is',
    category: 'Chemistry',
    keywords: [
      'what is a limiting reactant', 'limiting reagent runs out first', 'reactant in excess', 'how to find the limiting reactant',
      'limiting reactant determines product yield', 'stoichiometry limiting reagent', 'sandwich analogy limiting reactant',
    ],
    content: `In a chemical reaction, the limiting reactant (or limiting reagent) is the reactant that is completely used up first. Once it runs out the reaction stops, so it sets the maximum amount of product that can be made; whatever is left of the other reactants is said to be "in excess." A simple analogy: if a sandwich needs 2 slices of bread and 1 slice of cheese, and you have 10 slices of bread but only 3 slices of cheese, cheese is the limiting reactant — you can make just 3 sandwiches and 4 bread slices are left over. To identify it for a real reaction: write the balanced equation, convert the given mass of each reactant to moles, divide each by its coefficient in the equation, and the reactant with the smallest result is the limiting one. All yield and product-amount calculations (theoretical yield, percent yield) are based on the limiting reactant.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-solution-vs-mixture',
    title: 'A Solution versus a Mixture',
    category: 'Chemistry',
    keywords: [
      'what is a solution versus a mixture', 'homogeneous vs heterogeneous mixture', 'solute solvent solution', 'is a solution a type of mixture',
      'colloid suspension solution difference', 'can you separate a mixture physically', 'salt water vs sand water',
    ],
    content: `A mixture is any physical combination of two or more substances that are not chemically bonded, so each keeps its own chemical properties and the mixture can be separated by physical means (filtering, evaporation, distillation, a magnet). Mixtures come in two kinds. A HETEROGENEOUS mixture is not uniform — you can see or sample different parts (a salad, sand in water, granite, oil and vinegar). A HOMOGENEOUS mixture is uniform throughout, the same in every sample. A SOLUTION is a homogeneous mixture in which one substance (the solute) is dissolved in another (the solvent) and is broken up to the level of individual molecules or ions, so it looks completely uniform and does not settle or scatter light — salt water, sugar in tea, air, and metal alloys like brass. Between a true solution and a heterogeneous mixture sit colloids (particles small enough to stay suspended but big enough to scatter light — milk, fog, gelatin) and suspensions (particles that eventually settle — muddy water). So every solution is a mixture, but not every mixture is a solution.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ph-scale',
    title: 'What pH Is',
    category: 'Chemistry',
    keywords: [
      'what is ph', 'ph scale 0 to 14 logarithmic', 'ph measures hydrogen ion concentration', 'ph = -log[h+]',
      'acidic neutral basic ph examples', 'each ph unit is 10 times', 'what is the ph of blood lemon coffee',
    ],
    content: `pH is a measure of how acidic or basic a water-based solution is, based on the concentration of hydrogen ions (H+) in it. The scale usually runs from 0 to 14: 7 is neutral (pure water), below 7 is acidic (more H+), and above 7 is basic/alkaline (less H+, more OH-). It is logarithmic — defined as pH = -log10[H+] — so each whole number is a tenfold change: a solution at pH 4 is ten times more acidic than pH 5 and a hundred times more acidic than pH 6. Rough examples across the scale: battery acid ~0, stomach acid ~1.5, lemon juice ~2, vinegar ~3, black coffee ~5, milk ~6.5, pure water 7, blood ~7.4 (tightly controlled), baking soda solution ~8.5, ammonia ~11, bleach ~13, drain cleaner ~14. pH is measured with indicator dyes (litmus, universal indicator) or an electronic pH meter.`,
    createdAt: Date.now(),
  },
];
