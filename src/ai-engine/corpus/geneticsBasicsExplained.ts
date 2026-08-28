import { KnowledgeItem } from '../../types';

export const GENETICS_BASICS_EXPLAINED_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-genetics-dna-genes-chromosomes',
    title: 'DNA, Genes, and Chromosomes: The Basics',
    category: 'genetics',
    keywords: ['difference between dna and genes', 'what is a chromosome', 'how many chromosomes do humans have', 'dna genes chromosomes explained'],
    content: `**DNA** (deoxyribonucleic acid) is the molecule that carries genetic instructions for building and operating every living organism, shaped as a famous double helix — two long strands twisted around each other, connected by pairs of four chemical bases (adenine, thymine, guanine, and cytosine, abbreviated A, T, G, C) whose specific sequence encodes information, much like letters spelling out words. A **gene** is a specific segment of DNA that contains the instructions for building one particular protein or functional molecule, which in turn helps determine a specific trait or biological function — humans have an estimated 20,000-25,000 genes in total. DNA is organized into structures called **chromosomes**, tightly coiled and packaged bundles of DNA and associated proteins; humans have 46 chromosomes in total, organized as 23 pairs (one chromosome in each pair inherited from each biological parent), found in the nucleus of nearly every cell in the body. One of these pairs, the sex chromosomes, typically determines biological sex — most commonly XX (female) or XY (male) combinations. Not all DNA differences between individuals affect visible traits; much genetic variation is functionally neutral, and complex traits like height or skin tone typically result from the combined, cumulative effect of many different genes interacting with each other and with environmental factors, rather than being controlled by any single gene alone — a common oversimplification in casual discussions of genetics.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-genetics-dominant-recessive-inheritance',
    title: 'Dominant and Recessive Genes: How Traits Are Inherited',
    category: 'genetics',
    keywords: ['dominant vs recessive genes', 'how are traits inherited', 'punnett square explained', 'gregor mendel genetics'],
    content: `Basic inheritance patterns were first systematically described by **Gregor Mendel**, an Austrian monk who conducted extensive pea plant breeding experiments in the 1860s, discovering fundamental rules of heredity decades before genes or DNA were even understood at a molecular level. For many simple traits, an individual inherits two versions (called alleles) of a given gene — one from each parent — and if those two alleles differ, the **dominant** allele's trait is typically the one physically expressed, while the **recessive** allele's trait remains hidden but can still be passed on to future offspring. A classic illustrative example (though real biology is often more complicated than this simplified textbook model) involves the recessive trait a child needing to inherit a copy of the recessive allele from *both* parents to actually display that recessive trait — meaning two parents who don't show a recessive trait themselves (because each has one dominant, masking allele) can still both be "carriers" and have a child who displays it, if the child happens to inherit the recessive allele from each of them. This pattern explains why some genetic conditions can seem to unexpectedly "skip" a generation, appearing in a grandchild despite neither parent showing symptoms. In reality, many human traits are far more complex than this simple dominant/recessive model, involving multiple genes interacting together (polygenic traits), varying degrees of dominance, and environmental influences — height, for example, is influenced by hundreds of different genes plus nutrition and other environmental factors, not any single dominant/recessive gene pair.`,
    createdAt: Date.now(),
  },
];
