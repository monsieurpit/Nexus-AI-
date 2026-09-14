import { KnowledgeItem } from '../../types';

// Batch 287 corpus fixes — film/music industry topics. 12/25 misses, several bizarre cross-domain
// leaks: "method acting vs traditional acting" was answered entirely with a PROGRAMMING explanation
// (function vs method in code); "director vs producer in film" described a MUSIC producer/conductor
// instead of film roles; "practical effects vs CGI" had a random, totally unrelated sentence about
// acetaminophen/paracetamol inserted mid-answer; "documentary vs docuseries" wrongly claimed a
// docuseries uses actors in a dramatization (it's just a documentary split into episodes, still
// real footage); "sitcom vs soap opera" used Breaking Bad (a serialized drama, not a soap opera) as
// its soap opera example.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'entertainment',
  keywords,
  content,
  createdAt: now,
});

export const FILM_MUSIC_INDUSTRY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-film-conductor-vs-band-leader',
    'Orchestra conductor vs band leader',
    ['orchestra conductor', 'band leader', 'difference conductor band leader'],
    "An orchestra conductor leads a large classical ensemble using precise, silent hand and baton gestures to control tempo, dynamics, and entrances — conductors don't play an instrument during the performance; their entire role is interpreting the written score and coordinating dozens of musicians to play as one unified sound, following strict, pre-written classical compositions. A band leader leads a smaller, often less formal group (jazz, rock, or pop bands) — a band leader typically DOES play an instrument or sing while leading, often has more room for spontaneous cues or on-the-spot direction (especially in jazz, where a band leader might call out changes during a live improvised performance), and often has a more collaborative, informal relationship with the other musicians compared to a conductor's more singular authority over an orchestra.",
  ),
  k(
    'kb-gap-film-sitcom-vs-soap-opera-correction',
    'Sitcom vs soap opera (correcting the example)',
    ['sitcom', 'soap opera', 'difference sitcom soap opera'],
    "A sitcom (situation comedy) is a comedy show with mostly self-contained episodes — characters return to a similar status quo each episode, jokes and comedic situations drive the plot, and episodes can usually be watched out of order without losing much (like Friends or The Simpsons). A soap opera is a long-running, heavily serialized DRAMA — usually airing many episodes per week (historically daytime television), built around continuous, ongoing storylines with romance, betrayal, and melodrama that never really resolve, requiring you to watch in sequence to follow the plot (like General Hospital or Days of Our Lives). Important correction: Breaking Bad is NOT a soap opera — it's a serialized prestige drama with a definite, planned ending across a limited number of seasons; true soap operas are specifically the long-running, open-ended, melodrama-focused daytime format, a very different genre from a show like Breaking Bad.",
  ),
  k(
    'kb-gap-film-documentary-vs-docuseries-correction',
    'Documentary vs docuseries (correcting an actors error)',
    ['documentary', 'docuseries', 'difference documentary docuseries'],
    "A documentary is typically a single, standalone film built from real footage, interviews, and factual material — no actors, a complete story told in one sitting. A docuseries is essentially the SAME thing — real footage, real people, no actors, no scripted dramatization — just split across multiple episodes instead of one single film, usually because the subject matter is too large or ongoing to cover in a single runtime (like a multi-episode true crime series or nature documentary series). Correcting a common error: a docuseries does NOT use actors to dramatize events — that would actually make it a scripted drama or biopic, not a documentary/docuseries at all. The only real difference between a documentary and a docuseries is the episodic format, not the use of actors.",
  ),
  k(
    'kb-gap-film-director-vs-producer-correction',
    'Director vs producer in film (correcting a music-industry mix-up)',
    ['film director', 'film producer', 'difference director producer film'],
    "In FILM (not music), a director is the creative lead responsible for how the movie actually looks and feels on screen — guiding actors' performances, making shot composition and camera decisions, and shaping the overall artistic vision (think Spielberg or Tarantino). A film producer handles the business and logistical side — securing financing/budget, hiring the crew, managing schedules and locations, and making sure the whole production actually gets made on time and on budget; a producer's job is about making the film HAPPEN, not about the creative on-screen choices themselves. Note: this is a completely different pairing from a MUSIC producer (who shapes a song's sound in the studio) and a conductor (who leads an orchestra) — those are different roles in a different industry and shouldn't be confused with a film director/producer's very different jobs.",
  ),
  k(
    'kb-gap-film-screenplay-vs-shooting-script',
    'Screenplay vs shooting script',
    ['screenplay', 'shooting script', 'difference screenplay shooting script'],
    "A screenplay is the general written version of a film's story — scenes, dialogue, and action described in standard screenplay format, primarily meant to sell the story and guide the overall narrative during development. A shooting script is a later-stage, more technical revision of the screenplay created once the film is actually being made — it adds numbered scenes, specific camera directions/shot types, and technical notes the director and crew use on set day-to-day during filming. In short: a screenplay is the story-focused version used earlier in development (and often for pitching/selling the project), while a shooting script is the same story reworked with added technical/production detail specifically for filming it on set.",
  ),
  k(
    'kb-gap-film-practical-effects-vs-cgi-correction',
    'Practical effects vs CGI',
    ['practical effects', 'cgi', 'computer generated imagery', 'difference practical effects cgi'],
    "Practical effects are created physically, on set, during actual filming — animatronics, models, makeup/prosthetics, pyrotechnics, and physical stunts that the camera captures directly in real life (like Jurassic Park's close-up animatronic dinosaurs). CGI (Computer-Generated Imagery) is created digitally after filming, using computer software to generate visuals that are composited into the footage — used for things too large, dangerous, or impossible to build physically (like Jurassic Park's wide shots of dinosaurs moving through the environment). Many films (including Jurassic Park) use BOTH together: practical effects for close-up realism and tactile detail, CGI for large-scale or physically impossible shots — the two techniques are often blended rather than being an either/or choice.",
  ),
  k(
    'kb-gap-film-sequel-vs-spinoff',
    'Sequel vs spinoff',
    ['sequel', 'spinoff', 'difference sequel spinoff'],
    "A sequel continues the SAME main story and characters from an earlier film or show, picking up after the events of the original (like Toy Story 2 continuing directly from Toy Story). A spinoff takes a secondary character, setting, or concept from an original work and builds an entirely NEW, separate story around it — the spinoff exists in the same universe but usually follows a different main character or focus than the original (like Better Call Saul spinning off from Breaking Bad to follow a different character's story, or Frasier spinning off from Cheers). The key difference: a sequel continues the original story's main throughline forward; a spinoff branches off to tell a different, separate story using elements borrowed from the original.",
  ),
  k(
    'kb-gap-film-cameo-vs-guest-star',
    'Cameo vs guest star',
    ['cameo', 'guest star', 'difference cameo guest star'],
    "A cameo is a very brief, often unbilled or barely-billed appearance by a notable person (often a celebrity, or sometimes the director themselves) — usually just a quick moment on screen with little to no dialogue, meant as a fun surprise or nod rather than a real part of the story (like Stan Lee's brief appearances in Marvel movies). A guest star is a performer who plays a more substantial, credited role in one or a few episodes of an ongoing show — they have real dialogue and involvement in the plot for that episode, but aren't a permanent, regular cast member of the series. The key difference: a cameo is a brief, often wordless novelty appearance, while a guest star has an actual, credited speaking role within the story for the episode(s) they appear in.",
  ),
  k(
    'kb-gap-film-method-acting-vs-traditional-acting-correction',
    'Method acting vs traditional acting (not a programming concept)',
    ['method acting', 'traditional acting', 'difference method acting traditional'],
    "Method acting is an intense acting technique where the performer tries to genuinely BECOME the character psychologically and emotionally — drawing on real personal memories and emotions, sometimes staying in character even off-camera, to produce a deeply authentic performance (actors like Daniel Day-Lewis are famous for this approach). Traditional acting relies more on technical craft and controlled performance skills — using learned techniques (voice, movement, emotional recall as a tool rather than total immersion) to convincingly portray a character while still maintaining a clearer separation between the actor's real self and the role, without necessarily living the part 24/7. The key difference: method acting aims for deep, sometimes all-consuming psychological immersion into the character, while traditional acting uses trained craft and technique to portray a character convincingly without fully 'becoming' them off-camera. (Note: this is completely unrelated to 'function vs method' in computer programming — that's a totally different meaning of the word 'method,' from software development, not acting.)",
  ),
  k(
    'kb-gap-film-stunt-double-vs-body-double',
    'Stunt double vs body double',
    ['stunt double', 'body double', 'difference stunt double body double'],
    "A stunt double is a trained professional who performs physically dangerous or technically demanding action sequences in place of the credited actor — car chases, fight scenes, falls, fire stunts — specifically for safety and specialized skill reasons, filmed so the audience still believes it's the main actor. A body double substitutes for the actor in shots where the actor's FACE isn't shown but their body is needed on screen — commonly used for nudity, specific body-part close-ups (like hands or legs), or simply matching a body type/build for a particular shot, without necessarily involving any dangerous physical action at all. The key difference: a stunt double exists specifically for dangerous physical action sequences, while a body double exists for any shot where showing the actor's actual body (not necessarily doing anything risky) without their face is needed.",
  ),
  k(
    'kb-gap-film-score-vs-soundtrack',
    'Film score vs soundtrack',
    ['film score', 'soundtrack', 'difference film score soundtrack'],
    "A film score is the original instrumental music composed specifically FOR that film by a composer, used to underscore emotional beats, tension, and atmosphere throughout the movie (like John Williams' scores for Star Wars or Jaws) — it's written and recorded specifically to match scenes in that particular film. A soundtrack is a broader term that can refer to ALL the music featured in a film, including pre-existing licensed songs by other artists that weren't written for the movie (like a needle-drop pop song playing during a scene), and 'soundtrack' is also commonly used to describe the commercially released ALBUM containing a film's music, whether that's the original score, licensed songs, or both together. In short: a score is specifically the original composed music written for the film; a soundtrack is the broader collection of music associated with the film (which may include the score, licensed songs, or both) and is also the term used for the commercial music release.",
  ),
  k(
    'kb-gap-film-trailer-vs-teaser',
    'Trailer vs teaser',
    ['trailer', 'teaser', 'difference trailer teaser'],
    "A trailer is a longer promotional clip (typically 2-3 minutes) released closer to a film or show's release date, showing a fuller sense of the plot, characters, and tone — often including a general story arc and some of the more exciting or memorable moments to build strong anticipation just before release. A teaser is much shorter (often 30-90 seconds), released much EARLIER — sometimes a year or more before release — and deliberately shows very little concrete footage or plot detail, designed just to announce that the project exists and generate early buzz/curiosity rather than reveal the story. The key difference: a teaser comes first and shows very little, mainly just building awareness; a trailer comes later, closer to release, and reveals significantly more of the actual story and footage.",
  ),
];
