import { KnowledgeItem } from '../../types';

/**
 * LINGUISTICS_CONCEPTS_GAPS_2 — batch 234 corrections.
 * nexus-4b was strong on most linguistics contrasts (phoneme/morpheme,
 * semantics/pragmatics, denotation/connotation, metaphor/simile, pidgin/
 * creole, prescriptive/descriptive, etymology/entomology). Misses, all the
 * same wrong-domain pattern:
 * - "clause vs phrase" and "phrase vs sentence" answered in terms of MUSIC
 *   (musical phrase, cadence).
 * - "subject vs predicate" answered with Kant's analytic/synthetic distinction.
 * - "independent vs dependent clause" drifted into experiment variables.
 * - "first/second/third person" answered only about narrative POV.
 * - "native vs fluent speaker" answered about literacy.
 * - "translation vs interpretation" answered about literary interpretation
 *   instead of the interpreting profession (oral).
 * - homonym/homophone/homograph examples were garbled.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'linguistics', keywords, content, createdAt: now,
});

export const LINGUISTICS_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-ling2-clause-vs-phrase',
    'Clause vs phrase (grammar)',
    [
      'difference between a clause and a phrase grammar', 'a clause has a subject and a verb', 'a phrase is a group of words without a subject-verb pair',
      'noun phrase prepositional phrase verb phrase', 'main clause subordinate clause', 'not a musical phrase or cadence',
    ],
    `In grammar (not music):

A PHRASE is a group of words that work together as a unit but do NOT contain a subject paired with its own finite verb. Types: noun phrase ("the big red dog"), prepositional phrase ("under the table"), verb phrase ("has been sleeping"), adjective phrase ("very tired"), adverb phrase ("quite slowly"). A phrase functions as a single part of speech within a larger structure and cannot stand alone as a sentence.

A CLAUSE contains a subject and a finite verb. "The dog barked" is a clause; so is "because the dog barked". A clause can be:
- independent (main): expresses a complete thought and could stand alone — "the dog barked".
- dependent (subordinate): has a subject and verb but begins with a subordinating word ("because", "although", "when", "that", "which") and cannot stand alone — "because the dog barked".

Every clause contains at least one phrase; not every phrase is a clause. A sentence is built from one or more clauses.`,
  ),
  k(
    'kb-gap-ling2-phrase-vs-sentence',
    'Phrase vs sentence (grammar)',
    [
      'difference between a phrase and a sentence grammar', 'a sentence has at least one independent clause', 'a phrase lacks a subject-verb combination',
      'complete thought', 'sentence fragment', 'not a musical phrase or cadence',
    ],
    `A SENTENCE is a complete grammatical unit: it contains at least one independent clause — a subject and a finite verb expressing a complete thought — and in writing it starts with a capital letter and ends with a full stop, question mark, or exclamation mark. "The bus is late." is a sentence.

A PHRASE is a smaller group of words that acts as a single unit but has no subject-plus-finite-verb pair and does not express a complete thought: "the late bus", "running for the bus", "at the corner". Punctuating a phrase as if it were a sentence produces a sentence fragment ("Running for the bus.").

So the hierarchy is: words -> phrases -> clauses -> sentences. A phrase is a building block; a sentence is a finished structure. (This is the grammatical sense. In music a "phrase" is a short musical thought ended by a cadence — a completely separate use of the word.)`,
  ),
  k(
    'kb-gap-ling2-subject-vs-predicate',
    'Subject vs predicate (grammar)',
    [
      'difference between a subject and a predicate grammar', 'subject is who or what the sentence is about', 'predicate is what is said about the subject',
      'predicate contains the verb', 'complete subject complete predicate simple subject simple predicate', 'not Kant analytic synthetic',
    ],
    `Every basic sentence splits into two parts:

The SUBJECT is who or what the sentence is about — the noun or pronoun (plus its modifiers) that the sentence makes a statement about. In "The tired old dog slept on the porch", the complete subject is "The tired old dog" and the simple subject is "dog".

The PREDICATE is everything that is said about the subject. It always contains the verb and includes any objects, complements, and adverbials. In the same sentence the predicate is "slept on the porch"; the simple predicate is the verb "slept".

Quick test: find the main verb — that verb and everything grouped with it is the predicate; what the verb is agreeing with is the subject. ("Predicate" here is the grammar term. In logic/philosophy "predicate" means something different — the property asserted of a subject, as in Kant's analytic vs synthetic statements — but that is not the grammar sense.)`,
  ),
  k(
    'kb-gap-ling2-grammatical-person',
    'First, second, and third person (grammatical person)',
    [
      'difference between first second and third person grammar', 'first person I we the speaker', 'second person you the person addressed',
      'third person he she it they someone else', 'pronouns and verb agreement', 'distinct from narrative point of view',
    ],
    `Grammatical PERSON marks who is involved in the act of speaking, shown mainly through pronouns and verb agreement:

- FIRST person = the speaker/writer, alone or in a group: I, me, my, mine / we, us, our. "I think", "we went".
- SECOND person = the person or people being addressed: you, your, yours (same form for singular and plural in modern English). "You know".
- THIRD person = anyone or anything else, not the speaker and not the addressee: he, she, it, they, him, her, them, and all ordinary nouns ("the teacher", "the dogs"). "She thinks", "they went". Third-person singular present verbs take -s ("she runs").

This is a property of pronouns and verbs in every sentence. Narrative point of view (first-person narrator "I", the rare second-person "you", third-person limited or omniscient) is a storytelling choice that is BUILT ON grammatical person but is a separate concept — the grammatical categories exist in every utterance, not just in fiction.`,
  ),
  k(
    'kb-gap-ling2-native-vs-fluent',
    'Native speaker vs fluent speaker',
    [
      'difference between a native speaker and a fluent speaker', 'native speaker acquired the language in early childhood as a first language',
      'fluent speaker uses the language easily and accurately possibly learned later', 'L1 versus L2', 'all native speakers are fluent not all fluent speakers are native',
      'not about literacy',
    ],
    `A NATIVE speaker acquired the language naturally in early childhood (roughly before puberty) as a first language, through immersion in a home or community where it was spoken. It is a fact about HOW and WHEN the language was learned. Native speakers typically have complete intuitive command of pronunciation, grammar, idiom, and cultural nuance, and judge what "sounds right" without conscious rules. A person can have two native languages (simultaneous bilingual acquisition).

A FLUENT speaker can use the language smoothly, quickly, and accurately for real communication. It is a fact about CURRENT ABILITY, regardless of when learning happened. A fluent speaker who learned the language as an adult (an L2 speaker) may still have an accent, occasional gaps in idiom, or a smaller cultural frame of reference, even at a very high level.

Relationship: essentially all native speakers of a language they still use are fluent in it; not all fluent speakers are native. It is also possible to lose fluency in a native language through long disuse ("first-language attrition"). Neither term is about literacy — a native or fluent speaker may be unable to read or write the language.`,
  ),
  k(
    'kb-gap-ling2-translation-vs-interpretation',
    'Translation vs interpretation (language services)',
    [
      'difference between translation and interpretation', 'translation is written text one language to another', 'interpretation is spoken language in real time',
      'interpreter simultaneous consecutive', 'translator has time to research and revise', 'not literary interpretation of meaning',
    ],
    `As language professions, the split is medium and timing, not depth:

TRANSLATION works with WRITTEN text: a translator converts a document from a source language into a target language, working with reference tools, dictionaries, and drafts, and can revise until the wording is right. Output is a polished written text. Turnaround is hours to weeks.

INTERPRETATION (interpreting) works with SPOKEN (or signed) language in REAL TIME: an interpreter listens to a speaker and renders the message into another language on the spot, with no chance to look things up or redo it. Two main modes: consecutive (the speaker pauses every few sentences for the interpreter) and simultaneous (the interpreter speaks continuously, a few seconds behind, usually from a booth with headsets — as at the UN). It demands strong memory, quick processing, and public composure.

A skilled translator is not automatically a good interpreter, or vice versa — they are different skill sets. (Separately, "interpretation" in literature or law means working out what a text MEANS; that is a different use of the word from the interpreting profession.)`,
  ),
  k(
    'kb-gap-ling2-homonym-homophone-homograph',
    'Homonym vs homophone vs homograph',
    [
      'difference between a homonym a homophone and a homograph', 'homophone sounds the same spelled differently', 'homograph spelled the same possibly pronounced differently',
      'homonym both same spelling and same sound different meaning', 'to too two bear bear bow bow lead lead tear tear',
      'homonym is often used as an umbrella term',
    ],
    `All three involve words that overlap in form but differ in meaning.

HOMOPHONES sound the same but are spelled differently: to / too / two; there / their / they're; flour / flower; write / right. (Same sound, different spelling.)

HOMOGRAPHS are spelled the same but may be pronounced differently: "lead" (the metal, rhymes with "bed") vs "lead" (to guide, rhymes with "bead"); "tear" (a drop from the eye) vs "tear" (to rip); "bow" (of a ship / to bend at the waist) vs "bow" (and arrow / ribbon). (Same spelling, meaning differs, pronunciation may differ.)

HOMONYMS, in the strict sense, are words that are BOTH spelled the same AND pronounced the same but have unrelated meanings: "bat" (animal) vs "bat" (for baseball); "bank" (river edge) vs "bank" (financial institution); "bear" (animal) vs "bear" (to carry). A strict homonym is therefore both a homograph and a homophone at once.

Loosely, "homonym" is often used as an umbrella term for any of these form-clashes. The precise scheme: homophone = same sound; homograph = same spelling; homonym = same in both.`,
  ),
];
