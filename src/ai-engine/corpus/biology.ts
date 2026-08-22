import { KnowledgeItem } from '../../types';

export const BIOLOGY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-biology-cell-biology',
    title: 'Cell Biology: The Building Block of Life',
    category: 'Biology',
    keywords: ['cell', 'biology', 'mitochondria', 'nucleus', 'DNA', 'ribosome', 'membrane', 'organelle', 'eukaryote', 'prokaryote'],
    content: `All living organisms are composed of cells — the fundamental structural and functional unit of life. Prokaryotic cells (bacteria, archaea) lack a membrane-bound nucleus; their DNA floats in the cytoplasm. Eukaryotic cells (plants, animals, fungi) have a nucleus containing chromosomal DNA, and specialised organelles. The cell membrane (phospholipid bilayer) regulates what enters and exits. The nucleus houses DNA and directs cell activity. Mitochondria are the cell's power plants, producing ATP via cellular respiration (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~38 ATP). Ribosomes synthesise proteins by translating mRNA. The endoplasmic reticulum (ER) processes proteins and lipids; the Golgi apparatus packages and ships them. Lysosomes digest waste. Chloroplasts in plant cells conduct photosynthesis. The cytoskeleton — microtubules, actin filaments — gives cells shape and enables movement. Cell division occurs via mitosis (producing two identical daughter cells for growth/repair) or meiosis (producing four genetically unique gametes for sexual reproduction). Understanding cells is fundamental to medicine, genetics, and biotechnology.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-biology-dna-genetics',
    title: 'DNA, RNA, and Genetics',
    category: 'Biology',
    keywords: ['DNA', 'RNA', 'genetics', 'gene', 'protein', 'helix', 'nucleotide', 'adenine', 'guanine', 'heredity', 'mutation', 'CRISPR'],
    content: `Deoxyribonucleic acid (DNA) is the molecule that carries genetic information in all living organisms and many viruses. Its double-helix structure, discovered by Watson and Crick in 1953 using X-ray data from Rosalind Franklin, consists of two complementary strands of nucleotides. Each nucleotide has a deoxyribose sugar, a phosphate group, and one of four nitrogenous bases: adenine (A), thymine (T), guanine (G), or cytosine (C). A pairs with T and G pairs with C. Genes are segments of DNA that encode proteins. Transcription converts DNA into messenger RNA (mRNA) in the nucleus. Translation at ribosomes reads mRNA codons (triplets of bases) to assemble amino acids into proteins. The genetic code is nearly universal across all life. Mutations are changes to DNA sequence — many are neutral, some cause disease, some enable adaptation. Heredity follows Mendel's laws: dominant alleles mask recessive ones. Modern genetics encompasses epigenetics (gene expression regulation without sequence change), CRISPR-Cas9 gene editing, whole-genome sequencing, and personalised medicine.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-biology-evolution-natural-selection',
    title: 'Evolution by Natural Selection',
    category: 'Biology',
    keywords: ['evolution', 'natural selection', 'Darwin', 'fitness', 'species', 'genetics', 'adaptation', 'fossil', 'mutation', 'speciation'],
    content: `Charles Darwin and Alfred Russel Wallace independently proposed the theory of evolution by natural selection in 1858–1859. The theory rests on several observations: individuals in a population show heritable variation, more offspring are produced than can survive, and those with advantageous traits survive and reproduce more (differential fitness). Over generations, beneficial traits increase in frequency — populations adapt to their environments. Speciation occurs when populations become reproductively isolated, accumulating different genetic changes. Evidence for evolution is overwhelming: the fossil record shows gradual changes over millions of years; homologous structures (human hand, bat wing, whale flipper share the same bones) indicate common ancestry; molecular biology reveals that all life shares a genetic code; direct observation shows bacteria evolving antibiotic resistance. The modern evolutionary synthesis integrates Darwinian selection with Mendelian genetics and population genetics. Common descent means all life on Earth shares a single ancestor ~3.5 billion years ago. Evolution explains the diversity and unity of all life and is the unifying theory of biology.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-biology-photosynthesis',
    title: 'Photosynthesis: Converting Light to Life',
    category: 'Biology',
    keywords: ['photosynthesis', 'chlorophyll', 'glucose', 'oxygen', 'light', 'Calvin cycle', 'plant', 'chloroplast', 'ATP', 'CO2'],
    content: `Photosynthesis is the process by which plants, algae, and cyanobacteria convert light energy into chemical energy stored in glucose: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. It occurs in chloroplasts, which contain the green pigment chlorophyll that absorbs primarily red and blue light (reflecting green). Photosynthesis has two stages. The light-dependent reactions occur in the thylakoid membranes: sunlight excites electrons in chlorophyll, which pass along the electron transport chain, generating ATP and NADPH. Water is split (photolysis), releasing oxygen as a byproduct — the origin of Earth's atmospheric oxygen. The light-independent reactions (Calvin cycle) occur in the stroma: CO₂ is fixed (combined with a 5-carbon sugar) using ATP and NADPH, ultimately producing glucose. Factors affecting the rate of photosynthesis include light intensity, CO₂ concentration, temperature, and water availability. C3 plants (most plants) fix CO₂ directly; C4 plants (maize, sugarcane) and CAM plants (cacti) have evolved mechanisms to improve efficiency in hot or arid conditions. Photosynthesis is the primary source of oxygen and organic carbon sustaining almost all ecosystems.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-biology-nervous-system',
    title: 'The Human Nervous System',
    category: 'Biology',
    keywords: ['brain', 'nervous system', 'neuron', 'synapse', 'neurotransmitter', 'action potential', 'memory', 'cognition', 'dopamine', 'serotonin'],
    content: `The nervous system processes and transmits information, coordinating body functions and behaviour. The central nervous system (CNS) consists of the brain and spinal cord. The peripheral nervous system (PNS) connects the CNS to the rest of the body. Neurons are the basic information-processing cells: dendrites receive signals, the cell body integrates them, and the axon transmits electrical impulses (action potentials) to the next neuron. Action potentials are all-or-nothing electrochemical waves caused by rapid Na⁺ influx followed by K⁺ efflux across the neuronal membrane. Synapses are junctions between neurons; most are chemical, releasing neurotransmitters (dopamine, serotonin, acetylcholine, GABA) that bind to receptors on the next cell. The brain has regions with specialised functions: the cerebral cortex handles reasoning, language, and perception; the hippocampus forms long-term memories; the amygdala processes emotions; the cerebellum coordinates movement; the brainstem regulates breathing and heart rate. Neuroplasticity allows the brain to reorganise and form new connections in response to learning or injury. Disorders include Alzheimer's, Parkinson's, depression, and epilepsy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-biology-ecosystems-biodiversity',
    title: 'Ecosystems, Food Webs, and Biodiversity',
    category: 'Biology',
    keywords: ['ecosystem', 'food web', 'biodiversity', 'trophic level', 'decomposer', 'biome', 'carbon cycle', 'habitat', 'species', 'ecology'],
    content: `An ecosystem comprises all living organisms (biotic components) in an area and their physical environment (abiotic components — sunlight, water, temperature, nutrients). Energy flows through ecosystems via food webs. Producers (plants, algae) capture solar energy through photosynthesis. Primary consumers (herbivores) eat producers. Secondary consumers eat primary consumers, and so on up to apex predators. At each trophic level, ~90% of energy is lost as heat, which is why ecosystems support fewer large predators than prey. Decomposers (bacteria, fungi) break down dead matter, recycling nutrients. Biogeochemical cycles — carbon, nitrogen, phosphorus, water — move essential elements through living and non-living components. Biodiversity — the variety of genes, species, and ecosystems — provides resilience, ecosystem services (pollination, water purification, climate regulation), and potential for medicine. Biomes are large regional ecosystems: tropical rainforest, desert, grassland, temperate forest, boreal forest, tundra, and ocean. Keystone species have disproportionate impacts on their ecosystems. Human activity — habitat destruction, climate change, invasive species, pollution, overexploitation — drives the current sixth mass extinction, threatening the biodiversity that underpins all life.`,
    createdAt: Date.now(),
  },
];
