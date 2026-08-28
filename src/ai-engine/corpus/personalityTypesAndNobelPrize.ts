import { KnowledgeItem } from '../../types';

export const PERSONALITY_TYPES_AND_NOBEL_PRIZE_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-psychology-mbti-personality',
    title: 'Myers-Briggs (MBTI) and the Big Five: Personality Frameworks Compared',
    category: 'Psychology',
    keywords: ['what is mbti myers-briggs', 'introvert extrovert personality', 'big five personality traits', 'is mbti scientifically valid'],
    content: `The **Myers-Briggs Type Indicator (MBTI)**, developed by Katharine Cook Briggs and her daughter Isabel Briggs Myers in the mid-20th century (loosely inspired by psychologist Carl Jung's theories of psychological type), sorts people into one of 16 personality "types" based on four paired preferences: Introversion/Extroversion (where you draw energy from), Sensing/Intuition (how you take in information), Thinking/Feeling (how you make decisions), and Judging/Perceiving (how you approach structure and planning) — producing labels like "INTJ" or "ESFP." MBTI remains hugely popular in casual settings, workplaces, and pop psychology, but it's widely criticized by the psychological research community for lacking strong scientific validity: it forces people into rigid binary categories rather than measuring traits on a spectrum, test-retest reliability is often poor (many people get a different type when retaking it later), and it doesn't reliably predict real-world outcomes like job performance. The **Big Five (OCEAN) model** — Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism — is the framework most widely accepted and used within actual academic and clinical psychology research today, measuring each trait along a continuous spectrum rather than sorting people into fixed boxes, and it has substantially stronger evidence behind its reliability, consistency across cultures, and correlation with real-world outcomes like job performance, relationship satisfaction, and health behaviors.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-history-nobel-prize',
    title: 'The Nobel Prize: History and Categories',
    category: 'History',
    keywords: ['history of the nobel prize', 'alfred nobel dynamite', 'nobel prize categories', 'what are the nobel prize categories'],
    content: `The **Nobel Prize** was established by the will of **Alfred Nobel**, a Swedish chemist and industrialist who invented dynamite and made a considerable fortune from explosives manufacturing. According to a widely repeated (though not fully verified) account, Nobel was prompted to reconsider his legacy after a French newspaper mistakenly published his obituary years before his actual death (having confused him with his recently deceased brother), harshly labeling him a "merchant of death" for profiting from weapons — an experience that reportedly motivated him to instead be remembered for advancing humanity's benefit. His 1895 will established prizes in Physics, Chemistry, Physiology or Medicine, Literature, and Peace, first awarded in 1901; a sixth prize, in Economic Sciences, was added later, in 1968, funded by Sweden's central bank rather than Nobel's original estate, and is technically termed the "Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel" rather than an original Nobel Prize, though it's almost universally referred to simply as the Nobel Prize in Economics. Prizes (except the Peace Prize, awarded in Oslo, Norway, per Nobel's specific instruction) are awarded annually in Stockholm, Sweden. The Nobel Peace Prize has occasionally proven controversial over the decades, awarded to figures whose later actions or track records some critics argue didn't fully live up to the prize's aims, while other laureates — including Marie Curie, the only person to win Nobel Prizes in two different sciences (Physics and Chemistry) — represent some of history's most universally celebrated intellectual achievements.`,
    createdAt: Date.now(),
  },
];
