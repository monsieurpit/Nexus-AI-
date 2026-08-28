import { KnowledgeItem } from '../../types';

export const ALGEBRA_BASICS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-algebra-what-is-it',
    title: 'What Is Algebra and What Is It Used For?',
    category: 'Mathematics',
    keywords: ['what is algebra used for', 'what is a variable in algebra', 'algebra basics explained', 'why do we learn algebra'],
    content: `**Algebra** is the branch of mathematics that uses letters and symbols (called **variables**, commonly x, y, or n) to represent unknown or changeable quantities, letting you write general rules and relationships instead of working with only one specific number at a time. A variable stands in for a value that either isn't known yet (something you're solving for) or that can change depending on the situation (like how a taxi fare might depend on the distance traveled). Algebra's core power is letting you describe a pattern once — using an equation like "total cost = $3 + $2 × number of items" — and then apply it to any specific case just by plugging in a number for the variable, rather than solving the same type of problem from scratch every single time. Beyond schoolwork, algebra underlies an enormous range of practical real-world tasks: calculating a budget or loan payment, figuring out unit conversions, adjusting a recipe for a different number of servings, computer programming logic, engineering calculations, and virtually every field of science, which relies on algebraic equations to describe relationships between measurable quantities (force, speed, temperature, and so on). Even basic everyday problem-solving — "if gas costs $3.50 a gallon and I have $40, how many gallons can I buy?" — is a simple algebra problem, whether or not it's consciously recognized as one.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-algebra-solving-linear-equations',
    title: 'How to Solve a Basic Linear Equation',
    category: 'Mathematics',
    keywords: ['how to solve a linear equation', 'solving for x', 'linear equation steps', 'balance method algebra'],
    content: `A **linear equation** is an equation where the variable appears only to the first power (no exponents like x²), so its graph forms a straight line — the general one-variable form looks like ax + b = c. The standard approach to solving one is the "balance" method: whatever you do to one side of the equation, you must do to the other side too, to keep both sides equal, working step by step to isolate the variable alone on one side. For example, to solve 3x + 5 = 20: first subtract 5 from both sides to get 3x = 15, then divide both sides by 3 to get x = 5. You can check the answer by substituting it back into the original equation: 3(5) + 5 = 20, which is true, confirming the solution is correct. More complex linear equations might have variables on both sides (like 2x + 3 = x + 9), which you solve by first moving all variable terms to one side and all constant numbers to the other (subtracting x from both sides gives x + 3 = 9, then subtracting 3 gives x = 6), or might involve parentheses that need to be expanded first using the distributive property (multiplying each term inside the parentheses by the number outside them) before combining like terms and isolating the variable using the same balance approach.`,
    createdAt: Date.now(),
  },
];
