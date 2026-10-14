// The slang dictionary (2026-10-13, a server member via Patrick: "add a full dictionary for all slangs, abbreviations,
// Aussie and etc — he's not really good with slang"). v2 never used the old slang engine (slangAndBrainrotEngine.ts, 226
// entries from the v1 days), so "ong", "glazing", "aura farming" or "bogan" went to a 4B model that half-knew them.
//
// One dictionary: the old engine's abbreviations + brainrot lexicon, the Aussie bank, and the rest below (Aussie, UK,
// gaming, Discord, newer Gen-Z / Alpha, emojis, Québécois, Spanish, Polish). Under 1 MB, in memory, no model call:
// when a message uses slang, the reply gets one line with what it means ("ong = on god, I swear").

import { ABBREVIATIONS_MAP, SLANG_LEXICON } from '../slangAndBrainrotEngine';

type Entry = [term: string, meaning: string];

// Words everyone (and the model) already knows don't need a hint.
const OBVIOUS = new Set('lol lmao idk omg btw brb tbh ngl rn pls plz thx ty np ok k u ur r ya yea yeah nah bro bruh dude gg wtf wth asap fyi irl dm dms bf gf mate fr gonna wanna'.split(' '));

const MORE: Entry[] = [
  // ── Gen-Z / Alpha / TikTok (2023-2026) ──
  ['ong', 'on god — I swear, for real'], ['onb', 'on bro — I swear'], ['on god', 'I swear, for real'], ['no cap', 'no lie, for real'], ['cap', 'a lie ("thats cap" = thats a lie)'], ['capping', 'lying'],
  ['bet', 'okay / deal / for sure'], ['say less', 'got it, no need to explain'], ['its giving', 'it looks like / it has the vibe of'], ['ate', 'did it perfectly'], ['ate and left no crumbs', 'did it perfectly'],
  ['slay', 'did great'], ['period', 'end of discussion, that\'s final'], ['periodt', 'end of discussion'], ['understood the assignment', 'did exactly what was needed, perfectly'],
  ['rizz', 'charm / flirting skill'], ['rizzler', 'someone with lots of rizz'], ['unspoken rizz', 'charm without saying anything'], ['w rizz', 'great flirting'], ['l rizz', 'bad flirting'], ['rizz up', 'flirt with'],
  ['gyatt', 'reaction to a big butt (crude)'], ['mid', 'mediocre, average, meh'], ['bussin', 'really good (food)'], ['fire', 'amazing'], ['goated', 'the greatest, elite'], ['the goat', 'greatest of all time'],
  ['aura', 'coolness points ("+1000 aura" = very cool, "-aura" = embarrassing)'], ['aura farming', 'acting cool on purpose to look cool'], ['aura points', 'coolness score'], ['negative aura', 'embarrassing / uncool'],
  ['glazing', 'over-praising someone, dickriding'], ['glazer', 'someone who over-praises'], ['dickriding', 'over-praising / sucking up to someone'], ['meatriding', 'over-praising someone'], ['d1 glazer', 'the biggest over-praiser'],
  ['delulu', 'delusional'], ['situationship', 'a relationship that is not official'], ['ick', 'sudden turn-off'], ['the ick', 'a sudden turn-off'], ['pick me', 'someone desperate for attention from the opposite sex'],
  ['main character', 'acting like the star of the movie'], ['npc', 'boring person with no personality, acts scripted'], ['side quest', 'random detour / pointless extra activity'], ['lore', 'someone\'s backstory / history'],
  ['brainrot', 'dumb internet meme content'], ['skibidi', 'brainrot meme word (Skibidi Toilet), means nothing / bad'], ['ohio', 'weird / cursed'], ['only in ohio', 'that\'s weird/cursed'], ['sigma', 'lone-wolf alpha guy (meme)'],
  ['mewing', 'jaw exercise meme, shushing gesture'], ['mogging', 'looking way better than someone'], ['mog', 'outshine someone in looks'], ['mogs', 'outshines in looks'], ['looksmaxxing', 'trying to look as good as possible'], ['maxxing', 'maximising something'],
  ['fanum tax', 'stealing someone\'s food (meme)'], ['caseoh', 'a streamer, fat jokes meme'], ['rizzing', 'flirting'], ['cooked', 'done for / ruined ("im cooked" = im screwed)'], ['im cooked', 'I\'m screwed / done for'], ['cooking', 'doing really well ("let him cook" = let him do his thing)'], ['let him cook', 'let him do his thing, he\'s onto something'],
  ['crash out', 'lose control angrily, rage'], ['crashout', 'an angry meltdown'], ['crashing out', 'losing it, raging'], ['crashed out', 'lost it, raged'], ['tweaking', 'acting crazy / overreacting'], ['buggin', 'acting crazy'], ['trippin', 'overreacting'],
  ['sus', 'suspicious'], ['salty', 'bitter, annoyed'], ['pressed', 'bothered, upset'], ['big mad', 'very angry'], ['heated', 'angry'], ['malding', 'mad + balding — raging'],
  ['based', 'bold opinion you respect, unapologetic'], ['cringe', 'embarrassing'], ['valid', 'acceptable, fair'], ['lowkey', 'kind of / secretly'], ['highkey', 'very / openly'], ['deadass', 'seriously, for real'],
  ['finna', 'going to'], ['tryna', 'trying to'], ['boutta', 'about to'], ['gonna', 'going to'], ['wanna', 'want to'], ['ion', 'I don\'t'], ['iykyk', 'if you know you know'], ['icl', 'I can\'t lie'], ['istg', 'I swear to god'], ['ngl', 'not gonna lie'],
  ['hits different', 'feels especially good / different'], ['vibe check', 'checking someone\'s mood'], ['vibing', 'relaxing, enjoying'], ['no thoughts head empty', 'not thinking about anything'], ['touch grass', 'go outside, get off the internet'],
  ['ratio', 'a reply getting more likes than the original (beat in an argument)'], ['L', 'a loss / fail'], ['W', 'a win / good thing'], ['take the L', 'accept defeat'], ['dub', 'a win'], ['huge W', 'a big win'], ['massive L', 'a big loss'],
  ['simp', 'someone who does too much for a crush'], ['simping', 'doing too much for a crush'], ['down bad', 'desperate (for affection)'], ['thirsty', 'desperate for attention / sex'], ['pookie', 'cute nickname for someone you love'], ['bae', 'babe, partner'], ['bestie', 'best friend (also sarcastic)'],
  ['gng', 'gang — friend group / "bro"'], ['gang', 'friends / "bro"'], ['twin', 'close friend / "bro"'], ['unc', 'old person / out of touch ("unc behaviour")'], ['ahh', '"ass" (e.g. "goofy ahh" = goofy-ass)'], ['goofy ahh', 'goofy-ass, ridiculous'],
  ['stfu', 'shut the fuck up'], ['gtfo', 'get the fuck out'], ['kys', 'kill yourself (abusive)'], ['idc', 'I don\'t care'], ['ik', 'I know'], ['ikr', 'I know right'], ['iirc', 'if I remember correctly'], ['imo', 'in my opinion'], ['imho', 'in my humble opinion'],
  ['smh', 'shaking my head (disappointed)'], ['fml', 'fuck my life'], ['tf', 'the fuck'], ['wtv', 'whatever'], ['wbu', 'what about you'], ['hbu', 'how about you'], ['hru', 'how are you'], ['wyd', 'what are you doing'], ['wsg', 'what\'s good (hello)'], ['wsp', 'what\'s up'], ['sup', 'what\'s up'],
  ['nvm', 'never mind'], ['ofc', 'of course'], ['oml', 'oh my lord'], ['ty', 'thank you'], ['tysm', 'thank you so much'], ['ttyl', 'talk to you later'], ['gn', 'good night'], ['gm', 'good morning'], ['hmu', 'hit me up, contact me'], ['lmk', 'let me know'],
  ['af', 'as fuck (very)'], ['asf', 'as fuck (very)'], ['fs', 'for sure'], ['fsr', 'for some reason'], ['ig', 'I guess (or Instagram)'], ['istg', 'I swear to god'], ['jk', 'just kidding'], ['ily', 'I love you'], ['ilysm', 'I love you so much'], ['sm', 'so much'], ['ts', 'this shit'], ['pmo', 'pisses me off'], ['sybau', 'shut your bitch ass up'], ['gyat', 'reaction to a big butt (crude)'],
  ['goon', 'masturbate for a long time (crude meme)'], ['gooning', 'masturbating for hours (crude meme)'], ['gooner', 'someone who goons (crude) — also an Arsenal fan'], ['crack', 'sexy / attractive ("crackable" = hot), or the drug'], ['crackable', 'attractive (crude meme)'],
  ['six seven', 'the "67" meme (means nothing, said for fun)'], ['67', 'the "6 7" meme (means nothing) — unless it\'s an actual number'], ['41', 'the "41" meme (means nothing)'], ['chopped', 'ugly'], ['chuzz', 'ugly'], ['tuff', 'cool, tough'], ['huzz', 'girls (from "hoes")'], ['jit', 'young kid'],
  ['clanker', 'slur-style insult for robots / AI'], ['clankers', 'robots / AIs (insult)'], ['bot', 'NPC-like person, or a Discord bot'], ['alt', 'alternate account'], ['lurker', 'someone who reads but never talks'], ['ghosting', 'stopped replying suddenly'], ['left on read', 'saw the message, no reply'], ['left on delivered', 'didn\'t even open the message'],
  ['ratioed', 'got more replies than likes — lost the argument'], ['clapback', 'a sharp comeback'], ['ragebait', 'saying something to make people angry on purpose'], ['engagement bait', 'post made just to get replies'], ['copium', 'cope — denial after losing'], ['hopium', 'unrealistic hope'], ['skill issue', 'you lost because you\'re bad'],
  ['mid af', 'very mediocre'], ['the ick', 'a sudden turn-off'], ['oop', 'oops (awkward reaction)'], ['sheesh', 'wow (impressed)'], ['yap', 'talk a lot about nothing'], ['yapping', 'talking too much'], ['yapper', 'someone who talks too much'], ['cope', 'deal with it / you\'re in denial'], ['seethe', 'be angry about it'], ['mald', 'rage'],
  // ── Discord / gaming ──
  ['afk', 'away from keyboard'], ['gg ez', 'good game, easy (taunt)'], ['ggs', 'good games'], ['noob', 'beginner / bad player'], ['n00b', 'beginner'], ['tryhard', 'someone trying way too hard'], ['sweat', 'an overly serious player'], ['sweaty', 'too serious / tryhard'], ['carry', 'win the game for the team'], ['carried', 'won thanks to someone else'],
  ['diff', 'skill difference ("jungle diff")'], ['op', 'overpowered (or original poster)'], ['nerf', 'make weaker'], ['buff', 'make stronger / muscular'], ['meta', 'the strongest current strategy'], ['clutch', 'win when it looked lost'], ['throw', 'lose on purpose / badly'], ['throwing', 'playing badly, losing a won game'], ['griefing', 'ruining the game for others'],
  ['1v1', 'one versus one fight'], ['kd', 'kill/death ratio'], ['k/d', 'kill/death ratio'], ['hardstuck', 'stuck at a rank'], ['smurf', 'good player on a low-rank alt'], ['lag', 'connection delay'], ['ping', 'connection delay (or mentioning someone)'], ['pfp', 'profile picture'], ['vc', 'voice chat'], ['gc', 'group chat'], ['mod', 'moderator'], ['ban', 'removed from the server'], ['raid', 'mass spam attack on a server'],
  ['owo', 'cute face / a Discord bot (OwO bot commands: owo hug, owo kill)'], ['uwu', 'cute face'], ['nitro', 'Discord paid subscription (also scam bait)'], ['fortnite', 'the game'], ['roblox', 'the game'], ['robux', 'Roblox currency'], ['vbucks', 'Fortnite currency'], ['fc 27', 'EA football game'], ['pack', 'open a card pack (FC Ultimate Team)'], ['walkout', 'rare card animation in FC'],
  // ── Aussie (beyond the speech bank) ──
  ['arvo', 'afternoon'], ['avo', 'avocado'], ['bogan', 'uncultured, trashy Aussie'], ['bludger', 'lazy person'], ['bludging', 'being lazy'], ['dag', 'dork, uncool person'], ['daggy', 'dorky'], ['drongo', 'idiot'], ['galah', 'idiot (a loud bird)'], ['flog', 'idiot / loser'], ['dropkick', 'useless idiot'], ['muppet', 'idiot'], ['wanker', 'jerk'], ['dunny', 'toilet'],
  ['fair dinkum', 'genuine, really'], ['dinkum', 'genuine'], ['strewth', 'wow / my god'], ['crikey', 'wow'], ['bloody oath', 'absolutely yes'], ['yeah nah', 'no'], ['nah yeah', 'yes'], ['she\'ll be right', 'it\'ll be fine'], ['no worries', 'no problem'], ['too easy', 'no problem, great'], ['heaps', 'a lot / very'], ['reckon', 'think'],
  ['stoked', 'very happy'], ['ripper', 'great'], ['grouse', 'great'], ['bonza', 'great'], ['beauty', 'great ("you beauty")'], ['deadset', 'seriously, honestly'], ['hectic', 'intense / wild'], ['knackered', 'exhausted'], ['buggered', 'exhausted / broken'], ['stuffed', 'tired or full ("get stuffed" = piss off)'], ['get stuffed', 'piss off'],
  ['crook', 'sick or bad'], ['dodgy', 'suspicious, poor quality'], ['sus', 'suspicious'], ['chuck a sickie', 'skip work pretending to be sick'], ['sickie', 'fake sick day'], ['smoko', 'a break (smoke break)'], ['servo', 'petrol station'], ['bottle-o', 'liquor store'], ['maccas', 'McDonald\'s'], ['brekkie', 'breakfast'], ['sanga', 'sandwich'], ['snag', 'sausage'],
  ['barbie', 'barbecue'], ['esky', 'cooler box'], ['thongs', 'flip-flops'], ['togs', 'swimsuit'], ['cossie', 'swimsuit'], ['sunnies', 'sunglasses'], ['trackies', 'trackpants'], ['ute', 'pickup truck'], ['rego', 'car registration'], ['tinnie', 'can of beer'], ['tinny', 'can of beer'], ['stubby', 'small beer bottle'], ['schooner', 'big glass of beer'], ['middy', 'medium beer glass'], ['goon', 'cheap boxed wine (Aussie) — or the crude meme'],
  ['pash', 'make out'], ['root', 'have sex (Aussie)'], ['rooted', 'exhausted / broken (or had sex)'], ['spewin', 'furious'], ['spewing', 'furious / disappointed'], ['chuck a wobbly', 'throw a tantrum'], ['cracking the shits', 'getting angry'], ['shit the bed', 'failed / broke down'], ['carn', 'come on (cheering)'], ['oi', 'hey'], ['mate', 'friend / bro'], ['cobber', 'mate'], ['sheila', 'woman (old)'],
  ['povo', 'poor'], ['cashed up', 'rich'], ['bevvy', 'a drink'], ['shout', 'buy a round ("my shout")'], ['my shout', 'I\'m paying'], ['woop woop', 'the middle of nowhere'], ['outback', 'remote Australia'], ['bush', 'countryside'], ['bin chicken', 'ibis (Aussie bird)'], ['dunny rat', 'lowlife'], ['seppo', 'an American'], ['pom', 'an English person'], ['pommy', 'English'], ['kiwi', 'a New Zealander'],
  ['durry', 'cigarette'], ['ciggie', 'cigarette'], ['chockers', 'full / packed'], ['chock-a-block', 'full'], ['devo', 'devastated'], ['defo', 'definitely'], ['arvo', 'afternoon'], ['ambo', 'paramedic'], ['firie', 'firefighter'], ['tradie', 'tradesperson'], ['sparky', 'electrician'], ['chippy', 'carpenter'], ['uni', 'university'], ['tafe', 'trade college'],
  ['footy', 'rugby league / AFL'], ['nrl', 'rugby league competition'], ['afl', 'Aussie rules football'], ['the eels', 'Parramatta Eels (NRL)'], ['state of origin', 'NSW vs QLD rugby league series'], ['budgie smugglers', 'tight speedos'], ['flat out', 'very busy'], ['flat out like a lizard drinking', 'extremely busy'], ['how ya going', 'how are you'], ['hows it goin', 'how are you'],
  // ── UK / roadman ──
  ['innit', 'isn\'t it / right?'], ['bruv', 'brother, mate'], ['fam', 'friend'], ['peng', 'attractive / tasty'], ['peak', 'bad luck, unfortunate'], ['allow it', 'stop it, leave it'], ['wagwan', 'what\'s going on (hello)'], ['ting', 'thing / girl'], ['mandem', 'group of guys'], ['gassed', 'excited / hyped up'], ['chuffed', 'pleased'], ['gutted', 'very disappointed'], ['mint', 'great'],
  ['bare', 'a lot of'], ['long', 'tedious'], ['moist', 'lame, uncool'], ['wasteman', 'useless person'], ['bait', 'obvious'], ['fuming', 'very angry'], ['skint', 'broke'], ['knackered', 'exhausted'], ['bollocks', 'nonsense'], ['bellend', 'idiot (crude)'], ['tosser', 'jerk'], ['cheeky', 'bold, playful'], ['taking the piss', 'mocking'], ['bants', 'banter'],
  // ── emojis ──
  ['💀', 'dead (laughing so hard)'], ['😭', 'crying (laughing or pleading, rarely real sadness)'], ['🗿', 'deadpan / unbothered / sigma'], ['🤡', 'clown — you\'re being stupid'], ['🧢', 'cap — that\'s a lie'], ['😮‍💨', 'relief / exasperated'], ['🙏', 'please / thanks'], ['🔥', 'fire, great'], ['👀', 'looking / interested in drama'], ['🤓', 'nerd (mocking)'], ['☠️', 'dead (laughing)'], ['🥀', 'sad / dramatic loss'], ['💔', 'heartbroken (often joking)'], ['🫡', 'salute, respect'], ['😏', 'smug / flirty'], ['🍆', 'penis (crude)'], ['🍑', 'butt'],
  // ── Québécois ──
  ['tabarnak', 'Québécois swear (holy shit / fuck)'], ['câlisse', 'Québécois swear (fuck)'], ['ostie', 'Québécois swear (fucking)'], ['crisse', 'Québécois swear'], ['chu', 'je suis (I am)'], ['chui', 'je suis'], ['pantoute', 'not at all'], ['niaiseux', 'dumb, silly'], ['char', 'car'], ['blonde', 'girlfriend'], ['chum', 'boyfriend'], ['plate', 'boring'], ['tiguidou', 'perfect, all good'],
  // ── Spanish chat slang ──
  ['xd', 'laughing face'], ['jaja', 'haha'], ['jajaja', 'hahaha'], ['wey', 'dude (Mexico)'], ['güey', 'dude (Mexico)'], ['no mames', 'no way / you\'re kidding (Mexico)'], ['qué pedo', 'what\'s up / what the hell (Mexico)'], ['chido', 'cool (Mexico)'], ['boludo', 'dude / idiot (Argentina)'], ['che', 'hey (Argentina)'], ['posta', 'for real (Argentina)'], ['aguante', 'up with / long live (Argentina, "aguante Messi")'],
  ['tío', 'dude (Spain)'], ['mola', 'it\'s cool (Spain)'], ['me la suda', 'I don\'t give a fuck (Spain)'], ['flipar', 'to be amazed (Spain)'], ['crack', 'a legend / genius (Spanish) — in English slang also "sexy"'], ['ndeah', 'no way'], ['alv', 'a la verga — fuck it (Mexico)'], ['ntp', 'no te preocupes — no worries'], ['ptm', 'puta madre — damn (Mexico)'], ['kpo', 'qué pasó — what happened'],
  // ── Polish chat slang ──
  ['xd', 'laughing face'], ['siema', 'hi'], ['elo', 'hi'], ['nara', 'bye'], ['spoko', 'okay, cool'], ['ziom', 'bro'], ['mordo', 'bro (friendly)'], ['essa', 'nice / let\'s go'], ['sztos', 'awesome'], ['git', 'okay / good'], ['kurwa', 'Polish swear (fuck)'], ['jd', 'jebać disa — fuck it (Polish)'], ['czemu', 'why'],
];

// One map, longest phrases first so "no cap" wins over "cap".
const DICT = new Map<string, string>();
for (const [k, v] of Object.entries(ABBREVIATIONS_MAP)) DICT.set(k.toLowerCase(), v.expansion);
for (const [k, v] of Object.entries(SLANG_LEXICON)) if (!DICT.has(k.toLowerCase())) DICT.set(k.toLowerCase(), v);
for (const [k, v] of MORE) DICT.set(k.toLowerCase(), v);
const PHRASES = [...DICT.keys()].sort((a, b) => b.length - a.length);
export const slangSize = () => DICT.size;

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const isEmoji = (s: string) => /\p{Extended_Pictographic}/u.test(s);
// Built once: one big alternation, word-bounded (emojis matched as they are).
const WORD_RE = new RegExp(`(?<![\\p{L}\\p{N}'])(?:${PHRASES.filter((p) => !isEmoji(p)).map(esc).join('|')})(?![\\p{L}\\p{N}'])`, 'giu');

// What the slang in a message means, for the reply. Skips what everyone knows, max 6, phrases before their parts.
export function slangHits(message: string): Array<{ term: string; meaning: string }> {
  const text = message.replace(/<@!?\d+>/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/```[\s\S]*?```/g, ' ');
  const found = new Map<string, string>();
  for (const m of text.matchAll(WORD_RE)) {
    const t = m[0].toLowerCase();
    if (OBVIOUS.has(t) || found.has(t)) continue;
    // a word that is part of a phrase already found ("cap" inside "no cap")
    if ([...found.keys()].some((f) => f.includes(' ') && f.split(/\s+/).includes(t))) continue;
    // single letters only as a whole message or with a noun ("W", "massive L") — never inside a sentence
    if (t.length === 1 && text.trim().split(/\s+/).length > 3) continue;
    found.set(t, DICT.get(t)!);
  }
  for (const p of PHRASES) if (isEmoji(p) && text.includes(p) && !found.has(p)) found.set(p, DICT.get(p)!);
  return [...found].slice(0, 6).map(([term, meaning]) => ({ term, meaning }));
}

export function slangNote(message: string): string {
  const hits = slangHits(message);
  return hits.length ? `SLANG IN THEIR MESSAGE (what it means when used as slang — only if they mean it that way; never explain it back to them): ${hits.map((h) => `"${h.term}" = ${h.meaning}`).join('; ')}.\n` : '';
}
