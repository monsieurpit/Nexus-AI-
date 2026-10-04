import { KnowledgeItem } from '../../types';

/**
 * AVIATION_PROCEDURES — Patrick taught Nexus how to start an A320's engines (2026-10-03) and asked for it to be in
 * the corpus "at least", on top of the learning system. Simplified flight-sim / general-knowledge level, not
 * real-world training material.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'aviation', keywords, content, createdAt: now,
});

export const AVIATION_PROCEDURES: KnowledgeItem[] = [
  k(
    'kb-aviation-a320-engine-start',
    'How to start the engines on an Airbus A320 (cold and dark to engines running)',
    [
      'how to start engines on airbus a320', 'a320 engine start procedure', 'how do you start an a320', 'a320 cold and dark startup', 'start engines a320 msfs', 'a320 apu start', 'airbus engine start sequence',
      'how to start a plane engine airbus', 'a320 startup checklist', 'which engine starts first on a320',
    ],
    `Airbus A320 engine start, simplified (as Patrick taught it; flight-sim / general level): 1) Power: BAT 1 and BAT 2 pushbuttons ON on the overhead panel; connect external power (EXT PWR) if available at the gate. 2) Navigation: turn the three ADIRS knobs to NAV so the inertial reference system aligns (takes several minutes). 3) APU: APU MASTER SW ON, wait a few seconds, press APU START, wait until the APU reaches 100% and shows AVAIL, then APU BLEED ON to supply pneumatic air for the engine starters. 4) Fuel: all fuel tank pumps ON on the overhead panel. 5) Start: beacon light ON, thrust levers at IDLE, ENG MODE selector on the centre pedestal to IGN/START. Engine 2 starts first: ENG 2 MASTER switch ON, watch N2 accelerate and EGT rise then stabilise; once engine 2 is stable, ENG 1 MASTER ON and monitor the same way. 6) After start: ENG MODE back to NORM, APU BLEED OFF and APU MASTER OFF once both engines are at idle (many crews keep the APU running a bit longer). Engine 2 is usually started first because it powers the yellow hydraulic system used for the parking brake/nose-wheel steering on the ground.`
  ),
];
