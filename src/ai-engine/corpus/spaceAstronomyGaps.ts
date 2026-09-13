import { KnowledgeItem } from '../../types';

// Batch 272 corpus fixes — space/astronomy/modern space missions.
// 9/25 misses. Notable failures: Falcon 9 vs Falcon Heavy never mentioned
// Falcon Heavy at all (answered a totally different, unasked question about
// Falcon 9 reusability); NASA vs SpaceX never explained what NASA actually
// is; LEO vs GEO gave a wildly wrong geostationary altitude ("a million and a
// half kilometers" instead of ~35,786 km); astronaut vs cosmonaut dodged the
// actual definitional question for unrelated first-woman-in-space trivia;
// red dwarf vs red giant never answered the question at all; "a planet
// shines with its own light" is a flat factual error (planets reflect
// sunlight, only stars shine); space shuttle was wrongly described as
// non-reusable (the orbiter and solid boosters WERE reused, only the external
// tank was discarded); and a genuinely bizarre hallucination claimed Laika
// (the dog on Sputnik 2, who never left her capsule) "was doing a spacewalk."

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'space',
  keywords,
  content,
  createdAt: now,
});

export const SPACE_ASTRONOMY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-space-falcon9-vs-falconheavy',
    'Falcon 9 vs Falcon Heavy',
    ['falcon 9', 'falcon heavy', 'spacex rocket', 'difference falcon'],
    "Falcon 9 and Falcon Heavy are both reusable SpaceX rockets, but Falcon Heavy is basically three Falcon 9 first-stage boosters strapped together side by side. Falcon 9 has a single first-stage core and can lift about 22,800 kg to low Earth orbit. Falcon Heavy uses two extra Falcon 9 boosters as side strap-on boosters (all three normally land and get reused), roughly tripling the power and letting it lift about 63,800 kg to low Earth orbit, making it the most powerful operational rocket in the world for years after its 2018 debut. Falcon 9 is used for routine satellite launches, Starlink, and Crew/Cargo Dragon missions to the ISS; Falcon Heavy is reserved for the heaviest payloads, like large military satellites or missions headed to the Moon or deep space that need extra lift.",
  ),
  k(
    'kb-gap-space-nasa-vs-spacex',
    'NASA vs SpaceX',
    ['nasa', 'spacex', 'difference nasa spacex', 'government space agency vs private company'],
    "NASA is the United States' government space agency, founded in 1958, funded by taxpayers through Congress, and focused on science, exploration, and setting national space policy (it doesn't sell rides or make a profit). SpaceX is a private aerospace company founded by Elon Musk in 2002 that builds and operates its own rockets and spacecraft as a business. The two work together constantly rather than compete: NASA pays SpaceX to launch cargo and astronauts (Dragon capsules on Falcon 9 rockets) to the ISS, and NASA is also paying SpaceX to build the Starship lander that will take astronauts back to the Moon under the Artemis program. NASA does research and sets requirements; SpaceX builds and flies the hardware.",
  ),
  k(
    'kb-gap-space-leo-vs-geo',
    'Low Earth orbit vs geostationary orbit',
    ['low earth orbit', 'geostationary orbit', 'leo vs geo', 'orbit altitude'],
    "Low Earth orbit (LEO) is roughly 160 to 2,000 km above Earth's surface — the ISS orbits at about 400 km and Hubble at about 535 km, close enough that a spacecraft can reach it in minutes and complete a full orbit in about 90 minutes. Geostationary orbit (GEO) is much farther out, at about 35,786 km altitude, where a satellite's orbital period exactly matches Earth's 24-hour rotation, so it appears to hang motionless over the same spot on the ground — that's why GEO is used for TV/weather satellites that need a fixed position in the sky. GEO is roughly 90 times farther from Earth than a typical LEO orbit, not the vague 'million and a half kilometers' sometimes thrown around — that number is wrong by more than an order of magnitude.",
  ),
  k(
    'kb-gap-space-astronaut-vs-cosmonaut',
    'Astronaut vs cosmonaut',
    ['astronaut', 'cosmonaut', 'difference astronaut cosmonaut'],
    "Astronaut and cosmonaut both mean 'a person trained to travel and work in space' — the difference is purely which space program trained them, not what they actually do up there. 'Astronaut' (from Greek for 'star sailor') is the term used by the United States, Canada, and most Western space agencies (NASA, ESA, CSA). 'Cosmonaut' (from Greek for 'universe sailor') is the term used by Russia and the former Soviet Union's space program. Since 2003, China has used its own term, 'taikonaut,' for its space travelers. Functionally they train for and do the same job; it's a naming convention tied to which country's program they belong to, similar to how different militaries have different ranks for the same role.",
  ),
  k(
    'kb-gap-space-reddwarf-vs-redgiant',
    'Red dwarf vs red giant star',
    ['red dwarf', 'red giant', 'star types', 'difference red dwarf red giant'],
    "A red dwarf and a red giant are opposite ends of a star's life in terms of size, even though both look reddish. A red dwarf is a small, cool, low-mass star (up to about half the Sun's mass) that burns its hydrogen fuel extremely slowly, so it can shine steadily for tens to hundreds of billions of years — they're actually the most common type of star in the galaxy. A red giant is a much bigger, aging star near the END of its life: once a star like the Sun runs out of hydrogen fuel in its core, the core contracts and the outer layers balloon outward and cool, turning the star into a giant that can be 100+ times the Sun's original diameter. In short: red dwarfs are small stars that live an extremely long time; red giants are the swollen, dying phase of a much bigger star running out of fuel.",
  ),
  k(
    'kb-gap-space-moon-vs-planet-light',
    'Moon vs planet (correcting a light-source error)',
    ['moon vs planet', 'planet shine own light', 'planets reflect sunlight'],
    "A moon (natural satellite) orbits a planet, while a planet orbits a star directly and has cleared its orbital neighborhood of other debris. One common mistake to correct: planets do NOT shine with their own light — only stars (which fuse hydrogen and produce their own light and heat) do that. Planets and moons are both visible because they reflect sunlight; neither one generates its own light. That's the actual key difference between a star and a planet, not between a moon and a planet.",
  ),
  k(
    'kb-gap-space-shuttle-reusability',
    'Space Shuttle reusability (correcting a common error)',
    ['space shuttle reusable', 'was the space shuttle reusable', 'shuttle vs expendable rocket'],
    "The Space Shuttle was actually a PARTIALLY reusable spacecraft, not a one-and-done expendable one. Its orbiter (the winged spaceplane, e.g. Discovery, Atlantis, Endeavour) flew dozens of missions each and landed like a glider for reuse; its two solid rocket boosters parachuted into the ocean and were recovered, refurbished, and reflown. Only the large orange external fuel tank was discarded on every launch, burning up in the atmosphere. This partial-reusability model (most of the vehicle reused, one big disposable part) is different from both a fully expendable rocket (the whole thing is destroyed or discarded every launch) and SpaceX's Falcon 9/Starship approach, which aims to reuse nearly everything, including the fuel tank stages themselves.",
  ),
  k(
    'kb-gap-space-spacewalk-vs-reentry',
    'Spacewalk vs reentry',
    ['spacewalk', 'reentry', 'difference spacewalk reentry', 'eva extravehicular activity'],
    "A spacewalk (technically an EVA, extravehicular activity) is when an astronaut leaves the pressurized safety of their spacecraft to work outside in the vacuum of space, wearing a pressurized spacesuit and usually tethered to the vehicle — done for tasks like repairing a satellite, doing maintenance on the ISS, or testing equipment. Reentry is a completely different phase: it's when a spacecraft comes back down through Earth's atmosphere at the end of a mission, a process that generates extreme heat (thousands of degrees) from air friction, requiring a heat shield to protect the crew or cargo inside until parachutes or a runway landing slow it down. One important correction: Laika, the dog launched aboard Sputnik 2 in 1957, never left her sealed capsule and never did a spacewalk — she remained inside the spacecraft for her entire flight, and the mission was never designed for her to survive reentry.",
  ),
  k(
    'kb-gap-space-starship-vs-shuttle',
    'Starship vs Space Shuttle',
    ['starship vs space shuttle', 'difference starship shuttle'],
    "Starship (SpaceX) and the Space Shuttle (NASA) were both designed to be reusable, but they work very differently. The Space Shuttle was a winged orbiter launched vertically on external boosters/tank and landed horizontally like a glider on a runway; it flew crewed missions mainly to low Earth orbit and the ISS from 1981 to 2011. Starship is a fully stainless-steel, two-stage rocket system (Super Heavy booster + Starship upper stage) designed to launch and land vertically, be refueled in orbit, and eventually carry crew and cargo not just to orbit but to the Moon (it's NASA's planned Artemis lunar lander) and, eventually, Mars — with the goal of reusing both stages with minimal refurbishment, unlike the Shuttle's partial reusability (see the Space Shuttle reusability entry). They're separated by roughly four decades of rocket design and very different launch/landing methods.",
  ),
];
