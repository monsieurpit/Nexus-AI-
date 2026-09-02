/**
 * Mathematical Computation & Analytical Solver Engine
 * 100% Autonomous, Offline-First, Zero-External-API Mathematical Intelligence Core.
 * Includes a full recursive-descent arithmetic parser, scientific functions (sin, cos, tan, sqrt, abs, log, ln, exp, floor, ceil, round),
 * constants (pi, e), power operations (^, ², ³), unit conversions, and algebraic solvers.
 */

export interface MathSolution {
  isMath: boolean;
  expression?: string;
  result?: string;
  steps: string[];
  explanation: string;
}

// Trial division up to √n — deterministic and exact, unlike relying on the LLM's arithmetic
// "intuition" (which is unreliable for these facts even for a small number like 17, observed
// live). Fast enough for anything a user would plausibly type by hand; not meant for
// cryptography-scale inputs.
function isPrimeNumber(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// Returns the first divisor pair found (smallest factor, its cofactor) — used only for a
// human-readable "here's why it's not prime" example, not for full factorization.
function smallestFactorPair(n: number): [number, number] {
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return [i, n / i];
  }
  return [1, n];
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export class RecursiveDescentParser {
  private pos = 0;
  private expr = '';
  public steps: string[] = [];

  private formatNumber(n: number): string {
    if (Number.isInteger(n) && Math.abs(n) < 1e15) {
      return n.toString();
    }
    if (Math.abs(n) < 0.001 || Math.abs(n) > 1e9) {
      return n.toExponential(4);
    }
    return parseFloat(n.toPrecision(7)).toString();
  }

  public evaluate(raw: string): { value: number; formatted: string; steps: string[] } | null {
    this.steps = [];
    const cleaned = this.preprocess(raw);
    const expr = cleaned.replace(/\s+/g, '');
    if (!expr) return null;

    this.expr = expr;
    this.pos = 0;

    try {
      const val = this.parseAddSub();
      // Found live: "square root of -4" computed to a bare, literal "NaN" and shipped that
      // string straight to the user as the answer — Math.sqrt() of a negative number is NaN in
      // JS, and nothing here ever checked for it. This solver only handles real-number
      // arithmetic (no complex-number support), so NaN/Infinity results are returned as null
      // (a graceful "couldn't solve this deterministically") rather than displayed as-is,
      // falling through to the LLM — which is the right tool for explaining something like "the
      // square root of a negative number is imaginary" in natural language, unlike this parser.
      if (val === null || this.pos !== this.expr.length || !Number.isFinite(val)) {
        return null;
      }
      const formatted = this.formatNumber(val);
      this.steps.push(`Result: ${formatted}`);
      return { value: val, formatted, steps: this.steps };
    } catch {
      return null;
    }
  }

  private preprocess(s: string): string {
    let t = s.toLowerCase();
    const strip = [
      'calculate',
      'compute',
      'what is',
      "what's",
      'whats',
      'solve',
      'equals',
      'equal to',
      '=',
      '?',
      'please',
      'how much is',
      // Polish equivalents — found live: "ile to jest 47 razy 83" (what is 47 times 83, in
      // Polish) reached the LLM with zero deterministic handling at all, since every trigger and
      // preprocessing step in this file was English-only, and got the multiplication wrong (3911
      // instead of 3901). "ile to jest"/"ile jest" is the Polish "what is"/"how much is".
      'ile to jest',
      'ile jest',
      'oblicz',
      'policz',
      // French equivalents — same gap Polish had before its own fix above, found in a full
      // French-support review. "combien font/fait/est/sont" is the French "what is"/"how much
      // is".
      'combien font',
      'combien fait',
      'combien sont',
      'combien est',
      "c'est quoi",
    ];
    for (const w of strip) {
      t = t.replaceAll(w, ' ');
    }

    // "half a dozen"/"half dozen" and "a dozen" need their own phrase-level replacements BEFORE
    // the single-word map below — "dozen" alone becomes "12" via that map, which would leave
    // "half 12" (not valid expression syntax, and not the "6" it actually means) or a stray
    // leading "a" glued onto "12" once all whitespace gets stripped further down in evaluate()
    // (parseAtom has no idea what to do with a leading "a" and the whole parse fails). Found
    // live: "how much is a dozen plus half a dozen" reached the LLM with no numeric handling for
    // "dozen" at all and got a completely garbled, wrong answer (should be 12 + 6 = 18).
    t = t.replace(/\bhalf\s+(?:a\s+)?dozen\b/g, '6').replace(/\ba\s+dozen\b/g, '12');

    // Word-number replacements
    const nums: Record<string, string> = {
      zero: '0',
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
      ten: '10',
      eleven: '11',
      twelve: '12',
      twenty: '20',
      hundred: '100',
      thousand: '1000',
    };
    for (const [word, digit] of Object.entries(nums)) {
      t = t.replace(new RegExp(`\\b${word}\\b`, 'g'), digit);
    }

    // "N dozen" (e.g. "two dozen", already digit-substituted to "2 dozen" by this point) means
    // N x 12 — computed inline rather than left as a bare "dozen" -> "12" substitution, which a
    // code review caught would otherwise silently CONCATENATE instead of multiply ("2" immediately
    // followed by "12" becomes the single number "212" once whitespace is stripped further down in
    // evaluate(), not 2 x 12 = 24). Must run after the word-number pass above (so "two" is already
    // "2") and before the bare "dozen" fallback below.
    t = t.replace(/\b(\d+)\s+dozen\b/g, (_, n) => String(parseInt(n, 10) * 12));
    // Any remaining unquantified "dozen" (a bare "dozen" with no preceding number, e.g. just the
    // word on its own) falls back to 12, same as the original single-word map entry.
    t = t.replace(/\bdozen\b/g, '12');

    // Natural-language function forms — rewritten to real function-call/expression syntax before
    // the parser ever sees them. "square root of 144" isn't valid expression syntax on its own,
    // even though the parser already fully supports sqrt(144); nothing was ever converting one
    // into the other, so this extremely basic question had zero coverage.
    t = t
      .replace(/(?:the\s+)?square\s*root\s+of\s+(-?[\d.]+)/gi, 'sqrt($1)')
      .replace(/(?:the\s+)?cube\s*root\s+of\s+(-?[\d.]+)/gi, '($1^(1/3))')
      .replace(/(?:the\s+)?absolute\s+value\s+of\s+(-?[\d.]+)/gi, 'abs($1)');

    // Operators
    t = t
      .replace(/\s+plus\s+/g, '+')
      .replace(/\s+minus\s+/g, '-')
      .replace(/\s+times\s+/g, '*')
      .replace(/\s+multiplied by\s+/g, '*')
      .replace(/\s+divided by\s+/g, '/')
      .replace(/\s+over\s+/g, '/')
      .replace(/\s+mod\s+/g, '%')
      .replace(/\s+to the power(?: of)?\s+/g, '^')
      .replace(/\s+squared\b/g, '^2')
      .replace(/\s+cubed\b/g, '^3')
      // Polish operator words — see the "ile to jest" strip list above for why these were added.
      // "razy" (times), "dodać"/"plus" already shared with English (add), "odjąć"/"minus" already
      // shared (subtract), "podzielić przez"/bare "przez" (divided by).
      .replace(/\s+razy\s+/g, '*')
      .replace(/\s+dodać\s+/g, '+')
      .replace(/\s+odjąć\s+/g, '-')
      .replace(/\s+podzielić przez\s+/g, '/')
      .replace(/\s+przez\s+/g, '/')
      // French operator words — same gap Polish had above, found in a full French-support
      // review. "fois" (times), "plus"/"moins" (subtract — "plus" is spelled the same as
      // English "add" and needs no separate replacement), "divisé par" (divided by).
      .replace(/\s+fois\s+/g, '*')
      .replace(/\s+moins\s+/g, '-')
      .replace(/\s+divisé par\s+/g, '/')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3');

    return t.trim();
  }

  private parseAddSub(): number | null {
    let left = this.parseMulDiv();
    if (left === null) return null;

    while (this.pos < this.expr.length) {
      const op = this.expr[this.pos];
      if (op !== '+' && op !== '-') break;
      this.pos++;
      const right = this.parseMulDiv();
      if (right === null) return null;

      if (op === '+') {
        this.steps.push(`${this.formatNumber(left)} + ${this.formatNumber(right)} = ${this.formatNumber(left + right)}`);
        left += right;
      } else {
        this.steps.push(`${this.formatNumber(left)} - ${this.formatNumber(right)} = ${this.formatNumber(left - right)}`);
        left -= right;
      }
    }
    return left;
  }

  private parseMulDiv(): number | null {
    let left = this.parseUnary();
    if (left === null) return null;

    while (this.pos < this.expr.length) {
      const op = this.expr[this.pos];
      if (op !== '*' && op !== '/' && op !== '%') break;
      this.pos++;
      const right = this.parseUnary();
      if (right === null) return null;

      if (op === '*') {
        this.steps.push(`${this.formatNumber(left)} × ${this.formatNumber(right)} = ${this.formatNumber(left * right)}`);
        left *= right;
      } else if (op === '/') {
        if (right === 0) {
          this.steps.push('Division by zero error!');
          return null;
        }
        this.steps.push(`${this.formatNumber(left)} ÷ ${this.formatNumber(right)} = ${this.formatNumber(left / right)}`);
        left /= right;
      } else if (op === '%') {
        if (right === 0) return null;
        this.steps.push(`${this.formatNumber(left)} mod ${this.formatNumber(right)} = ${this.formatNumber(left % right)}`);
        left = left % right;
      }
    }
    return left;
  }

  // Unary minus must bind LOOSER than exponentiation, matching standard calculator convention
  // (Google, Wolfram Alpha, Python, and virtually every real calculator agree: -2^2 = -(2^2) =
  // -4, not (-2)^2 = 4). A code review caught that the old structure had parsePower() call
  // parseUnary() for its base, so the unary minus was consumed and applied BEFORE parsePower ever
  // saw the '^' — verified: Math.pow(-2, 2) = 4, confirming the old code's actual output diverged
  // from the conventional answer. parseUnary now wraps parsePower (negating the result of the
  // whole power expression) instead of the other way around; parsePower's own base comes from
  // parseAtom directly, so a negative sign can never sneak in before the base is exponentiated.
  // The exponent side still recurses through parseUnary (not parsePower) so "2^-1" (a negative
  // exponent) keeps working.
  private parsePower(): number | null {
    const base = this.parseAtom();
    if (base === null) return null;

    if (this.pos < this.expr.length && this.expr[this.pos] === '^') {
      this.pos++;
      const exp = this.parseUnary();
      if (exp === null) return null;
      const res = Math.pow(base, exp);
      this.steps.push(`${this.formatNumber(base)} ^ ${this.formatNumber(exp)} = ${this.formatNumber(res)}`);
      return res;
    }
    return base;
  }

  private parseUnary(): number | null {
    if (this.pos >= this.expr.length) return null;
    if (this.expr[this.pos] === '-') {
      this.pos++;
      const val = this.parsePower();
      return val === null ? null : -val;
    }
    if (this.expr[this.pos] === '+') {
      this.pos++;
    }
    return this.parsePower();
  }

  private parseAtom(): number | null {
    if (this.pos >= this.expr.length) return null;

    // Parentheses
    if (this.expr[this.pos] === '(') {
      this.pos++;
      const val = this.parseAddSub();
      if (val === null || this.pos >= this.expr.length || this.expr[this.pos] !== ')') {
        return null;
      }
      this.pos++;
      return val;
    }

    // Functions
    const functions = ['sqrt', 'abs', 'sin', 'cos', 'tan', 'log', 'ln', 'exp', 'floor', 'ceil', 'round'];
    for (const fn of functions) {
      if (this.expr.slice(this.pos).startsWith(fn)) {
        const fnEnd = this.pos + fn.length;
        if (fnEnd < this.expr.length && this.expr[fnEnd] === '(') {
          this.pos = fnEnd + 1;
          const arg = this.parseAddSub();
          if (arg === null || this.pos >= this.expr.length || this.expr[this.pos] !== ')') {
            return null;
          }
          this.pos++;
          return this.applyFunction(fn, arg);
        }
      }
    }

    // Constants
    if (this.expr.slice(this.pos).startsWith('pi')) {
      this.pos += 2;
      return Math.PI;
    }
    if (this.expr.slice(this.pos).startsWith('e') && (this.pos + 1 === this.expr.length || !/[a-z]/.test(this.expr[this.pos + 1]))) {
      this.pos += 1;
      return Math.E;
    }

    // Numbers
    const start = this.pos;
    while (this.pos < this.expr.length && (/\d/.test(this.expr[this.pos]) || this.expr[this.pos] === '.')) {
      this.pos++;
    }
    if (start === this.pos) return null;
    const numStr = this.expr.slice(start, this.pos);
    const n = parseFloat(numStr);
    return isNaN(n) ? null : n;
  }

  private applyFunction(fn: string, arg: number): number {
    let r = arg;
    switch (fn) {
      case 'sqrt':
        r = Math.sqrt(arg);
        this.steps.push(`√(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'abs':
        r = Math.abs(arg);
        this.steps.push(`|${this.formatNumber(arg)}| = ${this.formatNumber(r)}`);
        break;
      case 'sin':
        r = Math.sin(arg);
        this.steps.push(`sin(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'cos':
        r = Math.cos(arg);
        this.steps.push(`cos(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'tan':
        r = Math.tan(arg);
        this.steps.push(`tan(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'log':
        r = Math.log10(arg);
        this.steps.push(`log10(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'ln':
        r = Math.log(arg);
        this.steps.push(`ln(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'exp':
        r = Math.exp(arg);
        this.steps.push(`e^(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'floor':
        r = Math.floor(arg);
        this.steps.push(`floor(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'ceil':
        r = Math.ceil(arg);
        this.steps.push(`ceil(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
      case 'round':
        r = Math.round(arg);
        this.steps.push(`round(${this.formatNumber(arg)}) = ${this.formatNumber(r)}`);
        break;
    }
    return r;
  }
}

// Parses one side of a single-variable linear equation ("3x - 9", "12", "-x + 4") into its
// total x-coefficient and constant term. Terms are matched left-to-right with their leading
// sign, so "3x - 9 + x" correctly accumulates coefficient 4 and constant -9 in one pass.
function parseLinearSide(side: string): { coeff: number; constant: number } {
  let coeff = 0;
  let constant = 0;
  const termRegex = /([+-]?\s*\d*\.?\d*)\s*x|([+-]?\s*\d+\.?\d*)/gi;
  let match: RegExpExecArray | null;
  while ((match = termRegex.exec(side)) !== null) {
    if (match[1] !== undefined) {
      // The coefficient prefix is entirely optional (every part of \d*\.?\d* can match zero
      // characters), so this alternative can match a bare "x" anywhere a letter happens to
      // precede it, not just an actual variable token — a code review caught that "Ajax = 5" (or
      // "tax = 3200", "max = 800", any word merely ENDING in "x" next to a literal "=") gets
      // silently parsed as a linear equation and confidently "solved" as "x = 5"/"x = 3200"/etc.
      // A real variable term is never directly preceded by another letter — only whitespace, an
      // operator, a digit (the intentional "3x" glued-coefficient case), '(', or start-of-string
      // — so reject any match where that's not the case. Checked by index rather than a
      // lookbehind assertion in the regex itself: this file is reachable from the browser bundle,
      // whose build target includes an engine without lookbehind support (see the same reasoning
      // applied to ruleEngine.ts's forbidden-phrase regex this session).
      const precedingChar = side[match.index - 1];
      if (precedingChar && /[a-z]/i.test(precedingChar)) continue;
      const raw = match[1].replace(/\s+/g, '');
      if (raw === '' || raw === '+') coeff += 1;
      else if (raw === '-') coeff -= 1;
      else coeff += parseFloat(raw);
    } else if (match[2] !== undefined) {
      const raw = match[2].replace(/\s+/g, '');
      if (raw !== '' && raw !== '+' && raw !== '-') constant += parseFloat(raw);
    }
  }
  return { coeff, constant };
}

// Basic single-variable linear equations: "x + 5 = 12", "3x - 9 = 0", "2x + 3 = 11". mathSolver's
// arithmetic parser (RecursiveDescentParser below) has no concept of a variable to solve for, so
// "solve x + 5 = 12" previously just failed to parse and fell all the way through to plain
// corpus search on the leftover word "solve", landing on an unrelated "Algorithms" document.
function trySolveLinearEquation(input: string): MathSolution | null {
  // Not \bx\b — in "3x - 9 = 0" the x is glued directly to its coefficient digit, so there's
  // no word boundary on its left side and \b would never match it.
  if (!/x/i.test(input) || !input.includes('=')) return null;

  const stripped = input
    .toLowerCase()
    .replace(/\b(solve|calculate|compute|find x|for x|what is x if)\b/g, ' ')
    .replace(/\?/g, '');

  const sides = stripped.split('=');
  if (sides.length !== 2) return null;

  const left = parseLinearSide(sides[0]);
  const right = parseLinearSide(sides[1]);
  const coeff = left.coeff - right.coeff;
  if (coeff === 0) return null;

  const constDiff = right.constant - left.constant;
  const x = constDiff / coeff;
  const formattedX = Number.isInteger(x) ? `${x}` : x.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
  // "0 - -9" reads awkwardly — render subtracting a negative as adding its magnitude instead.
  const subtractConst = (a: number, b: number) => (b < 0 ? `${a} + ${-b}` : `${a} - ${b}`);

  return {
    isMath: true,
    expression: input.trim(),
    result: `x = ${formattedX}`,
    steps: [
      `Left side: ${left.coeff}x + (${left.constant}) — Right side: ${right.coeff}x + (${right.constant})`,
      `Collect x terms on one side: (${left.coeff} - ${right.coeff})x = ${subtractConst(right.constant, left.constant)}`,
      `${coeff}x = ${constDiff}`,
      `x = ${constDiff} / ${coeff} = ${formattedX}`,
    ],
    explanation: `**Result:** \`x = ${formattedX}\`\n\n**Calculation Steps:**\n• Left side: ${left.coeff}x + (${left.constant})\n• Right side: ${right.coeff}x + (${right.constant})\n• (${left.coeff} - ${right.coeff})x = ${subtractConst(right.constant, left.constant)}\n• ${coeff}x = ${constDiff}\n• x = ${formattedX}`,
  };
}

/**
 * Unit conversions handler
 */
// Fixed physical-constant reference points, looked up directly rather than trusting generation —
// same "compute/lookup, don't generate" principle as the rest of this file. Found live: asked
// "what's the boiling point of water in fahrenheit", the corpus retrieval correctly grounded the
// LLM on a document that explicitly states "100°C = 212°F (water boils at sea level)" verbatim —
// and the model STILL got it wrong, apparently trying to freehand-apply a nearby "double Celsius
// and add 30" mental-math shortcut from the same document instead of just using the explicit
// fact sitting right there, and botched even that (answered 200, not even applying the "+30").
// A well-known, fixed, exact physical constant like this has no business being generated at all
// when it can just be looked up.
const PHYSICAL_CONSTANTS_F: Array<[RegExp, string, string]> = [
  [/\bboiling\s+point\s+of\s+water\b/i, 'in Fahrenheit', '212°F'],
  [/\bfreezing\s+point\s+of\s+water\b/i, 'in Fahrenheit', '32°F'],
  [/\b(?:normal\s+)?(?:human\s+)?body\s+temperature\b/i, 'in Fahrenheit', '98.6°F'],
];
const PHYSICAL_CONSTANTS_C: Array<[RegExp, string, string]> = [
  [/\bboiling\s+point\s+of\s+water\b/i, 'in Celsius', '100°C'],
  [/\bfreezing\s+point\s+of\s+water\b/i, 'in Celsius', '0°C'],
  [/\b(?:normal\s+)?(?:human\s+)?body\s+temperature\b/i, 'in Celsius', '37°C'],
];

function tryPhysicalConstantLookup(input: string): MathSolution | null {
  const lower = input.toLowerCase();
  const wantsFahrenheit = /\bfahrenheit\b|\b(?:in|to)\s+f\b/i.test(lower);
  const wantsCelsius = /\bcelsius\b|\b(?:in|to)\s+c\b/i.test(lower);
  // Ambiguous or unstated unit ("what's the boiling point of water") is intentionally left
  // unhandled here — the corpus doc covers that framing fine on its own, this lookup exists
  // specifically for the two exact-unit phrasings the LLM got wrong.
  if (!wantsFahrenheit && !wantsCelsius) return null;
  const table = wantsFahrenheit ? PHYSICAL_CONSTANTS_F : PHYSICAL_CONSTANTS_C;
  for (const [pattern, unitLabel, value] of table) {
    if (pattern.test(lower)) {
      const subject = lower.match(pattern)?.[0] || 'that';
      return {
        isMath: true,
        expression: `${subject} ${unitLabel}`,
        result: value,
        steps: [`Fixed physical reference point, not a computation: ${subject} = ${value}.`],
        explanation: `**${value}** — this is a fixed reference point, not something that varies or needs computing.`,
      };
    }
  }
  return null;
}

function tryUnitConversion(input: string): MathSolution | null {
  const q = input.toLowerCase();

  // Temperature: C to F
  const cToFMatch = q.match(/(-?\d+\.?\d*)\s*(?:celsius|c)\b\s*(?:to|in)\s*(?:fahrenheit|f)\b/i);
  if (cToFMatch) {
    const c = parseFloat(cToFMatch[1]);
    const f = (c * 9) / 5 + 32;
    return {
      isMath: true,
      expression: `${c}°C to °F`,
      result: `${f.toFixed(2)}°F`,
      steps: [
        `Formula: (°C × 9/5) + 32`,
        `Compute: (${c} × 1.8) + 32 = ${f.toFixed(2)}°F`,
      ],
      explanation: `**${c}°C** is equal to **${f.toFixed(2)}°F**.`,
    };
  }

  // Temperature: F to C
  const fToCMatch = q.match(/(-?\d+\.?\d*)\s*(?:fahrenheit|f)\b\s*(?:to|in)\s*(?:celsius|c)\b/i);
  if (fToCMatch) {
    const f = parseFloat(fToCMatch[1]);
    const c = ((f - 32) * 5) / 9;
    return {
      isMath: true,
      expression: `${f}°F to °C`,
      result: `${c.toFixed(2)}°C`,
      steps: [
        `Formula: (°F - 32) × 5/9`,
        `Compute: (${f} - 32) × 0.5556 = ${c.toFixed(2)}°C`,
      ],
      explanation: `**${f}°F** is equal to **${c.toFixed(2)}°C**.`,
    };
  }

  // Distance: km to miles
  const kmToMiMatch = q.match(/(\d+\.?\d*)\s*(?:km|kilometers|kilometres)\b\s*(?:to|in)\s*(?:miles|mi)\b/i);
  if (kmToMiMatch) {
    const km = parseFloat(kmToMiMatch[1]);
    const mi = km * 0.621371;
    return {
      isMath: true,
      expression: `${km} km to miles`,
      result: `${mi.toFixed(4)} miles`,
      steps: [
        `Conversion factor: 1 km ≈ 0.621371 miles`,
        `${km} × 0.621371 = ${mi.toFixed(4)} miles`,
      ],
      explanation: `**${km} kilometers** is equal to **${mi.toFixed(4)} miles**.`,
    };
  }

  // Distance: miles to km
  const miToKmMatch = q.match(/(\d+\.?\d*)\s*(?:miles|mi)\b\s*(?:to|in)\s*(?:km|kilometers|kilometres)\b/i);
  if (miToKmMatch) {
    const mi = parseFloat(miToKmMatch[1]);
    const km = mi * 1.60934;
    return {
      isMath: true,
      expression: `${mi} miles to km`,
      result: `${km.toFixed(4)} km`,
      steps: [
        `Conversion factor: 1 mile ≈ 1.60934 km`,
        `${mi} × 1.60934 = ${km.toFixed(4)} km`,
      ],
      explanation: `**${mi} miles** is equal to **${km.toFixed(4)} km**.`,
    };
  }

  // Weight: kg to lbs
  const kgToLbsMatch = q.match(/(\d+\.?\d*)\s*(?:kg|kilos|kilograms)\b\s*(?:to|in)\s*(?:lbs|pounds)\b/i);
  if (kgToLbsMatch) {
    const kg = parseFloat(kgToLbsMatch[1]);
    const lbs = kg * 2.20462;
    return {
      isMath: true,
      expression: `${kg} kg to lbs`,
      result: `${lbs.toFixed(4)} lbs`,
      steps: [
        `Conversion factor: 1 kg ≈ 2.20462 lbs`,
        `${kg} × 2.20462 = ${lbs.toFixed(4)} lbs`,
      ],
      explanation: `**${kg} kg** is equal to **${lbs.toFixed(4)} pounds (lbs)**.`,
    };
  }

  // Weight: lbs to kg
  const lbsToKgMatch = q.match(/(\d+\.?\d*)\s*(?:lbs|pounds)\b\s*(?:to|in)\s*(?:kg|kilos|kilograms)\b/i);
  if (lbsToKgMatch) {
    const lbs = parseFloat(lbsToKgMatch[1]);
    const kg = lbs / 2.20462;
    return {
      isMath: true,
      expression: `${lbs} lbs to kg`,
      result: `${kg.toFixed(4)} kg`,
      steps: [
        `Conversion factor: 1 lb ≈ 0.453592 kg`,
        `${lbs} ÷ 2.20462 = ${kg.toFixed(4)} kg`,
      ],
      explanation: `**${lbs} pounds** is equal to **${kg.toFixed(4)} kg**.`,
    };
  }

  // Distance/weight, reversed "how many X are/is in N Y" phrasing — the volume-unit table already
  // supports this sentence shape (see howManyMatch below), but it was never carried over to
  // distance/weight above, which only ever matched the forward "N unit to unit" order. Verified
  // live: "10 km to miles" worked, but the equally natural "how many miles are in 10 km" (or the
  // singular-verb "how many miles is 10 km") returned null — same bug class as the volume table
  // was already fixed for.
  const howManyDistanceWeightMatch = q.match(
    /how\s+many\s+(miles|mi|km|kilometers|kilometres|lbs|pounds|kg|kilos|kilograms)\s+(?:are|is)\s+(?:in\s+)?(\d+\.?\d*)\s*(miles|mi|km|kilometers|kilometres|lbs|pounds|kg|kilos|kilograms)\b/i
  );
  if (howManyDistanceWeightMatch) {
    const toUnitRaw = howManyDistanceWeightMatch[1].toLowerCase();
    const amount = parseFloat(howManyDistanceWeightMatch[2]);
    const fromUnitRaw = howManyDistanceWeightMatch[3].toLowerCase();
    const isDistanceUnit = (u: string) => /^(?:miles?|mi|km|kilometers?|kilometres?)$/.test(u);
    const isKm = (u: string) => /^(?:km|kilometers?|kilometres?)$/.test(u);
    const isWeightUnit = (u: string) => /^(?:lbs|pounds?|kg|kilos?|kilograms?)$/.test(u);
    const isKg = (u: string) => /^(?:kg|kilos?|kilograms?)$/.test(u);
    if (isDistanceUnit(toUnitRaw) && isDistanceUnit(fromUnitRaw)) {
      const result = isKm(fromUnitRaw) ? amount * 0.621371 : amount * 1.60934;
      const toUnitLabel = isKm(toUnitRaw) ? 'km' : 'miles';
      return {
        isMath: true,
        expression: `${amount} ${fromUnitRaw} in ${toUnitLabel}`,
        result: `${result.toFixed(4)} ${toUnitLabel}`,
        steps: [
          isKm(fromUnitRaw) ? `Conversion factor: 1 km ≈ 0.621371 miles` : `Conversion factor: 1 mile ≈ 1.60934 km`,
          `${amount} × ${isKm(fromUnitRaw) ? 0.621371 : 1.60934} = ${result.toFixed(4)} ${toUnitLabel}`,
        ],
        explanation: `There are **${result.toFixed(4)} ${toUnitLabel}** in ${amount} ${fromUnitRaw}.`,
      };
    }
    if (isWeightUnit(toUnitRaw) && isWeightUnit(fromUnitRaw)) {
      const result = isKg(fromUnitRaw) ? amount * 2.20462 : amount / 2.20462;
      const toUnitLabel = isKg(toUnitRaw) ? 'kg' : 'lbs';
      return {
        isMath: true,
        expression: `${amount} ${fromUnitRaw} in ${toUnitLabel}`,
        result: `${result.toFixed(4)} ${toUnitLabel}`,
        steps: [
          isKg(fromUnitRaw) ? `Conversion factor: 1 kg ≈ 2.20462 lbs` : `Conversion factor: 1 lb ≈ 0.453592 kg`,
          `${amount} ${isKg(fromUnitRaw) ? '×' : '÷'} ${isKg(fromUnitRaw) ? 2.20462 : 2.20462} = ${result.toFixed(4)} ${toUnitLabel}`,
        ],
        explanation: `There are **${result.toFixed(4)} ${toUnitLabel}** in ${amount} ${fromUnitRaw}.`,
      };
    }
  }

  // Volume: any US customary/metric volume unit to any other, via a single shared lookup table
  // (each unit's size in liters) rather than one hand-written function per pair — a gallon has 6
  // other common units it might convert to/from (quart, pint, cup, fl oz, liter, ml), and every
  // other conversion in this file up to this point is one explicit pair at a time, which doesn't
  // scale to a 7-unit category without becoming unreadable. Added after a live-observed
  // hallucination: asked "how many ounces in a gallon," the LLM answered 287.9 (using a wrong
  // 8.45 oz/cup factor) — the correct answer is 128 (16 cups × 8 US fl oz/cup exactly). Every one
  // of these had zero deterministic coverage before this, so the LLM was guessing at conversion
  // factors from memory with no verification at all.
  const volumeUnitLiters: Record<string, number> = {
    gallon: 3.785411784, gallons: 3.785411784, gal: 3.785411784,
    quart: 0.946352946, quarts: 0.946352946, qt: 0.946352946,
    pint: 0.473176473, pints: 0.473176473, pt: 0.473176473,
    cup: 0.2365882365, cups: 0.2365882365,
    'fl oz': 0.0295735296, 'fluid ounce': 0.0295735296, 'fluid ounces': 0.0295735296, 'fl. oz': 0.0295735296,
    // Bare "ounce(s)"/"oz" is what people overwhelmingly actually type in casual conversation
    // ("how many ounces in a gallon") — technically ambiguous with weight ounces, but in a volume
    // context (this table) it's unambiguous, and requiring "fluid ounces" every time would miss
    // the exact phrasing that surfaced this whole gap in the first place.
    ounce: 0.0295735296, ounces: 0.0295735296, oz: 0.0295735296,
    liter: 1, liters: 1, litre: 1, litres: 1, l: 1,
    milliliter: 0.001, milliliters: 0.001, millilitre: 0.001, millilitres: 0.001, ml: 0.001,
    tablespoon: 0.0147868, tablespoons: 0.0147868, tbsp: 0.0147868,
    teaspoon: 0.00492892, teaspoons: 0.00492892, tsp: 0.00492892,
  };
  const volUnitPattern = Object.keys(volumeUnitLiters)
    .sort((a, b) => b.length - a.length) // longest first so "fl oz" matches before a hypothetical shorter overlapping key
    .map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const volMatch = q.match(new RegExp(`(\\d+\\.?\\d*)\\s*(${volUnitPattern})\\b\\s*(?:to|in)\\s*(?:an?\\s+)?(${volUnitPattern})\\b`, 'i'));
  if (volMatch) {
    const amount = parseFloat(volMatch[1]);
    const fromUnit = volMatch[2].toLowerCase();
    const toUnit = volMatch[3].toLowerCase();
    const liters = amount * volumeUnitLiters[fromUnit];
    const result = liters / volumeUnitLiters[toUnit];
    return {
      isMath: true,
      expression: `${amount} ${fromUnit} to ${toUnit}`,
      result: `${formatMathResult(result)} ${toUnit}`,
      steps: [
        `${fromUnit} → liters: ${amount} × ${volumeUnitLiters[fromUnit]} = ${formatMathResult(liters)} L`,
        `liters → ${toUnit}: ${formatMathResult(liters)} ÷ ${volumeUnitLiters[toUnit]} = ${formatMathResult(result)} ${toUnit}`,
      ],
      explanation: `**${amount} ${fromUnit}** is equal to **${formatMathResult(result)} ${toUnit}**.`,
    };
  }

  // "how many X in/per a Y" phrasing ("how many ounces in a gallon") — same table, different
  // sentence shape than the explicit "N unit to unit" conversion above (no starting number, and
  // the units appear in the opposite order: target unit first, source unit second).
  const howManyMatch = q.match(new RegExp(`how\\s+many\\s+(${volUnitPattern})s?\\s+(?:are\\s+)?(?:in|per)\\s+(?:an?\\s+|one\\s+)?(${volUnitPattern})\\b`, 'i'));
  if (howManyMatch) {
    const toUnit = howManyMatch[1].toLowerCase();
    const fromUnit = howManyMatch[2].toLowerCase();
    if (volumeUnitLiters[toUnit] !== undefined && volumeUnitLiters[fromUnit] !== undefined) {
      const result = volumeUnitLiters[fromUnit] / volumeUnitLiters[toUnit];
      return {
        isMath: true,
        expression: `1 ${fromUnit} in ${toUnit}`,
        result: `${formatMathResult(result)} ${toUnit}`,
        steps: [
          `1 ${fromUnit} = ${volumeUnitLiters[fromUnit]} L`,
          `${volumeUnitLiters[fromUnit]} L ÷ ${volumeUnitLiters[toUnit]} L/${toUnit} = ${formatMathResult(result)} ${toUnit}`,
        ],
        explanation: `There are **${formatMathResult(result)} ${toUnit}** in 1 ${fromUnit}.`,
      };
    }
  }

  return null;
}

// Compound time-duration conversion ("1 hour 30 minutes to minutes", "convert 2 days 5 hours to
// hours") — distinct from the volume-unit table above because the SOURCE side can be a compound
// quantity (multiple unit terms added together), not just one number and one unit. Found live:
// "convert 1 hour 30 minutes to minutes" reached the LLM unguarded and got a wrong answer (75,
// not 90) — it seems to have just added the raw numbers (1 + 30 = ... no, more likely misapplied
// some other shortcut) rather than actually converting the hour component to minutes first.
const TIME_UNIT_SECONDS: Record<string, number> = {
  second: 1, seconds: 1, sec: 1, secs: 1,
  minute: 60, minutes: 60, min: 60, mins: 60,
  hour: 3600, hours: 3600, hr: 3600, hrs: 3600,
  day: 86400, days: 86400,
  week: 604800, weeks: 604800,
};
const TIME_UNIT_PATTERN = Object.keys(TIME_UNIT_SECONDS)
  .sort((a, b) => b.length - a.length)
  .join('|');

function tryTimeDurationConversion(input: string): MathSolution | null {
  const q = input.toLowerCase();
  // Requires at least one target-unit keyword after a "to"/"in", and the source side to contain
  // at least one number+unit pair — otherwise this isn't actually a duration-conversion question
  // (avoids misfiring on an unrelated sentence that happens to contain the word "hours").
  const targetMatch = q.match(new RegExp(`\\b(?:to|in)\\s+(${TIME_UNIT_PATTERN})s?\\b(?!\\s*\\d)`, 'i'));
  if (!targetMatch) return null;
  const sourceText = q.slice(0, targetMatch.index);
  const termRegex = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(${TIME_UNIT_PATTERN})\\b`, 'gi');
  const terms: Array<{ amount: number; unit: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = termRegex.exec(sourceText)) !== null) {
    terms.push({ amount: parseFloat(m[1]), unit: m[2].toLowerCase() });
  }
  if (terms.length === 0) return null;

  const toUnit = targetMatch[1].toLowerCase();
  const totalSeconds = terms.reduce((sum, t) => sum + t.amount * TIME_UNIT_SECONDS[t.unit], 0);
  const result = totalSeconds / TIME_UNIT_SECONDS[toUnit];
  const sourceDesc = terms.map((t) => `${formatMathResult(t.amount)} ${t.unit}`).join(' + ');
  return {
    isMath: true,
    expression: `${sourceDesc} in ${toUnit}`,
    result: `${formatMathResult(result)} ${toUnit}`,
    steps: [
      `Convert each term to seconds: ${terms.map((t) => `${formatMathResult(t.amount)} ${t.unit} = ${formatMathResult(t.amount * TIME_UNIT_SECONDS[t.unit])}s`).join(', ')}`,
      `Total: ${formatMathResult(totalSeconds)}s ÷ ${TIME_UNIT_SECONDS[toUnit]}s/${toUnit} = ${formatMathResult(result)} ${toUnit}`,
    ],
    explanation: `**${formatMathResult(result)} ${toUnit}**. ${sourceDesc} adds up to ${formatMathResult(totalSeconds)} seconds total, which is ${formatMathResult(result)} ${toUnit}.`,
  };
}

// Distance/rate/time word problems ("a train travels 60mph for 2.5 hours, how far does it go")
// — classic textbook phrasing with no arithmetic symbols or "calculate"/"solve" keyword for
// detectQueryIntent to latch onto, so these fell all the way through to plain corpus search
// (which had nothing relevant and returned a random unrelated document) instead of ever reaching
// a solver. Covers the three rearrangements of distance = rate × time.
// Standalone version of RecursiveDescentParser's private formatNumber — trySolveRateTimeDistance
// below is the only result path in this file that interpolated a raw float directly into its
// response with no rounding at all (unlike tryUnitConversion's .toFixed calls and every other
// arithmetic path, which all go through the class method this mirrors). A code review caught it:
// 60mph for 2.53 hours computes to 151.79999999999998 in JS float arithmetic, and that exact
// string was going straight into the reply.
function formatMathResult(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toString();
  if (Math.abs(n) < 0.001 || Math.abs(n) > 1e9) return n.toExponential(4);
  return parseFloat(n.toPrecision(7)).toString();
}

// Two-body relative-motion problems ("train A leaves at 60mph, train B leaves at 90mph heading
// toward it, both 180 miles apart — when do they meet?"). Found live: even qwen2.5:7b, escalated
// to via reasoningMode, correctly set up the right formula in its own reasoning text ("add the two
// speeds together, then divide the distance by that") but then botched the actual division itself
// (180 ÷ 150 came out as "1 hour" instead of 1.2) — the exact "compute, don't generate" gap this
// whole file exists to close, just with a stronger model instead of a weaker one. Two bodies
// closing a gap between them combine their speeds (relative closing speed = r1 + r2); this is a
// different formula than trySolveRateTimeDistance below (which only ever handles ONE rate), so a
// second rate mention or "meet"/"toward"/"approaching" language is a strong signal this is the
// two-body shape, not the single-rate one.
function trySolveTwoBodyMeeting(prompt: string): MathSolution | null {
  const lower = prompt.toLowerCase();
  if (!/\bmeet(?:s|ing)?\b|\btoward(?:s)?\b|\bapproaching\b/.test(lower)) return null;

  const rateMatches = [...lower.matchAll(/(\d+(?:\.\d+)?)\s*(?:mph|miles per hour|km\/h|kmh|kilometers per hour|kilometres per hour)/g)];
  if (rateMatches.length !== 2) return null; // not this shape — leave it to trySolveRateTimeDistance's own guard

  const distMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:miles|mi|km|kilometers|kilometres)\b(?!\s*per)/);
  if (!distMatch) return null;

  const r1 = parseFloat(rateMatches[0][1]);
  const r2 = parseFloat(rateMatches[1][1]);
  const distance = parseFloat(distMatch[1]);
  const unit = /km\/h|kmh|kilometers per hour|kilometres per hour|\bkm\b|kilometers|kilometres/.test(lower) ? 'km' : 'miles';
  const combinedRate = r1 + r2;
  if (!(combinedRate > 0) || !(distance > 0)) return null;

  const timeHours = distance / combinedRate;
  const formattedTime = formatMathResult(timeHours);
  const formattedMinutes = formatMathResult(timeHours * 60);

  return {
    isMath: true,
    expression: `${distance} ${unit} ÷ (${r1} + ${r2} ${unit}/h)`,
    result: `${formattedTime} hours (${formattedMinutes} minutes)`,
    steps: [
      `Combined closing speed (they're covering the gap together): ${r1} + ${r2} = ${combinedRate} ${unit}/h`,
      `Time to meet: distance ÷ combined speed = ${distance} ÷ ${combinedRate} = ${formattedTime} hours`,
    ],
    explanation: `Two bodies moving toward each other close the gap at their COMBINED speed, not either one alone: **${r1} + ${r2} = ${combinedRate} ${unit}/h**. Time to meet = distance ÷ combined speed = **${distance} ÷ ${combinedRate} = ${formattedTime} hours** (about ${formattedMinutes} minutes).`,
  };
}

function trySolveRateTimeDistance(prompt: string): MathSolution | null {
  const lower = prompt.toLowerCase();

  // Bail out on the two-body shape handled by trySolveTwoBodyMeeting above instead — this
  // function only ever captures the FIRST rate mention (via .match without /g), so without this
  // guard a two-train "how long until they meet" question would silently compute
  // distance/firstRate (180/60 = 3 hours) and confidently return it as fact, ignoring the second
  // train's speed entirely.
  const allRateMatches = lower.match(/\d+(?:\.\d+)?\s*(?:mph|miles per hour|km\/h|kmh|kilometers per hour|kilometres per hour)/g);
  if ((allRateMatches && allRateMatches.length > 1) || /\bmeet(?:s|ing)?\b|\btoward(?:s)?\b|\bapproaching\b|\bsecond\s+train\b|\banother\s+train\b|\btwo\s+trains\b/.test(lower)) {
    return null;
  }

  const rateMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:mph|miles per hour|km\/h|kmh|kilometers per hour|kilometres per hour)/);
  const timeMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\b/);
  const distMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:miles|mi|km|kilometers|kilometres)\b(?!\s*per)/);

  const unit = /km\/h|kmh|kilometers per hour|kilometres per hour|\bkm\b|kilometers|kilometres/.test(lower) ? 'km' : 'miles';

  // How far? (rate + time given, asking for distance)
  if (rateMatch && timeMatch && /how\s+far|what\s+distance/.test(lower)) {
    const rate = parseFloat(rateMatch[1]);
    const time = parseFloat(timeMatch[1]);
    const distance = formatMathResult(rate * time);
    return {
      isMath: true,
      expression: `${rate} ${unit}/h × ${time} h`,
      result: `${distance} ${unit}`,
      steps: [
        `Formula: distance = rate × time`,
        `${rate} × ${time} = ${distance}`,
      ],
      explanation: `Using distance = rate × time: **${rate} ${unit}/h × ${time} hours = ${distance} ${unit}**.`,
    };
  }

  // How long? (rate + distance given, asking for time)
  if (rateMatch && distMatch && /how\s+long|how\s+many\s+hours|what\s+time/.test(lower)) {
    const rate = parseFloat(rateMatch[1]);
    const distance = parseFloat(distMatch[1]);
    if (rate > 0) {
      const time = formatMathResult(distance / rate);
      return {
        isMath: true,
        expression: `${distance} ${unit} ÷ ${rate} ${unit}/h`,
        result: `${time} hours`,
        steps: [
          `Formula: time = distance ÷ rate`,
          `${distance} ÷ ${rate} = ${time}`,
        ],
        explanation: `Using time = distance ÷ rate: **${distance} ${unit} ÷ ${rate} ${unit}/h = ${time} hours**.`,
      };
    }
  }

  return null;
}

// Simple two-quantity word problems ("if you have 3 apples and eat 2, how many do you have",
// "I had 10 dollars and spent 4, how much is left", "she has 5 books and buys 3 more") —
// extremely common phrasing with no arithmetic symbol, "calculate"/"solve" keyword, or named
// operation for the classifier or the recursive-descent parser to latch onto, so these fell
// straight through to unguarded LLM generation. Observed live: asked "if you have 3 apples and
// eat 2, how many do you have", the model never actually stated a number at all, deflecting with
// a joke instead of answering — even a trivial word problem like this needs a guaranteed-correct
// answer, not a coin flip on whether the model feels like doing the subtraction.
//
// Deliberately narrow: only ever fires on a message containing exactly two numbers connected by
// one recognized addition or subtraction verb, and only asking "how many/how much... left/now/
// do you have" — anything more structurally ambiguous (three+ numbers, an unrecognized verb, a
// question shape this doesn't recognize) returns null and falls through to normal handling rather
// than risk mis-parsing a genuinely different kind of question as a word problem.
const SUBTRACT_VERBS =
  /\b(?:eat|eats|ate|eaten|lose|loses|lost|spend|spends|spent|give\s+away|gives\s+away|gave\s+away|sell|sells|sold|use|uses|used|drop|drops|dropped|break|breaks|broke|remove|removes|removed|take\s+away|takes\s+away|took\s+away)\b/i;
const ADD_VERBS =
  /\b(?:get|gets|got|buy|buys|bought|gain|gains|gained|find|finds|found|receive|receives|received|earn|earns|earned|add|adds|added|collect|collects|collected|win|wins|won)\b/i;

function trySolveWordProblemArithmetic(prompt: string): MathSolution | null {
  const lower = prompt.toLowerCase();
  if (!/how\s+(?:many|much)\b.{0,25}\b(?:left|now|remain|do\s+you\s+have|does\s+\w+\s+have|are\s+there|is\s+there)\b/.test(lower)) {
    return null;
  }
  const numbers = lower.match(/\d+(?:\.\d+)?/g);
  if (!numbers || numbers.length !== 2) return null;

  const start = parseFloat(numbers[0]);
  const change = parseFloat(numbers[1]);
  // Look at the text BETWEEN the two numbers for the connecting verb — the part of the sentence
  // that actually says what happened to the starting quantity.
  const firstIdx = lower.indexOf(numbers[0]);
  const secondIdx = lower.indexOf(numbers[1], firstIdx + numbers[0].length);
  if (secondIdx <= firstIdx) return null;
  const between = lower.slice(firstIdx, secondIdx);

  const isSubtract = SUBTRACT_VERBS.test(between);
  const isAdd = ADD_VERBS.test(between);
  if (isSubtract === isAdd) return null; // neither matched, or (shouldn't happen) both matched — too ambiguous to guess

  const result = isSubtract ? start - change : start + change;
  const opWord = isSubtract ? 'eat/lose/spend/use' : 'get/buy/gain/find';
  return {
    isMath: true,
    expression: `${start} ${isSubtract ? '-' : '+'} ${change}`,
    result: formatMathResult(result),
    steps: [
      `Starting amount: ${formatMathResult(start)}`,
      `${isSubtract ? 'Subtract' : 'Add'} (${opWord}): ${formatMathResult(start)} ${isSubtract ? '-' : '+'} ${formatMathResult(change)} = ${formatMathResult(result)}`,
    ],
    explanation: `**${formatMathResult(result)}**. Starting with ${formatMathResult(start)}, ${isSubtract ? 'minus' : 'plus'} ${formatMathResult(change)} = ${formatMathResult(result)}.`,
  };
}

// Letter/word counting — arguably THE most famous specific LLM weak spot: "how many R's are in
// strawberry" is a coin flip even for large frontier models, because they read subword tokens
// ("straw" + "berry", or similar chunks), not individual letters — the model has no direct access
// to the literal character sequence it's being asked about. Same "compute it, don't generate it"
// principle as every other solver in this file, and an unusually easy one to make deterministic:
// this is just counting, not even arithmetic.
function tryTextCounting(prompt: string): MathSolution | null {
  const lower = prompt.toLowerCase();

  // "how many r's are in strawberry" / "how many times does r appear in strawberry" / "how many
  // times is the letter r in strawberry" — a specific letter's occurrence count in a word.
  // Checked before the whole-word letter-count pattern below since it's the more specific shape.
  const letterOccurrenceMatch = lower.match(
    /how\s+many\s+(?:times\s+(?:does|is)\s+)?(?:the\s+letter\s+)?([a-z])'?s?\s+(?:appear(?:s)?(?:\s+in)?|occur(?:s)?(?:\s+in)?|are(?:\s+there)?(?:\s+in)?|is(?:\s+there)?(?:\s+in)?|in)\s+(?:the\s+word\s+)?['"]?([a-z]+)['"]?\b/i
  );
  if (letterOccurrenceMatch) {
    const letter = letterOccurrenceMatch[1];
    const word = letterOccurrenceMatch[2];
    const count = word.split('').filter((c) => c === letter).length;
    return {
      isMath: true,
      expression: `count of "${letter}" in "${word}"`,
      result: `${count}`,
      steps: [
        `Spelling out "${word}": ${word.split('').join('-')}`,
        `Counting each "${letter}": ${count} occurrence${count === 1 ? '' : 's'}.`,
      ],
      explanation: `**${word}** contains **${count}** occurrence${count === 1 ? '' : 's'} of the letter **${letter}**.`,
    };
  }

  // "how many letters in strawberry" / "how many letters does strawberry have" — total letter
  // count of a single word. Checked after the more specific single-letter pattern above, since
  // "letters" itself would otherwise get captured as the target "letter" by the looser pattern.
  const letterCountMatch = lower.match(
    /how\s+many\s+letters?\s+(?:are\s+)?(?:in|does)\s+(?:the\s+word\s+)?['"]?([a-z]+)['"]?(?:\s+have)?\b/i
  );
  if (letterCountMatch) {
    const word = letterCountMatch[1];
    return {
      isMath: true,
      expression: `letters in "${word}"`,
      result: `${word.length}`,
      steps: [`Spelling out "${word}": ${word.split('').join('-')}`, `Total letters: ${word.length}`],
      explanation: `**${word}** has **${word.length}** letters.`,
    };
  }

  // "how many words are in 'the quick brown fox'" — requires the phrase in quotes, since an
  // unquoted trailing phrase has no reliable end boundary to detect (unlike a single target word
  // above). A user asking this without quotes still gets a real answer from free generation
  // (imperfect but not the same "invisible to the model" blind spot letter-counting is) — this is
  // specifically for the case where the exact phrase is unambiguous.
  const wordCountMatch = prompt.match(/how\s+many\s+words?\s+(?:are\s+)?in\s+["']([^"']+)["']/i);
  if (wordCountMatch) {
    const phrase = wordCountMatch[1].trim();
    const words = phrase.split(/\s+/).filter(Boolean);
    return {
      isMath: true,
      expression: `words in "${phrase}"`,
      result: `${words.length}`,
      steps: [`Splitting on spaces: ${words.join(' | ')}`, `Total words: ${words.length}`],
      explanation: `"${phrase}" has **${words.length}** word${words.length === 1 ? '' : 's'}.`,
    };
  }

  return null;
}

export function trySolveMath(prompt: string): MathSolution | null {
  const cleanPrompt = prompt.trim();
  const lower = cleanPrompt.toLowerCase();

  // -1. Letter/word counting — checked first, before anything else in this function gets a
  // chance to (mis)parse "how many r's in strawberry" as some other shape entirely.
  const textCountRes = tryTextCounting(cleanPrompt);
  if (textCountRes) return textCountRes;

  // 0. Fixed physical-constant lookups (before unit conversion — "boiling point of water in
  // fahrenheit" isn't actually a conversion of a user-supplied number, it's a lookup of a
  // constant, so it needs to run first rather than risk tryUnitConversion's regexes almost-but-
  // not-quite matching it).
  const constantRes = tryPhysicalConstantLookup(cleanPrompt);
  if (constantRes) return constantRes;

  // 1. Unit conversions
  const unitRes = tryUnitConversion(cleanPrompt);
  if (unitRes) return unitRes;

  // 1b. Single-variable linear equations (before the arithmetic parser, which has no concept
  // of a variable to solve for and would otherwise reject these entirely)
  const linearRes = trySolveLinearEquation(cleanPrompt);
  if (linearRes) return linearRes;

  // 1c. Two-body relative-motion word problems ("two trains heading toward each other, when do
  // they meet") — checked before the single-rate solver below, since it needs to claim this shape
  // first rather than let the single-rate solver's own guard just bail to the LLM.
  const twoBodyRes = trySolveTwoBodyMeeting(cleanPrompt);
  if (twoBodyRes) return twoBodyRes;

  // 1c-ii. Distance/rate/time word problems (before the arithmetic parser, which can't make sense
  // of "60mph for 2.5 hours" as an expression at all)
  const rateRes = trySolveRateTimeDistance(cleanPrompt);
  if (rateRes) return rateRes;

  // 1d. Simple two-quantity word problems ("have 3 apples, eat 2, how many left") — same reason
  // as 1c, no arithmetic symbol for the parser below to find. Tried before the general parser so
  // a word problem never gets misread as some other kind of expression first.
  const wordProblemRes = trySolveWordProblemArithmetic(cleanPrompt);
  if (wordProblemRes) return wordProblemRes;

  // 1e. Compound time-duration conversion ("1 hour 30 minutes to minutes") — same reason as 1c/
  // 1d, plus it needs to run before tryUnitConversion's own simpler single-term conversions so a
  // compound source isn't half-matched by one of those instead.
  const timeDurationRes = tryTimeDurationConversion(cleanPrompt);
  if (timeDurationRes) return timeDurationRes;

  // 2. Recursive-descent AST Parser
  const parser = new RecursiveDescentParser();
  const parsed = parser.evaluate(cleanPrompt);
  if (parsed) {
    return {
      isMath: true,
      expression: cleanPrompt,
      result: parsed.formatted,
      steps: parsed.steps,
      explanation: `**Result:** \`${parsed.formatted}\`\n\n**Calculation Steps:**\n` + parsed.steps.map((s) => `• ${s}`).join('\n'),
    };
  }

  // 2b. Average / mean of a list of numbers: e.g. "average of 4 8 15 16 23 42"
  if (/\b(?:average|mean)\s+of\b/i.test(lower)) {
    const numbers = (lower.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    if (numbers.length >= 2) {
      const sum = numbers.reduce((a, b) => a + b, 0);
      const avg = sum / numbers.length;
      return {
        isMath: true,
        expression: `average of ${numbers.join(', ')}`,
        result: `${avg}`,
        steps: [
          `Sum: ${numbers.join(' + ')} = ${sum}`,
          `Count: ${numbers.length} numbers`,
          `Average: ${sum} / ${numbers.length} = ${avg}`,
        ],
        explanation: `The average of **${numbers.join(', ')}** is **${avg}**.`,
      };
    }
  }

  // 3. Percentage calculation: e.g. "what is 15% of 850?" or "20 percent of 1500"
  const percentMatch = lower.match(/(?:what is|calculate|find)?\s*([0-9.]+)\s*(?:%|percent)\s*(?:of)\s*([0-9.]+)/i);
  if (percentMatch) {
    const p = parseFloat(percentMatch[1]);
    const total = parseFloat(percentMatch[2]);
    const ans = (p / 100) * total;
    return {
      isMath: true,
      expression: `${p}% of ${total}`,
      result: `${ans.toLocaleString()}`,
      steps: [
        `Convert percentage to decimal: ${p}% = ${p} / 100 = ${(p / 100).toFixed(4)}`,
        `Multiply decimal factor by base quantity: ${(p / 100).toFixed(4)} × ${total} = ${ans}`,
      ],
      explanation: `**${p}% of ${total}** is equal to **${ans.toLocaleString()}**.`,
    };
  }

  // 3a-ii. Discount / markup phrasing: "15% off an $80 shirt", "what's 20 percent off 45 dollars",
  // "add 8% tax to $50" — a real-world variant of the plain percentage calculation above that
  // asks for the RESULTING price, not just the raw percentage amount. Tested live: the LLM
  // happened to get "15% off an $80 shirt" right on its own, but that's the same reliability
  // gamble every other addition in this file exists to remove — this is an extremely common
  // real-world question shape (sale prices, tips, tax) worth making guaranteed-correct rather
  // than leaving to chance.
  // "off of" ("15% off of 80 dollars") is an extremely common compound connector, but the filler
  // between the discount word and the number only ever allowed "of a"/"of an" (requiring an
  // article after "of"), not bare "of" on its own — verified live, "15% off of 80 dollars" fell
  // through this check entirely (the "of" before "80" had nothing to match it, since it isn't
  // followed by "a"/"an"), reaching free LLM generation and getting a confidently wrong answer
  // ($96, not the correct $68) for a calculation this file exists specifically to make reliable.
  const discountMatch = lower.match(
    /([0-9.]+)\s*(?:%|percent)\s*(off|discount on|discount off|less than|more than|on top of|tax (?:on|to))?\s*(?:of\s+)?(?:an?\s+)?\$?\s*([0-9.]+)(?:\s*dollars?)?/i
  );
  if (discountMatch && discountMatch[2]) {
    const p = parseFloat(discountMatch[1]);
    const base = parseFloat(discountMatch[3]);
    const isAddition = /more than|on top of|tax (?:on|to)/i.test(discountMatch[2]);
    const changeAmount = (p / 100) * base;
    const result = isAddition ? base + changeAmount : base - changeAmount;
    return {
      isMath: true,
      expression: `${p}% ${isAddition ? 'added to' : 'off'} $${base}`,
      result: `$${formatMathResult(result)}`,
      steps: [
        `${p}% of $${base} = ${(p / 100).toFixed(4)} × ${base} = $${formatMathResult(changeAmount)}`,
        `$${base} ${isAddition ? '+' : '-'} $${formatMathResult(changeAmount)} = $${formatMathResult(result)}`,
      ],
      explanation: `**$${formatMathResult(result)}**. ${p}% of $${base} is $${formatMathResult(changeAmount)}, so ${isAddition ? `adding that gives $${base} + $${formatMathResult(changeAmount)}` : `subtracting that from the original price gives $${base} - $${formatMathResult(changeAmount)}`} = **$${formatMathResult(result)}**.`,
    };
  }

  // 3b. Prime number check: e.g. "is 17 a prime number", "is 91 prime", "is 8 not prime"
  //
  // Added after a live-observed hallucination: the local LLM confidently told a user "17 is NOT
  // a prime number" (flatly wrong — 17 is prime) when this query fell through every branch above
  // (it's not an arithmetic EXPRESSION, so the recursive-descent parser never saw it) and reached
  // the unreliable LLM path unguarded. Small local models are fundamentally unreliable at exact
  // number-theory facts like this, so — same principle as the rest of this file — compute it
  // deterministically instead of trusting generation for anything with one objectively correct
  // answer.
  // "the number"/"whether" filler allowed between "is" and the digit — "is 91 prime" worked, but
  // the equally natural "is the number 91 prime" (or "is whether 91 is prime") didn't, silently
  // falling through to the unreliable LLM path this whole check exists to avoid. Verified live:
  // with this gap unfixed, "is the number 91 prime" got a free-generated answer confidently citing
  // "91 is divisible by 3 and 7" — both false (91 = 7 × 13, not divisible by 3 at all) — despite
  // landing on the right yes/no conclusion by coincidence.
  const primeMatch = lower.match(/\bis\s+(?:the\s+number\s+|whether\s+)?(-?\d+)\s+(?:a\s+)?(not\s+)?prime\b/i);
  if (primeMatch) {
    const n = parseInt(primeMatch[1], 10);
    const negated = !!primeMatch[2];
    const prime = isPrimeNumber(n);
    const factors = prime || n < 2 ? [] : smallestFactorPair(n);
    const reasonLine =
      n < 2
        ? `${n} is excluded by definition — primes are defined as integers greater than 1.`
        : prime
        ? `${n} has no divisors other than 1 and itself, checked up to √${n} ≈ ${Math.floor(Math.sqrt(n))}.`
        : `${n} = ${factors[0]} × ${factors[1]}, so it has at least one divisor besides 1 and itself.`;
    // The displayed result always states the actual mathematical fact (is N prime, plainly) —
    // the question's own "not prime" phrasing is just how it was asked, not a second thing to
    // compute; the reasonLine above already makes the "why" unambiguous either way.
    return {
      isMath: true,
      expression: `is ${n} prime?`,
      result: prime ? `Yes, ${n} is prime` : `No, ${n} is not prime`,
      steps: [reasonLine],
      explanation: `**${n} is ${prime ? '' : 'NOT '}a prime number.** ${reasonLine}${negated ? ` (Note: the question asked "not prime" — this answers whether ${n} is actually prime, which is ${prime ? 'yes' : 'no'}.)` : ''}`,
    };
  }

  // 3b-ii. "next/previous prime after/before N" — same reliability motivation as the plain
  // primality check above, just the "find one" variant instead of the "check one" variant.
  // Observed live: "what's the next prime number after 97" happened to get answered correctly by
  // the LLM (101), but that's a coin flip for a small model on this class of question the same
  // way the original "is 17 prime" failure was — computed deterministically here instead.
  const nextPrimeMatch = lower.match(/\b(next|previous)\s+prime(?:\s+number)?\s+(after|before)\s+(-?\d+)\b/i);
  if (nextPrimeMatch) {
    const direction = nextPrimeMatch[1].toLowerCase() === 'next' || nextPrimeMatch[2].toLowerCase() === 'after' ? 1 : -1;
    const start = parseInt(nextPrimeMatch[3], 10);
    let candidate = start + direction;
    let steps = 0;
    // A prime gap this large basically never occurs for any number a person would plausibly type
    // by hand — this cap just guarantees the loop can't spin forever on a pathological input.
    while (steps < 10000 && (candidate < 2 || !isPrimeNumber(candidate))) {
      candidate += direction;
      steps++;
    }
    if (steps >= 10000) return null; // give up gracefully rather than return a wrong/stalled answer
    return {
      isMath: true,
      expression: `${nextPrimeMatch[1]} prime ${nextPrimeMatch[2]} ${start}`,
      result: `${candidate}`,
      steps: [`Checked ${direction === 1 ? 'upward' : 'downward'} from ${start} for the ${direction === 1 ? 'next' : 'previous'} prime.`],
      explanation: `**${candidate}** is the ${direction === 1 ? 'next' : 'previous'} prime number ${direction === 1 ? 'after' : 'before'} ${start}.`,
    };
  }

  // 3c. GCD / LCM of two numbers: e.g. "gcd of 24 and 36", "lcm of 4 and 6"
  // "the numbers" allowed between "of" and the first digit — "gcd of 24 and 36" worked, but the
  // equally natural "gcd of the numbers 24 and 36" didn't, falling through to free generation
  // (which, verified live, didn't even state a number — just rambled about the answer being
  // "obvious" with nothing computed) instead of this deterministic solver.
  const gcdLcmMatch = lower.match(/\b(gcd|greatest common (?:divisor|factor)|lcm|least common multiple)\s+(?:of\s+)?(?:the\s+numbers?\s+)?(-?\d+)\s*(?:and|,)\s*(-?\d+)\b/i);
  if (gcdLcmMatch) {
    const isGcd = /gcd|greatest/i.test(gcdLcmMatch[1]);
    const a = Math.abs(parseInt(gcdLcmMatch[2], 10));
    const b = Math.abs(parseInt(gcdLcmMatch[3], 10));
    const g = gcd(a, b);
    const result = isGcd ? g : (a / g) * b;
    return {
      isMath: true,
      expression: `${isGcd ? 'GCD' : 'LCM'}(${a}, ${b})`,
      result: `${result}`,
      steps: isGcd
        ? [`Euclidean algorithm: repeatedly replace the larger number with the remainder until one reaches 0.`, `GCD(${a}, ${b}) = ${g}`]
        : [`LCM(a, b) = (a × b) / GCD(a, b)`, `GCD(${a}, ${b}) = ${g}`, `LCM = (${a} × ${b}) / ${g} = ${result}`],
      explanation: `The ${isGcd ? 'greatest common divisor' : 'least common multiple'} of **${a}** and **${b}** is **${result}**.`,
    };
  }

  // 3d. Even/odd check: e.g. "is 42 even", "is 7 odd". The optional "a(n)"/"an" and "number" allow
  // the equally natural "is 42 an even number" — the original pattern required the adjective
  // immediately after the digit and had no coverage for that phrasing at all.
  const evenOddMatch = lower.match(/\bis\s+(?:the\s+number\s+|whether\s+)?(-?\d+)\s+(?:an?\s+)?(even|odd)(?:\s+number)?\b/i);
  if (evenOddMatch) {
    const n = parseInt(evenOddMatch[1], 10);
    const isEven = n % 2 === 0;
    return {
      isMath: true,
      expression: `is ${n} ${evenOddMatch[2]}?`,
      result: `${n} is ${isEven ? 'even' : 'odd'}`,
      steps: [`${n} ÷ 2 = ${n / 2}${isEven ? ', a whole number, so it divides evenly' : ', not a whole number, so it does not divide evenly'}.`],
      explanation: `**${n} is ${isEven ? 'even' : 'odd'}.**`,
    };
  }

  // 4. Factorial: e.g. "factorial of 6", "6 factorial" (the more natural phrasing), or "6!"
  const factMatch = lower.match(/(?:factorial of\s*(\d+)|(\d+)\s*factorial|(\d+)\s*!)/i);
  if (factMatch) {
    const n = parseInt(factMatch[1] || factMatch[2] || factMatch[3], 10);
    if (n >= 0 && n <= 170) {
      let res = 1;
      const terms: number[] = [];
      for (let i = n; i >= 1; i--) {
        res *= i;
        if (terms.length < 8) terms.push(i);
      }
      const termStr = terms.length === n ? terms.join(' × ') : `${terms.slice(0, 5).join(' × ')} × ... × 1`;
      return {
        isMath: true,
        expression: `${n}!`,
        result: `${res}`,
        steps: [
          `Definition of factorial: n! = n × (n - 1) × (n - 2) × ... × 1`,
          `Compute expansion: ${n}! = ${termStr || '1'} = ${res.toLocaleString()}`,
        ],
        explanation: `The factorial of **${n}** ($${n}!$) is **${res.toLocaleString()}**.`,
      };
    }
  }

  return null;
}
