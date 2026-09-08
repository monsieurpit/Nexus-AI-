import { KnowledgeItem } from '../../types';

// Batch 58 (genetics & heredity) gap-fills. Live misses on nexus-4b:
// "how is sex determined genetically" -> "there's absolutely no genetic
// determination for sex"; "DNA fingerprinting" -> "comparing the ridges on your
// fingertips"; "the founder effect" -> a photoelectric-effect / Einstein web
// dump; "genetic drift" -> a continental-drift / Wegener bleed; "gene versus
// allele" -> a Mendel/CRISPR web dump; "why can't two blue-eyed parents have a
// brown-eyed child" -> "they're carriers with a dominant brown allele."
export const GENETICS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-sex-determination',
    title: 'How Sex Is Determined Genetically',
    category: 'Genetics',
    keywords: [
      'how is sex determined genetically', 'xx and xy chromosomes', 'what is the sry gene', 'does the sperm determine the sex of the baby',
      'why do males have a y chromosome', 'chromosomal sex vs biological sex', 'klinefelter turner syndrome',
    ],
    content: `In humans, biological sex IS genetically determined, by the sex chromosomes (the 23rd pair). Typically XX develops as female and XY as male. Every egg carries one X chromosome; a sperm carries either an X or a Y, so it's the father's sperm that determines the sex of the child (a 50/50 chance at fertilisation). The Y chromosome is small and carries very few genes, but one of them, the SRY gene, is the master switch: around week 6–7 of development it triggers the previously identical gonads to become testes, which then produce hormones that drive male development; with no SRY, the default developmental pathway leads to ovaries and female anatomy. Variations exist — chromosomal (XXY = Klinefelter, XO = Turner, XYY), and conditions where the SRY gene is missing from a Y or translocated onto an X, so chromosomal sex and physical development don't always match. Many other animals use different systems (birds are ZW, some reptiles determine sex by egg temperature).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dna-fingerprinting',
    title: 'What DNA Fingerprinting Is Used For',
    category: 'Genetics',
    keywords: [
      'what is dna fingerprinting used for', 'dna profiling forensics', 'how does dna identification work', 'str short tandem repeats',
      'alec jeffreys dna fingerprinting', 'paternity test dna', 'codis dna database', 'exonerating the wrongly convicted dna',
    ],
    content: `DNA fingerprinting (DNA profiling) has nothing to do with the ridges on your fingertips — it analyses your DNA. It looks at a set of highly variable regions of the genome — usually "short tandem repeats" (STRs), where a short sequence is repeated a number of times that varies a lot between people — and reports how many repeats you have at each of about 13–20 sites. The combined pattern is essentially unique to an individual (except identical twins). Uses: forensic identification, matching biological evidence at a crime scene (blood, hair, skin, semen) to a suspect or to a database of profiles (the FBI's CODIS); paternity and other family relationship testing; identifying human remains and victims of disasters or war; the Innocence Project and similar groups have used it to overturn hundreds of wrongful convictions; and non-human uses like tracing food fraud, pedigree verification and wildlife poaching. It was invented by the British geneticist Alec Jeffreys in 1984.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-founder-effect',
    title: 'What the Founder Effect Is',
    category: 'Genetics',
    keywords: [
      'what is the founder effect', 'founder effect examples', 'why do isolated populations have rare genetic diseases',
      'amish ashkenazi jewish genetic disease', 'quebec founder effect', 'founder effect vs bottleneck', 'small founding population genetics',
    ],
    content: `The founder effect is what happens to the gene pool when a small group breaks away from a larger population to start a new, isolated one — settlers on an island, a wagon of migrants, the founders of a religious community. The new population's genetic makeup reflects only the alleles that those few founders happened to be carrying, not the full diversity of the parent population: some alleles are missing entirely, and any allele a founder carried — including a rare disease allele — is over-represented and can become common as the group grows and intermarries. It's a form of genetic drift (change in allele frequencies by chance rather than selection). Well-documented examples: high rates of certain recessive conditions among the Old Order Amish and Mennonites, Ashkenazi Jews (Tay-Sachs, BRCA variants), Afrikaners (porphyria, Huntington's), the population of the island of Tristan da Cunha, and French Canadians in Quebec — all descended from a few hundred to a few thousand founders. (Nothing to do with the photoelectric effect.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-genetic-drift',
    title: 'What Genetic Drift Is',
    category: 'Genetics',
    keywords: [
      'what is genetic drift', 'genetic drift vs natural selection', 'random change in allele frequency', 'why does genetic drift matter in small populations',
      'population bottleneck', 'genetic drift examples', 'the four forces of evolution',
    ],
    content: `Genetic drift is random change in how common an allele is in a population from one generation to the next, caused purely by chance — which individuals happen to survive and reproduce, which of their gametes happen to combine — rather than by any survival advantage. Flip a coin four times and you might get 3 heads; genetic drift is that same sampling luck applied to genes. Over generations it can, by chance alone, make an allele more common, drive it to 100% ("fixation"), or wipe it out entirely, and it acts fastest in SMALL populations (a big population averages out the randomness). Special cases include the founder effect and population "bottlenecks" (when a population is drastically reduced by a disaster and the survivors are a random, unrepresentative sample — cheetahs and northern elephant seals show the low diversity this leaves). Genetic drift is one of the four mechanisms of evolution, alongside natural selection, mutation and gene flow (migration); unlike selection, drift is not adaptive — it can spread harmful alleles or lose beneficial ones. (This has nothing to do with continental drift or Wegener.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gene-vs-allele',
    title: 'Gene vs Allele',
    category: 'Genetics',
    keywords: [
      'what is a gene versus an allele', 'gene vs allele', 'difference between a gene and an allele', 'homozygous vs heterozygous',
      'how many alleles do you have', 'what is a locus in genetics', 'is blue an allele or a gene',
    ],
    content: `A GENE is a stretch of DNA at a particular location ("locus") on a chromosome that codes for a specific product (usually a protein) or influences a specific trait — for example, "the gene that affects eye colour" or "the gene for a blood-clotting factor." An ALLELE is one of the alternative VERSIONS of that gene — the specific DNA sequence variant sitting at that locus in one individual. So a gene is the slot and its job; an allele is what's actually in the slot. Because your chromosomes come in pairs (one set from each parent), you carry two alleles of most genes. If your two alleles are identical you are "homozygous" for that gene; if they differ you are "heterozygous." Across a whole population there may be just two alleles of a gene (like the sickle-cell locus) or hundreds (like the immune HLA genes). A "mutation" is how a new allele arises. Loosely, people say "she has the gene for X" when they really mean "she has a particular allele of that gene."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-incomplete-dominance',
    title: 'What Incomplete Dominance Is',
    category: 'Genetics',
    keywords: [
      'what is incomplete dominance', 'incomplete dominance vs codominance', 'blending inheritance example', 'pink flower red white',
      'incomplete dominance in humans', 'heterozygote intermediate phenotype', 'when does the offspring look in between the parents',
    ],
    content: `Incomplete dominance is a pattern of inheritance in which NEITHER allele of a gene is fully dominant, so a heterozygote (one of each allele) shows a phenotype that is a BLEND, roughly halfway between the two homozygous types. The textbook example is snapdragons: a red-flowered plant (RR) crossed with a white-flowered plant (WW) gives all pink offspring (RW), because one dose of the red pigment allele makes only half as much pigment as two doses. Crossing two pink plants then gives 1 red : 2 pink : 1 white — the phenotype ratio matches the genotype ratio, unlike simple dominance. Human examples include wavy hair in a straight × curly cross, and the way one copy of a familial cholesterol allele gives moderately high cholesterol while two copies give very high. Incomplete dominance is often confused with codominance, but they differ: incomplete dominance BLENDS the two effects into an intermediate, while codominance shows BOTH effects fully and separately at the same time (like the A and B antigens together in AB blood).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-codominance',
    title: 'What Codominance Is (with an Example)',
    category: 'Genetics',
    keywords: [
      'what is codominance with an example', 'codominance definition', 'ab blood type codominance', 'roan cattle codominance',
      'codominant alleles', 'sickle cell trait codominance', 'both alleles expressed',
    ],
    content: `Codominance is when a heterozygote carries two different alleles of a gene and BOTH are fully expressed at the same time, side by side, with no blending. The clearest human example is the ABO blood group: the allele Iᴬ makes the A antigen on red blood cells and Iᴮ makes the B antigen; a person with genotype IᴬIᴮ makes BOTH antigens and has blood type AB — not a blend, but both markers present together. Another: "roan" coat colour in cattle and horses, where a red-hair allele and a white-hair allele in the same animal produce a coat with distinct red hairs AND white hairs intermixed (not pink). And the sickle-cell trait: a person with one normal and one sickle haemoglobin allele produces both normal and sickle haemoglobin, and both can be detected. Codominance differs from incomplete dominance, where the heterozygote shows a single intermediate phenotype (red + white → pink) rather than both phenotypes at once.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-siblings-look-different',
    title: 'Why Siblings Look Different Despite Having the Same Parents',
    category: 'Genetics',
    keywords: [
      'why do siblings look different despite same parents', 'how much dna do siblings share', 'independent assortment of chromosomes',
      'why arent siblings identical', 'genetic recombination siblings', 'why do some siblings look alike and others dont',
      'do siblings share exactly 50 percent dna',
    ],
    content: `Each parent has two copies of every chromosome (and every gene), and passes only ONE randomly chosen copy to each child. With 23 chromosome pairs, that's over 8 million possible combinations per parent from independent assortment alone — and "crossing over" during egg and sperm formation shuffles the chromosomes further by swapping segments between the paired copies. So every child gets a different random half of each parent's genes. On average two siblings share about 50% of their variable DNA, but by chance it can range from roughly 40% to 60% — which is why some pairs of siblings look strikingly alike and others quite different, and why one child can favour one parent's features while another favours the other's. On top of the genetics, siblings also experience different environments (birth order, health, nutrition, life events), have different epigenetic marks, and accumulate their own random developmental variation. Only identical (monozygotic) twins, who come from a single fertilised egg that split, start with essentially the same DNA.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-blue-eyed-parents',
    title: 'Why Two Blue-Eyed Parents Usually Cannot Have a Brown-Eyed Child',
    category: 'Genetics',
    keywords: [
      'why cant two blue eyed parents have a brown eyed child', 'is eye colour recessive', 'can blue eyed parents have a brown eyed baby',
      'oca2 herc2 eye colour gene', 'is eye colour polygenic', 'how is eye colour inherited',
    ],
    content: `In the simple model taught in school, blue eyes are recessive: a blue-eyed person must have two blue-influencing alleles, because a single brown-influencing allele would make their eyes brown. So two blue-eyed parents can only pass on blue-influencing alleles, and all their children should have blue eyes — a brown-eyed child would seem impossible. In reality eye colour is POLYGENIC (mainly the OCA2 and HERC2 genes on chromosome 15, plus a dozen others), so it's more of a spectrum than a clean two-allele switch. Occasionally a blue-eyed parent carries a hidden brown-shifting variant at one of the minor genes that wasn't enough to override their own blue eyes, and if both parents carry a hint of extra pigment-promoting variants, their child can end up with green, hazel or even brown eyes. It's uncommon but genuinely possible, and it's why "blue + blue can't make brown" is a useful rule of thumb but not an absolute genetic law (and definitely not a reliable paternity test).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-punnett-square',
    title: 'What a Punnett Square Is',
    category: 'Genetics',
    keywords: [
      'what is a punnett square', 'how to use a punnett square', 'punnett square example', 'monohybrid cross',
      'predicting offspring genotypes', 'what do the letters in a punnett square mean', 'dihybrid cross 9 3 3 1',
    ],
    content: `A Punnett square is a simple grid used to predict the possible genotypes of offspring from a cross, and their probabilities. You write one parent's possible gametes (each carrying one allele) along the top, and the other parent's along the side, then fill each inner box by combining the row's and column's alleles. Example: cross two carriers for a recessive disease, each Aa. Both can produce an "A" gamete or an "a" gamete, so the four boxes give AA, Aa, Aa, aa — a 1 : 2 : 1 genotype ratio, meaning a 25% chance of an unaffected non-carrier, 50% carrier, and 25% affected (aa) for each child. A cross of two heterozygotes for a fully dominant trait (Aa × Aa) gives the classic 3 : 1 phenotype ratio Mendel saw in pea plants. Larger squares handle two genes at once (a "dihybrid" cross, 4×4 grid, giving the 9 : 3 : 3 : 1 ratio). Punnett squares work well for single-gene traits in any species, including humans (carrier screening, genetic counselling), but not for polygenic traits like height or complex ones influenced by environment.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-genotype-phenotype',
    title: 'Genotype vs Phenotype',
    category: 'Genetics',
    keywords: [
      'what is the difference between genotype and phenotype', 'genotype vs phenotype', 'phenotype equals genotype plus environment',
      'what determines phenotype', 'can two people have the same phenotype but different genotype', 'nature vs nurture genotype phenotype',
    ],
    content: `Your GENOTYPE is your genetic makeup — the specific alleles you carry, either your whole set of DNA or, more usually, the alleles at one gene of interest (e.g. "Aa" or "BB"). Your PHENOTYPE is the set of observable characteristics that result — your physical traits, biochemistry, physiology and often behaviour (eye colour, height, blood type, a disease or its absence). The relationship is roughly: phenotype = genotype + environment (+ chance). The same genotype can produce different phenotypes in different environments (identical-twin plants grown in shade vs sun; a person with a genetic tendency to a disease who does or doesn't develop it depending on diet and lifestyle). And different genotypes can produce the same phenotype: someone who is AA and someone who is Aa for a dominant trait look identical, even though only the second is a carrier — which is why you can't always read genotype straight off phenotype. Genotype is fixed from conception; phenotype develops and can change over a lifetime.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-epistasis',
    title: 'What Epistasis Is',
    category: 'Genetics',
    keywords: [
      'what is epistasis', 'epistasis example', 'one gene masking another gene', 'labrador coat colour genetics epistasis',
      'epistasis vs dominance', 'modifier genes', 'gene interaction epistasis',
    ],
    content: `Epistasis is when the effect of one gene depends on (or is masked by) another gene at a DIFFERENT location — gene-to-gene interaction, as opposed to dominance, which is interaction between the two alleles of the SAME gene. The classic example is coat colour in Labrador retrievers. One gene (B) determines whether pigment is black (B_) or brown/chocolate (bb). A second gene (E) determines whether pigment gets deposited in the fur at all: E_ dogs show their pigment, but ee dogs cannot deposit any dark pigment and come out YELLOW regardless of what their B gene says — so the ee genotype at gene E "masks" gene B entirely. Human albinism works the same way: two non-functional copies of a pigment-production gene make a person unpigmented no matter what their eye-colour and hair-colour genes specify. Epistasis is one reason predicting a phenotype from a single gene often fails, and why many traits (and disease risks) come from webs of interacting genes rather than one gene acting alone.`,
    createdAt: Date.now(),
  },
];
