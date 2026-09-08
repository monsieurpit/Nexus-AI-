import { KnowledgeItem } from '../../types';

// Batch 62 (English grammar & usage) gap-fills. Strong category (~15/25). Live
// misses on nexus-4b: "what is the rule for a versus an" -> "the rule of law is
// basically... no one's above it" (rule-of-law bleed); "difference between
// i.e. and e.g." -> a "difference in differences" econometrics web dump;
// "imply versus infer" -> a "just-noticeable difference" psychophysics dump;
// "into versus in to" -> "'in to' is just wrong"; "double negative" -> "the
// double-slit experiment shows particles going through two slits"; "that
// versus which" -> "which asks a question about choosing between options."
export const ENGLISH_GRAMMAR_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-a-vs-an',
    title: 'The Rule for "A" vs "An"',
    category: 'Grammar',
    keywords: [
      'what is the rule for a versus an', 'a or an', 'when do you use an', 'is it a hour or an hour',
      'a university or an university', 'a vs an before abbreviations', 'a historic or an historic',
    ],
    content: `Use "an" before a word that begins with a vowel SOUND, and "a" before a word that begins with a consonant SOUND. The key is the sound, not the letter. So it's "a dog," "a book," but "an apple," "an egg." The tricky cases are where the spelling and the sound don't match: "an hour," "an honest mistake," "an heir" (the "h" is silent, so the word starts with a vowel sound); but "a university," "a European," "a one-time offer," "a unicorn" (these start with a "y" or "w" consonant sound, "yoo-", "wun-"). Before initials and acronyms, go by how you say the first letter: "an FBI agent" ("ef-"), "an MRI," "an X-ray," but "a UN resolution" ("yoo-en"), "a NASA project." ("A historic" and "an historic" are both accepted, because some speakers weaken the "h.") (This has nothing to do with the "rule of law.")`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ie-vs-eg',
    title: 'The Difference Between "i.e." and "e.g."',
    category: 'Grammar',
    keywords: [
      'what is the difference between i.e. and e.g.', 'ie vs eg', 'when to use i.e.', 'when to use e.g.',
      'id est exempli gratia', 'do you put a comma after i.e.', 'i.e. means that is',
    ],
    content: `Both are Latin abbreviations used in writing. "e.g." stands for "exempli gratia," meaning "for example" — it introduces one or more examples that are a sample of a larger set: "citrus fruits (e.g. lemons and oranges)" implies there are others. "i.e." stands for "id est," meaning "that is" or "in other words" — it introduces a restatement, definition or clarification of exactly what you just said, not an example: "my youngest sibling (i.e. Sam) is coming" names the one specific person. Memory tricks: e.g. = "example given"; i.e. = "in essence" / "in other words." In American style you normally put a comma after each ("e.g.,"); British style often omits it. They're best kept for parentheses and notes; in flowing prose, spell out "for example" or "that is." A common mistake is using "i.e." when you mean "e.g." (giving an example, not a full restatement). (Not to be confused with "difference in differences," a statistics method.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-imply-vs-infer',
    title: 'The Difference Between "Imply" and "Infer"',
    category: 'Grammar',
    keywords: [
      'what is the difference between imply and infer', 'imply vs infer', 'does the speaker imply or infer',
      'inference vs implication', 'are you implying something', 'i infer from what you said',
    ],
    content: `The two words describe opposite ends of the same act of communication. The SPEAKER or writer (or a situation, a text, evidence) IMPLIES something — hints at it, suggests it, communicates it without stating it outright. The LISTENER or reader INFERS something — draws a conclusion, works out a meaning, from what was said or from evidence. So: "When she said she had 'other plans,' she was implying that she didn't want to come" — and — "From her tone, I inferred that she didn't want to come." A clean way to keep them apart: you imply by putting something IN (into your words); you infer by taking something OUT (out of what you heard). It's a common error to say "Are you inferring that I'm lying?" when the correct word is "implying." A noun pair matches: an implication is what's hinted; an inference is the conclusion drawn. (Nothing to do with "correlation does not imply causation" or perception thresholds.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-into-vs-in-to',
    title: 'The Difference Between "Into" and "In To"',
    category: 'Grammar',
    keywords: [
      'what is the difference between into and in to', 'into vs in to', 'is it log into or log in to', 'turn yourself in to the police',
      'when is into one word', 'came in to help or into help', 'i\'m into music one word',
    ],
    content: `"Into" (one word) is a preposition that shows movement toward the inside of something, transformation, or contact: "she walked into the room," "the tadpole turned into a frog," "he crashed into the fence," and informally "I'm really into jazz" (interested in). "In to" (two words) is used when "in" belongs with the verb before it (as part of a phrasal verb or an adverb) and "to" is a separate word — usually introducing an infinitive or a following noun. Examples where two words are correct: "she came IN TO help" (came in, in order to help), "he turned himself IN TO the police" (turned himself in, to the police), "please log IN TO the website" (log in, to the site — Microsoft and many style guides prefer "log in to," though "log into" is widely used), "I stopped IN TO say hello." Quick test: if you could put a pause or "in order" after "in," it's two words. Contrast "she turned into a monster" (became one) with "she turned in to the driveway" (turned in, to the driveway).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-that-vs-which',
    title: 'The Difference Between "That" and "Which"',
    category: 'Grammar',
    keywords: [
      'what is the difference between that and which', 'that vs which restrictive clause', 'when do you use a comma before which',
      'defining vs non-defining relative clause', 'the car that i bought vs the car which i bought', 'that which grammar rule',
    ],
    content: `In careful American usage, the difference is about whether the extra information is essential. Use "that" (with NO commas) for a RESTRICTIVE (defining) clause — one that identifies which thing you mean and can't be removed without changing the sentence: "The car that I bought last week is in the shop" (there are other cars; this specifies which). Use "which" (WITH commas around the clause) for a NON-RESTRICTIVE (non-defining) clause — extra, parenthetical information that could be dropped: "My car, which I bought last week, is in the shop" (you have one car; the middle part is just a bonus fact). A simple test: if you can put the clause in parentheses or drop it and still know what's being talked about, use "which" and commas; if removing it makes the sentence vague, use "that" and no commas. British English is more relaxed and often allows "which" for restrictive clauses too. For people, use "who" rather than "that" or "which." (It's not about "that" being specific and "which" being for questions.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-double-negative',
    title: 'What a Double Negative Is in English',
    category: 'Grammar',
    keywords: [
      'what is a double negative in english', 'do double negatives cancel out', 'i didnt do nothing', 'double negative meaning',
      'is a double negative grammatically wrong', 'double negatives in other languages', 'negative concord',
    ],
    content: `A double negative is a clause that contains two negative elements — typically "not"/"n't" plus another negative word like "nothing," "nobody," "never," "no." In STANDARD written English, the two negatives are taken to cancel out logically: "I don't want nothing" is read as "I want something," and "she's not unhappy" (a deliberate, softer positive) means she's somewhat happy. So standard English avoids the accidental kind — you'd say "I don't want anything" or "I want nothing." However, in many English dialects and everyday speech (African American Vernacular English, much of the American South and the UK, Cockney, and others), a second negative INTENSIFIES the first rather than cancelling it — "I ain't got no money" firmly means "I have no money at all." This is called "negative concord," and it's the normal, grammatical system in those dialects and in many other languages entirely (French "ne...pas...rien," Spanish "no...nada"). It's stigmatised in formal English but not illogical — it's just a different rule. (Nothing to do with the double-slit experiment.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-subjunctive-mood',
    title: 'What the Subjunctive Mood Is in English',
    category: 'Grammar',
    keywords: [
      'what is a subjunctive mood in english', 'if i were you subjunctive', 'i suggest that he be present', 'were vs was subjunctive',
      'when to use the subjunctive', 'god save the queen subjunctive', 'it is essential that she arrive',
    ],
    content: `The subjunctive is a verb "mood" used to talk about things that are not real facts — wishes, hypotheticals, demands, suggestions, requirements. English marks it only lightly, so it's easy to miss. Two main forms survive. (1) The "were" subjunctive, in counterfactual "if" clauses and after "wish": "If I WERE you, I'd leave" (not "was"), "I wish it WERE Friday." (2) The base-form subjunctive, after verbs and adjectives of demand, request or necessity — "suggest," "insist," "recommend," "essential," "important" — where the following verb loses its normal ending: "I recommend that he BE on time" (not "is"), "It's essential that she ARRIVE by noon" (not "arrives"), "They demanded that the report BE finished." It also survives in fixed phrases: "God save the Queen," "Be that as it may," "So be it," "Come what may," "If need be." In casual speech people often replace it ("If I was you...", "I suggest that he should be on time"), and that's widely accepted, but the subjunctive is still standard in formal writing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-passive-voice',
    title: 'What the Passive Voice Is and When to Avoid It',
    category: 'Grammar',
    keywords: [
      'what is the passive voice and when should you avoid it', 'active vs passive voice', 'how to spot passive voice',
      'when is passive voice acceptable', 'mistakes were made passive', 'by zombies test passive voice',
    ],
    content: `In the ACTIVE voice, the subject does the action: "The dog bit the man." In the PASSIVE voice, the target of the action becomes the subject, and the doer is demoted to a "by" phrase or dropped entirely: "The man was bitten (by the dog)." It's built from a form of "to be" plus a past participle. A quick test: if you can insert "by zombies" after the verb and it still parses ("the man was bitten by zombies"), it's passive. Avoid the passive when the doer is important, known and interesting and hiding them weakens the sentence or dodges responsibility — the classic evasion is "Mistakes were made" instead of "I made mistakes." Passive is fine, and often better, when the doer is unknown ("My bike was stolen"), unimportant or obvious ("The suspect was arrested"), or when you want to keep the focus on the receiver ("The bridge was completed in 1937"), and it's standard in scientific writing ("The samples were heated to 100 °C"). The advice is "prefer the active," not "never use the passive."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-em-dash',
    title: 'What an Em Dash Is Used For',
    category: 'Grammar',
    keywords: [
      'what is an em dash used for', 'em dash vs en dash vs hyphen', 'how to use a dash in a sentence', 'em dash examples',
      'when to use a dash instead of a comma', 'parenthetical em dash', 'em dash colon replacement',
    ],
    content: `The em dash (—) is the long one, and it's the most flexible punctuation mark. It can replace commas, parentheses or a colon to create a stronger, more abrupt break. Uses: to set off a parenthetical aside with more emphasis than commas or brackets — like this one — using a PAIR of dashes; to tack on an explanation, list or afterthought at the end of a sentence, in place of a colon ("She packed only the essentials — passport, phone, charger"); to mark a sudden change of direction or an interruption in dialogue ("I was going to say — never mind"). Don't confuse it with the shorter marks: the EN dash (–) is used for ranges and connections ("pages 12–18," "the 2010–2020 decade," "the New York–London flight"); the HYPHEN (-) joins compound words and prefixes ("well-known," "re-elect," "mother-in-law"). Style guides differ on whether to put spaces around an em dash (US usually not; UK and many publications use a spaced en dash instead). Overusing em dashes makes writing feel breathless, so mix them with other punctuation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gerund',
    title: 'What a Gerund Is',
    category: 'Grammar',
    keywords: [
      'what is a gerund', 'gerund vs present participle', 'is swimming a gerund', 'verb ending in -ing as a noun',
      'gerund as subject or object', 'the art of cooking gerund', 'gerund phrase examples',
    ],
    content: `A gerund is a word formed from a verb by adding "-ing" that acts as a NOUN in the sentence. So "swim" (verb) becomes "swimming," and in "Swimming is good exercise" it's the subject — a thing, not an action being done. Gerunds turn up wherever a noun can go: as a subject ("Reading relaxes me"), an object ("I enjoy cooking"), after a preposition ("She's good at drawing," "before leaving"), and as a subject complement ("His hobby is painting"). A "gerund phrase" is the gerund plus its own objects and modifiers ("Eating too fast gives me hiccups"). The catch: the "-ing" form isn't always a gerund. In "the running water" or "a boring lecture" it's a present participle acting as an ADJECTIVE, and in "she is running" it's a present participle forming a continuous verb tense. If the "-ing" word is functioning as a noun, it's a gerund; if it's describing something or is part of a verb, it's a participle. (A "gerundive" is a different, Latin thing and isn't part of English grammar.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-semicolon',
    title: 'What a Semicolon Is Used For',
    category: 'Grammar',
    keywords: [
      'what is a semicolon used for', 'how to use a semicolon', 'semicolon vs comma', 'semicolon between independent clauses',
      'semicolon in a list', 'semicolon before however', 'when not to use a semicolon',
    ],
    content: `A semicolon (;) has two main jobs. (1) It joins two complete, closely related sentences (independent clauses) without a conjunction, showing a link stronger than a period but not as final: "I went to the store; I forgot the milk." Using a comma there instead would be a "comma splice" error. (2) It separates items in a list when the items themselves contain commas, so the reader can see where each one ends: "The tour visits Paris, France; Rome, Italy; and Athens, Greece." It's also used before a "conjunctive adverb" that joins two sentences — "however," "therefore," "moreover," "for example" — with a comma after it: "It rained all day; however, we still went out." Do NOT use a semicolon between a full sentence and a fragment (use a colon or a comma), and don't use it where a comma would do. Both sides of a joining semicolon should be able to stand alone as sentences.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-subject-verb-agreement',
    title: 'What Subject–Verb Agreement Is',
    category: 'Grammar',
    keywords: [
      'what is subject-verb agreement', 'singular subject singular verb', 'the box of books is or are', 'neither nor verb agreement',
      'collective noun verb agreement', 'each every one verb', 'subject verb agreement tricky cases',
    ],
    content: `Subject–verb agreement is the rule that a verb must match its subject in number: a singular subject takes a singular verb, a plural subject takes a plural verb ("The dog barks" / "The dogs bark"; "She is" / "They are"). It sounds obvious, but several situations trip people up. (1) Words BETWEEN the subject and verb don't change the agreement — the verb agrees with the true subject: "The box of old books IS heavy" (box is singular, not "books"). (2) "Each," "every," "everyone," "everybody," "someone," "neither" (alone) and "nobody" are singular: "Everyone HAS a ticket." (3) With "either... or" / "neither... nor," the verb agrees with the nearer subject: "Neither the manager nor the employees ARE ready," but "Neither the employees nor the manager IS ready." (4) Subjects joined by "and" are usually plural. (5) Collective nouns ("team," "family," "committee") take a singular verb in American English ("The team is winning") but often a plural in British English. (6) "There is/are" agrees with what follows: "There ARE three reasons."`,
    createdAt: Date.now(),
  },
];
