import { KnowledgeItem } from '../../types';

// Batch 273 corpus fixes — health/psychology topics.
// 9/25 misses. Two severe topic-confusion hallucinations: "confidence vs
// arrogance" was answered as a statistics lecture on "confidence intervals"
// (completely unrelated meaning of the word "confidence"), and "goal vs
// dream" was answered as trivia about the 2005/2007 movies "Goal!" and
// "Goal II: Living the Dream" instead of the actual concepts. Also a real
// factual error (coconut oil given as an example of an UNSATURATED fat —
// it's actually one of the most heavily saturated fats that exists), and
// several answers that dodged half the question (only defined one side of
// the comparison, or got cut off before finishing).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'health',
  keywords,
  content,
  createdAt: now,
});

export const HEALTH_PSYCHOLOGY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-health-nutritionist-vs-dietitian',
    'Nutritionist vs dietitian',
    ['nutritionist', 'dietitian', 'difference nutritionist dietitian'],
    "The key difference is regulation and credentials, not what they know about food. 'Dietitian' (or 'Registered Dietitian,' RD) is a legally protected title in most places — it requires a specific accredited degree, a supervised internship, and passing a national exam, plus ongoing licensing requirements, similar to how 'nurse' or 'doctor' are protected titles. 'Nutritionist' is often an UNregulated term — in many places anyone can call themselves a nutritionist regardless of their training, though some jurisdictions do have a 'Certified Nutrition Specialist' credential with real requirements. In short: every registered dietitian could reasonably call themselves a nutritionist, but not every self-proclaimed nutritionist has the formal training or credentials of a registered dietitian.",
  ),
  k(
    'kb-gap-health-cardio-vs-strength',
    'Cardio vs strength training',
    ['cardio', 'strength training', 'difference cardio strength training', 'cardiovascular exercise vs weightlifting'],
    "Cardio (cardiovascular exercise) is sustained activity that raises your heart rate and works your heart and lungs — running, cycling, swimming, or anything that keeps you moving continuously for an extended period. It mainly improves endurance, heart health, and calorie burn during the activity itself. Strength training (resistance training) is short bursts of effort against resistance — weightlifting, resistance bands, or bodyweight exercises like push-ups — that build muscle size and strength by causing controlled muscle damage that repairs stronger. It also boosts your resting metabolism (more muscle burns more calories even at rest) in a way cardio alone doesn't. Most fitness guidelines recommend a mix of both, since they improve different, complementary things: cardio for heart/lung endurance, strength training for muscle, bone density, and long-term metabolic health.",
  ),
  k(
    'kb-gap-health-protein-vs-carbs',
    'Protein vs carbohydrates',
    ['protein', 'carbohydrates', 'carbs', 'difference protein carbs'],
    "Protein and carbohydrates are both macronutrients that provide energy (about 4 calories per gram each), but they serve very different jobs. Protein is made of amino acids and is mainly used to build and repair tissue — muscle, skin, hair, enzymes, and hormones — it's a structural and repair material more than a quick fuel source. Carbohydrates (sugars, starches, fiber) are the body's preferred and fastest source of energy: they get broken down into glucose, which cells burn directly or store (as glycogen) for later use. Simple carbs (sugar, white bread) digest fast and spike blood sugar quickly; complex carbs (whole grains, vegetables) digest slower and give more sustained energy. In short: carbs are the body's quick-burning fuel, protein is the body's building material.",
  ),
  k(
    'kb-gap-health-saturated-vs-unsaturated-fat-correction',
    'Saturated vs unsaturated fat (correcting a coconut oil error)',
    ['saturated fat', 'unsaturated fat', 'coconut oil saturated or unsaturated', 'difference saturated unsaturated fat'],
    "Saturated fat has no double bonds between its carbon atoms (every carbon is 'saturated' with hydrogen), so the chains pack tightly and it's usually solid at room temperature — think butter, lard, and coconut oil, which is actually one of the most heavily saturated fats that exists (about 90% saturated, more than butter), despite being plant-based. Unsaturated fat has one or more carbon-carbon double bonds, which puts a kink in the chain and keeps it liquid at room temperature — think olive oil, canola oil, or the fat in fish and nuts. Common mistake to avoid: NOT every plant oil is unsaturated — coconut oil and palm oil are the two big exceptions, both mostly saturated despite being plant-derived.",
  ),
  k(
    'kb-gap-health-introvert-vs-extrovert',
    'Introvert vs extrovert',
    ['introvert', 'extrovert', 'extravert', 'difference introvert extrovert'],
    "The core difference is where someone gets and loses their mental energy, not how shy or outgoing they act on the surface. An introvert tends to feel drained by a lot of social interaction and recharges through quiet, solitary time — they can still enjoy people and even be talkative in the moment, but socializing costs them energy. An extrovert tends to feel energized BY social interaction and can feel restless or low-energy after too much time alone — being around people recharges them rather than draining them. It's a spectrum, not a strict either/or box, and most people (sometimes called 'ambiverts') land somewhere in the middle rather than at either extreme. The concept was introduced to psychology by Carl Jung, though the popular understanding today (shy vs outgoing) is a simplification of his original idea (which was really about where you direct your attention and energy).",
  ),
  k(
    'kb-gap-health-habit-vs-addiction',
    'Habit vs addiction',
    ['habit', 'addiction', 'difference habit addiction'],
    "A habit is a behavior that's become automatic through repetition — a cue-routine-reward loop your brain runs without much conscious thought (like always checking your phone when you're bored). Habits can be broken with some effort and awareness, and going without one usually causes mild inconvenience at worst, not real distress. Addiction is a much more serious, compulsive pattern where the behavior or substance has hijacked the brain's reward system, causing genuine physical or psychological dependence — stopping causes real withdrawal symptoms (physical, emotional, or both), the person often continues despite clear negative consequences to their health, relationships, or life, and willpower alone typically isn't enough to stop without support. The key line: a habit is something you do out of routine that you COULD stop without much trouble; an addiction is something your brain and body have become dependent on, where stopping causes genuine distress and often requires help.",
  ),
  k(
    'kb-gap-health-hobby-vs-passion',
    'Hobby vs passion',
    ['hobby', 'passion', 'difference hobby passion'],
    "A hobby is something you do for enjoyment in your free time — it's casual, you can pick it up or drop it whenever you want without much consequence, and it doesn't need to define who you are. A passion is a much deeper, more central interest that you're genuinely driven to pursue, often tied to your identity, long-term goals, or sense of purpose — you'd keep at it even through setbacks or boredom, not just when it's fun. Psychologist Angela Duckworth's concept of 'grit' (passion plus sustained perseverance toward long-term goals) captures this difference well: a hobby doesn't require grit, since you can walk away with no cost, but a genuine passion usually does, since sticking with it through the hard, unglamorous parts is part of what makes it a passion rather than just a pastime.",
  ),
  k(
    'kb-gap-health-confidence-vs-arrogance',
    'Confidence vs arrogance',
    ['confidence', 'arrogance', 'difference confidence arrogance'],
    "Confidence is a realistic, grounded belief in your own abilities — it comes from genuine competence or self-acceptance, doesn't need to put others down to feel valid, and is usually comfortable admitting mistakes or gaps in knowledge. Arrogance is an inflated, often unrealistic sense of superiority — it typically involves looking down on others, needing constant validation or admiration, and reacting defensively or dismissively to criticism instead of taking it in stride. A simple tell: a confident person can say 'I don't know' or 'I was wrong' without it threatening their self-image; an arrogant person usually can't, because their self-image depends on always being seen as right or superior. (Note: this is unrelated to the statistical term 'confidence interval' — that's a completely different meaning of the word 'confidence' from probability/statistics, not the personality trait being asked about here.)",
  ),
  k(
    'kb-gap-health-goal-vs-dream',
    'Goal vs dream',
    ['goal', 'dream', 'difference goal dream', 'goal vs dream aspiration'],
    "A dream is a broad, often vague vision of something you'd love to achieve or become someday — it's aspirational and emotional, but usually has no concrete plan, timeline, or defined steps attached to it ('I want to be successful someday'). A goal is a specific, actionable target with a clear definition of what 'done' looks like, usually with a timeline and concrete steps to get there ('I want to make the starting eleven by next season, so I'm training goalkeeper reflexes three times a week'). The relationship between them: a dream is the destination or motivation, while goals are the specific, measurable steps that actually turn that dream into something achievable — a dream without goals often stays just a wish, while goals without an underlying dream can feel directionless. (Note: this is unrelated to the 2005/2007 soccer movies 'Goal!' and 'Goal II: Living the Dream' — that's just shared wording, not the actual concept being asked about here.)",
  ),
];
