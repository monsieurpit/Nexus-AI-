import { KnowledgeItem } from '../../types';

// Batch 46 (cell & molecular biology) gap-fills. Strong category (~16/25). Live
// misses on nexus-4b: "what is ATP" -> "ATP and NADPH from photosynthesis power
// respiration" (conflation); "gene mutation" -> "caused by errors during
// transcription or translation" (it's replication / damage); "osmosis" ->
// "water moves from more concentrated to less concentrated"; "DNA vs RNA" ->
// only the sugar and structure (missed U vs T, and the roles); "dominant vs
// recessive" -> "if your parents don't have the gene they can still pass it on
// and you'll display it".
export const CELL_BIOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-is-atp',
    title: 'What ATP Is',
    category: 'Biology',
    keywords: [
      'what is atp', 'what does atp stand for', 'adenosine triphosphate', 'why is atp the energy currency', 'atp to adp',
      'how do cells store energy', 'where is atp made',
    ],
    content: `ATP (adenosine triphosphate) is the molecule cells use as their immediate energy currency. It's an adenosine unit with a chain of three phosphate groups; the bond holding the last (third) phosphate is "high-energy," and when the cell breaks it off — turning ATP into ADP (adenosine diphosphate) plus a free phosphate — it releases a usable packet of energy that powers work like muscle contraction, active transport across membranes, nerve signalling, and building large molecules. ADP is then recharged back to ATP by adding a phosphate, using energy from breaking down food (cellular respiration in the mitochondria) or, in plants, from the light reactions of photosynthesis. A cell recycles its own body weight in ATP many times a day — it's made and spent constantly rather than stockpiled. (ATP and NADPH made in photosynthesis are used inside the plant to BUILD sugar, not to run respiration.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gene-mutation-causes',
    title: 'What a Gene Mutation Is (and What Causes It)',
    category: 'Biology',
    keywords: [
      'what is a gene mutation', 'what causes a mutation', 'types of mutations', 'point mutation frameshift', 'what is a mutagen',
      'are mutations always bad', 'how do mutations happen',
    ],
    content: `A gene mutation is a permanent change in the DNA sequence — a "typo" in the genetic code. It can be a single-base swap (point/substitution mutation), the insertion or deletion of bases (which can shift the whole reading frame — a "frameshift"), or larger rearrangements. Causes: mostly rare uncorrected errors when DNA is COPIED during cell division (DNA polymerase makes about one mistake per billion bases, and repair enzymes catch most), plus damage from "mutagens" — UV light, ionising radiation, tobacco smoke, certain chemicals, some viruses. (Errors during transcription or translation are not mutations — they aren't in the DNA and aren't passed on.) A mutation in a body cell (somatic) affects only that cell's descendants and can, for example, start a cancer; a mutation in an egg or sperm (germline) is passed to offspring. Most mutations are neutral (in non-coding DNA or silent), some are harmful, and a rare few are beneficial — and that supply of new variation is the raw material natural selection acts on.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-osmosis-clean',
    title: 'What Osmosis Is',
    category: 'Biology',
    keywords: [
      'what is osmosis', 'how does osmosis work', 'which way does water move in osmosis', 'osmosis vs diffusion',
      'what is a semipermeable membrane', 'hypertonic hypotonic isotonic', 'why does salt draw water out of cells',
    ],
    content: `Osmosis is the movement of water across a semipermeable membrane (one that lets water through but not the dissolved solutes) from the side with MORE water (a dilute solution, low solute concentration) to the side with LESS water (a concentrated solution, high solute concentration). In effect, water moves toward the saltier/sugarier side, tending to even out the concentrations. It's a special case of diffusion — the solute can't move to balance things, so the water does instead. This is how plant roots draw water from soil, why a wilted plant perks up in water, why salting meat or eggplant draws out juice, and why red blood cells swell and burst in pure water (hypotonic) but shrivel in strong salt water (hypertonic); in an isotonic solution the concentrations match and there's no net movement. "Osmotic pressure" is the pressure you'd have to apply to the concentrated side to stop the water flow.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dna-vs-rna-full',
    title: 'The Differences Between DNA and RNA',
    category: 'Biology',
    keywords: [
      'what is the difference between dna and rna', 'dna vs rna', 'why does rna use uracil', 'is rna single or double stranded',
      'what are the types of rna', 'mrna trna rrna', 'ribose vs deoxyribose',
    ],
    content: `DNA and RNA are both chains of nucleotides, but they differ in four main ways. (1) Sugar: DNA has deoxyribose, RNA has ribose (one extra oxygen, at the 2' position), which makes RNA more chemically reactive and less stable. (2) Bases: both use adenine, guanine and cytosine, but DNA's fourth base is thymine (T) while RNA's is uracil (U). (3) Strands: DNA is normally a double helix of two complementary strands; RNA is usually a single strand that can fold back on itself into 3-D shapes. (4) Role and lifespan: DNA is the long-term, stable master archive of genetic information, kept safe in the nucleus; RNA is a working, short-lived copy — messenger RNA (mRNA) carries a gene's instructions to the ribosome, transfer RNA (tRNA) brings the right amino acids, ribosomal RNA (rRNA) forms part of the ribosome itself, and other RNAs regulate gene activity. Many scientists think RNA came first ("RNA world") and DNA evolved later as a more stable store.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dominant-recessive',
    title: 'Dominant vs Recessive Alleles',
    category: 'Biology',
    keywords: [
      'what is the difference between a dominant and recessive allele', 'dominant vs recessive', 'what is a carrier of a genetic trait',
      'why can two healthy parents have an affected child', 'homozygous vs heterozygous', 'what is an allele',
    ],
    content: `You inherit two copies of most genes — one from each parent — and the different versions of a gene are called alleles. A DOMINANT allele shows its effect even if you have only one copy (paired with any other allele). A RECESSIVE allele only shows its effect if BOTH of your copies are that recessive allele. Someone with one dominant and one recessive allele (a "heterozygote") displays the dominant trait but is a "carrier" of the hidden recessive one. This is why two healthy parents who each carry one copy of a recessive disease allele — and show no sign of it themselves — can have a child who inherits the recessive allele from both of them and is affected (a 1-in-4 chance for each child). It also means a recessive condition can skip generations. Note that "dominant" doesn't mean "more common" or "stronger/better" — plenty of harmful conditions are dominant and plenty of harmless traits are recessive. Many traits are also controlled by several genes and don't follow simple dominant/recessive rules at all.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-endoplasmic-reticulum',
    title: 'What the Endoplasmic Reticulum Is',
    category: 'Biology',
    keywords: [
      'what is the endoplasmic reticulum', 'rough vs smooth endoplasmic reticulum', 'what does the ER do', 'er and ribosomes',
      'where are proteins made in the cell', 'what makes lipids in the cell', 'er and the golgi apparatus',
    ],
    content: `The endoplasmic reticulum (ER) is a large, folded network of membrane-bound tubes and flattened sacs that spreads out from the nuclear membrane through much of the cell — a kind of internal factory and highway system. It comes in two connected forms. ROUGH ER is studded with ribosomes on its outer surface; the proteins those ribosomes make are threaded into the ER, where they fold and get initial modifications before being packaged into vesicles bound for the Golgi apparatus, the cell surface, or lysosomes — so it's the main site for making proteins that will be secreted or inserted into membranes. SMOOTH ER has no ribosomes and does other jobs: synthesising lipids and steroid hormones, breaking down toxins and drugs (very active in liver cells), and storing calcium ions that are released to trigger events like muscle contraction. Misfolded proteins piling up in the ER cause "ER stress," which is involved in several diseases.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-apoptosis',
    title: 'What Apoptosis Is',
    category: 'Biology',
    keywords: [
      'what is apoptosis', 'programmed cell death', 'apoptosis vs necrosis', 'why do cells kill themselves',
      'apoptosis in development', 'caspases apoptosis', 'what happens if apoptosis fails',
    ],
    content: `Apoptosis is programmed cell death — a controlled, orderly self-destruction that a cell carries out on purpose. A cascade of enzymes called caspases dismantles the cell from within: it shrinks, its DNA is chopped up, the membrane blebs, and the cell breaks into neat membrane-wrapped packages that neighbouring cells quietly engulf, without spilling contents or causing inflammation. The body uses it constantly: to remove cells that are damaged, worn out, infected by a virus, or no longer needed; to sculpt structures during development (it's what removes the webbing between a fetus's fingers and toes, and the tail of a tadpole); and to eliminate immune cells that would attack the body's own tissue. It's triggered either by internal signals (irreparable DNA damage — the tumour-suppressor protein p53 is key here) or by external "death signals" from other cells. When apoptosis fails, damaged cells that should die survive instead, which is a major route to cancer; too much apoptosis contributes to neurodegenerative disease. This differs from NECROSIS, the messy, uncontrolled cell death caused by injury, toxins or oxygen loss, which does spill contents and cause inflammation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-blood-type',
    title: "What Determines a Person's Blood Type",
    category: 'Biology',
    keywords: [
      "what determines a person's blood type", 'how is blood type inherited', 'abo blood group system', 'what is the rh factor',
      'why is o negative the universal donor', 'what is a blood antigen', 'ab positive universal recipient',
    ],
    content: `Your blood type is set by which marker molecules (antigens) sit on the surface of your red blood cells, and by antibodies in your plasma against the ones you lack. In the main ABO system there are three alleles of one gene: IA (makes the A antigen), IB (makes the B antigen) and i (makes neither). IA and IB are both dominant over i and co-dominant with each other, giving four types: A (IA IA or IA i), B (IB IB or IB i), AB (IA IB — both antigens), and O (i i — neither). Your immune system makes antibodies against any ABO antigen you don't have, so giving mismatched blood causes a dangerous clumping reaction. A separate gene controls the Rh (D) antigen — you're Rh-positive if you have it, Rh-negative if not. O-negative blood has no A, B or Rh antigens, so it can be given to almost anyone in an emergency ("universal donor"); AB-positive people can receive any type ("universal recipient").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cell-membrane-full',
    title: 'What the Cell Membrane Is Made Of',
    category: 'Biology',
    keywords: [
      'what is the cell membrane made of', 'phospholipid bilayer', 'fluid mosaic model', 'what proteins are in the cell membrane',
      'why is the cell membrane semipermeable', 'what does cholesterol do in the membrane', 'plasma membrane structure',
    ],
    content: `The cell (plasma) membrane is built mainly from a phospholipid bilayer: each phospholipid has a water-loving ("hydrophilic") phosphate head and two water-fearing ("hydrophobic") fatty-acid tails, and they line up in two layers with the heads facing the watery inside and outside of the cell and the tails tucked together in the middle. That oily core is why the membrane naturally blocks water-soluble molecules and ions while letting small non-polar molecules (oxygen, CO2) slip through. Embedded in and across this fluid sheet are PROTEINS — channels and pumps that ferry specific substances in and out, receptors that detect signals, enzymes, and identity markers — plus CHOLESTEROL molecules that keep the membrane at the right fluidity (stopping it going too stiff when cold or too leaky when warm), and short chains of sugar attached to some proteins and lipids for cell recognition. This picture — a fluid lipid sheet with proteins drifting in it like icebergs — is called the "fluid mosaic model."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chromosome-vs-chromatid',
    title: 'Chromosome vs Chromatid',
    category: 'Biology',
    keywords: [
      'what is a chromosome versus a chromatid', 'chromosome vs chromatid', 'what are sister chromatids', 'what is the centromere',
      'how many chromosomes do humans have', 'what is chromatin', 'when does a chromosome have two chromatids',
    ],
    content: `A CHROMOSOME is a single long molecule of DNA wound around proteins (histones) and packaged into a compact structure; humans have 46 (23 pairs). Most of the time in a cell's life the DNA is loosely spread out as "chromatin" and only condenses into visible rod-shaped chromosomes when the cell is about to divide. A CHROMATID is one copy of a chromosome's DNA after it has been replicated. Before division, each chromosome copies itself, so it briefly consists of TWO identical "sister chromatids" joined at a pinched point called the centromere — this is the familiar X shape. During cell division the centromere splits and the two sister chromatids are pulled to opposite ends of the cell; once separated, each chromatid is again called a chromosome in its own right. So "chromatid" is really just the name for a chromosome's DNA copy while it's still attached to its sister; a chromosome can have one chromatid (unreplicated) or two (replicated).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-antibodies-made',
    title: 'How the Immune System Makes Antibodies',
    category: 'Biology',
    keywords: [
      'how does the immune system make antibodies', 'how are antibodies produced', 'what is a b cell', 'clonal selection',
      'what is a plasma cell', 'what is a memory b cell', 'why does a second infection get cleared faster',
    ],
    content: `Antibodies are made by B lymphocytes (B cells). Each B cell, before it ever meets a germ, carries a unique antibody shape on its surface, and the body generates billions of different B cells by randomly shuffling antibody gene segments — so almost any invader will match some B cell. When a pathogen enters, the few B cells whose antibody happens to fit part of it (an "antigen") bind it; with help from "helper T cells," those B cells are activated and multiply rapidly ("clonal selection"). Most of the offspring become PLASMA CELLS — short-lived antibody factories that pump out thousands of free antibody molecules per second into the blood, where they neutralise the pathogen, clump it, and flag it for destruction. The antibodies also get "affinity matured" — mutated and re-selected to bind tighter — and can switch class (IgM to IgG, IgA, IgE) for different jobs. Some activated B cells instead become long-lived MEMORY B cells, which persist for years; if the same pathogen returns, they respond within days instead of weeks. Vaccines work by triggering this memory without causing the disease.`,
    createdAt: Date.now(),
  },
];
