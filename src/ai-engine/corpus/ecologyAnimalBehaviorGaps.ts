import { KnowledgeItem } from '../../types';

// Batch 293 corpus fixes — ecology/animal-behavior "what's the difference between X and Y"
// topics. 10/25 misses: mostly the "only explained the first term" / cut-off pattern, plus a
// couple of severe dodges (zoo vs sanctuary answered with random Singapore Zoo + "We Bought a
// Zoo" movie trivia; domestication vs taming answered with generic domestication history and
// never touched taming at all; omnivore vs generalist diet answered a completely different
// question about carnivore/herbivore teeth) and one factual error (metamorphosis vs molting).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'science',
  keywords,
  content,
  createdAt: now,
});

export const ECOLOGY_ANIMAL_BEHAVIOR_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-ecology-keystone-species-vs-apex-predator',
    'Keystone species vs apex predator',
    ['keystone species', 'apex predator', 'difference keystone species apex predator'],
    "A keystone species is any species — predator, prey, or even a plant — whose impact on its ecosystem is disproportionately large compared to its numbers or biomass; remove it and the whole ecosystem structure can collapse or radically change, even if it wasn't especially abundant to begin with (sea otters keeping urchin populations in check so kelp forests survive, or elephants knocking down trees to keep savanna from turning into closed woodland). An apex predator is simply a predator at the very top of its food chain that has no natural predators of its own as an adult (orcas, lions, great white sharks) — being an apex predator is about position in the food chain, not necessarily about disproportionate ecosystem-wide impact. The two categories overlap a lot in practice (wolves in Yellowstone are both an apex predator AND a keystone species, since removing them let elk overgraze and reshaped the whole park), but they don't have to overlap — a keystone species can be a starfish or a tiny pollinator with no predators to worry about, and an apex predator's removal doesn't automatically cause ecosystem collapse the way a true keystone species' does. The key difference: apex predator describes WHERE a species sits in the food chain (top, unhunted), while keystone species describes HOW MUCH disproportionate impact a species has on holding its ecosystem together, regardless of its position in the food chain.",
  ),
  k(
    'kb-gap-ecology-fossil-vs-subfossil',
    'Fossil vs subfossil',
    ['fossil', 'subfossil', 'difference fossil subfossil'],
    "A fossil is the preserved remains or trace of an organism that has undergone permineralization or a similar process over a very long time (usually defined as at least 10,000 years, often millions), where the original organic material has been largely or completely replaced by minerals, turning bone, shell, or wood essentially into rock. A subfossil is remains that are too young or too incompletely mineralized to count as a true fossil — the original material (bone, shell, even soft tissue in rare cases) is still substantially present rather than replaced by minerals, typically because the remains are younger than about 10,000 years or have been preserved in unusual conditions like a peat bog, cave, permafrost, or tar pit that slowed decay without fully petrifying them. Subfossils are valuable precisely because they retain more original organic material (sometimes even DNA) than true fossils do, which is why species like the extinct moa or dodo are usually described as leaving subfossil remains rather than true fossils, since they went extinct too recently for full mineralization to occur. The key difference: a fossil has had its original material replaced by minerals over a very long timescale, while a subfossil is younger and/or better-preserved remains that still retain much of their original organic material, not yet fully turned to stone.",
  ),
  k(
    'kb-gap-ecology-natural-habitat-vs-captivity',
    'Natural habitat vs captivity',
    ['natural habitat', 'captivity', 'difference natural habitat captivity'],
    "A natural habitat is the wild environment an animal has evolved to live in and is adapted for — the specific climate, terrain, food sources, and other species it naturally interacts with, with no human-imposed boundaries, no guaranteed food or medical care, and full exposure to natural pressures like predation, weather, and competition for resources. Captivity means an animal is kept by humans in an enclosure or controlled setting — a zoo, aquarium, sanctuary, or as a pet — where humans control its food, space, breeding, and medical care, and it cannot leave or roam freely the way it would in the wild; captivity removes most natural survival pressures (an animal in captivity generally isn't at risk of starving or being hunted) but also removes the animal's ability to express many natural behaviors, which is why good captive environments try to enrich enclosures to mimic natural habitat as closely as possible. The key difference: a natural habitat is the wild environment an animal is evolved for and free to move through on its own, while captivity is a human-controlled setting where the animal's food, space, and freedom of movement are all managed by people.",
  ),
  k(
    'kb-gap-ecology-zoo-vs-wildlife-sanctuary',
    'Zoo vs wildlife sanctuary',
    ['zoo', 'wildlife sanctuary', 'difference zoo wildlife sanctuary'],
    "A zoo is a facility, usually open to the public and often for-profit or ticket-funded, that keeps animals — frequently a wide variety of species from around the world — primarily for public exhibition, education, and entertainment; zoos commonly breed animals (sometimes as part of conservation programs, sometimes just to maintain exhibit populations), may buy, sell, or trade animals between institutions, and are generally built around the visitor experience of viewing the animals up close. A wildlife sanctuary exists primarily for the welfare of the animals themselves rather than for public entertainment — sanctuaries typically take in animals that are injured, orphaned, rescued from abuse or the exotic pet trade, or retired from zoos/circuses, do NOT breed their animals (to avoid perpetuating captive populations) or buy/sell/trade them, and often limit or restrict public access and direct animal contact so the animals can live out their lives with minimal human interference. The key difference: a zoo exists mainly to exhibit animals to the public and often breeds or trades them, while a sanctuary exists mainly to give rescued or displaced animals a safe home for life, without breeding, trading, or prioritizing the visitor experience.",
  ),
  k(
    'kb-gap-ecology-domestication-vs-taming',
    'Domestication vs taming',
    ['domestication', 'taming', 'difference domestication taming'],
    "Domestication is a slow, multi-generational genetic process that happens to an entire SPECIES or population over hundreds or thousands of years, through selective breeding (deliberate or natural) for traits like docility, reduced fear of humans, and usefulness to people — it physically and genetically changes the species over time (dogs from wolves, cattle from aurochs), and a domesticated animal's tameness is heritable, passed down to its offspring by default. Taming is completely different — it's a behavioral process applied to a single INDIVIDUAL animal within its own lifetime, training or conditioning it to tolerate and not fear humans, without changing its genetics at all; a tamed animal (like a tamed wild elephant, fox, or big cat) is still genetically wild, its offspring are born just as wild and fearful of humans as any untamed member of the species, and taming has to be redone with every new individual. The key difference: domestication is a genetic change to an entire species across many generations through selective breeding, while taming is a behavioral change to a single individual animal within its own lifetime that isn't passed on to its offspring.",
  ),
  k(
    'kb-gap-ecology-purebred-vs-mixed-breed',
    'Purebred vs mixed breed',
    ['purebred', 'mixed breed', 'difference purebred mixed breed'],
    "A purebred animal (most commonly discussed with dogs, cats, and livestock) comes from parents of the same recognized breed, with a documented, controlled lineage — breeders track pedigree carefully and select for a consistent, standardized set of physical traits, temperament, and abilities defined by a breed standard (like a Labrador Retriever or a Persian cat), which is why a purebred's adult size, look, and general behavior tend to be quite predictable. A mixed breed (sometimes called a mutt, mongrel, or crossbreed) has parents from two or more different breeds, or an untracked/unknown ancestry, so its traits are a genetic mix rather than a controlled standard — this makes a mixed breed's adult appearance, size, and temperament less predictable than a purebred's, but mixed breeds also tend to have greater genetic diversity, which often means fewer of the specific hereditary health problems that some purebred lines are prone to from generations of breeding within a narrow gene pool. The key difference: a purebred has a documented lineage within a single recognized breed bred to a consistent standard, while a mixed breed's ancestry spans two or more breeds (or is unknown), giving it more genetic diversity but less predictable traits.",
  ),
  k(
    'kb-gap-ecology-vertebrate-vs-invertebrate',
    'Vertebrate vs invertebrate',
    ['vertebrate', 'invertebrate', 'difference vertebrate invertebrate'],
    "A vertebrate is an animal that has a backbone (spinal column) made of bone or cartilage, which forms part of an internal skeleton (endoskeleton) that supports the body and protects the spinal cord — this group includes fish, amphibians, reptiles, birds, and mammals, and although vertebrates are a relatively small slice of all animal species, they include most of the animals people think of as familiar and large-bodied. An invertebrate is any animal WITHOUT a backbone — this is actually the vast majority of animal species on Earth (over 95% of all known animal species), including insects, spiders, crustaceans, mollusks (like octopus and snails), worms, jellyfish, and echinoderms (like starfish); many invertebrates have no internal skeleton at all and instead rely on a hard external exoskeleton (like an insect's or crab's shell) for support and protection, or have no rigid skeleton at all (like jellyfish or worms) and rely on fluid pressure or muscle alone. The key difference: vertebrates have an internal, bone-or-cartilage backbone supporting an endoskeleton, while invertebrates lack a backbone entirely and, if they have any skeleton, typically rely on an external exoskeleton or no rigid skeleton at all.",
  ),
  k(
    'kb-gap-ecology-nocturnal-vs-diurnal',
    'Nocturnal vs diurnal animals',
    ['nocturnal', 'diurnal', 'difference nocturnal diurnal animals'],
    "Diurnal animals — like cheetahs, robins, and most primates including humans — are primarily active during daylight hours, resting or sleeping at night; they've typically evolved eyesight and behavior suited to bright light, relying heavily on color vision to find food, spot predators, and navigate. Nocturnal animals — like owls, bats, and raccoons — are the opposite: they're primarily active during the night and rest or sleep during the day, and they've typically evolved adaptations suited to low light instead, such as larger eyes or a reflective layer behind the retina (tapetum lucidum) to gather more available light, heightened hearing or smell, or in some cases echolocation (bats), since they generally can't rely on color vision in the dark. Being active at night lets nocturnal animals avoid competition with daytime species for food and territory, avoid the heat of the day in hot climates, and reduce the risk of being spotted by daytime predators. The key difference: diurnal animals are active during the day and adapted for bright-light vision, while nocturnal animals are active at night and adapted with enhanced low-light senses like bigger eyes, sharper hearing, smell, or echolocation.",
  ),
  k(
    'kb-gap-ecology-omnivore-diet-vs-generalist-diet',
    'Omnivore diet vs generalist diet',
    ['omnivore diet', 'generalist diet', 'difference omnivore generalist diet'],
    "An omnivore is defined specifically by WHAT KINDS of food it eats — an omnivore eats both plant matter and animal matter as a regular part of its diet (bears, pigs, and humans are all omnivores), as opposed to a strict carnivore (animal matter only) or herbivore (plant matter only); being an omnivore says nothing about how varied or flexible the diet actually is, just that it spans both plant and animal sources. A generalist is defined by HOW FLEXIBLE and broad its diet is, regardless of whether that diet is plant, animal, or both — a generalist eats a wide range of different food sources and can readily switch between them depending on what's available (a raccoon or a crow is a classic dietary generalist), which is the opposite of a specialist that depends on one narrow food source (like a koala eating almost nothing but eucalyptus, or an anteater eating almost nothing but ants) even if that specialist happens to be a strict carnivore or herbivore. The two labels describe different things and can combine in any way — an animal can be an omnivore generalist (a raccoon, eating a huge variety of both plant and animal food), an omnivore specialist (rare, but theoretically an animal that eats both plant and animal matter yet only from one very narrow source), a carnivore generalist (a fox, eating many different kinds of prey), or a carnivore specialist (a koala's opposite among meat-eaters, like an anteater). The key difference: omnivore is about WHAT categories of food are eaten (both plant and animal), while generalist is about HOW BROAD and adaptable the range of food sources is — one describes diet composition, the other describes dietary flexibility.",
  ),
  k(
    'kb-gap-ecology-metamorphosis-vs-molting',
    'Metamorphosis vs molting',
    ['metamorphosis', 'molting', 'moulting', 'difference metamorphosis molting'],
    "Metamorphosis is a dramatic change in BODY FORM across an animal's life stages — insects like butterflies and frogs like tadpoles go through complete or partial metamorphosis, transforming from one distinct body plan (egg, larva/tadpole) into a completely different adult body plan (a winged adult insect, a four-legged frog), often via a pupal or similar transitional stage; not every animal undergoes metamorphosis at all — birds and mammals never do, they just grow bigger versions of the same basic body plan. Molting (moulting) is the periodic SHEDDING of an outer body covering, and it's a completely separate process from metamorphosis that occurs in very different groups of animals for different reasons: insects, spiders, crustaceans, and other arthropods molt (shed their rigid exoskeleton) specifically because their hard outer shell can't stretch to grow, so they periodically shed the old exoskeleton and grow a new, larger one underneath — this is how arthropods actually get bigger, and it happens repeatedly throughout their lives, both before AND after metamorphosis in insects that undergo it. Separately, birds and reptiles also molt, but for them it just means shedding old feathers or skin and replacing them with new ones — it's a maintenance/renewal process for birds and reptiles, not a growth mechanism, since their body plan doesn't change from it. The key difference: metamorphosis is a transformation into a different adult body form found in some animals like insects and amphibians, while molting is periodic shedding of an outer covering (exoskeleton, feathers, or skin) — for arthropods, molting is specifically how they GROW since their rigid exoskeleton can't stretch, while for birds it's just feather replacement with no growth involved.",
  ),
];
