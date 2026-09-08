import { KnowledgeItem } from '../../types';

// Batch 93 (photography). Weak category (~10/25). nexus-4b misses: "prime lens
// versus zoom lens" answered about the Goldbach conjecture and prime numbers;
// "wide angle lens versus telephoto lens" dumped text about polarized
// sunglasses making car screens go black; "RAW versus JPEG", "bokeh", "DSLR
// versus mirrorless", "HDR photography", "chromatic aberration", and "histogram"
// all came back as raw web-dump fragments (bokeh -> a 2017 sci-fi film); "what
// is depth of field" just re-explained aperture.
export const PHOTOGRAPHY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-prime-vs-zoom-lens',
    title: 'Prime Lens versus Zoom Lens',
    category: 'Photography',
    keywords: [
      'what is a prime lens versus a zoom lens', 'prime lens fixed focal length', 'zoom lens variable focal length moving elements',
      'why are prime lenses sharper and faster', 'prime lens f1.8 wide aperture low light', 'zoom lens versatility one lens many framings',
    ],
    content: `A PRIME lens has one fixed focal length — a 35 mm prime, a 50 mm prime, an 85 mm prime — so to reframe you physically move ("zoom with your feet"). A ZOOM lens covers a range of focal lengths, such as 24–70 mm or 70–200 mm, using internal moving elements to change the angle of view. This has nothing to do with prime numbers or the Goldbach conjecture. Trade-offs: primes tend to be smaller, lighter and optically sharper, and they are available with much wider maximum apertures (f/1.8, f/1.4, even f/1.2), which is a big advantage in low light and for a strongly blurred background; they are also often cheaper for a given image quality. Their limitation is inflexibility — you can't reframe without moving. Zooms are far more convenient and versatile (one lens handles a wedding, a trip, or a situation where you can't change position), at the cost of being bigger, usually a stop or two "slower" (max aperture f/2.8 or f/4, sometimes variable across the range), and historically a touch less sharp, though modern professional zooms are excellent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wide-angle-vs-telephoto',
    title: 'Wide-Angle Lens versus Telephoto Lens',
    category: 'Photography',
    keywords: [
      'what is a wide angle lens versus a telephoto lens', 'wide angle short focal length wide field of view', 'telephoto long focal length magnifies distant subjects',
      'wide angle exaggerated perspective landscapes', 'telephoto compression blur background wildlife sports', 'standard normal lens 50mm',
    ],
    content: `A WIDE-ANGLE lens has a short focal length (roughly 10–35 mm on a full-frame camera) and so takes in a wide angle of view — used for landscapes, architecture, interiors, group shots and night skies. It makes near objects loom large relative to distant ones (dramatic, "exaggerated" perspective), holds a large depth of field easily, and distorts faces if used close. A TELEPHOTO lens has a long focal length (85 mm up into the hundreds), so it sees a narrow slice of the scene and magnifies distant subjects — used for wildlife, sports, and flattering portraits. It "compresses" perspective (background elements look pulled in close behind the subject), blurs backgrounds easily, and is more sensitive to camera shake, so it needs a faster shutter speed or image stabilisation. Between them, around 40–70 mm, is a "standard" or "normal" lens (the classic 50 mm), whose perspective is closest to unaided human vision. This has nothing to do with polarized sunglasses.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-raw-vs-jpeg',
    title: 'RAW File versus JPEG',
    category: 'Photography',
    keywords: [
      'what is a raw file versus a jpeg', 'raw sensor data unprocessed maximum editing latitude', 'jpeg compressed camera-processed finished image',
      'recover highlights shadows change white balance raw', 'why shoot raw', 'raw plus jpeg dng',
    ],
    content: `A JPEG is a finished, compressed photo: the camera has already applied white balance, contrast, saturation, sharpening and noise reduction and discarded the data it judged unnecessary, giving a small file that looks good immediately and opens in any program. A RAW file is the near-unprocessed data straight off the sensor — much larger, needs dedicated software (Lightroom, Capture One, the camera maker's app), and looks flat before editing, but it retains the full information the sensor recorded. That means far more room to recover blown highlights and lift dark shadows, to change white balance afterward with no quality loss, and to make strong edits without the image breaking up into banding or artefacts. Photographers shoot RAW when they want maximum control and final quality; JPEG when they need speed, small files, or no editing at all. Most cameras can record both at once (RAW+JPEG).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bokeh',
    title: 'What Bokeh Is',
    category: 'Photography',
    keywords: [
      'what is bokeh', 'quality of the out-of-focus blur photography', 'bokeh balls out of focus highlights round hexagonal', 'creamy vs busy bokeh',
      'wide aperture subject background distance bokeh', 'aperture blades cat eye bokeh', 'bokeh from japanese boke blur',
    ],
    content: `Bokeh is the visual quality of the out-of-focus areas of a photograph — not merely how blurred they are, but how the blur looks: smooth and creamy versus busy and distracting, and the shape of out-of-focus points of light (ideally round and soft, sometimes polygonal from the aperture blades, or lens-shaped "cat's-eye" toward the edges of the frame). Strong, pleasing bokeh comes from using a wide aperture (a small f-number like f/1.8) with a good distance between the subject and the background; lens design also matters (the number and roundness of the aperture blades, and how the lens is optically corrected). Background points of light — fairy lights, street lamps, sun sparkling on water — render as the glowing discs people picture when they say "nice bokeh." The word comes from the Japanese "boke," meaning blur or haze. (It is unrelated to any film of the same name.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dslr-vs-mirrorless',
    title: 'DSLR versus Mirrorless Camera',
    category: 'Photography',
    keywords: [
      'what is a dslr versus a mirrorless camera', 'dslr mirror optical viewfinder', 'mirrorless no mirror electronic viewfinder live preview',
      'why is mirrorless smaller and lighter', 'mirrorless autofocus eye tracking video', 'dslr optical view long battery life',
    ],
    content: `Both are interchangeable-lens cameras; the difference is what happens to the light before the shot. A DSLR (digital single-lens reflex) has a mirror inside that bounces the light coming through the lens up into an optical viewfinder, so you look at the real scene through glass; when you press the shutter the mirror flips up out of the light path. A MIRRORLESS camera has no mirror — light falls on the sensor continuously, which feeds a live digital preview to an electronic viewfinder (a tiny screen) or the rear LCD, showing the exposure, white balance and colour it will actually record. Mirrorless bodies and systems are smaller and lighter, allow completely silent shooting, very fast burst rates, better video, and superior autofocus (real-time eye and subject tracking), which is why they have taken over — the major makers have largely stopped developing new DSLRs. DSLRs still offer a lag-free optical view that never blacks out or lags, and generally longer battery life.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hdr-photography',
    title: 'What HDR Photography Is',
    category: 'Photography',
    keywords: [
      'what is hdr photography', 'high dynamic range multiple exposures blended', 'bracketing highlights shadows midtones hdr',
      'why do phones do hdr automatically', 'overdone hdr grungy halo look', 'hdr only works on static scenes ghosting',
    ],
    content: `HDR (high dynamic range) photography captures a scene whose span of brightness — from deep shadow to bright sky — is wider than a single exposure can record. The camera takes several frames at different exposures (one exposed for the highlights, one for the mid-tones, one for the shadows), and software blends them, keeping the well-exposed portion of each, so the final image holds detail in both the brightest and darkest areas. Phones do this automatically, often merging a rapid burst behind the scenes. Applied subtly, HDR just looks like a naturally well-balanced photo; overdone, it produces the exaggerated, flat, halo-edged "grungy" look that gave HDR a bad reputation. It only works cleanly on static scenes — anything that moves between frames leaves ghosting. Separately, "HDR" now also describes display and image formats (HDR10, Dolby Vision, Ultra HDR) that let modern screens show a brighter, wider tonal range than standard.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chromatic-aberration',
    title: 'What Chromatic Aberration Is',
    category: 'Photography',
    keywords: [
      'what is chromatic aberration', 'colour fringing purple fringing lens', 'lens fails to focus all colours at the same point dispersion',
      'lateral vs longitudinal chromatic aberration', 'ed ud fluorite low dispersion glass apochromatic', 'remove chromatic aberration in lightroom',
    ],
    content: `Chromatic aberration — also called colour fringing or purple fringing — is a lens flaw in which different wavelengths (colours) of light are bent by slightly different amounts and so do not all focus at exactly the same point or the same size. The visible result is thin coloured outlines, typically magenta/purple and green (or cyan and red), running along high-contrast edges — worst toward the corners of the frame, on cheaper lenses, and when a fast lens is shot wide open. There are two kinds: "lateral" (the colours are magnified differently, and it can be corrected almost perfectly in software) and "longitudinal" (the colours focus at different depths, seen as coloured halos on out-of-focus edges, and harder to fix). Lens makers reduce it with special low-dispersion glass elements ("ED," "UD," "SD," fluorite) and "apochromatic" (APO) designs, and most raw editors remove the lateral type with one checkbox.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-histogram-photography',
    title: 'What a Histogram Is in Photography',
    category: 'Photography',
    keywords: [
      'what is a histogram in photography', 'graph of tones black left white right pixel count', 'reading a histogram exposure clipping',
      'histogram bunched left underexposed right overexposed', 'rgb histogram channel clipping', 'expose to the right histogram',
    ],
    content: `A photographic histogram is a bar graph of the tones in an image: the horizontal axis runs from pure black on the far left to pure white on the far right, and the height at any point shows how many pixels have that brightness. It is the most reliable way to judge exposure, because the camera's rear screen looks misleadingly bright in the dark and dim in the sun. Reading it: data crammed against the left edge with a spike on the edge itself means crushed, detail-less shadows (underexposed); data crammed against the right edge with a spike means blown-out highlights that can't be recovered (overexposed); a good exposure usually spreads across the range without heavy "clipping" at either end — though the ideal shape depends on the scene (a snow field should lean right, a night scene left). Many cameras also show separate red, green and blue histograms, useful for spotting when just one colour channel is clipping (common with bright reds and skies).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-depth-of-field',
    title: 'What Depth of Field Is',
    category: 'Photography',
    keywords: [
      'what is depth of field', 'range of distance in a photo that is sharp', 'shallow depth of field blurred background portrait',
      'deep depth of field landscape everything sharp', 'aperture focus distance focal length control depth of field', 'one third in front two thirds behind focus',
    ],
    content: `Depth of field is the range of distance in a photo that appears acceptably sharp — from the nearest in-focus point to the farthest. "Shallow" depth of field means only a thin slice is sharp and everything closer or farther is blurred (used to lift a portrait subject off its background); "deep" or "large" depth of field keeps the scene sharp from the foreground to the horizon (used for landscapes). Three things control it. APERTURE: a wider aperture (smaller f-number, like f/1.8) gives shallower depth of field; a narrow one (f/11–f/16) gives more. FOCUS DISTANCE: the closer you focus, the shallower it gets — which is why macro depth of field is often a millimetre or less. FOCAL LENGTH AND SENSOR SIZE: longer lenses and larger sensors produce a shallower-looking result at the same framing. As a rough guide, about one-third of the total depth of field falls in front of the point you focused on and two-thirds behind it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-exposure-triangle',
    title: 'What the Exposure Triangle Is',
    category: 'Photography',
    keywords: [
      'what is the exposure triangle', 'aperture shutter speed iso work together', 'stops of light exposure', 'trade off aperture shutter iso same exposure',
      'aperture depth of field shutter motion blur iso noise', 'how photographers balance exposure settings',
    ],
    content: `The exposure triangle is the interlocking relationship between the three camera settings that together decide how bright or dark a photo is, and each also has a creative side effect. APERTURE — how wide the lens opens (measured in f-stops); it also sets the depth of field (how much is in focus). SHUTTER SPEED — how long the sensor is exposed to light (a fraction of a second, or seconds); it also determines whether motion is frozen or blurred. ISO — how strongly the sensor's signal is amplified; higher ISO brightens dim scenes but adds noise/grain. Each of these is measured in "stops," and one stop doubles or halves the light. Because they trade off, if you open the aperture one stop you can make the shutter one stop faster and keep the identical brightness. The photographer's skill is choosing the combination that yields a correct exposure AND the look wanted — blurred versus sharp background, frozen versus streaked motion, clean versus noisy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-iso-photography',
    title: 'What ISO Is in Photography',
    category: 'Photography',
    keywords: [
      'what is iso in photography', 'iso sensor sensitivity to light', 'low iso 100 clean high iso 3200 noisy', 'base native iso best quality',
      'raise iso in low light instead of underexposing', 'iso noise dynamic range tradeoff', 'iso third leg exposure triangle',
    ],
    content: `ISO is the camera setting that controls how sensitive the image is to light — really, how much the sensor's signal is amplified. A LOW ISO (100–200) gives the cleanest image with the finest detail, the least noise, and the best dynamic range and colour, but it needs plenty of light. A HIGH ISO (3200, 6400, 12800 and up) lets you shoot in dim light or use a faster shutter speed, at the cost of visible "noise" or grain, softer detail, and reduced dynamic range. Every camera has a "base" or "native" ISO (usually 100) where quality is best. ISO is the third leg of the exposure triangle: set aperture and shutter speed first for the look you want, then raise ISO only as far as needed for a correct exposure. It is almost always better to raise ISO and accept some noise than to hand-hold too slow a shutter (blur) or leave the frame underexposed (which produces its own noise when brightened later).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-focal-length',
    title: 'What Focal Length Is',
    category: 'Photography',
    keywords: [
      'what is focal length', 'focal length millimetres angle of view magnification', 'short focal length wide angle long focal length telephoto',
      '50mm normal lens human perspective', 'focal length compression background blur', 'crop sensor equivalent focal length',
    ],
    content: `Focal length, given in millimetres, is the optical distance from the point where the lens brings light rays to a focus to the camera's sensor, measured with the lens focused far away. In practice it tells you two things: the angle of view (how much of the scene fits in the frame) and the magnification. A SHORT focal length (16–24 mm) is "wide-angle" — a broad view with small-looking subjects and lots of scene. A LONG focal length (200–600 mm) is "telephoto" — a narrow view that magnifies distant subjects so they look larger and closer. Around 50 mm on a full-frame camera is "normal," roughly matching human perspective. Longer focal lengths also compress the apparent distance between near and far objects and make it easier to throw the background out of focus. On a smaller (crop) sensor the same lens shows a narrower view, described by an "equivalent" focal length — for example a 35 mm lens on an APS-C body frames about like a 52 mm lens would on full-frame.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-full-frame-vs-crop-sensor',
    title: 'Full-Frame versus Crop Sensor',
    category: 'Photography',
    keywords: [
      'what is the difference between full frame and crop sensor', 'full frame 36x24mm same as 35mm film', 'crop sensor aps-c micro four thirds crop factor',
      'crop factor 1.5 1.6 2 zoomed in field of view', 'full frame low light noise dynamic range shallow depth of field', 'crop sensor smaller lighter cheaper more reach',
    ],
    content: `A "full-frame" sensor is the same size as a frame of 35 mm film — 36 × 24 mm. A "crop" sensor is smaller: APS-C is about 23 × 15 mm (a crop factor of roughly 1.5, or 1.6 for Canon), and Micro Four Thirds is about 17 × 13 mm (crop factor 2). Because the smaller sensor captures only the central portion of the image the lens projects, any lens frames more tightly on a crop body — a 50 mm lens looks like about a 75–80 mm lens. Full-frame's larger light-gathering area typically gives it an advantage in high-ISO noise and dynamic range, and a shallower depth of field at the same framing, but it demands bigger, more expensive lenses and bodies. Crop sensors enable smaller, lighter, cheaper systems and give extra "reach" for wildlife and sports (the subject fills more of the frame). Modern APS-C is very capable — the choice is really about size, budget and subject matter, not a sharp quality line.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-polarizing-filter',
    title: 'What a Polarizing Filter Does',
    category: 'Photography',
    keywords: [
      'what is a polarizing filter', 'cpl circular polarizer cuts glare reflections', 'polarizer deepens blue sky boosts saturation',
      'polarizing filter removes reflections from water and glass', 'polarizer strongest at 90 degrees to the sun', 'polarizer costs one to two stops of light',
    ],
    content: `A polarizing filter is a rotating filter that passes light waves vibrating in one orientation and blocks the rest. Light reflected off non-metallic surfaces — water, glass, wet foliage, atmospheric haze, and the part of the sky at roughly 90° to the sun — becomes partly polarized, so turning the filter can dramatically reduce those reflections and glare. Effects: it darkens and deepens a blue sky and makes clouds stand out, cuts the sheen on water and windows to reveal what is beneath, tames haze, and increases overall colour saturation on a bright day. It costs about 1–2 stops of light. Its effect is strongest when you shoot at about a right angle to the sun and can look uneven across a very wide-angle frame. It is one of the few filter effects that cannot be recreated well in editing, which is why landscape photographers still carry one. The type needed for modern autofocus cameras is a "circular polarizer" (CPL).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lens-flare',
    title: 'What Causes Lens Flare',
    category: 'Photography',
    keywords: [
      'what causes lens flare', 'bright light reflecting between lens elements', 'veiling flare haze reduced contrast ghost blobs',
      'lens hood reduces flare', 'why do zoom lenses flare more elements', 'anti-reflective lens coatings suppress flare',
    ],
    content: `Lens flare is the haze, streaks, coloured blobs or ghost shapes that appear when a bright light source — usually the sun, or a strong lamp — shines into the lens, whether it is in the frame or just outside it. It is caused by that intense light bouncing back and forth between the many air-to-glass surfaces of the lens elements instead of passing straight through, and reflecting off the aperture blades and the sensor. The results: an overall milky "veiling" haze that lowers contrast, a line of polygon-shaped "ghost" reflections marching across the frame toward the light source, and blobs that reveal the aperture's shape. It is worse with zoom lenses (more elements), dirty or scratched front glass, and cheap protective filters. Photographers reduce it with a lens hood, by shading the front of the lens with a hand, or by shifting position so the light is fully blocked — or they include it on purpose as an effect. Modern anti-reflective ("nano," "multi") lens coatings exist specifically to suppress it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-exposure-compensation',
    title: 'What Exposure Compensation Is',
    category: 'Photography',
    keywords: [
      'what is exposure compensation', 'tell the camera to make the photo brighter or darker than metered', 'camera meter aims for middle grey fooled by snow black cat',
      'exposure compensation plus stops brighten minus stops darken', 'works in aperture priority shutter priority program mode', 'quick fix for metering errors',
    ],
    content: `Exposure compensation is a control that tells the camera to make the photo brighter or darker than its light meter has decided it should be. The meter tries to make everything average out to a middle grey, which fools it in certain scenes: it underexposes bright scenes (snow, a whitewashed wall, a backlit sky) because it is trying to darken all that white toward grey, and it overexposes dark scenes (a black cat, a dim room). You dial in positive compensation (+1, +2 stops) to brighten the result, or negative (−1, −2) to darken it, and the camera makes the adjustment automatically by shifting shutter speed, aperture or ISO depending on the shooting mode. It is the fast way to correct consistent metering errors without going to full manual, and it works in aperture priority, shutter priority and program modes (not in manual, where you already control everything).`,
    createdAt: Date.now(),
  },
];
