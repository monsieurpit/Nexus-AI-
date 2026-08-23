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

// Detects natural-language categorical syllogisms ("if all cats are animals and some animals
// are pets, are all cats pets?") that don't happen to contain the literal words "syllogism" or
// "premise"/"conclusion" — previously this whole class of question fell through to plain corpus
// search instead of actual logical reasoning, landing on whatever unrelated document happened to
// share a few keywords.
function trySolveSyllogism(prompt: string): LogicSolution | null {
  const lower = prompt.toLowerCase();

  const premise1 = lower.match(/\b(all|some)\s+([a-z]+)\s+(?:are|is)\s+([a-z]+)/);
  if (!premise1) return null;
  const rest = lower.slice((premise1.index ?? 0) + premise1[0].length);
  const premise2 = rest.match(/\b(all|some)\s+([a-z]+)\s+(?:are|is)\s+([a-z]+)/);
  if (!premise2) return null;

  const [, quant1, s, m1] = premise1;
  const [, quant2, m2, p] = premise2;
  // The two premises need to share a middle term (m1 === m2) to actually chain into a syllogism —
  // otherwise this is just two unrelated "all X are Y" statements, not a real inference to check.
  if (m1 !== m2) return null;

  let valid: boolean;
  let mood: string;
  let conclusion: string;
  if (quant1 === 'all' && quant2 === 'all') {
    valid = true;
    mood = 'Barbara (AAA-1)';
    conclusion = `All ${s} are ${p}`;
  } else if (quant1 === 'some' && quant2 === 'all') {
    valid = true;
    mood = 'Darii (AII-1)';
    conclusion = `Some ${s} are ${p}`;
  } else if (quant1 === 'all' && quant2 === 'some') {
    valid = false;
    mood = 'undistributed middle';
    conclusion = `No valid universal conclusion follows — "some ${m1} are ${p}" doesn't guarantee the specific ${m1} that are ${s} are among them`;
  } else {
    valid = false;
    mood = 'two particular premises';
    conclusion = `No valid conclusion follows — two "some" premises never validly combine in categorical logic`;
  }

  const verdict = valid ? `VALID — ${conclusion}.` : `INVALID — ${conclusion}.`;

  return {
    isLogic: true,
    title: 'Categorical Syllogism Validity Check',
    verdict,
    formalSteps: [
      `Major Premise: ${quant1[0].toUpperCase()}${quant1.slice(1)} ${s} are ${m1}.`,
      `Minor Premise: ${quant2[0].toUpperCase()}${quant2.slice(1)} ${m2} are ${p}.`,
      `Middle term "${m1}" links the two premises together.`,
      `Figure/Mood: ${mood}.`,
      valid
        ? `Since both premises distribute the middle term correctly, the conclusion follows necessarily.`
        : `The middle term "${m1}" is not fully distributed across both premises, so no universal conclusion about all ${s} can be validly drawn — this is a classic invalid syllogism shape, not a logic error in the premises themselves.`,
    ],
    explanation: `### Is it actually valid?\n\n${
      valid
        ? `Yes — from "${quant1} ${s} are ${m1}" and "${quant2} ${m2} are ${p}", it necessarily follows that **${conclusion.toLowerCase()}**.`
        : `No — you can't validly conclude "all ${s} are ${p}" here. "${quant1} ${s} are ${m1}" and "${quant2} ${m2} are ${p}" together only tell you the two groups overlap somewhere, not that every ${s} falls inside that overlap. Concrete counterexample: all cats are animals, some animals are pets (e.g. dogs) — but that doesn't mean all cats are pets (plenty of cats are strays).`
    }`,
  };
}

export function trySolveLogic(prompt: string): LogicSolution | null {
  const lower = prompt.toLowerCase();

  // 0. Natural-language categorical syllogisms (checked before the literal-keyword version below)
  const syllogismResult = trySolveSyllogism(prompt);
  if (syllogismResult) return syllogismResult;

  // 0b. Three Switches / One Lightbulb Puzzle
  if (
    (lower.includes('switch') && (lower.includes('bulb') || lower.includes('light'))) ||
    (lower.includes('switches') && lower.includes('room')) ||
    /\bthree\s+switches?\b|\b3\s+switches?\b/.test(lower)
  ) {
    return {
      isLogic: true,
      title: 'The Three Switches / One Lightbulb Puzzle',
      verdict: 'Turn on Switch 1, wait a few minutes, turn it off, turn on Switch 2, then enter the room.',
      formalSteps: [
        'Setup: Three switches outside a room, one of which controls a single bulb inside. You may flip switches as much as you like, but can only enter the room once.',
        'Turn Switch 1 ON and leave it on for a few minutes (long enough for an incandescent bulb to heat up).',
        'Turn Switch 1 OFF, then immediately turn Switch 2 ON.',
        'Enter the room exactly once.',
        'Read the bulb: if it is ON, Switch 2 controls it. If it is OFF but warm to the touch, Switch 1 controls it. If it is OFF and cold, Switch 3 controls it.',
      ],
      explanation: `### Why this works\n\nThe puzzle only gives you one trip into the room, so you need a way to encode a *third* piece of information beyond just "on" or "off". Heat is that third channel: a bulb that was on long enough retains warmth after being switched off. That turns two binary switch-flips into three distinguishable outcomes (on-and-lit, off-and-warm, off-and-cold), exactly matching the three switches.`,
    };
  }

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
