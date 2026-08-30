import { KnowledgeItem } from '../../types';

// Well-known "trick" questions and riddles with one universally agreed, unambiguous correct
// answer — added after observing the LLM confidently give the WRONG, intuitive-but-incorrect
// answer to the classic "pound of feathers vs pound of bricks" question (it said bricks weigh
// more; they don't — a pound is a pound regardless of material). These are exactly the kind of
// question people ask specifically to test whether an AI actually reasons carefully or just
// pattern-matches to the more "obvious-sounding" wrong answer, so getting them right matters more
// than their real-world practical value would suggest. Grounding them here means the answer comes
// from a fact this corpus states plainly, rather than the model having to reason it out fresh
// under time pressure and falling for the trap the question was designed to set.
export const CLASSIC_TRICK_QUESTIONS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-trick-pound-feathers-vs-bricks',
    title: 'Classic Riddle: Which Weighs More, a Pound of Feathers or a Pound of Bricks?',
    category: 'core',
    keywords: [
      'pound of feathers vs pound of bricks', 'which weighs more feathers or bricks', 'ton of feathers vs ton of steel',
      'kilogram of feathers vs kilogram of lead', 'weight trick question', 'feathers bricks riddle',
    ],
    content: `They weigh exactly the same. This is a classic trick question designed to make people instinctively answer "bricks" because bricks intuitively feel/seem denser and heavier — but the question already specifies the SAME unit of weight (a pound) for both, and a pound is a pound regardless of what material it's made of. One pound of feathers and one pound of bricks both weigh precisely one pound; the feathers simply take up a much larger VOLUME to reach that same weight, since feathers are far less dense than bricks. The same logic applies to any version of this riddle regardless of the specific unit used — "a ton of feathers vs a ton of steel," "a kilogram of feathers vs a kilogram of lead" — the answer is always that they weigh the same, because the question defines the weight to be equal by stating the same unit for both; only the volume/density differs. The only way the answer would differ is if the question specified different amounts (e.g. "two pounds of feathers vs one pound of bricks"), which these classic phrasings deliberately never do.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-trick-months-with-28-days',
    title: 'Classic Riddle: How Many Months Have 28 Days?',
    category: 'core',
    keywords: ['how many months have 28 days', 'months with 28 days riddle', '28 days trick question'],
    content: `All 12 months have at least 28 days. This is a trick question that relies on people hearing "28 days" and immediately thinking only of February (which has exactly 28 days in a non-leap year), and answering "1." But every month — January (31 days), February (28 or 29), March (31), and so on — contains at least 28 days within it, since no month has fewer than 28 days total. The question asks how many months HAVE 28 days (i.e., contain at least that many), not which month has EXACTLY 28 days and no more — the correct answer to the literal question as phrased is all 12.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-trick-two-coins-thirty-cents',
    title: 'Classic Riddle: Two Coins Add Up to 30 Cents, One Isn\'t a Nickel',
    category: 'core',
    keywords: ['two coins 30 cents riddle', 'one is not a nickel riddle', 'coin riddle 30 cents'],
    content: `The two coins are a quarter (25 cents) and a nickel (5 cents), totaling 30 cents. The riddle states "one of them is not a nickel" — which is true and deliberately misleading: the QUARTER is the one that is not a nickel, but the other coin genuinely is a nickel. People often get stuck assuming neither coin can be a nickel at all, when the sentence never actually claims that — it only specifies that (at least) one specific coin isn't a nickel, which is compatible with the other one being a nickel.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-trick-passing-second-place',
    title: 'Classic Riddle: If You Pass the Person in 2nd Place, What Place Are You In?',
    category: 'core',
    keywords: ['pass second place riddle', 'racing riddle 2nd place', 'overtake second place question'],
    content: `You'd be in 2nd place, not 1st. This is a trick question because people instinctively think "passing someone" means taking their exact position, and jump to "1st place" as if you'd just overtaken the race leader. But if you pass the person who was previously in 2nd place, that means you take over 2nd place — the person who was in 1st place is unaffected and still ahead of you. You would only end up in 1st place if you specifically passed whoever was previously in 1st place.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-trick-farmer-seventeen-sheep',
    title: 'Classic Riddle: A Farmer Has 17 Sheep, All But 9 Die',
    category: 'core',
    keywords: ['farmer 17 sheep riddle', 'all but 9 die riddle', 'sheep riddle answer'],
    content: `9 sheep are left. "All but 9 die" means all of the sheep die EXCEPT for 9 of them — the phrase "all but N" is an idiom meaning "all except N," so the 9 survivors are exactly the answer, regardless of the starting number (17) mentioned in the setup, which is a deliberate red herring meant to tempt people into subtracting (17 - 9 = 8, the wrong answer) instead of reading "all but 9" correctly as "9 remain."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-trick-everest-before-discovery',
    title: 'Classic Riddle: Before Mount Everest Was Discovered, What Was the Tallest Mountain?',
    category: 'core',
    keywords: ['everest discovered riddle', 'tallest mountain before discovery riddle', 'mount everest trick question'],
    content: `Mount Everest was still the tallest mountain in the world, even before it was discovered/measured by people. A mountain's height is a physical fact about the world, completely independent of whether humans have identified or measured it yet — "discovery" only changes what people KNOW, not what was actually true. This riddle plays on people momentarily assuming a mountain didn't have its height, or wasn't "the tallest," until humans found and confirmed it — but Everest was geologically the tallest mountain on Earth for the entire time before its 1852 identification as such, just as it is now.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-trick-widows-sister-marriage',
    title: 'Classic Riddle: Can a Man Marry His Widow\'s Sister?',
    category: 'core',
    keywords: ['widows sister marriage riddle', 'marry widows sister trick question', 'legal riddle widow'],
    content: `No — because a "widow" is specifically the surviving wife of a man who has died. If the man in the question has a widow, that means HE is dead, and a dead man cannot legally marry anyone at all. This riddle relies on people initially reading past the word "widow" without registering its precise meaning (a dead man's surviving wife) and instead focusing on the more complex-sounding question of whether marrying a deceased spouse's sibling is legally permitted (which, separately, varies by jurisdiction and religious tradition, but is beside the point here) — the actual trick is entirely in that one word.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-trick-subtract-five-from-25',
    title: 'Classic Riddle: How Many Times Can You Subtract 5 From 25?',
    category: 'core',
    keywords: ['subtract 5 from 25 riddle', 'how many times subtract riddle'],
    content: `Only once. After you subtract 5 from 25 one time, the number is no longer 25 — it's 20. The riddle asks specifically how many times you can subtract 5 FROM 25 (that exact number), not how many times you can subtract 5 repeatedly until reaching zero (which would be 5 times: 25→20→15→10→5→0). People commonly answer "5" because they read it as a repeated-subtraction-to-zero problem, which is a different (and reasonable, just not what was actually asked) question than the literal one posed.`,
    createdAt: Date.now(),
  },
];
