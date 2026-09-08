import { KnowledgeItem } from '../../types';

// Batch 49 (quantum physics) gap-fills. Live misses on nexus-4b: "what is spin
// in quantum mechanics" -> answered the Heisenberg uncertainty principle; "the
// photoelectric effect" -> "light hits silicon... like a camera sensor" (an
// application, missed the frequency threshold and Einstein); "quantum of
// energy" -> muddled with the wave-function boilerplate; "observer effect" ->
// "observing forces the particle to choose wave or particle"; "classical vs
// quantum" -> a cut-off web dump.
export const QUANTUM_PHYSICS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-quantum-spin',
    title: 'What Spin Is in Quantum Mechanics',
    category: 'Physics',
    keywords: [
      'what is spin in quantum mechanics', 'what is quantum spin', 'is spin actual spinning', 'spin 1/2 particle',
      'what is spin up and spin down', 'fermion vs boson spin', 'pauli exclusion principle spin',
    ],
    content: `Spin is an intrinsic form of angular momentum that fundamental particles carry — a fixed, built-in property like mass or charge, NOT the particle physically rotating (a point-like electron spinning fast enough to give its measured angular momentum would have its surface moving faster than light). Spin is quantized: it comes only in multiples of ħ/2. An electron, proton or neutron is "spin-1/2," meaning a measurement of its spin along any axis gives just one of two results, conventionally "spin up" or "spin down." Spin gives a charged particle a tiny magnetic moment, which is what makes it respond to magnetic fields (the basis of MRI and electron spin resonance). Crucially, a particle's spin decides its statistics: particles with half-integer spin (1/2, 3/2 …) are FERMIONS (electrons, quarks) and obey the Pauli exclusion principle — no two can occupy the same quantum state, which is why atoms have structure and matter takes up space; particles with integer spin (0, 1, 2) are BOSONS (photons, gluons, the Higgs) and can pile into the same state, which allows lasers and superfluids. This is completely separate from the uncertainty principle.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-photoelectric-effect',
    title: 'What the Photoelectric Effect Is',
    category: 'Physics',
    keywords: [
      'what is the photoelectric effect', 'einstein photoelectric effect', 'why does light eject electrons from metal',
      'photoelectric effect threshold frequency', 'work function photoelectric', 'why did the photoelectric effect need photons',
    ],
    content: `The photoelectric effect is the ejection of electrons from a metal surface when light shines on it. The puzzling part, discovered around 1900, is that it depends on the light's FREQUENCY (colour), not its intensity: below a certain threshold frequency, no electrons come out no matter how bright the light or how long you wait; above the threshold, electrons come out immediately, and turning up the brightness just gives you MORE electrons, not faster ones. Classical wave theory couldn't explain this — brighter should mean more energy per electron. In 1905 Einstein explained it by proposing that light itself comes in discrete packets (photons) with energy E = hf (Planck's constant times frequency). Each photon gives all its energy to one electron; if that energy exceeds the "work function" holding the electron in the metal, the electron escapes with the leftover as kinetic energy — if not, nothing happens. This was direct evidence that light is quantized, a founding result of quantum theory, and it won Einstein the 1921 Nobel Prize (not relativity). It's used in light meters, solar cells, night-vision tubes and image sensors.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-quantum-of-energy',
    title: 'What a Quantum of Energy Is',
    category: 'Physics',
    keywords: [
      'what is a quantum of energy', 'what does quantized mean', 'why does energy come in packets', 'planck quantum hypothesis',
      'what is a photon energy packet', 'is energy continuous or discrete', 'e equals h f',
    ],
    content: `A "quantum" is the smallest indivisible amount of a physical quantity that a system can gain or lose — the word means "how much." A quantum of energy is one such minimum packet. The idea began in 1900 when Max Planck found he could only explain the light emitted by a hot object ("blackbody radiation") if he assumed the object's vibrating atoms could only emit or absorb energy in discrete chunks, each of size E = hf, where f is the frequency and h is Planck's constant (6.626 × 10⁻³⁴ J·s). For light, one quantum is a photon. So energy at the atomic scale is not a smooth, continuous flow — it's grainy, delivered in whole units, like coins rather than a stream of water. This is why an atom's electrons sit at specific energy levels and jump between them by absorbing or emitting a photon of exactly the right energy, and why hot gases glow in sharp spectral lines. At everyday scales the quanta are so tiny that energy looks perfectly continuous.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-observer-effect',
    title: 'What the Observer Effect Is (and Is Not)',
    category: 'Physics',
    keywords: [
      'what is the observer effect in physics', 'does observing change quantum particles', 'does consciousness collapse the wave function',
      'measurement problem quantum', 'which-path information double slit', 'observer effect vs measurement problem',
    ],
    content: `In physics the "observer effect" means that measuring a system unavoidably disturbs it, because measurement requires an interaction. At the quantum scale this is dramatic: to detect exactly where an electron is, you have to bounce something off it (a photon), which kicks it and changes its momentum. In the double-slit experiment, any device that records which slit each particle went through (extracting "which-path information") destroys the interference pattern — the particles then act like classical particles. Two important clarifications: (1) it does NOT require a conscious observer or a mind — a detector, a stray gas molecule, or any interaction that leaves a permanent record does it just as well; "observation" here just means "interaction that extracts information." (2) It's related to, but not the same as, the "measurement problem" — the deeper puzzle of why and how a quantum system in a superposition ends up with one definite outcome when measured, which the leading modern answer (decoherence) explains as the system entangling with its environment.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-classical-vs-quantum',
    title: 'Classical Physics vs Quantum Physics',
    category: 'Physics',
    keywords: [
      'what is the difference between classical and quantum physics', 'classical vs quantum physics', 'when does quantum physics apply',
      'why does classical physics still work', 'is quantum physics only for small things', 'correspondence principle',
    ],
    content: `Classical physics (Newton's mechanics, Maxwell's electromagnetism, thermodynamics) describes the everyday world extremely well: objects have definite positions and velocities at all times; if you know the present exactly you can predict the future exactly (determinism); energy, position and momentum vary smoothly and continuously; and particles and waves are separate things. Quantum physics takes over at atomic and subatomic scales, and there it's fundamentally different: a particle doesn't have a definite position and momentum simultaneously (uncertainty principle); before measurement it can be in a superposition of possibilities and only PROBABILITIES of outcomes can be predicted (the Born rule); energy and other quantities come in discrete "quanta"; and matter and light both show wave AND particle behaviour. Classical physics isn't "wrong" — it's an excellent approximation that emerges from quantum physics when huge numbers of particles are involved and the quantum effects average out (the "correspondence principle"). You need quantum mechanics to understand atoms, chemistry, lasers, semiconductors, superconductors and nuclear physics; you use classical mechanics to build a bridge or launch a rocket.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-double-slit',
    title: 'What the Double-Slit Experiment Shows',
    category: 'Physics',
    keywords: [
      'what is the double slit experiment', 'double slit interference pattern', 'what happens when you observe which slit',
      'why does the interference pattern disappear', 'electrons behave as waves double slit', 'single particle interference',
    ],
    content: `In the double-slit experiment, particles (light, electrons, even large molecules) are fired one at a time at a barrier with two narrow parallel slits, and where each one lands is recorded on a screen behind. Classically you'd expect two bands lining up with the slits. Instead you get an interference pattern — many alternating bright and dark stripes — the signature of waves overlapping, where each part of the wave that went through slit A adds to or cancels the part that went through slit B. The strange part: this builds up even when particles go through ONE AT A TIME with long gaps between them, so each particle somehow "interferes with itself," as if it went through both slits at once (a superposition). The stranger part: if you put a detector at the slits to find out which one each particle actually goes through, the interference pattern vanishes and you get the two classical bands — the act of gaining which-path information forces particle-like behaviour. This one experiment captures superposition, wave-particle duality, and the effect of measurement, and Feynman called it the central mystery of quantum mechanics.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-uncertainty-principle-clean',
    title: 'What the Uncertainty Principle Is',
    category: 'Physics',
    keywords: [
      'what is the uncertainty principle', 'heisenberg uncertainty principle explained', 'why cant you know position and momentum',
      'is the uncertainty principle just measurement disturbance', 'delta x delta p', 'energy time uncertainty',
    ],
    content: `Heisenberg's uncertainty principle says there is a fundamental limit on how precisely certain pairs of properties of a quantum object can be known at the same time. The most famous pair is position and momentum: the product of the uncertainties satisfies Δx · Δp ≥ ħ/2. The more sharply defined a particle's position, the more spread out its momentum must be, and vice versa. Crucially, this is NOT just because measuring one disturbs the other (that's a real effect but a separate idea) — it's because a quantum object is described by a wave, and a wave that is localised in space is necessarily built from a wide range of wavelengths (which correspond to momenta). A particle simply does not possess a simultaneously exact position and momentum. There's a similar relation between energy and time, which is why "virtual particles" can briefly appear, and why unstable states have a spread in energy. It's a statement about nature, not about our instruments, and it sets the ultimate limit on measurement precision.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-schrodingers-cat',
    title: "What Schrödinger's Cat Is",
    category: 'Physics',
    keywords: [
      "what is schrodinger's cat", 'schrodinger cat thought experiment', 'is the cat alive and dead at the same time',
      'what was schrodinger trying to show', 'macroscopic superposition', 'schrodinger cat meaning',
    ],
    content: `Schrödinger's cat is a thought experiment Erwin Schrödinger devised in 1935 — and it was a CRITICISM of a naive reading of quantum mechanics, not an endorsement. Setup: a cat is sealed in a box with a radioactive atom, a Geiger counter, and a vial of poison rigged so that if the atom decays (a genuinely random quantum event) the counter triggers, the vial breaks, and the cat dies. After one half-life, the atom is in a 50/50 quantum superposition of "decayed" and "not decayed." If you take the maths literally and let that superposition scale up, the whole system — including the cat — should be in a superposition of "dead" and "alive" until someone opens the box and looks. Schrödinger's point was that this is absurd for a large everyday object: a cat is never actually both. The puzzle it dramatises — why we see definite outcomes for big things but superposition for atoms — is the "measurement problem," and the modern answer is decoherence: a macroscopic object interacts so strongly and quickly with its surroundings that any superposition is destroyed almost instantly, so the cat is really just alive or dead the whole time.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-photon',
    title: 'What a Photon Is',
    category: 'Physics',
    keywords: [
      'what is a photon', 'is light made of particles', 'does a photon have mass', 'how fast does a photon travel',
      'what is the energy of a photon', 'photon vs electron', 'is a photon a wave or a particle',
    ],
    content: `A photon is the quantum of light — the smallest indivisible packet of electromagnetic energy. All light and other electromagnetic radiation (radio waves, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays) is made of photons. Each photon carries an energy E = hf, proportional to its frequency, so a blue photon carries more energy than a red one and an X-ray photon far more still. A photon has NO rest mass and no electric charge, it always travels at the speed of light in a vacuum (it can never be slowed or at rest), and it does carry momentum despite being massless (which is how solar sails and radiation pressure work). It shows both wave behaviour (interference, diffraction, polarisation) and particle behaviour (arriving as discrete "hits," ejecting one electron at a time in the photoelectric effect). In particle physics the photon is also the "gauge boson" that carries the electromagnetic force between charged particles — but for most purposes, "a photon is a particle of light" is the useful answer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wave-function',
    title: 'What a Wave Function Is',
    category: 'Physics',
    keywords: [
      'what is a wave function', 'what does the wave function represent', 'what is psi in quantum mechanics', 'born rule',
      'what is wave function collapse', 'schrodinger equation wave function', 'is the wave function real',
    ],
    content: `The wave function (written ψ, "psi") is the mathematical object that contains everything knowable about a quantum system's state. It's a spread-out, complex-valued function over all the possible values of a property (for a single particle, over all positions). You don't observe ψ directly; instead, by the "Born rule," the square of its magnitude, |ψ|², gives the PROBABILITY of getting each possible result if you measure — so a wave function peaked around one spot means the particle is very likely to be found there, and a wave function spread over two regions is a superposition. The wave function evolves smoothly and predictably in time according to the Schrödinger equation — until a measurement is made, at which point (in the standard "Copenhagen" description) it appears to "collapse" abruptly to the outcome that was measured. Whether ψ is a real physical thing or just a bookkeeping device for our knowledge is still debated, and different interpretations of quantum mechanics answer that differently.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-decoherence',
    title: 'What Decoherence Is',
    category: 'Physics',
    keywords: [
      'what is decoherence', 'quantum decoherence explained', 'why do we not see quantum superposition in daily life',
      'decoherence and the measurement problem', 'why do qubits lose their state', 'environment destroys superposition',
    ],
    content: `Decoherence is the process by which a quantum system loses its "coherence" — the delicate phase relationships between the parts of a superposition — because it unavoidably interacts with its surrounding environment (stray photons, air molecules, thermal vibrations, electromagnetic fields). Each of those interactions entangles the system with the environment and carries a tiny bit of information about the system's state away, out of reach. Very quickly, the superposition is no longer contained in the system alone; it has spread into countless uncontrolled environmental degrees of freedom, and the system, viewed on its own, behaves like an ordinary classical probability mixture — one outcome or the other, not a coherent blend. This is the leading explanation for why big everyday objects never appear in superposition (why Schrödinger's cat is really just alive OR dead, essentially instantly) even though the underlying physics allows it, and it's why building a quantum computer is so hard: qubits must be isolated and kept extremely cold and shielded so decoherence doesn't scramble the computation before it finishes. Decoherence explains the APPEARANCE of collapse; it doesn't by itself explain why one particular outcome is selected.`,
    createdAt: Date.now(),
  },
];
