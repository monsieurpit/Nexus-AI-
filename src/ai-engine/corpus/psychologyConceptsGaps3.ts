import { KnowledgeItem } from '../../types';

/**
 * PSYCHOLOGY_CONCEPTS_GAPS_3 — batch 222 corrections.
 * Misses: "grief vs mourning" said mourning is "the poem, an elegy",
 * "cognitive vs behavioral therapy" answered CBT vs DBT, "resilience vs grit"
 * answered stoicism vs grit, "disorder vs syndrome" answered IBS vs PCOS,
 * "attitude vs belief" answered cognitive dissonance + tone/mood, plus web
 * dumps for introversion/shyness, trait/state and therapist/counselor.
 */
export const PSYCHOLOGY_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  {
    id: 'kb-gap-psy3-grief-vs-mourning',
    title: 'Grief vs mourning',
    category: 'psychology',
    keywords: [
      'difference between grief and mourning', 'grief vs mourning', 'internal emotional response to loss',
      'outward expression of grief', 'bereavement', 'rituals customs funerals', 'private feeling versus public process',
      'not a poem or elegy',
    ],
    content: `Grief is the internal, personal experience of loss — the mix of emotions and physical and mental reactions a person feels after a death or other major loss: sadness, shock, anger, guilt, numbness, longing, trouble sleeping and concentrating. Grief is what happens inside you.

Mourning is the outward expression of grief — how the feelings are shown and worked through, which is shaped by culture, religion, family and personal habit. Wearing black, holding a funeral or wake, sitting shiva, observing an anniversary, telling the story, taking time off, tending a grave: these are mourning. Mourning is the process and the public/social side.

(Bereavement is a third term: it just names the objective fact of having suffered a loss — "she is bereaved" — the state you are in, without describing the feelings or the rituals.)

So: grief is felt, mourning is done, bereavement is the situation. Mourning has nothing to do with the literary "elegy", which is a poem lamenting the dead.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-cognitive-vs-behavioral-therapy',
    title: 'Cognitive therapy vs behavioral therapy (vs CBT)',
    category: 'psychology',
    keywords: [
      'difference between cognitive and behavioral therapy', 'cognitive therapy vs behavior therapy',
      'changing thoughts', 'changing actions and conditioning', 'exposure therapy', 'cognitive restructuring',
      'CBT combines both', 'not CBT versus DBT', 'automatic thoughts',
    ],
    content: `These are two distinct traditions in psychotherapy that were later merged into CBT (this is not the CBT-vs-DBT question).

Behavioral therapy (behaviour therapy) is based on learning theory — classical and operant conditioning. It assumes problem behaviours and reactions are learned and can be unlearned, and it works directly on ACTIONS and environmental contingencies rather than on inner thoughts. Techniques: systematic desensitisation and exposure (facing a feared thing gradually until the fear response extinguishes), reinforcement schedules, behavioural activation (scheduling rewarding activities to lift depression), token economies.

Cognitive therapy (Aaron Beck, Albert Ellis) is based on the idea that it is not events themselves but our INTERPRETATIONS of them that drive emotion. It targets distorted, automatic thoughts and core beliefs — catastrophising, all-or-nothing thinking, mind-reading — and teaches the client to identify, test and reframe them (cognitive restructuring).

Cognitive Behavioural Therapy (CBT) is the modern integration: it uses both cognitive restructuring AND behavioural techniques (especially exposure and activation), because changing thoughts and changing behaviour reinforce each other. Most "CBT" today is this blend, but "cognitive" and "behavioural" name the two component approaches.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-resilience-vs-grit',
    title: 'Resilience vs grit',
    category: 'psychology',
    keywords: [
      'difference between resilience and grit', 'resilience vs grit', 'bouncing back from adversity',
      'sustained passion and perseverance toward a long-term goal', 'Angela Duckworth', 'recovery versus endurance',
      'coping with setbacks', 'not stoicism',
    ],
    content: `Both are strengths for dealing with difficulty, but they point at different things (and neither one is stoicism, which is a philosophy about controlling your reactions).

Resilience is the capacity to ADAPT WELL and RECOVER in the face of adversity, trauma, stress or setbacks — to bounce back to normal functioning (or grow) after something knocks you down. It is about processing hard events, staying flexible, drawing on support and hope, and not being permanently derailed by a loss, failure or crisis. Resilience is reactive: it is what you show when something bad happens.

Grit (a concept from psychologist Angela Duckworth) is sustained PASSION and PERSEVERANCE toward a single long-term goal over years — staying committed to the same overarching aim, working hard, and not quitting when progress is slow, boring or discouraging. Grit is proactive and forward-looking: it is about the long haul toward something you chose, whether or not disaster strikes.

Overlap: gritty people usually need resilience to keep going through setbacks, and both involve not giving up. But you can be resilient (recover well from a job loss, a breakup, an illness) without being especially gritty (you may not have one burning multi-year goal), and you can be gritty about a goal without having faced major adversity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-disorder-vs-syndrome',
    title: 'Disorder vs syndrome (vs disease)',
    category: 'psychology',
    keywords: [
      'difference between a disorder and a syndrome', 'disorder vs syndrome', 'a set of co-occurring signs and symptoms',
      'a disruption of normal function', 'known cause versus pattern', 'disease has a defined mechanism',
      'not IBS versus PCOS specifically', 'medical terminology',
    ],
    content: `These medical terms overlap and are often used loosely, but there is a rough hierarchy of how much is understood.

A syndrome is a recognisable pattern of signs and symptoms that tend to occur together, without (necessarily) a known single cause or mechanism. "Syndrome" (Greek for "running together") names the cluster. Examples: Down syndrome, Guillain-Barre syndrome, irritable bowel syndrome, metabolic syndrome. Once the underlying cause is discovered, a syndrome is sometimes renamed a "disease".

A disorder is a disruption of normal structure or function of the body or mind, whether or not the cause is known. It is a broad term, used especially in psychiatry (where "disease" implies a physical lesion that often cannot be pointed to) — anxiety disorder, bipolar disorder, autoimmune disorder. Many disorders are defined by a syndrome (a symptom pattern) plus impairment.

A disease is generally the most specific: a condition with a reasonably well-understood cause, mechanism (pathophysiology) and characteristic changes — tuberculosis, type 1 diabetes, sickle cell disease.

Short version: syndrome = "these things go together" (cause maybe unknown); disorder = "normal functioning is disrupted"; disease = "we know what's going wrong and why". The lines are fuzzy and usage is inconsistent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-attitude-vs-belief',
    title: 'Attitude vs belief',
    category: 'psychology',
    keywords: [
      'difference between an attitude and a belief', 'attitude vs belief psychology', 'evaluation like or dislike',
      'a proposition held to be true', 'affective versus cognitive', 'attitudes have an emotional charge',
      'beliefs feed into attitudes', 'not cognitive dissonance or tone',
    ],
    content: `A belief is a proposition you hold to be true or false about the world — a piece of cognition. "Vaccines cause autism", "the climate is warming", "my coworker is competent", "exercise improves mood" are beliefs. A belief can be accurate or mistaken, and it is in principle checkable against evidence.

An attitude is an overall EVALUATION — a like or dislike, favourable or unfavourable orientation — toward some object, person, group, idea or activity. "I love jazz", "I distrust politicians", "I'm in favour of nuclear power", "I hate meetings" are attitudes. Attitudes carry an emotional charge and a readiness to act (approach or avoid), and classic models describe them as having three parts: cognitive (the beliefs behind it), affective (the feelings), and behavioural (the action tendency).

So beliefs are one of the ingredients of an attitude: your beliefs about nuclear power (it's low-carbon, waste is a problem, accidents are rare) feed into your overall attitude toward it. But an attitude also includes feelings and is fundamentally about evaluation, not truth. You can change someone's belief with facts and still not shift their attitude, because the feelings and identity attached to it remain.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-introversion-vs-shyness',
    title: 'Introversion vs shyness',
    category: 'psychology',
    keywords: [
      'difference between introversion and shyness', 'introversion vs shyness', 'preference for low stimulation',
      'fear and anxiety in social situations', 'recharge alone', 'wants to connect but is afraid',
      'not the same as social anxiety', 'personality trait versus discomfort',
    ],
    content: `Introversion is a personality trait: a preference for lower levels of external stimulation and social interaction. Introverts find extended socialising draining and recharge by spending time alone or in small, calm settings; they often think before speaking and enjoy depth over breadth in relationships. Introversion is NOT about fear — an introvert can be perfectly comfortable and skilled socially, they just do not seek out or need as much of it, and they prefer quieter environments.

Shyness is discomfort, self-consciousness, anxiety or inhibition in social situations, especially new ones or ones where you feel judged. A shy person often WANTS to interact and connect but is held back by fear of embarrassment or rejection. Shyness is an emotional state (or a temperament); severe, persistent shyness that causes real impairment shades into social anxiety disorder.

The two are independent:
- A shy extrovert craves social contact but is anxious about it (frustrating).
- A non-shy introvert is calm in company but simply prefers less of it and time alone afterward.
Many people are somewhere in between, but "introvert" and "shy" are not synonyms — one is about how much stimulation you prefer, the other is about fear.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-emotion-vs-feeling',
    title: 'Emotion vs feeling (vs mood)',
    category: 'psychology',
    keywords: [
      'difference between an emotion and a feeling', 'emotion vs feeling', 'automatic bodily response',
      'conscious subjective experience of an emotion', 'mood is longer and diffuse', 'Damasio',
      'triggered by a stimulus', 'labelled and interpreted',
    ],
    content: `In affective science these three are distinguished (though everyday speech blurs them).

An emotion is a relatively brief, automatic response to a specific trigger, involving a coordinated package of changes: a physiological reaction (heart rate, adrenaline, facial expression), an action tendency (fight, flee, approach), and an appraisal of the situation. Emotions like fear, anger, joy, disgust and surprise are fast, largely unconscious at onset, and to a degree universal.

A feeling is the conscious, subjective EXPERIENCE of that emotion once your brain notices and interprets it — the private mental awareness of "I feel afraid" or "I feel content". Neuroscientist Antonio Damasio frames it this way: the emotion is the bodily state; the feeling is the mind's perception and labelling of it. Two people can have the same emotional response and put different feeling-words to it depending on context and personal history.

A mood is longer-lasting (hours to days), lower in intensity, and not tied to a single identifiable cause. It colours how you interpret everything ("I woke up irritable"). Moods can be the residue of an emotion or arise from sleep, hormones, weather, health or the accumulation of small events.

Short version: emotion = the automatic reaction; feeling = your conscious experience of it; mood = a diffuse background state.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-trait-vs-state',
    title: 'Trait vs state (psychology)',
    category: 'psychology',
    keywords: [
      'difference between a trait and a state', 'trait vs state psychology', 'stable enduring characteristic',
      'temporary condition right now', 'trait anxiety versus state anxiety', 'personality',
      'how you usually are versus how you feel today', 'STAI',
    ],
    content: `A trait is a stable, enduring characteristic of a person that is fairly consistent across situations and over time — part of who they generally are. Personality traits (the Big Five: openness, conscientiousness, extraversion, agreeableness, neuroticism), and things like "trait anxiety" (a general, long-standing tendency to worry and feel tense) are traits. Traits describe how a person USUALLY is.

A state is a temporary condition or experience happening right now or over a short period, which fluctuates with circumstances. "State anxiety" is how anxious you feel at this moment (before an exam, during a turbulent flight); it rises and falls. Being tired, angry, focused, or nervous today are states.

The classic illustration is anxiety: the State-Trait Anxiety Inventory measures both separately. Someone low in trait anxiety (calm by disposition) can still have very high state anxiety in a genuine emergency; someone high in trait anxiety may be moderately anxious even on a quiet ordinary day.

Short version: a trait is your baseline personality tendency (stable); a state is your current condition (variable). Repeatedly measured states average out toward the underlying trait.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-therapist-vs-counselor',
    title: 'Therapist vs counsellor (vs psychologist, psychiatrist)',
    category: 'psychology',
    keywords: [
      'difference between a therapist and a counselor', 'therapist vs counsellor', 'talk therapy',
      'shorter-term specific issues versus deeper long-term work', 'overlapping titles', 'licensing',
      'psychotherapy', 'not family or sex therapy specifically',
    ],
    content: `In everyday use "therapist" and "counsellor" overlap almost entirely — both are trained professionals who provide talk-based help, and many practitioners use the words interchangeably. Where a distinction is drawn:

A counsellor tends to focus on a specific present-day problem or life challenge — grief, a relationship issue, career change, stress, adjusting to illness — over a shorter, more practical course of sessions, helping the client cope and make decisions. "Counselling" is often the term for lighter-touch, situational support (school counsellor, bereavement counsellor, careers counsellor).

A therapist (psychotherapist) more often does deeper, longer-term work on entrenched patterns, past experiences, personality and mental-health conditions, using a defined modality (CBT, psychodynamic, EMDR, etc.). "Psychotherapy" implies more formal clinical training and treatment of diagnosable disorders.

But this varies a lot by country and by the individual's actual qualifications and licence. The credential matters more than the word: a licensed clinical social worker, a licensed professional counsellor, a marriage and family therapist and a clinical psychologist can all do essentially the same talk therapy. (Separately: a psychologist holds a doctorate and can do assessment and therapy; a psychiatrist is a medical doctor who can prescribe medication.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-psy3-impulse-vs-compulsion',
    title: 'Impulse vs compulsion',
    category: 'psychology',
    keywords: [
      'difference between an impulse and a compulsion', 'impulse vs compulsion', 'sudden urge to act',
      'repetitive act to relieve anxiety', 'impulse-control disorders', 'OCD compulsions',
      'pleasurable versus distress-relieving', 'acting without forethought',
    ],
    content: `An impulse is a sudden, spontaneous urge to do something, acted on with little or no forethought. Impulsive acts are often driven by the promise of immediate reward, excitement or relief of tension, and they can feel good in the moment (an impulse buy, blurting something out, a sudden urge to gamble or lash out). "Impulse-control disorders" (kleptomania, pyromania, intermittent explosive disorder) involve repeatedly failing to resist such urges.

A compulsion is a repetitive behaviour (or mental act) a person feels DRIVEN to perform, usually to prevent or reduce anxiety or a dreaded outcome, or according to rigid rules — not because it is enjoyable. In OCD, compulsions (checking, washing, counting, arranging, praying) are done in response to an obsession, and the person often recognises they are excessive but feels they cannot stop; the relief is temporary and the cycle reinforces itself.

Key contrasts: an impulse is a spur-of-the-moment urge often aimed at pleasure/reward; a compulsion is a deliberate, repeated, rule-bound act aimed at relieving distress. Impulsivity is "too little braking"; compulsivity is "stuck repeating". Some conditions (e.g. compulsive gambling) blur the two.`,
    createdAt: Date.now(),
  },
];
