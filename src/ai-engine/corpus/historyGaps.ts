import { KnowledgeItem } from '../../types';

// Batch 279 corpus fixes — history/politics topics. Strong domain, 4/25 misses.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'history',
  keywords,
  content,
  createdAt: now,
});

export const HISTORY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-hist-dictator-vs-tyrant',
    'Dictator vs tyrant',
    ['dictator', 'tyrant', 'difference dictator tyrant'],
    "A dictator is a specific, modern political term: a ruler who holds absolute, unchecked power over a country, typically having seized or concentrated that power outside of normal democratic processes (elections, term limits, checks and balances), and who governs a formal state apparatus (like a 20th-century dictatorship such as Franco's Spain or Stalin's USSR). 'Tyrant' is an older term with a more layered history: in ancient Greece, a 'tyrannos' originally just meant someone who seized power illegitimately (outside normal hereditary or elected succession) — it didn't necessarily mean cruel, some ancient tyrants were actually popular reformers. Over time, 'tyrant' evolved into today's more general, less formal label for ANY ruler (whether or not they hold a specific title like 'dictator') who governs cruelly and oppressively. In short: 'dictator' describes a specific type of unchecked, modern political position; 'tyrant' is a broader, more informal label emphasizing cruel or oppressive behavior in a ruler, regardless of their official title.",
  ),
  k(
    'kb-gap-hist-pharaoh-vs-king',
    'Pharaoh vs king',
    ['pharaoh', 'king', 'difference pharaoh king'],
    "A pharaoh was the ruler of ancient Egypt, and was considered not just a political leader but a living god or the intermediary between the gods and the people — pharaohs held absolute religious AND political authority, and their rule was tied directly to Egyptian religious belief (they were often seen as the earthly embodiment of the god Horus). A king (in most other cultures, like medieval England or France) is a more general term for a hereditary male monarch who holds political authority — some kings claimed a 'divine right' to rule granted BY a god, but were not typically worshipped as gods themselves the way pharaohs were. The key difference: a pharaoh's authority was inherently religious and divine in nature (a god-king), while a typical king's authority is political, even when it claims religious backing or approval.",
  ),
  k(
    'kb-gap-hist-vikings-vs-normans',
    'Vikings vs Normans',
    ['vikings', 'normans', 'difference vikings normans'],
    "The Vikings were Scandinavian seafarers (from what's now Norway, Sweden, and Denmark) who raided, traded, and settled across Europe from roughly the late 8th to 11th centuries — known for their longships, raids on monasteries (like the famous 793 AD raid on Lindisfarne), and eventually establishing settlements and trade networks from Russia to North America. The Normans were actually DESCENDANTS of Vikings who had settled in northern France (the region still called Normandy, from 'Northmen') starting around 911 AD — by the time of the famous Norman Conquest of England in 1066 (led by William the Conqueror), the Normans had assimilated into French culture for generations: they spoke French, practiced feudal French customs, and fought as heavily armored knights on horseback rather than raiding by longship the way their Viking ancestors had. So the Normans aren't a separate, unrelated group from the Vikings — they're Viking descendants who had become thoroughly French-ified over roughly 150 years before conquering England themselves.",
  ),
  k(
    'kb-gap-hist-house-of-reps-vs-parliament',
    'House of Representatives vs parliament',
    ['house of representatives', 'parliament', 'difference house of representatives parliament'],
    "The House of Representatives is specifically the LOWER chamber of the U.S. Congress — 435 members apportioned by state population, serving 2-year terms, existing alongside a separate upper chamber (the Senate) and a separate executive branch (the President) under a strict SEPARATION of powers, where the legislature and the executive are elected independently of each other. A parliament is the broader term for a country's national legislative body used in many other systems (like the UK, Canada, or Japan) — and crucially, in a typical PARLIAMENTARY system, the executive (the Prime Minister and cabinet) is NOT elected separately; instead, the Prime Minister is usually the leader of whichever party controls a majority in parliament, meaning the legislative and executive branches are much more closely fused together rather than kept strictly separate like in the U.S. system. In short: the House of Representatives is one specific chamber within America's separation-of-powers system, while 'parliament' describes an entire legislative body in systems where the legislature and executive are much more intertwined.",
  ),
];
