import { KnowledgeItem } from '../../types';

// Batch 101 (music production / audio engineering). Weak area on nexus-4b:
// "limiter in mastering" was answered about BDSM limits; "mono vs stereo" and
// "condenser vs dynamic mic" and "bus/subgroup" were raw web dumps; "clipping"
// was answered about photography (crushed shadows / blown highlights);
// "Nyquist frequency" was stated backwards; "bit depth" was answered as a
// generic definition of a bit; "low-pass vs high-pass filter" contradicted
// itself. EQ, compression, mixing/mastering, panning, quantization were OK.
export const MUSIC_PRODUCTION_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-limiter-mastering',
    title: 'What a Limiter Does (Mastering)',
    category: 'Music Production',
    keywords: [
      'what does a limiter do in mastering', 'limiter compressor with a very high ratio and fast attack stops a signal exceeding a ceiling', 'brickwall limiter raises overall loudness while preventing clipping',
      'true peak limiting inter-sample peaks', 'limiter at the end of the mastering chain output ceiling minus 1 dbtp', 'limiter is not bdsm limits',
    ],
    content: `A limiter is a dynamics processor — essentially a compressor with a very high ratio (10:1 up to infinity:1) and a very fast attack — that prevents an audio signal from ever exceeding a set ceiling. In mastering it sits at the end of the processing chain: the engineer pushes the level into the limiter to raise the track's overall perceived loudness, and the limiter catches every peak that would otherwise go past 0 dBFS and clip, holding the output to a ceiling (commonly -1 dBTP). A "brickwall" limiter guarantees nothing crosses that line. A "true peak" limiter also accounts for inter-sample peaks — levels that appear between samples after digital-to-analog conversion — which is why mastering ceilings are set slightly below 0. Overusing a limiter squashes transients and causes distortion and listener fatigue. (This is an audio term and has nothing to do with negotiated limits in BDSM.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mono-vs-stereo',
    title: 'Mono vs Stereo',
    category: 'Music Production',
    keywords: [
      'what is the difference between mono and stereo', 'mono one channel same signal to all speakers no spatial information', 'stereo two channels left and right width and positioning via panning',
      'mono compatibility check club systems phone speakers', 'stereo image phase issues when summed to mono', 'bass often kept mono for a tight low end',
    ],
    content: `Mono (monophonic) audio is a single channel: the same signal is sent to every speaker, so there is no sense of left, right, or width — everything sounds like it comes from one point. Stereo (stereophonic) audio uses two channels, left and right; by sending slightly different level and timing to each, a mix can place instruments across a horizontal "stereo image" and create a sense of space and width. Stereo is standard for music listening, but mono still matters: many club and PA systems, phone speakers, and Bluetooth speakers are mono or collapse to mono, and mixers routinely check a "mono fold-down" to catch phase problems where stereo-widened or out-of-phase elements partially cancel and disappear. Low bass is often kept mono deliberately, because hard-panned or out-of-phase low frequencies waste energy and sound weak on large systems.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-clipping-audio',
    title: 'What Clipping Is (Audio)',
    category: 'Music Production',
    keywords: [
      'what is clipping in audio', 'clipping signal exceeds the maximum level the system can represent peaks flattened square wave', 'clipping adds harsh harmonic distortion',
      'digital clipping abrupt and unpleasant analog tube clipping softer sometimes deliberate', 'fix clipping by lowering gain leaving headroom', 'clipping at 0 dbfs in digital audio',
    ],
    content: `Clipping happens when an audio signal is pushed past the maximum level a device or format can represent. The tops and bottoms of the waveform that would exceed the limit are simply cut off flat, turning smooth peaks into square-edged shapes. Those squared-off edges are rich in harmonic content, so clipping adds distortion — a harsh, gritty or crunchy sound. Digital clipping (at 0 dBFS) is abrupt and generally considered ugly, so it is avoided by lowering gain and leaving headroom. Analog clipping, such as an overdriven tube preamp or guitar amp, rounds the corners more gently ("soft clipping") and is often used deliberately for warmth or aggression. This is an audio phenomenon; the same word is used in photography for lost shadow or highlight detail, which is a different thing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nyquist-sample-rate',
    title: 'Nyquist Frequency and Sample Rate',
    category: 'Music Production',
    keywords: [
      'what is the nyquist frequency and sample rate', 'sample rate number of samples per second 44100 hz cd quality', 'nyquist frequency is half the sample rate',
      'nyquist shannon sampling theorem must sample at least twice the highest frequency', 'aliasing when frequencies above nyquist fold back anti-aliasing filter', 'why 44.1 khz captures the 20 khz limit of hearing',
    ],
    content: `The sample rate is how many times per second a continuous audio waveform is measured when it is digitized — 44,100 times per second (44.1 kHz) for CD audio, 48 kHz for video, 96 or 192 kHz for high-resolution production. The Nyquist frequency is exactly half the sample rate. The Nyquist–Shannon sampling theorem says that to capture a frequency accurately you must sample at least twice as fast as that frequency, so a 44.1 kHz sample rate can faithfully represent audio up to 22.05 kHz — comfortably above the ~20 kHz upper limit of human hearing. Any frequency in the input above the Nyquist frequency does not just disappear; it "folds back" and appears as a false lower frequency called aliasing, which sounds like inharmonic digital grit. To prevent this, converters apply an anti-aliasing low-pass filter before sampling. (Note: the Nyquist frequency is half the sample rate, not twice the signal frequency.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bit-depth-audio',
    title: 'What Bit Depth Is (Digital Audio)',
    category: 'Music Production',
    keywords: [
      'what is bit depth in digital audio', 'bit depth number of bits per sample determines dynamic range and noise floor', '16 bit about 96 db dynamic range cd 24 bit about 144 db production',
      'each bit adds about 6 db of dynamic range', 'higher bit depth lower quantization noise more recording headroom', 'bit depth is amplitude resolution sample rate is time resolution',
    ],
    content: `Bit depth is the number of bits used to store each individual audio sample, and it sets how finely the amplitude (loudness) of the waveform is measured at each instant. It is the amplitude counterpart to the sample rate, which sets time resolution. More bits means more possible amplitude values and therefore a lower noise floor: each added bit contributes about 6 dB of dynamic range. 16-bit audio (CD, most distribution) gives roughly 96 dB of dynamic range; 24-bit audio (the standard for recording and mixing) gives about 144 dB, which provides a large safety margin so you can record at conservative levels without the noise floor ever becoming audible. 32-bit float is used internally by DAWs so intermediate calculations effectively cannot clip. Bit depth does not affect frequency range or pitch — only sample rate does that.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lowpass-vs-highpass-filter',
    title: 'Low-Pass Filter vs High-Pass Filter',
    category: 'Music Production',
    keywords: [
      'what is a low pass filter versus a high pass filter', 'low pass filter lets low frequencies through attenuates above the cutoff also called high cut',
      'high pass filter lets high frequencies through attenuates below the cutoff also called low cut removes rumble', 'filter cutoff frequency slope db per octave 12 24',
      'high pass on most tracks to clear low end mud', 'resonance q peak at the cutoff',
    ],
    content: `Both are filters defined by a cutoff frequency and a slope (measured in dB per octave, commonly 12 or 24). A LOW-PASS FILTER (also called a high-cut) allows frequencies below the cutoff to pass and progressively attenuates everything above it — used to tame harsh highs, darken a sound, or remove hiss. A HIGH-PASS FILTER (also called a low-cut) does the opposite: it lets frequencies above the cutoff through and attenuates everything below it — used to remove sub-sonic rumble, microphone handling noise, DC offset, and low-end "mud" from tracks that don't need bass (vocals, guitars, cymbals). A very common mixing move is to high-pass most non-bass tracks somewhere between 60 and 200 Hz so the low end belongs to the kick and bass. Many filters also have a resonance (Q) control that boosts a narrow band right at the cutoff.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sidechain-compression',
    title: 'What Sidechain Compression Is',
    category: 'Music Production',
    keywords: [
      'what is sidechain compression', 'sidechain compression a compressor triggered by a different signal than the one it processes', 'duck the bass or pads whenever the kick drum hits pumping edm effect',
      'sidechain for making room for a vocal ducking music under voiceover', 'external key input on a compressor', 'sidechain de-essing',
    ],
    content: `Normally a compressor listens to the same signal it is turning down. In sidechain compression, the compressor's detector listens to a different ("key" or "sidechain") signal, so one sound controls the level of another. The classic use in dance and pop music is to route the kick drum into the sidechain of a compressor on the bass or on the pads: every time the kick hits, the bass is briefly ducked, which prevents the two from fighting for the same low-frequency space and produces the rhythmic "pumping" or "breathing" effect. Other uses: ducking a whole music bed under a voiceover or radio DJ, carving a pocket in a synth for the lead vocal, and de-essing (a compressor keyed by an EQ'd copy of the signal that emphasizes sibilance). Most compressor plugins expose this as an "external sidechain" or "key input".`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gain-staging',
    title: 'What Gain Staging Is',
    category: 'Music Production',
    keywords: [
      'what is gain staging', 'gain staging setting the level at each stage of the signal chain to sit in the sweet spot', 'not so low it is noisy not so high it clips or hits plugins too hot',
      'aim for around -18 dbfs average on individual tracks to leave headroom', 'clean gain structure input trim plugins bus master', 'analog modeled plugins have a sweet spot input level',
    ],
    content: `Gain staging is the practice of setting an appropriate signal level at every point in the chain — the input/recording level, the trim before each plugin, each channel fader, every bus, and the master — so that no stage is so quiet that noise becomes significant or so loud that it clips or drives a processor past where it sounds good. A common target is to keep individual tracks averaging around -18 dBFS (peaking maybe -6 to -10), which mirrors the level analog gear and many analog-modeled plugins are calibrated for and leaves plenty of headroom on the mix bus for summing and mastering. Good gain staging means you can build a full mix and still have the master comfortably below 0 dBFS without pulling every fader down at the end.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-headroom-audio',
    title: 'What Headroom Is (Audio)',
    category: 'Music Production',
    keywords: [
      'what is headroom in audio', 'headroom the margin between the average signal level and the maximum before clipping', 'leaving headroom room for mix bus processing mastering and transients',
      'mix to around -6 dbfs peak tracks around -18 dbfs', '0 dbfs is the digital ceiling', 'headroom prevents distortion on peaks',
    ],
    content: `Headroom is the amount of level available between where a signal normally sits and the point where it distorts or clips — in digital audio, the gap up to 0 dBFS. Leaving headroom matters at every stage: individual tracks kept around -18 dBFS average and a mix bus peaking around -6 dBFS give room for transient peaks, for compressors and EQs on the mix bus to work without overshooting, and for a mastering engineer to raise the level cleanly. A mix that already slams 0 dBFS has no headroom, so any further processing causes clipping and the master ends up squashed. Headroom is essentially built-in safety margin for the parts of the signal that are louder than average.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-reverb-detail',
    title: 'What Reverb Is and How It Is Used',
    category: 'Music Production',
    keywords: [
      'what is reverb and how is it used in music', 'reverb simulates the reflections of sound in a physical space decay pre-delay size damping', 'reverb types room hall plate spring convolution',
      'reverb places a sound in a space adds depth blends elements', 'send reverb on a bus rather than per track', 'pre-delay keeps the dry sound clear before the reverb tail',
    ],
    content: `Reverb (reverberation) is the wash of countless overlapping reflections that a sound produces in a physical space as it bounces off walls, floors and objects. A reverb effect recreates this. Its main controls are decay/RT60 (how long the tail lasts), pre-delay (a short gap before the reverb starts, which keeps the original sound clear and implies room size), size, diffusion (how dense the reflections are), and damping (how quickly high frequencies fade, simulating soft vs hard surfaces). Common types: room and hall (natural spaces), plate (a bright, smooth studio classic made with a vibrating metal sheet), spring (the boingy sound built into guitar amps), and convolution (which uses a recording of a real space's response). Producers use reverb to place a dry, close-recorded sound into a believable space, to add depth and three-dimensionality, to push elements back behind others, and — as a glue — to make separately recorded parts sound like they were performed in the same room. It is usually set up on an aux/send bus so several tracks share one reverb.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-loudness-war',
    title: 'What the Loudness War Is',
    category: 'Music Production',
    keywords: [
      'what is the loudness war in music', 'loudness war decades long trend of mastering records louder and louder', 'heavy compression and limiting reduces dynamic range listener fatigue squashed transients',
      'streaming loudness normalization spotify -14 lufs youtube apple ended the incentive', 'clipped waveforms brick shaped masters', 'dynamic range db meter tt-dr',
    ],
    content: `The loudness war is the decades-long trend, especially from the 1990s through the 2000s, of mastering commercial recordings progressively louder so they would stand out on the radio, on TV, and next to other tracks. Because 0 dBFS is a hard ceiling, the only way to make an average level louder is to reduce the peaks — through heavy compression, limiting, and outright clipping — which shrinks the dynamic range (the difference between quiet and loud). The result is "brick-wall" waveforms, crushed drum transients that lose their punch, and listener fatigue. The war has largely wound down because streaming platforms now apply loudness normalization: Spotify, YouTube and Tidal play everything at roughly -14 LUFS and Apple Music around -16, turning louder masters back down, so an over-compressed track no longer wins any loudness advantage and just sounds flatter than a more dynamic one.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-condenser-vs-dynamic-mic',
    title: 'Condenser vs Dynamic Microphone',
    category: 'Music Production',
    keywords: [
      'what is the difference between a condenser and a dynamic microphone', 'dynamic microphone moving coil rugged handles high spl needs no power less sensitive', 'condenser microphone charged capsule needs 48v phantom power more sensitive extended highs',
      'dynamic mic for live vocals guitar cabs snare kick', 'condenser mic for studio vocals acoustic instruments overheads', 'large diaphragm vs small diaphragm condenser',
    ],
    content: `The two common microphone types differ in how they turn sound into electricity. A DYNAMIC microphone works like a tiny loudspeaker in reverse: sound moves a diaphragm attached to a coil in a magnetic field, generating current. Dynamics are rugged, need no power, tolerate very high sound-pressure levels without distorting, and are less sensitive to quiet detail and room sound — making them the standard for live vocals, guitar amps, snare and kick drums. A CONDENSER microphone uses a thin charged diaphragm next to a fixed backplate forming a capacitor; sound changes the capacitance, which is converted to a signal by active electronics that require power — usually 48V "phantom power" from the mixer or interface. Condensers are more sensitive, have a faster transient response and extended high-frequency detail, and capture a more accurate, airy sound, so they dominate studio work: lead vocals, acoustic guitar, piano, drum overheads and room mics. They are also more fragile and more easily overloaded by very loud sources.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-midi',
    title: 'What MIDI Is',
    category: 'Music Production',
    keywords: [
      'what is midi', 'midi musical instrument digital interface protocol carries performance data not audio', 'note on note off velocity pitch bend control change midi clock',
      'midi lets controllers synths daws drum machines interoperate since 1983', 'midi notes can be edited quantized reassigned to any sound', 'midi is not sound it is instructions',
    ],
    content: `MIDI (Musical Instrument Digital Interface) is a technical standard, introduced in 1983, that lets electronic musical instruments, computers and other gear communicate. Crucially, MIDI carries performance instructions, not audio: messages like note-on and note-off (which note, and how hard it was struck — "velocity"), pitch bend, modulation, control-change messages for knobs and pedals, program changes, and a timing clock. Because a MIDI performance is just data, it can be recorded into a DAW and then freely edited — move a wrong note, change its timing, quantize the whole part to a grid, transpose it, or route it to a completely different instrument or sound. A MIDI keyboard or pad controller sends these messages; a synth, sampler or software instrument receives them and produces the actual sound. Modern gear also uses MIDI over USB, and MIDI 2.0 (2020) adds higher resolution and two-way communication.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bus-subgroup-mixing',
    title: 'What a Bus or Subgroup Is (Mixing)',
    category: 'Music Production',
    keywords: [
      'what is a bus or subgroup in mixing', 'bus a signal path that combines multiple channels so you can process them together', 'drum bus one compressor and eq on the whole kit',
      'aux send bus for shared reverb or delay parallel processing', 'subgroup a bus feeding the master fader', 'routing tracks to a group for level control and glue',
    ],
    content: `A bus is a signal path that sums several channels together so they can be handled as one. The most common use is a group (subgroup): you route all the drum tracks to a "drum bus," all the backing vocals to a "vocal bus," and so on, then put compression, EQ or saturation on that bus to process the whole group at once — controlling its overall level with a single fader and "gluing" the parts together so they sound like one cohesive element. Buses are also used for send effects: instead of a separate reverb on every track, you create an aux bus with one reverb and send each track to it in varying amounts, which saves CPU and places everything in the same space. And they enable parallel processing — blending a heavily compressed copy of a bus back under the original. A subgroup that feeds the master fader lets you, for example, pull all the music down under a vocal with one move.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-compressor-attack-release',
    title: 'Compressor Attack and Release',
    category: 'Music Production',
    keywords: [
      'what is a compressor attack and release', 'attack how fast the compressor reduces gain after the signal crosses the threshold', 'fast attack clamps the transient slow attack lets the transient through for punch',
      'release how fast the compressor returns to no gain reduction after the signal drops below threshold', 'fast release can pump slow release smoother more transparent', 'auto release program dependent',
    ],
    content: `Attack and release set the timing of a compressor's gain reduction. ATTACK is how quickly the compressor clamps down once the signal rises above the threshold. A fast attack (under ~5 ms) catches the initial transient — the click of a kick, the pluck of a bass — and reduces it, which controls peaks but can make a sound duller or smaller. A slow attack (10–50 ms) lets that transient punch through before the compression engages, so the attack of the sound stays snappy while the body is controlled — this is how you make drums hit harder. RELEASE is how quickly the compressor stops reducing gain after the signal falls back below the threshold. A fast release recovers quickly and can add energy or a pumping effect, but if it is too fast it distorts low frequencies. A slow release is smoother and more transparent but can leave the compressor "holding down" quiet passages after a loud hit. Many compressors offer an auto/program-dependent release that adapts to the material.`,
    createdAt: Date.now(),
  },
];
