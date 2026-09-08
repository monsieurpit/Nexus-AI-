import { KnowledgeItem } from '../../types';

// Batch 42 (common misconceptions) gap-fills. This category scored very well
// (~22/25). The three misses: "can you catch a cold from being cold" ->
// answered vitamin C instead; "is Mount Everest the closest point to space" ->
// opened with "yeah it is" before contradicting itself with Chimborazo;
// "do ostriches bury their heads in the sand" -> "The ostrich effect... coined
// by Dan Galai and Orly Sade" web dump.
export const MISCONCEPTIONS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-cold-from-being-cold',
    title: 'Can You Catch a Cold From Being Cold?',
    category: 'Misconceptions',
    keywords: [
      'can you catch a cold from being cold', 'does cold weather make you sick', 'do you get sick from wet hair',
      'why do people get more colds in winter', 'does being cold weaken your immune system', 'go outside with wet hair and catch a cold',
    ],
    content: `Not directly. Colds are caused by viruses (mostly rhinoviruses) — you can only "catch a cold" from a virus, so going out in the cold, having wet hair, or sitting in a draft will not by itself give you one if no virus is around. That said, the link between cold weather and colds isn't purely a myth: people spend more time indoors together in winter, which spreads respiratory viruses; low indoor humidity from heating dries the nasal passages and helps some viruses survive longer in the air; and there's evidence that chilling the nose lowers the local temperature enough to modestly blunt the immune response of the cells lining it, so an infection you're exposed to may take hold more easily. So cold conditions can tip the odds, but the virus is still required — you won't get sick from cold alone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-everest-closest-to-space',
    title: 'Is Mount Everest the Closest Point to Space?',
    category: 'Misconceptions',
    keywords: [
      'is mount everest the closest point to space', 'what mountain is closest to space', 'chimborazo vs everest',
      'what is the highest point above earth centre', 'is everest the point closest to the moon', 'farthest point from the centre of the earth',
    ],
    content: `No. Mount Everest is the highest point above SEA LEVEL (8,849 m), but it is not the point on Earth's surface closest to space or farthest from Earth's centre. That title goes to Mount Chimborazo in Ecuador. Earth is not a perfect sphere — it bulges at the equator by about 21 km because of its spin — and Chimborazo sits almost on the equator, so even though its summit is "only" 6,263 m above sea level, it is about 2,000 m farther from the centre of the Earth than Everest's summit is, and therefore closer to outer space (and to the Moon). If instead you measure a mountain from its own base to its peak, Mauna Kea in Hawai'i is the tallest, rising ~10,200 m from the sea floor.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ostrich-head-sand',
    title: 'Do Ostriches Bury Their Heads in the Sand?',
    category: 'Misconceptions',
    keywords: [
      'do ostriches bury their heads in the sand', 'is the ostrich head in sand a myth', 'what do ostriches do when scared',
      'why does it look like an ostrich buries its head', 'ostrich defense behavior', 'do ostriches hide their heads',
    ],
    content: `No — ostriches do not bury their heads in the sand, and they couldn't breathe if they did. The myth comes from a few real behaviours seen from a distance: ostriches dig shallow nests in the ground and regularly put their heads down into the hole to turn and check the eggs, which from far away can look like the head has "disappeared" into the sand; they also lower their heads to graze; and when a predator is near, an ostrich may flatten itself on the ground with its neck stretched flat, so its pale head and neck blend with the sandy ground while it stays still and watches. If that doesn't work, an ostrich's real defence is to run — up to about 70 km/h, the fastest of any bird — or to deliver a powerful, potentially lethal kick with its clawed feet. The saying "to bury your head in the sand," meaning to ignore an obvious problem, is based purely on the legend, not on real ostrich behaviour.`,
    createdAt: Date.now(),
  },
];
