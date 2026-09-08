import { KnowledgeItem } from '../../types';

// Batch 32 (prehistory & human evolution) gap-fills. Live misses on nexus-4b:
// "first tools" -> "garden tool... Cow tools Far Side cartoon"; "missing link"
// -> "Missing Link is a 2019 stop-motion film"; "out of Africa theory" -> "The
// Incredible Human Journey documentary"; "when did humans leave Africa" ->
// "300,000 years ago" (that's when we emerged); "Homo sapiens" -> "the genus
// name" (Homo is the genus); "Homo erectus" -> "bigger brains than Neanderthals"
// (false); "Lucy" -> "discovered in Harrisburg, Ethiopia" (it was Hadar).
export const HUMAN_EVOLUTION_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-human-evolution',
    title: 'What Human Evolution Is',
    category: 'Human Evolution',
    keywords: [
      'what is human evolution', 'how did humans evolve', 'human evolution timeline', 'stages of human evolution',
      'where did humans come from', 'human ancestors', 'evolution of modern humans',
    ],
    content: `Human evolution is the process by which modern humans (Homo sapiens) developed from earlier primate ancestors over roughly the last 6–7 million years. Humans did not descend from chimpanzees; humans and chimps share a common ancestor that lived around 6–7 million years ago in Africa, after which the two lineages split. Rough sequence: early African hominins like Sahelanthropus and Ardipithecus; then Australopithecus (e.g. "Lucy," ~3.2 mya) — small-brained but already walking upright; then the genus Homo — Homo habilis (~2.4 mya, making stone tools), Homo erectus (~1.9 mya, taller, controlled fire, the first to spread out of Africa), the Neanderthals and Denisovans in Eurasia, and finally Homo sapiens, which arose in Africa about 300,000 years ago. A key finding: upright walking (bipedalism) came first, and large brains evolved much later. Modern humans then spread worldwide from about 60,000–70,000 years ago, interbreeding a little with Neanderthals and Denisovans along the way. Evidence comes from fossils, comparative anatomy, archaeology and DNA.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-homo-sapiens',
    title: 'What Homo sapiens Means',
    category: 'Human Evolution',
    keywords: [
      'what is homo sapiens', 'what does homo sapiens mean', 'is homo sapiens a genus or species', 'homo genus',
      'scientific name for humans', 'what is homo sapiens sapiens', 'binomial name for humans',
    ],
    content: `Homo sapiens is the scientific (binomial) name of the modern human species. In the two-part naming system Carl Linnaeus set up in 1758, the first word is the GENUS (Homo, "man" — a group that also includes extinct species like Homo erectus, Homo habilis and Homo neanderthalensis) and the second is the SPECIES (sapiens, "wise"). So Homo is the genus and sapiens is the species; "Homo sapiens" together names one species — us. The fuller "Homo sapiens sapiens" is a subspecies name for anatomically modern humans, used when distinguishing them from other proposed subspecies. Homo sapiens first appears in the African fossil record about 300,000 years ago (Jebel Irhoud, Morocco) and is today the only surviving member of the genus.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-lucy-fossil',
    title: 'Who Lucy (the Fossil) Was',
    category: 'Human Evolution',
    keywords: [
      'who was lucy the fossil', 'what is lucy the australopithecus', 'where was lucy found', 'lucy fossil discovery',
      'why is lucy important', 'how old is the lucy fossil', 'australopithecus afarensis lucy',
    ],
    content: `"Lucy" is the nickname of a famous fossil skeleton of Australopithecus afarensis, an early human ancestor. She was discovered in 1974 by Donald Johanson and Tom Gray at Hadar, in the Afar region of Ethiopia (the team named her after the Beatles song "Lucy in the Sky with Diamonds," which was playing in camp). The skeleton is about 40% complete — extraordinary for something 3.2 million years old — and showed clearly that her species walked upright on two legs (from the shape of the pelvis and knee) while still having a small, ape-sized brain and long arms suited to climbing. Lucy was small, about 1.1 m tall, and probably a young adult female. She was pivotal evidence that bipedalism evolved long before big brains. In Ethiopia she is called "Dinkinesh" ("you are marvellous"). A slightly older species, and older fossils, have since been found, but Lucy remains the most famous early hominin.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-paleolithic-vs-neolithic',
    title: 'Paleolithic vs Neolithic',
    category: 'Prehistory',
    keywords: [
      'what is the difference between the paleolithic and neolithic', 'paleolithic vs neolithic', 'old stone age vs new stone age',
      'what is the neolithic revolution', 'when did the neolithic start', 'paleolithic way of life',
    ],
    content: `Both are divisions of the Stone Age (the Mesolithic sits between them). PALEOLITHIC ("Old Stone Age"), from about 3.3 million years ago to roughly 12,000 years ago: people lived as small nomadic bands of hunter-gatherers, following game and wild plants; tools were chipped/flaked stone (hand axes, blades, spear points); they used fire, lived in caves or temporary camps, and made the earliest art (cave paintings, Venus figurines) late in the period. NEOLITHIC ("New Stone Age"), from about 12,000 years ago (later in some regions): the "Neolithic Revolution" — people domesticated plants and animals and took up farming, which let them settle in permanent villages, store surplus food, and grow in population; this brought pottery, weaving, polished (ground) stone tools, larger built structures, property, social hierarchy, and eventually towns. In short: Paleolithic = mobile foragers with chipped stone; Neolithic = settled farmers with polished stone and pottery.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-when-humans-left-africa',
    title: 'When Humans First Left Africa',
    category: 'Human Evolution',
    keywords: [
      'when did humans first leave africa', 'when did modern humans migrate out of africa', 'out of africa migration date',
      'when did homo sapiens leave africa', 'first human migration', 'did homo erectus leave africa',
    ],
    content: `It depends which humans. The genus Homo first spread out of Africa much earlier — Homo erectus reached Asia (Georgia, China, Java) by about 1.8–1.9 million years ago. Anatomically modern humans (Homo sapiens) arose in Africa around 300,000 years ago and stayed mostly African for a long time. There were early, limited dispersals of modern humans into the Middle East around 100,000–130,000 years ago (fossils in Israel, and a jaw in Greece even older), but those seem to have died out or not spread far. The major, successful migration that populated the rest of the world — Asia, Europe, Australia, and eventually the Americas — happened roughly 60,000–70,000 years ago. So "modern humans left Africa" is usually dated to about 60–70 thousand years ago, not 300,000.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-natural-selection',
    title: 'Evolution by Natural Selection',
    category: 'Biology',
    keywords: [
      'what is the theory of evolution by natural selection', 'how does natural selection work', 'what is survival of the fittest',
      'darwin theory of evolution', 'what is descent with modification', 'how does evolution happen',
    ],
    content: `Natural selection is the main mechanism of evolution, set out by Charles Darwin and Alfred Russel Wallace (published together in 1858, then in Darwin's "On the Origin of Species" in 1859). It works from four facts: (1) individuals in a population VARY in their traits; (2) some of that variation is HERITABLE, passed to offspring (we now know via genes and mutation); (3) more offspring are produced than can survive and reproduce, so there is a STRUGGLE for limited resources; (4) individuals whose traits happen to suit the current environment tend to survive and reproduce more — so those traits become more common in the next generation. Repeated over many generations this is "descent with modification": populations change, adapt to their surroundings, and can split into new species. "Survival of the fittest" is a shorthand, where "fittest" means best-suited to reproduce in that environment, not strongest. Selection has no goal or foresight — it just filters existing variation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-first-stone-tools',
    title: 'What the First Tools Were Made Of',
    category: 'Prehistory',
    keywords: [
      'what were the first tools made of', 'what were the earliest tools', 'what is the oldest tool', 'oldowan tools',
      'who made the first stone tools', 'when were the first tools made', 'earliest human technology',
    ],
    content: `The oldest known tools were made of STONE. The classic early tradition is the "Oldowan," from about 2.6 million years ago (with contested claims of stone tools as old as 3.3 million years at Lomekwi, Kenya). They were simple but effective: a hard hammerstone was struck against another rock to knock off sharp flakes, giving cutting edges for butchering carcasses, cracking bones for marrow, and working plants and wood, plus the "cores" (choppers) left behind. They were made by early members of Homo (and probably late Australopithecus) in East Africa. Wood, bone, antler and hide were almost certainly used too, but they rot and rarely survive, so stone dominates the record. Tools got more refined over time: the teardrop Acheulean hand axe (~1.76 mya, Homo erectus), then finely shaped blades, hafted spear points and, much later, bows, pottery and metal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-out-of-africa-theory',
    title: 'The Out of Africa Theory',
    category: 'Human Evolution',
    keywords: [
      'what is the out of africa theory', 'recent african origin of modern humans', 'out of africa vs multiregional',
      'did all humans come from africa', 'where did modern humans originate', 'african eve theory',
    ],
    content: `The "Out of Africa" theory (also "Recent African Origin") is the mainstream scientific account of where modern humans come from. It holds that Homo sapiens evolved as a single species in Africa around 300,000 years ago, and that all people living outside Africa today descend from a relatively small group that migrated out of Africa roughly 60,000–70,000 years ago and spread across Asia, Europe, Australia and eventually the Americas. As they spread, they largely replaced the other human populations already living in Eurasia (Neanderthals, Denisovans, Homo erectus) — with a small amount of interbreeding, which is why non-Africans carry about 1–2% Neanderthal DNA and some Asian and Oceanian groups carry Denisovan DNA. This is supported by fossils, archaeology, and especially genetics (mitochondrial DNA points to a common maternal ancestor in Africa, "Mitochondrial Eve"). It replaced the older "multiregional" idea that modern humans evolved in parallel on several continents.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-homo-erectus',
    title: 'What Homo erectus Was',
    category: 'Human Evolution',
    keywords: [
      'what is homo erectus', 'homo erectus facts', 'when did homo erectus live', 'did homo erectus use fire',
      'homo erectus vs homo sapiens', 'was homo erectus our ancestor', 'homo erectus brain size',
    ],
    content: `Homo erectus ("upright man") was an early human species that lived from about 1.9 million to possibly as recently as ~110,000 years ago — one of the longest-lasting human species. It was the first hominin to have modern human body proportions (long legs, short arms, tall stature ~1.5–1.8 m) fully adapted to walking and running long distances on the ground, and the first to migrate out of Africa, reaching the Caucasus, China ("Peking Man") and Java ("Java Man"). It made more advanced stone tools (Acheulean hand axes) and there is good evidence it used and controlled fire. Its brain (~600–1,100 cm³) was larger than earlier hominins but SMALLER than that of Neanderthals or modern humans (~1,200–1,600 cm³) — Neanderthals actually had the largest brains of any human species. Homo erectus is widely thought to be a direct ancestor of later humans, including us.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-missing-link',
    title: 'What "the Missing Link" Means',
    category: 'Human Evolution',
    keywords: [
      'what is the missing link', 'missing link meaning evolution', 'is there a missing link between apes and humans',
      'what is a transitional fossil', 'has the missing link been found', 'archaeopteryx missing link',
    ],
    content: `"The missing link" is an old popular phrase for a hypothetical fossil that would be exactly halfway between two groups — most often between apes and humans. Scientists now avoid the term, for two reasons. First, evolution is a branching bush, not a single ladder or chain, so there's no one "link" to find — there are many transitional forms along many branches. Second, hundreds of transitional fossils have in fact been found: Australopithecus (like Lucy) is transitional between older apes and the genus Homo; Homo habilis and Homo erectus bridge to modern humans; Archaeopteryx links dinosaurs and birds; Tiktaalik links fish and four-legged land animals. Every fossil is "transitional" between what came before and after it. The phrase also carries the mistaken idea that humans evolved FROM modern apes, rather than sharing a common ancestor with them.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-neanderthals-clean',
    title: 'Who the Neanderthals Were',
    category: 'Human Evolution',
    keywords: [
      'who were the neanderthals', 'what are neanderthals', 'did neanderthals interbreed with humans', 'why did neanderthals go extinct',
      'were neanderthals smart', 'neanderthal vs human', 'do we have neanderthal dna',
    ],
    content: `Neanderthals (Homo neanderthalensis) were a species of archaic humans who lived across Europe, the Middle East and western Asia from roughly 400,000 to about 40,000 years ago, when they died out. They were shorter and stockier than us, with a heavier brow, a big nose and a barrel chest — a build suited to a cold climate — and their brains were slightly larger than the modern human average. They were not the dim "cavemen" of stereotype: they made sophisticated stone tools, controlled fire, hunted big game cooperatively, wore clothing, used pigments and possibly jewellery, cared for their sick and buried their dead. Modern humans coming out of Africa overlapped and interbred with them, so people of non-African descent today carry about 1–2% Neanderthal DNA. Why they disappeared is debated — competition with modern humans, climate swings, small population size and absorption through interbreeding all likely played a part.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hominid-vs-hominin',
    title: 'What a Hominid Is (and Hominin)',
    category: 'Human Evolution',
    keywords: [
      'what is a hominid', 'what is a hominin', 'difference between hominid and hominin', 'what is the family hominidae',
      'are humans hominids', 'what animals are hominids', 'what is a great ape',
    ],
    content: `In current usage, a "hominid" is any member of the family Hominidae — the great apes — which includes orangutans, gorillas, chimpanzees, bonobos and humans, plus their fossil relatives. A "hominin" is the narrower group: humans and all our extinct relatives on our side of the split from chimpanzees (Australopithecus, Homo erectus, Neanderthals, etc.), but NOT chimps or gorillas. So all hominins are hominids, but not all hominids are hominins. (Older textbooks used "hominid" to mean what "hominin" means now, and called the big group "hominoids," which is why the terms can be confusing.) "Hominoid" is broader still — all apes, including gibbons. Humans are the only living hominin; there are eight or so living hominid species.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-denisovans',
    title: 'Who the Denisovans Were',
    category: 'Human Evolution',
    keywords: [
      'what is a denisovan', 'who were the denisovans', 'denisovan dna', 'where were denisovans found',
      'did humans interbreed with denisovans', 'denisova cave', 'denisovan vs neanderthal',
    ],
    content: `The Denisovans are an extinct group of archaic humans, sister group to the Neanderthals (both descend from a population that left Africa long before modern humans; Denisovans and Neanderthals split from each other around 400,000 years ago). They were identified only in 2010, from DNA in a tiny finger bone found in Denisova Cave in the Altai Mountains of Siberia — hence the name — and are known almost entirely from genetics plus a few teeth, a jaw from Tibet and skull fragments; there is no complete skeleton, so we don't really know what they looked like. They ranged across Asia, from Siberia to Southeast Asia, from roughly 200,000 to 30,000 years ago. Modern humans interbred with them: present-day people in Melanesia, Papua New Guinea and Australia carry about 3–5% Denisovan DNA, and a Denisovan gene variant helps modern Tibetans cope with high-altitude low oxygen.`,
    createdAt: Date.now(),
  },
];
