import { KnowledgeItem } from '../../types';

// Batch 16 (art techniques & movements) gap-fills. Live misses on nexus-4b —
// retrieval kept bleeding into a Renaissance-vs-Baroque domain entry:
// "perspective in art" -> never defined linear perspective; "abstract art" ->
// "basically cubism"; "pop art" -> "melting clocks... Andy Warhol" (that's
// Dali); "realism in art" -> "unprecedented realism during the Renaissance"
// (it's a 19th-c movement); "what is a sketch" -> Twitch streamer web dump;
// "self portrait" -> only Frida Kahlo, no definition; "complementary colors" ->
// "red and green, specifically" only.
export const ART_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-perspective-in-art',
    title: 'Perspective in Art (Linear Perspective)',
    category: 'Art',
    keywords: [
      'what is perspective in art', 'what is linear perspective', 'one point perspective', 'two point perspective',
      'vanishing point', 'how does perspective work in drawing', 'atmospheric perspective', 'perspective drawing',
    ],
    content: `Perspective is the set of techniques for making a flat drawing or painting look three-dimensional, as if you're looking into real space. In LINEAR perspective, parallel lines that recede from the viewer appear to converge on one or more "vanishing points" on the horizon line, and objects get smaller as they get farther away. One-point perspective has a single vanishing point (like looking straight down a road or hallway); two-point perspective has two (like looking at the corner of a building). It was worked out mathematically in early-1400s Florence — Filippo Brunelleschi demonstrated it and Leon Battista Alberti wrote the rules down — and it transformed Renaissance painting. ATMOSPHERIC (or aerial) perspective is a separate trick: distant things are painted paler, bluer and less detailed because of the haze of the air, which Leonardo da Vinci used masterfully.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-impressionism-vs-expressionism',
    title: 'Impressionism vs Expressionism',
    category: 'Art',
    keywords: [
      'what is the difference between impressionism and expressionism', 'impressionism vs expressionism',
      'what is impressionism', 'what is expressionism', 'impressionist painting', 'expressionist painting',
    ],
    content: `Impressionism: a French movement of the 1870s–1880s (Monet, Renoir, Degas, Pissarro, Morisot). The aim was to capture a fleeting visual impression of a real scene — especially changing light and atmosphere — painted quickly, often outdoors, with small visible brushstrokes and bright unmixed colour. It's about how a moment LOOKS. Expressionism: mainly a German movement of the 1905–1920s (Die Brücke, Der Blaue Reiter, Ernst Ludwig Kirchner, Franz Marc; Edvard Munch's "The Scream" is a forerunner). It distorts colour, shape and line on purpose to convey raw emotion and inner experience — anxiety, alienation, intensity. It's about how something FEELS. Between them sits Post-Impressionism (Van Gogh, Cézanne, Gauguin, Seurat) — Van Gogh's "The Starry Night" is Post-Impressionist, not Expressionist, and Picasso's "Guernica" is Cubist, not Expressionist.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-abstract-art',
    title: 'What Abstract Art Is',
    category: 'Art',
    keywords: [
      'what is abstract art', 'what does abstract art mean', 'abstract painting', 'non representational art',
      'what is non figurative art', 'who invented abstract art', 'is abstract art just cubism',
    ],
    content: `Abstract art is art that does not try to depict recognisable objects, people or scenes. Instead it uses shape, colour, line, texture and form for their own sake. "Pure" or non-objective abstraction (Wassily Kandinsky around 1910–1913, Kazimir Malevich, Piet Mondrian) shows nothing from the visible world at all. Other abstract art starts from something real and simplifies or distorts it until it's barely identifiable. It is NOT the same thing as Cubism — Cubism (Picasso, Braque) fragments a real subject into geometric planes but you can usually still tell it's a guitar or a face; Cubism was one of the steps toward abstraction, not abstraction itself. Later abstract movements include Abstract Expressionism (Jackson Pollock's drip paintings, Mark Rothko's colour fields) in 1940s–50s New York.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pop-art',
    title: 'What Pop Art Is',
    category: 'Art',
    keywords: [
      'what is pop art', 'what does pop art mean', 'pop art movement', 'andy warhol pop art', 'roy lichtenstein',
      'pop art characteristics', 'when did pop art start',
    ],
    content: `Pop art is a movement that began in Britain and the United States in the mid-to-late 1950s and peaked in the 1960s. It took its imagery straight from mass popular culture — advertising, product packaging, comic books, celebrity photos, movie stars, supermarket goods — and presented it as fine art, often with bright flat colour, hard edges and commercial printing techniques. Key figures: Andy Warhol (Campbell's Soup cans, Marilyn Monroe silkscreens, Brillo boxes), Roy Lichtenstein (huge paintings imitating comic-strip panels with Ben-Day dots), Richard Hamilton, Claes Oldenburg (giant soft sculptures of everyday objects), and James Rosenquist. It was partly a reaction against the seriousness of Abstract Expressionism. (Melting clocks are Salvador Dalí — that's Surrealism, not Pop art.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-realism-in-art',
    title: 'Realism in Art (the Movement)',
    category: 'Art',
    keywords: [
      'what is realism in art', 'what is the realism movement', 'realism art movement', 'gustave courbet realism',
      'what is realist painting', 'realism vs romanticism art',
    ],
    content: `Realism was an art movement that began in France around 1848–1850, led by Gustave Courbet (and including Jean-François Millet and Honoré Daumier). Realist artists painted ordinary contemporary life — peasants working, labourers, ordinary townspeople, unglamorous everyday scenes — at large scale and without idealising or dramatising it. It was a deliberate rejection of Romanticism's exotic drama and of academic history painting's noble Greek and biblical subjects; Courbet said he could not paint an angel because he had never seen one. It's tied to the social and political changes of the mid-1800s and to the rise of photography. Note this is different from "realistic" as a general description of any lifelike art — the Renaissance achieved great lifelike accuracy, but "Realism" with a capital R is this specific 19th-century movement about subject matter as much as technique.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-sketch',
    title: 'What a Sketch Is',
    category: 'Art',
    keywords: [
      'what is a sketch', 'what does sketch mean', 'sketch drawing', 'what is a study in art', 'what is a rough drawing',
      'difference between a sketch and a drawing', 'thumbnail sketch',
    ],
    content: `A sketch is a quick, loosely drawn image, usually done fast and freehand, that is not meant to be a finished artwork. Artists use sketches to work out ideas, capture something they're observing before it moves or changes, plan the composition of a larger piece, or just practise. A "study" is a more careful sketch focused on getting one element right (a hand, drapery, the fall of light). A "thumbnail" is a very small rough sketch used to test layout options. Sketches are typically in pencil, charcoal, pen or ink, but the word also applies to quick digital drawings and to rough versions in other fields (a musical sketch, a sketch of a plan). The key idea is speed and exploration rather than polish.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-self-portrait',
    title: 'What a Self-Portrait Is',
    category: 'Art',
    keywords: [
      'what is a self portrait', 'what does self portrait mean', 'self portrait meaning', 'famous self portraits',
      'why do artists paint self portraits', 'rembrandt self portraits', 'van gogh self portrait',
    ],
    content: `A self-portrait is a portrait an artist makes of themselves, usually working from a mirror (or, historically, later from photographs). Artists make them because they are a free, always-available model, to practise and experiment, to record how they age, to make a statement about their identity or status, or to explore their own emotional state. Famous examples: Rembrandt painted and etched roughly 80–90 self-portraits across his whole life, forming a visual autobiography; Vincent van Gogh made over 30 in just a few years, including several after cutting his ear; Albrecht Dürer, Frida Kahlo (about a third of her ~150 paintings are self-portraits, because of long periods bedridden), and many others. A "selfie" is the modern photographic version of the same impulse.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-complementary-colors',
    title: 'Complementary Colours',
    category: 'Art',
    keywords: [
      'what are complementary colors', 'what are complementary colours', 'complementary color pairs',
      'what color is opposite on the color wheel', 'red and green complementary', 'blue and orange complementary',
      'what is a complementary color scheme',
    ],
    content: `Complementary colours are pairs of colours that sit directly opposite each other on the colour wheel. On the traditional artist's (red-yellow-blue) wheel the main pairs are: red and green, blue and orange, and yellow and purple (violet). Placed side by side, complementary colours make each other look more intense and "vibrate" — which is why artists use them for contrast and impact (think orange sky against blue water). Mixed together as paint, a pair of complements produces a muddy brown or grey, so artists also use a touch of the complement to tone a colour down or make a neutral shadow. In light rather than pigment (the RGB system), the complementary pairs are red/cyan, green/magenta and blue/yellow.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-renaissance-art',
    title: 'Renaissance Art',
    category: 'Art',
    keywords: [
      'what is the renaissance in art', 'what is renaissance art', 'renaissance art characteristics',
      'when was the renaissance', 'renaissance artists', 'what does renaissance mean in art', 'high renaissance',
    ],
    content: `The Renaissance ("rebirth") in art runs roughly from the early 1400s to about 1600, starting in Florence and spreading across Italy and then northern Europe. Its hallmarks: the rediscovery and imitation of ancient Greek and Roman art; the invention of mathematical linear perspective for convincing depth; careful study of human anatomy for realistic bodies; balanced, harmonious, often symmetrical compositions; soft modelling of light and shade (and, in oil paint, sfumato); and humanism — a new focus on the individual, on nature, and on classical as well as religious subjects. The "High Renaissance" (roughly 1490s–1520s) is its peak, dominated by Leonardo da Vinci (Mona Lisa, The Last Supper), Michelangelo (the Sistine Chapel ceiling, David) and Raphael (The School of Athens). In the north, Jan van Eyck and Albrecht Dürer are central figures.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mona-lisa-famous',
    title: 'Why the Mona Lisa Is Famous',
    category: 'Art',
    keywords: [
      'what makes the mona lisa famous', 'why is the mona lisa so famous', 'why is the mona lisa important',
      'who painted the mona lisa', 'mona lisa theft', 'why is the mona lisa a big deal',
    ],
    content: `The Mona Lisa was painted by Leonardo da Vinci, begun around 1503, probably of Lisa Gherardini, wife of a Florentine merchant. As a painting it is a landmark: Leonardo's sfumato (smoke-like blending with no hard outlines) gives the face and the famously ambiguous smile a lifelike softness, and the subject turns naturally toward the viewer against an atmospheric imaginary landscape. But its worldwide fame is also historical accident: it was already prized (French kings kept it, Napoleon hung it in his bedroom), then in 1911 it was STOLEN from the Louvre by an Italian handyman, Vincenzo Peruggia. The two-year manhunt put it on front pages around the world, and by the time it was recovered in 1913 it was the most famous painting on Earth — a status cemented by 20th-century reproduction, parody (Duchamp, Warhol) and mass tourism.`,
    createdAt: Date.now(),
  },
];
