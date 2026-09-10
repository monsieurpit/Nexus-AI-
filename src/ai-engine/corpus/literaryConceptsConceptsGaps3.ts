import { KnowledgeItem } from '../../types';

/**
 * LITERARY_CONCEPTS_CONCEPTS_GAPS_3 — batch 224 corrections.
 * Misses: "modernism vs postmodernism in literature" answered about
 * architecture, "chapter vs scene" answered about bankruptcy chapters,
 * "author vs writer" answered about a single author's collection vs an
 * anthology, "voice vs tone" answered tone vs mood + active/passive, plus web
 * dumps for exposition/backstory and manuscript/draft, and muddled narrator/
 * POV, canto/stanza, memoir/personal-essay and poetry/song-lyrics.
 */
export const LITERARY_CONCEPTS_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  {
    id: 'kb-gap-lit3-narrator-vs-pov',
    title: 'Narrator vs point of view',
    category: 'literature',
    keywords: [
      'difference between a narrator and a point of view', 'narrator vs POV', 'the voice telling the story',
      'the vantage point', 'first person third person', 'omniscient limited', 'unreliable narrator',
      'who tells versus whose eyes',
    ],
    content: `The narrator is the voice or entity that TELLS the story — a "someone" (or something) doing the telling. It can be a character in the story ("I ran"), a disembodied outside voice, or even a collective "we". A narrator has a personality, a level of knowledge, and a degree of reliability (an "unreliable narrator" misleads the reader, deliberately or not).

Point of view (POV) is the VANTAGE POINT from which the story is told — the position and access the narration has:
- First person: the narrator is a character ("I"), and we are limited to what that person perceives and knows.
- Second person: "you" (rare).
- Third person LIMITED: an outside voice ("he", "she") but with access to only one character's inner thoughts at a time.
- Third person OMNISCIENT: an outside voice that can enter any character's mind and knows everything, past and future.
- Third person OBJECTIVE: an outside voice reporting only what could be seen and heard, no inner thoughts.

So the narrator is WHO is speaking; the point of view is HOW MUCH they can see and know and WHOSE experience we get. A first-person narrator always uses a first-person POV, but a single third-person POV can be delivered by very different narrators (chatty and opinionated, or cold and neutral).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-modernism-vs-postmodernism-lit',
    title: 'Modernism vs postmodernism in literature',
    category: 'literature',
    keywords: [
      'difference between modernism and postmodernism in literature', 'literary modernism', 'literary postmodernism',
      'stream of consciousness', 'fragmentation', 'metafiction', 'unreliable narration', 'irony and pastiche',
      'Joyce Woolf Eliot', 'Pynchon Borges DeLillo', 'not architecture',
    ],
    content: `In literature (not architecture):

Literary modernism (roughly 1900-1945) was a response to industrialisation, urban alienation and the trauma of the First World War. It broke with 19th-century realist convention: stream-of-consciousness narration (Joyce's "Ulysses", Woolf's "Mrs Dalloway"), fragmentation and collage (Eliot's "The Waste Land"), non-linear time, unreliable or shifting narrators, and difficult, allusive style. Underneath, modernists still generally believed art could impose order and meaning on chaos ("these fragments I have shored against my ruins"), and they took themselves very seriously.

Literary postmodernism (roughly 1945-2000) pushes further and turns playful and sceptical. It doubts that any single truth, master narrative or stable meaning is possible. Its devices: metafiction (fiction that draws attention to being fiction), unreliable narration taken to extremes, pastiche and parody, mixing "high" and "low" culture, irony and black humour, maximalist digression, and deliberate paradox. Writers: Borges, Nabokov's "Pale Fire", Pynchon's "Gravity's Rainbow", Vonnegut, Calvino, DeLillo, David Foster Wallace.

Short version: modernism fragments the form but still seeks meaning and is earnest; postmodernism assumes meaning is unstable, and responds with irony, self-reference and play.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-protagonist-vs-main-character',
    title: 'Protagonist vs main character (vs hero)',
    category: 'literature',
    keywords: [
      'difference between a protagonist and a main character', 'protagonist vs main character',
      'drives the central conflict', 'the character we follow most', 'usually the same', 'hero versus protagonist',
      'point-of-view character', 'The Great Gatsby Nick and Gatsby',
    ],
    content: `In most stories "protagonist" and "main character" mean the same person and the terms are used interchangeably. Where a distinction is drawn:

The protagonist is the character who drives the CENTRAL CONFLICT and whose goal the plot is organised around — the one who wants something, acts to get it, and faces the main opposition (the antagonist). The story's stakes are the protagonist's stakes.

The main character (or point-of-view character) is the person we spend the most time with and experience the story through. Usually that is the protagonist. But sometimes a story is narrated by, or centred on, someone who is a witness or supporting figure rather than the driver of the action. In "The Great Gatsby", Nick Carraway is the main character we follow and the narrator, but Gatsby is the protagonist whose desire and downfall are the story. In "Sherlock Holmes", Watson is the narrator/POV character; Holmes is the protagonist.

Also note "hero" is not a synonym for protagonist: a protagonist can be an antihero or even a villain (Humbert Humbert, Walter White) — "protagonist" is about position in the story, not virtue.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-canto-vs-stanza',
    title: 'Canto vs stanza',
    category: 'literature',
    keywords: [
      'difference between a canto and a stanza', 'canto vs stanza', 'major division of a long poem',
      'a grouped set of lines', 'Dante Divine Comedy cantos', 'chapter of an epic', 'stanza is not always four lines',
      'verse paragraph',
    ],
    content: `A stanza is a group of lines in a poem set off from other groups by a blank line — the poetic equivalent of a paragraph. A stanza can be any length: a couplet is 2 lines, a tercet 3, a quatrain 4, and there are 5-, 6-, 8- and 14-line stanza forms, plus irregular "verse paragraphs" in free verse. Stanzas are the small-scale building blocks of a poem's structure.

A canto is a MAJOR DIVISION of a long narrative poem — the equivalent of a chapter in a novel. Each canto contains many stanzas (or many lines of continuous verse). Dante's "Divine Comedy" has 100 cantos; Byron's "Don Juan", Pound's "Cantos", Spenser's "The Faerie Queene" and Ariosto's "Orlando Furioso" are all organised into cantos. The word comes from the Italian for "song", from the days when a bard would perform one canto's worth in a sitting.

So the scale is: line -> stanza (a small group of lines) -> canto (a large section made of many stanzas) -> the whole poem. A stanza is not defined by a fixed line count, and a canto is far bigger than any single stanza.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-memoir-vs-personal-essay',
    title: 'Memoir vs personal essay',
    category: 'literature',
    keywords: [
      'difference between a memoir and a personal essay', 'memoir vs personal essay', 'book-length focused life story',
      'short piece exploring an idea through experience', 'narrative arc', 'reflection and argument',
      'not memoir versus autobiography', 'creative nonfiction',
    ],
    content: `Both are forms of creative nonfiction told from the author's own life, but they differ in scale and purpose. (This is not the memoir-vs-autobiography question.)

A memoir is usually BOOK-LENGTH and tells a sustained story about a particular period or thread of the author's life — a childhood, an illness, a marriage, an addiction, a year abroad — with a narrative arc, scenes, dialogue and characters, shaped like a novel. Examples: "Angela's Ashes", "The Glass Castle", "Educated", "H is for Hawk".

A personal essay is SHORT (a few pages to maybe twenty), and it uses a slice of the author's experience as a way into EXPLORING AN IDEA, question or feeling. It is more meditative and argumentative than a memoir: the events are in service of the thinking. It often circles a subject, mixes anecdote with reflection and research, and lands on an insight rather than a plot resolution. Examples: the essays of Montaigne (who invented the form), Joan Didion, James Baldwin, David Sedaris, and the "Modern Love" column.

Short version: a memoir is a long true story about your life shaped like a book; a personal essay is a short piece that thinks out loud about something, using your life as the material.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-author-vs-writer',
    title: 'Author vs writer',
    category: 'literature',
    keywords: [
      'difference between an author and a writer', 'author vs writer', 'anyone who writes', 'creator of a published work',
      'authorship and origination', 'the author function', 'copyright holder', 'not a collection versus an anthology',
    ],
    content: `A writer is anyone who writes — as an activity or a job. Journalists, copywriters, screenwriters, bloggers, technical writers, students and novelists are all writers. It describes what a person does.

An author is the originator and creator of a specific written WORK — typically a book — and the person credited with it and holding authorship (and usually copyright). "Author" points to a completed, attributed body of work and to the responsibility and identity behind it: "the author of 'Pride and Prejudice'". You become "an author" by having authored something.

In practice: every author is a writer, but not every writer is (yet) an author — a person can write for years without producing an authored work of their own. The words also carry a tone difference: "writer" foregrounds the craft and the daily practice; "author" foregrounds the achievement, the ownership and the public identity. In literary theory, "the author" is also a loaded concept — Roland Barthes's "The Death of the Author" argues a text's meaning does not depend on its author's intentions, and Foucault's "author function" examines how a name organises how we read a body of work.

(This has nothing to do with a single writer's "collection" versus a multi-author "anthology".)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-voice-vs-tone',
    title: 'Voice vs tone in writing',
    category: 'literature',
    keywords: [
      'difference between voice and tone in writing', 'voice vs tone', 'the writer\'s distinctive persistent style',
      'the attitude in a particular passage', 'consistent across a whole work', 'shifts scene to scene',
      'not tone versus mood or active versus passive',
    ],
    content: `Voice is the distinctive, PERSISTENT personality of the writing — the combination of word choice, sentence rhythm, humour, worldview and habits of thought that make a writer (or a narrator) recognisable across a whole book, the way you'd know a friend's texting style. Hemingway's spare, blunt voice; Toni Morrison's lyrical, layered voice; a wry first-person narrator's voice. Voice is stable; it is "who is talking and how they always sound".

Tone is the ATTITUDE expressed in a PARTICULAR passage toward the subject or the reader — and it can shift from paragraph to paragraph within the same voice. A single narrator with one consistent voice can be affectionate in one scene, sarcastic in the next, then grave, then playful. Tone words: earnest, mocking, nostalgic, indignant, detached, tender, menacing.

So voice is the constant instrument; tone is the note it is playing right now. (Tone is also distinct from "mood", which is the feeling the writing creates in the reader, and from "active vs passive voice", which is a grammar term about sentence construction.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-exposition-vs-backstory',
    title: 'Exposition vs backstory',
    category: 'literature',
    keywords: [
      'difference between exposition and backstory', 'exposition vs backstory', 'information the reader needs now',
      'events before the story began', 'delivering context', 'a character\'s history', 'infodump', 'in medias res',
    ],
    content: `Exposition is the DELIVERY of information the audience needs to understand what is happening — the setting, the situation, the rules of the world, who people are, what is at stake, and relevant past events. It is a technique / a function of storytelling. Exposition can be handled well (woven into action and dialogue, revealed only as needed) or badly (an "infodump" where a character explains things everyone present already knows).

Backstory is the CONTENT itself — the events, relationships and history that occurred BEFORE the point where the story begins. A character's childhood, a past war, an old betrayal, how two characters first met. Backstory exists whether or not the audience ever learns it; the writer often knows far more backstory than ends up on the page.

The relationship: backstory is one of the main things exposition conveys. A flashback, a character reminiscing, a found letter, or a line of dialogue can all be exposition that reveals backstory. But exposition also covers present-tense context that is not "back" anything (the layout of the ship, the political situation right now). Stories that start "in medias res" (in the middle of the action) deliberately delay both, feeding exposition and backstory gradually rather than front-loading them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-poetry-vs-song-lyrics',
    title: 'Poetry vs song lyrics',
    category: 'literature',
    keywords: [
      'difference between poetry and song lyrics', 'poetry vs song lyrics', 'written to be read on the page',
      'written to be sung with music', 'the melody carries the rhythm', 'repetition and hooks', 'stand alone versus need the music',
      'Bob Dylan Nobel Prize',
    ],
    content: `Both use rhythm, sound, imagery and compression, and the line between them is blurry, but the core difference is what carries them.

Poetry is written primarily to work ON THE PAGE (or read aloud unaccompanied). All of its music — metre, line breaks, stresses, pauses, internal rhyme — has to be built into the words themselves, because there is no melody to lean on. A poem is expected to stand complete on its own, and it can afford dense, difficult language because a reader can slow down and reread.

Song lyrics are written to be SUNG with music. The melody, tempo, phrasing and instrumentation supply a lot of the rhythm and emotional force, so the words can be simpler, more repetitive (choruses, hooks, refrains) and more direct — lyrics that look thin on the page can be devastating when sung. Lyrics also serve the song's structure (verse-chorus-bridge) and have to be immediately graspable in real time.

Great lyricists (Bob Dylan, who won the 2016 Nobel Prize in Literature; Leonard Cohen, Joni Mitchell) blur the boundary, and plenty of poems have been set to music. But a poem is finished without music; a lyric is only half of the thing until it is sung.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-chapter-vs-scene',
    title: 'Chapter vs scene (in a story)',
    category: 'literature',
    keywords: [
      'difference between a chapter and a scene', 'chapter vs scene fiction', 'a formal division of a book',
      'a continuous unit of action in one place and time', 'a chapter can contain several scenes', 'scene break',
      'not bankruptcy chapters',
    ],
    content: `This is about story structure, not the US Bankruptcy Code (Chapter 7, Chapter 11).

A scene is the basic dramatic unit of a narrative: a continuous stretch of action happening in ONE place and (roughly) ONE span of time, with a set of characters, that moves the story forward — someone wants something, there is friction, and by the end something has shifted. When the story jumps to a new place, a much later time, or a different set of characters, that is a new scene (often marked by a line break or a "* * *"). Between scenes there is often a "sequel" beat of reaction and decision.

A chapter is a FORMAL DIVISION of a book, chosen by the author for pacing and reading rhythm. A chapter can contain a single scene, several scenes, part of a scene, or a montage / summary passage. Chapter breaks are where a writer creates a pause, a cliffhanger, or a shift in perspective, and where a reader is invited to stop.

So the nesting is: the whole story is made of scenes (the actual events); those scenes are grouped into chapters (the packaging). Screenwriting uses "scene" the same way but has no "chapters"; it groups scenes into "sequences" and "acts".`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit3-manuscript-vs-draft',
    title: 'Manuscript vs draft',
    category: 'literature',
    keywords: [
      'difference between a manuscript and a draft', 'manuscript vs draft', 'the physical or digital document of a work',
      'a version at a stage of revision', 'first draft second draft final draft', 'submission manuscript',
      'holograph typescript', 'not a specific poem manuscript',
    ],
    content: `A manuscript (often abbreviated "MS" or "ms.") is the author's DOCUMENT of a work — historically handwritten (from Latin "written by hand"), now usually a typed/word-processed file. In modern publishing "the manuscript" means the complete text of a book as the author submits it to an agent or publisher, before it is typeset and printed. In scholarship, a "manuscript" can also mean a historical handwritten document or an original authorial copy of a text (a "holograph" is one in the author's own hand).

A draft is a VERSION of a work at a particular stage of writing and revision. The "first draft" is the initial complete attempt (often rough); a "second draft", "third draft" and so on are successive revisions; the "final draft" is the version the author considers done. A "working draft" is one still being changed.

The relationship: a manuscript exists at each draft stage — you have a first-draft manuscript, a revised manuscript, and a final manuscript you submit. "Manuscript" names the document; "draft" names how finished that document is. Editors then produce further stages (edited manuscript, proofs) after submission.`,
    createdAt: Date.now(),
  },
];
