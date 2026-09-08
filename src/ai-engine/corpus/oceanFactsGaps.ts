import { KnowledgeItem } from '../../types';

// Batch 40 (oceans & marine biology) gap-fills. Live misses on nexus-4b:
// "why is the sea blue" -> gave the Rayleigh "sky is blue" answer (the ocean is
// blue mainly because water absorbs red light); "ocean acidification" -> "caused
// by climate change, rising temperatures making coral bleach" (it's the ocean
// absorbing CO2); "seal vs sea lion" -> "both are phocids, same family as
// walruses" (sea lions are otariids); "dolphin vs porpoise" -> dolphins have
// "broader snouts", porpoises "pointy" (backwards); "Mariana Trench" -> "nobody
// knows... mostly just crushing pressure and darkness".
export const OCEAN_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-why-sea-is-blue',
    title: 'Why the Sea Is Blue',
    category: 'Oceanography',
    keywords: [
      'why is the sea blue', 'why is the ocean blue', 'what makes the ocean blue', 'is the ocean blue because of the sky',
      'why is deep water dark blue', 'why is some sea green or turquoise', 'why does water absorb red light',
    ],
    content: `The ocean is blue mainly because water itself absorbs light — and it absorbs long-wavelength colours (red, orange, yellow) far more strongly than short-wavelength blue. As sunlight travels down through the water, the reds are soaked up within the first few metres, then greens, so by the time light has gone deep and scattered back up to your eye, mostly blue is left. Pure deep clean water therefore looks deep blue. This is a different reason from why the SKY is blue (that's air molecules scattering blue light — Rayleigh scattering — which in water is only a minor contributor). Reflection of the blue sky off the surface adds a little on a clear day. Coastal water often looks green, brown or turquoise instead, because suspended sediment, dissolved organic matter, and especially phytoplankton (whose chlorophyll reflects green) change which wavelengths come back. A glass of water looks colourless only because the path length is too short for the absorption to show.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ocean-acidification',
    title: 'What Ocean Acidification Is',
    category: 'Oceanography',
    keywords: [
      'what is ocean acidification', 'what causes ocean acidification', 'is ocean acidification the same as warming',
      'how does co2 acidify the ocean', 'ocean acidification and shellfish', 'ocean ph decrease', 'carbonic acid seawater',
    ],
    content: `Ocean acidification is the ongoing decrease in the pH of seawater caused by the ocean absorbing carbon dioxide from the atmosphere. The ocean has taken up roughly a quarter to a third of the CO2 humans have emitted; when CO2 dissolves in seawater it reacts with water to form carbonic acid, which releases hydrogen ions and lowers the pH. Surface ocean pH has dropped from about 8.2 before industrialisation to about 8.1 — that sounds tiny but, because pH is logarithmic, it's roughly a 30% increase in acidity. This is a SEPARATE problem from ocean warming and coral bleaching (which are driven by higher temperatures) — it's caused directly by the CO2 itself, and would happen even with no warming. Its main harm is that the more acidic water has fewer carbonate ions, making it harder for corals, oysters, clams, sea snails, some plankton and other organisms to build and maintain their calcium-carbonate shells and skeletons; in the worst conditions, existing shells start to dissolve.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-seal-vs-sea-lion',
    title: 'Seal vs Sea Lion',
    category: 'Marine Biology',
    keywords: [
      'what is the difference between a seal and a sea lion', 'seal vs sea lion', 'do seals have ears', 'eared vs earless seals',
      'are seals and sea lions the same', 'what is a pinniped', 'how do you tell a seal from a sea lion',
    ],
    content: `Seals, sea lions and walruses are all "pinnipeds" (fin-footed marine mammals) but three different families. TRUE ("earless") SEALS are phocids: they have no external ear flap (just a small hole), short front flippers, and can't rotate their hind flippers forward — so on land they wriggle on their bellies like a caterpillar. They're often quieter and more solitary. SEA LIONS (and fur seals) are otariids, the "eared seals": they have small visible ear flaps, long front flippers they use to "walk" on all fours on land (and to swim, like flying underwater), and they're noisy and very social, hauling out in big groups. WALRUSES are their own family (odobenids), with tusks and no ear flaps. Quick check: visible ear flaps and walking on land = sea lion; no ear flaps and belly-flopping along = true seal. The "seals" that perform in shows and bark are almost always sea lions.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dolphin-vs-porpoise',
    title: 'Dolphin vs Porpoise',
    category: 'Marine Biology',
    keywords: [
      'what is the difference between a dolphin and a porpoise', 'dolphin vs porpoise', 'is a porpoise a dolphin',
      'how to tell a dolphin from a porpoise', 'porpoise teeth vs dolphin teeth', 'are dolphins and porpoises the same',
    ],
    content: `Both are small toothed whales (cetaceans), but they're different families and there are consistent differences. SNOUT: most dolphins have a long, distinct beak (rostrum); porpoises have a short, rounded head with no beak. TEETH: dolphins have cone-shaped teeth; porpoises have flat, spade-shaped teeth. DORSAL FIN: dolphins usually have a tall, curved (hooked) fin; porpoises have a small, low, triangular fin. BODY: dolphins are generally larger and sleeker; porpoises are smaller (most under 2 m) and chunkier. BEHAVIOUR: dolphins are highly social, acrobatic, often bow-ride boats and are quite vocal (whistles); porpoises are shyer, less acrobatic, travel in smaller groups and don't whistle. There are about 40 dolphin species and only 7 porpoise species. "Killer whales" (orcas) are actually the largest dolphins. In common US usage people sometimes loosely call any of them "porpoise," but biologically they're distinct.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mariana-trench-life',
    title: 'What Lives in the Mariana Trench',
    category: 'Marine Biology',
    keywords: [
      'what lives in the mariana trench', 'what animals live in the deepest ocean', 'deepest fish', 'mariana snailfish',
      'xenophyophore', 'what is at the bottom of the mariana trench', 'life in the challenger deep',
    ],
    content: `The Mariana Trench is not lifeless. Its deepest point, the Challenger Deep (~10,935 m), and its slopes are home to a surprising range of organisms adapted to total darkness, near-freezing water and pressure over 1,000 times that at the surface. Documented life includes: amphipods (shrimp-like scavengers, including the giant Alicella gigantea and species that scurry across the very bottom); xenophyophores — single-celled organisms up to 10 cm across that build shells from sediment; sea cucumbers, sea anemones, polychaete worms and bristle worms; and fish — the Mariana snailfish (Pseudoliparis swirei) lives around 6,000–8,000 m and is one of the deepest-living fish known, with jelly-like flesh and no scales. All of it ultimately depends on "marine snow" — dead plankton and organic debris drifting down from the sunlit surface — plus microbial life in the sediment. Sadly, expeditions have also found plastic waste, including a plastic bag, on the trench floor.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ocean-tides-full',
    title: 'What Causes Ocean Tides',
    category: 'Oceanography',
    keywords: [
      'what causes ocean tides', 'why do we have high and low tides', 'how does the moon cause tides', 'spring tide vs neap tide',
      'why are there two high tides a day', 'does the sun affect tides', 'what is tidal range',
    ],
    content: `Tides are the daily rise and fall of the sea, caused by the gravitational pull of the Moon (and, about half as strongly, the Sun) on Earth's oceans. The Moon's pull is stronger on the near side of Earth than the far side; this stretches the ocean into two bulges — one under the Moon, one on the opposite side — and as the Earth rotates through them, most coasts get roughly two high tides and two low tides every ~24 hours 50 minutes. When the Sun and Moon line up (new and full Moon) their pulls add together for extra-large "spring tides"; when they're at right angles (first and last quarter) they partly cancel, giving smaller "neap tides." The actual height and timing at any coast is heavily shaped by the shape of the sea floor and coastline — the Bay of Fundy in Canada has a tidal range of ~16 m, while some enclosed seas have almost none.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ocean-currents-full',
    title: 'What Ocean Currents Are',
    category: 'Oceanography',
    keywords: [
      'what are ocean currents', 'what causes ocean currents', 'what is the gulf stream', 'what is thermohaline circulation',
      'surface vs deep ocean currents', 'the global conveyor belt', 'how do currents affect climate',
    ],
    content: `Ocean currents are continuous, directed movements of seawater. There are two systems. SURFACE currents (top ~400 m) are driven mainly by the prevailing winds, bent by the Earth's rotation (the Coriolis effect) into large circular loops called gyres — clockwise in the Northern Hemisphere, counter-clockwise in the Southern. The Gulf Stream is one, carrying warm water up the US east coast and across toward Europe, which is why north-west Europe is milder than places at the same latitude in Canada. DEEP currents are driven by density: water that is colder and saltier is heavier and sinks (near the poles, especially the North Atlantic and around Antarctica), then flows slowly along the ocean floor and rises again elsewhere. This "thermohaline circulation" or "global conveyor belt" takes water on a ~1,000-year loop around the world. Currents move heat around the planet, bring nutrients up from the deep (feeding fisheries), and distribute oxygen, so shifts in them have big climate consequences.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-whale-communication',
    title: 'How Whales Communicate',
    category: 'Marine Biology',
    keywords: [
      'how do whales communicate', 'whale songs', 'how far can whale sounds travel', 'do dolphins use echolocation',
      'humpback whale song', 'why is sound important underwater', 'baleen whale vs toothed whale sounds',
    ],
    content: `Whales rely on sound because water is dark below the sunlit layer and light doesn't travel far, but sound travels about four to five times faster and much farther in water than in air. BALEEN whales (blue, fin, humpback, right whales) make very low-frequency moans and pulses — blue and fin whale calls near 20 Hz can carry hundreds or even thousands of kilometres across an ocean basin. Male humpback whales sing long, structured "songs" that repeat and change over a season, thought to be for mating displays. TOOTHED whales (dolphins, orcas, sperm whales) use higher-frequency clicks for echolocation — sending out clicks and reading the echoes to "see" prey and surroundings — plus whistles and pulsed calls for social communication; orca and sperm whale pods have distinct dialects passed down culturally. Rising noise from ships, sonar and drilling interferes with all of this, which is a growing conservation concern.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-coral-reefs-form',
    title: 'How Coral Reefs Form',
    category: 'Marine Biology',
    keywords: [
      'how do coral reefs form', 'how does a coral reef grow', 'what is a fringing reef', 'what is an atoll', 'barrier reef vs atoll',
      'why do coral reefs need sunlight', 'how long does a coral reef take to grow', 'darwin coral reef theory',
    ],
    content: `Coral reefs are built over thousands of years by tiny animals — coral polyps, relatives of jellyfish and anemones. Each polyp secretes a hard cup of calcium carbonate (limestone) around itself; when it dies, new polyps grow on top of the old skeletons, so the reef is a giant, slowly growing pile of the limestone left by countless generations, roughly 1–15 cm taller per year. Reef-building corals host symbiotic algae (zooxanthellae) that photosynthesise and feed them, so reefs need warm (about 23–29 °C), shallow, clear, sunlit, salty water — mostly in the tropics. Charles Darwin worked out the classic sequence: a FRINGING reef forms right against a shoreline (often a volcanic island); as the island slowly sinks or sea level rises, the reef keeps growing upward and a lagoon opens between it and the shrunken land, making a BARRIER reef; and if the island disappears entirely, a ring of reef around an empty lagoon is left — an ATOLL. Reefs cover under 1% of the ocean floor but support about 25% of all marine species.`,
    createdAt: Date.now(),
  },
];
