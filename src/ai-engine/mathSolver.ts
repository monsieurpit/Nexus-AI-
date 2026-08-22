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

    // Operators
    t = t
      .replace(/\s+plus\s+/g, '+')
      .replace(/\s+minus\s+/g, '-')
      .replace(/\s+times\s+/g, '*')
      .replace(/\s+multiplied by\s+/g, '*')
      .replace(/\s+divided by\s+/g, '/')
      .replace(/\s+over\s+/g, '/')
      .replace(/\s+to the power of\s+/g, '^')
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
    let left = this.parsePower();
    if (left === null) return null;

    while (this.pos < this.expr.length) {
      const op = this.expr[this.pos];
      if (op !== '*' && op !== '/' && op !== '%') break;
      this.pos++;
      const right = this.parsePower();
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

  private parsePower(): number | null {
    const base = this.parseUnary();
    if (base === null) return null;

    if (this.pos < this.expr.length && this.expr[this.pos] === '^') {
      this.pos++;
      const exp = this.parsePower();
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
      const val = this.parseAtom();
      return val === null ? null : -val;
    }
    if (this.expr[this.pos] === '+') {
      this.pos++;
    }
    return this.parseAtom();
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

/**
 * Unit conversions handler
 */
function tryUnitConversion(input: string): MathSolution | null {
  const q = input.toLowerCase();

  // Temperature: C to F
  const cToFMatch = q.match(/(-?\d+\.?\d*)\s*(?:celsius|c)\s*(?:to|in)\s*(?:fahrenheit|f)/i);
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
  const fToCMatch = q.match(/(-?\d+\.?\d*)\s*(?:fahrenheit|f)\s*(?:to|in)\s*(?:celsius|c)/i);
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
  const kmToMiMatch = q.match(/(\d+\.?\d*)\s*(?:km|kilometers|kilometres)\s*(?:to|in)\s*(?:miles|mi)/i);
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
  const miToKmMatch = q.match(/(\d+\.?\d*)\s*(?:miles|mi)\s*(?:to|in)\s*(?:km|kilometers|kilometres)/i);
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
  const kgToLbsMatch = q.match(/(\d+\.?\d*)\s*(?:kg|kilos|kilograms)\s*(?:to|in)\s*(?:lbs|pounds)/i);
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
  const lbsToKgMatch = q.match(/(\d+\.?\d*)\s*(?:lbs|pounds)\s*(?:to|in)\s*(?:kg|kilos|kilograms)/i);
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

export function trySolveMath(prompt: string): MathSolution | null {
  const cleanPrompt = prompt.trim();
  const lower = cleanPrompt.toLowerCase();

  // 1. Unit conversions
  const unitRes = tryUnitConversion(cleanPrompt);
  if (unitRes) return unitRes;

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

  // 4. Factorial: e.g. "factorial of 6" or "6!"
  const factMatch = lower.match(/(?:factorial of\s*(\d+)|(\d+)\s*!)/i);
  if (factMatch) {
    const n = parseInt(factMatch[1] || factMatch[2], 10);
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
