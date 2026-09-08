import { KnowledgeItem } from '../../types';

// Batch 106 (observational astronomy). Real errors/misses on nexus-4b:
// "refracting vs reflecting telescope" said Hubble is a refractor with huge
// lenses (it is a reflector; the famous flaw was its mirror); "retrograde
// motion" credited Kepler's second law (it is heliocentric relative motion);
// "celestial sphere / RA / Dec" said right ascension is measured in degrees
// 0-360 (it is measured in hours); "light year vs parsec", "light curve",
// "spectroscopy", "angular size", "conjunction and opposition" were raw web
// dumps; "averted vision" was rambly and wrong about the reason.
export const OBSERVATIONAL_ASTRONOMY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-light-year-vs-parsec',
    title: 'Light-Year vs Parsec',
    category: 'Astronomy',
    keywords: [
      'what is the difference between a light year and a parsec', 'light year distance light travels in a year 9.46 trillion km', 'parsec 3.26 light years 30.9 trillion km distance at which 1 au subtends 1 arcsecond',
      'parsec comes directly from parallax measurements astronomers use parsecs kiloparsecs megaparsecs', 'light year used in popular culture', 'both are units of distance not time',
    ],
    content: `Both are units of distance, not time. A LIGHT-YEAR is the distance light travels in one year — about 9.46 trillion kilometres (5.88 trillion miles). It is intuitive and is the unit used in popular science and fiction. A PARSEC ("parallax second") is about 3.26 light-years, or 30.9 trillion kilometres. It is defined geometrically: it is the distance at which one astronomical unit (the Earth–Sun distance) would subtend an angle of one arcsecond — equivalently, the distance of a star whose parallax (its apparent shift over six months of Earth's orbit) is one arcsecond. Professional astronomers prefer parsecs, kiloparsecs (thousands) and megaparsecs (millions) because those numbers come directly out of parallax measurements without an extra conversion. The nearest star, Proxima Centauri, is about 1.3 parsecs or 4.2 light-years away.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-refractor-vs-reflector-telescope',
    title: 'Refracting vs Reflecting Telescope',
    category: 'Astronomy',
    keywords: [
      'what is the difference between a refracting and a reflecting telescope', 'refractor uses a lens objective to bend light to a focus sealed tube no central obstruction chromatic aberration',
      'reflector uses a curved primary mirror can be made huge no chromatic aberration cheaper per aperture', 'largest refractor yerkes 1 metre all major research telescopes are reflectors',
      'hubble and jwst are reflectors hubble famous flaw was its mirror', 'newtonian cassegrain dobsonian',
    ],
    content: `A REFRACTING telescope uses a large lens (the "objective") at the front to bend incoming light to a focus at the back. Refractors give sharp, high-contrast images with a sealed tube and no central obstruction, which makes them excellent for the Moon, planets and double stars — but a lens bends different colours by slightly different amounts ("chromatic aberration"), and a big lens can only be supported at its edge and sags under its own weight, so the largest refractor ever built (Yerkes) is only about 1 metre across. A REFLECTING telescope uses a curved mirror as the objective. Mirrors have no chromatic aberration, can be supported across their whole back, and are far cheaper to make large, so every major research telescope, and both the Hubble and James Webb space telescopes, are reflectors. (Hubble is a 2.4-metre reflector; its famous early flaw was an incorrectly ground mirror.) The trade-offs are a secondary mirror that blocks part of the aperture, and mirrors that need periodic re-alignment and re-coating. Common reflector designs include the Newtonian, the Cassegrain, and the amateur-favourite Dobsonian.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-retrograde-motion',
    title: 'What Retrograde Motion of a Planet Is',
    category: 'Astronomy',
    keywords: [
      'what is retrograde motion of a planet', 'apparent temporary backward east to west motion of a planet against the background stars', 'caused by earth on its faster inner orbit overtaking a slower outer planet',
      'purely a line of sight parallax effect not real reversal', 'the problem ptolemy epicycles were invented to explain heliocentric model explained it naturally', 'retrograde is not caused by keplers second law',
    ],
    content: `Normally a planet drifts slowly eastward against the background stars from night to night. During retrograde motion it appears to stop, reverse and move westward for a few weeks or months, then resume its eastward course, tracing a loop or zigzag. Nothing about the planet's actual orbit changes — it is a line-of-sight illusion caused by relative motion. For an outer planet like Mars, retrograde happens when the faster-moving Earth, on its inner orbit, catches up to and passes it, so the outer planet seems to slide backward the way a slower car appears to move backward when you overtake it on the highway. (For Mercury and Venus, which are faster than Earth, it is the reverse — they overtake us.) This apparent backtracking was the single hardest thing for the ancient Earth-centred model to account for — it required elaborate "epicycles" (circles on circles) — and it falls out automatically from the Sun-centred model. It has nothing to do with Kepler's second law, which is about a planet's speed varying along its own orbit.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-celestial-sphere-ra-dec',
    title: 'The Celestial Sphere, Right Ascension and Declination',
    category: 'Astronomy',
    keywords: [
      'what is the celestial sphere and right ascension and declination', 'celestial sphere imaginary sphere around earth onto which all objects are projected celestial equator poles',
      'declination celestial latitude in degrees plus 90 at the north celestial pole to minus 90 zero at the celestial equator', 'right ascension celestial longitude measured eastward in hours minutes seconds 24 hours equals 360 degrees from the vernal equinox',
      'ra and dec fix a position that does not change as earth rotates', 'altitude azimuth is the other local coordinate system',
    ],
    content: `The celestial sphere is an imaginary sphere of arbitrarily large radius centred on the Earth, onto which every star, planet and galaxy is treated as being projected. It has a celestial equator (the projection of Earth's equator) and north and south celestial poles (above Earth's poles). Astronomers pin down a position on it with two coordinates analogous to latitude and longitude. DECLINATION (Dec) is the celestial latitude: an angle in degrees from +90° at the north celestial pole, through 0° on the celestial equator, to −90° at the south celestial pole. RIGHT ASCENSION (RA) is the celestial longitude, and — unlike Dec — it is conventionally measured in hours, minutes and seconds rather than degrees, running from 0h to 24h eastward around the sky (so 1 hour = 15°), with the zero point at the vernal equinox (the Sun's position at the March equinox). Because RA and Dec are tied to the stars rather than to the ground, a given object keeps almost the same coordinates year after year (they drift only slowly, from precession), which is why catalogues use them. The observer's local "where is it right now" system — altitude above the horizon and azimuth around it — is separate and changes constantly as Earth turns.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-light-curve',
    title: 'What a Light Curve Is (Astronomy)',
    category: 'Astronomy',
    keywords: [
      'what is a light curve in astronomy', 'light curve a graph of an object brightness magnitude or flux versus time', 'exoplanet transit periodic dips variable stars cepheids eclipsing binaries rr lyrae',
      'supernova light curve rise and decline', 'rotating asteroid light curve shape and spin period', 'flares and outbursts',
    ],
    content: `A light curve is simply a graph of how bright an astronomical object is over time — brightness (as magnitude or measured flux) on the vertical axis, time on the horizontal. Despite being one of the most basic possible measurements, light curves carry enormous information. Regular, brief dips reveal a planet transiting its star (the shape and depth give the planet's size and orbit — this is how Kepler and TESS find exoplanets). Smooth periodic rises and falls identify pulsating variable stars such as Cepheids and RR Lyrae, whose period reveals their true luminosity and hence distance. Sharp equal or unequal dips mark eclipsing binary stars. A fast rise followed by a slow decline over weeks is the signature of a supernova, and its exact shape distinguishes the explosion type. A repeating sawtooth from an asteroid gives its rotation period and a hint of its shape. Sudden spikes are stellar flares or accretion outbursts.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-exoplanet-detection-methods',
    title: 'How Astronomers Detect Exoplanets',
    category: 'Astronomy',
    keywords: [
      'how do astronomers detect exoplanets', 'transit method dip in brightness as a planet crosses its star kepler tess gives planet size',
      'radial velocity doppler wobble star spectrum shifts as the planet tugs it gives minimum mass', 'direct imaging rare large young planets far from a bright star', 'gravitational microlensing astrometry',
      'first confirmed exoplanet around a sun-like star 1995 51 pegasi b over 5000 confirmed',
    ],
    content: `Exoplanets are almost never photographed directly — they are tiny, faint, and lost in their star's glare — so nearly all are found by indirect methods. The TRANSIT method watches for a small, regular dip in a star's brightness as a planet passes in front of it; the dip's depth gives the planet's size and its period gives the orbit. This is the most productive method (Kepler, TESS) and accounts for most of the 5,000-plus confirmed planets. The RADIAL VELOCITY (Doppler "wobble") method detects the tiny back-and-forth motion of the star as an orbiting planet tugs it, seen as a periodic red/blue shift in the star's spectrum; it gives the planet's minimum mass and was how the first planet around a Sun-like star, 51 Pegasi b, was found in 1995. Combining transit (size) and radial velocity (mass) gives density and hence composition. DIRECT IMAGING works only for large, young, self-luminous planets far from their star. GRAVITATIONAL MICROLENSING catches the brief brightening when a planet's gravity focuses the light of a background star, and ASTROMETRY measures the star's positional wobble on the sky.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-astronomical-spectroscopy',
    title: 'What Spectroscopy Is in Astronomy',
    category: 'Astronomy',
    keywords: [
      'what is spectroscopy in astronomy', 'spectroscopy spreading an object light into its spectrum to read absorption and emission lines', 'reveals chemical composition which elements temperature density',
      'radial velocity from line shift doppler rotation from line broadening magnetic fields from zeeman splitting', 'redshift gives distance for galaxies', 'we learn almost everything about stars from their light',
    ],
    content: `Spectroscopy is the technique of spreading an object's light out by wavelength (with a prism or, in practice, a diffraction grating) and studying the resulting spectrum. Superimposed on the smooth "continuum" are sharp dark absorption lines or bright emission lines at wavelengths characteristic of specific atoms, ions and molecules — and reading them is how astronomers learn almost everything about objects they can never visit. The lines present identify the chemical composition. Their relative strengths and the shape of the continuum give the temperature. The lines' width reveals density, pressure and rotation speed (a fast-spinning star smears its lines out by Doppler). A uniform shift of all the lines toward the red or blue gives the object's velocity toward or away from us (radial velocity); for distant galaxies that redshift, combined with Hubble's law, gives distance. Splitting of lines in a magnetic field (the Zeeman effect) measures stellar and solar magnetism. It works across the whole spectrum — radio, infrared, optical, ultraviolet, X-ray.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-angular-size',
    title: 'What Angular Size Is in Astronomy',
    category: 'Astronomy',
    keywords: [
      'what is angular size in astronomy', 'angular size how large an object appears in the sky measured as an angle degrees arcminutes arcseconds', 'the moon and sun are both about half a degree which is why eclipses work',
      'a fist at arms length is about 10 degrees', 'angular size depends on both actual size and distance small angle formula', 'telescope resolution smallest resolvable angular separation',
    ],
    content: `Angular size (or angular diameter) is how big something looks in the sky, expressed as the angle it spans as seen from Earth — measured in degrees, and for small objects in arcminutes (1/60 of a degree, written ') and arcseconds (1/60 of an arcminute, written "). Useful anchors: the full Moon and the Sun are each very close to 0.5° across (a coincidence that makes total solar eclipses possible); a fist held at arm's length covers about 10°; the whole sky from horizon to horizon is 180°. Angular size depends on both an object's true size and its distance, via the small-angle relation angular size ≈ (physical size ÷ distance), so a small nearby crater and a huge distant galaxy can subtend the same angle. The finest detail a telescope (or eye) can distinguish is quoted as its angular resolution — the smallest angular separation at which two points still look separate — which improves with a larger aperture.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-conjunction-and-opposition',
    title: 'Conjunction and Opposition in Astronomy',
    category: 'Astronomy',
    keywords: [
      'what is a conjunction and an opposition in astronomy', 'conjunction two bodies appear close together in the sky same right ascension or ecliptic longitude', 'superior conjunction planet behind the sun inferior conjunction mercury or venus between us and the sun',
      'opposition an outer planet opposite the sun in our sky earth between them rises at sunset up all night closest and brightest', 'best time to observe mars jupiter saturn is at opposition', 'great conjunction jupiter saturn',
    ],
    content: `Both terms describe alignments as seen from Earth. A CONJUNCTION is when two bodies appear close together in the sky (they share the same right ascension or ecliptic longitude). Two planets can be in conjunction with each other (the Jupiter–Saturn "great conjunction" of 2020), or a planet can be in conjunction with the Sun: at "superior conjunction" the planet is on the far side of the Sun from us; at "inferior conjunction" — possible only for Mercury and Venus, which orbit inside Earth — the planet passes between us and the Sun. OPPOSITION applies to the outer planets (Mars outward) and to the Moon: the body is on the opposite side of the sky from the Sun, with Earth roughly in a line between the Sun and it. At opposition an outer planet rises as the Sun sets, is visible all night, and is at (or near) its closest approach to Earth and therefore its biggest and brightest — so opposition is the best time to observe Mars, Jupiter and Saturn.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-averted-vision',
    title: 'What Averted Vision Is (Stargazing)',
    category: 'Astronomy',
    keywords: [
      'what is averted vision in stargazing', 'averted vision looking slightly to the side of a faint object to see it better', 'the fovea centre of vision is all cones poor in dim light',
      'rods far more light sensitive concentrated 8 to 16 degrees off centre', 'putting a faint object light on the rod rich part of the retina makes it visible', 'used for nebulae faint galaxies dim comets',
    ],
    content: `Averted vision is a stargazing technique: instead of looking straight at a faint object, you look slightly to one side of it (about 8–16° away) while keeping your attention on it. It works because of how the retina is built. The fovea, the small central patch that gives you sharp daytime detail, contains only cones, which need a fair amount of light to respond — so a faint smudge vanishes when you stare right at it. The rods, which are far more sensitive in dim light (though they see no colour and less detail), are absent from the fovea and most densely packed in a ring roughly 8–16° off-centre. Looking to the side of a faint galaxy, nebula or comet lands its light on that rod-rich zone, and the object pops into view. It has nothing to do with avoiding being blinded; it is about using the more light-sensitive part of your eye. Full dark adaptation (20–30 minutes away from white light) makes it work far better.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-apparent-vs-absolute-magnitude-detail',
    title: 'Apparent vs Absolute Magnitude (and the Magnitude Scale)',
    category: 'Astronomy',
    keywords: [
      'what is apparent magnitude versus absolute magnitude', 'apparent magnitude how bright an object looks from earth absolute magnitude how bright it would look at 10 parsecs',
      'magnitude scale is inverted and logarithmic lower number is brighter each 5 magnitudes is a factor of 100', 'sun apparent minus 27 absolute plus 4.83 vega about zero', 'faintest naked eye stars about magnitude 6',
    ],
    content: `Magnitude measures brightness on a scale that is both backwards and logarithmic: a smaller (or more negative) number means brighter, and a difference of exactly 5 magnitudes corresponds to a factor of 100 in brightness (so 1 magnitude ≈ 2.512×). APPARENT magnitude is how bright an object actually looks from Earth, which mixes together its true luminosity and its distance (and any intervening dust). Examples: the Sun −26.7, the full Moon about −12.7, Venus at its best about −4.6, Sirius −1.5, the faintest stars visible to the unaided eye from a dark site about +6, and large telescopes reach past +30. ABSOLUTE magnitude removes the distance factor: it is defined as the apparent magnitude the object would have if it were placed at a standard distance of 10 parsecs (about 32.6 light-years). It is a true measure of intrinsic luminosity, so it lets you compare stars fairly — the Sun's absolute magnitude is a modest +4.83, while a supergiant like Rigel is around −7, roughly 100,000 times more luminous.`,
    createdAt: Date.now(),
  },
];
