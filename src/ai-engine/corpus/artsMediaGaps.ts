import { KnowledgeItem } from '../../types';

// Batch 275 corpus fixes — music/art/literature/film topics.
// 9/25 misses. One severe topic-confusion hallucination: "pitch vs tone" was
// answered entirely as BASEBALL pitching mechanics ("in baseball, pitch...
// a fastball is a high-pitched scream of leather") instead of the musical
// concepts. Two answers got the facts flatly backwards: opera was described
// as alternating spoken dialogue with songs (that's actually musical
// theater — most opera is sung-through), and "statue" was defined as a
// relief sculpture stuck to a slab (the opposite — a statue is a free-
// standing, fully three-dimensional figure; relief is the different,
// flatter technique). Also a factual date error (blues origin given as "the
// 40s" instead of the correct late 1800s/early 1900s) and two answers that
// devolved into random unrelated trivia dumps (Citizen Kane authorship
// controversy for "screenplay vs script", random actor/director bios for
// "documentary vs biopic").

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'arts',
  keywords,
  content,
  createdAt: now,
});

export const ARTS_MEDIA_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-arts-jazz-vs-blues-origin',
    'Jazz vs blues (correcting the blues origin date)',
    ['jazz', 'blues', 'difference jazz blues', 'when did blues originate'],
    "Blues did NOT originate in the 1940s — it emerged much earlier, in the late 1800s to early 1900s, in the Deep South of the United States, growing out of African American work songs, spirituals, and field hollers, built around simple chord progressions (like the classic 12-bar blues) and 'blue notes' (pitches bent or flattened from the standard scale to convey emotion). Jazz developed a bit later, starting around the 1910s-1920s in New Orleans, building directly on blues tonality and its improvisational spirit but adding much more complex harmony, swing rhythm, and a heavier emphasis on group and solo improvisation. The 1940s is actually when a specific jazz SUBGENRE called bebop emerged (fast, complex, virtuosic) — not when blues itself began, which was roughly 40-50 years earlier.",
  ),
  k(
    'kb-gap-arts-producer-vs-director-music',
    'Producer vs director in music',
    ['music producer', 'music director', 'difference producer director music'],
    "A music producer oversees the creative and technical process of making a recording — they help shape the sound, arrangement, and performances, work closely with the artist and engineers, and are responsible for how the final track actually sounds (think Rick Rubin, George Martin, or Max Martin). A 'director' in a music context usually refers to something different depending on the setting: a MUSIC VIDEO director is the person who directs the visual/film side of a song's music video (camera, actors, story), completely separate from who produced the audio; in classical or orchestral music, a 'music director' (or conductor) is the person who leads the orchestra/ensemble and shapes the overall musical interpretation during a performance. So 'producer' is specifically about shaping the recorded sound, while 'director' usually refers either to the visual director of a music video, or to the conductor/music director of a live ensemble — two different jobs that don't really overlap.",
  ),
  k(
    'kb-gap-arts-pitch-vs-tone-music',
    'Pitch vs tone (musical, not baseball)',
    ['musical pitch', 'musical tone', 'difference pitch tone music'],
    "In music, pitch refers to how high or low a sound is, determined by the frequency of the sound wave — a higher frequency means a higher pitch (like a high note on a piano), a lower frequency means a lower pitch. Tone (or timbre) refers to the quality or character of a sound that lets you tell instruments or voices apart even when they play the exact same pitch — a violin and a trumpet playing the same note (same pitch) still sound completely different because of their different tone/timbre. In short: pitch is about how high or low a note IS, while tone/timbre is about what a note sounds LIKE (bright, warm, harsh, mellow) independent of its pitch. This is unrelated to baseball pitching — that's a completely different meaning of the word 'pitch.'",
  ),
  k(
    'kb-gap-arts-orchestra-vs-band-general',
    'Orchestra vs band (general, not just wind band)',
    ['orchestra', 'band', 'difference orchestra band'],
    "An orchestra is a large, specifically classical ensemble (typically 60-100+ musicians) organized into distinct sections — strings, woodwinds, brass, and percussion — led by a conductor and reading from a written score, almost always playing classical, film, or orchestral music. A 'band' is a much broader, more general term for any smaller group of musicians playing together — it covers rock bands, jazz bands, marching bands, wind ensembles, and more, and doesn't require strings, a conductor, or classical repertoire at all. So a band isn't specifically 'a wind band without strings' — that's just one type (a concert/wind band); the real distinguishing feature of an orchestra is its size, its string-heavy classical instrumentation, and having a conductor, while 'band' is a catch-all term for pretty much any other kind of musical group.",
  ),
  k(
    'kb-gap-arts-opera-vs-musical-theater-correction',
    'Opera vs musical theater (correcting a backwards answer)',
    ['opera', 'musical theater', 'musical theatre', 'difference opera musical'],
    "Correcting a common mix-up: it's MUSICAL THEATER, not opera, that typically alternates spoken dialogue with songs. Opera is almost entirely SUNG-THROUGH — nearly the whole story, including ordinary conversation, is delivered through singing (recitative for dialogue-like parts, arias for big emotional moments), with a full classical orchestra and rigorously trained classical/operatic voices, and very little or no spoken dialogue at all. Musical theater (Broadway-style musicals) grew out of more popular entertainment traditions and usually DOES alternate between spoken dialogue scenes and songs, uses a broader range of singing styles (not just classical technique), and often has more dance-driven numbers. The simplest way to remember it: opera = almost always sung, even the talking parts; musical = talks normally, then breaks into song for big moments.",
  ),
  k(
    'kb-gap-arts-watercolor-vs-acrylic',
    'Watercolor vs acrylic paint',
    ['watercolor', 'acrylic paint', 'difference watercolor acrylic'],
    "Watercolor uses pigment suspended in a water-soluble binder (usually gum arabic) — it stays reactivatable with water even after drying, is typically used on paper, is applied in thin, transparent layers that let the white of the paper show through for light areas (there's no white paint, you just leave the paper blank), and dries relatively fast but can be reworked by adding more water. Acrylic paint uses pigment suspended in a plastic (acrylic polymer) binder — once it dries, it's permanent and water-resistant, it can be applied thickly (like oil paint) or thinly (like watercolor) depending on how much it's diluted, works on many surfaces (canvas, wood, paper), and dries fast with a slight sheen. The core difference: watercolor is always water-reactivatable and relies on transparency/the white of the paper, while acrylic dries into a permanent plastic film and can be built up opaquely in thick layers.",
  ),
  k(
    'kb-gap-arts-sculpture-vs-statue-correction',
    'Sculpture vs statue (correcting a backwards answer)',
    ['sculpture', 'statue', 'difference sculpture statue', 'relief sculpture'],
    "Correcting a mix-up: a statue is NOT a relief — a statue is typically a free-standing, fully three-dimensional sculpture, usually representing a person, animal, or figure, that can be viewed from all sides (like Michelangelo's David). 'Sculpture' is actually the broader umbrella term covering ALL three-dimensional art made by carving, modeling, casting, or assembling — a statue is just one common TYPE of sculpture. Relief (bas-relief or high-relief) is a different sculptural technique where the figure is carved so it projects out from a flat background but stays attached to it (like a carved stone panel) — it's not the same thing as a statue, and it's the opposite of free-standing. So the actual relationship is: sculpture is the general category, and both free-standing statues and attached reliefs are different types of sculpture within that category.",
  ),
  k(
    'kb-gap-arts-screenplay-vs-script',
    'Screenplay vs script',
    ['screenplay', 'script', 'difference screenplay script'],
    "'Script' is the general term for any written text meant to be performed — it covers stage plays, TV episodes, radio dramas, and films alike. 'Screenplay' is a more specific term that refers specifically to the script written for a FILM (a movie), following particular industry-standard formatting conventions (scene headings, action lines, character cues, dialogue) built for how a camera and director will interpret it. So a screenplay is a type of script — specifically the one written for cinema — while 'script' more broadly covers any of those formats, including a teleplay (a script for television) or a stage play's script (for live theater).",
  ),
  k(
    'kb-gap-arts-documentary-vs-biopic',
    'Documentary vs biopic',
    ['documentary', 'biopic', 'difference documentary biopic'],
    "A documentary uses real footage, real people, and real events — it's presenting itself as factual, often built from interviews, archival footage, and real-life observation, without actors playing roles (though some documentaries do use light reenactments). A biopic (biographical picture) is a FICTIONALIZED dramatization of a real person's life, using actors to portray real people and often taking creative liberties, compressing timelines, inventing dialogue, or dramatizing events for storytelling purposes, even though it's based on true events. The key difference: a documentary shows you the real people and real footage directly; a biopic has actors performing a scripted, dramatized version of a real person's story.",
  ),
];
