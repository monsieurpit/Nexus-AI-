import { KnowledgeItem } from '../../types';

export const FIBONACCI_AND_GOLDEN_RATIO_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-math-fibonacci-golden-ratio',
    title: 'The Fibonacci Sequence and the Golden Ratio',
    category: 'Mathematics',
    keywords: ['what is the fibonacci sequence', 'what is the golden ratio', 'fibonacci in nature', 'golden ratio 1.618'],
    content: `The **Fibonacci sequence** is a series of numbers where each number is the sum of the two preceding ones, starting 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, and so on. It's named after Leonardo of Pisa (nicknamed "Fibonacci"), an Italian mathematician who introduced the sequence to Western Europe in his 1202 book "Liber Abaci," originally as the solution to a hypothetical problem about rabbit population growth, though similar number patterns had actually been described earlier in Indian mathematics. As the sequence progresses, the ratio between consecutive numbers (like 21 divided by 13, or 55 divided by 34) increasingly converges toward an irrational number known as the **golden ratio**, approximately 1.6180339887..., often represented by the Greek letter phi (φ). The golden ratio has fascinated mathematicians, artists, and architects for centuries because it appears to describe proportions many people find aesthetically pleasing, and because a rectangle with golden-ratio proportions can be divided into a square plus a smaller golden rectangle infinitely, generating a spiral pattern. Fibonacci-like numbers and spirals genuinely do appear in nature with some frequency — in the arrangement of sunflower seeds, pinecone scales, and certain shell spirals (like the nautilus) — likely because such growth patterns can efficiently pack new structures with minimal wasted space as an organism grows. However, popular claims that the golden ratio underlies essentially all of nature's beauty, most historical art and architecture (including the pyramids or the Parthenon), or ideal human facial proportions are frequently exaggerated or based on selective, retroactively fitted measurements rather than solid historical or scientific evidence — a caution worth keeping in mind given how often the golden ratio gets popularly overstated.`,
    createdAt: Date.now(),
  },
];
