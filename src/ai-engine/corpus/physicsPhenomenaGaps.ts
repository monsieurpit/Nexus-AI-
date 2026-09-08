import { KnowledgeItem } from '../../types';

// Batch 65 (physics phenomena, deeper). nexus-4b misses: "what is surface
// tension" answered entirely about refraction and a straw in water; "how does
// a transistor work" was circular ("transistors amplify signals by using
// transistors"); "how do fiber optic cables carry data" drifted into which
// companies own the submarine cables; "how does a laser work" and "what is
// resonance" were vague; helium-voice answer repeated the myth that the vocal
// cords change frequency.
export const PHYSICS_PHENOMENA_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-surface-tension',
    title: 'What Surface Tension Is',
    category: 'Physics',
    keywords: [
      'what is surface tension', 'why does water form droplets', 'how do water striders walk on water', 'surface tension explained',
      'why does a paperclip float on water', 'capillary action surface tension', 'how does soap reduce surface tension',
    ],
    content: `Surface tension is the tendency of a liquid's surface to behave like a stretched elastic skin, and it has nothing to do with refraction or light. Inside the liquid, each molecule is pulled equally in all directions by its neighbours. A molecule at the surface has neighbours beside and below it but none above, so the net pull is inward and sideways. This makes the surface contract to the smallest possible area and resist being broken. Consequences: water pulls itself into round droplets, small insects (water striders) and a carefully placed paperclip can rest on top without sinking, and liquid climbs a narrow tube (capillary action). Water has an unusually high surface tension (about 72 millinewtons per metre at room temperature) because of hydrogen bonding. Soap and other surfactants have molecules that sit in the surface and disrupt those bonds, lowering the surface tension — which is why soapy water wets and cleans surfaces that plain water beads up on.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-transistor-works',
    title: 'How a Transistor Works',
    category: 'Physics',
    keywords: [
      'how does a transistor work', 'what does a transistor actually do', 'transistor as a switch and amplifier', 'base collector emitter',
      'gate source drain mosfet', 'how does a small current control a large current', 'why transistors replaced vacuum tubes',
    ],
    content: `A transistor is a small semiconductor device with three terminals, and the key idea is that a small signal on one terminal controls a much larger current flowing between the other two. In a bipolar transistor the terminals are the base, collector and emitter; a tiny base current allows a large collector-to-emitter current to flow. In a MOSFET (the type used in computer chips) they are the gate, source and drain; a voltage on the insulated gate creates or removes a conducting channel between source and drain. Either way the transistor does two jobs: as an AMPLIFIER, small changes in the control signal produce large changes in the output current (used in audio, radio, sensors); as a SWITCH, the control signal turns the main current fully on or fully off, representing the 1s and 0s of digital logic. Transistors are made of doped silicon forming p-n junctions. They replaced vacuum tubes because they are tiny, cheap, low-power, reliable and fast — a modern processor packs tens of billions of them. Invented at Bell Labs in 1947 by Bardeen, Brattain and Shockley.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fiber-optics-data',
    title: 'How Fibre-Optic Cables Carry Data',
    category: 'Physics',
    keywords: [
      'how do fiber optic cables carry data', 'total internal reflection fiber optic', 'how does light travel down a glass fiber',
      'fiber optic core and cladding', 'why is fiber faster than copper', 'how is data encoded in fiber optics',
    ],
    content: `A fibre-optic cable carries data as pulses of light down an extremely thin, pure glass strand. The strand has two layers: a central "core" and an outer "cladding" with a slightly lower refractive index. When light travelling in the core hits the core-cladding boundary at a shallow angle, it is completely reflected back into the core instead of leaking out — this is "total internal reflection." So the light bounces along the inside of the fibre, following it around bends, for many kilometres with very little loss. At the sending end, a laser or LED switches on and off (or shifts between states) to encode bits; often many different wavelengths (colours) are sent down the same fibre at once to multiply the capacity. At the receiving end a photodetector converts the light pulses back into an electrical signal. Fibre beats copper for long-distance data because it has enormously more bandwidth, loses far less signal over distance, and is immune to electromagnetic interference.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-laser-works',
    title: 'How a Laser Works',
    category: 'Physics',
    keywords: [
      'how does a laser work', 'what does laser stand for', 'stimulated emission explained', 'population inversion laser',
      'why is laser light coherent', 'laser gain medium mirrors', 'difference between laser light and a flashlight',
    ],
    content: `LASER stands for "Light Amplification by Stimulated Emission of Radiation." It has three parts: a gain medium (a gas, a crystal, or a semiconductor), an energy source that "pumps" it, and two mirrors facing each other around the medium. Pumping energy in raises many atoms to an excited state — more excited than unexcited, a condition called "population inversion." When one photon of exactly the right energy passes an excited atom, it triggers that atom to drop down and emit a second photon that is identical in wavelength, direction, and phase — "stimulated emission." Those two photons trigger more, and the mirrors bounce the light back and forth through the medium so the effect builds up. One mirror is slightly transparent, letting a fraction out as the beam. Because every photon is a copy, laser light is coherent (waves in step), monochromatic (one colour), and tightly collimated (barely spreads) — unlike a flashlight, which emits many wavelengths in all directions and phases.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-centripetal-force',
    title: 'What Centripetal Force Is (and Centrifugal Force)',
    category: 'Physics',
    keywords: [
      'what is centripetal force', 'centripetal vs centrifugal force', 'what keeps an object moving in a circle',
      'why do you feel pushed outward on a turn', 'is centrifugal force real', 'centripetal force examples',
    ],
    content: `Centripetal force is the net force that must point toward the centre of a circle to keep an object moving along that circular path. It is not a new kind of force — it is whatever real force happens to be doing the job: the tension in a string for a whirled ball, gravity for a satellite, friction between tyres and road for a car turning, the normal force from a wall for a rider on a spinning carnival ride. Its size is mv²/r (mass times speed squared, divided by the radius), so tighter turns and higher speeds need much more force. Without it the object would fly off in a straight line (Newton's first law). "Centrifugal force" is the outward push you seem to feel on a turn: it is not a real force acting on you, it is your body's inertia trying to continue straight while the centripetal force pulls your path into the curve. It only appears as a "force" if you do the maths in the rotating reference frame.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-resonance-physics',
    title: 'What Resonance Is in Physics',
    category: 'Physics',
    keywords: [
      'what is resonance in physics', 'natural frequency resonance', 'why does pushing a swing at the right time work',
      'resonance examples wine glass bridge', 'why does a radio tune to one station', 'mechanical resonance',
    ],
    content: `Every object or system that can oscillate has one or more "natural frequencies" — the rates at which it vibrates when disturbed and left alone. Resonance is what happens when you drive that system with a repeating push at (or very near) one of its natural frequencies: each push adds energy in step with the motion, so the amplitude grows much larger than the same push at any other frequency. Everyday examples: pumping your legs at the right rhythm makes a swing go higher; a singer holding the exact pitch of a wine glass can shatter it; a radio or TV circuit is tuned so that just one broadcast frequency resonates and is amplified while the rest are ignored; soldiers break step crossing a bridge so their marching doesn't hit its natural frequency (the Tacoma Narrows bridge failure in 1940 involved wind-driven oscillation). Resonance is also central to musical instruments, MRI scanners, and how microwave ovens and atoms absorb specific frequencies.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-helium-voice',
    title: 'Why Helium Makes Your Voice Sound Squeaky',
    category: 'Physics',
    keywords: [
      'why does helium make your voice squeaky', 'does helium change your vocal cords', 'speed of sound in helium',
      'helium voice formants explained', 'why does helium make you sound like a chipmunk', 'does helium raise your pitch',
    ],
    content: `Breathing helium does NOT change how fast your vocal cords vibrate, so the actual pitch (the fundamental frequency) stays roughly the same. What changes is the sound's timbre. Sound travels almost three times faster in helium than in ordinary air because helium is much less dense. The air-filled cavities of your throat and mouth act as resonators that reinforce certain frequencies, called formants; the frequency of a resonator depends on the speed of sound in the gas filling it. With helium in there, all those resonant formant frequencies shift sharply upward, so the higher harmonics of your voice are emphasised and the lower ones are weakened — giving that thin, quacky "chipmunk" quality. It is like changing the gas in an organ pipe rather than changing the reed. (Breathing pure helium is dangerous because it displaces oxygen — it can cause you to pass out.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-torque',
    title: 'What Torque Is',
    category: 'Physics',
    keywords: [
      'what is torque', 'torque force times distance', 'torque vs horsepower', 'why is a longer wrench easier',
      'newton metres torque', 'rotational equivalent of force', 'what causes something to spin',
    ],
    content: `Torque is the rotational equivalent of force — it is what causes an object to start spinning, spin faster, or slow its spin. It equals the applied force multiplied by the perpendicular distance from the pivot to the line of the force (the "lever arm"), and is measured in newton-metres. That distance is why a long wrench loosens a stuck bolt that a short one can't: same hand force, bigger lever arm, more torque. The same force applied straight at the pivot produces zero torque. In a car engine, torque is the twisting effort delivered to the wheels — high torque gives strong pull from low speed and when towing — while horsepower is the rate of doing work (torque times rotational speed), which matters more for top-end acceleration and maximum speed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-microwave-heating',
    title: 'How a Microwave Oven Heats Food',
    category: 'Physics',
    keywords: [
      'how does a microwave oven heat food', 'do microwaves heat from the inside out', 'dielectric heating water molecules',
      'magnetron 2.45 ghz', 'why do microwaves heat unevenly', 'why does metal spark in a microwave',
    ],
    content: `A microwave oven contains a magnetron, a vacuum tube that produces electromagnetic waves at about 2.45 gigahertz (a wavelength of roughly 12 cm). These waves fill the metal box and pass into the food. Water (and to a lesser extent fat and sugar) molecules are electric dipoles: the oscillating field makes them flip back and forth billions of times a second, and the friction between the jostling molecules turns that motion into heat — this is "dielectric heating." It is a myth that microwaves heat "from the inside out": they penetrate only about 1–2 cm, and the interior of a thick item warms afterwards by ordinary conduction from the outer layer. Heating is uneven because the waves form a standing-wave pattern of hot and cold spots, which is why ovens have a turntable and why you should stir and let food stand. Metal with thin edges or points concentrates the field enough to ionise the air and spark, so it is kept out.`,
    createdAt: Date.now(),
  },
];
