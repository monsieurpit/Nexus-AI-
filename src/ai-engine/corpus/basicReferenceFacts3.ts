import { KnowledgeItem } from '../../types';

export const BASIC_REFERENCE_FACTS_3_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-refnum3-eg-vs-ie',
    title: '"e.g." vs "i.e." vs "etc.": What Do They Mean?',
    category: 'everyday-basics',
    keywords: ['difference between eg and ie', 'e.g. vs i.e.', 'what does etc mean', 'what does eg stand for', 'what does ie stand for'],
    content: `**"e.g."** is Latin for "exempli gratia," meaning "for example" — use it when giving one or more examples from a larger, non-exhaustive set ("I like citrus fruits, e.g., oranges and lemons" — implying there are other citrus fruits too, these are just examples). **"i.e."** is Latin for "id est," meaning "that is" — use it when clarifying or restating something precisely, not giving an example ("I only eat citrus fruits, i.e., oranges, lemons, and limes" — implying this is the complete, exact list, not a partial sample). A simple memory trick: "e.g." starts like "example," and "i.e." can be remembered as "in essence" or "in other words." **"etc."** is short for the Latin "et cetera," meaning "and other things" — used at the end of a list to indicate it continues in a similar vein without listing everything explicitly ("apples, oranges, bananas, etc."). All three are typically followed by a comma in standard American usage and are considered somewhat informal — many style guides recommend spelling out "for example," "that is," and "and so on" in more formal writing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum3-am-pm',
    title: 'What Do AM and PM Stand For?',
    category: 'everyday-basics',
    keywords: ['what does am and pm stand for', 'am pm meaning', 'why is 12am midnight and not noon', 'is noon am or pm'],
    content: `**AM** stands for the Latin "ante meridiem," meaning "before midday." **PM** stands for "post meridiem," meaning "after midday." Together they divide the 24-hour day into two 12-hour halves for the 12-hour clock format commonly used in the US and several other countries (as opposed to 24-hour "military time," used more widely internationally, which avoids the AM/PM distinction entirely by counting hours 0-23). The genuinely confusing edge case: **12 PM is noon**, and **12 AM is midnight** — this trips people up constantly because "12" doesn't fit neatly into either "before midday" or "after midday" logic (noon is technically the exact midpoint, not really "before" or "after" itself), so the convention is simply a memorized exception rather than something derivable from the AM/PM logic. Many digital clocks and event listings sidestep the ambiguity entirely by writing "12 noon" or "12 midnight" explicitly instead of "12 PM"/"12 AM," precisely because the standard convention is so commonly misremembered or misused.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum3-mean-median-mode',
    title: 'Mean vs. Median vs. Mode: What\'s the Difference?',
    category: 'everyday-basics',
    keywords: ['difference between mean median and mode', 'mean vs median vs mode', 'how to calculate mean', 'how to calculate median', 'what is mode in statistics'],
    content: `These are three different ways to describe the "typical" or "central" value in a set of numbers. **Mean** (the everyday "average"): add up all the values and divide by how many there are. Example: for {2, 3, 3, 5, 20}, the mean = (2+3+3+5+20) ÷ 5 = 33 ÷ 5 = **6.6**. **Median**: the middle value when the numbers are sorted in order (or the average of the two middle values if there's an even count of numbers). For the same set {2, 3, 3, 5, 20}, the median is **3** (the middle value in the sorted list). **Mode**: the value that appears most often in the set. For {2, 3, 3, 5, 20}, the mode is **3** (it appears twice, more than any other value). A set can have no mode (if no value repeats), one mode, or multiple modes (if there's a tie). The key practical difference between mean and median: the mean is heavily pulled by extreme outlier values, while the median is not — in the example above, the single unusually high value (20) pulls the mean up to 6.6, well above where most of the actual data points cluster, while the median (3) better represents the "typical" value unaffected by that outlier. This is exactly why household income statistics are usually reported as median rather than mean: a small number of extremely high earners can dramatically skew the mean income upward, making median income a more representative measure of what a "typical" household actually earns.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum3-odd-even-numbers',
    title: 'Odd vs. Even Numbers, and What Makes a Number Prime',
    category: 'everyday-basics',
    keywords: ['difference between odd and even numbers', 'what makes a number odd or even', 'what is a prime number simple', 'is 1 a prime number'],
    content: `An **even** number is any whole number that can be divided evenly by 2 with no remainder (2, 4, 6, 8, 10...) — the quickest check is whether the last digit is 0, 2, 4, 6, or 8. An **odd** number is any whole number that leaves a remainder of 1 when divided by 2 (1, 3, 5, 7, 9...) — the last digit is 1, 3, 5, 7, or 9. A **prime number** is a whole number greater than 1 that has exactly two positive divisors: 1 and itself — meaning nothing else divides into it evenly (2, 3, 5, 7, 11, 13...). A common point of confusion: **1 is NOT a prime number**, despite technically only being divisible by 1 and itself (which are the same number) — mathematicians specifically define primes as having exactly *two distinct* divisors, and 1 only has one, so it's excluded by definition (this exclusion also keeps an important theorem, that every number has a unique prime factorization, working correctly — allowing 1 as prime would break that uniqueness, since you could multiply by 1 endlessly without changing anything). Also worth knowing: **2 is the only even prime number** — every other even number is automatically divisible by 2 in addition to 1 and itself, disqualifying it from being prime, which is why all primes above 2 are odd.`,
    createdAt: Date.now(),
  },
];
