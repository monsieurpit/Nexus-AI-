import { KnowledgeItem } from '../../types';

// Batch 67 (astronomy & cosmology, deeper). Strong category (~20/25). Garbled
// or thin answers on nexus-4b: "what is a neutron star" ("a pulsar maybe"),
// "what is a pulsar" ("possibly a pulsar, damn, which means it could be"),
// "what are the phases of the moon" (listed "crescent, quarter, gibbous", no
// new/full, implied Earth's shadow), "what is the Hubble constant" (wrong
// reasoning for why it's called constant), "what is redshift" (conflated the
// three kinds).
export const ASTRONOMY_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-neutron-star',
    title: 'What a Neutron Star Is',
    category: 'Astronomy',
    keywords: [
      'what is a neutron star', 'how dense is a neutron star', 'neutron star teaspoon weight', 'neutron star mass and size',
      'what is left after a supernova', 'neutron star vs black hole mass limit', 'what is a neutron star made of',
    ],
    content: `A neutron star is the collapsed core left behind when a massive star (roughly 8 to 25 times the Sun's mass) explodes as a core-collapse supernova. Gravity crushes the core so hard that protons and electrons merge into neutrons, and the whole thing is held up by "neutron degeneracy pressure." The result packs about 1.4 solar masses into a sphere only about 20 km across — so dense that a teaspoon of the material would weigh around a billion tonnes, comparable to a mountain. Neutron stars are born spinning rapidly (up to hundreds of times per second) and have magnetic fields trillions of times stronger than Earth's. If the leftover core is heavier than roughly 2 to 2.3 solar masses, degeneracy pressure fails and it collapses further into a black hole instead. A pulsar is a neutron star whose radiation beams happen to sweep past Earth; a magnetar is one with an extreme magnetic field.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pulsar',
    title: 'What a Pulsar Is',
    category: 'Astronomy',
    keywords: [
      'what is a pulsar', 'why does a pulsar pulse', 'pulsar lighthouse model', 'jocelyn bell burnell pulsar discovery',
      'millisecond pulsar', 'how are pulsars used as clocks', 'pulsar vs neutron star',
    ],
    content: `A pulsar is a rapidly rotating neutron star that emits beams of radio waves (and sometimes X-rays or gamma rays) from its two magnetic poles. Because the magnetic axis is tilted relative to the rotation axis, the beams sweep around like the light from a lighthouse; if one of them points at Earth once per rotation, we detect a regular pulse. Pulse periods range from a few seconds down to about 1.4 milliseconds for the fastest "millisecond pulsars," which have been spun up by accreting matter from a companion star. The first pulsar was detected in 1967 by Jocelyn Bell Burnell as a graduate student; the signal was so regular it was half-jokingly labelled "LGM-1" for "little green men" before being understood. Their rotation is so stable that pulsars are used as natural clocks — to test general relativity, and, through pulsar timing arrays, to detect low-frequency gravitational waves.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-moon-phases',
    title: 'The Phases of the Moon',
    category: 'Astronomy',
    keywords: [
      'what are the phases of the moon', 'order of the moon phases', 'waxing and waning moon', 'why does the moon have phases',
      'is the moon phase caused by earths shadow', 'new moon full moon gibbous crescent', 'synodic month 29.5 days',
    ],
    content: `The Moon's phases are caused by how much of its sunlit half we can see from Earth as it orbits us — NOT by the Earth's shadow (that only happens during a lunar eclipse). Half the Moon is always lit by the Sun; the phase is just our changing viewing angle. The eight phases in order: new moon (between Earth and Sun, unlit side toward us), waxing crescent, first quarter (half lit, growing), waxing gibbous, full moon (Earth between Sun and Moon, fully lit face toward us), waning gibbous, third (last) quarter, waning crescent, then back to new. "Waxing" means the lit portion is growing (evening sky); "waning" means shrinking (early-morning sky). One full cycle of phases takes about 29.5 days (the synodic month), slightly longer than the 27.3-day orbit because Earth is also moving around the Sun. The Moon keeps the same face toward Earth because it is tidally locked, rotating once per orbit.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hubble-constant',
    title: 'What the Hubble Constant Is',
    category: 'Astronomy',
    keywords: [
      'what is the hubble constant', 'hubble law expansion rate', 'kilometers per second per megaparsec', 'hubble tension',
      'why is the hubble constant not the same over time', 'how fast is the universe expanding', 'h0 value',
    ],
    content: `The Hubble constant (H0) is the current rate at which the universe is expanding, expressed as how fast a distant galaxy recedes for each unit of distance: about 70 kilometres per second for every megaparsec (about 3.26 million light years) of separation. It comes from Hubble's law, v = H0 × d — farther galaxies recede faster because there is more expanding space between us and them. It is called a "constant" because at any given moment it is the same value in every direction and everywhere in the universe; it is NOT constant over cosmic time (it was much larger in the early universe and changes as expansion speeds up or slows). Its precise value is disputed: measurements from the early universe (the cosmic microwave background) give about 67, while measurements from nearby supernovae and Cepheid stars give about 73, and the gap is statistically significant. This unresolved disagreement is called the "Hubble tension," and it may point to missing physics in the standard cosmological model.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-redshift-types',
    title: 'What Redshift Is (and Its Three Kinds)',
    category: 'Astronomy',
    keywords: [
      'what is redshift', 'doppler vs cosmological redshift', 'gravitational redshift', 'why are distant galaxies redshifted',
      'how does redshift measure distance', 'spectral line shift redshift', 'blueshift',
    ],
    content: `Redshift is the stretching of light to longer (redder) wavelengths, seen as a shift of an object's known spectral lines toward the red end of the spectrum. There are three physically distinct causes. (1) Doppler redshift: the source is moving away from us through space, so each wave crest is emitted from slightly farther away — this also works in reverse as blueshift for approaching objects (Andromeda is blueshifted). (2) Cosmological redshift: the space between us and a distant galaxy expands while the light is in transit, stretching the wave along with it. This is what dominates for distant galaxies, and a galaxy's redshift tells us both how far away it is and how far back in time we are seeing it. (3) Gravitational redshift: light loses energy climbing out of a strong gravitational field, as near a white dwarf, neutron star or black hole. Measuring how much a galaxy's lines are redshifted is one of the primary tools of observational cosmology.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-supernova-types',
    title: 'The Two Main Kinds of Supernova',
    category: 'Astronomy',
    keywords: [
      'what is a supernova', 'type ia vs type ii supernova', 'core collapse supernova', 'white dwarf supernova',
      'why are type ia supernovae standard candles', 'what triggers a supernova', 'what does a supernova leave behind',
    ],
    content: `A supernova is the explosive death of a star, briefly outshining an entire galaxy. There are two main routes. CORE-COLLAPSE (Types II, Ib, Ic): a star more than about 8 solar masses fuses heavier and heavier elements until its core is iron, which cannot release energy by fusing. The core collapses in under a second, rebounds, and the star's outer layers are blasted off, leaving a neutron star or, for the most massive stars, a black hole, plus an expanding remnant. THERMONUCLEAR (Type Ia): a white dwarf in a binary system pulls matter from its companion until it nears the Chandrasekhar limit (about 1.4 solar masses), triggering a runaway carbon-fusion detonation that destroys it completely, leaving no remnant. Because Type Ia explosions all reach nearly the same peak brightness, they are used as "standard candles" to measure cosmic distances — the tool that revealed the accelerating expansion of the universe. Supernovae also forge and scatter most of the elements heavier than iron.`,
    createdAt: Date.now(),
  },
];
