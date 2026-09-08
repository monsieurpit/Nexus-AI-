import { KnowledgeItem } from '../../types';

// Batch 23 (music theory & genres) gap-fills. Live misses on nexus-4b:
// "what is harmony" -> Irving Janis / groupthink; "what is syncopation" ->
// only salsa dance timing; "what is rhythm" -> cut-off dump; "melody" /
// "bass line" / "circle of fifths" -> web dumps that drift to a wrong topic
// (circle of thirds, bass drum); "classical music" -> collapsed the broad
// tradition into just the 1750-1820 Classical period.
export const MUSIC_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-harmony-music',
    title: 'What Harmony Is (Music)',
    category: 'Music',
    keywords: [
      'what is harmony', 'what is harmony in music', 'what does harmony mean music', 'harmony vs melody',
      'what is a harmony part', 'what is consonance and dissonance', 'how does harmony work',
    ],
    content: `In music, harmony is what you get when two or more notes sound at the same time, and how those simultaneous notes and chords are chosen and connected over the course of a piece. If melody is the horizontal line you hum, harmony is the vertical stack underneath and around it. Harmony includes: chords (three or more notes together, like a C major triad), the progression from one chord to the next, and the sense of a "home" key that the music moves away from and returns to. Combinations that sound stable and pleasant are called consonant; tense, clashing ones are dissonant, and composers use the pull from dissonance back to consonance to create motion and release. A backing singer holding a different note above or below the tune is "singing harmony." (This is unrelated to "harmony" meaning agreement in a group.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-syncopation',
    title: 'What Syncopation Is',
    category: 'Music',
    keywords: [
      'what is syncopation', 'what does syncopation mean', 'syncopated rhythm', 'what is an off beat',
      'why does music sound syncopated', 'examples of syncopation', 'playing against the beat',
    ],
    content: `Syncopation is deliberately placing accents or notes where the listener doesn't expect them — on the weak beats, or between the beats (the "off-beats" or "and"s), instead of on the strong downbeats. It disrupts the regular pulse and creates a sense of push, surprise or groove. Common techniques: accenting beats 2 and 4 instead of 1 and 3 (the "backbeat" in rock and pop), tying a note over a barline or across a beat so the accent lands early, or leaving the downbeat silent. Syncopation is central to the feel of jazz, funk, ska, reggae, Latin music, ragtime and hip-hop, and it's used for spice in classical music too. It's basically the difference between a stiff "1-2-3-4" and a rhythm that makes you want to move.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rhythm-music',
    title: 'What Rhythm Is (Music)',
    category: 'Music',
    keywords: [
      'what is rhythm', 'what is rhythm in music', 'what does rhythm mean', 'rhythm vs beat', 'what is a beat',
      'what is meter in music', 'what is a bar or measure',
    ],
    content: `Rhythm is the pattern of sounds and silences in time — how long each note or rest lasts and how those durations are arranged. Related terms: the beat (or pulse) is the steady underlying "tick" you tap your foot to; tempo is how fast that beat goes (in beats per minute); metre is how the beats group into repeating units of strong and weak (groups of 4 in 4/4, groups of 3 in a waltz), and each of those groups is written as a bar (measure); the time signature at the start tells you the metre. Note values divide the beat: a whole note lasts four beats in 4/4, a half note two, a quarter note one, eighth and sixteenth notes split it further. Rhythm exists independently of pitch — you can clap a rhythm with no melody at all — and syncopation is what happens when the rhythm pushes against the expected beat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-melody-music',
    title: 'What a Melody Is',
    category: 'Music',
    keywords: [
      'what is a melody', 'what is melody in music', 'what does melody mean', 'melody vs harmony', 'what is a tune',
      'what makes a good melody', 'what is a musical phrase',
    ],
    content: `A melody is a succession of single notes, one after another, that the ear follows as a recognisable line — it's the part of a song you hum, whistle or sing, "the tune." A melody has two ingredients working together: pitch (which notes, higher or lower, and the intervals between them — the shape or "contour" of the line) and rhythm (how long each note lasts). Melodies are usually built from the notes of a particular scale or key, organised into short units called phrases that feel like musical sentences, often with a question-and-answer pattern. Melody is the "horizontal" element of music; harmony (notes sounding together) is the "vertical" element that supports it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bass-line',
    title: 'What a Bass Line Is',
    category: 'Music',
    keywords: [
      'what is a bass line', 'what is a bassline', 'what does a bass line do', 'what instrument plays the bass line',
      'why is the bass line important', 'what is a walking bass line', 'bass line vs bass drum',
    ],
    content: `A bass line is the lowest-pitched melodic line in a piece of music — the part played by an instrument like the electric bass, double bass, tuba, low synth or the left hand on a keyboard. It does two jobs at once: it lays down the harmonic foundation (usually outlining the root notes of the chords, telling your ear what chord you're hearing), and it locks in with the drums to drive the rhythm and groove. A strong bass line is a big part of why a song feels good to move to — think funk, reggae, disco, hip-hop, house. Styles of bass line include a steady "root note on every beat," a syncopated funk line, and a jazz "walking bass" that moves stepwise through the chord changes. (A bass line is a pitched line; the bass drum is just a single low percussion instrument.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chord-progression',
    title: 'What a Chord Progression Is',
    category: 'Music',
    keywords: [
      'what is a chord progression', 'what does chord progression mean', 'common chord progressions', 'what is I IV V',
      'what is the 1 4 5 progression', 'what is a 12 bar blues progression', 'roman numerals in music',
    ],
    content: `A chord progression is a sequence of chords played one after another over the course of a section or a whole song — it's the harmonic "journey" that the melody sits on top of. Chords are labelled with Roman numerals based on their position in the key (I is built on the 1st note of the scale, IV on the 4th, V on the 5th, vi on the 6th, etc.), so the same progression can be described in any key: I–IV–V–I is C–F–G–C in the key of C. Famous progressions: I–IV–V (countless rock, blues and folk songs), the 12-bar blues, I–V–vi–IV (the "four chords" behind a huge share of pop hits), and ii–V–I (the backbone of jazz). Progressions work by creating and resolving tension — moving away from the "home" chord (I) and eventually back to it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-circle-of-fifths',
    title: 'What the Circle of Fifths Is',
    category: 'Music',
    keywords: [
      'what is the circle of fifths', 'circle of fifths explained', 'how does the circle of fifths work',
      'what is the circle of fourths', 'how many sharps does a key have', 'circle of fifths key signatures',
    ],
    content: `The circle of fifths is a diagram that arranges the 12 musical keys around a circle, each one a perfect fifth apart. Starting from C at the top (no sharps or flats) and moving clockwise, each step up a fifth adds one sharp to the key signature: G (1 sharp), D (2), A (3), E (4), B (5), and so on. Moving counter-clockwise from C adds flats: F (1 flat), B♭ (2), E♭ (3), and so on. Keys next to each other on the circle share almost all their notes, so they sound closely related and musicians move between them easily; keys on opposite sides are the most distant. Musicians use it to know how many sharps or flats a key has, to find a song's relative minor (the minor key with the same key signature, three positions clockwise), to transpose, and to build chord progressions (the very common ii–V–I and the "circle progression" move around it). Going the other way it's sometimes called the circle of fourths.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-classical-music',
    title: 'What Classical Music Is',
    category: 'Music',
    keywords: [
      'what is classical music', 'what does classical music mean', 'is classical music just old music', 'what is the classical period',
      'periods of classical music', 'baroque classical romantic', 'what counts as classical music',
    ],
    content: `"Classical music" has two meanings. Broadly, it's the Western art-music tradition — music composed in a written score, performed in concert halls and churches, spanning roughly 1,000 years and grouped into periods: Medieval, Renaissance, Baroque (Bach, Vivaldi, ~1600–1750), Classical (Haydn, Mozart, early Beethoven, ~1750–1820), Romantic (Chopin, Brahms, Tchaikovsky, Wagner, ~1820–1900), and 20th/21st-century (Stravinsky, Shostakovich, Philip Glass). Narrowly and confusingly, "Classical" with a capital C is just that one middle period (~1750–1820), characterised by clear balanced structures like the sonata, symphony, string quartet and concerto, and elegant, tuneful melodies. So when people say a piece is "classical," they usually mean the whole tradition; when a musicologist says "Classical," they mean Mozart's era specifically.`,
    createdAt: Date.now(),
  },
];
