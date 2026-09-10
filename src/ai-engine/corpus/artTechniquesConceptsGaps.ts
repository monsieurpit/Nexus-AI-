import { KnowledgeItem } from '../../types';

/**
 * ART_TECHNIQUES_CONCEPTS_GAPS — batch 206 corrections.
 * Visual-art vocabulary the corpus got wrong or dumped from the web: fresco
 * described as a separable varnished object, "in the round vs relief" answered
 * about casting vs carving, "etching is intaglio and engraving is relief"
 * (both are intaglio), figurative art wrongly said to require a human figure,
 * foreshortening conflated with atmospheric shrinking, "value vs saturation"
 * answered about statistical variance, plus raw web dumps for chiaroscuro/
 * sfumato, watercolour/gouache, warm/cool colours, Pointillism/Divisionism,
 * triptych/diptych and print-edition/artist-proof.
 */
export const ART_TECHNIQUES_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-arttech-fresco-vs-mural',
    title: 'Fresco vs mural',
    category: 'art',
    keywords: [
      'difference between a fresco and a mural', 'fresco vs mural', 'buon fresco',
      'fresco secco', 'wet plaster', 'wall painting', 'intonaco', 'Sistine Chapel',
      'not a separate object', 'ceiling painting',
    ],
    content: `A mural is any large painting made directly on a wall or ceiling, regardless of technique. It is not a separate movable object; it is part of the architecture. Murals can be painted in oil, acrylic, spray paint, tempera or fresco.

A fresco is one specific mural technique. In true fresco (buon fresco) the artist paints with pigments mixed only in water onto a fresh layer of wet lime plaster (the intonaco). As the plaster dries, a chemical reaction (carbonation) binds the pigment permanently into the wall itself, so the colour becomes part of the plaster rather than a coating sitting on top. Because the plaster stays workable for only a few hours, the artist plasters and paints one patch (a giornata, a day's work) at a time. Michelangelo's Sistine Chapel ceiling and most Italian Renaissance church decoration are buon fresco. Fresco secco is a related method where paint is applied to already-dry plaster with a separate binder; it is less durable and flakes more easily.

So: every fresco is a mural, but not every mural is a fresco. A fresco is never varnished and is never a detachable object; its whole point is that the image is chemically fused into the wall.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-round-vs-relief',
    title: 'Sculpture in the round vs relief',
    category: 'art',
    keywords: [
      'difference between sculpture in the round and relief', 'in the round vs relief',
      'freestanding sculpture', 'bas-relief', 'high relief', 'sunken relief', 'frieze',
      'projects from background', 'viewable from all sides', 'not casting vs carving',
    ],
    content: `This distinction is about how the finished form relates to space, not about casting versus carving (both types can be carved or cast).

Sculpture in the round (freestanding sculpture) is fully three-dimensional and detached from any background. You can walk around it and view it from every angle. Examples: Michelangelo's David, a bronze statue in a park, a portrait bust.

Relief sculpture is attached to a background slab that it projects from; it is meant to be seen mainly from the front, like a picture with depth. Types by depth of projection:
- Bas-relief (low relief): figures project only slightly, as on a coin or the Parthenon frieze.
- High relief: figures project at least half their depth, some parts nearly detached.
- Sunken (incised) relief: the image is carved into the surface so it sits below the original plane, common in ancient Egyptian art.

Short version: in the round = freestanding, all-around; relief = raised from (or cut into) a flat background, frontal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-etching-vs-engraving',
    title: 'Etching vs engraving (both are intaglio)',
    category: 'art',
    keywords: [
      'difference between etching and engraving', 'etching vs engraving', 'intaglio',
      'printmaking', 'acid bite', 'burin', 'copper plate', 'drypoint', 'both intaglio',
      'not relief printing', 'plate mark',
    ],
    content: `Both etching and engraving are intaglio printmaking processes — the ink that prints sits in lines cut BELOW the surface of a metal plate, and the plate is wiped so ink remains only in those recesses, then forced onto damp paper under heavy press pressure. Neither one is relief printing (relief is woodcut and linocut, where the raised surface prints).

Engraving: the artist cuts the lines directly into the plate by hand, pushing a sharp V-shaped tool called a burin through the metal, removing a thread of copper. It gives crisp, controlled, tapering lines and takes great skill and strength. This is the older technique.

Etching: the plate is coated with an acid-resistant waxy ground; the artist draws through the ground with a needle, exposing bare metal; the plate is then bathed in acid, which bites the drawn lines into the metal. Because drawing through soft ground feels like sketching, etched lines look freer and more spontaneous than engraved ones. Depth (and therefore line darkness) is controlled by how long the acid bites.

Both usually leave a "plate mark", the embossed rectangle where the plate edge pressed into the paper. Related intaglio methods: drypoint (scratched directly, no acid, burr held), aquatint (acid-bitten tone), mezzotint.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-abstract-vs-figurative',
    title: 'Abstract vs figurative art (figurative is not only human figures)',
    category: 'art',
    keywords: [
      'difference between abstract and figurative art', 'abstract vs figurative',
      'representational art', 'non-objective art', 'recognisable subject', 'still life is figurative',
      'landscape is figurative', 'not required to have a human figure', 'semi-abstract',
    ],
    content: `Figurative art (also called representational art) depicts recognisable things from the visible world — objects, animals, places, people. A bowl of fruit, a landscape, a horse, a building are all figurative subjects. It does NOT need to contain a human figure; the term "figurative" here means "representing real forms", not "containing figures of people". A still life and a landscape are both figurative even with no person in them.

Abstract art moves away from accurate depiction. It can:
- Simplify or distort a real subject until it is barely recognisable (semi-abstract, e.g. late Mondrian trees).
- Abandon external subjects entirely and use only shape, colour, line and texture (non-objective art, e.g. Kandinsky, Rothko's colour fields, Pollock's drip paintings).

The two form a spectrum rather than a hard binary: a Cézanne landscape is figurative but somewhat abstracted; a Picasso portrait is figurative in subject but heavily abstract in treatment. Fully non-objective work has no real-world referent at all.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-perspective-vs-foreshortening',
    title: 'Perspective vs foreshortening',
    category: 'art',
    keywords: [
      'difference between perspective and foreshortening', 'perspective vs foreshortening',
      'linear perspective', 'vanishing point', 'foreshortened figure', 'compression',
      'not just distant objects shrinking', 'drawing depth', 'The Dead Christ Mantegna',
    ],
    content: `Linear perspective is the overall geometric system for making a flat surface read as deep space: parallel lines receding from the viewer converge on one or more vanishing points on the horizon, and objects are drawn smaller and higher as they get farther away. One-point, two-point and three-point perspective are versions of this system. It governs the whole scene.

Foreshortening is a specific effect within that system, applied to a single object or body part that is angled sharply toward or away from the viewer. Its length along the line of sight appears compressed, and its near end looks disproportionately large. The classic example is Mantegna's "The Dead Christ", where the body, seen from the soles of the feet, is dramatically shortened — the legs and torso squashed, the feet huge. Drawing a pointing arm coming straight at you, or a figure lying with feet toward you, requires foreshortening.

So foreshortening is not "perspective taken to the extreme" and it is not about far things looking small — it is the apparent compression of one form because it is tilted along the viewer's sightline.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-value-vs-saturation',
    title: 'Value vs saturation (colour properties, not statistics)',
    category: 'art',
    keywords: [
      'difference between value and saturation', 'value vs saturation', 'lightness', 'chroma',
      'colour intensity', 'tone', 'HSV', 'hue saturation value', 'not statistical variance',
      'greyscale', 'colour wheel',
    ],
    content: `These are two of the three properties used to describe any colour (the third is hue). This has nothing to do with statistical variance or standard deviation.

Value (also called lightness or tone) is how light or dark a colour is, independent of its hue. Pure yellow has a high value; navy blue has a low value. If you convert an image to greyscale, what remains is value. Value is what gives a painting its sense of form, light and contrast; artists often plan a "value study" in grey before adding colour.

Saturation (also called chroma or intensity) is how pure or vivid a colour is versus how grey or muted. A fire-engine red is highly saturated; the same red mixed with grey becomes a dull brick colour at low saturation, while keeping roughly the same hue and value. Fully desaturating any colour leaves a neutral grey.

You can change one without the other: adding black lowers value, adding grey lowers saturation, adding a complementary colour lowers saturation and shifts things toward neutral. In the HSV/HSB colour model these are literally the "S" and "V" sliders.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-chiaroscuro-vs-sfumato',
    title: 'Chiaroscuro vs sfumato',
    category: 'art',
    keywords: [
      'difference between chiaroscuro and sfumato', 'chiaroscuro vs sfumato', 'light and shadow',
      'tenebrism', 'smoky transitions', 'Leonardo da Vinci', 'Caravaggio', 'Mona Lisa',
      'soft gradation', 'modelling form',
    ],
    content: `Both are Renaissance techniques for handling light and shade, but they aim at different things.

Chiaroscuro (Italian for "light-dark") is the broad use of strong contrast between light and dark areas to model three-dimensional volume and create drama. It describes the overall distribution of light in a composition. Taken to an extreme — a figure lit by a single harsh source emerging from near-black surroundings — it becomes tenebrism, associated with Caravaggio and his followers.

Sfumato (from "fumo", smoke) is a much subtler, more localised technique: transitions between colours and tones are blended so gradually, with many thin translucent glazes, that there are no visible lines or hard edges at all, "without lines or borders, in the manner of smoke," as Leonardo put it. The soft, hazy modelling around the eyes and mouth of the Mona Lisa, and the melting edges of forms in "The Virgin of the Rocks", are sfumato.

Short version: chiaroscuro is about bold light-versus-dark contrast for volume and drama; sfumato is about erasing edges with imperceptibly smooth gradations. A painting can use both — strong chiaroscuro lighting rendered with sfumato-soft transitions.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-watercolor-vs-gouache',
    title: 'Watercolour vs gouache',
    category: 'art',
    keywords: [
      'difference between watercolor and gouache', 'watercolour vs gouache', 'transparent watercolour',
      'opaque watercolour', 'gum arabic', 'body colour', 'reworkable', 'white paint',
      'matte finish', 'layering',
    ],
    content: `Both are water-based paints that use gum arabic as the binder, and both re-wet and re-work after drying. The difference is opacity.

Watercolour is transparent. It has a low pigment load and no added white, so light passes through each wash and bounces off the white paper — that is what gives watercolour its glow. You build up colour with thin layers (glazes), you work light-to-dark, and the white of the paper stands in for white paint (you leave gaps rather than paint white on top).

Gouache is opaque watercolour ("body colour"). It has a much higher pigment load plus added white pigment or chalk, so it covers what is under it, dries to a flat matte finish, and lets you paint light colours over dark ones. You can work dark-to-light and use actual white paint for highlights. It shows fewer brushmarks and reproduces very evenly, which is why it was the standard for illustration, animation backgrounds and design work before digital.

Both differ from acrylic, which is also water-based but dries permanently waterproof and cannot be re-wet.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-warm-vs-cool-colors',
    title: 'Warm vs cool colours',
    category: 'art',
    keywords: [
      'difference between warm and cool colors', 'warm vs cool colours', 'colour temperature',
      'red orange yellow', 'blue green violet', 'advancing and receding colours', 'colour wheel halves',
      'colour bias', 'atmosphere',
    ],
    content: `Colours are grouped as "warm" or "cool" by association and by how they behave in a composition.

Warm colours are the reds, oranges and yellows — the side of the colour wheel linked to fire, sun and blood. In a painting they tend to advance (appear closer), feel energetic or aggressive, and catch the eye.

Cool colours are the blues, greens and violets — linked to water, ice, sky and shade. They tend to recede (appear farther away) and feel calm, distant or sombre. Artists use this to build depth: warm foreground, cool background (aerial perspective).

Two refinements:
- The dividing line is fuzzy. Red-violet and yellow-green are transition zones, and a single hue has a "temperature bias": a lemon yellow leans cool, a warm cadmium yellow leans orange; an ultramarine blue is warm, a cerulean is cool.
- Temperature is relative. Next to a pure orange, a red can read as the cooler colour. Painters judge warm/cool by comparison within the actual picture, not by a fixed list.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-pointillism-vs-divisionism',
    title: 'Pointillism vs Divisionism',
    category: 'art',
    keywords: [
      'difference between pointillism and divisionism', 'pointillism vs divisionism',
      'Georges Seurat', 'Paul Signac', 'neo-impressionism', 'optical mixing', 'dots of colour',
      'separated brushstrokes', 'colour theory Chevreul', 'La Grande Jatte',
    ],
    content: `The two terms describe the same Neo-Impressionist movement of the 1880s (Seurat, Signac) from two angles.

Divisionism is the underlying theory and principle: colour should be "divided" into its separate components and applied as distinct, unmixed strokes of pure pigment placed side by side, so that the viewer's eye blends them optically at a distance. This produces more luminous, vibrant colour than physically mixing paint on the palette. It was based on 19th-century colour science (Chevreul, Rood) about simultaneous contrast and optical mixing. The strokes are not necessarily dots — they can be short dashes or small blocks.

Pointillism specifically means executing that principle with small, regular dots of colour. It is the technique; Divisionism is the doctrine. A journalist coined "pointillism" mockingly; the artists preferred "Divisionism" or "Chromo-luminarism".

Seurat's "A Sunday Afternoon on the Island of La Grande Jatte" (1884–86) is the founding work of both. Practically: all Pointillism is Divisionist, but a Divisionist painting done in dashes rather than dots would not strictly be Pointillist.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-triptych-vs-diptych',
    title: 'Triptych vs diptych (and polyptych)',
    category: 'art',
    keywords: [
      'difference between a triptych and a diptych', 'triptych vs diptych', 'polyptych',
      'hinged panels', 'altarpiece', 'two panels', 'three panels', 'central panel and wings',
      'devotional painting', 'predella',
    ],
    content: `These count the panels in a multi-panel painting, usually hinged together and most common in medieval and Renaissance devotional art.

A diptych is two panels, typically hinged so it can close like a book. Small portable diptychs were used for private prayer; larger ones served as altarpieces. Example: the Wilton Diptych.

A triptych is three panels: a wider central panel with two narrower hinged "wings" that fold over to protect and cover the centre when closed (the outsides of the wings are often painted too). This is the classic altarpiece format. Examples: Bosch's "The Garden of Earthly Delights", Van der Weyden's altarpieces.

A polyptych is four or more panels (Ghent Altarpiece by Van Eyck, twelve panels). A small horizontal strip of scenes along the bottom of an altarpiece is a predella.

Modern artists (Francis Bacon, many contemporary painters) still use diptych and triptych formats for non-religious work, exploiting the gaps between panels as part of the composition.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-edition-vs-artist-proof',
    title: 'Print edition vs artist proof',
    category: 'art',
    keywords: [
      'difference between a print edition and an artist proof', 'edition vs artist proof',
      'limited edition print', 'A/P', 'artist proof', 'printer proof', 'hors commerce',
      'numbered print', 'edition size', 'cancelled plate', 'bon à tirer',
    ],
    content: `When an artist makes a limited-edition print, the edition is the set of impressions printed to be sold and consecutively numbered as a fraction: 14/75 means the 14th of 75. Once all 75 (plus any sanctioned extras) are printed, the edition is "closed" and the plate, stone or screen (the matrix) is traditionally cancelled — scored, drilled or defaced — and a cancellation proof pulled to prove the edition can never be extended.

An artist's proof (marked A/P, or E.A. for épreuve d'artiste) is an impression outside that numbered edition, traditionally kept by the artist for their own use. Historically A/Ps were the first good impressions the artist approved; by convention they are limited to roughly 10% of the edition size. They are identical in quality to the numbered prints and are often valued slightly higher for their association with the artist.

Related proofs outside the edition: printer's proof (P/P, for the printer), hors commerce (H/C, "not for sale", used for promotion), and the bon à tirer ("good to pull"), the single reference proof the artist signs off as the standard the whole edition must match.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-modern-vs-contemporary',
    title: 'Modern art vs contemporary art',
    category: 'art',
    keywords: [
      'difference between modern art and contemporary art', 'modern vs contemporary art',
      'modernism', 'postmodernism', 'avant-garde', 'roughly 1860s to 1970', 'art since 1970',
      'Impressionism to Abstract Expressionism', 'conceptual art', 'not about architecture',
    ],
    content: `These are period labels for painting, sculpture and related art, not primarily about architecture.

Modern art covers roughly the 1860s/1870s to about 1960–1970. It runs from Manet and the Impressionists through Post-Impressionism, Fauvism, Cubism, Futurism, Expressionism, Dada, Surrealism, abstraction and up to Abstract Expressionism. Its shared thread ("modernism") is a drive to break with academic tradition, experiment with form, materials and the flatness of the picture plane, and pursue originality and the avant-garde. Works are still mostly discrete objects — paintings and sculptures — even when abstract.

Contemporary art means art of roughly the last 50 years, from about 1970 to now (the cutoff shifts forward over time). It is defined less by a common style than by plurality: Pop's aftermath, Minimalism, Conceptual art, performance, video, installation, land art, identity- and politics-driven work, and a self-aware, often ironic relationship to art history ("postmodernism"). The medium is wide open, the art often site-specific or temporary, and the idea frequently matters more than the crafted object.

Rough rule: if it is by a living artist working now, it is contemporary; a Picasso or Pollock is modern.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-gallery-vs-museum',
    title: 'Gallery vs museum',
    category: 'art',
    keywords: [
      'difference between a gallery and a museum', 'gallery vs museum', 'commercial gallery',
      'public art museum', 'permanent collection', 'dealer', 'non-profit', 'admission',
      'selling art', 'curated exhibition', 'not-for-sale',
    ],
    content: `"Gallery" is used two ways, which is where confusion comes from.

A commercial gallery is a business that represents artists and sells their work. It mounts rotating shows, takes a commission (often 50%) on sales, does not usually keep a permanent collection, and admission is free because the point is to sell. Examples: Gagosian, White Cube, a local dealer.

A museum is a permanent, non-profit institution that acquires, conserves, researches and displays a permanent collection for the public and for education. Museum works are not for sale (deaccessioning is rare and controversial), it has curators, conservators, archives and an endowment, and it usually charges or requests admission. Examples: the Louvre, MoMA, the Met.

Confusingly, many public art museums call their display rooms "galleries", and some are literally named "gallery" (the National Gallery in London, the Tate galleries) while functioning as museums. The reliable test: does it exist to sell the art on the walls (commercial gallery) or to keep and show a collection for the public (museum/public gallery)?`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-folk-vs-outsider',
    title: 'Folk art vs outsider art',
    category: 'art',
    keywords: [
      'difference between folk art and outsider art', 'folk art vs outsider art', 'naive art',
      'art brut', 'Jean Dubuffet', 'self-taught artist', 'vernacular tradition', 'visionary art',
      'Henry Darger', 'not Basquiat', 'community tradition',
    ],
    content: `Folk art is made within a shared community tradition. It is functional or decorative work — quilts, decoys, weathervanes, painted furniture, religious carvings, embroidery — produced by people who learned established local techniques and forms passed down through a culture. It reflects and continues that tradition; individual originality is not the point.

Outsider art (from the French art brut, "raw art", coined by Jean Dubuffet) is made by self-taught individuals working in near-total isolation from both the mainstream art world AND from any craft tradition, often driven by a private vision, compulsion or mental-health experience. The classic figures — Henry Darger, Adolf Wölfli, Martín Ramírez — created idiosyncratic personal worlds with no audience in mind and no shared visual language. It is defined by that isolation and inventedness, not by being untrained alone.

Note: Jean-Michel Basquiat is NOT outsider art — he was part of the New York gallery scene, showed with dealers, and collaborated with Warhol. Frida Kahlo is not folk art either, though she drew on Mexican folk imagery. The terms are contested, and "self-taught art" is now often preferred as a neutral umbrella.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-gesso-vs-primer',
    title: 'Gesso vs primer',
    category: 'art',
    keywords: [
      'difference between gesso and primer', 'gesso vs primer', 'ground', 'canvas preparation',
      'traditional gesso', 'acrylic gesso', 'oil primer', 'sizing', 'tooth', 'absorbency',
      'sealing the support',
    ],
    content: `Both are "grounds" — the preparatory coating between the raw support (canvas, wood, paper) and the paint. The differences are about composition and what paint goes on top.

Traditional gesso is a rigid, brittle mix of chalk or gypsum with animal-skin glue, applied in many thin sanded layers over a sized rigid panel. It creates a smooth, absorbent, brilliant white surface ideal for egg tempera and for gilding. It cracks if used on flexible canvas, so it is a panel material.

"Acrylic gesso" (the stuff sold in tubs today) is not true gesso at all — it is an acrylic-polymer primer with titanium white and some filler (calcium carbonate) for tooth. It stays flexible, so it works on canvas, and it both seals the fibres and gives the paint something to grip. It can go under acrylics and, once fully cured, under oils.

A "primer" in the broader sense is any ground that seals and prepares the surface. Traditional oil painting uses a separate size (glue) to seal the canvas, then an oil-based primer (lead white or titanium in oil) over it — you should not put oil paint directly on raw canvas because the oil rots the fibres. Modern practice: acrylic "gesso" primer does the sealing and priming in one step.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-arttech-painting-vs-print',
    title: 'Painting vs print (and original vs reproduction prints)',
    category: 'art',
    keywords: [
      'difference between a painting and a print', 'painting vs print', 'original print',
      'reproduction print', 'giclée', 'edition', 'unique work', 'lithograph woodcut etching',
      'multiple impressions', 'hand-pulled',
    ],
    content: `A painting is a unique, one-off work: pigment applied by hand to a surface, existing as a single physical object.

A print is made by transferring an image from a matrix (a carved block, an etched plate, a lithographic stone, a screen) onto paper, and the matrix can produce many near-identical impressions — an edition. Two very different things get called "prints":

- An original (fine-art) print is conceived by the artist as a print from the start. The artist creates the matrix and the image exists only as the printed multiple — there is no "master" painting. Woodcuts, etchings, lithographs and screenprints by the artist are original prints; each impression is an authentic artwork, usually signed and numbered.

- A reproduction print is a photographic copy of an existing painting, output by a press or a high-quality inkjet ("giclée"). It is a picture of another artwork, not an artwork in the printmaking sense, even when signed and numbered by the artist or their estate.

So "painting vs print" is really unique object vs deliberate multiple, and within prints, an artist-made original vs a photo-mechanical copy of something else.`,
    createdAt: Date.now(),
  },
];
