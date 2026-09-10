import { KnowledgeItem } from '../../types';

/**
 * ART_CONCEPTS_GAPS_2 — batch 258 corrections. nexus-4b was solid on art
 * movements (Impressionism/Expressionism, Cubism/Futurism, Renaissance/Baroque,
 * etching/engraving, carving/modeling, relief/in-the-round). Misses:
 * - "positive vs negative space" answered about Isaiah Berlin's positive/
 *   negative LIBERTY (political philosophy).
 * - "composition vs design" answered about software design patterns
 *   ("favour composition over inheritance").
 * - "form vs shape" answered about a figure-eight knot and architecture.
 * - "Baroque vs Rococo" answered about MUSIC (Bach, harpsichords).
 * - "fine art vs applied art" and "drawing vs painting" gave printmaking
 *   nonsense.
 * - "modern vs contemporary art" gave "modern = 1960s-70s".
 * - "Surrealism vs Dadaism", "watercolor vs gouache" were web dumps.
 * - "casting vs carving" was self-contradicting.
 * - "Realism vs Naturalism", "contrapposto vs frontal", "complementary vs
 *   analogous", "warm vs cool colors" were cut off.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'art', keywords, content, createdAt: now,
});

export const ART_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-art2-positive-vs-negative-space',
    'Positive vs negative space (art and design)',
    [
      'difference between positive and negative space', 'positive space is the area occupied by the subjects the objects figures or forms the artist is depicting', 'negative space is the empty area around and between those subjects the background and the gaps',
      'good use of negative space gives forms room to breathe creates balance the Rubin vase the FedEx arrow figure-ground', 'not Isaiah Berlin positive and negative liberty',
    ],
    `In visual art, design, and photography (this is not about political freedom):

POSITIVE SPACE is the area taken up by the SUBJECT of the work — the objects, the figures, the forms the artist actually wants you to look at. In a still life it is the fruit and the bowl; in a portrait it is the person.

NEGATIVE SPACE is the EMPTY area AROUND and BETWEEN those subjects — the background, the sky, the gaps between a figure's arm and body, the space inside the handle of a jug.

The key point is that negative space is NOT nothing — it is an ACTIVE part of the composition. Artists and designers use it deliberately to:
- give the subject "room to breathe" and keep an image from feeling cramped;
- create BALANCE (a large empty area can counter-weight a small dense subject);
- shape the eye's path and create tension or calm;
- make the negative shapes THEMSELVES interesting.
And in "FIGURE-GROUND" designs the negative space is made to read as a SECOND image: the Rubin vase (two faces or a vase), the arrow hidden between the "E" and "x" in the FedEx logo, the panda in the WWF logo, and much of the work of M.C. Escher.

Drawing exercises often ask you to draw only the negative shapes ("draw the space between the chair legs, not the chair"), because it forces accurate observation.`,
  ),
  k(
    'kb-gap-art2-composition-vs-design',
    'Composition vs design (visual art)',
    [
      'difference between composition and design art', 'design is the broad term for the deliberate organisation of the visual elements line shape form colour value texture space according to the principles balance contrast emphasis movement rhythm proportion unity to create a coherent effective whole applies to any visual field', 'composition means the arrangement of those elements within the frame or picture plane of a particular work placement eye movement distribution of weight use of the format edges focal points the rule of thirds leading lines',
      'composition is essentially the design of a specific picture the terms overlap and are often used interchangeably not software design patterns',
    ],
    `In visual art these terms overlap heavily and are often used interchangeably, but there is a shade of difference (and this has nothing to do with software).

DESIGN, in the broad artistic sense, is the deliberate ORGANISATION of the visual ELEMENTS — line, shape, form, colour, value, texture, and space — using the PRINCIPLES of design — balance, contrast, emphasis, movement, rhythm, pattern, proportion/scale, and unity/variety — to make a coherent and effective whole. "Design" in this sense applies to ANY visual thing: a poster, a room, a garden, a website, a painting, a building facade. It is the general activity of arranging visual stuff on purpose.

COMPOSITION usually refers specifically to the ARRANGEMENT of the elements WITHIN THE FRAME (the picture plane, the format) of a PARTICULAR two-dimensional work — a painting, drawing, photograph, or film shot. Compositional decisions include: where the main subject sits, how the viewer's eye enters and travels through the piece, the distribution of visual "weight", how forms relate to the edges and corners, the use of a focal point, and devices like the rule of thirds, the golden section, leading lines, framing, and the S-curve or triangular arrangement.

So: composition is essentially "the design of a specific picture". People say "composition" for paintings, photos, and music, and "design" for functional/graphic work and as the general underlying principle.`,
  ),
  k(
    'kb-gap-art2-form-vs-shape',
    'Form vs shape (elements of art)',
    [
      'difference between form and shape art', 'a shape is a two-dimensional flat area defined by a boundary an outline or an edge where colour or value changes length and width only a circle a square an organic blob a silhouette', 'a form is a three-dimensional object or the illusion of one length width and depth or volume a sphere a cube a cylinder a human figure',
      'on a 2D surface an artist turns a shape into an apparent form by adding value shading highlights and shadows that imply volume and how light falls', 'a real sculpture is literally a form',
    ],
    `Both are elements of art, and the difference is DIMENSIONS.

A SHAPE is TWO-dimensional and FLAT. It is an area enclosed by a BOUNDARY — an actual outline, or an "implied" edge where colour, value, or texture changes. A shape has LENGTH and WIDTH only, no depth. Shapes are described as GEOMETRIC (circle, square, triangle, hexagon) or ORGANIC/free-form (a leaf outline, a puddle, a blob), and as positive or negative. A silhouette is a shape.

A FORM is THREE-dimensional. It has LENGTH, WIDTH, AND DEPTH (volume, mass). Forms are the 3D counterparts of shapes: a circle's form is a SPHERE, a square's is a CUBE, a triangle's is a CONE or pyramid, and there are organic forms like a pebble or a human body. A physical SCULPTURE is literally a form.

On a flat surface (a drawing or painting) an artist can only depict shapes directly — but by adding VALUE (shading, highlights, cast shadows, reflected light) that shows how light falls across a surface, a flat shape is made to LOOK like a solid form: a plain circle becomes a shaded ball, a rectangle becomes a shaded box. So "turning shapes into forms" through modelling with light and shadow is a core drawing skill.

Quick check: can you only see its outline (flat)? Shape. Does it look solid and turn in space (or is it an actual object)? Form.`,
  ),
  k(
    'kb-gap-art2-baroque-vs-rococo',
    'Baroque vs Rococo (visual art and architecture)',
    [
      'difference between Baroque and Rococo art', 'Baroque about 1600 to 1730 grand dramatic powerful dark dynamic often religious or absolutist heavy forms strong contrasts chiaroscuro awe and grandeur Caravaggio Bernini Rubens Rembrandt', 'Rococo about 1720 to 1770 originating in France a lighter more playful decorative evolution smaller scale asymmetrical curves and shell motifs rocaille pastel colours gold and white mirrors and frivolous subjects love leisure aristocratic pleasure Watteau Fragonard Boucher',
      'Baroque equals weighty drama and power Rococo equals airy elegance and charm not the music',
    ],
    `In painting, sculpture, and architecture (not music — the Bach/Vivaldi answer is the musical Baroque):

BAROQUE (roughly 1600-1730) was GRAND, DRAMATIC, and POWERFUL. It used bold movement and strong diagonals, deep shadow and theatrical spotlighting (chiaroscuro, tenebrism), intense emotion, illusionistic ceilings, and monumental scale, to inspire AWE. Its subjects were often religious (the Catholic Counter-Reformation wanted art that moved worshippers) or served absolute monarchs and popes. Key figures: Caravaggio, Bernini, Rubens, Rembrandt, Velazquez; buildings like St Peter's colonnade and Versailles.

ROCOCO (roughly 1720-1770), which began in the salons of Paris after Louis XIV died, was a LIGHTER, more PLAYFUL, and highly DECORATIVE development of the Baroque. It shrank the scale from public grandeur to intimate charm: delicate ASYMMETRICAL curves, shell and foliage motifs ("rocaille"), PASTEL colours, white-and-gold interiors, mirrors and porcelain, and a general air of frivolity. Its subjects were LOVE, flirtation, leisure, mythological dalliance, and aristocratic pleasure gardens ("fetes galantes"). Key figures: Watteau, Boucher, Fragonard ("The Swing"), Tiepolo.

Short version: Baroque = weight, drama, power, and dark grandeur; Rococo = lightness, elegance, ornament, and pastel charm. Neoclassicism then rebelled against Rococo's frivolity in the name of ancient seriousness.`,
  ),
  k(
    'kb-gap-art2-watercolor-vs-gouache',
    'Watercolor vs gouache',
    [
      'difference between watercolor and gouache', 'both are water-based paint pigment plus gum arabic binder that re-wet when water touches them', 'watercolour is transparent build colour in thin washes the white of the paper shows through and provides the lights leave paper bare or lift colour for highlights luminous glowing quality mistakes are hard to fix',
      'gouache body colour is opaque added white pigment chalk and a higher pigment load so it covers what is underneath dries to a flat matte finish you can paint light over dark can be reworked used more like acrylic favoured for illustration design and comics',
    ],
    `Both are water-based paints — pigment ground in a GUM ARABIC binder — and both stay water-soluble when dry (a wet brush lifts and moves them). The difference is OPACITY.

WATERCOLOUR is TRANSPARENT (or translucent). You paint in thin, watery WASHES and build depth by layering ("glazing") one transparent film over another. Because the paint is see-through, the LIGHTS in a watercolour come from the WHITE OF THE PAPER shining up through the pigment — so you plan ahead, leaving paper bare (or lifting/masking) for your brightest areas. This gives watercolour its characteristic LUMINOUS, glowing, airy quality. The trade-off: it is unforgiving — you cannot easily paint a light colour over a dark one, and mistakes are hard to correct.

GOUACHE (also called "body colour", or "designer's colour") is essentially OPAQUE watercolour: it has added white chalk and a higher pigment-to-binder ratio, so the paint COVERS what is beneath it. It dries to a FLAT, MATTE, velvety finish with no shine. Because it is opaque you CAN paint light over dark, add highlights last, and rework passages — so it handles more like acrylic or poster paint. It is the traditional medium for ILLUSTRATION, animation backgrounds, comic art, graphic design, and colour studies. (Acrylic gouache is a modern version that is waterproof once dry.)

Many painters use both together — transparent watercolour washes for atmosphere, opaque gouache for crisp details and highlights.`,
  ),
  k(
    'kb-gap-art2-drawing-vs-painting',
    'Drawing vs painting',
    [
      'difference between drawing and painting', 'drawing is the art of making marks primarily line and tone usually with a dry or linear medium pencil charcoal pen and ink chalk on paper emphasising contour structure and value traditionally the foundational discipline and often preparatory', 'painting is the application of pigment wet colour with a brush or other tool to a surface working primarily with colour mass and the interaction of hues oil acrylic watercolour tempera',
      'the boundary blurs ink washes coloured pencil pastel called both', 'not lithography',
    ],
    `DRAWING is the art of MARK-MAKING. It works primarily with LINE and TONE (value), typically using a DRY or linear medium — graphite pencil, charcoal, conte crayon, pen and ink, chalk, silverpoint — applied to paper. Drawing emphasises CONTOUR, STRUCTURE, gesture, proportion, and the arrangement of light and dark. It is usually monochrome or limited in colour. Historically drawing is the FOUNDATIONAL discipline (the Italian "disegno" meant both drawing and design/conception), the medium of studies, sketches, and cartoons made in preparation for paintings, prints, and sculptures — though drawings have long also been valued as finished works.

PAINTING is the application of PIGMENT suspended in a liquid BINDER — oil, acrylic, watercolour, tempera, encaustic — with a brush, knife, or other tool, onto a support (canvas, panel, paper, wall). Painting works primarily with COLOUR: hue relationships, the illusion of light and atmosphere, mass and volume built by tone and colour rather than by outline, and the physical texture of the paint itself.

The boundary is genuinely fuzzy: ink and watercolour WASHES, coloured pencil, and especially PASTEL (dry sticks of pigment, blended with the fingers) sit between the two and are called "drawing" or "painting" by different people. The rough distinction is: line and mark-making in a mostly linear, often dry medium = drawing; colour and mass in fluid paint = painting.`,
  ),
  k(
    'kb-gap-art2-fine-vs-applied-art',
    'Fine art vs applied art',
    [
      'difference between fine art and applied art', 'fine art high art is made primarily for aesthetic or intellectual and expressive purposes to be contemplated for its own sake with no practical function painting sculpture drawing printmaking and now photography film installation', 'applied art decorative arts overlapping with design and craft applies aesthetic principles to the design of functional objects furniture ceramics textiles jewellery glassware metalwork typography product and graphic design architecture',
      'the distinction emerged in the Renaissance hardened in the 18th to 19th centuries and is much debated and blurred today Arts and Crafts the Bauhaus reject it',
    ],
    `The distinction is about PURPOSE, and it is a historical hierarchy that many now reject.

FINE ART (sometimes "high art") is art made mainly for AESTHETIC contemplation and INTELLECTUAL or EMOTIONAL expression — to be looked at, thought about, and valued for its own sake, with NO practical function. The traditional "fine arts" are PAINTING, SCULPTURE, DRAWING, and PRINTMAKING (with poetry, music, and dance often included in the wider sense), and today the category has expanded to include PHOTOGRAPHY, film/video, installation, performance, and conceptual art.

APPLIED ART (overlapping with the "DECORATIVE ARTS", "design", and "craft") is art in which aesthetic skill and principles are APPLIED to the making of FUNCTIONAL objects and useful things: FURNITURE, CERAMICS and pottery, TEXTILES and clothing, JEWELLERY, glassware, metalwork and silversmithing, bookbinding, TYPOGRAPHY, and modern PRODUCT DESIGN, GRAPHIC DESIGN, and much of ARCHITECTURE. The object has a job to do; it is also made to be beautiful.

This split emerged in the Renaissance (as painters and sculptors campaigned to be seen as "liberal" artists, not mere craftsmen) and hardened in the 18th-19th centuries. It is now widely seen as ARTIFICIAL and elitist — the Arts and Crafts movement, Art Nouveau, the Bauhaus, and a great deal of contemporary practice deliberately erase the line, treating a well-designed chair or a ceramic vessel as fully "art".`,
  ),
  k(
    'kb-gap-art2-modern-vs-contemporary',
    'Modern art vs contemporary art',
    [
      'difference between modern and contemporary art', 'modern art is the period roughly from the 1860s to about the 1960s or 70s Impressionism Post-Impressionism Fauvism Cubism Expressionism Dada Surrealism Abstract Expressionism continuous formal experimentation rejection of academic tradition art for arts sake the avant-garde belief in progress', 'contemporary art is art of the present and recent past commonly dated from about 1970 to now more pluralistic globalised medium-diverse installation performance video digital often theory-driven engaged with identity politics institutional critique no single dominant style',
    ],
    `These are art-historical PERIOD terms with roughly fixed date ranges — not just "old" and "new".

MODERN ART covers roughly the 1860s/1870s to about the 1960s. It begins with Manet and the Impressionists breaking from academic painting, and runs through Post-Impressionism, Fauvism, CUBISM, Expressionism, Futurism, Constructivism, DADA, SURREALISM, Bauhaus design, and ABSTRACT EXPRESSIONISM. What unites it is a spirit of relentless FORMAL EXPERIMENTATION and rejection of tradition, a succession of "-isms" and avant-garde manifestos, an emphasis on the medium itself and "art for art's sake", and a broad belief in PROGRESS. (Confusingly, "modern art" museums like MoMA and the Tate Modern hold both modern and contemporary work.)

CONTEMPORARY ART is art of "now" and the recent past — usually dated from about 1970 (after Abstract Expressionism, with the rise of Pop, Minimalism, and Conceptual art) up to the present, and continually moving forward. It is far more PLURALISTIC and GLOBALISED — no single dominant style — and highly diverse in MEDIUM (installation, performance, video, photography, digital and new media, social/participatory practice, as well as painting and sculpture). It tends to be idea- and THEORY-driven and openly engaged with IDENTITY, race, gender, politics, ecology, globalisation, and critique of art institutions themselves.

Rule of thumb: modern art = the experimental era ~1870-1970; contemporary art = roughly 1970 to today, ongoing.`,
  ),
  k(
    'kb-gap-art2-surrealism-vs-dada',
    'Surrealism vs Dada',
    [
      'difference between Surrealism and Dadaism', 'Dada about 1916 to 1924 born in Zurich at the Cabaret Voltaire then Berlin Paris New York Tzara Duchamp Arp Hoch an anti-art anti-war anti-bourgeois movement deliberately absurd nihilistic provocative chance-based collage photomontage readymades nonsense poetry rejecting reason and tradition it blamed for the war', 'Surrealism founded 1924 Andre Breton growing directly out of Paris Dada Dali Magritte Ernst Miro Man Ray a constructive positive program to liberate the unconscious mind drawing on Freud through dream imagery automatism and unexpected juxtapositions',
    ],
    `Surrealism grew directly out of Dada, so they share a rebellious spirit and personnel — but their aims differ.

DADA (roughly 1916-1924) was born during World War I, first at the Cabaret Voltaire in neutral Zurich, then in Berlin, Cologne, Paris, and New York (Tzara, Hugo Ball, Hans Arp, Marcel Duchamp, Hannah Hoch, Max Ernst, Man Ray). It was ANTI-ART, ANTI-WAR, and anti-bourgeois — a deliberately ABSURD, nihilistic, provocative assault on the rationality, nationalism, and "civilised" values that Dadaists blamed for the slaughter of the war. Its methods: CHANCE operations, COLLAGE and PHOTOMONTAGE, "READYMADES" (Duchamp signing a urinal "R. Mutt" and calling it Fountain), sound poetry, and nonsense. Dada tears things down and refuses to mean anything.

SURREALISM (founded 1924 with Andre Breton's first Manifesto, in Paris, out of the ashes of Paris Dada — Breton, Dali, Magritte, Ernst, Miro, Man Ray, Tanguy) had a CONSTRUCTIVE, positive program. Drawing on FREUD, it aimed to LIBERATE THE UNCONSCIOUS mind and reunite it with waking life, to reach a "SURREALITY" of the marvellous. Its methods: DREAM imagery and dream-logic, precise illusionistic rendering of impossible scenes (Dali, Magritte), AUTOMATISM (automatic drawing and writing done fast to bypass conscious control — Miro, Masson), frottage and decalcomania, and startling JUXTAPOSITIONS ("the chance meeting of an umbrella and a sewing machine on a dissecting table").

Short version: Dada = anti-art protest, absurdity, chance, tearing down; Surrealism = pro-imagination, the unconscious, dreams, building a new reality.`,
  ),
  k(
    'kb-gap-art2-casting-vs-carving',
    'Casting vs carving (sculpture)',
    [
      'difference between casting and carving sculpture', 'carving is direct and subtractive the artist cuts the final work straight from a block of durable material marble wood ivory each carved piece is unique physically demanding and unforgiving', 'casting is indirect and reproductive the artist makes a model usually modelled in clay or wax a mould is taken and molten metal bronze plaster resin or concrete is poured in multiple identical casts an edition can be pulled from one mould thin delicate cantilevered forms are possible a broken cast can be remade',
    ],
    `Both are ways to make a finished sculpture, but they are opposite approaches.

CARVING is DIRECT and SUBTRACTIVE. The sculptor starts with a solid BLOCK of hard, permanent material — marble, granite, limestone, hardwood, ivory, jade — and REMOVES material with chisels, gouges, rasps, and abrasives until the form is "released" from the block. Every carved sculpture is UNIQUE; the work is physically hard and slow, and it is UNFORGIVING — a piece knocked off cannot be reattached without a visible repair, so the sculptor must plan carefully and cannot easily change direction. Michelangelo's "David", most Greek and Gothic stone figures, and African and Pacific wood carving are direct carvings.

CASTING is INDIRECT and REPRODUCTIVE. The sculptor first makes a MODEL — usually MODELLED (built up) in soft clay or wax, sometimes carved in a temporary material. A MOULD is taken from that model, and then a liquid that later hardens — molten BRONZE (via the lost-wax method), or plaster, resin, or concrete — is POURED into the mould and allowed to set, producing a copy. Advantages: MULTIPLE identical casts (an "edition", often numbered like prints) can be pulled from one mould; the metal can support THIN, delicate, and CANTILEVERED forms that stone would snap under (an outstretched arm, a rearing horse's legs); and if a cast is damaged another can be made. Rodin's bronzes, Degas's dancers, and most public monuments are cast.

Short version: carving = cut the one-and-only piece from solid stone or wood; casting = pour metal (or plaster/resin) into a mould taken from a model, and you can make several.`,
  ),
  k(
    'kb-gap-art2-contrapposto-vs-frontal',
    'Contrapposto vs a frontal pose',
    [
      'difference between contrapposto and a frontal pose', 'a frontal or hieratic pose shows a figure standing rigidly upright weight evenly on both feet shoulders and hips level and parallel facing directly forward static symmetrical formal iconic Egyptian statues Archaic Greek kouroi Byzantine icons', 'contrapposto counterpoise introduced by the Greeks about 480 BCE revived in the Renaissance shows the figure with its weight shifted onto one leg so the hips and shoulders tilt in opposite directions and the spine forms a gentle S-curve natural alive capable of movement the classical standard for the standing figure',
    ],
    `Two ways of arranging a standing human figure in sculpture and painting.

A FRONTAL POSE (also "frontal", "hieratic", or "iconic") shows the figure standing RIGIDLY UPRIGHT and SYMMETRICAL: weight distributed EVENLY on both feet, the hips and shoulders LEVEL and parallel to each other and to the picture plane, the head facing straight ahead, arms often held stiffly at the sides. The effect is STATIC, formal, timeless, and imposing — but stiff and lifeless. This is the pose of ancient EGYPTIAN statues, ARCHAIC Greek kouroi (c. 600 BCE), Byzantine and Romanesque religious images, and playing-card kings — used deliberately for gods, pharaohs, and saints where dignity and permanence matter more than naturalism.

CONTRAPPOSTO (Italian for "counterpoise", also "weight-shift") shows the figure with its weight resting on ONE leg (the "engaged" leg, straight and locked) while the other leg is RELAXED and slightly bent. Because of that shift, the HIPS tilt one way and the SHOULDERS tilt the OPPOSITE way, and the spine takes on a gentle S-CURVE. The result is a figure that looks NATURAL, at ease, and capable of movement — as if it could take a step. The Greeks invented it around 480 BCE (the Kritios Boy, then Polykleitos's Doryphoros), and Renaissance sculptors (Donatello's David, Michelangelo's David) revived it as the classical standard for the human figure.

So: frontal = balanced, rigid, symmetrical, "at attention"; contrapposto = weight on one leg, hips and shoulders counter-tilting, an S-curve, "at rest and alive".`,
  ),
  k(
    'kb-gap-art2-complementary-vs-analogous',
    'Complementary vs analogous colors',
    [
      'difference between complementary and analogous colors', 'complementary colours are opposite each other on the colour wheel red and green blue and orange yellow and violet placed side by side they create maximum contrast and vibrancy and make each other look more intense mixed together they neutralise into grey or brown', 'analogous colours are adjacent on the colour wheel yellow yellow-green green usually one primary plus its neighbouring secondary and tertiary they create harmonious unified low-contrast restful colour schemes because they share an underlying hue',
    ],
    `Two ways colours relate on the COLOUR WHEEL, used to build colour schemes.

COMPLEMENTARY colours sit DIRECTLY OPPOSITE each other on the wheel: red / green, blue / orange, yellow / violet (and, in a 12-part wheel, red-orange / blue-green, etc.). Their effect:
- placed SIDE BY SIDE they produce the strongest possible CONTRAST and make each other look MORE intense and vibrant ("simultaneous contrast") — orange sails against a blue sea, a red poppy in green grass;
- MIXED together they cancel each other out, producing a neutral GREY or muddy BROWN — which is how painters "grey down" or dull a colour without using black.
Artists use complementary contrast for energy, for making a focal point pop, and for vibrating optical effects. "Split-complementary" (a colour plus the two colours either side of its complement) is a slightly softer version.

ANALOGOUS colours sit NEXT TO each other on the wheel — for example yellow, yellow-green, and green; or red, red-orange, and orange. Because they all contain some of the same underlying hue, they blend and relate easily, so an analogous scheme is HARMONIOUS, UNIFIED, and low-contrast — calm and restful (the greens and blue-greens of a forest, the reds and oranges of a sunset). To keep an analogous painting from feeling flat, artists often add a small hit of the complementary colour as an accent.

Short version: complementary = opposites, maximum contrast and pop (or neutralise when mixed); analogous = neighbours, harmony and unity.`,
  ),
  k(
    'kb-gap-art2-warm-vs-cool-colors',
    'Warm vs cool colors',
    [
      'difference between warm and cool colors', 'warm colours are the reds oranges and yellows associated with fire sun blood and energy they appear to advance toward the viewer feel active exciting and cosy', 'cool colours are the blues greens and violets associated with water sky ice and shade they appear to recede feel calm distant and restful',
      'the division runs roughly across the colour wheel yellow-green and red-violet are ambiguous temperature is also relative a warm green leaning yellow versus a cool green leaning blue',
    ],
    `Colours are grouped into WARM and COOL by the sensations and associations they carry, and painters use the contrast between them constantly.

WARM colours are the REDS, ORANGES, and YELLOWS. Associations: FIRE, sun, blood, autumn leaves, warmth, energy. Perceptually they seem to ADVANCE — to come forward toward the viewer — and they feel ACTIVE, exciting, aggressive, or cosy.

COOL colours are the BLUES, GREENS, and VIOLETS. Associations: WATER, sky, ice, shade, foliage, night. Perceptually they seem to RECEDE — to fall back into the distance — and they feel CALM, quiet, distant, or melancholy.

Two important refinements:
1. The dividing line runs roughly across the wheel, but the transition zones — YELLOW-GREEN and RED-VIOLET/magenta — are ambiguous and can read either way.
2. Temperature is RELATIVE. There is a "warm" red (leaning orange, like cadmium red) and a "cool" red (leaning violet, like alizarin), a warm green and a cool green, and so on. Any colour looks warmer next to a cooler neighbour and cooler next to a warmer one.

Painters exploit warm/cool contrast to create DEPTH (warm forms pushed forward, cool ones pushed back — used with atmospheric perspective, where distant things go cooler and bluer), to set MOOD, to model form (a warm light usually implies cool shadows and vice versa), and to make a focal point stand out.`,
  ),
  k(
    'kb-gap-art2-realism-vs-naturalism',
    'Realism vs Naturalism (in art)',
    [
      'difference between Realism and Naturalism in art', 'Realism mid-19th century Courbet Millet Daumier rejected Neoclassical idealism and Romantic drama to depict ordinary people and everyday life including the poor labourers and rural hardship honestly without idealisation or sentimentality often with a social or political edge', 'Naturalism a later related tendency about 1870s to 1890s more associated with literature Zola but also painting Bastien-Lepage pushed toward even more objective quasi-scientific observation and meticulous detailed accuracy often applying ideas of environment and heredity shaping human behaviour and a cooler more detached tone',
    ],
    `Both aim to show the world "as it is" rather than as idealised, and the two words are often used loosely as synonyms — but art historians draw a distinction.

REALISM, as a specific mid-19th-century MOVEMENT, was led by Gustave COURBET in France (with Jean-Francois Millet, Honore Daumier, and later the Americans Eakins and Homer). It rejected BOTH the noble myths of Neoclassicism AND the exotic drama of Romanticism, insisting that the proper subject of art was CONTEMPORARY, ORDINARY LIFE — peasants at work, stone-breakers, a rural funeral, the urban poor, prostitutes — depicted HONESTLY, at large scale, without flattery, prettification, or moralising. Realism carried a democratic and often POLITICAL charge: it was a statement that common people and unglamorous reality were worth a serious painting.

NATURALISM is a later, related tendency (roughly 1870s-1890s), most fully developed in LITERATURE (Emile Zola, whose novels applied ideas of HEREDITY and ENVIRONMENT determining human fate) but also in painting (Jules Bastien-Lepage, the plein-air rural scenes of the "Newlyn School"). Naturalism pushed toward even more OBJECTIVE, dispassionate, quasi-SCIENTIFIC observation: meticulous detail, accurate light and surface, a cooler and less obviously "authored" tone than Courbet's assertive Realism, and often a documentary interest in how people are shaped by their conditions.

Rough distinction: Realism = truthful, unidealised subject matter chosen with a viewpoint and often a social message; Naturalism = detached, minutely detailed, "scientific" recording of appearances and of humans as products of nature and circumstance.`,
  ),
  k(
    'kb-gap-art2-lithograph-vs-screenprint',
    'Lithograph vs screen print',
    [
      'difference between a lithograph and a screen print', 'lithography is a planographic process the printing surface is flat based on grease and water repelling each other the artist draws with a greasy crayon or ink on a limestone or metal plate treated chemically kept wet then oily ink is rolled on and sticks only to the greasy drawn areas reproduces the full range of drawn marks crayon texture washes spatter editions of identical prints', 'screen printing serigraphy silkscreen is a stencil process ink is pushed with a squeegee through a fine mesh screen onto the paper below the stencil blocks it and lets it pass elsewhere flat bold areas of solid colour one screen per colour Warhol Pop art',
    ],
    `Both are printmaking methods that produce EDITIONS of matching prints, but the mechanism is completely different.

LITHOGRAPHY is a PLANOGRAPHIC process — the printing surface stays FLAT (nothing is cut into it or raised up). It relies on the fact that GREASE and WATER REPEL each other. The artist draws the image directly onto a smooth LIMESTONE slab (or a grained metal plate) with a greasy crayon or a greasy ink ("tusche"). The stone is chemically treated so the drawn areas hold grease and the blank areas hold water. To print, the stone is dampened with water, then an oil-based INK is rolled across it: the ink STICKS ONLY to the greasy drawn marks and is repelled by the wet blank areas. Paper is pressed on, and the image transfers. Lithography can reproduce the FULL range of drawn marks — crayon grain, brushed washes, spatter, fine line — which is why artists from Goya and Daumier to Toulouse-Lautrec and Picasso loved it, and why it became the basis of commercial "offset" printing.

SCREEN PRINTING (also SERIGRAPHY or SILKSCREEN) is a STENCIL process. A fine mesh SCREEN is stretched on a frame; areas that should NOT print are BLOCKED (with a hand-cut stencil, a painted-on filler, or a photographic emulsion). Paper is placed under the screen, ink is poured on top, and a rubber SQUEEGEE pushes the ink THROUGH the open mesh onto the paper. Each COLOUR needs its own screen, printed in turn. The result is characteristically FLAT, opaque, hard-edged areas of solid colour — the look of Andy Warhol's Marilyn and Campbell's Soup prints, band posters, and printed T-shirts.

So: lithograph = draw greasy on flat stone, print with grease/water chemistry, painterly marks; screen print = push ink through a stencil in a mesh, flat bold colour blocks.`,
  ),
  k(
    'kb-gap-art2-value-vs-tone',
    'Value vs tone (in art)',
    [
      'difference between value and tone in art', 'value and tone are often used as synonyms both meaning the lightness or darkness of a colour or area independent of hue from white through greys to black value is the more common term in American art education', 'tone is used that way especially in British usage but tone also has a second meaning a colour modified by adding grey as opposed to a tint colour plus white or a shade colour plus black and tone can colloquially mean the overall mood or colour cast of a work',
    ],
    `In practice VALUE and TONE are USUALLY SYNONYMS: both mean how LIGHT or DARK an area is, on a scale from white through the greys to black, IGNORING its colour (hue). A "value study" or "tonal study" is the same thing — a quick monochrome sketch (often in grey or a single colour) done to work out the arrangement of lights and darks before adding colour, since strong value structure is what makes a composition read.

"VALUE" is the standard term in American art education and colour theory (as one of the three properties of colour: hue, saturation, value).

"TONE" is used for that same meaning especially in British art writing — but "tone" carries two extra senses that "value" does not:
1. TECHNICAL colour-mixing sense: a "tone" is a colour that has been dulled by adding GREY, as distinct from a "TINT" (a colour plus WHITE, making it lighter and paler) and a "SHADE" (a colour plus BLACK, making it darker). So "tones of blue" can specifically mean greyed-down blues.
2. COLLOQUIAL sense: the overall "tone" of a painting means its mood or dominant colour cast — "a warm golden tone", "a sombre tone".

So if someone says "check your values" and "check your tones" in a drawing class, they mean the same thing; but "add a tone" at the palette can mean specifically "mix in some grey".`,
  ),
];
