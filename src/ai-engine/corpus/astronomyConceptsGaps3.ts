import { KnowledgeItem } from '../../types';

/**
 * ASTRONOMY_CONCEPTS_GAPS_3 — batch 233 corrections.
 * Misses: "Big Bang vs cosmic inflation" said inflation came BEFORE the Big
 * Bang (wrong — it is an episode a fraction of a second AFTER); "northern vs
 * southern hemisphere sky" answered about the equator and Christmas in
 * Australia instead of the sky; "microgravity vs zero gravity" led with "no
 * real difference"; the Hubble answer still described its mirror as faulty
 * (the aberration was corrected in 1993); "moon vs natural satellite" pivoted
 * to artificial satellites instead of saying they are the same thing;
 * "waxing vs waning" was muddled.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'astronomy', keywords, content, createdAt: now,
});

export const ASTRONOMY_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-astro3-bigbang-vs-inflation',
    'Big Bang vs cosmic inflation',
    [
      'difference between the Big Bang and cosmic inflation', 'inflation happened after the Big Bang not before',
      'exponential expansion 10^-36 to 10^-32 seconds', 'flatness and horizon problems', 'Alan Guth 1980',
      'inflaton field', 'not a separate earlier event',
    ],
    `The Big Bang is the overall model: the observable universe began about 13.8 billion years ago in an extremely hot, dense state and has been expanding and cooling ever since. It is not an explosion "in" space — it is the expansion of space itself.

Cosmic inflation is a proposed episode WITHIN that history, not before it and not a rival to it. Very shortly after the beginning — roughly from 10^-36 to 10^-32 of a second in — the universe is thought to have expanded exponentially, blowing up by a factor of at least 10^26 in that split second, then settling back to the ordinary slower expansion. (People sometimes say inflation is "before the Big Bang" only if they define "Big Bang" narrowly as the later hot-plasma phase; in normal usage inflation is a fraction of a second AFTER t=0.)

Why the idea exists: plain Big Bang expansion cannot easily explain why the universe looks so uniform in every direction — regions that were never in causal contact have the same temperature (the horizon problem) — or why space is so close to geometrically flat (the flatness problem). A brief burst of inflation smooths and flattens everything and stretches tiny quantum fluctuations into the density ripples that later seeded galaxies. It was proposed by Alan Guth around 1980. Inflation is well-motivated and fits the data but is not confirmed the way the Big Bang itself is.`,
  ),
  k(
    'kb-gap-astro3-northern-vs-southern-sky',
    'Northern vs southern hemisphere night sky',
    [
      'difference between the northern and southern hemisphere sky', 'different constellations visible', 'Polaris north star versus no south pole star',
      'Southern Cross Crux Magellanic Clouds', 'celestial poles', 'sky looks upside down', 'stars circle a different point',
      'not about the equator or seasons',
    ],
    `This is about what you actually SEE overhead, not about seasons or the equator.

From the NORTHERN hemisphere the sky appears to rotate around the north celestial pole, marked closely by Polaris, the North Star. Signature sights: the Big Dipper / Plough, Cassiopeia, Ursa Major and Minor, and in season Orion "the right way up". The farther north you go, the higher Polaris sits and the more stars are circumpolar (never setting).

From the SOUTHERN hemisphere the sky rotates around the south celestial pole, which has NO bright star to mark it (you find it using the Southern Cross, Crux, and the Pointers). Signature sights unavailable up north: Crux itself, Alpha and Beta Centauri, the two Magellanic Clouds (satellite galaxies visible to the naked eye), and the bright centre of the Milky Way passing high overhead. Familiar constellations like Orion appear "upside down", and the Moon's lit side and phases look flipped.

Near the equator you can see essentially both polar regions of the sky over the course of a year. Only objects near the celestial equator (Orion's belt, most of the zodiac) are visible from both hemispheres. Stars also appear to trace their arcs in mirror-image directions for the two hemispheres.`,
  ),
  k(
    'kb-gap-astro3-microgravity-vs-zerogravity',
    'Microgravity vs zero gravity',
    [
      'difference between microgravity and zero gravity', 'zero gravity is a colloquial misnomer', 'true weightlessness from free fall',
      'ISS still about 90 percent of Earths gravity', 'astronauts float because they are falling around the Earth', 'residual accelerations 10^-6 g',
      'weightlessness is not the absence of gravity',
    ],
    `They describe the same sensation but "microgravity" is the accurate term and "zero gravity" is a loose popular one.

"Zero gravity" suggests there is no gravity acting. That is almost never true. On the International Space Station, about 400 km up, Earth's gravity is still roughly 90% of its surface value. Astronauts float not because gravity is gone but because the station and everyone in it are in continuous FREE FALL — falling toward Earth and constantly missing it because of their sideways orbital speed. Everything falls together, so nothing presses on anything else and you feel weightless. The same thing happens for a few seconds in a dropped lift or on a parabolic "vomit comet" flight.

"Microgravity" ("micro" = one millionth) is the technical name for this free-fall state, and it acknowledges the environment is not perfectly still: tiny residual accelerations of about 10^-6 g remain from atmospheric drag, tidal gradients across the vehicle, crew movement, and machinery vibration. For sensitive experiments (crystal growth, fluid physics) that residual matters, which is exactly why scientists say "microgravity" rather than "zero g". True zero gravity would require being infinitely far from all mass, which exists nowhere.`,
  ),
  k(
    'kb-gap-astro3-hubble-vs-jwst',
    'Hubble vs James Webb Space Telescope',
    [
      'difference between Hubble and the James Webb telescope', 'Hubble mirror flaw was corrected in 1993 COSTAR', 'Hubble mostly visible and ultraviolet light',
      'JWST infrared', 'Hubble in low Earth orbit serviceable', 'JWST at L2 1.5 million km not serviceable', 'JWST 6.5 metre segmented gold mirror sunshield',
      'they are complementary not a replacement',
    ],
    `Hubble (launched 1990) has a 2.4 m mirror and observes mainly visible and ultraviolet light, plus some near-infrared. It was launched with a mirror ground to slightly the wrong shape (spherical aberration), but that was FIXED in December 1993 when a Space Shuttle crew installed corrective optics (COSTAR); Hubble has produced sharp images ever since. It sits in low Earth orbit (~540 km), which is why astronauts could reach it for five servicing missions.

The James Webb Space Telescope (launched December 2021) has a 6.5 m segmented, gold-coated mirror — about 6x Hubble's light-collecting area — and is optimised for INFRARED. It carries a tennis-court-sized sunshield and is kept extremely cold (about 40 K) so its own heat does not swamp the faint infrared signal. It orbits the Sun near the Earth–Sun L2 point, 1.5 million km from Earth, where it cannot be serviced by astronauts.

Why infrared matters: light from the most distant, earliest galaxies is stretched (redshifted) out of the visible band, and infrared also pierces the dust clouds where stars and planets form. So JWST sees earlier in cosmic history and deeper into star-forming regions than Hubble can. They are complementary, not a replacement — Hubble still owns the ultraviolet and sharp visible-light work JWST cannot do.`,
  ),
  k(
    'kb-gap-astro3-moon-vs-natural-satellite',
    'Moon vs natural satellite',
    [
      'difference between a moon and a natural satellite', 'a moon is a natural satellite', 'they are the same thing synonyms',
      'natural versus artificial satellite', 'the Moon capital M is Earths moon', 'moons of Jupiter and Saturn',
    ],
    `"Moon" and "natural satellite" mean the same thing: a body that orbits a planet (or a dwarf planet or an asteroid) and was not built by humans. Earth's Moon, Jupiter's Europa, Saturn's Titan — all are natural satellites, and all are called moons.

The distinctions worth knowing:
- "the Moon" with a capital M specifically means Earth's own natural satellite; "a moon" (lowercase) is the general word for any of them.
- "natural satellite" is contrasted with "artificial satellite" — a human-built spacecraft placed in orbit (communications, GPS, weather, the ISS). If someone just says "satellite" in an everyday context they usually mean an artificial one.
- So a moon is always a natural satellite; a satellite is not always a moon (it might be artificial, or it might orbit a star rather than a planet).`,
  ),
  k(
    'kb-gap-astro3-waxing-vs-waning',
    'Waxing vs waning Moon',
    [
      'difference between waxing and waning moon', 'waxing means the lit part is growing toward full', 'waning means the lit part is shrinking toward new',
      'waxing moon visible in the evening western sky', 'waning moon visible in the early morning eastern sky', 'crescent gibbous first quarter last quarter',
      'northern hemisphere right side lit when waxing',
    ],
    `"Waxing" means the illuminated portion of the Moon is GROWING night to night, heading from new moon toward full moon. "Waning" means it is SHRINKING, heading from full moon back toward new moon. Each half of the cycle lasts about two weeks.

The phase sequence: new -> waxing crescent -> first quarter (half lit) -> waxing gibbous -> full -> waning gibbous -> last/third quarter (half lit) -> waning crescent -> new.

Where and when you see it:
- A waxing Moon is up in the evening, in the western sky after sunset.
- A waning Moon is up in the late night and early morning, in the eastern sky before sunrise.
- From the northern hemisphere, a waxing Moon is lit on its RIGHT side and a waning Moon on its LEFT (reversed in the southern hemisphere). A common memory aid: if it looks like a backwards C it is waning; if the curve would close into a D it is waxing ("D for developing").`,
  ),
];
