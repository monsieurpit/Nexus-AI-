import { KnowledgeItem } from '../../types';

// Batch 276 corpus fixes — biology/animals/environment topics. Strong domain, only 3/25 misses.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'biology',
  keywords,
  content,
  createdAt: now,
});

export const BIOLOGY_ANIMALS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-bio-shark-vs-dolphin',
    'Shark vs dolphin',
    ['shark', 'dolphin', 'difference shark dolphin'],
    "A dolphin is a mammal (specifically a toothed whale) — it breathes air through lungs and must surface regularly to breathe, gives birth to live young, and nurses them with milk. A shark is a fish — it breathes through gills underwater, has a skeleton made of cartilage instead of bone, and most species lay eggs or give birth to live young without nursing them. Size varies hugely on both sides: some sharks (like the whale shark) are far bigger than any dolphin, while some sharks (like the dwarf lanternshark) are smaller than a dolphin — size isn't the defining difference at all. The real distinction is mammal-vs-fish (breathing, skeleton, and reproduction), not size.",
  ),
  k(
    'kb-gap-bio-wolf-vs-coyote',
    'Wolf vs coyote',
    ['wolf', 'coyote', 'difference wolf coyote'],
    "Wolves and coyotes are both canids but differ mainly in size and behavior. Gray wolves are much larger and heavier (roughly 80-150 lbs / 36-70 kg), have broader skulls and shorter, more rounded ears, hunt in structured packs to take down large prey like elk or deer, and are apex predators. Coyotes are considerably smaller (roughly 20-50 lbs / 9-23 kg), have narrower snouts and larger, more pointed ears relative to their head size, are far more adaptable (thriving even in cities and suburbs, unlike wolves which need large wild territories), and typically hunt alone or in small family groups for smaller prey like rodents and rabbits rather than big game.",
  ),
  k(
    'kb-gap-bio-herbivore-vs-vegetarian',
    'Herbivore vs vegetarian',
    ['herbivore', 'vegetarian', 'difference herbivore vegetarian'],
    "A herbivore is a biological classification: an animal whose digestive system and anatomy are built specifically to eat only plants (like cows, rabbits, and elephants) — it's not a choice, it's how the species evolved to survive, and most herbivores physically cannot digest meat well even if they tried. 'Vegetarian' is a human dietary CHOICE, not a biological classification — a person chooses to avoid eating meat for ethical, health, religious, or environmental reasons, even though humans are biologically omnivores capable of digesting both plants and meat. Another key difference: many vegetarians still eat animal-derived products like dairy, eggs, or honey (they just avoid the animal's flesh), which wouldn't make sense as a description of a true herbivore's diet in nature.",
  ),
];
