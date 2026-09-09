import { KnowledgeItem } from '../../types';

// Batch 159 (grammar, language & literary terms, 40-question batch). nexus-4b
// was fine on metaphor vs simile, adjective vs adverb, affect/effect,
// its/it's, there/their/they're, subject/predicate, phrase vs clause, active
// vs passive, who/whom, comma splice, fewer/less, lie/lay, dashes, colon vs
// semicolon, that/which, subjunctive, homonym/homophone/homograph, Oxford
// comma, foreshadowing, iambic pentameter, farther/further, split
// infinitive, i.e./e.g. Failures: "conjunction / coordinating conjunctions"
// never listed them; "denotation vs connotation" and "simile vs
// personification" were web dumps; "first/second/third person narration" was
// misread as "the first second" of time; "gerund" and "complement vs
// compliment" came back BLANK; "stanza vs verse" and "allusion vs illusion"
// were imprecise.
export const GRAMMAR_LITERARY_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-gram-conjunctions',
    title: 'Conjunctions and the Coordinating Conjunctions (FANBOYS)',
    category: 'Grammar',
    keywords: [
      'what is a conjunction and what are the coordinating conjunctions fanboys subordinating correlative',
      'a conjunction is a word that joins other words phrases or clauses together not only whole sentences it shows the relationship between the parts it links there are three kinds',
      'coordinating conjunctions join two elements of equal grammatical rank two nouns two phrases or two independent clauses there are exactly seven remembered by the acronym fanboys for and nor but or yet so when one joins two independent clauses you put a comma before it i was tired but i kept working',
      'subordinating conjunctions join a dependent clause to an independent clause and show time cause condition or contrast because although since when if while unless after before until whereas correlative conjunctions work in pairs either or neither nor both and not only but also whether or',
    ],
    content: `A CONJUNCTION is a word that JOINS together words, phrases, or clauses and signals the logical relationship between them (addition, contrast, choice, cause, time, condition). It is not only for joining complete sentences. There are three types: (1) COORDINATING CONJUNCTIONS join two elements of EQUAL grammatical weight — two words, two phrases, or two independent (standalone) clauses. There are exactly SEVEN, remembered by the acronym FANBOYS: FOR (because), AND, NOR, BUT, OR, YET (but/nevertheless), SO (therefore). Punctuation rule: when a coordinating conjunction joins two INDEPENDENT clauses, put a comma BEFORE it — "I was exhausted, but I kept working." When it just joins two words or short phrases, no comma — "bread and butter." (2) SUBORDINATING CONJUNCTIONS join a DEPENDENT (subordinate) clause to an independent clause, making the dependent clause unable to stand alone and showing how it relates — time, cause, condition, concession, or contrast. Common ones: because, since, as, although, though, even though, while, whereas, if, unless, when, whenever, before, after, until, so that, in order that. If the dependent clause comes first, follow it with a comma ("Although it was raining, we went out"); if it comes second, usually no comma ("We went out although it was raining"). (3) CORRELATIVE CONJUNCTIONS work in matched PAIRS: either…or, neither…nor, both…and, not only…but also, whether…or, no sooner…than. The structures on each side of the pair should be parallel ("She is not only smart but also kind"). (A related group, "conjunctive adverbs" — however, therefore, moreover, nevertheless, consequently — also link ideas but are punctuated differently, needing a semicolon or full stop before them: "It was late; however, we continued.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gram-denotation-connotation',
    title: 'Denotation vs Connotation',
    category: 'Language',
    keywords: [
      'what is the difference between denotation and connotation literal meaning emotional association',
      'the denotation of a word is its strict literal dictionary definition the thing or concept it directly refers to with no feeling attached the connotation is the set of emotional cultural and associative meanings a word carries on top of its literal sense the feelings and ideas it suggests',
      'example the words house home residence dwelling and abode all have roughly the same denotation a building where someone lives but different connotations home suggests warmth family and belonging residence sounds formal and impersonal dwelling sounds plain or primitive',
      'connotations can be positive slender thrifty youthful curious neutral or negative skinny stingy childish nosy writers and advertisers choose words for their connotations pre owned instead of used freedom fighter versus terrorist for the same person understanding connotation is key to tone persuasion and poetry',
    ],
    content: `DENOTATION is a word's strict, literal, dictionary meaning — the specific thing, action, or concept it directly refers to, stripped of any feeling. The denotation of "snake" is "a long, limbless reptile." CONNOTATION is the cluster of emotional, cultural, and associative meanings a word carries ON TOP of its literal sense — the attitudes, images, and feelings it evokes. "Snake" connotes danger, deceit, and treachery (calling a person "a snake"). Two words can share almost the same denotation but have very different connotations: HOUSE, HOME, RESIDENCE, DWELLING, ABODE, and PAD all denote roughly "a place where someone lives," but "home" connotes warmth, family, and safety; "residence" is formal and impersonal; "dwelling" sounds bare or primitive; "pad" is casual and slangy. Connotations run from POSITIVE (slender, thrifty, youthful, assertive, curious, aroma) through NEUTRAL to NEGATIVE (skinny, stingy, childish, pushy, nosy, odour) — even when the denotation is identical. WHY IT MATTERS: writers, poets, politicians, and advertisers choose among near-synonyms precisely for their connotations — "pre-owned" instead of "used," "enhanced interrogation" instead of "torture," "freedom fighter" versus "terrorist" for the same person, "budget" versus "cheap." Poetry depends heavily on connotation to compress feeling into few words. Connotations also shift over time and vary between cultures and groups, so a word that is neutral to one audience may be loaded for another.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gram-narrative-person',
    title: 'First, Second, and Third Person Narration (Point of View)',
    category: 'Literature',
    keywords: [
      'what is the difference between first second and third person narration point of view pov narrator',
      'this is about WHO tells a story and the pronouns they use nothing to do with the first second of time',
      'first person narration the narrator is a character in the story telling it using i and we the reader is limited to what that narrator sees knows and feels and the narrator may be unreliable examples the catcher in the rye the hunger games moby dick call me ishmael',
      'second person narration the narrator addresses the reader as you making you the protagonist rare used for effect in interactive fiction and some literary novels third person narration the narrator is outside the story using he she they and names third person limited follows one characters thoughts third person omniscient knows the thoughts of all characters and can comment freely third person objective reports only what is visible like a camera',
    ],
    content: `Narrative "person" or POINT OF VIEW (POV) describes WHO is telling a story and which pronouns the narrator uses for the main character. (It has nothing to do with "the first second" of time.) FIRST PERSON: the narrator is a CHARACTER within the story, recounting events using "I" (or "we"). The reader is confined to that narrator's perceptions, knowledge, and biases, and cannot know anything the narrator doesn't — which allows for intimacy and for the "UNRELIABLE NARRATOR," whose account we learn to distrust. Examples: "The Catcher in the Rye," "The Great Gatsby" (Nick narrating), "Jane Eyre," "The Hunger Games," "Moby-Dick" ("Call me Ishmael"). SECOND PERSON: the narrator addresses the reader directly as "YOU," casting the reader as the protagonist ("You wake up and the house is silent"). It is rare and used for a disorienting or immersive effect — Choose-Your-Own-Adventure books, some short stories, Jay McInerney's "Bright Lights, Big City," Italo Calvino's "If on a winter's night a traveler." THIRD PERSON: the narrator stands OUTSIDE the story, referring to all characters as "he," "she," "they," and by name. It has sub-types: THIRD-PERSON LIMITED — the narrator follows and reveals the inner thoughts of just ONE character (most modern novels); THIRD-PERSON OMNISCIENT — an all-knowing narrator who can enter ANY character's mind, report events the characters don't witness, and comment directly (Tolstoy, Austen, much 19th-century fiction); THIRD-PERSON OBJECTIVE (dramatic) — the narrator reports only observable actions and dialogue, like a camera, entering no one's head (Hemingway's "Hills Like White Elephants"). Some works also shift POV between chapters. Tense (past vs present) is a separate choice from person.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gram-gerund',
    title: 'What a Gerund Is',
    category: 'Grammar',
    keywords: [
      'what is a gerund and how is it used verb ing form acting as a noun',
      'a gerund is the ing form of a verb that functions as a NOUN in a sentence it looks identical to a present participle but does a nouns job running swimming reading cooking',
      'a gerund can be the subject of a sentence swimming is good exercise the direct object i enjoy reading the object of a preposition she is good at drawing or a subject complement his hobby is cooking a gerund can take its own object and modifiers forming a gerund phrase eating too much sugar is bad for you',
      'to tell a gerund from a present participle check the job in she is running running is a participle part of the verb in running clears my head running is a gerund the noun subject verbs commonly followed by a gerund not an infinitive include enjoy avoid finish suggest mind consider practise keep',
    ],
    content: `A GERUND is the "-ing" form of a verb that is used as a NOUN. It is spelled identically to a present participle ("running," "swimming," "reading," "cooking"), but it does a noun's job in the sentence rather than acting as part of a verb or as an adjective. HOW GERUNDS ARE USED — anywhere a noun can go: • as the SUBJECT of a sentence: "Swimming is excellent exercise." "Smoking causes cancer." • as the DIRECT OBJECT of a verb: "I enjoy reading." "She avoided answering." • as the OBJECT OF A PREPOSITION: "He is good at drawing." "Thank you for helping." "We talked about moving." • as a SUBJECT COMPLEMENT (after a linking verb): "His favourite activity is cooking." A gerund can carry its own objects, modifiers, and even a subject, forming a GERUND PHRASE that as a whole works as a noun: "Eating too much sugar is bad for you." "I appreciate your taking the time." DISTINGUISHING A GERUND FROM A PRESENT PARTICIPLE (same form, different function): in "She is running," "running" is a participle completing the verb; in "Running clears my head," "running" is a gerund serving as the subject noun. In "the running water," it is a participle acting as an adjective. WHICH VERBS TAKE A GERUND: some verbs are normally followed by a gerund, not an infinitive — enjoy, avoid, finish, mind, suggest, recommend, consider, practise, deny, admit, keep (on), give up, can't help. Others take an infinitive (want, hope, decide, need, plan), and a few take either, sometimes with a change of meaning ("stop smoking" vs "stop to smoke").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gram-complement-compliment',
    title: 'Complement vs Compliment',
    category: 'Language',
    keywords: [
      'what is the difference between complement and compliment spelling meaning',
      'these two words sound the same but mean different things complement with an e in the middle means something that completes goes well with or perfects another thing or the act of completing as a verb the scarf complements her coat a good wine complements the meal the two skill sets complement each other',
      'compliment with an i in the middle means a polite expression of praise admiration or congratulation as a noun or the act of praising as a verb she paid me a compliment he complimented my cooking compliments of the house means provided free as a courtesy',
      'memory aids complement completes both have an e compliment is something i like to give and receive it has an i also the adjectives complementary going together or free of charge and complimentary expressing praise or given free follow the same split',
    ],
    content: `COMPLEMENT and COMPLIMENT are homophones (they sound the same) but have unrelated meanings, distinguished by the middle letter — E or I. COMPLEMENT (with an E, as in "complete"): something that COMPLETES, perfects, or goes well with another thing — or, as a verb, the act of doing so. "A crisp white wine complements the fish." "The blue scarf complements her coat." "Their skills complement each other" (each supplies what the other lacks). "The team has a full complement of players" (the complete number needed). In grammar, a "complement" is a word or phrase that completes the meaning of a verb ("She is a doctor" — "a doctor" is the subject complement). In geometry, "complementary angles" add to 90°. COMPLIMENT (with an I): a polite expression of PRAISE, admiration, or congratulation (noun), or the act of offering it (verb). "He paid her a compliment on her presentation." "She complimented my cooking." "My compliments to the chef." "Compliments of the house" / "with the manager's compliments" means given free as a courtesy or gesture of goodwill. MEMORY AIDS: "complement" and "complete" both start "comple-"; a compliment is something "I" like to give and receive (both have an I). The adjective forms follow the same split: COMPLEMENTARY means "combining well to form a whole" or "provided free" (a complementary colour; a complementary breakfast is a misspelling), while COMPLIMENTARY means "expressing praise" or "given free of charge" (a complimentary review; complimentary drinks). Both free-of-charge senses exist, which is a common source of confusion, but the "free" sense is standardly spelled COMPLIMENTARY.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gram-figurative-language',
    title: 'Simile, Metaphor, and Personification',
    category: 'Literature',
    keywords: [
      'what is the difference between a simile and personification metaphor figurative language',
      'these are all types of figurative language that describe something by comparison rather than literally',
      'a simile compares two different things explicitly using the words like or as her smile was like sunshine he is as brave as a lion a metaphor makes the comparison directly by stating that one thing IS another without like or as her smile was sunshine he is a lion time is a thief',
      'personification gives human qualities actions or emotions to something that is not human an animal an object an idea or a force of nature the wind howled the old house groaned opportunity knocked the flowers danced in the breeze it is a specific kind of metaphor applied to non human things related devices hyperbole deliberate exaggeration and analogy an extended comparison to explain something',
    ],
    content: `SIMILE, METAPHOR, and PERSONIFICATION are all forms of FIGURATIVE LANGUAGE — they describe something by imaginative comparison rather than literal statement. SIMILE: an EXPLICIT comparison between two unlike things, using the words "LIKE" or "AS" (or "than," "resembles"). "Her smile was like sunshine." "He is as brave as a lion." "The water was as smooth as glass." "She sings like an angel." The signposting word ("like"/"as") is what marks it as a simile. (Note: not every "like" makes a simile — "a dog like mine" is a literal comparison of two dogs.) METAPHOR: a comparison stated DIRECTLY, by saying that one thing IS another (or by substituting one for the other), WITHOUT "like" or "as." "Her smile was sunshine." "He is a lion in battle." "Time is a thief." "The classroom was a zoo." "Drowning in paperwork." A metaphor is bolder and more absolute than a simile; an "extended metaphor" is sustained over several lines or a whole work. PERSONIFICATION: giving HUMAN qualities, actions, or emotions to something non-human — an animal, an object, an abstract idea, or a force of nature. "The wind howled through the trees." "The old floorboards groaned." "Opportunity knocked." "The sun smiled down." "Fear gripped her." "The daffodils danced in the breeze" (Wordsworth). Personification is really a specific kind of metaphor, applied to the non-human. RELATED DEVICES: HYPERBOLE (deliberate exaggeration for effect — "I've told you a million times"); ANALOGY (a longer, explanatory comparison used to clarify an idea); METONYMY (naming something by an associated thing — "the crown," "the White House"); and IDIOM (a fixed expression whose meaning isn't literal — "break the ice").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gram-stanza-verse-line',
    title: 'Stanza vs Verse vs Line in Poetry',
    category: 'Literature',
    keywords: [
      'what is the difference between a stanza and a verse poetry line strophe',
      'a line is the most basic unit of a poem a single row of words the poet chooses where it ends the line break which need not match a sentence a stanza is a group of lines set off as a unit usually separated from the next group by a blank line it is the poetic equivalent of a paragraph named by line count couplet 2 tercet 3 quatrain 4',
      'verse is the tricky word it has three uses one a single line of poetry two loosely a stanza especially of a hymn or song sing the second verse three poetry or metrical composition in general as opposed to prose blank verse free verse light verse',
      'so stanza always means a group of lines line always means one row verse depends on context in song lyrics verse usually means a stanza and contrasts with the chorus in literary analysis verse usually means poetry as a form',
    ],
    content: `LINE: the most basic unit of a poem — a single row of words. The poet decides where each line ends (the "line break" or "line ending"), and it need NOT coincide with the end of a sentence or clause; when a sentence runs past the line break into the next line, that is "enjambment," and when it stops at the line end, "end-stopped." Lines are counted for metre (a pentameter line has five feet). STANZA: a group of lines set off as a unit, normally separated from the next group by a blank line — the poetic equivalent of a PARAGRAPH. Stanzas often share a repeating pattern of line count, metre, and rhyme scheme. They are named by their number of lines: couplet (2), tercet or triplet (3), quatrain (4), quintain (5), sestet (6), septet (7), octave (8). (The Italian word for stanza is "strophe.") VERSE: the word with three distinct meanings, which is why it causes confusion. (1) A single LINE of poetry ("Give me a verse of that poem"). (2) Loosely, a STANZA — especially of a hymn, ballad, or song ("Let's sing the second verse"); numbered Bible verses also use this sense. (3) POETRY or metrical/patterned composition IN GENERAL, as opposed to PROSE — hence "blank verse" (unrhymed iambic pentameter), "free verse" (no regular metre or rhyme), "light verse," "verse drama," and "a novel in verse." SO: "stanza" always means a group of lines; "line" always means one row of words; "verse" means a line, a stanza, or poetry-as-a-form depending on context — in song lyrics it usually means a stanza (and contrasts with the "chorus"/"refrain"), while in literary criticism it usually means poetry as a medium.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gram-allusion-illusion',
    title: 'Allusion vs Illusion (vs Delusion vs Elusion)',
    category: 'Language',
    keywords: [
      'what is the difference between an allusion and an illusion delusion reference false perception',
      'an allusion with an a is an indirect brief reference to a well known person place event work of art or piece of literature or scripture that the writer expects the reader to recognise without it being explained calling someone a scrooge is an allusion to dickens describing a journey as an odyssey alludes to homer',
      'an illusion with an i is a false or misleading perception of reality something that appears to be one way but is not an optical illusion a magicians illusion the illusion of choice your senses or your mind are deceived',
      'two more of the same family a delusion is a false belief firmly held despite clear evidence against it delusions of grandeur it is in the mind not the senses to elude something rare as a noun elusion is to escape or evade it the criminal eluded capture memory aid ALLude and ALLusion both hint at something ALL readers should know an ILLusion makes you ILL informed about what is real',
    ],
    content: `ALLUSION (with an A) is a brief, INDIRECT REFERENCE to a well-known person, place, historical event, myth, work of art, book, film, or passage of scripture — made without explanation, on the assumption that the reader or listener will recognise it and bring its associations to the new context. Calling a miser "a Scrooge" alludes to Dickens's "A Christmas Carol"; describing a long, difficult journey as "an odyssey" alludes to Homer; "he met his Waterloo" alludes to Napoleon's final defeat; "the whole affair was a real Catch-22" alludes to Heller's novel. Allusions let writers evoke a large idea economically and reward an informed audience. ILLUSION (with an I) is a FALSE or MISLEADING PERCEPTION — something that appears to be real or to be one way, but is not. An OPTICAL illusion tricks the eye (lines that look unequal but are the same length; a mirage); a stage magician performs "illusions"; "the film created the illusion of depth"; "he was under the illusion that everyone liked him" (a mistaken impression). The deception is in what your senses or first impression tell you. RELATED WORDS in the same family: a DELUSION is a false BELIEF held firmly despite clear contrary evidence — a fixed error of the mind rather than the senses ("delusions of grandeur," and in psychiatry a symptom of psychosis). To ELUDE is to escape or evade ("the fugitive eluded the police"; "the answer eludes me"); its rare noun is "elusion," and the adjective "elusive" means hard to catch or pin down. MEMORY AID: ALLusion points to something ALL well-read people are expected to know; an ILLusion leaves you ILL-informed about what is real; a deLUSION is a LOOSE grip on the truth.`,
    createdAt: Date.now(),
  },
];
