import { KnowledgeItem } from '../../types';

export const SUBSTANCE_SAFETY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-substances-alcohol-basics',
    title: 'Alcohol Basics: Standard Drinks, BAC, and Alcohol Poisoning Warning Signs',
    category: 'Health & Medicine',
    keywords: [
      'standard drink size', 'blood alcohol content', 'bac basics', 'alcohol poisoning signs',
      'how much alcohol is too much', 'hangover science', 'alcohol safety basics',
    ],
    content: `A "standard drink" (used for consistent guidance across different drink types) is roughly 14 grams of pure alcohol — about a 12 oz regular beer (~5% ABV), a 5 oz glass of wine (~12% ABV), or a 1.5 oz shot of spirits (~40% ABV) — which is why a strong cocktail or a high-ABV craft beer can contain more than one "standard drink" despite looking like a single serving. Blood alcohol content (BAC) rises based on how much you drink, how fast, your body weight, and biological sex (due to average differences in body water percentage and enzyme levels), which is why the same amount affects different people differently — there's no universally "safe" number of drinks that applies to everyone. Alcohol poisoning is a real medical emergency, not just "being really drunk" — warning signs include confusion, vomiting, seizures, slow or irregular breathing (fewer than 8 breaths a minute, or 10+ seconds between breaths), pale or bluish skin, low body temperature, and being unable to be woken up. If someone shows these signs: call emergency services, keep them sitting up or on their side (never on their back, to prevent choking if they vomit while unconscious), and stay with them — "sleeping it off" is a dangerous myth in this situation since BAC can continue rising for a while even after someone stops drinking or passes out, as alcohol already in the stomach keeps absorbing. A hangover (headache, nausea, fatigue) comes from a combination of dehydration, alcohol's toxic byproducts (like acetaldehyde), disrupted sleep quality, and low blood sugar — hydrating well and eating before/during drinking measurably reduces severity, though the only fully reliable prevention is drinking less.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-substances-caffeine-energy-drinks',
    title: 'Caffeine and Energy Drinks: How Much Is Actually Too Much',
    category: 'Health & Medicine',
    keywords: [
      'how much caffeine is safe', 'energy drink safety', 'caffeine overdose symptoms', 'caffeine tolerance',
      'energy drinks basics', 'caffeine crash',
    ],
    content: `Most major health authorities (e.g. the FDA) cite roughly 400mg of caffeine a day as a generally safe upper limit for a healthy adult — for reference, a typical 8 oz cup of coffee has about 95mg, while a single energy drink can range widely from around 80mg up to 300mg+ depending on the brand and can size, so it's easy to underestimate total daily intake when combining coffee, tea, energy drinks, and pre-workout supplements without checking labels. Caffeine has a half-life of roughly 5-6 hours in most people (meaning half of it is still in your system that long after consumption), which is why drinking it in the afternoon commonly disrupts that night's sleep even if you don't consciously feel "wired" at bedtime. Symptoms of taking in too much caffeine include rapid heartbeat, jitteriness/anxiety, nausea, and trouble sleeping; genuinely dangerous caffeine overdose (much higher doses, especially from concentrated powders/liquids rather than normal beverages) is rare but real, and mixing high caffeine intake with alcohol is specifically discouraged since the stimulant can mask how intoxicated you actually feel, leading to drinking more than you'd otherwise realize. A "caffeine crash" (fatigue/irritability as it wears off) is a real, common effect, and regular daily use builds tolerance — meaning the same amount produces less effect over time, which is also why abruptly stopping regular caffeine intake commonly causes withdrawal headaches for a few days.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-substances-harm-reduction-basics',
    title: 'Harm Reduction Basics: Practical Safety Principles',
    category: 'Health & Medicine',
    keywords: [
      'harm reduction', 'never mix depressants', 'overdose warning signs', 'substance safety basics',
      'when to call for help drugs alcohol', 'mixing substances danger',
    ],
    content: `Harm reduction is a public-health approach focused on reducing real-world risks and harms for people who use substances, rather than assuming abstinence is the only acceptable message — used by many health organizations because it meets people where they actually are and measurably reduces deaths and injuries. The single most consistently repeated harm reduction principle: never combine multiple depressants (alcohol, opioids, and benzodiazepines/sedatives all suppress breathing and heart rate) — combining them doesn't just add their effects, it compounds respiratory depression risk in a way that's a leading cause of overdose deaths specifically because people underestimate how dangerous the COMBINATION is compared to either substance alone. Using around at least one other sober, trusted person (rather than completely alone) means someone can recognize an emergency and act — a huge share of preventable overdose deaths happen when a person is alone with no one to notice or call for help in time. Universal overdose/emergency warning signs worth knowing regardless of the specific substance: unresponsiveness, abnormal or stopped breathing, blue-tinged lips or fingertips, and seizures — any of these warrants calling emergency services immediately, not waiting to see if it passes. Many regions have "Good Samaritan" laws that provide legal protection for the caller and the person needing help when calling emergency services during an overdose, specifically to remove the fear of legal trouble as a barrier to calling for help — worth knowing your local laws. None of this is an endorsement of substance use — it's the same category of information as wearing a seatbelt: reducing real-world harm regardless of the underlying choice already made.`,
    createdAt: Date.now(),
  },
];
