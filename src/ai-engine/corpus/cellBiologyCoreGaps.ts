import { KnowledgeItem } from '../../types';

// Batch 79 (cell biology core — batch 46 covered molecular biology). nexus-4b
// misses: "what is a ribosome" refused and leaked retrieval confusion in caps
// ("HOLD ON. I'VE GOT ribosome UNDER DNA vs RNA AND UNDER ... WHICH ONE");
// "what is the mitochondrion" answered about a Canadian metal band; "what is
// DNA replication" and "what is the cell cycle" both drifted into transcription
// and translation; "virus vs bacterium at the cellular level" cut off
// mid-sentence.
export const CELL_BIOLOGY_CORE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-ribosome-core',
    title: 'What a Ribosome Is',
    category: 'Biology',
    keywords: [
      'what is a ribosome', 'ribosome protein synthesis translation', 'ribosomal rna subunits', 'free vs bound ribosomes rough er',
      'how does a ribosome read mrna', 'ribosome codon trna amino acid', '70s vs 80s ribosome',
    ],
    content: `A ribosome is the molecular machine that builds proteins — it carries out translation. It is made of ribosomal RNA (rRNA) and dozens of proteins, assembled into two subunits (a large one and a small one) that clamp around a messenger RNA strand. The ribosome moves along the mRNA reading it three bases (one codon) at a time; for each codon it accepts the matching transfer RNA (tRNA), which carries the corresponding amino acid, and links that amino acid onto the growing chain, then shifts to the next codon. When it hits a stop codon the finished polypeptide is released. "Free" ribosomes floating in the cytoplasm make proteins for use inside the cell; ribosomes docked on the rough endoplasmic reticulum make proteins destined for secretion, the cell membrane, or lysosomes. Ribosomes are found in every living cell — smaller (70S) in bacteria and archaea, larger (80S) in eukaryotes, a difference many antibiotics exploit to attack bacterial ribosomes without harming ours.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mitochondrion-core',
    title: 'What the Mitochondrion Is',
    category: 'Biology',
    keywords: [
      'what is the mitochondrion', 'powerhouse of the cell', 'mitochondria atp aerobic respiration', 'cristae matrix inner membrane',
      'mitochondrial dna maternal inheritance', 'endosymbiotic theory mitochondria', 'why do muscle cells have many mitochondria',
    ],
    content: `The mitochondrion is the organelle that generates most of a cell's usable energy, so it is nicknamed "the powerhouse of the cell." It has nothing to do with any band of that name. It has a double membrane: the smooth outer membrane, and an inner membrane thrown into deep folds called cristae that greatly increase its surface area and hold the electron transport chain. The interior space, the matrix, runs the Krebs (citric acid) cycle. Together these carry out aerobic respiration, using oxygen to extract energy from the products of glucose breakdown and store it as ATP — far more per glucose molecule than the cell could get without oxygen. Mitochondria carry their own small circular DNA and their own ribosomes, and in humans are inherited only from the mother; this is strong evidence for the endosymbiotic theory, that mitochondria descend from a free-living bacterium engulfed by an ancestral cell around 1.5–2 billion years ago. Cells with high energy demands — muscle, heart, liver, neurons — pack in thousands of them. Mitochondria also buffer calcium, produce heat, and help trigger apoptosis.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dna-replication-core',
    title: 'What DNA Replication Is',
    category: 'Biology',
    keywords: [
      'what is dna replication', 'semiconservative replication', 'helicase dna polymerase replication', 'leading and lagging strand okazaki',
      'when does dna replicate cell cycle s phase', 'is dna replication the same as transcription', 'base pairing a-t g-c copy',
    ],
    content: `DNA replication is the process of copying a cell's entire DNA so that each of the two cells produced by division gets a complete, identical set. It is not the same as transcription (which copies one gene into RNA). The double helix is unzipped by the enzyme helicase, exposing two single strands. Each strand then serves as a template: the enzyme DNA polymerase moves along it adding free nucleotides that pair with the template bases by the base-pairing rules (A with T, G with C). The result is two double helices, each made of one original ("parental") strand and one newly built strand — which is why replication is called "semiconservative." Because polymerase can only build in one direction, one new strand (the leading strand) is made continuously and the other (the lagging strand) is made in short pieces (Okazaki fragments) later joined together. Proofreading by the polymerase and repair enzymes keeps errors extremely rare. Replication happens once per cell cycle, during the S (synthesis) phase, before the cell divides.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cell-cycle-core',
    title: 'What the Cell Cycle Is',
    category: 'Biology',
    keywords: [
      'what is the cell cycle', 'interphase g1 s g2 m phase', 'mitosis cytokinesis cell division', 'cell cycle checkpoints cancer',
      'g0 resting phase', 'when does dna replicate in the cell cycle', 'is transcription part of the cell cycle',
    ],
    content: `The cell cycle is the ordered series of events a cell goes through to grow and divide into two. It has two broad parts. INTERPHASE, the longest, has three stages: G1 (the cell grows, makes proteins, and carries out its normal job), S (the cell replicates all of its DNA so each chromosome becomes two identical sister chromatids), and G2 (more growth and preparation, checking the copied DNA). Then the M PHASE: mitosis divides the nucleus into two genetically identical nuclei through prophase, metaphase, anaphase and telophase, and cytokinesis splits the cytoplasm, producing two daughter cells. (Transcription and translation are ongoing cell activities, not steps of the cycle's DNA copying.) Progress is policed by checkpoints — mainly at the G1/S boundary, the G2/M boundary, and during mitosis — that halt the cycle if the cell is too small, DNA is damaged, or chromosomes are not properly attached. Loss of this control lets damaged cells keep dividing and is central to cancer. Cells that are not currently dividing sit in a resting state called G0.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-virus-vs-bacterium-cellular',
    title: 'Virus versus Bacterium at the Cellular Level',
    category: 'Biology',
    keywords: [
      'what is the difference between a virus and a bacterium at the cellular level', 'is a virus a cell', 'bacteria have ribosomes viruses dont',
      'virion capsid envelope structure', 'why cant a virus reproduce on its own', 'virus vs bacteria size microscope',
    ],
    content: `A bacterium IS a cell. It has a plasma membrane, cytoplasm, ribosomes, a circular chromosome of DNA (plus small plasmids), usually a protective cell wall, and often flagella or pili. It runs its own metabolism, makes its own proteins and ATP, and reproduces on its own by binary fission (splitting in two). Bacteria are typically 1–10 micrometres across and visible with an ordinary light microscope. A virus is NOT a cell. A virus particle (virion) is just a length of genetic material — DNA or RNA — inside a protein coat (capsid), sometimes wrapped in a stolen lipid envelope studded with glycoprotein spikes. It has no ribosomes, no metabolism, no way to make energy or proteins, and cannot reproduce by itself. To multiply, a virus must attach to a specific host cell, get its genome inside, and hijack that cell's ribosomes, enzymes and building blocks to manufacture new virus particles, usually destroying the cell. Viruses are roughly 20–300 nanometres — about 10 to 100 times smaller than bacteria — and need an electron microscope to see. This is also why antibiotics (which target bacterial cell structures) do nothing to viruses.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-photosynthesis-stages',
    title: 'What Photosynthesis Is (and Its Two Stages)',
    category: 'Biology',
    keywords: [
      'what is photosynthesis', 'light dependent reactions calvin cycle', 'thylakoid stroma chloroplast', 'photosynthesis equation glucose oxygen',
      'chlorophyll absorbs light', 'where does photosynthesis happen', 'how do plants fix carbon dioxide',
    ],
    content: `Photosynthesis is how plants, algae and some bacteria use light energy to build sugar from carbon dioxide and water, releasing oxygen as a by-product. Overall: 6 CO2 + 6 H2O + light energy → C6H12O6 (glucose) + 6 O2. It happens in chloroplasts and runs in two linked stages. The LIGHT-DEPENDENT REACTIONS occur in the thylakoid membranes: chlorophyll absorbs light, which drives the splitting of water molecules (releasing the O2), and the energy is captured as the short-term carriers ATP and NADPH; electrons flow through an electron transport chain much like the one in mitochondria. The LIGHT-INDEPENDENT REACTIONS (the Calvin cycle) occur in the stroma, the fluid around the thylakoids: the enzyme RuBisCO "fixes" CO2 from the air onto a 5-carbon sugar, and the ATP and NADPH from the first stage are spent to convert it, step by step, into glucose and to regenerate the starting molecule. Photosynthesis is the ultimate source of almost all food energy and atmospheric oxygen on Earth.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cellular-respiration-stages',
    title: 'What Cellular Respiration Is (and Its Three Stages)',
    category: 'Biology',
    keywords: [
      'what is cellular respiration', 'glycolysis krebs cycle electron transport chain', 'how many atp from glucose', 'aerobic vs anaerobic respiration',
      'why do we need oxygen respiration', 'mitochondria atp production', 'nadh fadh2 oxidative phosphorylation',
    ],
    content: `Cellular respiration is how cells release the energy stored in glucose (and other fuels) and repackage it as ATP, the molecule that powers cellular work. Overall: C6H12O6 + 6 O2 → 6 CO2 + 6 H2O + energy (ATP). It runs in three stages. GLYCOLYSIS, in the cytoplasm, splits one glucose into two pyruvate molecules, yielding a small net gain of ATP and some NADH; it needs no oxygen. The KREBS (citric acid) CYCLE, in the mitochondrial matrix, fully breaks down the pyruvate-derived carbons to CO2, harvesting more NADH and FADH2. OXIDATIVE PHOSPHORYLATION, at the inner mitochondrial membrane, feeds those electron carriers into the electron transport chain; the energy pumps protons across the membrane, and their flow back through the enzyme ATP synthase makes most of the ATP. Oxygen is essential here as the final electron acceptor, becoming water. A modern estimate is roughly 30–32 ATP per glucose (older textbooks say 36–38). Without oxygen, cells fall back on fermentation, producing far less ATP plus lactate or ethanol.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dna-vs-rna',
    title: 'The Difference Between DNA and RNA',
    category: 'Biology',
    keywords: [
      'what is the difference between dna and rna', 'deoxyribose vs ribose sugar', 'thymine vs uracil', 'dna double stranded rna single stranded',
      'mrna trna rrna functions', 'why is rna less stable than dna', 'dna stores rna carries information',
    ],
    content: `DNA and RNA are both nucleic acids — chains of nucleotides — but differ in four main ways. SUGAR: DNA uses deoxyribose, RNA uses ribose (which has an extra hydroxyl group, making RNA more reactive and less stable). BASES: both use adenine, guanine and cytosine, but DNA's fourth base is thymine (T) while RNA's is uracil (U). STRUCTURE: DNA is normally a double helix of two complementary strands, which makes it stable and easy to copy and repair; RNA is usually a single strand that folds back on itself into shapes. FUNCTION: DNA is the cell's permanent archive of genetic information, kept safe in the nucleus; RNA is the working copy and the messenger — messenger RNA (mRNA) carries a gene's instructions from the nucleus to the ribosomes, transfer RNA (tRNA) brings amino acids during translation, and ribosomal RNA (rRNA) forms the core of the ribosome itself. Some viruses use RNA rather than DNA as their genome.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stem-cell-core',
    title: 'What a Stem Cell Is',
    category: 'Biology',
    keywords: [
      'what is a stem cell', 'stem cell self-renewal differentiation', 'totipotent pluripotent multipotent', 'embryonic stem cells ipsc',
      'adult stem cells bone marrow', 'stem cells regenerative medicine', 'what can stem cells become',
    ],
    content: `A stem cell is an unspecialised cell with two defining abilities: it can divide to make more copies of itself (self-renewal), and it can differentiate into one or more specialised cell types (muscle, nerve, blood, skin, and so on). Stem cells are graded by how many cell types they can become. TOTIPOTENT cells can form an entire organism including the placenta — only the fertilised egg and its first few divisions. PLURIPOTENT cells can become any cell type of the body but not a whole organism — embryonic stem cells, and "induced pluripotent stem cells" (iPSCs) made by reprogramming ordinary adult cells, a discovery that won a Nobel Prize. MULTIPOTENT cells can become a limited family of related types — for example the blood-forming (haematopoietic) stem cells in bone marrow, which produce all blood and immune cells. Adult stem cells maintain and repair tissues throughout life. Stem cells are used clinically in bone-marrow transplants and skin grafts, and are researched for regenerative medicine, drug testing, and modelling disease.`,
    createdAt: Date.now(),
  },
];
