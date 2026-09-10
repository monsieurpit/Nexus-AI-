import { KnowledgeItem } from '../../types';

/**
 * MUSIC_CONCEPTS_GAPS — batch 247 corrections.
 * nexus-4b handled most music contrasts well. Misses:
 * - "trumpet vs cornet": said only the trumpet has valves (both have three).
 * - "house vs techno": said house began at "early-to-mid 2010s EDM festivals"
 *   (Chicago and Detroit, early-to-mid 1980s).
 * - "DAW vs sequencer": web dump about Renoise and the Hmong language.
 * - "mastering vs mixing": jargon-salad, several claims wrong.
 * - "bar vs measure": never said they are the same thing.
 * - "opera vs musical", "tempo vs rhythm", "legato vs staccato", "acoustic vs
 *   electric guitar", "producer vs composer", "reverb vs delay", "conductor vs
 *   bandleader", "classical vs baroque music" were cut before the second half.
 * - "piano vs keyboard" conflated "piano" with "digital piano".
 * - "compression vs limiting" said a limiter clips.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'music', keywords, content, createdAt: now,
});

export const MUSIC_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-music-trumpet-vs-cornet',
    'Trumpet vs cornet',
    [
      'difference between a trumpet and a cornet', 'both are three-valve brass instruments usually pitched in B flat', 'the cornet has a more conical gradually widening bore giving a warmer mellower rounder tone',
      'the trumpet has a more cylindrical bore giving a brighter more brilliant piercing tone', 'the cornet is more compact tubing wrapped more tightly deeper mouthpiece', 'cornet is standard in British brass bands trumpet dominates orchestras and jazz',
    ],
    `Both the trumpet and the cornet are BRASS instruments played by buzzing the lips into a cup mouthpiece, both usually pitched in B-flat, both with the same range, and — importantly — BOTH have THREE piston VALVES that work identically. (It is a common error to say the cornet has no valves; it does.)

The real differences are in the tubing:
- BORE SHAPE: the cornet's tubing is more CONICAL (it widens gradually from mouthpiece to bell); the trumpet's is more CYLINDRICAL (a more constant diameter until the bell flare). This is the main thing.
- TONE: the cornet's conical bore gives a WARMER, MELLOWER, rounder, more "vocal" sound that blends easily. The trumpet's cylindrical bore gives a BRIGHTER, more BRILLIANT, more penetrating and heroic sound.
- SHAPE: the cornet is shorter and more compact, with the tubing wrapped in a tighter coil, and it traditionally takes a deeper mouthpiece; the trumpet is longer and more elongated.
- USE: the cornet is the traditional lead voice of BRITISH-STYLE BRASS BANDS and older wind bands; the trumpet dominates the orchestra, big band, and jazz.

A trumpeter can pick up a cornet with almost no adjustment; the difference the audience hears is timbre, not technique.`,
  ),
  k(
    'kb-gap-music-house-vs-techno',
    'House vs techno',
    [
      'difference between house and techno', 'house originated in Chicago in the early 1980s Frankie Knuckles the Warehouse club rooted in disco funk and gospel warm soulful groovy often with vocals', 'techno originated in Detroit in the mid 1980s the Belleville Three Juan Atkins Derrick May Kevin Saunderson futuristic mechanical hypnotic industrial synthetic usually no vocals darker',
      'both are four-on-the-floor electronic dance music predating EDM festivals by decades', 'house about 118 to 130 bpm techno about 125 to 150 bpm',
    ],
    `Both are foundational forms of electronic dance music with a "four-on-the-floor" kick drum, and both were created in the American Midwest in the early-to-mid 1980s — NOT at 2010s EDM festivals.

HOUSE began in CHICAGO around 1981-84, named after the Warehouse club where DJ Frankie Knuckles played extended, re-edited disco. Its roots are DISCO, FUNK, SOUL, and GOSPEL. Characteristics: warm and groovy, typically 118-130 BPM, prominent swing/shuffle in the hi-hats, soulful chords and pianos, and often full VOCALS (diva house, deep house, gospel house). It feels human and uplifting. Sub-genres: deep, acid, garage, French, tech house, progressive.

TECHNO began in DETROIT around 1985-88, created by the "Belleville Three" — Juan Atkins, Derrick May, and Kevin Saunderson — inspired by Kraftwerk, funk, and a vision of a post-industrial future. Characteristics: mechanical, repetitive, HYPNOTIC, often 125-150 BPM, stripped-down and synthetic, darker and more austere, usually INSTRUMENTAL (few or no vocals), with emphasis on rhythm, texture, and relentless drive rather than melody or song structure. Sub-genres: Detroit, minimal, dub, industrial, hard.

Rule of thumb: house grooves and often sings and comes from disco; techno pulses, stays instrumental, and comes from a machine-age aesthetic.`,
  ),
  k(
    'kb-gap-music-daw-vs-sequencer',
    'DAW vs sequencer',
    [
      'difference between a DAW and a sequencer', 'a DAW digital audio workstation is comprehensive software for recording editing mixing and producing both audio and MIDI a whole studio in software Pro Tools Logic Ableton FL Studio', 'a sequencer records and plays back sequences of MIDI or control data the note events timing and automation to drive synths and drum machines without handling audio itself',
      'modern DAWs contain a sequencer as one component', 'standalone hardware sequencers still exist', 'sequencer arranges note data a DAW does that plus full audio',
    ],
    `A SEQUENCER records, edits, and plays back SEQUENCES OF EVENTS over time — most often MIDI data: which note, how hard (velocity), when it starts and stops, plus control changes and automation. It does NOT record or process audio itself; it sends its stream of instructions to sound-making devices (synths, drum machines, samplers) which produce the actual sound. Sequencers began as hardware (step sequencers on synths, the classic Roland units) and still exist as hardware (Elektron, MPC) and as software.

A DAW (Digital Audio Workstation) is comprehensive software that runs an entire recording studio on a computer: multitrack AUDIO recording and editing, MIDI sequencing, virtual instruments, effects plug-ins, automation, mixing, and mastering, all in one project. Examples: Pro Tools, Logic Pro, Ableton Live, FL Studio, Cubase, Reaper.

The relationship: every modern DAW CONTAINS a sequencer (the piano-roll / MIDI editor) as one of its parts. So a sequencer handles the arrangement and triggering of note data; a DAW does that AND records, edits, and mixes real audio. If you only need to program a synth part you can use a bare sequencer; to record a band and mix the record you need a DAW.`,
  ),
  k(
    'kb-gap-music-mixing-vs-mastering',
    'Mixing vs mastering',
    [
      'difference between mixing and mastering', 'mixing takes all the individual recorded tracks drums bass vocals guitars and balances them into one stereo file levels panning EQ compression reverb and effects on each element', 'mastering takes that finished stereo mix and does final polishing on the whole thing overall EQ gentle compression stereo width loudness to streaming standards and for an album consistency and sequencing across tracks',
      'mixing is many tracks to one mix mastering is one mix to a release-ready master', 'mastering engineer is a fresh set of ears on a different system',
    ],
    `They are two consecutive stages of finishing a recording.

MIXING works with the MANY separate tracks that were recorded — every drum mic, the bass DI, each vocal take, the guitars, the keyboards. The mix engineer balances them into ONE cohesive stereo file: setting relative LEVELS, placing sounds left-to-right with PANNING, carving space with EQ, controlling dynamics with COMPRESSION on individual elements, and adding REVERB, DELAY, and other effects so the parts sit together and the emotional intent comes through. The output is a single "final mix" (a stereo file, or stems).

MASTERING works with that ONE finished stereo mix (not the individual tracks). The mastering engineer — traditionally a different person, with fresh ears, in a room and on monitors tuned for the job — applies gentle, broad-strokes processing to the WHOLE thing: subtle overall EQ, light "glue" compression or a limiter, stereo-width and tonal adjustments, and bringing the LOUDNESS up to competitive/streaming-standard levels without distortion. For an album they also make every track consistent in level and tone, set the gaps and fades, and sequence the record. The output is the release-ready master for streaming, CD, or vinyl.

Short version: mixing = combine and balance the parts into a song; mastering = polish and standardise the finished song(s) for release.`,
  ),
  k(
    'kb-gap-music-bar-vs-measure',
    'Bar vs measure',
    [
      'difference between a bar and a measure', 'bar and measure mean exactly the same thing a single segment of music containing a set number of beats', 'bar is the common British term measure is the common American term',
      'the vertical line separating them is the barline', 'the time signature says how many beats are in each bar', 'no musical difference between the two words',
    ],
    `There is NO musical difference — "bar" and "measure" are two names for the SAME thing: a single segment of music that contains a fixed number of beats, set by the time signature (in 4/4, four quarter-note beats per bar/measure).

The only difference is dialect and habit:
- "BAR" is the standard term in British English and is also widely used everywhere, especially by pop, rock, jazz, and folk musicians ("an eight-bar phrase", "the 12-bar blues").
- "MEASURE" is the standard term in American English, especially in formal music-theory and classical-education contexts.

The vertical line on the staff that marks where one bar/measure ends and the next begins is called the BARLINE (or "bar line"). A double barline marks a section end; a final barline (thin + thick) marks the end of the piece.

So "count off four bars" and "count off four measures" are identical instructions.`,
  ),
  k(
    'kb-gap-music-opera-vs-musical',
    'Opera vs musical (musical theatre)',
    [
      'difference between an opera and a musical', 'opera is usually sung throughout with classically trained operatic voices a full orchestra traditionally unamplified emphasis on the vocal score in the classical tradition', 'a musical alternates spoken dialogue with songs and dance numbers lighter belting or pop vocal style amplified with microphones a book script driving the story from the popular Broadway and West End tradition',
      'the line blurs sung-through musicals like Les Miserables Porgy and Bess is called an opera', 'opera singers project acoustically musical theatre performers use body mics',
    ],
    `OPERA is a work of theatre set (almost entirely) to MUSIC, in the CLASSICAL tradition. Traditionally the whole drama is SUNG — either in lyrical "arias" and ensembles or in "recitative" (sung speech) — with little or no spoken dialogue. The voices are CLASSICALLY TRAINED to project over a full orchestra WITHOUT amplification, using operatic technique. The music (the score, by the composer) is the primary artwork; librettos are often in Italian, German, French, or Russian. Think Mozart, Verdi, Puccini, Wagner.

A MUSICAL (musical theatre) comes from the POPULAR entertainment tradition (vaudeville, operetta, Tin Pan Alley, Broadway, the West End). It ALTERNATES spoken DIALOGUE (the "book") with SONGS and often DANCE numbers, and the story is carried as much by the script as by the music. Vocals use a lighter, speech-like, "belt", or pop style, and every performer wears a BODY MICROPHONE, mixed by a sound engineer. Think Rodgers and Hammerstein, Sondheim, Lloyd Webber, Lin-Manuel Miranda.

The boundary blurs: some musicals are "sung-through" with almost no dialogue (Les Miserables, Evita, Hamilton), and some works sit on the fence (Gershwin's Porgy and Bess is usually called an opera; Sweeney Todd is staged as both). But the core distinctions — vocal technique, amplification, and how much is spoken vs sung — usually tell you which you are watching.`,
  ),
  k(
    'kb-gap-music-tempo-vs-rhythm',
    'Tempo vs rhythm',
    [
      'difference between tempo and rhythm', 'tempo is the speed of the underlying beat measured in beats per minute allegro andante adagio', 'rhythm is the pattern of note durations and accents over time the arrangement of long and short sounds and silences',
      'you can play the same rhythm slow or fast changing tempo not rhythm', 'beat pulse metre are related concepts',
    ],
    `TEMPO is the SPEED of the music — how fast the underlying beat goes. It is measured in BEATS PER MINUTE (BPM), or with Italian words: largo/adagio (slow), andante (walking pace), moderato, allegro (fast), presto (very fast). A conductor or a click track sets the tempo, and a piece can speed up (accelerando) or slow down (ritardando).

RHYTHM is the PATTERN of sounds and silences in time — the arrangement of LONG and SHORT notes, where the accents fall, how the notes group against the beat (on the beat, off the beat, syncopated). Rhythm is what you clap when you clap a tune; it is a specific figure, like "dum, da-da, dum".

They are independent: you can play the EXACT SAME rhythm slowly or quickly — that changes the tempo, not the rhythm. And at one fixed tempo you can play many different rhythms. Related terms: the BEAT (or pulse) is the steady underlying tick; METRE is how beats group (in twos, threes, fours); rhythm is everything that plays out on top of that framework.`,
  ),
  k(
    'kb-gap-music-legato-vs-staccato',
    'Legato vs staccato',
    [
      'difference between legato and staccato', 'legato means notes played smoothly and connected with no gaps between them slurred', 'staccato means notes played short and detached each cut off well before the next with silence between marked by a dot above or below the note',
      'legato is smooth and lyrical staccato is crisp and pointed', 'they are articulation markings',
    ],
    `Both are ARTICULATION instructions — they tell a player HOW to connect or separate consecutive notes.

LEGATO ("tied together" in Italian) means play the notes SMOOTHLY and CONNECTED, with NO audible gap between one note and the next — the sound is continuous, flowing, and lyrical, as if in a single breath or bow stroke. On a score it is often shown by a curved SLUR line over the passage. It suits singing melodies and expressive lines.

STACCATO ("detached") means play each note SHORT and SEPARATED — cut it off well before its full written length, leaving a clear SILENCE before the next note, so the notes sound crisp, light, and pointed. It is marked by a DOT directly above or below the note head. (An even shorter version, staccatissimo, uses a small wedge.)

Between them sit other articulations: portato/mezzo-staccato (slightly separated), tenuto (held for full value, gently stressed), and marcato/accent (attacked hard). Legato and staccato are the two extremes: fully joined vs fully detached.`,
  ),
  k(
    'kb-gap-music-acoustic-vs-electric-guitar',
    'Acoustic vs electric guitar',
    [
      'difference between an acoustic and an electric guitar', 'an acoustic guitar has a hollow resonating body that amplifies the string vibration by itself loud enough unplugged warm natural tone heavier strings', 'an electric guitar has a solid or semi-hollow body almost no acoustic volume magnetic pickups convert the string vibration to an electrical signal sent to an amplifier and effects thinner neck lighter strings sustain and distortion',
      'acoustic is self-contained electric needs an amp', 'steel-string acoustic classical nylon-string dreadnought',
    ],
    `An ACOUSTIC guitar produces its sound MECHANICALLY. The strings vibrate, that vibration is transmitted through the bridge to a large HOLLOW wooden BODY, and the body and the air inside it resonate and radiate the sound out of the soundhole — loud enough to play with no electronics at all. The tone is warm and natural, it uses heavier-gauge strings (steel-string, or nylon on a classical), and it has a wider neck and higher action. It is a complete instrument on its own.

An ELECTRIC guitar produces almost NO acoustic volume — its body is SOLID (or semi-hollow). Instead, magnetic PICKUPS under the strings sense the string vibration and turn it into a small ELECTRICAL SIGNAL, which is sent through a cable to an AMPLIFIER and speaker, and usually shaped by effects pedals (distortion, reverb, delay, wah). This lets it produce huge volume, long sustain, feedback, and heavy distortion, and gives a vast range of tones from the amp and pickups. It has a thinner neck, lighter strings, and lower action, making fast playing and string bending easier.

Short version: an acoustic amplifies itself with a wooden box; an electric makes a signal that needs an amp, and trades natural tone for volume, sustain, and effects.`,
  ),
  k(
    'kb-gap-music-producer-vs-composer',
    'Producer vs composer',
    [
      'difference between a producer and a composer', 'a composer writes the music itself the melodies harmonies rhythms and structure traditionally notated in a score', 'a record producer oversees the making of a recording choosing and arranging material guiding performances selecting sounds and takes directing the mix shaping the overall sonic and commercial vision',
      'in modern pop hip-hop and electronic music the producer often also makes the beat blurring into composer', 'composer writes the notes producer shapes the record',
    ],
    `A COMPOSER creates the MUSIC ITSELF — the melodies, harmonies, rhythms, form, and (in orchestral work) the orchestration. Traditionally this is fixed in a written SCORE that performers read. The composer's work exists independently of any particular recording; a symphony can be performed by many orchestras. Film and game composers write the score to picture.

A (RECORD) PRODUCER oversees the making of a RECORDING. Their job spans: helping choose and arrange the songs, deciding the overall sound and direction, guiding the artists' performances, picking the best takes, choosing instruments, tones, and studio techniques, directing the recording engineer, and overseeing the mix and master. A great producer is why two versions of the same song can feel completely different (think George Martin with the Beatles, Rick Rubin, Quincy Jones, Dr. Dre).

The two roles OVERLAP heavily in modern pop, hip-hop, and electronic music, where "the producer" typically BUILDS the instrumental/beat from scratch — which is composing — and then also records the vocalist and shapes the track. But the classic distinction holds: the composer writes the notes; the producer shapes the record that those notes become.`,
  ),
  k(
    'kb-gap-music-reverb-vs-delay',
    'Reverb vs delay',
    [
      'difference between reverb and delay', 'delay echo repeats the sound as one or more distinct separated copies at a set time interval which can repeat and fade with feedback you hear discrete repeats', 'reverb simulates the dense wash of hundreds of overlapping reflections in a physical space room hall plate you do not hear individual echoes just a decaying tail that places the sound in a room',
      'delay is countable repeats reverb is a smeared ambient tail', 'both are time-based effects', 'slapback delay plate reverb',
    ],
    `Both are TIME-BASED effects that add copies of a sound after the original, but they differ in how those copies are spaced.

DELAY (also "echo") takes the input signal and plays it back again after a set TIME GAP — say 90 ms, or 375 ms synced to the tempo. You hear the repeat as a DISTINCT, SEPARATE copy. With "feedback" the repeat is fed back in, giving a series of echoes that fade out (echo... echo... echo). Types: a very short "slapback" (50-120 ms, classic on rockabilly vocals), rhythmic tempo-synced delays, ping-pong (bouncing left-right), tape and analog delays with degrading repeats. The key perception: you can COUNT the repeats.

REVERB simulates the sound of a PHYSICAL SPACE. In a real room, a sound bounces off every wall, floor, and object, producing HUNDREDS of reflections arriving so close together that the ear cannot separate them — it hears a single dense, smooth DECAYING TAIL. Reverb recreates that: an early-reflection cluster followed by a diffuse wash that fades over a chosen "decay time". Types model rooms, halls, chambers, plates, and springs. The key perception: you can't pick out individual echoes, you just hear the sound sitting "in a space".

Short version: delay = distinct, countable repeats; reverb = a blurred ambient tail that suggests a room.`,
  ),
  k(
    'kb-gap-music-conductor-vs-bandleader',
    'Conductor vs bandleader',
    [
      'difference between a conductor and a bandleader', 'a conductor leads an orchestra choir or concert band standing in front with a baton using gestures to set tempo dynamics cues and interpretation of a written score usually not playing an instrument during the performance', 'a bandleader leads a smaller jazz or popular ensemble usually plays in it often writes or arranges the material counts the band in calls tunes and solos leads by example and cues',
      'Herbert von Karajan versus Duke Ellington at the piano', 'classical concert tradition versus jazz and popular tradition',
    ],
    `A CONDUCTOR leads a large CLASSICAL ensemble — a symphony orchestra, a choir, an opera, a concert band. They stand in front, facing the players, and use a BATON and their hands and face to communicate in real time: setting and steadying the TEMPO, shaping DYNAMICS and phrasing, cueing entries, balancing sections, and above all imposing an INTERPRETATION of a fully written SCORE that the conductor has studied in advance. The conductor normally does NOT play an instrument during the performance; their instrument is the orchestra. (Famous examples: Karajan, Bernstein, Dudamel, Rattle.)

A BANDLEADER leads a smaller ensemble in the JAZZ or POPULAR tradition — a big band, a jazz combo, a dance band, a backing band. The bandleader usually PLAYS in the group (Duke Ellington at the piano, Count Basie, a guitarist fronting a rock band), often WROTE or ARRANGED the material, counts the band in, calls which tunes to play and who solos when, and steers the performance more by playing, nodding, and short cues than by continuous beat-giving. The role is part musician, part director, part bandleader-as-brand.

Short version: a conductor directs a large score-based classical group from the podium without playing; a bandleader runs a smaller jazz/pop group usually from within it, often as its chief writer and MC.`,
  ),
  k(
    'kb-gap-music-classical-vs-baroque',
    'Classical era vs Baroque music',
    [
      'difference between classical and baroque music', 'Baroque roughly 1600 to 1750 Bach Handel Vivaldi dense polyphony and counterpoint a continuous basso continuo bassline terraced dynamics ornate melodies harpsichord forms like the fugue concerto grosso and suite', 'Classical era roughly 1750 to 1820 Haydn Mozart early Beethoven clearer homophonic textures melody plus accompaniment balanced symmetrical phrases gradual crescendo and diminuendo the piano replaces the harpsichord sonata form the symphony and string quartet',
      'classical is also used loosely for all Western art music', 'baroque is elaborate and layered classical is elegant and balanced',
    ],
    `"Classical music" is used two ways: loosely for ALL Western art music, and precisely for the CLASSICAL ERA that FOLLOWED the Baroque. This contrast is about the two eras.

BAROQUE (roughly 1600-1750; Bach, Handel, Vivaldi, Purcell, Corelli): dense and elaborate. Texture is POLYPHONIC — several independent melodic lines (COUNTERPOINT) woven together, driven along by a continuous bass line with chords filled in on harpsichord or organ (the BASSO CONTINUO). Dynamics are "TERRACED" — sudden shifts between loud and soft, not gradual swells. Melodies are ornate and highly decorated. Key forms: the fugue, the concerto grosso, the dance suite, the oratorio, early opera. The harpsichord is the keyboard.

CLASSICAL ERA (roughly 1750-1820; Haydn, Mozart, Gluck, early Beethoven): clearer and more elegant. Texture is mostly HOMOPHONIC — a single clear MELODY with a supporting accompaniment. Phrases are balanced and SYMMETRICAL (a four-bar question answered by a four-bar answer). Dynamics become GRADUAL — crescendo and diminuendo. The PIANO replaces the harpsichord (it can play soft and loud). SONATA FORM becomes the organising principle, and the SYMPHONY, the STRING QUARTET, and the solo CONCERTO take their standard shapes.

Short version: Baroque = layered counterpoint, continuo, terraced dynamics, harpsichord, ornate; Classical = clear melody-and-accompaniment, balanced phrases, gradual dynamics, piano, elegant.`,
  ),
  k(
    'kb-gap-music-piano-vs-keyboard',
    'Piano vs keyboard',
    [
      'difference between a piano and a keyboard', 'a piano is a large acoustic instrument with hammers striking strings 88 weighted keys grand or upright', 'keyboard is a general term for any piano-style instrument especially portable electronic ones digital piano stage piano synth arranger home keyboard',
      'a digital piano imitates one acoustic piano with fully weighted keys', 'an arranger or home keyboard has many sounds auto-accompaniment lighter unweighted keys', 'a synthesizer generates and shapes sounds',
    ],
    `A PIANO, strictly, is a specific ACOUSTIC instrument: a large wooden frame with 88 keys, where pressing a key throws a felt HAMMER at a set of steel STRINGS, and the vibration is amplified by a soundboard. It comes as a GRAND (horizontal strings) or an UPRIGHT (vertical). The keys are HEAVY and "weighted" by the mechanical action, and dynamics come entirely from how hard you strike. It plays one sound: piano.

"KEYBOARD" is a GENERAL term for any instrument you play with a piano-style keyboard, and in casual use it usually means a portable ELECTRONIC one. That family includes:
- DIGITAL PIANO / STAGE PIANO: designed to imitate ONE acoustic piano as closely as possible, with fully WEIGHTED "hammer-action" keys and high-quality piano samples; a serious substitute for an acoustic.
- ARRANGER / HOME KEYBOARD (Yamaha PSR, Casio): hundreds of sampled SOUNDS, built-in drum patterns and AUTO-ACCOMPANIMENT, usually LIGHTER unweighted or semi-weighted keys, often fewer than 88 keys.
- SYNTHESIZER: generates and shapes sounds electronically (oscillators, filters, envelopes) rather than just playing samples.

So every digital piano is a keyboard, but not every keyboard is a piano — and an acoustic piano is not a "keyboard" in the electronic sense at all.`,
  ),
  k(
    'kb-gap-music-compression-vs-limiting',
    'Compression vs limiting',
    [
      'difference between compression and limiting', 'compression reduces dynamic range by turning down signal that goes above a threshold by a set ratio like 3 to 1 or 4 to 1 making loud and soft parts closer in level', 'limiting is compression with a very high ratio 10 to 1 or infinity to 1 acting as a ceiling the signal cannot exceed',
      'a limiter turns peaks down transparently it does not clip clipping is distortion', 'brick-wall limiter for loudness maximisation makeup gain', 'both are dynamics processors',
    ],
    `Both are DYNAMICS processors that reduce the difference between the loudest and quietest parts of a signal; the difference is HOW MUCH and HOW HARD.

A COMPRESSOR turns DOWN any part of the signal that rises ABOVE a set THRESHOLD, by a chosen RATIO. A 3:1 ratio means that for every 3 dB the input goes over the threshold, the output only rises 1 dB. This gently evens out a performance — a vocal's loud words don't jump out, a bass sits steadily — and you then add "makeup gain" to bring the whole thing back up, so quiet and loud are closer together and the average level is higher. Controls: threshold, ratio, attack, release, knee.

A LIMITER is essentially a compressor with a VERY HIGH ratio (10:1, 20:1, or "infinity:1"), a fast attack, and a threshold set as a hard CEILING. Its job is to guarantee the signal NEVER EXCEEDS a set level — useful to catch stray peaks, and, as a "brick-wall limiter", to push a whole mix up to maximum loudness for release without going over 0 dBFS.

Important: a limiter turns the peaks DOWN cleanly and transparently — it does NOT clip. CLIPPING is when a signal is simply chopped off at the ceiling, which creates harsh distortion; that is a fault (or a deliberate distortion effect), not what a limiter does.`,
  ),
];
