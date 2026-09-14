import { KnowledgeItem } from '../../types';

// Batch 296 corpus fixes — insects/entomology "what's the difference between X and Y" topics.
// (Separate file from entomologyGaps.ts, which already covers batch 113's insect-behavior gaps —
// this one is specifically the X-vs-Y comparison format.) Solid domain overall, 10/25 misses: a
// factual error (tick vs mite leg count), a couple of off-topic/confusing answers, and several
// complete dodges into unrelated Wikipedia trivia near the end of the batch (aphid/ladybug,
// flea/louse, entomologist/exterminator — the last one also had a garbled nonsense fragment
// "Addition to its own phospholipase" inserted).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'science',
  keywords,
  content,
  createdAt: now,
});

export const INSECT_COMPARISONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-insectcmp-insect-vs-bug',
    'Insect vs bug',
    ['insect', 'bug', 'true bug', 'difference insect bug'],
    "Insect is the precise scientific class (Insecta) covering all six-legged arthropods with a three-part body (head, thorax, abdomen), including beetles, ants, bees, flies, butterflies, and thousands of other groups — it's a huge, formal taxonomic category. 'Bug' has two very different meanings: in everyday casual speech, people use 'bug' loosely to mean almost ANY small creepy-crawly critter, including things that aren't even insects at all, like spiders, worms, or centipedes — technically incorrect but extremely common usage. In formal entomology, though, 'true bug' refers to a specific insect order (Hemiptera) — insects with distinctive piercing-sucking mouthparts used to feed on plant sap or, in some species, on other insects or blood, like aphids, cicadas, stink bugs, and bed bugs; not every insect is a true bug, even though every true bug is an insect. The key difference: insect is the precise scientific class of six-legged, three-part-bodied arthropods, while 'bug' in casual speech loosely covers almost any small creature (correct or not), and 'true bug' in scientific usage narrows down to one specific insect order (Hemiptera) with piercing-sucking mouthparts.",
  ),
  k(
    'kb-gap-insectcmp-ant-vs-termite',
    'Ant vs termite',
    ['ant', 'termite', 'difference ant termite'],
    "Ants and termites are both eusocial insects living in large organized colonies with a queen, but they're not closely related at all — ants are more closely related to bees and wasps, while termites are more closely related to cockroaches. Physically, ants have a narrow, pinched 'waist' (a distinct constriction between the thorax and abdomen), a hard, dark, shiny exoskeleton, elbowed antennae, and if winged, unequal-sized front and back wings; termites have a broad waist with no pinch at all, a softer pale or cream-colored body, straight bead-like antennae, and if winged, equal-sized front and back wings. Ants are also mostly predators or scavengers eating other insects, sugars, and proteins, while termites feed on cellulose (wood and plant fiber), which is why termites cause structural damage to homes that ants generally don't. The key difference: ants have a pinched waist, dark hard bodies, and eat a varied diet as predators/scavengers, while termites have a broad unpinched waist, soft pale bodies, and specifically eat wood/cellulose, making them far more destructive to buildings.",
  ),
  k(
    'kb-gap-insectcmp-caterpillar-vs-maggot',
    'Caterpillar vs maggot',
    ['caterpillar', 'maggot', 'difference caterpillar maggot'],
    "A caterpillar is specifically the larval stage of a butterfly or moth (order Lepidoptera) — it has a distinct head with simple eyes and chewing mandibles, three pairs of true jointed legs near the front plus several pairs of soft fleshy prolegs further back for gripping, and it typically eats plant leaves. A maggot is specifically the larval stage of a fly (order Diptera) — it has a much simpler, legless, soft cylindrical body with no true legs at all and often no clearly visible head, and unlike a leaf-eating caterpillar, maggots most commonly feed on decaying organic matter like rotting fruit, carrion, or waste, though some fly larvae do feed on living plants or animals too. The key difference: a caterpillar (future butterfly/moth) has true legs plus prolegs and typically eats living plant leaves, while a maggot (future fly) is legless and typically feeds on decaying matter — they're the larval stages of two completely different insect orders.",
  ),
  k(
    'kb-gap-insectcmp-tick-vs-mite',
    'Tick vs mite',
    ['tick', 'mite', 'difference tick mite'],
    "A tick and a mite are both arachnids (not insects) in the same broader group (subclass Acari), and as ADULTS both have eight legs, just like spiders and scorpions — the number of legs is NOT what separates them. The real difference is mainly size and diet: ticks are generally larger (visible to the naked eye, growing noticeably bigger after a blood meal) and are exclusively blood-feeding parasites on vertebrates (mammals, birds, reptiles), often transmitting diseases like Lyme disease. Mites are usually much smaller (often microscopic or barely visible), and while some mites are also blood-feeding parasites, the vast majority of mite species are not parasitic at all — most mites feed on plants, fungi, decaying organic matter, or other tiny invertebrates, making mites a far more numerous and ecologically diverse group than ticks. The key difference: ticks and mites both have eight legs as adults (not six), but ticks are larger, exclusively blood-feeding vertebrate parasites, while mites are generally much smaller and far more varied in diet, with only some species being parasitic.",
  ),
  k(
    'kb-gap-insectcmp-hive-vs-colony',
    'Hive vs colony',
    ['hive', 'bee colony', 'difference hive colony'],
    "A colony is the actual living bee society itself — the queen, worker bees, drones, brood, and everything that makes up that functioning bee family/superorganism, regardless of where they happen to be living; a colony can exist in a wild tree cavity, a man-made hive box, or even temporarily clustered out in the open while swarming. A hive is the physical structure or container the colony lives in — whether that's a natural cavity (like a hollow tree) or a man-made wooden box built by a beekeeper — the hive is just the housing, not the bees themselves. The key difference: a colony refers to the living community of bees (queen, workers, drones, brood) as a functioning group, while a hive refers to the physical structure or container that colony happens to be living in — you can have a colony without a hive (living wild) but a hive isn't a colony unless bees are actually living in it.",
  ),
  k(
    'kb-gap-insectcmp-pest-vs-invasive-species',
    'Pest vs invasive species',
    ['pest', 'invasive species', 'difference pest invasive species'],
    "A pest is any organism — insect, animal, plant, or fungus — that's simply a nuisance or causes harm to humans, crops, gardens, or property, and a pest can be either a native species that's just become a local nuisance (like native aphids on a garden plant) or a species introduced from elsewhere; being a pest is about the harm/annoyance it causes, regardless of where it originally came from. An invasive species has a stricter, specific definition — it MUST be non-native (introduced by humans, intentionally or accidentally, from somewhere outside its natural range) AND it must cause significant ecological or economic harm in its new environment, typically by outcompeting native species, disrupting ecosystems, or spreading rapidly with no natural predators to keep it in check. The key difference: 'pest' is a broad, informal term for anything harmful or annoying regardless of origin (native or introduced), while 'invasive species' is a stricter scientific term requiring BOTH a non-native origin AND significant ecological/economic damage — every invasive species is usually considered a pest, but not every pest is invasive (many pests are native).",
  ),
  k(
    'kb-gap-insectcmp-aphid-vs-ladybug',
    'Aphid vs ladybug',
    ['aphid', 'ladybug', 'ladybird', 'difference aphid ladybug'],
    "An aphid is a small, soft-bodied, sap-sucking insect (a type of true bug) that feeds on plants by piercing stems and leaves to drink their sugary sap, often clustering in large numbers on new plant growth and causing damage by weakening the plant and sometimes spreading plant viruses — aphids are considered a common garden pest. A ladybug (ladybird beetle) is a completely different kind of insect — a small round beetle, typically red or orange with black spots, and crucially it's a PREDATOR rather than a pest: both ladybug adults and their larvae eat huge numbers of aphids, which is exactly why gardeners often introduce or encourage ladybugs as a natural, chemical-free way to control aphid infestations. The key difference: an aphid is a small sap-sucking plant pest, while a ladybug is a predatory beetle that eats aphids — they have essentially a predator-and-prey relationship, with the ladybug helping control aphid populations.",
  ),
  k(
    'kb-gap-insectcmp-flea-vs-louse',
    'Flea vs louse',
    ['flea', 'louse', 'lice', 'difference flea louse'],
    "A flea is a small, wingless, blood-feeding parasitic insect with a body flattened side-to-side, and its most distinctive feature is its powerful hind legs built for jumping — fleas can leap remarkably far and high relative to their size (many times their own body length), which lets them jump between different hosts (dogs, cats, humans, rodents) rather than staying confined to just one animal. A louse (plural: lice) is also a small, wingless, blood-feeding (or in some species, debris-feeding) parasitic insect, but its body is flattened top-to-bottom rather than side-to-side, and lice have NO jumping ability at all — lice have claw-like legs specifically adapted to grip tightly onto hair or feathers, and most louse species are highly host-specific, spending their entire life cycle on one particular host species (like head lice, which live only on the human scalp) rather than jumping between different kinds of animals. The key difference: a flea is flattened side-to-side and can jump long distances between different host species, while a louse is flattened top-to-bottom, cannot jump at all, and typically stays gripped to one specific host species for its whole life.",
  ),
  k(
    'kb-gap-insectcmp-silverfish-vs-cockroach',
    'Silverfish vs cockroach',
    ['silverfish', 'cockroach', 'difference silverfish cockroach'],
    "A silverfish is a small, wingless, silvery-gray, teardrop-shaped insect covered in fine scales, with three long tail-like bristles at its rear end — silverfish belong to a very primitive insect order that doesn't undergo metamorphosis at all (ametabolous development, meaning the young simply look like tiny versions of the adult and molt repeatedly without changing form), and they feed mainly on starchy materials like paper, book bindings, wallpaper glue, and cellulose rather than food scraps. A cockroach is a much larger, flatter, oval-shaped insect, usually reddish-brown to black, with wings (even if not always used for flying) and long spiny legs built for fast running — cockroaches DO undergo incomplete metamorphosis (egg, nymph, adult) and are notorious omnivorous scavengers, eating almost anything including food waste, grease, and other organic matter, and are famous for their extreme hardiness and resistance to insecticides. The key difference: a silverfish is smaller, wingless, scaly, and feeds mainly on starchy/paper materials with no true metamorphosis, while a cockroach is larger, winged, far more resilient, undergoes incomplete metamorphosis, and eats a much broader range of food waste and organic matter.",
  ),
  k(
    'kb-gap-insectcmp-entomologist-vs-exterminator',
    'Entomologist vs exterminator',
    ['entomologist', 'exterminator', 'pest control', 'difference entomologist exterminator'],
    "An entomologist is a scientist who studies insects academically — researching their biology, behavior, classification, ecology, and evolution, often working in universities, research institutions, museums, or agricultural/forensic science, with the goal of understanding insects, not necessarily killing them (many entomologists study beneficial insects like pollinators, or protect endangered insect species). An exterminator (pest control technician) is a hands-on professional whose job is specifically to identify, remove, and kill unwanted pest insects (or other pests like rodents) from homes and businesses, using practical tools like pesticides, traps, and physical removal methods — their focus is solving an immediate infestation problem for a paying client, not scientific research. The key difference: an entomologist is a scientist who studies insects (often in a research or academic setting, not necessarily to kill them), while an exterminator is a practical pest-control professional whose job is to remove or kill unwanted pest insects from a specific property.",
  ),
];
