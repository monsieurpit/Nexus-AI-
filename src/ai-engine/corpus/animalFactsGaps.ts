import { KnowledgeItem } from '../../types';

// Animal-fact gaps found in batched testing — several answers were flatly wrong (most venomous
// = "platypus", deadliest to humans = "the Black Death", longest lifespan = "arctic tern").
export const ANIMAL_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-animal-lifespans',
    title: 'Animal Lifespans: Longest-Lived and Common Species',
    category: 'Animals',
    keywords: [
      'what animal has the longest lifespan', 'longest living animal', 'oldest animal',
      'how long do elephants live', 'how long do dogs live', 'how long do parrots live',
      'how long do tortoises live', 'immortal jellyfish', 'greenland shark age', 'longest lived animal',
    ],
    content: `The animal with the longest lifespan is the ocean quahog clam (individuals verified at 500+ years — one named "Ming" was ~507). The Greenland shark lives an estimated 250–500 years (the longest-lived vertebrate). The "immortal jellyfish" (Turritopsis dohrnii) can biologically revert to an earlier life stage and, barring predation or disease, has no fixed maximum age. Bowhead whales live ~200 years. Giant tortoises live 100–190 years. Among familiar animals: African elephants live about 60–70 years in the wild (Asian elephants ~48); large parrots (macaws, cockatoos) 50–80 years; horses ~25–30; dogs ~10–13 (small breeds longer, giant breeds ~7–9); cats ~13–17; goldfish 10–15. Note: the Arctic tern (~30-year lifespan) is famous for the longest MIGRATION, not the longest lifespan.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-most-venomous-deadliest',
    title: 'Most Venomous Animals and the Deadliest Animal to Humans',
    category: 'Animals',
    keywords: [
      'what is the most venomous animal', 'most poisonous animal', 'most venomous creature',
      'deadliest animal to humans', 'what animal kills the most people', 'most dangerous animal',
      'most venomous snake', 'box jellyfish venom', 'inland taipan',
    ],
    content: `Most venomous by toxin potency: the box jellyfish (especially Chironex fleckeri) is often called the most venomous marine animal — its sting can kill a person in minutes. The inland taipan ("fierce snake") of Australia has the most toxic venom of any snake by lab measure, though it's shy and rarely bites people. The blue-ringed octopus, cone snails, and the golden poison dart frog (poisonous, not venomous) are also among the most toxic. The platypus IS venomous (spurs on the males' hind legs) and the sting is extremely painful, but it is NOT deadly to humans and is nowhere near "most venomous".

Deadliest animal to HUMANS (by deaths per year): mosquitoes — around 700,000–1,000,000 human deaths a year from malaria, dengue, yellow fever, Zika and other mosquito-borne diseases. Distant runners-up: humans themselves (~400,000 homicides), snakes (~100,000), dogs (~59,000, mostly rabies), and freshwater snails (schistosomiasis). Large predators like sharks (~10 deaths/year) and lions kill very few people by comparison.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-bees-make-honey',
    title: 'How Bees Make Honey',
    category: 'Animals',
    keywords: [
      'how do bees make honey', 'how is honey made', 'how do honeybees make honey', 'where does honey come from',
      'why do bees make honey', 'how bees turn nectar into honey',
    ],
    content: `Forager honeybees suck nectar (a sugary liquid) from flowers and store it in a special "honey stomach" separate from their digestive stomach. On the way back to the hive, enzymes (mainly invertase) in the honey stomach start breaking the nectar's complex sugar (sucrose) into simpler sugars (glucose and fructose). Back at the hive the forager passes the nectar mouth-to-mouth to house bees, who keep passing it around and adding more enzymes, further concentrating it. They deposit it into the wax honeycomb cells and then fan it with their wings to evaporate most of the water — nectar is about 70–80% water, finished honey only about 17–18%. The low water content plus the acidity and hydrogen peroxide produced by an enzyme make honey resist spoilage almost indefinitely. Once a cell is ready, bees cap it with a thin wax lid. Bees make honey as a stored food supply to feed the colony through winter and other times when flowers aren't blooming.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-birds-migrate',
    title: 'Why Birds Migrate',
    category: 'Animals',
    keywords: [
      'why do birds migrate', 'why do birds fly south for winter', 'reason birds migrate',
      'what causes bird migration', 'why do birds travel long distances',
    ],
    content: `Birds migrate mainly to follow food and good breeding conditions. In spring, many species fly to higher latitudes (e.g. north into Europe, North America, the Arctic) because the long summer days and seasonal explosion of insects, seeds and plant growth provide abundant food and long daylight hours to feed a hungry brood of chicks, with fewer competitors and (in the far north) fewer predators and parasites. In autumn, as that food disappears and temperatures drop, they fly back to warmer regions (the tropics, southern hemisphere, or milder coasts) where food is still available through the winter. So migration is a trade-off: the huge energy cost and danger of a long journey is worth it because breeding somewhere with a short but food-rich summer, then wintering somewhere mild, beats staying in one place year-round. The triggers to actually depart are mostly changes in day length (which shift the birds' hormones), plus weather and body condition. How they navigate — using the sun, stars, Earth's magnetic field and learned landmarks — is a separate question from why they go.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-do-fish-sleep',
    title: 'Do Fish Sleep',
    category: 'Animals',
    keywords: [
      'do fish sleep', 'how do fish sleep', 'do fish sleep with their eyes open', 'do sharks sleep',
      'when do fish sleep', 'do fish rest',
    ],
    content: `Yes, fish sleep, in the sense that they enter a distinct rest state: reduced activity, a slower metabolism, a typical resting posture or spot (some wedge into rocks or coral, some hover, parrotfish spin a mucus cocoon), and reduced responsiveness to their surroundings — you have to disturb a sleeping fish more strongly to get a reaction. Because fish have no eyelids, their eyes stay open while they sleep. Most fish don't show the clear brain-wave stages (NREM/REM) that mammals and birds do, though zebrafish have been shown to have sleep-like brain states, so it's a simpler form of sleep than ours. Sharks and other fish that must swim to push water over their gills either keep swimming while parts of the brain rest, or have gill-pumping muscles that let them lie still and "sleep" on the bottom (nurse sharks do this). This is different from "tonic immobility", which is a temporary freeze/fear response, not sleep.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-longest-bird-flight',
    title: 'Longest Non-Stop Bird Flights and Time Aloft',
    category: 'Animals',
    keywords: [
      'how far can a bird fly without stopping', 'longest non-stop bird flight', 'bar-tailed godwit',
      'which bird flies the farthest without landing', 'how long can a bird stay in the air',
      'bird that stays in the air for months', 'common swift flight',
    ],
    content: `The record for the longest non-stop flight by a bird belongs to the bar-tailed godwit: individuals have been satellite-tracked flying from Alaska to New Zealand — roughly 12,000 km (7,500 miles) — in a single 8–11 day flight over open ocean, without landing, eating or drinking, burning about half their body weight. For total time in the air, the common swift can stay airborne for up to about 10 months at a stretch, feeding, drinking and even sleeping on the wing, only landing to nest. The Arctic tern flies the longest total distance over a year — a zig-zag round trip of up to ~90,000 km between the Arctic and Antarctic — but it lands and feeds along the way, so that's cumulative, not non-stop. Hummingbirds do make a genuinely impressive non-stop crossing of the Gulf of Mexico (~800 km) despite their tiny size.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-animal-sleep-extremes',
    title: 'Which Animal Sleeps the Least (or "Never")',
    category: 'Animals',
    keywords: [
      'what animal never sleeps', 'which animal sleeps the least', 'do all animals sleep',
      'animal that does not sleep', 'least sleep animal', 'do dolphins sleep', 'do bullfrogs sleep',
    ],
    content: `Essentially every animal with a nervous system shows some form of rest, so "never sleeps" is mostly a myth, but some animals sleep remarkably little. Large grazing animals like elephants (~2 hours a day, sometimes skipping a night entirely) and giraffes (~30 minutes to 2 hours, often in short naps) sleep the least among mammals. Newborn dolphins and killer whales, and their mothers, stay active almost continuously for weeks after birth. Bullfrogs were once claimed to never sleep, but that study was flawed and is not accepted. The real trick is used by dolphins, whales, some seals and many birds: unihemispheric sleep — one half of the brain sleeps while the other half stays awake, keeping one eye open, so the animal can keep surfacing to breathe, swim, or watch for predators, and never fully "goes offline". Sharks that must keep swimming to breathe rest parts of the brain while still moving.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-crocodile-breath',
    title: 'How Long a Crocodile Can Hold Its Breath',
    category: 'Animals',
    keywords: [
      'how long can a crocodile hold its breath', 'how long can an alligator stay underwater',
      'how long can crocodiles stay submerged', 'crocodile diving time',
    ],
    content: `A crocodile normally stays underwater for about 10–15 minutes on a routine dive. If it stays calm and still (for example resting on the bottom or ambushing prey), it can hold its breath much longer — commonly 1–2 hours, and in cold water while barely moving, some large crocodiles have been recorded submerged for well over 2 hours, occasionally up to around 8 hours. They manage this by slowing the heart to just 2–3 beats per minute and shunting blood away from non-essential organs. When active or stressed — fighting, fleeing, in a "death roll" — they use oxygen fast and surface within a minute or two.`,
    createdAt: Date.now(),
  },
];
