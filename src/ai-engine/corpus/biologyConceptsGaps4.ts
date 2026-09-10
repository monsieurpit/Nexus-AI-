import { KnowledgeItem } from '../../types';

/**
 * BIOLOGY_CONCEPTS_GAPS_4 — batch 245 corrections.
 * nexus-4b is strong on biology. Misses:
 * - "plant cell vs animal cell": said animal DNA "floats in the cytoplasm"
 *   while plants "have a proper nucleus" (both are eukaryotic, both have a
 *   nucleus).
 * - "cell wall vs cell membrane": drifted into chitin/ergosterol comparisons
 *   without contrasting the two.
 * - "homologous vs analogous structure": defined homologous as "bits of DNA
 *   that evolved separately".
 * - "convergent vs divergent evolution": cut off, and gave "ostriches live in
 *   cold climates" as an example.
 * - "mutation vs genetic disorder": called Huntington's and achondroplasia
 *   recessive (both are dominant).
 * - "species vs population", "predator vs parasite", "nucleus vs nucleolus",
 *   "artery vs arteriole" were cut off before the second half.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'biology', keywords, content, createdAt: now,
});

export const BIOLOGY_CONCEPTS_GAPS_4: KnowledgeItem[] = [
  k(
    'kb-gap-bio4-plant-vs-animal-cell',
    'Plant cell vs animal cell',
    [
      'difference between a plant cell and an animal cell', 'both are eukaryotic and both have a nucleus', 'plant cells have a cellulose cell wall chloroplasts and a large central vacuole and a fixed rectangular shape',
      'animal cells have no cell wall no chloroplasts small or no vacuoles centrioles and a flexible shape', 'lysosomes more prominent in animal cells', 'not that animal DNA floats in the cytoplasm',
    ],
    `Both are EUKARYOTIC cells: both have a true membrane-bound NUCLEUS containing the chromosomes, plus mitochondria, endoplasmic reticulum, Golgi apparatus, ribosomes, and a cell membrane. (It is a common error to say animal-cell DNA "floats in the cytoplasm" — that describes PROKARYOTES; animal cells have a nucleus just like plant cells.)

What PLANT cells have that animal cells lack:
- a rigid CELL WALL made of cellulose, outside the membrane, giving shape and support;
- CHLOROPLASTS for photosynthesis (so plants make their own food);
- one large permanent central VACUOLE that stores water and cell sap and keeps the cell turgid;
- a fixed, roughly rectangular/box shape.

What ANIMAL cells have or do differently:
- NO cell wall, so a flexible, variable shape;
- NO chloroplasts (animals must eat);
- small, temporary vacuoles if any;
- CENTRIOLES / a centrosome that organise the spindle in cell division;
- generally more prominent LYSOSOMES for digestion, and they store carbohydrate as glycogen rather than starch.`,
  ),
  k(
    'kb-gap-bio4-cell-wall-vs-membrane',
    'Cell wall vs cell membrane',
    [
      'difference between the cell wall and the cell membrane', 'the cell membrane plasma membrane is a thin flexible selectively permeable phospholipid bilayer around every cell controlling what enters and leaves', 'the cell wall is a rigid non-living outer layer outside the membrane found only in plants fungi bacteria and algae',
      'cell wall provides structural support and protection and is fully permeable not selective', 'animal cells have a membrane but no wall', 'cellulose chitin peptidoglycan',
    ],
    `The CELL MEMBRANE (plasma membrane) surrounds EVERY cell — plant, animal, fungal, bacterial. It is a thin, flexible, LIVING layer: a phospholipid BILAYER studded with proteins. Its key property is that it is SELECTIVELY PERMEABLE — it actively controls which substances enter and leave the cell (by diffusion, osmosis, facilitated transport, and energy-requiring active transport). It also holds receptors for signalling.

The CELL WALL is an additional RIGID layer OUTSIDE the membrane, and it is found only in certain organisms: plants (made of CELLULOSE), fungi (CHITIN), bacteria (PEPTIDOGLYCAN), and algae. It is largely NON-LIVING and FULLY PERMEABLE — water and dissolved substances pass straight through it; it does not choose what gets in. Its jobs are STRUCTURAL: it gives the cell a defined shape, resists bursting when water rushes in (turgor), and provides mechanical protection and support (it is what makes wood and plant stems stiff).

So: every cell has a membrane (thin, living, selective gatekeeper); only some have a wall as well (thick, rigid, non-selective armour) sitting outside it. Animal cells have a membrane but no wall.`,
  ),
  k(
    'kb-gap-bio4-homologous-vs-analogous',
    'Homologous vs analogous structures',
    [
      'difference between a homologous and an analogous structure', 'homologous structures share a common evolutionary origin inherited from a common ancestor even if they now do different jobs', 'analogous structures have similar function or appearance but different evolutionary origins',
      'human arm bat wing whale flipper pentadactyl limb are homologous', 'bird wing and insect wing are analogous shark and dolphin body shape', 'homology is evidence of divergent evolution analogy results from convergent evolution',
    ],
    `HOMOLOGOUS structures share a common EVOLUTIONARY ORIGIN — they are inherited from a common ancestor and built on the same underlying plan, even if they have since been modified for very different uses. The classic example is the vertebrate forelimb (the "pentadactyl limb"): a human arm, a bat's wing, a whale's flipper, a cat's leg, and a bird's wing all contain the same set of bones (humerus, radius, ulna, carpals, metacarpals, phalanges) in the same arrangement, because they all descend from a common tetrapod ancestor. Homology is strong EVIDENCE that species share ancestry, and it is the product of DIVERGENT evolution.

ANALOGOUS structures have a similar FUNCTION (and often similar appearance) but DIFFERENT evolutionary origins — they evolved independently in unrelated lineages facing similar problems. A bird's wing, a bat's wing, and an insect's wing all serve as wings, but the insect wing is built completely differently from the vertebrate ones. The streamlined, finned body shape of a shark (a fish) and a dolphin (a mammal) is analogous. Analogy is the product of CONVERGENT evolution and does NOT indicate close relationship.

Short version: homologous = same origin, maybe different job (common ancestry); analogous = same job, different origin (convergence).`,
  ),
  k(
    'kb-gap-bio4-convergent-vs-divergent-evolution',
    'Convergent vs divergent evolution',
    [
      'difference between convergent and divergent evolution', 'convergent evolution unrelated lineages independently evolve similar traits because of similar selective pressures producing analogous structures', 'divergent evolution one ancestral lineage splits and the descendant groups become increasingly different as they adapt to different niches producing homologous structures',
      'dolphin and shark body shape wings in birds bats insects camera eye in vertebrates and octopus are convergent', 'Darwins finches the adaptive radiation of the pentadactyl limb are divergent',
    ],
    `CONVERGENT evolution: two or more UNRELATED lineages independently evolve SIMILAR features because they face SIMILAR environmental pressures. There is no shared ancestor for the trait — it arose separately each time. Results in ANALOGOUS structures. Examples: the streamlined body and fins of sharks (fish), ichthyosaurs (reptiles), and dolphins (mammals); wings in birds, bats, and pterosaurs; the complex "camera" eye in vertebrates and, quite separately, in octopuses; cactus-like water-storing plants in American deserts and unrelated euphorbias in African ones.

DIVERGENT evolution: a SINGLE ancestral lineage SPLITS, and the descendant populations accumulate differences over time as they adapt to DIFFERENT niches, so related groups become less and less alike. Results in HOMOLOGOUS structures. Examples: Darwin's finches, all descended from one South American ancestor, now with beaks specialised for seeds, insects, or nectar; the single tetrapod forelimb diversifying into the human arm, bat wing, whale flipper, and horse leg; the "adaptive radiation" of mammals after the dinosaurs died out.

So: convergence makes distant relatives look alike; divergence makes close relatives look different. (Note the earlier example of "ostriches in cold climates" is wrong — ostriches live in hot African savanna; a better convergence example for cold is the thick insulation of penguins and, separately, of Arctic seals.)`,
  ),
  k(
    'kb-gap-bio4-mutation-vs-genetic-disorder',
    'Mutation vs genetic disorder',
    [
      'difference between a mutation and a genetic disorder', 'a mutation is any change in the DNA sequence most are neutral or harmless some beneficial some harmful', 'a genetic disorder is a disease caused by one or more mutations or a chromosomal abnormality that disrupts normal function',
      'genetic disorders can be inherited or arise spontaneously dominant or recessive single-gene or chromosomal or multifactorial', 'Huntington disease and achondroplasia are dominant only one faulty copy needed', 'cystic fibrosis and sickle cell are recessive',
    ],
    `A MUTATION is any CHANGE in the DNA sequence — a swapped base, a deletion, an insertion, a duplicated or rearranged segment, or a whole extra chromosome. Mutations happen constantly, from copying errors during cell division and from mutagens (UV, chemicals, radiation). MOST mutations are neutral (in non-coding DNA or silent), some are harmful, and a few are beneficial — mutation is the raw source of the genetic variation that evolution acts on.

A GENETIC DISORDER is a DISEASE that is CAUSED by one or more mutations (or a chromosomal abnormality) which disrupt a gene's or genome's normal function. Genetic disorders vary widely:
- INHERITANCE: many run in families, but a large fraction are "de novo" — a new mutation in the egg, sperm, or early embryo, with no affected parent.
- PATTERN: some are DOMINANT (one faulty copy is enough — Huntington's disease, achondroplasia, Marfan syndrome), some are RECESSIVE (two faulty copies needed — cystic fibrosis, sickle-cell anaemia, Tay-Sachs), some are X-linked (haemophilia, Duchenne).
- SCOPE: single-gene, whole-chromosome (Down syndrome = an extra chromosome 21), or "multifactorial" (many genes plus environment — most heart disease, type 2 diabetes).

So: a mutation is the change in the DNA; a genetic disorder is a harmful medical condition that a particular disease-causing mutation (or set of them) produces.`,
  ),
  k(
    'kb-gap-bio4-species-vs-population',
    'Species vs population',
    [
      'difference between a species and a population', 'a species is a group of organisms that can interbreed and produce fertile offspring and is reproductively isolated from other such groups', 'a population is a group of individuals of the same species living in the same area at the same time and interbreeding',
      'one species can consist of many geographically separated populations', 'gene pool of a population', 'the mule shows horse and donkey are different species',
    ],
    `A SPECIES is the fundamental unit of classification. The common ("biological species") definition: a group of organisms that can INTERBREED with one another and produce FERTILE offspring, and that are reproductively ISOLATED from other such groups (they cannot, or in nature do not, successfully breed with them). Horses and donkeys are different species — they can mate, but the offspring (a mule) is sterile.

A POPULATION is a group of individuals OF THE SAME SPECIES that live in the same area at the same time and actually interbreed with each other. It has a shared "gene pool" and can be described by its size, density, age structure, birth and death rates.

The relationship: a single species is usually made up of MANY separate populations spread across its range — all the deer in one forest are one population, the deer in a forest 300 km away are another population, and together (with all the others) they make up the species. Populations of the same species can differ genetically (local adaptation), and if two populations become isolated for long enough they may eventually diverge into separate species (speciation).`,
  ),
  k(
    'kb-gap-bio4-predator-vs-parasite',
    'Predator vs parasite',
    [
      'difference between a predator and a parasite', 'a predator kills and eats multiple prey over its lifetime is usually similar in size or larger than the prey and the interaction is brief', 'a parasite lives on or in one host feeds on it over an extended period is much smaller than the host and usually does not kill it',
      'ectoparasites fleas ticks lice endoparasites tapeworms', 'a parasitoid lives in a host and eventually kills it in between the two', 'both are +/- relationships one benefits one is harmed',
    ],
    `Both are relationships where one organism benefits at another's expense, but the style of exploitation differs.

A PREDATOR hunts, kills, and consumes its prey, then moves on to the next one. Over a lifetime it kills MANY prey. The interaction with any one prey animal is BRIEF (a chase and a kill), and the predator is usually about the same size as, or larger than, the prey. Lions, hawks, spiders, and killer whales are predators.

A PARASITE lives ON (ectoparasite: fleas, ticks, lice, leeches) or INSIDE (endoparasite: tapeworms, malaria plasmodium, gut roundworms) a single HOST and feeds on it over a PROLONGED period — days, months, or a lifetime. A parasite is normally MUCH SMALLER than its host and typically does NOT kill it outright, because a dead host means no more food and no chance to reproduce or spread. Instead it weakens the host, steals resources, and often manipulates it.

In between sits the PARASITOID (many wasps and flies): it lays eggs in or on a host, its larvae develop by eating the host from inside, and the host IS eventually killed. That is why parasitic wasps are a special case rather than plain predators or plain parasites.`,
  ),
  k(
    'kb-gap-bio4-nucleus-vs-nucleolus',
    'Nucleus vs nucleolus',
    [
      'difference between the nucleus and the nucleolus', 'the nucleus is a large membrane-bound organelle that houses the cells chromosomal DNA and controls gene expression and cell activities', 'the nucleolus is a dense non-membrane-bound region inside the nucleus where ribosomal RNA is made and ribosome subunits are assembled',
      'one nucleus per cell one or more nucleoli within it', 'nuclear envelope with pores', 'the nucleolus disappears during cell division',
    ],
    `The NUCLEUS is a large organelle, usually the biggest in the cell, wrapped in a double membrane (the nuclear envelope) pierced by pores. It holds the cell's CHROMOSOMES (its DNA) and is where DNA is stored, protected, replicated, and transcribed into RNA. It is effectively the cell's control centre — the genes it switches on and off direct everything the cell makes and does. A cell normally has ONE nucleus (red blood cells have none; some muscle and liver cells have several).

The NUCLEOLUS is a smaller, DENSE, roundish body found INSIDE the nucleus. It is NOT membrane-bound — it is just a region where certain chromosome segments cluster. Its specific job is making RIBOSOMES: it transcribes ribosomal RNA (rRNA) and assembles it with proteins into the two ribosome subunits, which are then exported through the nuclear pores to the cytoplasm to make proteins. A nucleus can contain ONE or SEVERAL nucleoli, and they get larger in cells that make a lot of protein. The nucleolus breaks down at the start of cell division and reforms afterward.

So: the nucleus is the whole DNA-containing compartment; the nucleolus is a ribosome-factory sub-region within it.`,
  ),
  k(
    'kb-gap-bio4-artery-vs-arteriole',
    'Artery vs arteriole',
    [
      'difference between an artery and an arteriole', 'an artery is a large blood vessel carrying blood away from the heart with thick elastic and muscular walls to withstand high pulsing pressure', 'an arteriole is a tiny terminal branch of the arterial tree about 10 to 100 micrometres wide with walls mostly of smooth muscle',
      'arterioles are the main site of adjustable resistance they constrict and dilate to control blood flow into capillaries and regulate blood pressure', 'sequence heart artery arteriole capillary venule vein',
    ],
    `Both carry blood AWAY from the heart toward the tissues; the difference is size and role.

An ARTERY is a large vessel — from the aorta (about 2.5 cm across) down to named arteries like the carotid or femoral. Its wall has three layers with lots of ELASTIC tissue and smooth muscle, built to withstand the high, PULSING pressure of each heartbeat and to recoil between beats, smoothing the flow. Arteries are conduits: they distribute blood to the regions of the body.

An ARTERIOLE is a very small terminal branch of the arterial system, roughly 10-100 micrometres in diameter — the last vessels before the capillaries. Their walls are proportionally mostly SMOOTH MUSCLE with little elastic tissue. Their job is CONTROL: by constricting (vasoconstriction) or widening (vasodilation) in response to nerves, hormones, and local chemical signals, arterioles are the main adjustable RESISTANCE in the circulation. They set how much blood flows into each capillary bed (directing it to working muscle, skin for cooling, the gut after a meal) and, collectively, they are a major regulator of overall blood pressure.

The sequence is: heart -> artery -> arteriole -> capillary (exchange) -> venule -> vein -> heart.`,
  ),
  k(
    'kb-gap-bio4-mitochondria-vs-chloroplasts',
    'Mitochondria vs chloroplasts',
    [
      'difference between mitochondria and chloroplasts', 'mitochondria carry out aerobic respiration breaking glucose and oxygen down to release energy as ATP found in nearly all eukaryotic cells', 'chloroplasts carry out photosynthesis using light energy to build glucose from carbon dioxide and water found only in plants and algae',
      'both have their own small circular DNA and double membranes and arose by endosymbiosis', 'respiration releases energy photosynthesis stores it', 'chloroplasts contain chlorophyll and thylakoids',
    ],
    `Both are double-membraned organelles that handle a cell's ENERGY, both contain their own small circular DNA and ribosomes, and both are thought to have originated as free-living bacteria engulfed by an ancestral cell (endosymbiosis). But they do opposite jobs and are not found in the same range of cells.

MITOCHONDRIA carry out AEROBIC RESPIRATION. They take in glucose-derived molecules and oxygen and break them down, capturing the RELEASED energy in ATP, the cell's usable energy currency, and giving off carbon dioxide and water. They are found in nearly ALL eukaryotic cells — plant, animal, fungal, protist — and cells that need a lot of energy (muscle, liver, neurons) are packed with them. Their inner membrane is folded into "cristae" to maximise surface area.

CHLOROPLASTS carry out PHOTOSYNTHESIS. They capture LIGHT energy with the green pigment chlorophyll (held in stacked membrane discs called thylakoids) and use it to build glucose FROM carbon dioxide and water, releasing oxygen. They STORE energy in chemical form. They are found ONLY in plants and algae (and are what makes leaves green).

Short version: mitochondria = in almost all eukaryotes, respiration, release energy from sugar; chloroplasts = plants and algae only, photosynthesis, capture light energy into sugar. In a plant leaf cell the chloroplasts make the sugar and the mitochondria then burn it.`,
  ),
  k(
    'kb-gap-bio4-photosynthesis-vs-respiration',
    'Photosynthesis vs cellular respiration',
    [
      'difference between photosynthesis and respiration', 'photosynthesis in chloroplasts uses light energy carbon dioxide and water to make glucose and oxygen storing energy occurs in plants algae and cyanobacteria in the light', 'cellular respiration in mitochondria uses glucose and oxygen to make carbon dioxide water and ATP releasing energy occurs in all living things all the time',
      'they are roughly the reverse of each other', 'plants do both animals only respire', 'gas exchange oxygen and carbon dioxide',
    ],
    `They are near-opposite chemical processes that together move energy and carbon through life.

PHOTOSYNTHESIS happens in CHLOROPLASTS (in plants, algae, and cyanobacteria) and only when there is LIGHT. It takes in carbon dioxide and water and uses LIGHT ENERGY to build GLUCOSE, releasing oxygen as a by-product:
6CO2 + 6H2O + light -> C6H12O6 + 6O2.
It STORES energy (from sunlight) in the chemical bonds of sugar, and it is how essentially all the food and oxygen on Earth are made.

CELLULAR RESPIRATION happens in MITOCHONDRIA (in every living cell — plants, animals, fungi, microbes) and goes on CONTINUOUSLY, day and night. It takes GLUCOSE and OXYGEN and breaks them down to carbon dioxide and water, RELEASING the stored energy in a usable form (ATP):
C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP (energy).

So they are roughly the REVERSE of each other. Key point people miss: ANIMALS only respire; PLANTS do BOTH — they photosynthesise in the light (making more sugar and oxygen than they use) and respire all the time (using sugar and oxygen for energy). Over a full day a healthy plant is a net oxygen producer.`,
  ),
  k(
    'kb-gap-bio4-bacteria-vs-archaea',
    'Bacteria vs archaea',
    [
      'difference between bacteria and archaea', 'both are single-celled prokaryotes with no nucleus but they are separate domains of life', 'bacterial cell walls contain peptidoglycan archaeal walls do not',
      'bacterial membrane lipids are ester-linked straight fatty acids archaeal lipids are ether-linked branched isoprenoids sometimes a monolayer', 'archaea are genetically and biochemically closer to eukaryotes for transcription and translation', 'archaea dominate many extreme environments hot springs salt lakes deep sea but also live everywhere',
    ],
    `Both are PROKARYOTES — single cells with no nucleus and no membrane-bound organelles — and they look similar under a microscope. But molecular biology showed they are two SEPARATE DOMAINS of life, as different from each other as either is from eukaryotes.

Key differences:
- CELL WALL: most bacteria have walls containing PEPTIDOGLYCAN (murein); archaea NEVER do (they use other polymers, e.g. pseudopeptidoglycan or protein S-layers). This is why many antibiotics that attack peptidoglycan hit bacteria but not archaea.
- MEMBRANE LIPIDS: bacterial (and eukaryotic) membrane lipids are unbranched fatty acids joined to glycerol by ESTER bonds; archaeal lipids are BRANCHED isoprenoid chains joined by ETHER bonds, and in many heat-loving archaea the membrane is a single tough MONOLAYER rather than a bilayer. This helps archaea survive extreme heat and acidity.
- GENETICS: archaeal DNA replication, transcription (RNA polymerase), and translation (ribosomes, initiation) machinery is more like that of EUKARYOTES than of bacteria.
- LIFESTYLE: archaea are famous for thriving in EXTREME conditions — boiling hot springs, highly acidic or salty water, anoxic sediments (methane-makers) — but they are also common in soil, oceans, and animal guts.

Short version: same basic cell type, three-domain tree puts Bacteria and Archaea on separate branches, with Archaea sharing more molecular machinery with us.`,
  ),
];
