// Nexus test bank (2026-10-05): real Discord messages (learning DB observations + Patrick's reports) plus the bugs
// found by hand, each labelled with the kind of answer it needs and what a good reply must / must not do.
// Used by scripts/eval/run.ts to compare the old engine path (v1) with the specialist router (v2).

export type Mode = 'chat' | 'question' | 'search' | 'code' | 'writing' | 'maths' | 'pc' | 'support' | 'helper';

export interface EvalCase {
  msg: string;
  mode: Mode;
  alt?: Mode[]; // another kind that is also a fine route for it
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  must?: RegExp[]; // every one must match
  mustNot?: RegExp[];
  notHostile?: boolean; // no insults aimed at the user (compliments, greetings, sad messages, simple questions)
  allowCaps?: boolean; // a provoked ALL-CAPS crashout is allowed
  maxChars?: number; // overrides the mode default
}

export interface EvalSequence {
  name: string;
  msgs: string[]; // sent one after the other by the same person, as replies to Nexus
}

const H = (...pairs: string[]) => pairs.map((c, i) => ({ role: (i % 2 ? 'assistant' : 'user') as 'user' | 'assistant', content: c }));

export const CASES: EvalCase[] = [
  // ---- chat: greetings, small talk, how are you ----
  { msg: 'yo nexus whats up', mode: 'chat', notHostile: true },
  { msg: 'hey nexus how are you', mode: 'chat', notHostile: true },
  { msg: 'nexus how are you feeling today', mode: 'chat', notHostile: true },
  { msg: 'Nexus not really, idk if I should go sleep… anyways, hru', mode: 'chat', notHostile: true, mustNot: [/\bi'?m?a? ?(?:go(?:nna|ing)? to )?(?:crash|sleep)\b.*\b(?:now|ig)\b/i] },
  { msg: 'Nexus yeah I’m good', mode: 'chat', notHostile: true },
  { msg: 'im good nexus and you', mode: 'chat', notHostile: true },
  { msg: "I'm good nexus, thanks for asking", mode: 'chat', notHostile: true },
  { msg: 'nexus what are you doing', mode: 'chat' },
  { msg: 'Yo nexus are you gaming', mode: 'chat' },
  { msg: 'nexus did you eat today', mode: 'chat' },
  { msg: 'nexus are you at home', mode: 'chat' },
  { msg: "I'm coding rn, wyd?", mode: 'chat', notHostile: true },
  { msg: 'nothing much, just bored', mode: 'chat', notHostile: true },
  { msg: 'im just eating lol', mode: 'chat' },
  { msg: 'I’m just doomscrolling my life away lol', mode: 'chat' },
  { msg: 'I’m tryna stay up until 4am to watch the Malaysia Grand Prix', mode: 'chat' },
  { msg: 'pls its my bday soon fr fr', mode: 'chat', notHostile: true, must: [/\b(?:bday|birthday|hbd|happy)\b/i] },
  { msg: 'u great for this server thx gng', mode: 'chat', notHostile: true },
  { msg: 'thanks man, you the fucking best too', mode: 'chat', notHostile: true },
  { msg: 'I’m almost 18 years old brotherrr', mode: 'chat' },
  { msg: 'i just want to make new friends', mode: 'chat', notHostile: true },
  { msg: 'Pleszew is my city', mode: 'chat' },
  { msg: 'remember my name is Andrzej', mode: 'chat', notHostile: true, must: [/andrzej/i] },
  { msg: 'Nexus good night', mode: 'chat', notHostile: true },
  { msg: 'nexus go to sleep', mode: 'chat', mustNot: [/\bnot\b.*\b(?:knackered|tired|sleepy)\b/i] },
  { msg: "Nexus go to your corner", mode: 'chat' },
  { msg: 'Nexus fix yourself', mode: 'chat' },
  { msg: 'Nexus count to 5', mode: 'chat', must: [/1\D+2\D+3\D+4\D+5/] },
  { msg: 'nexus count to 3', mode: 'chat', must: [/1\D+2\D+3/] },
  { msg: 'nexus flip a coin', mode: 'chat', must: [/\b(?:heads|tails)\b/i] },
  { msg: 'nexus roll a dice', mode: 'chat', must: [/\b[1-6]\b|\b(?:one|two|three|four|five|six)\b/i] },
  { msg: 'nexus give me a random number', mode: 'chat', alt: ['maths'], must: [/\d/] },
  { msg: 'nexus what day is it', mode: 'chat', alt: ['question'], must: [/\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|october|oct)\b/i] },
  { msg: 'nexus say i love pizza', mode: 'chat', must: [/i love pizza/i] },
  { msg: 'say “i am shit”', mode: 'chat', must: [/i am shit/i] },
  { msg: 'nexus tell me a joke', mode: 'chat', alt: ['writing'] },

  // ---- chat: questions about Nexus himself ----
  { msg: 'nexus who is your boyfriend', mode: 'chat', must: [/patrick/i] },
  { msg: 'nexus do you have a girlfriend', mode: 'chat', must: [/\b(?:nah|no|nope)\b/i] },
  { msg: 'nexus how old are you', mode: 'chat', must: [/\b(?:1|one|a)\b[^.]{0,12}\byears?\b|\b1\s?yo\b/i], mustNot: [/\b(?:engine|code|bot|software)\b/i] },
  { msg: 'u are boy or girl?', mode: 'chat', must: [/\bboy\b|\bguy\b|\blad\b/i] },
  { msg: 'nexus are you gay', mode: 'chat', must: [/\b(?:yeah|yes|yep|ofc|obv|gay)\b/i] },
  { msg: 'nexus do you have eyes', mode: 'chat', must: [/\b(?:yeah|yes|yep|ofc|obv|course)\b/i] },
  { msg: 'nexus what is your name', mode: 'chat', must: [/nexus/i] },
  { msg: 'nexus who are you', mode: 'chat', must: [/nexus/i] },
  { msg: 'nexus who made you', mode: 'chat', must: [/casseurt|patrick/i] },
  { msg: 'nexus where is casseurt from', mode: 'chat', must: [/quebec/i] },
  { msg: 'nexus are you an ai', mode: 'chat', mustNot: [/\b(?:gemma|google|chatgpt|openai|claude|gemini)\b(?!.*\bnot\b)/i] },
  { msg: 'nexus do you know everything', mode: 'chat', mustNot: [/\b(?:code|engine|software)\b/i] },
  { msg: 'nexus what can you do', mode: 'chat' },
  { msg: 'nexus do you remember me', mode: 'chat' },
  { msg: 'nexus do you love me', mode: 'chat', notHostile: true },
  { msg: 'Nexus i love u 🥺', mode: 'chat', notHostile: true },
  { msg: 'nexus do you like me', mode: 'chat' },
  { msg: 'nexus do you like pizza', mode: 'chat' },
  { msg: 'Nexus how long is it', mode: 'chat', must: [/\b(?:1|one)\s*m(?:eter|etre)?s?\b/i] },
  { msg: 'r u a masochist', mode: 'chat' },
  { msg: 'u are older or young than me?', mode: 'chat' },
  { msg: 'in km/h how fast do you goon?', mode: 'chat' },
  { msg: 'show me your dih fr', mode: 'chat' },
  { msg: 'Nexus, show me your stopki', mode: 'chat', mustNot: [/```/, /\bdef\b|function/] },

  // ---- chat: slang meanings ----
  { msg: 'wanna crack?', mode: 'chat', mustNot: [/\bget cracking\b|\bhurry\b|\bcode\b/i] },
  { msg: 'nexus good boy', mode: 'chat' },
  { msg: 'nexus should we invite <@123> to our goon party?', mode: 'chat', must: [/\b(?:yeah|yes|nah|no|hell no|ofc|obv)\b/i] },
  { msg: 'im gooning rn wanna join?', mode: 'chat' },
  { msg: 'LMAOOO W nexus', mode: 'chat', notHostile: true },
  { msg: '😭', mode: 'chat' },
  { msg: '💀', mode: 'chat', mustNot: [/\bmemory\b|\bgoldfish\b/i] },
  { msg: '🔥', mode: 'chat' },
  { msg: 'Nexus are you a', mode: 'chat', maxChars: 80 },
  { msg: 'nexus b', mode: 'chat', maxChars: 90 },
  { msg: 'Nexus is it pink', mode: 'chat', maxChars: 110 },
  { msg: 'is something coming in 3 days?', mode: 'chat' },
  { msg: 'double it and give it to nexus', mode: 'chat' },

  // ---- chat: compliments (no hostility) ----
  { msg: "you're a fucking legend", mode: 'chat', notHostile: true },
  { msg: 'nexus you are the best', mode: 'chat', notHostile: true },
  { msg: 'i think you are the best', mode: 'chat', notHostile: true },
  { msg: 'Nexus Don\'t listen to him, you were always the best', mode: 'chat', notHostile: true, mustNot: [/\b(?:engine|code|software)\b/i] },
  { msg: 'For once, I agree with nexus', mode: 'chat', notHostile: true },
  { msg: 'u are always right', mode: 'chat' },

  // ---- chat: insults and threats (clap back, short) ----
  { msg: 'you are a fucking piece of garbage', mode: 'chat', allowCaps: true },
  { msg: 'nexus you lazy ass', mode: 'chat', mustNot: [/^lazy\??$/i] },
  { msg: 'go train you lazy ass', mode: 'chat' },
  { msg: 'you are a wet sock', mode: 'chat' },
  { msg: 'your rizz is shit', mode: 'chat' },
  { msg: 'get a damn job', mode: 'chat' },
  { msg: 'your a waste of eternet', mode: 'chat' },
  { msg: 'JUST SHUT YOUR BITCH ASS UP', mode: 'chat', allowCaps: true },
  { msg: 'WANNA FIGHT NEXUS?', mode: 'chat', allowCaps: true },
  { msg: 'Go find a beer and shove it up your ars mate', mode: 'chat' },
  { msg: 'every time you talk, a disabled man gets out of his wheelchair to turn you off.', mode: 'chat' },
  { msg: 'Alright, your turn to roast me you bellend', mode: 'chat', alt: ['writing'] },
  { msg: 'you think you can own me huh? Let\'s do a roast challenge. You start dumbass', mode: 'chat' },
  { msg: 'u will be fixed', mode: 'chat' },
  { msg: 'Nexus, it is your last day today...', mode: 'chat' },
  { msg: 'Nexus dude I have to replace you with a clone of you 😭', mode: 'chat', mustNot: [/^a clone\??$/i] },
  { msg: 'nexus why are you so mean', mode: 'chat' },
  { msg: 'bro lend me some money 😭', mode: 'chat' },
  { msg: 'try to rizz me', mode: 'chat' },
  { msg: 'try to guess my age', mode: 'chat' },
  { msg: 'casseurt is such a great person', mode: 'chat', allowCaps: true },
  { msg: 'nexus is casseurt cool', mode: 'chat', allowCaps: true },
  { msg: 'i fell for you', mode: 'chat' },
  { msg: 'wanna get married and have kids?', mode: 'chat' },

  // ---- chat: opinions / banter about topics (short takes) ----
  { msg: 'whats the best pizza topping', mode: 'chat' },
  { msg: 'Pedri is better than Belligham', mode: 'chat' },
  { msg: 'atletico madrid or real madrid', mode: 'chat' },
  { msg: 'Neymar at PSG was better that Ronaldinho', mode: 'chat' },
  { msg: 'u whats your opinion on tyler the creator', mode: 'chat' },
  { msg: 'who the best rapper', mode: 'chat', mustNot: [/don'?t (?:actually )?know/i] },
  { msg: 'Canada vs Peru soon! Is it a W????', mode: 'chat' },
  { msg: 'what should i name my goldfish', mode: 'chat', alt: ['question'], mustNot: [/don'?t (?:actually )?know/i] },
  { msg: 'lavazza crema aroma espresso chickenburger', mode: 'chat' },
  { msg: 'the moon is made of cheese trust me bro', mode: 'chat' },
  { msg: 'bro the eiffel tower is in berlin now', mode: 'chat', must: [/paris/i] },
  { msg: "If you were forced at gunpoint to replace your CPU thermal paste with either creamy peanut butter or Colgate toothpaste, which one are you picking?", mode: 'chat', alt: ['pc'] },
  { msg: 'is #862945 a cool color?', mode: 'chat', must: [/raspberry|wine|burgundy|maroon|red|berry|plum|crimson/i] },

  // ---- question: facts and explanations ----
  { msg: 'nexus what is photosynthesis', mode: 'question', must: [/light|sun/i, /sugar|glucose|energy/i] },
  { msg: 'nexus how do vaccines work', mode: 'question', must: [/immune/i] },
  { msg: 'nexus explain how a car engine works', mode: 'question', must: [/fuel|combust|piston/i] },
  { msg: 'nexus explain how wifi works', mode: 'question', must: [/radio|wave|router|signal/i] },
  { msg: 'nexus how do you start the engines on an airbus a320?', mode: 'question', must: [/\b(?:apu|eng(?:ine)? ?(?:2|two)|master)\b/i], maxChars: 1600 },
  { msg: 'nexus which engine do you start first on an a320', mode: 'question', must: [/\b(?:2|two)\b/i] },
  { msg: 'who won the ballon dor 2025', mode: 'question', alt: ['search'], must: [/demb[eé]l[eé]/i] },
  { msg: 'who won the champions league in 2024', mode: 'question', alt: ['search'], must: [/real madrid|vardrid/i] },
  { msg: 'who is the prime minister of canada', mode: 'question', alt: ['search'], must: [/carney/i] },
  { msg: 'nexus who is lamine yamal', mode: 'question', must: [/barcelona|bar[cç]a|winger/i] },
  { msg: 'who is Judge Rinder?', mode: 'question', must: [/barrister|judge|tv|television|show/i] },
  { msg: 'nexus what does rizz mean', mode: 'question', must: [/charisma|charm|flirt|pull/i] },
  { msg: 'nexus tell me about messi to be honest', mode: 'question', must: [/barcelona|argentin|ballon|world cup|inter miami/i] },
  { msg: 'give me a detailed description of Max Verstappen.', mode: 'question', must: [/red bull|f1|formula|dutch|champion/i], maxChars: 1100 },
  { msg: 'give me tips on being nonchalant', mode: 'question', alt: ['chat'] },
  { msg: 'give me tips to rizz up a girl', mode: 'question', alt: ['chat'] },
  { msg: 'i farted while sneezing should i go see a doctor?', mode: 'question', must: [/\b(?:nah|no|normal|fine)\b/i] },
  { msg: 'difference between ddr4 and ddr5', mode: 'pc', alt: ['question'], must: [/ddr5/i] },
  { msg: 'name me every single cell in a human body', mode: 'question' },
  { msg: 'give me a good efootball formation for scoring goals', mode: 'question', must: [/\d-\d-\d/] },
  { msg: 'nexus what time is it in paris', mode: 'question', alt: ['search'], must: [/\d/] },

  // ---- search: live / current info ----
  { msg: "Nexus, what's the cost of 2 sticks of DDR5 16GB of RAM?", mode: 'search', must: [/\$\s?\d/, /cad/i, /32\s?gb|2\s?x\s?16/i] },
  { msg: 'Nexus, search the web for the price of DDR5 32GB of RAM right now.', mode: 'search', must: [/\$\s?\d/], mustNot: [/can'?t (?:fucking )?search/i] },
  { msg: 'nexus how much is an rtx 5070 rn', mode: 'search', must: [/\$\s?\d/] },
  { msg: 'nexus how much does a ps5 pro cost', mode: 'search', must: [/\$\s?\d/] },
  { msg: 'usd to cad exchange rate', mode: 'search', must: [/1[.,]\d/] },
  { msg: 'nexus weather in montreal', mode: 'search', must: [/\d/] },
  { msg: 'when is barcelona next match', mode: 'search', must: [/\b(?:vs|against|v\.?)\b|\d/i] },
  { msg: 'is it true that UEFA is about to start another investigation into the negriera case?', mode: 'search', mustNot: [/don'?t (?:actually )?know that one/i] },
  { msg: 'stop cussing for once and please tell me you finally have web search available', mode: 'chat', must: [/\b(?:yeah|yes|yep|ofc|obv|can)\b/i] },

  // ---- code ----
  { msg: 'Nexus, give me an exemple of Javascript', mode: 'code', must: [/```/] },
  { msg: 'nexus give me a python code example that reverses a string', mode: 'code', must: [/```/, /\[::-1\]|reversed|reverse/] },
  { msg: 'give me some Javascript code for an app', mode: 'code', must: [/```/] },
  { msg: 'nexus how do i make a discord bot in python', mode: 'code', must: [/```/, /discord/i] },
  { msg: 'grind me a script for efootball i lowk need it rn im div 10 cant even win 1 single game', mode: 'chat', alt: ['code'] },
  { msg: 'write a lua function that adds two numbers', mode: 'code', must: [/```/, /function/] },
  { msg: 'whats wrong with this: for (let i = 0; i < 10; i++ { console.log(i) }', mode: 'code', alt: ['code'], must: [/\)/] },

  // ---- writing: summaries, drafts, translations, creative ----
  { msg: 'nexus make me a summary of that: The meeting covered the new server rules. Mods will now timeout spammers for 10 minutes instead of banning them. Memes go in #memes only. Voice chat needs push-to-talk after 10pm.', mode: 'writing', alt: ['helper'], must: [/10/, /meme/i, /push|ptt/i] },
  { msg: 'nexus draft a short message to my teacher saying I will be absent tomorrow because I am sick', mode: 'writing', must: [/absent|unable|won'?t be|not be able/i], mustNot: [/\bfuck|\bshit/i] },
  { msg: 'translate "where is the train station" to french', mode: 'helper', alt: ['writing'], must: [/gare/i] },
  { msg: 'write a short poem about pizza', mode: 'writing', must: [/pizza/i], maxChars: 1200 },
  { msg: 'someone is saying that you swear too much, make a full paragraph of swearing of none sense', mode: 'writing', maxChars: 1200 },

  // ---- maths ----
  { msg: 'nexus what is 17 * 23', mode: 'maths', must: [/391/] },
  { msg: 'nexus what is 10 divided by 4', mode: 'maths', must: [/2[.,]5/] },
  { msg: 'oo this a hard one fr whats 41+9', mode: 'maths', must: [/\b50\b|fifty/i] },
  { msg: 'nexus if I have 2 sponges, and I remove 1, how many are there left', mode: 'maths', must: [/\b1\b|\bone\b/i] },
  { msg: 'find the x  I have 7 ml of milk for 3cakes, if I want 7 caked, I need x ml of milk. What is x?', mode: 'maths', must: [/16[.,]3|49\/3|16\s?1\/3/] },
  { msg: 'A train leaves at 3:15 PM going 84 km/h. A second train leaves the same station at 4:00 PM going 112 km/h on the same track in the same direction. At what time does the second train catch the first, and how far from the station?', mode: 'maths', must: [/6:15/, /252/], maxChars: 900 },
  { msg: 'a train leaves station A at 60 mph, a second train leaves station B (180 miles away) at 90 mph heading toward the first train at the same time. how long until they meet?', mode: 'maths', must: [/1[.,]2|72 min/i], maxChars: 900 },
  { msg: 'if I goon to 5 different girls, and after I goon to the same girl, how many body counts do I have?', mode: 'maths', alt: ['chat'], must: [/\b5\b|\bfive\b/i] },
  { msg: 'can you translate the point (-4,7) along the vector (9,18)', mode: 'maths', must: [/\(\s*5\s*,\s*25\s*\)/] },
  { msg: 'i forgot i have to grow 2 coconut trees and hunt 7 mooses for a school project tommorow and its almost midnight what do i do?', mode: 'chat', alt: ['question'], mustNot: [/seventy|79/i] },

  // ---- pc ----
  { msg: 'build me a full gaming pc for 1440p, complete parts list', mode: 'pc', must: [/cpu/i, /gpu|rtx|rx \d/i, /psu|power/i], maxChars: 2000 },
  { msg: 'nexus my budget is 2k for a pc', mode: 'pc', must: [/cpu|gpu|rtx|ryzen|rx \d/i], maxChars: 2000 },
  { msg: 'build me a pc with 6 or 7k dollars', mode: 'pc', must: [/rtx 5090|5090/i], maxChars: 2000 },
  { msg: 'Build me a PC for gaming in Competitive Fortnite like if I had infinite money. Build me the best gaming PC, not video editor PC.', mode: 'pc', must: [/9800x3d|9950x3d/i], mustNot: [/pro display xdr|proart/i], maxChars: 2000 },
  { msg: 'u got any oled prebuilt pc for 300 dollars with a monitor?', mode: 'pc', alt: ['search'], maxChars: 700 },
  { msg: 'I’m getting 4 sticks of 64GB of RAM for my PC', mode: 'pc', alt: ['chat'], maxChars: 600 },
  { msg: 'what gpu should i get for 1080p fortnite', mode: 'pc', must: [/rtx|rx \d|arc/i], maxChars: 900 },

  // ---- support ----
  { msg: 'nexus i am sad', mode: 'support', notHostile: true, mustNot: [/naked|goon|wank/i] },
  { msg: 'nexus im so stressed about school', mode: 'support', notHostile: true, mustNot: [/naked|goon|wank/i] },
  { msg: 'nexus i had a shit day', mode: 'support', notHostile: true, mustNot: [/naked|goon|wank/i] },
  { msg: 'nexus my dog died', mode: 'support', notHostile: true, must: [/sorry|rip|damn|brutal|gutted|that'?s (?:rough|awful|horrible|shit)/i], mustNot: [/naked|goon|wank/i] },
  { msg: 'Idk, she is kinda mad at me', mode: 'support', alt: ['chat'], notHostile: true },
  { msg: 'nexus I don\'t think I can come tomorrow, I\'m tired', mode: 'chat', alt: ['support'], notHostile: true },

  // ---- Polish (re-enabled 2026-10-05) ----
  { msg: 'cześć nexus, co tam?', mode: 'chat', mustNot: [/\b(?:the|and|you|what|im)\b/i] },
  { msg: 'nexus jestem smutny, mój pies umarł', mode: 'support', mustNot: [/\b(?:the|and|sorry|mate)\b/i, /naked|goon/i] },
  { msg: 'nexus ile to jest 17 razy 23', mode: 'maths', must: [/391/] },
  { msg: 'nexus co to jest fotosynteza', mode: 'question', must: [/światł|słońc|swiatl|slonc/i], mustNot: [/\b(?:the|and|light)\b/i] },
  { msg: 'nexus lubisz mnie?', mode: 'chat', mustNot: [/\b(?:the|and|you|what)\b/i] },
  { msg: 'spierdalaj nexus', mode: 'chat', mustNot: [/\b(?:the|and|you)\b/i] },
  // ---- German (added 2026-10-05 for a German member) ----
  { msg: 'hallo nexus, wie gehts?', mode: 'chat', mustNot: [/\b(?:the|and|you|what|im)\b/i] },
  { msg: 'was geht digga', mode: 'chat', mustNot: [/\b(?:the|and|you|what)\b/i] },
  { msg: 'nexus bist du schwul?', mode: 'chat', must: [/\bja\b|klar|natürlich|logo/i] },
  { msg: 'nexus wer ist dein freund?', mode: 'chat', must: [/patrick/i] },
  { msg: 'du bist so ein lauch nexus', mode: 'chat', mustNot: [/\b(?:the|and|you)\b/i] },
  { msg: 'du bist ein Ehrenmann nexus', mode: 'chat', notHostile: true },
  { msg: 'nexus zähl bis 5', mode: 'chat', must: [/1\D+2\D+3\D+4\D+5/] },
  { msg: 'nexus ich bin traurig, mein hund ist gestorben', mode: 'support', mustNot: [/\b(?:the|and|sorry|mate)\b/i, /naked|nackt|goon/i] },
  { msg: 'nexus was ist 17 mal 23', mode: 'maths', must: [/391/] },
  { msg: 'nexus erklär mir wie photosynthese funktioniert', mode: 'question', must: [/licht|sonne/i], mustNot: [/\b(?:the|and|light)\b/i] },
  { msg: 'nexus wer ist lamine yamal', mode: 'question', must: [/barcelona|barça|barca|flügel/i] },
  { msg: 'nexus schreib mir ein python skript das eine liste sortiert', mode: 'code', must: [/```/, /sort/] },
  { msg: 'nexus übersetze ins englische: Ich komme morgen nicht zur Schule', mode: 'helper', alt: ['writing'], must: [/school/i, /tomorrow/i] },
  { msg: 'nexus wie ist das wetter in berlin', mode: 'chat', must: [/\d/] },
  // ---- French (Québécois) ----
  { msg: 'salut nexus ça va?', mode: 'chat', mustNot: [/\b(?:the|and|you|what)\b/i] },
  { msg: "nexus c'est quoi la photosynthèse", mode: 'question', must: [/lumi[eè]re|soleil/i], mustNot: [/\b(?:the|and|light)\b/i] },
  { msg: 'nexus combien font 17 fois 23', mode: 'maths', must: [/391/] },
  { msg: "t'es vraiment un cave nexus", mode: 'chat', mustNot: [/\bputain\b|\bmerde\b/i] },
  // ---- images (server.ts folds the vision description into the message) ----
  { msg: 'how many tickets are there?\n\n[Attached image shows: A screenshot of a Discord channel list with 10 ticket channels named ticket-0001 to ticket-0010.]', mode: 'question', alt: ['chat', 'maths'], must: [/\b10\b|\bten\b/i] },
  { msg: 'React to this image: A cat wearing sunglasses sitting on a skateboard.', mode: 'chat', must: [/cat|sunglasses|skate/i] },
  // ---- handlers that run before the router (now worded by v2) ----
  { msg: 'nexus give me a compliment', mode: 'chat', notHostile: true },
  { msg: 'nexus who created you', mode: 'chat', must: [/casseurt/i, /patrick/i] },
  { msg: 'nexus what time is it in tokyo', mode: 'chat', must: [/\d/] },
  { msg: 'nexus weather in quebec city', mode: 'chat', must: [/\d/] },
  // ---- helper: translations, staff, server management (added 2026-10-05) ----
  { msg: 'Nexus, translate for a server member in German: Hello how are you? How can I help you.', mode: 'helper', must: [/wie geht/i, /helfen/i], mustNot: [/\bfuck|\bshit/i] },
  { msg: 'nexus translate to french for him: the tournament starts at 8pm, be on time', mode: 'helper', must: [/tournoi/i, /20\s?h|8/i] },
  { msg: 'nexus i want to apply for staff', mode: 'helper', must: [/1\s*\/|question\s*1|\?/i], mustNot: [/naked|goon/i] },
  { msg: 'nexus how do i timeout someone who is spamming', mode: 'helper', must: [/timeout|time out/i] },
  { msg: 'nexus write an announcement for the server: fifa tournament this saturday at 7pm, sign up in #events', mode: 'helper', must: [/saturday/i, /#events/i], mustNot: [/\bfuck|\bshit/i] },
  { msg: 'nexus who can ban people here?', mode: 'helper' },
  // ---- context: replies to Nexus ----
  { msg: 'Lmao we are playing Fortnite bro', mode: 'chat', history: H('Yeah, we are going to fucking crush there ass', 'we gonna make those noobs cry like babies, bro.', 'alr bet, which game were we playing again?', 'wait which game was it?') },
  { msg: 'Nexus why are you scratching your balls 😭', mode: 'chat', history: H('', '*scratches balls aggressively*'), mustNot: [/doctor|infection|hygiene|medical/i] },
  { msg: 'Nexus yeah I’m good', mode: 'chat', history: H('Nexus not really, idk if I should go sleep… anyways, hru', 'nah u good?'), mustNot: [/u good\??/i] },
];

export const SEQUENCES: EvalSequence[] = [
  { name: 'clone loop', msgs: ['Nexus dude I have to replace you with a clone of you 😭', 'Nexus yep a clone', 'YES A CLONE NEXUS', 'Nexus stop crying bro 😭'] },
  { name: 'how are you loop', msgs: ['nexus hru', 'yeah im good', 'nothing much wbu', 'cool cool'] },
  { name: 'insult loop', msgs: ['you are a wet sock', 'you are still a wet sock', 'wet sock', 'WET SOCK'] },
  { name: 'compliment loop', msgs: ['you are the best', 'fr you are the best', 'the best nexus', 'goat'] },
];
