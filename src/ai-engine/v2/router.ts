// Nexus v2 router (2026-10-05): decides which specialist answers a message.
// 1. Rules for the cases that are certain (a price question, a code request, arithmetic, a PC build, someone sad...).
// 2. Otherwise the message is compared BY MEANING (bge-m3 embeddings, ~50 ms, already loaded for the corpus) with
//    labelled example messages; the closest examples vote. This is what catches spelling and phrasing the rules miss
//    ("exemple of javascript", "wats the cost of..."). The examples here are NOT the test bank's messages.
// 3. When the vote is too close, the model itself picks (a tiny one-word call).
// A model call for every message was avoided on purpose: Ollama keeps one prompt cache, so switching to a router
// prompt and back would make it re-read the specialist instructions each time (seconds per message).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import * as localLlmClient from '../localLlmClient';
import { embedQueryCached } from '../vectorSearch';
import { detectTask, isWordProblem, SAD_RE } from '../rules/messageMode';
import { isPriceQuestion } from '../priceTracker';
import { PC_BUILD_REQUEST_RE } from '../rules/postProcess';
import { detectEmotionalDistress } from '../swearEngine';
import { isBodyCountQuestion } from '../rules/bodyCount';
import type { SpecialistId } from './specialists';

export interface Route {
  mode: SpecialistId;
  by: 'rule' | 'meaning' | 'model' | 'fallback';
  reason: string;
  confidence: number;
}

const strip = (t: string) =>
  (t || '')
    .replace(/<@!?\d+>/g, '@someone')
    .replace(/^\s*(?:(?:hey+|yo+|ok(?:ay)?)[\s,]+)?nexus\b[\s,:!?-]*/i, '')
    .replace(/[\s,]+nexus[\s!?.,]*$/i, '')
    .trim();

const LIVE_RE =
  /\b(?:search|google|look\s*(?:it\s*)?up|check\s+online)\b[^?!]{0,40}\b(?:web|online|internet|for|up|about|price|news)\b|\bsearch\s+(?:the\s+)?(?:web|internet)\b|\b(?:weather|forecast|temperature)\s+(?:in|for|at|today|tomorrow|rn)\b|\bexchange\s+rate\b|\b(?:usd|cad|eur|gbp|btc|bitcoin|eth)\s+(?:to|in)\s+(?:usd|cad|eur|gbp|dollars?)\b|\b(?:next|last)\s+(?:match|game|fixture|race)\b|\b(?:who\s+won|score\s+of|result\s+of)\b[^?]{0,40}\b(?:last\s+night|yesterday|today|tonight|this\s+week(?:end)?)\b|\bis\s+it\s+true\s+that\b|\b(?:latest|breaking)\s+news\b|\bnews\s+(?:about|on)\b|\b(?:right\s+now|rn|currently|today'?s?|latest|live|current)\b[^?!]{0,40}\b(?:price|prices|cost|news|score|weather|exchange\s+rate)\b/i;
const CHAT_COMMAND_RE = /^(?:(?:can|could|will)\s+(?:you|u)\s+)?(?:count\s+(?:to|from)\s+\d+|say\s+\S|repeat\s+after\s+me|flip\s+a\s+coin|roll\s+(?:a\s+)?(?:dice|die|d\d+)|(?:give\s+me|pick)\s+a\s+random\s+number|go\s+to\s+(?:sleep|bed|ur|your)|good\s*night|gn\b|fix\s+(?:yourself|urself)|shut\s+up|stfu)\b/i;
const ADVICE_RE = /\b(?:give\s+me\s+(?:some\s+)?tips|tips\s+(?:on|for|to)|how\s+(?:do|can|should)\s+i\s+(?!build\b)\w+|should\s+i\s+(?:go\s+)?(?:see|call)\s+a\s+(?:doctor|dentist|vet)|is\s+it\s+(?:normal|safe|bad|healthy)\s+to)\b/i;
// Short questions aimed at Nexus himself ("who is your boyfriend", "where is casseurt from", "do you remember me").
const SELF_Q_RE = /^(?:(?:and|so|but)\s+)?(?:(?:who|what|where|when|why|how)(?:'s|s)?\s+(?:is|are|was|were|do|does|did|old|long|tall)?\s*(?:are\s+)?(?:you|u|ur|your|yourself|casseurt|patrick|it)\b|(?:do|did|are|r|can|could|will|would|have|were|is)\s+(?:you|u|ur|your)\b|(?:you|u|ur)\s+(?:are|r|is|got|have)\b)/i;
const ABOUT_RE = /^(?:who\s+(?:is|was|are|were)\s+\S|tell\s+me\s+(?:about|everything\s+(?:you\s+know\s+)?about)\s+\S|(?:give\s+me\s+a\s+)?(?:detailed\s+)?description\s+of|describe\s+\S|name\s+(?:me\s+)?(?:every|all)\b|give\s+me\s+(?:a|some)\s+(?:\S+\s+){0,3}(?:formation|strategy|tactics?|routine|workout|recipe|tips|advice)\b)/i;
const CODE_CUE_RE = /```|[{};]|=>|\b(?:let|const|var|def|import|return|console\.log|print|elif|else\s*:)\b|\w\(\s*\w*\s*\)|\b(?:code|coding|script|function|program|programming|python|javascript|js|typescript|ts|java|c\+\+|cpp|c#|rust|golang|html|css|lua|luau|php|sql|bash|regex|api|bug|error|exception|compile|debug|loop|variable|class|bot|app|website|web\s*site|game|roblox|discord\.js|node|react|json|terminal|command\s+line)\b/i;
const ARITHMETIC_RE = /^(?:what(?:'s|s|\s+is)|whats|calculate|calc|solve|compute|how\s+much\s+is)?\s*[-\d\s.,+*/x×÷^()%]+(?:\s*(?:=|\?))?\s*$|\d\s*(?:[+*/×÷^]|plus|minus|times|divided\s+by|multiplied\s+by|to\s+the\s+power\s+of)\s*\d|\b(?:square\s+root|percent\s+of|\d+%\s+of|solve\s+for|derivative|integral)\b/i;
const VECTOR_RE = /\b(?:translate|move|shift)\s+(?:the\s+)?point\b|\bvector\s*\(/i;
const PC_PART_RE = /\b(?:gpu|cpu|graphics\s+card|motherboard|mobo|psu|power\s+supply|ssd|nvme|ddr[45]|ram\s+(?:sticks?|kit)|sticks?\s+of\s+(?:ram|ddr)|rtx\s?\d{3,4}|gtx\s?\d{3,4}|rx\s?\d{4}|ryzen|core\s+ultra|i[579]-?\d{4,5}|x3d|prebuilt|gaming\s+pc|pc\s+build|aio|cpu\s+cooler|pc\s+case|monitor|1440p|4k\s+gaming|1080p)\b/i;
const PC_ASK_RE = /\b(?:should\s+i\s+(?:get|buy|pick|go\s+with)|what\s+(?:gpu|cpu|ram|psu|motherboard|ssd|monitor|cooler|case|parts?)|which\s+(?:gpu|cpu|ram|psu|motherboard|ssd|monitor)|is\s+(?:a|an|the|this|my)?\s*\S+(?:\s+\S+)?\s+(?:good|enough|worth)|upgrade|bottleneck|compatible|fit|for\s+(?:gaming|fortnite|valorant|1440p|1080p|4k)|i'?m\s+getting|getting\s+\d|(?:my|a)\s+(?:build|setup|rig))\b/i;

// German (2026-10-05, for a German server member): the same kinds of rules in German.
// Helper requests (translations, staff, moderation, server management). Checked before the code/writing rules.
const HELPER_RE = /\bpartner(?:ship|ships|ing)?\b|\baffiliat\w*\b|\bpartenariat\b|\bpartnerschaft\b|(?<![a-zà-ÿäöüß])(?:translate|translation|traduis|traduire|traduction|übersetz[a-zäöüß]*|uebersetz[a-z]*|tłumacz\w*|przetłumacz\w*)(?![a-zäöüß])|\b(?:tell|say\s+to)\s+(?:him|her|them|the\s+member)\s+in\s+[a-z]+\b|\bwhat\s+did\s+(?:he|she|they)\s+(?:just\s+)?say\b|\b(?:apply|application|applying)\s+(?:for|to\s+be(?:come)?)\s+(?:staff|mod|moderator|admin|helper)\b|\b(?:staff|mod|moderator)\s+application\b|\b(?:can\s+i\s+be|become|be)\s+(?:a\s+)?(?:staff|mod|moderator|admin)\b|\binterview\s+me\b|\b(?:how\s+(?:do|can|should)\s+i|how\s+to)\s+(?:ban|kick|timeout|time\s+out|mute|warn|unban|purge|set\s+up\s+automod|give\s+(?:someone|a\s+member|him|her)\s+(?:a\s+)?role|make\s+(?:a\s+)?role)\b|\b(?:who\s+can|who\s+is\s+allowed\s+to)\s+(?:ban|kick|timeout|mute|manage)\b|\b(?:staff|mod)\s+(?:roles?|team|hierarchy|ranks?)\b|\b(?:highest|top)\s+(?:staff|role|rank)\b|\b(?:server|discord)\s+(?:rules|announcement|event)\b|\b(?:write|make|draft)\s+(?:an?\s+)?(?:announcement|welcome\s+message|warning\s+for|server\s+rules|rules\s+for\s+the\s+server)\b|\b(?:raid|spammer|spamming)\b.*\b(?:what\s+(?:do|should)\s+(?:i|we)|help)\b|\bsumm?ari[sz]e\s+(?:the\s+)?(?:chat|discussion|conversation|argument|drama|what\s+happened)\b/i;

const DE_SAD_RE = /\b(?:ich\s+bin|mir\s+geht'?s|ich\s+f(?:ü|ue)hl\w*(?:\s+mich)?)\s+(?:so\s+|echt\s+|voll\s+|richtig\s+|grad\s+)?(?:traurig|einsam|schlecht|scheiße|scheisse|depressiv|gestresst|am\s+ende|kaputt)\b|\b(?:mein|meine)\s+\w+\s+(?:ist\s+)?(?:gestorben|tot)\b|\bich\s+will\s+nicht\s+mehr\b/i;
const DE_MATH_RE = /\d\s*(?:mal|geteilt\s+durch|durch|hoch|plus|minus)\s*\d|\b(?:wurzel\s+aus|prozent\s+von|rechne|berechne)\b/i;
const DE_PRICE_RE = /\b(?:wie\s*viel\s+kostet|was\s+kostet|wie\s+teuer\s+(?:ist|sind)|preis\s+(?:von|für|fuer|einer?|eines?))\b/i;
const DE_CODE_RE = /\b(?:schreib|programmier|code|mach|erstell|bau)\w*\b[^?!.]{0,40}\b(?:code|skript|script|programm|funktion|bot|website|webseite|app)\b|\bwas\s+ist\s+falsch\s+(?:an|mit)\s+(?:meinem|diesem)\s+code\b/i;
const DE_QUESTION_RE = /^(?:wer\s+(?:ist|war|sind)\s+\S|was\s+(?:ist|sind|bedeutet|heißt|heisst)\s+(?:ein|eine|der|die|das)?\s*\S|wie\s+funktionier\w*|erklär\w*\s+(?:mir\s+)?\S|warum\s+\S|wieso\s+\S|gib\s+mir\s+(?:ein\s+paar\s+)?tipps)/i;
const DE_CHAT_RE = /^(?:zähl|zaehl)\s+bis\s+\d+|^sag\s+\S|^geh\s+(?:schlafen|ins\s+bett|in\s+deine\s+ecke)|^gute\s+nacht|^(?:wirf|wirfst)\s+(?:eine\s+)?münze|^würfel|^(?:bist|hast|magst|liebst|kannst|willst)\s+du\b|^wie\s+alt\s+bist\s+du|^wer\s+(?:ist\s+dein|bist\s+du|hat\s+dich)|^was\s+(?:geht|machst\s+du)|^wie\s+geht'?s/i;

function byRules(text: string): Route | null {
  const t = text;
  const r = (mode: SpecialistId, reason: string): Route => ({ mode, by: 'rule', reason, confidence: 1 });
  if (detectEmotionalDistress(t) || SAD_RE.test(t) || DE_SAD_RE.test(t)) return r('support', 'sad / stressed');
  // A pasted, filled-in staff application form (or any application by its signs, whatever its layout).
  if (t.length > 250 && [/\bage\b/i, /time\s*zone|\bregion\b/i, /availab\w*|hours?\s+(?:per|a)\s+day/i, /experience/i, /why\s+(?:do\s+)?(?:you|u)\s+want/i, /strengths?|skills?/i, /scenario/i, /\bstaff\b|moderat\w*/i, /agreement|i\s+confirm|i\s+agree/i, /discord\s+(?:name|tag|user)/i].filter((re) => re.test(t)).length >= 5) return r('helper', 'staff application');
  if (/scenario\s*a\b[\s\S]*scenario\s*b\b/i.test(t) && /\b(?:age|availability|experience)\b/i.test(t)) return r('helper', 'filled staff application form');
  if (HELPER_RE.test(t) && !/^(?:can\s+you\s+)?translate\s+(?:the\s+)?point\b/i.test(t)) return r('helper', 'translation / staff / server management');
  if (DE_CHAT_RE.test(t)) return r('chat', 'German chat / command / about nexus');
  if (DE_CODE_RE.test(t)) return r('code', 'German code request');
  if (DE_PRICE_RE.test(t)) return r('search', 'German price question');
  if (DE_MATH_RE.test(t)) return r('maths', 'German maths');
  if (CHAT_COMMAND_RE.test(t)) return r('chat', 'command to nexus');
  // "show me your feet / dih / stopki" — about Nexus himself, never code (2026-10-05: "show me your stopki" got a Python script).
  if (/^(?:(?:can|could|will)\s+(?:you|u)\s+)?(?:show|send|give)\s+(?:me\s+)?(?:your|ur|yo)\s+(?!code\b|script\b|source\b)\S/i.test(t)) return r('chat', 'about nexus himself');
  if (/^(?:wanna|want\s+to|let'?s|shall\s+we|u\s+wanna|you\s+wanna)\s+crack\s+(?:a|the|this)\s+(?:code|password|safe)\b/i.test(t) && !/```|\b(?:python|javascript|js|java|c\+\+|lua|hash|cipher\s+text)\b/i.test(t)) return r('chat', 'banter: crack a code');
  if ((/\bgoon\w*\b/i.test(t) || /\b(?:wanna|want\s+to|let'?s|u\s+wanna|you\s+wanna)\s+crack\b(?!\s+(?:a|an|the|this|my|some|open|on)\b)/i.test(t)) && !/\d|\bbody\s*count/i.test(t) && !detectTask(t)) return r('chat', 'goon talk');
  if (VECTOR_RE.test(t) && /\(\s*-?\d/.test(t)) return r('maths', 'vector / geometry');
  const task = detectTask(t);
  // A PC build request wins over a stray coding word ("give me every component" sent a $2,000 CAD build to the code
  // specialist, 2026-10-05) — unless the message really contains code.
  const pcBuild = PC_BUILD_REQUEST_RE.test(t) || (/\b(?:pc|computer|rig)\b/i.test(t) && /\b(?:build|budget|parts?|components?)\b/i.test(t));
  if (task === 'code' && !(pcBuild && !/```|[{};]|\b(?:python|javascript|typescript|java|c\+\+|lua|html|css|sql|discord\.js)\b/i.test(t))) return r('code', 'code request');
  if (pcBuild) return r('pc', 'pc build / parts');
  if (isPriceQuestion(t) || LIVE_RE.test(t)) return r('search', 'live info / price');
  if (task) return r('writing', `${task} request`);
  if (ADVICE_RE.test(t) || DE_QUESTION_RE.test(t)) return r('question', 'advice / tips / German question');
  if (ABOUT_RE.test(t) && !/\b(?:you|u|ur|your|yourself|nexus|casseurt)\b/i.test(t)) return r('question', 'who / about / describe');
  if (isWordProblem(t) || (isBodyCountQuestion(t) && /\d|\b(?:one|two|three|four|five|six|seven|eight|nine|ten)\b/i.test(t)) || ARITHMETIC_RE.test(t)) return r('maths', 'maths');
  if (SELF_Q_RE.test(t) && t.split(/\s+/).length <= 9 && !/\b(?:how\s+(?:do|does|can|to)\s+(?:you|u|i|we|one)\s+(?!feel|think|like|know|mean)\w+|explain|tell\s+me\s+(?:about|how|why))\b/i.test(t)) return r('chat', 'question about nexus');
  if (PC_BUILD_REQUEST_RE.test(t) || (PC_PART_RE.test(t) && PC_ASK_RE.test(t)) || /\bbudget\b[^.?!]{0,30}\b(?:\d|k\b)/i.test(t) && /\b(?:pc|build|rig|computer)\b/i.test(t)) return r('pc', 'pc build / parts');
  return null;
}

// Labelled examples for the meaning vote (written for this, separate from scripts/eval/cases.ts).
const EXAMPLES: Record<SpecialistId, string[]> = {
  chat: [
    'count to ten', 'say something funny', 'say my name', 'double it', 'where are you from', 'do you remember what i said', 'something big is happening tomorrow', 'you are getting deleted', 'im gonna replace you', 'this is your last message', 'i got that aura', 'im coding something rn', 'doing homework wbu', 'im tired lol', 'just chilling', 'im scrolling tiktok', 'i fell for you', 'would you rather be rich or famous', 'if you had to eat a shoe or a sock which one', 'bro you are so mid', 'every time you speak i lose brain cells', 'ur so useless', "you can't even think", 'whats your opinion on drake', 'who is the best footballer', 'best fast food', 'name my cat', 'i have a goldfish', 'what should i do today', 'are you my friend', 'do you know me', 'how old is casseurt', 'who is casseurt',
    'wsg', 'hiii', 'gm everyone', 'wyd rn', 'how u doing', 'im bored asf', 'im eating mcdonalds lol', 'i just woke up',
    'whats ur favourite colour', 'do you like football', 'are you single', 'how tall are you', 'where do you live',
    'what are you up to tonight', 'u awake?', 'lmaooo', 'bro what 😭', 'W', 'thats crazy', 'nah ur wild for that',
    'you are so annoying', 'ur trash bro', 'stfu', 'i hate you', 'you smell', 'ur mum', 'shut it bot', 'you are dumb',
    'ur actually funny', 'love you bro', 'ur cute', 'marry me', 'be my boyfriend', 'you are my favourite',
    'sing a song', 'say hi to my friend', 'go away', 'come back', 'apologise', 'repeat after me hello', 'bark',
    'messi or ronaldo', 'is pineapple on pizza good', 'barca will win the league', 'real madrid is better', 'who is better drake or kendrick',
    'i got a new phone', 'i passed my exam', 'my friend is weird', 'we are playing minecraft', 'gonna play ranked later',
    'ok', 'fr', 'hmm', 'what', 'huh', 'yes', 'nah', 'lol ok', 'good', 'same', 'idk', 'sure', 'maybe', 'k',
    'can i ask you something', 'guess what', 'tell me something funny', 'roast me', 'rate my name', 'are you mad at me',
    'nexus u there', 'did you miss me', 'what do you think of me', 'do you have friends', 'do you sleep', 'what is your favourite food',
  ],
  question: [
    'what does rizz mean', 'what does goat mean', 'meaning of slay', 'tell me about lionel messi', 'who is lebron james', 'who won the world cup in 2022', 'who won the champions league in 2023', 'who won the ballon dor in 2021', 'how does a jet engine work', 'how do you land a plane', 'which pedal is the brake', 'what is a good formation in fifa', 'how do i get better at chess', 'tips to get girls', 'how to be more confident', 'is it bad to sneeze with eyes open', 'what time zone is london in',
    'what is the capital of australia', 'how does gravity work', 'why is the sky blue', 'what is a black hole', 'who invented the telephone',
    'how many bones are in the human body', 'what causes earthquakes', 'explain how the internet works', 'what is inflation', 'how do planes fly',
    'who was napoleon', 'what does sus mean', 'what is the meaning of ngl', 'how do i get better at fortnite', 'tips for sleeping better',
    'how do i study for exams', 'how do you make pancakes', 'how long does it take to boil an egg', 'is coffee bad for you', 'what is dna',
    'who is cristiano ronaldo', 'when did ww2 end', 'how does a computer work', 'how do i tie a tie', 'what language do they speak in brazil',
    'how do solar panels work', 'what is the biggest animal', 'how far is the moon', 'what is bitcoin', 'how do magnets work',
    'can dogs eat chocolate', 'should i drink water before bed', 'how do i talk to my crush', 'what is the offside rule',
    'how do you change a tyre', 'how does a nuclear reactor work', 'difference between a virus and bacteria', 'what is machine learning',
  ],
  search: [
    'whats the price of bitcoin rn', 'how much is an iphone 17', 'price of a nintendo switch 2', 'how much does a 9800x3d cost',
    'weather in toronto today', 'what is the weather tomorrow in quebec', 'eur to cad', 'what did barca score last night',
    'when does the next f1 race start', 'latest news about gta 6', 'is it true that drake retired', 'who won the game yesterday',
    'search for the best deals on monitors', 'look up the release date of gta 6', 'how much is ram right now', 'current price of gold',
    'what time is the barca match', 'when is the next real madrid game', 'is fortnite down rn', 'news on the ballon dor',
  ],
  code: [
    'make me a script', 'write a macro for my game',
    'write me a python script', 'make a discord bot', 'code a calculator in javascript', 'how do i print hello world in c++',
    'fix my code', 'why does my code not work', 'write a function that sorts a list', 'html code for a button', 'css to center a div',
    'give me a lua script for roblox', 'how do i make a for loop in python', 'show me an example in java', 'write sql to get all users',
    'regex for an email address', 'make me a website', 'code snake in python', 'my javascript throws undefined is not a function',
    'example of typescript', 'exemple de code python', 'how to read a file in node', 'write a bash script to rename files',
  ],
  writing: [
    'summarise this article', 'tldr of this', 'write an email to my boss', 'write a message to my teacher', 'help me write an apology',
    'translate this to spanish', 'how do you say hello in japanese', 'write a poem about the sea', 'write a short story about a dragon',
    'write a rap about pizza', 'give me 5 names for my dog', 'write my bio', 'rewrite this to sound better', 'proofread my essay',
    'write a speech for my friends wedding', 'make a caption for my insta post', 'write a paragraph about climate change',
    'write a roast of my friend', 'write a love letter', 'give me pickup lines', 'write a funny tweet',
  ],
  maths: [
    'what is 12 times 8', '45 divided by 9', 'whats 2+2', 'calculate 15% of 80', 'solve 2x + 3 = 11', 'square root of 144',
    'if i have 5 apples and eat 2 how many are left', 'a car goes 60 km/h for 3 hours how far', 'what is 3 to the power of 4',
    'how many minutes in a week', 'if a shirt costs 20 and is 25% off what is the price', 'whats the area of a circle with radius 3',
    'convert 5 miles to km', 'what is 1000 minus 357', 'riddle: what has keys but cant open locks', 'probability of rolling a 6 twice',
  ],
  pc: [
    'build me a gaming pc', 'what gpu should i buy', 'is a 4070 good for 1440p', 'best cpu for gaming', 'how much ram do i need',
    'will this ram work with my motherboard', 'what psu do i need for a 5090', 'my pc is slow what should i upgrade', 'ddr4 vs ddr5',
    'is 16gb ram enough', 'recommend me a gaming monitor', 'amd or intel', 'what case fits a big gpu', 'how do i build a pc',
    'should i get a prebuilt', 'best pc for fortnite', 'is my cpu bottlenecking my gpu', 'what ssd should i get', 'liquid cooling or air',
    'i have 1500 dollars for a pc', 'is the 9070 xt better than the 5070', 'nvme vs sata',
  ],
  helper: [
    'translate this for him', 'how do i say this in spanish to a member', 'tell her in german that the event starts at 8', 'what did he just say',
    'i want to apply for staff', 'can i be a mod', 'interview me for staff', 'how do i become a moderator here', 'who is the highest staff',
    'who can ban people here', 'what role do i need to manage channels', 'how do i timeout someone', 'someone is spamming what do i do',
    'there is a raid what should we do', 'write an announcement for the server', 'make server rules', 'write a welcome message',
    'summarize what happened in chat', 'summarise the argument above', 'how do i set up automod', 'how do i give someone a role',
    'should i ban him or just warn him', 'write a warning for a member', 'plan a server event', 'who should i ask about this',
    'übersetze das für ihn', 'traduis ça pour lui', 'what are the staff roles here', 'how do permissions work for my role',
  ],
  support: [
    'she is mad at me and idk what to do', 'my friends left me out', 'i feel like a failure',
    'i feel so alone', 'nobody likes me', 'my girlfriend broke up with me', 'i failed my exam and i feel terrible', 'my parents are fighting',
    'i cant sleep im so anxious', 'i miss my grandma', 'im having a really bad week', 'i feel like giving up', 'everyone ignores me',
    'my best friend stopped talking to me', 'im so tired of everything', 'i got bullied today', 'my cat is sick', 'i hate my life rn',
  ],
};

let exampleVectors: Array<{ mode: SpecialistId; v: number[] }> | null = null;
let loading: Promise<void> | null = null;

function norm(v: number[]): number[] {
  const n = Math.sqrt(v.reduce((a, x) => a + x * x, 0)) || 1;
  return v.map((x) => x / n);
}
const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0);

// Same "search_query:" embedding the knowledge search makes for the message, so one message costs ONE embedding
// (vectorSearch.ts caches it by text).
async function embedOne(text: string): Promise<number[] | null> {
  const v = await embedQueryCached(text);
  return Array.isArray(v) && v.length ? norm(v) : null;
}

// Example vectors are saved to disk, so an engine restart doesn't re-embed ~230 examples.
const CACHE_FILE = join(process.env.NEXUS_ROUTER_DIR || join(homedir(), '.nexus-router'), 'examples.json');

async function loadExamples(): Promise<void> {
  if (exampleVectors) return;
  loading ||= (async () => {
    let disk: Record<string, number[]> = {};
    try {
      if (existsSync(CACHE_FILE)) disk = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
    } catch {
      disk = {};
    }
    const out: Array<{ mode: SpecialistId; v: number[] }> = [];
    let added = 0;
    for (const [mode, list] of Object.entries(EXAMPLES) as Array<[SpecialistId, string[]]>) {
      for (const ex of list) {
        let v: number[] | null = disk[ex] || null;
        if (!v) {
          v = await embedOne(ex);
          if (v) {
            disk[ex] = v;
            added++;
          }
        }
        if (v) out.push({ mode, v });
      }
    }
    if (added) {
      try {
        mkdirSync(join(CACHE_FILE, '..'), { recursive: true });
        writeFileSync(CACHE_FILE, JSON.stringify(disk));
      } catch {
        /* cache is only a speed-up */
      }
    }
    exampleVectors = out.length ? out : null;
    console.log(`[router] ${out.length} labelled examples ready (${added} newly embedded)`);
  })().finally(() => {
    loading = null;
  });
  await loading;
}

// Warm the example vectors at startup (in the background) so the first real message doesn't pay for it.
export function warmRouter(): void {
  setTimeout(() => void loadExamples().catch(() => {}), 20_000).unref?.();
}

async function byMeaning(text: string): Promise<{ route: Route; margin: number } | null> {
  await loadExamples();
  if (!exampleVectors) return null;
  const q = await embedOne(text);
  if (!q) return null;
  const scored = exampleVectors.map((e) => ({ mode: e.mode, s: dot(q, e.v) })).sort((a, b) => b.s - a.s).slice(0, 7);
  const votes = new Map<SpecialistId, number>();
  for (const [i, e] of scored.entries()) votes.set(e.mode, (votes.get(e.mode) || 0) + e.s * (i < 3 ? 1.5 : 1));
  const ranked = [...votes].sort((a, b) => b[1] - a[1]);
  const total = ranked.reduce((a, [, s]) => a + s, 0) || 1;
  const [best, second] = ranked;
  const margin = (best[1] - (second?.[1] || 0)) / total;
  return { route: { mode: best[0], by: 'meaning', reason: `closest examples: ${scored.slice(0, 3).map((e) => e.mode).join(', ')} (top ${scored[0].s.toFixed(2)})`, confidence: Math.min(1, margin * 2) }, margin };
}

const MODEL_ROUTER_SYSTEM = `Classify a Discord message sent to a chatbot named Nexus. Answer with ONE word only, from this list:
chat = banter, greetings, reactions, insults, compliments, flirting, commands to Nexus, opinions/hot takes, questions about Nexus himself
question = wants facts, an explanation or advice about the world
search = needs live/current info from the web (prices now, news, weather, scores, exchange rates, "is it true that")
code = wants code written or fixed
writing = wants a summary, a draft (email/message), a translation, or a creative piece (poem, story, roast, list of names)
maths = a calculation, a word problem or a puzzle
pc = PC building, PC parts, upgrades, which part to buy
support = the person is sad, stressed, grieving or struggling`;

async function byModel(text: string): Promise<Route | null> {
  const res: any = await localLlmClient.generate(`Message: "${text.slice(0, 400)}"\nOne word:`, {
    system: MODEL_ROUTER_SYSTEM,
    temperature: 0,
    maxTokens: 6,
    think: false,
    model: localLlmClient.chatModel(),
  } as any);
  if (res?.status !== 'success') return null;
  const word = String(res.text || '').toLowerCase().match(/\b(chat|question|search|code|writing|maths|math|pc|support)\b/)?.[1];
  if (!word) return null;
  return { mode: (word === 'math' ? 'maths' : word) as SpecialistId, by: 'model', reason: 'the model picked it (close vote)', confidence: 0.6 };
}

export async function routeMessage(raw: string): Promise<Route> {
  const text = strip(raw) || raw.trim();
  const rule = byRules(text);
  if (rule) return rule;
  // Very short messages ("ok", "W", "😭", "nexus b") are always chat.
  if (text.split(/\s+/).filter(Boolean).length <= 2 && !/\?$/.test(text) && text.length < 18) return { mode: 'chat', by: 'rule', reason: 'very short', confidence: 1 };
  const meaning = await byMeaning(text).catch(() => null);
  // The meaning vote may only pick CODE when there is a real coding word in the message: unknown words ("stopki")
  // made "show me your stopki" look like "show me an example in java".
  if (meaning && meaning.route.mode === 'code' && !CODE_CUE_RE.test(text)) return { mode: 'chat', by: 'meaning', reason: `${meaning.route.reason}; no coding word, so chat`, confidence: 0.5 };
  // Same for the helper: only with a server / staff / translation word ("get a damn job" is banter, not a staff question).
  if (meaning && meaning.route.mode === 'helper' && !/\b(?:server|staff|mods?|moderat\w*|admins?|owner|roles?|rank|permissions?|ban|kick|timeout|mute|warn|members?|channels?|rules|announce\w*|translat\w*|apply|application|raid|spam\w*|event|automod|discord)\b/i.test(text)) return { mode: 'chat', by: 'meaning', reason: `${meaning.route.reason}; no server word, so chat`, confidence: 0.5 };
  if (meaning) return meaning.route;
  // Embeddings unavailable: the model picks (a tiny one-word call), else chat.
  const model = await byModel(text).catch(() => null);
  return model || { mode: 'chat', by: 'fallback', reason: 'no signal', confidence: 0 };
}

export const __test = { byRules, strip, EXAMPLES };
