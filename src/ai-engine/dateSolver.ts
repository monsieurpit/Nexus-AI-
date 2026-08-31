/**
 * Deterministic Date/Time Solver — the calendar-arithmetic counterpart to mathSolver.ts.
 *
 * Discovered live: the LLM has zero real awareness of the actual current date (nothing in the
 * request pipeline ever tells it), and small local models hallucinate wildly the moment a
 * question depends on it — observed asking "what year was 30 years ago" produce a nonsensical
 * made-up "today" ("let's say today is February 12th") and then botch the arithmetic on top of
 * that fabricated premise. This mirrors exactly why mathSolver.ts exists for arithmetic: anything
 * with one objectively correct, mechanically computable answer should be computed, not generated.
 * JS's native Date object already correctly handles month lengths, leap years, and year rollovers,
 * so real date arithmetic is just as reliable as real number arithmetic once it's actually used.
 */

export interface DateSolution {
  isDate: boolean;
  result: string;
  steps: string[];
  explanation: string;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_ALIASES: Record<string, number> = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3, may: 4,
  jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7, sep: 8, sept: 8, september: 8,
  oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
};

function formatDate(d: Date): string {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function dayOfWeek(d: Date): string {
  return DAY_NAMES[d.getDay()];
}

// The 4th Thursday of November (US Thanksgiving) — computed, not hardcoded to a specific year,
// so it stays correct indefinitely.
function usThanksgiving(year: number): Date {
  const nov1 = new Date(year, 10, 1);
  const firstThursdayOffset = (4 - nov1.getDay() + 7) % 7;
  const firstThursday = 1 + firstThursdayOffset;
  return new Date(year, 10, firstThursday + 21);
}

// Anonymous Gregorian algorithm (Meeus/Jones/Butcher) for Easter Sunday — a classic deterministic
// date calculation with no simple closed form, included because "when is Easter" is exactly the
// kind of date question a small model has no reliable way to compute on its own.
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Named holidays with a fixed calendar date every year — deliberately excludes anything requiring
// a specific country/culture assumption beyond the most globally-recognized Western/US calendar
// dates, since those are the only ones safe to resolve without knowing the asker's context.
function tryNamedHoliday(term: string, year: number): Date | null {
  const t = term.toLowerCase().trim();
  if (/^christmas(\s+day)?$/i.test(t)) return new Date(year, 11, 25);
  if (/^(new\s*year'?s?\s*(day)?|new\s*years)$/i.test(t)) return new Date(year, 0, 1);
  if (/^new\s*year'?s?\s*eve$/i.test(t)) return new Date(year, 11, 31);
  if (/^halloween$/i.test(t)) return new Date(year, 9, 31);
  if (/^valentine'?s?\s*(day)?$/i.test(t)) return new Date(year, 1, 14);
  if (/^(independence\s*day|4th\s*of\s*july|july\s*4th?)$/i.test(t)) return new Date(year, 6, 4);
  if (/^(st\.?\s*patrick'?s?\s*(day)?)$/i.test(t)) return new Date(year, 2, 17);
  if (/^(new\s*year'?s?\s*resolution)$/i.test(t)) return new Date(year, 0, 1);
  if (/^thanksgiving$/i.test(t)) return usThanksgiving(year);
  if (/^easter(\s*sunday)?$/i.test(t)) return easterSunday(year);
  if (/^(april\s*fool'?s?\s*(day)?)$/i.test(t)) return new Date(year, 3, 1);
  return null;
}

// Explicit calendar date: "July 4 1990", "July 4th, 1990", "4 July 1990", "12/25/2026" (US-style
// month/day/year, the format this bot's userbase overwhelmingly uses).
function tryExplicitDate(text: string, defaultYear: number): Date | null {
  const monthDayYear = text.match(
    /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})?\b/i
  );
  if (monthDayYear) {
    const month = MONTH_ALIASES[monthDayYear[1].toLowerCase()];
    const day = parseInt(monthDayYear[2], 10);
    const year = monthDayYear[3] ? parseInt(monthDayYear[3], 10) : defaultYear;
    if (month !== undefined && day >= 1 && day <= 31) return new Date(year, month, day);
  }
  const dayMonthYear = text.match(
    /\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?,?\s*(\d{4})?\b/i
  );
  if (dayMonthYear) {
    const day = parseInt(dayMonthYear[1], 10);
    const month = MONTH_ALIASES[dayMonthYear[2].toLowerCase()];
    const year = dayMonthYear[3] ? parseInt(dayMonthYear[3], 10) : defaultYear;
    if (month !== undefined && day >= 1 && day <= 31) return new Date(year, month, day);
  }
  const slashDate = text.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  if (slashDate) {
    const month = parseInt(slashDate[1], 10) - 1;
    const day = parseInt(slashDate[2], 10);
    const year = parseInt(slashDate[3], 10);
    if (month >= 0 && month <= 11 && day >= 1 && day <= 31) return new Date(year, month, day);
  }
  return null;
}

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / msPerDay);
}

/**
 * Resolves a target date from a "this/next year" holiday reference, always picking the next
 * upcoming occurrence when the plain (year-less) form is used with "next"/no year specified and
 * the date has already passed this year — matches how a person actually means "when is
 * Thanksgiving" (the next one, not the one that already happened in January when asked in March).
 */
function resolveHolidayTarget(term: string, today: Date, preferUpcoming: boolean): Date | null {
  const thisYear = tryNamedHoliday(term, today.getFullYear());
  if (!thisYear) return null;
  if (preferUpcoming && thisYear < today) {
    return tryNamedHoliday(term, today.getFullYear() + 1);
  }
  return thisYear;
}

export function trySolveDate(prompt: string, now: Date = new Date()): DateSolution | null {
  const q = prompt.trim();
  const lower = q.toLowerCase();

  // 0. Hypothetical day-of-week arithmetic: "if today is monday, what day is it in 10 days" — a
  // pure modular-arithmetic question about the WEEKDAY CYCLE, deliberately independent of the
  // server's real current date (the question stipulates a hypothetical "today" itself, so the
  // real date is irrelevant — this is really just "(stated day + N) mod 7"). Found live: this
  // exact phrasing reached the LLM and got answered with a completely unrelated stock greeting-
  // mode reply that never even acknowledged the question, let alone attempted the arithmetic —
  // it seems to have been misread as conversational filler rather than a real question at all.
  const hypotheticalDayMatch = lower.match(
    /\bif\s+today\s+(?:is|was)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b.{0,40}?\bwhat\s+day\s+(?:is\s+it|will\s+it\s+be)\b.{0,20}?(\d+)\s*days?\s*(before|earlier|ago)?/i
  );
  if (hypotheticalDayMatch) {
    const startDay = DAY_NAMES.findIndex((d) => d.toLowerCase() === hypotheticalDayMatch[1].toLowerCase());
    const amount = parseInt(hypotheticalDayMatch[2], 10);
    const isBefore = !!hypotheticalDayMatch[3];
    const offset = isBefore ? -amount : amount;
    // JS's % can return negative for a negative dividend, so normalize into [0, 7) explicitly
    // rather than trusting a bare modulo — a smaller, easy-to-miss bug in its own right.
    const resultDay = DAY_NAMES[(((startDay + offset) % 7) + 7) % 7];
    return {
      isDate: true,
      result: resultDay,
      steps: [`Starting day: ${DAY_NAMES[startDay]} (index ${startDay})`, `${DAY_NAMES[startDay]} ${isBefore ? '-' : '+'} ${amount} days, wrapping every 7 = ${resultDay}`],
      explanation: `**${resultDay}**. Counting ${amount} days ${isBefore ? 'before' : 'after'} ${DAY_NAMES[startDay]}, wrapping around every 7 days, lands on ${resultDay}.`,
    };
  }

  // 1. "what's today's date" / "what day is it" / "what day of the week is it" (no target date)
  if (
    /\b(?:what'?s|what\s+is)\s+(?:today'?s?\s+date|the\s+date\s+today)\b/i.test(lower) ||
    /\b(?:what\s+day\s+is\s+(?:it|today)|what'?s\s+today|what\s+day\s+of\s+the\s+week\s+is\s+(?:it|today))\b/i.test(lower)
  ) {
    return {
      isDate: true,
      result: `${dayOfWeek(now)}, ${formatDate(now)}`,
      steps: [`Server system clock: ${now.toISOString()}`],
      explanation: `Today is **${dayOfWeek(now)}, ${formatDate(now)}**.`,
    };
  }

  // 2. "what day of the week is/was <date or holiday>"
  const dowMatch = lower.match(/\bwhat\s+day\s+of\s+the\s+week\s+(?:is|was|will|does)\b\s*(?:it\s+be\s+)?(?:on\s+)?(.+?)\??$/i);
  if (dowMatch) {
    const target = dowMatch[1].trim().replace(/^this\s+year'?s?\s*/i, '').replace(/\s+this\s+year$/i, '').replace(/\s+next\s+year$/i, '');
    const wantsNextYear = /next\s+year/i.test(dowMatch[1]);
    const holiday = resolveHolidayTarget(target, now, !wantsNextYear && !/\d{4}/.test(dowMatch[1]));
    const explicit = holiday || tryExplicitDate(dowMatch[1], wantsNextYear ? now.getFullYear() + 1 : now.getFullYear());
    if (explicit) {
      return {
        isDate: true,
        result: dayOfWeek(explicit),
        steps: [`Target date: ${formatDate(explicit)}`, `Day of week (via calendar calculation): ${dayOfWeek(explicit)}`],
        explanation: `**${formatDate(explicit)} is a ${dayOfWeek(explicit)}.**`,
      };
    }
  }

  // 3. "how many days until/since <date or holiday>"
  const untilMatch = lower.match(/\bhow\s+many\s+days?\s+(until|till|to|since|ago\s+(?:was|is))\s+(.+?)\??$/i);
  if (untilMatch) {
    const isUntil = /until|till|to$/i.test(untilMatch[1]);
    const target = untilMatch[2].trim();
    const holiday = resolveHolidayTarget(target, now, isUntil);
    const explicit = holiday || tryExplicitDate(target, now.getFullYear());
    if (explicit) {
      const diff = daysBetween(now, explicit);
      const absDiff = Math.abs(diff);
      const verb = diff === 0 ? 'is today' : diff > 0 ? `is in ${absDiff} day${absDiff === 1 ? '' : 's'}` : `was ${absDiff} day${absDiff === 1 ? '' : 's'} ago`;
      return {
        isDate: true,
        result: `${absDiff} day${absDiff === 1 ? '' : 's'}`,
        steps: [`Today: ${formatDate(now)}`, `Target: ${formatDate(explicit)}`, `Difference: ${diff} days`],
        explanation: `**${formatDate(explicit)}** (${dayOfWeek(explicit)}) ${verb}.`,
      };
    }
  }

  // 4. "what date/year is N days/weeks/months/years from now/ago"
  const offsetMatch = lower.match(
    /\bwhat\s+(?:date|day|year)\s+(?:is\s+it|was\s+it|will\s+it\s+be)?\s*(\d+)\s*(day|week|month|year)s?\s*(from\s+now|ago|from\s+today|before\s+today|earlier)\b/i
  );
  // Also covers the very common bare phrasing with no leading "what date is it": "N years ago"
  const bareOffsetMatch = lower.match(/\bwhat\s+(?:date|day|year)\s+was\s+(\d+)\s*(day|week|month|year)s?\s*ago\b/i);
  const m = offsetMatch || bareOffsetMatch;
  if (m) {
    const amount = parseInt(m[1], 10);
    const unit = m[2];
    const isAgo = offsetMatch ? /ago|before/i.test(offsetMatch[3]) : true;
    const target = new Date(now);
    const sign = isAgo ? -1 : 1;
    if (unit === 'day') target.setDate(target.getDate() + sign * amount);
    else if (unit === 'week') target.setDate(target.getDate() + sign * amount * 7);
    else if (unit === 'month') target.setMonth(target.getMonth() + sign * amount);
    else if (unit === 'year') target.setFullYear(target.getFullYear() + sign * amount);
    return {
      isDate: true,
      result: unit === 'year' && /\byear\b/i.test(lower.match(/what\s+(date|day|year)/i)?.[1] || '') ? `${target.getFullYear()}` : formatDate(target),
      steps: [`Today: ${formatDate(now)}`, `${amount} ${unit}${amount === 1 ? '' : 's'} ${isAgo ? 'before' : 'after'} today = ${formatDate(target)}`],
      explanation: `**${formatDate(target)}** (a ${dayOfWeek(target)}) — that's ${amount} ${unit}${amount === 1 ? '' : 's'} ${isAgo ? 'before' : 'from'} today (${formatDate(now)}).`,
    };
  }

  // 4b. "what year was N years ago" specifically (bare, without "what date")
  const yearAgoMatch = lower.match(/\bwhat\s+year\s+(?:was\s+it\s+)?(\d+)\s*years?\s*(ago|from\s+now)\b/i);
  if (yearAgoMatch) {
    const amount = parseInt(yearAgoMatch[1], 10);
    const isAgo = /ago/i.test(yearAgoMatch[2]);
    const year = now.getFullYear() + (isAgo ? -amount : amount);
    return {
      isDate: true,
      result: `${year}`,
      steps: [`This year: ${now.getFullYear()}`, `${amount} years ${isAgo ? 'before' : 'after'} that = ${year}`],
      explanation: `**${year}** — ${amount} years ${isAgo ? 'ago' : 'from now'}, counting from the actual current year (${now.getFullYear()}).`,
    };
  }

  // 5. "how old would someone born in YEAR be" / "how many years since YEAR"
  const sinceYearMatch = lower.match(/\bhow\s+many\s+years?\s+(?:since|ago\s+was)\s+(\d{4})\b/i);
  if (sinceYearMatch) {
    const year = parseInt(sinceYearMatch[1], 10);
    const diff = now.getFullYear() - year;
    return {
      isDate: true,
      result: `${diff} years`,
      steps: [`Current year: ${now.getFullYear()}`, `${now.getFullYear()} - ${year} = ${diff}`],
      explanation: `**${diff} years** have passed since ${year} (as of ${now.getFullYear()}).`,
    };
  }

  return null;
}
