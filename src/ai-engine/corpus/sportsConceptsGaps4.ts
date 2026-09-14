import { KnowledgeItem } from '../../types';

// Batch 284 corpus fixes — general sports concepts. 9/25 misses. One topic-confusion
// hallucination ("friendly rivalry" answered as if it meant a "friendly match" fixture type,
// completely missing the actual rivalry-relationship question), one real factual error (boxing/
// kickboxing described as fought in "the octagon" — that's MMA's cage, not a boxing/kickboxing
// ring), and several answers that dodged half the comparison or dumped unrelated trivia.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'sports',
  keywords,
  content,
  createdAt: now,
});

export const SPORTS_CONCEPTS_GAPS_4: KnowledgeItem[] = [
  k(
    'kb-gap-sports-scrimmage-vs-exhibition',
    'Scrimmage vs exhibition game',
    ['scrimmage', 'exhibition game', 'difference scrimmage exhibition'],
    "A scrimmage is an informal practice session, often between two units of the SAME team (like the first-string offense vs the first-string defense in American football practice) or between two teams in a controlled, low-pressure setting — it's mainly used to test plays, evaluate players, and get game-like reps without any real stakes, and often doesn't follow every single official rule (clock stoppages, substitutions, etc. can be adjusted for practice purposes). An exhibition game (or preseason/friendly game) is a genuine game between two DIFFERENT teams, played under full official rules, but the result doesn't count toward any standings, playoffs, or championship — its main purposes are fan entertainment, revenue, and giving players/coaches real game reps before the season that actually counts begins. The key difference: a scrimmage is a practice tool that can bend the rules and often stays within one team's own roster; an exhibition game is a real full-rules game between two separate teams that simply doesn't count competitively.",
  ),
  k(
    'kb-gap-sports-draft-pick-vs-free-agent',
    'Draft pick vs free agent',
    ['draft pick', 'free agent', 'difference draft pick free agent'],
    "A draft pick is a player a team acquires through the league's draft — an annual event where teams take turns selecting new, usually young/college-level players who have never played professionally in that league before; a team's draft position and which players they can pick depend on the draft order (often reverse order of the previous season's standings). A free agent is an already-established professional player who is NOT currently under contract with any team — either because their previous contract expired or they were released — and is therefore free to sign with any team willing to offer them a deal, often through direct negotiation rather than a structured selection process. The key difference: a draft pick is typically a new player entering the league through a formal selection process, while a free agent is an experienced player negotiating their own next contract directly with any interested team.",
  ),
  k(
    'kb-gap-sports-friendly-rivalry-vs-heated-rivalry',
    'Friendly rivalry vs heated rivalry',
    ['friendly rivalry', 'heated rivalry', 'difference friendly rivalry heated rivalry'],
    "A friendly rivalry is a competitive relationship between two teams, players, or fanbases where the competitive spirit stays respectful and good-natured — there's real desire to win and genuine competitive history, but insults, hostility, and bad blood stay minimal, and fans/players of both sides can often still respect or even like each other. A heated rivalry involves genuine animosity, hostility, and emotional intensity beyond normal competitiveness — often built up over years of controversial moments, high-stakes matches, or deep cultural/regional tension (like El Clásico between Barcelona and Real Madrid, or the Yankees-Red Sox rivalry), where fans can feel real resentment toward the other side, not just a desire to win. Note: this is a completely different question from 'friendly match vs competitive match' (which is about whether a single GAME counts for standings) — a rivalry describes the ongoing emotional relationship between two teams over time, regardless of whether any individual match between them happens to be a friendly or a competitive one.",
  ),
  k(
    'kb-gap-sports-track-field-vs-cross-country',
    'Track and field vs cross country',
    ['track and field', 'cross country', 'difference track and field cross country'],
    "Track and field takes place on a standardized oval track (for running events like sprints and distance races) plus adjacent areas for field events (jumping and throwing events like long jump, high jump, shot put, javelin) — conditions are controlled and consistent, times/distances are precisely measured, and it includes a wide variety of very different event types beyond just running. Cross country is specifically a distance-running sport held OUTDOORS over natural, often uneven terrain — grass, dirt trails, hills, sometimes mud or obstacles — with courses that vary from race to race in terrain and difficulty, unlike track's consistent, flat, measured oval. Cross country only involves running (no jumping/throwing events), and runners compete as part of a team where the combined placement of a team's top runners typically determines the team score, unlike most individual track events.",
  ),
  k(
    'kb-gap-sports-gymnastics-vs-acrobatics',
    'Gymnastics vs acrobatics',
    ['gymnastics', 'acrobatics', 'difference gymnastics acrobatics'],
    "Gymnastics is a formal, judged competitive sport with strict rules, standardized apparatus (like the balance beam, vault, uneven bars, floor exercise), and a defined scoring system where judges evaluate technique, difficulty, and execution against an official code of points (like at the Olympics). Acrobatics is a broader term for the general physical skills involved — flips, tumbling, balancing, aerial movements — that can appear in many different contexts beyond formal gymnastics competition, including circus performance, cheerleading, parkour, dance, and stunt work, usually without a formal judged scoring system or standardized apparatus/rules. In short: gymnastics is a specific, rule-bound competitive SPORT built around acrobatic skills; acrobatics is the broader category of physical skills themselves, which gymnastics (along with circus arts, cheer, and other disciplines) draws from.",
  ),
  k(
    'kb-gap-sports-boxing-vs-kickboxing-correction',
    'Boxing vs kickboxing (correcting the octagon error)',
    ['boxing', 'kickboxing', 'boxing ring', 'octagon', 'difference boxing kickboxing'],
    "Correcting a common mix-up: boxing and kickboxing are both fought in a standard roped, usually SQUARE ring (sometimes called 'the squared circle') — NOT an octagon. The eight-sided 'octagon' cage is specifically associated with MMA (Mixed Martial Arts, like the UFC), a completely different combat sport that also allows grappling and ground fighting. Boxing only allows punches thrown with the fists. Kickboxing adds kicks (and in some rule sets, knee strikes) on top of boxing's punches, often drawing techniques from Muay Thai or karate, but like boxing it stays a standing, striking-only sport — no grappling, takedowns, or ground fighting, which is what separates both of them from MMA.",
  ),
  k(
    'kb-gap-sports-synchronized-swimming-vs-diving',
    'Synchronized swimming vs diving',
    ['synchronized swimming', 'artistic swimming', 'diving', 'difference synchronized swimming diving'],
    "Synchronized swimming (now officially called artistic swimming) involves swimmers performing a choreographed, music-synchronized routine of movements, lifts, and formations while staying in the water for the routine's duration — judged on synchronization, artistry, and technical skill, similar in spirit to swimming-based dance. Diving involves competitors jumping or diving from a platform or springboard, performing acrobatic flips and twists in the air, and then entering the water — with the entire skill happening in the brief moment of the dive itself, judged on technique, height/rotation difficulty, and how cleanly they enter the water (minimal splash). The key difference: synchronized/artistic swimming is a sustained, music-choreographed routine performed IN the water; diving is a single brief aerial skill performed ABOVE the water before entering it, with no music or extended in-water routine involved.",
  ),
  k(
    'kb-gap-sports-darts-vs-archery',
    'Darts vs archery',
    ['darts', 'archery', 'difference darts archery'],
    "Darts is thrown by hand at a circular dartboard from a fixed short distance (typically 7 feet 9.25 inches in standard darts), scoring based on which numbered/colored segment of the board is hit, and it's commonly played casually in pubs as well as professionally. Archery involves shooting arrows from a bow at a much larger circular target from a significantly longer distance (ranging from about 18 meters indoors up to 70+ meters in Olympic outdoor archery), requiring more physical strength to draw the bow and more complex aiming across a longer range, and it's an official Olympic sport (unlike darts, which is not currently part of the Olympic program). The core difference: darts is a short-range hand-thrown game commonly played casually, while archery is a longer-range bow-and-arrow sport requiring more physical strength and precision, and holds official Olympic status.",
  ),
  k(
    'kb-gap-sports-bowling-vs-skittles',
    'Bowling vs skittles',
    ['bowling', 'skittles', 'difference bowling skittles'],
    "Bowling (ten-pin bowling) uses a large heavy ball with finger holes, rolled down a long polished wooden lane to knock down 10 bottle-shaped pins arranged in a triangle at the far end — it's the standard, most widely known version played in modern bowling alleys, especially in North America. Skittles is an older, traditional pub/lawn game (especially popular in the UK) that uses a smaller, often handheld ball or disc (sometimes thrown, sometimes rolled, depending on the regional variant) to knock down a smaller number of pins — commonly nine pins arranged differently than bowling's ten, and played on a shorter alley or even outdoors on grass in some traditional forms. In short: bowling is the larger-scale, ball-and-10-pins game played in dedicated alleys; skittles is an older, more informal, typically 9-pin traditional game with regional British variations, often played in pubs or on lawns.",
  ),
];
