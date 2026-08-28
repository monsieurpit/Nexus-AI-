import { KnowledgeItem } from '../../types';

export const BASIC_REFERENCE_NUMBERS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-refnum-piano-guitar-violin',
    title: 'How Many Keys/Strings: Piano, Guitar, and Violin',
    category: 'everyday-basics',
    keywords: ['how many keys on a piano', 'piano keys count', 'how many strings does a guitar have', 'guitar strings count', 'how many strings does a violin have', 'violin strings count'],
    content: `A standard full-size piano has **88 keys** — 52 white keys and 36 black keys, spanning 7 octaves plus a few extra notes. This became the standard size in the late 1800s; some smaller or older pianos have fewer keys (76 or 61), but 88 is the modern full standard for both acoustic and most digital pianos. A standard guitar has **6 strings** (from lowest/thickest to highest/thinnest, standard tuning: E-A-D-G-B-E) — though 12-string guitars (doubling each string, tuned in pairs) and bass guitars (typically 4 strings) are common variations. A violin has **4 strings**, tuned (low to high) G-D-A-E — the same 4-string setup, tuned differently, is shared with the viola (lower-pitched) and cello (lower still), the other main string family instruments in an orchestra.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum-olympic-rings-rainbow',
    title: 'Olympic Rings and Rainbow Colors',
    category: 'everyday-basics',
    keywords: ['how many rings on the olympic flag', 'olympic rings meaning', 'how many colors in a rainbow', 'rainbow colors order', 'roygbiv'],
    content: `The Olympic flag has **5 interlocking rings**, colored blue, yellow, black, green, and red (on a white background) — they represent the union of the five inhabited continents recognized by the Olympic movement at the time of the symbol's creation (1913), not any specific continent-to-color mapping as is sometimes assumed. A rainbow is traditionally described as having **7 colors**, in order: red, orange, yellow, green, blue, indigo, violet — commonly remembered with the mnemonic **ROYGBIV** or the sentence "Richard Of York Gave Battle In Vain." In reality, a rainbow is a continuous spectrum of wavelengths with no hard edges between colors — the specific count of "7" traces back to Isaac Newton, who deliberately divided the spectrum into 7 named bands partly to parallel the 7 notes of a musical scale, a somewhat arbitrary/cultural choice rather than a strict physical necessity (some cultures and color systems describe rainbows with fewer or more named color bands).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum-time-units',
    title: 'Common Time Reference Numbers: Weeks, Minutes, Months, Time Zones',
    category: 'everyday-basics',
    keywords: ['how many weeks in a year', 'how many minutes in a day', 'how many months have 31 days', 'how many time zones in the us', 'how many time zones in the world'],
    content: `**Weeks in a year**: 52 weeks and 1 day (or 2 days in a leap year) — a year has 365 days, and 365 ÷ 7 = 52 weeks with 1 day left over, which is why a specific date (like your birthday) shifts one day later in the week each year (two days after a leap year). **Minutes in a day**: 1,440 minutes (24 hours × 60 minutes). **Months with 31 days**: 7 months have 31 days — January, March, May, July, August, October, and December. April, June, September, and November have 30 days, and February has 28 (29 in a leap year) — the classic memory trick is the rhyme "30 days hath September, April, June, and November; all the rest have 31, except February alone, which has 28 days clear, and 29 each leap year." **US time zones**: the continental US uses 4 primary time zones (Eastern, Central, Mountain, Pacific), but including Alaska and Hawaii, the US spans **6 time zones** total. **World time zones**: there are **24 standard time zones** globally (roughly one per hour of Earth's rotation, based on 15-degree longitude bands from the Prime Meridian), though the real-world count of distinct time zones actually in use is higher (around 38-40) due to some countries and regions using non-standard half-hour or 45-minute offsets (like India at UTC+5:30 or Nepal at UTC+5:45), plus daylight saving time adjustments in many places.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum-sports-team-sizes',
    title: 'How Many Players Are on Common Sports Teams?',
    category: 'everyday-basics',
    keywords: ['how many players on a soccer team', 'soccer team size', 'how many players on the field', 'football basketball baseball team sizes'],
    content: `**Soccer (football)**: 11 players per team on the field at once (including the goalkeeper) — a standard match starts with 22 players total across both teams. **Basketball**: 5 players per team on the court at once. **American football**: 11 players per team on the field at once, though teams have much larger overall rosters since different players rotate in for offense, defense, and special teams. **Baseball**: 9 players per team on the field at once (in defensive positions). **Volleyball**: 6 players per team on the court at once (indoor volleyball; beach volleyball is played 2-per-team). **Ice hockey**: 6 players per team on the ice at once (including the goalie). These are the standard "on-field/on-court at one time" numbers — full team rosters (including substitutes/bench players) are typically larger in every one of these sports.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum-shark-cartilage',
    title: 'Do Sharks Have Bones?',
    category: 'everyday-basics',
    keywords: ['how many bones does a shark have', 'do sharks have bones', 'shark skeleton cartilage'],
    content: `Sharks have **zero true bones** — their entire skeleton is made of cartilage, the same flexible, rubbery tissue that makes up human ears and the tip of the nose, not hard, mineralized bone. This is a defining trait of the fish class Chondrichthyes ("cartilaginous fish"), which also includes rays and skates, as opposed to Osteichthyes ("bony fish," the vast majority of fish species, which do have true bone skeletons). A cartilage skeleton is lighter than bone, which helps sharks with buoyancy and energy-efficient swimming (most shark species also lack a swim bladder, the gas-filled organ many bony fish use to control buoyancy, and rely partly on their oily liver and constant swimming instead). Because cartilage decomposes much faster than bone and rarely fossilizes well, most of what's known about ancient shark species comes primarily from fossilized teeth (which are mineralized) rather than complete skeletons.`,
    createdAt: Date.now(),
  },
];
