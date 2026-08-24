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

// Classic riddles matched by a distinctive fragment of their wording. These had no handler at
// all before, so a riddle like "I speak without a mouth" fell through to plain corpus search,
// which had nothing riddle-shaped to match and returned whatever unrelated document happened to
// share a stray keyword (e.g. "mouth" pulling up dining-etiquette content).
const CLASSIC_RIDDLES: { match: RegExp; title: string; answer: string; explanation: string }[] = [
  {
    match: /speak\s+without\s+a\s+mouth|hear\s+without\s+ears.{0,40}(?:what\s+am\s+i|who\s+am\s+i)/i,
    title: 'Classic Riddle: The Echo',
    answer: 'An echo.',
    explanation: `An echo "speaks" by reflecting sound waves back at you and "hears" in the sense that it only exists as a response to a sound that was made — no mouth or ears required, just a hard surface and physics.`,
  },
  {
    match: /keys\s+but\s+no\s+locks|space\s+but\s+no\s+room/i,
    title: 'Classic Riddle: The Keyboard',
    answer: 'A keyboard.',
    explanation: `A keyboard has keys (but they don't open anything), a space bar (but it isn't a physical room), and you "enter" on it constantly (the Enter key) without ever physically going anywhere.`,
  },
  {
    match: /the\s+more\s+you\s+take.{0,20}the\s+more\s+you\s+leave\s+behind/i,
    title: 'Classic Riddle: Footsteps',
    answer: 'Footsteps.',
    explanation: `Every step you take leaves one more footstep behind you — the act of taking (a step) is literally what produces the thing you're leaving.`,
  },
  {
    match: /what\s+has\s+(?:a\s+)?(?:face|hands).{0,30}no\s+(?:arms|legs)/i,
    title: 'Classic Riddle: The Clock',
    answer: 'A clock.',
    explanation: `A clock has a "face" and "hands" but no arms or legs — the words are borrowed from the body but describe parts of the clock instead.`,
  },
];

// "A farmer has 17 sheep, all but 9 die, how many are left" — a classic trick riddle where the
// large opening number (17) is a deliberate red herring. "All but N die" literally means every
// sheep except N of them dies, so N is the answer regardless of the starting count. Previously
// this fell through to plain corpus search (which matched random "farm"/animal-adjacent content)
// because it looks like an arithmetic word problem but isn't actually solved by subtraction.
function trySolveAllButRiddle(prompt: string): LogicSolution | null {
  // The verb right after "all but N" isn't always one of a short fixed list ("die"/"survive"/
  // "left") — "all but 6 wander off", "all but 6 run away", "all but 6 escape" are the same
  // trick riddle with a different verb, and the original verb-only regex missed all of them,
  // falling through to corpus search on "cows"/"wander" instead. Any short clause between the
  // number and a comma (or end of sentence) is accepted now, as long as the question itself asks
  // how many are left/remain — that combination is specific enough to avoid false-triggering on
  // an unrelated sentence that happens to contain "all but N" with no riddle intent.
  const match = prompt.match(/all\s+but\s+(\d+)\s+(?:of\s+(?:them|it|the\s+\w+)\s+)?[a-z][a-z\s]{0,40}?(?=[,.]|$)/i);
  if (!match) return null;
  if (!/how\s+many\s+(?:are|remain|is|survive)|\bleft\b/i.test(prompt)) return null;
  const n = match[1];
  return {
    isLogic: true,
    title: 'Classic Riddle: "All But N" Trick Question',
    verdict: `${n} are left.`,
    formalSteps: [
      `"All but ${n} die" means every one of them dies EXCEPT ${n} — so ${n} is how many survive.`,
      `The starting count is a red herring; it never factors into the answer.`,
    ],
    explanation: `The starting number is deliberately there to bait you into subtracting. "All but ${n} die" already tells you directly how many are left standing: **${n}**.`,
  };
}

function trySolveClassicRiddle(prompt: string): LogicSolution | null {
  for (const riddle of CLASSIC_RIDDLES) {
    if (riddle.match.test(prompt)) {
      return {
        isLogic: true,
        title: riddle.title,
        verdict: riddle.answer,
        formalSteps: [`Riddle recognized: ${riddle.title}.`, `Answer: ${riddle.answer}`],
        explanation: riddle.explanation,
      };
    }
  }
  return null;
}

// "If all birds can fly and a penguin is a bird, can a penguin fly?" — a categorical syllogism
// phrased with an "X can Y" capability premise instead of the "X are Y" form trySolveSyllogism
// handles. This is a straightforward valid deduction from the stated premises (even though
// penguins can't actually fly — the puzzle is about what logically follows from the premises as
// given, not zoological fact), but with no handler it fell through to corpus search and matched
// on stray words like "bird"/"fly", landing on completely unrelated content.
function trySolveCapabilitySyllogism(prompt: string): LogicSolution | null {
  const lower = prompt.toLowerCase();
  const premise = lower.match(/\ball\s+([a-z]+)\s+can\s+([a-z]+)/);
  if (!premise) return null;
  const [, category, ability] = premise;
  // The major premise states the category as a plural ("all birds can fly") but the minor
  // premise names one member in the singular ("a penguin is a bird") — match either form.
  const categorySingular = category.endsWith('s') ? category.slice(0, -1) : category;
  const instance = lower.match(new RegExp(`([a-z]+)\\s+is\\s+an?\\s+(?:${category}|${categorySingular})\\b`));
  if (!instance) return null;
  const [, member] = instance;

  return {
    isLogic: true,
    title: 'Categorical Syllogism: Capability Inference',
    verdict: `Yes — logically, a ${member} can ${ability}.`,
    formalSteps: [
      `Major Premise: All ${category} can ${ability}.`,
      `Minor Premise: A ${member} is a ${categorySingular}.`,
      `Conclusion: Therefore, a ${member} can ${ability}.`,
    ],
    explanation: `Purely from the premises given, this is valid: if every ${categorySingular} can ${ability}, and a ${member} belongs to the ${category} category, then a ${member} can ${ability} too — the conclusion follows necessarily from the stated premises. (Worth flagging: this is validity, not truth — if the real-world premise "all ${category} can ${ability}" is itself false, as it is for flightless birds like penguins, the argument is valid but not sound.)`,
  };
}

function trySolveSequence(prompt: string): LogicSolution | null {
  const lower = prompt.toLowerCase();
  if (!/next\s+(?:number|term|value)|what\s+comes?\s+next|complete\s+the\s+(?:sequence|pattern)/.test(lower)) return null;

  // Pull out the run of numbers in the sequence itself, ignoring stray digits elsewhere in the
  // sentence (e.g. "riddle #3"). Requires at least 3 terms to have any hope of inferring a rule.
  const numMatches = prompt.match(/-?\d+(?:\.\d+)?/g);
  if (!numMatches || numMatches.length < 3) return null;
  const nums = numMatches.map(Number);

  const diffs = nums.slice(1).map((n, i) => n - nums[i]);
  const isArithmetic = diffs.every((d) => d === diffs[0]);

  let ratios: number[] | null = null;
  if (nums.every((n) => n !== 0)) {
    ratios = nums.slice(1).map((n, i) => n / nums[i]);
  }
  const isGeometric = !isArithmetic && ratios !== null && ratios.every((r) => Math.abs(r - ratios![0]) < 1e-9);

  const isSquares = !isArithmetic && !isGeometric && nums.every((n) => Number.isInteger(n) && n >= 0 && Number.isInteger(Math.sqrt(n)));

  if (isArithmetic) {
    const d = diffs[0];
    const next = nums[nums.length - 1] + d;
    return {
      isLogic: true,
      title: 'Number Sequence: Arithmetic Progression',
      verdict: `The next number is ${next}.`,
      formalSteps: [
        `Sequence: ${nums.join(', ')}`,
        `Consecutive difference is constant: ${d > 0 ? '+' : ''}${d} each step.`,
        `Next term = ${nums[nums.length - 1]} ${d >= 0 ? '+' : '-'} ${Math.abs(d)} = ${next}.`,
      ],
      explanation: `This is an arithmetic progression — each term adds the same constant (${d}) to the previous one. Extending that pattern gives **${next}**.`,
    };
  }

  if (isGeometric && ratios) {
    const r = ratios[0];
    const next = nums[nums.length - 1] * r;
    const nextDisplay = Number.isInteger(next) ? next : Number(next.toFixed(4));
    return {
      isLogic: true,
      title: 'Number Sequence: Geometric Progression',
      verdict: `The next number is ${nextDisplay}.`,
      formalSteps: [
        `Sequence: ${nums.join(', ')}`,
        `Consecutive ratio is constant: each term is ×${r} the previous one.`,
        `Next term = ${nums[nums.length - 1]} × ${r} = ${nextDisplay}.`,
      ],
      explanation: `This is a geometric progression — each term is multiplied by the same constant ratio (${r}) to get the next. Extending that pattern gives **${nextDisplay}**.`,
    };
  }

  if (isSquares) {
    const roots = nums.map((n) => Math.sqrt(n));
    const rootDiffs = roots.slice(1).map((r, i) => r - roots[i]);
    if (rootDiffs.every((d) => d === rootDiffs[0])) {
      const nextRoot = roots[roots.length - 1] + rootDiffs[0];
      const next = nextRoot * nextRoot;
      return {
        isLogic: true,
        title: 'Number Sequence: Perfect Squares',
        verdict: `The next number is ${next}.`,
        formalSteps: [
          `Sequence: ${nums.join(', ')}`,
          `Each term is a perfect square: ${roots.map((r) => `${r}²`).join(', ')}.`,
          `Next root = ${nextRoot}, so next term = ${nextRoot}² = ${next}.`,
        ],
        explanation: `These are consecutive perfect squares. Following the pattern of their roots (${roots.join(', ')}, ...) the next root is ${nextRoot}, so the next term is **${next}**.`,
      };
    }
  }

  return null;
}

export function trySolveLogic(prompt: string): LogicSolution | null {
  const lower = prompt.toLowerCase();

  // 0. Classic riddles (checked first — these are the most literal/specific match)
  const riddleResult = trySolveClassicRiddle(prompt);
  if (riddleResult) return riddleResult;

  const allButResult = trySolveAllButRiddle(prompt);
  if (allButResult) return allButResult;

  // 0a. Natural-language categorical syllogisms (checked before the literal-keyword version below)
  const syllogismResult = trySolveSyllogism(prompt);
  if (syllogismResult) return syllogismResult;

  const capabilitySyllogismResult = trySolveCapabilitySyllogism(prompt);
  if (capabilitySyllogismResult) return capabilitySyllogismResult;

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

  // 3a. River Crossing Puzzle (Fox, Chicken, Grain/Corn) — same structure as wolf/goat/cabbage
  // above but a different cast (fox eats chicken, chicken eats grain), which round-2 testing
  // found fell through untouched since only the wolf/goat/cabbage wording was matched.
  if (lower.includes('fox') && lower.includes('chicken') && (lower.includes('grain') || lower.includes('corn') || lower.includes('feed'))) {
    return {
      isLogic: true,
      title: 'River Crossing Constraint Satisfaction Solution',
      verdict: 'Complete safe crossing achieved in 7 steps.',
      formalSteps: [
        'Step 1: Take the Chicken across to the east bank (Fox and Grain are safely left together on the west bank — a fox won\'t eat grain).',
        'Step 2: Return alone to the west bank.',
        'Step 3: Take the Fox across to the east bank, leaving it there.',
        'Step 4: Take the Chicken back with you to the west bank (can\'t leave Fox and Chicken alone together on the east bank).',
        'Step 5: Take the Grain across to the east bank, leaving it safely with the Fox.',
        'Step 6: Return alone to the west bank.',
        'Step 7: Take the Chicken across to the east bank. All three — Fox, Chicken, and Grain — are now safely on the east bank.',
      ],
      explanation: `### Constraint Graph Analysis\n\n- Forbidden States: $\\{\\text{Fox}, \\text{Chicken}\\}$ without farmer, and $\\{\\text{Chicken}, \\text{Grain}\\}$ without farmer.\n- Key Insight: The Chicken is the mutual conflicting element (eaten by the fox, eats the grain), so ferrying it back on the return leg is what breaks the deadlock — identical structure to the wolf/goat/cabbage version, just relabeled.`,
    };
  }

  // 3b. "What's the next number in the sequence" puzzles — arithmetic, geometric, and square
  // progressions. Previously unhandled entirely, so these fell through to corpus search and
  // matched on stray words like "number"/"sequence", landing on unrelated math trivia.
  const sequenceResult = trySolveSequence(prompt);
  if (sequenceResult) return sequenceResult;

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
