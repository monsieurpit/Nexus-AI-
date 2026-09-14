import { KnowledgeItem } from '../../types';

// Batch 285 corpus fixes — environmental science topics. 6/25 misses. One severe hallucination
// ("aquifer vs reservoir" defined reservoir as "where the pathogen lives... where the disease
// actually exists" — confusing a water-storage reservoir with the completely unrelated
// epidemiological term "disease reservoir") and one backwards factual claim (landfill described as
// the uncontrolled, environmentally-careless option and "dump" as worse — it's actually the
// opposite: a modern landfill is the engineered, regulated site, while "dump" is the older,
// unregulated term).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'environment',
  keywords,
  content,
  createdAt: now,
});

export const ENVIRONMENTAL_SCIENCE_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-env-deforestation-vs-desertification',
    'Deforestation vs desertification',
    ['deforestation', 'desertification', 'difference deforestation desertification'],
    "Deforestation is the clearing or removal of forests, typically for logging, agriculture, or development — it's an action taken directly on tree cover. Desertification is a broader process where fertile land gradually turns into desert-like, unproductive land — caused by a combination of factors including deforestation, overgrazing, poor farming practices, and climate change (reduced rainfall), which strip the soil of vegetation and nutrients until it can no longer support plant life or agriculture. The relationship: deforestation is one specific CAUSE that can contribute to desertification, but desertification is the larger, resulting land-degradation process — you can have deforestation without full desertification, but severe, sustained deforestation combined with other factors (drought, overuse of the land) is a major driver of desertification.",
  ),
  k(
    'kb-gap-env-sustainability-vs-conservation',
    'Sustainability vs conservation',
    ['sustainability', 'conservation', 'difference sustainability conservation'],
    "Conservation is about PROTECTING what already exists — actively working to preserve natural resources, species, or ecosystems from being depleted or destroyed (like protecting an endangered species or preserving an old-growth forest); it's largely reactive, focused on preventing loss of something valuable that's already there. Sustainability is a broader, more forward-looking approach — it's about meeting current needs (resources, energy, economic activity) in a way that doesn't compromise the ability of future generations to meet their own needs; it's proactive, focused on designing systems (farming, energy, manufacturing, consumption) that can be maintained indefinitely without depleting resources, rather than just protecting what's already there. In short: conservation preserves existing resources from being lost; sustainability designs ongoing systems and practices so resources aren't depleted in the first place.",
  ),
  k(
    'kb-gap-env-landfill-vs-dump-correction',
    'Landfill vs dump (correcting a backwards claim)',
    ['landfill', 'dump', 'difference landfill dump'],
    "Correcting a common mix-up: a modern, engineered LANDFILL is actually the more environmentally-regulated option — it's designed with protective liners to prevent waste from contaminating groundwater, systems to capture and often convert methane gas from decomposing waste into energy, and ongoing environmental monitoring, all typically required by law. A 'dump' (or open dumping ground) is the OLDER, unregulated, uncontrolled predecessor — trash is simply piled up with no liners, no gas capture, and no real environmental safeguards, which is why open dumps have been phased out and replaced by regulated sanitary landfills in most developed countries. In short: it's the dump, not the landfill, that lacks environmental protections — a landfill is the modern, engineered, regulated version specifically designed to reduce dumping's environmental harm.",
  ),
  k(
    'kb-gap-env-aquifer-vs-reservoir-correction',
    'Aquifer vs reservoir (water storage, not disease)',
    ['aquifer', 'reservoir', 'difference aquifer reservoir', 'water reservoir vs disease reservoir'],
    "An aquifer is an underground layer of rock, sand, or gravel that can hold and transmit groundwater — water seeps down into it and can be pumped back out through wells; it's essentially a natural underground water-storage system, often built up over centuries. A reservoir (in the water-management sense) is a human-made or human-modified body of water, usually created by damming a river, used to store water for drinking supply, irrigation, flood control, or hydroelectric power — it sits on the surface, unlike an aquifer's underground storage. Important clarification: 'reservoir' also has a completely separate, unrelated meaning in epidemiology — a 'disease reservoir' refers to the population or environment where a pathogen naturally lives and reproduces — but that has nothing to do with a water reservoir; when discussing aquifers vs reservoirs in a water/geography context, 'reservoir' always means the water-storage structure, not anything related to disease.",
  ),
  k(
    'kb-gap-env-watershed-vs-wetland',
    'Watershed vs wetland',
    ['watershed', 'wetland', 'difference watershed wetland'],
    "A watershed is an entire area of LAND that drains and collects rainwater/snowmelt, funneling it all into a common outlet — like a river, lake, or ocean. It's defined by topography (the boundary is wherever the land's slope changes to drain toward a different water body) and can span a huge area, from a small stream's drainage basin to something as large as the entire Mississippi River watershed covering much of the central United States. A wetland is a specific TYPE of ecosystem — land that's saturated with water either permanently or seasonally (like a swamp, marsh, or bog), supporting water-adapted plant and animal life. The key difference: a watershed is a large land-drainage AREA defined by where water flows, while a wetland is a specific, much smaller water-saturated ECOSYSTEM — a wetland is typically just one small feature that might exist somewhere within a much larger watershed, not the same kind of thing at all.",
  ),
  k(
    'kb-gap-env-coral-bleaching-vs-coral-death',
    'Coral bleaching vs coral death',
    ['coral bleaching', 'coral death', 'difference coral bleaching death'],
    "Coral bleaching happens when corals are stressed (most often by unusually warm ocean water) and expel the colorful algae (zooxanthellae) living symbiotically inside their tissue — this algae normally provides the coral with food and its vibrant color, so without it the coral turns white/pale ('bleached') and becomes vulnerable to starvation and disease. Critically, bleaching is NOT the same as death — a bleached coral is still alive, and if the stressful conditions (like a marine heatwave) ease up in time, the coral CAN recover its algae and survive. Coral death occurs when the stress is too severe or prolonged for the coral to recover — the coral organism actually dies, and its skeleton is often quickly overgrown by algae or other organisms, at which point recovery is no longer possible. The key difference: bleaching is a reversible stress response (the coral is alive but weakened); death is the irreversible endpoint when that stress goes on too long for recovery.",
  ),
];
