import { KnowledgeItem } from '../../types';

// Batch 84 (classical music & theory — batch 23 covered general music theory).
// nexus-4b misses: "what is a leitmotif" answered about the debut album by the
// rock band Dredg; "what is sonata form" described the movement structure of a
// whole sonata instead of the single-movement form; "Baroque, Classical and
// Romantic music" skipped the Classical era entirely; "symphony orchestra vs
// chamber ensemble" said a chamber ensemble has "no strings, or maybe just
// bass guitar"; "what is a string quartet" never said what the ensemble is.
export const CLASSICAL_MUSIC_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-leitmotif',
    title: 'What a Leitmotif Is',
    category: 'Music',
    keywords: [
      'what is a leitmotif', 'recurring musical theme for a character', 'wagner leitmotif ring cycle', 'idee fixe motto theme',
      'leitmotif in film scores star wars', 'imperial march darth vader leitmotif', 'how are leitmotifs transformed',
    ],
    content: `A leitmotif is a short, distinctive musical idea — a melody, rhythm, harmony, or instrumental colour — that is deliberately associated with a particular character, place, object, emotion, or concept in a dramatic work. Whenever that element appears or is even referred to, its leitmotif sounds, usually transformed to fit the moment: shifted to a minor key when the character is in trouble, fragmented when they are weakened, combined with another motif when two ideas collide. This has nothing to do with any rock album of that name. The technique is most closely tied to Richard Wagner's operas, above all the four-opera "Ring" cycle, where dozens of interwoven motifs carry the drama. It is now a core film-scoring tool: John Williams's themes for individual Star Wars characters — the ominous "Imperial March" for Darth Vader, the soaring "Force theme" — are textbook leitmotifs, as are Howard Shore's motifs for the peoples and places of The Lord of the Rings.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sonata-form',
    title: 'What Sonata Form Is',
    category: 'Music',
    keywords: [
      'what is sonata form', 'sonata allegro form exposition development recapitulation', 'first movement form symphony', 'two theme groups home key',
      'sonata form vs the sonata as a piece', 'development section modulation tension', 'classical era form haydn mozart beethoven',
    ],
    content: `Sonata form (or sonata-allegro form) is the structure of a single movement — most often the fast first movement of a symphony, sonata, concerto, or string quartet. It is not the same as "the sonata," which is the whole multi-movement piece. Sonata form has three main parts. EXPOSITION: two contrasting groups of themes are presented, the first in the home key and the second in a related key (usually the dominant, or the relative major for a minor-key piece); it is often marked to be repeated. DEVELOPMENT: the themes are broken into fragments, recombined, and pushed through a series of distant keys, creating instability and tension. RECAPITULATION: both theme groups return in their original order, but now both stay in the home key, resolving the tension. A slow introduction may precede it and a coda may round it off. Sonata form was the central organising principle of the Classical era, developed by Haydn and Mozart and expanded dramatically by Beethoven.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-concerto',
    title: 'What a Concerto Is',
    category: 'Music',
    keywords: [
      'what is a concerto', 'solo instrument versus orchestra', 'concerto grosso concertino ripieno', 'three movements fast slow fast concerto',
      'cadenza in a concerto', 'piano concerto violin concerto', 'brandenburg concertos vivaldi four seasons',
    ],
    content: `A concerto is a piece that sets a soloist (or small group of soloists) in dialogue and contrast with a full orchestra, showcasing the soloist's virtuosity and lyrical playing against the mass of sound. Two historical types: the Baroque CONCERTO GROSSO pitted a small group of soloists (the "concertino") against the full ensemble (the "ripieno" or "tutti") — Bach's Brandenburg Concertos, Corelli, Handel, and Vivaldi's Four Seasons (technically solo violin concertos). From the Classical era onward the SOLO CONCERTO for a single soloist became the norm — piano, violin, and cello concertos by Mozart, Beethoven, Brahms, Tchaikovsky, Rachmaninoff. The standard concerto has three movements in a fast–slow–fast pattern, with a cadenza — an unaccompanied virtuoso passage, historically improvised — near the end of the first movement.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-baroque-classical-romantic',
    title: 'Baroque versus Classical versus Romantic Music',
    category: 'Music',
    keywords: [
      'what is the difference between baroque classical and romantic music', 'music history periods dates', 'baroque bach handel vivaldi basso continuo',
      'classical era haydn mozart sonata form', 'romantic era chopin brahms wagner emotion', 'how did the orchestra change over time',
    ],
    content: `These are the three central periods of Western art music. BAROQUE (roughly 1600–1750): dense counterpoint over a "basso continuo" bass line, elaborate ornamentation, terraced (sudden, stepped) dynamics, the harpsichord, and forms like the fugue, concerto grosso, and suite — Bach, Handel, Vivaldi, Monteverdi, Purcell. CLASSICAL (roughly 1750–1820): clarity, balance and symmetry, singable melody over lighter accompaniment, gradual dynamics, the piano replacing the harpsichord, and the rise of sonata form, the symphony, the solo concerto and the string quartet — Haydn, Mozart, and the early works of Beethoven. ROMANTIC (roughly 1820–1900): far larger orchestras, intense personal and emotional expression, rich chromatic harmony, extremes of loud and soft, nationalism and folk material, the virtuoso soloist as hero, and program music and the tone poem — late Beethoven, Schubert, Chopin, Schumann, Brahms, Liszt, Wagner, Tchaikovsky, Verdi. (Before Baroque came the Medieval and Renaissance periods; after Romantic came 20th-century Modernism.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-string-quartet',
    title: 'What a String Quartet Is',
    category: 'Music',
    keywords: [
      'what is a string quartet', 'two violins viola cello ensemble', 'haydn father of the string quartet', 'string quartet chamber music genre',
      'four movement string quartet form', 'why is the string quartet prized', 'beethoven late quartets',
    ],
    content: `"String quartet" means two things. First, the ENSEMBLE: four string players — first violin, second violin, viola, and cello. This exact combination has been standard chamber-music grouping since Joseph Haydn effectively invented it in the 1760s (he wrote about 68 quartets and is called "the father of the string quartet"). Second, the GENRE: a multi-movement work — usually four movements, like a small symphony (fast sonata-form opening, slow movement, minuet or scherzo, fast finale) — written for that combination. The string quartet is regarded as one of the most demanding and refined forms of composition because the four closely matched instruments blend into a complete, homogeneous texture in which every part is equally important and exposed — Goethe called it "a conversation among four intelligent people." Beethoven's late quartets, and works by Mozart, Schubert, Dvořák, Bartók, and Shostakovich, form the core of the repertoire.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-orchestra-vs-chamber',
    title: 'Symphony Orchestra versus Chamber Ensemble',
    category: 'Music',
    keywords: [
      'what is the difference between a symphony orchestra and a chamber ensemble', 'orchestra sections conductor 60 to 100 players',
      'chamber music one player per part no conductor', 'string quartet piano trio wind quintet chamber', 'why is chamber music intimate',
    ],
    content: `A symphony orchestra is a large ensemble of roughly 60 to 100 or more players, organised into four sections — strings (violins, violas, cellos, double basses), woodwinds, brass, and percussion — and led by a conductor who unifies the tempo, balance, and interpretation. It plays large-scale works: symphonies, concertos, overtures, and tone poems. A chamber ensemble is a small group, typically 2 to about 10 musicians, with usually one player per part and no conductor, so the players lead themselves by listening and cueing each other. It very often consists entirely of strings — the string quartet (two violins, viola, cello) is the classic example — or mixes a piano with strings (piano trio) or winds (wind quintet). Chamber music prizes intimacy, transparency, subtlety of dynamics and colour, and equality among the parts, rather than sheer power and scale. (Bass guitar plays no part in either.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-program-music',
    title: 'What Program Music Is',
    category: 'Music',
    keywords: [
      'what is program music', 'music that tells a story or depicts a scene', 'program music vs absolute music', 'tone poem symphonic poem liszt',
      'symphonie fantastique berlioz', 'the moldau vltava smetana', 'pictures at an exhibition mussorgsky',
    ],
    content: `Program music is instrumental music intended to depict or narrate something outside the music itself — a story, poem, painting, landscape, character, or emotional journey — usually signalled by a descriptive title or an accompanying text (the "program"). It is contrasted with "absolute music," which is meant to be appreciated purely as sound and structure with no external subject. Program music flourished in the Romantic era: Berlioz's "Symphonie fantastique" (an artist's opium-fuelled dream, with a recurring "idée fixe" theme for his beloved), Liszt's single-movement "symphonic poems" (he coined the term "tone poem"), Smetana's "Vltava/The Moldau" (a river flowing from source to sea), Richard Strauss's "Also sprach Zarathustra" and "Ein Heldenleben," Mussorgsky's "Pictures at an Exhibition," and Dukas's "The Sorcerer's Apprentice." Vivaldi's much earlier "Four Seasons" is a Baroque forerunner, with sonnets describing each concerto. Film scores are the modern descendant of the tradition.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jazz-improvisation',
    title: 'What Jazz Improvisation Is',
    category: 'Music',
    keywords: [
      'what is jazz improvisation', 'spontaneous composition over chord changes', 'is jazz improv random', 'head solos trading fours jazz',
      'running the changes bebop', 'modal jazz improvisation', 'transcribing licks jazz vocabulary',
    ],
    content: `Jazz improvisation is spontaneous musical composition performed in real time, but it is not random. Improvisers work within a shared framework — usually the chord progression ("the changes"), the form, the key, and the tempo of a tune — and draw on deep knowledge of harmony and scales, thousands of hours of practice, a large personal vocabulary of melodic phrases absorbed by transcribing recordings of other players, and constant listening and reacting to what the rest of the band is doing. A standard performance states the melody ("the head"), then each musician takes turns soloing over repeated cycles of the form (sometimes "trading fours" — swapping four-bar phrases with the drummer), then the head returns. Approaches range from melodic paraphrase of the tune, to fast, dense lines that spell out every chord ("running the changes," as in bebop), to sustained exploration over just one or two chords (modal jazz, like Miles Davis's "So What"), to free jazz that abandons fixed changes altogether.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-atonal-music',
    title: 'What Atonal Music Is',
    category: 'Music',
    keywords: [
      'what is atonal music', 'music with no key or tonal center', 'schoenberg berg webern second viennese school', 'twelve tone serialism tone row',
      'is atonal music random', 'why does atonal music sound dissonant', 'atonality early 20th century',
    ],
    content: `Atonal music deliberately avoids a tonal centre — there is no "home" key, and no single note or chord functions as a point of rest or arrival, so the sense of tension-and-release that tonal music depends on is removed. It emerged in the early 20th century, pioneered by Arnold Schoenberg and his students Alban Berg and Anton Webern (the "Second Viennese School"), as composers felt tonal harmony had been stretched as far as it could go. Around 1923 Schoenberg systematised it into the TWELVE-TONE or SERIAL technique: the composer arranges all twelve chromatic pitches into a fixed order (a "row" or "series") and builds the piece from that row and its transformations (backwards, upside-down, transposed), so no pitch is ever emphasised more than the others. To ears trained on tonal music it sounds dissonant and unfamiliar, and it never became widely popular, but it is highly rule-governed rather than arbitrary, and it dominated academic composition for decades and influenced film music for tension and horror scenes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musical-minimalism',
    title: 'What Minimalism Is in Music',
    category: 'Music',
    keywords: [
      'what is minimalism in music', 'repetitive short cells gradual change', 'steve reich phasing philip glass', 'process music pulse static harmony',
      'terry riley in c', 'minimalism trance hypnotic', 'minimalism influence on ambient and film music',
    ],
    content: `Minimalism is a style of music that emerged in the United States in the 1960s, built from very small musical units — a short melodic or rhythmic cell — repeated many times while changing slowly and gradually: shifting the phase between two copies, adding or removing a single note, or stretching and contracting the rhythm ("process music," where you hear the process unfold). It typically features a steady, unbroken pulse, consonant and slow-changing (nearly static) harmony, and long durations, producing a hypnotic, trance-like effect. Key figures: Terry Riley ("In C"), Steve Reich (phasing pieces, "Music for 18 Musicians"), Philip Glass ("Einstein on the Beach," and later many film scores), La Monte Young, and, in a more dramatic later form, John Adams ("Shaker Loops," "Short Ride in a Fast Machine"). Minimalism strongly shaped ambient music, electronic and dance music, post-rock, and modern film and television scoring.`,
    createdAt: Date.now(),
  },
];
