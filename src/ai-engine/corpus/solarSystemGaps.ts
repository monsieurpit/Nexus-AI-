import { KnowledgeItem } from '../../types';

// Batch 41 (solar system in detail) gap-fills. Strong category (~18/25). Live
// misses on nexus-4b: "what is Titan" -> called it "a massive ice giant" (it's
// a moon); "how long is a year on each planet" -> only did Mercury/Venus/Earth/
// Mars; "why does the Moon show the same face" -> "the sunlit side always faces
// us" (wrong — we see phases); "how did the solar system form" -> one line then
// drifted to "the Sun is a G-type star".
export const SOLAR_SYSTEM_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-is-titan',
    title: 'What Titan Is (Saturn’s Moon)',
    category: 'Astronomy',
    keywords: [
      'what is titan and why is it interesting', 'what is titan saturn moon', 'does titan have liquid', 'titan atmosphere',
      'is titan bigger than mercury', 'could there be life on titan', 'titan methane lakes',
    ],
    content: `Titan is the largest moon of Saturn and the second-largest moon in the solar system — bigger than the planet Mercury. It is NOT an "ice giant" (that term is for the planets Uranus and Neptune); it's a moon. What makes it unique: it's the only moon with a thick atmosphere — denser than Earth's, mostly nitrogen with methane, and hazy orange. It's the only world besides Earth known to have stable liquid on its surface, but at about −180 °C that liquid is methane and ethane, forming rivers, rain, lakes and seas (the largest, Kraken Mare, is bigger than the Caspian Sea). It has a full "methane cycle" that mirrors Earth's water cycle, plus dunes, and probably a liquid-water ocean deep under its icy crust. It's a major target in the search for life — either exotic chemistry in the methane, or microbes in the buried ocean — and NASA's Dragonfly drone mission is due to fly there in the 2030s.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-planet-year-lengths',
    title: 'How Long a Year Is on Each Planet',
    category: 'Astronomy',
    keywords: [
      'how long is a year on each planet', 'orbital period of the planets', 'how long is a year on jupiter',
      'how long is a year on mars', 'how long is a year on neptune', 'planet orbital periods in earth years',
    ],
    content: `A planet's "year" is how long it takes to orbit the Sun once, and it gets longer the farther out the planet is. Mercury: about 88 Earth days. Venus: about 225 days. Earth: 365.25 days. Mars: about 687 days (1.9 Earth years). Jupiter: about 11.9 Earth years. Saturn: about 29.5 Earth years. Uranus: about 84 Earth years. Neptune: about 165 Earth years (it has completed only about one full orbit since its discovery in 1846). For comparison, the dwarf planet Pluto takes about 248 years. (These are orbital periods; a planet's DAY — one rotation on its axis — is separate: a day on Venus is longer than its year, and a day on Jupiter is under 10 hours.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-moon-same-face',
    title: 'Why the Moon Always Shows the Same Face',
    category: 'Astronomy',
    keywords: [
      'why does the moon always show the same face', 'what is tidal locking', 'is there a dark side of the moon',
      'does the moon rotate', 'why do we only see one side of the moon', 'far side of the moon',
    ],
    content: `The Moon always shows the same face to Earth because it is "tidally locked": it spins on its axis exactly once for every one orbit around Earth (both take about 27.3 days), so the same hemisphere is always turned toward us. It happened because Earth's gravity raised a slight bulge on the Moon and, over billions of years, tidal friction slowed the Moon's spin until it matched its orbit and stayed there. The Moon DOES rotate — if it didn't, we'd see all sides over a month. The hemisphere we never see from Earth is the "far side," not the "dark side": both halves get two weeks of sunlight and two weeks of night as the Moon goes through its phases, so the far side is sunlit during a new Moon. The far side (first photographed by a Soviet probe in 1959) looks quite different — heavily cratered, with almost none of the dark volcanic "seas" that mark the near side.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-solar-system-formation',
    title: 'How the Solar System Formed',
    category: 'Astronomy',
    keywords: [
      'how did the solar system form', 'nebular hypothesis', 'what is a protoplanetary disk', 'how did the planets form',
      'why are the inner planets rocky and outer ones gas', 'what is accretion', 'solar nebula theory',
    ],
    content: `The Sun and planets formed together about 4.6 billion years ago from a giant cloud of gas and dust (a "molecular cloud"), in a process called the nebular hypothesis. Something — perhaps the shockwave from a nearby supernova — made part of the cloud collapse under its own gravity. As it collapsed it spun faster and flattened into a disk with a hot, dense centre. That centre gathered most of the material and became the Sun, igniting fusion. In the leftover spinning "protoplanetary disk," dust grains stuck together, then clumped by gravity into rock- and city-sized "planetesimals," which collided and merged into protoplanets ("accretion"). Close to the Sun it was too hot for ice and gas to survive, so only rock and metal remained — giving the small rocky planets (Mercury, Venus, Earth, Mars). Farther out, beyond the "frost line," ice was abundant and the young planets grew massive enough to hold onto huge envelopes of hydrogen and helium — the gas giants Jupiter and Saturn and the ice giants Uranus and Neptune. Debris that never formed a planet is left as the asteroid belt, the Kuiper Belt and the Oort Cloud.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-great-red-spot',
    title: 'The Great Red Spot on Jupiter',
    category: 'Astronomy',
    keywords: [
      'what is the great red spot on jupiter', 'how big is the great red spot', 'how long has the great red spot lasted',
      'is the great red spot shrinking', 'what causes jupiter storms', 'why is the great red spot red',
    ],
    content: `The Great Red Spot is a colossal storm in Jupiter's atmosphere — a high-pressure anticyclone that has been swirling for centuries (it's been observed continuously since at least 1830, and possibly since the 1660s). It's big enough to swallow Earth: currently roughly 1.3 times Earth's diameter, though it has been shrinking and rounding over the last century (it was 2–3 times as wide in the 1800s). Its winds blow at around 430 km/h at the edges. It sits between two atmospheric jet streams moving in opposite directions, which keep it spinning, and because Jupiter has no solid surface to create friction, storms there can last far longer than on Earth. The red colour isn't fully explained — likely sunlight breaking down chemicals (ammonia, acetylene, phosphorus or sulfur compounds) lifted from deeper in the atmosphere.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-saturn-rings',
    title: "Why Saturn Has Rings (and What They're Made Of)",
    category: 'Astronomy',
    keywords: [
      'why does saturn have rings', 'what are saturn rings made of', 'how thick are saturn rings', 'how old are saturn rings',
      'will saturn lose its rings', 'do other planets have rings',
    ],
    content: `Saturn's rings are made of countless separate chunks of almost pure water ice, ranging from dust grains to boulders the size of a house, all orbiting Saturn in the plane of its equator. They're enormously wide (the main rings span about 280,000 km) but astonishingly thin — mostly only about 10–100 metres top to bottom. They probably formed when a passing moon, comet or asteroid strayed inside Saturn's "Roche limit" and was torn apart by tidal forces, or when an icy moon was shattered by an impact; the debris spread into a disk and grinding collisions keep it flat and sorted. Evidence from the Cassini spacecraft suggests the rings are geologically young — perhaps only 100–400 million years old — and that Saturn is slowly pulling ring material into its atmosphere ("ring rain"), so they may be gone in another 100 million years or so. Jupiter, Uranus and Neptune also have rings, but faint and dark by comparison.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-eclipse-types',
    title: 'Solar Eclipse vs Lunar Eclipse',
    category: 'Astronomy',
    keywords: [
      'what is a solar eclipse versus a lunar eclipse', 'difference between solar and lunar eclipse', 'why is a solar eclipse rare',
      'what is a total solar eclipse', 'why is the moon red during a lunar eclipse', 'why not an eclipse every month',
    ],
    content: `A SOLAR eclipse happens at new Moon, when the Moon passes directly between the Sun and Earth and its shadow falls on Earth, blocking the Sun. Because the Moon's shadow is small, totality is only visible along a narrow path a few hundred km wide, lasts a few minutes, and is a rare sight from any one place (once every ~375 years on average). Never look at the Sun directly. A LUNAR eclipse happens at full Moon, when Earth passes between the Sun and Moon and Earth's shadow falls on the Moon. It's visible from the entire night side of Earth at once, lasts up to a few hours, and is safe to watch. During totality the Moon turns coppery red ("blood Moon") because the only sunlight reaching it has been bent and reddened by passing through Earth's atmosphere. We don't get an eclipse every month because the Moon's orbit is tilted about 5° to Earth's orbit, so the three bodies usually don't line up exactly — they only do so during "eclipse seasons" about twice a year.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mars-humans',
    title: 'Mars: Why It Is Red and Whether Humans Could Live There',
    category: 'Astronomy',
    keywords: [
      'what makes mars look red and could humans live there', 'why is mars red', 'can humans live on mars', 'is mars habitable',
      'what is mars atmosphere like', 'why is mars cold', 'does mars have water',
    ],
    content: `Mars looks red because its surface soil is rich in iron oxide — rust — which coats the rocks and dust and is blown around in global dust storms. As for humans living there: not without heavy protection. Mars has only about 1% of Earth's air pressure, and that thin atmosphere is 95% carbon dioxide, so it's unbreathable and can't hold surface liquid water (it would boil or freeze). The average temperature is about −60 °C. Mars lost its global magnetic field billions of years ago, so the surface gets high doses of solar and cosmic radiation, and gravity is only 38% of Earth's, which has unknown long-term health effects. It does have frozen water at the poles and underground, a day close to 24.5 hours, and some minerals and sunlight — so a crewed base is considered feasible with sealed, radiation-shielded habitats, spacesuits, and life support that recycles air and water and grows food, but people could not simply walk around outside.`,
    createdAt: Date.now(),
  },
];
