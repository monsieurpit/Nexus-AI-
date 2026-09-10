import { KnowledgeItem } from '../../types';

/**
 * PHYSICS_CONCEPTS_GAPS_2 — batch 243 corrections.
 * nexus-4b was strong on mechanics/electricity. Misses:
 * - "reflection vs refraction": said Snell's law governs reflection (it is
 *   refraction).
 * - "frequency vs wavelength": stated "speed times frequency equals wavelength"
 *   (v = f x lambda means speed = frequency x wavelength).
 * - "convex vs concave lenses": said a convex lens "spreads light out".
 * - "real vs virtual image": answered about VR headsets.
 * - "infrared vs ultraviolet": said a microwave oven uses infrared.
 * - "elastic vs inelastic collisions": said total energy is lost (it is kinetic
 *   energy).
 * - "transverse vs longitudinal wave" used a compressed slinky as a transverse
 *   example.
 * - "force vs pressure", "pitch vs loudness", "transparent/translucent/opaque"
 *   were cut before the second half.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'physics', keywords, content, createdAt: now,
});

export const PHYSICS_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-phys2-force-vs-pressure',
    'Force vs pressure',
    [
      'difference between force and pressure', 'force is a push or a pull measured in newtons a vector', 'pressure is force spread over an area force divided by area measured in pascals',
      'same force small area high pressure large area low pressure', 'knife edge stiletto heel versus snowshoes', 'P = F / A',
    ],
    `A FORCE is a push or a pull on an object. It has a size and a direction (a vector) and is measured in newtons (N). A force can change an object's speed, direction, or shape.

PRESSURE is how concentrated a force is over the AREA it acts on: pressure = force / area (P = F/A), measured in pascals (Pa = N/m^2). The SAME force produces very different pressures depending on the area it is spread over.

That is why the area matters more than the force in many everyday cases: a knife blade or a stiletto heel puts a modest force onto a tiny area, giving enormous pressure that cuts or dents; snowshoes spread your weight over a large area, giving low pressure so you don't sink; a sharp drawing pin needs only a light push to go into wood because all the force is concentrated on the point. Pressure in fluids also increases with depth and pushes equally in all directions.`,
  ),
  k(
    'kb-gap-phys2-reflection-vs-refraction',
    'Reflection vs refraction',
    [
      'difference between reflection and refraction', 'reflection light bounces off a surface angle of incidence equals angle of reflection', 'refraction light bends as it passes from one medium into another because its speed changes',
      'Snells law governs refraction not reflection', 'a mirror reflects a straw in water looks bent because of refraction', 'both can happen at the same surface',
    ],
    `REFLECTION is light (or any wave) BOUNCING OFF a surface without entering the new material. It obeys the LAW OF REFLECTION: the angle of incidence equals the angle of reflection (both measured from the normal, the line perpendicular to the surface). A mirror, a still pond, and shiny metal reflect light.

REFRACTION is light BENDING as it PASSES from one transparent medium into another (air to glass, air to water) because its SPEED changes. Going into a denser medium it slows and bends toward the normal; coming out it speeds up and bends away. This is why a straw in a glass of water looks broken at the surface, why a pool looks shallower than it is, and how lenses and prisms work. The amount of bending is given by SNELL'S LAW (n1 sin theta1 = n2 sin theta2) — which describes REFRACTION, not reflection.

Both can occur at the same boundary at once: looking at a lake you see some light reflected off the surface (the sky, glare) and some refracted into the water (fish, the bottom).`,
  ),
  k(
    'kb-gap-phys2-refraction-vs-diffraction',
    'Refraction vs diffraction',
    [
      'difference between refraction and diffraction', 'refraction is bending when a wave crosses into a new medium and changes speed', 'diffraction is a wave spreading out as it passes through a gap or around an obstacle',
      'refraction needs a boundary between media diffraction needs an edge or aperture', 'diffraction is strongest when the gap is about the size of the wavelength', 'sound bending around a doorway',
    ],
    `Both involve waves changing direction, but for different reasons.

REFRACTION happens when a wave CROSSES A BOUNDARY into a different medium and its SPEED changes, which bends the wavefront. It needs two media (air/glass, air/water). Examples: a lens focusing light, a straw looking bent in water, sound bending as it moves between warm and cold air layers.

DIFFRACTION happens when a wave passes THROUGH A GAP or AROUND THE EDGE of an obstacle and SPREADS OUT into the region behind it. It needs an edge or an aperture, not a change of medium. The effect is largest when the gap is roughly the size of the wavelength: sound (long wavelength) diffracts strongly around a doorway so you can hear someone in the next room; light (tiny wavelength) diffracts only slightly, which is why shadows have fuzzy edges and why a CD splits light into colours.

Short version: refraction = bending due to a speed change at a boundary; diffraction = spreading out past an edge or through a slit.`,
  ),
  k(
    'kb-gap-phys2-frequency-vs-wavelength',
    'Frequency vs wavelength',
    [
      'difference between frequency and wavelength', 'frequency is how many wave cycles pass a point per second measured in hertz', 'wavelength is the distance between two consecutive matching points on a wave one full cycle',
      'wave equation speed equals frequency times wavelength v = f lambda', 'for a fixed speed higher frequency means shorter wavelength', 'not speed times frequency equals wavelength',
    ],
    `FREQUENCY (f) is how many complete wave cycles pass a fixed point each SECOND, measured in hertz (Hz). It is a property of the source (how fast it vibrates) and does not change when the wave enters a new medium.

WAVELENGTH (lambda) is the DISTANCE over one complete cycle — e.g. from one crest to the next crest — measured in metres.

They are linked by the WAVE EQUATION: speed = frequency x wavelength, written v = f x lambda. (Read carefully: SPEED equals frequency times wavelength — NOT "speed times frequency equals wavelength".) Rearranged, wavelength = v / f.

So for a wave travelling at a fixed speed, frequency and wavelength are INVERSELY proportional: double the frequency and the wavelength halves. Red light has a lower frequency and longer wavelength than blue light; a bass note has a lower frequency and longer wavelength than a treble note. When a wave passes into a slower medium its speed and wavelength both drop while its frequency stays the same.`,
  ),
  k(
    'kb-gap-phys2-amplitude-vs-frequency',
    'Amplitude vs frequency',
    [
      'difference between amplitude and frequency', 'amplitude is the maximum displacement of the wave from its rest position related to energy and intensity', 'frequency is the number of cycles per second related to pitch for sound and colour for light',
      'louder sound bigger amplitude higher pitch higher frequency', 'brighter light bigger amplitude bluer light higher frequency', 'the two are independent',
    ],
    `AMPLITUDE is the SIZE of a wave — the maximum distance the medium (or field) moves from its rest position, measured at the peak. It carries the wave's ENERGY: bigger amplitude means more energy and higher intensity. For sound, larger amplitude = LOUDER; for light, larger amplitude = BRIGHTER; for a water wave, larger amplitude = taller wave.

FREQUENCY is how OFTEN the wave oscillates — cycles per second (Hz). It sets the "character" of the wave: for sound, higher frequency = higher PITCH; for light, higher frequency = shift toward the blue/violet (and then ultraviolet) end; for a swing, more pushes per minute.

They are INDEPENDENT. A sound can be loud and low (a bass drum), quiet and low (a distant rumble), loud and high (a scream), or quiet and high (a faint whistle). Changing the volume knob changes amplitude; changing the note changes frequency.`,
  ),
  k(
    'kb-gap-phys2-pitch-vs-loudness',
    'Pitch vs loudness (sound)',
    [
      'difference between pitch and loudness', 'pitch is how high or low a sound is determined by its frequency', 'loudness is how loud a sound is determined by its amplitude and intensity measured in decibels',
      'a piccolo and a tuba differ in pitch a whisper and a shout differ in loudness', 'the two are independent properties of a sound',
    ],
    `PITCH is how HIGH or LOW a note sounds. It is set by the sound wave's FREQUENCY — the number of vibrations per second. High frequency (a piccolo, a whistle, a child's voice) = high pitch; low frequency (a tuba, a bass drum, a foghorn) = low pitch. Doubling the frequency raises the pitch by one octave.

LOUDNESS is how LOUD or quiet a sound is. It is set by the wave's AMPLITUDE / intensity — how much energy it carries, which relates to how far the air particles are pushed. It is measured on the decibel (dB) scale, which is logarithmic (every +10 dB is roughly a doubling of perceived loudness).

They are independent: you can play the same note (same pitch) softly or loudly (different loudness), and you can play a high note and a low note at the same volume. A tuba played gently is low and quiet; a piccolo played hard is high and loud.`,
  ),
  k(
    'kb-gap-phys2-transverse-vs-longitudinal',
    'Transverse vs longitudinal waves',
    [
      'difference between a transverse and a longitudinal wave', 'transverse the particles move perpendicular to the direction the wave travels crests and troughs', 'longitudinal the particles move parallel to the direction the wave travels compressions and rarefactions',
      'light water surface waves rope waves and S-waves are transverse', 'sound a pushed slinky and P-waves are longitudinal', 'both transfer energy without transferring matter',
    ],
    `Both carry energy through a medium without carrying the medium along; the difference is the DIRECTION the particles wobble relative to the direction the wave moves.

In a TRANSVERSE wave the particles oscillate PERPENDICULAR (at right angles) to the direction of travel. The wave has crests and troughs. Examples: a wave on a rope you flick up and down, ripples on water, all electromagnetic waves (light, radio, X-rays), and seismic S-waves. Only transverse waves can be polarised.

In a LONGITUDINAL wave the particles oscillate PARALLEL to (back and forth along) the direction of travel, creating regions where particles bunch up (compressions) and spread out (rarefactions). Examples: sound waves in air, a slinky you push and pull along its length, and seismic P-waves.

(Note: a slinky shaken side to side shows a transverse wave; a slinky pushed along its length shows a longitudinal one — the classic demo uses it both ways.)`,
  ),
  k(
    'kb-gap-phys2-real-vs-virtual-image',
    'Real vs virtual image (optics)',
    [
      'difference between a real and a virtual image', 'a real image forms where light rays actually converge can be projected onto a screen inverted', 'a virtual image forms where rays only appear to diverge from cannot be projected seen by looking into the optical device usually upright',
      'projector camera and the image on your retina are real', 'a plane mirror image and a magnifying glass held close give virtual images', 'not about VR headsets',
    ],
    `This is an optics idea about where an image is formed by mirrors and lenses (nothing to do with VR headsets).

A REAL IMAGE forms at a place where light rays ACTUALLY CONVERGE (cross). Because real light is there, you can catch it on a screen or piece of paper. Real images are produced by a converging lens or concave mirror when the object is beyond the focal point, and they are usually INVERTED (upside down). Examples: the image a projector throws on a wall, the image a camera lens forms on the sensor, the image your eye's lens forms on your retina, the image of a distant object through a magnifying glass held far from it.

A VIRTUAL IMAGE forms where rays only APPEAR to come from when you trace them backwards — the light does not actually pass through that point, so it cannot be projected onto a screen. You see it only by looking INTO the mirror or lens. Virtual images are usually UPRIGHT. Examples: your reflection in a flat (plane) mirror (appears to be behind the glass), the enlarged image in a magnifying glass held close to the object, the reduced image in a diverging (concave) lens or a convex security mirror.`,
  ),
  k(
    'kb-gap-phys2-convex-vs-concave-lens',
    'Convex vs concave lenses',
    [
      'difference between convex and concave lenses', 'a convex converging lens is thicker in the middle bends parallel rays together to a real focal point magnifies corrects farsightedness', 'a concave diverging lens is thinner in the middle spreads parallel rays apart from a virtual focal point corrects nearsightedness',
      'convex used in magnifying glasses cameras projectors the eye', 'concave used in peepholes and to correct myopia', 'convex does not spread light out',
    ],
    `A CONVEX lens (also "converging" or "positive") is THICKER in the middle than at the edges. It bends parallel light rays TOGETHER so they meet at a real focal point beyond the lens. It can form real, magnified or reduced images (cameras, projectors, the lens in your eye) or, held close to something, a magnified virtual image (a magnifying glass). In vision correction it is used for FARSIGHTEDNESS (hyperopia), adding converging power so the image lands on the retina. (A convex lens converges light — it does NOT spread it out.)

A CONCAVE lens (also "diverging" or "negative") is THINNER in the middle than at the edges. It bends parallel rays APART, so they appear to spread out from a virtual focal point in front of the lens. It always forms a reduced, upright, virtual image. It is used for NEARSIGHTEDNESS (myopia), removing some converging power so a too-strong eye focuses on the retina, and in door peepholes and the viewfinders of some cameras.

Memory aid: convex CAVES OUT toward you and Concentrates light; conCAVE caves IN and Cancels/spreads it.`,
  ),
  k(
    'kb-gap-phys2-transparent-translucent-opaque',
    'Transparent vs translucent vs opaque',
    [
      'difference between transparent translucent and opaque', 'transparent lets light pass through with little scattering you can see clearly through it glass clean water', 'translucent lets light through but scatters it you see light and blurry shapes but not detail frosted glass wax paper',
      'opaque lets no light through you cannot see through it at all wood metal cardboard', 'a spectrum of how much light a material transmits',
    ],
    `These describe how much LIGHT a material lets pass through it.

TRANSPARENT materials transmit almost all the light that hits them, with little scattering, so you can see CLEARLY through them and make out fine detail on the other side. Examples: clear glass, clean water, clear plastic wrap, air.

TRANSLUCENT materials let SOME light through but SCATTER it as it passes, so you can tell there is light and see vague, blurry shapes and colours, but NOT sharp detail. Examples: frosted or textured glass, wax paper, tissue paper, thin curtains, a lampshade, skin held to a torch.

OPAQUE materials transmit NO light — it is all absorbed or reflected — so you cannot see through them at all. Examples: wood, metal, cardboard, brick, a book, most painted surfaces.

It is really a spectrum from fully transparent to fully opaque, and it can depend on thickness (a sheet of paper is translucent, a ream is opaque) and wavelength (glass is transparent to visible light but opaque to much ultraviolet).`,
  ),
  k(
    'kb-gap-phys2-infrared-vs-ultraviolet',
    'Infrared vs ultraviolet',
    [
      'difference between infrared and ultraviolet', 'infrared is longer wavelength lower frequency and lower energy than visible light felt as heat thermal imaging remote controls', 'ultraviolet is shorter wavelength higher frequency and higher energy than visible light causes sunburn fluorescence and DNA damage',
      'they sit on opposite sides of the visible spectrum', 'a microwave oven uses microwaves not infrared', 'UV-A UV-B UV-C',
    ],
    `Both are invisible bands of the electromagnetic spectrum, sitting on OPPOSITE sides of visible light.

INFRARED (IR) has LONGER wavelengths, LOWER frequency, and LOWER energy than visible light (just beyond red). Warm objects emit it, and we feel it as radiant HEAT. Uses: thermal imaging and night vision, TV remote controls, heat lamps, fibre-optic communication, and astronomy that peers through dust. (A microwave oven does NOT use infrared — it uses microwaves, which are longer-wavelength still.)

ULTRAVIOLET (UV) has SHORTER wavelengths, HIGHER frequency, and HIGHER energy than visible light (just beyond violet). That higher energy makes it capable of chemical damage: it causes sunburn and skin cancer, fades dyes, and damages DNA. It also makes many substances fluoresce (glow). It is split into UV-A, UV-B, and the most dangerous UV-C (mostly blocked by the ozone layer). Uses: sterilising equipment, detecting forgeries and stains, tanning beds, and vitamin-D production in skin.

Short version: infrared = beyond red, low energy, heat; ultraviolet = beyond violet, high energy, sunburn.`,
  ),
  k(
    'kb-gap-phys2-elastic-vs-inelastic-collision',
    'Elastic vs inelastic collisions',
    [
      'difference between elastic and inelastic collisions', 'momentum is conserved in both types of collision', 'in an elastic collision total kinetic energy is also conserved',
      'in an inelastic collision some kinetic energy is converted to heat sound and deformation total kinetic energy decreases', 'perfectly inelastic the objects stick together', 'total energy is always conserved only kinetic energy is lost',
    ],
    `In BOTH kinds of collision, total MOMENTUM is conserved (the vector sum of mass x velocity is the same before and after). The difference is what happens to KINETIC ENERGY.

In an ELASTIC collision, total KINETIC ENERGY is ALSO conserved — none is converted to other forms. This is an idealisation approached by hard, springy objects: billiard balls, steel ball bearings, and (very closely) collisions between atoms and subatomic particles.

In an INELASTIC collision, total kinetic energy DECREASES — some is converted into heat, sound, and permanent deformation. Most everyday collisions are inelastic: a dropped ball that doesn't bounce back to its start height, a car crash, a punch, clay hitting a wall. A PERFECTLY (completely) inelastic collision is the extreme case where the objects STICK TOGETHER and move off as one (a bullet embedding in a block, two rail cars coupling).

Important: it is only KINETIC energy that is "lost" in an inelastic collision. TOTAL energy is always conserved — the missing kinetic energy has just turned into heat, sound, and deformation.`,
  ),
  k(
    'kb-gap-phys2-heat-capacity-vs-specific-heat',
    'Heat capacity vs specific heat capacity',
    [
      'difference between heat capacity and specific heat', 'heat capacity is the energy needed to raise the temperature of a whole object by one degree depends on its mass and material', 'specific heat capacity is the energy needed to raise one kilogram or one gram of a substance by one degree a property of the material',
      'heat capacity equals mass times specific heat capacity', 'water has a high specific heat capacity about 4200 joules per kg per kelvin', 'extensive versus intensive',
    ],
    `HEAT CAPACITY is the amount of energy needed to raise the temperature of a PARTICULAR OBJECT by 1 degree (1 K or 1 C). It depends on both what the object is made of AND how much of it there is — a swimming pool has a far larger heat capacity than a mug of the same water. Units: joules per kelvin (J/K). It is an "extensive" property (scales with size).

SPECIFIC HEAT CAPACITY is the energy needed to raise 1 KILOGRAM (or sometimes 1 gram) of a SUBSTANCE by 1 degree. It is a fixed PROPERTY OF THE MATERIAL, independent of how much you have. Units: joules per kilogram per kelvin (J/kg/K). Water's is unusually high, about 4,200 J/kg/K, which is why water heats up and cools down slowly and is used as a coolant, and why coastal climates are milder.

They connect simply: heat capacity = mass x specific heat capacity (C = m c). So specific heat tells you about the substance; heat capacity tells you about a specific lump of it.`,
  ),
  k(
    'kb-gap-phys2-alpha-beta-gamma',
    'Alpha vs beta vs gamma radiation (penetrating power)',
    [
      'difference between alpha beta and gamma radiation', 'alpha is a helium nucleus 2 protons 2 neutrons heavy slow highly ionising stopped by paper or skin', 'beta is a fast electron or positron lighter more penetrating stopped by a few mm of aluminium',
      'gamma is a high-energy photon no mass no charge least ionising most penetrating needs thick lead or concrete', 'alpha is dangerous if inhaled or swallowed gamma is a hazard from outside the body',
    ],
    `Three types of ionising radiation emitted by unstable nuclei, differing in what they are made of and how far they penetrate.

ALPHA (a): a helium nucleus — 2 protons + 2 neutrons, so relatively heavy and slow, with a +2 charge. It is the MOST IONISING (it dumps its energy quickly) but therefore the LEAST PENETRATING: a sheet of paper, a few cm of air, or the dead outer layer of skin stops it. Alpha emitters are mainly dangerous if inhaled, swallowed, or get into a wound.

BETA (b): a fast electron (b-minus) or positron (b-plus) thrown out when a neutron turns into a proton or vice versa. Light and fast, with a single charge. MODERATELY penetrating — a few millimetres of aluminium or a thick sheet of plastic stops it; it can penetrate skin.

GAMMA (g): a high-energy photon of electromagnetic radiation — NO mass, NO charge. Usually released just after alpha or beta decay as the new nucleus settles. It is the LEAST IONISING per interaction but the MOST PENETRATING: it takes several centimetres of lead or a metre or more of concrete to cut it down substantially, and it is a whole-body hazard from outside.

So ionising power: alpha > beta > gamma. Penetrating power: gamma > beta > alpha.`,
  ),
  k(
    'kb-gap-phys2-radioactivity-vs-radiation',
    'Radioactivity vs radiation',
    [
      'difference between radioactivity and radiation', 'radiation is energy travelling as waves or particles includes light heat radio microwaves as well as alpha beta gamma neutrons and X-rays', 'radioactivity is the property or process of unstable atomic nuclei spontaneously emitting radiation as they decay',
      'ionising versus non-ionising radiation', 'radioactivity is a source of one kind of radiation not all radiation is radioactive', 'becquerel measures radioactivity sievert measures dose',
    ],
    `RADIATION is the broad term for ENERGY that travels — either as electromagnetic waves or as moving particles. It covers a huge range: radio waves, microwaves, infrared (heat), visible light, ultraviolet, X-rays, gamma rays, and particle radiation like alpha, beta, and neutrons. Most of it (radio, light, heat) is harmless "non-ionising" radiation; the high-energy kinds (UV, X-ray, gamma, particles) are "ionising" and can damage cells.

RADIOACTIVITY is a specific PROPERTY / PROCESS: the spontaneous decay of unstable atomic NUCLEI, which transform into more stable ones and emit radiation (alpha, beta, gamma, sometimes neutrons) in doing so. It is measured in becquerels (decays per second).

So the relationship: a radioactive material is a SOURCE of ionising radiation, but it is not the only source — a light bulb, an X-ray machine, the Sun, and a radio transmitter all emit radiation without being radioactive. "Radioactive" describes an unstable substance; "radiation" describes the energy coming off it (or off many other things).`,
  ),
  k(
    'kb-gap-phys2-halflife-vs-decay-constant',
    'Half-life vs decay constant',
    [
      'difference between a half-life and a decay constant', 'half-life is the time for half of a radioactive sample to decay same for any starting amount', 'decay constant lambda is the probability per unit time that a given nucleus decays the fractional decay rate',
      'related by half-life equals ln 2 divided by lambda about 0.693 over lambda', 'large decay constant short half-life fast decay', 'both describe how fast a nuclide decays',
    ],
    `Both describe how quickly a particular radioactive nuclide decays; they are two forms of the same information.

The HALF-LIFE (t-half) is the TIME it takes for HALF of the radioactive atoms in any sample to decay. After one half-life, 1/2 remain; after two, 1/4; after three, 1/8. It is the same regardless of how much you start with, and it is easy to picture and measure. Half-lives range from tiny fractions of a second to billions of years (carbon-14: 5,730 years; uranium-238: 4.5 billion years).

The DECAY CONSTANT (lambda) is the PROBABILITY PER UNIT TIME that any one nucleus decays — equivalently, the fraction of the remaining nuclei that decay each second. A big lambda means rapid decay; a small lambda means slow decay.

They are directly linked: half-life = ln(2) / lambda, i.e. t-half is about 0.693 / lambda. A short half-life corresponds to a large decay constant and vice versa. Physicists often prefer lambda because it appears directly in the decay equation N = N0 e^(-lambda t); half-life is the everyday way of quoting the same rate.`,
  ),
  k(
    'kb-gap-phys2-work-vs-power',
    'Work vs power (and energy)',
    [
      'difference between work and power', 'work is energy transferred when a force moves an object work equals force times distance measured in joules', 'power is the rate of doing work energy per unit time measured in watts',
      'lifting a box does the same work whether slow or fast doing it faster needs more power', 'energy is the capacity to do work work is energy in transit',
    ],
    `WORK (in physics) is done when a FORCE moves an object through a distance in the direction of the force: work = force x distance, measured in JOULES (J). Doing work TRANSFERS energy — lifting a box gives it gravitational potential energy; pushing a trolley gives it kinetic energy. (Work and energy share the same unit because work is energy being transferred.)

POWER is the RATE of doing work — how much energy is transferred per second: power = work / time, measured in WATTS (W = J/s). It says nothing about the total job, only how quickly it is done.

Key point: carrying a box up one flight of stairs does the SAME work whether you stroll or sprint (same force, same height, so same joules). But sprinting takes less time, so it requires more POWER. A 2 kW kettle and a 1 kW kettle can both boil the same litre of water (same energy in joules); the 2 kW one just does it in half the time.

(ENERGY is the broader idea — the capacity to do work; work is energy in the act of being transferred by a force.)`,
  ),
];
