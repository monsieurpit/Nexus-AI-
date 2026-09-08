import { KnowledgeItem } from '../../types';

// Batch 64 (notable scientists). nexus-4b misses: Niels Bohr / Lavoisier /
// Rutherford / Katherine Johnson / Tycho Brahe answered as raw web dumps
// ("From what I found... Turns out..."), Bohr confused with his son Aage;
// Rosalind Franklin opened as "Franklin's assistant"; Robert Hooke credited
// with "inventing the idea of cells as the building blocks of life" (he coined
// the word, he did not found cell theory); Turing answered with no mention of
// Enigma or Bletchley Park.
export const SCIENTISTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-alan-turing',
    title: 'Who Alan Turing Was',
    category: 'Scientists',
    keywords: [
      'who was alan turing', 'what did alan turing do', 'turing machine', 'bletchley park enigma turing', 'turing test',
      'father of computer science', 'why was alan turing prosecuted', 'alan turing bombe',
    ],
    content: `Alan Turing (1912–1954) was a British mathematician and logician, widely regarded as the father of theoretical computer science and artificial intelligence. In 1936 he described the "Turing machine," an abstract model of a general-purpose computing device that defined what it means for a problem to be computable and underpins all modern computers. During the Second World War he worked at Bletchley Park, Britain's codebreaking centre, where he designed the "Bombe," an electromechanical machine that broke the German Enigma cipher; this work is credited with shortening the war significantly and saving many lives. After the war he worked on early stored-program computers and, in 1950, proposed the "Turing test" as a way to judge whether a machine can be said to think. In 1952 he was prosecuted for homosexuality, then a crime in Britain, and sentenced to chemical castration; he died in 1954 of cyanide poisoning, generally ruled a suicide. He received a formal government apology in 2009 and a royal pardon in 2013, and he now appears on the Bank of England £50 note.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rosalind-franklin',
    title: 'Who Rosalind Franklin Was',
    category: 'Scientists',
    keywords: [
      'who was rosalind franklin', 'what did rosalind franklin do', 'photo 51 dna', 'rosalind franklin x-ray diffraction',
      'was rosalind franklin an assistant', 'franklin watson crick dna', 'rosalind franklin tobacco mosaic virus',
    ],
    content: `Rosalind Franklin (1920–1958) was a British chemist and X-ray crystallographer — a full research scientist running her own projects, NOT anyone's assistant. Working at King's College London, she produced "Photo 51," an X-ray diffraction image of DNA whose clarity revealed the molecule's helical structure and key dimensions. In 1953 that image and her unpublished data were shown to James Watson and Francis Crick, at Cambridge, without her knowledge, and were crucial to their model of the DNA double helix. Watson, Crick and Maurice Wilkins shared the 1962 Nobel Prize for the discovery; Franklin was not named, having died in 1958 of ovarian cancer at 37 (the Nobel is not awarded posthumously, but her contribution was also downplayed at the time). After leaving King's she did pioneering X-ray work on the structure of viruses, including tobacco mosaic virus and polio. She is now recognised as one of the central figures in the discovery of DNA's structure.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-niels-bohr',
    title: 'Who Niels Bohr Was',
    category: 'Scientists',
    keywords: [
      'who was niels bohr', 'what did niels bohr do', 'bohr model of the atom', 'bohr niels nobel prize 1922',
      'bohr einstein debates', 'copenhagen interpretation bohr', 'niels bohr manhattan project', 'complementarity principle',
    ],
    content: `Niels Bohr (1885–1962) was a Danish physicist and one of the founders of quantum theory — not to be confused with his son Aage Bohr, also a Nobel-winning physicist. In 1913 Bohr proposed the "Bohr model" of the atom, in which electrons orbit the nucleus only in fixed energy levels and emit or absorb light when they jump between them; it explained the spectral lines of hydrogen and won him the 1922 Nobel Prize in Physics. He developed the ideas of "complementarity" (that quantum objects show wave-like or particle-like behaviour depending on the experiment) and, with Werner Heisenberg, the "Copenhagen interpretation" of quantum mechanics, which he defended in a famous decades-long series of debates with Albert Einstein. He founded the Institute for Theoretical Physics in Copenhagen, a hub for a generation of physicists. Having a Jewish mother, he fled Nazi-occupied Denmark in 1943, briefly helped the Manhattan Project, and afterward campaigned for openness and international control of nuclear weapons.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-antoine-lavoisier',
    title: 'Who Antoine Lavoisier Was',
    category: 'Scientists',
    keywords: [
      'who was antoine lavoisier', 'what did lavoisier do', 'father of modern chemistry', 'law of conservation of mass lavoisier',
      'lavoisier oxygen phlogiston', 'lavoisier guillotine french revolution', 'lavoisier named oxygen hydrogen',
    ],
    content: `Antoine Lavoisier (1743–1794) was a French chemist, usually called the "father of modern chemistry." Through careful measurement of the masses involved in reactions, he established the law of conservation of mass — that matter is neither created nor destroyed in a chemical reaction. He demonstrated that combustion and rusting are reactions with oxygen, which demolished the old "phlogiston" theory, and he named both oxygen and hydrogen. He helped create the first systematic chemical nomenclature (still the basis of how compounds are named) and published one of the first modern chemistry textbooks, with an early list of elements. He also showed that respiration is a slow form of combustion. A nobleman and a tax collector for the crown, he was arrested during the French Revolution and guillotined in 1794; the mathematician Lagrange remarked that it took only a moment to cut off his head, and a century might not produce another like it. His wife and collaborator, Marie-Anne Paulze Lavoisier, illustrated his work and translated for him.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ernest-rutherford',
    title: 'Who Ernest Rutherford Was',
    category: 'Scientists',
    keywords: [
      'who was ernest rutherford', 'what did rutherford do', 'father of nuclear physics', 'gold foil experiment rutherford',
      'rutherford discovered the nucleus', 'rutherford alpha beta radiation', 'first to split the atom', 'rutherford nobel prize 1908',
    ],
    content: `Ernest Rutherford (1871–1937) was a New Zealand–born physicist known as the "father of nuclear physics." Early on he identified and named alpha and beta radiation and showed that radioactivity is atoms of one element transforming into another, work that won him the 1908 Nobel Prize in Chemistry. His most famous result is the 1909 gold-foil experiment (carried out by Geiger and Marsden under his direction): firing alpha particles at thin gold foil, they found a few bouncing almost straight back, which led Rutherford in 1911 to conclude that an atom's positive charge and nearly all its mass are concentrated in a tiny central "nucleus," with electrons around it — replacing the earlier "plum pudding" picture. In 1917 he became the first person to deliberately split the atom, converting nitrogen into oxygen and discovering the proton. He led the Cavendish Laboratory at Cambridge, where several of his students (Chadwick, Cockcroft, Walton) made further Nobel-winning discoveries. Element 104, rutherfordium, is named for him.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-katherine-johnson',
    title: 'Who Katherine Johnson Was',
    category: 'Scientists',
    keywords: [
      'who was katherine johnson', 'what did katherine johnson do', 'nasa human computer', 'katherine johnson john glenn orbit',
      'hidden figures katherine johnson', 'katherine johnson mercury apollo calculations', 'presidential medal of freedom katherine johnson',
    ],
    content: `Katherine Johnson (1918–2020) was an American mathematician who worked at NASA (and its predecessor NACA) as one of the "human computers" — people, in her case a Black woman working in a racially segregated division, who did complex calculations by hand. She calculated trajectories and orbital mechanics for the United States' first crewed spaceflights: Alan Shepard's 1961 suborbital flight and, most famously, John Glenn's 1962 orbital flight, for which Glenn reportedly asked that she personally verify the electronic computer's numbers before he would fly. She also worked on the Apollo Moon missions, including the trajectory for Apollo 11, and on the Space Shuttle. Her career and that of her colleagues Dorothy Vaughan and Mary Jackson were dramatised in the book and film "Hidden Figures" (2016). She received the Presidential Medal of Freedom in 2015, and NASA has named two facilities after her.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tycho-brahe',
    title: 'Who Tycho Brahe Was',
    category: 'Scientists',
    keywords: [
      'who was tycho brahe', 'what did tycho brahe do', 'tycho brahe accurate observations', 'tycho brahe metal nose',
      'tycho brahe kepler assistant', 'uraniborg observatory', 'tychonic system', 'tycho brahe supernova 1572',
    ],
    content: `Tycho Brahe (1546–1601) was a Danish astronomer who, in the decades just before the telescope, made the most accurate naked-eye observations of the sky ever recorded — positions of stars and planets measured to about an arcminute, several times better than anyone before him. The Danish king gave him the island of Hven, where he built Uraniborg, an observatory and research institute with large, finely made instruments. He observed a "new star" (a supernova) in 1572 and a comet in 1577, showing that both lay far beyond the Moon, which contradicted the belief that the heavens never change. He proposed his own "Tychonic" compromise model, with the Sun orbiting a stationary Earth and the other planets orbiting the Sun. He famously lost part of his nose in a student duel and wore a metal prosthesis. In his last years, in Prague, he employed Johannes Kepler as an assistant; after Tycho's death Kepler used his precise data to derive the laws of planetary motion.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-robert-hooke',
    title: 'Who Robert Hooke Was',
    category: 'Scientists',
    keywords: [
      'who was robert hooke', 'what did robert hooke do', 'did robert hooke discover cells', 'hooke coined the word cell',
      'hookes law of elasticity', 'micrographia hooke', 'hooke newton feud', 'robert hooke royal society',
    ],
    content: `Robert Hooke (1635–1703) was an English polymath and one of the most inventive experimental scientists of his era, serving as Curator of Experiments for the Royal Society. Using an early compound microscope, he examined a thin slice of cork and saw a grid of tiny empty compartments that reminded him of monks' rooms, so he called them "cells" — coining the biological term in his 1665 book "Micrographia." He did NOT propose that all living things are made of cells; that "cell theory" came almost two centuries later, from Schleiden, Schwann and Virchow. Hooke's other work: Hooke's law of elasticity (the extension of a spring is proportional to the force applied); pioneering microscopy illustrations; work on gravitation, light, combustion, timekeeping (the balance spring for watches), and architecture (he helped rebuild London after the 1666 fire). He had a long, bitter rivalry with Isaac Newton, partly over who first grasped the inverse-square law of gravity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-einstein-what-for',
    title: 'What Albert Einstein Is Actually Famous For',
    category: 'Scientists',
    keywords: [
      'what is albert einstein famous for', 'what did einstein win the nobel prize for', 'einstein photoelectric effect',
      'einstein special general relativity', 'e equals mc squared meaning', 'einstein 1905 miracle year', 'einstein brownian motion',
    ],
    content: `Albert Einstein (1879–1955) was a German-born theoretical physicist. In 1905, his "miracle year," he published four papers that reshaped physics: special relativity (space and time are relative to the observer, nothing travels faster than light), the mass–energy equivalence E = mc² (mass and energy are two forms of the same thing), an explanation of the photoelectric effect that showed light comes in quanta (photons) — a foundation of quantum theory — and an account of Brownian motion that provided strong evidence atoms are real. In 1915 he completed general relativity, describing gravity not as a force but as the curvature of spacetime by mass and energy; its prediction that starlight bends around the Sun was confirmed in 1919, making him world-famous. His 1921 Nobel Prize was awarded specifically for the photoelectric effect, not for relativity. A Jewish pacifist, he left Germany when the Nazis took power, settled in the US at Princeton, and in 1939 signed a letter urging President Roosevelt to research atomic weapons, a decision he later regretted.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-darwin-what-did',
    title: 'What Charles Darwin Did',
    category: 'Scientists',
    keywords: [
      'who was charles darwin', 'what did charles darwin do', 'hms beagle voyage', 'on the origin of species',
      'darwin natural selection theory', 'darwin galapagos finches', 'darwin and alfred russel wallace',
    ],
    content: `Charles Darwin (1809–1882) was an English naturalist who established that all species descend, with modification, from common ancestors, and that the main mechanism is natural selection: individuals vary, more offspring are born than can survive, those with traits better suited to the environment survive and reproduce more, and so populations gradually change over generations. His five-year voyage (1831–1836) as naturalist aboard HMS Beagle, especially observations of tortoises and finches in the Galápagos Islands, gave him key evidence, but he then spent more than twenty years gathering support before publishing "On the Origin of Species" in 1859. He was prompted to publish when Alfred Russel Wallace independently arrived at the same idea and sent it to him; the two presented a joint paper in 1858. Darwin also wrote major works on coral reefs, barnacles, orchids, earthworms, human evolution ("The Descent of Man," 1871), and emotional expression. Natural selection is now the unifying framework of biology, confirmed by genetics, which Darwin did not know about.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-kepler-laws',
    title: 'Who Johannes Kepler Was and His Three Laws',
    category: 'Scientists',
    keywords: [
      'who was johannes kepler', 'keplers three laws of planetary motion', 'kepler elliptical orbits',
      'kepler used tycho brahe data', 'law of equal areas kepler', 'harmonic law kepler', 'what did kepler discover',
    ],
    content: `Johannes Kepler (1571–1630) was a German astronomer and mathematician who worked out how the planets actually move, using the exceptionally precise observations of Tycho Brahe, whom he had assisted. His three laws of planetary motion: (1) each planet orbits the Sun in an ellipse, with the Sun at one focus — not a perfect circle, overturning an assumption held since antiquity; (2) a line from the Sun to a planet sweeps out equal areas in equal times, so a planet moves faster when closer to the Sun; (3) the square of a planet's orbital period is proportional to the cube of its average distance from the Sun, linking all the planets in one relationship. These laws were later explained by Newton's law of universal gravitation. Kepler also did foundational work in optics, explained how the eye focuses light, described how telescopes form images, and was the first to correctly explain why we see the phases of the Moon and the tides' connection to the Moon.`,
    createdAt: Date.now(),
  },
];
