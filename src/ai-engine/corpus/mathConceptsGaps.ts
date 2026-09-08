import { KnowledgeItem } from '../../types';

// Batch 70 (math concepts). Strong category. Real misses on nexus-4b: "what is
// a limit" used the example f(x)=x/x "gets infinitely large as x approaches 0"
// (it approaches 1); "what is a logarithm" was a raw web dump; "what is pi"
// returned a broken "Result: 3.141593 / How I got there: Result: 3.141593"
// with no definition; "mean median and mode" never defined the mode and cut
// off mid-sentence; "what is an irrational number" just answered "the golden
// ratio".
export const MATH_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-limit-calculus',
    title: 'What a Limit Is in Calculus',
    category: 'Mathematics',
    keywords: [
      'what is a limit in calculus', 'limit of a function definition', 'what does a function approach', 'one-sided limit',
      'limit x/x as x approaches 0', 'why do limits matter', 'limit does not exist',
    ],
    content: `A limit describes the value a function gets arbitrarily close to as its input gets arbitrarily close to some point — without necessarily ever reaching it. We write lim(x→a) f(x) = L to mean: you can force f(x) as close to L as you like by taking x close enough to a. The point of limits is that they let you talk about behaviour exactly at a spot where the function might be undefined or badly behaved. Example done correctly: f(x) = x/x equals 1 for every x except x = 0, where it is 0/0 and undefined; the limit as x approaches 0 is 1, because the function sits at 1 on both sides. (The function that "blows up" near 0 is 1/x, not x/x.) A limit can fail to exist if the function heads to different values from the left and the right, oscillates, or grows without bound. Limits are the foundation of both the derivative (a limit of average rates of change) and the integral (a limit of sums).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-logarithm',
    title: 'What a Logarithm Is',
    category: 'Mathematics',
    keywords: [
      'what is a logarithm', 'log base 10 explained', 'natural logarithm ln', 'logarithm is an exponent', 'why use a log scale',
      'log rules product quotient', 'what is log of 1000',
    ],
    content: `A logarithm answers the question "what power do I raise the base to, in order to get this number?" So log base 10 of 1000 is 3, because 10^3 = 1000. In general, log_b(x) = y means b^y = x — a logarithm is just an exponent viewed from the other side, the inverse operation to raising a base to a power. Common bases: base 10 (the "common log," written log), base e ≈ 2.718 (the "natural log," written ln, which comes up throughout calculus), and base 2 (used in computer science and information theory). Key properties that make logs useful: log(a·b) = log(a) + log(b) and log(a/b) = log(a) − log(b), so multiplication and division become addition and subtraction, and log(a^n) = n·log(a). Log scales (decibels for sound, the Richter scale for earthquakes, pH for acidity, stock charts) compress a huge range of values into a readable one, so each equal step means multiplying by a fixed factor rather than adding a fixed amount.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-pi',
    title: 'What Pi Is',
    category: 'Mathematics',
    keywords: [
      'what is pi', 'pi ratio circumference diameter', 'is pi irrational', 'pi 3.14159 digits', 'why does pi appear everywhere',
      'pi transcendental number', 'area of a circle pi r squared',
    ],
    content: `Pi (π) is the ratio of a circle's circumference to its diameter — the same value for every circle, about 3.14159. It is irrational, meaning it cannot be written exactly as a fraction and its decimal digits go on forever without repeating; it is also transcendental, meaning it is not the root of any polynomial with integer coefficients (which is why you cannot "square the circle" with compass and straightedge). It shows up far beyond circles: in the area of a circle (πr²), the surface area and volume of a sphere, the period of a pendulum, waves and oscillations, Fourier analysis, probability (the normal distribution), and Euler's identity e^(iπ) + 1 = 0. Only a few dozen digits of π are needed for any practical physics or engineering calculation; computing trillions of digits is done as a test of algorithms and hardware, not because the digits are useful.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mean-median-mode',
    title: 'The Difference Between Mean, Median and Mode',
    category: 'Mathematics',
    keywords: [
      'what is the difference between mean median and mode', 'define mode statistics', 'mean vs median outliers',
      'how to find the median', 'what is the mode of a data set', 'measures of central tendency', 'which average to use',
    ],
    content: `Mean, median and mode are three "measures of central tendency" — different ways to describe a typical value. The MEAN is the arithmetic average: add up all the values and divide by how many there are. It uses every data point but is pulled toward extreme values. The MEDIAN is the middle value when the data is sorted from lowest to highest (with an even count, it's the average of the two middle values). It ignores how far away the extremes are, so it resists outliers. The MODE is the value that appears most often. A data set can have no mode, one mode, or several. Example — for {2, 3, 3, 5, 20}: mean = 33 ÷ 5 = 6.6; median = 3 (the middle of the five sorted values); mode = 3 (it occurs twice). Notice the single large value (20) drags the mean up to 6.6, while the median and mode both stay at 3, closer to where most of the data sits. Use the median for skewed data like incomes or house prices; use the mode for categories (the most common eye colour), where a mean makes no sense.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-irrational-number',
    title: 'What an Irrational Number Is',
    category: 'Mathematics',
    keywords: [
      'what is an irrational number', 'irrational vs rational number', 'is the square root of 2 irrational', 'non-repeating non-terminating decimal',
      'examples of irrational numbers', 'are there more irrationals than rationals', 'pi e golden ratio irrational',
    ],
    content: `An irrational number is a real number that cannot be written as a fraction a/b with a and b whole numbers (b not zero). Equivalently, its decimal expansion goes on forever without ever falling into a repeating pattern. Rational numbers, by contrast, either terminate (0.25 = 1/4) or eventually repeat (0.3333… = 1/3). Classic irrational numbers: the square root of 2 (about 1.41421…, proven irrational by the ancient Greeks), the square root of any whole number that isn't a perfect square, π (about 3.14159…), e (about 2.71828…), and the golden ratio φ (about 1.61803…). π and e are also "transcendental," a stronger property. Although both rationals and irrationals are infinite in number, the irrationals are in a precise sense far more numerous: the rationals can be listed in a sequence (they are "countable"), while the irrationals cannot ("uncountable"), so almost every real number picked at random is irrational.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-e-constant',
    title: "What e (Euler's Number) Is",
    category: 'Mathematics',
    keywords: [
      'what is e the mathematical constant', 'eulers number 2.71828', 'why is e important in calculus', 'e compound interest limit',
      'derivative of e to the x', 'natural exponential function', 'e in exponential growth and decay',
    ],
    content: `e is a mathematical constant approximately equal to 2.71828, irrational and transcendental like π. Its defining property in calculus: e is the unique base for which the exponential function e^x is its own derivative — the rate of change of e^x at any point equals its value there. It also arises as a limit: (1 + 1/n)^n approaches e as n grows large, which is exactly what happens to $1 growing at 100% annual interest compounded ever more frequently (continuous compounding gives e). Because of the self-derivative property, e is the natural base for describing any process whose rate of change is proportional to its current size: population growth, radioactive decay, cooling, charging capacitors, continuously compounded returns. The natural logarithm ln is the logarithm to base e. e is named for Leonhard Euler, who established much of its notation and proved key results, including Euler's identity, e^(iπ) + 1 = 0.`,
    createdAt: Date.now(),
  },
];
