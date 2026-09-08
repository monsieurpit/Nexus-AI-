import { KnowledgeItem } from '../../types';

// Batch 127 (typography & graphic design) — a total gap in the corpus.
// Wrong-domain answers on nexus-4b: "kerning" -> a bio of the actress Joanna
// Kerns; "point size of type" -> statistics Type I / Type II errors; "letter
// anatomy" -> "Scrabble geometry"; "old-style vs lining figures" -> primate
// tails and the menstrual cycle; "optical alignment" -> fiber-optic signal
// alignment; "grid theory" -> the 1811 street plan of Manhattan; "humanist vs
// geometric vs grotesque" -> architecture; "justified vs ragged-right" -> the
// Gettier problem; "superfamily" -> the immunoglobulin protein superfamily.
// "widow and orphan" -> "a widow is a short stroke connecting two letters."
export const TYPOGRAPHY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-typo-kerning-tracking-leading',
    title: 'Kerning vs Tracking vs Leading',
    category: 'Typography',
    keywords: [
      'what is kerning and how is it different from tracking and leading', 'kerning adjusts the space between a specific pair of letters like av to wa that would otherwise look too loose or too tight done selectively',
      'tracking or letter spacing adjusts the space between all letters in a run of text uniformly to make it tighter and denser or looser and airier', 'leading rhymes with wedding from strips of lead once inserted between lines of metal type is the vertical space between lines of text measured baseline to baseline a common default is about 120 to 145 percent of the font size',
    ],
    content: `These three terms all control spacing in typography, at different scales. KERNING is the adjustment of space between one SPECIFIC PAIR of adjacent letters — combinations like "AV", "To", "Wa", "LT", "P." — where the shapes would otherwise leave an awkward gap or a collision. Good fonts carry hundreds of built-in kerning pairs; designers also kern individual pairs by hand in headlines and logos. TRACKING (also called letter-spacing) is a uniform adjustment of the space between ALL the letters in a selected word, line, or block — you loosen tracking to make small caps or a caption breathe, or to lighten a dense passage, and tighten it to pull a headline together. LEADING (pronounced "ledding," named for the thin strips of lead compositors slid between lines of metal type) is the vertical distance between successive lines of text, measured from one baseline to the next. Too little leading crowds the lines and the eye trips; too much and the reader loses the thread from one line to the next. For body text a typical value is roughly 1.2 to 1.45 times the font size (so 10pt type often gets 12–14pt leading), with more leading needed for longer line lengths and large-x-height faces.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-widow-orphan',
    title: 'Widows and Orphans in Typography',
    category: 'Typography',
    keywords: [
      'what is a widow and an orphan in typography', 'both are typographic errors where a bit of a paragraph is stranded a widow is a very short last line of a paragraph a single word or the end of a hyphenated word left alone at the top of the next column or page',
      'an orphan is the first line of a paragraph left alone at the bottom of a column or page with the rest continuing overleaf', 'mnemonic widows have a past but no future orphans have a future but no past fixed by editing the text adjusting tracking or forcing a break',
      'a widow is not a stroke connecting two letters',
    ],
    content: `A widow and an orphan are both layout faults where a fragment of a paragraph gets stranded by itself, and they look untidy and interrupt reading. A WIDOW is the last line of a paragraph — often just one or two words, or the tail end of a hyphenated word — left alone at the TOP of the next column or page, separated from the rest of its paragraph. An ORPHAN is the first line of a new paragraph left alone at the BOTTOM of a column or page, with the paragraph continuing on the next one. Ways to remember which is which: "a widow is left alone at the top, pushed forward; an orphan is left behind at the bottom," or "widows have a past but no future (they're cut off from the paragraph behind them), orphans have a future but no past." A single word alone on the final line of a paragraph anywhere (not just at a page break) is also loosely called a widow or a "runt." All of these are fixed by editing the copy slightly, adjusting the tracking or leading of the paragraph to pull or push a line, widening or narrowing the column, or forcing a manual line/page break. (A widow is NOT any kind of stroke connecting two letters.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-letter-anatomy',
    title: 'The Anatomy of a Letter',
    category: 'Typography',
    keywords: [
      'what is the anatomy of a letter ascender descender counter bowl', 'baseline the line the letters sit on x-height top of the lowercase body cap height top of the capitals',
      'ascender the part of a lowercase letter that rises above the x-height b d h k l descender the part that drops below the baseline g j p q y', 'counter the enclosed or partly enclosed white space inside a letter the hole in o e a bowl the curved stroke that encloses a counter',
      'other parts stem serif terminal spur ear tail apex crossbar aperture',
    ],
    content: `Type designers use a shared vocabulary for the parts of a letter. The BASELINE is the invisible line the letters sit on. The X-HEIGHT is the height of the main body of the lowercase letters (the top of an "x", "o", "n"). The CAP HEIGHT is the height of the capitals. An ASCENDER is the part of a lowercase letter that reaches above the x-height (in b, d, f, h, k, l), and a DESCENDER is the part that drops below the baseline (in g, j, p, q, y). A COUNTER is the white space enclosed, or partly enclosed, by a letter — the hole in "o", "e", "d", "a"; the partly-open counter of "c", "n", "u". A BOWL is the curved stroke that creates a closed counter (the round part of "b", "p", "D", "R"). Other named parts: the STEM (the main vertical or diagonal stroke), the SERIF (the finishing foot), the TERMINAL (the end of a stroke that has no serif), the SPUR (a small projection, e.g. on some capital "G"s), the EAR (the little flick on lowercase "g" and "r"), the TAIL (the descending stroke of "Q", "j", "y"), the APEX and VERTEX (where two diagonal strokes meet at the top or bottom, as in "A" and "V"), the CROSSBAR or BAR (the horizontal stroke in "A", "H", "e", "t"), and the APERTURE (the size of the opening where a counter is not fully closed, as in "c", "e", "s" — a large aperture aids legibility at small sizes).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-x-height',
    title: 'What the X-Height of a Typeface Is and Why It Matters',
    category: 'Typography',
    keywords: [
      'what is the x-height of a typeface and why does it matter', 'the x-height is the height of the lowercase letters that have no ascender or descender literally the height of the lowercase x measured from the baseline to the mean line',
      'a typeface with a large x-height relative to its cap height looks bigger and more open at a given point size is more legible at small sizes and on screens verdana georgia most ui fonts and fills the line more',
      'a small x-height many traditional book faces garamond looks more elegant and classic but needs a larger point size to read comfortably two fonts at the same point size can look very different in size because of x-height',
    ],
    content: `The x-height of a typeface is the distance from the baseline up to the top of the lowercase letters that have neither an ascender nor a descender — in practice, the height of a lowercase "x", "o", "n", "e". It is one of the most important characteristics of a typeface because it largely determines how BIG the type looks at a given point size and how well it reads at small sizes. A face with a LARGE x-height (a tall lowercase relative to its capitals) — Verdana, Georgia, Tahoma, most fonts designed for user interfaces and screens — looks larger and more open, keeps its counters (the internal white spaces) generous even when shrunk, and stays legible in captions, footnotes, and on low-resolution displays; but a large x-height also makes short ascenders and descenders, which can hurt word-shape recognition and looks less refined. A face with a SMALL x-height — Garamond, Bembo, Caslon and many classic book faces — has long, elegant ascenders and descenders, a graceful "classical" look, and works beautifully at reading sizes on paper, but it looks small and can become hard to read if set too small. This is why two typefaces set at the exact same point size can look noticeably different in size, and why you often have to bump the point size up or down when switching faces.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-point-size',
    title: 'The Point Size of Type and How It Is Measured',
    category: 'Typography',
    keywords: [
      'what is the point size of type and how is it measured', 'the point is the basic unit of type size 1 over 72 of an inch in modern digital postscript points',
      'the point size of a font is not the height of the letters it is the height of the metal body the letter used to be cast on so it includes a little space above the ascenders and below the descenders',
      'that is why a 12 point cap height varies between typefaces and why fonts at the same size look different sizes line length is measured in picas 1 pica equals 12 points one sixth of an inch not statistics type i and type ii errors',
    ],
    content: `The POINT is the fundamental unit of measurement for type size. In modern digital typography (the PostScript / DTP point) there are exactly 72 points to an inch, so 1 point ≈ 0.353 mm; older metal-type and Continental point systems were very slightly different. Crucially, the "point size" of a font is NOT the height of the letters themselves. It descends from metal type, where each character was cast on a rectangular metal block ("body"), and the point size was the height of that BLOCK — which included a small amount of space above the tallest ascenders and below the deepest descenders so lines wouldn't touch. Digital fonts keep an equivalent invisible "em box." This is why the actual cap height and x-height of "12-point type" differ from one typeface to another, and why fonts set at the same nominal point size can look like different sizes on the page (a large-x-height face looks much bigger than a small-x-height face at the same 12pt). Related units: the PICA is 12 points (1/6 inch), and column widths and page measures are traditionally given in picas; the "em" is a relative unit equal to the current point size (a 12pt em is 12pt wide), and the "en" is half an em. (Type point size has nothing to do with Type I and Type II errors in statistics.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-serif-sans',
    title: 'Serif vs Sans-Serif Typefaces',
    category: 'Typography',
    keywords: [
      'what is the difference between a serif and a sans-serif typeface', 'a serif is the small finishing stroke or foot at the end of a letters main strokes serif typefaces times garamond georgia have them sans serif sans means without helvetica arial futura do not',
      'serifs are traditionally associated with print formality tradition and contested improved readability in long print body text by helping the eye track the line', 'sans serifs read as modern clean and are the default for screens especially small ui text and signage',
    ],
    content: `A SERIF is the small finishing stroke — often called a "foot" — added to the end of a letter's main strokes. A typeface that has them is a "serif" typeface (Times New Roman, Garamond, Georgia, Caslon, Baskerville). A typeface without them is "sans-serif" ("sans" being French for "without"): Helvetica, Arial, Futura, Gill Sans, Roboto. Serif faces are the older form (they descend from Roman inscriptional capitals and the pen-drawn shapes of scribes), and they carry associations of tradition, authority, formality, and "print" — they are the default for books, newspapers, and academic work. There is a long-standing (and much-argued) claim that serifs improve readability in long passages of printed text by adding horizontal emphasis that guides the eye along the line and by making each letter's shape more distinct. Sans-serifs emerged in the 19th century and dominated 20th-century modernism; they read as clean, modern, neutral, and efficient. They are the standard for signage, user interfaces, and screen text — especially at small sizes and low resolutions, where the fine serifs of a serif face can smear or disappear. Between the two are "slab serifs" (serifs as thick as the strokes) and "semi-serif" or "humanist" designs that blur the line.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-typeface-vs-font',
    title: 'Typeface vs Font',
    category: 'Typography',
    keywords: [
      'what is a typeface versus a font', 'a typeface is the design the whole family of letterforms with a shared visual style helvetica garamond',
      'a font is a specific instance of that design historically one physical set of metal type at one size and weight now a single digital file garamond bolditalic otf', 'helvetica is a typeface helvetica neue bold 12pt is a font in casual and software usage the words are used interchangeably',
    ],
    content: `A TYPEFACE is the design — the coherent set of letterforms, numerals, and symbols that share a single visual style and personality, and that a designer created as a whole. "Garamond," "Helvetica," and "Futura" are typefaces. A FONT is a specific, usable instance of a typeface. In the days of metal type, a "font" (from French "fonte," something cast) was literally one drawer of type: one typeface, at one size, in one weight and style — 10-point Garamond Roman was one font, 10-point Garamond Bold was another, 12-point Garamond Roman a third. In digital terms a font is one file that produces one style: "Garamond-Regular.otf", "Garamond-BoldItalic.otf". So "Helvetica" is a typeface; "Helvetica Neue Bold at 12 point" is a font. The everyday and software usage has blurred the two — the menu in your word processor is labelled "Font," and people say "what font is that?" when they mean the typeface — but among people who make and specify type, the distinction is: the typeface is the artwork, the font is the delivery mechanism.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-line-length-measure',
    title: 'Line Length (the "Measure") in Typography',
    category: 'Typography',
    keywords: [
      'what is the golden rule of line length in typography measure', 'line length in typography is called the measure the widely cited guideline is about 45 to 75 characters per line for body text 66 is often quoted as ideal or roughly 8 to 12 words',
      'too long and the eye struggles to find the start of the next line and you need more leading to compensate too short and reading is choppy and hyphenation and rag get bad', 'on the web about 66 characters roughly 33em is a common target it has nothing to do with the golden ratio',
    ],
    content: `The length of a line of text is called the "measure." The standard guideline for comfortable reading of body text is roughly 45 to 75 characters per line, counting letters, punctuation, and spaces — about 66 characters is the value most often cited as the sweet spot, which works out to roughly 8 to 12 words. The reasoning: if lines are too LONG, the eye has a hard time sweeping back and locating the start of the next line (you can partly compensate by adding leading), and reading becomes tiring; if lines are too SHORT, the reader's eye is jumping back too frequently, the rhythm is choppy, and the software is forced into too many hyphens and an ugly ragged edge. For multi-column layouts the measure is naturally shorter (35–50 characters is fine). On the web a common target is about 66 characters, which is roughly 33em (a max-width of ~33em or ~60ch on the text container). This has nothing to do with the golden ratio or with x-height; it is an empirical guideline about eye movement, and the right value also depends on the typeface, size, and leading, so designers set it and then adjust by eye.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-monospaced',
    title: 'What a Monospaced Font Is and Why Programmers Use It',
    category: 'Typography',
    keywords: [
      'what is a monospaced font and why do programmers use it', 'a monospaced fixed width non proportional font gives every character an i an m a space exactly the same horizontal width unlike a proportional font where i is narrow and m is wide',
      'programmers use them because code aligns in columns indentation tables ascii art diffs line up it is easy to count characters and spot a missing bracket similar characters are drawn distinguishable slashed zero vs o distinct 1 l i cursor position maps to column number',
      'courier consolas menlo monaco source code pro jetbrains mono fira code',
    ],
    content: `A monospaced font — also called fixed-width, fixed-pitch, or non-proportional — draws every character in the same horizontal width: a lowercase "i", a capital "M", a period, and a space all occupy one identical cell. This is the opposite of a proportional font, where narrow letters like "i" and "l" take much less width than wide ones like "m" and "w". Programmers and terminal users prefer monospaced fonts for several reasons: code lines up in neat columns, so indentation, aligned assignments, tables, box-drawing, ASCII diagrams, and side-by-side "diffs" stay visually straight; you can count characters by eye, which helps you see an off-by-one indentation or a missing bracket; well-made coding fonts deliberately disambiguate look-alike characters (a slashed or dotted zero versus a capital O, distinct forms for 1, lowercase l and capital I, and for the various brackets and quotes); and the cursor's screen position maps directly to a column number. The trade-off is that monospaced text is less compact and looks a bit mechanical, so it is rarely used for prose (except to evoke a typewriter, a terminal, or a screenplay, or to mark a passage as "code"). Common examples: Courier, Consolas, Menlo, Monaco, SF Mono, Source Code Pro, JetBrains Mono, and Fira Code (which also adds programming ligatures).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-figures',
    title: 'Old-Style Figures vs Lining Figures',
    category: 'Typography',
    keywords: [
      'what is the difference between old-style figures and lining figures', 'two ways a typeface can draw its numerals lining figures also titling or modern figures are all the same height as the capitals and sit on the baseline like a row of capitals good for tables and all caps the default in most fonts',
      'old style figures also text figures or lowercase figures vary in height and have ascenders and descenders like lowercase letters 0 1 2 sit at x-height 6 and 8 have ascenders 3 4 5 7 9 have descenders they blend into running text book typography prefers them',
      'also tabular fixed width for columns vs proportional natural width for text figures not primate tails or the menstrual cycle',
    ],
    content: `A well-equipped typeface can draw its numerals two ways. LINING figures (also "titling" or "modern" figures) are all one height — the same as the capital letters — and all sit on the baseline, so a string of them looks like a little row of capitals: 1234567890 all uniform. They are the default in most fonts and are the right choice for tables, spreadsheets, forms, math, and anything set in all caps. OLD-STYLE figures (also "text figures," "lowercase figures," or "non-lining figures") vary in height and have ascenders and descenders just like lowercase letters: the 0, 1, and 2 sit at x-height; the 6 and 8 rise like ascenders; and the 3, 4, 5, 7, and 9 drop below the baseline. Because they have the same up-and-down rhythm as lowercase text, they blend smoothly into a sentence — a date or a page number set in old-style figures doesn't jump out and shout the way lining figures do — which is why book, magazine, and fine editorial typography prefer them for numbers in running text. A separate axis is TABULAR figures (every digit exactly the same fixed width, so columns of numbers line up vertically) versus PROPORTIONAL figures (each digit its natural width, so "1" is narrower, better for text). Good fonts include all four combinations as selectable OpenType features. (This is about numeral design; it has nothing to do with monkey tails or the menstrual cycle.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-rag-river',
    title: 'Rag, River, and Widowed Line in a Paragraph',
    category: 'Typography',
    keywords: [
      'what is rag and river and widowed line in a paragraph of text', 'these are about how text flows in a paragraph the rag is the uneven vertical edge of unjustified ragged text a good rag is gently uneven with no distracting shapes a bad rag alternates very long and very short lines or forms a wedge or a hole',
      'a river is an accidental vertical or diagonal streak of white space running down through several lines of a paragraph caused by word spaces on consecutive lines lining up most common and ugly in justified text',
      'a widowed line is the short stub last line of a paragraph stranded at the top of the next column not a menstruation term or a riddle',
    ],
    content: `These three terms all describe things that can go wrong in the shape and texture of a paragraph. The RAG is the uneven right-hand edge produced by "ragged" (unjustified) text — since the lines aren't stretched to a common width, they end at different points. A "good rag" is gently and randomly uneven, with no line jutting far past the others and no distracting pattern. A "bad rag" alternates very long and very short lines, tapers into a wedge shape, or leaves a big notch or "hole"; editors and typesetters tweak line breaks (and sometimes wording) to smooth it. A RIVER is an accidental streak of white space that snakes down or diagonally through several consecutive lines of a paragraph, formed when the word-spaces on line after line happen to fall roughly above one another. Rivers are most common and most objectionable in JUSTIFIED text on a narrow measure, where the software has to open the word spaces wide; you fix them by re-breaking lines, adjusting tracking, editing a word, or widening the column. A WIDOWED LINE (a "widow") is the very short last line of a paragraph — often one word — left stranded alone at the top of the next column or page. (None of these has anything to do with menstruation or with the "can a man marry his widow's sister" riddle.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-slab-serif',
    title: 'What a Slab Serif Is and When It Is Used',
    category: 'Typography',
    keywords: [
      'what is a slab serif and when is it used', 'a typeface whose serifs are thick and blocky about as heavy as the main strokes with little or no bracketing also called egyptian or mechanistic',
      'examples rockwell courier roboto slab museo slab archer clarendon a bracketed slab not times new roman which has thin bracketed serifs and is an old style face', 'originated in early 1800s england for advertising posters and headlines where bold impact was needed today reads as sturdy confident editorial used by newspapers and tech brands courier the typewriter and screenplay standard',
    ],
    content: `A slab serif is a typeface in which the serifs are thick, roughly rectangular, and about as heavy as the main strokes of the letters — instead of the thin, tapered, "bracketed" serifs of a traditional serif face. They are also called "Egyptian" typefaces (a fashionable name at the time, no real connection to Egypt) or "mechanistic." Examples: Rockwell, Courier, Roboto Slab, Museo Slab, Archer, Chunk, and the "Clarendon" style (a slab with a slight curved bracket connecting serif to stem). Times New Roman is NOT a slab serif — its serifs are thin and bracketed, and it belongs to the "old style"/transitional group. Slab serifs first appeared in England around 1817, driven by the advertising boom: shop cards, playbills, and posters needed type that was heavy, attention-grabbing, and readable from a distance, and slab serifs delivered a solid, blocky presence. Today they read as sturdy, confident, dependable, and slightly editorial or industrial — which is why they turn up in newspaper mastheads and headline text, in branding for companies wanting to feel robust and "built to last" (construction, outdoor gear, some tech and finance brands), and, in the case of Courier, as the fixed standard for typewriters and screenplay formatting.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-sans-classification',
    title: 'Humanist vs Geometric vs Grotesque Sans-Serifs',
    category: 'Typography',
    keywords: [
      'what is a humanist versus geometric versus grotesque sans-serif', 'three broad categories of sans serif type grotesque and neo grotesque the 19th and mid 20th century industrial ones fairly uniform stroke width closed apertures a plain mechanical feel akzidenz grotesk franklin gothic helvetica univers arial',
      'geometric sans serifs built from apparent circles triangles and straight lines a nearly round o single story a pointed apexes modern clean and cold futura avant garde century gothic avenir circular',
      'humanist sans serifs proportions and slight stroke contrast from classical roman letters and calligraphy open apertures two story a and g varying letter widths feel warm most readable for long text and ui gill sans frutiger myriad segoe open sans source sans not architecture',
    ],
    content: `Sans-serif typefaces fall into three main design families. GROTESQUE (and its refined mid-century descendant NEO-GROTESQUE) are the industrial sans-serifs of the 19th and 20th centuries: strokes of nearly uniform thickness, fairly closed and tight apertures, a plain, businesslike, somewhat mechanical feel, and small tell-tale quirks like a spurred capital "G" or a curled leg on the "R". Grotesques include Akzidenz-Grotesk, Franklin Gothic, and News Gothic; the neo-grotesques — cleaner, more neutral, more systematic — include Helvetica, Univers, and Arial. GEOMETRIC sans-serifs are constructed from what look like pure circles, triangles, and straight lines: a nearly perfect circular "O", a single-storey "a", sharp pointed apexes on "A" and "M", and often uniform letter widths. They feel modern, precise, rational, and a bit cold — Futura, Avant Garde, Century Gothic, Avenir, Circular, Montserrat. HUMANIST sans-serifs base their proportions and a subtle thick/thin stroke variation on classical Roman inscriptions and pen-written calligraphy: more open apertures, letters of clearly varying width, a two-storey "a" and "g", and often a slight calligraphic modulation. They read as warm, approachable, and human, and are generally considered the most comfortable sans-serifs for long text and for user interfaces — Gill Sans, Frutiger, Myriad, Segoe UI, Open Sans, Source Sans, Calibri. (These are type classifications, not architectural styles.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-justified-ragged',
    title: 'Justified vs Ragged-Right Text',
    category: 'Typography',
    keywords: [
      'what is the difference between justified and ragged-right text', 'this is about how the ends of lines line up justified or flush left flush right has both the left and right edges forming straight vertical lines the software stretches or squeezes the word spaces on each line to fill the full measure',
      'it looks formal and orderly books newspapers but can create uneven loose lines and rivers if the measure is short or hyphenation is poor', 'ragged right also flush left ragged right keeps the left edge straight and lets the right edge fall naturally uneven word spacing stays consistent and even easier to read the norm for the web and narrow columns watch the rag',
      'not the gettier problem or a bad screen',
    ],
    content: `Justified and ragged-right describe how the ends of lines are treated in a block of text. In JUSTIFIED text (also "flush left, flush right," or in newspapers just "justified"), BOTH the left and right edges form straight vertical lines. To make every line fill the full column width, the software adds or removes space between the words (and, if allowed, between letters, and it hyphenates more aggressively). Justified text looks formal, dense, and "typeset," and it is the tradition for books, newspapers, and journals — but on a short measure or with weak hyphenation it produces "loose" lines with gaping word spaces and vertical "rivers" of white running through the paragraph. In RAGGED-RIGHT text (also "flush left, ragged right"), only the LEFT edge is straight; the lines end wherever the last full word fits, so the right edge is naturally uneven ("ragged"). The word spacing stays even and comfortable, which makes ragged-right generally easier and more pleasant to read; it is the default for the web, for correspondence, and for any narrow column. The trade-off is that you have to manage the "rag" so it doesn't get lumpy or form distracting shapes. ("Ragged left / flush right" and "centered" alignment also exist but are used only for short passages, captions, or effect.) This has nothing to do with the philosophical "justified true belief" or with a miscalibrated screen.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-superfamily-helvetica-arial',
    title: 'Type Superfamilies, and Helvetica vs Arial',
    category: 'Typography',
    keywords: [
      'what is a superfamily or type superfamily and the difference between helvetica and arial', 'a type superfamily is a very large type family that includes multiple sub families designed to work together most often a serif version and a matching sans serif version sharing the same proportions x height weights and character widths so they can be mixed freely',
      'examples lucida rotis thesis ibm plex source freight', 'arial was designed as a metrically compatible near clone of helvetica same letter widths so text takes the same space letting microsoft ship a helvetica substitute without paying licensing differences are subtle helvetica has perfectly horizontal or vertical stroke terminals arials are cut at an angle the a t 1 R and G are the quickest tells',
    ],
    content: `A TYPE SUPERFAMILY is a very large, coordinated type family that contains several distinct sub-families meant to be used together — most often a serif and a matching sans-serif, and sometimes also a slab serif, a "mix" (semi-serif), a monospace, and multiple widths — all built on the same skeleton: the same proportions, x-height, cap height, weights, and (often) the same character widths, so a designer can switch between the serif and the sans on a page or across a publication and everything still aligns and reflows the same way. Examples: Lucida (Serif / Sans / Console / Bright / Fax), Rotis, Thesis (TheSans / TheSerif / TheMix), IBM Plex (Serif / Sans / Mono), Adobe Source (Sans / Serif / Code), Freight, and Fira. HELVETICA VS ARIAL: Arial was drawn (by Monotype, 1982) as a "metrically compatible" near-copy of Helvetica — its letters have almost exactly the same widths, so any text set in Helvetica occupies the same space set in Arial. That let Microsoft bundle Arial with Windows as a free stand-in for Helvetica without paying Linotype's licence. The visual differences are small: Helvetica cuts its stroke ends perfectly horizontal or vertical (the tail of the "a", the top of the "t", the tail of the "e"), giving it a crisp, tight, rigid look, and its capital "R" has a straight diagonal leg while its "G" has a spur; Arial angles those terminals and its "R" leg curves and its "G" has no spur, so it reads as slightly softer and less precise. Typographers generally regard Helvetica as the better-crafted original and Arial as a knockoff, though Arial is now everywhere; the "a", "t", "1", "R", and "G" are the fastest ways to tell them apart.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-grid-baseline',
    title: 'Grids in Graphic Design and the Baseline Grid',
    category: 'Typography',
    keywords: [
      'what is grid theory in graphic design and the baseline grid', 'a grid is an invisible framework of intersecting horizontal and vertical guides a designer uses to place and align elements consistently across a page or a whole publication or site it creates order rhythm and a sense that everything belongs together and speeds up layout decisions',
      'components margins columns and the gutters between them rows modules and flowlines types manuscript single column multi column modular and the baseline grid',
      'the baseline grid is a set of evenly spaced horizontal lines spaced to the body texts leading that all text baselines snap to so lines of type in adjacent columns align across the page muller brockmann grid systems',
    ],
    content: `A grid in graphic design is an underlying, invisible framework of horizontal and vertical guides that a designer uses to position and align every element — text blocks, images, headlines, captions, white space — consistently across a page, and across every page of a book, magazine, or website. A grid gives a layout order, alignment, and rhythm; makes a multi-page publication feel like one coherent system; and speeds up decisions, because the grid answers "where does this go?" Its parts: the MARGINS (the space around the outside), the COLUMNS the content flows into and the GUTTERS (gaps) between them, optional ROWS or MODULES (a grid of cells), and FLOWLINES (horizontal lines where blocks start or stop). Common grid types are the manuscript (single-column, for books), the multi-column (magazines, newspapers, web), the modular (a matrix of cells, for catalogues, tables, and dashboards), and the hierarchical (loosely fitted to the content). The BASELINE GRID is a specific device: a set of evenly spaced horizontal lines, spaced to match the leading of the body text, running down the whole page; you set text to "snap to" this grid so that the baselines of type in one column line up exactly with the baselines in the next column and on the facing page — a hallmark of careful book and editorial typography. The classic reference is Josef Müller-Brockmann's "Grid Systems in Graphic Design." (This has nothing to do with the street grid of Manhattan.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-typo-readable-vs-legible',
    title: 'Readability vs Legibility',
    category: 'Typography',
    keywords: [
      'what makes a typeface readable versus legible', 'legibility is a property of the typeface design how easily one distinguishes individual letters and characters from each other is the capital i different from lowercase l and the numeral 1 are the counters open will rn be misread as m',
      'readability is a property of how the type is set and arranged point size line length measure leading spacing contrast with the background alignment column structure how comfortable it is to read a long passage',
      'a highly legible typeface can be made unreadable by bad setting too small lines too long too little leading and a well set page can still be a struggle if the typeface itself is poorly designed',
    ],
    content: `Typographers draw a distinction between legibility and readability, though the words overlap in everyday use. LEGIBILITY is a property of the TYPEFACE ITSELF — how easily a reader can tell one character apart from another and recognise it correctly. A legible face has open counters and apertures, clearly differentiated letterforms (a capital "I" that isn't identical to a lowercase "l" or the numeral "1"; an "a" that won't be confused with an "o"; letter pairs like "rn" that won't merge into "m"; distinct "b/d" and "p/q"), and shapes that survive at small size and low resolution. It is judged letter by letter, at a glance. READABILITY is a property of how the type is SET — the point size, the line length (measure), the leading, the letter- and word-spacing, the contrast between text and background, the alignment, and the way columns and pages are organised — and it describes how comfortable and efficient it is to read a long, continuous passage. The two are independent: a highly legible typeface can be made unreadable by setting it too small, with lines too long and too little leading; and a beautifully laid-out page is still hard going if the typeface it uses is badly drawn. Good typography needs both — a legible face, set for readability.`,
    createdAt: Date.now(),
  },
];
