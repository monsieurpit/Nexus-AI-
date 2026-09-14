import { KnowledgeItem } from '../../types';

// Batch 278 corpus fixes — chemistry/physics/biology fundamentals. Very strong domain, 3/25
// misses. DNA vs RNA notably confused which nucleic acid uses ribose vs deoxyribose, attributing
// ribose sugar and instability to DNA in a garbled sentence when that actually describes RNA.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'science',
  keywords,
  content,
  createdAt: now,
});

export const CHEMISTRY_PHYSICS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-sci-concave-vs-convex',
    'Concave vs convex lens',
    ['concave lens', 'convex lens', 'difference concave convex lens'],
    "A convex lens is thicker in the middle than at the edges and CONVERGES (bends together) light rays that pass through it toward a single focal point — this is the type used in magnifying glasses and to correct farsightedness, since it focuses light more strongly. A concave lens is thinner in the middle than at the edges and DIVERGES (spreads out) light rays instead of converging them — this is the type used to correct nearsightedness, since it spreads focused light back out slightly before it reaches the eye. Simple way to remember it: convex curves outward and brings light together (like a magnifying glass); concave curves inward and spreads light apart.",
  ),
  k(
    'kb-gap-sci-mitosis-vs-meiosis',
    'Mitosis vs meiosis',
    ['mitosis', 'meiosis', 'difference mitosis meiosis'],
    "Mitosis is cell division for growth and repair — one cell splits into two genetically IDENTICAL daughter cells, each with the same full number of chromosomes as the original cell (46 in humans). It's how skin cells replace themselves, wounds heal, and organisms grow. Meiosis is cell division specifically for making reproductive cells (sperm and eggs) — one cell divides TWICE, producing four daughter cells that each have HALF the normal number of chromosomes (23 in humans, instead of 46), and each of those four cells is genetically DIFFERENT from the others and from the parent cell (due to genetic recombination/crossing-over). The key difference: mitosis makes identical copies for growth/repair with the full chromosome count; meiosis makes genetically varied reproductive cells with half the chromosome count, so that when a sperm and egg combine, the resulting embryo ends up with the correct full chromosome count again.",
  ),
  k(
    'kb-gap-sci-dna-vs-rna-correction',
    'DNA vs RNA (correcting a sugar mix-up)',
    ['dna', 'rna', 'ribose', 'deoxyribose', 'difference dna rna'],
    "DNA (deoxyribonucleic acid) uses DEOXYRIBOSE sugar in its backbone, is double-stranded (the famous double helix), is chemically more stable, and is kept safely stored in the cell's nucleus as the long-term genetic archive — it uses the base thymine. RNA (ribonucleic acid) uses RIBOSE sugar (note: one oxygen atom more than deoxyribose, which is exactly what makes RNA chemically less stable and more reactive/prone to breaking down), is usually single-stranded, and acts as a temporary working copy that carries genetic instructions out of the nucleus to be used — it uses the base uracil instead of thymine. Correcting a common mix-up: it's RNA that has ribose sugar and is the less stable, temporary copy — DNA is the stable, deoxyribose-based, long-term archive. A simple way to remember: 'deoxyribose' (DNA) has one less oxygen than 'ribose' (RNA), which is exactly why DNA is the sturdier, more stable of the two.",
  ),
];
