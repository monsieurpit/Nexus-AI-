import { KnowledgeItem } from '../../types';

export const SLEEP_DISORDERS_EXPLAINED_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-sleep-insomnia-apnea',
    title: 'Insomnia and Sleep Apnea Explained',
    category: 'Health & Medicine',
    keywords: ['what is insomnia', 'what is sleep apnea', 'cpap machine sleep apnea', 'chronic insomnia causes'],
    content: `**Insomnia** is a sleep disorder involving persistent difficulty falling asleep, staying asleep, or getting restorative sleep, despite having adequate opportunity to do so, resulting in daytime impairment like fatigue, poor concentration, or mood problems. It's considered "chronic" when it occurs at least three nights a week for three months or more; acute, short-term insomnia (often triggered by stress, travel, or temporary life disruptions) is extremely common and usually resolves on its own. Chronic insomnia's causes are often multifactorial, including stress and anxiety, poor sleep habits (irregular schedules, excessive screen use before bed), underlying medical or mental health conditions, and certain medications; the first-line recommended treatment by sleep specialists is typically Cognitive Behavioral Therapy for Insomnia (CBT-I), which addresses the thoughts and habits perpetuating poor sleep, generally considered more effective for long-term improvement than sleep medication alone. **Sleep apnea** is a distinct disorder in which breathing repeatedly stops and starts during sleep — most commonly **obstructive sleep apnea**, where throat muscles relax enough to physically block the airway, causing brief awakenings (often unnoticed by the sleeper) that fragment sleep quality throughout the night, even if total sleep time seems adequate. Common symptoms include loud snoring, gasping or choking sounds during sleep, and persistent daytime fatigue despite a full night in bed. Untreated sleep apnea is linked to increased risk of high blood pressure, heart problems, and daytime accidents from impaired alertness; standard treatment often involves a CPAP (continuous positive airway pressure) machine, which uses gentle air pressure delivered through a mask to keep the airway open throughout the night.`,
    createdAt: Date.now(),
  },
];
