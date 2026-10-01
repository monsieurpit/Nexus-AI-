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

const SOCIALS = ['tiktok', 'instagram', 'insta', 'snapchat', 'youtube', 'yt', 'twitter', 'x.com', 'reddit', 'twitch', 'whatsapp', 'telegram', 'facebook', 'pinterest', 'bereal', 'threads', 'reels', 'discord'];
const AI_PLATFORMS = ['chatgpt', 'gpt-4', 'gpt 5', 'gpt-5', 'openai', 'claude', 'gemini', 'grok', 'copilot', 'deepseek', 'perplexity', 'character.ai', 'midjourney', 'llama', 'mistral', 'ollama', 'sora', 'cursor', 'meta ai', 'siri', 'alexa'];
const DEVICES = ['ps5', 'ps4', 'playstation', 'xbox', 'switch', 'pc', 'mobile', 'phone', 'console', 'steam deck', 'iphone', 'android', 'ipad', 'macbook', 'laptop'];
const DRINKS = ['coffee', 'energy drink', 'monster', 'red bull', 'redbull', 'celsius', 'coke', 'pepsi', 'tea', 'milkshake', 'smoothie', 'beer'];
const PLACES = ['school', 'work', 'the gym', 'gym', 'bed', 'the kitchen', 'class', 'the bus', 'the car', 'the mall', 'the park', 'my room', 'the couch', 'outside', 'the bathroom'];
const RELATIONSHIPS: Array<[RegExp, string]> = [
  [/\b(?:my\s+)?(?:girlfriend|gf|girl)\b/i, 'a girlfriend / girl'], [/\b(?:my\s+)?(?:boyfriend|bf)\b/i, 'a boyfriend'],
  [/\b(?:my\s+)?crush\b/i, 'a crush'], [/\b(?:my\s+)?ex\b/i, 'an ex'], [/\b(?:my\s+)?(?:wife|husband)\b/i, 'a wife/husband'],
  [/\bsituationship\b/i, 'a situationship'], [/\b(?:i'?m|im|i am)\s+single\b/i, 'being single'], [/\b(?:dating|talking to|hooking up with|seeing)\s+(?:a\s+)?(?:girl|guy|someone|her|him)\b/i, 'someone they are dating / talking to'],
  [/\bbreak(?:ing)?\s*up\b|\bbroke up\b/i, 'a breakup'], [/\bbest\s*friend|\bbestie\b|\bbff\b/i, 'a best friend'],
];

const TITLE: Record<string, string> = { cod: 'Call of Duty', gta: 'GTA', csgo: 'CS:GO', cs2: 'CS2', pubg: 'PUBG', kfc: 'KFC', fifa: 'FIFA' };
const TITLE2: Record<string, string> = { yt: 'YouTube', insta: 'Instagram', snap: 'Snapchat', chatgpt: 'ChatGPT', 'gpt-4': 'GPT-4', 'gpt-5': 'GPT-5', 'gpt 5': 'GPT-5', openai: 'OpenAI', deepseek: 'DeepSeek', ps5: 'PS5', ps4: 'PS4', pc: 'PC', 'x.com': 'X (Twitter)', whatsapp: 'WhatsApp', tiktok: 'TikTok', 'character.ai': 'Character.AI', gf: 'girlfriend', bf: 'boyfriend' };
const titleCase = (s: string): string => TITLE2[s] || TITLE[s] || s.replace(/\b\w/g, (c) => c.toUpperCase());

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
    const social = mentioned(m, SOCIALS);
    if (social && !facts.some((f) => f.startsWith('They are on'))) facts.push(`They are on / talking about ${titleCase(social)} (their social media) — they already said it.`);
    const ai = mentioned(m, AI_PLATFORMS);
    if (ai && !facts.some((f) => f.startsWith('They brought up the AI'))) facts.push(`They brought up the AI platform ${titleCase(ai)} — you know what it is.`);
    const device = mentioned(m, DEVICES);
    if (device && /\b(?:on|using|play(?:ing)? on|from)\b/i.test(m) && !facts.some((f) => f.startsWith('They are using'))) facts.push(`They are using their ${titleCase(device)}.`);
    const drink = mentioned(m, DRINKS);
    if (drink && !facts.some((f) => f.startsWith('They mentioned drinking'))) facts.push(`They mentioned drinking ${drink}.`);
    const place = PLACES.find((pl) => new RegExp(`\\b(?:at|in|going to|heading to|from)\\s+${pl.replace(/^the /, '(?:the )?')}(?![a-z])`, 'i').test(m));
    if (place && !facts.some((f) => f.startsWith('They said they are at'))) facts.push(`They said they are at / in ${place}.`);
    for (const [re, label] of RELATIONSHIPS) {
      if (re.test(m) && !facts.some((f) => f.includes(label))) facts.push(`They mentioned ${label} — remember it, don't ask who/what again.`);
    }
    if (/\b(?:just us|only us|no squad|solo)\b/i.test(m) && !facts.some((f) => f.startsWith('It is just'))) facts.push('It is just the two of you, no squad — never ask about a squad again.');
  }
  return facts.length ? `Known from this chat (use it, never ask for it again): ${facts.join(' ')}` : '';
}
