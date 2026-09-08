import { KnowledgeItem } from '../../types';

// Batch 13 (space/astronomy) gap-fills. Live misses: the "8 planets" answer
// listed only Mercury/Venus/Earth/Mars and called it "the whole list";
// "first person in space" got a first-person-SHOOTER web dump before recovering;
// "what is a nebula" claimed Betelgeuse is a nebula (it's a star); "nearest
// galaxy" never mentioned Andromeda.
export const SPACE_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-eight-planets',
    title: 'The Eight Planets of the Solar System',
    category: 'Astronomy',
    keywords: [
      'how many planets are in the solar system', 'what are the planets', 'name the planets',
      'planets in order', 'eight planets', 'list of planets', 'order of the planets from the sun',
      'what planets are in our solar system',
    ],
    content: `The solar system has eight planets. In order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. The first four (Mercury, Venus, Earth, Mars) are small, rocky "terrestrial" planets. The outer four (Jupiter, Saturn, Uranus, Neptune) are much larger — Jupiter and Saturn are gas giants, Uranus and Neptune are ice giants. Pluto was counted as the ninth planet until 2006, when the International Astronomical Union reclassified it as a "dwarf planet" (along with Eris, Ceres, Haumea and Makemake), because it has not cleared other objects out of its orbit in the Kuiper Belt. So any answer that stops at Mars is missing the four largest planets.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-first-person-in-space',
    title: 'The First Person in Space',
    category: 'Space History',
    keywords: [
      'who was the first person in space', 'first person in space', 'first man in space',
      'first human in space', 'first astronaut', 'first cosmonaut', 'yuri gagarin',
      'who was the first woman in space', 'first american in space', 'first person on the moon',
    ],
    content: `The first person in space was Yuri Gagarin, a Soviet cosmonaut, on 12 April 1961. His Vostok 1 capsule made one orbit of Earth in about 108 minutes, launching from the Baikonur Cosmodrome. (This is a spaceflight question, not about "first-person shooter" video games.) Related firsts: the first woman in space was Valentina Tereshkova (USSR, 1963); the first American in space was Alan Shepard (a short suborbital hop, May 1961), and the first American to orbit was John Glenn (1962); the first people to walk on the Moon were Neil Armstrong and Buzz Aldrin on Apollo 11 (20 July 1969).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-nebula',
    title: 'What a Nebula Is',
    category: 'Astronomy',
    keywords: [
      'what is a nebula', 'what are nebulae', 'what is a nebula made of', 'orion nebula',
      'is a nebula a star', 'difference between a nebula and a star', 'star forming region',
      'what is a supernova remnant',
    ],
    content: `A nebula is a giant cloud of gas (mostly hydrogen) and dust in space. Some nebulae are stellar nurseries where gravity pulls the gas together and new stars ignite (the Orion Nebula is the closest example). Others are the leftovers of dead stars — a planetary nebula is the puffed-off outer layers of a dying Sun-like star, and a supernova remnant is the expanding debris from an exploded massive star (the Crab Nebula). A nebula is NOT a star: it is diffuse cloud material, often light-years across but extremely thin. Betelgeuse, for instance, is a red supergiant STAR (not a nebula) — it will eventually explode as a supernova and leave a remnant nebula behind.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nearest-galaxy',
    title: 'The Nearest Galaxy to the Milky Way',
    category: 'Astronomy',
    keywords: [
      'how far away is the nearest galaxy', 'what is the nearest galaxy', 'closest galaxy to earth',
      'closest galaxy to the milky way', 'how far is andromeda', 'nearest galaxy to us',
      'andromeda galaxy distance',
    ],
    content: `It depends what counts as a "galaxy." The nearest large galaxy — a full spiral like our own — is the Andromeda Galaxy (M31), about 2.5 million light-years away, and it is slowly heading toward us for a collision in roughly 4–5 billion years. Andromeda is the most distant thing visible to the naked eye. Much closer than that are small satellite galaxies orbiting the Milky Way: the Large and Small Magellanic Clouds (about 160,000 and 200,000 light-years), and even nearer dwarf galaxies that are partly merging with the Milky Way — the Sagittarius Dwarf (~70,000 ly) and the disputed Canis Major Dwarf (~25,000 ly). So "nearest galaxy" is a dwarf being absorbed by ours; "nearest real galaxy like ours" is Andromeda.`,
    createdAt: Date.now(),
  },
];
