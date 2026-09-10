import { KnowledgeItem } from '../../types';

/**
 * SCIENCE_BASICS_CONCEPTS_GAPS_3 — batch 208 corrections.
 * Basic bio/chem/physics was mostly well covered; the misses: "nervous vs
 * endocrine system" answered only about the hypothalamus without contrasting
 * them, "heat vs temperature" answered about heat-advisory vs excessive-heat-
 * warning weather alerts, "solid solution vs suspension" claimed salt water is
 * a solid solution, "herbivore vs detritivore" used a scavenger example, and
 * "artery vs vein" came back as a truncated web dump.
 */
export const SCIENCE_BASICS_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  {
    id: 'kb-gap-scibas3-nervous-vs-endocrine',
    title: 'Nervous system vs endocrine system',
    category: 'science',
    keywords: [
      'difference between the nervous system and the endocrine system', 'nervous vs endocrine',
      'neurons electrical signals', 'hormones bloodstream', 'fast vs slow response',
      'neurotransmitters', 'glands', 'hypothalamus links them', 'short vs long lasting',
      'target cells',
    ],
    content: `Both are communication and control systems that coordinate the body, but they use different messengers, speeds and durations.

The nervous system sends electrical impulses along neurons, with chemical neurotransmitters crossing the tiny gaps (synapses) between cells. Signals travel in milliseconds along fixed "wired" pathways to specific targets (a particular muscle or gland). Responses are near-instant but usually brief, lasting only as long as the stimulation. It handles anything needing speed: reflexes, movement, sensation, thought.

The endocrine system releases chemical messengers called hormones from glands (pituitary, thyroid, adrenal, pancreas, ovaries, testes) directly into the bloodstream. Hormones travel everywhere and act only on cells with the matching receptor. Responses take seconds to hours or days to appear, but they last much longer and are better suited to sustained, widespread processes: growth, metabolism, blood-sugar regulation, the stress response, puberty, the menstrual cycle.

The two are linked, mainly at the hypothalamus, which receives nerve signals and in turn controls the pituitary gland, translating fast neural information into slower hormonal commands. Short version: nervous = fast, electrical, targeted, brief; endocrine = slower, chemical via blood, broad, long-lasting.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scibas3-heat-vs-temperature',
    title: 'Heat vs temperature (physics, not weather alerts)',
    category: 'science',
    keywords: [
      'difference between heat and temperature', 'heat vs temperature', 'thermal energy transfer',
      'average kinetic energy', 'joules vs degrees', 'not heat advisory or excessive heat warning',
      'specific heat capacity', 'thermal equilibrium', 'calorimetry',
    ],
    content: `This is a physics distinction, not about weather alerts like a "heat advisory" versus an "excessive heat warning".

Temperature is a measure of the average kinetic energy of the particles in a substance — how fast, on average, its molecules are jiggling. It does not depend on how much material there is. Measured in degrees Celsius, Fahrenheit or kelvin. A spark and a bathtub of warm water can be at very different temperatures regardless of size.

Heat is energy in transit from a hotter object to a cooler one because of the temperature difference between them. It depends on the amount of substance, its specific heat capacity, and the temperature change. Measured in joules (or calories). Once the energy has arrived it is called thermal (internal) energy, not heat.

The classic illustration: a lit match has a very high temperature but carries little heat (few particles), so it cannot warm a room. A large radiator at a modest temperature transfers a lot of heat because it has far more particles to give energy from. Heat always flows from high to low temperature until both reach the same temperature (thermal equilibrium), at which point net heat transfer stops.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scibas3-solid-solution-vs-suspension',
    title: 'Solid solution vs suspension',
    category: 'science',
    keywords: [
      'difference between a solid solution and a suspension', 'solid solution vs suspension',
      'alloy', 'homogeneous mixture', 'heterogeneous mixture', 'brass steel bronze',
      'particles settle out', 'muddy water', 'not salt water', 'dissolved evenly',
    ],
    content: `A solid solution is a homogeneous mixture where the solvent — the component present in the larger amount — is itself a solid, and the other component's atoms are dispersed evenly throughout its crystal structure at the atomic scale. The classic examples are metal alloys: brass (zinc dissolved in copper), steel (carbon in iron), bronze, sterling silver. It looks and behaves as a single uniform material and cannot be separated by filtering or settling. (Salt water is NOT a solid solution — the solvent there is liquid water, so it is an ordinary liquid solution.)

A suspension is a heterogeneous mixture in which relatively large, undissolved particles are temporarily dispersed through a fluid but are big enough to see (or see under a microscope) and to scatter light. Left undisturbed, the particles settle out under gravity, and they can be removed by filtering. Examples: muddy water, sand stirred into water, oil-based paint, some medicines ("shake well before use"), flour in water.

Key contrasts: a solid solution is uniform at the atomic level, stable, and unfilterable; a suspension is visibly non-uniform, separates on standing, and is filterable. A colloid (milk, fog) sits between them — particles too small to settle but large enough to scatter light.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scibas3-herbivore-vs-detritivore',
    title: 'Herbivore vs detritivore (and scavenger, decomposer)',
    category: 'science',
    keywords: [
      'difference between a herbivore and a detritivore', 'herbivore vs detritivore', 'primary consumer',
      'detritus', 'dead organic matter', 'earthworm millipede woodlouse', 'decomposer vs detritivore',
      'scavenger', 'nutrient recycling', 'trophic level',
    ],
    content: `A herbivore eats living plant material — leaves, grass, fruit, seeds, roots. Cows, rabbits, deer, grasshoppers, elephants. Herbivores are primary consumers: they get their energy directly from producers.

A detritivore eats detritus: dead and decaying organic matter and the waste of other organisms — fallen leaves, rotting wood, dung, dead roots, decomposing remains — usually by ingesting chunks of it. Earthworms, millipedes, woodlice, dung beetles, many soil mites and some crustaceans. They break large dead material into smaller pieces, speeding decomposition and recycling nutrients back into the soil.

Two things it is often confused with:
- A scavenger (vultures, hyenas, a badger eating a fresh carcass) eats dead ANIMALS that recently died, typically large intact bodies, and is usually also a carnivore — not the same as a detritivore working on already-decaying litter.
- A decomposer (bacteria, fungi) breaks dead matter down chemically by secreting enzymes and absorbing the products, rather than eating particles. Detritivores ingest; decomposers digest externally.

Short version: herbivore = living plants; detritivore = dead, decomposing organic matter eaten in pieces.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scibas3-artery-vs-vein',
    title: 'Artery vs vein',
    category: 'science',
    keywords: [
      'difference between an artery and a vein', 'artery vs vein', 'away from the heart',
      'toward the heart', 'thick elastic muscular wall', 'thin wall with valves', 'pulmonary exception',
      'blood pressure', 'oxygenated deoxygenated', 'capillaries',
    ],
    content: `The reliable definition is about direction of flow, not oxygen: arteries carry blood AWAY from the heart; veins carry blood back TOWARD the heart.

Oxygen content usually follows that (systemic arteries carry oxygen-rich blood, systemic veins carry oxygen-poor blood) but there are real exceptions: the pulmonary artery carries deoxygenated blood from the heart to the lungs, and the pulmonary veins carry oxygenated blood from the lungs back to the heart — the reverse of the usual pattern. The umbilical vessels in a fetus are also "backwards".

Structure reflects pressure:
- Arteries have thick walls with lots of elastic tissue and smooth muscle. The big ones (aorta) stretch with each heartbeat and recoil to keep blood moving; smaller arteries and arterioles constrict and dilate to control blood pressure and distribution. Blood in arteries is under high, pulsing pressure.
- Veins have thinner, less muscular walls and a wider lumen. Blood pressure in them is low, so many veins (especially in the limbs) contain one-way valves, and skeletal-muscle contraction squeezes the blood back toward the heart against gravity.

Both connect through capillaries, the microscopic thin-walled vessels where gas, nutrient and waste exchange with tissues actually happens.`,
    createdAt: Date.now(),
  },
];
