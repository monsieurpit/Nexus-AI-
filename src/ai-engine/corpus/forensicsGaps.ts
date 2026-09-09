import { KnowledgeItem } from '../../types';

// Batch 131 (forensic science / criminalistics) — a gap. On nexus-4b:
// "what is rigor mortis" collided with the Jiangshi (Chinese hopping-vampire)
// corpus entry ("rigor mortis is why a Jiangshi hops around instead of
// walking"). Raw web dumps for: livor mortis, gunshot residue, Locard's
// exchange principle ("Turns out Locard is a surname"), polygraph. DNA
// fingerprinting and luminol answers were vague and deflected to "casseurt
// built me to answer space questions."
export const FORENSICS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-forensics-rigor-mortis',
    title: 'Rigor Mortis (Postmortem Muscle Stiffening)',
    category: 'Forensics',
    keywords: [
      'what is rigor mortis', 'the temporary stiffening of the muscles of a body after death this is a real biological process it has nothing to do with jiangshi or hopping vampires or any folklore creature',
      'after death the muscles run out of atp so the actin and myosin filaments lock together and cannot release the body becomes rigid', 'onset about 2 to 6 hours after death starting in the small muscles jaw and eyelids then spreading peaks around 12 hours stays for roughly a day then fades over 24 to 48 hours as the muscle tissue decomposes',
      'forensic pathologists use the degree of rigor together with body temperature algor mortis and lividity livor mortis to estimate the time of death cold speeds nothing warm and exertion before death bring it on faster',
    ],
    content: `Rigor mortis is the temporary stiffening of a dead body's muscles in the hours after death. It is a straightforward chemical process and has nothing to do with any folklore creature. In life, muscle fibres contract when the proteins actin and myosin grip each other, and they relax when ATP (the cell's energy molecule) breaks that grip. After death the body stops making ATP; without it the actin–myosin bonds lock permanently and every muscle in the body goes stiff. Typical timeline (varies a lot with temperature and activity): it becomes noticeable about 2–6 hours after death, first in the small muscles (jaw, eyelids, fingers), spreads to the large muscles over the next several hours, reaches full stiffness around 12 hours, holds for roughly 24 hours, and then disappears over the following 24–48 hours as the muscle proteins themselves begin to decompose ("the body relaxes again"). Warmth, fever, and strenuous activity just before death speed its onset; cold slows it. Forensic pathologists read rigor alongside body cooling (algor mortis) and blood settling (livor mortis) to estimate how long a person has been dead. If a body is found already stiff and then the stiffness is broken by moving it, it does not return.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-livor-mortis',
    title: 'Livor Mortis (Postmortem Lividity)',
    category: 'Forensics',
    keywords: [
      'what is livor mortis postmortem lividity hypostasis', 'after the heart stops pumping gravity pulls the blood down into whatever parts of the body are lowest and it pools there staining that skin a purplish red or pinkish colour',
      'starts within 30 minutes to 2 hours becomes fixed after about 8 to 12 hours meaning the discolouration no longer shifts if the body is moved before it is fixed pressing the skin blanches it white after it is fixed it does not blanch',
      'areas in contact with a hard surface stay pale because the pressure squeezes the capillaries closed forensic use tells investigators the position the body was in after death and roughly how long ago death occurred cherry red lividity suggests carbon monoxide or cyanide',
    ],
    content: `Livor mortis (also called postmortem lividity or hypostasis) is the purplish-red discolouration that develops in the lowest-lying parts of a dead body. Once the heart stops circulating blood, gravity pulls the blood down through the vessels and it settles in the dependent areas, staining the skin there. Timeline: it begins within about 30 minutes to 2 hours of death, deepens over the next several hours, and becomes "fixed" after roughly 8–12 hours — before fixation, rolling the body onto its other side lets the blood re-pool and the pattern shifts; after fixation the pattern stays put even if the body is moved. Likewise, pressing a finger on lividity blanches it white in the early hours but not once it is fixed. Any part of the body pressed against a firm surface (the floor, a belt, folds of tight clothing) stays pale because the pressure pinches the small vessels shut, leaving "contact pallor" that can show what the body was lying on. Forensic value: livor mortis tells investigators the position the body was in during the hours after death (and therefore whether it was later moved), and its progress helps bracket the time of death. An abnormal colour is a clue to cause — cherry-pink lividity points to carbon-monoxide poisoning or cyanide, brownish to certain other poisons.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-time-of-death',
    title: 'How Forensic Scientists Estimate Time of Death',
    category: 'Forensics',
    keywords: [
      'how do forensic scientists determine time of death post mortem interval', 'there is no single accurate method they combine several each giving a rough window and narrow the overlap',
      'algor mortis body cooling a body loses heat at very roughly 1.5 degrees fahrenheit or 0.8 celsius per hour until it matches the surroundings measured with a liver or rectal probe rigor mortis muscle stiffening 2 to 6 hours onset peak 12 gone 24 to 48 livor mortis blood pooling fixed by 8 to 12 hours',
      'stomach contents how far a known last meal has digested forensic entomology the species and life stage of insects colonising the body decomposition stage vitreous potassium in the eye fluid rises predictably the estimate is always a range like dead between 8 and 12 hours',
    ],
    content: `There is no clock that reads out the moment of death, so forensic pathologists estimate the "post-mortem interval" by combining several independent lines of evidence, each giving a rough window, and taking the overlap. The main ones: (1) ALGOR MORTIS — body cooling. A corpse loses heat until it reaches ambient temperature, very roughly 1.5°F (0.8°C) per hour under average conditions, faster if it is cold, wet, or the body is small. A deep temperature (liver or rectal) plugged into a cooling formula gives an early-hours estimate. (2) RIGOR MORTIS — muscle stiffening: appears 2–6 h, complete ~12 h, gone in 24–48 h. (3) LIVOR MORTIS — blood pooling in dependent areas, fixed by 8–12 h. (4) STOMACH CONTENTS — if the time of the last meal is known, how far it has digested and left the stomach narrows the window (food leaves the stomach over ~2–6 h). (5) FORENSIC ENTOMOLOGY — for bodies dead more than a couple of days, the species of blowflies and beetles present and the stage of their larvae (egg, instar, pupa) put a floor under the interval. (6) DECOMPOSITION STAGE — pallor, marbling, bloating, skin slippage, skeletonisation, calibrated to temperature. (7) VITREOUS HUMOUR POTASSIUM — the potassium level in the fluid of the eye rises at a fairly steady rate for the first few days. Every method has wide error bars, so a report says "death occurred between roughly 8 and 12 hours before the body was found," not an exact time.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-dna-profiling',
    title: 'How DNA Profiling ("DNA Fingerprinting") Works',
    category: 'Forensics',
    keywords: [
      'how does dna fingerprinting dna profiling work', 'it does not read your whole genome it looks at about 20 specific spots called str short tandem repeat loci where a short sequence repeats a variable number of times',
      'the number of repeats at each locus varies between people so the set of counts across all 20 loci is effectively unique except for identical twins the lab extracts dna copies those regions with pcr and separates the fragments by size with capillary electrophoresis producing a profile of number pairs',
      'the profile from crime scene material blood semen saliva skin cells hair root is compared to a suspect or searched against a database the fbi database is codis a random match probability is quoted like one in a quintillion mitochondrial dna is used for hair shafts and old bones y chromosome for male fraction in mixtures',
    ],
    content: `DNA profiling (popularly "DNA fingerprinting") does not sequence a person's whole genome. It examines about 20 agreed-upon locations in the DNA called STR loci ("short tandem repeats"), each a spot where a short motif (say "GATA") is repeated a variable number of times — one person might have 11 repeats there, another 14. At any one locus lots of people share a value, but the combination of repeat counts across all ~20 loci is effectively unique to an individual (identical twins excepted). The lab process: extract DNA from the sample, use PCR to make millions of copies of just those STR regions (this is why a few skin cells or a lick of an envelope can be enough), then push the copied fragments through capillary electrophoresis, which sorts them by length and reports the repeat numbers as a string of pairs. That profile is then compared one-to-one against a known suspect, or searched against a database (in the US, the FBI's CODIS). A match is reported with a "random match probability" — the chance an unrelated person would share the profile, often quoted as one in many quadrillions. Variations: mitochondrial DNA (inherited only from the mother, present in thousands of copies per cell) is used for old bones and rootless hair shafts; Y-STR profiling isolates the male contributor in a mixed sample.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-fingerprints',
    title: 'Fingerprint Identification and Matching',
    category: 'Forensics',
    keywords: [
      'what is a fingerprint and how are fingerprints matched', 'the pattern of raised friction ridges on the fingertip skin formed in the womb and unchanged for life even identical twins differ superficial cuts heal back to the same pattern because it is set in the dermis',
      'three overall pattern types loops most common whorls and arches but matching is done on minutiae the small features where a ridge ends or splits bifurcation an examiner or the afis computer marks a dozen or more minutiae and checks that their type and relative position agree',
      'crime scene prints latent prints are invisible sweat and oil deposits developed with powder ninhydrin superglue fuming or alternate light then photographed and compared aces v analysis comparison evaluation verification patent prints are visible plastic prints are impressions in soft material',
    ],
    content: `A fingerprint is the pattern of raised "friction ridges" on the skin of a fingertip. The pattern forms before birth, stays the same for life, and regrows identically after a shallow injury because it is anchored in the dermis (the deeper skin layer); deep scarring adds a permanent feature rather than erasing one. Even identical twins have different fingerprints. At a glance prints fall into three families — loops (about 60–65%), whorls (~30%), and arches (~5%) — but identification is not done on the overall shape. It is done on MINUTIAE: the tiny points where a ridge simply ends ("ridge ending") or splits in two ("bifurcation"), plus dots, islands, and enclosures. An examiner (or an automated system, AFIS/IAFIS) plots a set of minutiae and confirms that their types and their positions relative to one another agree between the two prints; there is no universal fixed number required in the US, though many countries historically used 12–16 points. Crime-scene prints come in three kinds: "patent" (visibly left in blood, ink, grease), "plastic" (pressed into putty, wax, soft soap), and "latent" — invisible residues of sweat and skin oil that must be developed with fingerprint powder, ninhydrin (on paper), cyanoacrylate/superglue fuming, or alternate light sources before they can be photographed and compared. The documented comparison method is ACE-V: Analysis, Comparison, Evaluation, Verification by a second examiner.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-gsr',
    title: 'Gunshot Residue (GSR)',
    category: 'Forensics',
    keywords: [
      'what is gunshot residue gsr', 'the cloud of particles blown out of a gun when it is fired made of burned and unburned gunpowder plus vaporised metal from the primer that condenses into tiny spheres containing lead barium and antimony',
      'it lands on the shooters hand and sleeve and on anything within a few feet collected with an adhesive stub from the web of the hand and analysed by scanning electron microscopy with x ray the three metal sphere is considered characteristic of a firearm',
      'it degrades and rubs off within hours washing hands handcuffing wipe it away so a negative result does not prove someone did not fire a gun and it transfers by contact residue on clothing around a bullet hole and its spread tells muzzle to target distance',
    ],
    content: `Gunshot residue (GSR) is the microscopic debris thrown out of a firearm at the moment of discharge. When the primer detonates and the powder burns, it produces a jet of hot gas carrying unburned and partly burned powder grains plus vaporised metal from the primer and bullet, which cools into tiny spherical particles. The particles diagnostic of a firearm contain lead, barium, and antimony fused together (some modern "green" primers use different metals). GSR settles on the firing hand (especially the web between thumb and forefinger), the sleeve, the face, and any nearby surface or bystander. Collection is done by dabbing the skin with an adhesive-topped aluminium stub, which is then examined by scanning electron microscopy with energy-dispersive X-ray analysis (SEM/EDX) to find and confirm the three-metal spheres. Important limits: GSR is loosely held and comes off within a few hours through hand-washing, wiping, sweating, or being handcuffed, so a negative test does NOT mean a person did not fire a gun; and GSR transfers by contact (police cars, handcuffs, an officer's hands), so a few particles are weak evidence on their own. Separately, the pattern and density of powder residue around a bullet hole in clothing or skin is used to estimate the muzzle-to-target distance (contact, close, or distant shot).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-locard',
    title: "Locard's Exchange Principle",
    category: 'Forensics',
    keywords: [
      'what is locards exchange principle', 'the foundational idea of forensic science that every contact leaves a trace whenever two objects or a person and a scene touch each carries away something from the other and leaves something of itself behind',
      'so a criminal always brings something to the crime scene fibres hair soil prints and always takes something away glass fragments carpet fibres the victims blood the job of the investigator is to find and read those transfers',
      'named after edmond locard 1877 to 1966 a french forensic pioneer who ran the first police crime laboratory in lyon and was called the sherlock holmes of france the principle is why trace evidence exists and why scene contamination control matters',
    ],
    content: `Locard's exchange principle is the founding idea of forensic science, usually summarised as "every contact leaves a trace." It states that whenever two things come into contact — a person and a place, a tool and a surface, two people — each one takes away material from the other and leaves some of its own material behind. Applied to a crime: the offender inevitably carries something into the scene (shoe prints, fibres from their clothing, hair, skin cells, soil from their yard, tool marks) and inevitably carries something out of it (carpet fibres, glass fragments from a broken window, the victim's blood or DNA, pollen, dust). These two-way transfers are what "trace evidence" is, and the investigator's task is to locate, collect, and interpret them to link a person to a place or to another person. The principle is also why crime-scene contamination control exists — investigators wear suits, gloves, and masks and follow single-path entry precisely because their own contact would otherwise add spurious traces. It is named after Edmond Locard (1877–1966), a French criminologist who established one of the first police forensic laboratories, in Lyon, and was nicknamed "the Sherlock Holmes of France."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-luminol',
    title: 'How Luminol Detects Blood',
    category: 'Forensics',
    keywords: [
      'how does luminol work', 'a chemical that gives off a blue glow chemiluminescence when it is oxidised the reaction needs a catalyst and the iron in the haemoglobin of blood is a very effective one',
      'investigators spray a solution of luminol plus hydrogen peroxide and a base onto a darkened area suspected bloodstains glow blue for about 30 seconds and are photographed with a long exposure it reveals blood that has been diluted or wiped away down to about one part in ten thousand and cleaned up or old stains',
      'false positives it also glows with copper and other metals some bleaches and cleaning products horseradish and other plant peroxidases so a glow is presumptive not confirmatory and luminol can dilute and damage dna and does not stop later confirmatory tests if used carefully',
    ],
    content: `Luminol is a compound that emits a blue glow when it undergoes a particular oxidation reaction — a cold light called chemiluminescence. The reaction only proceeds quickly if a catalyst is present, and the iron atom at the centre of haemoglobin (the oxygen-carrying protein in red blood cells) is an excellent catalyst. Forensic use: an investigator darkens the room and sprays a fine mist of luminol mixed with an oxidiser (hydrogen peroxide) and a base. Where even traces of blood remain, the haemoglobin iron drives the reaction and the area glows blue for roughly 30 seconds, long enough to photograph with a long exposure. Luminol is extremely sensitive — it reveals blood diluted to about 1 part in 10,000, and it shows bloodstains that have been washed, painted over, or wiped away, sometimes revealing the swipe patterns of an attempted clean-up or a trail leading out of a room. Limitations: it is a PRESUMPTIVE test, not a confirmation, because other substances also catalyse the glow — copper and some other metals, certain household bleaches and cleaning agents, and plant peroxidases such as those in horseradish. It can also dilute and chemically damage DNA in the stain, so it is used carefully and later confirmatory and DNA tests are planned around it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-forensics-polygraph',
    title: 'The Polygraph ("Lie Detector") and Whether It Works',
    category: 'Forensics',
    keywords: [
      'what is a polygraph and does a lie detector actually work', 'a device that records several body signals at once blood pressure pulse breathing rate and skin conductivity sweat while the person answers questions',
      'it does not detect lies it detects arousal the theory is that lying causes stress that shows up as changes in those signals compared to control questions the examiner scores the charts',
      'the scientific consensus is that it is unreliable there is no unique physiological signature of lying nervous truthful people fail and practised or calm liars pass countermeasures work most us courts do not admit polygraph results though agencies still use them for screening and interrogation pressure',
    ],
    content: `A polygraph records several physiological signals simultaneously — blood pressure, pulse rate, breathing pattern, and electrodermal activity (skin sweat/conductivity) — on a moving chart while an examiner asks a scripted mix of relevant, irrelevant, and "control" questions. It does not detect lies. It detects physiological arousal, and its premise is that the stress of lying produces bigger reactions to the relevant questions than to the controls. The examiner then scores the tracings and calls the result truthful, deceptive, or inconclusive. The scientific consensus (including a major US National Academy of Sciences review) is that it is not a valid lie detector: there is no bodily response unique to deception, so a nervous but honest person can react strongly and "fail," while a calm, practised, or psychopathic liar can "pass," and simple countermeasures (controlled breathing, subtle muscle tension, mental arithmetic on control questions) degrade it further. Because of this, polygraph results are inadmissible in most US courts (and barred for most private-sector employment screening), and it is treated as pseudoscience by many researchers. It is still used by some government agencies for security-clearance screening and, in practice, as an interrogation tool — the belief that the machine works often prompts admissions regardless of what the chart shows.`,
    createdAt: Date.now(),
  },
];
