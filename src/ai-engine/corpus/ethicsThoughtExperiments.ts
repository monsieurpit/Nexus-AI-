import { KnowledgeItem } from '../../types';

export const ETHICS_THOUGHT_EXPERIMENTS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-ethics-trolley-problem',
    title: 'The Trolley Problem: A Classic Ethics Thought Experiment',
    category: 'Philosophy',
    keywords: ['what is the trolley problem', 'trolley problem explained', 'trolley problem ethics dilemma', 'utilitarianism trolley problem'],
    content: `The **trolley problem** is a classic thought experiment in moral philosophy, originally formulated by philosopher Philippa Foot in 1967 and later expanded by Judith Jarvis Thomson: a runaway trolley is heading toward five people tied to the tracks who will be killed if nothing is done. You're standing next to a lever that can divert the trolley onto a side track, where it will instead kill just one person. Do you pull the lever? Most people say yes — trading one life to save five seems like the better outcome, aligning with **utilitarianism**, the ethical framework that judges actions by their overall consequences and aims to maximize good outcomes (or minimize harm) for the greatest number of people. A variation sharpens the dilemma: instead of a lever, you're standing on a bridge next to a large stranger, and the only way to stop the trolley from killing five people is to push that person off the bridge onto the tracks to physically block it. The outcome (one dies to save five) is mathematically identical to the lever scenario, yet most people say no to pushing — revealing that people's moral intuitions aren't purely about outcomes, but are also shaped by factors like directness of action (pulling a lever versus physically pushing someone) and treating a person merely as a means to an end, concerns central to **deontological ethics**, which judges actions based on adherence to moral rules and duties rather than outcomes alone. The trolley problem remains widely used, including in modern discussions of autonomous vehicle programming (how should a self-driving car be programmed to "choose" in unavoidable accident scenarios), precisely because it exposes genuine, unresolved tension between competing ethical frameworks rather than offering an easy answer.`,
    createdAt: Date.now(),
  },
];
