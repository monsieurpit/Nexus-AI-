import { KnowledgeItem } from '../../types';

// Batch 29 (psychology & cognitive biases) gap-fills. Strong category (~17/25).
// Live misses on nexus-4b: "spotlight effect" -> Baroque painting lighting;
// "intrinsic vs extrinsic motivation" -> "Work motivation... Motivation
// crowding theory" web dump; "emotion vs mood" -> "good vibes only... anhedonia
// is the key difference"; "fight or flight" -> "controlled by the vagus nerve"
// (that's parasympathetic); "operant conditioning" -> "Pavlov's dog was a
// classic example" (that's classical conditioning).
export const PSYCHOLOGY_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-spotlight-effect',
    title: 'What the Spotlight Effect Is',
    category: 'Psychology',
    keywords: [
      'what is the spotlight effect', 'spotlight effect psychology', 'why do i feel like everyone is watching me',
      'do people notice my mistakes as much as i think', 'spotlight effect meaning', 'feeling self conscious in public',
    ],
    content: `The spotlight effect is the tendency to overestimate how much other people notice, remember and judge things about you — your appearance, a stain on your shirt, a stumble, a bad haircut, something dumb you said. It feels like you're under a spotlight, but everyone else is mostly the star of their own show and paying far less attention to you than you assume. It was demonstrated by Thomas Gilovich and Kenneth Savitsky (2000): students made to wear an embarrassing T-shirt guessed that about half the room noticed, when only about a quarter actually did. It stems from being locked inside your own point of view and not adjusting enough for the fact that others don't share your focus on yourself. Knowing about it can reduce social anxiety — the awkward moment you're agonising over was probably barely registered by anyone else. (Nothing to do with stage lighting or painting.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-intrinsic-extrinsic-motivation',
    title: 'Intrinsic vs Extrinsic Motivation',
    category: 'Psychology',
    keywords: [
      'what is intrinsic versus extrinsic motivation', 'intrinsic vs extrinsic motivation', 'what is intrinsic motivation',
      'what is extrinsic motivation', 'examples of intrinsic motivation', 'does paying people reduce motivation',
      'overjustification effect',
    ],
    content: `Intrinsic motivation is doing something for its own sake — because it's interesting, enjoyable, satisfying or meaningful in itself (playing a sport for the fun of it, reading out of curiosity, solving a puzzle because you want to). Extrinsic motivation is doing something to get an outcome that's separate from the activity — a reward, money, a grade, praise, a trophy, or to avoid punishment or criticism. Both can drive behaviour, but they behave differently: intrinsic motivation tends to produce more persistence, creativity and well-being, while extrinsic rewards are useful for boring or effortful tasks. A well-documented catch is the "overjustification effect": paying or rewarding people for something they already enjoy can actually reduce their intrinsic interest once the reward stops, because they start to see the activity as work done for the payoff. Self-Determination Theory (Deci and Ryan) frames intrinsic motivation as flowing from feelings of autonomy, competence and relatedness.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-emotion-vs-mood',
    title: 'Emotion vs Mood',
    category: 'Psychology',
    keywords: [
      'what is the difference between emotion and mood', 'emotion vs mood', 'what is an emotion', 'what is a mood',
      'how long does an emotion last', 'what is affect in psychology', 'difference between feeling and mood',
    ],
    content: `An emotion is a short, intense reaction to a specific trigger: you see a snake and feel fear, get an unfair email and feel anger, hear good news and feel joy. Emotions are usually brief (seconds to minutes), have a clear object or cause, and come with strong bodily changes and an urge to act. A mood is longer-lasting (hours to days), lower in intensity, more diffuse, and often has no obvious single cause — you might just feel irritable, gloomy, content or anxious "for no reason," and it colours how you react to everything around you. Moods can be left over from an emotion, or arise from sleep, hormones, weather, health, or accumulated small events. "Affect" is the umbrella term covering both. A persistent low mood lasting two weeks or more, with loss of interest and other symptoms, is different again — that points toward depression.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fight-or-flight',
    title: 'The Fight-or-Flight Response',
    category: 'Psychology',
    keywords: [
      'what is the fight or flight response', 'fight or flight explained', 'what happens in fight or flight', 'what is the sympathetic nervous system',
      'what does adrenaline do', 'fight flight or freeze', 'why does my heart race when i am scared',
    ],
    content: `Fight-or-flight is the body's rapid, automatic response to a perceived threat, preparing you to either confront it or escape. It's run by the SYMPATHETIC branch of the autonomic nervous system, backed by hormones: the amygdala detects danger and signals the hypothalamus, which fires the sympathetic nerves and tells the adrenal glands to flood the bloodstream with adrenaline (and, more slowly, cortisol). The effects: heart rate and blood pressure jump, breathing speeds up, blood is redirected to the big muscles, pupils dilate, the liver dumps glucose for fuel, and digestion and other "non-urgent" functions shut down. It's involuntary and fast. Afterward, the PARASYMPATHETIC branch — the "rest-and-digest" system, working largely through the vagus nerve — brings everything back down. Modern life triggers the same response to non-physical stressors (deadlines, arguments, public speaking), and "freeze" (or "fawn") is now often added as a third possible reaction.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-operant-conditioning',
    title: 'What Operant Conditioning Is',
    category: 'Psychology',
    keywords: [
      'what is operant conditioning', 'operant conditioning explained', 'what is reinforcement and punishment', 'skinner box',
      'positive vs negative reinforcement', 'operant vs classical conditioning', 'how does reward based learning work',
    ],
    content: `Operant conditioning is learning to associate a voluntary BEHAVIOUR with its CONSEQUENCE, so consequences make the behaviour more or less likely in future. It was developed by B.F. Skinner (building on Edward Thorndike's "law of effect") using the "Skinner box," where an animal presses a lever for food. The four levers: positive reinforcement (add something good — praise, a treat — to increase a behaviour); negative reinforcement (remove something unpleasant — the annoying beep stops when you buckle your seatbelt — to increase a behaviour); positive punishment (add something unpleasant to decrease a behaviour); negative punishment (take away something good, like a phone, to decrease a behaviour). How often the reward comes (the "schedule of reinforcement") strongly affects how persistent the behaviour is — unpredictable rewards are the hardest to extinguish, which is how slot machines and social-media notifications hook people. This is DIFFERENT from classical (Pavlovian) conditioning, which is about pairing two stimuli to trigger an automatic, involuntary response (Pavlov's dogs salivating at a bell).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-phobia',
    title: 'What a Phobia Is',
    category: 'Psychology',
    keywords: [
      'what is a phobia', 'what does phobia mean', 'phobia vs fear', 'types of phobias', 'what is a specific phobia',
      'how are phobias treated', 'what is agoraphobia', 'what is social phobia',
    ],
    content: `A phobia is an anxiety disorder: an intense, persistent, irrational fear of a specific object or situation that is out of proportion to any actual danger, and that the person goes out of their way to avoid, disrupting their life. It's more than ordinary fear or dislike — exposure can trigger a rush of panic (racing heart, sweating, shaking, an urge to flee). The main categories are: specific (simple) phobias — of animals (spiders, snakes, dogs), heights, flying, needles/blood, enclosed spaces, storms; social anxiety disorder (social phobia) — fear of being judged or humiliated in social or performance situations; and agoraphobia — fear of places or situations where escape or help would be hard (crowds, public transport, being far from home). Phobias often start in childhood or after a bad experience, and they respond well to treatment, especially gradual exposure therapy (facing the fear step by step) and cognitive behavioural therapy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-selective-attention',
    title: 'What Selective Attention Is',
    category: 'Psychology',
    keywords: [
      'what is selective attention', 'selective attention psychology', 'what is the cocktail party effect',
      'what is inattentional blindness', 'the invisible gorilla experiment', 'how does attention filter information',
      'why cant i focus with background noise',
    ],
    content: `Selective attention is the brain's ability to focus mental resources on one stream of information while filtering out others. Your senses take in far more than you can consciously process, so attention acts as a spotlight and a filter. The classic demonstration is the "cocktail party effect": in a noisy room you can lock onto one conversation and tune the rest to background hum — yet if someone across the room says your name, it can still break through, showing the unattended channel is being monitored at a low level. The flip side is "inattentional blindness": when you're concentrating hard on one thing, you can completely fail to notice something obvious and unexpected — as in the famous "invisible gorilla" study, where about half of viewers counting basketball passes never saw a person in a gorilla suit walk through the scene. This is also why using a phone while driving is dangerous even hands-free.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-empathy-vs-sympathy',
    title: 'Empathy vs Sympathy',
    category: 'Psychology',
    keywords: [
      'what is the difference between empathy and sympathy', 'empathy vs sympathy', 'what is empathy', 'what is sympathy',
      'what is compassion', 'cognitive vs emotional empathy', 'is empathy the same as feeling sorry for someone',
    ],
    content: `Sympathy is feeling FOR someone — acknowledging their difficulty and feeling concern or pity from the outside ("I'm so sorry that happened to you"). Empathy is feeling WITH someone — actually taking their perspective and sensing what the situation is like from the inside, sharing something of their emotional state. Psychologists split empathy into "cognitive empathy" (understanding what another person is thinking and feeling) and "emotional/affective empathy" (feeling a version of it yourself). Compassion goes one step further: empathy plus the motivation to help. A common way to put the difference: sympathy keeps a bit of distance ("that must be hard"), while empathy climbs down into the hole with the person and says "I know what it's like down here, you're not alone." Empathy tends to build connection; sympathy can sometimes feel like being looked down on.`,
    createdAt: Date.now(),
  },
];
