import { KnowledgeItem } from '../../types';

export const TITANIC_AND_FAMOUS_DISASTERS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-disasters-titanic',
    title: 'The Titanic: What Actually Happened',
    category: 'History',
    keywords: ['titanic sinking history', 'why did the titanic sink', 'titanic iceberg 1912', 'titanic unsinkable myth'],
    content: `The **RMS Titanic**, at the time the largest passenger ship ever built, sank in the early hours of April 15, 1912, after striking an iceberg in the North Atlantic during its very first voyage, from Southampton, England, toward New York City. The collision tore open several of the ship's hull compartments, and though the Titanic had been popularly (and, as it turned out, tragically prematurely) described in press coverage as "practically unsinkable" due to its watertight compartment design, the damage was extensive enough that water flooded over the tops of those compartments in sequence, ultimately sinking the ship in under three hours. Of the roughly 2,224 people aboard, more than 1,500 died, making it one of the deadliest peacetime maritime disasters in history — a death toll made far worse by an inadequate number of lifeboats (enough for only about half the passengers and crew, technically compliant with outdated maritime safety regulations of the era that hadn't kept pace with the size of newer ships) and by the ship's distress calls only reaching a nearby vessel too late to arrive before it sank. The disaster led directly to major overhauls in international maritime safety regulation, including requirements for enough lifeboats for everyone aboard and the establishment of a permanent International Ice Patrol to monitor iceberg danger in shipping lanes. The wreck itself wasn't discovered until 1985, resting roughly 3,800 meters (12,500 feet) deep on the ocean floor, and it remains one of history's most culturally enduring disasters, the subject of extensive research, documentaries, and popular media.`,
    createdAt: Date.now(),
  },
];
