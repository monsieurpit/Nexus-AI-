import { KnowledgeItem } from '../../types';

/**
 * MUSIC_MODERN_CONCEPTS_GAPS — batch 205 corrections.
 * Contemporary / popular-music vocabulary the corpus was missing or answering
 * with wrong-domain content: "rock vs metal" answered about geology, "hook vs
 * riff" about rock climbing, "single vs album" about badminton, "amplifier vs
 * speaker" with op-amp math, plus raw web dumps for cover/remix, capo/slide,
 * country/folk, genre/subgenre, condenser/dynamic mic, mono/stereo, and blanks
 * for woodwind/brass and vibrato/bending.
 */
export const MUSIC_MODERN_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-musmod-rock-vs-metal',
    title: 'Rock vs metal (music genres, not geology)',
    category: 'music',
    keywords: [
      'difference between rock and metal', 'rock vs metal', 'rock music', 'heavy metal',
      'metal music', 'hard rock', 'distortion', 'genre', 'guitar', 'band', 'headbang',
      'not rocks and minerals', 'music genre not geology',
    ],
    content: `This is about music genres, NOT geology (rocks, minerals, iron, smelting have nothing to do with it).

Rock music is a broad guitar-driven genre that grew out of rock and roll, blues and folk in the 1950s and 60s: electric guitar, bass, drums, vocals, usually verse-chorus songs, moderate distortion, backbeat on 2 and 4. Think The Beatles, Rolling Stones, Nirvana, Foo Fighters.

Metal (heavy metal) is a heavier, louder offshoot of rock that emerged around 1970 with Black Sabbath, Led Zeppelin and Deep Purple. Compared to plain rock it uses: much heavier distortion and gain, down-tuned or lower guitar riffs, faster and more aggressive drumming (double kick, blast beats in extreme metal), power chords and palm muting as the core rhythm technique, darker or more epic lyrical themes, and often harsh or operatic vocals rather than conversational singing. Subgenres include thrash (Metallica, Slayer), death metal, black metal, doom, power metal and metalcore.

Short version: all metal is descended from rock, but metal pushes the volume, distortion, speed and heaviness much further, and treats the riff as the song's backbone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-hook-vs-riff',
    title: 'Hook vs riff in a song (not climbing)',
    category: 'music',
    keywords: [
      'difference between a hook and a riff', 'hook vs riff', 'musical hook', 'guitar riff',
      'catchy part of a song', 'chorus hook', 'not toe hook climbing', 'songwriting',
      'earworm', 'melody', 'instrumental phrase',
    ],
    content: `Both are music terms. A "hook" here has nothing to do with climbing (toe hook, heel hook) or fishing.

A hook is the part of a song designed to catch and stick in the listener's ear — the memorable bit you hum afterwards. It is usually the vocal line of the chorus, a repeated title phrase, or a short catchy melodic or production motif. Its whole job is memorability and repetition. A pop song may have several hooks (vocal hook, synth hook, ad-lib hook).

A riff is a short repeated instrumental phrase, almost always on guitar, bass or keys, that forms the rhythmic and harmonic backbone of a section or whole song. Examples: the opening of "Smoke on the Water", "Seven Nation Army", "Enter Sandman". A riff is played, not sung, and it drives the groove.

Overlap: a riff can also be the hook (the "Seven Nation Army" riff is both). But a hook is defined by "does it stick?", a riff is defined by "is it a repeating instrumental figure?". A lick, by contrast, is a shorter throwaway phrase used for decoration inside a solo, not a structural backbone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-single-vs-album',
    title: 'Single vs album (music release, not badminton)',
    category: 'music',
    keywords: [
      'difference between a single and an album', 'single vs album', 'music release',
      'lead single', 'LP', 'EP', 'track', 'record', 'not badminton singles', 'streaming',
      'discography',
    ],
    content: `This is about music releases, not badminton (singles vs doubles).

A single is one song (sometimes two or three) released on its own, usually to promote an upcoming album or to stand alone. Historically a 7-inch vinyl with an A-side and B-side; today a single is just a track pushed to radio and streaming with its own artwork and marketing. Artists release "lead singles" weeks or months before the full record.

An album is a full-length collection of songs released together as one body of work, typically 8 to 15 tracks and 30 to 60 minutes, sequenced deliberately, with one cover, one title and often a unifying theme or era. On vinyl this is the LP (long play).

An EP (extended play) sits in between: more than a single, shorter than an album, usually 3 to 6 tracks.

Short version: single = one song as a standalone release; album = the whole record.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-amplifier-vs-speaker',
    title: 'Amplifier vs speaker (audio gear, not op-amps)',
    category: 'music',
    keywords: [
      'difference between an amplifier and a speaker', 'amplifier vs speaker', 'amp',
      'PA system', 'guitar amp', 'power amp', 'loudspeaker', 'driver', 'cabinet',
      'not op-amp math', 'audio signal chain', 'watts', 'transducer',
    ],
    content: `In an audio system these are two different boxes in the signal chain. This is not about op-amp equations (Vout = A(V+ - V-)).

An amplifier takes a weak audio signal (from a guitar, mixer, phone, preamp) and boosts it to a much higher power level — enough current and voltage to physically move speaker cones. It does not make sound; it makes electricity stronger. Rated in watts.

A speaker (loudspeaker, driver) is a transducer: it takes that amplified electrical signal and converts it into sound by pushing air with a moving cone or dome. It does not boost anything; feed it a weak signal and it barely moves.

So the order is: source -> amplifier -> speaker -> your ears. A "powered" or "active" speaker has an amplifier built into the same cabinet; a "passive" speaker needs a separate external amp. A guitar "combo amp" contains both an amplifier circuit and a speaker in one box; an "amp head" plus "cab" splits them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-cover-vs-remix',
    title: 'Cover vs remix',
    category: 'music',
    keywords: [
      'difference between a cover and a remix', 'cover vs remix', 'cover version',
      'remix', 'rerecording', 'original recording', 'stems', 'DJ remix', 'tribute',
      'sampled', 'reinterpretation',
    ],
    content: `A cover is a brand-new performance and recording of an existing song by a different artist. The performers play and sing it themselves, often changing the arrangement, key, tempo or genre, but it is a fresh take from scratch. Example: Jimi Hendrix covering "All Along the Watchtower", Johnny Cash covering "Hurt".

A remix reuses the original recording. A remixer takes the master multitrack or the isolated stems (vocals, drums, bass, etc.) from the original and rebuilds the track around them — new beat, new production, new structure — while keeping the original vocal or key parts. Most remixes are dance or club versions. Example: a house remix of a pop single keeps the singer's exact vocal takes over a new four-on-the-floor production.

Key line: a cover re-performs the song, a remix re-produces the original recording. A "flip" or "bootleg" is an unofficial remix. A "sample" is smaller still — just a snippet of one recording dropped into a different song.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-capo-vs-slide',
    title: 'Capo vs slide on guitar',
    category: 'music',
    keywords: [
      'difference between a capo and a slide on guitar', 'capo vs slide', 'guitar capo',
      'slide guitar', 'bottleneck slide', 'transpose', 'glissando', 'open tuning',
      'fret', 'blues slide',
    ],
    content: `Both are small tools a guitarist uses, but they do opposite jobs.

A capo is a spring or screw clamp fastened across all the strings at one fret. It permanently raises the pitch of every open string by the same amount for as long as it is on, effectively shortening the neck. Guitarists use it to play familiar open-chord shapes in a higher key, to match a singer, or to get a brighter ringing tone. It is set once and left in place while you play normally behind it.

A slide (also bottleneck) is a smooth tube of glass, metal or ceramic worn on one finger. Instead of pressing strings down onto frets, the player lightly touches the strings with the slide and moves it along the neck, sliding continuously between pitches (glissando) with lots of vibrato. It is a playing technique, constantly in motion, central to blues, country and Hawaiian guitar, and usually paired with an open tuning and raised action.

Short version: a capo fixes a new nut position and you fret normally; a slide replaces fretting with a gliding, pitch-bending touch.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-country-vs-folk',
    title: 'Country vs folk music',
    category: 'music',
    keywords: [
      'difference between country and folk music', 'country vs folk', 'country music',
      'folk music', 'Americana', 'Appalachian', 'bluegrass', 'singer-songwriter',
      'acoustic', 'Nashville', 'protest song',
    ],
    content: `Both grew from the same rural Anglo-American and African-American roots (ballads, hymns, blues, fiddle tunes), and they overlap heavily under the "Americana" umbrella, but they lean different ways.

Country music became a commercial genre in the 1920s, centered on Nashville and the radio/record industry. It uses storytelling lyrics about working-class life, heartbreak, family, faith and small-town identity, with pedal steel guitar, fiddle, banjo, twangy vocals and, in modern country, polished pop and rock production. It is a mainstream industry with charts, stars and studios.

Folk music traditionally means songs passed down orally by ordinary people, with no single author. The 20th-century "folk revival" (Woody Guthrie, Pete Seeger, Bob Dylan, Joan Baez) turned it into a performer's genre built on acoustic guitar, simple arrangements, and lyrics that often carry social commentary, protest, or personal introspection. Folk prizes authenticity and the song over production polish.

Rough line: country is the commercial, radio-driven descendant; folk stays closer to acoustic, tradition, and message. Bluegrass, alt-country and the singer-songwriter tradition sit between them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-genre-vs-subgenre',
    title: 'Genre vs subgenre in music',
    category: 'music',
    keywords: [
      'difference between a genre and a subgenre in music', 'genre vs subgenre',
      'music genre', 'subgenre', 'style', 'category', 'classification', 'fusion genre',
      'microgenre', 'taxonomy',
    ],
    content: `A genre is a broad category of music defined by shared conventions — instrumentation, rhythm, song structure, cultural context and history. Examples: rock, jazz, hip hop, electronic, classical, country.

A subgenre is a narrower style that lives inside a genre. It keeps the parent genre's core traits but adds its own defining features and scene. Examples: within rock you get punk, grunge, prog rock, metal; within metal you get thrash, death, black, doom; within electronic you get house, techno, drum and bass, dubstep; within hip hop you get boom bap, trap, drill.

So the relationship is hierarchical: genre is the family, subgenre is a branch, and a sub-subgenre (or "microgenre") can branch again. A "fusion" genre (jazz-funk, country-rap, folktronica) deliberately combines traits from two parents. The boundaries are fuzzy and argued about constantly, because genre is a social convention, not a fixed rule.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-condenser-vs-dynamic-mic',
    title: 'Condenser vs dynamic microphone',
    category: 'music',
    keywords: [
      'difference between a microphone condenser and dynamic', 'condenser vs dynamic mic',
      'condenser microphone', 'dynamic microphone', 'phantom power', '48V', 'diaphragm',
      'studio vocal mic', 'stage mic', 'SM58', 'sensitivity', 'transient response',
    ],
    content: `Two ways a microphone turns sound into an electrical signal.

A dynamic microphone works like a tiny loudspeaker in reverse: sound waves move a diaphragm attached to a coil of wire sitting in a magnetic field, and that motion generates a small current. It is passive (needs no power), rugged, handles very loud sources without distorting, rejects background noise well, and has a slightly softer high end. This is the standard for live vocals, guitar cabs and snare drums. Classic examples: Shure SM58, SM57.

A condenser microphone uses a thin conductive diaphragm mounted just in front of a fixed metal backplate, forming a capacitor. Sound vibrates the diaphragm, changing the capacitance, and active internal electronics convert that into a signal. It needs power — usually 48V "phantom power" sent up the XLR cable from the mixer or interface, or a battery. Condensers are far more sensitive, capture fine detail and fast transients, and have a wider, flatter frequency response, which is why they dominate studio vocals, acoustic instruments and overheads. They are also more fragile and clip more easily on very loud sources.

Short version: dynamic = tough, no power, live use; condenser = sensitive, needs 48V, studio use.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-mono-vs-stereo',
    title: 'Mono vs stereo sound',
    category: 'music',
    keywords: [
      'difference between mono and stereo sound', 'mono vs stereo', 'monophonic',
      'stereophonic', 'left and right channel', 'stereo image', 'panning', 'mono fold-down',
      'phase cancellation', 'width',
    ],
    content: `Mono (monophonic) audio is a single channel of sound. The same signal is sent to every speaker, so there is no left, right or sense of width — everything sits in one point in the middle. Mono still matters because many playback systems are mono or collapse to it: phone speakers, most Bluetooth speakers, club and PA systems, AM radio, callers on a phone.

Stereo (stereophonic) audio is two channels, left and right, carrying slightly different signals. This lets a mix place instruments across a horizontal "stereo image" (panning) and recreate the spatial spread of a real performance, so a drum kit or a crowd sounds wide rather than pinpoint. Stereo is the standard for music listening on headphones and paired speakers.

Practical point for engineers: mixers regularly check a "mono fold-down" — summing left and right to one channel — to catch phase problems, where stereo-widened or out-of-phase elements partly cancel and vanish or get quieter when the mix plays back in mono. A mix that sounds huge in stereo but thin in mono has a phase issue.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-woodwind-vs-brass',
    title: 'Woodwind vs brass instrument',
    category: 'music',
    keywords: [
      'difference between a woodwind and a brass instrument', 'woodwind vs brass',
      'woodwind family', 'brass family', 'reed', 'embouchure', 'flute clarinet saxophone',
      'trumpet trombone tuba french horn', 'orchestra sections', 'wind instrument',
      'valves', 'slide',
    ],
    content: `Both are wind instruments — you make sound by blowing air — but the two families differ in how the sound is started and how notes are changed. The names are historical, not strictly about material (a modern flute and saxophone are metal but still woodwinds).

Woodwinds start the vibration in one of two ways: by splitting a stream of air across an edge or hole (flute, piccolo, recorder), or by making a thin cane reed vibrate — a single reed clamped to a mouthpiece (clarinet, saxophone) or a double reed of two blades against each other (oboe, bassoon). Pitch is changed mainly by opening and closing tone holes along the tube with keys and fingers, which shortens or lengthens the vibrating air column.

Brass instruments (trumpet, cornet, trombone, French horn, tuba, euphonium) make sound by the player buzzing their lips into a cup-shaped mouthpiece; the lips are the vibrating element (the "embouchure"). Pitch is changed by lip tension (moving between notes of the harmonic series) combined with valves that add extra tubing, or a slide on the trombone.

Short version: woodwind = edge or reed vibrates, holes and keys change notes; brass = buzzing lips vibrate, valves or a slide change notes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-vibrato-vs-bending',
    title: 'Vibrato vs bending a note',
    category: 'music',
    keywords: [
      'difference between vibrato and bending a note', 'vibrato vs bend', 'guitar vibrato',
      'string bending', 'pitch bend', 'expression technique', 'wobble', 'blues bend',
      'finger vibrato', 'ornament',
    ],
    content: `Both change the pitch of a sounding note for expression, but in different shapes.

Vibrato is a small, steady, repeating wobble in pitch around the target note — up and down, up and down — while the note is held. It does not move you to a new note; it adds warmth, sustain and life to the note you are already on. Singers, string players and wind players do it naturally; on guitar you rock or shake the fretting finger. It is measured by its rate (how fast the wobble) and depth (how wide).

Bending is a one-way push: you raise a note's pitch to a different, higher target — typically a half step or whole step, sometimes more — usually by physically pushing or pulling the string sideways across the fret on guitar, or by lip and air pressure on a harmonica or wind instrument. A bend has a start pitch, a destination pitch, and often a release back down. It is a pitch move, not an oscillation.

Common combo: bend up to the target note, then add vibrato on top of it once you arrive — a staple of blues and rock lead guitar.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-synth-vs-keyboard',
    title: 'Synthesizer vs keyboard',
    category: 'music',
    keywords: [
      'difference between a synthesizer and a keyboard', 'synth vs keyboard', 'synthesizer',
      'digital keyboard', 'workstation', 'oscillator', 'sample playback', 'arranger keyboard',
      'MIDI controller', 'sound generation', 'presets',
    ],
    content: `"Keyboard" is a loose umbrella term; "synthesizer" is one specific kind of instrument. The everyday distinction:

A synthesizer generates sound electronically from scratch — oscillators produce raw waveforms (sine, saw, square), which are then shaped by filters, envelopes and modulation (LFOs) to build a tone that never existed as a recording. Subtractive, FM, wavetable and analog synthesis are all methods of building sound this way. A synth gives you deep hands-on control of the timbre via knobs and sliders.

A "keyboard" in casual use usually means a consumer digital or arranger keyboard (Yamaha PSR, Casio home keyboards): it mostly plays back sampled recordings of real instruments (piano, strings, brass), has hundreds of presets, built-in rhythms and auto-accompaniment, and limited sound-shaping. A digital piano is a keyboard focused on one realistic piano sound with weighted keys.

Confusing bits: many modern synths also use samples, and many "workstation keyboards" contain a full synth engine. A "MIDI keyboard controller" makes no sound at all — it just sends note data to a computer. So the real question is what is generating the sound: synthesis engine vs sample playback.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-verse-vs-chorus',
    title: 'Verse vs chorus in a song',
    category: 'music',
    keywords: [
      'difference between a verse and a chorus', 'verse vs chorus', 'song structure',
      'verse-chorus form', 'hook', 'refrain', 'lyrics change', 'repeated section',
      'pop song sections', 'pre-chorus bridge',
    ],
    content: `In verse-chorus song form these are the two main building blocks, and they alternate.

A verse moves the story forward. Each verse usually keeps the same melody and chord pattern but has different lyrics every time, adding new detail or advancing the narrative. Verses are typically a little lower energy, setting up the payoff.

A chorus is the repeated high point. It has the same lyrics and the same melody every time it appears, it usually contains the song's title and main hook, and it is the part listeners sing along to. It is often louder, fuller, and higher in the melody than the verse.

A typical layout is: verse 1, chorus, verse 2, chorus, bridge, chorus. Related parts: a pre-chorus is a short connecting section that builds tension between verse and chorus; a bridge is a contrasting section (new chords, new melody) that appears once, usually before the final chorus; a refrain is a single repeated line inside or ending a verse when there is no full separate chorus.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-bridge-vs-prechorus',
    title: 'Bridge vs pre-chorus in a song',
    category: 'music',
    keywords: [
      'difference between a bridge and a pre-chorus', 'bridge vs pre-chorus', 'song structure',
      'pre-chorus lift', 'middle eight', 'bridge section', 'build tension', 'contrast section',
      'songwriting parts',
    ],
    content: `Both are secondary sections in a pop song, but they sit in different places and do different jobs. This is not about a bridge versus a coda.

A pre-chorus (also called a lift, build or channel) is a short section that comes between the verse and the chorus, every time. Its job is to raise tension and energy so the chorus lands harder — often by climbing in melody, changing the harmony, or thinning then thickening the arrangement. Because it recurs, it uses the same lyrics or nearly the same lyrics each time, like the chorus.

A bridge (in British usage the "middle eight") appears once, usually after the second chorus and before the final chorus. It provides contrast and relief: new chord progression, new melody, often a shift in perspective or a key change, sometimes a breakdown or a solo. It deliberately sounds different from everything else in the song so the last chorus feels fresh when it returns.

Short version: pre-chorus = recurring ramp into the chorus; bridge = one-time contrasting detour before the last chorus.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-semitone-vs-wholetone',
    title: 'Semitone vs whole tone on a piano',
    category: 'music',
    keywords: [
      'difference between a semitone and a whole tone on a piano', 'semitone vs whole tone',
      'half step vs whole step', 'interval', 'piano keys', 'adjacent keys', 'chromatic',
      'music theory intervals', 'minor second major second',
    ],
    content: `These are the two smallest intervals in standard Western music, measured on a piano keyboard by counting keys (including both white and black keys).

A semitone (half step, minor second) is the distance between one key and the very next key, with NO key skipped. Examples on a piano: C to C-sharp, E to F, B to C. It is the smallest step in the 12-note system.

A whole tone (whole step, major second) is two semitones, which means you move from one key to another with exactly one key in between. Examples: C to D (skipping C-sharp), E to F-sharp (skipping F), B-flat to C.

So: semitone = adjacent keys, nothing skipped; whole tone = one key skipped between them. A major scale is built from the pattern whole, whole, half, whole, whole, whole, half. A "whole-tone scale" is made entirely of whole steps and has only six notes per octave.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-musmod-beat-vs-rhythm',
    title: 'Beat vs rhythm',
    category: 'music',
    keywords: [
      'difference between a beat and a rhythm', 'beat vs rhythm', 'pulse', 'tempo',
      'steady beat', 'rhythmic pattern', 'tap your foot', 'note durations', 'groove',
      'meter',
    ],
    content: `The beat is the steady, evenly spaced pulse underneath music — the thing you tap your foot to or nod your head to. It does not change speed within a section, and it is what a metronome clicks. Beats are grouped by the meter (four beats per bar in 4/4).

Rhythm is the actual pattern of sounds and silences over time — how long each note and rest lasts and where the accents fall. Rhythm can be simple (notes right on the beat) or syncopated (notes deliberately off the beat), and it can be dense or sparse. You can clap a rhythm with no pitch and no melody at all.

Relationship: the beat is the fixed grid; the rhythm is what you play against that grid. A drummer keeps the beat with the kick and hi-hat while playing a rhythm with the snare and fills. In hip hop and pop production the whole instrumental track is also casually called "the beat", but musically the beat is just the pulse and the rhythm is the pattern riding on it.`,
    createdAt: Date.now(),
  },
];
