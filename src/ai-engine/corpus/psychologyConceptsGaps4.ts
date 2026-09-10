import { KnowledgeItem } from '../../types';

/**
 * PSYCHOLOGY_CONCEPTS_GAPS_4 — batch 248 corrections.
 * nexus-4b handled most psychology contrasts well. Misses:
 * - "conscious vs unconscious mind": said the CONSCIOUS mind handles face
 *   recognition and autopilot driving (those are unconscious/automatic).
 * - "recall vs recognition": gave the machine-learning definition of recall
 *   (TP / (TP + FN)).
 * - "id, ego, superego" and "neurosis vs psychosis" were web dumps.
 * - "motivation vs willpower": conflated willpower with extrinsic motivation
 *   and leaked an "[1]" citation.
 * - "ADHD vs ADD": said "basically the same thing" without the nuance.
 * - "psychology vs psychiatry", "CBT vs psychoanalysis", "assimilation vs
 *   accommodation", "narcissism vs high self-esteem" were cut off.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'psychology', keywords, content, createdAt: now,
});

export const PSYCHOLOGY_CONCEPTS_GAPS_4: KnowledgeItem[] = [
  k(
    'kb-gap-psy4-conscious-vs-unconscious',
    'Conscious vs unconscious mind',
    [
      'difference between the conscious and the unconscious mind', 'the conscious mind is the small part you are currently aware of deliberate attention reasoning inner speech decision-making', 'the unconscious mind runs everything automatic perception face recognition habits motor skills autopilot driving emotional reactions and in the Freudian sense repressed material',
      'automatic processes like recognising a face or driving a familiar route are UNCONSCIOUS not conscious', 'the iceberg metaphor',
    ],
    `The CONSCIOUS mind is the part of mental activity you are AWARE of RIGHT NOW — what you are deliberately attending to, your reasoning, your inner narration, effortful decisions, and the sensations you are noticing. It is limited: you can hold only a few things in mind at once, and it works slowly and serially.

The UNCONSCIOUS (or nonconscious) mind is everything else the brain does WITHOUT your awareness — and it is the vast majority. This includes automatic processes: recognising a face, understanding speech, driving a familiar route "on autopilot", walking, well-practised skills, gut emotional reactions, and the fast pattern-matching that produces intuitions. In the Freudian tradition the unconscious ALSO holds repressed memories, wishes, and conflicts that influence behaviour without our knowing.

A common mistake is to put automatic skills like face recognition or autopilot driving in the CONSCIOUS mind because they feel effortless — in fact they feel effortless BECAUSE they run unconsciously. The classic image is an ICEBERG: the small tip above the water is consciousness; the huge mass below is the unconscious.`,
  ),
  k(
    'kb-gap-psy4-recall-vs-recognition',
    'Recall vs recognition (memory)',
    [
      'difference between recall and recognition memory', 'recall is retrieving information from memory without any cue provided an essay question or naming a capital city from scratch', 'recognition is identifying previously encountered information when it is presented to you a multiple-choice question or picking a face out of a lineup',
      'recognition is usually easier than recall because the cue does part of the work', 'free recall cued recall not the machine-learning metric',
    ],
    `In memory research these are two ways of getting information back OUT of long-term memory (not the machine-learning metric with the same name).

RECALL is retrieving information WITHOUT it being presented to you — you have to produce it from scratch, sometimes with a small cue and sometimes with none ("free recall"). Examples: an essay exam question, being asked "what is the capital of Australia?", trying to remember someone's name, reciting a phone number. It is harder because you must generate the answer yourself.

RECOGNITION is identifying information as familiar or correct WHEN IT IS PLACED IN FRONT OF YOU. Examples: a multiple-choice question, picking the right answer from a list, spotting a suspect in a police line-up, saying "yes, I've read this book before". It is easier because the item itself acts as a powerful retrieval cue.

This is why multiple-choice tests feel easier than essays, why you can often recognise a face without recalling the name, and why "it's on the tip of my tongue" (recall failing) resolves the moment someone says the word (recognition succeeding).`,
  ),
  k(
    'kb-gap-psy4-id-ego-superego',
    'Id, ego, and superego (Freud)',
    [
      'difference between the id the ego and the superego', 'the id is the primitive unconscious source of instinctual drives operating on the pleasure principle wants immediate gratification no regard for reality or morality', 'the ego is the mostly conscious mediator operating on the reality principle satisfies the ids demands realistically and manages conflict using reason and planning',
      'the superego is the internalised moral conscience the rules and ideals of parents and society judges and punishes with guilt strives for perfection', 'the ego balances id superego and reality',
    ],
    `In Sigmund Freud's "structural model" of the psyche, the mind has three interacting parts:

The ID is the oldest and entirely UNCONSCIOUS part — the reservoir of basic instinctual drives (hunger, sex, aggression, comfort). It runs on the PLEASURE PRINCIPLE: it wants what it wants NOW, with no regard for reality, consequences, logic, or right and wrong. A newborn is almost pure id.

The SUPEREGO is the internalised MORAL authority — the rules, prohibitions, and ideals absorbed from parents and society during childhood. It has two sides: the "conscience" that punishes transgressions with GUILT, and the "ego-ideal" that holds up a standard of perfection to live up to. It is often harsh and unrealistic.

The EGO is the largely CONSCIOUS executive that develops to deal with the real world. It runs on the REALITY PRINCIPLE: it tries to satisfy the id's demands in ways that are realistic, safe, and socially acceptable, using reason, planning, and (when overwhelmed) defence mechanisms. Its constant job is to BALANCE three pressures at once — the id's "I want it", the superego's "that's forbidden", and reality's "here's what's actually possible". Anxiety, in this model, is the ego's alarm signal that it is losing that balance.`,
  ),
  k(
    'kb-gap-psy4-neurosis-vs-psychosis',
    'Neurosis vs psychosis',
    [
      'difference between a neurosis and a psychosis', 'neurosis is an older informal term for mild to moderate mental distress chronic anxiety phobias obsessive thoughts mild depression where the person stays in touch with reality has insight and can generally function', 'psychosis is a severe state of losing contact with reality hallucinations delusions and disorganised thinking or speech usually with poor insight',
      'neurosis was dropped from the DSM psychosis remains a core clinical concept in schizophrenia bipolar mania severe depression drug effects',
    ],
    `NEUROSIS is an older term (now mostly informal, and dropped from the DSM) for relatively MILD-TO-MODERATE psychological distress: chronic anxiety, phobias, obsessive or intrusive thoughts, compulsions, mild-to-moderate depression, hypochondria. The defining feature is that the person STAYS IN TOUCH WITH REALITY, usually KNOWS something is wrong (has "insight"), is distressed by it, and can generally still work and function, even if life is difficult. In Freudian theory neuroses were seen as arising from unresolved unconscious conflict and repressed anxiety.

PSYCHOSIS is a SEVERE state in which a person LOSES CONTACT WITH REALITY. Its core symptoms are:
- HALLUCINATIONS — perceiving things that are not there (hearing voices, seeing things);
- DELUSIONS — fixed false beliefs held despite clear contrary evidence (being persecuted, having special powers);
- DISORGANISED thinking and speech, and sometimes disorganised or catatonic behaviour.
Crucially, the person usually LACKS INSIGHT — they experience the hallucinations and delusions as real. Psychosis is a feature of schizophrenia, bipolar disorder in a manic or severe depressive episode, severe depression with psychotic features, delirium, and some drug intoxications and withdrawals.

Short version: neurosis = distress with reality-testing intact; psychosis = a break with reality itself.`,
  ),
  k(
    'kb-gap-psy4-motivation-vs-willpower',
    'Motivation vs willpower',
    [
      'difference between motivation and willpower', 'motivation is the overall drive or desire to act toward a goal it can be intrinsic interest and enjoyment or extrinsic rewards and avoiding punishment the want to', 'willpower self-control is the capacity to override impulses resist temptation and make yourself act regardless of how you feel the make yourself',
      'high motivation reduces the need for willpower', 'willpower is often described as effortful and limited carries you through the boring or hard parts',
    ],
    `MOTIVATION is the overall DRIVE or desire that gets you moving toward a goal — the "want to". It has sources: INTRINSIC motivation comes from genuine interest, enjoyment, or meaning in the activity itself; EXTRINSIC motivation comes from outside — money, grades, praise, deadlines, or avoiding punishment. Strong motivation makes action feel pulled rather than forced.

WILLPOWER (self-control, self-regulation) is the CAPACITY to override an impulse, resist a temptation, delay gratification, or push yourself to do something IN THE MOMENT regardless of how you feel about it — the "make yourself". It is what gets you to the gym when you don't feel like it, stops you checking your phone, or keeps you working on a boring task.

The relationship: they trade off. When motivation is HIGH — you find the task interesting or urgent — you barely need willpower; the behaviour flows. Willpower is what you fall back on when motivation is LOW and the task is still worth doing. Willpower also feels EFFORTFUL and is often described as a limited resource that runs down over a demanding day (the "ego depletion" idea, though psychologists now debate how real that effect is). A good strategy is to rely less on willpower by building motivation, habits, and an environment that removes temptation.`,
  ),
  k(
    'kb-gap-psy4-adhd-vs-add',
    'ADHD vs ADD',
    [
      'difference between ADHD and ADD', 'ADD attention deficit disorder is an outdated term', 'the current diagnosis is ADHD attention-deficit hyperactivity disorder with three presentations predominantly inattentive predominantly hyperactive-impulsive and combined',
      'what people call ADD is the predominantly inattentive presentation of ADHD trouble focusing disorganised forgetful without prominent hyperactivity', 'ADD is not a separate condition it is the old name for one type of ADHD',
    ],
    `"ADD" (Attention Deficit Disorder) is an OUTDATED name. It is not a separate condition from ADHD.

The current diagnosis is ADHD — Attention-Deficit/Hyperactivity Disorder — and it comes in THREE "presentations":
1. predominantly INATTENTIVE presentation: difficulty sustaining attention, easily distracted, disorganised, forgetful, loses things, seems not to listen, avoids tasks needing sustained mental effort — WITHOUT much hyperactivity or impulsivity.
2. predominantly HYPERACTIVE-IMPULSIVE presentation: fidgeting, restlessness, can't stay seated, talks excessively, interrupts, acts without thinking — without prominent inattention.
3. COMBINED presentation: significant symptoms of both.

What people used to call "ADD" is essentially the predominantly INATTENTIVE presentation of ADHD — the person who "spaces out", struggles to focus and organise, but doesn't visibly bounce off the walls. The name was changed in the DSM decades ago because research showed inattention and hyperactivity-impulsivity are part of one disorder with a shared basis, just with different symptom profiles (and the profile can shift with age — hyperactivity often fades while inattention persists). Many people still say "ADD" informally to mean inattentive ADHD.`,
  ),
  k(
    'kb-gap-psy4-psychology-vs-psychiatry',
    'Psychology vs psychiatry',
    [
      'difference between psychology and psychiatry', 'psychiatry is a branch of medicine psychiatrists are physicians who diagnose and treat mental illness can prescribe medication order tests and lean on the biological medical model', 'psychology is the scientific study of mind and behaviour a much broader field clinical psychologists provide psychotherapy and psychological testing but usually cannot prescribe',
      'psychology also covers cognitive developmental social and research psychology not tied to treating illness', 'often work together the psychiatrist manages medication the psychologist does the therapy',
    ],
    `PSYCHIATRY is a branch of MEDICINE. A psychiatrist is a fully qualified physician (medical degree plus specialist training) who diagnoses and treats MENTAL ILLNESS. Psychiatrists can PRESCRIBE medication, order blood tests and brain scans, admit patients to hospital, and administer treatments like ECT. Their training emphasises the biological/medical model — brain chemistry, genetics, drug treatment — though many also do psychotherapy.

PSYCHOLOGY is the SCIENTIFIC STUDY of the mind and behaviour, and it is a much BROADER field. It includes cognitive psychology (memory, attention, perception), developmental psychology, social psychology, and research/experimental psychology — much of which has nothing to do with treating illness. Within it, CLINICAL and COUNSELLING psychologists (usually with a doctorate, PhD or PsyD) assess and treat psychological problems mainly through PSYCHOTHERAPY (talking therapies like CBT) and through psychological TESTING (IQ, personality, neuropsychological assessment). In most places psychologists CANNOT prescribe drugs (a few US states now allow specially trained ones to).

In practice the two often work together: a psychiatrist manages the medication, a psychologist provides the therapy, and both may be involved in diagnosis.`,
  ),
  k(
    'kb-gap-psy4-cbt-vs-psychoanalysis',
    'CBT vs psychoanalysis',
    [
      'difference between CBT and psychoanalysis', 'CBT cognitive behavioural therapy is structured short-term 12 to 20 sessions present-focused goal-oriented identifies and changes unhelpful thought patterns and behaviours strong evidence base with homework between sessions', 'psychoanalysis is long-term often years multiple sessions a week intensive exploration of unconscious conflicts childhood experiences dreams and the therapy relationship transference to gain insight the analyst is relatively neutral and interpretive',
      'CBT fix the thinking and behaviour now psychoanalysis understand the deep roots', 'psychodynamic therapy is a shorter less intensive descendant of psychoanalysis',
    ],
    `CBT (Cognitive Behavioural Therapy) is STRUCTURED, SHORT-TERM, and focused on the PRESENT. A typical course is about 12-20 weekly sessions with specific goals. The therapist is active and collaborative, and the work targets the here-and-now: identifying the unhelpful THOUGHT patterns (catastrophising, all-or-nothing thinking) and BEHAVIOURS (avoidance) that maintain a problem, testing those thoughts against evidence, and practising new behaviours — usually with "homework" between sessions. It has a large research evidence base, especially for anxiety disorders and depression. It does not require exploring your childhood.

PSYCHOANALYSIS (Freud's method) is LONG-TERM and INTENSIVE — often several years, with two to five sessions a week, sometimes with the patient on a couch. It aims for deep INSIGHT: uncovering UNCONSCIOUS conflicts, wishes, and defences, largely rooted in CHILDHOOD, through free association, analysis of DREAMS and slips, and above all the analysis of TRANSFERENCE (the feelings the patient unconsciously redirects onto the analyst). The analyst is relatively neutral and mostly interprets rather than advises.

Between them sits PSYCHODYNAMIC THERAPY — a shorter, less intensive, face-to-face descendant of psychoanalysis that keeps the focus on unconscious patterns and relationships but over months rather than years.

Short version: CBT changes how you think and act now; psychoanalysis excavates why, over a long time.`,
  ),
  k(
    'kb-gap-psy4-assimilation-vs-accommodation',
    "Assimilation vs accommodation (Piaget)",
    [
      'difference between assimilation and accommodation in Piagets theory', 'a schema is a mental framework for understanding something', 'assimilation is fitting new information into an existing schema without changing it a child calls a cat a dog because it is furry and four-legged',
      'accommodation is changing an existing schema or creating a new one to fit information that does not fit forming a separate cat schema', 'learning is the constant interplay of both driven by disequilibrium toward equilibration',
    ],
    `In Jean Piaget's theory of cognitive development, a child builds understanding through mental structures called SCHEMAS (frameworks for a category of thing or action). Two complementary processes update those schemas:

ASSIMILATION: taking in new information and fitting it into an EXISTING schema WITHOUT changing the schema. A toddler who has a schema for "doggy" (furry, four legs, tail) sees a cat and calls it "doggy" — the new experience is absorbed into what they already know. It is interpreting the new in terms of the old.

ACCOMMODATION: CHANGING an existing schema, or creating a NEW one, because the new information genuinely does not fit. When the toddler learns that cats meow, are smaller, and behave differently, they either revise the "doggy" schema to be narrower or build a separate "cat" schema. It is changing your understanding to match reality.

The engine is DISEQUILIBRIUM — the mental discomfort when something won't fit your current schemas. That discomfort pushes the child to accommodate, restoring EQUILIBRATION (a better fit between mind and world). Real learning is a continuous back-and-forth of assimilation and accommodation.`,
  ),
  k(
    'kb-gap-psy4-narcissism-vs-self-esteem',
    'Narcissism vs high self-esteem',
    [
      'difference between narcissism and high self-esteem', 'healthy high self-esteem is a stable secure realistic positive regard for oneself does not need constant external validation can accept criticism and others success worth does not depend on being superior', 'narcissism is a grandiose but fragile self-image that requires constant admiration involves entitlement superiority lack of empathy exploiting others and intense rage or shame at criticism narcissistic injury',
      'high self-esteem is secure and does not diminish others narcissism is defensive and depends on others being inferior',
    ],
    `They can look similar from outside — both involve a positive view of oneself — but they work completely differently underneath.

HEALTHY HIGH SELF-ESTEEM is STABLE and SECURE. You genuinely value yourself, and that sense of worth is fairly steady and REALISTIC (you know your strengths and your flaws). Because it does not depend on constant proof, a person with healthy self-esteem can take criticism without falling apart, can be genuinely happy for other people's success, does not need to put others down, and does not require constant admiration. Their worth is not contingent on being the best.

NARCISSISM (in the clinical sense, Narcissistic Personality Disorder, and in milder trait form) is a GRANDIOSE but FRAGILE self-image. It runs on a constant need for ADMIRATION and external validation, a sense of ENTITLEMENT and SUPERIORITY, a lack of genuine EMPATHY, a tendency to exploit or use others, envy, and — the giveaway — an intense, disproportionate reaction to any criticism or perceived slight ("narcissistic injury"): rage, contempt, or a collapse into shame. The self-regard is DEFENSIVE and often depends on seeing others as inferior.

Short version: healthy self-esteem is a secure floor you stand on; narcissism is an inflated balloon that needs constant air and pops when pricked.`,
  ),
  k(
    'kb-gap-psy4-autism-vs-aspergers',
    "Autism vs Asperger's",
    [
      'difference between autism and Aspergers', 'Aspergers syndrome was a diagnosis for autistic people with no language delay and no intellectual disability average or above intelligence but with social communication differences and restricted repetitive interests', 'in the DSM-5 2013 and ICD-11 2022 Aspergers was merged into a single autism spectrum disorder ASD with severity levels',
      'so Aspergers is no longer a separate diagnosis it is part of the autism spectrum', 'some people still self-identify as Aspergers or Aspie the name is also avoided by many because of Hans Aspergers history',
    ],
    `They are not two different conditions — Asperger's is now considered PART of autism.

Historically, ASPERGER'S SYNDROME was a diagnosis for people who had the core features of autism — differences in social interaction and communication, and restricted, repetitive interests and behaviours — but WITHOUT a language delay in early childhood and WITHOUT intellectual disability (average or above-average IQ). It was often described as "milder" or "high-functioning" autism, associated with fluent speech, strong vocabulary, and intense specialist interests, alongside difficulty reading social cues, literal interpretation, and a need for routine.

In 2013 the DSM-5 (and in 2022 the ICD-11) removed Asperger's as a separate label and folded it, along with several other diagnoses, into a single AUTISM SPECTRUM DISORDER (ASD), described with severity/support levels (1, 2, 3) and specifiers (with or without language impairment, with or without intellectual disability). The reasoning was that the boundary between "Asperger's" and "autism" was inconsistent and unreliable, and that these are points on one continuum.

So today someone who would once have been told "Asperger's" is diagnosed with "autism spectrum disorder", often "level 1" or "without accompanying intellectual or language impairment". Many autistic adults still self-identify as "Aspie", while others deliberately avoid the term because of Hans Asperger's documented ties to Nazi-era programmes.`,
  ),
  k(
    'kb-gap-psy4-anxiety-vs-stress',
    'Anxiety vs stress',
    [
      'difference between anxiety and stress', 'stress is the response to an identifiable external demand or pressure a deadline a move an exam and it usually eases once the stressor passes', 'anxiety is persistent apprehension and worry often without a clear present threat anticipatory future-focused and it continues even when nothing is currently wrong',
      'stress can be motivating in short bursts anxiety when chronic is a mental health concern generalised anxiety disorder', 'both involve the same fight or flight physiology',
    ],
    `STRESS is the body and mind's RESPONSE to an identifiable external DEMAND or pressure — a looming deadline, a job interview, moving house, a difficult relationship, too much to do. It has a CAUSE you can usually point to, and it typically EASES once that stressor is dealt with or passes. In short bursts stress is normal and can even sharpen focus and performance ("eustress"); it becomes harmful mainly when it is intense and unrelenting.

ANXIETY is persistent APPREHENSION, worry, or unease that is often NOT tied to a specific present threat. It is ANTICIPATORY and FUTURE-focused ("what if..."), it can arise with no clear trigger, and it tends to CONTINUE even when circumstances are objectively fine — sometimes attaching itself to one thing after another. It commonly comes with physical symptoms (racing heart, tension, restlessness, poor sleep) and, when chronic and disproportionate, becomes an anxiety disorder (generalised anxiety disorder, panic disorder, phobias).

Both use the same underlying "fight or flight" physiology. The rough distinction: stress says "there is a real thing bearing down on me right now"; anxiety says "something bad might happen" and won't switch off. Chronic stress is a common route INTO an anxiety problem.`,
  ),
  k(
    'kb-gap-psy4-dissonance-vs-hypocrisy',
    'Cognitive dissonance vs hypocrisy',
    [
      'difference between cognitive dissonance and hypocrisy', 'cognitive dissonance is an internal psychological state the uncomfortable tension from holding two conflicting beliefs or acting against a belief plus the drive to reduce it by changing a belief rationalising or changing behaviour', 'hypocrisy is an external behavioural judgement claiming moral standards or beliefs that your own actions contradict',
      'dissonance is felt by the person hypocrisy is observed by others', 'a hypocrite may or may not feel dissonance', 'Festinger 1957',
    ],
    `COGNITIVE DISSONANCE is an INTERNAL psychological STATE, described by Leon Festinger (1957): the uncomfortable mental tension you feel when you hold two contradictory beliefs at once, or when your BEHAVIOUR clashes with your VALUES (a smoker who believes smoking is deadly; someone who paid a lot for something disappointing). The mind is motivated to REDUCE that discomfort, and it does so — often unconsciously — by changing one of the beliefs, adding justifications, downplaying the conflict, or occasionally changing the behaviour. It is a process happening inside one person's head, and they genuinely feel it.

HYPOCRISY is an EXTERNAL, MORAL JUDGEMENT about a person: professing beliefs, standards, or virtues that your own conduct contradicts — condemning a behaviour you secretly practise, preaching honesty while lying. It is something OTHERS observe and label; whether the hypocrite feels any internal discomfort is a separate question.

The relationship: acting hypocritically is a classic TRIGGER for cognitive dissonance — which is why hypocrisy so often comes packaged with elaborate rationalisations and defensiveness (the person reducing their dissonance). But a person can feel dissonance without being a hypocrite (any hard choice creates it), and — worryingly — a practised hypocrite may feel little dissonance at all if they have rationalised it away. Dissonance is the feeling; hypocrisy is the inconsistency others can see.`,
  ),
];
