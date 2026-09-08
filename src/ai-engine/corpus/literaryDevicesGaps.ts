import { KnowledgeItem } from '../../types';

// Batch 86 (literary devices & terms). nexus-4b misses: "what is a haiku"
// answered about Haiku the open-source operating system; "iambic pentameter",
// "alliteration", and "dramatic irony" were raw web dumps; "what is
// foreshadowing" answered about the One Piece anime; "what is a bildungsroman"
// was one thin line about Jane Eyre; "tragedy in the classical sense" listed
// the Greek playwrights but never mentioned Aristotle, hamartia, or catharsis.
export const LITERARY_DEVICES_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-iambic-pentameter',
    title: 'What Iambic Pentameter Is',
    category: 'Literature',
    keywords: [
      'what is iambic pentameter', 'iamb unstressed stressed da-dum', 'five iambs ten syllables per line', 'blank verse unrhymed iambic pentameter',
      'shakespeare iambic pentameter', 'but soft what light through yonder window breaks scansion', 'metre in english poetry',
    ],
    content: `Iambic pentameter is the most common metre (rhythmic pattern) in English poetry. An "iamb" is a two-syllable unit with the stress on the second syllable — da-DUM — as in "be-LOW," "a-BOUT," or "the SUN." "Penta" means five, so an iambic pentameter line contains five iambs: ten syllables that alternate unstressed-STRESSED five times. Scanned out, the opening of Romeo and Juliet's balcony scene goes "But SOFT / what LIGHT / through YON / der WIN / dow BREAKS." It is the standard line of Shakespeare's plays and sonnets, Milton's Paradise Lost, Wordsworth, and most traditional English verse, because it sits close to the natural rhythm of spoken English while still feeling shaped. Iambic pentameter with no rhyme scheme is called "blank verse"; with rhyming couplets it becomes "heroic couplets." Poets deliberately break the pattern (an extra syllable, a reversed foot) for emphasis or naturalness.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-haiku-poetry',
    title: 'What a Haiku Is',
    category: 'Literature',
    keywords: [
      'what is a haiku', 'haiku 5 7 5 syllables three lines', 'japanese short poem kigo kireji', 'haiku seasonal reference cutting word',
      'basho buson issa haiku', 'english haiku syllable count', 'haiku single vivid moment nature',
    ],
    content: `A haiku is a very short form of poetry that originated in Japan; it has nothing to do with the open-source operating system of the same name. The traditional Japanese form has 17 sound-units ("on" or morae) arranged in three phrases of 5, 7, and 5, and usually includes a "kigo" (a word that signals the season) and a "kireji" (a "cutting word" that creates a pause and sets two images against each other). The aim is to capture a single sharp moment of perception — often in nature — with immediacy, restraint, and no explicit commentary, leaving the reader to feel the resonance. English-language haiku conventionally use three lines of 5, 7, and 5 syllables, though many modern poets treat that loosely and focus instead on brevity, concrete imagery, and a two-part juxtaposition. The great classical haiku masters are Bashō, Buson, and Issa.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-alliteration-device',
    title: 'What Alliteration Is',
    category: 'Literature',
    keywords: [
      'what is alliteration', 'repetition of initial consonant sounds', 'peter piper picked a peck', 'alliteration vs assonance consonance',
      'alliteration in beowulf old english', 'why do writers use alliteration', 'tongue twisters alliteration',
    ],
    content: `Alliteration is the repetition of the same consonant sound at the beginning of two or more nearby words — "Peter Piper picked a peck of pickled peppers," "the wild and windy west." Writers use it to draw attention to a phrase, create rhythm and musical texture, make lines memorable, and sometimes to echo meaning (soft s-sounds for calm, hard k- and t-sounds for violence). It is deep in the history of English: Old English poetry such as Beowulf was built on alliteration rather than end-rhyme, with stressed alliterating syllables holding each line together. It is everywhere in tongue-twisters, brand names, newspaper headlines, character names (Peter Parker, Severus Snape), and fixed phrases ("safe and sound," "busy as a bee," "last but not least"). Related sound devices: assonance (repeated vowel sounds, "the rain in Spain") and consonance (repeated consonants anywhere in a word, "pitter-patter").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dramatic-irony',
    title: 'What Dramatic Irony Is',
    category: 'Literature',
    keywords: [
      'what is dramatic irony', 'audience knows what a character does not', 'dramatic irony examples oedipus romeo juliet',
      'dramatic vs verbal vs situational irony', 'suspense from dramatic irony', 'horror film killer behind the door irony',
    ],
    content: `Dramatic irony is the situation in which the audience or reader knows something important that one or more characters do not, so we watch them speak and act on incomplete or mistaken information. The gap between what we know and what they know generates suspense, tension, tragic pathos, or dark comedy. Classic examples: in Sophocles' Oedipus Rex, the audience knows from the start that Oedipus is himself the murderer he has vowed to hunt down; in Romeo and Juliet, we know Juliet has only taken a sleeping potion, but Romeo believes she is dead and kills himself beside her; in a thriller, we see the killer waiting behind the door that the character is about to open. It is distinct from VERBAL irony (a speaker saying the opposite of what they mean, often sarcastically) and SITUATIONAL irony (an outcome that is the opposite of what was expected or intended).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-foreshadowing',
    title: 'What Foreshadowing Is',
    category: 'Literature',
    keywords: [
      'what is foreshadowing', 'hints and clues about later events', 'chekhovs gun principle', 'direct vs subtle foreshadowing',
      'foreshadowing builds suspense and unity', 'prophecy as foreshadowing', 'foreshadowing vs red herring',
    ],
    content: `Foreshadowing is a technique in which a writer plants hints or clues early in a story about something that will happen later, so that when the later event arrives it feels earned and inevitable rather than arbitrary, and a reader going back through the text can see the groundwork. It has nothing to do with any particular anime. Foreshadowing can be direct — a prophecy, a character's stated fear, an ominous warning — or subtle: a recurring object or image, an offhand remark, the weather, a title, a minor detail that only gains significance in hindsight. A related principle is "Chekhov's gun": every element introduced with emphasis should pay off (if a loaded rifle hangs on the wall in the first act, it must be fired by the last). Foreshadowing builds suspense and gives a plot unity and shape. It is the opposite of a "red herring," which is a clue deliberately planted to mislead the reader.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bildungsroman',
    title: 'What a Bildungsroman Is',
    category: 'Literature',
    keywords: [
      'what is a bildungsroman', 'coming of age novel formation education', 'goethe wilhelm meister bildungsroman origin',
      'bildungsroman examples great expectations catcher in the rye', 'protagonist psychological moral growth', 'loss of innocence identity novel',
    ],
    content: `A bildungsroman (German for "novel of formation" or "education novel") is a coming-of-age story that follows a single protagonist, usually from childhood or adolescence into adulthood, through the process of psychological and moral development: a search for identity, a loss of innocence, a series of formative experiences, mistakes, and disillusionments, a conflict between the individual and society, and eventual maturity and a settled place in the world. The genre is generally traced to Goethe's "Wilhelm Meister's Apprenticeship" (1795). Well-known examples in English include "Jane Eyre," "David Copperfield," "Great Expectations," "A Portrait of the Artist as a Young Man," "The Catcher in the Rye," "To Kill a Mockingbird," "Little Women," and "The Kite Runner." A variant that focuses specifically on an artist's growth is called a Künstlerroman.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-classical-tragedy',
    title: 'What Tragedy Means in the Classical Sense',
    category: 'Literature',
    keywords: [
      'what is a tragedy in the classical sense', 'aristotle poetics tragedy definition', 'hamartia tragic flaw hubris', 'catharsis pity and fear',
      'peripeteia anagnorisis reversal recognition', 'greek tragedy chorus oedipus', 'downfall of a person of high status',
    ],
    content: `In the classical sense, a tragedy is a serious drama that depicts the downfall of a dignified protagonist — traditionally a person of high rank, such as a king or hero — brought about by a combination of fate, the will of the gods, and the character's own "hamartia" (a fatal error of judgement or character flaw, often "hubris," destructive pride). The touchstone definition is Aristotle's "Poetics." He describes the key structural moments as "peripeteia" (a sudden reversal of the protagonist's fortune, from good to bad) and "anagnorisis" (the moment of recognition, when the protagonist grasps the terrible truth — as when Oedipus realises he has killed his father and married his mother). The purpose, Aristotle argued, is "catharsis": by arousing pity and fear in the audience and then resolving them, the play produces an emotional cleansing. Greek tragedies (Aeschylus's Oresteia, Sophocles's Oedipus Rex and Antigone, Euripides's Medea and The Bacchae) were performed at festivals of Dionysus, used a chorus to comment on the action, and generally observed unity of time, place, and action.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tone-vs-mood',
    title: 'The Difference Between Tone and Mood',
    category: 'Literature',
    keywords: [
      'what is the difference between tone and mood', 'tone is the authors attitude', 'mood is the feeling in the reader', 'atmosphere vs tone',
      'how word choice creates tone', 'setting imagery pacing create mood', 'tone examples ironic bitter affectionate',
    ],
    content: `TONE is the writer's or narrator's attitude toward the subject matter or the audience, conveyed through word choice (diction), sentence structure, and which details are included or withheld. Tone can be ironic, affectionate, bitter, nostalgic, detached, playful, contemptuous, solemn, or admiring. MOOD (also called atmosphere) is the emotional feeling the writing produces IN the reader — eerie, tense, melancholy, hopeful, cozy, oppressive, joyful — created largely by setting, imagery, pacing, and sound. The two are related but separate, and a skilled writer can play them against each other: a calm, understated, almost cheerful tone can be used to build a deeply unsettling mood. A quick test: tone answers "how does the author seem to feel about this?"; mood answers "how does reading this make me feel?"`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-prose-vs-poetry',
    title: 'The Difference Between Prose and Poetry',
    category: 'Literature',
    keywords: [
      'what is the difference between prose and poetry', 'prose sentences paragraphs natural speech', 'poetry lines stanzas rhythm imagery',
      'line breaks poetic device', 'prose poetry and free verse blur the line', 'why is poetry more compressed than prose',
    ],
    content: `Prose is language written the way it is normally spoken — in complete sentences grouped into paragraphs, running continuously to the edge of the page, with the structure driven by grammar and logical flow. Novels, short stories, essays, news articles, and this explanation are prose. Poetry is language deliberately arranged in lines (and often stanzas), where the writer chooses each word and line break for compression, rhythm, sound (metre, rhyme, alliteration, assonance), and image, so that how something is said carries as much weight as what is said. A single line of poetry may hold what a paragraph of prose would spell out. The line break itself is a tool — it can create emphasis, surprise, a pause, or a second meaning. The boundary is not absolute: "prose poetry" has poetic density and imagery but no line breaks, and much modern free verse can look, on the page, like ordinary prose chopped into lines — the difference then lies in the concentration of attention and sound.`,
    createdAt: Date.now(),
  },
];
