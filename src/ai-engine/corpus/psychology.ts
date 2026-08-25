import { KnowledgeItem } from '../../types';

export const PSYCHOLOGY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-psychology-cognitive',
    title: 'Cognitive Psychology: Memory, Attention, and Thinking',
    category: 'Psychology',
    keywords: ['cognitive psychology', 'memory', 'attention', 'thinking', 'bias', 'language', 'perception', 'learning', 'brain'],
    content: `Cognitive psychology studies mental processes: perception, attention, memory, language, problem-solving, and reasoning. Memory has multiple systems. Sensory memory holds perceptions for <1 second (iconic, echoic). Short-term (working) memory holds ~7±2 items for seconds to minutes; George Miller's 'magical number seven.' Long-term memory is virtually unlimited: declarative (explicit) memory includes episodic (personal events) and semantic (facts); procedural (implicit) memory stores skills and habits. Encoding (transferring to long-term memory) is enhanced by elaborative rehearsal, spaced repetition, and retrieval practice. Forgetting follows Ebbinghaus's forgetting curve. Attention is selective — the cocktail party effect (hearing your name across the room). Inattentional blindness (Simons's invisible gorilla experiment) demonstrates that unattended stimuli are often missed. Cognitive biases (confirmation bias, availability heuristic) systematically distort reasoning. Language and thought are deeply related — the Sapir-Whorf hypothesis suggests language shapes thought. Problem-solving uses algorithms (guaranteed solution) and heuristics (mental shortcuts). Cognitive psychology informs education, UX design, AI, and mental health treatment (CBT).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-psychology-developmental',
    title: 'Developmental Psychology: Growth Through Life',
    category: 'Psychology',
    keywords: ['developmental psychology', 'Piaget', 'Vygotsky', 'Erikson', 'attachment', 'Bowlby', 'childhood', 'adolescence', 'aging'],
    content: `Developmental psychology studies how people change throughout their lives. Jean Piaget identified cognitive development stages: sensorimotor (0–2 years, exploring through senses and actions), preoperational (2–7, language and symbolic thought but egocentric), concrete operational (7–11, logical thinking about concrete objects), and formal operational (12+, abstract reasoning). Lev Vygotsky emphasised social learning; his zone of proximal development (ZPD) is the gap between what a child can do alone and with guidance — where learning happens best. Erik Erikson proposed eight psychosocial stages across the lifespan, each involving a central conflict (trust vs. mistrust in infancy; identity vs. role confusion in adolescence; integrity vs. despair in old age). John Bowlby's attachment theory describes how early infant-caregiver bonds form an internal working model affecting all future relationships. Secure attachment (responsive caregiving) correlates with better emotional regulation and social competence. Adolescence brings identity formation, peer influence, and brain development (prefrontal cortex last to mature, explaining risk-taking). Healthy ageing research identifies factors sustaining cognition, well-being, and social connection.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-psychology-social',
    title: 'Social Psychology: Groups, Influence, and Behaviour',
    category: 'Psychology',
    keywords: ['social psychology', 'conformity', 'Milgram', 'obedience', 'Asch', 'group', 'attribution', 'persuasion', 'prejudice'],
    content: `Social psychology examines how people's thoughts, feelings, and behaviours are influenced by others. Solomon Asch's conformity experiments (1951) showed that individuals conform to incorrect group consensus even when they can clearly see the right answer — ~75% conformed at least once. Stanley Milgram's obedience experiments (1961) demonstrated that ordinary people would administer apparently dangerous electric shocks when ordered by an authority figure — ~65% delivered the maximum shock. Philip Zimbardo's Stanford Prison Experiment showed how roles and situations powerfully shape behaviour — participants quickly adopted guard/prisoner identities. Attribution theory studies how people explain behaviour: the fundamental attribution error over-attributes others' behaviour to personality and under-attributes to situational factors. Group dynamics include groupthink (cohesion suppresses dissent), social facilitation (performing better with an audience), social loafing (working less in groups), and deindividuation (losing self-awareness in crowds). Attitude change is studied through cognitive dissonance (discomfort from inconsistent beliefs/actions) and persuasion techniques. Bystander effect: individuals are less likely to help in emergencies when others are present.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-psychology-study-techniques',
    title: 'Effective Study Techniques That Actually Work',
    category: 'Psychology',
    keywords: ['study technique', 'how to study', 'studying tips', 'active recall', 'spaced repetition', 'pomodoro', 'memorization', 'focus while studying', 'exam prep'],
    content: `Research on learning consistently points to a small set of study techniques that actually outperform the ones most students default to. Active recall — testing yourself on material instead of just re-reading or highlighting it — is the single most effective technique; forcing your brain to retrieve information strengthens the memory far more than passively looking at it again. Practice with flashcards, past exam questions, or simply closing the book and writing out everything you remember. Spaced repetition means reviewing material at increasing intervals (a day later, then a few days, then a week) instead of cramming it all at once — this fights the natural forgetting curve, where most of what you learn fades within 24 hours without reinforcement. Interleaving — mixing different topics or problem types in one study session instead of drilling one thing at a time — improves your ability to actually distinguish between concepts and apply the right method, even though it feels harder in the moment. The Pomodoro Technique (25 minutes of focused work, then a 5-minute break, repeated) helps manage focus and avoid burnout during long study sessions. Passive techniques that feel productive but show weak results in research include re-reading notes, highlighting text, and cramming the night before — they build familiarity, not real retrieval strength. Teaching the material to someone else (or explaining it out loud as if you were teaching it) is also a strong technique, since it exposes gaps in understanding that silent review hides. Sleep matters too: memory consolidation happens during sleep, so an all-nighter before an exam usually hurts recall more than it helps.`,
    createdAt: Date.now(),
  },
];
