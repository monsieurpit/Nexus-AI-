import { KnowledgeItem } from '../../types';

/**
 * PERSONAL_FINANCE_BASICS_GAPS — batch 269 corrections. Personal finance
 * turned out to be a solid domain for nexus-4b (only ~7 misses out of 25,
 * a big contrast with the string of sports batches right before this one —
 * no wrong-domain hallucinations at all here, just incomplete answers and a
 * couple of real numeric/factual errors). Handled well: debit/credit card,
 * checking/savings, gross/net income, want/need, credit score/report,
 * loan/line of credit, renting/owning, stock/bond, asset/liability,
 * inflation/recession, tax deduction/credit, emergency fund/savings goal,
 * debit transaction/overdraft, investing/saving, pre-approved/pre-qualified,
 * co-signer/guarantor, net worth/income. Misses:
 * - "simple vs compound interest" used a wrong worked example: claimed $1,000
 *   at 10% simple interest for 10 years yields "$150" — the correct simple-
 *   interest math (I = P × r × t) is $1,000 × 0.10 × 10 = $1,000, not $150.
 * - "budget vs financial goal" explained budget well then got cut off before
 *   ever defining what a financial goal is.
 * - "fixed vs variable interest rate" only explained fixed rate, never
 *   contrasted with variable at all.
 * - "401k vs Roth IRA" swapped the contribution limits — it said the 401(k)
 *   has "way lower" limits ($7,000 in 2024), but that figure is actually the
 *   IRA/Roth IRA limit; 401(k) limits are far higher (~$23,000 in 2024).
 * - "minimum payment vs paying in full" answered a narrower, secondary point
 *   about credit-utilization reporting timing and never mentioned the actual
 *   core financial consequence: paying only the minimum leaves a balance
 *   that accrues significant interest, while paying in full avoids interest
 *   entirely via the grace period.
 * - "mutual fund vs index fund" treated them as two separate, parallel
 *   categories, when an index fund is actually a TYPE of fund (structured as
 *   a mutual fund or ETF) — the real distinction is passive vs. active
 *   management, not "mutual fund" vs "index fund" as rival categories.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'personal finance', keywords, content, createdAt: now,
});

export const PERSONAL_FINANCE_BASICS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-pf-simple-vs-compound-interest-math',
    'Simple vs compound interest — the actual worked math',
    [
      'difference between simple interest and compound interest with correct math example', 'simple interest formula is I equals P times r times t principal times rate times time',
      'one thousand dollars at ten percent simple interest for ten years equals one thousand dollars total interest not one hundred fifty dollars one thousand times zero point one zero times ten equals one thousand',
      'compound interest adds interest back to the principal each period so you earn interest on your interest which grows faster than simple interest over the same time and rate',
    ],
    `SIMPLE INTEREST is calculated only on the original principal, using the formula: Interest = Principal × Rate × Time. Worked example: $1,000 at 10% simple interest for 10 years = $1,000 × 0.10 × 10 = $1,000 in total interest (so you'd end up with $2,000 total — the original $1,000 plus $1,000 in interest). It grows in a straight, linear line every year.

COMPOUND INTEREST adds each period's interest BACK onto the principal, so future interest is calculated on a growing balance — you earn interest on your interest. Over the same 10 years at the same 10% rate, compound interest would grow significantly faster than the $1,000 simple-interest total, since each year's interest itself starts earning more interest going forward — the growth curve accelerates over time instead of staying flat.

The key point: for the same rate and time period, compound interest always produces more total interest than simple interest, and the gap between them grows larger the longer the money sits (which is why starting to save/invest early matters so much for compound growth).`,
  ),
  k(
    'kb-gap-pf-financial-goal',
    'Budget vs financial goal',
    [
      'difference between a budget and a financial goal', 'a budget is the day to day or month to month PLAN for how your income gets divided and spent across categories like rent food and savings',
      'a financial goal is a specific target outcome you are trying to reach with your money like saving five thousand dollars for a car buying a house paying off a credit card or building a six month emergency fund',
      'a budget is the ongoing process a financial goal is the destination the budget helps you get closer to it',
    ],
    `A BUDGET is the ongoing, day-to-day (or month-to-month) PLAN for how your income gets divided and spent across categories — rent, food, transportation, savings, and so on. It's a repeating process you manage continuously.

A FINANCIAL GOAL is a specific, defined TARGET OUTCOME you're trying to reach with your money — saving $5,000 for a car, paying off a specific credit card balance, building a 6-month emergency fund, or saving a down payment for a house. It's a destination, not an ongoing process.

The relationship: a budget is the tool/process you use to actually get closer to a financial goal — you build your budget around prioritizing the savings or payments needed to hit that specific target, so the two work together rather than being separate concepts.`,
  ),
  k(
    'kb-gap-pf-fixed-vs-variable-rate',
    'Fixed vs variable interest rate',
    [
      'difference between a fixed interest rate and a variable interest rate', 'a fixed interest rate stays exactly the same for the entire life of the loan or account your payment amount never changes because of rate movements',
      'a variable interest rate can go up or down over time because it is tied to a benchmark market rate meaning your payment amount can increase or decrease as that benchmark moves',
      'fixed rates offer predictability variable rates can start lower but carry the risk of rising later',
    ],
    `A FIXED interest rate stays exactly the SAME for the entire life of the loan or account — your payment amount never changes because of rate movements, giving you complete predictability over the full term.

A VARIABLE (or "adjustable") interest rate can go UP or DOWN over time, because it's tied to a benchmark market rate (like the prime rate) — as that benchmark moves, your rate (and often your payment amount) moves with it.

The trade-off: fixed rates offer certainty and protection from rising rates, but often start a bit higher; variable rates often start LOWER, which can save money short-term, but carry real risk if market rates climb later, potentially making the loan more expensive than a fixed rate would have been over time.`,
  ),
  k(
    'kb-gap-pf-401k-vs-roth-ira-limits',
    '401(k) vs Roth IRA (correct contribution limits)',
    [
      'difference between a 401k and a roth ira correct contribution limits', 'a 401k is an employer sponsored retirement account and has a MUCH HIGHER annual contribution limit around twenty three thousand dollars in 2024 for employee contributions',
      'a roth ira is opened independently by an individual at any brokerage not through an employer and has a MUCH LOWER annual contribution limit around seven thousand dollars in 2024',
      'do not swap these figures the 401k limit is the much larger one and the ira roth ira limit is the much smaller one',
    ],
    `A 401(k) is an employer-sponsored retirement account — set up through your job — and it has a MUCH HIGHER annual contribution limit: around $23,000 for 2024 in employee contributions (with an additional catch-up amount for people 50+).

A ROTH IRA is opened independently by an individual at any brokerage of their choosing, completely separate from any employer, and it has a MUCH LOWER annual contribution limit: around $7,000 for 2024 (also with a catch-up amount for those 50+), and it comes with income limits that can restrict or eliminate eligibility to contribute directly at higher income levels.

Important correction to keep straight: the 401(k) is the account with the LARGER contribution limit, and the Roth IRA is the one with the SMALLER limit — it's easy to accidentally swap these two numbers since they're both retirement accounts, but they're not remotely close to each other in size.`,
  ),
  k(
    'kb-gap-pf-minimum-payment-vs-paying-in-full',
    'Minimum payment vs paying in full on a credit card (interest is the core issue)',
    [
      'difference between paying the minimum payment and paying in full on a credit card', 'paying only the minimum payment leaves the rest of your balance carrying over to the next month and that remaining balance starts accruing interest often a high double digit annual percentage rate',
      'paying your statement balance in full by the due date means you owe zero interest at all thanks to the grace period most credit cards offer no interest charges on purchases if paid in full every cycle',
      'the core financial consequence of only paying the minimum is that you end up paying significantly more over time in interest charges even though minimum payments keep the account in good standing and avoid a late fee',
    ],
    `Paying only the MINIMUM PAYMENT leaves the rest of your balance carrying over to the next billing cycle — and that remaining balance starts accruing INTEREST, often at a high double-digit annual percentage rate. Over time, paying only minimums means you end up paying significantly more in total interest, and it can take years to pay off even a modest balance.

Paying your STATEMENT BALANCE IN FULL by the due date means you owe ZERO interest on those purchases at all — most credit cards offer a "grace period" where no interest is charged on purchases as long as you pay the full balance every cycle.

The core financial consequence to understand: minimum payments keep your account in good standing and avoid a late fee, but they do NOT save you from interest charges — only paying in full does that. A credit score can technically still be affected by how much of your available credit is being used at the moment your statement is generated (your "credit utilization"), regardless of whether you go on to pay it off in full — but the much bigger practical difference between these two payment habits is how much interest you actually end up paying.`,
  ),
  k(
    'kb-gap-pf-mutual-fund-vs-index-fund',
    'Mutual fund vs index fund (index funds are a TYPE of fund, not a rival category)',
    [
      'difference between a mutual fund and an index fund', 'an index fund is not a separate category from a mutual fund an index fund is actually a TYPE of fund that can itself be structured as a mutual fund or as an ETF',
      'the real distinction is actively managed versus passively managed a traditional actively managed mutual fund has a manager picking investments trying to beat the market',
      'an index fund is passively managed it simply holds the same investments as a specific market index like the S&P 500 in the same proportions trying to match the markets performance rather than beat it',
      'index funds typically have much lower fees than actively managed mutual funds because there is no manager making active trading decisions',
    ],
    `An index fund is NOT a separate, rival category from a mutual fund — an index fund is actually a TYPE of fund that can itself be structured AS a mutual fund (or as an ETF). The real distinction that matters is ACTIVELY managed vs. PASSIVELY managed.

A traditional, ACTIVELY MANAGED mutual fund has a professional fund manager actively picking and choosing investments, trying to beat the market's performance — and typically charges higher fees to pay for that active management and research.

An INDEX FUND is PASSIVELY managed: instead of a manager picking stocks, it simply holds the same investments as a specific market index (like the S&P 500) in the same proportions, aiming to MATCH that index's performance rather than beat it. Because there's no manager making active trading decisions, index funds typically have much lower fees than actively managed mutual funds.

So the accurate comparison isn't "mutual fund vs. index fund" as two separate things — it's "actively managed fund vs. passively managed index fund," and an index fund can be packaged as either a mutual fund or an ETF.`,
  ),
];
