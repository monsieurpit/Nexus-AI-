import { KnowledgeItem } from '../../types';

/**
 * LITERARY_CONCEPTS_CONCEPTS_GAPS_2 — batch 209 corrections.
 * Literary-terms misses: "round vs flat character" answered REVERSED (round
 * called static), "direct vs indirect characterization" answered about
 * reported/indirect speech grammar, "anthology vs collection" answered about
 * owning art and manga, "genre vs form" and "preface vs prologue" and "ode vs
 * elegy" came back as web dumps, "rhyme vs rhythm" never distinguished them,
 * plus weak fable/parable, antihero/villain and subplot answers.
 */
export const LITERARY_CONCEPTS_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  {
    id: 'kb-gap-lit2-round-vs-flat-character',
    title: 'Round vs flat character (round is the complex one)',
    category: 'literature',
    keywords: [
      'difference between a round and a flat character', 'round vs flat character', 'E.M. Forster',
      'complex character', 'one-dimensional character', 'develops and surprises', 'static minor character',
      'dynamic vs static', 'characterization', 'not reversed',
    ],
    content: `These terms come from E.M. Forster's "Aspects of the Novel". They are often stated backwards, so to be clear:

A round character is complex, fully developed, and carries contradictions and depth like a real person. Round characters have detailed inner lives, mixed motives, and the capacity to surprise the reader convincingly. They are usually the protagonist and major characters — Elizabeth Bennet, Hamlet, Jay Gatsby.

A flat character is built around a single dominant trait or idea and can be summed up in one sentence ("the nosy neighbour", "the loyal butler", "the greedy landlord"). They do not have hidden depths and they behave predictably. Flat characters are useful for minor roles, comic relief and moving the plot along.

This is a separate axis from dynamic versus static:
- Dynamic character: changes meaningfully over the course of the story (Scrooge).
- Static character: stays essentially the same from start to finish (Sherlock Holmes across a single case).

Round characters are usually dynamic and flat characters usually static, but not always — a round character can also hold steady while everything around them changes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-direct-vs-indirect-characterization',
    title: 'Direct vs indirect characterization (not reported speech)',
    category: 'literature',
    keywords: [
      'difference between direct and indirect characterization', 'direct vs indirect characterization',
      'showing versus telling', 'STEAL method', 'narrator states a trait', 'reader infers from actions',
      'not direct and indirect speech', 'reported speech is grammar', 'character development technique',
    ],
    content: `This is a fiction-writing technique, not the grammar topic of direct versus indirect (reported) speech.

Direct characterization is when the narrator or another character simply TELLS the reader what a character is like, in plain statement: "Mrs. Dubose was the meanest old woman who ever lived," or "He was a cautious, methodical man who never took risks." It is fast and unambiguous.

Indirect characterization is when the writer SHOWS the character and lets the reader infer their nature from evidence. A common checklist is STEAL:
- Speech: what the character says and how they say it.
- Thoughts: their private reflections (when the narration gives access).
- Effect on others: how other characters react to them.
- Actions: what they choose to do, especially under pressure.
- Looks: their appearance, dress and body language.

Most skilled fiction leans on indirect characterization ("show, don't tell") because readers trust conclusions they reach themselves, and reserves direct statement for efficiency or for a narrator with a strong voice.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-anthology-vs-collection',
    title: 'Anthology vs collection (literature)',
    category: 'literature',
    keywords: [
      'difference between an anthology and a collection', 'anthology vs collection', 'multiple authors',
      'single author', 'short story collection', 'poetry anthology', 'edited volume', 'editor',
      'not art collection or ownership', 'gathered works',
    ],
    content: `Both are books that gather multiple shorter works (short stories, poems, essays), but they differ by authorship. This is not about owning artworks.

A collection contains works by ONE author, brought together in a single volume — usually pieces written over a period and previously published separately in magazines. Examples: "Dubliners" by James Joyce, "Nine Stories" by J.D. Salinger, a poet's "Collected Poems". The unifying element is the single writer's voice and concerns.

An anthology contains works by MANY different authors, chosen and arranged by an editor around a theme, genre, period, region or form. Examples: "The Norton Anthology of Poetry", a "Best American Short Stories" volume, a themed anthology of ghost stories. The editor's selection and framing (introduction, notes, ordering) is the creative contribution; the editor is credited on the cover, not a single author.

Quick test: one writer's own gathered work = collection; an editor's curated selection of several writers = anthology.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-preface-vs-prologue',
    title: 'Preface vs prologue (and foreword, introduction)',
    category: 'literature',
    keywords: [
      'difference between a preface and a prologue', 'preface vs prologue', 'front matter',
      'author explains the book', 'opening scene of the story', 'foreword by another person',
      'introduction', 'in the fictional world', 'outside the narrative',
    ],
    content: `A preface is a short section in which the AUTHOR speaks directly to the reader, from outside the story, about the book itself: why it was written, how it came about, its scope, method, acknowledgements, or changes in a new edition. It is non-fiction framing even for a novel, and the reader can skip it without missing any story.

A prologue is the FIRST part of the narrative itself, written in the same fictional voice and world as the rest. It sets up the story — showing an earlier event, a piece of backstory, a framing scene, or a different point of view — before Chapter 1. Skipping it means missing plot. Shakespeare's "Romeo and Juliet" opens with a prologue; many fantasy novels use one for a distant historical event.

Related front matter:
- Foreword: written by someone OTHER than the author (an expert, a fan, a friend), usually to lend credibility or context. It comes before the preface.
- Introduction: like a preface but often longer and more substantive, sometimes by an editor in a scholarly edition, orienting the reader to the work's themes and background.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-genre-vs-form',
    title: 'Genre vs form in literature',
    category: 'literature',
    keywords: [
      'difference between a genre and a form in literature', 'genre vs form literature',
      'content category', 'structural type', 'sonnet is a form', 'mystery is a genre',
      'novel poem play essay', 'thematic conventions', 'fixed structure',
    ],
    content: `Form is about the STRUCTURE and shape of a piece of writing — its physical organisation, length and rules of construction, regardless of subject. The big forms are the novel, the short story, the poem, the play and the essay. Within poetry there are fixed forms defined by line count, metre and rhyme scheme: the sonnet (14 lines), the haiku (5-7-5), the villanelle, the limerick, the sestina. Blank verse and free verse are also forms (or the deliberate absence of fixed form).

Genre is about the CONTENT, mood and conventions — the kind of story being told and the expectations that come with it. Mystery, romance, science fiction, fantasy, horror, historical fiction, satire, tragedy, comedy and the bildungsroman are genres. A genre carries typical settings, character types, plot patterns and reader expectations.

The two are independent axes: a mystery (genre) can be written as a novel, a short story, a play or a narrative poem (forms). A sonnet (form) can be a love poem, a political satire or an elegy (genres/modes). So "what shape is it?" is form; "what kind of thing is it about, and by what conventions?" is genre.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-rhyme-vs-rhythm',
    title: 'Rhyme vs rhythm in poetry',
    category: 'literature',
    keywords: [
      'difference between rhyme and rhythm', 'rhyme vs rhythm', 'matching end sounds', 'metre',
      'stressed and unstressed syllables', 'beat of a line', 'rhyme scheme', 'iambic',
      'sound repetition versus pulse', 'scansion',
    ],
    content: `Rhyme is the repetition of matching sounds, usually the final stressed vowel and everything after it, at the ends of words — most often at the ends of lines ("cat/hat", "flower/power"). The pattern of which lines rhyme is the rhyme scheme, written with letters (ABAB, AABB, ABBA). Rhyme can also fall inside a line (internal rhyme) or be approximate (slant/half rhyme, "worm/swarm"). Rhyme is about sound-matching.

Rhythm is the pattern of beats in a line — the arrangement of stressed and unstressed syllables and how fast or slow the line moves when spoken. In metrical verse this is organised into feet (an iamb is unstressed-STRESSED, "da-DUM"), and a line is named by its foot and count (iambic pentameter = five iambs, ten syllables). Free verse has rhythm without a fixed metre. Rhythm is about the pulse and timing.

A poem can have one without the other: blank verse has strict rhythm (iambic pentameter) and no rhyme; a lot of rap and nursery rhyme has strong rhyme and loose rhythm; free verse can drop both. Analysing a line's rhythm is called scansion.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-ode-vs-elegy',
    title: 'Ode vs elegy',
    category: 'literature',
    keywords: [
      'difference between an ode and an elegy', 'ode vs elegy', 'lyric poem of praise',
      'poem of mourning', 'lament for the dead', 'celebration', 'Keats odes',
      'Gray Elegy Written in a Country Churchyard', 'elegiac tone', 'apostrophe',
    ],
    content: `Both are lyric poems, but they differ in purpose and mood.

An ode is a formal lyric poem of praise, celebration or serious meditation, usually addressed directly to its subject (a person, an object, an abstract idea, a season). It is elevated in tone and often elaborate in stanza structure. Examples: Keats's "Ode to a Nightingale" and "Ode on a Grecian Urn", Shelley's "Ode to the West Wind", Neruda's odes to ordinary things. The feeling is exaltation or intense contemplation, not grief.

An elegy is a poem of mourning and lament, most often for a specific person who has died, moving through sorrow toward some consolation or acceptance. Examples: Gray's "Elegy Written in a Country Churchyard", Milton's "Lycidas", Whitman's "When Lilacs Last in the Dooryard Bloom'd" (for Lincoln), Auden's "In Memory of W.B. Yeats". More loosely, "elegiac" describes any wistful, mournful reflection on loss or the passage of time.

Short version: an ode celebrates or exalts; an elegy mourns.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-fable-vs-parable',
    title: 'Fable vs parable',
    category: 'literature',
    keywords: [
      'difference between a fable and a parable', 'fable vs parable', 'Aesop', 'talking animals',
      'explicit moral', 'religious teaching story', 'human characters', 'the Good Samaritan',
      'allegorical lesson', 'stated versus implied lesson',
    ],
    content: `Both are short didactic tales that teach through a simple story, but they differ in characters, subject and how the lesson is delivered.

A fable is a very short tale, usually featuring animals, plants or forces of nature that talk and act like people, ending with an explicitly stated moral ("Slow and steady wins the race"; "Do not count your chickens before they hatch"). The tradition is Aesop, the Panchatantra, and La Fontaine. The lesson is practical worldly wisdom about behaviour and consequences, and it is spelled out.

A parable uses ordinary human characters in realistic, everyday situations and leaves the lesson implied — the reader or listener has to work out the meaning. Parables are strongly associated with religious and moral teaching; the best-known are those of Jesus in the Gospels (the Good Samaritan, the Prodigal Son, the Sower). A parable typically illustrates a single spiritual or ethical principle by analogy and invites reflection rather than handing down a tidy maxim.

Short version: fable = talking animals + a stated moral; parable = ordinary people + an implied, usually moral or spiritual, meaning.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-antihero-vs-villain',
    title: 'Antihero vs villain',
    category: 'literature',
    keywords: [
      'difference between an antihero and a villain', 'antihero vs villain', 'protagonist without heroic qualities',
      'antagonist', 'flawed central character', 'opposes the hero', 'morally grey', 'root for them anyway',
      'narrative role', 'Walter White Tony Soprano',
    ],
    content: `The difference is narrative role, not just how bad the character is.

An antihero is a PROTAGONIST — the central character whose goals the story follows — who lacks the traditional heroic virtues. They may be cynical, selfish, cowardly, criminal or morally compromised, and they often pursue questionable ends by questionable means. But the narrative is built around them and usually invites the audience to understand or even root for them. Examples: Walter White, Tony Soprano, Holden Caulfield, Humbert Humbert, the Man With No Name.

A villain is an ANTAGONIST — a character who exists mainly to oppose the protagonist and generate conflict. The villain is defined by their function as the obstacle and by (usually) clear malevolent intent. Examples: Sauron, Iago, Nurse Ratched, Hans Gruber.

So an antihero is "a bad-ish person at the centre of the story"; a villain is "the force working against whoever is at the centre." A single story can have an antihero protagonist AND a separate villain. And a well-written villain can be given depth without becoming an antihero, because the label is about position in the story, not complexity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lit2-subplot-vs-main-plot',
    title: 'Subplot vs main plot',
    category: 'literature',
    keywords: [
      'difference between a subplot and the main plot', 'subplot vs main plot', 'A-plot B-plot',
      'central storyline', 'secondary storyline', 'supporting characters', 'thematic echo',
      'converges with the main plot', 'not about novel versus novella',
    ],
    content: `The main plot (or A-plot) is the central chain of events driven by the protagonist's primary goal and the main conflict. It gets the most page time, opens and closes the story, and its resolution is the story's resolution.

A subplot (or B-plot) is a secondary storyline that runs alongside the main plot, usually involving supporting characters or a secondary goal of the protagonist. Subplots are shorter, are interrupted and resumed, and take up less space. Good subplots do one or more of: deepen a character, echo or contrast the main theme from another angle, complicate the main plot by pulling the protagonist in two directions, provide relief in pacing, or converge with the main plot near the climax so both pay off together.

Example: in "Pride and Prejudice" the main plot is Elizabeth and Darcy; the Jane–Bingley romance, Lydia's elopement, and Charlotte's marriage to Mr Collins are subplots that comment on marriage and reputation and feed back into the central story.

This is unrelated to the novel-versus-novella length distinction; a short story can have a subplot and a long novel can have none.`,
    createdAt: Date.now(),
  },
];
