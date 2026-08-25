import { KnowledgeItem } from '../../types';

export const MUSIC_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-music-genres-overview',
    title: 'Major Music Genres and What Defines Them',
    category: 'music',
    keywords: [
      'music genres', 'hip hop', 'rap', 'edm', 'electronic dance music', 'rock', 'pop music', 'r&b', 'country music',
      'metal', 'jazz', 'what is trap music', 'what is drill music', 'music genres explained',
    ],
    content: `Hip hop/rap is built on rhythmic, rhymed spoken vocals (bars) over a beat — sub-genres include trap (heavy 808 bass, hi-hat rolls, originating in the South, now the dominant mainstream rap sound), drill (dark, aggressive, originated in Chicago, evolved separately in UK/Brooklyn scenes), and boom bap (the older, sample-heavy 90s East Coast sound). EDM (electronic dance music) is an umbrella term covering house (steady 4-on-the-floor beat, born in 1980s Chicago), techno (harder, more mechanical, born in Detroit), dubstep (heavy bass "drops," half-time rhythm), and trance (melodic, build-and-release structure) — all mixed live by DJs and central to festival culture (Tomorrowland, EDC, Ultra). Pop prioritizes broad accessibility, strong hooks, and verse-chorus structure over genre purity, and constantly absorbs whatever's trending in other genres. R&B (rhythm and blues) centers on vocal performance, groove, and often themes of romance/relationships, historically rooted in Black American music and a direct ancestor of soul, funk, and modern hip hop. Rock spans an enormous range (classic rock, punk, alternative, indie) but is generally guitar/drum/bass-driven with a strong live-performance tradition. Metal pushes rock's aggression further with heavy distortion, fast/technical playing, and sub-genres from thrash to death metal to metalcore. Country blends folk and blues roots with storytelling lyrics, historically centered on Nashville, and has increasingly blended with pop and hip hop in the mainstream over the last decade. Jazz, one of the oldest American genres, is defined by improvisation and complex harmony/rhythm, and directly influenced nearly every genre that came after it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-music-streaming-industry',
    title: 'How Streaming Changed the Music Industry',
    category: 'music',
    keywords: [
      'music streaming', 'spotify', 'apple music', 'how do artists get paid on spotify', 'streaming royalties',
      'album sales', 'music industry', 'billboard charts', 'how streaming pays artists',
    ],
    content: `Streaming (Spotify, Apple Music, YouTube Music) replaced buying individual songs/albums as the dominant way people consume music, and fundamentally changed how artists make money. Streaming services pay out from a shared revenue pool divided by total streams across the platform (a "pro-rata" model) — payouts per stream are extremely small (commonly cited estimates put Spotify around $0.003-0.005 per stream, though it varies and Spotify doesn't publish an exact fixed rate), and that money is split further between the artist, songwriter(s), producer, and label/distributor before the artist sees any of it, meaning an artist typically needs millions of streams to earn what one substantial physical album sale used to. This pushed most artists' real income toward touring, merchandise, and sync licensing (getting a song placed in a TV show, movie, or ad) rather than recorded music sales alone. It also changed how music is MADE — shorter songs and hooks in the first few seconds became more common, partly because streaming platforms count a stream after ~30 seconds of listening and skip rates matter for algorithmic promotion. Billboard chart rankings (like the Hot 100) now incorporate streaming numbers alongside traditional sales and radio airplay, which is part of why viral TikTok songs can suddenly chart even without a traditional single release. Independent artists distributing directly through services like DistroKid or TuneCore (rather than needing a traditional record label) is far more viable now than in the pre-streaming era, though building an audience without label marketing budget remains the hard part.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-music-theory-basics',
    title: 'Music Theory Basics: Notes, Scales, Chords, and Rhythm',
    category: 'music',
    keywords: [
      'music theory', 'what is a scale', 'major scale', 'minor scale', 'chord', 'what is a chord', 'time signature',
      'bpm', 'key signature', 'major vs minor', 'music theory for beginners',
    ],
    content: `Music is built from 12 notes per octave (in Western music) — the white and black keys on a piano, repeating every 12 semitones. A scale is a specific sequence of notes within an octave; the major scale (the "happy"-sounding default) follows the pattern whole-whole-half-whole-whole-whole-half step, while the natural minor scale (generally "sadder"/moodier-sounding) uses a different step pattern starting from the 6th note of its relative major scale. A chord is 3+ notes played together — the most basic is a triad (root, third, fifth); major chords (built with a major third) sound bright/resolved, minor chords (minor third) sound darker/more tense, and chord progressions (sequences of chords, like the extremely common I-V-vi-IV pattern used in countless pop songs) create a song's emotional arc. A key signature tells you which scale/set of notes a piece is built around, so "the song is in C major" means it's centered on and mostly uses the notes of the C major scale. Rhythm is organized by time signature (like 4/4, the most common — 4 beats per measure, quarter note gets one beat) and tempo, measured in BPM (beats per minute) — 60-90 BPM feels slow/relaxed, 120-140 is typical dance/pop tempo, and 160+ starts feeling fast/energetic (common in drum and bass, punk, some trap). Melody is the sequence of single notes a listener hums along to; harmony is the surrounding chords/notes that support and color it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-music-influential-artists-eras',
    title: 'Influential Music Eras and Artists That Shaped Modern Music',
    category: 'music',
    keywords: [
      'the beatles', 'michael jackson', 'motown', 'grunge', 'nirvana', 'hip hop history', 'disco', 'music history',
      'most influential musicians', 'music eras',
    ],
    content: `Motown Records (Detroit, 1960s) built a signature soul/pop sound (The Supremes, Marvin Gaye, Stevie Wonder) and was hugely important both musically and culturally as a Black-owned label achieving mainstream crossover success during the civil rights era. The Beatles (1960s) are widely credited with transforming what a pop album could be — moving from singles-focused releases to cohesive full albums as artistic statements (Sgt. Pepper's especially), and remain one of the best-selling acts in history. Disco (mid-late 1970s) brought dance-floor-focused, four-on-the-floor rhythms into the mainstream before a backlash ("disco demolition") led to its decline, though its DNA lives on directly in house music and modern pop production. Michael Jackson (1980s peak, especially Thriller, still the best-selling album of all time) fused pop, R&B, funk, and rock with genre-defining music videos that helped establish MTV as a cultural force. Hip hop emerged from 1970s South Bronx block parties (DJ Kool Herc is widely credited as a founding figure) and grew from a regional scene into the best-selling genre in the US by the 2010s, reshaping pop, fashion, and slang far beyond music itself. Grunge (early 1990s Seattle — Nirvana, Pearl Jam, Soundgarden) was a raw, distortion-heavy reaction against the polished pop-metal that dominated the 1980s, and Nirvana's Nevermind (1991) is often cited as the moment alternative rock broke into the mainstream. Streaming-era music (2010s-present) is defined less by unified "eras" and more by genre-blending and rapid trend cycles often driven by short-form video platforms like TikTok.`,
    createdAt: Date.now(),
  },
];
