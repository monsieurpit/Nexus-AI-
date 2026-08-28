import { KnowledgeItem } from '../../types';

export const AUTOIMMUNE_DISEASES_EXPLAINED_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-immunology-autoimmune-disease',
    title: 'What Is an Autoimmune Disease?',
    category: 'Health & Medicine',
    keywords: ['what is an autoimmune disease', 'how does autoimmune disease work', 'rheumatoid arthritis lupus autoimmune', 'why does the immune system attack the body'],
    content: `An **autoimmune disease** occurs when the immune system — normally responsible for identifying and attacking foreign threats like bacteria and viruses — mistakenly identifies the body's own healthy cells and tissues as a threat and attacks them instead. Under normal circumstances, the immune system learns during development to distinguish "self" from "non-self," but in autoimmune conditions, this recognition process breaks down for reasons that are often only partially understood, involving a complex interplay of genetic predisposition, environmental triggers (certain infections have been linked to triggering autoimmune responses in genetically susceptible people), and hormonal factors — many autoimmune diseases disproportionately affect women, suggesting a hormonal component researchers continue investigating. There are over 80 recognized autoimmune diseases, varying widely in which tissues they target: **rheumatoid arthritis** attacks the joints, causing painful inflammation and, over time, joint damage; **lupus** can affect multiple organ systems at once, including skin, joints, kidneys, and the cardiovascular system, making it notoriously variable and sometimes difficult to diagnose; **type 1 diabetes** involves the immune system destroying insulin-producing cells in the pancreas; **multiple sclerosis** attacks the protective coating around nerve fibers in the brain and spinal cord, disrupting nerve signal transmission; and **celiac disease** triggers an immune response against the small intestine specifically when gluten is consumed. Most autoimmune diseases aren't curable but are manageable with treatments that typically work by carefully suppressing or modulating the overactive immune response, aiming to reduce symptoms and prevent long-term tissue damage while trying to preserve the immune system's ability to still fight genuine infections.`,
    createdAt: Date.now(),
  },
];
