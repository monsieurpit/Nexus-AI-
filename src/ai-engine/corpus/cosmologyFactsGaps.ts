import { KnowledgeItem } from '../../types';

// Batch 51 (cosmology & astrophysics) gap-fills. Strong category (~20/25). Live
// misses on nexus-4b: "observable universe" -> "expanding from a hot dense
// state about 13.8 billion years ago" as its SIZE (it's ~93 billion ly
// across); "galaxy cluster" -> called the Local Group a cluster (it's a
// group); "how stars form and die" -> "the sun's gonna burn for about 10
// billion years before it just fizzles out". Mostly precision fixes.
export const COSMOLOGY_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-observable-universe',
    title: 'What the Observable Universe Is',
    category: 'Cosmology',
    keywords: [
      'what is the observable universe', 'how big is the observable universe', 'why is the observable universe bigger than 13.8 billion light years',
      'what is the cosmic horizon', 'is the universe infinite', 'how many galaxies are in the universe',
    ],
    content: `The observable universe is the region of space from which light has had time to reach us since the Big Bang 13.8 billion years ago — everything beyond it is simply too far for its light to have arrived yet (or ever, because of expansion). A common confusion: its radius is NOT 13.8 billion light-years. Because space has expanded while the light was in transit, the objects whose ancient light we now see have since moved much farther away, so the observable universe is about 46 billion light-years in radius — roughly 93 billion light-years across. It contains on the order of hundreds of billions to a couple of trillion galaxies. The whole universe is probably far larger than the observable part and may be infinite; we just can't see past our "cosmic horizon." As the expansion accelerates, distant galaxies are drifting beyond that horizon, so in the very far future an observer will see less, not more.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-galaxy-cluster',
    title: 'What a Galaxy Cluster Is (and Group, and Supercluster)',
    category: 'Cosmology',
    keywords: [
      'what is a galaxy cluster', 'galaxy group vs cluster', 'what is the local group', 'what is a supercluster',
      'largest structures in the universe', 'is the milky way in a cluster', 'the cosmic web',
    ],
    content: `Galaxies are not scattered randomly — gravity binds them into a hierarchy. A galaxy GROUP is a small gravitationally bound collection of up to about 50 galaxies. The Milky Way belongs to one: the Local Group, which has 80+ members but is dominated by just two big spirals, the Milky Way and Andromeda, plus many dwarf galaxies. A galaxy CLUSTER is much larger — hundreds to thousands of galaxies bound together, filled with hot X-ray-emitting gas and a lot of dark matter (the nearest big one is the Virgo Cluster, ~1,300+ galaxies, 54 million light-years away). SUPERCLUSTERS are loose groupings of many clusters and groups spanning hundreds of millions of light-years; the Local Group sits at the edge of the Laniakea Supercluster. On the largest scale, superclusters, filaments and vast empty "voids" form the "cosmic web," the biggest structure there is. Clusters are the largest objects held together by their own gravity; on bigger scales the expansion of the universe wins.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-stars-die',
    title: 'How Stars Form and Die',
    category: 'Astronomy',
    keywords: [
      'how do stars form and die', 'star life cycle', 'what will happen to the sun', 'how do massive stars die',
      'what is a protostar', 'main sequence star', 'what is left after a star dies',
    ],
    content: `Stars form inside cold, dense clouds of gas and dust (nebulae). A clump collapses under its own gravity, spinning up and heating as it shrinks (a "protostar"); when the core reaches about 10 million K, hydrogen fusion ignites and a star is born, entering the long stable "main sequence" phase where outward radiation pressure balances gravity. How a star DIES depends entirely on its mass. A Sun-like star spends about 10 billion years on the main sequence (the Sun is ~4.6 billion years in, so roughly halfway), then, as its core hydrogen runs out, it swells into a RED GIANT, fuses helium into carbon and oxygen, and finally puffs its outer layers off into a glowing "planetary nebula," leaving the hot, Earth-sized core as a WHITE DWARF that slowly cools over billions of years — it doesn't "fizzle out," it slowly fades. A star more than ~8 times the Sun's mass fuses ever-heavier elements up to iron, then its core collapses catastrophically in seconds and rebounds as a SUPERNOVA explosion, scattering heavy elements and leaving behind a NEUTRON STAR or, for the most massive, a BLACK HOLE.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-redshift',
    title: 'What Redshift Is',
    category: 'Cosmology',
    keywords: [
      'what is redshift', 'what causes redshift', 'cosmological redshift vs doppler redshift', 'gravitational redshift',
      'how do astronomers measure distance with redshift', 'why is distant galaxy light redder', 'what is z in astronomy',
    ],
    content: `Redshift is the stretching of light to longer (redder) wavelengths; blueshift is the opposite. There are three kinds. DOPPLER redshift: an object moving away from you stretches the light waves it emits (the same effect makes a receding siren drop in pitch); moving toward you shifts it blue. COSMOLOGICAL redshift: this is different — it's not motion through space but the expansion of space itself stretching a light wave while it travels, so the farther away a galaxy is, the longer its light has been in transit and the more its wavelength has been stretched. GRAVITATIONAL redshift: light climbing out of a strong gravitational field loses energy and reddens. Astronomers measure redshift ("z") from the shift of known spectral lines, and for distant galaxies the cosmological redshift directly tells you how much the universe has expanded since that light was emitted — hence roughly how far away and how far back in time you're looking. It's the main tool for mapping the size, age and expansion history of the universe.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-universe-expansion',
    title: 'What the Expansion of the Universe Is',
    category: 'Cosmology',
    keywords: [
      'what is the expansion of the universe', 'is the universe expanding', 'does the universe have a center',
      'what is hubble law', 'are galaxies moving through space', 'is the expansion of the universe speeding up',
      'the raisin bread analogy',
    ],
    content: `The expansion of the universe is the observation that space itself is stretching, so that on large scales galaxies are getting farther apart over time. Edwin Hubble showed in 1929 (building on Lemaître) that almost every galaxy is redshifted, and the farther away it is the faster it's receding — Hubble's law, v = H₀ × d. The key point: individual galaxies are not flying through space away from some explosion centre; rather, the space between them is growing, like raisins in rising bread dough drifting apart while each raisin stays put in the dough. So there is no centre and no edge, and from every galaxy it looks like everything else is receding. Very distant galaxies can even recede faster than light without breaking relativity, because it's space expanding, not motion. Running the expansion backwards gives the Big Bang 13.8 billion years ago. Since 1998 we've known the expansion is not slowing under gravity as expected but ACCELERATING, driven by "dark energy."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dark-matter-clean',
    title: 'What Dark Matter Is',
    category: 'Cosmology',
    keywords: [
      'what is dark matter', 'what is the evidence for dark matter', 'galaxy rotation curves dark matter',
      'is dark matter black holes', 'what could dark matter be', 'how much of the universe is dark matter',
      'dark matter vs dark energy',
    ],
    content: `Dark matter is a form of matter that gives off no light and doesn't interact with normal matter except through gravity, yet makes up about 27% of the universe's total energy content — roughly five times as much as all the ordinary matter (stars, gas, planets, us) at ~5%. We can't see it, but multiple independent lines of evidence show it's there: spiral galaxies rotate far too fast at their edges to be held together by their visible mass alone; galaxy clusters would fly apart without extra unseen mass; gravitational lensing reveals mass where there's no light (the "Bullet Cluster" separates the two); and the pattern of the cosmic microwave background and the growth of cosmic structure only fit if dark matter exists. It is NOT antimatter, and studies have ruled out it being dim ordinary objects or a large population of black holes. The leading candidates are new elementary particles (WIMPs, axions) that haven't yet been detected directly despite decades of searching. A minority view is that our theory of gravity needs modifying instead (MOND).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dark-energy',
    title: 'What Dark Energy Is Doing to the Universe',
    category: 'Cosmology',
    keywords: [
      'what is dark energy doing to the universe', 'what is dark energy', 'why is the expansion of the universe accelerating',
      'cosmological constant', 'how was dark energy discovered', 'what percent of the universe is dark energy',
    ],
    content: `Dark energy is a mysterious component that makes up about 68% of the universe's energy content and acts as a kind of repulsive gravity, pushing space apart. Its effect: it is causing the expansion of the universe to ACCELERATE. This was discovered in 1998, when two teams measuring distant Type Ia supernovae found that they were fainter (farther away) than expected — the universe's expansion, instead of gradually slowing under the pull of all its matter, had started speeding up several billion years ago as matter thinned out and dark energy came to dominate. The 2011 Nobel Prize in Physics went to that discovery. Nobody knows what dark energy is: the leading idea is that it's a constant energy inherent to empty space itself (Einstein's "cosmological constant," or "vacuum energy"), which stays the same density even as space grows. If it keeps behaving this way, distant galaxies will accelerate out of view, groups like ours will become isolated, and the universe drifts toward a cold, dark, empty "heat death."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-quasar',
    title: 'What a Quasar Is',
    category: 'Astronomy',
    keywords: [
      'what is a quasar', 'what powers a quasar', 'why are quasars so bright', 'quasar vs galaxy', 'active galactic nucleus',
      'how far away are quasars', 'quasi-stellar object',
    ],
    content: `A quasar (from "quasi-stellar radio source") is the blazingly bright core of a distant galaxy, powered by a supermassive black hole that is actively feeding. As gas spirals in toward the black hole it forms a swirling "accretion disc" that friction heats to millions of degrees, and it blasts out light and jets across the electromagnetic spectrum. A single quasar can outshine its entire host galaxy of hundreds of billions of stars — some are trillions of times as luminous as the Sun. Because they're so bright, quasars are visible across most of the observable universe: the nearest are hundreds of millions of light-years away and most are billions, meaning we see them as they were in the young universe, when galaxies had abundant gas and their central black holes were gorging. Most large galaxies today, including the Milky Way, contain a supermassive black hole that was probably a quasar long ago but has now run low on fuel and gone quiet. Quasars are the most luminous members of a broader class called "active galactic nuclei."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stellar-nucleosynthesis',
    title: 'What Stellar Nucleosynthesis Is (Where the Elements Come From)',
    category: 'Astronomy',
    keywords: [
      'what is stellar nucleosynthesis', 'where do the elements come from', 'how are heavy elements made', 'where does gold come from',
      'are we made of stardust', 'r-process elements', 'why is iron the end of fusion',
    ],
    content: `Stellar nucleosynthesis is the building of chemical elements by nuclear fusion inside stars. The Big Bang produced only hydrogen, helium and a trace of lithium; almost everything else was forged later. In ordinary stars, hydrogen fuses to helium; in the cores of giant and massive stars, helium fuses to carbon and oxygen, and successively heavier elements up to IRON. Iron is the endpoint of stellar fusion because fusing iron consumes energy rather than releasing it, so the core can no longer support the star. Elements HEAVIER than iron — gold, platinum, uranium, most of the periodic table's bottom rows — are not made by ordinary fusion. They're built by rapid neutron capture (the "r-process") in the extreme conditions of core-collapse supernovae and, especially, merging neutron stars (confirmed by the 2017 gravitational-wave event GW170817, which was seen to produce a cloud of freshly made gold and platinum). Every explosion scatters these elements into space, enriching the gas clouds that form the next generation of stars and planets — which is why the carbon, oxygen, calcium and iron in your body were literally made inside stars.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-supermassive-black-hole',
    title: 'What a Supermassive Black Hole Is',
    category: 'Astronomy',
    keywords: [
      'what is a supermassive black hole', 'how do supermassive black holes form', 'sagittarius a star', 'black hole at the center of the galaxy',
      'how big is a supermassive black hole', 'first image of a black hole', 'do all galaxies have a supermassive black hole',
    ],
    content: `A supermassive black hole is a black hole with a mass of roughly a million to tens of billions of times the Sun's, sitting at the centre of almost every large galaxy. The Milky Way's is Sagittarius A*, about 4.3 million solar masses, imaged in 2022 by the Event Horizon Telescope (which had already imaged the far bigger one in galaxy M87, ~6.5 billion solar masses, in 2019). Despite the huge mass, the event horizon of Sagittarius A* is only about the size of Mercury's orbit. How they got so big is still an open question — unlike stellar-mass black holes, they can't simply come from one collapsed star. Leading ideas: a "seed" black hole (from an early massive star or the direct collapse of a giant gas cloud) that then grew over billions of years by swallowing gas and by merging with other black holes when galaxies collided. There's a tight relationship between a galaxy's central black hole mass and the properties of the galaxy, suggesting they grow up together.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-weather-vs-climate-modeling',
    title: 'Weather Forecasting vs Climate Modeling',
    category: 'Earth Science',
    keywords: [
      'what is the difference between weather forecasting and climate modeling', 'weather forecast vs climate model',
      'why can we predict climate but not weather', 'initial value vs boundary value problem', 'why is weather only predictable 10 days out',
      'how do climate models work',
    ],
    content: `Weather forecasting is an "initial-value problem": you measure the atmosphere's current state everywhere as precisely as possible and run physics equations forward to predict the specific conditions (temperature, rain, wind) at a place over the next hours to about 10 days. Beyond that, tiny errors in the starting data grow exponentially (chaos, the "butterfly effect") and the forecast becomes worthless — you can't say whether it will rain in Paris on a given day three months from now. Climate modeling is a "boundary-value problem": it doesn't try to predict individual days at all. Instead it asks how the STATISTICS of weather (long-term averages, ranges and extremes over decades) respond to the things that force the system — the amount of sunlight, greenhouse-gas levels, volcanic aerosols, ocean and ice conditions. You can confidently say next summer will be warmer than next winter without knowing any daily forecast, for the same reason you can predict a casino's yearly profit without predicting any single spin. So climate models are tested against the past century and against physics, not against tomorrow's forecast.`,
    createdAt: Date.now(),
  },
];
