import { KnowledgeItem } from '../../types';

/**
 * MUSIC_THEORY_CONCEPTS_GAPS_2 — batch 215 corrections.
 * Misses: "scale vs arpeggio" said a scale is all its notes played together,
 * "sharp vs flat" answered about key signatures, "soprano vs alto" answered
 * about transposing saxophones instead of voice types, "movement vs piece"
 * answered movement vs passage, and web dumps / thin answers for symphony/
 * concerto (soloist role dropped), string/woodwind section, octave/unison,
 * cadence/phrase, choir/chorus and conductor/composer.
 */
export const MUSIC_THEORY_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-mus2-scale-vs-arpeggio',
    title: 'Scale vs arpeggio',
    category: 'music',
    keywords: [
      'difference between a scale and an arpeggio', 'scale vs arpeggio', 'stepwise notes',
      'notes of a chord one at a time', 'consecutive pitches', 'broken chord', 'practice patterns',
      'scale is played in sequence not together', 'thirds versus steps',
    ],
    content: `Both are notes played one after another in order, not simultaneously. The difference is which notes.

A scale is a series of consecutive pitches moving by step (mostly whole steps and half steps) through an octave, in order, up or down: C D E F G A B C. It fills in every note of the key between the starting and ending pitch. Scales are the raw material of melody.

An arpeggio (also "broken chord") is the notes of a single chord played one at a time in sequence instead of all at once: for a C major chord, C E G (C) — skipping the notes in between, so the intervals are larger (mostly thirds). It outlines the harmony rather than filling in a stepwise line.

Neither is "played all together" — that would be a cluster (for scale tones) or a chord (for the arpeggio's notes). Both are standard technical exercises because between them they cover stepwise motion and chord-shape motion, the two things melodies are built from.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-sharp-vs-flat',
    title: 'Sharp vs flat',
    category: 'music',
    keywords: [
      'difference between a sharp and a flat', 'sharp vs flat', 'raise a semitone', 'lower a semitone',
      'accidental', 'natural sign', 'enharmonic', 'C sharp equals D flat', 'not key signatures',
      'half step up or down',
    ],
    content: `A sharp (the # sign) raises a note by one semitone (half step). A flat (the b sign) lowers a note by one semitone. A natural sign cancels a previous sharp or flat, returning the note to its unaltered pitch. These marks are called accidentals when they appear next to a note in the music, and they last for the rest of that bar.

On a piano, F sharp is the black key just above (to the right of) F; B flat is the black key just below (to the left of) B.

Because raising one note and lowering the note above it can land on the same key, many pitches have two names: C sharp and D flat are the same sound (played on the same piano key). These are "enharmonic equivalents"; which spelling is used depends on the key and the musical context.

Sharps and flats also appear grouped at the start of each staff line as the key signature, which is a different topic — that tells you which notes are sharp or flat throughout the whole piece so you do not have to mark every one. But the sharp and flat symbols themselves simply mean "up a semitone" and "down a semitone".`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-soprano-vs-alto',
    title: 'Soprano vs alto (voice types)',
    category: 'music',
    keywords: [
      'difference between a soprano and an alto', 'soprano vs alto', 'vocal range', 'highest female voice',
      'lowest female voice', 'SATB choir', 'mezzo-soprano', 'contralto', 'not saxophone transposition',
      'treble voice parts',
    ],
    content: `Soprano and alto are the two higher voice parts in choral singing (the four standard parts are Soprano, Alto, Tenor, Bass — SATB). This is about singing voices, not about transposing instruments like the alto saxophone.

Soprano is the highest voice type, typically women's or children's voices, with a range roughly from middle C (C4) up to A5 or higher (trained sopranos reach C6 and beyond). Sopranos usually carry the main melody in a choir. Subtypes include coloratura, lyric and dramatic soprano.

Alto (short for contralto in solo singing) is the lowest common female voice type, with a range roughly from the F or G below middle C (F3-G3) up to about D5 or E5. In a choir the altos sing the harmony line below the sopranos. The mezzo-soprano sits between soprano and alto.

So the difference is register: soprano is high and bright and usually has the tune; alto is lower and darker and usually sings an inner harmony. The male equivalents in range are, roughly, tenor (near alto) and the countertenor (near soprano).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-movement-vs-piece',
    title: 'Movement vs piece (vs passage)',
    category: 'music',
    keywords: [
      'difference between a movement and a piece', 'movement vs piece', 'whole work',
      'self-contained section of a larger work', 'symphony has four movements', 'multi-movement work',
      'pause between movements', 'not a passage',
    ],
    content: `A piece (or "work", or "composition") is a complete standalone musical composition — the whole thing, whatever its length. "Beethoven's Fifth Symphony" is a piece; so is a three-minute song or a two-hour opera.

A movement is a self-contained major section WITHIN a larger multi-part piece, usually separated from the next by a full stop and a short silence, often with its own tempo, key and character, and sometimes its own title (Allegro, Adagio, Scherzo, Rondo). A symphony typically has four movements; a concerto usually three; a sonata two to four. Each movement could almost stand alone, but together they form one piece.

Do not confuse a movement with a passage, which is just a short stretch of music — a few bars or a phrase — inside a movement, not a formal division.

So the nesting is: piece (whole work) > movement (a big titled section of it) > passage/phrase (a small stretch within a movement). A single-movement work (a tone poem, most songs, an overture) is a piece with no internal movement divisions.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-symphony-vs-concerto',
    title: 'Symphony vs concerto',
    category: 'music',
    keywords: [
      'difference between a symphony and a concerto', 'symphony vs concerto', 'orchestra alone',
      'soloist and orchestra', 'four movements versus three', 'cadenza', 'virtuoso solo part',
      'concerto features one instrument', 'orchestral genre',
    ],
    content: `Both are large orchestral works, but the concerto adds a featured soloist.

A symphony is written for the full orchestra as a unified body, with no single player featured. The orchestra is the whole point; interest comes from how the composer develops themes across the sections. Symphonies are usually in four movements: a fast sonata-form opening, a slow movement, a minuet or scherzo, and a fast finale. Haydn, Mozart, Beethoven, Brahms, Mahler.

A concerto is built around the contrast and dialogue between one solo instrument (piano, violin, cello, trumpet, etc.) and the orchestra. The soloist has a virtuosic, prominent part; the orchestra accompanies, answers, and sometimes competes. Concertos are usually in three movements (fast, slow, fast) and traditionally include a cadenza — an unaccompanied showcase passage for the soloist near the end of a movement. A "concerto grosso" (Baroque) features a small group of soloists instead of one.

Short version: symphony = orchestra alone, usually four movements; concerto = soloist versus orchestra, usually three movements, with a cadenza.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-conductor-vs-composer',
    title: 'Conductor vs composer',
    category: 'music',
    keywords: [
      'difference between a conductor and a composer', 'conductor vs composer', 'writes the music',
      'leads the performance', 'score', 'interpretation', 'tempo and dynamics in real time',
      'baton', 'creator versus director',
    ],
    content: `A composer creates the music: writes the notes, harmonies, rhythms and orchestration and fixes them in a written score. This is done in advance, alone, at a desk. The composer decides what the piece IS.

A conductor leads a live performance of that score by an orchestra, choir or ensemble: setting and adjusting the tempo, cueing entrances, shaping dynamics and phrasing, balancing the sections so no part drowns out another, and unifying dozens or hundreds of players into one coherent interpretation, in real time, usually with a baton and gestures. The conductor also runs rehearsals and makes interpretive choices (how fast, how loud, how much rubato) within what the score allows. The conductor decides how the piece SOUNDS tonight.

They are separate roles and skills, though some people do both (Bernstein, Mahler, Boulez). It has nothing to do with "converting to concert pitch" — reading transposing instruments is just part of score-reading, not the defining job. Short version: the composer writes it; the conductor directs the people playing it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-string-vs-woodwind-section',
    title: 'String section vs woodwind section',
    category: 'music',
    keywords: [
      'difference between a string and a woodwind section', 'string vs woodwind section', 'orchestra sections',
      'violin viola cello double bass', 'flute oboe clarinet bassoon', 'bowed instruments', 'blown instruments',
      'largest section', 'reed and edge tone',
    ],
    content: `These are two of the four families that make up a symphony orchestra (the others are brass and percussion).

The string section is the largest, usually about two-thirds of the orchestra, and forms its core sound. It contains violins (split into first and second groups), violas, cellos and double basses. Sound is made by drawing a bow across strings (arco) or plucking them (pizzicato). Strings blend smoothly, can play very softly or build huge sustained textures, handle fast runs, and carry most melodies and the harmonic foundation. Multiple players share each part.

The woodwind section is much smaller, typically two of each instrument: flutes (and piccolo), oboes (and cor anglais), clarinets (and bass clarinet), and bassoons (and contrabassoon). Sound is made by blowing air to vibrate either a reed (clarinet, oboe, bassoon) or an air-stream across an edge (flute). Each woodwind has a distinct, recognisable colour, so they are used for solo lines, characterful touches and doubling. Usually one player per part.

The name "woodwind" is about how the sound is produced, not the material — a modern flute and saxophone are metal but are still woodwinds. Short version: strings are bowed, blend, and dominate the orchestra by number; woodwinds are blown, each has its own distinct colour, and there are only a handful of them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-octave-vs-unison',
    title: 'Octave vs unison (intervals)',
    category: 'music',
    keywords: [
      'difference between an octave and a unison', 'octave vs unison', 'same pitch',
      'same note eight steps apart', 'frequency ratio 2 to 1', 'frequency ratio 1 to 1', 'interval',
      'perfect octave', 'perfect unison', 'doubling',
    ],
    content: `Both are intervals in which two notes sound like "the same note", but they are not identical.

A unison (perfect prime) is two notes at exactly the same pitch — the same frequency, a ratio of 1:1. Two violinists playing the same written A are in unison. It is the interval of zero distance. Singers or instruments "in unison" are all on the identical pitch.

An octave is two notes eight scale-steps apart, where the higher note vibrates at exactly twice the frequency of the lower (ratio 2:1) — for example A at 220 Hz and A at 440 Hz. They share the same letter name and blend so completely that we hear them as the "same note" in a higher or lower register (this is "octave equivalence"). A man and a woman singing "the same" melody comfortably are usually an octave apart, not in true unison.

Short version: unison = identical pitch (1:1); octave = same note name, one twelve-semitone step apart, double the frequency (2:1). Both are "perfect" consonances and both are used to reinforce a line by doubling it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-cadence-vs-phrase',
    title: 'Cadence vs phrase',
    category: 'music',
    keywords: [
      'difference between a cadence and a phrase', 'cadence vs phrase', 'musical sentence',
      'harmonic punctuation', 'end of a phrase', 'authentic plagal half deceptive cadence',
      'antecedent and consequent', 'breath mark', 'closure',
    ],
    content: `A phrase is a complete musical thought — the equivalent of a sentence or clause in language. It is a span of melody (often about four bars, roughly the length of one breath) that has a beginning, a sense of direction, and an ending. Phrases group into larger units: a typical pair is an "antecedent" phrase that sounds unfinished and a "consequent" phrase that answers and completes it.

A cadence is the harmonic (and melodic) formula AT THE END of a phrase that gives it its sense of punctuation — how strongly it closes. It is a specific short chord progression:
- Authentic cadence (V to I): a firm "full stop", strong resolution.
- Half cadence (ending on V): a "comma" — the phrase pauses, expecting more.
- Plagal cadence (IV to I): the "amen" ending, a gentler close.
- Deceptive cadence (V to vi): a surprise — the expected resolution is dodged.

So a phrase is the whole musical sentence; the cadence is only its closing punctuation. Every phrase ends with some kind of cadence, and the type of cadence tells the listener whether the thought is finished or still hanging.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mus2-choir-vs-chorus',
    title: 'Choir vs chorus (vocal ensembles)',
    category: 'music',
    keywords: [
      'difference between a choir and a chorus', 'choir vs chorus', 'group of singers',
      'church and concert choir', 'opera and oratorio chorus', 'near synonyms', 'chorus master',
      'not the repeated section of a song', 'SATB ensemble',
    ],
    content: `As names for a group of singers, "choir" and "chorus" mean almost the same thing — an organised body of singers performing together, usually in parts (SATB). The words are often interchangeable, but there are soft conventions:

- "Choir" tends to be used for sacred or church settings (a cathedral choir, a chamber choir), for smaller or more auditioned groups, and in British usage generally. A subdivided orchestra section is also called a "choir" (the brass choir).
- "Chorus" tends to be used for the large vocal group in opera, oratorio, and musical theatre (the opera chorus, "the chorus" in Handel's Messiah), for community and amateur singing groups, and in American usage more broadly. The person who prepares them is the "chorus master".

Note the completely separate meaning in pop and folk songs: there, "the chorus" is the repeated section with the same words and hook that returns between the verses — that is a song-structure term and has nothing to do with a group of singers.`,
    createdAt: Date.now(),
  },
];
