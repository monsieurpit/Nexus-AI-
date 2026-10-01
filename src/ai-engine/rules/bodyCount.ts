// "if I goon to 5 different girls and then the same girl again, how many body counts do I have?"
// A 4B model reads "5 different girls" as one girl, or counts the repeat. Body count = the number of
// DIFFERENT people, so the number is worked out here and handed to the model as the fact to state.

const WORDS: Record<string, number> = { one: 1, a: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
const PEOPLE = '(?:girls?|guys?|boys?|women|woman|men|man|people|persons?|bitch(?:es)?|chicks?|dudes?|hoes?|females?|males?)';

export function isBodyCountQuestion(text: string): boolean {
  return /\bbody\s*counts?\b/i.test(text);
}

// Total of the different people mentioned; "the same girl", "again", "same one" never add. Null when no
// quantity of people can be found (then the model answers on its own).
export function countDistinctPartners(text: string): number | null {
  const t = text.toLowerCase().replace(/the same (?:girl|guy|one|person|woman|man|chick|dude)/g, ' ');
  let total = 0;
  let found = false;
  const re = new RegExp(`\\b(\\d{1,3}|${Object.keys(WORDS).join('|')})\\s+(?:(?:different|other|new|more|extra|separate|random)\\s+)?${PEOPLE}\\b`, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const raw = m[1];
    const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : WORDS[raw];
    // "a girl" only counts when it's a real quantity statement, not "do a girl" noise: accept it too, it is 1.
    if (n && n < 1000) {
      total += n;
      found = true;
    }
  }
  return found ? total : null;
}
