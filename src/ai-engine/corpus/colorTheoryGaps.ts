import { KnowledgeItem } from '../../types';

// Batch 119 (color theory & vision). Errors and web dumps on nexus-4b:
// "color temperature in Kelvin" answered only that "zero kelvin is absolute
// zero"; "color blindness" said dichromatic vision "is what bulls have, seeing
// only red and green"; "tint shade tone" answered about literary tone and
// drag-culture shade; "warm and cool colors" answered about climate-change
// data maps; "gamma correction" returned a passage on the du Noüy ring surface
// tension method; "magenta is not a real wavelength", "chroma vs saturation",
// and "metamerism" were web dumps.
export const COLOR_THEORY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-color-temperature',
    title: 'What Color Temperature (Kelvin) Means',
    category: 'Color Theory',
    keywords: [
      'what is color temperature measured in kelvin', 'color temperature describes the colour of a white light source by comparing it to the glow of an ideal black body heated to a given temperature in kelvin',
      'low color temperatures look warm orange candle 1900k incandescent 2700k sunrise sunset 3000k high color temperatures look cool blue midday sun 5500k overcast 6500 to 7500k blue sky 10000k plus',
      'used to set white balance in photography and to choose light bulbs warm white 2700k vs daylight 5000k',
    ],
    content: `Color temperature is a way of describing the colour of a "white" light using a single number in kelvins (K). It comes from physics: heat a theoretical perfect radiator (a "black body," think a bar of iron) and it glows — dull red at low temperatures, then orange, yellow, white, and finally bluish-white as it gets hotter. The color temperature of a real light source is the black-body temperature whose glow it most resembles. The counterintuitive part is that LOW numbers look WARM (reddish/orange) and HIGH numbers look COOL (bluish): a candle flame is about 1,900 K, a traditional incandescent bulb ~2,700 K, sunrise and sunset light ~3,000 K, "neutral" white ~4,000 K, direct midday sunlight ~5,500 K, an overcast sky ~6,500–7,500 K, and open shade under a clear blue sky can exceed 10,000 K. This is why photographers set "white balance" (telling the camera what temperature the light is so it can neutralise the color cast), and why light bulbs are sold by color temperature — "warm white" (2,700 K) for a cozy living room, "cool white" or "daylight" (4,000–5,000 K) for a kitchen or office. (It is unrelated to absolute zero at 0 K.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-color-blindness-types',
    title: 'Color Blindness and Its Types',
    category: 'Color Theory',
    keywords: [
      'what is color blindness and what are the types', 'colour vision deficiency usually inherited and x linked about 8 percent of men and 0.5 percent of women caused by a missing or altered cone type',
      'red green is by far the most common protanopia protanomaly red cone missing or weak deuteranopia deuteranomaly green cone missing or weak confuse reds greens browns oranges', 'blue yellow tritan is rare monochromacy total colour blindness seeing only greyscale is very rare',
      'most colour blind people still see colours just fewer distinct ones they do not see shades of grey diagnosed with ishihara plates',
    ],
    content: `Color vision deficiency ("color blindness") means seeing a reduced range of colors, almost always because one of the eye's three cone types is missing, absent, or shifted in its sensitivity. The genes for the red and green cone pigments sit on the X chromosome, so the common forms are X-linked recessive and affect roughly 1 in 12 men (~8%) but only about 1 in 200 women. Types: RED-GREEN deficiency is by far the most common — "protan" types (protanopia = no L/red cone, protanomaly = a weak one) and "deutan" types (deuteranopia = no M/green cone, deuteranomaly = a weak one). People with these confuse reds, greens, browns, oranges and some greys, and struggle with things like ripe-vs-unripe fruit or red text on a green background. BLUE-YELLOW deficiency ("tritan," the S/blue cone) is rare and affects both sexes equally. MONOCHROMACY — true total color blindness, seeing only shades of grey — is very rare and usually comes with poor overall vision. Importantly, most color-blind people DO see color; they just distinguish fewer distinct shades — they are not seeing the world in greyscale. It is screened with Ishihara plates (the dotted number circles).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tint-shade-tone',
    title: 'Tint vs Shade vs Tone (Color)',
    category: 'Color Theory',
    keywords: [
      'what is the difference between a tint a shade and a tone in color', 'a tint is a pure hue plus white lighter and less saturated pink is a tint of red',
      'a shade is a pure hue plus black darker maroon or burgundy is a shade of red', 'a tone is a pure hue plus grey both white and black muted and softer a dusty rose',
      'starting from a fully saturated hue all real world colours are tints shades or tones of it',
    ],
    content: `Start with a pure, fully saturated hue — a bright red straight off the color wheel. Three operations produce the huge range of real-world colors: A TINT is the hue mixed with WHITE. It becomes lighter and a bit less intense — pink is a tint of red, sky blue is a tint of blue, pastel colors are all tints. A SHADE is the hue mixed with BLACK. It becomes darker and can seem richer or heavier — maroon and burgundy are shades of red, navy is a shade of blue, olive is a shade of yellow. A TONE is the hue mixed with GREY (that is, both white and black together). It becomes muted, softer, and more "sophisticated" or "dusty" — most colors used in interior design and clothing are tones rather than pure hues, because pure saturated hues are visually loud. (These are color terms and are unrelated to "tone" as a writer's attitude or "shade" as a witty insult.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-warm-vs-cool-colors',
    title: 'Warm vs Cool Colors',
    category: 'Color Theory',
    keywords: [
      'what is the difference between warm and cool colors', 'warm colours reds oranges yellows fire sun energy appear to advance toward the viewer feel active and exciting',
      'cool colours blues greens purples water sky ice appear to recede feel calm and distant', 'the split runs through the colour wheel roughly at red violet and yellow green as transition points',
      'used to create depth warm foreground cool background mood and focal points it is perceptual and cultural not physical a warm colour is not literally hotter',
    ],
    content: `In art and design, colors are divided into "warm" and "cool" by association. WARM colors — reds, oranges, and yellows — evoke fire, sunlight, and blood; they seem to advance toward the viewer, feel energetic, exciting, or aggressive, and draw the eye, so they make good focal points and foregrounds. COOL colors — blues, greens, and purples — evoke water, sky, ice, and shade; they seem to recede, feel calm, restful, or distant, and work well for backgrounds and large areas. The dividing line runs roughly across the color wheel, with red-violet and yellow-green as the ambiguous transition zones (a green can read warm or cool depending on whether it leans yellow or blue). Painters use the warm-advances / cool-recedes tendency to create the illusion of depth, and interior designers pick a temperature to set a room's mood. It is a perceptual and cultural convention, not physics — a "warm" red pigment is not actually any hotter than a "cool" blue one. (This is separate from the red/blue color-coding used on climate or temperature maps.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-magenta-not-a-wavelength',
    title: 'Why Magenta Is Not a Real Wavelength of Light',
    category: 'Color Theory',
    keywords: [
      'what does it mean that magenta is not a real wavelength of light', 'every spectral color red through violet corresponds to a single wavelength magenta and pink do not there is no wavelength that looks magenta',
      'magenta is what the brain produces when the l red and s blue cones are both stimulated but the m green cone is not', 'in the spectrum red is at one end and violet at the other with green in between so there is no single light that hits red and blue but skips green',
      'the brain invents magenta to bridge the gap closing the linear spectrum into a colour wheel an extra spectral color',
    ],
    content: `Sunlight split by a prism forms a spectrum from red (long wavelength, ~700 nm) through orange, yellow, green, blue, to violet (short, ~400 nm). Every one of those colors is a single wavelength of light. Magenta — and its pale form, pink — is different: there is NO wavelength of light that looks magenta. Magenta is a color the brain constructs. Your retina has three cone types: L (long, "red"), M (medium, "green"), and S (short, "blue"). When light stimulates the L and S cones strongly but the M cone very little, the brain has to interpret "lots of red and lots of blue, but no green." But in the real spectrum, red and blue are at opposite ends with green in between, so no single light can do that — it can only happen when red and blue light are mixed together. Rather than reporting nothing, the brain invents a new color to represent that impossible-in-the-spectrum combination, and that color is magenta. It is called an "extra-spectral" or "non-spectral" color, and it is what lets us bend the straight line of the spectrum around into a closed color wheel, joining the red end to the violet end.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gamma-correction',
    title: 'What Gamma Correction Is in Displays',
    category: 'Color Theory',
    keywords: [
      'what is gamma correction in displays', 'gamma correction a nonlinear adjustment applied to image brightness values raising them to a power around 1 over 2.2 to encode and 2.2 to decode',
      'human vision is nonlinear more sensitive to differences among dark tones so encoding with a gamma curve devotes more bits to the shadow range preventing banding in 8 bit images', 'historically crt monitors had a naturally nonlinear response the encoding gamma cancelled it modern displays emulate 2.2 or the srgb curve',
      'wrong gamma makes images look washed out or crushed linear workflows do math in un gamma space then reapply gamma',
    ],
    content: `Gamma correction is a nonlinear reshaping of an image's brightness values, done because neither human vision nor old displays are linear. Human perception is far more sensitive to brightness differences in the dark tones than in the bright ones — we can distinguish many near-black greys but few near-white ones. So digital images are stored "gamma-encoded": each pixel's linear light value is raised to a power of about 1/2.2 before saving, which stretches the shadow range and compresses the highlight range, so that the limited number of stored values (256 levels in an 8-bit image) are spread where the eye will notice them and the shadows don't show visible "banding." The display then "gamma-decodes" by raising the stored value to the power of ~2.2 to recover the true light output. Historically this worked out neatly because CRT monitors had a natural response curve of roughly output ∝ input^2.2, so the encoding gamma cancelled the monitor's gamma automatically; modern LCD and OLED screens deliberately mimic that ~2.2 curve (or the closely related sRGB curve) for compatibility. If the gamma is wrong, midtones look washed-out and milky (gamma too low) or dark and crushed (gamma too high). Serious 3D rendering, compositing, and color grading are done in "linear" space — undoing the gamma, doing the light math, then re-applying gamma for the screen. (This has nothing to do with the du Noüy ring method for surface tension.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chroma-vs-saturation',
    title: 'Chroma vs Saturation',
    category: 'Color Theory',
    keywords: [
      'what is the difference between chroma and saturation', 'both describe colorfulness but relative to different references saturation is colorfulness relative to that colors own brightness',
      'chroma is colorfulness relative to a neutral white of the same lighting so a dark pure hued color has lower chroma than a bright one even if both look fully saturated', 'hsv and hsl color pickers use saturation perceptual systems like munsell and lch use chroma',
      'colloquially the two words are used interchangeably',
    ],
    content: `Chroma and saturation both measure how "colorful" (as opposed to grey) a color is, but they use different reference points. SATURATION is colorfulness judged relative to the color's own brightness. By this measure, a bright vivid red and a dark version of that same pure red can both be "100% saturated," because in each case the color is as far from grey as it can be for its own lightness. This is the "S" in the HSV and HSL color models used in most software color pickers. CHROMA is colorfulness judged against a fixed reference — a neutral white illuminated the same way. By this measure the dark red has LOWER chroma than the bright red, because it is closer to black and therefore, in absolute terms, less colorful than the bright one. Perceptual color systems built to match how colorful things actually look — the Munsell system, and CIE LCh — use chroma rather than saturation for this reason. In everyday speech the two terms are used interchangeably. (Neither refers to "chroma subsampling" in video compression or "chroma keying" / green screen.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-metamerism',
    title: 'What Metamerism Is (Color)',
    category: 'Color Theory',
    keywords: [
      'what is metamerism in color', 'metamerism when two colored surfaces look identical under one light but different under another because they reflect different mixes of wavelengths that happen to stimulate the eyes three cones in the same ratio under the first light',
      'a shirt and trousers that match in the stores fluorescent light clash outdoors in sunlight car body panel repairs that match indoors but not in daylight', 'a direct result of the eye reducing a full spectrum to just three numbers',
      'check paint and fabric samples under the light they will actually be used in',
    ],
    content: `Metamerism is when two color samples look like an exact match under one light source but visibly different under another. It happens because your eye does not measure the full spectrum of light coming off a surface — it collapses it to just three numbers (the responses of the L, M, and S cones). Two surfaces can reflect quite different mixtures of wavelengths and still produce the same three cone responses under a particular light, so they look identical then. Change the light — swap the shop's fluorescent tubes for outdoor daylight, or a warm incandescent lamp — and the different reflectance spectra now produce different cone responses, so the "match" breaks and the two suddenly clash. Practical headaches this causes: a jacket and trousers bought together that match in the store but look mismatched outside; touch-up paint or a repaired car panel that blends in under the workshop lights but stands out in sunlight; and print or textile production, where color has to be evaluated under a standardised light booth. (This is the color-science meaning; "metamerism" in biology means having repeated body segments.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-purple-vs-violet',
    title: 'Why Purple and Violet Look Different',
    category: 'Color Theory',
    keywords: [
      'why do purple and violet look different', 'violet is a spectral color real light with a wavelength of about 380 to 420 nanometres the shortest visible seen at the end of a rainbow or from a prism',
      'purple is not spectral it is a mix of red and blue or violet light or pigment a non spectral color the brain constructs related to magenta', 'violet stimulates mainly the s blue cone with a little l red purple stimulates s and l more evenly',
      'perceptually violet looks slightly bluer and cooler purple looks redder',
    ],
    content: `Although people use the words loosely, violet and purple are physically different kinds of color. VIOLET is a spectral color: it is a single wavelength of real light, about 380–420 nanometres, the shortest wavelength the eye can see. You get pure violet at the far end of a rainbow or a prism spectrum, and from some LEDs and lasers. It stimulates mainly the S ("blue") cone, with only a slight response from the L ("red") cone. PURPLE is not in the spectrum at all — it is what you perceive when red light and blue (or violet) light are mixed, whether as light or as pigment. It is a "non-spectral" color the brain constructs (closely related to magenta), and it stimulates the S and L cones more evenly, with more red content than violet has. That extra red is why purple looks warmer and redder, while spectral violet looks cooler and closer to blue, often with a faint shimmer. In short: violet is one wavelength; purple is a combination.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-trichromacy-cones',
    title: 'How the Eye Sees Color (Trichromacy and Cones)',
    category: 'Color Theory',
    keywords: [
      'how does the human eye see color with cones', 'the retina has three cone types with different photopigments s short blue peak about 420 nm m medium green about 530 nm l long red about 560 nm',
      'any color is perceived from the ratio of the three cones responses yellow light stimulates m and l nearly equally with little s', 'this is why just three primaries rgb on a screen can fake almost every color they hit the three cones in the right ratios',
      'about 6 million cones vs 120 million rods cones cluster in the fovea for sharp central colour vision rods dominate the periphery and night vision',
    ],
    content: `Human color vision is "trichromatic" — it is built on three types of cone cell in the retina, each containing a pigment that responds best to a different band of wavelengths: S cones peak in the blue-violet (~420 nm), M cones in the green (~530 nm), and L cones in the yellow-green/red region (~560 nm). Their sensitivity ranges overlap heavily. The brain does not read wavelength directly; it perceives color from the RATIO of the three cones' outputs. A pure yellow light (~575 nm) stimulates the L and M cones almost equally and the S cone barely at all — and the brain reads that particular ratio as "yellow." Crucially, the exact same ratio can be produced by shining red and green light together with no actual yellow present, and the brain sees yellow just the same. This is the whole basis of color reproduction: a screen with only red, green, and blue sub-pixels can imitate almost any color a real scene contains, because it just needs to drive the three cones in the right proportions. The retina has roughly 6 million cones, densely packed in the central pit (fovea) that gives sharp, colorful central vision, versus about 120 million rods spread across the periphery for motion and dim-light vision.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-opponent-process',
    title: 'The Opponent-Process Theory of Color Vision',
    category: 'Color Theory',
    keywords: [
      'what is the opponent process theory of color vision', 'complements not replaces trichromatic theory cones do the initial catching then downstream neurons combine the cone signals into three opponent channels',
      'l minus m red green l plus m minus s blue yellow l plus m light dark', 'explains why we never see reddish green or bluish yellow why staring at red then looking away gives a green afterimage the fatigued red side lets green dominate the four unique hues',
    ],
    content: `Trichromatic theory explains how light is caught (three cone types), but not why certain color combinations feel impossible or why afterimages happen. Opponent-process theory explains the next stage. After the cones respond, neurons in the retina and the visual pathway combine their signals into three "opponent" channels, each of which can swing one way or the other but not both at once: a red-vs-green channel (roughly L cone minus M cone), a blue-vs-yellow channel (roughly S cone versus L+M), and a light-vs-dark (luminance) channel (L+M). This structure predicts several real observations. We never perceive "reddish-green" or "bluish-yellow," because those are opposite ends of a single channel — the channel cannot report both simultaneously. Afterimages: stare at a saturated red patch for 30 seconds and then look at white, and you see a green ghost, because the red side of that channel has fatigued and the green side now dominates the neutral input. And it accounts for the four "unique hues" — red, green, blue, yellow — that people across cultures describe as pure, unmixed colors (the points where one opponent channel is balanced). Modern color science treats trichromacy and opponent processing as two successive stages of the same system.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-color-gamut',
    title: 'What a Color Gamut Is and Why Screens Cannot Show Every Color',
    category: 'Color Theory',
    keywords: [
      'what is a color gamut and why cant screens show every color', 'a gamut is the subset of all visible colors that a device or color space can capture or reproduce plotted as a triangle for rgb on the horseshoe shaped diagram of all visible colors',
      'no display can show every visible color because it mixes just three fixed primaries the triangle cannot cover the whole horseshoe especially saturated cyans and greens', 'common gamuts srgb small the web standard adobe rgb wider for print dci-p3 wide modern phones and hdr rec 2020 very wide aspirational',
      'a wider gamut screen shows more saturated colors color management maps content between gamuts',
    ],
    content: `A color gamut is the range of colors a particular device, ink set, or color standard can actually produce or record. On the standard "chromaticity diagram" — a horseshoe shape containing every color a human can see — an RGB device's gamut is a TRIANGLE whose corners are its three primaries (its reddest red, greenest green, bluest blue); it can make any color inside that triangle by mixing, and none outside it. No display can reproduce every visible color, because a triangle drawn from three real, physically achievable primaries can never cover the whole curved horseshoe — the most saturated cyans, greens, and violets always fall outside. Common gamuts, from smaller to larger: sRGB (the long-standing default for the web and most monitors), Adobe RGB (extends into more saturated greens/cyans, used in print production), DCI-P3 (wider still, now standard on good phones, laptops, and HDR content), and Rec. 2020 (very wide, the target for HDR television, which no consumer display fully covers yet). A wide-gamut screen can show more vivid colors, but only if the content is authored for that gamut and "color management" correctly maps colors between the content's space and the display's — otherwise wide-gamut content looks oversaturated on a normal screen, or sRGB content looks garish on a wide-gamut screen.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-primary-colors-explained',
    title: 'What the Primary Colors Are and Why Answers Differ',
    category: 'Color Theory',
    keywords: [
      'what are the primary colors and why are there different answers', 'there is no universal set of primaries it depends on the color model',
      'for light additive rgb red green blue because human eyes have three cone types roughly tuned to those regions combining all three makes white', 'for printing subtractive cmy cyan magenta yellow each absorbs one additive primary plus black k',
      'the traditional art class ryb red yellow blue is a historical less accurate scheme that cannot mix a bright cyan or magenta',
    ],
    content: `There is no single "correct" set of primary colors — a set of primaries is just a choice of three (or four) colors from which a range of others can be mixed, and the right choice depends on whether you are mixing light or mixing colorants. For LIGHT (additive mixing, as on screens): RED, GREEN, BLUE. This set works because the human eye has three cone types roughly sensitive to those regions, so RGB can drive the cones in almost any ratio; adding all three at full strength gives white. For PRINTING AND DYES (subtractive mixing): CYAN, MAGENTA, YELLOW, plus black. Each of these absorbs ("subtracts") one of the additive primaries — cyan absorbs red, magenta absorbs green, yellow absorbs blue — so layering them filters white light down to any color; black (K) is added because C+M+Y overlapped makes a muddy dark brown, not a true black, and to save ink. The RED, YELLOW, BLUE taught in art classes is a much older scheme that predates modern color science; it is intuitive and fine for basic painting, but it cannot mix a clean bright cyan, magenta, or a wide range of vivid colors, which is why professional print and paint systems moved to CMY.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-scotopic-photopic-purkinje',
    title: 'Seeing Color in Dim Light (and Why Colors Fade at Night)',
    category: 'Color Theory',
    keywords: [
      'how do we see color in dim light and why do colors fade at night', 'photopic vision daylight cones color and detail scotopic vision very dim rods only brightness no color mesopic vision twilight both',
      'in dim light the cones stop responding and only the rods work so everything looks in shades of grey', 'dark adaptation takes 20 to 30 minutes the purkinje shift as light fades rods take over and their peak sensitivity is bluer than the cones so blues and greens look relatively brighter and reds look almost black',
    ],
    content: `The retina has two systems. Bright daylight vision ("photopic") uses the cones and gives full color and sharp detail. Very dim vision ("scotopic") uses only the rods, which are far more light-sensitive but come in a single type, so they report brightness only — no color. Twilight, when both contribute, is "mesopic." As light dims below a certain level the cones simply stop producing a useful signal, and with only the rods working, the world looks like shades of grey ("at night all cats are grey"). Full dark adaptation — the rods reaching maximum sensitivity — takes 20–30 minutes and is why you can gradually see more in a dark room. There is also a color-related effect as light fades called the PURKINJE SHIFT: the rods' peak sensitivity (~500 nm) is shifted toward the blue end compared with the cones' overall daytime sensitivity (~555 nm), so as dusk falls, blue and green objects look relatively brighter and "hold their color" longest, while reds darken toward black well before blues do (a red flower and green leaves that look similarly bright at noon look very different at dusk).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-simultaneous-contrast',
    title: 'What Simultaneous Contrast Is (Color Perception)',
    category: 'Color Theory',
    keywords: [
      'what is simultaneous contrast in color perception', 'a colours appearance is changed by the colours surrounding it a grey patch looks lighter on a dark background and darker on a light background',
      'a colored patch takes on a tint of the complement of its surround grey on red looks slightly green grey on blue looks slightly yellow', 'caused by lateral inhibition in the retina and opponent processing',
      'josef albers interaction of color the same colour can be made to look like two different colours and two different colours like one',
    ],
    content: `Simultaneous contrast is the fact that a color never looks the same in isolation as it does surrounded by other colors — the surroundings push its appearance. Two effects combine. In LIGHTNESS: an identical grey square looks noticeably lighter on a black background and darker on a white background. In HUE: a neutral grey square surrounded by red takes on a faint greenish tint, surrounded by blue it looks slightly yellowish — the eye adds a hint of the surround's OPPONENT (complementary) color to the enclosed patch. Two saturated complementary colors placed edge to edge each make the other look more intense and can seem to shimmer or "vibrate" at the boundary. The cause is in the wiring: neurons in the retina and visual cortex use "lateral inhibition," where a strongly stimulated region suppresses its neighbors, combined with opponent color processing. The artist Josef Albers built his book and teaching course "Interaction of Color" around this, showing that a single color can be made to look like two different colors, and two different colors made to look identical, purely by changing what is next to them — which is why picking paint or design colors from tiny isolated swatches is unreliable.`,
    createdAt: Date.now(),
  },
];
