import { KnowledgeItem } from '../../types';

// Batch 2026-09-29 — gaps found by replaying every real production question from the engine log
// (~260 unique prompts) through retrieval: "is Jeffrey Epstein is life" retrieved a DNA-
// fingerprinting doc, "can you code me a JavaScript exemple" retrieved Compiler vs Interpreter
// (the existing JavaScript doc is conceptual, with no runnable example), and El Clásico — the
// fixture this Barça-supporting bot is asked about most — had no doc of its own.
export const REAL_TRAFFIC_GAPS_2026: KnowledgeItem[] = [
  {
    id: 'kb-gap-el-clasico',
    title: 'El Clásico: FC Barcelona vs Real Madrid',
    category: 'Football',
    keywords: ['el clasico', 'el clásico', 'clasico', 'barca vs real madrid', 'barcelona vs real madrid', 'barca real madrid rivalry', 'who has won more clasicos', 'clasico history'],
    content: `El Clásico is the match between FC Barcelona and Real Madrid, the biggest rivalry in Spanish football and one of the most watched club games in the world. It's more than sport: Barcelona became a symbol of Catalan identity (the club motto is "Més que un club," more than a club), while Real Madrid was seen as the club of the Spanish capital and, in the Franco era, of the central state — a framing both sides dispute. Famous moments include Barça's 5-0 (1994) and 6-2 at the Bernabéu (2009), the 5-0 under Guardiola (2010), Messi's many decisive goals (he's the fixture's all-time top scorer), Real's 4-0 win at the Camp Nou in the 2023 Copa del Rey semi-final (a Karim Benzema hat-trick), and Barça winning all four Clásicos of the 2024-25 season under Hansi Flick — including a 4-0 at the Bernabéu and the Copa del Rey final. The head-to-head record in official matches is very close and has flipped between the two over the decades, so fans on both sides claim the edge. Luís Figo's 2000 move from Barça to Madrid, and the pig's head thrown at him on his return, is the rivalry's most infamous transfer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jeffrey-epstein',
    title: 'Jeffrey Epstein: Who He Was and How He Died',
    category: 'History',
    keywords: ['jeffrey epstein', 'epstein', 'is epstein alive', 'epstein death', 'epstein didnt kill himself', 'epstein island', 'ghislaine maxwell', 'epstein files', 'epstein list'],
    content: `Jeffrey Epstein was an American financier and convicted sex offender who sexually abused dozens of underage girls. In 2008 he received a widely criticised plea deal in Florida and served about 13 months, largely on work release. He was arrested again in July 2019 on federal sex-trafficking charges, and on August 10, 2019 he was found dead in his cell at the Metropolitan Correctional Center in New York — so no, he is not alive. The New York City medical examiner ruled his death a suicide by hanging; the guards who should have been checking on him falsified records, and the camera failures and missed checks fuelled widespread conspiracy theories and the "Epstein didn't kill himself" meme, because of his connections to many powerful and famous people. His associate Ghislaine Maxwell was convicted in 2021 of helping him traffic minors and sentenced to 20 years in prison. In 2025 the US Justice Department said it found no "client list," which sparked political backlash, and later that year Congress passed a law requiring release of the government's Epstein files; what those releases contain is a live, evolving news story.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-javascript-examples',
    title: 'JavaScript Example: Variables, Functions, Arrays and Loops',
    category: 'Programming',
    keywords: ['javascript example', 'code me javascript', 'javascript code example', 'js example', 'simple javascript program', 'javascript function example', 'javascript array example', 'javascript for loop', 'console.log'],
    content: `A basic JavaScript example covering the core building blocks. Variables: use const for values that don't change and let for ones that do — "const name = 'Nexus'; let score = 0;". Functions: "function greet(user) { return 'Yo ' + user + '!'; }" or the arrow form "const greet = (user) => \`Yo \${user}!\`;". Arrays and loops: "const scores = [10, 25, 7]; for (const s of scores) { score += s; }" adds them up, and array methods do the same more concisely — "const total = scores.reduce((sum, s) => sum + s, 0);", "const doubled = scores.map((s) => s * 2);", "const big = scores.filter((s) => s > 8);". Conditions: "if (total > 40) { console.log('W'); } else { console.log('L'); }". Objects group data: "const player = { name: 'Lamine', number: 10 }; console.log(player.name);". console.log() prints to the browser console (F12) or the terminal when running with Node.js ("node file.js"). JavaScript runs in every web browser and, with Node.js, on servers; it's the language of web pages and many Discord bots (discord.js).`,
    createdAt: Date.now(),
  },
];
