import { KnowledgeItem } from '../../types';

// Batch 300 corpus fixes — dance styles "what's the difference between X and Y" topics.
// Separate file from danceStylesAroundTheWorld.ts (which only had 4 items, low coverage) —
// this file covers the comparison-format questions specifically. 10/25 misses, dominant
// pattern: answer describes ONE side of the pair in detail then gets cut off or derails into
// an unrelated "crashout" tangent before ever describing the second side (jazz/tap, waltz/tango,
// ballerina/dancer, choreographer/instructor, foxtrot/quickstep), plus a few severe Wikipedia-
// trivia-dump escapes that never answer the actual question (line/square dancing, krumping/
// popping, locking/popping, cha-cha/rumba), and one genuinely confused/garbled distinction
// (folk dance/traditional dance).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Culture',
  keywords,
  content,
  createdAt: now,
});

export const DANCE_STYLES_COMPARISONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-dance-jazz-vs-tap',
    'Jazz dance vs tap dance',
    ['jazz dance', 'tap dance', 'difference jazz tap dance'],
    "Jazz dance grew out of early 20th-century African American vernacular dance and jazz music culture (think Charleston-era clubs through Broadway/Fosse-style jazz), emphasizing syncopated rhythm, isolations, high energy, and improvisational flair, danced barefoot or in soft jazz shoes — the sound comes from the music, not the dancer's feet. Tap dance is defined by its footwear: metal plates ('taps') are fixed to the heel and toe of the shoe, and the dancer's feet become a percussion instrument, striking the floor to create audible rhythms (shuffles, flaps, time steps) that are as much a musical performance as a visual one — tap dancers often perform with no music at all besides the sound of their own feet. The key difference: jazz dance is about expressive, rhythmic body movement set to music, while tap dance is about using metal-soled shoes to physically create the rhythm and music yourself.",
  ),
  k(
    'kb-gap-dance-waltz-vs-tango',
    'Waltz vs tango',
    ['waltz', 'tango', 'difference waltz tango'],
    "The waltz is a ballroom dance in 3/4 time (three beats per measure), built around a smooth, continuous rise-and-fall rotating motion — dancers glide and turn in sweeping circles around the floor with a soft, flowing 'up-down' quality, epitomized by pieces like Strauss's 'The Blue Danube.' The tango, by contrast, is in 2/4 or 4/4 time and has a sharp, staccato, dramatic character — it originated in the working-class neighborhoods of Buenos Aires and Montevideo in the late 19th century, and is defined by close embrace, sudden pauses, sharp head snaps, and deliberate, staccato leg movements (including the iconic tango 'stalk') rather than the waltz's continuous rise and fall. The key difference: waltz is a smooth, flowing 3/4-time dance built on rise-and-fall rotation, while tango is a sharp, dramatic, close-embrace dance built on staccato pauses and precise, deliberate steps.",
  ),
  k(
    'kb-gap-dance-ballerina-vs-dancer',
    'Ballerina vs dancer',
    ['ballerina', 'dancer', 'difference ballerina dancer'],
    "'Dancer' is the general term for anyone who dances, in any style — ballet, hip hop, tap, contemporary, ballroom, folk dance, and so on. 'Ballerina' is a specific, narrower term: it refers specifically to a female ballet dancer, typically one who has trained extensively in classical ballet technique (pointe work, turnout, formal positions) and often specifically to a principal or lead female dancer in a ballet company (the top rank is sometimes distinguished further as 'prima ballerina'). A male ballet dancer is called a 'danseur,' not a ballerina. The key difference: 'dancer' is the umbrella term for anyone who dances in any style, while 'ballerina' specifically means a female ballet dancer, especially a trained, accomplished one.",
  ),
  k(
    'kb-gap-dance-choreographer-vs-instructor',
    'Choreographer vs dance instructor',
    ['choreographer', 'dance instructor', 'difference choreographer dance instructor', 'dance teacher'],
    "A choreographer is the creative author of a dance — they design and compose the sequence of movements, steps, and formations that make up a routine or piece, deciding what the dance will actually be (the artistic vision, storytelling, and structure), similar to how a composer writes music or a director stages a play. A dance instructor (or dance teacher) is focused on teaching technique and skill — they train dancers in proper form, execution, and existing steps or styles, whether that's correcting a student's turnout in ballet class or running rehearsal drills, but they aren't necessarily creating original choreography themselves. In practice the same person is often both (many instructors also choreograph, and many choreographers also teach), but the roles are distinct: one invents the dance, the other develops the dancer's ability to perform it. The key difference: a choreographer creates the movements and structure of a dance, while a dance instructor teaches technique and skill, whether or not they created the choreography being taught.",
  ),
  k(
    'kb-gap-dance-foxtrot-vs-quickstep',
    'Foxtrot vs quickstep',
    ['foxtrot', 'quickstep', 'difference foxtrot quickstep'],
    "The foxtrot is a smooth ballroom dance danced to slower, moderate-tempo music, built around long, gliding walking steps and gentle, continuous turns — it's one of the 'smooth' style ballroom dances alongside waltz, valued for its elegant, effortless-looking flow across the floor. The quickstep actually evolved directly FROM the foxtrot in the 1920s, when dancers started performing foxtrot to faster jazz/big-band tempos, which required smaller, quicker, more energetic steps (including hops, skips, and syncopated chassés) to keep up with the speed — it's essentially the foxtrot's fast, lively, bouncier cousin. The key difference: foxtrot is smooth, gliding, and danced at a moderate tempo, while quickstep is its faster, livelier descendant, with quicker, syncopated footwork to match up-tempo music.",
  ),
  k(
    'kb-gap-dance-line-vs-square-dancing',
    'Line dancing vs square dancing',
    ['line dancing', 'square dancing', 'difference line dancing square dancing'],
    "Line dancing is done by a group of dancers arranged in one or more lines (or rows) who all face the same direction and perform the same repeated sequence of steps in unison, without partners and without any set choreography that requires interacting with other dancers — think country line dances at a bar, where everyone just follows the same pattern independently. Square dancing is fundamentally a PARTNER dance: four couples (eight dancers total) form a square, one couple per side, and a caller shouts out a live sequence of moves (like 'do-si-do' or 'allemande') that the couples execute together, interacting with and swapping partners within the square as directed. The key difference: line dancing is a solo, unison dance done in rows following one repeated routine, while square dancing is a partnered, caller-directed dance done by four couples interacting within a square formation.",
  ),
  k(
    'kb-gap-dance-folk-vs-traditional',
    'Folk dance vs traditional dance',
    ['folk dance', 'traditional dance', 'difference folk dance traditional dance'],
    "The two terms overlap heavily and are often used interchangeably, but 'folk dance' more precisely refers to dances that developed organically within a specific community or ethnic group, passed down informally through generations as part of everyday cultural or social life (weddings, harvests, festivals) rather than being designed by a choreographer — examples include Irish céilí dances, Greek sirtaki, or Hawaiian hula. 'Traditional dance' is the broader umbrella term for any dance with deep historical roots tied to a particular culture's customs, which includes folk dances but can also include more formalized or ceremonial traditional forms (like a royal court dance or a religious ritual dance) that weren't necessarily grassroots, everyday folk practice. The key difference: folk dance specifically means dance that arose informally from a community's everyday cultural life, while traditional dance is the wider umbrella covering any culturally-rooted historical dance form, folk dances included.",
  ),
  k(
    'kb-gap-dance-krumping-vs-popping',
    'Krumping vs popping',
    ['krumping', 'popping', 'difference krumping popping', 'street dance styles'],
    "Krumping is a raw, highly energetic street dance style that emerged in early-2000s South Central Los Angeles as an expressive, often cathartic release of emotion — it features exaggerated, aggressive full-body movements (chest pops, arm swings, stomps) danced with intense facial expression and energy, and is closely tied to community and battle culture. Popping is a distinct funk-style street dance from 1970s Fresno/Sacramento, built on quickly contracting and relaxing muscles (the 'pop' or 'hit') in time with the beat to create a sharp, jolting visual effect, often combined with robotic or illusion-based movement (waving, gliding, animation). The key difference: krumping is about raw, aggressive, full-body emotional expression developed in LA street/battle culture, while popping is a precise, controlled technique of hitting and releasing muscle contractions on the beat to create a sharp visual 'pop,' developed separately in Northern California funk culture.",
  ),
  k(
    'kb-gap-dance-locking-vs-popping',
    'Locking vs popping in street dance',
    ['locking', 'popping', 'difference locking popping street dance'],
    "Locking is a funk street dance style created by Don Campbell in late-1960s Los Angeles, characterized by fast, exaggerated arm and hand movements combined with sudden pauses or 'locks' — the dancer freezes in a distinct pose for a beat before snapping back into motion, giving the style its name; it's often playful and performative, with big smiles, points, and character. Popping is a separate funk style from Northern California built on quickly contracting and releasing muscles ('hitting') to create a sharp jolt or pop on the beat, producing a controlled, mechanical, sometimes illusion-like effect (like the robot or waving) rather than locking's freeze-pose-and-release rhythm. The key difference: locking is about sudden freezes/'locks' held in exaggerated poses between bursts of movement, while popping is about rapid muscle contractions ('hits') that create a sharp jolting effect throughout the body, without the extended freezes.",
  ),
  k(
    'kb-gap-dance-cha-cha-vs-rumba',
    'Cha-cha vs rumba',
    ['cha-cha', 'cha cha', 'rumba', 'difference cha-cha rumba'],
    "Rumba is a slow, sensual Cuban-born ballroom dance (the 'dance of love') built around slow, deliberate hip movement (Cuban motion) and a romantic, close connection between partners, typically danced to a slow 4/4 rhythm with a characteristic 'slow-quick-quick' timing. Cha-cha (cha-cha-chá) actually evolved directly out of danced rumba/mambo in 1950s Cuba, when dancers began adding an extra syncopated triple step — the 'cha-cha-cha' — to the basic rumba-style rhythm, resulting in a noticeably faster, livelier, more playful dance with a distinctive triple-step 'cha-cha-cha' footwork pattern instead of rumba's slower, more sustained hip movements. The key difference: rumba is the slower, more sensual, sustained-hip-movement 'dance of love,' while cha-cha is its faster, livelier descendant defined by the syncopated triple 'cha-cha-cha' step.",
  ),
];
