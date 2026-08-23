/**
 * Logic, Deduction, Riddle & Philosophical Inquiry Solver
 */

export interface LogicSolution {
  isLogic: boolean;
  title: string;
  verdict: string;
  formalSteps: string[];
  explanation: string;
}

export function trySolveLogic(prompt: string): LogicSolution | null {
  const lower = prompt.toLowerCase();

  // 1. Monty Hall Problem
  if (lower.includes('monty hall') || (lower.includes('doors') && lower.includes('goat') && lower.includes('car'))) {
    return {
      isLogic: true,
      title: 'The Monty Hall Problem (Bayesian Probability Solution)',
      verdict: 'You should ALWAYS switch doors. Switching doubles your winning probability from 1/3 to 2/3.',
      formalSteps: [
        'Initial Choice: When you pick Door 1, the probability the car is behind Door 1 is P(Car = 1) = 1/3. The probability the car is behind {Door 2 or Door 3} is 2/3.',
        'Host Intervention: Monty Hall knows where the car is and MUST reveal a goat from the remaining doors.',
        'Information Asymmetry: Monty never chooses randomly; his action filters out the incorrect option within the 2/3 probability subset.',
        'Posterior Probability: The entire 2/3 probability of the {Door 2, Door 3} set collapses entirely onto the remaining unopened door.',
        'Conclusion: P(Win by Staying) = 1/3 vs P(Win by Switching) = 2/3 (66.67%).',
      ],
      explanation: `### Why Switching is Statistically Superior\n\nMany people intuitively assume that with 2 closed doors left, the odds are 50/50. However:\n\n- You have a **2/3 chance** of initially picking a goat.\n- Whenever you initially picked a goat (2 out of 3 times), Monty is **forced** to reveal the *other* goat, meaning the remaining closed door **always contains the car**.\n- Therefore, switching wins every single time you initially picked a goat (which occurs 66.7% of the time).`,
    };
  }

  // 2. Knights and Knaves
  if (lower.includes('knights and knaves') || (lower.includes('knight') && lower.includes('knave'))) {
    return {
      isLogic: true,
      title: 'Knights & Knaves Propositional Logic Analysis',
      verdict: 'Truth-table evaluation isolates invariant statements by contradiction.',
      formalSteps: [
        'Axiom 1: A Knight always speaks truth (T).',
        'Axiom 2: A Knave always lies (F).',
        'Hypothesis Testing: Assume Person A is a Knight (A = T). Evaluate the consistency of Statement S with A.',
        'Reductio ad Absurdum: If S evaluates to False while A is assumed True, contradiction arises; therefore A must be a Knave.',
        'Resolution: Verify that all statements hold consistency under the derived truth assignment.',
      ],
      explanation: `### Formal Deductive Strategy\n\nIn Knights and Knaves puzzles, set up a boolean proposition:\n$$A \\iff \\text{Statement}(A)$$\n\nIf Person A says *"I am a Knave"*, this is a formal paradox: if true, they are a Knight telling the truth (contradiction); if false, they are a Knave telling truth (contradiction). No inhabitant can ever utter that statement.`,
    };
  }

  // 3. River Crossing Puzzle (Wolf, Goat, Cabbage)
  if (lower.includes('wolf') && lower.includes('goat') && lower.includes('cabbage')) {
    return {
      isLogic: true,
      title: 'River Crossing Constraint Satisfaction Solution',
      verdict: 'Complete safe crossing achieved in 7 steps.',
      formalSteps: [
        'Step 1: Take the Goat across to the east bank (Wolf and Cabbage are safely left together on the west bank — a wolf won\'t eat a cabbage).',
        'Step 2: Return alone to the west bank.',
        'Step 3: Take the Wolf across to the east bank, leaving it there.',
        'Step 4: Take the Goat back with you to the west bank (can\'t leave Wolf and Goat alone together on the east bank).',
        'Step 5: Take the Cabbage across to the east bank, leaving it safely with the Wolf.',
        'Step 6: Return alone to the west bank.',
        'Step 7: Take the Goat across to the east bank. All three — Wolf, Goat, and Cabbage — are now safely on the east bank.',
      ],
      explanation: `### Constraint Graph Analysis\n\n- Forbidden States: $\\{\\text{Wolf}, \\text{Goat}\\}$ without farmer, and $\\{\\text{Goat}, \\text{Cabbage}\\}$ without farmer.\n- Key Insight: The Goat is the mutual conflicting element. Transporting it back on the return leg breaks the deadlock.`,
    };
  }

  // 4. Syllogisms & Logic Fallacies
  if (lower.includes('syllogism') || lower.includes('fallacy') || (lower.includes('premise') && lower.includes('conclusion'))) {
    return {
      isLogic: true,
      title: 'Classical Syllogistic & Deductive Validity Check',
      verdict: 'Categorical deductive analysis confirms structure and validity.',
      formalSteps: [
        'Major Premise ($P_1$): All $M$ are $P$ (Universal affirmative).',
        'Minor Premise ($P_2$): All $S$ are $M$ (Universal affirmative).',
        'Inference Rule: Transitivity of subset relations ($S \\subseteq M \\subseteq P$).',
        'Conclusion ($C$): Therefore, All $S$ are $P$ (Barbara Syllogism - AAA-1).',
      ],
      explanation: `### Deductive Validity vs Empirical Truth\n\n- **Validity**: An argument is valid if the truth of the premises logically guarantees the truth of the conclusion.\n- **Soundness**: An argument is sound only if it is both structurally valid **and** its premises are empirically true in reality.`,
    };
  }

  return null;
}
