// A 4B model doesn't reliably carry details across a chat ("we're playing Fortnite" -> two messages later
// "what game?"). The engine reads the person's last few messages itself and hands the model a short
// "known from this chat" note, which is far more reliable than hoping it re-reads the transcript.
// Only the asker's own recent messages are read (the 3-exchange window), nothing from other people.

const GAMES = [
  'fortnite', 'roblox', 'valorant', 'minecraft', 'warzone', 'call of duty', 'cod', 'gta', 'gta 5', 'fifa', 'fc 26', 'fc26', 'ea fc', 'rocket league',
  'apex', 'apex legends', 'league of legends', 'overwatch', 'among us', 'clash royale', 'clash of clans', 'brawl stars', 'cs2', 'csgo', 'counter strike',
  'rainbow six', 'siege', 'pubg', 'dota', 'fall guys', 'mario kart', 'smash', 'chess', 'blox fruits', 'pokemon', 'genshin', 'elden ring', 'the finals', 'marvel rivals',
];
const FOODS = ["mcdonald's", 'mcdonalds', 'burger king', 'kfc', "wendy's", 'wendys', 'taco bell', 'pizza', 'poutine', 'subway', 'chicken nuggets', 'pasta', 'sushi'];

function mentioned(text: string, list: string[]): string | null {
  const t = text.toLowerCase().replace(/[’]/g, "'");
  for (const item of list) {
    if (new RegExp(`(?<![a-z])${item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z])`).test(t)) return item;
  }
  return null;
}

const TITLE: Record<string, string> = { cod: 'Call of Duty', gta: 'GTA', csgo: 'CS:GO', cs2: 'CS2', pubg: 'PUBG', kfc: 'KFC', fifa: 'FIFA' };
const titleCase = (s: string): string => TITLE[s] || s.replace(/\b\w/g, (c) => c.toUpperCase());

// Returns "" when nothing useful is known.
export function threadFactsNote(userMessages: string[]): string {
  const facts: string[] = [];
  // Newest mention wins, so scan from the end.
  const reversed = [...userMessages].reverse();
  for (const m of reversed) {
    const game = mentioned(m, GAMES);
    if (game && !facts.some((f) => f.startsWith('The game'))) facts.push(`The game they're talking about / playing with you is ${titleCase(game)} — they already told you, never ask which game.`);
    const food = mentioned(m, FOODS);
    if (food && !facts.some((f) => f.startsWith('They mentioned eating'))) facts.push(`They mentioned eating ${titleCase(food)}.`);
    if (/\b(?:we(?:'re| are| r)?|us|me and you|you and me|join(?:ing)? (?:me|us|the game))\b/i.test(m) && /\b(?:playing|play|queue|queuing|ranked|game|match)\b/i.test(m) && !facts.some((f) => f.startsWith('They are playing'))) {
      facts.push('They are playing a game together with you right now (you are in it with them).');
    }
    if (/\b(?:just us|only us|no squad|solo)\b/i.test(m) && !facts.some((f) => f.startsWith('It is just'))) facts.push('It is just the two of you, no squad — never ask about a squad again.');
  }
  return facts.length ? `Known from this chat (use it, never ask for it again): ${facts.join(' ')}` : '';
}
