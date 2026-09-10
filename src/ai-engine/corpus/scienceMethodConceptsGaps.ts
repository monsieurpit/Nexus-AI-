import { KnowledgeItem } from '../../types';

/**
 * SCIENCE_METHOD_CONCEPTS_GAPS — batch 214 corrections.
 * Misses: "accuracy vs precision" answered ML classification metrics,
 * "mass vs matter" answered mass vs weight, "AM vs FM radio" put FM at sub-
 * millimetre wavelengths, "hypothesis vs theory" was muddled, and web dumps
 * for mean/median/mode, law/theory, kinetic/thermal energy, wave frequency/
 * wavelength and the light/dark reactions of photosynthesis.
 */
export const SCIENCE_METHOD_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-scimeth-hypothesis-vs-theory',
    title: 'Hypothesis vs theory (in science)',
    category: 'science',
    keywords: [
      'difference between a hypothesis and a theory', 'hypothesis vs theory', 'testable prediction',
      'explanatory framework', 'not a guess', 'evolution is just a theory', 'scientific method',
      'evidence and testing', 'falsifiable',
    ],
    content: `A hypothesis is a specific, testable proposed explanation or prediction, made before or early in an investigation. It is narrow ("plants given fertiliser X will grow taller than plants without it"), it can be supported or refuted by a single well-designed experiment, and it is the starting point, not the endpoint. A hypothesis is more than a wild guess — it is informed by prior knowledge — but it has not yet been extensively tested.

A theory is a broad, well-substantiated explanation of some aspect of the natural world that has been repeatedly tested and confirmed through many independent lines of evidence, integrates many facts and confirmed hypotheses, and makes reliable predictions. Examples: the theory of evolution by natural selection, the germ theory of disease, plate tectonics, the atomic theory. A theory is the most robust kind of scientific knowledge, not a step below "fact".

This is why "evolution is just a theory" misuses the word: in everyday speech "theory" can mean a hunch, but in science a theory is a rigorously supported explanatory framework. Theories remain open to revision if strong contrary evidence appears, but a mature theory is not a guess. (A scientific law, by contrast, describes a regularity — often as an equation — without explaining the mechanism; a theory explains why the law holds.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-accuracy-vs-precision',
    title: 'Accuracy vs precision (measurement)',
    category: 'science',
    keywords: [
      'difference between accuracy and precision', 'accuracy vs precision', 'closeness to true value',
      'reproducibility', 'systematic error versus random error', 'bullseye analogy', 'calibration',
      'significant figures', 'not machine-learning precision',
    ],
    content: `In measurement science these describe two different kinds of quality in a set of measurements. (This is a different meaning from "precision" in machine-learning classification, which is the fraction of positive predictions that are correct.)

Accuracy is how close a measurement (or the average of measurements) is to the true or accepted value. Poor accuracy means a systematic error (bias) — a miscalibrated scale that always reads 2 kg high, a ruler that starts at 1 mm.

Precision is how close repeated measurements are to each other, regardless of whether they are near the true value. Poor precision means large random error — readings scattered widely from trial to trial. Precision also refers to the fineness of a measuring instrument (a ruler marked in millimetres is more precise than one marked in centimetres).

The classic picture is a dartboard:
- Accurate and precise: tight cluster on the bullseye.
- Precise but not accurate: tight cluster, but off to one side (consistent bias).
- Accurate but not precise: scattered around the bullseye, averaging out near centre.
- Neither: scattered and off-centre.

You fix accuracy by calibrating against a known standard; you improve precision with a better instrument, better technique, and averaging many trials.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-independent-vs-dependent-variable',
    title: 'Independent vs dependent variable',
    category: 'science',
    keywords: [
      'difference between an independent and dependent variable', 'independent vs dependent variable',
      'manipulated variable', 'responding variable', 'cause and effect in an experiment', 'x-axis y-axis',
      'controlled variables', 'not independent events in probability',
    ],
    content: `In an experiment (not to be confused with independent/dependent events in probability):

The independent variable is the one the experimenter deliberately changes or sets — the presumed cause. Also called the manipulated variable. Examples: the amount of fertiliser given, the temperature of the water, the dose of a drug, the number of hours studied. A well-designed experiment changes only one independent variable at a time.

The dependent variable is the one the experimenter measures to see how it responds — the presumed effect. Also called the responding variable. Its value "depends on" what the independent variable was set to. Examples: plant height, reaction rate, blood pressure, test score.

Everything else that could affect the outcome is held constant — the controlled variables (same soil, same light, same measuring method) — so any change in the dependent variable can be attributed to the independent variable.

When plotting the results, the independent variable goes on the x-axis and the dependent variable on the y-axis. A quick phrasing: "I change the independent variable, I measure the dependent variable, I control everything else."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-mean-median-mode',
    title: 'Mean vs median vs mode',
    category: 'science',
    keywords: [
      'difference between mean median and mode', 'mean median mode', 'measures of central tendency',
      'average', 'middle value', 'most frequent value', 'skewed data', 'outliers pull the mean',
      'when to use each',
    ],
    content: `All three are "measures of central tendency" — single numbers meant to represent a typical value in a data set — but they are calculated differently and behave differently.

Mean (the arithmetic average): add all the values and divide by how many there are. It uses every value, which makes it powerful for further statistics, but it is pulled toward extreme values (outliers). For the data 2, 3, 3, 4, 20 the mean is 6.4.

Median: sort the values and take the middle one (or the average of the two middle ones if there is an even count). It is the 50th percentile. It ignores how far away the extreme values are, so it is resistant to outliers. For 2, 3, 3, 4, 20 the median is 3.

Mode: the value that appears most often. A data set can have one mode, several, or none. It is the only one of the three that works for non-numeric categories ("most common eye colour"). For 2, 3, 3, 4, 20 the mode is 3.

When they differ, the data is skewed. Use the median for skewed data or when outliers are present (incomes, house prices); use the mean for roughly symmetric data; use the mode for categorical data or to find the most typical single value.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-law-vs-theory',
    title: 'Scientific law vs scientific theory',
    category: 'science',
    keywords: [
      'difference between a law and a theory in science', 'law vs theory science', 'describes versus explains',
      'mathematical relationship', 'mechanism', 'Newton law of gravitation', 'theory of evolution',
      'a theory does not become a law', 'both well-supported',
    ],
    content: `A scientific law describes WHAT happens — a regularity in nature that holds under stated conditions, often expressed as a concise mathematical relationship. Examples: Newton's law of universal gravitation (the force equation), the ideal gas law (PV = nRT), the laws of thermodynamics, Ohm's law. A law tells you the pattern but not the reason.

A scientific theory explains WHY it happens — it provides the underlying mechanism and a coherent framework that accounts for many laws and observations at once, and makes new predictions. Examples: the theory of general relativity (explains gravitation as curved spacetime), the kinetic theory of gases (explains the gas laws in terms of moving molecules), the theory of evolution, the germ theory of disease.

Two common misconceptions:
- A theory does NOT "graduate" into a law with enough evidence. They are different kinds of statement — description versus explanation — and both can be extremely well supported. Evolution will never become a "law"; laws of inheritance already exist alongside it.
- "Only a theory" is a misuse: in science a theory is the highest form of explanatory knowledge, not a guess.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-mass-vs-matter',
    title: 'Mass vs matter',
    category: 'science',
    keywords: [
      'difference between mass and matter', 'mass vs matter', 'anything with mass and volume',
      'amount of matter', 'a property versus a substance', 'kilograms', 'not mass versus weight',
      'inertia', 'stuff versus a measurement of stuff',
    ],
    content: `Matter is the physical substance itself — anything that has mass and takes up space (volume). Wood, water, air, a rock, your body are all matter. It exists as solids, liquids, gases and plasma, and is made of atoms. "Matter" is the stuff.

Mass is a measurable property OF matter: how much matter an object contains, and equivalently how much it resists being accelerated (its inertia). Mass is a number with units (kilograms, grams) and does not change with location — an object has the same mass on Earth, on the Moon, or in deep space.

So the relationship is: matter is the thing; mass is a quantity that tells you how much of that thing there is. Every piece of matter has mass; mass is not itself "stuff", it is a description of stuff.

(This is different from the mass-versus-weight distinction. Weight is the gravitational force on a mass, measured in newtons, and it does change with location. Mass is constant; weight varies with gravity.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-kinetic-vs-thermal-energy',
    title: 'Kinetic energy vs thermal energy',
    category: 'science',
    keywords: [
      'difference between kinetic and thermal energy', 'kinetic vs thermal energy', 'energy of motion',
      'internal energy', 'random molecular motion', 'bulk motion', 'temperature', 'heat',
      'moving object versus hot object',
    ],
    content: `Kinetic energy is the energy an object has because of its motion, calculated as one-half times mass times velocity squared. It usually refers to the "bulk" motion of a whole object — a thrown ball, a moving car, a falling rock. When the object stops, that kinetic energy has been transferred elsewhere (to sound, heat, deformation).

Thermal energy is the total internal energy tied up in the random, disordered motion (and vibration) of all the individual atoms and molecules within a substance. It is essentially the sum of the microscopic kinetic energies (plus some potential energy of the intermolecular bonds) of every particle. A hot object has more thermal energy than an identical cold object because its particles are jiggling faster on average.

The link: temperature is a measure of the AVERAGE kinetic energy per particle; thermal energy is the TOTAL over all particles (so it also depends on how many particles there are — a bathtub of warm water has more thermal energy than a red-hot spark). Heat is thermal energy in transit from a hotter body to a cooler one.

Short version: kinetic energy = motion of the whole object; thermal energy = summed random motion of all its particles.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-frequency-vs-wavelength',
    title: 'Wave frequency vs wavelength',
    category: 'science',
    keywords: [
      'difference between wave frequency and wavelength', 'frequency vs wavelength', 'cycles per second',
      'hertz', 'distance between crests', 'metres', 'v equals f times lambda', 'inverse relationship',
      'pitch and colour', 'amplitude is separate',
    ],
    content: `Both describe a wave, and for a given wave speed they are inversely related, but they measure different things.

Frequency (f) is how many complete wave cycles pass a fixed point per second, measured in hertz (Hz). For sound it corresponds to pitch (higher frequency = higher pitch); for light it corresponds to colour and photon energy.

Wavelength (the Greek letter lambda) is the physical distance between two consecutive identical points on the wave — crest to crest, or trough to trough — measured in metres.

They are tied together by the wave equation: speed = frequency times wavelength (v = f lambda). Since the speed of a wave in a given medium is fixed, a higher frequency means a shorter wavelength and vice versa. For light in a vacuum, speed is c, so a gamma ray has a tiny wavelength and huge frequency, while a radio wave has a long wavelength and low frequency.

Neither one is the same as amplitude, which is the wave's height (how far the medium is displaced) and corresponds to loudness for sound or brightness for light. You can independently have a high-frequency quiet whistle or a low-frequency loud bass note.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-am-vs-fm-radio',
    title: 'AM vs FM radio',
    category: 'science',
    keywords: [
      'difference between AM and FM radio', 'am vs fm', 'amplitude modulation', 'frequency modulation',
      'medium wave versus VHF', 'sound quality', 'range and interference', 'carrier wave',
      'AM long distance at night',
    ],
    content: `AM and FM are two ways of encoding an audio signal onto a radio carrier wave.

AM (amplitude modulation) varies the strength (amplitude) of the carrier to match the audio waveform. AM broadcast radio uses the medium-wave band, roughly 530-1700 kHz, which corresponds to wavelengths of hundreds of metres. AM signals travel long distances, especially at night when they bounce off the ionosphere, and pass around hills and buildings well. But because electrical noise (lightning, motors, power lines) adds to a signal's amplitude, AM picks up static, and its limited bandwidth gives lower audio fidelity — fine for talk and news.

FM (frequency modulation) keeps the carrier's amplitude constant and instead varies its frequency slightly around a centre value to encode the audio. FM broadcast radio uses the VHF band, roughly 88-108 MHz, corresponding to wavelengths of about 3 metres (not sub-millimetre). Receivers can ignore amplitude changes, so FM is largely immune to static, and its wider bandwidth allows high-fidelity stereo sound — good for music. The trade-off is shorter range (roughly line-of-sight, tens of kilometres) and no long-distance night-time skip.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-concentration-vs-molarity',
    title: 'Concentration vs molarity',
    category: 'science',
    keywords: [
      'difference between concentration and molarity', 'concentration vs molarity', 'amount of solute per volume',
      'moles per litre', 'general term versus specific unit', 'mass per volume', 'percent concentration',
      'parts per million', 'molar',
    ],
    content: `Concentration is the general idea of how much solute is present in a given amount of solution (or solvent). It can be expressed in many units: grams per litre, percent by mass or volume, parts per million (ppm), molality (moles per kilogram of solvent), and molarity. Saying a solution is "concentrated" or "dilute" is a loose statement about concentration.

Molarity is one specific, very common unit of concentration: the number of moles of solute per litre of solution, with the symbol M (mol/L). A "2 M NaCl solution" contains 2 moles of sodium chloride in every litre of the final solution. Chemists favour molarity because reactions happen in mole ratios, so molarity makes stoichiometry calculations direct.

So molarity is a kind of concentration, the way "kilometres per hour" is a kind of speed. It is not true that "concentration is the actual amount and molarity is the ratio" — both are amount-per-volume; molarity just fixes the units as moles per litre.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-diffusion-vs-osmosis',
    title: 'Diffusion vs osmosis',
    category: 'science',
    keywords: [
      'difference between diffusion and osmosis', 'diffusion vs osmosis', 'movement down a concentration gradient',
      'any particle versus water', 'semipermeable membrane', 'passive transport', 'solute versus solvent',
      'net movement', 'equilibrium',
    ],
    content: `Both are passive processes (no energy input) in which particles spread from where they are more concentrated to where they are less concentrated, until evenly distributed. The difference is what moves and whether a membrane is involved.

Diffusion is the net movement of any particles — gas molecules, dissolved ions, small molecules — from a region of higher concentration to lower concentration, driven by their random thermal motion. It does not require a membrane (perfume spreading across a room, a drop of dye spreading in water) though it can occur through one.

Osmosis is a specific case: the net movement of WATER (the solvent) across a selectively permeable membrane, from the side where water is more concentrated (fewer dissolved solutes) to the side where water is less concentrated (more solutes). It happens because the membrane lets water pass but blocks the solute, so instead of solute diffusing to balance the concentrations, water moves the other way. Osmosis is why plant cells become firm in pure water and why a cell placed in very salty water shrivels.

Short version: diffusion = any particle spreading out; osmosis = water crossing a semipermeable membrane to balance solute concentration.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scimeth-light-vs-dark-reactions',
    title: 'Light reactions vs Calvin cycle (dark reactions) of photosynthesis',
    category: 'science',
    keywords: [
      'difference between the light and dark reactions of photosynthesis', 'light reactions vs Calvin cycle',
      'light-dependent reactions', 'light-independent reactions', 'thylakoid membrane', 'stroma',
      'ATP and NADPH', 'carbon fixation', 'water split oxygen released', 'glucose from CO2',
    ],
    content: `Photosynthesis has two linked stages inside the chloroplast.

The light-dependent reactions ("light reactions") happen in the thylakoid membranes. Chlorophyll absorbs light, which excites electrons; water molecules are split (releasing O2 as a by-product and providing replacement electrons and protons); and the energy is used to make ATP and NADPH. These require light directly and stop in the dark.

The light-independent reactions ("dark reactions", or the Calvin cycle) happen in the stroma, the fluid around the thylakoids. They use the ATP and NADPH made by the light reactions to "fix" carbon dioxide from the air onto a sugar backbone, ultimately building glucose (via the enzyme RuBisCO and a cycle of intermediates). The name "dark reactions" is misleading — they do not need darkness and in most plants they run during the day; they are simply "light-independent" because they do not use light directly, only the chemical energy the light reactions produced.

Short version: light reactions capture light energy and store it as ATP/NADPH (splitting water, releasing oxygen); the Calvin cycle spends that ATP/NADPH to turn CO2 into sugar.`,
    createdAt: Date.now(),
  },
];
