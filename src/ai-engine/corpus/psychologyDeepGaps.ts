import { KnowledgeItem } from '../../types';

// Batch 80 (psychology, deeper — batch 29 covered biases broadly). nexus-4b
// misses: "what is the difference between IQ and EQ" answered about audio
// equalization in music production; "what is classical conditioning" answered
// about operant conditioning; "what is a cognitive bias" only listed examples
// without defining it; "what is Maslow's hierarchy of needs" was a raw web
// dump; the Stanford prison experiment answer bled into Asch's conformity
// study and omitted the now-standard criticism of the SPE.
export const PSYCHOLOGY_DEEP_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-iq-vs-eq',
    title: 'The Difference Between IQ and EQ',
    category: 'Psychology',
    keywords: [
      'what is the difference between iq and eq', 'emotional intelligence vs iq', 'emotional quotient goleman', 'what does an iq test measure',
      'is eq real', 'iq eq leadership relationships', 'eq is not audio equalization',
    ],
    content: `IQ (intelligence quotient) is a score, standardised so the population average is 100, from tests that measure reasoning, problem-solving, working memory, pattern recognition, and verbal and spatial ability relative to others of the same age. It predicts academic performance and, to a lesser degree, job performance, but it does not capture creativity, wisdom, or social skill. EQ (emotional quotient, or emotional intelligence) is the ability to recognise, understand, manage and use emotions effectively — both your own and other people's. It has nothing to do with audio "EQ" (equalization) in music production. The concept was popularised by psychologist Daniel Goleman in 1995; its usual components are self-awareness, self-regulation, motivation, empathy, and social skill. The common claim is that IQ gets you in the door while EQ shapes leadership, teamwork, and relationships. IQ is a much older and more rigorously validated measure; EQ as a single quantifiable trait is more debated, and some of what it describes overlaps with personality traits like agreeableness and conscientiousness.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-classical-conditioning',
    title: 'What Classical Conditioning Is',
    category: 'Psychology',
    keywords: [
      'what is classical conditioning', 'pavlov dogs bell salivation', 'unconditioned vs conditioned stimulus', 'classical vs operant conditioning',
      'extinction spontaneous recovery conditioning', 'how phobias and taste aversions form', 'associative learning stimulus stimulus',
    ],
    content: `Classical conditioning is learning by association between two stimuli. A stimulus that already triggers an automatic response is paired, repeatedly, with a previously neutral stimulus, until the neutral stimulus on its own produces the response. Ivan Pavlov's dogs are the classic case: food (the unconditioned stimulus) naturally makes a dog salivate (unconditioned response); Pavlov rang a bell (neutral) just before feeding, and after enough pairings the bell alone (now a conditioned stimulus) made the dogs salivate (conditioned response). Key phenomena: acquisition (the learning phase), extinction (the response fades if the bell keeps coming without food), spontaneous recovery (it can briefly return later), and generalisation (similar stimuli also trigger it). Classical conditioning explains how phobias, food aversions after nausea, and some emotional and advertising associations are learned. It is distinct from operant conditioning, which is learning from the consequences of a voluntary behaviour rather than from pairing two stimuli.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-maslow-hierarchy',
    title: "What Maslow's Hierarchy of Needs Is",
    category: 'Psychology',
    keywords: [
      'what is maslows hierarchy of needs', 'physiological safety belonging esteem self-actualization', 'maslow pyramid motivation',
      'do lower needs come before higher needs', 'self-transcendence maslow', 'criticism of maslows hierarchy',
    ],
    content: `Maslow's hierarchy of needs is a theory of human motivation proposed by the American psychologist Abraham Maslow in 1943, usually drawn as a five-level pyramid. From the bottom: (1) PHYSIOLOGICAL needs — food, water, warmth, sleep; (2) SAFETY needs — security, stability, health, shelter, freedom from fear; (3) LOVE AND BELONGING — friendship, intimacy, family, connection; (4) ESTEEM — respect from others, recognition, and a sense of competence and self-worth; (5) SELF-ACTUALIZATION — realising one's potential, personal growth, creativity, and meaning. The core idea is that lower, more basic needs generally have to be reasonably satisfied before the higher ones become strong motivators. Maslow later suggested a sixth level, self-transcendence (serving something beyond the self), above self-actualization. The model is enormously influential in management, education and marketing, but the strict bottom-up ordering has weak empirical support — people pursue meaning and connection even when lower needs are unmet, and cultures differ in which needs they prioritise.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cognitive-bias-definition',
    title: 'What a Cognitive Bias Is',
    category: 'Psychology',
    keywords: [
      'what is a cognitive bias', 'systematic error in thinking', 'heuristics and biases kahneman tversky', 'why do cognitive biases exist',
      'are cognitive biases unconscious', 'can you correct a cognitive bias', 'examples of cognitive biases',
    ],
    content: `A cognitive bias is a systematic, predictable pattern of deviation from rational judgement — a built-in tendency of the mind to misperceive, misremember, or misjudge in a particular direction. "Systematic" is the key word: it is not random error but an error most people make the same way. Biases arise because the brain has limited attention and memory and relies on fast mental shortcuts (heuristics) that usually work but sometimes misfire, and because emotion, motivation and social pressure shape how we process information. They mostly operate below conscious awareness, so a biased judgement simply feels correct, and merely knowing about a bias does not reliably remove it. The modern study of biases comes largely from Daniel Kahneman and Amos Tversky in the 1970s. Well-known examples: confirmation bias (favouring evidence that fits existing beliefs), anchoring (over-relying on the first number seen), the availability heuristic (judging likelihood by how easily examples come to mind), loss aversion (weighting losses more than equal gains), hindsight bias, and the Dunning-Kruger effect.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stanford-prison-experiment',
    title: 'What the Stanford Prison Experiment Was (and Its Problems)',
    category: 'Psychology',
    keywords: [
      'what is the stanford prison experiment', 'zimbardo mock prison 1971', 'guards became abusive prisoners distressed',
      'stanford prison experiment criticism', 'why was the stanford prison experiment stopped', 'is the stanford prison experiment valid',
    ],
    content: `The Stanford prison experiment was a 1971 study led by psychologist Philip Zimbardo. Around two dozen male college students, screened as psychologically healthy, were randomly assigned to be "guards" or "prisoners" in a mock prison built in the basement of Stanford's psychology department. Planned for two weeks, it was halted after six days: some guards became authoritarian and cruel, several prisoners showed acute stress, and Zimbardo (who had cast himself as prison superintendent) lost his own objectivity. For decades it was cited as powerful evidence that ordinary people slip into abusive behaviour when a situation and social role invite it. However, it is now heavily criticised on both scientific and ethical grounds: the sample was tiny with no control group, there were strong "demand characteristics" (participants guessing what was wanted), released recordings show Zimbardo's team actively coaching guards to be tough, some participants later said they were acting, and the study has never been properly replicated. It is now often taught as a lesson in flawed methodology and research ethics rather than as an established result. (It is a different study from Solomon Asch's conformity experiments.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fight-or-flight',
    title: 'What the Fight-or-Flight Response Is',
    category: 'Psychology',
    keywords: [
      'what is the fight or flight response', 'sympathetic nervous system adrenaline cortisol', 'fight flight freeze fawn',
      'walter cannon fight or flight', 'physical changes during stress response', 'why does your heart race when scared',
    ],
    content: `The fight-or-flight response is the body's automatic physiological reaction to a perceived threat, preparing it either to confront the danger or to escape it. The term was coined by physiologist Walter Cannon. When the brain (especially the amygdala) registers danger, it activates the sympathetic branch of the autonomic nervous system and triggers the adrenal glands to release adrenaline and, more slowly, cortisol. The effects: heart rate and blood pressure rise, breathing quickens, pupils dilate, blood is redirected from the digestive system to the large muscles, blood sugar is released for fuel, and pain sensitivity drops. This is highly adaptive against a physical threat, but the same response fires for modern psychological stressors — deadlines, arguments, public speaking — where there is nothing to fight or flee, and chronic activation contributes to anxiety, high blood pressure and other health problems. The response is now often described as "fight, flight, freeze or fawn," since some people and animals respond to inescapable threat by immobilising or by appeasing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-confirmation-bias-clean',
    title: 'What Confirmation Bias Is',
    category: 'Psychology',
    keywords: [
      'what is confirmation bias', 'seeking evidence that supports your beliefs', 'why do people ignore contradicting evidence',
      'confirmation bias examples politics science', 'how to counter confirmation bias', 'motivated reasoning',
    ],
    content: `Confirmation bias is the tendency to search for, notice, interpret, favour and remember information in a way that supports what you already believe, while giving less weight and attention to information that contradicts it. It is one of the most pervasive and well-documented cognitive biases, largely because it operates below awareness: people rarely feel like they are cherry-picking: the supporting evidence just seems more relevant and the contradicting evidence seems weaker, biased, or less credible. It shows up when people follow only news sources that share their views, run experiments designed to confirm rather than disprove a hypothesis, read ambiguous behaviour as fitting their first impression of someone, or recall the times a superstition "worked" and forget the times it did not. Counters include deliberately seeking out the strongest opposing arguments, asking "what evidence would change my mind?", having others try to disprove your idea (peer review, red-teaming), and pre-committing to what would count as failure before seeing the data.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-imposter-syndrome',
    title: 'What Imposter Syndrome Is',
    category: 'Psychology',
    keywords: [
      'what is imposter syndrome', 'feeling like a fraud despite success', 'attributing success to luck not skill', 'imposter phenomenon clance imes',
      'who experiences imposter syndrome', 'imposter syndrome vs normal self-doubt', 'how to deal with imposter syndrome',
    ],
    content: `Imposter syndrome (originally the "imposter phenomenon," described by psychologists Pauline Clance and Suzanne Imes in 1978) is the persistent internal experience of believing you are not as competent as others perceive you to be — a feeling of being a fraud who will eventually be "found out." People with it attribute their successes to luck, timing, charm, or having fooled everyone, rather than to genuine ability or effort, and they often discount praise and dwell on mistakes. The defining feature is a mismatch between real, demonstrated accomplishment and a person's inner sense of legitimacy — so it is distinct from ordinary, healthy self-doubt about something you genuinely have not learned yet, and from actual incompetence. It is common among high achievers, people from groups underrepresented in their field, and those in new or high-visibility roles. It tends to ease with naming the feeling, hearing that peers feel the same, keeping a concrete record of achievements and skills, and reframing competence as something built over time rather than possessed or not.`,
    createdAt: Date.now(),
  },
];
