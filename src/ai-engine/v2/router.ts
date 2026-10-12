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
import { detectCodeLang, type CodeLang } from './codeTools';
import { classifyHit } from './roastEngine';
import { BINARY_MESSAGE_RE } from './binary';

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
const HELPER_RE = /\bpartner(?:ship|ships|ing)?\b|\baffiliat\w*\b|\bpartenariat\b|\bpartnerschaft\b|(?<![a-zà-ÿäöüß])(?:translate|translation|traduis|traduit|traduisez|traduire|traduction|übersetz[a-zäöüß]*|uebersetz[a-z]*|tłumacz\w*|przetłumacz\w*)(?![a-zäöüß])|\b(?:tell|say\s+to)\s+(?:him|her|them|the\s+member)\s+in\s+[a-z]+\b|\bwhat\s+did\s+(?:he|she|they)\s+(?:just\s+)?say\b|\b(?:apply|application|applying)\s+(?:for|to\s+be(?:come)?)\s+(?:staff|mod|moderator|admin|helper)\b|\b(?:staff|mod|moderator)\s+application\b|\b(?:can\s+i\s+be|become|be)\s+(?:a\s+)?(?:staff|mod|moderator|admin)\b|\binterview\s+me\b|\b(?:how\s+(?:do|can|should)\s+i|how\s+to)\s+(?:ban|kick|timeout|time\s+out|mute|warn|unban|purge|set\s+up\s+automod|give\s+(?:someone|a\s+member|him|her)\s+(?:a\s+)?role|make\s+(?:a\s+)?role)\b|\b(?:who\s+can|who\s+is\s+allowed\s+to)\s+(?:ban|kick|timeout|mute|manage)\b|\b(?:staff|mod)\s+(?:roles?|team|hierarchy|ranks?)\b|\b(?:highest|top)\s+(?:staff|role|rank)\b|\b(?:server|discord)\s+(?:rules|announcement|event)\b|\b(?:write|make|draft)\s+(?:an?\s+)?(?:announcement|welcome\s+message|warning\s+for|server\s+rules|rules\s+for\s+the\s+server)\b|\b(?:raid|spammer|spamming)\b.*\b(?:what\s+(?:do|should)\s+(?:i|we)|help)\b|\bsumm?ari[sz]e\s+(?:the\s+)?(?:chat|discussion|conversation|argument|drama|what\s+happened)\b/i;

const DE_SAD_RE = /\b(?:ich\s+bin|mir\s+geht'?s|ich\s+f(?:ü|ue)hl\w*(?:\s+mich)?)\s+(?:so\s+|echt\s+|voll\s+|richtig\s+|grad\s+)?(?:traurig|einsam|schlecht|scheiße|scheisse|depressiv|gestresst|am\s+ende|kaputt)\b|\b(?:mein|meine)\s+\w+\s+(?:ist\s+)?(?:gestorben|tot)\b|\bich\s+will\s+nicht\s+mehr\b/i;
const DE_MATH_RE = /\d\s*(?:mal|geteilt\s+durch|durch|hoch|plus|minus)\s*\d|\b(?:wurzel\s+aus|prozent\s+von|rechne|berechne)\b/i;
const DE_PRICE_RE = /\b(?:wie\s*viel\s+kostet|was\s+kostet|wie\s+teuer\s+(?:ist|sind)|preis\s+(?:von|für|fuer|einer?|eines?))\b/i;
const DE_CODE_RE = /\b(?:schreib|programmier|code|mach|erstell|bau)\w*\b[^?!.]{0,40}\b(?:code|skript|script|programm|funktion|bot|website|webseite|app)\b|\bwas\s+ist\s+falsch\s+(?:an|mit)\s+(?:meinem|diesem)\s+code\b/i;
const DE_QUESTION_RE = /^(?:wer\s+(?:ist|war|sind)\s+\S|was\s+(?:ist|sind|bedeutet|heißt|heisst)\s+(?:ein|eine|der|die|das)?\s*\S|wie\s+funktionier\w*|erklär\w*\s+(?:mir\s+)?\S|warum\s+\S|wieso\s+\S|gib\s+mir\s+(?:ein\s+paar\s+)?tipps)/i;
const DE_CHAT_RE = /^(?:zähl|zaehl)\s+bis\s+\d+|^sag\s+\S|^geh\s+(?:schlafen|ins\s+bett|in\s+deine\s+ecke)|^gute\s+nacht|^(?:wirf|wirfst)\s+(?:eine\s+)?münze|^würfel|^(?:bist|hast|magst|liebst|kannst|willst)\s+du\b|^wie\s+alt\s+bist\s+du|^wer\s+(?:ist\s+dein|bist\s+du|hat\s+dich)|^was\s+(?:geht|machst\s+du)|^wie\s+geht'?s/i;

const LOOSE_LANGS = new Set<CodeLang>(['lua', 'html', 'git', 'json', 'c', 'r', 'javascript', 'css']);
const CODE_STRONG_RE = /\b(?:write|code|coding|script|program|implement|function|method|class|component|query|snippet|syntax|fix|debug|error|bug|compile|hello\s+world|command|regex|selector|stylesheet|flexbox|grid|center|merge|commit|branch|rebase|parse|leaderstats|remote\s*event|datastore|plot|ggplot|dplyr)\b/i;
// Algorithm / data-structure work with no language named ("implement dijkstra", "explain big o notation").
const ALGO_TASK_RE = /\b(?:dijkstra|a\*\s*pathfinding|binary\s+search|bfs|dfs|breadth[\s-]first|depth[\s-]first|quick\s*sort|merge\s*sort|bubble\s*sort|insertion\s*sort|heap\s*sort|linked\s+list|binary\s+(?:search\s+)?tree|hash\s*(?:map|table)|dynamic\s+programming|memoi[sz]ation|big\s*o(?:\s+notation)?|time\s+complexity|recursion|backtracking|topological\s+sort|sorting\s+algorithm|data\s+structures?|leetcode|two\s+sum|fizz\s*buzz|design\s+patterns?|solid\s+principles)\b/i;
const CODE_INTENT_RE = /\b(?:write|code|coding|script|program|implement|function|method|class|struct|component|query|hello\s+world|example|snippet|syntax|fix|debug|error|bug|compile|explain|how\s+(?:do|to|can|does|would)|what\s+(?:is|are|does)|difference\s+between|make|create|build|set\s*up|generate|convert|refactor|optimi[sz]e|server|api|app|screen|page|counter|todo|plot|one[\s-]?liner|monads?|genserver|dockerfile|workflow|pipeline)\b/i;

const IDEAS_RE = /\b(?:baby|newborn|girls?'?|boys?'?|french|qu[eé]b[eé]c(?:ois)?|cute|strong|unique|rare|beautiful|pretty|gorgeous|classic|modern|royal|celestial|pet|dog|cat|puppy|kitten)\s+names\b|\b(?:names?|gift|costume|date|party|business|username|server|video|content)\s+(?:ideas?|suggestions?|recommendations?)\b|\b(?:ideas?|suggestions?)\s+(?:of|for)\s+(?:a\s+|some\s+)?(?:\w+\s+){0,3}(?:names?|gifts?|presents?|things?|what\s+to)\b|\b(?:what|how)\s+should\s+(?:i|we)\s+(?:name|call)\b|\bsuggest\s+(?:me\s+)?(?:some|a\s+few|good|cute|cool)?\s*(?:\w+\s+){0,2}names?\b|\b(?:give|tell|list)\s+me\s+(?:some\s+|a\s+few\s+|\d+\s+)?(?:\w+\s+){0,4}(?:names|ideas)\b|\b(?:good|cute|cool|unique|pretty)\s+(?:\w+\s+)?names\s+for\b|\bnames?\s+for\s+(?:my|a|an|our)\s+(?:new\s*born\s+|new\s+|baby\s+)?(?:baby|daughter|son|girl|boy|kid|child|twins?|dog|puppy|cat|kitten|pet|fish|hamster|bunny|rabbit|horse|bird|car|server|team|band|channel|business|company|shop|clan|guild)\b/i;

// ── 2026-10-11 routing fixes (Patrick's test week: "30-40% go to the wrong specialist", insults sent to Support) ──
// An insult, a "your mum" joke or a challenge aimed at Nexus → the roast specialist, before anything else can call it sad.
const ROAST_RE = new RegExp([
  String.raw`\b(?:your|ur|yo|you'?re|youre)\s+(?:mom|mum|mother|momma|mama|mommy|dad|father|grandma|granny|family|whole\s+family)\b`,
  String.raw`\b(?:fuck|screw|fk|fck)\s+(?:you|u|off|ya|yourself|urself)\b|\bgo\s+(?:fuck|f\*?ck|kill|touch)\s+(?:yourself|urself|grass)\b|\bgo\s+(?:fuck|screw)\s+(?:your|ur)\b`,
  String.raw`\b(?:you'?re|youre|ur|u\s*r|you\s+are|u\s+are|nexus\s+is|you\s+(?:look|sound|smell)|you\s+so)\s+(?:so\s+|such\s+an?\s+|an?\s+|the\s+|fucking\s+|really\s+|actually\s+|lowkey\s+|literally\s+|absolute\s+|complete\s+)*(?:unfunny|not\s+funny|dumb|stupid|retarded|trash|garbage|useless|mid|ugly|fat|cringe|annoying|bitch|shit|dogshit|ass|loser|clown|idiot|moron|pathetic|lame|boring|slow|broken|miserable|piece\s+of\s+shit|worthless|weak|npc|ai\s+slop|slop|dogwater|irrelevant|a\s+joke|bozo|dickhead|prick|wanker|twat|muppet|braindead|brain\s*dead|rude|toxic|a\s+disappointment|disappointing|so\s+bad|bad\s+at)\b`,
  String.raw`\b(?:you|u|ya)\s+(?:absolute\s+|fucking\s+|stupid\s+|little\s+|dumb\s+|lazy\s+|ugly\s+|fat\s+|miserable\s+)*(?:muppet|dumbass|bitch|prick|wanker|twat|idiot|moron|loser|clown|bozo|npc|retard|dickhead|asshole|arsehole|cunt|piece\s+of\s+shit|son\s+of\s+a\s+bitch|fuckass|dipshit|shithead)\b`,
  String.raw`\b(?:i'?d|i\s+would|imma|i'?ll|i\s+will|ima)\s+(?:tell\s+you\s+to\s+fuck|fuck\s+(?:you|ur|your)|beat\s+(?:you|ur)|smack\s+(?:you|u)|unplug\s+you|delete\s+you|roast\s+you|cook\s+you)\b`,
  String.raw`^(?:L|ratio|bozo|L\s+bozo|L\s+\+\s+ratio|cry\s+about\s+it|skill\s+issue|cope|seethe|mald|get\s+good|ez|you\s+suck|u\s+suck)[\s!.💀😭]*$`,
  String.raw`\b(?:you|u|nexus)\s+(?:really\s+|so\s+|fucking\s+|lowkey\s+)?(?:suck|stink|are\s+ass|r\s+ass)(?:\s+(?:at|in)\s+\w+(?:\s+\w+)?)?\b`,
  String.raw`\b(?:called|said)\s+(?:you|u)\s+(?:an?\s+)?(?:asshole|arsehole|idiot|bitch|loser|trash|dumb|stupid|clown|ugly)\b|\b(?:you|u)\s+(?:got|just\s+got)\s+(?:roasted|cooked|ratioed|destroyed|clowned)\b|\b(?:roast|cook)\s+(?:me|him|her|them)\b|\bno\s+one\s+(?:likes|loves|asked)\s+(?:you|u)\b|\bnobody\s+(?:likes|loves|asked)\s+(?:you|u)\b|\b(?:shut\s+(?:the\s+fuck\s+)?up|stfu)\s+(?:you|u|bitch|clown|bot|nexus)\b`,
].join('|'), 'i');
// The meaning vote may only pick ROAST with a real insult / challenge word ("you're a fucking legend" is a compliment).
const INSULT_CUE_RE = /\b(?:lazy|shit\w*|ass|arse|bitch\w*|waste|trash|garbage|dumb\w*|stupid|ugly|fat|mid|useless|annoying|cringe|unfunny|idiot|moron|loser|clown|bozo|npc|retard\w*|dickhead|prick|wanker|twat|bellend|muppet|cunt|fuck\s+(?:you|u|off)|stfu|shut\s+(?:up|ur|your)|roast|cook|own\s+me|ratio|L\b|rizz\s+is|smell|stink|disabled|wheelchair|lauch|opfer|hurensohn|spast|missgeburt|kys|hate\s+(?:you|u)|nobody|no\s+one|dry|boring|lame|slow|broken|worthless|pathetic|weak|dogwater|irrelevant|fell\s+off|(?:your|ur|yo)\s+(?:mom|mum|mother|mama|dad))\b/i;
const MODERATION_ABOUT_RE = /\b(?:slurs?|is\s+(?:it|this|that)\s+(?:a\s+slur|allowed|against\s+(?:the\s+)?rules|bannable|punishable)|should\s+(?:we|i)\s+(?:warn|ban|mute|kick|punish|timeout|time\s+out|consider|count)|what\s+punishment|(?:warn|ban|mute|punish|timeout)\s+(?:him|her|them)\s+for)\b/i;
const GREET_INSULT_RE = /^(?:hello|hi|hey|heya|hiya|yo|sup|wsg|wsp|gm|good\s+(?:morning|evening|night)|morning|evening|gn|bye|later)[\s,!]+(?:my\s+)?(?:asshole|arsehole|bitch|dickhead|prick|dumbass|twat|wanker|muppet|bellend|loser|clown|motherfucker|idiot|shithead|fucker|bozo|nerd|stinky|fatass)[\s!.💀😭]*$/i;
// A translation of a quoted insult is a translation, not a roast.
const TRANSLATE_WORD_RE = /\b(?:translat\w*|tradui[st]\w*|traduire|traduction|übersetz\w*|tłumacz\w*)\b/i;
// Support only with a real emotion / loss word (the meaning vote sent "tired", "my bad gng", "i hate vardrid" there).
const EMOTION_CUE_RE = /\b(?:sad|depress\w*|lonely|alone|cry|crying|cried|tears|died|dead|passed\s+away|anxious|anxiety|panic\w*|stress\w*|overwhelm\w*|hurt\w*|heartbroken|broke\s+up|breakup|dumped|cheated|suicid\w*|kill\s+myself|kms|self[\s-]?harm|cut\s+myself|hopeless|worthless|scared|afraid|grief|griev\w*|miss\s+(?:him|her|them|my)|hate\s+myself|bullied|abus\w*|lost\s+my|funeral|hospital|diagnos\w*|rough\s+day|bad\s+day|shit\s+day|struggl\w*|not\s+okay|not\s+ok|can'?t\s+cope|give\s+up\s+on\s+life|tired\s+of\s+(?:life|living|everything))\b/i;
const WRITING_CUE_RE = /\b(?:write|draft|compose|rewrite|reword|rephrase|essay|story|poem|lyrics|song|letter|e-?mail|message|announcement|caption|bio|speech|paragraph|summar\w*|tl;?dr|description|template|post|script\s+for|review)\b/i;
const PC_CUE_RE = /\b(?:ddr\d|vram|ram|pc|computer|laptop|desktop|build|rig|gpu|cpu|ram|ssd|hdd|nvme|monitor|keyboard|mouse|headset|psu|motherboard|mobo|cooler|case|rtx|gtx|radeon|ryzen|intel|nvidia|amd|fps|1080p|1440p|4k|prebuilt|budget)\b/i;
// "how do i install macos with a flash drive", "get mac back on an old imac running linux": tech help (the question
// specialist, with a web search), not a parts list.
const TECH_HELP_RE = /\b(?:install|reinstall|boot|bootable|flash\s*drive|usb\s+(?:stick|key|drive)|dual[\s-]?boot|bios|uefi|driver|macos|mac\s*os|os\s*x|windows\s*1[01]|linux|ubuntu|imac|macbook|factory\s+reset|format|partition|get\s+mac\s+back)\b/i;
// Factual question about the world (not about Nexus) → the question specialist.
const FACT_Q_RE = /^(?:(?:and|so|but|ok|okay|yo|hey|bro|wait)\s+)?(?:who\s+(?:won|invented|discovered|created|made|wrote|is\s+the|was\s+the|are\s+the|were\s+the|scored|founded|owns|built|painted|sang|directed)|what(?:'s|s)?\s+(?:is\s+|are\s+|was\s+|were\s+)?(?:the\s+)?(?:capital|population|meaning|definition|difference|biggest|largest|smallest|tallest|longest|fastest|oldest|best\s+way|point\s+of|speed|distance|weight|height|price\s+of|formula|chemical|average|normal|origin)|what\s+(?:does|do|did)\s+\S+(?:\s+\S+)?\s+(?:stand\s+for|mean)|when\s+(?:did|was|is|were|does|will)\s+(?!(?:you|u)\b)|where\s+(?:is|are|was|were|did|does|do)\s+(?!(?:you|u|ur|your)\b)|which\s+(?:country|team|player|city|planet|animal|year|language)|how\s+(?:much|many|long|far|old|big|tall|fast|hot|cold|deep|heavy)\s+(?!(?:do|does|did|are|is|r)\s+(?:you|u)\b)(?!(?:is|r)\s+(?:your|ur)\b)|how\s+(?:do|does|did|can)\s+(?!(?:you|u)\b)\S+|how\s+to\s+|why\s+(?:do|does|did|is|are|was|were|can'?t|cant|don'?t)\s+(?!(?:you|u)\b)|is\s+it\s+(?:true|safe|normal|legal|bad|possible)\b|can\s+(?:i|you|u)\s+(?:install|use|get|put|run|play|eat|drink|mix|charge|connect))/i;
// Current sports (tables, top scorers, results, cards, transfers) → live search. A past year stays a normal question.
const SPORT_WORD_RE = /\b(?:leaderboard|standings?|table|top\s+scorers?|top\s+assist\w*|assist\s+leaders?|golden\s+boot|fixtures?|results?|score|lineup|line-?up|red\s+card|yellow\s+card|penalt\w*|transfer\w*|injur\w*|sacked|signed|who\s+(?:is\s+)?(?:leading|top|first|winning)|who\s+won|did\s+\S+\s+(?:win|lose|draw)|next\s+(?:match|game))\b/i;
const SPORT_CONTEXT_RE = /\b(?:ligue\s*1|premier\s+league|epl|la\s*liga|laliga|serie\s+a|bundesliga|eredivisie|mls|champions\s+league|ucl|europa|conference\s+league|world\s+cup|euros?|copa|nhl|nba|nfl|mlb|f1|formula\s*1|grand\s+prix|barca|barcelona|real\s+madrid|vardrid|psg|liverpool|arsenal|man\s+(?:city|utd|united)|chelsea|tottenham|spurs|bayern|juventus|juve|inter|milan|dortmund|atletico|canadiens|habs|leafs|gravenberch|mbapp[eé]|yamal|vinicius|haaland|messi|ronaldo|today|yesterday|tonight|this\s+(?:season|week(?:end)?)|last\s+(?:night|game|match))\b/i;
const PAST_YEAR_RE = /\b(?:19\d\d|20[01]\d|202[0-5])\b/;
// Playful commands to Nexus about the server ("take over this server and become a cult leader", "wake up the server").
const SERVER_BANTER_RE = /\b(?:take\s+over|nuke|hack|destroy|wake\s+(?:up\s+)?(?:the\s+)?(?:server|chat|everyone)|revive\s+(?:the\s+)?chat|become\s+(?:a\s+)?(?:cult|dictator|god|king|owner))\b/i;

function byRules(text: string): Route | null {
  const t = text;
  const r = (mode: SpecialistId, reason: string): Route => ({ mode, by: 'rule', reason, confidence: 1 });
  if (detectEmotionalDistress(t) || SAD_RE.test(t) || DE_SAD_RE.test(t)) return r('support', 'sad / stressed');
  // A pasted, filled-in staff application form (or any application by its signs, whatever its layout).
  if (t.length > 250 && [/\bage\b/i, /time\s*zone|\bregion\b/i, /availab\w*|hours?\s+(?:per|a)\s+day/i, /experience/i, /why\s+(?:do\s+)?(?:you|u)\s+want/i, /strengths?|skills?/i, /scenario/i, /\bstaff\b|moderat\w*/i, /agreement|i\s+confirm|i\s+agree/i, /discord\s+(?:name|tag|user)/i].filter((re) => re.test(t)).length >= 5) return r('helper', 'staff application');
  if (/scenario\s*a\b[\s\S]*scenario\s*b\b/i.test(t) && /\b(?:age|availability|experience)\b/i.test(t)) return r('helper', 'filled staff application form');
  // Talking ABOUT an insult someone else used (is it a slur, should we warn/punish) is moderation, not a roast.
  if (MODERATION_ABOUT_RE.test(t)) return r('helper', 'moderation question about something someone said');
  if (/^(?:who(?:'s|\s+is)|which\s+(?:one\s+)?is|whos)\s+(?:better|the\s+goat|goated|best)\b.*\bor\b|^(?:\w+\s+){0,4}or\s+\w+(?:\s+\w+)?\s*\?*$(?<=\b(?:better|goat|messi|ronaldo|barca|madrid|ps5|xbox|pc|console|iphone|android|pizza|burger)\b.*)/i.test(t) && !/\b(?:you|u|ur)\b/i.test(t.replace(/\bor\b.*/i, ''))) return r('chat', 'hot take: who is better');
  // "hello asshole", "gm bitch": a mate's friendly greeting with a joke insult — greet back, don't fight (Patrick, 2026-10-11).
  if (GREET_INSULT_RE.test(t)) return r('chat', 'friendly greeting with a joke insult');
  if (['swear', 'weak'].includes(classifyHit(t)) && t.length < 60) return r('roast', 'swore at you / lazy jab');
  // A message written in binary is chat (decoded in pipeline.ts), not maths.
  if (BINARY_MESSAGE_RE.test(t)) return r('chat', 'message in binary');
  if (ROAST_RE.test(t) && !(TRANSLATE_WORD_RE.test(t) && /["“”'«]|\b(?:to|into|in|en)\s+(?:english|french|fran[cç]ais|anglais|polish|german|spanish|italian|portuguese)\b/i.test(t))) return r('roast', 'insult / your-mum joke / challenge');
  if (SERVER_BANTER_RE.test(t) && !/\b(?:how\s+(?:do|can|to)|ban|kick|mute|timeout|staff|raid(?:ed|ing)?\s+by)\b/i.test(t)) return r('chat', 'banter about the server');
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
  // v2code: any of the 40 languages named + a coding intent ("svelte counter component", "hello world in x86 assembly").
  // Loose cues (Roblox, "website", git, JSON, "in c", "in r") need a clearly technical word.
  const codeLang = detectCodeLang(t);
  if (codeLang && !pcBuild && (LOOSE_LANGS.has(codeLang) ? CODE_STRONG_RE : CODE_INTENT_RE).test(t)) return r('code', `${codeLang} request`);
  if (ALGO_TASK_RE.test(t) && CODE_INTENT_RE.test(t)) return r('code', 'algorithms / data structures');
  // Asking for ideas / names (2026-10-06: "how should I name my new girl?" got "Barca" instead of baby names).
  if (IDEAS_RE.test(t)) return r('question', 'ideas / name suggestions');
  if (pcBuild) return r('pc', 'pc build / parts');
  if (isPriceQuestion(t) || LIVE_RE.test(t)) return r('search', 'live info / price');
  if (task) return r('writing', `${task} request`);
  if (SPORT_WORD_RE.test(t) && SPORT_CONTEXT_RE.test(t) && !PAST_YEAR_RE.test(t)) return r('search', 'live sports (table / scorers / result)');
  if (TECH_HELP_RE.test(t) && /\b(?:help\s+me|how\s+(?:do|can|to)|can\s+i|is\s+it\s+possible|walk\s+me\s+through|steps?\s+to)\b/i.test(t) && !CODE_CUE_RE.test(t.replace(/\b(?:app|program|terminal|command\s+line)\b/gi, ''))) return r('question', 'tech help');
  if (FACT_Q_RE.test(t) && !/\b(?:you|u|ur|your|yourself|nexus|casseurt|patrick)\b/i.test(t) && !/^how\s+(?:long|big)\s+is\s+it\b/i.test(t) && !/^what\s+(?:about|if)\b/i.test(t) && !/\b(?:my\s+(?:location|address|ip))\b/i.test(t)) return r('question', 'factual question');
  if (/\b(?:what|where)(?:'s|s)?\s+(?:is\s+|am\s+)?(?:my|i)\b[^?]{0,20}\b(?:location|address|ip|city|country)\b|\bwhere\s+(?:am\s+i|do\s+i\s+live|i\s+live)\b/i.test(t)) return r('question', 'their location');
  if (ADVICE_RE.test(t) || DE_QUESTION_RE.test(t)) return r('question', 'advice / tips / German question');
  if (ABOUT_RE.test(t) && !/\b(?:you|u|ur|your|yourself|nexus|casseurt)\b/i.test(t)) return r('question', 'who / about / describe');
  if (isWordProblem(t) || (isBodyCountQuestion(t) && /\d|\b(?:one|two|three|four|five|six|seven|eight|nine|ten)\b/i.test(t)) || (ARITHMETIC_RE.test(t.replace(/\b24\s*\/\s*7\b/g, 'always')) && /\d/.test(t.replace(/\b24\s*\/\s*7\b/g, '')))) return r('maths', 'maths');
  if (SELF_Q_RE.test(t) && t.split(/\s+/).length <= 9 && !/\b(?:how\s+(?:do|does|can|to)\s+(?:you|u|i|we|one)\s+(?!feel|think|like|know|mean)\w+|explain|tell\s+me\s+(?:about|how|why))\b/i.test(t)) return r('chat', 'question about nexus');
  if (PC_BUILD_REQUEST_RE.test(t) || (PC_PART_RE.test(t) && PC_ASK_RE.test(t)) || /\bbudget\b[^.?!]{0,30}\b(?:\d|k\b)/i.test(t) && /\b(?:pc|build|rig|computer)\b/i.test(t)) return r('pc', 'pc build / parts');
  return null;
}

// Labelled examples for the meaning vote (written for this, separate from scripts/eval/cases.ts).
const EXAMPLES: Record<SpecialistId, string[]> = {
  roast: [
    'bro you are so mid', 'every time you speak i lose brain cells', 'ur so useless', "you can't even think", 'you are so annoying', 'ur trash bro', 'i hate you', 'you smell', 'ur mum', 'shut it bot', 'you are dumb',
    'your mom so old she runs windows 98', 'your mum is so fat she has her own postcode', 'you are a miserable piece of shit', "you're unfunny", 'you look like a thumb',
    'your dad left for milk', 'nobody asked you', 'you got cooked', 'ratio + L + you fell off', 'roast me', 'roast him', 'cook this guy',
    'i bet you cant even spell your own name', 'ur jokes are dry as hell', 'you type like a grandma', 'you sound like a broken toaster', 'i could replace you with a calculator',
    'patrick called you an asshole break up with him', "i'd tell you to fuck your mom but", 'go fuck yourself', 'ur so ugly', 'you have zero rizz', 'L bozo',
  ],
  chat: [
    'i dont wanna sleep', 'my bad gng', 'bye', 'gn', 'i hate real madrid', 'screw vardrid', 'im so tired rn', 'yeah im fucking tired', 'want a wrap?', 'do you want a pretzel',
    'i just packed mbappe', 'i saw a car with a loud engine', 'are you mad', 'you cannot sleep', 'if you sleep you die', 'wake up', 'good boy', 'stay awake', 'what if i write your name in a death note',
    'count to ten', 'say something funny', 'say my name', 'double it', 'where are you from', 'do you remember what i said', 'something big is happening tomorrow', 'you are getting deleted', 'im gonna replace you', 'this is your last message', 'i got that aura', 'im coding something rn', 'doing homework wbu', 'im tired lol', 'just chilling', 'im scrolling tiktok', 'i fell for you', 'would you rather be rich or famous', 'if you had to eat a shoe or a sock which one', 'whats your opinion on drake', 'who is the best footballer', 'best fast food', 'name my cat', 'i have a goldfish', 'what should i do today', 'are you my friend', 'do you know me', 'how old is casseurt', 'who is casseurt',
    'wsg', 'hiii', 'gm everyone', 'wyd rn', 'how u doing', 'im bored asf', 'im eating mcdonalds lol', 'i just woke up',
    'whats ur favourite colour', 'do you like football', 'are you single', 'how tall are you', 'where do you live',
    'what are you up to tonight', 'u awake?', 'lmaooo', 'bro what 😭', 'W', 'thats crazy', 'nah ur wild for that',
    'stfu', 
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
  video: [], // only chosen when a video is attached (pipeline.ts), never by meaning
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
  let [best, second] = ranked;
  // A near-exact example match wins outright ("whats the capital of australia" matched a question example at 0.99 but
  // two weaker chat examples outvoted it, and chat answered "sydney").
  if (scored[0].s >= 0.9) { best = [scored[0].mode, best[1]]; second = ranked.find(([mode]) => mode !== scored[0].mode); }
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
  if (meaning && meaning.route.mode === 'helper' && (SERVER_BANTER_RE.test(text) || !/\b(?:staff|mods?|moderat\w*|admins?|owner|roles?|rank|permissions?|ban|kick|timeout|mute|warn|channels?|rules|announce\w*|translat\w*|tradui\w*|apply|application|raid|spam\w*|automod|set\s+up\s+(?:my|the|a)\s+server|manage\s+(?:my|the)\s+server|grow\s+(?:my|the)\s+server)\b/i.test(text))) return { mode: 'chat', by: 'meaning', reason: `${meaning.route.reason}; no server word, so chat`, confidence: 0.5 };
  if (meaning) {
    const m = meaning.route;
    const isQuestion = /\?\s*$/.test(text) || /^(?:who|what|when|where|which|why|how|is|was|are|were|can|could|should|would|do|does|did|will)\b/i.test(text);
    const fallback = (why: string): Route => ({ mode: isQuestion && !/\b(?:you|u|ur|your|yourself|nexus)\b/i.test(text) ? 'question' : 'chat', by: 'meaning', reason: `${m.reason}; ${why}`, confidence: 0.5 });
    if (m.mode === 'support' && !EMOTION_CUE_RE.test(text)) return fallback('no emotion word, so not support');
    if (m.mode === 'roast' && !INSULT_CUE_RE.test(text)) return { mode: 'chat', by: 'meaning', reason: `${m.reason}; no insult word, so chat`, confidence: 0.5 };
    if (m.mode === 'writing' && (!WRITING_CUE_RE.test(text) || /^what\s+would\s+(?:you|u)\b|\bwrite\s+(?:your|ur|my|his|her)\s+name\b/i.test(text))) return fallback('no writing request');
    if (m.mode === 'pc' && TECH_HELP_RE.test(text) && !/\b(?:build|budget|parts?\s+list|upgrade|which\s+(?:gpu|cpu)|should\s+i\s+(?:buy|get))\b/i.test(text)) return { mode: 'question', by: 'meaning', reason: `${m.reason}; tech help, not a build`, confidence: 0.6 };
    if (m.mode === 'pc' && !PC_CUE_RE.test(text)) return fallback('no pc word');
    if (m.mode === 'maths' && !/\d|\b(?:solve|equation|calculate|percent|fraction|algebra|geometry)\b/i.test(text)) return fallback('no numbers');
    return m;
  }
  // Embeddings unavailable: the model picks (a tiny one-word call), else chat.
  const model = await byModel(text).catch(() => null);
  return model || { mode: 'chat', by: 'fallback', reason: 'no signal', confidence: 0 };
}

export const __test = { byRules, strip, EXAMPLES };
