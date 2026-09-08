import { KnowledgeItem } from '../../types';

// Batch 57 (music instruments & production) gap-fills. Live misses on nexus-4b:
// "what is a synthesizer" -> "shaping the 500-2,000 Hz range" (synths cover the
// whole spectrum); "what is autotune" -> Antares release date + a Kanye West
// discography web dump; "what is a concerto" -> "three parts: exposition,
// development, recapitulation" (that's sonata form) and "so did Bach" for the
// Classical period; "violin vs viola" -> "same setup just different notes";
// "what is a symphony" -> "that huge balanced structure thing."
export const MUSIC_INSTRUMENTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-synthesizer',
    title: 'What a Synthesizer Is',
    category: 'Music',
    keywords: [
      'what is a synthesizer', 'how does a synth make sound', 'oscillator filter envelope synth', 'subtractive synthesis',
      'analog vs digital synthesizer', 'what is an LFO', 'moog dx7 synthesizer', 'attack decay sustain release',
    ],
    content: `A synthesizer is an electronic instrument that creates sound from scratch rather than from a vibrating string or reed. The classic signal chain: an OSCILLATOR generates a raw electrical waveform — a sine wave (pure tone), sawtooth (bright and buzzy), square/pulse (hollow), or noise — at a chosen pitch; a FILTER then removes or emphasises frequencies (the "cutoff" and "resonance" controls are what make a synth "sweep" and "squelch"); an AMPLIFIER shaped by an ENVELOPE controls how the volume changes over the life of a note (Attack, Decay, Sustain, Release — a slow attack gives a pad, an instant attack a stab); and an LFO (low-frequency oscillator) adds movement like vibrato or a dubstep "wobble." Synths cover the entire audible spectrum, from sub-bass to piercing leads. Main methods: subtractive (carve down a rich waveform — the analog Moog approach), FM (Yamaha DX7, metallic bells and basses), wavetable, additive, and sample-based. Modern synths can be hardware, modular (patch-cable) rigs, or software plug-ins.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-autotune',
    title: 'What Auto-Tune Is',
    category: 'Music',
    keywords: [
      'what is autotune', 'how does autotune work', 'pitch correction software', 'the cher effect t-pain effect',
      'is autotune cheating', 'auto-tune retune speed', 'why does autotune sound robotic',
    ],
    content: `Auto-Tune is pitch-correction software (introduced by Antares in 1997) that shifts a recorded or live vocal so each note lands exactly on the nearest correct pitch in a chosen scale. Used gently and slowly, it's an invisible studio tool that tidies up small tuning slips — most commercial vocals today have some. Used aggressively — with the "retune speed" set to instant, so the voice snaps between pitches with no natural glide — it produces the deliberate robotic, glitchy vocal sound heard on Cher's "Believe" (1998), which named the "Cher effect," and later made a signature style by T-Pain, Kanye West, Travis Scott and much of modern hip-hop and pop. It's controversial: critics say it lets people who can't sing in tune sound professional and homogenises pop, while defenders point out it's just another instrument and effect. Melodyne is a more advanced competitor that can also retune individual notes inside a chord.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-concerto',
    title: 'What a Concerto Is',
    category: 'Music',
    keywords: [
      'what is a concerto', 'concerto vs symphony', 'what is a cadenza', 'how many movements in a concerto',
      'concerto grosso vs solo concerto', 'famous piano concertos', 'what does the soloist do in a concerto',
    ],
    content: `A concerto is a large piece for a SOLO instrument (or small group) played against a full orchestra, designed to show off both the soloist's virtuosity and the interplay — a kind of musical dialogue or friendly contest — between the one and the many. The standard solo concerto has THREE MOVEMENTS: fast, slow (lyrical), fast (often a lively rondo). (This is not the same as "exposition–development–recapitulation," which is sonata form — the internal structure of a single movement, which the first movement of a concerto usually follows.) A hallmark is the CADENZA, an unaccompanied showpiece near the end of a movement where the orchestra drops out and the soloist dazzles alone, historically improvised. The BAROQUE era favoured the "concerto grosso" (a small group of soloists vs the orchestra — Bach's Brandenburg Concertos, Vivaldi's Four Seasons); the CLASSICAL and ROMANTIC eras favoured the solo concerto — Mozart wrote 27 piano concertos, and Beethoven, Brahms, Tchaikovsky, Rachmaninoff and others wrote the famous warhorses.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-violin-vs-viola',
    title: 'Violin vs Viola',
    category: 'Music',
    keywords: [
      'what is the difference between a violin and a viola', 'violin vs viola', 'is a viola bigger than a violin',
      'how is a viola tuned', 'alto clef viola', 'why does a viola sound darker', 'viola in a string quartet',
    ],
    content: `The viola is the violin's larger, lower-pitched sibling. Size: a full viola body is about 39–43 cm long versus a violin's 35–36 cm (and violas come in a range of sizes because there's no single "correct" one). Tuning: both have four strings tuned in fifths, but the viola sits a perfect fifth below the violin — the viola is C–G–D–A, the violin G–D–A–E — so the viola has no bright top E string and gains a deep low C. Sound: because it's bigger and lower, the viola has a warmer, darker, more mellow and slightly nasal tone, and less of the violin's brilliance and projection. Notation: violinists read treble clef; violists read the alto clef (with treble clef for very high passages) — one of very few instruments to use it. Role: in a string quartet or orchestra the violins carry the top melody lines while the viola plays the inner harmony, the "filling" of the chord — musically important but less flashy, which is the basis of the many affectionate viola jokes among musicians.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-symphony',
    title: 'What a Symphony Is',
    category: 'Music',
    keywords: [
      'what is a symphony', 'how many movements in a symphony', 'who is the father of the symphony', 'symphony structure',
      'symphony vs concerto vs sonata', 'beethoven symphonies', 'what instruments are in a symphony orchestra',
    ],
    content: `A symphony is an extended musical work for full orchestra, usually the most ambitious kind of purely instrumental piece a composer writes. The Classical model, established by Joseph Haydn ("the father of the symphony," who wrote about 104) and Mozart, has FOUR MOVEMENTS: (1) a fast opening in "sonata form," often with a slow introduction; (2) a slow, songful movement; (3) a dance movement — a stately minuet, or, after Beethoven, a faster, wittier scherzo; (4) a fast, brilliant finale. Beethoven expanded the form dramatically in scale, emotional range and orchestra size — his Third ("Eroica") and Fifth are landmarks, and his Ninth added a choir singing Schiller's "Ode to Joy" in the finale. Romantic composers (Brahms, Dvořák, Tchaikovsky, Bruckner, Mahler) stretched symphonies to an hour or more with huge orchestras. A symphony orchestra has four families: strings (violins, violas, cellos, double basses), woodwinds (flute, oboe, clarinet, bassoon), brass (horn, trumpet, trombone, tuba) and percussion, led by a conductor.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jazz-improvisation',
    title: 'What Jazz Improvisation Is Based On',
    category: 'Music',
    keywords: [
      'what is jazz improvisation based on', 'how do jazz musicians improvise', 'what are the changes in jazz',
      'chord scale relationship jazz', 'trading fours', 'is jazz improvisation random', 'what do you solo over in jazz',
    ],
    content: `Jazz improvisation is spontaneous composition within a shared framework — it's not random. That framework is usually a tune's HARMONY: the chord progression (jazz musicians call it "the changes") that repeats each chorus. Over each chord, the soloist chooses notes from the scales, arpeggios and chord tones that fit that chord, aiming for the "guide tones" (the 3rd and 7th) on strong beats, connecting chords smoothly, and resolving tension into consonance — the ii–V–I progression is the backbone. On top of that they draw on the tune's original melody, common melodic patterns ("licks"), rhythmic phrasing and swing feel, the blues scale and "blue notes," call-and-response with the rhythm section, and deliberate dissonance for colour. It's highly interactive: the pianist and bassist react to the soloist in real time, and players often "trade fours" (alternating four-bar solos, sometimes with the drummer). Deep knowledge of theory, thousands of hours of practice, and a large vocabulary of transcribed phrases are what make free-sounding improvisation possible.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-bassline',
    title: 'What a Bassline Is in a Song',
    category: 'Music',
    keywords: [
      'what is a bassline in a song', 'what does a bass line do', 'what instrument plays the bassline', 'walking bass',
      'why is the bass important in music', 'root notes bassline', 'funk bassline vs rock bassline',
    ],
    content: `A bassline is the lowest melodic part of a song — played by the electric or upright bass, a synth bass, a tuba, or a keyboard's left hand. It does two jobs at once. Harmonically, it anchors the chords: usually by playing their root notes, so your ear knows what chord it's hearing and how the progression moves (a bassline that walks down while the top stays still completely changes the feel). Rhythmically, it locks in with the kick drum to create the groove — the pocket that makes a song feel good to move to. Styles differ sharply: a rock bassline often drives steady eighth notes on the root; a jazz "walking bass" plays a smooth quarter-note line stepping through the chord changes; a funk bassline is highly syncopated and percussive, often the main hook (James Brown, Bootsy Collins); reggae and dub push the bass forward as the dominant instrument; house and hip-hop lean on deep sustained sub-bass. It sits so low that people often "feel" it more than consciously hear it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-drum-machine',
    title: 'What a Drum Machine Is',
    category: 'Music',
    keywords: [
      'what is a drum machine', 'roland tr-808 tr-909', 'how does a drum machine work', 'step sequencer drums',
      'sampled vs synthesized drum machine', 'why is the 808 so famous', 'drum machine vs live drummer',
    ],
    content: `A drum machine is an electronic instrument that generates drum and percussion sounds and lets you program them into a repeating rhythm pattern. The sounds are either SYNTHESISED electronically (the Roland TR-808's booming "boom" kick and hissy hi-hats, or the TR-909's punchier hits) or SAMPLED from real drums (the Linn LM-1, the Akai MPC series). You build a beat on a "step sequencer" — a row of 16 buttons per bar where each lit button triggers a hit — or by finger-drumming on velocity-sensitive pads, then loop and chain the patterns into a song. Drum machines were transformative: cheaper than hiring a drummer, perfectly consistent, and capable of sounds no real kit can make. The 808 in particular defined the sound of hip-hop, trap, electro, Miami bass and much of modern pop; the 909 defined house and techno. Modern DAWs include software drum machines, and hardware ones like the MPC remain studio standards.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dominant-chord',
    title: 'What a Dominant Chord Is',
    category: 'Music',
    keywords: [
      'what is a dominant chord in music', 'what is the v chord', 'dominant seventh chord', 'why does the v chord want to resolve',
      'what is a perfect cadence', 'the tritone in a dominant chord', 'dominant to tonic resolution',
    ],
    content: `The dominant chord is the chord built on the FIFTH note (degree) of a key's scale — labelled V. In the key of C major, the fifth note is G, so the dominant chord is G major (G–B–D), and it's very often played as a dominant SEVENTH chord, G7 (G–B–D–F). The dominant chord is the main engine of tension in Western tonal music: it feels unstable and strongly "wants" to move to the tonic chord (I) — G7 → C. The reason is the notes B and F inside G7, which form a "tritone" (a highly dissonant interval); B pulls up a half-step to C and F pulls down a half-step to E, and both are satisfied by resolving to the C major chord. That V → I move is the "perfect cadence," the musical equivalent of a full stop, and it ends most classical phrases and countless pop songs. Delaying or substituting the dominant (secondary dominants, the ii–V–I of jazz, deceptive cadences to vi) is a big part of how composers create and release expectation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-orchestra-vs-band',
    title: 'Orchestra vs Band',
    category: 'Music',
    keywords: [
      'what is the difference between an orchestra and a band', 'orchestra vs band', 'what is a wind band', 'what is a big band',
      'why does an orchestra have a conductor', 'how big is an orchestra', 'symphony orchestra instruments',
    ],
    content: `An ORCHESTRA is a large ensemble — a full "symphony orchestra" has 60 to 100+ players — built around the string section (many violins, violas, cellos, double basses) plus pairs or more of woodwinds, brass and percussion, led by a conductor and reading a written score. It mostly plays classical, opera, ballet and film music. "BAND" is a much broader word for an ensemble without a string section (or with only bass guitar). A concert/wind band or "symphonic band" is like an orchestra with the strings removed — brass, woodwinds and percussion, common in schools. A marching band is a wind band that plays while moving, often at sporting events. A jazz "big band" is ~17 players in sections of saxes, trumpets, trombones plus a rhythm section (piano, bass, drums, guitar). A rock, pop or jazz "combo" band is small — typically 3 to 6 players covering guitars, bass, drums, keyboards and vocals — and often works from chord charts or by ear rather than full notation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-music-textures',
    title: 'Polyphony vs Homophony (and Monophony)',
    category: 'Music',
    keywords: [
      'what is polyphony versus homophony', 'polyphony vs homophony', 'what is monophony', 'musical texture types',
      'counterpoint vs chords', 'what texture is most pop music', 'bach polyphony',
    ],
    content: `These describe a piece's "texture" — how many musical lines are sounding and how they relate. MONOPHONY: a single melodic line with no accompaniment (one person singing alone, Gregorian chant, a solo flute). HOMOPHONY: one clear main melody supported by accompanying chords that move roughly together in rhythm (a singer with a strumming guitar, a hymn, most pop, rock and folk songs, and most Classical-era music). POLYPHONY (also "counterpoint"): two or more independent melodic lines of roughly equal importance sounding at once, weaving around each other — a round like "Row, Row, Row Your Boat," a Renaissance choral motet, and above all a Bach fugue, where several voices each carry the same subject in overlapping entries. A related term, HETEROPHONY, is when performers play the same melody but with slightly different embellishments (common in folk and non-Western traditions). Western music shifted from mostly polyphonic (Renaissance/Baroque) to mostly homophonic (Classical onward), though composers mix textures within a single piece for contrast.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sampling-music',
    title: 'What Sampling Is in Music Production',
    category: 'Music',
    keywords: [
      'what is sampling in music production', 'how does sampling work', 'famous samples hip hop', 'the amen break',
      'do you have to clear a sample', 'sampling vs interpolation', 'what is a sampler',
    ],
    content: `Sampling is taking a piece of an existing sound recording — a drum break, a horn stab, a vocal phrase, a bassline, even a single note — and reusing it as material in a new track, usually chopped up, looped, pitched, filtered and layered. It's done with a "sampler" (hardware like the Akai MPC, or software in any DAW). Sampling is foundational to hip-hop (which began with DJs looping the "breaks" of funk and soul records) and to house, drum-and-bass, trip-hop and much of modern pop; the "Amen break" (a 6-second 1969 drum solo) is the most-sampled recording ever. Legally, using a recognisable sample without permission is copyright infringement of both the composition and the master recording, so commercial releases must "clear" samples — get licences and pay royalties — which can be expensive; some artists instead do an "interpolation," re-recording the borrowed part themselves to avoid needing the master owner's clearance. Cleared or transformed sampling has produced landmark records; uncleared sampling has produced landmark lawsuits.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-a-cappella',
    title: 'What A Cappella Is',
    category: 'Music',
    keywords: [
      'what is a cappella', 'what does a cappella mean', 'singing without instruments', 'barbershop doo wop a cappella',
      'vocal percussion beatboxing', 'pentatonix a cappella', 'a cappella vs choir',
    ],
    content: `A cappella (Italian for "in the manner of the chapel") means music performed by voices alone, with no instrumental accompaniment. The term originally distinguished older unaccompanied choral styles (Renaissance church polyphony) from later music with instruments. It covers a wide range: sacred choral music, folk singing traditions, barbershop quartets (four-part close harmony), 1950s doo-wop, gospel, and collegiate a cappella groups. Modern a cappella (groups like Pentatonix, The Bobs, or the ones in "Pitch Perfect") often adds "vocal percussion" or beatboxing to supply a drum kit, and one singer holds a sustained bass line, so a handful of voices can imitate a full band — sometimes with subtle electronic help (looping, pitch effects) in performance. "A cappella" describes HOW a piece is performed, not a genre, so almost any song can be arranged and sung a cappella.`,
    createdAt: Date.now(),
  },
];
