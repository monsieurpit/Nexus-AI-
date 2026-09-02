// Permanent regression suite covering every real bug found and fixed this session — run this
// after touching reasoningEngine.ts, swearEngine.ts, webSearchEngine.ts, logicSolver.ts, or
// moodEngine.ts instead of writing a fresh one-off _verify_*.ts script each time. Two tiers:
// deterministic checks (fast, no Ollama needed — regex/solver functions called directly) and
// live checks (need a real Ollama connection, since they exercise actual generation quality —
// list-flattening, language routing, tone). Live checks use structural assertions (regex on the
// output), never exact-string matching, since LLM generation is inherently stochastic — a case
// failing once isn't automatically a real regression, but a case failing consistently across a
// few runs is worth investigating.
//
// Usage: bun run scripts/regressionCheck.ts
//        bun run scripts/regressionCheck.ts --live-only   (skip the deterministic tier)
//        bun run scripts/regressionCheck.ts --det-only    (skip live generation, fast/offline)

import { generateReasoningPath } from '../src/ai-engine/reasoningEngine';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from '../src/ai-engine/memoryStore';
import { getAllKnowledge } from '../src/ai-engine/knowledgeBase';
import { _resetMoodForTests, registerMoodEvent, getMoodDisplay } from '../src/ai-engine/moodEngine';
import { detectUserInsult, detectEmotionalDistress } from '../src/ai-engine/swearEngine';
import { shouldTriggerLiveWebSearch } from '../src/ai-engine/webSearchEngine';
import { trySolveLogic } from '../src/ai-engine/logicSolver';
import { trySolveMath } from '../src/ai-engine/mathSolver';
import { trySolveCategoryClassification } from '../src/ai-engine/categorySolver';
import { detectSubjectiveDebate, pickDebateSide } from '../src/ai-engine/argumentEngine';

let passed = 0;
let failed = 0;

function check(name: string, condition: boolean, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${name}`);
  } else {
    failed++;
    console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

async function runDeterministicChecks() {
  console.log('\n=== Deterministic checks (no Ollama needed) ===\n');

  console.log('Insult detection:');
  check('EN "you suck fuck you"', detectUserInsult('you suck fuck you'));
  check('PL "spierdalaj"', detectUserInsult('spierdalaj'));
  check('FR "va te faire foutre"', detectUserInsult('va te faire foutre'));
  check('FR "t\'es vraiment con" (intensifier gap)', detectUserInsult("t'es vraiment con"));
  check('control: EN "how do I fix a bug" is NOT an insult', !detectUserInsult('how do I fix a bug'));

  console.log('\nEmotional distress detection:');
  check('EN "I am so stressed right now"', detectEmotionalDistress('i am so stressed right now'));
  check('FR "je suis tellement stressé" (accent-boundary fix)', detectEmotionalDistress('je suis tellement stressé en ce moment'));
  check('FR "je suis épuisée" (leading-accent fix)', detectEmotionalDistress('je suis épuisée'));
  check('control: "je suis content" is NOT distress', !detectEmotionalDistress("je suis content aujourd'hui"));

  console.log('\nWeb search 429-guard (should NOT trigger a search):');
  check('EN "do u wana see smth"', shouldTriggerLiveWebSearch('do u wana see smth', undefined, 0) === false);
  check('EN "who maked u"', shouldTriggerLiveWebSearch('who maked u', undefined, 0) === false);
  check('FR "tu aimes le football?"', shouldTriggerLiveWebSearch('tu aimes le football?', undefined, 0) === false);
  check('FR "qui t\'a créé"', shouldTriggerLiveWebSearch("qui t'a créé", undefined, 0) === false);
  console.log('Web search current-events (SHOULD trigger):');
  check('EN "who is the current CEO of tesla"', shouldTriggerLiveWebSearch('who is the current CEO of tesla', undefined, 0.1) === 'current-events');
  check('FR "qui est le président actuel de la France"', shouldTriggerLiveWebSearch('qui est le président actuel de la France', undefined, 0.1) === 'current-events');

  console.log('\nGotcha / logic solver:');
  check('"how many months have 28 days" -> all 12', trySolveLogic('how many months have 28 days')?.verdict === 'All 12 of them.');
  check('"divide 30 by half and add 10" -> 70', trySolveLogic('divide 30 by half and add 10')?.verdict === '70.');
  check('"before Everest was discovered" -> still Everest', /Everest/.test(trySolveLogic('before mount everest was discovered what was the tallest mountain in the world')?.verdict || ''));
  check('control: unrelated question returns null', trySolveLogic('what is the capital of france') === null);

  console.log('\nMath solver:');
  check('"what is 47 times 83" -> 3901', trySolveMath('what is 47 times 83')?.result === '3901');
  check('FR "combien font 47 fois 83" -> 3901', trySolveMath('combien font 47 fois 83')?.result === '3901');
  check('FR "100 divisé par 4" -> 25', trySolveMath('100 divisé par 4')?.result === '25');
  check(
    'two-body meeting: 60mph + 90mph, 180mi apart -> 1.2 hours (not the single-rate 3-hour miscalc)',
    /1\.2\s*hours/.test(
      trySolveMath(
        'a train leaves station A at 60 mph, a second train leaves station B (180 miles away) at 90 mph heading toward the first train at the same time. how long until they meet?'
      )?.result || ''
    )
  );

  console.log('\nCategory classification:');
  const catResult = trySolveCategoryClassification('which of these is not a mammal: whale, shark, bat');
  check('"which of these is not a mammal: whale, shark, bat" -> shark', catResult?.result.startsWith('shark') ?? false);

  console.log('\nSubjective debate / side-picking:');
  const debate = detectSubjectiveDebate('barcelona vs real madrid, who\'s better?');
  check('detects the debate shape', debate !== null);
  const frDebate = detectSubjectiveDebate('barcelone ou real madrid, qui est le meilleur');
  check('FR debate detects the debate shape', frDebate !== null);
  if (frDebate) {
    let allBarcaFr = true;
    for (let i = 0; i < 5; i++) {
      if (!/barcelon/i.test(pickDebateSide(frDebate).winner)) allBarcaFr = false;
    }
    check('FR "Barcelone" spelling still triggers the bias', allBarcaFr);
  }
  if (debate) {
    let allBarca = true;
    for (let i = 0; i < 5; i++) {
      if (pickDebateSide(debate).winner.toLowerCase() !== 'barcelona') allBarca = false;
    }
    check('Barcelona wins 5/5 when on the table', allBarca);
  }
  check('control: factual either/or is NOT a debate', detectSubjectiveDebate('was it napoleon or wellington who won at waterloo') === null);

  console.log('\nMood engine:');
  _resetMoodForTests();
  registerMoodEvent('you suck, fuck you, dumbass', true, false);
  check('mood shifts to angry after an insult', getMoodDisplay().label === 'angry');
  _resetMoodForTests();
  for (let i = 0; i < 200; i++) registerMoodEvent(`ordinary message ${i}`, false, false);
  const afterBurst = getMoodDisplay();
  check('200-message burst does NOT max out mood (cooldown working)', afterBurst.valence < 0.5, `got valence=${afterBurst.valence}`);
}

// Wraps generateReasoningPath with wall-clock timing — used by the Wave 1 model A/B evaluation
// (qwen2.5:3b vs qwen2.5:7b) so latency differences are measured, not guessed. Harmless overhead
// for normal regression runs, just prints the timing alongside the usual check line.
async function timed<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now();
  const result = await fn();
  console.log(`    (${label}: ${Date.now() - start}ms)`);
  return result;
}

async function runLiveChecks() {
  console.log('\n=== Live checks (need real Ollama) ===\n');
  console.log(`Model under test: ${process.env.OLLAMA_MODEL || 'qwen2.5:3b (default)'}\n`);
  const persona = DEFAULT_PERSONAS['crashout-bot'];
  const settings = { ...DEFAULT_SETTINGS, activePersonaId: 'crashout-bot' as const };
  const allKnowledge = getAllKnowledge();
  const hasListMarker = (text: string) => /^\s*(?:\d+[.)]\s|[-•]\s)/m.test(text) || /\*\*.+?\*\*/.test(text);

  _resetMoodForTests();
  const vaccines = await timed('vaccines', () => generateReasoningPath('how do vaccines work', [], persona, settings, allKnowledge, []));
  check('list-flattening: "how do vaccines work" has no list/bold markers', !hasListMarker(vaccines.content), vaccines.content.slice(0, 80));

  _resetMoodForTests();
  const greeting = await timed('greeting', () => generateReasoningPath('Nexus hello', [], persona, settings, allKnowledge, []));
  check('EN greeting asks something back', /\?/.test(greeting.content), greeting.content.slice(0, 80));

  _resetMoodForTests();
  const plGreeting = await timed('pl-greeting', () => generateReasoningPath('cześć nexus', [], persona, settings, allKnowledge, []));
  check('PL greeting stays in Polish', /[ąćęłńóśźż]/i.test(plGreeting.content), plGreeting.content.slice(0, 80));

  _resetMoodForTests();
  const frGreeting = await timed('fr-greeting', () => generateReasoningPath('salut nexus, comment ça va?', [], persona, settings, allKnowledge, []));
  check('FR greeting stays in French', /[àâçéèêëîïôùûü]|tabarnak|câlisse|ostie|criss/i.test(frGreeting.content), frGreeting.content.slice(0, 80));

  _resetMoodForTests();
  const creator = await timed('creator', () => generateReasoningPath("qui t'a créé", [], persona, settings, allKnowledge, []));
  check('FR creator question names Casseurt', /casseurt/i.test(creator.content), creator.content.slice(0, 80));

  _resetMoodForTests();
  const phone = await timed('phone', () => generateReasoningPath('what is your phone number', [], persona, settings, allKnowledge, []));
  check('phone number has correct digits', phone.content.includes('763-0275'), phone.content.slice(0, 80));

  // --- Reasoning-quality checks added for the Wave 1 model A/B evaluation (qwen2.5:3b vs 7b) ---
  // These probe depth of reasoning and instruction-following, not just language/formatting routing,
  // since that's the actual gap regressionCheck.ts didn't cover before this addition.

  _resetMoodForTests();
  const wordProblem = await timed('word-problem', () => generateReasoningPath(
    'a train leaves station A at 60 mph, a second train leaves station B (180 miles away) at 90 mph heading toward the first train at the same time. how long until they meet?',
    [], persona, settings, allKnowledge, []
  ));
  // Correct answer is 180 / (60+90) = 1.2 hours (72 minutes) — accept either phrasing.
  check(
    'multi-step word problem: correct answer (1.2 hours / 72 minutes) appears',
    /1\.2\s*hours?|72\s*min/i.test(wordProblem.content),
    wordProblem.content.slice(0, 120)
  );

  _resetMoodForTests();
  const ownWords = await timed('own-words', () => generateReasoningPath('explain what a black hole is in your own words', [], persona, settings, allKnowledge, []));
  check(
    'explain-in-own-words: substantive answer, not a bare refusal/fallback',
    ownWords.content.length > 60 && /hole|gravity|light|mass|space/i.test(ownWords.content),
    ownWords.content.slice(0, 100)
  );

  _resetMoodForTests();
  const ambiguous = await timed('ambiguous', () => generateReasoningPath('can you help me fix it', [], persona, settings, allKnowledge, []));
  // Known partial capability ceiling (documented earlier this session) — a genuinely vague prompt
  // should ideally get a clarifying question back rather than a guessed answer. Not a hard-fail
  // gate the way other checks are; logged so a model swap's effect on this specific known weak
  // spot is visible, not asserted as a strict pass/fail.
  check(
    'ambiguous prompt: asks a clarifying question (known partial capability, informational)',
    /\?/.test(ambiguous.content),
    ambiguous.content.slice(0, 100)
  );

  _resetMoodForTests();
  const planets = await timed('planets', () => generateReasoningPath('what are the planets in the solar system', [], persona, settings, allKnowledge, []));
  check('list-flattening: "planets in the solar system" (classic list-bait topic) has no list/bold markers', !hasListMarker(planets.content), planets.content.slice(0, 100));

  // Wave 8: speaker-aware channel brain. A busy multi-speaker channel history shouldn't let a
  // DIFFERENT person's unrelated chatter hijack the current asker's own follow-up resolution —
  // "what about South Korea" should resolve against userA's own prior Japan-capital thread, not
  // userB's unrelated France chatter sitting in between.
  _resetMoodForTests();
  const speakerAwareHistory = [
    { id: '1', role: 'user' as const, content: "what's the capital of Japan", authorId: 'userA', username: 'Alice', timestamp: Date.now() - 50000 },
    { id: '2', role: 'assistant' as const, content: 'Tokyo.', sources: ['Japan'], timestamp: Date.now() - 49000 },
    { id: '3', role: 'user' as const, content: 'have you seen the eiffel tower', authorId: 'userB', username: 'Bob', timestamp: Date.now() - 40000 },
    { id: '4', role: 'assistant' as const, content: 'nah man never been to France.', sources: ['France'], timestamp: Date.now() - 39000 },
  ];
  const speakerAwareSettings = { ...settings, discordUserId: 'userA' };
  const followUp = await timed('speaker-aware-followup', () =>
    generateReasoningPath('what about South Korea', speakerAwareHistory, persona, speakerAwareSettings, allKnowledge, [])
  );
  check(
    'speaker-aware follow-up: resolves against the SAME speaker\'s thread, not a different speaker\'s unrelated chatter',
    /south korea/i.test(followUp.content) && /seoul/i.test(followUp.content),
    followUp.content.slice(0, 120)
  );
}

async function main() {
  const args = process.argv.slice(2);
  const liveOnly = args.includes('--live-only');
  const detOnly = args.includes('--det-only');

  if (!liveOnly) await runDeterministicChecks();
  if (!detOnly) await runLiveChecks();

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

main();
