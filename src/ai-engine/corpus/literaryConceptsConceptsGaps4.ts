import { KnowledgeItem } from '../../types';

/**
 * LITERARY_CONCEPTS_CONCEPTS_GAPS_4 — batch 249 corrections.
 * nexus-4b is strong on literary terms. Misses:
 * - "fiction vs nonfiction" was garbled: conflated the film "Pulp Fiction"
 *   with nonfiction and rambled about memoir.
 * - "voice vs style" never contrasted the two, drifted into "tone".
 * - "imagery vs symbolism" used "time is a thief" (a metaphor) as its example
 *   of symbolism.
 * - "climax vs resolution" said the climax is "where the conflict gets sorted
 *   out" (that is the resolution).
 * - "sonnet vs ode" said an ode has "no rhyme scheme" (many odes rhyme).
 * - "theme vs motif", "plot vs narrative", "allegory vs fable", "symbol vs
 *   metaphor" were cut off before the second half.
 * - "stanza vs verse" conflated the several meanings of "verse".
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'literature', keywords, content, createdAt: now,
});

export const LITERARY_CONCEPTS_CONCEPTS_GAPS_4: KnowledgeItem[] = [
  k(
    'kb-gap-lit4-fiction-vs-nonfiction',
    'Fiction vs nonfiction',
    [
      'difference between fiction and nonfiction', 'fiction is narrative that is invented or imagined events characters and dialogue come from the authors imagination even if inspired by reality novels short stories', 'nonfiction is writing that presents itself as factually true real people real events verifiable information biography history journalism essays memoir textbooks',
      'the core distinction is the truth claim the contract with the reader', 'creative nonfiction based on a true story disputed memoirs are the blurry zones',
    ],
    `The dividing line is the TRUTH CLAIM — the implicit contract between the writer and the reader.

FICTION is narrative that is INVENTED. The story, the characters, and the dialogue come from the author's imagination. It may be grounded in real settings, real history, or the author's own experience, but the reader understands that it is a made-up world and does not hold it to a standard of factual accuracy. Novels, novellas, short stories, most plays and narrative poems are fiction. Its "truth" is emotional, thematic, or about the human condition, not literal.

NONFICTION is writing that presents itself as FACTUALLY TRUE — about real people, real events, and verifiable information. The reader expects the writer to have got the facts right and not to have made things up. It covers a huge range: biography and autobiography, MEMOIR, history, journalism and reportage, the personal and critical essay, science and self-help books, travel writing, textbooks, and how-to guides.

Blurry zones: HISTORICAL FICTION and "based on a true story" novels invent freely around real events; CREATIVE NONFICTION (literary journalism, the personal essay) uses novelistic techniques — scene, dialogue, character — while still claiming to be true; and there have been famous scandals over MEMOIRS that turned out to be substantially fabricated, precisely because that breaks the nonfiction contract.`,
  ),
  k(
    'kb-gap-lit4-voice-vs-style',
    'Voice vs style (writing)',
    [
      'difference between voice and style', 'style is the writers characteristic choices at the level of language diction sentence structure figurative language punctuation rhythm the measurable how of the writing', 'voice is the distinctive personality and sensibility that comes through the writing the sense of a particular human attitude and worldview behind the words what makes a writer recognisable',
      'style is the toolkit voice is the person you hear using it', 'a writer can adjust style for different projects but voice tends to persist',
    ],
    `STYLE is the set of characteristic CHOICES a writer makes at the level of LANGUAGE — and it is largely measurable. It includes DICTION (formal or colloquial, plain or ornate, Latinate or Anglo-Saxon words), SENTENCE STRUCTURE (short and clipped vs long and subordinated), use of FIGURATIVE LANGUAGE, punctuation habits, paragraphing, and rhythm. Hemingway's spare declaratives and Faulkner's cascading clauses are style. A writer can deliberately shift style for different projects (a breezy blog post vs a formal report).

VOICE is the distinctive PERSONALITY that comes through the writing — the sense that a particular human sensibility, with its own attitude, values, humour, obsessions, and way of seeing, is behind the words. It is what makes a paragraph recognisable as a particular writer's even without a byline, and what makes a first-person narrator feel like a real person. Voice is created partly THROUGH style, but also through perspective, what the writer chooses to notice, their tone toward the reader, and their worldview.

Short version: style is the toolkit — the observable techniques; voice is the person you hear using it. Two writers can use a similar plain style and still have completely different voices.`,
  ),
  k(
    'kb-gap-lit4-imagery-vs-symbolism',
    'Imagery vs symbolism',
    [
      'difference between imagery and symbolism', 'imagery is descriptive language that appeals to the senses sight sound smell taste touch creating vivid mental pictures it works at the literal sensory level', 'symbolism is the use of an object image person or action to stand for an abstract idea or theme beyond its literal meaning',
      'imagery makes you experience the scene symbolism makes an element carry extra meaning', 'time is a thief is a metaphor not symbolism a recurring green light is symbolism',
    ],
    `IMAGERY is descriptive language that appeals to the SENSES — sight, sound, smell, taste, touch, and internal sensations like temperature and movement — so the reader can vividly experience the scene in their mind. "The salt wind stung her chapped lips"; "the kitchen smelled of cinnamon and burnt sugar." Imagery works at the LITERAL, sensory level; its job is to make a moment concrete and present. It does not necessarily "mean" anything beyond itself.

SYMBOLISM is when an object, image, character, place, or action is made to STAND FOR something abstract — an idea, a theme, an emotion — BEYOND its literal presence in the story, and (usually) it recurs and gathers meaning as the work goes on. The green light at the end of Daisy's dock in The Great Gatsby is a symbol (of Gatsby's yearning, the unreachable dream); a white whale, a scarlet letter, a caged bird are symbols.

They often work together (a vividly described image becomes a symbol through repetition and context), but they are different operations: imagery makes you SEE and FEEL; symbolism makes an element MEAN. (Note: "time is a thief" is a metaphor — a compressed comparison — not an example of symbolism.)`,
  ),
  k(
    'kb-gap-lit4-climax-vs-resolution',
    'Climax vs resolution',
    [
      'difference between climax and resolution', 'the climax is the turning point the moment of highest tension the decisive confrontation or choice where the outcome of the central conflict is determined', 'the resolution or denouement is everything after the climax the falling action that ties up loose ends shows the consequences and settles the characters into a new normal',
      'Freytag pyramid exposition rising action climax falling action resolution', 'the climax decides the resolution shows the aftermath',
    ],
    `In the standard dramatic structure (Freytag's pyramid: exposition, rising action, climax, falling action, resolution):

The CLIMAX is the TURNING POINT — the moment of GREATEST tension and the point at which the central conflict is DECIDED. It is the decisive confrontation, revelation, or choice that determines how things will come out: the final duel, the truth exposed, the protagonist making the irreversible decision. Everything in the rising action has built toward it, and after it the outcome is essentially settled even if not yet spelled out. It is emotionally the peak, not the wind-down.

The RESOLUTION (also called the denouement, from the French for "untying") is everything that comes AFTER the climax. It is the FALLING ACTION and conclusion: the consequences of the climax play out, loose ends and subplots are tied off, secrets are fully explained, and the characters settle into their new situation — the "new normal". Tension is released here, not created.

A common mistake is to say the conflict "gets sorted out" at the climax — the conflict is DECIDED at the climax; it gets SHOWN sorted out (tidied up, its effects felt) in the resolution.`,
  ),
  k(
    'kb-gap-lit4-sonnet-vs-ode',
    'Sonnet vs ode',
    [
      'difference between a sonnet and an ode', 'a sonnet is a fixed 14-line poem in iambic pentameter with a set rhyme scheme Petrarchan or Shakespearean and usually a volta or turn traditionally about love but not only', 'an ode is a longer lyric poem of serious elevated subject addressed to a person thing or abstract idea expressing praise or sustained meditation with varied often elaborate stanza forms',
      'many odes do rhyme Keats odes rhyme', 'Pindaric Horatian and irregular odes', 'the sonnet is short and tightly fixed the ode is longer and more flexible in form',
    ],
    `A SONNET is a FIXED FORM: exactly 14 lines, normally in iambic pentameter, with a set RHYME SCHEME. The two main types are the Petrarchan/Italian (an 8-line octave rhyming ABBAABBA, then a 6-line sestet) and the Shakespearean/English (three quatrains ABAB CDCD EFEF, then a closing couplet GG). Nearly all sonnets contain a VOLTA — a "turn" in thought or feeling, at line 9 in the Petrarchan or before the couplet in the Shakespearean. It works as a compact, argued meditation, traditionally on love but also on time, death, politics, or art.

An ODE is a LYRIC poem of SERIOUS, ELEVATED subject and tone, usually ADDRESSED to a person, an object, or an abstraction (a nightingale, autumn, a Grecian urn, duty, liberty), and expressing PRAISE or an extended, dignified reflection on it. It is generally LONGER than a sonnet and much more FLEXIBLE in form: the Pindaric ode uses grand three-part stanza groups; the Horatian ode uses a repeated matched stanza; the "irregular" ode invents its own stanza shapes. Most traditional odes DO rhyme (Keats's odes have intricate rhyme schemes) — it is a myth that an ode has no rhyme scheme; it simply is not fixed to one.

Short version: a sonnet is a tight 14-line fixed form with a turn; an ode is a longer, formally freer poem of elevated praise or meditation.`,
  ),
  k(
    'kb-gap-lit4-theme-vs-motif',
    'Theme vs motif',
    [
      'difference between a theme and a motif', 'a theme is the central idea insight or message about life that a work explores abstract and overarching ambition betrayal the corrupting nature of power', 'a motif is a recurring concrete element an image object phrase colour sound or situation that appears repeatedly through a work and helps develop and reinforce the themes',
      'in Macbeth blood is a motif ambition and guilt are themes', 'a motif is repeated and tangible a theme is abstract and stated as an idea',
    ],
    `A THEME is the central IDEA or insight about life, human nature, or society that a work explores — stated as an abstract concept or, better, as a claim. "Ambition unchecked by conscience destroys the ambitious"; "war dehumanises everyone it touches"; "you cannot escape the consequences of the past". A work usually has several themes in tension, and reasonable readers can disagree about exactly what they are. A theme is not something a single sentence "contains"; it is what the whole work adds up to.

A MOTIF is a RECURRING, concrete ELEMENT — a specific image, object, phrase, colour, sound, gesture, or type of situation — that appears again and again through the work. Motifs are TANGIBLE and REPEATED, and their job is to build and reinforce the themes and unify the work. In Macbeth, BLOOD, sleeplessness, darkness, and equivocation ("fair is foul") are motifs; in The Great Gatsby, the colour green, eyes/spectacles, and cars are motifs.

The relationship: motifs are the repeated concrete threads a writer weaves through a text; the themes are the abstract meaning those threads help create. Motif = what recurs; theme = what it means.`,
  ),
  k(
    'kb-gap-lit4-plot-vs-narrative',
    'Plot vs narrative (vs story)',
    [
      'difference between plot and narrative', 'the plot is the sequence of events and their causal connections what happens and why', 'the narrative is the way that story is told the selection arrangement and presentation of events narrative voice order in medias res flashbacks pacing what is shown summarised or withheld',
      'story or fabula is the raw chronological events plot adds causality narrative is the discourse the telling', 'the king died then the queen died of grief is a plot',
    ],
    `Three related terms, from the raw material to the finished telling:

STORY (sometimes "fabula") is the raw material: all the events that happen, in their real chronological order — everything that "occurred" in the world of the work, whether or not it is shown.

PLOT is the story organised by CAUSALITY and dramatic shape — what happens AND WHY, arranged so events lead to each other. E.M. Forster's classic distinction: "the king died and then the queen died" is a story; "the king died, and then the queen died of grief" is a plot (the second event is caused by the first).

NARRATIVE (or "narrative discourse") is HOW that plot is actually TOLD on the page: which events are shown in scene, which are summarised, which are withheld and revealed later; the ORDER of telling (starting in the middle, flashbacks, flash-forwards, non-linear structure); the NARRATOR and point of view; the PACING; and the framing. Two novels can share the same plot but be completely different narratives because of these choices.

Short version: story = the events; plot = the events linked by cause and shaped into a dramatic arc; narrative = the telling of it, with all the choices of voice, order, and emphasis.`,
  ),
  k(
    'kb-gap-lit4-allegory-vs-fable',
    'Allegory vs fable',
    [
      'difference between an allegory and a fable', 'a fable is a very short simple story usually with talking animals that teaches one explicit moral lesson often stated at the end Aesop', 'an allegory is an extended narrative in which characters settings and events consistently represent abstract ideas or real people and events on a second level so the whole surface story is a sustained metaphor',
      'a fable is short with one clear moral an allegory is a systematic parallel running throughout Animal Farm Pilgrims Progress', 'a fable is arguably a tiny simple allegory',
    ],
    `A FABLE is a very SHORT, SIMPLE story — often only a paragraph or two — usually featuring ANIMALS (or occasionally plants or objects) that talk and behave like people, and it teaches ONE clear MORAL lesson, frequently spelled out explicitly at the end ("slow and steady wins the race"; "do not count your chickens before they hatch"). Aesop's fables and the fables of La Fontaine are the models. The animals are simple stand-ins for human types (the vain crow, the industrious ant), and the point is didactic and unmistakable.

An ALLEGORY is an EXTENDED narrative — it can run a whole novel, poem, or play — in which the characters, settings, objects, and events CONSISTENTLY and systematically represent something else on a SECOND level: abstract concepts, or specific real people and historical events. The entire surface story functions as a sustained METAPHOR, and reading it means decoding the parallel throughout. Orwell's Animal Farm allegorises the Russian Revolution (Napoleon = Stalin, the farm = the USSR, the rebellion = 1917); Bunyan's The Pilgrim's Progress allegorises the Christian's journey to salvation (characters named Christian, Faithful, Hopeful; places named the Slough of Despond, Vanity Fair).

The relationship: a fable is essentially a very short, plain allegory with a single moral; an allegory is longer, more complex, and sustains its double meaning across the whole work rather than delivering one tidy lesson.`,
  ),
  k(
    'kb-gap-lit4-symbol-vs-metaphor',
    'Symbol vs metaphor',
    [
      'difference between a symbol and a metaphor', 'a metaphor is a figure of speech a compressed comparison stating one thing is another usually local a single expression making an implicit comparison to illuminate a quality', 'a symbol is an object person image or action that stands for an abstract idea beyond itself typically recurring and accruing meaning through a work while keeping its literal existence',
      'her eyes were oceans is a metaphor the green light in Gatsby is a symbol', 'a metaphor is a comparison a symbol is a thing that carries meaning',
    ],
    `A METAPHOR is a FIGURE OF SPEECH — a compressed, implicit COMPARISON that states (or implies) that one thing IS another, in order to transfer a quality or feeling: "her eyes were deep oceans", "the classroom was a zoo", "he drowned in paperwork". A metaphor is usually LOCAL — a single phrase or sentence — and its two terms are both named or clearly implied. It works by making you see A in terms of B.

A SYMBOL is an OBJECT, image, person, place, or action within the world of the work that STANDS FOR something abstract beyond itself — an idea, a theme, an emotion — while still existing literally in the story. Symbols typically RECUR and gather meaning as the work develops, and a rich symbol can point to several things at once. The green light in The Great Gatsby, the whale in Moby-Dick, the conch in Lord of the Flies, a dove for peace, a road for life's journey.

Key differences: a metaphor is a way of PHRASING something (a comparison in the language); a symbol is a THING in the narrative that carries extra meaning. A metaphor says "A is B" and is done; a symbol is "A, which also means B and C" and keeps working across the text. And a symbol still literally exists (there really is a green light); the "oceans" in the metaphor do not.`,
  ),
  k(
    'kb-gap-lit4-stanza-vs-verse',
    'Stanza vs verse',
    [
      'difference between a stanza and a verse', 'a stanza is a grouped set of lines in a poem set off by a blank line functioning like a paragraph couplet tercet quatrain', 'verse has three meanings a single line of poetry or a stanza especially in songs and hymns or poetry and metrical writing in general as opposed to prose',
      'the second verse of a hymn is a stanza free verse verse drama means poetry not prose', 'stanza is the precise technical term for a line group',
    ],
    `A STANZA is the precise technical term: a GROUP of lines in a poem, set off from other groups by a blank line, functioning like a paragraph in prose. Stanzas are often named by their line count — couplet (2), tercet (3), quatrain (4), quintain (5), sestet (6), octave (8) — and may share a fixed metre and rhyme scheme. "The poem has five quatrains."

VERSE is a looser word with THREE common meanings:
1. a SINGLE LINE of poetry ("quote me a verse or two");
2. a STANZA, especially in the context of SONGS, HYMNS, and scripture ("let's sing the second verse" means the second stanza; "chapter and verse");
3. POETRY or metrical composition IN GENERAL, as opposed to prose — "free verse", "blank verse", "verse drama", "light verse", "he writes in verse".

So in a poetry-analysis context, use STANZA for a group of lines; "verse" in that setting usually means a single line or poetry-as-a-mode. In a song or hymn context, "verse" typically means what a poem would call a stanza (and is contrasted with the "chorus").`,
  ),
];
