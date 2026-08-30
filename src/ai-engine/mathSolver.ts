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
      if (val === null || this.pos !== this.expr.length) {
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
    ];
    for (const w of strip) {
      t = t.replaceAll(w, ' ');
    }

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

  return null;
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

function trySolveRateTimeDistance(prompt: string): MathSolution | null {
  const lower = prompt.toLowerCase();

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

export function trySolveMath(prompt: string): MathSolution | null {
  const cleanPrompt = prompt.trim();
  const lower = cleanPrompt.toLowerCase();

  // 1. Unit conversions
  const unitRes = tryUnitConversion(cleanPrompt);
  if (unitRes) return unitRes;

  // 1b. Single-variable linear equations (before the arithmetic parser, which has no concept
  // of a variable to solve for and would otherwise reject these entirely)
  const linearRes = trySolveLinearEquation(cleanPrompt);
  if (linearRes) return linearRes;

  // 1c. Distance/rate/time word problems (before the arithmetic parser, which can't make sense
  // of "60mph for 2.5 hours" as an expression at all)
  const rateRes = trySolveRateTimeDistance(cleanPrompt);
  if (rateRes) return rateRes;

  // 1d. Simple two-quantity word problems ("have 3 apples, eat 2, how many left") — same reason
  // as 1c, no arithmetic symbol for the parser below to find. Tried before the general parser so
  // a word problem never gets misread as some other kind of expression first.
  const wordProblemRes = trySolveWordProblemArithmetic(cleanPrompt);
  if (wordProblemRes) return wordProblemRes;

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

  // 3b. Prime number check: e.g. "is 17 a prime number", "is 91 prime", "is 8 not prime"
  //
  // Added after a live-observed hallucination: the local LLM confidently told a user "17 is NOT
  // a prime number" (flatly wrong — 17 is prime) when this query fell through every branch above
  // (it's not an arithmetic EXPRESSION, so the recursive-descent parser never saw it) and reached
  // the unreliable LLM path unguarded. Small local models are fundamentally unreliable at exact
  // number-theory facts like this, so — same principle as the rest of this file — compute it
  // deterministically instead of trusting generation for anything with one objectively correct
  // answer.
  const primeMatch = lower.match(/\bis\s+(-?\d+)\s+(?:a\s+)?(not\s+)?prime\b/i);
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

  // 3c. GCD / LCM of two numbers: e.g. "gcd of 24 and 36", "lcm of 4 and 6"
  const gcdLcmMatch = lower.match(/\b(gcd|greatest common (?:divisor|factor)|lcm|least common multiple)\s+(?:of\s+)?(-?\d+)\s*(?:and|,)\s*(-?\d+)\b/i);
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

  // 3d. Even/odd check: e.g. "is 42 even", "is 7 odd"
  const evenOddMatch = lower.match(/\bis\s+(-?\d+)\s+(even|odd)\b/i);
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
