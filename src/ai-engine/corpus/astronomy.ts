import { KnowledgeItem } from '../../types';

export const ASTRONOMY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-astronomy-solar-system',
    title: 'The Solar System',
    category: 'Astronomy',
    keywords: ['solar system', 'planets', 'Sun', 'Earth', 'Jupiter', 'Saturn', 'Mars', 'asteroid', 'comet', 'orbit', 'Moon'],
    content: `The solar system consists of the Sun and everything gravitationally bound to it. The Sun contains 99.86% of the system's total mass and is a G-type main-sequence star that generates energy through nuclear fusion of hydrogen into helium. The eight planets orbit the Sun in nearly circular, coplanar orbits. The inner terrestrial planets — Mercury, Venus, Earth, Mars — are rocky and dense. The outer gas giants — Jupiter (largest, with the Great Red Spot storm) and Saturn (with its spectacular ring system made of ice and rock) — and ice giants Uranus and Neptune. Earth is the only known world with liquid surface water and life. The asteroid belt between Mars and Jupiter contains millions of rocky bodies. The Kuiper Belt beyond Neptune holds dwarf planets including Pluto, Eris, and Makemake. The Oort Cloud, a spherical shell of icy bodies extending 50,000–100,000 AU from the Sun, is thought to be the source of long-period comets. Planetary formation occurred ~4.6 billion years ago from a solar nebula — a rotating disk of gas and dust.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-astronomy-stars-stellar-evolution',
    title: 'Stars and Stellar Evolution',
    category: 'Astronomy',
    keywords: ['stars', 'stellar evolution', 'red giant', 'supernova', 'neutron star', 'white dwarf', 'fusion', 'main sequence', 'black hole'],
    content: `Stars form when dense regions in molecular clouds collapse under gravity, heating until nuclear fusion begins in the core. A star's life depends on its mass. The Sun, a medium-mass star, will spend ~10 billion years on the main sequence (currently at 4.6 billion years), fusing hydrogen into helium. When hydrogen is exhausted, the core contracts and the outer layers expand, forming a red giant. The Sun will eventually shed its outer layers as a planetary nebula, leaving a dense white dwarf — the crystallised remnant. Massive stars (>8 solar masses) evolve faster, fusing elements up to iron. When iron builds up, the core collapses catastrophically in milliseconds, triggering a supernova explosion that can outshine an entire galaxy. The remnant is either a neutron star (a city-sized sphere of nuclear density, possibly a pulsar) or, for the most massive stars, a black hole. The Hertzsprung-Russell diagram plots stars by luminosity versus temperature, revealing the main sequence, giants, supergiants, and white dwarfs. Stars are classified by spectral type: O, B, A, F, G, K, M (from hottest-bluest to coolest-reddest).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-astronomy-black-holes',
    title: 'Black Holes',
    category: 'Astronomy',
    keywords: ['black hole', 'event horizon', 'gravity', 'Schwarzschild', 'Hawking radiation', 'singularity', 'neutron star', 'accretion'],
    content: `A black hole is a region of spacetime where gravity is so strong that nothing — not even light — can escape. The boundary of no return is the event horizon; its size is the Schwarzschild radius (r_s = 2GM/c²). Black holes form from collapsed massive stars, or through the merger of compact objects. Supermassive black holes (millions to billions of solar masses) reside at the centre of most galaxies, including the Milky Way (Sagittarius A*, 4 million solar masses). The first image of a black hole shadow — M87* — was captured in 2019 by the Event Horizon Telescope. Despite the popular conception, black holes are not cosmic vacuum cleaners; they only capture matter that comes very close. Accretion disks of superheated gas spiralling inward glow brilliantly as quasars or active galactic nuclei. Stephen Hawking theorised that black holes emit thermal radiation (Hawking radiation) due to quantum effects near the event horizon, slowly losing mass over cosmic timescales. Tidal forces near stellar-mass black holes are extreme (spaghettification); supermassive black holes have gentler gradients at the event horizon.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-astronomy-big-bang',
    title: 'The Big Bang and the Origin of the Universe',
    category: 'Astronomy',
    keywords: ['Big Bang', 'universe', 'cosmology', 'CMB', 'dark matter', 'dark energy', 'inflation', 'expansion', 'Hubble', 'hydrogen', 'helium'],
    content: `The Big Bang theory describes the universe's origin ~13.8 billion years ago from an extremely hot, dense state. It is supported by three key observations: the expansion of the universe (Hubble's law: galaxies recede at velocities proportional to distance), the cosmic microwave background (CMB — relic radiation from ~380,000 years after the Big Bang, when the universe cooled enough for hydrogen to form), and the observed abundance of light elements (hydrogen ~75%, helium ~25%, trace lithium) matching Big Bang nucleosynthesis predictions. In the first second, the universe was a quark-gluon plasma. Within minutes, protons and neutrons fused into light nuclei. After ~380,000 years, electrons combined with nuclei (recombination), and the universe became transparent. Over millions of years, gravity pulled matter into structures: stars, galaxies, galaxy clusters, and the cosmic web. Cosmic inflation — a period of exponential expansion in the first 10⁻³² seconds — explains the universe's flatness and uniformity. The universe is ~68% dark energy (causing accelerating expansion), ~27% dark matter, and only ~5% ordinary matter.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-astronomy-galaxies-milky-way',
    title: 'Galaxies and the Milky Way',
    category: 'Astronomy',
    keywords: ['galaxy', 'Milky Way', 'Andromeda', 'spiral', 'dark matter', 'stars', 'light years', 'supercluster', 'black hole', 'cosmic web'],
    content: `A galaxy is a gravitationally bound system of stars, gas, dust, and dark matter. The observable universe contains an estimated 2 trillion galaxies. Galaxies are classified by shape: spiral (like the Milky Way and Andromeda), elliptical (spheroidal, containing older stars), lenticular (disc without spiral arms), and irregular. The Milky Way is a barred spiral galaxy ~100,000 light-years across, containing 200–400 billion stars. Our Sun lies ~26,000 light-years from the galactic centre in the Orion Arm. The galactic centre harbours a supermassive black hole (Sagittarius A*) and a dense nuclear bulge. Spiral arms are regions of enhanced star formation, marked by blue young stars and nebulae. Galaxies cluster together: the Milky Way and Andromeda are the largest in the Local Group (~50 galaxies). The Local Group belongs to the Virgo Supercluster, part of the Laniakea Supercluster. Galaxies collide and merge over billions of years — the Milky Way and Andromeda will collide in ~4.5 billion years. Dark matter, which cannot be directly observed, constitutes ~85% of a galaxy's total mass and is inferred from galaxy rotation curves.`,
    createdAt: Date.now(),
  },
];
